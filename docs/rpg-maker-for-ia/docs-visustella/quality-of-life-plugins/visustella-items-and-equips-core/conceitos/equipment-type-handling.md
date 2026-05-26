# Equipment Type Handling

## Conceito

O Items & Equips Core introduz um sistema de Equipment Type Handling que muda fundamentalmente como os slots de equipamento funcionam no RPG Maker MZ.

## Mudanças Principais

### Slots por Classe (não universal)

Personagens não possuem mais uma configuração universal de slots de equipamento. **Classes podem ter loadouts diferentes** de tipos de equipamento, possibilitado através de notetags.

### Tipos com Mesmo Nome = Mesmo Tipo

Tipos de equipamento com nomes iguais são tratados como o mesmo tipo. Se existem dois slots "Accessory" (via notetags ou Database > Types), ambos podem equipar o mesmo tipo de acessórios.

> Antes deste plugin, slots com mesmo nome eram tipos diferentes.

### Comportamento do Change Equip

O commando de evento **Change Equip** foi atualizado:

1. Quando um equipamento é trocado, o slot alterado vai para o **primeiro slot vazio** do tipo correspondente
2. Se todos os slots do tipo correspondente do ator estão equipados, o equipamento **substitui o último slot disponível**

## Notetag Relacionada

```
<Equip Slots>
 slotName
 slotName
</Equip Slots>
```

- **Usado em**: Class Notetags
- Muda o loadout de equipamentos para qualquer ator dessa classe
- `slotName` deve corresponder ao nome do Equipment Type em Database > Types (case-sensitive)

## Veja Também

- [Notetags de Equipment](../notetags/equipment.md)
- [Equip Menu Parameters](../parametros/equip-menu.md)
