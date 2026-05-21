# Referencia Rapida - Todas as Notetags

## Notetags de Elemento (Estaticas)

| Notetag | Usado em | Descricao |
|---------|----------|-----------|
| `<Multi-Element: x/name>` | Skill, Item | Elemento adicional na acao |
| `<Multi-Element Rule: rule>` | Skill, Item | Override da regra multi-elemento |
| `<Force Action Element: x/Null>` | Actor, Class, Weapon, Armor, Enemy, State | Forca elemento da acao |
| `<Force Received Element id/name Rate: x>` | Actor, Class, Weapon, Armor, Enemy, State | Forca taxa recebida |
| `<Received Element id/name Plus: +x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus aditivo recebido (antes de rate) |
| `<Received Element id/name Rate: x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus multiplicativo recebido |
| `<Received Element id/name Flat: +x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus aditivo recebido (apos rate) |
| `<Dealt Element id/name Plus: +x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus aditivo causado (antes de rate) |
| `<Dealt Element id/name Rate: x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus multiplicativo causado |
| `<Dealt Element id/name Flat: +x>` | Actor, Class, Weapon, Armor, Enemy, State | Bonus aditivo causado (apos rate) |
| `<Element Absorb: x/name>` | Actor, Class, Weapon, Armor, Enemy, State | Absorve dano do elemento |
| `<Element Reflect: x/name>` | Actor, Class, Weapon, Armor, Enemy, State | Reflete dano do elemento |
| `<Bypass Element Reflect>` | Skill, Item | Nao pode ser refletido |
| `<Element Reflect Rule: All/Any>` | Skill, Item | Regra de reflexao multi-elemento |
| `<Element Pierce: x/name>` | Actor, Class, Weapon, Armor, Enemy, State | Ignora imunidade/reflexao/absorcao |
| `<Element Pierce>` | Skill, Item | Ignora imunidade/reflexao/absorcao |

## Notetags de Elemento (JavaScript)

| Notetag | Usado em | Descricao |
|---------|----------|-----------|
| `<JS Force Received Element id/name Rate: code>` | Actor, Class, Weapon, Armor, Enemy, State | Forca taxa recebida via JS |
| `<JS Received Element id/name Plus: code>` | Actor, Class, Weapon, Armor, Enemy, State | Plus recebido via JS |
| `<JS Received Element id/name Rate: code>` | Actor, Class, Weapon, Armor, Enemy, State | Rate recebida via JS |
| `<JS Received Element id/name Flat: code>` | Actor, Class, Weapon, Armor, Enemy, State | Flat recebido via JS |
| `<JS Dealt Element id/name Plus: code>` | Actor, Class, Weapon, Armor, Enemy, State | Plus causado via JS |
| `<JS Dealt Element id/name Rate: code>` | Actor, Class, Weapon, Armor, Enemy, State | Rate causada via JS |
| `<JS Dealt Element id/name Flat: code>` | Actor, Class, Weapon, Armor, Enemy, State | Flat causado via JS |

## Notetags de Trait Set

| Notetag | Usado em | Descricao |
|---------|----------|-----------|
| `<Type: name>` | Actor, Enemy | Atribui trait (inline) |
| `<Trait Sets>...</Trait Sets>` | Actor, Enemy | Atribui traits em bloco |
| `<Random type>...</Random type>` | Actor, Enemy | Randomiza trait com pesos |
| `<No Random Trait Sets>` | Actor, Enemy | Impede randomizacao |
| `<Trait Set Name Format>...</Trait Set Name Format>` | Enemy | Formato do nome |
| `<traitname Battler Name: filename>` | Enemy | Grafico por trait |
| `<traitname Battler Names>...</traitname Battler Names>` | Enemy | Graficos com pesos |
| `<traitname Battler Hue: x>` | Enemy | Hue por trait |
| `<traitname Battler Hues>...</traitname Battler Hues>` | Enemy | Hues com pesos |
| `<Equip Trait Requirement: name>` | Weapon, Armor | Restricao de equip por trait |
| `<Damage VS name Trait: x%>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Bonus dano VS trait |
| `<Healing VS name Trait: x%>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Bonus cura VS trait |
| `<Accuracy VS name Trait: x%>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Modifica precisao VS trait |
| `<Critical VS name Trait: x%>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Modifica critico VS trait |
| `<Replace type Trait: name>` | Weapon, Armor, State | Troca trait |

## Notetag de Biografia

| Notetag | Usado em | Descricao |
|---------|----------|-----------|
| `<Biography>...</Biography>` | Actor | Biografia no Status Menu |

## Tipos de Trait Set

Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, Variant
