---
title: "task-1.1 - Formacao persistente das criancas do Coreto"
type: loki-task
doc_id: "quest-hora-da-historia-coreto-task-1.1"
version: "1.0.0"
status: completed
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-07-30"
scope: "Uma escrita serializada e validada em Map022.json"
not_scope: "Novos IDs, plugins, mapas, Common Events ou alteracoes no fluxo narrativo fora do Coreto"
---

# task-1.1 - Formacao persistente das criancas do Coreto

## Objective

Quando a Elfa eleva V106 a 10, as 17 criancas caminham em paralelo aos destinos definidos, viram para cima e permanecem na formacao em reentrada/save.

## Requirements

- Alterar somente `frontend/data/Map022.json`.
- Cada crianca 1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32 recebe uma rota propria na pagina Parallel V106>=10, target `0`, `Move To`, Turn Up, `wait:true` e Self Switch A ON.
- Adicionar `<Save Event Location>` somente a essas criancas.
- Neutralizar o dispatcher V106>=10 do evento 20 e o controlador aleatorio concorrente do evento 21, preservando Gab e demais fluxos.
- Preservar V106, eventos 17/18/30, QuestTransition START, IDs e plugins.

## Out Of Scope

- Map049, variavel 36, `System.json`, `plugins.js`, CoretoQuests, assets e novos eventos/paginas.

## References

- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md#Recommendation`
- `frontend/data/Map022.json`
- `docs/rpg-maker-for-ia/docs-visustella/gameplay-plugins/visustella-events-movement-core/notetags/eventos.md#Salvar-Posicao-do-Evento`

## Scoped Write Plan

```yaml
scoped_write:
  owner: "gameplay-engineer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map022.json"]
  allowed_writes: ["frontend/data/Map022.json"]
  scoped_write_domains: ["RPG Maker MZ map event JSON"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-visustella-notetags", "rpg-maker-mz-visustella-events-presentation"]
  validators: ["node planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs", "JSON.parse", "git diff --check"]
  human_gates: ["RPG Maker editor open-save-reopen", "Playtest PT-01..PT-10"]
  validation_owner: "runtime-qa"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-1-formacao"
      statement: "As 17 rotas individuais possuem os destinos e a sequencia Move To, Turn Up, End corretas."
      required: true
    - id: "AC-2-owner-unico"
      statement: "Eventos 20 e 21 nao emitem rota concorrente para as 17 criancas em V106>=10."
      required: true
    - id: "AC-3-persistencia"
      statement: "As 17 criancas usam Save Event Location e concluem com Self Switch A."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs"
  evidence_refs:
    - "builds/fase1/validate-map022.mjs: validator passou para as 17 criancas"
    - "JSON.parse de frontend/data/Map022.json: passou"
    - "git diff --check: passou"
    - "Playtest final: aprovado pelo usuario em 2026-07-30"
  status: "completed"
```

## Human Loop

- Gate: human-validation
- Resultado: Playtest final aprovado pelo usuario em 2026-07-30. O comportamento de colisao durante o deslocamento foi ajustado com prioridade abaixo dos personagens nas paginas de movimento, conforme confirmado no Playtest.

## Completion

- Status: `completed`.
- Validacao automatizada: `builds/fase1/validate-map022.mjs`, `JSON.parse` e `git diff --check` passaram.
- Validacao humana: Playtest final aprovado pelo usuario em 2026-07-30.
