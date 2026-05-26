# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: Noite da História

### 1️⃣ Resumo Geral _(Checkpoint 0)_

\[x] **Concluído**

- **Nome da quest**: Noite da História
- **Importância na campanha**: Main + Tutorial
- **Variável de controle**: [026]v_qNoite_progress
- **Arco narrativo**: Mundo Comum
- **Quest anterior**: Nenhuma (primeira quest do jogo)
- **Conflito central**: O jogador (criança orc) está atrasado para a Noite da História, onde Theodore Rheed está começando a contar a história principal do jogo no Coreto da Cidade de Daratrine.
- **Objetivo narrativo global**: Conhecer a atmosfera do jogo e estabelecer que toda a história do jogo será contada por Theodore Rheed na Noite da História. Esta é uma quest de abertura com estrutura meta-narrativa (frame story).
- **Premissa resumida**: O jogador controla uma criança orc que chega atrasada à Noite da História no Coreto, onde Rheed narrará a história principal. Crianças eufóricas correm pelo mapa. O jogador deve falar com Darla (Elfa assistente de Rheed), que o direciona ao seu lugar. Rheed desce, brinca com o atraso, pergunta o nome (com sugestão editável), volta ao Coreto e inicia a narrativa. Uma cutscene transporta o jogador para Gildrat, onde passa a controlar Thorin, um jovem anão dormindo.
- **Resumo**: O jogador sob o controle de uma criança orc chega atrasada na noite da história, onde Rheed está contando a história principal da noite no Coreto da Cidade de Daratrine. As crianças estão eufóricas correndo aleatoriamente pelo mapa esperando a história começar. O jogador deve ir em direção a uma Elfa chamada Darla, que ajuda Rheed a organizar as crianças. Ao conversar com ela, a Elfa diz ao jogador que ele deve ir no seu lugar que a história já iria começar. Ao chegar no seu lugar, Rheed desce do Coreto e vai em direção ao jogador, brinca com o fato dele ter chego atrasado e pergunta seu nome. O jogo dá uma sugestão de nome, mas o jogador pode alterar se ele quiser. Depois de fornecer o nome, Rheed volta até o Coreto e começa a história. Inicia-se um vídeo de cutscene que transporta o jogador para Gildrat onde ele controla Thorin, um jovem anão que está dormindo.
- **Locais principais**:
  - [005] Coreto - Praça Central de Daratrine

- **NPCs principais**:
  - Criança Orc (protagonista controlável)
  - Theodore Rheed (narrador)
  - Darla (Elfa assistente de Rheed)
  - Crianças (plano de fundo - não-interativas)

---

### 2️⃣ Pré-condições Narrativas _(Checkpoint 1)_

- [x] **Concluído**

| Tipo                                 | Descrição                                    |
| ------------------------------------ | -------------------------------------------- |
| **Flags / Decisões anteriores**      | Nenhuma - Primeira quest do jogo (abertura)  |
| **Estado emocional do protagonista** | Apressado/Ansioso (correndo, preocupado com o atraso) |
| **Limitações ou bloqueios**          | Menu bloqueado, jogador só pode se movimentar e falar com NPCs |

---

## 3️⃣ Fluxo Visual De Cenas Resumido _(Checkpoint 2)_

- [x] **Concluído**

### Tabela de Cenas

| #   | Nome da Cena                    | Cronologia (ordem dos eventos)                                                                                                                                                                                                                     | Premissa                                                                                         |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Introdução ao Cenário           | Spawn do jogador → Pan da câmera até Darla → Liberação de movimento → Crianças se movendo aleatoriamente até o 5º passo → Crianças vão para suas posições                                                                                           | Introdução ao cenário e estabelecimento do objetivo de falar com Darla                            |
| 2   | Darla Direciona o Jogador       | Jogador vai até Darla e inicia diálogo → Câmera faz pan para o lugar do jogador → Brilho aparece no chão → Log de quests abre com task                                                                                                              | Darla direciona o jogador ao seu lugar para ouvir Rheed                                           |
| 3   | Rheed Interage com o Jogador    | Jogador vai até a marcação → Rheed fala "Olha quem chegou atrasado" → Rheed anda até o jogador → Rheed pergunta o nome → Jogador escolhe o nome → Rheed volta ao centro → Rheed se vira para as crianças → Rheed introduz Daratrine → Rheed toma a poção → Rheed assopra fumaça → Inicia-se o vídeo de Ekios | Rheed interage com o jogador e conhece seu nome                                                  |
| 4   | Transição Meta-narrativa        | Vídeo mostra mapa de Ekios → Câmera percorre o mapa → Zoom em Gildrat → Transição para cutscene de jogo → Thorin aparece dormindo na cama                                                                                                             | Transição meta-narrativa para a história principal                                               |

### Beats por Cena

#### Cena 1 – Introdução ao Cenário
Mapa: [005] Coreto

| ID      | Titulo                          | Premissa Resumida                                                                                                                                            | Tipo |
| ------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **1-A** | **Spawn do Jogador**            | Jogador aparece no canto inferior da tela                                                                                                                    | 🎬   |
| **1-B** | **Pan da Câmera**               | Câmera faz um pan até a elfa Darla                                                                                                                           | 🎬   |
| **1-C** | **Liberação de Movimento**      | Jogador ganha controle de movimento                                                                                                                          | 🎮   |
| **1-D** | **Crianças se Movendo**         | Crianças de fundo se mexem aleatoriamente até o 5º passo do jogador                                                                                          | 🎮   |
| **1-E** | **Crianças se Posicionam**      | Após o 5º passo, as crianças vão cada uma para sua posição no centro da praça                                                                                | 🎬   |

#### Cena 2 – Darla Direciona o Jogador
Mapa: [005] Coreto

| ID      | Titulo                    | Premissa Resumida                                                                                      | Tipo |
| ------- | ------------------------- | ------------------------------------------------------------------------------------------------------ | ---- |
| **2-A** | **Falar com a Elfa**      | Jogador inicia diálogo com Darla                                                                       | 🎮   |
| **2-B** | **Pan da Câmera**         | Câmera faz pan para o lugar que o jogador deve ir                                                      | 🎬   |
| **2-C** | **Brilho no Chão**        | Aparece brilho/marcador no chão indicando onde o jogador deve ir                                       | 🎬   |
| **2-D** | **Abrir Log de Quests**   | Abre o log de quests mostrando a task de "Encontre um lugar para sentar próximo às crianças"            | 🎮   |

#### Cena 3 – Rheed Interage com o Jogador
Mapa: [005] Coreto

| ID       | Titulo                          | Premissa Resumida                                                                                                                                                                                              | Tipo |
| -------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **3-A**  | **Jogador vai até a Marcação**  | Jogador se move até o brilho/marcador no chão                                                                                                                                                                 | 🎮   |
| **3-B**  | **Rheed Fala**                  | Rheed comenta o atraso do jogador: "Olha quem chegou atrasado"                                                                                                                                                | 🎬   |
| **3-C**  | **Rheed Anda Até o Jogador**    | Rheed se aproxima do jogador                                                                                                                                                                                  | 🎬   |
| **3-D**  | **Rheed Pergunta o Nome**       | Rheed solicita o nome do jogador, com sugestão pré-definida "Dulgarin"                                                                                                                                        | 🎮   |
| **3-E**  | **Jogador Escolhe o Nome**      | Jogador aceita sugestão "Dulgarin" ou digita nome próprio em menu                                                                                                                                             | 🎮   |
| **3-F**  | **Rheed Volta ao Centro**       | Rheed se despede brevemente e retorna ao centro do Coreto                                                                                                                                                     | 🎬   |
| **3-G**  | **Rheed se Vira para as Crianças** | Rheed se volta para o público infantil                                                                                                                                                                      | 🎬   |
| **3-H**  | **Rheed Introduz Daratrine**    | Rheed começa a contar a história, introduzindo o início de Daratrine e atiçando a curiosidade                                                                                                                 | 🎬   |
| **3-I**  | **Rheed Toma a Poção**          | Rheed consome uma poção mágica                                                                                                                                                                                | 🎬   |
| **3-J**  | **Rheed Assopra Fumaça**        | Rheed assopra uma nuvem de fumaça sobre a praça                                                                                                                                                               | 🎬   |
| **3-K**  | **Início do Vídeo de Ekios**    | Inicia-se o vídeo mostrando o mapa de Ekios, câmera percorre e dá zoom em Gildrat                                                                                                                             | 🎬   |

**Decisões do Jogador na Cena 3:**

| ID        | Decisão                                      | Opções                                                                                                                                                                                                                           |
| --------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DEC_001** | Rheed pergunta: "E qual é o seu nome, pequeno?" | **A)** Aceitar "Dulgarin" → Nome do personagem definido como "Dulgarin"<br>**B)** Digitar nome próprio → Abre menu de input para jogador digitar nome                                                                          |

#### Cena 4 – Transição Meta-narrativa
Mapa: [005] → Cutscene

| ID      | Titulo                | Premissa Resumida                                                                                                                           | Tipo |
| ------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **4-A** | **Thorin Dormindo**   | Após o vídeo, transita para cutscene de jogo mostrando Thorin dormindo na cama dele                                                          | 🎬   |

---

## 4️⃣ Referências e Recursos _(Checkpoint 3)_

- [x] **Concluído**

### Notas Técnicas

| Categoria   | Conteúdo                                                                                                                                                                           | Prioridade |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Technical** | Menu deve permanecer bloqueado durante toda a quest. Jogador só pode se movimentar e falar com NPCs.                                                                             | Alta       |
| **Narrative** | Esta quest estabelece a estrutura meta-narrativa do jogo: toda a história é narrada por Theodore Rheed na Noite da História.                                                      | Alta       |
| **Technical** | Vídeo de Ekios deve mostrar o mapa completo com câmera percorrendo e dando zoom em Gildrat para transição suave.                                                                  | Média      |

### Metadados de Controle

| Propriedade           | Valor                             |
| --------------------- | --------------------------------- |
| **Total de Cenas**    | 4                                 |
| **Total de Beats**    | 21                                |
| **Tempo Estimado**    | 3-10 min                          |
| **Complexidade**      | Baixa                             |
| **Dependências**      | Nenhuma - Quest de abertura       |
| **Outputs**           | - Nome do jogador definido<br>- Quest Noite da História concluída ([026]v_qNoite_progress = completed)<br>- Desbloqueio da próxima quest |

---

## Histórico de Versões

| Versão | Data       | Autor  | Mudanças                           |
| ------ | ---------- | ------ | ---------------------------------- |
| 1.0    | 2026-02-16 | Edney  | Documento inicial criado via entrevista interativa |
