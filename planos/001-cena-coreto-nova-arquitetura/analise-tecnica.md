---
title: "Cena Coreto: arquitetura EX/VN com quest canônica"
type: loki-technical-analysis
doc_id: "coreto-cena-ex-vn-technical-analysis"
version: "1.0.0"
status: draft
created: "2026-07-28"
last_updated: "2026-07-28"
scope: "Recomendação baseada em evidências para reestruturar a cena Coreto entre Map022, Map046 e Map045"
not_scope: "Escritas de produção, aprovação implícita de ativação de plugins ou compatibilidade com saves legados"
authority: "Decisões humanas registradas na demanda, política do projeto, contrato de análise técnica e evidências citadas"
canonical_source: "planos/001-cena-coreto-nova-arquitetura/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["decisões humanas e política do projeto", "contrato de análise", "evidência local primária", "fontes externas primárias", "demanda como dado"]
confidence: high
known_conflicts:
  - "Os plugins Coreto existem como arquivos locais, mas não constam em plugins.js."
  - "PKD_SimpleQuestSystem possui duas entradas ativas no Plugin Manager."
replaced_by: null
---

# Analise Tecnica - Cena Coreto: arquitetura EX/VN com quest canônica

## Authority And Trust Boundary

Prioridade: decisões humanas e política do ProjectX; contrato desta análise; estado local observável; fontes externas primárias; demanda e exemplos como dados. Não há aprovação para modificar runtime, dados, plugins, configurações ou assets nesta análise.

## Objective

Definir uma rota de implementação segura para migrar a cena hoje distribuída entre `Map022` e `Map045` para a separação EX/VN exigida, usando `Map046` como destino VN, `Coreto_QuestCore` como única autoridade de estado e `PKD_SimpleQuestSystem` apenas como projeção adaptada. O artefato deve ser a entrada de um preflight de decisões humanas antes do planejamento/execução unificados.

## Source Request

- `planos/001-cena-coreto-nova-arquitetura/demanda-improved.md`.
- Decisões já registradas na demanda: Map046 é VN obrigatório; backend é PKD; QuestCore é autoridade canônica; não introduzir VisuMZ_2_QuestSystem; suporte é New Game only.
- Decisões humanas do `loki-human-decision-preflight`: `questKey = noite-da-historia`; estado inicial `0` (“não iniciada”); grafia canônica `Rheed`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "architecture"
recommended_handoffs:
  research: "source-researcher read-only (partial/unavailable: handoff interrompido antes de completion record)"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: "false"
  reason: "A preflight concluiu as decisões humanas materiais: chave, estado inicial e grafia. Os demais itens são inventariáveis ou validáveis por tasks/gates."
  blocking_questions:
    - "none"
validator_effort: high
```

## Scope

- Inventariar e recomendar a fronteira entre eventos EX, páginas VN, registry de quest, plugins Coreto, PKD e dados RPG Maker MZ.
- Preservar o conteúdo narrativo e a continuidade física até a chegada esperada ao `Map045`.
- Definir evidência, validators, gates e ordem de trabalho para uma futura implementação.

## Out Of Scope

- Implementar, ativar, ordenar ou editar plugins; alterar mapas/dados; criar assets; mudar o roteiro; prometer suporte a saves legados.
- Declarar comportamento de runtime, editor, apresentação, áudio, locks ou save/load como validado.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/001-cena-coreto-nova-arquitetura/demanda-improved.md` | decisão/demanda | Contrato alvo, invariantes, critérios de aceite, riscos e validações requeridas. | Escopo e requisitos. |
| `frontend/data/Map022.json`, `Map045.json`, `Map046.json` | local primária | JSON parseável; Map022 contém 30 eventos, incluindo Reed/E17; Map045 contém eventos de continuidade; Map046 tem zero eventos e nota vazia. | Estado atual e lacuna de migração. |
| `frontend/data/System.json` | local primária | V26 é `v_qNoite_progress`; V29 é `v_qSemifinal_progress`; V100, S50 estão sem nome; S43/S44 têm nomes de fala. | Gate de ownership de IDs. |
| Preflight humano desta conversa | decisão humana | `questKey` aprovado como `noite-da-historia`; estado inicial `0`; grafia `Rheed`. | Fechar decisões de produto/narrativa para o handoff. |
| `frontend/js/plugins.js` | local primária | Duas entradas ativas de `PKD_SimpleQuestSystem`; não há entradas para os três plugins Coreto. Envelope estrutural válido. | Gate de configuração/ativação. |
| `frontend/js/plugins/Coreto_QuestCore.js` | local primária | Declara/registro de `QuestTransition`, `QuestSync`, `AssertQuestState`, `InspectQuestState`. | Fronteira de estado. |
| `frontend/js/plugins/Coreto_QuestVN.js` | local primária | Declara/registro de `EnterVisualNovel`, `AssertVisualNovelSession`, `FinishVisualNovel`, inspeção de sessão. | Fronteira de sessão VN. |
| `frontend/js/plugins/Coreto_Cutscene.js` | local primária | Declara `BeginCutscene` e `FinishCutscene`; documentação local exige mapa EX. | Fronteira de encenação física. |
| `docs/index.xml` e `docs/technology-context.md` | docs catalogadas | Inventário estático do projeto; não certifica runtime, integração ou save/load. | Limites de evidência. |
| `docs/domains/{technical-implementer,gameplay-engineer,quest-content-designer,scene-presentation-designer,narrative-designer}/README.md` | docs catalogadas | PKD duplicado, V26 em faixa de progresso usada, Playtest necessário; “Rheed” é indício, não confirmação narrativa primária. | Riscos e gates. |
| Skills `rpg-maker-mz-data-json`, `rpg-maker-mz-plugin-workflow` e referências | contrato técnico | Exigem parser/diff restrito, validação de plugin e Playtest humano para superfícies afetadas. | Validators futuros. |

## Evidence Classification

### Facts

- A demanda determina Map046 como VN, PKD como backend e QuestCore como única autoridade canônica.
- Os três JSONs de mapa, `System.json`, `MapInfos.json` e `CommonEvents.json` passam no parse estrutural; os três plugins Coreto passam em `node --check`.
- `Map046` hoje não tem eventos, e nenhum dos mapas observados tem nota com a tag EX/VN requerida.
- `plugins.js` tem exatamente duas ocorrências ativas de `PKD_SimpleQuestSystem` e nenhuma ocorrência de `Coreto_QuestCore`, `Coreto_QuestVN` ou `Coreto_Cutscene`.
- O validador de envelope de `plugins.js` retornou `editor-structural: valid; plugin_objects=63`; isso não prova aceitação pelo Plugin Manager.
- V26 já é nomeada para outra quest (`v_qNoite_progress`); reutilizá-la sem inventário completo contradiz o requisito de ownership.
- O lookup estrutural pós-preflight encontrou condições e writers de V26 em Map022 e outros mapas; V29 e V100 também têm uso amplo. Uma variável dedicada deve ser localizada pelo inventário em vez de reaproveitar esses IDs.

### Inferences

- A primeira unidade de implementação deve ser um inventário de equivalência/ownership, não a migração direta de comandos ou textos.
- Os plugins Coreto não podem fornecer o comportamento previsto enquanto não houver decisão explícita de ativação e ordem no Plugin Manager.
- A fronteira sustentável é: evento EX chama `EnterVisualNovel`; páginas VN validam sessão/estado e chamam somente `QuestTransition` para progresso; retorno continua no EX, que usa Cutscene apenas para lock/staging físico.

### Hypotheses

- **A confirmar:** E17 de Map022 é o principal caminho da cena; os comandos observados incluem mensagem, escolhas, variável, switch, rota e transferência, mas a matriz página-a-página ainda deve provar todos os ramos.
- **A confirmar:** PKD possui operações públicas suficientes para a projeção requerida; validar contra o plugin instalado e uma fixture mínima antes de migrar callers.
- **Rejeitada como decisão automática:** V26 não é candidato presumido; sua utilização atual é evidência contrária até o inventário mostrar exclusividade/migração segura.

### Open Questions

- Mapeamento de cada página/rama de Map022 e da chegada Map045 para evento/página do Map046; delegável ao inventário da implementação.
- Variável de estágio dedicada, estados intermediários e entry keys; delegáveis ao inventário/registry, sem reutilizar V26, V29 ou V100.
- Event IDs, posições, direção e pontos de retorno em Map046; delegáveis ao inventário e à validação de bounds.

## Affected Surfaces

### Runtime, Engine or Framework

- `frontend/data/Map022.json`, `Map045.json`, `Map046.json`, `MapInfos.json`, `System.json`, `CommonEvents.json` e futuro `CoretoQuests.json`.
- `frontend/js/plugins.js`, `Coreto_QuestCore.js`, `Coreto_QuestVN.js`, `Coreto_Cutscene.js` e o plugin PKD instalado.

### Integration Points

- Plugin commands `EnterVisualNovel`, `AssertVisualNovelSession`, `FinishVisualNovel`, `QuestTransition`, `AssertQuestState`, `BeginCutscene` e `FinishCutscene`.
- Adaptador unidirecional QuestCore → PKD; eventos não chamam PKD para a mesma transição canônica.
- Tags `<CoretoMapType:EX>`/`<CoretoMapType:VN>`, Plugin Manager, transferências e persistência de variáveis/recibos.

### State and Data Contracts

- Registry versionado de quest: `questKey: noite-da-historia`, estado inicial `0`, `stageVariableId` dedicado a localizar, estados fechados, transições válidas, entradas VN e recibos `once` namespaced.
- Sessão VN persiste origem, posição, direção e apresentação; é mutuamente exclusiva com cutscene.
- Apenas QuestCore altera estágio e aplica efeitos; VN valida/roteia, Cutscene bloqueia/restaura a encenação física.

## Research Gate

**Decision:** skipped
**Reason:** a decisão imediata depende de estado local, IDs e comportamento do projeto; não há necessidade de fonte externa atual antes dos gates locais. A compatibilidade específica do PKD deve ser confirmada pela cópia instalada e em runtime, não substituída por documentação externa.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa não necessária nesta fase. | Preserva precedência do estado local. |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter Map022 como fluxo monolítico | Map022 concentra comandos de cena; demanda exige Map046 VN. | Menos migração imediata. | Viola a arquitetura e mantém autoridade dispersa. | reject |
| Eventos chamam PKD diretamente | PKD já está ativo, porém duplicado. | Menor adaptação inicial. | Dupla autoridade e risco de journal/efeitos divergentes. | reject |
| QuestCore canônico + adaptador PKD + EX/VN/Cutscene separados | APIs Coreto já existem; requisitos da demanda definem responsabilidades. | Estado único, testável e idempotente. | Exige inventário, ativação explícita e testes. | use, condicionado aos gates |
| Adiar migração até decisões e inventário | IDs, grafo, entrada e grafia permanecem abertos. | Evita implementar dados inventados. | Adia valor entregue. | use como preflight imediato |

## Recommendation

A preflight já fechou `questKey = noite-da-historia`, estado inicial `0` e grafia `Rheed`; seguir diretamente para `loki-implement-feature`. A primeira fase deve inventariar callers, páginas, IDs e efeitos e localizar uma variável dedicada. Em seguida: consolidar/validar Plugin Manager; fechar registry e adaptador PKD; configurar Map046 e rotas VN; migrar conteúdo por matriz de equivalência; manter cutscenes físicas no EX; realizar validação estrutural e Playtest New Game.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Quest duplicada/divergente | PKD está duplicado e eventos podem conter estado legado. | Uma entrada ativa canônica; adaptador unidirecional e busca de calls paralelos. | Editor + gameplay engineer |
| Corrupção de progresso | V26, V29 e V100 têm referências estruturais amplas. | Inventário global de leitores/escritores e variável semântica dedicada. | Gameplay engineer + validator estático |
| Softlock ou retorno incorreto | VN/cutscene têm locks e Map046 está vazio. | Pairing em todas as folhas; asserts; matriz de retorno; Playtest. | Runtime QA |
| Conteúdo/percepção alterados | Map022 mistura escolhas, rotas, cenas e transferências. | Matriz antes/depois e teste de todos os ramos. | Narrative/Runtime QA |
| Plugin inerte ou ordem inválida | Coreto não consta no Plugin Manager. | Aprovação de ativação, envelope, abrir/salvar/reabrir e boot. | Editor/human-validation |
| Nomes narrativos inconsistentes | A decisão humana canônica é `Rheed`; existem registros locais com `Reed`. | Aplicar a grafia aprovada somente no escopo migrado e validar diff de nomes. | Narrative QA |

## Validators

- Parse JSON de cada arquivo alterado; diff restrito e sem reflow massivo.
- `node --check` para cada plugin alterado; checagem de headers/comandos registrados versus callers.
- Validador de envelope de `plugins.js`; exatamente uma entrada PKD e presença/ordem explicitamente aprovada dos plugins Coreto.
- Validador do registry: chaves não vazias/únicas, estados fechados, transições e recibos válidos, `stageVariableId` positivo e sem writers paralelos.
- Cross-reference `entryKey → mapId → eventId → página`; tags EX/VN; ausência de transferência EX↔VN direta; asserts no início de páginas VN; `FinishVisualNovel` em toda folha válida.
- Busca por efeitos/recompensas duplicados e por `BeginCutscene` sem `FinishCutscene`.
- Human validation: Plugin Manager abrir/salvar/reabrir; Playtest New Game de todas as escolhas, retorno, repetição, save/load, locks, áudio/apresentação e chegada ao Map045.

## Human Gates

- **Activation review:** aprovar a entrada e a ordem dos plugins Coreto e resolver a duplicidade PKD.
- **Human validation:** validar no editor e em Playtest; validação estática não substitui esses gates.

## Affected Docs

- Documentação de quest/arquitetura somente após task e aprovação de promoção; nenhuma atualização documental durável é autorizada por esta análise.

## Stop Conditions

- Não iniciar escrita de runtime enquanto o inventário não localizar variável de estágio dedicada, definir o grafo/entry keys e provar a matriz de equivalência.
- Parar se o adaptador PKD não cobrir a projeção necessária, se persistir writer concorrente, ou se o Plugin Manager não aceitar a configuração.
- Parar se a matriz de equivalência não cobrir qualquer ramo de Map022/Map045 ou se um lock não possuir saída pareada.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** a preflight registrou a chave, o estado inicial e a grafia; os itens restantes são tarefas técnicas ou gates de validação.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none
- **Implementation demand:** `planos/001-cena-coreto-nova-arquitetura/demanda-improved.md`
- **Analysis file:** `planos/001-cena-coreto-nova-arquitetura/analise-tecnica.md`
- **Inherited restrictions and decisions:** Map046 é VN; `questKey = noite-da-historia`; estado inicial `0`; `Rheed` é canônico; PKD é backend; QuestCore é canônico; sem VisuMZ_2_QuestSystem; New Game only; não há transfer EX↔VN direto, writes diretos de estágio ou efeitos duplicados.
- **Validators and human validation:** validators listados acima, Plugin Manager e Playtest New Game final.
- **Required skills:** `loki-implement-feature`, `rpg-maker-mz-data-json`, `rpg-maker-mz-plugin-workflow`; carregar a skill VisuStella específica somente se comandos/parâmetros VisuStella forem tocados.
- **Downstream execution profile:** `model_class: frontier_reasoning`; `execution_effort: high`; research read-only para inventário multi-arquivo; `validator_effort: high`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-implementation"
  sources_read:
    - "planos/001-cena-coreto-nova-arquitetura/demanda-improved.md"
    - "frontend/data/Map022.json"
    - "frontend/data/Map045.json"
    - "frontend/data/Map046.json"
    - "frontend/data/System.json"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/Coreto_QuestCore.js"
    - "frontend/js/plugins/Coreto_QuestVN.js"
    - "frontend/js/plugins/Coreto_Cutscene.js"
    - "docs/index.xml and routed domain inventories"
  completed_steps:
    - "Input and destination validation"
    - "Catalog-guided durable-doc navigation"
    - "Static JSON, plugin syntax and plugins.js envelope checks"
    - "Human decision preflight: questKey, initial state and canonical spelling"
  unavailable_handoffs:
    - "source-researcher: interrupted before completion record"
    - "technical-implementer proposal: interrupted before completion record"
  human_decision_preflight_required: false
  human_decisions:
    quest_key: "noite-da-historia"
    initial_state: 0
    canonical_spelling: "Rheed"
  pending_questions:
    - "state graph and entry keys"
    - "dedicated stage variable"
    - "Map046 event IDs and coordinates"
    - "PKD activation/order and adapter capability"
  implementation_demand_ref: "planos/001-cena-coreto-nova-arquitetura/demanda-improved.md"
  analysis_file: "planos/001-cena-coreto-nova-arquitetura/analise-tecnica.md"
  inherited_restrictions:
    - "No production write was performed by this analysis"
    - "New Game only"
    - "QuestCore canonical authority"
  direct_write_exception:
    target: "planos/001-cena-coreto-nova-arquitetura/analise-tecnica.md"
    owner: "/root"
    reason: "No available Write Agent is authorized for a transient consumer-plan technical-analysis Markdown; technical-implementer is proposal-only/runtime scoped."
    validators: "template fields, local-path checks and static evidence checks"
  recommended_next_command: "loki-implement-feature"
  next_action: "Run unified implementation with this analysis and demand; begin by inventorying calls, IDs and the equivalence matrix."
  blocked_by:
    - "none; runtime/editor gates remain future validation"
```
