---
title: "Dashboard v3 - Casa Forjaprata"
schema_version: 3
run_id: "loki-run-v2:487ad0333da0041da77affbf548ca6969f27d17638df3d56285e3b7cb6770320"
execution_id: "loki-execution-v2:f7d7aebacc69cd9a9a2555f2e8df8e194ede9ccef24744f3373249ed602dda"
status: pending-human-validation
state_digest: "sha256:e6e2a9aed34765ab891d57ea22e9f02cf717cf6d95b44acc567c08a40beb0f20"
---

# Dashboard v3 - Casa Forjaprata

## Resultado

Implementacao e validacao estatica concluidas. Map045 permanece EX, Map049 e a
nova VN, a quest tutorial fica separada de `aSemifinal`, a Funda so e liberada
apos a primeira tentativa bloqueada e a saida exige Weapon 1 equipada no Actor
3. O unico estado restante e a validacao humana de editor/runtime.

## Status e auditoria

```yaml
status: "pending-human-validation"
terminal_reason: "DAG, validadores automaticos e auditorias de fase passaram; somente editor round-trip e New Game Playtest permanecem."
audit_configuration:
  schema_version: 1
  frequency: "phase"
  source: "default"
  policy_digest: "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
active_audit_checkpoints:
  - boundary: "phase:fase1"
    due: true
    material: true
    ref: "planos/004-casa-forjaprata arquitetura/builds/fase1/phase-audit-v1.json"
    status: "approved"
    writer: "/root/config_writer"
    auditor: "/root/qa_proposal"
    independence: "distinct agents"
    findings: 0
    corrections: []
  - boundary: "phase:fase2"
    due: true
    material: true
    ref: "planos/004-casa-forjaprata arquitetura/builds/fase2/phase-audit-v1.json"
    status: "approved"
    writer: "/root/gameplay_writer"
    auditor: "/root/qa_proposal"
    independence: "distinct agents"
    findings: 0
    corrections: []
invalidated_checkpoints: []
```

## Unidades

| Task | Resultado | Evidencia principal |
| --- | --- | --- |
| task-1.1 | completed | `builds/fase1/foundation-validation-v1.json`, `task-1.1-completion-v1.json`, `phase-audit-v1.json` |
| task-2.1 | completed | `builds/fase2/feature-validation-v1.json`, `task-2.1-completion-v1.json`, `phase-audit-v1.json` |

Pending units: somente o gate humano descrito em
`interaction/fase2/playtest-new-game.md`. Skipped-dependency, unresolved e
cancelled: none.

## Arquivos e superficies alteradas

- `frontend/data/System.json`: append V111.
- `frontend/data/MapInfos.json`: MapInfos[49].
- `frontend/data/CoretoQuests.json`: quest tutorial sibling.
- `frontend/js/plugins.js`: uma definicao PKD tutorial.
- `frontend/js/plugins/Coreto_SQS_menu_patch.js`: S50 governa menu e abertura direta/J.
- `frontend/data/Map049.json`: nova VN e E1.
- `frontend/data/Map045.json`: somente E7, E11 e E20.
- `frontend/data/Map022.json`: somente remocao do writer antecipado de S50 em E30/P1.

Alteracoes locais preexistentes de MapInfos/System e o save nao rastreado foram
preservados. Actors, Classes, Weapons, Map046 e demais unidades nao foram
reescritos pela feature.

## Criterios de aceitacao

| AC | Status | Evidencia |
| --- | --- | --- |
| AC-F1-IDS | passed | `builds/fase1/foundation-validation-v1.json` |
| AC-F1-REGISTRY | passed | `builds/fase1/foundation-validation-v1.json` |
| AC-F1-PKD | passed | `builds/fase1/foundation-validation-v1.json` |
| AC-F1-GATE | passed | `builds/fase1/foundation-validation-v1.json` |
| AC-F2-VN | passed | `builds/fase2/feature-validation-v1.json`, `e11-migration-manifest-v1.json` |
| AC-F2-FLOW | passed | `builds/fase2/feature-validation-v1.json` |
| AC-F2-JOURNAL | passed | `builds/fase2/feature-validation-v1.json` |
| AC-F2-REGRESSION | passed | `builds/fase2/feature-validation-v1.json`, `phase-audit-v1.json` |

## Validadores e ciclos

- Foundation validator: 33/33 passed; replay independente 33/33.
- Feature validator: 29/29 passed; dois replays independentes 29/29.
- JSON parse, plugin syntax/envelope, command payloads/indents e `git diff --check`: passed.
- Manifest E11: 138/138; 97 comandos de apresentacao migrados.
- Validation cycles, retries, retry exhaustion, regressions introduzidas,
  desvios e optional soft failures: none.
- Pre-existing failures non-worsened: none claimed; line-ending warnings foram
  observados e nao mudam o resultado funcional.
- Learned record e execution-knowledge promotion: skipped, porque nao surgiu
  aprendizado duravel aprovado; nao bloqueante.

## Decisoes, alvos inferidos e ownership

- Map49 e V111 foram escolhidos por serem os primeiros slots append-only livres.
- `tutorial-funda-forjaprata`, `tutorialFundaForjaprata` e
  `ABERTURA_FORJAPRATA` foram verificados como unicos.
- E20 (19,14) foi adotado como placeholder existente aprovado; a adequacao
  visual da dispensa permanece gate humano.
- Config/registry/gate: `/root/config_writer`; mapas/eventos:
  `/root/gameplay_writer`; auditorias: `/root/qa_proposal`.
- O ledger completo com racional, AC, evidencia, impacto e validador esta em
  `tasks.md#Target-Decision-Ledger`.

## Riscos e limitacoes

- O grant da Weapon 1 e a transicao Coreto sao comandos sequenciais, nao uma
  transacao atomica contra encerramento abrupto entre comandos.
- Checks estaticos nao provam passabilidade/posicao do bau, timing audiovisual,
  restauracao perceptivel VN, foco do journal ou save/load.
- Compatibilidade com saves antigos esta fora do escopo; a validacao e New Game.
- Bloqueadores automaticos: none. Gate humano: pending.

## Validacao manual

Use `planos/004-casa-forjaprata arquitetura/interaction/fase2/playtest-new-game.md`.
O guia cobre round-trip, EX->VN->EX, J/menu antes da saida, abertura unica do
journal, bau one-shot, equipamento em Thorin, regressao de `aSemifinal` e
save/load em 0/10/20/90.

## Metricas

```yaml
execution_metrics_ref: "planos/004-casa-forjaprata arquitetura/builds/metrics/execution-metrics.json"
execution_metrics_digest: "sha256:161f28d43a635e22db02dc00eb9e24ab765c47a827d9de428bccd4923aefbf85"
execution_metrics_status: "partial"
degradation_reason: "Provider token telemetry and cross-agent monotonic durations are unavailable."
elapsed_ms: 3243676
active_ms: null
critical_path_ms: null
counts: {agents: 3, handoffs: 4, validators_executed: 6, validators_referenced: 2, validators_repeated: 2, retries: 0, replays: 2, gates: 1, reconciliations: 1}
exact_tokens: null
estimated_tokens: null
token_reason: "Provider token telemetry is unavailable."
cost: "unavailable"
cost_reason: "No verified pricing source and scope were supplied."
budget_stop: "none; no token/cost budget or automatic cost stop was applied"
liveness_probe: "not-required; no silence-based stop was used"
```

## Resume

```yaml
state_ref: "planos/004-casa-forjaprata arquitetura/tasks.md#loki_run_state"
state_digest: "sha256:e6e2a9aed34765ab891d57ea22e9f02cf717cf6d95b44acc567c08a40beb0f20"
result_ref: "planos/004-casa-forjaprata arquitetura/builds/result-v3.json"
terminal_evidence_refs: []
next_action: "Execute the RPG Maker MZ editor round-trip and New Game Playtest in interaction/fase2/playtest-new-game.md, then persist the human-validation result."
```
