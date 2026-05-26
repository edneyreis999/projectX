# JavaScript Notetags

Notetags avançadas para usuários com conhecimento de JavaScript.

---

## JS Parameters (Equipment)

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

- **Usado em**: Weapon, Armor
- Usa JavaScript para determinar valores dos parâmetros base
- Variáveis são **case-sensitive**
- Se um parâmetro não estiver presente, valor = +0

### Aviso Importante

NÃO calcular valores baseados em parâmetros totais (ex: `ATK = user.atk * 0.10`). Isso causará **loop infinito**. Usar valores de parâmetros base.

---

## JS Item Enable

```
<JS Item Enable>
 code
 code
 enabled = code;
</JS Item Enable>
```

- **Usado em**: Item
- Determina se item está habilitado via código JavaScript
- Variáveis:
  - `enabled` (boolean) - resultado
  - `user` - usuário do item
  - `item` - item sendo verificado
- Todas as outras condições do item devem ser atendidas

---

## JS Buy Price

```
<JS Buy Price>
 code
 code
 price = code;
</JS Buy Price>
```

- **Usado em**: Item, Weapon, Armor
- Calcula preço de compra via código
- Variável `price` = preço final de compra
- Variável `item` = item sendo comprado

---

## JS Sell Price

```
<JS Sell Price>
 code
 code
 price = code;
</JS Sell Price>
```

- **Usado em**: Item, Weapon, Armor
- Calcula preço de venda via código
- Variável `price` = preço final de venda
- Variável `item` = item sendo vendido

---

## Veja Também

- [Notetags Gerais](./gerais.md)
- [Equipment Notetags](./equipment.md)
- [Shop Menu Notetags](./shop-menu.md)
