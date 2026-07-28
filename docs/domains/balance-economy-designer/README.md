# Domínio: Balanceamento e Economia

## Estado do inventário

Cobertura estática terminal: progressão, atributos, recompensas/custos,
lojas/recursos e sources/sinks estão `covered`; tabelas numéricas e fontes
estão `mapped`. Conflitos entre dados e intenção permanecem abertos e o
equilíbrio econômico não foi validado em Playtest.

Evidência aceita: packet `balance-economy-designer-001` revisão 1.
Classificação: **valores atuais e drift; sem nova fórmula ou retuning**.

## Inventário factual

- **Conflito — progressão:** Actors 3–6 iniciam e terminam no nível 30; Classes
  1–5 usam `[10,0,10,10]`, contra doc `[4,50,150,1]` e níveis iniciais menores.
  Variáveis de quest 62–66 recebem incrementos de +10 a +50. Fontes: `g`, `q`,
  `d`.
- **Atributos:** no nível 30, Classes 1–5 compartilham HP 3382, ATK 160, DEF
  100 e AGI 150. Dano MOBA, crítico 2×, guarda 50%, buffs 2×25% e ATB
  `sqrt(AGI)+1` estão configurados. TP máximo 93/50/100/93, preserve
  on/off/off/on e regen 5/3/0/2; TCR 1.0 diverge do GDD 1.2/1.5. Fontes: `g`,
  `d`, `p`.
- **Recompensas:** 22 inimigos concedem EXP/gold; nenhum dropa item. Gold
  normal 5–100 e bosses 500–1000. EXP de bosses 5000/2000/8000 diverge do doc
  113/120/150. Eventos têm 23 ganhos de gold e um CE de +9300 EXP. Fontes: `g`,
  `d`.
- **Lojas/recursos:** nenhum command code302. Map057 abre Skill Shop com 80
  IDs; 93 skills custam 100–1800 (default 1000), com reembolso integral. More
  Currencies define oito custos de compra/venda em V23, entre 80–550. Fontes:
  `d`, `p`.
- **Risco — circulação:** fontes são gold, EXP, itens e pontos de quest; sinks
  são skills, TP e custos candidatos em V23. Reembolsos e callers de shop
  ausentes deixam alcance/circulação pendentes. Fontes: `d`, `p`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `balance-economy-designer.progression` | `deep` | `covered` | `p`; conflito preservado |
| `balance-economy-designer.attributes` | `deep` | `covered` | `a` |
| `balance-economy-designer.rewards-costs` | `deep` | `covered` | `r` |
| `balance-economy-designer.shops-resources` | `deep` | `covered` | `s` |
| `balance-economy-designer.sinks-sources` | `deep` | `covered` | `e` |
| `balance-economy-designer.numeric-tables` | `map` | `mapped` | `g`, `d`, `p` |
| `balance-economy-designer.source-map` | `map` | `mapped` | `a`, `i`, `g`, `q`, `d`, `p` |

## Fontes e rastreabilidade

- `a`: packets aceitos das waves 02–03
- `i`: `docs/index.xml`
- `g`: `docs/GDD/6-combate/{FUNDAMENTOS,DIRETRIZES,CLASSIFICACAO,sistema-experiencia}*`
- `q`: `docs/Quests/13-quando-segundo-sol-chegar/00-indice-quests.md`
- `d`: `frontend/data/*.json`
- `p`: `frontend/js/plugins.js;plugins/Coreto_Skill_Shop.js`

## Próxima validação

Playtest instrumentado de progressão, stats, TP, recompensas, shop, reembolso e
circulação. Requer decisão humana sobre qual curva de EXP/TCR é autoritativa;
nenhum valor deve ser retunado antes dessa decisão e da observação runtime.
