# Narrative Structure Document (NSD) - Encontrar Ferreiro Para Armaduras

## Quest: Encontrar Ferreiro Para Armaduras - V Sigmetal

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Encontrar Ferreiro Para Armaduras
- Importancia na campanha: transforma o sigmetal coletado em armaduras e reforça a confiança na nova liga
- Arco narrativo: tradição de forjaria, respeito entre guerreiros e a engenharia tática de Gildrat
- Objetivo narrativo global: guiar Thorin até o mestre ferreiro de Ekios e garantir uma peça produzida com sigmetal
- Premissa resumida: Balastrus indica um ferreiro recluso no Distrito Comercial, Thorin deve negociar com ele e apresentar evidências do minério para obter a armadura

- Locais principais
  - Distrito Comercial
  - Oficina do Mestre Ferreiro
- NPCs principais
  - Thorin
  - Balastrus
  - Mestre Ferreiro Leviatã

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Completar “Minerar Sigmetal - 1/4 de Bravura, 3/4 de Idiotice!”. |
| Limitações ou bloqueios | O ferreiro só trabalha com sigmetal verificado; Thorin precisa provar a qualidade e cumprir pedidos narrativos (levar runas, soluções). |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Encontrar Ferreiro Para Armaduras - V Sigmetal
 +-- Cena 1: Distrito Comercial - Balastrus aponta a oficina antiga e explica o mito do Leviatã de Armadura.
        +-- Beat 1: Thorin pergunta sobre requisitos e a lenda explica que o ferreiro aceita apenas peças que contam com runas de proteção.
 +-- Cena 2: Oficina do Mestre Ferreiro
        +-- Beat 1: O ferreiro testa o sigmetal entregue e exige que Thorin resolva um problema mecânico antes.
        +-- Beat 2: Thorin escolhe como responder (mostrar fé, ajudar a oficina, levar artefatos).
        +-- Beat 3: Após cumprir o desafio, o mestre começa a forjar a armadura com sigmetal.
 +-- Cena 3: Entrega e reforço
 |      +-- Beat 1: Thorin recebe a armadura, mostra para Balastrus e explica o significado da ligação com o sigmetal.
 |      +-- Beat 2: A flag `v_reforco_sigmetal` ganha +50 pontos e o reforço é oficializado.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Lenda do Leviatã** | Balastrus apresenta o ferreiro e lembra que o sigmetal exige respeito. |
| 2 | **Ritual da Oficina** | Thorin prova qualidade, ajuda com um problema e pendura runas antes da forja. |
| 3 | **Entrega cerimonial** | O mestre entrega a armadura e a narrativa registra o reforço. |

#### Beats por Cena

##### Cena 1 - Lenda do Leviatã

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Indicação de Balastrus** | Balastrus descreve a lenda e os requisitos do ferreiro. | CS |
| **1-B - Decisão de abordagem** | Thorin escolhe preparar presente, explicar o sigmetal ou mostrar que pode proteger a oficina. | CHOICE |

##### Cena 2 - Ritual da Oficina

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Teste do minério** | O ferreiro verifica as propriedades do sigmetal com runas. | CS |
| **2-B - Desafio mecânico** | Thorin ajuda a ajustar engrenagens ou trazer amostras adicionais. | CS |
| **2-C - Forja da armadura** | O ferreiro trabalha; o jogador acompanha a sequência de ritmo leve. | JOG |

##### Cena 3 - Entrega cerimonial

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Balastrus confirma** | Balastrus e o ferreiro validam o resultado enquanto os soldados observam. | CS |
| **3-B - Flag ativada** | `v_reforco_sigmetal` soma +50 pontos e confirma a produção. | CS |
```
