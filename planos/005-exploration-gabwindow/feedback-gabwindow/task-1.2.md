---
title: "task-1.2 - Documentar convenção do Gab"
type: loki-task
doc_id: "005-feedback-docs"
version: "1.0.0"
status: completed
phase: fase1
task_id: task-1.2
last_updated: "2026-08-04"
---

# Documentar convenção do Gab

## Objetivo

Registrar a regra arquitetural e preservar sua descoberta pelo índice de documentação.

## Targets e owner

`docs_writer` é o único writer de `docs/architecture/exploration-dialogue-gabwindow.md` e `docs/index.xml`.

## Aceitação

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: AC-1
      statement: "A arquitetura registra prioridade, repetição, sequência, automáticos, ancoragem e estilo exclusivos do Gab."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/005-exploration-gabwindow/feedback-gabwindow/builds/fase1/docs-validation.md
  evidence_refs: []
  status: passed
```
