## Objetivo

Este documento consolida as informações sobre o Futebol Rúnico espalhadas pelo GDD e pelo Obsidian. A função dele é servir como referência central para narrativa, worldbuilding, gameplay, personagens e implementação.

O Futebol Rúnico deve ser tratado como um eixo importante de Daratrine, não como detalhe decorativo. Ele apresenta o mundo comum de Thorin, revela tensões de classe em Gildrat, explica parte do kit de combate dos personagens e retorna no final como símbolo de esperança e reconstrução.

---
## O que é o Futebol Rúnico?

O Futebol Rúnico é o esporte coletivo mais popular de Gildrat e um dos principais símbolos da cultura das castas trabalhadoras. Disputado em um campo retangular, combina corrida, posicionamento, precisão com a funda e trabalho em equipe. O objetivo é conduzir a bola rúnica até a área de ataque e finalizar no gol adversário por meio de disparos realizados com a funda. Passes rápidos, movimentação constante e jogadas ensaiadas fazem parte da identidade do esporte, que valoriza coordenação coletiva e habilidade técnica mais do que força bruta. Além de seu papel esportivo, o Futebol Rúnico tornou-se uma importante manifestação cultural, política e social, funcionando simultaneamente como entretenimento popular, espaço de resistência e instrumento de influência das elites sobre a população.

### Estrutura Básica

**Número de jogadores**
- Cada equipe possui **7 jogadores em campo**.
- Há jogadores reservas e comissão técnica.

**Posições**
Goleiro: Defende o gol e inicia a construção das jogadas.
Defensores (2): Protegem a defesa e recuperam a posse da bola.
Armador: Organiza as jogadas ofensivas e distribui passes.
Alas (2): Responsáveis pela movimentação lateral e criação de oportunidades.
Finalizador: Principal responsável pelos disparos ao gol utilizando a funda.

==Pendência: tem nomes específicos das posições no futebol?  vi ex-Splinter/recebedora (filena) ==

**Equipamentos**

Cada jogador utiliza: 
- bola rúnica oficial;
- capacete obrigatório;
- uniforme da equipe;
- braçadeiras ou faixas de identificação.
- funda esportiva (a funda esportiva utilizada no Futebol Rúnico é adaptada posteriormente por Thorin como sua arma principal durante a campanha).

**Equipes Conhecidas**
- Machados Enferrujados: equipe pela qual jogam Thorin, Filena e Borin.
		- Treinador: Dragobur.
		- Representa as castas trabalhadoras de Gildrat.
		- Disputa o principal campeonato local.

==- tem outras?==

**Competições**
Atualmente existe pelo menos um campeonato importante em Gildrat:
- Durante o Ato I, Thorin disputa a semifinal do campeonato pelos Machados Enferrujados antes de ser obrigado por Tordan a abandonar temporariamente o esporte.

---
## Definição de Design
Futebol Rúnico é o esporte popular mais importante de Gildrat. Ele mistura competição física, técnica com funda/bola, jogadas ensaiadas, cantos de torcida e elementos rúnicos visuais.

chat: organizar: nomes de times? posições de jogadores? descrever mias ou menos como seria o jogo; coisa de um paragrafo
- Time Machados Enferrujados (de thorin filena e borin)

No GDD, ele cumpre quatro funções principais:

| Eixo          | Função                                                                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Cultura    | Expressa pertencimento popular, liberdade e memória viva dentro de uma sociedade rígida.                                                                                                                                                                                                                                  |
| B. Política   | Funciona como válvula de escape social, usado pelo poder como "pão e circo", mas vivido pelo povo como resistência.<br>*- Nota: Embora o Império apresente o Futebol Rúnico como símbolo de prosperidade e união entre as castas, diferentes grupos utilizam sua estrutura para ampliar sua influência dentro do Estado.* |
| C. Personagem | Define o sonho inicial de Thorin, a relação com Filena e Borin, e a ferida familiar com Tordan.                                                                                                                                                                                                                           |
| D. Gameplay   | Serve como tutorial inicial, origem de habilidades de combate e possível apoio na defesa final de Gildrat.                                                                                                                                                                                                                |
Além de seu papel cultural, o Futebol Rúnico tornou-se uma importante instituição social de Gildrat. Sua enorme popularidade fez com que o esporte ultrapassasse o entretenimento, tornando-se um espaço de disputa por prestígio, influência econômica e representação política.

---

## A. Papel Cultural em Gildrat

Gildrat é uma sociedade anã de castas, linhagens, trabalho pesado, mineração, memória ancestral e controle imperial. Nesse contexto, o Futebol Rúnico é um dos poucos espaços onde a hierarquia social pode ser momentaneamente invertida.

Princípios culturais:

- É esporte das castas mais baixas, mas também atrai jovens nobres que buscam prestígio fora da linhagem.
- Para o Império, funciona como instrumento de controle social: entretenimento capaz de reduzir tensões e reforçar a imagem de estabilidade do governo.
- Grandes partidas tornam-se eventos políticos, nos quais Casas Mineradoras disputam prestígio, patrocinadores exibem seu poder econômico e representantes imperiais reforçam discursos de unidade nacional.
- Para o povo, representa pertencimento, liberdade, Velhas Canções e memória viva.
- As torcidas transformam as arquibancadas em espaços de identidade coletiva, preservando cantos, símbolos e tradições que escapam ao controle oficial.
- O campo é o único lugar onde um trabalhador pode derrotar um nobre sem que isso seja interpretado como afronta à ordem social.
- Quem se destaca no esporte conquista prestígio social, mesmo sem origem nobre.

Leitura de tom:

- O futebol deve contrastar com a rigidez industrial de Gildrat.
- Onde a cidade fala em contratos, linhagens e dever, o futebol fala em ritmo, torcida, corpo, improviso e equipe.
- Ele deve parecer popular, barulhento, afetivo e físico.

#### Relação com as Velhas Canções  

**Ver mais em: [[01.6.2_As Velhas Canções]]**

- a torcida preserva ritmos, cantos e frases antigas;
- o esporte conserva gestos coletivos anteriores ao controle imperial;
- a quadra pode funcionar como um dos poucos espaços onde a memória popular sobrevive sem ser tratada como religião proibida;
- muitos cânticos de torcida possuem origem nas Velhas Canções, embora poucos reconheçam essa relação atualmente;
- para parte da população, cantar no estádio tornou-se uma forma socialmente aceita de manter viva uma tradição que o Império tentou apagar.

---

## B. Organização Política do Futebol Rúnico

O Futebol Rúnico movimenta grandes quantidades de recursos, trabalhadores e público. Ao longo das últimas gerações, deixou de ser apenas um esporte e tornou-se uma instituição política reconhecida pelo Império.

#### Financiadores
Os campeonatos recebem financiamento de diferentes grupos de interesse:
- **Império**, que utiliza o esporte como instrumento de integração social e propaganda institucional;
- **Casas Mineradoras**, interessadas em ampliar seu prestígio político e influência popular;
- Benfeitores particulares, ex-jogadores e comerciantes locais.
Essa diversidade de financiadores transforma o Futebol Rúnico em um espaço permanente de negociação entre interesses econômicos, sociais e políticos.

### Representação Política
O Futebol Rúnico possui representação permanente no **Conselho Imperial**, por meio da cadeira dos **Jogos Públicos e Festivais**.

Oficialmente, esse representante é responsável por discutir políticas esportivas, organização dos campeonatos, infraestrutura, festivais e atividades culturais.

Na prática, porém, essa cadeira exerce funções muito mais amplas:
- representa os interesses das ligas, clubes e patrocinadores;
- aproxima o governo das castas populares;
- negocia investimentos públicos em grandes eventos;
- fortalece a imagem do Império como promotor da cultura e do lazer.

Como o Futebol Rúnico é o maior espetáculo popular de Gildrat, essa cadeira acaba sendo dominada por seus representantes, tornando-se um importante espaço de influência política.

Para as Casas Mineradoras, o patrocínio esportivo representa uma das poucas formas indiretas de participar das decisões do Conselho Imperial, já que muitas delas possuem riqueza suficiente para influenciar o esporte, mas não pertencem às Grandes Casas Nobres.

Assim, diferentes grupos disputam o controle do Futebol Rúnico não apenas pelo prestígio esportivo, mas também pela capacidade de influenciar decisões políticas e conquistar apoio popular.

### Relação com as Castas
Cada camada social enxerga o Futebol Rúnico de maneira diferente

| Grupo                         | Relação com o Futebol Rúnico                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Grandes Casas                 | Consideram o esporte um entretenimento popular útil para manter a estabilidade social. Alguns jovens nobres participam buscando prestígio individual, mas a elite tende a enxergar o futebol como uma atividade inferior às tradições militares e políticas. |
| Casas Mineradoras             | Investem pesadamente em equipes e campeonatos para ampliar sua influência pública e política. O patrocínio esportivo tornou-se uma ferramenta de ascensão social e aproximação do Conselho Imperial.                                                         |
| Trabalhadores (Mãos de Pedra) | O futebol representa identidade, pertencimento, comunidade e resistência cultural. É um dos poucos espaços onde talento pode superar origem social.                                                                                                          |

Ver mais sobre a organização social em: [[Organização Social de Gildrat]]

---
## C. Personagens
#### Função na Jornada de Thorin

O Futebol Rúnico é o primeiro sonho de Thorin e a primeira forma de autonomia que ele tenta defender.

Para Thorin, o futebol representa muito mais do que um esporte: representa a possibilidade de construir uma identidade própria, distante das expectativas impostas por sua família e pelo Império.

Já para Tordan, seu pai, o Futebol Rúnico simboliza um passado que ele prefere esquecer. Embora tenha praticado o esporte quando jovem, abandonou essa parte de sua vida ao assumir suas responsabilidades como membro de uma Grande Casa. Hoje, enxerga o futebol como uma atividade incompatível com a posição social da família e tenta impedir que Thorin siga o mesmo caminho.

Esse conflito transforma o esporte em um dos principais eixos dramáticos do Ato I, funcionando como contraponto à mineração, ao dever militar e às expectativas familiares.

#### Personagens Ligados ao Futebol Rúnico
| Personagem       | Relação com o Futebol Rúnico                                                                            | Função de design                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Thorin           | Jogador dos Machados Enferrujados; usa a funda do futebol como arma; busca reconhecimento pelo esporte. | Protagonista dividido entre autonomia, família, dever e magia.            |
| Filena           | Jogadora do time; ex-Splinter/recebedora; mobilidade do combate vem da experiência no esporte.          | Ponte entre futebol, resistência civil e relacionamento com Thorin.       |
| Borin            | Rival esportivo de Thorin; quer ser reconhecido como o melhor jogador do time.                          | Termômetro da casta simples e rivalidade social.                          |
| Tordan           | Rejeita o futebol de Thorin, mas tem passado ligado ao esporte e troféus antigos.                       | Ferida familiar; aceita ou respeita o futebol ao fim do arco.             |
| Dragobur         | Treinador dos Machados Enferrujados; cobra disciplina e equipamento.                                    | Mentor esportivo inicial e ponte para o tutorial.                         |
| Kilin e Mhordred | Interrompem a comemoração da semifinal e escoltam Thorin.                                               | Representam a invasão do dever militar no espaço de liberdade do futebol. |

#### Locais e Objetos Ligados ao Futebol Rúnico

| Local                             | Uso                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| Estádio dos Machados Enferrujados | Palco da semifinal, possível final, treinamento e reconciliação com Tordan.                |
| Campo de Futebol Rúnico           | Mapa de minijogo/tutorial e espaço de jogada decisiva.                                     |
| Vestiário                         | Busca do capacete, gag leve, possível sala de treino com Tordan.                           |
| Casa Forja-Prata                  | Mostra o conflito entre orgulho militar e futebol.                                         |
| Despensa da Casa Forja-Prata      | Memorial esportivo com troféus, baú da funda, lembranças e objeto de confronto com Tordan. |
| Troféu antigo de Tordan           | Objeto emocional usado por Thorin para tentar recuperar a memória do pai.                  |
| Funda de Thorin (?)               | Ferramenta esportiva que vira arma de combate.                                             |
| Capacete antigo de Dragobur       | Item da semifinal; reforça regra, história do time e tutorial de equipamento.              |
| Bolas, bandeiras e troféus        | Props para mostrar que o futebol pertence ao cotidiano da cidade.                          |

---
## D. Gameplay

#### Semifinal como Tutorial

A Semifinal e a primeira quest jogável com Thorin e tem importância de tutorial.

	**- isso já está implementado?**
	**- existe uma ideia de como vai ser?**

Fluxo funcional:

| **Etapa**               | **Função**                                               |
| ----------------------- | -------------------------------------------------------- |
| Pesadelo e despertar    | Apresenta mãe, presságio e urgência.                     |
| Pegar a funda           | Introduz item/arma simbólica de Thorin.                  |
| Corrida até o estádio   | Ensina movimentação e direcionamento de objetivo.        |
| Bronca de Dragobur      | Mostra regra do esporte e falha de disciplina de Thorin. |
| Buscar capacete         | Ensina exploração/interação/equipamento.                 |
| Intervenção dos guardas | Troca triunfo por tensão e puxa a próxima quest.         |

	
