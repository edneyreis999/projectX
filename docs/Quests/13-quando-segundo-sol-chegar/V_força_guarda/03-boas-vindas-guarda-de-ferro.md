# Narrative Structure Document (NSD) - Boas-vindas à Guarda de Ferro

## Quest: Boas-vindas à Guarda de Ferro - V Força Guarda

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Boas-vindas à Guarda de Ferro
- Importancia na campanha: posiciona Thorin como aliado oficial da Guarda e fortalece o vínculo com Kilin após seu retorno
- Arco narrativo: reconhecimento público, humor forjado por irmandade e autoridade crescente de Kilin
- Objetivo narrativo global: ritualizar o trote para mostrar que Thorin já pertence à Guarda e que a unidade está unida contra os Ignotos
- Premissa resumida: Kilin convoca Thorin à Taverna da Pedra Vulcânica, relembra o passado e organiza um trote para afirmar o novo status do protagonista.

- Locais principais
  - Taverna da Pedra Vulcânica
  - Salão de Reuniões da Guarda
- NPCs principais
  - Kilin
  - Thorin
  - Mhordred
  - Soldados da Guarda de Ferro

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Completar “Resgatando Kilin - O Resgate do Soldado Kilin”. |
| Limitações ou bloqueios | Kilin precisa ter sido libertado e aceitar Thorin após ele assumir o trote. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Boas-vindas à Guarda de Ferro - V Força Guarda
 +-- Cena 1: Taverna da Pedra Vulcânica - Kilin chama Thorin para o trote.
        +-- Beat 1: Kilin relembra o cativeiro e provoca brincando que Thorin ainda é criança.
 +-- Cena 2: Ritual do Trote
        +-- Beat 1: Soldados recitam histórias e desafiam Thorin a repetir juramentos.
        +-- Beat 2: Mhordred provoca Thorin sobre a honra da Guarda e exige resposta clara.
        +-- Beat 3: Kilin afirma que Thorin já é um deles e destaca a importância do novo papel.
 +-- Cena 3: Reconhecimento em coro
 |      +-- Beat 1: Guarda aplaude, Thorin responde com gesto simbólico.
 |      +-- Beat 2: Kilin ativa a flag `v_forca_guarda` e encerra o ritual.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Kilin convoca o trote** | Ele explica que tudo isso é uma cerimônia de boas-vindas e quer que Thorin participe com humor. |
| 2 | **Rito do Trote** | Soldados e Mhordred testam o protagonista com provocações e histórias. |
| 3 | **Coro coletivo** | O grupo celebra, o canto sobe e a resposta ativa `v_forca_guarda`. |

#### Beats por Cena

##### Cena 1 - Kilin convoca o trote

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Discurso de retorno** | Kilin relembra eventos e conecta Thorin ao trote honorífico. | CS |
| **1-A-a - Celebrar** | O jogador escolhe celebrar. | CHOICE |
| **1-A-b - Agora não** | O jogador escolhe não celebrar. | CHOICE |


##### Cena 2 - Rito do Trote

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Celebração** | A Guarda celebra o momento. | CS |
| **2-B - Adiar Celebração** | A Guarda não celebra o momento. | CS |
