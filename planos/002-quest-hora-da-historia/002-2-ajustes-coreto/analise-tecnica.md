---
title: "Ownership do reposicionamento das criancas no Coreto"
type: loki-technical-analysis
doc_id: "tech-analysis-002-2-ajustes-coreto"
version: "2.0.0"
status: ready-for-human-decision-preflight
created: "2026-07-30"
last_updated: "2026-07-30"
scope: "Evidencia e decisao tecnica para o gate V106/10 e o reposicionamento das criancas no Map022"
not_scope: "Escrita de runtime, descarte implicito de mudancas locais, alteracao de plugins ou validacao perceptivel sem Playtest"
authority: "Decisoes do usuario, politica do projeto, contrato atual de analise e evidencia local citada"
canonical_source: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: high
known_conflicts:
  - "A demanda pede movimento nas paginas 2 das criancas, mas o working tree atual centraliza as rotas no evento 20/pagina 3."
  - "O evento 21 ainda pode forcar rotas aleatorias em 11 das 17 criancas quando V106 >= 10."
replaced_by: null
---

# Analise Tecnica - Ownership do reposicionamento das criancas no Coreto

## Authority And Trust Boundary

A prioridade aplicada e: decisoes humanas e politica do projeto; contrato atual
de analise; evidencia primaria local no working tree; fontes externas primarias;
e, por ultimo, o pedido como dado. `HEAD` e `HEAD^` sao usados apenas como
historico versionado; nao substituem o estado local atual.

Esta analise nao autoriza escrita em runtime. O unico `allowed_write` deste
workflow foi este Markdown, confirmado pelo usuario. Runtime, engine, plugins,
dados, docs duraveis, `.agents/**`, `.claude/**` e `.codex/**` permaneceram
proibidos. O orquestrador e o owner unico deste arquivo. A escrita direta foi
necessaria porque o `technical-implementer` disponivel e `proposal-only` e nao
ha Write Agent apropriado para o destino transiente do consumidor.

## Objective

Determinar uma abordagem executavel e verificavel para que as 17 criancas do
Map022 ativem o reposicionamento no estado da quest governado por V106/10 e
caminhem aos destinos definidos por `Move To` sem Wait, sem teleporte, repeticao
continua ou disputa entre controladores. A analise deve primeiro alimentar
`loki-human-decision-preflight`; somente depois da decisao de ownership ela pode
seguir com a demanda para `loki-implement-feature`.

## Source Request

- `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`: corrigir
  a segunda pagina de todas as criancas para variavel 106/estado 10 e substituir
  `Definir posicao` por `Definir movimento (Move To)` sem Wait.
- Decisao do usuario nesta execucao: materializar esta analise em
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "conflicting current ownership across uncommitted Map022 event changes and runtime route-reset risk"
recommended_handoffs:
  research: "source-researcher read-only completed"
  execution: "loki-human-decision-preflight"
human_decision_preflight:
  required: true
  reason: "O working tree possui uma topologia concorrente nos eventos 20/21 que nao pode ser descartada nem preservada por silencio."
  blocking_questions:
    - "O owner das 17 rotas deve voltar a ser a pagina 2 de cada crianca, autorizando reconciliar os eventos 20 e 21, ou o controlador central do evento 20 deve ser preservado e tornado one-shot?"
    - "Ao sair e reentrar no Map022 com V106 >= 10, as criancas devem reaparecer no centro ou a cena e deliberadamente de passagem unica?"
validator_effort: high
```

## Scope

- Investigar `frontend/data/Map022.json`, com foco nos eventos `Crianca` IDs
  `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`, paginas 2 e 3.
- Investigar os eventos 20 e 21 apenas para resolver ownership, repeticao e
  interferencia nas mesmas rotas.
- Confirmar a variavel de quest, os destinos, o contrato local de `Move To`, a
  semantica do engine e os validators/gates necessarios.
- Comparar a abordagem distribuida pedida com o controlador central atual.

## Out Of Scope

- Implementar qualquer alternativa ou descartar mudancas locais do usuario.
- Alterar Map004, Map005, Map046, Common Events, plugins, `plugins.js`,
  `CoretoQuests.json`, assets, saves ou docs duraveis.
- Mudar a maquina de estados da quest ou declarar movimento/timing validado sem
  Playtest humano.
- Usar `git checkout`, reset ou restauracao ampla do snapshot historico.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` | local/project-policy | Para `frontend/data`, preferir VisuStella/Coreto e consultar `docs/rpg-maker-for-ia` | Roteamento e limites |
| `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md` | local/source-request | V106/10, paginas 2, `Move To` sem Wait | Objetivo e aceite |
| `frontend/data/Map022.json` | local/primary/current | Estado atual dos 17 eventos e controladores 20/21 | Ownership e conflito |
| `git show HEAD:frontend/data/Map022.json` | local/versioned-history | Implementacao anterior distribuida com `code 205` | Comparacao, destinos e shape |
| `git show HEAD^:frontend/data/Map022.json` | local/versioned-history | Baseline V26/1 com `code 203` | Confirmacao da causa original |
| `frontend/data/System.json` | local/primary | `startMapId=22`; V26=`v_qNoite_progress`; V106=`v_qNoiteDaHistoria_stage` | Ownership e IDs |
| `frontend/data/CoretoQuests.json` | local/primary | `stageVariableId=106`; `START` 0->10; `COMPLETE_VN` 10->20; terminal 90 | Contrato de estado |
| `frontend/data/MapInfos.json` | local/primary | Map022=`EX_Coreto`; Map004/005 sao variantes distintas | Resolucao do mapa |
| `frontend/js/rmmz_objects.js:9334` | local/engine-primary | Condicao de pagina por variavel usa limiar `>=` | Semantica V106/10 |
| `frontend/js/rmmz_objects.js:9760` | local/engine-primary | `character(0)` resolve `This Event`; valor negativo resolve o jogador | Target correto de rota distribuida |
| `frontend/js/rmmz_objects.js:10530` | local/engine-primary | `command203` chama `locate` | Causa do salto abrupto |
| `frontend/js/rmmz_objects.js:10571` | local/engine-primary | `command205` so espera quando `route.wait=true` | Contrato sem Wait |
| `frontend/js/plugins.js` | local/config-primary | Envelope `editor-structural`; `VisuMZ_1_EventsMoveCore` ativo na ordem 13 | Disponibilidade do plugin |
| `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js:2354` | local/plugin-primary | `Move To: x, y` usa pathfinding e contorna o jogador | Sintaxe e risco |
| `frontend/js/plugins/VisuMZ_1_EventsMoveCore.js:12335` | local/plugin-primary | Parser reconhece coordenadas inteiras em `MOVE TO` | Payload local |
| `docs/index.xml` | local/durable-index | Catalogo existe, mas nao roteia documentacao de Events & Movement Core | Lacuna documental |
| `docs/domains/level-designer/README.md#inventario-factual` | local/durable | EventsMoveCore afeta movimento perceptivel e exige Playtest | Gate humano |
| `docs/technology-context.md` | local/durable | `frontend/data/**` e superficie sensivel; inventario estatico nao valida runtime | Limite de claim |

## Agent Handoff Record

| Origin | Destination | Objective | Status | Evidence / next destination |
| --- | --- | --- | --- | --- |
| Orchestrator | `bibliotecario` | Navegar docs por `docs/index.xml` | `partial`, terminal | EventsMoveCore e Playtest confirmados; payload nao catalogado |
| Orchestrator | `source-researcher` | Mapear estado atual, historico, engine e plugins | `success`, terminal | Conflito entre eventos 20/21 e 17 rotas confirmado |
| Orchestrator | `technical-implementer` | Propor abordagem sem escrever | `partial`, terminal | Um unico owner e preflight humano recomendados |
| Orchestrator | `runtime-qa` | Propor validators e Playtest | `completed-runtime-pending`, terminal | Matriz estrutural e fixtures F0-F8 propostas |
| Orchestrator | engine check | Resolver target divergente do QA | `completed` | `character(0)` e `This Event`; `-1` e jogador |
| Technical analysis | `loki-human-decision-preflight` | Resolver ownership e persistencia/reentrada | `pending external handoff` | Duas perguntas `must_ask_now` abaixo |

## Evidence Classification

### Facts

- Map022 e o owner atual do fluxo: e o mapa inicial, contem a transicao `START`
  da quest e usa V106 como estado de `noite-da-historia`.
- A condicao nativa `variableId=106`, `variableValue=10` significa
  `V106 >= 10`, nao igualdade estrita.
- No working tree atual, as paginas 2 das 17 criancas ja usam V106/10, mas tem
  `trigger=0` e lista apenas com `code 0`; elas nao iniciam movimento.
- Cada crianca possui uma pagina 3 passiva condicionada ao Self Switch A, mas
  nenhum comando atual dessas paginas liga A.
- O evento 20/pagina 3 atual e Parallel, condicionado por V106/10, e emite 17
  `code 205` com `Move To`, `Turn Up`, `repeat=false`, `skippable=false` e
  `wait=false`, sem latch ou estado de conclusao.
- O evento 21 continua Parallel e pode forcar movimento aleatorio em 11 dos 17
  targets: `1,2,6,8,9,11,12,13,14,15,16`. Sua pagina passiva superior exige
  V106/10 e Self Switch A, mas o working tree nao liga esse Self Switch.
- `VisuMZ_1_EventsMoveCore` esta ativo. Seu help local documenta `Move To: x,
  y`; o parser local reconhece a sintaxe.
- `command205` com `wait=false` nao bloqueia o interpretador. Para uma rota na
  pagina da propria crianca, o target correto e `0` (`This Event`), nao `-1`.
- O working tree de Map022 tem alteracoes nao commitadas e reformatacao ampla;
  elas pertencem ao usuario e nao podem ser substituidas por `HEAD`.

### Inferences

- O controlador Parallel do evento 20 reemite suas 17 rotas ao terminar a
  lista; sem latch, nao ha evidencia estatica de execucao unica.
- Como o evento 21 tambem forca rotas e e atualizado depois do evento 20, ele
  pode sobrescrever o destino de 11 criancas, causando jitter, desvio ou falta
  de chegada.
- A topologia distribuida nas paginas 2 e mais aderente a demanda literal e ao
  baseline versionado, mas so e segura se eventos 20 e 21 deixarem de disputar
  as mesmas rotas.
- A topologia central tambem pode atender ao resultado perceptivel, mas muda o
  ownership solicitado e precisa de latch one-shot, desligamento do evento 21
  e aprovacao humana explicita.

### Hypotheses

- **Runtime pending:** 17 pathfindings simultaneos podem competir por tiles ou
  ser bloqueados pelo jogador.
- **Runtime pending:** ligar Self Switch A logo apos disparar uma rota sem Wait
  pode mudar a pagina durante a rota; propriedades da pagina passiva podem
  afetar apresentacao ou conclusao.
- **Runtime pending:** ao sair e reentrar no mapa, Self Switch A pode permanecer
  ligado enquanto os eventos reaparecem em coordenadas de origem, impedindo
  novo reposicionamento.
- **Runtime pending:** saves em V106 >= 20 com latch desligado podem disparar o
  movimento fora da janela narrativa.

### Open Questions

1. A centralizacao atual no evento 20 e intencional? Deve-se:
   - restaurar as rotas nas paginas 2 das 17 criancas e autorizar a reconciliacao
     dos eventos 20/21; ou
   - preservar o evento 20 como owner unico, adicionar execucao one-shot e
     manter as paginas das criancas passivas?
2. Reentrada no Map022 e saves posteriores devem preservar a composicao das
   criancas no centro, ou a cena pode ser tratada como passagem unica?

## Affected Surfaces

### Runtime, Engine or Framework

- Runtime perceptivel do Map022: movimento, colisao, timing, pagina ativa e
  continuidade da cena de Rheed.
- Engine e EventsMoveCore sao dependencias read-only; nenhuma mudanca neles e
  indicada.

### Integration Points

- Page conditions e Parallel events do RPG Maker MZ.
- `Game_Interpreter.command205`, forced move routes e Self Switches.
- Route script `Move To` do `VisuMZ_1_EventsMoveCore`.
- Eventos 20 e 21 como controladores externos das criancas.
- Maquina de estados `noite-da-historia` via V106.

### State and Data Contracts

- Conjunto exato de criancas: `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`.
- Gate solicitado: `variableValid=true`, `variableId=106`,
  `variableValue=10`, semanticamente `V106 >= 10`.
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

- Contrato comum de rota: `code 205`; route list `code 45` com `Move To: X,
  Y`, `code 19` (`Turn Up`) e `code 0`; `repeat=false`, `skippable=false`,
  `wait=false`; sem `code 203` nem Wait de evento.
- Invariante novo obrigatorio: exatamente um owner pode emitir as rotas das 17
  criancas quando V106 >= 10.

## Research Gate

**Decision:** skipped-with-reason  
**Reason:** pesquisa externa nao foi necessaria. O engine local, a configuracao
ativa, o help/parser do plugin instalado e os snapshots versionados definem a
versao efetivamente usada. A documentacao duravel foi consultada e sua lacuna
foi registrada; fontes externas nao substituiriam o working tree atual.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Nenhuma fonte externa consultada | Recomendacao baseada no runtime local |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter evento 20 atual | Map022 evento 20/pagina 3 | Ja contem 17 destinos e sem Wait | Parallel sem latch; evento 21 disputa 11 rotas | reject as-is |
| Distribuir nas paginas 2 | Demanda, `HEAD`, paginas Self Switch A existentes | Aderencia literal; ownership local por crianca; target `0` | Exige reconciliar mudancas atuais nos eventos 20/21 e politica de reentrada | preferred after human decision |
| Centralizar no evento 20 com latch | Working tree atual | Um ponto de dispatch; targets explicitos | Diverge da demanda; exige one-shot, neutralizar evento 21 e resolver reentrada | viable only if explicitly approved |
| `MapOnceParallel`/Common Event | Core Engine local | Semantica one-shot disponivel | Amplia para Common Event e nao resolve por si so persistencia/ownership | reject |
| Implementacao customizada/Coreto | Nenhuma lacuna funcional demonstrada | Controle total | Amplia codigo, testes e manutencao | reject |
| Deferir para preflight | Conflito atual e write scope | Preserva mudancas do usuario e evita owner duplo | Adia implementacao ate duas decisoes | use now |

## Recommendation

Nao implementar diretamente a demanda no estado atual. Executar
`loki-human-decision-preflight` para escolher um unico owner das rotas e a
politica de reentrada/save.

A recomendacao tecnica condicional e a topologia distribuida, por aderir ao
texto da demanda: pagina 2 de cada crianca com V106/10, Parallel, `code 205`
target `0`, `Move To`, `Turn Up`, `wait=false` e latch de conclusao para sua
pagina 3 passiva. Essa opcao so pode seguir se o usuario autorizar a remocao ou
neutralizacao do dispatch concorrente do evento 20 e uma pagina superior do
evento 21 que o impeça de forcar rotas em V106 >= 10.

Se o usuario confirmar que a centralizacao atual e intencional, o planejamento
deve preservar o evento 20 como owner unico, remover qualquer dispatch das
paginas das criancas, tornar o controlador one-shot e neutralizar o evento 21.
Nesse caso, a divergencia em relacao a "segunda pagina de todas as criancas"
deve ficar registrada como decisao aprovada.

Nenhuma alternativa deve restaurar `HEAD` por arquivo inteiro. A implementacao
deve partir do working tree mais recente, editar JSON por parser estruturado e
preservar todas as mudancas locais fora do envelope aprovado.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Dois owners redefinem forced routes | Eventos 20/21 atuais | Validator de owner unico e decisao preflight | human decision + structural validator |
| Reemissao continua das 17 rotas | Evento 20 Parallel sem latch | One-shot verificavel na topologia escolhida | validator + Playtest |
| Onze criancas recebem rotas aleatorias | Evento 21 atual | Desativar seu dispatch em V106 >= 10 | validator + Playtest |
| Colisao ou destino inalcançavel | Help local admite pathfinding imperfeito | Testar bloqueios, rotas cruzadas e todos os destinos | human-validation |
| Pagina passiva assume durante rota | Self Switch A + sem Wait | Comparar propriedades das paginas e observar conclusao | structural validator + Playtest |
| Reentrada/save deixa composicao inconsistente | Self Switch persistente e posicao de mapa runtime | Decidir politica e testar saida/reentrada/save-load | preflight + human-validation |
| Movimento tardio em estado posterior | Condicao nativa e `>= 10` | Testar V106 20/90 e saves legados | human-validation |
| Perda de mudancas locais | Map022 sujo e diff amplo | Patch estrutural sobre estado atual; diff por caminhos | writer + independent validator |
| Docs nao cobrem EventsMoveCore | `docs/index.xml` | Usar fonte local nesta task; catalogacao separada | backlog `loki-catalogar-docs` |

## Validators

- **Preflight estrutural:** parsear o Map022 atual; resolver os 17 IDs/nome
  `Crianca`; registrar paginas, condicoes, triggers, listas, propriedades,
  Self Switches, destinos e todos os callers que emitem move routes para eles.
- **Plugin/config:** validar o envelope de `plugins.js` e confirmar
  `VisuMZ_1_EventsMoveCore` ativo; nenhuma alteracao de configuracao.
- **Engine/payload:** confirmar `code 205`, target `0` para `This Event` na
  opcao distribuida, targets explicitos na opcao central, route `code 45/19/0`,
  `repeat=false`, `skippable=false`, `wait=false` e `code 505` espelhados.
- **Gate/coverage:** V106/10 e conjunto exato dos 17 destinos; ausencia de
  `code 203`, Wait, targets indevidos ou destino duplicado.
- **Owner unico:** falhar se mais de uma pagina/controlador puder forcar rota
  em qualquer uma das 17 criancas quando V106 >= 10.
- **Evento 21:** falhar se sua pagina ativa em V106 >= 10 ainda puder emitir
  movimento aleatorio para qualquer target.
- **One-shot:** a topologia escolhida deve possuir latch/condicao de conclusao
  verificavel; lista Parallel sem estado de conclusao falha.
- **Paginas passivas:** comparar `through`, `priorityType`, `directionFix`,
  imagem, velocidade/frequencia e lista; nenhuma pagina passiva pode executar
  conteudo ou impedir a conclusao da rota.
- **Diff restrito:** JSON valido; somente `frontend/data/Map022.json` e os
  eventos/paginas explicitamente aprovados; sem reflow novo, alteracao de
  plugins ou restauracao de mudancas locais nao relacionadas.
- Se a implementacao materializar writer/validator, rete-los sob
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/builds/`.
- Checks estaticos provam estrutura, nao movimento perceptivel.

## Human Gates

- **Preflight antes do planejamento:** responder as duas perguntas de
  ownership e reentrada/save em `Open Questions`.
- **Playtest obrigatorio apos implementacao:** fixtures minimas:
  - F0: V106=9, latch OFF; nenhuma crianca se move.
  - F1: transicao V106 9->10; as 17 iniciam sem interacao/teleporte, chegam uma
    vez aos destinos e viram para cima.
  - F2: V106=10 com latch concluido; nenhuma rota reinicia.
  - F3: jogador bloqueando destino/corredor e rotas cruzadas; nenhum softlock.
  - F4/F5: save/load durante e depois do movimento; estado coerente.
  - F6: sair e reentrar no Map022; comportamento conforme decisao humana.
  - F7: save legado em V106=20/90 com latch desligado; sem disparo tardio
    indevido.
  - F8: fluxo normal ate Rheed; timing, controle e progressao continuam.
- Reprovar se houver teleport, jitter, reset, repeticao, destino incorreto,
  crianca presa, composicao quebrada, cena iniciada cedo, input bloqueado ou
  estado inconsistente em reentrada/save.

## Affected Docs

- Nenhuma atualizacao duravel e necessaria para resolver o preflight.
- Backlog nao bloqueante: catalogar Events & Movement Core/`Move To` em
  `docs/index.xml` por `loki-catalogar-docs`.

## Stop Conditions

- Parar se o usuario nao decidir entre ownership distribuido e central.
- Parar se a politica de reentrada/save for material para o aceite e permanecer
  indefinida.
- Parar se a alternativa exigir tocar eventos, mapas, plugins, Common Events ou
  dados fora do escopo aprovado no preflight.
- Parar se o estado atual dos 17 eventos, eventos 20/21, plugin ou destinos
  divergir antes da implementacao.
- Parar se parse, owner unico, one-shot, payload, cobertura ou diff restrito
  falhar.
- Nao declarar runtime validado enquanto o Playtest estiver pendente ou falhar.

## Handoff To Next Command

- **Human decision preflight required:** `true`
- **Reason:** o working tree atual preserva uma decisao de topologia nao
  registrada na demanda e cria conflito entre eventos 20/21. Silencio nao
  autoriza desfazer nem consolidar essas mudancas.
- **Recommended next command:** `loki-human-decision-preflight`
- **Preflight input, if required:**
  1. escolher owner distribuido nas paginas 2 ou owner central no evento 20;
  2. definir comportamento exigido em reentrada/save com V106 >= 10.
- **Implementation demand:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md`
- **Analysis file:**
  `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md`
- **Inherited restrictions and decisions:** partir do working tree atual; um
  unico owner; V106>=10; 17 IDs/destinos; `Move To`/Turn Up sem Wait; nenhuma
  restauracao ampla; runtime fora do escopo ate Playtest.
- **Validators and human validation:** parsers/owner/one-shot/payload/diff
  descritos acima e Playtest F0-F8.
- **Required skills:** `rpg-maker-mz-data-json`,
  `rpg-maker-mz-project-inventory`, `rpg-maker-mz-visustella-plugin-index`,
  `rpg-maker-mz-visustella-events-presentation` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class=coding`,
  `execution_effort=high`, writer serializado e owner unico para Map022,
  auditor/validator independente, `validator_effort=high`, Playtest obrigatorio.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-human-decision-preflight"
  sources_read:
    - "AGENTS.md"
    - "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
    - "docs/index.xml"
    - "docs/domains/level-designer/README.md"
    - "docs/technology-context.md"
    - "frontend/data/Map022.json"
    - "git:HEAD:frontend/data/Map022.json"
    - "git:HEAD^:frontend/data/Map022.json"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json"
    - "frontend/data/MapInfos.json"
    - "frontend/js/plugins.js"
    - "frontend/js/rmmz_objects.js"
    - "frontend/js/plugins/VisuMZ_1_EventsMoveCore.js"
  research_gate: "skipped-with-reason-local-contract-sufficient"
  human_decision_preflight_required: true
  pending_questions:
    - "distributed child pages or central event 20 ownership"
    - "required behavior after Map022 reentry and save/load"
  implementation_demand_ref: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/demanda.md"
  analysis_file: "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
  inherited_restrictions:
    - "preserve current dirty working tree and unrelated Map022 changes"
    - "exactly one route owner for child events 1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32"
    - "V106 >= 10 and Move To/Turn Up with route wait=false"
    - "no plugin, Common Event, other map, asset or save writes without new approval"
    - "no runtime-valid claim before Playtest"
  completed_handoffs:
    bibliotecario: "partial-terminal-catalog-gap"
    source_researcher: "success"
    technical_implementer: "partial-terminal-conflict-found"
    runtime_qa: "completed-runtime-pending"
  recommended_next_command: "loki-human-decision-preflight"
  next_action: "Classify and answer the two must_ask_now decisions, then run loki-implement-feature with the approved topology, demand and this analysis file."
  blocked_by:
    - "human ownership decision"
    - "human reentry/save behavior decision"
```
