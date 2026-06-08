# Referencia Rapida - Action Sequence Camera Core

Todos os 15 comandos Action Sequence disponiveis neste plugin.

## ANGLE

| Comando | Acao | Parametros Principais |
|---------|------|-----------------------|
| ANGLE: Change Angle | Muda angulo da camera | Angle, Duration, Easing, Wait |
| ANGLE: Reset Angle | Reseta angulo | Duration, Easing, Wait |
| ANGLE: Wait For Angle | Espera completar | (nenhum) |

## CAMERA

| Comando | Acao | Parametros Principais |
|---------|------|-----------------------|
| CAMERA: Clamp ON/OFF | Liga/desliga clamping | Setting |
| CAMERA: Focus Point | Foca em coordenada | X, Y, Duration, Easing, Wait |
| CAMERA: Focus Target(s) | Foca em alvo(s) | Targets, Duration, Easing, Wait |
| CAMERA: Offset | Desloca camera | Offset X, Offset Y, Duration, Easing, Wait |
| CAMERA: Reset | Reseta camera | Reset Focus?, Reset Offset?, Duration, Easing, Wait |
| CAMERA: Wait For Camera | Espera completar | (nenhum) |

## SKEW

| Comando | Acao | Parametros Principais |
|---------|------|-----------------------|
| SKEW: Change Skew | Muda skew X/Y | Skew X, Skew Y, Duration, Easing, Wait |
| SKEW: Reset Skew | Reseta skew | Duration, Easing, Wait |
| SKEW: Wait For Skew | Espera completar | (nenhum) |

## ZOOM

| Comando | Acao | Parametros Principais |
|---------|------|-----------------------|
| ZOOM: Change Scale | Muda escala de zoom | Scale, Duration, Easing, Wait |
| ZOOM: Reset Zoom | Reseta zoom | Duration, Easing, Wait |
| ZOOM: Wait For Zoom | Espera completar | (nenhum) |

## Parametros Recorrentes

| Parametro | Presente em | Descricao |
|-----------|-------------|-----------|
| Duration | Quase todos | Duracao em frames da transicao |
| Easing | Change/Reset | Tipo de animacao (requer Core Engine) |
| Wait? | Change/Reset | Se true, bloqueia ate completar |

**Requisito universal**: `VisuMZ_3_ActSeqCamera`

Veja tambem:
- [glossario.md](glossario.md) - Definicoes de termos
- [compatibilidade.md](compatibilidade.md) - Requisitos e conflitos
