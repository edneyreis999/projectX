# VisuStella Core Engine MZ

Plugin base (Tier 0) do ecossistema VisuStella MZ. Corrige bugs do RPG Maker MZ, adiciona QoL settings, e dá controle sobre parametros, cores, gold, imagens, teclado, menus, UI e janelas.

## Mapa da Documentacao

| Secao | Arquivo | Conteudo |
|-------|---------|----------|
| **Conceitos** | [visao-geral.md](conceitos/visao-geral.md) | Introducao, features, visao geral |
| | [requisitos-e-compatibilidade.md](conceitos/requisitos-e-compatibilidade.md) | Tier 0, requisitos, plugins de extensao |
| **Correcoes** | [bug-fixes.md](correcoes/bug-fixes.md) | 17+ bugs corrigidos no engine base |
| | [failsafes-e-scripts.md](correcoes/failsafes-e-scripts.md) | Failsafes para scripts, digit grouping |
| **Notetags** | [atores-e-classes.md](notetags/atores-e-classes.md) | Max Level, Initial Level, Learn At Level |
| | [inimigos.md](notetags/inimigos.md) | Level, parametros, EXP, Gold para inimigos |
| | [animacoes.md](notetags/animacoes.md) | Head/Foot anchor, Offset, Mirror, Rate |
| | [qol.md](notetags/qol.md) | Encounter steps, tile shadows, scroll lock |
| | [parametros-basicos-x-s.md](notetags/parametros-basicos-x-s.md) | Basic/X/S param Plus/Rate/Flat/Max |
| | [js-parametros.md](notetags/js-parametros.md) | JS notetags para parametros (avancado) |
| | [tileset.md](notetags/tileset.md) | Taller tiles por terrain tag |
| | [batalha.md](notetags/batalha.md) | Forcar battle view/system por mapa/troop |
| **Comandos** | [animacao.md](comandos/animacao.md) | Animation: Play at Coordinate |
| | [audio.md](comandos/audio.md) | BGM/BGS volume, pitch, pan |
| | [debug-exportacao.md](comandos/debug-exportacao.md) | Debug controller, export text |
| | [game-gold-map.md](comandos/game-gold-map.md) | Open URL, Gold gain/lose, Map Once Parallel |
| | [picture.md](comandos/picture.md) | Easing, erase, rotate, show icon |
| | [screen-shake.md](comandos/screen-shake.md) | Custom screen shake styles |
| | [switch-variable.md](comandos/switch-variable.md) | Randomize, toggle switches, JS eval/block |
| | [system.md](comandos/system.md) | Battle system, load images, font, sideview |
| | [text-popup.md](comandos/text-popup.md) | Text popup show |
| **Parametros** | [qol-settings.md](parametros/qol-settings.md) | Play test, battle test, digit grouping, player benefit, misc |
| | [battle-system.md](parametros/battle-system.md) | Selecao de battle system |
| | [color-settings.md](parametros/color-settings.md) | Cores basicas, alpha, condicionais JS |
| | [gold-settings.md](parametros/gold-settings.md) | Max gold, icon, overlap |
| | [image-loading.md](parametros/image-loading.md) | Preload de imagens por pasta |
| | [keyboard-input.md](parametros/keyboard-input.md) | WASD, name input, number input |
| | [menu-settings.md](parametros/menu-settings.md) | Backgrounds, button assist, layout |
| | [parameter-settings.md](parametros/parameter-settings.md) | Basic/X/S params, formulas, caps, icons, custom params |
| | [screen-resolution.md](parametros/screen-resolution.md) | Maps scroll lock, troops reposition |
| | [title-screen.md](parametros/title-screen.md) | Command list, picture buttons |
| | [ui-settings.md](parametros/ui-settings.md) | UI area, menu objects, text code support |
| | [window-settings.md](parametros/window-settings.md) | Window defaults, scroll bar, selectable items |
| | [quick-functions.md](parametros/quick-functions.md) | JS quick functions globais |
| **Referencia** | [extension-plugins.md](referencia/extension-plugins.md) | Lista completa de plugins compatíveis |
| | [glossario.md](referencia/glossario.md) | Termos e abreviacoes |

## Ordem de Leitura Recomendada

1. `conceitos/visao-geral.md` - Entender o que o Core Engine faz
2. `conceitos/requisitos-e-compatibilidade.md` - Tier e dependencias
3. `referencia/extension-plugins.md` - Plugins que dependem deste
4. `correcoes/bug-fixes.md` - Bugs que sao corrigidos automaticamente
5. `notetags/` - Consultar conforme necessidade
6. `comandos/` - Consultar conforme necessidade
7. `parametros/` - Consultar para ajustar configuracoes

## Metadados

- **Plugin**: VisuMZ_0_CoreEngine
- **Tier**: 0 (deve ser colocado acima de todos os outros)
- **Autor**: VisuStella
- **Requisito**: RPG Maker MZ
- **Arquivo original**: `visustella-core-engine-original.md`
