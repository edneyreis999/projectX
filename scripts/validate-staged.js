const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const { changedFilesFromStaged } = require('./validation-impact.js');

function main(rootDir = path.resolve(__dirname, '..')) {
  const files = changedFilesFromStaged(rootDir);
  const snapshot = fs.mkdtempSync(path.join(os.tmpdir(), 'projectx-staged-'));
  try {
    execFileSync('git', ['checkout-index', '--all', `--prefix=${snapshot}${path.sep}`], { cwd: rootDir });
    execFileSync('git', ['init', '--quiet'], { cwd: snapshot });
    execFileSync('git', ['config', 'user.name', 'staged-validator'], { cwd: snapshot });
    execFileSync('git', ['config', 'user.email', 'staged-validator@invalid'], { cwd: snapshot });
    execFileSync('git', ['add', '--all'], { cwd: snapshot });
    execFileSync('git', ['commit', '--quiet', '-m', 'staged snapshot'], { cwd: snapshot });
    const dependencies = path.join(rootDir, 'node_modules');
    if (fs.existsSync(dependencies)) fs.symlinkSync(dependencies, path.join(snapshot, 'node_modules'), 'dir');
    const result = spawnSync(process.execPath, ['scripts/validation-impact.js', '--files', ...files, '--run'], {
      cwd: snapshot,
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    });
    process.stdout.write(result.stdout ?? '');
    process.stderr.write(result.stderr ?? '');
    return result.status ?? 1;
  } finally {
    fs.rmSync(snapshot, { recursive: true, force: true });
  }
}

if (require.main === module) process.exitCode = main();

module.exports = { main };
