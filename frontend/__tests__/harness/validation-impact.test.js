/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const { changedFilesFromGit, changedFilesFromStaged, loadManifest, matches, parseArguments, resolveImpactPlan, runImpactPlan, validateManifest } = require('../../../scripts/validation-impact.js');

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function manifest() {
  return {
    schemaVersion: 'validation-impact-map/v2',
    checks: [
      { id: 'docs', command: 'npm', args: ['run', 'test:docs'] },
      { id: 'runtime', command: 'npm', args: ['run', 'test:runtime'] },
    ],
    rules: [
      { id: 'contract-docs', targets: ['docs/Quests/**'], checks: ['docs'] },
      { id: 'runtime', targets: ['frontend/js/plugins/*.js'], checks: ['runtime'] },
    ],
    protectedTargets: ['docs/Quests/**', 'frontend/js/plugins/**'],
  };
}

function createGateRepository() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'authoring-gate-'));
  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
  fs.mkdirSync(path.join(root, 'config'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'scripts/validation-impact.js'), path.join(root, 'scripts/validation-impact.js'));
  fs.copyFileSync(path.join(ROOT, 'scripts/validate-staged.js'), path.join(root, 'scripts/validate-staged.js'));
  fs.writeFileSync(
    path.join(root, 'config/validation-impact-map.json'),
    JSON.stringify({
      schemaVersion: 'validation-impact-map/v2',
      questManifestsRoot: 'docs/Quests',
      checks: [{ id: 'target', command: process.execPath, args: ['-e', 'process.exit(0)'] }],
      rules: [{ id: 'target', targets: ['target.txt'], checks: ['target'] }],
      protectedTargets: ['target.txt'],
    }),
  );
  fs.writeFileSync(path.join(root, 'target.txt'), 'baseline\n');
  git(root, ['init', '-q']);
  git(root, ['config', 'user.name', 'Harness Test']);
  git(root, ['config', 'user.email', 'harness@example.invalid']);
  git(root, ['add', '.']);
  git(root, ['commit', '-qm', 'test: seed gate repository']);
  return root;
}

describe('validation impact map', () => {
  test('matches exact paths, single segments and recursive directories', () => {
    expect(matches('package.json', 'package.json')).toBe(true);
    expect(matches('frontend/js/plugins/Coreto_QuestCore.js', 'frontend/js/plugins/*.js')).toBe(true);
    expect(matches('docs/Quests/2-semifinal/semifinal.dialogos.md', 'docs/Quests/**')).toBe(true);
    expect(matches('docs/Quests/2-semifinal/semifinal.dialogos.md', 'docs/Quests/*.md')).toBe(false);
  });

  test('rejects duplicate and unknown check identities', () => {
    const duplicate = manifest();
    duplicate.checks.push(duplicate.checks[0]);
    expect(() => validateManifest(duplicate)).toThrow('duplicate_check:docs');

    const unknown = manifest();
    unknown.rules[0].checks = ['missing'];
    expect(() => validateManifest(unknown)).toThrow('unknown_check:missing');
  });

  test('blocks protected targets that have no rule', () => {
    const subject = manifest();
    subject.rules = subject.rules.filter(rule => rule.id !== 'runtime');
    expect(resolveImpactPlan(subject, ['frontend/js/plugins/NewCoretoPlugin.js'])).toMatchObject({
      status: 'blocked',
      code: 'unmapped_target',
      unmappedTargets: ['frontend/js/plugins/NewCoretoPlugin.js'],
    });
  });

  test('includes deleted targets when discovering changes from Git', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'validation-impact-'));
    try {
      git(root, ['init', '-q']);
      git(root, ['config', 'user.name', 'Harness Test']);
      git(root, ['config', 'user.email', 'harness@example.invalid']);
      fs.mkdirSync(path.join(root, 'docs', 'Quests'), { recursive: true });
      fs.writeFileSync(path.join(root, 'docs', 'Quests', 'contract.md'), 'contract\n');
      git(root, ['add', '.']);
      git(root, ['commit', '-qm', 'test: seed impact repository']);
      git(root, ['branch', 'baseline']);
      fs.rmSync(path.join(root, 'docs', 'Quests', 'contract.md'));
      git(root, ['add', '-u']);
      git(root, ['commit', '-qm', 'test: delete protected target']);
      expect(changedFilesFromGit(root, { base: 'baseline' })).toEqual(['docs/Quests/contract.md']);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('deduplicates checks and stops execution at the first failure', () => {
    const subject = manifest();
    subject.rules.push({ id: 'shared', targets: ['docs/**'], checks: ['docs', 'runtime'] });
    const plan = resolveImpactPlan(subject, ['docs/Quests/example/contract.md']);
    const spawn = jest.fn((command, args) => ({ status: args.includes('test:docs') ? 1 : 0, stdout: '', stderr: '' }));
    const result = runImpactPlan(plan, ROOT, spawn);
    expect(result).toMatchObject({ status: 'fail', code: 'check_failed', executions: [{ id: 'docs', exitCode: 1 }] });
    expect(spawn).toHaveBeenCalledTimes(1);
  });

  test('preserves the beginning and end of noisy failed check output', () => {
    const subject = manifest();
    const plan = resolveImpactPlan(subject, ['docs/Quests/example/contract.md']);
    const spawn = jest.fn(() => ({ status: 1, stdout: '', stderr: `FAIL first assertion\n${'x'.repeat(12000)}\nTest Suites: 1 failed` }));
    const result = runImpactPlan(plan, ROOT, spawn);
    expect(result.executions[0].stderr).toContain('FAIL first assertion');
    expect(result.executions[0].stderr).toContain('Test Suites: 1 failed');
  });

  test('discovers quest owners, writers, materializations and asset checks', () => {
    const repositoryManifest = loadManifest(ROOT);
    const contractPlan = resolveImpactPlan(repositoryManifest, ['docs/Quests/2-semifinal/semifinal.dialogos.md']);
    expect(contractPlan.checks.map(check => check.id)).toEqual(expect.arrayContaining(['semifinal-integrity', 'semifinal-tests']));
    expect(contractPlan.ownership).toContainEqual(expect.objectContaining({ quest: 'semifinal', authorityModel: 'contract-first', owner: 'Narrative Designer' }));

    const materializationPlan = resolveImpactPlan(repositoryManifest, ['frontend/data/Map062.json']);
    expect(materializationPlan.checks.map(check => check.id)).toEqual(expect.arrayContaining(['semifinal-integrity', 'semifinal-tests']));
    expect(materializationPlan.ownership).toContainEqual(expect.objectContaining({ quest: 'semifinal', owner: 'Gameplay Engineer', writer: expect.objectContaining({ id: 'semifinal-gameplay' }) }));

    const quest = require(path.join(ROOT, 'docs/Quests/2-semifinal/quest-tooling.json'));
    const asset = require(path.join(ROOT, quest.assetManifest)).assets[0].path;
    const assetPlan = resolveImpactPlan(repositoryManifest, [asset]);
    expect(assetPlan.checks.map(check => check.id)).toEqual(expect.arrayContaining(['semifinal-integrity', 'semifinal-tests']));
    expect(assetPlan.ownership).toEqual([expect.objectContaining({ quest: 'semifinal', owner: 'Technical Artist' })]);
  });

  test('routes any RPG Maker data target through the structural data check', () => {
    const repositoryManifest = loadManifest(ROOT);
    const plan = resolveImpactPlan(repositoryManifest, ['frontend/data/Map999.json']);
    expect(plan.status).toBe('ready');
    expect(plan.checks.map(check => check.id)).toContain('rpg-maker-data');
    expect(plan.unmappedTargets).toEqual([]);
  });

  test('rejects declared quest sources without a quest-local rule', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'quest-source-'));
    try {
      fs.mkdirSync(path.join(root, 'config'), { recursive: true });
      fs.mkdirSync(path.join(root, 'docs', 'Quests', '1-example'), { recursive: true });
      fs.writeFileSync(
        path.join(root, 'config', 'validation-impact-map.json'),
        JSON.stringify({
          schemaVersion: 'validation-impact-map/v2',
          questManifestsRoot: 'docs/Quests',
          checks: [{ id: 'data', command: 'npm', args: ['run', 'test:data'] }],
          rules: [{ id: 'data', targets: ['frontend/data/*.json'], checks: ['data'] }],
          protectedTargets: ['frontend/data/*.json'],
        }),
      );
      fs.writeFileSync(
        path.join(root, 'docs', 'Quests', '1-example', 'quest-tooling.json'),
        JSON.stringify({
          schemaVersion: 'quest-tooling/v1',
          id: 'example',
          authorityModel: 'contract-first',
          owners: [{ name: 'Gameplay Engineer', targets: ['frontend/data/Map001.json'] }],
          sources: ['frontend/data/Map001.json'],
          checks: [{ id: 'quest', command: 'npm', args: ['run', 'test:quest'] }],
          writers: [],
          materializations: [],
          rules: [{ id: 'contracts', targets: ['docs/Quests/1-example/**'], checks: ['quest'] }],
        }),
      );
      expect(() => loadManifest(root)).toThrow('unmapped_quest_target:frontend/data/Map001.json');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('does not claim checks for undeclared quest documentation', () => {
    const repositoryManifest = loadManifest(ROOT);
    expect(resolveImpactPlan(repositoryManifest, ['docs/Quests/3-passeio-guilda/AGENTS.md'])).toMatchObject({
      status: 'no_checks',
      checks: [],
      unmappedTargets: [],
    });
  });

  test('routes the shared quest state-machine suite through both quest checks', () => {
    const repositoryManifest = loadManifest(ROOT);
    const plan = resolveImpactPlan(repositoryManifest, ['frontend/__tests__/quests/quest-state-machines-ex-vn.test.js']);
    expect(plan.status).toBe('ready');
    expect(plan.checks.map(check => check.id)).toEqual(expect.arrayContaining(['noite-da-historia', 'semifinal-tests']));
  });

  test('rejects materializations that do not identify a deterministic writer', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'quest-manifest-'));
    try {
      fs.mkdirSync(path.join(root, 'config'), { recursive: true });
      fs.mkdirSync(path.join(root, 'docs', 'Quests', '1-example'), { recursive: true });
      fs.writeFileSync(
        path.join(root, 'config', 'validation-impact-map.json'),
        JSON.stringify({ schemaVersion: 'validation-impact-map/v2', questManifestsRoot: 'docs/Quests', checks: [], rules: [], protectedTargets: ['frontend/data/**'] }),
      );
      fs.writeFileSync(
        path.join(root, 'docs', 'Quests', '1-example', 'quest-tooling.json'),
        JSON.stringify({
          schemaVersion: 'quest-tooling/v1',
          id: 'example',
          authorityModel: 'contract-first',
          owners: [{ name: 'Gameplay Engineer', targets: [], targetsFromMaterializations: true }],
          checks: [],
          writers: [],
          materializations: [{ target: 'frontend/data/Map001.json' }],
          rules: [],
        }),
      );
      expect(() => loadManifest(root)).toThrow('unverifiable_materialization:frontend/data/Map001.json');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('validates repository manifests through the public CLI', () => {
    const result = spawnSync(process.execPath, ['scripts/validation-impact.js', '--check'], { cwd: ROOT, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'pass', manifest: 'config/validation-impact-map.json' });
  });

  test('keeps the CI report outside the checkout before branch validation', () => {
    const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/authoring-integrity.yml'), 'utf8');
    expect(workflow).toContain('report_path="$RUNNER_TEMP/authoring-integrity.json"');
    expect(workflow).toContain('tee "$report_path"');
    expect(workflow).not.toContain('tee authoring-integrity.json');
  });

  test('validates the exact staged snapshot and ignores unstaged content', () => {
    const root = createGateRepository();
    try {
      fs.writeFileSync(path.join(root, 'target.txt'), 'staged\n');
      git(root, ['add', 'target.txt']);
      fs.writeFileSync(path.join(root, 'target.txt'), 'unstaged\n');
      const result = spawnSync(process.execPath, ['scripts/validate-staged.js'], { cwd: root, encoding: 'utf8' });
      expect(result.status).toBe(0);
      expect(JSON.parse(result.stdout)).toMatchObject({ status: 'pass', files: ['target.txt'] });
      expect(fs.readFileSync(path.join(root, 'target.txt'), 'utf8')).toBe('unstaged\n');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('preserves Unicode paths when discovering staged files', () => {
    const root = createGateRepository();
    try {
      const unicodePath = 'SUMÁRIO-EXECUTIVO.md';
      fs.writeFileSync(path.join(root, unicodePath), 'staged\n');
      git(root, ['add', unicodePath]);
      expect(changedFilesFromStaged(root)).toEqual([unicodePath]);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('blocks branch execution when the checkout is dirty', () => {
    const root = createGateRepository();
    try {
      git(root, ['branch', 'baseline']);
      fs.writeFileSync(path.join(root, 'target.txt'), 'committed\n');
      git(root, ['add', 'target.txt']);
      git(root, ['commit', '-qm', 'test: change target']);
      fs.writeFileSync(path.join(root, 'target.txt'), 'dirty\n');
      const result = spawnSync(process.execPath, ['scripts/validation-impact.js', '--base', 'baseline', '--run'], { cwd: root, encoding: 'utf8' });
      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'dirty_worktree' });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('requires exactly one discovery mode', () => {
    expect(() => parseArguments([])).toThrow('choose_exactly_one_mode');
    expect(() => parseArguments(['--check', '--files', 'package.json'])).toThrow('choose_exactly_one_mode');
    expect(() => parseArguments(['--base'])).toThrow('missing_value:--base');
    expect(() => resolveImpactPlan(manifest(), ['../outside.md'])).toThrow('target_outside_root:../outside.md');
    expect(parseArguments(['--base', 'develop', '--run'])).toMatchObject({ base: 'develop', head: 'HEAD', run: true });
  });
});
