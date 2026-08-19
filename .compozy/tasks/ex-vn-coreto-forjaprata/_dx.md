# Developer Experience: EX/VN Coreto and Forjaprata Hardening

Public-surface contract for implementing and reviewing this game-data feature.
Companion to `_spec.md` and `_tests.md`.

## Golden Path

From the repository root, an implementer runs the four retained validators in
task order:

```text
$ node planos/008-compozy-init/builds/validate-flow-state.mjs --output planos/008-compozy-init/builds/evidence/flow-state.json
PASS validate-flow-state (UT-001..UT-004, IT-001..IT-003) runtime_pending

$ node planos/008-compozy-init/builds/validate-map022-experience.mjs --output planos/008-compozy-init/builds/evidence/map022-experience.json
PASS validate-map022-experience (UT-005..UT-007, IT-004..IT-005) runtime_pending

$ node planos/008-compozy-init/builds/validate-map045-experience.mjs --output planos/008-compozy-init/builds/evidence/map045-experience.json
PASS validate-map045-experience (UT-008..UT-010, IT-006..IT-007) runtime_pending

$ node planos/008-compozy-init/builds/validate-ex-vn-regression.mjs --output planos/008-compozy-init/builds/evidence/ex-vn-regression.json
PASS validate-ex-vn-regression (E2E-001..E2E-007) human_playtest_pending
```

Each command exits `0` only when its assigned automated checks pass. Each output
file is valid JSON and includes:

```json
{
  "schema_version": 1,
  "validator": "validate-flow-state",
  "result": "passed",
  "classification": "runtime_pending",
  "test_ids": ["UT-001", "IT-001"],
  "targets": ["frontend/data/Map022.json"],
  "checks": []
}
```

## Validation Commands

The validators accept only `--output <repo-relative-json-path>`. Missing or
divergent inputs fail closed:

```text
$ node planos/008-compozy-init/builds/validate-flow-state.mjs
ERROR validation_output_required: pass --output under planos/008-compozy-init/builds/
$ echo $?
1
```

```text
$ node planos/008-compozy-init/builds/validate-flow-state.mjs --output /tmp/result.json
ERROR validation_output_outside_active_plan: output must remain under planos/008-compozy-init/builds/
$ echo $?
1
```

The complete repository handoff also runs:

```text
$ node --check frontend/js/plugins/Coreto_QuestCore.js
$ node --check frontend/js/plugins/Coreto_QuestVN.js
$ node --check frontend/js/plugins/Coreto_Cutscene.js
$ npm test -- --runInBand
$ git diff --check
```

No validator edits production files. Structured writers created by an
implementation task remain separate, replayable scripts under the same active
plan `builds/` directory and must fail on stale preconditions.

## Human Gate Record

Task 04 creates
`planos/008-compozy-init/builds/evidence/human-playtest-template.md` with exact
scenario IDs, build/hash, initial state, steps, observations, verdict, and
limitations. Until a human fills and approves it, the aggregate classification
is `human_playtest_pending`; the task may complete as a verified implementation
handoff but may not claim perceptual approval.

## Errors

| Condition | Code | Required action |
| --- | --- | --- |
| JSON parse fails | `json_parse_failed` | stop before mutation and inspect the named file |
| V106 has presentation state | `v106_noncanonical_state` | repair ownership before map polish |
| protected E8/trophy fingerprint changes | `future_quest_scope_violation` | restore only the task-owned semantic span |
| Gab `357/657` pair diverges | `gab_payload_mismatch` | repair serialized command and editor continuation together |
| referenced audio is missing/case-mismatched | `audio_reference_missing` | use the recorded Audio Design decision |
| human runtime evidence is absent | `human_playtest_pending` | run the named editor/Playtest scenarios; do not relabel static evidence |
