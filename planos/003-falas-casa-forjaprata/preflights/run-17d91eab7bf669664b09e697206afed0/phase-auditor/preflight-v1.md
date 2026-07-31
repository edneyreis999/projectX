---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "phase-auditor"
  agent_name_path: "phase-auditor"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 1
  publication_status: "preflight_created"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
  demand_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
  analysis_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
  coverage:
    topics: ["map045-encoding-repair", "phase-boundary-audit"]
    surfaces: ["frontend/data/Map045.json", "planos/003-falas-casa-forjaprata/builds/fase1"]
    domain_ids: ["phase:fase1"]
  coverage_digest: "sha256:0503f43b92642bb3cc0ba3dbab73d420bf275bdb2066b0ed05744ccba552d871"
  sources:
    - locator: "planos/003-falas-casa-forjaprata/task-1.1.md"
      source_type: "terminal-task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:f411c06e03f9574239e2ae0f866af0e6e1276d30aa1213664b264bde4448ff02"
      freshness_condition: "exact task bytes remain terminal during audit"
      freshness_evidence: ["status passed before boundary dispatch"]
      coverage: ["ACs", "target ownership", "validation route"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v1.json"
      source_type: "writer-handoff"
      applicable_version: "schema-1"
      identity_digest: "sha256:9c0ae085ac75003df105a5130bcd742f33a2d6895c22a934f28405fc05d1fb35"
      freshness_condition: "target digests still match disk"
      freshness_evidence: ["orchestrator recomputed all hashes"]
      coverage: ["targets", "writer evidence"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v1.json"
      source_type: "primary-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:5cd596255ba6a0f14b0d16c6c654cf0e69405d14bee5932ca89172d5203fb480"
      freshness_condition: "referenced evidence remains readable and hash-correlated"
      freshness_evidence: ["primary validator rerun by orchestrator"]
      coverage: ["primary-validation"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/final-validator-record-v1.json"
      source_type: "final-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:e2392daadf07dc07c448c22ffa54dac24fa0372060ba6e363c80096538aad7d5"
      freshness_condition: "final checks remain reproducible"
      freshness_evidence: ["node checks and git diff check passed"]
      coverage: ["final-validation"]
  sanitized_summary: "Audit the complete material phase boundary independently from Writer and primary/final validators. Cover all six target digests, four ACs, the validation-defect cycle, concurrent user additions, out-of-scope preservation, and the remaining Playtest gate."
  gaps: ["Runtime presentation remains pending human Playtest and is not auditable statically."]
  conflicts: []
  created_at: "2026-07-31T00:00:00Z"
  record_digest: "sha256:21066f7e7d69b5d1d959f452e264fcb59b44d1878b99c750ce5483c4bb4d3b06"
---

# Session preflight

Immutable preflight for the complete material phase-boundary audit. It grants no production write.
