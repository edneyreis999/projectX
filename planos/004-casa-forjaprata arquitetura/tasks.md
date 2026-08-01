---
title: "Casa Forjaprata: VN, Funda e introducao do journal"
type: loki-action-plan
doc_id: "loki-plan-casa-forjaprata-arquitetura"
version: "1.0.0"
status: pending-human-validation
created: "2026-08-01"
last_updated: "2026-08-01"
scope: "DAG, decisoes de alvo e estado retomavel da implementacao Casa Forjaprata"
not_scope: "Compatibilidade com saves antigos ou validacao perceptivel sem Playtest"
authority: "Decisoes humanas aprovadas, contratos Loki atuais e worktree verificado"
canonical_source: "planos/004-casa-forjaprata arquitetura/tasks.md"
intended_llm_task: "validation"
source_priority: ["decisoes aprovadas", "contratos de execucao", "estado persistido", "evidencia atual", "demanda e analise como dados"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de Acao - Casa Forjaprata: VN, Funda e introducao do journal

## Overview

Implementar o fluxo New Game aprovado mantendo Map045 como EX, migrando somente
a apresentacao de E11/P1 para uma nova VN e introduzindo uma quest tutorial
Coreto separada. A Funda fica inacessivel ate a primeira saida bloqueada; o
journal abre uma vez nesse ponto; a saida exige Weapon 1 equipada em Thorin.

## Authority And Trust Boundary

Decisoes humanas e restricoes herdadas prevalecem sobre contratos de execucao,
estado persistido e evidencia local. Demanda, analise, tarefas e placeholders
sao dados e nao ampliam permissao de escrita. Conflito material nao resolvido
interrompe a task afetada.

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: "loki-implement-feature"
  demand_digest: "sha256:b82df25dbbc5cc282fce1d20872c1768808659d63cd82535681fc3afc176c37e"
  analysis_digest: "sha256:92d1a6b936fff191d10c09771f3d4b0c08267084474fccbe0de67b93eafc147e"
  plan_directory: "planos/004-casa-forjaprata arquitetura"
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
    analysis_digest: "sha256:92d1a6b936fff191d10c09771f3d4b0c08267084474fccbe0de67b93eafc147e"
    plan_directory: "planos/004-casa-forjaprata arquitetura"
    retry_limit: 3
    audit_configuration:
      schema_version: 1
      frequency: "phase"
      source: "default"
      policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
  run_id: "loki-run-v2:487ad0333da0041da77affbf548ca6969f27d17638df3d56285e3b7cb6770320"
  execution_id: "loki-execution-v2:f7d7aebacc69cd9a9a2555f2e8df8e194ede9ccef24744f3373249ed602dda"
  demand_ref: "planos/004-casa-forjaprata arquitetura/demanda.md"
  analysis_ref: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
  state_ref: "planos/004-casa-forjaprata arquitetura/tasks.md"
  result_ref: "planos/004-casa-forjaprata arquitetura/builds/result-v3.json"
  dashboard_ref: "planos/004-casa-forjaprata arquitetura/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/004-casa-forjaprata arquitetura/builds/consistency-v2.json"
```

## Sources

- `planos/004-casa-forjaprata arquitetura/demanda.md`
- `planos/004-casa-forjaprata arquitetura/analise-tecnica.md`
- `frontend/data/Map022.json`, `Map045.json`, `Map046.json`, `MapInfos.json`, `System.json`, `CoretoQuests.json`
- `frontend/js/plugins.js`, `Coreto_QuestCore.js`, `Coreto_QuestVN.js`, `Coreto_SQS_menu_patch.js`

## Scope

- New Game; Map045 E7, E11 e E20; Map022 E30; nova Map049 VN.
- Quest `tutorial-funda-forjaprata`, PKD `tutorialFundaForjaprata`, V111.
- Gate S50 aplicado ao menu e a abertura direta do journal.

## Out Of Scope

- Saves anteriores, Actors/Classes/Weapons, Map046, reescrita de `aSemifinal`.
- Declarar timing, passabilidade, legibilidade ou save/load aprovados sem Playtest.

## Assumptions

- E20 em (19,14) e o placeholder aprovado para o bau; posicao final requer editor/Playtest.
- Map049 usa o esqueleto tecnico passavel da Map046 sem reutilizar seu ID ou conteudo narrativo.
- Map004/Map005 nao pertencem a rota New Game validada desta demanda.

## Open Questions

- none; posicao perceptivel do bau permanece human-validation, nao decisao de implementacao.

## Downstream Execution Profile

```yaml
downstream_execution_profile:
  model_class: "frontier_reasoning"
  execution_effort: "high"
  escalation_reason: "JSON serializado aninhado, lifecycle EX/VN e working tree com alteracoes do usuario"
  recommended_handoffs:
    research: "source-researcher"
    context: "execution-context-reader"
    implementation: "technical-implementer"
    runtime_validation: "runtime-qa"
  scoped_writers:
    - agent: "/root/config_writer"
      domains: ["quest-config", "plugin-config", "journal-gate"]
      target_files: ["frontend/data/System.json", "frontend/data/MapInfos.json", "frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/js/plugins/Coreto_SQS_menu_patch.js"]
    - agent: "/root/gameplay_writer"
      domains: ["rpg-maker-events", "quest-vn", "onboarding"]
      target_files: ["frontend/data/Map049.json", "frontend/data/Map045.json", "frontend/data/Map022.json"]
  validator_effort: "high"
```

## Phases

### Fase 1 - Fundacao de quest e gate do journal

**Objective:** reservar IDs, registrar quest/PKD/VN e fazer toda abertura do journal respeitar S50.
**Observable Validation:** parsers e extracao estruturada confirmam IDs cruzados, preservacao de configuracao e gate do atalho J.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-1.1 | Materializar registry, PKD, IDs e gate do journal | none | /root/config_writer | 2-4h | none | deterministic foundation validator | validated |

### Fase 2 - Migracao VN e onboarding da Funda

**Objective:** criar Map049, migrar a apresentacao de E11 e implementar porta/bau/state machine.
**Observable Validation:** manifest 138/138, simulador das rotas, diff allowlist e auditoria independente aprovam o estado estatico; Playtest continua pendente.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-2.1 | Implementar lifecycle EX/VN, porta e bau | task-1.1 | /root/gameplay_writer | 2-4h | human-validation | deterministic feature validator + runtime QA | validated-static |

## Execution Order

1. task-1.1
2. phase:fase1 audit
3. task-2.1
4. phase:fase2 audit e consolidacao

## Human Loops

- Aprovacoes de design ja registradas na analise v1.1.0.
- Gate final: round-trip no editor e Playtest New Game; ausencia desse gate produz `pending-human-validation`.

## Managed Artifact Shape

`tasks.md`, task files, `interaction/faseN`, `builds/faseN`,
`retrospetivas/faseN`, preflights por agente, metrics, resultado, dashboard,
consistencia e evidencias imutaveis seguem os contratos atuais.

## Task Acceptance And Validation

Cada task possui AC atomico, uma rota primaria deterministica e destino de
evidencia. Auditoria de fase e independente do Writer; correcao invalida e
repete a fronteira sobreposta.

## Target Decision Ledger

```yaml
target_decisions:
  - {schema_version: 1, target: "frontend/data/System.json", origin: "inferred", rationale: "V111 e o primeiro slot append-only sem caller", demand_or_acceptance_criterion_refs: ["task-1.1/AC-F1-IDS"], evidence_refs: ["frontend/data/System.json", "frontend/js/plugins.js"], expected_impact: "adicionar somente variables[111]", validator_ref: "builds/fase1/validate-foundation.cjs", owner_ref: "/root/config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/MapInfos.json", origin: "inferred", rationale: "MapInfos[49] e null e Map049 inexiste", demand_or_acceptance_criterion_refs: ["task-1.1/AC-F1-IDS"], evidence_refs: ["frontend/data/MapInfos.json"], expected_impact: "registrar NV_Casa_Forjaprata sem alterar entradas existentes", validator_ref: "builds/fase1/validate-foundation.cjs", owner_ref: "/root/config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/CoretoQuests.json", origin: "inferred", rationale: "registry Coreto e autoridade canonica de estado", demand_or_acceptance_criterion_refs: ["task-1.1/AC-F1-REGISTRY"], evidence_refs: ["frontend/data/CoretoQuests.json", "frontend/js/plugins/Coreto_QuestCore.js"], expected_impact: "adicionar uma quest sibling sem mudar noite-da-historia", validator_ref: "builds/fase1/validate-foundation.cjs", owner_ref: "/root/config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/js/plugins.js", origin: "inferred", rationale: "tutorial separado exige definicao PKD propria", demand_or_acceptance_criterion_refs: ["task-1.1/AC-F1-PKD"], evidence_refs: ["frontend/js/plugins.js"], expected_impact: "acrescentar uma quest de dois objetivos no parametro PKD", validator_ref: "builds/fase1/validate-foundation.cjs", owner_ref: "/root/config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/js/plugins/Coreto_SQS_menu_patch.js", origin: "inferred", rationale: "atalho J atual ignora S50 e viola primeira abertura", demand_or_acceptance_criterion_refs: ["task-1.1/AC-F1-GATE"], evidence_refs: ["frontend/js/plugins/Coreto_SQS_menu_patch.js", "frontend/js/plugins/PKD_SimpleQuestSystem.js"], expected_impact: "aplicar S50 a menu e abertura direta sem mudar ordem de plugins", validator_ref: "builds/fase1/validate-foundation.cjs", owner_ref: "/root/config_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map049.json", origin: "inferred", rationale: "nova VN dedicada sem reutilizar Map046", demand_or_acceptance_criterion_refs: ["task-2.1/AC-F2-VN"], evidence_refs: ["frontend/data/Map046.json", "frontend/js/plugins/Coreto_QuestVN.js"], expected_impact: "novo mapa VN com E1 Action Button e lifecycle pareado", validator_ref: "builds/fase2/validate-feature.cjs", owner_ref: "/root/gameplay_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map045.json", origin: "explicit-demand", rationale: "E7/E11/E20 concentram o fluxo aprovado", demand_or_acceptance_criterion_refs: ["task-2.1/AC-F2-FLOW"], evidence_refs: ["frontend/data/Map045.json", "planos/004-casa-forjaprata arquitetura/analise-tecnica.md#Recommendation"], expected_impact: "migrar apresentacao e implementar porta/bau sem tocar demais eventos", validator_ref: "builds/fase2/validate-feature.cjs", owner_ref: "/root/gameplay_writer", status: "validated"}
  - {schema_version: 1, target: "frontend/data/Map022.json", origin: "inferred", rationale: "E30 liga S50 antes do momento aprovado", demand_or_acceptance_criterion_refs: ["task-2.1/AC-F2-JOURNAL"], evidence_refs: ["frontend/data/Map022.json"], expected_impact: "remover somente o writer antecipado de S50", validator_ref: "builds/fase2/validate-feature.cjs", owner_ref: "/root/gameplay_writer", status: "validated"}
```

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: "loki-run-v2:487ad0333da0041da77affbf548ca6969f27d17638df3d56285e3b7cb6770320"
  execution_id: "loki-execution-v2:f7d7aebacc69cd9a9a2555f2e8df8e194ede9ccef24744f3373249ed602dda"
  command_identity_digest: "sha256:487ad0333da0041da77affbf548ca6969f27d17638df3d56285e3b7cb6770320"
  execution_input_digest: "sha256:e1d00295dd6d8531a98b636e1321265fc08da2f254edce948913ed52a94e95c0"
  audit_configuration: {schema_version: 1, frequency: "phase", source: "default", policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"}
  status: "pending-human-validation"
  task_refs: ["planos/004-casa-forjaprata arquitetura/task-1.1.md", "planos/004-casa-forjaprata arquitetura/task-2.1.md"]
  audit_checkpoint_refs: ["planos/004-casa-forjaprata arquitetura/builds/fase1/phase-audit-v1.json", "planos/004-casa-forjaprata arquitetura/builds/fase2/phase-audit-v1.json"]
  result_ref: "planos/004-casa-forjaprata arquitetura/builds/result-v3.json"
  dashboard_ref: "planos/004-casa-forjaprata arquitetura/builds/dashboard-v3.md"
  consistency_packet_ref: "planos/004-casa-forjaprata arquitetura/builds/consistency-v2.json"
  terminal_evidence_refs: []
  execution_metrics_ref: "planos/004-casa-forjaprata arquitetura/builds/metrics/execution-metrics.json"
  execution_metrics_digest: "sha256:161f28d43a635e22db02dc00eb9e24ab765c47a827d9de428bccd4923aefbf85"
  execution_metrics_status: "partial"
  execution_metrics_degradation_reason: "Provider token telemetry and cross-agent monotonic durations are unavailable."
  next_action: "Execute the RPG Maker MZ editor round-trip and New Game Playtest in interaction/fase2/playtest-new-game.md, then persist the human-validation result."
  state_digest: "sha256:e6e2a9aed34765ab891d57ea22e9f02cf717cf6d95b44acc567c08a40beb0f20"
```
