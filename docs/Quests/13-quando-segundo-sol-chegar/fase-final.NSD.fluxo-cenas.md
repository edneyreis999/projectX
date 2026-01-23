# Narrative Structure Document (NSD) - Fase Final (Quando o Segundo Sol Chegar)

## Quest: Quando o Segundo Sol Chegar - Fase Final

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Quando o Segundo Sol Chegar - Fase Final
- Importancia na campanha: conclui o arco da invasao dos Ignotos e aponta para a proxima cadeia de quests
- Arco narrativo: reconciliacao familiar, urgencia tática e sacrificio para proteger Gildrat
- Objetivo narrativo global: firmar a cooperacao entre Thorin e Tordan, reforcar stakes tacticos e testar o jogador antes do confronto final
- Premissa resumida: Map008 revela o perdão de Tordan e a partida de Thorin; Map021 situa o conselho em Gildrat; Map053 testa o controle em corredores infestados; Map054 culmina no duelo contra o chefe Ignotos.

- Locais principais
  - Casa da Família Forjaprata
  - Externo
  - Externo - Final
- NPCs principais
  - Thorin
  - Tordan
  - Filena
  - Balastrus
  - Kilin
  - Ignotos

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | `v_trofeu_quebrado = 1` e `v_tordan_dialog` atestam que a quest anterior terminou e liberam o evento do perdão. |
| Limitações ou bloqueios | Sequência depende da escolha de por defender Gildrat ao dormir. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Quando o Segundo Sol Chegar - Fase Final
 +-- Cena 1: Casa da Família Forjaprata - Conversa com Tordan
 |      +-- Beat 1: Tordan se desculpa com Thorin.
 +-- Cena 2: Defesa de Gildrat
 |      +-- Beat 1: Externo - Thorin e demais anões iniciam a defesa de Gildrat
 +-- Cena 3: Travessia pelos Ignotos
 |      +-- Beat 1: Externo Fase Final - Thorin batalha contra ignotos
 +-- Cena 4: Confronto com o Chefe Ignoto
 |      +-- Beat 1: Externo Fase Final - Thorin batalha contra o Chefe Ignoto
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Conversa com Tordan** | Thordan se desculpa e Thorin se dirige para sua cama para dormir. Após escolher a opção por dormir é possível escolher iniciar a defesa de Gildrat, ou se preparar melhor |
| 2 | **Conselho de Defesa em Gildrat** | Lideranças aplicam as estratégias, avaliam perdas e decidem reforçar o corredor sul para conter a ameaça. |
| 3 | **Travessia pelos Ignotos** | Thorin enfrenta ondas sucessivas de Ignotos no corredor. |
| 4 | **Confronto com o Chefe Ignotos** | Thorin enfrenta o chefe Ignoto |

#### Beats por Cena

##### Cena 1 - Convera com Tordan

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Entrada na casa** | O Jogador controla Thorin, que entra na Casa dos Forjaprata e conversa com Tordan. | JOG |
| **1-B - Tordan se desculpa para Thorin** | Tordan reconhece seu erro ao sufocar o sonho de Thorin. | CS |
| **1-C - O perdão de Thorin** | Thorin tem a escolha de perdoar, ou não, o pai. | JOG |
| **1-D - Noite de sono** | Thorin se dirige para a cama para dormi | JOG |
| **1-E - Defesa de Gildrat** | O jogador decide se quer ir para defesa de Gildrat, ou se preparar mais | JOG |

##### Cena 2 - Defesa de Gildrat

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Avanço 1 dos Ignotos** | Os ignotos marcham em direção a Gildrat. | CS |
| **2-B - Armadilha 1** | Explode a primeira armadilha atingindo parte dos ignotos. | CS |
| **2-C - Avanço 2 dos Ignotos** | Ignotos marcham emm direção a Gildrat mais uma vez. | CS |
| **2-D - Armadilha 2** | Explode a segunda armadilha atingindo parte dos ignotos. | CS |
| **2-E - Avanço 3 dos Ignotos** | Os ignotos avançam mais uma vez | CS |
| **2-F - Armadilha 3** | Explode a terceira armadilha atingindo parte dos ignotos. | CS |
| **2-G - Thorin contra Ignotos** | Thorin aceita enfrentar os ignotos na travessia. | CS |

##### Cena 3 - Travessia pelos Ignotos

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Thorin vs Ignotos** | O jogador se direciona aos ignotos na ordem que desejar enfrentá-los. | JOG |
| **3-B - Thorin vs General Ignoto** | O jogador se direciona ao General Ignoto para enfrentá-lo. | JOG |
| **3-C - Passagem** | O jogador se direciona ao ponto que o levará para a fase final. | JOG |

##### Cena 4 - Confronto com o Chefe Ignotos (Map054)

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **4-A - Thorin vs Chefe Ignoto** | O jogador se direciona até o Boss Final para enfrentá-lo. | JOG |
| **4-B - Fim de Jogo** | O jogador finaliza o jogo. | CS |
