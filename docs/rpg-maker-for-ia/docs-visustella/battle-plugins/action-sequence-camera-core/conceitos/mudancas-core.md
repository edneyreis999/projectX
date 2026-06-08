# Mudancas no Core Engine

## Spriteset Position Rewrite

A funcao `Spriteset_Battle.updatePosition` foi reescrita para suportar todas as novas features de camera e zoom adicionadas por este plugin.

## Reset Automatico Durante Input Phase

Truques de camera como zoom, pan e tilt sao **resetados durante a input phase** para garantir que o jogador consiga ver o campo de batalha completo ao selecionar acoes.

Isso significa que efeitos de camera aplicados durante uma Action Sequence nao persistem na tela de selecao de comandos.

## Implicacoes para Design

- Nao e necessario resetar manualmente a camera antes da input phase
- Se voce quer manter um efeito de camera entre turnos, considere usar eventos/estados que re-apliquem o efeito
- O reset automatico garante jogabilidade limpa entre turnos

Veja tambem:
- [visao-geral.md](visao-geral.md) - Features gerais do plugin
