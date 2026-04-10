# Parâmetros: Mecânica (Mechanics Settings)

## Overview

Estes parâmetros controlam a mecânica core do sistema ATB, incluindo speed, penalidades e fórmulas JavaScript. A maioria são **JavaScript-based** e requer conhecimento de JavaScript para customization completa.

## Localização
**Plugin Parameters > Mechanics Settings**

---

## Escape Fail Penalty

### Descrição
Define a penalidade aplicada à ATB Gauge quando um battler falha ao fugir da batalha.

### Parâmetro
```
Escape Fail Penalty: 0.5
```

### Comportamento
- Quando uma fuga falha, a gauge do battler reseta para este valor
- Valor entre 0.0 (0%) e 1.0 (100%)
- 0.5 = 50% gauge após falha

### Exemplos
```
0.0  // Reset para 0% (mais severo)
0.25 // Reset para 25%
0.5  // Reset para 50% (default)
0.75 // Reset para 75%
1.0  // Reset para 100% (mais brando)
```

### Impacto no Jogo
- **Valores baixos**: Fuga falha é mais penalizada
- **Valores altos**: Fuga falha é menos problemática

---

## Stuns Reset Gauge?

### Descrição
Determina se estados de stun resetam a ATB Gauge para 0%.

### Parâmetro
```
Stuns Reset Gauge?: true
```

### Comportamento
- **true**: Stuns resetam gauge para 0%
- **false**: Gauge mantém valor atual durante stun

### Exceções (Sempre Resetam)
Independentemente desta configuração:
- **Charm** sempre reseta gauge
- **Berserk** sempre reseta gauge
- **Confusion** sempre reseta gauge

### Exemplos
```
true  // Stuns resetam gauge (mais severo)
false // Stuns não resetam (mais brando)
```

### Impacto no Jogo
- **true**: Stuns são mais prejudiciais
- **false**: Stuns apenas impedem ações, mas progresso é mantido

---

## JS: Initial Gauge

### Descrição
Fórmula JavaScript que determina quanto de ATB Gauge cada battler tem ao **começar** a batalha.

### Parâmetro
```javascript
JS: Initial Gauge:
Math.random() * 0.5
```

### Variáveis Disponíveis
- `user`: O battler (actor ou enemy)

### Retorno
- Valor entre **0.0** (0%) e **1.0** (100%)

### Exemplos

#### Random (Default)
```javascript
Math.random() * 0.5
// 0% a 50% aleatório
```

#### Baseado em Level
```javascript
user.level * 0.005
// Level 1 = 0.5%, Level 100 = 50%
```

#### Baseado em AGI
```javascript
user.agi / 200
// AGI 50 = 25%, AGI 100 = 50%
```

#### Fixo
```javascript
0.25
// Sempre 25%
```

#### Todos começam cheio (não recomendado)
```javascript
1.0
// Sempre 100% (quebra balanceamento)
```

### Impacto no Jogo
- **Valores baixos**: Batalhas começam mais devagar
- **Valores altos**: Batalhas começam mais rápidas
- **Random**: Adiciona variabilidade

---

## JS: Speed

### Descrição
Fórmula JavaScript que determina a **speed** (velocidade) de um battler.

### Parâmetro
```javascript
JS: Speed:
user.agi
```

### Variáveis Disponíveis
- `user`: O battler (actor ou enemy)

### Retorno
- Valor numérico (maior = mais rápido)

### Exemplos

#### AGI Apenas (Default)
```javascript
user.agi
// Speed = AGI stat
```

#### AGI + Level
```javascript
user.agi + (user.level * 2)
// Level influencia speed
```

#### AGI + LUK
```javascript
user.agi + (user.luk / 2)
// Luck influencia levemente
```

#### HP Influencia
```javascript
user.agi * user.hpRate()
// HP baixo = mais lento
```

#### Custom Complexo
```javascript
user.agi + (user.level * 1.5) + (user.luk / 2)
```

### Impacto no Jogo
- **Valores altos**: Battlers agem muito mais rápido
- **Fórmulas complexas**: Mais variáveis influenciam speed

---

## JS: Base Speed

### Descrição
Fórmula JavaScript que determina a **velocidade base** de um battler.

### Parâmetro
```javascript
JS: Base Speed:
Math.max(user.agi - 1, 1)
```

### Variáveis Disponíveis
- `user`: O battler (actor ou enemy)

### Retorno
- Valor numérico (velocidade base)

### Exemplos

#### TPB Default
```javascript
Math.max(user.agi - 1, 1)
// AGI-1, mínimo de 1
```

#### AGI Direto
```javascript
user.agi
// Speed base = AGI
```

#### AGI + LUK/2
```javascript
user.agi + Math.floor(user.luk / 2)
// Luck influencia
```

#### Level + AGI
```javascript
user.level + user.agi
```

### Impacto no Jogo
- Usado como base para cálculos relativos
- Influencia AGI Rate

---

## JS: Relative Speed

### Descrição
Fórmula JavaScript que determina a **velocidade relativa** de um battler em comparação com outros.

### Parâmetro
```javascript
JS: Relative Speed:
user.agi
```

### Variáveis Disponíveis
- `user`: O battler (actor ou enemy)

### Retorno
- Valor numérico (usado para comparação)

### Exemplos

#### AGI Apenas (Default)
```javascript
user.agi
// Speed relativo = AGI
```

#### Comparação com Party
```javascript
user.agi / $gameParty.agiAverage()
// 1.0 = média, >1 = acima da média
```

#### Comparação com Todos Battlers
```javascript
user.agi / $gameTroop.agiAverage()
```

#### Custom Formula
```javascript
user.agi * user.hpRate()
// HP baixo = speed relativo menor
```

### Impacto no Jogo
- Determina AGI Rate (Slow/Fast)
- Battlers com relative speed alto ficam "Fast"
- Battlers com relative speed baixo ficam "Slow"

---

## JS: Acceleration

### Descrição
Fórmula JavaScript que determina a **aceleração** da gauge (quanto ela preenche por frame, relativo ao tempo de referência).

### Parâmetro
```javascript
JS: Acceleration:
1.0
```

### Variáveis Disponíveis
- `user`: O battler (actor ou enemy)

### Retorno
- Valor numérico (1.0 = normal)

### Exemplos

#### Normal (Default)
```javascript
1.0
// Velocidade normal
```

#### HP Influencia
```javascript
0.5 + (user.hpRate() * 1.0)
// HP 100% = 1.5, HP 1% = 0.51
```

#### MP Influencia
```javascript
0.5 + (user.mpRate() * 1.0)
// MP baixo = mais lento
```

#### Level Influencia
```javascript
0.5 + (user.level / 100)
// Level 1 = 0.51, Level 100 = 1.5
```

#### Frenesi (HP Baixo = Mais Rápido)
```javascript
1.0 + (1.0 - user.hpRate())
// HP 100% = 1.0, HP 1% = 2.0
```

### Impacto no Jogo
- **Valores altos**: Gauge preenche mais rápido
- **Valores baixos**: Gauge preenche mais devagar
- **Fórmulas dinâmicas**: Speed muda durante batalha

---

## JS: Cast Time

### Descrição
Fórmula JavaScript que determina o **tempo de cast** para skills/items com speed negativo.

### Parâmetro
```javascript
JS: Cast Time:
Math.abs(item.speed)
```

### Variáveis Disponíveis
- `user`: O battler usando o skill/item
- `item`: O objeto skill ou item

### Retorno
- Valor numérico (frames de cast)

### Exemplos

#### TPB Default (Absoluto)
```javascript
Math.abs(item.speed)
// Speed -500 = 500 frames
```

#### LUK Reduz Cast
```javascript
Math.abs(item.speed) * (1 - user.luk / 1000)
// LUK 100 = 10% menos cast time
```

#### AGI Reduz Cast
```javascript
Math.abs(item.speed) * (100 / user.agi)
// AGI 200 = 50% cast time
```

#### Level Reduz Cast
```javascript
Math.abs(item.speed) * (1 - user.level / 1000)
// Level 100 = 10% menos cast time
```

#### Custom Complexo
```javascript
Math.abs(item.speed) * (1 - (user.agi + user.luk) / 2000)
```

### Impacto no Jogo
- **Valores altos**: Casts demoram mais
- **Valores baixos**: Casts são mais rápidos
- **Fórmulas dinâmicas**: Stats influenciam cast time

---

## Ordem de Cálculo

Quando a gauge é atualizada, as fórmulas são aplicadas nesta ordem:

```
1. Initial Gauge     (apenas no início da batalha)
   ↓
2. Speed            (calculado a cada frame)
   ↓
3. Base Speed       (usado para calcular Relative Speed)
   ↓
4. Relative Speed   (usado para determinar AGI Rate)
   ↓
5. Acceleration     (multiplica speed)
   ↓
6. Cast Time        (apenas para skills com speed < 0)
```

---

## Exemplos de Configurações

### Configuração Balanceada (Default)
```javascript
Escape Fail Penalty: 0.5
Stuns Reset Gauge?: true
JS: Initial Gauge: Math.random() * 0.5
JS: Speed: user.agi
JS: Base Speed: Math.max(user.agi - 1, 1)
JS: Relative Speed: user.agi
JS: Acceleration: 1.0
JS: Cast Time: Math.abs(item.speed)
```

### Configuração Fast-Paced
```javascript
Escape Fail Penalty: 0.25
Stuns Reset Gauge?: true
JS: Initial Gauge: 0.5
JS: Speed: user.agi * 1.5
JS: Base Speed: user.agi
JS: Relative Speed: user.agi * 1.5
JS: Acceleration: 1.5
JS: Cast Time: Math.abs(item.speed) * 0.75
```

### Configuração Tactical (Lento)
```javascript
Escape Fail Penalty: 0.75
Stuns Reset Gauge?: false
JS: Initial Gauge: Math.random() * 0.25
JS: Speed: user.agi * 0.75
JS: Base Speed: user.agi * 0.75
JS: Relative Speed: user.agi * 0.75
JS: Acceleration: 0.75
JS: Cast Time: Math.abs(item.speed) * 1.25
```

### Configuração RPG Clássico
```javascript
Escape Fail Penalty: 0.0
Stuns Reset Gauge?: true
JS: Initial Gauge: 0.0
JS: Speed: user.agi
JS: Base Speed: user.agi
JS: Relative Speed: user.agi / $gameParty.agiAverage()
JS: Acceleration: 1.0
JS: Cast Time: Math.abs(item.speed)
```

---

## Consulte Também

- [Mecânica ATB](../conceitos/mecanica-atb.md) - Explicação de como as fórmulas funcionam
- [Parâmetros: Interrupt](parametros-interrupt.md) - Configuração de interrupções
- [Notetags: JavaScript](../notetags/javascript.md) - Fórmulas JS em notetags
