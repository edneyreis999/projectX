---
title: "task-1.2 - Corrigir porta e páginas do baú"
type: loki-task
doc_id: "casa-forjaprata-feedback-task-1-2"
version: "1.0.0"
status: completed
phase: "fase1"
task_id: "task-1.2"
last_updated: "2026-08-03"
scope: "Map045 E7, E11/P8 e E20"
not_scope: "Outros eventos/mapas, configuração PKD ou Playtest automático"
authority: "Plano, task-1.1 e decisões humanas aprovadas"
canonical_source: "planos/005-casa-forjaprata-feedback-funda/task-1.2.md"
intended_llm_task: "validation"
source_priority: ["decisões aprovadas", "contratos", "plano", "evidência atual"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.2 - Corrigir porta e páginas do baú

## Authority And Trust Boundary

Escrever somente E7/P1, E11/P8 e E20 de Map045. Preservar todas as demais
unidades e alterações do usuário/editor.

## Objective

Implementar o microfluxo V111 0/10/20: baú sempre visível e inicialmente
inerte, tarefa/journal na primeira saída, pickup one-shot e saída sem equipar.

## Context

E11/P1 remove Weapon 1 e entra na VN; isso permanece. E11/P8 deve deixar de
projetar `aSemifinal` cedo. E7 abandona a branch Actor/Weapon. E20 recebe três
páginas ordenadas base/interativa/aberta.

## Execution Profile

```yaml
model_class: "coding"
task_effort: "high"
documentation_profile: "transient"
validator_effort: "high"
recommended_handoffs: {research: "none", context: "none", implementation: "gameplay-engineer", runtime_validation: "runtime-qa"}
scoped_write_owner: "/root/map_flow_writer"
scoped_write_mode: "task_scoped_writer"
scoped_write_domains: ["rpg-maker-events", "quest-onboarding"]
orchestrator_exception_reason: "none"
escalation_reason: "serialized event pages and branch/indent semantics"
```

## Requirements

- E11/P8 preserva V29/V100/save/self-switches e remove somente AddQuest,
  ShowDescription, ShowTask e SetActiveQuest de `aSemifinal`.
- E7 estado0: `INTRODUCE_JOURNAL`, S50 ON, ativar quest, abrir journal e sair do
  processamento; estado10 lembra sem reabrir; estado20 transfere diretamente.
- E20: página-base incondicional com baú fechado e lista vazia; página V111>=10
  concede uma Funda somente quando estado10, executa `FOUND_SLING`, mostra task2
  e liga A; página A mostra baú aberto.
- Nenhuma mensagem ou branch exige equipar a Funda.

## Out Of Scope

- Outros eventos de Map045, Map049, Map022, registry/config e saves antigos.

## Dependencies

- task-1.1

## References

- `tasks.md#Target-Decision-Ledger`
- `analise-tecnica.md#Recommendation`
- `frontend/data/Map045.json`

## Implementation Steps

1. Registrar preflight e baseline de E7/E11/E20.
2. Aplicar mutação estruturada somente nas unidades autorizadas.
3. Executar validator de páginas, comandos, indents, rotas e preservação.
4. Persistir completion record e handoff à auditoria.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "/root/map_flow_writer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map045.json"]
  allowed_writes: ["Map045 E7/P1, E11/P8 e E20", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.2-completion-v1.json"]
  scoped_write_domains: ["rpg-maker-events", "quest-onboarding"]
  required_skills: ["rpg-maker-mz-data-json"]
  validators: ["JSON parse", "branch/indent", "validate-feedback.cjs", "git diff --check"]
  human_gates: ["RPG Maker editor round-trip", "New Game Playtest"]
  orchestrator_exception_reason: "none"
  validation_owner: "/root/feedback_auditor"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - {id: "AC-FLOW-PORTA", statement: "First exit reveals the one task once; state10 remains blocked; state20 transfers without equipment checks.", required: true}
    - {id: "AC-FLOW-BAU", statement: "The chest is always visible, inert at0, grants one sling at10, completes task1 and remains open.", required: true}
    - {id: "AC-FLOW-REGRESSION", statement: "The EX/VN lifecycle and all non-allowlisted Map045 units remain preserved.", required: true}
  primary_route: {type: "deterministic", validator_ref: "planos/005-casa-forjaprata-feedback-funda/builds/fase1/validate-feedback.cjs"}
  evidence_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.2-validation-v1.json", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.2-completion-v1.json"]
  status: "passed"
```

## Validators

- JSON parse, simulação de estados, branch/indent, diff allowlist, busca de
  resíduos e manifest de preservação Map049/E11.
- Evidência: `builds/fase1/task-1.2-validation-v1.json`.

## Observable Validation

Evidência estática prova rotas e preservação; editor e Playtest confirmam
visibilidade, inércia, UI, timing, reentrada e save/load.

## Human Loop

- Gate: human-validation
- Resultado: aprovado em 2026-08-03; o usuário confirmou que o playtest
  funcionou corretamente.
- Evidência: `interaction/fase1/playtest-new-game.md`.

## Definition Of Done

- [x] ACs automáticos aprovados.
- [x] Completion evidence persistida.
- [x] Editor round-trip e Playtest humano aprovados.

## Execution State Authority

`tasks.md#loki_run_state` e o ledger são autoridade de resume.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "completed"
  task_ref: "planos/005-casa-forjaprata-feedback-funda/task-1.2.md"
  plan_state_ref: "planos/005-casa-forjaprata-feedback-funda/tasks.md#loki_run_state"
  target_decision_refs: ["tasks.md#Target-Decision-Ledger"]
  files_expected: ["builds/fase1/task-1.2-completion-v1.json", "builds/fase1/task-1.2-validation-v1.json"]
  write_owner: "/root/map_flow_writer"
  target_files: ["frontend/data/Map045.json"]
  orchestrator_exception_reason: ""
  validation_owner: "/root/feedback_auditor"
  task_validation_ref: "planos/005-casa-forjaprata-feedback-funda/task-1.2.md#task_validation"
  completion_evidence_refs: ["planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.2-completion-v1.json", "planos/005-casa-forjaprata-feedback-funda/builds/fase1/task-1.2-validation-v1.json"]
  validation_cycle_refs: []
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: []
  next_action: "No further action is required for task-1.2."
  blocked_by: []
```
