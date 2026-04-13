# Notetags - Aura & Miasma

Auras são passive states que afetam o **party aliado**. Miasmas são passive states que afetam o **party oponente**. Apenas uma fonte é necessária para afetar todo o party/troop, desde que o battler emissor esteja vivo e em batalha.

---

## Aura State

```
<Aura State: x>
<Aura States: x, x, x>
<Aura State: name>
<Aura States: name, name, name>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Emite aura que afeta **aliados** com passive state(s) `x`
- **Nota**: Se via skill, deve ser skill **aprendida** (não via trait)

---

## Miasma State

```
<Miasma State: x>
<Miasma States: x, x, x>
<Miasma State: name>
<Miasma States: name, name, name>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Emite miasma que afeta **oponentes** com passive state(s) `x`
- **NÃO aplica fora de batalha**
- **Nota**: Se via skill, deve ser skill **aprendida** (não via trait)

---

## Not User Aura (Excluir Emissor)

```
<Not User Aura>
<Aura Not For User>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Previne que o emissor seja afetado pela própria aura

---

## Allow Dead Aura/Miasma

```
<Allow Dead Aura>
<Allow Dead Miasma>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Permite aura/miasma continuar emitindo mesmo com o emissor **morto**
- Em States: aplica a qualquer aura/miasma usando este state, independente da fonte
- **Tem prioridade** sobre `<Dead Aura Only>` e `<Dead Miasma Only>`

---

## Dead Aura/Miasma Only

```
<Dead Aura Only>
<Dead Miasma Only>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Aura/miasma **só emite** se o emissor está **morto**
- Em States: aplica a qualquer aura/miasma usando este state

---

## Exemplos Práticos

### Paladin Aura (DEF +20% para aliados)
No State "Paladin Shield":
```
(Configure trait: DEF Rate 120%)
```
No Actor/Class/Weapon do Paladin:
```
<Aura State: 25>
```

### Poison Miasma (enemies take poison)
No Actor/Weapon/Armor:
```
<Miasma State: 10>
```

### Vengeance Aura (ativo apenas quando morto)
No Actor:
```
<Aura State: 45>
<Dead Aura Only>
```

### Selfless Aura (não afeta o próprio emissor)
No Weapon:
```
<Aura State: 30>
<Not User Aura>
```
