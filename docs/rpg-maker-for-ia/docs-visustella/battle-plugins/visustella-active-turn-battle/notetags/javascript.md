# Notetags: JavaScript (JavaScript Notetags: ATB Gauge Manipulation)

## Overview

Notetags JavaScript para **manipulação avançada** de ATB Gauges. Permitem fórmulas customizadas para condições complexas que as notetags normais não conseguem.

---

## Requisitos

- Conhecimento de **JavaScript**
- Entendimento de variáveis disponíveis
- RPG Maker MZ formula syntax

---

## Variáveis Disponíveis

### Em Todos os JS Notetags
```javascript
user   // O battler usando o skill/item
target // O battler sendo afetado
item   // O objeto skill/item
```

### Específicos por Notetag
```javascript
rate   // Valor atual da gauge (0 a 1)
```

---

## <JS ATB Charge Gauge>

### Descrição
Fórmula JavaScript para modificar gauge de targets em **charging state**.

### Uso
```
<JS ATB Charge Gauge>
code
code
rate = code;
</JS ATB Charge Gauge>
```

### Onde Usar
- **Skills**
- **Items**

### Variáveis
```javascript
user   // Battler usando o skill
target // Battler sendo afetado
item   // Skill/item sendo usado
rate   // Valor atual da gauge (0 a 1)
       // DEFAULT: target's current ATB gauge rate
```

### Retorno
- `rate` deve ser entre **0.0** (0%) e **1.0** (100%)

### Exemplos

#### Gauge Baseada em HP
```javascript
<JS ATB Charge Gauge>
// Target com HP baixo ganha mais gauge
rate = target.hpRate() * 0.5;
</JS ATB Charge Gauge>

# Resultado:
# HP 100% → rate = 0.5 (50%)
# HP 50%  → rate = 0.25 (25%)
# HP 1%   → rate = 0.005 (0.5%)
```

#### Gauge Baseada em Level
```javascript
<JS ATB Charge Gauge>
// Targets de level maior ganham mais
rate = Math.min(target.level * 0.01, 0.8);
</JS ATB Charge Gauge>

# Resultado:
# Level 10 → rate = 0.1 (10%)
# Level 50 → rate = 0.5 (50%)
# Level 99 → rate = 0.8 (80%, capped)
```

#### Gauge Baseada em AGI
```javascript
<JS ATB Charge Gauge>
// Targets com AGI alta ganham menos gauge (balanceamento)
rate = 1.0 - (target.agi / 200);
</JS ATB Charge Gauge>

# Resultado:
# AGI 50  → rate = 0.75 (75%)
# AGI 100 → rate = 0.5 (50%)
# AGI 150 → rate = 0.25 (25%)
```

#### Gauge Condicional
```javascript
<JS ATB Charge Gauge>
// Se target tem state "Haste", ganha mais gauge
if (target.isStateAffected(10)) { // State 10 = Haste
  rate = 0.8; // 80%
} else {
  rate = 0.3; // 30%
}
</JS ATB Charge Gauge>
```

#### Gauge Aleatória
```javascript
<JS ATB Charge Gauge>
// Valor aleatório entre 20% e 60%
rate = 0.2 + Math.random() * 0.4;
</JS ATB Charge Gauge>

# Resultado:
# Entre 20% e 60% aleatório
```

---

## <JS ATB Cast Gauge>

### Descrição
Fórmula JavaScript para modificar gauge de targets em **casting state**.

### Uso
```
<JS ATB Cast Gauge>
code
code
rate = code;
</JS ATB Cast Gauge>
```

### Onde Usar
- **Skills**
- **Items**

### Variáveis
```javascript
user   // Battler usando o skill
target // Battler sendo afetado
item   // Skill/item sendo usado
rate   // Valor atual da gauge (0 a 1)
       // DEFAULT: target's current ATB gauge rate
```

### Retorno
- `rate` deve ser entre **0.0** (0%) e **1.0** (100%)

### Exemplos

#### Acelerar Cast Baseado em LUK
```javascript
<JS ATB Cast Gauge>
// Luck reduz cast time (adiciona gauge)
rate = Math.min(target.currentAtbRate() + (target.luk / 1000), 1.0);
</JS ATB Cast Gauge>

# Resultado:
# LUK 0   → sem redução
# LUK 500 → +50% gauge (cast muito mais rápido)
```

#### Resetar Cast (Punição Máxima)
```javascript
<JS ATB Cast Gauge>
// Reseta cast para 100% (volta ao início)
rate = 1.0;
</JS ATB Cast Gauge>

# Resultado:
# Target tem que começar cast do zero
```

#### Cast Baseado em Damage
```javascript
<JS ATB Cast Gauge>
// Quanto mais dano, mais cast é atrasado
var damage = 1000; // Exemplo de dano
rate = Math.min(target.currentAtbRate() + (damage / 10000), 1.0);
</JS ATB Cast Gauge>

# Resultado:
# Damage 1000 → +10% gauge (cast atrasa um pouco)
# Damage 5000 → +50% gauge (cast atrasa muito)
```

#### Cast Condicional
```javascript
<JS ATB Cast Gauge>
// Se target é boss, cast é resetado
if (target.isEnemy() && target.enemyId() >= 100) { // Boss ID >= 100
  rate = 1.0; // Reset
} else {
  rate = target.currentAtbRate(); // Mantém
}
</JS ATB Cast Gauge>
```

---

## <JS ATB After Gauge>

### Descrição
Fórmula JavaScript para determinar a gauge **após** usar uma skill/item.

### Uso
```
<JS ATB After Gauge>
code
code
rate = code;
</JS ATB After Gauge>
```

### Onde Usar
- **Skills**
- **Items**

### Variáveis
```javascript
user   // Battler que usou o skill
target // Battler afetado (se aplicável)
item   // Skill/item usado
rate   // Valor da gauge após ação
       // DEFAULT: 0
```

### Retorno
- `rate` deve ser entre **0.0** (0%) e **1.0** (100%)

### Exemplos

#### After Gauge Baseada em Speed
```javascript
<JS ATB After Gauge>
// Skills com speed alto deixam gauge mais cheia
rate = Math.min(item.speed / 2000, 1.0);
</JS ATB After Gauge>

# Resultado:
# Speed 1000 → rate = 0.5 (50%)
# Speed 2000 → rate = 1.0 (100%)
# Speed 3000 → rate = 1.0 (capped)
```

#### After Gauge Baseada em HP
```javascript
<JS ATB After Gauge>
// HP baixo = next turno mais rápido
rate = 1.0 - user.hpRate();
</JS ATB After Gauge>

# Resultado:
# HP 100% → rate = 0.0 (0%)
# HP 50%  → rate = 0.5 (50%)
# HP 1%   → rate = 0.99 (99%, quase cheio)
```

#### After Gauge Baseada em MP
```javascript
<JS ATB After Gauge>
// MP gasto = next turno mais rápido
if (user.mp > 0) {
  rate = 1.0 - user.mpRate();
} else {
  rate = 0.0;
}
</JS ATB After Gauge>
```

#### After Gauge Aleatória
```javascript
<JS ATB After Gauge>
// Valor aleatório entre 0% e 40%
rate = Math.random() * 0.4;
</JS ATB After Gauge>
```

#### After Gauge Condicional
```javascript
<JS ATB After Gauge>
// Se user tem weapon "Quick Blade", next turno mais rápido
if (user.hasWeapon(5)) { // Weapon ID 5 = Quick Blade
  rate = 0.7; // 70%
} else {
  rate = 0.0; // 0%
}
</JS ATB After Gauge>
```

#### After Gauge Baseada em Level
```javascript
<JS ATB After Gauge>
// Level mais alto = next turno mais rápido
rate = Math.min(user.level * 0.01, 0.5);
</JS ATB After Gauge>

# Resultado:
# Level 10 → rate = 0.1 (10%)
# Level 50 → rate = 0.5 (50%)
# Level 99 → rate = 0.5 (capped)
```

---

## Funções Úteis

### Battler Functions
```javascript
target.hpRate()           // HP % (0.0 a 1.0)
target.mpRate()           // MP % (0.0 a 1.0)
target.tpRate()           // TP % (0.0 a 1.0)
target.level              // Level
target.agi                // AGI stat
target.luk                // LUK stat
target.isStateAffected(x)  // Tem state x?
target.isEnemy()          // É enemy?
target.isActor()          // É actor?
```

### Math Functions
```javascript
Math.max(x, y)            // Maior valor
Math.min(x, y)            // Menor valor
Math.random()             // 0.0 a 1.0
Math.floor(x)             // Arredonda para baixo
Math.ceil(x)              // Arredonda para cima
Math.round(x)             // Arredonda
Math.abs(x)               // Valor absoluto
Math.pow(x, y)            // x elevado a y
```

### Conditional Logic
```javascript
if (condition) {
  // code
} else {
  // code
}

// Ternary operator
condition ? value_if_true : value_if_false
```

---

## Exemplos Avançados

### Sistema de "Combo Finisher"
```javascript
<JS ATB After Gauge>
// Se user tem state "Combo", next turno instantâneo
if (user.isStateAffected(20)) { // State 20 = Combo
  rate = 1.0; // 100% (instantâneo)
  // Remove state
  user.removeState(20);
} else {
  rate = 0.0; // 0% (normal)
}
</JS ATB After Gauge>
```

### Gauge Baseada em Quantidade de Allies
```javascript
<JS ATB Charge Gauge>
// Mais allies = menos gauge para cada (balanceamento)
var allyCount = $gameParty.aliveMembers().length;
rate = Math.max(0.1, 0.8 - (allyCount * 0.1));
</JS ATB Charge Gauge>

# Resultado:
# 1 ally  → rate = 0.7 (70%)
# 4 allies → rate = 0.4 (40%)
# 8 allies → rate = 0.1 (10%, capped)
```

### Gauge Baseada em Turn Count
```javascript
<JS ATB After Gauge>
// Quanto mais turnos passaram, mais rápido
var turnCount = $gameTroop.turnCount();
rate = Math.min(turnCount * 0.05, 0.5);
</JS ATB After Gauge>

# Resultado:
# Turn 1  → rate = 0.05 (5%)
# Turn 5  → rate = 0.25 (25%)
# Turn 10 → rate = 0.5 (50%, capped)
```

### Gauge Baseada em Damage Recebido
```javascript
<JS ATB Charge Gauge>
// Se target tomou dano este turno, ganha gauge
if (target.result().hpDamage < 0) { // Tomou dano
  var damage = Math.abs(target.result().hpDamage);
  rate = Math.min(damage / 1000, 0.5); // +10% por 100 damage
} else {
  rate = 0.0;
}
</JS ATB Charge Gauge>
```

---

## Consulte Também

- [Notetags: Gauge Manipulation](gauge-manipulation.md) - Notetags normais
- [Parâmetros: Mecânica](../configuration/parametros-mecanica.md) - JS formulas em parâmetros
- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Como funciona
