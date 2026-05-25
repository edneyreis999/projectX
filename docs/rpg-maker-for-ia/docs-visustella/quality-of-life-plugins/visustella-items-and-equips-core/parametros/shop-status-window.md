# Plugin Parameters: Shop Status Window

Configurações focadas no Shop Status Window e como seus dados são exibidos.

---

## General

| Parâmetro | Descrição |
|-----------|-----------|
| Window Width | Largura padrão da janela de status |
| Parameter Font Size | Tamanho da fonte para mudanças de parâmetros |
| Translucent Opacity | Opacidade para objetos translúcidos da janela |
| Show Back Rectangles? | Retângulos escuros para destacar informação |
| Back Rectangle Color | `#rrggbb` ou número para Window Skin |

---

## Equipment Data

### Data Style

| Estilo | Descrição |
|--------|-----------|
| **Compare** | Compara equip selecionado com equip atual. Lista atores do party. Mostra diferenças de parâmetros. Calcula JS values. |
| **Classic** | Parâmetros básicos sem atores. Não mostra JS/params customizados. |
| **Double** | Parâmetros em colunas duplas sem atores. Não mostra JS/params customizados. |

### Compare Style Options

| Parâmetro | Descrição |
|-----------|-----------|
| Already Equipped | Marcador para item já equipado |
| Can't Equip | Marcador para ator que não pode equipar |
| No Changes | Marcador para sem mudanças |
| JS: Draw Equip Data | Código para desenhar dados de equipamento |

### Classic/Double Style Options

| Parâmetro | Descrição |
|-----------|-----------|
| Added Weapon Params | Parâmetros exibidos ao selecionar weapon (requer Core Engine) |
| Added Armor Params | Parâmetros exibidos ao selecionar armor (requer Core Engine) |
| JS: Draw Equip Data | Código para desenhar dados de equipamento |

### Delay MS

Milissegundos de delay para atualizar preview. Previne lag spikes para equipamentos.

---

## Item Data

| Parâmetro | Descrição |
|-----------|-----------|
| Max State/Buff Icons | Máximo de icons para Add/Remove States/Buffs |
| Multiplier Standard | Constante padrão para filtrar valores aleatórios no damage multiplier |
| JS: Draw Item Data | Código para desenhar dados de itens |

---

## Vocabulary

Textos customizáveis para:
- Consumable, Occasions, Scope, Speed
- Success Rate, Repeats, Hit Type
- Element, Damage Type, Effects

### Nota sobre Damage Labels

Se Visu_1_BattleCore está instalado, prioridade vai para seus Damage Style settings. O label exibido é baseado nas configurações do damage style específico.

**Caminho**: Battle Core > Plugin Parameters > Damage Settings > Style List > pick style > Damage Label

---

## Veja Também

- [Status Window (Conceito)](../conceitos/shop-status-window.md)
- [Status Window Notetags](../notetags/status-window.md)
