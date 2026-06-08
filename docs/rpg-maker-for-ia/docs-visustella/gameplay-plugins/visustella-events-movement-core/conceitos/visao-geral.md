# Events & Movement Core (VisuStella MZ)

## Dados do Plugin

| Campo | Valor |
|---|---|
| **Nome** | Events & Movement Core |
| **Tier** | 1 (posicionar abaixo de plugins de tier inferior) |
| **Requisitos** | RPG Maker MZ (sem dependencias de outros plugins) |
| **Finalidade** | Adiciona flexibilidade de eventos e opcoes de movimento ao RPG Maker MZ |

## Funcionalidades Principais

### Comandos de Evento Expandidos

O plugin amplia os comandos de evento nativos do RPG Maker MZ com funcoes classicas (do RPG Maker 2000/2003/VX/XP) e novas funcionalidades, oferecendo maior controle sobre a logica de eventos.

### Templates de Eventos

Sistema de templates que permite copiar, morphar e spawnar eventos dinamicamente em tempo de execucao, facilitando a criacao de eventos reutilizaveis.

### Movimento 8 Direcional + Sprites VS8

Suporte completo a movimento em 8 direcoes com formato de sprite sheet dedicado (`[VS8]`). Inclui animacoes de carry, emotes e dash diagonal.

### Estetica de Sprites

- Inclinacao do sprite ao correr (tilt on dash)
- Sombras customizaveis por evento
- Controle visual refinado de personagens e eventos

### Pathfinding

Suporte a pathfinding para eventos e jogador, permitindo navegacao automatica evitando obstaculos.

### Switches e Variaveis Avancadas

Sistema expandido de switches e variaveis com suporte a JavaScript, Self Switches/Variables ilimitados, switches/variaveis por mapa e referencia por nome. Consulte [switches-variables.md](switches-variables.md).

### Labels e Icones sobre Eventos

Exibicao de textos, icones e baloes sobre eventos, visiveis no mapa sem necessidade de eventos paralelos.

### Multiplos Tipos de Gatilho

Alem dos gatilhos nativos (Action Button, Player Touch, Event Touch, Autorun, Parallel), o plugin adiciona:

- Clique do mouse
- Proximidade do jogador
- Regioes especificas

### Hitbox Customizavel

Cada evento pode ter sua hitbox redimensionada, permitindo colisao mais precisa ou area de interacao ampliada.

### Sincronizacao de Movimento

Eventos podem sincronizar seus movimentos com outros eventos ou com o jogador, criando formacoes e padres coordenados.

### Player Turn-in-Place

O jogador pode girar no proprio eixo sem se mover, util para puzzles e navegacao em espacos estreitos.

### Movimento Aleatorio Ponderado

Eventos com movimento "Random" permanecem mais proximos de sua posicao original. O peso e ajustavel por evento.

## Plugins de Extensao

Os seguintes plugins estendem as funcionalidades do Events & Movement Core:

- **Button Trigger Events** - Gatilhos de eventos via botoes
- **Common Event Menu** - Menus baseados em common events
- **Event Signals** - Sistema de sinais entre eventos
- **Field Skills** - Skills usaveis no mapa
- **Furniture System** - Sistema de mobilia interativa
- **Lighting Effects** - Efeitos de iluminacao no mapa
- **Movement Effects** - Efeitos visuais de movimento (galer, etc.)
- **QTE and Trigger System** - Quick Time Events e sistema de gatilhos
- **Tile Grafter System** - Sistema de modificacao de tiles em tempo real

## Documentacao Relacionada

| Topico | Arquivo |
|---|---|
| Switches e Variaveis Avancadas | [switches-variables.md](switches-variables.md) |
| Sprites e Formato VS8 | [sprites-vs8.md](sprites-vs8.md) |
| Notetags | [../notetags/](../notetags/) |
| Comandos de Plugin | [../comandos/](../comandos/) |
| Parametros | [../parametros/](../parametros/) |
| Referencia | [../referencia/](../referencia/) |
