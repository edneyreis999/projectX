---
status: pending
title: "Task 1: Materialize and validate the Map045 cutscene rework"
type: frontend
complexity: high
---

# Task 1: Materialize and validate the Map045 cutscene rework

## Overview

Deliver the approved five-second Rheed cutscene as one safe RPG Maker MZ data slice. The task owns the replayable transformation, production Map045 change, static validation, fixtures, and evidence while preserving all unrelated dirty-worktree content.

<critical>
- ALWAYS READ `_spec.md` and its catalogs (`_user_stories.md`, `_dx.md`, `_uiux.md` when present, `_tests.md`) before starting
- REFERENCE `_spec.md` Part II for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- R1. The implementation MUST modify only the authorized command surfaces of Map045 E36 and preserve every unrelated byte or semantic value.
- R2. Page A MUST use exactly one Animation 35 entry effect, one Rheed Gab with local timing overrides, waited E33/E26/Rheed routes, and a final `Wait For Gab Completion` barrier.
- R3. E33 MUST return to `(11,9)` before page B activates, and every introduced movement route MUST wait for completion.
- R4. Page B MUST remove the repeated Animation 35 and leading 60-frame wait while retaining the six-stage opacity fade and exact existing cleanup targets.
- R5. The writer MUST use structured parsing, semantic anchors, fail-closed preconditions, idempotency, and restricted-diff enforcement.
- R6. The implementation MUST NOT modify VisuStella plugin source, global Gab parameters, Map049, Animations, other events, assets, switches, variables, or database IDs.
- R7. Static evidence MUST report `runtime=pending_playtest` and MUST NOT claim perceptual or editor validation.
</requirements>

## Subtasks

- [ ] 1.1 Read the spec corpus, ADR, approved design, project instructions, and relevant RPG Maker/VisuStella references.
- [ ] 1.2 Capture semantic and byte-level fingerprints for E36 anchors, cleanup, protected events, and concurrent Map045 changes.
- [ ] 1.3 Create a fail-closed, replayable writer with the exact `_dx.md` check/apply surface.
- [ ] 1.4 Materialize the page-A reveal, Gab, child microactions, waited Rheed route, recomposition, and final Gab barrier.
- [ ] 1.5 Materialize the page-B quiet fade while preserving cleanup exactly.
- [ ] 1.6 Create the dedicated validator, fixtures, and structured evidence output.
- [ ] 1.7 Implement every assigned unit, integration, and end-to-end static test.
- [ ] 1.8 Apply once to production Map045 and run JSON parse, plugin syntax, restricted-diff, idempotency, and validator gates.

## Implementation Details

Follow `_spec.md` Part II. Use the `rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json`, `rpg-maker-mz-visustella-events-presentation`, and `rpg-maker-mz-visustella-plugin-commands` workflows before writing production data. Locate commands by event ID plus semantic content, never by stale list index. Stop before mutation on any mismatch.

### Relevant Files

- `planos/009-rework-cutscene-rheed/rework-cutscene-rheed.md` — approved design and timing contract.
- `frontend/data/Map045.json` — only production mutation target.
- `frontend/data/Animations.json` — read-only Animation 35 contract.
- `frontend/js/plugins/VisuMZ_4_GabWindow.js` — read-only Gab command semantics.
- `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js` — read-only movement-command semantics.
- `AGENTS.md` — project-wide data-edit rules.

### Dependent Files

- `frontend/data/Map049.json` — read-only upstream activation flow that must remain unchanged.
- `planos/009-rework-cutscene-rheed/builds/apply-rework-cutscene-rheed.mjs` — replayable writer to create.
- `planos/009-rework-cutscene-rheed/builds/validate-rework-cutscene-rheed.mjs` — validator to create.
- `planos/009-rework-cutscene-rheed/builds/fixtures/` — positive and negative fixtures to create.
- `planos/009-rework-cutscene-rheed/builds/evidence/rework-cutscene-rheed.json` — final static evidence to create.

### Related ADRs

- [ADR-001: Use body-led wonder during Rheed's Gab](adrs/adr-001-body-led-wonder.md) — governs the single-Fog, single-Gab, body-led implementation.

## Deliverables

- Updated Map045 E36 pages implementing the approved cutscene.
- Replayable fail-closed writer and dedicated validator.
- Positive and negative fixtures proving idempotency and anchor safety.
- Structured static evidence with Playtest explicitly pending.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests.

- [ ] UT-001, UT-002, UT-003, UT-004 — planned command model, page-B boundary, cleanup preservation, and fail-closed anchors.
- [ ] IT-001, IT-002, IT-003 — writer/validator success, idempotency, and negative fixture preservation.
- [ ] E2E-001 — production check/apply/validate journey and restricted diff.

## Success Criteria

- Every assigned test case implemented and passing.
- Map045 parses and only approved E36 command surfaces change.
- Writer dry-check, apply, idempotent replay, and validator commands match `_dx.md` exactly.
- Animation 35 occurs once in the E36 lifecycle and cleanup fingerprints remain unchanged.
- All introduced routes complete before page B and the final Gab barrier precedes fade.
- Evidence reports Playtest as pending.

