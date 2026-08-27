# Mudanças em ADRs — promoções e pendências

> Estado consolidado em 2026-08-27. “Materializada no worktree” não equivale a mudança versionada; “aceita” identifica uma ADR durável já incorporada em `docs/project-conventions/`.

## Resumo de promoção

As ADRs locais 010/011 capturam decisões úteis, mas estão sob `.compozy/tasks`, diretório ignorado. As decisões duráveis abaixo devem ser promovidas ou incorporadas aos ADRs versionados do projeto.

| ID      | Tipo      | Destino                                                           | Prioridade | Estado em 2026-08-27      | Fonte                          |
| ------- | --------- | ----------------------------------------------------------------- | ---------- | ------------------------- | ------------------------------ |
| ADR-P01 | Nova      | `docs/project-conventions/rpg-maker-event-lifecycle.md`           | P0         | Aceita                    | L-01, L-02, L-07               |
| ADR-P02 | Nova      | `docs/project-conventions/authoring-materialization-authority.md` | P0         | Aceita                    | L-03, L-11                     |
| ADR-P03 | Nova      | `docs/project-conventions/validation-evidence-lifecycle.md`       | P0         | Aceita                    | L-04, L-05                     |
| ADR-U01 | Atualizar | `docs/project-conventions/quest-state-machines.md`                | P1         | Pendente                  | 011 ADR-009/010                |
| ADR-U02 | Atualizar | `docs/project-conventions/scene-routing-ex-vn.md`                 | P1         | Pendente                  | 011 ADR-001/007/010            |
| ADR-U03 | Atualizar | `docs/architecture/quest-state-machine-map-guide.md`              | P1         | Materializada no worktree | Incidentes de refresh/retomada |
| ADR-U04 | Refinar   | `docs/project-conventions/magia-em-cutscenes-e-animacoes.md`      | P2         | Pendente                  | Post-mortem do elmo            |

## ADR-P01 — Lifecycle de eventos, páginas e intérpretes

### Contexto

O engine seleciona a última página elegível, condições numéricas usam `>=`, eventos Parallel têm intérprete próprio e mudanças de variável/switch/party/mapa podem gerar refresh ou reconstrução. A
branch mostrou que comandos estruturalmente presentes podem nunca alcançar cleanup.

### Decisão promovida

- Identificar explicitamente o owner e o tipo de intérprete de toda cutscene.
- Tratar transição de estado, self-switch, transfer, batalha e party refresh como fronteiras de lifecycle.
- Proibir waits posteriores sem prova de elegibilidade contínua.
- Separar detecção Parallel de apresentação Autorun estável quando a detecção muda sua própria condição.
- Resolver páginas por contrato semântico e simular seleção antes/depois de cada fronteira.
- Definir reidratação de estado transitório para todo retorno de scene/mapa.

### Consequências

- Cria testes menores e mais realistas.
- Reduz softlocks que passam por validação estrutural.
- Exige harness genérico e marcação de lifecycle nos contratos de cutscene.

## ADR-P02 — Autoridade entre contrato, writer e runtime

### Contexto

Os contratos da semifinal começaram como fonte canônica; o commit `e60f9529` os transformou em espelhos as-built do runtime. Canonical fixtures e writers não acompanharam a mudança e agora bloqueiam.

### Decisão promovida

Escolher exatamente um dos modelos abaixo por domínio:

1. **Contract-first:** documento disciplinar aprovado é fonte; writer materializa runtime; as-built é gerado automaticamente.
2. **Runtime-first:** runtime é fonte; extrator gera documentação; não existe writer que restaure copy anterior.

Não permitir um documento manual “as-built” que também seja target de writer contract-first. Snapshots devem registrar versão, source hash e gerador. Mudança de modelo exige ADR de migração,
atualização/remoção dos writers e suíte verde no mesmo commit.

### Resultado na semifinal

Foi adotado o modelo contract-first. Os documentos `2.0.0` voltaram a ser os contratos disciplinares aprovados; source inventory, fingerprints e writers foram reconciliados sem transferir autoria de
cutscene, áudio ou arte técnica para o Narrative writer. Narrative e Gameplay retornam `ready` em `--check`.

## ADR-P03 — Lifecycle de evidência e aceite

### Contexto

O `static-validation.json` v1 permanecia `pass` embora antecedesse commits posteriores e não carregasse hash do build. A spec requer playtest, mas a orquestração conclui por frontmatter.

### Decisão promovida

- Toda validação é content-addressed por HEAD e inputs.
- `pass` estático não implica runtime ou humano.
- A feature mantém status agregados separados.
- Mudança em input coberto torna evidência `stale` automaticamente.
- Gate humano registra build, save inicial, rota, observação, tester, data e evidência.
- `release_ready` exige que todos os gates obrigatórios da spec estejam `pass` ou formalmente `waived` por autoridade nomeada.

## ADR-U01 — Máquina de estados canônica

Adicionar ao ADR existente:

- `extensions.questVN.entries.*.mapId` como override compatível por entrada.
- `resumeLabel` como cursor transitório, não estado persistente.
- unicidade de event ID por mapa de destino, não global por quest.
- regra de `Exit Event Processing` após `EnterVisualNovel`.
- regra de que `QuestTransition` pode invalidar a página atual no frame seguinte.
- matriz de reentrada/refresh e reidratação após retorno.

Registrar que 011 ADR-010 foi materializada em `Coreto_QuestVN` v1.1.0, mas ainda não foi promovida ao ADR versionado.

## ADR-U02 — Roteamento EX/VN

Promover a decisão 011 ADR-001:

- conversa que avança história/quest usa VN;
- ação física, navegação, entrada, saída e staging permanecem em EX;
- cenas mistas alternam EX/VN com contratos de continuidade;
- Gab fica com bloqueio, ambientação, fala física isolada e orientação pós-VN;
- cada fronteira declara cleanup e reidratação.

Explicitar supersessão parcial da 010 ADR-011, que mantinha mais conteúdo no EX antes do feedback humano.

## ADR-U03 — Guia operacional

O guia agora documenta a fronteira entre frames, descarte do intérprete `Parallel`, padrão detector/latch/Autorun e reutilização do helper de lifecycle. Já cobria `Exit Event Processing`, `>=` e
última página elegível.

Ainda faltam no guia:

- exemplo de handler owner-aware usando `function () { ... this ... }`;
- exemplo de `resumeLabel` por entrada;
- matriz completa de estado transitório a reidratar;
- teste de retorno após party change;
- regra de foreign keys em `plugins.js`.

## ADR-U04 — Convenção de “Magia”

A convenção atual é coerente e já foi promovida. Acrescentar somente:

- um campo obrigatório `perceptual_intent` no score;
- observação humana livre antes de perguntas dirigidas;
- build fingerprint do playtest;
- proibição de marcar o critério como atendido pela mera presença de zoom, SE, shake ou animação.

## Mapa de supersessões

| Decisão local                           | Destino durável                                                                                      |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 010 ADR-009 máquina única               | Já promovida em `quest-state-machines.md`; manter.                                                   |
| 010 ADR-010 documentos por disciplina   | Já refletida em `AGENTS.md`; reconciliar com ADR-P02.                                                |
| 010 ADR-011 score EX                    | Manter score, superseder routing integral pelo híbrido 011.                                          |
| 011 ADR-001 diálogo de progressão em VN | Promover em ADR-U02.                                                                                 |
| 011 ADR-003 assets alcançáveis P0       | Promover para regra/skill de inventário e Technical Art.                                             |
| 011 ADR-008 fork corretivo              | Registrar como política de histórico imutável; extrair infraestrutura comum só por refactor próprio. |
| 011 ADR-009 controlador final único     | Incorporar em ADR-P01 como owner único para sequências travadas.                                     |
| 011 ADR-010 mapId/resumeLabel           | Promover em ADR-U01/U02.                                                                             |

## Gate de adoção

Nenhuma ADR deve ser marcada `accepted` apenas pela existência deste documento. Cada mudança exige owner, revisão, patch próprio, testes do guia/exemplo e link de supersessão nos ADRs locais
relevantes.

Em 2026-08-27, P01–P03 foram promovidas e aceitas. P01 possui testes do helper de lifecycle; P03 possui testes de geração/freshness, inclusive exclusão de target, mudança de tracking, permissão
executável e dirt não relacionado; P02 foi acompanhada da convergência dos writers e de 252/252 testes da semifinal. O registro de owners formais continua pendente em D-02. U03 está parcialmente
materializada; U01, U02 e U04 continuam propostas.
