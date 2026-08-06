---
title: "Correções de prioridade, repetição e apresentação do Gab Window"
type: loki-action-plan
doc_id: "005-exploration-gabwindow-feedback-execution"
version: "1.0.0"
status: completed
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Execução dos ajustes aprovados nos mapas, helper de Gab e documentação arquitetural."
not_scope: "Vendor VisuStella, engine, saves, Window_Base e technology-context."
authority: "Decisões humanas aprovadas e análise técnica vigente."
---

# Plano de Ação — feedback do Gab Window

## Identidade de execução

```yaml
command_identity:
  schema_version: 2
  command: loki-implement-feature
  demand_digest: sha256:f870827985d5181829e41168659afd9f118a3cacfaa72a90d27255f902f032b2
  analysis_digest: sha256:c5e1e7ba3ae7ff4c152955e8267cf63755af3587aaa352d1439b5b9c83e07140
  plan_directory: planos/005-exploration-gabwindow/feedback-gabwindow
  retry_limit: 3
  audit_configuration: {schema_version: 1, frequency: phase, source: default, policy_digest: sha256:e3aeea217ca7881865de40d29e0e28e95bc32f4255e2488597801a8909e3bd78}
execution_ids:
  run_id: loki-run-v2:06689ee1dd4e213ab5d8b6007244b9bade07cfcbbeb36c93dc1c3e4b38250aaa
  execution_id: loki-execution-v2:db907196eb38a94d8d3f52a68167832711f845de7118cd4902d0adc1c30640e2
```

## Escopo e restrições

- Aplicar bypass nos 25 Gabs interativos e força somente nos 13 pontos de entrada definidos na análise.
- Manter os 16 Gabs Parallel/Autorun sem força e sem bypass.
- Criar helper pós-GabWindow exclusivo para `Window_Gab`; não editar vendor, engine, outras janelas nem saves.
- Atualizar a arquitetura e o índice; não atualizar `docs/technology-context.md`.

## Fase 1 — implementação e documentação

| Task | Dependências | Owner | Validação primária | Status |
| --- | --- | --- | --- | --- |
| task-1.1 | none | runtime_writer | inventário/payload, parse JSON, sintaxe JS e envelope | completed |
| task-1.2 | none | docs_writer | revisão estrutural de docs e índice | completed |
| task-1.3 | task-1.1, task-1.2 | /root | diff restrito, validação integrada e gate humano | completed |

## Decisões de alvo

| Alvo | Origem | Owner | Validador |
| --- | --- | --- | --- |
| frontend/data/Map022.json | explicit-demand | runtime_writer | inventário, parse e branch/indent |
| frontend/data/Map045.json | explicit-demand | runtime_writer | inventário, parse e branch/indent |
| frontend/js/plugins/Coreto_GabWindowDefaults.js | inferred | runtime_writer | node --check e teste isolado |
| frontend/js/plugins.js | inferred | runtime_writer | envelope, extração e ordem |
| docs/architecture/exploration-dialogue-gabwindow.md | explicit-demand | docs_writer | revisão de conteúdo |
| docs/index.xml | explicit-demand | docs_writer | parse XML e referências |

## Gate humano

Playtest New Game confirmado pelo usuário em 2026-08-04. O editor round-trip não foi registrado separadamente; a aprovação humana do comportamento em jogo encerra este plano.
