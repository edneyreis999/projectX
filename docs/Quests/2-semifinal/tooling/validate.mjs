#!/usr/bin/env node

import { pathToFileURL } from 'node:url';
import { ROOT, validateStaticState } from './lib/semifinal-verification.mjs';

export function runValidator(args = process.argv.slice(2), { rootDir = ROOT } = {}) {
  if (args.length > 0) {
    return { exitCode: 1, output: { status: 'blocked', code: 'invalid_arguments', command: 'validate-semifinal', accepted: [] } };
  }
  const output = validateStaticState({ rootDir });
  return { exitCode: output.status === 'pass' ? 0 : 1, output };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const result = runValidator();
  process.stdout.write(`${JSON.stringify(result.output)}\n`);
  process.exitCode = result.exitCode;
}
