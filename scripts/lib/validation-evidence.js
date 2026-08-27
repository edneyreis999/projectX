const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const SCHEMA_VERSION = 'validation-evidence/v1';

function normalizeRelativePath(relativePath) {
  if (typeof relativePath !== 'string' || relativePath.length === 0) {
    throw new Error('invalid_input_path');
  }
  const normalized = relativePath.replaceAll('\\', '/').replace(/^\.\//, '');
  if (path.posix.isAbsolute(normalized) || normalized.split('/').includes('..')) {
    throw new Error(`input_path_outside_root:${relativePath}`);
  }
  return normalized;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function walkFiles(rootDir, relativePath) {
  const normalized = normalizeRelativePath(relativePath);
  const absolutePath = path.join(rootDir, normalized);
  if (!fs.existsSync(absolutePath)) throw new Error(`input_missing:${normalized}`);
  const stat = fs.lstatSync(absolutePath);
  if (stat.isFile()) return [normalized];
  if (!stat.isDirectory()) throw new Error(`input_type_unsupported:${normalized}`);

  const files = [];
  const visit = (directory, prefix) => {
    for (const name of fs.readdirSync(directory).sort()) {
      const filename = path.join(directory, name);
      const childPath = prefix ? `${prefix}/${name}` : name;
      const childStat = fs.lstatSync(filename);
      if (childStat.isDirectory()) visit(filename, childPath);
      else if (childStat.isFile()) files.push(`${normalized}/${childPath}`);
      else throw new Error(`input_type_unsupported:${normalized}/${childPath}`);
    }
  };
  visit(absolutePath, '');
  return files;
}

function fingerprintInput(rootDir, relativePath) {
  const normalized = normalizeRelativePath(relativePath);
  const absolutePath = path.join(rootDir, normalized);
  if (!fs.existsSync(absolutePath)) throw new Error(`input_missing:${normalized}`);
  const stat = fs.lstatSync(absolutePath);
  if (stat.isFile()) {
    return {
      path: normalized,
      kind: 'file',
      executable: (stat.mode & 0o111) !== 0,
      sha256: sha256(fs.readFileSync(absolutePath)),
    };
  }
  if (!stat.isDirectory()) throw new Error(`input_type_unsupported:${normalized}`);

  const hash = crypto.createHash('sha256');
  const files = walkFiles(rootDir, normalized);
  for (const filename of files) {
    hash.update(filename);
    hash.update('\0');
    hash.update((fs.lstatSync(path.join(rootDir, filename)).mode & 0o111) !== 0 ? 'x' : '-');
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(rootDir, filename)));
    hash.update('\0');
  }
  return { path: normalized, kind: 'directory', fileCount: files.length, sha256: hash.digest('hex') };
}

function fingerprintInputs(rootDir, inputPaths) {
  const paths = [...new Set(inputPaths.map(normalizeRelativePath))].sort();
  return paths.map(relativePath => fingerprintInput(rootDir, relativePath));
}

function gitOutput(rootDir, args) {
  return execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' }).trim();
}

function resolveGitRevision(rootDir, { baseRef = null, inputPaths = [] } = {}) {
  const headSha = gitOutput(rootDir, ['rev-parse', 'HEAD']);
  const baseSha = baseRef ? gitOutput(rootDir, ['rev-parse', baseRef]) : null;
  const worktreeChanged = gitOutput(rootDir, ['status', '--porcelain=v1', '--untracked-files=all']).length > 0;
  const tracked = new Set(gitOutput(rootDir, ['ls-files']).split('\n').filter(Boolean));
  const inputFiles = [...new Set(inputPaths.flatMap(relativePath => walkFiles(rootDir, relativePath)))];
  const untrackedInputs = inputFiles.filter(relativePath => !tracked.has(relativePath)).sort();
  let revisionState = 'committed';
  if (worktreeChanged && untrackedInputs.length > 0) revisionState = 'working_tree_with_untracked_inputs';
  else if (worktreeChanged) revisionState = 'working_tree';
  else if (untrackedInputs.length > 0) revisionState = 'untracked_inputs';
  return { headSha, baseRef, baseSha, revisionState, untrackedInputs };
}

function buildEvidenceProvenance({ rootDir, inputPaths, baseRef = null, generator, generatedAt = new Date() }) {
  if (!generator?.name || !generator?.version) throw new Error('generator_identity_required');
  const revision = resolveGitRevision(rootDir, { baseRef, inputPaths });
  return {
    schemaVersion: SCHEMA_VERSION,
    generator,
    revision,
    inputs: fingerprintInputs(rootDir, inputPaths),
    generatedAt: generatedAt.toISOString(),
  };
}

function verifyEvidenceFreshness({ evidence, rootDir, baseRef = null, generator = null }) {
  if (evidence?.provenance?.schemaVersion !== SCHEMA_VERSION) {
    return { status: 'blocked', code: 'invalid_evidence_schema' };
  }

  const recorded = evidence.provenance;
  const inputPaths = recorded.inputs.map(input => input.path);
  const resolvedBaseRef = baseRef ?? recorded.revision.baseRef ?? null;
  let current;
  try {
    current = buildEvidenceProvenance({
      rootDir,
      inputPaths,
      baseRef: resolvedBaseRef,
      generator: generator ?? recorded.generator,
      generatedAt: new Date(recorded.generatedAt),
    });
  } catch (error) {
    return { status: 'stale_evidence', reasons: [{ code: error.message }] };
  }

  const reasons = [];
  if (recorded.revision.headSha !== current.revision.headSha) {
    reasons.push({ code: 'head_changed', expected: recorded.revision.headSha, observed: current.revision.headSha });
  }
  if (recorded.revision.baseSha !== current.revision.baseSha) {
    reasons.push({ code: 'base_changed', expected: recorded.revision.baseSha, observed: current.revision.baseSha });
  }
  if (recorded.generator.name !== current.generator.name || recorded.generator.version !== current.generator.version) {
    reasons.push({ code: 'generator_changed', expected: recorded.generator, observed: current.generator });
  }
  if (JSON.stringify(recorded.revision.untrackedInputs) !== JSON.stringify(current.revision.untrackedInputs)) {
    reasons.push({
      code: 'input_tracking_changed',
      expected: recorded.revision.untrackedInputs,
      observed: current.revision.untrackedInputs,
    });
  }

  const expectedInputs = new Map(recorded.inputs.map(input => [input.path, input]));
  for (const observed of current.inputs) {
    const expected = expectedInputs.get(observed.path);
    if (!expected || expected.kind !== observed.kind || expected.executable !== observed.executable || expected.sha256 !== observed.sha256 || expected.fileCount !== observed.fileCount) {
      reasons.push({ code: 'input_changed', path: observed.path, expected, observed });
    }
  }
  return reasons.length > 0 ? { status: 'stale_evidence', reasons } : { status: 'fresh' };
}

module.exports = {
  SCHEMA_VERSION,
  buildEvidenceProvenance,
  fingerprintInput,
  fingerprintInputs,
  normalizeRelativePath,
  resolveGitRevision,
  sha256,
  verifyEvidenceFreshness,
  walkFiles,
};
