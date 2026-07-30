---
title: "Falas ambientais das criancas no Coreto"
type: loki-action-plan
doc_id: "plan-002-3-criancas-gabwindow-execution"
version: "1.0.0"
status: running
created: "2026-07-29"
last_updated: "2026-07-29"
scope: "Implementar as falas ambientais aprovadas no Map022"
not_scope: "Plugins, configuracao, Common Events, System, CoretoQuests, assets ou alteracoes fora de Map022"
---

# Plano de Acao - Falas ambientais das criancas no Coreto

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: "loki-implement-feature"
  demand_digest: "sha256:a272fb9d4ad9645f641e3adfe838fac225458a1bfa1874366e88130bce7cdd75"
  analysis_digest: "sha256:45a757024e2e5532d1a06b14825bb29153275f546ffe3b5244840ff388b9d819"
  plan_directory: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg"
  retry_limit: 3
  audit_configuration:
    schema_version: 1
    frequency: "phase"
    source: "default"
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
execution_input:
  schema_version: 2
  run_id: "loki-run-v2:b22e885559c3a2cac210841aeb120fa8f2011f99b95c28a16b7a2fae47f15371"
  execution_id: "loki-execution-v2:adce3df1f5a6ffcf699eed227b25d78e132bff3bec93a53223810df25cdd336f"
  demand_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md"
  analysis_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-tecnica.md"
  state_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/tasks.md"
  result_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/builds/result-v3.json"
  dashboard_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/builds/consistency-v2.json"
```

## Phases

### Fase 1 - Implementacao estrutural

**Objective:** Criar o produtor unico no evento 20 e o cleanup no evento 30 sem tocar as criancas, evento 21 ou outras superficies.

| Task | Dependencies | Write owner | Human loop | Primary validator | Status |
| --- | --- | --- | --- | --- | --- |
| task-1.1 | none | technical-implementer | Playtest posterior | parser passou; proveniência de diff inconclusiva | unresolved |

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: "frontend/data/Map022.json"
    origin: "inferred"
    rationale: "A analise aprovada limita a primeira entrega ao controlador livre no evento 20 e ao handoff existente no evento 30."
    demand_or_acceptance_criterion_refs: ["demanda.md", "task-1.1#acceptance"]
    evidence_refs: ["analise-tecnica.md#Recommendation", "Map022.json#events[20]", "Map022.json#events[30]"]
    expected_impact: "Falas Gab ambientais em V106=0, com corte por S43 antes do primeiro Show Text."
    validator_ref: "task-1.1#validators"
    owner_ref: "technical-implementer"
    status: "validated"
```

## Human Loops

- `human-validation`: Playtest de Map022 apos os validadores estaticos; sem ele, o resultado permanece pendente de validacao humana.

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: "loki-run-v2:b22e885559c3a2cac210841aeb120fa8f2011f99b95c28a16b7a2fae47f15371"
  execution_id: "loki-execution-v2:adce3df1f5a6ffcf699eed227b25d78e132bff3bec93a53223810df25cdd336f"
  status: "partial"
  task_refs: ["planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/task-1.1.md"]
  audit_checkpoint_refs: []
  next_action: "Obter baseline confiável ou decisão humana sobre a AC-2; depois realizar aceitação no editor e Playtest"
```
