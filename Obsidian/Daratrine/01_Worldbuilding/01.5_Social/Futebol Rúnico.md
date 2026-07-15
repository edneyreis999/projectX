---
status: Aprovado
genero: Wordbuilding
funcao: Consolidar as informações sobre o Futebol Rúnico
tags:
  - worldbuilding
  - futebolrunico
versao: 1.0.0
autor: Poliana
data: 2026-05
---

## Objetivo

Este documento consolida as informações sobre o Futebol Rúnico espalhadas pelo GDD. A função dele é servir como referência central para narrativa, worldbuilding, gameplay, personagens e implementação.

O Futebol Rúnico deve ser tratado como um eixo importante de Gildrat, não como detalhe decorativo. Ele apresenta o mundo comum de Thorin, revela tensões de classe em Gildrat, explica parte do kit de combate dos personagens e retorna no final como símbolo de esperança e reconstrução.

---
## O que é o Futebol Rúnico?

O Futebol Rúnico é o esporte coletivo mais popular de Gildrat e um dos principais símbolos da cultura das castas trabalhadoras. Disputado em um campo retangular, combina corrida, posicionamento, precisão com a funda e trabalho em equipe. O objetivo é conduzir a bola rúnica até a área de ataque e finalizar no gol adversário por meio de disparos realizados com a funda. Passes rápidos, movimentação constante e jogadas ensaiadas fazem parte da identidade do esporte, que valoriza coordenação coletiva e habilidade técnica e força bruta. Além de seu papel esportivo, o Futebol Rúnico tornou-se uma importante manifestação cultural, política e social, funcionando simultaneamente como entretenimento popular, espaço de resistência e instrumento de influência das elites sobre a população.

### Estrutura Básica

**Número de jogadores**
- Cada equipe possui **7 jogadores em campo**.
- Há jogadores reservas e comissão técnica.

**Objetivo**
As equipes disputam a posse de duas bolas simultaneamente:
- **Bola de Investida:** utilizada para avançar pelo campo e cruzar a Linha Rúnica, marcando a pontuação principal (semelhante a um touchdown).
- **Bola de Funda:** uma esfera menor utilizada para disparos de longa distância com uma funda, permitindo marcar uma pontuação secundária em um alvo elevado.
Essa dinâmica obriga as equipes a decidir constantemente entre proteger a bola principal ou criar oportunidades para os arremessadores.

**Sistema de Pontuação**
- **Investida:** ocorre quando a Bola de Investida ultrapassa a Linha Rúnica adversária carregada por um jogador. Representa a principal forma de marcar pontos.
- **Disparo Rúnico:** ocorre quando a Bola de Funda atravessa o alvo elevado após ser lançada com a funda. Vale menos pontos, mas pode ser executado à distância e mudar o rumo da partida.

| **Posição**         | **Função**                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Guardião**        | Última linha de defesa. Protege a Linha Rúnica e o alvo elevado. Coordena a defesa e organiza o posicionamento da equipe.                                                                   |
| **Bastiões (2)**    | Especialistas em contato físico. Bloqueiam adversários, abrem espaço para os corredores e defendem os carregadores da bola. São os jogadores mais fortes da equipe.                         |
| **Corredor**        | Principal responsável por transportar a Bola de Investida. Precisa de velocidade, resistência e capacidade de romper a marcação para alcançar a Linha Rúnica.                               |
| **Recebedores (2)** | Movimentam-se constantemente pelo campo para receber passes. Criam opções ofensivas e auxiliam tanto na progressão territorial quanto na proteção do Corredor.                              |
| **Fundeiro**        | Especialista no uso da funda. Utiliza a Bola de Funda para realizar disparos contra o alvo elevado, marcando a pontuação secundária. Exige precisão, leitura de jogo e bom posicionamento.  |
**Equipamentos**
Cada jogador utiliza: 
- bola rúnica grande;
- bola menor (usada com funda);
- capacete obrigatório;
- uniforme da equipe;
- braçadeiras ou faixas de identificação;
- funda esportiva;

**Equipes Conhecidas**
- Machados Enferrujados: equipe pela qual jogam Thorin, Filena e Borin.
		- Treinador: Dragobur.
		- Representa as castas trabalhadoras de Gildrat.
		- Disputa o principal campeonato local.
- Existem outras equipes, mas ainda sem nome ou identificação; caso haja necessidade serão criadas posteriormente.

**Competições**
Atualmente existe pelo menos um campeonato importante em Gildrat

---
## Definição de Design

Futebol Rúnico é o esporte popular mais importante de Gildrat. Ele mistura competição física, técnica com funda/bola, jogadas ensaiadas, cantos de torcida e elementos rúnicos visuais.

No GDD, ele cumpre quatro funções principais:

| Eixo        | Função                                                                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Cultura  | Expressa pertencimento popular, liberdade e memória viva dentro de uma sociedade rígida.                                                                                                                                                                                                                                  |
| B. Política | Funciona como válvula de escape social, usado pelo poder como "pão e circo", mas vivido pelo povo como resistência.<br>*- Nota: Embora o Império apresente o Futebol Rúnico como símbolo de prosperidade e união entre as castas, diferentes grupos utilizam sua estrutura para ampliar sua influência dentro do Estado.* |
| C. Gameplay | Serve como **tutorial** inicial e origem de habilidades de combate. Ensina mecânicas de batalha, equipar item, etc.                                                                                                                                                                                                       |
Além de seu papel cultural, o Futebol Rúnico tornou-se uma importante instituição social de Gildrat. Sua enorme popularidade fez com que o esporte ultrapassasse o entretenimento, tornando-se um espaço de disputa por prestígio, influência econômica e representação política.

---

## A. Papel Cultural em Gildrat

Gildrat é uma sociedade anã de castas, linhagens, trabalho pesado, mineração, memória ancestral e controle imperial. Nesse contexto, o Futebol Rúnico é um dos poucos espaços onde a hierarquia social pode ser momentaneamente invertida.

**Princípios culturais:**

- É esporte das castas mais baixas, mas também atrai jovens nobres que buscam prestígio fora da linhagem.
- Para o Império, funciona como instrumento de controle social: entretenimento capaz de reduzir tensões e reforçar a imagem de estabilidade do governo.
- Grandes partidas tornam-se eventos políticos, nos quais Casas Mineradoras disputam prestígio, patrocinadores exibem seu poder econômico e representantes imperiais reforçam discursos de unidade nacional.
- Para o povo, representa pertencimento, liberdade, Velhas Canções e memória viva.
- As torcidas transformam as arquibancadas em espaços de identidade coletiva, preservando cantos, símbolos e tradições que escapam ao controle oficial.
- É uma forma de os anões mais velhos ensinarem anões mais novos a lutarem, se defenderem e usaram força física, evitando conflito com o Império.
- O campo é o único lugar onde um trabalhador pode derrotar um nobre sem que isso seja interpretado como afronta à ordem social.
- Quem se destaca no esporte conquista prestígio social, mesmo sem origem nobre.

**Leitura de tom:**
- O futebol deve contrastar com a rigidez industrial de Gildrat.
- Onde a população fala em contratos, linhagens e dever, o futebol fala em ritmo, torcida, corpo, improviso e equipe.
- Ele deve parecer popular, barulhento, afetivo, físico e agressivo.

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
- **Benfeitores particulares**, ex-jogadores e comerciantes locais.
Essa diversidade de financiadores transforma o Futebol Rúnico em um espaço permanente de negociação entre interesses econômicos, sociais e políticos.

### Representação Política
O Futebol Rúnico possui representação permanente no **Conselho Imperial**, por meio da cadeira dos **Jogos Públicos e Festivais**.

Oficialmente, esse representante é responsável por discutir políticas esportivas, organização dos campeonatos, infraestrutura, festivais e atividades culturais.

Na prática, porém, essa cadeira exerce funções muito mais amplas:
- representa os interesses das ligas, clubes e financiadores;
- aproxima o Império das castas populares;
- negocia investimentos públicos em grandes eventos;
- fortalece a imagem do Império como promotor da cultura e do lazer.

Como o Futebol Rúnico é o maior espetáculo popular de Gildrat, essa cadeira acaba sendo dominada por seus representantes, tornando-se um importante espaço de influência política.

Para as Casas Mineradoras, o patrocínio esportivo representa uma das poucas formas indiretas de participar das decisões do Conselho Imperial, já que muitas delas possuem riqueza suficiente para influenciar o esporte, mas não pertencem às Grandes Casas Nobres.

Assim, diferentes grupos disputam o controle do Futebol Rúnico não apenas pelo prestígio esportivo, mas também pela capacidade de influenciar decisões políticas e conquistar apoio popular.

###### **Apostas e Prestígio**
O Futebol Rúnico movimenta um vasto sistema de apostas populares, no qual torcedores apostam no resultado das partidas, no desempenho de jogadores e em feitos específicos durante os jogos. O volume de recursos envolvidos faz com que vitórias e derrotas tenham impacto econômico significativo, atraindo comerciantes, casas de apostas e investidores.

Muitas Casas Nobres e famílias tradicionais também investem pesadamente em equipes, atletas e apostas esportivas. Para algumas delas, o sucesso nos campeonatos representa uma oportunidade de recuperar prestígio e estabilidade financeira; para outras, campanhas mal sucedidas ou apostas equivocadas podem agravar crises econômicas, levando antigas linhagens nobres ao endividamento ou à perda de influência política.

### Relação com as Castas
Cada camada social enxerga o Futebol Rúnico de maneira diferente

| Grupo                         | Relação com o Futebol Rúnico                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Grandes Casas                 | Consideram o esporte um entretenimento popular útil para manter a estabilidade social. Alguns jovens nobres participam buscando prestígio individual, mas a elite tende a enxergar o futebol como uma atividade inferior às tradições militares e políticas. |
| Casas Mineradoras             | Investem pesadamente em equipes e campeonatos para ampliar sua influência pública e política. O patrocínio esportivo tornou-se uma ferramenta de ascensão social e aproximação do Conselho Imperial.                                                         |
| Trabalhadores (Mãos de Pedra) | O futebol representa identidade, pertencimento, comunidade e resistência cultural. É um dos poucos espaços onde talento pode superar origem social.                                                                                                          |

Ver mais sobre a organização social em: [[Organização Social de Gildrat]]

---
## C. Gameplay

### Semifinal (Tutorial)

A semifinal é a primeira sequência jogável com Thorin e funciona como o tutorial do jogo, introduzindo gradualmente os principais comandos e sistemas.

|**Etapa**|**Mecânica apresentada**|
|---|---|
|Pesadelo e despertar|Introdução narrativa e contextualização do objetivo.|
|Pegar a funda|Coleta do primeiro equipamento.|
|Corrida até o estádio|Movimentação e navegação até um objetivo.|
|Bronca de Dragobur|Introdução ao contexto do Futebol Rúnico e às regras básicas.|
|Buscar o capacete|Exploração, interação com objetos e equipar itens.|
|Intervenção dos guardas|Encerramento do tutorial e transição para a próxima quest.|
	
