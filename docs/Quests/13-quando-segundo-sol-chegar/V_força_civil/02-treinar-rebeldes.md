# Narrative Structure Document (NSD) - Treinar Rebeldes em Kravens

## Quest: Treinar Rebeldes - V Força Civil

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Treinar Rebeldes em Kravens
- Importancia na campanha: fortalece a força civil e amplia a influência de Thorin entre os rebeldes mineradores
- Arco narrativo: confiança conquistada pelo exemplo, organização comunitária e preparação para o conflito contra os Ignotos
- Objetivo narrativo global: transformar rebeldes desconfiados em aliados confiantes para manter a defesa de Gildrat
- Premissa resumida: Filena leva Thorin ao Campo de Treinamento, o grupo tutoria rebeldes, demonstra habilidade tática e garante a adesão de três líderes rebeldes.

- Locais principais
  - Campo de Treinamento
  - Pátio de Armas
- NPCs principais
  - Thorin
  - Filena
  - Borin (aparece se salvo)
  - Três lideranças rebeldes

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Concluir "Resgatar Rebeldes e Borin - Turno Eterno" (Final A ou Final B). |
| Limitações ou bloqueios | Iniciar após falar com Filena no Campo; Borin participa apenas se foi resgatado. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Treinar Rebeldes - V Força Civil
 +-- Cena 1: Campo de Treinamento - Filena apresenta o plano.
        +-- Beat 1: Thorin conhece os rebeldes e recebe o objetivo.
 +-- Cena 2: Interações com os líderes rebeldes.
        +-- Beat 1: Conversa com o líder do setor de mineração.
        +-- Beat 2: Conversa com o líder do setor de combate.
        +-- Beat 3: Conversa com o líder do setor logístico.
 +-- Cena 3: Simulação de treinamento
 |      +-- Beat 1: Demonstração de defesa coordenada.
 |      +-- Beat 2: Rebeldes reconhecem Thorin e Filena como inspiradores.
 +-- Cena 4: Retorno a Filena
 |      +-- Beat 1: Desfecho narrativo e ativação da flag v_forca_civil.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Boas-vindas no Campo** | Filena reforça a importância de conquistar líderes rebeldes e define a meta de três interações. |
| 2 | **Confiança dos Líderes** | Cada líder expressa uma demanda distinta e reage à postura de Thorin. |
| 3 | **Treinamento em Campo** | Simulação mostra como coordenação e música fortalece o moral. |
| 4 | **Debrief com Filena** | Rebeldes confirmam o compromisso e Filena sela o avanço do exército civil. |

#### Beats por Cena

##### Cena 1 - Boas-vindas no Campo

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Introdução de Filena** | Filena explica o objetivo de transformar rebeldes em aliados confiantes. | CS |
| **1-B - Objetivo do Treinamento** | Thorin recebe o desafio de conquistar três líderes e ajudar na coordenação. | CHOICE |

##### Cena 2 - Confiança dos Líderes

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Líder da Mineração** | O líder espera que Thorin reforce a importância dos recursos e profecias. | CS |
| **2-B - Líder do Combate** | Debate sobre defesa de Gildrat e promessas quebradas; Thorin confirma capacidade. | CS |
| **2-C - Líder Logístico** | Lógica logística exige dados sobre reforços; Thorin soma suporte prático. | CS |

##### Cena 3 - Treinamento em Campo

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Coordenação de Formações** | Thorin conduz a simulação por ondas, destacando táticas defensivas. | JOG |
| **3-B - Apoio de Filena** | Filena explica que o grupo é a próxima muralha de Gildrat. | CS |
| **3-C - Canto dos Rebeldes** | Rebeldes entoam canção de mineração, reconhecendo Thorin como um deles. | CS |

##### Cena 4 - Debrief com Filena

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **4-A - Confirmação de Filena** | Filena registra o sucesso e define que os rebeldes integram a força civil. | CS |
| **4-B - Flag ativada** | v_forca_civil soma +20 pontos e reforça presença no mapa. | CS |
