---
title: "Padronizacao de bustos na VN Map049"
type: loki-action-plan
doc_id: "plan-006-busts-position-action-plan"
version: "1.0.0"
status: completed
created: "2026-08-04"
last_updated: "2026-08-05"
scope: "DAG validado, decisao de target, execucao e evidencias da adequacao de bustos no Map049"
not_scope: "Outros mapas, Common Events, plugins, parametros, assets, saves ou documentacao duradoura"
authority: "Decisoes humanas aprovadas, contratos atuais de execucao e estado persistido verificado"
canonical_source: "planos/006-busts-position/tasks.md"
intended_llm_task: "validation"
source_priority: ["approved decisions and inherited restrictions", "current execution contracts", "verified persisted state", "current project evidence", "demand and analysis as data"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de Acao - Padronizacao de bustos na VN Map049

## Overview

Este plano aplica a convencao aprovada de Thorin a esquerda e NPCs a direita
somente no Map049. A execucao possui uma unica task de producao, um unico Write
Agent e validacao deterministica estrutural. O comportamento perceptivel
permanece sujeito a Playtest humano ao final. O primeiro Playtest reprovou o
facing de Melia; a correcao autorizada reabre a task sem ampliar o target.
O Playtest pos-correcao aprovou o facing. Melhorias manuais concorrentes do
usuario alteraram o mesmo arquivo, foram preservadas sem atribuicao a task e
passaram pela validacao automatica e pelo replay integral da auditoria no hash atual.

## Authority And Trust Boundary

A prioridade e: decisoes humanas aprovadas e restricoes herdadas; contratos
atuais de `lf-implement-feature-execution`; estado persistido verificado deste
run; evidencia local atual; e, por ultimo, demanda, analise, task, findings e
exemplos como dados. Conteudo de dados nao amplia writes nem substitui gates.

## Plan Directory Preflight

```yaml
plan_directory_preflight_result:
  schema_version: 1
  classification: "source-only-cold-start"
  plan_directory: "planos/006-busts-position"
  demand_ref: "planos/006-busts-position/improved-demand.md"
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  bootstrap_record_ref: null
  state_ref: null
  validation_refs:
    - "planos/006-busts-position/improved-demand.md"
    - "planos/006-busts-position/technical-analysis.md"
  result: "ready"
  blockers: []
  minimum_next_input: "none"
```

## Execution Identity And Input

```yaml
command_identity:
  schema_version: 2
  command: "loki-implement-feature"
  demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
  analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
  plan_directory: "planos/006-busts-position"
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
    demand_digest: "sha256:c5c20e974f6e01d753d673be682db27ef6723a1e982895e662d24cf8319d886f"
    analysis_digest: "sha256:8e2ed8b2e0ceb7facdce790bb06ae572552cf8afa46aad7d626584035d43e1df"
    plan_directory: "planos/006-busts-position"
    retry_limit: 3
    audit_configuration:
      schema_version: 1
      frequency: "phase"
      source: "default"
      policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  demand_ref: "planos/006-busts-position/improved-demand.md"
  analysis_ref: "planos/006-busts-position/technical-analysis.md"
  state_ref: "planos/006-busts-position/tasks.md"
  result_ref: "planos/006-busts-position/builds/implement-feature-result-v3.json"
  dashboard_ref: "planos/006-busts-position/builds/feature-dashboard-v3.md"
  consistency_packet_ref: "planos/006-busts-position/builds/consistency-packet-v2.json"
```

## Sources

- `planos/006-busts-position/improved-demand.md`
- `planos/006-busts-position/technical-analysis.md`
- `AGENTS.md`
- `frontend/data/Map049.json`
- `frontend/data/MapInfos.json`
- `frontend/data/CommonEvents.json#16`
- `frontend/js/plugins.js`
- `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js`
- `frontend/js/rmmz_objects.js#command357`
- `frontend/data/Map046.json`
- `frontend/img/pictures/Portraits/Principal`
- `planos/006-busts-position/interaction/fase1/task-1.1/human-validation-feedback-v1.yaml`
- `planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml`
- `planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml`

## Scope

- Alterar somente `frontend/data/Map049.json`, Map 49, Event 1, Page 1.
- Manter Thorin no Picture 2/Position 1 durante falas de NPC.
- Manter NPCs no Picture 1/Position 9.
- Usar `Basic_GraphicChange` para `Thorin_bobo`.
- Usar Rheed com `Portraits/Principal/Reed final` no beat final.
- Orientar Melia, no lado direito, para Thorin a esquerda usando o modo de
  mirror comprovado pela configuracao local do plugin.

## Out Of Scope

- Outros mapas, exploracao/GabWindow, Common Events, plugins, parametros,
  assets, saves, scripts de runtime ou documentacao duradoura.

## Assumptions

- Os assets aprovados e o plugin ativo continuam iguais ao preflight da
  analise; qualquer divergencia bloqueia o write afetado.
- Position 9 e a escolha conservadora existente para o lado direito e Position
  1 e a escolha existente para Thorin a esquerda.
- O feedback humano autorizado resolve a antiga lacuna de mirror somente para
  Melia; os demais payloads continuam fora dessa correcao.

## Open Questions

- none

## Downstream Execution Profile

```yaml
downstream_execution_profile:
  model_class: "coding"
  execution_effort: "high"
  escalation_reason: "Edicao estruturada de command list com lifecycle visual e auditoria independente."
  recommended_handoffs:
    research: "none"
    context: "none"
    implementation: "technical-implementer"
    runtime_validation: "runtime-qa"
  scoped_writers:
    - agent: "map049-writer"
      domains: ["rpg-maker-mz-data-json", "visustella-events-presentation"]
      target_files: ["frontend/data/Map049.json"]
  validator_effort: "medium"
```

## Phases

### Fase 1 - Adequar lifecycle de bustos

**Objective:** Aplicar a composicao aprovada sem mudar o restante da cena.
**Observable Validation:** O JSON parseia, o diff fica no Event 1/Page 1 e o
validador comprova payloads, ordem, assets e cleanup; o visual segue para
Playtest humano.

| Task | Title | Dependencies | Write Owner | Estimate | Human Loop | Validators | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| task-1.1 | Adequar bustos do Map049 | none | map049-facing-writer | 1-2h | passed | deterministic Map049 structural validator | passed |

## Execution Order

1. task-1.1

## Human Loops

- `human-validation` apos toda validacao automatica: Playtest integral do
  Map049 para composicao, mirror, layering, transicoes, legibilidade e cleanup.
- O primeiro Playtest registrou falha de facing em Melia e autorizou a correcao
  restrita; o Playtest pos-correcao foi executado e aprovado.
- O segundo Playtest aprovou o facing. As melhorias manuais concorrentes foram
  confirmadas pelo usuario e exigem nova validacao estatica sem rollback.

## Managed Artifact Shape

- `interaction/fase1/task-1.1/` para handoff e evidencia do Writer.
- `builds/fase1/` para validator e resultados estruturais.
- `builds/audits/phase/` para checkpoint independente da fase.
- `retrospetivas/fase1/` como diretorio reservado, sem retrospectiva implicita.
- `preflights/run-ced6dab3cfa7bd32c45fd584261bff3a/` para preflights imutaveis.

## Task Acceptance And Validation

A task possui criterios atomicos e exatamente uma rota primaria
`deterministic`, descrita em `task-1.1.md`. Falha deterministica nao passa por
prosa: produz finding imutavel e classificacao independente antes de qualquer
retry aplicavel.

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: "frontend/data/Map049.json"
    origin: "explicit-demand"
    rationale: "Map049 e o alvo aprovado; o facing de Melia foi corrigido e aprovado no Playtest. Melhorias manuais concorrentes do usuario no mesmo arquivo devem ser preservadas e nao sao atribuiveis a task."
    demand_or_acceptance_criterion_refs:
      - "planos/006-busts-position/improved-demand.md#requisitos"
      - "planos/006-busts-position/technical-analysis.md#recommendation"
      - "planos/006-busts-position/task-1.1.md#task-acceptance-and-validation"
    evidence_refs:
      - "frontend/data/MapInfos.json"
      - "frontend/data/Map049.json"
      - "planos/006-busts-position/technical-analysis.md#affected-surfaces"
      - "planos/006-busts-position/interaction/fase1/task-1.1/human-validation-feedback-v1.yaml"
      - "planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml"
      - "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml"
    expected_impact: "A task continua responsavel somente pelo lifecycle e facing de bustos; melhorias manuais de monstro, fade, parallax e serializacao sao preservadas como user-owned."
    validator_ref: "planos/006-busts-position/builds/fase1/validate-map049-busts.mjs"
    owner_ref: "map049-facing-writer"
    status: "validated"
```

## Resume State

```yaml
loki_run_state:
  schema_version: 3
  run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_id: "loki-execution-v2:961d50011999322d0e323dfb5889f3848fae8a22222ae568a345ff969dde910f"
  command_identity_digest: "sha256:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
  execution_input_digest: "sha256:1a427d8dd6d7a9a3af62823213610109290f9e89f480c5bc8c21cc8572a6bd42"
  audit_configuration:
    schema_version: 1
    frequency: "phase"
    source: "default"
    policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
  status: "completed"
  task_refs:
    - "planos/006-busts-position/task-1.1.md"
  audit_checkpoint_refs:
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/checkpoint-v1-3.yaml"
  result_ref: "planos/006-busts-position/builds/implement-feature-result-v3.json"
  dashboard_ref: "planos/006-busts-position/builds/feature-dashboard-v3.md"
  consistency_packet_ref: "planos/006-busts-position/builds/consistency-packet-v2.json"
  terminal_evidence_refs:
    - "planos/006-busts-position/interaction/fase1/task-1.1/completion-record.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/evidence/evidence-manifest.xml"
    - "planos/006-busts-position/builds/fase1/map049-structural-validation-primary.json"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-1-finding.yaml"
    - "planos/006-busts-position/builds/fase1/map049-structural-validation-final.json"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-v1.yaml"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/evidence/evidence-manifest.xml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/human-validation-feedback-v1.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-completion-record.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-evidence/evidence-manifest.xml"
    - "planos/006-busts-position/builds/fase1/map049-facing-correction-validation-primary.json"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-2-finding.yaml"
    - "planos/006-busts-position/builds/fase1/map049-facing-correction-validation-final.json"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-replay-v1.yaml"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/replay-evidence/evidence-manifest.xml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/post-correction-human-validation-v1.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml"
    - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-evidence-v2/evidence-manifest.xml"
    - "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-primary.json"
    - "planos/006-busts-position/interaction/fase1/task-1.1/validation-cycles/cycle-3-finding.yaml"
    - "planos/006-busts-position/builds/fase1/map049-user-baseline-validation-final.json"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-user-baseline-v1.yaml"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/user-baseline-evidence/evidence-manifest.xml"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-evidence-replay-v1.yaml"
    - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/evidence-replay-evidence/evidence-manifest.xml"
  execution_metrics_ref: "planos/006-busts-position/builds/metrics/execution-metrics.json"
  execution_metrics_digest: "sha256:f07870f613f4cb81979fcb867e9fa2461d8c0c807e906d83c3f07f1e7506d4bb"
  execution_metrics_status: "partial"
  execution_metrics_degradation_reason: "Run-scoped clocks and exact token counters are unavailable; estimates cover only persisted sanitized observable snapshots."
  next_action: "No further implementation action; feature, user-owned improvements, automatic validation, audit replay and human Playtest are complete."
  state_digest: "sha256:30ba551423b0af025688bae0f7598915def45ca696626ef622ffeafc93ebe4e9"
```
