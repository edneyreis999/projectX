# Vocabulário

Termos e textos customizáveis do plugin More Currencies.

## Termos da Interface

| Termo | Contexto | Descrição |
|-------|----------|-----------|
| **Owned** | Window_ShopNumber | Label para "quantidade que o jogador possui" de cada recurso |
| **Shift** | Window_ShopNumber | Label para "mudança" — quanto será gasto ou ganho na transação |
| **Net** | Window_ShopNumber | Label para "resultado líquido" — saldo final após a transação |

## Formatos de Listagem

Os formatos de texto usam placeholders para compor como cada recurso aparece na listagem de custos:

| Placeholder | Significado |
|-------------|-------------|
| `%1` | Custo (quantidade envolvida na transação) |
| `%2` | Quantidade possuída pelo jogador |
| `%3` | Ícone do recurso |
| `%4` | Nome do recurso |

Cada tipo de recurso (Item, Weapon, Armor, Variable) possui seu próprio formato configurável.
