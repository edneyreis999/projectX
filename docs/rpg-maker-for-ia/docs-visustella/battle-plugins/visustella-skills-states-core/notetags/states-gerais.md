# Notetags - States Gerais

Notetags para controlar comportamento de states, incluindo remoção, categorias, turnos, e interações com skills/items.

---

## Remoção Especial

### No Death Clear
```
<No Death Clear>
```
- **Usado em**: State Notetags
- Previne remoção do state ao morrer
- Permite que o state seja adicionado a battlers já mortos

### No Recover All Clear
```
<No Recover All Clear>
```
- **Usado em**: State Notetags
- Previne remoção ao usar Recover All command

### Group Defeat
```
<Group Defeat>
```
- **Usado em**: State Notetags
- Se **todo** o party é afetado por states com esta tag, o party é considerado derrotado
- Uso: petrificação em grupo, frozen, etc.

---

## Reapply Rules

```
<Reapply Rules: Ignore>
<Reapply Rules: Reset>
<Reapply Rules: Greater>
<Reapply Rules: Add>
```

- **Usado em**: State Notetags
- Define o que acontece ao reaplicar um state já existente (afeta turnos)
- **Ignore**: Nenhuma mudança de turnos
- **Reset**: Recalcula turnos
- **Greater**: Mantém o maior (atual vs. reset)
- **Add**: Adiciona turnos ao valor atual
- Sem notetag: usa regra do Plugin Parameters > States

---

## Categorias de State

### Positive / Negative
```
<Positive State>
<Negative State>
```
- Marca o state como positivo ou negativo
- Altera cor dos turnos conforme Plugin Parameters
- Adiciona à categoria "Positive" ou "Automaticamente"

### Custom Categories
```
<Category: name>
<Category: name, name, name>

<Categories>
 name
 name
</Categories>
```
- **Usado em**: State Notetags
- Organiza states em categorias nomeadas

---

## Bypass State Damage Removal

### Via Skill/Item
```
<Bypass State Damage Removal: id>
<Bypass State Damage Removal: id, id, id>
<Bypass State Damage Removal: name>
<Bypass State Damage Removal: name, name, name>
```
- **Usado em**: Skill, Item Notetags
- Previne que o dano deste skill/item remova states com "Remove by Damage" (ex: Sleep)
- Uso: "Dream Eater" que não acorda o alvo

### Via Attacker Trait
```
<Bypass State Damage Removal as Attacker: id>
<Bypass State Damage Removal as Attacker: name>
```
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- O atacante com este trait não remove o state ao atacar

### Via Target Trait
```
<Bypass State Damage Removal as Target: id>
<Bypass State Damage Removal as Target: name>
```
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- O alvo com este trait mantém o state mesmo ao receber dano

---

## Resist State Category

```
<Resist State Category: name>
<Resist State Categories: name, name, name>

<Resist State Categories>
 name
 name
</Resist State Categories>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- O battler resiste a todas os states da categoria listada
- **Importante**: Funciona como state resistance padrão. Se o state já estava aplicado ANTES de obter a resistência, ele permanece

---

## State Category Remove (Skill/Item)

```
<State x Category Remove: y>
<State x Category Remove: All>
```

- **Usado em**: Skill, Item Notetags
- Remove `y` states da categoria `x`
- `All` remove todos da categoria

---

## Remove Other Category States

```
<Remove Other x States>
```

- **Usado em**: State Notetags
- Quando este state é adicionado, remove OUTROS states da categoria `x`
- Ideal para stances/forms (apenas um ativo por vez)

---

## Display de Turnos

### Hide Turns
```
<Hide State Turns>
```
- **Usado em**: State Notetags
- Oculta turnos completamente, sobrepõe Plugin Parameters

### Turn Color
```
<Turn Color: x>
<Turn Color: #rrggbb>
```
- **Usado em**: State Notetags
- `x` = window text color number
- `#rrggbb` = hex color (requer VisuMZ_1_MessageCore)

### Max Turns
```
<Max Turns: x>
```
- **Usado em**: State Notetags
- Limite máximo de turnos para este state
- Default: Plugin Parameters > State Settings

---

## Manipulação de Turnos (Skill/Item)

### State Turns
```
<State id Turns: +x>
<State id Turns: -x>
<Set State id Turns: x>
<State name Turns: +x>
<State name Turns: -x>
<Set State name Turns: x>
```

- **Usado em**: Skill, Item Notetags
- Modifica turnos de um state no alvo
- `+x`/`-x` = soma/subtrai | `Set` = define valor exato

### Buff Turns
```
<param Buff Turns: +x>
<param Buff Turns: -x>
<Set param Buff Turns: x>
```
- **Usado em**: Skill, Item Notetags
- `param` = MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK

### Debuff Turns
```
<param Debuff Turns: +x>
<param Debuff Turns: -x>
<Set param Debuff Turns: x>
```
- **Usado em**: Skill, Item Notetags
- Mesmo formato de Buff Turns, para debuffs

---

## JS On Add/Erase/Expire State

```
<JS On Add State>
 code
</JS On Add State>

<JS On Erase State>
 code
</JS On Erase State>

<JS On Expire State>
 code
</JS On Expire State>
```

- **Usado em**: State Notetags
- Variáveis disponíveis:
  - `user` - active battler atual
  - `target` - battler afetado pelo state
  - `origin` - quem aplicou o state
  - `state` - o state atual
