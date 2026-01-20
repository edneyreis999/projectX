# Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## Quest: Primeiro Contrato

### 1 Resumo Geral (Checkpoint 0)

- [x] Concluido
- Nome da quest: Primeiro Contrato
- Importancia na campanha: Main
- Arco narrativo: Chamado a Aventura
- Quest anterior: Hora de Crescer
- Conflito central: Thorin tenta sair da expedicao alegando um ombro machucado, mas muda de ideia ao ouvir sobre Filena e a pressa de Balastrus.
- Objetivo narrativo global: Apresentar o Mapamundi, introduzir o conceito de formacao de equipe para combate e ensinar as mecanicas de batalha enquanto mantem a historia em movimento rumo a expedicao
  na Mina de Kravens.
- Premissa resumida: Na taverna, Thorin convence Balastrus de que esta machucado e tenta sair, mas Borin chega, entrega o contrato e comenta sobre Filena. Ao ouvir isso, Thorin muda de ideia, pega o
  contrato com o taverneiro e encontra Balastrus no Cao Luar. Na estrada, Borin o confronta, Balastrus divide as equipes, os guardas chegam e a formacao muda, colocando Filena com Thorin. O grupo
  inicia a marcha para Kravens.
- Resumo: Thorin tenta escapar da expedicao, mas a chegada de Borin e a pergunta sobre Filena o fazem voltar atras. Balastrus, impaciente com o tempo, exige que Thorin pegue o contrato com o
  taverneiro e o encontre no Cao Luar. Na estrada, Borin questiona a mudanca repentina de Thorin e o trata como filhinho de papai. Balastrus inicia a divisao de times, Thorin pede para ficar com
  Filena, e a chegada dos guardas força uma nova configuracao, deixando Filena com ele. A expedição parte, enfrenta perigos no mapamundi, chega a Kravens, recebe o briefing, relaxa na fogueira e
  encerra a noite na barraca.

- Locais principais
  - Taverna (encontro com Balastrus)
  - Distrito Comercial
  - Estrada do Cao Luar
  - Travessia no Mapamundi
  - Clareira / entrada da Mina de Kravens (inclui fogueira do acampamento)
- NPCs principais
  - Thorin (protagonista)
  - Balastrus
  - Filena
  - Borin
  - Kilin (guarda real)
  - Mhordred (guarda real)
  - Guardas de Kravens (2)

---

### 2 Pre-condicoes Narrativas (Checkpoint 1)

- [x] Concluido

| Tipo                        | Descricao                                   |
| --------------------------- | ------------------------------------------- |
| Flags / Decisoes anteriores | Jogador concluiu a missao "Hora de Crescer" |
| Limitacoes ou bloqueios     | Nenhuma limitacao persistente adicional     |

---

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [x] Concluido

```plaintext
Quest: Primeiro Contrato
 +-- Cena 1: Taverna - Ombro, Borin e decisao
 |      +-- Beat 1: Thorin convence Balastrus e tenta sair; Borin chega e entrega contrato
 +-- Cena 2: Distrito Comercial -> Estrada do Cao Luar
 |      +-- Beat 1: Thorin pega o contrato com o taverneiro e segue para o encontro
 +-- Cena 3: Estrada do Cao Luar - Entrega do contrato
 |      +-- Beat 1: Borin confronta Thorin; Balastrus desce e inicia a organizacao
 +-- Cena 4: Estrada do Cao Luar - Divisao de times e escolta
 |      +-- Beat 1: Guardas chegam; Balastrus troca times e inicia a marcha
 +-- Cena 5: Mapamundi - Viagem a Mina de Kravens
 |      +-- Beat 1: Navegacao e combates no caminho
 +-- Cena 6: Portao de Kravens
 |      +-- Beat 1: Guarda confere contratos e libera entrada
 +-- Cena 7: Clareira da Mina - Briefing com Balastrus
 |      +-- Beat 1: Balastrus reclama do atraso e define a descida ao amanhecer
 +-- Cena 8: Fogueira dos Guardas - Refeicao
 |      +-- Beat 1: Jantar, desagravo e humor de Mhordred
 +-- Cena 9: Barraca de Thorin
        +-- Beat 1: Jogador dorme e encerra a quest
```

#### Tabela de Cenas

| #   | Nome da Cena            | Premissa resumida (expandida)                                                                                                                     |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Contrato na Taverna** | Thorin alega ombro machucado para sair, mas Borin chega, entrega o contrato e menciona Filena. Thorin muda de ideia e decide entrar na expedicao. |
| 2   | **Caminho ao Encontro** | Thorin pega o contrato com o taverneiro e segue pelo Distrito Comercial ate a Estrada do Cao Luar.                                                |
| 3   | **Entrega do Contrato** | Na Estrada do Cao Luar, Borin confronta Thorin e Balastrus segue adiante, abrindo a organizacao do grupo.                                         |
| 4   | **Divisao de Times**    | Balastrus divide as equipes, os guardas chegam e a escala muda, colocando Filena com Thorin; a marcha comeca.                                     |
| 5   | **Travessia Gelida**    | O grupo percorre o Mapamundi coberto de neve, enfrentando combates tutoriais que introduzem mecanicas de equipe e de combate.                     |
| 6   | **Portao de Kravens**   | Guardas locais checam o contrato e liberam o grupo, trancando o portao atras.                                                                     |
| 7   | **Briefing a Fogueira** | Balastrus define o plano do amanhecer, reforca a hierarquia e encerra a tensao com a intervenção de Kilin.                                        |
| 8   | **Assado e Desagravo**  | Os guardas convidam Thorin e Filena para o assado; o clima alivia com o humor de Mhordred.                                                        |
| 9   | **Sono Merecido**       | Thorin retorna a barraca e dorme, marcando o encerramento da quest.                                                                               |

#### Beats por Cena

##### Cena 1 - Contrato na Taverna

| #       | Nome do Beat                           | Premissa Resumida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Tipo |
| ------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **1-A** | **Entrada na taverna**                 | O Jogador controla Thorin, que entra na Taverna da Pedra Vulcânica e pergunta ao taverneiro Durgan onde está Balastrus.                                                                                                                                                                                                                                                                                                                                                                                      | JOG  |
| **1-B** | **A Resposta do anão Franzino**        | Durgan responde que Balastrus está numa das mesas do canto e que é impossível não notar a "careca".                                                                                                                                                                                                                                                                                                                                                                                                          | CS   |
| **1-C** | **Thorin se senta**                    | O Jogador controla Thorin, que se dirige à mesa do contratante e senta para falar.                                                                                                                                                                                                                                                                                                                                                                                                                           | JOG  |
| **1-D** | **Ombro machucado**                    | Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.                                                                                                                                                                                                                                                                                                                                             | CS   |
| **1-E** | **Falsa vitória**                      | O jogador controla Thorin, que se levanta para sair da Taverna e comemorar, ativando a próxima cutscene através de um trigger de passos.                                                                                                                                                                                                                                                                                                                                                                     | JOG  |
| **1-F** | **Eternos rivais**                     | Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.                                                                                                                                                                                                                                 | CS   |
| **1-G** | **Espere, senhor Balastrus!**          | O Jogador controla Thorin que volta para falar com Balastrus assim que escuta o nome da Filena.                                                                                                                                                                                                                                                                                                                                                                                                              | JOG  |
| **1-H** | **Pelas garotas e pela glória**        | Thorin diz a Balastrus que se enganou, ele não só quer, como precisa estar na expedição. Quando questionado sobre o ombro machucadovo, ele diz que o povo anão nunca faz corpo mole e que grande parte da história foi apenas "força de expressão". Balastrus manda Borin sair e diz a Thorin que o tempo está se esgotando, ele precisa pegar um contrato com o taverneiro, assinar e levar até a Estrada do Cão-luar, pois o grupo já estava de partida. O Mercenário se levanta e também deixa a taverna. | CS   |
| **1-I** | **Sai da Frente que atrás vem gente!** | O Jogador controla Thorin, que precisa ir até o taverneiro, pegar o contrato, assinar e levá-lo até a estrada do Cão-luar.                                                                                                                                                                                                                                                                                                                                                                                   | JOG  |

##### Cena 2 - Caminho ao Encontro

| #       | Nome do Beat            | Premissa Resumida                                                 | Tipo |
| ------- | ----------------------- | ----------------------------------------------------------------- | ---- |
| **2-A** | **Contrato com Durgan** | Thorin pega o contrato no balcao da taverna.                      | JOG  |
| **2-B** | **Saida da cidade**     | Thorin atravessa o Distrito Comercial rumo a Estrada do Cao Luar. | JOG  |
| **2-C** | **Chegada ao ponto**    | Thorin encontra Balastrus e o grupo na estrada.                   | JOG  |

##### Cena 3 - Entrega do Contrato

| #       | Nome do Beat            | Premissa Resumida                                                              | Tipo |
| ------- | ----------------------- | ------------------------------------------------------------------------------ | ---- |
| **3-A** | **Borin com Filena**    | Borin conversa com Filena enquanto o grupo aguarda.                            | CS   |
| **3-B** | **Entrega do contrato** | Thorin entrega o contrato a Balastrus.                                         | JOG  |
| **3-C** | **Provocacao do Borin** | Borin confronta Thorin por ter mudado de ideia e provoca: "filhinho de papai". | CS   |
| **3-D** | **Balastrus adiante**   | Balastrus segue para baixo da estrada e inicia a organizacao do grupo.         | CS   |

##### Cena 4 - Divisao de Times

| #       | Nome do Beat            | Premissa Resumida                                                                                                                                                                                                                                | Tipo |
| ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **4-A** | **Pedido de Thorin**    | Thorin sussurra que quer ficar no mesmo time que Filena, como se fosse uma oração.                                                                                                                                                               | CS   |
| **4-B** | **Zoeira do Borin**     | Borin provoca Thorin porque Filena esta no time dele e Thorin escolhe reagir ou não.                                                                                                                                                             | JOG  |
| **4-C** | **Chegada dos guardas** | Kilin e Mhordred aparecem e discutem com Balastrus.                                                                                                                                                                                              | CS   |
| **4-D** | **Troca de times**      | Balastrus muda a escala, Filena vai para a equipe de Thorin e a marcha comeca. Filena não gosta do fato de Thorin estar sendo protegido por guardas reais e por um momento pensa que Borin tem razão, se enfurece por estar na equipe de Thorin. | CS   |

##### Cena 5 - Travessia Gelida

| #       | Nome do Beat           | Premissa Resumida                                                                                                                                                              | Tipo |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **5-A** | **Mapa e objetivo**    | Mapamundi abre com tutorial e objetivo de chegar a Kravens. Primeiras batalhas. Thorin discute com Kilin e Mhordred por causa da super proteção enquanto está perto de Filena. | JOG  |
| **5-B** | **Combates tutoriais** | Encontros leves exibem habilidades do grupo e ensinam mecanicas de equipe.                                                                                                     | JOG  |
| **5-C** | **Chegada ao portao**  | Fade-out marca checkpoint e transicao para o Portao de Kravens.                                                                                                                | CS   |

##### Cena 6 - Portao de Kravens

| #       | Nome do Beat            | Premissa Resumida                                          | Tipo |
| ------- | ----------------------- | ---------------------------------------------------------- | ---- |
| **6-A** | **Burocracia na grade** | Guardas locais pedem o contrato e questionam o atraso.     | CS   |
| **6-B** | **Entrega do contrato** | Jogador seleciona entregar o documento ao guarda.          | JOG  |
| **6-C** | **Entrada liberada**    | Contrato conferido, portao destrancado e entrada liberada. | CS   |
| **6-D** | **Portao se fecha**     | Grupo entra e o portao fecha atras.                        | JOG  |

##### Cena 7 - Briefing a Fogueira

| #       | Nome do Beat             | Premissa Resumida                                                   | Tipo |
| ------- | ------------------------ | ------------------------------------------------------------------- | ---- |
| **7-A** | **Pan de apresentacao**  | Camera destaca Balastrus na fogueira e retorna a Thorin.            | CS   |
| **7-B** | **Reprimenda e escolha** | Balastrus reclama do atraso; jogador decide se responde ou se cala. | JOG  |
| **7-C** | **Plano do amanhecer**   | Lider define a descida e reforca a hierarquia do grupo.             | CS   |
| **7-D** | **Conflito e convite**   | Mhordred desafia Balastrus; Kilin encerra e convida para o assado.  | CS   |

##### Cena 8 - Assado e Desagravo

| #       | Nome do Beat            | Premissa Resumida                                                                                                                                 | Tipo |
| ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **8-A** | **Quebra de tensao**    | Conversa informal na fogueira aproxima Thorin dos guardas.                                                                                        | JOG  |
| **8-B** | **Pedido de desculpas** | Jogador escolhe como Thorin se desculpa por como vinha agindo.                                                                                    | JOG  |
| **8-C** | **Gag do assado**       | Refeicao termina com humor de Mhordred.                                                                                                           | CS   |
| **8-D** | **Hora de dormir**      | Objetivo atualizado para ir ate a barraca. Filena se levanta com Mhordred, mas Kilin pede a Thorin que fique, jogador escolhe se vai ficar ou não | JOG  |

##### Cena 9 - Sono Merecido

| #       | Nome do Beat            | Premissa Resumida                             | Tipo |
| ------- | ----------------------- | --------------------------------------------- | ---- |
| **9-A** | **Retorno a barraca**   | Jogador guia Thorin ate sua barraca.          | JOG  |
| **9-B** | **Decisao de descanso** | Prompt confirma o descanso e encerra a quest. | JOG  |

#### Beats por Cena (Detalhado)

##### Cena 1 - Contrato na Taverna

| #   | Beat                                                                                                  | Controle                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | Thorin conversa com Balastrus e alega que seu ombro esta machucado para nao entrar na expedicao.      | CS: inicia quando Thorin se aproxima de Balastrus no balcao.                                           |
| 2   | Thorin se vira para sair; o trigger de mudanca de variavel ocorre por passos ao atravessar a taverna. | JOG: jogador controla Thorin e anda em direcao a saida; ao cruzar o gatilho de passos, avancar o beat. |
| 3   | Borin chega, discute com Thorin e entrega o contrato a Balastrus.                                     | CS: inicia ao ativar o gatilho de saida/afastamento do balcao.                                         |
| 4   | Balastrus avisa que o limite de tempo foi atingido e a expedicao ja esta quase partindo.              | CS: inicia na fala de Balastrus durante a conversa com Borin.                                          |
| 5   | Borin pergunta se Filena ja entregou o contrato; Thorin ouve a conversa.                              | CS: inicia quando Borin menciona Filena.                                                               |
| 6   | Borin sai da taverna.                                                                                 | CS: inicia com Borin se virando para a porta.                                                          |
| 7   | Thorin muda de ideia e diz a Balastrus que tambem vai na expedicao.                                   | CS: inicia quando Thorin interrompe a despedida e recua.                                               |
| 8   | Balastrus manda Thorin pegar o contrato com o taverneiro e encontra-lo no Cao Luar.                   | JOG: jogador retoma controle; objetivo passa a ir ao balcao pegar o contrato.                          |

##### Cena 2 - Caminho ao Encontro

| #   | Beat                                                                                | Controle                                                                            |
| --- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | Thorin fala com o taverneiro e pega o contrato.                                     | JOG: jogador controla Thorin, vai ao balcao e interage para pegar o contrato.       |
| 2   | Thorin deixa a taverna e atravessa o Distrito Comercial rumo a Estrada do Cao Luar. | JOG: jogador conduz Thorin pela cidade ate a saida do distrito.                     |
| 3   | Transicao de cenario: fade-out/fade-in para o mapa da Estrada do Cao Luar.          | CS: inicia ao cruzar o trigger de saida da cidade.                                  |
| 4   | Thorin chega ao ponto de encontro e ve Balastrus, Borin e Filena.                   | JOG: jogador anda ate o ponto; ao entrar no gatilho, inicia a cutscene do encontro. |

##### Cena 3 - Entrega do Contrato

| #   | Beat                                                                                                             | Controle                                               |
| --- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1   | Borin esta falando com Filena quando Thorin se aproxima.                                                         | CS: inicia quando Thorin entra no alcance do grupo.    |
| 2   | Thorin entrega o contrato a Balastrus.                                                                           | JOG: jogador confirma a entrega via interacao/dialogo. |
| 3   | Borin confronta Thorin: diz que ele nao ia e mudou de ideia de repente; provoca com o tema de filhinho de papai. | CS: inicia assim que a entrega e concluida.            |
| 4   | Balastrus anda para baixo na estrada com o contrato; Thorin vai atras para falar com ele.                        | CS: inicia quando Balastrus se vira e comeca a descer. |
| 5   | Balastrus comeca a dividir os times para a marcha.                                                               | CS: inicia quando Balastrus para e chama o grupo.      |

##### Cena 4 - Divisao de Times

| #   | Beat                                                                        | Controle                                                        |
| --- | --------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Thorin sussurra que quer ficar no mesmo time que Filena.                    | CS: inicia no close de Thorin sussurrando.                      |
| 2   | Borin zomba de Thorin porque Filena esta no time dele.                      | JOG: jogador escolhe a reacao de Thorin (responder ou ignorar). |
| 3   | Kilin e Mhordred chegam e discutem com Balastrus.                           | CS: inicia com a entrada dos guardas no quadro.                 |
| 4   | Balastrus troca os times; Filena fica na equipe de Thorin.                  | CS: inicia quando Balastrus anuncia a nova escala.              |
| 5   | Filena e Borin ficam irritados com a decisao, mas Balastrus nao se importa. | CS: inicia no momento da reacao de Filena/Borin.                |
| 6   | O grupo se organiza e sai para a marcha.                                    | CS: inicia quando Balastrus da a ordem de partida.              |

##### Cena 5 - Travessia Gelida

| #   | Beat                                                                                                            | Controle                                                                 |
| --- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | Tela corta para o Mapamundi: Thorin, guardas, Filena e Borin surgem no caminho nevado.                          | CS: inicia no corte para o Mapamundi.                                    |
| 2   | Tutorial pop-up: "Chegue ate Kravens. Encontros podem ocorrer no caminho."                                      | JOG: jogador confirma o tutorial e assume o controle do grupo.           |
| 3   | Jogador controla o grupo e o indicador de quests pelo trajeto montanhoso.                                       | JOG: mover o grupo no mapa seguindo o marcador de objetivo.              |
| 4   | Encontros aleatorios leves podem surgir; Thorin testemunha a forca de Kilin e Mhordred e a agilidade de Filena. | JOG: jogador entra nos encontros ao tocar nos gatilhos e vence as lutas. |
| 5   | Ao alcancar o Portao de Kravens, ocorre fade-out rapido e salva-checkpoint.                                     | CS: inicia ao atingir o trigger do portao.                               |

##### Cena 6 - Portao de Kravens

| #   | Beat                                                                                                | Controle                                                                                     |
| --- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | Fade-in revela o Portao de Kravens; dois guardas jogam cartas no interior.                          | CS: inicia no fade-in do portao.                                                             |
| 2   | Guarda percebe o grupo do lado de fora e aproxima-se da grade.                                      | CS: inicia quando o guarda olha para fora.                                                   |
| 3   | Dialogo: guarda questiona o atraso e solicita o contrato.                                           | CS: inicia quando o guarda abre a conversa.                                                  |
| 4   | Jogador escolhe "Entregar contrato" na arvore de dialogo.                                           | JOG: selecionar a opcao de entregar o documento.                                             |
| 5   | Guarda confere o documento, destranca o portao e abre passagem.                                     | CS: inicia ao confirmar a escolha.                                                           |
| 6   | Guarda aponta para dentro: "Balastrus esta ali na fogueira, aguardando voces."                      | CS: inicia quando o portao abre.                                                             |
| 7   | Jogador atravessa o portao com o grupo; guarda fecha atras. Checkpoint de salvamento e fim da cena. | JOG: jogador guia o grupo para dentro; ao cruzar o trigger, inicia a cutscene de fechamento. |

##### Cena 7 - Briefing a Fogueira

| #   | Beat                                                                                            | Controle                                                                                |
| --- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | Ao entrar na clareira, pan de camera destaca Balastrus na beira da fogueira e retorna a Thorin. | CS: inicia ao entrar na clareira.                                                       |
| 2   | Jogador caminha manualmente ate Balastrus.                                                      | JOG: jogador controla Thorin ate a fogueira central; ao se aproximar, inicia o dialogo. |
| 3   | Balastrus reclama do atraso e do "comboio real"; Thorin responde.                               | CS: inicia quando Thorin chega ao alcance de Balastrus.                                 |
| 4   | Escolha do jogador: (A) responder "Sim, senhor" (B) ficar em silencio.                          | JOG: jogador escolhe a resposta na arvore de dialogo.                                   |
| 5   | Balastrus detalha o plano: saida ao amanhecer, descida direta, sem desvios.                     | CS: inicia depois da escolha.                                                           |
| 6   | Balastrus encerra com rispidez e reforca a hierarquia.                                          | CS: inicia na fala final de Balastrus.                                                  |
| 7   | Mhordred o impede e comeca uma discussao; Kilin intervem.                                       | CS: inicia quando Mhordred corta a fala.                                                |
| 8   | Kilin convida Thorin e Filena para comer um assado.                                             | CS: inicia quando Kilin assume a conversa.                                              |
| 9   | Objetivo atualizado: ir ate a fogueira dos guardas.                                             | JOG: jogador retoma controle e segue para a fogueira dos guardas.                       |

##### Cena 8 - Assado e Desagravo

| #   | Beat                                                                                          | Controle                                             |
| --- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | Jogador caminha ate a fogueira onde Kilin, Mhordred, Filena e Borin assam carne.              | JOG: jogador guia Thorin ate a fogueira dos guardas. |
| 2   | Guardas iniciam conversa e aliviam o clima com Thorin.                                        | CS: inicia quando Thorin chega a fogueira.           |
| 3   | Arvore de dialogo: escolher como pedir desculpas - (A) direto (B) brincalhao (C) formal.      | JOG: jogador escolhe o tom do pedido de desculpas.   |
| 4   | Thorin pede desculpas; Kilin aceita, Mhordred resmunga sobre os 20.000 drakeis ainda devidos. | CS: inicia apos a escolha.                           |
| 5   | Mhordred interrompe: "O assado ta pronto!" - fade-in / fade-out rapido indica a refeicao.     | CS: inicia quando Mhordred anuncia o assado.         |
| 6   | Pos-janta: Mhordred segura o estomago e reclama "Urgh. comi demais."                          | CS: inicia no retorno do fade-in pos-refeicao.       |
| 7   | Kilin conclui: "Hora de cada um pra sua barraca - amanha cedo iniciamos a descida."           | CS: inicia quando Kilin encerra a conversa.          |
| 8   | Objetivo atualizado: ir ate a barraca de Thorin e dormir.                                     | JOG: jogador retoma controle e vai ate a barraca.    |

##### Cena 9 - Sono Merecido

| #   | Beat                                                                               | Controle                                               |
| --- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1   | Jogador guia Thorin ate a propria barraca.                                         | JOG: jogador controla Thorin ate a entrada da barraca. |
| 2   | Prompt na cama: "Descansar ate o amanhecer?" - opcoes (A) Sim (B) Nao.             | JOG: jogador escolhe descansar ou nao.                 |
| 3   | Se escolher "Sim", Thorin deita; balcao de pensamento e fade-out encerram a quest. | CS: inicia ao confirmar "Sim".                         |
