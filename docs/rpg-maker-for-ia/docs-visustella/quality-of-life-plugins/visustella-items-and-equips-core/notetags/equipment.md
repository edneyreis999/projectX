# Notetags: Equipment

Notetags relacionadas a equipamentos - desde slots de classes até mudanças de parâmetros base.

---

## Equip Slots (Class)

```
<Equip Slots>
 slotName
 slotName
</Equip Slots>
```

- **Usado em**: Class
- Muda o loadout de equipamentos para atores dessa classe
- `slotName` = nome do Equipment Type em Database > Types (case-sensitive)

---

## Parâmetros Base

```
<param: +x>
<param: -x>
```

- **Usado em**: Weapon, Armor
- Muda o valor base do parâmetro do equipamento
- `param`: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK
- Permite **bypassar limitações numéricas** do Database Editor
- NÃO funciona com X-Parameters, S-Parameters ou parâmetros customizados

---

## Equip Copy Limit

```
<Equip Copy Limit: x>
```

- **Usado em**: Weapon, Armor
- Número máximo de cópias que o ator pode equipar simultaneamente
- Pode ser bypassado via Event Commands e/ou Script Calls

---

## Equip Type Limits

```
<Equip Weapon Type Limit: x>
```

- **Usado em**: Weapon
- Esta arma não pode ser equipada com outras do mesmo tipo após atingir o limite
- Exemplo: guerreiro dual-wield só pode ter 1 espada + 1 adaga (nunca 2 espadas)

```
<Equip Armor Type Limit: x>
```

- **Usado em**: Armor
- Esta armadura não pode ser equipada com outras do mesmo tipo após atingir o limite

---

## Artifacts

```
<Party Artifact>
<Troop Artifact>
<Stackable Party Artifact>
<Stackable Troop Artifact>
```

- **Usado em**: Armor
- A armadura **não pode ser equipada**, mas apenas por estar no inventário:
  - `Party Artifact`: bônus aplicados globalmente ao party inteiro
  - `Troop Artifact`: bônus aplicados globalmente ao troop inteiro
- Versões normais: aplicado apenas **uma vez** independente de cópias
- Versões stackable: bônus empilhados **proporcionalmente** ao número de cópias
- NÃO adicionado durante Battle Tests (adicionar manualmente se necessário)

---

## Class-Restricted Equipment

```
<Equip For Class Only: x>
<Equip For Classes Only: x, x, x>
<Equip For Class Only: name>
<Equip For Classes Only: name, name, name>
```

- **Usado em**: Weapon, Armor
- Equipamento só pode ser usado por membros com a classe principal especificada
- `x` = ID da classe; `name` = nome da classe

---

## Equip Requirements

```
<Equip Requirements>
 requirement
 requirement
</Equip Requirements>
```

- **Usado em**: Weapon, Armor
- Define requisitos para o ator equipar o item
- Falha ao atender causa **desequipamento automático** (pode não ser imediato)

### Tipos de Requisito

| Requisito | Formato | Descrição |
|-----------|---------|-----------|
| Parâmetro | `param > x`, `param >= x`, `param === x`, `param <= x`, `param < x` | Compara base parameter. `param` = level, maxhp, maxmp, atk, def, mat, mdf, agi, luk |
| Skill | `learned skill: x` ou `learned skill: name` | Ator precisa ter APRENDIDO a skill (traits não contam) |
| Switch | `switch: x` | Switch precisa estar ON |

### Exemplos

```
<Equip Requirements>
level >= 20
</Equip Requirements>
```

```
<Equip Requirements>
atk >= 50
def <= 50
</Equip Requirements>
```

### Notas

- Não existe `class: x` nos requisitos. Usar `<Equip For Class Only: x>`
- Para "unique only", usar `<Equip Copy Limit: x>`
- Para trigger do auto-unequip de switches: mudar HP/MP do ator ou adicionar/remover um state

---

## Added ETypes

```
<Added EType: x>
<Added ETypes: x, x, x>
```

- **Usado em**: Armor (NÃO funciona com weapons!)
- Permite que uma armadura pertença a múltiplos ETypes
- Exemplo: uma luva pode ser equipada como "Armgear" ou como "Accessory"

---

## Cursed Equipment

```
<Cursed>
```

- **Usado em**: Weapon, Armor
- Não pode ser manualmente removido pelo jogador até ser purificado
- Removido apenas via event commands, script calls, ou Purify Plugin Commands

### Purify Transform

```
<Purify Transform: id>
<Purify Transform: name>
```

- Após purificação, o equipamento **transforma** em outro item
- Weapons só transformam em weapons; Armors só em armors
- Se o item transformado for equipável, permanece no slot

### Nota sobre Weapon Swap System

Se VisuMZ_2_WeaponSwapSystem estiver instalado, weapons **não podem** ser cursed para permitir troca livre.

---

## Veja Também

- [Equipment Type Handling](../conceitos/equipment-type-handling.md)
- [JavaScript Notetags](./javascript-notetags.md)
