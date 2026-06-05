# Notetags - JS Elementos

Variacoes JavaScript das notetags de elemento para calculos dinamicos. Todas funcionam da mesma forma que as versoes estaticas, mas aceitam codigo JavaScript no lugar de valores fixos.

## JS Force Received Element Rate

```
<JS Force Received Element id Rate: code>
<JS Force Received Element name Rate: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- `code` = JavaScript para determinar a taxa

## JS Received Element Plus

```
<JS Received Element id Plus: code>
<JS Received Element name Plus: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao aditiva no dano recebido (antes de rate)

## JS Received Element Rate

```
<JS Received Element id Rate: code>
<JS Received Element name Rate: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao multiplicativa no dano recebido (apos plus, antes de flat)

## JS Received Element Flat

```
<JS Received Element id Flat: code>
<JS Received Element name Flat: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao aditiva final no dano recebido (apos rate)

## JS Dealt Element Plus

```
<JS Dealt Element id Plus: code>
<JS Dealt Element name Plus: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao aditiva no dano causado (antes de rate)

## JS Dealt Element Rate

```
<JS Dealt Element id Rate: code>
<JS Dealt Element name Rate: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao multiplicativa no dano causado (apos plus, antes de flat)

## JS Dealt Element Flat

```
<JS Dealt Element id Flat: code>
<JS Dealt Element name Flat: code>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Modificacao aditiva final no dano causado (apos rate)

## Padrao de Nomenclatura

Todas as JS notetags seguem o padrao:

```
<JS [Operacao] [Element] [Modificador]: code>
```

- **Operacao**: `Received` (recebido) ou `Dealt` (causado)
- **Element**: `Element id` (ID numerico) ou `Element name` (nome)
- **Modificador**: `Plus` (aditivo inicio), `Rate` (multiplicativo), `Flat` (aditivo final)

Veja tambem:
- [Elementos](elementos.md) - Versoes estaticas das notetags
- [Formula Dano](../referencia/formula-dano.md) - Ordem de aplicacao
