# Visão Geral — VisuStella Skill Shop

## Introdução

O plugin VisuStella Skill Shop adiciona uma nova cena ao RPG Maker MZ: uma loja de habilidades. O jogador seleciona skills de uma lista e as compra com gold para ensinar aos membros do party, desde que os requisitos de cada skill sejam atendidos.

## Features

- **Cena de Skill Shop** — Nova cena dedicada para compra de habilidades
- **Custo customizado** — Cada skill pode ter seu próprio preço em gold
- **Requisitos de classe** — Skills podem exigir que o ator pertença a uma classe específica
- **Requisito de nível** — Skills podem exigir nível mínimo
- **Requisito de skill prévia** — Skills podem exigir que outras habilidades já tenham sido aprendidas
- **Requisito de switch** — Skills podem ficar trancadas até switches serem ativadas
- **Shops diferentes** — Diferentes eventos podem abrir shops com skills diferentes
- **Taxa de desconto** — Aplicável ao shop inteiro via código JavaScript
- **Moeda extendida** — Suporte a itens/armas/armaduras/variáveis como custo alternativo (requer plugin MoreCurrencies)

## Requisitos

- **Engine**: RPG Maker MZ (não funciona em outras versões)
- **Tier**: 4 — Posicionar abaixo de plugins de tier menor (0, 1, 2, 3) no Plugin Manager

## Compatibilidade

| Plugin/Feature | Status | Detalhes |
|---------------|--------|----------|
| Visual Gold Display | Compatível | Custos das skills são exibidos no formato Visual Gold Display |

## Links Relacionados

- [Notetags](../notetags/skill-shop-notetags.md) — Configure custos e requisitos das skills
- [Plugin Commands](../comandos/plugin-commands.md) — Abra a loja via eventos
- [Configuração Geral](../parametros/configuracao-geral.md) — Ajuste valores padrão
