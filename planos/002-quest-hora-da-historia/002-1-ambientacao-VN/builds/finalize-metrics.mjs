import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const out = path.join(root, "planos/004-ambientacao-VN/builds/metrics/execution-metrics.json");
const runId = "loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1";
const executionId = "loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a";
const auditId = "execution-audit-v1:4c64e5870f213fea063d6505502071397eaa5b0469f31853a1aa6cebaa29948e";
const checkpoint = "planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/checkpoint-v1-0.yaml";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function digest(value) {
  return crypto.createHash("sha256").update(canonical(value), "utf8").digest("hex");
}

function span(kind, owner, correlationRefs, status = "completed", validatorObservation = null) {
  const descriptor = { execution_id: executionId, kind, owner, correlation_refs: correlationRefs };
  return {
    span_id: `execution-span-v1:${digest(descriptor)}`,
    kind,
    parent_span_id: null,
    owner,
    status,
    started_at_utc: null,
    ended_at_utc: null,
    monotonic_duration_ms: null,
    clock_provenance: "unavailable",
    clock_degradation_reason: "O adapter não publicou timestamps monotônicos verificáveis para este span.",
    iteration: 0,
    replay: false,
    replay_cause: null,
    cause_span_id: null,
    correlation_refs: correlationRefs,
    duplicates_child_usage: false,
    usage: {
      status: "unavailable",
      exact: null,
      estimate: null,
      unavailable_reason: "Codex não expôs contador verificado e run-scoped."
    },
    validator_observation: validatorObservation
  };
}

const rootDescriptor = { execution_id: executionId, kind: "run", owner: "orchestrator" };
const rootSpanId = `execution-span-v1:${digest(rootDescriptor)}`;
const children = [
  span("handoff", "technical-implementer", ["planos/004-ambientacao-VN/task-1.1.md", "planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json"]),
  span("validator", "technical-implementer", ["planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs", "planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json"], "completed", {
    command: "node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs",
    validator_version: "sha256:4feb1d73025429bc2b0faaa7de799ae046ae63ed64639b02a4d45ebc09bc96d8",
    input_digest: "sha256:861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892",
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78",
    execution_mode: "executed",
    replay_cause: null,
    would_reuse: false
  }),
  span("audit", "map046-phase-auditor", ["planos/004-ambientacao-VN/tasks.md#fase-1-implementacao-e-validacao-estatica", checkpoint, auditId, "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78", "sha256:4b2b81fa8f96379db0c920bd1f927987f137655eaacfc94f98e66ad8429055c9", "planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json"]),
  span("validator", "orchestrator", ["planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs", "planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json", checkpoint], "completed", {
    command: "node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs",
    validator_version: "sha256:4feb1d73025429bc2b0faaa7de799ae046ae63ed64639b02a4d45ebc09bc96d8",
    input_digest: "sha256:861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892",
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78",
    execution_mode: "executed",
    replay_cause: "final-applicable-validator-after-independent-audit",
    would_reuse: false
  }),
  span("gate", "orchestrator", ["planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json", "planos/004-ambientacao-VN/interaction/fase1/task-1.1/human-validation-v1.json", "RQ-P01-RQ-P09"], "completed")
];
for (const child of children) child.parent_span_id = rootSpanId;

const base = {
  schema_version: 1,
  run_id: runId,
  execution_id: executionId,
  generated_at_utc: new Date().toISOString(),
  status: "partial",
  degradation_reason: "Uso exato e durações monotônicas não estão disponíveis; contagens funcionais e resultados dos validators foram reconciliados.",
  clock_provenance: {
    wall_clock: "partial",
    monotonic_clock: "unavailable",
    reason: "Somente timestamps de arquivos estão disponíveis; não há relógio monotônico persistido por span."
  },
  spans: [
    {
      span_id: rootSpanId,
      kind: "run",
      parent_span_id: null,
      owner: "orchestrator",
      status: "completed",
      started_at_utc: "2026-07-29T04:00:22.752Z",
      ended_at_utc: new Date().toISOString(),
      monotonic_duration_ms: null,
      clock_provenance: "partial",
      clock_degradation_reason: "Início e término observados sem relógio monotônico persistido.",
      iteration: 0,
      replay: false,
      replay_cause: null,
      cause_span_id: null,
      correlation_refs: ["planos/004-ambientacao-VN/tasks.md", "planos/004-ambientacao-VN/task-1.1.md"],
      duplicates_child_usage: false,
      usage: {
        status: "unavailable",
        exact: null,
        estimate: null,
        unavailable_reason: "Codex não expôs contador verificado e run-scoped."
      },
      validator_observation: null
    },
    ...children
  ],
  aggregates: {
    exact_usage: { input_tokens: null, cached_input_tokens: null, output_tokens: null, reasoning_output_tokens: null, total_tokens: null },
    estimated_usage: { estimated_tokens: null, lower_bound_tokens: null, upper_bound_tokens: null, observable_payload_bytes: null, confidence: "unavailable" },
    non_agent_observations: [],
    counts: { agents: 2, handoffs: 2, validators_executed: 6, validators_referenced: 1, validators_repeated: 5, retries: 2, replays: 0, gates: 1, reconciliations: 3 },
    durations: { elapsed_ms: null, active_ms: null, critical_path_ms: null },
    critical_path_span_ids: [],
    unavailable_reasons: [
      { field: "durations.elapsed_ms", reason: "Não há relógio monotônico persistido." },
      { field: "durations.active_ms", reason: "Não há duração monotônica por span." },
      { field: "durations.critical_path_ms", reason: "Nenhuma cadeia root-to-leaf possui duração monotônica integral." },
      { field: "exact_usage", reason: "O adapter não publicou contadores run-scoped verificados." },
      { field: "estimated_usage", reason: "Nenhuma estimativa de tokens foi publicada." }
    ]
  },
  telemetry_changed_functional_status: false
};

const identityDigest = digest(base);
const metrics = {
  schema_version: base.schema_version,
  metrics_id: `execution-metrics-v1:${identityDigest}`,
  ...Object.fromEntries(Object.entries(base).slice(1)),
  metrics_digest: `sha256:${identityDigest}`
};
const bytes = `${JSON.stringify(metrics, null, 2)}\n`;
const temp = `${out}.tmp-${process.pid}`;
fs.writeFileSync(temp, bytes, "utf8");
const handle = fs.openSync(temp, "r");
try {
  fs.fsyncSync(handle);
} catch (error) {
  if (error?.code !== "EPERM") throw error;
}
fs.closeSync(handle);
fs.renameSync(temp, out);
console.log(JSON.stringify({ status: metrics.status, metrics_digest: metrics.metrics_digest, ref: path.relative(root, out).replaceAll("\\", "/") }));
