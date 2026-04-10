# Wait - Action Sequence

## Visão Geral
Action Sequences para controle de tempo e sincronização durante batalha.

## Comandos de Wait Disponíveis

### Wait Por Animação
```
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true
```

### Wait Por Movimento
```
MOVE: Move Distance
  Targets: User
  Distance X: 100
  Wait For Movement?: true
```

### Wait Por Opacidade
```
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Wait For Opacity?: true
```

### Wait Por Scale
```
MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 2.0
  Scale Y: 2.0
  Wait For Scale?: true
```

### Wait Por Float
```
MOVE: Float
  Targets: User
  Desired Height: 50
  Wait For Float?: true
```

### Wait Por Jump
```
MOVE: Jump
  Targets: User
  Desired Height: 100
  Wait For Jump?: true
```

### Wait Por Spin
```
MOVE: Spin/Rotate
  Targets: User
  Angle: 360
  Wait For Spin?: true
```

### Wait Por Skew
```
MOVE: Skew/Distort
  Targets: User
  Skew X: 0.2
  Wait For Skew?: true
```

### Wait Por Battle Log
```
BTLOG: Wait For Battle Log
```

```
BTLOG: Wait For New Line
```

### Wait Por Camera
```
CAMERA: Focus Target(s)
  Targets: User
  Wait For Camera?: true
```

```
CAMERA: Wait For Camera
```

### Wait Por Angle
```
ANGLE: Change Angle
  Angle: 45
  Wait For Angle?: true
```

```
ANGLE: Wait For Angle
```

### Wait Por Effect
```
MECH: Wait For Effect
```

### Wait Por Motion Frame
```
MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 10
```

### Wait Por Injected Animation
```
INJECT: Wait For Injected Animation
```

## Wait Por Tempo (Frames)

### Wait Implícito com Duration
```
MOVE: Move Distance
  Targets: User
  Distance X: 100
  Duration: 60  # 60 frames = 1 segundo
  Wait For Movement?: true
```

### Time Stop (Plugin Impact)
```
IMPACT: Time Stop
  Milliseconds: 500  # 500ms = 0.5 segundos
```

## Valores de Tempo Comuns

| Frames | Segundos (60fps) | Caso de Uso |
|--------|------------------|-------------|
| 10 | 0.17s | Pausa muito breve |
| 20 | 0.33s | Pausa curta |
| 30 | 0.5s | Meio segundo |
| 60 | 1.0s | Um segundo |
| 90 | 1.5s | Um segundo e meio |
| 120 | 2.0s | Dois segundos |

## Casos de Uso

### Sequência Perfeitamente Sincronizada
```
# Mover até alvo
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 45
  Wait For Movement?: true

# Atacar instantaneamente após chegar
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true

# Aplicar dano
MECH: Action Effect
  Targets: Target

# Voltar
MOVE: Home Reset
  Targets: User
  Wait For Movement?: true
```

### Animações Sobrepostas
```
# Iniciar movimento (sem wait)
MOVE: Move Distance
  Targets: User
  Distance X: 100
  Duration: 60
  Wait For Movement?: false

# Animação roda em paralelo
ANIM: Show Animation
  Targets: User
  Animation ID: 5
  Wait For Animation?: false

# Aguardar ambos completarem
MOVE: Wait For Movement
ANIM: Wait For Animation
```

### Timming Preciso de Impact
```
# Movimento de ataque
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 30
  Wait For Movement?: true

# Animação atinge exatamente no momento certo
ANIM: Show Animation
  Targets: Target
  Animation ID: 10
  Wait For Animation?: true

# Dano no frame exato de impacto
MECH: Action Effect
  Targets: Target
```

### Cena Dramática Com Pausas
```
# Primeiro golpe
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true

# Pausa dramática
MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 20

# Segundo golpe
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true

# Pausa longer
MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 40

# Finalizador
ANIM: Show Animation
  Targets: Target
  Animation ID: 100
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target
```

### Efeito Enquanto Aguarda
```
# Iniciar efeito visual (sem wait)
IMPACT: Motion Trail Create
  Targets: User
  Duration: 120

# Fazer algo enquanto rastro aparece
MOVE: Move Distance
  Targets: User
  Distance X: 200
  Duration: 60
  Wait For Movement?: true

# Rastro continua...
```

## Boas Práticas

### Use Wait Para Sincronizar
```
# Ruim - pode ficar desincronizado
MOVE: Move Distance
  Duration: 30
  Wait For Movement?: false

ANIM: Show Animation  # Pode rodar antes do movimento terminar!

# Bom - sempre sincronizado
MOVE: Move Distance
  Duration: 30
  Wait For Movement?: true

ANIM: Show Animation  # Só roda após movimento completar
```

### Wait Apropriado Para Cada Ação
```
# Longa duração = wait mais longo
MOVE: Float
  Desired Height: 100
  Duration: 90
  Wait For Float?: true

# Curta duração = wait mais curto
MOVE: Opacity
  Desired Opacity: 0
  Duration: 15
  Wait For Opacity?: true
```

### Múltiplos Wait em Paralelo
```
# Se necessário aguardar múltiplas coisas
MOVE: Wait For Float
MOVE: Wait For Opacity

# Ou use wait do movimento mais longo
MOVE: Float
  Duration: 90
  Wait For Float?: true
```

## Tipos de Wait

| Tipo | Quando Usar | Exemplo |
|------|-------------|---------|
| Wait For Animation | Animação deve completar antes de próximo passo | Atacar → Dano |
| Wait For Movement | Movimento deve completar | Mover → Atacar |
| Wait For Effect | Efeito visual deve completar | Shockwave → Próximo ação |
| Wait By Motion Frame | Pausa relativa a velocidade de animação | Pausa dramática |
| Wait For Camera | Câmera deve chegar ao destino | Focus → Ação |
| Wait For X (Opacity/Scale/etc) | Transição visual deve completar | Fade out → Aparecer |

## Notas
- Wait garante que ações ocorram na ordem correta
- Sem wait, ações rodam em paralelo
- Use wait para sincronizar sequências complexas
- Motion Frame Wait é relativo à velocidade de animação
- Time Stop cria pausa absoluta em milissegundos
- Múltiplos waits podem ser usados sequencialmente
- Considere duração ao decidir entre wait ou paralelo

## Veja Também
- `time.md` - Controle de tempo e manipulação temporal
- `animacoes.md` - Animações com wait
- `movement.md` - Movimentos com wait
- `camera.md` - Controle de câmera com wait
- `mechanics.md` - Wait For Effect
