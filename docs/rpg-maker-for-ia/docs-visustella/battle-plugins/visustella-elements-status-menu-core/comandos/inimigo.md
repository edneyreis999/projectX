# Comandos - Inimigo

Plugin Commands acessados via Plugin Command event command.

## Change Trait Sets

### Enemy: Change Trait Sets (Group)
### Enemy: Change Trait Sets (Range)
### Enemy: Change Trait Sets (JS)

Altera os Trait Sets do(s) inimigo(s) selecionado(s).

- **Step 1: Target Index** - Selecionar Enemy Index(es)
- **Step 2: Change Trait Set** - Para cada tipo de trait:
  - Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, Variant
  - Opcoes por tipo:
    - Nome do Trait Set para trocar
    - "Unchanged" para manter
    - "Random" para randomizar (usa pool e pesos dos Plugin Parameters)

As 3 versoes diferem apenas na forma de selecionar Enemy Indexes.

**Nota**: Trocar traits atualiza nome, grafico e hue do inimigo conforme configurado.

Veja tambem:
- [Ator](ator.md)
- [Trait Sets Conceito](../conceitos/trait-sets.md)
- [Script Calls](script-calls.md)
