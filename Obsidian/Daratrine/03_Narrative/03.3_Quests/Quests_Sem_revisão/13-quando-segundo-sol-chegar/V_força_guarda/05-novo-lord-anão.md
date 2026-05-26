# Narrative Structure Document (NSD) - O Novo Lorde Anão

## Quest: O Novo Lorde Anão - V Força Guarda

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: O Novo Lorde Anão
- Importancia na campanha: legitima a próxima liderança da Guarda e prepara Mhordred para comandar com apoio emocional
- Arco narrativo: legado, cerimônia de posse e reconciliação diante do futuro incerto
- Objetivo narrativo global: apoiar Kilin enquanto escolhe um presente simbólico que represente a nova era guardiã
- Premissa resumida: Kilin pede que Thorin encontre um presente perfeito para Mhordred e explique seu significado antes da cerimônia oficial na Taverna da Pedra Vulcânica.

- Locais principais
  - Distrito Comercial
  - Taverna da Pedra Vulcânica
- NPCs principais
  - Kilin
  - Thorin
  - Mhordred
  - Guarda de Ferro

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Completar “Resgatando Kilin - O Resgate do Soldado Kilin”. |
| Limitações ou bloqueios | É necessário obter a bênção de Kilin antes de entregar o presente e garantir que a cerimônia siga o protocolo. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: O Novo Lorde Anão - V Força Guarda
 +-- Cena 1: Distrito Comercial - Thorin busca um presente e conversa com comerciantes sobre o simbolismo sério.
        +-- Beat 1: Ferreiro recomenda um medalhão com runas protetoras.
        +-- Beat 2: Artífice sugere uma peça de armadura com detalhes de runa de liderança.
 +-- Cena 2: Taverna da Pedra Vulcânica - Kilin compartilha o que o símbolo precisa representar e avalia as opções.
        +-- Beat 1: Thorin explica a escolha e reúne consentimento de Kilin.
        +-- Beat 2: Mhordred aceita o presente e descreve sua visão de comando.
 +-- Cena 3: Cerimônia de Posse
 |      +-- Beat 1: A Guarda de Ferro presta homenagem ao novo Lorde.
 |      +-- Beat 2: Kilin ativa a flag `v_forca_guarda` enquanto o presente é apresentado.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Procura simbólica** | Thorin visita comerciantes, escolhe o momento certo e aprende sobre o significado da peça. |
| 2 | **Discussão com Kilin** | Ele apresenta a escolha, fala sobre o ritual e garante que o presente represente união. |
| 3 | **Cerimônia e confirmação** | Mhordred recebe a peça, a Guarda canta e a flag consolida o novo status. |

#### Beats por Cena

##### Cena 1 - Procura simbólica

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Liderança** | Guarda comenta que precisam de uma liderança. | CS |
| **1-B - Escolha** | O jogador escolhe entre aceitar a liderança, ou não. | CS |
| **1-B-a - Aceitar Liderança** | O jogador escolhe aceitar a liderança. | CHOICE |
| **1-B-b - Recusar** | O jogador escolhe recusar a liderança. | CHOICE |

##### Cena 2 - Discussão com Kilin

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Novo Lorde Anão** | Thorin é nomeado o novo Lorde Anão. | CS |
| **2-B - Disposição** | O guarda se coloca à disposição para ajudar. | CS |