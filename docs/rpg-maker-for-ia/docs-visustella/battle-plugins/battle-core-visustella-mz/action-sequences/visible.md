# Visible - Action Sequence

## Visão Geral
Action Sequences para controlar visibilidade de battlers durante batalha.

**Nota:** Controle de visibilidade é geralmente feito através do comando Opacity na seção Movement.

## Comando Principal

### MOVE: Opacity
Faz unidades mudarem opacidade, controlando visibilidade.
**Este comando está detalhado em `opacity.md` e `movement.md`**

**Parâmetros:**
- **Targets**: Unidade(s) para mudar opacidade
- **Desired Opacity**: Valor de opacidade (pode usar JavaScript)
  - **255** = totalmente visível (padrão)
  - **0** = invisível
  - **1-254** = níveis variados de transparência
- **Duration**: Duração em frames para mudança
- **Opacity Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Wait For Opacity?**: Aguardar mudança completar?

**Exemplo:**
```
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 30
  Opacity Easing: Ease In
  Wait For Opacity?: true
```

## Casos de Uso

### Desaparecer (Invisibilidade)
```
# Fazer battler desaparecer
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 30
  Wait For Opacity?: true

# Mover-se invisivelmente
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 45

# Reaparecer
MOVE: Opacity
  Targets: User
  Desired Opacity: 255
  Duration: 30
  Wait For Opacity?: true
```

### Aparecer (Summon/Entrance)
```
# Começar invisível
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 0
  Wait For Opacity?: false

# Aparecer dramaticamente
ANIM: Show Animation
  Targets: User
  Animation ID: 50

MOVE: Opacity
  Targets: User
  Desired Opacity: 255
  Duration: 60
  Opacity Easing: Ease Out
  Wait For Opacity?: true
```

### Fantasma/Transparência
```
# Ficar semi-transparente
MOVE: Opacity
  Targets: User
  Desired Opacity: 128
  Duration: 20
  Wait For Opacity?: false

# Estado fantasma ativo
MECH: Add State
  Targets: User
  States: 15

# ... combate ...

# Restaurar opacidade
MOVE: Opacity
  Targets: User
  Desired Opacity: 255
  Duration: 20
```

### Fade Out/In Durante Ataque
```
# Fade out
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 20

# Teleportar (mover instantaneamente)
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 0

# Fade in
MOVE: Opacity
  Targets: User
  Desired Opacity: 255
  Duration: 20

# Atacar
ANIM: Show Animation
  Targets: Target
  Animation ID: 100
```

## Níveis de Opacidade Comuns

| Opacidade | Efeito Visual | Caso de Uso |
|-----------|--------------|-------------|
| 0 | Invisível | Habilidade furtiva, teleport |
| 64 | Muito transparente | Fantasma, evasão |
| 128 | Semi-transparente | Escudo, proteção |
| 192 | Levemente transparente | Estado sutil |
| 255 | Totalmente visível | Normal (padrão) |

## Combinação com Outros Efeitos

### Opacity + Scale
```
# Encolher e desaparecer
MOVE: Scale/Grow/Shrink
  Targets: User
  Scale X: 0.1
  Scale Y: 0.1
  Duration: 45

MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 45
```

### Opacity + Motion Blur
```
# Desaparecer com rastro
IMPACT: Motion Trail Create
  Targets: User
  Duration: 60

MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 60
```

### Opacity + Animation
```
# Animação de desaparecimento
ANIM: Show Animation
  Targets: User
  Animation ID: 80

MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 30
  Wait For Opacity?: true
```

## Notas
- Opacity controla transparência, não sprite ativo
- Opacity 0 = invisível mas ainda presente
- Opacity 255 = totalmente visível
- Duração 0 = mudança instantânea
- Use easing para transições suaves
- Combina com outros efeitos visuais
- Lembre de restaurar visibilidade quando apropriado

## Diferença: Opacity vs. Hidden

| Aspecto | Opacity: 0 | Hidden/Inativo |
|---------|------------|---------------|
| Visível | Não | Não |
| Presente | Sim | Depende |
| Atingível | Sim | Não |
| Colisão | Sim | Não |
| Animações | Rodam | Não rodam |

## Veja Tambão
- `opacity.md` - Documentação detalhada de opacidade
- `movement.md` - Outros comandos de movimento
- `inject.md` - Injeção de animações customizadas
- `horror-effects.md` - Efeitos de horror (glitch, etc.)
