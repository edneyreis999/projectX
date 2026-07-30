---
title: "Retrospectiva técnica — Cena Coreto EX/VN"
type: loki-technical-retrospective
capture_id: retro-001-coreto-ex-vn-2026-07-28
status: completed
created: "2026-07-28"
scope: "planos/001-cena-coreto-nova-arquitetura, fases 1 e 2, incluindo a correção de reentrada do EV030"
run_id: "loki-run-v2:86550d0a2c2b24415570cf9599eeed021f6cd88b7a3fd0e51a014839fb5274f1"
execution_id: "loki-execution-v2:d00981de73a3d0fbd4fa7be081b5e8ae6e7292ef6de06afe9214b7f39bbdbe2c"
---

# Retrospectiva técnica — Cena Coreto EX/VN

## Status

**completed**. As duas tasks foram concluídas funcionalmente: a implementação e a última correção são observáveis, os validators estáticos das fases 1 e 2 passam e os gates humanos de Plugin Manager e Playtest New Game foram reportados como `PASS` e persistidos nesta retrospectiva. O run Loki antigo continua administrativamente inconsistente — sem completion records, `result-v3.yaml`, dashboard ou pacote de consistência, e com plano/tasks ainda marcados como `running`/`pending` — portanto esta conclusão não reivindica um resultado formal `result-v3` para aquele run.

## Resumo

O trabalho substituiu o fluxo monolítico da Noite da História por `Map022/EX → Map046/VN → Map022/EX → Map045`, com `Coreto_QuestCore` como autoridade canônica, `PKD_SimpleQuestSystem` como projeção e V106 como estágio dedicado. A implementação principal foi registrada em `72efec37f81db446a00b4315ee6d1d47109f8e4e`; commits imediatamente posteriores materializaram mapas referenciados, restauraram recursos necessários e atualizaram metadados do editor.

A correção atual altera `Map022` em dois pontos observáveis: protege `START` no EV030 com `V106 == 0` e remove do EV018 um `PlayerMovementChange(false)` redundante ao lock de `Coreto_Cutscene`. `fix-ev030-reentry.mjs` registra e valida a primeira parte. O validador original não inspecionava EV030 nem proibia o lock redundante; após o Playtest, ele foi ampliado para cobrir as duas invariantes e rejeitou fixtures negativas de regressão.

Critério de conclusão: implementação e correção analisadas, validators estáticos aprovados, validação humana concluída e riscos residuais catalogados. Não resta trabalho funcional obrigatório no escopo das duas tasks.

## Artefatos

### Planejamento e contexto consultados

- `demanda-improved.md`: contrato, invariantes e aceite.
- `analise-tecnica.md`: evidências, decisões e riscos pré-implementação.
- `tasks.md`, `task-1.1.md` e `task-2.1.md`: DAG, targets, validators e gates.
- `interaction/inputs/execution-input-v2.yaml` e o preflight do `technical-implementer`: identidade e limites do writer.

### Task 1.1 — Adaptador PKD e registro canônico

- `frontend/js/plugins/Coreto_QuestCore.js`: backend SQSM, validação explícita da API PKD, projeção idempotente, transições canônicas e rollback em falha.
- `frontend/data/CoretoQuests.json`: quest `noite-da-historia`, V106, estados `0/10/20/90`, transições `START`, `COMPLETE_VN`, `ARRIVE_MAP045` e entrada `CENA_PRINCIPAL`.
- `frontend/data/System.json`: V106 nomeada `v_qNoiteDaHistoria_stage`.
- `frontend/js/plugins.js`: uma entrada ativa de PKD e cadeia `Coreto_QuestCore → Coreto_QuestVN → Coreto_Cutscene`.
- `Coreto_QuestVN.js` e `Coreto_Cutscene.js`: incluídos no commit e usados pela rota, embora fora dos targets exatos da task 1.1.

### Task 2.1 — Migração EX/VN

- `Map022.json`: tag EX; EV030 ligado a `START`; EV018 faz staging e `EnterVisualNovel`; EV017 transiciona, libera a cutscene e transfere uma vez para Map045 `(2,4)`.
- `Map046.json`: tag VN; um evento de diálogo, escolha e Name Input; começa por assertions, termina por `COMPLETE_VN` e `FinishVisualNovel`; sem transferência direta.
- `Map045.json`: tag EX; chegada condicionada a V106 = 90, preservando V29 posterior.
- `MapInfos.json`: mapas materializados/reorganizados no editor; não constava no `scoped_write` das tasks.
- `builds/fase2/apply-migration.mjs`: migração e ordem terminal `QuestTransition → FinishCutscene → Transfer Player`.
- `builds/fase2/validate-route.mjs`: topologia EX/VN, chegada, guard exato `V106 == 0` no EV030 e ownership do lock no EV018.
- `builds/fase2/fix-ev030-reentry.mjs`: fix idempotente com identidade, forma esperada, hash pré-write, CRLF e parse pós-write.
- `builds/fase1/validate-architecture.mjs`: envelope/configuração de plugins, registry/V106, projeção PKD, backend SQSM, namespace Coreto, idempotência e busca global de writers diretos.

### Commits observados

- `72efec3`: implementação principal.
- `b3e3706`: inclusão de Map032, Map039 e Map044 referenciados.
- `0af01d2`: restauração de seis recursos de personagens/tilesets e ajuste de `System.json`.
- `da45527`: atualização de metadados do `MapInfos.json`.

Os três commits adjacentes são temporalmente ligados à feature, mas não existe completion record que prove a necessidade de cada arquivo. Eles não constituem aceite automático da rota.

## Evidências e validadores

### Executados nesta retrospectiva

- `node --check` passou nos três plugins Coreto e três scripts de `builds/fase2`.
- Parse JSON passou para registry, Maps 022/045/046, MapInfos e System.
- `node builds/fase2/validate-route.mjs`: `route static validation passed`.
- Check arquitetural read-only: estados `0/10/20/90`, três transições fechadas, entrada `CENA_PRINCIPAL`, V106 nomeada, backend SQSM, ausência de dependência de `VisuMZ_2_QuestSystem` e plugins ativos/ordenados.
- Varredura estrutural: nenhum comando de evento escreve V106 diretamente.
- Check da correção: uma única `START`, dentro de `V106 == 0`, seguida de `Branch End`.
- Diff atual: `PlayerMovementChange(false)` removido do EV018.
- Validator ampliado passou no estado real e rejeitou duas fixtures em memória: guard alterado para V105 e reintrodução de `PlayerMovementChange(false)`.
- Validator da fase 1 passou com estados `0/10/20/90`, transições fechadas, quest PKD com duas tarefas, plugins ativos nas posições 42/50/51/52, backend SQSM, namespace preservado e zero writers diretos de V106.
- Validator da fase 1 rejeitou fixtures de V106 mal nomeada, PKD duplicado, ordem Coreto incorreta, namespace substituído e writer direto de V106.
- Validator oficial do envelope retornou `editor-structural: valid; plugin_objects=65`; `node --check` do QuestCore passou.

### Validação humana executada

Fonte: resultados informados diretamente pelo responsável humano durante a sessão de validação em 2026-07-28. O registro é uma síntese sanitizada; não há captura de tela, vídeo ou log externo anexado.

| Cenário | Resultado | Evidência observada/reportada |
| --- | --- | --- |
| Plugin Manager | PASS | Uma entrada ativa de PKD; três plugins Coreto ativos e ordenados; configuração preservada após salvar, fechar e reabrir o editor. |
| Boot New Game | PASS | Map022 carregou sem erro, com movimento normal. |
| Início da quest | PASS | EV030 executou sem diagnóstico e V106 avançou de 0 para 10. |
| Projeção PKD em 10 | PASS | Quest visível; primeira tarefa concluída; segunda visível e pendente. |
| Entrada EX/VN | PASS | EV018 fez staging e iniciou Map046 automaticamente, sem erro. |
| Primeiro ramo VN | PASS | Ramo de confirmação executou, sem Name Input e com continuação narrativa. |
| Segundo ramo VN | PASS | Name Input abriu, aceitou nome e Rheed utilizou o nome informado. |
| Terminal da rota | PASS | Retorno ao Map022, névoa, transferência ao Map045, V106 = 90 e quest concluída sem duplicação. |
| Reentrada EV030 | PASS | Segunda interação terminou sem `INVALID_TRANSITION`; V106 permaneceu em 10. |
| Save/load intermediário | PASS | Save em V106 = 10 recarregou Map022 com movimento normal; rota prosseguiu até V106 = 90. |
| Save/load terminal | PASS | Save em Map045 recarregou com V106 = 90, quest concluída, movimento, menu e save normais. |
| Restauração visual/sonora | PASS | Sem retratos, névoa, transparência ou áudio presos; followers e controles normais. |
| Continuidade Map045 | PASS | V29 = 2; quest “A Semifinal” ativa com primeira tarefa disponível. |
| Console runtime | PASS | Nenhum erro vermelho após a rota completa. |

### Ausentes ou inconclusivos

- `builds/result-v3.yaml`, `dashboard-v3.md` e `consistency-v2.yaml` não existem.
- `terminal_evidence_refs`, completion records e auditoria terminal estão ausentes.
- A evidência humana está persistida como relato estruturado nesta retrospectiva, sem screenshots, vídeo ou export de console anexados.

## Decisões humanas

- PKD como backend; sem `VisuMZ_2_QuestSystem`.
- QuestCore como autoridade única e PKD como projeção.
- `questKey = noite-da-historia`, estado inicial `0`, grafia `Rheed`.
- V106 dedicada; V26, V29 e V100 preservadas.
- Map046 é VN; Map022/045 são EX; suporte New Game only.
- Correção: `START` somente no estado inicial e sem lock de movimento paralelo ao Coreto.

## Rastro operacional material

1. Demanda e análise fecharam backend, autoridade, mapa VN, grafia e saves.
2. Plano dividiu registry/backend e rota EX/VN, adotando V106 e `0/10/20/90`.
3. Preflight definiu targets, validators e gates humanos.
4. Migração criou registry, adaptou QuestCore, consolidou plugins e materializou eventos/mapas.
5. `72efec3` registrou a feature; três commits adjacentes trataram mapas, assets e editor.
6. O validador aprovou a rota principal, mas não inspecionou EV030.
7. A correção guardou `START` e removeu o lock redundante; checks atuais passaram.

## Atritos de execução

### 1. `inference-missing` / `validation-friction`

- **What Happened:** o validador verifica EV018, Map046/E1, EV017 e Map045/E11, mas não EV030 nem locks paralelos.
- **Expected Behavior:** cobrir entrada/reentrada e ownership de locks.
- **Actual Behavior:** passava com `START` incondicional e `PlayerMovementChange(false)` redundante.
- **Context:** RPG Maker MZ, Map022, task-2.1.
- **Evidence:** `72efec3`, diff atual, `validate-route.mjs`, `fix-ev030-reentry.mjs`.
- **Cause:** confirmada — invariantes ausentes do validator.
- **Resolution Or Outcome:** dados corrigidos, Playtest em `PASS` e validator persistido ampliado; fixtures negativas das duas regressões foram rejeitadas.
- **Was Useful:** parcialmente.
- **Waste Impact:** medium.
- **Reuse Guidance:** validar todo evento que inicia transição.
- **Avoid Next Time:** derivar checks de reentrada e lock antes do Playtest.
- **Minimum Next Step:** manter o validator ampliado na mesma unidade de commit da correção.

### 2. `user-correction`

- **What Happened:** revisão posterior identificou reexecução de `START` fora do estado inicial e lock paralelo no EV018.
- **Expected Behavior:** `START` somente em V106 = 0; mesmo owner adquire e restaura o lock.
- **Actual Behavior:** versão commitada tinha transição incondicional e segundo comando de bloqueio.
- **Context:** correção não commitada de `Map022.json`.
- **Evidence:** diff contra HEAD e script de fix.
- **Cause:** primeira causa confirmada; lock redundante provavelmente veio da preservação de comando legado.
- **Resolution Or Outcome:** guard aplicado, lock removido, checks estáticos passam.
- **Was Useful:** sim.
- **Waste Impact:** medium.
- **Reuse Guidance:** transformar reentrada e lock em aceite verificável.
- **Avoid Next Time:** incluir segunda interação na matriz inicial.
- **Minimum Next Step:** manter o cenário de reentrada no validator e no completion record.

### 3. `state-friction` / `handoff-friction`

- **What Happened:** implementação existe, mas plano/tasks seguem `running/pending` e os resultados referenciados estão ausentes.
- **Expected Behavior:** cada task publica validação, arquivos, riscos e estado terminal.
- **Actual Behavior:** Git demonstra produção; plano permanece pré-dispatch.
- **Context:** `loki-run-v2:86550...`.
- **Evidence:** resume states e paths ausentes.
- **Cause:** desconhecida; sem completion record.
- **Resolution Or Outcome:** lacuna preservada; retrospectiva não reescreve o histórico.
- **Was Useful:** não.
- **Waste Impact:** medium.
- **Reuse Guidance:** reconciliar task no mesmo ciclo do validator.
- **Avoid Next Time:** não encerrar runtime sem checkpoint do plano.
- **Minimum Next Step:** publicar evidência terminal após os gates.

### 4. `scope-waste` / `state-friction`

- **What Happened:** commit principal incluiu MapInfos, QuestVN e Cutscene fora dos targets; commits adjacentes adicionaram três mapas e seis assets.
- **Expected Behavior:** envelope lista todas as superfícies necessárias.
- **Actual Behavior:** mudanças de integridade/editor ultrapassaram o scoped write.
- **Context:** materialização de mapas e arquivos ausentes do Git.
- **Evidence:** task target lists e quatro commits observados.
- **Cause:** parcial; MapInfos referencia mapas materializados, mas a necessidade de cada asset não está registrada.
- **Resolution Or Outcome:** arquivos versionados; escopo não reconciliado.
- **Was Useful:** parcialmente.
- **Waste Impact:** high pelo volume fora do envelope, sem métrica inventada.
- **Reuse Guidance:** inventariar mapas/assets não versionados no preflight.
- **Avoid Next Time:** separar commit funcional de recuperação de dados.
- **Minimum Next Step:** revisar commits adjacentes antes do merge.

### 5. `format-friction`

- **What Happened:** JSONs grandes foram serializados integralmente; Git alerta LF/CRLF; o fix impõe CRLF e hash.
- **Expected Behavior:** diff mínimo e serialização estável.
- **Actual Behavior:** arquivos grandes e warnings de line ending.
- **Context:** dados MZ editados por script/editor Windows.
- **Evidence:** stats, warnings e `serialize` do fix.
- **Cause:** arquivos antes ausentes do índice, editor e CRLF.
- **Resolution Or Outcome:** fix idempotente; política global não resolvida.
- **Was Useful:** parcialmente.
- **Waste Impact:** low.
- **Reuse Guidance:** checar bytes/BOM/line endings no preflight.
- **Avoid Next Time:** separar normalização de correção lógica.
- **Minimum Next Step:** `git diff --check` e revisão semântica.

## Caminho mínimo recomendado

1. Isolar Map022, script de fix, validator ampliado e retrospectiva; excluir saves/metadados alheios.
2. Preservar os resultados dos validators das fases 1 e 2 e o registro `PASS` do Plugin Manager/Playtest no completion record.
3. Publicar completion records/result/dashboard e só então reconciliar tasks/plano.
4. Separar dependências reais dos commits adjacentes de alterações editoriais.

## Aprendizados e candidatos

### Validados

- Registry fecha `0 → 10 → 20 → 90`; não há writers diretos de V106 em eventos.
- Projeção PKD evita repetir operações já refletidas pelo backend.
- Rota VN possui assertions, saída explícita e nenhuma transferência direta.
- Guardar `START` por V106 = 0 resolve a transição inválida observável sem alterar o conteúdo anterior do EV030.
- Locks temporários precisam de owner único; comando legado ao lado de Coreto enfraquece restauração determinística.

### Hipóteses e limites

- Causalidade entre a feature e todos os mapas/assets adjacentes não está provada.
- A correção passou no Playtest e agora possui proteção estática contra regressão; cobertura de outras variações de evento permanece limitada ao contrato atual.
- Equivalência de narrativa, câmera, áudio, party, save/load e locks não decorre dos checks atuais.

### Candidatos especializados de inferência

```yaml
analytic_inference_candidates:
  - schema_version: 1
    candidate_id: ai-7b5b923e0aed117f8a0bbad0
    candidate_type: analytic-inference
    observation_type: inference-missing
    status: unreviewed
    capture_id: retro-001-coreto-ex-vn-2026-07-28
    source:
      retrospective_locator: retrospetivas/fase2/retrospectiva-fase2-cena-coreto-nova-arquitetura.md
      consumer_root:
        canonical: E:/Projetos/projectX
        resolution_source: canonical-pwd
        state_root: E:/Projetos/projectX/.loki/analytic-inference/v2
    lineage:
      run_id: loki-run-v2:86550d0a2c2b24415570cf9599eeed021f6cd88b7a3fd0e51a014839fb5274f1
      phase: fase2
      task_id: task-2.1
      agent_run_id: unavailable
      handoff_id: unavailable
      evidence_id: unavailable
    statement_or_testable_question: "O validador de rota da cena Coreto deve verificar que EV030 executa START somente quando V106 == 0 e que o lock físico não é duplicado fora de Coreto_Cutscene."
    observation:
      expected: not-applicable
      actual: not-applicable
      missing_opportunity: "Derivar checks de reentrada e ownership de lock junto das transições e do staging físico."
    applicability:
      technologies: [RPG Maker MZ, JavaScript, Coreto_QuestCore, Coreto_Cutscene]
      versions: []
      surfaces: [frontend/data/Map022.json, validate-route.mjs]
      objectives: [validar reentrada, prevenir transição inválida, garantir restauração de lock]
      signals: [evento reutilizável inicia transição, lock de plugin coexistindo com comando legado]
      exclusions: [eventos sem reentrada, fluxos sem estado canônico ou lock temporário]
    provenance:
      source_refs:
        - planos/001-cena-coreto-nova-arquitetura/task-2.1.md
        - planos/001-cena-coreto-nova-arquitetura/builds/fase2/validate-route.mjs
        - planos/001-cena-coreto-nova-arquitetura/builds/fase2/fix-ev030-reentry.mjs
        - frontend/data/Map022.json
      evidence_refs:
        - commit:72efec37f81db446a00b4315ee6d1d47109f8e4e
        - working-tree:frontend/data/Map022.json
      freshness: current
    evidence_classification:
      facts:
        - "O validator original não selecionava EV030."
        - "A feature tinha START incondicional e PlayerMovementChange(false) no EV018."
        - "O estado atual contém o guard e remove o comando redundante."
        - "O Playtest humano repetiu EV030 sem INVALID_TRANSITION, manteve V106 em 10 e concluiu a rota com controles restaurados."
        - "O validator ampliado rejeita guard divergente de V106 == 0 e reintrodução do lock VisuStella no EV018."
      inferences:
        - "Cobrir reentrada e ownership de lock reduz repetição da correção."
      hypotheses:
        - "O Playtest aprovado é evidência de funcionamento atual, mas não prova que toda futura regressão será detectada."
    validation:
      state: validated
      validator_refs:
        - node planos/001-cena-coreto-nova-arquitetura/builds/fase2/validate-route.mjs
        - check read-only do guard EV030 em 2026-07-28
      reason: "Lacuna histórica comprovada, correção aprovada em Playtest e invariantes codificadas no validator persistido com fixtures negativas rejeitadas."
    investigation:
      confirm_or_reject_evidence:
        - "Validator persistido falha quando o guard é removido ou o lock retorna."
        - "Playtest de segunda interação não gera transição inválida nem lock preso."
      potential_impact: "Evitar reentrada inválida e restauração concorrente de movimento."
      cost: unknown
      stop_condition: "Checks persistidos e Playtest de reentrada passam."
      suggested_capabilities: [technical-implementer, runtime-qa]
    distinction:
      exact_duplicate_hints: []
      near_duplicate_hints: [rpg-maker-event-reentry-guard, cutscene-lock-single-owner]
      distinction_reason: "Específico à cobertura conjunta de transição e lock na rota Coreto; catálogo não consultado."
    guidance:
      reuse: "Para cada transição iniciada por evento reutilizável, testar estado inicial, reentrada e owner único dos locks."
      avoid: "Não considerar a rota coberta apenas porque VN e terminal passam."
    downstream:
      owner: loki-continuous-improvement
      eligible_for_ci_evaluation: true
      durable_mutation_authorized: false
```

- **Validação dos candidatos:** ID SHA-256 do tuple canônico `capture_id + observation_type + statement + retrospective_locator`; schema revisado.
- **Lineage indisponível:** agent run, handoff e evidence IDs por ausência de completion record.
- **Consumer/state root provenance:** `E:/Projetos/projectX`, `canonical-pwd`; state root derivado, não lido/escrito.
- **Gates downstream:** Playtest concluído em `PASS`; revisão por `loki-continuous-improvement` continua opcional e não iniciada.
- **Catálogo escrito/promovido/pontuado/reorganizado/purgado:** false.
- **Route permitido:** `loki-continuous-improvement`; nenhuma promoção automática.

## Handoffs, gates e approvals

- Escrita direta por `/root`: não há Write Agent disponível com autoridade para este Markdown transitório do consumidor. Envelope limitado a este target; runtime, contexto duradouro e catálogo não foram alterados.
- Preflight do `technical-implementer` existe; completion record não.
- Gates humanos concluídos: Plugin Manager e Playtest New Game/reentrada/save-load/locks/áudio/continuidade em `PASS`.
- Nenhuma promoção duradoura foi aprovada ou aplicada.

## Riscos residuais e limitações

- Correção, validators, script e retrospectiva ainda não estão em commit isolado; o worktree contém várias outras alterações e saves.
- O restante do EV030 continua reproduzível por decisão observada no Playtest; o guard impede apenas nova transição `START`.
- O run Loki antigo não possui completion records/result/dashboard válidos e não deve ser usado como autoridade terminal, embora a conclusão funcional das tasks esteja sustentada pelas evidências desta retrospectiva.
- A validação humana está persistida somente como relato estruturado, sem anexos externos reproduzíveis.

## Próximos passos

- **manutenção, opcional:** preparar commit isolado para a correção, validators, script e retrospectiva, evitando misturar os demais saves do worktree.
- **runtime-qa/humano, opcional:** anexar captura/log somente se o processo de release exigir evidência independente.
- **orquestrador, opcional:** iniciar uma execução Loki limpa caso ainda seja necessário produzir completion records/result/dashboard formais; não reconciliar retroativamente o run inválido com evidência inventada.
- **loki-continuous-improvement, opcional:** avaliar `ai-7b5b923e0aed117f8a0bbad0`; sem promoção implícita.

## Resume state

Escopo concluído: plano 001, fases 1 e 2. Feature em `72efec3`; ajustes adjacentes em `b3e3706`, `0af01d2`, `da45527`. Validators das fases 1 e 2 passam e rejeitam fixtures negativas de arquitetura, guard e lock. Plugin Manager, rota principal, dois ramos VN, reentrada, save/load, restauração, continuidade Map045 e console passaram na validação humana. Correção: `START` sob `V106 == 0` e remoção do lock paralelo do EV018. Não resta trabalho funcional obrigatório. O run formal antigo permanece não reconciliado e não deve ser tratado como autoridade terminal; commit isolado e nova execução formal são opcionais.
