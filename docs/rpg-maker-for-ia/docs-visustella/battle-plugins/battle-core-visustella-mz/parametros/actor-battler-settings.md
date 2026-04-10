# Actor Battler Settings - Plugin Parameters

## Visão Geral

Ajusta como os sideview battlers se comportam para sprites de atores. Algumas configurações são compartilhadas com inimigos se eles usarem gráficos de sideview battler.

## Parâmetros

### Flinch

#### Flinch Distance X
- **Descrição**: Distância X normal quando flinching
- **Notas**: Em pixels

#### Flinch Distance Y
- **Descrição**: Distância Y normal quando flinching
- **Notas**: Em pixels

#### Flinch Duration
- **Descrição**: Número de frames para um flinch completar
- **Notas**: 60 frames = 1 segundo

#### Shake Flinch
- **Descrição**: Executar shake flinch quando receber dano?
- **Notas**: Efeito de tremor

##### Max Duration
- **Descrição**: Duração máxima de shake flinch
- **Notas**: Reduzida relativamente ao dano recebido

##### Max Power
- **Descrição**: Power rating de shake flinch em dano completo
- **Notas**: Reduzida relativamente ao dano recebido

### Frontview Battlers

#### Portrait Animations

##### Each Target
- **Descrição**: Coloca animações no topo para display types "Each Target"?
- **Notas**: Não se aplica a animações MV

##### Center of All
- **Descrição**: Coloca animações no topo para display types "Center of All"?
- **Notas**: Não se aplica a animações MV

##### Center of Screen
- **Descrição**: Coloca animações no topo para display types "Center of Screen"?
- **Notas**: Não se aplica a animações MV

### Sideview Battlers

#### Anchor

##### Anchor: X
- **Descrição**: Anchor X padrão para Sideview Battlers
- **Notas**: Valores entre 0 e 1 são seguros

##### Anchor: Y
- **Descrição**: Anchor Y padrão para Sideview Battlers
- **Notas**: Valores entre 0 e 1 são seguros

#### Chant Style
- **Descrição**: O que determina o motion de chant?
- **Notas**: Hit type ou skill type

#### Motion Speed
- **Descrição**: Número de frames entre cada motion
- **Notas**: Controla velocidade de animação

#### Position

##### Offset X
- **Descrição**: Offset posição X onde ator é posicionado
- **Notas**: Negativo: esquerda. Positivo: direita

##### Offset Y
- **Descrição**: Offset posição Y onde ator é posicionado
- **Notas**: Negativo: cima. Positivo: baixo

#### Priority: Active
- **Descrição**: Coloca ator ativo no topo de sprites de atores e inimigos
- **Notas**: Ator destacado visualmente

#### Priority: Actors
- **Descrição**: Prioriza atores sobre inimigos ao sobrepor sprites
- **Notas**: Ordem de z-index

#### Shadow Visible
- **Descrição**: Mostra ou esconde sombra para Sideview Battlers
- **Notas**: Sombra no chão

#### Smooth Image
- **Descrição**: Suaviza imagens de battler ou pixela?
- **Notas**: Interpolação vs pixel art

#### State Overlay

##### Offset X
- **Descrição**: Offset posição X para state overlay no ator
- **Notas**: Negativo: esquerda. Positivo: direita

##### Offset Y
- **Descrição**: Offset posição Y para state overlay no ator
- **Notas**: Negativo: cima. Positivo: baixo

#### JS: Home Position
- **Descrição**: Código para calcular posição home dos atores
- **Notas**: Customização via JavaScript

## Ver Também
- [Enemy Battler Settings](./enemy-battler-settings.md) - Configurações de inimigos
- [Notetags - Actor Battler](../notetags/actor-battler.md) - Notetags para atores
- [Battle Layout](./battle-layout.md) - Layout geral de batalha
- [Action Sequences - Movement](../action-sequences/movement.md) - Movimento de battlers
