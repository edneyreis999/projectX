# Shop Status Window

## Conceito

O Status Window encontrado na Shop Scene originalmente era vazio e não exibia muita informação. O Items & Equips Core transforma esta janela para fornecer informações detalhadas sobre itens e equipamentos.

## O que Mudou

- O conteúdo do Shop Status Window é customizável através de Plugin Parameters
- A mudança **não pode ser revertida** para o comportamento vanilla
- Fornece aos jogadores informações necessárias sobre itens do jogo

## Tipos de Dados Exibidos

### Para Skills e Itens

- Consumable, Quantity, Occasion, Scope
- Speed, Success Rate, Repeat, Hit Type
- Element, Damage Multiplier
- HP/MP/TP Recovery, HP/MP/TP Damage
- User TP Gain, Added/Removed Effects

### Para Weapons e Armors

- Parâmetros base: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK
- Com VisuStella Core Engine: X-Params e S-Params adicionais
  - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG
  - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR

## Estilos de Exibição para Equipamentos

| Estilo | Descrição |
|--------|-----------|
| **Compare** | Compara equip selecionado com equip atual. Lista todos atores do party. Mostra diferenças de parâmetros. Calcula valores JS customizados. |
| **Classic** | Mostra parâmetros básicos. Sem atores, apenas stats do item. Não mostra JS values customizados. |
| **Double** | Parâmetros básicos em colunas duplas. Sem atores. Não mostra JS values customizados. |

## Notetags Relacionadas

- `<Status Info>` - Sobrescreve dados gerados
- `<Custom Status Info>` - Adiciona categorias customizadas
- `<Status Style: Compare/Classic/Double>` - Muda estilo por equip
- `<Custom Status Parameters: name, name>` - Customiza quais parâmetros exibir
- `<Shop Picture Name: filename>` - Adiciona imagem ao status window

## Veja Também

- [Status Window Notetags](../notetags/status-window.md)
- [Shop Status Window Parameters](../parametros/shop-status-window.md)
