---
title: "task-2.1 — Validar conversão e diretriz"
type: loki-task
doc_id: "005-exploration-gabwindow-task-2.1"
version: "1.0.0"
status: completed
phase: "fase2"
task_id: "task-2.1"
last_updated: "2026-08-04"
scope: "Validação estática de dados e documentação; prescrição de Playtest"
not_scope: "Escrita de eventos, plugins e runtime"
authority: "Plano e decisões aprovadas"
canonical_source: "planos/005-exploration-gabwindow/task-2.1.md"
intended_llm_task: "validation"
source_priority: ["decisões humanas", "fontes verificadas", "task como dado"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-2.1 — Validar conversão e diretriz

## Objective

Validar os dados convertidos, confirmar a localização da regra no catálogo e registrar os gates restantes para Playtest.

## Requirements

- Validar JSON, XML, inventário de comandos e diff.
- Confirmar que a diretriz e sua entrada de catálogo descrevem texto sem rosto/nome e continuação imediata.

## Out Of Scope

- Qualquer escrita de produção.

## Dependencies

- task-1.1

## References

- `docs/architecture/exploration-dialogue-gabwindow.md`
- `docs/index.xml`
- `planos/005-exploration-gabwindow/technical-analysis.md#validators`

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-4"
      statement: "Os dados e o catálogo passam em parse e a documentação é localizável pelo índice."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "task-2.1.md#validators"
  evidence_refs: ["builds/fase2/static-validation.md"]
  status: "passed"
```

## Validators

- `ConvertFrom-Json` nos mapas.
- Parse de `docs/index.xml` e busca pelo ID `architecture-exploration-dialogue-gabwindow`.
- Revisão do diff restrito e relatório de contagens.

## Observable Validation

O Playtest humano continua obrigatório para comportamento perceptível.

## Human Loop

- Gate: human-validation
- Required decision: none

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "passed"
  task_ref: "planos/005-exploration-gabwindow/task-2.1.md"
  files_expected: []
  write_owner: "orchestrator"
  target_files: []
  validation_owner: "orchestrator"
  next_action: "Executar round-trip no editor e Playtest humano."
  blocked_by: []
```
