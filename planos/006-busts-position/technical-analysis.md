---
title: "Padronizacao de bustos na VN Map049"
type: loki-technical-analysis
doc_id: "plan-006-busts-position-technical-analysis"
version: "1.1.0"
status: completed
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Recomendacao tecnica baseada em evidencias e handoff para a adequacao dos bustos no Map049"
not_scope: "Escritas de producao, alteracoes de plugins ou parametros globais, criacao de assets e dialogos de exploracao"
authority: "Decisoes aprovadas na demanda, contrato de analise vigente e evidencias locais citadas"
canonical_source: "planos/006-busts-position/technical-analysis.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: high
known_conflicts:
  - "A demanda agrupa a posicao 5 no lado esquerdo; a formula configurada coloca a posicao 5 exatamente no centro horizontal (X=640 em 1280 px)."
replaced_by: null
---

# Analise Tecnica - Padronizacao de bustos na VN Map049

## Authority And Trust Boundary

A prioridade desta analise e: decisoes humanas aprovadas e politica do projeto;
contrato atual de analise; evidencias locais primarias; fontes externas primarias
citadas; e, por ultimo, a demanda, conteudo recuperado e exemplos como dados.
As decisoes narrativas materiais do beat final foram resolvidas no preflight:
Rheed e o speaker e `Portraits/Principal/Reed final` e o asset aprovado.

## Objective

Definir uma alteracao estruturada, minima e verificavel para que o `Map049`
mantenha Thorin, representante do jogador, a esquerda durante falas de NPCs,
posicione NPCs a direita e troque expressoes sem reentrada desnecessaria. A
analise, agora enriquecida pelas decisoes do preflight, deve alimentar
diretamente o planejamento e a implementacao unificados.

## Source Request

- `planos/006-busts-position/improved-demand.md`

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "conflicting local position evidence resolved by scoped recommendation"
recommended_handoffs:
  research: "source-researcher completed read-only local inventory"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "Preflight concluido: o speaker final e Rheed e o asset aprovado e Portraits/Principal/Reed final."
  blocking_questions: []
validator_effort: medium
```

## Scope

- Analisar `frontend/data/Map049.json`, Map 49, Event 1, Page 1.
- Definir o lifecycle dos Pictures 1 (NPC) e 2 (Thorin) usando comandos
  existentes de `VisuMZ_2_VNPictureBusts`.
- Confirmar plugin ativo, posicoes, payloads, assets referenciados, cleanup,
  validators estruturais e Playtest futuro.
- Ler `CommonEvents.json`, Common Event 16, somente para confirmar como as
  falas acionadas pelo mapa sao apresentadas.

## Out Of Scope

- Qualquer mapa alem do `Map049`, incluindo mapas e dialogos de exploracao.
- `VisuMZ_4_GabWindow`, salvo como evidencia da fronteira de escopo.
- Alteracoes em `frontend/js/plugins.js`, plugins vendor ou Coreto, parametros
  globais, `CommonEvents.json`, assets, saves e documentacao duradoura.
- Criar, escolher por suposicao ou renomear bustos e expressoes.
- Declarar composicao, espelhamento, layering, timing ou legibilidade aprovados
  sem Playtest humano.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/006-busts-position/improved-demand.md` | user-decision | Thorin a esquerda, NPCs a direita, somente VN/Map049, sem novos assets e com Playtest | Escopo, criterios e restricoes |
| `AGENTS.md` | project-policy | Preferir VisuStella/Coreto e consultar a documentacao local antes de alterar `frontend/data` | Prioridade e limites |
| `frontend/data/MapInfos.json` | local-primary | Map 49 se chama `NV_Casa_Forjaprata` | Identidade do alvo |
| `frontend/data/Map049.json` | local-primary | Event 1/Page 1, sequencia de comandos, Pictures 1/2, posicoes e payload vazio | Estado atual, conflitos e proposta |
| `frontend/data/CommonEvents.json`, ID 16 `NSD_Format` | local-primary | Renderiza as variaveis 101-103 em Show Text; nao define a identidade do beat final | Caller chain e lacuna narrativa |
| `frontend/data/System.json` | local-primary | Resolucao 1280x720 | Calculo das posicoes configuradas |
| `frontend/js/plugins.js` | local-primary | `VisuMZ_2_VNPictureBusts` ativo, ordem 24, Tier 2, v1.03; anchor, escala, mirror e formula de posicao | Contrato de configuracao |
| `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js` | local-vendor | Header de `Basic_EnterBust`, `Basic_ExitBusts` e `Basic_GraphicChange`; IDs maiores ficam em camada superior | Semantica e payloads |
| `frontend/js/rmmz_objects.js`, `command357` | local-engine | `params[0]`, `params[1]` e `params[3]` selecionam plugin, comando e argumentos | Semantica independente do code 357 |
| `frontend/data/Map046.json` | local-primary-example | Seis usos estruturados de `Basic_GraphicChange` com `PictureID:eval` e `PictureName:str` | Confirmacao local do payload |
| `frontend/img/pictures/Portraits/Principal/**` e `frontend/img/pictures/SF_Monster_3.png` | local-assets | Os cinco bustos aprovados, incluindo `Reed final`, e a imagem do monstro existem com grafia/case exatos | Gate de assets |
| `docs/index.xml` | local-durable-index | Catalogo valido, mas sem entrada especifica para Map049/VNPictureBusts | Lacuna documental |
| `docs/domains/scene-presentation-designer/README.md` | local-durable | Lifecycle VN, uso de GraphicChange e necessidade de validacao manual perceptivel | Convencao existente e gate humano |
| `docs/architecture/exploration-dialogue-gabwindow.md` | local-durable | Exploracao usa GabWindow somente texto e segue sem aguardar | Fronteira VN versus exploracao |
| `planos/006-busts-position/improved-demand.md`, `Decisoes humanas registradas` | user-decision | Speaker final Rheed; asset aprovado `Portraits/Principal/Reed final` | Handoff direto e payload do beat final |

## Evidence Classification

### Facts

- `Map049` possui um unico evento: Event 1, `VN - Casa Forjaprata: pesadelo e
  despertar`, com uma pagina e 104 comandos. A lista inicia com
  `AssertVisualNovelSession` e termina com `FinishVisualNovel`.
- No estado atual, Mélia usa Picture 1 e Position 5; Sáparo usa Picture 1 e
  Position 9; Thorin usa Picture 2 e Position 1.
- Thorin entra apenas depois das chamadas do Common Event 16 que apresentam as
  falas de Mélia e Sáparo. Assim, ele nao esta presente durante esses beats.
- `Thorin_confusão` e seguido imediatamente por nova chamada de
  `Basic_EnterBust` para `Thorin_bobo` no mesmo Picture 2.
- O header do plugin declara que `Basic_GraphicChange` altera o grafico de um
  busto sem alterar suas outras propriedades e e apropriado para expressoes.
- O plugin esta ativo e sua formula gera X=208 para Position 1, X=640 para
  Position 5 e X=1072 para Position 9 na resolucao configurada de 1280 px.
- `Mélia_desespero.png` (408x560), `Sáparo_pistola.png` (688x570),
  `Thorin_confusão.png` (408x560), `Thorin_bobo.png` (409x560) e
  `Reed final.png`, alem de `SF_Monster_3.png` (330x350), existem.
- O comando de indice estrutural original 78 e `Basic_EnterBust`, Picture 1,
  Position 5, com `PictureName:str` vazio. O Show Text seguinte nao informa
  speaker.
- O preflight humano confirmou que esse Show Text e uma fala de Rheed e aprovou
  o asset existente `Portraits/Principal/Reed final` para o Picture 1.
- O `code:357` executa o comando do plugin; `code:657` e continuacao de exibicao
  do editor e nao possui handler proprio no engine local.

### Inferences

- Position 5 nao satisfaz de forma inequivoca a regra de NPC a direita porque
  coincide com o centro horizontal; Position 9, ja usada por Sáparo, e a opcao
  local conservadora para Mélia.
- Manter Picture 1 para NPC e Picture 2 para Thorin preserva a convencao ja
  presente no mapa e evita renumeracao desnecessaria.
- Para preservar Thorin durante as falas e evitar sobreposicao com o interludio
  `SF_Monster_3`, Thorin deve entrar antes de cada chamada de dialogo de NPC,
  sair junto com Mélia antes do interludio e reentrar antes da fala de Sáparo.
- Mover a entrada de `Thorin_confusão` para antes da fala de Sáparo da duracao
  observavel a expressao e permite converter `Thorin_bobo` em GraphicChange
  logo depois da fala.
- Como Picture 2 fica acima de Picture 1, o layering e coerente com Thorin em
  primeiro plano, mas sua qualidade visual permanece `runtime_pending`.

### Hypotheses

- `Auto` e `Auto-Reverse` provavelmente orientam os bustos conforme lado e
  configuracao `InvertedScale`, mas o resultado visual exato so pode ser
  confirmado por Playtest.

### Open Questions

- none

## Affected Surfaces

### Runtime, Engine or Framework

- Futuro target exclusivo: `frontend/data/Map049.json`, Event 1, Page 1,
  command list.
- Nenhuma alteracao de engine, plugin, parametro global, Common Event ou asset.

### Integration Points

- `VisuMZ_2_VNPictureBusts`: `Basic_EnterBust`, `Basic_ExitBusts` e
  `Basic_GraphicChange` via event command `code:357`.
- `Coreto_QuestVN`: preservar `AssertVisualNovelSession` e
  `FinishVisualNovel` nas extremidades do fluxo.
- Common Event 16 `NSD_Format`: preservar chamadas e variaveis 101-103; usar a
  ordem relativa apenas para garantir Thorin presente durante cada mensagem.
- `Show Picture`/`Move Picture`/`Erase Picture` do interludio `SF_Monster_3`:
  preservar sem bustos concorrentes.

### State and Data Contracts

- Picture 1: NPC ou imagem temporaria do interludio, nunca dois owners
  simultaneos.
- Picture 2: Thorin; Position 1; deve existir antes de cada fala de NPC e ser
  limpo antes do interludio ou do fim da VN conforme o segmento.
- NPCs conhecidos: Position 9. Position 5 nao deve ser usada como lado direito.
  O beat final usa Rheed com `Portraits/Principal/Reed final`.
- Toda mudanca de expressao de um busto ja presente usa
  `Basic_GraphicChange` com o mesmo Picture ID.
- Cada `code:357` deve manter plugin name, command name, label e args coerentes;
  continuacoes `code:657`, quando retidas, devem refletir o payload.
- Cleanup deve deixar Pictures 1 e 2 apagadas antes de `FinishVisualNovel`.
- Nenhum novo estado persistido, switch, variable, schema ou ID de database e
  necessario.

## Research Gate

**Decision:** not-needed
**Reason:** a configuracao local, o header distribuido com o plugin, o engine
local e exemplos estruturados do proprio projeto respondem as perguntas de
semantica e payload. A implementacao interna ofuscada nao e necessaria para a
decisao; comportamento perceptivel sera validado por Playtest.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa nao executada | Evidencia local suficiente; nenhum contexto atual externo substituiu o runtime do consumidor |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Comandos VisuStella existentes no evento | Plugin ativo, header local e usos em Map046 | Menor diff, preserva lifecycle, mirror e propriedades do busto | Exige edicao estruturada e Playtest | use |
| Pictures vanilla (`Show/Move/Erase Picture`) | Interludio existente em Map049 | Nativo do engine | Duplicaria lifecycle de bustos e aumentaria risco de mirror/fade/cleanup inconsistente | reject |
| Plugin customizado ou mudanca de parametro global | Nenhuma insuficiencia dos comandos atuais foi encontrada | Poderia centralizar politica futura | Blast radius global, custo e risco sem necessidade comprovada | reject |
| Deferir ou bloquear | Preflight resolveu speaker e asset | Nenhum beneficio residual | Manteria o payload vazio apesar da decisao aprovada | reject |

## Recommendation

Editar futuramente apenas a command list de `Map049`, Event 1, Page 1, por
operacao estruturada sobre o JSON atual:

1. Manter Mélia no Picture 1 e alterar Position 5 para Position 9, incluindo a
   continuacao editorial correspondente.
2. Reutilizar a entrada existente de `Thorin_confusão`, Picture 2, Position 1,
   antes da primeira chamada ao Common Event 16; no Exit posterior a fala de
   Mélia, limpar Pictures 1 e 2 antes do interludio `SF_Monster_3`.
3. Preservar Sáparo no Picture 1, Position 9, e reintroduzir
   `Thorin_confusão` no Picture 2, Position 1, antes da segunda chamada ao
   Common Event 16.
4. Substituir a reentrada `Thorin_bobo` por `Basic_GraphicChange` do Picture 2,
   com `PictureName:str` igual a
   `Portraits/Principal/Thorin_bobo`, preservando posicao, mirror, anchor,
   escala e camada.
5. Preservar o cleanup e a sessao VN. Nao alterar offsets ou mirror sem
   evidencia do Playtest.
6. No beat final, substituir o `PictureName:str` vazio por
   `Portraits/Principal/Reed final`, usar Rheed no Picture 1/Position 9, manter
   Thorin no Picture 2/Position 1 durante a fala e limpar ambos ao final.

Essa recomendacao usa somente capacidades existentes e nao autoriza a escrita
de producao nesta fase.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Divergir da decisao do beat final | Preflight aprovou Rheed e `Portraits/Principal/Reed final` | Tratar demanda e analise atualizadas como inputs canonicos | Validador de payload + diff |
| Position 5 parecer centro, nao direita | Formula local resulta X=640 | Padronizar NPCs conhecidos em Position 9 | Validador estrutural + Playtest |
| Picture 2 cobrir excessivamente o NPC | Header: IDs maiores ficam acima | Preservar IDs atuais e validar composicao | Playtest humano |
| Mirror orientar bustos para fora da conversa | Payloads `Auto`/`Auto-Reverse`; implementacao visual nao provada estaticamente | Nao alterar mirror por suposicao; observar cada entrada | Playtest humano |
| Thorin sobrepor o monstro | Interludio reutiliza Picture 1 com `SF_Monster_3` | Sair com Pictures 1/2 antes do interludio e reentrar depois | Validador de lifecycle + Playtest |
| Reflow ou corrupcao do mapa | Map data e command list estruturada | Parser, writer serial, parse posterior e diff restrito | `rpg-maker-mz-data-json` |
| Asset Unicode/case falhar em deploy | Nomes com acentos | Conferencia exata e case-sensitive dos paths referenciados | Asset validator |
| Regressao da sessao VN | Assert/Finish e CE16 integram o fluxo | Preservar ordem e quantidade desses comandos | Validador estrutural + Playtest |
| QA especializado delegado ficou sem completion record | Handoff `runtime-qa` interrompido sem evidencia | Checklist consolidado pelo orquestrador a partir das skills e evidencias locais; nao declarar runtime validado | Owner de QA humano |

## Validators

- Antes da escrita: reler o `Map049.json` atual e localizar o alvo por Map 49,
  Event 1 e Page 1; nao usar indices antigos como offsets mutaveis.
- Aplicar alteracao com parser/serializacao estruturada conforme
  `rpg-maker-mz-data-json`; nenhum replace textual ad hoc.
- Parse JSON de `frontend/data/Map049.json` depois da escrita.
- Diff restrito a `frontend/data/Map049.json`, Event 1/Page 1, sem reflow amplo;
  `plugins.js`, plugin vendor, `CommonEvents.json`, assets, saves e outros mapas
  devem permanecer inalterados pela task.
- Validar cada `code:357` e seus args contra o plugin ativo; validar ordem e
  continuacoes `code:657` sem trata-las como comportamento runtime.
- Assegurar Thorin em Picture 2/Position 1 antes de cada chamada do CE16 que
  apresenta NPC; assegurar Mélia e Sáparo em Picture 1/Position 9.
- Assegurar exatamente um `Basic_GraphicChange` de Picture 2 para
  `Thorin_bobo` e nenhuma reentrada desse asset.
- Enumerar lifecycle de Pictures 1/2 e comprovar cleanup antes do interludio e
  antes de `FinishVisualNovel`; preservar Assert/Finish, CE16 e interludio.
- Conferir existencia, extensao e case exatos de todos os assets referenciados;
  rejeitar `PictureName:str` vazio.
- Playtest humano dos segmentos Mélia, monstro, Sáparo, troca para
  `Thorin_bobo` e beat final, observando composicao, mirror, camadas, entrada,
  saida, fades, leitura, ausencia de piscada/reentrada, cleanup e conclusao da
  VN. Status atual: `runtime_pending`.

## Human Gates

- `interview`/preflight: concluido; Rheed e o speaker final e
  `Portraits/Principal/Reed final` e o asset aprovado.
- `human-validation` apos implementacao: Playtest na resolucao configurada,
  confirmando lados, espelhamento, z-order, transicoes, expressoes, legibilidade
  e cleanup. A validacao estatica nao substitui esse gate.

## Affected Docs

- Nenhuma escrita documental e autorizada nesta analise.
- `docs/index.xml` e valido, mas nao cataloga uma regra especifica de
  VNPictureBusts/Map049. Se a convencao deixar de ser apenas escopo desta task e
  virar regra duradoura do projeto, encaminhar posteriormente ao
  `loki-catalogar-docs`; nao promover automaticamente nesta execucao.

## Stop Conditions

- Parar a parte afetada se qualquer nova expressao necessaria de Thorin nao
  tiver asset existente aprovado.
- Parar se Map 49/Event 1/Page 1, plugin ativo ou payloads divergirem no
  preflight da implementacao.
- Parar se a edicao exigir outro mapa, `CommonEvents.json`, plugin, parametro,
  asset, save ou documento fora do target autorizado.
- Parar se o diff gerar reflow amplo, falhar parse, deixar Picture ID orfao,
  manter PictureName vazio ou quebrar Assert/Finish/CE16.
- Nao declarar comportamento pronto enquanto o Playtest estiver pendente ou
  rejeitado.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** preflight concluido; a fala final e de Rheed e usa o asset
  `Portraits/Principal/Reed final`.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none
- **Implementation demand:** `planos/006-busts-position/improved-demand.md`
- **Analysis file:** `planos/006-busts-position/technical-analysis.md`
- **Inherited restrictions and decisions:** somente `frontend/data/Map049.json`,
  Event 1/Page 1; Thorin Picture 2/Position 1; NPC Picture 1/Position 9;
  exploracao/GabWindow fora; sem novos assets, plugins ou parametros; usar
  GraphicChange; preservar interludio, CE16 e sessao VN.
  O beat final usa Rheed no Picture 1/Position 9 com
  `Portraits/Principal/Reed final`, mantendo Thorin no Picture 2/Position 1.
- **Validators and human validation:** parse JSON, diff restrito, payloads
  `357/657`, ordem/lifecycle de Pictures 1/2, existencia/case de assets,
  preservacao de Assert/Finish/CE16 e Playtest humano integral da cena.
- **Required skills:** `loki-human-decision-preflight`, depois
  `loki-implement-feature`; na implementacao usar `rpg-maker-mz-data-json`,
  `rpg-maker-mz-project-inventory`,
  `rpg-maker-mz-visustella-events-presentation` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class: coding`,
  `execution_effort: high`, `recommended_handoffs: technical-implementer +
  runtime-qa`, `validator_effort: medium`, com writer unico para Map049 e QA
  independente.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-implementation"
  sources_read:
    - "planos/006-busts-position/improved-demand.md"
    - "AGENTS.md"
    - "frontend/data/MapInfos.json"
    - "frontend/data/Map049.json"
    - "frontend/data/CommonEvents.json#16"
    - "frontend/data/System.json"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/VisuMZ_2_VNPictureBusts.js"
    - "frontend/js/rmmz_objects.js#command357"
    - "frontend/data/Map046.json"
    - "frontend/img/pictures"
    - "docs/index.xml"
    - "docs/domains/scene-presentation-designer/README.md"
    - "docs/architecture/exploration-dialogue-gabwindow.md"
  research_gate: "not-needed"
  completed_handoffs:
    - "source-researcher -> /root: complete-static-with-gaps"
    - "bibliotecario -> /root: catalog_gap, minimum docs returned"
    - "technical-implementer -> /root: proposal-ready-with-one-material-gap"
    - "loki-human-decision-preflight -> /root: ready-for-planning; Rheed + Portraits/Principal/Reed final"
  terminal_noncompletion_handoffs:
    - "runtime-qa -> /root: interrupted; no completion evidence"
  human_decision_preflight_required: false
  pending_questions: []
  implementation_demand_ref: "planos/006-busts-position/improved-demand.md"
  analysis_file: "planos/006-busts-position/technical-analysis.md"
  inherited_restrictions:
    - "Somente Map049 Event 1 Page 1"
    - "Exploracao/GabWindow fora"
    - "Sem plugins, parametros, Common Events, assets, saves ou outros mapas"
    - "Playtest humano obrigatorio"
  recorded_decisions:
    final_speaker: "Rheed"
    final_asset: "Portraits/Principal/Reed final"
  recommended_next_command: "loki-implement-feature"
  next_action: "Executar loki-implement-feature com demanda + analysis_file."
  blocked_by: []
```
