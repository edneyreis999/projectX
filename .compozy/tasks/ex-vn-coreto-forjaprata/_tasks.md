---
schema_version: "compozy.tasks/v2"
workflow: ex-vn-coreto-forjaprata
graph:
  nodes:
    - id: task_01
      file: task_01.md
    - id: task_02
      file: task_02.md
    - id: task_03
      file: task_03.md
    - id: task_04
      file: task_04.md
  edges:
    - from: task_01
      to: task_02
    - from: task_01
      to: task_03
    - from: task_02
      to: task_04
    - from: task_03
      to: task_04
---

# EX/VN Coreto and Forjaprata Hardening Task List

Four robust vertical slices implement the approved P0/P1/P2 decisions. Task 01
establishes the state and lifecycle foundation. Tasks 02 and 03 then own
disjoint maps and are dependency-independent siblings; the selected
`orchestrate-game-dev-tasks` loop still conducts them one at a time. Task 04
reconciles the complete automated and human-validation contract.

| Task | Type | Complexity | Scope | Assigned tests |
| --- | --- | --- | --- | ---: |
| `task_01` | `bugfix` | critical | Canonical V106, one-shot EX/VN, terminal pages, VN naming | 7 |
| `task_02` | `game-content` | high | Map022 child activities, corridor, spatial optional Gabs | 5 |
| `task_03` | `game-content` | high | Map045 current sling loop, E36/Gabs, BGM and ambience | 5 |
| `task_04` | `qa-execution` | high | Aggregate regression and honest editor/Playtest handoff | 7 |

Execution chains:

```text
task_01 -> task_02 --\
                       -> task_04
task_01 -> task_03 --/
```

Run with the workspace loop after reviewing the package:

```text
compozy loop run --name orchestrate-game-dev-tasks --input slug=ex-vn-coreto-forjaprata
```

The exact installed CLI input syntax remains daemon-version-owned; inspect the
loop descriptor if this invocation differs in the active CompozyOS build.
