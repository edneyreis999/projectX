# Propostas de regras gerais

Estas regras são propostas, não alterações já promovidas. A rastreabilidade parte dos aprendizados em [LEARNINGS.md](LEARNINGS.md).

## Estado de promoção em 2026-08-27

- R-01 foi promovida pela ADR `authoring-materialization-authority.md`.
- R-02 e R-03 foram promovidas pela ADR `validation-evidence-lifecycle.md` e pelo helper de evidência; o loop ainda não consome os estados multidimensionais.
- R-04 a R-07 foram promovidas pela ADR `rpg-maker-event-lifecycle.md`, pelo guia operacional e pelo helper de lifecycle.
- R-12 possui materialização executável no mapa `target → checks`, validada com quatro gates; falta torná-la obrigatória no CI.
- R-08 a R-11 e R-13 a R-16 continuam propostas ou parcialmente cobertas; este arquivo não lhes concede status de regra aceita.

## R-01 — Autoridade antes da edição

> Antes de editar qualquer target, identificar se ele é manual, gerado ou materializado; registrar seu owner, sua fonte geradora, seus consumidores e o comando que prova convergência. Quando houver
> writer, a mudança deve começar na fonte autorizada e terminar com `check → apply → reapply/no-op`.

- Origem: L-03.
- Gate: segunda aplicação não pode alterar conteúdo nem reverter uma decisão posterior.
- Falha padronizada: `source_authority_ambiguous` ou `writer_not_converged`.

## R-02 — Evidência vinculada ao conteúdo

> Todo artefato de validação deve registrar `headSha`, base comparada, hash dos inputs cobertos, comandos executados, versões relevantes, horário e resultado. Mudança de conteúdo, tracking ou
> permissão executável em input coberto invalida o `pass` anterior.

- Origem: L-04.
- Gate: validador retorna `stale_evidence` antes de apresentar `pass` de outro build.
- Evidência humana deve registrar o mesmo fingerprint usado no playtest.

## R-03 — Estados de conclusão separados

> O framework deve distinguir pelo menos `implemented`, `static_verified`, `runtime_verified`, `human_accepted` e `release_ready`. `completed` não pode significar simultaneamente todos eles.

- Origem: L-05.
- Gate: uma spec que declara playtest obrigatório não pode chegar a `human_accepted` ou `release_ready` com caso `fail`/`not_executed`.
- Tasks source-only podem encerrar em `implemented`/`static_verified`, desde que a feature permaneça explicitamente pendente.

## R-04 — Lifecycle de páginas RPG Maker

> Sempre que um comando altera variável, switch, self-switch, party, mapa ou scene usados pela página atual, considerar que o owner pode ser descartado no próximo frame. Nenhum wait ou cleanup pode
> ficar depois dessa fronteira sem teste que prove a sobrevivência do mesmo intérprete.

- Origem: L-01.
- Gate: simular seleção da página antes e depois da mutação.
- Padrão preferido: detector Parallel sem lock/waits → latch local → Autorun estável para apresentação.

## R-05 — Ownership de Plugin Commands

> Plugin Command que depende de “quem chamou” deve usar o `Game_Interpreter` recebido por `PluginManager.callCommand`; globals do mapa são apenas fallback explicitamente testado.

- Origem: L-01.
- Gate: testes com intérprete principal ocioso e intérprete Parallel real, incluindo Begin e Finish.
- Handlers que precisam de `this` não podem ser arrow functions.

## R-06 — Retomada e reidratação

> Toda fronteira EX→VN→EX, batalha→EX ou transferência→EX deve declarar o estado transitório que não é garantido pelo engine e reidratá-lo depois do último refresh potencial.

- Origem: L-02.
- Matriz mínima: sprite/index, posição/direção, opacity/transparency, priority/through, câmera/zoom, áudio, Gabs/UI, party e lock.
- Gate: validar retomada no caminho normal, falha e branch convergente.

## R-07 — Página por identidade semântica

> Writers não podem selecionar páginas por `pages[n]` sem provar a forma completa esperada. A identidade deve usar conditions, trigger, marker, estado, switches e função observável.

- Origem: L-07.
- Gate: simular a última página elegível em cada estado relevante, com flags locais desligadas e ligadas.
- Markers de ownership devem possuir versão terminal; migração antiga não pode ser aceita como no-op.

## R-08 — Strings configuráveis como referências

> Nomes usados em notetags, Plugin Commands, presets, profiles ou parâmetros devem ser validados contra o registry ativo e sua capitalização exata. Documentação conceitual não cria uma chave de
> runtime.

- Origem: L-06.
- Gate: validar toda a família consumidora, não apenas o registro recém-criado.
- Preferência: omitir override redundante quando o default configurado atende ao caso.

## R-09 — Payloads serializados tipados

> Parâmetros de plugins serializados em strings devem ser decodificados até a camada que contém o valor validado. Presença de substring ou chave nunca prova `true`, enum correto ou ID válido.

- Origem: L-08.
- Gate: parse e comparação de tipo/valor; re-encode preservando as camadas e records não relacionados.

## R-10 — Helpers sem direção narrativa implícita

> Helpers de movimento, câmera, Gab e cleanup não devem impor facing, foco, espera ou efeito que pertencem à intenção local. Esses valores devem ser parâmetros explícitos ou “preservar estado atual”.

- Origem: L-09.
- Gate: testes inspecionam pose e estado terminal, não apenas destino intermediário.

## R-11 — Claims de validação

> Estrutura, runtime e percepção devem ser reportados separadamente. Automação pode provar parse, referências, transições, ordem e cleanup declarados; não pode aprovar humor, clareza, ritmo, estilo,
> impacto, conforto ou continuidade percebida.

- Origem: L-05 e L-10.
- Gate: commit/PR deve marcar explicitamente cada classe como executada, falha ou pendente.

## R-12 — Gate final da branch

> Antes de merge, executar os checks sobre `<base>...HEAD`, não apenas sobre o último arquivo editado: diff-check, build, suíte da feature, writers/geradores em check, evidência fresca e matriz humana
> obrigatória.

- Origem: L-11 e L-15.
- Gate: commit de docs não pode ignorar testes que consomem esses docs.

## R-13 — Tasks e logs auditáveis

> Tasks que fundamentam uma branch devem produzir um pacote sanitizado versionado ou um manifesto versionado com hashes e localização durável. Logs de execução devem ter timestamp, task, tentativa,
> sessão, resultado, commit de entrada/saída e gates executados.

- Origem: L-13.
- Gate: retrospectiva deve ser reproduzível em clone limpo, sem depender do workspace original.

## R-14 — Paralelismo por ownership

> Nós independentes no DAG só podem executar em paralelo quando `owned_targets` e geradores compartilhados não se intersectarem. Interseção exige serialização ou lease explícita.

- Origem: L-12.
- Gate: validador do grafo calcula interseções antes de despachar workers.

## R-15 — Saves rastreados

> Save dentro do Git deve ser declarado como fixture, com cenário, versão/build, compatibilidade, origem e teste consumidor. Save sem esse contrato é artefato local e não pode entrar no diff da
> feature.

- Origem: L-14.
- Gate: PR lista saves modificados e prova uso; caso contrário bloqueia.

## R-16 — Feedback de “Magia”

> Feedback perceptivo deve ser traduzido primeiro em emoção e curva observável — preparação, pico, reação e cleanup — antes da escolha de efeitos. Referência externa orienta energia, não altera
> cânone.

- Origem: L-10.
- Estado: já parcialmente promovida em `../../docs/project-conventions/magia-em-cutscenes-e-animacoes.md`; falta integrar o checklist ao gate de playtest.

## Adoção ainda necessária

| Regra          | Próximo passo                                                                        |
| -------------- | ------------------------------------------------------------------------------------ |
| R-01           | Manter writers `ready` e registrar migração antes de trocar o modelo de autoridade.  |
| R-02/R-03      | Versionar os inputs de evidência e fazer o loop consumir os estados separados.       |
| R-04–R-07      | Atualizar as skills RPG Maker e ampliar o harness apenas com regressões comprovadas. |
| R-08/R-09      | Criar validador compartilhado de registries e payloads tipados.                      |
| R-10/R-11/R-16 | Executar o playtest B-01 a B-18 e preservar claims humanos separados.                |
| R-12           | Integrar `validation:impact` ao CI/pre-merge e revalidar após o commit.              |
| R-13           | Aprovar a política sanitizada para `.compozy/tasks`, logs e evidências.              |
| R-14           | Criar schema de ownership/leases e validador do DAG.                                 |
| R-15           | Classificar os dois saves em `develop...HEAD`.                                       |
