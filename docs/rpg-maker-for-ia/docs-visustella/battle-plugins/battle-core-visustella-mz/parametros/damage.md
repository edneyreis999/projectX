# Damage Settings - Plugin Parameters

## Visão Geral
Estes Plugin Parameters adicionam uma variedade de coisas em como damage é handled na batalha, variando de hard damage caps a soft damage caps, como damage popups appear, como as formulas para vários aspects são handled e mais.

Damage Styles são também um feature adicionado através deste plugin. Mais informações podem ser encontradas na seção 'Damage Styles'.

## Parâmetros

### Damage Styles

#### Default Style
- **Descrição**: Qual Damage Style você quer set como default?
- **Opções**: Use 'Manual' para não usar qualquer styles
- **Notas**:
  - O estilo 'Manual' não suportará <Armor Penetration> notetags
  - O estilo 'Manual' não suportará <Armor Reduction> notetags

#### Style List
- **Descrição**: Uma lista dos damage styles disponíveis. Estes são usados para calculate base damage

**Itens do Style List**:

- **Name**: Nome deste Damage Style (usado para notetags e such)

- **JS: Formula**: A base formula para este Damage Style

- **Items & Equips Core**:
  - **HP Damage**, **MP Damage**, **HP Recovery**, **MP Recovery**, **HP Drain**, **MP Drain**:
    - Vocabulary usado para este data entry
  - **JS: Damage Display**: Code usado o data displayed para esta categoria

### Damage Cap

#### Enable Damage Cap?
- **Descrição**: Put um maximum hard damage cap em quanto longe damage pode ir?
- **Notas**: Isto pode ser broken através do usage de notetags

#### Default Hard Cap
- **Descrição**: O default hard damage cap usado antes de applying damage

#### Enable Soft Cap?
- **Descrição**: Soft caps ease in os damage values leading up ao hard damage cap
- **Notas**: Requires hard Damage Cap enabled

**Sub-parâmetros**:

- **Base Soft Cap Rate**: O default soft damage cap usado antes de applying damage
- **Soft Scale Constant**: O default soft damage cap usado antes de applying damage

### Popups

#### Popup Duration
- **Descrição**: Adjusts quantos frames um popup stays visible

#### Newest Popups Bottom
- **Descrição**: Puts o newest popups no bottom

#### End Battle Show?
- **Descrição**: Show ou hide popups upon victory ou escape?
- **Uso**: Used para hide battle-state removal popups

#### Offset X / Offset Y
- **Descrição**: Sets quanto para offset os sprites por horizontally/vertically

#### Shift X / Shift Y
- **Descrição**: Sets quanto para shift os sprites por horizontally/vertically

#### Critical Flash Color
- **Descrição**: Adjust o popup's flash color
- **Formato**: [red, green, blue, alpha]

#### Critical Duration
- **Descrição**: Adjusts quantos frames o flash lasts

### Formulas

#### JS: Overall Formula
- **Descrição**: A overall formula usado quando calculating damage

#### JS: Variance Formula
- **Descrição**: A formula usado quando damage variance

#### JS: Guard Formula
- **Descrição**: A formula usado quando damage é guarded

### Critical Hits

#### JS: Rate Formula
- **Descrição**: A formula usado para calculate Critical Hit Rates

#### JS: Damage Formula
- **Descrição**: A formula usado para calculate Critical Hit Damage modification

## Ver Também

- [Conceitos: Damage Styles](../conceitos/damage-styles.md) - Documentação de Damage Styles disponíveis
- [Notetags: Damage](../notetags/damage.md) - Notetags relacionadas a damage
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
