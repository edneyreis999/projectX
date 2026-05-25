# Plugin Commands: Purify

Comandos para purificar equipamentos amaldiçoados.

---

## Purify: Target Actor(s)

Purifica atores específicos de weapons/armors amaldiçoadas.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| Actor ID(s) | Selecionar quais Actor IDs purificar |

### Restrição

- **Não pode ser usado em batalha**

---

## Purify: Whole Party

Purifica todo o party de weapons/armors amaldiçoadas.

### Restrição

- **Não pode ser usado em batalha**

---

## Comportamento da Purificação

Ao purificar um equipamento `<Cursed>`:

1. Se não tem `<Purify Transform>` → equipamento é desequipado
2. Se tem `<Purify Transform>` → equipamento se transforma:
   - Se o item transformado for equipável → permanece no slot
   - Se não for equipável → é desequipado

---

## Veja Também

- [Equipment Notetags - Cursed](../notetags/equipment.md)
- [Actor Commands](./actor-commands.md)
