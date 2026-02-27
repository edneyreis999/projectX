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
| **1-B-a - Treinar** | Thorin decide se ajudará com o treino, ou não. | CHOICE |
| **1-B-b - Agora não** | Thorin decide se ajudará com o treino, ou não. | CHOICE |
| **1-C - Treino Alinhado** | Filena treina os rebelde com ajuda de Thorin. | CS |
