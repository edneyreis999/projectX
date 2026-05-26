# Notetags - Heranca de Formulas de Dano

Heranca e **extensao** de formulas de dano do parent para o child. A formula do child e adicionada ao final da do parent de forma aditiva.

**Aplica-se a**: Skill, Item

## Notetags

### Por ID ou Nome

```
<Inherit Damage Formula From: id>
<Inherit Damage Formula From: id, id, id>

<Inherit Damage Formula From: name>
<Inherit Damage Formula From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Damage Formula>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Damage Formula>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Damage Formula>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Damage Formula>
```
Herda do proximo objeto do mesmo banco de dados.

## Como Funciona a Extensao

```
Parent Formula: a.atk * 4 - b.def * 2
Child Formula:  a.atk * 2 - b.def * 1

Resultado: (a.atk * 4 - b.def * 2) + (a.atk * 2 - b.def * 1)
```

Cada formula e mantida em seu proprio subset. O formato de extensao pode ser alterado em Plugin Parameters usando `%1` (parent) e `%2` (child).

## Notas

- Suporta multiplas notetags para herdar de mais de um parent
- O formato padrao e aditivo (`%1 + %2`), mas pode ser customizado
