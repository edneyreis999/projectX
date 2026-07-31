---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "phase-auditor"
  agent_name_path: "phase-auditor"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 3
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
      identity_digest: "sha256:d20c12d9c24ac37b0489c14c53b659042d90254dca185c3782529db6b7cc56c5"
      freshness_condition: "exact task bytes remain terminal during replay"
      freshness_evidence: ["status passed and v2 refs materialized before dispatch"]
      coverage: ["ACs", "target ownership", "validation route"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v2.json"
      source_type: "writer-handoff"
      applicable_version: "schema-1"
      identity_digest: "sha256:4488987c385a2018e2aee387ffcb4fe48e5b91233d7bbbfedfcbf764a44c1e2f"
      freshness_condition: "all six target digests still match disk"
      freshness_evidence: ["orchestrator recomputed all hashes after full retest"]
      coverage: ["targets", "writer evidence", "correction"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v2.json"
      source_type: "primary-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:983a571421d7b0a8dd46b807f7a5c23d00468c11bad9a0bd193566d9df4acb71"
      freshness_condition: "referenced 146-check evidence remains readable and hash-correlated"
      freshness_evidence: ["primary validator rerun by Writer and orchestrator"]
      coverage: ["primary-validation", "all-ACs"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/final-validator-record-v2.json"
      source_type: "final-validation-record"
      applicable_version: "schema-1"
      identity_digest: "sha256:9bc191c34070522acb3d233aa71a4dd1632321230f247ba941ca54edb09ea4e6"
      freshness_condition: "final checks remain reproducible"
      freshness_evidence: ["node checks, full report equality and git diff check passed"]
      coverage: ["final-validation", "all-ACs"]
    - locator: "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v1.json"
      source_type: "predecessor-audit-finding"
      applicable_version: "schema-1"
      identity_digest: "sha256:9328a4f546e385be43626478e0b9255c7fe1862620d567c67a4dc5a62b7e8b65"
      freshness_condition: "immutable predecessor remains readable"
      freshness_evidence: ["finding retained for complete replay lineage"]
      coverage: ["findings", "corrections-required", "replay-cause"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/severity-finding-v2.json"
      source_type: "corrected-severity-finding"
      applicable_version: "schema-1"
      identity_digest: "sha256:86c1e7214e5c10c54782011f2112310afc4f1ce87eec86b8a915a3700e94a727"
      freshness_condition: "immutable failure locator resolves and digest matches"
      freshness_evidence: ["runtime-qa independently validated JSON and SHA-256"]
      coverage: ["failure-addressability", "retry-accounting"]
  sanitized_summary: "Replay the complete phase:fase1 boundary after preserving the latest user Map045 state, reconciling all six target digests, rerunning 146 deterministic checks, and restoring immutable addressability for the classified validator failure."
  gaps: ["Runtime presentation remains pending human Playtest and is not auditable statically."]
  conflicts: []
  created_at: "2026-07-31T04:36:59Z"
  record_digest: "sha256:f83489f1bee1c7474c8cdbfa10019b16ec5b7ec906638f313e0726fe6c430f1b"
---

# Session preflight

Immutable refreshed preflight for the complete replay of the material phase boundary. This version corrects the mechanically invalid coverage digest in v2 and grants no production write.
