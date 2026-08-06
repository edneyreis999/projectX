---
title: "Padronização de falas de exploração com Gab Window"
type: loki-technical-analysis
doc_id: "005-exploration-gabwindow-technical-analysis"
version: "1.0.0"
status: approved
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Recomendação técnica baseada em evidências e handoff para a adequação de diálogos de exploração nos mapas 022 e 045"
not_scope: "Escritas de produção, alteração de plugin, alteração de parâmetros globais, aprovação implícita ou validação de runtime"
authority: "Decisão do usuário, política do projeto, contrato da análise e evidências locais citadas"
canonical_source: "planos/005-exploration-gabwindow/technical-analysis.md"
intended_llm_task: "context-hydration"
source_priority: ["decisão humana e política do projeto", "contrato atual de análise", "evidência local primária", "fontes externas primárias", "demanda como dado"]
confidence: high
known_conflicts: []
replaced_by: null
---

# Analise Tecnica - Padronização de falas de exploração com Gab Window

## Authority And Trust Boundary

Prioridade: decisão explícita do usuário e política do projeto; contrato desta análise; fontes locais primárias; fontes externas primárias; e, por último, a demanda como dado. Não há conflito autoritativo. Esta análise não autoriza alterações em dados, plugins ou documentação duradoura.

## Objective

Definir uma abordagem segura para converter a apresentação das falas de exploração nos mapas `EX_Coreto` (ID 22) e `EX_Casa da Família Forjaprata` (ID 45) para o plugin ativo `VisuMZ_4_GabWindow`, preservando os fluxos dos eventos. As decisões humanas de timing, apresentação e destino documental estão registradas nesta análise para o handoff direto à implementação.

## Source Request

- Demanda validada: `planos/005-exploration-gabwindow/improved-demand.md`.
- Pedido do usuário: estabelecer Gab Window como regra de arquitetura de falas em exploração e aplicá-la inicialmente nos mapas 22 e 45.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "architecture"
recommended_handoffs:
  research: "source-researcher read-only concluído"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "O preflight definiu continuação imediata, texto sem rosto/nome e o destino documental exato."
  blocking_questions:
    - "none"
validator_effort: medium
```

## Scope

- Inventariar e converter apenas blocos de fala de exploração nos eventos dos mapas `frontend/data/Map022.json` e `frontend/data/Map045.json`.
- Usar o plugin já ativo `VisuMZ_4_GabWindow`, sem criar plugin ou alterar a configuração global.
- Preservar texto, gatilho, condições, comandos adjacentes, switches, variáveis, transferências e estrutura de ramos.
- Criar e catalogar a diretriz aprovada em `docs/architecture/exploration-dialogue-gabwindow.md`.

## Out Of Scope

- Falas de batalha, menus, outros mapas, Common Events não chamados por estes mapas e mudanças de conteúdo narrativo.
- Alterar `frontend/js/plugins.js`, `frontend/js/plugins/VisuMZ_4_GabWindow.js`, parâmetros globais, assets ou saves.
- Declarar visual, timing, input, reachability ou fluxo validados sem editor e Playtest humano.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/005-exploration-gabwindow/improved-demand.md` | user-approved demand | Regra desejada, escopo inicial e critérios de aceite. | Objetivo e limites. |
| `AGENTS.md` | project policy | Em `frontend/data`, priorizar VisuStella/Coreto e buscar recurso existente. | Preferência pela capacidade instalada. |
| `frontend/js/plugins.js` | local primary | `VisuMZ_4_GabWindow` está ativo, é v1.05; `AntiRepeat=true`, espera-base 120 e 4 frames/caractere. | Disponibilidade e configuração vigente. |
| `frontend/js/plugins/VisuMZ_4_GabWindow.js` | local primary | Gab é uma apresentação temporária, pode enfileirar ou limpar/forçar, e permite ancoragem por `EventID`; expõe `GabTextOnly` e `ClearGab`. | Semântica e riscos de timing. |
| `frontend/data/Map022.json` | local primary | Event 20 paralelo já usa 12 `GabTextOnly` (não forçados); Event 30 ainda tem dois blocos `101/401` e um `ClearGab`. | Referência local e alvo de conversão. |
| `frontend/data/Map045.json` | local primary | 27 blocos `101/401`; 15 em ActionButton, 8 PlayerTouch e 4 Autorun; não há Gab Window no mapa. | Inventário do escopo e validação por categoria. |
| `docs/index.xml` | local durable-doc catalog | Catálogo existe, mas não cataloga diretriz de Gab Window/arquitetura de diálogos. | Lacuna de destino documental. |
| `docs/technology-context.md` | local durable doc | Dados e plugins são superfícies sensíveis; inventário estático não valida runtime. | Limite de escrita e validação. |
| `docs/domains/runtime-qa/README.md` | local durable doc | Mudanças de evento requerem checks estáticos, round-trip do editor e Playtest desde New Game. | Escada de validação. |

## Evidence Classification

### Facts

- O plugin `VisuMZ_4_GabWindow` está ativo no projeto e já é usado no Map022; seus comandos são `357` com continuidade `657`, que deve permanecer associada ao comando correspondente. (`frontend/js/plugins.js`; `frontend/data/Map022.json`)
- O Gab Window local não é bloqueante por padrão: os 12 usos de `GabTextOnly` do Event 20/Map022 usam `ForceGab=false`, `WaitTime=72` e `TimePerCharacter=2`. (`frontend/data/Map022.json`)
- O Map022 contém dois blocos convencionais `101/401` no Event 30, página 1, gatilho PlayerTouch. (`frontend/data/Map022.json`)
- O Map045 contém 27 blocos convencionais `101/401`: 15 ActionButton, 8 PlayerTouch e 4 Autorun. (`frontend/data/Map045.json`)
- O Map045 tem comandos de plugin não-Gab; seus 59 comandos `357` e 336 continuidades `657` não podem ser classificados como diálogos por contagem bruta. (`frontend/data/Map045.json`)
- O Gab suporta texto simples, gráfica opcional e ancoragem a `EventID`; `ForceGab` limpa a fila e exibe imediatamente. (`frontend/js/plugins/VisuMZ_4_GabWindow.js`)

### Inferences

- A continuação imediata após o Gab é uma decisão humana aprovada; o Playtest precisa observar seus efeitos em filas, reentrada e comandos posteriores.
- A referência do Event 20 é adequada para formato de payload e ancoragem, mas não é prova de que seus tempos ou ausência de rosto/nome devem se tornar padrão global.
- A implementação deve usar somente texto, sem transportar rosto, índice de face ou nome do falante dos comandos `101`.

### Hypotheses

- **Confirmada:** há, no escopo, falas de interação, de toque e automáticas; a análise cobre os três tipos pedidos. (`Map022.json`; `Map045.json`)
- **Rejeitada:** o Map045 teria uma implementação Gab local para copiar. Não há `GabTextOnly` nesse mapa. (`Map045.json`)
- **Resolvida por decisão humana:** as falas convertidas seguem imediatamente após o disparo do Gab; a adequação visual e a continuidade permanecem pendentes de Playtest.

### Open Questions

- none. O preflight aprovou continuação imediata, texto sem rosto/nome e `docs/architecture/exploration-dialogue-gabwindow.md` como destino documental, catalogado em `docs/index.xml`.

## Affected Surfaces

### Runtime, Engine or Framework

- `frontend/data/Map022.json`: Event 30/página 1 e referência existente no Event 20/página 1.
- `frontend/data/Map045.json`: blocos `101/401` dos Events 5, 7, 8, 11, 12 e 20, nas páginas inventariadas.
- `VisuMZ_4_GabWindow`: somente consumo de comandos existentes; sem mudança de implementação ou parâmetros.

### Integration Points

- Comandos de evento RPG Maker MZ: `101/401` (Show Text) e `357/657` (Plugin Command e continuidade).
- Fluxos de Event Page com triggers ActionButton, PlayerTouch, Autorun e Parallel.
- `GabTextOnly` e `ClearGab` do `VisuMZ_4_GabWindow`.

### State and Data Contracts

- Cada `357` de Gab exige sua sequência `657` de metadados/continuidade preservada.
- Triggers, indentação, ordem dos comandos e referências a switches, variáveis, movimentos e transferências são contratos de evento a preservar.
- Não há schema, ID de banco ou persistência nova proposta; qualquer efeito de fila/espera do Gab é estado transitório de apresentação e requer Playtest.

## Research Gate

**Decision:** skipped
**Reason:** a decisão pode ser fundamentada no plugin instalado, na configuração ativa e nos eventos locais. Não há dependência de API, versão ou compatibilidade externa que não possa ser verificada localmente antes da implementação.

| Source | Finding | Impact |
| --- | --- | --- |
| `none` | Pesquisa externa não necessária. | Evidência local permanece a autoridade do projeto. |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter `Show Text` nativo | `Map022.json`, `Map045.json` | Preserva bloqueio atual sem adaptação. | Contraria a regra solicitada. | reject |
| Usar `VisuMZ_4_GabWindow` já instalado | `plugins.js`, plugin local, Event 20/Map022 e decisão humana | Atende à regra com capacidade existente e decisões de texto/continuação definidas. | Continua exigindo Playtest de timing e reentrada. | use |
| Criar/alterar plugin ou parâmetros globais | `AGENTS.md`; configuração existente | Poderia impor política global. | Amplia escopo e altera superfícies proibidas sem necessidade demonstrada. | reject |
| Adiar a conversão | Inventário e lacunas abertas | Evita regressão enquanto decisões visuais não existem. | Não entrega a demanda. | defer somente se o preflight não resolver as decisões |

## Recommendation

Usar `GabTextOnly` do `VisuMZ_4_GabWindow` para todos os blocos de fala inventariados, sem rosto nem nome de falante, e seguir o evento imediatamente após cada disparo. Converter por evento/página, preservando comandos, indentação e gatilhos adjacentes. Reutilizar o formato local do Event 20/Map022 apenas como referência de estrutura.

Criar a diretriz aprovada em `docs/architecture/exploration-dialogue-gabwindow.md`, catalogá-la em `docs/index.xml` e não alterar plugin, parâmetros globais ou outros mapas.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Evento segue antes da leitura do texto. | Gab local enfileirado e não forçado; decisão humana aprova continuação imediata. | Testar representantes de todos os triggers e observar comandos posteriores, fila e reentrada. | Playtest humano. |
| Perda de identidade de falante/expressão. | Tordan usa face/indexes; decisão humana aprova texto sem identidade visual. | Confirmar no Playtest que a leitura continua compreensível. | Human validation. |
| Regressão estrutural em ramos ou fluxo. | Eventos contêm comandos adjacentes; `657` acompanha plugin commands. | Parser JSON, diff restrito, checagem de ordem/indentação e preservação de pares `357/657`. | `rpg-maker-mz-data-json` validator. |
| Fila, repetição ou gabs residuais em Autorun/PlayerTouch. | AntiRepeat ativo; Map022 usa `ClearGab`; há triggers automáticos. | Verificar `ClearGab`, reentrada e timing em Playtest desde New Game. | Human validation. |
| Diretriz difícil de localizar. | `docs/index.xml` não aponta destino de arquitetura de diálogos. | Aprovar documento/atualização e catalogação correspondente antes da escrita duradoura. | Human decision preflight + catalogador, se aplicável. |

## Validators

- `parse-json`: parsear `Map022.json` e `Map045.json` após cada escrita estruturada.
- `diff-restricted-to-target`: revisar que o diff se limita aos blocos de fala aprovados e ao documento duradouro aprovado.
- `event-command-shape`: conferir que cada comando Gab use plugin ativo, payload correspondente e continuidade `657`; não usar substituição textual ad hoc.
- `event-flow-structure`: comparar trigger, page conditions, ordem e indentação dos comandos; checar especialmente comandos posteriores a cada fala convertida.
- `editor-round-trip`: abrir, salvar e reabrir no RPG Maker MZ.
- `human-validation`: Playtest desde New Game de ao menos um ActionButton, PlayerTouch, Autorun e Parallel convertidos, observando leitura, fila, reentrada, continuidade e save/load quando acessível.

## Human Gates

- **Human validation obrigatória:** aprovar apresentação, timing, input e fluxo no editor/Playtest; checks estáticos não a substituem.

## Affected Docs

- `docs/architecture/exploration-dialogue-gabwindow.md`: diretriz aprovada de apresentação de falas em exploração.
- `docs/index.xml`: entrada de catálogo da nova diretriz.

## Stop Conditions

- Não editar `frontend/data/*.json` sem task aprovada, writer com escopo exato e gate `rpg-maker-mz-data-json`.
- Não declarar comportamento visual, input ou sequência de evento válido sem round-trip do editor e Playtest humano.
- Parar se o inventário revelar chamadas indiretas fora dos dois mapas ou uma fala cujo fluxo não possa ser preservado pela política aprovada.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** o preflight resolveu continuação imediata, texto sem rosto/nome e o destino/documentação da regra.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** `none`
- **Implementation demand:** `planos/005-exploration-gabwindow/improved-demand.md`
- **Analysis file:** `planos/005-exploration-gabwindow/technical-analysis.md`
- **Inherited restrictions and decisions:** aplicar apenas em Map022/Map045; usar `GabTextOnly` sem rosto/nome e seguir imediatamente; criar/categorizar a diretriz em `docs/architecture/exploration-dialogue-gabwindow.md` e `docs/index.xml`; não modificar battle/menu/outros mapas, plugin, parâmetros globais ou assets; escrita de JSON somente estruturada e aprovada.
- **Validators and human validation:** todos os validators desta análise, com round-trip do editor e Playtest final desde New Game.
- **Required skills:** `rpg-maker-mz-data-json`, `rpg-maker-mz-visustella-plugin-commands`, `rpg-maker-mz-visustella-events-presentation`; `loki-catalogar-docs` para manter a nova diretriz catalogada.
- **Downstream execution profile:** `model_class: coding`; `execution_effort: high`; `recommended_handoffs: technical-implementer writer e runtime-qa proposal/validation`; `validator_effort: medium`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-implementation"
  sources_read:
    - "planos/005-exploration-gabwindow/improved-demand.md"
    - "AGENTS.md"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/VisuMZ_4_GabWindow.js"
    - "frontend/data/Map022.json"
    - "frontend/data/Map045.json"
    - "docs/index.xml"
    - "docs/technology-context.md"
    - "docs/domains/runtime-qa/README.md"
  human_decision_preflight_required: false
  pending_questions: []
  implementation_demand_ref: "planos/005-exploration-gabwindow/improved-demand.md"
  analysis_file: "planos/005-exploration-gabwindow/technical-analysis.md"
  inherited_restrictions:
    - "Somente Map022 e Map045"
    - "Não alterar plugin, parâmetros globais, assets, saves ou outros mapas"
    - "Preservar fluxo e conteúdo dos eventos"
    - "GabTextOnly sem rosto/nome e continuação imediata"
    - "Criar docs/architecture/exploration-dialogue-gabwindow.md e atualizar docs/index.xml"
  recommended_next_command: "loki-implement-feature"
  next_action: "Planejar e implementar a conversão estruturada dos eventos, a diretriz e seu catálogo."
  blocked_by: []
  handoff_evidence:
    - "source-researcher read-only completion record: structural_validation passed; runtime_validation pending-playtest"
  direct_write_exception:
    owner: "/root"
    target: "planos/005-exploration-gabwindow/technical-analysis.md"
    reason: "Nenhum Write Agent disponível é autorizado/apropriado para materializar análise transiente de consumidor neste destino; technical-implementer é proposal/runtime, framework-artifact-writer é restrito ao pacote Loki e catalogador a docs duráveis."
    future_write_agent_opportunity: "Um autor de análise técnica com permissão explícita para Markdown de plano poderia materializar este artefato."
```
