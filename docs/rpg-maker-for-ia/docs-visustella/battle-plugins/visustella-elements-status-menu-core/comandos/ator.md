# Comandos - Ator

Plugin Commands acessados via Plugin Command event command.

## Change Biography

### Actor: Change Biography (Group)
### Actor: Change Biography (Range)
### Actor: Change Biography (JS)

Altera a biografia do(s) ator(es) selecionado(s).

- **Step 1: Target ID** - Selecionar Actor ID(s)
- **Step 2: Biography** - Novo texto da biografia
  - Text codes permitidos
  - `%1` = nome do ator

As 3 versoes diferem apenas na forma de selecionar Actor IDs.

## Change Trait Sets

### Actor: Change Trait Sets (Group)
### Actor: Change Trait Sets (Range)
### Actor: Change Trait Sets (JS)

Altera os Trait Sets do(s) ator(es) selecionado(s).

- **Step 1: Target ID** - Selecionar Actor ID(s)
- **Step 2: Change Trait Set** - Para cada tipo de trait:
  - Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, Variant
  - Opcoes por tipo:
    - Nome do Trait Set para trocar
    - "Unchanged" para manter
    - "Random" para randomizar (usa pool e pesos dos Plugin Parameters)

As 3 versoes diferem apenas na forma de selecionar Actor IDs.

**Nota**: Trocar traits pode remover equipamentos incompativeis com `<Equip Trait Requirement>`.

Veja tambem:
- [Biografia Ator](../notetags/biografia-ator.md)
- [Inimigo](inimigo.md)
- [Trait Sets Conceito](../conceitos/trait-sets.md)
