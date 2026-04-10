# Parâmetros: Gauge (General Gauge Settings)

## Overview

Estes parâmetros controlam a **aparência e posicionamento** das ATB Gauges individuais sobre os sprites de battlers. Inclui âncora, escala, offset, e configurações de exibição.

## Localização
**Plugin Parameters > General Gauge Settings**

---

## Anchor X / Anchor Y

### Descrição
Ponto de ancoragem do sprite da ATB Gauge.

### Parâmetro
```
Anchor X: 0.5
Anchor Y: 1.0
```

### O que é Anchor?
Anchor determina **qual ponto** da gauge é usado para posicionamento:

- **0**: Canto superior-esquerdo
- **0.5**: Centro
- **1.0**: Canto inferior-direito

### Anchor X (Horizontal)
```
0.0  // Ancora no lado esquerdo
0.5  // Ancora no centro (recomendado)
1.0  // Ancora no lado direito
```

### Anchor Y (Vertical)
```
0.0  // Ancora no topo
0.5  // Ancora no centro
1.0  // Ancora na base (recomendado)
```

### Exemplos Práticos

#### Centro-Base (Default)
```
Anchor X: 0.5
Anchor Y: 1.0
// Gauge centralizada horizontalmente, ancorada na base
```

#### Topo-Centro
```
Anchor X: 0.5
Anchor Y: 0.0
// Gauge flutuando acima, ancorada no topo
```

#### Left-Base
```
Anchor X: 0.0
Anchor Y: 1.0
// Gauge alinhada à esquerda
```

---

## Scale

### Descrição
Escala de tamanho da ATB Gauge.

### Parâmetro
```
Scale: 1.0
```

### Comportamento
- **1.0**: Tamanho normal (100%)
- **0.5**: Metade do tamanho (50%)
- **2.0**: Dobro do tamanho (200%)

### Exemplos
```
0.25  // 25% do tamanho (muito pequeno)
0.5   // 50% do tamanho (pequeno)
1.0   // 100% do tamanho (normal)
1.5   // 150% do tamanho (grande)
2.0   // 200% do tamanho (muito grande)
```

### Uso Típico
- **Valores < 1.0**: Para batalhas com muitos battlers
- **Valores > 1.0**: Para destacar as gauges

---

## Offset X / Offset Y

### Descrição
Posição da ATB Gauge em pixels **relativa ao sprite**.

### Parâmetro
```
Offset X: 0
Offset Y: -10
```

### Comportamento

#### Offset X (Horizontal)
- **Positivo**: Move para a direita
- **Negativo**: Move para a esquerda
- **0**: Centralizado (baseado no Anchor X)

#### Offset Y (Vertical)
- **Positivo**: Move para baixo
- **Negativo**: Move para cima
- **0**: Na posição do Anchor Y

### Exemplos

#### Acima do Sprite (Default)
```
Offset X: 0
Offset Y: -10
// 10 pixels acima do topo
```

#### Centralizado
```
Offset X: 0
Offset Y: 0
// Na posição do anchor
```

#### À Direita
```
Offset X: 20
Offset Y: 0
// 20 pixels à direita
```

#### Abaixo
```
Offset X: 0
Offset Y: 10
// 10 pixels abaixo
```

### Valores Típicos
```
X: -30 a 30   // Ajuste horizontal
Y: -50 a -10  // Geralmente negativo (acima)
```

---

## AGI Gauge Rates

### Slow Rate

#### Descrição
Threshold que determina quando um battler é considerado **Slow**.

#### Parâmetro
```
Slow Rate: 0.8
```

#### Comportamento
Se `AGI Rate ≤ Slow Rate`, battler está "Slow" e gauge usa **Slow Color**.

#### AGI Rate
```
AGI Rate = Relative Speed battler / Relative Speed referência
```

#### Exemplos

```
0.5  // Muito restritivo (apenas battlers muito lentos)
0.8  // Default
1.0  // Battlers abaixo da média são "slow"
```

### Fast Rate

#### Descrição
Threshold que determina quando um battler é considerado **Fast**.

#### Parâmetro
```
Fast Rate: 1.2
```

#### Comportamento
Se `AGI Rate ≥ Fast Rate`, battler está "Fast" e gauge usa **Fast Color**.

#### Exemplos

```
1.0  // Battlers acima da média são "fast"
1.2  // Default
1.5  // Muito restritivo (apenas battlers muito rápidos)
```

### Faixas de AGI Rate

```
AGI Rate ≤ 0.8        → Slow  (laranja)
0.8 < AGI Rate < 1.2  → Normal (default)
AGI Rate ≥ 1.2        → Fast  (azul)
```

### Consulte Também
- [Parâmetros: Gauge Color](#) - Cores para cada estado
- [JS: Relative Speed](parametros-mecanica.md#js-relative-speed) - Como AGI Rate é calculado

---

## Show Sprite Gauges (Actors)

### Descrição
Se ATB Gauges devem ser exibidas sobre os **sprites de actors**.

### Parâmetro
```
Show Sprite Gauges: true
```

### Comportamento
- **true**: Mostra gauges sobre sprites
- **false**: Esconde gauges sobre sprites

### Requisitos
- **SV Actors** devem estar visíveis
- Não afeta First Person battle system

### Uso Típico
```
true  // Side-view (mostrar gauges)
false // First-person (esconder gauges)
```

---

## Show Status Gauges (Actors)

### Descrição
Se ATB Gauges devem ser exibidas na **status window** dos actors.

### Parâmetro
```
Show Status Gauges: true
```

### Comportamento
- **true**: Mostra gauges na status window
- **false**: Esconde gauges na status window

### Aplica-se A
- **Apenas Side-view**
- Não afeta First Person battle system

### Uso Típico
```
true  // Mostrar na status window
false // Esconder (economizar espaço)
```

---

## Show Sprite Gauges (Enemies)

### Descrição
Se ATB Gauges devem ser exibidas sobre os **sprites de enemies**.

### Parâmetro
```
Show Sprite Gauges: true
```

### Comportamento
- **true**: Mostra gauges sobre sprites
- **false**: Esconde gauges sobre sprites

### Uso Típico
```
true  // Mostrar progress dos enemies
false // Esconder (mais desafio)
```

### Override com Notetag
Mesmo com `true`, enemies podem ter `<Hide ATB Gauge>` para esconder individualmente.

### Consulte Também
- [Notetags: Gerais](../notetags/gerais.md) - Notetag `<Hide ATB Gauge>`

---

## Exemplos de Configuração

### Configuração Compacta
```
Anchor X: 0.5
Anchor Y: 1.0
Scale: 0.75
Offset X: 0
Offset Y: -15
Slow Rate: 0.75
Fast Rate: 1.25
Show Sprite Gauges (Actors): true
Show Status Gauges (Actors): true
Show Sprite Gauges (Enemies): true
```

### Configuração Destacada
```
Anchor X: 0.5
Anchor Y: 1.0
Scale: 1.5
Offset X: 0
Offset Y: -20
Slow Rate: 0.8
Fast Rate: 1.2
Show Sprite Gauges (Actors): true
Show Status Gauges (Actors): false
Show Sprite Gauges (Enemies): true
```

### Configuração Minimalista
```
Anchor X: 0.5
Anchor Y: 0.0
Scale: 0.5
Offset X: 0
Offset Y: 0
Slow Rate: 0.8
Fast Rate: 1.2
Show Sprite Gauges (Actors): false
Show Status Gauges (Actors): true
Show Sprite Gauges (Enemies): false
```

---

## Consulte Também

- [Parâmetros: Gauge Color](parametros-gauge-color.md) - Cores das gauges
- [Features: ATB Gauges](../features/atb-gauges.md) - Sistema visual das gauges
- [Notetags: Gerais](../notetags/gerais.md) - `<Hide ATB Gauge>`
