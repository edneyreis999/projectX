# Action Sequences - Impact

Comandos de Action Sequence do tipo IMPACT, acessíveis pelo **Battle Core** (não por este plugin diretamente).

**Requer**: `VisuMZ_3_ActSeqImpact`

---

## Bizarro Inversion

```
IMPACT: Bizarro Inversion
```

Troca as cores azul/vermelho no battlefield.

| Parâmetro | Descrição |
|-----------|-----------|
| Bizarro? | Ativar efeito Bizarro Inversion? |

---

## Color Break

```
IMPACT: Color Break
```

Separa e reagrupa as cores na tela (chromatic aberration).

| Parâmetro | Descrição |
|-----------|-----------|
| Intensity | Intensidade do efeito de color break |
| Duration | Duração do efeito (em frames) |
| Easing Type | Tipo de easing para a animação |

---

## Desaturation

```
IMPACT: Desaturation
```

Dessatura cores do battlefield (preto e branco). Criado por Manu Gaming.

| Parâmetro | Descrição |
|-----------|-----------|
| Desaturate? | Ativar efeito Desaturation? |

---

## Motion Blur Screen

```
IMPACT: Motion Blur Screen
```

Cria motion blur na tela inteira.

| Parâmetro | Descrição |
|-----------|-----------|
| Angle | Ângulo do motion blur |
| Intensity Rate | Taxa de intensidade (0 a 1) |
| Duration | Duração em frames |
| Easing Type | Tipo de easing |

---

## Motion Blur Target(s)

```
IMPACT: Motion Blur Target(s)
```

Cria motion blur em target(s) específico(s).

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para aplicar motion blur |
| Angle | Ângulo do motion blur |
| Intensity Rate | Taxa de intensidade (0 a 1) |
| Duration | Duração em frames |
| Easing Type | Tipo de easing |

---

## Motion Trail Create

```
IMPACT: Motion Trail Create
```

Cria efeito de rastro de movimento nos target(s).

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para criar motion trail |
| Delay | Frames de delay entre rastros (quanto maior, menos rastros) |
| Duration | Duração do rastro em frames |
| Hue | Hue do motion trail |
| Starting Opacity | Opacidade inicial (diminui ao longo do tempo) |
| Tone | Tom do rastro. Formato: `[Red, Green, Blue, Gray]` |

---

## Motion Trail Remove

```
IMPACT: Motion Trail Remove
```

Remove efeito de motion trail dos target(s).

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para remover motion trail |

---

## Negative Inversion

```
IMPACT: Negative Inversion
```

Inverte todas as cores no battlefield. Criado por Manu Gaming.

| Parâmetro | Descrição |
|-----------|-----------|
| Negative? | Ativar efeito Negative Inversion? |

---

## Oversaturation

```
IMPACT: Oversaturation
```

Oversatura cores no battlefield.

| Parâmetro | Descrição |
|-----------|-----------|
| Oversaturate? | Ativar efeito Oversaturation? |

---

## Shockwave at Point

```
IMPACT: Shockwave at Point
```

Cria onda de choque em coordenadas específicas.

| Parâmetro | Descrição |
|-----------|-----------|
| Point: X | Coordenada X (suporta JavaScript) |
| Point: Y | Coordenada Y (suporta JavaScript) |
| Amplitude | Amplitude da onda de choque |
| Wavelength | Comprimento de onda |
| Duration | Duração da onda de choque |

---

## Shockwave from Each Target(s)

```
IMPACT: Shockwave from Each Target(s)
```

Cria onda de choque em cada target individualmente.

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) como origem |
| Target Location | Parte do grupo target |
| Offset X | Deslocamento X |
| Offset Y | Deslocamento Y |
| Amplitude | Amplitude |
| Wavelength | Comprimento de onda |
| Duration | Duração |

---

## Shockwave from Target(s) Center

```
IMPACT: Shockwave from Target(s) Center
```

Cria onda de choque a partir do centro dos targets.

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) como origem |
| Target Location | Parte do grupo target |
| Offset X | Deslocamento X |
| Offset Y | Deslocamento Y |
| Amplitude | Amplitude |
| Wavelength | Comprimento de onda |
| Duration | Duração |

---

## Time Scale

```
IMPACT: Time Scale
```

Ajusta velocidade do tempo (lento ou rápido). Criado por Manu Gaming.

| Parâmetro | Descrição |
|-----------|-----------|
| Scale | Velocidade do tempo. 1.00 = normal. Menor = lento. Maior = rápido |

---

## Time Stop

```
IMPACT: Time Stop
```

Para o tempo por um período. Música e SFX continuam. Criado por Manu Gaming.

| Parâmetro | Descrição |
|-----------|-----------|
| Milliseconds | Duração da pausa. 1000ms = 1 segundo |

---

## Zoom Blur at Point

```
IMPACT: Zoom Blur at Point
```

Cria zoom blur focado em coordenadas específicas.

| Parâmetro | Descrição |
|-----------|-----------|
| Point: X | Coordenada X do foco (suporta JavaScript) |
| Point: Y | Coordenada Y do foco (suporta JavaScript) |
| Zoom Strength | Força do zoom (0 a 1) |
| Visible Radius | Raio visível a partir do centro |
| Duration | Duração |
| Easing Type | Tipo de easing |

---

## Zoom Blur at Target(s) Center

```
IMPACT: Zoom Blur at Target(s) Center
```

Cria zoom blur focado no centro dos targets.

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) como foco |
| Target Location | Parte do grupo target |
| Offset X | Deslocamento X |
| Offset Y | Deslocamento Y |
| Zoom Strength | Força do zoom (0 a 1) |
| Visible Radius | Raio visível |
| Duration | Duração |
| Easing Type | Tipo de easing |
