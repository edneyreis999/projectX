# Inject - Action Sequence

## Visão Geral
Action Sequences relacionadas a injeção de animações de sprite.
**Requer VisuMZ_3_ActSeqImpact!**

## Comandos Disponíveis

### INJECT: Animation Begin
Injeta e reproduz animação completa de spritesheet.
A animação reproduz sobre o battler até finalizar.
O sprite original fica invisível até terminar.

**Parâmetros:**
- **Targets**: Unidade(s) para injetar animação
- **Filename**: Arquivo da spritesheet (pasta /img/sv_actors/)
- **Horizontal Cells**: Células horizontais (colunas)
- **Vertical Cells**: Células verticais (linhas)
- **Frame Delay**: Frames entre células
- **Smooth Bitmap?**: Suavizar gráfico?
- **Offset X**: Offset horizontal (negativo=esquerda)
- **Offset Y**: Offset vertical (negativo=cima)

**Exemplo:**
```
INJECT: Animation Begin
  Targets: User
  Filename: Special_Attack
  Horizontal Cells: 4
  Vertical Cells: 4
  Frame Delay: 5
  Smooth Bitmap?: true
  Offset X: 0
  Offset Y: 0
```

### INJECT: Animation End
Para e termina quaisquer animações injetadas nos alvos.
Qualquer animação injetada será terminada prematuramente.

**Parâmetros:**
- **Targets**: Unidade(s) para parar animação

### INJECT: Animation Pause/Resume
Pausa/resume animações injetadas nos alvos.

**Parâmetros:**
- **Targets**: Unidade(s) para pausar/resumir
- **Pause?**: Pausar a animação?

### INJECT: Wait For Injected Animation
Aguarda animações injetadas completarem antes do próximo comando.

## Notas
- Inject permite sobrepor animações customizadas
- Útil para ataques especiais com sprites únicos
- A animação substitui o sprite temporariamente
- Pause/Resume permite controle de timing
- Wait sincroniza com outros comandos
- Spritesheets devem estar em /img/sv_actors/
