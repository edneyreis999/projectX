# Equipment Type Handling

## Mecânica Central

Personagens não possuem mais uma configuração universal de slots de equipamento. **Classes podem ter loadouts diferentes de equipment types** através de notetags.

## Comportamento

- Equipment types com nomes iguais são tratados como o mesmo tipo
  - Exemplo: Dois slots "Accessory" (via notetags ou Database > Types) podem equipar os mesmos tipos de acessórios
- A notetag `<Equip Slots>` em classes define o loadout customizado (veja [notetags/equipment.md](../notetags/equipment.md))

## Change Equip Event Command

O comando de evento "Change Equip" foi atualizado para refletir esta mudança:

1. Quando processando uma mudança de equipamento, o slot alterado vai para o **primeiro slot vazio** do tipo correspondente
2. Se **todos os slots correspondentes** do actor estão equipados, o equipamento substitui o **último slot** disponível

## Veja Também

- [notetags/equipment.md](../notetags/equipment.md) - Notetags de equipamento incluem `<Equip Slots>`
- [comandos/actor.md](../comandos/actor.md) - Plugin Commands para forçar/resetar slots
