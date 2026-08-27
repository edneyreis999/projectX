/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const { changedFilesFromGit, loadManifest, matches, parseArguments, resolveImpactPlan, runImpactPlan, validateManifest } = require('../../../scripts/validation-impact.js');

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function manifest() {
  return {
    schemaVersion: 'validation-impact-map/v1',
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

  test('maps a document to its real consumer instead of treating it as docs-only', () => {
    const plan = resolveImpactPlan(manifest(), ['docs/Quests/2-semifinal/semifinal.dialogos.md']);
    expect(plan).toMatchObject({
      status: 'ready',
      checks: [{ id: 'docs' }],
      matchedRules: [{ id: 'contract-docs' }],
    });
  });

  test('blocks protected targets that have no rule', () => {
    const subject = manifest();
    subject.rules = subject.rules.filter(rule => rule.id !== 'runtime');
    const plan = resolveImpactPlan(subject, ['frontend/js/plugins/NewCoretoPlugin.js']);
    expect(plan).toMatchObject({
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
    const spawn = jest.fn((command, args) => ({ status: args.includes('test:docs') ? 1 : 0 }));
    const result = runImpactPlan(plan, ROOT, spawn);
    expect(result).toMatchObject({ status: 'fail', code: 'check_failed', executions: [{ id: 'docs', exitCode: 1 }] });
    expect(spawn).toHaveBeenCalledTimes(1);
  });

  test('validates the repository manifest and its quest mappings through the public CLI', () => {
    const repositoryManifest = loadManifest(ROOT);
    const semifinalPlan = resolveImpactPlan(repositoryManifest, ['docs/Quests/2-semifinal/semifinal.audio.md']);
    expect(semifinalPlan.checks.map(check => check.id)).toEqual(['semifinal']);

    const nightPlan = resolveImpactPlan(repositoryManifest, ['docs/Quests/1-noite-da-historia/noite-da-historia.NSD.fluxo-cenas.md']);
    expect(nightPlan.checks.map(check => check.id)).toEqual(['noite-da-historia']);

    const harnessPlan = resolveImpactPlan(repositoryManifest, ['frontend/__tests__/quests/semifinal-remediation-verification.test.js']);
    expect(harnessPlan.checks.map(check => check.id)).toEqual(['semifinal']);

    const result = spawnSync(process.execPath, ['scripts/validation-impact.js', '--check'], { cwd: ROOT, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'pass', manifest: 'config/validation-impact-map.json' });
  });

  test('exposes quest-specific npm targets and an explicit all-quests aggregator', () => {
    const scripts = require(path.join(ROOT, 'package.json')).scripts;
    expect(scripts['test:noite-da-historia']).toContain('quest-state-machines-ex-vn.test.js');
    expect(scripts['test:noite-da-historia']).toContain('Coreto_QuestCore.test.js');
    expect(scripts['test:semifinal']).toContain('semifinal-remediation-verification.test.js');
    expect(scripts['test:semifinal']).toContain('Coreto_Cutscene.test.js');
    expect(scripts['test:quests']).toBe('npm run test:noite-da-historia && npm run test:semifinal');
    expect(scripts['test:semifinal-remediation']).toBeUndefined();
    expect(scripts['test:quest-state-machines']).toBeUndefined();
  });

  test('requires exactly one discovery mode', () => {
    expect(() => parseArguments([])).toThrow('choose_exactly_one_mode');
    expect(() => parseArguments(['--check', '--files', 'package.json'])).toThrow('choose_exactly_one_mode');
    expect(() => parseArguments(['--base'])).toThrow('missing_value:--base');
    expect(() => resolveImpactPlan(manifest(), ['../outside.md'])).toThrow('target_outside_root:../outside.md');
    expect(parseArguments(['--base', 'develop', '--run'])).toMatchObject({ base: 'develop', head: 'HEAD', run: true });
  });
});
