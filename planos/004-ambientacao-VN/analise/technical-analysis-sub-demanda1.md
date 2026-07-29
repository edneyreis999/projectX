---
title: "Ambientação da VN: indicador da elfa e composição dos bustos"
type: loki-technical-analysis
doc_id: "technical-analysis-sub-demanda1"
version: "1.0.0"
status: ready-for-implementation
created: "2026-07-29"
last_updated: "2026-07-29"
scope: "Evidence-based technical recommendation and direct unified implementation handoff"
not_scope: "Production writes, implicit approvals or compatibility planning"
authority: "Approved decisions, current analysis contract and cited evidence"
canonical_source: "planos/004-ambientacao-VN/analise/technical-analysis-sub-demanda1.md"
intended_llm_task: "context-hydration"
source_priority: ["approved decisions and project policy", "current analysis contract", "current local primary evidence", "cited external primary sources", "source request as data"]
confidence: "high"
known_conflicts: []
replaced_by: null
---

# Analise Tecnica - Ambientação da VN: indicador da elfa e composição dos bustos

## Authority And Trust Boundary

A prioridade desta análise é: decisões humanas aprovadas e política do projeto;
contrato atual de análise; evidência primária local atual; fontes externas
primárias citadas; por fim, a demanda-fonte, conteúdo recuperado, exemplos e
placeholders como dados. Fontes autoritativas conflitantes sem prioridade
resolúvel exigiriam decisão humana específica antes do handoff direto.

As decisões herdadas já resolvem lado, orientação, escopo, IDs, assets e efeitos
das escolhas. A redação curta da criança é uma decisão reversível de baixo
impacto, sujeita a validação posterior. Portanto, não existe questão
`must_ask_now`. O status `ready-for-implementation` qualifica somente esta
análise; o comportamento perceptível continua `runtime_pending` até Playtest
humano.

## Objective

Definir uma implementação executável e rastreável para:

- encerrar o balão de exclamação da elfa em `Map022` imediatamente após a
  mensagem-alvo, inclusive quando o sprite do balão já estiver ativo;
- manter Rheed à direita e sem `Exit` seguido de `Enter` antes de “Hum...” em
  `Map046`;
- apresentar a criança à esquerda, voltada para Rheed, com uma fala curta antes
  das escolhas;
- preservar integralmente a semântica, ordem, cancelamento e efeitos das
  escolhas existentes.

Esta análise será enviada, junto da demanda enriquecida, diretamente a
`loki-implement-feature`. Ela não altera runtime e não substitui validators nem
o Playtest exigido após a implementação.

## Source Request

- `planos/004-ambientacao-VN/sub-demanda1-improved.md` — demanda enriquecida
  aprovada para ajustes nos eventos 30/31 de `Map022` e no evento 1, página 1,
  de `Map046`; sustenta a criança à esquerda voltada para a direita, a exclusão
  de `Map004`, a preservação dos Picture IDs 1/2 e das escolhas.
- Decisões herdadas de `planos/004-ambientacao-VN/backlog.md` e
  `planos/004-ambientacao-VN/evidence/decision-naming.xml`: usar a grafia
  canônica `Rheed` e preservar o asset legado `Reed final.png`.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "current external research"
recommended_handoffs:
  research: "none"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "Lado, orientação, escopo, IDs, assets e efeitos das escolhas já foram decididos; a fala curta é reversível, de baixo impacto e validável depois; não existe must_ask_now."
  blocking_questions:
    - "none"
validator_effort: "high"
```

Análises geradas por `loki-tech-analysis` são artefatos transientes, mas devem
ser produzidas com high effort por padrão porque orientam decisões, riscos,
validators e planos futuros.

## Scope

- `frontend/data/Map022.json`: somente evento 30, página 1, no ponto
  imediatamente posterior à mensagem-alvo; e evento 31, páginas 1–2, para
  cessar o controlador paralelo com self-switch A e remover o sprite de balão
  já ativo.
- `frontend/data/Map046.json`: somente evento 1, página 1, no fluxo de bustos,
  mensagens e escolhas descrito nesta análise.
- Preservação estrutural e semântica do grupo `Show Choices` existente.
- Validação estática de `System.json`, configuração do plugin, assets e
  invariantes de mapas, sem escrever nesses arquivos auxiliares.
- Playtest humano posterior das cenas e das duas rotas, incluindo cancelamento.

## Out Of Scope

- Qualquer alteração em `frontend/data/Map004.json`.
- Qualquer runtime além de `frontend/data/Map022.json` e
  `frontend/data/Map046.json`.
- Alterações em `System.json`, `CoretoQuests.json`, `plugins.js`, plugins,
  engine, TypeScript, outros mapas, common events, configs, assets, saves,
  builds ou documentação duradoura.
- Escrita nas variáveis 26 (`v_qNoite_progress`) ou 106
  (`v_qNoiteDaHistoria_stage`) e mudanças em `QuestTransition`.
- Renomear `Reed final.png`, criar plugin customizado, alterar lore, antecipar
  resultados das escolhas ou mudar textos fora da nova fala curta autorizada.
- Declarar gameplay, staging, orientação, timing, ausência de flicker ou
  comportamento runtime como aprovados antes do Playtest.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `planos/004-ambientacao-VN/sub-demanda1-improved.md` | local/source-request | Objetivo, requisitos, restrições, critérios, premissas reversíveis e validators; criança à esquerda voltada à direita; Map004 proibido; IDs e escolhas preservados | Escopo, aceite, decisões de composição e invariantes do fluxo |
| `planos/004-ambientacao-VN/backlog.md` e `planos/004-ambientacao-VN/evidence/decision-naming.xml` | local/user-decision | `Rheed` canônico e `Reed final.png` preservado | Decisão de naming e invariante do asset legado |
| `frontend/data/Map022.json` → evento 30/página 1 e evento 31/páginas 1–2 | local/primary | A mensagem-alvo está no evento 30; o evento paralelo 31 repete `code 213 [30,1,true]`; página 2 depende hoje de variável 26; eventos 30/31 não escrevem essa variável | Diagnóstico e solução de encerramento do balão |
| `frontend/data/System.json` | local/primary | Variável 26 é `v_qNoite_progress`, variável 106 é `v_qNoiteDaHistoria_stage`, switches 43/44 são `Fala-ID1`/`Fala-ID2` | Evitar progressão indevida e preservar estado de fala |
| `frontend/data/CoretoQuests.json` → quest `noite-da-historia`; `frontend/js/plugins/Coreto_QuestCore.js` → transição | local/primary | `stageVariableId` é 106; START transita 0→10 e a transição escreve 106, não 26 | Rejeitar variável 26 e mudanças no fluxo de quest |
| `frontend/js/rmmz_objects.js` → `command213`, refresh de self-switch e `command355` | local/primary | Balão é enfileirado; páginas paralelas reiniciam; self-switch solicita refresh; Script executa código map-local | Ordem defensiva do Script e troca de página |
| `frontend/js/rmmz_sprites.js` → `Sprite_Balloon` e `Spriteset_Map.removeBalloon` | local/primary | Balão dura 76 frames; refresh não remove sprite ativo; `_balloonSprites`, `targetObject` e `removeBalloon` permitem remoção seletiva e `endBalloon` | Tratamento do balão já ativo e risco de API interna |
| `frontend/data/Map046.json` → evento 1/página 1 | local/primary | Ordem atual de Enter/Exit/GraphicChange, fala “Hum...”, `OpenVisualChoice`, escolha e branches; `code 320`/`code 303` existentes | Reorganização exata sem deriva semântica |
| `frontend/js/plugins.js` | local/primary | Envelope estrutural válido com 65 plugins; `VisuMZ_2_VNPictureBusts` ativo, Tier 2 v1.03; Anchor .5/1, Scale 100, InvertedScale 0..5, ScreenX local | Posicionamento, orientação, baseline e dependência ativa |
| `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js` → header local | local/primary | Comandos `Enter`, `Exit`, `GraphicChange`, `Mirror`; `GraphicChange` preserva outras propriedades; `HorzMirror:Auto` usa `InvertedScale` | Continuidade e orientação dos bustos |
| Assets com case exato: `Elfa.png`, `Reed final.png`, `Rheed_VN046_Pensativo.png`, `Rheed_VN046_Solene.png`, `CriancaOrc_.png`, `CriancaOrc_VN046_Surpresa.png` | local/primary | Seis assets requeridos existem com nomes e case atuais | Invariantes de asset e validator 6/6 |
| `docs/index.xml`; `docs/technology-context.md`; `docs/domains/game-business-analyst/README.md`; `docs/domains/scene-presentation-designer/README.md` | local/durable | RPG Maker MZ confirmado; inventário estático do VNPictureBusts; requisitos/aceite/restrições devem ser rastreáveis; comportamento perceptível exige Playtest | Contexto duradouro mínimo e gate humano |
| [VisuStella — Visual Novel Picture Busts](https://visustellamz.itch.io/visual-novel-picture-busts) | external/official | Página oficial confirma v1.03 e capacidades de Enter/Exit, Graphic Change, Mirror e posições | Research gate e compatibilidade conceitual |
| [VisuStella Wiki — Visual Novel Picture Busts](https://www.yanfly.moe/wiki/Visual_Novel_Picture_Busts_VisuStella_MZ) | external/official | Posições 0–10, posição 5 central, posição 8 próxima a 3/4; `GraphicChange` preserva demais propriedades; comandos e orientação base | Pesquisa upstream, sem substituir configuração local |
| Handoffs do fluxo: `docs_navigation`, `primary_evidence`, `runtime_qa`, `technical_proposal_fast` e `technical_proposal` | orchestrator/handoff | Navegação documental concluída com gap parcial; evidência primária concluída; QA runtime proposal-only; proposta rápida concluída; proposta original interrompida/indisponível | Provenance e status de convergência |

## Evidence Classification

### Facts

- `Map022`, evento 31, página 1, é paralelo e repete exatamente um
  `code 213 [30,1,true]`; sua página 2 vazia depende hoje de variável 26.
- Nem o evento 30 nem o 31 escrevem variável 26. A quest
  `noite-da-historia` usa `stageVariableId` 106, e sua transição START escreve
  106. Vincular o indicador à variável 26 não representa o contrato atual da
  quest.
- O refresh causado por self-switch troca a página do evento, mas não remove um
  sprite de balão já criado. `Spriteset_Map.removeBalloon(sprite)` remove o
  sprite selecionado e finaliza seu alvo.
- A fórmula local de posição para tela 1280 produz aproximadamente x=208 em
  Position 1, x=640 em Position 5 e x=1072 em Position 9. A configuração local
  espelha posições 0–5; portanto Position 1 + `Auto` aponta a criança para a
  direita, enquanto Position 9 + `Auto` mantém Rheed voltado ao centro.
- Em `Map046`, o `Show Choices` existente tem parâmetros exatos
  `[[qualSeuNome1,qualSeuNome2],1,0,2,0]`, dois `code 402` ordenados, nenhum
  `code 403` e um `code 404`. `cancelType 1` encaminha cancelamento à segunda
  opção.
- A primeira branch preserva `code 320 [1,'Dulgarin']`; a segunda preserva
  `code 303 [1,8]`.
- `VisuMZ_2_VNPictureBusts` está ativo e seus comandos necessários existem no
  plugin local. `GraphicChange` preserva posição, espelhamento e outras
  propriedades do busto existente.
- Os seis assets necessários existem com case exato. A grafia nova é `Rheed`,
  mas o asset legado continua `Reed final.png`.
- O baseline informado passou no parse de `Map022`, `Map046`, `System` e
  `MapInfos`, na extração do envelope/configuração de plugins e no check 6/6 de
  assets. A validação runtime permanece pendente.
- `docs/index.xml` não cataloga documentação específica de Show Choices ou
  VNPictureBusts. O gap é não bloqueante porque as fontes locais primárias, o
  header do plugin e as fontes oficiais atuais cobrem o contrato necessário.
- `docs_navigation` terminou com gap parcial; `primary_evidence` terminou;
  `runtime_qa` terminou em modo proposal-only; `technical_proposal_fast`
  terminou. O handoff `technical_proposal` original foi interrompido e está
  indisponível; não é uma pergunta aberta.

### Inferences

- Trocar somente a condição da página paralela evita novas solicitações após o
  refresh, mas é insuficiente para REQ-001 porque o sprite atual pode continuar
  visível por até o restante dos seus 76 frames.
- No mesmo Script, definir self-switch A, apagar o evento 31 ainda no frame
  corrente e remover apenas o balão cujo alvo é o evento 30 cobre três riscos
  distintos: reentrada futura, nova solicitação antes do refresh e persistência
  visual já ativa.
- `GraphicChange` é a operação adequada para mudanças de expressão de um busto
  já presente; `Exit` seguido de `Enter` é redundante no trecho anterior a
  “Hum...” e cria o flicker que a demanda pretende eliminar.
- Com Rheed em Position 9 e a criança em Position 1, ambos com `HorzMirror:
  Auto`, a configuração local produz a composição face a face pretendida. O
  resultado visual ainda depende de Playtest.
- Inserir a criança e sua fala antes de `OpenVisualChoice` e do único
  `code 102` garante que a participação ocorra em todas as rotas, sem duplicar a
  entrada dentro das branches.

### Hypotheses

- A fala reversível recomendada `Dulgarin...?` é curta, reage imediatamente a
  Rheed e não introduz lore nem consequência. Status: suficiente para planejar;
  validar voz, pontuação e leitura em revisão humana/Playtest.
- A execução do Script logo após a mensagem produzirá desaparecimento
  perceptivelmente imediato do balão, sem um frame residual visível. Status:
  suportado pela ordem das APIs locais, mas somente captura em Playtest pode
  confirmar timing perceptível.
- `Auto`, e não `Auto-Reverse`, produzirá a orientação visual pretendida para
  ambos os sprites reais. Status: suportado pelos parâmetros locais e pelo
  contrato do plugin; validar sprites e enquadramento no jogo.

### Open Questions

- `none` para o human decision preflight.
- Itens não bloqueantes para validar depois: redação/pontuação final de
  `Dulgarin...?`, timing perceptivelmente instantâneo do balão e composição
  face a face sem flicker ou resíduos.

## Affected Surfaces

### Runtime, Engine or Framework

- `frontend/data/Map022.json` → eventos 30/31.
- `frontend/data/Map046.json` → evento 1, página 1.
- RPG Maker MZ event interpreter e refresh de páginas.
- Sprite de balão no `Spriteset_Map`.
- `VisuMZ_2_VNPictureBusts` ativo v1.03.

### Integration Points

- RPG Maker MZ `code 213` (Show Balloon Icon) e `code 355` (Script).
- `$gameSelfSwitches.setValue`, `$gameMap.mapId()`, `$gameMap.eraseEvent(31)` e
  `$gameMap.event(30)`.
- `SceneManager._scene._spriteset`, `_balloonSprites`, `targetObject` e
  `Spriteset_Map.removeBalloon`.
- Comandos de plugin `Enter`, `Exit`, `GraphicChange`, `Mirror`/`HorzMirror` e
  `OpenVisualChoice`.
- Grupo de escolhas `code 102`/`402`/`404`, `code 320` (Change Name) e
  `code 303` (Name Input Processing).

### State and Data Contracts

- Self-switch A pertence ao evento 31 do mapa corrente e passa a selecionar a
  página 2 vazia. A condition de variável 26 da página 2 deve ser removida, não
  combinada ao self-switch.
- Página 1 do evento 31 deve continuar contendo exatamente um
  `code 213 [30,1,true]`.
- Nenhuma nova escrita nas variáveis 26 ou 106 e nenhuma alteração na quest ou
  em `QuestTransition`.
- Picture ID 1 permanece Rheed; Picture ID 2 permanece a criança.
- Asset base legado de Rheed permanece `Reed final.png`; expressões preservam
  nomes/case existentes. Assets da criança permanecem `CriancaOrc_.png` e
  `CriancaOrc_VN046_Surpresa.png`.
- Todos os `Enter` cobertos de Rheed usam Position 9 + `HorzMirror: Auto`; todos
  os `Enter` cobertos da criança usam Position 1 + `HorzMirror: Auto`.
- O grupo de escolhas preserva parâmetros exatos
  `[[qualSeuNome1,qualSeuNome2],1,0,2,0]`, ordem das branches, indents,
  ausência de `403`, um `404`, `code 320 [1,'Dulgarin']` e
  `code 303 [1,8]`.

## Research Gate

**Decision:** performed
**Reason:** a análise depende do contrato atual de um plugin externo; a
pesquisa oficial confirma capacidades e semântica upstream, enquanto o plugin
e sua configuração locais continuam sendo a autoridade sobre o estado do
projeto.

| Source | Finding | Impact |
| --- | --- | --- |
| [Visual Novel Picture Busts — página oficial](https://visustellamz.itch.io/visual-novel-picture-busts) | Versão 1.03 e capacidades de Enter/Exit, Graphic Change, Mirror e posições | Confirma que a proposta usa capacidades suportadas, sem justificar um plugin novo |
| [Visual Novel Picture Busts — wiki oficial vinculada](https://www.yanfly.moe/wiki/Visual_Novel_Picture_Busts_VisuStella_MZ) | Posições 0–10, centro em 5, posição 8 próxima a 3/4; `GraphicChange` preserva propriedades; comandos documentados | Sustenta continuidade por GraphicChange e modelo de posições; parâmetros concretos continuam derivados da configuração local |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Local/native approach + Script map-local | Engine local mostra refresh, Script, lista de sprites e remoção seletiva; Map022 já usa evento paralelo | Resolve o estado lógico e o sprite já ativo sem criar dependência nova nem tocar quest | Usa APIs internas de sprite e requer guardas/Playtest | use para Map022 |
| Dependency/plugin/framework | `VisuMZ_2_VNPictureBusts` v1.03 está ativo; Enter/Exit/GraphicChange/Mirror existem; GraphicChange preserva propriedades | Reorganiza staging com o mecanismo já adotado e preserva continuidade/IDs | Orientação `Auto` e composição continuam perceptíveis, não provadas só por estrutura | use para Map046 |
| Custom implementation | Nenhuma insuficiência foi demonstrada nas superfícies existentes | Poderia abstrair comportamento recorrente | Fora do escopo, desproporcional e adicionaria manutenção/plugin/config | reject |
| Defer or block | Fontes locais, pesquisa oficial, decisões e validators são suficientes; gaps restantes são validate-later | Evitaria agir antes de Playtest | Não reduz risco material e posterga correção com plano já executável | reject enquanto fontes e validators permanecerem suficientes |

## Recommendation

Em `Map022`, não vincular o indicador à variável 26 nem à progressão da quest.
Alterar a condition da página 2 do evento 31 para self-switch A do próprio
evento 31. Imediatamente após a mensagem-alvo no evento 30, inserir um único
`code 355` com o seguinte pseudocódigo proposto, preservando a ordem defensiva:

```javascript
(() => {
  if (!$gameMap || !$gameSelfSwitches) return;

  const mapId = $gameMap.mapId();
  $gameSelfSwitches.setValue([mapId, 31, "A"], true);
  $gameMap.eraseEvent(31);

  const scene = SceneManager && SceneManager._scene;
  const spriteset = scene && scene._spriteset;
  const target = $gameMap.event(30);
  if (
    !spriteset ||
    !target ||
    !Array.isArray(spriteset._balloonSprites) ||
    typeof spriteset.removeBalloon !== "function"
  ) return;

  spriteset._balloonSprites.slice().forEach((sprite) => {
    if (sprite && sprite.targetObject === target) {
      spriteset.removeBalloon(sprite);
    }
  });
})();
```

O self-switch torna a página paralela inelegível para novos balões; o
`eraseEvent(31)` impede nova execução ainda no frame corrente; e a iteração
sobre uma cópia de `_balloonSprites` remove somente sprites cujo
`targetObject` é o evento 30. Não escrever variável 26/106 e não alterar
`QuestTransition`. A dependência em APIs internas deve permanecer registrada
como risco e validada por inspeção estática mais Playtest.

Em `Map046`, evento 1, página 1, aplicar a seguinte transformação estrutural:

1. Mudar o `Enter` inicial de Rheed, Picture ID 1, para Position 9 e
   `HorzMirror: Auto`, preservando o asset associado à entrada.
2. Antes de “Hum...”, remover o par `Exit` + `Enter` do ID 1 e conservar o
   `GraphicChange` para `Rheed_VN046_Pensativo.png`. Rheed permanece na tela,
   na posição 9 e com as propriedades já estabelecidas.
3. Depois de “Hum...”, remover o `Exit` do ID 1.
4. Antes de `OpenVisualChoice` e do `code 102`, inserir, nesta ordem: `Enter` da
   criança, Picture ID 2, asset neutro `CriancaOrc_.png`, Position 1,
   `HorzMirror: Auto`; switch 44 (`Fala-ID2`) ON; e `Show Text` curto recomendado
   `Dulgarin...?`. Rheed e a criança devem continuar visíveis quando as escolhas
   abrirem.
5. Na primeira branch, preservar `code 320 [1,'Dulgarin']`; substituir o
   `Enter` redundante de Rheed por `GraphicChange` para o asset base
   `Reed final.png` (ou remover o Enter se o GraphicChange base adjacente já
   cumprir essa transição); remover o `Enter` redundante da criança e preservar
   suas trocas `GraphicChange` surpresa/base. Encerrar a branch com cleanup dos
   Pictures 1 e 2, sem resíduo.
6. Na segunda branch, remover o `Enter` redundante da criança; preservar sua
   fala e seu `Exit`; preservar `code 303 [1,8]`; substituir o `Enter` redundante
   de Rheed por `GraphicChange` para `Reed final.png`; preservar o `Exit` de
   Rheed.
7. Após `code 404`, o `Enter` de Rheed continua necessário porque as duas
   branches já fizeram cleanup. Configurá-lo com Picture ID 1, Position 9 e
   `HorzMirror: Auto`.
8. Normalizar todos os demais `Enter` cobertos de Rheed/criança exclusivamente
   para Position 9/1 e `HorzMirror: Auto`, respectivamente. Não trocar `Auto`
   por `Auto-Reverse` sem nova evidência e Playtest.

Preservar exatamente os parâmetros do `Show Choices`, os dois `code 402` na
ordem atual, a ausência de `code 403`, o único `code 404`, os indents,
`code 320`, `code 303`, mensagens, efeitos e switches existentes, salvo a nova
fala/switch pré-choice e as mudanças de apresentação explicitamente listadas.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Drift das APIs internas `_balloonSprites`, `targetObject` ou `removeBalloon` | Engine local fornece essas superfícies, mas elas não são contrato estável de plugin | Precondition/hash, guards, inspeção da API antes de escrever e Playtest com balão ativo | technical implementer + validator + Playtest |
| Nova solicitação no frame corrente se `eraseEvent(31)` for omitido ou atrasado | Página paralela reinicia e self-switch apenas solicita refresh | Preservar ordem set self-switch → erase event → remoção seletiva | parser/inspeção estruturada |
| Página 2 manter variável 26 ou combinar condition incorreta | Estado atual usa variável 26 sem writer local | Exigir self-switch A e desabilitar condition da variável nessa página | validator de conditions |
| Seletores por índice ficarem obsoletos após reflow | Listas de comandos mudam de offset com inserções/remoções | Seletores estáveis por mapa/evento/página/mensagem/comando/labels, contagens e writer de unidade exata | mutator estruturado |
| `Auto` resultar diferente da composição esperada | InvertedScale local e sprites reais determinam percepção | Validar Position 9/1 + Auto e gravar vídeo face a face; não usar Auto-Reverse por suposição | Playtest humano |
| `Enter` duplicado da criança após a inserção pré-choice | Criança entra atualmente dentro das branches | Contar Enter por ID/contexto e remover os redundantes cobertos | validator semântico |
| Cleanup incompleto deixar busto residual | Ambos ficam visíveis no início das escolhas e branches terminam de formas diferentes | Validar cleanup de IDs 1/2 em ambas as rotas e estado após `404` | Playtest rotas 1/2/cancel |
| Asset renomeado ou case alterado | `Rheed` canônico diverge do filename legado | Preservar `Reed final.png` e validar seis assets 6/6 com case exato | asset validator |
| Deriva na semântica da escolha | Reordenação ocorre perto de `102/402/404`; cancelType 1 aponta para opção 2 | Comparar payload exato, ordem, indents, counts, `320` e `303` antes/depois | parser estrutural |
| Alegação prematura de runtime válido | JSON válido não prova timing, orientação ou flicker | Manter `runtime_pending` até matriz de Playtest com captura/vídeo | human-validation gate |

## Validators

- Baseline já registrado: parse de `Map022`, `Map046`, `System` e `MapInfos` =
  pass; envelope/config extraction de `plugins.js` = pass; assets = 6/6; runtime
  = pending.
- Antes da escrita futura, fazer parse estruturado e localizar por seletores
  estáveis: mapa, event ID, page, texto âncora, command code/plugin command e
  choice labels. Não depender de índices absolutos da lista.
- Registrar contagens esperadas, hash/precondition dos trechos alvo e abortar
  se divergirem. Aplicar writer de unidade exata; se o mutator for rerunnable,
  exigir replay idempotente.
- Após a escrita, fazer parse dos dois JSONs, diff restrito e inspeção de reflow.
  Somente `Map022` e `Map046` podem mudar; `Map004` deve permanecer unchanged e
  não pode haver escrita fora dos dois alvos.
- `Map022`: página 2 do evento 31 usa self-switch A, sem condition de variável
  26; não surgem writes em variável 26/106; o `code 355` usa IDs exatos 31 e 30,
  contém null/type guards, chama `setValue`, `eraseEvent` e remoção seletiva; a
  página 1 continua com exatamente um `code 213 [30,1,true]`.
- `Map046`: existe exatamente um `code 102` com
  `[[qualSeuNome1,qualSeuNome2],1,0,2,0]`, dois `code 402` na ordem existente,
  nenhum `code 403`, um `code 404`; indents válidos; `code 320 [1,'Dulgarin']`
  e `code 303 [1,8]` preservados.
- Confirmar ausência de `Exit` + `Enter` do ID 1 antes de “Hum...”; Enter da
  criança + switch 44 + linha curta aparecem antes de `OpenVisualChoice` e
  `code 102`; ambos os bustos estão logicamente presentes ao abrir escolhas.
- Confirmar invariantes de plugin commands: Rheed = ID 1/Position 9/Auto;
  criança = ID 2/Position 1/Auto; assets/case corretos; `GraphicChange` em vez de
  Enter redundante; cleanup em ambas as branches; Enter pós-`404` preservado; o
  plugin permanece ativo.
- Revalidar os seis assets e o envelope/configuração do plugin após a mudança,
  ainda que não sejam alvos de escrita.
- Não aceitar parse simples como validação semântica ou perceptível.

## Human Gates

- Playtest obrigatório de `Map022` com o balão já ativo quando a mensagem-alvo
  termina; confirmar desaparecimento imediato e ausência de nova solicitação.
- Playtest de `Map046` na rota 1, rota 2 e via cancelamento. O cancelamento deve
  continuar roteando para a segunda opção.
- Registrar vídeo ou capturas que mostrem: Rheed à direita, criança à esquerda
  voltada para a direita, composição face a face, ausência de `Exit`/`Enter`
  perceptível antes de “Hum...”, ausência de flicker e ausência de bustos
  residuais após cleanup.
- Validar depois a naturalidade e pontuação de `Dulgarin...?`, o timing do
  balão e a leitura/composição da cena. Esses itens não bloqueiam o planejamento,
  mas bloqueiam declarar o comportamento perceptível concluído.

## Affected Docs

- Este artefato transitório:
  `planos/004-ambientacao-VN/analise/technical-analysis-sub-demanda1.md`.
- Nenhuma documentação duradoura será escrita por esta análise.
- Gap não bloqueante: `docs/index.xml` não cataloga uma referência específica
  de Show Choices/VNPictureBusts. Encaminhar esse gap ao fluxo documental
  apropriado somente se o orquestrador decidir catalogá-lo; ele não autoriza
  autoedição de `docs/**`.

## Stop Conditions

- Parar se mapas, eventos, páginas, mensagem âncora, plugin commands, choice
  labels ou contagens não corresponderem às preconditions desta análise.
- Parar se `$gameSelfSwitches.setValue`, `$gameMap.eraseEvent`,
  `_balloonSprites`, `targetObject` ou `removeBalloon` não existirem no runtime
  local esperado.
- Parar se `VisuMZ_2_VNPictureBusts` estiver inativo, incompatível com os
  payloads locais ou se algum dos seis assets estiver ausente/case-divergente.
- Parar se o diff incluir `Map004`, qualquer arquivo fora de Map022/Map046,
  outro evento/página não autorizado ou reflow massivo.
- Parar se o grupo de escolhas perder payload, ordem dos `402`, indents,
  ausência de `403`, único `404`, `code 320` ou `code 303`.
- Parar se a implementação exigir escrever variável 26/106, mudar a quest,
  renomear asset, criar plugin ou ampliar o escopo.
- Se Playtest estiver indisponível, a implementação pode no máximo concluir
  validators estáticos e deve permanecer `runtime_pending`; não declarar a
  feature concluída.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** lado/orientação, escopo, IDs, assets e efeitos das escolhas estão
  resolvidos. A fala `Dulgarin...?` é uma decisão reversível de baixo impacto e
  seus aspectos perceptíveis foram classificados como validate-later; não há
  pergunta `must_ask_now` que impeça planejamento e implementação.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** `none`
- **Implementation demand:**
  `planos/004-ambientacao-VN/sub-demanda1-improved.md`
- **Analysis file:**
  `planos/004-ambientacao-VN/analise/technical-analysis-sub-demanda1.md`
- **Inherited restrictions and decisions:** escrever runtime somente em
  `frontend/data/Map022.json` (eventos 30/31) e
  `frontend/data/Map046.json` (evento 1/página 1); `Map004` e todo outro runtime
  são proibidos; não escrever variáveis 26/106 nem alterar quest; preservar
  Rheed/asset legado, IDs 1/2, Position 9/1 + Auto, payload e efeitos das
  escolhas; usar parsing estruturado e writer de unidade exata.
- **Validators and human validation:** aplicar todos os validators estruturais,
  semânticos, de assets/plugin e restricted diff desta análise; depois executar
  a matriz de Playtest Map022 + Map046 rota 1/rota 2/cancel com captura ou vídeo.
- **Required skills:** `loki-implement-feature`, `rpg-maker-mz-data-json` e
  `rpg-maker-mz-visustella-plugin-commands`; reutilizar o inventário já
  confirmado e rerodar `rpg-maker-mz-project-inventory` somente se o estado
  estrutural/configuração divergir.
- **Downstream execution profile:** `model_class: frontier_reasoning`,
  `execution_effort: high`, `recommended_handoffs: {research: none, execution:
  loki-implement-feature}`, `validator_effort: high`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "ready"
  sources_read:
    - "planos/004-ambientacao-VN/sub-demanda1-improved.md"
    - "planos/004-ambientacao-VN/backlog.md"
    - "planos/004-ambientacao-VN/evidence/decision-naming.xml"
    - "frontend/data/Map022.json#event30-page1,event31-pages1-2"
    - "frontend/data/Map046.json#event1-page1"
    - "frontend/data/System.json"
    - "frontend/data/CoretoQuests.json#noite-da-historia"
    - "frontend/js/plugins/Coreto_QuestCore.js"
    - "frontend/js/plugins.js"
    - "frontend/js/plugins/VisuMZ_2_VNPictureBusts.js#header"
    - "frontend/js/rmmz_objects.js"
    - "frontend/js/rmmz_sprites.js"
    - "docs/index.xml"
    - "docs/technology-context.md"
    - "docs/domains/game-business-analyst/README.md"
    - "docs/domains/scene-presentation-designer/README.md"
    - "https://visustellamz.itch.io/visual-novel-picture-busts"
    - "https://www.yanfly.moe/wiki/Visual_Novel_Picture_Busts_VisuStella_MZ"
  human_decision_preflight_required: "false"
  pending_questions: []
  implementation_demand_ref: "planos/004-ambientacao-VN/sub-demanda1-improved.md"
  analysis_file: "planos/004-ambientacao-VN/analise/technical-analysis-sub-demanda1.md"
  inherited_restrictions:
    - "Runtime writes only in Map022 events 30/31 and Map046 event1/page1"
    - "Map004 and all other runtime surfaces forbidden"
    - "No variable26/106 or QuestTransition changes"
    - "Preserve choices, IDs, assets and approved side/orientation decisions"
    - "Perceptible behavior remains runtime_pending until human Playtest"
  recommended_next_command: "loki-implement-feature"
  next_action: "Run loki-implement-feature with the demand and analysis_file locators above."
  blocked_by: []
```
