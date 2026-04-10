# Mecânica ATB - Como Funciona

## Funcionamento Básico do ATB

O sistema ATB determina quando um battler (actor ou enemy) pode agir baseado no preenchimento de uma **ATB Gauge**. Esta gauge se preenche com o tempo, e quando chega a 100%, o battler pode selecionar uma ação.

## Componentes Principais

### 1. ATB Gauge
A ATB Gauge é uma barra de progresso de 0% a 100% que representa quando o battler pode agir:

- **0%**: Battler acabou de agir ou começou a batalha
- **0-99%**: Gauge preenchendo
- **100%**: Battler pode selecionar uma ação

### 2. Speed (Velocidade)
A speed determina **quão rápido** a gauge se preenche:

- **Speed alto** = Gauge preenche rápido
- **Speed baixo** = Gauge preenche devagar
- Speed é calculado baseado em: AGI stat + modifiers

### 3. AGI (Agility)
A stat AGI do battler influencia diretamente a velocidade:

- AGI alto → battler mais rápido
- AGI baixo → battler mais lento
- **AGI Rate** é a comparação de AGI entre battlers

### 4. Acceleration (Aceleração)
A taxa de preenchimento da gauge por frame, relativa ao tempo de referência.

## Estados da ATB Gauge

### Charging State (Estado de Carga)
Estado normal quando a gauge está se preenchendo:

- Ocorre para skills com **speed ≥ 0**
- Gauge preenche de 0% até 100%
- Quando chega a 100%, battler pode agir
- **Cor visual**: Default (verde/amarelo)

**Fórmula simplificada:**
```
Gauge % = (Tempo decorrido × Speed / AGI) × 100
```

### Casting State (Estado de Cast)
Especial para skills com tempo de preparação:

- Ocorre para skills com **speed < 0**
- Gauge **diminui** em vez de aumentar
- Quando chega a 100%, skill é executada
- Pode ser **interrompido** por ataques
- **Cor visual**: Cast (roxo)

**Fórmula simplificada:**
```
Gauge % = 100% - (|Speed| × Tempo)
```

### Full State (Estado Pronto)
Battler pronto para agir:

- Gauge = 100%
- Battler pode selecionar ação
- Gauge **para de preencher**
- **Cor visual**: Full (verde brilhante)

### Stopped State (Estado Parado)
Battler não pode preencher gauge:

- Speed = 0
- Gauge não se move
- Causado por: stuns, paralisia, etc.
- **Cor visual**: Stop (vermelho)

## Cálculos de Speed

### Speed Formula (Básica)
```
Speed = Base Speed × Relative Speed × Acceleration
```

### Base Speed
Velocidade base do battler, calculada usando:
- AGI stat
- Level
- Outros fatores

**JavaScript customization:**
```javascript
// Plugin Parameter: JS: Base Speed
// Retorna valor numérico
user.agi + user.luk / 2
```

### Relative Speed
Velocidade relativa comparada a outros battlers:
- Normalmente baseado em AGI
- Determina AGI Rate (Slow/Fast)

**JavaScript customization:**
```javascript
// Plugin Parameter: JS: Relative Speed
// Retorna valor numérico
user.agi / referencia_agi_media
```

### Acceleration
Taxa de aceleração da gauge:
- Quanto a gauge preenche por frame
- Relativa ao tempo de referência
- Pode ser modificada por buffs/debuffs

**JavaScript customization:**
```javascript
// Plugin Parameter: JS: Acceleration
// Retorna valor numérico
1.0 // velocidade normal
```

## AGI Gauge Rates

Os estados "Slow" e "Fast" são determinados por AGI Rate thresholds:

### Slow Rate
- Se AGI Rate ≤ Slow Rate, battler está **Slow**
- Gauge preenche mais devagar
- **Cor visual**: Slow Color (laranja)

### Fast Rate
- Se AGI Rate ≥ Fast Rate, battler está **Fast**
- Gauge preenche mais rápido
- **Cor visual**: Fast Color (azul)

**Exemplo:**
```
Slow Rate: 0.8
Fast Rate: 1.2

Battler A (AGI 50) vs Battler B (AGI 100)
AGI Rate A = 50/100 = 0.5 (Slow)
AGI Rate B = 100/50 = 2.0 (Fast)
```

## Skill & Item Speeds

### Speed Positivo
No ATB, speed positivo **afeta a gauge do próximo turno**:

```
After Gauge % = Speed / 2000

Exemplos:
- Speed 2000 → 100% gauge (ação imediata)
- Speed 1000 → 50% gauge
- Speed 500 → 25% gauge
- Speed 0 → 0% gauge (normal)
```

### Speed Negativo
Cria um **casting state**:

```
Cast Time = |Speed| / 1000 frames

Exemplo:
- Speed -1000 → 1000 frames de cast
- Speed -500 → 500 frames de cast
```

## Battle Start Gauge

Ao começar uma batalha, battlers não começam com 0% gauge por padrão.

### Initial Gauge Formula
```javascript
// Plugin Parameter: JS: Initial Gauge
// Retorna valor entre 0 e 1

Math.random() * 0.5 // 0% a 50% aleatório
```

### Battle Start Gauge Modifiers
Notetags podem modificar a gauge inicial:

```
<ATB Battle Start Gauge: +20%>
// Battler começa com 20% extra

<ATB Battle Start Gauge: -10%>
// Battler começa com 10% a menos
```

## After Gauge Modifier

Após executar uma ação, a gauge pode ser modificada:

### After Gauge Formula
```
New Gauge % = After Gauge Value + Accumulated Modifiers
```

### Modificadores Acumulados
Várias fontes podem modificar o after gauge:
- Notetag `<ATB After Gauge: +x%>` na skill
- Notetag `<ATB After Gauge: +x%>` no actor/class/state
- Valores são **aditivos** (somam)

**Exemplo:**
```
Skill tem <ATB After Gauge: +10%>
Actor tem <ATB After Gauge: -5%>
State tem <ATB After Gauge: +15%>

Total: +10% -5% +15% = +20%
```

## Interrupt System

### O que é Interrupt?
Interrupt é cancelar uma skill em casting:
- Target está em **Casting State** (speed < 0)
- Skill com `<ATB Interrupt>` acerta o target
- Ação é **cancelada**
- Gauge reseta para **0%**

### Quando Interrupt Ocorre?
1. Target está casting (speed < 0)
2. Skill/Item com notetag `<ATB Interrupt>` é usado
3. Target não tem `<ATB Cannot Be Interrupted>`
4. Skill acerta o target

### Efeitos do Interrupt
- Casting action cancelada
- Gauge reseta para 0%
- Animation (se CoreEngine instalado)
- Text popup (se configurado)
- Flash effect (se configurado)

## Fórmulas JavaScript Customizáveis

### JS: Initial Gauge
Determina gauge inicial:
```javascript
// Retorna valor entre 0 e 1
Math.random() * 0.5
```

### JS: Speed
Determina speed do battler:
```javascript
// Retorna valor numérico
user.agi
```

### JS: Base Speed
Determina velocidade base:
```javascript
// Retorna valor numérico
user.agi + user.luk / 2
```

### JS: Relative Speed
Determina velocidade relativa:
```javascript
// Retorna valor numérico
user.agi / $gameParty.agiAverage()
```

### JS: Acceleration
Determina aceleração:
```javascript
// Retorna valor numérico
1.0
```

### JS: Cast Time
Determina tempo de cast:
```javascript
// item: o objeto skill/item
// Retorna valor numérico (frames)
Math.abs(item.speed)
```

## Fluxo Completo de Um Turno

```
1. BATALHA COMEÇA
   ↓
2. Initial Gauge aplicado
   ↓
3. Gauge preenche (Charging/Casting)
   - Speed × Acceleration / Frame
   ↓
4. Gauge chega a 100%?
   SIM → Battler pode agir
   NÃO → Continua preenchendo
   ↓
5. Skill/Item selecionado
   ↓
6. Speed < 0 (Cast)?
   SIM → Casting State (gauge diminui)
       - Pode ser Interrupt?
       - Gauge chega a 0 → Skill executada
   NÃO → Skill executada imediatamente
   ↓
7. After Gauge aplicado
   - Gauge reseta para valor calculado
   ↓
8. LOOP RETORNA AO PASSO 3
```

## Considerações de Balanceamento

### Speed Balance
- Speed muito alto → battlers agem muito rápido
- Speed muito baixo → battlers nunca agem
- Recomendado: baseado em AGI stat

### AGI Rate Balance
- Fast Rate muito baixo → todos são "fast"
- Slow Rate muito alto → todos são "slow"
- Recomendado: Slow=0.8, Fast=1.2

### Cast Time Balance
- Cast muito longo → frustrante para jogador
- Cast muito curto → sem sentido ter cast
- Recomendado: 500-2000 frames (~8-33 segundos)

### Interrupt Balance
- Interrupt muito fácil → casts inúteis
- Interrupt impossível → casts overpowered
- Recomendado: apenas algumas skills com interrupt

## Consulte Também

- [Parâmetros: Mecânica](../configuration/parametros-mecanica.md) - Para customizar fórmulas
- [Skill & Item Speeds](../features/skill-item-speeds.md) - Como speed afeta gameplay
- [Notetags: Gauge Manipulation](../notetags/gauge-manipulation.md) - Para manipular gauges
