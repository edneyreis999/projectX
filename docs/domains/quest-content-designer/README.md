# Domínio: Conteúdo de Quests

## Estado do inventário

Cobertura estática terminal: quests/objetivos, NPCs/etapas, recompensas, flags,
pré e pós-condições estão `covered`; fontes estão `mapped`. Drift entre docs,
plugin e eventos foi preservado. Nenhuma reachability ou conclusão em runtime é
afirmada.

Evidência aceita: packet `quest-content-designer-001` revisão 1.
Classificação: **conteúdo e estado estáticos; Playtest pendente**.

## Inventário factual

- **Estrutura:** 13 roots de quest estão documentados; a fase 13 define 19
  quests em cinco trilhas, com objetivos, NPCs, locais, pré-requisitos e beats.
  Muitas permanecem em progresso. Fontes: `q`, `a`.
- **Risco — journal:** duas entradas PKD ativas divergem entre 31 e dez quests;
  a deduplicação da engine torna a ordem 43 efetiva. Eventos chamam 26 IDs;
  cinco não são chamados. IDs `horaDeCrescer, 2` e `resgatarCorvos, 2/3` estão
  malformados. Fontes: `p`, `d`, `e`.
- **Risco — estado:** runtime usa V26–35/40–41 para progresso principal,
  V62–66 para scores e V67–83 para etapas; docs sugerem V1–5. V84/V85
  conflitam com flags de ferreiro no Map036; V96/V97 não têm nome. Fontes: `q`,
  `d`, `a`.
- **Risco — recompensas:** docs alocam 500 pontos de preparação; eventos/plugins
  possuem rewards porque callbacks SQSM são zero. Map036 duplica owners dos
  Maps7/8/9/11/17/47/52; writers V62 conflitam com +50/+25/+25 documentado.
  Fontes: `q`, `d`, `p`.
- **Risco — condições:** dependências, itens, locais e page gates codificam
  pré-condições; writes de score/stage, conclusão SQSM e transfers codificam
  pós-condições. Falha e auto-complete estão off; retry/fail têm cobertura
  escassa. Fontes: `q`, `d`, `p`.

## Contrato canônico: Noite da História

`Coreto_QuestCore` é a autoridade canônica da quest
`noite-da-historia`. Seu estado durável usa a variável
`V106 v_qNoiteDaHistoria_stage`:

| Estado | Significado |
| --- | --- |
| `0` | Quest não iniciada |
| `10` | Convocação concluída; objetivo de alcançar o lugar ativo |
| `15` | Lugar alcançado; sessão da VN ativa |
| `20` | VN concluída; retomada do encerramento físico |
| `90` | Chegada ao Map045 concluída |

As transições canônicas são `START` (`0` → `10`), `REACH_SEAT` (`10` →
`15`), `COMPLETE_VN` (`15` → `20`) e `ARRIVE_MAP045` (`20` → `90`). A quest PKD/SQSM
`assistirNoiteHistoria` é somente uma projeção idempotente desse estado no
journal; não é autoridade de progresso.

O tutorial da funda usa a mesma base com escopo local: [111]
`v_qTutorialFundaForjaprata_stage` progride por `INTRODUCE_JOURNAL` (`0` →
`10`), `FOUND_SLING` (`10` → `20`) e `LEAVE_EQUIPPED` (`20` → `90`). Como
ele é uma submáquina de `aSemifinal`, seu terminal não conclui a quest maior.
No registry, `completeQuestAtTerminal: false` explicita essa fronteira e
`completedAt: null` explicita objetivos cuja conclusão pertence a outro fluxo.

A ordem de plugins que preserva o contrato é `PKD` → `QuestCore` → `QuestVN`
→ `Cutscene`. Use este contrato ao alterar o registro da quest, suas
transições, a projeção no journal, a variável de estágio ou essa ordem de
plugins.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `quest-content-designer.quests-objectives` | `deep` | `covered` | `chain` |
| `quest-content-designer.npcs-steps` | `deep` | `covered` | `chain` |
| `quest-content-designer.rewards` | `deep` | `covered` | `reward` |
| `quest-content-designer.flags` | `deep` | `covered` | `state` |
| `quest-content-designer.preconditions` | `deep` | `covered` | `conditions` |
| `quest-content-designer.postconditions` | `deep` | `covered` | `conditions` |
| `quest-content-designer.source-map` | `map` | `mapped` | `chain` |

## Fontes e rastreabilidade

- `a`: packets aceitos das waves 02–04
- `q`: `docs/Quests/**`
- `d`: `frontend/data/{System,CommonEvents,selected maps}`
- `p`: `frontend/js/plugins.js; quest plugins`
- `e`: fonte da engine RMMZ

## Próxima validação

Playtest de journal, 26 IDs chamados, cinco não chamados, IDs malformados,
owners duplicados, scores V62–66, flags V84–97 e pré/pós-condições. Cobrir
sucesso, falha, retry, save/load e reachability sem reescrever conteúdo antes
de resolver os owners conflitantes.
