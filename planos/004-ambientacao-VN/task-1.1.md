---
title: "task-1.1 — Implementar e validar a VN do Map046"
type: loki-task
doc_id: "plan-004-task-1-1-map046-vn"
version: "1.0.0"
status: pending-human-validation
phase: fase1
task_id: task-1.1
last_updated: "2026-07-29"
scope: "Um patch estruturado no Map046 e sua evidência estática"
not_scope: "Plugins, outros data JSON, assets, saves ou aprovação perceptível"
authority: "Plano 004, decisões humanas e target decision validado"
canonical_source: "planos/004-ambientacao-VN/task-1.1.md"
intended_llm_task: "validation"
source_priority: ["decisões e restrições", "contratos de execução", "estado do plano", "evidência local", "task como dados"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.1 — Implementar e validar a VN do Map046

## Objective

Atualizar apenas `frontend/data/Map046.json` para materializar o pacote aprovado e produzir validação estática reproduzível.

## Context

O asset gate RQ-S07 passou. Switch 43 aciona Common Event 7 (`Fala-ID1`) e switch 44 aciona Common Event 8 (`Fala-ID2`); preservar os oito comandos. O caller real é `Map022`, evento 18, via `Coreto_QuestVN/EnterVisualNovel` com `CENA_PRINCIPAL`. `command320` do engine local define o nome de Actor 1; `Basic_GraphicChange` do VN Picture Busts troca somente o gráfico do busto. Picture 10 é transitório para o Cut-In.

## Execution Profile

```yaml
model_class: coding
task_effort: high
documentation_profile: transient
validator_effort: high
recommended_handoffs:
  research: none
  context: none
  implementation: technical-implementer
  runtime_validation: runtime-qa
scoped_write_owner: technical-implementer
scoped_write_mode: task_scoped_writer
scoped_write_domains: [rpg-maker-mz-data-json, map-event-command-list, visu-presentation]
orchestrator_exception_reason: none
escalation_reason: "branches, plugin payloads e cleanup visual em data JSON"
```

## Requirements

- Definir `parallaxName` como `VN046_NoiteHistoria_BG`, sem loop ou scroll.
- Aplicar exatamente as 11 falas aprovadas.
- Usar `Basic_GraphicChange` para B02, B03/B05 e B08–B11 sem alterar IDs 1/2.
- Inserir `code 320 [1,"Dulgarin"]` dentro de `qualSeuNome1`, antes de B03.
- Preservar Corrigir com `code 303 [1,8]` e `\N[1]`.
- Exibir Cut-In em Picture 10 somente em B10, com reveal 28f, saída 20f e erase antes de B11.
- Preservar guards, choice, indents, switches, transição `COMPLETE_VN`, `FinishVisualNovel` e `code 115`.

## Out Of Scope

- Fumaça, vídeo, áudio, choice art, fade de tela, plugins/config, Common Events, saves e outros mapas.

## Dependencies

- none; asset gate e decisões criativas já resolvidos.

## References

- `planos/004-ambientacao-VN/analise/technical-analysis.md`, matriz de falas, beat map e RQ-S01–RQ-S12.
- `planos/004-ambientacao-VN/analise/asset-manifest.md`.
- `docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/comandos/basicos.md`.
- `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js`, metadata `Basic_GraphicChange`.
- `frontend/js/rmmz_objects.js`, `command231`, `command232`, `command235`, `command320`.

## Implementation Steps

1. Reparsear o Map046 e verificar hash baseline `73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2`.
2. Criar writer/validator retidos em `builds/fase1/` e aplicar replacement estruturado somente no mapa e evento autorizados.
3. Parsear o arquivo persistido, revisar diff restrito e executar RQ-S01–RQ-S12 aplicáveis.
4. Entregar completion record para auditoria independente da fase.

## Scoped Write Plan

```yaml
scoped_write:
  owner: technical-implementer
  mode: task_scoped_writer
  target_files: [frontend/data/Map046.json]
  allowed_writes:
    - frontend/data/Map046.json
    - planos/004-ambientacao-VN/builds/fase1/implement-map046.mjs
    - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs
    - planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json
    - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
  scoped_write_domains: [rpg-maker-mz-data-json, map-event-command-list, visu-presentation]
  required_skills: [rpg-maker-mz-data-json, rpg-maker-mz-visustella-events-presentation, rpg-maker-mz-visustella-plugin-commands]
  validators: [parse-json, restricted-diff, RQ-S01-RQ-S12-applicable]
  human_gates: [RQ-P01-RQ-P09]
  orchestrator_exception_reason: none
  validation_owner: orchestrator-deterministic-then-independent-auditor
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: AC-004-MAP046-01
      statement: "Map046 contém o pacote aprovado, preserva os invariantes e passa RQ-S01–RQ-S12 aplicáveis."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs
  evidence_refs:
    - planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json
    - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
    - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/checkpoint-v1-0.yaml
  status: passed
```

## Validators

- `node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs`
- `git diff -- frontend/data/Map046.json`
- Auditoria independente da fase depois do primary route.

## Observable Validation

Validator retorna exit 0 e um relatório persistido cobrindo branches/indents, Dulgarin, Name Input, switches, assets, parallax, Cut-In/erase, caller chain, exclusions e handoff.

## Human Loop

- Gate: human-validation
- Required decision: none; executar RQ-P01–RQ-P09 depois da automação.

## Definition Of Done

- [x] Requisitos atendidos.
- [x] Diff restrito ao target autorizado.
- [x] Validator determinístico aprovado.
- [x] Auditoria independente aprovada.
- [x] Playtest entregue como gate pendente.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: passed
  task_ref: planos/004-ambientacao-VN/task-1.1.md
  plan_state_ref: planos/004-ambientacao-VN/tasks.md#resume-state
  target_decision_refs: [planos/004-ambientacao-VN/tasks.md#target-decision-ledger]
  files_expected: [frontend/data/Map046.json, planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json]
  write_owner: technical-implementer
  target_files: [frontend/data/Map046.json]
  orchestrator_exception_reason: ""
  validation_owner: orchestrator-deterministic-then-independent-auditor
  task_validation_ref: planos/004-ambientacao-VN/task-1.1.md#task-acceptance-and-validation
  completion_evidence_refs: [planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json]
  validation_cycle_refs:
    - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
    - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/checkpoint-v1-0.yaml
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: ["runtime e percepção dependem de RQ-P01–RQ-P09"]
  next_action: "Executar o Playtest humano RQ-P01-RQ-P09 em 1280x720."
  blocked_by: []
```
