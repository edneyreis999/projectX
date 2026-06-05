# Notetags - Elementos

## Multi-Element

Atribui elementos adicionais a skills/items (alem do Damage element).

```
<Multi-Element: x>
<Multi-Element: x,x,x>
<Multi-Element: name>
<Multi-Element: name, name, name>
```

- **Usado em**: Skill, Item
- `x` = ID do elemento (Database > Types)
- `name` = nome do elemento (sem \I[x])
- Inserir multiplas notetags para mais elementos

## Multi-Element Rule

Override da regra de calculo multi-elementar para esta acao.

```
<Multi-Element Rule: Maximum>
<Multi-Element Rule: Minimum>
<Multi-Element Rule: Multiply>
<Multi-Element Rule: Additive>
<Multi-Element Rule: Average>
```

- **Usado em**: Skill, Item
- Se nao usado, usa o padrao dos Plugin Parameters

## Force Action Element

Forca a acao a ter elemento(s) especifico(s), ignorando o dano elemental original.

```
<Force Action Element: Null>
<Force Action Element: x>
<Force Action Element: x,x,x>
<Force Action Element: name>
<Force Action Element: name, name, name>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- `Null` remove a propriedade elemental
- **Prioridade** quando multiplos sao encontrados: states > actor/enemy > class > equips

## Force Received Element Rate

Forca o target a receber dano elemental a uma taxa especifica.

```
<Force Received Element id Rate: x%>
<Force Received Element id Rate: x.x>
<Force Received Element name Rate: x%>
<Force Received Element name Rate: x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State

## Received Element Plus

Modificacao aditiva no dano elemental recebido (antes de rate).

```
<Received Element id Plus: +x%>
<Received Element id Plus: +x.x>
<Received Element name Plus: +x%>
<Received Element name Plus: +x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Formula: `(base + plus) * rate + flat`

## Received Element Rate

Modificacao multiplicativa no dano elemental recebido (apos plus, antes de flat).

```
<Received Element id Rate: x%>
<Received Element id Rate: x.x>
<Received Element name Rate: x%>
<Received Element name Rate: x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Formula: `(base + plus) * rate + flat`

## Received Element Flat

Modificacao aditiva final no dano elemental recebido (apos rate).

```
<Received Element id Flat: +x%>
<Received Element id Flat: +x.x>
<Received Element name Flat: +x%>
<Received Element name Flat: +x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Formula: `(base + plus) * rate + flat`

## Dealt Element Plus

Modificacao aditiva no dano elemental causado (antes de rate).

```
<Dealt Element id Plus: +x%>
<Dealt Element id Plus: +x.x>
<Dealt Element name Plus: +x%>
<Dealt Element name Plus: +x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State

## Dealt Element Rate

Modificacao multiplicativa no dano elemental causado (apos plus, antes de flat).

```
<Dealt Element id Rate: x%>
<Dealt Element id Rate: x.x>
<Dealt Element name Rate: x%>
<Dealt Element name Rate: x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State

## Dealt Element Flat

Modificacao aditiva final no dano elemental causado (apos rate).

```
<Dealt Element id Flat: +x%>
<Dealt Element id Flat: +x.x>
<Dealt Element name Flat: +x%>
<Dealt Element name Flat: +x.x>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State

## Element Absorb

Permite o battler absorver dano do elemento.

```
<Element Absorb: x>
<Element Absorb: x,x,x>
<Element Absorb: name>
<Element Absorb: name, name, name>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Absorcao calculada apos todas as outras taxas

## Element Reflect

Permite o battler refletir dano do elemento.

```
<Element Reflect: x>
<Element Reflect: x,x,x>
<Element Reflect: name>
<Element Reflect: name, name, name>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Reflexao ocorre ANTES do dano ser calculado
- **Prioridade** sobre Magic Reflection

## Bypass Element Reflect

Impede que esta skill/item seja refletida por Element Reflect.

```
<Bypass Element Reflect>
```

- **Usado em**: Skill, Item

## Element Reflect Rule

Define como a reflexao funciona com multi-elementos para esta acao.

```
<Element Reflect Rule: All>
```
Todos os elementos devem ser reflecciveis.

```
<Element Reflect Rule: Any>
```
Apenas um elemento refleccivel basta.

- **Usado em**: Skill, Item
- Se nao usado, segue o padrao dos Plugin Parameters

## Element Pierce (Battler)

Permite atacar com elemento ignorando imunidades, reflexoes e absorcoes.

```
<Element Pierce: x>
<Element Pierce: x,x,x>
<Element Pierce: name>
<Element Pierce: name, name, name>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State
- Se a acao tem multiplos elementos, pelo menos um pierce basta
- Acao ainda pode miss ou ser countered

## Element Pierce (Skill/Item)

Faz a skill/item ignorar imunidades, reflexoes e absorcoes.

```
<Element Pierce>
```

- **Usado em**: Skill, Item
- Acao ainda pode miss ou ser countered

Veja tambem:
- [JS Elementos](js-elementos.md) - Variacoes JavaScript
- [Referencia Rapida](referencia-rapida.md) - Tabela completa
