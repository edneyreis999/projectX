---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  agent_name: "map049-facing-phase-auditor"
  agent_name_path: "map049-facing-phase-auditor"
  run_path_id: "run-ced6dab3cfa7bd32c45fd584261bff3a"
  version: 1
  publication_status: "preflight_created"
  revision: "git:30b5590413e8d2b922a211f5f0b002c2a563288a; worktree dirty with authorized Map049 correction and unrelated user changes"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  coverage:
    topics: ["audit-coverage-v1", "audit-replay", "facing-correction", "final-validator-review", "phase-boundary-fase1", "primary-validation-review", "writer-handoff-review"]
    surfaces: ["frontend/data/Map049.json", "planos/006-busts-position/task-1.1.md"]
    domain_ids: ["execution-audit", "rpg-maker-mz-runtime-qa"]
  coverage_digest: "sha256:68deedde27ce00f0ab8c0df9ea2e40bb3eb5d9fca5b5cc7bdd140bb15609eceb"
  sources:
    - locator: "planos/006-busts-position/tasks.md"
      source_type: "loki-run-state-and-plan"
      applicable_version: "3"
      identity_digest: "sha256:a08a5a625e7e080d31f58e97f34cf36ab271e46e8be4650809735cffc4f23bf6"
      freshness_condition: "Plan state and audit policy remain equal until dispatch."
      freshness_evidence: ["status=running", "phase replay due"]
      coverage: ["audit-coverage-v1", "phase-boundary-fase1"]
    - locator: "planos/006-busts-position/task-1.1.md"
      source_type: "loki-task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:08c88550d0ac96d4e24488c5f3f6a73e7503682f458ffad289a636afcb4c8b9b"
      freshness_condition: "Task remains passed with six ACs and one deterministic route."
      freshness_evidence: ["task_validation.status=passed"]
      coverage: ["phase-boundary-fase1", "primary-validation-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/completion-record.yaml"
      source_type: "original-writer-completion"
      applicable_version: "current-run"
      identity_digest: "sha256:c3ced95ecc759c6378e0b4bcd7c7b31ebdf200c0cd4712ddab97f8a0dd9160e7"
      freshness_condition: "Immutable original handoff remains equal."
      freshness_evidence: ["map049-writer lineage"]
      coverage: ["writer-handoff-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/evidence/evidence-manifest.xml"
      source_type: "original-writer-evidence"
      applicable_version: "1"
      identity_digest: "sha256:fbfdacf2ae949cb5f6396a7094f76a3eaa41c76e1816dbbf24b6e789e51f861f"
      freshness_condition: "Immutable original evidence remains equal."
      freshness_evidence: ["original writer evidence"]
      coverage: ["writer-handoff-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-completion-record.yaml"
      source_type: "correction-writer-completion"
      applicable_version: "current-run"
      identity_digest: "sha256:f37c5efa3440882bcff8c869e87b7691bc90003a1e7bb29f455a10b98babc9c4"
      freshness_condition: "Immutable correction handoff remains equal."
      freshness_evidence: ["map049-facing-writer lineage"]
      coverage: ["facing-correction", "writer-handoff-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-evidence/evidence-manifest.xml"
      source_type: "correction-writer-evidence"
      applicable_version: "1"
      identity_digest: "sha256:f8deb127e6cbecf22cf47db3b1355ac2afc03d64f379f94923ca8f1009a446f8"
      freshness_condition: "Immutable correction evidence remains equal."
      freshness_evidence: ["correction writer evidence"]
      coverage: ["facing-correction", "writer-handoff-review"]
    - locator: "frontend/data/Map049.json"
      source_type: "audited-production-target"
      applicable_version: "current-run"
      identity_digest: "sha256:563fb83fb89db5fe2939077f82f00f2e6115a02a449f84e317422f9e83212764"
      freshness_condition: "Exact target digest remains equal throughout audit."
      freshness_evidence: ["current corrected target"]
      coverage: ["audit-coverage-v1", "facing-correction", "phase-boundary-fase1"]
    - locator: "planos/006-busts-position/builds/fase1/map049-facing-correction-validation-primary.json"
      source_type: "primary-validator-evidence"
      applicable_version: "1"
      identity_digest: "sha256:7ae48f632ac4219670de4ed5c47dc0a6ff0a417e612ba54f4e4cab103d81d13d"
      freshness_condition: "Immutable evidence remains passed for current target."
      freshness_evidence: ["result=passed", "six ACs passed"]
      coverage: ["primary-validation-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-2-finding.yaml"
      source_type: "primary-validation-pass-record"
      applicable_version: "1"
      identity_digest: "sha256:e209a15cd09140b8259883c09d010f30048644314501e61ea752237c84f31a06"
      freshness_condition: "Immutable cycle pass remains equal."
      freshness_evidence: ["result=passed", "retry_consumed=false"]
      coverage: ["primary-validation-review"]
    - locator: "planos/006-busts-position/builds/fase1/map049-facing-correction-validation-final.json"
      source_type: "final-validator-evidence"
      applicable_version: "1"
      identity_digest: "sha256:4ac2bfe633ab01c83dccbca59523a28a0a5d0fe783b2d57481b580f0da74dce9"
      freshness_condition: "Immutable final evidence remains passed for current target."
      freshness_evidence: ["result=passed", "six ACs passed"]
      coverage: ["final-validator-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/human-validation-feedback-v1.yaml"
      source_type: "authorized-human-feedback"
      applicable_version: "1"
      identity_digest: "sha256:d27e3bffe129f08437459195ca136ec4c88160fddc5e7e06c93e32d8d92817cb"
      freshness_condition: "Immutable feedback and correction authorization remain equal."
      freshness_evidence: ["Melia must face Thorin on the left"]
      coverage: ["audit-replay", "facing-correction"]
    - locator: "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/checkpoint-v1-0.yaml"
      source_type: "predecessor-audit-checkpoint"
      applicable_version: "1"
      identity_digest: "sha256:d1ce25db612b41458be9570f11427f0b713aeb743165613ca58273fa293debb2"
      freshness_condition: "Immutable predecessor remains equal and is not reused as current approval."
      freshness_evidence: ["iteration=0", "target digest invalidated"]
      coverage: ["audit-replay"]
    - locator: "planos/006-busts-position/builds/fase1/validate-map049-busts.mjs"
      source_type: "deterministic-validator"
      applicable_version: "1.1.0"
      identity_digest: "sha256:a4efeb36291b898e5e80feaf88fb4e9378719bd2604646fd62140c5c4413368d"
      freshness_condition: "Validator bytes remain equal during audit."
      freshness_evidence: ["primary and final executions passed"]
      coverage: ["final-validator-review", "primary-validation-review"]
  sanitized_summary: "Independently replay the complete fase1 audit at iteration 1 after authorized Melia facing correction. Cover both Writer lineages, current target hash, six current ACs, primary and final validation, human feedback and invalidated predecessor. Runtime visuals remain a separate human gate. Write only the authorized replay auditor report."
  gaps: ["Perceptible composition, mirroring, layering, timing and readability remain outside static audit and pending human Playtest."]
  conflicts: []
  created_at: "2026-08-05T03:05:00.000Z"
  record_digest: "sha256:4514db26960b580e99e6459dfdcfd7611d64e7b4723b4b13ea03913b271d69ff"
---

# Session preflight - map049 facing phase auditor

Preflight imutavel para o replay integral da auditoria material de fase.
