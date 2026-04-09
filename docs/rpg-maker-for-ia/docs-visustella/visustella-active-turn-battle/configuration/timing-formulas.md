# Timing e Fórmulas

Fórmulas JavaScript que controlam a velocidade, aceleração e comportamento temporal do sistema ATB.

## Visão Geral

O plugin usa fórmulas JavaScript configuráveis para determinar como as barras de ATB enchem. Estas fórmulas permitem customização profunda do balanceamento de combate.

**Requisito**: Conhecimento de JavaScript é recomendado

## Fórmulas Principais

### JS: Initial Gauge
Determina quanto de gauge cada battler tem ao **iniciar a batalha**.

**Retorno**: Valor entre 0 e 1 (onde 1 = 100%)

**Variável disponível**: `b` (battler)

**Exemplo padrão**:
```javascript
b.agi / max_agi
```

**Exemplos customizados**:
```javascript
// Todos começam com 0%
0

// Actors com vantagem inicial
b.isActor() ? 0.3 : 0

// Baseado em level
b.level / 99

// Aleatório com vantagem AGI
(Math.random() * 0.2) + (b.agi / max_agi * 0.3)
```

### JS: Speed
Determina a **velocidade final** do battler por frame.

**Retorno**: Número representando speed por frame

**Variável disponível**: `user` (battler)

**Exemplo padrão**:
```javascript
user.agi
```

**Exemplos customizados**:
```javascript
// AGI com bônus exponencial para rápidos
Math.pow(user.agi, 1.2)

// Considerando equipment bonus
user.agi + user.atk * 0.1

// HP baixo = mais rápido (desespero)
user.agi * (user.hp < user.mhp * 0.3 ? 1.5 : 1.0)

// Fórmula complexa com múltiplos fatores
(user.agi * 2) + (user.luk * 0.5) + (user.level * 0.1)
```

### JS: Base Speed
Determina o **speed base** individual do battler.

**Retorno**: Número representando speed base

**Variável disponível**: `battler` (battler atual)

**Uso**: Speed calculado independentemente de referências

### JS: Relative Speed
Determina o speed **relativo** ao battler de referência (normalmente o mais rápido).

**Retorno**: Fator multiplicativo de speed

**Uso**: Normaliza speed comparado ao battler mais rápido

**Exemplo**:
```javascript
// Speed relativo ao battler mais rápido do campo
battler.agi / fastest_battler.agi
```

### JS: Acceleration
Determina quanto a gauge **acelera** por unidade de tempo.

**Retorno**: Fator de aceleração

**Uso**: Cria movimento não-linear da gauge (ex: aceleração progressiva)

**Exemplo**:
```javascript
// Aceleração constante
1.0

// Aceleração progressiva
time_elapsed * 0.001

// Desaceleração (battlers ficam mais lentos)
Math.max(0.5, 1.0 - (time_elapsed * 0.0001))
```

### JS: Cast Time
Determina o **tempo de cast** para skills com speed negativo.

**Retorno**: Frames de cast

**Variável disponível**: `speed` (valor negativo da skill)

**Relação**: Maior speed negativo = maior cast time

**Exemplo padrão**:
```javascript
-speed * 10
```

**Exemplos customizados**:
```javascript
// Cast time fixo independentemente de speed
60

// Cast time baseado em AGI do caster
-speed * (100 / user.agi)

// Cast time reduzido por level
(-speed * 10) * (100 / (100 + user.level))

// Cast time com minimum de 30 frames
Math.max(30, -speed * 8)
```

## Outras Configurações

### Escape Fail Penalty
**Descrição**: Penalidade na gauge ao **falhar na fuga** da batalha

**Valor**: Porcentagem (ex: 50 = 50%)

**Comportamento**: Reseta a gauge para X% ao falhar fuga

**Exemplo**: `50` → Gauge reseta para 50%

### Stuns Reset Gauge?
**Descrição**: Se estados de stun **resetam a gauge** para 0%

**Valores**:
- `true` = Stuns resetam gauge (padrão)
- `false` = Gauge mantém posição

**Estados afetados**:
- Stun
- Charm
- Berserk
- Confusion

**Uso estratégico**:
- `true`: Mais punitivo, stuns são mais severos
- `false`: Menos punitivo, mantém progresso

## Boas Práticas

### Balanceamento
1. **Comece simples**: Use fórmulas padrão primeiro
2. **Teste incremental**: Mude um parâmetro por vez
3. **Documente**: Anote suas fórmulas customizadas
4. **Considere extremidades**: O acontece com AGI 1 vs AGI 999?

### Performance
- Evite loops infinitos nas fórmulas
- Cuidado com chamadas de função pesadas
- Teste com muitos battlers na tela

### Legibilidade
```javascript
// ❌ Ruim - difícil de entender
b.a*2+b.l*0.5+Math.pow(b.m/100,2)

// ✅ Bom - claro e comentado
// AGI + metade do level + bônus mágico
b.agi * 2 + b.level * 0.5 + Math.pow(b.mat / 100, 2)
```

## Ver Também

- [Mecânica de Agilidade](../conceitos/mecanica-agilidade.md) - Como AGI afeta speed
- [Estados de Combate](../conceitos/estados-combate.md) - Estados que modificam speed
- [Skills e Items](../features/skills-items.md) - Notetags JS customizados

## Troubleshooting

**Gauge não enche**: Verificar JS: Speed e se retorna valor > 0

**Barras enchem instantaneamente**: Reduzir valores em JS: Speed ou JS: Acceleration

**Cast não funciona**: Verificar se skill tem speed negativo e JS: Cast Time está configurado

**Stun não reseta gauge**: Verificar "Stuns Reset Gauge?" está true

**Erro em JS**: Usar try/catch para debugging
```javascript
try {
  return sua_formula;
} catch (e) {
  console.log(e);
  return 100; // fallback
}
```
