# Notetags: Equipment

Notetags relacionadas a equipamentos: slots, parâmetros, limites, requisitos, artifacts, itens amaldiçoados e mais.

---

## `<Equip Slots>` ... `</Equip Slots>`

- **Uso**: Class Notetags
- Muda o loadout de slots de equipamento para actors dessa classe
- Cada `slotName` deve corresponder a um Equipment Type name do Database > Types (case-sensitive)

```
<Equip Slots>
 Weapon
 Shield
 Head
 Body
 Accessory
</Equip Slots>
```

---

## `<param: +x>` / `<param: -x>`

- **Uso**: Weapon, Armor
- Muda o valor base do parâmetro do equipamento
- `param` pode ser: `MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- NÃO funciona com X Parameters, S Parameters, ou parâmetros customizados
- Permite ultrapassar os limites numéricos do Database Editor

---

## `<Equip Copy Limit: x>`

- **Uso**: Weapon, Armor
- Número máximo de cópias que o actor pode equipar
- Pode ser bypassado via Event Commands e/ou Script Calls

---

## `<Equip Weapon Type Limit: x>`

- **Uso**: Weapon
- Esta arma não pode ser equipada com outras do mesmo tipo após atingir o limite
- Exemplo: Guerreiro dual-wielding que só pode equipar uma espada e uma adaga

---

## `<Equip Armor Type Limit: x>`

- **Uso**: Armor
- Esta armadura não pode ser equipada com outras do mesmo tipo após atingir o limite
- Exemplo: Máximo de 2 luvas equipadas ao mesmo tempo

---

## Artifacts

```
<Party Artifact>
<Troop Artifact>
<Stackable Party Artifact>
<Stackable Troop Artifact>
```

- **Uso**: Armor
- A armadura não pode ser equipada, mas seus bônus de parâmetro e traits são aplicados globalmente a todo o party ou troop
- Versão normal: aplicado apenas uma vez independente do número de cópias
- Versão stackable: bônus acumulam proporcionalmente ao número de cópias
- **NÃO** é adicionado durante Battle Tests (adicionar manualmente se necessário)

---

## `<Equip For Class Only>`

```
<Equip For Class Only: x>
<Equip For Classes Only: x, x, x>
<Equip For Class Only: name>
<Equip For Classes Only: name, name, name>
```

- **Uso**: Weapon, Armor
- Restringe equipamento para actors com a classe especificada
- `x` = ID da classe. `name` = nome da classe (pelo menos uma precisa ser a classe principal do actor)

---

## `<Equip Requirements>` ... `</Equip Requirements>`

- **Uso**: Weapon, Armor
- Define requisitos para equipar o item
- Falha em atender os requisitos causa desequipamento automático (pode não ser imediato para switches)

### Requisitos Disponíveis

| Requisito | Formato | Descrição |
|-----------|---------|-----------|
| Parâmetro | `param > x` | `param` pode ser `level`, `maxhp`, `maxmp`, `atk`, `def`, `mat`, `mdf`, `agi`, `luk`. Operadores: `>`, `>=`, `===`, `<=`, `<` |
| Skill | `learned skill: x` ou `learned skill: name` | O actor precisa ter APRENDIDO a skill (traits não contam) |
| Switch | `switch: x` | A switch precisa estar ON |

**Notas**:
- Para requisito de classe, usar `<Equip For Class Only: x>` ao invés
- Para "unique only", usar `<Equip Copy Limit: x>` ao invés

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

---

## `<Added EType: x>` / `<Added ETypes: x, x, x>`

- **Uso**: Armor (NÃO funciona com weapons!)
- Permite que uma armadura pertença a múltiplos Equipment Types
- Exemplo: Uma luva pode ser equipada como "Armgear" ou "Accessory"

---

## `<Cursed>`

- **Uso**: Weapon, Armor
- O equipamento não pode ser removido manualmente pelo jogador até ser purificado
- Remoção só via event commands, script calls, ou Purify Plugin Commands
- Após purificação, o item é desequipado a menos que tenha transformação de purificação
- **Incompatível com Weapon Swap System**: armas não podem ser amaldiçoadas se o Weapon Swap System estiver instalado

---

## `<Purify Transform: id>` / `<Purify Transform: name>`

- **Uso**: Weapon, Armor
- Ao ser purificado, o item se transforma em outro
- `id` = ID do item transformado. `name` = nome do item
- Weapons só transformam em weapons. Armors só transformam em armors

---

## JS Parameters

```
<JS Parameters>
 MaxHP = code;
 MaxMP = code;
 ATK = code;
 DEF = code;
 MAT = code;
 MDF = code;
 AGI = code;
 LUK = code;
</JS Parameters>
```

- **Uso**: Weapon, Armor
- Determina valores de parâmetros via JavaScript
- Variáveis são case-sensitive
- Se um parâmetro não estiver presente, valor = +0
- **AVISO**: NÃO usar valores de parâmetro total (ex: `user.atk`) - causa loop infinito. Usar valores base

---

## Veja Também

- [notetags/gerais.md](gerais.md) - Notetags gerais
- [notetags/status-window.md](status-window.md) - Customização da status window
- [comandos/actor.md](../comandos/actor.md) - Comandos de change/reset equip slots
- [comandos/purify.md](../comandos/purify.md) - Comandos de purificação
