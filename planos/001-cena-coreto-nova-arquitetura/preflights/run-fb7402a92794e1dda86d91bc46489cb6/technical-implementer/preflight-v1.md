---
session_preflight:
  schema_version: 1
  run_id: loki-run-v2:86550d0a2c2b24415570cf9599eeed021f6cd88b7a3fd0e51a014839fb5274f1
  execution_id: loki-execution-v2:d00981de73a3d0fbd4fa7be081b5e8ae6e7292ef6de06afe9214b7f39bbdbe2c
  agent_name: technical-implementer
  agent_name_path: technical-implementer
  run_path_id: run-fb7402a92794e1dda86d91bc46489cb6
  version: 1
  publication_status: preflight_created
  revision: "current workspace inspected 2026-07-28"
  demand_digest: sha256:4021aead0f44973dcc2e04c34e7f90948d3aaed5c1212af29925a2ca20ff1f7c
  analysis_digest: sha256:16eb10a1a3215352c848e1f0c8a113bfafeb3cb24f342d892c58c78d8efcfe5c
  coverage:
    topics: [Coreto QuestCore, EX/VN scene, PKD_SimpleQuestSystem, RPG Maker MZ data JSON]
    surfaces: [frontend/data, frontend/js/plugins, frontend/js/plugins.js]
    domain_ids: [technical-implementer]
  coverage_digest: sha256:unavailable-pending-mechanical-reconciliation
  sources:
    - locator: docs/domains/technical-implementer/README.md
      source_type: durable-domain-doc
      applicable_version: not-versioned
      identity_digest: sha256:unavailable-pending-mechanical-reconciliation
      freshness_condition: "Current workspace sources are rechecked before each scoped write."
      freshness_evidence: [frontend/js/plugins.js, frontend/data/System.json]
      coverage: [plugin activation, RPG Maker MZ runtime gate]
  sanitized_summary: "Static project evidence confirms RPG Maker MZ plugin/data surfaces, duplicated PKD entries, no prior runtime validation, and mandatory editor/New Game gates. Current source inspection selects V106 because it has no event callers."
  gaps: ["Runtime, Plugin Manager and New Game behavior are not proven by static evidence."]
  conflicts: []
  created_at: "2026-07-28T00:00:00-03:00"
  record_digest: sha256:unavailable-pending-mechanical-reconciliation
---

# Scoped writer preflight

The writer may modify only the targets in `task-1.1.md` and `task-2.1.md`, in
that order, and must preserve concurrent user changes. Static validators are
required before handoff; Plugin Manager and New Game checks remain human gates.
