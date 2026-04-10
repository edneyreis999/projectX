# Features: Field Gauge

## Overview

O **Field Gauge** é uma gauge única que mostra **todos os battlers simultaneamente**, com marcadores indicando o progresso de cada um. É ideal para batalhas com muitos participants, fornecendo uma visão tática completa do campo de batalha.

---

## Como Funciona

### Visualização

```
┌─────────────────────────────────────────────┐
│  Enemy A   ●──────────────────┐             │
│  Actor 1   ●──────────┐       │             │
│  Enemy B   ●─────┐     │       │             │
│  Actor 2   ●───┐ │     │       │             │
│  Enemy C   ●─┐ │ │     │       │             │
│            0%──┼─┼─────┼───────┼────100%     │
│              │ │     │       │               │
└─────────────────────────────────────────────┘
```

### Componentes

1. **Gauge de Fundo**: Barra horizontal/vertical
2. **Marcadores**: Indicadores de posição de cada battler
3. **Setas**: Indicadores apontando para a gauge
4. **Skins**: Elementos decorativos (opcionais)

---

## Posicionamento

### Display Position

#### Top
```
┌───────────────────────────────┐
│ ●─────┐ Actor 1               │
│ ●───┐ │ Actor 2               │
│ ══════════════════════ 0-100% │ ← Gauge no topo
│                               │
│ [Battlers]                    │
└───────────────────────────────┘
```

#### Bottom
```
┌───────────────────────────────┐
│                               │
│ [Battlers]                    │
│ ══════════════════════ 0-100% │ ← Gauge na base
│ ●───┐ │ Actor 2               │
│ ●─────┐ Actor 1               │
└───────────────────────────────┘
```

#### Left
```
┌──────────┐
│ 0%       │
│   │      │
│   ●─┐    │ ← Enemy A
│     │    │
│   ●──┐   │ ← Actor 1
│      │   │
│ 100%    │ ← Gauge vertical esquerda
│          │
│ [Campo]  │
└──────────┘
```

#### Right
```
┌──────────┐
│       0% │
│      │   │
│    ┌─●   │ ← Enemy A
│    │     │
│   ┌──●   │ ← Actor 1
│   │      │
│   100%   │ ← Gauge vertical direita
│          │
│ [Campo]  │
└──────────┘
```

---

## Forward Direction

### Horizontal (Top/Bottom)

#### Left to Right
```
0% ────────────────> 100%
  ●───┐ ●──────┐ ●─┐ │
```

#### Right to Left
```
100% <──────────────── 0%
  │ ●─┐ │ ●──────┐ ●───┐
```

### Vertical (Left/Right)

#### Up to Down
```
0%
 │
 ├───● Enemy A
 │
 └────● Actor 1
100%
```

#### Down to Up
```
100%
 │
 ┌────● Actor 1
 │
 ├───● Enemy A
0%
```

---

## Marcadores (Markers)

### Tipos de Sprite

#### Icon
```
Marcador é um ícone do IconSet:
● Sword icon (actors)
● Monster icon (enemies)
```

#### Face Graphic (Actors)
```
Marcador é a face do actor:
┌───┐
│ 😊│ Actor 1
└───┘
```

#### Face Graphic (Enemies)
```
Marcador é uma face específica:
┌─────┐
│ 👹  │ Enemy A
└─────┘
```

#### Sideview Actor (Actors)
```
Marcador é o sprite battler do actor:
┌──────┐
│ ⚔️   │ Actor 1 SV
└──────┘
```

#### Enemy Sprite (Enemies)
```
Marcador é o sprite do enemy:
┌──────┐
│ 👾   │ Enemy A
└──────┘
```

---

## Customização Visual

### Bordas
```
┌─────────┐
│ ╔═══╗   │ ← Border com cor
│ ║ ● ║   │ ← Marcador com borda
│ ╚═══╝   │
└─────────┘
```

### Background
```
┌─────────┐
│ ┌───┐   │ ← Background colorido
│ │ ● │   │ ← Marcador com fundo
│ └───┘   │
└─────────┘
```

### Letters (Enemies)
```
┌───┐
│ A │ ← Letter do enemy
│ ● │
└───┘
```

### Arrows
```
      ↓
┌─────┘
●     ← Seta apontando para gauge
```

---

## Vantagens Táticas

### Visão Completa
- Todos os battlers visíveis simultaneamente
- Fácil comparar progresso relativo
- Identificar ameaças imediatas

### Tomada de Decisão
```
Exemplo:
Enemy A está em 90%
Enemy B está em 30%
Actor 1 está em 80%

Decisão:
- Enemy A agirá em breve → Priorizar interrupt
- Actor 1 quase pronto → Usar buff rápido
- Enemy B longe → Ignorar por enquanto
```

### Gestão de Recursos
```
Exemplo:
- Todos actors < 50%
- Enemy boss em 95%

Decisão:
- Usar skill de defesa
- Preparar heal para quando boss agir
```

---

## Configuração Recomendada

### Batalhas 1x1
```
Use Field Gauge?: false
// Não necessário, gauges individuais suficientes
```

### Batalhas Pequenas (2-4 battlers)
```
Use Field Gauge?: true
Display Position: Top
Forward Direction: Left to Right
Marker Type: Icon
Show Arrow?: true
```

### Batalhas Médias (5-8 battlers)
```
Use Field Gauge?: true
Display Position: Top
Forward Direction: Left to Right
Marker Type: Face (actors), Icon (enemies)
Show Arrow?: true
Marker Size: 24x24
```

### Batalhas Grandes (9+ battlers)
```
Use Field Gauge?: true
Display Position: Top
Forward Direction: Left to Right
Marker Type: Icon
Show Arrow?: false (muitos marcadores)
Marker Size: 16x16 (compacto)
Show Enemy Letter?: true
```

---

## Consulte Também

- [Parâmetros: Field Gauge](../configuration/parametros-field-gauge.md) - Configuração completa
- [Notetags: Field Gauge](../notetags/field-gauge.md) - Customização por battler
- [Comandos Plugin: Sistema](../comandos-plugin/sistema.md) - Dynamic changes
