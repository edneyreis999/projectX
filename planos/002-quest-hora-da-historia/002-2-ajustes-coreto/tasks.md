---
title: "Plano de acao - Ajustes do Coreto"
type: loki-action-plan
doc_id: "action-plan-002-2-ajustes-coreto"
version: "1.0.0"
status: running
last_updated: "2026-07-29"
---

# Plano de acao - Ajustes do Coreto

## Overview

Corrigir o gate das paginas 2 das 17 criancas do Map022 e trocar o teleporte por Move To sem Wait. A escrita de producao esta limitada a `frontend/data/Map022.json`; a validacao estatica e o Playtest humano compoem a conclusao.

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: "loki-implement-feature"
  demand_digest: "sha256:e02755ae510230762afcbb6b7e6d11af33a945008f8c3dcc460ac2423ffa6f2e"
  analysis_digest: "sha256:ca7515e4708a3afeb150c11e119c328a701a08d16a706e4237637c993dcd3ba8"
  plan_directory: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto"
  retry_limit: 3
  audit_configuration:
    schema_version: 1
    frequency: "phase"
    source: "default"
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
execution_input:
  schema_version: 2
  run_id: "loki-run-v2:a1c1d3561ca956e6aabcb1fb1f12f7e563c479ff3d50fa418020e513da67beed"
  execution_id: "loki-execution-v2:bc9facbed3d41567a38fac7522dfd80fde0d5ccfad2001eebc11bbc876f579a0"
  demand_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
  analysis_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
  state_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/tasks.md#loki_run_state"
  result_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/result-v3.json"
  dashboard_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/consistency-v2.json"
```

## Scope

- Produção: somente `frontend/data/Map022.json`, eventos `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`, página 2.
- Proibidos: Map004, Map005, plugins, quest, Common Events e qualquer outra superfície de runtime.

## Phases

### Fase 1 - Edicao e validacao estrutural

**Objective:** materializar as rotas Move To e provar o contrato JSON/diff.
**Observable Validation:** validator estruturado passa para os 17 eventos; JSON válido; diff limitado ao alvo.

| Task | Title | Dependencies | Write Owner | Validators | Status |
| --- | --- | --- | --- | --- | --- |
| task-1.1 | Atualizar eventos Crianca do Map022 | none | scoped writer `propor_ajuste_map004` | `builds/fase1/validate-map022.mjs` | running |

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: "frontend/data/Map022.json"
    origin: "explicit-demand"
    rationale: "Map022 e o owner atual da quest e contem as 17 paginas alvo."
    demand_or_acceptance_criterion_refs: ["demanda.md", "analise-tecnica.md#recommendation"]
    evidence_refs: ["analise-tecnica.md#affected-surfaces", "frontend/data/Map022.json"]
    expected_impact: "V106>=10 inicia Move To sem Wait, preservando destinos e direcao final."
    validator_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/fase1/validate-map022.mjs"
    owner_ref: "propor_ajuste_map004"
    status: "validated"
```

## Human Loops

- Human-validation obrigatoria: Playtest das rotas Parallel/wait=false, colisão, direção, reentrada e save/load.

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: "loki-run-v2:a1c1d3561ca956e6aabcb1fb1f12f7e563c479ff3d50fa418020e513da67beed"
  execution_id: "loki-execution-v2:bc9facbed3d41567a38fac7522dfd80fde0d5ccfad2001eebc11bbc876f579a0"
  status: "running"
  next_action: "Complete writer handoff, run static validator, then perform required Playtest."
```
