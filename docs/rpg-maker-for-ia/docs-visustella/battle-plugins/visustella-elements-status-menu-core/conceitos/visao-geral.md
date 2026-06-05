# Visao Geral - Elements & Status Menu Core

## O que e

Plugin Tier 1 da VisuStella MZ que da controle granular sobre calculos de dano elemental, adiciona Trait Sets para atribuicao em massa de propriedades, e moderniza o Status Menu.

## Features

- **Element Rate** controlavel pelo lado do target e do user
- **Absorcao e Reflexao Elemental** adicionadas ao sistema
- **Multi-Elemento** em skills e items
- **Taxas elementais** ajustaveis via notetags aditivas e multiplicativas
- **Forcar Taxas Elementais** e anular propriedades elementais
- **Trait Sets** para atribuir traits em massa via notetags
- **10 tipos de Trait Sets**: Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, Variant
- **Trait Sets aleatorios** com pesos para inimigos dinamicos
- **Troca de traits mid-game** via Plugin Commands
- **Status Menu atualizado** exibindo todas as informacoes
- **Categorias customizaveis** no Status Menu
- **Biografia do ator** alteravel mid-game via Plugin Command

## Requisitos

- **Engine**: RPG Maker MZ (nao funciona em outras versões)
- **Tier**: 1 - Colocar abaixo de plugins de tier menor (0) no Plugin Manager
- **Compatibilidade**: VisuStella MZ Plugin Library

## Extensoes

Estes plugins exigem o Elements & Status Menu Core como parent:

- Anti-Damage Barriers VisuStella MZ
- Weakness Display VisuStella MZ

Colocar extensoes ABAIXO do plugin principal no Plugin Manager.

## Mudancas Principais no Engine

O plugin altera hardcoded features do RPG Maker MZ:

1. **Element Damage Calculation** - Expande o calculo vanilla para incluir bonus do atacante
2. **Multi-Elemental Calculation** - Adiciona opcoes alem do "maximum rate" padrao

Veja tambem:
- [Calculo Dano Elemental](calculo-dano-elemental.md)
- [Multi-Elemento](multi-elemento.md)
