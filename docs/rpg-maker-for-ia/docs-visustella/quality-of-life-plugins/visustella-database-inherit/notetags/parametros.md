# Notetags - Heranca de Parametros

Heranca e **extensao** de parametros (MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK) do parent para o child.

**Aplica-se a**: Weapon, Armor, Enemy

## Notetags

### Por ID ou Nome

```
<Inherit Parameters From: id>
<Inherit Parameters From: id, id, id>

<Inherit Parameters From: name>
<Inherit Parameters From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Parameters>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Parameters>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Parameters>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Parameters>
```
Herda do proximo objeto do mesmo banco de dados.

## Como Funciona a Extensao

```
Parent MaxHP: 500
Child MaxHP:  100

Resultado: (500) + (100) = 600
```

O formato de extensao pode ser alterado em Plugin Parameters usando `%1` (parent) e `%2` (child).

## Notas

- Suporta multiplas notetags para herdar de mais de um parent
- O formato padrao e aditivo (`%1 + %2`), mas pode ser customizado
