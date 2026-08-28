---
title: Handoff — harness da semifinal e gate de integridade autoral
date: 2026-08-28
status: authoring-gate-implemented-branch-protection-pending
branch: feat/migracao-semifinal-mapas-ex
---

# Estado atual

O tooling ativo da Semifinal vive ao lado de seus contratos em `docs/Quests/2-semifinal/tooling`. A descoberta começa no manifesto `docs/Quests/2-semifinal/quest-tooling.json`; as tasks 010/011 são
somente proveniência histórica.

O harness declara apenas `authoring_integrity`. Ele não declara runtime verificado, qualidade perceptiva, aceite humano ou prontidão de release.

# Superfície durável

- `docs/Quests/2-semifinal/quest-tooling.json`: owners, fontes, materializações, writer, checks e regras de impacto.
- `docs/Quests/2-semifinal/tooling/apply-gameplay.mjs`: writer autorizado; `--check` diferencia `converged` de `ready_to_apply`.
- `docs/Quests/2-semifinal/tooling/validate.mjs`: validador read-only da integridade mecânica da quest.
- `config/validation-impact-map.json`: checks e targets compartilhados; descobre manifestos de quest e bloqueia targets sem cobertura.
- `scripts/validation-impact.js`: planejador e executor fail-closed.
- `scripts/validate-staged.js`: valida um snapshot exato do índice Git.
- `.github/workflows/authoring-integrity.yml`: executa o gate local em pull requests e publica o relatório da execução atual.

Foram removidos inventários narrativos derivados, snapshots de hashes usados como contrato, o pseudo-writer narrativo e o subsistema órfão de evidência. O manifesto de assets permanece porque possui
consumidores reais e verifica existência, dimensões, transparência e identidade dos arquivos; não contém campos de aprovação humana.

# Comandos canônicos

Manifestos e resolução de impacto:

```sh
npm run validation:impact -- --check
```

Snapshot staged:

```sh
npm run validate:staged
```

Branch em checkout limpo:

```sh
npm run validate:branch -- --base origin/develop
```

Diagnóstico focado da Semifinal:

```sh
npm run quest:semifinal:check
npm run test:semifinal
```

Aplicar intencionalmente a materialização, fora do gate:

```sh
npm run quest:semifinal:apply:gameplay
```

# Interpretação de falhas

| Código                         | Significado                                     | Resolução                                                        |
| ------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------- |
| `materialization_drift`        | Runtime difere do resultado do writer           | Atualizar contrato/writer ou reaplicar a materialização aprovada |
| `unmapped_target`              | Target protegido não possui regra               | Declarar ownership e checks no manifesto correto                 |
| `unverifiable_materialization` | Materialização não possui writer verificável    | Implementar a prova ou remover a alegação                        |
| `dirty_worktree`               | Gate de branch recebeu outro snapshot misturado | Limpar o checkout ou usar `validate:staged`                      |
| `gate_mutated_worktree`        | Um check escreveu durante a validação           | Corrigir o check para operar read-only                           |

# Trabalho externo ainda necessário

Configure `Authoring integrity` como required check nas proteções das branches de destino. O YAML não consegue tornar a própria execução obrigatória.

Playtest, revisão visual, áudio e aceite narrativo continuam necessários onde os contratos os atribuem a julgamento. Registre esses resultados no processo de QA apropriado; não os transforme em campos
do harness estático.

# Fontes e conflitos

- `docs/project-conventions/authoring-materialization-authority.md` mantém o modelo contract-first.
- `docs/project-conventions/validation-evidence-lifecycle.md` impede que um resultado antigo sustente outro checkout; o gate recalcula seu relatório.
- `docs/project-conventions/rpg-maker-event-lifecycle.md` mantém runtime e julgamento humano fora da alegação estática.

O pacote 012 originalmente previa evidência persistida e tooling em um diretório global. Essa direção foi superada pela demanda 013 porque criava superfícies autorreferentes e distantes da quest. Os
registros históricos permanecem úteis como proveniência, mas não são comandos operacionais.
