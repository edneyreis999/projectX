import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const rel = value => path.join(root, value.replaceAll("/", path.sep));
const runId = "loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1";
const executionId = "loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a";
const checkpointRef = "planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/checkpoint-v1-0.yaml";
const validationRef = "planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json";
const completionRef = "planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json";
const auditorReportRef = "planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json";
const terminalRef = "planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json";
const metricsRef = "planos/004-ambientacao-VN/builds/metrics/execution-metrics.json";
const resultRef = "planos/004-ambientacao-VN/builds/implement-feature-result-v3.json";
const dashboardRef = "planos/004-ambientacao-VN/builds/implementation-dashboard-v3.md";
const consistencyRef = "planos/004-ambientacao-VN/builds/consistency-packet-v2.json";
const metricsDigest = "sha256:b424db589854731e158e7150607771127d6a517e17a929b53ed1b2b6868efdb8";
const metricsDegradation = "Uso exato e durações monotônicas não estão disponíveis; contagens funcionais e resultados dos validators foram reconciliados.";
const nextAction = "Executar e registrar o Playtest humano RQ-P01-RQ-P09 em 1280x720.";
const auditConfiguration = {
  schema_version: 1,
  frequency: "phase",
  source: "default",
  policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
};

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

function shaBytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function shaCanonical(value) {
  return shaBytes(Buffer.from(canonical(value), "utf8"));
}

function fileDigest(ref) {
  return `sha256:${shaBytes(fs.readFileSync(rel(ref)))}`;
}

function writeJson(ref, value) {
  fs.writeFileSync(rel(ref), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

const stateWithoutDigest = {
  schema_version: 3,
  run_id: runId,
  execution_id: executionId,
  command_identity_digest: "sha256:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1",
  execution_input_digest: "sha256:fe9deb9d4b8c722274c6caca0db0d8bc500a4426c34a36dad63c57afed00ed24",
  audit_configuration: auditConfiguration,
  status: "pending-human-validation",
  task_refs: ["planos/004-ambientacao-VN/task-1.1.md"],
  audit_checkpoint_refs: [checkpointRef],
  result_ref: resultRef,
  dashboard_ref: dashboardRef,
  consistency_packet_ref: consistencyRef,
  terminal_evidence_refs: [terminalRef],
  execution_metrics_ref: metricsRef,
  execution_metrics_digest: metricsDigest,
  execution_metrics_status: "partial",
  execution_metrics_degradation_reason: metricsDegradation,
  next_action: nextAction
};
const stateDigest = `sha256:${shaCanonical(stateWithoutDigest)}`;

if (process.argv.includes("--state-digest")) {
  console.log(stateDigest);
  process.exit(0);
}

const tasksBytes = fs.readFileSync(rel("planos/004-ambientacao-VN/tasks.md"));
if (!tasksBytes.toString("utf8").includes(`state_digest: ${stateDigest}`)) {
  throw new Error(`tasks.md não contém o state_digest esperado ${stateDigest}`);
}

const resultWithoutDigest = {
  schema_version: 3,
  run_id: runId,
  execution_id: executionId,
  status: "pending-human-validation",
  state_digest: stateDigest,
  audit_configuration: auditConfiguration,
  audit_checkpoint_refs: [checkpointRef],
  task_results: [{
    task_ref: "planos/004-ambientacao-VN/task-1.1.md",
    status: "passed",
    evidence_refs: [completionRef, validationRef, checkpointRef]
  }],
  final_validator_refs: [validationRef, auditorReportRef],
  terminal_evidence_refs: [terminalRef],
  execution_metrics_ref: metricsRef,
  execution_metrics_digest: metricsDigest,
  execution_metrics_status: "partial",
  execution_metrics_degradation_reason: metricsDegradation,
  next_action: nextAction
};
const result = { ...resultWithoutDigest, result_digest: `sha256:${shaCanonical(resultWithoutDigest)}` };
writeJson(resultRef, result);

const dashboard = `---
title: "Plano 004 — Resultado da implementação da VN do Map046"
type: loki-implementation-dashboard
status: pending-human-validation
last_updated: "2026-07-29"
---

# Plano 004 — Dashboard de implementação

## Resultado

- Status funcional: \`pending-human-validation\`
- Task \`task-1.1\`: \`passed\`
- Validação automática: 22/22 checks, sem erros
- Auditoria independente da fase: \`approved\`
- Map046 SHA-256: \`861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892\`

## Entrega

- Parallax \`VN046_NoiteHistoria_BG\`, sem loop/scroll.
- Onze falas aprovadas e os dois ramos preservados.
- \`Dulgarin\` definido apenas em Confirmar; Name Input preservado em Corrigir.
- Expressões de Rheed e da criança aplicadas pelos comandos do VN Picture Busts.
- Cut-In de Thorin em Picture 10 com reveal 28f, saída 20f e erase antes de B11.
- Guards, switches 43/44, caller chain e handoff \`FinishVisualNovel\` preservados.

## Evidência

- Primary validation: \`${validationRef}\`
- Auditoria: \`${checkpointRef}\`
- Evidência terminal: \`${terminalRef}\`
- Métricas: \`${metricsRef}\` (\`partial\` apenas por telemetria indisponível)

## Gate humano

RQ-P01–RQ-P09 continuam pendentes. O Playtest em 1280x720 deve cobrir ambos os ramos, Name Input, Cut-In, save/load, reentrada cold/warm, switches de foco e retorno ao Map022. Os passos completos estão em \`${terminalRef}\`.

## Próxima ação

${nextAction}
`;
fs.writeFileSync(rel(dashboardRef), dashboard, "utf8");

const validatorMap = {
  [validationRef]: fileDigest(validationRef),
  [auditorReportRef]: fileDigest(auditorReportRef)
};
const consistency = {
  schema_version: 2,
  run_id: runId,
  execution_id: executionId,
  status: "pending-human-validation",
  audit_configuration: auditConfiguration,
  state_digest: stateDigest,
  tasks_md_digest: `sha256:${shaBytes(tasksBytes)}`,
  result_ref: resultRef,
  result_digest: fileDigest(resultRef),
  dashboard_ref: dashboardRef,
  dashboard_digest: fileDigest(dashboardRef),
  metrics_ref: metricsRef,
  metrics_digest: fileDigest(metricsRef),
  audit_checkpoint_refs: [checkpointRef],
  audit_checkpoint_digests: [fileDigest(checkpointRef)],
  terminal_evidence_refs: [terminalRef],
  terminal_evidence_digests: [fileDigest(terminalRef)],
  validator_digest: `sha256:${shaCanonical(validatorMap)}`
};
writeJson(consistencyRef, consistency);

console.log(JSON.stringify({ status: result.status, state_digest: stateDigest, result_digest: result.result_digest, consistency_ref: consistencyRef }));
