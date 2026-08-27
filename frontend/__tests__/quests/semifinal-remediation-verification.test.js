/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = '.compozy/tasks/011-semifinal-playtest-remediation';
const VALIDATOR = `${FEATURE}/scripts/validate-semifinal-remediation.mjs`;
const MODULE_URL = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/semifinal-verification.mjs`)).href;
const STATIC_EVIDENCE = `${FEATURE}/evidence/static-validation.json`;
const HUMAN_EVIDENCE = `${FEATURE}/evidence/human-playtest.md`;
const CHILD_RUN = process.env.SEMIFINAL_REMEDIATION_CHILD === '1';

const EXPECTED_PASS = {
  status: 'pass',
  feature: '011-semifinal-playtest-remediation',
  failures: [],
  runtime: 'pending_editor_and_playtest',
  evidence: STATIC_EVIDENCE,
};

function copyPath(root, relativePath) {
  const source = path.join(ROOT, relativePath);
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

function createWorkspace({ includeTests = false } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-verification-'));
  for (const relativePath of ['package.json', 'package-lock.json', 'jest.config.ts', 'tsconfig.json']) {
    if (fs.existsSync(path.join(ROOT, relativePath))) copyPath(root, relativePath);
  }
  for (const relativePath of [
    '.compozy/tasks/010-semifinal-completa',
    FEATURE,
    'docs/project-conventions/authoring-materialization-authority.md',
    'docs/Quests/2-semifinal',
    'docs/GDD/01_Worldbuilding/01.5_Social',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens',
    'frontend/data',
    'frontend/img/charactersAA/Thorin_OldHelmet',
    'frontend/js',
    'frontend/scripts',
    'frontend/test-support',
    'scripts/lib/validation-evidence.js',
    'scripts/check-validation-evidence.js',
  ])
    copyPath(root, relativePath);
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, `${FEATURE}/fixtures/assets/asset-manifest.json`), 'utf8'));
  for (const asset of manifest.assets) {
    copyPath(root, asset.path);
    if (asset.fallbackPath) copyPath(root, asset.fallbackPath);
  }
  const imageReferences = new Set();
  const visit = (value, key = '') => {
    if (Array.isArray(value)) return value.forEach(child => visit(child, key));
    if (!value || typeof value !== 'object') return;
    for (const [childKey, child] of Object.entries(value)) {
      if (typeof child === 'string' && child) {
        if (childKey === 'characterName') imageReferences.add(`frontend/img/characters/${child}.png`);
        if (/PictureName(?::str)?$/.test(childKey)) imageReferences.add(`frontend/img/pictures/${child}.png`);
        if (childKey === 'parallaxName') imageReferences.add(`frontend/img/parallaxes/${child}.png`);
      }
      visit(child, childKey);
    }
  };
  for (const id of [44, 61, 62, 63, 64, 65]) visit(JSON.parse(fs.readFileSync(path.join(ROOT, `frontend/data/Map${String(id).padStart(3, '0')}.json`), 'utf8')));
  for (const relativePath of imageReferences) if (fs.existsSync(path.join(ROOT, relativePath))) copyPath(root, relativePath);
  if (includeTests) {
    copyPath(root, 'frontend/__tests__');
    fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(root, 'node_modules'), 'dir');
  }
  run('git', ['init', '-q'], root);
  run('git', ['config', 'user.name', 'Semifinal Harness'], root);
  run('git', ['config', 'user.email', 'harness@example.invalid'], root);
  run('git', ['add', '.'], root);
  run('git', ['commit', '-qm', 'test: seed disposable validation workspace'], root);
  run('git', ['branch', 'develop'], root);
  return root;
}

function run(command, args, cwd = ROOT, options = {}) {
  return spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    timeout: options.timeout ?? 120000,
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, ...options.env },
  });
}

function invoke(exportName, args) {
  const source = `
    import * as subject from ${JSON.stringify(MODULE_URL)};
    try { console.log(JSON.stringify({ok:true,value:await subject[process.argv[1]](...JSON.parse(process.argv[2]))})); }
    catch (error) { console.log(JSON.stringify({ok:false,error:error.validationIssue ?? {code:error.code,anchor:error.anchor,path:error.path}})); }
  `;
  const result = run(process.execPath, ['--input-type=module', '-e', source, exportName, JSON.stringify(args)]);
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

function invokeValidation(rootDir, writeEvidence = true) {
  return invoke('validateSemifinalRemediation', [{ rootDir, outputPath: STATIC_EVIDENCE, writeEvidence, now: undefined }]);
}

function snapshot(filename) {
  return fs.existsSync(filename) ? fs.readFileSync(filename) : null;
}

let goldenRoot;
let golden;

beforeAll(() => {
  if (CHILD_RUN) return;
  goldenRoot = createWorkspace({ includeTests: true });
  const evidenceRoot = path.join(goldenRoot, `${FEATURE}/evidence`);
  fs.rmSync(evidenceRoot, { recursive: true, force: true });

  const commands = [
    [process.execPath, [`${FEATURE}/scripts/apply-semifinal-remediation-narrative.mjs`, '--check']],
    [process.execPath, [`${FEATURE}/scripts/apply-semifinal-remediation-narrative.mjs`]],
    [process.execPath, [`${FEATURE}/scripts/apply-semifinal-remediation-gameplay.mjs`, '--check']],
    [process.execPath, [`${FEATURE}/scripts/apply-semifinal-remediation-gameplay.mjs`]],
    [process.execPath, [VALIDATOR, '--output', STATIC_EVIDENCE]],
  ];
  const results = commands.map(([command, args]) => run(command, args, goldenRoot));
  const npm = run('npm', ['run', 'test:semifinal'], goldenRoot, {
    timeout: 240000,
    env: { SEMIFINAL_REMEDIATION_CHILD: '1' },
  });
  const diff = run('git', ['diff', '--check'], goldenRoot);
  golden = { results, npm, diff };
}, 300000);

afterAll(() => {
  if (goldenRoot) fs.rmSync(goldenRoot, { recursive: true, force: true });
});

describe('UT-055 — truthful evidence model', () => {
  test('distinguishes static, blocked, pending runtime, and unsupported stale-save states', () => {
    const evidence = JSON.parse(fs.readFileSync(path.join(ROOT, STATIC_EVIDENCE), 'utf8'));
    expect(evidence).toMatchObject({
      schemaVersion: 'semifinal-validation/v2',
      status: 'pass',
      feature: '011-semifinal-playtest-remediation',
      failures: [],
      runtime: 'pending_editor_and_playtest',
      staleSaveSupport: 'unsupported',
    });
    expect(evidence.resultStates).toEqual(['pass', 'fail', 'blocked', 'not_executed', 'remediated_pending_retest', 'stale_save_unsupported']);
    expect(evidence.provenance).toMatchObject({
      schemaVersion: 'validation-evidence/v1',
      generator: { name: 'validate-semifinal-remediation', version: '2.0.0' },
      revision: {
        headSha: expect.stringMatching(/^[0-9a-f]{40}$/),
        baseSha: expect.stringMatching(/^[0-9a-f]{40}$/),
      },
    });
    expect(evidence.dimensions).toMatchObject({ static_verified: 'pass', release_ready: 'blocked' });
    expect(evidence.checks.every(check => check.result === 'pass')).toBe(true);
    const humanCases = evidence.checks.at(-1).details.cases;
    const failedIds = humanCases.filter(item => item.result === 'fail').map(item => item.id);
    const pendingRetestIds = humanCases.filter(item => item.result === 'remediated_pending_retest').map(item => item.id);
    expect([[], ['E2E-004', 'E2E-005'], ['E2E-004', 'E2E-005', 'E2E-006'], ['E2E-002', 'E2E-004', 'E2E-005', 'E2E-006', 'E2E-007', 'E2E-008']]).toContainEqual(failedIds);
    expect([[], ['E2E-002', 'E2E-004', 'E2E-005', 'E2E-006', 'E2E-007', 'E2E-008']]).toContainEqual(pendingRetestIds);
    expect(humanCases.filter(item => item.result === 'not_executed')).toHaveLength(15 - failedIds.length - pendingRetestIds.length);
  });
});

describe('UT-056–UT-058 / IT-020 — byte-preserving checklist lifecycle', () => {
  test('UT-056: absent checklist is created only after static pass with every human case not_executed', () => {
    const root = createWorkspace();
    fs.rmSync(path.join(root, `${FEATURE}/evidence`), { recursive: true, force: true });
    const result = invokeValidation(root);
    const checklist = fs.readFileSync(path.join(root, HUMAN_EVIDENCE));
    expect(result).toMatchObject({ ok: true, value: { checklistAction: 'created_not_executed', evidence: { status: 'pass' } } });
    const text = checklist.toString('utf8');
    expect(text.match(/^## E2E-/gm) ?? []).toHaveLength(15);
    expect(text.match(/^- result: `not_executed`$/gm) ?? []).toHaveLength(15);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-057: compatible CRLF bytes and recorded results survive later static pass exactly', () => {
    const root = createWorkspace();
    fs.mkdirSync(path.dirname(path.join(root, HUMAN_EVIDENCE)), { recursive: true });
    const template = invoke('buildHumanChecklist', []).value;
    const completed = template
      .replace('- result: `not_executed`', '- result: `pass`')
      .replace('- tester: ``', '- tester: `QA Tester`')
      .replace('- date: ``', '- date: `2026-08-21`')
      .replace('- observation: ``', '- observation: `Map044 timing observed.`')
      .replace('- evidence_path: ``', '- evidence_path: `evidence/e2e-002.png`')
      .replace(/\n/g, '\r\n');
    fs.writeFileSync(path.join(root, HUMAN_EVIDENCE), completed);
    const before = snapshot(path.join(root, HUMAN_EVIDENCE));
    const result = invokeValidation(root);
    expect(result).toMatchObject({ ok: true, value: { checklistAction: 'preserved_byte_for_byte', evidence: { status: 'pass' } } });
    expect(snapshot(path.join(root, HUMAN_EVIDENCE))).toEqual(before);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-058: incompatible schema blocks and preserves the malformed bytes', () => {
    const root = createWorkspace();
    fs.mkdirSync(path.dirname(path.join(root, HUMAN_EVIDENCE)), { recursive: true });
    const malformed = Buffer.from('---\r\nschema_version: "wrong/v0"\r\n---\r\nrecorded-result\r\n');
    fs.writeFileSync(path.join(root, HUMAN_EVIDENCE), malformed);
    const result = invokeValidation(root);
    expect(result).toMatchObject({ ok: true, value: { checklistAction: 'blocked_preserved_byte_for_byte', evidence: { status: 'blocked' } } });
    expect(snapshot(path.join(root, HUMAN_EVIDENCE))).toEqual(malformed);
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe('UT-071 — exact validator errors and production immutability', () => {
  test('invalid arguments return the frozen blocked object before discovery', () => {
    const script = `import {runValidator} from ${JSON.stringify(pathToFileURL(path.join(ROOT, VALIDATOR)).href)}; console.log(JSON.stringify(runValidator(['--force'])));`;
    const result = run(process.execPath, ['--input-type=module', '-e', script]);
    expect(JSON.parse(result.stdout)).toEqual({
      exitCode: 1,
      output: {
        status: 'blocked',
        code: 'invalid_arguments',
        command: 'validate-semifinal-remediation',
        accepted: ['--output', STATIC_EVIDENCE],
      },
    });
  });

  test('contract failure emits contract_validation_failed and writes only 011 evidence', () => {
    const root = createWorkspace();
    fs.rmSync(path.join(root, `${FEATURE}/evidence`), { recursive: true, force: true });
    const mapPath = path.join(root, 'frontend/data/Map062.json');
    const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    map.events[6].pages[0].list.find(command => command.code === 301).parameters[2] = true;
    fs.writeFileSync(mapPath, JSON.stringify(map));
    const before = fs.readFileSync(mapPath);
    const script = `import {runValidator} from ${JSON.stringify(pathToFileURL(path.join(ROOT, VALIDATOR)).href)}; console.log(JSON.stringify(runValidator(['--output',${JSON.stringify(STATIC_EVIDENCE)}],{rootDir:process.argv[1]})));`;
    const result = run(process.execPath, ['--input-type=module', '-e', script, root]);
    expect(JSON.parse(result.stdout)).toEqual({ exitCode: 1, output: { status: 'fail', code: 'contract_validation_failed', evidence: STATIC_EVIDENCE } });
    expect(fs.readFileSync(mapPath)).toEqual(before);
    expect(JSON.parse(fs.readFileSync(path.join(root, STATIC_EVIDENCE), 'utf8')).failures).toEqual(
      expect.arrayContaining([expect.objectContaining({ task: 'task_06', surface: 'finale-battle-generator' })]),
    );
    expect(fs.existsSync(path.join(root, HUMAN_EVIDENCE))).toBe(false);
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe('UT-072 / IT-023 — explicit non-recursive npm surface', () => {
  test('UT-072: package target lists every suite explicitly and serially', () => {
    const command = require(path.join(ROOT, 'package.json')).scripts['test:semifinal'];
    const named = [...command.matchAll(/frontend\/[^ ]+\.test\.js/g)].map(match => match[0]);
    expect(named).toHaveLength(14);
    expect(command).toContain('Coreto_Cutscene.test.js');
    expect(command).toContain('semifinal-remediation-verification.test.js');
    expect(command).not.toContain('*');
    expect(command.endsWith('--runInBand')).toBe(true);
  });

  test('IT-023: npm target exits zero and executes the verification suite without recursion', () => {
    if (CHILD_RUN) {
      expect(process.env.SEMIFINAL_REMEDIATION_CHILD).toBe('1');
      return;
    }
    if (golden.npm.status !== 0) throw new Error(`nested npm failed:\n${golden.npm.stdout}\n${golden.npm.stderr}`);
    const output = `${golden.npm.stdout}\n${golden.npm.stderr}`;
    expect(output).toContain('semifinal-remediation-verification.test.js');
    expect(output).toMatch(/Test Suites:\s+\d+ passed/);
  });
});

describe('E2E-001 — disposable public golden path', () => {
  test('runs both writers, validator, npm target and diff check with exact terminal shapes', () => {
    if (CHILD_RUN) {
      expect(process.env.SEMIFINAL_REMEDIATION_CHILD).toBe('1');
      return;
    }
    const [narrativeCheck, narrativeApply, gameplayCheck, gameplayApply, validator] = golden.results;
    expect(narrativeCheck.status).toBe(0);
    expect(JSON.parse(narrativeCheck.stdout)).toEqual({ status: 'ready', feature: '011-semifinal-playtest-remediation', writer: 'narrative-designer' });
    expect(JSON.parse(narrativeApply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'narrative-designer' });
    expect(JSON.parse(gameplayCheck.stdout)).toEqual({
      status: 'ready',
      feature: '011-semifinal-playtest-remediation',
      writer: 'gameplay-engineer',
      contracts: 'current',
      assets: 'complete',
      database_ids: 'reserved',
    });
    expect(JSON.parse(gameplayApply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'gameplay-engineer' });
    expect(JSON.parse(validator.stdout)).toEqual(EXPECTED_PASS);
    if (golden.npm.status !== 0) throw new Error(`golden npm failed:\n${golden.npm.stdout}\n${golden.npm.stderr}`);
    if (golden.diff.status !== 0) throw new Error(`golden diff failed:\n${golden.diff.stdout}\n${golden.diff.stderr}`);
    expect(golden.diff.stdout).toBe('');
    const checklist = fs.readFileSync(path.join(goldenRoot, HUMAN_EVIDENCE), 'utf8');
    expect(checklist.match(/^- result: `not_executed`$/gm) ?? []).toHaveLength(15);
  });
});

describe('E2E-010/E2E-011/E2E-013 — honest human handoff', () => {
  test.each([
    ['E2E-010', 'fresh full journey'],
    ['E2E-011', 'milestone and interruption matrix'],
    ['E2E-013', 'editor open/save/close/reopen'],
  ])('%s leaves %s not_executed until tester evidence exists', (id, _label) => {
    const checklist = fs.readFileSync(path.join(ROOT, HUMAN_EVIDENCE), 'utf8');
    const section = checklist.split(`## ${id}`)[1].split('\n## ')[0];
    expect(section).toContain('- result: `not_executed`');
    expect(section).toContain('- tester: ``');
    expect(section).toContain('- date: ``');
    expect(section).toContain('- observation: ``');
    expect(section).toContain('- evidence_path: ``');
  });
});
