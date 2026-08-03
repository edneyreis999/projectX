---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
  execution_id: "loki-execution-v2:8080a0bab8fd06c0312af234f47e731f4c2fb9f613f6b539c9bed9337aaec433"
  agent_name: "/root/map_flow_writer"
  agent_name_path: "map-flow-writer"
  run_path_id: "run-33d92ef68ba6458d8df61b9745ba49dc"
  version: 1
  publication_status: "preflight_created"
  revision: "git:77ac89f8ce2e02d9593a15c3051e35f383457239"
  demand_digest: "sha256:b82df25dbbc5cc282fce1d20872c1768808659d63cd82535681fc3afc176c37e"
  analysis_digest: "sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"
  coverage:
    topics: ["chest-pages", "exit-gate", "quest-onboarding"]
    surfaces: ["frontend/data/Map045.json"]
    domain_ids: ["map045-e7", "map045-e11-page8", "map045-e20"]
  coverage_digest: "sha256:efa485e693ef271c0cd5cdc134de1a3333bc6b692ba70995fd04e2fcc301d291"
  sources:
    - locator: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"]
      coverage: ["approved-decisions", "restrictions"]
    - locator: "planos/005-casa-forjaprata-feedback-funda/tasks.md"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:7aea2f720dc81724faeb3918a3c464c90e2af0131d5bec8684b0896ce0c7c483"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:7aea2f720dc81724faeb3918a3c464c90e2af0131d5bec8684b0896ce0c7c483"]
      coverage: ["run-identity", "target-decisions"]
    - locator: "planos/005-casa-forjaprata-feedback-funda/task-1.2.md"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:cbd8342741c14352e343259208adb05a456721789bf26800708fb0bb04de9943"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:cbd8342741c14352e343259208adb05a456721789bf26800708fb0bb04de9943"]
      coverage: ["task-contract", "write-envelope"]
    - locator: "planos/005-casa-forjaprata-feedback-funda/builds/fase1/baseline-v1.json"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:49d051ac5201ff277ec0e2d30c2ae31395d68925995121bb2965dc42dc6a8ba0"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:49d051ac5201ff277ec0e2d30c2ae31395d68925995121bb2965dc42dc6a8ba0"]
      coverage: ["target-digests", "preservation-digests"]
  sanitized_summary: "Write only Map045 E7/P1, E11/P8 and E20: chest visible/inert at 0, pickup at 10, direct exit at 20, while preserving EX/VN and all other units."
  gaps: ["Runtime/editor behavior remains pending human validation."]
  conflicts: []
  created_at: "2026-08-03T18:15:43.912Z"
  record_digest: "sha256:4f5b5fef034fd8fe87165799f2fd834b3dc11a8a2a535d9a1aac16ea635b5d6b"
---

# Writer preflight

Validated for task-1.2 only. This record grants no authority beyond the target
ledger and task-scoped write envelope.
