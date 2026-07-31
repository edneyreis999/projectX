---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
  execution_id: "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83"
  agent_name: "technical-implementer"
  agent_name_path: "technical-implementer"
  run_path_id: "run-17d91eab7bf669664b09e697206afed0"
  version: 2
  publication_status: "preflight_refreshed"
  revision: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
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
      freshness_evidence: ["validated before correction dispatch"]
      coverage: ["scope", "target"]
    - locator: "planos/003-falas-casa-forjaprata/analise-tecnica.md"
      source_type: "validated-analysis"
      applicable_version: "1.0.0"
      identity_digest: "sha256:81d0f430d70bf4e77040d4f53a0dc9d3f398211caa5bff2115195c225ee678fc"
      freshness_condition: "exact bytes still match command identity"
      freshness_evidence: ["validated before correction dispatch"]
      coverage: ["allowlist", "constraints", "validators"]
    - locator: "frontend/data/Map045.json"
      source_type: "current-project-source"
      applicable_version: "git:39dfafab800f1fcd1a037fe45a02b4b9ffb22647+worktree"
      identity_digest: "sha256:68c77591e43a96f1d60630ac1c7250f45238bb43a24654f79997a75fcd1c16f3"
      freshness_condition: "hash and all 30 repaired leaves match before artifact reconciliation"
      freshness_evidence: ["orchestrator recomputed current hash, 20 events, 49 pages and 30 expected values"]
      coverage: ["runtime-target", "reconciled-baseline"]
    - locator: "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v1.json"
      source_type: "superseded-writer-handoff"
      applicable_version: "schema-1"
      identity_digest: "sha256:9c0ae085ac75003df105a5130bcd742f33a2d6895c22a934f28405fc05d1fb35"
      freshness_condition: "retained only as immutable evidence of post-handoff drift"
      freshness_evidence: ["Map045 digest no longer matches; five non-production target digests still match"]
      coverage: ["correction-provenance", "prior-handoff"]
  sanitized_summary: "Reconcile deterministic repair artifacts to the latest concurrent Map045 state without restoring removed user content; keep the 30 repaired values, refresh structural baselines, and rerun the complete validation route."
  gaps: ["Runtime presentation cannot be validated statically; final Playtest remains required."]
  conflicts: ["The Map045 target changed after writer handoff; the latest user state prevails and the superseded handoff cannot approve the boundary."]
  created_at: "2026-07-31T04:18:02Z"
  record_digest: "sha256:132901cee1bca478330d77adfcfbde1180426746535feabcca40dd9a81338f15"
---

# Session preflight

Immutable refreshed preflight for reconciliation after post-handoff concurrent drift. It grants no write outside the persisted task decision.
