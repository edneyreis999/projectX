# Notetags de Condições de Skills

## Visão Geral

Estes notetags permitem criar condições customizadas para quando a IA pode usar skills. As condições são divididas em dois tipos:

- **ALL Conditions**: Todas as condições devem ser cumpridas
- **ANY Conditions**: Pelo menos uma condição deve ser cumprida

## Estrutura das Condições

### <All AI Conditions>

Define um conjunto de condições onde **todas** devem ser cumpridas.

**Uso**: Skill Notetags

**Sintaxe**:
```html
<All AI Conditions>
 condição 1
 condição 2
 condição 3
</All AI Conditions>
```

**Regras**:
- ✅ Todas as condições devem ser cumpridas para que a skill seja válida
- ✅ Pode ser usado junto com `<Any AI Conditions>`
- ❌ Se este notetag existe, não usa condições padrão dos Plugin Parameters
- ❌ Não herda condições 'All' padrão dos Plugin Parameters
- ✅ Adicione/remova quantas condições quiser

---

### <Any AI Conditions>

Define um conjunto de condições onde **pelo menos uma** deve ser cumprida.

**Uso**: Skill Notetags

**Sintaxe**:
```html
<Any AI Conditions>
 condição 1
 condição 2
 condição 3
</Any AI Conditions>
```

**Regras**:
- ✅ Pelo menos uma condição deve ser cumprida para a skill ser válida
- ✅ Se nenhuma for cumprida, a skill se torna inválida para uso
- ✅ Pode ser usado junto com `<All AI Conditions>`
- ❌ Se este notetag existe, não usa condições padrão dos Plugin Parameters
- ❌ Não herda condições 'Any' padrão dos Plugin Parameters
- ✅ Adicione/remova quantas condições quiser

---

### Uso Combinado ALL e ANY

Quando ambos são usados juntos:

```html
<All AI Conditions>
 HP% >= 0.50
 MP% >= 0.30
</All AI Conditions>
<Any AI Conditions>
 Target Has State Poison
 Target Has State Burn
</Any AI Conditions>
```

**Resultado**: A skill será válida se:
- HP >= 50% **E** MP >= 30% **E** (Alvo tem Poison **OU** Alvo tem Burn)

---

### <No AI Conditions>

Remove todas as condições padrão ALL e ANY para esta skill.

**Uso**: Skill Notetags

**Exemplo**:
```html
<No AI Conditions>
```

## Lista de Condições

### Operadores de Comparação

Use estes operadores para criar comparações numéricas:

```
x >= y    (maior ou igual)
x > y     (maior que)
x === y   (igual a)
x !== y   (diferente de)
x < y     (menor que)
x <= y    (menor ou igual a)
```

**Valores possíveis para x e y**:

- **Número**: `50`, `100`, `1000`
- **Porcentagem**: `50%`, `0.5`, `1.0`
- **Variável**: `Variable 5` (valor da variável 5)
- **HP Rate**: `HP%` (HP percentual do alvo)
- **MP Rate**: `MP%` (MP percentual do alvo)
- **TP Rate**: `TP%` (TP percentual do alvo)
- **Max Values**: `MaxHP`, `MaxMP`, `MaxTP`
- **Level**: `Level` (requer VisuMZ_0_CoreEngine para inimigos)
- **Parâmetros**: `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- **Buff Stacks**: `ATK Buff Stacks`, `DEF Buff Stacks`, etc.
- **Debuff Stacks**: `ATK Debuff Stacks`, `DEF Debuff Stacks`, etc.
- **Buff Turns**: `ATK Buff Turns`, `DEF Buff Turns`, etc.
- **Debuff Turns**: `ATK Debuff Turns`, `DEF Debuff Turns`, etc.
- **State Turns**: `State 5 Turns`, `State Poison Turns`
- **Element Rate**: `Element 3 Rate`, `Fire Element Rate`
- **Team Members**: `Team Alive Members`, `Team Dead Members`

**Exemplos**:
```
HP% >= 0.50                    # HP >= 50%
MP% <= 0.30                    # MP <= 30%
Variable 5 === 1               # Variável 5 == 1
ATK > DEF                      # ATK maior que DEF
Level >= 10                    # Nível >= 10
```

### Prefixo 'user'

Para basear condições no **usuário** em vez do alvo, adicione `user` antes da condição:

```
user hp% >= 0.50               # HP do usuário >= 50%
user atk buff stacks === 2     # Buffs de ATK do usuário == 2
user team alive members < 3    # Vivos no time do usuário < 3
```

---

### Always

A condição sempre será válida, não importa o que aconteça.

**Sintaxe**:
```
Always
```

---

### x% Chance

A condição tem X% de chance de ser válida.

**Sintaxe**:
```
50% Chance
25% Chance
100% Chance
```

---

### Switch x On / Switch x Off

Verifica se uma switch está ON ou OFF.

**Sintaxe**:
```
Switch 5 On
Switch 10 Off
```

---

### User is Actor / User is Enemy
### Target is Actor / Target is Enemy

Exige que o usuário ou alvo seja um ator ou inimigo.

**Sintaxe**:
```
User is Actor
User is Enemy
Target is Actor
Target is Enemy
```

---

### User/Target Has State id/name
### User/Target Not State id/name

Verifica se o usuário ou alvo tem ou não tem um state específico.

**Sintaxe**:
```
User Has State 5
User Has State Poison
Target Has State 10
Target Not State Burn
```

---

### User/Target Has param Buff/Debuff
### User/Target Not param Buff/Debuff

Verifica se o usuário ou alvo tem buffs ou debuffs de parâmetro.

**Sintaxe**:
```
User Has ATK Buff
Target Has DEF Debuff
User Not MAT Buff
Target Not AGI Debuff
```

**Parâmetros**: `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`

---

### User/Target Has param Max Buff/Debuff
### User/Target Not param Max Buff/Debuff

Verifica se o usuário ou alvo tem buffs ou debuffs no máximo.

**Sintaxe**:
```
User Has ATK Max Buff
Target Has DEF Max Debuff
User Not MAT Max Buff
```

**Parâmetros**: `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`

---

### Condições JavaScript

Se nenhuma palavra-chave corresponder, o valor será interpretado como código JavaScript.

**Importante**:
- ⚠️ JavaScript **não pode ser usado sem operadores de comparação**
- ✅ Use `$gameSwitches.value(42) === true`
- ❌ NÃO use apenas `$gameSwitches.value(42)`

**Exemplos**:
```
$gameSwitches.value(5) === true
$gameParty.hasItem($dataItems[10]) === true
$gameTroop.turnCount() > 3    # Não funciona na IA (veja Troubleshooting)
```

## Exemplos Práticos

### Skill de Cura que só usa abaixo de 50% HP

```html
<All AI Conditions>
Target HP% < 0.50
Target is Actor
</All AI Conditions>
```

### Skill de Fire em alvos vulneráveis

```html
<Any AI Conditions>
Target Fire Element Rate > 1.0
Target Not State Fire Resist
</Any AI Conditions>
```

### Skill de Buff só se não tiver buff

```html
<All AI Conditions>
User Not ATK Max Buff
User MP% >= 0.20
</All AI Conditions>
```

### Skill de Finisher (execute alvos com pouco HP)

```html
<Any AI Conditions>
Target HP% <= 0.25
Target HP% <= 0.30
Target Has State Death Sentence
</Any AI Conditions>
```

### Skill Proteção (só se aliados precisarem)

```html
<All AI Conditions>
user team alive members < 3
Any AI Conditions>
Target HP% < 0.50
Target Has State Critical Wounds
</Any AI Conditions>
</All AI Conditions>
```

### Skill Aleatório (chance de usar)

```html
<Any AI Conditions>
30% Chance
Always
</Any AI Conditions>
```

### Skill Baseado em Variável

```html
<All AI Conditions>
Variable 5 === 1
Target is Enemy
</All AI Conditions>
```

## Troubleshooting

### $gameTroop.turnCount() Não Funciona

⚠️ **Battle A.I. conditions NÃO suportam** `$gameTroop.turnCount()`, `user.turnCount()` ou `target.turnCount()`.

**Solução**: Use o editor de ações do RPG Maker para condições de turno.

**Workaround**: Habilite "On-The-Spot A.I." (experimental) em Plugin Parameters > A.I. General Settings > Experimental.

### JavaScript Sem Operadores

Seu código JavaScript falhará se não tiver operadores de comparação.

❌ **Errado**:
```
$gameSwitches.value(42)
```

✅ **Certo**:
```
$gameSwitches.value(42) === true
```

## Veja Também

- **[Configuração Geral](configuracao-geral.md)** - Notetags básicos de A.I.
- **[Funcionamento da IA](../conceitos/funcionamento.md)** - Como as condições afetam a decisão
- **[Troubleshooting](../referencia/troubleshooting.md)** - Problemas comuns
