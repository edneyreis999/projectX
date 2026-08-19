# Test Specification: EX/VN Coreto and Forjaprata Hardening

Canonical test contract for the feature. Companion to `_spec.md`.

## Strategy

- Frameworks and harnesses: replayable Node `.mjs` validators with structured
  RPG Maker JSON parsing; targeted Jest only when a reusable runtime helper is
  introduced; RPG Maker MZ editor and human Playtest for perceptual/runtime
  cases.
- Execution: each task owns one validator and evidence JSON under
  `planos/008-compozy-init/builds/`; Task 04 runs the aggregate matrix.
- Conventions: semantic event/page anchors instead of stale array offsets,
  protected-surface fingerprints, fail-closed preconditions, exact test IDs,
  and evidence classification separate from result.

## Coverage Matrix

| Source | Behavior | Unit | Integration | E2E |
| --- | --- | --- | --- | --- |
| US-001, EC-1..EC-5 | Canonical state, one-shot EX/VN, reentry, save/load | UT-001..UT-004 | IT-001..IT-003 | E2E-001, E2E-002, E2E-003 |
| US-002, EC-1..EC-4 | Coreto activities, recovery, corridor, optional chatter | UT-005..UT-007 | IT-004, IT-005 | E2E-004 |
| US-003, EC-1..EC-4 | Forjaprata opening, sling loop, protected future content | UT-008, UT-009 | IT-006, IT-007 | E2E-005 |
| US-004, EC-1..EC-4 | Gab policy, audio existence/ownership, sparse ambience | UT-006, UT-010 | IT-005, IT-007 | E2E-004, E2E-005, E2E-006 |
| US-005, EC-1..EC-4 | Evidence truth, matrix completeness, concurrent edits | UT-004, UT-009 | IT-003 | E2E-001..E2E-007 |
| QuestCore/QuestVN/Cutscene boundary | State and session ownership | UT-001, UT-002 | IT-001, IT-002 | E2E-001..E2E-003 |
| RPG Maker map data boundary | Pages, commands, routes, protected spans | UT-003, UT-005..UT-010 | IT-003..IT-007 | E2E-004, E2E-005 |

## Unit Tests

### State and flow validator (Spec: Canonical quest flow)

- **UT-001** (state): parse `CoretoQuests.json` and `System.json`; require
  `noite-da-historia.stageVariableId=106`, name
  `v_qNoiteDaHistoria_stage`, and exact states/transitions
  `0/10/20/90`, `START`, `COMPLETE_VN`, `ARRIVE_MAP045`.
- **UT-002** (error): scan structured map/Common Event command lists and page
  conditions; any V106 use of `91`, `92`, `100`, or `110`, or any direct V106
  event writer, fails with `v106_noncanonical_state`.
- **UT-003** (ordering): resolve Map022 E18, Map045 E11, Map045 E36, Map046 E1,
  and Map049 E1 by semantic anchors; require stable terminal page precedence
  and paired `Begin/Finish` and `Enter/Finish` lifecycles.
- **UT-004** (boundary): require exact Map046/049 `VN_` names, no other
  MapInfos rename, valid JSON, restricted diffs, evidence schema, and
  `runtime_pending` classification.

### Map022 experience validator (Spec: Coreto exploration)

- **UT-005** (state): classify every in-scope child into exactly one of tag,
  ring play, seated conversation, gathering, or intentionally unchanged;
  require route ownership and a recovery/terminal behavior for every changed
  child page.
- **UT-006** (error): parse all in-scope Gab `357/657` pairs; automatic chatter
  with force, anti-repeat bypass, or `WaitForGab` fails with
  `gab_payload_mismatch`; deliberate interaction rules remain allowed.
- **UT-007** (boundary): validate every changed coordinate and movement route
  against Map022 bounds, unique terminal destinations, and protected critical
  tiles/corridor fixtures.

### Map045 experience validator (Spec: Forjaprata exploration)

- **UT-008** (state): parse the current sling quest pages; require one sling
  grant, one `FOUND_SLING` transition, clear pre-equip/equipped exit branches,
  and no duplicate reward path.
- **UT-009** (error): compare semantic fingerprints for Map045 E8,
  trophy-owned pages, Map049 E2, and other declared protected future content;
  any divergence fails with `future_quest_scope_violation`.
- **UT-010** (boundary): resolve every BGM/BGS/SE reference changed by the task
  to an exact-case local file; require the recorded Audio Design decision,
  prohibit `Dungeon5` when absent, and detect redundant signal stacking in the
  named current-quest beats.

## Integration Tests

### Canonical EX/VN flows

- **IT-001**: Map022 E18 at V106=10 → Map046 E1 asserts the session/state →
  `COMPLETE_VN` commits 20 → `FinishVisualNovel` returns; another E18 contact
  has no eligible VN entry.
- **IT-002**: Map022 E17 at V106=20 → one cutscene lifecycle →
  `ARRIVE_MAP045` commits 90 → one transfer to Map045 `(2,4)`; the arrival
  opening reaches one stable return page without V106 staging.
- **IT-003**: save/load fixtures at pre-entry, active VN, returning, and
  post-return states reconstruct one valid session/page or fail
  deterministically without residual lock/token.

### Coreto map behavior

- **IT-004**: a static passability graph with representative event occupancy
  reaches Darla, E18, E17, and the VN seat before and after the gathering; every
  changed child route has a recoverable fallback.
- **IT-005**: automatic chatter plus a deliberate interaction preserves queue
  priority, spatial event anchoring, and optionality without blocking quest
  transitions.

### Forjaprata map behavior

- **IT-006**: opening VN return → current quest journal introduction → sling
  acquisition → equip requirement → exit to Map044 forms one reachable chain
  with idempotent grant/transition behavior.
- **IT-007**: Map045/049 audio commands plus QuestVN `restore-origin` ownership
  form one restoration path; environmental cues use distinct semantics and
  essential direction remains available with audio absent.

## End-to-End Tests

### Complete player and operator journeys

- **E2E-001**: New Game reaches Map022, starts the quest, enters Map046 once,
  returns to Map022, reaches Map045, enters Map049 once, and regains control
  with no residual Coreto flow/session.
- **E2E-002**: save/load immediately before EX entry, inside VN, during return,
  and after return preserves canonical progress and does not replay an Autorun.
- **E2E-003**: repeated contact with every entry/return event after success
  produces no duplicate VN, transition, reward, error, or control lock.
- **E2E-004**: the Coreto human-gate contract enumerates activity recognition,
  critical-route passability, seat discovery, Gab priority, optional chatter,
  neutral instructions, version/hash, and timing observation without a runtime
  timer; supplied human results validate against that schema, otherwise the
  gate remains explicitly `not_executed`.
- **E2E-005**: the Forjaprata human-gate contract enumerates opening recovery,
  next-action comprehension, sling discovery/acquisition/equip/exit, protected
  future content, and repeated reward; supplied results validate against that
  schema, otherwise the gate remains explicitly `not_executed`.
- **E2E-006**: the audio human-gate contract enumerates EX→VN→EX load,
  restoration, restart/residue/silence, sparse ambience, signal hierarchy, and
  muted-audio redundancy; supplied results validate against that schema,
  otherwise the gate remains explicitly `not_executed`.
- **E2E-007**: the editor/final-hash contract replays all automated evidence and
  records editor open/save/reopen as approved, failed, blocked, or
  `not_executed`; the case passes only when the classification is truthful and
  no missing human evidence is represented as approval.
