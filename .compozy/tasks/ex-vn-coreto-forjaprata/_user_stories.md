# User Stories: EX/VN Coreto and Forjaprata Hardening

Canonical behavior catalog for the feature. Companion to `_spec.md`; consumed
by `_tests.md` and the task package.

## Personas

- **Player** — explores the Coreto and Forjaprata house and needs progression,
  orientation, and feedback that remain clear after repetition or save/load.
- **Content implementer** — edits RPG Maker MZ event data and needs explicit
  state ownership and protected shared-map boundaries.
- **QA/playtest operator** — validates structural behavior and human perception
  without confusing one evidence class for another.

## Story Index

| ID | Feature Area | Persona | Story |
| --- | --- | --- | --- |
| US-001 | Quest flow | Player | Complete each EX/VN handoff once and continue safely |
| US-002 | Coreto exploration | Player | Read the child activities and reach every critical destination |
| US-003 | Forjaprata exploration | Player | Prepare the sling and depart without future-quest interference |
| US-004 | Environmental feedback | Player | Receive optional, spatial, non-redundant Gabs and audio |
| US-005 | Validation | QA/playtest operator | Reproduce the full flow and distinguish static from human evidence |

## Quest Flow

### US-001: Complete each EX/VN handoff once

**As a** player, **I want** each narrative handoff to enter and return exactly
once, **so that** I never lose control, repeat exposition, or corrupt progress.

Acceptance criteria:

- AC-1: Given `V106=10`, when the player activates Map022 E18, then Map046
  starts once and returns to Map022 with `V106=20` and no residual VN session.
- AC-2: Given `V106=20` or `90`, when the player contacts E18 again, then no VN
  entry or invalid assertion occurs.
- AC-3: Given the Map045 opening state, when Map049 finishes, then the player
  returns once to a stable non-looping EX page.
- AC-4: Given any supported save/load checkpoint at an EX/VN boundary, when the
  game reloads, then canonical state and reconstructed transient state agree.
- AC-5: V106 never exposes presentation-only values to the player flow.

Edge cases:

- EC-1: Entry is triggered twice before the first transfer completes → only one
  QuestVN session exists and the second attempt cannot create another.
- EC-2: The player saves immediately before or after a return → reload restores
  one valid page and no Autorun loop.
- EC-3: A stale presentation self-switch is present with canonical state 20/90
  → page precedence resolves to a safe terminal or recovery state.
- EC-4: The VN is entered out of order → the existing deterministic Coreto
  state error surfaces and no partial session remains.
- EC-5: The flow repeats after success → transitions remain idempotent or
  ineligible and rewards/effects are not duplicated.

## Coreto Exploration

### US-002: Read and traverse the Coreto

**As a** player, **I want** the children's activities to look intentional and
the critical path to stay open, **so that** the plaza feels alive without
obscuring progression.

Acceptance criteria:

- AC-1: Before the gathering, tag, ring play, and seated conversation are
  distinguishable primarily by movement and spatial composition.
- AC-2: The player can reach Darla, E18, E17, and the VN seat in every relevant
  quest state.
- AC-3: A displaced child returns to a valid activity route without permanently
  blocking the player.
- AC-4: At least five of six human Playtest participants find the VN seat within
  90 seconds without mandatory instructional text.

Edge cases:

- EC-1: The player body-blocks a moving child → the route remains skippable or
  recoverable and cannot softlock the map.
- EC-2: Several children converge during the gathering → the critical corridor
  remains passable.
- EC-3: Save/load occurs with children off their designed positions → refresh
  restores a valid page and recoverable movement behavior.
- EC-4: The player ignores every environmental Gab → required quest progress
  and direction remain available.

## Forjaprata Exploration

### US-003: Prepare the sling and depart

**As a** player, **I want** the current house sequence to guide me through
finding and equipping the sling, **so that** I can leave without unrelated
future quests becoming prerequisites.

Acceptance criteria:

- AC-1: The opening VN returns once and immediately yields control or an
  intentional bounded EX cutscene.
- AC-2: The sling is granted once, the equipment requirement is clear, and the
  exit works after the weapon is equipped.
- AC-3: At least five of six human Playtest participants find and acquire the
  sling within three minutes without a runtime timer.
- AC-4: Map045 E8 Tordan/Thorin and trophy behavior remain outside the current
  quest flow and retain their pre-task semantics.

Edge cases:

- EC-1: The player checks the exit before finding the sling → a repeatable
  interaction Gab explains the current action without starting another quest.
- EC-2: The player owns but has not equipped the sling → the exit remains safe
  and states the equip requirement.
- EC-3: The player reopens the chest or revisits after success → no duplicate
  sling, journal transition, or fanfare occurs.
- EC-4: A future-quest variable activates E8 or the trophy → this feature's
  changes do not alter those pages or make them part of the current route.

## Environmental Feedback

### US-004: Receive optional environmental feedback

**As a** player, **I want** chatter and ambience to support what I see without
interrupting me, **so that** exploration remains readable and comfortable.

Acceptance criteria:

- AC-1: Automatic Gabs use `ForceGab=false`, `BypassAntiRepeat=false`, and no
  `WaitForGab`; deliberate interactions may prioritize their first Gab.
- AC-2: Environmental Gab text matches the visible group or local activity and
  contains no sole source of critical quest information.
- AC-3: Each state change has one primary semantic signal; audio, Gab, marker,
  and fanfare stack only when their functions differ.
- AC-4: Every referenced BGM exists with exact case and EX/VN return does not
  leave silence, restart abruptly, or leak the VN track.
- AC-5: Child ambience uses spacing, cooldown, and concurrency limits and does
  not emit one sound per Gab.

Edge cases:

- EC-1: An automatic Gab is visible when the player interacts → the deliberate
  interaction wins according to the existing queue policy.
- EC-2: Several ambient emitters become eligible together → concurrency limits
  prevent a burst that masks the objective.
- EC-3: Audio is muted or unavailable → all essential direction remains
  available visually or textually.
- EC-4: The player repeats an interaction → the first interaction Gab can recur
  without automatic chatter bypassing anti-repeat.

## Validation

### US-005: Reproduce and classify the full flow

**As a** QA/playtest operator, **I want** a traceable matrix and replayable
validators, **so that** structural regressions and human-experience findings are
reported honestly.

Acceptance criteria:

- AC-1: Every automated case emits its test ID, inspected targets, result, and
  evidence classification.
- AC-2: The matrix covers New Game, save/load, reentry, passability, Gab
  priority, audio restoration, session cleanup, and next-objective comprehension.
- AC-3: Automated results never mark visual, audio, route, timing, or
  comprehension criteria human-approved.
- AC-4: Human Playtest feedback records version/hash, setup, observations,
  verdict, and unresolved findings.

Edge cases:

- EC-1: Runtime/editor access is unavailable → structural checks may pass, but
  human cases remain explicitly `not_executed` or `blocked`.
- EC-2: One automated case fails → the aggregate cannot report success and
  identifies the owning task/test ID.
- EC-3: User-owned concurrent map edits appear → validators rebaseline only
  after classifying and preserving them; they never silently overwrite them.
- EC-4: One Playtest participant fails a comprehension target → the observation
  remains visible and no automated assertion overrides it.
