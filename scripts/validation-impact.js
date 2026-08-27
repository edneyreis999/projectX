const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const DEFAULT_MANIFEST = 'config/validation-impact-map.json';

function normalizeTarget(target) {
  if (typeof target !== 'string' || target.length === 0) throw new Error('invalid_target');
  const normalized = target.replaceAll('\\', '/').replace(/^\.\//, '');
  if (path.posix.isAbsolute(normalized) || normalized.split('/').includes('..')) {
    throw new Error(`target_outside_root:${target}`);
  }
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
      } else {
        result += '.*';
      }
    } else if (character === '*') {
      result += '[^/]*';
    } else if (character === '?') {
      result += '[^/]';
    } else {
      result += character.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');
    }
  }
  return new RegExp(`${result}$`);
}

function matches(target, pattern) {
  return globToRegExp(pattern).test(normalizeTarget(target));
}

function validateManifest(manifest) {
  if (manifest?.schemaVersion !== 'validation-impact-map/v1') throw new Error('invalid_manifest_schema');
  if (!Array.isArray(manifest.checks) || !Array.isArray(manifest.rules) || !Array.isArray(manifest.protectedTargets)) {
    throw new Error('invalid_manifest_shape');
  }

  const checkIds = new Set();
  for (const check of manifest.checks) {
    if (!check?.id || !check?.command || !Array.isArray(check.args)) throw new Error('invalid_check');
    if (checkIds.has(check.id)) throw new Error(`duplicate_check:${check.id}`);
    checkIds.add(check.id);
  }

  const ruleIds = new Set();
  for (const rule of manifest.rules) {
    if (!rule?.id || !Array.isArray(rule.targets) || rule.targets.length === 0 || !Array.isArray(rule.checks) || rule.checks.length === 0) {
      throw new Error('invalid_rule');
    }
    if (ruleIds.has(rule.id)) throw new Error(`duplicate_rule:${rule.id}`);
    ruleIds.add(rule.id);
    for (const target of rule.targets) globToRegExp(target);
    for (const checkId of rule.checks) if (!checkIds.has(checkId)) throw new Error(`unknown_check:${checkId}`);
  }
  for (const target of manifest.protectedTargets) globToRegExp(target);
  return manifest;
}

function loadManifest(rootDir, manifestPath = DEFAULT_MANIFEST) {
  const normalized = normalizeTarget(manifestPath);
  return validateManifest(JSON.parse(fs.readFileSync(path.join(rootDir, normalized), 'utf8')));
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
  if (unmappedTargets.length > 0) {
    return { status: 'blocked', code: 'unmapped_target', files, matchedRules, checks: [], unmappedTargets };
  }

  const checks = manifest.checks.filter(check => requiredChecks.has(check.id));
  return { status: checks.length > 0 ? 'ready' : 'no_checks', files, matchedRules, checks, unmappedTargets: [] };
}

function changedFilesFromGit(rootDir, { base, head = 'HEAD' }) {
  const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACDMRTUXB', `${base}...${head}`], {
    cwd: rootDir,
    encoding: 'utf8',
  });
  return output.split('\n').filter(Boolean);
}

function runImpactPlan(plan, rootDir, spawn = spawnSync) {
  if (plan.status !== 'ready') return { ...plan, executions: [] };
  const executions = [];
  for (const check of plan.checks) {
    const result = spawn(check.command, check.args, { cwd: rootDir, stdio: 'inherit' });
    executions.push({ id: check.id, exitCode: result.status });
    if (result.status !== 0) return { ...plan, status: 'fail', code: 'check_failed', executions };
  }
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
  if (!options.manifest) throw new Error('manifest_path_required');
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
    const files = options.base ? changedFilesFromGit(rootDir, options) : options.files;
    const plan = resolveImpactPlan(manifest, files);
    const output = options.run ? runImpactPlan(plan, rootDir) : plan;
    return { exitCode: ['blocked', 'fail'].includes(output.status) ? 1 : 0, output };
  } catch (error) {
    return { exitCode: 1, output: { status: 'blocked', code: error.message } };
  }
}

if (require.main === module) {
  const result = main();
  process.stdout.write(`${JSON.stringify(result.output, null, 2)}\n`);
  process.exitCode = result.exitCode;
}

module.exports = {
  changedFilesFromGit,
  globToRegExp,
  loadManifest,
  main,
  matches,
  normalizeTarget,
  parseArguments,
  resolveImpactPlan,
  runImpactPlan,
  validateManifest,
};
