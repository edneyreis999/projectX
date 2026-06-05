# Comandos Plugin: Inimigos (Enemy Plugin Commands)

## Overview

Comandos de plugin para modificar dinamicamente as configurações do Field Gauge para **inimigos** durante eventos.

---

## Enemy: Change Field Gauge Icon

### Descrição
Muda o ícone do marcador de um ou mais inimigos no Field Gauge.

### Plugin Command
```
Enemy: Change Field Gauge Icon
```

### Parâmetros

#### Enemy Index(es)
- **Tipo**: Select
- **Descrição**: Seleciona quais inimigos são afetados
- **Opções**:
  - 1st Enemy, 2nd Enemy, 3rd Enemy, etc.
  - Multiple selection possível
- **Nota**: Index baseia-se na ordem de aparição (não enemy ID)

#### Icon
- **Tipo**: Number
- **Descrição**: Índice do ícone no IconSet
- **Valor**: 0 a N (depende do IconSet)

### Index vs ID

#### Enemy Index
- Posição na batalha (1st, 2nd, 3rd...)
- Muda a cada battle
- Usado em plugin commands

#### Enemy ID
- Identificador único do enemy
- Define o database entry
- Usado em notetags

### Exemplos de Evento

#### Single Enemy
```
Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 1st Enemy
└─ Icon: 98

# Resultado:
# Primeiro inimigo mostra ícone 98 (Demon)
```

#### Multiple Enemies
```
Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 1st Enemy, 2nd Enemy, 3rd Enemy
└─ Icon: 96

# Resultado:
# Primeiros 3 inimigos mostram ícone 96 (Monster)
```

#### Todos Enemies
```
Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 1st Enemy through 8th Enemy
└─ Icon: 97

# Resultado:
# Todos os 8 inimigos mostram ícone 97 (Ghost)
```

### Uso Típico
- Indicar estado especial (enraged, poisoned)
- Diferenciar enemies de mesmo tipo
- Marcar targets para attacks

---

## Enemy: Change Field Gauge Face

### Descrição
Muda a face do marcador de um ou mais inimigos no Field Gauge.

### Plugin Command
```
Enemy: Change Field Gauge Face
```

### Parâmetros

#### Enemy Index(es)
- **Tipo**: Select
- **Descrição**: Seleciona quais inimigos são afetados
- **Opções**:
  - 1st Enemy, 2nd Enemy, 3rd Enemy, etc.
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

### Exemplos de Evento

#### Single Enemy
```
Plugin Command: Enemy: Change Field Gauge Face
├─ Enemy Index(es): 1st Enemy
├─ Face Name: Monster
└─ Face Index: 3

# Resultado:
# Primeiro inimigo mostra face (0,3) de Monster.png
```

#### Boss Transformation
```
# Event: Boss enfurecido (50% HP)
Conditional Branch: 1st Enemy HP <= 50%
  Plugin Command: Enemy: Change Field Gauge Face
  ├─ Enemy Index(es): 1st Enemy
  ├─ Face Name: BossEnraged
  └─ Face Index: 0
: Branch End

# Resultado:
# Boss muda face quando HP <= 50%
```

#### Indicador de Target
```
# Event: Marcar enemy com "!"
Plugin Command: Enemy: Change Field Gauge Face
├─ Enemy Index(es): 1st Enemy
├─ Face Name: TargetMarker
└─ Face Index: 5  # Face com "!"

# Resultado:
# Enemy marcado visualmente
```

### Uso Típico
- Transformações de boss
- Indicar estado (poison, sleep, etc.)
- Marcar targets para party

---

## Enemy: Clear Field Gauge Graphic

### Descrição
Limpa as customizações gráficas do Field Gauge de um ou mais inimigos, revertendo para configurações padrão.

### Plugin Command
```
Enemy: Clear Field Gauge Graphic
```

### Parâmetros

#### Enemy Index(es)
- **Tipo**: Select
- **Descrição**: Seleciona quais inimigos são afetados
- **Opções**:
  - 1st Enemy, 2nd Enemy, 3rd Enemy, etc.
  - Multiple selection possível

### Comportamento
- Remove customizações de **ícone** e **face**
- Reverte para **Plugin Parameters** defaults
- Não afeta outros inimigos

### Exemplos de Evento

#### Single Enemy
```
Plugin Command: Enemy: Clear Field Gauge Graphic
└─ Enemy Index(es): 1st Enemy

# Resultado:
# Primeiro inimigo volta ao padrão
```

#### Todos Enemies
```
Plugin Command: Enemy: Clear Field Gauge Graphic
└─ Enemy Index(es: 1st Enemy through 8th Enemy

# Resultado:
# Todos inimigos voltam ao padrão
```

#### Após State Cure
```
# Event: Enemy curado de poison
Plugin Command: Enemy: Clear Field Gauge Graphic
└─ Enemy Index(es): 1st Enemy

# Resultado:
# Enemy volta ao ícone/face normal
```

---

## Diferenças: Actor vs Enemy Commands

### Actor Commands
- Usam **Actor ID** (fixo)
- Actor 1 é sempre Actor 1

### Enemy Commands
- Usam **Enemy Index** (dinâmico)
- 1st Enemy muda a cada battle

### Exemplo

```
# Actor: Sempre Actor 1
Plugin Command: Actor: Change Field Gauge Icon
├─ Actor ID(s): Actor 1
└─ Icon: 5

# Enemy: Primeiro inimigo da battle atual
Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 1st Enemy
└─ Icon: 96
```

---

## Exemplos Práticos

### Sistema de Target

```
# Event: Player seleciona target
# (Armazena target em Variable 1)

Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): Variable[1]
└─ Icon: 99  # Ícone de target (X)

# Event: Attack executado
Plugin Command: Enemy: Clear Field Gauge Graphic
└─ Enemy Index(es): Variable[1]

# Resultado:
# Enemy é marcado, attack acontece, marca é removida
```

### Boss Enraged

```
# Event: Troop Page 2 (Condition: Boss HP <= 50%)

Plugin Command: Enemy: Change Field Gauge Face
├─ Enemy Index(es): 1st Enemy
├─ Face Name: BossEnraged
└─ Face Index: 0

# Resultado:
# Boss muda face quando enfurecido
```

### Indicador de Status

```
# Event: Enemy poisoned
Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 1st Enemy
└─ Icon: 80  # Ícone verde/veneno

# Event: Poison cured
Plugin Command: Enemy: Clear Field Gauge Graphic
└─ Enemy Index(es): 1st Enemy

# Resultado:
# Ícone muda para indicar poison, volta ao normal quando curado
```

### Summon System

```
# Event: Enemy summona ally
# (Novo enemy aparece como 4th Enemy)

Plugin Command: Enemy: Change Field Gauge Icon
├─ Enemy Index(es): 4th Enemy
└─ Icon: 97  # Ghost

Plugin Command: Enemy: Change Field Gauge Face
├─ Enemy Index(es): 4th Enemy
├─ Face Name: SummonFace
└─ Face Index: 0

# Resultado:
# Summon tem ícone/face distinta
```

---

## Consulte Também

- [Comandos Plugin: Atores](atores.md) - Comandos para actors
- [Comandos Plugin: Sistema](sistema.md) - Comandos de sistema
- [Notetags: Field Gauge](../notetags/field-gauge.md) - Customização estática
