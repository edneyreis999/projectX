# VisuStella Core Engine MZ - Guia Completo

## Sumario

O Core Engine e o plugin Tier 0 do ecossistema VisuStella MZ. Ele serve como fundacao para todos os outros plugins VisuStella, corrigindo bugs do RPG Maker MZ e adicionando funcionalidades de qualidade de vida (QoL).

## Areas e Documentos

### conceitos/ - Conceitos Fundamentais
- **visao-geral.md**: Introducao ao Core Engine. Features: bug fixes, failsafes, QoL settings, controle de cores, gold, preload de imagens, button assist window, parametros de batalha, UI customization.
- **requisitos-e-compatibilidade.md**: Tier 0 (colocar acima de todos os outros plugins). Compativel apenas com RPG Maker MZ. Lista 40+ plugins de extensao.

### correcoes/ - Correcoes Automaticas
- **bug-fixes.md**: 17+ bugs corrigidos: Attack Skill Trait, Auto Battle, Auto Save, Battle Forced End, Debug Console, Gamepad Repeat, Invisible Battle Sprites, Move Picture, Overly-Protective Substitute, Skill List, Sprite Removal, Status Window Name Cutoff, Termination Clear Effects, Timer Sprite, Unusable Battle Items, Water Tile, Window Arrows, Window Client Area, Window Skin Bleeding.
- **failsafes-e-scripts.md**: Movement Route Scripts (nao crasha em erro), Script Call Failsafes (Conditional Branch/Control Variable/Script), Digit Grouping (locale-aware), Scroll-Linked Pictures, Show Scrolling Text como script estendido.

### notetags/ - Sistema de Notetags
- **atores-e-classes.md**: `<Max Level: x>`, `<Initial Level: x>` para atores; `<Learn At Level: x>` para classes. Permite ultrapassar limite de 99 do editor.
- **inimigos.md**: `<Level: x>`, `<param: x>`, `<EXP: x>`, `<Gold: x>`. Permite parametros, EXP e Gold acima dos limites do database.
- **animacoes.md**: `<Head>`, `<Foot>`, `<Anchor X/Y: x>`, `<Offset X/Y: +x>`, `<Mirror Offset X>`, `<Rate: x>`. Para posicionar animacoes Effekseer e MV.
- **qol.md**: `<Minimum Encounter Steps: x>`, `<Show/Hide Tile Shadows>`, `<Scroll Lock X/Y>`. Controle de encounter rate, sombras e scroll por mapa.
- **parametros-basicos-x-s.md**: `<param Plus/Rate/Flat/Max: x>`, `<xparam Plus/Rate/Flat: x%>`, `<sparam Plus/Rate/Flat: x%>`. Para atores, classes, weapons, armors, inimigos e states.
- **js-parametros.md**: `<JS param/xparam/sparam Plus/Rate/Flat/Max: code>`. Para usuarios com conhecimento JavaScript. Usa `user` para referenciar o battler.
- **tileset.md**: `<Taller By x: id>`. Expande tiles por terrain tag para criar tiles mais altos (ex: arvores).
- **batalha.md**: `<FV>`, `<SV>`, `<DTB>`, `<TPB Active/Wait>`, `<BTB>`, `<CTB>`, `<ETB>`, `<FTB>`, `<OTB>`, `<PTB>`, `<STB>`, `<Grid/No Grid>`. Forca battle system/view por mapa ou troop.

### comandos/ - Plugin Commands
- **animacao.md**: Animation: Play at Coordinate - toca animacao em coordenada x,y.
- **audio.md**: BGM/BGS volume, pitch, pan em tempo real sem reiniciar.
- **debug-exportacao.md**: Debug: Current Controller ID; Export: All Maps/Troops/Current Map/Troop Text.
- **game-gold-map.md**: Game: Open URL; Gold: Gain/Lose (sem limite do editor); Map: Once Parallel.
- **picture.md**: Picture: Easing Type, Erase All/Range, Rotate by/to Angle, Show Icon.
- **screen-shake.md**: Screen Shake: Custom com estilos Original/Random/Horizontal/Vertical.
- **switch-variable.md**: Switches: Randomize ID/Range, Toggle ID/Range; Variable: JS Eval, JS Block.
- **system.md**: System: Battle System Change, Load Images, Main Font Size, Side View, Window Padding.
- **text-popup.md**: Text Popup: Show Text - popup de texto que nao pausa o jogo.

### parametros/ - Plugin Parameters
- **qol-settings.md**: Play Test (auto new game, console, F6/F7, quick load), Battle Test (items, Shift+R/T), Digit Grouping, Player Benefit (encounter min, escape always, accuracy), Misc (mirror offset, font shadows, shortcut scripts como $commonEvent/$onceParallel/$scene/$spriteset/$subject/$targets/$target/$event).
- **battle-system.md**: Selecao do battle system padrao (DTB/TPB Active/TPB Wait + VisuStella battle systems).
- **color-settings.md**: Basic Colors (Normal/System/Crisis/Death/Gauges), Alpha Colors (rgba), Conditional Colors (JS para HP/MP/TP/parameter changes/damage).
- **gold-settings.md**: Gold Max (default 99999999), Gold Font Size, Gold Icon, Gold Overlap text.
- **image-loading.md**: Preload de imagens por pasta (animations, battlebacks, enemies, faces, parallaxes, pictures, sv_actors, sv_enemies, system, tilesets, titles).
- **keyboard-input.md**: WASD Movement, R Button Dash Toggle, Name Input (QWERTY layout, banned words), Number Input.
- **menu-settings.md**: Menu Backgrounds (blur strength, per-scene backgrounds), Button Assist Window (general, text format, keys), Controller Button Assist (ID match, directions, actions), Menu Layout (per-scene JS X/Y/W/H).
- **parameter-settings.md**: Basic Parameters (MHP/MMP/ATK/DEF/MAT/MDF/AGI/LUK com formulas e caps), X Parameters (HIT/EVA/CRI/CEV/MEV/MRF/CNT/HRG/MRG/TRG), S Parameters (TGR/GRD/REC/PHA/MCR/TCR/PDR/MDR/FDR/EXR), Icons, Custom Parameters.
- **screen-resolution.md**: Maps scroll lock, Troops reposition (atores e inimigos).
- **title-screen.md**: Title format, subtitle, version, command list (JS customizavel), picture buttons (URLs).
- **ui-settings.md**: UI Area (fade speed, margins, buttons, side buttons), Menu Objects (EXP gauge, parameter arrows), Text Code Support (class names, nicknames).
- **window-settings.md**: Window Defaults (masking, skin bleed, line height, padding, opacity, opening speed, spacing), Scroll Bar (thickness, colors), Selectable Items (background, padding, JS draw).
- **quick-functions.md**: JS Quick Functions globais. Funcoes customizadas no namespace global. Fail-safe contra crashes.

### referencia/ - Referencia
- **extension-plugins.md**: Lista de 40+ plugins de extensao que requerem o Core Engine.
- **glossario.md**: Termos e abreviacoes do plugin.

## Relacoes entre Areas

- **notetags/parametros-basicos-x-s.md** <-> **parametros/parameter-settings.md**: As notetags modificam os parametros cujas formulas e caps sao definidos nos parametros.
- **notetags/js-parametros.md** <-> **parametros/parameter-settings.md**: JS notetags usam a mesma formula framework que os parametros definem.
- **notetags/batalha.md** <-> **parametros/battle-system.md**: Notetags podem override o battle system default definido nos parametros.
- **notetags/animacoes.md** <-> **parametros/qol-settings.md**: `<Mirror Offset X>` notetag override o default em QoL > Misc > Animation: Mirror Offset X.
- **comandos/system.md** <-> **parametros/battle-system.md**: Plugin command pode mudar battle system in-game.
