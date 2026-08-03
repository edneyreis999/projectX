---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
  execution_id: "loki-execution-v2:8080a0bab8fd06c0312af234f47e731f4c2fb9f613f6b539c9bed9337aaec433"
  agent_name: "/root/quest_config_writer"
  agent_name_path: "quest-config-writer"
  run_path_id: "run-33d92ef68ba6458d8df61b9745ba49dc"
  version: 1
  publication_status: "preflight_created"
  revision: "git:77ac89f8ce2e02d9593a15c3051e35f383457239"
  demand_digest: "sha256:b82df25dbbc5cc282fce1d20872c1768808659d63cd82535681fc3afc176c37e"
  analysis_digest: "sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"
  coverage:
    topics: ["aSemifinal-index-remap", "pkd-config", "quest-registry"]
    surfaces: ["frontend/data/CommonEvents.json", "frontend/data/CoretoQuests.json", "frontend/data/Map006.json", "frontend/data/Map007.json", "frontend/data/Map010.json", "frontend/data/Map014.json", "frontend/data/Map044.json", "frontend/js/plugins.js"]
    domain_ids: ["pkd-aSemifinal", "v111-onboarding"]
  coverage_digest: "sha256:2110eebee7b9b90ab516e49491dde5a159e1ef282d641e4089c4f132f16447ca"
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
    - locator: "planos/005-casa-forjaprata-feedback-funda/task-1.1.md"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:5536fee548e2d106e3f681e4cd86a8661c701c2612f279a246e2afd328406575"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:5536fee548e2d106e3f681e4cd86a8661c701c2612f279a246e2afd328406575"]
      coverage: ["task-contract", "write-envelope"]
    - locator: "planos/005-casa-forjaprata-feedback-funda/builds/fase1/baseline-v1.json"
      source_type: "local-current-evidence"
      applicable_version: "not-versioned"
      identity_digest: "sha256:49d051ac5201ff277ec0e2d30c2ae31395d68925995121bb2965dc42dc6a8ba0"
      freshness_condition: "Exact SHA-256 remains equal immediately before dispatch."
      freshness_evidence: ["sha256:49d051ac5201ff277ec0e2d30c2ae31395d68925995121bb2965dc42dc6a8ba0"]
      coverage: ["target-digests", "preservation-digests"]
  sanitized_summary: "Write only task-1.1 targets: remove the visible tutorial quest, insert aSemifinal task 1, remap pointers and callers, and preserve every non-target unit."
  gaps: ["Runtime/editor behavior remains pending human validation."]
  conflicts: []
  created_at: "2026-08-03T18:15:43.912Z"
  record_digest: "sha256:c6a478f0d8b95c2aa48a17f1f781eef2766a6936223daea7bebbbb55adecdef0"
---

# Writer preflight

Validated for task-1.1 only. This record grants no authority beyond the target
ledger and task-scoped write envelope.

