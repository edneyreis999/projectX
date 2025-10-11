# A ultima missão do Jogo

Esse documento trás em detalhes como vai funcionar a dinamica das ultimas missões do jogo após o retorno da cena [Cena 11](timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências). Respeitando uma experiência profunda em narrativa emergente, worldbuilding sistêmico e estrutura convergente (final definido).

## Fase 1 – Preparativos em Gildrat

### Introdução da fase na Noite da História com Rheed

Essa fase se inicia logo depois de o jogador voltar de Melios com a noticia que os Ignotos estão prestes a atacar Gildrat. Thorin precisa preparar as defesas com os recursos reunidos durante o jogo.
Essa fase se encerra quando o jogador dorme e aparece a cutscene do segundo sol chegando no céu.

### Gameplay

- O jogador deve resolver conflitos internos de Gildrat. Exemplo:
  - [Ajudar pai da Filena em Kravens](timeline-historia-jogo-v5.md#13---kravens-aviso-e-a-força-do-sigmetal)
  - [Resgatar Kilin, Tharok e Balastrus](timeline-historia-jogo-v5.md#12---melios-resgate-e-o-eco-do-selo)
  - Organizar defesa de Gildrat.
- Missão: **“Defender Gildrat”** é ativada após o jogador dormir.  
  - Antes de dormir, vai ter um save obrigatório. E o save é desabilitado durante a missão **“Defender Gildrat”**.
- Atividades:
  - [Quests para organizar defesa de Gildrat](../../Quests/10-quando-segundo-sol-chegar/quando-segundo-sol-chegar.NSD.fluxo-cenas.md)

Notas para brainstorm:
Preciso pensar em mais atividades que o jogador pode fazer nessa fase 1.
Tem por exemplo o Kilin e o Balastrus que podem ser salvos em Melios.
Tem alguma mini quest com Thordan?
Tem alguma miniquest com Filena? Talvez envolve-la na quest para recrutar o time de futebol runico?
Qual impacto do "Sigmetal destino"?
Tem Alguma miniquest com os Corvos? Qual? Qual efeito nas fases seguintes?

### Impacto das decisões no gameplay

As escolhas determinam quais ajudas o jogador recebe nas fases seguintes e qual o desfecho de cada fase.

As seguintes variáveis inteiras serão usadas para compor o Índice de Preparação (`v_IP`), que medirá a prontidão e a força de Gildrat contra os Ignotos:

| Nome da Variável          | Domínio | Definição Diegética                                                                      | Condições de Mudança                                                                    | Efeitos Sistêmicos                                                                      |
| ------------------------- | ------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------
| `v_sigmetal_destino`      | 0–3     | O destino do primeiro Sigmetal encontrado. Reflete a prioridade do jogador.              | Definido na Cena 7c.                                                                    | Determina a disponibilidade de um recurso/arma de Sigmetal.         |
| `v_influencia_corvos`     | 0–5     | O nível de confiança e colaboração com os Corvos.                                        | Aumenta ao ajuda-los sair de Melios sem confronto.                   | Aumenta o exercito da milicia civil              |
| `v_resgate_melios`        | 0–3     | O sucesso da operação de resgate em Melios.                                              | 0: Ninguém salvo. 1: Balastrus salvo. 2: Kilin Salvo 4: Tharok salvo. 5: Todos salvos.                  | Afeta a moral da Guarda de Ferro e a disponibilidade de escolha dos NPCs no time do Thorin na batalha final.                     |
| `v_moral_gildrat`         | 0–9     | A moral e a esperança dos cidadãos de Gildrat.                                           | Aumenta com atos heroicos e comunicação; diminui com pânico e perdas.                   | Modula a eficácia de milícias civis e a atmosfera da cidade.                           |
| `v_boa_vontade_thordan`   | 0–5     | O nível de respeito e entendimento entre Thorin e seu pai, Tordan.                        | Aumenta com diálogo respeitoso e atos alinhados à Guarda;         | Desbloqueia itens de família e do passado de Thordan            |
| `v_empatia_filena`        | 0–5     | A profundidade da conexão e confiança entre Thorin e Filena.                             | Aumenta ao apoiar Filena e suas causas.                                                 | Aprofunda o arco de relacionamento e pode desbloquear habilidades de combate em dupla. Libera final que Filena beija Thorin.  |
| `v_folego_time_runico`    | 0–3     | A prontidão do time de futebol rúnico para atuar como uma unidade de suporte.            | 0: Inativo. 1: Reunido. 2: Treinado. 3: Equipado.                                       | Adiciona uma habilidade de invocação que pode ser usada uma vez durante as batalhas.              |
| `v_preparo_militar`       | 0–9     | O nível de preparação tática e de recursos da Guarda de Ferro.                           | Aumenta ao ajudar na logística, completar missões de resgate e fortalecer defesas.      | Determina a força das linhas de frente e a disponibilidade de recursos na batalha final. |

### Desfecho da fase

Ao dormir, o jogador assiste à cutscene do segundo sol e o início da missão **“Defender Gildrat”**.  
A história corta para Rheed, que introduz a próxima fase.

---

## Fase 2 – Execução das Armadilhas

### Introdução da fase na Noite da História com Rheed

Rheed apresenta o início da defesa de Gildrat. O conselho se reúne para executar o plano das armadilhas.

### Gameplay

- Diálogo no **Conselho de Gildrat**:
  - Damburr pergunta sobre as armadilhas.
  - Balastrus (se presente): confirma **armadilhas de dinamite**.
  - Líder dos Corvos (se Balastrus ausente): confirma **armadilhas rudimentares**.
- Discussão cômica sobre quem será a **isca**:
  > “Precisamos de alguém bem chato que atraia a atenção deles.”
- Cena de humor cinematográfico: a câmera percorre todos os presentes e foca no escolhido.
- **Escolha automática da isca (ordem de eficiência):**
  1. Saparo Boca-de-Corneta (se recrutado)  
  2. Time de Futebol Rúnico de Thorin (se recrutado)  
  3. Tusk (padrão)
- Cena no mapa (visão topdown):
  - Exército dos Ignotos posicionado em frente ao castelo.
  - O portão de Gildrat se abre e a isca sai sozinha.
  - Diálogo cômico entre a isca e o General Ignoto.
  - O exército ignoto corre atrás da isca em direção às armadilhas.

### Impacto das decisões no gameplay

| Isca escolhida                    | Resultado das armadilhas |
|----------------------------------|---------------------------|
| Saparo Boca-de-Corneta           | Funcionam 100%            |
| Time de Futebol Rúnico de Thorin | Funcionam 50%             |
| Tusk                             | Portão se abre, mas ninguém sai |

Esses resultados influenciam:

- A eficácia das defesas.
- O número de inimigos restantes.
- Variações nas cutscenes seguintes.

### Desfecho da fase

- Isca corre de volta ao castelo.  
- Armadilhas são ativadas.  
- Cena final cômica: exército dos Ignotos correndo atrás da isca.  
- Mesmo que dê tudo certo certo com as armadulhas, vai ter uma cutscene onde o geral Ignoto vai parar a explosão das ultimas dinamites com um campo de magia. Forçando o começo da proxima fase.
- Corta para Rheed, retomando a Noite da História.

---

## Fase 3 – Execução dos Exércitos

### Introdução da fase na Noite da História com Rheed

Após as armadilhas, e a intervenáo do General Ignoto, Rheed narra o início da batalha principal entre os exércitos de Gildrat e os Ignotos.

### Gameplay

- Retorno à visão topdown.  
- Portões de Gildrat se abrem e **os exércitos saem para lutar**:
  - **Exército dos Guardas de Ferro (esquerda)** — líder variável.  
  - **Exército dos Rebeldes (direita)** — líder variável.  
  - **Grupo de Thorin (centro).**
- Diálogo entre o **General Ignoto** e **Thordan**.  
- Após o diálogo, imagem do confronto: ambos os exércitos se enfrentando, seguido de um clarão.
- Gameplay: o jogador deve derrotar **cinco grupos de Ignotos** e, ao final, o **General Ignoto**.

### Impacto das decisões no gameplay

Ainda indefinido. Possibilidades:

- Tamanho, liderança ou armamento dos exércitos influenciam a luta.  
- Pode alterar a dificuldade ou o tipo de desfecho (cutscene).  
- Evitar que escolhas anteriores tornem o jogo impossível de concluir. Exemplo: alterar a dificuldade de modo que fique impossível o jogador vencer a luta.  

### Desfecho da fase

- **Os anões de Gildrat** veem Thorin usar seu poder onírico e derrota o General Ignoto.  
- Corta novamente para Rheed, preparando a história final.
- Mhordred precisa morrer para salvar alguém (Talvez colocar a decisão de quem ele vai salvar fica a escolha do jogador)

---

## Fase 4 – Último Boss

### Introdução da fase na Noite da História com Rheed

Rheed narra o funcionamento do **Reino da Mana** e da **Barreira**, em tom de história de terror.

### Gameplay

- Cena retorna ao **Distrito Comercial Externo**.  No formato topdown com diálogos.
- Luta por turno contra o ultimo boss.

### Desfecho da fase

O grupo de Thorin tenta acordá-lo após o uso de seu poder onírico.
Alguns dialogos, animações e etc.
Após o Dialogo, Thorin se transforma no ultimo boss. (Thorin possuido pelo poder do Profeta das Sombras) Começa a batalha final.
O jogo termina com o grupo salvando Thorin do boss casca.

Com a Casca dissipada, Thorin acorda. A cena termina em um momento de lamento silencioso, com Tordan observando de longe e Filena ao lado do herói.

(Dialogo depois de derrotar o boss e salvar Thorin ainda está a definir.)

**Pós-créditos: O Despertar**  
Ilustrações + Texto mostram que
Dias depois, Thorin está jogando Runico em um campeonato junto da Filena. Seu pai está na torcida.
(O Fantasma de Mhordred aparece na torcida, mas é um easteregg)

(Colocar mais cenas pós creditos de cada um dos personagens. A cena pós credito é somente uma imagem)

Thorin vai dormir em seu quarto. A cena esvanece para branco, fica somente a cama dele ainda colorida, a camera se aproxima de Thorin e então ele abre um olho. Em um contraplano, no horizonte, a silhueta do verdadeiro **Profeta das Sombras** o observa e um exército imenso de Ignotos aparece na frente dele. Um único sussurro dissonante é ouvido. **Corte seco.**
