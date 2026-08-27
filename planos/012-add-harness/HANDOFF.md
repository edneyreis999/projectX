---
title: Handoff — versionamento do harness e validação humana da semifinal
date: 2026-08-27
status: ready-for-incremental-review-and-versioning
branch: feat/migracao-semifinal-mapas-ex
head-at-last-automated-validation: af49dea89f8bf4f8007cd275a15caa2d629c57f0
base-develop: 856abb0772542aad35559ab60c9983a61a3e42ae
---

# Objetivo da próxima sessão

Revisar o delta pequeno de nomes das suítes, transformar o harness validado no worktree em uma entrega reproduzível e, depois, executar o playtest humano no mesmo commit/build fingerprintado.

A reconciliação contract-first, os writers, as suítes e o build já estão verdes. Não refaça essa investigação. O trabalho residual é versionamento, integração do gate de impacto e validação humana.

# Leia primeiro

1. [SUMÁRIO-EXECUTIVO.md](SUMÁRIO-EXECUTIVO.md) para o estado atual.
2. [CHECKLIST.md](CHECKLIST.md), principalmente A-05/A-07, B-01 a B-18 e E-06/E-07.
3. [FRAMEWORK-GAPS.md](FRAMEWORK-GAPS.md) para as lacunas ainda abertas.
4. [ADR-CHANGES.md](ADR-CHANGES.md) para distinguir ADRs promovidas de propostas.
5. Os contratos live em [`docs/Quests/2-semifinal`](../../docs/Quests/2-semifinal/) e os contratos de execução da task 011 em
   [`_spec.md`](../../.compozy/tasks/011-semifinal-playtest-remediation/_spec.md), [`_dx.md`](../../.compozy/tasks/011-semifinal-playtest-remediation/_dx.md) e
   [`_tests.md`](../../.compozy/tasks/011-semifinal-playtest-remediation/_tests.md).

# O que já foi concluído

## Autoridade e contratos

- O modelo contract-first foi aceito em `docs/project-conventions/authoring-materialization-authority.md`.
- Os cinco contratos disciplinares `2.0.0` foram reconciliados.
- Narrative e Gameplay writers retornam `ready` em `--check`.
- O golden path prova check/apply/reapply sem restaurar contratos antigos.

## Promoções duráveis do harness

- `docs/project-conventions/rpg-maker-event-lifecycle.md`: ADR aceita para página elegível, owner de intérprete, refresh, descarte de `Parallel` e reidratação.
- `frontend/test-support/rpg-maker-event-lifecycle.js`: helper compartilhado de seleção de página e trace entre frames.
- `docs/project-conventions/validation-evidence-lifecycle.md`: ADR aceita para provenance, freshness e estados separados de aceite.
- `scripts/lib/validation-evidence.js`: fingerprints de conteúdo, diretório, tracking e permissão executável, vinculados a HEAD/base.
- `config/validation-impact-map.json` e `scripts/validation-impact.js`: mapa fail-closed `target → checks`, incluindo targets excluídos.
- `docs/architecture/quest-state-machine-map-guide.md`: lifecycle entre frames e reutilização do helper adicionados ao guia operacional.

## Gates comprovados no worktree

| Gate                                | Resultado                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `npm run test:harness`              | 3/3 suítes, 22/22 testes                                                     |
| `npm run test:noite-da-historia`    | 2/2 suítes, 15/15 testes                                                     |
| `npm run test:semifinal`            | 14/14 suítes, 252/252 testes                                                 |
| `npm run test:quests`               | agrega as duas suítes públicas acima                                         |
| `npm run build:types`               | aprovado                                                                     |
| Writers Narrative e Gameplay        | `ready`                                                                      |
| Evidência `semifinal-validation/v2` | `stale_evidence` após o feedback; regeneração deve ocorrer no HEAD commitado |
| Executor de impacto                 | quatro checks aprovados; zero targets desmapeados                            |
| Diff-check, Prettier e links locais | aprovados no worktree                                                        |
| Revisão `deslop`                    | delta de nomes revisado; nenhum finding restante                             |

# O que ainda falta

## Bloqueios antes de release

1. Definir quais partes sanitizadas de `.compozy/tasks` devem ser versionadas. O diretório está ignorado, mas seus scripts, fixtures e evidências são inputs da validação.
2. Versionar o patch do harness e este pacote 012. Hoje os novos arquivos estão no worktree e `planos/012-add-harness` ainda não pertence ao HEAD.
3. Classificar os dois saves presentes em `develop...HEAD` como fixtures documentadas ou removê-los da mudança proposta.
4. Regenerar a evidência depois do commit. O commit mudará `headSha`; portanto, a evidência atual já está corretamente stale após a mudança dos comandos.
5. Executar B-01 a B-18 de [CHECKLIST.md](CHECKLIST.md#b-reteste-humano-obrigatório). Há seis casos `remediated_pending_retest` e nove `not_executed`.

## Evolução de framework ainda aberta

- Tornar o mapa `target → checks` obrigatório no CI/orquestrador.
- Fazer o loop consumir `implemented`, `static_verified`, `runtime_verified`, `human_accepted` e `release_ready`, em vez de apenas frontmatter.
- Registrar owners formais das ADRs P01–P03.
- Atualizar/testar as skills listadas em [SKILL-CHANGES.md](SKILL-CHANGES.md).
- Criar tasks com owner e prazo para as lacunas ainda abertas.
- Implementar validação compartilhada de registries textuais configuráveis.

# Sequência recomendada

## 1. Fechar a superfície versionada

- Revisar o diff sem sobrescrever mudanças preexistentes do usuário.
- Não usar `git add -f .compozy/tasks` indiscriminadamente.
- Escolher entre snapshot sanitizado e manifesto versionado com hashes e localização durável.
- Excluir logs privados, secrets, raciocínio privado e artefatos sem função de reprodução.

## 2. Criar o commit que será validado

Depois de aprovar a superfície, crie o commit conforme `.gitmessage` e registre seu SHA. Os comandos da etapa seguinte devem operar sobre esse HEAD já commitado; caso contrário, arquivos untracked não
entram em `develop...HEAD` e um commit posterior torna a evidência stale.

A evidência gerada não deve fazer parte dos próprios inputs. Se a política aprovada exigir persistência, publique-a como artefato/attestation que referencia o SHA testado, sem alegar que o commit da
attestation é o subject validado.

## 3. Regenerar evidência e revalidar o HEAD commitado

Com o commit alvo em HEAD, executar:

```sh
node .compozy/tasks/011-semifinal-playtest-remediation/scripts/apply-semifinal-remediation-narrative.mjs --check
node .compozy/tasks/011-semifinal-playtest-remediation/scripts/apply-semifinal-remediation-gameplay.mjs --check
node .compozy/tasks/011-semifinal-playtest-remediation/scripts/validate-semifinal-remediation.mjs --output .compozy/tasks/011-semifinal-playtest-remediation/evidence/static-validation.json
npm run validation:evidence -- --evidence .compozy/tasks/011-semifinal-playtest-remediation/evidence/static-validation.json
npm run validation:impact -- --base develop --run
git diff --check develop...HEAD
```

O mapa de impacto deve selecionar `harness`, `noite-da-historia`, `semifinal` e `build-types`. Nenhum target protegido pode aparecer em `unmappedTargets`.

## 4. Executar QA humano

Use exatamente o commit/build gravado na evidência. Preencha tester, data, save/estado inicial, rota, observação livre e caminho de captura. Execute as rotas Gentle, Resist/Lose e Resist/Win
excepcional, além de editor, assets, áudio, reentrada e cleanup.

Uma correção observada apenas por automação permanece `remediated_pending_retest`; somente execução humana pode promovê-la a `pass`.

# Critérios de encerramento

- Patch e pacote sanitizado reproduzíveis a partir de clone limpo.
- `develop...HEAD` passa no diff-check e no executor de impacto.
- Evidência v2 é `fresh` para o HEAD commitado e não possui inputs essenciais fora da política aprovada.
- B-01 a B-18 possuem resultado e evidência; nenhuma percepção é aprovada por script.
- `runtime_verified`, `human_accepted` e `release_ready` refletem os resultados reais.
- PR segue o template do repositório e não alega validação inexistente.

# Limites

- Não modificar plugins VisuStella vendorizados.
- Não reescrever as tasks históricas 010/011 para esconder o histórico.
- Não relaxar fingerprints, remover testes, silenciar erros nem usar `force` para obter verde.
- Não alterar runtime apenas para coincidir com o harness; divergência precisa ser demonstrada contra contrato aprovado.
- Preservar mudanças locais preexistentes e manter saves fora do patch enquanto A-07 não estiver decidido.

# Skills recomendadas

- `$qa-report`: preparar e registrar o ciclo humano durável.
- `$rpg-maker-mz-project-inventory`: reconfirmar projeto/build antes do QA.
- `$rpg-maker-mz-data-json`: somente se o reteste revelar divergência real nos dados.
- `$rpg-maker-mz-plugin-workflow`: somente se a correção exigir plugin customizado, configuração ou ordem de carga.
- `$no-workarounds`: reparar a fonte de qualquer regressão encontrada.
- `$deslop`: revisão final antes de commit ou PR.
