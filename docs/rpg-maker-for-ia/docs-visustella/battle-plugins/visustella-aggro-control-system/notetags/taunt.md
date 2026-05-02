# Notetags - Taunt

Notetags relacionadas ao sistema de Taunt do Aggro Control System.

---

## `<Taunt>` / `<All Taunt>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade se torna o alvo obrigatorio do time oposto para **todos os tipos** de acoes single-target (physical, magical, certain hit).
- **Multiplos taunters**: Se existirem multiplos taunters, o time oposto pode selecionar entre qualquer um deles.

---

## `<Physical Taunt>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade se torna o alvo obrigatorio para acoes single-target **fisicas** do time oposto.

---

## `<Magical Taunt>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade se torna o alvo obrigatorio para acoes single-target **magicas** do time oposto.

---

## `<Certain Taunt>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade se torna o alvo obrigatorio para acoes single-target **certain hit** do time oposto.

---

### Combinacao de Tipos

Os tipos de taunt podem ser combinados livremente:

```
// Tanque fisico + magico
<Physical Taunt>
<Magical Taunt>

// Tanque completo (equivalente a <Taunt>)
<Physical Taunt>
<Magical Taunt>
<Certain Taunt>
```

---

## `<Bypass Taunt>` (Trait Objects)

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade afetada ignora completamente todos os efeitos de taunt do time oposto, podendo usar acoes single-target normalmente.

---

## `<Bypass Taunt>` (Skills/Items)

- **Uso**: Skill, Item Notetags
- **Efeito**: A acao ignora efeitos de taunt do time oposto, permitindo selecionar alvos como se nenhum taunter existisse.

---

## Resumo Rapido

| Notetag | Onde Usa | Efeito |
|---------|----------|--------|
| `<Taunt>` / `<All Taunt>` | Trait Objects | Taunt para todos os tipos de acao |
| `<Physical Taunt>` | Trait Objects | Taunt apenas para acoes fisicas |
| `<Magical Taunt>` | Trait Objects | Taunt apenas para acoes magicas |
| `<Certain Taunt>` | Trait Objects | Taunt apenas para acoes certain hit |
| `<Bypass Taunt>` | Trait Objects | Unidade ignora taunt |
| `<Bypass Taunt>` | Skill, Item | Acao ignora taunt |

## Exemplos Praticos

### State de Tanque Temporario
```
// State: "Postura Defensiva" - duracao 3 turnos
<Physical Taunt>
<Magical Taunt>
```

### Boss que ignora Taunt
```
// Enemy: Boss
<Bypass Taunt>
```

### Skill que ignora Taunt
```
// Skill: "Ataque Preciso"
<Bypass Taunt>
```
