# Domínio: Game Design

## Estado do inventário

Cobertura estática terminal: core loop, regras, feedback, progressão e tuning
estão `covered`; fontes estão `mapped`. O conflito de EXP e o risco de plugin
duplicado permanecem explícitos. Feel, pacing, clareza e balanceamento não foram
validados por Playtest.

Evidência aceita: packet `game-designer-001` revisão 1. Classificação:
**fatos de configuração/dados e intenção de design; runtime pendente**.

## Inventário factual

- **Core loop:** exploração/diálogo/coleta → missões/batalhas → XP; no combate,
  geração → acúmulo → gasto → recuperação entre quatro atores. Fontes: `g`,
  `x`.
- **Regras:** dano MOBA, crítico 2×, guarda 50%, buffs em 2×25%, ATB
  `sqrt(AGI)+1`, stun reinicia o gauge e modos TP
  Foco/Momentum/Guarda/Fúria. Fontes: `v`, `d`.
- **Feedback:** o design pede estados legíveis; a configuração expõe HP/ATB,
  markers e turnos, e `Coreto_TpNotetags` mostra custo/ganho de TP. Fontes: `g`,
  `v`, `c`.
- **Conflito — progressão:** skill shop/passivas e 19 quests em cinco trilhas
  0–100 (variáveis 62–66) estão documentadas. EXP diverge entre spec
  `[4,50,150,1]` com níveis iniciais 1/8/7 e dados `[10,0,10,10]` com party em
  nível/máximo 30. Fontes: `x`, `q`, `d`.
- **Tuning:** score `Efeito×2 + Tempo×1 + Recurso×1`, tiers e TTK de boss entre
  8–12 turnos; `Skills` contém 43 `Spend TP`, 25 `Gain TP` e 46 `Cast Time`.
  Fontes: `g`, `d`.
- **Risco:** `Coreto_TpEvents` aparece ativo duas vezes; duplicação de ganhos é
  risco estático, não efeito confirmado. Fontes: `v`, `c`, `p`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `game-designer.core-loop` | `deep` | `covered` | `loop` |
| `game-designer.rules-mechanics` | `deep` | `covered` | `rules` |
| `game-designer.feedback` | `deep` | `covered` | `feedback` |
| `game-designer.progression-systems` | `deep` | `covered` | `progress`; conflito preservado |
| `game-designer.tuning` | `deep` | `covered` | `tuning` |
| `game-designer.source-map` | `map` | `mapped` | `p`, `g`, `x`, `q`, `d`, `v`, `c` |

## Fontes e rastreabilidade

- `p`: packets aceitos e coverage plan
- `g`: `GDD.geral;6-combate/{FUNDAMENTOS,DIRETRIZES,CLASSIFICACAO}`
- `x`: `6-combate/sistema-experiencia.md`
- `q`: `Quests/13-*/00-indice-quests.md`
- `d`: `frontend/data/{System,Actors,Classes,Skills,States,Enemies,Troops,CommonEvents}`
- `v`: `frontend/js/plugins.js;config-extracted`
- `c`: `Coreto_{TpNotetags,TpEvents,CastTimeTags,Killin}.js`

## Próxima validação

Playtest de feel, pacing, clareza, TP, progressão e TTK; decisão humana sobre a
fonte autoritativa da curva de EXP; observação instrumentada do efeito das
entradas duplicadas antes de qualquer correção ou rebalanceamento.
