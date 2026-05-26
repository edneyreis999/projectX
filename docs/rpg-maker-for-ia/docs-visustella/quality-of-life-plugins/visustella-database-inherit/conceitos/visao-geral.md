# Visao Geral - Database Inherit

## O que e

O VisuStella Database Inherit permite que objetos do banco de dados herdem propriedades de outros objetos via notetags, eliminando a necessidade de criar cada objeto do zero ou usar copy/paste.

Cada objeto pode herdar: notetags, traits, effects, parametros, action patterns, formulas de dano e mais.

**Aviso**: O plugin pre-carrega todas as entradas do banco uma a uma, aumentando o tempo de carregamento proporcionalmente ao tamanho do banco e quantidade de herancas.

## Mecanismo de Heranca (7 Etapas)

### Etapa 1 - Notetag no Child

Use notetags no objeto child para definir de qual objeto parent as propriedades serao herdadas. O child e o objeto que contem a notetag. O parent e a origem.

### Etapa 2 - Parse de Notetags

Quando todos os dados JSON terminam de carregar, a heranca comeca parseando as notetags. Os metadados sao parseados pelo parser padrao do RPG Maker MZ. O note box do child e estendido com as notetags do parent, adicionadas DEPOIS das do child.

Configuravel em Plugin Parameters.

### Etapa 3 - Propriedades Basicas

Propriedades do parent sao copiadas: precos de itens, custos de MP de skills, prioridades de states, etc. Os parametros do plugin determinam quais propriedades sobrescrevem (overwrite) ou sao adicionadas (extend) ao child.

Configuravel em Plugin Parameters.

### Etapa 4 - Formulas de Dano

Se houver formulas de dano, a formula do child e adicionada ao final da do parent de forma aditiva, com subsets separados:

```
Parent: a.atk * 4 - b.def * 2
Child:  a.atk * 2 - b.def * 1

Resultado: (a.atk * 4 - b.def * 2) + (a.atk * 2 - b.def * 1)
```

Configuravel em Plugin Parameters.

### Etapa 5 - Parametros (Weapon, Armor, Enemy)

Parametros sao herdados e estendidos por adicao:

```
Parent MaxHP: 500
Child MaxHP:  100

Resultado: (500) + (100) = 600
```

Configuravel em Plugin Parameters.

### Etapa 6 - Enemy Action Patterns

Action patterns do parent sao criados primeiro, depois os do child sao adicionados ao final. A ordem importa para a logica de acoes.

### Etapa 7 - Traits e Effects

Traits (Actor, Class, Weapon, Armor, Skill, State) e Effects (Skill, Item) sao estendidos por adicao. Os do parent vem primeiro, os do child depois. A ordem pode importar dependendo da logica.

## Objetos Suportados

| Objeto | Notetags | Properties | Damage | Params | Actions | Traits | Effects |
|--------|----------|------------|--------|--------|---------|--------|---------|
| Actor  | Sim      | Sim        | -      | -      | -       | Sim    | -       |
| Class  | Sim      | Sim        | -      | -      | -       | Sim    | -       |
| Skill  | Sim      | Sim        | Sim    | -      | -       | -      | Sim     |
| Item   | Sim      | Sim        | Sim    | -      | -       | -      | Sim     |
| Weapon | Sim      | Sim        | -      | Sim    | -       | Sim    | -       |
| Armor  | Sim      | Sim        | -      | Sim    | -       | Sim    | -       |
| Enemy  | Sim      | Sim        | -      | Sim    | Sim     | Sim    | -       |
| State  | Sim      | Sim        | -      | -      | -       | Sim    | -       |
| Tileset| Sim      | Sim        | -      | -      | -       | -      | -       |
