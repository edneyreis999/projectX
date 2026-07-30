---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:b22e885559c3a2cac210841aeb120fa8f2011f99b95c28a16b7a2fae47f15371"
  execution_id: "loki-execution-v2:adce3df1f5a6ffcf699eed227b25d78e132bff3bec93a53223810df25cdd336f"
  agent_name: "technical-implementer"
  agent_name_path: "technical-implementer"
  run_path_id: "run-b22e885559c3a2cac210841aeb120fa8"
  version: 1
  publication_status: "preflight_created"
  revision: "workspace-current"
  demand_digest: "sha256:a272fb9d4ad9645f641e3adfe838fac225458a1bfa1874366e88130bce7cdd75"
  analysis_digest: "sha256:45a757024e2e5532d1a06b14825bb29153275f546ffe3b5244840ff388b9d819"
  coverage:
    topics: ["Map022 Gab ambientacao", "cleanup S43"]
    surfaces: ["frontend/data/Map022.json"]
    domain_ids: ["rpg-maker-mz", "visustella-gabwindow"]
  coverage_digest: "unavailable: manual preflight without canonical digest helper"
  sources:
    - locator: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md"
      source_type: "demand"
      applicable_version: "current"
      identity_digest: "sha256:a272fb9d4ad9645f641e3adfe838fac225458a1bfa1874366e88130bce7cdd75"
      freshness_condition: "exact digest matches invocation"
      freshness_evidence: ["Get-FileHash 2026-07-29"]
      coverage: ["objective"]
  sanitized_summary: "Escrever somente Map022: evento 20 como produtor unico e insercao ClearGab/WaitForGab no evento 30. Preservar alteracoes locais preexistentes e nao alterar eventos das criancas, evento 21, plugins ou configuracao."
  gaps: ["Runtime behavior, editor acceptance and Playtest remain pending."]
  conflicts: []
  created_at: "2026-07-29"
  record_digest: "unavailable: manual preflight without canonical digest helper"
---

# Session preflight

Escopo exclusivo: `frontend/data/Map022.json`.
