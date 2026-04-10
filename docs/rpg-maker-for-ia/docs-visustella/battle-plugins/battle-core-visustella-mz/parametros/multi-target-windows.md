# Multi-Target Windows Settings - Plugin Parameters

## Visão Geral

Controla como as janelas de multi-alvo aparecem em batalha. Estas janelas são visíveis quando selecionando um inimigo ou ator enquanto usa uma skill/item com notetag <Single or Multiple Select>.

O design não usa comandos à esquerda/direita de inimigos e atores porque controles de mouse e touch não conseguiriam selecionar todos os inimigos ou aliados dessa forma.

## Parâmetros

### Properties

#### Window Width
- **Descrição**: Largura usada para Multi-Target Window
- **Notas**: Em pixels

#### Background Type
- **Descrição**: Tipo de fundo para estas janelas
- **Notas**: Dim, Transparent ou Normal

#### Show Button
- **Descrição**: Mostra botão de teclado/controller para pressionar?
- **Notas**: Requer VisuMZ_0_CoreEngine!

### Vocab

#### All Actors
- **Descrição**: Texto usado para botão "All Actors"
- **Notas**: Texto padrão: "All"

#### All Enemies
- **Descrição**: Texto usado para botão "All Enemies"
- **Notas**: Texto padrão: "All"

### Offsets > Actor Offsets

#### Offset X
- **Descrição**: Offset posição X do botão para atores
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Offset posição Y do botão para atores
- **Notas**: Negativo: cima. Positivo: baixo

### Offsets > Enemy Offsets

#### Offset X
- **Descrição**: Offset posição X do botão para inimigos
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Offset posição Y do botão para inimigos
- **Notas**: Negativo: cima. Positivo: baixo

## Ver Também
- [Actor Command Window](./actor-command-window.md) - Seleção de alvos
- [Action Sequences - Targeting](../action-sequences/targeting.md) - Sequências de targeting
- [Notetags - Selection Control](../notetags/selection-control.md) - Notetags de seleção
