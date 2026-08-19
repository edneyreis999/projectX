# EX/VN Coreto and Forjaprata Hardening Specification

# Part I — Product

## Overview

This feature hardens the current `EX_Coreto` and `EX_Casa da Familia Forjaprata`
quest flow while improving the readable exploration around it. It serves the
player who moves from the present-day Coreto framing story into Rheed's narrated
past, and the developers who must keep that transition safe across repetition,
save/load, and future quest content sharing the same maps.

The feature implements the approved P0, P1, and P2 decisions recorded under
`planos/008-compozy-init`. It treats the human checkpoints as authority over the
earlier analysis whenever they differ.

## Goals

- The player enters each relevant VN once, returns to the correct EX context,
  and cannot retrigger an incompatible VN or Autorun loop.
- `V106` represents only canonical `noite-da-historia` progression.
- The Coreto reads as three intentional child activities while its critical
  route remains traversable.
- The current Forjaprata quest reads as a focused prepare-and-depart loop without
  changing future-quest content.
- Environmental Gabs remain optional and non-blocking while legitimate EX
  cutscenes may still hold control deliberately.
- All referenced music exists with exact case and EX/VN audio ownership remains
  compatible with `Coreto_QuestVN` restoration.
- Automated evidence and a human Playtest matrix distinguish structural proof
  from perceptual approval.

## User Stories

- `US-001` — safe and idempotent EX/VN progression.
- `US-002` — readable and traversable Coreto activity.
- `US-003` — focused Forjaprata preparation and departure.
- `US-004` — optional, spatial, non-redundant environmental feedback.
- `US-005` — reproducible technical QA and bounded human Playtest.

[Full user stories](_user_stories.md)

## Core Features

### Canonical quest flow

`noite-da-historia` keeps the exact canonical state graph `0 -> 10 -> 20 ->
90`. Map022 E18 enters Map046 only at state `10`; Map046 commits
`COMPLETE_VN`; Map022 E17 commits `ARRIVE_MAP045`; subsequent contact or load
must not reopen the VN.

The Forjaprata opening uses the existing `tutorial-funda-forjaprata` ownership
and a stable terminal event page. Map049 returns through `Coreto_QuestVN` and
must not write `V106` presentation values.

### Presentation staging boundary

Values `91`, `92`, `100`, and `110` are not quest states and must disappear
from every `V106` reader and writer. Presentation-only sequencing must use
event-owned state, such as self-switches, or an already-approved canonical
state belonging to the quest that owns the behavior. This feature must not
reserve a new global variable or switch ID.

### Coreto exploration

The children form three visually distinguishable activities: tag in a western
perimeter circuit, ring play in an open south/central space, and small seated
conversation groups on plaza edges. Their routes recover after displacement and
preserve access to Darla, E18, E17, and the VN seat.

### Forjaprata exploration

The current quest guides the player from the opening return through finding and
equipping the sling and leaving the house. The trophy and the Tordan/Thorin E8
conversation remain byte-for-byte outside the feature's behavioral edits
because they belong to future quests.

### Environmental feedback

Environmental dialogue uses valid `VisuMZ_4_GabWindow` `GabTextOnly` payloads.
Automatic chatter does not force the queue, bypass anti-repeat, or call
`WaitForGab`. The first Gab in a deliberate interaction may force and bypass
anti-repeat. Legitimate cutscenes remain allowed to block control through their
own intentional lifecycle.

Audio uses one primary semantic signal per beat. Child ambience is sparse,
spatial, cooldown-aware, and concurrency-limited. Audio Design owns the choice
of an existing exact-case replacement when `Dungeon5` is invalid.

## Business Rules

1. Map type follows narrative function: EX may contain cutscenes; critical
   quest narrative remains in VN.
2. Map membership never expands quest scope. Future-quest events on Map045 are
   protected.
3. `Coreto_QuestCore` is canonical for quest progress; PKD/SQSM is a projection.
4. `Coreto_QuestVN` owns origin snapshot, EX/VN transfer, audio restoration,
   and session cleanup.
5. Every `EnterVisualNovel` has one reachable `FinishVisualNovel`; every
   `BeginCutscene` has one reachable `FinishCutscene`.
6. `V106` accepts only `0`, `10`, `20`, and `90` in this flow.
7. No new global switch, variable, database, map, item, weapon, armor, or Common
   Event ID may be selected by this feature.
8. The player can ignore environmental chatter without losing required quest
   information or progress.
9. Human timing targets and success rates are Playtest criteria, not runtime
   timers or telemetry requirements.
10. Static validation never claims visual readability, audio quality,
    reachability in the running game, or save/load restoration as human-approved.

## User Experience

The player explores the present-day Coreto, recognizes groups of children by
motion and composition, speaks with Darla, reaches the seat, watches the VN,
returns to the Coreto, and leaves for the Forjaprata house. At Forjaprata, the
player experiences the opening VN once, regains control, understands that the
sling is required, finds it, equips it, and exits without unrelated future
content becoming mandatory.

Essential direction never depends only on sound, color, a transient Gab, or a
single moving NPC. Playtest checks discovery and comprehension without adding
pressure to the game.

## High-Level Technical Constraints

- Use RPG Maker MZ structured JSON edits and preserve command `357/657` pairs,
  nested payloads, page precedence, file style, and restricted diffs.
- Prefer existing Coreto and VisuStella capabilities; do not edit vendor
  VisuStella source.
- Retain replayable writers and validators under
  `planos/008-compozy-init/builds/`.
- Treat the supported compatibility policy as New Game plus saves created by
  the current Coreto runtime; do not invent legacy-save migration.
- Require RPG Maker editor round-trip and human Playtest after static gates.

## Non-Goals (Out of Scope)

- Moving or rewriting Map045 E8 Tordan/Thorin dialogue (`P0-04`).
- Changing the trophy or making it part of the current quest (`P1-04` limit).
- Automating fine Gab anchoring or visual legibility approval (`P2-03`).
- Renaming legacy reference maps beyond Map046 and Map049.
- Adding timers, countdowns, telemetry, or time pressure from Playtest targets.
- Modernizing unrelated maps, quests, Common Events, plugins, or assets.
- Replacing `Coreto_QuestVN`, `Coreto_QuestCore`, or the active Gab architecture.

## Open Questions

No product question blocks implementation. Audio Design must record the chosen
exact-case replacement for `Dungeon5` during Task 03. Fine visual approval and
final player comprehension remain explicit human gates after Task 04.

# Part II — Technical

## Executive Summary

Implementation first repairs state ownership and page precedence across
Map022/046 and Map045/049. It removes presentation values from `V106` without
allocating a new global ID, using event-local self-switches and already-owned
quest state where appropriate. Two map-specific slices then improve Coreto and
Forjaprata independently. A final QA slice consolidates structural evidence and
the human Playtest handoff.

## MVP Boundary

Tasks 01 through 04 compose the MVP. There is no post-MVP automated scope in
this package. Manual Gab anchoring polish, future-quest content, and legacy-map
normalization remain explicitly out of scope.

## Developer Experience

[Developer experience contract](_dx.md) — exact validator and evidence commands
used by agents and reviewers.

No web surface changes, so this workflow intentionally has no `_uiux.md`.

## System Architecture

- **Canonical quest registry** — `frontend/data/CoretoQuests.json` defines the
  valid quest states, transitions, and VN entries.
- **Canonical runtime** — `Coreto_QuestCore` applies transitions and projects
  journal state; no event directly writes canonical quest progress.
- **VN session runtime** — `Coreto_QuestVN` captures and restores EX context and
  owns the EX/VN transfer lifecycle.
- **EX cutscene runtime** — `Coreto_Cutscene` owns deliberate movement/control
  locks in EX maps.
- **Map event data** — Map022, Map045, Map046, and Map049 own page eligibility,
  movement, Gabs, transfers, and event-local presentation state.
- **Static validators** — replayable `.mjs` scripts under the active plan prove
  structure, protected surfaces, payload integrity, references, and graph
  invariants without claiming runtime perception.

## Architectural Boundaries

- Data files may call registered Coreto or VisuStella commands but may not
  duplicate their runtime implementation in ad hoc event scripts unless no
  public command can express a cross-event self-switch transition.
- Coreto plugins may depend on RPG Maker MZ engine APIs and each other in the
  existing `QuestCore -> QuestVN -> Cutscene` order.
- Project code must not modify vendor `VisuMZ_*` plugin files.
- Map-specific presentation edits must not change quest definitions owned by a
  future quest.
- Validators may read production files but write evidence only under
  `planos/008-compozy-init/builds/`.

No Go packages or Go interfaces exist in this RPG Maker MZ project. The
template's Go-specific interface requirement is inapplicable; the final
JavaScript-facing contracts are listed below.

## Implementation Design

### Core Interfaces

```js
Coreto.QuestCore.state(questKey)
Coreto.QuestCore.transition(questKey, transitionId)
Coreto.QuestCore.assertState(questKey, expectedState)
Coreto.QuestVN.enter(questKey, entryKey)
Coreto.QuestVN.finish()
Coreto.QuestVN.inspect()
```

Event data uses the corresponding registered commands. `GabTextOnly` retains
its plugin-owned serialized argument names and matching `code:657` display
continuations.

### Data Models

- `V106 v_qNoiteDaHistoria_stage` — canonical durable quest state; allowed
  values in this feature are exactly `0`, `10`, `20`, `90`.
- `V111 v_qTutorialFundaForjaprata_stage` — existing owner for the current
  prepare-and-depart quest; no new states are added unless already declared in
  `CoretoQuests.json`.
- Event self-switches — durable event-local presentation state used for
  one-shot returns and metanarrative staging. They do not become quest state.
- `$gameSystem._coretoQuestVN.session` — existing opaque session snapshot owned
  only by `Coreto_QuestVN`.

Side-table versus JSON decision: this project has no SQLite persistence. RPG
Maker variables and self-switches remain engine-owned matchable state, while
the existing QuestVN snapshot remains opaque plugin-owned save data. No new
JSON metadata store is introduced.

### API Endpoints

No HTTP or UDS endpoints are added.

## Integration Points

- RPG Maker MZ event interpreter command codes and map page precedence.
- Coreto QuestCore, QuestVN, and Cutscene plugin commands.
- VisuStella Gab Window command payloads and event/presentation behavior.
- RPG Maker audio asset lookup and `Coreto_QuestVN` origin restoration.
- PKD/SQSM journal projection through the existing QuestCore adapter.

## Impact Analysis

| Component | Impact Type | Description and Risk | Required Action |
| --- | --- | --- | --- |
| `Map022.json` | modified | VN reentry and child routing; high regression surface | structured writer, protected-flow validator, Playtest |
| `Map045.json` | modified | Autorun precedence, staging, Gabs, current quest loop; critical due shared future content | protected-event hashes, structured writer, Playtest |
| `Map046.json` | reviewed/possibly modified | VN terminal route and session pairing | preserve narrative and validate session lifecycle |
| `Map049.json` | modified | opening return must stop writing V106 and terminate once | protect future E2 content and validate return |
| `MapInfos.json` | modified | normalize only Map046/049 `NV_` names to `VN_` | exact two-entry diff |
| `CoretoQuests.json` | reviewed/possibly modified | state graph must remain canonical | registry validator |
| `System.json` | reviewed | no new global IDs; V106/V111 names remain authoritative | fail on new allocation |
| audio assets/data refs | modified only if needed | missing `Dungeon5` replacement chosen by Audio Design | exact-case existence and runtime Playtest |
| plan validators/evidence | new | replayable structural proof | retain under active plan builds |

No production file is deleted. No compatibility shim or placeholder asset is
allowed.

## Extensibility Integration Plan

CompozyOS extensions, MCP tools, hooks, bridges, and manifests are unaffected.
The game-development-cycle agents may assist implementation, but this feature
does not change their definitions or permissions.

## Agent Manageability Plan

Agents operate the feature through deterministic Node validators, JSON evidence
files, `git diff --check`, targeted Jest runs when introduced, and explicit
RPG Maker editor/Playtest handoff records. No UI-only or prose-only completion
claim is accepted.

## Config Lifecycle

`config.toml`, `.compozy/workspace.toml`, `frontend/js/plugins.js` activation,
and VisuStella Plugin Manager parameters are unaffected. If implementation
discovers that a plugin configuration change is necessary, it is follow-up work
outside this spec and must not be folded into a map-data task.

## Testing Approach

- Unit-level validators parse JSON, validate page conditions, command payloads,
  asset references, protected surfaces, and allowed state sets.
- Integration cases validate cross-map command topology, transition ordering,
  EX/VN session pairing, child-route recovery contracts, and current-quest
  progression.
- End-to-end cases combine automated preflight with human Playtest from New
  Game and save/load checkpoints. Human observations stay separate from
  automated pass/fail claims.

[Canonical test cases](_tests.md)

## Development Sequencing

### Build Order

1. Repair canonical state ownership, EX/VN reentry, Autorun terminal pages, and
   map naming; prove protected future content remains unchanged.
2. After Task 01, implement the Coreto exploration slice and its validators.
3. After Task 01, implement the Forjaprata current-quest and audio slice and its
   validators. Tasks 02 and 03 have disjoint production ownership and may run
   in parallel.
4. After Tasks 02 and 03, run the complete regression matrix, prepare Playtest
   evidence, and reconcile every test ID.

### Technical Dependencies

- Active Coreto plugin order and existing QuestCore/QuestVN/Cutscene contracts.
- Valid JSON sources and exact-case local audio assets.
- RPG Maker MZ editor and human Playtest for final runtime/perceptual gates.

## Monitoring and Observability

Production telemetry is not added. Validators emit structured JSON with test
IDs, target hashes, inspected event/page locators, result classification, and
human-gate status. Runtime diagnostics use existing `InspectQuestState`,
`InspectVisualNovelSession`, and Coreto error surfaces during Playtest.

## Technical Considerations

### Key Decisions

- Keep V106 canonical and move presentation staging to event-owned state.
- Split work by state foundation and map-specific vertical slices.
- Protect shared-map future content with structural fingerprints.
- Delegate the concrete BGM replacement to Audio Design within existing assets.
- Treat Playtest thresholds as human observation criteria only.

### Known Risks

- RPG Maker page precedence can reactivate Autorun pages after a return.
- Self-switch changes across several metanarrative events can create partial
  staging if the writer is not atomic and validated.
- Movement routes can deadlock or block corridors despite static validity.
- Audio references may exist but still transition poorly at runtime.
- Concurrent user changes in map JSON must be preserved and may invalidate
  stale command indexes.

## Safety Invariants

1. V106 has exactly one canonical writer path: QuestCore transitions.
2. No event condition or command uses V106 values `91`, `92`, `100`, or `110`.
3. One VN entry produces at most one active QuestVN session and one return.
4. A completed return always exposes a non-Autorun terminal page before the
   player can retrigger the entry event.
5. Every EX cutscene lock releases before `EnterVisualNovel` or terminal map
   transfer.
6. Task 02 cannot modify Map045/049; Task 03 cannot modify Map022/046.
7. Map045 E8 and trophy-owned pages retain their pre-task semantic fingerprint.
8. No worker edits vendor VisuStella source or allocates a new global ID.
9. Every automated validator labels runtime perception as `runtime_pending`
   until human evidence is attached.

## File References

### Repo Files

- `AGENTS.md` — project scope and RPG Maker/VisuStella data policy.
- `frontend/data/CoretoQuests.json` — canonical quest state and VN registry.
- `frontend/data/System.json` — authoritative variable and switch names.
- `frontend/data/MapInfos.json` — map names and IDs.
- `frontend/data/Map022.json` — Coreto flow, children, Gabs, and critical route.
- `frontend/data/Map045.json` — Forjaprata shared quest content and staging.
- `frontend/data/Map046.json` — Noite da Historia VN lifecycle.
- `frontend/data/Map049.json` — Forjaprata VN entries and return writes.
- `frontend/js/plugins/Coreto_QuestCore.js` — canonical transition semantics.
- `frontend/js/plugins/Coreto_QuestVN.js` — snapshot, transfer, and cleanup owner.
- `frontend/js/plugins/Coreto_Cutscene.js` — EX lock lifecycle.
- `frontend/js/plugins/Coreto_GabWindowDefaults.js` — project Gab defaults.
- `frontend/js/rmmz_objects.js` — event command and page semantics.
- `docs/architecture/exploration-dialogue-gabwindow.md` — current Gab policy,
  refined by the human decisions in this spec.
- `docs/domains/quest-content-designer/README.md` — canonical state table.
- `docs/domains/scene-presentation-designer/README.md` — EX/VN/Cutscene lifecycle.
- `planos/001-cena-coreto-nova-arquitetura/builds/fase1/validate-architecture.mjs` — existing registry validator to update or reuse.
- `planos/001-cena-coreto-nova-arquitetura/builds/fase2/validate-route.mjs` — existing route validator to update or reuse.
- `planos/008-compozy-init/analise-tecnica.md` — multidisciplinary evidence and original backlog.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md` — final human scope authority.

### Design and Analysis Sources

- `planos/008-compozy-init/analise-tecnica.md` — observed risks and acceptance evidence.
- `planos/008-compozy-init/decisoes-p0.md` — refined EX/cutscene rule.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1.md` — intermediate checkpoint retained for provenance.
- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md` — winning final decisions.

## Assumptions and Defaults

- The current uncommitted plan and loop files are user-owned and must be preserved.
- New Game remains the compatibility baseline of the Coreto quest runtime.
- Existing exact-case assets are preferred; no new audio asset is required by default.
- Task completion means implementation plus automated evidence and a ready human
  gate, not fabricated human approval.
- The slug is `ex-vn-coreto-forjaprata`.

## Architecture Decision Records

- [ADR-001: Separate canonical quest progress from presentation staging](adrs/adr-001-state-boundary.md) — V106 stays canonical without allocating a new global ID.
- [ADR-002: Protect future quest content on shared maps](adrs/adr-002-shared-map-scope.md) — current-quest changes use structural protection boundaries.
- [ADR-003: Delegate concrete audio selection while preserving runtime ownership](adrs/adr-003-audio-ownership.md) — Audio Design selects existing replacements and QuestVN restores origin audio.
