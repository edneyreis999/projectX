# Test Specification: Rheed Forge-Silver House Cutscene Rework

Canonical static and integration test contract for the Map045 event-data change.

## Strategy

- Frameworks and harnesses: Node.js scripts using structured JSON parsing, semantic event anchors, temporary fixtures, and byte-level restricted-diff checks.
- Execution: run the writer against fixtures and the production map, parse the resulting JSON, then run the dedicated validator.
- Conventions: fail closed before writes; emit one JSON result; never claim editor or Playtest approval.

## Coverage Matrix

| Source | Behavior | Unit | Integration | E2E |
|---|---|---|---|---|
| US-001 | Body-led wonder and single effect | UT-001, UT-002 | IT-001 | E2E-001 |
| US-001.EC-1–3 | Accessible, ordered, non-duplicated presentation | UT-002 | IT-001 | E2E-001 |
| US-002 | Waited movement, Gab barrier, and cleanup | UT-003 | IT-001 | E2E-001 |
| US-002.EC-1–3 | Longer Gab, refresh safety, route drift | UT-003, UT-004 | IT-003 | — |
| US-003 | Replayable restricted writer | UT-004 | IT-002, IT-003 | E2E-001 |
| US-003.EC-1–3 | Dirty worktree and mismatched anchors | UT-004 | IT-002, IT-003 | — |

## Unit Tests

### Map045 semantic transformation

- **UT-001** (happy): the planned E36 page-A command model contains exactly one Animation 35 call, one Rheed `GabTextOnly`, E33/E26 microactions, a waited short Rheed route, and one final `WaitForGab` command.
- **UT-002** (boundary): the planned page-B model contains no Animation 35 call or leading 60-frame wait and retains the six-step opacity fade.
- **UT-003** (state): the transformed E36 preserves Self Switch B/C and the exact cleanup targets for children 21–35 and 37–39, E11, and E12.
- **UT-004** (error): a changed Gab anchor, missing child event, altered cleanup fingerprint, or unauthorized event mutation produces a structured failure before write.

## Integration Tests

### Writer and validator

- **IT-001**: apply the writer to a pristine Map045 fixture; the validator returns `status=pass`, `failures=0`, and `runtime=pending_playtest`.
- **IT-002**: apply the writer twice to the same fixture; the second run reports a no-op and the file hash remains unchanged.
- **IT-003**: apply the writer to fixtures with one mismatched anchor at a time; each exits nonzero and preserves the original fixture hash.

## End-to-End Tests

### Production data journey

- **E2E-001**: run the exact `_dx.md` check/apply/validate sequence from the repository root; `Map045.json` parses, the restricted diff contains only approved E36 command changes, and the validator reports `pending_playtest` rather than runtime approval.

