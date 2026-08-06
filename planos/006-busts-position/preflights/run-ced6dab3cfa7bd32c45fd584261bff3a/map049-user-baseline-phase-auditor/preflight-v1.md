---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  agent_name: "map049-user-baseline-phase-auditor"
  agent_name_path: "map049-user-baseline-phase-auditor"
  run_path_id: "run-ced6dab3cfa7bd32c45fd584261bff3a"
  version: 1
  publication_status: "preflight_created"
  revision: "git:30b5590413e8d2b922a211f5f0b002c2a563288a; dirty worktree with preserved user-owned Map049 improvements and managed run artifacts"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  coverage:
    topics: ["audit-coverage-v1", "audit-replay", "concurrent-user-changes", "final-validator-review", "human-validation", "phase-boundary-fase1", "primary-validation-review", "writer-handoff-review"]
    surfaces: ["frontend/data/Map049.json", "planos/006-busts-position/task-1.1.md"]
    domain_ids: ["execution-audit", "rpg-maker-mz-runtime-qa"]
  coverage_digest: "sha256:7e92b1088ad6fc851243d71f2b19de63a76f276e9c0c3890505b4fdace9040b3"
  sources:
    - {locator: "planos/006-busts-position/tasks.md", source_type: "loki-run-state-and-plan", applicable_version: "3", identity_digest: "sha256:5573227d68c8bd0b8df105fafbafc964298489586cd64935cc3132cea90311ed", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["audit-coverage-v1", "phase-boundary-fase1"]}
    - {locator: "planos/006-busts-position/task-1.1.md", source_type: "loki-task-contract", applicable_version: "1.0.0", identity_digest: "sha256:5ba593805f5f8854f36f9e861a6608c46d0d04ed0582a4addc0c2455b1ec3d39", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["phase-boundary-fase1", "primary-validation-review"]}
    - {locator: "planos/006-busts-position/interaction/fase1/task-1.1/evidence/evidence-manifest.xml", source_type: "original-writer-evidence", applicable_version: "1", identity_digest: "sha256:fbfdacf2ae949cb5f6396a7094f76a3eaa41c76e1816dbbf24b6e789e51f861f", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["writer-handoff-review"]}
    - {locator: "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-evidence/evidence-manifest.xml", source_type: "correction-writer-evidence", applicable_version: "1", identity_digest: "sha256:f8deb127e6cbecf22cf47db3b1355ac2afc03d64f379f94923ca8f1009a446f8", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["writer-handoff-review"]}
    - {locator: "frontend/data/Map049.json", source_type: "audited-production-target", applicable_version: "current-run", identity_digest: "sha256:252965e40909d8c61adbecacee62264a92e3049e9347c07934c7be02f2754ffa", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["audit-coverage-v1", "concurrent-user-changes", "phase-boundary-fase1"]}
    - {locator: "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json", source_type: "primary-validator-evidence", applicable_version: "1", identity_digest: "sha256:72fccc58edbbb0fe468994af18d00cf95fc68cfbbd7d0b14fee78cf8476f0d9a", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["primary-validation-review"]}
    - {locator: "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-3-finding.yaml", source_type: "primary-validation-pass-record", applicable_version: "1", identity_digest: "sha256:28bc5b084f3b79388ff6d85a09662e3774859db43b4aae4985f7ed2537f99c36", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["primary-validation-review"]}
    - {locator: "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-final.json", source_type: "final-validator-evidence", applicable_version: "1", identity_digest: "sha256:1430c0a77fe74dafaf583bde69af35a630fab95ffadefaab6467ecbd1d97ceb5", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["final-validator-review"]}
    - {locator: "planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml", source_type: "human-validation-pass", applicable_version: "1", identity_digest: "sha256:d8ab1e682cacb74ba1c14926b08a8c8d2a9aec50e7af4fed5d73277ff7725423", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["human-validation"]}
    - {locator: "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml", source_type: "user-change-provenance", applicable_version: "1", identity_digest: "sha256:b2573814955e279b547fed93caede4a66126ceae66b4061a740ee702ebb9ecf5", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["concurrent-user-changes"]}
    - {locator: "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/checkpoint-v1-1.yaml", source_type: "predecessor-audit-checkpoint", applicable_version: "1", identity_digest: "sha256:2afb68020ba49a54b32977329b79c1f082d94dc635b19dd11c4ec7989d0e88f3", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["audit-replay"]}
    - {locator: "planos/006-busts-position/builds/fase1/validate-map049-busts.mjs", source_type: "deterministic-validator", applicable_version: "1.2.0", identity_digest: "sha256:c30e4b9973f4d79766501e91a9753364deab9a25a7de69f314275e16e3a0215b", freshness_condition: "Exact source digest remains equal until audit report publication.", freshness_evidence: ["SHA-256 verified before dispatch"], coverage: ["final-validator-review", "primary-validation-review"]}
  sanitized_summary: "Independently replay the complete fase1 boundary on current Map049 hash 252965e4. Verify all six bust ACs, both Writer lineages, current primary/final validator evidence, passed human facing gate, and preservation/non-attribution of user-owned monster, Fadeout Screen, parallax and serialization improvements. Write only the authorized audit report."
  gaps: ["No exact token counters or complete session transcripts; static audit does not re-perform the already recorded Playtest."]
  conflicts: []
  created_at: "2026-08-05T18:09:22.0355346Z"
  record_digest: "sha256:eb6bfbb1c20530cc1c687d8edcca88b3d3210977d8b209615c255c7db24f2a99"
---

# Session preflight - Map049 user baseline phase auditor

Preflight imutavel para o replay integral da fase no target atual preservado.
