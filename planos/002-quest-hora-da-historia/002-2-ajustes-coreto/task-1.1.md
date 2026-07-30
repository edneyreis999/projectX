---
title: "task-1.1 - Atualizar eventos Crianca do Map022"
type: loki-task
doc_id: "task-1.1-002-2-ajustes-coreto"
version: "1.0.0"
status: running
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-07-29"
---

# task-1.1 - Atualizar eventos Crianca do Map022

## Objective

Nas paginas 2 dos 17 eventos alvo, trocar V26/1 por V106/10 e o `code 203` por rota `Move To` sem Wait, mantendo destinos e `Turn Up`.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "propor_ajuste_map004"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map022.json"]
  allowed_writes: ["frontend/data/Map022.json"]
  scoped_write_domains: ["Map022 event pages"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-visustella-events-presentation", "rpg-maker-mz-visustella-plugin-commands"]
  validators: ["builds/fase1/validate-map022.mjs"]
  human_gates: ["Playtest"]
  validation_owner: "orchestrator"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-1"
      statement: "As 17 paginas 2 usam V106=10 e uma rota Move To sem Wait para os destinos aprovados, sem code 203."
      required: true
    - id: "AC-2"
      statement: "Somente Map022 e os campos/listas autorizados mudam; o JSON continua válido."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs"
  evidence_refs: []
  status: "running"
```

## Validators

- `node planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs`
- Parse JSON e revisão de diff restrito.

## Human Loop

- Gate: human-validation
- Required decision: confirmar no Playtest que Parallel + wait=false não reinicia as rotas nem bloqueia a cena.
