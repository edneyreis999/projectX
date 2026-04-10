# Notetags: Gauge Manipulation (ATB Gauge Manipulation-Related Notetags)

## Overview

Notetags para **manipular ATB Gauges** através de skills e items. Permitem modificar quanto cheia a gauge está, afetar charging/casting states, e até interromper casts.

---

## Estados de Gauge

### Charging State
- Battler com **speed ≥ 0**
- Gauge está **preenchendo** (0% → 100%)
- Estado normal de preenchimento

### Casting State
- Battler com **speed < 0**
- Gauge está **diminuindo** (100% → 0%)
- Skill em preparação

---

## <ATB After Gauge: x%>

### Descrição
Define o valor da gauge **após** usar uma skill/item.

### Uso
```
<ATB After Gauge: x%>
```

### Onde Usar
- **Skills**
- **Items**

### Parâmetros
- `x`: Valor percentual (0 a 100)

### Comportamento
- Gauge reseta **exatamente** para x% após ação
- **Override** do speed modifier

### Exemplos

#### Reset para Zero
```ruby
# Database: Skill "Heavy Attack"
<ATB After Gauge: 0%>

# Resultado:
# Gauge reseta para 0% após ataque
```

#### Reset para Metade
```ruby
# Database: Skill "Moderate Spell"
<ATB After Gauge: 50%>

# Resultado:
# Gauge reseta para 50% após spell
```

#### Ação Imediata (Full)
```ruby
# Database: Skill "Instant Heal"
<ATB After Gauge: 100%>

# Resultado:
# Battler pode agir novamente imediatamente
```

---

## <ATB After Gauge: +x%> / <ATB After Gauge: -x%>

### Descrição
Adiciona ou subtrai um valor **ao** after gauge calculado.

### Uso
```
<ATB After Gauge: +x%>
<ATB After Gauge: -x%>
```

### Onde Usar
- **Skills**
- **Items**
- **Actors**
- **Classes**
- **Weapons**
- **Armors**
- **Enemies**
- **States**

### Parâmetros
- `x`: Valor percentual a adicionar/subtrair

### Comportamento
- Valores são **aditivos** (somam)
- Aplicado **após** after gauge base

### Exemplos

#### Skill com Modifier Positivo
```ruby
# Database: Skill "Quick Attack"
Speed: 500
<ATB After Gauge: +20%>

# Cálculo:
# After gauge base = 500 / 2000 = 25%
# Modifier = +20%
# Total = 25% + 20% = 45%
```

#### Skill com Modifier Negativo
```ruby
# Database: Skill "Slow Spell"
Speed: 0
<ATB After Gauge: -10%>

# Cálculo:
# After gauge base = 0 / 2000 = 0%
# Modifier = -10%
# Total = 0% - 10% = -10% (começa de -10%)
```

#### Stacking
```ruby
# Skill: "Haste"
<ATB After Gauge: +15%>

# Actor 1
<ATB After Gauge: +5%>

# Class: "Speedster"
<ATB After Gauge: +10%>

# State: "Blessed"
<ATB After Gauge: +20%>

# Cálculo:
# Base: 0%
# Skill: +15%
# Actor: +5%
# Class: +10%
# State: +20%
# Total: 50%
```

---

## <ATB Charge Gauge: x%> / <ATB Charge Gauge: +x%> / <ATB Charge Gauge: -x%>

### Descrição
Modifica a gauge de targets em **charging state**.

### Uso
```
<ATB Charge Gauge: x%>
<ATB Charge Gauge: +x%>
<ATB Charge Gauge: -x%>
```

### Onde Usar
- **Skills**
- **Items**

### Parâmetros
- `x`: Valor percentual (setar) ou modifier (adicionar)

### Comportamento
- **Apenas** afeta targets em charging state
- Targets em casting state não são afetados

### Exemplos

#### Setar Valor
```ruby
# Database: Skill "Time Warp"
<ATB Charge Gauge: 75%>

# Resultado:
# Targets em charging têm gauge setada para 75%
```

#### Adicionar Valor
```ruby
# Database: Skill "Haste"
<ATB Charge Gauge: +25%>

# Resultado:
# Targets em charging ganham +25% na gauge
```

#### Subtrair Valor
```ruby
# Database: Skill "Slow"
<ATB Charge Gauge: -15%>

# Resultado:
# Targets em charging perdem -15% da gauge
```

---

## <ATB Cast Gauge: x%> / <ATB Cast Gauge: +x%> / <ATB Cast Gauge: -x%>

### Descrição
Modifica a gauge de targets em **casting state**.

### Uso
```
<ATB Cast Gauge: x%>
<ATB Cast Gauge: +x%>
<ATB Cast Gauge: -x%>
```

### Onde Usar
- **Skills**
- **Items**

### Parâmetros
- `x`: Valor percentual (setar) ou modifier (adicionar)

### Comportamento
- **Apenas** afeta targets em casting state
- Targets em charging state não são afetados

### Exemplos

#### Acelerar Cast
```ruby
# Database: Skill "Quick Cast"
<ATB Cast Gauge: +30%>

# Resultado:
# Targets em casting ganham +30% (cast acelera)
```

#### Atrasar Cast
```ruby
# Database: Skill "Delay"
<ATB Cast Gauge: -20%>

# Resultado:
# Targets em casting perdem -20% (cast atrasa)
```

#### Resetar Cast
```ruby
# Database: Skill "Cancel Magic"
<ATB Cast Gauge: 100%>

# Resultado:
# Targets em casting voltam ao início (100%)
```

---

## <ATB Interrupt>

### Descrição
**Interrompe** targets em casting state, cancelando a ação.

### Uso
```
<ATB Interrupt>
```

### Onde Usar
- **Skills**
- **Items**

### Comportamento
1. Target está em casting state
2. Skill/item acerta o target
3. Casting é **cancelado**
4. Gauge reseta para **0%**
5. Animation/text popup (se configurado)

### Exemplos

#### Skill de Interrupt Básico
```ruby
# Database: Skill "Stun Strike"
<ATB Interrupt>

# Resultado:
# Se acerta um target em casting, interrompe
```

#### Magia Anti-Cast
```ruby
# Database: Skill "Silence"
<ATB Interrupt>
<ATB Cast Gauge: +50%>

# Resultado:
# Interrompe casting E dá +50% (punição)
```

#### Combo com Damage
```ruby
# Database: Skill "Smash"
Damage: 1500
<ATB Interrupt>

# Resultado:
# Causa dano E interrompe casting
```

---

## <ATB Cannot Be Interrupted>

### Descrição
Torna uma skill/item **imune** a interrupts.

### Uso
```
<ATB Cannot Be Interrupted>
```

### Onde Usar
- **Skills**
- **Items**

### Comportamento
- Skills com esta notetag **não podem ser interrompidas**
- Mesmo se acertadas por skills com `<ATB Interrupt>`

### Exemplos

#### Skill Ininterruptível
```ruby
# Database: Skill "Ultimate"
Speed: -2000
<ATB Cannot Be Interrupted>

# Resultado:
# Cast não pode ser interrompido
```

#### Buff Anti-Interrupt
```ruby
# Database: State "Iron Will"
<ATB Cannot Be Interrupted>

# Resultado:
# Enquanto no state, skills não podem ser interrompidas
```

#### Combo com Cast
```ruby
# Database: Skill "Phoenix Flame"
Speed: -1500
<ATB Cannot Be Interrupted>
<ATB Help>
Cast não interrompível.
Dano massivo em 25s.
</ATB Help>

# Resultado:
# Cast longo garantido (não pode ser interrompido)
```

---

## <ATB Battle Start Gauge: +x%> / <ATB Battle Start Gauge: -x%>

### Descrição
Modifica a gauge **inicial** de um battler ao começar batalha.

### Uso
```
<ATB Battle Start Gauge: +x%>
<ATB Battle Start Gauge: -x%>
```

### Onde Usar
- **Actors**
- **Classes**
- **Skills**
- **Weapons**
- **Armors**
- **Enemies**
- **States**

### Parâmetros
- `x`: Valor percentual a adicionar/subtrair

### Comportamento
- Valores são **aditivos** (somam)
- Aplicado **apenas** no início da batalha
- Calculado após JS: Initial Gauge

### Exemplos

#### Enemy Começa com Vantagem
```ruby
# Database: Enemy "Ambush Enemy"
<ATB Battle Start Gauge: +50%>

# Resultado:
# Enemy começa com +50% gauge (surpresa!)
```

#### Actor Começa Desvantagem
```ruby
# Database: State "Surprised"
<ATB Battle Start Gauge: -30%>

# Resultado:
# Actor com state começa com -30% gauge
```

#### Stacking Múltiplas Fontes
```ruby
# Weapon: "Quick Blade"
<ATB Battle Start Gauge: +10%>

# Armor: "Speed Boots"
<ATB Battle Start Gauge: +5%>

# State: "Haste"
<ATB Battle Start Gauge: +15%>

# Cálculo:
# JS: Initial Gauge = 25% (exemplo)
# Weapon = +10%
# Armor = +5%
# State = +15%
# Total = 25% + 10% + 5% + 15% = 55%
```

---

## Exemplos Práticos

### Skill de Haste Completa
```ruby
# Database: Skill "Haste"
Speed: 1000
<ATB After Gauge: +30%>
<ATB Charge Gauge: +20%>

# Resultado:
# - Next turno: 50% (1000/2000) + 30% = 80%
# - Se usado em ally charging: +20% gauge
```

### Skill de Punishment
```ruby
# Database: Skill "Punishment"
<ATB Interrupt>
<ATB Cast Gauge: -30%>
<ATB Charge Gauge: -20%>

# Resultado:
# - Se target casting: Interrupt + -30% (punição)
# - Se target charging: -20% gauge
```

### Boss Imune a Interrupt
```ruby
# Database: Enemy "Boss"
<ATB Battle Start Gauge: +100%>
<ATB Cannot Be Interrupted>

# Database: Skill "Boss Ultimate"
Speed: -2000
<ATB Cannot Be Interrupted>

# Resultado:
# - Boss começa com gauge cheia
# - Ultimate não pode ser interrompida
```

---

## Consulte Também

- [Notetags: JavaScript](javascript.md) - Fórmulas customizadas
- [Features: Skill & Item Speeds](../features/skill-item-speeds.md) - Como speed afeta gauge
- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Charging vs Casting
