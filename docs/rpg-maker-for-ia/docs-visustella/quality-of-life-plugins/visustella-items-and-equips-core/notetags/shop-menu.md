# Notetags: Shop Menu

Notetags que ajustam preços, visibilidade e comportamento de itens na Shop Menu.

---

## Preços

### Buy Price Override

```
<Price: x>
```

- **Usado em**: Item, Weapon, Armor
- Ajusta o preço de compra
- Bypassa limitação do editor MZ de 999.999

### Sellability

```
<Can Sell>
<Cannot Sell>
```

- **Usado em**: Item, Weapon, Armor
- Força o item a sempre ser vendível ou não-vendível
- Bypassa hard-coding interno (preço 0 = não vendível)

### Sell Price Override

```
<Sell Price: x>
```

- **Usado em**: Item, Weapon, Armor
- Muda o preço de venda para valor diferente do padrão

---

## Visibilidade por Switch

### Show Shop Switches

```
<Show Shop Switch: x>
<Show Shop All Switches: x,x,x>
<Show Shop Any Switches: x,x,x>
```

- `All`: item oculto até que TODOS os switches estejam ON → então visível
- `Any`: item visível se QUALQUER switch estiver ON

### Hide Shop Switches

```
<Hide Shop Switch: x>
<Hide Shop All Switches: x,x,x>
<Hide Shop Any Switches: x,x,x>
```

- `All`: item visível até que TODOS os switches estejam ON → então oculto
- `Any`: item oculto se QUALQUER switch estiver ON

---

## Vendabilidade por Switch

```
<Cannot Sell Switch: x>
<Cannot Sell All Switches: x,x,x>
<Cannot Sell Any Switches: x,x,x>
```

- `All`: item não pode ser vendido até TODOS switches ON. Caso contrário, pode.
- `Any`: item não pode ser vendido se QUALQUER switch ON. Caso contrário, pode.

---

## Switch Triggers na Compra

```
<Buy Turn On Switch: x>
<Buy Turn On Switches: x, x, x>
<Buy Turn Off Switch: x>
<Buy Turn Off Switches: x, x, x>
```

- **Usado em**: Item, Weapon, Armor
- Ao comprar, liga/desliga switches

---

## Switch Triggers na Venda

```
<Sell Turn On Switch: x>
<Sell Turn On Switches: x, x, x>
<Sell Turn Off Switch: x>
<Sell Turn Off Switches: x, x, x>
```

- **Usado em**: Item, Weapon, Armor
- Ao vender, liga/desliga switches

---

## Veja Também

- [JavaScript Notetags: Shop](./javascript-notetags.md)
- [Shop Menu Parameters](../parametros/shop-menu.md)
