---
title: "Correcao dos dialogos do Map045"
type: loki-action-plan
doc_id: "map045-dialogue-encoding-repair-plan"
version: "1.0.0"
status: completed
created: "2026-07-31"
last_updated: "2026-07-31"
scope: "Reparo allowlisted de 30 folhas textuais e validacao estatica do Map045"
not_scope: "Reescrita narrativa, Map006, plugins, assets ou validacao humana de runtime"
canonical_source: "planos/003-falas-casa-forjaprata/tasks.md"
---

# Plano de Acao - Correcao dos dialogos do Map045

## Overview

Uma unica fase repara exatamente 30 strings com mojibake em `frontend/data/Map045.json`.
O Writer deve usar parse estruturado, valores-fonte congelados e save fail-closed.
Validacao estatica e auditoria independente precedem o gate final de Playtest humano.

## Sources

- `planos/003-falas-casa-forjaprata/demanda.md`
- `planos/003-falas-casa-forjaprata/analise-tecnica.md`
- `frontend/data/Map045.json`

## Scope

- `frontend/data/Map045.json`: somente as 30 folhas allowlisted na analise.
- Scripts e evidencias reproduziveis sob `builds/fase1/`.

## Out Of Scope

- `frontend/data/Map006.json`, Common Events, plugins, assets e saves.
- Qualquer mudanca de estrutura, fluxo, flags, payloads `357/657` ou redacao.

## Phase

| Task | Title | Dependencies | Write Owner | Human Loop | Status |
| --- | --- | --- | --- | --- | --- |
| task-1.1 | Reparar encoding do Map045 | none | technical-implementer | Playtest final | passed |

## Target Decision Ledger

```yaml
target_decisions:
  - schema_version: 1
    target: "frontend/data/Map045.json"
    origin: "inferred"
    rationale: "A demanda nomeia o mapa 045 e a analise estruturada resolve o arquivo RPG Maker correspondente como unico alvo de runtime."
    demand_or_acceptance_criterion_refs: ["planos/003-falas-casa-forjaprata/demanda.md", "task-1.1.md#AC-MAP045-01"]
    evidence_refs: ["planos/003-falas-casa-forjaprata/analise-tecnica.md#Recommendation", "frontend/data/Map045.json"]
    expected_impact: "Corrigir 24 falas, quatro textos de variables e dois nomes de evento sem alterar estrutura ou fluxo."
    validator_ref: "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v3.json"
    owner_ref: "agent:technical-implementer-map045"
    status: "validated"
```

## Human Loops

- A invocacao deste workflow, apos a aceitacao explicita da sugestao, satisfaz o gate de aprovacao antes da escrita.
- O Playtest final foi aprovado e persistido em `planos/003-falas-casa-forjaprata/interaction/fase1/playtest-result-v1.json`; o run termina como `completed`.

## Resume Contract

Somente o bloco JSON abaixo e os artefatos correlacionados em disco sao autoridade de retomada.

```json
{
  "loki_run_plan": {
    "final_validator_refs": [
      "planos/003-falas-casa-forjaprata/builds/fase1/final-validator-record-v3.json"
    ],
    "schema_version": 1,
    "task_refs": [
      "planos/003-falas-casa-forjaprata/task-1.1.md"
    ]
  },
  "loki_run_state": {
    "schema_version": 3,
    "run_id": "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5",
    "execution_id": "loki-execution-v2:4cd49b778f2fa77710ecb40d158cb698ccac35a8e076dccbb6f891adc2647c83",
    "command_identity_digest": "sha256:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5",
    "execution_input_digest": "sha256:052d20e12e54e43f359c6b38befe1e96592397abd1a2d45b2fbff250f0a75de3",
    "audit_configuration": {
      "schema_version": 1,
      "frequency": "phase",
      "source": "default",
      "policy_digest": "sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78"
    },
    "status": "completed",
    "task_refs": [
      "planos/003-falas-casa-forjaprata/task-1.1.md"
    ],
    "audit_checkpoint_refs": [
      "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-2.json"
    ],
    "result_ref": "planos/003-falas-casa-forjaprata/builds/result-v3.json",
    "dashboard_ref": "planos/003-falas-casa-forjaprata/builds/dashboard-v3.json",
    "consistency_packet_ref": "planos/003-falas-casa-forjaprata/builds/consistency-v2.json",
    "terminal_evidence_refs": [
      "planos/003-falas-casa-forjaprata/builds/terminal-evidence-v1.json"
    ],
    "execution_metrics_ref": "planos/003-falas-casa-forjaprata/builds/metrics/execution-metrics.json",
    "execution_metrics_digest": "sha256:ebce9366a74c5d3b4e212b55b07719cb1569399790291760890936cf13a8b2a5",
    "execution_metrics_status": "unavailable",
    "execution_metrics_degradation_reason": "Codex adapter has no verified run-scoped usage or monotonic-clock export for this run",
    "next_action": "no implementation action remains; create a commit only on explicit user request",
    "state_digest": "sha256:342814b03c9df31ee8076aa2b5fdf4588ae586ee2cd4cb8e84ac6be382b00b7d"
  }
}
```
