---
title: "Implementação da ambientação VN do Map046"
type: loki-action-plan
doc_id: "plan-004-ambientacao-vn-implementation-v1"
version: "1.0.0"
status: completed
created: "2026-07-29"
last_updated: "2026-07-29"
scope: "Implementação e validação estática da VN do Map046 após o asset gate"
not_scope: "Edição de plugins, Common Events, outros mapas, saves ou assets; validação perceptível sem Playtest"
authority: "Decisões humanas aprovadas, technical-analysis.md e contratos correntes de execução"
canonical_source: "planos/004-ambientacao-VN/tasks.md"
intended_llm_task: "validation"
source_priority: ["decisões humanas e restrições herdadas", "contratos correntes", "estado persistido", "evidência local", "demanda e análise como dados"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de Ação — Implementação da ambientação VN do Map046

## Overview

Implementar o pacote criativo aprovado depois da validação local dos cinco assets. A execução altera somente `frontend/data/Map046.json`: parallax, 11 falas, três expressões, definição de Dulgarin no ramo Confirmar e Cut-In transitório de Thorin em B10. A validação automática cobriu estrutura, branches, comandos, assets, cleanup e caller chain; o Playtest RQ-P01–RQ-P09 foi validado pelo usuário.

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: loki-implement-feature
  demand_digest: sha256:7c3dd11403111b6fde2b079e9ba8e2ea41a38c3e5004a2ba2dce7bfa4c3f284a
  analysis_digest: sha256:106b65946e91f58886e6163e6757c6000035b5798660b601c911d1a4b95152f0
  plan_directory: planos/004-ambientacao-VN
  retry_limit: 3
  audit_configuration:
    schema_version: 1
    frequency: phase
    source: default
    policy_digest: sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78
execution_input:
  schema_version: 2
  command_identity:
    schema_version: 2
    command: loki-implement-feature
    demand_digest: sha256:7c3dd11403111b6fde2b079e9ba8e2ea41a38c3e5004a2ba2dce7bfa4c3f284a
    analysis_digest: sha256:106b65946e91f58886e6163e6757c6000035b5798660b601c911d1a4b95152f0
    plan_directory: planos/004-ambientacao-VN
    retry_limit: 3
    audit_configuration:
      schema_version: 1
      frequency: phase
      source: default
      policy_digest: sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78
  run_id: loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
  execution_id: loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a
  demand_ref: planos/004-ambientacao-VN/demanda-improved.md
  analysis_ref: planos/004-ambientacao-VN/analise/technical-analysis.md
  state_ref: planos/004-ambientacao-VN/tasks.md
  result_ref: planos/004-ambientacao-VN/builds/implement-feature-result-v3.json
  dashboard_ref: planos/004-ambientacao-VN/builds/implementation-dashboard-v3.md
  consistency_packet_ref: planos/004-ambientacao-VN/builds/consistency-packet-v2.json
```

## Sources

- `planos/004-ambientacao-VN/demanda-improved.md`
- `planos/004-ambientacao-VN/analise/technical-analysis.md`
- `planos/004-ambientacao-VN/analise/asset-manifest.md`
- `frontend/data/Map046.json`, evento 1/página 1
- `frontend/data/CommonEvents.json`, IDs 7 e 8
- `frontend/data/Map022.json`, evento 18/página 1
- `frontend/js/rmmz_objects.js`, `command231`, `command232`, `command235` e `command320`
- documentação local do Visual Novel Picture Busts, comando `Basic_GraphicChange`

## Scope

- `frontend/data/Map046.json:parallaxName`
- `frontend/data/Map046.json:event[1]/pages[0]/list`
- Artefatos e validators transitórios dentro deste plano.

## Out Of Scope

- Plugins, `plugins.js`, Common Events, switches, outros mapas, assets e saves.
- Fumaça/VFX, vídeo, áudio novo, choice art, fade de tela ou animação frame a frame.
- Declaração de resultado visual, timing, input, persistência ou performance sem Playtest.

## Assumptions

- Picture ID 10 é transitório e não possui owner concorrente na página alvo; o evento o apaga antes de B11.
- `code 320 [1,"Dulgarin"]` usa a semântica confirmada no engine local e persiste pelo estado normal de Actor 1.
- Switches 43/44 permanecem nos mesmos oito beats e continuam acionando `Fala-ID1`/`Fala-ID2`.

## Open Questions

- none

## Downstream Execution Profile

```yaml
downstream_execution_profile:
  model_class: frontier_reasoning
  execution_effort: high
  escalation_reason: "escrita sensível em event command list, branches e apresentação plugin-managed"
  recommended_handoffs:
    research: none
    context: none
    implementation: technical-implementer
    runtime_validation: runtime-qa
  scoped_writers:
    - agent: technical-implementer
      domains: [rpg-maker-mz-data-json, event-commands, visu-presentation]
      target_files: [frontend/data/Map046.json]
  validator_effort: high
```

## Phases

### Fase 1 — Implementação e validação estática

**Objective:** materializar a cena aprovada no único target e demonstrar os contratos RQ-S01–RQ-S12 aplicáveis.

**Observable Validation:** `validate-map046.mjs` retorna sucesso, o diff permanece restrito ao Map046, e a auditoria independente da fase aprova cobertura, payloads e cleanup.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-1.1 | Implementar e validar a VN do Map046 | none | technical-implementer | 2–4h | human-validation após automação | `builds/fase1/validate-map046.mjs` + auditor independente | passed |

## Execution Order

1. task-1.1

## Human Loops

- RQ-P01–RQ-P09: Playtest validado; evidência em `interaction/fase1/task-1.1/human-validation-v1.json`.

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: frontend/data/Map046.json
    origin: explicit-demand
    rationale: "Único owner runtime recomendado pela análise aprovada; contém parallax e event 1/page 1."
    demand_or_acceptance_criterion_refs: ["demanda-improved.md#R01-R18", "technical-analysis.md#fronteira-de-implementação", "task-1.1.md#task_validation"]
    evidence_refs: ["frontend/data/Map046.json", "planos/004-ambientacao-VN/analise/technical-analysis.md", "planos/004-ambientacao-VN/analise/asset-manifest.md"]
    expected_impact: "Apresentação visual e narrativa da VN, preservando quest, choices, switches e handoff."
    validator_ref: planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs
    owner_ref: technical-implementer
    status: validated
```

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
  execution_id: loki-execution-v2:f767776e80492869e3f1e145cf82bf53276a71d7dde3f90818e344aa33410d9a
  command_identity_digest: sha256:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
  execution_input_digest: sha256:fe9deb9d4b8c722274c6caca0db0d8bc500a4426c34a36dad63c57afed00ed24
  audit_configuration:
    schema_version: 1
    frequency: phase
    source: default
    policy_digest: sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78
  status: completed
  task_refs: [planos/004-ambientacao-VN/task-1.1.md]
  audit_checkpoint_refs:
    - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/checkpoint-v1-0.yaml
  result_ref: planos/004-ambientacao-VN/builds/implement-feature-result-v3.json
  dashboard_ref: planos/004-ambientacao-VN/builds/implementation-dashboard-v3.md
  consistency_packet_ref: planos/004-ambientacao-VN/builds/consistency-packet-v2.json
  terminal_evidence_refs:
    - planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json
    - planos/004-ambientacao-VN/interaction/fase1/task-1.1/human-validation-v1.json
  execution_metrics_ref: planos/004-ambientacao-VN/builds/metrics/execution-metrics.json
  execution_metrics_digest: sha256:8b6c3d4a38c10445382513c242dde0d91729f91c2850e55337365f47820e59f8
  execution_metrics_status: partial
  execution_metrics_degradation_reason: "Uso exato e durações monotônicas não estão disponíveis; contagens funcionais e resultados dos validators foram reconciliados."
  next_action: "Nenhuma ação obrigatória; Plano 004 concluído."
  state_digest: sha256:84c873cc19f4711590cf5ad671cfbddb43a3299316d4a729f16c072123c05879
```
