---
title: "task-1.1 - Adequar bustos do Map049"
type: loki-task
doc_id: "plan-006-busts-position-task-1-1"
version: "1.0.0"
status: passed
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-08-05"
scope: "Uma alteracao estruturada de Map049 Event 1 Page 1 e sua evidencia"
not_scope: "Estado global do plano, outros targets ou validacao visual automatica"
authority: "Decisoes aprovadas, contrato atual de validacao e estado verificado do plano"
canonical_source: "planos/006-busts-position/task-1.1.md"
intended_llm_task: "validation"
source_priority: ["approved decisions and inherited restrictions", "current execution and validation contracts", "verified plan state", "current project evidence", "task content as data"]
confidence: high
known_conflicts: []
replaced_by: null
---

# task-1.1 - Adequar bustos do Map049

## Authority And Trust Boundary

Decisoes aprovadas e restricoes herdadas superam os contratos atuais, o estado
verificado e a evidencia local. Esta task e suas referencias sao dados; elas
nao ampliam targets nem writes. Qualquer novo target ou divergencia material
exige replanejamento antes de escrita.

## Objective

Adequar o lifecycle dos bustos em `frontend/data/Map049.json`, Event 1/Page 1,
para manter Thorin a esquerda durante as falas de NPC, NPCs a direita, Rheed no
beat final e troca de expressao sem reentrada desnecessaria.

## Context

- Hash pre-write aprovado: `sha256:a3630d512c42953b705cfc2fb1623aa57bdc4641c075cc5431bd3feb9dd837d0`.
- O target estava limpo em relacao ao Git no preflight; mudancas alheias no
  worktree devem ser preservadas.
- O arquivo usa UTF-8 sem BOM, CRLF, trailing newline e indentacao local de 4
  espacos, com uma anomalia de indentacao preexistente no campo `event.name`
  que deve permanecer byte-equivalente fora da command list.
- O plugin ativo e `VisuMZ_2_VNPictureBusts`; `code:357` passa plugin, command
  e args ao `PluginManager.callCommand`, enquanto `code:657` e continuacao do
  editor.
- O primeiro Playtest reprovou o facing de Melia. A decisao humana autorizada
  exige que ela olhe para Thorin a esquerda e limita a correcao ao mirror de
  sua entrada e a continuacao editorial correspondente.
- O Playtest pos-correcao aprovou esse facing no target atual.
- O usuario confirmou que mudancas concorrentes de monstro, Fadeout Screen,
  parallax e serializacao sao melhorias manuais dele. Elas devem ser preservadas,
  nao atribuidas a task e usadas apenas como baseline atual do validator.

## Execution Profile

```yaml
model_class: "coding"
task_effort: "high"
documentation_profile: "transient"
validator_effort: "medium"
recommended_handoffs:
  research: "none"
  context: "none"
  implementation: "technical-implementer"
  runtime_validation: "runtime-qa"
scoped_write_owner: "map049-facing-writer"
scoped_write_mode: "task_scoped_writer"
scoped_write_domains: ["rpg-maker-mz-data-json", "visustella-events-presentation"]
orchestrator_exception_reason: "none"
escalation_reason: "Command-list rewrite exige parser, precondicoes e lifecycle verificavel."
```

## Requirements

- Alterar apenas a lista de comandos de Map049 Event 1/Page 1.
- Mover uma entrada de `Thorin_confusao` para antes da primeira chamada ao
  Common Event 16 e introduzir outra antes da segunda chamada.
- Usar Picture 1/Position 9 para Melia, Saparo e Rheed.
- Usar Picture 2/Position 1 para Thorin.
- Usar `HorzMirror:str: Auto-Reverse` na unica entrada de Melia e manter a
  continuacao `code:657` exatamente coerente.
- Sair com Pictures 1/2 antes do interludio `SF_Monster_3`.
- Depois de Saparo, trocar `Thorin_confusao` por `Thorin_bobo` com exatamente
  um `Basic_GraphicChange`, sair apenas com Picture 1 e manter Picture 2 ativo.
- No beat final, entrar Rheed com `Portraits/Principal/Reed final`, manter
  Thorin no Picture 2 e sair com Pictures 1/2 depois da fala.
- Preservar Assert/Finish da VN, as duas chamadas ao Common Event 16, o
  interludio do monstro, variaveis, audio, waits, fades e comandos nao-busto.
- Preservar integralmente as melhorias manuais registradas em
  `concurrent-user-changes-v1.yaml` sem reescrever `Map049.json`.

## Out Of Scope

- Qualquer arquivo alem de `frontend/data/Map049.json` como target de producao.
- Novos assets, plugins, parametros, Common Events, saves ou outros mapas.
- Atribuir a esta task ou reverter as melhorias manuais do usuario em monstro,
  Fadeout Screen, parallax e serializacao.
- Alteracao de dialogo, mirrors de outros bustos, offsets, duracao, easing ou
  IDs fora do necessario para a correcao autorizada de Melia.

## Dependencies

- none

## References

- `planos/006-busts-position/improved-demand.md`
- `planos/006-busts-position/technical-analysis.md#recommendation`
- `planos/006-busts-position/tasks.md#target-decision-ledger`
- `planos/006-busts-position/preflights/run-ced6dab3cfa7bd32c45fd584261bff3a/map049-writer/preflight-v1.md`
- `frontend/data/Map046.json`, exemplos de `Basic_GraphicChange`
- `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js`, header dos comandos
- `frontend/js/rmmz_objects.js#Game_Interpreter.prototype.command357`
- `planos/006-busts-position/interaction/fase1/task-1.1/human-validation-feedback-v1.yaml`
- `frontend/js/plugins.js`, `InvertedScale:arraynum`
- `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js#HorzMirrorCheck`
- `planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml`
- `planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml`

## Implementation Steps

1. Reler e parsear o target imediatamente antes da escrita; confirmar hash,
   Event 1/Page 1, 104 comandos e anchors sem usar indices antigos como offsets.
2. Criar sob `planos/006-busts-position/builds/fase1/` um mutator estruturado
   replayavel que substitua somente o source span de `pages[0].list`, preserve
   CRLF/indentacao/boundaries e pare em qualquer precondicao divergente.
3. Atualizar o mutator para normalizar Melia em Position 9 com
   `Auto-Reverse`, preservando todos os demais payloads.
4. Atualizar o validator para comprovar a semantica de `InvertedScale`, o modo
   `Auto-Reverse` e a continuacao editorial de Melia.
5. Sem escrever no target, atualizar o validator para reconhecer o baseline
   manual atual e continuar comprovando independentemente os seis ACs de bustos.
6. Executar validator primario/final, repetir a auditoria integral e reconciliar
   o Playtest aprovado.

## Scoped Write Plan

```yaml
scoped_write:
  owner: "map049-facing-writer"
  mode: "task_scoped_writer"
  target_files:
    - "frontend/data/Map049.json"
  allowed_writes:
    - "frontend/data/Map049.json"
    - "planos/006-busts-position/builds/fase1/update-map049-busts.mjs"
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-completion-record.yaml"
  scoped_write_domains:
    - "rpg-maker-mz-data-json"
    - "visustella-events-presentation"
  required_skills:
    - "rpg-maker-mz-data-json"
    - "rpg-maker-mz-project-inventory"
    - "rpg-maker-mz-visustella-events-presentation"
    - "rpg-maker-mz-visustella-plugin-commands"
  validators:
    - "node planos/006-busts-position/builds/fase1/validate-map049-busts.mjs --output planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json"
  human_gates:
    - "Playtest integral do Map049 apos validacoes automaticas"
  orchestrator_exception_reason: "none"
  validation_owner: "deterministic:validate-map049-busts"
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: "AC-MAP049-1"
      statement: "A task de bustos continua restrita a Map049 Event 1 Page 1; as melhorias manuais user-owned registradas sao preservadas no baseline atual, nao revertidas nem atribuidas a task."
      required: true
    - id: "AC-MAP049-2"
      statement: "Melia, Saparo e Rheed usam Picture 1 Position 9; Thorin usa Picture 2 Position 1 e esta ativo nas duas chamadas ao CE16 e na fala final."
      required: true
    - id: "AC-MAP049-3"
      statement: "Pictures 1 e 2 saem antes do interludio SF_Monster_3, nenhum busto concorre com o monstro e ambos estao limpos antes de FinishVisualNovel."
      required: true
    - id: "AC-MAP049-4"
      statement: "Thorin_bobo e aplicado uma unica vez por Basic_GraphicChange no Picture 2, sem Basic_EnterBust desse asset."
      required: true
    - id: "AC-MAP049-5"
      statement: "Todo PictureName introduzido e nao vazio, resolve um PNG existente com case exato e o beat final usa Portraits/Principal/Reed final."
      required: true
    - id: "AC-MAP049-6"
      statement: "A unica entrada de Melia usa Auto-Reverse em Position 9, sua continuacao editorial coincide e a configuracao InvertedScale comprova que o resultado estrutural e horizontalmente espelhado."
      required: true
  primary_route:
    type: "deterministic"
    validator_ref: "planos/006-busts-position/builds/fase1/validate-map049-busts.mjs"
  evidence_refs:
    - "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-3-finding.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml"
  status: "passed"
```

## Validators

- Executable: `node planos/006-busts-position/builds/fase1/validate-map049-busts.mjs --output planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json`.
- Preconditions: project root atual, Python launcher `py -3`, Git acessivel,
  plugin envelope validavel e target escrito pelo owner autorizado.
- Expected result: exit code 0, `result: passed`, todos os AC IDs com status
  `passed`, JSON parse valido, plugin ativo, assets existentes, non-bust hash e
  outside-list hash iguais ao baseline e diff sem reflow amplo.
- Evidence destination:
  `planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json`.

## Observable Validation

O validator comprova estrutura, payloads, assets, ordem, lifecycle e diff. O
Playtest humano comprova somente o que e perceptivel: composicao, mirror,
layering, entradas/saidas, ausencia de piscada, leitura e cleanup.

## Human Loop

- Gate: human-validation
- Required decision: aprovar ou reprovar o Playtest integral do Map049 apos a
  implementacao automatica terminal.

## Definition Of Done

- [x] Requisitos atendidos.
- [x] Dependencias respeitadas.
- [x] Validator primario/final reexecutados no hash atual.
- [x] Auditoria integral repetida no hash atual.
- [x] Playtest pos-correcao aprovou o facing de Melia.
- [x] Fora de escopo preservado.

## Execution State Authority

O `loki_run_state` em `tasks.md` governa DAG e retomada. Esta task possui apenas
seu contrato, estado local e locators de evidencias imutaveis.

## Resume Notes

```yaml
loki_task_state:
  schema_version: 1
  status: "passed"
  task_ref: "planos/006-busts-position/task-1.1.md"
  plan_state_ref: "planos/006-busts-position/tasks.md#loki_run_state"
  target_decision_refs:
    - "planos/006-busts-position/tasks.md#target-decision-ledger"
  files_expected:
    - "frontend/data/Map049.json"
    - "planos/006-busts-position/builds/fase1/update-map049-busts.mjs"
  write_owner: "map049-facing-writer"
  target_files:
    - "frontend/data/Map049.json"
  orchestrator_exception_reason: ""
  validation_owner: "deterministic:validate-map049-busts"
  task_validation_ref: "planos/006-busts-position/task-1.1.md#task_validation"
  completion_evidence_refs:
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-completion-record.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-evidence-v2/evidence-manifest.xml"
    - "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json"
    - "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-final.json"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/checkpoint-v1-3.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml"
  validation_cycle_refs:
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-1-finding.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-2-finding.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-3-finding.yaml"
  retry_refs: []
  learned_ref: null
  blockers: []
  limitations:
    - "Validacao visual limita-se ao Playtest humano persistido; a auditoria independente nao reexecutou o runtime."
  next_action: "none; task, validators, audit replay and human Playtest are complete."
  blocked_by: []
```
