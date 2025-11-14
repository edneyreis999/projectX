# Atividades Quando segundo sol chegar

Quests que o jogador pode fazer para ajudar nos preparativos da defesa de Gildrat.

## Destino Sigmetal

## Mini-quests em Gildrat

### Ajudar na Forja**

- **Beats Narrativos:**
    1. Thorin passa pelo distrito das forjas e vê ferreiros sobrecarregados.
    2. Um mestre-ferreiro (NPC genérico) reclama da falta de braços para operar os foles.
    3. O jogador participa de um mini-game rítmico simples para operar os foles.
    4. Com o fogo mais forte, os ferreiros conseguem forjar um lote extra de armas e armaduras.
    5. O mestre-ferreiro agradece e comenta que, se tivessem Sigmetal, o resultado poderia ser mais eficaz.
- **Custos/Requisitos:** Baixo. Reutiliza a área das forjas de Gildrat e NPCs de ferreiros. O mini-game pode ser uma simples sequência de botões.
- **Efeitos em Variáveis:**
  - `v_preparo_militar` **+1** (Pelas pontas de flecha extras)
  - `v_moral_gildrat` **+1** (Por ajudar no esforço de guerra)
- **Convergência:** A atividade é autocontida. O diálogo do ferreiro serve como dica para a importância do Sigmetal.
- **Teaser:** "Cada lâmina conta. Mas contra o que estamos lutando? Nem os generais parecem saber."

### Acalmar os Civis na Praça**

- **Beats Narrativos:**
    1. Na praça central, um grupo de civis está aglomerado em pânico, espalhando rumores.
    2. Um guarda (NPC genérico) tenta acalmá-los, sem sucesso.
    3. Thorin pode intervir. O jogador escolhe uma abordagem de diálogo:
        - **Honesta:** "A situação é séria, mas a Guarda de Ferro está se preparando."
        - **Inspiradora:** "Somos anões! Já enfrentamos coisa pior nas profundezas!"
        - **Pragmática:** "Pânico só vai atrapalhar. Voltem para suas casas e tranquem as portas."
    4. Dependendo da escolha, o grupo se dispersa mais ou menos calmo.
- **Custos/Requisitos:** Mínimo. Apenas diálogos e NPCs genéricos na praça de Gildrat.
- **Efeitos em Variáveis:**
  - Escolha Inspiradora: `v_moral_gildrat` **+2**
  - Escolha Honesta: `v_moral_gildrat` **+1**
  - Escolha Pragmática: `v_moral_gildrat` **-1** (aumenta o medo, mas a praça fica livre)
- **Convergência:** A cena termina com o guarda agradecendo Thorin. O estado da `v_moral_gildrat` influenciará eventos posteriores.
- **Teaser:** "É o caos. Se não confiarem nos guardas, em quem vão confiar?"

### Patrulha com a Guarda**

- **Beats Narrativos:**
    1. Thorin encontra um pequeno esquadrão de guardas se preparando para uma patrulha no Distrito Residencial.
    2. O líder da patrulha (NPC genérico) está nervoso. Ele menciona que é a primeira patrulha dele desde que "as sombras foram vistas em Melios".
    3. Thorin pode se oferecer para acompanhá-los.
    4. A patrulha é uma curta caminhada com diálogos sobre o medo e o dever.
    5. Um barulho suspeito leva a um beco, mas é apenas um um civil assustado. A forma como Thorin reage (com calma ou agressividade) afeta o jovem líder.
- **Custos/Requisitos:** Baixo. Reutiliza o mapa do Distrito Residencial e NPCs de guardas.
- **Efeitos em Variáveis:**
  - Escolha calma: `v_preparo_militar` **+1** (A patrulha bem-sucedida aumenta a segurança percebida)
  - Escolha ?: `v_...`
  - Escolha ?: `v_...`
- **Convergência:** A patrulha termina e os guardas retornam ao seu posto, mais confiantes.
- **Teaser:** "O medo é o verdadeiro inimigo. Ele se esconde em cada sombra."

## Resgate em Melios

Nota de brainstorm:

Como pode ser a dinamica dessa missão? Em qual missão de qual jogo posso me inspirar?

O jogador já passou pela Mina de Melios uma vez na [Cena 10](../../GDD/3-historia/timeline-historia-jogo-v5.md#10---quebra-do-selo-em-melios-a-liberação-dos-ignotos).
Thorin discute com o pai e o concelho para ir nessa missão [Cena 11](../../GDD/3-historia/timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências).
Um pouco mais de detalhes:
[Cena 12](../../GDD/3-historia/timeline-historia-jogo-v5.md#12---melios-resgate-e-o-eco-do-selo)

 Tem 2 personagens para resgarar:

- Kilin
- Balastrus

Eu queria algo que não fosse tão simples salvar os 3. Mas ao mesmo tempo, tem as limitações do RPG Maker.
Talvez deixar escondido durante a narrativa um "truque" que se o jogador usar ele consegue resgatar os 3. Nesse caso, precisariamos dar várias dicas durante a missão de qual é esse truque que o jogador pode usar para salvar os 3.
Caso contratio ele salva 1 ou 2 personagens só.

## Conexão com Thordan

### O Troféu Quebrado**

- **Beats Narrativos:**
    1. Thorin encontra Tordan na cozinha, o mesmo local da discussão na Cena 3.
    2. O antigo troféu de futebol rúnico de Tordan está sobre a mesa, e ele o encara em silêncio.
    3. Thorin pode iniciar uma conversa sobre o passado.
    4. A conversa pode levar a uma confissão rara de Tordan sobre por que ele abandonou o esporte pela pressão de seu próprio pai.
    5. O resultado depende da empatia de Thorin.
- **Custos/Requisitos:** Mínimo. Reutiliza a cozinha da Casa Forja-Prata.
- **Efeitos em Variáveis:**
  - Se Thorin for empático: `v_boa_vontade_thordan` **+2**, `v_empatia_filena` **+1** (se Thorin mencionar Filena e o esporte)
  - Se Thorin for acusatório: `v_boa_vontade_thordan` **-1**
- **Convergência:** Um momento raro de conexão (ou mais atrito) entre pai e filho.
- **Teaser:** Tordan: "Houve um tempo em que tudo que importava era o próximo gol. O mundo era mais simples."

## Conexão com Filena

### Recrutando os Batedores**

- **Beats Narrativos:**
    1. Thorin encontra Filena perto do Estádio dos Machados Enferrujados.
    2. Ela teve a ideia de usar a agilidade e coordenação do time de futebol para criar uma unidade de batedores.
    3. Ela pede a Thorin para ajudá-la a convencer 3 ex-jogadores (NPCs genéricos em diferentes partes da cidade).
    4. Cada "recrutamento" é um pequeno desafio de diálogo. Um tem medo, outro acha a ideia ridícula, o terceiro aceita na hora.
    5. Uma vez reunidos, Filena os condiz para o campo de treinamento dos rebeldes.
- **Custos/Requisitos:** Baixo. Apenas diálogos e movimentação pela cidade.
- **Efeitos em Variáveis:**
  - `v_folego_time_runico` = **+1** (Reunido)
  - `v_empatia_filena` **+2**
  - `v_preparo_militar` **+1** (Uma nova unidade de suporte está disponível)
- **Convergência:** O time está pronto e aparecerá como NPCs aliados em certas partes da defesa de Gildrat.
- **Teaser:** Filena: "Eles não são soldados. Mas sabem como se esquivar e correr. Às vezes, isso é o suficiente."

### A Jogada Ensaiada**

- **Beats Narrativos:**
    1. Filena está preocupada com a falta de poder de fogo de Thorin.
    2. Ela o leva para um campo de futebol runico.
    3. "Lembre-se da semifinal? Vamos treinar uma nova versão daquela jogada."
    4. Ela ensina a Thorin uma nova habilidade de combate que combina o disparo rúnico dele com um movimento de flanqueio dela (uma habilidade de dupla).
    5. O jogador pratica a habilidade em alguns alvos de treinamento.
- **Custos/Requisitos:** Médio. Requer a implementação de uma nova habilidade de combate.
- **Efeitos em Variáveis:**
  - `v_empatia_filena` **+2**
  - **Desbloqueia a habilidade "Disparo em Tabela".**
- **Convergência:** A habilidade fica permanentemente disponível para o jogador quando Filena está na party.
- **Teaser:** Filena: "Na guerra, assim como no campo, você precisa confiar no seu parceiro."

### O Uniforme da Sorte**

- **Beats Narrativos:**
    1. Filena está triste, olhando para o estádio vazio. Ela fala sobre a importância cultural do time.
    2. Ela sugere que, para levantar a moral, eles deveriam criar "uniformes de batalha" para o time de batedores.
    3. A quest envolve coletar materiais simples de diferentes lojas (reutilizadas) em Gildrat: tecido resistente de um alfaiate, pigmento azul de um alquimista.
    4. Com os materiais, eles criam os uniformes (cutscene).
    5. Ver o time uniformizado aumenta a moral de todos.
- **Custos/Requisitos:** Baixo. Uma "fetch quest" simples. Pode gerar uma skin alternativa para os NPCs do time.
- **Efeitos em Variáveis:**
  - `v_folego_time_runico` = **3** (Equipado)
  - `v_moral_gildrat` **+1**
  - `v_empatia_filena` **+1**
- **Convergência:** O time agora tem uma aparência distinta, reforçando visualmente a escolha do jogador.
- **Teaser:** Um dos jogadores: "Se vamos morrer, pelo menos vamos morrer com as cores do nosso time."

Notas de brainstorm:
Falta uma missão para Trinar o time de futebol runico e/ou rebeldes.

## Impacto Sigmetal destino

**Manifestação para `v_sigmetal_destino = 0` (Guardado para Si)**

- **Evento:** O jogador tem o Sigmetal em seu inventário desde o início da Fase 1.
- **Descrição:** Ele pode levar o metal a um ferreiro no centro de Gildrat para criar uma **Munição de Sigmetal personalizada**.
- **Custos/Requisitos:** Médio. Requer um novo item de arma.
- **Efeitos:** `v_preparo_militar` **+1**. O jogador ganha uma munição poderosa.

**Manifestação para `v_sigmetal_destino = 1` (Entregue a Balastrus)**

Notas de brainstorm:
O Sigmetal com Balastrus pode ajudar de alguma forma a salvar Balastrus e Kilin
E quando o jogador terminar o resgate, Balastrus entrega a Thorin um **"Protetor de Braço de Sigmetal"**.

**Manifestação para `v_sigmetal_destino = 2` (Entregue a Tusk)**
Notas de brainstorm:
Ainda não sei o que fazer. Ajudar de alguma forma no resgate de Melios se Tusk estiver no grupo?

**Manifestação para `v_sigmetal_destino = 3` (Guardado no Baú)**
Notas de brainstorm:
Ainda não sei o que fazer.

## Envolvimento dos Corvos

### A Oferta Secreta**

- **Beats Narrativos:**
    1. Um NPC encapuzado (um Corvo) aborda Thorin em um beco.
    2. Ele se apresenta como um mensageiro dos Corvos. Ele diz: "Nós também ouvimos a canção do fim. A Guarda de Ferro não pode vencer sozinha."

Notas de brainstorm:
A partir daqui eu não sei o que fazer. sei que se o Thorin fizer alguma coisa que o Corvo pedir, ele ganha v_influencia_corvos

### A Canção Ancestral**

- **Beats Narrativos:**
    1. Se o jogador ajudou os Corvos, o mensageiro retorna.
    2. "Você nos respeitou. Agora, ouça."
    3. Ele ensina ao Sáparo-Boca-de-Corneta uma "canção" ancestral — na verdade, uma frequência sônica que desorienta os Ignotos.
    4. Isso se traduz em uma nova habilidade de "debuff" para o Sáparo, que ele pode usar em área.
- **Custos/Requisitos:** Médio. Requer a implementação de uma nova habilidade.
- **Efeitos em Variáveis:**
  - `v_influencia_corvos` **+2**
  - **Desbloqueia a habilidade "Canção do Desvanecer".**
- **Convergência:** A habilidade dá ao jogador uma nova ferramenta tática para a batalha final.
- **Teaser:** O Corvo: "Eles vieram da dissonância. Devolva-os a ela."
- **pré-requisito:**  **Sáparo-Boca-de-Corneta** no grupo.
