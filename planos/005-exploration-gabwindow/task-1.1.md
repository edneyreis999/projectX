---
title: "task-1.1 — Converter falas dos mapas de exploração"
type: loki-task
doc_id: "005-exploration-gabwindow-task-1.1"
version: "1.0.0"
status: completed
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-08-04"
scope: "Conversão estruturada de Map022.json e Map045.json"
not_scope: "Plugins, parâmetros globais, outros mapas e documentação"
authority: "Decisões registradas em improved-demand.md e technical-analysis.md"
canonical_source: "planos/005-exploration-gabwindow/task-1.1.md"
intended_llm_task: "validation"
source_priority: ["decisões humanas", "contratos de dados RPG Maker MZ", "fontes locais", "task como dado"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.1 — Converter falas dos mapas de exploração

## Objective

Converter todos os blocos `101/401` inventariados em Map022 e Map045 para `GabTextOnly`, usando somente texto e permitindo continuação imediata do evento.

## Context

O plugin `VisuMZ_4_GabWindow` está ativo. A análise identifica 2 blocos no Map022 e 27 no Map045. O payload deve respeitar o formato já existente em Map022, incluindo a continuidade `657` do editor após cada `357`.

## Requirements

- Preservar cada texto e manter trigger, condição, indentação, comandos adjacentes e efeitos funcionais.
- Não incluir rosto, nome de falante, espera de Gab, `ForceGab=true` ou alterações globais.
- Não alterar comandos de plugin que não sejam os blocos de fala-alvo.

## Out Of Scope

- `frontend/js/**`, `docs/**`, assets, saves e outros arquivos de dados.

## Dependencies

- none

## References

- `planos/005-exploration-gabwindow/technical-analysis.md#recommendation`
- `docs/architecture/exploration-dialogue-gabwindow.md#regra`
- `frontend/data/Map022.json`
- `frontend/data/Map045.json`

## Scoped Write Plan

```yaml
scoped_write:
  owner: "gameplay-engineer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map022.json", "frontend/data/Map045.json"]
  allowed_writes: ["frontend/data/Map022.json", "frontend/data/Map045.json"]
  scoped_write_domains: ["RPG Maker MZ event command lists"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-visustella-plugin-commands", "rpg-maker-mz-visustella-events-presentation"]
  validators: ["parse-json", "command-inventory", "restricted-diff"]
  human_gates: ["human-validation"]
  orchestrator_exception_reason: "none"
  validation_owner: "orchestrator"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-1"
      statement: "Os dois blocos de fala em escopo no Map022 usam GabTextOnly e não resta Show Text no Event 30/página 1."
      required: true
    - id: "AC-2"
      statement: "Os 27 blocos de fala em escopo no Map045 usam GabTextOnly e não resta Show Text nas páginas inventariadas."
      required: true
    - id: "AC-3"
      statement: "Textos, triggers, condições e comandos não-alvo permanecem preservados; cada novo Gab tem continuidade 657."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "task-1.1.md#validators"
  evidence_refs: ["builds/fase2/static-validation.md"]
  status: "passed"
```

## Validators

- Parse JSON dos dois arquivos.
- Inventário estruturado de `101/401`, `357/657`, triggers e textos antes/depois.
- Diff restrito aos dois arquivos e aos comandos de fala-alvo.

## Observable Validation

Playtest humano posterior de ActionButton, PlayerTouch, Autorun e Parallel.

## Human Loop

- Gate: human-validation
- Required decision: none

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "passed"
  task_ref: "planos/005-exploration-gabwindow/task-1.1.md"
  target_decision_refs: ["tasks.md#target-decision-ledger"]
  files_expected: ["frontend/data/Map022.json", "frontend/data/Map045.json"]
  write_owner: "gameplay-engineer"
  target_files: ["frontend/data/Map022.json", "frontend/data/Map045.json"]
  validation_owner: "orchestrator"
  next_action: "Aguardar validação humana prescrita pela fase 2."
  blocked_by: []
```
