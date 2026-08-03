---
title: "task-2.1 - Implementar lifecycle EX/VN, porta e bau"
type: loki-task
doc_id: "casa-forjaprata-task-2-1"
version: "1.0.0"
status: validated-static
phase: "fase2"
task_id: "task-2.1"
last_updated: "2026-08-01"
scope: "Map049 e eventos exatos de Map045/Map022"
not_scope: "Outros mapas, database, aSemifinal registry ou Playtest automatico"
authority: "Plano, task-1.1 validada e decisoes aprovadas"
canonical_source: "planos/004-casa-forjaprata arquitetura/task-2.1.md"
intended_llm_task: "validation"
source_priority: ["decisoes aprovadas", "contratos", "plano", "evidencia atual"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-2.1 - Implementar lifecycle EX/VN, porta e bau

## Authority And Trust Boundary

Escrever apenas Map049 e as unidades E7/E11/E20 de Map045 e E30/P1 de Map022.
Preservar todas as outras paginas/eventos e alteracoes do usuario.

## Objective

Migrar a apresentacao inicial para VN e implementar a state machine 0/10/20/90
com journal one-shot, bau liberado apos a primeira tentativa e saida somente
com Weapon 1 equipada no Actor 3.

## Context

E11/P1 atual tem 138 comandos. O Writer deve congelar classificacao 138/138
antes de mutar. Use Self Switch D transitoria para post-return; A continua a
terminacao original e B continua pertencendo ao fluxo posterior. Remover a
Funda por Change Weapons Weapon1/decrease1/includeEquip=true antes de entregar
controle. E20 permanece em (19,14), sujeito a gate humano visual.

## Execution Profile

```yaml
model_class: "coding"
task_effort: "high"
documentation_profile: "transient"
validator_effort: "high"
recommended_handoffs: {research: "none", context: "none", implementation: "technical-implementer", runtime_validation: "runtime-qa"}
scoped_write_owner: "/root/gameplay_writer"
scoped_write_mode: "task_scoped_writer"
scoped_write_domains: ["rpg-maker-events", "quest-vn", "onboarding"]
orchestrator_exception_reason: "none"
escalation_reason: "Lifecycle entre mapas e evento serializado sensivel"
```

## Requirements

- Map049 e VN, E1 Action Button, Assert session/state primeiro, Finish pareado; sem Transfer Player direto.
- Manifest cobre 138/138 comandos antigos como EX, VN, replacement ou remocao aprovada.
- E11 preserva paginas nao alvo, remove Funda antes do controle, usa D para post-return e nao abre journal.
- E7: 0 introduz/abre uma vez; 10 lembra localizar; 20 exige branch `[4,3,4,1]`; 90 permite saida.
- E20: invisivel antes de 10, um grant Weapon1, transicao 10->20, bau aberto persistente e fail-closed em estados maiores.
- Map022 E30 deixa de ligar S50 antecipadamente, sem alterar comandos adjacentes.

## Out Of Scope

- Registry/config task-1.1, Actors/Weapons, Map046, Map004/005 e saves legados.

## Dependencies

- task-1.1

## References

- `tasks.md#Target Decision Ledger`
- `analise-tecnica.md#Recommendation`
- `frontend/data/Map045.json`, `Map022.json`, `Map046.json`
- `frontend/js/plugins/Coreto_QuestVN.js`

## Implementation Steps

1. Persistir preflight/baseline e manifest 138/138 antes da escrita.
2. Criar Map049 e refatorar E11 com prelude/return idempotentes.
3. Implementar E7/E20 e remover o writer S50 de Map022.
4. Materializar e executar validador deterministico e persistir evidencia.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "/root/gameplay_writer"
  mode: "task_scoped_writer"
  target_files: ["frontend/data/Map049.json", "frontend/data/Map045.json", "frontend/data/Map022.json"]
  allowed_writes: ["unidades exatas do target ledger", "preflight proprio", "builds/fase2/e11-migration-manifest-v1.json", "builds/fase2/validate-feature.cjs", "builds/fase2/feature-validation-v1.json", "builds/fase2/task-2.1-completion-v1.json"]
  scoped_write_domains: ["rpg-maker-events", "quest-vn", "onboarding"]
  required_skills: ["rpg-maker-mz-data-json", "rpg-maker-mz-visustella-plugin-commands", "rpg-maker-mz-visustella-events-presentation"]
  validators: ["feature validator", "node JSON parse", "git diff --check"]
  human_gates: ["RPG Maker round-trip", "New Game Playtest"]
  orchestrator_exception_reason: "none"
  validation_owner: "/root/qa_proposal"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - {id: "AC-F2-VN", statement: "Map045 remains EX and one Map049 VN session migrates only E11/P1 presentation with paired Assert/Finish.", required: true}
    - {id: "AC-F2-FLOW", statement: "Routes 0/10/20/90 enforce one journal introduction, one sling grant and Actor3/Weapon1-only exit.", required: true}
    - {id: "AC-F2-JOURNAL", statement: "S50 stays off until the first blocked exit and repeated attempts do not reopen the journal.", required: true}
    - {id: "AC-F2-REGRESSION", statement: "aSemifinal setup and every non-allowlisted map unit remain semantically unchanged.", required: true}
  primary_route: {type: "deterministic", validator_ref: "planos/004-casa-forjaprata arquitetura/builds/fase2/validate-feature.cjs"}
  evidence_refs: ["planos/004-casa-forjaprata arquitetura/builds/fase2/feature-validation-v1.json"]
  status: "passed"
```

## Validators

- Executar `node builds/fase2/validate-feature.cjs` a partir da raiz; esperado passed.
- Enumerar estados/equipamento, validar indents/payloads e diff allowlist; `git diff --check`.

## Observable Validation

Evidencia estatica aprova lifecycle, rotas e preservacao. Editor e Playtest
devem observar timing, reachability, posicao do bau, UI e save/load.

## Human Loop

- Gate: human-validation
- Required decision: confirmar round-trip e matriz New Game; ate la status final e pending-human-validation.

## Definition Of Done

- [ ] Requisitos e validadores estaticos aprovados.
- [ ] Manifest/evidencia persistidos.
- [ ] Fora de escopo preservado.
- [ ] Limitacao de Playtest declarada.

## Execution State Authority

`tasks.md#loki_run_state` e o ledger governam resume; ciclos e auditorias sao
imutaveis e nao podem ser reconstruidos do chat.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "validated-static"
  task_ref: "planos/004-casa-forjaprata arquitetura/task-2.1.md"
  plan_state_ref: "planos/004-casa-forjaprata arquitetura/tasks.md#loki_run_state"
  target_decision_refs: ["tasks.md#Target Decision Ledger"]
  files_expected: ["builds/fase2/e11-migration-manifest-v1.json", "builds/fase2/feature-validation-v1.json", "builds/fase2/task-2.1-completion-v1.json"]
  write_owner: "/root/gameplay_writer"
  target_files: ["frontend/data/Map049.json", "frontend/data/Map045.json", "frontend/data/Map022.json"]
  orchestrator_exception_reason: ""
  validation_owner: "/root/qa_proposal"
  task_validation_ref: "planos/004-casa-forjaprata arquitetura/task-2.1.md#task_validation"
  completion_evidence_refs: ["planos/004-casa-forjaprata arquitetura/builds/fase2/task-2.1-completion-v1.json"]
  validation_cycle_refs: []
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations: ["editor/Playtest pending"]
  next_action: "Execute interaction/fase2/playtest-new-game.md and persist human-validation evidence."
  blocked_by: []
```
