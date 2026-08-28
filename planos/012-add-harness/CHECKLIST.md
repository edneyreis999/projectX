# Checklist de remediação e prevenção

> Registro histórico do ciclo 012. O gate atual está documentado em [HANDOFF.md](HANDOFF.md); a demanda 013 superou itens de evidência e CI abaixo.

## A. Bloqueios atuais da branch

- [x] A-01 — Escolher e registrar o modelo de autoridade dos cinco documentos: contract-first ou runtime-first.
- [x] A-02 — Atualizar/aposentar os writers e canonical fixtures conforme a decisão; ambos devem retornar `ready` em `--check`.
- [x] A-03 — Restaurar a suíte da Semifinal para 14/14 suítes e 252/252 testes e expô-la pelo nome estável `npm run test:semifinal`.
- [x] A-04 — Executar `npm run build:types` novamente na revisão registrada pela evidência.
- [x] A-05 — As sete linhas foram corrigidas e versionadas; `git diff --check develop...HEAD` está verde.
- [x] A-06 — Validação estática migrada para `semifinal-validation/v3`, com `headSha`, base, hashes dos inputs, gerador, horário e verificador de `stale_evidence`.
- [x] A-07 — Os saves `file0` e `file1` foram classificados como artefatos locais: removidos do índice, preservados no disco e cobertos por `/frontend/save/*.rmmzsave`.
- [x] A-08 — Nenhum save local é input do harness ou da evidência da Semifinal.

## B. Reteste humano obrigatório

Use o mesmo commit/build registrado na evidência. Preencher tester, data, save/estado inicial, rota, observação livre e caminho de captura.

- [ ] B-01 — RPG Maker abre, salva, fecha e reabre todos os mapas/databases alterados sem reparo.
- [ ] B-02 — Jornada fresca completa de antes da saída de casa até V900, sem crash, Game Over, softlock ou objetivo pulado.
- [ ] B-03 — Map061 bloqueia todos os nove desvios apenas em V40 e mantém a rota do estádio.
- [ ] B-04 — Primeira chegada: Dragobur, estátua e gag funcionam; nenhum `CUTSCENE_NOT_EX`.
- [ ] B-05 — Equipar Armor 51 avança imediatamente e a apresentação V80 termina com controle/câmera/UI restaurados.
- [ ] B-06 — Repetir a detecção no estádio e no vestiário sem duplicar recompensa/apresentação.
- [ ] B-07 — Retorno de Rheed posiciona elenco e inicia celebração sem rotas infinitas.
- [ ] B-08 — Saída dos rivais e entrada dos guardas têm foco, ritmo e geografia legíveis.
- [ ] B-09 — Gentle mostra formação, três passos, fade, transferência e guardas visíveis na chegada.
- [ ] B-10 — Resist inicia batalha sem erro de TP, permite ações, perde normalmente e converge na escolta.
- [ ] B-11 — Resist/Win excepcional converge uma vez e limpa party/HP conforme contrato.
- [ ] B-12 — Guardas permanecem visíveis após VN, party refresh e V120→V900; cleanup V32 os remove sem colisão.
- [ ] B-13 — Thorin e guardas encerram a escolta olhando para oeste, sem giro artificial.
- [ ] B-14 — Gabs de Killin/Mhordred substituem a fila em interações repetidas e não deixam wait residual.
- [ ] B-15 — Assets, busts, fundo VN, sprites e ícone passam por revisão visual em contexto.
- [ ] B-16 — Humor, autoridade, classe, “Magia”, ritmo e clareza são avaliados por humano; nenhum desses critérios é promovido por script.
- [ ] B-17 — Testar áudio normal e mudo; fatos essenciais permanecem legíveis.
- [ ] B-18 — Confirmar ausência de câmera, zoom, áudio, Gab, collision, party ou lock residual em cada fronteira.

## C. Checklist para futuras tasks RPG Maker

### Intake e arquitetura

- [ ] C-01 — Confirmar project root por `game.rmmzproject` e plugin IDs/status/order em `js/plugins.js`.
- [ ] C-02 — Registrar docs/ADRs consultados e conflitos antes da decisão criativa.
- [ ] C-03 — Declarar source of truth, owner, writer, targets e consumidores.
- [ ] C-04 — Declarar estados de aceite: static, editor, runtime, human e release.
- [ ] C-05 — Inventariar IDs e registries configuráveis; tratar nomes como foreign keys.
- [ ] C-06 — Declarar `owned_targets` e validar interseções no DAG.

### Design de evento

- [ ] C-07 — Para cada página, registrar conditions, trigger, owner e função observável.
- [ ] C-08 — Marcar comandos que podem causar refresh/reseleção/transfer/scene change.
- [ ] C-09 — Não deixar waits/cleanup após fronteira que pode matar o intérprete sem teste explícito.
- [ ] C-10 — Separar detector Parallel e apresentação estável quando necessário.
- [ ] C-11 — Definir reidratação após VN, batalha, party change e reload.
- [ ] C-12 — Tornar direção/foco/cleanup parâmetros explícitos dos helpers.
- [ ] C-13 — Encerrar processamento depois de transferência/entrada VN quando não houver retomada formal.

### Writer e dados

- [ ] C-14 — Resolver estruturas por identidade semântica, não índice.
- [ ] C-15 — Preservar null slots, IDs, branch grammar, 357/657 e estilo dos trechos não tocados.
- [ ] C-16 — Parsear payloads serializados até o valor tipado.
- [ ] C-17 — Executar check, apply, reapply e confirmar no-op sem reversão.
- [ ] C-18 — Versionar markers quando a migração muda de terminal semântico.
- [ ] C-19 — Validar diff restrito e depois diff completo base...HEAD.

### Testes e evidência

- [ ] C-20 — Cobrir executor main, Autorun e Parallel para Plugin Commands owner-aware.
- [ ] C-21 — Simular última página elegível para todos os estados/flags relevantes.
- [ ] C-22 — Testar efeitos depois do último refresh, não só antes da fronteira.
- [ ] C-23 — Validar registries ativos contra todos os consumidores da família.
- [ ] C-24 — Vincular evidência a SHA/build/inputs e invalidá-la após mudança.
- [ ] C-25 — Rodar suíte integrada após docs, fixtures, scripts, plugins ou dados consumidos mudarem.
- [ ] C-26 — Manter perceptivo/humano pendente até observação real.

### Commit e PR

- [ ] C-27 — Separar commits por comportamento observável e superfície coerente quando possível.
- [ ] C-28 — Não misturar mudança de framework com conteúdo massivo sem justificativa/validação própria.
- [ ] C-29 — Declarar saves e binários como fixtures ou excluí-los.
- [ ] C-30 — Usar `.gitmessage` e o template de PR sem alegar validação inexistente.
- [ ] C-31 — Versionar manifesto sanitizado de tasks, ADRs, logs e evidências necessário à auditoria.

## D. Encerramento do ciclo

- [ ] D-01 — F-02 a F-04 estão resolvidos; F-01 continua aberto até o playtest B-01 a B-18.
- [ ] D-02 — ADRs P01–P03 foram promovidas e aceitas, mas seus owners formais ainda precisam ser registrados.
- [ ] D-03 — Skills P0/P1 foram atualizadas e testadas com casos genéricos.
- [ ] D-04 — Lacunas FG-01–FG-04 possuem tasks, owner e prazo.
- [x] D-05a — O sumário diferencia resultado esperado, estruturalmente provado e humanamente observado.
- [ ] D-05b — O PR ainda precisa preservar essa separação; nenhum PR foi preparado nesta rodada.

## E. Promoção executada em 2026-08-27

- [x] E-01 — Autoridade contract-first confirmada no HEAD `af49dea8`; writers Narrative e Gameplay retornam `ready`.
- [x] E-02 — ADR de lifecycle de páginas/intérpretes promovida com helper reutilizável e casos positivo/negativo.
- [x] E-03 — ADR de lifecycle de evidência promovida com fingerprints e verificação pública de freshness.
- [x] E-04 — Manifesto `target → checks` materializado com bloqueio `unmapped_target` para superfícies protegidas.
- [x] E-05 — Golden path descartável prova writers, validador v2, suíte integrada e diff-check sem relaxar gates.
- [ ] E-06 — O pacote 012 foi versionado e a política A1 foi decidida; falta versionar `docs/Quests/2-semifinal/tooling` e o manifesto de proveniência para concluir a migração.
- [ ] E-07 — Executar B-01 a B-18 no build fingerprintado.

## F. Gates executados no worktree em 2026-08-27

- [x] F-01 — `npm run test:harness`: 3/3 suítes e 22/22 testes.
- [x] F-02 — `npm run test:noite-da-historia`: 2/2 suítes e 15/15 testes.
- [x] F-03 — `npm run test:semifinal`: 14/14 suítes e 252/252 testes.
- [x] F-04 — `npm run build:types`: aprovado.
- [x] F-05 — Narrative e Gameplay writers: `ready` em `--check`.
- [ ] F-06 — Evidência `semifinal-validation/v3`: gerar diagnóstico no worktree e regenerar no HEAD commitado, mantendo `release_ready: blocked` até os gates humanos.
- [x] F-07 — Mapa de impacto executou `harness`, `noite-da-historia`, `semifinal` e `build-types`, sem target protegido desmapeado.
- [x] F-08 — `git diff --check`, Prettier, links locais e trailing whitespace: aprovados para o worktree.
- [x] F-09 — Revisão final `deslop`: nenhum finding restante.

## G. Feedback do review manual em 2026-08-27

- [x] G-01 — Review manual inicial do harness de lifecycle concluído pelo owner.
- [x] G-02 — Remover os nomes públicos `test:quest-state-machines` e `test:semifinal-remediation`.
- [x] G-03 — Expor `test:noite-da-historia` e `test:semifinal` preservando os catálogos aprovados.
- [x] G-04 — Adicionar `test:quests` como agregador explícito das duas quests atuais.
- [x] G-05 — Atualizar mapa de impacto, autotestes, validator e runbooks ativos para a nova interface.
- [x] G-06 — Reexecutar harness, `test:quests`, build, writers, mapa de impacto, diff-check e formatação; a freshness antiga falhou de forma esperada.
- [x] G-07 — Review incremental concluído; o feedback originou os nomes públicos por quest e `test:quests`.
- [x] G-08 — Revisão `deslop` do delta concluída sem finding restante.

## H. Decisões do Grill me e implementação A1/S1/C2

- [x] H-01 — A1: consolidar tooling ativo, agora localizado em `docs/Quests/2-semifinal/tooling`.
- [x] H-02 — A1: remover dependências executáveis das tasks históricas 010/011 e registrar apenas proveniência content-addressed.
- [x] H-03 — A1: remover cinco suítes legadas que congelavam os modelos 010/contrato antigo e manter as 14 suítes públicas atuais da Semifinal.
- [x] H-04 — S1: preservar os saves locais, removê-los do Git e ignorar novos `*.rmmzsave` em `frontend/save`.
- [x] H-05 — C2: registrar integração de CI como task futura, fora desta implementação.
- [ ] H-06 — Versionar o pacote durável e regenerar evidência v3 no HEAD resultante.
- [ ] H-07 — Executar B-01 a B-18 no mesmo commit/build fingerprintado.
