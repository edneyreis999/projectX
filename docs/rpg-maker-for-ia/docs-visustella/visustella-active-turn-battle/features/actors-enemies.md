# Actors e Enemies Notetags

Notetags disponíveis para Actors, Classes, Weapons, Armors e Enemies no sistema ATB.

## Battle Start Gauge Notetags

### <ATB Battle Start Gauge: +x%>
Battler começa a batalha com **x% de gauge extra**.

**Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy, State

**Sintaxe**:
```
<ATB Battle Start Gauge: +25%>
```

**Exemplo**: Rogue começa com vantagem
```
<ATB Battle Start Gauge: +30%>
```

**Stacking**: Valores são aditivos quando múltiplas fontes se aplicam

**Exemplo de stacking**:
```
# Actor base
<ATB Battle Start Gauge: +10%>

# Weapon bonus
<ATB Battle Start Gauge: +15%>

# State bonus
<ATB Battle Start Gauge: +20%>

# Total: 10% + 15% + 20% = 45% extra
```

### <ATB Battle Start Gauge: -x%>
Battler começa a batalha com **x% de gauge a menos** (penalidade).

**Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy, State

**Sintaxe**:
```
<ATB Battle Start Gauge: -20%>
```

**Exemplo**: Tank pesado começa desvantajado
```
<ATB Battle Start Gauge: -15%>
```

**Uso estratégico**:
- Penalizar classes/armors pesados
- Dar vantagem a classes rápidas
- Criar variedade na ordem de turnos iniciais

---

## Field Gauge Marker Notetags

### <ATB Field Gauge Icon: x>
Define qual ícone usar como marcador no **Field Gauge**.

**Usado em**: Actor, Enemy

**Sintaxe**:
```
<ATB Field Gauge Icon: 42>
```

**Parâmetro**:
- `x` = Índice do ícone (0+)

**Exemplo**: Actor específico com ícone customizado
```
<ATB Field Gauge Icon: 78>
```

### <ATB Field Gauge Face: filename, index>
Define qual face usar como marcador no **Field Gauge**.

**Usado em**: Actor, Enemy

**Sintaxe**:
```
<ATB Field Gauge Face: Actor1, 0>
```

**Parâmetros**:
- `filename` = Nome do arquivo de face (sem extensão)
- `index` = Índice da face no arquivo (0, 1, 2, ou 3)

**Exemplo**: Enemy com face customizada
```
<ATB Field Gauge Face: Monster, 1>
```

**Nota**: Face deve existir em `img/faces/`

---

## Visibility Notetags

### <Hide ATB Gauge>
Oculta a barra de ATB deste enemy.

**Usado em**: Enemy (apenas)

**Sintaxe**:
```
<Hide ATB Gauge>
```

**Exemplo**: Boss misterioso sem gauge visível
```
<Hide ATB Gauge>
```

**Uso estratégico**:
- Criar incerteza sobre quando enemy agirá
- Bosses misteriosos
- Enemies surpresa

**Nota**: Ainda funciona com Field Gauge, mas não mostra gauge individual

---

## Exemplos Completos

### Rogue Rápido
```
<ATB Battle Start Gauge: +30%>
<ATB Field Gauge Icon: 87>
```
Começa com vantagem de velocidade

### Tank Pesado
```
<ATB Battle Start Gauge: -15%>
```
Começa em desvantagem por ser lento

### Mage com Vantagem
```
<ATB Battle Start Gauge: +20%>
<ATB Field Gauge Face: Mage, 0>
```
Começa pronto para castar

### Boss Misterioso
```
<Hide ATB Gauge>
<ATB Battle Start Gauge: +40%>
```
Gauge oculta mas começa com vantagem

### Equipment Bonus
Weapon:
```
<ATB Battle Start Gauge: +10%>
```

Armor:
```
<ATB Battle Start Gauge: +5%>
```

State (Haste):
```
<ATB Battle Start Gauge: +15%>
```

---

## Por Database Object

### Actor
- ✅ Battle Start Gauge
- ✅ Field Gauge Icon
- ✅ Field Gauge Face

### Class
- ✅ Battle Start Gauge
- ❌ Field Gauge markers
- ❌ Hide ATB Gauge

### Weapon
- ✅ Battle Start Gauge
- ❌ Field Gauge markers

### Armor
- ✅ Battle Start Gauge
- ❌ Field Gauge markers

### Enemy
- ✅ Battle Start Gauge
- ✅ Field Gauge Icon
- ✅ Field Gauge Face
- ✅ Hide ATB Gauge

### State
- ✅ Battle Start Gauge
- ❌ Field Gauge markers
- ❌ Hide ATB Gauge

---

## Balanceamento por Classe

### Exemplo de Balanceamento

**Rogue** (Actor):
```
<ATB Battle Start Gauge: +30%>
```
Rápido, age primeiro

**Warrior** (Actor):
```
<ATB Battle Start Gauge: +10%>
```
Equilibrado

**Mage** (Actor):
```
<ATB Battle Start Gauge: +20%>
```
Vantagem mágica

**Tank** (Actor):
```
<ATB Battle Start Gauge: -10%>
```
Lento mas tanky

---

## Plugin Commands Relacionados

### Actor Commands
- `Actor: Change Field Gauge Icon` - Altera ícone em runtime
- `Actor: Change Field Gauge Face` - Altera face em runtime
- `Actor: Clear Field Gauge Graphic` - Reseta para padrão

### Enemy Commands
- `Enemy: Change Field Gauge Icon` - Altera ícone em runtime
- `Enemy: Change Field Gauge Face` - Altera face em runtime
- `Enemy: Clear Field Gauge Graphic` - Reseta para padrão

## Ver Também

- [Skills e Items](./skills-items.md) - Notetags para habilidades
- [States](./states.md) - Notetags para estados
- [Field Gauge](../configuration/field-gauge.md) - Configurar Field Gauge

## Troubleshooting

**Gauge inicial não aplica**: Verificar se:
1. Sintaxe correta (+ ou -)
2. Porcentagem válida (0-100)
3. Múltiplas fontes estão sendo aplicadas

**Marker não aparece no Field Gauge**: Verificar:
1. Field Gauge está habilitado
2. Sprite Type está correto (Icon/Face)
3. Índice de ícone/face está correto

**Hide ATB Gauge não funciona**:
- Disponível apenas para Enemies
- Verificar se "Show Sprite Gauges" está true nos parâmetros
