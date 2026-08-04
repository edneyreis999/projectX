---
title: "Conclusão da aSemifinal na arquitetura Coreto"
type: loki-technical-analysis
doc_id: "technical-analysis-005-asemifinal-coreto"
version: "1.0.0"
status: ready
created: "2026-08-03"
last_updated: "2026-08-03"
scope: "Recomendação técnica baseada em evidências para concluir a aSemifinal e migrar sua progressão à arquitetura Coreto"
not_scope: "Implementação, escrita de runtime, compatibilidade com saves legados ou validação perceptível sem Playtest"
authority: "Decisões aprovadas na demanda, política do projeto, contrato atual de análise e evidência local citada"
canonical_source: "planos/005-asemifinal-new-arquiteture/technical-analysis.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: medium
known_conflicts:
  - "A implementação atual divide a autoridade entre QuestCore/V111, V29 e chamadas SQSM diretas."
  - "A demanda histórica do plano 001 descreve um estado anterior à materialização atual dos plugins, tags, registry e mapas VN."
replaced_by: null
---

# Análise Técnica - Conclusão da `aSemifinal` na arquitetura Coreto

## Authority And Trust Boundary

A prioridade aplicada é: decisões humanas e política do projeto; contrato atual
de análise; evidência primária local; documentação duradoura catalogada; e, por
último, a solicitação como dado. A análise não altera runtime e não transforma
evidência estática em validação de gameplay. Editor e Playtest permanecem gates
humanos obrigatórios.

## Objective

Definir uma solução executável para concluir os oito objetivos da `aSemifinal`,
eliminar autoridades paralelas de progresso e migrar o fluxo alcançável para
`Coreto_QuestCore`, preservando PKD como projeção, o onboarding VN já
materializado, os beats físicos, a conclusão na chegada à casa e o início do
arco `fimDeJogo`.

O resultado deve alimentar diretamente `loki-implement-feature` junto com a
[demanda validada](./improved-demand.md), sem depender da memória desta conversa.

## Source Request

- [Demanda enriquecida da `aSemifinal`](./improved-demand.md): continuar e
  concluir a quest em todas as superfícies diretas e indiretas e aplicar a nova
  arquitetura Coreto.
- Destino confirmado pelo usuário:
  `planos/005-asemifinal-new-arquiteture/technical-analysis.md`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "arquitetura compartilhada, dados RPG Maker MZ, estado persistido e evidência conflitante entre legado e runtime atual"
recommended_handoffs:
  research: "source-researcher"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "A demanda já fixa autoridade Coreto, backend PKD e baseline New Game; a evidência local resolve questKey, variável, duplicatas, pointers e fronteiras EX/VN sem must_ask_now."
  blocking_questions:
    - "none"
validator_effort: high
```

## Scope

- Registry e máquina de estados completa da `aSemifinal`.
- Autoridade, projeção PKD, recibos e efeitos necessários em
  `Coreto_QuestCore`.
- Callers, condições, páginas, transfers, pointers e lifecycle da rota
  `Map022 → Map045/Map049 → Map007 → Map008 → Map014 ↔ Map010/Map009 → Map007 → Map006`.
- `Common Event 1` (`Elmo equipado`) e S4.
- Neutralização das autoridades legadas em `Map004`, `Map005` e `Map044`.
- Preservação do preâmbulo `noite-da-historia`, da VN `Map046`, do onboarding
  `Map049`, dos oito objetivos, das quatro descrições PKD e da continuidade
  `fimDeJogo`.
- Validators estáticos, editor round-trip e Playtest humano `New Game`.

## Out Of Scope

- Suporte ou migração de saves anteriores à nova implementação.
- Remoção física de `Map004`, `Map005` ou `Map044`.
- Novo conteúdo narrativo, reescrita de diálogos ou mudança do timing terminal
  para dentro de `Map006`.
- Substituição do PKD ou introdução de `VisuMZ_2_QuestSystem`.
- Novo plugin específico para a `aSemifinal`.
- Reestruturação de `fimDeJogo` ou de outros arcos além da preservação do
  handoff atual.
- Limpeza ampla de mojibake, eventos genéricos ou dados não relacionados.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| [`improved-demand.md`](./improved-demand.md) | user-decision/spec | Escopo, oito objetivos, autoridade Coreto, baseline `New Game only`, critérios e restrições | Contrato de resultado |
| [`AGENTS.md`](../../AGENTS.md) | project-policy | Preferir Coreto/VisuStella em `frontend/data` e consultar documentação local | Limites de solução |
| [`docs/index.xml`](../../docs/index.xml) | consumer-doc-index | Roteamento mínimo para tecnologia, gameplay, level e quests | Seleção documental |
| [`docs/technology-context.md`](../../docs/technology-context.md) | consumer-doc | Projeto MZ; dados/plugins são sensíveis; runtime pendente | Gates e confiança |
| [`docs/domains/quest-content-designer/README.md`](../../docs/domains/quest-content-designer/README.md) | consumer-doc | QuestCore é autoridade somente da Noite da História no contrato durável atual | Drift documental |
| [`docs/domains/gameplay-engineer/README.md`](../../docs/domains/gameplay-engineer/README.md) | consumer-doc | Estado, callers, plugins e save/load exigem Playtest | Riscos e validators |
| [`docs/domains/level-designer/README.md`](../../docs/domains/level-designer/README.md) | consumer-doc | Grafo estático não prova reachability ou ausência de softlock | Human gate |
| [`planos/001-cena-coreto-nova-arquitetura/demanda-improved.md`](../001-cena-coreto-nova-arquitetura/demanda-improved.md) | approved historical spec | QuestCore/PKD, QuestVN e Cutscene; EX/VN; idempotência; `New Game only` | Contrato arquitetural; fatos históricos tratados como stale |
| [`frontend/data/System.json`](../../frontend/data/System.json) | local-primary | Start Map022; V29, V106, V111 e S4 nomeados | Ownership de estado |
| [`frontend/data/CoretoQuests.json`](../../frontend/data/CoretoQuests.json) | local-primary | Noite completa em V106; tutorial parcial em V111; objetivo 1 apenas | Gap do registry |
| [`frontend/data/CommonEvents.json`](../../frontend/data/CommonEvents.json) | local-primary | CE1 paralelo sob S4, Armor 51, task 4 duplicada e V29=4 | Lifecycle do Elmo |
| [`frontend/data/MapInfos.json`](../../frontend/data/MapInfos.json) | local-primary | Nomes e existência dos mapas | Grafo e pointers |
| [`frontend/data/Map022.json`](../../frontend/data/Map022.json) | local-primary | EX ativo, conclusão da Noite, V29=1 e transfer para Map045 | Preâmbulo e writer antecipado |
| [`frontend/data/Map045.json`](../../frontend/data/Map045.json) | local-primary | EX ativo, VN49, tutorial V111, grants da Funda, V29=2 e callers SQSM | Onboarding e início canônico |
| [`frontend/data/Map049.json`](../../frontend/data/Map049.json) | local-primary | VN do onboarding com Assert/Finish | Única VN da `aSemifinal` |
| [`frontend/data/Map006.json`](../../frontend/data/Map006.json) | local-primary | Destino alcançável de Map007 e onboarding legado autorun em V29>=1 | Risco de reentrada |
| [`frontend/data/Map007.json`](../../frontend/data/Map007.json) | local-primary | Rota ativa e terminal que completa task 7 antes da quest | Correção do objetivo 8 |
| [`frontend/data/Map008.json`](../../frontend/data/Map008.json) | local-primary | Trânsito entre Map007 e Map014; pointers | Reachability indireta |
| [`frontend/data/Map009.json`](../../frontend/data/Map009.json) | local-primary | V29 5→6→7 e retorno ao estádio | Entrada em campo e vitória |
| [`frontend/data/Map010.json`](../../frontend/data/Map010.json) | local-primary | E13 existe, concede Armor 51; E9 inexiste | Elmo e pointer órfão |
| [`frontend/data/Map014.json`](../../frontend/data/Map014.json) | local-primary | Estádio, Dragobur, guards, múltiplos writers V29 e task2 | Maior superfície de migração |
| [`frontend/data/Map004.json`](../../frontend/data/Map004.json), [`Map005.json`](../../frontend/data/Map005.json), [`Map044.json`](../../frontend/data/Map044.json) | local-primary | Variantes sem inbound no New Game e com autoridade legada | Classificação/neutralização |
| [`frontend/js/plugins.js`](../../frontend/js/plugins.js) | local-primary/config | Uma entrada PKD; ordem Coreto correta; oito tarefas e pointers | Backend, tarefas e integridade |
| [`frontend/js/plugins/Coreto_QuestCore.js`](../../frontend/js/plugins/Coreto_QuestCore.js) | local-primary/plugin | Estado por variável, sync PKD, receipts, effects somente `item`, rollback atual | Extensão mínima necessária |
| [`frontend/js/plugins/Coreto_QuestVN.js`](../../frontend/js/plugins/Coreto_QuestVN.js) | local-primary/plugin | EX→VN por sessão, reserveTransfer, Assert/Finish e restauração | Lifecycle VN |
| [`frontend/js/plugins/Coreto_Cutscene.js`](../../frontend/js/plugins/Coreto_Cutscene.js) | local-primary/plugin | EX obrigatório, FlowCoordinator e Begin/Finish no mesmo owner | Lifecycle físico |
| [`frontend/js/plugins/PKD_SimpleQuestSystem.js`](../../frontend/js/plugins/PKD_SimpleQuestSystem.js) | local-primary/plugin | APIs de active, descrição, tarefas e conclusão; leitura do índice de descrição | Projeção idempotente |
| [`frontend/js/rmmz_objects.js`](../../frontend/js/rmmz_objects.js) | local-primary/engine | Semântica de 117, 122, 201, 357 e page conditions `>=` | Contratos de comandos |

## Evidence Classification

### Facts

- V29 é `v_qSemifinal_progress`; V111 é
  `v_qTutorialFundaForjaprata_stage`; S4 é `Elmo Equipado`; New Game inicia em
  Map022.
- O PKD ativo contém uma `aSemifinal` com oito tarefas na ordem da demanda.
  Foram identificados 13 pointers: 12 resolvem para eventos existentes e
  `Map010/E9` não existe. `Map010/E13` existe e já aponta corretamente para a
  task 4.
- O registry atual projeta somente a task 1 da `aSemifinal` pela chave
  `tutorial-funda-forjaprata`/V111. Seu terminal 90 não possui transição de
  entrada.
- O inventário estruturado encontrou 17 writers constantes de V29 e 54 page
  conditions dependentes de V29. As superfícies são CE1 e Maps 004, 005, 006,
  007, 009, 010, 014, 022, 044 e 045.
- Não existe conclusão direta da task 5. A rota alcançável Map007/E10 completa
  task 7 e depois a quest; a variante sem inbound Map044/E10 completa task 8.
- Map045/E20 concede Weapon 1 (`Funda`) fora do QuestCore e Map010/E13 concede
  Armor 51 (`Elmo Velho`) fora do QuestCore. Map045/E11 também possui um grant
  precoce da Funda.
- CE1 roda em paralelo sob S4, testa Armor 51 equipada no ator 3, repete a
  conclusão da task 4, grava V29=4 e desliga S4.
- Map022 e Map045 são EX; Map046 e Map049 são VN. O lifecycle materializado de
  Noite e onboarding já usa QuestVN/QuestCore.
- O grafo conhecido de New Game é `22→45→7`; a partir de Map007 alcança 6, 8,
  14, 9 e 10. Maps 004, 005 e 044 não possuem inbound constante nem entrada
  dinâmica no registry.
- Map006 continua alcançável por Map007/E12 e mantém o onboarding legado em
  autorun `V29>=1`, com self switches distintos dos de Map045.
- A configuração atual possui uma entrada ativa de PKD e a ordem
  `PKD → QuestCore → QuestVN → Cutscene` está correta.
- Baseline estático: 61/61 JSONs analisados parsearam; 38/38 callers Coreto
  referenciam comandos registrados; os quatro plugins Coreto selecionados
  passam em `node --check`; o envelope de `plugins.js` é `editor-structural`
  com 69 objetos. Isso não é aceite do estado migrado.

### Inferences

- V29 deve permanecer como variável canônica porque já possui nome e ownership
  da quest completa; migrá-la para escrita exclusiva do QuestCore reduz a troca
  de IDs nas 54 condições. V111 deve ser retirado como autoridade separada e
  permanecer reservado, sem reutilização nesta feature.
- A `questKey` canônica deve ser `a-semifinal`, separada do identificador de
  backend `aSemifinal`, integrando o onboarding sem manter duas máquinas sobre
  a mesma quest visível.
- Map004, Map005 e Map044 são legados na rota `New Game`; não devem ser
  apagados, mas suas autoridades da `aSemifinal` precisam ser neutralizadas
  para o scan global não manter writers/callers concorrentes.
- Map006 e Map045 não são substitutos intercambiáveis no snapshot atual: ambos
  são alcançáveis em momentos diferentes. Map006 deve manter a continuidade
  física, mas perder o onboarding legado.
- Map010/E9 é redundante para a task 6 porque o objetivo é falar novamente com
  Dragobur e Map014/E2 já é um pointer válido e semanticamente correspondente.
  A correção segura é remover E9, não criar nem copiar evento.
- A extensão de QuestCore é necessária: sem weapon/armor, requisito de
  equipamento, receipts em transições sem efeito e projeção de active/descrição,
  a demanda só poderia ser cumprida mantendo efeitos ou SQSM como autoridades
  paralelas.

### Hypotheses

- A execução atual pode saltar a projeção da task 2 porque Map045 grava V29=2
  antes de Map014/E20, e a seleção de páginas usa `>=` com precedência da página
  posterior. Status: `runtime-pending`; a nova tabela remove a ambiguidade.
- Reentrar em Map006 no fluxo atual pode disparar novamente o pesadelo legado.
  Status: `runtime-pending`, sustentado pela condição estática e por self switch
  local distinto; deve ser testado antes e depois da migração.
- A rota atual pode mostrar a quest concluída sem task 8 explicitamente
  concluída. Status: `runtime-pending`; a estrutura de Map007 confirma a ordem
  dos comandos, mas a percepção do journal exige Playtest.

### Open Questions

- Nenhuma decisão `must_ask_now` permanece sob o baseline `New Game only`.
- Se compatibilidade com saves legados for solicitada, a execução deve parar e
  abrir decisão/escopo próprio; V29 isolada não distingue Funda, Elmo encontrado
  e Elmo equipado no snapshot antigo.

## Affected Surfaces

### Runtime, Engine or Framework

- `frontend/js/plugins/Coreto_QuestCore.js`: extensão retrocompatível do schema,
  efeitos, requirements, receipts e projeção PKD. Não criar helper específico.
- `frontend/data/CoretoQuests.json`: substituir a máquina parcial por
  `a-semifinal` completa em V29.
- `frontend/data/CommonEvents.json`: converter CE1 em detector finito de estado
  50 + Armor 51 equipada.
- `frontend/data/Map004.json`, `Map005.json`, `Map044.json`: neutralizar somente
  writers/callers legados da `aSemifinal`; não remover mapas.
- `frontend/data/Map006.json`, `Map007.json`, `Map008.json`, `Map009.json`,
  `Map010.json`, `Map014.json`, `Map022.json`, `Map045.json`, `Map049.json`:
  migrar callers, conditions, tags/lifecycle aplicáveis e onboarding.
- `frontend/js/plugins.js`: remover o pointer órfão e preservar toda a configuração
  PKD e ordem ativa restante.
- `frontend/data/System.json`: fonte de IDs; V29 permanece nomeada. V111 fica
  reservada e sem writers/callers, sem ser reciclada.

`frontend/js/rmmz_objects.js` é somente fonte semântica e não pode ser alterado.

### Integration Points

- PKD: `AddQuest`, `SetActiveQuest`, `ShowDescriptionForQuest`,
  `ShowTaskForQuest`, `CompleteTaskForQuest` e `CompleteQuest` passam pelo
  adaptador QuestCore. `SQSM.OpenQuestJournal()` pode permanecer em allowlist
  como UI após `INTRODUCE_JOURNAL`; não altera progresso.
- QuestVN: Map045 EX entra em Map049 VN por `ABERTURA_FORJAPRATA`; Map049 começa
  com Assert de sessão/estado e termina com `FinishVisualNovel`.
- Cutscene: usar somente em eventos de staging físico. Todo `BeginCutscene`
  precisa de `FinishCutscene` no mesmo owner antes de transfer/exit.
- `Coreto_Quests.addWeapon/addArmor`: remover dos dois grants migrados; a
  concessão passa a ser efeito transacional de QuestCore.
- Save Core: V100/descrição de save e o arco seguinte são preservados; save
  criado na versão nova integra o Playtest.

### State and Data Contracts

#### Identidade e projeção

```yaml
questKey: a-semifinal
stageVariableId: 29
pkd:
  questId: aSemifinal
  activeFrom: 10
  descriptions:
    - { id: 1, from: 10 }
    - { id: 2, from: 30 }
    - { id: 3, from: 90 }
    - { id: 4, from: 95 }
terminalStates: [100]
compatibility: new-game-only
```

#### Máquina de estados e owners

| Estado | Nome | Transição de entrada | Owner | Projeção/efeito principal |
| ---: | --- | --- | --- | --- |
| 0 | `NOT_STARTED` | inicial | QuestCore | Nenhuma projeção |
| 10 | `JOURNAL_INTRODUCED` | `INTRODUCE_JOURNAL` | Map045/E7 | Quest ativa, descrição 1, task 1 visível |
| 20 | `SLING_OBTAINED` | `FOUND_SLING` | Map045/E20 | Weapon 1 `+1 once`; task 1 completa; task 2 visível |
| 30 | `STADIUM_REACHED` | `REACH_STADIUM` | Map014/E20 | Task 2 completa; task 3 visível; descrição 2 |
| 40 | `DRAGOBUR_FIRST_TALK` | `DRAGOBUR_REJECTS_NO_HELMET` | Map014/E2 | Task 3 completa; task 4 visível |
| 50 | `HELMET_OBTAINED` | `FOUND_HELMET` | Map010/E13 | Armor 51 `+1 once`; task 4 completa; task 5 visível |
| 60 | `HELMET_EQUIPPED` | `EQUIP_HELMET` | Common Event 1 | Requirement ator 3 + Armor 51 equipada; task 5 completa; task 6 visível |
| 70 | `DRAGOBUR_APPROVED` | `DRAGOBUR_APPROVES_HELMET` | Map014/E2 | Task 6 completa; task 7 visível |
| 80 | `FIELD_ENTERED` | `ENTER_FIELD` | Map009/E8 | Task 7 completa; task 8 visível |
| 90 | `MATCH_WON` | `WIN_MATCH` | Map009/E9 | Descrição 3; retorno ao estádio |
| 95 | `ESCORT_DEPARTED_STADIUM` | `DEPART_WITH_GUARDS` | Map014/E6 | Descrição 4; escolta e transfer para Map007 |
| 100 | `HOME_ENTRANCE_REACHED` | `ARRIVE_HOME` | Map007/E10 | Task 8 completa; quest terminal; depois preserva handoff `fimDeJogo` |

#### Matriz 1:1 dos objetivos PKD

| Task | Texto preservado | `knownFrom` | `completedAt` |
| ---: | --- | ---: | ---: |
| 1 | Pegue a Funda no baú. | 10 | 20 |
| 2 | Corra até o estádio dos Machados Enferrujados. | 20 | 30 |
| 3 | Fale com o treinador Dragobur. | 30 | 40 |
| 4 | Encontre um Elmo. | 40 | 50 |
| 5 | Equipe o Elmo. | 50 | 60 |
| 6 | Fale novamente com Dragobur. | 60 | 70 |
| 7 | Entre em campo para a última jogada. | 70 | 80 |
| 8 | Volte para casa com os Guardas Imperiais. | 80 | 100 |

Todas as transições usam `receiptPolicy: once`, inclusive as que não concedem
inventário. Receipt `committed` retorna no-op antes de validar `from`. O receipt
deve registrar `from`, `to`, effects e estado da projeção.

QuestCore deve aceitar effects `item | weapon | armor`, resolver o database
correto e aplicar rollback somente a efeitos locais ainda não comprometidos.
`EQUIP_HELMET` exige requirement declarativo de ator/equipamento; não basta o
conditional script do CE.

Como o PKD é monotônico, falha após projeção parcial não pode fazer rollback do
estado canônico e deixar o backend à frente. Depois do commit local, falha de
sync marca `projectionDirty`; `QuestSync` refaz a projeção idempotente e limpa o
flag. Retry de receipt `failed` só é permitido quando rollback local estiver
comprovado.

#### Reachability e variantes

| Superfície | Classificação | Decisão |
| --- | --- | --- |
| Map022 | ativo, preâmbulo | Preservar Noite; remover writer V29 antecipado |
| Map045 | ativo, casa inicial EX | Caller da VN49, journal e Funda |
| Map049 | ativo, VN da quest | Migrar chave de tutorial para `a-semifinal`; preservar conteúdo |
| Map007/008/014/010/009 | ativos | Migrar estados/callers; EX onde o lifecycle Coreto exigir |
| Map006 | ativo, continuidade física | Preservar inbound de Map007; neutralizar onboarding legado |
| Map046 | ativo upstream, outra quest | Preservar como VN de `noite-da-historia`; não migrar conteúdo |
| Map004/005 | legado no New Game | Neutralizar writers V29; não apagar |
| Map044 | legado no New Game | Neutralizar chamadas `aSemifinal`; não copiar mapa inteiro nem apagar |

## Research Gate

**Decision:** not-needed

**Reason:** a decisão depende de plugins customizados, dados do consumidor e
engine local, todos disponíveis. O usuário não pediu pesquisa externa e nenhuma
versão, licença ou API externa atual é necessária. A documentação local
catalogada não contém uma alternativa de quest que substitua o contrato Coreto;
o backend PKD deve ser preservado por decisão aprovada.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa não executada | Evidência local continua sendo a autoridade |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Legado local V29 + SQSM | 17 writers, 54 conditions, gaps nas tasks 2/5/8 | Menor mudança imediata | Mantém autoridade distribuída, pointer órfão e reentrada insegura | reject |
| Coreto atual sem extensão | Registry parcial e QuestCore limitado a item/tasks | Reusa plugins ativos | Não cobre weapon/armor, equip requirement, active/descrição ou receipts sem efeito | reject |
| Coreto existente com extensão mínima | QuestCore já centraliza estado, sync e FlowCoordinator | Ownership correto, uma máquina, idempotência e projeção reparável | Plugin compartilhado exige testes de regressão da Noite | use |
| Novo plugin específico da quest | Nenhuma necessidade não coberta por extensão coerente | Isolamento aparente | Cria nova fronteira e risco de segunda autoridade | reject |
| Defer/bloquear | Aplicável apenas a saves antigos e remoção física de legado | Evita escopo implícito | Não conclui a demanda principal | defer somente esses itens |

## Recommendation

Substituir `tutorial-funda-forjaprata` por uma única definição
`a-semifinal` em V29, com os doze estados e onze transições acima. QuestCore
passa a ser o único writer de V29, o único projetor de active/descrições/tasks e
o owner transacional da Funda e do Elmo. V111 permanece reservada, sem callers.

Atualizar os 54 readers de V29 para a tabela esparsa. Páginas cumulativas podem
usar threshold; autoruns e transições precisam de guard exato e de uma página
posterior/saída que impeça loop. Remover os 17 writers diretos e todas as
chamadas SQSM de progressão da `aSemifinal`; manter somente
`OpenQuestJournal()` em allowlist de UI.

Preservar Map049 como única VN da quest. Dragobur, obtenção/equipamento do Elmo,
campo, partida, Guardas e chegada ficam no espaço físico. Usar Cutscene somente
onde existe staging/lock real, sempre com Finish antes de transfer e Exit.

Manter Map007 como owner do terminal atual e projetar task 8 + conclusão por
`ARRIVE_HOME`; não copiar silenciosamente Map044. Manter o transfer posterior
para Map006 e o início de `fimDeJogo`, neutralizando antes o onboarding legado de
Map006. Remover o pointer Map010/E9 e conservar Map014/E2 como destino da task 6.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| QuestCore e PKD divergirem após sync parcial | Rollback atual não desfaz PKD monotônico | Commit canônico + `projectionDirty` + `QuestSync` idempotente | plugin validator + Playtest |
| Grant duplicado da Funda/Elmo | Grants fora do QuestCore; Funda aparece em dois pontos | Effects weapon/armor `once`; remover grants dos eventos | receipt validator |
| CE1 repetir ou avançar fora do estado | CE paralelo sob S4 e V29=4 duplicado | Guard estado 50 + equip requirement + cleanup S4 | lifecycle validator + P04 |
| Página errada por `>=` | 54 page conditions e precedência reversa | Simular page selection por estado; guard exato em transições | structural validator |
| Map006 reabrir onboarding | Autorun legado em mapa alcançável | Neutralizar página/callers legados mantendo continuidade | route Playtest |
| Finalizar sem task 8 | Map007 conclui task 7; Map044 task 8 | Terminal canônico em Map007 projeta task 8 antes da quest | state/PKD validator |
| Quebrar Noite da História | QuestCore é compartilhado | Extensão retrocompatível; fixture/regressão V106/Map046 | plugin tests + Playtest |
| Lock Cutscene/VN sobreviver a saída | Plugins exigem owner e pares | Matriz de folhas e Finish antes de transfer/exit | lifecycle validator |
| Pointer ou transfer inválido | Map010/E9 órfão | Remover E9; validar todos os pointers e bounds | pointer validator |
| Assumir save legado | V29 antigo conflaciona etapas | Manter `New Game only`; parar se escopo mudar | human decision |

## Validators

1. **JSON e diff:** parse individual de todo JSON alterado; diff estruturado por
   mapa/evento/página/comando; falhar em reflow ou target fora do plano.
2. **Schema/grafo:** questKey única, V29 existente, estados fechados e
   alcançáveis, terminal 100 alcançável, onze transições, receipts, effects e
   matriz 1:1 dos oito objetivos.
3. **Authority scan:** exatamente um writer canônico via QuestCore; zero
   `code:122` para V29 e zero `SQSM.*aSemifinal` fora do adaptador; allowlist
   exclusiva de `OpenQuestJournal`; zero caller de `tutorial-funda-forjaprata`.
4. **Page selection:** simular `>=` e maior página elegível para os doze estados;
   rejeitar autorun/parallel stale, overlap incorreto ou salto de etapa.
5. **Command contracts:** validar 111/115/117/121/122/201/355/357/402-404/
   411-412/657 contra a engine; verificar indent, folhas e término de transfers.
6. **Plugin contract:** `node --check`; header/`@command`/`registerCommand`/
   callers compatíveis; namespace `Coreto` acumulativo; regressão da definição
   `noite-da-historia`.
7. **PKD projection:** active e quatro descrições idempotentes; tasks 1–8 na
   ordem; terminal completa task 8 antes da quest; `projectionDirty` reparável.
8. **Effects/receipts:** Weapon 1 e Armor 51 exatamente uma vez; requirements de
   equip; no-op de receipt committed; retry seguro; nenhuma janela de grant fora
   da transição.
9. **Pointer integrity:** todo map/event existe e é semanticamente correto;
   Map010/E9 ausente; Map014/E2 preservado para task 6.
10. **Reachability:** grafo constante + edges QuestVN desde Map022; todos os mapas
    classificados; nenhum transfer direto EX↔VN; destinos e coordenadas em bounds.
11. **Lifecycle:** Enter/Assert/Finish em Map045/049; Begin/Finish no mesmo owner;
    Finish antes de transfer; nenhum lock, autorun ou flow órfão.
12. **CE1:** paralelo sob S4, finito, guardado por estado 50 e equip do ator 3;
    após commit ou estado diferente, S4 é limpo sem segundo avanço.
13. **Continuidade:** before/after de Map007/E10 preserva V100, switches, diálogo,
    `fimDeJogo`, transfer para Map006 e ausência de duplicação.
14. **Plugin Manager:** se `plugins.js` mudar, validar envelope, extrair config e
    exigir abrir/salvar/reabrir no editor; manter `editor-accepted` separado.

O estado atual falha nos validators 2, 3, 7, 8, 9, 12 e 13. Isso é evidência da
necessidade da implementação, não falha desta análise.

## Human Gates

- **Editor acceptance:** abrir os dados e o Plugin Manager no RPG Maker MZ,
  salvar, fechar e reabrir; revisar diff posterior sem drift inesperado.
- **P01 caminho principal:** New Game desde Map022, VN46, Map045/VN49, Funda,
  estádio, Dragobur, Elmo, equip, Dragobur, campo, vitória, Guardas e Map007.
- **P02 repetição:** repetir NPC/objeto antes e depois de cada transição; nenhum
  segundo estado, grant, descrição ou task.
- **P03 reentrada:** sair/retornar aos mapas ativos, inclusive Map007→Map006;
  nenhuma abertura legada, autorun loop ou softlock.
- **P04 CE Elmo:** equipar, aguardar, desequipar/re-equipar e trocar de mapa;
  uma única transição e S4 sem polling residual.
- **P05 VN/Cutscene:** rota normal e saídas válidas; origem, direção, followers,
  transparência, input, menu, save e áudio restaurados.
- **P06 save/load novo:** salvar/recarregar em 20, 50, 60, 90, 95 e 100;
  estado/projeção/receipts persistem sem repetição. Não usar save legado.
- **P07 terminal:** task 8 e quest concluem uma vez em Map007/E10; `fimDeJogo`
  inicia uma vez; entrada em Map006 permanece alcançável.

Cada cenário registra pre-state, ação, post-state, tarefa/descrição PKD,
inventário/equip, receipt/flow, resultado `PASS|FAIL` e evidência observável.
Até esse registro, o máximo é `structural_validation`; runtime permanece
`runtime_pending`.

## Affected Docs

Após implementação e validação humana, estes documentos são candidatos a
atualização duradoura por workflow separado:

- [`docs/domains/quest-content-designer/README.md`](../../docs/domains/quest-content-designer/README.md): contrato canônico da `aSemifinal`.
- [`docs/domains/gameplay-engineer/README.md`](../../docs/domains/gameplay-engineer/README.md): authority, callers, effects e save/load.
- [`docs/domains/level-designer/README.md`](../../docs/domains/level-designer/README.md): reachability reconciliada.
- [`docs/index.xml`](../../docs/index.xml): somente se os documentos duráveis
  forem promovidos por `loki-catalogar-docs`/`catalogador`.

Nenhum desses arquivos é autorizado para escrita nesta análise.

## Stop Conditions

- Um novo writer dinâmico de V29 ou caller `aSemifinal` surgir fora do
  inventário e mudar targets/owners.
- A extensão QuestCore não conseguir preservar `noite-da-historia` ou não
  oferecer transação/repair determinísticos para PKD.
- Persistir qualquer writer direto de V29, SQSM de progressão, grant duplicado,
  pointer inválido ou lifecycle sem fechamento.
- Branch/indent/page selection, bounds, map tag, entryKey ou transfer permanecer
  inconclusivo.
- JSON parse, `node --check`, envelope, diff restrito ou editor round-trip falhar.
- O produto solicitar save legado ou mover o terminal para dentro de Map006;
  ambos exigem nova decisão humana.
- A execução tentar apagar fisicamente mapas legados ou criar novo plugin
  quest-specific como fallback.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** QuestCore, PKD e New Game já estão aprovados; a evidência fecha
  questKey, V29, estados, owners, duplicatas, pointers e fronteiras. Gates de
  editor/Playtest são validação downstream, não decisões de requisito.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none
- **Implementation demand:**
  `planos/005-asemifinal-new-arquiteture/improved-demand.md`
- **Analysis file:**
  `planos/005-asemifinal-new-arquiteture/technical-analysis.md`
- **Inherited restrictions and decisions:** PKD permanece backend; QuestCore é
  autoridade única em V29; `a-semifinal`; V111 reservado; Map049 é a única VN
  da quest; Map007/E10 é terminal; Map004/005/044 não são apagados; New Game
  only; sem `VisuMZ_2_QuestSystem`, novo plugin específico ou conteúdo novo.
- **Validators and human validation:** validators 1–14 e gates P01–P07 desta
  análise; runtime só pode ser aprovado pelo registro humano.
- **Required skills:** `loki-implement-feature`, `rpg-maker-mz-data-json`,
  `rpg-maker-mz-plugin-workflow`; skills VisuStella apenas se a implementação
  alterar sintaxe/parâmetro/callers VisuStella existentes.
- **Downstream execution profile:** `model_class=frontier_reasoning`,
  `execution_effort=high`, handoffs de implementação RPG Maker/QA,
  `validator_effort=high`.

### Handoff log

| Origin | Destination | Objective | Status | Evidence |
| --- | --- | --- | --- | --- |
| Orchestrator | source-researcher | Inventário multi-source read-only | completed | 61/61 JSON, source map, reachability e gaps |
| Orchestrator | technical-implementer | Alternativas e contrato proposal-only | completed | Matriz, máquina, extensão Coreto e risks |
| Orchestrator | runtime-qa | Validators e Playtest proposal-only | completed | S01–S13 e P01–P07 |
| Orchestrator | Write Agent | Materializar este Markdown | interrupted | Nenhuma escrita realizada; owner retornou ao orquestrador |
| Esta análise | `loki-implement-feature` | Planejar e implementar demanda + analysis_file | recommended | Handoff completo acima |

Não há handoff aberto nesta análise.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready"
  sources_read:
    - "planos/005-asemifinal-new-arquiteture/improved-demand.md"
    - "planos/001-cena-coreto-nova-arquitetura/demanda-improved.md"
    - "AGENTS.md"
    - "docs/index.xml and routed technology/gameplay/level/quest docs"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json"
    - "frontend/data/CommonEvents.json"
    - "frontend/data/MapInfos.json and focused Map*.json"
    - "frontend/js/plugins.js and selected Coreto/PKD plugins"
    - "frontend/js/rmmz_objects.js"
  research_gate: "not-needed"
  human_decision_preflight_required: false
  pending_questions: []
  runtime_status: "pending-human-validation"
  implementation_demand_ref: "planos/005-asemifinal-new-arquiteture/improved-demand.md"
  analysis_file: "planos/005-asemifinal-new-arquiteture/technical-analysis.md"
  inherited_restrictions:
    - "QuestCore authority; PKD projection"
    - "questKey a-semifinal on V29"
    - "New Game only"
    - "preserve eight tasks, terminal Map007/E10 and fimDeJogo handoff"
    - "do not delete legacy maps or introduce Visu Quest/new quest plugin"
  recommended_next_command: "loki-implement-feature"
  next_action: "Use improved-demand.md as demand and this file as analysis_file; derive target_files and execute validators before any runtime claim."
  blocked_by: []
```

## Revisão aprovada — cópias Coreto EX/NV (2026-08-04)

Esta revisão prevalece sobre as recomendações anteriores que migravam a rota
diretamente nos mapas ativos originais.

### Decisão humana registrada

- Os originais da aSemifinal permanecem legados.
- `Map022` (`EX_Coreto`), `Map045` (`EX_Casa da Família Forjaprata`) e `Map049`
  (`NV_Casa_Forjaprata`) já atendem à nova arquitetura e não devem ser copiados.
- `Map045` (`EX_Casa da Família Forjaprata`) já é a cópia EX atualizada do mapa
  original 006 e deve ser preservada. `Map044` (`EX_Distrito Residencial Nobre`)
  é a cópia EX canônica do mapa original 007 e deve ser atualizada, não duplicada.
  Devem ser criadas cópias `EX` apenas dos mapas originais 008, 009, 010 e 014.
  A migração da quest, seus eventos, page conditions e transitions ocorrerá
  apenas nas cópias EX.

### Evidência e contrato revisado

- `frontend/data/MapInfos.json` confirma os mapas Coreto existentes 22, 45, 46
  e 49; `Map057.json` a `Map060.json` existem no disco mas não estão no índice.
  Portanto, IDs novos não podem ser inferidos do maior `MapNNN.json`: devem ser
  alocados pelo RPG Maker MZ ao criar as quatro cópias e depois confirmados no
  `MapInfos.json` salvo pelo editor.
- Transfers `code:201`, pointers PKD e qualquer referência por `mapId` devem ser
  reescritos exclusivamente após a alocação real dos quatro IDs. Nenhum mapId
  provisório entra no registry, plugin ou dados persistidos.
- `Map049` continua a única NV desta quest. Não haverá Transfer Player direto
  EX→NV; a entrada permanece pelo `Coreto_QuestVN` a partir de Map045 EX.

### Escopo adicional obrigatório

- Preservar `Map045` como `EX_Casa da Família Forjaprata`, atualizar `Map044`
  como `EX_Distrito Residencial Nobre` e criar/indexar quatro mapas:
  `EX_Distrito Comercial`, `EX_Campo de Futebol Rúnico`, `EX_Vestiário` e
  `EX_Estádio`, com parent/order deliberados no editor.
- Migrar somente as cópias EX para `a-semifinal`/V29/QuestCore; os mapas
  originais tornam-se legado sem autoridade de progresso na rota New Game.
- Remapear a cadeia New Game para `Map022 → Map045 → EX_007 → EX_008 → EX_014
  ↔ EX_010/EX_009 → EX_007 → EX_006`; preservar o handoff terminal existente.
- Atualizar pointers PKD somente com os IDs novos; manter a remoção do pointer
  órfão Map010/E9, agora correspondente ao EX_Vestiário quando aplicável.

### IDs alocados pelo editor (2026-08-04)

- `Map050` é a cópia de Map014 e será nomeado `EX_Estádio`.
- `Map051` é a cópia de Map010 e será nomeado `EX_Vestiário`.
- `Map058` é a cópia de Map008 e será nomeado `EX_Distrito Comercial`.
- `Map059` é a cópia de Map009 e será nomeado `EX_Campo de Futebol Rúnico`.
- Os quatro IDs são definitivos para transfers, pointers e registry desta
  implementação. O prefixo `EX_` será normalizado em `MapInfos.json`; nenhum
  ID adicional deve ser criado.

### Novos validators e gates

15. Editor cria, salva e reabre as quatro cópias e os `Map044`/`Map045` reaproveitados; `MapInfos.json`, arquivos de
mapa e hierarquia possuem IDs consistentes, sem colisão com 057–060.
16. Todo transfer/pointer da aSemifinal aponta para cópia EX ou NV autorizada;
nenhum edge New Game retorna a um mapa original legado.
17. O diff estrutural demonstra que cada cópia deriva do original correto e que
o original não recebeu migração de conteúdo por engano.

### Handoff revisado

- **Human decision preflight required:** `false`.
- **Reason:** a decisão material de quais cópias criar foi confirmada pelo
usuário; a alocação de IDs é uma operação determinística do editor, validada
antes de remapear referências.
- **Recommended next command:** `loki-implement-feature`.
- **Inherited restrictions:** New Game only; originais preservados como legado;
somente Map049 é NV; Map045 é a cópia EX de Map006, Map044 é a cópia EX de
Map007 e há quatro novas cópias EX;
sem IDs provisórios; QuestCore continua
autoridade e PKD continua projeção.

## Revisão aprovada — hierarquia EX em Exploration (2026-08-04)

Esta revisão prevalece sobre qualquer `parentId` ou hierarquia anterior dos
mapas EX da `aSemifinal`.

### Decisão humana registrada

- Todos os mapas EX da rota são filhos diretos de `Exploration` (`Map016`).
- O conjunto fechado é: `Map022` (`EX_Coreto`), `Map044`
  (`EX_Distrito Residencial Nobre`), `Map045`
  (`EX_Casa da Família Forjaprata`), `Map050` (`EX_Estádio`), `Map051`
  (`EX_Vestiário`), `Map058` (`EX_Distrito Comercial`) e `Map059`
  (`EX_Campo de Futebol Rúnico`).
- `Map050` é o estádio EX canônico; `Map014` permanece o estádio não-EX.
- Para cada mapa do conjunto, `MapInfos.json[id].parentId` deve ser `16`.
  Preservar IDs, `order`, nomes, arquivos `MapNNN.json`, eventos e transfers.

### Escopo e validators adicionais

- **Target de produção:** somente `frontend/data/MapInfos.json`.
- **Validador estrutural:** JSON parse; os sete IDs existem uma vez e possuem
  `parentId: 16`; nenhum outro registro foi alterado além dos sete `parentId`.
- **Gate humano:** abrir, salvar e reabrir no RPG Maker MZ, confirmando que os
  sete mapas aparecem diretamente dentro de `Exploration` sem renumeração.
- **Fora de escopo:** alterações de quest, QuestCore, eventos, transfers,
  `plugins.js`, mapas JSON ou criação/remoção de mapas.

### Handoff revisado

- **Human decision preflight required:** `false`.
- **Reason:** o usuário confirmou explicitamente que todos os EX devem ser
  filhos diretos de `Exploration`; não há alternativa material restante.
- **Recommended next command:** `loki-implement-feature`.
- **Inherited restrictions:** alterar exclusivamente os sete `parentId` em
  `MapInfos.json`, mantendo Map050 como estádio EX e Map014 fora da rota EX.
