---
schema_version: 1
scope: map045-forjaprata-audio
automated_result: passed
human_playtest_status: not_executed
---

# Neutral Forjaprata and audio Playtest scenarios

Record the build/hash, initial save state, exact observations, verdict, and any
unresolved finding for every scenario. Do not convert the targets below into
runtime timers or telemetry.

## FJ-01 — Opening recovery and next action

- Setup: New Game path entering Map045 through the supported EX→VN route.
- Observe: one VN entry/return, control recovery, absence of Autorun replay,
  and whether the player can state the next action without prompting.
- Repeat: save before entry, inside VN, immediately after return, and after E36.

## FJ-02 — Journal, discovery, and acquisition

- Setup: `tutorial-funda-forjaprata` at state `0`, no Funda in inventory.
- Observe: first exit interaction introduces the journal once; the player finds
  and acquires the Funda; repeat chest interaction grants no second weapon,
  transition, inventory message, or sound stack.
- Human target: at least five of six participants acquire it within three
  minutes; record elapsed time externally.

## FJ-03 — Equip gate and departure

- Setup A: state `10`, no Funda. Setup B: state `20`, Funda owned but unequipped.
  Setup C: state `20`, Funda equipped by Thorin.
- Observe: A names finding the Funda, B names equipping it, C transfers once to
  Map044. Repeat interactions and save/load at every setup.

## FJ-04 — Protected future content

- Setup: activate the existing conditions for Map045 E8, trophy pages, and
  Map049 E2 independently from the current tutorial.
- Observe: their prior behavior is retained and none becomes a prerequisite of
  the current sling loop.

## AU-01 — Music selection and restoration

- Observe `Theme5` at E12 P6 for fit, abrupt restart, silence, and residue.
- Traverse EX→VN→EX and verify only `Coreto_QuestVN` restores captured BGM/BGS.
- Repeat with save/load before entry, in VN, during return, and after cleanup.

## AU-02 — Signal hierarchy and muted accessibility

- Observe journal introduction, chest opening, item acquisition, equip gate,
  and departure for redundant cues or masking.
- Repeat with BGM and SE muted; every required direction must remain available
  in text/journal/equipment state.
- Confirm no child ambience burst exists; the bounded ambience follow-up remains
  unimplemented until a cooldown/concurrency owner is approved.
