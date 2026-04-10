# Time - Action Sequence

## Visão Geral
Action Sequences para controle de tempo e manipulação temporal durante batalha.

**Nota:** A maioria dos comandos de tempo está integrada na seção Impact do Battle Core.

## Comandos Disponíveis

### IMPACT: Time Scale
Ajusta tempo para ficar mais rápido ou lento!
Criado por Manu Gaming!
**Requer VisuMZ_3_ActSeqImpact!**

**Parâmetros:**
- **Scale**: Escala de tempo
  - 1.00 = normal
  - Menor que 1.00 = mais lento (ex: 0.5 = metade da velocidade)
  - Maior que 1.00 = mais rápido (ex: 2.0 = dobro da velocidade)

**Exemplo:**
```
IMPACT: Time Scale
  Scale: 0.5
```

### IMPACT: Time Stop
Para o tempo por uma quantidade específica de milissegundos.
Criado por Manu Gaming!
**Requer VisuMZ_3_ActSeqImpact!**

**Parâmetros:**
- **Milliseconds**: Milissegundos para parar o tempo
  - 1000ms = 1 segundo
  - 500ms = 0.5 segundos
  - 100ms = 0.1 segundos

**Exemplo:**
```
IMPACT: Time Stop
  Milliseconds: 500
```

## Comandos de Wait

### Wait Por Frames
Vários comandos têm parâmetros "Wait For..." que aguardam completion:

```
MOVE: Move Distance
  Targets: User
  Wait For Movement?: true

ANIM: Show Animation
  Targets: Target
  Wait For Animation?: true

MECH: Wait For Effect
```

### Wait Por Motion Frames
```
MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 10
```

## Casos de Uso

### Slow Motion Attack
```
# Desacelerar tempo
IMPACT: Time Scale
  Scale: 0.3

# Executar ataque em slow motion
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 120
  Wait For Movement?: true

ANIM: Show Animation
  Targets: Target
  Animation ID: 50
  Wait For Animation?: true

# Restaurar velocidade normal
IMPACT: Time Scale
  Scale: 1.0
```

### Time Stop Effect
```
# Ataque poderoso
ANIM: Show Animation
  Targets: User
  Animation ID: 100
  Wait For Animation?: true

# Parar tempo dramaticamente
IMPACT: Time Stop
  Milliseconds: 1000

# Retomar com impacto
IMPACT: Shockwave from Target(s) Center
  Targets: Target
  Amplitude: 30
  Wavelength: 100
  Duration: 60
```

### Fast Forward Combo
```
# Acelerar para combo rápido
IMPACT: Time Scale
  Scale: 2.0

# Múltiplos ataques rápidos
ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: false

ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: false

ANIM: Attack Animation
  Targets: Target
  Wait For Animation?: false

# Restaurar normal
IMPACT: Time Scale
  Scale: 1.0
```

## Valores de Tempo Comuns

| Milissegundos | Segundos | Caso de Uso |
|--------------|----------|-------------|
| 100 | 0.1s | Pausa muito breve |
| 250 | 0.25s | Pausa curta |
| 500 | 0.5s | Pausa média |
| 1000 | 1.0s | Pausa longa |
| 2000 | 2.0s | Pausa muito longa |

## Valores de Scale Comuns

| Scale | Efeito | Caso de Uso |
|-------|--------|-------------|
| 0.1 | Extremamente lento | Dramatização máxima |
| 0.25 | Muito lento | Câmera lenta |
| 0.5 | Lento | Slow motion |
| 1.0 | Normal | Velocidade padrão |
| 1.5 | Rápido | Acelerado |
| 2.0 | Muito rápido | Combo rápido |
| 3.0+ | Extremamente rápido | Hyper mode |

## Notas
- Time Scale afeta toda a batalha (animações, movimentos, etc.)
- Time Stop congela tudo momentaneamente
- Use para criar efeitos dramáticos e cinematográficos
- Time Stop é ideal para momentos de impacto máximo
- Time Scale pode criar slow motion ou hyper speed
- Combina bem com outros efeitos de Impact (shockwave, blur, etc.)
- Lembre de restaurar Scale para 1.0 após modificar

## Veja Também
- `impact.md` - Documentação completa de efeitos de impacto
- `animacoes.md` - Animações que podem ter wait
- `movement.md` - Movimentos que podem ter wait
- `wait.md` - Comandos específicos de espera
