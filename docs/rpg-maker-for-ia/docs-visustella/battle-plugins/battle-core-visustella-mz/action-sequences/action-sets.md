# Action Sets - Action Sequence

## Visão Geral
Action Sets são coleções organizadas de Action Sequences que definem como uma skill ou item se comporta durante a batalha.

## Estrutura de Action Set

### Action Sequence Steps
Um Action Set consiste de múltiplos "steps" executados em ordem:

1. **Setup Steps** - Preparação inicial
2. **Whole Action** - Ações que afetam toda a ação
3. **Target Action** - Ações repetidas para cada alvo
4. **Follow Actions** - Ações após conclusão

### Tipos de Action Sequence

#### Action Sequence
Usa `<Direct>` ou seus aliases para definir sequência completa.

```
<Direct>
ANIM: Action Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target
</Direct>
```

#### Target Action Sequence
Define ações executadas para cada alvo individualmente.

```
<Target Action>
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target
</Target Action>
```

#### Whole Action Sequence
Define ações executadas uma vez para toda a ação.

```
<Whole Action>
ANIM: Cast Animation
  Targets: User
  Wait For Animation?: true
</Whole Action>
```

#### Setup Actions
Define ações de preparação antes da execução.

```
<Setup Actions>
MOVE: Battle Step
  Targets: User
  Wait For Movement?: true
</Setup Actions>
```

#### Follow Actions
Define ações após conclusão dos efeitos.

```
<Follow Actions>
MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Follow Actions>
```

## Exemplos Completos

### Skill de Ataque Simples
```
<Direct>
MOVE: Battle Step
  Targets: User
  Wait For Movement?: true

ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Direct>
```

### Skill Mágica com Cast
```
<Setup Actions>
MOVE: Float
  Targets: User
  Desired Height: 50
  Wait For Float?: true
</Setup Actions>

<Whole Action>
ANIM: Cast Animation
  Targets: User
  Wait For Animation?: true
</Whole Action>

<Target Action>
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 30
  Wait For Movement?: true

ANIM: Show Animation
  Targets: Target
  Animation ID: 50
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target
</Target Action>

<Follow Actions>
MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Follow Actions>
```

### Skill de Area com Efeito Visual
```
<Direct>
ANIM: Cast Animation
  Targets: User
  Wait For Animation?: true

IMPACT: Shockwave at Point
  Point X: Graphics.boxWidth / 2
  Point Y: Graphics.boxHeight / 2
  Amplitude: 20
  Duration: 60

ANIM: Show Animation
  Targets: Target
  Animation ID: 100
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target
</Direct>
```

### Skill com Multi-Attack
```
<Direct>
MOVE: Battle Step
  Targets: User
  Wait For Movement?: true

ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOVE: Wait For Movement

ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Direct>
```

### Ultimate Skill com Cutin
```
<Direct>
BTLOG: UI Show/Hide
  Show/Hide?: Hide

CUTIN: Add Visual Cutin Effect
  Cutin Style Type: Default
  Portrait Target: User
  Wait for Entrance: true

ANIM: Show Animation
  Targets: User
  Animation ID: 200
  Wait For Animation?: true

MOVE: Float
  Targets: User
  Desired Height: 100
  Duration: 60
  Wait For Float?: true

ANIM: Show Animation
  Targets: All Enemies
  Animation ID: 201
  Wait For Animation?: true

MECH: Action Effect
  Targets: All Enemies

CUTIN: End Visual Cutin Effect (All)
  Wait for Exit: true

BTLOG: UI Show/Hide
  Show/Hide?: Show
</Direct>
```

## Ordem de Execução

### Sequência Típica
```
1. Setup Actions
   ↓
2. Whole Action
   ↓
3. Target Action (para cada alvo)
   ↓
4. Follow Actions
```

### Exemplo com Flow
```
<Setup Actions>
# 1. Preparar
MOVE: Float
  Targets: User
  Desired Height: 30
</Setup Actions>

<Whole Action>
# 2. Uma vez antes de atacar
ANIM: Cast Animation
  Targets: User
</Whole Action>

<Target Action>
# 3. Para cada alvo:
ANIM: Show Animation
  Targets: Target
MECH: Action Effect
  Targets: Target
</Target Action>

<Follow Actions>
# 4. Depois de todos alvos
MOVE: Home Reset
  Targets: User
</Follow Actions>
```

## Notetags vs. Action Sequences

### Notetags no Database
Usadas em Skills/Items no Database:

```
<Setup Actions>
MOVE: Float
  Targets: User
  Desired Height: 50
</Setup Actions>

<Target Action>
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
</Target Action>

<Follow Actions>
MOVE: Home Reset
  Targets: User
</Follow Actions>
```

### Action Sequence em Common Event
Usada em Common Events chamados pela skill:

```
# Common Event ID 1
MOVE: Float
  Targets: User
  Desired Height: 50

ANIM: Show Animation
  Targets: Target
  Animation ID: 1

MECH: Action Effect
  Targets: Target

MOVE: Home Reset
  Targets: User
```

## Melhores Práticas

### 1. Use Wait Para Sincronizar
```
<Direct>
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Wait For Movement?: true  # Importante!

ANIM: Show Animation
  Targets: Target
  Wait For Animation?: true  # Importante!
</Direct>
```

### 2. Limpe Efeitos Após Uso
```
<Direct>
MOVE: Float
  Targets: User
  Desired Height: 50

# ... ação ...

MOVE: Float
  Targets: User
  Desired Height: 0  # Limpar
</Direct>
```

### 3. Home Reset Para Retornar
```
<Follow Actions>
MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Follow Actions>
```

### 4. Consider Feedback Visual
```
<Target Action>
ANIM: Show Animation
  Targets: Target

MECH: Damage Popup
  Targets: Target

MECH: Action Effect
  Targets: Target
</Target Action>
```

## Casos de Uso Especiais

### Habilidades com Charge Time
```
<Setup Actions>
MOVE: Float
  Targets: User
  Desired Height: 100

ANIM: Cast Animation
  Targets: User
</Setup Actions>

<Target Action>
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target

ANIM: Show Animation
  Targets: Target
  Animation ID: 50
</Target Action>
```

### Habilidades com Retorno
```
<Direct>
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Wait For Movement?: true

ANIM: Show Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
</Direct>
```

### Habilidades de Buff/Debuff
```
<Direct>
ANIM: Show Animation
  Targets: User
  Animation ID: 10
  Wait For Animation?: true

MECH: Add Buff/Debuff
  Targets: User
  Buff Parameters: ATK

MECH: Text Popup
  Targets: User
  Text: Attack Up!
</Direct>
```

## Notas
- Action Sets definem comportamento completo de skills/items
- Use notetags no Database ou Common Events
- Setup Actions preparam antes da execução
- Whole Action executa uma vez para todos alvos
- Target Action executa para cada alvo individualmente
- Follow Actions limpam após conclusão
- Sempre use Wait para sincronizar ações
- Consolide efeitos similares para melhor performance

## Veja Também
- `mechanics.md` - Comandos de mecânica de batalha
- `animacoes.md` - Comandos de animação
- `movement.md` - Comandos de movimento
- `notetags.md` - Notetags para Action Sequences
- Documentação Battle Core - Sintaxe completa de Action Sequences
