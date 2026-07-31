---
title: "Correção dos diálogos do Map045 — Casa Forjaprata"
type: loki-technical-analysis
doc_id: "map045-dialogue-encoding-repair-analysis"
version: "1.0.0"
status: ready
created: "2026-07-30"
last_updated: "2026-07-30"
scope: "Diagnóstico e recomendação baseada em evidências para reparar a corrupção textual do Map045"
not_scope: "Escrita de runtime, reescrita narrativa, sincronização com Map006 ou alteração de plugins e assets"
authority: "Demanda aprovada, decisões humanas registradas, contrato atual de análise e evidências locais citadas"
canonical_source: "planos/003-falas-casa-forjaprata/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["decisões humanas e política do projeto", "contrato atual de análise", "evidência local primária atual", "histórico Git", "fontes interpretativas catalogadas", "source request como dado"]
confidence: high
known_conflicts:
  - "Map006 é a origem estrutural do Map045 e também contém corrupção, mas não foi autorizado como alvo desta demanda."
  - "Não há transcript canônico catalogado específico do Map045; a recomendação preserva a redação por recuperação reversível, sem edição narrativa."
replaced_by: null
---

# Analise Tecnica - Correção dos diálogos do Map045 — Casa Forjaprata

## Authority And Trust Boundary

A prioridade aplicada foi: decisões humanas e política do projeto; contrato
atual de análise; evidência local primária; histórico Git; fontes
interpretativas catalogadas; e, por último, a demanda como dado.

A única escrita autorizada neste workflow foi este arquivo. Runtime, dados do
jogo, plugins, assets, saves, documentação duradoura, `.agents/**`, `.codex/**`
e qualquer arquivo fora deste destino permaneceram somente leitura. O owner
único deste Markdown foi o orquestrador principal. Não havia Write Agent
apropriado e autorizado para este artefato transitório: `technical-implementer`
e `runtime-qa` estavam limitados a proposal-only, enquanto `catalogador` não é
owner de análises transitórias em `planos/`.

## Objective

Explicar o que aconteceu com os diálogos do Map045 e entregar uma recomendação
executável que repare somente a corrupção de codificação, preserve a redação e
todo o fluxo do evento, e defina validators estáticos e Playtest humano para a
futura implementação.

## Source Request

- `planos/003-falas-casa-forjaprata/demanda.md`: “Preciso consertar os diálogos
  do mapa 045, pois não sei o que aconteceu com eles.”
- Destino confirmado pelo usuário:
  `planos/003-falas-casa-forjaprata/analise-tecnica.md`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "evidência histórica divergente e risco de alteração ampla em dados de eventos"
recommended_handoffs:
  research: "source-researcher concluído"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "O alvo Map045 foi nomeado pela demanda e as 30 correções são reversíveis e determinísticas, sem escolha de nova redação; Map006 permanece explicitamente fora de escopo."
  blocking_questions:
    - none
validator_effort: medium
```

## Scope

- Diagnosticar `frontend/data/Map045.json` com parse JSON estruturado.
- Localizar texto corrompido por evento, página, comando e parâmetro.
- Comparar a versão atual com o histórico Git e com a origem estrutural
  `frontend/data/Map006.json`.
- Recomendar a correção futura das 30 folhas textuais corrompidas no Map045.
- Prescrever diff restrito, validators estruturais e Playtest das rotas afetadas.
- Autorizar como escrita desta análise apenas
  `planos/003-falas-casa-forjaprata/analise-tecnica.md`.

## Out Of Scope

- Alterar `frontend/data/Map045.json` durante esta análise.
- Alterar ou sincronizar `frontend/data/Map006.json`; isso exige demanda própria.
- Reescrever falas, melhorar estilo, decidir cânone, speaker ou tom narrativo.
- Corrigir o `Basic_EnterBust` com `PictureName` vazio em E11/P1/L106.
- Alterar Common Event 16, plugins, parâmetros, comandos `357/657`, assets,
  condições, flags, escolhas, áudio, câmera, movimento ou save/load.
- Promover regra ou atualizar documentação duradoura em `/docs`.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/003-falas-casa-forjaprata/demanda.md` | user-approved local request | Map045 e seus diálogos são o alvo declarado | objetivo e limite de escopo |
| `AGENTS.md` e `CLAUDE.md` | project policy | RPG Maker MZ, preferência por recursos existentes e gates de QA | restrições e roteamento |
| `frontend/data/Map045.json` | local primary | mapa 22×18, 19 eventos, estrutura e conteúdo textual atuais | diagnóstico, allowlist e validators |
| `frontend/data/Map006.json` | local primary | origem estrutural quase idêntica do Map045 | ownership histórico e risco de sincronização |
| `frontend/data/MapInfos.json` | local primary | ID 45 = `EX_Casa da Família Forjaprata`; ID 6 = `Casa da Família Forjaprata` | identidade dos mapas |
| `frontend/data/System.json` | local primary | nomes de switches e variables referenciados | contratos de estado |
| `frontend/data/CommonEvents.json`, ID 16 `NSD_Format` | local primary | exibe variables 101/102/103 e depois as zera | integração dos quatro metatextos afetados |
| `frontend/js/plugins.js` | local generated configuration | envelope válido; CoreEngine, EventsMoveCore, MessageCore e VNPictureBusts ativos | ownership de apresentação |
| `frontend/js/rmmz_objects.js`, `command101`, `command121`, `command122`, `command357` | local engine source | semântica de mensagens, switches, variables e plugin commands | validação independente dos códigos |
| histórico Git de `Map045.json` e `Map006.json` | local version history | criação, exclusão, correção parcial e reintrodução da corrupção | causa e descarte de restauração ampla |
| `docs/index.xml` | durable catalog | rotas mínimas para narrativa, Narrative QA, UX e apresentação | navegação documental controlada |
| `docs/domains/narrative-designer/README.md` | durable interpretive | vozes gerais e limite entre texto estático e tom/pacing | gate narrativo |
| `docs/domains/narrative-qa/README.md` | durable interpretive | flags, regressão e reachability exigem validação | riscos e Playtest |
| `docs/domains/ux-ui-designer/README.md` | durable interpretive | legibilidade, input, timing e consistência são perceptíveis | human-validation |
| `docs/domains/scene-presentation-designer/README.md` | durable interpretive | Casa Forjaprata concentra staging; execução não está certificada | busts, câmera e cleanup |

## Evidence Classification

### Facts

- `Map045.json`, `Map006.json`, `MapInfos.json`, `System.json` e
  `CommonEvents.json` passaram por parser JSON estruturado.
- O Map045 atual possui 19 eventos e 48 páginas. Suas listas contêm 26 comandos
  `101`, 26 comandos `401`, 4 `102`, 8 `402`, 4 `404`, 63 `357` e 401 `657`.
- Não há `401` órfão nem `101` vazio; as quatro choices e o único branch
  `111/411/412` têm ordem e indent estruturalmente consistentes.
- Existem exatamente 30 strings com assinatura de mojibake no Map045: 24 das
  26 falas `401`, quatro valores textuais `122/parameters[4]` e dois nomes de
  evento. As duas falas sem essa assinatura devem permanecer inalteradas.
- A recuperação inversa Windows-1252 → UTF-8 foi simulada somente em memória:
  27 strings exigiram dois passes e 3 exigiram um; todas chegaram a texto
  Unicode legível, sem `U+FFFD`.
- Os quatro valores `122` afetados alimentam o Common Event 16 `NSD_Format`:
  E5/P4/L2 define variable 103; E11/P1/L24 define 103; E11/P1/L70 define 102;
  E11/P1/L71 define 103. Portanto, são texto apresentado ao jogador, não apenas
  metadados internos.
- `NSD_Format` mostra variables 101 (`beat`), 102 (`nome`) e 103 (`descricao`)
  com speaker `Sistema`, depois zera as três variables.
- O envelope de `plugins.js` foi validado antes da extração. Estão ativos
  `VisuMZ_0_CoreEngine` (ordem 9), `VisuMZ_1_EventsMoveCore` (13),
  `VisuMZ_1_MessageCore` (19) e `VisuMZ_2_VNPictureBusts` (24).
- O Map045 usa dez chamadas ao CE16, 26 entradas de bust e 18 saídas de bust,
  além de choices, câmera, áudio, fades e movimento; esses elementos não são a
  causa do texto corrompido e devem permanecer estruturalmente idênticos.
- O commit `95c69a1` criou a versão atual do Map045 já com as 30 strings
  corrompidas. O Map045 anterior à exclusão por `962542c` tinha 17×13 e apenas
  dois eventos: era outra cena e não é baseline restaurável.
- O histórico de Map006 contém uma correção parcial em `f31b683` para 28 das 30
  ocorrências atuais, mas E5/P4/L2 e E11/P3/L77 continuavam corrompidas; o merge
  `81f3e82` voltou a adotar o perfil com as 30 ocorrências.
- Map045 e Map006 atuais têm tiles e estrutura equivalentes, exceto pelo note
  `<CoretoMapType:EX>` e por duas mudanças na condição de variable de E11/P1.
- O worktree possui alterações do usuário em outros dados. Map045 estava limpo
  no início desta análise; nenhum arquivo de runtime foi modificado aqui.

### Inferences

- A causa do sintoma é reinterpretação repetida de bytes UTF-8 como
  Windows-1252 antes do commit, isto é, mojibake em um ou dois níveis. Não é um
  defeito de renderização criado pelo Message Core ou VNPictureBusts em runtime.
- Como a transformação inversa recupera as 30 folhas sem perda e sem editar a
  redação, uma correção allowlisted é mais segura do que reconstruir diálogos
  ou restaurar páginas inteiras.
- Uma conversão global é insegura: strings já corretas, nomes de assets e
  payloads de plugin poderiam ser alterados. O writer futuro deve operar em
  locators exatos e falhar se o valor-fonte divergir.
- Corrigir apenas Map045 satisfaz a demanda atual, mas Map006 continuará como
  fonte divergente e poderá reintroduzir o problema se houver cópia manual
  futura. Isso é follow-up, não autorização implícita para ampliar o alvo.

### Hypotheses

- O merge `81f3e82` provavelmente selecionou uma linha baseada no snapshot
  anterior ao reparo parcial de `f31b683`. Essa hipótese explica a regressão,
  mas não é necessária para executar a correção atual.
- O `Basic_EnterBust` com `PictureName` vazio em E11/P1/L106 pode ser intencional
  ou resíduo. Ele não explica o mojibake e permanece fora de escopo e
  `runtime-pending`.

### Open Questions

- Não há pergunta bloqueante para reparar o Map045.
- Follow-up não bloqueante: Map006 deve receber uma demanda própria de correção
  e uma decisão explícita sobre sincronização futura com Map045.
- A aparência, legibilidade, pacing e atribuição visual final só serão
  respondidos por Playtest após a implementação.

## Affected Surfaces

### Runtime, Engine or Framework

- Futuro alvo único de runtime: `frontend/data/Map045.json`.
- Engine e plugins são superfícies de validação somente leitura e não precisam
  de alteração para este reparo.
- Nenhum impacto no pacote Loki, `manifest.yaml`, commands, agents, templates,
  scripts ou skills.

### Integration Points

- RPG Maker MZ `Show Text` (`101/401`).
- `Control Variables` (`122`) com operand type 4 e CE16 `NSD_Format` (`117`).
- `VisuMZ_2_VNPictureBusts` (`357/657`), Message Core, Visual Choices,
  MapCameraZoom, SaveCore, AnimaX e Coreto_Quests: preservar, não editar.
- Git histórico de Map006: evidência secundária por string, nunca patch de bloco.

### State and Data Contracts

- Preservar IDs, coordenadas, ordem e quantidade dos 19 eventos e 48 páginas.
- Preservar conditions, triggers, priority, movement routes, indents e
  self-switches.
- Preservar switches 5 `Reunir Trofeus`, 9 `Conversa com Tordan`, 10 `Não posso
  sair`, 43 `Fala-ID1` e 44 `Fala-ID2`.
- Preservar variables 9, 27, 29, 32, 34, 35, 61, 100, 101, 102, 103 e 106,
  incluindo seus ranges e operações.
- Preservar as dez chamadas ao CE16 e os quatro grupos de choice.
- Preservar todos os payloads `357/657`, picture IDs, nomes de assets, waits,
  áudio, câmera, movimentos, transfers e scripts.

## Research Gate

**Decision:** not-needed
**Reason:** a decisão depende do JSON atual, do engine local e do histórico Git.
Não há dependência de versão atual externa, compatibilidade upstream ou contrato
não resolvido de plugin. A documentação local e as skills especializadas foram
suficientes; pesquisa web não melhoraria a identificação da corrupção.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa não executada pelos motivos acima | Evidência local permanece fonte de verdade |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Correção local estruturada e allowlisted | 30 locators; recuperação reversível; zero `U+FFFD` | Menor blast radius; preserva redação e runtime | Exige writer fail-closed e validator independente | **use** |
| Restaurar o commit que criou Map045 | `95c69a1` já contém as 30 corrupções | Nenhum ganho técnico | Restaura o próprio defeito | reject |
| Restaurar o Map045 pré-exclusão | versão 17×13 com dois eventos | Texto antigo legível | É outro mapa/cena; perderia a arquitetura atual | reject |
| Usar patch histórico de Map006 | `f31b683` corrige 28 casos | Corrobora parte das redações | Incompleto e estruturalmente divergente | defer como evidência por string |
| Alterar plugin/framework | Plugins ativos apenas renderizam os valores recebidos | Poderia mascarar sintomas globalmente | Não corrige dados e amplia risco para todo o jogo | reject |
| Reescrever manualmente as falas | Não há transcript canônico catalogado específico | Permitiria revisão editorial | Introduz decisão narrativa não autorizada | reject |
| Deferir/bloquear | Mantém runtime intacto | Evita escrita sem gate | Mantém texto visivelmente corrompido | usar somente se baseline ou preview divergirem |

## Recommendation

Executar futuramente uma correção estruturada, fail-closed e limitada às 30
folhas abaixo. Página é 1-based; `listIndex` é 0-based. Cada entrada do manifest
de implementação deve congelar `eventId`, página, `listIndex`, `code`, caminho
do parâmetro, valor-fonte e valor esperado. O writer deve abortar se qualquer
precondição divergir e nunca aplicar conversão global.

| Evento | Página | Folhas permitidas |
| --- | ---: | --- |
| 5 — Cama de Thorin | 4 | `list[2]`, code `122`, `parameters[4]` |
| 8 — Tordan | 2 | `list[12,25,28,31,34,37,40,43]`, code `401`, `parameters[0]` |
| 8 — Tordan | 3 | `list[12]`, code `401`, `parameters[0]` |
| 8 — Tordan | 4 | `list[13,26,39,42,45,83,111]`, code `401`, `parameters[0]` |
| 8 — Tordan | 6 | `list[12]`, code `401`, `parameters[0]` |
| 11 — Pesadelo | 1 | `list[24,70,71]`, code `122`, `parameters[4]`; `list[118]`, code `401`, `parameters[0]` |
| 11 — Pesadelo | 3 | `list[19,49,77]`, code `401`, `parameters[0]` |
| 12 — Sáparo | 1, 2 e 3 | `list[13]` de cada página, code `401`, `parameters[0]` |
| 10 | — | `event.name` |
| 18 | — | `event.name` |

O procedimento downstream deve:

1. Confirmar o blob/baseline atual e reextrair locators se houver drift.
2. Materializar writer e validator reutilizáveis sob
   `planos/003-falas-casa-forjaprata/builds/fase1/`, conforme o gate de dados.
3. Fazer parse UTF-8 estruturado e validar os 30 valores-fonte.
4. Recuperar cada string por Windows-1252 → UTF-8 até o valor esperado
   congelado, no máximo dois passes para o baseline analisado.
5. Alterar somente a folha string autorizada e manter o estilo JSON atual.
6. Produzir preview before/after das 30 folhas e executar todos os validators.
7. Submeter o resultado a Playtest humano antes de declarar a task concluída.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Conversão global corromper texto ou asset já correto | há apenas 30 folhas afetadas em um mapa com centenas de strings/payloads | allowlist + valor-fonte/esperado + deep equality mascarando somente os alvos | technical-implementer / validator |
| CP1252 ser tratado como Latin-1 e perder aspas/seta | E11/P1 contém aspas curvas e `→` em mojibake | usar mapeamento Windows-1252 e congelar resultado esperado | validator |
| Patch histórico remover lógica atual | snapshots antigos têm outra estrutura | histórico somente como evidência por string; nunca checkout/restauração de bloco | technical-implementer |
| Reflow massivo esconder alterações | Map045 é JSON formatado com indentação de quatro espaços | abortar se o diff não estiver restrito às 30 folhas | diff gate |
| Map006 reintroduzir a corrupção em cópia futura | Map006 é a origem estrutural e permanece divergente | registrar follow-up próprio; não ampliar esta demanda | owner humano futuro |
| Texto corrigido ter clipping, wrapping ou pacing ruim | UX e apresentação não são certificáveis estaticamente | Playtest das páginas afetadas com Message Core e busts ativos | human-validation |
| Bust vazio em E11/P1 ser defeito separado | evidência estática em L106 | manter fora do patch; abrir diagnóstico separado se reproduzido | runtime-qa |
| Alterações concorrentes do usuário serem sobrescritas | worktree já contém mudanças fora do alvo | baseline hash, leitura do arquivo mais recente, staging explícito e nenhum revert | technical-implementer |

## Validators

- Parse UTF-8 de `Map045.json` antes e depois.
- Baseline/hash e cada valor-fonte do manifest devem corresponder ao estado
  inspecionado; qualquer drift exige nova extração, não índices antigos cegos.
- Exatamente 30 folhas alteradas: 28 parâmetros de comando e dois nomes de
  evento; zero alteração fora da allowlist.
- Deep equality do objeto antes/depois depois de mascarar somente as 30 folhas.
- Cada resultado deve igualar o valor esperado congelado; zero `U+FFFD` e zero
  assinatura residual de mojibake nos 30 alvos.
- Preservar contagens: 19 eventos, 48 páginas, `101=26`, `401=26`, `102=4`,
  `402=8`, `404=4`, `357=63`, `657=401`.
- Preservar zero `401` órfão, pareamento `101/401`, estrutura e indent de
  `102/402/403/404` e `111/411/412`.
- Preservar integralmente conditions, triggers, movement routes, switches,
  variables, self-switches, callers, scripts e payloads `357/657`.
- Preservar as dez chamadas ao CE16 e a ordem das atribuições 101/102/103.
- Preservar o conjunto de bust/picture assets e validar sua existência/casing;
  presença física não valida apresentação.
- Diff Git restrito a `frontend/data/Map045.json` e aos scripts/artefatos
  explicitamente aprovados sob o plano; executar `git diff --check`.
- Map006, CommonEvents, System, MapInfos, plugins e demais arquivos devem ficar
  inalterados por esta implementação.

## Human Gates

- `approval-before-write`: revisar o preview das 30 substituições; a aprovação
  autoriza a correção de encoding, não uma reescrita narrativa.
- `human-validation`: Playtest de E8/P2, E8/P3, os dois ramos de E8/P4, E8/P6,
  E5/P4, E11/P1, E11/P3 e E12/P1–P3 nos estados de página correspondentes.
- No Playtest, conferir acentos, pontuação, ordem, wrapping, clipping, avanço
  normal/rápido, speaker/bust visível, enter/exit, expressão e cleanup.
- Confirmar que choices continuam exclusivas e que flags, progressão, rewards,
  transfers, câmera, áudio, autoruns, reentrada e save/load não regrediram nas
  rotas executadas.
- Runtime permanece `runtime-pending`; validators estáticos não substituem esse
  gate humano.

## Affected Docs

- Este artefato transitório:
  `planos/003-falas-casa-forjaprata/analise-tecnica.md`.
- Nenhuma documentação duradoura precisa ser alterada, pois não há mudança de
  regra, cânone ou contrato. `docs/index.xml` permanece inalterado.
- Follow-up opcional e separado: demanda sobre correção/sincronização de Map006.

## Stop Conditions

- O baseline de Map045 ou qualquer valor-fonte não corresponde ao manifest.
- A varredura encontra quantidade ou localização diferente das 30 ocorrências.
- A recuperação produz `U+FFFD`, texto ambíguo ou resultado diferente do
  esperado congelado.
- O diff inclui estrutura, payload, flag, escolha, asset, plugin, Map006 ou
  qualquer arquivo não autorizado.
- Parse, deep equality, contagens, branch/indent ou diff check falha.
- A correção exige nova redação, decisão de cânone ou ampliação para Map006.
- O Playtest humano é rejeitado ou não cobre as rotas afetadas; nesse caso a
  implementação pode existir, mas não pode ser declarada concluída.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** o Map045 é o alvo explícito e a correção preserva exatamente a
  redação recuperável; Map006 e qualquer revisão editorial estão fora de escopo.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none
- **Implementation demand:** `planos/003-falas-casa-forjaprata/demanda.md`
- **Analysis file:** `planos/003-falas-casa-forjaprata/analise-tecnica.md`
- **Inherited restrictions and decisions:** alvo de runtime único
  `frontend/data/Map045.json`; exatamente 30 folhas allowlisted; nenhum texto
  novo; nenhuma alteração em estrutura, plugins, assets, Map006 ou docs; manter
  alterações concorrentes do usuário.
- **Validators and human validation:** parse, manifest before/after, deep
  equality mascarada, contagens/branches/payloads/callers, diff restrito,
  preview humano e Playtest das páginas afetadas.
- **Required skills:** `loki-implement-feature`,
  `rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json`,
  `rpg-maker-mz-visustella-plugin-index`,
  `rpg-maker-mz-visustella-events-presentation` e
  `rpg-maker-mz-visustella-plugin-commands`.
- **Downstream execution profile:** `model_class: coding`,
  `execution_effort: medium`, writer `technical-implementer`, QA proposal por
  `runtime-qa`, `validator_effort: medium`, human-validation obrigatória.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready"
  sources_read:
    - "planos/003-falas-casa-forjaprata/demanda.md"
    - "frontend/data/Map045.json"
    - "frontend/data/Map006.json"
    - "frontend/data/MapInfos.json"
    - "frontend/data/System.json"
    - "frontend/data/CommonEvents.json#16"
    - "frontend/js/plugins.js"
    - "frontend/js/rmmz_objects.js"
    - "git history Map045/Map006"
    - "docs/index.xml and four routed domain inventories"
  research_gate: "not-needed"
  completed_handoffs:
    - "root -> source-researcher: complete-static"
    - "root -> bibliotecario: partial-context-found with catalog gap"
    - "root -> technical-implementer: proposal-ready"
    - "root -> runtime-qa: checklist proposed; runtime not validated"
  human_decision_preflight_required: "false"
  pending_questions:
    - "non-blocking follow-up: decide whether Map006 should be corrected and synchronized"
  implementation_demand_ref: "planos/003-falas-casa-forjaprata/demanda.md"
  analysis_file: "planos/003-falas-casa-forjaprata/analise-tecnica.md"
  inherited_restrictions:
    - "only Map045 runtime target"
    - "exactly 30 allowlisted string leaves"
    - "no narrative rewrite, structural change, plugin change or Map006 write"
    - "preserve unrelated dirty-worktree changes"
  recommended_next_command: "loki-implement-feature"
  next_action: "create a fail-closed task plan, writer and validator for the 30 string repairs"
  blocked_by: []
```
