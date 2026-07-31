---
title: "Retrospectiva tecnica - falas Gab no Coreto"
type: loki-technical-retrospective
version: "1.0.0"
status: completed-with-residual-risk
created: "2026-07-29"
scope: "Fase 1: falas ambientais das crianças no Map022"
not_scope: "Promocao de regra duravel, alteracao de runtime ou catalogo de inferencias"
---

# Retrospectiva tecnica - falas Gab no Coreto

## Resultado

O controlador Gab foi materializado no evento 20 de `Map022.json`; o evento 30
passou a drenar a fila antes do primeiro dialogo. O usuario ajustou manualmente
a cadencia e aprovou o resultado em jogo.

## Artefatos e evidencias

- `frontend/data/Map022.json`: evento 20 e insercao de cleanup no evento 30.
- `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-tecnica.md`:
  arquitetura, corpus e gates aprovados.
- `.../builds/fase1/static-audit.md`: parse e auditoria estrutural aprovados;
  proveniencia do diff restrito inconclusiva.

## Decisoes humanas

- Falas apenas em V106=0; S43 encerra a ambientacao.
- Corpus inicial, tom coloquial e exclusao das falas de transicao aprovados.
- Cadencia final ajustada manualmente pelo usuario e aprovada em jogo.

## Validacoes

- JSON parse, shape do evento 20, comandos Gab, EventIDs, ordem
  `GabTextOnly -> WaitForGab -> Wait` e handoff de S43: aprovados estaticamente.
- Aceitacao em jogo: confirmada pelo usuario para a cadencia e resultado geral.
- Aceitacao editor/save-load/clipping em todas as bordas: nao registrada em
  detalhe; permanece risco residual, nao defeito observado.

## Atritos materiais

### state-friction

- What happened: `Map022.json` ja estava amplamente modificado antes desta fase.
- Expected behavior: diff restrito atribuir somente eventos 20/30 a esta task.
- Actual behavior: o diff contra HEAD misturou alteracoes preexistentes.
- Evidence: `builds/fase1/static-audit.md`.
- Cause: baseline pre-escrita ausente.
- Resolution: auditoria estrutural confirmou o estado final, mas a proveniencia
  do diff ficou inconclusiva.
- Was useful: parcialmente.
- Waste impact: medium.
- Avoid next time: salvar hash ou copia somente leitura do alvo antes do writer.
- Minimum next step: registrar baseline do MapXXX antes de qualquer escrita.

### inference-bad

- What happened: uma contagem inicial de `code:357` foi lida como possivel
  contagem de Gabs.
- Expected behavior: filtrar por plugin `VisuMZ_4_GabWindow` antes da conclusao.
- Actual behavior: os 17 comandos eram de plugins diversos; a varredura
  especifica confirmou zero Gabs preexistentes.
- Cause: descoberta por codigo de evento sem filtro de ownership.
- Resolution: a checagem posterior filtrou plugin e comando.
- Was useful: sim, apos correcao.
- Waste impact: low.
- Avoid next time: usar scan estruturado por `parameters[0]` e `parameters[1]`.
- Minimum next step: incluir filtro de plugin em todo inventario de code 357.

### validation-friction

- What happened: o validator previsto em `builds/fase1/validate-map022-gab.py`
  nao existia.
- Expected behavior: validator reproduzivel no plano antes da escrita.
- Actual behavior: scanners estruturais explicitos e auditoria independente
  cobriram os invariantes, mas sem script persistido de replay.
- Cause: validator foi planejado, nao materializado.
- Resolution: checks manuais estruturados passaram; Playtest humano confirmou a
  cadencia percebida.
- Was useful: parcialmente.
- Waste impact: medium.
- Avoid next time: criar o validator read-only antes de despachar o writer.
- Minimum next step: em fase futura, materializar validator reutilizavel no
  plano antes do patch.

## Caminho minimo recomendado

1. Capturar hash/baseline do Map alvo.
2. Validar slot, estado e plugin com parser estruturado.
3. Criar validator read-only para payload, ordem e diff.
4. Aplicar writer unico.
5. Rodar auditoria independente e Playtest humano.

## Aprendizados

- Validado: um unico produtor em evento dedicado evita concorrencia com os
  controladores de movimento das crianças.
- Validado: desligar por S43 antes de `ClearGab -> WaitForGab` evita nova
  emissao durante a convocacao.
- Preferencia humana: cadencia de falas deve ser ajustavel no Playtest; o
  usuario preferiu intervalo menor.
- Falha operacional: nao iniciar alteracao de mapa sujo sem baseline proprio.

## Candidatos especializados de inferencia

```yaml
analytic_inference_candidates: []
analytic_inference_candidates_empty_reason: "As observacoes de inferencia nao possuem capture_id e lineage persistidos exigidos para candidato especializado."
catalogo_escrito_promovido_pontuado_reorganizado_ou_purgado: false
route_permitido: "loki-continuous-improvement somente se evidencia futura satisfizer o contrato"
```

## Riscos residuais

- Sem baseline pre-escrita, a proveniencia completa do diff permanece
  inconclusiva.
- Nao ha registro detalhado de editor acceptance, clipping extremo ou save/load.

## Registro de escrita

Escrita direta: retrospectiva transitoria no destino convencional do plano.
Motivo: nenhum Write Agent especializado para esta classe de artefato estava
disponivel. Nenhum runtime, regra duravel ou catalogo foi alterado.
