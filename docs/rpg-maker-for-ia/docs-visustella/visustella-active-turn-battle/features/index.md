# Features (Notetags)

Esta seção documenta todos os notetags disponíveis no plugin para customizar comportamentos de skills, items, actors, enemies e states.

## Documentos

### [Skills e Items](./skills-items.md)
Notetags para habilidades e itens, incluindo manipulação de gauge, interrupts e help text.

### [Actors e Enemies](./actors-enemies.md)
Notetags para personagens e inimigos, incluindo gauge inicial e visibilidade.

### [States](./states.md)
Notetags para estados que modificam comportamento de ATB.

## Visão Geral dos Notetags

### Por Categoria

**General ATB**:
- `<ATB Help>` - Descrição alternativa para ATB

**Gauge Manipulation**:
- `<ATB Charge Gauge>` - Modifica gauge em charging
- `<ATB Cast Gauge>` - Modifica gauge em casting
- `<ATB After Gauge>` - Modifica gauge pós-ação

**Interrupts**:
- `<ATB Interrupt>` - Interrrompe casting
- `<ATB Cannot Be Interrupted>` - Imune a interrupts

**Battle Start**:
- `<ATB Battle Start Gauge>` - Gauge inicial da batalha

**Field Gauge**:
- `<ATB Field Gauge Icon>` - Ícone no field gauge
- `<ATB Field Gauge Face>` - Face no field gauge

**Visibility**:
- `<Hide ATB Gauge>` - Oculta gauge (enemy only)

**JavaScript**:
- `<JS ATB Charge Gauge>` - Fórmula JS para charging
- `<JS ATB Cast Gauge>` - Fórmula JS para casting
- `<JS ATB After Gauge>` - Fórmula JS para pós-ação

## Por Database Object

| Database Object | Notetags Disponíveis |
|-----------------|---------------------|
| Skill | Todos exceto Hide ATB Gauge |
| Item | Todos exceto Hide ATB Gauge, Field Gauge |
| Actor | Battle Start, Field Gauge |
| Class | Battle Start |
| Weapon | Battle Start, After Gauge |
| Armor | Battle Start, After Gauge |
| Enemy | Todos |
| State | Battle Start, After Gauge |

## Sintaxe Básica

### Notetag Simples
```
<ATB Interrupt>
```
Usado para: Habilidades que interrompem casting

### Notetag com Valor
```
<ATB After Gauge: 50%>
```
Define gauge para 50% após usar

### Notetag com Modificador
```
<ATB After Gauge: +25%>
```
Adiciona 25% à gauge após usar

### Notetag Multilinha
```
<ATB Help>
Esta skill tem efeito
diferente em ATB
</ATB Help>
```

### Notetag JS
```
<JS ATB Cast Gauge>
rate = target.agi / 100;
</JS ATB Cast Gauge>
```

## Navegação

- ← [Voltar ao índice principal](../index.md)
- → [Conceitos](../conceitos/) - Entender o sistema primeiro
- → [Configuration](../configuration/) - Configurar parâmetros

## Dica de Uso

**Recomendado**: Comece com notetags simples, depois avance para JS:
1. `<ATB Battle Start Gauge>` para ajustar iniciais
2. `<ATB After Gauge>` para balanceamento pós-ação
3. `<ATB Interrupt>` para habilidades estratégicas
4. `<JS ...>` para customização avançada
