# Notetags - Trait Sets

**AVISO**: Trait Sets so funcionam se habilitados em Plugin Parameters > ElementStatusCore > General Trait Set Settings > Enable Trait Sets?

## Atribuicao Direta (Inline)

```
<Element: name>
<SubElement: name>
<Gender: name>
<Race: name>
<Nature: name>
<Alignment: name>
<Blessing: name>
<Curse: name>
<Zodiac: name>
<Variant: name>
```

- **Usado em**: Actor, Enemy
- `name` = nome do Trait Set definido nos Plugin Parameters
- Se nao usado, usa o padrao dos Plugin Parameters

### Exemplos

```
<Element: Fire>
<SubElement: Thunder>
<Gender: Male>
<Nature: Jolly>
<Alignment: Chaotic Good>
<Zodiac: Aries>
```

## Atribuicao em Bloco

```
<Trait Sets>
 Element:    name
 SubElement: name
 Gender:     name
 Race:       name
 Nature:     name
 Alignment:  name
 Blessing:   name
 Curse:      name
 Zodiac:     name
 Variant:    name
</Trait Sets>
```

- **Usado em**: Actor, Enemy
- Linhas nao usadas podem ser removidas
- Se nao definido, usa padrao dos Plugin Parameters

### Exemplo

```
<Trait Sets>
 Element:    Fire
 SubElement: Thunder
 Gender:     Male
 Nature:     Jolly
 Alignment:  Chaotic Good
 Zodiac:     Aries
</Trait Sets>
```

## Trait Sets Aleatorios

```
<Random type>
 name: weight
 name: weight
 name
</Random type>
```

- **Usado em**: Actor, Enemy
- `type` = Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, ou Variant
- `weight` = frequencia (maior = mais frequente). Omitir = sem peso especifico
- Bypassa as configuracoes de randomizacao dos Plugin Parameters

### Exemplos

```
<Random Gender>
 Male: 75
 Female: 25
</Random Gender>

<Random Variant>
 Mighty: 10
 Major: 20
 Greater: 60
 Normal: 200
 Lesser: 10
 Minor
 Puny
</Random Variant>
```

## Impedir Randomizacao

```
<No Random Trait Sets>
```

- **Usado em**: Actor, Enemy
- Previne atribuicao aleatoria de Trait Sets

## Formato de Nome de Inimigo

```
<Trait Set Name Format>
 text
</Trait Set Name Format>
```

- **Usado em**: Enemy
- Placeholders disponiveis: `[Name]`, `[Letter]`, `[Element]`, `[SubElement]`, `[Gender]`, `[Race]`, `[Nature]`, `[Alignment]`, `[Blessing]`, `[Curse]`, `[Zodiac]`, `[Variant]`

### Exemplo

```
<Trait Set Name Format>
 [Alignment] [Nature] [Element] [Name][Gender] [Letter]
</Trait Set Name Format>
```

## Battler Grafico por Trait

```
<traitname Battler Name: filename>
```

- **Usado em**: Enemy
- `traitname` = nome do Trait Set (ex: Male, Female)
- `filename` = grafico do battler

### Exemplo

```
<Male Battler Name: Spider1>
<Female Battler Name: Spider2>
```

### Com Pesos

```
<traitname Battler Names>
 filename: weight
 filename: weight
 filename
</traitname Battler Names>
```

### Exemplo

```
<Male Battler Names>
 Rogue: 25
 Fighter: 10
 Warrior
</Male Battler Names>
```

## Battler Hue por Trait

```
<traitname Battler Hue: x>
```

- **Usado em**: Enemy
- `x` = hue de 0 a 360

### Com Pesos

```
<traitname Battler Hues>
 x: weight
 x: weight
 x
</traitname Battler Hues>
```

### Exemplos

```
<Male Battler Hue: 160>
<Female Battler Hue: 275>

<Female Battler Hues>
 275: 10
 325: 5
 345
</Female Battler Hues>
```

## Requisito de Equip por Trait

```
<Equip Trait Requirement: name>
<Equip Trait Requirement: name, name, name>
```

- **Usado em**: Weapon, Armor
- Se multiplos traits requeridos, TODOS devem ser atendidos
- Se multiplos tipos de trait compartilham o mesmo nome, conta para todos
- Trocar traits mid-game remove equipamentos incompativeis

### Exemplo

```
<Equip Trait Requirement: Female>
```
Item so equipavel por atores com trait Female.

## Damage VS Trait

```
<Damage VS name Trait: x%>
```

- **Usado em**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State
- Em skill/item: multiplica dano da acao por x% contra targets com esse trait
- Em actor/class/weapon/armor/enemy/state: multiplica TODOS os danos por x%
- **Nao afeta cura**
- Multiplos notetags empilham multiplicativamente

## Healing VS Trait

```
<Healing VS name Trait: x%>
```

- **Usado em**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State
- Em skill/item: multiplica cura da acao por x% contra targets com esse trait
- Em actor/class/weapon/armor/enemy/state: multiplica TODAS as curas por x%
- **Nao afeta dano**
- Multiplos notetags empilham multiplicativamente

## Accuracy VS Trait

```
<Accuracy VS name Trait: x%>
<Accuracy VS name Trait: +x%>
<Accuracy VS name Trait: -x%>
```

- **Usado em**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State
- `x%` = multiplicativo (empilha multiplicativamente)
- `+x%` = aditivo (empilha aditivamente)
- `-x%` = subtrativo (empilha aditivamente)

## Critical VS Trait

```
<Critical VS name Trait: x%>
<Critical VS name Trait: +x%>
<Critical VS name Trait: -x%>
```

- **Usado em**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State
- `x%` = multiplicativo (empilha multiplicativamente)
- `+x%` = aditivo (empilha aditivamente)
- `-x%` = subtrativo (empilha aditivamente)

## Replace Trait

```
<Replace type Trait: name>
```

- **Usado em**: Weapon, Armor, State
- Substitui o trait atual do tipo `type` pelo trait `name`
- `type` = Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, ou Variant
- Para multiplos tipos, usar multiplas notetags
- **Prioridade**: states (alta para baixa) > equipamentos (ordem de equip)

Veja tambem:
- [Trait Sets Conceito](../conceitos/trait-sets.md)
- [Referencia Rapida](referencia-rapida.md)
