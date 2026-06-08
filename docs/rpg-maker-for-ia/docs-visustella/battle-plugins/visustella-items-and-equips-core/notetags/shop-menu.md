# Notetags: Shop Menu

Ajustam preços, visibilidade e vendabilidade no Shop Menu.

---

## Preço de Compra

### `<Price: x>`

- **Uso**: Item, Weapon, Armor
- Ajusta o preço de compra
- Permite ultrapassar o limite de 999.999 do editor

### `<JS Buy Price>` ... `</JS Buy Price>`

- **Uso**: Item, Weapon, Armor
- Determina o preço de compra via JavaScript
- Variável `price` para o preço final. Variável `item` para o item

```
<JS Buy Price>
 price = item.price * 1.5;
</JS Buy Price>
```

---

## Venda

### `<Can Sell>` / `<Cannot Sell>`

- **Uso**: Item, Weapon, Armor
- Bypassa hard-coding interno de itens com preço 0

### `<Sell Price: x>`

- **Uso**: Item, Weapon, Armor
- Muda o preço de venda para um valor diferente do padrão

### `<JS Sell Price>` ... `</JS Sell Price>`

- **Uso**: Item, Weapon, Armor
- Determina o preço de venda via JavaScript
- Variável `price` para o preço final. Variável `item` para o item

---

## Visibilidade no Shop

### Show Shop Switch

```
<Show Shop Switch: x>
<Show Shop All Switches: x,x,x>
<Show Shop Any Switches: x,x,x>
```

- **Uso**: Item, Weapon, Armor
- **All**: Item oculto até TODAS as switches ON
- **Any**: Item visível se QUALQUER switch estiver ON

### Hide Shop Switch

```
<Hide Shop Switch: x>
<Hide Shop All Switches: x,x,x>
<Hide Shop Any Switches: x,x,x>
```

- **All**: Item visível até TODAS as switches ON, então oculto
- **Any**: Item oculto se QUALQUER switch estiver ON

---

## Vendabilidade por Switch

```
<Cannot Sell Switch: x>
<Cannot Sell All Switches: x,x,x>
<Cannot Sell Any Switches: x,x,x>
```

- **Uso**: Item, Weapon, Armor
- **All**: Não pode ser vendido até TODAS as switches ON
- **Any**: Não pode ser vendido se QUALQUER switch estiver ON

---

## Switches ao Comprar/Vender

### Comprar

```
<Buy Turn On Switch: x>
<Buy Turn On Switches: x, x, x>
<Buy Turn Off Switch: x>
<Buy Turn Off Switches: x, x, x>
```

### Vender

```
<Sell Turn On Switch: x>
<Sell Turn On Switches: x, x, x>
<Sell Turn Off Switch: x>
<Sell Turn Off Switches: x, x, x>
```

- **Uso**: Item, Weapon, Armor
- Liga/desliga switches quando o item é comprado ou vendido no shop

---

## Veja Também

- [notetags/gerais.md](gerais.md) - Notetags gerais (Max, Color, Category)
- [notetags/item-accessibility.md](item-accessibility.md) - Controle de uso de items por switches
- [parametros/shop-menu.md](../parametros/shop-menu.md) - Configuração do Shop Menu
