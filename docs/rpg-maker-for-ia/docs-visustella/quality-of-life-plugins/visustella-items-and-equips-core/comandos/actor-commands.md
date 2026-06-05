# Plugin Commands: Actor

Comandos de plugin relacionados a atores e slots de equipamento.

---

## Actor: Change Equip Slots

Força a mudança dos slots de equipamento de um ator.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| Actor ID(s) | Selecionar quais Actor IDs afetar |
| Equip Slots | Inserir os slots desejados (case-sensitive) |

### Comportamento

- Muda forçadamente os slots de equipamento dos atores selecionados
- As mudanças **persistem através de mudanças de classe**

---

## Actor: Reset Equip Slots

Reseta quaisquer slots de equipamento forçados para os atores.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| Actor ID(s) | Selecionar quais Actor IDs afetar |

### Comportamento

- Remove forçamento de slots
- Slots voltam a ser baseados na classe do ator

---

## Veja Também

- [Purify Commands](./purify-commands.md)
- [Shop Commands](./shop-commands.md)
