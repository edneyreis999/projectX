# Enemy Battler Settings - Plugin Parameters

## Visão Geral

Ajusta como inimigos aparecem visualmente na cena de batalha. Algumas configurações sobrescrevem as usadas para atores se usados como sideview battlers. Inclui animação de ataque padrão, funcionamento da janela de seleção de inimigo e mais.

## Parâmetros

### Visual

#### Attack Animation
- **Descrição**: Animação de ataque padrão para inimigos
- **Notas**: Use <Attack Animation: x> para animações customizadas

#### Emerge Text
- **Descrição**: Mostra ou esconde texto 'Enemy emerges!' no início da batalha
- **Notas**: Texto de aparição

#### Offset X
- **Descrição**: Offset posição X onde inimigo é posicionado
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Offset posição Y onde inimigo é posicionado
- **Notas**: Negativo: cima. Positivo: baixo

#### Smooth Image
- **Descrição**: Suaviza imagens de battler ou pixela?
- **Notas**: Interpolação vs pixel art

### Select Window

#### Any: Last Selected
- **Descrição**: Prioriza último inimigo selecionado sobre configurações de front/sideview?
- **Notas**: Mantém seleção anterior

#### FV: Right Priority
- **Descrição**: Se usando frontview, auto-seleciona inimigo mais à direita
- **Notas**: Seleção automática

#### SV: Right Priority
- **Descrição**: Se usando sideview, auto-seleciona inimigo mais à direita
- **Notas**: Seleção automática

### Name

#### Legacy Option
- **Descrição**: Usa versão legacy (window) ou nova versão (sprite)
- **Notas**:
  - **WARNING**: Versão legacy não é mais suportada para bugs
  - Nem todos os parâmetros estão disponíveis na versão legacy (Always Visible e Attach States)

#### Font Size
- **Descrição**: Tamanho de fonte para nomes de inimigos
- **Notas**: Em pixels

#### Name Position

##### Offset X
- **Descrição**: Offset posição X do nome do inimigo
- **Notas**: Negativo: esquerda. Positivo: direita

##### Offset Y
- **Descrição**: Offset posição Y do nome do inimigo
- **Notas**: Negativo: cima. Positivo: baixo

#### Name: Attach States
- **Descrição**: Anexa ícone de estado ao nome do inimigo?
- **Notas**: Mostra ícones de estado no nome

##### Attach: Offset X
- **Descrição**: Offset posição X do ícone anexado
- **Notas**: Negativo: esquerda. Positivo: direita

##### Attach: Offset Y
- **Descrição**: Offset posição Y do ícone anexado
- **Notas**: Negativo: cima. Positivo: baixo

#### Name Visibility

##### Always Hidden
- **Descrição**: Nome do inimigo sempre visível?
- **Notas**: Prioridade mais alta

##### Always Visible
- **Descrição**: Nome do inimigo sempre visível?
- **Notas**: Prioridade média

##### As Target
- **Descrição**: Mostra nome quando inimigo é alvo
- **Notas**: Prioridade média

##### By Selection?
- **Descrição**: Condições para visibilidade do nome
- **Notas**: Prioridade mais baixa

##### Temporary Visibility
- **Descrição**: Frames de visibilidade temporária após efeito de ação
- **Notas**: 60 frames = 1 segundo

### Sideview Battlers

#### Allow Collapse
- **Descrição**: Inimigos derrotados com SV Battler "fade away"?
- **Notas**: Efeito de desaparecimento

#### Anchor: X
- **Descrição**: Anchor X padrão para Sideview Battlers
- **Notas**: Valores entre 0 e 1 são seguros

#### Anchor: Y
- **Descrição**: Anchor Y padrão para Sideview Battlers
- **Notas**: Valores entre 0 e 1 são seguros

#### Motion: Idle
- **Descrição**: Animação idle padrão de Sideview Battlers
- **Notas**: Walking, Stationary, etc.

#### Shadow Visible
- **Descrição**: Mostra ou esconde sombra para Sideview Battlers
- **Notas**: Sombra no chão

#### Size: Width
- **Descrição**: Largura padrão para inimigos com Sideview Battlers
- **Notas**: Em pixels

#### Size: Height
- **Descrição**: Altura padrão para inimigos com Sideview Battlers
- **Notas**: Em pixels

#### Weapon Type
- **Descrição**: Tipo de arma padrão de Sideview Battlers
- **Notas**: Use 0 para Bare Hands

### Aspect Defaults

#### Name Format
- **Descrição**: Formato de nome de aspecto padrão
- **Notas**: %1 - Nome Original do Inimigo

#### Name Color
- **Descrição**: Cor do nome
- **Notas**: Use #rrggbb para cores customizadas ou números para cores da Window Skin

#### Icon
- **Descrição**: Ícone padrão para aspecto
- **Notas**: Use <Aspect Icon: x> para mudar ícone

## Ver Também
- [Actor Battler Settings](./actor-battler-settings.md) - Configurações de atores
- [Notetags - Enemy Battler](../notetags/enemy-battler.md) - Notetags para inimigos
- [HP Gauge Settings](./hp-gauge.md) - Barras de HP para inimigos
- [Battle Layout](./battle-layout.md) - Layout geral de batalha
