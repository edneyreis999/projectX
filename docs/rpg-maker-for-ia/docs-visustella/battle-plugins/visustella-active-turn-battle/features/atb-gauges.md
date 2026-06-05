# Features: ATB Gauges

## Overview

As **ATB Gauges** são barras de progresso visuais que mostram o quão próximo cada battler está de poder agir. Este sistema foi revampado com cores diferenciadas para diferentes estados, fornecendo feedback visual instantâneo.

---

## Como Funciona

### Preenchimento da Gauge
```
0% ████████░░░░░░░░░░░░░ 100%
  ↑                    ↑
Start               Ready to Act
```

### Processo
1. Batalha começa → Gauge em Initial Gauge
2. Gauge preenche baseado em Speed/AGI
3. Gauge chega a 100% → Battler pode agir
4. Ação executada → Gauge reseta para After Gauge
5. Loop repete

---

## Estados Visuais

As ATB Gauges mudam de cor baseado no estado do battler:

### Stop State
- **Condição**: Speed = 0
- **Cor**: Stop Color (default: vermelho)
- **Descrição**: Gauge não está se movendo

### Slow State
- **Condição**: AGI Rate ≤ Slow Rate (default: 0.8)
- **Cor**: Slow Color (default: laranja)
- **Descrição**: Battler preenche gauge mais devagar que a média

### Normal State
- **Condição**: AGI Rate entre Slow e Fast
- **Cor**: Default Color (default: branco/amarelo)
- **Descrição**: Velocidade normal

### Fast State
- **Condição**: AGI Rate ≥ Fast Rate (default: 1.2)
- **Cor**: Fast Color (default: ciano)
- **Descrição**: Battler preenche gauge mais rápido que a média

### Full State
- **Condição**: Gauge = 100%
- **Cor**: Full Color (default: verde)
- **Descrição**: Battler pronto para agir

### Cast State
- **Condição**: Casting (speed < 0)
- **Cor**: Cast Color (default: magenta)
- **Descrição**: Gauge diminuindo (skill em preparação)

---

## Exibição Visual

### Sobre Sprites (Sprite Gauges)
Gauges aparecem sobre os sprites de battlers:

```
┌─────────────────┐
│  Enemy          │
│  ┌──────────┐   │
│  │██████░░░░│   │ ← ATB Gauge
│  └──────────┘   │
│                 │
└─────────────────┘
```

#### Configuração
- **Anchor X/Y**: Ponto de ancoragem
- **Scale**: Tamanho da gauge
- **Offset X/Y**: Posição relativa ao sprite
- **Show Sprite Gauges**: Habilitar/desabilitar

### Na Status Window
Gauges aparecem na status window (apenas sideview):

```
┌──────────────────────┐
│ Actor Name   HP: 100 │
│              ┌────┐  │
│ ATB:         │███░│  │ ← Gauge na janela
│              └────┘  │
└──────────────────────┘
```

#### Configuração
- **Show Status Gauges**: Habilitar/desabilitar

### Field Gauge
Gauge única com todos os battlers:

```
┌──────────────────────────────────────┐
│ Enemy A  ●─────────────┐             │
│ Actor 1  ●───────┐      │             │
│ Enemy B  ●──┐     │      │             │
│ Actor 2  ●─┐ │     │      │             │
│           0%────┼─────┼──────100%      │
│               │     │                   │
└──────────────────────────────────────────┘
```

#### Configuração
- **Use Field Gauge?**: Habilitar Field Gauge
- **Display Position**: Top/Bottom/Left/Right
- **Marker Type**: Icon, Face, ou Sprite

---

## Customização Visual

### Gradientes de Cor
Cada estado usa 2 cores para criar gradiente:

```
Color 1 ──────► Color 2
  ║                  ║
  ║   Gradiente      ║
  ║                  ║
```

### Dimensões
- **Scale**: Tamanho geral (0.5 a 2.0)
- **Thickness**: Espessura da gauge (6 a 24 pixels)
- **Length**: Comprimento (para Field Gauge)

### Posicionamento
- **Anchor**: Ponto de referência (0.0 a 1.0)
- **Offset**: Posição relativa em pixels

---

## Integração com Options

### Toggle de Exibição
Players podem escolher ver ou esconder gauges:
- **Options Menu**: "Show ATB Gauges"
- Requer OptionsCore instalado

### Ajuste de Speed
Players podem ajustar velocidade:
- **0.5x**: Lento
- **1.0x**: Normal (default)
- **1.5x**: Rápido
- **2.0x**: Muito rápido

---

## Vantagens Visuais

### Feedback Instantâneo
- Basta olhar para saber quem está próximo de agir
- Cores diferenciadas para estados importantes
- Cast state é claramente visível

### Comparação Relativa
- Field Gauge mostra posição relativa de todos
- Fácil ver quem é mais rápido/mais lento
- Ajuda na tomada de decisões táticas

### Acessibilidade
- Cores configuráveis para daltônicos
- Tamanho ajustável
- Posição customizável

---

## Consulte Também

- [Parâmetros: Gauge Color](../configuration/parametros-gauge-color.md) - Cores de cada estado
- [Parâmetros: Gauge](../configuration/parametros-gauge.md) - Posicionamento e tamanho
- [Features: Field Gauge](field-gauge.md) - Gauge de campo
