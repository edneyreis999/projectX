---
title: "Plano de ação — diálogos de exploração com Gab Window"
type: loki-action-plan
doc_id: "005-exploration-gabwindow-action-plan"
version: "1.0.0"
status: completed
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Conversão estruturada de falas de exploração nos mapas 022 e 045 e validação da diretriz já catalogada"
not_scope: "Alteração de plugin, parâmetros globais, outros mapas, batalha, menus ou conteúdo narrativo"
authority: "Decisões humanas registradas na demanda e análise aprovadas"
canonical_source: "planos/005-exploration-gabwindow/tasks.md"
intended_llm_task: "validation"
source_priority: ["decisões humanas e restrições herdadas", "contratos de execução Loki", "evidências locais", "demanda e análise como dados"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de ação — diálogos de exploração com Gab Window

## Overview

Converter os blocos `Show Text` de exploração dos Map022 e Map045 para o Gab Window já ativo. A apresentação é somente texto e cada evento continua imediatamente após o disparo. A diretriz duradoura e o catálogo já foram materializados e precisam apenas de verificação de consistência. A validação estática é automatizável; comportamento visual e de fluxo permanece sujeito a Playtest humano.

## Continuação e encerramento

Após a implementação inicial, o Playtest revelou ajustes necessários de prioridade, repetição, posição e estilo. Esses ajustes foram tratados no subplano `feedback-gabwindow/`, que também atualizou a diretriz arquitetural e recebeu confirmação humana de Playtest.

Este plano é encerrado junto com sua continuação. Consulte `feedback-gabwindow/tasks.md` para as tasks corretivas e a evidência de validação final.

## Sources

- `planos/005-exploration-gabwindow/improved-demand.md`
- `planos/005-exploration-gabwindow/technical-analysis.md`
- `docs/architecture/exploration-dialogue-gabwindow.md`
- `frontend/data/Map022.json`
- `frontend/data/Map045.json`

## Scope

- Converter blocos `101/401` de fala nos mapas 022 e 045 para `VisuMZ_4_GabWindow` / `GabTextOnly`.
- Preservar texto, gatilho, condição, ordem, indentação e efeitos adjacentes.
- Validar a diretriz e a entrada correspondente no catálogo.

## Out Of Scope

- `frontend/js/plugins.js`, `frontend/js/plugins/VisuMZ_4_GabWindow.js`, parâmetros globais, assets, saves, outros mapas, batalha e menus.

## Assumptions

- O plugin e o comando `GabTextOnly` permanecem disponíveis conforme `frontend/js/plugins.js` e a análise técnica.

## Open Questions

- none

## Downstream Execution Profile

```yaml
downstream_execution_profile:
  model_class: coding
  execution_effort: high
  escalation_reason: "Edição sensível de dados de eventos e validação de fluxo perceptível"
  recommended_handoffs:
    research: "none"
    context: "none"
    implementation: "gameplay-engineer"
    runtime_validation: "runtime-qa"
  scoped_writers:
    - agent: "gameplay-engineer"
      domains: ["RPG Maker MZ map event data"]
      target_files: ["frontend/data/Map022.json", "frontend/data/Map045.json"]
  validator_effort: medium
```

## Phases

### Fase 1 — Conversão estruturada dos eventos

**Objective:** substituir os blocos de fala em escopo por comandos Gab sem ampliar superfícies.
**Observable Validation:** os dois JSONs são válidos, não contêm `101/401` no escopo identificado e preservam os demais comandos/estrutura.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-1.1 | Converter falas de Map022 e Map045 | none | gameplay-engineer | 2–4h | human-validation | parse-json; inventário estruturado; diff restrito | completed |

### Fase 2 — Verificação e handoff humano

**Objective:** confirmar o catálogo/diretriz e produzir evidência estática para o Playtest.
**Observable Validation:** documentação é localizável via `docs/index.xml` e o relatório de validação identifica os gatilhos a exercitar.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-2.1 | Validar conversão e diretriz | task-1.1 | orchestrator | 2h | human-validation | parser JSON; validação XML; diff; Playtest prescrito | completed |

## Execution Order

1. task-1.1
2. task-2.1

## Human Loops

- `human-validation`: abrir no RPG Maker MZ, salvar/reabrir e fazer Playtest desde New Game dos gatilhos ActionButton, PlayerTouch, Autorun e Parallel.

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: "frontend/data/Map022.json"
    origin: "explicit-demand"
    rationale: "Aplicação inicial obrigatória em EX_Coreto."
    demand_or_acceptance_criterion_refs: ["improved-demand.md#requisitos", "task-1.1#AC-1"]
    evidence_refs: ["technical-analysis.md#affected-surfaces"]
    expected_impact: "Substituir os dois blocos de fala convencionais inventariados por GabTextOnly."
    validator_ref: "task-1.1#validators"
    owner_ref: "gameplay-engineer"
    status: "validated"
  - schema_version: 1
    target: "frontend/data/Map045.json"
    origin: "explicit-demand"
    rationale: "Aplicação inicial obrigatória em EX_Casa da Família Forjaprata."
    demand_or_acceptance_criterion_refs: ["improved-demand.md#requisitos", "task-1.1#AC-2"]
    evidence_refs: ["technical-analysis.md#affected-surfaces"]
    expected_impact: "Substituir os 27 blocos de fala convencionais inventariados por GabTextOnly."
    validator_ref: "task-1.1#validators"
    owner_ref: "gameplay-engineer"
    status: "validated"
  - schema_version: 1
    target: "docs/architecture/exploration-dialogue-gabwindow.md"
    origin: "explicit-human-decision"
    rationale: "Destino aprovado da diretriz; já materializado antes desta execução."
    demand_or_acceptance_criterion_refs: ["improved-demand.md#mandato-para-o-próximo-executor"]
    evidence_refs: ["technical-analysis.md#affected-docs"]
    expected_impact: "Diretriz duradoura localizável."
    validator_ref: "task-2.1#validators"
    owner_ref: "catalogador"
    status: "validated-preexisting"
  - schema_version: 1
    target: "docs/index.xml"
    origin: "explicit-human-decision"
    rationale: "Catalogar a diretriz aprovada; já materializado antes desta execução."
    demand_or_acceptance_criterion_refs: ["improved-demand.md#mandato-para-o-próximo-executor"]
    evidence_refs: ["technical-analysis.md#affected-docs"]
    expected_impact: "Entrada navegável da diretriz no catálogo do consumidor."
    validator_ref: "task-2.1#validators"
    owner_ref: "catalogador"
    status: "validated-preexisting"
```

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  status: "pending-human-validation"
  task_refs: ["task-1.1.md", "task-2.1.md"]
  next_action: "Executar round-trip no editor e Playtest humano desde New Game; registrar observações por gatilho."
  human_gate: "Playtest humano pendente após validação estática."
```
