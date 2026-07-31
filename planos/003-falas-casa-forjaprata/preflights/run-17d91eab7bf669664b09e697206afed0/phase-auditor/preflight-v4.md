---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "phase-auditor"
  agent_name_path: "phase-auditor"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 4
  publication_status: "preflight_refreshed"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
  demand_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
  analysis_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
  coverage:
    topics: ["map045-encoding-repair", "phase-boundary-audit"]
    surfaces: ["frontend/data/Map045.json", "planos/003-falas-casa-forjaprata/builds/fase1"]
    domain_ids: ["phase:fase1"]
  coverage_digest: "sha256:2a58958eb5cb9cc5ce57e22dd48086e32b2860f0928a36d52451f14d253f7f72"
  sources:
    - locator: "planos/003-falas-casa-forjaprata/task-1.1.md"
      source_type: "terminal-task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:c3a9d7e462bd10d8f398336bcdc1dbde8d57bfa88a9defdd762bbc2e34456c5a"
      freshness_condition: "exact task bytes remain terminal during replay"
      freshness_evidence: ["status passed and v3 refs materialized before dispatch"]
      coverage: ["ACs", "target ownership", "validation route"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v3.json"
      source_type: "writer-handoff"
      applicable_version: "schema-1"
      identity_digest: "sha256:f72305ba1cef7a12c21a26c84ac46bc0303a0622c5d56cb2ac98682ba1b7ce9b"
      freshness_condition: "all six target digests still match disk"
      freshness_evidence: ["orchestrator recomputed all hashes after post-Playtest full retest"]
      coverage: ["targets", "writer evidence", "post-Playtest reconciliation"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v3.json"
      source_type: "primary-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:d5b3bd2294cb98cd990638c02ced9b6927cc2d30b52ddf461a5950af22fd8dd6"
      freshness_condition: "referenced 146-check evidence remains readable and hash-correlated"
      freshness_evidence: ["primary validator rerun on current Map045 bytes"]
      coverage: ["primary-validation", "all-ACs"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/final-validator-record-v3.json"
      source_type: "final-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:82f1199d31ecff6ddc633c36dc1ed660f2aeef90cf09fb2d147728801872b438"
      freshness_condition: "final checks remain reproducible on current Map045 bytes"
      freshness_evidence: ["full 146-check final replay passed"]
      coverage: ["final-validation", "all-ACs"]
    - locator: "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-1.json"
      source_type: "predecessor-audit-checkpoint"
      applicable_version: "schema-1"
      identity_digest: "sha256:c6885a35877779ff4860ceffaff4168619da6c6ab84056b0c63bfe0287e91386"
      freshness_condition: "immutable predecessor remains readable and is treated as invalidated by target drift"
      freshness_evidence: ["Map045 current digest differs from predecessor coverage"]
      coverage: ["predecessor", "replay-cause", "prior-coverage"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json"
      source_type: "deterministic-validation-report"
      applicable_version: "schema-1"
      identity_digest: "sha256:d39a35cbf489d8cd9356c74205b96df9756f26730e0913709422c3b7d4d08858"
      freshness_condition: "current report digest and all 146 checks remain stable"
      freshness_evidence: ["post-Playtest primary and final executions passed"]
      coverage: ["current-target", "baseline-reconstruction", "structure-guards"]
  sanitized_summary: "Replay the complete phase:fase1 boundary after preserving the latest post-Playtest Map045 editor state, reconciling all six target digests, and rerunning 146 deterministic checks. The prior checkpoint is invalidated by target drift."
  gaps: ["Human Playtest is confirmed in the Writer handoff, but final interaction/gate persistence remains orchestrator-owned after this static audit replay."]
  conflicts: []
  created_at: "2026-07-31T05:21:24Z"
  record_digest: "sha256:0d540f58ae1e8f5a7e187bab3708d722453ca930c7a1e06476bec816d1d5de6c"
---

# Session preflight

Immutable refreshed preflight for the second complete replay of the material phase boundary. This version covers the post-Playtest editor state and grants no production write.
