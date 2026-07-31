---
title: "Retrospectiva tecnica - reparo de encoding do Map045"
type: loki-technical-retrospective
capture_id: map045-retrospective-fase1-v1
status: completed
phase: fase1
task_id: task-1.1
run_id: loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5
created: "2026-07-31"
canonical_source: "planos/003-falas-casa-forjaprata/retrospetivas/fase1/retrospectiva-fase1-map045-encoding.md"
---

# loki-retrospectiva-tecnica — Resultado

## Status

`completed`: a fase 1 e a `task-1.1` terminaram com validação estática e auditoria aprovadas, mas o run está claramente pausado como `pending-human-validation` no gate de Playtest. Esta retrospectiva não altera esse estado.

## Resumo

O objetivo foi recuperar exatamente 30 folhas textuais allowlisted de `frontend/data/Map045.json`, sem reescrita narrativa, mudança estrutural ou alteração de `Map006`. As 30 folhas foram reparadas; o validador final aprovou 146/146 checks; o replay da auditoria cobriu 6/6 targets e aprovou os quatro critérios de aceitação. O critério de conclusão estática foi satisfeito. Apresentação, progressão e save/load em runtime continuam fora do resultado observado até que exista um registro persistido do Playtest.

## Artefatos

- Criado por esta retrospectiva: `planos/003-falas-casa-forjaprata/retrospetivas/fase1/retrospectiva-fase1-map045-encoding.md`.
- Produção alterada pela fase: `frontend/data/Map045.json`, limitada às 30 folhas congeladas.
- Builds produzidos: manifesto, preview, relatório, writer e validator em `planos/003-falas-casa-forjaprata/builds/fase1/`.
- Evidência de implementação: `writer-completion-v1.json`, `writer-completion-v2.json`, `writer-handoff-v1.json` e `writer-handoff-v2.json`.
- Evidência de validação: `map045-validation-report.json`, `validator-record-v2.json`, `final-validator-record-v2.json` e `validation-cycles/cycle-1/`.
- Evidência de auditoria: `audit-report-v1.json`, `audit-report-v2.json` e `checkpoint-v1-1.json` sob `builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/`.
- Estado terminal consultado: `tasks.md`, `task-1.1.md`, `result-v3.json`, `dashboard-v3.json`, `terminal-evidence-v1.json` e `metrics/execution-metrics.json`.
- Guia humano consultado: `interaction/fase1/playtest-map045.md`; ele continua com status pendente.
- Nenhum artefato foi descartado nesta captura. Nenhum arquivo de runtime, catálogo, standard, skill, comando, template ou documentação durável foi escrito por esta retrospectiva.

## Evidências e validadores

- `map045-validation-report.json`: status `passed-static-runtime-pending`, 30 mudanças exatas e 146 checks aprovados, sem falha.
- `audit-report-v2.json`: replay aprovado, 6/6 target digests correspondentes, AC-MAP045-01 a AC-MAP045-04 aprovados e Playtest pendente.
- `checkpoint-v1-1.json`: checkpoint ativo de replay, `audit_id` `execution-audit-v1:20e15a1f3590c599191d5f19eb38b00f2b1b852cf3b69735519c6e558e2fd26d`.
- `severity-finding-v2.json`: falso negativo classificado como `validator-defect`, `severity: null` e `retry_debit: false`; a evidência de falha foi restaurada em locator imutável e verificada por SHA-256.
- `tasks.md`, `result-v3.json` e `dashboard-v3.json`: estado persistido `pending-human-validation`; `task-1.1` está `passed`.
- `metrics/execution-metrics.json`: métricas observadas — `agents: 3`, `handoffs: 2`, `validators_executed: 2`, `validators_repeated: 1`, `retries: 0`, `replays: 2`, `reconciliations: 1`. Tokens e durações são `unavailable`; nenhuma estimativa foi produzida.
- Validação humana não executada por este workflow: não há interaction record persistido com resultado do Playtest.

## Decisões humanas

- A aprovação anterior à escrita está registrada em `tasks.md` como satisfeita pela invocação do workflow após aceitação explícita da sugestão.
- O retorno conversacional atual “tá ótimo” é positivo, mas não foi persistido como interaction record nem identifica rotas, critérios ou resultado do Playtest. Portanto, não foi relabelado como validação humana de runtime.
- Não houve autorização para promoção de aprendizados ou mutação de catálogo.

## Rastro operacional material

1. O Writer preparou reparo estruturado, manifesto, preview e validador para as 30 folhas allowlisted.
2. A criação do scratch atômico encontrou restrição do sandbox antes de qualquer escrita parcial; a execução prosseguiu somente após usar a rota autorizada que preservava o save atômico.
3. O Writer detectou drift concorrente no `Map045`, preservou as adições externas e rebasiou o baseline antes do save.
4. A primeira validação pós-save produziu falso negativo na comparação de comandos 122. O runtime-qa classificou o caso como defeito do validador, sem débito de retry; o validator foi limitado à comparação estrutural correta e o conjunto completo foi repetido.
5. O primeiro handoff cobria 6 targets, mas a auditoria encontrou novo drift pós-handoff: somente 5/6 digests ainda correspondiam, com a remoção concorrente de uma página vazia. O estado mais recente do usuário foi preservado, sem restaurar a página removida.
6. Os artefatos foram reconciliados, o mapa permaneceu sem nova escrita, os checks passaram em 146/146 e a auditoria completa foi repetida.
7. O preflight v2 do auditor tinha `coverage_digest` mecanicamente inválido. O preflight v3 recomputou o digest canônico e o check `AUD-MAP045-R2-01` confirmou a correção.
8. A falha original havia perdido addressability quando o relatório no locator mutável foi sobrescrito pelo relatório de sucesso. Seus bytes foram reconstruídos e publicados em locator digest-addressable, então revalidados no replay.
9. Os scripts `repair-map045-encoding.mjs` e `validate-map045-encoding.mjs` serviram, respectivamente, para reconstrução/reparo fail-closed e validação reprodutível. `node --check`, as rotas primary/final e `git diff --check` passaram segundo os completion records e a auditoria.

## Atritos de execução

### 1. Sandbox e scratch atômico

- **Category:** `environment-mismatch`
- **What Happened:** a tentativa de criar o scratch atômico foi negada no sandbox padrão antes do save.
- **Expected Behavior:** criar e validar o scratch no mesmo fluxo antes da substituição atômica do mapa.
- **Actual Behavior:** a permissão impediu o scratch; nenhuma escrita parcial ocorreu.
- **Context:** primeira execução do reparo allowlisted de `Map045.json`.
- **Evidence:** `builds/fase1/writer-completion-v1.json#attempts` e `execution-knowledge/entries/map045-encoding-friction-v1.xml`.
- **Cause:** desconhecida; as fontes confirmam a restrição do ambiente, mas não sua causa interna.
- **Resolution Or Outcome:** foi usada a rota autorizada mantendo o requisito de save atômico; o reparo seguiu sem escrita parcial.
- **Was Useful:** parcialmente; o fail-closed evitou corrupção, mas exigiu uma tentativa adicional de ambiente.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** testar a capacidade de scratch atômico antes de iniciar transformação ou cálculo de save.
- **Avoid Next Time:** não descobrir a limitação apenas no ponto de persistência.
- **Minimum Next Step:** executar um preflight de criação, leitura, rename e limpeza de scratch no diretório-alvo.

### 2. Drift concorrente no mapa

- **Category:** `state-friction`
- **What Happened:** `Map045.json` mudou durante a execução e novamente depois do primeiro handoff.
- **Expected Behavior:** o baseline coberto permanecer estável até a publicação da auditoria.
- **Actual Behavior:** adições externas apareceram no primeiro drift; no segundo, uma página vazia foi removida e o digest coberto ficou obsoleto.
- **Context:** worktree compartilhada e reparo limitado a 30 folhas.
- **Evidence:** `writer-completion-v1.json#attempts`, `writer-completion-v2.json#attempts`, `audit-report-v1.json` e `audit-report-v2.json#checks`.
- **Cause:** confirmada como mudança concorrente do estado; a autoria exata não é estabelecida pelas fontes persistidas.
- **Resolution Or Outcome:** o baseline foi reconstruído a partir do estado atual, as edições externas foram preservadas, a página removida não foi restaurada e toda a validação/auditoria foi repetida.
- **Was Useful:** sim; a reconciliação preservou trabalho externo e evitou sobrescrita.
- **Waste Impact:** `high`.
- **Reuse Guidance:** em target compartilhado, recomputar hash e folhas autorizadas imediatamente antes do save e antes do handoff/audit.
- **Avoid Next Time:** não tratar o digest de um handoff anterior como cobertura atual após qualquer drift.
- **Minimum Next Step:** congelar o estado atual, reconstruir o baseline reverso pela allowlist, validar diferenças e publicar novos digests.

### 3. Falso negativo em comandos 122

- **Category:** `validation-friction`
- **What Happened:** o primeiro validador tratou quatro `parameters[4]` autorizados de comandos 122 como violação de preservação estrutural.
- **Expected Behavior:** validar separadamente os quatro operandos textuais allowlisted e comparar integralmente os campos não autorizados.
- **Actual Behavior:** a comparação incluiu os valores deliberadamente alterados e falhou após os demais checks passarem.
- **Context:** quatro das 30 folhas eram operandos textuais de `command122`.
- **Evidence:** `validation-cycles/cycle-1/failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json` e `severity-finding-v2.json`.
- **Cause:** confirmada; a regra de comparação não mascarava somente os operandos autorizados ao verificar a estrutura do comando.
- **Resolution Or Outcome:** o validator passou a verificar locator, código, indent, IDs, operação e parâmetros não allowlisted, enquanto os quatro valores são cobertos por expected-value, diff exato e reparo byte-restricted. Reteste: 146/146.
- **Was Useful:** sim; a classificação independente separou defeito do gate de defeito da implementação.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** particionar invariantes estruturais e valores autorizados antes de comparar comandos compostos.
- **Avoid Next Time:** não usar igualdade de payload completo quando parte dele é o próprio alvo allowlisted.
- **Minimum Next Step:** gerar máscara por path a partir do manifesto e testar o validator contra um fixture com operandos autorizados alterados.

### 4. Cobertura stale de 5/6 targets

- **Category:** `handoff-friction`
- **What Happened:** o primeiro handoff ficou stale depois de sua publicação; a auditoria encontrou apenas 5/6 target digests correspondentes.
- **Expected Behavior:** o handoff completo continuar representando os bytes auditados.
- **Actual Behavior:** o digest de `Map045.json` mudou, invalidando cobertura, primary validation e final validation para o estado corrente.
- **Context:** boundary audit da fase após novo drift concorrente.
- **Evidence:** `writer-handoff-v1.json`, `audit-report-v1.json#completion_summary` e `checkpoint-v1-1.json`.
- **Cause:** confirmada como drift pós-handoff; o handoff em si era íntegro para os bytes anteriores.
- **Resolution Or Outcome:** foi emitido `writer-handoff-v2.json`, os seis digests foram revalidados e a auditoria inteira foi reproduzida, chegando a 6/6.
- **Was Useful:** sim; o gate impediu aprovação sobre bytes obsoletos.
- **Waste Impact:** `high`.
- **Reuse Guidance:** revalidar target digests imediatamente antes de publicar checkpoint, inclusive após um handoff terminal.
- **Avoid Next Time:** não auditar apenas a correção delta quando a cobertura material foi invalidada.
- **Minimum Next Step:** invalidar o checkpoint anterior, reconciliar todos os targets e replayar a boundary completa.

### 5. Digest inválido no preflight v2

- **Category:** `format-friction`
- **What Happened:** o `coverage_digest` do preflight v2 do auditor reutilizou valor incompatível com seus arrays normalizados.
- **Expected Behavior:** o digest ser recomputado canonicamente a partir de `topics`, `surfaces` e `domain_ids` da própria versão.
- **Actual Behavior:** v2 registrou `sha256:0503f43b92642bb3cc0ba3dbab73d420bf275bdb2066b0ed05744ccba552d871`; o valor canônico era `sha256:2a58958eb5cb9cc5ce57e22dd48086e32b2860f0928a36d52451f14d253f7f72`.
- **Context:** refresh do preflight para o replay completo da auditoria.
- **Evidence:** `preflights/run-17d91eab7bf669664b09e697206afed0/phase-auditor/preflight-v2.md`, `preflight-v3.md` e `audit-report-v2.json#checks[AUD-MAP045-R2-01]`.
- **Cause:** provável; reutilização do digest de versão anterior sem nova canonicalização.
- **Resolution Or Outcome:** v3 substituiu o preflight inválido e o auditor verificou o digest canônico.
- **Was Useful:** sim; a checagem mecânica impediu um gate formalmente inconsistente.
- **Waste Impact:** `low`.
- **Reuse Guidance:** calcular o digest a partir do objeto normalizado no mesmo ato de publicação.
- **Avoid Next Time:** não copiar `coverage_digest` entre versões, ainda que a cobertura pareça semanticamente equivalente.
- **Minimum Next Step:** canonicalizar arrays, recomputar digest e validar o record antes do dispatch.

### 6. Relatório de falha sobrescrito

- **Category:** `source-friction`
- **What Happened:** o locator inicial do relatório de falha passou a conter o relatório final de sucesso.
- **Expected Behavior:** a evidência usada na classificação permanecer endereçável e imutável.
- **Actual Behavior:** `severity-finding-v1.json` conservava o digest, mas o arquivo declarado havia sido sobrescrito pelo reteste.
- **Context:** ciclo de correção do validator seguido de geração do relatório final no mesmo path.
- **Evidence:** `audit-report-v1.json#findings[FINDING-MAP045-PHASE-002]`, `severity-finding-v2.json` e o arquivo digest-addressable em `validation-cycles/cycle-1/`.
- **Cause:** confirmada; evidência histórica e resultado corrente compartilhavam locator mutável.
- **Resolution Or Outcome:** os bytes da falha foram reconstruídos e verificados contra SHA-256, então persistidos como `failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json`.
- **Was Useful:** sim; a correção restaurou auditabilidade da classificação.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** persistir cada failure report por digest antes de substituir o relatório corrente.
- **Avoid Next Time:** não referenciar evidência terminal histórica por um path reutilizado por execuções posteriores.
- **Minimum Next Step:** copiar o resultado falho para locator content-addressed e verificar hash antes do reteste.

### 7. Telemetria indisponível

- **Category:** `tool-friction`
- **What Happened:** o adapter não forneceu uso run-scoped verificado nem relógio monotônico.
- **Expected Behavior:** obter tokens exatos e durações monotônicas por span sem duplicação.
- **Actual Behavior:** tokens, elapsed, active e critical path ficaram `unavailable`; somente contagens estruturais foram observadas.
- **Context:** consolidação de `metrics/execution-metrics.json`.
- **Evidence:** `builds/metrics/execution-metrics.json#status`, `#degradation_reason` e `#aggregates`.
- **Cause:** confirmada como limitação de exportação do adapter; não há evidência de falha funcional.
- **Resolution Or Outcome:** a indisponibilidade foi tipada, sem estimativas; telemetria não mudou o status funcional.
- **Was Useful:** parcialmente; as contagens são úteis, mas custo e duração não podem ser analisados.
- **Waste Impact:** `low`.
- **Reuse Guidance:** preservar `unavailable` e razões explícitas quando a fonte não exportar medidas verificáveis.
- **Avoid Next Time:** não inferir tokens ou durações a partir de timestamps incompletos ou payload bytes.
- **Minimum Next Step:** usar export run-scoped e relógio monotônico somente se o adapter os oferecer de modo verificável.

### 8. Gate humano sem registro persistido

- **Category:** `minimum-next-path`
- **What Happened:** o run chegou ao gate humano e recebeu retorno conversacional positivo, mas não existe interaction record persistido do Playtest.
- **Expected Behavior:** registrar rotas executadas, critérios verificados, resultado, data e decisão de gate.
- **Actual Behavior:** o guia continua `Status atual: pendente`, e o estado terminal permanece `pending-human-validation`.
- **Context:** após implementação, 146/146 checks e auditoria aprovada.
- **Evidence:** `interaction/fase1/playtest-map045.md`, `tasks.md#Resume-Contract`, `result-v3.json` e `audit-report-v2.json#checks[AUD-MAP045-R2-11]`.
- **Cause:** confirmada como ausência de persistência; o retorno conversacional não contém evidência estruturada suficiente para relabeling.
- **Resolution Or Outcome:** gate mantido aberto nesta retrospectiva.
- **Was Useful:** sim; evita declarar runtime validado sem evidência reproduzível.
- **Waste Impact:** `low`.
- **Reuse Guidance:** ao receber feedback de Playtest, persistir imediatamente um interaction record ligado ao guia e aos critérios executados.
- **Avoid Next Time:** não converter aprovação genérica em prova de rotas ou comportamentos específicos.
- **Minimum Next Step:** executar ou confirmar explicitamente o checklist e persistir o resultado antes de mudar o status terminal.

## Caminho mínimo recomendado

1. Antes do reparo, validar sandbox/scratch e congelar hash, estrutura e 30 valores-fonte.
2. Gerar baseline reversível e máscara diretamente do manifesto; separar valores autorizados de invariantes estruturais.
3. Revalidar o target imediatamente antes do save; em drift, preservar estado externo e reconstruir o baseline, sem aplicar patch cego.
4. Persistir failure reports por digest antes de qualquer reteste.
5. Executar primary/final, emitir handoff, recomputar todos os target digests imediatamente antes do checkpoint e replayar a boundary inteira se houver drift.
6. Calcular cada `coverage_digest` a partir dos arrays normalizados da própria versão.
7. Executar o guia humano e persistir um interaction record; somente então reconciliar `pending-human-validation`.

## Aprendizados e candidatos

- **Aprendizado validado:** baseline reversível por allowlist mais replay completo preservou alterações concorrentes e restaurou cobertura; evidências em `writer-completion-v2.json`, `audit-report-v1.json` e `audit-report-v2.json`.
- **Aprendizado validado:** a estrutura de `command122` deve ser comparada com máscara somente nos operandos autorizados, cujos valores exigem validação independente; evidências no failure report e em `severity-finding-v2.json`.
- **Falha operacional resolvida:** o preflight v2 tinha digest incompatível; v3 foi validado mecanicamente no replay.
- **Falha operacional resolvida:** o relatório de falha perdeu o locator original e recuperou addressability por conteúdo.
- **Hipótese não elevada:** a origem/autoria dos drifts concorrentes permanece desconhecida; somente seus efeitos nos bytes são observáveis.
- **Preferência humana observada:** retorno conversacional positivo; não equivale a interaction record de Playtest.
- Os candidatos abaixo são propostas `unreviewed`; não são regras, não alteram estado durável e só podem seguir para `loki-continuous-improvement`.

### Candidatos especializados de inferência

```yaml
analytic_inference_candidates:
  - schema_version: 1
    candidate_id: "analytic-inference-candidate-v1:f47bedae4c91dd35ce75a6c3a1acc409bd0f292d847655e42667e7b06b69355e"
    candidate_type: analytic-inference
    observation_type: inference-good
    status: unreviewed
    capture_id: "map045-retrospective-fase1-v1"
    source:
      retrospective_locator: "planos/003-falas-casa-forjaprata/retrospetivas/fase1/retrospectiva-fase1-map045-encoding.md"
      consumer_root:
        canonical: "E:/Projetos/projectX"
        resolution_source: canonical-pwd
        state_root: "E:/Projetos/projectX/.loki/analytic-inference/v2"
    lineage:
      run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
      phase: fase1
      task_id: task-1.1
      agent_run_id: "agent-run-v1:80ef592177bbf604c1530d3e32b4b0a330d8827d48444f87b60d731a67f7e3a6"
      handoff_id: "handoff-v1:bde81054b8bf64cb4077999efb40af7f81b33d1a4582f91a83638ad27da75dbc"
      evidence_id: "execution-audit-v1:20e15a1f3590c599191d5f19eb38b00f2b1b852cf3b69735519c6e558e2fd26d"
    statement_or_testable_question: "Em reparos allowlisted de JSON sob drift concorrente, reconstruir o baseline a partir do estado atual, preservar as edições externas e repetir validação e auditoria completas evita sobrescrita e cobertura obsoleta."
    observation:
      expected: "O reparo altera somente as folhas allowlisted e a cobertura terminal corresponde ao estado atual, mesmo quando o target recebe edição concorrente."
      actual: "Dois drifts foram preservados por reconciliação; o primeiro audit bloqueou cobertura stale de 5/6 e o replay terminou com 6/6 targets, quatro ACs e 146/146 checks aprovados."
      missing_opportunity: not-applicable
    applicability:
      technologies: ["rpg-maker-mz", "json"]
      versions: ["RPG Maker MZ"]
      surfaces: ["frontend/data/Map045.json", "allowlisted JSON repair", "phase-boundary audit"]
      objectives: ["preserve concurrent user edits", "prevent stale validation coverage", "repair encoding without out-of-scope changes"]
      signals: ["target digest drift", "allowlisted values remain recoverable", "handoff target mismatch"]
      exclusions: ["non-allowlisted semantic rewrite", "unreconstructable baseline", "drift with conflicting authorized leaves"]
    provenance:
      source_refs:
        - "planos/003-falas-casa-forjaprata/builds/fase1/writer-completion-v2.json"
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v1.json"
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v2.json"
      evidence_refs:
        - "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v2.json"
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-1.json"
      freshness: current
    evidence_classification:
      facts:
        - "O audit v1 encontrou somente 5/6 target digests correspondentes após drift pós-handoff."
        - "O estado corrente preservou evento 20, o branch E7/P1 e a remoção da página vazia."
        - "O audit v2 aprovou 6/6 targets, quatro ACs e 146/146 checks."
      inferences:
        - "Reconstrução reversa pela allowlist e replay completo foram os mecanismos que evitaram sobrescrever o estado externo e aceitar cobertura stale neste run."
      hypotheses: []
    validation:
      state: validated
      validator_refs:
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v2.json"
        - "planos/003-falas-casa-forjaprata/builds/fase1/final-validator-record-v2.json"
      reason: "A auditoria independente confirmou o baseline reconstruído, a preservação do estado mais recente, os seis digests e o replay integral."
    investigation:
      confirm_or_reject_evidence:
        - "Repetir a estratégia em outro reparo allowlisted com drift observado e comparar os target digests antes/depois da reconciliação."
        - "Rejeitar se a reconstrução não reproduzir o baseline ou se qualquer mudança não allowlisted for sobrescrita."
      potential_impact: "Reduz risco de perda de edições concorrentes e de aprovação sobre bytes fora da cobertura."
      cost: unknown
      stop_condition: "A avaliação termina quando outro caso independente confirma ou contradiz a preservação de todas as mudanças externas e a cobertura terminal completa."
      suggested_capabilities: ["loki-continuous-improvement", "deterministic JSON diff validation", "independent phase audit"]
    distinction:
      exact_duplicate_hints: []
      near_duplicate_hints:
        - "planos/003-falas-casa-forjaprata/execution-knowledge/entries/map045-encoding-friction-v1.xml"
      distinction_reason: "A entrada de execution knowledge cobre o primeiro drift e o reteste de 144 checks; este candidato inclui o segundo drift pós-handoff, a cobertura stale de 5/6, a preservação final do estado e o replay aprovado de 146 checks."
    guidance:
      reuse: "Sob drift, interromper a cobertura atual, reconstruir o baseline pelo manifesto, preservar diferenças externas, refazer validators e replayar a auditoria completa."
      avoid: "Não reaplicar baseline congelado nem reutilizar handoff/checkpoint quando o digest do target divergir."
    downstream:
      owner: loki-continuous-improvement
      eligible_for_ci_evaluation: true
      durable_mutation_authorized: false

  - schema_version: 1
    candidate_id: "analytic-inference-candidate-v1:b4a9b414e53da84ec34aef770ab9ed1ccedc2a5197c46630e185c4b38a27261c"
    candidate_type: analytic-inference
    observation_type: inference-bad
    status: unreviewed
    capture_id: "map045-retrospective-fase1-v1"
    source:
      retrospective_locator: "planos/003-falas-casa-forjaprata/retrospetivas/fase1/retrospectiva-fase1-map045-encoding.md"
      consumer_root:
        canonical: "E:/Projetos/projectX"
        resolution_source: canonical-pwd
        state_root: "E:/Projetos/projectX/.loki/analytic-inference/v2"
    lineage:
      run_id: "loki-run-v2:53cbcab6fb34b0b3f2f6028078604aff6ca97ccac235396ffe68862650552ee5"
      phase: fase1
      task_id: task-1.1
      agent_run_id: unavailable
      handoff_id: unavailable
      evidence_id: "execution-audit-v1:20e15a1f3590c599191d5f19eb38b00f2b1b852cf3b69735519c6e558e2fd26d"
    statement_or_testable_question: "Um preflight atualizado deve recomputar coverage_digest a partir dos arrays normalizados; reutilizar o digest de uma versão anterior pode invalidar mecanicamente o gate."
    observation:
      expected: "Cada versão do preflight contém o SHA-256 canônico derivado de seus próprios arrays normalizados."
      actual: "O preflight v2 reutilizou sha256:0503f43b92642bb3cc0ba3dbab73d420bf275bdb2066b0ed05744ccba552d871, enquanto o digest canônico era sha256:2a58958eb5cb9cc5ce57e22dd48086e32b2860f0928a36d52451f14d253f7f72; v3 corrigiu o valor e AUD-MAP045-R2-01 o validou."
      missing_opportunity: not-applicable
    applicability:
      technologies: []
      versions: ["session_preflight schema_version 1"]
      surfaces: ["phase-auditor preflight", "coverage digest canonicalization"]
      objectives: ["publish mechanically valid preflight", "preserve gate integrity"]
      signals: ["preflight refresh", "coverage arrays copied or reordered", "digest mismatch"]
      exclusions: ["preflight sem coverage arrays", "digest não usado como gate"]
    provenance:
      source_refs:
        - "planos/003-falas-casa-forjaprata/preflights/run-17d91eab7bf669664b09e697206afed0/phase-auditor/preflight-v2.md"
        - "planos/003-falas-casa-forjaprata/preflights/run-17d91eab7bf669664b09e697206afed0/phase-auditor/preflight-v3.md"
      evidence_refs:
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v2.json#AUD-MAP045-R2-01"
      freshness: current
    evidence_classification:
      facts:
        - "Preflight v2 registrou coverage_digest sha256:0503f43b92642bb3cc0ba3dbab73d420bf275bdb2066b0ed05744ccba552d871."
        - "Preflight v3 registrou o valor canônico sha256:2a58958eb5cb9cc5ce57e22dd48086e32b2860f0928a36d52451f14d253f7f72."
        - "AUD-MAP045-R2-01 verificou v3 e marcou v2 como superseded_invalid_preflight_ref."
      inferences:
        - "Reutilizar digest de versão anterior foi uma inferência operacional incorreta sobre equivalência de cobertura."
      hypotheses: []
    validation:
      state: validated
      validator_refs:
        - "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v2.json#AUD-MAP045-R2-01"
        - "planos/003-falas-casa-forjaprata/preflights/run-17d91eab7bf669664b09e697206afed0/phase-auditor/preflight-v3.md"
      reason: "O replay auditou o digest recomputado, verificou o record e identificou explicitamente v2 como preflight inválido supersedido."
    investigation:
      confirm_or_reject_evidence:
        - "Recalcular o SHA-256 a partir dos arrays normalizados para cada nova versão e comparar com o campo persistido."
        - "Rejeitar o candidato se o algoritmo canônico reproduzir o digest v2 para o payload v2 integral."
      potential_impact: "Evita dispatch ou checkpoint baseado em envelope formalmente inválido."
      cost: unknown
      stop_condition: "A avaliação termina quando o cálculo canônico é aplicado a fixtures de refresh e detecta toda reutilização divergente sem falso positivo."
      suggested_capabilities: ["loki-continuous-improvement", "deterministic preflight validator"]
    distinction:
      exact_duplicate_hints: []
      near_duplicate_hints: []
      distinction_reason: "As fontes desta execução documentam uma divergência exata v2/v3 e um check de auditoria que valida a correção; nenhum registro duplicado foi observado nas fontes autorizadas."
    guidance:
      reuse: "Recomputar coverage_digest do payload normalizado no mesmo passo que publica cada preflight."
      avoid: "Não copiar digest entre versões, mesmo quando topics, surfaces e domain_ids parecem inalterados visualmente."
    downstream:
      owner: loki-continuous-improvement
      eligible_for_ci_evaluation: true
      durable_mutation_authorized: false
```

- Validação dos candidatos: dois IDs fornecidos são únicos; ambos possuem schema v1 completo, capture/locator, lineage observável, provenance, validação, investigação, distinction, guidance e downstream. Custos permanecem `unknown`.
- Lineage indisponível: `agent_run_id` e `handoff_id` do candidato `inference-bad`, porque o erro de preflight não foi atribuído por fonte persistida a um agent run ou handoff específico.
- Consumer/state root provenance: `E:/Projetos/projectX`, resolução `canonical-pwd`, state root derivado `E:/Projetos/projectX/.loki/analytic-inference/v2`.
- Gates para avaliação downstream: ambos permanecem `unreviewed`; avaliação, deduplicação e qualquer destino durável pertencem exclusivamente a `loki-continuous-improvement`.
- Catálogo escrito/promovido/pontuado/reorganizado/purgado: false.
- Route permitido: `loki-continuous-improvement` para avaliação; nenhuma promoção automática.

## Handoffs, gates e approvals

- Handoff de Writer v2: concluído e coberto pelo checkpoint final.
- Auditoria de replay: concluída e aprovada.
- Gate de escrita estática: satisfeito conforme `tasks.md`.
- Gate humano de Playtest: pendente; a retrospectiva não recebeu interaction record persistido.
- Handoff proposto, não executado: enviar os dois candidatos `unreviewed` a `loki-continuous-improvement` apenas se o usuário solicitar avaliação/promoção. Nenhuma aprovação de mutação durável existe.

## Riscos ou blockers

- Runtime ainda não possui evidência persistida para wrapping, clipping, bust staging, escolhas, progressão, áudio, reentrada e save/load.
- `Map006` permanece intencionalmente divergente e pode reintroduzir mojibake em cópia manual futura; tratá-lo exige demanda separada.
- Worktree compartilhada pode voltar a invalidar cobertura; qualquer retomada deve recomputar os seis digests.
- Tokens e durações não podem fundamentar análise de custo porque são `unavailable`.
- Não há blocker para a retrospectiva; há gate pendente para encerrar a validação humana do run.

## Próximos passos

1. Owner humano: executar ou confirmar explicitamente o checklist em `interaction/fase1/playtest-map045.md` e persistir um interaction record com rotas e resultado.
2. Orquestrador da feature: reconciliar o estado terminal somente depois dessa evidência, sem inferir aprovação de runtime a partir de feedback genérico.
3. Owner opcional `loki-continuous-improvement`: avaliar e deduplicar os dois candidatos `unreviewed`; nenhuma escrita durável é pré-autorizada.

## Resume state

- Entrada: fase 1/task-1.1 do plano `003-falas-casa-forjaprata`, reparo allowlisted de encoding no `Map045`.
- Resultado observado: 30 folhas reparadas, 146/146 checks, 6/6 targets e quatro ACs aprovados após reconciliação e replay completo.
- Estado persistido: `pending-human-validation`; task estática `passed`.
- Decisão material: preservar o estado concorrente mais recente, inclusive evento 20, branch E7/P1 e a página vazia removida.
- Atritos resolvidos: sandbox/scratch, dois drifts, falso negativo code122, cobertura 5/6 stale, preflight v2 inválido e failure report sobrescrito.
- Métricas: agents 3; handoffs 2; validators executados 2; repetidos 1; retries 0; replays 2; reconciliations 1; tokens/durações unavailable.
- Evidência terminal: `result-v3.json`, `audit-report-v2.json`, `checkpoint-v1-1.json`, `final-validator-record-v2.json` e `map045-validation-report.json`.
- Gate aberto: Playtest humano sem interaction record persistido.
- Candidatos: dois itens `unreviewed`; route exclusiva `loki-continuous-improvement`; mutação durável não autorizada.
- Próxima ação mínima: persistir o resultado estruturado do Playtest e então reconciliar o status do run.
