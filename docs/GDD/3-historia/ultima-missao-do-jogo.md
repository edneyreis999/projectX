# A ultima missão do Jogo

Esse documento trás em detalhes como vai funcionar a dinamica das ultimas missões do jogo após o retorno da cena [Cena 11](timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências). Respeitando uma experiência profunda em [narrativa sistemica](../../../../zord/pesquisas/narrativa-sistemica.md), worldbuilding sistêmico e estrutura convergente (final definido).

## Preparativos em [Gildrat](../2-world-building/racas/anoes/gildrat-v2.md)

Após retornar de Melios, Thorin traz a notícia de que os [Ignotos](../2-world-building/racas/raca-ignotos.md) estão prestes a atacar Gildrat e comunica seu pai, Thordan.
A fase de preparação tem início quando a missão “Quando o Segundo Sol Chegar” é ativada.

A partir desse momento, o jogador deve organizar as defesas da cidade utilizando os recursos reunidos durante o jogo.
A fase se encerra quando o jogador dorme ([Casa da Família Forja Prata](../2-world-building/locais/casa-da-família-forjaprata.md)), acionando a cutscene do segundo sol surgindo no céu.

### Gameplay

- O jogador deve resolver conflitos internos de Gildrat. Exemplo:
  - [Ajudar Borin em Kravens](timeline-historia-jogo-v5.md#13---kravens-aviso-e-a-força-do-sigmetal)
  - [Resgatar Kilin e Balastrus](timeline-historia-jogo-v5.md#12---melios-resgate-e-o-eco-do-selo)
  - Organizar defesa de Gildrat.
- Missão: [“Defender Gildrat”](timeline-historia-jogo-v5.md#14---defender-gildrat-clímax) é ativada após o jogador dormir.  
  - Antes de dormir, vai ter um save obrigatório. E o save é desabilitado durante a missão **“Defender Gildrat”**.
- Atividades:
  - [Quando o Segundo Sol Chegar](../../Quests/10-quando-segundo-sol-chegar/quando-segundo-sol-chegar.NSD.fluxo-cenas.md)

Notas para brainstorm:
Preciso pensar em mais atividades que o jogador pode fazer nessa fase 1.

### Impacto das decisões no gameplay

As escolhas determinam quais ajudas o jogador recebe nas fases seguintes e qual o desfecho de cada fase.

As seguintes variáveis inteiras serão usadas para compor o Índice de Preparação (`v_IP`), que medirá a prontidão e a força de Gildrat contra os Ignotos:

| Nome da Variável          | Domínio | Definição Diegética                                                                      | Condições de Mudança                                                                    | Efeitos Sistêmicos                                                                      |
| ------------------------- | ------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -
| `v_sigmetal_destino`      | 0–3     | O destino do primeiro Sigmetal encontrado. Reflete a prioridade do jogador.              | Definido na Cena 7c.                                                                    | Determina a disponibilidade de um recurso/arma de Sigmetal.         |
| `v_reforco_sigmetal`      | 0–1     | Dar Sigmetal para os anões ferreiros criar armas para os anões              | O Jogador deve pegar um carregamento de Sigmetal na sala que o [Cristaleão](timeline-historia-jogo-v5.md#6---minerador-aprendiz-a-queda-e-o-sigmetal) revelou depois de ser derrotado                                                                    | Equipa todos os exercitos com arma de Sigmetal         |
| `v_influencia_corvos`     | 0–5     | O nível de confiança e colaboração com os [Corvos](timeline-historia-jogo-v5.md#9---os-corvos-de-melios-o-selo-e-a-canção).                                        | Aumenta ao ajuda-los sair de [Melios](timeline-historia-jogo-v5.md#10---quebra-do-selo-em-melios-a-liberação-dos-ignotos) sem confronto.                   | Aumenta o exercito da milicia civil              |
| `v_resgate_melios`        | 0–3     | O sucesso da operação de resgate em [Melios](timeline-historia-jogo-v5.md#10---quebra-do-selo-em-melios-a-liberação-dos-ignotos).                                              | 0: Ninguém salvo. 1: Balastrus salvo. 2: Kilin Salvo. 3: Todos salvos.                  | Afeta a moral da Guarda de Ferro e a disponibilidade de escolha dos NPCs no time do Thorin na batalha final.                     |
| `v_resgate_kravens`        | 0–2     | O sucesso da operação de resgate em [Kravens](timeline-historia-jogo-v5.md#13---kravens-aviso-e-a-força-do-sigmetal).                                              | 0: Ninguém salvo. 1: Grupo de rebelde salvo. 2: Grupos de rebeldes                  | Afeta a quantidade do exercito de rebeldes.|
| `v_treinamento_rebeldes`        | 0–2     | O sucesso da operação de resgate em Kravens.                                              | 0: Sem treinamento. 1: Filena **OU** Mhordead treinam rebeldes. 2: Filena **E** Mhordred treinam os rebeldes                  | Afeta a qualidade do exercito de rebeldes.|
| `v_pai_filena`        | 0–1     | O sucesso da operação de resgatar Borin em Kravens.                                              | 0: Sem resgate. 1: Borin foi resgatado.                 | Afeta a moral do exercito de rebeldes.|
| `v_moral_gildrat`         | 0–9     | A moral e a esperança dos cidadãos de Gildrat.                                           | Aumenta com atos heroicos e comunicação; diminui com pânico e perdas.                   | Modula a eficácia de milícias corvos e a atmosfera da cidade.                           |
| `v_boa_vontade_thordan`   | 0–5     | O nível de respeito e entendimento entre Thorin e seu pai, Tordan.                        | Aumenta com diálogo respeitoso e atos alinhados à Guarda;         | Desbloqueia itens de família e do passado de Thordan            |
| `v_empatia_filena`        | 0–5     | A profundidade da conexão e confiança entre Thorin e Filena.                             | Aumenta ao apoiar Filena e suas causas.                                                 | Aprofunda o arco de relacionamento e pode desbloquear habilidades de combate em dupla. Libera final que Filena beija Thorin.  |
| `v_folego_time_runico`    | 0–3     | A prontidão do time de futebol rúnico para atuar como uma unidade de suporte.            | 0: Inativo. 1: Reunido. 2: Treinado. 3: Equipado.                                       | Adiciona uma habilidade de invocação que pode ser usada uma vez durante as batalhas.              |
| `v_preparo_militar`       | 0–9     | O nível de preparação tática e de recursos da Guarda de Ferro.                           | Aumenta ao ajudar na logística, completar missões de resgate e fortalecer defesas.      | Determina a força das linhas de frente e a disponibilidade de recursos na batalha final. |

### Matriz de Convergência por Fase

Notas de brainstorm:
Eu ainda não tenho nada que representa a soma das variaveis ou algo do tipo. Precisa? O que eu posso colocar de alteração?

### Inicio das mecanicas de fase

Depis da [Cena 11](timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências). Ao dormir, o jogador assiste à cutscene do segundo sol e o início da missão **“Defender Gildrat”**.  
A história corta para Rheed, que introduz a primeira fase (Fase 1 – Execução das Armadilhas).

---

## Defender Gildrat

### Fase 1 – Execução das Armadilhas

#### Introdução da Fase 1 na Noite da História com Rheed

Rheed conta a história que os Ignotos marcharam até a frente de Gildrat e estavam esperando a hora de atacar. O conselho se reúne para executar o plano das armadilhas. depois corta para cena de gameplay.

Notas de brainstorm:
Eu preciso de uma cena de filme, serie ou jogo para me inspirar a descrever essa cena.

#### Gameplay Fase 1

- Diálogo no **Conselho de Gildrat**:
  - Damburr pergunta sobre as armadilhas.
  - Balastrus (se presente): confirma **armadilhas de dinamite**.
  - Thordan (se Balastrus ausente): confirma **armadilhas**.
- Discussão cômica sobre quem será a **isca**:
  > “Precisamos de alguém bem chato que atraia a atenção deles. Para as armadilhas”
- Cena de humor cinematográfico: a câmera percorre todos os presentes e foca no escolhido.
- **Escolha automática da isca (ordem de eficiência):**
  1. Sáparo Boca-de-Corneta (se recrutado)  
  2. Tusk (padrão)
- Cena no mapa do distrito comercial externo (visão topdown):
  - Exército dos Ignotos posicionado em frente ao castelo.
  - 7 Ignotos gigantes estão prontos para avançar rumo a entrada do castelo.
  - O portão de Gildrat se abre e a isca sai sozinha.
  - Diálogo cômico entre a isca e o General Ignoto.
  - Os 7 Ignotos gigantes corre atrás da isca em direção às armadilhas.

#### Impacto das decisões da Fase 1 no gameplay

| Isca escolhida                    | Resultado das armadilhas |
|----------------------------------|---------------------------|
| Sáparo Boca-de-Corneta           | Funcionam 100%            |
| Tusk                             | Portão se abre, mas ninguém sai |

Esses resultados influenciam a fase 2:

- Próxima fase vai iniciar com 7 blocos de tropa de ignoto que o jogador vai ter que derrotar Antes de poder lutar com o Boss, que é o General Ignoto Mas se as armadilhas funcionarem, então esse número cai para 5 combates.

#### Desfecho da Fase 1

- Isca corre de volta ao castelo.  
- Armadilhas são ativadas.  
- Cena final cômica: os 7 Ignotos gigantes correndo atrás da isca.  
- Mesmo que dê tudo certo certo com as armadulhas, vai ter uma cutscene onde o General Ignoto vai parar a explosão das ultimas dinamites, que ficam perto da muralha de Gildrat, com um campo de magia. Forçando o começo da proxima fase.
- Corta para Rheed, retomando a Noite da História.

---

### Fase 2 – Execução dos Exércitos

#### Introdução da Fase 2 na Noite da História com Rheed

Após as armadilhas, e a intervenção do General Ignoto, Rheed narra o início da batalha principal entre os exércitos de Gildrat e os Ignotos.

Ao final o jogador tem que escolher qual vai ser os 4 jogadores que ele vai levar para batalha final

Nota de brainstorm:
O que o Rheed pode falar aqui para dar inicio a cena de gameplay? O que ele falaria para instigar o jogador a jogar a proxima fase?

#### Gameplay Fase 2

- Retorno à visão topdown.  
- Portões de Gildrat se abrem e **os exércitos saem para lutar**:
  - **Exército dos Guardas de Ferro (centro)** — líder Thordan.  
  - **Exército dos Rebeldes (direita)** — Borin lidera os rebeldes (se resgatado).  
  - **Exército dos Corvos (esqurda)** — líder dos Corvos (se recrutado)
  - **Grupo de Thorin (logo atrás).**
- Diálogo entre o **[General Ignoto](../2-world-building/racas/raca-ignotos.md)** e **Thordan**.  
- Após o diálogo, um video do confronto: ambos os exércitos se enfrentando, seguido de um clarão.
- Gameplay: o jogador deve derrotar **os Ignotos gigantes e seus lacaios** e, ao final, o **General Ignoto**.

A batalha com cada um dos grupos serão divida em 2 fases.
A primera fase são só lacaios Ignotos.
A segunda fase são lacaios + Ignoto gante

#### Impacto das decisões no gameplay da Fase 2

Variações já definidas:

- Para cada uma das batalhas o jogador ganha uma habilidade de "invocar exercito" que da dano em area em todos os inimigos.
- Os exercitos são:
- [Exército dos Guardas de Ferro](../2-world-building/racas/anoes/gildrat-v2.md#força-militar) (v_preparo_militar, v_resgate_melios)
  - Exército dos Rebeldes (v_resgate_kravens, v_treinamento_rebeldes, v_pai_filena)
  - Exército dos Corvos (v_influencia_corvos)

O dano das invocações varia de acorco com o valor das variaveis.
Algumas variaveis aferam o dano de todos os exercitos:

- v_reforco_sigmetal
- v_moral_gildrat

Notas de Brainstorm:
Como calcular o dano das invocações?

#### Desfecho da Fase 2

Assim que o time de Thorin derrota o **General Ignoto**, Aparece uma cutscene onde o **General Ignoto** destroi, com a armadilha de dinamite que não detonou, toda a frente da fortaleza de Gildrat e ordena que todos os ignotos entrem no castelo. Thorin nessa hora é forçado a usar seu poder e invocar um espírito que invoca meteoros para acabar com o ataque.

- Corta novamente para Rheed, preparando a história final.

Notas de brainstorm:
Mhordred precisa morrer para salvar alguém ou alguma coisa (Talvez colocar a decisão de quem ele vai salvar fica a escolha do jogador)

Pode ter alguma variação onde é o próprio Thorin que destroi a frente de Gildrat com os meteoros.

---

### Fase 3 – Último Boss

#### Introdução da Fase 3 se na Noite da História com Rheed

Rheed narra o funcionamento do [Reino da Mana](../2-world-building/magia.md#reino-da-mana-sonhos--espíritos) e da [Barreira](../2-world-building/magia.md#barreira-entre-mundos), em tom de história de terror.

#### Gameplay Fase 3

- Cena retorna ao [**Distrito Comercial Externo**](../2-world-building/racas/anoes/gildrat-v2.md#distritos).  No formato topdown com diálogos.
- Luta por turno contra o ultimo boss.

#### Desfecho da fase

Thorin desmaia depois de usar seu poder onírico.
Devido a guerra e a destruição, a Barreira está muito fina no Distrito Comercial Externo. O Profeta das sombras aproveita esse momento para possuir Thorin.

Thorin se transforma no ultimo boss. Thorin possuido pelo poder do [Profeta das Sombras](../2-world-building/magia.md#proibições-e-tabus) Começa a batalha final.

Atraído pela mana, o **Profeta das Sombras** possui parcialmente Thorin, criando uma **Casca onírica** — um chefe colossal de vidro-sombra com Thorin adormecido em seu centro. O objetivo da luta é purificar Thorin sem matá-lo.

O jogo termina com o grupo salvando Thorin do boss casca.

Com a Casca dissipada, Thorin acorda. A cena termina em um momento de lamento silencioso, com Tordan observando de longe e Filena ao lado do herói.

Notas de brainstorm:
Dialogo depois de derrotar o boss e salvar Thorin ainda está a definir.
Fechos Convergentes:
Eu preciso pensar em finais diferentes de acordo com a soma das variaveis em `### Impacto das decisões no gameplay`

- Final A
- Final B
- Final C

Eu preciso levar em consideração também as `## Notas proximo jogo`

## Pós-créditos: O Despertar**  

Ilustrações + Texto mostram que
No final, Filena e Borin vão estar jogando ao lado de Thorin na final do campeonato.
(O Fantasma de Mhordred aparece na torcida, mas é um easteregg)

(Colocar mais cenas pós creditos de cada um dos personagens. A cena pós credito é somente uma imagem)

Thorin vai dormir em seu quarto. A cena esvanece para branco, fica somente a cama dele ainda colorida, a camera se aproxima de Thorin e então ele abre um olho. Em um contraplano, no horizonte, a silhueta do verdadeiro **Profeta das Sombras** o observa e um exército imenso de Ignotos aparece na frente dele. Um único sussurro dissonante é ouvido. **Corte seco.**

## Notas proximo jogo

Esse jogo é o primeiro de uma trilogia de jogos.
[A História completa dos 3 jogos](historia-de-daratrine.md)

No proximo jogo vai contecer:

- Um dos guardas vai virar fantasma e o Thorin vai passar o jogo todo conversando com ele.
- Gildrat vai cair de qualquer jeito nos proximos jogos, mesmo que ela seja salva nesse jogo.
- Thorin vai fugir de Gildrat para pedir ajuda para os Elfos no proximo jogo
- No proximo jogo Thorin vai ser julgado pelo concelho dos Anões por ter usado Magia.
