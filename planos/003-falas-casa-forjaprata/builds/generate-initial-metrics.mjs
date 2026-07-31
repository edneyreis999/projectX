import { createHash } from "node:crypto";
import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const output = "planos/003-falas-casa-forjaprata/builds/metrics/execution-metrics.json";
const runId = "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5";
const executionId = "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

const metrics = {
  schema_version: 1,
  metrics_id: "",
  run_id: runId,
  execution_id: executionId,
  generated_at_utc: "2026-07-31T00:00:00Z",
  status: "unavailable",
  degradation_reason: "Codex adapter has no verified run-scoped usage or monotonic-clock export for this run",
  clock_provenance: {
    wall_clock: "observed",
    monotonic_clock: "unavailable",
    reason: "monotonic clock export unavailable"
  },
  spans: [{
    span_id: `execution-span-v1:${sha256("map045-run-root")}`,
    kind: "run",
    parent_span_id: null,
    owner: "orchestrator",
    status: "running",
    started_at_utc: "2026-07-31T00:00:00Z",
    ended_at_utc: null,
    monotonic_duration_ms: null,
    clock_provenance: "unavailable",
    clock_degradation_reason: "monotonic clock export unavailable",
    iteration: 0,
    replay: false,
    replay_cause: null,
    cause_span_id: null,
    correlation_refs: ["planos/003-falas-casa-forjaprata/builds/execution-input-v2.json"],
    duplicates_child_usage: false,
    usage: {
      status: "unavailable",
      exact: null,
      estimate: null,
      unavailable_reason: "verified run-scoped usage unavailable"
    },
    validator_observation: null
  }],
  aggregates: {
    exact_usage: {
      input_tokens: null,
      cached_input_tokens: null,
      output_tokens: null,
      reasoning_output_tokens: null,
      total_tokens: null
    },
    estimated_usage: {
      estimated_tokens: null,
      lower_bound_tokens: null,
      upper_bound_tokens: null,
      observable_payload_bytes: null,
      confidence: "unavailable"
    },
    non_agent_observations: [],
    counts: {
      agents: 1,
      handoffs: 0,
      validators_executed: 0,
      validators_referenced: 0,
      validators_repeated: 0,
      retries: 0,
      replays: 0,
      gates: 0,
      reconciliations: 0
    },
    durations: {
      elapsed_ms: null,
      active_ms: null,
      critical_path_ms: null
    },
    critical_path_span_ids: [],
    unavailable_reasons: [
      { field: "durations.elapsed_ms", reason: "monotonic clock unavailable" },
      { field: "durations.active_ms", reason: "monotonic clock unavailable" },
      { field: "durations.critical_path_ms", reason: "monotonic clock unavailable" }
    ]
  },
  telemetry_changed_functional_status: false,
  metrics_digest: ""
};

const hashMaterial = Object.fromEntries(Object.entries(metrics).filter(([key]) => !["metrics_id", "metrics_digest"].includes(key)));
const digest = sha256(Buffer.from(canonical(hashMaterial), "utf8"));
metrics.metrics_id = `execution-metrics-v1:${digest}`;
metrics.metrics_digest = `sha256:${digest}`;

await mkdir(path.dirname(output), { recursive: true });
const temporary = `${output}.tmp`;
await writeFile(temporary, `${JSON.stringify(metrics, null, 2)}\n`, "utf8");
await rename(temporary, output);
console.log(JSON.stringify({ output, metrics_id: metrics.metrics_id }));
