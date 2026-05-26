# Plugin Parameters: Quality of Life Settings

## Play Test

- **New Game on Boot**: Auto-iniciar new game no Play Test
- **No Play Test Mode**: Forcar modo fora de Play Test durante play test
- **Open Console on Boot**: Abrir Debug Console ao iniciar
- **F6: Toggle Sound**: Alternar som entre 100% e 0%
- **F7: Toggle Fast Mode**: Alternar modo rapido
- **CTRL + n: Quick Load**: CTRL + numero 1-9 carrega save file correspondente (nao conta auto saves)
- **NewGame > CommonEvent**: Roda common event ao iniciar new game

## Battle Test

- **Add Item/Weapon/Armor Type**: Adicionar copias de cada item/weapon/armor durante battle test
- **Added Quantity**: Quantidade de items adicionados (em vez do maximo)
- **Shift+R: Recover All**: Recupera HP/MP/status de todo o party
- **Shift+T: Full TP**: Enche TP de todo o party

## Digit Grouping

- **Standard Text**: Format numeros em janelas (1234567 → 1,234,567)
- **Ex Text**: Format numeros em drawTextEx (mensagens)
- **Damage Sprites**: Format numeros em damage popups de batalha
- **Gauge Sprites**: Format numeros em gauges visuais (HP/MP/TP)

## Player Benefit

- **Encounter Rate Min**: Passos minimos sem random encounter apos batalha
- **Escape Always**: 100% chance de fugir
- **Accuracy Formula**: Muda para `Skill Hit% * (User HIT - Target EVA)`
- **Accuracy Boost**: Boost HIT e EVA a favor do jogador
- **Level Up -> Full HP/MP**: Recupera HP/MP total ao subir de level

## Misc

- **Animation: Mirror Offset X**: Mirror Offset X quando animacao e mirrored
- **Anti-Zoom Pictures**: Pictures nao afetadas por zoom
- **Font Shadows**: Texto usa shadows em vez de outlines
- **Font Smoothing**: Suaviza fonts in-game
- **Font Width Fix**: Corrige problema de largura com instant display em fontes nao-monospaced
- **Key Item Protection**: Key Items nao podem ser vendidos ou consumidos
- **Map Name Text Code**: Nomes de mapas usam text codes
- **Modern Controls**: Home/End buttons, Shift+Up/Down para page up/down
- **MV Animation Rate**: Velocidade de animacoes MV (default: 4, menor = mais rapido)
- **NewGame > CommonEvent**: Common event ao iniciar new game (qualquer sessao)
- **No Tile Shadows**: Remove sombras de tiles
- **Pixel Image Rendering**: Pixelate rendering para pixel games
- **Require Focus?**: Pausa jogo se janela nao esta focada

### Shortcut Scripts
Scripts globais habilitados para script calls:

| Shortcut | Funcao |
|----------|--------|
| `$commonEvent(id)` | Enfileira common event |
| `$onceParallel(id)` | Roda common event como once parallel (map + battle) |
| `$scene` | Retorna cena atual |
| `$spriteset` | Retorna spriteset da cena atual |
| `$subject` | Retorna ultimo subject/user da batalha |
| `$targets` | Retorna ultimos targets da batalha |
| `$target` | Retorna primeiro target da batalha |
| `$event` | Retorna evento atual do mapa |

- **Smart Event Collision**: Eventos so colidem se priority = 'Same as characters'
- **Subfolder Name Purge**: Remove subfolder names de Plugin Parameters para dynamic name registration funcionar
