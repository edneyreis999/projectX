import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const runId = "loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1";
const executionId = "loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a";
const generatedAt = new Date().toISOString();

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

const sha = value => crypto.createHash("sha256").update(value, "utf8").digest("hex");
const spanId = `execution-span-v1:${sha(canonical({ execution_id: executionId, kind: "run", iteration: 0 }))}`;

const metrics = {
  schema_version: 1,
  metrics_id: "",
  run_id: runId,
  execution_id: executionId,
  generated_at_utc: generatedAt,
  status: "partial",
  degradation_reason: "Execução em andamento; uso exato do adapter não está disponível e as durações finais ainda não foram reconciliadas.",
  clock_provenance: {
    wall_clock: "observed",
    monotonic_clock: "unavailable",
    reason: "O checkpoint inicial não possui relógio monotônico persistido."
  },
  spans: [{
    span_id: spanId,
    kind: "run",
    parent_span_id: null,
    owner: "orchestrator",
    status: "running",
    started_at_utc: generatedAt,
    ended_at_utc: null,
    monotonic_duration_ms: null,
    clock_provenance: "partial",
    clock_degradation_reason: "Duração monotônica será reconciliada no terminal checkpoint.",
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
      unavailable_reason: "Codex não expôs contador verificado e run-scoped ao collector."
    },
    validator_observation: null
  }],
  aggregates: {
    exact_usage: { input_tokens: null, cached_input_tokens: null, output_tokens: null, reasoning_output_tokens: null, total_tokens: null },
    estimated_usage: { estimated_tokens: null, lower_bound_tokens: null, upper_bound_tokens: null, observable_payload_bytes: null, confidence: "unavailable" },
    non_agent_observations: [],
    counts: { agents: 0, handoffs: 0, validators_executed: 0, validators_referenced: 1, validators_repeated: 0, retries: 0, replays: 0, gates: 1, reconciliations: 0 },
    durations: { elapsed_ms: null, active_ms: null, critical_path_ms: null },
    critical_path_span_ids: [],
    unavailable_reasons: [
      { field: "durations.elapsed_ms", reason: "Execução em andamento." },
      { field: "durations.active_ms", reason: "Execução em andamento." },
      { field: "durations.critical_path_ms", reason: "Nenhuma cadeia root-to-leaf terminal com duração monotônica observada." },
      { field: "estimated_usage", reason: "Estimativa não publicada neste checkpoint inicial." }
    ]
  },
  telemetry_changed_functional_status: false,
  metrics_digest: ""
};

const digestSource = structuredClone(metrics);
delete digestSource.metrics_id;
delete digestSource.metrics_digest;
const digest = sha(canonical(digestSource));
metrics.metrics_id = `execution-metrics-v1:${digest}`;
metrics.metrics_digest = `sha256:${digest}`;

const destination = path.resolve("planos/004-ambientacao-VN/builds/metrics/execution-metrics.json");
fs.mkdirSync(path.dirname(destination), { recursive: true });
const temp = `${destination}.${digest.slice(0, 16)}.tmp`;
fs.writeFileSync(temp, `${JSON.stringify(metrics, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
fs.renameSync(temp, destination);
console.log(JSON.stringify({ destination, metrics_digest: metrics.metrics_digest }));
