# Mudanças Core - Alterações no RPG Maker MZ

Este documento descreve as alterações que o plugin VisuStella MZ Active Turn Battle faz nas funções hardcoded do RPG Maker MZ.

## Overview

O plugin ATB modifica várias funções do RPG Maker MZ para transformar o sistema TPB em ATB. Estas modificações incluem mudanças visuais, funcionais e de cálculo.

## 1. ATB Gauges Revamp

### Mudança Visual
As gauges de battler agora mostram cores diferentes baseadas no estado:

#### Estados e Cores

| Estado | Descrição | Cor Default |
|--------|-----------|-------------|
| **Stop** | Speed = 0, gauge parada | Stop Color |
| **Slow** | AGI Rate ≤ Slow Rate | Slow Color |
| **Normal** | AGI Rate entre Slow/Fast | Default Color |
| **Fast** | AGI Rate ≥ Fast Rate | Fast Color |
| **Full** | Gauge = 100%, pronto | Full Color |
| **Cast** | Casting state (speed < 0) | Cast Color |

#### Customização de Cores
Todas as cores podem ser customizadas em **Plugin Parameters > Gauge Color Settings**:

```
Default Color 1/2: Cor normal
Full Color 1/2: Cor quando gauge = 100%
Cast Color 1/2: Cor durante casting
Fast Color 1/2: Cor para AGI Rate fast
Slow Color 1/2: Cor para AGI Rate slow
Stop Color 1/2: Cor quando speed = 0
```

**Formato de cores:**
- Hexadecimal: `#rrggbb` (ex: `#ff0000` para vermelho)
- Skin: número do Window Skin color

### Integração Visual

#### Sprite Gauges
- **Actors**: Mostrados sobre sprites (se SV Actors visíveis)
- **Enemies**: Mostrados sobre sprites
- Configurável em `General Gauge Settings > Show Sprite Gauges`

#### Status Window Gauges
- **Actors**: Mostrados na status window (sideview only)
- Configurável em `General Gauge Settings > Show Status Gauges`

#### Field Gauge
- Gauge única com marcadores para todos
- Mostra posição relativa dos battlers
- Requer `Use Field Gauge? = true`

## 2. Skill & Item Speeds

### Mudança Comportamental

#### TPB Original (Antes)
- **Speed negativo**: Casting state ✓
- **Speed positivo**: Não afeta gauge do próximo turno ✗

#### ATB Modificado (Depois)
- **Speed negativo**: Casting state ✓
- **Speed positivo**: **Afeta** gauge do próximo turno ✓

### Fórmula de After Gauge

```
After Gauge % = Speed / 2000

Exemplos:
Speed 2000 → 100% gauge (ação imediata no próximo turno)
Speed 1000 → 50% gauge
Speed 500 → 25% gauge
Speed 0 → 0% gauge (normal)
Speed -500 → Casting state (500 frames)
```

### Implicações de Design

#### Speed Positivo como Buff
Skills com speed positivo agora funcionam como "Haste":
- Permitem ação mais rápida no próximo turno
- Útil para buffs, heals, suporte

**Exemplo:**
```
Skill: "Quick Heal"
Speed: 1000
Effect: Cura HP
Result: Próximo turno em 50% da gauge
```

#### Speed Negativo como Trade-off
Skills com speed negativo têm cast time:
- Mais tempo para executar
- Podem ser interrompidos
- Geralmente mais poderosos

**Exemplo:**
```
Skill: "Meteoro"
Speed: -1500
Effect: Dano massivo em todos enemies
Result: 1500 frames (~25s) de cast
```

### Modificação via Notetags
O comportamento pode ser modificado com notetags:

```
<ATB After Gauge: +30%>
// Reseta para 30% independente do speed

<ATB After Gauge: -20%>
// Reseta para 0% e subtrai 20% (começa de -20%)
```

## 3. JS Calculation Mechanics

### Override de Funções

O plugin **overwrite** funções do RPG Maker MZ para permitir customização:

#### Functions Overwritten

1. **initialGauge()**
   - Determina gauge ao começar batalha
   - Antes: random entre 0-50%
   - Depois: customizável via JS

2. **speed()**
   - Determina velocidade do battler
   - Antes: baseado em AGI apenas
   - Depois: customizável via JS

3. **baseSpeed()**
   - Velocidade base do battler
   - Antes: função fixa
   - Depois: customizável via JS

4. **relativeSpeed()**
   - Velocidade relativa entre battlers
   - Antes: comparação fixa de AGI
   - Depois: customizável via JS

5. **acceleration()**
   - Taxa de preenchimento da gauge
   - Antes: valor fixo
   - Depois: customizável via JS

6. **castTime()**
   - Tempo de cast para skills
   - Antes: |speed| frames
   - Depois: customizável via JS

### JavaScript Customization

Todas as fórmulas podem ser customizadas em **Plugin Parameters > Mechanics Settings**:

#### JS: Initial Gauge
```javascript
// Antes (TPB default):
Math.random() * 0.5

// Depois (customizável):
user.level * 0.05 // Max 50% no level 100
```

#### JS: Speed
```javascript
// Antes (TPB default):
user.agi

// Depois (customizável):
user.agi + (user.level * 2) // Level influencia speed
```

#### JS: Base Speed
```javascript
// Antes (TPB default):
Math.max(user.agi - 1, 1)

// Depois (customizável):
user.agi + user.luk / 2
```

#### JS: Relative Speed
```javascript
// Antes (TPB default):
user.agi / (enemy.agi + 1)

// Depois (customizável):
user.agi / $gameParty.agiAverage()
```

#### JS: Acceleration
```javascript
// Antes (TPB default):
1.0

// Depois (customizável):
user.hpRate() * 2 // HP baixo = mais rápido
```

#### JS: Cast Time
```javascript
// Antes (TPB default):
Math.abs(item.speed)

// Depois (customizável):
Math.abs(item.speed) * (1 - user.luk / 1000)
```

## 4. Escape Fail Penalty

### Nova Feature
Adicionada penalidade ao falhar fuga:

```
Se fuga falhar:
  - Gauge do battler reseta para valor X
  - X configurável em "Escape Fail Penalty"
```

**Plugin Parameter:**
```
Escape Fail Penalty: 0.5
// Após falhar fuga, gauge reseta para 50%
```

### Antes vs Depois

**Antes (TPB):**
- Fuga falha → Sem penalidade

**Depois (ATB):**
- Fuga falha → Gauge reseta para X%
- Valor X configurável

## 5. Stuns Reset Gauge

### Nova Feature
Opção para stuns resetarem a gauge:

```
Se stun ocorre:
  - Se "Stuns Reset Gauge?" = true → Gauge = 0%
  - Se "Stuns Reset Gauge?" = false → Gauge mantém
```

**Plugin Parameter:**
```
Stuns Reset Gauge?: true
// Stuns resetam gauge para 0%
```

### Exceções
Independentemente desta configuração:
- **Charm** sempre reseta gauge
- **Berserk** sempre reseta gauge
- **Confusion** sempre reseta gauge

### Antes vs Depois

**Antes (TPB):**
- Stuns sempre resetam gauge

**Depois (ATB):**
- Configurável via plugin parameter

## 6. Interrupt System

### Nova Feature
Sistema de interrupção de casts:

**Funcionamento:**
1. Target está casting (speed < 0)
2. Skill com `<ATB Interrupt>` acerta
3. Casting cancelado
4. Gauge reseta para 0%

**Efeitos Visuais (Opcional):**
- Animation (se CoreEngine instalado)
- Text popup
- Flash effect

### Antes vs Depois

**Antes (TPB):**
- Não existe interrupt

**Depois (ATB):**
- Interrupt disponível via notetag
- Configurável via Interrupt Settings

## 7. Field Gauge

### Nova Feature
Gauge de campo com marcadores:

**Funcionamento:**
- Gauge única com todos os battlers
- Marcadores mostram progresso relativo
- Posicionável (Top/Bottom/Left/Right)
- Customizável (skins, markers, arrows)

### Antes vs Depois

**Antes (TPB):**
- Não existe Field Gauge

**Depois (ATB):**
- Field Gauge disponível
- Requer `Use Field Gauge? = true`

## 8. Plugin Commands

### Novos Commands

O plugin adiciona comandos de plugin para:

#### Actor Commands
- Change Field Gauge Icon
- Change Field Gauge Face
- Clear Field Gauge Graphic

#### Enemy Commands
- Change Field Gauge Icon
- Change Field Gauge Face
- Clear Field Gauge Graphic

#### System Commands
- ATB Field Gauge Visibility

### Antes vs Depois

**Antes (TPB):**
- Sem comandos ATB

**Depois (ATB):**
- 7 novos comandos de plugin

## Resumo das Mudanças

| Feature | Antes (TPB) | Depois (ATB) |
|---------|-------------|--------------|
| **Gauge Colors** | Uma cor apenas | Cores por estado |
| **Speed (+)** | Não afeta gauge | Afeta gauge |
| **Speed (-)** | Cast (sem interrupt) | Cast + Interrupt |
| **Formulas** | Hardcoded | Customizáveis (JS) |
| **Escape Fail** | Sem penalidade | Penalidade configurável |
| **Stuns** | Sempre resetam | Configurável |
| **Interrupt** | Não existe | Disponível |
| **Field Gauge** | Não existe | Disponível |
| **Plugin Commands** | 0 ATB commands | 7 ATB commands |

## Compatibilidade

### VisuMZ_0_CoreEngine
Adiciona features ao interrupt:
- Animation ao interromper
- Mirror/Mute animation

### VisuMZ_1_OptionsCore
Adiciona features ao options:
- Ajustar ATB Gauge speed
- Toggle Active/Wait ATB
- Toggle Show ATB Gauges

## Consulte Também

- [Visão Geral](visao-geral.md) - Introdução ao sistema
- [Mecânica ATB](mecanica-atb.md) - Como funciona
- [Parâmetros](../configuration/) - Customização completa
