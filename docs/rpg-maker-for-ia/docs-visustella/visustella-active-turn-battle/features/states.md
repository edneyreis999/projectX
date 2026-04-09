# States Notetags

Notetags disponíveis para States no sistema ATB.

## Battle Start Gauge Notetags

### <ATB Battle Start Gauge: +x%>
Quando um battler inicia batalha com este state, ganha **x% de gauge extra**.

**Usado em**: State

**Sintaxe**:
```
<ATB Battle Start Gauge: +25%>
```

**Exemplo**: State "Haste" dá vantagem inicial
```
<ATB Battle Start Gauge: +30%>
```

**Stacking**: Aditivo com outras fontes (Actor, Class, Equipment)

**Exemplo prático**:
```
# State: Preemptive Strike (Surprise)
<ATB Battle Start Gauge: +50%>
```
Party inteira começa com metade da gauge cheia

### <ATB Battle Start Gauge: -x%>
Quando um battler inicia batalha com este state, perde **x% de gauge** (penalidade).

**Usado em**: State

**Sintaxe**:
```
<ATB Battle Start Gauge: -20%>
```

**Exemplo**: State "Slow" penaliza início
```
<ATB Battle Start Gauge: -30%>
```

**Uso estratégico**:
- Debuffs de início de batalha
- Ambientes hostis
- Estados de surpresa desfavorável

---

## After Gauge Notetags

### <ATB After Gauge: +x%>
Após usar um skill/item, battler com este state ganha **x% de gauge extra**.

**Usado em**: State

**Sintaxe**:
```
<ATB After Gauge: +15%>
```

**Exemplo**: State "Adrenaline" faz agir mais rápido
```
<ATB After Gauge: +20%>
```

**Stacking**: Aditivo com outras fontes

**Comportamento**:
- Aplica-se a cada ação do battler
- Cumulativo com buffs de speed
- Ótimo para estados temporários de "haste"

### <ATB After Gauge: -x%>
Após usar um skill/item, battler com este state perde **x% de gauge**.

**Usado em**: State

**Sintaxe**:
```
<ATB After Gauge: -10%>
```

**Exemplo**: State "Exhausted" penaliza após cada ação
```
<ATB After Gauge: -15%>
```

**Uso estratégico**:
- Debuffs de exaustão
- Penalidades pós-ultimate
- Estados de sobrecarga

---

## Exemplos Completos de States

### State: Haste (Buff)
```
<ATB Battle Start Gauge: +20%>
<ATB After Gauge: +15%>
```
Começa com vantagem e recupera gauge mais rápido

### State: Slow (Debuff)
```
<ATB Battle Start Gauge: -20%>
<ATB After Gauge: -10%>
```
Começa desvantajoso e recupera gauge mais lento

### State: Berserk
```
<ATB After Gauge: +25%>
```
Ataca freneticamente (turnos rápidos)

### State: Freeze/Paralyze
```
<ATB After Gauge: -50%>
```
Muito lento para agir

### State: Quick Thinking (Passive)
```
<ATB Battle Start Gauge: +10%>
<ATB After Gauge: +5%>
```
Pequena vantagem consistente

### State: Heavy Armor Penalty
```
<ATB Battle Start Gauge: -15%>
```
Penalidade por armadura pesada

### State: Adrenaline Rush (Temporário)
```
<ATB After Gauge: +30%>
```
Turnos muito rápidos por duração limitada

### State: Exhaustion (Pós-Ultimate)
```
<ATB After Gauge: -25%>
```
Penalidade após usar habilidade poderosa

---

## Integração com Mecânicas de State

### Stack com State Features

States podem combinar notetags ATB com features nativas:

**State: Haste Completa**
```
<ATB Battle Start Gauge: +20%>
<ATB After Gauge: +15%>
```
+ Features nativas:
- AGI +20%
- Speed +30%

**State: Slow Completo**
```
<ATB Battle Start Gauge: -20%>
<ATB After Gauge: -15%>
```
+ Features nativas:
- AGI -20%
- Speed -30%

### Auto-Removal vs Persistent

**Persistent States** (Buff/Debuff longo):
```
<ATB After Gauge: +10%>
```
Aplica continuamente enquanto state durar

**Temporary States** (Curta duração):
```
<ATB After Gauge: +30%>
```
Grande bônus por curto período

---

## Design de Estados por Categoria

### Buffs de Velocidade

**Minor Haste**:
```
<ATB Battle Start Gauge: +10%>
<ATB After Gauge: +5%>
```

**Major Haste**:
```
<ATB Battle Start Gauge: +25%>
<ATB After Gauge: +15%>
```

**Ultimate Haste** (Curto):
```
<ATB After Gauge: +40%>
```

### Debuffs de Lentidão

**Minor Slow**:
```
<ATB Battle Start Gauge: -10%>
<ATB After Gauge: -5%>
```

**Major Slow**:
```
<ATB Battle Start Gauge: -25%>
<ATB After Gauge: -15%>
```

**Crippling Slow**:
```
<ATB Battle Start Gauge: -40%>
<ATB After Gauge: -25%>
```

### Estados Situacionais

**Surprise (Favorável)**:
```
<ATB Battle Start Gauge: +40%>
```

**Surprise (Desfavorável)**:
```
<ATB Battle Start Gauge: -30%>
```

**Ambiente Hostil**:
```
<ATB Battle Start Gauge: -15%>
```

**Preparation (Pré-battle)**:
```
<ATB Battle Start Gauge: +25%>
```

---

## Balanceamento

### Guidelines

**Valores pequenos** (5-15%):
- Buffs passivos menores
- Estados de longa duração
- Equipamento

**Valores médios** (15-30%):
- Buffs ativos significativos
- Estados de média duração
- Habilidades de suporte

**Valores grandes** (30%+):
- Ultimates/limit breaks
- Estados muito curtos (1-3 turns)
- Situações especiais

### Stacking

Múltiplas fontes somam:
```
Actor base:        +10%
Equipment:         +15%
State (Haste):     +20%
State (Adrenaline):+15%
─────────────────────────
Total:             +60%
```

**Cuidado**: Stacking excessivo pode quebrar balanceamento

---

## Ver Também

- [Actors e Enemies](./actors-enemies.md) - Notetags para battlers
- [Skills e Items](./skills-items.md) - Notetags para habilidades
- [Estados de Combate](../conceitos/estados-combate.md) - Estados do sistema

## Troubleshooting

**State não aplica bônus**: Verificar:
1. Sintaxe correta (+ ou -)
2. State está realmente aplicado ao battler
3. Porcentagem válida (0-100)

**Bônus não é suficiente**: Aumentar valor ou verificar se está sendo negado por outro state

**State quebra balanceamento**: Reduzir valores ou limitar duração do state
