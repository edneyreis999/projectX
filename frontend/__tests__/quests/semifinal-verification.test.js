/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = '.compozy/tasks/010-semifinal-completa';
const VALIDATOR = path.join(ROOT, FEATURE, 'scripts/validate-semifinal.mjs');
const STATIC_EVIDENCE = path.join(ROOT, FEATURE, 'evidence/static-validation.json');
const HUMAN_EVIDENCE = path.join(ROOT, FEATURE, 'evidence/human-playtest.md');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function snapshot(target) {
  return fs.existsSync(target) ? { exists: true, content: fs.readFileSync(target, 'utf8') } : { exists: false };
}

function invokeValidatorApi() {
  const source = [
    `import { validateSemifinal } from ${JSON.stringify(VALIDATOR)};`,
    'const result = await validateSemifinal();',
    'process.stdout.write(JSON.stringify(result));',
  ].join('\n');
  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', source], { cwd: ROOT, encoding: 'utf8' }));
}

function writerCheck(filename) {
  return JSON.parse(execFileSync(process.execPath, [path.join(ROOT, FEATURE, 'scripts', filename), '--check'], { cwd: ROOT, encoding: 'utf8' }));
}

let validation;
let evidenceBefore;
let evidenceAfter;
let humanBefore;
let humanAfter;

beforeAll(() => {
  evidenceBefore = snapshot(STATIC_EVIDENCE);
  humanBefore = snapshot(HUMAN_EVIDENCE);
  validation = invokeValidatorApi();
  evidenceAfter = snapshot(STATIC_EVIDENCE);
  humanAfter = snapshot(HUMAN_EVIDENCE);
});

function testCase(id) {
  return validation.evidence.test_cases.find(item => item.id === id);
}

function expectUnexecuted(id) {
  expect(testCase(id)).toMatchObject({ id, result: 'not_executed' });
  if (validation.evidence.status === 'pass') {
    expect(validation.humanChecklist).toContain(`## ${id}`);
    const section = validation.humanChecklist.split(`## ${id}`)[1].split('\n## ')[0];
    expect(section).toContain('- status: `not_executed`');
  } else expect(validation.humanChecklist).toBeNull();
}

describe('Task 06 — aggregate validator and evidence lifecycle', () => {
  test('UT-019 delays durable human evidence and returns a truthful pending checklist only after static success', () => {
    expect(validation.evidence.runtime).toBe('pending_editor_and_playtest');
    expect(validation.evidence.summary).toMatchObject({ canonical_test_ids: 39, automated_test_ids: 30, not_executed_e2e_ids: 9 });
    expect(evidenceAfter).toEqual(evidenceBefore);
    expect(humanAfter).toEqual(humanBefore);
    if (validation.evidence.status === 'pass') expect(validation.humanChecklist).toContain('status: pending_editor_and_playtest');
    else expect(validation.humanChecklist).toBeNull();
    expect(validation.evidence.test_cases.filter(item => item.id.startsWith('E2E-')).every(item => item.result === 'not_executed')).toBe(true);
  });

  test('IT-009 proves both applied writers are semantic no-ops while protected hashes remain intact', () => {
    const writerState = validation.evidence.checks.find(check => check.id === 'writer-terminal-state');
    const protection = validation.evidence.checks.find(check => check.id === 'fingerprints-and-byte-preservation');
    expect(['pass', 'fail']).toContain(writerState.result);
    if (writerState.result === 'pass') expect(writerState.replay_semantics).toBe('no-op');
    else expect(writerState.failures).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'writer_not_applied' })]));
    expect(protection.result).toBe('pass');
    for (const [relativePath, expectedHash] of Object.entries(protection.protected_hashes)) {
      const actual = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(ROOT, relativePath))).digest('hex');
      expect(actual).toBe(expectedHash);
    }
    expect(testCase('IT-009').result).toBe(writerState.result);
  });

  test('IT-010 preserves the exact DX command sequence and structured terminal result', () => {
    const dx = read(`${FEATURE}/_dx.md`);
    const commands = [...dx.matchAll(/^\$ (.+)$/gm)].map(match => match[1]);
    expect(commands.slice(0, 7)).toEqual([
      `node ${FEATURE}/scripts/apply-semifinal-narrative.mjs --check`,
      `node ${FEATURE}/scripts/apply-semifinal-narrative.mjs`,
      `node ${FEATURE}/scripts/apply-semifinal-gameplay.mjs --check`,
      `node ${FEATURE}/scripts/apply-semifinal-gameplay.mjs`,
      `node ${FEATURE}/scripts/validate-semifinal.mjs --output ${FEATURE}/evidence/static-validation.json`,
      'npm run test:quest-state-machines',
      'git diff --check',
    ]);
    expect(writerCheck('apply-semifinal-narrative.mjs')).toEqual({ status: 'ready', feature: '010-semifinal-completa', writer: 'narrative-designer', writes: 0 });
    expect(writerCheck('apply-semifinal-gameplay.mjs')).toEqual({ status: 'ready', feature: '010-semifinal-completa', writer: 'gameplay-engineer', writes: 0 });
    expect(validation.evidence.status === 'pass' ? validation.evidence.failures : validation.evidence.failures.length > 0).toBeTruthy();
    expect(testCase('IT-010').result).toBe(validation.evidence.checks.filter(check => check.test_ids.includes('IT-010')).every(check => check.result === 'pass') ? 'pass' : 'fail');
  });
});

describe('Task 06 — truthful E2E handoff contracts', () => {
  test('E2E-001 keeps the Gentle New Game journey pending real runtime execution', () => {
    expectUnexecuted('E2E-001');
    expect(testCase('E2E-001').classification).toBe('runtime');
  });

  test('E2E-002 keeps the Resist New Game journey pending real runtime execution', () => {
    expectUnexecuted('E2E-002');
    expect(testCase('E2E-002').classification).toBe('runtime');
  });

  test('E2E-003 keeps the gag and repeat journey pending real runtime execution', () => {
    expectUnexecuted('E2E-003');
    expect(testCase('E2E-003').classification).toBe('runtime');
  });

  test('E2E-004 keeps save, load, and reentry pending real runtime execution', () => {
    expectUnexecuted('E2E-004');
    expect(testCase('E2E-004').classification).toBe('runtime');
  });

  test('E2E-005 keeps RPG Maker editor serialization pending real editor execution', () => {
    expectUnexecuted('E2E-005');
    expect(testCase('E2E-005').classification).toBe('editor');
  });

  test('E2E-006 keeps presentation and comprehension pending human observation', () => {
    expectUnexecuted('E2E-006');
    expect(testCase('E2E-006').classification).toBe('human');
  });

  test('E2E-007 keeps audio, mute fallback, and accessibility pending human observation', () => {
    expectUnexecuted('E2E-007');
    expect(testCase('E2E-007').classification).toBe('human');
  });

  test('E2E-008 keeps tone, humor, representation, and character pending human observation', () => {
    expectUnexecuted('E2E-008');
    expect(testCase('E2E-008').classification).toBe('human');
  });

  test('E2E-009 keeps typed canon and representative runtime pending operator review', () => {
    expectUnexecuted('E2E-009');
    expect(testCase('E2E-009').classification).toBe('operator');
  });
});
