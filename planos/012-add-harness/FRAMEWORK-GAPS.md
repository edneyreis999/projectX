# Lacunas do framework

Este arquivo concentra lacunas de capacidade; causas e incidentes permanecem em [POST-MORTEM.md](POST-MORTEM.md), e mudanças normativas em [RULES.md](RULES.md).

| ID    | Lacuna original                                                         | Estado em 2026-08-28                                                                  | Risco residual                                                                  | Estado-alvo                                                           | Prioridade |
| ----- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------- |
| FG-01 | Não havia harness genérico para lifecycle de página/intérprete/refresh. | Parcial: ADR aceita, helper compartilhado e regressões por frame.                     | Transfer, batalha e reidratação ainda não possuem simulação genérica completa.  | Simulador reutilizável de página por frame e executor owner-aware.    | P0         |
| FG-02 | Definition of Done do loop verifica só frontmatter e sessões.           | Parcial: estados separados existem na ADR/evidência, mas o loop não os consome.       | “Concluído” diverge de aceite real.                                             | Gate derivado da spec com estados separados.                          | P0         |
| FG-03 | Evidência não era content-addressed nem expirava.                       | Resolvida no gate atual pela remoção da evidência persistida e recálculo no checkout. | Persistência futura pode reintroduzir cache stale.                              | Persistir somente com consumidor real, HEAD/input hashes e freshness. | P0         |
| FG-04 | Autoridade entre contratos, canonical fixtures e runtime não era única. | Resolvida pelo modelo contract-first; writers estão `ready`.                          | Mudança futura de modelo ainda exige ADR de migração.                           | Modelo contract-first ou runtime-first declarado por ADR.             | P0         |
| FG-05 | Pacotes `.compozy/tasks` e memory são ignorados integralmente.          | Resolvida por A1: tooling ativo rastreável e manifesto com hashes de 010/011.         | O conteúdo histórico completo continua disponível apenas no workspace original. | Tooling durável mais proveniência content-addressed.                  | P1         |
| FG-06 | Logging da execução é incompleto e sem tempo/commit.                    | Parcial: o manifesto preserva identidade, mas não reconstrói logs 010/011.            | A timeline histórica ainda depende de evidência local e commits.                | Event log padronizado por task/attempt/commit em execuções futuras.   | P1         |
| FG-07 | Skill exigida pelo loop não é descobrível localmente.                   | Aberta: dependência ainda não foi pinada nem ganhou preflight.                        | Workers bloqueiam ou usam fallback não uniforme.                                | Dependência pinada e preflight de disponibilidade.                    | P1         |
| FG-08 | Registries textuais ativos não têm validação compartilhada.             | Aberta: o caso de TP foi corrigido, mas não há validador genérico.                    | Qualquer preset/profile/mode pode quebrar em runtime.                           | Extrator/validador genérico de foreign keys configuráveis.            | P1         |
| FG-09 | Grafo de tasks não valida interseção de superfícies.                    | Aberta: não há `owned_targets`, lease ou validador do DAG.                            | Paralelismo futuro pode causar conflito ou drift.                               | `owned_targets`, leases e validador de interseção.                    | P1         |
| FG-10 | Suíte da feature é lista manual extensa e contém teste recursivo.       | Aberta: o mapa seleciona a suíte, mas o target ainda enumera 14 arquivos.             | Manutenção frágil e falhas cascata difíceis de ler.                             | Manifesto de suítes/tag de projeto e runner não recursivo.            | P2         |
| FG-11 | Baseline global vermelho é tratado apenas em memories.                  | Aberta: não foi criado baseline ou delta gate versionado.                             | Regressão nova pode ser confundida com dívida existente.                        | Baseline versionado, budget de dívida e delta gate.                   | P1         |
| FG-12 | Gate de diff final não cobria toda a branch por padrão.                 | Resolvida: workflow executa base...HEAD e o status é obrigatório em `develop`.        | Mudança futura na ruleset pode remover a exigência.                             | Preservar `Authoring integrity` obrigatório no pre-merge.             | P1         |
| FG-13 | Saves rastreados não têm contrato uniforme de fixture.                  | Resolvida para `file0`/`file1`: locais, removidos do índice e ignorados.              | Saves já rastreados em outros slots ainda exigem decisão se forem alterados.    | Diretório de fixtures e metadata, ou exclusão do diff.                | P1         |
| FG-14 | Não havia gate automático de “docs consumidos por testes/writers”.      | Resolvida: manifesto, executor, workflow e required check foram materializados.       | Mudança futura na ruleset pode remover a exigência.                             | Preservar o mapa target→checks obrigatório na branch protection.      | P0         |
| FG-15 | O status humano agregava falha corrigida e reteste pendente.            | Resolvida neste ciclo: harness e relato humano possuem registros separados.           | Falta institucionalizar o mesmo fluxo para futuras quests.                      | Estado humano fora do harness e consumido pelo fluxo de QA/release.   | P1         |

## Lacunas já parcialmente cobertas

| Capacidade              | Cobertura existente                                                        | O que falta                                                                     |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Machine state           | ADR, guia, helper de lifecycle e testes de V29.                            | Promover schema QuestVN v1.1.0 e ampliar retornos/refresh por regressões reais. |
| Diálogo EX              | Regra de Gab com force/bypass por origem.                                  | Validador compartilhado de payload tipado.                                      |
| Apresentação perceptiva | Convenção de “Magia”, estados separados e reteste humano aprovado.         | Preservar a mesma separação de evidência em futuras quests.                     |
| Assets                  | Technical Artist e manifest 011.                                           | Promoção durável da regra “alcançável ausente = P0”.                            |
| Writers                 | Contract-first, preflight, atomicidade, idempotência e writer convergente. | Ampliar invariantes somente onde houver relação determinística demonstrável.    |
| QA                      | Harness estático e relato humano possuem registros separados.              | Incorporar essa separação ao fluxo genérico de QA/release.                      |

## Sequência recomendada de evolução

1. Preservar `Authoring integrity` como required check, mantendo FG-12/FG-14 fechadas.
2. Incorporar o registro separado de gates humanos ao fluxo de futuras quests.
3. Resolver FG-07 e promover FG-08 apenas com owner e regressões concretas.
4. Ampliar FG-01 somente quando novas fronteiras reais exigirem cobertura.
5. Tratar FG-06/FG-09–FG-11 como hardening de processo com owner e task próprios.

FG-05 não bloqueia mais clones limpos: a suíte e os writers não consomem 010/011. O playtest B-01 a B-18 passou em 2026-08-28; FG-06/FG-07 permanecem melhorias de processo.
