# Glossario - Action Sequence Camera Core

## Termos

### Camera Clamp
Restricao que impede a camera de sair dos limites do campo de batalha. Com `CAMERA: Clamp OFF`, a camera pode ir alem dos limites visuais.

### Easing
Tipo de curva de animacao aplicada a transicoes de camera. Requer Core Engine VisuStella MZ para funcionar. Define como a transicao acelera/desacelera.

### Focus Point
Coordenada X,Y especifica onde a camera deve focar. Aceita codigo JavaScript para calculos dinamicos.

### Focus Target
Alvo(s) battler(s) que a camera deve seguir. A camera centraliza no(s) alvo(s) selecionado(s).

### Offset
Deslocamento da camera a partir do ponto de foco. Offset X (negativo=esquerda, positivo=direita), Offset Y (negativo=cima, positivo=baixo).

### Skew
Deformacao/distorcao visual da camera em X e Y. Cria efeito de perspectiva inclinada.

### Scale (Zoom)
Nivel de zoom da camera. Valor maior aumenta o zoom, menor diminui.

### Angle (Tilt)
Angulo de inclinacao da camera em graus. Cria efeito de rotacao visual.

### Input Phase Reset
Comportamento automatico que reseta todos os efeitos de camera durante a fase de input do jogador, garantindo visibilidade completa do campo.

### Motion Sickness
Enjoo causado por movimentos de camera. O plugin oferece opcao para desativar efeitos de camera por acessibilidade.

Veja tambem:
- [referencia-rapida.md](referencia-rapida.md) - Tabela de comandos
