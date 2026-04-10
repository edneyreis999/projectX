# Troop Tags - Notetags

## Visão Geral
Estas notetags controlam aspects de Troops incluindo extensão de troops de outros e condições especiais de troop pages.

## Troop Size Tags

### <Extend: x>
### <Extend: x, x, x>
- **Used for**: Troop Name Tags e Troop Comment Tags
- **Descrição**: Adds enemies de outro troop para o current troop
- **Parâmetros**:
  - `x`: ID do database troop entry que você deseja add enemy members de
    - Insert multiple x's para add de more troops
- **Notas**:
  - Enemies de outro troop irão retain seus database positions
  - Extended troop members serão added na ordem que são listed
  - **Seja cauteloso** com quantos enemies você adiciona, pois muitos irão lag o battle system
  - **Não somos responsáveis** por frame drops devido a isso

## Troop Comment Tags

Place estas tags dentro de um comment encontrado em um troop page's event list.

### <Once Parallel When Start Battle>
- **Used for**: Troop Page Comment Tags
- **Descrição**: Causes o troop page para immediately load o momento que o battle scene começa para fade in (não depois que fades in)
- **Notas**:
  - Isto é mais rápido que um turn 0 condition troop page
  - **Troop page conditions são ignored**
  - Isto pode ser usado para coisas como:
    - Action Sequence Camera plugin
    - Visual Battle Environment plugin
    - Initial battle poses e such
    - Para provide um near seamless battle transition experience
  - Isto **NÃO** trigger quando coming out do options menu ou party menu
  - Isto **WILL** trigger quando going de battle para battle nonstop via plugins como VisuStella MZ's Chain Battles
  - Quando actors estão moving towards seus home positions, irá take around 30 frames por default

## Ver Também

- [Conceitos: Base Troops](../conceitos/base-troops.md) - Sistema de Base Troops para compartilhar eventos
- [Parâmetros: Mechanics Settings](../parametros/mechanics.md) - Configurações de Mechanics incluindo Base Troop IDs
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
