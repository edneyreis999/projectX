# Calculo de Dano Elemental

## Como funciona no Vanilla

No RPG Maker MZ vanilla, dano elemental e calculado de forma simples: obter a resistencia elemental do target (de varios database objects) e aplicar a taxa ao dano.

## O que o plugin adiciona

O plugin expande o calculo em duas dimensoes:

1. **Lado do target (Received)**: Modificadores no dano recebido
2. **Lado do user (Dealt)**: Bonus no dano causado

## Formula Base

```
(base + plus) * rate + flat
```

### Componentes

| Componente | Descricao | Ordem |
|------------|-----------|-------|
| **base** | Taxa elemental base do database | Primeiro |
| **plus** | Modificador aditivo (Received/Dealt Element Plus) | Somado a base |
| **rate** | Modificador multiplicativo (Received/Dealt Element Rate) | Multiplica (base+plus) |
| **flat** | Modificador aditivo final (Received/Dealt Element Flat) | Somado ao resultado |

### Ordem de Aplicacao

1. Calcula base + plus
2. Multiplica por rate
3. Soma flat

Esta formula pode ser alterada via Plugin Parameters (Element Rulings > JS: Received Rate / JS: Finalize Rate).

## Modificadores do Target (Received)

Aplicados ao dano que o target recebe:

- **Received Element Plus**: Modificacao aditiva antes da rate
- **Received Element Rate**: Modificacao multiplicativa
- **Received Element Flat**: Modificacao aditiva apos rate

## Modificadores do User (Dealt)

Aplicados ao dano que o user causa:

- **Dealt Element Plus**: Modificacao aditiva antes da rate
- **Dealt Element Rate**: Modificacao multiplicativa
- **Dealt Element Flat**: Modificacao aditiva apos rate

## Forcar Elementos

A notetag `<Force Action Element>` substitui completamente o elemento da acao, ignorando o dano elemental do database.

A notetag `<Force Received Element Rate>` forca o target a receber dano a uma taxa especifica.

## Absorcao

Calculada apos todas as outras taxas elementais. Converte dano em cura.

## Reflexao

Ocorre ANTES de qualquer dano ser calculado e aplicado. Tem prioridade sobre Magic Reflection.

## Pierce

Ignora imunidades, reflexoes e absorcoes. A acao ainda pode miss ou ser countered.

Veja tambem:
- [Multi-Elemento](multi-elemento.md) - Regras para acoes com multiplos elementos
- [Formulas de Dano](../referencia/formula-dano.md) - Referencia completa de formulas
