---
title: "Retrospectiva tecnica - Fase 1: formacao das criancas no Coreto"
type: loki-technical-retrospective
status: completed
scope: "task-1.1 e correcao de colisao durante o deslocamento"
created: "2026-07-30"
---

# Retrospectiva tecnica - Fase 1: formacao das criancas no Coreto

## Objetivo, resultado e criterio

O objetivo era fazer com que 17 criancas de `Map022` se deslocassem uma unica vez quando V106 atingisse 10, chegassem a destinos individuais, ficassem voltadas para cima e preservassem a formacao em reentrada/save. O resultado foi aceito: a validacao estatica registrada passou e o usuario aprovou o Playtest final em 2026-07-30, informando que o comportamento ficou perfeito.

## Artefatos e escopo observado

- Producao alterada: `frontend/data/Map022.json`.
- Artefatos de execucao: `builds/fase1/implement-map022.mjs` e `builds/fase1/validate-map022.mjs`.
- Registros de conclusao: `tasks.md` e `task-1.1.md`.
- O artefato de analise de correcao por plugin foi removido pelo usuario depois que a opcao nativa foi escolhida. Nenhum plugin foi criado ou ativado.

## Evidencias e validadores

| Evidencia | Resultado registrado | Limite |
| --- | --- | --- |
| `task-1.1.md#Task Acceptance And Validation` | O validador deterministico, `JSON.parse` e `git diff --check` passaram. | O registro nao preserva a saida bruta dos comandos. |
| `builds/fase1/validate-map022.mjs` | Verifica as 17 rotas, `<Save Event Location>`, Self Switch A, ausencia de rota concorrente em eventos 20/21 e preservacao de eventos 17/18/30. | E validacao estrutural; nao substitui runtime. |
| `task-1.1.md#Human Loop` | Playtest final aprovado pelo usuario em 2026-07-30. | Nao existe checklist individual persistido para PT-01..PT-10. |

## Decisoes humanas e mudancas de escopo

- A colisao inicialmente deveria ser removida somente entre as criancas, preservando colisao com o jogador.
- O usuario rejeitou criar um plugin para obter essa seletividade e autorizou que as criancas atravessassem tambem o jogador durante o deslocamento.
- A solucao final usou prioridade `Below Characters` apenas nas paginas de movimento; as paginas terminais permaneceram com prioridade normal.
- O usuario confirmou no Playtest que a solucao final funcionou como esperado.

## Rastro operacional material

- A implementacao atribuiu uma rota propria a cada um dos 17 eventos, com `Move To`, `Turn Up`, espera e acionamento de Self Switch A.
- O dispatcher concorrente do evento 20 e o controlador concorrente relevante do evento 21 foram neutralizados para V106>=10.
- A persistencia usou `<Save Event Location>` nos eventos das criancas.
- O script `validate-map022.mjs` foi criado como verificacao deterministica e passou conforme o completion record em `task-1.1.md`.

## Atritos de execucao

### user-correction

- **O que ocorreu:** o requisito de colisao mudou depois do primeiro Playtest: de seletivo entre criancas para permitir atravessar o jogador e evitar plugin.
- **Esperado:** uma definicao estavel de colisao antes de escolher a tecnica.
- **Real:** a preferencia de escopo e manutencao mudou durante a correcao.
- **Evidencia:** decisao humana registrada no historico da execucao e resultado final em `task-1.1.md#Human Loop`.
- **Causa:** preferencia humana confirmada ao avaliar o custo de um plugin versus o comportamento aceitavel.
- **Resolucao:** paginas de movimento configuradas abaixo dos personagens; nenhuma mudanca em plugin.
- **Foi util:** parcialmente; eliminou a necessidade de runtime customizado, mas exigiu redirecionamento da analise.
- **Impacto de desperdicio:** low.
- **Reuso/evitar:** para cenas curtas de movimentacao em massa, confirmar cedo se atravessar o jogador e aceitavel antes de propor colisao seletiva por plugin.
- **Proximo passo minimo:** validar essa preferencia com uma pergunta objetiva quando um requisito de colisao vier incompleto.

### state-friction

- **O que ocorreu:** os status de `tasks.md` e `task-1.1.md` permaneceram `running`/`pending` depois da implementacao e do Playtest, exigindo encerramento posterior.
- **Esperado:** artefatos de plano refletirem a conclusao ao final da fase.
- **Real:** o plano foi marcado como concluido somente depois de solicitacao explicita do usuario.
- **Evidencia:** os registros atuais de conclusao em `tasks.md#Resume State` e `task-1.1.md#Completion`.
- **Causa:** atualizacao de estado de execucao nao foi materializada ao mesmo tempo que a validacao final.
- **Resolucao:** ambos os registros foram atualizados para `completed`.
- **Foi util:** nao; criou ambiguidade sobre a situacao da unica task.
- **Impacto de desperdicio:** low.
- **Reuso/evitar:** incluir o encerramento dos artefatos de plano no checklist terminal da implementacao.
- **Proximo passo minimo:** apos cada gate humano aprovado, atualizar status, evidencia e proxima acao no mesmo fluxo.

## Caminho minimo recomendado

1. Definir os IDs, destinos e o evento dono das rotas antes da escrita no mapa.
2. Confirmar se a cena pode aceitar que as criancas atravessem o jogador; se sim, usar prioridade abaixo dos personagens somente durante o movimento.
3. Aplicar a alteracao serializada em `Map022.json` e executar o validador deterministico.
4. Fazer Playtest, incluindo reentrada/save quando for exigido.
5. Registrar o resultado humano e fechar `tasks.md` e a task no mesmo momento.

## Aprendizados e candidatos

- **Aprendizado validado, local:** uma pagina temporaria `Below Characters` pode evitar bloqueio recíproco de eventos normais durante uma formacao, mantendo a pagina terminal em prioridade normal. Fonte: `builds/fase1/validate-map022.mjs` e Playtest final aprovado registrado em `task-1.1.md`.
- **Preferencia humana:** evitar um plugin dedicado quando atravessar o jogador durante uma coreografia breve for aceitavel. Esta preferencia e especifica desta cena e nao e regra global.
- **Candidato para melhoria continua:** nenhum. Os registros sao suficientes para reuso local, mas nao estabelecem uma regra duradoura sem nova avaliacao independente.

### Candidatos especializados de inferencia

```yaml
analytic_inference_candidates: []
analytic_inference_candidates_empty_reason: "Nao houve observacao material elegivel de inference-good, inference-bad ou inference-missing com capture_id e lineage persistidos."
```

- Catalogo escrito/promovido/pontuado/reorganizado/purgado: `false`.
- Route permitido: `loki-continuous-improvement`, somente se evidencia futura justificar avaliacao; nenhuma promocao automatica.

## Handoffs, gates e aprovacoes

- Gate humano de Playtest: concluido e aprovado pelo usuario em 2026-07-30.
- Nenhuma aprovacao de promocao duradoura foi solicitada ou aplicada.
- Materializacao desta retrospectiva: escrita direta pelo orquestrador, pois o Writer Agent selecionado nao entregou o arquivo no periodo de execucao; nao havia writer concorrente ativo apos a interrupcao.

## Riscos residuais

- O Playtest final foi aprovado, mas o resultado individual de cada item PT-01..PT-10 nao foi persistido.
- Os comandos de validacao foram registrados como aprovados na task, sem logs brutos anexos.

## Proximos passos e resume state

- Nenhuma acao de implementacao pendente para a Fase 1.
- Se houver nova alteracao na coreografia, partir de `task-1.1.md`, preservar a prioridade terminal normal e repetir validacao estrutural mais Playtest.
- Estado para retomada: plano, tarefa e retrospectiva concluidos; nenhum catalogo ou regra duradoura foi alterado.
