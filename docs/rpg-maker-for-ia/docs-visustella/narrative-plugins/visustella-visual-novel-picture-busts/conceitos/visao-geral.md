# Visual Novel Picture Busts - Visão Geral

## Sobre o Plugin

**Nome**: Visual Novel Picture Busts
**Autor**: VisuStella MZ
**Tier**: 2 (colocar abaixo de plugins com tier menor no Plugin Manager)
**Requisito**: Core Engine VisuStella MZ

## Propósito

Permite usar Pictures (comandos de evento "Show Picture" e "Move Picture") como **Picture Busts** no estilo Visual Novels. Oferece Plugin Commands para controlar busts de forma simplificada, removendo a complexidade de recriar sistemas similares com eventos vanilla do RPG Maker MZ.

## Funcionalidades Principais

- Comandos simplificados para uso comum de busts estilo Visual Novel
- Enter/Exit rápido com posicionamento simplificado (0-10) ao invés de coordenadas exatas
- Troca de gráfico sem alterar outras propriedades (expressões/poses)
- Espelhamento horizontal simples (Mirror, Auto, Toggle)
- Fade in/out com controle fino de opacidade
- Battle Animations sobre busts (normalmente aparecem atrás de pictures)
- Movimentação relativa, por coordenadas exatas ou posições predeterminadas
- Escala para ampliar/reduzir sem alterar outras propriedades
- Alteração de tom/tint para efeitos ativo, passivo ou normal
- Efeitos de animação contínua: Breathing, Fidgeting, Swaying

## Estrutura do Plugin

| Categoria | Comandos | Arquivo de Referência |
|-----------|----------|----------------------|
| Básicos | Enter, Exit, Graphic Change, Mirror, Origin, Animation | [comandos/basicos.md](comandos/basicos.md) |
| Fade | Fade In, Fade Out, Opacity By X, Opacity To X | [comandos/fade.md](comandos/fade.md) |
| Movimento | Move By/To Coordinates/Position, Reset | [comandos/movimento.md](comandos/movimento.md) |
| Escala | Scale By, Scale To, Scale Reset | [comandos/escala.md](comandos/escala.md) |
| Animações | Breathing, Fidgeting, Swaying | [comandos/animacoes.md](comandos/animacoes.md) |
| Tone/Tint | Bright, Dim, Normal, Preset, Target | [comandos/tone-tint.md](comandos/tone-tint.md) |

## Requisitos

- RPG Maker MZ (não funciona em outras versões)
- Core Engine VisuStella MZ instalado acima deste plugin no Plugin Manager
