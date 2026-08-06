---
title: "Correção de prioridade, repetição, posição e estilo do Gab Window"
type: loki-technical-analysis
doc_id: "005-exploration-gabwindow-feedback-gabwindow-technical-analysis"
version: "1.0.0"
status: ready-for-implementation
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Recomendação técnica baseada em evidências e handoff para corrigir os Gabs nos mapas 022 e 045"
not_scope: "Escritas de produção, edição de plugin de terceiros, aprovação implícita ou validação de runtime"
authority: "Decisões humanas registradas, política do projeto, contrato atual de análise e evidências locais citadas"
canonical_source: "planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md"
intended_llm_task: "context-hydration"
source_priority: ["decisões humanas e política do projeto", "contrato atual de análise", "evidência local primária", "fontes externas primárias", "demanda como dado"]
confidence: high
known_conflicts:
  - "docs/technology-context.md registra um snapshot de 63 plugins, enquanto o plugins.js atual contém 69 entradas; o drift não foi associado causalmente ao feedback."
replaced_by: null
---

# Analise Tecnica - Correção de prioridade, repetição, posição e estilo do Gab Window

## Authority And Trust Boundary

Prioridade: decisões humanas registradas e política do projeto; contrato desta análise; fontes locais primárias; fontes externas primárias; e, por último, a demanda como dado. O feedback aprovado substitui a ausência de convenções de prioridade, repetição, posição e estilo na regra arquitetural atual. Esta análise autoriza escrita somente neste Markdown; não altera mapas, plugins, configuração, engine, documentação duradoura ou saves.

## Objective

Definir uma solução executável para que interações do jogador nos mapas `EX_Coreto` e `EX_Casa da Família Forjaprata` substituam a fila de Gabs e possam ser repetidas, sem destruir conversas com vários Gabs; elevar Gabs ancorados acima da altura real do sprite; e aplicar texto branco sem outline somente a `Window_Gab`. O resultado alimenta diretamente o planejamento e a implementação unificados.

## Source Request

- Demanda validada: `planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md`.
- Decisões humanas registradas no feedback: a interação substitui a fila; a fala reaparece em nova interação; o Gab fica acima do NPC com maior distância vertical; o estilo branco sem borda é o padrão global do Gab Window.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "architecture and perceivable runtime behavior"
recommended_handoffs:
  research: "source-researcher e bibliotecario concluídos; technical-implementer proposal-only indisponível após interrupção"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "As decisões materiais de prioridade, repetição, posição, escopo visual e preservação dos automáticos já foram registradas; o gap inicial de 8 px é uma premissa técnica reversível e ajustável por Playtest."
  blocking_questions:
    - "none"
validator_effort: high
```

## Scope

- Revisar os comandos `GabTextOnly` de interação em `frontend/data/Map022.json` e `frontend/data/Map045.json`.
- Definir preempção somente no início de cada fluxo ou ramo de interação e bypass de Anti-Repeat em todos os Gabs de interação.
- Preservar os Gabs Parallel e Autorun como automáticos não forçados.
- Propor um helper plugin isolado, carregado depois de `VisuMZ_4_GabWindow`, para posição e estilo exclusivos de `Window_Gab`.
- Definir atualização da diretriz duradoura e de sua entrada em `docs/index.xml`.

## Out Of Scope

- Alterar texto, gatilhos, condições, switches, variáveis, transferências, movimentos, ordem narrativa ou demais efeitos dos eventos.
- Editar `frontend/js/plugins/VisuMZ_4_GabWindow.js`, `frontend/js/rmmz_*.js`, `Window_Base`, `ColorManager` ou o estilo de outras janelas.
- Alterar batalha, menus, outros mapas, assets ou `frontend/save/**`.
- Declarar timing, posição, legibilidade, input ou fluxo validados sem round-trip no editor e Playtest humano desde New Game.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md` | approved demand | Requisitos, restrições, critérios de aceite e premissas reversíveis. | Escopo e resultado esperado. |
| `planos/005-exploration-gabwindow/technical-analysis.md` | prior plan artifact | Decisões da conversão original e limites herdados. | Continuidade e regressão. |
| `AGENTS.md` | project policy | Preferir VisuStella/Coreto e consultar documentação local antes de alterar `frontend/data`. | Seleção da abordagem. |
| `frontend/data/MapInfos.json` | local primary | IDs 22/45 correspondem aos dois mapas solicitados. | Identidade dos alvos. |
| `frontend/data/Map022.json` | local primary | 14 `GabTextOnly`, 1 `ClearGab`; 12 Gabs Parallel e 2 PlayerTouch em ramos mutuamente exclusivos. | Inventário e preempção. |
| `frontend/data/Map045.json` | local primary | 27 `GabTextOnly`: 14 ActionButton, 9 PlayerTouch e 4 Autorun. | Inventário e preempção. |
| `frontend/js/plugins.js` | local primary | 69 entradas; GabWindow ativo na ordem 38; AntiRepeat ativo; cores globais do CoreEngine. | Configuração, estilo e load order. |
| `frontend/js/plugins/VisuMZ_4_GabWindow.js` | local primary | v1.05; contratos e implementação de ForceGab, BypassAntiRepeat, ancoragem e `Window_Gab`. | Semântica de fila, repetição, posição e extensão. |
| `frontend/js/rmmz_core.js`, `rmmz_windows.js` | local primary | Bitmap usa outline; `Window_Base.resetTextColor` aplica as cores do `ColorManager`. | Causa do estilo e isolamento. |
| `frontend/js/rmmz_objects.js`, `rmmz_sprites.js`, `frontend/data/System.json` | local primary | `screenY`, `Sprite_Character` e tile de 48 px; posição do personagem usa sua base. | Cálculo da posição. |
| `frontend/img/characters/**` referenciados | local primary | Frames relevantes medem 48 px, 70,5 px e 108 px de altura. | Necessidade de altura dinâmica. |
| `docs/index.xml` | durable-doc catalog | Diretriz Gab e gates técnicos/QA estão catalogados. | Navegação e impacto documental. |
| `docs/architecture/exploration-dialogue-gabwindow.md` | durable architecture rule | Gab somente-texto, continuação imediata, preservação de evento e validação em três camadas. | Restrições herdadas. |
| `docs/technology-context.md`, `docs/domains/runtime-qa/README.md`, `docs/domains/technical-implementer/README.md` | durable docs | Dados/plugins são sensíveis; runtime requer checks estáticos, editor e Playtest. | Validators e gates. |

## Evidence Classification

### Facts

- `Map022.json`, `Map045.json`, seus 41 `Text:json` e seus 41 `Override:struct` passam em parser JSON. Os JS inspecionados passam em `node --check`.
- `VisuMZ_4_GabWindow` v1.05 está ativo na ordem 38. Seus parâmetros efetivos incluem `AntiRepeat=true`, `GabFontSize=20`, `BaseWaitTime=120`, `TimePerCharacter=4`, `FadeRate=8` e `MapYLocation=72`. (`frontend/js/plugins.js`)
- Os 41 `GabTextOnly` atuais usam `ForceGab=false`. Nos 25 Gabs de interação, `BypassAntiRepeat` está omitido; nos 16 automáticos ele também permanece efetivamente falso. (`Map022.json`; `Map045.json`)
- `forceGabData` limpa fila, Gab corrente e contador antes de inserir o novo Gab. `addGabData` aplica Anti-Repeat, enquanto `Override.BypassAntiRepeat=true` ignora esse filtro. (`VisuMZ_4_GabWindow.js`, métodos de `Window_Gab`)
- Uma interação pode conter vários Gabs sem espera do Gab: `Map045` E8/P2 possui oito e E8/P4 possui sete distribuídos por ramos e sequência. Forçar todos apagaria os anteriores. (`Map045.json`)
- Em mapa, o Gab ancorado usa o `screenX/screenY` do alvo e posiciona a janela com offset fixo de `0x20`, isto é, 32 px multiplicados pelo zoom. `YLocation` só participa do posicionamento não ancorado. (`Window_Gab.repositionToMapTarget`, `repositionToTarget`, `repositionNormal`)
- Os sprites relevantes não têm altura uniforme: os padrões comuns medem 48 px, Tordan mede 70,5 px e `elf1` mede 108 px por frame. O offset fixo de 32 px pode deixar a janela sobre o sprite.
- `Window_Gab` deriva de `Window_Base`; seu `resetFontSettings` chama `resetTextColor`. A configuração atual do CoreEngine define cor normal `#361802` e outline `rgba(200, 179, 135, 1)`, explicando o texto escuro com borda amarelada observado. Não há parâmetro próprio de cor/outline no GabWindow instalado.
- Não existe helper local que estenda `Window_Gab`; os únicos usos da classe estão no plugin VisuStella. O plugin de terceiro e a engine não precisam ser editados.
- Nenhum dos 41 textos Gab atuais contém código de cor `\C[...]`.

### Inferences

- A preempção deve acontecer no primeiro Gab alcançável de cada fluxo ou ramo de interação, e não em todos os Gabs da página. Os Gabs posteriores da mesma conversa continuam enfileirados.
- Todos os 25 Gabs de interação devem declarar `BypassAntiRepeat=true`; isso expressa a política de repetição mesmo nos Gabs que continuam com `ForceGab=false` dentro de uma sequência.
- Os 12 Gabs Parallel do Map022 e os 4 Autorun do Map045 devem permanecer sem força e sem bypass, para não limpar nem interromper a interação priorizada.
- `MapYLocation` e o `YLocation` dos payloads não resolvem o problema de Gabs com `EventID`; a correção precisa atuar somente no posicionamento ancorado de `Window_Gab`.
- Um helper pós-GabWindow pode reutilizar a altura efetiva de `Sprite_Character` e isolar cor/outline em `Window_Gab`, preservando as demais janelas.

### Hypotheses

- **Compatível com a evidência, runtime pendente:** a supressão em nova interação decorre de `AntiRepeat=true` sem bypass. A implementação local confirma o mecanismo; a experiência exata exige Playtest.
- **Premissa reversível:** 8 px de gap adicional acima do topo real do sprite é um ponto inicial conservador. O valor deve permanecer configurável e pode ser ajustado sem alterar o algoritmo.
- **Compatibilidade pendente:** o helper poderá acessar `Window_Gab` e o sprite do alvo depois do carregamento do VisuStella; validar por load order, teste isolado e Playtest.

### Open Questions

- none. O valor visual do gap é tuning validado em Playtest, não uma decisão humana bloqueante para iniciar a implementação.

## Affected Surfaces

### Runtime, Engine or Framework

- `frontend/data/Map022.json` e `frontend/data/Map045.json`: somente payloads Gab de interação.
- `frontend/js/plugins/Coreto_GabWindowDefaults.js`: **novo alvo proposto** para a extensão isolada.
- `frontend/js/plugins.js`: ativação única do helper depois de `VisuMZ_4_GabWindow`, com parâmetro inicial de gap.
- `Window_Gab`: extensão de `repositionToMapTarget` e `resetTextColor`; sem alteração de `Window_Base`, `ColorManager`, engine ou vendor.

### Integration Points

- Comandos RPG Maker MZ `357/657` do `VisuMZ_4_GabWindow`.
- `GabTextOnly`, `ForceGab`, `Override.BypassAntiRepeat`, `EventID` e `ClearGab`.
- `Scene_Map`, spriteset, `Sprite_Character`, alvo `_lockedToTarget`, `screenY`, `patternHeight` e zoom de mapa.
- Plugin Manager e ordem de carregamento do helper.

### State and Data Contracts

- Cada `357` mantém suas três continuidades `657`; `ForceGab:eval`, a linha “Force Gab?” e `Override:struct` devem permanecer sincronizados.
- Texto, `EventID`, tempo, trigger, condições, indentação, ramos, switches, variáveis e efeitos adjacentes permanecem idênticos.
- A fila Gab é transitória. O helper não cria switches, variáveis, IDs de banco ou estado persistido e não deve tocar saves existentes.
- O único novo dado de configuração proposto é `MapTargetGap=8` no helper; ele representa pixels lógicos antes do zoom.

## Research Gate

**Decision:** not-needed
**Reason:** a configuração efetiva, o plugin instalado, a engine local, os mapas e os assets fornecem evidência suficiente. Não há decisão dependente de API, versão ou compatibilidade externa atual.

| Source | Finding | Impact |
| --- | --- | --- |
| `none` | Pesquisa externa não executada. | Evidência local permanece a autoridade do estado atual. |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Somente payloads Gab | ForceGab e Bypass existem no plugin; mapas identificados | Resolve prioridade/repetição sem novo código. | Não resolve altura real nem estilo isolado. | use como parte da solução |
| Parâmetros globais existentes | `plugins.js`; header do GabWindow | Mudança centralizada. | GabWindow não expõe cor/outline nem offset de âncora; mudar cores do CoreEngine afetaria outras janelas. | reject |
| Editar vendor ou engine | Métodos locais identificados | Acesso direto à implementação. | Viola restrição, amplia risco e perde alterações em atualização. | reject |
| Helper customizado pós-GabWindow | `Window_Gab` global e métodos localizados; plugin workflow | Isola posição/estilo, é reversível e preserva vendor/engine. | Exige ativação, guards, testes de load order e Playtest. | use |
| Adiar/bloquear | Runtime ainda não testado | Evita mudança antes do Playtest. | Não entrega o feedback e não há blocker técnico local. | reject; bloquear só se validators falharem |

## Recommendation

Aplicar uma solução em duas camadas.

### 1. Prioridade e repetição nos mapas

Em todos os 25 Gabs de ActionButton/PlayerTouch abaixo, adicionar `BypassAntiRepeat:eval=true` dentro de `Override:struct`. Aplicar `ForceGab=true` somente nos 13 pontos de entrada indicados; os demais continuam `ForceGab=false` para preservar a fila interna da conversa.

Os índices de comando são zero-based em `page.list`:

| Mapa | Evento/Página | Trigger | Todos os Gabs de interação | Gabs com `ForceGab=true` |
| --- | --- | --- | --- | --- |
| Map022 | E30/P1 | PlayerTouch | 12, 50 | 12, 50 — ramos mutuamente exclusivos |
| Map045 | E5/P4 | ActionButton | 21 | 21 |
| Map045 | E7/P1 | PlayerTouch | 9 | 9 |
| Map045 | E8/P2 | ActionButton | 11, 26, 31, 36, 41, 46, 51, 56 | 11 |
| Map045 | E8/P3 | ActionButton | 11 | 11 |
| Map045 | E8/P4 | PlayerTouch | 12, 27, 42, 47, 52, 92, 122 | 12 no ramo verdadeiro; 122 no Else |
| Map045 | E8/P6 | ActionButton | 11 | 11 |
| Map045 | E12/P1 | PlayerTouch | 12 | 12 |
| Map045 | E12/P2 | ActionButton | 12 | 12 |
| Map045 | E12/P3 | ActionButton | 12 | 12 |
| Map045 | E20/P2 | ActionButton | 11 | 11 |

Manter intactos os 12 Gabs Parallel de Map022 E20/P1 e os 4 Gabs Autorun de Map045 E11/P3: `ForceGab=false` e bypass ausente/falso. Preservar o `ClearGab` de Map022 E30/P1 no comando 36 e validá-lo especificamente em reentrada.

### 2. Posição e estilo em helper isolado

Criar o alvo proposto `frontend/js/plugins/Coreto_GabWindowDefaults.js`, ativado uma única vez depois de `VisuMZ_4_GabWindow`, com parâmetro `MapTargetGap` inicialmente igual a `8`.

- Alias de `Window_Gab.prototype.repositionToMapTarget`: preserve o posicionamento X existente; localize em `Scene_Map` o `Sprite_Character` cujo `_character` é o `_lockedToTarget`; obtenha a altura do frame por `patternHeight()` e use `$gameMap.tileHeight()` como fallback. Recalcule Y para deixar a borda inferior da janela em `screenY - alturaDoSprite - gap`, respeitando o zoom. Limite o topo à viewport; se o limite reduzir o gap, o caso deve falhar no Playtest e exigir tuning/câmera, não ser declarado válido silenciosamente.
- Alias de `Window_Gab.prototype.resetTextColor`: chame o comportamento anterior e depois aplique `contents.textColor='#ffffff'`, outline transparente e `contents.outlineWidth=0`. Não altere `Window_Base`, `ColorManager` nem parâmetros de cor do CoreEngine.
- Use IIFE, strict mode, guards para ausência de `Window_Gab`/métodos e header MZ. O helper não precisa expor comando de plugin nem estado global de gameplay.
- Se outro plugin passar a sobrescrever os mesmos métodos depois dele, pare e reavaliar a ordem; hoje não há extensão concorrente localizada.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Gab intermediário limpa o anterior. | `forceGabData` limpa current+queue; E8/P2 e E8/P4 têm sequências. | Forçar somente os 13 pontos de entrada listados; validator por branch e Playtest das sequências completas. | technical-implementer + runtime-qa |
| `ClearGab` encerra cedo a fala priorizada. | Map022 E30/P1 comando 36. | Preservar o comando e testar o ramo, timing e reentrada. | human-validation |
| Automático interrompe a interação. | 12 Parallel e 4 Autorun coexistem. | Não alterar força/bypass dos automáticos; testar concorrência no Coreto e Autorun na casa. | human-validation |
| Gap fixo continua cobrindo sprites altos. | Frames variam de 48 a 108 px; vendor usa 32 px. | Calcular pela altura real do frame e usar gap configurável. | unit/static test + human-validation |
| Janela sai pelo topo. | Maior afastamento e NPCs próximos ao topo. | Clamp visível, casos de 48/108 px e topo no Playtest; ajustar gap/câmera se necessário. | human-validation |
| Estilo vaza para outras janelas. | `Window_Base.resetTextColor` é global. | Override somente em `Window_Gab`; comparar Gab, mensagem, escolha e menu. | static scope check + human-validation |
| Atualização VisuStella quebra aliases. | Helper depende de métodos do v1.05. | Guards, load order, `node --check`, teste isolado e revalidação após atualização do plugin. | plugin workflow |
| Reflow ou corrupção de mapas. | JSON contém listas e payloads aninhados. | Edição estruturada, parse, inventário antes/depois e diff restrito. | data-json workflow |

## Validators

- `targeted-payload-inventory`: antes/depois por mapa, evento, página, branch, trigger e índice; exatamente 25 Gabs com bypass e 13 com força; exatamente 16 automáticos efetivamente sem força/bypass.
- `parse-json`: parsear `Map022.json`, `Map045.json`, todos os `Text:json` e `Override:struct` após a edição.
- `event-command-shape`: cada Gab preserva o `357` e suas três continuidades `657`; argumentos e texto visível ficam sincronizados.
- `branch-indent-and-sequence`: preservar indentação e ordem; E8/P2 mantém oito Gabs e E8/P4 mantém seus dois ramos e o Gab posterior do ramo verdadeiro.
- `diff-restricted-to-target`: sem reflow e sem alteração em texto, condições, IDs, efeitos, automáticos, vendor, engine ou save.
- `node --check frontend/js/plugins/Coreto_GabWindowDefaults.js` e `node --check frontend/js/plugins.js`.
- Validar `plugins.js` com `validate_plugins_js_envelope.py`; neste ambiente o launcher funcional é `py -3`. Só depois extrair `$plugins` em VM e confirmar helper ativo uma vez, depois da ordem 38.
- Teste isolado do helper com mocks de `Window_Gab`, sprite 48/108 px, fallback sem sprite, zoom, limite superior e uma janela não-Gab inalterada.
- `editor-round-trip`: abrir os mapas e o Plugin Manager, salvar, fechar e reabrir; conferir comandos, payloads, parâmetros e ordem.
- `human-validation`: Playtest desde New Game conforme a seção seguinte.

## Human Gates

- **Playtest New Game obrigatório:**
  - no Coreto, acionar E30 enquanto E20 possui Gab visível/em fila; a interação deve aparecer imediatamente e substituir a fila;
  - repetir representantes ActionButton e PlayerTouch três vezes, incluindo os dois ramos de E30;
  - executar E8/P2 e os dois ramos de E8/P4 integralmente; ordem, unicidade e conteúdo de todos os Gabs devem permanecer;
  - observar E20 Parallel e E11/P3 Autorun sem preempção indevida;
  - testar sprites de 48 px, 108 px e caso próximo ao topo; Gab inteiro acima do sprite, com gap visível e sem clipping;
  - comparar Gab com mensagem, escolha e menu; somente o Gab deve usar branco sem outline.
- Registrar mapa, evento/página/ramo, tentativa, resultado observável e screenshots ou vídeo. Runtime permanece `pending-human-validation` até essa evidência.

## Affected Docs

- `docs/architecture/exploration-dialogue-gabwindow.md`: registrar prioridade no início da interação, bypass de repetição, preservação de sequência, automáticos não forçados, posição pela altura do sprite e estilo branco sem outline exclusivo do Gab.
- `docs/index.xml`: atualizar resumo, seções, palavras-chave e `updated_at` da diretriz após a revisão.
- `docs/technology-context.md`: não atualizar nesta demanda; seu snapshot de contagem já está defasado e exige reconciliação própria, sem relação causal com o Gab.

## Stop Conditions

- Parar se a edição tentar forçar um Gab intermediário de E8/P2 ou E8/P4.
- Parar se texto, `EventID`, trigger, condição, indentação, ramo, switch, variável ou efeito adjacente mudar.
- Parar se a solução exigir editar VisuStella, engine, `Window_Base`, `ColorManager` ou save.
- Parar se o helper não puder ser carregado depois de `VisuMZ_4_GabWindow`, se houver override concorrente não resolvido ou se os validators de sintaxe/envelope/load order falharem.
- Não concluir a implementação como validada enquanto editor round-trip ou Playtest estiver pendente/falho; ajustar o gap configurável se posição, clipping ou legibilidade falharem.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** prioridade, substituição, repetição, maior distância, estilo global do Gab e preservação dos automáticos estão decididos; o gap de 8 px é premissa reversível submetida a Playtest.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** `none`
- **Implementation demand:** `planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md`
- **Analysis file:** `planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md`
- **Inherited restrictions and decisions:** editar somente os 25 payloads de interação nos mapas 022/045; 13 pontos de força exatos; automáticos intocados; helper customizado pós-GabWindow; não editar vendor/engine/outras janelas; preservar conteúdo e fluxo; não tocar saves.
- **Validators and human validation:** inventário 25/13/16, parse aninhado, forma 357/657, branches/sequências, diff restrito, syntax/envelope/load order, teste isolado, editor round-trip e Playtest New Game.
- **Required skills:** `rpg-maker-mz-data-json`, `rpg-maker-mz-visustella-plugin-commands`, `rpg-maker-mz-plugin-workflow`, `rpg-maker-mz-visustella-plugin-parameters`.
- **Downstream execution profile:** `model_class: coding`; `execution_effort: high`; `recommended_handoffs: technical-implementer writer e runtime-qa proposal/human-gate`; `validator_effort: high`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready-for-implementation"
  sources_read:
    - "planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md"
    - "planos/005-exploration-gabwindow/technical-analysis.md"
    - "AGENTS.md"
    - "frontend/data/MapInfos.json"
    - "frontend/data/Map022.json"
    - "frontend/data/Map045.json"
    - "frontend/data/System.json"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/VisuMZ_4_GabWindow.js"
    - "frontend/js/rmmz_core.js"
    - "frontend/js/rmmz_windows.js"
    - "frontend/js/rmmz_objects.js"
    - "frontend/js/rmmz_sprites.js"
    - "docs/index.xml"
    - "docs/architecture/exploration-dialogue-gabwindow.md"
    - "docs/technology-context.md"
    - "docs/domains/runtime-qa/README.md"
    - "docs/domains/technical-implementer/README.md"
  human_decision_preflight_required: false
  pending_questions: []
  implementation_demand_ref: "planos/005-exploration-gabwindow/feedback-gabwindow/improved-demand.md"
  analysis_file: "planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md"
  inherited_restrictions:
    - "25 Gabs de interação recebem BypassAntiRepeat; apenas 13 entradas recebem ForceGab"
    - "12 Parallel e 4 Autorun permanecem não forçados e sem bypass"
    - "Helper somente depois do GabWindow e somente para Window_Gab"
    - "Não editar vendor, engine, outras janelas, conteúdo/fluxo dos eventos ou saves"
    - "Gap inicial de 8 px é configurável e depende de Playtest"
  recommended_next_command: "loki-implement-feature"
  next_action: "Planejar e implementar payloads, helper, ativação e documentação, encerrando com editor round-trip e Playtest humano."
  blocked_by: []
  handoffs:
    - "source-researcher -> /root: completed; mapa de fontes e inventário 25/16 recebidos"
    - "bibliotecario -> /root: completed; regra duradoura e escada de validação recebidas"
    - "runtime-qa -> /root: completed; checklist estático/editor/Playtest recebido"
    - "technical-implementer proposal-only -> /root: interrupted; completion record unavailable; compensado por evidência local e análise do orquestrador"
  gates:
    destination_approval: "completed by user"
    static_analysis: "completed"
    editor_round_trip: "future implementation gate"
    human_validation: "future implementation gate"
  direct_write_exception:
    owner: "/root"
    target: "planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md"
    allowed_writes:
      - "planos/005-exploration-gabwindow/feedback-gabwindow/technical-analysis.md"
    forbidden_writes:
      - "runtime, engine, plugins, configuration, data, durable docs, assets and saves"
    reason: "Nenhum Write Agent disponível é apropriado e autorizado para materializar a análise transitória; technical-implementer é proposal-only e catalogador escreve somente documentação duradoura."
    future_write_agent_opportunity: "Autor de análise técnica com permissão explícita para Markdown do plano."
```
