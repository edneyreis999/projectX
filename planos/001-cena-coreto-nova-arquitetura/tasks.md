---
title: "Reestruturação EX/VN — Noite da História"
type: loki-action-plan
doc_id: "001-cena-coreto-nova-arquitetura"
version: "1.0.0"
status: running
created: "2026-07-28"
last_updated: "2026-07-28"
scope: "DAG e decisões de alvo para a migração Map022 → Map046/VN → Map045."
---

# Plano de Acao - Reestruturação EX/VN — Noite da História

## Overview

Implementar a cena `noite-da-historia` com QuestCore como autoridade canônica,
PKD como projeção, Map046 como VN e Map022/Map045 como EX. O fluxo preserva
conteúdo e chegada, mas remove escrita direta do estágio nos eventos migrados.
O Playtest de New Game continua obrigatório para aceitação perceptível.

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: loki-implement-feature
  demand_digest: sha256:4021aead0f44973dcc2e04c34e7f90948d3aaed5c1212af29925a2ca20ff1f7c
  analysis_digest: sha256:16eb10a1a3215352c848e1f0c8a113bfafeb3cb24f342d892c58c78d8efcfe5c
  plan_directory: planos/001-cena-coreto-nova-arquitetura
  retry_limit: 3
  audit_configuration: {schema_version: 1, frequency: phase, source: default, policy_digest: sha256:9d771e1bd366103323316f2db51069775cc17e17859fed9c2ac0167a7b02440e}
execution_input_ref: planos/001-cena-coreto-nova-arquitetura/interaction/inputs/execution-input-v2.yaml
run_id: loki-run-v2:86550d0a2c2b24415570cf9599eeed021f6cd88b7a3fd0e51a014839fb5274f1
execution_id: loki-execution-v2:d00981de73a3d0fbd4fa7be081b5e8ae6e7292ef6de06afe9214b7f39bbdbe2c
```

## Scope

- Coreto_QuestCore, plugins.js, CoretoQuests.json, System.json and Maps 022/045/046.
- PKD canonicalization and the EX/VN route only.

## Out Of Scope

- VisuMZ_2_QuestSystem, unrelated quests, legacy saves and runtime approval without Playtest.

## Decisions

- questKey: `noite-da-historia`; initial state: `0`; character spelling: `Rheed`.
- V26, V29 and V100 remain owned by existing flows; V106 is currently unreferenced and selected for this quest.
- State table: `0` not started, `10` seated/entry VN allowed, `20` VN completed/physical outro, `90` transition to Map045 complete.

## Phases

### Fase 1 - Registry and backend

**Objective:** establish one authoritative state machine and loadable plugin chain.
**Observable validation:** static validator finds PKD adapter, V106, registry closure and exactly one active PKD.

| Task | Title | Dependencies | Write Owner | Validators | Status |
| --- | --- | --- | --- | --- | --- |
| task-1.1 | Adaptador PKD e registro canônico | none | technical-implementer | node/JSON/plugin scan | pending |

### Fase 2 - EX/VN event route

**Objective:** move VN semantics to Map046 and keep physical continuation in EX.
**Observable validation:** command topology proves Coreto entry/exit, assertions, no direct EX↔VN transfer, and Map045 arrival target.

| Task | Title | Dependencies | Write Owner | Validators | Status |
| --- | --- | --- | --- | --- | --- |
| task-2.1 | Migração EX/VN da Noite da História | task-1.1 | technical-implementer | JSON/route scan | pending |

## Execution Order

1. task-1.1
2. task-2.1

## Target Decision Ledger

```yaml
target_decisions:
  - {schema_version: 1, target: frontend/js/plugins/Coreto_QuestCore.js, origin: inferred, rationale: "Replace the hard-coded Visu backend with the approved PKD adapter.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.1", "task-1.1.md#task-1.1-ac-1"], evidence_refs: ["frontend/js/plugins/Coreto_QuestCore.js", "frontend/js/plugins/PKD_SimpleQuestSystem.js"], expected_impact: "Canonical transitions sync PKD idempotently.", validator_ref: "task-1.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/js/plugins.js, origin: explicit-demand, rationale: "Activate and order Coreto plugins; retain one PKD entry.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.1"], evidence_refs: ["frontend/js/plugins.js"], expected_impact: "Runtime loads approved dependency chain.", validator_ref: "task-1.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/data/CoretoQuests.json, origin: explicit-demand, rationale: "Registry is required by QuestCore.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.2"], evidence_refs: ["frontend/js/plugins/Coreto_QuestCore.js"], expected_impact: "Declared state machine and VN entries.", validator_ref: "task-1.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/data/System.json, origin: inferred, rationale: "V106 needs a semantic database name.", demand_or_acceptance_criterion_refs: ["task-1.1.md#task-1.1-ac-2"], evidence_refs: ["ownership scan: V106 has zero callers"], expected_impact: "No collision with existing stage variables.", validator_ref: "task-1.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/data/Map022.json, origin: explicit-demand, rationale: "EX caller and physical continuation are here.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.3"], evidence_refs: ["frontend/data/Map022.json events 17,18,30"], expected_impact: "Coreto routed entry/outro.", validator_ref: "task-2.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/data/Map046.json, origin: explicit-demand, rationale: "Mandatory VN map.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.3"], evidence_refs: ["frontend/data/Map046.json"], expected_impact: "Single asserted VN event.", validator_ref: "task-2.1.md#Validators", owner_ref: technical-implementer, status: validated}
  - {schema_version: 1, target: frontend/data/Map045.json, origin: explicit-demand, rationale: "Arrival continuity must consume terminal state.", demand_or_acceptance_criterion_refs: ["demanda-improved.md#7.3"], evidence_refs: ["frontend/data/Map045.json event 11"], expected_impact: "Arrival preserves downstream quest start.", validator_ref: "task-2.1.md#Validators", owner_ref: technical-implementer, status: validated}
```

## Human Loops

- Plugin Manager: open, save and reopen after activation changes.
- New Game Playtest: main route, cancel/re-entry, save/load, return locks and Map045 arrival.

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: loki-run-v2:86550d0a2c2b24415570cf9599eeed021f6cd88b7a3fd0e51a014839fb5274f1
  execution_id: loki-execution-v2:d00981de73a3d0fbd4fa7be081b5e8ae6e7292ef6de06afe9214b7f39bbdbe2c
  command_identity_digest: sha256:pending-reconciliation
  execution_input_digest: sha256:pending-reconciliation
  audit_configuration: {schema_version: 1, frequency: phase, source: default, policy_digest: sha256:9d771e1bd366103323316f2db51069775cc17e17859fed9c2ac0167a7b02440e}
  status: running
  task_refs: [planos/001-cena-coreto-nova-arquitetura/task-1.1.md, planos/001-cena-coreto-nova-arquitetura/task-2.1.md]
  audit_checkpoint_refs: []
  result_ref: planos/001-cena-coreto-nova-arquitetura/builds/result-v3.yaml
  dashboard_ref: planos/001-cena-coreto-nova-arquitetura/builds/dashboard-v3.md
  consistency_packet_ref: planos/001-cena-coreto-nova-arquitetura/builds/consistency-v2.yaml
  terminal_evidence_refs: []
  execution_metrics_ref: null
  execution_metrics_digest: null
  execution_metrics_status: unavailable
  execution_metrics_degradation_reason: "publication failure: metrics have not been published yet"
  next_action: "Create writer preflight and dispatch task-1.1."
  state_digest: sha256:pending-reconciliation
```
