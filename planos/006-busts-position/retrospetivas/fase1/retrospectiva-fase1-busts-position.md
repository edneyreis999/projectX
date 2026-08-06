# Retrospectiva técnica — Fase 1 — Bustos do Map049

## Status

`completed`

A fase e a task 1.1 estão concluídas. O critério terminal é sustentado pelo
resultado `completed`, pelos seis critérios automáticos aprovados no hash atual
do Map049, pelo Playtest humano pós-correção e pelo checkpoint independente
`approved` da iteração 3.

## Resumo

O lifecycle dos bustos de `frontend/data/Map049.json`, Event 1/Page 1, foi
adequado para manter Thorin à esquerda, NPCs à direita, trocar sua expressão
sem reentrada e usar Rheed com `Portraits/Principal/Reed final` no beat final.
A validação estática inicial passou, mas o primeiro Playtest revelou que Mélia
olhava para fora da conversa. A correção restrita para `Auto-Reverse` passou no
novo Playtest. Melhorias manuais posteriores do usuário no mesmo mapa foram
preservadas, separadas da autoria da feature e revalidadas no hash atual
`sha256:252965e40909d8c61adbecacee62264a92e3049e9347c07934c7be02f2754ffa`.

Um replay de auditoria encontrou divergência no checksum canônico do manifesto
histórico da Writer de correção. A evidência inválida foi preservada como
histórico, uma substituta imutável válida foi publicada e a boundary completa
foi reexecutada até o checkpoint aprovado.

## Artefatos

### Criado

- `planos/006-busts-position/retrospetivas/fase1/retrospectiva-fase1-busts-position.md`.

### Produzidos ou alterados pela fase

- `frontend/data/Map049.json`: target de produção da feature; o estado final
  também contém melhorias manuais do usuário, que não são atribuídas à task.
- `planos/006-busts-position/builds/fase1/update-map049-busts.mjs`: mutator
  estruturado, condicionado por hash e consciente do estado terminal.
- `planos/006-busts-position/builds/fase1/validate-map049-busts.mjs`: validador
  determinístico atualizado até a versão 1.2.0.
- Completion records, ciclos de validação, manifestos de evidência, relatórios
  de auditoria, checkpoints e projeções terminais sob o diretório do plano.

### Consultados como fontes principais

- `tasks.md`, `task-1.1.md`, `improved-demand.md` e `technical-analysis.md`.
- `builds/implement-feature-result-v3.json`, `builds/feature-dashboard-v3.md`,
  `builds/consistency-packet-v2.json` e `builds/metrics/execution-metrics.json`.
- Completion records, decisões humanas e proveniência em
  `interaction/fase1/task-1.1/`.
- Validações finais, `checkpoint-v1-3.yaml` e
  `auditor-report-evidence-replay-v1.yaml`.
- `execution-knowledge/entries/capture-map049-busts-run-v2.xml`.

### Preservados ou descartados

- O manifesto antigo de correção com checksum divergente foi preservado como
  evidência histórica e removido somente da coverage ativa; não foi apagado.
- Nenhuma melhoria manual do usuário foi revertida ou atribuída à feature.
- Nenhum runtime, catálogo, documentação duradoura ou arquivo fora do target
  desta retrospectiva foi alterado por este workflow.

## Evidências e validadores

- `map049-user-baseline-validation-primary.json` e
  `map049-user-baseline-validation-final.json`: `passed`, validator 1.2.0,
  AC-MAP049-1 a AC-MAP049-6 aprovados no hash atual.
- `cycle-3-finding.yaml`: `passed`, com proveniência separada das melhorias
  manuais de monstro, Fadeout Screen, parallax e serialização.
- `post-correction-human-validation-v1.yaml`: Playtest `passed`; o usuário
  confirmou Mélia no lado direito olhando para Thorin à esquerda.
- `auditor-report-evidence-replay-v1.yaml`: iteração 3 `approved`, sem findings,
  com replay completo da boundary e validação dos manifestos ativos.
- `checkpoint-v1-3.yaml`: `approved`; todos os gates automáticos, humanos e de
  auditoria estão satisfeitos.
- `implement-feature-result-v3.json`: estado terminal `completed` e task 1.1
  `passed`.
- `execution-metrics.json`: status `partial`; contagens observáveis registram
  6 agentes, 6 handoffs, 6 validators executados, 3 validações repetidas,
  3 replays, 8 gates e 4 reconciliações. Tempos e tokens exatos não estão
  disponíveis, portanto não sustentam alegações quantitativas de eficiência.

Validação estática não substituiu validação perceptível. O Auditor terminal
reutilizou a evidência humana persistida e não refez pessoalmente o Playtest.

## Decisões humanas

- Aplicar a convenção somente ao Map049: Thorin à esquerda e NPCs à direita.
- A fala final é de Rheed e usa `Portraits/Principal/Reed final`.
- Após o primeiro Playtest, alterar somente o mirror da entrada de Mélia para
  `Auto-Reverse` e a continuação `code:657` correspondente.
- Preservar as melhorias manuais do usuário em monstro, Fadeout Screen,
  parallax e serialização, sem atribuí-las à task.
- Aprovar no Playtest final o resultado em que Mélia olha para Thorin.

## Rastro operacional material

1. A demanda e a análise restringiram a mudança a Map049 Event 1/Page 1 e
   definiram lifecycle, posições, assets, cleanup e gate humano.
2. O mutator aplicou a transformação estruturada sob hash e precondições,
   preservou o conteúdo não alvo e convergiu sem mudança no replay terminal.
3. O validator e a primeira auditoria aprovaram a estrutura, mas mantiveram a
   composição e o facing sob responsabilidade do Playtest.
4. O primeiro Playtest reprovou apenas o facing de Mélia. O usuário autorizou a
   correção mínima de `Auto` para `Auto-Reverse`; validator, auditoria e novo
   Playtest passaram.
5. Melhorias manuais do usuário alteraram o hash já coberto. A proveniência foi
   confirmada, o conteúdo foi preservado e a baseline do validator foi
   atualizada sem reexecutar o mutator sobre o arquivo modificado.
6. A auditoria no baseline atual aprovou todos os critérios funcionais, mas
   bloqueou a boundary por checksum canônico divergente no manifesto antigo da
   correção.
7. Uma evidência substituta imutável foi coletada sem tocar no Map049; todos os
   manifestos ativos foram validados e a iteração 3 aprovou o replay integral.

### Scripts, comandos e validators

| Artefato ou comando | Objetivo e entrada | Esperado | Observado | Utilidade e reuso |
| --- | --- | --- | --- | --- |
| `update-map049-busts.mjs` | Alterar somente a command list sob hashes e forma conhecidos | Aplicar lifecycle/facing ou reconhecer o estado terminal | Escritas autorizadas convergiram; replay não alterou o hash | Reutilizar somente com hash inicial/terminal explicitamente aprovado; nunca em baseline manual desconhecido. |
| `validate-map049-busts.mjs` | Validar target, payloads, lifecycle, assets, plugin, engine, diff e baseline manual | Rejeitar drift e aprovar todos os ACs | Versão 1.2.0 aprovou os seis ACs no hash atual | Rodar depois de qualquer mudança no target e antes do Playtest/auditoria. |
| `validate-session-evidence.py` | Validar forma e checksum canônicos dos manifestos | Todo manifesto ativo deve sair com exit 0 | Detectou o manifesto histórico inválido; original e substituto v2 ativos passaram | Rodar imediatamente após coleta e novamente antes de congelar coverage. |
| `git diff --check` | Detectar erros de whitespace | Exit 0 | Passou; aviso LF/CRLF foi informativo | Avaliar exit code separadamente dos avisos de EOL. |

## Atritos de execução

### 1. `user-correction` / `inference-bad` localizada

- **Category:** `user-correction`; observação localizada compatível com
  `inference-bad`, sem promoção.
- **What Happened:** a implementação estrutural preservou `Auto` ao mover
  Mélia para Position 9; o primeiro Playtest mostrou o facing oposto.
- **Expected Behavior:** Mélia à direita olhando para Thorin à esquerda.
- **Actual Behavior:** Mélia apareceu virada para fora da conversa.
- **Context:** a análise já marcava `Auto`/`Auto-Reverse` como hipótese sujeita
  a Playtest; o validator estático não observava percepção visual.
- **Evidence:** `technical-analysis.md`, `human-validation-feedback-v1.yaml`,
  `facing-correction-completion-record.yaml` e
  `post-correction-human-validation-v1.yaml`.
- **Cause:** confirmada para esta configuração: `Auto` em Position 9 não gerou
  o resultado esperado; `Auto-Reverse` gerou. Não há base para generalizar.
- **Resolution Or Outcome:** correção mínima, nova validação e Playtest aprovado.
- **Was Useful:** sim; o gate impediu aprovação perceptível incorreta.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** manter facing como hipótese até um Playtest representativo;
  reutilizar a combinação apenas quando plugin e parâmetros forem equivalentes.
- **Avoid Next Time:** antecipar um Playtest focado no primeiro busto lateral.
- **Minimum Next Step:** conferir parâmetros locais, validar a estrutura e
  observar o facing antes da reconciliação terminal.

### 2. `state-friction`

- **Category:** `state-friction`.
- **What Happened:** melhorias manuais legítimas do usuário alteraram Map049
  depois do Playtest e invalidaram o hash coberto pelo checkpoint anterior.
- **Expected Behavior:** o target permanecer no hash auditado até o fechamento.
- **Actual Behavior:** monstro, fade, parallax e serialização mudaram no mesmo
  arquivo da feature.
- **Context:** trabalho concorrente no único target de produção.
- **Evidence:** `concurrent-user-changes-v1.yaml`, `cycle-3-finding.yaml` e
  checkpoints v1-1 a v1-3.
- **Cause:** confirmada: melhorias manuais do usuário.
- **Resolution Or Outcome:** ownership registrado, mudanças preservadas,
  baseline atualizada e validação/auditoria integral refeitas.
- **Was Useful:** sim; as melhorias foram intencionais, embora exigissem replay.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** classificar proveniência antes de reagir ao drift e
  validar a feature contra o estado atual sem sobrescrever trabalho do usuário.
- **Avoid Next Time:** conferir hash e ownership imediatamente antes da
  auditoria terminal e coordenar uma janela de edição quando possível.
- **Minimum Next Step:** detectar drift, confirmar autoria, preservar, atualizar
  a baseline e repetir validator/auditoria.

### 3. `validation-friction` / `format-friction`

- **Category:** `validation-friction` e `format-friction`.
- **What Happened:** a auditoria da iteração 2 descobriu tarde um checksum
  canônico divergente no manifesto histórico da Writer de correção.
- **Expected Behavior:** todo manifesto coberto passar pelo validador canônico
  antes de entrar na coverage.
- **Actual Behavior:** todos os ACs funcionais passaram, mas a boundary ficou
  unresolved exclusivamente por integridade da evidência.
- **Context:** manifesto imutável usado como lineage de uma Writer.
- **Evidence:** `auditor-report-user-baseline-v1.yaml`, `checkpoint-v1-2.yaml`,
  `facing-correction-evidence-v2/evidence-manifest.xml` e
  `auditor-report-evidence-replay-v1.yaml`.
- **Cause:** a divergência de checksum é confirmada; sua causa originária não
  foi estabelecida pelas fontes persistidas.
- **Resolution Or Outcome:** substituto imutável válido, exclusão do manifesto
  antigo da coverage ativa e replay integral aprovado.
- **Was Useful:** sim; o gate preservou a integridade auditável.
- **Waste Impact:** `high`.
- **Reuse Guidance:** validar closed shape e checksum no momento da coleta e
  antes do checkpoint.
- **Avoid Next Time:** não congelar coverage com manifesto ainda não validado.
- **Minimum Next Step:** coletar, validar canonicamente, congelar digest e só
  então iniciar a auditoria.

### 4. `source-friction`

- **Category:** `source-friction`.
- **What Happened:** as raízes duráveis esperadas para `technical-implementer`
  e `runtime-qa` não estavam disponíveis nos preflights.
- **Expected Behavior:** contexto durável localizado antes dos handoffs.
- **Actual Behavior:** os preflights seguiram `ready-with-gaps` usando task,
  target, engine, plugin, validators e evidência humana atuais e verificados.
- **Context:** implementação e auditorias especializadas do Map049.
- **Evidence:** `completion-record.yaml`, `auditor-report-v1.yaml` e
  `auditor-report-evidence-replay-v1.yaml`.
- **Cause:** desconhecida; as fontes registram ausência, não sua origem.
- **Resolution Or Outcome:** substituição suficiente e não material para esta
  fase, sem inventar contexto.
- **Was Useful:** parcialmente.
- **Waste Impact:** `low`.
- **Reuse Guidance:** preservar a lacuna e usar somente fontes atuais
  hash-verificadas quando o preflight justificar suficiência.
- **Avoid Next Time:** não presumir que contexto durável ausente existe.
- **Minimum Next Step:** executar preflight e parar apenas se as fontes atuais
  não cobrirem o write ou o gate.

## Caminho mínimo recomendado

1. Confirmar target, hash atual e proveniência de mudanças concorrentes.
2. Aplicar mutação estruturada somente sob hashes e precondições aprovados.
3. Executar o validator determinístico sobre o hash resultante.
4. Fazer cedo um Playtest focado em composição, facing e cleanup; persistir a
   decisão humana e aplicar somente uma correção autorizada, se necessária.
5. Validar canonicamente todos os manifestos antes de congelar a coverage.
6. Executar uma única auditoria terminal no hash atual e publicar o checkpoint.

## Aprendizados e candidatos

### Aprendizados validados

- Validação estrutural de payload e semântica do plugin não comprova facing
  percebido; o Playtest continua obrigatório para essa propriedade.
- Na configuração local observada, com `InvertedScale` em posições 0–5, Mélia
  em Position 9 precisou de `Auto-Reverse` para olhar para Thorin. Isto é um
  fato específico da configuração, não uma regra universal.
- Mudança concorrente no mesmo target exige registrar ownership, preservar o
  conteúdo legítimo e repetir validação e auditoria no hash atual.
- Integridade da evidência é gate independente da correção funcional; manifesto
  com checksum inválido não pode compor coverage aprovada.
- O mutator terminal-aware condicionado por hash convergiu sem mudança no
  replay e evitou reexecução destrutiva no estado conhecido.

### Hipóteses não promovidas

- Um Playtest curto de facing antes da auditoria inicial pode reduzir uma
  reconciliação completa; precisa ser avaliado em outras cenas.
- Um gate de prepublicação do manifesto e uma checagem de drift imediatamente
  antes da auditoria podem reduzir replays; a observação deve ser avaliada pelo
  workflow de melhoria contínua.

### Preferências humanas registradas

- Mélia deve permanecer à direita olhando para Thorin à esquerda.
- O speaker final é Rheed, com o asset `Portraits/Principal/Reed final`.
- As melhorias manuais concorrentes pertencem ao usuário e devem ser preservadas.

### Candidatos comuns para melhoria contínua

- Avaliar um gate obrigatório que execute o validador canônico de session
  evidence antes de um manifesto entrar em coverage.
- Avaliar um preflight terminal que compare o hash atual, capture ownership de
  drift e bloqueie auditoria sobre uma baseline obsoleta.
- Avaliar documentação de projeto para a combinação local Position 9,
  `Auto-Reverse` e `InvertedScale`, sempre acompanhada do limite de escopo e do
  gate humano.

Esses itens são propostas; nenhuma regra, skill, validator, template ou
documentação duradoura foi alterada.

### Candidatos especializados de inferência

```yaml
analytic_inference_candidates:
  - schema_version: 1
    candidate_id: "analytic-inference-candidate-v1:2086319125e23346503d9ac1dd549b1afc4e4ae620eb9b9b44b71706ae3fe13d"
    candidate_type: analytic-inference
    observation_type: inference-good
    status: unreviewed
    capture_id: "capture-map049-busts-run-v2"
    source:
      retrospective_locator: "planos/006-busts-position/retrospetivas/fase1/retrospectiva-fase1-busts-position.md"
      consumer_root:
        canonical: unavailable
        resolution_source: unavailable
        state_root: unavailable
    lineage:
      run_id: "loki-run-v2:6572a8ac60d0d33347cab60118c6f6beca5d0e32443250314b0797acfd21f4a4"
      phase: fase1
      task_id: task-1.1
      agent_run_id: "agent-run-v1:060c4a9d8560638b38a93c3cd79eae47ce98796e4f59ad2fc2026d883c2f3fc7"
      handoff_id: "handoff-v1:838dee15b8feb087cab347e3febb6b1604beb1e243b749784f35792da20eea6d"
      evidence_id: unavailable
    statement_or_testable_question: "For exact RPG Maker MZ serialized JSON mutations, accepting only the approved initial hash or exact terminal hash, preserving observed text style, and requiring a no-change replay is a reusable guardrail against drift and destructive re-execution."
    observation:
      expected: "The mutator accepts only an approved source or terminal hash, preserves observed serialization and non-target content, and changes no bytes on terminal replay."
      actual: "The initial and facing-correction writes passed exact hash/style preconditions, preserved the scoped content, and terminal replay left the target hash unchanged."
      missing_opportunity: not-applicable
    applicability:
      technologies: ["rpg-maker-mz", "javascript"]
      versions: []
      surfaces: ["serialized data JSON", "bounded command-list mutation"]
      objectives: ["prevent drift", "idempotent replay", "preserve non-target content"]
      signals: ["approved source hash exists", "exact terminal hash exists", "serialization style must be preserved"]
      exclusions: ["unexpected target hash", "unclassified concurrent user changes"]
    provenance:
      source_refs:
        - "planos/006-busts-position/execution-knowledge/entries/capture-map049-busts-run-v2.xml"
        - "planos/006-busts-position/interaction/fase1/task-1.1/completion-record.yaml"
        - "planos/006-busts-position/interaction/fase1/task-1.1/facing-correction-completion-record.yaml"
      evidence_refs:
        - "planos/006-busts-position/interaction/fase1/task-1.1/evidence/evidence-manifest.xml"
        - "planos/006-busts-position/builds/fase1/map049-structural-validation-final.json"
        - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-v1.yaml"
      freshness: current
    evidence_classification:
      facts:
        - "The mutator verified the approved pre-write hash before the initial material write."
        - "Terminal replay reported already-terminal and preserved the target hash."
        - "The deterministic validator and independent audit approved the scoped mutation."
      inferences:
        - "The combined hash, serialization-preservation and replay checks form a reusable guardrail for equivalent bounded mutations."
      hypotheses:
        - "Effectiveness across other maps or serializers remains unverified."
    validation:
      state: partial
      validator_refs:
        - "planos/006-busts-position/builds/fase1/map049-structural-validation-final.json"
        - "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/auditor-report-v1.yaml"
      reason: "The guardrail was useful and confirmed in this run; reuse beyond the observed Map049 mutations remains unvalidated."
    investigation:
      confirm_or_reject_evidence:
        - "A second bounded RPG Maker MZ data mutation using the same preconditions and no-change replay."
        - "A recorded rejection of an unexpected hash without target modification."
      potential_impact: "Reduce destructive re-execution and accidental overwrite of concurrent edits in bounded serialized-data changes."
      cost: unknown
      stop_condition: "Confirm on another bounded mutation or reject when the guardrail fails to preserve target integrity or blocks an approved state."
      suggested_capabilities: []
    distinction:
      exact_duplicate_hints:
        - "planos/006-busts-position/execution-knowledge/entries/capture-map049-busts-run-v2.xml#knowledge/claims"
      near_duplicate_hints: []
      distinction_reason: "This candidate carries the observed run lineage and limits validation to the Map049 mutator; no catalog lookup or deduplication was performed."
    guidance:
      reuse: "Require immediate hash/style preconditions, permit only enumerated source/terminal states, preserve non-target content, and verify a no-change replay."
      avoid: "Do not run the mutator on an unexpected or user-modified baseline and do not treat one successful run as universal proof."
    downstream:
      owner: loki-continuous-improvement
      eligible_for_ci_evaluation: true
      durable_mutation_authorized: false
```

- **Validação dos candidatos:** o ID foi derivado por SHA-256 do JSON canônico
  do tuple `[capture_id, observation_type, statement_or_testable_question,
  retrospective_locator]`; schema e campos obrigatórios foram conferidos nesta
  retrospectiva. Nenhuma validação ou deduplicação de catálogo foi executada.
- **Observação localizada sem candidato:** o facing inicial de Mélia sustenta
  `inference-bad` apenas para a configuração observada, mas não possui
  `capture_id` próprio ligado às evidências pós-Playtest; nenhum ID foi inventado.
- **Lineage indisponível:** `evidence_id` não existe nas fontes do capture; foi
  mantido como `unavailable`.
- **Consumer/state root provenance:** `unavailable`; a execução de origem não
  persistiu `canonical-pwd` e state root para este capture, e a retrospectiva
  não os resolveu por cwd, Git ou descoberta de `.loki`.
- **Gates para avaliação downstream:** revisão, deduplicação, validação e
  eventual approval pertencem a `loki-continuous-improvement`.
- **Catálogo escrito/promovido/pontuado/reorganizado/purgado:** `false`.
- **Route permitido:** `loki-continuous-improvement` para avaliação; nenhuma
  promoção automática.

## Handoffs, gates e approvals

- Writers de implementação e correção: concluídas, com completion records.
- Auditores de fase: concluídos; a iteração 3 é a autoridade terminal aprovada.
- Digestão retrospectiva: concluída em modo read-only, sem writes.
- Playtest pós-correção: aprovado pelo usuário em 2026-08-05.
- Write Agent específico para materializar retrospectivas: não disponível entre
  os agentes especializados desta execução. O agente principal da skill
  escreveu diretamente somente o target exato desta retrospectiva, após a
  digestão read-only e sob os allowed/forbidden writes do workflow.
- Gates ou approvals pendentes para encerrar esta retrospectiva: nenhum.
- Promoção duradoura: não solicitada, não aprovada e não executada.

## Riscos ou blockers

- Não há blocker para o encerramento da fase.
- `Auto-Reverse` está comprovado somente para a cena e configuração local
  observadas; mudança de plugin ou parâmetros exige nova validação e Playtest.
- O manifesto antigo inválido permanece como histórico imutável e não deve
  voltar à coverage ativa.
- A causa originária da divergência do checksum não foi estabelecida.
- O capture de execution knowledge foi produzido antes do Playtest terminal e
  ainda descreve runtime como pendente; para estado atual, prevalecem
  `implement-feature-result-v3.json`, `checkpoint-v1-3.yaml` e a evidência
  humana pós-correção.
- Telemetria parcial impede afirmar duração, caminho crítico ou tokens exatos.

## Próximos passos

1. Nenhuma ação adicional é necessária para implementar ou encerrar a fase 1.
2. Opcionalmente, executar `loki-continuous-improvement` para avaliar os
   candidatos sem promoção automática.
3. Em qualquer mudança futura do Map049, refazer hash/proveniência, validator,
   Playtest e auditoria sobre o novo estado.

## Resume state

```yaml
retrospective_state:
  status: completed
  scope: "planos/006-busts-position"
  phase: fase1
  task: task-1.1
  target: "planos/006-busts-position/retrospetivas/fase1/retrospectiva-fase1-busts-position.md"
  feature_status: completed
  target_digest: "sha256:252965e40909d8c61adbecacee62264a92e3049e9347c07934c7be02f2754ffa"
  automatic_validation: passed
  human_validation: passed
  audit_checkpoint: "planos/006-busts-position/builds/audits/phase/boundary-8c5fa4d8e88db7e4272732d98bb28c79/checkpoint-v1-3.yaml"
  audit_status: approved
  user_owned_changes: preserved-and-not-attributed-to-feature
  historical_invalid_manifest: preserved-outside-active-coverage
  analytic_inference_candidates:
    - "analytic-inference-candidate-v1:2086319125e23346503d9ac1dd549b1afc4e4ae620eb9b9b44b71706ae3fe13d"
  catalog_mutation_applied: false
  residual_risks:
    - "mirror result is local to the observed plugin configuration"
    - "origin of historical checksum mismatch remains unknown"
    - "execution metrics lack exact timings and token counters"
  next_action: "none required; optional continuous-improvement evaluation"
```
