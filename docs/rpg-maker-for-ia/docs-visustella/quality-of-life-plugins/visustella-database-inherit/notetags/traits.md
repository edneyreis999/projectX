# Notetags - Heranca de Traits

Heranca e **extensao** de traits do parent para o child. Os traits do parent sao adicionados primeiro, os do child depois.

**Aplica-se a**: Actor, Class, Weapon, Armor, Enemy, State

## Notetags

### Por ID ou Nome

```
<Inherit Traits From: id>
<Inherit Traits From: id, id, id>

<Inherit Traits From: name>
<Inherit Traits From: name, name, name>
```

- Substitua `id` pelo ID do objeto no banco de dados
- Substitua `name` pelo nome do objeto no banco de dados
- O objeto parent deve existir no mesmo banco de dados
- Nao e possivel herdar de bancos de dados diferentes
- Multiplas notetags = multiplas herancas

### Posicionais

```
<Inherit First Traits>
```
Herda do primeiro objeto do mesmo banco de dados.

```
<Inherit Last Traits>
```
Herda do ultimo objeto do mesmo banco de dados.

```
<Inherit Previous Traits>
```
Herda do objeto anterior do mesmo banco de dados.

```
<Inherit Next Traits>
```
Herda do proximo objeto do mesmo banco de dados.

## Ordem Importa

Traits do parent vem primeiro, traits do child depois. Em RPG Maker MZ, a ordem dos traits pode afetar como eles sao empilhados ou sobrescritos. Considere isso ao configurar heranca.

## Notas

- Suporta multiplas notetags para herdar de mais de um parent
- Traits sao sempre estendidos (adicionados), nunca sobrescritos
- Skills NAO suportam heranca de traits (suportam effects)
