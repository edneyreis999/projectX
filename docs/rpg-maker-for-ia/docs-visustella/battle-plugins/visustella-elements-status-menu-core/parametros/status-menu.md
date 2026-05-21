# Parametros - Status Menu

Configuracoes do Status Menu atualizado.

## General

### Use Updated Layout

Usar o layout atualizado do Status Menu fornecido pelo plugin. Override as configuracoes do Core Engine.

### Layout Style

Estilo do layout da scene do menu:

| Opcao | Descricao |
|-------|-----------|
| Upper Help, Top Category | Help em cima, categorias no topo |
| Upper Help, Bottom Category | Help em cima, categorias embaixo |
| Lower Help, Top Category | Help embaixo, categorias no topo |
| Lower Help, Bottom Category | Help embaixo, categorias embaixo |

### Trait Set Font Size

Tamanho da fonte para descricoes de Trait Set.

### Show Back Rectangles?

Mostrar retangulos escuros para melhorar exibicao de informacoes.

- **Back Rectangle Color**: Usar `#rrggbb` para cores customizadas ou numeros para text colors do Window Skin.

## Category Window

### Style

Como exibir comandos na Category Window:

| Opcao | Descricao |
|-------|-----------|
| Text Only | Apenas texto |
| Icon Only | Apenas icone |
| Icon + Text | Icone primeiro, depois texto |
| Auto | Determina automaticamente pelo tamanho da celula |

### Text Align

Alinhamento de texto na Category Window.

## Displayed Parameters

### Column 1 / Column 2 / Column 3

Lista de parametros exibidos em cada coluna:

- **Basic Parameters**: MaxHP, ATK, LUK, etc.
- **X Parameters**: HIT, EVA, CRI, etc.
- **S Parameters**: PDR, MDR, EXR, etc.

## Elements

### Excluded Elements

IDs de elementos excluidos da lista do Status Menu.

### IDs: Column 1 / Column 2

Lista de IDs de elementos para cada coluna:

- Se nenhuma coluna tem IDs, lista todos os elementos
- Se muitos elementos, dividir em duas colunas
- Pode ser usado para separar elementos fisicos/magicos, major/minor, etc.

## Vocabulary

| Parametro | Descricao |
|-----------|-----------|
| Biography | Vocabulario para 'Biografia' |
| Damage: Absorb | Vocabulario para 'Dano: Absorver' |
| Damage: Received | Vocabulario para 'Dano: Recebido' |
| Damage: Dealt | Vocabulario para 'Dano: Causado' |
| Skill Types | Vocabulario para 'Tipos de Skill' |
| Weapon Types | Vocabulario para 'Tipos de Arma' |
| Armor Types | Vocabulario para 'Tipos de Armadura' |

Veja tambem:
- [Categorias Status Menu](categorias-status-menu.md)
- [Biografia Ator](../notetags/biografia-ator.md)
