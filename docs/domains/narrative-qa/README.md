# Domínio: QA Narrativo

## Estado do inventário

Cobertura estática terminal: continuidade, flags, rotas, regressão e
reachability documentada estão `covered`; fontes estão `mapped`. Há conflito de
cânone/final, colisões de variáveis e lacunas de alcance. Canon e reachability
exigem decisão humana e Playtest.

Evidência aceita: packet `narrative-qa-001` revisão 1. Classificação:
**grafo e conteúdo estáticos; rotas executáveis não certificadas**.

## Inventário factual

- **Conflito de cânone:** timeline v5 remove as mortes de Thordan/Mhordred e
  converge o final; `ultima-missao` propõe morte de Mhordred e finais A/B/C.
  Fontes: `n`, `h`.
- **Risco — flags:** V26–41 acompanham quests e V62–85 estado narrativo, mas
  V61 é separador nomeado enquanto valores 2/3/4 bloqueiam 17 mapas. S61–64 sem
  nome são definidos por CEs. Rótulos V84/V85 conflitam com uso de conclusão de
  ferreiro no Map036. Fontes: `s`, `e`, `r`.
- **Fato — rotas:** docs definem ramificações da Cena 11 e 19 quests em cinco
  trilhas. Runtime distribui eventos de quest, mas duplica muitos no Map036;
  alguns só existem ali. Fontes: `h`, `q`, `e`.
- **Risco — reachability:** novo jogo começa no Map057 sem transfer direto.
  Arestas estáticas não o conectam às cadeias narrativas; Map042 está vazio;
  CE11/CE14 não têm callers code117/database encontrados. Fontes: `s`, `e`,
  `r`.
- **Regressão/drift:** finais 36→37→38→41 e 21→55→53 coexistem; Map021/054
  duplicam `Scene_controller`. Docs usam IDs 1–5, runtime usa 62–66. O índice
  omitia rotas detalhadas. Fontes: `q`, `s`, `e`, `r`.

## Coverage materializado

| Requisito | Profundidade | Estado | Limite |
| --- | --- | --- | --- |
| `narrative-qa.continuity` | `deep` | `covered` | conflito; decisão humana |
| `narrative-qa.narrative-flags` | `deep` | `covered` | owners/colisões estáticos |
| `narrative-qa.routes` | `deep` | `covered` | Playtest pendente |
| `narrative-qa.content-regression` | `deep` | `covered` | duplicatas/drift |
| `narrative-qa.documented-reachability` | `deep` | `covered` | runtime pendente |
| `narrative-qa.source-map` | `map` | `mapped` | fontes e gaps localizados |

## Fontes e rastreabilidade

- `n`: packet narrativo aceito e `acceptance/wave-02.json`
- `h`: `docs/GDD/05_History/{timeline*,historia-jornada*,ultima-missao*}.md`
- `q`: `docs/Quests/13-quando-segundo-sol-chegar/00-indice-quests.md`
- `s`: `frontend/data/System.json`
- `e`: `frontend/data/{CommonEvents,MapInfos,Map021,036-038,041-042,053-055,057}.json`
- `r`: `frontend/js/rmmz_objects.js;docs/index.xml`

## Próxima validação

Obter decisão humana sobre cânone/final e morte de Mhordred. Depois, Playtest
das duas cadeias de final, início no Map057, Cena 11, CEs sem callers, flags
V/S conflitantes e quests exclusivas do Map036, registrando reachability e
regressões observadas.
