---
title: "Retrospectiva técnica — Fase 1 da ambientação VN do Map046"
type: loki-technical-retrospective
doc_id: "retro-plan004-fase1-ambientacao-vn-v1"
version: "1.0.0"
status: completed
created: "2026-07-29"
last_updated: "2026-07-29"
phase: fase1
task_id: task-1.1
run_id: "loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1"
scope: "Implementação, validação estática, auditoria independente e Playtest da ambientação VN do Map046"
authority: "Estado terminal e evidências persistidas do Plano 004"
canonical_source: "planos/004-ambientacao-VN/retrospetivas/fase1/retrospectiva-fase1-ambientacao-vn-map046.md"
confidence: high
---

# Retrospectiva técnica — Fase 1 da ambientação VN do Map046

## Status

- Plano: `completed`.
- Fase: `fase1`, concluída.
- Task: `task-1.1`, `passed`.
- Artefato de produção: `frontend/data/Map046.json`, SHA-256 `861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892`.
- Validação estática: `passed`, 22/22 checks, sem erros.
- Auditoria independente: `approved`.
- Gate humano: RQ-P01–RQ-P09 `passed` por confirmação explícita global do usuário.
- Métricas: `partial`; a telemetria não disponibilizou contadores de uso nem durações monotônicas verificáveis.

Locators: `planos/004-ambientacao-VN/tasks.md#resume-state`; `planos/004-ambientacao-VN/task-1.1.md#task-acceptance-and-validation`; `planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json`; `planos/004-ambientacao-VN/builds/metrics/execution-metrics.json`.

## Resumo

A fase materializou o pacote aprovado de ambientação VN exclusivamente no Map046: parallax, 11 falas, mudanças de expressão, atribuição de Dulgarin no ramo Confirmar e Cut-In transitório de Thorin. O resultado preservou choices, branches, switches, caller chain e handoff final. A validação determinística foi reproduzida pela auditoria independente e encerrou com 22/22 checks; depois, o usuário aprovou globalmente os nove cenários perceptíveis do Playtest.

O maior aprendizado operacional surgiu depois que a implementação passou a integrar `HEAD`: um validador persistente que tratava `HEAD` como baseline pré-implementação deixou de observar o estado original. O validador atual foi corrigido para reconstruir deterministicamente o baseline a partir do artefato corrente e comparar seu digest imutável. Esse aprendizado permanece candidato não promovido para revisão por `loki-continuous-improvement`.

## Artefatos

| Artefato | Papel | Estado terminal / observação |
| --- | --- | --- |
| `frontend/data/Map046.json` | Único target de produção | SHA-256 `861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892` |
| `planos/004-ambientacao-VN/tasks.md` | Estado canônico do plano | `completed`; Playtest validado |
| `planos/004-ambientacao-VN/task-1.1.md` | Contrato e estado da task | `completed` / `passed` |
| `planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json` | Registro regenerativo de execução | Writer, tentativas, decisões e snapshot pré-gate |
| `planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json` | Relatório regenerativo de validação | `passed`, 22 checks, hash do mapa e baseline reconstruído |
| `planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json` | Evidência terminal reconciliada | Automação e gate humano `passed` |
| `planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json` | Parecer independente | `approved`; 22/22 reproduzidos |
| `planos/004-ambientacao-VN/builds/metrics/execution-metrics.json` | Métricas da execução | `partial` por lacunas de telemetria |
| `planos/004-ambientacao-VN/interaction/fase1/task-1.1/human-validation-v1.json` | Confirmação do Playtest | RQ-P01–RQ-P09 `passed`, sem observações granulares |
| `planos/004-ambientacao-VN/execution-knowledge/entries/capture-task-1.1-implementation-v1.xml` | Conhecimento operacional capturado | `captured`, promoção `unreviewed` |
| `planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs` | Validador persistente corrente | Reconstrói baseline original e verifica seu digest |

## Evidências/validadores

- O relatório de task registra `status: passed`, exatamente 22 checks e `errors: []`: `planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/status`, `#/checks` e `#/errors`.
- O hash persistido do mapa é `861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892`: `planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/evidence/map_sha256`.
- O baseline imutável reconstruído tem SHA-256 `73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2`: `planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/evidence/baseline_sha256`.
- A superfície de produção alterada ficou restrita a `events[1].pages[0].list` e `parallaxName`: `planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/evidence/diff_paths`.
- A auditoria reproduziu `node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs` com exit code 0 e 22 checks aprovados, e executou `git diff --check` sem erro: `planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json#/checks_reproduced`.
- A evidência terminal reconcilia automação e confirmação humana como `passed`: `planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json#/automatic_validation` e `#/human_gate`.
- O validador corrente constrói `baseline` a partir do mapa atual, remove somente as mudanças autorizadas e valida `BASELINE_SHA256`: `planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs:192`–`199`.

## Decisões humanas

- O usuário confirmou explicitamente que o Playtest estava validado; essa decisão fechou RQ-P01–RQ-P09: `planos/004-ambientacao-VN/interaction/fase1/task-1.1/human-validation-v1.json#/statement` e `#/scenario_refs`.
- A confirmação foi global. Nenhum resultado individual, sintoma, observação visual ou detalhe por cenário foi fornecido, e esta retrospectiva não infere nenhum: `planos/004-ambientacao-VN/interaction/fase1/task-1.1/human-validation-v1.json#/reported_observations` e `#/observation_limit`.
- A decisão humana complementa, mas não substitui, a evidência estrutural 22/22; a primeira cobre o comportamento percebido e a segunda cobre invariantes verificáveis do artefato.

## Rastro operacional material

1. O writer tentou criar scratch atômico dentro do sandbox e recebeu `EPERM`.
2. A reexecução delimitada e autorizada fora do sandbox concluiu a escrita e produziu o Map046 com hash `861f6c...`.
3. O primeiro ciclo do validator apresentou falsos negativos ligados a normalização LF/CRLF, granularidade do diff em arrays e localização dos botões sob a subpasta `Choices`.
4. Esses checks foram corrigidos e o validator passou.
5. A auditoria independente reproduziu o validator, confirmou 22/22 e aprovou a fase; também observou que o replay altera `generated_at` e, consequentemente, os hashes dos relatórios regenerativos.
6. Depois que a implementação passou a integrar `HEAD`, o blob de `HEAD` deixou de representar o baseline pré-implementação. O validator foi ajustado para reconstruir o baseline original e verificar o digest `73e006...`, mantendo `HEAD` apenas como observação do blob corrente.
7. O Playtest humano encerrou RQ-P01–RQ-P09 por confirmação explícita global, e os artefatos terminais atualizaram o plano para `completed`.

Locators: `planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json#/attempts`; `planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json#/observations`; `planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs:185`–`199`; `planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json#/human_gate`.

## Atritos de execução com campos contratuais

### F-01 — EPERM na escrita atômica

```yaml
friction_id: F-01
category: environment
what_happened: "A primeira tentativa do writer falhou com EPERM ao criar o scratch atômico no sandbox."
expected_behavior: "O writer deveria criar o scratch e concluir a escrita delimitada na primeira tentativa."
actual_behavior: "A criação do scratch foi negada; a escrita só concluiu no replay autorizado fora do sandbox."
context: "Writer one-shot protegido pelo hash baseline durante a implementação de frontend/data/Map046.json."
evidence:
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json#/attempts/0
cause: "desconhecida — a evidência não identifica o mecanismo interno que produziu o EPERM."
resolution_or_outcome: "Replay delimitado e autorizado concluiu a escrita com o hash alvo esperado."
was_useful: parcialmente
waste_impact: medium
reuse_guidance: "Preservar a tentativa falha e aplicar somente o replay autorizado e delimitado."
avoid_next_time: "Não repetir a escrita fora do sandbox sem autorização nem atribuir causa interna sem evidência."
minimum_next_step: "Se o EPERM reaparecer, registrar a tentativa e solicitar o mesmo escopo mínimo de replay autorizado."
```

### F-02 — falsos negativos do validator

```yaml
friction_id: F-02
category: validator
what_happened: "O validator produziu falsos negativos por LF/CRLF, granularidade do diff em arrays e localização dos botões na subpasta Choices."
expected_behavior: "O validator deveria distinguir diferenças autorizadas de regressões e localizar os assets nos paths reais."
actual_behavior: "Checks inicialmente reportaram divergências que não correspondiam a regressões funcionais do mapa."
context: "Primeiro ciclo de validação estrutural do Map046 após a escrita."
evidence:
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json#/attempts/2
  - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs:195-199
  - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs:235-244
cause: "confirmada — premissas imprecisas sobre serialização, granularidade estrutural e localização de assets."
resolution_or_outcome: "Baseline normalizado, arrays comparados na granularidade contratada e paths corrigidos; 22/22 checks passaram."
was_useful: sim
waste_impact: medium
reuse_guidance: "Tratar representação textual, estrutura JSON e resolução de assets como contratos distintos."
avoid_next_time: "Não derivar equivalência estrutural diretamente de line endings nem presumir a pasta raiz de assets."
minimum_next_step: "Reutilizar os checks corrigidos e confirmar 22/22 em qualquer replay."
```

### F-03 — relatórios regenerativos mudam timestamp e hash

```yaml
friction_id: F-03
category: evidence-mutability
what_happened: "Cada replay do validator sobrescreveu completion/validation com novo generated_at e mudou os hashes desses relatórios."
expected_behavior: "A reprodução deveria permitir distinguir validade funcional estável de identidade temporal regenerada."
actual_behavior: "Hashes congelados antes do replay deixaram de identificar os relatórios atuais, embora o resultado funcional permanecesse igual."
context: "Reprodução independente do validator durante a auditoria da fase."
evidence:
  - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json#/evidence_consistency
  - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json#/observations/0
cause: "confirmada — o validator regenera deliberadamente o campo generated_at."
resolution_or_outcome: "A auditoria ancorou a validade no hash estável do Map046 e em 22/22, registrando hashes pós-replay separadamente."
was_useful: sim
waste_impact: low
reuse_guidance: "Separar identidade funcional do artefato/checks da identidade temporal dos relatórios regenerados."
avoid_next_time: "Não tratar mudança isolada no hash de relatório regenerativo como mudança funcional."
minimum_next_step: "Em replay, reconciliar primeiro hash do target e resultado semântico, depois registrar hashes atuais dos relatórios."
```

### F-04 — HEAD deixou de ser o baseline pré-implementação

```yaml
friction_id: F-04
category: validator-baseline
what_happened: "Depois do commit da implementação, HEAD passou a conter o Map046 implementado e deixou de fornecer o baseline original."
expected_behavior: "O validator deveria observar o mesmo baseline imutável antes e depois do commit."
actual_behavior: "A leitura de HEAD como baseline histórico gerou falso negativo após o commit."
context: "Validação persistente do Map046 em um estado Git no qual a implementação já integra HEAD."
evidence:
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/checks/0/evidence
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/evidence/current_head_blob_sha256
  - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs:185-199
cause: "confirmada — o baseline foi associado a uma referência Git mutável em relação ao ciclo de vida da implementação."
resolution_or_outcome: "O validator passou a reconstruir o baseline, verificar o digest `73e006...` e voltou a passar 22/22."
was_useful: sim
waste_impact: high
reuse_guidance: "Usar baseline imutável ou reconstrução determinística validada por digest em validators persistentes."
avoid_next_time: "Não assumir que HEAD continuará representando o estado pré-implementação depois do commit."
minimum_next_step: "Submeter o candidato desta retrospectiva à avaliação de loki-continuous-improvement, sem mutação automática."
```

### F-05 — snapshots pré-gate ainda registram pending

```yaml
friction_id: F-05
category: temporal-documentation-drift
what_happened: "Completion, validation e parecer de auditoria foram produzidos antes do Playtest e ainda registram o runtime/human gate como pending."
expected_behavior: "Consumidores deveriam interpretar cada snapshot no momento em que foi produzido e consultar o estado terminal para o resultado final."
actual_behavior: "Leitura isolada dos snapshots anteriores pode sugerir que o plano ainda está aberto."
context: "Evidências persistidas em etapas diferentes do gate humano RQ-P01–RQ-P09."
evidence:
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json#/gates/0
  - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json#/runtime_validation
  - planos/004-ambientacao-VN/builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json#/runtime_validation
  - planos/004-ambientacao-VN/builds/fase1/terminal-evidence-v1.json#/human_gate
cause: "confirmada — os artefatos representam momentos distintos do fluxo e os snapshots pré-gate foram preservados."
resolution_or_outcome: "Estado terminal reconciliado como completed/passed sem reescrever evidência histórica."
was_useful: parcialmente
waste_impact: low
reuse_guidance: "Usar terminal-evidence, human-validation e tasks.md para o estado final, preservando snapshots como histórico."
avoid_next_time: "Não inferir estado terminal a partir de um único snapshot produzido antes do gate."
minimum_next_step: "Consumir a evidência terminal ao resumir ou retomar o Plano 004."
```

## Caminho mínimo

O caminho mínimo que efetivamente encerrou a fase foi:

`writer protegido por hash` → `parse/diff/22 checks` → `auditoria independente` → `confirmação humana RQ-P01–RQ-P09` → `reconciliação terminal completed`.

Para reproduzir a validade estática atual, basta executar `node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs` e verificar `passed`, 22 checks, zero erros e hash do mapa `861f6c...`. A reexecução modifica os relatórios regenerativos; por isso, qualquer comparação de hashes desses relatórios deve considerar o novo `generated_at`.

## Aprendizados/candidatos

### Fatos

- O Map046 permaneceu estável em `861f6c...` durante os replays observados.
- A auditoria reproduziu 22/22 checks sem erros.
- O baseline original pode ser reconstruído para o digest `73e006...` removendo somente as mudanças autorizadas.
- `HEAD` contém o blob implementado no estado observado, não o baseline pré-implementação.

### Inferências

- Um digest de baseline reconstruído e imutável mantém a verificação reproduzível ao longo do ciclo antes/depois de commit, desde que a reconstrução seja estritamente limitada às transformações autorizadas.
- Uma mudança isolada no hash de relatório regenerativo não demonstra mudança funcional quando o artefato alvo e o resultado semântico continuam estáveis.

### Hipóteses

- A causa interna do `EPERM` pode estar associada às restrições de criação de scratch do sandbox, mas não há evidência suficiente para determinar o mecanismo.
- Outros validators que usam `HEAD` como sinônimo de baseline pré-implementação podem apresentar o mesmo falso negativo após commit; esta possibilidade não foi auditada nesta retrospectiva.

### analytic_inference_candidate

```yaml
analytic_inference_candidate:
  schema_version: 1
  candidate_id: analytic-inference-candidate-v1:18b6737d0e5570b347705268c6b67cfcd9837da3ee8e3be9c8d4889b241f4831
  candidate_type: analytic-inference
  observation_type: inference-bad
  status: unreviewed
  capture_id: retro-plan004-fase1-ambientacao-vn-v1
  source:
    retrospective_locator: planos/004-ambientacao-VN/retrospetivas/fase1/retrospectiva-fase1-ambientacao-vn-map046.md
    consumer_root:
      canonical: unavailable
      resolution_source: unavailable
      state_root: unavailable
  lineage:
    run_id: loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
    phase: fase1
    task_id: task-1.1
    agent_run_id: unavailable
    handoff_id: unavailable
    evidence_id: unavailable
  statement_or_testable_question: "Validators persistentes não devem assumir que HEAD continua contendo o baseline pré-implementação depois do commit."
  observation:
    expected: "O validator observa um baseline imutável e produz a mesma validação antes e depois do commit da implementação."
    actual: "HEAD passou a conter a implementação, gerando falso negativo; a reconstrução determinística pelo digest original resolveu a divergência."
    missing_opportunity: not-applicable
  applicability:
    technologies: [rpg-maker-mz, nodejs, git]
    versions: []
    surfaces: [validator, data-json, git-baseline]
    objectives: [reproducible-validation]
    signals: [post-commit-head-drift, false-positive]
    exclusions: [production-mutation, catalog-mutation]
  provenance:
    source_refs:
      - planos/004-ambientacao-VN/retrospetivas/fase1/retrospectiva-fase1-ambientacao-vn-map046.md
    evidence_refs:
      - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs
      - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
    freshness: current
  evidence_classification:
    facts:
      - "HEAD passou a conter a implementação."
      - "O baseline reconstruído produziu o digest 73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2."
      - "O validator passou 22/22 checks."
    inferences:
      - "HEAD não é um baseline histórico estável."
    hypotheses: []
  validation:
    state: validated
    validator_refs:
      - planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs
      - planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json
    reason: "O validator atual reconstruiu o baseline original e a task validation passou 22/22 sem erros."
  investigation:
    confirm_or_reject_evidence:
      - "baseline digest 73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2"
      - "validator 22/22"
    potential_impact: "Evitar falsos resultados em validators persistentes executados antes e depois do commit da implementação."
    cost: unknown
    stop_condition: "Encerrar a investigação quando a revisão confirmar ou rejeitar que a reconstrução por digest é aplicável sem mascarar mudanças não autorizadas."
    suggested_capabilities: []
  distinction:
    exact_duplicate_hints:
      - planos/004-ambientacao-VN/execution-knowledge/entries/capture-task-1.1-implementation-v1.xml
    near_duplicate_hints: []
    distinction_reason: "O capture existente registra EPERM e mutabilidade dos relatórios; este candidato isola a deriva de HEAD como baseline histórico após o commit."
  guidance:
    reuse: "Ancorar validators persistentes em baseline imutável ou reconstrução determinística verificada por digest."
    avoid: "Não usar HEAD como sinônimo permanente do estado pré-implementação."
  downstream:
    owner: loki-continuous-improvement
    eligible_for_ci_evaluation: true
    durable_mutation_authorized: false
```

O candidato acima é uma proposta de revisão, não uma regra durável. Nenhum catálogo foi escrito, promovido, pontuado, reorganizado ou purgado por esta retrospectiva.

## Handoffs/gates

| Ordem | Owner / gate | Entrada | Resultado | Evidência |
| --- | --- | --- | --- | --- |
| 1 | `technical-implementer` | task-1.1 e target delimitado | Escrita concluída; validator 22/22 | `builds/fase1/task-1.1-completion.json`, `task-1.1-validation.json` |
| 2 | `map046-phase-auditor` | completion, validation e checkpoint | `approved`; reprodução 22/22 | `builds/audits/phase/boundary-4d327cb7baf73d6b3cc8f72d624de5df/auditor-report-v1.json` |
| 3 | `human-validation` | RQ-P01–RQ-P09 | `passed` por confirmação global | `interaction/fase1/task-1.1/human-validation-v1.json` |
| 4 | Orquestrador | evidência automática + humana | Plano `completed` | `builds/fase1/terminal-evidence-v1.json`, `tasks.md#resume-state` |
| Próximo, opcional | `loki-continuous-improvement` | candidato `unreviewed` | Revisar, deduplicar e decidir destino; nenhuma mutação nesta etapa | seção `Aprendizados/candidatos` desta retrospectiva |

O gate humano está fechado. Não há handoff obrigatório de implementação ou QA restante para o Plano 004.

## Riscos

- A aprovação humana não contém observações por cenário; não é possível atribuir evidência granular a RQ-P01, RQ-P02 etc. além da confirmação global.
- Snapshots pré-gate continuam exibindo `pending`; consumidores que ignorem `terminal-evidence-v1.json`, `human-validation-v1.json` e o estado canônico em `tasks.md` podem concluir incorretamente que o plano está aberto.
- O validator sobrescreve dois relatórios ao ser reexecutado; seus timestamps e hashes não são identidades funcionais estáveis.
- As métricas são `partial`: tokens, duração monotônica, active time e critical path permanecem indisponíveis. Não há base para inferir custo ou eficiência temporal exatos.
- A reconstrução do baseline é específica ao contrato atual do Map046. Generalizar a abordagem sem revisão pode mascarar mudanças não autorizadas em outros validators.

## Próximos passos

1. Nenhuma ação é obrigatória para concluir o Plano 004; ele já está `completed`.
2. Encaminhar o único `analytic_inference_candidate` a `loki-continuous-improvement` para revisão e deduplicação, mantendo `mutation: false` até decisão explícita.
3. Em consumo futuro, tratar `terminal-evidence-v1.json` e `human-validation-v1.json` como complementos terminais dos snapshots pré-gate, sem reescrever a história da execução.
4. Se o validator for reexecutado, reconciliar primeiro o hash do Map046 e o resultado semântico 22/22; só então atualizar referências a hashes dos relatórios regenerados.

## Resume state

```yaml
loki_retrospective_state:
  schema_version: 1
  status: completed
  run_id: loki-run-v2:b625625fc3f771ba1ccf751c357ec0395a82e2997bd04a06a97ce5b1867033a1
  phase: fase1
  task_id: task-1.1
  plan_status: completed
  static_validation:
    status: passed
    checks: 22
    errors: 0
    map_sha256: 861f6c6fe4c5953f37fed169814650d1bcc5a8e6ea2f4e82b446ab645c37b892
  independent_audit: approved
  human_gate:
    status: passed
    scenarios: [RQ-P01, RQ-P02, RQ-P03, RQ-P04, RQ-P05, RQ-P06, RQ-P07, RQ-P08, RQ-P09]
    evidence_granularity: global-confirmation-without-per-scenario-details
  metrics:
    status: partial
    reason: "Uso exato e durações monotônicas não foram propagados pela telemetria."
  blockers: []
  residual_risks:
    - human-evidence-not-granular
    - pre-gate-snapshots-still-pending
    - regenerative-report-hashes-mutable
    - exact-cost-and-durations-unavailable
  candidate_count: 1
  candidate_status: unreviewed
  catalog_mutation: false
  next_destination: loki-continuous-improvement
  next_action: "Revisão opcional do candidato; nenhuma ação obrigatória para o plano concluído."
```
