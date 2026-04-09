# Skills e Items Notetags

Notetags disponíveis para Skills e Items no sistema ATB.

## General ATB Notetags

### <ATB Help>
Fornece texto de ajuda alternativo quando o jogo está em modo ATB.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Help>
description line 1
description line 2
</ATB Help>
```

**Exemplo**:
```
<ATB Help>
Custo: 25% ATB
Tempo de cast: 2s
</ATB Help>
```

**Uso**: Quando skill se comporta diferente em ATB vs outros battle systems

---

## Gauge Manipulation Notetags

### <ATB Charge Gauge: x%>
Define a gauge do target para x% se ele estiver em **charging state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Charge Gauge: 50%>
```

**Exemplo**: Skill que "recarrega" aliados
```
<ATB Charge Gauge: 100%>
```

### <ATB Charge Gauge: +x%>
Adiciona x% à gauge do target se ele estiver em **charging state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Charge Gauge: +25%>
```

**Exemplo**: Haste buff
```
<ATB Charge Gauge: +30%>
```

### <ATB Charge Gauge: -x%>
Subtrai x% da gauge do target se ele estiver em **charging state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Charge Gauge: -20%>
```

**Exemplo**: Slow debuff
```
<ATB Charge Gauge: -25%>
```

### <ATB Cast Gauge: x%>
Define a gauge do target para x% se ele estiver em **casting state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Cast Gauge: 0%>
```

**Exemplo**: Skill que cancela casting (sem ser interrupt)
```
<ATB Cast Gauge: 0%>
```

### <ATB Cast Gauge: +x%>
Adiciona x% à gauge do target se ele estiver em **casting state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Cast Gauge: +10%>
```

### <ATB Cast Gauge: -x%>
Subtrai x% da gauge do target se ele estiver em **casting state**.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Cast Gauge: -15%>
```

**Exemplo**: Skill que atrasa casting
```
<ATB Cast Gauge: -30%>
```

### <ATB After Gauge: x%>
Define a gauge do user para x% **após usar** o skill/item.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB After Gauge: 50%>
```

**Exemplo**: Skill com "cooldown" na gauge
```
<ATB After Gauge: 0%>
```

### <ATB After Gauge: +x%>
Adiciona x% à gauge do user **após usar** o skill/item.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB After Gauge: +20%>
```

**Exemplo**: Skill rápido que não penaliza muito
```
<ATB After Gauge: +15%>
```

### <ATB After Gauge: -x%>
Subtrai x% da gauge do user **após usar** o skill/item.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB After Gauge: -10%>
```

**Exemplo**: Skill poderoso com penalidade
```
<ATB After Gauge: -30%>
```

---

## Interrupt Notetags

### <ATB Interrupt>
Se este skill/item atingir um target em **casting state**, interrompe a ação.

**Usado em**: Skill, Item

**Efeito**:
- Cancela a ação em casting
- Reseta a gauge do target para 0%
- Mostra popup/flash/animação de interrupt

**Sintaxe**:
```
<ATB Interrupt>
```

**Exemplo**: Ataque físico que interrompe magia
```
<ATB Interrupt>
```

**Uso estratégico**: Habilidades físicas, projéteis, counterspells

### <ATB Cannot Be Interrupted>
Torna este skill/item **imune** a interrupções.

**Usado em**: Skill, Item

**Sintaxe**:
```
<ATB Cannot Be Interrupted>
```

**Exemplo**: Ultimate não-interrompível
```
<ATB Cannot Be Interrupted>
```

**Uso estratégico**: Habilidades poderosas, ultimate abilities

---

## JavaScript Notetags

### <JS ATB Charge Gauge>
Código JavaScript para determinar modificação da gauge em **charging state**.

**Usado em**: Skill, Item

**Variáveis disponíveis**:
- `target` - Battler alvo
- `rate` - Valor atual da gauge (0-1), retorne novo valor

**Sintaxe**:
```
<JS ATB Charge Gauge>
rate = code;
</JS ATB Charge Gauge>
```

**Exemplo**: Aumenta gauge baseado em AGI do target
```
<JS ATB Charge Gauge>
rate = Math.min(1, rate + (target.agi / 1000));
</JS ATB Charge Gauge>
```

### <JS ATB Cast Gauge>
Código JavaScript para determinar modificação da gauge em **casting state**.

**Usado em**: Skill, Item

**Variáveis disponíveis**:
- `target` - Battler alvo
- `rate` - Valor atual da gauge (0-1), retorne novo valor

**Sintaxe**:
```
<JS ATB Cast Gauge>
rate = code;
</JS ATB Cast Gauge>
```

**Exemplo**: Reseta casting mas deixa bônus
```
<JS ATB Cast Gauge>
rate = 0.3;
</JS ATB Cast Gauge>
```

### <JS ATB After Gauge>
Código JavaScript para determinar modificação da gauge **após ação**.

**Usado em**: Skill, Item

**Variáveis disponíveis**:
- `user` - Battler que usou o skill/item
- `rate` - Valor da gauge pós-ação (padrão: 0), retorne novo valor

**Sintaxe**:
```
<JS ATB After Gauge>
rate = code;
</JS ATB After Gauge>
```

**Exemplo**: Gauge pós-ação baseada em AGI
```
<JS ATB After Gauge>
rate = user.agi / 200;
</JS ATB After Gauge>
```

**Exemplo**: Quanto menor HP, mais rápido o próximo turno
```
<JS ATB After Gauge>
var hpRate = user.hp / user.mhp;
rate = (1 - hpRate) * 0.5;
</JS ATB After Gauge>
```

---

## Exemplos Completos

### Skill Rápida com Baixo Cooldown
```
<ATB After Gauge: +20%>
```
Rápido de usar, rápido para recarregar

### Skill Poderosa com Alto Cooldown
```
<ATB After Gauge: -40%>
<ATB Interrupt>
```
Lento de usar, pode interromper inimigos

### Buff de Velocidade
```
<ATB Charge Gauge: +30%>
<ATB Help>
Acelera recarga de aliados em 30%
</ATB Help>
```

### Counterspell (Cancela Magia)
```
<ATB Cast Gauge: 0%>
<ATB Interrupt>
<ATB Help>
Interrompe e reseta casting do alvo
</ATB Help>
```

### Ultimate Imune
```
<ATB Cannot Be Interrupted>
<ATB After Gauge: -50%>
<ATB Help>
Poderosa ultimate não-interrompível
</ATB Help>
```

### JS Custom: Haste Diminuindo
```
<JS ATB After Gauge>
var hasteLevel = user._hasteLevel || 0;
rate = 0.2 + (hasteLevel * 0.1);
user._hasteLevel = Math.max(0, hasteLevel - 1);
</JS ATB After Gauge>
```

## Ver Também

- [Actors e Enemies](./actors-enemies.md) - Notetags para battlers
- [States](./states.md) - Notetags para estados
- [Interrupts](../configuration/interrupts.md) - Configurar sistema de interrupção

## Troubleshooting

**Notetag não funciona**: Verificar se:
1. Sintaxe está correta (sem erros de digitação)
2. Plugin está habilitado
3. Database object correto (Skill vs Item)

**JS notetag causa erro**: Verificar:
1. Sintaxe JavaScript válida
2. Variáveis existem no contexto
3. Retorno é número entre 0-1 para `rate`
