import { createHash } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const planDir = "planos/003-falas-casa-forjaprata";
const runId = "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5";
const executionId = "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83";
const policyDigest = "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78";
const auditConfiguration = { schema_version: 1, frequency: "phase", source: "default", policy_digest: policyDigest };
const taskRef = `${planDir}/task-1.1.md`;
const tasksRef = `${planDir}/tasks.md`;
const invocationRef = `${planDir}/builds/execution-input-v2.json`;
const metricsRef = `${planDir}/builds/metrics/execution-metrics.json`;
const resultRef = `${planDir}/builds/result-v3.json`;
const dashboardRef = `${planDir}/builds/dashboard-v3.json`;
const consistencyRef = `${planDir}/builds/consistency-v2.json`;
const terminalRef = `${planDir}/builds/terminal-evidence-v1.json`;
const primaryRef = `${planDir}/builds/fase1/validator-record-v2.json`;
const finalRef = `${planDir}/builds/fase1/final-validator-record-v2.json`;
const handoffRef = `${planDir}/builds/fase1/writer-handoff-v2.json`;
const firstAuditRef = `${planDir}/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v1.json`;
const replayAuditRef = `${planDir}/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v2.json`;
const checkpointRef = `${planDir}/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-1.json`;
const reportRef = `${planDir}/builds/fase1/map045-validation-report.json`;
const previewRef = `${planDir}/builds/fase1/map045-preview.json`;
const severityRef = `${planDir}/builds/fase1/validation-cycles/cycle-1/severity-finding-v2.json`;
const failedReportRef = `${planDir}/builds/fase1/validation-cycles/cycle-1/failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json`;
const playtestRef = `${planDir}/interaction/fase1/playtest-map045.md`;

const targetRows = [
  { path: "frontend/data/Map045.json", digest: "sha256:68c77591e43a96f1d60630ac1c7250f45238bb43a24654f79997a75fcd1c16f3" },
  { path: `${planDir}/builds/fase1/map045-repair-manifest.json`, digest: "sha256:eadf6620e3078ef260af57e8f7808416727ac2aed24367fb1bd008499f4b96fa" },
  { path: previewRef, digest: "sha256:c558add433ba4dc5bf7f3b2783e29528522581da7c1a80f32620617409648c56" },
  { path: reportRef, digest: "sha256:3fc54fd6ca4f2abadc99370914a829a941166bd4a42d39060e3430170b06a242" },
  { path: `${planDir}/builds/fase1/repair-map045-encoding.mjs`, digest: "sha256:e4d45847315513026ef756b34c5ef39f3ead6db28ad63476f9c4bb05a711100c" },
  { path: `${planDir}/builds/fase1/validate-map045-encoding.mjs`, digest: "sha256:3a1021b555e03895e0c8f95cf3e60c7c1023a968ef4deef35f6dfeeb83a5b118" },
];

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

for (const row of targetRows) assert(bytesDigest(row.path) === row.digest, `Target drift: ${row.path}`);
assert(bytesDigest(failedReportRef) === "sha256:9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195", "Historical failure evidence digest mismatch");
const replayAudit = JSON.parse(readFileSync(absolute(replayAuditRef), "utf8"));
assert(["approved", "approved-static-runtime-pending"].includes(replayAudit.status), `Replay audit is not approved: ${replayAudit.status}`);

const coverage = {
  membership_refs: [taskRef],
  covered_handoff_refs: [handoffRef],
  covered_target_digests: targetRows.map(row => `${row.path}=${row.digest}`),
  primary_validation_refs: [primaryRef],
  final_validator_refs: [finalRef],
};
const checkpoint = {
  schema_version: 1,
  audit_id: "",
  run_id: runId,
  execution_id: executionId,
  policy_digest: policyDigest,
  frequency: "phase",
  boundary_type: "phase",
  boundary_ref: "phase:fase1",
  iteration: 1,
  predecessor_audit_ref: firstAuditRef,
  replay: true,
  replay_cause: "post-handoff Map045 drift invalidated the initial six-target coverage",
  membership_refs: coverage.membership_refs,
  coverage_digest: canonicalDigest(coverage),
  covered_handoff_refs: coverage.covered_handoff_refs,
  covered_target_digests: coverage.covered_target_digests,
  primary_validation_refs: coverage.primary_validation_refs,
  final_validator_refs: coverage.final_validator_refs,
  auditor_identity: "auditor:phase-map045-v2",
  writer_identities: ["agent:technical-implementer-map045"],
  auditor_run_refs: [replayAuditRef],
  finding_refs: [firstAuditRef],
  correction_refs: [handoffRef, severityRef],
  evidence_refs: [replayAuditRef, reportRef, failedReportRef],
  status: "approved",
  next_action: "perform the prescribed human Playtest",
};
checkpoint.audit_id = typedId("execution-audit-v1", {
  execution_id: checkpoint.execution_id,
  policy_digest: checkpoint.policy_digest,
  boundary_type: checkpoint.boundary_type,
  boundary_ref: checkpoint.boundary_ref,
  iteration: checkpoint.iteration,
  coverage_digest: checkpoint.coverage_digest,
});
writeJson(checkpointRef, checkpoint);

const unavailableUsage = () => ({ status: "unavailable", exact: null, estimate: null, unavailable_reason: "verified agent-run usage unavailable" });
const spans = [];
function addSpan(fields) {
  const span = {
    span_id: "",
    kind: fields.kind,
    parent_span_id: fields.parent_span_id ?? null,
    owner: fields.owner,
    status: fields.status ?? "completed",
    started_at_utc: fields.started_at_utc ?? null,
    ended_at_utc: fields.ended_at_utc ?? null,
    monotonic_duration_ms: null,
    clock_provenance: "unavailable",
    clock_degradation_reason: "monotonic clock export unavailable",
    iteration: fields.iteration ?? 0,
    replay: fields.replay ?? false,
    replay_cause: fields.replay_cause ?? null,
    cause_span_id: fields.cause_span_id ?? null,
    correlation_refs: fields.correlation_refs,
    duplicates_child_usage: false,
    usage: unavailableUsage(),
    validator_observation: fields.validator_observation ?? null,
  };
  span.span_id = typedId("execution-span-v1", { kind: span.kind, owner: span.owner, iteration: span.iteration, replay: span.replay, correlation_refs: span.correlation_refs });
  spans.push(span);
  return span.span_id;
}
const runSpan = addSpan({ kind: "run", owner: "orchestrator", started_at_utc: "2026-07-31T00:00:00Z", ended_at_utc: "2026-07-31T04:40:00Z", correlation_refs: [invocationRef] });
addSpan({ kind: "task", owner: "agent-run-v1:d7ce9fd3ce5ef4d4d357958962947e6c2a46ebf1b3c6aaa11c7be5e4f2e7c716", parent_span_id: runSpan, correlation_refs: [taskRef, `${planDir}/builds/fase1/writer-completion-v1.json`] });
addSpan({ kind: "handoff", owner: "agent-run-v1:d7ce9fd3ce5ef4d4d357958962947e6c2a46ebf1b3c6aaa11c7be5e4f2e7c716", parent_span_id: runSpan, correlation_refs: [`${planDir}/builds/fase1/writer-handoff-v1.json`] });
const initialValidator = addSpan({ kind: "validator", owner: "orchestrator", parent_span_id: runSpan, correlation_refs: [failedReportRef], validator_observation: { command: "node validate-map045-encoding.mjs", validator_version: "map045-validator-v1", input_digest: "sha256:9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195", policy_digest: policyDigest, execution_mode: "executed", replay_cause: null, would_reuse: false } });
const initialAudit = addSpan({ kind: "audit", owner: "orchestrator", parent_span_id: runSpan, correlation_refs: [firstAuditRef] });
addSpan({ kind: "reconciliation", owner: "agent-run-v1:80ef592177bbf604c1530d3e32b4b0a330d8827d48444f87b60d731a67f7e3a6", parent_span_id: runSpan, iteration: 1, correlation_refs: [`${planDir}/builds/fase1/writer-completion-v2.json`, severityRef] });
addSpan({ kind: "handoff", owner: "agent-run-v1:80ef592177bbf604c1530d3e32b4b0a330d8827d48444f87b60d731a67f7e3a6", parent_span_id: runSpan, iteration: 1, correlation_refs: [handoffRef] });
const validatorReplayCause = "full validator replay after post-handoff drift reconciliation";
addSpan({ kind: "validator", owner: "orchestrator", parent_span_id: runSpan, iteration: 1, replay: true, replay_cause: validatorReplayCause, cause_span_id: initialValidator, correlation_refs: [primaryRef, finalRef, reportRef], validator_observation: { command: "node validate-map045-encoding.mjs", validator_version: "map045-validator-v2", input_digest: bytesDigest(reportRef), policy_digest: policyDigest, execution_mode: "executed", replay_cause: validatorReplayCause, would_reuse: false } });
addSpan({ kind: "audit", owner: "orchestrator", parent_span_id: runSpan, iteration: 1, replay: true, replay_cause: checkpoint.replay_cause, cause_span_id: initialAudit, correlation_refs: [replayAuditRef, checkpointRef] });

const counts = {
  agents: new Set(spans.map(span => span.owner)).size,
  handoffs: spans.filter(span => span.kind === "handoff").length,
  validators_executed: spans.filter(span => span.kind === "validator" && span.validator_observation.execution_mode === "executed").length,
  validators_referenced: spans.filter(span => span.kind === "validator" && span.validator_observation.execution_mode === "referenced").length,
  validators_repeated: spans.filter(span => span.kind === "validator" && span.replay).length,
  retries: spans.filter(span => span.kind === "task" && span.iteration > 0).length,
  replays: spans.filter(span => span.replay).length,
  gates: spans.filter(span => span.kind === "gate").length,
  reconciliations: spans.filter(span => span.kind === "reconciliation").length,
};
const metrics = {
  schema_version: 1,
  metrics_id: "",
  run_id: runId,
  execution_id: executionId,
  generated_at_utc: "2026-07-31T04:40:00Z",
  status: "unavailable",
  degradation_reason: "Codex adapter has no verified run-scoped usage or monotonic-clock export for this run",
  clock_provenance: { wall_clock: "observed", monotonic_clock: "unavailable", reason: "monotonic clock export unavailable" },
  spans,
  aggregates: {
    exact_usage: { input_tokens: null, cached_input_tokens: null, output_tokens: null, reasoning_output_tokens: null, total_tokens: null },
    estimated_usage: { estimated_tokens: null, lower_bound_tokens: null, upper_bound_tokens: null, observable_payload_bytes: null, confidence: "unavailable" },
    non_agent_observations: [],
    counts,
    durations: { elapsed_ms: null, active_ms: null, critical_path_ms: null },
    critical_path_span_ids: [],
    unavailable_reasons: [
      { field: "durations.active_ms", reason: "monotonic clock unavailable" },
      { field: "durations.critical_path_ms", reason: "monotonic clock unavailable" },
      { field: "durations.elapsed_ms", reason: "monotonic clock unavailable" },
    ],
  },
  telemetry_changed_functional_status: false,
  metrics_digest: "",
};
const metricsHash = sha256(Buffer.from(canonical(Object.fromEntries(Object.entries(metrics).filter(([key]) => !["metrics_id", "metrics_digest"].includes(key)))), "utf8"));
metrics.metrics_id = `execution-metrics-v1:${metricsHash}`;
metrics.metrics_digest = `sha256:${metricsHash}`;
writeJson(metricsRef, metrics);
const metricsBytesDigest = bytesDigest(metricsRef);

const terminal = {
  schema_version: 1,
  run_id: runId,
  execution_id: executionId,
  status: "pending-human-validation",
  task_statuses: [{ task_ref: taskRef, status: "passed" }],
  acceptance_criterion_refs: ["AC-MAP045-01", "AC-MAP045-02", "AC-MAP045-03", "AC-MAP045-04"].map(id => `${taskRef}#${id}`),
  validator_refs: [primaryRef, finalRef],
  gate_refs: [],
  audit_checkpoint_refs: [checkpointRef],
  evidence_refs: [reportRef, replayAuditRef, playtestRef],
};
writeJson(terminalRef, terminal);

const status = "pending-human-validation";
const nextAction = "execute the Map045 Playtest guide and report the result";
const invocation = JSON.parse(readFileSync(absolute(invocationRef), "utf8"));
const state = {
  schema_version: 3,
  run_id: runId,
  execution_id: executionId,
  command_identity_digest: canonicalDigest(invocation.command_identity),
  execution_input_digest: bytesDigest(invocationRef),
  audit_configuration: auditConfiguration,
  status,
  task_refs: [taskRef],
  audit_checkpoint_refs: [checkpointRef],
  result_ref: resultRef,
  dashboard_ref: dashboardRef,
  consistency_packet_ref: consistencyRef,
  terminal_evidence_refs: [terminalRef],
  execution_metrics_ref: metricsRef,
  execution_metrics_digest: metricsBytesDigest,
  execution_metrics_status: metrics.status,
  execution_metrics_degradation_reason: metrics.degradation_reason,
  next_action: nextAction,
  state_digest: "",
};
state.state_digest = canonicalDigest(Object.fromEntries(Object.entries(state).filter(([key]) => key !== "state_digest")));
const result = {
  schema_version: 3, run_id: runId, execution_id: executionId, status, state_digest: state.state_digest,
  audit_configuration: auditConfiguration, audit_checkpoint_refs: [checkpointRef],
  task_results: [{ task_ref: taskRef, status: "passed", evidence_refs: [reportRef, previewRef, severityRef, failedReportRef] }],
  final_validator_refs: [finalRef], terminal_evidence_refs: [terminalRef],
  execution_metrics_ref: metricsRef, execution_metrics_digest: metricsBytesDigest, execution_metrics_status: metrics.status,
  execution_metrics_degradation_reason: metrics.degradation_reason, next_action: nextAction, result_digest: "",
};
result.result_digest = canonicalDigest(Object.fromEntries(Object.entries(result).filter(([key]) => key !== "result_digest")));
const dashboard = {
  schema_version: 3, run_id: runId, execution_id: executionId, status, audit_configuration: auditConfiguration,
  audit_checkpoint_refs: [checkpointRef], tasks: [{ task_ref: taskRef, status: "passed" }], final_validator_refs: [finalRef],
  terminal_evidence_refs: [terminalRef], execution_metrics_ref: metricsRef, execution_metrics_digest: metricsBytesDigest,
  execution_metrics_status: metrics.status, execution_metrics_degradation_reason: metrics.degradation_reason,
  next_action: nextAction, dashboard_digest: "",
};
dashboard.dashboard_digest = canonicalDigest(Object.fromEntries(Object.entries(dashboard).filter(([key]) => key !== "dashboard_digest")));
writeJson(resultRef, result);
writeJson(dashboardRef, dashboard);

const taskPath = absolute(taskRef);
let taskMarkdown = readFileSync(taskPath, "utf8");
taskMarkdown = taskMarkdown.replace('"audit_checkpoint_refs": [],', `"audit_checkpoint_refs": [\n      "${checkpointRef}"\n    ],`);
assert(taskMarkdown.includes(checkpointRef), "Task checkpoint reference was not inserted");
writeAtomic(taskRef, taskMarkdown);

const tasksPath = absolute(tasksRef);
let tasksMarkdown = readFileSync(tasksPath, "utf8");
const runContract = { loki_run_plan: { final_validator_refs: [finalRef], schema_version: 1, task_refs: [taskRef] }, loki_run_state: state };
const matches = tasksMarkdown.match(/```json\r?\n[\s\S]*?\r?\n```/g);
assert(matches?.length === 1, `Expected one JSON contract block in tasks.md, found ${matches?.length ?? 0}`);
tasksMarkdown = tasksMarkdown.replace(matches[0], `\`\`\`json\n${JSON.stringify(runContract, null, 2)}\n\`\`\``);
writeAtomic(tasksRef, tasksMarkdown);

const validatorDigest = canonicalDigest({ [primaryRef]: bytesDigest(primaryRef), [finalRef]: bytesDigest(finalRef) });
const consistency = {
  schema_version: 2, run_id: runId, execution_id: executionId, status, audit_configuration: auditConfiguration,
  state_digest: state.state_digest, tasks_md_digest: bytesDigest(tasksRef), result_ref: resultRef, result_digest: bytesDigest(resultRef),
  dashboard_ref: dashboardRef, dashboard_digest: bytesDigest(dashboardRef), metrics_ref: metricsRef, metrics_digest: metricsBytesDigest,
  audit_checkpoint_refs: [checkpointRef], audit_checkpoint_digests: [bytesDigest(checkpointRef)],
  terminal_evidence_refs: [terminalRef], terminal_evidence_digests: [bytesDigest(terminalRef)], validator_digest: validatorDigest,
};
writeJson(consistencyRef, consistency);

process.stdout.write(`${JSON.stringify({ status, checkpoint_ref: checkpointRef, metrics_digest: metricsBytesDigest, state_digest: state.state_digest, validator_digest: validatorDigest })}\n`);
