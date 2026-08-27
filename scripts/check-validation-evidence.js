const fs = require('node:fs');
const path = require('node:path');
const { verifyEvidenceFreshness } = require('./lib/validation-evidence.js');

function parseArguments(args) {
  const options = {};
  const valueAfter = (index, option) => {
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`missing_value:${option}`);
    return value;
  };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--evidence') {
      options.evidence = valueAfter(index, argument);
      index += 1;
    } else if (argument === '--base') {
      options.baseRef = valueAfter(index, argument);
      index += 1;
    } else throw new Error(`invalid_argument:${argument}`);
  }
  if (!options.evidence) throw new Error('evidence_path_required');
  return options;
}

function main(args = process.argv.slice(2), rootDir = process.cwd()) {
  try {
    const options = parseArguments(args);
    const evidencePath = path.resolve(rootDir, options.evidence);
    const relativePath = path.relative(rootDir, evidencePath);
    if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
      throw new Error('evidence_path_outside_root');
    }
    const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
    const output = verifyEvidenceFreshness({ evidence, rootDir, baseRef: options.baseRef });
    return { exitCode: output.status === 'fresh' ? 0 : 1, output };
  } catch (error) {
    return { exitCode: 1, output: { status: 'blocked', code: error.message } };
  }
}

if (require.main === module) {
  const result = main();
  process.stdout.write(`${JSON.stringify(result.output, null, 2)}\n`);
  process.exitCode = result.exitCode;
}

module.exports = { main, parseArguments };
