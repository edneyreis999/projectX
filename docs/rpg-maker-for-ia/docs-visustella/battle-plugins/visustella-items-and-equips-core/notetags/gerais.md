# Notetags Gerais

Notetags que afetam Items, Weapons e Armors em escala geral.

---

## `<Max: x>`

- **Uso**: Item, Weapon, Armor
- Determina a quantidade máxima que pode ser carregada deste item
- Substituir `x` por um valor numérico

---

## `<Color: x>` / `<Color: #rrggbb>`

- **Uso**: Item, Weapon, Armor, Skill
- Determina a cor do objeto nos menus do jogo
- `x` = número da cor de texto da window
- `#rrggbb` = código hex de cor customizada

---

## `<Category: x>`

- **Uso**: Item, Weapon, Armor
- Organiza itens em categorias para funcionar com o Plugin Parameter "Category:x"
- Substituir `x` pelo nome da categoria

---

## `<Categories>` ... `</Categories>`

- **Uso**: Item, Weapon, Armor
- Organiza itens em múltiplas categorias
- Cada linha `x` dentro do bloco é um nome de categoria

```
<Categories>
 Poção
 Consumível
</Categories>
```

---

## `<Conserve: x%>`

- **Uso**: Item
- Dá ao item uma chance percentual de não ser consumido ao usar
- Substituir `x` pela porcentagem
- Se o item não pode ser consumido, a chance de conservação é 100% independente do valor

---

## `<ID Sort Priority: x>`

- **Uso**: Item, Weapon, Armor
- **Cenas afetadas**: Scene_Item, Scene_Equip, Scene_Battle, Scene_Shop (sell)
- Altera a prioridade de ordenação por ID. Prioridade padrão é `50`
- Valores maiores = mais alto na lista. Valores menores = mais baixo na lista

---

## Veja Também

- [notetags/item-accessibility.md](item-accessibility.md) - Controle de quando items podem ser usados
- [notetags/equipment.md](equipment.md) - Notetags de equipamento
- [notetags/shop-menu.md](shop-menu.md) - Notetags de preço e shop
- [notetags/referencia-rapida.md](referencia-rapida.md) - Referência rápida de todas as notetags
