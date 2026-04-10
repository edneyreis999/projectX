# Comandos Plugin: Atores (Actor Plugin Commands)

## Overview

Comandos de plugin para modificar dinamicamente as configurações do Field Gauge para **atores** durante eventos.

---

## Actor: Change Field Gauge Icon

### Descrição
Muda o ícone do marcador de um ou mais actors no Field Gauge.

### Plugin Command
```
Actor: Change Field Gauge Icon
```

### Parâmetros

#### Actor ID(s)
- **Tipo**: Select
- **Descrição**: Seleciona quais actors são afetados
- **Opções**:
  - Actor 1, Actor 2, etc.
  - Multiple selection possível

#### Icon
- **Tipo**: Number
- **Descrição**: Índice do ícone no IconSet
- **Valor**: 0 a N (depende do IconSet)

### Exemplos de Evento

#### Single Actor
```
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: 5

# Resultado:
# Actor 1 agora mostra ícone 5 no Field Gauge
```

#### Multiple Actors
```
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1, Actor 2, Actor 3
└─ Icon: 1

# Resultado:
# Actors 1, 2, 3 mostram ícone 1 (Sword)
```

#### Variable Icon
```
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: Variable[1]

# Resultado:
# Actor 1 mostra ícone armazenado na Variable 1
```

### Uso Típico
- Mudar ícone baseado em classe
- Customizar ícone durante batalha
- Indicar estado especial (poison, haste, etc.)

---

## Actor: Change Field Gauge Face

### Descrição
Muda a face do marcador de um ou mais actors no Field Gauge.

### Plugin Command
```
Actor: Change Field Gauge Face
```

### Parâmetros

#### Actor ID(s)
- **Tipo**: Select
- **Descrição**: Seleciona quais actors são afetados
- **Opções**:
  - Actor 1, Actor 2, etc.
  - Multiple selection possível

#### Face Name
- **Tipo**: Text
- **Descrição**: Nome do arquivo de face
- **Localização**: `img/faces/`
- **Nota**: Não inclua extensão `.png`

#### Face Index
- **Tipo**: Number
- **Descrição**: Índice da face no arquivo
- **Valor**: 0 a 7

### Layout de Faces
```
Index: 0 1 2 3
       ─ ─ ─ ─
     0 │┌─┬─┬─┬─┐
     1 ││ │ │ │ │
     2 │├─┼─┼─┼─┤
     3 ││ │ │ │ │
     4 │├─┼─┼─┼─┤
     5 ││ │ │ │ │
     6 │├─┼─┼─┼─┤
     7 ││ │ │ │ │
       │└─┴─┴─┴─┘
```

### Exemplos de Evento

#### Single Actor
```
Plugin Command: Actor: Change Field Gauge Face
├─ Actor ID(s): Actor 1
├─ Face Name: Actor1
└─ Face Index: 0

# Resultado:
# Actor 1 mostra face (0,0) do arquivo Actor1.png
```

#### Mudar Face Baseado em Level
```
Conditional Branch: Actor 1 Level >= 10
  Plugin Command: Actor: Change Field Gauge Face
  ├─ Actor ID(s): Actor 1
  ├─ Face Name: Actor1_Upgrade
  └─ Face Index: 0
: Branch End

# Resultado:
# Level 10+ mostra face "upgrade"
```

#### Face Variável
```
Plugin Command: Actor: Change Field Gauge Face
├─ Actor ID(s): Actor 1
├─ Face Name: Variable[2]
└─ Face Index: Variable[3]

# Resultado:
# Face name e index armazenados em variables
```

### Uso Típico
- Customizar aparência do actor
- Mudar face ao upar de level
- Indicar transformações ou modo especial

---

## Actor: Clear Field Gauge Graphic

### Descrição
Limpa as customizações gráficas do Field Gauge de um ou mais actors, revertendo para configurações padrão.

### Plugin Command
```
Actor: Clear Field Gauge Graphic
```

### Parâmetros

#### Actor ID(s)
- **Tipo**: Select
- **Descrição**: Seleciona quais actors são afetados
- **Opções**:
  - Actor 1, Actor 2, etc.
  - Multiple selection possível

### Comportamento
- Remove customizações de **ícone** e **face**
- Reverte para **Plugin Parameters** defaults
- Não afeta outros actors

### Exemplos de Evento

#### Single Actor
```
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Actor 1

# Resultado:
# Actor 1 volta a usar ícone/face padrão
```

#### Todos os Actors
```
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Actor 1, Actor 2, Actor 3, Actor 4

# Resultado:
# Todos actors voltam ao padrão
```

#### Após Boss Battle
```
# Event: Após derrotar boss
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Entire Party

# Resultado:
# Party volta à aparência normal
```

### Uso Típico
- Resetar após battle events
- Limpar temporary buffs
- Reverter transformações

---

## Exemplos Práticos

### Sistema de Classes Visuais

```
# Event: Change Class to Warrior
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: 2  # Axe

# Event: Change Class to Mage
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: 3  # Staff

# Event: Reset Class
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Actor 1
```

### Indicador de Estado

```
# Event: Actor envenenado
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: 96  # Icon verde/veneno

# Event: Cura veneno
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Actor 1
```

### Transformação de Boss

```
# Event: Actor transforma (Super Mode)
Plugin Command: Actor: Change Field Gauge Face
├─ Actor ID(s): Actor 1
├─ Face Name: SuperMode
└─ Face Index: 0

# Event: Reverte transformação
Plugin Command: Actor: Clear Field Gauge Graphic
└─ Actor ID(s): Actor 1
```

---

## Consulte Também

- [Comandos Plugin: Enemies](inimigos.md) - Comandos para enemies
- [Comandos Plugin: Sistema](sistema.md) - Comandos de sistema
- [Notetags: Field Gauge](../notetags/field-gauge.md) - Customização estática
