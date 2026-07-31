---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "runtime-qa"
  agent_name_path: "runtime-qa"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 1
  publication_status: "preflight_created"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
  demand_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
  analysis_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
  coverage:
    topics: ["deterministic-failure-severity", "map045-static-validation"]
    surfaces: ["frontend/data/Map045.json", "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json"]
    domain_ids: ["task-1.1"]
  coverage_digest: "sha256:ca1ed6a3a44cd91c1ba6fadac1d32ec72c569bcbb28256cc2185d5cc844585f4"
  sources:
    - locator: "planos/003-falas-casa-forjaprata/task-1.1.md"
      source_type: "task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:27f707678529a6ef721dbd6da8fea364d76dfee0a8563fc3d5c52c807c223618"
      freshness_condition: "task contract remains unchanged during classification"
      freshness_evidence: ["read before dispatch"]
      coverage: ["acceptance-criteria", "validator-route"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json"
      source_type: "deterministic-failure-evidence"
      applicable_version: "schema-1"
      identity_digest: "sha256:9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195"
      freshness_condition: "exact immutable failure report bytes"
      freshness_evidence: ["post-save failure captured before retest"]
      coverage: ["failure", "passed-checks"]
    - locator: "frontend/data/Map045.json"
      source_type: "current-project-source"
      applicable_version: "worktree-post-save"
      identity_digest: "sha256:5030496827aafc9e79fdbf99b21bea933fdbf2d2ee38863051f60f98bd2382f6"
      freshness_condition: "hash remains planned post-save value"
      freshness_evidence: ["writer paused before retest"]
      coverage: ["candidate-output"]
  sanitized_summary: "Independently classify the deterministic post-save failure severity and attribution. The failure report shows all content and structural checks passing except one comparison that included the four authorized variable operands."
  gaps: ["Runtime Playtest remains outside this static severity classification."]
  conflicts: []
  created_at: "2026-07-31T00:00:00Z"
  record_digest: "sha256:8d1beb31de7c24f501c4651645ddefa8da2680e192d8840e6410129c31b79770"
---

# Session preflight

Immutable preflight for independent deterministic-failure severity classification. It grants no production write.
