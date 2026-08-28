# Narrative Structure Document (NSD) - Resgatar Corvos e Família Principal

## Quest: Resgatar Corvos e Família Principal

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Resgatar Corvos e Família Principal
- Importância na campanha: ativa o pacto diplomático com os Corvos e libera o acesso à Mina de Mélios Oeste que eles guardam.
- Arco narrativo: confiança diplomática entre Thorin e os Corvos, que já soaram como inimigos no passado.
- Objetivo narrativo global: demonstrar que Thorin pode articular apoio para Gildrat sendo um mediador, não apenas um soldado.
- Premissa resumida: Corvinus pede que Thorin resgate a família Corvos em Mélios para provar que os Corvos podem confiar no novo regime.

- Locais principais
  - Sala do Conselho (Mapa 011, evento 011) – palco do pedido e da celebração.
  - Mina de Mélios Oeste (sugerido pelas tarefas de `resgatarCorvos`) – onde a família está dispersa.
- NPCs principais
  - Corvinus (quest giver e porta-voz da facção)
  - Família Corvos (inclusive Killin, Borin e vozes coletivas como “Corvo”)
  - Thorin (protagonista que escolhe agir)

### 2 Gatilhos Narrativos

- **NPC com a quest:** Corvinus, na Sala do Conselho.
- **Requisitos:** acesso ao Conselho e ao SQSM configurado com a quest `resgatarCorvos`.
- **Gatilho:** interagir com o evento 011 do mapa 011; a mesma rotina também roda o final de celebração quando a variável 61 atinge 2 e a variável 80 é marcada depois do resgate.
- **Condição para concluir:**
  - Resgatar quatro membros da família em Mélios (tarefas do SQSM).
  - Voltar ao Conselho e permitir que o evento 011 complete `SQSM.CompleteTaskForQuest("resgatarCorvos", 3)` e `SQSM.CompleteQuest("resgatarCorvos")`.

### 3 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | O SQSM registra as tarefas `resgatarCorvos` e a variável 61 controla a ordenação do evento 011 para mostrar a introdução (valor 2) e depois a celebração (valor 80 = 2). |
| Limitações ou bloqueios | O jogador precisa aceitar o pedido (“Resgatar”) para ativar a quest; recusar apenas repete a fala “Volte quando puder” e não altera flags. A página final só dispara depois que as tarefas em Mélios completam a variável 61/80 e retornam ao Conselho. |

### 4 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Resgatar Corvos e Família Principal
 +-- Cena 1: Sala do Conselho - Pedido dos Corvos
 |      +-- Beat 1: Corvinus detalha a separação da família, destaca o risco e termina com "Por favor, ajude-nos!" (1-A)
 |      +-- Beat 2: O jogador escolhe "Resgatar" (SQSM.AddQuest/resgatarCorvos + journal) ou "Agora não" (mensagem de recusa) e o SQSM registra a missão (1-B)
 +-- Cena 2: Sala do Conselho - Família reunida
        +-- Beat 1: Os Corvos celebram, o evento completa `SQSM.CompleteTaskForQuest("resgatarCorvos", 3)` e `SQSM.CompleteQuest("resgatarCorvos")`, dá +35 em `v_influencia_corvos` e mostra "Corvos +35 pontos!" (3-A)
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Sala do Conselho — Pedido dos Corvos** | Corvinus pressiona Thorin a resgatar a família dispersa em Mélios, explica que a aliança depende de ações concretas e enfileira o SQSM para abrir a quest. |
| 2 | **Sala do Conselho — Família reunida** | Após o resgate dos quatro Corvos, o evento conclui a missão, aplica +35 de influência e entrega o reconhecimento narrativo dentro da mesma sala. |

#### Beats por Cena

##### Cena 1 - Pedido dos Corvos

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Família em Apuros** | A família Corvos aceita ajudar se você salvar os membros da família perdidos em Melios. | CS |
| **1-B - Escolha de resgate** | O jogador escolhe “Resgatar” ou “Agora não”. | CS |
| **1-B-a - Escolha de resgate** | O jogador escolhe “Agora não” (o Corvo pede que volte mais tarde). | CHOICE |
| **1-B-b - Escolha de resgate** | O jogador escolhe “Resgatar”. | CHOICE |


##### Cena 2 - O Resgate

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Chegada em Melios** | Thorin chega na mina de Melios para cumprir sua missão. | JOG |
| **2-B - Resgate do Corvo** | Thorin resgata os corvos na mina de Melios. | CS |

##### Cena 3 - Família reunida

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Retorno** | Thorin retorna à Sala do Conselho com os corvos resgatados. | JOG |
| **3-B - Família reunida** | A família Corvos está feliz por estarem todos juntos novammente. | CS |