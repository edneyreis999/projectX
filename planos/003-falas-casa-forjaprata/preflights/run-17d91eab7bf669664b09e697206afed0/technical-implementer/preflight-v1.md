---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "technical-implementer"
  agent_name_path: "technical-implementer"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 1
  publication_status: "preflight_created"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647"
  demand_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
  analysis_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
  coverage:
    topics: ["encoding-repair", "rpg-maker-mz-map-dialogue"]
    surfaces: ["frontend/data/Map045.json", "planos/003-falas-casa-forjaprata/builds/fase1"]
    domain_ids: ["map:45"]
  coverage_digest: "sha256:5c4d95c684ea648793c08b597d67376f67abee6355726d887601501d4208cc64"
  sources:
    - locator: "planos/003-falas-casa-forjaprata/demanda.md"
      source_type: "approved-demand"
      applicable_version: "not-versioned"
      identity_digest: "sha256:5e8e7342e57de75d4f8e9ea5d3ac30cea4c347dcb687eee07c206f20a76efcf5"
      freshness_condition: "exact bytes still match command identity"
      freshness_evidence: ["validated at cold start"]
      coverage: ["scope", "target"]
    - locator: "planos/003-falas-casa-forjaprata/analise-tecnica.md"
      source_type: "validated-analysis"
      applicable_version: "1.0.0"
      identity_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
      freshness_condition: "exact bytes still match command identity"
      freshness_evidence: ["validated at cold start"]
      coverage: ["allowlist", "constraints", "validators"]
    - locator: "frontend/data/Map045.json"
      source_type: "current-project-source"
      applicable_version: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
      identity_digest: "sha256:0ae8c11dafaaa2a23984c037cf62496aa94f875637857aebcf205892a9d85dcb"
      freshness_condition: "hash and all 30 source leaves match before save"
      freshness_evidence: ["clean target at cold start"]
      coverage: ["runtime-target", "baseline"]
  sanitized_summary: "Repair exactly 30 allowlisted mojibake string leaves in Map045 with structured parsing, fail-closed source checks, no narrative rewrite, no structural or plugin-payload change, and Playtest pending."
  gaps: ["Runtime presentation cannot be validated statically; final Playtest remains required."]
  conflicts: ["Map006 is structurally related but is outside this task write scope."]
  created_at: "2026-07-31T00:00:00Z"
  record_digest: "sha256:2556e187e7afbbc2707d076b7fbdb206f675555020339df2159dd9a1e83b3c41"
---

# Session preflight

Immutable preflight for the scoped Writer. It grants no write outside the persisted task decision.
