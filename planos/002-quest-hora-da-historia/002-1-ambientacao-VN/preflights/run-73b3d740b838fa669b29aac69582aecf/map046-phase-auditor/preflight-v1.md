---
session_preflight:
  schema_version: 1
  run_id: loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
  execution_id: loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a
  agent_name: map046-phase-auditor
  agent_name_path: map046-phase-auditor
  run_path_id: run-73b3d740b838fa669b29aac69582aecf
  version: 1
  publication_status: preflight_created
  revision: da45527de18017ae1b91c22baf1e41e21b9e663e
  demand_digest: sha256:7c3dd11403111b6fde2b079e9ba8e2ea41a38c3e5004a2ba2dce7bfa4c3f284a
  analysis_digest: sha256:106b65946e91f58886e6163e6757c6000035b5798660b601c911d1a4b95152f0
  coverage:
    topics: [event-command-audit, phase-audit, restricted-diff, static-validation]
    surfaces: [frontend/data/Map046.json, planos/004-ambientacao-VN/builds/fase1]
    domain_ids: [fase1, map-046, task-1.1]
  coverage_digest: sha256:fde16cd1391fc4d4e877045543547c14eb1f1ccc5d332f08aff559b8526cbace
  sources:
    - locator: frontend/data/Map046.json
      source_type: covered-production-target
      applicable_version: RPG Maker MZ local
      identity_digest: sha256:861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892
      freshness_condition: "Digest deve permanecer igual durante a auditoria."
      freshness_evidence: [planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json]
      coverage: [event-command-audit, restricted-diff]
    - locator: planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json
      source_type: writer-handoff
      applicable_version: schema-1
      identity_digest: sha256:e86b80bf0c368a6ecfd24125908717ee9fc57c5679f0b5af6ccab260dc160cde
      freshness_condition: "Imutável para esta tentativa."
      freshness_evidence: [task-1.1]
      coverage: [phase-audit]
    - locator: planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
      source_type: primary-validator-record
      applicable_version: schema-1
      identity_digest: sha256:3316c9138205c0494d9076b0116569cc7cb9addcfe63088a6a7f9b3aaabf349e
      freshness_condition: "Reexecutar independentemente e comparar o resultado."
      freshness_evidence: [validate-map046.mjs]
      coverage: [static-validation]
    - locator: planos/004-ambientacao-VN/task-1.1.md
      source_type: task-contract
      applicable_version: "1.0.0"
      identity_digest: sha256:4598834249f4d8ebe6526c2bbbe48c9c2073ead0fee9dca9ddf6936e1e64b5db
      freshness_condition: "Task permanece ativa e target decision não mudou."
      freshness_evidence: [planos/004-ambientacao-VN/tasks.md]
      coverage: [phase-audit, event-command-audit]
  sanitized_summary: "Auditoria independente da fase1. Revisar task-1.1, target Map046, diff, writer/validator e reexecutar checks. Não alterar produção, scripts, plano ou evidência do writer. Escrever somente auditor-report-v1.json."
  gaps: ["Runtime/Playtest não faz parte desta auditoria estática."]
  conflicts: []
  created_at: "2026-07-29T04:15:00.000Z"
  record_digest: sha256:e349806ba2ca1ad041190f970ba15968f47a1de538c6d8811b650b6cc3837898
---

# Session preflight — map046 phase auditor

Resultado: `ready`. A cobertura material é a fase1 completa; o auditor deve ser independente do writer e do validator primário.
