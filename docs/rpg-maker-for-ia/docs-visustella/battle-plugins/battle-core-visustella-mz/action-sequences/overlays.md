# Overlays - Action Sequence

## Visão Geral
Action Sequences para controlar overlays e efeitos visuais sobre battlers.

**Nota:** O documento Battle Core não possui uma seção específica "Action Sequences - Overlays". Overlays podem ser criados usando combinações de outros comandos como:
- Pictures (mostrando imagens sobre battlers)
- Animations (animações sobre battlers)
- Impact effects (efeitos visuais de impacto)

## Alternativas para Overlays

### Usando Pictures
Mostre imagens sobre battlers usando comandos de Picture do RPG Maker Maker em conjunto com Action Sequences.

### Usando Animations
```
ANIM: Show Animation
  Targets: User
  Animation ID: 10
  Mirror Animation: false
  Wait For Animation?: false
```

### Usando Horror Effects
```
HORROR: Glitch Create
  Targets: User
  Glitch Animated?: true
```

### Usando Impact Effects
```
IMPACT: Motion Trail Create
  Targets: User
  Duration: 60
```

## Notas
- Para efeitos de overlay específicos, consulte plugins adicionais do VisuStella
- Battle Core foca em movimentos, animações e mecânicas core
- Overlays avançados podem requerer plugins como:
  - VisuMZ_3_ActSeqImpact (efeitos visuais)
  - VisuMZ_2_HorrorEffects (efeitos de horror)
  - VisuMZ_3_ActSeqProjectiles (projéteis)

## Veja Tambão
- `animacoes.md` - Comandos de animação
- `horror-effects.md` - Efeitos de horror
- `impact.md` - Efeitos de impacto visual
- `inject.md` - Injeção de animações customizadas
