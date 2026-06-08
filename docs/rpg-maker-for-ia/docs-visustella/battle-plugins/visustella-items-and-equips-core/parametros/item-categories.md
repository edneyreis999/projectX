# Plugin Parameters: Item Categories

Categorias de itens que aparecem no Item Menu Scene e Shop Menu Scene (apenas no comando Sell).

---

## Category List

Cada entrada na lista de categorias:

| Propriedade | Descrição |
|-------------|-----------|
| Type | Tipo da categoria. Opções: `AllItems`, `RegularItems`, `KeyItems`, `HiddenItemA`, `HiddenItemB`, `Consumable`, `Nonconsumable`, `AlwaysUsable`, `BattleUsable`, `FieldUsable`, `NeverUsable`, `AllWeapons`, `WType:x`, `AllArmors`, `AType:x`, `EType:x`, `Category:x` |
| Icon | Ícone da categoria (0 = sem ícone) |
| Visibility Switch | Switch que precisa estar ON para a categoria aparecer (0 = sem requisito) |
| Sort By | Ordenação da categoria (Scene_Item e Scene_Shop apenas) |

---

## Style

Como desenhar categorias no Category Window:
- **Text Only**: Apenas texto
- **Icon Only**: Apenas ícone
- **Icon + Text**: Ícone primeiro, depois texto
- **Auto**: Determina automaticamente baseado no tamanho da célula

---

## Vocabulary

Nomes customizáveis para categorias internas:
- Hidden Item A, Hidden Item B
- Consumable, Nonconsumable
- Always Usable, Battle Usable, Field Usable, Never Usable

---

## Veja Também

- [notetags/gerais.md](../notetags/gerais.md) - Notetags `<Category: x>` e `<Categories>`
