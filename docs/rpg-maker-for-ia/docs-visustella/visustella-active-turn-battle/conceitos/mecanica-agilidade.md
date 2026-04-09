# Mecânica de Agilidade

A estatística **AGI (Agility)** é o fator primário que determina a velocidade de enchimento das barras de ATB. Compreender sua mecânica é essencial para balancear o combate.

## Como AGI Afeta o ATB

### Conceito Básico

Battlers com AGI maior ench suas barras de ATB mais rapidamente. A relação não é linear, pois envolve múltiplas fórmulas:

```
Speed (por frame) = f(Base Speed, Relative Speed, Acceleration)
Gauge += Speed * DeltaTime
```

### Fórmulas Envolvidas

O plugin usa 4 fórmulas JavaScript configuráveis:

1. **JS: Speed** - Velocidade final do battler
2. **JS: Base Speed** - Speed base individual
3. **JS: Relative Speed** - Speed relativo ao battler de referência
4. **JS: Acceleration** - Aceleração por unidade de tempo

## Parâmetros Configuráveis

### JS: Initial Gauge
Determina quanto de gauge cada battler tem ao iniciar a batalha.

**Padrão**: Baseado em AGI relativa ao máximo AGI do campo

```javascript
// Exemplo: Gauge inicial baseada em AGI
b.agi / max_agi * 100
```

### JS: Speed
Fórmula principal que determina a velocidade de enchimento.

**Padrão**: `user.agi`

**Exemplo customizado**:
```javascript
// AGI com bônus para personagens rápidos
user.agi * (user.agi > 100 ? 1.5 : 1.0)
```

### JS: Base Speed
Speed base do battler individual.

**Padrão**: Fórmula interna considerando AGI

### JS: Relative Speed
Speed relativo ao battler de referência (normalmente o mais rápido).

### JS: Acceleration
Quanto a gauge acelera por frame relativo ao tempo de referência.

### JS: Cast Time
Para skills com speed negativo (casting), determina quanto tempo de cast.

**Relação com Speed**:
```
Cast Time = f(Speed negativo da skill)
```

## Fatores que Modificam AGI

### Estados (States)
Alguns estados podem modificar a velocidade de enchimento:
- **Slow**: Reduz velocidade
- **Stop**: Para completamente
- **Fast**: Aumenta velocidade
- **Haste/Slow spells**: Via notetags

### Notetags de Modificação

Use notetags para modificar gauge via skills/states:

```
<ATB Battle Start Gauge: +25%>
```
Battler começa com 25% de gauge extra.

```
<ATB After Gauge: +10%>
```
Após usar skill/item, gauge avança 10%.

## Balanceamento por AGI

### Considerações de Design

**AGI baixo (50-75)**:
- ⏱️ Barras enchem lentamente
- 🎯 Boa para inimigos tanky ou lentos
- ⚠️ Pode frustrar se muito baixo

**AGI médio (76-120)**:
- ⏱️ Velocidade equilibrada
- 🎯 Padrão para a maioria dos battlers
- ✅ Bom ponto de balanceamento

**AGI alto (121+)**:
- ⏱️ Barras enchem rapidamente
- 🎯 Ideal para classes rápidas (rogues, mages)
- ⚡ Pode dominar combate se não mitigado

### Diferença entre Personagens

Para criar variedade, use faixas de AGI:

```javascript
// Tank: AGI 60
// Warrior: AGI 80
// Mage: AGI 90
// Rogue: AGI 130
```

Isso cria uma ordem de turnos natural: Rogue → Mage → Warrior → Tank

## Ver Também

- [O que é ATB?](./o-que-e-atb.md) - Visão geral do sistema
- [Estados de Combate](./estados-combate.md) - Estados que modificam AGI
- [Timing e Fórmulas](../configuration/timing-formulas.md) - Configuração completa

## Troubleshooting

**Barras não enchem**: Verificar se System está em TPB mode

**Barras enchem muito rápido/lento**: Ajustar fórmulas JS: Speed e Acceleration

**AGI não parece fazer diferença**: Verificar se não há override em JS: Base Speed
