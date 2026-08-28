# Pós-mortem consolidado

> Registro histórico do ciclo 012. Para tooling e comandos atuais, use [HANDOFF.md](HANDOFF.md); a demanda 013 superou parte dos estados abaixo.

## Veredito

A branch evoluiu uma migração estrutural para uma quest extensa, com máquina canônica, apresentação híbrida EX/VN, batalha, assets e tooling de autoria. O ciclo foi produtivo, e várias correções
converteram falhas reais em regressões automatizadas. Na auditoria inicial, o resultado ainda não estava pronto para aceite: faltavam retestes humanos, o harness específico estava vermelho, os writers
não convergiam e a evidência estática existente estava desatualizada.

O problema sistêmico não foi falta de testes. Foi a distância entre o que os testes modelavam e o lifecycle real do RPG Maker, somada a um contrato de conclusão que aceitava frontmatter `completed`
sem provar os gates da spec.

> Atualização de 2026-08-27: os bloqueios automatizados descritos neste veredito foram remediados e preservados abaixo como registro causal. A1 eliminou a dependência executável dos pacotes ignorados;
> o aceite humano continua pendente.

## Catálogo de evidências

| ID    | Evidência                                                                                                                                                                                     |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EV-01 | Intenção 010: `../../.compozy/tasks/010-semifinal-completa/_spec.md`, `_tasks.md`, ADRs e memories.                                                                                           |
| EV-02 | Aceite 010: `../../.compozy/tasks/010-semifinal-completa/evidence/static-validation.json` e `human-playtest.md`.                                                                              |
| EV-03 | Intenção 011: `../../.compozy/tasks/011-semifinal-playtest-remediation/_spec.md`, `_tasks.md`, ADRs e memories.                                                                               |
| EV-04 | Runtime humano: `../../.compozy/tasks/011-semifinal-playtest-remediation/evidence/playtest-feedback-2026-08-21.md`, `playtest-feedback-2026-08-24-guardas.md` e `human-playtest.md`.          |
| EV-05 | Causas técnicas: sete arquivos em `../../.compozy/tasks/011-semifinal-playtest-remediation/post-morten/`.                                                                                     |
| EV-06 | Histórico Git: commits `3e4ddc07`, `37db90de`, `6d2c1cad`, `de24e224`, `1c84ede5`, `362e2da0`, `e60f9529`, `8f92ef4a` e `af49dea8`.                                                           |
| EV-07 | Runtime/testes finais: `../../frontend/js/plugins/Coreto_Cutscene.js`, `Coreto_QuestVN.js` e `../../frontend/__tests__/`.                                                                     |
| EV-08 | Contratos as-built no commit `e60f9529`: cinco arquivos em `../../docs/Quests/2-semifinal/`.                                                                                                  |
| EV-09 | Processo: `../../.compozy/loops/orchestrate-tasks/loop.yaml`, logs 010 e `.gitignore`.                                                                                                        |
| EV-10 | Auditoria fresca de 2026-08-25: build passou; suíte específica 10/14 e 233/252; writers bloqueados; diff-check da branch falhou.                                                              |
| EV-11 | Regras/skills atuais: `../../AGENTS.md`, `../../docs/architecture/`, `../../docs/project-conventions/` e skills RPG Maker em `../../.agents/skills/`.                                         |
| EV-12 | Validação do worktree em 2026-08-27: harness 21/21, state machines 15/15, semifinal 252/252, build aprovado, writers `ready`, evidência `fresh` e quatro checks do mapa de impacto aprovados. |
| EV-13 | Decisão A1/S1/C2: `SEMIFINAL-TOOLING-PROVENANCE.json`, `docs/Quests/2-semifinal/tooling`, remoção das suítes legadas 010 e política `/frontend/save/*.rmmzsave`.                              |

## Resultado pretendido versus resultado comprovado na auditoria inicial

| Dimensão     | Pretendido                                      | Comprovado na auditoria inicial                                                                        |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Progressão   | Jornada completa V0→V900, oito objetivos        | Estrutura e testes de rotas existem; percurso pós-correção não foi retestado integralmente.            |
| Gentle       | Escolta sem batalha                             | Correção materializada; E2E-007 permanecia `fail` aguardando reteste.                                  |
| Resist       | Batalha contra Mhordred e convergência          | Crash de TP foi corrigido estaticamente; E2E-008 permanecia `fail`; win excepcional não foi executado. |
| EX/VN        | Quatro retornos estáveis e retomada transitória | Plugin/testes cobrem labels; continuidade perceptiva e reidratação completa aguardam reteste.          |
| Elmo         | Detecção imediata e apresentação memorável      | Correção estrutural implementada; impacto, timing e ausência de lock não têm aceite humano.            |
| Assets       | Nenhuma referência alcançável ausente           | Auditoria estática e arquivos existem; revisão visual/editor não executada.                            |
| Tooling      | Writers idempotentes e validação independente   | Era verdadeiro em `362e2da0`; não é verdadeiro em HEAD depois de `e60f9529`.                           |
| Documentação | Contratos coerentes com runtime                 | Documentos as-built refletem o runtime, mas romperam as fontes canônicas e os testes dos writers.      |

## Incidentes e causas

| Incidente observável                             | Causa raiz                                                                                                               | Por que a validação anterior passou                                                        | Prevenção generalizada                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `CUTSCENE_NOT_EX` após entrar na VN              | O evento de origem continuava após `EnterVisualNovel` e alcançava comando EX no mapa VN.                                 | Ordem textual válida; lifecycle após transferência não modelado.                           | Toda mudança de cena deve encerrar processamento ou possuir retomada formal testada.           |
| Estátua/gag não respondiam                       | Gate semântico dependia do estado errado e da precedência de página.                                                     | Testes focaram páginas/valores isolados, não a última página elegível em todos os estados. | Simular seleção de página como o engine, incluindo `>=`, ordem reversa e flags.                |
| Objetivo do elmo só avançava após nova interação | Não havia observador do equipamento após fechar o menu.                                                                  | Inventário, equipamento e interação foram tratados como equivalentes.                      | Testar estado real do ator, inventário e retorno de menu como casos separados.                 |
| `CUTSCENE_OWNER_INVALID` em Parallel             | Plugin buscava `$gameMap._interpreter`, não o `Game_Interpreter` chamador.                                               | Teste estrutural do JSON não executava PluginManager com intérprete paralelo.              | Ownership vem do executor; testar Action Button, Autorun e Parallel.                           |
| Zoom continuava e jogo travava                   | `QuestTransition` alterava a condição da página e o refresh descartava o intérprete antes de `FinishCutscene`.           | Pareamento textual Begin/Finish não provava alcançabilidade no frame seguinte.             | Separar detector sem waits de controlador estável e simular refresh.                           |
| Guardas desapareciam após VN/batalha             | Sprite/priority/through eram estados transitórios perdidos na reconstrução e em refresh de party.                        | Presença do `Change Image` antes da VN foi tomada como persistência.                       | Definir contrato de reidratação depois do último refresh e antes do consumo visual.            |
| Thorin girava para cima antes do fade            | Helper genérico embutia `Turn Up` como cleanup.                                                                          | Teste conferia destino, não pose terminal.                                                 | Helpers não devem esconder intenção narrativa; direção final deve ser explícita.               |
| Gab EX tinha flags falsas                        | Asserção buscava a chave no payload, não o valor tipado.                                                                 | Substring passava para `true` e `false`.                                                   | Parsear structs serializados e comparar valores exatos.                                        |
| Guardas sumiam em V900                           | Writer localizou cleanup por `pages[2]`, mas a identidade real era V32; a última página elegível venceu.                 | Índice incidental foi tratado como identidade.                                             | Localizar por contrato semântico e testar V32 desligada/ligada.                                |
| Resist quebrava em `toUpperCase()`               | `<TP Mode: Boss>` não existia no `TpMode:arraystruct` ativo; o default real era `Enemy`.                                 | Nome conceitual do GDD foi tratado como chave materializada.                               | Strings configuráveis são foreign keys contra o registry ativo.                                |
| Contratos finais quebraram o harness             | Documentos passaram de fonte aprovada para espelho as-built, mas canonical fixtures/hashes/writers permaneceram antigos. | O commit documental rodou checks dos documentos, não a suíte integrada.                    | Uma única direção de autoridade, writer check obrigatório em qualquer target gerado/consumido. |

## Causa sistêmica

```text
tests estruturais orientados a presença
        +
modelo incompleto de lifecycle do engine
        +
conclusão por status de arquivo, sem gate de aceite da spec
        +
fontes duplicadas com autoridade mutável
        =
“completed” antes do runtime e “pass” obsoleto depois do drift
```

### Cinco porquês consolidados

1. Por que o jogador encontrou P0s depois de centenas de testes? Porque os testes provavam estrutura e ordem, não sobrevivência do intérprete, reconstrução do mapa ou configuração ativa.
2. Por que esses cenários não eram obrigatórios? Porque lifecycle do RPG Maker estava distribuído em conhecimento tácito, sem harness ou ADR durável.
3. Por que a implementação foi marcada concluída? Porque o loop verifica somente `status: completed` e ausência de sessões ativas.
4. Por que a evidência v1 ainda parecia `pass` na auditoria inicial? Porque o arquivo não era vinculado ao commit/build e não expirava após mudança em targets.
5. Por que um commit documental derrubou writers? Porque o fluxo trocou a fonte de verdade para o runtime sem migrar/aposentar o pipeline gerador.

## O que funcionou bem

- A máquina única em V29 reduziu autoridades paralelas e permitiu auditar estados e journal (EV-01, EV-03).
- A separação entre copy, áudio, cutscene, technical art e gameplay tornou conflitos explícitos (EV-01, EV-08).
- Writers fail-closed, diffs localizados com `jsonc-parser`, hashes e replay idempotente foram boas escolhas enquanto a autoridade permaneceu estável (EV-03, EV-05).
- O checklist humano nunca foi promovido automaticamente; falhas e pendências continuam registradas com honestidade (EV-02, EV-04).
- Cada incidente relevante gerou regressão específica e post-mortem técnico, elevando os testes de 236 para 252 (EV-05, EV-06).
- Os commits descrevem experiência, validação e limitações de forma clara; não alegam playtest inexistente (EV-06).
- A skill de Enhanced TP confirma que o nome de modo é usado por referência e deve vir da lista configurada; a correção final está alinhada ao contrato real (EV-11).

## O que não funcionou no ciclo original

- A task 011 exigia playtest fresco para conclusão, mas todas as tasks foram marcadas `completed` com seis E2Es falhos e nove não executados. Na auditoria de 2026-08-27, os seis estavam
  `remediated_pending_retest`; o reteste final de 2026-08-28 os promoveu a `pass` conforme `PLAYTEST-2026-08-28.md`.
- O loop de orquestração mede conclusão administrativa, não aceite funcional/perceptivo.
- O pacote histórico de intenção, ADRs, logs e evidências está ignorado. A1 passou a tratá-lo somente como proveniência: o tooling ativo vive fora de `.compozy` e o manifesto registra seus hashes.
- Logs existem apenas para três tasks 010, sem timestamps, e não há logs equivalentes para 011; a timeline depende de memories e commits.
- A integração principal de 122 arquivos reuniu runtime, docs, assets, framework e testes, aumentando o custo de revisão e atribuição causal.
- A spec declarava ondas paralelas, mas o loop proíbe concorrência; além disso, tasks supostamente paralelas compartilharam o mesmo planner. O grafo não valida interseção de ownership.
- Dois saves rastreados mudaram no commit principal sem papel de fixture explicitado. S1 os classificou como artefatos locais, preservou-os no disco, removeu-os do índice e adicionou a regra de
  ignore.
- `git diff --check develop...HEAD` falhava, apesar de commits relatarem diff-checks restritos aprovados. As sete ocorrências foram corrigidas no worktree, mas ainda dependem de commit.

## Estado dos achados

| Finding                                 | Severidade | Estado                                                      | Próxima ação                                            |
| --------------------------------------- | ---------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| F-01 — aceite humano ausente            | Bloqueante | Resolvido: B-01 a B-18 passaram na revisão `bdd0db1e`       | Preservar o relatório humano separado do gate estático. |
| F-02 — harness atual vermelho           | Bloqueante | Resolvido no worktree: 252/252 no golden path               | Preservar a suíte integrada no gate de impacto.         |
| F-03 — writers não convergem            | Bloqueante | Gameplay `converged`; pseudo-writer narrativo removido      | Manter autoridade contract-first e replay no-op.        |
| F-04 — evidência estática obsoleta      | Alta       | Evidência persistida removida; gate recalcula o checkout    | Persistir somente quando houver consumidor real.        |
| F-05 — lifecycle não institucionalizado | Alta       | Resolvido no worktree com ADR e núcleo reutilizável         | Ampliar o harness por novas fronteiras comprovadas.     |
| F-06 — tasks/evidências fora do Git     | Alta       | Resolvido por tooling durável e manifesto content-addressed | Preservar 010/011 como proveniência, não dependência.   |
| F-07 — foreign keys configuráveis       | Alta       | TP corrigido localmente                                     | Validador genérico de registries ativos.                |
| F-08 — DoD superficial                  | Alta       | Harness limita-se a `authoring_integrity`                   | Tratar runtime/humano/release no fluxo responsável.     |
| F-09 — slicing/higiene                  | Média      | Resolvido: workflow e required check ativos em `develop`    | Preservar a ruleset e o gate local canônico.            |

## Critério de encerramento deste pós-mortem

O ciclo só pode ser considerado encerrado quando F-01 a F-04 estiverem resolvidos e as ações P0/P1 de `CHECKLIST.md` tiverem evidência. As demais melhorias podem seguir como evolução de framework, mas
devem ganhar owner e task própria.

## Atualização de findings — 2026-08-27

- F-02 e F-03 foram resolvidos por autoridade contract-first, Gameplay writer `converged`, remoção do pseudo-writer narrativo e suíte canônica verde.
- F-04 foi resolvido pela remoção da evidência autorreferente; o gate recalcula o checkout atual.
- F-06 foi resolvido por A1: writers, fixtures e validador ativos são rastreáveis; 010/011 permanecem apenas como proveniência content-addressed.
- A política S1 classificou `file0`/`file1` como saves locais; outros slots já rastreados não foram alterados.
- F-09 foi resolvido pelo workflow e pelo required check `Authoring integrity` em `develop`.
- F-05 recebeu ADR e núcleo reutilizável; novas fronteiras devem ampliar o harness por regressões genéricas, sem copiar cutscenes.
- F-08 permanece fora do harness estático: runtime, aceite humano e release exigem seus próprios sensores.
- F-01 foi resolvido pelo reteste B-01 a B-18 de 2026-08-28, registrado em `PLAYTEST-2026-08-28.md`.

## Estado residual após a promoção

### Concluído ou materializado

- P01–P03 aceitas e U03 parcialmente incorporada ao guia.
- Gameplay writer em `converged`; validação narrativa read-only ligada à copy materializada.
- Harness, Noite da História, Semifinal e build aprovados pelos comandos públicos atuais.
- Evidência versionada removida; o gate publica apenas o relatório da execução atual.
- Mapa de impacto e workflow de PR materializados.
- Diff-check, formatação, links e revisão `deslop` aprovados.
- Tooling ativo consolidado em `docs/Quests/2-semifinal/tooling`; tasks 010/011 removidas do grafo de execução.
- Saves `file0`/`file1` classificados como artefatos locais e ignorados.

### Pendente como evolução, sem bloquear o plano 012

- Registrar owners das ADRs e criar tasks para as lacunas restantes.
- Incorporar estados humanos separados ao fluxo genérico de QA/release.

O delta A1/S1/013 foi versionado, `Authoring integrity` tornou-se obrigatório e B-01 a B-18 passaram. O escopo do plano 012 está encerrado.
