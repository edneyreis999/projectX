# Domínio: Produto

## Estado do inventário

Cobertura documental terminal para promessa, escopo, prioridades e público.
Milestones estão `not_found` após busca nas fontes candidatas; fontes de brief
estão `mapped`. Isto é inventário de decisões documentadas, não priorização nova
nem roadmap aprovado.

Evidência aceita: packet `game-product-owner-001` revisão 1. Classificação:
**intenção documental; estado de runtime não comprovado**.

## Inventário factual

- **Promessa:** RPG old-school para Windows dirigido a adolescentes, com
  jornada de cinema interativo, escolhas e cooperação tática em ATB por quatro
  heróis. Fontes: `g`, `n`, `j`, `c`.
- **Escopo documentado:** exploração pixel art, diálogos/itens, XP/quests, ATB,
  três atos e 19 quests em cinco trilhas. A presença no runtime não foi
  comprovada. Fontes: `g`, `j`, `q`.
- **Prioridades documentadas:** escolha, narrativa, humor, identidade de
  combate, poder com preço, clareza e assimetria; não foi encontrada uma ordem
  de entrega. Fontes: `n`, `c`, `x`.
- **Público:** “Adolescentes”; nenhuma persona foi localizada. Cenários de
  conclusão não equivalem a personas. Fontes: `g`, `q`, `x`.
- **Gap:** nenhum milestone de produção ou roadmap foi encontrado. Atos e fases
  representam sequência de conteúdo, não um cronograma de entrega. Fontes:
  `x`, `g`, `n`, `j`, `c`, `q`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `game-product-owner.product-promise` | `deep` | `covered` | `p` |
| `game-product-owner.current-scope` | `deep` | `covered` | `s` |
| `game-product-owner.documented-priorities` | `deep` | `covered` | `r` |
| `game-product-owner.personas-audience` | `deep` | `covered` | `a`; gap de persona preservado |
| `game-product-owner.milestones` | `deep` | `not_found` | `m`; busca sem resultado |
| `game-product-owner.roadmap-brief-sources` | `map` | `mapped` | `m` |

## Fontes e rastreabilidade

- `g`: `GDD/GDD.geral.md`
- `n`: `GDD/1-fundacao-narrativa/*.md`
- `j`: `GDD/05_History/historia-jornada*.md`
- `c`: `GDD/06_Combat/{FUNDAMENTOS,DIRETRIZES}*.md`
- `q`: `Quests/13-*/00-indice-quests.md`
- `x`: `search:GDD,Quests,Obsidian,README,AGENTS`

## Próxima validação

Uma decisão humana de produto deve definir, se necessário, persona,
segmentação, ranking de prioridades, milestones e roadmap. Até isso ocorrer,
atos e fases não devem ser usados como evidência de calendário ou release.
