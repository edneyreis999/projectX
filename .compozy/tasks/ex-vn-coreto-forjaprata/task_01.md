---
status: pending
title: "Task 1: Repair canonical state and EX/VN lifecycle"
type: bugfix
complexity: critical
---

# Task 1: Repair canonical state and EX/VN lifecycle

## Overview

Repair the shared state foundation before any exploration polish. This slice
removes presentation staging from V106, closes Map022 and Map045/049 reentry
paths, preserves the existing QuestCore/QuestVN contract, and normalizes only
the two relevant VN map names.

<critical>
- ALWAYS READ `_spec.md` and its catalogs (`_user_stories.md`, `_dx.md`, `_uiux.md` when present, `_tests.md`) before starting
- REFERENCE `_spec.md` Part II for implementation details — do not duplicate here
- FOCUS ON "WHAT" — describe what needs to be accomplished, not how
- MINIMIZE CODE — show code only to illustrate current structure or problem areas
- TESTS REQUIRED — implement every test case assigned in ## Tests
</critical>

<requirements>
- R1. The implementation MUST keep `noite-da-historia` states exactly `0`, `10`, `20`, and `90`, with QuestCore as the only canonical writer.
- R2. Every V106 condition or write using `91`, `92`, `100`, or `110` MUST migrate to event-owned presentation state or an already-approved state owned by the current quest.
- R3. The task MUST NOT allocate a new global variable, switch, database object, map, Common Event, or item ID.
- R4. Map022 E18 MUST enter Map046 only from exact state `10`; states `20` and `90` MUST expose a safe ineligible/terminal page without an invalid assertion.
- R5. Map045 E11, Map045 E36, and Map049 E1 MUST form a one-shot opening/return sequence with a stable non-Autorun terminal page across repetition and save/load.
- R6. Every `BeginCutscene`/`FinishCutscene` and `EnterVisualNovel`/`FinishVisualNovel` lifecycle MUST remain paired on every reachable branch.
- R7. Only Map046 and Map049 names MAY change from `NV_` to `VN_`; legacy reference maps MUST remain unchanged.
- R8. Map045 E8, trophy-owned pages, Map049 E2, and unrelated future-quest content MUST retain their semantic fingerprints.
- R9. All production data writes MUST use structured parsing, semantic anchors, restricted diffs, and replayable writers retained under `planos/008-compozy-init/builds/`.
</requirements>

## Subtasks

- [ ] 1.1 Reconcile the current worktree and inventory every reader/writer of V106 values `91`, `92`, `100`, and `110`, including page conditions and nested event commands.
- [ ] 1.2 Capture semantic fingerprints for protected future-quest events/pages and concurrent user-owned changes before writing.
- [ ] 1.3 Freeze the event-local staging transition table and terminal/recovery page precedence without reserving global IDs.
- [ ] 1.4 Correct Map022 E18 eligibility and the Map022→Map046→Map022 one-shot lifecycle.
- [ ] 1.5 Migrate Map049 E1 and Map045 E11/E36 presentation staging away from V106 and eliminate their Autorun/reentry loops.
- [ ] 1.6 Normalize the two in-scope VN names in MapInfos and preserve every other entry.
- [ ] 1.7 Materialize a fail-closed structured writer and `validate-flow-state.mjs` with the assigned tests and negative fixtures.
- [ ] 1.8 Run JSON parse, plugin syntax, restricted-diff, protected-fingerprint, validator, and evidence-schema gates on the final hashes.

## Implementation Details

Use `rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json`, and the
`quest-state-machine`, `common-event-command-contracts`, and
`json-write-style-and-diff` references. Use
`rpg-maker-mz-visustella-events-presentation` and
`rpg-maker-mz-visustella-plugin-commands` for event command semantics. Do not
edit VisuStella or Coreto plugin source unless current local evidence proves an
existing public command cannot satisfy the approved lifecycle; any such plugin
expansion is outside this task and must be recorded as follow-up instead.

The writer must locate events, pages, and plugin commands by IDs plus semantic
content, never by stale command indexes. Preserve BOM/newline/indentation style
per file and stop on a precondition mismatch or broad reflow.

### Relevant Files

- `frontend/data/CoretoQuests.json` — canonical states, transitions, and VN entries.
- `frontend/data/System.json` — V106/V111 names and the no-new-ID boundary.
- `frontend/data/MapInfos.json` — exact Map046/049 naming targets.
- `frontend/data/Map022.json` — E18 entry, E17 terminal transfer, and canonical flow consumers.
- `frontend/data/Map045.json` — E11/E36 staging and shared-map protected content.
- `frontend/data/Map046.json` — `noite-da-historia` VN assertion/transition/finish route.
- `frontend/data/Map049.json` — E1 current opening return and protected E2 future route.
- `frontend/js/plugins/Coreto_QuestCore.js` — canonical transition and error semantics.
- `frontend/js/plugins/Coreto_QuestVN.js` — session phases, snapshot restoration, and cleanup semantics.
- `frontend/js/plugins/Coreto_Cutscene.js` — EX cutscene ownership and lock pairing.
- `frontend/js/rmmz_objects.js` — event command and page refresh behavior.
- `docs/domains/quest-content-designer/README.md` — exact canonical V106 contract.
- `docs/domains/scene-presentation-designer/README.md` — EX/VN/Cutscene lifecycle.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md` — final human decisions and exclusions.

### Dependent Files

- `planos/001-cena-coreto-nova-arquitetura/builds/fase1/validate-architecture.mjs` — existing validation logic may be imported or updated only if its historical purpose remains intact.
- `planos/001-cena-coreto-nova-arquitetura/builds/fase2/validate-route.mjs` — existing route assertions expose current invariants and drift.
- `planos/008-compozy-init/builds/update-flow-state.mjs` — replayable structured writer to create.
- `planos/008-compozy-init/builds/validate-flow-state.mjs` — assigned validator to create.
- `planos/008-compozy-init/builds/evidence/flow-state.json` — final structured evidence.

### Related ADRs

- [ADR-001: Separate canonical quest progress from presentation staging](adrs/adr-001-state-boundary.md) — governs V106 and no-new-ID ownership.
- [ADR-002: Protect future quest content on shared maps](adrs/adr-002-shared-map-scope.md) — governs protected fingerprints.

## Deliverables

- Corrected structured data for the canonical Map022/046 and Map045/049 lifecycles.
- V106 inventory showing no presentation-state consumers or direct event writers.
- Exact two-entry `NV_`→`VN_` MapInfos normalization.
- Replayable writer with fail-closed preconditions and no broad reserialization.
- `validate-flow-state.mjs` plus positive/negative fixtures and final evidence JSON.
- Protected future-content fingerprints before and after the change.
- Every test case assigned in `## Tests` implemented and passing **(REQUIRED)**

## Tests

Cases assigned from `_tests.md`, the test contract — read each ID's full definition there before writing tests.

- [ ] UT-001, UT-002, UT-003, UT-004 — canonical registry, forbidden V106 staging, terminal ordering, naming/diff/evidence boundaries.
- [ ] IT-001, IT-002, IT-003 — both EX/VN transition chains and save/load session/page reconstruction fixtures.

## Success Criteria

- Every assigned test case implemented and passing
- Structured scan finds V106 only in the canonical `0/10/20/90` contract and no direct event writer.
- Repeated entry/return fixtures select a stable non-Autorun page with no residual lock or QuestVN session.
- Protected future-quest fingerprints match the pre-write baseline.
- JSON parse, `node --check` for referenced Coreto plugins, `git diff --check`, and restricted-diff review pass.
- Evidence reports `runtime_pending`; it does not claim editor or Playtest approval.
