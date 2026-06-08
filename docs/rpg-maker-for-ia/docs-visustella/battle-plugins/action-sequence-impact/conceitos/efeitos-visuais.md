# Efeitos Visuais - Action Sequence Impact

## Efeitos de Filtro de Cor

### Bizarro Inversion

Troca as cores azul/vermelho no battlefield. O que era azul fica vermelho e vice-versa.

- **Escopo**: Tudo no battlefield (UI e pictures externos não são afetados)
- **Battle animations**: Podem ou não ser afetadas dependendo da configuração
- **Action Sequence**: `IMPACT: Bizarro Inversion`

---

### Color Break

Quando um acerto crítico ocorre, as cores na tela se separam em RGB em direções aleatórias e depois se reúnem (efeito de chromatic aberration). Cria sensação de peso em golpes poderosos.

- **Ativação automática**: Opcional (configurável nos Plugin Parameters)
- **Action Sequence**: `IMPACT: Color Break` (intensity, duration, easing)
- **Parâmetros**: Intensity, Duration, Easing Type

---

### Desaturation

Dessatura todas as cores no battlefield, resultando em efeito preto e branco (greyscale).

- **Escopo**: Battlefield (UI/pictures externos não afetados)
- **Action Sequence**: `IMPACT: Desaturation` (toggle on/off)
- **Autor**: Manu Gaming

---

### Negative Inversion

Inverte todas as cores no battlefield (swap de 180 graus de hue com a cor oposta).

- **Escopo**: Battlefield (UI/pictures externos não afetados)
- **Action Sequence**: `IMPACT: Negative Inversion` (toggle on/off)
- **Autor**: Manu Gaming

---

### Oversaturation

Oversatura todas as cores no battlefield. Cores ficam extra vívidas e concentradas. Cores claras ficam mais claras, escuras ficam mais escuras.

- **Escopo**: Battlefield (UI/pictures externos não afetados)
- **Action Sequence**: `IMPACT: Oversaturation` (toggle on/off)

---

## Efeitos de Movimento

### Motion Blur

Quando um battler esquiva de um ataque (miss ou evasion), gera efeito de motion blur. A imagem se divide de forma borrada e depois se funde novamente.

- **Ativação automática**: Opcional (configurável nos Plugin Parameters)
- **Action Sequences**:
  - `IMPACT: Motion Blur Screen` — Afeta tela inteira (angle, intensity rate, duration, easing)
  - `IMPACT: Motion Blur Target(s)` — Afeta target(s) específico(s)
- **Parâmetros**: Angle, Intensity Rate (0-1), Duration, Easing Type

---

### Motion Trail

Se habilitado em um battler, ao se mover deixa rastro residual do sprite em cada frame. Ajuda a visualizar trajetória quando movimento é muito rápido.

- **Action Sequence apenas** (não tem ativação automática)
- **Action Sequences**:
  - `IMPACT: Motion Trail Create` — Cria rastro (delay, duration, hue, opacity, tone)
  - `IMPACT: Motion Trail Remove` — Remove rastro
- **Rastros podem ter hue e/ou tons diferentes do sprite original**

---

### Shockwave

Quando um battler defendendo recebe dano HP (ou defende para 0 dano), onda de choque se propaga do battler até as bordas da tela.

- **Ativação automática**: Opcional (configurável nos Plugin Parameters)
- **Action Sequences**:
  - `IMPACT: Shockwave at Point` — Coordenadas X/Y específicas
  - `IMPACT: Shockwave from Each Target(s)` — Origem em cada target
  - `IMPACT: Shockwave from Target(s) Center` — Centro do grupo de targets
- **Parâmetros**: Point X/Y, Amplitude, Wavelength, Duration, Offset X/Y

---

## Efeitos de Tempo

### Time Scale

Causa efeito de câmera lenta ou acelerada. Tudo no game client fica mais lento ou mais rápido.

- **Afeta apenas batalha**
- **Efeitos param durante input phase ou quando há mensagens**
- **Action Sequence**: `IMPACT: Time Scale` (scale: 1.00 = normal, menor = lento, maior = rápido)
- **Autor**: Manu Gaming

---

### Time Stop

Pausa o tempo no game client por um tempo determinado. Apenas música e efeitos sonoros continuam.

- **Action Sequence**: `IMPACT: Time Stop` (milliseconds: 1000ms = 1 segundo)
- **Autor**: Manu Gaming

---

## Efeitos de Zoom

### Zoom Blur

Direciona foco para ponto específico na tela e cria distorção radial em direção a esse ponto. Intensidade diminui ao longo da duração.

- **Action Sequence apenas** (não tem ativação automática)
- **Action Sequences**:
  - `IMPACT: Zoom Blur at Point` — Coordenadas X/Y específicas
  - `IMPACT: Zoom Blur at Target(s) Center` — Centro dos targets
- **Parâmetros**: Point X/Y, Zoom Strength (0-1), Visible Radius, Duration, Easing Type, Offset X/Y
