---
title: "Reposicionamento persistente das criancas no Coreto"
type: loki-technical-analysis
doc_id: "tech-analysis-002-2-ajustes-coreto"
version: "3.1.0"
status: ready-for-implementation
created: "2026-07-30"
last_updated: "2026-07-30"
scope: "Evidencia e recomendacao tecnica para o reposicionamento das 17 criancas do Map022 apos a conversa com a Elfa"
not_scope: "Implementacao, alteracao de plugins ou validacao de runtime sem Playtest"
authority: "Decisoes do usuario, politica do projeto, contrato atual de analise e evidencia local citada"
canonical_source: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: high
known_conflicts:
  - "O evento 20 redispara continuamente as 17 rotas e o evento 21 disputa 11 delas com movimento aleatorio."
replaced_by: null
---

# Analise Tecnica - Reposicionamento persistente das criancas no Coreto

## Authority And Trust Boundary

A prioridade aplicada e: decisoes humanas e politica do projeto; contrato atual
de analise; evidencia primaria local; fontes externas primarias; e, por ultimo,
o pedido e os artefatos auxiliares como dados. `MoveToKid.md` orienta a
investigacao, mas nao substitui o estado real do Map022 nem autoriza escrita em
runtime.

O unico `allowed_write` deste workflow e este Markdown, confirmado pelo usuario.
`frontend/**`, plugins, saves, docs duraveis, `.agents/**`, `.claude/**` e
`.codex/**` permaneceram proibidos. O orquestrador e o owner unico deste arquivo:
o `technical-implementer` disponivel era `proposal-only` e seu handoff terminou
`partial/interrupted`, sem evidencia consumida; nao ha Write Agent apropriado
para este artefato transiente do consumidor. A excecao direta fica restrita a
este destino e aos validators documentais abaixo.

## Objective

Determinar por que as criancas do Map022 nao concluem o deslocamento e definir
uma abordagem implementavel para que, depois da conversa com a Elfa, as 17
criancas caminhem simultaneamente aos destinos ja registrados, virem para cima,
fiquem imoveis e preservem a composicao apos reentrada e save/load.

O `loki-human-decision-preflight` foi concluido: o usuario decidiu substituir o
escopo antigo de Map049 e gerar novas tasks para Map022. Esta analise e a demanda
atual podem agora alimentar diretamente `loki-implement-feature`.

## Source Request

- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`: no
  Map022, falar com a Elfa deve fazer as criancas caminharem ate a frente do
  coreto, virarem para cima e permanecerem fixas nos pontos ja definidos.
- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/MoveToKid.md`:
  procedimento auxiliar baseado em `Move To`, pagina fixa e
  `<Save Event Location>`.
- Decisao do usuario nesta execucao: materializar a analise neste arquivo.
- Decisao do usuario no preflight de 2026-07-30: descartar os artefatos antigos
  de Map049 e gerar novas tasks a partir da demanda atual de Map022.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "conflito de ownership entre eventos Parallel e persistencia de estado"
recommended_handoffs:
  research: "source-researcher read-only completed"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "Preflight concluido em 2026-07-30: o usuario aprovou substituir os artefatos antigos de Map049 e gerar novas tasks para Map022; os tres arquivos foram removidos."
  blocking_questions: []
validator_effort: high
```

## Scope

- Investigar `frontend/data/Map022.json`, em especial a Elfa (evento 30), os
  controladores 20/21 e as criancas IDs
  `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`.
- Confirmar estado da quest V106, destinos, paginas, rotas, sintaxe local do
  Events & Movement Core, persistencia, owners concorrentes e gates.
- Recomendar targets e validators para uma futura escrita estruturada somente
  em `frontend/data/Map022.json`.

## Out Of Scope

- Implementar a recomendacao ou alterar qualquer JSON de runtime nesta fase.
- Alterar `System.json`, `CoretoQuests.json`, plugins, `plugins.js`, Common
  Events, outros mapas, assets, saves ou docs duraveis.
- Alterar o trigger atual da Elfa. A demanda usa "falar", mas o evento 30 usa
  Player Touch; mudar para Action Button exige requisito explicito posterior.
- Suportar migracao arbitraria de saves legados que nunca passaram pelo estado
  V106=10; o fluxo Coreto local declara suporte New Game only.
- Reutilizar ou reconstruir artefatos do escopo antigo de Map049/variavel 36.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` e `CLAUDE.md` | local/project-policy | Em `frontend/data`, preferir VisuStella/Coreto; escrita JSON exige escopo e IDs confirmados | Roteamento e limites |
| `demanda.md` | local/source-request | Resultado perceptivel pedido no Map022 | Objetivo e aceite |
| `MoveToKid.md` | local/auxiliary | Shape 205/505, `Move To`, Turn Up, pagina fixa e notetag de persistencia | Alternativas e validators |
| `frontend/data/MapInfos.json` | local/primary | Map022 e `EX_Coreto` | Target do mapa |
| `frontend/data/Map022.json` | local/primary | Eventos, paginas, owners, rotas, destinos, notas e conflitos atuais | Diagnostico e contrato |
| `frontend/data/System.json` | local/primary | V106 chama-se `v_qNoiteDaHistoria_stage` | Contrato de estado |
| `frontend/data/CoretoQuests.json` | local/primary | Quest `noite-da-historia`; `START` faz 0 -> 10, `COMPLETE_VN` 10 -> 20 e terminal 90 | Ciclo da quest |
| `frontend/js/rmmz_objects.js` | local/engine-primary | Selecao de pagina usa `>=`; Parallel reinicia; 205 forca rota; target 0 e This Event; 123 liga Self Switch | Semantica da abordagem |
| `frontend/js/plugins.js` | local/config-primary | Envelope valido; EventsMoveCore ativo na ordem 13 e QuestCore ativo | Disponibilidade local |
| `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js` | local/plugin-primary | Versao 1.60; `Move To` usa pathfinding; `<Save Event Location>` e event-note e restaura localizacao | Sintaxe, persistencia e riscos |
| `docs/index.xml` | local/durable-index | Catalogo existe, mas nao cobre especificamente Map022/EventsMoveCore/persistencia | Research/doc gate |
| `docs/technology-context.md` | local/durable | `frontend/data/**` e sensivel; inventario estatico nao valida runtime | Limite de claim |
| `docs/domains/gameplay-engineer/README.md` | local/durable | Estado e integracoes distribuidas; save/runtime pendentes | Riscos de integracao |
| `docs/domains/level-designer/README.md` | local/durable | EventsMoveCore afeta fluxo perceptivel e exige Playtest | Human gate |
| `docs/domains/runtime-qa/README.md` | local/durable | Automacao existente nao valida fluxo/save-load em runtime | Human gate |
| Preflight humano de 2026-07-30 e verificacao `Test-Path` | user-decision/local-validator | Map049 foi explicitamente substituido; `tasks.md`, `task-1.1.md` e `task-1.2.md` foram removidos e os tres paths estao ausentes | Topologia do novo plano e liberacao do handoff |

## Agent Handoff Record

| Origin | Destination | Objective | Status | Evidence / next destination |
| --- | --- | --- | --- | --- |
| Orchestrator | `source-researcher` | Mapear Map022, engine e plugins | `complete`, terminal | 17 rotas/destinos, owners e persistencia classificados |
| Orchestrator | `bibliotecario` | Navegar docs pelo catalogo | `complete`, terminal | Cobertura geral encontrada; `catalog_coverage_gap` para EventsMoveCore |
| Orchestrator | `runtime-qa` | Propor validators e Playtest | `complete-runtime-pending`, terminal | Baseline reprova owner unico, latch, conflito aleatorio e persistencia |
| Orchestrator | `technical-implementer` | Comparar abordagens sem escrever | `partial/interrupted`, terminal | Nenhuma evidencia recebida ou consumida; consolidacao assumida pelo orquestrador |
| Technical analysis | `loki-human-decision-preflight` | Resolver colisao dos artefatos de plano | `complete`, terminal | Usuario escolheu substituir Map049; tres artefatos antigos removidos; `ready_for_next_phase=true` |

## Evidence Classification

### Facts

- O Map022 mede 17x27, tem note `<CoretoMapType:EX>` e nao possui
  `<Save Event Locations>`.
- O evento 30 e a Elfa, usa Player Touch e inicia com a guarda `V106 == 0`.
  No ramo verdadeiro, `Coreto_QuestCore/QuestTransition START` leva a quest de
  0 para 10. O evento 30 atual nao contem rotas 205/505.
- Existem exatamente 17 eventos `Crianca`: `1,2,3,5,6,7,8,9,10,11,12,13,14,
  15,16,19,32`.
- Nas 17 criancas, a pagina 2 e ativada por `V106 >= 10`, usa `moveType: 0`,
  imagem voltada para cima (`direction: 8`) e lista vazia. A pagina 3 exige
  adicionalmente Self Switch A e tambem e fixa/vazia. Nenhum setter de A para
  essas criancas existe no Map022 atual.
- As notas dos 17 eventos estao vazias; portanto a persistencia individual do
  EventsMoveCore nao esta configurada.
- O evento 20, pagina 3, e Parallel em `V106 >= 10`. Ele contem exatamente 17
  rotas, uma por crianca, com destinos unicos e dentro do mapa. Cada rota usa
  `code 45 Move To`, `code 19 Turn Up`, `code 0`, `repeat=false`,
  `skippable=false` e `wait=false`, com dois `code 505` espelhados.
- O evento 20 nao possui latch nem comando terminal de estado; o engine reinicia
  a lista Parallel quando ela termina.
- O evento 21, pagina 1, tambem e Parallel e forca movimento aleatorio
  (`code 9`, `repeat=true`) em 11 das mesmas criancas:
  `1,2,6,8,9,11,12,13,14,15,16`. Sua pagina passiva superior so vence quando
  `V106 >= 10` e o Self Switch A do proprio evento 21 estiver ligado; esse setter
  nao existe no fluxo atual.
- O EventsMoveCore 1.60 esta ativo depois do CoreEngine. Seu help local
  documenta `Move To: x, y`, e o parser local reconhece a sintaxe sem distinguir
  maiusculas/minusculas.
- `<Save Event Location>` pertence exclusivamente ao note do evento e salva a
  localizacao para restauracao posterior no mapa.
- O usuario decidiu no preflight de 2026-07-30 que Map022 substitui o escopo
  antigo de Map049 e que novas tasks serao geradas depois. Os tres artefatos
  antigos eram nao rastreados, foram removidos e tiveram ausencia confirmada
  por `Test-Path`.

### Inferences

- O problema principal nao e o cadastro dos destinos: os 17 pares estao
  completos e coerentes. O problema e o ciclo de vida das rotas.
- O evento 20 redispara as rotas porque sua pagina e Parallel e nao tem latch.
  `forceMoveRoute` reinicia o indice da rota; a reemissao pode impedir que o
  `code 19` se torne um estado terminal estavel.
- O evento 21 adiciona uma segunda fonte de forced routes para 11 criancas. Pela
  ordem de atualizacao dos eventos, ele pode substituir a rota emitida pelo
  evento 20 no mesmo ciclo.
- Uma pagina fixa remove movimento autonomo, mas nao cancela um owner externo
  que continua forcando rotas. Por isso `moveType: 0` sozinho nao satisfaz
  "ficar fixa".
- Distribuir uma rota para cada pagina 2, com `target=0`, `wait=true` e Self
  Switch A somente depois da conclusao, permite que as 17 caminhem em paralelo:
  cada wait bloqueia apenas o interprete da propria crianca. A pagina 3 se torna
  o latch terminal individual.
- O `wait=false` do procedimento auxiliar nao e adequado para ligar o latch
  imediatamente: ele permitiria ativar a pagina terminal antes de confirmar a
  chegada. A demanda atual nao exige `wait=false`.

### Hypotheses

- **Runtime pending:** 17 pathfindings simultaneos podem se bloquear ou produzir
  rotas subotimas. O proprio help local declara que o algoritmo nao e perfeito.
- **Runtime pending:** dois destinos estao inicialmente ocupados por outras
  criancas que tambem se moverao: `(12,17)` e `(11,18)`.
- **Runtime pending:** sair ou salvar durante o movimento deve restaurar cada
  crianca incompleta na pagina 2 e permitir nova tentativa; a combinacao exata
  de rota forçada, note e save precisa de Playtest.
- **Runtime pending:** saves derivados corretamente em V106=20/90 devem manter
  os Self Switches A e nao redisparar o movimento.

### Open Questions

- **must_ask_now:** none; a topologia do plano foi decidida pelo usuario.
- **can_delegate_to_plan:** preservar o Player Touch atual da Elfa; eventual
  mudanca para Action Button exige requisito e target explicitos posteriores.
- **can_validate_later:** simultaneidade perceptivel, pathfinding, colisao,
  reentrada e save/load permanecem no gate de Playtest.
- **do_not_ask_llm_can_determine:** IDs, destinos, ownership, latch e mecanismo
  de persistencia sao determinados pelas fontes locais e validators abaixo.

## Human Decision Preflight Result

- **Status:** `ready-for-planning`.
- **Decisao humana:** a demanda de Map022 substitui o escopo antigo de
  Map049/variavel 36 neste diretorio; novas tasks devem ser geradas a partir de
  `demanda.md` e desta analise.
- **Acao autorizada e concluida:** `tasks.md`, `task-1.1.md` e `task-1.2.md`
  foram removidos. Como eram nao rastreados, nao sao recuperaveis pelo historico
  do Git.
- **Evidencia:** os tres paths retornaram `False` em `Test-Path`; o `git status`
  do diretorio nao lista mais esses arquivos.
- **Ready for next phase:** `true`; nao resta `must_ask_now`, approval ou handoff
  aberto antes do planejamento unificado.

## Affected Surfaces

### Runtime, Engine or Framework

- Futuro target unico de runtime: `frontend/data/Map022.json`.
- Engine, EventsMoveCore, QuestCore, `System.json` e `CoretoQuests.json` sao
  dependencias read-only; nenhuma alteracao neles e recomendada.

### Integration Points

- Evento 30 e `QuestTransition START` como origem do estado V106=10.
- Pagina 2 de cada crianca como owner exclusivo da propria rota.
- Pagina 3 de cada crianca e Self Switch A como latch terminal.
- Evento 20/pagina 3 e evento 21/pagina 1 como emissores concorrentes que devem
  deixar de controlar as criancas em V106>=10.
- `Game_Interpreter.command205`, `command123`, forced move routes e selecao de
  paginas por limiar.
- `Move To` e `<Save Event Location>` do EventsMoveCore.
- Evento 18 e progressao posterior para Rheed/evento 17.

### State and Data Contracts

- Variavel existente: V106 `v_qNoiteDaHistoria_stage`; nenhum novo ID e
  necessario.
- Gate da pagina 2: `variableValid=true`, `variableId=106`,
  `variableValue=10`, semanticamente `V106 >= 10`.
- Latch individual: Self Switch A deve ser ligado por `code 123` somente depois
  que a rota `wait=true` terminar; a pagina 3 existente deve vencer e permanecer
  `moveType=0`, `direction=8`, lista vazia.
- Persistencia: exatamente `<Save Event Location>` no note de cada uma das 17
  criancas; nao usar o tag global do mapa, pois ele ampliaria o efeito a eventos
  fora da demanda.
- Destinos existentes a preservar:

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

- Contrato por crianca: pagina 2 `trigger=4`, um `code 205` com target `0`
  (`This Event`), rota `[45 Move To, 19 Turn Up, 0]`, `repeat=false`,
  `skippable=false`, `wait=true`, dois `code 505` espelhados, `code 123 [A,ON]`
  e terminador `code 0`.
- Invariante: para cada crianca existe exatamente um owner ativo de rota em
  V106>=10; evento 20 e evento 21 nao podem emitir movimento para esses targets.

## Research Gate

**Decision:** skipped-with-reason  
**Reason:** pesquisa externa nao foi necessaria. O mapa atual, a engine local,
a configuracao ativa e o help/parser da versao 1.60 instalada definem o contrato
efetivamente executado. O catalogo duravel foi consultado e sua lacuna foi
registrada; uma fonte externa nao substituiria o runtime local.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Nenhuma fonte externa consultada | Recomendacao baseada em fontes primarias locais |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter evento 20 atual | Map022 evento 20/pagina 3 | Destinos ja cadastrados | Parallel sem latch; reseta rotas; evento 21 disputa 11 targets | reject as-is |
| Corrigir evento 20 com latch central | Shape atual e MoveToKid | Um dispatcher | Nao consegue provar a conclusao das 17 rotas `wait=false` sem agregacao adicional; reentrada parcial e fragil | defer |
| Disparar as 17 rotas no evento 30 | Demanda e guarda V106==0 | Relacao direta com a Elfa; one-shot de dispatch | Falta um join robusto das 17 chegadas; saida/save no meio permanece ambigua | viable, not preferred |
| Uma rota Parallel por crianca, com wait e latch individual | Paginas 2/3 existentes; engine 205/123 | Movimento simultaneo, conclusao por crianca, reentrada recuperavel, nenhum novo ID | Exige 17 listas estruturadas e neutralizar eventos 20/21 | use |
| `Set Event Location` nativo | Engine local | Simples e deterministico | Teleporte abrupto; nao satisfaz caminhar | reject |
| Tag global `<Save Event Locations>` | Help local | Uma unica alteracao de note | Persiste todos os eventos do mapa e amplia efeitos colaterais | reject |
| Plugin/customizacao Coreto | Nenhuma lacuna funcional demonstrada | Controle total | Amplia codigo, testes e manutencao | reject |
| Deferir por causa dos artefatos de Map049 | Preflight humano de 2026-07-30 | Nenhum beneficio apos a decisao | Ignoraria o escopo aprovado de Map022 | reject; gate resolved |

## Recommendation

Adotar ownership distribuido: cada crianca executa e conclui apenas a propria
rota na pagina 2; a pagina 3 existente e o estado terminal individual.

Na futura implementacao estruturada de `Map022.json`:

1. Para cada um dos 17 eventos, preencher a pagina 2 com a rota correspondente,
   usando target `0`, `Move To`, Turn Up, `wait=true` e Self Switch A ligado
   somente depois que o movimento terminar. Manter `moveType=0` e direcao 8.
2. Adicionar `<Save Event Location>` ao note de cada crianca, sem tag global.
3. Neutralizar a pagina 3 do evento 20 em V106>=10, removendo seus 17 blocos de
   rota e deixando uma lista terminal vazia; preservar integralmente as paginas
   1/2 de Gab.
4. Fazer a pagina passiva existente do evento 21 vencer apenas com V106>=10,
   sem depender de Self Switch A, para que o controlador aleatorio pare antes
   das rotas das criancas. Preservar os outros campos salvo envelope explicito.
5. Preservar o evento 30 e seu `QuestTransition START`, o evento 18, Rheed/evento
   17, V106 e todos os plugins. Nenhuma nova variavel, switch, pagina, evento ou
   plugin e necessaria.

A alteracao deve partir do Map022 corrente e usar parser estruturado. Nao
restaurar snapshots inteiros nem reutilizar as tasks de Map049.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Dois controladores redefinem rotas | Eventos 20/21 | Validator de owner unico por crianca | structural validator |
| Latch antes da chegada | Wait false do auxiliar | `wait=true` no interprete individual; 123 depois de 205 | engine-semantic validator |
| Colisao/pathfinding entre 17 eventos | Help local e destinos ocupados | Playtest com bloqueios e rotas cruzadas | human-validation |
| Reentrada/save no meio deixa estado parcial | Persistencia ainda ausente | Notetag individual, latch por crianca e testes durante/depois | Playtest/save-load gate |
| V106>=10 inclui 20/90 | Semantica de pagina | Testar progressao derivada 10->20->90 e Self Switches | validator + Playtest |
| Regressao de Gab | Evento 20 possui paginas de Gab | Diff restrito e Playtest de Gab | validator + human-validation |
| Mudanca visual do controlador 21 | Pagina passiva atual tem imagem | Preservar campos por default e validar visualmente | diff validator + Playtest |
| Reintroducao acidental do escopo Map049 | Preflight humano concluido | Gerar o novo plano apenas de `demanda.md` e desta analise | plan validator |
| Docs nao catalogam EventsMoveCore | `docs/index.xml` | Backlog nao bloqueante para `loki-catalogar-docs` | catalogador |

## Validators

- Parse estruturado de `Map022.json`; evento `id` deve corresponder ao indice.
- Resolver exatamente os 17 IDs e os 17 destinos da tabela, todos unicos e
  dentro de `x=0..16`, `y=0..26`.
- Para cada crianca, exigir uma unica rota na pagina 2, target `0`, lista
  `[45,19,0]`, payload `Move To: x, y`, `repeat=false`, `skippable=false`,
  `wait=true`, dois mirrors 505 deep-equal e `code 123 ["A",0]` depois da rota.
- Simular selecao de pagina em V106=0, 9, 10, 20 e 90. Em V106>=10, pagina 2
  deve mover somente quando A esta OFF; pagina 3 deve ser fixa quando A esta ON.
- Exigir `<Save Event Location>` exatamente nos 17 notes; rejeitar tag global.
- Examinar todas as fontes de movimento (`code 205`, move routes de pagina,
  `moveType` e eventos Parallel). Falhar se evento 20 ou 21 ainda puder forcar
  rota nessas criancas em V106>=10.
- Confirmar que evento 20 paginas 1/2, evento 30, evento 18, evento 17/Rheed,
  V106, `CoretoQuests.json`, `System.json` e plugins permanecem semanticamente
  iguais.
- Validar envelope de `plugins.js` e EventsMoveCore ativo; nenhuma escrita de
  configuracao.
- Comparar AST before/after e `git diff`; rejeitar reflow massivo ou alteracao
  fora dos paths exatos aprovados de Map022.
- Se for criado writer/validator com valor de replay, reter sob
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/`.
- Checks estaticos provam estrutura, nao movimento perceptivel.

### Baseline Validators Executed

- `Map022.json`, `MapInfos.json`, `System.json` e `CoretoQuests.json`:
  parse estruturado passou.
- `plugins.js`: envelope `editor-structural` passou com 69 objetos; extracao VM
  confirmou EventsMoveCore ativo na ordem 13.
- Inventario estruturado: 17 criancas, 17 targets unicos, 17 destinos dentro do
  mapa, rotas atuais `[45,19,0]` e 11 conflitos com evento 21 confirmados.
- Sintaxe local de `Move To` e semantica de pagina/205/123 confirmadas no plugin
  e engine instalados.
- Baseline funcional: reprovado para a demanda por redispatch sem latch,
  owner concorrente e ausencia de persistencia.

## Human Gates

- **Preflight de planejamento concluido:** Map022 substitui os artefatos antigos
  de Map049; nenhuma nova pergunta humana bloqueia a geracao das tasks.
- **RPG Maker editor:** fechar o editor antes da escrita; depois abrir,
  salvar, fechar e reabrir para confirmar aceite estrutural.
- **Playtest obrigatorio apos implementacao:** executar pelo menos:
  - V106=0/9: nenhuma convocacao antes de falar com a Elfa.
  - Fluxo normal 0->10: as 17 iniciam no mesmo momento perceptivel, chegam aos
    destinos, viram para cima e ficam imoveis.
  - Aguardar e falar novamente: nenhuma rota reinicia e nao ha jitter.
  - Bloquear temporariamente corredor/destino com o jogador e liberar: nenhuma
    crianca fica em deadlock.
  - Sair/reentrar e salvar/carregar durante e depois do movimento: concluidas
    permanecem; incompletas retomam sem duplicar rotas.
  - Continuar por evento 18, V106=20, Rheed/evento 17 e estado 90: nenhuma
    regressao ou novo deslocamento.
  - Revalidar as paginas de Gab do evento 20 e o console sem erros.
- Reprovar se qualquer crianca falhar, chegar ao target errado, terminar sem
  direcao 8, repetir rota, retomar movimento aleatorio, ficar parcial sem
  recuperacao ou bloquear a progressao.

## Affected Docs

- Nenhum doc duravel precisa mudar para implementar a feature.
- Backlog nao bloqueante: catalogar a documentacao local de Events & Movement
  Core em `docs/index.xml` por `loki-catalogar-docs`.

## Stop Conditions

- Parar se o novo plano reintroduzir Map049/variavel 36 ou usar outra fonte de
  aceite no lugar de `demanda.md` e desta analise.
- Parar se o Map022 corrente divergir dos 17 IDs/destinos/owners antes do write.
- Parar se a mudanca exigir novo ID, outro mapa, plugin, Common Event, asset,
  save ou configuracao sem novo approval.
- Parar se parse, pagina ativa, payload, mirrors 505, owner unico, latch,
  persistencia ou diff restrito falhar.
- Nao declarar runtime validado enquanto editor/Playtest estiver pendente ou
  falhar.
- Se Playtest mostrar que saida/save durante movimento nao recupera as criancas
  incompletas, bloquear a entrega e decidir uma politica adicional de input
  lock ou retomada antes de concluir.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** o preflight de 2026-07-30 registrou que Map022 substitui o escopo
  antigo de Map049; os tres artefatos incompatíveis foram removidos e nao resta
  pergunta `must_ask_now`.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** `none`; preflight concluido com
  `ready_for_next_phase=true`.
- **Implementation demand:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`
- **Analysis file:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md`
- **Inherited restrictions and decisions:** Map022 como unico runtime target;
  ownership distribuido por crianca; V106 existente; 17 IDs/destinos; wait e
  latch individuais; notetag individual; eventos 20/21 sem rotas concorrentes;
  nenhum novo ID; preservar evento 30, evento 18, Rheed e Gab; nao reutilizar
  qualquer escopo ou task de Map049/variavel 36.
- **Validators and human validation:** validators estruturais, engine-semantic,
  owner/latch/persistencia/diff e Playtest descritos acima.
- **Required skills:** `rpg-maker-mz-data-json`,
  `rpg-maker-mz-project-inventory`, `rpg-maker-mz-visustella-plugin-index`,
  `rpg-maker-mz-visustella-events-presentation`,
  `rpg-maker-mz-visustella-notetags` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class=coding`,
  `execution_effort=high`, writer serializado e owner unico de Map022,
  validator/auditor independente, `validator_effort=high`, Playtest obrigatorio.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-implementation"
  sources_read:
    - "AGENTS.md"
    - "CLAUDE.md"
    - "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
    - "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/MoveToKid.md"
    - "human decision preflight 2026-07-30 recorded in this analysis"
    - "docs/index.xml"
    - "docs/technology-context.md"
    - "docs/domains/gameplay-engineer/README.md"
    - "docs/domains/level-designer/README.md"
    - "docs/domains/runtime-qa/README.md"
    - "frontend/data/MapInfos.json"
    - "frontend/data/Map022.json"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json"
    - "frontend/js/plugins.js"
    - "frontend/js/rmmz_objects.js"
    - "frontend/js/plugins/VisuMZ_1_EventsMoveCore.js"
  research_gate: "skipped-with-reason-local-contract-sufficient"
  human_decision_preflight_required: false
  pending_questions: []
  implementation_demand_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
  analysis_file: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
  inherited_restrictions:
    - "frontend/data/Map022.json is the only proposed runtime target"
    - "one route owner per child event"
    - "V106 >= 10 with per-child wait and Self Switch A completion"
    - "individual Save Event Location tags; no map-wide persistence tag"
    - "preserve Event30, Event18, Event17/Rheed, Gab, plugins and existing IDs"
    - "do not reintroduce Map049/variable 36 scope or tasks"
    - "no runtime-valid claim before editor gate and Playtest"
  completed_handoffs:
    source_researcher: "complete"
    bibliotecario: "complete-catalog-coverage-gap"
    runtime_qa: "complete-runtime-pending"
    technical_implementer: "partial-interrupted-no-evidence-consumed"
    human_decision_preflight: "complete-ready-for-next-phase"
  recommended_next_command: "loki-implement-feature"
  next_action: "Run loki-implement-feature with the current demand and this analysis to generate new Map022 tasks and execute them under the declared gates."
  blocked_by: []
```
