---
title: "task-2.1 - Migração EX/VN da Noite da História"
type: loki-task
doc_id: "001-cena-coreto-task-2.1"
version: "1.0.0"
status: pending
phase: fase2
task_id: task-2.1
last_updated: "2026-07-28"
scope: "Migrar a cena Map022 → Map046/VN → Map022 → Map045 sem writes diretos de estágio."
---

# task-2.1 - Migração EX/VN da Noite da História

## Objective

Separar o conteúdo de diálogo/escolha/Name Input no Map046/VN da encenação física e chegada no EX, preservando a chegada ao Map045 em `(2,4)`.

## Requirements

- Classificar Map022 e Map045 como EX e Map046 como VN.
- Substituir entradas/saídas migradas por comandos Coreto, com `AssertVisualNovelSession`, `AssertQuestState`, `QuestTransition`, `FinishVisualNovel` e encerramento explícito.
- Parear BeginCutscene/FinishCutscene em todo caminho físico migrado e não escrever V106 diretamente em evento.
- Usar `Rheed` de modo consistente nos eventos afetados.

## Out Of Scope

- Reescrever arcos posteriores do Map045, alterar diálogos fora desta cena ou compatibilidade de saves antigos.

## Dependencies

- task-1.1

## Scoped Write Plan

```yaml
scoped_write:
  owner: technical-implementer
  mode: task_scoped_writer
  target_files: [frontend/data/Map022.json, frontend/data/Map045.json, frontend/data/Map046.json]
  allowed_writes: [frontend/data/Map022.json, frontend/data/Map045.json, frontend/data/Map046.json]
  required_skills: [rpg-maker-mz-data-json, rpg-maker-mz-plugin-workflow]
  validators: [JSON parse, command-shape scan, route/transfer scan]
  human_gates: [New Game Playtest]
  validation_owner: runtime-qa
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: task-2.1-ac-1
      statement: "The migrated EX/VN route uses Coreto commands and no direct EX↔VN Transfer Player or direct V106 stage write."
      required: true
    - id: task-2.1-ac-2
      statement: "Every VN event begins with session/state assertions, every valid exit finishes the VN, and physical flow resumes to Map045 (2,4)."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/001-cena-coreto-nova-arquitetura/builds/fase2/validate-route.mjs
  evidence_refs: []
  status: pending
```

## Validators

- JSON parser and event command topology validator retained under `builds/fase2/`.

## Human Loop

- Gate: human-validation
- Required decision: New Game Playtest of main/cancel/re-entry/save-load paths.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: pending
  task_ref: planos/001-cena-coreto-nova-arquitetura/task-2.1.md
  plan_state_ref: planos/001-cena-coreto-nova-arquitetura/tasks.md#loki_run_state
  target_decision_refs: [frontend/data/Map022.json, frontend/data/Map045.json, frontend/data/Map046.json]
  files_expected: []
  write_owner: technical-implementer
  target_files: [frontend/data/Map022.json, frontend/data/Map045.json, frontend/data/Map046.json]
  orchestrator_exception_reason: ""
  validation_owner: runtime-qa
  task_validation_ref: planos/001-cena-coreto-nova-arquitetura/task-2.1.md#task_validation
  completion_evidence_refs: []
  validation_cycle_refs: []
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: []
  next_action: "Dispatch after task-1.1 validates."
  blocked_by: [task-1.1]
```
