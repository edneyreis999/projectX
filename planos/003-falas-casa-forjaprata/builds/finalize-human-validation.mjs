import { createHash } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const planDir = "planos/003-falas-casa-forjaprata";
const runId = "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5";
const executionId = "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83";
const confirmedAt = "2026-07-31T05:08:52Z";
const finalizedAt = "2026-07-31T05:32:16Z";
const taskRef = `${planDir}/task-1.1.md`;
const tasksRef = `${planDir}/tasks.md`;
const guideRef = `${planDir}/interaction/fase1/playtest-map045.md`;
const interactionRef = `${planDir}/interaction/fase1/playtest-result-v1.json`;
const gateRef = `${planDir}/builds/fase1/playtest-gate-v1.json`;
const metricsRef = `${planDir}/builds/metrics/execution-metrics.json`;
const terminalRef = `${planDir}/builds/terminal-evidence-v1.json`;
const resultRef = `${planDir}/builds/result-v3.json`;
const dashboardRef = `${planDir}/builds/dashboard-v3.json`;
const consistencyRef = `${planDir}/builds/consistency-v2.json`;
const reportRef = `${planDir}/builds/fase1/map045-validation-report.json`;
const writerCompletionRef = `${planDir}/builds/fase1/writer-completion-v3.json`;
const writerHandoffRef = `${planDir}/builds/fase1/writer-handoff-v3.json`;
const primaryValidatorRef = `${planDir}/builds/fase1/validator-record-v3.json`;
const finalValidatorRef = `${planDir}/builds/fase1/final-validator-record-v3.json`;
const auditRef = `${planDir}/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v3.json`;
const checkpointRef = `${planDir}/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-2.json`;

function absolute(ref) { return resolve(projectRoot, ref); }
function sha256(value) { return createHash("sha256").update(value).digest("hex"); }
function bytesDigest(ref) { return `sha256:${sha256(readFileSync(absolute(ref)))}`; }
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
function canonicalDigest(value) { return `sha256:${sha256(Buffer.from(canonical(value), "utf8"))}`; }
function typedId(prefix, value) { return `${prefix}:${canonicalDigest(value).slice(7)}`; }
function assert(condition, message) { if (!condition) throw new Error(message); }
function writeAtomic(ref, contents) {
  const path = absolute(ref);
  const temporary = resolve(dirname(path), `.${basename(path)}.${process.pid}.tmp`);
  try { writeFileSync(temporary, contents); renameSync(temporary, path); }
  finally { if (existsSync(temporary)) unlinkSync(temporary); }
}
function writeJson(ref, value) { writeAtomic(ref, `${JSON.stringify(value, null, 2)}\n`); }
function markdownContract(text) {
  const matches = [...text.matchAll(/```json\r?\n([\s\S]*?)\r?\n```/g)];
  assert(matches.length === 1, `Expected one JSON contract block, found ${matches.length}`);
  return { full: matches[0][0], value: JSON.parse(matches[0][1]) };
}

assert(bytesDigest("frontend/data/Map045.json") === "sha256:d8776988caa9641889a3b26256e777a855280d994ef9343d30be124b148bbdd4", "Map045 drifted after post-Playtest static approval");
assert(bytesDigest(reportRef) === "sha256:d39a35cbf489d8cd9356c74205b96df9756f26730e0913709422c3b7d4d08858", "Static report drifted after post-Playtest audit");
const report = JSON.parse(readFileSync(absolute(reportRef), "utf8"));
const audit = JSON.parse(readFileSync(absolute(auditRef), "utf8"));
const checkpoint = JSON.parse(readFileSync(absolute(checkpointRef), "utf8"));
assert(report.status === "passed-static-runtime-pending" && report.checks.length === 146, "Static validation is not ready for human closure");
assert(audit.status === "approved" && audit.completion_summary?.boundary_approved === true, "Audit boundary is not approved");
assert(checkpoint.status === "approved" && checkpoint.iteration === 2, "Latest audit checkpoint is not approved");

const interaction = {
  schema_version: 1,
  interaction_id: "human-validation-v1:map045-playtest",
  run_id: runId,
  execution_id: executionId,
  task_ref: taskRef,
  guide_ref: guideRef,
  confirmed_at_utc: confirmedAt,
  source: "explicit-user-confirmation-in-current-conversation",
  confirmation_scope: "All routes and checks in the Map045 Playtest guide were executed and approved.",
  result: "passed",
  runtime_validation: true,
  notes: "The user answered 'eu confirmo' to the explicit question whether all prescribed routes had been tested and approved."
};
writeJson(interactionRef, interaction);

let guide = readFileSync(absolute(guideRef), "utf8");
guide = guide.replace("Status atual: pendente. Os checks automaticos nao validam apresentacao em runtime.", `Status atual: aprovado em ${confirmedAt}. Resultado persistido em \`${interactionRef}\`.`);
if (!guide.includes("## Resultado persistido")) {
  guide += `\n## Resultado persistido\n\n- Status: aprovado.\n- Escopo confirmado: todas as rotas e verificacoes deste guia.\n- Evidencia: \`${interactionRef}\`.\n`;
}
writeAtomic(guideRef, guide);

const gate = {
  schema_version: 1,
  gate_id: "gate-v1:map045-human-playtest",
  task_ref: taskRef,
  status: "passed",
  evidence_refs: [interactionRef, guideRef]
};
writeJson(gateRef, gate);

let taskMarkdown = readFileSync(absolute(taskRef), "utf8");
const taskBlock = markdownContract(taskMarkdown);
taskBlock.value.task_contract.gate_refs = [gateRef];
taskBlock.value.task_contract.audit_checkpoint_refs = [checkpointRef];
taskMarkdown = taskMarkdown.replace(taskBlock.full, `\`\`\`json\n${JSON.stringify(taskBlock.value, null, 2)}\n\`\`\``);
taskMarkdown = taskMarkdown.replace("- Playtest final conforme `interaction/fase1/playtest-map045.md`; nao declarar runtime validado antes do retorno humano.", `- Playtest final aprovado e persistido em \`${interactionRef}\`.`);
writeAtomic(taskRef, taskMarkdown);

const metrics = JSON.parse(readFileSync(absolute(metricsRef), "utf8"));
const rootSpan = metrics.spans.find(span => span.kind === "run" && span.parent_span_id === null);
assert(rootSpan, "Metrics root span missing");
function appendUnavailableSpan(span) {
  if (!metrics.spans.some(existing => existing.span_id === span.span_id)) {
    metrics.spans.push({
      ...span,
      parent_span_id: rootSpan.span_id,
      status: "completed",
      started_at_utc: null,
      ended_at_utc: null,
      monotonic_duration_ms: null,
      clock_provenance: "unavailable",
      clock_degradation_reason: "monotonic clock export unavailable",
      duplicates_child_usage: false,
      usage: { status: "unavailable", exact: null, estimate: null, unavailable_reason: "verified agent-run usage unavailable" },
      validator_observation: span.validator_observation ?? null
    });
  }
}
const reconciliationRefs = [writerCompletionRef, writerHandoffRef, reportRef];
appendUnavailableSpan({
  span_id: typedId("execution-span-v1", { kind: "reconciliation", owner: "agent-run-v1:3537bbb4e7dbba94a12dda6d82f572ad395b6aa794171ff959aa040ba9de2f47", iteration: 2, correlation_refs: reconciliationRefs }),
  kind: "reconciliation",
  owner: "agent-run-v1:3537bbb4e7dbba94a12dda6d82f572ad395b6aa794171ff959aa040ba9de2f47",
  iteration: 2,
  replay: false,
  replay_cause: null,
  cause_span_id: null,
  correlation_refs: reconciliationRefs
});
appendUnavailableSpan({
  span_id: typedId("execution-span-v1", { kind: "handoff", owner: "agent-run-v1:3537bbb4e7dbba94a12dda6d82f572ad395b6aa794171ff959aa040ba9de2f47", iteration: 2, correlation_refs: [writerHandoffRef] }),
  kind: "handoff",
  owner: "agent-run-v1:3537bbb4e7dbba94a12dda6d82f572ad395b6aa794171ff959aa040ba9de2f47",
  iteration: 2,
  replay: false,
  replay_cause: null,
  cause_span_id: null,
  correlation_refs: [writerHandoffRef]
});
appendUnavailableSpan({
  span_id: typedId("execution-span-v1", { kind: "validator", owner: "orchestrator", iteration: 2, correlation_refs: [primaryValidatorRef, finalValidatorRef, reportRef] }),
  kind: "validator",
  owner: "orchestrator",
  iteration: 2,
  replay: true,
  replay_cause: "full validator replay after post-Playtest Map045 drift reconciliation",
  cause_span_id: "execution-span-v1:baaace8390a4a7661184ed121cdee9b9baba8d4139ce6072dd8131c2668c530d",
  correlation_refs: [primaryValidatorRef, finalValidatorRef, reportRef],
  validator_observation: {
    command: "node validate-map045-encoding.mjs",
    validator_version: "map045-validator-v3",
    input_digest: bytesDigest(reportRef),
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78",
    execution_mode: "executed",
    replay_cause: "full validator replay after post-Playtest Map045 drift reconciliation",
    would_reuse: false
  }
});
appendUnavailableSpan({
  span_id: typedId("execution-span-v1", { kind: "audit", owner: "orchestrator", iteration: 2, correlation_refs: [checkpointRef, auditRef] }),
  kind: "audit",
  owner: "orchestrator",
  iteration: 2,
  replay: true,
  replay_cause: checkpoint.replay_cause,
  cause_span_id: "execution-span-v1:d9ed41089d1032352a35257ad9bb6f328cfa7299ab8fdaba7ef38256918ff35e",
  correlation_refs: [
    checkpoint.boundary_ref,
    checkpointRef,
    checkpoint.audit_id,
    checkpoint.policy_digest,
    checkpoint.coverage_digest,
    ...checkpoint.auditor_run_refs
  ]
});
const gateCorrelation = [gateRef, interactionRef];
if (!metrics.spans.some(span => span.kind === "gate" && span.correlation_refs.includes(gateRef))) {
  const gateSpan = {
    span_id: typedId("execution-span-v1", { kind: "gate", owner: "orchestrator", iteration: 0, replay: false, correlation_refs: gateCorrelation }),
    kind: "gate",
    parent_span_id: rootSpan.span_id,
    owner: "orchestrator",
    status: "completed",
    started_at_utc: confirmedAt,
    ended_at_utc: confirmedAt,
    monotonic_duration_ms: null,
    clock_provenance: "unavailable",
    clock_degradation_reason: "monotonic clock export unavailable",
    iteration: 0,
    replay: false,
    replay_cause: null,
    cause_span_id: null,
    correlation_refs: gateCorrelation,
    duplicates_child_usage: false,
    usage: { status: "unavailable", exact: null, estimate: null, unavailable_reason: "verified agent-run usage unavailable" },
    validator_observation: null
  };
  metrics.spans.push(gateSpan);
}
rootSpan.ended_at_utc = finalizedAt;
metrics.generated_at_utc = finalizedAt;
metrics.aggregates.counts = {
  agents: new Set(metrics.spans.map(span => span.owner)).size,
  handoffs: metrics.spans.filter(span => span.kind === "handoff").length,
  validators_executed: metrics.spans.filter(span => span.kind === "validator" && span.validator_observation.execution_mode === "executed").length,
  validators_referenced: metrics.spans.filter(span => span.kind === "validator" && span.validator_observation.execution_mode === "referenced").length,
  validators_repeated: metrics.spans.filter(span => span.kind === "validator" && span.replay).length,
  retries: metrics.spans.filter(span => span.kind === "task" && span.iteration > 0).length,
  replays: metrics.spans.filter(span => span.replay).length,
  gates: metrics.spans.filter(span => span.kind === "gate").length,
  reconciliations: metrics.spans.filter(span => span.kind === "reconciliation").length
};
const metricBasis = Object.fromEntries(Object.entries(metrics).filter(([key]) => !["metrics_id", "metrics_digest"].includes(key)));
const metricsHash = sha256(Buffer.from(canonical(metricBasis), "utf8"));
metrics.metrics_id = `execution-metrics-v1:${metricsHash}`;
metrics.metrics_digest = `sha256:${metricsHash}`;
writeJson(metricsRef, metrics);
const metricsBytesDigest = bytesDigest(metricsRef);

const terminal = JSON.parse(readFileSync(absolute(terminalRef), "utf8"));
terminal.status = "completed";
terminal.validator_refs = [primaryValidatorRef, finalValidatorRef];
terminal.gate_refs = [gateRef];
terminal.audit_checkpoint_refs = [checkpointRef];
terminal.evidence_refs = [...new Set([...terminal.evidence_refs, auditRef, interactionRef])];
writeJson(terminalRef, terminal);

let tasksMarkdown = readFileSync(absolute(tasksRef), "utf8");
const tasksBlock = markdownContract(tasksMarkdown);
const state = tasksBlock.value.loki_run_state;
state.status = "completed";
state.audit_checkpoint_refs = [checkpointRef];
state.execution_metrics_digest = metricsBytesDigest;
state.execution_metrics_status = metrics.status;
state.execution_metrics_degradation_reason = metrics.degradation_reason;
state.next_action = "no implementation action remains; create a commit only on explicit user request";
state.state_digest = canonicalDigest(Object.fromEntries(Object.entries(state).filter(([key]) => key !== "state_digest")));

const result = JSON.parse(readFileSync(absolute(resultRef), "utf8"));
result.status = state.status;
result.state_digest = state.state_digest;
result.audit_checkpoint_refs = state.audit_checkpoint_refs;
result.final_validator_refs = [finalValidatorRef];
result.execution_metrics_digest = metricsBytesDigest;
result.execution_metrics_status = metrics.status;
result.execution_metrics_degradation_reason = metrics.degradation_reason;
result.next_action = state.next_action;
result.result_digest = canonicalDigest(Object.fromEntries(Object.entries(result).filter(([key]) => key !== "result_digest")));
writeJson(resultRef, result);

const dashboard = JSON.parse(readFileSync(absolute(dashboardRef), "utf8"));
dashboard.status = state.status;
dashboard.audit_checkpoint_refs = state.audit_checkpoint_refs;
dashboard.final_validator_refs = [finalValidatorRef];
dashboard.execution_metrics_digest = metricsBytesDigest;
dashboard.execution_metrics_status = metrics.status;
dashboard.execution_metrics_degradation_reason = metrics.degradation_reason;
dashboard.next_action = state.next_action;
dashboard.dashboard_digest = canonicalDigest(Object.fromEntries(Object.entries(dashboard).filter(([key]) => key !== "dashboard_digest")));
writeJson(dashboardRef, dashboard);

tasksBlock.value.loki_run_state = state;
tasksMarkdown = tasksMarkdown.replace(tasksBlock.full, `\`\`\`json\n${JSON.stringify(tasksBlock.value, null, 2)}\n\`\`\``);
tasksMarkdown = tasksMarkdown.replace("status: pending-human-validation", "status: completed");
tasksMarkdown = tasksMarkdown.replace(
  'validator_ref: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v2.json"',
  'validator_ref: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v3.json"'
);
tasksMarkdown = tasksMarkdown.replace(
  "- O Playtest permanece final e nao bloqueia a escrita estatica; o run deve terminar como `pending-human-validation`.",
  `- O Playtest final foi aprovado e persistido em \`${interactionRef}\`; o run termina como \`completed\`.`
);
writeAtomic(tasksRef, tasksMarkdown);

const primaryRef = taskBlock.value.task_contract.task_validation.primary_route.validator_ref;
const finalRefs = tasksBlock.value.loki_run_plan.final_validator_refs;
const validatorDigest = canonicalDigest(Object.fromEntries([primaryRef, ...finalRefs].map(ref => [ref, bytesDigest(ref)])));
const consistency = {
  schema_version: 2,
  run_id: runId,
  execution_id: executionId,
  status: state.status,
  audit_configuration: state.audit_configuration,
  state_digest: state.state_digest,
  tasks_md_digest: bytesDigest(tasksRef),
  result_ref: resultRef,
  result_digest: bytesDigest(resultRef),
  dashboard_ref: dashboardRef,
  dashboard_digest: bytesDigest(dashboardRef),
  metrics_ref: metricsRef,
  metrics_digest: metricsBytesDigest,
  audit_checkpoint_refs: state.audit_checkpoint_refs,
  audit_checkpoint_digests: state.audit_checkpoint_refs.map(bytesDigest),
  terminal_evidence_refs: state.terminal_evidence_refs,
  terminal_evidence_digests: state.terminal_evidence_refs.map(bytesDigest),
  validator_digest: validatorDigest
};
writeJson(consistencyRef, consistency);

process.stdout.write(`${JSON.stringify({ status: state.status, interaction_ref: interactionRef, gate_ref: gateRef, state_digest: state.state_digest, metrics_digest: metricsBytesDigest })}\n`);
