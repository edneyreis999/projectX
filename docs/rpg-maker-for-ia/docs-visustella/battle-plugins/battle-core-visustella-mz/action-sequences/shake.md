# Shake - Action Sequence

## Visão Geral
Action Sequences para controlar efeitos de shake (tremor) na batalha.

**Nota:** O documento Battle Core não possui uma seção específica "Action Sequences - Shake". Efeitos de shake podem ser criados usando plugins adicionais ou comandos de evento do RPG Maker.

## Alternativas para Shake

### Usar Shockwave (Impact)
```
IMPACT: Shockwave at Point
  Point X: Graphics.boxWidth / 2
  Point Y: Graphics.boxHeight / 2
  Amplitude: 20
  Wavelength: 100
  Duration: 60
```

### Usar Screen Shake do RPG Maker
Em eventos comuns, use o comando de evento "Shake Screen" do RPG Maker Maker.

### Motion Blur com Movimento Rápido
```
MOVE: Move Distance
  Targets: User
  Distance X: 10
  Distance Y: 10
  Duration: 5
  Movement Motion: walk
```

## Notas
- Para efeitos de shake específicos, considere plugins adicionais
- Battle Core foca em movimentos de battlers, não shake de tela
- Plugins VisuStella relacionados:
  - VisuMZ_3_ActSeqImpact (shockwaves, motion blur)
  - VisuMZ_0_CoreEngine (easing para movimentos suaves)

## Veja Também
- `impact.md` - Efeitos de impacto incluindo shockwaves
- `movement.md` - Comandos de movimento
- `camera.md` - Controle de câmera de batalha
