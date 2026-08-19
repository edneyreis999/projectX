# Developer Experience: Rheed Forge-Silver House Cutscene Rework

Public authoring and verification contract for the Map045 data change.

## Golden Path

```text
$ node planos/009-rework-cutscene-rheed/builds/apply-rework-cutscene-rheed.mjs --check
{"status":"ready","map":"frontend/data/Map045.json","event_id":36,"changes":1}

$ node planos/009-rework-cutscene-rheed/builds/apply-rework-cutscene-rheed.mjs
{"status":"applied","map":"frontend/data/Map045.json","event_id":36,"changes":1}

$ node planos/009-rework-cutscene-rheed/builds/validate-rework-cutscene-rheed.mjs
{"status":"pass","checks":12,"failures":0,"runtime":"pending_playtest"}
```

All commands run from the repository root. The writer accepts no alternate map path and never edits plugin source or other database files.

## Errors

| Condition | Exit | Structured result |
|---|---:|---|
| E36 semantic anchor differs | 1 | `{"status":"blocked","code":"precondition_mismatch","anchor":"map045.event36"}` |
| E33 or E26 is missing | 1 | `{"status":"blocked","code":"event_missing","event_id":33}` |
| Cleanup fingerprint differs | 1 | `{"status":"blocked","code":"cleanup_mismatch","event_id":36}` |
| Validation finds unauthorized drift | 1 | `{"status":"fail","code":"restricted_diff_violation","failures":1}` |

The validator reports static evidence only. It must never return a Playtest-pass claim.

