---
status: completed
title: "Task 2: Build readable and traversable Coreto activities"
type: game-content
complexity: high
---

# Task 2: Build readable and traversable Coreto activities

## Overview

Deliver the full Map022 exploration slice after canonical state repair. The
children must read as tag, ring play, and seated conversation through spatial
composition and movement while the quest route, gathering, Gabs, and recovery
behavior remain functional.

<critical>
- ALWAYS READ `_spec.md` and its catalogs (`_user_stories.md`, `_dx.md`, `_uiux.md` when present, `_tests.md`) before starting
- REFERENCE `_spec.md` Part II for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- R1. The in-scope Map022 children MUST form exactly three player-readable activities: western-perimeter tag, south/central ring play, and edge-based seated conversation groups.
- R2. Changed movement routes MUST declare roles, destinations, waiting/skippable behavior, terminal facing, and recovery after displacement.
- R3. Darla, E18, E17, and the VN seat MUST remain reachable before, during, and after the gathering transition.
- R4. The gathering MUST preserve a visual and physical corridor to the VN seat and MUST NOT introduce blocking destination conflicts.
- R5. Environmental Gabs MUST match the visible activity, remain optional, use valid `357/657` pairs, and avoid automatic force, anti-repeat bypass, and `WaitForGab`.
- R6. A deliberate interaction MAY force and bypass anti-repeat only according to the existing interaction-priority contract.
- R7. The task MUST NOT modify Map045, Map049, future quests, vendor plugins, or canonical quest states fixed by Task 01.
- R8. Route readability, discovery time, pacing, and perception MUST remain `human_playtest_pending` after static validation.
</requirements>

## Subtasks

- [ ] 2.1 Re-read final Task 01 state/page topology and inventory the current Map022 child IDs, positions, graphics, routes, Gab anchors, and critical tiles.
- [ ] 2.2 Record a level-design assignment table for tag, ring play, seated conversation, gathering, and intentionally unchanged children.
- [ ] 2.3 Implement each activity's composition, movement roles, and recovery behavior without changing quest-critical event ownership.
- [ ] 2.4 Reconcile the gathering routes and terminal positions with the protected corridor and destination-conflict rules.
- [ ] 2.5 Spatialize and normalize only the in-scope environmental Gab payloads while preserving deliberate interaction priority.
- [ ] 2.6 Materialize a fail-closed Map022 writer and `validate-map022-experience.mjs` with route, bounds, passability, Gab, and negative fixtures.
- [ ] 2.7 Run structural validation on the final Map022 hash and prepare the neutral human Playtest scenarios for Task 04.

## Implementation Details

Use a Level Designer decision pass for the assignment table and route intent;
record uncertainty rather than treating a static layout as perceptually
approved. Apply `rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json`,
`rpg-maker-mz-visustella-events-presentation`, and
`rpg-maker-mz-visustella-plugin-commands`. Confirm `code:205` movement-route
semantics in the local engine and active Events & Movement Core documentation
before altering payloads.

Production ownership is limited to `frontend/data/Map022.json`. Task artifacts
and validators live under the active plan. Reparse the current file immediately
before writing and preserve concurrent user changes.

### Relevant Files

- `frontend/data/Map022.json` — exclusive production target for activity, movement, and Gab changes.
- `frontend/data/System.json` — read-only names for conditions referenced by Map022.
- `frontend/js/rmmz_objects.js` — movement-route, event refresh, and collision semantics.
- `frontend/js/plugins/VisuMZ_4_GabWindow.js` — vendor command contract; read header/docs only, never edit.
- `frontend/js/plugins/Coreto_GabWindowDefaults.js` — current queue/position default integration.
- `docs/architecture/exploration-dialogue-gabwindow.md` — interaction and automatic Gab policy.
- `planos/008-compozy-init/analise-tecnica.md` — child inventory, intended groups, and critical-route risks.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md` — approved P1-01/02/03, P1-05/08, and P2-04 boundaries.

### Dependent Files

- `planos/008-compozy-init/builds/update-map022-experience.mjs` — replayable structured writer to create.
- `planos/008-compozy-init/builds/validate-map022-experience.mjs` — assigned validator to create.
- `planos/008-compozy-init/builds/evidence/map022-experience.json` — final evidence.
- `planos/008-compozy-init/builds/evidence/map022-playtest-scenarios.md` — neutral human scenarios for Task 04.
- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs` — historical validator pattern to inspect, not execute blindly.

### Related ADRs

- [ADR-001: Separate canonical quest progress from presentation staging](adrs/adr-001-state-boundary.md) — changed child pages must consume the new event-local staging contract.

## Deliverables

- One Map022 child activity assignment table with role and recovery ownership.
- Structured Map022 implementation of tag, ring play, seated conversation, and gathering corridor.
- Spatial, optional Gab content/payloads limited to the approved current scope.
- Replayable Map022 writer and validator with negative bounds/corridor/Gab fixtures.
- Static passability graph evidence plus neutral Playtest scenarios.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests.

- [ ] UT-005, UT-006, UT-007 — activity classification/recovery, Gab payload policy, route bounds and protected corridor.
- [ ] IT-004, IT-005 — representative passability graph and automatic-versus-interaction Gab priority/optionality.

## Success Criteria

- Every assigned test case implemented and passing
- Every changed child belongs to one declared activity/gathering role with a recoverable route.
- No changed route targets an invalid or conflicting tile, and representative occupancy retains all critical paths.
- Every in-scope automatic Gab is valid, optional, spatially matched, and non-blocking.
- Only Map022 and active-plan build/evidence artifacts change in this task.
- Evidence reports `runtime_pending` and names the exact human Playtest cases still required.
