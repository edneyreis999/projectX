---
title: "Diálogos de exploração com Gab Window"
type: architecture-rule
status: active
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Apresentação de falas durante a exploração"
not_scope: "Batalhas, menus, parâmetros globais do plugin e conteúdo narrativo"
---

# Diálogos de exploração com Gab Window

## Propósito

Definir a apresentação padrão para falas em mapas de exploração de Daratrine. Esta diretriz serve a quem cria ou revisa eventos nesses mapas.

## Regra

Falas de NPCs, falas apresentadas ao jogador por interação com eventos e falas disparadas automaticamente durante a exploração devem usar o `VisuMZ_4_GabWindow`.

O Gab deve ser configurado como **somente texto**: não reproduzir rosto, índice de face ou nome de falante da janela de mensagem convencional.

Depois de disparar o Gab, o evento deve **seguir imediatamente**, sem aguardar o término da apresentação.

## Prioridade e repetição em interações

Uma interação do jogador (`ActionButton` ou `PlayerTouch`) tem prioridade sobre Gabs automáticos visíveis ou enfileirados. O primeiro Gab alcançável de cada fluxo ou ramo de interação deve substituir o Gab atual e a fila; os Gabs seguintes da mesma conversa devem continuar enfileirados na ordem original.

Todo Gab de um fluxo de interação deve ignorar o Anti-Repeat, para que a mesma fala possa reaparecer ao interagir novamente com o evento. A substituição da fila não deve ser aplicada a cada Gab de uma conversa com múltiplas falas, pois isso apagaria as falas anteriores da própria sequência.

Gabs de `Parallel` e `Autorun` são automáticos: não devem forçar a fila nem ignorar o Anti-Repeat. Assim, eles não interrompem uma interação priorizada.

## Posição e estilo padrão

Quando o Gab estiver ancorado a um personagem no mapa, sua borda inferior deve ficar acima do topo real do sprite, com um gap vertical configurável. O cálculo usa a altura do frame do sprite e o zoom do mapa; o valor inicial do gap é `8` pixels lógicos. O topo da janela deve continuar visível, e qualquer redução perceptível do gap causada pelo limite superior exige ajuste validado em Playtest.

O estilo padrão do Gab é texto branco sem borda: `#ffffff`, outline transparente e largura de outline zero. Esse estilo e o reposicionamento pertencem exclusivamente a `Window_Gab`; não podem alterar `Window_Base`, `ColorManager`, mensagens convencionais, escolhas, menus ou outras janelas.

## Escopo inicial

A aplicação inicial desta regra é obrigatória nos mapas:

- `EX_Coreto` — `frontend/data/Map022.json`;
- `EX_Casa da Família Forjaprata` — `frontend/data/Map045.json`.

Para mapas de exploração futuros, aplicar esta diretriz na criação ou revisão de suas falas.

## Limites

- Não aplicar esta regra a falas de batalha, menus ou outros contextos fora de exploração sem uma decisão específica.
- Usar o plugin `VisuMZ_4_GabWindow` já ativo. Qualquer extensão local deve ser carregada depois dele, sem editar código de terceiros, engine ou parâmetros globais de cor.
- Preservar texto, gatilho, condições, ordem dos comandos e efeitos de cada evento. A mudança autorizada é somente a apresentação da fala.

## Implementação e validação

- Alterar eventos em `data/*.json` por edição estruturada, preservando os comandos `357/657` do plugin e a estrutura dos ramos.
- Após a alteração, validar parse JSON, payloads aninhados, sincronia dos comandos `357/657`, branches e diff restrito. Confirmar também a sintaxe e a ordem de carregamento de qualquer helper do Gab.
- Fazer round-trip no RPG Maker MZ e Playtest desde New Game. Verificar prioridade da interação sobre a fila automática, repetição de ActionButton e PlayerTouch, continuidade de conversas com múltiplos Gabs, ausência de preempção por Autorun e Parallel, posição em sprites de alturas distintas e isolamento do estilo das demais janelas.

## Fontes

- `planos/005-exploration-gabwindow/improved-demand.md`
- `planos/005-exploration-gabwindow/technical-analysis.md`
- `planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md`
- `planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md`
- `frontend/js/plugins.js`
- `frontend/js/plugins/VisuMZ_4_GabWindow.js`

## Manutenção

Revisar esta diretriz se o plugin Gab Window, sua política de prioridade, repetição, posicionamento ou estilo, ou o escopo de diálogos de exploração mudar por decisão aprovada.
