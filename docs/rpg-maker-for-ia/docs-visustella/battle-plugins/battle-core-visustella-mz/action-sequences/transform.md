# Transform - Action Sequence

## Visão Geral
Action Sequences para transformação de battlers durante batalha.

**Nota:** O documento Battle Core não possui uma seção específica "Action Sequences - Transform". Transformações são geralmente feitas através de:

1. States (no Database) que alteram gráficos
2. Plugins específicos de transformação
3. Comandos relacionados

## Alternativas para Transformação

### Usar States com Gráficos Diferentes
Configure um State no Database para mudar o battler graphic:

**No Database:**
- Crie um State (ex: "Transformed")
- Nas configurações do State, altere o Battler Image

**Na Action Sequence:**
```
MECH: Add State
  Targets: User
  States: 10 (Transformed)
```

### Usar Grid System para Posição
**Requer VisuMZ_2_BattleGridSystem!**
```
GRID: Move Target(s) In Direction
  Targets: User
  Movement Type: Normal
  Direction: Forward
  Distance: 2
  Duration: 30
```

### Usar Movement para Escala/Transformação Visual
```
MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 1.5
  Scale Y: 1.5
  Duration: 30

MOVE: Spin/Rotate
  Targets: User
  Angle: 360
  Duration: 60

MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 1.0
  Scale Y: 1.0
  Duration: 30
```

### Horror Effects para Transformação Assustadora
**Requer VisuMZ_2_HorrorEffects!**
```
HORROR: Glitch Create
  Targets: User
  Glitch Animated?: true
  Glitch Strength: 5

# Após transformação
HORROR: Glitch Remove
  Targets: User
```

## Casos de Uso

### Transformação com Crescimento
```
# Crescer
MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 2.0
  Scale Y: 2.0
  Duration: 60
  Wait For Scale?: true

# Aplicar state transformado
MECH: Add State
  Targets: User
  States: 10

# Atacar com nova forma
ANIM: Show Animation
  Targets: Target
  Animation ID: 100
```

### Transformação com Glitch
```
# Efeito de transformação digital
HORROR: Glitch Create
  Targets: User
  Glitch Animated?: true
  Glitch Frequency: 3
  Glitch Strength: 8

# Mudar para forma transformada
MECH: Add State
  Targets: User
  States: 20

# Limpar glitch
HORROR: Glitch Remove
  Targets: User
```

### Transformação Temporária
```
# Transformar
MECH: Add State
  Targets: User
  States: 15

MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 1.5
  Scale Y: 1.5
  Duration: 20

# Atacar
MECH: Action Effect
  Targets: Target

# Reverter
MECH: Remove State
  Targets: User
  States: 15

MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 1.0
  Scale Y: 1.0
  Duration: 20
```

## Transformação Através de Plugins

### VisuMZ_1_ElementStatusCore
States podem alterar elementos e resistências

### VisuMZ_2_BattleGridSystem
Mudança de posição no grid

### VisuMZ_2_HorrorEffects
Efeitos visuais de horror

### VisuMZ_3_ActSeqImpact
Efeitos de impacto visual

### Plugins de Transformação
Verifique plugins VisuStella específicos para:
- Transformação de monstros
- Mudança de classe em batalha
- Alternância de battlers

## Notas
- Battle Core foca em mecânicas core, não transformação direta
- Use States para transformações permanentes/temporárias
- Scale/Grow/Shrink cria efeitos visuais de crescimento
- Glitch effects adicionam aspecto supernatural
- Para transformações complexas, considere plugins adicionais
- Sempre reverter efeitos visuais após transformação temporária

## Veja Também
- `mechanics.md` - Add/Remove State
- `movement.md` - Scale/Grow/Shrink, Spin/Rotate
- `horror-effects.md` - Efeitos de glitch/horror
- `state.md` - Controle de states
- `grid.md` - Sistema de Grid para posicionamento
