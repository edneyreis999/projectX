# Relatório de pontos de melhoria Técnico-Narrativo – Map013 (RPG Maker MZ)

Este documento analisa o mapa `Map013.json` (a loja de armaduras em que termina a quest *Hora de Crescer*) com base nos eventos do arquivo, na cena 5 do NSD `docs/Quests/4-e-hora-de-crescer/hora-de-crescer.NSD.fluxo-cenas.md` e nos perfis de Kilin/Mhordred (`docs/GDD/4-personagens-inimigos-criaturas/Kilin v3.md`, `docs/GDD/4-personagens-inimigos-criaturas/Mhordred v3.md`).

## Metadados Técnicos do Mapa
- **ID:** Map013 (13)
- **Nome do arquivo:** `frontend/data/Map013.json`
- **Display name:** não informado
- **Dimensões:** 20 × 16 tiles
- **Tileset:** ID 8 (nome não informado nos metadados)
- **Parallax:** `!LojaDeRoupas` (loop X habilitado, loop Y desativado)
- **Scroll type:** 0
- **Autoplay BGM/BGS:** falso; BGM e BGS não atribuídos
- **Battleback:** não especificado
- **EncounterStep:** 30
- **Notas:** espaço interior com balcão e saída para o Distrito Comercial, usado para o tutorial de compra/equipamento da quest *Hora de Crescer*.

## Inventário de Eventos
1. **Evento 1 – Cornelius** (x:15, y:10, 3 páginas) – NPC no balcão com páginas de propaganda e protagonista da cutscene de entrega de armadura, incluindo atualização de quest, plugin de bustos e escolha visual de equipar.
2. **Evento 2 – Tharok** (x:11, y:11, 4 páginas) – NPC de fundo que conta piadas de inverno e reforça clima urbano enquanto os guardas esperam.
3. **Evento 3 – Barreira Balcão** (x:17, y:10, 1 página) – tile invisível (prioridade baixa) bloqueando a área atrás do balcão.
4. **Evento 4 – Kilin** (x:8, y:13, 4 páginas) – guarda que insiste que Thorin vá imediatamente; repete o mesmo aviso até o jogador avançar o estado (variável 32).
5. **Evento 5 – Mhordred** (x:10, y:13, 4 páginas) – guarda impaciente que provoca Thorin e, durante a escaramuça, manda o jogador acelerar a compra.
6. **Evento 6 – Saída (Distrito Comercial)** (x:9, y:14, 4 páginas) – porta/transfer com som de porta, barra saída até o jogador equipar e altera self-switch A para liberar o acesso.
7. **Evento 7 – (unused)** (x:0, y:0, 3 páginas) – placeholder sem conteúdo relevante.

## 1. Visão Geral do Mapa
Map013 é a sala de vendas que conclui a caminhada forçada de Thorin pelo Distrito Comercial (Cena 5 do NSD), onde Kilin, Mhordred e Cornelius obrigam o adolescente a equipar a armadura que vai permitir o encontro com Balastrus. O objetivo do jogador é experimentar a mecânica de compra/equip do inventário e garantir que Thorin esteja pronto para seguir até a taverna. O nível é pouco interativo fora da cutscene principal, mas sustenta o ritmo da quest ao combinar diálogo, plugins visuais e obrigatoriedade de equipamento.

## 2. Storytelling Ambiental (Environmental / Spatial Storytelling)
A parallax `!LojaDeRoupas` cobre o mapa inteiro, colocando o jogador em um interior opulento; o balcão é reforçado pelo evento 3 e pela posição de Cornelius, enquanto os guardas se posicionam próximos à porta para sinalizar vigilância. O corredor estreito para a saída (evento 6) concentra toda atenção na transição seguinte, enquanto o piso é dominado por tiles de chão/mac of, criando uma boa distinção entre a “área pública” e o balcão (o layout do JSON mostra campos com o tile 265/266 e blocos vazios atrás do balcão). O mapa usa obstáculos simples para guiar o accesso ao balcão e, ao mesmo tempo, dá espaço para as animações de bustos sem bloquear a câmera.

## 3. Personagens Identificados
- **Cornelius (evento 1):** dono da loja, orgulhoso do estoque — medidor de prestígio que reforça a natureza mercantil do conflito (páginas 1/3 o mostram vendendo, página 2 encarna a negociação).
- **Tharok (evento 2):** alívio cômico que sustenta o clima urbano enquanto os guardas aguardam.
- **Kilin (evento 4):** mentor com foco no dever; de acordo com o GDD, ele age com calma, mas aqui repete o mesmo incentivo para refletir exaustão.
- **Mhordred (evento 5):** berserker leal que pressiona Thorin, grita para acelerar o processo e reforça o sentimento de urgência militar.
- **Balastrus (indicado por bust de evento 1 página 2):** não aparece fisicamente, mas seus retratos e a fala de Kilin/Mhordred o posicionam como chefão aguardando a chegada.
- **Thorin:** protagonista silenciado que não fala na cutscene, mas recebe atenção de Kilin/Mhordred e o jogador sente sua ansiedade através de reações dos guardas (documento NSD confirma que ele deveria ser “treinado” nesta cena).

## 4. Diálogos e Conversas
A cutscene principal (evento 1, página 2) entrega um diálogo em cadeia onde Cornelius insiste pelo pagamento, Thorin elogia a armadura, Kilin exige o uso imediato e Mhordred acusa outros de serem frouxos. O reparo “Primeiro o pagamento!” seguido de “Nós vamos levar…” (“NÃ„S” no arquivo) reforça o estresse do grupo, e o humor vem de Mhordred vociferando que a “Mão do Imperador” não tolerará atrasos. Os guardas se sobrepõem constantemente, indicando falta de sincronia narrativa e potencial deslocamento de foco do jogador. As falas de Kilin/Mhordred (eventos 4 e 5) são repetitivas; bastaria reutilizar trechos-chave ao invés de repetir a mesma frase em quatro páginas.

## 5. Bustos, Retratos e Recursos Visuais
O plugin `VisuMZ_2_VNPictureBusts` entra logo no início do evento 1 página 2 e insere bustos de Thorin, Balastrus, Kilin e Mhordred, tudo antes de a conversa começar, e depois retira somente alguns bustos a cada transição (ex.: plugin `Basic_ExitBust` para Balastrus/Kilin). A sincronização é confiável, mas o excesso de bustos (até quatro simultâneos) consome espaço visual. Uma alternativa seria escalonar a entrada/saída de acordo com o ritmo da fala para reduzir ruído e permitir foco no narrador que está falando.

## 6. Efeitos Especiais e Direção de Cena
Além dos bustos, evento 1 usa `Buzzer1` (code 250) para sinalizar o alerta de “pagamento em atraso” e `VisuMZ_2_VNPictureBusts` (códigos 357) para tocar animações (`Basic_PlayAniBust`). O evento 6 usa `Door1` (code 250) e `Transfer Player` (code 201) para a saída. As transições são simples—não há waits para forçar pausas dramáticas. Inserir waits curtos (com `Wait 20`) após declarações-chave ajudaria o jogador a absorver a conversa antes de abrir o menu de escolha visual.

## 7. Roteiro Implícito e Beats Narrativos
O mapa representa o beat “Compra uma armadura decente” (Cena 5 do NSD). A sequência é: (1) Cornelius mostra a armadura e completa a tarefa da quest (`SQSM.CompleteTaskForQuest`), (2) discussões sobre pagamento instauram tensão (“20000 dracmas”; `Coreto_Quests.addArmor` só é chamado depois do acordo), (3) o jogador recebe escolha visual para equipar (`PKD_VisualChoices_MZ`), (4) o menu redireciona ao inventário (`SceneManager.push(Scene_Equip)`), (5) os bustos saem e o mapa habilita a saída. O ritmo potencialmente trava na etapa em que Kilin/Mhordred repetem a mesma ameaça, mas o escopo geral mostra um setup-payoff claro: a pressão sobre o player culmina no tutorial de equipamento e na libertação do corredor.

## 8. Motivação dos Personagens
- **Cornelius:** valoriza reputação (“A fama da minha loja…”), usa o evento para elevar o status do item — sua motivação é vender antes da missão terminar; sem isso, o jogador perde o botão de progresso.
- **Kilin:** guia paternal que quer cumprir ordens de Tordan (GDD mostra que seu medo é fracassar); aqui ele vira o “cabo de guerra” entre a ordem imperial e o jovem, usando frases como “Não perca tempo Thorin…” para lembrar do dever.
- **Mhordred:** em conflito entre impulsividade e lealdade (como indicado no GDD), sua fala “Nós vamos levar…”, a insistência em pagar agora e o comentário sobre a “Mão do Imperador” reforçam que ele age por responsabilidade, apesar da irritação com a missão.
- **Thorin:** quer treinar; suas poucas falas (“É lindo. Realmente uma peça capaz de impressionar qualquer um.”) enfatizam o desejo de autonomia, mas a narrativa o mantém silencioso para que o jogador se substitua.

## 9. Escolhas do Jogador e Ramificações Narrativas
Evento 1 página 2 abre uma escolha visual com `PKD_VisualChoices_MZ` definindo as opções “equiparArmaduraAgora1” e “equiparArmaduraAgora2”. A opção 1 abre imediatamente o inventário (`SceneManager.push(Scene_Equip)`), enquanto a 2 apenas fecha o menu. Ainda assim, independente da escolha, o script segue para o mesmo fluxo (talvez por isso o diálogo não muda). Para reforçar a agência, seria interessante condicioná-la para que evitar equipar pule a próxima fala de Kilin ou repita a exigência, deixando claro que a escolha tem peso.  
Evento 6 força o jogador a equipar antes de sair: as páginas 2/3/4 usam a variável 32 e a self switch A para barrar a saída até que o estado chegue a 5. Isso garante coerência lúdica e narrativa, mas a ausência de feedback visual (nenhuma animação de porta trancada) deixa o bloqueio meio invisível; vale adicionar um efeito de “porta iluminada” ou um sprite de guarda bloqueando o caminho.

## 10. Ludonarrativa e Integração com Gameplay
O mapa existe para ensinar compra/equipamento. A trava de pagamento reforça o tema “sem armadura, sem Balastrus”, mantendo o jogador dentro do processo ludonarrativo: a discussão gera tensão (ameaça imperial, falta de dracmas) e o menu de escolha é o momento em que o jogador retoma controle. O uso de `SceneManager.push(Scene_Equip)` é a interface prática para o tutorial descrito no NSD (“Jogador equipe Thorin manualmente”). A sugestão é amarrar a conclusão desse loop a um marcador visual (um efeito de brilho no item equipado) para evidenciar que a mecânica foi aprendida.

## 11. Timing, Ritmo e Pacing
Não há waits explícitos além das animações do plugin; o diálogo se encerra rapidamente assim que o menu surge. Isso significa que o jogador pode apertar `Z` e enfrentar o menu antes de entender toda a conversa. Inserções curtas de `Wait (10-15)` após falas críticas (“Primeiro o pagamento!”, “Balastrus não vai esperar”) dariam pequenas respirações e evitariam que o jogador passe direto. Além disso, a repetição das frases de Kilin e Mhordred (eventos 4/5) gera uma sensação de loop; limitar o número de páginas para cada fala evitaria que o ritmo crônicas e parecer redundante.

## 12. Drama e Arco Emocional
O drama do mapa é centrado na urgência (“Balastrus não vai esperar”, “A Mão do Imperador também não”) e na contradição entre o desejo de Thorin de treinar e o fato de ser escoltado. O diálogo com Mhordred (“E acha que vai acontecer o que se a Mão do Imperador souber que você atrasou o herdeiro por birra?”) cria stakes políticos, mas a falta de reações visuais do jogador fragiliza o golpe. Uma pequena animação de Thorin olhando para baixo ou um ícone de suspense poderia aumentar a carga emocional quando a ameaça imperial é mencionada.

## Recomendações Prioritárias (Top 10)
1. **Alta / Médio / Elevado** – *Evento 1 página 2:* alinhar o diálogo com cada fase da cutscene, de forma que a escolha do jogador (equipar agora x depois) mude a fala subsequente (Kilin/Mhordred), disponibilizando branches condicionais (`Switch` ou variável 32) que mostrem as consequências da recusa imediata.  
2. **Alta / Baixo / Elevado** – *Evento 1 página 2:* adicionar waits curtos (~10 frames) após cada fala-chave antes de disparar o menu de escolha visual ou tocar efeitos sonoros (`Buzzer1`) para reforçar o peso das frases e evitar que o jogador pule sem ler.  
3. **Média / Baixo / Médio** – *Evento 6 páginas 2-4:* melhorar o feedback da porta trancada (por exemplo, adicionar animação de sprite de guarda/filtro luminoso e um `Play SE` extra) para explicar por que o jogador não pode sair até a variável 32 alcançar 5.  
4. **Média / Médio / Médio** – *Evento 1 página 2:* ajustar o sequenciamento dos bustos para reduzir sobreposição (entradas e saídas mais espaçadas, usando `StartOffset` com tempos diferentes) para que o jogador foque no locutor.  
5. **Média / Baixo / Médio** – *Evento 1 página 2:* incluir uma frase introdutória ou um balão de pensamento para Thorin quando o preço de 20.000 dracmas é anunciado (“Sem dinheiro” / “O quê?”) para dar voz ao protagonista e acentuar a tensão financeira.  
6. **Baixa / Baixo / Médio** – *Evento 2 página 4/Página 1:* utilizar Tharok como narrador ambiental (por exemplo, um comentário direcionado ao jogador sobre “cuidado com o status do tempo”) para reforçar clima e evitar que fique apenas como NPC repetitivo.  
7. **Média / Médio / Elevado** – *Evento 1 página 2:* usar um `Show Animation` ou `Screen Flash` curto no momento em que Cornelius fala em nome da família real para enfatizar que aquele item atende às expectativas imperiais.  
8. **Média / Médio / Médio** – *Evento 5 páginas 1-4:* reduzir a repetição de frases e combinar as falas mais impactantes (ex.: “Tome uma cerveja…” + “Vai Thorin, mete o pé!”) em uma única página, liberando espaço para outras reações.  
9. **Baixa / Baixo / Baixo** – *Evento 6 página 1:* adicionar um texto (Show Text) indicando “Sem armadura, sem saída” antes de o jogador receber a fala de Kilin, reforçando o bloqueio lúdico.  
10. **Baixa / Baixo / Médio** – *Evento 1 página 2:* incluir um `Change BGM` breve (ex.: `BGM: battle? suspense` que ainda esteja disponível no projeto) durante a tensão de pagamento para dar contraste em relação ao silêncio atual e melhorar o impacto emocional.

## Apêndice A – Transcrição dos Diálogos (por evento)
**Evento 1 – Cornelius**
- Página 1 (promoção): Cornelius: “A fama da minha loja nunca foi por acaso!” / “Os melhores itens e os melhores preços.” / “A família real só compra de mim!”
- Página 2 (negociação):  
  Cornelius: “Por favor, mostre a eles a cota de malha feita com prata das montanhas e ombreiras de couro vermelho que me mostrou ontem.”  
  Thorin: “É lindo. Realmente uma peça capaz de impressionar qualquer um.”  
  Kilin: “Nós vamos levar. Vista o garoto, por favor.”  
  Cornelius: “Primeiro o pagamento!”  
  Kilin: “Não tem jeito. Um de nós dois paga agora e depois acerta os valores com Tordan.”  
  Mhordred: “E quanto custa?”  
  Kilin: “20.000 dracmas.”  
  Mhordred: “Santa criação… 20.000?! Eu não vou pagar!”  
  Thorin: “Perfeito. Então me deixem ir treinar.”  
  Kilin: “Balastrus não vai esperar. E a Mão do Imperador também não. E acha que vai acontecer o que se a Mão do Imperador souber que você atrasou o herdeiro dele por birra?”  
  Mhordred: “…Tá bom. Vamos logo.”  
  (Plugins e comandos: `VisuMZ_2_VNPictureBusts` para entradas/saídas, `SQSM.CompleteTaskForQuest`, `Coreto_Quests.addArmor`, `PKD_VisualChoices_MZ`, `SceneManager.push(Scene_Equip)`.)
- Página 3 (fallback): Cornelius: “Os melhores itens e os melhores preços.”

**Evento 2 – Tharok**
- Página 1: “Gildrat está mesmo linda nessa época do ano, não?!”  
- Página 2: “Eu adoro o inverno!”  
- Página 3: “Eu adoro o inverno!”  
- Página 4: “Tome uma cerveja por mim enquanto estiver na taverna!”

**Evento 4 – Kilin**
- Páginas 1 a 3: “Não perca tempo Thorin, o futuro o aguarda!” (repete a frase até a variável 32 mudar)  
- Página 4: “Você já deveria estar na taverna.”

**Evento 5 – Mhordred**
- Página 1: “Tome uma cerveja por mim enquanto estiver na taverna!”  
- Página 2: “Como teria sido minha vida se eu tivesse nascido um filhinho de papai como você?!”  
- Página 3: “Guardas imperiais apenas lutam e protegem… pode parecer um pouco chato às vezes.”  
- Página 4: “Vai Thorin, mete o pé!”

**Evento 6 – Saída (Distrito Comercial)**
- Página 1: Kilin: “Vamos resolver isso com Cornelius primeiro.” / Mhordred: “É rápido. Balastrus não vai esperar.”  
- Página 2: Kilin: “Sem armadura, sem saída.” / Mhordred: “Vai logo. Não tenho o dia todo.”  
- Página 3: Mhordred: “Vai logo. Não tenho o dia todo.”  

## Apêndice B – Lista de Comandos (Eventos-chave)
- **Evento 1 (Cornelius, página 2):** `VisuMZ_2_VNPictureBusts` (Basic_EnterBust/ExitBust/PlayAniBust), `SQSM.CompleteTaskForQuest`, `Coreto_Quests.addArmor`, `PKD_VisualChoices_MZ` + `Conditional Branch` para as escolhas “equiparArmaduraAgora1/2”, `SceneManager.push(Scene_Equip)`, `Show Text` reforçando o tutorial; `Common Event` (visualmente referente a “equiparArmaduraAgora”) e `Buzzer1` (code 250) para o alerta.
- **Evento 6 (Saída, páginas 2–4):** `Play SE (Door1)`, `Transfer Player` com destino (8,26,33...), manipulação de self-switch A para travar e liberar a saída, além de `Set Movement Route` para o personagem se mover quando o portal abre.
- **Eventos 4/5 (Kilin/Mhordred):** repetem `Show Text` com `Portraits menores/Principal1`, sem comandos adicionais, apenas reforçando o clima.

## Apêndice C – Inventário de Batalhas (Troops)
Nenhuma batalha é definida neste mapa; o foco é 100% narrativo.

## Apêndice D – Configurações de Página (Resumo por Evento)
- **Evento 1**
  - Página 2: condição `variable 32 == 3`, prioridade “Above characters”, trigger “Autorun” (0), plugin + escolha visual; termina ajustando `Switch 32` e self switches para avançar a cutscene.
  - Página 3: usa `self switch A` (ativado na página 2) para retrabalho de fala e mantém Cornelius exibindo “Os melhores itens…”.
- **Evento 6**
  - Página 1: ativa por padrão (`variable32Valid=false`).
  - Página 2: variável 32 == 4 (porta bloqueia), dá mensagens de Kilin/Mhordred.
  - Página 3: mesma variável + `selfSwitchA=true` para impedir acesso até o jogador equipar.
  - Página 4: variável 32 == 5 (armadura equipada) libera o caminho via `Transfer Player`.

## Apêndice E – Variáveis, Switches e Eventos Comuns Referenciados
- `Variable 32`: estágio da quest *Hora de Crescer* usado para controlar a entrada e saída da loja. Valores 3, 4 e 5 segmentam os cortes da cutscene, e o evento 1 atualiza o valor para 4/5 enquanto o evento 6 responde a essas mudanças.  
- `Self Switch A` do evento 6 garante que, após a primeira tentativa de sair (página 3), a porta permaneça bloqueada até o menu de equipamento ser concluído.  
- `Common Event` `Coreto_Quests.addArmor` e `SQSM.ShowTaskForQuest` são invocados para avançar a quest; o `PKD_VisualChoices` usa seu próprio `Switch` de menu (`equiparArmaduraAgora1/2`) para registrar escolha.  
- `Switch 1` aparece em condições padrão, mas não é manipulado aqui.

## Apêndice F – Relação com Documentos de Contexto
- O NSD `hora-de-crescer.NSD.fluxo-cenas.md` posiciona essa cena como o momento em que Thorin é obrigado a equipar a armadura antes de seguir para a taverna. Os eventos do mapa replicam o fluxo descrito (discussões com guardas, compra e tutorial de equipamento).  
- Os GDDs de Kilin e Mhordred reforçam o arco descrito: Kilin é o mentor relutante que busca disciplina, enquanto Mhordred representa a urgência e a ameaça física. Ambos aparecem no mapa e repetem as falas esperadas pelo documento.  
- Não há tentativa de extrapolar além do que os textos informam: toda a análise fica restrita ao mapa e aos documentos fornecidos.

## Fontes Consultadas (arquivos do projeto)
- `frontend/data/Map013.json` (mapa e eventos)  
- `docs/Quests/4-e-hora-de-crescer/hora-de-crescer.NSD.fluxo-cenas.md` (NSD)  
- `docs/GDD/4-personagens-inimigos-criaturas/Kilin v3.md`  
- `docs/GDD/4-personagens-inimigos-criaturas/Mhordred v3.md`
