# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: Noite da História

### 1️⃣ Resumo Geral _(Checkpoint 0)_

- [x] **Concluído**

- **Nome da quest**: Noite da História
- **Importância na campanha**: Main + Tutorial
- **Controle principal**: [106] `v_qNoiteDaHistoria_stage`
- **Estados implementados**: `0` (antes da convocação) → `10` (ir ao lugar) → `15` (lugar alcançado; VN ativa) → `20` (VN concluída) → `90` (chegada à Casa Forjaprata; terminal)
- **Controle legado ainda consultado na abertura do mapa**: [026] `v_qNoite_progress`
- **Arco narrativo**: Mundo Comum
- **Quest anterior**: Nenhuma (primeira quest do jogo)
- **Conflito central**: A criança orc chega quando a Noite da História está prestes a começar e precisa ocupar seu lugar antes que Theodore Rheed inicie o relato que conduz à história de Thorin.
- **Objetivo narrativo global**: Apresentar a atmosfera de Daratrine e estabelecer Theodore Rheed como narrador da história principal, usando a Noite da História como moldura meta-narrativa.
- **Premissa resumida**: No Coreto de Daratrine, a criança orc encontra outras crianças brincando e conversando enquanto aguardam Rheed. Após receber a convocação para ocupar seu lugar, entra numa sequência em visual novel, escolhe seu nome e ouve Rheed introduzir Daratrine, Gildrat e Thorin. A narrativa então troca o personagem controlado para Thorin e segue para a Casa da Família Forjaprata.
- **Locais principais**:

  - [022] `EX_Coreto`
  - [046] `VN_Noite_da_Historia`
  - [045] `EX_Casa da Família Forjaprata` (destino da transição)

- **Personagens principais**:

  - Criança orc (protagonista controlável e personagem nomeável)
  - Theodore Rheed (narrador)
  - Crianças reunidas no Coreto
  - Thorin (apresentado por Rheed e assumido como personagem controlável ao final)

---

### 2️⃣ Pré-condições Narrativas _(Checkpoint 1)_

- [x] **Concluído**

| Tipo | Descrição |
| --- | --- |
| **Flags / decisões anteriores** | Nenhuma — abertura do jogo. A quest começa no estado `0`. |
| **Estado emocional do protagonista** | Apressado, chegando quando a história está prestes a começar. |
| **Interação disponível** | Fora das cutscenes, o jogador pode se mover pelo Coreto até acionar a convocação e alcançar seu lugar. Durante os trechos dirigidos, o controle é assumido pela cutscene. |

---

## 3️⃣ Fluxo Visual De Cenas Resumido _(Checkpoint 2)_

- [x] **Concluído**

### Tabela de Cenas

| # | Nome da Cena | Cronologia (ordem dos eventos) | Premissa |
| --- | --- | --- | --- |
| 1 | Coreto em expectativa | Entrada no mapa → câmera apresenta o lugar reservado → câmera retorna ao jogador → crianças brincam e conversam pelo espaço | Apresentar o Coreto como um lugar vivo, com as crianças aguardando o início da história. |
| 2 | Convocação para a história | Jogador alcança a área de convocação → Gab orienta a ir ao lugar → câmera destaca a posição → quest avança para `10` → crianças se reúnem | Transformar a ambientação livre em um objetivo claro: ocupar o lugar antes do início. |
| 3 | Rheed inicia o relato | Jogador chega à posição → Rheed se aproxima → transição para a VN → escolha do nome → apresentação de Daratrine, Gildrat e Thorin → menção à poção antiga | Vincular a criança ao narrador e abrir a história principal por meio da moldura meta-narrativa. |
| 4 | Passagem para Thorin | Retorno ao Coreto → efeito de materialização → troca do grupo para Thorin → reprodução de `Cutscene 2` → conclusão da quest → transferência para a Casa Forjaprata | Encerrar a abertura e entregar o controle narrativo à história de Thorin. |

### Beats por Cena

#### Cena 1 – Coreto em expectativa

Mapa: [022] `EX_Coreto`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **1-A** | **Entrada no Coreto** | A criança orc começa no Coreto enquanto `Theme1` estabelece a ambientação da abertura. | 🎬 |
| **1-B** | **Apresentação do lugar** | A câmera focaliza a posição reservada para a criança e retorna ao jogador após uma breve sinalização sonora. | 🎬 |
| **1-C** | **Coreto vivo** | Dezessete crianças participam de brincadeiras de pega-pega, roda e conversas sentadas. | 🎮 |
| **1-D** | **Conversas ambientes** | Gabs espaciais e não forçadas reforçam a expectativa pela história enquanto a quest ainda está no estado `0`. | 🎮 |

#### Cena 2 – Convocação para a história

Mapa: [022] `EX_Coreto`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **2-A** | **Chamado para o lugar** | Ao alcançar a área de convocação, o jogador recebe a Gab: “Rápido! A história já vai começar... vá para o seu lugar!”. | 🎮 |
| **2-B** | **Indicação visual** | A câmera focaliza a posição de destino e depois retorna ao jogador. | 🎬 |
| **2-C** | **Início formal da quest** | A descrição de save passa a identificar `assistirNoiteHistoria` e a transição `START` leva a quest de `0` para `10`. | 🎬 |
| **2-D** | **Reunião das crianças** | As crianças encerram as atividades paralelas e seguem para suas posições de reunião. | 🎬 |

#### Cena 3 – Rheed inicia o relato

Mapas: [022] `EX_Coreto` → [046] `VN_Noite_da_Historia`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **3-A** | **Chegada ao lugar** | Ao tocar a posição indicada no estado `10`, a criança se vira para cima, entra na VN e a transição `REACH_SEAT` registra o estado `15` antes do primeiro diálogo. | 🎮 |
| **3-B** | **Aproximação de Rheed** | Rheed caminha até `(12,13)`, volta-se para as crianças e a tela escurece para entrar na VN. | 🎬 |
| **3-C** | **O último ouvinte** | Rheed brinca com o atraso da criança e sugere o nome “Dulgarin”. | 🎬 |
| **3-D** | **Escolha do nome** | O jogador aceita “Dulgarin” ou abre a entrada de nome, limitada a oito caracteres. | 🎮 |
| **3-E** | **Introdução da história** | Rheed apresenta Daratrine como refúgio de soldados feridos, conduz o relato a Gildrat e apresenta Thorin com um cut-in. | 🎬 |
| **3-F** | **Poção antiga** | Rheed pede que as crianças fechem os olhos e narra que uma poção antiga as transportará para Gildrat. A transição `COMPLETE_VN` leva a quest de `15` para `20`. | 🎬 |

**Decisão do jogador na Cena 3:**

| ID | Decisão | Opções |
| --- | --- | --- |
| **DEC_001** | Definir o nome da criança | **A)** Aceitar “Dulgarin” → ator 1 recebe esse nome.<br>**B)** Rejeitar a sugestão → abrir a entrada de nome para até oito caracteres. |

#### Cena 4 – Passagem para Thorin

Mapas: [022] `EX_Coreto` → [045] `EX_Casa da Família Forjaprata`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **4-A** | **Retorno à moldura** | Ao terminar a VN, o jogo retorna ao Coreto no estado `20`; Rheed reaparece e se desloca para sua posição. | 🎬 |
| **4-B** | **Materialização** | Uma única Animação 35 é aguardada no ponto da Noite da História antes do fade. | 🎬 |
| **4-C** | **Troca de protagonista** | A criança orc sai do grupo e Thorin entra como personagem controlável. | 🎬 |
| **4-D** | **Cutscene de passagem** | O jogo reproduz o vídeo `Cutscene 2` e define [029] `v_qSemifinal_progress` como `1`. | 🎬 |
| **4-E** | **Chegada à Casa Forjaprata** | `ARRIVE_MAP045` conclui “Noite da História” no estado terminal `90` e transfere Thorin para [045], em `(2,4)`. | 🎬 |

---

## 4️⃣ Referências e Recursos _(Checkpoint 3)_

- [x] **Concluído**

### Notas de implementação

| Categoria | Conteúdo | Prioridade |
| --- | --- | --- |
| **Narrativa** | A quest estabelece a estrutura meta-narrativa: Rheed conta às crianças a história que o jogador passa a vivenciar como Thorin. | Alta |
| **Estado** | A máquina de estados canônica usa [106] `v_qNoiteDaHistoria_stage`; [026] permanece apenas em condições legadas da abertura do Coreto. | Alta |
| **Journal** | O objetivo “Encontre um lugar” fica visível em `10` e só é concluído em `15`; “Diga seu nome” passa a ficar visível em `15` e é concluído em `20`. | Alta |
| **Apresentação** | O Coreto usa câmera de mapa, rotas estruturadas, Gabs ambientes e uma VN dedicada em [046]. | Alta |
| **Transição** | O vídeo chamado `Cutscene 2` conecta a VN à transferência para a Casa Forjaprata; seu conteúdo visual não é especificado neste documento além do que o evento executa. | Média |

### Metadados de Controle

| Propriedade | Valor |
| --- | --- |
| **Total de cenas** | 4 |
| **Total de beats** | 19 |
| **Dependências** | `Coreto_QuestCore`, `Coreto_QuestVN`, `Coreto_Cutscene` e comandos VisuStella de câmera, Gab, busts e escolhas visuais |
| **Outputs** | Nome do ator 1 definido; Thorin adicionado ao grupo; [029] `v_qSemifinal_progress = 1`; quest no estado terminal `90`; chegada ao mapa [045] |
| **Fonte da verdade desta revisão** | Implementação atual de `Map022.json`, `Map046.json`, `Map045.json` e `CoretoQuests.json` |

---

## Histórico de Versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0 | 2026-02-16 | Edney | Documento inicial criado via entrevista interativa. |
| 1.1 | 2026-08-19 | Codex | Fluxo reconciliado com a implementação atual da quest, da VN e da transição para a Casa Forjaprata. |
| 1.2 | 2026-08-19 | Codex | Marco `REACH_SEAT` e projeção do journal alinhados à chegada real ao lugar. |
