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

| Beat                                         | Premissa Resumida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Tipo |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **1-A - Entrada na taverna**                 | O Jogador controla Thorin, que entra na Taverna da Pedra Vulcânica e pergunta ao taverneiro Durgan onde está Balastrus.                                                                                                                                                                                                                                                                                                                                                                                      | JOG  |
| **1-B - A Resposta do anão Franzino**        | Durgan responde que Balastrus está numa das mesas do canto e que é impossível não notar a "careca".                                                                                                                                                                                                                                                                                                                                                                                                          | CS   |
| **1-C - Thorin se senta**                    | O Jogador controla Thorin, que se dirige à mesa do contratante e senta para falar.                                                                                                                                                                                                                                                                                                                                                                                                                           | JOG  |
| **1-D - Ombro machucado**                    | Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.                                                                                                                                                                                                                                                                                                                                             | CS   |
| **1-E - Falsa vitória**                      | O jogador controla Thorin, que se levanta para sair da Taverna e comemorar, ativando a próxima cutscene através de um trigger de passos.                                                                                                                                                                                                                                                                                                                                                                     | JOG  |
| **1-F - Eternos rivais**                     | Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.                                                                                                                                                                                                                                 | CS   |
| **1-G - Espere, senhor Balastrus!**          | O Jogador controla Thorin que volta para falar com Balastrus assim que escuta o nome da Filena.                                                                                                                                                                                                                                                                                                                                                                                                              | JOG  |
| **1-H - Pelas garotas e pela glória**        | Thorin diz a Balastrus que se enganou, ele não só quer, como precisa estar na expedição. Quando questionado sobre o ombro machucadovo, ele diz que o povo anão nunca faz corpo mole e que grande parte da história foi apenas "força de expressão". Balastrus manda Borin sair e diz a Thorin que o tempo está se esgotando, ele precisa pegar um contrato com o taverneiro, assinar e levar até a Estrada do Cão-luar, pois o grupo já estava de partida. O Mercenário se levanta e também deixa a taverna. | CS   |
| **1-I - Sai da Frente que atrás vem gente!** | O Jogador controla Thorin, que precisa ir até o taverneiro, pegar o contrato, assinar e levá-lo até a estrada do Cão-luar.                                                                                                                                                                                                                                                                                                                                                                                   | JOG  |

##### Cena 2 - Caminho ao Encontro

| Beat                          | Premissa Resumida                                                 | Tipo |
| ----------------------------- | ----------------------------------------------------------------- | ---- |
| **2-A - Contrato com Durgan** | Thorin pega o contrato no balcao da taverna.                      | JOG  |
| **2-B - Saida da cidade**     | Thorin atravessa o Distrito Comercial rumo a Estrada do Cao Luar. | JOG  |
| **2-C - Chegada ao ponto**    | Thorin encontra Balastrus e o grupo na estrada.                   | JOG  |

##### Cena 3 - Entrega do Contrato

| Beat                          | Premissa Resumida                                                              | Tipo |
| ----------------------------- | ------------------------------------------------------------------------------ | ---- |
| **3-A - Borin com Filena**    | Borin conversa com Filena enquanto o grupo aguarda.                            | CS   |
| **3-B - Entrega do contrato** | Thorin entrega o contrato a Balastrus.                                         | JOG  |
| **3-C - Provocacao do Borin** | Borin confronta Thorin por ter mudado de ideia e provoca: "filhinho de papai". | CS   |
| **3-D - Balastrus adiante**   | Balastrus segue para baixo da estrada e inicia a organizacao do grupo.         | CS   |

##### Cena 4 - Divisao de Times

| Beat                          | Premissa Resumida                                                                                                                                                                                                                                | Tipo |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **4-A - Pedido de Thorin**    | Thorin sussurra que quer ficar no mesmo time que Filena, como se fosse uma oração.                                                                                                                                                               | CS   |
| **4-B - Zoeira do Borin**     | Borin provoca Thorin porque Filena esta no time dele e Thorin escolhe reagir ou não.                                                                                                                                                             | JOG  |
| **4-C - Chegada dos guardas** | Kilin e Mhordred aparecem e discutem com Balastrus.                                                                                                                                                                                              | CS   |
| **4-D - Troca de times**      | Balastrus muda a escala, Filena vai para a equipe de Thorin e a marcha comeca. Filena não gosta do fato de Thorin estar sendo protegido por guardas reais e por um momento pensa que Borin tem razão, se enfurece por estar na equipe de Thorin. | CS   |

##### Cena 5 - Travessia Gelida

| Beat                         | Premissa Resumida                                                                                                                                                              | Tipo |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **5-A - Mapa e objetivo**    | Mapamundi abre com tutorial e objetivo de chegar a Kravens. Primeiras batalhas. Thorin discute com Kilin e Mhordred por causa da super proteção enquanto está perto de Filena. | JOG  |
| **5-B - Combates tutoriais** | Encontros leves exibem habilidades do grupo e ensinam mecanicas de equipe.                                                                                                     | JOG  |
| **5-C - Chegada ao portao**  | Fade-out marca checkpoint e transicao para o Portao de Kravens.                                                                                                                | CS   |

##### Cena 6 - Portao de Kravens

| Beat                          | Premissa Resumida                                          | Tipo |
| ----------------------------- | ---------------------------------------------------------- | ---- |
| **6-A - Burocracia na grade** | Guardas locais pedem o contrato e questionam o atraso.     | CS   |
| **6-B - Entrega do contrato** | Jogador seleciona entregar o documento ao guarda.          | JOG  |
| **6-C - Entrada liberada**    | Contrato conferido, portao destrancado e entrada liberada. | CS   |
| **6-D - Portao se fecha**     | Grupo entra e o portao fecha atras.                        | JOG  |

##### Cena 7 - Briefing a Fogueira

| Beat                           | Premissa Resumida                                                   | Tipo |
| ------------------------------ | ------------------------------------------------------------------- | ---- |
| **7-A - Pan de apresentacao**  | Camera destaca Balastrus na fogueira e retorna a Thorin.            | CS   |
| **7-B - Reprimenda e escolha** | Balastrus reclama do atraso; jogador decide se responde ou se cala. | JOG  |
| **7-C - Plano do amanhecer**   | Lider define a descida e reforca a hierarquia do grupo.             | CS   |
| **7-D - Conflito e convite**   | Mhordred desafia Balastrus; Kilin encerra e convida para o assado.  | CS   |

##### Cena 8 - Assado e Desagravo

| Beat                          | Premissa Resumida                                                                                                                                 | Tipo |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **8-A - Quebra de tensao**    | Conversa informal na fogueira aproxima Thorin dos guardas.                                                                                        | JOG  |
| **8-B - Pedido de desculpas** | Jogador escolhe como Thorin se desculpa por como vinha agindo.                                                                                    | JOG  |
| **8-C - Gag do assado**       | Refeicao termina com humor de Mhordred.                                                                                                           | CS   |
| **8-D - Hora de dormir**      | Objetivo atualizado para ir ate a barraca. Filena se levanta com Mhordred, mas Kilin pede a Thorin que fique, jogador escolhe se vai ficar ou não | JOG  |

##### Cena 9 - Sono Merecido

| Beat                          | Premissa Resumida                             | Tipo |
| ----------------------------- | --------------------------------------------- | ---- |
| **9-A - Retorno a barraca**   | Jogador guia Thorin ate sua barraca.          | JOG  |
| **9-B - Decisao de descanso** | Prompt confirma o descanso e encerra a quest. | JOG  |
