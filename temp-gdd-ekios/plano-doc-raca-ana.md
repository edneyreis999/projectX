# Plano de Documentação: Anões e Gildrat

## 1. Análise Inicial

### Documento `raca-anaos.md`

O documento atual é um bom ponto de partida, mas foca excessivamente na queda de Gildrat e na reação dos anões ao evento. Faltam detalhes sobre a sociedade anã *antes* da queda, sua estrutura de castas, a relação com a magia, e a economia baseada em mineração. A história da quebra do selo de Melios está presente, mas pode ser enriquecida com o contexto político que levou a essa decisão.

### Documento `gildrat.md`

Este documento é esquelético. Apresenta uma lista de fatos sobre a cidade (população, distritos, economia), mas carece de uma descrição narrativa que conecte esses elementos. Não há informações sobre a vida na cidade, a importância cultural de seus monumentos, ou como a estrutura social de castas se manifestava no dia a dia. A história da cidade antes e depois da queda dos Ignotos não está detalhada.

## 2. Análise dos Documentos Auxiliares

Os documentos de `frontend/docs/GDD/2-world-building` e `frontend/docs/Quests` são ricos em detalhes que podem preencher as lacunas dos documentos de destino.

- **`magia.md`**: Esclarece a visão dos anões sobre a magia: um misto de temor e pragmatismo. A existência de leis anti-magia e a dependência de rituais élficos de "severança" são informações cruciais para adicionar ao documento `raca-anaos.md`.
- **`o-continente-de-ekios.md`**: Fornece a linha do tempo da queda de Gildrat e a fundação de Daratrine. Detalha a tensão histórica entre anões e elfos, baseada em suas visões opostas sobre magia, o que é fundamental para a seção de "Interações com Outras Raças". A influência do Profeta das Sombras sobre o Imperador Damburr para quebrar o selo de Melios adiciona uma camada de intriga política à história anã.
- **Documentos de Quests (`1- noite-da-historia` a `8 - a-voz-do-conselho`)**: Estes documentos são a principal fonte de informação sobre o cotidiano, economia e sociedade.
  - A jornada de Thorin de jogador de "futebol rúnico" a aprendiz de minerador forçado pelo pai, o General Tordan, ilustra a rígida estrutura social e a pressão familiar.
  - A missão "Minerador Aprendiz" e a menção às minas de Kravens e Melios fornecem a base para detalhar a economia de mineração. A distinção entre minas pacificadas e selvagens, os riscos, e a estrutura das expedições podem ser extraídos desses contextos.
    - Expedições são eventos nos quais grupos anões se juntam para explorar minas em busca de metais preciosos. Existem dois tipos de minas para onde esses grupos são mandados, as pacificadas, onde a maioria das criaturas que ali habitavam foram mortas ou não apresentam perigo, e as minas selvagens, que são perigosas e geralmente produzem maior quantidade e qualidade de metáis raros.

    Mesmo em excursões por minas pacificadas o risco é altissimo, pois além de ataques surpresas ou emboscadas preparadas por outros grupos, sempre há o risco de não haver minérios para serem extraídos.

    Expedições a minas Selvagens são geralmente feitas usando grupo de elite de anões para proteção e especialistas para indicar o caminho, além dos mestres em mineração responsáveis por extrair o produto final. O custo para exploração varia de acordo com o contrato. Não é incomum grupos inteiros nunca voltarem de uma dessas expedições, mesmo os que se julgavam bem preparados.
  - A aparição de Balastros e Tusk, e a forma como organizam as expedições, revelam a hierarquia e o pragmatismo da cultura de mineração.
  - A acusação de Filena no conselho de Damburr e a subsequente rebelião mostram as tensões sociais e a escassez de recursos que afligem o império, contexto que pode ser adicionado à história de Gildrat.

## 3. Plano de Alteração (Tasks)

**Instrução geral:** Para cada alteração (Anões e Gildrat), crie uma nova versão do arquivo (ex: `raca-anaos-v2.md`) copiando o conteúdo original e aplicando as mudanças descritas.

---

### Tarefas para `raca-anaos.md`

#### **Task 1: Detalhar a Sociedade e Cultura Pré-Queda**

- **Tópico:** Cultura
- **Fonte:** `o-continente-de-ekios.md`, Quests `Fim de Jogo` e `É Hora de Crescer`.
- **Alteração no destino:**
  - Expandir o parágrafo sobre o sistema de castas. Descrever que, mesmo antes da queda, a sociedade anã era rigidamente estratificada. O status de uma família era mais valorizado do que a riqueza recém-adquirida. Use o conflito entre Thorin e seu pai, Tordan, como exemplo da pressão para seguir um caminho "honrado" (militar ou de mineração) em vez de paixões pessoais como o esporte, que era visto como algo para as "classes baixas".
  - Adicionar um novo subtópico: **"Visão sobre a Magia"**.
    - **Fonte:** `magia.md`, `o-continente-de-ekios.md`.
    - **Alteração:** Explicar que os anões sempre viram a magia com desconfiança e medo, principalmente por pavor da possessão espiritual. Detalhar que, historicamente, Gildrat mantinha leis severas contra o uso de magia e chegava a contratar elfos para realizar rituais de "severança", que removiam a conexão de um indivíduo com o Reino da Mana. Isso gerava atritos com os elfos de Arcaror, que consideravam a prática uma mutilação. [ver mais...](frontend/docs/GDD/2-world-building/magia.md#variações-culturais-e-regionais).

#### **Task 2: Enriquecer a Economia de Mineração**

- **Tópico:** Cultura (expandir a parte de mineração)
- **Fonte:** Quests `Minerador Aprendiz` e `Primeiro Contrato`.
- **Alteração no destino:**
  - Substituir a menção genérica à mineração por um novo subtópico: **"A Economia das Profundezas"**.
  - Descrever a economia anã como sendo centrada em expedições de mineração, que eram empreendimentos de alto risco e alto custo.
  - Explicar a diferença fundamental entre **Minas Pacificadas**, que eram rotas seguras e controladas pelo império, e as **Minas Selvagens**, territórios desconhecidos e perigosos.
  - Detalhar a estrutura de uma expedição típica, liderada por especialistas como Tusk e financiada por figuras como Balastros. Mencionar que essas expedições incluíam grupos de elite, mestres em mineração e guardas, e que a taxa de mortalidade, especialmente nas minas selvagens, era altíssima.

#### **Task 3: Aprofundar a História da Quebra do Selo**

- **Tópico:** História
- **Fonte:** `o-continente-de-ekios.md`, `raca-ignotos.md`.
- **Alteração no destino:**
  - Reescrever o parágrafo sobre a quebra do selo de Melios. Em vez de um ato de pura ambição, descreva-o como o resultado de manipulação política.
  - Explicar que o Imperador Damburr foi sutilmente influenciado pelo **Profeta das Sombras**, o líder dos Ignotos, que usou projeções oníricas para atiçar a ganância do imperador e convencê-lo a explorar Melios. A ordem para destruir o bloco de ferro foi dada a Balastros, que utilizou seus conhecimentos em explosivos, ignorando as canções e alertas antigos sobre a santidade do local. [ver mais...](frontend/docs/GDD/2-world-building/o-continente-de-ekios.md#s2-história-e-linha-do-tempo).

---

### Tarefas para `gildrat.md`

#### **Task 4: Descrever a Vida e a Sociedade em Gildrat**

- **Tópico:** Adicionar uma nova seção de introdução e expandir "Características Culturais".
- **Fonte:** `gildrat.md` (original), `raca-anaos.md`, Quest `A Semifinal`.
- **Alteração no destino:**
  - Adicionar um parágrafo de abertura que descreva Gildrat como uma cidade-império esculpida no coração de uma montanha, um símbolo do poder e da engenhosidade anã.
  - Na seção "Características Culturais", detalhar como o sistema de castas se refletia na arquitetura e na vida da cidade. Os distritos residenciais eram segregados, com as famílias nobres vivendo em áreas mais próximas ao Castelo de Gildrat, enquanto as classes trabalhadoras e comerciantes se concentravam perto dos mercados e das entradas das minas.
  - Descrever o "Muro das Memórias" não apenas como um monumento, but como um centro cívico e espiritual, onde as famílias celebravam as vitórias de seus entes em expedições de mineração ou lamentavam suas perdas.

#### **Task 5: Detalhar a Economia e o Comércio**

- **Tópico:** Economia
- **Fonte:** `raca-anaos.md` (nova versão), Quest `Primeiro Contrato`.
- **Alteração no destino:**
  - Expandir a seção "Economia". Em vez de apenas listar produtos, descrever o fluxo econômico. As expedições partiam de Gildrat com grande alarde, financiadas por nobres e comerciantes. O retorno bem-sucedido de uma expedição era um grande evento, com os minérios sendo levados diretamente para as forjas ou para o mercado, onde eram vendidos a preços exorbitantes.
  - Mencionar que a cidade era um polo comercial, atraindo comerciantes de outras raças, embora estes fossem restritos ao distrito comercial e tratados com desconfiança.

#### **Task 6: Narrar a História de Gildrat**

- **Tópico:** Adicionar uma nova seção: "História".
- **Fonte:** `raca-anaos.md`, `o-continente-de-ekios.md`.
- **Alteração no destino:**
  - Criar uma seção "História" com dois subtópicos: "O Auge do Império" e "A Queda".
  - **O Auge do Império:** Descrever Gildrat em seu apogeu, uma potência militar e econômica temida e respeitada. Mencionar a Guarda de Ferro como o exército de elite que protegia as fronteiras e as rotas de comércio.
  - **A Queda:** Narrar os eventos que levaram à ruína da cidade. Começar com a quebra do selo de Melios e a libertação dos Ignotos. Descrever como os anões, apesar de sua força militar, foram pegos de surpresa pela ferocidade e táticas dos Ignotos. Culminar com o ataque surpresa que destruiu a capital e forçou os sobreviventes a fugir para Daratrine, transformando-os de um povo orgulhoso em refugiados. [ver mais...](frontend/docs/GDD/2-world-building/o-continente-de-ekios.md#s2-história-e-linha-do-tempo).
