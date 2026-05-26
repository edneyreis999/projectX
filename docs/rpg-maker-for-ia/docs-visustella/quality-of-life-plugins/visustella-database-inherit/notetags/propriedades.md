# Notetags - Heranca de Propriedades Basicas

Heranca de **propriedades basicas** conforme definido nos Plugin Parameters (precos, custos, prioridades, etc).

**Aplica-se a**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset

## Notetags

### Por ID ou Nome

```
<Inherit Properties From: id>
<Inherit Properties From: id, id, id>

<Inherit Properties From: name>
<Inherit Properties From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas
- **Com multiplos parents**: propriedades overwrited vem do **ultimo** parent listado

### Posicionais

```
<Inherit First Properties>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Properties>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Properties>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Properties>
```
Herda do proximo objeto do mesmo banco de dados.

## Notas

- Quais propriedades sao overwrite vs extend e definido em Plugin Parameters
- Com multiplos parents, a heranca de overwrite vem do ultimo parent listado
- Suporta multiplas notetags para herdar de mais de um parent
