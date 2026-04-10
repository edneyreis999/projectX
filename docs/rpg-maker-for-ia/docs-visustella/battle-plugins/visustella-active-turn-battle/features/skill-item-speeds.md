# Features: Skill & Item Speeds

## Overview

No sistema ATB, o valor de **Speed** em skills e items tem um comportamento diferente do TPB original. Skills com speed positivo agora **afetam a gauge do próximo turno**, criando novas possibilidades estratégicas.

---

## Speed Positivo

### Comportamento TPB Original
- Speed positivo **não afeta** gauge do próximo turno
- Gauge sempre reseta para 0% após ação

### Comportamento ATB Modificado
- Speed positivo **afeta** gauge do próximo turno
- Gauge reseta para valor baseado em speed

### Fórmula
```
After Gauge % = Speed / 2000

Exemplos:
Speed 2000 → 100% gauge (ação imediata)
Speed 1000 → 50% gauge
Speed 500  → 25% gauge
Speed 0    → 0% gauge (normal)
```

---

## Speed Negativo (Cast Time)

### Comportamento
- Cria um **casting state**
- Gauge **diminui** em vez de aumentar
- Quando chega a 100%, skill é executada
- Pode ser **interrompido**

### Fórmula
```
Cast Time (frames) = |Speed|

Exemplos:
Speed -500  → 500 frames (~8s) de cast
Speed -1000 → 1000 frames (~16s) de cast
Speed -1500 → 1500 frames (~25s) de cast
```

---

## Estratégias de Design

### Haste Skills (Speed Positivo)

#### Conceito
Skills que deixam o battler mais rápido no próximo turno.

#### Exemplo: Quick Heal
```
Name: Quick Heal
Speed: 1000
Effect: Cura 500 HP

Resultado:
- Cura executada
- Próximo turno começa com 50% da gauge
- Battler age novamente mais rápido
```

#### Balanciamento
```
Speed 500-1000: Haste leve
Speed 1000-1500: Haste moderado
Speed 1500+: Haste forte (potencialmente OP)
```

#### Uso Típico
- Skills de suporte
- Heals
- Buffs leves

### Cast Skills (Speed Negativo)

#### Conceito
Skills poderosos que requerem tempo de preparação.

#### Exemplo: Meteoro
```
Name: Meteoro
Speed: -1500
Effect: 5000 dano a todos enemies

Resultado:
- 1500 frames (~25s) de cast
- Pode ser interrompido
- Se completado: dano massivo
```

#### Balanciamento
```
Speed -500 a -1000: Cast curto
Speed -1000 a -1500: Cast médio
Speed -1500+: Cast longo (deve ser muito poderoso)
```

#### Uso Típico
- Magias poderosas
- Ultimates
- Summons
- Skills estratégicas

### Normal Skills (Speed 0)

#### Conceito
Skills com comportamento padrão.

#### Exemplo: Attack
```
Name: Attack
Speed: 0
Effect: Dano físico

Resultado:
- Executado imediatamente
- Próximo turno começa com 0% gauge
```

#### Uso Típico
- Attacks básicos
- Skills padrão
- Ações normais

---

## Modificadores com Notetags

### Override de After Gauge

#### Notetag `<ATB After Gauge: x%>`
```
Name: Custom Skill
Speed: 1000
<ATB After Gauge: 75%>

Resultado:
- Speed 1000 normalmente seria 50% gauge
- Notetag força para 75% gauge
```

#### Modificadores +/-
```
Name: Modifier Skill
Speed: 500
<ATB After Gauge: +20%>

Resultado:
- Speed 500 normalmente seria 25% gauge
- Notetag adiciona +20% → 45% gauge total
```

### Battle Start Gauge

#### Notetag `<ATB Battle Start Gauge: +/-x%>`
```
<ATB Battle Start Gauge: +30%>

Resultado:
- Battler começa com 30% extra de gauge
- Útil para enemies mais fortes ou skills passivas
```

---

## Exemplos Práticos

### Skill Tree de Mago

#### Tier 1: Básico
```
Fireball
Speed: -500
Damage: 800
Cast: 500 frames (~8s)

Resultado:
Skill básico com cast curto
```

#### Tier 2: Intermediário
```
Inferno
Speed: -1000
Damage: 2000
Cast: 1000 frames (~16s)

Resultado:
Skill mais forte, cast mais longo
```

#### Tier 3: Avançado
```
Meteor Swarm
Speed: -1500
Damage: 5000
Cast: 1500 frames (~25s)

Resultado:
Skill muito poderoso, cast muito longo
```

### Skill Tree de Warrior

#### Tier 1: Básico
```
Power Strike
Speed: 0
Damage: 1000

Resultado:
Attack padrão
```

#### Tier 2: Intermediário
```
Quick Attack
Speed: 500
Damage: 800
<ATB After Gauge: +30%>

Resultado:
Dano menor, mas age mais rápido no próximo turno
```

#### Tier 3: Avançado
```
Berserker Rage
Speed: 1000
Damage: 1500
<ATB After Gauge: 100%>

Resultado:
Dano alto e age imediatamente no próximo turno
```

---

## Balanceamento

### Curva de Poder

#### Speed Positivo
```
Maior speed = Mais rápido agir novamente
Deve ter:
- Menor dano/effect
- Ou custo maior (MP/TP)
```

#### Speed Negativo
```
Maior |speed| = Maior cast time
Deve ter:
- Maior dano/effect
- Ou custo menor (compensação)
```

### Trade-offs

#### Exemplo de Balanceamento
```
Skill A (Fast):
- Speed: 1000 (50% gauge)
- Damage: 500
- MP: 10

Skill B (Normal):
- Speed: 0 (0% gauge)
- Damage: 1000
- MP: 10

Skill C (Cast):
- Speed: -1000 (16s cast)
- Damage: 3000
- MP: 10
```

---

## Consulte Também

- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Como funciona
- [Notetags: Gauge Manipulation](../notetags/gauge-manipulation.md) - Modificar comportamento
- [Parâmetros: Mecânica](../configuration/parametros-mecanica.md) - JS formulas
