# Camera - Action Sequence

## Visão Geral
Action Sequences relacionadas à câmera de batalha.
**Requer VisuMZ_3_ActSeqCamera!**

## Comandos Disponíveis

### CAMERA: Clamp ON/OFF
Ativa/desativa o clamping da câmera de batalha.

**Parâmetros:**
- **Setting**: Ativar ou desativar o clamping da câmera

**Exemplo:**
```
CAMERA: Clamp ON/OFF
  Setting: ON
```

### CAMERA: Focus Point
Foca a câmera de batalha em um ponto específico da tela.

**Parâmetros:**
- **X Coordinate**: Coordenada X para focar (pode usar código JavaScript)
- **Y Coordinate**: Coordenada Y para focar (pode usar código JavaScript)
- **Duration**: Duração em frames para mudança de foco
- **Camera Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Wait For Camera?**: Aguardar mudanças da câmera?

### CAMERA: Focus Target(s)
Foca a câmera de batalha em unidades alvo específicas.

**Parâmetros:**
- **Targets**: Unidade(s) para focar a câmera
- **Duration**: Duração em frames para mudança de foco
- **Camera Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Wait For Camera?**: Aguardar mudanças da câmera?

### CAMERA: Offset
Aplica offset à câmera de batalha em relação ao foco.

**Parâmetros:**
- **Offset X**: Offset horizontal (negativo=esquerda, positivo=direita)
- **Offset Y**: Offset vertical (negativo=cima, positivo=baixo)
- **Duration**: Duração em frames para mudança de offset
- **Camera Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Wait For Camera?**: Aguardar mudanças da câmera?

### CAMERA: Reset
Reseta as configurações da câmera de batalha.

**Parâmetros:**
- **Reset Focus?**: Resetar o ponto de foco?
- **Reset Offset?**: Resetar o offset da câmera?
- **Duration**: Duração em frames para reset
- **Camera Easing**: Tipo de easing (requer VisuMZ_0_CoreEngine)
- **Wait For Camera?**: Aguardar mudanças da câmera?

### CAMERA: Wait For Camera
Aguarda as mudanças da câmera completarem antes do próximo comando.

## Notas
- Use Focus Target para destacar personagens importantes
- Offset permite criar composições dinâmicas
- Reset é importante para retornar ao estado normal
- Easing cria movimentos de câmera suaves e naturais
