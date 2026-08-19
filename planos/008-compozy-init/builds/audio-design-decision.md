---
schema_version: 1
decision_pass: bounded-audio-design-handoff
status: approved_for_static_implementation
map_id: 45
invalid_reference: Dungeon5
selected_reference: Theme5
selected_asset: frontend/audio/bgm/Theme5.ogg
exact_case_verified: true
runtime_playtest_status: pending
---

# Audio Design decision — Forjaprata

## Selection

Replace the absent `Dungeon5` BGM reference in Map045 E12 P6 with the
existing exact-case reference `Theme5` (`frontend/audio/bgm/Theme5.ogg`).
`Theme5` is already the map-level musical identity of the Forjaprata house, so
the short wake-up/departure beat stays in the same domestic context rather than
introducing a second motif. The existing command keeps its authored volume,
pitch, pan, start, and stop ownership. Static existence does not approve the
transition or mix; those remain human Playtest gates.

## Signal hierarchy

| Beat | Primary signal | Supporting signal | Boundary |
| --- | --- | --- | --- |
| Opening VN return | `Coreto_QuestVN` restores the captured BGM/BGS | E36's one optional spatial Gab establishes place | Map events do not replay a generic return BGM |
| Journal introduction | Exit interaction Gab gives the next action | QuestCore/PKD exposes the durable journal objective; `Miss` denotes the blocked physical exit | Audio is not required for direction |
| Sling acquisition | Inventory message and `Item3` identify the acquired Funda | `Chest1` denotes the physical chest opening; QuestCore advances `FOUND_SLING` | No extra fanfare, Gab, or parallel reward path |
| Equip requirement | Repeatable exit Gab explicitly says to equip the Funda | Equipment state gates the transfer | No audio-only requirement |
| Departure | Successful Map044 transfer is the terminal action | No additional cue is introduced | No competing restoration ownership |

## Sparse ambience decision

No child ambience is added in this task. The active map/event capabilities do
not provide one existing owner that combines spatial emitters, cooldown, and a
concurrency cap. Gab anti-repeat is not an audio concurrency contract. Adding a
helper plugin, runtime scheduler, global ID, or ad-hoc parallel ownership would
violate the approved task boundary.

Bounded follow-up: if an existing project-wide ambience owner is later approved,
Audio Design may assign sparse child cues to it after defining emitter IDs,
cooldown, maximum simultaneous voices, interruption priority, and muted-audio
redundancy. Until then, the current quest remains fully understandable without
child audio.

## Runtime gates

- Verify `Theme5` does not restart abruptly at the E12 P6 beat.
- Verify EX→VN→EX restores the captured BGM/BGS without silence or residue.
- Verify `Chest1` and `Item3` read as physical opening and item acquisition,
  rather than redundant fanfares.
- Repeat all direction checks with BGM/SE muted.

