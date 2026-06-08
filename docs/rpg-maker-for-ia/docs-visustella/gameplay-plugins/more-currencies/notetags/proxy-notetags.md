# Proxy Notetags

Notetags para transformar itens em proxies de outros itens, permitindo que o mesmo item seja vendido com diferentes moedas em shops diferentes.

## Notetag

```
<Proxy: id>
<Proxy: name>
```

## Detalhes

- **Aplica-se a**: Item, Weapon, Armor Notetags
- **Requer**: versão mais recente do **VisuMZ Items and Equips Core**
- Transforma este item/weapon/armor em um proxy para outro item do **mesmo tipo**

## Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| `id` | ID numérico do item original (mesmo tipo: item→item, weapon→weapon, armor→armor) |
| `name` | Nome do item original (mesmo tipo: item→item, weapon→weapon, armor→armor) |

## Comportamento

- O proxy **assume** nome, ícone, descrição e status do item original
- **Outras propriedades não são copiadas** (notetags, trading list, etc.)
- A janela `Window_ShopStatus` mostra dados do item original
- Quando comprado, o jogador recebe o **item original** (não o proxy)

## Restrições

- Proxy items **não podem ser adquiridos** por nenhum meio exceto compra na shop
  - Event commands → bloqueado
  - Item drops → bloqueado
  - Equipamentos → bloqueado
- O proxy deve referenciar o **mesmo tipo** de objeto:
  - Item proxy → referencia Item
  - Weapon proxy → referencia Weapon
  - Armor proxy → referencia Armor

## Exemplo de Uso com Cost Notetags

```
--- Item 30: Poção (Original) ---
<Item 1 Buy Cost: 50>
→ Custa 50 do Item 1

--- Item 31: Poção (Proxy para Shop Especial) ---
<Proxy: 30>
<Variable 5 Buy Cost: 10>
→ Na shop especial, custa 10 da Variable 5
→ Ao comprar, o jogador recebe Item 30
```

Ver também: [[cost-notetags.md|Cost Notetags]] e [[../conceitos/proxy-system.md|Sistema de Proxy]]
