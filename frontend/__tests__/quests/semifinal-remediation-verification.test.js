/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = 'docs/Quests/2-semifinal/tooling';
const VALIDATOR = `${FEATURE}/validate.mjs`;
const MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/lib/semifinal-verification.mjs`)).href;

function runValidator(args = []) {
  return spawnSync(process.execPath, [VALIDATOR, ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
}

describe('Semifinal authoring-integrity validator', () => {
  test('returns only the mechanically verified claim', () => {
    const result = runValidator();
    expect(result.status).toBe(0);
    const output = JSON.parse(result.stdout);
    expect(output).toMatchObject({ status: 'pass', claim: 'authoring_integrity', feature: 'semifinal', failures: [] });
    expect(output).not.toHaveProperty('human_accepted');
    expect(output).not.toHaveProperty('release_ready');
    expect(output).not.toHaveProperty('runtime_verified');
    expect(output.checks.every(check => check.result === 'pass')).toBe(true);
  });

  test('does not accept evidence or output-file arguments', () => {
    for (const args of [
      ['--human-evidence', 'checklist.md'],
      ['--output', '.artifacts/result.json'],
    ]) {
      const result = runValidator(args);
      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'invalid_arguments', command: 'validate-semifinal', accepted: [] });
    }
  });

  test('does not write validation artifacts', () => {
    const before = fs.existsSync(path.join(ROOT, '.artifacts/validation/semifinal/static-validation.json'));
    expect(runValidator().status).toBe(0);
    expect(fs.existsSync(path.join(ROOT, '.artifacts/validation/semifinal/static-validation.json'))).toBe(before);
  });

  test('exports the same read-only result used by the CLI', async () => {
    const result = spawnSync(
      process.execPath,
      ['--input-type=module', '-e', `import {validateStaticState} from ${JSON.stringify(MODULE)}; console.log(JSON.stringify(validateStaticState({rootDir:process.cwd()})));`],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
    );
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toMatchObject({ status: 'pass', claim: 'authoring_integrity', failures: [] });
  });

  test('keeps the provenance pointer on the active quest-local tooling', () => {
    const provenance = JSON.parse(fs.readFileSync(path.join(ROOT, 'planos/012-add-harness/SEMIFINAL-TOOLING-PROVENANCE.json'), 'utf8'));
    expect(provenance.activeToolingRoot).toBe(FEATURE);
  });
});
