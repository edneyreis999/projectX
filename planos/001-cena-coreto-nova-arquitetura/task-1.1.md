---
title: "task-1.1 - Adaptador PKD e registro canônico"
type: loki-task
doc_id: "001-cena-coreto-task-1.1"
version: "1.0.0"
status: completed
phase: fase1
task_id: task-1.1
last_updated: "2026-07-30"
scope: "Adaptar QuestCore ao PKD e declarar a máquina de estados noite-da-historia."
---

# task-1.1 - Adaptador PKD e registro canônico

## Objective

Tornar `Coreto_QuestCore` a única autoridade de `noite-da-historia`, sincronizada com PKD_SimpleQuestSystem e sem dependência de VisuMZ_2_QuestSystem.

## Requirements

- Usar V106, nomeada `v_qNoiteDaHistoria_stage`, com estados 0, 10, 20 e 90.
- Criar `CoretoQuests.json` com questKey `noite-da-historia`, entrada VN e projeção PKD para `assistirNoiteHistoria`.
- Preservar a API pública de QuestCore, QuestVN e Cutscene; adaptar somente a fronteira de backend.
- Manter uma única entrada ativa de PKD e ativar Coreto_QuestCore → Coreto_QuestVN → Coreto_Cutscene nessa ordem.

## Out Of Scope

- VisuMZ_2_QuestSystem, outras quests, saves legados e parâmetros não relacionados do PKD.

## Dependencies

- none

## References

- `analise-tecnica.md` — decisões humanas e restrições.
- `frontend/js/plugins/PKD_SimpleQuestSystem.js` — API `SQSM`.
- `frontend/js/plugins/Coreto_QuestCore.js` — registry e transições.

## Scoped Write Plan

```yaml
scoped_write:
  owner: technical-implementer
  mode: task_scoped_writer
  target_files:
    - frontend/js/plugins/Coreto_QuestCore.js
    - frontend/js/plugins.js
    - frontend/data/CoretoQuests.json
    - frontend/data/System.json
  allowed_writes:
    - frontend/js/plugins/Coreto_QuestCore.js
    - frontend/js/plugins.js
    - frontend/data/CoretoQuests.json
    - frontend/data/System.json
  required_skills: [rpg-maker-mz-plugin-workflow, rpg-maker-mz-data-json]
  validators: [node --check, plugins-envelope, JSON parse, registry static scan]
  human_gates: [Plugin Manager open/save/reopen, New Game playtest]
  validation_owner: runtime-qa
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: task-1.1-ac-1
      statement: "QuestCore no longer requires VisuMZ_2_QuestSystem and projects noite-da-historia idempotently through the documented PKD SQSM API."
      required: true
    - id: task-1.1-ac-2
      statement: "The registry, System.json, and plugins.js declare the canonical stage variable and one active PKD plus ordered Coreto plugins."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/001-cena-coreto-nova-arquitetura/builds/fase1/validate-architecture.mjs
  evidence_refs:
    - planos/001-cena-coreto-nova-arquitetura/builds/administrative-terminal-evidence-v1.json
  status: passed
```

## Validators

- `node --check frontend/js/plugins/Coreto_QuestCore.js`.
- JSON parse plus architecture validator retained under `builds/fase1/`.

## Human Loop

- Gate: human-validation
- Required decision: Open, save and reopen Plugin Manager; then New Game Playtest.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: completed
  task_ref: planos/001-cena-coreto-nova-arquitetura/task-1.1.md
  plan_state_ref: planos/001-cena-coreto-nova-arquitetura/tasks.md#loki_run_state
  target_decision_refs: [frontend/js/plugins/Coreto_QuestCore.js, frontend/js/plugins.js, frontend/data/CoretoQuests.json, frontend/data/System.json]
  files_expected: [frontend/js/plugins/Coreto_QuestCore.js, frontend/js/plugins.js, frontend/data/CoretoQuests.json, frontend/data/System.json]
  write_owner: technical-implementer
  target_files: [frontend/js/plugins/Coreto_QuestCore.js, frontend/js/plugins.js, frontend/data/CoretoQuests.json, frontend/data/System.json]
  orchestrator_exception_reason: ""
  validation_owner: runtime-qa
  task_validation_ref: planos/001-cena-coreto-nova-arquitetura/task-1.1.md#task_validation
  completion_evidence_refs:
    - planos/001-cena-coreto-nova-arquitetura/builds/administrative-terminal-evidence-v1.json
    - retrospetivas/fase2/retrospectiva-fase2-cena-coreto-nova-arquitetura.md
  validation_cycle_refs:
    - planos/001-cena-coreto-nova-arquitetura/builds/administrative-terminal-evidence-v1.json
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: ["Completion was reconciled manually because the legacy run identity is non-canonical under the current Loki contract."]
  next_action: "none"
  blocked_by: []
```
