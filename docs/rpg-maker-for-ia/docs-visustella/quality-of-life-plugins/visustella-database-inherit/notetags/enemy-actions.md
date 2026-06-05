# Notetags - Heranca de Enemy Action Patterns

Heranca e **extensao** de action patterns de inimigos. Os patterns do parent sao criados primeiro, os do child adicionados ao final.

**Aplica-se a**: Enemy

## Notetags

### Por ID ou Nome

```
<Inherit Action Patterns From: id>
<Inherit Action Patterns From: id, id, id>

<Inherit Action Patterns From: name>
<Inherit Action Patterns From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Action Patterns>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Action Patterns>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Action Patterns>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Action Patterns>
```
Herda do proximo objeto do mesmo banco de dados.

## Ordem Importa

Os action patterns do parent sao inseridos primeiro, seguidos pelos do child. Considere a ordem ao criar as listas de acoes, pois pode afetar a logica de batalha (especialmente com condicoes de rating e turnos).

## Notas

- Suporta multiplas notetags para herdar de mais de um parent
- Action patterns sao sempre estendidos (adicionados), nunca sobrescritos
