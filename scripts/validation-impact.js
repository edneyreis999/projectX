const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const DEFAULT_MANIFEST = 'config/validation-impact-map.json';

function normalizeTarget(target) {
  if (typeof target !== 'string' || target.length === 0) throw new Error('invalid_target');
  const normalized = target.replaceAll('\\', '/').replace(/^\.\//, '');
  if (path.posix.isAbsolute(normalized) || normalized.split('/').includes('..')) throw new Error(`target_outside_root:${target}`);
  return normalized;
}

function globToRegExp(pattern) {
  const source = normalizeTarget(pattern);
  let result = '^';
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '*' && source[index + 1] === '*') {
      index += 1;
      if (source[index + 1] === '/') {
        index += 1;
        result += '(?:.*/)?';
      } else result += '.*';
    } else if (character === '*') result += '[^/]*';
    else if (character === '?') result += '[^/]';
    else result += character.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');
  }
  return new RegExp(`${result}$`);
}

function matches(target, pattern) {
  return globToRegExp(pattern).test(normalizeTarget(target));
}

function validateCheck(check) {
  if (!check?.id || !check?.command || !Array.isArray(check.args) || check.args.some(argument => typeof argument !== 'string')) throw new Error('invalid_check');
}

function validateManifest(manifest) {
  if (manifest?.schemaVersion !== 'validation-impact-map/v2') throw new Error('invalid_manifest_schema');
  if (!Array.isArray(manifest.checks) || !Array.isArray(manifest.rules) || !Array.isArray(manifest.protectedTargets)) throw new Error('invalid_manifest_shape');

  const checkIds = new Set();
  for (const check of manifest.checks) {
    validateCheck(check);
    if (checkIds.has(check.id)) throw new Error(`duplicate_check:${check.id}`);
    checkIds.add(check.id);
  }

  const ruleIds = new Set();
  for (const rule of manifest.rules) {
    if (!rule?.id || !Array.isArray(rule.targets) || rule.targets.length === 0 || !Array.isArray(rule.checks) || rule.checks.length === 0) throw new Error('invalid_rule');
    if (ruleIds.has(rule.id)) throw new Error(`duplicate_rule:${rule.id}`);
    ruleIds.add(rule.id);
    for (const target of rule.targets) globToRegExp(target);
    for (const checkId of rule.checks) if (!checkIds.has(checkId)) throw new Error(`unknown_check:${checkId}`);
  }
  for (const target of manifest.protectedTargets) globToRegExp(target);
  for (const ownership of manifest.ownership ?? []) {
    if (!ownership?.quest || !ownership?.authorityModel || !ownership?.owner || !ownership?.target) throw new Error('invalid_ownership');
    globToRegExp(ownership.target);
    if (ownership.writer) validateCheck(ownership.writer);
  }
  return manifest;
}

function questManifestPaths(rootDir, questsRoot) {
  const absoluteRoot = path.join(rootDir, normalizeTarget(questsRoot));
  if (!fs.existsSync(absoluteRoot)) return [];
  return fs
    .readdirSync(absoluteRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.posix.join(normalizeTarget(questsRoot), entry.name, 'quest-tooling.json'))
    .filter(relativePath => fs.existsSync(path.join(rootDir, relativePath)))
    .sort();
}

function expandQuestManifest(rootDir, manifestPath) {
  const quest = JSON.parse(fs.readFileSync(path.join(rootDir, manifestPath), 'utf8'));
  if (
    quest?.schemaVersion !== 'quest-tooling/v1' ||
    !quest.id ||
    !quest.authorityModel ||
    !Array.isArray(quest.owners) ||
    quest.owners.length === 0 ||
    !Array.isArray(quest.checks) ||
    !Array.isArray(quest.writers) ||
    !Array.isArray(quest.materializations) ||
    !Array.isArray(quest.rules)
  ) {
    throw new Error(`invalid_quest_manifest:${manifestPath}`);
  }

  const writerIds = new Set();
  for (const writer of quest.writers) {
    validateCheck(writer);
    if (writerIds.has(writer.id)) throw new Error(`duplicate_writer:${writer.id}`);
    writerIds.add(writer.id);
  }

  const materializedTargets = [];
  for (const materialization of quest.materializations) {
    const target = normalizeTarget(materialization?.target);
    if (!materialization?.writer || !writerIds.has(materialization.writer)) throw new Error(`unverifiable_materialization:${target}`);
    materializedTargets.push(target);
  }
  if (new Set(materializedTargets).size !== materializedTargets.length) throw new Error(`duplicate_materialization:${quest.id}`);

  for (const check of quest.checks) validateCheck(check);
  const sourceTargets = (quest.sources ?? []).map(normalizeTarget);
  const rules = quest.rules.map(rule => {
    const targets = [...(rule.targets ?? []).map(normalizeTarget)];
    if (rule.targetsFromMaterializations === true) targets.push(...materializedTargets);
    if (rule.targetsFromSources === true) targets.push(...sourceTargets);
    return { id: `${quest.id}:${rule.id}`, targets: [...new Set(targets)], checks: rule.checks };
  });

  const assetTargets = [];
  if (quest.assetManifest) {
    const assetManifestPath = normalizeTarget(quest.assetManifest);
    const assetManifest = JSON.parse(fs.readFileSync(path.join(rootDir, assetManifestPath), 'utf8'));
    if (!Array.isArray(assetManifest.assets)) throw new Error(`invalid_asset_manifest:${assetManifestPath}`);
    assetTargets.push(assetManifestPath, ...assetManifest.assets.map(asset => normalizeTarget(asset.path)));
    const checks = [...new Set(quest.rules.flatMap(rule => rule.checks))];
    rules.push({ id: `${quest.id}:assets`, targets: [...new Set(assetTargets)], checks });
  }

  const writerById = new Map(quest.writers.map(writer => [writer.id, writer]));
  const writerByTarget = new Map(quest.materializations.map(item => [normalizeTarget(item.target), writerById.get(item.writer)]));
  const ownership = quest.owners.flatMap(owner => {
    if (!owner?.name || !Array.isArray(owner.targets)) throw new Error(`invalid_owner:${quest.id}`);
    const targets = owner.targets.map(normalizeTarget);
    if (owner.targetsFromMaterializations === true) targets.push(...materializedTargets);
    if (owner.targetsFromSources === true) targets.push(...sourceTargets);
    if (owner.targetsFromAssets === true) targets.push(...assetTargets);
    return [...new Set(targets)].map(target => ({
      quest: quest.id,
      authorityModel: quest.authorityModel,
      owner: owner.name,
      target,
      ...(writerByTarget.has(target) ? { writer: writerByTarget.get(target) } : {}),
    }));
  });

  return {
    checks: quest.checks,
    ownership,
    rules,
    protectedTargets: [manifestPath, ...materializedTargets, ...sourceTargets, ...assetTargets],
  };
}

function loadManifest(rootDir, manifestPath = DEFAULT_MANIFEST) {
  const normalized = normalizeTarget(manifestPath);
  const repository = JSON.parse(fs.readFileSync(path.join(rootDir, normalized), 'utf8'));
  if (repository?.schemaVersion !== 'validation-impact-map/v2' || typeof repository.questManifestsRoot !== 'string') throw new Error('invalid_manifest_schema');
  const questManifests = questManifestPaths(rootDir, repository.questManifestsRoot).map(relativePath => expandQuestManifest(rootDir, relativePath));
  return validateManifest({
    schemaVersion: repository.schemaVersion,
    checks: [...repository.checks, ...questManifests.flatMap(manifest => manifest.checks)],
    ownership: questManifests.flatMap(manifest => manifest.ownership),
    rules: [...repository.rules, ...questManifests.flatMap(manifest => manifest.rules)],
    protectedTargets: [...new Set([...repository.protectedTargets, ...questManifests.flatMap(manifest => manifest.protectedTargets)])],
  });
}

function resolveImpactPlan(manifest, changedFiles) {
  validateManifest(manifest);
  const files = [...new Set(changedFiles.map(normalizeTarget))].sort();
  const matchedRules = [];
  const requiredChecks = new Set();
  const coveredFiles = new Set();

  for (const rule of manifest.rules) {
    const matchingFiles = files.filter(file => rule.targets.some(pattern => matches(file, pattern)));
    if (matchingFiles.length === 0) continue;
    matchedRules.push({ id: rule.id, files: matchingFiles });
    matchingFiles.forEach(file => coveredFiles.add(file));
    rule.checks.forEach(checkId => requiredChecks.add(checkId));
  }

  const unmappedTargets = files.filter(file => manifest.protectedTargets.some(pattern => matches(file, pattern)) && !coveredFiles.has(file));
  const ownership = (manifest.ownership ?? []).map(entry => ({ ...entry, files: files.filter(file => matches(file, entry.target)) })).filter(entry => entry.files.length > 0);
  if (unmappedTargets.length > 0) return { status: 'blocked', code: 'unmapped_target', files, matchedRules, ownership, checks: [], unmappedTargets };
  const checks = manifest.checks.filter(check => requiredChecks.has(check.id));
  return { status: checks.length > 0 ? 'ready' : 'no_checks', files, matchedRules, ownership, checks, unmappedTargets: [] };
}

function gitChangedFiles(rootDir, args) {
  const output = execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' });
  return output.split('\0').filter(Boolean);
}

function changedFilesFromGit(rootDir, { base, head = 'HEAD' }) {
  return gitChangedFiles(rootDir, ['diff', '-z', '--name-only', '--diff-filter=ACDMRTUXB', `${base}...${head}`]);
}

function changedFilesFromStaged(rootDir) {
  return gitChangedFiles(rootDir, ['diff', '-z', '--cached', '--name-only', '--diff-filter=ACDMRTUXB']);
}

function worktreeStatus(rootDir) {
  return execFileSync('git', ['status', '--porcelain'], { cwd: rootDir, encoding: 'utf8' });
}

function tail(value, limit = 4000) {
  const text = String(value ?? '');
  return text.length > limit ? text.slice(-limit) : text;
}

function runImpactPlan(plan, rootDir, spawn = spawnSync) {
  if (plan.status !== 'ready') return { ...plan, executions: [] };
  const before = worktreeStatus(rootDir);
  const executions = [];
  for (const check of plan.checks) {
    const result = spawn(check.command, check.args, { cwd: rootDir, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    executions.push({ id: check.id, exitCode: result.status, stdout: tail(result.stdout), stderr: tail(result.stderr) });
    if (result.status !== 0) return { ...plan, status: 'fail', code: 'check_failed', executions };
  }
  const after = worktreeStatus(rootDir);
  if (after !== before) return { ...plan, status: 'fail', code: 'gate_mutated_worktree', executions };
  return { ...plan, status: 'pass', executions };
}

function parseArguments(args) {
  const options = { manifest: DEFAULT_MANIFEST, head: 'HEAD', run: false, check: false, files: [] };
  const valueAfter = (index, option) => {
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`missing_value:${option}`);
    return value;
  };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--manifest') {
      options.manifest = valueAfter(index, argument);
      index += 1;
    } else if (argument === '--base') {
      options.base = valueAfter(index, argument);
      index += 1;
    } else if (argument === '--head') {
      options.head = valueAfter(index, argument);
      index += 1;
    } else if (argument === '--run') options.run = true;
    else if (argument === '--check') options.check = true;
    else if (argument === '--files') {
      while (args[index + 1] && !args[index + 1].startsWith('--')) options.files.push(args[++index]);
    } else throw new Error(`invalid_argument:${argument}`);
  }
  const modes = Number(options.check) + Number(Boolean(options.base)) + Number(options.files.length > 0);
  if (modes !== 1) throw new Error('choose_exactly_one_mode');
  if (options.run && options.check) throw new Error('cannot_run_manifest_check');
  return options;
}

function main(args = process.argv.slice(2), rootDir = path.resolve(__dirname, '..')) {
  try {
    const options = parseArguments(args);
    const manifest = loadManifest(rootDir, options.manifest);
    if (options.check) return { exitCode: 0, output: { status: 'pass', manifest: options.manifest } };
    if (options.base && options.run && worktreeStatus(rootDir) !== '') {
      return { exitCode: 1, output: { status: 'blocked', code: 'dirty_worktree' } };
    }
    const files = options.base ? changedFilesFromGit(rootDir, options) : options.files;
    const plan = resolveImpactPlan(manifest, files);
    const output = options.run ? runImpactPlan(plan, rootDir) : plan;
    return { exitCode: ['blocked', 'fail'].includes(output.status) ? 1 : 0, output };
  } catch (error) {
    const [code, ...details] = String(error.message).split(':');
    return { exitCode: 1, output: { status: 'blocked', code, ...(details.length > 0 ? { target: details.join(':') } : {}) } };
  }
}

if (require.main === module) {
  const result = main();
  process.stdout.write(`${JSON.stringify(result.output, null, 2)}\n`);
  process.exitCode = result.exitCode;
}

module.exports = {
  changedFilesFromGit,
  changedFilesFromStaged,
  expandQuestManifest,
  globToRegExp,
  loadManifest,
  main,
  matches,
  normalizeTarget,
  parseArguments,
  questManifestPaths,
  resolveImpactPlan,
  runImpactPlan,
  validateManifest,
};
