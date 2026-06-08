# Action Sequences - Skew (Camera)

Controlam a deformacao/distorcao (skew) da camera em batalha.

---

## SKEW: Change Skew

Muda o skew da camera em X e Y.

| Parametro | Descricao |
|-----------|-----------|
| Skew X | Valor de skew horizontal |
| Skew Y | Valor de skew vertical |
| Duration | Duracao em frames para mudanca |
| Skew Easing | Tipo de easing (requer Core Engine) |
| Wait For Skew? | Esperar a mudanca completar antes do proximo comando? |

---

## SKEW: Reset Skew

Reseta as configuracoes de skew.

| Parametro | Descricao |
|-----------|-----------|
| Duration | Duracao em frames para resetar o skew |
| Skew Easing | Tipo de easing (requer Core Engine) |
| Wait For Skew? | Esperar o reset completar antes do proximo comando? |

---

## SKEW: Wait For Skew

Espera as mudancas de skew completarem antes de executar o proximo comando. Nao possui parametros adicionais.

---

**Requisito**: Todos os comandos SKEW requerem `VisuMZ_3_ActSeqCamera`.

Veja tambem:
- [camera-control.md](camera-control.md) - Comandos de camera
- [angle.md](angle.md) - Comandos de angulo
- [zoom.md](zoom.md) - Comandos de zoom
