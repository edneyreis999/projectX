# Visao Geral - VisuStella Core Engine MZ

O Core Engine e o plugin base (Tier 0) do ecossistema VisuStella MZ para RPG Maker MZ. Ele corrige bugs do engine nativo e adiciona funcionalidades de qualidade de vida para desenvolvedores e jogadores.

## Funcionalidades Principais

### Bug Fixes
Correcao de mais de 17 bugs presentes no codigo base do RPG Maker MZ, incluindo:
- Auto Battle travando contra inimigos com alta defesa
- Invisible Battle Sprites ao remover e readicionar party members
- Window Skin Bleeding (desde MZ v1.2.0)
- Water Tile Bug (desde MZ v1.5.0+)
- Timer Sprite obscuro por filtros/zoom

### Failsafes
- Script Calls que falham nao crasham o jogo - apenas logam no console
- Movement Route Scripts protegidos contra erros
- Show Scrolling Text pode funcionar como script estendido (>12 linhas)

### Quality of Life
- Configuracoes de Play Test: auto new game, console, F6 toggle sound, F7 fast mode, CTRL+n quick load
- Battle Test: auto-add items, Shift+R recover all, Shift+T full TP
- Digit Grouping: formatacao de numeros por locale (1,234,567 vs 1.234.567)
- Player Benefit: encounter rate min, escape always, accuracy formula melhorada

### Parametros
- Controle total sobre Basic Parameters (MHP/MMP/ATK/DEF/MAT/MDF/AGI/LUK)
- X Parameters (HIT/EVA/CRI/CEV/MEV/MRF/CNT/HRG/MRG/TRG) com formulas customizaveis
- S Parameters (TGR/GRD/REC/PHA/MCR/TCR/PDR/MDR/FDR/EXR)
- Custom Parameters via JavaScript
- Caps e formulas customizaveis para cada parametro

### UI e Visual
- Controle de cores (basicas, alpha, condicionais via JS)
- Gold: max, icon, font size, overlap text
- Preload de imagens por pasta
- Keyboard input: WASD, name input, number input
- Menu backgrounds customizaveis por cena
- Button Assist Window para menus
- Window defaults: line height, padding, opacity, scroll bar
- Screen resolution: scroll lock, troop repositioning
- Title screen: format, commands, picture buttons

### Shortcut Scripts
Variaveis globais uteis para script calls:
- `$commonEvent(id)` - Enfileira common event
- `$onceParallel(id)` - Roda common event como once parallel
- `$scene` - Retorna cena atual
- `$spriteset` - Retorna spriteset da cena atual
- `$subject` - Retorna ultimo subject/user da batalha
- `$targets` - Retorna ultimos targets da batalha
- `$target` - Retorna primeiro target da batalha
- `$event` - Retorna evento atual do mapa
