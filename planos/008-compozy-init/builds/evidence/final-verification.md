---
schema_version: 1
workflow: ex-vn-coreto-forjaprata
task: task_04
automated_result: passed
classification: human_playtest_pending
editor_round_trip: not_executed
human_playtest: not_executed
verified_on: 2026-08-19
---

# Task 04 final verification

## Verdict

All Task 01–04 assigned automated checks pass on the current production hashes.
E2E-001 through E2E-003 are structural/fixture evidence. E2E-004 through
E2E-007 pass as truthful handoff-contract checks only; RPG Maker MZ editor
round-trip, runtime Playtest, timing, perception, and audiovisual approval were
not executed and remain `human_playtest_pending`.

No critical functional finding was detected in the EX/VN feature's automated
surface. The repository-wide Jest suite has unrelated failures against enemy,
troop, and progression data; these are recorded below and are not represented
as passing or as evidence for this feature.

## Current production hashes

| Target | SHA-256 |
| --- | --- |
| `frontend/data/Map022.json` | `6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb` |
| `frontend/data/Map045.json` | `18ebfc2f86a603fe363568a077be9cf8d5044290f45ed757fda19b7707177e85` |
| `frontend/data/Map046.json` | `b5afb84e5ee8735d1eb3767e5f5cde8064c7e26a0e849160fd0b39cbd80ef35f` |
| `frontend/data/Map049.json` | `33f44fa75740c87b91339c679e3fa5b02bbb44cce2a125f785ad28ae4c0ac238` |
| `frontend/data/CoretoQuests.json` | `d19bc2c83e0c61d4d12dfd94d242628d1d62bf9d38ed56c3709f03b47e2de678` |
| `frontend/data/MapInfos.json` | `5d69b1eb32b00b55f1f5f4587578d04460690a748f57acd7bcbf5c1f438d68d1` |

## Verification commands

| Command | Result | Evidence class |
| --- | --- | --- |
| `node planos/008-compozy-init/builds/validate-flow-state.mjs --output planos/008-compozy-init/builds/evidence/flow-state.json` | PASS — UT-001..UT-004, IT-001..IT-003 | automated structural |
| `node planos/008-compozy-init/builds/validate-map022-experience.mjs --output planos/008-compozy-init/builds/evidence/map022-experience.json` | PASS — UT-005..UT-007, IT-004..IT-005 | automated structural |
| `node planos/008-compozy-init/builds/validate-map045-experience.mjs --output planos/008-compozy-init/builds/evidence/map045-experience.json` | PASS — UT-008..UT-010, IT-006..IT-007 | automated structural |
| `node planos/008-compozy-init/builds/validate-ex-vn-regression.mjs --output planos/008-compozy-init/builds/evidence/ex-vn-regression.json` | PASS — E2E-001..E2E-007, `human_playtest_pending` | aggregate structural + handoff contract |
| `node --check frontend/js/plugins/Coreto_QuestCore.js` | PASS | syntax |
| `node --check frontend/js/plugins/Coreto_QuestVN.js` | PASS | syntax |
| `node --check frontend/js/plugins/Coreto_Cutscene.js` | PASS | syntax |
| `node --check planos/008-compozy-init/builds/validate-ex-vn-regression.mjs` | PASS | syntax |
| JSON parse of Map022/045/046/049, CoretoQuests, and MapInfos | PASS | structured data |
| `git diff --check` | PASS | mechanical diff |
| `npm test -- --runInBand` | FAIL — 10 suites/142 tests failed; 9 suites/508 tests passed | unrelated repository baseline, not feature evidence |

The aggregate validator itself replays the three lower validators, reloads
their freshly written evidence, and rejects every missing or stale recorded
target hash before it can report success.

## E2E finding matrix

| Test | Owner | Result | Evidence class | Finding |
| --- | --- | --- | --- | --- |
| E2E-001 | Task 04 | passed | automated structural | Complete New Game-equivalent Map022→Map046→Map022→Map045→Map049→Map045→sling→Map044 chain has one structural owner per transition/return. |
| E2E-002 | Task 04 | passed | automated state fixture | Pre-entry, active VN, returning, post-return, and post-acquisition fixtures converge; real save serialization is pending. |
| E2E-003 | Task 04 | passed | automated structural | Transition/reward cardinality and terminal pages are one-shot structurally; runtime repetition is pending. |
| E2E-004 | Task 04 | passed | human-gate contract | Neutral Coreto observation contract is complete; execution is `not_executed`. |
| E2E-005 | Task 04 | passed | human-gate contract | Neutral Forjaprata observation contract is complete; execution is `not_executed`. |
| E2E-006 | Task 04 | passed | human-gate contract | Audio/accessibility contract is complete; execution is `not_executed`. |
| E2E-007 | Task 04 | passed | editor/evidence contract | All 24 UT/IT/E2E IDs map exactly once and hashes are current; editor round-trip is `not_executed`. |

The authoritative per-ID target hashes, owning task, result, evidence class,
finding, replay output, and 24-entry traceability map are in
`ex-vn-regression.json`.

## Editor and human gates

| Gate | Status | Concrete limitation | Pending decision |
| --- | --- | --- | --- |
| RPG Maker MZ open/save/reopen | `not_executed` | Spawned QA shell had no connected editor/desktop client. | Does editor round-trip preserve the six production targets and hashes? |
| Coreto Playtest | `not_executed` | No game runtime or human participants. | Are activities readable, routes/recovery safe, Gabs usable, and five of six seat discoveries within 90 seconds? |
| Forjaprata Playtest | `not_executed` | No game runtime or human participants. | Is the next action understood, is the sling flow runtime-idempotent, and do five of six acquire it within three minutes? |
| Audio/accessibility | `not_executed` | No runtime listening/perceptual surface. | Does Theme5 restore cleanly, avoid restart/silence/residue, and preserve direction with BGM/SE muted? |

The versioned neutral record is `human-playtest-template.md`. It records
observations before evaluation and keeps both discovery targets external to the
game; no runtime timer, countdown, or telemetry was added.

## Repository-wide Jest finding

`npm test -- --runInBand` failed in these ten suites:

- `frontend/__tests__/data/Enemies.validation.test.js`
- `frontend/__tests__/data/Troops.validation.test.js`
- `frontend/__tests__/data/enemies-structure.test.js`
- `frontend/__tests__/data/Enemies.region5.test.js`
- `frontend/__tests__/data/enemies-cross-reference.test.js`
- `frontend/__tests__/data/enemies-region2.test.js`
- `frontend/__tests__/data/region3-esgoto-gildrat.test.js`
- `frontend/__tests__/data/region4-enemies.test.js`
- `frontend/__tests__/data/EnemiesRegion1.test.js`
- `frontend/__tests__/progressao/simulacao-20-batalhas-lobo.test.js`

Observed failures concern current enemy IDs/stats/actions/formatting, troop
cross-references, and progression expectations. Task 04 and Tasks 01–03 do not
modify those targets, so this is classified as an out-of-scope worktree/test
baseline failure, not an EX/VN regression. It remains visible and unresolved;
no production or test data was changed to mask it.

## Validator reconciliation

The initial final-hash replay exposed two validator defects, both corrected
without changing production:

- Task 01 now accepts only the reconciled final Task 01–03 hashes and
  normalizes the authorized Task 03 `Dungeon5`→`Theme5` audio replacement when
  comparing protected future-content semantics.
- Task 02 now verifies the final authorized Map045 hash from Task 03 rather
  than the obsolete intermediate Task 01 hash.

All three validators were replayed after those corrections and passed.

## Residual risks

- Editor serialization/open-save-reopen compatibility remains unverified.
- Real save/load reconstruction, control recovery, collisions, passability,
  and repeated Autorun behavior remain structurally covered but not observed.
- Coreto activity recognition, Gab perception, and the five-of-six/90-second
  target await human evidence.
- Forjaprata comprehension and the five-of-six/three-minute target await human
  evidence.
- Theme5 transition quality, BGM/BGS restoration, signal hierarchy, and muted
  accessibility await human judgment.
- Sparse child ambience remains a bounded follow-up because no approved
  cooldown/concurrency owner was introduced.
- The unrelated repository-wide Jest baseline remains red and requires a
  separately owned reconciliation of enemy/troop/progression tests and data.
