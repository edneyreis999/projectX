# Impact - Action Sequence

## Visão Geral
Action Sequences relacionadas a criação de efeitos de impacto visual.
**Requer VisuMZ_3_ActSeqImpact!**

## Comandos Disponíveis

### IMPACT: Bizarro Inversion
Troca cores azul/vermelho no campo de batalha.
Criado por Manu Gaming!

**Parâmetros:**
- **Bizarro?**: Ativar efeito Bizarro Inversion?

**Exemplo:**
```
IMPACT: Bizarro Inversion
  Bizarro?: true
```

### IMPACT: Color Break
Quebra as cores na tela antes de reorganizar.

**Parâmetros:**
- **Intensity**: Intensidade do efeito
- **Duration**: Duração do efeito
- **Easing Type**: Tipo de easing

### IMPACT: Desaturation
Dessatura todas as cores do campo de batalha.
Criado por Manu Gaming!

**Parâmetros:**
- **Desaturate?**: Ativar efeito de Desaturation?

### IMPACT: Motion Blur Screen
Cria motion blur em toda a tela.

**Parâmetros:**
- **Angle**: Ângulo do motion blur
- **Intensity Rate**: Taxa de intensidade (0-1)
- **Duration**: Duração em frames
- **Easing Type**: Tipo de easing

### IMPACT: Motion Blur Target(s)
Cria motion blur em alvos específicos.

**Parâmetros:**
- **Targets**: Unidade(s) para criar efeito
- **Angle**: Ângulo do motion blur
- **Intensity Rate**: Taxa de intensidade (0-1)
- **Duration**: Duração em frames
- **Easing Type**: Tipo de easing

### IMPACT: Motion Trail Create
Cria efeito de rastro de movimento para alvos.

**Parâmetros:**
- **Targets**: Unidade(s) para criar rastro
- **Delay**: Frames de delay entre rastros
- **Duration**: Duração do rastro
- **Hue**: Matiz do rastro
- **Starting Opacity**: Opacidade inicial
- **Tone**: Tom do rastro [R, G, B, Gray]

### IMPACT: Motion Trail Remove
Remove efeito de rastro de movimento.

**Parâmetros:**
- **Targets**: Unidade(s) para remover rastro

### IMPACT: Negative Inversion
Inverte todas as cores do campo de batalha.
Criado por Manu Gaming!

**Parâmetros:**
- **Negative?**: Ativar efeito Negative Inversion?

### IMPACT: Oversaturation
Oversatura cores do campo de batalha.

**Parâmetros:**
- **Oversaturate?**: Ativar efeito de Oversaturation?

### IMPACT: Shockwave at Point
Cria shockwave em coordenadas específicas.

**Parâmetros:**
- **Point X/Y**: Coordenadas do ponto (pode usar JS)
- **Amplitude**: Amplitude do shockwave
- **Wavelength**: Comprimento de onda
- **Duration**: Duração

### IMPACT: Shockwave from Each Target(s)
Cria shockwave de cada alvo individualmente.

**Parâmetros:**
- **Targets**: Unidade(s) para iniciar shockwave
- **Target Location**: Parte do alvo para iniciar
- **Offset X/Y**: Offset do ponto
- **Amplitude**: Amplitude do shockwave
- **Wavelength**: Comprimento de onda
- **Duration**: Duração

### IMPACT: Shockwave from Target(s) Center
Cria shockwave do centro dos alvos.

**Parâmetros:**
- **Targets**: Unidade(s) para iniciar shockwave
- **Target Location**: Parte do alvo para iniciar
- **Offset X/Y**: Offset do ponto
- **Amplitude**: Amplitude do shockwave
- **Wavelength**: Comprimento de onda
- **Duration**: Duração

### IMPACT: Time Scale
Ajusta tempo para ficar mais rápido ou lento!
Criado por Manu Gaming!

**Parâmetros:**
- **Scale**: Escala de tempo (1.00=normal, menor=lento, maior=rápido)

### IMPACT: Time Stop
Para o tempo por milissegundos especificados.
Criado por Manu Gaming!

**Parâmetros:**
- **Milliseconds**: Milissegundos para parar (1000ms = 1 segundo)

### IMPACT: Zoom Blur at Point
Cria zoom blur em coordenadas específicas.

**Parâmetros:**
- **Point X/Y**: Coordenadas para focar zoom (pode usar JS)
- **Zoom Strength**: Força do zoom (0-1)
- **Visible Radius**: Raio visível do centro
- **Duration**: Duração
- **Easing Type**: Tipo de easing

### IMPACT: Zoom Blur at Target(s) Center
Cria zoom blur no centro dos alvos.

**Parâmetros:**
- **Targets**: Unidade(s) para iniciar zoom
- **Target Location**: Parte do alvo para iniciar
- **Offset X/Y**: Offset do ponto
- **Zoom Strength**: Força do zoom (0-1)
- **Visible Radius**: Raio visível do centro
- **Duration**: Duração
- **Easing Type**: Tipo de easing

## Notas
- Efeitos de impacto adicionam dramatismo ao combate
- Bizarro/Negative invertem cores para efeitos sobrenaturais
- Motion blur cria sensação de velocidade
- Motion trails são ótimos para movimentos rápidos
- Shockwaves adicionam impacto de ondas de choque
- Time Scale/Stop criam efeitos de manipulação temporal
- Zoom Blur foca atenção em pontos específicos
