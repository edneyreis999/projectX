# Notetags - Heranca de Notetags

Heranca de **notetags apenas** do objeto parent. As notetags do parent sao adicionadas apos as do child.

**Aplica-se a**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, Tileset

## Notetags

### Por ID ou Nome

```
<Inherit Notetags From: id>
<Inherit Notetags From: id, id, id>

<Inherit Notetags From: name>
<Inherit Notetags From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Notetags>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Notetags>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Notetags>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Notetags>
```
Herda do proximo objeto do mesmo banco de dados.

## Notas

- Os metadados (meta flags) podem ser controlados via Plugin Parameters
- As notetags do parent sao adicionadas DEPOIS das do child
- Suporta multiplas notetags para herdar de mais de um parent
