# Cutins - Action Sequence

## Visão Geral
Action Sequências para controle de Visual Cutin Effects.
**Requer VisuMZ_3_VisualCutinEffect!**

## Comandos Disponíveis

### CUTIN: Add Visual Cutin Effect
Adiciona Visual Cutin Effect com as configurações desejadas.
Apenas um cutin de cada tipo pode estar presente por vez.

**Parâmetros:**

**Basic Settings:**
- **Cutin Style Type**: Estilo do Visual Cutin Effect
- **Portrait Target**: Unidade(s) para obter dados do retrato
- **Parallax Filename**: Parallax para usar (ou None)
- **Background Color**: Cor de fundo (#rrggbb ou número)

**Extra Settings:**
- Configurações adicionais específicas do cutin
- Consulte documentação do Visual Cutin Effect

**Wait for Entrance**: Aguardar entrada do cutin?

**Exemplo:**
```
CUTIN: Add Visual Cutin Effect
  Cutin Style Type: Default
  Portrait Target: User
  Parallax Filename: (None)
  Background Color: #000000
  Wait for Entrance: true
```

### CUTIN: End Visual Cutin Effect (All)
Encerra todos os Visual Cutin Effects presentes.

**Parâmetros:**
- **Wait for Exit**: Aguardar saída do cutin?

### CUTIN: End Visual Cutin Effect (Type)
Encerra o Visual Cutin Effect do tipo especificado.

**Parâmetros:**
- **Cutin Style Type**: Tipo de cutin para encerrar
- **Wait for Exit**: Aguardar saída do cutin?

### CUTIN: Wait for Cutin Entrance
Aguarda todas as entradas de cutin finalizarem.

### CUTIN: Wait for Cutin Exit
Aguarda todas as saídas de cutin finalizarem.

## Notas
- Cutins são ideais para habilidades especiais e momentos dramáticos
- Apenas um cutin de cada tipo pode estar ativo simultaneamente
- Use Wait para sincronizar eventos com o cutin
- Parallax Background adiciona profundidade visual
