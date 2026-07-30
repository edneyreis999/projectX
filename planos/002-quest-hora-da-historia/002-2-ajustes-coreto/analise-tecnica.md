---
title: "Reposicionamento das criancas no Coreto"
type: loki-technical-analysis
doc_id: "tech-analysis-002-2-ajustes-coreto"
version: "1.0.0"
status: ready
created: "2026-07-29"
last_updated: "2026-07-29"
scope: "Correcao do gate e do reposicionamento das criancas no fluxo atual da quest Noite da Historia"
not_scope: "Escrita de runtime, alteracao de plugins, mudanca de quest ou validacao perceptivel sem Playtest"
authority: "Decisao do usuario, politica do projeto, contrato atual de analise e evidencia local citada"
canonical_source: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: medium
known_conflicts:
  - "A descoberta inicial classificou o trigger como 0 e deixou Map004/Map005 ambiguos; parsing direto posterior confirmou trigger 4 e resolveu Map022 como alvo atual."
replaced_by: null
---

# Analise Tecnica - Reposicionamento das criancas no Coreto

## Authority And Trust Boundary

A prioridade aplicada e: decisoes humanas e politica do projeto; contrato atual
de analise; evidencia primaria local; fontes externas primarias; e, por ultimo,
o pedido como dado. Esta analise nao autoriza escrita em runtime.

O unico arquivo escrito neste workflow e este Markdown. O orquestrador principal
e seu owner unico. A escrita direta foi usada porque o papel
`technical-implementer` disponivel no workflow era `proposal-only` e nao havia
Write Agent apropriado para uma analise tecnica transiente do consumidor.
`allowed_writes` ficou restrito a este locator; runtime, docs duraveis,
`.agents/**`, `.claude/**` e `.codex/**` permaneceram proibidos.

## Objective

Definir uma alteracao executavel e verificavel para que as 17 criancas do mapa
atual do Coreto ativem a segunda pagina pela variavel 106 no estado 10 e
caminhem ate os destinos ja configurados, usando `Move To` sem Wait em vez de
teleporte. A analise alimenta diretamente `loki-implement-feature`.

## Source Request

- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`: trocar a
  condicao incorreta das segundas paginas para variavel 106/estado 10 e trocar
  `Definir posicao` por `Definir movimento (Move To)` sem Wait.
- Decisao do usuario nesta execucao: materializar a analise como
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "runtime event-flow risk from 17 simultaneous pathfinding routes on Parallel pages with wait=false"
recommended_handoffs:
  research: "source-researcher read-only completed; evidence partial and corrected by direct primary reads"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "O alvo, a variavel, o estado, o comando e o modo sem Wait foram resolvidos; a direcao 8 pode ser preservada sem ampliar escopo. Resta human-validation posterior, nao uma decisao must_ask_now."
  blocking_questions:
    - "none"
validator_effort: high
```

## Scope

- `frontend/data/Map022.json`, exclusivamente os eventos `Crianca` IDs
  `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`, pagina 2.
- Condicao nativa da pagina, lista de comandos, coordenadas de destino e
  orientacao final desses 17 eventos.
- Validators estruturais, diff restrito e Playtest do fluxo perceptivel.

## Out Of Scope

- `frontend/data/Map004.json` (`Coreto Release`) e
  `frontend/data/Map005.json` (`Coreto`), copias legadas/demo sem as transicoes
  atuais da quest.
- Outras paginas ou eventos de `Map022`, inclusive Rheed, controlador da
  convocacao, Map046 e Map045.
- `System.json`, `CoretoQuests.json`, `plugins.js`, plugins, Common Events,
  assets, saves existentes ou documentacao duravel.
- Mudar a maquina de estados da quest, a semantica nativa de limiar da condicao
  de pagina ou declarar runtime validado sem Playtest.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` | local/project-policy | Alteracoes em `frontend/data` devem preferir VisuStella/Coreto e consultar `docs/rpg-maker-for-ia` | Roteamento da solucao e gates |
| `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md` | local/source-request | Variavel 106, estado 10, `Move To` e sem Wait | Objetivo e aceite |
| `frontend/data/MapInfos.json` | local/primary | Map 22 e `EX_Coreto`; Map 4 e Map 5 sao variantes distintas | Resolucao do alvo |
| `frontend/data/System.json` | local/primary | `startMapId=22`; v26=`v_qNoite_progress`; v106=`v_qNoiteDaHistoria_stage` | Ownership atual e contrato de IDs |
| `frontend/data/CoretoQuests.json` -> `noite-da-historia` | local/primary | `stageVariableId=106`; `START` 0->10; `COMPLETE_VN` 10->20; terminal 90 | Contrato de estado |
| `frontend/data/Map022.json` | local/primary | Unico mapa com `QuestTransition START` e `ARRIVE_MAP045`; 17 criancas com pagina 2 Parallel, gate 26/1 e `code 203` | Alvo, cobertura e baseline |
| `frontend/data/Map004.json`, `frontend/data/Map005.json` | local/primary/comparison | Duplicam criancas e destinos, mas nao possuem as transicoes atuais da quest | Rejeitar escrita nas copias |
| `frontend/js/rmmz_objects.js:9334` | local/engine-primary | Condicao de variavel em pagina e satisfeita quando valor atual e maior ou igual ao limiar | Semantica `V106 >= 10` |
| `frontend/js/rmmz_objects.js:10530` | local/engine-primary | `command203` chama `locate(x,y)` e aplica direcao | Causa do salto abrupto |
| `frontend/js/rmmz_objects.js:10571` | local/engine-primary | `command205` usa `forceMoveRoute` e so entra em wait mode quando `route.wait` e true | Shape e semantica sem Wait |
| `frontend/js/rmmz_objects.js:7542`, `frontend/js/rmmz_objects.js:7700` | local/engine-primary | Move-route `code 19` e `Turn Up`, direcao 8 | Preservacao de orientacao |
| `frontend/js/plugins.js` | local/config-primary | Envelope `editor-structural`; `VisuMZ_1_EventsMoveCore` ativo na ordem 13 | Disponibilidade do plugin |
| `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js:2354` | local/plugin-primary | `Move To: x, y` usa pathfinding do RPG Maker e contorna o jogador | Sintaxe e risco |
| `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js:12335` | local/plugin-primary | Parser local reconhece `MOVE TO` com coordenadas inteiras | Compatibilidade do payload |
| `docs/index.xml` e `docs/rpg-maker-for-ia/docs-visustella/visustella-core-engine/index.md#mapa-da-documentacao` | local/durable-index | Catalogo nao oferece rota para Events & Movement Core/Coreto `Move To` | Lacuna documental, nao blocker |

## Agent Handoff Record

| Origin | Destination | Objective | Status | Evidence / next destination |
| --- | --- | --- | --- | --- |
| Orchestrator | `bibliotecario` | Navegar docs por `docs/index.xml` | `partial_catalog_gap` | `catalog_no_route_coreto_move_to`; evidencia local primaria usada em seguida |
| Orchestrator | `source-researcher` | Mapear mapas, eventos, condicoes e comandos | `partial` | IDs, destinos, plugin e engine confirmados; conflito de trigger/alvo corrigido por parsing direto |
| Orchestrator | `runtime-qa` | Propor validators e Playtest | `completed-runtime-pending` | Checklist estrutural e gate humano incorporados abaixo |
| Orchestrator | `technical-implementer` | Propor abordagem `proposal-only` | `unavailable-stopped` | Nao retornou completion record apos retomadas; sem escrita; evidencia primaria e QA foram suficientes para consolidacao |
| Technical analysis | `loki-implement-feature` | Planejar, editar Map022 e validar | `pending` | Demand + este Markdown |

## Evidence Classification

### Facts

- O fluxo atual da quest reside em Map022: o jogo inicia nesse mapa e somente
  ele contem `QuestTransition START` e `ARRIVE_MAP045` para
  `noite-da-historia`.
- A quest usa a variavel 106; `START` leva o estado de 0 para 10.
- Map022 possui exatamente 17 eventos `Crianca` alvo, todos com segunda pagina
  `trigger=4` (Parallel), `priorityType=1`, `through=false`, condicao atual
  `V26 >= 1` e lista `[code 203, code 0]`.
- `code 203` localiza instantaneamente o evento, explicando o reposicionamento
  abrupto. Os destinos sao unicos e o comando atual termina com direcao 8.
- `VisuMZ_1_EventsMoveCore` esta ativo e documenta `Move To: x, y` via
  pathfinding. `command205` com `wait:false` nao bloqueia o interpretador.
- A condicao nativa solicitada significa `V106 >= 10`, nao igualdade estrita.

### Inferences

- Map022 e o unico target autorizado desta demanda; Map004 e Map005 sao
  comparacoes legadas e devem permanecer sem diff.
- A alternativa mais aderente e uma move route por crianca com target `0`
  (`This Event`), script `Move To`, `wait:false` e os mesmos destinos.
- Adicionar `Turn Up` (`code 19`) depois de `Move To` preserva a direcao 8 do
  baseline sem exigir nova decisao de design.
- Manter `trigger=4` respeita o pedido de alterar a segunda pagina, mas amplia o
  risco de a pagina Parallel reforcar a rota enquanto ela ainda executa.

### Hypotheses

- **Nao resolvida ate Playtest:** as paginas Parallel podem reiniciar a rota
  `wait:false`, gerando jitter, recomputacao ou falta de progresso.
- **Nao resolvida ate Playtest:** 17 pathfindings simultaneos podem se bloquear;
  alguns destinos comecam ocupados por outras criancas que tambem se moverao.
- **Nao resolvida ate Playtest:** posicao do jogador, reentrada e save/load no
  meio da caminhada podem mudar as rotas ou repetir o movimento.

### Open Questions

- Nenhuma pergunta `must_ask_now` antes do planejamento.
- Gate posterior: confirmar em Playtest que todas caminham uma unica vez, sem
  jitter/softlock, chegam ao contrato de coordenadas, ficam voltadas para cima
  e nao impedem a cena de Rheed.

## Affected Surfaces

### Runtime, Engine or Framework

- Runtime afetado: Map 22, eventos de mapa e movimento perceptivel.
- Engine e plugins sao dependencias read-only; nenhuma mudanca neles e indicada.

### Integration Points

- Page conditions do RPG Maker MZ.
- `Game_Interpreter.command205` e move routes serializadas em data JSON.
- Route script `Move To` do `VisuMZ_1_EventsMoveCore`.
- Maquina de estados `noite-da-historia` via variavel 106.

### State and Data Contracts

- Pagina 2 dos 17 eventos deve usar `variableValid=true`, `variableId=106`,
  `variableValue=10`; por contrato nativo isso e `V106 >= 10`.
- Cobertura exata: `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`.
- Destinos preservados:

| Event ID | Destination | Event ID | Destination |
| ---: | --- | ---: | --- |
| 1 | `(4,15)` | 10 | `(9,18)` |
| 2 | `(7,16)` | 11 | `(9,16)` |
| 3 | `(8,17)` | 12 | `(11,18)` |
| 5 | `(5,16)` | 13 | `(4,17)` |
| 6 | `(7,18)` | 14 | `(8,15)` |
| 7 | `(10,15)` | 15 | `(10,17)` |
| 8 | `(5,18)` | 16 | `(6,15)` |
| 9 | `(11,16)` | 19 | `(12,17)` |
| 32 | `(6,17)` |  |  |

- Shape recomendado por pagina:

```json
[
  {
    "code": 205,
    "indent": 0,
    "parameters": [
      0,
      {
        "list": [
          { "code": 45, "parameters": ["Move To: X, Y"], "indent": null },
          { "code": 19, "indent": null },
          { "code": 0 }
        ],
        "repeat": false,
        "skippable": false,
        "wait": false
      }
    ]
  },
  { "code": 505, "indent": 0, "parameters": [{ "code": 45, "parameters": ["Move To: X, Y"], "indent": null }] },
  { "code": 505, "indent": 0, "parameters": [{ "code": 19, "indent": null }] },
  { "code": 0, "indent": 0, "parameters": [] }
]
```

## Research Gate

**Decision:** skipped-with-reason  
**Reason:** pesquisa externa nao foi necessaria. A instalacao local, a
configuracao ativa, o help do plugin, o parser do plugin, o engine e exemplos
estruturados do proprio projeto definem o contrato da versao efetivamente usada.
O catalogo duravel foi consultado e registrou a lacuna
`catalog_no_route_coreto_move_to`; navegar ou pesquisar versoes externas nao
substituiria o estado local.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Nenhuma fonte externa consultada | Decisao baseada no runtime local |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter `Set Event Location` nativo | Map022 + `command203` | Simples e deterministico | Teleporta e contradiz o pedido | reject |
| Events & Movement Core `Move To` | Plugin ativo, help local, engine e exemplos locais | Reusa dependencia instalada, pathfinding e `wait:false`; atende o pedido | Risco de colisao e reentrada em paginas Parallel | use |
| Implementacao customizada/Coreto | Nenhuma lacuna funcional local que a exija | Poderia centralizar ou guardar execucao unica | Amplia runtime, testes e manutencao sem necessidade demonstrada | reject |
| Alterar tambem Map004/Map005 | Copias estruturais locais | Uniformizaria copias | Amplia escopo e toca mapas sem ownership da quest atual | reject |
| Deferir/bloquear | Hipoteses runtime ainda pendentes | Evita risco perceptivel imediato | O risco pode ser tratado por validator + Playtest | reject; gate after implementation |

## Recommendation

Executar uma edicao estruturada somente em `frontend/data/Map022.json`. Nas
segundas paginas dos 17 IDs listados:

1. substituir apenas `variableId:26`/`variableValue:1` por
   `variableId:106`/`variableValue:10`, preservando os demais campos;
2. substituir o `code 203` por `code 205`, target `0`, contendo o route script
   canonico `Move To: X, Y`, as coordenadas atuais, `Turn Up`,
   `repeat:false`, `skippable:false` e `wait:false`;
3. serializar os `code 505` correspondentes e manter os terminadores;
4. preservar `trigger=4`, graficos, prioridade, through, posicoes iniciais,
   demais paginas e todos os arquivos fora do target.

O writer downstream deve usar parser JSON e um script materializado em
`planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/` para que a
edicao e os validators sejam reproduziveis. Substituicao textual ampla e
reformatacao integral sao proibidas.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Rota reforcada continuamente por pagina Parallel | `trigger=4`, `wait:false`; QA proposal | Validator preserva shape; Playtest observa jitter/reset/progresso; falha bloqueia conclusao | runtime-qa + human-validation |
| Colisao entre 17 criancas ou com jogador | Pathfinding local contorna jogador; destinos inicialmente ocupados em alguns casos | Testar 9->10 com jogador em rotas/destinos e conferir todos os destinos | human-validation |
| Regressao de direcao | Baseline `code203` usa direcao 8 | Incluir `Turn Up` (`code19`) e validar posicao/direcao final | structural validator + Playtest |
| Ativacao antecipada/tardia | Condicao nativa e limiar `>=` | Testar V106 0, 9, 10, 20 e 90 com V26 variando | validator + Playtest |
| Reentrada ou save/load repete/interrompe rotas | Estado do mapa e rotas sao runtime | Testar saida/retorno e save/load durante/depois do movimento | human-validation |
| Drift para mapas legados | Map004/005 duplicam estrutura | Diff deve demonstrar ausencia total de mudanca nesses mapas | restricted-diff validator |
| Documentacao nao roteia `Move To` | `catalog_no_route_coreto_move_to` | Usar evidencia local nesta task; abrir catalogacao separada, sem bloquear runtime | catalogador backlog |

## Validators

- Parse JSON de `frontend/data/Map022.json` antes e depois.
- Validator estruturado com cobertura exata dos 17 IDs, nome `Crianca`, pagina
  2, `trigger=4`, `priorityType=1`, `through=false` e demais campos preservados.
- Assertar `variableValid=true`, `variableId=106`, `variableValue=10` em todos
  os alvos e ausencia do gate 26/1 nessas paginas.
- Assertar ausencia de `code 203` apenas nas paginas alvo.
- Assertar um `code 205` por alvo, target `0`, route `repeat:false`,
  `skippable:false`, `wait:false`, `code45` com destino exato, `code19`,
  terminador interno, `code505` espelhados e terminador externo.
- Assertar 17 destinos inteiros, unicos e dentro de Map022 (`17x27`).
- Validar novamente o envelope de `plugins.js` read-only e confirmar
  `VisuMZ_1_EventsMoveCore` ativo; nenhuma mudanca de configuracao.
- `git diff -- frontend/data/Map022.json` deve ser sem reflow e restrito aos
  campos/command lists aprovados; `Map004.json` e `Map005.json` sem diff da task.
- O validator prova estrutura, nao movimento perceptivel.

## Human Gates

- **Playtest obrigatorio:** registrar baseline incorreto e, depois da mudanca,
  testar V106 em 0, 9, 10, 20 e 90, inclusive com V26=0/1.
- Na transicao 9->10, observar continuamente as 17 criancas: inicio visivel,
  ausencia de teleporte, jitter, reset, loop e softlock; controle do jogador;
  chegada aos 17 destinos; orientacao para cima; e continuidade da cena de
  Rheed.
- Repetir com o jogador bloqueando caminhos/destinos, ao sair e retornar ao
  mapa e com save/load durante e depois da caminhada.
- Qualquer rota que nao conclua, oscile, seja reforcada indefinidamente ou
  bloqueie a cena reprova o gate e exige retorno ao planejamento; nao declarar
  runtime validado com checks estaticos.

## Affected Docs

- Nenhuma atualizacao duravel e necessaria para implementar a demanda.
- Backlog nao bloqueante: catalogar Events & Movement Core/`Move To` em
  `docs/index.xml` por `loki-catalogar-docs`, pois a rota atual esta ausente.

## Stop Conditions

- Parar se Map022 deixar de ser o owner do `START` da quest ou se o conjunto de
  17 IDs/paginas/destinos divergir no momento da implementacao.
- Parar se `VisuMZ_1_EventsMoveCore` estiver inativo ou o payload local nao for
  mais reconhecido.
- Parar se a solucao exigir mudar Map004, Map005, plugins, quest, Common Events,
  assets ou qualquer arquivo nao aprovado.
- Parar se parse, cobertura, shape, coordenadas ou diff restrito falhar.
- Nao concluir a implementacao enquanto o Playtest estiver pendente ou falhar.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** alvo e ownership foram resolvidos por fontes primarias; variavel,
  estado, `Move To`, sem Wait e preservacao da direcao estao decision-complete.
  O gate humano restante ocorre depois da implementacao para validar runtime.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none
- **Implementation demand:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`
- **Analysis file:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md`
- **Inherited restrictions and decisions:** somente Map022; 17 IDs/pagina 2;
  V106>=10; Move To com destinos preservados, Turn Up e wait=false; Map004,
  Map005, plugins e demais superficies proibidos.
- **Validators and human validation:** parser JSON, cobertura/shape/coordenadas,
  plugin ativo read-only, diff restrito e Playtest completo descrito acima.
- **Required skills:** `rpg-maker-mz-data-json`,
  `rpg-maker-mz-project-inventory`, `rpg-maker-mz-visustella-plugin-index`,
  `rpg-maker-mz-visustella-events-presentation` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class=coding`,
  `execution_effort=high`, writer serializado para Map022, auditor/validator
  independente, `validator_effort=high`, human-validation obrigatoria.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready"
  sources_read:
    - "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
    - "AGENTS.md"
    - "docs/index.xml"
    - "frontend/data/MapInfos.json"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json"
    - "frontend/data/Map022.json"
    - "frontend/data/Map004.json"
    - "frontend/data/Map005.json"
    - "frontend/js/plugins.js"
    - "frontend/js/rmmz_objects.js"
    - "frontend/js/plugins/VisuMZ_1_EventsMoveCore.js"
  research_gate: "skipped-with-reason-local-contract-sufficient"
  human_decision_preflight_required: false
  pending_questions: []
  pending_human_gate:
    - "Playtest de 17 rotas Parallel com wait=false, colisao, direcao, reentrada e save/load"
  implementation_demand_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
  analysis_file: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
  inherited_restrictions:
    - "write only frontend/data/Map022.json during implementation"
    - "events 1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32 page 2 only"
    - "Map004, Map005, plugins, quest and all other runtime surfaces forbidden"
    - "no runtime-valid claim before Playtest"
  agent_handoffs:
    bibliotecario: "partial_catalog_gap"
    source_researcher: "partial_then_resolved_by_primary_reads"
    runtime_qa: "completed_runtime_pending"
    technical_implementer_proposal: "unavailable_stopped_no_write"
  recommended_next_command: "loki-implement-feature"
  next_action: "Run loki-implement-feature with demand and analysis_file, create retained structured writer/validator under active plan builds, then execute static gates and Playtest."
  blocked_by: []
```
