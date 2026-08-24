---
status: approved
owner: Audio Designer
quest: A Semifinal
contract_version: 1.1.0
language: pt-BR
human_listening_validation: pending
---
# A Semifinal — Contrato de Audio

## Autoridade, finalidade e fronteiras

Este documento e a fonte aprovada de intencao sonora da semifinal. Os IDs `CUE-SEM-*` sao interfaces estaveis para Scene Presentation e Gameplay Engineering; numeros de linha nao sao interfaces.

Audio Design decide funcao, hierarquia, canal, reuso, comportamento, risco, fallback e criterio de escuta. Nao decide copy, ordem narrativa, coreografia, coordenadas, estado canonico da quest, comandos finais do RPG Maker, instalacao de plugins nem aprovacao perceptiva. Gameplay Engineering traduz este contrato para comandos existentes sem alterar silenciosamente sua intencao. Scene Presentation decide staging, movimento, camera, zoom, awaits e cleanup espacial.

Nenhum fato essencial depende de audio. Perder, mutar ou omitir qualquer cue nunca pode apagar texto, staging, estado de inventario, formacao espacial, destino ou retorno de controle.

## Fontes consultadas

- Foundation: `docs/GDD/00_Foundation/00.1_Core_Concept/Core _Concept.md`, `Core _Concept_Comercial.md`, `docs/GDD/00_Foundation/00.2_Fundation_details/Foundation_Details.md` e `docs/GDD/00_Foundation/00.3_Tone_Vibe/Tone_Vibe.md`.
- Quest e copy: `docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md` e `docs/Quests/2-semifinal/semifinal.dialogos.md`.
- Correcao 011: `.compozy/tasks/011-semifinal-playtest-remediation/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md` e ADR-001 a ADR-009; incidencia sonora direta de ADR-001, ADR-004, ADR-005, ADR-006 e ADR-008.
- Baseline historico protegido: `.compozy/tasks/010-semifinal-completa/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md`, `task_02.md` e ADR-001 a ADR-011. Esses artefatos sao fonte read-only; semantica superseded nao e autoridade atual.
- Direcao: `planos/010-guia-migracao-nova-arquitetura/fase2/grill-me-with-docs-2026-08-19.md` e `direcao-arte-cutscenes-semifinal-2026-08-19.md`.
- Arquitetura: `docs/architecture/exploration-dialogue-gabwindow.md` e `docs/project-conventions/scene-routing-ex-vn.md`.
- Runtime e inventario: `frontend/data/Map061.json` a `Map064.json`, `Map044.json`, `Map045.json`, `MapInfos.json`, `System.json`, `Animations.json` e `frontend/audio/{bgm,bgs,me,se}/`.

## Conflitos resolvidos

- ADR-006 prevalece sobre a restricao posterior do gag: o stack sonoro atual do impacto e preservado. Sua densidade permanece risco de escuta humana, nao autorizacao para reescrever o beat.
- ADR-011 e a direcao consolidada impedem anuncio sonoro precoce dos guardas. A presenca pode entrar perifericamente, mas a mudanca sonora de prioridade so ocorre depois do reconhecimento coletivo legivel.
- A partida de Futebol Runico nao e gameplay. Audio sugere contexto e progressao, sem HUD, combate, tutorial, sequencia extensa de acao ou falsa promessa de controle; isso nao se aplica a batalha Resist aprovada pela 011.
- A escala da festa e a autoridade da Guarda de Ferro surgem de relacoes entre densidade, rarefacao e espaco para fala. Este contrato nao exige aumento de loudness nem marcha grandiosa.
- A regra geral de Gab nao bloqueante continua valida. Audio cede a fala enquanto a coreografia pode continuar; `WaitForGab` e barreira de Scene Presentation, nao gatilho para elevar volume.
- 011 ADR-001 move bronca, autorizacao, celebracao/rivais e intervencao dos guardas para quatro VNs. O audio preserva continuidade nas fronteiras EX/VN, mas nao reativa IDs 010 de progressao.
- 011 ADR-004 corrige o pedido do elmo: a sonoridade de retirada/equipamento nao pode sugerir que Dragobur indicou ou premiou antecipadamente o item da estatua.
- 011 ADR-005 substitui Resist somente dialogado por batalha real. Gentle nao abre batalha; Resist possui entrada, combate, resultado e cleanup sonoro proprios antes da convergencia comum.
- 011 ADR-006 insere os Martelos de Bronze na celebracao. A hostilidade e a classe permanecem na copy; o mix apenas protege alternancia, contraste e inteligibilidade.
- 011 ADR-008 mantem todo pacote 010 imutavel. Este contrato 1.1.0 e a confirmacao autoral de Audio para a linhagem 011 e deve receber fingerprint novo antes do Gameplay preflight.

## Politica sonora das quatro VNs 011

As entradas `SEMIFINAL_DRAGOBUR_ARRIVAL`, `SEMIFINAL_DRAGOBUR_AUTHORIZATION`, `SEMIFINAL_CELEBRATION` e `SEMIFINAL_GUARD_INTERVENTION` usam o audio policy do `Coreto_QuestVN` para preservar o contexto do estadio sem restart, duplicacao ou troca semantica de bed. Cada caller EX fecha lock e Gab ativa antes de entrar; cada VN limpa choice, bustos e background antes do retorno; o audio volta ao estado EX descrito abaixo sem segunda instancia.

| Sessao VN | Estado de entrada | Comportamento durante a VN | Retorno e fallback |
| --- | --- | --- | --- |
| `SEMIFINAL_DRAGOBUR_ARRIVAL` | `Town1` + `People1` do estadio | preservar os beds em nivel contido; `CUE-SEM-DRAGOBUR-SPACE-001` protege todas as linhas `VN-SEM-DRAGOBUR-ARRIVAL-*` | retomar o mesmo bed sem restart; `GAB-SEM-CONTINUE-HELMET-011` fica inteligivel; se preserve/resume falhar, silencio com copy, staging e objetivo visiveis e preferivel a iniciar outra faixa |
| `SEMIFINAL_DRAGOBUR_AUTHORIZATION` | mesmo bed do estadio | preservar e rarefazer para `VN-SEM-DRAGOBUR-AUTH-*`; nenhum stinger pontua raiva, inocencia ou autorizacao | retomar uma instancia; `GAB-SEM-CONTINUE-FIELD-011` ancora o campo; interrupcao mantem V80 sem cue terminal ou permissao sonora falsa |
| `SEMIFINAL_CELEBRATION` | `CUE-SEM-CELEBRATION-001` depois da vitoria | sustentar pertencimento, hostilidade dos Martelos, respostas, orgulho e presente sem fanfarra de item; fala P0 sempre vence | limpar sem anunciar guardas; EX recebe a saida dos rivais com o patamar ainda coerente; falha de resume usa grupo, copy e staging como fallback |
| `SEMIFINAL_GUARD_INTERVENTION` | `People1` ja rarefeito depois do reconhecimento EX | manter espaco para `VN-SEM-GUARD-*` e `VN-SEM-CHOICE-*`; nenhum march/stinger, nenhuma assinatura moral de branch | Gentle retorna a custodia silenciosamente; Resist retorna ao preparo da batalha; cleanup de VN termina antes de qualquer audio de combate |

VN interrompida nunca dispara cue de conclusao, avanca bed para a fase seguinte nem deixa ME/SE pendente. Reentrada restaura a politica correspondente a partir do estado canonico, nao da posicao temporal de audio anterior. Nenhum fallback sonoro substitui assert de sessao, copy, escolha, transicao de quest ou retorno de controle.

## Evidencia de inventario exato

### Superficies Map061–064

Parsing estruturado confirma que os quatro mapas sao `EX_`, nao usam autoplay de BGM/BGS e nao possuem comandos atuais de BGM, BGS ou ME. As referencias de audio atuais ligadas ao recorte sao:

| Superficie | Referencia atual | Parametros atuais | Decisao |
| --- | --- | --- | --- |
| Map061, portas | `audio/se/Open1.ogg` | volume 90, pitch 100, pan 0 | Candidato de materialidade para tentativa de porta; o novo branch bloqueado nao pode soar como entrada concluida. |
| Map061–064, transferencias existentes | `audio/se/Move1.ogg` | volume 90, pitch 100, pan 0 | Reuso de transicao; uma unica emissao por transferencia aprovada. |
| Map063 E7 | `audio/se/Damage3.ogg` | volume 50, pitch 100, pan 0 | Parte protegida do gag, uma vez no primeiro impacto. |
| Map063 E13 | `audio/se/Open1.ogg` | volume 90, pitch 100, pan 0 | Baseline de retirada/liberacao fisica do elmo; nao e fanfarra de loot. |

Map063 E7 tambem dispara Animation 39, `Pancada Corporal`. A animacao possui timings embutidos para `Thunder2.ogg` (90/80/0), `Thunder8.ogg` (90/100/0) e `Blow3.ogg` (100/50/0). Esses sons pertencem a animacao: nao adicionar copias por comandos SE.

A linguagem de materializacao de Rheed usa Animation 35, `Nevoeiro`, cujo baseline embute `Blind.ogg` (90/70/0) e `Sand.ogg` (90/110/0). O cue de moldura referencia essa animacao e nao duplica seus SE.

### Ativos selecionados e case exato

Todos os arquivos abaixo existem com exatamente este nome e extensao:

| Canal | Asset exato | Estado de uso | Funcao aprovada |
| --- | --- | --- | --- |
| BGM | `frontend/audio/bgm/Town1.ogg` | reuso selecionado; ja usado na abertura atual | Continuidade comunitaria da corrida ao estadio e retorno exterior. |
| BGM | `frontend/audio/bgm/Battle1.ogg` | default atual de `System.json`; Resist somente | Identificar a entrada real em Battle Scene sem prometer possibilidade narrativa de fuga ou branch permanente. |
| BGS | `frontend/audio/bgs/City.ogg` | reuso selecionado | Base urbana discreta no distrito e exterior da casa. |
| BGS | `frontend/audio/bgs/People1.ogg` | reuso selecionado | Presenca humana generica no estadio; nao afirmar torcida bespoke. |
| ME | `frontend/audio/me/Victory1.ogg` | reuso selecionado na elipse e default atual de `System.json`; condicional a hierarquia | Pontuar a vitoria narrada somente depois do texto; no win excepcional de Resist, reconhecer apenas o resultado mecanico dentro da Battle Scene. |
| ME | `frontend/audio/me/Defeat1.ogg` | default atual de `System.json`; batalha Resist | Feedback do resultado mecanico normal dentro da Battle Scene; nao comunica Game Over nem altera a captura. |
| SE | `frontend/audio/se/Open1.ogg` | baseline atual | Porta/tentativa e liberacao fisica do elmo, conforme cue. |
| SE | `frontend/audio/se/Damage3.ogg` | baseline protegido | Acento explicito do gag em Map063 E7. |
| SE | `frontend/audio/se/Equip1.ogg` | reuso selecionado | Confirmacao de equipamento, sem semantica de premio. |
| SE | `frontend/audio/se/Move1.ogg` | baseline atual | Transferencia unica entre superficies. |
| SE | `frontend/audio/se/Decision2.ogg` | reuso selecionado | Confirmacao neutra da escolha aceita; igual nos dois branches. |
| SE | `Blind.ogg`, `Sand.ogg` | propriedade de Animation 35 | Materializacao da moldura; sem comandos duplicados. |
| SE | `Thunder2.ogg`, `Thunder8.ogg`, `Blow3.ogg` | propriedade de Animation 39 | Stack protegido do impacto; sem comandos duplicados. |

Nao existe referencia atual a crowd, stadium ou march bespoke em Map061–064. `People1.ogg` e um substituto generico deliberado. Crowd esportiva com variacoes, apito final bespoke, marcha da Guarda de Ferro e tratamento dedicado de estadio sao oportunidades pos-MVP, nunca dependencias ocultas.

Existencia de arquivo e parsing nao aprovam timbre, duracao, loop, loudness, conforto, mono, espacializacao ou adequacao dramatica. Esses itens permanecem `pending` para escuta humana.

## Hierarquia e regras globais

### Prioridade contextual

1. `P0` — fala/fato essencial e retorno seguro de controle; todo outro audio cede.
2. `P1` — mudanca semantica ja legivel por texto/staging: impacto protegido, equipamento confirmado, vitoria e reconhecimento coletivo.
3. `P2` — acao e transicao: porta, retirada, escolha e transferencia.
4. `P3` — BGM/BGS de contexto; nunca disputa Gab ou define causalidade sozinho.

Resolver masking primeiro por rarefacao, envelope, exclusao e ducking; nao por elevar volume. Preservar headroom nos stacks das Animations 35/39 e durante ME. Este contrato nao fixa loudness, ganho, duracao em frames ou budget de vozes sem evidencia tecnica e escuta na build.

### Concorrencia, repeticao e latencia

- Uma BGM e uma BGS contextuais no maximo, conforme os canais nativos. ME interrompe/resume BGM apenas no cue aprovado.
- Nenhum cue de interacao acumula instancias. Repetir entrada bloqueada substitui a tentativa anterior; repetir choice input nao duplica confirmacao; transferencia em reavaliacao nao repete SE.
- O gag de primeira vez preserva exatamente o stack atual e nao recebe acento adicional. O repeat do gag nao repete impacto nem Animation 39.
- Cues de acao ocorrem no mesmo beat observavel da acao. Nao ha budget numerico de latencia aprovado; dessincronia perceptivel e criterio humano de falha.
- Randomizacao nao e necessaria no MVP. Caso surja depois, deve ser reproduzivel em diagnostico e preservar identidade.

### Falha e mute

- Asset faltante durante preflight e `reference_missing`; Gameplay nao substitui por nome parecido ou case diferente.
- Se o canal estiver mutado, indisponivel ou deliberadamente omitido, o evento continua somente quando o fallback textual/visual abaixo estiver presente.
- Silencio intencional ocorre apenas em `CUE-SEM-GUARD-RECOGNITION-001`; precisa coexistir com mudanca visual/textual. Silencio por asset ausente, mute ou trigger quebrado nao pode ser rotulado como intencional.

## Catalogo de cues

### CUE-SEM-BED-CITY-001 — Corrida urbana

- Funcao / custo de perda: sustentar urgencia cotidiana e continuidade com a abertura; se inaudivel, nenhum fato se perde.
- Beat e joins: cenas 3-A–3-E; `DL-SEM-URGENT-THORIN-001`.
- Evento / precondicao: entrada no estado de corrida em Map061, antes de interacoes bloqueadas.
- Canal / asset: BGM `Town1.ogg` + BGS `City.ogg`.
- Start / stop / fade: iniciar ou preservar BGM sem restart audivel; trazer City por fade curto de entrada. Na chegada observavel a Map062, trocar City por `CUE-SEM-STADIUM-BED-001` por crossfade sem lacuna nem sobreposicao prolongada.
- Prioridade / concorrencia: P3; duck durante Gabs P0 e SE P1/P2. Nao reiniciar por cada porta.
- Repeticao / interrupcao / persistencia: persiste em Map061; reentrada retoma sem duplicar. Transferencia ao estadio interrompe apenas a BGS urbana.
- Cleanup: nenhuma instancia urbana deve permanecer sobre People1 no estadio.
- Fallback: rota, diario e `DL-SEM-URGENT-THORIN-001` comunicam urgencia; mute nao altera bloqueio.
- Risco / criterio humano: verificar loop e transicao repetidos, ausencia de clique e se a base nao mascara a Gab em volume baixo/mono.

### CUE-SEM-URGENT-BLOCK-001 — Tentativa recusada

- Funcao / custo de perda: dar materialidade breve a porta tentada sem sugerir entrada; custo baixo.
- Beat e joins: 3-B/3-C/3-D; `DL-SEM-URGENT-THORIN-001`.
- Evento / precondicao: uma tentativa valida de entrada enquanto a urgencia da semifinal possui o bloqueio.
- Canal / asset: SE `Open1.ogg`, somente se sincronizado a gesto/facing de tentativa.
- Start / stop / fade: one-shot antes ou junto da reacao de Thorin; sem cauda atravessando o inicio legivel da Gab.
- Prioridade / concorrencia: P2; a Gab P0 vence. Substituir tentativa anterior, sem fila sonora.
- Repeticao / interrupcao / persistencia: uma emissao por interacao; repetir rapidamente nao empilha. Nao persiste depois do controle devolvido.
- Cleanup: nenhuma voz ou loop.
- Fallback: bloqueio fisico, ausencia de transferencia e texto exato. Se Open1 ler como porta aberta em escuta, omitir o SE e manter o fallback.
- Risco / criterio humano: repetir cada porta e confirmar que o som nao promete entrada nem se torna irritante antes do Anti-Repeat/Gab se estabilizar.

### CUE-SEM-STADIUM-BED-001 — Presenca do estadio

- Funcao / custo de perda: diferenciar estadio de rua e sustentar stakes coletivos; nao comunica placar.
- Beat e joins: 4-A–4-D, 5-A, 6-A–6-C e 7-A; falas de chegada, requisito e autorizacao.
- Evento / precondicao: chegada observavel a Map062; continua em Map063/064 quando a cena exigir continuidade espacial.
- Canal / asset: BGM `Town1.ogg` preservada + BGS `People1.ogg`.
- Start / stop / fade: substituir City por fade/crossfade; manter People1 abaixo da fala. Nao restartar em cada ida Map062↔063/064. O estado muda em `CUE-SEM-MATCH-ARC-001` e `CUE-SEM-CELEBRATION-001` por relacao, nao por nova copia.
- Prioridade / concorrencia: P3; cede a Gabs, impacto, ME e ordem.
- Repeticao / interrupcao / persistencia: uma instancia de BGS ao longo do microarco; reentrada nao reinicia do inicio se a continuidade atual puder ser preservada.
- Cleanup: termina antes da chegada a Map044.
- Fallback: personagens, mapa, texto sobre placar e staging estabelecem estadio e equipe.
- Risco / criterio humano: verificar se People1 nao parece outro local, nao mascara Dragobur e nao cria expectativa de crowd esportiva inexistente.

### CUE-SEM-DRAGOBUR-SPACE-001 — Espaco para bronca e autorizacao

- Funcao / custo de perda: proteger inteligibilidade e comedia de Dragobur; o cue e uma relacao de mix, sem novo asset.
- Beat e joins: 4-A–4-D e 6-A–6-C; `VN-SEM-DRAGOBUR-ARRIVAL-*`, `GAB-SEM-DRAGOBUR-SEARCH-011`, `GAB-SEM-DRAGOBUR-EQUIP-011`, `GAB-SEM-CONTINUE-HELMET-011`, `VN-SEM-DRAGOBUR-AUTH-*` e `GAB-SEM-CONTINUE-FIELD-011`.
- Evento / precondicao: inicio de uma fala de Dragobur na VN ou Gab 011 aprovada; nao dispara por IDs 010 superseded.
- Canal / asset: automacao sobre `Town1.ogg`/`People1.ogg`; nenhum SE de pontuacao obrigatorio.
- Start / stop / fade: rarefazer beds ao abrir a fala e retornar suavemente depois que seu fato estiver legivel; nao acentuar cada gesto.
- Prioridade / concorrencia: P0 para voz/texto; movement SE rotineiro e P3 cedem.
- Repeticao / interrupcao / persistencia: aplica por bloco de fala, sem bombear entre linhas proximas. Repeticoes V60/V70 usam a mesma relacao; reentrada de VN nao acumula automacao.
- Cleanup: restaurar o bed apenas quando nao houver outra Gab P0 imediata.
- Fallback: copy e gestos carregam atraso, derrota, capacete e autorizacao.
- Risco / criterio humano: Dragobur deve permanecer urgente, afetuoso, tecnico e digno; validar que ducking nao soa como ameaca nem compressor perceptivel.

### CUE-SEM-GAG-IMPACT-001 — Impacto protegido

- Funcao / custo de perda: materializar a pancada e preservar a assinatura atual do gag; a linha e a retirada de Thorin continuam essenciais.
- Beat e joins: 5-B; `DL-SEM-GAG-LOCKER-001`.
- Evento / precondicao: somente primeira execucao de Map063 E7, no impacto aprovado.
- Canal / asset: Animation 39 com `Thunder2.ogg`, `Thunder8.ogg`, `Blow3.ogg` embutidos + SE explicito `Damage3.ogg` nos parametros atuais.
- Start / stop / fade: timings pertencem a animacao; Damage3 acompanha o impacto atual. Nao adicionar stinger, laugh track ou duplicatas.
- Prioridade / concorrencia: P1; beds cedem. A fala exata deve permanecer legivel antes/depois do stack conforme o score de cutscene.
- Repeticao / interrupcao / persistencia: primeira vez apenas. O repeat `DL-SEM-GAG-LOCKER-REPEAT-001` nao toca Animation 39 nem Damage3.
- Cleanup: one-shots terminam naturalmente; nenhum residuo ao devolver controle.
- Fallback: animacao, movimento coletivo, recuo e linha exata mostram causa e consequencia sem som.
- Risco / criterio humano: stack de quatro componentes pode ser agressivo ou mascarar a Gab; testar conforto e timing sem interpretar preservacao documental como aprovacao perceptiva.

### CUE-SEM-HELMET-TAKE-001 — Retirada do elmo

- Funcao / custo de perda: dar materialidade a retirada, sem semantica de loot raro ou vitoria.
- Beat e joins: 5-C/5-D; `DL-SEM-STATUE-THORIN-001` e `DL-SEM-STATUE-THORIN-TAKE-001`.
- Evento / precondicao: retirada deliberada valida em Map063 E13; nunca em interacao precoce ou reentrada ja reconciliada.
- Canal / asset: SE `Open1.ogg`, baseline atual do evento.
- Start / stop / fade: one-shot no momento em que o objeto deixa a estatua; nao antes da decisao nem depois da alteracao ja visivel.
- Prioridade / concorrencia: P2; Gab e leitura visual da estatua vencem.
- Repeticao / interrupcao / persistencia: uma vez por aquisicao; nao repetir em save/reentry ou segunda interacao.
- Cleanup: nenhum loop; estado alterado e inventario persistem sem audio.
- Fallback: texto identifica origem, estatua muda de estado e Armor 51 aparece no inventario.
- Risco / criterio humano: confirmar que Open1 le como liberacao fisica e nao como porta; se semanticamente incorreto, silencio e o fallback aprovado.

### CUE-SEM-HELMET-EQUIP-001 — Equipamento confirmado

- Funcao / custo de perda: confirmar acao de equipar, sem substituir checagem real do item.
- Beat e joins: 5-E/5-F; `DL-SEM-HELMET-THORIN-FIT-001`.
- Evento / precondicao: Armor 51 realmente equipada em Thorin e reconhecida pelo gate; inventario apenas, outro elmo ou outro ator nao disparam.
- Canal / asset: SE `Equip1.ogg` e Animation 91 `Vento 1`, recuperada da implementação legada; a animação já contém `Wind5.ogg` e flash branco.
- Start / stop / fade: `Equip1` pontua o encaixe; Animation 91 começa sem bloquear, sobrepõe vento/flash ao shake curto e se resolve durante o retorno da câmera antes das três Gabs de reação.
- Prioridade / concorrencia: P1/P2; sem ME, fanfarra ou stack adicional.
- Repeticao / interrupcao / persistencia: uma confirmação por transição válida, disparada automaticamente no primeiro frame do mapa depois que Armor 51 é equipada em Thorin; abrir/fechar menu ou reequipar fora do gate não duplica quest feedback.
- Cleanup: nenhum residuo ao retornar a Map062.
- Fallback: sprite/equipment UI, requisito satisfeito e fala exata confirmam que serviu.
- Risco / criterio humano: validar que o conjunto lê como transformação cômica inspirada em “O Máscara”, não como recompensa final, magia canônica de Thorin ou buff de combate, e que não compete com a piada de respiração.

### CUE-SEM-MATCH-FRAME-001 — Moldura de Rheed

- Funcao / custo de perda: assinar a mudanca para tradicao oral no mesmo mapa EX; nao comunica fatos da partida.
- Beat e joins: 7-A e 7-F; falas de Rheed e criancas.
- Evento / precondicao: materializacao unica de Rheed/criancas em Map064 depois da autorizacao de campo.
- Canal / asset: Animation 35 `Nevoeiro`, com `Blind.ogg` e `Sand.ogg` embutidos.
- Start / stop / fade: disparar uma vez na entrada coletiva; nao repetir SE por personagem. Saida usa limpeza visual sem repetir a animacao/sons salvo nova decisao de Scene Presentation.
- Prioridade / concorrencia: P1 durante materializacao; depois cede integralmente a narracao.
- Repeticao / interrupcao / persistencia: nao repetir depois do estado de vitoria; recovery page nao reproduz.
- Cleanup: esperar o resultado textual antes de remover o grupo; nenhum SE/efeito residual no pos-jogo.
- Fallback: Rheed/criancas visiveis, campo EX reconhecivel e texto mostram a moldura.
- Risco / criterio humano: verificar se os dois SE nao parecem magia hostil, loading ou VN e se nao antecipam/duplicam o gag ou outros efeitos.

### CUE-SEM-MATCH-ARC-001 — Progressao da elipse

- Funcao / custo de perda: sustentar expectativa sem simular futebol jogavel; os quatro fatos ficam em texto.
- Beat e joins: 7-B–7-E; `LOSING`, `ENTRY`, `GOAL`, `VICTORY` e falas das criancas.
- Evento / precondicao: depois da materializacao e antes da limpeza, em ordem semantica aprovada.
- Canal / asset: BGM `Town1.ogg` e BGS `People1.ogg` reaproveitadas; nenhuma cadeia de SE de combate/acao.
- Start / stop / fade: manter beds contidos durante `LOSING`/`ENTRY`; abrir espaco em `GOAL`; nao atingir patamar de celebracao antes de `VICTORY` ser dito.
- Prioridade / concorrencia: P0 para Rheed; criancas apoiam e nao disputam fatos. P3 para beds.
- Repeticao / interrupcao / persistencia: uma passagem; sem loops de gritos ou apitos adicionados.
- Cleanup: encerra no barrier que protege `VICTORY`, antes de `CUE-SEM-VICTORY-001`.
- Fallback: as quatro Gabs nomeadas e staging estabelecem cadeia causal completa.
- Risco / criterio humano: relato livre deve recuperar perder, entrada, gol da virada e vitoria; audio nao pode criar falsa expectativa de input.

### CUE-SEM-VICTORY-001 — Resultado pontuado

- Funcao / custo de perda: pontuar resultado ja declarado e abrir o patamar emocional da festa; nao e fonte da vitoria.
- Beat e joins: fim de 7-E, depois de `DL-SEM-MATCH-RHEED-VICTORY-001`; antes/ao redor de `DL-SEM-MATCH-CHILDREN-002` conforme legibilidade.
- Evento / precondicao: a Gab de vitoria concluiu semanticamente; nunca antes do texto de resultado.
- Canal / asset: ME `Victory1.ogg`.
- Start / stop / fade: tocar uma vez; permitir interrupcao/resume nativo da BGM sem salto audivel. Se a ME competir com a crianca ou cleanup, omitir a ME e seguir para celebracao.
- Prioridade / concorrencia: P1 abaixo de fala P0; People1 fica contida enquanto a ME ocupa foco.
- Repeticao / interrupcao / persistencia: exatamente uma vez por estabelecimento de vitoria; nao em recovery/reentry.
- Cleanup: nenhuma cauda atravessa reconhecimento dos guardas.
- Fallback: texto de Rheed, criancas e composicao coletiva confirmam resultado.
- Risco / criterio humano: verificar se nao soa como batalha vencida, loot ou conclusao da quest; a cena ainda precisa continuar para festa e interrupcao.

### CUE-SEM-CELEBRATION-001 — Pertencimento coletivo

- Funcao / custo de perda: tornar a festa um patamar coletivo e sustentar o contraste com a hostilidade esportiva antes da perda de reciprocidade; copy/staging preservam pertencimento, classe e presente.
- Beat e joins: 8-A/8-B; `VN-SEM-CELEBRATION-TEAM-011`, `VN-SEM-CELEBRATION-RIVAL-CLASS-011`, `VN-SEM-CELEBRATION-RIVAL-SPONSOR-011`, `VN-SEM-CELEBRATION-THORIN-011`, `VN-SEM-CELEBRATION-FILENA-011`, `VN-SEM-CELEBRATION-DRAGOBUR-011`, `VN-SEM-CELEBRATION-GIFT-011` e `VN-SEM-CELEBRATION-THORIN-GIFT-011`.
- Evento / precondicao: pos-jogo estabelecido, grupo posicionado em Map062 e sessao `SEMIFINAL_CELEBRATION` valida.
- Canal / asset: BGS `People1.ogg` em relacao mais presente que no bed de dialogo; BGM `Town1.ogg` continua.
- Start / stop / fade: crescer por transicao suave depois da vitoria, nunca por salto de loudness. Ceder ao presente; manter patamar ate a presenca dos guardas ser visualmente reconhecida.
- Prioridade / concorrencia: P3/P1 contextual; todas as falas vencem. Rivais nao recebem assinatura de vilao, timbre de classe ou aumento de volume; a alternancia entre Martelos e Machados e protegida por espaco, nao por caricatura. Sem novo item SE, pois a propriedade muda sem quantidade.
- Repeticao / interrupcao / persistencia: uma fase de cena; sem loop adicional de coro, crowd ou aplauso.
- Cleanup: rarefazer por `CUE-SEM-GUARD-RECOGNITION-001`; nao reaparecer depois da ordem.
- Fallback: time agrupado, bustos/nomes, copy rival, respostas, coro e fala do presente comunicam vitoria, conflito, classe e pertencimento.
- Risco / criterio humano: festa precisa existir antes da hostilidade e sobreviver a ela sem virar pico continuo; Martelos e Machados devem permanecer distinguiveis sem que o mix masque Thorin, Filena, Dragobur ou transforme patrocinio/classe em semantica puramente sonora.

### CUE-SEM-GUARD-RECOGNITION-001 — Rarefacao da autoridade

- Funcao / custo de perda: marcar a perda de reciprocidade ja visivel e abrir espaco para Filena/Killin; nunca anunciar os guardas antes do grupo.
- Beat e joins: 8-C–8-E; reconhecimento em EX seguido por `VN-SEM-GUARD-DRAGOBUR-011`, `VN-SEM-GUARD-KILLIN-ORDER-011`, `VN-SEM-GUARD-THORIN-011`, `VN-SEM-GUARD-MHORDRED-011` e `VN-SEM-GUARD-FILENA-MOTIVE-011`.
- Evento / precondicao: os guardas podem estar na periferia, mas o cue so inicia no reconhecimento coletivo observavel.
- Canal / asset: rarefacao/fade de `People1.ogg`; nenhum march, alert ou stinger. `Town1.ogg` cede as Gabs.
- Start / stop / fade: reduzir reciprocidade sonora gradualmente; estabilizar espaco antes de Filena e da ordem. Nao usar mute abrupto salvo se o staging autorizar uma quebra intencional e legivel.
- Prioridade / concorrencia: P1 pela mudanca semantica; texto P0. Aumentar volume dos guardas e proibido como solucao primaria.
- Repeticao / interrupcao / persistencia: uma virada; nao oscilar com cada facing ou linha.
- Cleanup: People1 permanece ausente/baixa durante a VN, choice, Gentle, Resist, batalha, convergencia e transferencia; nao retorna apos a ordem.
- Fallback: cessacao/reorientacao do grupo, beat de Filena e falas identificam rank, ordem e destino.
- Risco / criterio humano: validar que a festa e perdida depois de existir, Killin le como autoridade sem glorificacao e Filena tem espaco sem cue exclusivo.

### CUE-SEM-CHOICE-CONFIRM-001 — Escolha aceita

- Funcao / custo de perda: confirmar uma unica selecao de interface; nao diferencia moralmente Gentle/Resist.
- Beat e joins: 8-E; `VN-SEM-CHOICE-GENTLE-011` ou `VN-SEM-CHOICE-RESIST-011`, seguida de `VN-SEM-CHOICE-RESIST-FILENA-011` somente em Resist.
- Evento / precondicao: uma opcao valida foi aceita pelo Visual Choices; nunca no hover e nunca duas vezes por confirmacao rapida.
- Canal / asset: SE `Decision2.ogg`.
- Start / stop / fade: one-shot na aceitacao; liberar espaco imediato para a fala do branch.
- Prioridade / concorrencia: P2; igual nos dois branches. Falas/reacoes P0 vencem.
- Repeticao / interrupcao / persistencia: uma vez; sem persistencia de branch nem assinatura moral exclusiva. A batalha posterior torna Resist fisicamente distinto sem alterar este cue de interface.
- Cleanup: nenhum residuo antes da convergencia.
- Fallback: estado visual da opcao e fala distinta de Thorin/reacao confirmam a escolha.
- Risco / criterio humano: confirmar que o som nao sugere branch correto/incorreto e nao mascara a primeira silaba da fala; em Resist, ele nao pode se confundir com o inicio de batalha.

### CUE-SEM-RESIST-BATTLE-ENTRY-011 — Entrada real em combate

- Funcao / custo de perda: separar a confirmacao de Resist da entrada efetiva em Battle Scene; se inaudivel, a mudanca de UI, party e cena continua suficiente.
- Beat e joins: depois de `VN-SEM-CHOICE-RESIST-011` e `VN-SEM-CHOICE-RESIST-FILENA-011`, no beat EX `BT-SEM-011-RESIST`; Gentle nunca consome este cue.
- Evento / precondicao: a VN terminou e limpou choice/bustos/background, o EX foi restaurado, Filena entrou temporariamente na party e Battle Processing contra Mhordred sozinho foi autorizado.
- Canal / asset: fade/stop do contexto de mapa conforme transicao nativa + BGM de batalha `Battle1.ogg` definida em `System.json`; nenhum stinger, marcha ou alerta adicional.
- Start / stop / fade: `People1` permanece ausente/baixa; nao carregar cauda de `Decision2` para o primeiro beat de combate. A BGM inicia pela transicao real de Battle Scene, nunca durante a VN ou no hover da escolha.
- Prioridade / concorrencia: P1 para legibilidade da mudanca de modo; UI e estado de party permanecem redundancia visual. Nao elevar loudness para representar Mhordred.
- Repeticao / interrupcao / persistencia: uma entrada por branch Resist; reload/recovery anterior a V120 reconstroi a sequencia sem empilhar BGM. Nao persiste depois do resultado.
- Cleanup: nenhum bed de estadio toca simultaneamente na Battle Scene; nenhum cue de entrada volta ao EX.
- Fallback: formacao Thorin+Filena, battler unico de Mhordred, UI de batalha e copy imediatamente anterior comunicam resistencia; se `Battle1` falhar, a batalha prossegue sem substituicao por nome parecido.
- Risco / criterio humano: confirmar transicao sem clique, dupla BGM ou falsa leitura de boss final/rota vencivel; Thorin e Filena devem receber cerca de 2–3 oportunidades sem que o audio prometa resultado alternativo.

### CUE-SEM-RESIST-BATTLE-RUN-011 — Participacao sob desvantagem

- Funcao / custo de perda: sustentar combate real e legibilidade de acoes sem transformar derrota forcada em cutscene passiva; nenhum fato narrativo depende do mix de batalha.
- Beat e joins: batalha Resist inteira, Thorin+Filena contra Mhordred, escape indisponivel e derrota permitida.
- Evento / precondicao: Battle Processing ativo com Troop 19 aprovado e apenas Mhordred como oponente.
- Canal / asset: BGM `Battle1.ogg`, SE/animacoes nativos das skills e feedback de UI existente; nenhuma camada bespoke ou cue exclusivo de romance, classe ou autoridade.
- Prioridade / concorrencia: feedback de acao e estado critico vence BGM; eventos frequentes obedecem concorrencia nativa e nao recebem duplicatas. Fala/texto eventual P0 vence tudo.
- Repeticao / interrupcao / persistencia: ataques repetidos preservam identidade sem nova randomizacao autoral. Menu, estado, KO e resultado seguem comportamento de batalha; nao criar loop externo.
- Cleanup: ao encerrar por loss ou win excepcional, parar `Battle1` pela saida nativa antes de restaurar EX. Nenhum SE/animacao ou cauda longa atravessa a primeira Gab de captura.
- Fallback: HP, estados, poses, animacoes, log/UI e resultado mecanico comunicam desvantagem; audio mutado nao altera `canLose`, convergencia ou party cleanup.
- Risco / criterio humano: testar volume baixo/mono, fadiga, mascaramento de UI e se o combate parece participacao real durante 2–3 acoes por ator sem soar como uma vitoria normal prometida.

### CUE-SEM-RESIST-BATTLE-RESULT-011 — Resultado e reconvergencia

- Funcao / custo de perda: reconhecer o resultado mecanico dentro da Battle Scene e devolver foco a captura comum; som nunca decide win/loss nem sugere recompensa.
- Beat e joins: loss normal ou win excepcional antes de `GAB-SEM-ESCORT-011`.
- Evento / precondicao: Battle Processing encerrou por um dos dois handlers aprovados. Ambos executam a mesma recuperacao de HP, removem Filena da party temporaria e seguem para a captura.
- Canal / asset: comportamento nativo de resultado do sistema (`Defeat1.ogg` no loss; `Victory1.ogg` no win excepcional), sem ME adicional, loot cue, fanfarra de quest ou musica de branch.
- Start / stop / fade: o resultado pode concluir dentro da Battle Scene, mas deve cessar antes da Gab de convergencia. `Victory1` excepcional nao reabre a celebracao nem substitui a captura; `Defeat1` nao conduz a Game Over.
- Prioridade / concorrencia: feedback mecanico P1; retorno EX, copy de Killin/Filena e controle seguro P0. Se a ME competir com a saida ou primeira Gab, interromper/omitir sua cauda.
- Repeticao / interrupcao / persistencia: exatamente um feedback de resultado por batalha; win e loss nao produzem segundo cue ao chamar a convergencia comum.
- Cleanup: `Battle1`, ME e SE de combate ausentes no EX; `People1` continua rarefeito; o estado sonoro converge antes de `CUE-SEM-ESCORT-TRANSFER-001`.
- Fallback: tela de resultado, HP/party cleanup, formacao EX e Gabs deixam claro que a resistencia terminou e Thorin sera levado. Em mute, win excepcional e loss normal continuam distinguiveis mecanicamente e convergem narrativamente.
- Risco / criterio humano: validar que derrota nao parece Game Over, win excepcional recebe feedback honesto sem prometer fuga/recompensa e nenhum resultado mascara ou atrasa a captura comum.

### CUE-SEM-ESCORT-TRANSFER-001 — Compromisso e transferencia

- Funcao / custo de perda: fechar a mudanca espacial depois que destino e autoridade ja estao claros; nao comunica voluntariedade.
- Beat e joins: 8-G, 9-A/9-B; `GAB-SEM-ESCORT-011`, incluindo a copy de convergencia de Killin e a despedida de Filena.
- Evento / precondicao: Gentle concluiu custodia ou Resist concluiu `CUE-SEM-RESIST-BATTLE-RESULT-011`; destino Casa Forja-Prata foi dito, Gabs/cleanup necessarios concluiram e transferencia unica foi autorizada.
- Canal / asset: SE `Move1.ogg`; beds do estadio em fade de saida.
- Start / stop / fade: completar fade de People1; tocar Move1 uma vez junto da transferencia, sem marcha ou crescendo heroico.
- Prioridade / concorrencia: P2; nunca antecede a fala de destino nem esconde despedida.
- Repeticao / interrupcao / persistencia: exactly-once no handoff; recovery/reavaliacao nao toca novamente.
- Cleanup: BGS do estadio deve estar ausente em Map044; nenhum ME/SE truncado ou loop carregado.
- Fallback: formacao, fala de Killin, despedida e transferencia visual estabelecem escolta forcada.
- Risco / criterio humano: transicao precisa soar funcional, nao fast travel voluntario, missao aceita ou marcha triunfal.

### CUE-SEM-HOME-ARRIVAL-001 — Exterior e devolucao de controle

- Funcao / custo de perda: restabelecer exterior conhecido e contraste apos a festa; nenhum fato da quest depende do bed.
- Beat e joins: 9-C/9-D; `DL-SEM-HOME-THORIN-001`.
- Evento / precondicao: chegada observavel em Map044 e cleanup do estadio concluido.
- Canal / asset: BGM `Town1.ogg` + BGS `City.ogg`.
- Start / stop / fade: retomar BGM sem salto; City entra suavemente depois que a chegada e a fala de Thorin permanecem legiveis. Nao cobrir o inicio do proximo conflito.
- Prioridade / concorrencia: P3; Gab e retorno de controle P0.
- Repeticao / interrupcao / persistencia: inicia uma vez no handoff; reavaliacao terminal nao reinicia.
- Cleanup: pertence ao exterior/proxima quest, nao reabre cues da semifinal.
- Fallback: mapa exterior, fala, journal e controle devolvido comprovam chegada.
- Risco / criterio humano: verificar ausencia de residuo de crowd/ME, transicao sem clique e se o contraste nao transforma chegada forcada em alivio indevido.

## Reconciliacao com IDs de dialogo e branches

| Bloco narrativo | IDs de dialogo/branch | Cues permitidos |
| --- | --- | --- |
| Urgencia | `DL-SEM-URGENT-THORIN-001` | `CUE-SEM-BED-CITY-001`, `CUE-SEM-URGENT-BLOCK-001` |
| VN de chegada | `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-011`, `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-011`, `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-HELMET-011`, `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-HELMET-011`, `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-ORDER-011` | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` |
| Requisito e continuidade EX | `GAB-SEM-DRAGOBUR-SEARCH-011`, `GAB-SEM-DRAGOBUR-EQUIP-011`, `GAB-SEM-CONTINUE-HELMET-011` | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` |
| Vestiario e gag | `DL-SEM-LOCKER-THORIN-001`, `DL-SEM-GAG-LOCKER-001`, `DL-SEM-GAG-LOCKER-REPEAT-001` | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-GAG-IMPACT-001` |
| Estatua e elmo | `DL-SEM-STATUE-THORIN-001`, `DL-SEM-STATUE-THORIN-TAKE-001`, `DL-SEM-HELMET-THORIN-FIT-001` | `CUE-SEM-HELMET-TAKE-001`, `CUE-SEM-HELMET-EQUIP-001` |
| VN de autorizacao | `VN-SEM-DRAGOBUR-AUTH-ANGER-011`, `VN-SEM-DRAGOBUR-AUTH-THORIN-011`, `VN-SEM-DRAGOBUR-AUTH-THORIN-INNOCENT-011`, `VN-SEM-DRAGOBUR-AUTH-YIELD-011` | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` |
| Retomada para o campo | `GAB-SEM-CONTINUE-FIELD-011` | `CUE-SEM-STADIUM-BED-001`, `CUE-SEM-DRAGOBUR-SPACE-001` |
| Elipse | `DL-SEM-MATCH-RHEED-LOSING-001`, `DL-SEM-MATCH-CHILDREN-001`, `DL-SEM-MATCH-RHEED-ENTRY-001`, `DL-SEM-MATCH-RHEED-GOAL-001`, `DL-SEM-MATCH-RHEED-VICTORY-001`, `DL-SEM-MATCH-CHILDREN-002` | `CUE-SEM-MATCH-FRAME-001`, `CUE-SEM-MATCH-ARC-001`, `CUE-SEM-VICTORY-001` |
| Festa, rivais e presente | `VN-SEM-CELEBRATION-TEAM-011`, `VN-SEM-CELEBRATION-RIVAL-CLASS-011`, `VN-SEM-CELEBRATION-RIVAL-SPONSOR-011`, `VN-SEM-CELEBRATION-THORIN-011`, `VN-SEM-CELEBRATION-FILENA-011`, `VN-SEM-CELEBRATION-DRAGOBUR-011`, `VN-SEM-CELEBRATION-GIFT-011`, `VN-SEM-CELEBRATION-THORIN-GIFT-011` | `CUE-SEM-CELEBRATION-001` |
| Guardas e ordem | `VN-SEM-GUARD-DRAGOBUR-011`, `VN-SEM-GUARD-KILLIN-ORDER-011`, `VN-SEM-GUARD-THORIN-011`, `VN-SEM-GUARD-MHORDRED-011`, `VN-SEM-GUARD-FILENA-MOTIVE-011` | `CUE-SEM-GUARD-RECOGNITION-001` |
| Escolha Gentle | `VN-SEM-CHOICE-GENTLE-011` | `CUE-SEM-CHOICE-CONFIRM-001` |
| Escolha Resist | `VN-SEM-CHOICE-RESIST-011`, `VN-SEM-CHOICE-RESIST-FILENA-011` | `CUE-SEM-CHOICE-CONFIRM-001`, `CUE-SEM-RESIST-BATTLE-ENTRY-011` somente depois do retorno EX |
| Batalha Resist | Thorin+Filena contra Mhordred; loss normal ou win excepcional | `CUE-SEM-RESIST-BATTLE-ENTRY-011`, `CUE-SEM-RESIST-BATTLE-RUN-011`, `CUE-SEM-RESIST-BATTLE-RESULT-011` |
| Convergencia e despedida | `GAB-SEM-ESCORT-011` | `CUE-SEM-ESCORT-TRANSFER-001` |
| Chegada | `DL-SEM-HOME-THORIN-001` | `CUE-SEM-HOME-ARRIVAL-001` |

Os IDs 010 `DL-SEM-ARRIVAL-*`, `DL-SEM-HELMET-DRAGOBUR-*`, `DL-SEM-AUTHORIZE-DRAGOBUR-001`, `DL-SEM-CELEBRATION-TEAM-001`, `DL-SEM-GIFT-*`, `DL-SEM-GUARD-*`, `DL-SEM-ORDER-*`, `BR-SEM-*` e `DL-SEM-*-REACTION-001` sao rastreabilidade historica e nao sao joins atuais. `DL-SEM-STATUE-*`, `DL-SEM-HELMET-THORIN-FIT-001`, o gag, a elipse e a chegada permanecem interfaces atuais porque nao foram superseded pela secao corretiva.

Scene Presentation pode omitir um cue nao essencial por clareza, mas nao pode mover um cue para antes do fato/beat que o autoriza. Gameplay Engineering deve consumir cada ID 011 implementado uma vez ou registrar explicitamente que ele e omitido pelo fallback aprovado; `human-only` nao pode esconder ausencia de contrato runtime.

## Cleanup por fronteira

| Fronteira | Estado sonoro exigido |
| --- | --- |
| Map061 → Map062 | `City` sai; `People1` entra sem duplicar/restartar `Town1`. |
| EX → VN Dragobur | fechar Gab/lock; preservar uma unica instancia do bed; rarefazer para fala; retorno sem restart e com continuity Gab legivel. |
| Map062 → Map063 → Map062 | Bed do estadio preserva continuidade; gag/helmet SE nao persistem nem repetem em reentrada. |
| Map062 → Map064 | Bed contido; Animation 35 toca uma vez; nenhum cue simula gameplay. |
| Map064 → Map062 pos-jogo | Moldura limpa; vitoria concluida; celebracao assume People1 sem segunda instancia. |
| EX → VN celebracao → EX | festa/rivais/presente compartilham um bed contido; VN limpa sem antecipar guardas; retorno preserva a fase ate a saida dos Martelos. |
| Festa → reconhecimento → VN guardas | People1 rarefaz somente depois do reconhecimento visual; nao volta durante a ordem, choice ou branches. |
| VN guardas → Gentle | `Decision2` termina antes da custodia; nenhum audio de Battle Scene inicia. |
| VN guardas → Resist → Battle | `Decision2` termina; EX prepara party; bed do estadio nao sobrepoe `Battle1`; resultado nativo cessa antes da convergencia. |
| Battle → EX | `Battle1`, ME e SE de combate ausentes; People1 permanece rarefeito; loss/win compartilham o mesmo estado sonoro de captura. |
| Map062 → Map044 | People1 e ME ausentes; Move1 toca uma vez; City/Town1 retomam sem residuo. |
| Recovery/reentry | Nenhum ME, impacto, materializacao, confirmacao de escolha, entrada de batalha, resultado ou transferencia repete por reavaliacao de pagina. VN interrompida nao toca conclusao. |

## Riscos de overlap e repeticao

- Gabs longas podem ultrapassar movimento, automacao de bed ou cleanup. Audio nao autoriza esconder/mover speaker nem transferir antes do barrier de Scene Presentation.
- Animation 39 ja soma tres SE embutidos a Damage3; qualquer quinto acento e bloqueante.
- Animation 35 possui dois SE no mesmo frame; duplicar por personagem ou no cleanup causa pico e descaracteriza a moldura.
- `People1` atravessa varias superficies e fases. Restart em cada mapa, crossfade prolongado ou duas instancias criam salto, flanging ou fadiga.
- Victory1 pode disputar com a crianca, a limpeza de Rheed ou o inicio da festa. Se a hierarquia nao for resolvida por timing/ducking, omitir ME e preferivel a mascarar copy.
- Movimento de grupo, camera e zoom nao recebem acento automatico. Acentuar cada facing, passo ou reenquadramento cria ruido e antecipa foco.
- Interacoes repetidas, confirmacao rapida de choice, recovery pages e transferencias reavaliadas nao podem empilhar SE.
- A troca EX/VN pode duplicar ou reiniciar `Town1`/`People1` se o audio policy restaurar o mapa sem considerar a instancia preservada; qualquer salto, flanging ou dupla camada e falha.
- `Decision2`, transicao de Battle Scene e primeiro feedback de acao sao tres eventos distintos. Sobreposicao que pareca clique duplo ou input duplicado e falha.
- O resultado nativo da batalha pode sugerir Game Over no loss ou rota alternativa no win excepcional. UI, timing, interrupcao de ME e Gab de captura precisam desambiguar sem apagar feedback mecanico honesto.
- Nenhuma cauda de `Battle1`, `Defeat1`, `Victory1` ou SE de skill pode atravessar a primeira Gab de convergencia ou reativar People1.
- O retorno a Map044 precisa provar ausencia de crowd, ME e silencio quebrado; residuo de estadio e falha de cleanup.

## Oportunidades pos-MVP nao bloqueantes

- Crowd esportiva em camadas com variacoes de reacao e loop dedicado.
- Apito final diegetico separado da ME, somente depois de confirmar que nao compete com a frase de Rheed.
- Ambiencia propria de estadio/vestiario e materialidade especifica da estatua/elmo.
- Assinatura de passos/formacao da Guarda de Ferro sem marcha glorificadora.
- Variacoes de interacao recorrente com cooldown e diagnostico reproduzivel.

Nenhuma dessas oportunidades autoriza criar asset, bloquear o MVP ou introduzir dependencia de plugin.

## Criterios humanos de escuta — pendentes

Executar em build identificada e registrar observacao, nao aprovacao presumida:

1. Percorrer da corrida a chegada exterior com audio normal; registrar hierarquia de Gab, beds, SE, ME, transicoes e qualquer pico/fadiga.
2. Repetir interacoes: tres portas, Dragobur requirement, gag repeat, estatua/reentry, choice rapido e recovery. Confirmar ausencia de stacking, recompensa duplicada e residuos.
3. Ouvir loops e transicoes por varias repeticoes: Town1, City e People1; verificar clique, salto, drift, cancelamento, conflito harmonico e cauda truncada.
4. Avaliar o gag isoladamente: fala exata continua legivel; impacto preserva assinatura sem desconforto indevido; repetir nao repete pancada.
5. Pedir relato livre da elipse antes de sondas. O jogador deve recuperar os quatro fatos por texto/staging, sem interpretar os cues como partida jogavel, batalha, loading ou VN.
6. Percorrer as quatro VNs e cada retorno EX. Confirmar uma unica instancia de bed, nenhum restart/salto/flanging, fala sempre inteligivel, cleanup total, continuity Gabs legiveis e nenhuma conclusao sonora depois de interrupcao.
7. Confirmar que festa atinge patamar legivel; Martelos e Machados alternam sem caricatura sonora nem masking; presente nao soa como novo grant; guardas nao sao anunciados cedo; Filena e a ordem recebem espaco; autoridade nao depende de volume.
8. Comparar Gentle e Resist: `Decision2` e neutro e igual, mas a consequencia fisica difere. Gentle nunca aciona audio de batalha. Resist faz a sequencia choice → retorno EX → `Battle1` sem dupla confirmacao.
9. Jogar Resist ate a derrota normal e, em fixture/editor seguro, exercitar win excepcional. Confirmar 2–3 oportunidades significativas por ator, feedback mecanico legivel, loss sem leitura de Game Over, win sem promessa de fuga/recompensa e o mesmo estado sonoro de captura depois de ambos.
10. Repetir battle entry/result/recovery e verificar ausencia de `Battle1`, `Defeat1`, `Victory1`, SE de skills, People1 reativado ou segundo `Decision2` sobre a primeira Gab de convergencia.
11. Repetir em volume baixo e mono; checar masking, perda de impacto, sumico de beds, legibilidade da Battle Scene e preservacao de fatos por canais nao sonoros.
12. Repetir mutado. Urgencia, derrota esportiva, capacete, gag, retirada/equipamento, quatro fatos da partida, vitoria, hostilidade/classe, presente, guardas, rank, escolha, entrada/resultado de batalha, destino, transferencia e chegada devem continuar compreensiveis.
13. Distinguir silencio intencional no reconhecimento de silencio por mute, asset ausente, trigger quebrado, streaming, VN interrompida ou cleanup de Battle Scene.

Nenhuma escuta ou Playtest foi executado nesta tarefa. `status: approved` aprova o contrato autoral; `human_listening_validation: pending` preserva honestidade sobre mix, conforto, clareza, ritmo e impacto.
