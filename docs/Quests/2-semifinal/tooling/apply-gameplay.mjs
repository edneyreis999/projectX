#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyAtomicPlan } from './lib/writer-runtime.mjs';
import { COMMAND, FEATURE, parseGameplayArguments, planGameplayRemediation } from './lib/semifinal-gameplay.mjs';

function output(value) {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

try {
  const { checkOnly } = parseGameplayArguments(process.argv.slice(2));
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
  const plan = planGameplayRemediation({ rootDir, checkOnly });
  if (checkOnly) {
    const converged = plan.targets.length === 0;
    output({ status: converged ? 'converged' : 'ready_to_apply', feature: FEATURE, writer: plan.writer, targets: plan.targets });
    if (!converged) process.exitCode = 1;
  } else {
    output(await applyAtomicPlan({ rootDir, ...plan, allowedTargets: plan.allowedTargets }));
  }
} catch (error) {
  const code = error?.code ?? 'precondition_mismatch';
  const details = {};
  for (const key of ['path', 'anchor', 'command', 'accepted', 'kind', 'reference', 'entry', 'value', 'state']) {
    if (error?.[key] !== undefined) details[key] = error[key];
  }
  if (code === 'invalid_arguments' && details.command === undefined) {
    details.command = COMMAND;
    details.accepted = ['--check'];
  }
  if (code === 'precondition_mismatch' && details.anchor === 'Map062:E19') {
    details.writer = 'gameplay-engineer';
  }
  output({ status: 'blocked', code, ...details });
  process.exitCode = 1;
}
