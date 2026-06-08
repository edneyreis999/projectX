# Action Sequences - Zoom (Camera)

Controlam o nivel de zoom da camera em batalha.

---

## ZOOM: Change Scale

Muda a escala de zoom.

| Parametro | Descricao |
|-----------|-----------|
| Scale | Escala de zoom para mudar |
| Duration | Duracao em frames para mudanca de zoom |
| Zoom Easing | Tipo de easing (requer Core Engine) |
| Wait For Zoom? | Esperar a mudanca completar antes do proximo comando? |

---

## ZOOM: Reset Zoom

Reseta as configuracoes de zoom.

| Parametro | Descricao |
|-----------|-----------|
| Duration | Duracao em frames para resetar o zoom |
| Zoom Easing | Tipo de easing (requer Core Engine) |
| Wait For Zoom? | Esperar o reset completar antes do proximo comando? |

---

## ZOOM: Wait For Zoom

Espera as mudancas de zoom completarem antes de executar o proximo comando. Nao possui parametros adicionais.

---

**Requisito**: Todos os comandos ZOOM requerem `VisuMZ_3_ActSeqCamera`.

Veja tambem:
- [camera-control.md](camera-control.md) - Comandos de camera
- [angle.md](angle.md) - Comandos de angulo
- [skew.md](skew.md) - Comandos de skew
