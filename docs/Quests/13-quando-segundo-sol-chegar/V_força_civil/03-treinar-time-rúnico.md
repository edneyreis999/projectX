# Narrative Structure Document (NSD) - Treinar Time Rúnico

## Quest: Treinar Time Rúnico - V Força Civil

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Treinar Time Rúnico em Kravens
- Importancia na campanha: reforça a presença simbólica da força civil enquanto integra o time rúnico
- Arco narrativo: orgulho comunitário, disciplina coletiva e respeito às tradições esportivas
- Objetivo narrativo global: convencer o time Machados Enferrujados a usar a quadra como laboratório de defesa para Gildrat
- Premissa resumida: Filena guia Thorin até o Campo de Treinamento, eles trabalham com os jogadores e traduzem a paixão por futebol rúnico em táticas contras os Ignotos.

- Locais principais
  - Campo de Treinamento
  - Quadra Rúnica
- NPCs principais
  - Thorin
  - Filena
  - Time Machados Enferrujados (capitão, arqueiros e apoio)
  - Borin (aparece se resgatado)

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Ter salvo ou aliado Borin e os rebeldes no turno anterior, garantindo acesso ao time. |
| Limitações ou bloqueios | Necessário conversar com Filena no Campo de Treinamento; o time só se compromete se Thorin demonstrar respeito às tradições locais. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Treinar Time Rúnico - V Força Civil
 +-- Cena 1: Campo de Treinamento - Filena explica o vínculo entre esporte e defesa.
        +-- Beat 1: Thorin observa os jogadores e escuta a desconfiança do capitão.
 +-- Cena 2: Entendendo os Capitães
        +-- Beat 1: Capitão dos Arqueiros exige compromisso com precisão e honestidade.
        +-- Beat 2: Capitão do Bixete quer garantias de que o time não será explorado.
        +-- Beat 3: Líder de Apoio pede confirmações logísticas para manter o time em pé.
 +-- Cena 3: Simulação na Quadra Rúnica
 |      +-- Beat 1: Drills com runas e passes especiais mostram disciplina tática.
 |      +-- Beat 2: Filena liga cada exercício à defesa de Gildrat.
 +-- Cena 4: Fechamento com Filena
 |      +-- Beat 1: O time canta a canção dos campeões e Filena oficializa a flag `v_forca_civil`.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Apresentação do Time** | Filena pede que Thorin prove que entende o espírito rúnico antes de pedir reforços. |
| 2 | **Conquista dos Capitães** | Cada capitão expõe medos distintos e Thorin responde com ações concretas. |
| 3 | **Treino Ritual** | A quadra vira campo de batalha simbólico com drills que conectam esporte e combate. |
| 4 | **Coroação com Filena** | O time canta, celebrando a nova identidade e Filena registra o ingresso deles na força civil. |

#### Beats por Cena

##### Cena 1 - Apresentação do Time

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Boas-vindas rúnica** | Filena explica a importância da tradição esportiva; Thorin observa o clima. | CS |
| **1-B - Desafio do Capitão** | O capitão declara que o time precisa de provas de respeito, não só promessas. | CHOICE |

##### Cena 2 - Conquista dos Capitães

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Capitão dos Arqueiros** | Discute precisão e foco; Thorin mostra planos de defesa próximos. | CS |
| **2-B - Capitão do Bixete** | Exige garantias de que eles não virarão soldados descartáveis. | CS |
| **2-C - Líder do Apoio** | Quer recursos e logística; Filena apresenta reforços e suprimentos. | CS |

##### Cena 3 - Treino Ritual

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Drills rúnicos** | Jogadores praticam passes com runas; Thorin participa e sente o ritmo. | JOG |
| **3-B - Direção de Filena** | Filena compara o treino ao que será exigido na defesa de Gildrat. | CS |
| **3-C - Canto dos Campeões** | O time canta celebrando a nova aliança. | CS |

##### Cena 4 - Coroação com Filena

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **4-A - Cerimônia de Entronização** | Filena formaliza a entrada do time na força civil. | CS |
| **4-B - Flag ativada** | `v_forca_civil` soma +15 pontos e entrega bônus narrativos. | CS |
