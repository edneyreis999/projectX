# Narrative Structure Document (NSD) - Canção Ancestral

## Quest: Canção Ancestral

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Canção Ancestral
- Importância na campanha: amplia a influência dos Corvos e entrega uma nova mecânica sonora contra os Ignotos.
- Arco narrativo: reforça a parceria entre Thorin, Corvinus e Sáparo, equilibrando diplomacia e criatividade tática.
- Objetivo narrativo global: dar ao jogador uma opção de disrupção sonora para conter as criaturas durante as próximas fases.
- Premissa resumida: Corvinus e a Anciã revelam que a Canção Ancestral, cantada por Sáparo, emite frequências que distraem os Ignotos e liberam a habilidade `Canção do Desvanecer`.

- Locais principais
  - Sala do Conselho (Mapa 011, evento 012) — palco da oferta, da recusa e da celebração do ritual sonoro.
- NPCs principais
  - Corvinus (porta-voz da facção)
  - Anciã / Sáparo Boca-de-Corneta (mentor sonoro e criatura que aprende o canto)
  - Thorin (protagonista que escolhe aceitar o treinamento)

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | A quest só aparece depois que a família Corvos já foi resgatada (`resgatarCorvos`) e `variableId 61` foi ajustada para 2, garantindo que o bloco de introdução seja exibido. |
| Limitações ou bloqueios | A Anciã recita que a Canção exige o resgate completo para começar; sem aceitar essa exigência, o evento permanece em loop no bloco “Requisito” e a quest não ativa. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Canção Ancestral
 +-- Cena 1: Sala do Conselho - Requisito ancestral
 |      +-- Beat 1: A Anciã lembra que a família Corvos deve estar salva antes de cantar (variável 61).
 +-- Cena 2: Sala do Conselho - Treinamento de Sáparo
        +-- Beat 1: Corvinus e a Anciã oferecem a canção ancestral, explicando o uso como isca sonora.
        +-- Beat 2: O jogador escolhe “Ouvir canção” (SQSM.AddQuest “ouvirCancao”, journal) ou “Agora não” (recusa com “Volte quando puder ouvir.”).
        +-- Beat 3: Aceitar dispara `SQSM.CompleteTaskForQuest("ouvirCancao", 1)`, `SQSM.CompleteQuest("ouvirCancao")`, aparece “Corvos +35 pontos!” e finaliza com “A canção agora vive no coração de cada um.”
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Sala do Conselho — Requisito ancestral** | O evento verifica `variableId 61` e reforça que o resgate da família precisa estar finalizado antes de seguir com a canção. |
| 2 | **Sala do Conselho — Treinamento de Sáparo** | Aceitar provoca a conclusão da quest `ouvirCancao`, aplica o bônus narrativo e ativa a habilidade, enquanto recusar repete o pedido. |

#### Beats por Cena

##### Cena 1 - Requisito

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Requisito** | A família Corvos deve ser salva antes de continuar. | CS |

##### Cena 2 - Ouvindo a Canção

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - A Canção Ancestral** | A Anciã diz que precisa cantar a canção ancestral. | CS |
| **2-B - Escolha** | Thorin decide ouvir ou não a canção anestral. | CS |
| **2-B-a - A Canção Ancestral** | Thorin decide ouvir a canção anestral. | CS |
| **2-B-b - A Canção Ancestral** | Thorin decide não ouvir a canção anestral. | CS |
| **2-C - Espírito Fortalecido** | O espírito de Thorin é fortalecido. | CS |

##### Cena 3 - Alma Fortificada

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Inspirados** | A canção agora vive no coração de cada um. | CS |
