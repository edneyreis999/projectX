# Action Sequences - Angle (Camera)

Controlam o angulo/tilt da camera em batalha.

---

## ANGLE: Change Angle

Muda o angulo da camera.

| Parametro | Descricao |
|-----------|-----------|
| Angle | Angulo em graus para mudar a camera |
| Duration | Duracao em frames para a mudanca |
| Angle Easing | Tipo de easing (requer Core Engine) |
| Wait For Angle? | Esperar a mudanca completar antes do proximo comando? |

---

## ANGLE: Reset Angle

Reseta as configuracoes de angulo.

| Parametro | Descricao |
|-----------|-----------|
| Duration | Duracao em frames para resetar o angulo |
| Angle Easing | Tipo de easing (requer Core Engine) |
| Wait For Angle? | Esperar o reset completar antes do proximo comando? |

---

## ANGLE: Wait For Angle

Espera as mudancas de angulo completarem antes de executar o proximo comando. Nao possui parametros adicionais.

---

**Requisito**: Todos os comandos ANGLE requerem `VisuMZ_3_ActSeqCamera`.

Veja tambem:
- [camera-control.md](camera-control.md) - Comandos de camera
- [skew.md](skew.md) - Comandos de skew
- [zoom.md](zoom.md) - Comandos de zoom
