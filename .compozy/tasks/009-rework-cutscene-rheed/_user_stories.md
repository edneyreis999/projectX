# User Stories: Rheed Forge-Silver House Cutscene Rework

Canonical behavior catalog for the Map045 Rheed cutscene rework.

## Personas

- **Player** — watches the memory sequence and must understand the children's wonder without visual noise.
- **Game author** — maintains RPG Maker MZ event data and must be able to replay and validate the change safely.

## Story Index

| ID | Feature Area | Persona | Story |
|---|---|---|---|
| US-001 | Presentation | Player | Understand the house reveal and the children's wonder. |
| US-002 | Continuity | Player | See the scene finish without clipped speech or residual events. |
| US-003 | Authoring safety | Game author | Apply and verify the event change without unrelated data drift. |

## Presentation

### US-001: Read wonder through behavior

**As a** player, **I want** the children to react through legible body language, **so that** the Forge-Silver House feels wondrous rather than like an ordinary spawn.

Acceptance criteria:

- AC-1: Given the return from Map049, when Rheed and the children appear, then the house remains the visual focus.
- AC-2: Given Rheed's Gab is visible, when E33 approaches the house, then E26 visually follows the reaction without a second child Gab.
- AC-3: Given audio is muted, when the complete beat plays, then reveal, curiosity, contagion, and guidance remain legible.

Edge cases:

- EC-1: Reduced-flash presentation → the body-led reaction still communicates intentional materialization.
- EC-2: Low frame rate → reactions preserve causal order rather than overlapping unpredictably.
- EC-3: Repeated observation → the scene does not accumulate extra effects or duplicated Gabs.

## Continuity

### US-002: Finish the beat cleanly

**As a** player, **I want** the scene to finish after speech and movement settle, **so that** disappearance feels intentional rather than interrupted.

Acceptance criteria:

- AC-1: Given Rheed's Gab is active, when the visual choreography finishes, then the event waits for automatic Gab completion before fading.
- AC-2: Given E33 left formation, when cleanup begins, then E33 has returned to `(11,9)` and all movement routes have completed.
- AC-3: Given page B activates, when fade finishes, then the existing Self Switch cleanup remains intact.

Edge cases:

- EC-1: A longer localized Gab → the final barrier delays fade instead of cutting the text.
- EC-2: Save/load or event refresh during the sequence → page conditions and cleanup do not leave visible residual characters.
- EC-3: The original long Rheed destination is retained by a later author → validation reports the timing/routing mismatch instead of silently accepting it.

## Authoring Safety

### US-003: Replay and validate the data change

**As a** game author, **I want** a fail-closed structured writer and validator, **so that** I can reproduce the rework without reformatting or damaging unrelated Map045 content.

Acceptance criteria:

- AC-1: Given the expected E36 semantic anchors, when the writer runs, then it changes only the approved E36 page-A/page-B command surfaces.
- AC-2: Given the writer runs twice, then the second run is a no-op with the same semantic result.
- AC-3: Given a precondition mismatch, then the writer exits nonzero without modifying `Map045.json`.

Edge cases:

- EC-1: Unrelated dirty-worktree changes → the writer preserves them byte-for-byte outside the authorized command spans.
- EC-2: Missing E33 or E26 → the writer fails before mutation.
- EC-3: Existing cleanup commands differ → the writer fails closed and reports the mismatched invariant.

