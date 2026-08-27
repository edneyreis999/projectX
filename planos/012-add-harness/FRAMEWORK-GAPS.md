# Lacunas do framework

Este arquivo concentra lacunas de capacidade; causas e incidentes permanecem em [POST-MORTEM.md](POST-MORTEM.md), e mudanças normativas em [RULES.md](RULES.md).

| ID    | Lacuna original                                                         | Estado em 2026-08-27                                                                    | Risco residual                                                                 | Estado-alvo                                                            | Prioridade |
| ----- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------- |
| FG-01 | Não havia harness genérico para lifecycle de página/intérprete/refresh. | Parcial: ADR aceita, helper compartilhado e regressões por frame.                       | Transfer, batalha e reidratação ainda não possuem simulação genérica completa. | Simulador reutilizável de página por frame e executor owner-aware.     | P0         |
| FG-02 | Definition of Done do loop verifica só frontmatter e sessões.           | Parcial: estados separados existem na ADR/evidência, mas o loop não os consome.         | “Concluído” diverge de aceite real.                                            | Gate derivado da spec com estados separados.                           | P0         |
| FG-03 | Evidência não era content-addressed nem expirava.                       | Resolvida no helper e no validador v2; inputs ignorados mantêm release bloqueado.       | A evidência local não é reproduzível em clone limpo.                           | Evidência com HEAD/input hashes e `stale_evidence`.                    | P0         |
| FG-04 | Autoridade entre contratos, canonical fixtures e runtime não era única. | Resolvida pelo modelo contract-first; writers estão `ready`.                            | Mudança futura de modelo ainda exige ADR de migração.                          | Modelo contract-first ou runtime-first declarado por ADR.              | P0         |
| FG-05 | Pacotes `.compozy/tasks` e memory são ignorados integralmente.          | Aberta: zero arquivos das tasks 010/011 são rastreados.                                 | Intenção, ADRs e evidência não são reproduzíveis a partir da branch.           | Snapshot sanitizado versionado ou manifest com hashes/arquivo durável. | P1         |
| FG-06 | Logging da execução é incompleto e sem tempo/commit.                    | Aberta: não foi criado event log durável para 011/012.                                  | Timeline depende de memória narrativa e inferência.                            | Event log padronizado por task/attempt/commit.                         | P1         |
| FG-07 | Skill exigida pelo loop não é descobrível localmente.                   | Aberta: dependência ainda não foi pinada nem ganhou preflight.                          | Workers bloqueiam ou usam fallback não uniforme.                               | Dependência pinada e preflight de disponibilidade.                     | P1         |
| FG-08 | Registries textuais ativos não têm validação compartilhada.             | Aberta: o caso de TP foi corrigido, mas não há validador genérico.                      | Qualquer preset/profile/mode pode quebrar em runtime.                          | Extrator/validador genérico de foreign keys configuráveis.             | P1         |
| FG-09 | Grafo de tasks não valida interseção de superfícies.                    | Aberta: não há `owned_targets`, lease ou validador do DAG.                              | Paralelismo futuro pode causar conflito ou drift.                              | `owned_targets`, leases e validador de interseção.                     | P1         |
| FG-10 | Suíte da feature é lista manual extensa e contém teste recursivo.       | Aberta: o mapa seleciona a suíte, mas o target ainda enumera 14 arquivos.               | Manutenção frágil e falhas cascata difíceis de ler.                            | Manifesto de suítes/tag de projeto e runner não recursivo.             | P2         |
| FG-11 | Baseline global vermelho é tratado apenas em memories.                  | Aberta: não foi criado baseline ou delta gate versionado.                               | Regressão nova pode ser confundida com dívida existente.                       | Baseline versionado, budget de dívida e delta gate.                    | P1         |
| FG-12 | Gate de diff final não cobre toda a branch por padrão.                  | Parcial: sete ocorrências corrigidas no worktree; falta commit e gate de CI.            | PR pode chegar com higiene conhecida.                                          | Check base...HEAD obrigatório no pre-merge.                            | P1         |
| FG-13 | Saves rastreados não têm contrato uniforme de fixture.                  | Aberta: dois saves continuam em `develop...HEAD` sem classificação.                     | Binários incidentais, privacidade e falsa compatibilidade.                     | Diretório de fixtures e metadata, ou exclusão do diff.                 | P1         |
| FG-14 | Não havia gate automático de “docs consumidos por testes/writers”.      | Parcial: manifesto e executor `target → checks` materializados; falta CI.               | Mudança aparentemente documental ainda pode ignorar o executor.                | Mapa de dependências target→checks obrigatório no CI.                  | P0         |
| FG-15 | O status humano agregava falha corrigida e reteste pendente.            | Resolvida no schema/evidência com `remediated_pending_retest`; falta consumo pelo loop. | Orquestrador ainda pode resumir estados incorretamente.                        | Estados distintos consumidos por todos os gates.                       | P1         |

## Lacunas já parcialmente cobertas

| Capacidade              | Cobertura existente                                                             | O que falta                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Machine state           | ADR, guia, helper de lifecycle e testes de V29.                                 | Promover schema QuestVN v1.1.0 e ampliar retornos/refresh por regressões reais. |
| Diálogo EX              | Regra de Gab com force/bypass por origem.                                       | Validador compartilhado de payload tipado.                                      |
| Apresentação perceptiva | Convenção de “Magia”, estados separados e provenance da feature.                | Executar observação humana estruturada no build fingerprintado.                 |
| Assets                  | Technical Artist e manifest 011.                                                | Promoção durável da regra “alcançável ausente = P0”.                            |
| Writers                 | Contract-first, preflight, hashes, atomicidade, idempotência e writers `ready`. | Tornar o mapa de consumidores obrigatório depois de mudanças em docs.           |
| QA                      | Separação entre static/human, freshness e status de reteste materializados.     | Integrar o estado multidimensional ao DoD do loop e executar o playtest.        |

## Sequência recomendada de evolução

1. Versionar o patch atual e o pacote 012 sanitizado.
2. Definir a política de reprodução para `.compozy/tasks` e resolver FG-05–FG-07.
3. Tornar o mapa de impacto obrigatório no CI/orquestrador, fechando FG-14.
4. Executar os gates humanos de FG-02/FG-15 no build fingerprintado.
5. Promover FG-08 e ampliar FG-01 apenas com novas regressões comprovadas.
6. Tratar FG-09–FG-13 como hardening de processo com owner e task próprios.

As lacunas FG-05–FG-07 continuam sendo o principal bloqueio de reprodução em clone limpo: o pacote 011 consumido pela suíte permanece ignorado.
