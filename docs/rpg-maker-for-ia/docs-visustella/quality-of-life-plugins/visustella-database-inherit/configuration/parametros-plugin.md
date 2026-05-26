# Parametros do Plugin

Configuracao global do comportamento de heranca em **Plugin Parameters > Inheritance Settings**.

## Notetags

### Inherit Meta Flags
- **Tipo**: Boolean
- **Descricao**: Define se meta flags adicionados por notetags devem ser herdados
- **Padrao**: Sim

## Properties

### JS: Overwritten
- **Tipo**: Lista de JavaScript object keys
- **Descricao**: Chaves de propriedades que serao **sobrescritas** quando herdadas
- **Comportamento**: O valor do child e substituido pelo valor do parent

### JS: Extended
- **Tipo**: Lista de JavaScript object keys
- **Descricao**: Chaves de propriedades que serao **estendidas** quando herdadas
- **Comportamento**: O valor do parent e adicionado ao valor do child

## Damage Formulas

### Damage Format
- **Tipo**: String com placeholders
- **Placeholders**: `%1` = Parent Damage Formula, `%2` = Child Damage Formula
- **Padrao**: `%1 + %2` (soma aditiva)
- **Exemplo customizado**: `Math.max(%1, %2)` para usar o maior dos dois

## Parameters Formulas

### Parameter Format
- **Tipo**: String com placeholders
- **Placeholders**: `%1` = Parent Parameter Value, `%2` = Child Parameter Value
- **Padrao**: `%1 + %2` (soma aditiva)
- **Exemplo customizado**: `Math.max(%1, %2)` para usar o maior dos dois

## Exemplos de Customizacao

### Damage Format - Multiplicacao
```
%1 * %2
```
Formula do parent multiplicada pela formula do child.

### Parameter Format - Maior Valor
```
Math.max(%1, %2)
```
Usa o maior valor entre parent e child para cada parametro.

### Damage Format - Media
```
(%1 + %2) / 2
```
Media entre as formulas de dano.
