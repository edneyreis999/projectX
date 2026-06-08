# Events & Movement Core (VisuStella MZ)

> Plugin Tier 1 para RPG Maker MZ que expande eventos, movimento e switches/variables.

## Mapa da Documentacao

| Secao | Arquivo | Conteudo |
|-------|---------|----------|
| **Conceitos** | [visao-geral.md](conceitos/visao-geral.md) | Visao geral do plugin, funcionalidades, plugins de extensao |
| | [switches-variables.md](conceitos/switches-variables.md) | Advanced Switches/Variables: JS, Self, Map, Reference |
| | [sprites-vs8.md](conceitos/sprites-vs8.md) | Filename tags, formato VS8, emotes, weighted random |
| **Notetags** | [mapas.md](notetags/mapas.md) | Notetags para mapas: diagonal, regions, JS, visibility |
| | [eventos.md](notetags/eventos.md) | Notetags para eventos: activation, movement, visual, hitbox, pictures |
| | [paginas.md](notetags/paginas.md) | Page comment tags: custom page conditions |
| **Comandos** | [auto-movement.md](comandos/auto-movement.md) | Auto Movement: Events |
| | [call-event.md](comandos/call-event.md) | Call Event: Remote Read |
| | [dash.md](comandos/dash.md) | Dash Enable: Toggle |
| | [event-icon.md](comandos/event-icon.md) | Event/Player Icon: Change, Delete, Restore |
| | [event-label.md](comandos/event-label.md) | Event Label: Refresh, Visible |
| | [event-location.md](comandos/event-location.md) | Event Location, Spawn Event, Morph Event |
| | [event-popup.md](comandos/event-popup.md) | Event Popup: Player, Follower, Event, Target Tile |
| | [event-timer.md](comandos/event-timer.md) | Event Timer, Follower Control, Global/Self Switch/Variable |
| **Parametros** | [configuracao-geral.md](parametros/configuracao-geral.md) | Event Template Settings, JavaScript hooks |
| | [labels-icones.md](parametros/labels-icones.md) | Event Label Settings, Event Icon Settings |
| | [movement.md](parametros/movement.md) | 8-dir, Automatic Movement, Dash, Shadows, Turn in Place, VS8 |
| | [regioes-terrain.md](parametros/regioes-terrain.md) | Region Rulings, Common Event on OK/Touch, Terrain Tags |
| **Referencia** | [glossario.md](referencia/glossario.md) | Glossario de termos do plugin |
| | [script-calls.md](referencia/script-calls.md) | Script calls e Move Route Custom Commands |
| | [troubleshooting.md](referencia/troubleshooting.md) | Solucao de problemas comuns |

## Caminho Recomendado de Leitura

1. `conceitos/visao-geral.md` - Entenda o que o plugin faz
2. `conceitos/switches-variables.md` - Switches/Variables avancadas
3. `conceitos/sprites-vs8.md` - Sistema de sprites VS8
4. `notetags/mapas.md` - Notetags para mapas
5. `notetags/eventos.md` - Notetags para eventos (referencia principal)
6. `notetags/paginas.md` - Condicoes customizadas de pagina
7. `comandos/` - Consulte conforme necessario
8. `parametros/` - Consulte para configuracoes especificas
9. `referencia/script-calls.md` - Script calls e custom move route commands
10. `referencia/troubleshooting.md` - Resolucao de problemas

## Plugins de Extensao

Estes plugins requerem Events & Movement Core como parent:

- Button Trigger Events
- Common Event Menu
- Event Signals
- Field Skills
- Furniture System
- Lighting Effects
- Movement Effects
- QTE and Trigger System
- Tile Grafter System

## Requisitos

- RPG Maker MZ (nao funciona em outras versoes)
- Tier 1 (colocar ABAIXO de plugins de tier menor: 0)
