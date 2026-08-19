---
status: pending
title: "Task 4: Reconcile regression evidence and prepare human Playtest"
type: qa-execution
complexity: high
---

# Task 4: Reconcile regression evidence and prepare human Playtest

## Overview

Consolidate the three implementation slices into one traceable regression and
human-validation handoff. This task owns no feature redesign: it replays final
validators, exercises the complete state matrix, validates the human-gate
contracts, records editor/runtime limitations honestly, and routes concrete
failures back to their owning slice.

<critical>
- ALWAYS READ `_spec.md` and its catalogs (`_user_stories.md`, `_dx.md`, `_uiux.md` when present, `_tests.md`) before starting
- REFERENCE `_spec.md` Part II for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- R1. The task MUST replay every Task 01-03 validator on final production hashes and reject stale or missing evidence.
- R2. The aggregate matrix MUST cover New Game, save/load, active/returning sessions, repetition, passability, Gab priority, current sling flow, audio restoration, and protected future content.
- R3. Automated checks MUST emit exact E2E IDs, target hashes, result, evidence class, and owning task for every finding.
- R4. RPG Maker editor round-trip and human Playtest MUST remain distinct gates; unavailable or unexecuted observations MUST remain `not_executed`, while the handoff-contract test passes only when that classification is truthful and complete.
- R5. Human scenarios MUST be neutral, versioned, bounded, and record observations before evaluative questions.
- R6. Discovery targets (five of six, 90 seconds, three minutes) MUST remain Playtest observations and MUST NOT create runtime timers or telemetry.
- R7. Any implementation defect found MUST be fixed only within the owning task's declared production scope, followed by replay of dependent validators; no opportunistic redesign is allowed.
- R8. Final evidence MUST state residual risks and the exact human decisions still pending.
</requirements>

## Subtasks

- [ ] 4.1 Survey the complete task/spec corpus and reconcile Task 01-03 status, changed files, validator commands, evidence JSON, and protected baselines.
- [ ] 4.2 Materialize `validate-ex-vn-regression.mjs` and an aggregate evidence schema that references, rather than duplicates, lower-level evidence.
- [ ] 4.3 Execute the automated New Game-equivalent state fixtures, save/load/session-phase fixtures, repeat/reentry fixtures, and protected-scope checks.
- [ ] 4.4 Prepare the exact RPG Maker editor round-trip checklist and neutral Coreto, Forjaprata, audio, and accessibility Playtest record.
- [ ] 4.5 If interactive editor/runtime access is available, execute and persist each human scenario; otherwise validate the complete handoff contract and mark the observation `not_executed` with the concrete environment limitation.
- [ ] 4.6 Route any deterministic defect to the smallest owning slice, apply only in-scope correction, and replay every affected validator.
- [ ] 4.7 Reconcile every UT/IT/E2E ID, final hash, finding, human verdict, and residual risk into the terminal evidence package.

## Implementation Details

Use a Game QA Engineer for the functional matrix and a Playtest Designer for
the neutral human scenarios. Apply `rpg-maker-mz-project-inventory` in focused
validation mode. Use `rpg-maker-mz-data-json` for any bounded corrective write;
this task does not receive a blanket production-write surface.

The aggregate validator must consume the final evidence JSON from Tasks 01-03,
verify their hashes against current targets, and run independent cross-slice
checks. It must not infer runtime approval from structural output. Human media
is optional, but the human verdict, version/hash, scenario, observations, and
limitations are required when a scenario is executed.

### Relevant Files

- `.compozy/tasks/ex-vn-coreto-forjaprata/_spec.md` — complete product/technical contract.
- `.compozy/tasks/ex-vn-coreto-forjaprata/_user_stories.md` — acceptance and edge-case catalog.
- `.compozy/tasks/ex-vn-coreto-forjaprata/_tests.md` — canonical test IDs and definitions.
- `.compozy/tasks/ex-vn-coreto-forjaprata/_tasks.md` — dependency graph and task ownership.
- `planos/008-compozy-init/builds/validate-flow-state.mjs` — Task 01 evidence producer.
- `planos/008-compozy-init/builds/validate-map022-experience.mjs` — Task 02 evidence producer.
- `planos/008-compozy-init/builds/validate-map045-experience.mjs` — Task 03 evidence producer.
- `frontend/data/Map022.json` — final Coreto target.
- `frontend/data/Map045.json` — final Forjaprata target.
- `frontend/data/Map046.json` — final Noite da Historia VN target.
- `frontend/data/Map049.json` — final Forjaprata VN target.
- `frontend/data/CoretoQuests.json` — final canonical quest registry.
- `frontend/data/MapInfos.json` — final map naming.

### Dependent Files

- `planos/008-compozy-init/builds/validate-ex-vn-regression.mjs` — aggregate validator to create.
- `planos/008-compozy-init/builds/evidence/ex-vn-regression.json` — aggregate automated evidence.
- `planos/008-compozy-init/builds/evidence/human-playtest-template.md` — exact human scenario record.
- `planos/008-compozy-init/builds/evidence/final-verification.md` — commands, hashes, findings, classifications, and residual risks.

### Related ADRs

- [ADR-001: Separate canonical quest progress from presentation staging](adrs/adr-001-state-boundary.md) — state invariant under regression.
- [ADR-002: Protect future quest content on shared maps](adrs/adr-002-shared-map-scope.md) — protected-scope regression gate.
- [ADR-003: Delegate concrete audio selection while preserving runtime ownership](adrs/adr-003-audio-ownership.md) — audio authority and human gate.

## Deliverables

- Aggregate regression validator and evidence JSON on final hashes.
- Complete traceability from every test ID to evidence and owning task.
- RPG Maker MZ editor round-trip checklist with executed or pending status.
- Neutral human Playtest record for Coreto, Forjaprata, audio, accessibility, and save/load.
- Bounded correction/replay records for any deterministic findings.
- Final verification report with residual risks and honest evidence classifications.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests.

- [ ] E2E-001, E2E-002, E2E-003 — complete New Game flow, save/load boundaries, and repeated entry/return.
- [ ] E2E-004, E2E-005 — validated human-gate contracts for the neutral Coreto and Forjaprata journeys, plus any supplied human results.
- [ ] E2E-006, E2E-007 — validated audio/accessibility and editor/final-hash gate contracts, plus any supplied human results.

## Success Criteria

- Every assigned test case implemented and passing
- Every Task 01-03 validator passes independently on current hashes before aggregate success.
- Every test ID in `_tests.md` appears in exactly one task and one final evidence mapping.
- Automated E2E fixtures and human-gate contract validation pass; observations carry real verdicts or explicit `not_executed`/`blocked` status, never fabricated approval.
- No unresolved critical functional finding remains hidden in a human-pending bucket.
- Final report names changed files, commands, evidence classes, editor/Playtest state, and residual risks.
