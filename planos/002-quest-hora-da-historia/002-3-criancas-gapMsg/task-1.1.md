---
title: "task-1.1 - Materializar ambientacao Gab no Coreto"
type: loki-task
version: "1.0.0"
status: pending
phase: "fase1"
task_id: "task-1.1"
---

# task-1.1 - Materializar ambientacao Gab no Coreto

## Objective

Editar somente `frontend/data/Map022.json`: criar o controlador no evento 20 e inserir o cleanup aprovado no evento 30.

## Requirements

- Revalidar que `events[20]` e nulo antes da escrita.
- Evento 20: pagina paralela em V106=0/S43 OFF, produtor unico, 12 falas aprovadas, `GabTextOnly -> WaitForGab -> Wait`.
- Eventos/paginas superiores vazios para S43 ON e V106>=10.
- Evento 30: imediatamente apos S43 ON e antes do primeiro `Show Text`, `ClearGab -> WaitForGab`.
- Preservar todo o resto do mapa, inclusive as 17 criancas e evento 21.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "technical-implementer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map022.json"]
  allowed_writes: ["events[20]", "event 30 command list between S43 ON and first Show Text"]
  scoped_write_domains: ["RPG Maker MZ map-event JSON", "VisuStella GabWindow plugin commands"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-visustella-plugin-commands", "rpg-maker-mz-visustella-events-presentation"]
  validators: ["JSON parse", "restricted diff", "Gab command-shape scan", "handoff ordering scan"]
  human_gates: ["Playtest"]
  validation_owner: "independent static reviewer"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-1"
      statement: "Map022 contains exactly the approved ambient controller at event 20 and the approved S43 cleanup sequence in event 30."
      required: true
    - id: "AC-2"
      statement: "No event other than 20 and the approved insertion point in event 30 changes."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/builds/fase1/validate-map022-gab.py"
  evidence_refs: []
  status: "unresolved"
```

## Validators

- JSON parse e scanner estrutural do Map022.
- Diff restrito com baseline salvo antes da escrita.
- Playtest humano posterior para timing, clipping, transicao, save/load e input.

## Human Loop

- Gate: `human-validation`
- Required decision: `none`; Playtest e obrigatorio apos a escrita.

## Resume Notes

`frontend/data/Map022.json` ja possui alteracoes locais preexistentes. A auditoria estrutural passou, mas a AC-2 permanece `not-demonstrated`: sem baseline pré-escrita, o diff contra HEAD não separa de forma confiável o delta desta task. Evidência: `builds/fase1/static-audit.md`. O Playtest e a aceitação pelo editor também permanecem pendentes.
