# Plugin Parameters - Skill Cost Types

Skill Cost Types são os recursos usados para skills. Incluem os padrão (MP, TP) e os novos (HP, Gold, Potion, Item, Weapon, Armor).

---

## Settings (por tipo de custo)

| Parâmetro | Descrição |
|-----------|-----------|
| **Name** | Nome do Skill Cost Type |
| **Icon** | Ícone (0 para nenhum) |
| **Font Color** | Cor do texto. Número para Window Skin color ou `#rrggbb` (requer MessageCore) |
| **Font Size** | Tamanho da fonte |

---

## Cost Processing (por tipo de custo)

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: Cost Calculation** | Código para calcular o custo do recurso |
| **JS: Can Pay Cost?** | Código para verificar se o user pode pagar |
| **JS: Paying Cost** | Código para executar o pagamento |

---

## Window Display (por tipo de custo)

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: Show Cost?** | Determina se o custo é exibido |
| **JS: Cost Text** | Texto exibido (suporta Text Codes) |

---

## Gauge Display (por tipo de custo)

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: Maximum Value** | Valor máximo para gauges |
| **JS: Current Value** | Valor atual para gauges |
| **JS: Draw Gauge** | Como desenhar o gauge |

---

## Tipos Padrão

| Tipo | Recurso | Nota |
|------|---------|------|
| **HP** | Hit Points | Custo em vida |
| **MP** | Magic Points | Padrão RMMZ, customizável |
| **TP** | Tactical Points | Padrão RMMZ, customizável |
| **Gold** | Dinheiro | Consome gold |
| **Potion** | Item genérico | Configurável |
| **Item Cost** | Items/Weapons/Armors | Via notetag `<Item Cost: x name>` |

**Nota**: As configurações de "Item Cost" abrangem Item, Weapon e Armor costs.
