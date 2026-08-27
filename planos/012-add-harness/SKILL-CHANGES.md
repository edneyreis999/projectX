# Mudanças propostas em skills

## Estado em 2026-08-27

Nenhuma skill foi alterada nesta rodada. O harness e as ADRs foram materializados primeiro para estabilizar o contrato; as mudanças abaixo ainda precisam de tasks próprias, testes positivo/negativo e
revisão do owner de cada skill.

| Proposta                                     | Estado                                                                 | Próximo passo                                                              |
| -------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `rpg-maker-mz-data-json`                     | Pendente; lifecycle existe no helper do projeto, não na skill.         | Incorporar referência genérica e testar refresh/última página elegível.    |
| `rpg-maker-mz-plugin-workflow`               | Pendente.                                                              | Documentar owner do command e registries configuráveis com regressões.     |
| `rpg-maker-mz-project-inventory`             | Pendente.                                                              | Adicionar source kind, writer, evidência, save e reprodutibilidade.        |
| `rpg-maker-mz-visustella-skills-states-core` | Pendente.                                                              | Validar nomes contra `TpMode:arraystruct` ativo.                           |
| `cy-orchestrate-tasks`                       | Pendente e não descobrível no pacote local.                            | Pinar dependência, adicionar preflight e consumir gates multidimensionais. |
| `rpg-maker-mz-event-lifecycle-harness`       | Capacidade parcialmente materializada em ADR/helper; skill não criada. | Avaliar criação somente após mais de um consumidor durável.                |

## 1. `rpg-maker-mz-data-json`

### Lacuna

A skill atual protege estrutura JSON, comandos e diffs, mas não exige simulação de página/lifecycle quando uma edição altera estado, mapa, scene ou party.

### Mudança

Adicionar ao `SKILL.md`:

> Ao editar páginas de eventos, resolver a página por identidade semântica e simular a última página elegível antes e depois de toda mutação de variável, switch, self-switch, party, mapa ou scene.
> Pareamento textual de Begin/Finish não prova alcançabilidade.

Criar `references/event-page-lifecycle.md` com:

- semântica `>=` e busca da última página para a primeira;
- Action Button, Autorun e Parallel e seus intérpretes;
- refresh causado por condições e party;
- padrão detector/latch/controlador;
- reidratação pós-transferência/batalha;
- exemplos de testes por frame.

Prioridade: P0. Evidência: L-01, L-02, L-07.

## 2. `rpg-maker-mz-plugin-workflow`

### Lacuna

A skill cobre metadata, IDs e parâmetros serializados, mas não explicita o contexto `this` de `PluginManager.registerCommand` nem o risco de globals representarem o intérprete errado.

### Mudança

Adicionar a `references/plugin-contracts.md`:

- commands owner-aware recebem o `Game_Interpreter` chamador;
- handlers que dependem de `this` usam função normal;
- `$gameMap._interpreter` só é fallback compatível;
- testes obrigatórios para main, Parallel, owner zero, mismatch e Finish;
- mudança de trigger exige reauditoria do contrato do plugin.

Adicionar também uma seção “configured string registries” para decodificar arrays/structs e validar consumidores como foreign keys.

Prioridade: P0/P1. Evidência: L-01, L-06, L-08.

## 3. `rpg-maker-mz-project-inventory`

### Lacuna

A skill já manda consultar plugin ativo e configuração exata, mas não inventaria ownership de writers, canonical fixtures, evidências ou saves rastreados.

### Mudança

Ampliar a saída mínima do inventário com:

- `source_kind`: manual, generated, materialized ou evidence;
- `owner` e `generator/check command`;
- fingerprints de registries configuráveis usados pela task;
- saves modificados, classificados como fixture ou artefato local;
- task/spec package e se ele é reproduzível em clone limpo.

Prioridade: P1. Evidência: L-03, L-13, L-14.

## 4. `rpg-maker-mz-visustella-skills-states-core`

### Lacuna

A referência do Enhanced TP afirma que `Name:str` é usado por notetag, mas a skill não exige o cruzamento sistemático entre registry ativo e consumidores.

### Mudança

Adicionar ao `SKILL.md`:

> Para `<TP Mode: name>`, `<Force TP Mode: name>` e Plugin Commands equivalentes, extrair os nomes do `TpMode:arraystruct` ativo em `js/plugins.js`, validar correspondência exata e preferir o default
> configurado quando um override é redundante. Nunca inferir chave a partir do nome conceitual no GDD.

Estender o mesmo padrão a outros registries configuráveis do domínio.

Prioridade: P1. Evidência: L-06 e post-mortem de Mhordred.

## 5. Skill de orquestração `cy-orchestrate-tasks`

### Lacuna

O loop versionado exige essa skill, mas ela não está presente no manifesto/skills locais inspecionados. O judge só verifica frontmatter `completed` e sessões inativas. Logs 010 registram falha por
skill indisponível; a execução não é reproduzível no clone apenas com a branch.

### Mudança

- Tornar a dependência instalável e versionada/pinada no manifesto.
- Validar a existência/versão da skill antes de iniciar qualquer worker.
- Substituir DoD administrativo por manifesto de gates da spec.
- Persistir status separados de implementação, static, runtime e humano.
- Exigir log JSONL com timestamp, attempt, input SHA, output SHA, comandos e resultado.
- Validar `owned_targets` antes de paralelizar nós do DAG.
- Exigir suíte integrada e writers `ready` depois da última task que toca seus inputs.

Prioridade: P0. Evidência: L-05, L-12, L-13.

## 6. Nova skill opcional: `rpg-maker-mz-event-lifecycle-harness`

### Objetivo

Oferecer um fluxo reutilizável para regressões que dependem de intérprete, página, refresh e retomada, sem congelar cutscenes inteiras.

### Contrato mínimo

1. Inventariar owner, trigger, conditions e fronteiras de lifecycle.
2. Construir matriz de estados/flags.
3. Simular página selecionada por frame.
4. Executar Plugin Commands com intérprete correto.
5. Aplicar mutação/refresh/retorno.
6. Verificar lock, reidratação e terminal alcançável.
7. Gerar handoff de playtest sem afirmar percepção.

Prioridade: P1. Evidência: L-01 e L-02.

## Critério de qualidade das mudanças

- Exemplos devem ser genéricos; IDs 29, 62, 65, 91 e nomes da semifinal não entram como defaults.
- Cada nova regra deve possuir caso positivo e negativo mínimo.
- Skills não devem promover resultado humano nem editar plugins de fornecedor para tolerar dados inválidos.
