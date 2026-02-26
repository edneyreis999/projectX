# Narrative Structure Document (NSD) - Treinar Corvos

## Quest: Treinar Corvos

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Treinar Corvos
- Importância na campanha: reforça a regressão militar dos Corvos objetivando a defesa de Gildrat.
- Arco narrativo: transforma a facção em aliados táticos com disciplina e coordenação sonora.
- Objetivo narrativo global: mostrar que Thorin, Filena e Corvinus podem transformar os Corvos em um pelotão confiável antes do conflito com os Ignotos.
- Premissa resumida: depois de aprender a Canção Ancestral, Corvinus pede que Thorin coordene um treino formal; aceitar libera +30 pontos de influência e confirma a disposição dos Corvos.

- Locais principais
  - Sala do Conselho (Mapa 011, evento 013) — palco do requisito, da escolha de treinar e do reconhecimento final.
- NPCs principais
  - Corvinus (mediador político)
  - Filena (instrutora, dá suporte moral)
  - Thorin (líder em treinamento)
  - Corvos/Soldados (aprimoram formações)

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | A quest só é oferecida depois de concluir Canção Ancestral (`ouvirCancao`) e acionar `variableId 61`, que libera a página "Requisito" do evento 013. |
| Limitações ou bloqueios | Enquanto o requisito não estiver satisfeito, o jogador vê o trecho “É preciso ouvir a Canção Ancestral antes de continuar.” sem abrir o diálogo de treino. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Treinar Corvos
 +-- Cena 1: Sala do Conselho - Requisito ancestral
 |      +-- Beat 1: Corvinus lembra que a Canção Ancestral é pré-requisito para iniciar o treinamento (página inicial, variável 61).
 +-- Cena 2: Sala do Conselho - Treinamento oficial
        +-- Beat 1: Corvinus e Filena explicam o plano, o jogador escolhe “Treinar” (SQSM.AddQuest "treinarCorvos") ou “Agora não”.
        +-- Beat 2: Ao aceitar, o evento mostra “Os Corvos estão prontos para batalha!”, aplica `SQSM.CompleteTaskForQuest("treinarCorvos", 1)` e completa a quest com “Corvos +30 pontos!”.
        +-- Beat 3: A recusa exibe “Volte quando puder.” e mantém o bloco aberto para retentativas.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Sala do Conselho — Requisito ancestral** | O evento usa `variableId 61` para garantir que o jogador já tenha ouvido a Canção Ancestral antes de liberar o treino. |
| 2 | **Sala do Conselho — Treinamento formal** | Corvinus e Filena apresentam o treinamento, a escolha aceita dispara o SQSM `treinarCorvos` e finaliza a narrativa com o ganho de influência. |

#### Beats por Cena

##### Cena 1 - Requisito

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Requisito** | É preciso ouvir a Canção Ancestral antes de continuar. | CS |

##### Cena 2 - Treinamento

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Treino de Corvos** | Os corvos precisam treinar. | CS |
| **2-B - Escolha de treinar** | O jogador escolhe “Treinar” ou “Agora não” (recusa com “Volte quando puder.”). | CS |
| **2-B-a - Escolha de treinar** | O jogador escolhe “Treinar". | CHOICE |
| **2-B-b - Escolha de treinar** | O jogador escolhe “Agora não” (recusa com “Volte quando puder.”). | CHOICE |
| **2-C - Treinamento** | Thorin treina os corvos. | CS |

##### Cena 3 - Prontidão

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Prontos!** | Os corvos são guerreiros formidáveis e estão prontos para ajudar! | CS |