---
status: implemented
owner: Scene Presentation Designer
quest: A Semifinal
document_kind: as-built cutscene score
contract_version: 2.0.0
runtime_snapshot: 362e2da0
human_presentation_validation: pending_retest
language: pt-BR
---

# A Semifinal — score de cutscenes materializado

## Autoridade

Este score descreve os comandos presentes nos mapas e plugins atuais. Quando uma posição, wait, lock, página ou cleanup divergir de uma intenção antiga das tasks 010/011, o artefato em frontend/data
prevalece.

Copy é registrada em semifinal.dialogos.md. Este documento registra ciclos de controle, routing EX/VN, staging, movimentos, câmera, zoom, barriers, transições e recovery.

## Infraestrutura ativa

| Componente              | Estado materializado                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Coreto_Cutscene         | ativo; código v1.0.1; exige mapa EX, mesmo event owner no BeginCutscene/FinishCutscene, bloqueia movimento/menu/save e restaura contexto capturado                 |
| Coreto_QuestVN          | ativo; código v1.1.0; captura origem, áudio, tela, transparência, followers, menu e save; transfere para mapa VN; retorna por label transitório quando configurado |
| VisuMZ_4_MapCameraZoom  | ativo; usado no gag, transformação do elmo, saída dos rivais, entrada dos guardas, escolta e chegada                                                               |
| VisuMZ_4_GabWindow      | ativo; WaitForGab aparece apenas nas barriers materializadas                                                                                                       |
| VisuMZ_2_VNPictureBusts | ativo; busts e background são limpos dentro das páginas VN antes de FinishVisualNovel                                                                              |

Cada ida a VN termina primeiro o lock EX. Ao retornar, o plugin reinstala o interpreter do evento de origem imediatamente depois do label único e o evento abre um novo ciclo de cutscene quando
necessário.

## Entradas QuestVN

| Entry key                        | Mapa/evento | Estado aceito | Retorno                                              |
| -------------------------------- | ----------- | ------------: | ---------------------------------------------------- |
| ABERTURA_FORJAPRATA              | Map049 E1   |            10 | retorno normal à origem Map045 E11; sem resume label |
| SEMIFINAL_DRAGOBUR_ARRIVAL       | Map065 E1   |            50 | Map062 E2: SEMIFINAL_AFTER_ARRIVAL_VN                |
| SEMIFINAL_DRAGOBUR_AUTHORIZATION | Map065 E2   |            80 | Map062 E2: SEMIFINAL_AFTER_AUTHORIZATION_VN          |
| SEMIFINAL_CELEBRATION            | Map065 E3   |           110 | Map062 E6: SEMIFINAL_AFTER_CELEBRATION_VN            |
| SEMIFINAL_GUARD_INTERVENTION     | Map065 E4   |           110 | Map062 E6: SEMIFINAL_AFTER_GUARD_VN                  |

Map065 usa CoretoMapType VN, parallax VN_Semifinal_BG, 17×13 tiles, sem autoplay de BGM/BGS e quatro eventos Action Button iniciados programaticamente pelo router.

## Score as-built

### CS-SEM-STORY-HANDOFF — Map022 E17

1. Posiciona o jogador em (12,13), faz fade in e move Rheed para (8,12).
2. Abre Coreto_Cutscene, aguarda Animation 35 em E18 e faz fade out.
3. Remove ator 1, adiciona Thorin (ator 3), executa o vídeo Cutscene 2.
4. Executa a-semifinal.START_STORY e noite-da-historia.ARRIVE_MAP045.
5. Termina o lock e transfere uma vez para Map045 (2,4).

### CS-SEM-OPENING-FORJAPRATA — Map045 E11 / Map049 E1 / Map045 E36

Map045 E11, em estado 10:

- abre lock, toca sono em loop, faz fade in e espera;
- usa Theme3, Wind2 e Magic2;
- varia opacidade do player, encerra BGS, faz fade out;
- liga self switch A, termina o lock e entra na VN.

Map049 E1 mostra as quatro pictures do pesadelo com fade entre elas. Antes de terminar a VN, liga self switch A dos eventos 21–39 em Map045.

Map045 E36:

- começa Rheed e as dezoito crianças com opacidade zero;
- toca Town1, faz fade in e dispara Animation 35 em E33;
- aumenta a opacidade do grupo em seis degraus até 255;
- move Rheed left → up → left e termina voltado para baixo;
- espera a Gab de apresentação;
- executa rota concorrente de giro em E35/E39, salto em E33 e reação temporizada de E29;
- espera cada fronteira semântica antes da próxima fala;
- após a última Gab, liga self switch B.

A página B reduz a opacidade do grupo até zero, liga os self switches de cleanup e reidrata o perfil AnimaX de Sáparo quando necessário. O despertar materializado fica na página D de Map045 E11.

### CS-SEM-URGENT-ROUTE — Map061

Os nove bloqueios não abrem Coreto_Cutscene; eles são branches locais dentro das páginas existentes:

- em V29 = 40, substituem a ação por uma Gab forçada e saem da lista;
- fora de 40, continuam para o comportamento herdado;
- E14/E15/E16/E17/E28 mantêm Open1 e rotas de porta depois do branch urgente; E7/E12/E21/E23 não tocam Open1 no bloqueio;
- não existe WaitForGab, mutação de estado ou transferência no branch urgente.

### CS-SEM-ARRIVE-STADIUM — Map062 E20

Página Autorun em 40:

1. abre lock;
2. inicia BGS People1 em volume 35;
3. executa ARRIVE_STADIUM;
4. termina lock.

Não há movimento ou câmera autorados nessa página. A posição de entrada vem da transferência Map061 → Map062 (1,7).

### CS-SEM-DRAGOBUR-ARRIVAL-011 — Map062 E2

Em 50, a interação:

1. abre e encerra imediatamente um ciclo EX;
2. entra em SEMIFINAL_DRAGOBUR_ARRIVAL;
3. retorna ao label SEMIFINAL_AFTER_ARRIVAL_VN;
4. abre novo lock;
5. executa REQUIRE_HELMET;
6. enfileira a Gab de continuidade;
7. termina o lock sem WaitForGab.

E19 mantém uma barreira física sem imagem sobre o tile (12,5) até 90.

### CS-SEM-LOCKER-ENTRY — Map063 E6

Em 60, Player Touch abre lock, enfileira uma única Gab no player e termina imediatamente. Não há barrier, movimento ou mutação.

### CS-SEM-LOCKER-GAG — Map063 E7

A primeira execução fica disponível pela página V29 ≥ 50 até a página terminal V29 ≥ 120 vencer:

1. abre lock e foca E2 por 30 frames;
2. aproxima para 200% em 30 frames;
3. dispara balloons em E2/E3/E4/E5 e no player;
4. aguarda foco e zoom;
5. entra e sai com o bust Portraits/Futebol/Menina_medo_cansada;
6. entrega a Gab da jogadora e usa WaitForGab;
7. espera 15 frames após novos balloons;
8. faz E4/E3/E5 virarem-se para o player; E2 move para (15,20);
9. dispara Animation 39 em E2 e Damage3;
10. move Thorin um tile para baixo;
11. volta o foco ao player e o zoom a 100%, aguardando ambos;
12. liga self switch A e termina o lock.

O repeat usa apenas a Gab curta, sem BeginCutscene, animação, som, câmera ou movimento.

### CS-SEM-HELMET-STATUE — Map063 E13

| Estado/página       | Comportamento                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 50, Action Button   | filler sobre a estátua; sem lock, item ou transição                                                                                               |
| 60, Action Button   | lock; cinco Gabs de leitura; barrier; duas Gabs de retirada; barrier; grant condicional de Armor 51; Open1; TAKE_HELMET; Finish; abre Scene_Equip |
| 70, Parallel        | se ator 3 equipou Armor 51, executa EQUIP_HELMET e liga self switch A; sem lock ou waits                                                          |
| 80, self A, Autorun | apresentação da transformação e cleanup                                                                                                           |
| 80, Action Button   | recovery com uma Gab compacta                                                                                                                     |

Map062 E20 repete as duas páginas de detecção/apresentação para equipamento realizado no estádio.

Apresentação comum:

1. abre lock;
2. foca o player e aproxima para 200% em 20 frames;
3. aguarda foco/zoom;
4. move Thorin dois passos para trás com Through ON/OFF, rota aguardada e skippable;
5. toca Equip1, Animation 91 Vento 1 e shake power 3 / speed 5 / 20 frames;
6. retorna zoom e foco em 24 frames e aguarda;
7. enfileira três Gabs e usa WaitForGab;
8. termina lock e desliga o latch local.

A skin não é trocada por comando nessa lista: Armor 51 possui xAnimaSet OldHelmet e o ator 3 declara o mesmo set.

### CS-SEM-DRAGOBUR-AUTHORIZATION-011 — Map062 E2

Em 80, E2 abre lock e testa Armor 51 no ator 3:

- se falhar, mostra a Gab de requisito, encerra lock e devolve controle;
- se passar, salta ao label da autorização, encerra lock e entra na VN;
- ao retornar, abre novo lock, executa AUTHORIZE_FIELD, enfileira a Gab de campo e encerra sem barrier.

### CS-SEM-MATCH-ELISION — Map064 E8/E9

E8 é um Autorun mínimo que executa ENTER_FIELD. E9 assume em 100:

1. abre lock e dispara Animation 35 no player;
2. enfileira as falas LOSING e “Aí não!” e aguarda;
3. enfileira ENTRY e GOAL e aguarda;
4. enfileira VICTORY e “EU SABIA!” e aguarda;
5. toca ME Victory1 em volume 70;
6. muda a opacidade de E4, E5, E6 e E7 para zero, uma rota aguardada por evento;
7. executa ESTABLISH_VICTORY, termina lock e transfere para Map062 (11,7).

E9 usa sprite Reed. O runtime não contém rotas de materialização para um grupo infantil nesse mapa; E4 funciona como anchor das reações e E4–E7 são apenas ocultados no cleanup.

### CS-SEM-STADIUM-FINALE-011 — Map062 E6

E6 é o único Autorun elegível em 110.

#### Segmento A — preparação e celebração

1. Abre lock.
2. Reposiciona E5/E14, ainda sem imagem, em (7,6)/(8,6).
3. Move E3 para (15,3), E4 para (18,3), E7 para (8,3) e E8 para (11,3); todas as rotas usam Through ON → Move to → Through OFF, são aguardadas e skippable.
4. Termina lock, entra em SEMIFINAL_CELEBRATION e sai do interpreter.

#### Segmento B — saída dos rivais e entrada dos guardas

No label de retorno:

1. abre lock e foca E7;
2. move E7/E8 para (2,6)/(2,8);
3. torna E5/E14 visíveis como Killin/Mhordred e move-os para (1,7)/(1,8);
4. enfileira as duas Gabs filler e aguarda;
5. move E7/E8 para (0,6)/(0,8), torna-os transparentes e mantém facing para cima;
6. passa a câmera para E5;
7. move E5/E14 para (11,10)/(12,10);
8. apaga qualquer branch temporário anterior;
9. termina lock, entra em SEMIFINAL_GUARD_INTERVENTION e sai.

#### Segmento C — branch e batalha

No segundo label de retorno:

1. abre lock;
2. se o branch for resist, apaga o carrier, adiciona Filena e executa Battle Processing Troop 19, com escape desativado e derrota permitida;
3. vitória excepcional e derrota normal saltam ao mesmo label de cleanup;
4. Gentle apenas apaga o carrier e segue ao mesmo label;
5. o cleanup restaura HP máximo dos atores 3 e 4 e remove o ator 4;
6. E5/E14 têm imagem, priority, collision e through reidratados por script após o refresh de VN/party.

#### Segmento D — escolta e transferência

1. Enfileira a formação de Killin e a despedida de Filena; uma única WaitForGab protege ambas.
2. Foca o player e aguarda foco/zoom.
3. Move Killin para (10,7) e Mhordred para (12,7); Thorin permanece em (11,7).
4. Move, em paralelo, Killin para (7,7), Thorin para (8,7) e Mhordred para (9,7). A última rota, de Mhordred, é aguardada; os três recebem direção final esquerda.
5. Faz fade out.
6. Executa COMMIT_ESCORT, toca Move1, termina lock e transfere para Map044 (5,23), com Thorin voltado para cima na chegada.

Não existe wait entre COMMIT_ESCORT, FinishCutscene e a transferência.

### CS-SEM-HOME-ARRIVAL — Map044 E10/E15/E16

E10 em 120:

1. abre lock;
2. faz fade in;
3. foca o player em 20 frames e aguarda foco/zoom;
4. entrega a Gab de Thorin e aguarda;
5. executa ARRIVE_HOME;
6. executa fim-de-jogo.START;
7. termina lock.

E10 tem página recovery não Autorun em 900.

E15/E16 usam a seguinte precedência:

| Página   | Condição  | Visual/interação                                          |
| -------- | --------- | --------------------------------------------------------- |
| base     | V29 ≥ 0   | invisível, through                                        |
| chegada  | V29 ≥ 120 | Mhordred/Killin visíveis e interativos                    |
| terminal | V29 ≥ 900 | continuam visíveis e interativos                          |
| cleanup  | V32 ≥ 1   | última página elegível; invisível, sem interação, through |

As páginas visíveis usam Gab forçada com bypass anti-repeat e não aguardam conclusão.

## Matriz de recovery

| Fronteira                       | Proteção materializada                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| abertura                        | asserts de estado/sessão, self switches e páginas não Autorun depois do cleanup              |
| rota urgente                    | branch interno apenas em V29 = 40; comportamento herdado fora dele                           |
| primeira/segunda VN de Dragobur | resume labels únicos no próprio E2                                                           |
| gag                             | self switch A impede repetição da coreografia                                                |
| elmo                            | grant condicional; detecção V70 separada da apresentação V80; latch local; recovery compacto |
| elipse                          | página E9 vazia em 110 impede replay                                                         |
| finale                          | E6 deixa de ser elegível em 120; branch é temporário e apagado                               |
| chegada                         | E10 recovery em 900; guardas só somem quando V32 ≥ 1                                         |

## Divergências antigas removidas deste score

- Killin/Mhordred não entram atualmente por (11,16)/(12,16) nem aparecem inicialmente em (0,7)/(0,8); o fluxo materializado usa (7,6)/(8,6) ocultos, depois (1,7)/(1,8) visíveis e finalmente
  (11,10)/(12,10).
- A formação final não termina em (10,7)/(11,7)/(12,7); esse é o alinhamento antes da caminhada. O último frame antes do fade usa (7,7)/(8,7)/(9,7).
- A elipse da partida não materializa crianças por opacidade nem move Rheed; apenas usa E9/E4 como anchors e oculta E4–E7 no cleanup.
- Cues e beats não presentes nas listas de evento não são tratados como implementados por este documento.

## Validação humana

Os comandos e a estrutura acima estão materializados, mas o código não prova ritmo, legibilidade, conforto do gag, impacto da transformação, clareza espacial da troca rival/guarda ou continuidade
perceptiva após VN/batalha. Esses critérios continuam marcados como pending_retest.
