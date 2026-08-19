---
status: completed
title: "Task 3: Focus the Forjaprata preparation loop and audio"
type: game-content
complexity: high
---

# Task 3: Focus the Forjaprata preparation loop and audio

## Overview

Deliver the current-quest Forjaprata exploration slice without touching future
quests that share Map045/049. The player must recover cleanly from the opening,
understand the sling requirement, acquire/equip it once, and leave while Gabs
and audio communicate distinct, non-redundant meanings.

<critical>
- ALWAYS READ `_spec.md` and its catalogs (`_user_stories.md`, `_dx.md`, `_uiux.md` when present, `_tests.md`) before starting
- REFERENCE `_spec.md` Part II for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- R1. The current `tutorial-funda-forjaprata` flow MUST form one reachable chain from opening return through journal direction, sling acquisition, equip requirement, and Map044 exit.
- R2. The sling grant, `FOUND_SLING` transition, chest feedback, and journal effects MUST each occur at most once under interaction repetition and save/load.
- R3. E36 and other in-scope environmental chatter MUST remove unnecessary `WaitForGab`; automatic Gabs MUST use false/false queue policy while legitimate EX cutscene locks remain allowed.
- R4. Map045 E8 Tordan/Thorin, the trophy-owned pages, Map049 E2, and unrelated future-quest events MUST remain outside the task and retain semantic fingerprints.
- R5. The absent/invalid `Dungeon5` reference MUST be replaced by an existing exact-case asset selected and recorded by an Audio Designer.
- R6. `Coreto_QuestVN` MUST remain the sole owner of EX/VN origin audio restoration; event data MUST NOT add a competing generic return replay path.
- R7. Environmental child audio MUST be sparse, spatial, cooldown-aware, concurrency-limited, and never the sole channel for required direction.
- R8. The task MUST NOT implement the P2-03 visual anchoring/legibility refinement or add runtime timers from Playtest criteria.
- R9. Production writes MUST be limited to current-quest semantic spans in Map045/Map049 and any approved existing audio reference; no vendor plugin or new asset creation is allowed.
</requirements>

## Subtasks

- [ ] 3.1 Reconcile final Task 01 staging pages and inventory the current sling flow, feedback stack, Gabs, audio references, and protected future-quest pages.
- [ ] 3.2 Capture/replay semantic fingerprints for E8, trophy content, Map049 E2, and other declared protected spans.
- [ ] 3.3 Obtain and persist an Audio Designer decision for the exact-case `Dungeon5` replacement and semantic signal hierarchy.
- [ ] 3.4 Complete the one-shot journal/sling/equip/exit chain and remove duplicate reward or transition paths.
- [ ] 3.5 Normalize only in-scope automatic/interaction Gabs and E36 blocking behavior under the refined EX cutscene rule.
- [ ] 3.6 Implement sparse spatial ambience only where current assets and runtime capabilities support explicit cooldown/concurrency ownership; otherwise retain the approved contract as a bounded follow-up rather than inventing a subsystem.
- [ ] 3.7 Materialize a fail-closed writer and `validate-map045-experience.mjs` with quest, protected-scope, Gab, audio, and negative fixtures.
- [ ] 3.8 Run structural validation and prepare neutral Forjaprata/audio Playtest scenarios for Task 04.

## Implementation Details

Use `audio_designer` for the concrete BGM and signal-hierarchy decision and
persist its bounded handoff under the active plan. Use
`rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json`,
`rpg-maker-mz-visustella-events-presentation`, and
`rpg-maker-mz-visustella-plugin-commands` for the data work. Do not treat a
missing asset as permission to create, copy, rename, or download one.

Production ownership covers only approved current-quest spans in Map045 and
Map049 E1. Reparse immediately before writing, match semantic anchors rather
than indexes, and preserve concurrent user edits. If sparse ambience requires a
new plugin/helper or global ID, record it as follow-up; do not widen this task.

### Relevant Files

- `frontend/data/Map045.json` — current sling quest, E11/E36 return presentation, Gabs, BGM, and protected future content.
- `frontend/data/Map049.json` — current opening E1 and protected future E2.
- `frontend/data/CoretoQuests.json` — existing `tutorial-funda-forjaprata` state/transition ownership.
- `frontend/data/System.json` — V111 name and protected future quest variables.
- `frontend/audio/bgm/` — exact-case BGM candidates; inspect filenames/metadata without rewriting assets.
- `frontend/audio/bgs/` — ambient bed references.
- `frontend/audio/se/` — sparse cue candidates and existing chest/sling feedback.
- `frontend/js/plugins/Coreto_QuestVN.js` — audio capture/restoration owner.
- `frontend/js/plugins/VisuMZ_4_GabWindow.js` — vendor Gab command contract; never edit.
- `docs/architecture/exploration-dialogue-gabwindow.md` — automatic and interaction queue policy.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md` — final P0-05/06, P1-04/05/06/07/08 boundaries.

### Dependent Files

- `planos/008-compozy-init/builds/audio-design-decision.md` — exact asset and rationale handoff to create.
- `planos/008-compozy-init/builds/update-map045-experience.mjs` — replayable structured writer to create.
- `planos/008-compozy-init/builds/validate-map045-experience.mjs` — assigned validator to create.
- `planos/008-compozy-init/builds/evidence/map045-experience.json` — final evidence.
- `planos/008-compozy-init/builds/evidence/map045-playtest-scenarios.md` — neutral human scenarios for Task 04.

### Related ADRs

- [ADR-001: Separate canonical quest progress from presentation staging](adrs/adr-001-state-boundary.md) — Task 01 staging ownership is inherited.
- [ADR-002: Protect future quest content on shared maps](adrs/adr-002-shared-map-scope.md) — E8/trophy/E2 are protected.
- [ADR-003: Delegate concrete audio selection while preserving runtime ownership](adrs/adr-003-audio-ownership.md) — governs BGM and restoration.

## Deliverables

- One reachable, idempotent opening→journal→sling→equip→exit chain for the current quest.
- E36/current-scope Gab cleanup consistent with the refined EX/cutscene rule.
- Persisted Audio Designer decision and exact-case audio-reference correction.
- Sparse ambience implementation only when expressible within existing approved capabilities.
- Protected future-content fingerprints before and after the change.
- Replayable writer, validator, negative fixtures, evidence JSON, and Playtest scenarios.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests.

- [ ] UT-008, UT-009, UT-010 — sling state/idempotency, protected future content, audio existence/decision/signal boundaries.
- [ ] IT-006, IT-007 — complete current-quest chain and single-owner audio restoration/accessibility flow.

## Success Criteria

- Every assigned test case implemented and passing
- The current sling chain is reachable and idempotent in every structured fixture.
- No in-scope automatic Gab uses `WaitForGab`, force, or anti-repeat bypass outside a legitimate deliberate interaction/cutscene contract.
- Every changed audio reference resolves exactly and has recorded Audio Design authority.
- E8, trophy content, Map049 E2, and declared future-quest fingerprints remain unchanged.
- Evidence reports `runtime_pending` and names exact human audio/flow Playtest gates.
