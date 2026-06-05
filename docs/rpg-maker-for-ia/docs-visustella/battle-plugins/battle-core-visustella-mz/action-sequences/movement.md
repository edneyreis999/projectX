# Movement - Action Sequence

## Visão Geral
Action Sequences para controlar sprites de atores e inimigos em batalha (Sideview-only!).

## Comandos de Movimento

### MOVE: Battle Step
Faz unidades avançarem além de sua home position para preparar ação.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **Wait For Movement?**: Aguardar movimento?

**Exemplo:**
```
MOVE: Battle Step
  Targets: User
  Wait For Movement?: true
```

### MOVE: Move Distance
Move unidades por distância da posição atual.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **Distance Adjustment**: Ajuste de direção (Normal, Horizontal, Vertical, Both)
- **Distance X/Y**: Distância horizontal/vertical (pode usar JS)
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Movement Motion**: Motion para reproduzir durante movimento
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Move To JS Coordinates
Move unidades para coordenadas JS específicas.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **JS: Coordinates**: Código JS para determinar coordenadas
- **Offset X/Y**: Offset horizontal/vertical (pode usar JS)
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Move To Point
Move unidades para ponto específico da tela.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **Destination Point**: Ponto de destino (Home, Center, Point X,Y)
- **Offset X/Y**: Offset horizontal/vertical
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Move To Target(s)
Move unidades para outras unidades no campo de batalha.

**Parâmetros:**
- **Targets (Moving)**: Unidade(s) para mover
- **Targets (Destination)**: Unidade(s) para mover para
- **Target Location**: Parte do alvo (front/middle/back + head/center/base)
- **Melee Distance**: Distância melee adicional
- **Offset X/Y**: Offset horizontal/vertical
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

## Comandos de Home Position

### MOVE: Change Home By Distance
Altera home position por distância da posição atual.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar home
- **Distance Adjustment**: Ajuste de direção
- **Distance X/Y**: Distância horizontal/vertical (JS)
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Change Home To JS Coordinates
Altera home position para coordenadas JS.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar home
- **JS: Coordinates**: Código JS para coordenadas
- **Offset X/Y**: Offset horizontal/vertical
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Change Home To Point
Altera home position para ponto da tela.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar home
- **Destination Point**: Ponto de destino
- **Offset X/Y**: Offset horizontal/vertical
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Change Home To Target(s)
Move home position para outras unidades.

**Parâmetros:**
- **Targets (Moving)**: Unidade(s) para alterar home
- **Targets (Destination)**: Unidade(s) para alterar home para
- **Target Location**: Parte do alvo
- **Melee Distance**: Distância melee adicional
- **Offset X/Y**: Offset horizontal/vertical
- **Duration**: Duração em frames
- **Face Destination?**: Virar para destino?
- **Movement Easing**: Tipo de easing
- **Movement Motion**: Motion para reproduzir
- **Wait For Movement?**: Aguardar movimento?

### MOVE: Home Reset
Faz unidades retornarem à home position e direção originais.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **Wait For Movement?**: Aguardar movimento?

## Comandos de Direção/Facing

### MOVE: Face Direction
Faz unidades virarem para frente ou para trás.

**Parâmetros:**
- **Targets**: Unidade(s) para mudar direção
- **Direction**: Direção para virar (forward/backward)

### MOVE: Face JS Coordinates
Faz unidades virarem para coordenadas JS.

**Parâmetros:**
- **Targets**: Unidade(s) para mudar direção
- **JS: Coordinates**: Código JS para coordenadas
- **Face Away From?**: Virar para longe do ponto?

### MOVE: Face Point
Faz unidades virarem para ponto da tela.

**Parâmetros:**
- **Targets**: Unidade(s) para mudar direção
- **Point**: Ponto para virar (Home, Center, Point X,Y)
- **Face Away From?**: Virar para longe do ponto?

### MOVE: Face Target(s)
Faz unidades virarem para outros alvos.

**Parâmetros:**
- **Targets (facing)**: Unidade(s) para mudar direção
- **Targets (destination)**: Unidade(s) para virar para
- **Face Away From?**: Virar para longe da unidade?

## Comandos de Transformação

### MOVE: Float
Faz unidades flutuarem acima do chão.

**Parâmetros:**
- **Targets**: Unidade(s) para fazer flutuar
- **Desired Height**: Distância vertical para flutuar (JS)
- **Duration**: Duração em frames
- **Float Easing**: Tipo de easing
- **Wait For Float?**: Aguardar flutuação?

### MOVE: Jump
Faz unidades pularem no ar.

**Parâmetros:**
- **Targets**: Unidade(s) para fazer pular
- **Desired Height**: Altura máxima do pulo (JS)
- **Duration**: Duração em frames
- **Wait For Jump?**: Aguardar pulo?

### MOVE: Opacity
Faz unidades mudarem opacidade.

**Parâmetros:**
- **Targets**: Unidade(s) para mudar opacidade
- **Desired Opacity**: Valor de opacidade (JS)
- **Duration**: Duração em frames
- **Opacity Easing**: Tipo de easing
- **Wait For Opacity?**: Aguardar mudança?

### MOVE: Scale/Grow/Shrink
Faz unidades escalarem, crescerem ou encolherem.

**Parâmetros:**
- **Targets**: Unidade(s) para mudar escala
- **Scale X/Y**: Escala desejada (1.0 = normal)
- **Duration**: Duração em frames
- **Scale Easing**: Tipo de easing
- **Wait For Scale?**: Aguardar escala?

### MOVE: Skew/Distort
Faz units distorcerem (skew).

**Parâmetros:**
- **Targets**: Unidade(s) para distorcer
- **Skew X/Y**: Variância de skew (use valores pequenos)
- **Duration**: Duração em frames
- **Skew Easing**: Tipo de easing
- **Wait For Skew?**: Aguardar skew?

### MOVE: Spin/Rotate
Faz unidades girarem.

**Parâmetros:**
- **Targets**: Unidade(s) para girar
- **Angle**: Graus para girar
- **Duration**: Duração em frames
- **Spin Easing**: Tipo de easing
- **Revert Angle on Finish**: Reverter ângulo ao finalizar?
- **Wait For Spin?**: Aguardar giro?

## Comandos de Wait

### MOVE: Wait For Float
Aguarda flutuação completar.

### MOVE: Wait For Jump
Aguarda pulo completar.

### MOVE: Wait For Movement
Aguarda movimento completar.

### MOVE: Wait For Opacity
Aguarda mudança de opacidade completar.

### MOVE: Wait For Scale
Aguarda escala completar.

### MOVE: Wait For Skew
Aguarda skew completar.

### MOVE: Wait For Spin
Aguarda giro completar.

## Notas
- Todos os comandos são sideview-only!
- Distance Adjustment permite movimentos relativos (Horizontal/Vertical/Both)
- Home Position é a posição base da unidade
- Face commands controlam apenas direção visual
- Float/Jump criam movimentos verticais
- Scale/Spin/Skew permitem efeitos de transformação
- Opacity controla transparência
- Use Wait para sincronizar comandos subsequentes
- Easing cria movimentos suaves e naturais
