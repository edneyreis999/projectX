# Mudanças Core — Visual State Effects

## State Motion Index e State Overlay Index

O RPG Maker MZ originalmente exibe apenas o motion e overlay do state de **maior prioridade**, mesmo que esse state não tenha motions definidos. States de menor prioridade com motions e overlays ficavam ocultos.

Este plugin **sobrescreve** esse comportamento:

- Agora o engine utiliza o **State Motion Index** de maior prioridade (ou um customizado via notetag `<State Motion: X>`)
- E o **State OverlayIndex** de maior prioridade é exibido

Isso garante que o visual mais relevante do state com maior prioridade sempre seja mostrado corretamente.

## Impacto no Código

Esta alteração afeta diretamente funções hardcoded do RPG Maker MZ relacionadas a exibição de states em battle. Qualquer plugin que também modifique essas funções pode gerar conflitos.

## Navegação

- [← Visão Geral](visao-geral.md)
- [Notetags de States →](../notetags/states.md)
