# Requisitos e Compatibilidade - Action Sequence Impact

## Plugins Obrigatórios

Ordem no Plugin Manager (de cima para baixo):

| Ordem | Plugin | Tier | Observação |
|:-----:|--------|:----:|-----------|
| 1 | Pixi JS Filters | 0 | Download separado. Desempenho varia por dispositivo |
| 2 | Core Engine VisuStella MZ | - | Base do engine |
| 3 | Battle Core VisuStella MZ | - | Necessário para Action Sequences |
| 4 | Action Sequence Impact (este plugin) | 3 | Colocar abaixo dos de tier menor |

## Pixi JS Filters

- Não vem incluído com a biblioteca VisuStella
- Download a partir do site do VisuStella ou da página do produto Action Sequence Impact
- Instalar como plugin Tier 0
- **Importante**: Desempenho dos filtros Pixi JS varia entre máquinas e dispositivos. Isso está fora do controle do VisuStella

## Regras de Tier

Este é um plugin **Tier 3**. Colocar abaixo de plugins com tier menor no Plugin Manager (ordem: 0, 1, 2, 3, 4, 5).

Isso garante a melhor compatibilidade com o restante da biblioteca VisuStella MZ.

## Acesso aos Comandos de Action Sequence

Os comandos de Action Sequence deste plugin são acessados pelo **Battle Core** na lista de Plugin Commands, **não por este plugin**. Certifique-se de ter a versão mais recente do Battle Core para acessar todos os comandos.

## Plataforma

- **Compatível**: RPG Maker MZ
- **Incompatível**: RPG Maker MV, VX Ace, ou qualquer versão anterior
