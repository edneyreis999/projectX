---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:f6a1e9d4b17ffadb6071fe48fc24b077d7332ed5fb467972e4d9f8e65fe5c185"
  execution_id: "loki-execution-v2:0bb945b89c9af45d973b39b9d43cc7ca9d2963163039db6e0c635327dbd1cbde"
  agent_name: "gameplay-engineer"
  agent_name_path: "gameplay-engineer"
  run_path_id: "run-c6459d0336a3ac796d5cb84db98e7f0c"
  version: 1
  publication_status: "preflight_created"
  revision: "working-tree-dirty; target must be compared immediately before write"
  demand_digest: "sha256:399272b166c8d2d253d8ee95df8d287fe8e46227206aa5011ec3c9f8ad2b4143"
  analysis_digest: "sha256:5f45ab72652688bf069390d7fcebdb8c3cdd8290ee3fbd27b113e067c7cb6075"
  coverage:
    topics: ["Map022 child movement", "V106 progression", "Events & Movement Core persistence"]
    surfaces: ["frontend/data/Map022.json"]
    domain_ids: ["rpg-maker-mz-map-events"]
  coverage_digest: "sha256:338611332144863ac8f8c27b83ed53917d085e4008ae930bd0a0f175303cd8d8"
  sources: []
  sanitized_summary: "Map022 is the sole authorized production target. Editor is closed. Preserve the user dirty worktree and alter only the 17 child events plus events 20 and 21 required by task-1.1. Runtime proof remains pending human gates."
  gaps: ["No editor-open-save-reopen or Playtest evidence exists yet."]
  conflicts: []
  created_at: "2026-07-30T00:00:00Z"
  record_digest: "sha256:be52770154a4a8dd770797a183e75e13705a979e99b4b86a482829362a31d87d"
---

Session preflight prepared for the scoped production writer. It is not production-write authority; `tasks.md` target decision and `task-1.1.md` envelope are authoritative.
