---
title: "task-2.1 — Ajustar indicador da elfa e composição dos bustos"
type: loki-task
doc_id: "plan-004-task-2-1-vn-ambientacao-followup"
version: "1.0.0"
status: pending-human-validation
phase: fase2
task_id: task-2.1
last_updated: "2026-07-29"
scope: "Patch estruturado nos eventos autorizados de Map022 e Map046 e validação estática reproduzível"
not_scope: "Map004, plugins, Common Events, quests, variáveis 26/106, assets, saves ou validação perceptível sem Playtest"
authority: "Demanda sub-demanda1-improved, análise técnica correspondente e decisões humanas herdadas"
canonical_source: "planos/004-ambientacao-VN/task-2.1.md"
---

# task-2.1 — Ajustar indicador da elfa e composição dos bustos

## Objective

Materializar a correção do balão da elfa no Map022 e a composição contínua de Rheed e da criança no Map046, preservando o fluxo funcional existente.

## Requirements

- Em Map022, depois da mensagem alvo, desativar o controlador do evento 31 e remover somente o balão ativo que ele criou no evento 30.
- Em Map046, manter Rheed (Picture ID 1) na direita, sem saída/reentrada antes de “Hum...”; introduzir a criança (Picture ID 2) à esquerda com `HorzMirror: Auto` e uma fala curta antes das escolhas.
- Preservar as escolhas, seus ramos e efeitos, os IDs de picture, os assets e o escopo exclusivo Map022/Map046.

## Out Of Scope

- `frontend/data/Map004.json`; plugins e parâmetros; Common Events; QuestTransition; variáveis 26 e 106; assets; saves; alegação de Playtest concluído.

## Dependencies

- task-1.1 concluída; esta fase é independente de suas superfícies de runtime, mas preserva seus artefatos históricos.

## References

- `planos/004-ambientacao-VN/sub-demanda1-improved.md` — REQ-001 a REQ-007 e critérios de aceite.
- `planos/004-ambientacao-VN/analise/technical-analysis-sub-demanda1.md` — contrato de implementação e validação.
- `frontend/data/Map022.json` — eventos 30/página 1 e 31/páginas 1–2.
- `frontend/data/Map046.json` — evento 1/página 1.

## Scoped Write Plan

```yaml
scoped_write:
  owner: technical-implementer
  mode: task_scoped_writer
  target_files: [frontend/data/Map022.json, frontend/data/Map046.json]
  allowed_writes:
    - frontend/data/Map022.json
    - frontend/data/Map046.json
  scoped_write_domains: [rpg-maker-mz-data-json, map-event-command-list, visu-presentation]
  required_skills: [rpg-maker-mz-data-json, rpg-maker-mz-visustella-events-presentation, rpg-maker-mz-visustella-plugin-commands]
  validators: [parse-json, structured-event-contract, restricted-diff]
  human_gates: [playtest-map022-balloon, playtest-map046-routes-and-cancel]
  validation_owner: orchestrator-deterministic-then-independent-auditor
```

## Task Acceptance And Validation

```yaml
task_validation:
  schema_version: 1
  acceptance_criteria:
    - id: AC-004-VN-01
      statement: "O controlador de balão do Map022 é encerrado após a fala alvo e o balão ativo do evento 30 é removido sem escrever as variáveis 26/106."
      required: true
    - id: AC-004-VN-02
      statement: "Map046 mantém Rheed à direita sem reentrada, apresenta a criança à esquerda olhando ao centro antes das escolhas e preserva integralmente choices e ramos."
      required: true
    - id: AC-004-VN-03
      statement: "Os dois JSONs fazem parse, o diff permanece restrito aos eventos autorizados e Map004 não é alterado."
      required: true
  primary_route:
    type: deterministic
    validator_ref: planos/004-ambientacao-VN/builds/fase2/validate-vn-ambientacao.mjs
  evidence_refs:
    - planos/004-ambientacao-VN/builds/fase2/static-validation-v1.md
  status: passed
```

## Human Loop

- Obrigatório antes de conclusão perceptível: Playtest Map022 (balão já ativo) e Map046 (rota `qualSeuNome1`, rota `qualSeuNome2` e Cancel), registrando composição, timing e efeitos das escolhas.

## Definition Of Done

- [x] Patch limitado aos dois JSONs autorizados.
- [x] Validator determinístico aprovado e evidência persistida.
- [x] Auditoria independente da fase concluída.
- [ ] Playtest humano registrado; sem isso, a fase permanece `pending-human-validation`.

## Resume Notes

O plano histórico de Fase 1 permanece concluído. A validação automática da Fase 2 passou; retomar do Playtest humano descrito em `builds/fase2/static-validation-v1.md`, sem reexecutar a Fase 1.
