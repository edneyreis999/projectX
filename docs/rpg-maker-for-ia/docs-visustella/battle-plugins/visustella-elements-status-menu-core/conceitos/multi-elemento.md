# Multi-Elemento

## Comportamento Vanilla

No RPG Maker MZ padrao, quando uma acao tem multiplos elementos, apenas o elemento com a **maior taxa** e usado.

## Regras Disponiveis

O plugin adiciona 5 opcoes de calculo para multi-elementos:

| Regra | Descricao | Formula |
|-------|-----------|---------|
| **Maximum** | Maior taxa entre todos os elementos (padrao vanilla) | max(rates) |
| **Minimum** | Menor taxa entre todos os elementos | min(rates) |
| **Multiply** | Produto de todas as taxas | rates[0] * rates[1] * ... |
| **Additive** | Soma de todas as taxas | rates[0] + rates[1] + ... |
| **Average** | Media de todas as taxas | sum(rates) / count |

### Configuracao

- **Padrao**: Definido em Plugin Parameters > Element Rulings > Multi-Element Ruling
- **Per-skill/item**: Override via notetag `<Multi-Element Rule: Maximum/Minimum/Multiply/Additive/Average>`

## Reflexao com Multi-Elemento

Quando uma acao tem multiplos elementos, a reflexao pode ser determinada por:

| Regra | Descricao |
|-------|-----------|
| **All** | TODOS os elementos devem ser reflecciveis para a acao ser refletida |
| **Any** | Apenas UM elemento refleccivel ja basta para refletir a acao |

Configuravel em:
- Plugin Parameters > Element Rulings > Reflect-Element Ruling
- Notetag `<Element Reflect Rule: All>` ou `<Element Reflect Rule: Any>` por skill/item

## Pierce com Multi-Elemento

Se uma acao tem multiplos elementos e **pelo menos um** deles tem Element Pierce, a acao inteira atravessa (pierce) imunidades, reflexoes e absorcoes.

## Atribuindo Multi-Elementos

Skills e items podem ter elementos adicionais (alem do Damage element):

```
<Multi-Element: 3>
<Multi-Element: Fire, Ice>
<Multi-Element: name>
```

Multiplos elementos sao acumulados inserindo varias notetags.

Veja tambem:
- [Calculo Dano Elemental](calculo-dano-elemental.md)
- [Notetags de Elementos](../notetags/elementos.md)
- [Element Rulings](../parametros/element-rulings.md)
