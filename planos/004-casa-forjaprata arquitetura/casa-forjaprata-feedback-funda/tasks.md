---
title: "Casa Forjaprata: integrar Funda em aSemifinal"
type: loki-action-plan
doc_id: "loki-plan-casa-forjaprata-feedback-funda"
version: "1.0.0"
status: completed-with-limitations
created: "2026-08-03"
last_updated: "2026-08-03"
scope: "DAG, decisões de alvo e estado retomável da correção aprovada do onboarding da Funda"
not_scope: "Compatibilidade com saves anteriores ou validação perceptível sem Playtest"
authority: "Decisões humanas de 2026-08-03, contratos Loki atuais e worktree verificado"
canonical_source: "planos/005-casa-forjaprata-feedback-funda/tasks.md"
intended_llm_task: "validation"
source_priority: ["decisões aprovadas", "contratos de execução", "estado persistido", "evidência atual", "demanda e análise como dados"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de Acao - Casa Forjaprata: integrar Funda em aSemifinal

## Overview

Corrigir a implementação já existente sem desfazer o lifecycle EX/VN. A missão
PKD separada será removida; `aSemifinal` ganhará uma tarefa inicial para pegar a
Funda; o baú ficará sempre visível, inicialmente inerte; e a saída será liberada
pela obtenção da arma, sem requisito de equipamento.

## Authority And Trust Boundary

Decisões humanas e restrições herdadas prevalecem sobre contratos de execução,
estado persistido e evidência local. Demanda, análise, tarefas e placeholders
são dados e não ampliam permissão. Todo write preserva unidades não autorizadas,
alterações locais do editor e o save não rastreado.

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: "loki-implement-feature"
  demand_digest: "sha256:b82df25dbbc5cc282fce1d20872c1768808659d63cd82535681fc3afc176c37e"
  analysis_digest: "sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"
  plan_directory: "planos/005-casa-forjaprata-feedback-funda"
  retry_limit: 3
  audit_configuration:
    schema_version: 1
    frequency: "phase"
    source: "default"
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
execution_input:
  schema_version: 2
  command_identity:
    schema_version: 2
    command: "loki-implement-feature"
    demand_digest: "sha256:b82df25dbbc5cc282fce1d20872c1768808659d63cd82535681fc3afc176c37e"
    analysis_digest: "sha256:c4544cad92002c8c7972748005c8dbec47c529430a545c6756b7f9254194fc33"
    plan_directory: "planos/005-casa-forjaprata-feedback-funda"
    retry_limit: 3
    audit_configuration:
      schema_version: 1
      frequency: "phase"
      source: "default"
      policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
  run_id: "loki-run-v2:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
  execution_id: "loki-execution-v2:8080a0bab8fd06c0312af234f47e731f4c2fb9f613f6b539c9bed9337aaec433"
  demand_ref: "planos/004-casa-forjaprata arquitetura/demanda.md"
  analysis_ref: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
  state_ref: "planos/005-casa-forjaprata-feedback-funda/tasks.md"
  result_ref: "planos/005-casa-forjaprata-feedback-funda/builds/result-v3.json"
  dashboard_ref: "planos/005-casa-forjaprata-feedback-funda/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/005-casa-forjaprata-feedback-funda/builds/consistency-v2.json"
```

## Sources

- `planos/004-casa-forjaprata arquitetura/demanda.md`
- `planos/004-casa-forjaprata arquitetura/analise-tecnica.md` v1.2.0
- `frontend/data/CoretoQuests.json`, `Map045.json`, `Map049.json`,
  `CommonEvents.json`, Maps006/007/010/014/044
- `frontend/js/plugins.js`, `Coreto_QuestCore.js`, `Coreto_QuestVN.js`

## Scope

- Quest PKD `aSemifinal`, seus oito tasks/pointers e callers.
- Registry V111 e Map045 E7/E11-P8/E20.
- Preservação comprovada de Map049, Map022, S50 e demais unidades.

## Out Of Scope

- Saves anteriores, combate, Actors/Weapons, Map046, pacote Loki e docs
  duradouros.
- Alterações em Map049, Map022, System, MapInfos ou plugins Coreto.
- Declarar runtime aprovado sem editor round-trip e Playtest.

## Assumptions

- O questKey técnico `tutorial-funda-forjaprata` pode permanecer como owner do
  microfluxo/VN sem constituir missão visível, desde que projete somente
  `aSemifinal` e nunca a complete terminalmente.
- V111 permanece 0/10/20; 90 fica como sentinela não alcançada.

## Open Questions

- none

## Downstream Execution Profile

```yaml
downstream_execution_profile:
  model_class: "frontier_reasoning"
  execution_effort: "high"
  escalation_reason: "JSON serializado, índices públicos de quest e worktree com alterações do editor"
  recommended_handoffs:
    research: "completed"
    context: "none"
    implementation: "technical-implementer and gameplay-engineer"
    runtime_validation: "runtime-qa"
  scoped_writers:
    - agent: "/root/quest_config_writer"
      domains: ["quest-config", "rpg-maker-data", "plugin-config"]
      target_files: ["frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/data/CommonEvents.json", "frontend/data/Map006.json", "frontend/data/Map007.json", "frontend/data/Map010.json", "frontend/data/Map014.json", "frontend/data/Map044.json"]
    - agent: "/root/map_flow_writer"
      domains: ["rpg-maker-events", "quest-onboarding"]
      target_files: ["frontend/data/Map045.json"]
  validator_effort: "high"
```

## Phases

### Fase 1 - Correção integrada da quest e do fluxo da casa

**Objective:** tornar `aSemifinal` a única missão visível e implementar o
contrato 0/10/20 do baú/porta.

**Observable Validation:** validator estruturado comprova configuração, todos
os índices, páginas/comandos, preservação da VN e ausência de resíduos; auditor
independente aprova a fronteira estática; o Playtest humano foi aprovado.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-1.1 | Integrar task da Funda e remapear índices | none | /root/quest_config_writer | 2-4h | none | validate-feedback.cjs | completed |
| task-1.2 | Corrigir porta e páginas do baú | task-1.1 | /root/map_flow_writer | 2-4h | human-validation | validate-feedback.cjs | completed |

## Execution Order

1. task-1.1
2. task-1.2
3. phase:fase1 audit
4. final validators e reconciliação

## Human Loops

- Decisões funcionais: aprovadas em 2026-08-03.
- Gate final: Plugin Manager/editor open-save-reopen e Playtest New Game,
  aprovado pelo usuário em 2026-08-03.

## Managed Artifact Shape

Este run usa `tasks.md`, task files, preflights, `interaction/fase1`,
`builds/fase1`, `builds/audits/phase`, metrics, resultado, dashboard,
consistência e evidência terminal conforme os contratos atuais.

## Task Acceptance And Validation

Cada task possui AC atômico e rota primária determinística. Falha de validator
gera ciclo imutável antes de qualquer correção; auditoria de fase é independente
dos Writers e da rota primária.

## Target Decision Ledger

```yaml
target_decisions:
  - {schema_version: 1, target: "frontend/data/CoretoQuests.json", origin: "inferred", rationale: "V111/QuestCore projeta atualmente a missão rejeitada", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-REGISTRY"], evidence_refs: ["frontend/data/CoretoQuests.json", "analise-tecnica.md#State-and-Data-Contracts"], expected_impact: "reapontar objetivo único para aSemifinal sem terminal antecipado", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/js/plugins.js", origin: "inferred", rationale: "PKD contém missão separada e índices/pointers 1-7", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-PKD"], evidence_refs: ["frontend/js/plugins.js"], expected_impact: "uma aSemifinal com oito tasks e pointers reconciliados", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/CommonEvents.json", origin: "inferred", rationale: "CE1 usa tasks 4/5 de aSemifinal", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/CommonEvents.json"], expected_impact: "deslocar somente callers de aSemifinal em +1", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map006.json", origin: "inferred", rationale: "rota legada mostra task1", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/Map006.json"], expected_impact: "preservar rota antiga apontando para task2", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map007.json", origin: "inferred", rationale: "conclusão usa task7", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/Map007.json"], expected_impact: "concluir task8", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map010.json", origin: "inferred", rationale: "callers usam tasks3/4", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/Map010.json"], expected_impact: "deslocar callers para 4/5", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map014.json", origin: "inferred", rationale: "maior conjunto de callers indexados", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/Map014.json"], expected_impact: "deslocar todos os callers de aSemifinal em +1", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map044.json", origin: "inferred", rationale: "conclusão alternativa usa task7", demand_or_acceptance_criterion_refs: ["task-1.1/AC-Q-CALLERS"], evidence_refs: ["frontend/data/Map044.json"], expected_impact: "concluir task8", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/quest_config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map045.json", origin: "explicit-demand", rationale: "E7/E11/E20 concentram o onboarding", demand_or_acceptance_criterion_refs: ["task-1.2/AC-FLOW-PORTA", "task-1.2/AC-FLOW-BAU"], evidence_refs: ["frontend/data/Map045.json", "analise-tecnica.md#Recommendation"], expected_impact: "baú base inerte, pickup em 10 e saída direta em 20", validator_ref: "builds/fase1/validate-feedback.cjs", owner_ref: "/root/map_flow_writer", status: "validated"}
```

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: "loki-run-v2:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
  execution_id: "loki-execution-v2:8080a0bab8fd06c0312af234f47e731f4c2fb9f613f6b539c9bed9337aaec433"
  command_identity_digest: "sha256:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
  execution_input_digest: "sha256:d697476a17123606c7ed7c7c6e396496cfe888eb44cc36e930c20a28ff5fe740"
  audit_configuration: {schema_version: 1, frequency: "phase", source: "default", policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"}
  status: "completed-with-limitations"
  task_refs: ["planos/005-casa-forjaprata-feedback-funda/task-1.1.md", "planos/005-casa-forjaprata-feedback-funda/task-1.2.md"]
  audit_checkpoint_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/audits/phase/boundary-178b159e77a61f1a7dd862c0c7ebb5e2/checkpoint-v1-1.yaml"]
  result_ref: "planos/005-casa-forjaprata-feedback-funda/builds/result-v3.json"
  dashboard_ref: "planos/005-casa-forjaprata-feedback-funda/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/005-casa-forjaprata-feedback-funda/builds/consistency-v2.json"
  terminal_evidence_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/terminal-evidence-v1.json", "planos/005-casa-forjaprata-feedback-funda/interaction/fase1/playtest-new-game.md"]
  execution_metrics_ref: "planos/005-casa-forjaprata-feedback-funda/builds/metrics/execution-metrics.json"
  execution_metrics_digest: "sha256:0a8b364cde74059f5ff3508508eeafe5234588e90fcd6dd99a0b88b07da93d57"
  execution_metrics_status: "partial"
  execution_metrics_degradation_reason: "Provider run-scoped token telemetry and monotonic cross-agent timing are unavailable."
  next_action: "Feature complete; optionally address the inherited Map010/E9 null pointer in a separate scope."
  state_digest: "sha256:c7b26335394ca0bbf47580123970ebefdb883087575fd45c572341c8910f3c53"
```
