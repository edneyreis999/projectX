/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const { buildEvidenceProvenance, fingerprintInput, verifyEvidenceFreshness } = require('../../../scripts/lib/validation-evidence.js');

function git(root, args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function createRepository() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'validation-evidence-'));
  git(root, ['init', '-q']);
  git(root, ['config', 'user.name', 'Harness Test']);
  git(root, ['config', 'user.email', 'harness@example.invalid']);
  fs.mkdirSync(path.join(root, 'inputs'));
  fs.writeFileSync(path.join(root, 'inputs/a.txt'), 'alpha\n');
  fs.writeFileSync(path.join(root, 'inputs/b.txt'), 'beta\n');
  git(root, ['add', '.']);
  git(root, ['commit', '-qm', 'test: seed evidence repository']);
  return root;
}

describe('content-addressed validation evidence', () => {
  const generator = { name: 'test-validator', version: '1.0.0' };
  let root;

  afterEach(() => {
    if (root) fs.rmSync(root, { recursive: true, force: true });
    root = null;
  });

  test('hashes directory contents deterministically', () => {
    root = createRepository();
    const first = fingerprintInput(root, 'inputs');
    const second = fingerprintInput(root, 'inputs');
    expect(first).toEqual(second);
    expect(first).toMatchObject({ kind: 'directory', fileCount: 2 });
  });

  test('is fresh only while revision, generator and inputs still match', () => {
    root = createRepository();
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs'], generator });
    const evidence = { provenance, status: 'pass' };
    expect(provenance.revision).toMatchObject({ revisionState: 'committed', untrackedInputs: [] });
    expect(verifyEvidenceFreshness({ evidence, rootDir: root, generator })).toEqual({ status: 'fresh' });

    fs.writeFileSync(path.join(root, 'inputs/a.txt'), 'changed\n');
    const stale = verifyEvidenceFreshness({ evidence, rootDir: root, generator });
    expect(stale.status).toBe('stale_evidence');
    expect(stale.reasons).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'input_changed', path: 'inputs' })]));
  });

  test('exposes the same freshness decision through the public CLI', () => {
    root = createRepository();
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs'], generator });
    fs.writeFileSync(path.join(root, 'evidence.json'), `${JSON.stringify({ provenance, status: 'pass' }, null, 2)}\n`);
    const script = path.resolve(__dirname, '../../../scripts/check-validation-evidence.js');
    const result = require('node:child_process').spawnSync(process.execPath, [script, '--evidence', 'evidence.json'], {
      cwd: root,
      encoding: 'utf8',
    });
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'fresh' });
  });

  test('detects a new commit even when covered bytes return to their prior value', () => {
    root = createRepository();
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs'], generator });
    fs.writeFileSync(path.join(root, 'unrelated.txt'), 'new revision\n');
    git(root, ['add', '.']);
    git(root, ['commit', '-qm', 'test: advance revision']);
    const stale = verifyEvidenceFreshness({ evidence: { provenance }, rootDir: root, generator });
    expect(stale.reasons).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'head_changed' })]));
  });

  test('marks ignored inputs as untracked instead of release-safe', () => {
    root = createRepository();
    fs.writeFileSync(path.join(root, '.gitignore'), 'private-input.txt\n');
    git(root, ['add', '.gitignore']);
    git(root, ['commit', '-qm', 'test: ignore local evidence input']);
    fs.writeFileSync(path.join(root, 'private-input.txt'), 'local only\n');
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['private-input.txt'], generator });
    expect(provenance.revision).toMatchObject({
      revisionState: 'untracked_inputs',
      untrackedInputs: ['private-input.txt'],
    });
  });

  test('becomes stale when an input stops being versioned without changing bytes', () => {
    root = createRepository();
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs/a.txt'], generator });

    git(root, ['rm', '--cached', 'inputs/a.txt']);

    const stale = verifyEvidenceFreshness({ evidence: { provenance }, rootDir: root, generator });
    expect(stale.reasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'input_tracking_changed',
          expected: [],
          observed: ['inputs/a.txt'],
        }),
      ]),
    );
  });

  test('becomes stale when an input changes executable mode without changing bytes', () => {
    root = createRepository();
    const input = path.join(root, 'inputs/a.txt');
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs/a.txt'], generator });

    fs.chmodSync(input, 0o755);

    const stale = verifyEvidenceFreshness({ evidence: { provenance }, rootDir: root, generator });
    expect(stale.reasons).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'input_changed', path: 'inputs/a.txt' })]));
  });

  test('does not expire evidence for unrelated worktree dirt', () => {
    root = createRepository();
    const provenance = buildEvidenceProvenance({ rootDir: root, inputPaths: ['inputs/a.txt'], generator });

    fs.writeFileSync(path.join(root, 'unrelated.txt'), 'outside the evidence inputs\n');

    expect(verifyEvidenceFreshness({ evidence: { provenance }, rootDir: root, generator })).toEqual({ status: 'fresh' });
  });

  test('blocks an unknown evidence schema before reporting freshness', () => {
    root = createRepository();
    expect(verifyEvidenceFreshness({ evidence: {}, rootDir: root, generator })).toEqual({
      status: 'blocked',
      code: 'invalid_evidence_schema',
    });
  });
});
