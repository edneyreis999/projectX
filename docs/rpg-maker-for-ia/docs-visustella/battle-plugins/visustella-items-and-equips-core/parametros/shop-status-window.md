# Plugin Parameters: Shop Status Window

Configuração da Shop Status Window - como os dados são exibidos para items e equipamentos.

---

## General

| Parâmetro | Descrição |
|-----------|-----------|
| Window Width | Largura padrão do status window |
| Parameter Font Size | Tamanho da fonte para mudanças de parâmetros |
| Translucent Opacity | Opacidade para objetos translúcidos da window |
| Show Back Rectangles? | Retângulos escuros para melhor contraste |

---

## Equipment Data

### Data Style

Como exibir dados de equipamento:

| Style | Descrição |
|-------|-----------|
| **Compare** | Compara equip selecionado com equipado. Lista todos os actors do party. Exibe diferenças de parâmetros. Calcula JS values customizados |
| **Classic** | Parâmetros básicos sem actors. Não mostra JS values nem custom params |
| **Double** | Parâmetros em colunas duplas sem actors. Não mostra JS values nem custom params |

### Compare Style

| Parâmetro | Descrição |
|-----------|-----------|
| Already Equipped | Marker para actor já equipado com o item |
| Can't Equip | Marker para actor que não pode equipar |
| No Changes | Marker para nenhuma mudança |
| JS: Draw Equip Data | Código para desenhar dados de equipamento |

### Classic/Double Style

| Parâmetro | Descrição |
|-----------|-----------|
| Added Weapon Params | Parâmetros exibidos para weapons (requer Core Engine) |
| Added Armor Params | Parâmetros exibidos para armors (requer Core Engine) |
| JS: Draw Equip Data | Código para desenhar dados de equipamento |

### Delay MS

| Parâmetro | Descrição |
|-----------|-----------|
| Delay MS | Milissegundos de delay antes de atualizar preview (previne lag spikes para equips) |

---

## Item Data

| Parâmetro | Descrição |
|-----------|-----------|
| Max State/Buff Icons | Máximo de ícones exibidos para Add/Remove States/Buffs |
| Multiplier Standard | Constante para filtrar valores aleatórios ao calcular damage multiplier |
| JS: Draw Item Data | Código para desenhar dados de itens |

---

## Vocabulary

Nomes customizáveis para labels de dados:
- Consumable, Occasions, Scope, Speed, Success Rate, Repeats, Hit Type, Element, Damage Type, Effects

**Nota sobre Damage Labels**: Se Battle Core estiver instalado, prioridade vai para as Damage Style settings do Battle Core. Editar em Battle Core > Plugin Parameters > Damage Settings > Style List.

---

## Veja Também

- [notetags/status-window.md](../notetags/status-window.md) - Notetags de customização do Status Window
- [conceitos/shop-status-window.md](../conceitos/shop-status-window.md) - Conceito do Shop Status Window
