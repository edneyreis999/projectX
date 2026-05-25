# Notetags Gerais

Notetags que afetam Items, Weapons e Armors em escala geral.

---

## `<Max: x>`

- **Usado em**: Item, Weapon, Armor
- Determina a quantidade máxima que pode ser carregada deste item
- Substituir `x` por um número

---

## `<Color: x>` / `<Color: #rrggbb>`

- **Usado em**: Item, Weapon, Armor, Skill
- Determina a cor do objeto nos menus do jogo
- `x` = número de cor de texto da window
- `#rrggbb` = código hex para cor customizada

---

## `<Category: x>`

- **Usado em**: Item, Weapon, Armor
- Organiza itens em categorias para funcionar com Plugin Parameter "Category:x"
- Substituir `x` pelo nome da categoria

---

## `<Categories>` ... `</Categories>`

- **Usado em**: Item, Weapon, Armor
- Organiza itens em múltiplas categorias
- Cada linha `x` dentro do bloco é um nome de categoria

```
<Categories>
 categoria1
 categoria2
</Categories>
```

---

## `<Conserve: x%>`

- **Usado em**: Item
- Chance percentual de **não consumir** o item ao usá-lo
- Substituir `x` com a porcentagem
- Itens que não podem ser consumidos terão conserve chance de 100%

---

## `<ID Sort Priority: x>`

- **Usado em**: Item, Weapon, Armor
- Aplica-se a: Scene_Item, Scene_Equip, Scene_Battle, Scene_Shop (sell)
- Muda a prioridade de ordenação por ID
- Prioridade padrão = `50`
- Valores maiores = mais alto na lista; menores = mais baixo

---

## Veja Também

- [Item Accessibility Notetags](./item-accessibility.md)
- [Equipment Notetags](./equipment.md)
- [JavaScript Notetags](./javascript-notetags.md)
