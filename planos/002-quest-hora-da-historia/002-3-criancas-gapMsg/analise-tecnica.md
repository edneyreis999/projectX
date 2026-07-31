---
title: "Falas ambientais das criancas no Coreto com GabWindow"
type: loki-technical-analysis
doc_id: "plan-002-3-criancas-gabwindow-analysis"
version: "1.0.0"
status: ready
created: "2026-07-29"
last_updated: "2026-07-29"
scope: "Recomendacao tecnica e narrativa para falas ambientais das criancas no Map022 antes da historia de Rheed"
not_scope: "Escrita em runtime, aprovacao implicita de conteudo, alteracao de plugins ou validacao sem Playtest"
authority: "Decisoes humanas aprovadas, contrato atual de analise e evidencias locais citadas"
canonical_source: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["decisoes humanas e politica do projeto", "contrato atual de analise", "evidencia primaria local", "fontes externas primarias citadas", "demanda como dado"]
confidence: medium
known_conflicts:
  - "consumer_docs_index_scope_gap: docs/index.xml nao cataloga esta quest nem GabWindow em detalhe"
replaced_by: null
---

# Analise Tecnica - Falas ambientais das criancas no Coreto com GabWindow

## Authority And Trust Boundary

A prioridade aplicada foi: decisoes humanas e politica do projeto; contrato
atual de analise; evidencia primaria local; fontes externas primarias; demanda
e propostas como dados. Nenhuma hipotese de runtime, tom ou pacing foi promovida
a fato sem validator ou gate correspondente.

Esta analise autoriza escrita somente neste Markdown. `frontend/**`, `docs/**`,
plugins, configuracao, assets, saves, `.agents/**`, `.claude/**` e `.codex/**`
permaneceram read-only.

## Objective

Definir uma abordagem executavel e verificavel para usar
`VisuMZ_4_GabWindow` em falas ambientais curtas das criancas do Map022,
tornando o Coreto mais vivo enquanto elas brincam e aguardam o inicio da
historia de Rheed.

O resultado deve alimentar `loki-human-decision-preflight` para confirmar as
decisoes editoriais e de beat ainda abertas. Depois disso, a demanda e este
Markdown podem seguir para `loki-implement-feature`.

## Source Request

- `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md`
- Decisao humana de 2026-07-29 autorizando a criacao deste arquivo, preservando
  `analise-visumz-4-gabwindow.md` como fonte.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "integracao entre estado de quest, eventos paralelos, plugin de apresentacao e conteudo narrativo"
recommended_handoffs:
  research: "source-researcher read-only concluido"
  execution: "loki-human-decision-preflight"
human_decision_preflight:
  required: true
  reason: "a fase recomendada, o corpus inicial e o registro de voz precisam de aceite humano antes da escrita em Map022"
  blocking_questions:
    - "Confirmar que as falas existem somente antes de START, em V106=0, e cessam quando a convocacao comeca."
    - "Confirmar o corpus inicial de 12 falas e o registro coloquial leve com 'pra'."
    - "Confirmar que falas de transicao apos a convocacao ficam fora da primeira entrega."
validator_effort: high
```

## Scope

- Map022 (`EX_Coreto`) e seus eventos relacionados as criancas e a quest.
- `VisuMZ_4_GabWindow` v1.05, sua configuracao ativa e seus comandos Gab.
- Estado `v_qNoiteDaHistoria_stage` (variavel 106) e o handoff da convocacao.
- Arquitetura de um produtor unico, cadencia, fila, ancoragem e cleanup.
- Corpus candidato de falas, restricoes por beat e criterios editoriais.
- Validators estaticos e Playtest humano futuro.

## Out Of Scope

- Alterar `frontend/data/Map022.json` nesta analise.
- Alterar `CommonEvents.json`, `System.json`, `CoretoQuests.json`, `plugins.js`
  ou qualquer plugin.
- Criar scheduler customizado, variavel global de RNG, audio ou assets.
- Individualizar permanentemente as 17 criancas com nomes, idades ou lore.
- Declarar layout, timing, audio, reachability ou comportamento runtime validado.
- Catalogar documentacao duradoura ou alterar `docs/index.xml`.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` | local/project-policy | Mudancas em `frontend/data` devem preferir VisuStella/Coreto e consultar a documentacao local | Roteamento e restricoes |
| `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md` | local/source-request | Falas ambientais de criancas brincando e aguardando Rheed no Map022 | Objetivo e conteudo |
| `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md` | local/technical-analysis | Fila FIFO, timing, ancoragem, Force/Clear/Wait, configuracao e riscos estaticos | Contrato do plugin |
| `planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md` | local/prior-analysis | Estado da quest, 17 criancas, reposicionamento e riscos das paginas paralelas | Continuidade com mudanca anterior |
| `frontend/data/Map022.json` | local/primary | Map 17x27; 30 eventos; 17 criancas; eventos 18, 21, 22, 23 e 30; slots 4 e 20 nulos | Ownership, concorrencia e alvo |
| `frontend/data/MapInfos.json` | local/primary | Map022 e `EX_Coreto` | Identidade do alvo |
| `frontend/data/System.json` | local/primary | V106=`v_qNoiteDaHistoria_stage`; S43=`Fala-ID1` | Contratos de estado e handoff |
| `frontend/data/CoretoQuests.json` | local/primary | `noite-da-historia`: 0 -> 10 -> 20 -> 90 | Janela narrativa |
| `frontend/data/CommonEvents.json` | local/primary | 200 Common Events e nenhum owner adequado/Gab caller identificado | Rejeitar ampliacao para Common Event |
| `frontend/js/plugins.js` | local/config-primary | 69 plugins; GabWindow ativo na ordem 45, depois do Core Engine | Disponibilidade e integracao |
| `frontend/js/plugins/VisuMZ_4_GabWindow.js` | local/plugin-primary | v1.05; comandos, argumentos, overrides e semantica estatica | Payload e riscos |
| `frontend/js/rmmz_objects.js` | local/engine-primary | `code:357`, waits, autorun e interpretes paralelos | Semantica dos comandos de evento |
| `docs/index.xml` | local/durable-index | Catalogo valido, mas sem entrada especifica para Hora da Historia ou GabWindow | Lacuna documental |
| `docs/domains/{quest-content-designer,narrative-designer,scene-presentation-designer,gameplay-engineer}/README.md` | local/durable-context | Contexto macro de Rheed, Coreto, quests, staging e eventos | Tom e gates, sem substituir runtime |

## Agent Handoff Record

| Origin | Destination | Objective | Status | Evidence / next destination |
| --- | --- | --- | --- | --- |
| Orchestrator | `source-researcher` | Mapear Map022, estado, plugin e payload | `complete-static-runtime-pending` | IDs, eventos, estados, comandos e riscos confirmados |
| Orchestrator | `bibliotecario` | Navegar `docs/index.xml` | `partial_with_catalog_gap` | Contexto macro encontrado; quest/GabWindow nao catalogados |
| Orchestrator | `technical-implementer` | Propor arquitetura sem escrever | `proposal-only-complete` | Controlador unico no evento 20 recomendado |
| Orchestrator | `narrative-designer` | Propor corpus curto e restricoes de beat | `proposal-only-complete` | 24 candidatas e baseline de 12 |
| Orchestrator | `runtime-qa` | Propor validators e Playtest | `proposal-only-complete` | Checklist estrutural e matriz humana definidos |
| Esta analise | `loki-human-decision-preflight` | Resolver as tres decisoes editoriais materiais | `pending` | Perguntas em `Handoff To Next Command` |

Os completion records foram tratados como evidencia sanitizada. Nenhum agente
escreveu em runtime e nenhum raciocinio privado foi solicitado ou persistido.

## Evidence Classification

### Facts

- Map022 e `EX_Coreto`, mede 17x27, possui 30 eventos e e o mapa inicial do
  projeto no snapshot analisado.
- Existem 17 eventos chamados `Crianca`, IDs
  `1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,19,32`.
- Antes de V106=10, as criancas usam movimento autonomo. Em V106>=10, suas
  paginas superiores paralelas executam `Move To` sem Wait para assumir as
  posicoes da historia.
- O evento 21, `criancas ansiosas`, ja e paralelo e aplica rotas repetidas a
  11 criancas. Ele nao e um owner seguro para uma nova fila de falas.
- O evento 30 faz a convocacao, liga S43 (`Fala-ID1`) imediatamente antes do
  primeiro `Show Text` e executa `QuestTransition START` ao final, mudando a
  quest de 0 para 10.
- O evento 18 fica disponivel em V106>=10 e encaminha para a VN
  `CENA_PRINCIPAL`; COMPLETE_VN muda 10 para 20 e a chegada ao Map045 leva 20
  para 90.
- O slot de evento 20 esta nulo no snapshot atual.
- `VisuMZ_4_GabWindow` v1.05 esta ativo na ordem 45/69, depois do Core Engine,
  com `AntiRepeat=true`, `BaseWaitTime=90`, `TimePerCharacter=4` e
  `FadeRate=16`.
- Map022 nao possui caller `code:357` do GabWindow. A analise anterior tambem
  nao encontrou callers no inventario global daquele snapshot.
- Gab normal e FIFO e nao bloqueia o gameplay. `WaitForGab` bloqueia apenas o
  interpreter que o chama ate a fila global e a gab atual terminarem.
- `ForceGab` e `ClearGab` nao substituem sincronicamente a gab visivel; ela
  ainda pode concluir o fade. Por isso a proposta nao usa callbacks, switches
  finais nem audio por gab.
- `Override.EventID` ancora a gab a um evento, mas o plugin nao oferece clamp
  explicito de tela.

### Inferences

- A ambientacao livre pertence a V106=0: a demanda descreve brincadeira e
  espera antes do inicio; V106=10 ja inicia reposicionamento e handoff para VN.
- Um controlador unico e superior a 17 produtores porque torna ordem, fila,
  cadence e desligamento deterministas.
- O slot nulo 20 e o melhor owner local: evita acoplar fala ao controlador de
  movimento e mantem a mudanca em um unico mapa.
- S43 pode atuar como corte antecipado: uma pagina superior vazia no evento 20
  desativa o paralelo antes do primeiro dialogo da convocacao; V106>=10 atua
  como fallback canonico para visitas posteriores.
- `GabTextOnly` com `Override.EventID` evita duplicar o sprite dentro da janela
  e preserva a leitura como fala ambiental ancorada.
- Um round-robin fixo de 12 falas e intervalos heterogeneos e preferivel na
  primeira entrega: produz variedade sem nova variavel, RNG em script ou
  scheduler customizado.

### Hypotheses

- **Runtime pending:** `WaitTime=72`, `TimePerCharacter=2` e silencio total de
  aproximadamente 8-12 segundos entre inicios de falas produzirao ritmo
  discreto e legivel.
- **Runtime pending:** os IDs centrais `3,7,10,12,13,16,32` reduzirao clipping,
  mas camera, movimento e viewport ainda podem cortar gabs.
- **Narrative review pending:** o registro coloquial leve com `pra` combina com
  o restante do jogo.
- **Editor pending:** o payload final `Override:struct` e seus `code:657`
  espelhados serao aceitos pelo RPG Maker MZ quando materializados.

### Open Questions

- A primeira entrega deve confirmar somente V106=0, como recomendado, ou
  tambem emitir falas no intervalo V106=10 antes da VN?
- O baseline de 12 falas abaixo e o registro coloquial leve estao aprovados?
- As quatro falas de transicao devem permanecer fora da primeira entrega?
- As criancas permanecem um coro anonimo, sem vozes individuais persistentes?

## Affected Surfaces

### Runtime, Engine or Framework

- Futuro target de producao: `frontend/data/Map022.json`.
- Dependencias read-only: RPG Maker MZ, `VisuMZ_4_GabWindow`, Core Engine e
  Coreto Quest/VN.
- Nenhuma alteracao em engine, plugin ou configuracao e recomendada.

### Integration Points

- Novo evento 20 como controlador unico de ambiente.
- Evento 30 como handoff entre ambiente e convocacao.
- V106 e S43 como contratos de ativacao/desativacao.
- `GabTextOnly`, `ClearGab` e `WaitForGab`.
- `code:357` e continuacoes `code:657` geradas para comandos de plugin.
- `code:230` para intervalos entre falas.

### State and Data Contracts

| Contract | Expected behavior |
| --- | --- |
| V106=0 e S43 OFF | Evento 20 usa a pagina ambiental paralela |
| S43 ON | Pagina superior vazia desativa novas emissoes antes do primeiro dialogo da convocacao |
| V106>=10 | Pagina superior canonica mantem a ambientacao inativa em visitas posteriores |
| V106=10 | As 17 criancas se reposicionam; nenhuma nova gab ambiental nasce |
| V106=20/90 | Nenhuma fala de espera ou inicio e permitida |
| Fila Gab | Um unico produtor; `ForceGab=false`; uma gab por vez |
| Persistencia | Fila e gab atual sao temporarias; nao adicionar estado persistido novo |

A recomendacao exige tres paginas no evento 20, nesta ordem logica:

1. pagina base, sem condicao, `Parallel`, invisivel e nao interativa;
2. pagina superior vazia, nao paralela, condicionada a S43 ON;
3. pagina superior vazia, nao paralela, condicionada a V106>=10.

Como o RPG Maker escolhe a pagina valida de maior indice, S43 interrompe o
produtor antes do primeiro `Show Text`, enquanto V106 preserva o estado
terminal da ambientacao.

## Research Gate

**Decision:** not-needed

**Reason:** a decisao depende da versao local instalada do plugin, dos dados
atuais do Map022, do engine local e dos contratos Coreto. Essas fontes foram
inspecionadas diretamente. Pesquisa web nao substituiria o snapshot local e
nao e necessaria para a recomendacao.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa nao executada | Evidencia local e suficiente; Playtest continua obrigatorio |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Novo controlador no evento 20 | Slot nulo; um mapa; fila global FIFO | Um produtor, cadence controlada, desligamento claro, diff local | Cria um evento novo e exige Playtest | **use** |
| Reutilizar evento 21 | Paralelo atual controla 11 criancas | Evita novo ID | Acopla fala a movimento e pode reenfileirar ao reiniciar | reject |
| Inserir nas 17 criancas | Eventos ja existem e podem ancorar a si mesmos | Distribuicao local por falante | Ate 17 produtores, flood, concorrencia e manutencao alta | reject |
| Common Event paralelo | Superficie nativa reutilizavel | Poderia atender outros mapas | Exige switch de lifecycle, guarda de mapa e outro arquivo sem reuso atual | reject |
| Custom plugin/scheduler | Controle total de RNG e fila | Flexibilidade futura | Nova manutencao sem lacuna funcional demonstrada | defer |
| Falas apenas em marcos finitos | Eventos 30/18 ja existem | Sem loop ambiental | Nao atende a vivacidade durante a espera | reject como solucao principal |
| Bloquear/deferir | Decisoes editoriais ainda abertas | Evita assumir beat e voz | Preflight humano pode resolver com baixo custo | use apenas se preflight rejeitar baseline |

## Recommendation

### Arquitetura

Editar futuramente somente `frontend/data/Map022.json`:

1. materializar o evento 20 como `EX - Ambientacao: criancas`;
2. usar uma pagina base paralela com Wait inicial de 180 frames;
3. percorrer um round-robin fixo de 12 falas, cada uma ancorada a uma crianca;
4. para cada item, executar `GabTextOnly`, depois `WaitForGab`, depois um Wait
   entre 360 e 540 frames;
5. usar `ForceGab=false`, `EventID`, `WaitTime=72` e
   `TimePerCharacter=2`;
6. nao usar `SoundFilename`, `GabSwitch`, `OnDisplayJS`, `OnFinishJS`,
   `BypassAntiRepeat`, `ForceGab` ou `Override.Width`;
7. adicionar as paginas superiores vazias por S43 e V106 conforme o contrato;
8. no evento 30, preservar o comando existente que liga S43 e, imediatamente
   depois dele e antes do primeiro `Show Text`, inserir `ClearGab` seguido de
   `WaitForGab`.

Essa ordem e material: S43 desativa o produtor primeiro; `ClearGab` remove a
fila pendente; `WaitForGab` aguarda o fade da gab atual. Colocar cleanup antes
do gate permitiria que o paralelo reenfileirasse uma fala durante a convocacao.

O payload `Override:struct` deve ser gerado pelo editor ou por serializer que
reproduza o formato aceito pelo editor. Nao montar manualmente um struct amplo
com campos vazios.

### Corpus inicial recomendado

O baseline usa 12 falas independentes. Pares, conflitos e falas de transicao
ficam como reserva para evitar sincronizacao e disputa de foco na primeira
entrega.

| Order | EventID candidate | Category | Text | Gap after completion |
| ---: | ---: | --- | --- | ---: |
| 1 | 3 | brincadeira | Até o coreto e volta. Valendo! | 420 frames |
| 2 | 7 | expectativa | Vai demorar muito? | 480 frames |
| 3 | 10 | curiosidade | Que história o Rheed vai contar? | 360 frames |
| 4 | 12 | expectativa | Guarda um lugar pra mim? | 540 frames |
| 5 | 13 | brincadeira | Não pisa na linha! | 420 frames |
| 6 | 16 | curiosidade | É uma história de muito tempo atrás? | 480 frames |
| 7 | 32 | ambiente | O coreto fica bonito assim. | 540 frames |
| 8 | 3 | expectativa | Acho que já vai começar. | 360 frames |
| 9 | 7 | curiosidade | Será que isso aconteceu mesmo? | 480 frames |
| 10 | 10 | expectativa | Eu quero sentar lá na frente! | 420 frames |
| 11 | 12 | curiosidade | Eu vou tentar não interromper. | 540 frames |
| 12 | 13 | ambiente | Tem lugar pra todo mundo? | 480 frames |

Os acentos e a pontuacao devem ser preservados exatamente no payload real.

### Corpus de reserva

| Group | Candidate lines | Restriction |
| --- | --- | --- |
| Brincadeira em dupla | `Você não me pega!` / `Pego sim! Volta aqui!` | Usar juntas e sem outra fala intercalada |
| Pequeno conflito | `Eu cheguei primeiro!` / `Dá pra gente sentar junto.` | Somente antes da convocacao |
| Reconciliacao | `Não vale empurrar!` / `Desculpa... eu não faço de novo.` | Somente antes da convocacao |
| Ambiente espacial | `Olha como a chama dança!` / `Será que o Rheed vai ficar ali?` | Exige composicao visual coerente |
| Transicao | `Chamaram! É agora!`, `Corre, pega o seu lugar!`, `Psiu... o Rheed chegou.`, `Shhh... vai começar.` | Fora da primeira entrega; depende de beat e staging aprovados |

Evitar falas que inventem tradicao, parentesco, idade ou lore material, como
afirmar que Rheed sempre conta a historia ou explicar Gildrat, queda e refugio.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Flood ou fila crescente | Fila global; paralelos reiniciam listas | Um produtor; `WaitForGab`; gap de 360-540; auditoria de callers | validator + Playtest |
| Gab sobre o primeiro dialogo | START ocorre ao fim do evento 30 | S43 desativa o produtor; depois `ClearGab` + `WaitForGab` antes de `Show Text` | structural validator + Playtest |
| Concorrencia com movimento | Evento 21 e paginas V106>=10 controlam criancas | Ambientacao cessa antes de V106=10; nao tocar eventos das criancas/21 | regression guard |
| Clipping nas bordas | Sem clamp explicito | Baseline em IDs centrais; testar camera, movimento e extremos | human-validation |
| Cadencia cansativa | Timing percebido nao e estatico | Baseline 8-12 s; Playtest de cinco minutos; ajustar waits | human-validation |
| Repeticao previsivel | Round-robin fixo | 12 linhas, gaps variados e corpus de reserva; sem RNG na primeira entrega | narrative review |
| Tom destoante | Idades/vozes nao documentadas | Coro anonimo, frases simples, revisao de `pra`/registro | human decision preflight |
| Payload rejeitado pelo editor | Nao ha caller Gab local de referencia | Gerar/confirmar no editor e validar `code:357/657` | editor gate |
| Clear tardio | Plugin conclui fade da gab atual | Sem callbacks/switch/audio; WaitForGab apos Clear | Playtest |
| Save/reentrada | Estado Gab e temporario | Testar transfer, menu, reentrada e save/load; nao persistir fila nova | human-validation |
| Evento 20 ocupado por mudanca concorrente | Slot nulo apenas no snapshot atual | Revalidar imediatamente antes da escrita | stop condition |
| Lacuna em docs | Catalogo nao cobre quest/GabWindow | Backlog separado para `loki-catalogar-docs`; nao bloquear a feature | catalogador |

## Validators

### Antes da escrita de producao

- Revalidar que `events[20]` continua nulo e que o ID 20 e unico.
- Parsear estruturalmente Map022, System, CoretoQuests e plugins.js.
- Confirmar GabWindow unico, ativo, depois do Core Engine e sem diff.
- Confirmar IDs das 17 criancas e assinatura das paginas/rotas existentes.
- Confirmar que S43 ainda e ligado imediatamente antes do primeiro `Show Text`
  do evento 30 e que START ainda muda V106 de 0 para 10.
- Confirmar a decisao humana sobre fase, corpus e transicoes.

### Depois da escrita de producao

- Parse JSON de `frontend/data/Map022.json`.
- Diff restrito a `events[20]` e ao ponto aprovado do evento 30, sem reflow.
- Confirmar tres paginas do controlador, ordem, condicoes, trigger e listas.
- Confirmar zero comandos GabWindow nas 17 criancas e no evento 21.
- Para cada Gab, validar shape `code:357`, plugin, comando, texto JSON,
  `ForceGab=false` e `Override:struct` decodificavel.
- Confirmar todo `EventID` no conjunto aprovado e existente no Map022.
- Confirmar sequencia `GabTextOnly -> WaitForGab -> code:230` e gaps aprovados.
- Confirmar sequencia `S43 ON -> ClearGab -> WaitForGab -> Show Text` no evento 30.
- Confirmar ausencia de callbacks, switches finais, audio, Force e Clear fora do
  handoff aprovado.
- Preservar as 17 rotas `Move To`, destinos, `Turn Up`, `wait=false`, gates e
  demais eventos.
- Confirmar zero diff em System, CoretoQuests, CommonEvents, plugins e assets.
- Abrir, salvar e reabrir o projeto no RPG Maker MZ para confirmar que o
  Plugin Manager/editor aceita os payloads e continuacoes.

Checks estaticos provam estrutura e escopo; nao provam visuais, cadence, input,
audio, reachability, save/load ou comportamento do plugin em runtime.

## Human Gates

### Decision preflight antes da implementacao

- Aprovar ambientacao somente em V106=0, encerrada por S43/V106.
- Aprovar o baseline de 12 falas e o registro coloquial.
- Aprovar a exclusao de falas de transicao na primeira entrega.

### Playtest obrigatorio depois da implementacao

- Testar V106 em 0, 10, 20 e 90 e a transicao 0->10.
- Permanecer no mapa por pelo menos cinco minutos, parado e caminhando.
- Confirmar uma gab por vez, fila drenando e intervalo percebido de 8-12 s.
- Confirmar ausencia de repeticao consecutiva, rajadas e flood.
- Observar todas as criancas usadas, camera rolando, movimento e bordas.
- Testar menor/maior texto, wrapping, contraste e duracao.
- Acionar o evento 30 durante uma gab: nenhuma nova emissao apos S43; a gab
  atual encerra antes do `Show Text`; START e reposicionamento continuam.
- Testar menu, transferencia, retorno ao mapa e save/load antes/durante/depois
  de uma gab.
- Confirmar input livre, ausencia de erro, freeze, softlock, audio inesperado e
  regressao na VN ou saida para Map045.

Qualquer flood, clipping inaceitavel, mensagem sobreposta ao dialogo, rota
reiniciada, progressao bloqueada, input preso ou payload rejeitado reprova o
gate e exige retorno ao planejamento.

## Affected Docs

- Nenhuma documentacao duradoura precisa ser alterada para implementar a
  primeira entrega.
- Backlog nao bloqueante: catalogar a quest Hora da Historia e a referencia
  local do GabWindow em `docs/index.xml` via `loki-catalogar-docs`.

## Stop Conditions

- Parar se o evento 20 deixar de estar nulo ou Map022 deixar de ser o owner.
- Parar se GabWindow estiver inativo, duplicado ou com payload diferente do
  header/configuracao analisados.
- Parar se S43, evento 30 ou a maquina 0->10->20->90 divergirem.
- Parar se o preflight humano nao aprovar fase, corpus e transicoes.
- Parar se a solucao exigir CommonEvents, System, CoretoQuests, plugins, assets
  ou qualquer arquivo fora do envelope aprovado.
- Parar se parse, payload, cobertura ou diff restrito falhar.
- Nao declarar runtime validado enquanto o Playtest estiver pendente ou falhar.

## Handoff To Next Command

- **Human decision preflight required:** `true`
- **Reason:** a arquitetura tecnica esta resolvida, mas a janela narrativa, o
  corpus inicial e o registro de voz precisam de aceite humano antes de virar
  task de producao.
- **Recommended next command:** `loki-human-decision-preflight`
- **Preflight input:**
  1. Aprovar falas somente em V106=0, encerradas quando S43 inicia a convocacao.
  2. Aprovar as 12 falas do baseline e o uso leve de `pra` no texto final.
  3. Confirmar que falas de transicao permanecem fora da primeira entrega.
- **Implementation demand:**
  `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md`
- **Analysis file:**
  `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-tecnica.md`
- **Inherited restrictions and decisions:** somente Map022; controlador unico
  no slot 20; nenhuma Gab nas 17 criancas ou evento 21; S43/V106 encerram a
  ambientacao; sem audio, callbacks, Force, RNG global, Common Event ou plugin
  customizado; demais superficies read-only.
- **Validators and human validation:** validators estruturais e Playtest
  descritos acima.
- **Required skills:** `rpg-maker-mz-data-json`,
  `rpg-maker-mz-project-inventory`,
  `rpg-maker-mz-visustella-plugin-index`,
  `rpg-maker-mz-visustella-plugin-commands` e
  `rpg-maker-mz-visustella-events-presentation`.
- **Downstream execution profile:** `model_class=coding`,
  `execution_effort=high`, writer unico para Map022, auditor/validator
  independente, `validator_effort=high`, Playtest humano obrigatorio.

## Authoring Record

- Owner deste arquivo: orquestrador `/root`.
- Implementacao: escrita direta de artefato transitorio.
- Motivo da excecao: nenhum Write Agent apropriado e autorizado para a analise
  Markdown do consumidor estava disponivel; agentes tecnicos e narrativos eram
  read-only/proposal-only.
- Allowed write: somente este arquivo.
- Forbidden writes: runtime, docs duraveis, configuracao, plugins, assets,
  dados gerados e metadados de agentes.
- Evidencia esperada: parse estrutural, source map, matriz, validators, gates e
  handoff verificavel.
- Oportunidade futura: um Write Agent de analise tecnica transitoria poderia
  assumir este alvo sob o mesmo envelope e auditoria independente.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-human-decision-preflight"
  sources_read:
    - "AGENTS.md"
    - "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md"
    - "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md"
    - "planos/002-quest-hora-da-historia/002-2-ajustes-coreto/analise-tecnica.md"
    - "frontend/data/Map022.json"
    - "frontend/data/MapInfos.json"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json"
    - "frontend/data/CommonEvents.json"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/VisuMZ_4_GabWindow.js"
    - "frontend/js/rmmz_objects.js"
    - "docs/index.xml"
  research_gate: "not-needed"
  human_decision_preflight_required: true
  pending_questions:
    - "Aprovar somente V106=0 e corte por S43."
    - "Aprovar baseline de 12 falas e registro coloquial."
    - "Excluir falas de transicao da primeira entrega."
  implementation_demand_ref: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/demanda.md"
  analysis_file: "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-tecnica.md"
  inherited_restrictions:
    - "future production target limited to frontend/data/Map022.json"
    - "event 20 single producer; children and event 21 remain unchanged"
    - "no plugin/config/CommonEvent/System/CoretoQuests/asset writes"
    - "Playtest required before runtime completion"
  validators:
    - "parse-json"
    - "plugin-envelope-and-status"
    - "target-and-state-contract"
    - "code357-and-struct-payload"
    - "single-producer-and-flood-safety"
    - "restricted-diff-and-regression-guard"
    - "editor-acceptance"
    - "human Playtest"
  recommended_next_command: "loki-human-decision-preflight"
  next_action: "resolver as tres decisoes editoriais e entao executar loki-implement-feature"
  blocked_by:
    - "human decision on phase, baseline corpus and transition lines"
```
