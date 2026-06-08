# Opcoes - UI

Categoria com opcoes de interface visual: janelas, texto, touch input, menu arrangement e battle UI.

## Windows

### Window Tone: Red / Green / Blue
- Permite ajustar o tom da janela ao gosto do jogador.
- Cada componente (R, G, B) e ajustavel individualmente.
- Da um toque pessoal ao save file do jogador.

## Text

### Text Language
- **Requer** VisuMZ_1_MessageCore + Text Languages habilitados
- Alterna entre diferentes idiomas do jogo.
- Idiomas sao configurados pelo Message Core.

### Text Font
- Permite escolher a fonte do jogo para maximo conforto de leitura.
- Fontes disponiveis configuradas via Plugin Parameters (Text > Font Options).
- A primeira fonte da lista e a padrao.

### Text Speed
- **Requer** VisuMZ_1_MessageCore
- Velocidade de exibicao de texto nas mensagens.
- Escala de 1 (mais lento) a 10 (mais rapido).
- Velocidade 11 = **Instant** (texto aparece instantaneamente).

## Touch Input

### Touch UI
- **Requer** VisuMZ_0_CoreEngine
- Visibilidade dos elementos UI touch-only (botao cancelar, botoes de troca de ator).
- **OFF** - Elementos touch-only nao aparecem.
- **ON** - Elementos touch-only aparecem.

### Button Position
- **Requer** VisuMZ_0_CoreEngine
- Move os botoes clicaveis (Cancel, Page Up, Page Down) para topo ou base da tela.

### Hover Select
- Liga/desliga o Hover Select com mouse.
- **OFF** - Jogador deve mover o cursor manualmente.
- **ON** - Cursor da janela segue o mouse automaticamente quando aplicavel.

## Menu Arrangement

### Menu Style
- **Recommended** - Menus arrangados como o jogo/plugins determinam.
- **Custom** - Jogador pode customizar posicoes das janelas.

### Help Window Position / Input Window Position
- Ajusta posicoes destas janelas entre varias posicoes disponiveis.
- Permite ao jogador selecionar o que e mais confortavel.

## Battle UI

### Show Provoke Origin
- **Requer** VisuMZ_2_AggroControlSystem
- Se um battler esta sob efeito de "Provoke", mostra linha tracejante ate a origem.
- **OFF** - Esconde linhas de Provoke Origin.
- **ON** - Mostra linhas de Provoke Origin.

### Show Aggro Gauge
- **Requer** VisuMZ_2_AggroControlSystem
- Gauge mostrando quantidade de aggro de um membro do party.
- **OFF** - Aggro Gauge escondido.
- **ON** - Aggro Gauge visivel.

### Show HP Gauges
- **Requer** VisuMZ_3_VisualHpGauge
- Gauge de HP sob os pes de cada battler.
- **OFF** - HP Gauges escondidos.
- **ON** - HP Gauges visiveis.

### Show ATB Gauges
- **Requer** VisuMZ_2_BattleSystemATB
- Gauges ATB em cada battler mostrando tempo restante para agir.
- **OFF** - ATB Gauges escondidos.
- **ON** - ATB Gauges visiveis.
