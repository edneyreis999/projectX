---
title: "task-1.1 - Integrar task da Funda e remapear índices"
type: loki-task
doc_id: "casa-forjaprata-feedback-task-1-1"
version: "1.0.0"
status: completed
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-08-03"
scope: "Registry Coreto, configuração PKD e callers/pointers de aSemifinal"
not_scope: "Map045, Map049, engine/plugin source ou Playtest"
authority: "Plano, análise v1.2.0 e decisões humanas aprovadas"
canonical_source: "planos/005-casa-forjaprata-feedback-funda/task-1.1.md"
intended_llm_task: "validation"
source_priority: ["decisões aprovadas", "contratos", "plano verificado", "fontes atuais"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.1 - Integrar task da Funda e remapear índices

## Authority And Trust Boundary

Somente os alvos e unidades declarados podem ser escritos. Preservar todo o
worktree fora da allowlist e falhar se preconditions ou hashes mudarem.

## Objective

Remover a missão PKD separada, tornar a Funda a tarefa 1 de `aSemifinal` e
deslocar de forma completa todos os callers e pointers existentes para 2–8.

## Context

V111 continua como microestado 0/10/20. O questKey interno permanece para a VN,
mas projeta `aSemifinal`; estado 20 não é terminal. O PKD revela a primeira
tarefa por padrão, portanto a Funda precisa ocupar o índice 1.

## Execution Profile

```yaml
model_class: "coding"
task_effort: "high"
documentation_profile: "transient"
validator_effort: "high"
recommended_handoffs: {research: "none", context: "none", implementation: "technical-implementer", runtime_validation: "runtime-qa"}
scoped_write_owner: "/root/quest_config_writer"
scoped_write_mode: "task_scoped_writer"
scoped_write_domains: ["quest-config", "rpg-maker-data", "plugin-config"]
orchestrator_exception_reason: "none"
escalation_reason: "nested PKD serialization and indexed callers across maps"
```

## Requirements

- `CoretoQuests`: questKey interno preservado, PKD `aSemifinal`, somente
  objetivo 1 em 10→20, sem `LEAVE_EQUIPPED` e sem terminal em 20.
- `plugins.js`: remover `tutorialFundaForjaprata`; inserir nova tarefa 1; antigas
  tasks/pointers 1–7 tornam-se 2–8; novo pointer 1 aponta Map045/E20.
- Callers de `aSemifinal` em CommonEvents e Maps006/007/010/014/044 recebem +1
  somente nos índices de task; descrições, V29 e outras quests ficam intactas.

## Out Of Scope

- Map045, Map049, Map022, System, plugin source e saves.

## Dependencies

- none

## References

- `tasks.md#Target-Decision-Ledger`
- `analise-tecnica.md#State-and-Data-Contracts`
- `frontend/js/plugins/Coreto_QuestCore.js#sync`

## Implementation Steps

1. Registrar preflight e hashes/preconditions das unidades.
2. Aplicar writer estruturado preservando estilo e unidades não alvo.
3. Rodar parse/envelope e validator de índices.
4. Persistir completion record sanitizado.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "/root/quest_config_writer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/data/CommonEvents.json", "frontend/data/Map006.json", "frontend/data/Map007.json", "frontend/data/Map010.json", "frontend/data/Map014.json", "frontend/data/Map044.json"]
  allowed_writes: ["unidades exatas do target ledger", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.1-completion-v1.json"]
  scoped_write_domains: ["quest-config", "rpg-maker-data", "plugin-config"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-plugin-workflow"]
  validators: ["JSON parse", "plugins.js envelope", "validate-feedback.cjs", "git diff --check"]
  human_gates: []
  orchestrator_exception_reason: "none"
  validation_owner: "/root/feedback_auditor"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - {id: "AC-Q-REGISTRY", statement: "V111 projects only aSemifinal task1 from state10 to completion at20 without completing the quest.", required: true}
    - {id: "AC-Q-PKD", statement: "Exactly one visible aSemifinal has eight tasks; no tutorialFundaForjaprata remains; tasks/pointers are fully remapped.", required: true}
    - {id: "AC-Q-CALLERS", statement: "Every existing aSemifinal task caller is shifted by one with descriptions and V29 preserved.", required: true}
  primary_route: {type: "deterministic", validator_ref: "planos/005-casa-forjaprata-feedback-funda/builds/fase1/validate-feedback.cjs"}
  evidence_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.1-validation-v1.json", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.1-completion-v1.json"]
  status: "passed"
```

## Validators

- JSON parse; envelope `plugins.js`; extração PKD; contagem before/after de
  callers/pointers; `git diff --check`.
- Evidência: `builds/fase1/task-1.1-validation-v1.json`.

## Observable Validation

Relatório prova unicidade, ordem das oito tarefas, cobertura completa de índices
e ausência da missão/tarefa de equipamento.

## Human Loop

- Gate: none
- Required decision: none

## Definition Of Done

- [x] ACs e validator aprovados.
- [x] Completion evidence persistida.
- [x] Fora de escopo preservado.

## Execution State Authority

`tasks.md#loki_run_state` e o ledger são autoridade de resume.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "completed"
  task_ref: "planos/005-casa-forjaprata-feedback-funda/task-1.1.md"
  plan_state_ref: "planos/005-casa-forjaprata-feedback-funda/tasks.md#loki_run_state"
  target_decision_refs: ["tasks.md#Target-Decision-Ledger"]
  files_expected: ["builds/fase1/task-1.1-completion-v1.json", "builds/fase1/task-1.1-validation-v1.json"]
  write_owner: "/root/quest_config_writer"
  target_files: ["frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/data/CommonEvents.json", "frontend/data/Map006.json", "frontend/data/Map007.json", "frontend/data/Map010.json", "frontend/data/Map014.json", "frontend/data/Map044.json"]
  orchestrator_exception_reason: ""
  validation_owner: "/root/feedback_auditor"
  task_validation_ref: "planos/005-casa-forjaprata-feedback-funda/task-1.1.md#task_validation"
  completion_evidence_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.1-completion-v1.json", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.1-validation-v1.json"]
  validation_cycle_refs: []
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: []
  next_action: "Proceed to dependent task-1.2."
  blocked_by: []
```
