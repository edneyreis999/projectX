---
status: approved
owner: Scene Presentation Designer
quest: A Semifinal
contract_version: 1.2.0
language: pt-BR
human_presentation_validation: pending
---

# A Semifinal — Score Canônico de Cutscenes EX/VN

## Autoridade, aprovação e fronteiras

Este documento é a fonte aprovada de Scene Presentation para as cutscenes físicas da semifinal. IDs `CS-SEM-*` identificam ciclos de controle, IDs `BT-SEM-*` identificam beats e IDs `AW-SEM-*`
identificam barreiras semânticas. Eles são interfaces estáveis para Gameplay Engineering; números de linha e índices de comandos RPG Maker não são interfaces.

Scene Presentation decide ordem de apresentação, staging, posições e facings, movimento, animação, câmera, zoom, Gabs em cena, barriers, cleanup, recovery e critérios humanos. Narrative Design
continua dona da copy e intenção em `semifinal.dialogos.md`; Audio Design continua dono da intenção sonora em `semifinal.audio.md`; Gameplay Engineering continua dono de estado canônico, comandos,
páginas, plugins, persistência, transferências e integração final. Este score não autoriza editar `frontend/data/*.json`, `plugins.js`, plugins de fornecedor, copy, áudio ou assets.

`status: approved` aprova o contrato autoral, não runtime, editor, Playtest ou percepção. Todas as cenas permanecem não puláveis, com movimento, menu e interações conflitantes bloqueados durante seu
ciclo. Avançar uma Gab pelo controle previsto não devolve movimento.

## Fontes consultadas

- Contrato: `.compozy/tasks/010-semifinal-completa/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md`, `_tasks.md` e `task_03.md`.
- Correção: `.compozy/tasks/011-semifinal-playtest-remediation/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md` e ADR-001 a ADR-009.
- Disciplinas: `docs/Quests/2-semifinal/semifinal.dialogos.md` e `docs/Quests/2-semifinal/semifinal.audio.md`.
- Fluxo e direção: `docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md`, `planos/010-guia-migracao-nova-arquitetura/fase2/grill-me-with-docs-2026-08-19.md` e
  `direcao-arte-cutscenes-semifinal-2026-08-19.md`.
- Arquitetura: `docs/project-conventions/scene-routing-ex-vn.md`, `docs/architecture/exploration-dialogue-gabwindow.md` e o padrão de barreira semântica em `.compozy/tasks/009-rework-cutscene-rheed/`.
- Decisões aceitas: ADR-001 a ADR-011 em `.compozy/tasks/010-semifinal-completa/adrs/`.
- Baselines inspecionados: `frontend/data/Map045.json`, `Map061.json`, `Map062.json`, `Map063.json`, `Map064.json` e `Map044.json`.

## Conflitos resolvidos

- ADR-001 substitui a partida jogável pela elipse de Rheed e crianças no campo EX. Não há VN, batalha, HUD, tutorial ou falso prompt.
- ADR-002 resolve a posse do elmo: o presente ocorre na celebração, sem nova alteração de inventário.
- ADR-003 fixa a chegada exterior observável antes de concluir a semifinal e iniciar `Fim de Jogo`.
- ADR-004 substitui o capitão genérico e a figura obsoleta removida do cânone: Killin lidera, Mhordred apoia e o General é Thordan.
- ADR-005 prevalece sobre recomendações de skip: os ciclos são bloqueados, não puláveis e terminam com uma única devolução de controle.
- ADR-006 prevalece sobre a restrição posterior do gag: copy, retratos, reações, movimento, Animation 39, `Damage3`, recuo e resultado são preservados; apenas a fala usa Gab.
- ADR-007 preserva IDs, filenames e links enquanto normaliza display atual.
- ADR-011 substitui blanket waits por concorrência intencional e barriers semânticas nomeadas. A presença periférica dos guardas não muda o foco antes do reconhecimento coletivo.
- 011 ADR-001 supersede a aprovação EX integral de `CS-SEM-DRAGOBUR-GATE-001`, `CS-SEM-FIELD-AUTHORIZATION-001` e `CS-SEM-STADIUM-FINALE-001`. Os novos controladores 011 alternam EX e VN, com retorno explícito e Gab de continuidade.
- 011 ADR-005 supersede a convergência imediata de Resist: a escolha retorna a EX, forma Thorin+Filena e inicia batalha real contra Mhordred antes da captura comum.
- 011 ADR-009 mantém Map062 E6 como único dono bloqueado do finale, sem estados V29 intermediários nem flag persistente de branch.
- O feedback de Playtest de 2026-08-21 supersede o gate V60 e a câmera fixa do gag: Map063 E7 fica disponível uma vez durante a janela jogável da semifinal, de V50 a V110; a câmera segue a atacante E2 em zoom 200%, balloons dão reação ao grupo e o cleanup retorna ao jogador em 100%.
- As pendências antigas sobre posse do elmo, escolha e política de controle foram resolvidas pelos ADRs; a direção de arte permanece autoridade de composição somente onde não conflita.

## Regras globais do score

### Ciclo de controle e recovery

1. Cada segmento EX `CS-SEM-*` abre e fecha um único ciclo `Coreto_Cutscene` no mesmo evento controlador e no mesmo mapa. O lock EX termina antes de iniciar uma sessão `Coreto_QuestVN` e é readquirido somente depois do retorno limpo.
2. Não há ciclo EX aninhado. Map062 E6 permanece o único orquestrador do finale, mas encerra e readquire apresentação EX nas fronteiras das duas VNs 011.
3. `FinishCutscene` ocorre uma vez, depois das rotas esperadas e da última barrier exigida. Transferências dependentes de estado ocorrem somente depois da transição canônica correspondente.
4. A página de recovery é estável, não Autorun, não repete recompensa, efeito, escolha, transição ou transferência e não promete resume no meio da cena.
5. Coordenadas abaixo são alvos de apresentação. Gameplay pode deslocar no máximo dentro da zona nomeada por colisão/passabilidade, sem mudar facing, hierarquia de foco, ordem, saída ou terminal;
   qualquer desvio deve permanecer atribuível ao mesmo beat.

### Gabs, concorrência e barriers

- Toda fala ainda apresentada em mapa `EX_` usa `GabTextOnly` no anchor aprovado pelo contrato narrativo. Conversa que avança história ou quest sai do EX e usa a entrada VN aprovada.
- Movimento secundário pode continuar durante Gab somente quando a célula do beat o declara.
- `WaitForGab` aparece somente como `AW-SEM-*` antes de mudança de foco, movimento/ocultação do speaker, cleanup irreversível, transição dependente da fala, choice, transferência ou `FinishCutscene`.
- Não inserir espera após cada linha. Linhas consecutivas com o mesmo foco usam fila e uma única barrier no limite semântico.
- Uma barrier protege exatamente o significado descrito; ela não é timer de ritmo nem substitui rota aguardada.

### Câmera, zoom, animação e assets

- Baseline de câmera e paleta do mapa é o MVP. Reenquadramentos são pequenos, funcionais e preservam origem/destino; câmera 360°, shake e filtro global novo são proibidos.
- Zoom permanece em `100%` salvo aproximação explícita curta; todo zoom retorna a `100%` antes do cleanup ou troca de foco.
- Animation 35 possui `Blind` e `Sand`; Animation 39 possui `Thunder2`, `Thunder8` e `Blow3`. Não duplicar esses SE por comandos.
- Para qualquer sprite, busto ou background: usar primeiro um asset existente adequado; se não existir, o Technical Artist cria via ferramenta de geração; se a geração falhar, registra um asset existente como placeholder. Nenhuma referência alcançável pode permanecer ausente, e a adequação visual continua pendente de Playtest humano.

## Score corretivo 011 — autoridade atual

Os três controladores abaixo substituem integralmente as seções 010 de mesmo propósito. As tabelas históricas `CS-SEM-DRAGOBUR-GATE-001`, `CS-SEM-FIELD-AUTHORIZATION-001` e `CS-SEM-STADIUM-FINALE-001` permanecem no arquivo apenas para rastreabilidade e não são interfaces de implementação atual.

### CS-SEM-DRAGOBUR-ARRIVAL-011 — EX → VN → EX

- Controlador: Map062 E2, primeira interação em V50; E19 em `(12,5)` completa o bloqueio físico de Dragobur em `(11,5)`.
- EX de entrada: Thorin termina em `(11,7)` facing cima; Dragobur facing baixo; E19 sem imagem, com colisão. Limpar Gab ativa, estabilizar camera/zoom em 100% e fechar o lock EX antes da VN.
- VN: `SEMIFINAL_DRAGOBUR_ARRIVAL`, com background de estádio/entrada do campo e bustos legíveis de Dragobur e Thorin. A VN contém a bronca, respostas de Thorin e a ordem de buscar um capacete velho comum; não menciona a estátua como destino.
- Retorno EX: restaurar mapa, facing, audio bed, controle e E19 bloqueado; exibir `GAB-SEM-CONTINUE-HELMET-011`; somente então concluir `REQUIRE_HELMET` em V60.
- Recovery: interrupção antes de concluir a VN mantém V50 e permite reentrada limpa; V60 nunca repete a VN completa.

### CS-SEM-DRAGOBUR-AUTHORIZATION-011 — EX → VN → EX

- Controlador: Map062 E2, Thorin em V80 com Armor 51 realmente equipado.
- EX de entrada: mesma geometria de Dragobur/E19; E19 continua sólido. Limpar Gab, estabilizar staging e fechar lock antes da VN.
- VN: `SEMIFINAL_DRAGOBUR_AUTHORIZATION`, com Dragobur furioso pelo elmo da estátua, Thorin justificando a pressa/encaixe/história e se fazendo de desentendido, e autorização pragmática porque o jogo termina e Thorin é o atacante.
- Retorno EX: restaurar campo e controle; executar `AUTHORIZE_FIELD` uma vez; E19 deixa de bloquear no V90; exibir `GAB-SEM-CONTINUE-FIELD-011` apontando o campo.
- Recovery: item apenas no inventário, equipado em outro ator ou removido antes da conversa não abre a VN nem libera E19; interrupção da VN mantém V80.

### CS-SEM-STADIUM-FINALE-011 — EX → VN → EX → VN → EX

- Controlador único: Map062 E6, do V110 até um único `COMMIT_ESCORT` em V120.
- Persistência: nenhum V29 intermediário, switch de Gentle/Resist, self-switch de fase ou segundo Autorun. O jogador não salva durante o lock; interrupção antes de V120 retorna ao save suportado anterior.

| Fase | Apresentação | Staging e conteúdo | Cleanup/terminal |
| --- | --- | --- | --- |
| `BT-SEM-011-FIELD-EXIT` | EX | Saída do campo; jogadores/reservas param o movimento aleatório e ocupam posições determinísticas; Machados, Martelos, Dragobur, Filena e Thorin tornam-se legíveis. | rotas aguardadas; nenhuma Gab/VN concorrente |
| `BT-SEM-011-CELEBRATION-VN` | VN `SEMIFINAL_CELEBRATION` | Alegria do time, hostilidade de classe dos Martelos de Bronze, respostas de Thorin/time, felicidade de Dragobur e Filena, e presente do elmo. | limpar bustos/background; presente termina antes de qualquer guarda aparecer |
| `BT-SEM-011-RIVALS-OUT-GUARDS-IN` | EX | Martelos saem; somente depois Killin e Mhordred entram pela zona sul e chegam à formação aprovada; time reorienta quando a origem fica legível. | rotas aguardadas; `People1` pode rarefar somente após reposicionamento |
| `BT-SEM-011-GUARD-VN` | VN `SEMIFINAL_GUARD_INTERVENTION` | Dragobur reage; Killin declara patente e ordem de Thordan; Thorin responde; Mhordred sustenta; Filena justifica por que resistirá; Gentle/Resist e reação imediata encerram a VN. | limpar choice, bustos/background; devolver branch transitório ao controlador E6 |
| `BT-SEM-011-GENTLE` | EX | Killin organiza custódia; nenhuma batalha. | chama convergência comum |
| `BT-SEM-011-RESIST` | EX + Battle | Filena entra temporariamente na party; Thorin+Filena enfrentam apenas Mhordred; escape desativado e derrota permitida; jogo normal oferece cerca de 2–3 ações significativas por ator antes da derrota. | loss e win excepcional chamam o mesmo cleanup; restaurar somente HP máximo de Thorin/Filena e remover Filena da party |
| `BT-SEM-011-ESCORT` | EX | Filena permanece com os Machados; Killin lidera, Thorin é carregado, Mhordred sustenta retaguarda; Gabs de escolta concluem antes do movimento. | limpar UI/Gabs/ME/beds; `COMMIT_ESCORT` uma vez; transferir somente Thorin/guardas para Map044 |

#### Contrato visual das VNs 011

- Backgrounds precisam manter safe area de texto e diferenciar conversa junto ao field gate de festa coletiva/intervenção militar. Reuso adequado vem primeiro; geração vem depois; placeholder existente é fallback.
- Busts mínimos: Thorin, Dragobur, Filena, Killin, Mhordred e identidades suficientes para Machados/Martelos. Expressão e direção de olhar devem seguir a intenção narrativa, sem caricatura de classe.
- Não manter evento EX, Gab, choice, bust ou background visível atrás/por cima da superfície errada. Cada VN limpa completamente antes do retorno.
- Áudio nunca carrega fato exclusivo. Cues do contrato de áudio podem ser reencaixados, mas não podem antecipar guardas durante a celebração nem substituir texto.

## Score beat a beat

### CS-SEM-URGENT-BLOCK-001 — Entrada irrelevante recusada

- Controlador: Map061 E14, E16 ou E17, um ciclo local por interação.
- Routing: `EX aprovado`; uma fala, um gesto de porta e devolução imediata. VN destruiria a urgência de exploração.
- Densidade: 1 Gab, 0 barriers; não há mudança de foco nem cleanup do speaker.
- Recovery: a mesma página de interação permanece elegível somente no estado urgente; repeat substitui a Gab anterior e nunca empilha.

| Beat                      | Mapa/evento        | Participantes, posição e facing                                                | Lock                    | Diálogo                                                 | Movimento/animação                                              | Câmera/zoom               | Áudio                                                                              | Await                                                                         | Cleanup                                          | Terminal/recovery                                                            |
| ------------------------- | ------------------ | ------------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------------- | --------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `BT-SEM-URGENT-BLOCK-001` | Map061 E14/E16/E17 | Thorin no tile externo da porta, facing para a porta; blocker permanece imóvel | lock local da interação | `DL-SEM-URGENT-THORIN-001` em `MAP061_ENTRANCE_BLOCKER` | facing/gesto curto de tentativa; nenhum passo atravessa a porta | câmera estável, zoom 100% | `CUE-SEM-BED-CITY-001`, `CUE-SEM-URGENT-BLOCK-001` somente se não ler como entrada | nenhuma `WaitForGab`; a porta continua bloqueada enquanto a Gab pode terminar | sem transferência, sem estado, sem fila residual | retorna controle no mesmo tile; página estável não urgente deixa de bloquear |

### CS-SEM-ARRIVE-STADIUM-001 — Chegada observável

- Controlador: Map062 E20.
- Routing: `EX aprovado`; beat espacial sem diálogo, necessário para distinguir chegada de fast-forward narrativo.
- Densidade: 0 Gab, 0 barriers.
- Recovery: estado de chegada já comprometido expõe página não Autorun e não reinicia beds.

| Beat                         | Mapa/evento | Participantes, posição e facing                                                                            | Lock                                               | Diálogo | Movimento/animação                                           | Câmera/zoom                                                                     | Áudio                                                        | Await       | Cleanup                                                                              | Terminal/recovery                                                 |
| ---------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `BT-SEM-ARRIVAL-STADIUM-001` | Map062 E20  | Thorin entra pela borda oeste na faixa `(1..3,6..8)`, termina facing direita para o eixo Dragobur `(11,5)` | lock desde a chegada até o commit `ARRIVE_STADIUM` | nenhum  | dois a três passos para dentro; sem gesto festivo antecipado | câmera acompanha somente o suficiente para mostrar rota até Dragobur; zoom 100% | transição `CUE-SEM-BED-CITY-001` → `CUE-SEM-STADIUM-BED-001` | nenhuma Gab | retirar `City`, manter uma única instância de `Town1`, iniciar `People1` sem restart | `ARRIVE_STADIUM`; Finish uma vez; página de estado 50 não Autorun |

### CS-SEM-DRAGOBUR-GATE-001 — Bronca e requisito do capacete

> **Substituído pela 011:** histórico do baseline 010; não implementar. A autoridade atual é `CS-SEM-DRAGOBUR-ARRIVAL-011`.

- Controlador: Map062 E2.
- Routing: `EX aprovado`; três Gabs curtas ligadas a gestos e ao eixo físico do campo/vestiário. O repeat é uma interação separada de uma linha, não uma nova cutscene longa.
- Densidade: 3 Gabs na primeira execução, 1 barrier. Se a copy não permanecer legível com gestos concorrentes e uma barrier, retornar a review EX/VN antes de adicionar waits.
- Recovery: estado 60 usa repeat estável; inventário sem equipar não reabre a bronca.

| Beat                          | Mapa/evento                   | Participantes, posição e facing                                                    | Lock                      | Diálogo                             | Movimento/animação                                                      | Câmera/zoom                                                              | Áudio                                                   | Await                                                                                                               | Cleanup                                                          | Terminal/recovery                           |
| ----------------------------- | ----------------------------- | ---------------------------------------------------------------------------------- | ------------------------- | ----------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------- |
| `BT-SEM-DRAGOBUR-ARRIVAL-001` | Map062 E2                     | Dragobur `(11,5)` facing baixo; Thorin `(11,7)` facing cima                        | lock ativo                | `DL-SEM-ARRIVAL-DRAGOBUR-001`       | Dragobur gesto amplo sem sair do eixo; Thorin microrecuo tardio         | reenquadramento curto contém os dois; zoom 100%                          | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` | sem barrier; mesmo foco segue                                                                                       | nenhum                                                           | continua no mesmo ciclo                     |
| `BT-SEM-DRAGOBUR-ANSWER-001`  | Map062 E2                     | mesmas posições/facings                                                            | lock ativo                | `DL-SEM-ARRIVAL-THORIN-001`         | Thorin avança meia intenção corporal para o campo, sem cruzar gate      | câmera estável, zoom 100%                                                | `CUE-SEM-DRAGOBUR-SPACE-001`                            | sem barrier; Dragobur interrompe a ação                                                                             | restaurar Thorin ao tile alvo se a rota visual usar deslocamento | continua                                    |
| `BT-SEM-DRAGOBUR-HELMET-001`  | Map062 E2                     | Dragobur vira brevemente ao field gate e volta a Thorin; Thorin permanece `(11,7)` | lock ativo                | `DL-SEM-HELMET-DRAGOBUR-001`        | apontar primeiro campo, depois vestiário; nenhuma humilhação/cercamento | pequeno pan funcional revela a direção do vestiário e retorna; zoom 100% | `CUE-SEM-DRAGOBUR-SPACE-001`                            | `WaitForGab: AW-SEM-DRAGOBUR-REQUIREMENT-001` protege o fato “vestiário/equipar” antes de `REQUIRE_HELMET` e Finish | facings terminam apontando rota jogável; fila Gab vazia          | `REQUIRE_HELMET`; Finish uma vez; estado 60 |
| `BT-SEM-DRAGOBUR-REPEAT-001`  | Map062 E2, página de recovery | Dragobur e Thorin mantêm eixo do gate                                              | lock somente da interação | `DL-SEM-HELMET-DRAGOBUR-REPEAT-001` | gesto curto para o capacete/vestiário; sem replay da chegada            | câmera/zoom estáveis                                                     | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` | nenhuma; não há transição                                                                                           | nenhuma alteração persistente                                    | controle retorna; estado não avança         |

### CS-SEM-LOCKER-ENTRY-001 — Entrada no vestiário masculino

- Controlador: Map063 E6.
- Routing: `EX aprovado`; uma fala ambiental curta confirma a rota física correta. VN criaria uma transição desproporcional.
- Densidade: 1 Gab, 0 barriers; nenhum foco ou estado muda depois da fala.
- Recovery: a página repeat silenciosa não reproduz a observação nem bloqueia a busca.

| Beat                      | Mapa/evento | Participantes, posição e facing                                                     | Lock                  | Diálogo                    | Movimento/animação                                         | Câmera/zoom                                                  | Áudio                     | Await                                                                | Cleanup                       | Terminal/recovery                                               |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------- | --------------------- | -------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------- | -------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------- |
| `BT-SEM-LOCKER-ENTRY-001` | Map063 E6   | Thorin cruza a porta masculina em `(9,21)` facing cima e termina dentro do corredor | lock local da entrada | `DL-SEM-LOCKER-THORIN-001` | passo curto para dentro; nenhum ator secundário ou impacto | câmera estável, zoom 100%; rota da estátua permanece legível | `CUE-SEM-STADIUM-BED-001` | nenhuma `WaitForGab`; exploração pode retomar enquanto a Gab conclui | fila não empilha em reentrada | Finish uma vez; controle retorna no corredor; repeat silencioso |

### CS-SEM-LOCKER-GAG-001 — Gag opcional protegido

- Controlador: Map063 E7.
- Janela: elegível uma vez em qualquer visita ao vestiário entre V50 e V110, inclusive antes da missão do capacete; Self Switch A encerra o one-shot e V120 expõe página terminal vazia.
- Routing: `EX aprovado`; gag físico opcional cuja copy e impacto dependem do espaço. VN quebraria a unidade de ação e o retorno à rota masculina.
- Densidade: 1 Gab essencial, 1 barrier antes do impacto/retirada; não adicionar linhas.
- Recovery: repeat apresenta somente `DL-SEM-GAG-LOCKER-REPEAT-001`, sem retratos coletivos, Animation 39, `Damage3` ou recuo forçado.

| Beat                      | Mapa/evento              | Participantes, posição e facing                                                                                | Lock                      | Diálogo                             | Movimento/animação                                                                       | Câmera/zoom                              | Áudio                                                                                                            | Await                                                                                         | Cleanup                                                         | Terminal/recovery                                             |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| `BT-SEM-GAG-APPROACH-001` | Map063 E7                | Thorin `(15,21)` facing cima; jogadoras E2/E3/E4/E5 preservam posições baseline e convergem facing para Thorin | lock ativo                | nenhum                              | preservar retratos e reações baseline; E2 recebe anger, E3/E5 exclamation, E4 anger e Thorin sweat | foco muda para E2 e zoom 200%; aguardar foco/zoom antes da fala | `CUE-SEM-STADIUM-BED-001`                                                                                        | waits técnicos de foco/zoom; nenhuma Gab                                                        | nenhum                                                          | continua                                                      |
| `BT-SEM-GAG-LINE-001`     | Map063 E7                | `JOGADORA_VESTIARIO` ocupa anchor `MAP063_E7_LOCKER_PLAYER`; Thorin visível junto à porta                      | lock ativo                | `DL-SEM-GAG-LOCKER-001`, copy exata | reações continuam sem esconder o anchor; anger de E2 e sweat de Thorin criam pausa cômica curta | câmera permanece em E2, zoom 200%        | beds cedem; ainda sem impacto                                                                                    | `WaitForGab: AW-SEM-GAG-LINE-001` protege a linha exata antes da pausa, impacto e recuo irreversível | nenhuma                                                         | continua                                                      |
| `BT-SEM-GAG-IMPACT-001`   | Map063 E7                | atacante E2 alcança `(15,20)` facing Thorin; Thorin facing cima                                                | lock ativo                | nenhum                              | preservar Animation 39, impacto, movimento coletivo e recuo de Thorin um tile para baixo | foco acompanha o movimento de E2; sem shake; após o recuo retorna ao jogador e zoom 100% | `CUE-SEM-GAG-IMPACT-001`; Animation 39 mantém `Thunder2/Thunder8/Blow3` e `Damage3` toca uma vez, sem duplicatas | rotas relevantes e cleanup de foco/zoom aguardados; nenhuma Gab ativa                           | câmera no jogador, zoom 100%; one-shots terminam              | Finish uma vez fora da área restrita; repeat/recovery estável |
| `BT-SEM-GAG-REPEAT-001`   | Map063 E7, página repeat | Thorin fora da área, facing porta                                                                              | lock somente da interação | `DL-SEM-GAG-LOCKER-REPEAT-001`      | nenhum balloon, impacto, perseguição ou rota coletiva                                    | câmera no jogador, zoom 100%              | somente bed                                                                                                      | nenhuma                                                                                       | fila não empilha                                                | controle retorna; rota masculina permanece visível            |

### CS-SEM-HELMET-STATUE-001 — Estátua, retirada e equipamento

- Controlador: Map063 E13.
- Routing: `EX aprovado`; interação ambiental e alteração persistente exigem comparação espacial direta. VN não pode substituir leitura da estátua.
- Densidade: 2 Gabs na retirada e 1 Gab de confirmação após equipamento, com 3 barriers ligadas a alterações irreversíveis.
- Recovery: estado alterado nunca reexibe estátua íntegra nem concede Armor 51; retorno do menu reconcilia equipamento real.

| Beat                      | Mapa/evento                  | Participantes, posição e facing                                                 | Lock                    | Diálogo                         | Movimento/animação                                                           | Câmera/zoom                                                     | Áudio                                                                    | Await                                                                                                 | Cleanup                                                 | Terminal/recovery                                                             |
| ------------------------- | ---------------------------- | ------------------------------------------------------------------------------- | ----------------------- | ------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `BT-SEM-STATUE-READ-001`  | Map063 E13                   | estátua íntegra em `(9,8)`; Thorin `(9,9)` facing cima                          | lock de interação       | `DL-SEM-STATUE-THORIN-001`      | pausa e facing sustentado; nenhuma retirada ainda                            | câmera aproxima no máximo a zoom 110%, mantendo origem e Thorin | bed do estádio                                                           | `WaitForGab: AW-SEM-STATUE-ORIGIN-001` protege origem/seleção de ouro antes da retirada               | nenhum                                                  | continua                                                                      |
| `BT-SEM-STATUE-TAKE-001`  | Map063 E13                   | mesmas posições; mãos/facing de Thorin ligados ao landmark                      | lock ativo              | `DL-SEM-STATUE-THORIN-TAKE-001` | gesto de retirada; sprite/tile troca de íntegro para alterado depois da fala | câmera mantém ambos; zoom retorna 100% após alteração legível   | `CUE-SEM-HELMET-TAKE-001`, `Open1` uma vez somente se ler como liberação | `WaitForGab: AW-SEM-HELMET-TAKE-001` protege decisão/origem antes de grant, alteração e `TAKE_HELMET` | persistir display alterado; nenhuma fanfarra/novo asset | `TAKE_HELMET`; abrir affordance de equipamento; recovery não duplica Armor 51 |
| `BT-SEM-HELMET-EQUIP-001` | Map063 E13/recovery pós-menu | Thorin diante da estátua alterada; capacete correto visual/inventário em Thorin | lock ao reconhecer gate | `DL-SEM-HELMET-THORIN-FIT-001`  | reação curta causal, sem coro                                                | câmera estável, zoom 100%                                       | `CUE-SEM-HELMET-EQUIP-001` após confirmação real                         | `WaitForGab: AW-SEM-HELMET-FIT-001` protege a confirmação antes de Finish/transição `EQUIP_HELMET`    | menu fechado, fila vazia; estátua alterada persiste     | estado 80; Finish uma vez; wrong/inventory-only retorna controle sem avançar  |

### CS-SEM-FIELD-AUTHORIZATION-001 — Retorno equipado

> **Substituído pela 011:** histórico do baseline 010; não implementar. A autoridade atual é `CS-SEM-DRAGOBUR-AUTHORIZATION-011`.

- Controlador: Map062 E2.
- Routing: `EX aprovado`; duas figuras, uma fala e gesto para o gate. Densidade incompatível com VN.
- Densidade: 1 Gab, 1 barrier antes de autorizar campo.
- Recovery: página autorizada não repete reconhecimento nem presenteia o elmo.

| Beat                           | Mapa/evento | Participantes, posição e facing                                                | Lock       | Diálogo                         | Movimento/animação                                             | Câmera/zoom                                                  | Áudio                                                   | Await                                                                                                            | Cleanup                                                       | Terminal/recovery                                |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------ | ---------- | ------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `BT-SEM-AUTHORIZE-INSPECT-001` | Map062 E2   | Dragobur `(11,5)` facing baixo; Thorin `(11,7)` facing cima, Armor 51 equipado | lock ativo | `DL-SEM-AUTHORIZE-DRAGOBUR-001` | Dragobur inspeciona sem tocar/remover o item e aponta ao campo | eixo estável; breve inclusão visual do field gate; zoom 100% | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` | `WaitForGab: AW-SEM-AUTHORIZE-FIELD-001` protege memória do elmo e autorização antes de `AUTHORIZE_FIELD`/Finish | facings terminam no field gate; nenhuma mudança de inventário | estado 90; Finish uma vez; gate atual disponível |

### CS-SEM-MATCH-ELISION-001 — Rheed e crianças no campo EX

- Controlador: Map064 E9; Map064 E8 compromete `ENTER_FIELD` antes de entregar o controle ao E9, sem abrir ciclo concorrente.
- Routing: `EX aprovado por ADR-001`; Rheed/crianças são moldura sobre campo reconhecível. Qualquer necessidade de mais exposição, simulação ou mais de três barriers exige nova review EX/VN.
- Densidade: 6 Gabs curtas, 3 barriers: após desvantagem, após gol e após vitória. Crianças apoiam e não criam fato exclusivo.
- Recovery: estado 110 exibe campo pós-elipse sem narradores, nevoeiro, Gab, ME ou replay.

| Beat                       | Mapa/evento | Participantes, posição e facing                                                                                                                                       | Lock                | Diálogo                                                              | Movimento/animação                                                       | Câmera/zoom                                             | Áudio                                                                           | Await                                                                                                            | Cleanup                                                                     | Terminal/recovery                                         |
| -------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| `BT-SEM-MATCH-FRAME-001`   | Map064 E9   | Thorin termina entrada em `(21,10)` facing esquerda; Rheed materializa `(15,8)` facing baixo; crianças em arco `(13,9),(14,10),(16,10),(17,9)` voltadas a Rheed/campo | lock ativo desde E9 | nenhum                                                               | uma Animation 35 coletiva; opacidade escalonada, sem repetir por criança | campo e linhas laterais permanecem visíveis; zoom 100%  | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-MATCH-FRAME-001`; não duplicar `Blind/Sand` | rotas/materialização aguardadas, sem `WaitForGab`                                                                | nenhum                                                                      | continua                                                  |
| `BT-SEM-MATCH-LOSING-001`  | Map064 E9   | Rheed âncora; crianças mantêm arco                                                                                                                                    | lock ativo          | `DL-SEM-MATCH-RHEED-LOSING-001`, depois `DL-SEM-MATCH-CHILDREN-001`  | uma reação infantil curta durante a fila; Rheed imóvel                   | câmera estável, sem pan de “jogada”, zoom 100%          | `CUE-SEM-MATCH-ARC-001`                                                         | `WaitForGab: AW-SEM-MATCH-LOSING-001` protege desvantagem antes de mudar a inferência para entrada               | crianças recompõem facing                                                   | continua                                                  |
| `BT-SEM-MATCH-ENTRY-001`   | Map064 E9   | Rheed ancora; Thorin permanece visível como referente, sem simular partida                                                                                            | lock ativo          | `DL-SEM-MATCH-RHEED-ENTRY-001`                                       | um passo/facing simbólico de Thorin; sem tutorial/input                  | reenquadramento mínimo inclui Thorin e Rheed; zoom 100% | `CUE-SEM-MATCH-ARC-001`                                                         | sem barrier; mesmo arco progride ao gol                                                                          | nenhum                                                                      | continua                                                  |
| `BT-SEM-MATCH-GOAL-001`    | Map064 E9   | mesma composição                                                                                                                                                      | lock ativo          | `DL-SEM-MATCH-RHEED-GOAL-001`                                        | reação escalonada das crianças, sem cadeia de ação                       | câmera não persegue bola inexistente; zoom 100%         | `CUE-SEM-MATCH-ARC-001`                                                         | `WaitForGab: AW-SEM-MATCH-GOAL-001` protege autoria do gol antes do resultado                                    | recompor facings                                                            | continua                                                  |
| `BT-SEM-MATCH-VICTORY-001` | Map064 E9   | Rheed e grupo ainda visíveis; Thorin no campo                                                                                                                         | lock ativo          | `DL-SEM-MATCH-RHEED-VICTORY-001`, depois `DL-SEM-MATCH-CHILDREN-002` | reação infantil confirma recepção, não substitui o fato                  | campo legível; zoom 100%                                | `CUE-SEM-MATCH-ARC-001`, depois `CUE-SEM-VICTORY-001` somente após o texto      | `WaitForGab: AW-SEM-MATCH-VICTORY-001` protege vitória antes de ME, cleanup, `ESTABLISH_VICTORY` e foco pós-jogo | nenhum antes da barrier                                                     | continua                                                  |
| `BT-SEM-MATCH-CLEANUP-001` | Map064 E9   | Rheed/crianças perdem opacidade e saem; Thorin permanece                                                                                                              | lock ativo          | nenhum                                                               | cleanup quieto sem Animation 35 de saída; todas as rotas aguardadas      | câmera retorna baseline, zoom 100%                      | encerrar frame/ME sem resíduo; preparar `CUE-SEM-CELEBRATION-001` no retorno    | nenhuma Gab ativa; barrier anterior já protege resultado                                                         | remover narradores, efeitos e fila Gab; uma única transição para estado 110 | `ESTABLISH_VICTORY`; Finish uma vez; recovery não Autorun |

### CS-SEM-STADIUM-FINALE-001 — Celebração, intervenção, escolha e escolta

> **Substituído pela 011:** histórico do baseline 010; não implementar. A autoridade atual é `CS-SEM-STADIUM-FINALE-011`.

- Controlador: Map062 E6, um único ciclo do primeiro gesto coletivo até a transferência. Não criar locks separados para suas subfases.
- Routing: `EX aprovado por ADR-011`; pertencimento, perda de reciprocidade, formação e escolha dependem do espaço. A densidade é o limite superior: 11 Gabs considerando um branch, 7 barriers. Se não
  permanecer legível com coreografia e essas barreiras, retornar a routing review; não adicionar blanket waits.
- Recovery: estado 120 impede replay de celebração, presente, choice e `COMMIT_ESCORT`; a transferência para Map044 é única.

| Beat                                | Mapa/evento | Participantes, posição e facing                                                                                                             | Lock                         | Diálogo                                                       | Movimento/animação                                                                            | Câmera/zoom                                                                      | Áudio                                                               | Await                                                                                                                              | Cleanup                                                                 | Terminal/recovery                                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `BT-SEM-CELEBRATION-COLLECTIVE-001` | Map062 E6   | Thorin `(11,7)`; Dragobur `(11,5)`; Filena `(13,7)`; time em arco assimétrico `(9,7),(10,8),(12,8),(14,7)`, todos reciprocamente orientados | lock ativo                   | `DL-SEM-CELEBRATION-TEAM-001`                                 | saltos/facings escalonados; Thorin centro temporário, Filena participa                        | abre footprint sem 360°; zoom 100%                                               | `CUE-SEM-CELEBRATION-001`, `CUE-SEM-STADIUM-BED-001`                | `WaitForGab: AW-SEM-CELEBRATION-ESTABLISHED-001` protege pertencimento antes do presente                                           | nenhuma                                                                 | continua                                                                                                    |
| `BT-SEM-CELEBRATION-GIFT-001`       | Map062 E6   | Dragobur aproxima um tile sem cobrir Thorin; grupo mantém reciprocidade                                                                     | lock ativo                   | `DL-SEM-GIFT-DRAGOBUR-001`, `DL-SEM-GIFT-THORIN-001`          | gesto de entrega simbólica, sem grant/removal; Thorin aceita                                  | reenquadramento curto inclui grupo, não isola como loot; zoom 100%               | `CUE-SEM-CELEBRATION-001`; nenhum SE de item                        | `WaitForGab: AW-SEM-GIFT-COMPLETE-001` protege propriedade permanente antes da presença militar ganhar foco                        | quantidade de Armor 51 invariável                                       | continua; guardas podem surgir só perifericamente após barrier                                              |
| `BT-SEM-GUARD-PERIPHERY-001`        | Map062 E6   | Killin entra pela zona sul `(11,16)` e Mhordred `(12,16)`, ambos facing cima; grupo ainda voltado entre si                                  | lock ativo                   | nenhum                                                        | avanço econômico até `(11,10)/(12,10)`; última reação festiva pode terminar sem reciprocidade | câmera mantém guardas na borda, sem corte/filtro; zoom 100%                      | celebração ainda ativa; não iniciar `CUE-SEM-GUARD-RECOGNITION-001` | rotas podem avançar durante silêncio; sem Gab                                                                                      | nenhum                                                                  | continua; presença não equivale a reconhecimento                                                            |
| `BT-SEM-GUARD-RECOGNITION-001`      | Map062 E6   | Dragobur primeiro vira aos guardas; time cessa e reorienta em propagação; Thorin/Filena por último                                          | lock ativo                   | `DL-SEM-GUARD-DRAGOBUR-001`                                   | expansão do grupo contrai; guardas param alinhados                                            | câmera estabiliza grupo, origem e saída; zoom 100%                               | iniciar `CUE-SEM-GUARD-RECOGNITION-001` somente agora               | `WaitForGab: AW-SEM-GUARD-RECOGNIZED-001` protege reconhecimento antes do beat particular de Filena                                | `People1` rarefaz e não retorna                                         | continua                                                                                                    |
| `BT-SEM-FILENA-DISCOMFORT-001`      | Map062 E6   | Filena `(13,7)` dá meio passo para Thorin/fecha facing; guardas permanecem no eixo                                                          | lock ativo                   | `DL-SEM-GUARD-FILENA-001`                                     | pausa própria, sem detectar/explicar tudo sozinha                                             | câmera reenquadra minimamente, mantém autoridade e Filena recuperável; zoom 100% | `CUE-SEM-GUARD-RECOGNITION-001`; nenhum cue exclusivo               | `WaitForGab: AW-SEM-FILENA-COMPLETE-001` protege o beat antes da ordem essencial                                                   | Filena não é removida nem escondida                                     | continua                                                                                                    |
| `BT-SEM-KILLIN-ORDER-001`           | Map062 E6   | Killin `(11,10)` facing Thorin; Mhordred `(12,10)` meia posição atrás; grupo imóvel                                                         | lock ativo                   | `DL-SEM-ORDER-KILLIN-001`, `DL-SEM-ORDER-MHORDRED-001`        | Killin dá um passo direcional; Mhordred apenas sustenta, sem ultrapassar                      | eixo estável, sem glorificação/zoom de poder                                     | beds cedem; `CUE-SEM-GUARD-RECOGNITION-001`                         | `WaitForGab: AW-SEM-KILLIN-ORDER-001` protege rank, Thordan e destino antes da choice                                              | nenhum                                                                  | continua                                                                                                    |
| `BT-SEM-CHOICE-GENTLE-001`          | Map062 E6   | Visual Choice sobre composição congelada; Thorin permanece entre grupo e formação                                                           | lock ativo, choice permitido | `BR-SEM-THORIN-GENTLE`, `DL-SEM-GENTLE-KILLIN-REACTION-001`   | reação contida de Killin; grupo não lê como consentimento voluntário                          | câmera/zoom congelados                                                           | `CUE-SEM-CHOICE-CONFIRM-001` uma vez                                | `WaitForGab: AW-SEM-GENTLE-REACTION-001` protege reação antes da convergência                                                      | limpar UI e branch local; nenhum switch/flag persistente                | converge em `BT-SEM-ESCORT-CONVERGENCE-001`                                                                 |
| `BT-SEM-CHOICE-RESIST-001`          | Map062 E6   | mesma composição e lock                                                                                                                     | lock ativo, choice permitido | `BR-SEM-THORIN-RESIST`, `DL-SEM-RESIST-MHORDRED-REACTION-001` | Thorin avança intenção sem romper formação; Mhordred responde atrás da liderança de Killin    | câmera/zoom congelados                                                           | `CUE-SEM-CHOICE-CONFIRM-001` uma vez                                | `WaitForGab: AW-SEM-RESIST-REACTION-001` protege reação antes da convergência                                                      | limpar UI e branch local; nenhum switch/flag persistente                | converge no mesmo beat                                                                                      |
| `BT-SEM-ESCORT-CONVERGENCE-001`     | Map062 E6   | Killin frente; Thorin centro; Mhordred retaguarda; saída oeste `(0,6..8)` legível; grupo/Filena fora da formação                            | lock ativo                   | `DL-SEM-ESCORT-KILLIN-001`, `DL-SEM-ESCORT-FILENA-001`        | formar sem círculo/humilhação; Filena permanece no grupo                                      | câmera contém origem, grupo e saída antes do movimento; zoom 100%                | `CUE-SEM-ESCORT-TRANSFER-001` prepara fade, ainda sem `Move1`       | `WaitForGab: AW-SEM-ESCORT-DESTINATION-001` protege destino e despedida antes de `COMMIT_ESCORT`, cleanup e movimento irreversível | choice já limpa; fila Gab vazia                                         | `COMMIT_ESCORT` exatamente uma vez; continua                                                                |
| `BT-SEM-ESCORT-TRANSFER-001`        | Map062 E6   | formação move em eixo oeste: Killin lidera, Thorin centro, Mhordred retaguarda; grupo fica                                                  | lock ativo                   | nenhum                                                        | rotas aguardadas até zona de saída; transição simples depois de direção legível               | câmera acompanha sem liberar HUD; zoom 100%                                      | `CUE-SEM-ESCORT-TRANSFER-001`, `Move1` uma vez; stadium beds saem   | nenhuma Gab ativa; `AW-SEM-ESCORT-DESTINATION-001` já satisfeita                                                                   | remover UI, Gabs, ME e People1; manter atores locais em página recovery | FinishCutscene uma vez imediatamente antes da transferência única Map044 `(5,23)`; estado 120 impede replay |

### CS-SEM-HOME-ARRIVAL-001 — Handoff exterior

- Controlador: Map044 E10.
- Routing: `EX aprovado`; chegada, journal e devolução de controle pertencem ao exterior. VN anteciparia o confronto que pertence à próxima quest.
- Densidade: 1 Gab, 1 barrier antes do Finish.
- Recovery: página não Autorun em estado 900; semifinal, próxima quest, áudio e controle não duplicam.

| Beat                      | Mapa/evento | Participantes, posição e facing                                                                             | Lock                     | Diálogo                  | Movimento/animação                                           | Câmera/zoom                                   | Áudio                                                           | Await                                                                             | Cleanup                                           | Terminal/recovery                                                               |
| ------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------ | ------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `BT-SEM-HOME-ARRIVAL-001` | Map044 E10  | Thorin `(5,23)` facing cima para a casa; Killin `(7,23)` facing esquerda; Mhordred `(7,22)` facing esquerda | lock ativo desde chegada | nenhum                   | formação estabiliza; guardas não empurram Thorin para dentro | câmera mostra fachada/porta e trio; zoom 100% | `CUE-SEM-HOME-ARRIVAL-001`; `City/Town1` sem resíduo do estádio | rotas de chegada aguardadas, sem Gab                                              | confirmar ausência de People1/ME/choice           | executar `ARRIVE_HOME` antes de `fim-de-jogo.START`, uma vez cada; continua     |
| `BT-SEM-HOME-THORIN-001`  | Map044 E10  | Thorin permanece fora, facing casa; guardas laterais não bloqueiam porta futura                             | lock ativo               | `DL-SEM-HOME-THORIN-001` | reação curta de Thorin, sem entrada automática               | câmera/zoom estáveis                          | `CUE-SEM-HOME-ARRIVAL-001` cede à Gab                           | `WaitForGab: AW-SEM-HOME-CONTROL-001` protege contraste e chegada antes do Finish | fila Gab vazia; journal/save context reconciliado | Finish uma vez e devolver controle fora; página recovery estado 900 não Autorun |

## Matriz de routing EX versus VN

| Cutscene                         | Falas na primeira execução | Barriers | Decisão e rationale                                                                             | Sinal obrigatório de re-review                                                                    |
| -------------------------------- | -------------------------: | -------: | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `CS-SEM-URGENT-BLOCK-001`        |                          1 |        0 | EX: feedback espacial de uma porta durante exploração.                                          | qualquer exposição adicional além da prioridade imediata                                          |
| `CS-SEM-ARRIVE-STADIUM-001`      |                          0 |        0 | EX: chegada observável e orientação.                                                            | n/a; não é cena de diálogo                                                                        |
| `CS-SEM-DRAGOBUR-GATE-001`       |                          3 |        1 | SUPERSEDIDO 010: sem autoridade de implementação atual.                                         | n/a                                                                                               |
| `CS-SEM-LOCKER-ENTRY-001`        |                          1 |        0 | EX: fala ambiental confirma a rota física correta.                                              | qualquer exposição que interrompa a busca curta                                                   |
| `CS-SEM-LOCKER-GAG-001`          |                          1 |        1 | EX: ação física opcional protegida e retorno espacial.                                          | adicionar copy ou tornar a coreografia ilegível com a linha exata                                 |
| `CS-SEM-HELMET-STATUE-001`       |                          3 |        3 | EX: landmark, alteração persistente e equipamento manual.                                       | descrição passar a substituir a leitura íntegra/alterada                                          |
| `CS-SEM-FIELD-AUTHORIZATION-001` |                          1 |        1 | SUPERSEDIDO 010: sem autoridade de implementação atual.                                         | n/a                                                                                               |
| `CS-SEM-MATCH-ELISION-001`       |                          6 |        3 | EX por ADR-001: moldura oral concisa sobre campo reconhecível.                                  | mais fatos, simulação de partida, mais de 3 barriers ou perda do campo como contexto              |
| `CS-SEM-STADIUM-FINALE-001`      |            11 em um branch |        7 | SUPERSEDIDO 010: sem autoridade de implementação atual.                                         | n/a                                                                                               |
| `CS-SEM-DRAGOBUR-ARRIVAL-011`    |                         VN |      n/a | EX posiciona e bloqueia; VN contém conversa; EX retoma com Gab e V60.                            | qualquer progressão antes de concluir a VN                                                        |
| `CS-SEM-DRAGOBUR-AUTHORIZATION-011` |                      VN |      n/a | EX valida equipamento; VN contém bronca/respostas; EX retoma com Gab e V90.                      | E19 liberar antes de V90 ou VN não limpar completamente                                           |
| `CS-SEM-STADIUM-FINALE-011`      |                     2 VNs |      n/a | EX posiciona; VN celebra; EX troca elencos; VN ordena/escolhe; EX resolve branch e escolta.      | duas VNs contíguas, ordem espacial quebrada, batalha fora de Resist ou Filena transferida         |
| `CS-SEM-HOME-ARRIVAL-001`        |                          1 |        1 | EX: chegada exterior e controle são o significado do handoff.                                   | copy antecipar o confronto interno da próxima quest                                               |

Nenhuma cena acima foi validada humanamente. A aprovação EX/VN descreve a rota autoral atual; uma falha nos sinais de re-review retorna à autoridade `scene-routing-ex-vn.md` e exige nova decisão antes de aumentar densidade.

## Reconciliação de namespaces e consumo

- Todo ID `DL-SEM-*` e `BR-SEM-*` aprovado aparece em exatamente um beat autoral deste score; repeats e branches são exceções de execução mutuamente exclusiva, não duplicação de fonte.
- Todo `CUE-SEM-*` aparece no beat ou fronteira que autoriza seu uso. Gameplay pode omitir cue não essencial somente pelo fallback aprovado no contrato de áudio e deve registrar a omissão; não pode
  antecipá-lo.
- Todo `AW-SEM-*` é declaração de `WaitForGab`. Não existem barriers implícitas. Rotas aguardadas e waits de animação não contam como `WaitForGab`.
- Gameplay deve fingerprintar os três documentos completos antes de planejar runtime. Mudança posterior em copy, cue, beat, barrier, owner, recovery ou terminal invalida o preflight.

## Fronteiras de cleanup e recuperação

| Fronteira            | Cleanup obrigatório                                  | Recovery estável                                     |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Map061 interação     | nenhuma transferência/Gab empilhada                  | mesma porta deixa de bloquear fora do estado urgente |
| chegada/Dragobur     | VN limpa bust/background; `City` sai; Gab de continuidade aponta o vestiário | V50 interrompido não avança; V60 não repete a VN |
| gag                  | Animation 39/SE terminam; Thorin fora da área        | repeat sem impacto/recuo coletivo                    |
| estátua/equipamento  | display alterado e Armor 51 reconciliados            | sem segundo grant; wrong/inventory-only não avança   |
| campo/elipse         | Rheed/crianças/Animation 35/Gabs/ME removidos        | estado 110 não materializa de novo                   |
| festa/intervenção    | cada VN limpa bust/background/choice; Martelos saem antes de guardas entrarem | V120 não repete presente, batalha, choice ou commit |
| Map062 → Map044      | UI, Gabs, ME e stadium beds ausentes; Move1 uma vez  | uma transferência; destino já declarado              |
| chegada exterior     | journal/save context estável; City/Town1 sem restart | estado 900 não repete quests nem lock                |

## Critérios humanos pendentes

1. Relato livre recupera atraso/derrota, requisito, origem do elmo, `LOSING → ENTRY → GOAL → VICTORY`, presente, Filena, rank de Killin, ordem e destino antes de sondas.
2. Toda Gab permanece legível enquanto a coreografia declarada continua; nenhuma barrier parece blanket wait ou deixa cleanup cortar fala.
3. Dragobur mantém desespero, afeto, competência e dignidade; a nova câmera e os balloons dão energia ao gag sem prolongar a violência nem estereotipar as jogadoras.
4. Estátua íntegra, retirada, estado alterado e capacete em Thorin são reconstruíveis; asset existente adequado tem prioridade, geração cobre lacuna e placeholder existente impede referência ausente; Playtest humano decide adequação.
5. O campo continua reconhecível e a elipse não parece VN, loading, batalha ou promessa de futebol jogável.
6. A primeira VN é percebida como celebração coletiva e conflito de classe; presente termina antes de qualquer guarda entrar no EX.
7. A saída dos Martelos e a entrada dos guardas são localizáveis em EX; a segunda VN só começa depois da formação; Filena recebe motivação própria; Killin lê como líder sem depender de loudness ou filtro.
8. Gentle e Resist parecem diferentes: Gentle não batalha; Resist inicia a batalha Thorin+Filena contra Mhordred e converge depois do cleanup; ambos chegam ao mesmo terminal.
9. Câmera/zoom permanecem discretos, preservam eixo e retornam ao baseline; segurar movimento durante o Finish não causa passo, interação ou transferência conflitante.
10. Repetir portas, gag, estátua, choice, transfer e recovery não empilha Gab/SE, não duplica recompensa e não deixa ator, áudio, UI ou lock residual.
11. Repetir a rota mutada preserva todos os fatos por texto e staging; áudio nunca é canal exclusivo.
12. Nenhum item acima está aprovado por este documento. Editor, runtime e avaliação humana permanecem `pending`.

## Follow-ups fora de escopo

- Crowd esportiva, apito final, marcha e ambiência dedicada permanecem oportunidades pós-MVP; sprites, bustos e backgrounds necessários às VNs 011 pertencem ao MVP pelo fluxo existente → gerar → placeholder.
- Se a geometria real bloquear uma coordenada alvo, Gameplay registra o ajuste mínimo no planner mantendo zona, facing, foco e fingerprint; Scene Presentation revisa somente se o significado mudar.
- Qualquer necessidade de plugin, parâmetro global ou mudança adicional de routing retorna à disciplina/autoria correspondente; a criação de assets já autorizada pela 011 não exige nova decisão.
