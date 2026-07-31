---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "runtime-qa"
  agent_name_path: "runtime-qa"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 2
  publication_status: "preflight_refreshed"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
  demand_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
  analysis_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
  coverage:
    topics: ["deterministic-failure-evidence", "deterministic-failure-severity", "map045-static-validation"]
    surfaces: ["planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json", "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/severity-finding-v1.json"]
    domain_ids: ["task-1.1"]
  coverage_digest: "sha256:d52d9c21d2f7d31c769c24e7ae190f0ef7991cb56554fa8acb41f241a92461fc"
  sources:
    - locator: "planos/003-falas-casa-forjaprata/task-1.1.md"
      source_type: "task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:f411c06e03f9574239e2ae0f866af0e6e1276d30aa1213664b264bde4448ff02"
      freshness_condition: "task contract remains unchanged during evidence correction"
      freshness_evidence: ["hash recomputed before dispatch"]
      coverage: ["acceptance-criteria", "validator-route"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json"
      source_type: "immutable-deterministic-failure-evidence"
      applicable_version: "schema-1"
      identity_digest: "sha256:9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195"
      freshness_condition: "filename, recorded historical digest and exact bytes agree"
      freshness_evidence: ["byte reconstruction matched the previously persisted digest exactly"]
      coverage: ["failure", "passed-checks", "failed-check"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/severity-finding-v1.json"
      source_type: "superseded-severity-finding"
      applicable_version: "schema-1"
      identity_digest: "sha256:07c93bd71b0821bbdde819833ca12dee46b4dec63a3c1b0e75956f7fca91d175"
      freshness_condition: "immutable v1 remains readable as predecessor"
      freshness_evidence: ["hash recomputed before dispatch"]
      coverage: ["classification", "attribution", "retry-accounting"]
  sanitized_summary: "Publish a corrected immutable severity finding whose failure evidence locator resolves to bytes matching the original recorded SHA-256; preserve classification and retry accounting without reclassifying runtime behavior."
  gaps: ["Runtime Playtest remains outside this static evidence correction."]
  conflicts: []
  created_at: "2026-07-31T04:26:35Z"
  record_digest: "sha256:6691ffa3be8f2e98daf024d33114df0ec00b7fef5d417b0da3fedf554a6f2369"
---

# Session preflight

Immutable refreshed preflight for correcting the addressability of the classified deterministic failure evidence. It grants no production write.
