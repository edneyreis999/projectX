# Domain context preflight — runtime-qa — fase2

- Agent: `/root/qa_proposal`
- Active mode: `task_scoped_writer`
- Scope: independent `phase:fase2` boundary audit for `task-2.1`
- Status: `ready-with-gaps`
- Write allowlist:
  - this preflight
  - `planos/004-casa-forjaprata arquitetura/builds/fase2/phase-audit-v1.json`

## Smallest sufficient context selected

- `planos/004-casa-forjaprata arquitetura/tasks.md`
- `planos/004-casa-forjaprata arquitetura/task-2.1.md`
- approved `builds/fase1/phase-audit-v1.json`
- `gameplay_writer/preflight-v1.md`
- `builds/fase2/e11-migration-manifest-v1.json`
- `builds/fase2/validate-feature.cjs`
- `builds/fase2/feature-validation-v1.json`
- `builds/fase2/task-2.1-completion-v1.json`
- current `frontend/data/Map022.json`, `Map045.json`, `Map046.json`, `Map049.json`
- current fase1 foundation configuration and relevant RPG Maker MZ engine source

## Context decision

The declared durable root `docs/loki-init/runtime-qa/` is absent. This is a narrow, non-material gap: the approved task contract, prior phase checkpoint, frozen migration manifest, writer evidence, current production bytes and local engine implementation provide sufficient current evidence for an independent static boundary audit. Current local sources prevail over any absent snapshot.

The audit may write only the two managed checkpoint files listed above. It may not modify production JSON, plugins, saves, writer evidence, task state or consumer documentation.

## Validation boundary

Deterministic parsing, replay, hash, semantic-diff, route/order and preservation checks are authorized. RPG Maker MZ editor round-trip and New Game Playtest are perceptible human gates and must remain `pending-human-validation`; this auditor cannot claim them as executed.

## Gap handoff

No blocking documentation handoff is required for this phase. The absent durable runtime-QA context remains an informational gap for the orchestrator/documentation owner; it was not auto-edited.
