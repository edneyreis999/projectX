import fs from "node:fs";
import crypto from "node:crypto";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

const sha = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const json = ref => JSON.parse(fs.readFileSync(ref, "utf8"));

const result = json("planos/004-ambientacao-VN/builds/implement-feature-result-v3.json");
const resultDigest = result.result_digest;
const resultWithoutDigest = { ...result };
delete resultWithoutDigest.result_digest;
if (resultDigest !== `sha256:${sha(Buffer.from(canonical(resultWithoutDigest), "utf8"))}`) throw new Error("result_digest divergente");

const metrics = json("planos/004-ambientacao-VN/builds/metrics/execution-metrics.json");
const metricsDigest = metrics.metrics_digest;
const metricsWithoutIdentity = { ...metrics };
delete metricsWithoutIdentity.metrics_id;
delete metricsWithoutIdentity.metrics_digest;
if (metricsDigest !== `sha256:${sha(Buffer.from(canonical(metricsWithoutIdentity), "utf8"))}`) throw new Error("metrics_digest divergente");

const packet = json("planos/004-ambientacao-VN/builds/consistency-packet-v2.json");
const exactPairs = [
  [packet.result_ref, packet.result_digest],
  [packet.dashboard_ref, packet.dashboard_digest],
  [packet.metrics_ref, packet.metrics_digest],
  [packet.audit_checkpoint_refs[0], packet.audit_checkpoint_digests[0]],
  [packet.terminal_evidence_refs[0], packet.terminal_evidence_digests[0]],
  [packet.terminal_evidence_refs[1], packet.terminal_evidence_digests[1]]
];
for (const [ref, digest] of exactPairs) {
  if (digest !== `sha256:${sha(fs.readFileSync(ref))}`) throw new Error(`digest exato divergente: ${ref}`);
}

const tasks = fs.readFileSync("planos/004-ambientacao-VN/tasks.md", "utf8");
if (!tasks.includes(`state_digest: ${result.state_digest}`)) throw new Error("state_digest não projetado em tasks.md");
if (!tasks.includes("status: completed")) throw new Error("status terminal ausente em tasks.md");
if (result.status !== packet.status || result.status !== "completed") throw new Error("status terminal divergente");
if (metrics.status !== "partial" || result.execution_metrics_status !== metrics.status) throw new Error("projeção de métricas divergente");

console.log(JSON.stringify({
  status: "passed",
  result_digest: resultDigest,
  metrics_digest: metricsDigest,
  exact_file_digests: exactPairs.length,
  terminal_status: result.status
}));
