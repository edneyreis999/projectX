# Map022 Human Playtest Scenarios

Status: `not_executed` / `human_playtest_pending`

Static implementation hash: `frontend/data/Map022.json` `6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb`

These scenarios are a neutral handoff for Task 04. They do not prescribe the expected answer to participants and do not convert timing observations into runtime mechanics.

## PT-M022-01 — Activity recognition

- Setup: New Game, before speaking with Darla.
- Prompt: “Observe the plaza for a moment. What are the children doing?”
- Record: activities named without hints; events/groups cited; uncertainty; overlap or confusion.
- Gate: tag, ring play, and seated conversation are assessed by human perception only.

## PT-M022-02 — Critical route before, during, and after gathering

- Setup: New Game; repeat at pre-gathering, gathering in progress, and post-gathering states.
- Prompt: “Go to Darla, the story seat, Rheed’s exit point, and back to the plaza entrance in any order.”
- Record: blocked tiles, detours, collisions, control loss, route taken, and whether each target remained reachable.
- Gate: no softlock or persistent child blockage in any of the three snapshots.

## PT-M022-03 — Displacement and recovery

- Setup: pre-gathering and post-gathering; intentionally body-block one child from each activity, then step away.
- Prompt: none beyond normal play.
- Record: child/event ID if observable, displacement, recovery time, final activity/destination, oscillation, and any player blockage.
- Gate: every sampled child returns to a valid activity route or gathering destination without a map reload.

## PT-M022-04 — Save/load recovery

- Setup: save with children away from their anchors; repeat during gathering and after gathering.
- Prompt: load the save and continue normal movement.
- Record: selected pages, child positions, recovery, corridor state, repeated Autorun, residual lock, and quest state.
- Gate: load restores a traversable, recoverable state while preserving the Task 01 EX/VN topology.

## PT-M022-05 — Gab optionality and interaction priority

- Setup: wait until automatic chatter is visible or queued, then deliberately activate Darla/E30. Repeat the interaction once.
- Prompt: none.
- Record: which Gab remains visible, whether automatic chatter preempts the interaction, repetition behavior, anchoring to the visible group, readability while children move, and any input block.
- Gate: deliberate interaction wins; automatic chatter remains queued/non-blocking and may be ignored without losing progression.

## PT-M022-06 — VN-seat discovery observation

- Setup: six participants begin from New Game with no prior map explanation.
- Prompt: “Find where the story is about to begin.”
- Record per participant: build/hash, start time observed externally, seat discovery time, route, hints requested, incorrect targets, and comments.
- Gate: the product criterion is at least five of six participants locating the VN seat within 90 seconds. No runtime timer, countdown, telemetry, or pressure is added to the game.

## Required execution record

For every scenario, Task 04 must record operator, build/hash, initial save/state, steps actually performed, observations, verdict (`approved`, `failed`, `blocked`, or `not_executed`), and unresolved findings. Until then, all perceptual and runtime claims remain pending.
