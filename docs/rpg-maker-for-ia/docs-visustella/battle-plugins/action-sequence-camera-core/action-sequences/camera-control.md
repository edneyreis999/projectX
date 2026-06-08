# Action Sequences - Camera Control

Comandos principais de posicionamento e foco da camera em batalha.

---

## CAMERA: Clamp ON/OFF

Liga/desliga o clamping da camera. Com clamping OFF, a camera pode sair dos limites normais da tela.

| Parametro | Descricao |
|-----------|-----------|
| Setting | Ligar/desligar camera clamping |

---

## CAMERA: Focus Point

Foca a camera em um ponto especifico da tela.

| Parametro | Descricao |
|-----------|-----------|
| X Coordinate | Coordenada X do ponto de foco (aceita JavaScript) |
| Y Coordinate | Coordenada Y do ponto de foco (aceita JavaScript) |
| Duration | Duracao em frames para mudanca de foco |
| Camera Easing | Tipo de easing (requer Core Engine) |
| Wait For Camera? | Esperar a mudanca completar antes do proximo comando? |

**Nota**: X e Y aceitam codigo JavaScript para calculos dinamicos.

---

## CAMERA: Focus Target(s)

Foca a camera em alvo(s) battler(s).

| Parametro | Descricao |
|-----------|-----------|
| Targets | Selecionar unidade(s) para focar a camera |
| Duration | Duracao em frames para mudanca de foco |
| Camera Easing | Tipo de easing (requer Core Engine) |
| Wait For Camera? | Esperar a mudanca completar antes do proximo comando? |

---

## CAMERA: Offset

Desloca a camera a partir do foco atual.

| Parametro | Descricao |
|-----------|-----------|
| Offset X | Deslocamento horizontal. Negativo: esquerda. Positivo: direita |
| Offset Y | Deslocamento vertical. Negativo: cima. Positivo: baixo |
| Duration | Duracao em frames para mudanca de offset |
| Camera Easing | Tipo de easing (requer Core Engine) |
| Wait For Camera? | Esperar a mudanca completar antes do proximo comando? |

---

## CAMERA: Reset

Reseta as configuracoes da camera.

| Parametro | Descricao |
|-----------|-----------|
| Reset Focus? | Resetar o ponto de foco? |
| Reset Offset? | Resetar o offset da camera? |
| Duration | Duracao em frames para reset |
| Camera Easing | Tipo de easing (requer Core Engine) |
| Wait For Camera? | Esperar o reset completar antes do proximo comando? |

---

## CAMERA: Wait For Camera

Espera as mudancas de camera completarem antes de executar o proximo comando. Nao possui parametros adicionais.

---

**Requisito**: Todos os comandos CAMERA requerem `VisuMZ_3_ActSeqCamera`.

Veja tambem:
- [angle.md](angle.md) - Comandos de angulo
- [zoom.md](zoom.md) - Comandos de zoom
- [skew.md](skew.md) - Comandos de skew
