# Formula de Dano Elemental

## Formula Base

```
(base + plus) * rate + flat
```

## Ordem de Calculo

```
1. base    → Taxa elemental do database (traits do battler)
2. plus    → Modificacao aditiva (Received/Dealt Element Plus)
3. soma    → base + plus
4. rate    → Modificacao multiplicativa (Received/Dealt Element Rate)
5. mult    → (base + plus) * rate
6. flat    → Modificacao aditiva final (Received/Dealt Element Flat)
7. final   → (base + plus) * rate + flat
```

## Lados do Calculo

### Target (Received)
Modificadores aplicados ao dano que o **target recebe**:
- Received Element Plus → aditivo antes de rate
- Received Element Rate → multiplicativo
- Received Element Flat → aditivo apos rate

### User (Dealt)
Modificadores aplicados ao dano que o **user causa**:
- Dealt Element Plus → aditivo antes de rate
- Dealt Element Rate → multiplicativo
- Dealt Element Flat → aditivo apos rate

## Elementos Especiais

### Force Element
`<Force Action Element>` substitui completamente o elemento. Ignora o dano elemental do database.

### Absorcao
Calculada **apos** todas as taxas. Converte dano em cura (valor negativo).

### Reflexao
Ocorre **antes** de qualquer calculo de dano. Prioridade sobre Magic Reflection.

### Pierce
Ignora imunidade, reflexao e absorcao. Acao ainda pode miss/countered.

## Multi-Elemento

Quando uma acao tem multiplos elementos:

| Regra | Calculo |
|-------|---------|
| Maximum | max(rate1, rate2, ...) |
| Minimum | min(rate1, rate2, ...) |
| Multiply | rate1 * rate2 * ... |
| Additive | rate1 + rate2 + ... |
| Average | (rate1 + rate2 + ...) / count |

Formulas podem ser customizadas via Plugin Parameters (JS: Maximum/Minimum/Multiply/Additive/Average Rate).

## Customizacao

As formulas JS nos Plugin Parameters permitem alterar:
- **JS: Received Rate** - Como a taxa recebida e calculada
- **JS: Finalize Rate** - Como a taxa final e determinada antes do dano

Veja tambem:
- [Element Rulings](../parametros/element-rulings.md)
- [Calculo Dano Elemental](../conceitos/calculo-dano-elemental.md)
