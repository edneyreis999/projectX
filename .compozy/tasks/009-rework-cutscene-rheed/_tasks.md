---
schema_version: "compozy.tasks/v2"
workflow: 009-rework-cutscene-rheed
graph:
  nodes:
    - id: task_01
      file: task_01.md
  edges: []
---

# Rheed Forge-Silver House Cutscene Rework Task List

## Task 1: Materialize and validate the Map045 cutscene rework

- Type: `frontend`
- Complexity: `high`
- Scope: one vertical slice covering the replayable writer, E36 data transformation, validator, fixtures, and static evidence.
- Tests: 4 unit, 3 integration, 1 end-to-end.

