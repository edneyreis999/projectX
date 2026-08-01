# Domínio: Análise de Negócio do Jogo

## Estado do inventário

Cobertura documental terminal: objetivos, público, requisitos, critérios de
aceite e restrições estão `covered`; fontes de decisão estão `mapped`. Os
critérios perceptíveis ou de runtime continuam condicionados a Playtest.

Evidência aceita: packet `game-business-analyst-001` revisão 1. Classificação:
**requisitos documentados; nenhuma decisão nova**.

## Inventário factual

- **Objetivos:** contar uma origem como cinema interativo e RPG old-school; no
  combate, transformar crescimento e cooperação em trabalho tático ATB legível.
  Fontes: `g`, `c`.
- **Público e plataforma:** adolescentes e Windows. Não foram encontradas
  persona ou segmentação. Fontes: `g`, `p`.
- **Requisitos existentes:** diálogos/itens, XP de batalhas e missões, ATB, 19
  quests em cinco trilhas, clareza, identidade, escolhas, loops de recurso,
  trade-offs e sinergia. Fontes: `g`, `c`, `q`.
- **Critérios de aceite documentados:** TTK de boss entre 8–12 turnos, uso de
  mais de 60% do kit, 2–4 sinergias, aprovação de skill/kit/inimigo, tiers de
  score e verificações de balanceamento/dano máximo das quests. Percepção e
  execução requerem Playtest. Fontes: `c`, `q`, `p`.
- **Restrições:** RPG Maker MZ com VisuStella Battle/ATB/TP; combate
  determinístico e legível; evitar solução única, dependência de RNG ou spam;
  poder precisa de custo, risco ou setup; caps de score/tier se aplicam. Fontes:
  `c`, `p`, `a`.
- **Gap:** nenhum roadmap aprovado, milestone, aceite de release ou validação
  de runtime foi encontrado. Fontes: `i`, `g`, `c`, `q`, `p`, `a`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `game-business-analyst.product-objectives` | `deep` | `covered` | `obj` |
| `game-business-analyst.declared-audience` | `deep` | `covered` | `aud`; gap de persona |
| `game-business-analyst.requirements` | `deep` | `covered` | `req` |
| `game-business-analyst.acceptance-criteria` | `deep` | `covered` | `ac`; gate de runtime |
| `game-business-analyst.documented-constraints` | `deep` | `covered` | `con` |
| `game-business-analyst.decision-sources` | `map` | `mapped` | `src` |

## Fontes e rastreabilidade

- `i`: `docs/index.xml`
- `g`: `docs/GDD/GDD.geral.md`
- `c`: `docs/GDD/06_Combat/{FUNDAMENTOS,DIRETRIZES,CLASSIFICACAO}*`
- `q`: `docs/Quests/13-*/00-indice*`
- `p`: packets comuns, de tecnologia e de produto aceitos
- `a`: `AGENTS.md` da sessão

## Próxima validação

Submeter critérios perceptíveis a Playtest com evidência observável e obter
decisão humana separada para persona, roadmap, milestone e aceite de release.
Não promover critérios de design a comportamento validado apenas por presença
documental.
