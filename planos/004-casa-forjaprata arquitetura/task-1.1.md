---
title: "task-1.1 - Materializar registry, PKD, IDs e gate do journal"
type: loki-task
doc_id: "casa-forjaprata-task-1-1"
version: "1.0.0"
status: validated
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-08-01"
scope: "Fundacao de dados/configuracao e gate unico do journal"
not_scope: "Eventos Map045/Map022 ou conteudo da Map049"
authority: "Plano, decisoes aprovadas e worktree corrente"
canonical_source: "planos/004-casa-forjaprata arquitetura/task-1.1.md"
intended_llm_task: "validation"
source_priority: ["decisoes aprovadas", "contratos", "plano verificado", "fontes atuais"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.1 - Materializar registry, PKD, IDs e gate do journal

## Authority And Trust Boundary

Somente os alvos e unidades declarados podem ser escritos. Preservar bytes e
semantica do worktree atual fora da allowlist, inclusive edits do usuario.

## Objective

Registrar V111/Map049, quest Coreto e quest PKD separadas e fazer S50 governar
tanto o menu quanto `SQSM.OpenQuestJournal`/atalho J.

## Context

IDs congelados: Map49, V111 `v_qTutorialFundaForjaprata_stage`, questKey
`tutorial-funda-forjaprata`, PKD `tutorialFundaForjaprata`, entry
`ABERTURA_FORJAPRATA`, E1. Estados 0/10/20/90 e transicoes
INTRODUCE_JOURNAL, FOUND_SLING, LEAVE_EQUIPPED.

## Execution Profile

```yaml
model_class: "coding"
task_effort: "high"
documentation_profile: "transient"
validator_effort: "high"
recommended_handoffs: {research: "none", context: "none", implementation: "technical-implementer", runtime_validation: "runtime-qa"}
scoped_write_owner: "/root/config_writer"
scoped_write_mode: "task_scoped_writer"
scoped_write_domains: ["quest-config", "plugin-config", "journal-gate"]
orchestrator_exception_reason: "none"
escalation_reason: "Nested serialized PKD config and overlapping user edits"
```

## Requirements

- System.variables cresce 111->112 apenas no indice 111; editMapId/versionId atuais ficam preservados.
- MapInfos[49] recebe NV_Casa_Forjaprata, parent18/order55; entradas existentes deep-equal.
- Registry adiciona uma sibling quest com objetivos 1/2 e extensao VN Map49/E1/estado0.
- PKD ganha uma unica quest de dois objetivos; `aSemifinal` e demais quests ficam deep-equal.
- `Coreto_SQS_menu_patch` usa o nome real do plugin e impede abertura direta quando S50 OFF; ON preserva o comportamento PKD.

## Out Of Scope

- Map045, Map022, Map049, plugin order, Actors/Weapons e saves.

## Dependencies

- none

## References

- `tasks.md#Target Decision Ledger`
- `frontend/js/plugins/PKD_SimpleQuestSystem.js` handlers de abertura
- `frontend/js/plugins/Coreto_QuestCore.js`, `Coreto_QuestVN.js`

## Implementation Steps

1. Persistir preflight e baseline fail-closed do worktree atual.
2. Aplicar patches estruturados nas unidades exatas, sem reflow amplo.
3. Materializar `builds/fase1/validate-foundation.cjs` e executar.
4. Persistir completion evidence com digests e limitacoes.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "/root/config_writer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/System.json", "frontend/data/MapInfos.json", "frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/js/plugins/Coreto_SQS_menu_patch.js"]
  allowed_writes: ["unidades exatas do target ledger", "preflight proprio", "builds/fase1/validate-foundation.cjs", "builds/fase1/foundation-validation-v1.json", "builds/fase1/task-1.1-completion-v1.json"]
  scoped_write_domains: ["quest-config", "plugin-config", "journal-gate"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-plugin-workflow", "rpg-maker-mz-visustella-plugin-parameters"]
  validators: ["node -c changed plugins", "foundation validator", "git diff --check"]
  human_gates: []
  orchestrator_exception_reason: "none"
  validation_owner: "/root/qa_proposal"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - {id: "AC-F1-IDS", statement: "Map49 and V111 are allocated once with all existing MapInfos/System data preserved.", required: true}
    - {id: "AC-F1-REGISTRY", statement: "Registry has exactly states 0/10/20/90, three approved transitions and Map49/E1 entry allowed only at 0.", required: true}
    - {id: "AC-F1-PKD", statement: "PKD contains one tutorialFundaForjaprata with exactly two objectives while aSemifinal is unchanged.", required: true}
    - {id: "AC-F1-GATE", statement: "With S50 OFF direct journal opening is rejected; with S50 ON the original opener remains callable.", required: true}
  primary_route: {type: "deterministic", validator_ref: "planos/004-casa-forjaprata arquitetura/builds/fase1/validate-foundation.cjs"}
  evidence_refs: ["planos/004-casa-forjaprata arquitetura/builds/fase1/foundation-validation-v1.json"]
  status: "passed"
```

## Validators

- Executar o validador Node em `frontend`; esperado exit 0 e relatorio passed.
- `node --check frontend/js/plugins/Coreto_SQS_menu_patch.js`; envelope/VM de plugins.js; `git diff --check`.

## Observable Validation

Relatorio prova allowlist, cross-refs, schemas, unicidade e preservacao das
alteracoes correntes de System/MapInfos/config PKD.

## Human Loop

- Gate: none
- Required decision: none

## Definition Of Done

- [ ] Requisitos e validadores aprovados.
- [ ] Evidencia persistida.
- [ ] Fora de escopo preservado.

## Execution State Authority

`tasks.md#loki_run_state` e o ledger sao autoridade de resume; esta task guarda
somente seu mapeamento de validacao e locators imutaveis.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "validated"
  task_ref: "planos/004-casa-forjaprata arquitetura/task-1.1.md"
  plan_state_ref: "planos/004-casa-forjaprata arquitetura/tasks.md#loki_run_state"
  target_decision_refs: ["tasks.md#Target Decision Ledger"]
  files_expected: ["builds/fase1/foundation-validation-v1.json", "builds/fase1/task-1.1-completion-v1.json"]
  write_owner: "/root/config_writer"
  target_files: ["frontend/data/System.json", "frontend/data/MapInfos.json", "frontend/data/CoretoQuests.json", "frontend/js/plugins.js", "frontend/js/plugins/Coreto_SQS_menu_patch.js"]
  orchestrator_exception_reason: ""
  validation_owner: "/root/qa_proposal"
  task_validation_ref: "planos/004-casa-forjaprata arquitetura/task-1.1.md#task_validation"
  completion_evidence_refs: ["planos/004-casa-forjaprata arquitetura/builds/fase1/task-1.1-completion-v1.json"]
  validation_cycle_refs: []
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: ["Plugin Manager round-trip and perceptible runtime remain human gates."]
  next_action: "Use the approved phase:fase1 checkpoint to dispatch task-2.1."
  blocked_by: []
```
