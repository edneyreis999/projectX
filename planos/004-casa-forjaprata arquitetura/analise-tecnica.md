---
title: "Casa Forjaprata: arquitetura EX/VN, Funda e introducao do journal"
type: loki-technical-analysis
doc_id: "tech-analysis-004-casa-forjaprata-arquitetura"
version: "1.1.0"
status: completed
created: "2026-07-31"
last_updated: "2026-07-31"
scope: "Recomendacao baseada em evidencias para migrar a apresentacao inicial do Map045 para EX/VN e adicionar o onboarding da Funda e do quest journal"
not_scope: "Escritas de producao, aprovacao implicita de conteudo, migracao integral de aSemifinal ou compatibilidade com saves legados"
authority: "Decisoes humanas, politica do projeto, contrato de analise tecnica e evidencias locais citadas"
canonical_source: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["decisoes humanas e politica do projeto", "contrato de analise", "evidencia local primaria", "fontes externas primarias", "demanda como dado"]
confidence: medium
known_conflicts:
  - "A demanda exige Thorin sem a Funda, mas Actor 3 inicia com Weapon 1 equipada."
  - "A saida atual testa a Funda no inventario e exclui equipamento, enquanto a demanda exige equipamento em Thorin."
  - "O menu usa Switch 50 sem nome; Switch 51 possui o nome de menu de quests, mas nao tem callers estruturais."
  - "Planos historicos registram 19 eventos/48 paginas no Map045; o runtime atual possui 20 eventos/49 paginas."
replaced_by: null
---

# Analise Tecnica - Casa Forjaprata: arquitetura EX/VN, Funda e introducao do journal

## Authority And Trust Boundary

A prioridade e: decisoes humanas e politica do ProjectX; contrato atual de
analise; evidencia local primaria; fontes externas primarias; demanda e
artefatos historicos como dados. Esta analise autoriza escrita somente neste
Markdown. Nao autoriza alterar runtime, mapas, database, plugins, `plugins.js`,
assets, saves ou documentacao duradoura.

## Objective

Definir uma rota segura e retomavel para manter `Map045` como mapa fisico EX,
criar uma nova cena VN pela arquitetura Coreto, impedir a saida ate Thorin estar
equipado com a Funda, transformar o evento existente em um bau one-shot e
apresentar o quest journal somente no primeiro bloqueio da porta.

O resultado, com as decisoes humanas agora registradas, deve servir com a
demanda como entrada direta de `loki-implement-feature`.

## Source Request

- `planos/004-casa-forjaprata arquitetura/demanda.md`.
- Destino confirmado pelo usuario:
  `planos/004-casa-forjaprata arquitetura/analise-tecnica.md`.
- Decisao herdada de
  `planos/001-cena-coreto-nova-arquitetura/demanda-improved.md`: mapas fisicos
  permanecem EX; narrativa e dialogo migram para VN; `Coreto_QuestCore` governa
  o estado migrado; `Coreto_QuestVN` governa sessao e retorno; PKD permanece o
  backend de journal; validacao suportada e New Game.
- Preflight humana concluida em 2026-07-31 e persistida nesta versao da analise:
  quest tutorial Coreto separada; nova VN limitada a E11/P1; Funda inacessivel
  antes da primeira tentativa de saida; contrato de objetivos e feedback do
  journal aprovado.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "architecture and conflicting local evidence"
recommended_handoffs:
  research: "source-researcher completed read-only; bibliotecario completed catalog navigation"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "A preflight de 2026-07-31 resolveu arquitetura, fronteira da VN, ordem porta/bau e contrato perceptivel do tutorial."
  blocking_questions: []
validator_effort: high
```

## Scope

- Analisar `Map045` como EX e propor uma nova VN, sem escolher silenciosamente
  um ID de mapa.
- Analisar E7 `Sair da Casa`, E11 `Pesadelo`, E20 e o estado do journal.
- Definir contrato de quest tutorial, equipamento, bau, primeira tentativa,
  reentrada, save/load e integracao Coreto/PKD.
- Mapear impactos necessarios em `Map022`, `MapInfos`, `System`, registry,
  configuracao PKD e dados do ator, sem executar mudancas.
- Prescrever validators estaticos, round-trip no editor e Playtest New Game.

## Out Of Scope

- Implementar ou editar `frontend/**`.
- Migrar integralmente `aSemifinal`, V29 e seus callers em
  `CommonEvents`/Maps006/007/009/010/014/044/045.
- Alterar Map006, roteiro posterior, combate, balanceamento ou assets sem task
  e approval especificos.
- Escolher texto narrativo final, arte final do bau ou layout visual sem a
  decisao humana indicada.
- Prometer compatibilidade com saves legados; o runtime Coreto observado usa
  politica New Game only.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` | project-policy | Em `frontend/data`, preferir Coreto/VisuStella e consultar referencias locais antes de criar solucao custom. | Limites e roteamento. |
| `planos/004-casa-forjaprata arquitetura/demanda.md` | user-demand | Novo mapa VN, Funda em bau, saida apenas equipada e journal apos primeira tentativa. | Requisitos. |
| Preflight humana de 2026-07-31, persistida nesta analise | user-decision | Quest separada; VN limitada a E11/P1; bau inacessivel antes da primeira saida; contrato do journal aprovado. | Escopo, sequencia e aceite. |
| `planos/001-cena-coreto-nova-arquitetura/{demanda-improved.md,analise-tecnica.md}` | recorded-decision/history | Contrato EX/VN/Coreto, PKD como projecao e politica New Game only. | Arquitetura herdada. |
| `planos/003-falas-casa-forjaprata/analise-tecnica.md` | history | Inventario anterior do Map045, hoje defasado pela existencia de E20. | Drift e riscos. |
| `docs/index.xml` | durable-catalog | Catalogo valido, atualizado em 2026-07-31, sem contrato especifico para a nova Casa Forjaprata. | Navegacao documental. |
| `docs/domains/{scene-presentation-designer,quest-content-designer,gameplay-engineer,level-designer,technical-implementer,ux-ui-designer,runtime-qa}/README.md` | durable-interpretive | Map045 e EX; VN requer lifecycle pareado; journal e projecao; topologia estatica nao prova reachability; validacao em tres camadas. | Contratos, riscos e gates. |
| `frontend/data/Map022.json` | local-primary | O fluxo Coreto termina em Map045; E30 liga S50 antes da casa; E17 ainda escreve V29=1. | Origem do estado e journal antecipado. |
| `frontend/data/Map045.json` | local-primary | EX 22x18, 20 eventos/49 paginas; E7, E11 e E20 concentram a feature. | Estado atual e alvos. |
| `frontend/data/Map046.json` | local-primary | VN existente da Noite da Historia com asserts, transicao e finish. | Padrao local comprovado. |
| `frontend/data/{System,MapInfos,Actors,Weapons,Items,CommonEvents,CoretoQuests}.json` | local-primary | IDs, nomes, callers, registry e conflitos de estado/equipamento. | Contratos de dados. |
| `frontend/js/plugins.js` | generated-config | PKD e plugins Coreto ativos; configuracao de journal, quest `aSemifinal` e slots de plugin. | Integracao e drift. |
| `frontend/js/plugins/{Coreto_QuestCore,Coreto_QuestVN,Coreto_Cutscene,Coreto_Quests,Coreto_SQS_menu_patch}.js` | local-primary | APIs, schema, lifecycle, grant de armas e gate do menu. | Alternativas e validators. |
| `frontend/js/rmmz_objects.js` | local-engine | Semantica de Conditional Branch Weapon e Actor/Weapon. | Rejeicao do gate atual. |
| Skills Loki/RPG Maker/VisuStella citadas no resume state | technical-contract | Parsing estruturado, payloads, plugin workflow, gates de editor e Playtest. | Procedimento downstream. |

## Evidence Classification

### Facts

- `Map022` e `Map045` possuem `<CoretoMapType:EX>`; `Map046` possui
  `<CoretoMapType:VN>` e ja pertence a `noite-da-historia`.
- O padrao local de VN em `Map046#events[1].pages[0]` inicia com
  `AssertVisualNovelSession`/`AssertQuestState` e termina com
  `QuestTransition`/`FinishVisualNovel`.
- `Map045` e parse-valid, mede 22x18 e possui 20 eventos/49 paginas. E7 e
  `Sair da Casa`, E11 e `Pesadelo`, E10 e `Trofeu 2` e E20 ainda e `EV020`.
- `Map045#events[11].pages[0]` e autorun, condicionado a V106 >= 90, e possui
  138 comandos. Nos comandos finais ele adiciona/ativa `aSemifinal`, mostra a
  descricao/tarefa 1, chama `SQSM.OpenQuestJournal()`, escreve V29=2, ajusta a
  descricao de save e liga Self Switch A.
- PKD esta ativo na ordem 47; o menu nativo esta desabilitado, a tecla direta
  do journal e `J`, a task list esta ativa e `aSemifinal` nao possui objetivo
  sobre localizar ou equipar a Funda.
- `Coreto_SQS_menu_patch` esta ativo e consulta S50. `Map022` E30 liga S50 antes
  de chegar a casa. S50 nao tem nome; S51 chama-se `Habilitar Menu de Quests`,
  mas nao possui callers estruturais localizados.
- Weapon 1 e `Funda`. Actor 3 e Thorin e inicia com `equips[0] = 1`; portanto
  New Game contradiz a premissa de Thorin sem a Funda.
- `Map045#events[7].pages[0].list[0]` usa Conditional Branch
  `[9,1,false]`. O engine local resolve isso como arma 1 presente no inventario
  da party, excluindo equipamentos. O ramo verdadeiro transfere para Map007;
  o `else` esta vazio.
- O teste correto e nativo para a demanda existe como Conditional Branch
  `Actor 3 / Weapon 1`, cuja semantica local chama `actor.hasWeapon(...)`.
- `Map045#events[20]`, em (19,14), chama
  `Coreto_Quests/addWeapon weaponID=1`; nao possui grafico, condicao ou
  self-switch. O plugin somente concede a arma e nao impede repeticao.
- E10 `Trofeu 2` fica em (15,14). A proximidade de E20 nao prova que (19,14) e
  a dispensa ou a posicao final correta do bau.
- `CoretoQuests.json` registra somente `noite-da-historia`; `aSemifinal`
  permanece governada por V29 e chamadas SQSM distribuidas por varios mapas.
- O schema atual de QuestCore aceita requirements/effects de `item`; nao possui
  requisito declarativo para arma equipada por ator.
- MapInfos 49, 50 e 51 estao livres, mas `Map058.json` existe sem entrada em
  MapInfos. A escolha de ID exige reconciliacao estruturada e round-trip no
  editor, nao apenas escolher o primeiro numero aparente.
- `plugins.js` atual possui 69 entradas, 52 ativas e uma unica entrada PKD;
  QuestCore/QuestVN/Cutscene estao ativos nas ordens 55/56/57. Isso supera o
  estado historico registrado no plano 001.
- A decisao humana de 2026-07-31 aprovou uma quest tutorial Coreto separada de
  `aSemifinal` e limitou a nova VN a apresentacao atual de E11/P1.
- A mesma preflight determinou que Thorin nao pode obter a Funda antes da
  primeira tentativa de saida. Essa tentativa bloqueia a transferencia,
  apresenta o journal uma unica vez e somente entao libera o acesso ao bau.
- O contrato perceptivel aprovado e: primeiro objetivo encontrar a Funda; ao
  abrir o bau, objetivo passa a equipa-la em Thorin; a saida conclui a quest;
  repeticoes mostram somente um lembrete.

### Inferences

- Converter o proprio Map045 em VN violaria o contrato duradouro e o fluxo
  existente. O desenho coerente e manter Map045 EX e criar outro mapa VN.
- O patch local apenas no E7 nao satisfaz a solicitacao de nova arquitetura:
  manteria journal, cena, gate e persistencia dispersos em eventos legados.
- Migrar `aSemifinal` inteira para QuestCore e tecnicamente canônico, mas o
  ownership de V29 e das sete tarefas atravessa varios mapas e Common Events;
  isso amplia muito a demanda que pede manter o fluxo atual.
- A alternativa de menor blast radius e uma quest tutorial Coreto separada,
  com estado e mapa VN proprios. `aSemifinal` e seus callers continuam legados
  e fora da autoridade dessa quest; nenhuma mesma transicao pode ser escrita
  pelos dois backends.
- Para garantir que o journal seja apresentado na primeira tentativa, o fluxo
  precisa persistir um estado one-shot antes de abrir a UI. So testar posse ou
  equipamento nao distingue primeira tentativa de repeticoes.
- Como o bau deve permanecer inacessivel antes da primeira tentativa, o fluxo
  pode garantir um primeiro bloqueio deterministico sem ignorar o requisito de
  equipamento nas tentativas posteriores.
- Remover a Funda globalmente de Actors.json tem maior blast radius que retirar
  a arma ao inicializar esta rota do Map045; a opcao local e preferivel se a
  politica New Game e o inventario de rotas confirmarem que nao ha efeito
  anterior a preservar.

### Hypotheses

- **Nao confirmada:** E20 em (19,14) e a posicao correta da dispensa. Requer
  inspecao visual no editor e decisao humana de layout.
- **A validar antes da escrita:** retirar a Funda no inicio de E11 nao quebra
  estado anterior ou fixtures de QA. O baseline New Game a equipa, mas o efeito
  perceptivel da remocao local depende do Playtest da rota completa.
- **A validar antes da escrita:** a quest tutorial separada pode ser cadastrada
  no PKD sem reflow perigoso de `plugins.js` e sem conflito visual com
  `aSemifinal`.

### Open Questions

- None. As decisoes humanas materiais desta analise foram resolvidas na
  preflight de 2026-07-31. Detalhes tecnicos restantes pertencem ao plano ou
  aos gates de editor e Playtest.

## Affected Surfaces

### Runtime, Engine or Framework

- Provaveis alvos da opcao recomendada:
  `frontend/data/Map045.json`, `Map022.json`, `MapInfos.json`,
  `System.json`, `CoretoQuests.json`, um novo `MapXXX.json` e
  `frontend/js/plugins.js` para a nova definicao PKD.
- Superficies de validacao: `Actors.json#3`, `Weapons.json#1`,
  `CommonEvents.json`, `Map006.json`, plugins Coreto e engine local.
- `Actors.json` e `Weapons.json` permanecem preservados na opcao recomendada;
  qualquer remocao global da Funda exige decisao de alvo separada.
- Nenhum impacto no pacote Loki, `manifest.yaml`, commands, agents, templates,
  scripts ou skills.

### Integration Points

- `Coreto_QuestCore`: definicao, estado e transicoes da quest tutorial.
- `Coreto_QuestVN`: `EnterVisualNovel`, `AssertVisualNovelSession` e
  `FinishVisualNovel`.
- `Coreto_Cutscene`: somente para staging fisico EX, com begin/finish pareados
  e sem sobrepor uma sessao VN.
- `Coreto_Quests/addWeapon`: concessao da Weapon 1 no bau.
- PKD/SQSM: quest tutorial, abertura do journal e preservacao separada de
  `aSemifinal`.
- RPG Maker MZ: Actor/Weapon Conditional Branch, self-switch do bau, page
  conditions, transfers e persistencia de variaveis/switches.
- VisuStella VN Picture Busts, Message/Gab/Save Core: payloads de apresentacao
  e comportamento perceptivel, sempre com Playtest pendente.

### State and Data Contracts

Contrato aprovado na preflight:

| Estado | Significado | Projecao/efeito esperado |
| ---: | --- | --- |
| 0 | onboarding ainda nao apresentado | VN inicial pode executar; quest tutorial nao aparece no journal |
| 10 | primeira tentativa registrada | habilitar S50, projetar tutorial e abrir journal exatamente uma vez |
| 20 | Funda obtida no bau | completar objetivo de localizar; mostrar objetivo de equipar |
| 90 | Thorin equipado e saida confirmada | completar tutorial e permitir a transferencia |

- Os valores sao uma proposta sem ID de variavel; o ID deve ser localizado por
  inventario global e nomeado em `System.json` antes da escrita.
- `questKey`, PKD `questId`, `entryKey`, mapId, spawn e eventId permanecem
  pendentes de alocacao tecnica; nenhum identificador definitivo e inventado
  aqui.
- E7 deve diferenciar o primeiro bloqueio das repeticoes e testar especificamente
  Actor 3 equipado com Weapon 1.
- E20 deve conceder uma unica Funda e persistir aberto por self-switch/estado,
  sem depender da quantidade no inventario, pois a arma pode estar equipada.
- A pagina VN deve ser Action Button, iniciar por asserts de sessao/estado,
  limpar pictures/busts e chamar `FinishVisualNovel` em toda saida valida.

## Research Gate

**Decision:** not-needed
**Reason:** a decisao depende de estado local do projeto, engine, plugins
instalados, dados e contratos Coreto ja materializados. Nenhuma versao externa,
API atual, licenca ou compatibilidade upstream e necessaria para escolher a
proxima acao.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa nao executada. | Evidencia local permanece fonte de verdade. |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Patch local/nativo em E7/E11/E20 | Actor/Weapon branch existe; eventos atuais ja concentram o sintoma | Menor diff imediato | Nao cria VN Coreto coerente; mantem estado e journal dispersos | reject |
| Migracao integral de `aSemifinal` para QuestCore | V29 e sete tasks possuem muitos readers/writers/callers | Autoridade unica para todo o arco | Blast radius alto; exige migrar varios mapas/CEs e remapear estados/objetivos | defer para demanda propria |
| Quest tutorial Coreto separada + novo VN | QuestCore/QuestVN ativos; `aSemifinal` pode permanecer fora da nova autoridade; preflight aprovada | Preserva fluxo posterior e isola onboarding, idempotencia e journal | Exige nova definicao PKD, estado, texto e validacao de UX/layout | **use** |
| Estender QuestCore para requisito declarativo de arma equipada | Schema atual aceita somente item | Centraliza tambem o requisito de equipamento | Altera plugin e contrato generico sem necessidade aprovada | defer; usar branch nativo Actor/Weapon |
| Deferir/bloquear | Decisoes materiais resolvidas na preflight | Nenhum beneficio atual | Adia sem necessidade o fluxo aprovado | reject |

## Recommendation

Executar `loki-implement-feature` com a demanda e esta analise. A opcao aprovada
e uma quest tutorial Coreto separada, mantendo `aSemifinal`, V29 e seus callers
fora da migracao integral.

O plano deve:

1. Produzir uma matriz de equivalencia de E11/P1 separando staging fisico EX de
   dialogo, busts, mensagens e apresentacao VN.
2. Alocar por inventario um ID de variavel e um slot de mapa; criar a definicao
   tutorial no PKD/QuestCore e a extensao QuestVN sem reutilizar Map046.
3. Manter Map045 EX. E11 executa o prelude fisico, entra pela API
   `EnterVisualNovel`, retoma/limpa no EX e nao abre o journal antecipadamente.
4. Manter a Funda inacessivel antes da primeira tentativa. Em E7, persistir o
   bloqueio antes de habilitar S50, projetar o objetivo de encontrar a Funda e
   abrir o journal uma unica vez. Tentativas seguintes exibem apenas o lembrete
   aprovado.
5. Transformar E20 em bau visual one-shot, com grant da Weapon 1 e estado de
   aberto persistente, acessivel somente depois do primeiro bloqueio. Ao abrir,
   atualizar o objetivo para equipar a Funda em Thorin.
6. Na tentativa posterior, permitir transferencia somente quando Actor 3 tiver
   Weapon 1 equipada. Posse no inventario ou equipamento em outro ator nao
   satisfazem a condicao.
7. Completar o tutorial de forma idempotente na saida aprovada e preservar o
   inicio e os callers posteriores de `aSemifinal` sem representar a mesma
   transicao em QuestCore e SQSM ao mesmo tempo.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Thorin ja inicia equipado e ignora todo o onboarding | `Actors.json#3` | Planejar a correcao de menor blast radius que garanta ausencia da Funda antes da primeira tentativa; validar New Game | gameplay engineer + Playtest |
| Porta aceita estado errado | E7 usa `[9,1,false]` | Actor 3/Weapon 1 branch e validator de parametros/indent | technical-implementer |
| Bau duplica Fundas | E20 nao possui self-switch/receipt | Grant one-shot, pagina aberta persistente e teste de spam/reentrada/load | gameplay engineer + QA |
| Journal aparece antes por outra superficie | S50 em Map022, tecla J, task list e OpenJournal em E11 | Inventariar e definir separadamente menu, modal, notificacao e tracker; garantir um unico momento de introducao | UX gate |
| Dupla autoridade com `aSemifinal` | chamadas SQSM e V29 estao distribuidas | Quest tutorial usa chave/estado distintos; nao migrar a mesma transicao parcialmente | architecture validator |
| VN deixa locks/pictures/audio | contrato QuestVN e comandos VisuStella | Asserts, finish/cleanup em todas as folhas, restore checks e Playtest | runtime-qa |
| ID de mapa incorreto | 49-51 livres, Map058 orfao | Reconciliar MapInfos/arquivos, alocar serialmente e round-trip no editor | data writer + editor gate |
| Layout do bau nao corresponde a dispensa | apenas proximidade E10/E20 e estatica | Confirmacao visual humana antes da escrita | level-design/human gate |
| Save legado falha | plugins declaram New Game only | Preservar politica e testar New Game; qualquer migracao de save vira demanda propria | human decision |
| Reflow de `plugins.js` | nova quest PKD vive em parametro gerado | Envelope, extracao estruturada, Plugin Manager e diff restrito | plugin workflow |

## Validators

Validators ja executados nesta analise:

- Parse JSON de `System`, `MapInfos`, `Map022`, `Map045`, `Map046`,
  `CommonEvents`, `CoretoQuests`, `Weapons`, `Items` e `Actors`: passou.
- Envelope de `plugins.js`: `editor-structural: valid; plugin_objects=69`.
- Extracao estruturada de plugins depois do envelope: passou; PKD unico e
  QuestCore/QuestVN/Cutscene ativos.
- `node --check` nos cinco plugins Coreto inspecionados: passou conforme o
  completion record do source-researcher.

Validators downstream obrigatorios:

- Parse e diff restrito de todo JSON alterado; sem reflow massivo.
- Registry: questKey/questId/estados/transicoes/objetivos unicos e fechados;
  cross-reference mapId/spawn/entryKey/eventId/allowedStates.
- MapInfos/file consistency, bounds, passabilidade e um unico evento VN
  elegivel; nenhum acesso direto ao mapa VN.
- Comandos 111/121/122/123/201/357/657: codigo, parametros, ordem e indent;
  nenhuma transfer no ramo bloqueado.
- E7: uma unica introducao do journal; repeticoes sem duplicacao; transfer
  somente para Actor 3 com Weapon 1 equipada.
- E20: inacessivel antes do primeiro bloqueio; depois dele, uma unica concessao,
  self-switch/pagina aberta e persistencia apos reentrada/save-load.
- E11 e novo VN: matriz antes/depois; zero conteudo migrado duplicado; asserts
  no inicio; `FinishVisualNovel` e cleanup em toda saida.
- Busca global por writers de S50, grants de Weapon 1, OpenQuestJournal,
  `aSemifinal` e estado tutorial; classificar qualquer caller residual.
- `plugins.js`: envelope, configuracao extraida, quest PKD unica, ordem
  preservada e diff de parametros; `node -c` para qualquer plugin editado.
- `git diff --check` e diff limitado aos targets aprovados.

## Human Gates

- **Interview/preflight:** concluida em 2026-07-31; nenhuma decisao
  `must_ask_now` permanece aberta.
- **Editor round-trip:** abrir Map045 e o novo VN, conferir coordenadas,
  passabilidade, trigger/prioridade, paginas e plugin commands; salvar, fechar e
  reabrir. Repetir no Plugin Manager se `plugins.js` mudar.
- **Playtest New Game:** executar, no minimo:
  - cena EX -> VN -> retorno EX e restauracao de posicao/direcao/menu/save,
    followers, audio, tint, zoom e pictures;
  - primeira tentativa sem Funda, repeticoes e abertura unica do journal;
  - bau inacessivel antes da primeira tentativa; liberado depois dela; spam,
    reentrada e load sem nova concessao;
  - Funda no inventario sem equipar; equipada em Thorin; equipada em outro
    ator; copia extra no inventario;
  - segunda tentativa, transferencia unica para Map007 e ausencia de softlock;
  - saves antes da porta, depois do tutorial, depois do bau e depois de equipar;
  - regressao de Map006 e inicio/continuidade de `aSemifinal`.
- Comportamento visivel permanece `runtime-pending` ate esses gates.

## Affected Docs

- Este artefato transiente:
  `planos/004-casa-forjaprata arquitetura/analise-tecnica.md`.
- Apos implementacao aprovada e validada, a documentacao duradoura deve receber
  contrato da Casa Forjaprata: papel EX/VN, quest tutorial, gate da Funda,
  primeiro contato com journal e state table. `docs/index.xml` deve ser
  atualizado somente pelo workflow de catalogacao apropriado.
- Nenhuma documentacao duradoura e alterada nesta analise.

## Stop Conditions

- Parar se o plano contradisser qualquer decisao aprovada na preflight de
  2026-07-31.
- Parar se a alocacao de mapa/variavel colidir com dados atuais ou se o editor
  nao aceitar o novo slot.
- Parar se nao for possivel separar E11/P1 sem perder staging, mensagem, audio,
  save description, self-switch ou cleanup.
- Parar se o fluxo exigir dupla escrita da mesma transicao por QuestCore e
  SQSM/V29.
- Parar se o primeiro bloqueio puder transferir, se tentativas repetidas
  reabrirem o tutorial, se o bau estiver acessivel antes desse bloqueio ou se
  puder conceder mais de uma Funda.
- Parar se qualquer pagina VN nao iniciar com asserts, tiver saida sem finish
  ou deixar sessao/lock/picture ativo.
- Parar se parse, schema, cross-reference, branch/indent, envelope, editor
  round-trip ou Playtest falhar.
- Suporte a saves legados permanece bloqueado sem nova decisao humana.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** arquitetura, fronteira da VN, sequencia porta/bau e contrato de
  onboarding foram aprovados e estao persistidos nesta analise.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none.
- **Implementation demand:**
  `planos/004-casa-forjaprata arquitetura/demanda.md`
- **Analysis file:**
  `planos/004-casa-forjaprata arquitetura/analise-tecnica.md`
- **Inherited restrictions and decisions:** Map045 permanece EX; Map046 nao
  pode ser reutilizado; somente E11/P1 migra para a nova VN; PKD permanece
  backend; a quest tutorial e separada de `aSemifinal` e nao pode escrever a
  mesma transicao; a Funda permanece inacessivel antes do primeiro bloqueio; o
  journal abre uma vez com objetivo de encontrar, depois equipar, e a saida
  conclui a quest; New Game e a politica atual; Map006 e callers posteriores
  permanecem fora de escopo salvo nova aprovacao.
- **Validators and human validation:** validators e gates das secoes acima,
  com editor round-trip e Playtest New Game obrigatorios.
- **Required skills:** `loki-implement-feature`,
  `rpg-maker-mz-project-inventory`,
  `rpg-maker-mz-data-json`, `rpg-maker-mz-plugin-workflow`,
  `rpg-maker-mz-visustella-events-presentation` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class: frontier_reasoning`,
  `execution_effort: high`, inventario read-only antes de writes, writer unico
  serializado para dados compartilhados e `validator_effort: high`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "completed"
  source_request: "planos/004-casa-forjaprata arquitetura/demanda.md"
  analysis_file: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
  research_gate: "not-needed"
  completed_steps:
    - "input and destination validated"
    - "catalog-guided durable-doc navigation"
    - "focused RPG Maker MZ ownership inventory"
    - "structured JSON/plugins.js/plugin/engine checks"
    - "architecture and runtime-QA proposal synthesis"
    - "human decision preflight completed and persisted"
  completed_handoffs:
    - "root -> bibliotecario -> completed_with_documentation_gaps"
    - "root -> source-researcher -> complete-static"
    - "root -> runtime-qa -> pending-human-validation proposal complete"
    - "root -> technical-implementer -> proposal-ready; former human-decision block resolved on 2026-07-31"
  evidence_status:
    static_structure: "validated for inspected sources"
    editor_round_trip: "pending downstream"
    runtime: "pending human Playtest"
  human_decision_preflight_required: false
  pending_questions: []
  approved_decisions:
    - "use a separate Coreto tutorial quest and preserve aSemifinal outside its authority"
    - "migrate only the current Map045 E11/P1 presentation to the new VN"
    - "keep the sling inaccessible until the first blocked exit attempt"
    - "open the journal once with find-sling, then equip-sling, and complete-on-exit feedback"
  recommended_option: "approved separate Coreto tutorial quest plus new VN"
  rejected_options:
    - "Map045-only local patch"
  deferred_options:
    - "full aSemifinal migration"
    - "QuestCore schema extension for equipped weapon requirement"
  implementation_demand_ref: "planos/004-casa-forjaprata arquitetura/demanda.md"
  inherited_restrictions:
    - "analysis Markdown is the only write in this workflow"
    - "no runtime, engine, plugin, data, asset, save or durable-doc writes"
    - "preserve Map045 as EX and do not reuse Map046"
    - "preserve unrelated user work and untracked save"
    - "New Game only unless separately approved"
  direct_write_exception:
    target: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
    owner: "/root"
    reason: "No appropriate consumer technical-analysis Write Agent was available; domain agents were read-only/proposal-only."
    validators: ["template headings", "source path checks", "git diff --check", "artifact self-containment"]
    future_write_agent_opportunity: "A dedicated consumer analysis writer could own transient plan Markdown in future workflows."
  recommended_next_command: "loki-implement-feature"
  next_action: "generate and execute the unified implementation plan from the demand and this analysis"
  blocked_by: []
```
