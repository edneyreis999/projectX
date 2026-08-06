---
session_preflight:
  schema_version: 1
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  agent_name: "map049-phase-auditor"
  agent_name_path: "map049-phase-auditor"
  run_path_id: "run-ced6dab3cfa7bd32c45fd584261bff3a"
  version: 1
  publication_status: "preflight_created"
  revision: "git:30b5590413e8d2b922a211f5f0b002c2a563288a; worktree dirty with authorized Map049 target and unrelated user changes"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  coverage:
    topics: ["audit-coverage-v1", "final-validator-review", "phase-boundary-fase1", "primary-validation-review", "writer-handoff-review"]
    surfaces: ["frontend/data/Map049.json", "planos/006-busts-position/task-1.1.md"]
    domain_ids: ["execution-audit", "rpg-maker-mz-runtime-qa"]
  coverage_digest: "sha256:eeae9b5f075286641c537dbeed8b449292f216488c5fb43af8dff99bf8ae8167"
  sources:
    - locator: "planos/006-busts-position/tasks.md"
      source_type: "loki-run-state-and-plan"
      applicable_version: "3"
      identity_digest: "sha256:bca43b7c4c7451dee5c8ff129fce5a20f9ba2272aaeec6e9977862bd23aca3de"
      freshness_condition: "Exact digest and state identity remain equal until audit dispatch."
      freshness_evidence: ["state_digest=sha256:47441d3e04dbc619f6d3e0929e03b1c1b84f1fff0c909b5f32d579e3c1bc8ac4", "audit policy digest=sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"]
      coverage: ["audit-coverage-v1", "phase-boundary-fase1"]
    - locator: "planos/006-busts-position/task-1.1.md"
      source_type: "loki-task-contract"
      applicable_version: "1.0.0"
      identity_digest: "sha256:eac91add24d806053b061b5a6321d1a1557639615c9f7342ecca570b19185cd3"
      freshness_condition: "Task remains passed with the same AC and primary route during this audit attempt."
      freshness_evidence: ["task_validation.status=passed"]
      coverage: ["phase-boundary-fase1", "primary-validation-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/completion-record.yaml"
      source_type: "writer-completion-record"
      applicable_version: "current-run"
      identity_digest: "sha256:c3ced95ecc759c6378e0b4bcd7c7b31ebdf200c0cd4712ddab97f8a0dd9160e7"
      freshness_condition: "Immutable handoff bytes remain equal."
      freshness_evidence: ["agent_run_id=agent-run-v1:060c4a9d8560638b38a93c3cd79eae47ce98796e4f59ad2fc2026d883c2f3fc7", "handoff_id=handoff-v1:838dee15b8feb087cab347e3febb6b1604beb1e243b749784f35792da20eea6d"]
      coverage: ["writer-handoff-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/evidence/evidence-manifest.xml"
      source_type: "sanitized-agent-evidence-manifest"
      applicable_version: "1"
      identity_digest: "sha256:fbfdacf2ae949cb5f6396a7094f76a3eaa41c76e1816dbbf24b6e789e51f861f"
      freshness_condition: "Manifest integrity validator continues to pass."
      freshness_evidence: ["validate-session-evidence.py exit=0"]
      coverage: ["writer-handoff-review"]
    - locator: "frontend/data/Map049.json"
      source_type: "audited-production-target"
      applicable_version: "current-run"
      identity_digest: "sha256:b238e0a86cf12926a265b82b234f47bd3fa41983a4c745c849690ec6bc0bcfc3"
      freshness_condition: "Exact target digest remains equal throughout audit."
      freshness_evidence: ["frontend/data/Map049.json=sha256:b238e0a86cf12926a265b82b234f47bd3fa41983a4c745c849690ec6bc0bcfc3"]
      coverage: ["audit-coverage-v1", "phase-boundary-fase1"]
    - locator: "planos/006-busts-position/builds/fase1/map049-structural-validation-primary.json"
      source_type: "primary-validator-evidence"
      applicable_version: "1"
      identity_digest: "sha256:8e46b58349864c8eb7ca70d6d5be40d04d37f0a4919eff27b19dd13152a1439c"
      freshness_condition: "Immutable evidence resolves and remains passed for the covered target digest."
      freshness_evidence: ["result=passed", "target_digest=sha256:b238e0a86cf12926a265b82b234f47bd3fa41983a4c745c849690ec6bc0bcfc3"]
      coverage: ["primary-validation-review"]
    - locator: "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-1-finding.yaml"
      source_type: "primary-validation-pass-record"
      applicable_version: "1"
      identity_digest: "sha256:499aa3bb0ac5ab6a1d7c52e7f6352d4c9a222cd573a9c35c707e379153f49d1b"
      freshness_condition: "Immutable cycle pass record remains equal."
      freshness_evidence: ["result=passed", "retry_consumed=false"]
      coverage: ["primary-validation-review"]
    - locator: "planos/006-busts-position/builds/fase1/map049-structural-validation-final.json"
      source_type: "final-validator-evidence"
      applicable_version: "1"
      identity_digest: "sha256:b34dadc186380dd7db9e7d2e4916975fb7568c2aeedb9e7600a85fde9786d355"
      freshness_condition: "Immutable final evidence resolves and remains passed for the covered target digest."
      freshness_evidence: ["result=passed", "target_digest=sha256:b238e0a86cf12926a265b82b234f47bd3fa41983a4c745c849690ec6bc0bcfc3"]
      coverage: ["final-validator-review"]
    - locator: "planos/006-busts-position/builds/fase1/validate-map049-busts.mjs"
      source_type: "deterministic-validator"
      applicable_version: "1.0.0"
      identity_digest: "sha256:5d3c5b666ddeee89e930534a56614549b48a927e5865facdd587095e3213d1f9"
      freshness_condition: "Validator bytes remain equal during audit."
      freshness_evidence: ["primary and final executions passed"]
      coverage: ["final-validator-review", "primary-validation-review"]
  sanitized_summary: "Independently audit the complete fase1 boundary. Membership is task-1.1; Writer identity/agent-run/handoff are map049-writer, agent-run-v1:060c4a..., handoff-v1:838dee.... Covered target is Map049 at b238e0a8. Review the complete handoff, sanitized evidence, primary pass, final pass, task AC and restricted diff. Do not claim runtime visuals; Playtest remains a separate human gate. Write only the authorized auditor report."
  gaps: ["Perceptible composition, mirroring, layering, timing and readability remain outside static audit and pending human Playtest."]
  conflicts: []
  created_at: "2026-08-04T23:58:05.6175392Z"
  record_digest: "sha256:9c31e8f43080ca5c9a89fbe13d07ce651f005055c2ee4a6e01e79960813095e3"
---

# Session preflight - map049 phase auditor

Preflight imutavel para a auditoria material de fase com cobertura completa.
