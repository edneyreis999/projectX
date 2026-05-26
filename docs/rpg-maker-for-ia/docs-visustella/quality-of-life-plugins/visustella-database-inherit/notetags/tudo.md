# Notetags - Heranca Completa (Everything)

Heranca de **todas** as propriedades: notetags, propriedades basicas, formulas de dano, parametros, action patterns, traits e effects.

**Aplica-se a**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset

## Notetags

### Por ID ou Nome

```
<Inherit Everything From: id>
<Inherit Everything From: id, id, id>

<Inherit Everything From: name>
<Inherit Everything From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Everything>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Everything>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Everything>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Everything>
```
Herda do proximo objeto do mesmo banco de dados.

## Notas

- Todas as variantes posicionais suportam multiplas notetags para heranca de mais de um parent
- Heranca "Everything" e a mais abrangente - considere usar notetags especificas se precisar de controle granular
- Lembre-se da [regra de ordem de IDs](../conceitos/ordem-heranca.md)
