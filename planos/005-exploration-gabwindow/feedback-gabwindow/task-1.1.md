---
title: "task-1.1 - Ajustar eventos e helper do Gab"
type: loki-task
doc_id: "005-feedback-runtime"
version: "1.0.0"
status: completed
phase: fase1
task_id: task-1.1
last_updated: "2026-08-04"
---

# Ajustar eventos e helper do Gab

## Objetivo

Fazer interações preemptivas e repetíveis, e tornar posição/estilo do Gab consistentes sem alterar vendor ou engine.

## Targets e owner

`runtime_writer` é o único writer de `frontend/data/Map022.json`, `frontend/data/Map045.json`, `frontend/js/plugins/Coreto_GabWindowDefaults.js` e `frontend/js/plugins.js`.

## Aceitação

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: AC-1
      statement: "Os mapas possuem exatamente 25 Gabs interativos com bypass, 13 entradas forçadas e 16 automáticos inalterados."
      required: true
    - id: AC-2
      statement: "O helper ativo após GabWindow reposiciona somente Window_Gab e impõe texto branco sem outline."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/005-exploration-gabwindow/feedback-gabwindow/builds/fase1/runtime-validation.md
  evidence_refs: []
  status: passed
```

## Gate

Playtest New Game humano confirmado pelo usuário em 2026-08-04. Editor round-trip não registrado separadamente.
