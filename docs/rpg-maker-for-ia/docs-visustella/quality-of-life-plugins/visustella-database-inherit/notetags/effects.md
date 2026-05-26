# Notetags - Heranca de Effects

Heranca e **extensao** de effects do parent para o child. Os effects do parent sao adicionados primeiro, os do child depois.

**Aplica-se a**: Skill, Item

## Notetags

### Por ID ou Nome

```
<Inherit Effects From: id>
<Inherit Effects From: id, id, id>

<Inherit Effects From: name>
<Inherit Effects From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Effects>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Effects>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Effects>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Effects>
```
Herda do proximo objeto do mesmo banco de dados.

## Ordem Importa

Effects do parent vem primeiro, effects do child depois. A ordem pode importar para efeitos que dependem de estado anterior (ex: HP recovery antes/dpois de damage).

## Notas

- Suporta multiplas notetags para herdar de mais de um parent
- Effects sao sempre estendidos (adicionados), nunca sobrescritos
- Apenas Skills e Items possuem effects no RPG Maker MZ
