# Listing Settings

Configurações de como os componentes de custo são listados na interface de shop.

## Listing

| Parâmetro | Descrição |
|-----------|-----------|
| **Listing Order** | Determina a ordem em que os componentes de troca são listados na janela |
| **Show Sell Window** | Mostra os itens listados na janela de venda? |
| **List Font Size** | Tamanho da fonte usada para itens listados |
| **List Padding** | Padding em pixels entre itens listados |

## Text Format

Formatos de texto para cada tipo de recurso listado:

| Parâmetro | Placeholders | Descrição |
|-----------|-------------|-----------|
| **Item Format** | `%1` Cost, `%2` Owned, `%3` Icon, `%4` Name | Formato para custos em Items |
| **Weapon Format** | `%1` Cost, `%2` Owned, `%3` Icon, `%4` Name | Formato para custos em Weapons |
| **Armor Format** | `%1` Cost, `%2` Owned, `%3` Icon, `%4` Name | Formato para custos em Armors |
| **Variable Format** | `%1` Cost, `%2` Owned, `%3` Icon, `%4` Name | Formato para custos em Variables |

### Placeholders

- `%1` → Custo (quantidade necessária)
- `%2` → Possuído (quantidade que o jogador tem)
- `%3` → Ícone (do item/weapon/armor/variable)
- `%4` → Nome (do item/weapon/armor/variable)
