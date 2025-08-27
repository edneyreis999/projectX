# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: A Travessia Perigosa

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [x] **Concluído**  
- **Nome da quest**: A Travessia Perigosa  
- **Importância na campanha**: Main  
- **Arco narrativo**: Recusa do Chamado  
- **Quest anterior**: Minerador Aprendiz  
- **Conflito central**: Tusk pressiona a equipe a partir em meio a uma tempestade de neve para apresentar os resultados da expedição, enquanto Thorin e os guardas enfrentam as consequências dessa decisão.  
- **Objetivo narrativo global**: Escalar a tensão do mistério do selo, reforçar o aprendizado do jogador com batalhas desafiadoras e aprofundar os laços de Thorin com os guardas.  
- **Premissa resumida**: Thorin e seu grupo desafiam uma nevasca para retornar de Kravens com minérios; a quest termina com um pesadelo que amplia o mistério do selo ancestral e da missão do protagonista.  
- **Resumo**: A quest começa com uma discussão acalorada na clareira de Kravens sobre a iminente tempestade de neve. Tusk insiste em partir imediatamente, ameaçando os membros que se recusarem com a perda de pagamento. O grupo, incluindo Thorin e os guardas, parte contrariado, enfrentando perigosas batalhas durante a travessia pelo mapamúndi sob nevasca. Ao retornarem à Estrada do Cão Luar, Balastros os aguarda ansioso. O jogador pode escolher entregar ou omitir o minério raro Sigmetal. Após a entrega, Thorin retorna sozinho para casa e tem um pesadelo intenso com sua mãe, que o alerta sobre um selo ancestral rachado, encerrando a missão.  
- **Locais principais**:  
  - Clareira de Kravens  
  - Mapamúndi (travessia sob nevasca)  
  - Estrada do Cão Luar  
  - Casa da família Forja Prata (quarto do Thorin, sonho)  
- **NPCs principais**:  
  - Thorin  
  - Tusk  
  - Balastros  
  - Kilin  
  - Mhordred  
  - Tharok  
  - Mineradores secundários  
  - Mãe do Thorin (no sonho)  

---

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

- [x] **Concluído**

| Tipo | Descrição |
|------|-----------|
| **Flags / Decisões anteriores** | Jogador concluiu a quest “Minerador Aprendiz” |
| **Limitações ou bloqueios** | Caminho principal do Mapamúndi aberto para retorno; algumas cavernas laterais liberadas para exploração como refúgio da tempestade, permitindo interações e pequenas side-events. |

---

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

- [ ] **Concluído**

```plaintext
Quest: A Travessia Perigosa
 ├── Cena 1: Clareira de Kravens — Premissa: Discussão tensa sobre a tempestade com múltiplas escolhas do jogador
 │      ├── Beat 1: Aviso dos mineradores sobre a tempestade (🎬)
 │      ├── Beat 2: Debate entre Tusk, guardas e mineradores (🎮) — múltiplas escolhas
 │      └── Beat 3: Decisão do grupo em partir ou esperar (🎬)
 ├── Cena 2: Travessia no Mapamúndi — Premissa: Retorno perigoso com batalhas fortalecidas e exploração das cavernas
 │      ├── Beat 1: Início da travessia na tempestade (🎮)
 │      ├── Beat 2: Encontros com inimigos fortalecidos (🎮)
 │      ├── Beat 3: Abrigo em cavernas — ativação de sidequests (🎮)
 │      └── Beat 4: Confronto com boss próximo a Gildrat (🎮)
 ├── Cena 3: Encontro com Balastros — Premissa: Relatório e entrega do Sigmetal com múltiplas escolhas
 │      ├── Beat 1: Chegada do grupo e recepção ansiosa (🎬)
 │      ├── Beat 2: Diálogo com Balastros (🎮) — múltiplas escolhas para entrega do Sigmetal
 │      └── Beat 3: Reação de Balastros ou Tusk conforme escolha (🎬)
 └── Cena 4: Retorno para casa — Premissa: Caminho noturno simples e introspetivo
        ├── Beat 1: Travessia pelo mapa escurecido (🎮)
        └── Beat 2: Chegada à casa e início do sonho (🎬)


```

#### Tabela de Cenas

| # | Nome da Cena                | Premissa resumida (expandida)                                                                                                                                                              |
| - | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | **Clareira de Kravens**     | Discussão tensa sobre a tempestade iminente; Kilin alerta Tusk sobre os riscos; jogador faz múltiplas escolhas para apoiar Kilin ou Tusk; Tusk ameaça retenção de pagamento para quem não partir. |
| 2 | **Travessia no Mapamúndi**  | Retorno perigoso sob tempestade com batalhas contra inimigos fortalecidos; sequência intensa de batalhas; quebra narrativa com Reed e o jogador criança; exploração da caverna com puzzle e item “Símbolo da Trégua”; confronto com boss perto de Gildrat. |
| 3 | **Encontro com Balastros**  | Chegada com tempo limpo; organização para entrega dos minérios no balaio; múltiplas opções para entrega do Sigmetal (para Tusk, Balastros, no balaio ou não entregar); cenas e diálogos variáveis conforme escolha; encerramento com Balastros.         |
| 4 | **Retorno para casa**       | Travessia noturna e silenciosa; chegada em casa sem ninguém; diálogos opcionais no quarto do pai e com Sáparo; transição para sonho final envolvendo o selo ancestral.                                                         |

---

#### Beats por Cena

##### Cena 1 – Clareira de Kravens

| #  | Beat                                             | Descrição / Decisões do Jogador                        | Controle |
| ---|-------------------------------------------------|-------------------------------------------------------|----------|
| 1  | Aviso de Kilin                                   | Kilin, chefe da guarda real, alerta Tusk sobre a tempestade se formando e o perigo iminente.  | 🎬       |
| 2  | Reação inicial do grupo                          | O grupo demonstra preocupação; muitos concordam com Kilin, mas alguns hesitam.               | 🎬       |
| 3  | Discordância de Tusk                             | Tusk nega o perigo e afirma que a missão deve continuar para satisfazer Balastros.          | 🎬       |
| 4  | Debate acirrado                                  | Jogador pode escolher:                                     | 🎮       |
|     | — Apoiar Kilin (sugerir esperar a tempestade passar)       | Reforça a cautela e tenta convencer os outros a adiar a partida.                           |          |
|     | — Apoiar Tusk (incitar a partida imediata)                    | Ajuda Tusk a pressionar o grupo a partir rapidamente.                                     |          |
| 5  | Cartada final de Tusk                             | Tusk reafirma sua autoridade, lembra o acordo com Balastros e ameaça retenção de pagamento para quem não partir. | 🎬       |
| 6  | Decisão final do grupo                           | O grupo decide partir sob a pressão de Tusk, mesmo contrariado.                           | 🎬       |

---

##### Cena 2 – Travessia no Mapamúndi (Detalhada)

| #  | Beat                                      | Descrição                                                                                             | Controle |
| ---|------------------------------------------|-----------------------------------------------------------------------------------------------------|----------|
| 1  | Início da travessia                      | O grupo começa a travessia sob forte tempestade de neve, enfrentando o clima severo.                | 🎮       |
| 2  | Encontros com inimigos fortalecidos     | O jogador enfrenta inimigos já conhecidos, porém em versões mais poderosas e agressivas.            | 🎮       |
| 3  | Sequência intensa de batalhas            | Cerca de 6 batalhas seguidas próximas uma da outra, gerando tensão e desafio para o jogador.       | 🎮       |
| 4  | Quebra narrativa - Flash para Reed e criança | Jogador é teletransportado para a noite da história, onde Reed narra e uma criança (jogador infantil) reclama da repetição das batalhas. | 🎬       |
| 5  | Reed menciona a caverna                   | Reed explica que ao lado deles há uma caverna, abrindo uma nova possibilidade na história.          | 🎬       |
| 6  | Retorno à travessia no Mapamúndi          | A narrativa retorna ao mapa mundi, agora com a entrada da caverna liberada.                         | 🎮       |
| 7  | Exploração da caverna                      | Jogador entra na caverna, resolve um puzzle e obtém o item “Símbolo da Trégua”.                    | 🎮       |
| 8  | Funcionalidade do Símbolo da Trégua       | O item permite acumular e absorver as batalhas convencionais do mapa mundi para serem enfrentadas em um combate único posteriormente. | 🎮       |
| 9  | Confronto com boss próximo a Gildrat      | Após as interações na caverna e batalhas, o jogador enfrenta um boss desafiador perto do destino. | 🎮       |

---

##### Cena 3 – Encontro com Balastros (Rascunho detalhado e sequencial)

| #  | Beat                                          | Descrição                                                                                                            | Controle |
| ---|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| 1  | Chegada na Estrada do Cão Luar                 | O grupo chega com o tempo limpo após a tempestade; Balastros os aguarda ansioso.                                      | 🎬       |
| 2  | Organização da entrega                          | Balastros e Tusk organizam o grupo em fila para entregar os minérios no balaio central.                              | 🎬       |
| 3  | Entrega dos Cravens                            | Jogador entrega manualmente os minérios Cravens (9 ou 10) no balaio; condição para avançar.                          | 🎮       |
| 4  | Cenas condicionais após entrega dos Cravens   | Dependendo da posse e entrega do Sigmetal, ocorrem as seguintes situações:                                           | 🎬       |
|     | — Se Tusk já tem o Sigmetal (ou recebe antes) | Tusk faz cena empolgada dizendo a Balastros que ele encontrou o Sigmetal; Thorin reage, pois sabe que foi ele quem achou.|          |
|     | — Se jogador entregou o Sigmetal no balaio ou diretamente para Balastros | Balastros analisa o Sigmetal, mantém silêncio, e o minério “finge que nada aconteceu”, mantendo o mistério.           |          |
|     | — Se jogador não entregou o Sigmetal          | Após entrega dos Cravens, Balastros conversa com Thorin e comenta enigmaticamente:                                   |          |
|     |                                                | “Você está muito novo para carregar tanto peso nos bolsos... Mas tudo bem. Nem todo baú se abre no primeiro puxão.” |          |
| 5  | Conversa final com Balastros                    | Jogador pode dialogar com Balastros, encerrando a cena; diálogos variam conforme as escolhas anteriores.             | 🎮       |

---

##### Cena 4 – Retorno para casa (Detalhado e Condicional)

| #  | Beat                                    | Descrição                                                                                                    | Controle |
| ---|----------------------------------------|--------------------------------------------------------------------------------------------------------------|----------|
| 1  | Travessia noturna                      | Thorin atravessa o mapa escurecido e silencioso, refletindo sobre os eventos recentes.                       | 🎮       |
| 2  | Chegada à casa                         | Thorin chega em casa e percebe que não há ninguém.                                                          | 🎮       |
| 3  | Diálogo interno opcional               | Caso o jogador visite o quarto do pai, Thorin fala consigo mesmo, questionando o paradeiro do pai.            | 🎮       |
| 4  | Interação opcional com Sáparo Boca de Corneta | Thorin pode encontrar Sáparo e perguntar sobre o pai, expressando preocupação e frustração.                   | 🎮       |
| 5  | Início do sonho final                  | Cutscene ou transição para o sonho com a mãe de Thorin, envolvendo o selo ancestral e mistério crescente.    | 🎬       |
