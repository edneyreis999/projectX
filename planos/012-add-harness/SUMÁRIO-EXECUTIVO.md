# Sumário executivo

## Veredito

A autoridade contract-first, os writers e a suíte automatizada voltaram a convergir. O harness também ganhou promoção durável de lifecycle, evidência e impacto. A branch ainda não está pronta para
release: o playtest humano permanece pendente, parte do pacote de execução continua ignorada e os deltas desta rodada ainda precisam ser versionados.

## Estado atual comprovado

- HEAD auditado: `af49dea8`, com ADR contract-first aceita e cinco contratos disciplinares reconciliados.
- Build TypeScript: aprovado em 2026-08-27.
- Suíte específica: golden path com 14/14 suítes e 252/252 testes.
- Harness novo: 3/3 suítes e 22/22 testes.
- Writers: Narrative e Gameplay retornam `ready` em `--check`.
- Evidência estática 011: `semifinal-validation/v2`, vinculada a HEAD/base/inputs; agora está corretamente stale porque o feedback alterou comandos e contratos operacionais. A regeneração pertence ao
  HEAD commitado.
- Mapa de impacto: `harness`, `noite-da-historia`, `semifinal` e `build-types` são os checks atuais; nenhum target protegido está desmapeado.
- Evidência humana: seis casos `remediated_pending_retest` e nove `not_executed`.
- Diff completo: as sete ocorrências históricas foram corrigidas no worktree; `develop...HEAD` só refletirá a correção depois do commit.
- Higiene final: Prettier, links locais, trailing whitespace e revisão `deslop` aprovados.

## Principal diagnóstico

O ciclo validou muito bem forma, IDs, diffs e invariantes declarados, mas inicialmente não modelou o lifecycle do engine: intérpretes Parallel, refresh de página, última página elegível, reconstrução
após VN, party refresh e registries ativos. Os playtests descobriram exatamente essas lacunas.

Depois, a documentação foi convertida de fonte autoral para espelho do runtime sem migrar os canonical fixtures e writers. A ADR aceita em `authoring-materialization-authority.md` resolveu essa
inversão: contratos aprovados são fonte de intenção e runtime/evidência são derivados verificáveis.

## O que já foi entregue

- ADRs duráveis para autoridade, lifecycle de eventos e lifecycle de evidência.
- Helper compartilhado de página/refresh e regressões de intérprete `Parallel`.
- Provenance compartilhada com conteúdo, tracking e permissão executável.
- Mapa fail-closed `target → checks`, incluindo arquivos excluídos.
- Golden path descartável e integração do helper aos testes de quest existentes.
- Atualização do guia operacional e dos artefatos deste plano.

## O que ainda falta

1. Versionar o patch de harness e este pacote 012, fazendo o range `develop...HEAD` refletir o diff-check verde.
2. Decidir a política durável para tasks, logs e evidências hoje ignorados.
3. Tornar o mapa `target → checks` obrigatório no CI/orquestrador.
4. Executar a matriz humana completa Gentle/Resist, editor, assets, áudio e continuidade.
5. Só então avaliar release.

## Melhorias permanentes de maior retorno

- Harness genérico de lifecycle para páginas, intérpretes e refresh: primeira versão materializada; ampliar por fronteiras comprovadas.
- Definition of Done com estados separados: promovida para ADR/evidência; falta integrar ao loop.
- Evidência content-addressed e automaticamente stale: materializada na semifinal e em helper compartilhado.
- Validador de foreign keys para registries textuais ativos de plugins.
- Fonte de verdade única entre contratos, writers, fixtures e runtime: promovida e aplicada à semifinal.
- Pacotes de task/logs sanitizados e reproduzíveis em clone limpo.

## O que deve ser preservado

- Máquina canônica única e transições semânticas.
- Separação de autoridade por disciplina.
- Writers fail-closed, diffs localizados e replay idempotente.
- Separação honesta entre validação automatizada e percepção humana.
- Conversão de bugs reais em regressões específicas.
- Mensagens de commit orientadas à experiência e transparentes sobre pendências.

## Navegação dos artefatos

- [TIMELINE.md](TIMELINE.md): reconstrução cronológica.
- [POST-MORTEM.md](POST-MORTEM.md): causas, incidentes e evidências.
- [LEARNINGS.md](LEARNINGS.md): aprendizados priorizados.
- [RULES.md](RULES.md): texto normativo proposto.
- [ADR-CHANGES.md](ADR-CHANGES.md): promoções concluídas e ainda pendentes.
- [SKILL-CHANGES.md](SKILL-CHANGES.md): mudanças em skills e nova capacidade.
- [FRAMEWORK-GAPS.md](FRAMEWORK-GAPS.md): lacunas do framework.
- [CHECKLIST.md](CHECKLIST.md): desbloqueio atual e prevenção futura.
