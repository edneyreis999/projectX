# Referencia Rapida - Todas as Notetags

## Tabela Resumo por Tipo de Heranca

| Tipo | Notetag Base | Objetos |
|------|-------------|---------|
| Everything | `<Inherit Everything From: X>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset |
| Notetags | `<Inherit Notetags From: X>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset |
| Properties | `<Inherit Properties From: X>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset |
| Damage Formula | `<Inherit Damage Formula From: X>` | Skill, Item |
| Parameters | `<Inherit Parameters From: X>` | Weapon, Armor, Enemy |
| Action Patterns | `<Inherit Action Patterns From: X>` | Enemy |
| Traits | `<Inherit Traits From: X>` | Actor, Class, Weapon, Armor, Enemy, State |
| Effects | `<Inherit Effects From: X>` | Skill, Item |

## Variantes Posicionais

Cada tipo de notetag possui 5 variantes:

| Variante | Sintaxe | Significado |
|----------|---------|-------------|
| Por ID | `From: id` ou `From: id, id, id` | Objeto especifico por ID |
| Por Nome | `From: name` ou `From: name, name, name` | Objeto especifico por nome |
| First | `Inherit First [Tipo]` | Primeiro objeto do banco |
| Last | `Inherit Last [Tipo]` | Ultimo objeto do banco |
| Previous | `Inherit Previous [Tipo]` | Objeto anterior no banco |
| Next | `Inherit Next [Tipo]` | Proximo objeto no banco |

## Exemplos Rapidos

```
# Herda tudo do Actor ID 3
<Inherit Everything From: 3>

# Herda traits do Weapon "Espada de Ferro"
<Inherit Traits From: Espada de Ferro>

# Herda action patterns do Enemy anterior
<Inherit Previous Action Patterns>

# Herda notetags de multiplos objetos
<Inherit Notetags From: 5, 10, 15>

# Herda formula de dano do primeiro Skill
<Inherit First Damage Formula>
```

## Suporte por Objeto

| Objeto | Everything | Notetags | Properties | Damage | Params | Actions | Traits | Effects |
|--------|-----------|----------|------------|--------|--------|---------|--------|---------|
| Actor  | Sim | Sim | Sim | - | - | - | Sim | - |
| Class  | Sim | Sim | Sim | - | - | - | Sim | - |
| Skill  | Sim | Sim | Sim | Sim | - | - | - | Sim |
| Item   | Sim | Sim | Sim | Sim | - | - | - | Sim |
| Weapon | Sim | Sim | Sim | - | Sim | - | Sim | - |
| Armor  | Sim | Sim | Sim | - | Sim | - | Sim | - |
| Enemy  | Sim | Sim | Sim | - | Sim | Sim | Sim | - |
| State  | Sim | Sim | Sim | - | - | - | Sim | - |
| Tileset| Sim | Sim | Sim | - | - | - | - | - |

## Total de Notetags

8 tipos x 5 variantes (posicionais) + 8 tipos x 2 variantes (id/nome com multiplas entradas) = **40 notetags posicionais + 16 notetags por referencia** = 56+ combinacoes.

Contando as variacoes de multiplos IDs/nomes e multiplas notetags inseridas, o plugin oferece **64 notetags** conforme documentado.
