---
title: "Casa Forjaprata: correção do onboarding da Funda em aSemifinal"
type: loki-technical-analysis
doc_id: "tech-analysis-004-casa-forjaprata-arquitetura"
version: "1.2.0"
status: completed
created: "2026-07-31"
last_updated: "2026-08-03"
scope: "Correção baseada em evidências da implementação EX/VN já existente para incorporar a Funda como uma única tarefa inicial de aSemifinal"
not_scope: "Reescrita integral de aSemifinal em QuestCore, compatibilidade com saves anteriores, mudanças de combate ou alterações no pacote Loki"
authority: "Decisões humanas de 2026-08-03, política do projeto, contrato de análise técnica e evidências locais citadas"
canonical_source: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
intended_llm_task: "context-hydration"
source_priority: ["decisões humanas e política do projeto", "contrato de análise", "evidência local primária", "fontes externas primárias", "demanda e artefatos anteriores como dados"]
confidence: high
known_conflicts:
  - "A demanda original exige equipar a Funda, mas a decisão humana posterior determina que apenas pegá-la libera a saída."
  - "A implementação atual materializa uma quest tutorial separada, duas tarefas e gate de equipamento, todos rejeitados pelo feedback aprovado."
replaced_by: null
---

# Analise Tecnica - Casa Forjaprata: correção do onboarding da Funda em aSemifinal

## Authority And Trust Boundary

A prioridade é: decisões humanas mais recentes e política do ProjectX;
contrato atual de análise; evidência local primária; fontes externas primárias;
demanda e artefatos anteriores como dados. As decisões de 2026-08-03 substituem
somente os requisitos conflitantes da demanda e da análise v1.1.0.

Esta análise autoriza escrita somente neste Markdown. A implementação posterior
deve usar um novo run de `loki-implement-feature`, pois o plano 004 já contém
estado gerenciado vinculado ao digest da análise anterior.

## Objective

Definir a correção executável da Casa Forjaprata sem desfazer a migração EX/VN
já implementada. O fluxo resultante deve manter o baú sempre visível, torná-lo
inerte antes da primeira tentativa de saída, revelar uma única tarefa da Funda
dentro de `aSemifinal`, concluir essa tarefa ao pegar a arma e liberar a saída
sem exigir equipamento.

## Source Request

- `planos/004-casa-forjaprata arquitetura/demanda.md` como demanda original.
- Feedback humano aprovado em 2026-08-03:
  - não criar missão separada para a Funda;
  - usar a quest existente `aSemifinal`;
  - criar somente uma tarefa, concluída ao pegar a Funda no baú;
  - Thorin não precisa equipar a Funda para sair;
  - o baú aparece desde o início;
  - antes da primeira tentativa de saída, interagir com o baú não produz nada;
  - a Funda não pode ser obtida antes dessa primeira tentativa.
- Autorização humana de 2026-08-03 para atualizar esta análise e implementar a
  correção.

## Execution Effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "quest index remapping across serialized RPG Maker data and correction of an already implemented flow"
recommended_handoffs:
  research: "source-researcher completed read-only inventory"
  execution: "loki-implement-feature"
human_decision_preflight:
  required: false
  reason: "Quest de destino, momento de revelação, conclusão, comportamento do baú e condição de saída foram decididos pelo usuário."
  blocking_questions: []
validator_effort: high
```

## Scope

- Corrigir a projeção PKD de `aSemifinal`, inserindo a tarefa da Funda na
  posição inicial e reconciliando todos os callers e pointers indexados.
- Corrigir `Map045` E7, E11/P8 e E20, preservando as demais unidades.
- Manter V111 como autoridade persistida do microfluxo da Funda e da sessão VN.
- Manter Map045 EX, Map049 VN e o lifecycle `EnterVisualNovel`/asserts/finish.
- Remover a quest PKD visível `tutorialFundaForjaprata` e o objetivo de equipar.
- Prescrever parse, diff restrito, checks de comandos, Plugin Manager/editor e
  Playtest New Game.

## Out Of Scope

- Migrar toda `aSemifinal` e V29 para QuestCore.
- Alterar Map046, combate, balanceamento, armas, atores ou conteúdo narrativo
  não relacionado.
- Compatibilidade com saves criados pela implementação anterior; a política
  continua New Game only.
- Declarar comportamento visual, interação, journal, reentrada ou save/load
  validados sem Playtest humano.
- Reescrever trabalho local não relacionado, inclusive o save não rastreado e
  alterações do editor em outros JSONs.

## Sources Read

| Source | Kind | Evidence Extracted | Used For |
| --- | --- | --- | --- |
| `AGENTS.md` | project-policy | Em `frontend/data`, preferir Coreto/VisuStella e aplicar o workflow estruturado de RPG Maker MZ. | Limites e procedimento. |
| `planos/004-casa-forjaprata arquitetura/demanda.md` | user-demand | Demanda original da VN, Funda, porta e journal. | Contexto; requisitos conflitantes foram substituídos pelas decisões mais recentes. |
| Decisões humanas de 2026-08-03 persistidas nesta análise | user-decision | Uma tarefa em `aSemifinal`, conclusão no baú, saída sem equipar e baú visível porém inerte inicialmente. | Autoridade funcional. |
| `planos/004-casa-forjaprata arquitetura/{tasks.md,task-1.1.md,task-2.1.md,builds/**}` | prior-run | O run anterior validou estaticamente o contrato antigo e permanece pendente de Playtest. | Baseline e motivo para novo run. |
| `frontend/data/CoretoQuests.json` | local-primary | `tutorial-funda-forjaprata` usa V111, PKD separado, objetivos localizar/equipar e estados 0/10/20/90. | Estado atual e correção do registry. |
| `frontend/js/plugins.js` | generated-config | `aSemifinal` tem sete tarefas; `tutorialFundaForjaprata` tem duas; pointers de `aSemifinal` usam índices 1–7. | Remoção da quest separada, inserção e remapeamento. |
| `frontend/js/plugins/Coreto_QuestCore.js` | local-primary | `sync()` adiciona a quest, revela/completa objetivos e completa toda a quest quando o estado é terminal. | Limite de autoridade e prevenção de conclusão antecipada. |
| `frontend/data/Map045.json` | local-primary | E7 exige equipamento; E20 não possui página visível no estado 0; E11/P8 revela antecipadamente a tarefa antiga de `aSemifinal`. | Correção da porta, baú e timing. |
| `frontend/data/Map049.json` e `Coreto_QuestVN.js` | local-primary | A sessão VN usa o questKey interno, asserts e finish pareados. | Preservação do lifecycle. |
| `frontend/data/CommonEvents.json` e Maps006/007/010/014/044 | local-primary | Callers numerados completam/revelam tarefas 1–7 de `aSemifinal`. | Remapeamento completo. |
| `frontend/data/System.json`, `Map022.json`, `Actors.json`, `Weapons.json` | local-primary | V111 existe; Map022 já não habilita S50 cedo; Thorin inicia com Weapon 1 e E11 remove a arma incluindo equipamento. | Persistência, journal e precondição New Game. |
| `frontend/js/rmmz_objects.js` | local-engine | Semântica de branches, switches, variáveis, self-switches, transfer e Change Weapons. | Validators de comandos. |
| Handoffs `source-researcher`, `technical-implementer` e `runtime-qa` de 2026-08-03 | proposal/evidence | Inventário de callers, alternativas de estado e matriz de Playtest. | Síntese, riscos e gates. |

## Evidence Classification

### Facts

- A implementação atual contém uma missão PKD separada chamada
  `tutorialFundaForjaprata`, com duas tarefas: localizar e equipar.
- V111 é a autoridade persistida do onboarding atual. E11 remove Weapon 1 de
  Thorin/inventário antes de entregar controle ao jogador.
- E7 atualmente liga S50 e abre o journal na primeira tentativa, mas depois
  exige Actor 3 equipado com Weapon 1 para transferir.
- E20 atualmente só possui páginas elegíveis em V111 >= 10; por isso o baú é
  invisível antes da primeira tentativa.
- `aSemifinal` possui sete tarefas, numeradas publicamente de 1 a 7. Seus
  callers estão em `CommonEvents`, Maps006/007/010/014/044/045 e seus pointers
  estão serializados em `plugins.js`.
- O PKD considera a primeira tarefa visível por padrão quando uma quest é
  adicionada. Assim, a tarefa da Funda precisa ocupar o índice 1 para ser a
  única primeira tarefa coerente com o onboarding aprovado.
- `Coreto_QuestCore.sync()` chama `CompleteQuest` quando o estado da definição é
  terminal. Reapontar o estado terminal 20 para `aSemifinal` completaria a
  missão inteira cedo demais.
- Map049 e a migração EX/VN estão estruturalmente presentes e não precisam ser
  redesenhadas para corrigir a estrutura visível da quest.
- O worktree contém alterações do usuário/editor e um save não rastreado; todo
  writer deve preservar bytes/unidades fora da allowlist.

### Inferences

- V111 deve continuar como autoridade exclusiva do microfluxo 0/10/20. V29
  continua autoridade legada do arco maior de `aSemifinal`.
- A definição Coreto interna pode continuar usando o questKey técnico
  `tutorial-funda-forjaprata`, mas deve projetar `pkd.questId: aSemifinal` e
  somente o novo objetivo 1. O nome interno não cria outra missão visível.
- `terminalStates: [90]` pode ser preservado como sentinela não alcançada por
  este microfluxo. Remover `LEAVE_EQUIPPED` e não transicionar para 90 evita que
  QuestCore complete toda `aSemifinal`.
- Inserir a tarefa na posição 1 desloca os sete objetivos existentes para 2–8.
  Atualizar somente o texto PKD sem remapear callers e pointers quebraria a
  progressão posterior.
- E11/P8 não deve adicionar/ativar/revelar `aSemifinal`; a primeira tentativa de
  saída torna-se o único momento de criação/projeção visível da quest.
- No pickup, `FOUND_SLING` conclui a nova tarefa 1 e o próprio evento mostra a
  tarefa 2, preservando o padrão SQSM legado para o restante do arco.

### Hypotheses

- **Runtime-pending:** uma página-base de baú com lista vazia e `directionFix`
  evita qualquer feedback perceptível antes da saída. Exige Playtest.
- **Runtime-pending:** a renumeração dos pointers preserva navegação e tracker
  depois da inserção. Exige inspeção no journal e continuidade do arco.

### Open Questions

- None. Detalhes perceptíveis restantes são gates de editor/Playtest, não
  decisões funcionais abertas.

## Affected Surfaces

### Runtime, Engine or Framework

- Produção provável:
  `frontend/data/CoretoQuests.json`, `Map045.json`, `CommonEvents.json`,
  `Map006.json`, `Map007.json`, `Map010.json`, `Map014.json`, `Map044.json` e
  `frontend/js/plugins.js`.
- Validação/preservação: `Map049.json`, `Map022.json`, `System.json`,
  `MapInfos.json`, `Coreto_QuestCore.js`, `Coreto_QuestVN.js`,
  `Coreto_SQS_menu_patch.js`, `Actors.json` e `Weapons.json`.
- Nenhum impacto esperado no pacote Loki, manifests, skills ou commands.

### Integration Points

- QuestCore: V111, `INTRODUCE_JOURNAL`, `FOUND_SLING` e projeção do objetivo 1.
- QuestVN: questKey técnico existente e Map049/entry
  `ABERTURA_FORJAPRATA` preservados.
- PKD/SQSM: uma única quest visível `aSemifinal`, oito tarefas, pointers
  remapeados e continuidade legada por V29.
- RPG Maker MZ: páginas do baú, Change Weapons, Control Switches/Variables,
  Self Switch e Transfer Player.

### State and Data Contracts

| V111 | Significado | Baú | Quest/journal | Saída |
| ---: | --- | --- | --- | --- |
| 0 | primeira tentativa ainda não ocorreu | visível, fechado e inerte | `aSemifinal` não projetada; S50 OFF | bloqueada; tentativa executa 0→10 |
| 10 | onboarding apresentado | visível e interativo | tarefa 1 “Pegue a Funda no baú” visível; journal já apresentado uma vez | bloqueada |
| 20 | Funda concedida | aberto e one-shot | tarefa 1 concluída; tarefa 2 “Corra até o estádio...” visível | permitida sem consultar equipamento |
| 90 | sentinela terminal legada não alcançada por este microfluxo | n/a | não deve completar `aSemifinal` | n/a |

- E20 deve possuir, nesta ordem, página-base incondicional inerte, página
  interativa para V111 >= 10 e página aberta por Self Switch A.
- A concessão de Weapon 1 ocorre uma vez; a transição 10→20 e o Self Switch A
  persistem o milestone.
- `aSemifinal` passa a ter oito tarefas. A nova tarefa é 1 e as antigas 1–7
  tornam-se 2–8.
- Remapeamento obrigatório dos calls `ShowTaskForQuest` e
  `CompleteTaskForQuest`: Map006 1→2; Map014 1→2, 2→3, 3→4, 5→6, 6→7;
  Map010 3→4 e 4→5; CommonEvents 4→5 e 5→6; Map007/Map044 7→8.
- Todos os `sqsPointers:structA` de `aSemifinal` com índices 1–7 devem receber
  +1. A nova tarefa 1 recebe pointer único para Map045/E20.

## Research Gate

**Decision:** not-needed
**Reason:** a decisão depende do estado local do projeto, do engine e dos
plugins já instalados. Nenhuma versão externa, licença ou compatibilidade
upstream é necessária.

| Source | Finding | Impact |
| --- | --- | --- |
| none | Pesquisa externa não executada. | Evidência local permanece fonte de verdade. |

## Decision Matrix

| Option | Evidence | Pros | Cons | Decision |
| --- | --- | --- | --- | --- |
| Manter a missão tutorial separada | Implementação atual | Menor diff | Contradiz diretamente a decisão humana | reject |
| Anexar a tarefa como índice 8 | Callers atuais permaneceriam estáveis | Evita renumeração | PKD revela a tarefa 1 antiga por padrão; ordem narrativa incorreta | reject |
| Inserir a tarefa como índice 1 e remapear callers/pointers | Semântica PKD e inventário completo | Fluxo correto e uma única quest visível | Maior diff de dados, exige validator forte | **use** |
| Migrar toda `aSemifinal` para QuestCore | V29/callers distribuídos | Autoridade única futura | Blast radius desnecessário para esta correção | defer |
| Alterar `Coreto_QuestCore.js` com flag de não completar terminal | Comportamento terminal atual | Permitiria terminal 20 formal | Muda contrato genérico sem necessidade; risco de regressão | reject |
| Deferir/bloquear | Decisões resolvidas | Nenhum risco imediato | Mantém comportamento rejeitado | reject |

## Recommendation

Executar um novo `loki-implement-feature` em
`planos/005-casa-forjaprata-feedback-funda`, usando a demanda original e esta
análise atualizada.

O plano deve:

1. Remover a definição PKD `tutorialFundaForjaprata`.
2. Inserir “Pegue a Funda no baú” como tarefa 1 de `aSemifinal`; deslocar as
   sete tarefas existentes e todos os callers/pointers para 2–8.
3. Reapontar a definição Coreto interna de V111 para `pkd.questId:
   aSemifinal`, com somente objetivo 1 conhecido em 10 e concluído em 20;
   remover objetivo de equipar e transição `LEAVE_EQUIPPED`; manter 90 sem
   transição para não completar o arco inteiro.
4. Em E11/P8, preservar V29, descrição de save e self-switches, mas remover a
   projeção antecipada de `aSemifinal`.
5. Em E7, no estado 0, executar 0→10, ligar S50, ativar a quest e abrir o
   journal uma vez; no estado 10, apenas lembrar de pegar a Funda; no estado
   20, transferir diretamente para Map007.
6. Em E20, manter o baú fechado sempre visível e inerte no estado 0; habilitar
   interação em 10; conceder uma Funda, executar 10→20, mostrar a tarefa 2 e
   persistir o baú aberto; nenhuma mensagem deve pedir equipamento.
7. Preservar Map049 e o lifecycle EX/VN semanticamente, bem como Map022 e o
   gate S50 já corrigido.

## Risks and Mitigations

| Risk | Evidence | Mitigation | Owner/Gate |
| --- | --- | --- | --- |
| Índices posteriores quebram | Callers/pointers 1–7 distribuídos | Inventário before/after, +1 total e validator de cobertura | data writer + deterministic validator |
| Quest inteira completa ao pegar a Funda | `sync()` completa PKD em estado terminal | Estado 20 não terminal; remover transição de saída | architecture validator |
| Baú invisível ou ativo cedo | Páginas atuais começam em V111>=10 | Página-base incondicional vazia antes das páginas condicionais | editor + Playtest |
| Grant duplicado | Evento interativo e reentrada | Estado 10 exato, self-switch aberto e simulação de spam/load | gameplay writer + Playtest |
| Tarefa/journal aparece cedo | AddQuest/Active atual em E11 | Remover projeção de E11; primeira saída é o único writer de introdução | static search + Playtest |
| Saída ainda consulta equipamento | Branch atual Actor/Weapon | Remover branch e validar transferência por V111=20 | command/indent validator |
| Dupla missão residual | Quest PKD e scripts atuais | Busca global por questId, textos e transition removidos | config validator |
| Reflow ou perda de edits do usuário | JSON serializado e worktree sujo | Writer estruturado, preconditions/hash e diff restrito por unidade | serialized writer |
| Saves antigos inconsistentes | Índices PKD persistidos | Política New Game only; não prometer migração | human decision |

## Validators

- Parse JSON após cada write e diff restrito aos alvos/unidades aprovados.
- Envelope `plugins.js`, extração estruturada, ordem de plugins preservada e
  Plugin Manager round-trip.
- Config PKD: uma `aSemifinal`, oito tarefas; antigas 1–7 preservadas como 2–8;
  nenhuma `tutorialFundaForjaprata`; pointers antigos +1 e novo pointer 1 único.
- Registry: V111, transições 0→10/10→20, objetivo 1 e nenhuma conclusão
  terminal de `aSemifinal` no estado 20.
- Cobertura global de todos os `ShowTaskForQuest`/`CompleteTaskForQuest` de
  `aSemifinal`; descrições e V29 preservados.
- E7: branch/indent, zero transfer em 0/10, uma transfer em 20, nenhuma branch
  Actor/Weapon e nenhuma referência a `LEAVE_EQUIPPED`.
- E20: três páginas na ordem base/interativa/aberta, base sem comandos
  observáveis, exatamente um grant e um avanço 10→20.
- Preservação semântica/hash manifest de Map049 e das unidades EX/VN de E11 que
  não pertencem ao onboarding.
- Busca global por texto de equipar, quest separada, writers S50, grants de
  Weapon 1 e questKey técnico.
- `git diff --check` e auditoria independente na fronteira material.

## Human Gates

- **Decisões funcionais:** concluídas e aprovadas em 2026-08-03.
- **Editor/Plugin Manager:** abrir, salvar, fechar e reabrir Map045/Map049 e o
  Plugin Manager; validar gráficos, prioridade, trigger, directionFix e páginas.
- **Playtest New Game:** validar VN uma vez; baú visível e totalmente inerte
  antes da porta; primeira tentativa revela tarefa 1 e journal uma vez;
  repetição não duplica feedback; pickup concede uma Funda, conclui tarefa 1 e
  mostra tarefa 2; saída funciona sem equipar; spam/reentrada/save-load não
  duplicam; arco completo de `aSemifinal` mantém a ordem 2–8.
- O comportamento perceptível permanece `runtime-pending` até esses gates.

## Affected Docs

- Este artefato transiente é atualizado nesta análise.
- O plano 004 permanece como evidência histórica do contrato substituído e não
  deve ser reescrito como se pertencesse ao novo run.
- Documentação duradoura da Casa Forjaprata poderá ser catalogada somente após
  Playtest aprovado, em workflow próprio.

## Stop Conditions

- Parar se qualquer missão PKD separada, tarefa de equipar ou gate de
  equipamento permanecer ativo.
- Parar se o inventário/remapeamento de callers e pointers não for completo.
- Parar se o baú não estiver visível no estado 0 ou produzir qualquer efeito
  perceptível antes da primeira saída.
- Parar se a Funda puder ser concedida antes de 10 ou mais de uma vez.
- Parar se o estado 20 completar toda `aSemifinal`.
- Parar se Map049/lifecycle VN sofrer alteração não manifestada.
- Parar em parse, envelope, branch/indent, diff, editor ou Playtest falho.

## Handoff To Next Command

- **Human decision preflight required:** `false`
- **Reason:** todas as decisões materiais da correção foram aprovadas.
- **Recommended next command:** `loki-implement-feature`
- **Preflight input, if required:** none.
- **Implementation demand:**
  `planos/004-casa-forjaprata arquitetura/demanda.md`
- **Analysis file:**
  `planos/004-casa-forjaprata arquitetura/analise-tecnica.md`
- **Plan directory:** `planos/005-casa-forjaprata-feedback-funda`
- **Inherited restrictions and decisions:** Map045 permanece EX; Map049
  permanece VN; somente o onboarding é corrigido; V111 governa 0/10/20; uma
  tarefa inicial em `aSemifinal`; baú sempre visível e inerte antes da saída;
  pickup conclui a tarefa; saída não exige equipamento; New Game only; edits do
  usuário e save não rastreado devem ser preservados.
- **Validators and human validation:** validators e gates das seções acima.
- **Required skills:** `loki-implement-feature`,
  `rpg-maker-mz-project-inventory`, `rpg-maker-mz-data-json` e
  `rpg-maker-mz-plugin-workflow`.
- **Downstream execution profile:** `model_class: frontier_reasoning`,
  `execution_effort: high`, writers serializados por arquivos, auditor
  independente e `validator_effort: high`.

## Resume State

```yaml
loki_technical_analysis_state:
  status: "completed"
  source_request: "planos/004-casa-forjaprata arquitetura/demanda.md plus approved feedback of 2026-08-03"
  analysis_file: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
  research_gate: "not-needed"
  completed_steps:
    - "feedback interview completed"
    - "current implementation and quest caller inventory"
    - "technical and runtime-QA proposal synthesis"
    - "decision matrix and executable correction handoff"
  completed_handoffs:
    - "root -> source-researcher -> complete read-only inventory"
    - "root -> technical-implementer -> proposal-ready"
    - "root -> runtime-qa -> proposal-complete; human validation pending"
  human_decision_preflight_required: false
  pending_questions: []
  approved_decisions:
    - "use exactly one new initial task inside aSemifinal"
    - "complete the task when the sling is taken from the chest"
    - "do not require equipping the sling to leave"
    - "keep the chest always visible and inert before the first exit attempt"
    - "keep the sling unobtainable before that first attempt"
  recommended_option: "insert task 1 and remap all existing aSemifinal callers and pointers"
  implementation_demand_ref: "planos/004-casa-forjaprata arquitetura/demanda.md"
  recommended_plan_directory: "planos/005-casa-forjaprata-feedback-funda"
  inherited_restrictions:
    - "analysis Markdown is the only production-independent write in this workflow"
    - "preserve unrelated worktree edits and untracked save"
    - "New Game only unless separately approved"
  direct_write_exception:
    target: "planos/004-casa-forjaprata arquitetura/analise-tecnica.md"
    owner: "/root"
    reason: "No appropriate consumer technical-analysis Write Agent is available; specialist agents were read-only/proposal-only."
    validators: ["template headings", "source path checks", "git diff --check", "artifact self-containment"]
  recommended_next_command: "loki-implement-feature"
  next_action: "start a new run in planos/005-casa-forjaprata-feedback-funda"
  blocked_by: []
```
