# Referência Rápida de Notetags

Todas as notetags do More Currencies em uma tabela. Aplicam-se a **Item, Weapon e Armor**.

## Cost Notetags

### Variação por Tipo de Recurso

| Tipo de Recurso | Compra | Venda | Ambos |
|----------------|--------|-------|-------|
| Item | `<Item id Buy Cost: x>` | `<Item id Sell Cost: x>` | `<Item id Cost: x>` |
| Item (por nome) | `<Item name Buy Cost: x>` | `<Item name Sell Cost: x>` | `<Item name Cost: x>` |
| Weapon | `<Weapon id Buy Cost: x>` | `<Weapon id Sell Cost: x>` | `<Weapon id Cost: x>` |
| Weapon (por nome) | `<Weapon name Buy Cost: x>` | `<Weapon name Sell Cost: x>` | `<Weapon name Cost: x>` |
| Armor | `<Armor id Buy Cost: x>` | `<Armor id Sell Cost: x>` | `<Armor id Cost: x>` |
| Armor (por nome) | `<Armor name Buy Cost: x>` | `<Armor name Sell Cost: x>` | `<Armor name Cost: x>` |
| Variable | `<Variable id Buy Cost: x>` | `<Variable id Sell Cost: x>` | `<Variable id Cost: x>` |

### Regras

- **Múltiplas cópias** = custos compostos (AND lógico)
- Variante **"Ambos"** (sem Buy/Sell) é **incompatível** com variantes Buy/Sell do mesmo tipo
- Variante "Ambos" aplica **sell rate** automático na venda (configurável em Plugin Parameters)
- `id` = número | `name` = texto | `x` = quantidade

## Proxy Notetags

| Notetag | Descrição |
|---------|-----------|
| `<Proxy: id>` | Proxy por ID (mesmo tipo obrigatório) |
| `<Proxy: name>` | Proxy por nome (mesmo tipo obrigatório) |

### Restrições do Proxy

- Requer Items and Equips Core atualizado
- Proxy → mesmo tipo (Item→Item, Weapon→Weapon, Armor→Armor)
- Proxy não pode ser adquirido por eventos, drops ou equip
- Compra de proxy entrega o item original

## Veja Também

- [[cost-notetags.md|Cost Notetags detalhadas]]
- [[proxy-notetags.md|Proxy Notetags detalhadas]]
- [[../conceitos/proxy-system.md|Sistema de Proxy (conceito)]]
