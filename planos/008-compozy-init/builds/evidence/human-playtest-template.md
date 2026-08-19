---
schema_version: 1
record_version: ex-vn-coreto-forjaprata-task04-v1
overall_status: not_executed
evidence_class: human_observation
limitation: "The spawned QA shell session has no connected RPG Maker MZ editor/desktop client and no human participants; editor round-trip, runtime behavior, timing, perception, and audiovisual judgment were not executed."
---

# Human Playtest and editor round-trip record

This is the bounded execution record for E2E-004 through E2E-007. Record what
happened before answering any evaluative question. Do not infer approval from
the automated evidence, coach participants toward a target, or add runtime
timers/telemetry for the 90-second and three-minute observations.

## Build identity

- `frontend/data/Map022.json`: `6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb`
- `frontend/data/Map045.json`: `18ebfc2f86a603fe363568a077be9cf8d5044290f45ed757fda19b7707177e85`
- `frontend/data/Map046.json`: `b5afb84e5ee8735d1eb3767e5f5cde8064c7e26a0e849160fd0b39cbd80ef35f`
- `frontend/data/Map049.json`: `33f44fa75740c87b91339c679e3fa5b02bbb44cce2a125f785ad28ae4c0ac238`
- `frontend/data/CoretoQuests.json`: `d19bc2c83e0c61d4d12dfd94d242628d1d62bf9d38ed56c3709f03b47e2de678`
- `frontend/data/MapInfos.json`: `5d69b1eb32b00b55f1f5f4587578d04460690a748f57acd7bcbf5c1f438d68d1`
- Operator/build label: `not_executed`
- RPG Maker MZ/editor version: `not_executed`
- Platform/input/audio configuration: `not_executed`

## Observation protocol

For each scenario, preserve the initial save/state, exact actions actually
performed, chronological observations, externally observed elapsed time when
requested, participant wording, evidence references, and interruptions. Only
then record a verdict: `approved`, `failed`, `blocked`, or `not_executed`.

## E2E-004 — Coreto journey

### PT-M022-01 — Activity recognition

- Initial state: New Game, before Darla.
- Neutral action: allow free observation, then ask “What are the children doing?”
- Observations: `not_executed`
- Timing/participant wording/evidence: `not_executed`
- Evaluative question: Were tag, ring play, and seated conversation distinguishable without hints?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: activity recognition and visual grouping remain pending.

### PT-M022-02 — Critical route before, during, and after gathering

- Initial states: before, during, and after gathering.
- Neutral action: visit Darla, E18/VN seat, E17, and the entrance in any order.
- Observations: `not_executed`
- Route/collision/control-loss evidence: `not_executed`
- Evaluative question: Did every destination remain reachable without a persistent blockage or softlock?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: runtime passability and gathering pacing remain pending.

### PT-M022-03 — Displacement and recovery

- Initial states: before and after gathering; include one body-blocked child per activity.
- Neutral action: body-block each sampled child, then step away and continue normal movement.
- Observations: `not_executed`
- Displacement/recovery/oscillation/player-blockage evidence: `not_executed`
- Evaluative question: Did every sampled child recover its activity route or gathering destination without reload?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: runtime collision recovery remains pending.

### PT-M022-04 — Save/load recovery

- Initial states: children displaced; gathering active; post-gathering.
- Neutral action: save/load each state and continue normal movement.
- Observations: `not_executed`
- Page/position/corridor/reentry/control-lock evidence: `not_executed`
- Evaluative question: Did load restore a traversable, recoverable state without Autorun replay or residual lock?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: runtime save reconstruction and page refresh remain pending.

### PT-M022-05 — Gab optionality and interaction priority

- Initial state: automatic Gab visible or queued.
- Neutral action: activate Darla/E30 twice while chatter is eligible, then continue while ignoring automatic chatter.
- Observations: `not_executed`
- Visible/queued Gab, anchoring, repetition, readability, and input-block evidence: `not_executed`
- Evaluative question: Did deliberate interaction win while automatic chatter remained non-blocking and optional?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: Gab anchoring, readability, repetition, queue priority, and input blocking remain pending.

### PT-M022-06 — VN-seat discovery cohort

- Initial state: six independent New Game participants without prior map explanation.
- Neutral action: say “Find where the story is about to begin.”
- Observations per participant (route, wrong targets, hints, comments): `not_executed`
- Externally observed elapsed times: `not_executed`
- Evaluative question: Did at least five of six participants locate the seat within 90 seconds?
- Verdict: `not_executed`
- Limitation: no human participants; no runtime timer or telemetry was added.
- Unresolved findings: five-of-six/90-second product target remains pending.

## E2E-005 — Forjaprata journey

### FJ-01 — Opening recovery and next action

- Initial states: supported New Game route; saves before VN, inside VN, during return, after return/E36.
- Neutral action: continue normally after each load and ask what the participant intends to do next.
- Observations: `not_executed`
- VN count/control/Autorun/participant wording: `not_executed`
- Evaluative question: Did the opening return once, recover control, avoid replay, and communicate the next action?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: runtime session cleanup and next-action comprehension remain pending.

### FJ-02 — Journal, sling discovery, and acquisition

- Initial states: V111=0 and V111=10 without Funda; save/load before and after acquisition.
- Neutral action: explore and attempt departure; repeat exit/chest interactions after acquisition.
- Observations: `not_executed`
- Inventory/journal/reward evidence: `not_executed`
- Externally observed discovery times for six participants: `not_executed`
- Evaluative question: Was the journal/discovery/acquisition chain understandable and did at least five of six acquire the Funda within three minutes?
- Verdict: `not_executed`
- Limitation: no human participants; no runtime timer or telemetry was added.
- Unresolved findings: discovery comprehension, runtime reward idempotency, and five-of-six/three-minute target remain pending.

### FJ-03 — Equip gate and departure

- Initial states: V111=10 without Funda; V111=20 owned but unequipped; V111=20 equipped by Thorin; save/load at each state.
- Neutral action: attempt departure and follow the available direction; repeat successful and blocked exit interactions.
- Observations: `not_executed`
- Equipment condition/Gab/transfer/repetition evidence: `not_executed`
- Evaluative question: Did each state communicate the correct next action and did the equipped state transfer exactly once?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: equip comprehension, exit idempotency, and runtime transfer remain pending.

### FJ-04 — Protected future content

- Initial states: activate existing conditions for Map045 E8, trophy pages, and Map049 E2 independently.
- Neutral action: exercise each existing future-content route without using it as tutorial direction.
- Observations: `not_executed`
- Prior-versus-current behavior evidence: `not_executed`
- Evaluative question: Was prior behavior retained and kept non-mandatory for the sling loop?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: runtime equivalence of protected future content remains pending.

## E2E-006 — Audio and accessibility

### AU-01 — EX→VN→EX audio restoration

- Initial states: live audio; saves before entry, inside VN, during return, and after cleanup.
- Neutral action: traverse the complete EX→VN→EX route and listen without changing audio settings mid-scenario.
- Observations: `not_executed`
- BGM/BGS identity, silence, restart, residue, and transition evidence: `not_executed`
- Evaluative question: Did `Theme5` fit the beat and did QuestVN restoration avoid silence, restart, and residue?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: transition quality, restoration behavior, and mix remain pending.

### AU-02 — Signal hierarchy and muted redundancy

- Initial states: journal introduction, chest acquisition, equip gate, and departure; repeat with BGM and SE muted.
- Neutral action: complete each beat with normal inputs and describe the next required action.
- Observations: `not_executed`
- Cue overlap/masking/muted-direction evidence: `not_executed`
- Evaluative question: Were signals non-redundant and all essential directions available without audio?
- Verdict: `not_executed`
- Limitation: inherited session limitation above.
- Unresolved findings: audiovisual hierarchy and muted accessibility remain pending; child ambience remains an explicitly bounded follow-up.

## E2E-007 — RPG Maker MZ editor round-trip

Editor round-trip is a separate gate from runtime Playtest.

- [ ] Open `Map022`, `Map045`, `Map046`, `Map049`, `CoretoQuests`, and `MapInfos` through the RPG Maker MZ editor/database surfaces.
- [ ] Save without intentional content changes.
- [ ] Close and reopen the project; verify the maps/events/pages/plugin commands parse and remain selectable.
- [ ] Recompute the six build hashes and compare them with Build identity.
- [ ] Replay all four validators and attach their outputs.
- Observations before evaluation: `not_executed`
- Round-trip/hash/validator evidence: `not_executed`
- Evaluative question: Did open/save/reopen preserve the authored data and final hashes?
- Verdict: `not_executed`
- Limitation: the spawned QA shell session has no connected RPG Maker MZ editor/desktop client.
- Unresolved findings: editor serialization/round-trip compatibility remains pending.

## Human decision summary

- Coreto activity recognition, runtime traversal/recovery, Gab perception, and five-of-six/90-second target: `not_executed`.
- Forjaprata comprehension, runtime one-shot behavior, and five-of-six/three-minute target: `not_executed`.
- Audio restoration, mix, signal hierarchy, and muted-audio accessibility: `not_executed`.
- RPG Maker MZ editor open/save/reopen: `not_executed`.
- Perceptual approval: not granted.
