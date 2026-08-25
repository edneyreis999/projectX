---
status: implemented
owner: Audio Designer
quest: A Semifinal
document_kind: as-built audio map
contract_version: 2.0.0
runtime_snapshot: 362e2da0
human_listening_validation: pending_retest
language: pt-BR
---

# A Semifinal — áudio materializado

## Autoridade

Este documento registra apenas BGM, BGS, ME, SE, animações com sound timings e políticas de áudio que estão presentes no código/dados atuais. Cues propostos nas tasks 010/011 que não viraram comando
ou configuração de runtime aparecem separadamente como não materializados.

Nenhum resultado de escuta humana é inferido da presença dos assets.

## Política efetiva das VNs

A extensão questVN de a-semifinal usa audioPolicy restore-origin. Coreto_QuestVN captura AudioManager.saveBgm() e saveBgs() na origem e executa replayBgm/replayBgs ao retornar.

Consequências materializadas:

- a abertura em Map049 restaura o contexto capturado de Map045;
- as quatro VNs de Map065 restauram o contexto capturado de Map062;
- as VNs não possuem autoplay próprio;
- o plugin restaura apenas o snapshot de origem; ele não cria ducking, crowd, marcha, stinger ou fade sem que o mapa os comande.

## Inventário por cena

### Handoff e abertura

| Superfície            | Comando/asset         | Parâmetros                    | Observação                                  |
| --------------------- | --------------------- | ----------------------------- | ------------------------------------------- |
| Map022 E17            | Animation 35 Nevoeiro | alvo E18, wait ativo          | contém Blind 90/70 e Sand 90/110 no frame 0 |
| Map022 E17            | vídeo Cutscene 2      | após fade out                 | playback de vídeo, não BGM/ME               |
| Map045 E11, início    | BGM Theme3            | volume 55, pitch 50           | inicia antes da VN                          |
| Map045 E11, início    | BGS Wind2             | volume 50, pitch 100          | fade de 1 segundo antes da ida à VN         |
| Map045 E11, início    | SE Magic2             | volume 50, pitch 130          | acompanha a preparação do pesadelo          |
| Map045 E36            | BGM Town1             | volume 50, pitch 100          | inicia na apresentação de Rheed             |
| Map045 E36            | Animation 35 Nevoeiro | alvo E33, sem wait no comando | sons embutidos Blind/Sand                   |
| Map045 E11, despertar | SE Miss               | volume 90                     | acompanha balloon e reação de Thorin        |
| Map045 E20            | SE Chest1             | volume 90                     | abertura do baú da Funda                    |

Map049 E1 não possui comandos próprios de áudio. A sessão retorna ao áudio capturado em Map045.

### Corrida urbana

Os nove branches urgentes de Map061 não tocam SE: em V29 = 40, a Gab é exibida e a lista termina antes dos comandos herdados de porta.

Open1 continua presente fora do branch urgente em E14, E15, E16, E17 e E28. E7, E12, E21 e E23 não têm SE no feedback da semifinal. Map061 não inicia BGM, BGS ou ME.

### Estádio, vestiário e campo

| Superfície                            | Comando/asset                 | Parâmetros              | Repetição materializada                          |
| ------------------------------------- | ----------------------------- | ----------------------- | ------------------------------------------------ |
| Map062 E20, chegada                   | BGS People1                   | volume 35, pitch 100    | uma vez na transição 40→50                       |
| Map063 E7, gag                        | Animation 39 Pancada Corporal | alvo E2                 | primeira execução apenas                         |
| Map063 E7, gag                        | SE Damage3                    | volume 50, pitch 100    | junto da Animation 39; repeat não toca           |
| Map063 E13, retirada                  | SE Open1                      | volume 80, pitch 100    | somente quando Armor 51 é concedida              |
| Map063 E13 ou Map062 E20, equipamento | SE Equip1                     | volume 90, pitch 100    | uma vez na apresentação V80                      |
| mesma apresentação                    | Animation 91 Vento 1          | alvo player             | contém Wind5 90/80 e flash branco                |
| Map064 E9, moldura                    | Animation 35 Nevoeiro         | alvo player, wait ativo | uma vez em V100                                  |
| Map064 E9, vitória                    | ME Victory1                   | volume 70, pitch 100    | depois da última WaitForGab                      |
| Map062 E6, escolta                    | SE Move1                      | volume 80, pitch 100    | depois de COMMIT_ESCORT e antes da transferência |

Animation 39 contém:

- frame 0: Thunder2, volume 90, pitch 80;
- frame 2: Thunder8, volume 90, pitch 100;
- frame 2: Blow3, volume 100, pitch 50;
- frame 2: flash branco de 30 frames.

Animation 91 contém:

- frame 0: Wind5, volume 90, pitch 80;
- frame 9: flash branco com alpha 170 por 30 frames.

Animation 35 contém Blind e Sand no frame 0 e flash frio a partir do frame 29. Os eventos não duplicam esses SE por comandos adicionais.

## Batalha Resist

Map062 E6 usa Battle Processing com Troop 19, escape desativado e derrota permitida. Não há comandos de BGM/ME exclusivos dentro do evento; o sistema usa os defaults de System.json:

| Papel          | Asset               |
| -------------- | ------------------- |
| BGM de batalha | Battle1, volume 90  |
| ME de vitória  | Victory1, volume 90 |
| ME de derrota  | Defeat1, volume 90  |

Vitória excepcional e derrota normal entram no mesmo cleanup de evento. Não existe stinger adicional, fala sonora, marcha ou cue de reconvergência autorado no mapa.

## O que não está materializado

Os seguintes comportamentos apareciam no contrato prospectivo, mas não possuem comandos ou automação própria no runtime atual:

- Town1 + City iniciados pela corrida em Map061;
- crossfade City → People1 ao entrar no estádio;
- ducking ou rarefação de People1 durante Dragobur, celebração ou entrada dos guardas;
- BGM/BGS dedicados às quatro VNs;
- Decision2 explícito para Gentle/Resist;
- cue de celebração separado;
- silêncio/stop dedicado ao reconhecimento da Guarda;
- fade ou stop explícito de People1 antes da batalha, da escolta ou da chegada à casa;
- retomada explícita de Town1/City em Map044;
- crowd esportiva, apito final bespoke ou marcha da Guarda de Ferro.

O Visual Choice e a Battle Scene ainda podem produzir feedback padrão de seus plugins/sistema, mas esse comportamento não é autorado por comandos da semifinal e não é apresentado aqui como cue
dedicado.

## Fronteiras e risco técnico atual

| Fronteira            | Verdade do código                                                                     |
| -------------------- | ------------------------------------------------------------------------------------- |
| Map045 → Map061      | Map061 não muda o áudio; qualquer continuidade depende do áudio que já estava tocando |
| Map061 → Map062      | E20 inicia People1, sem comando para trocar BGM                                       |
| Map062 ↔ Map065     | QuestVN restaura BGM/BGS capturados na origem                                         |
| Map062 ↔ Map063/064 | os mapas não têm autoplay; não há comando de restart de People1                       |
| Map064 → Map062      | Victory1 é tocada antes da transferência; não existe stop adicional no evento         |
| Map062 → Battle      | transição nativa da batalha usa os defaults de System.json                            |
| Battle → Map062      | cleanup do evento não emite comando sonoro                                            |
| Map062 → Map044      | Move1 toca; Map044 não inicia nem interrompe BGM/BGS                                  |

Há, portanto, uma lacuna objetiva: o código não contém cleanup explícito de People1 antes de Map044. Este documento não afirma que o BGS está ausente na chegada; isso precisa ser observado em runtime
ou corrigido em uma task futura.

## Fallbacks não sonoros já presentes

- urgência: bloqueio físico e Gab de Thorin;
- gag: câmera, balloons, movimento, Animation 39 e recuo;
- retirada/equipamento: mudança persistente da estátua, Armor 51, skin, zoom, shake e copy;
- vitória: quatro fatos em texto e transição 100→110;
- escolha: copy distinta e consequência de batalha apenas em Resist;
- escolta: formação, caminhada, fade e transferência;
- chegada: exterior, guardas visíveis, fala de Thorin e estado 900.

## Validação humana pendente

O reteste deve observar especialmente:

1. se Theme3/Wind2/Magic2 e Animation 35 não criam pico na abertura;
2. se o stack de Animation 39 + Damage3 continua confortável e legível;
3. se Equip1 + Wind5 + shake sincronizam com a troca visual;
4. se Victory1 termina sem cobrir o início da celebração;
5. se Battle1/Defeat1/Victory1 não deixam cauda sobre a convergência;
6. se People1 persiste indevidamente na batalha, escolta ou Map044;
7. se o fluxo inteiro continua compreensível em mute.

Até haver evidência dessa execução, human_listening_validation permanece pending_retest.
