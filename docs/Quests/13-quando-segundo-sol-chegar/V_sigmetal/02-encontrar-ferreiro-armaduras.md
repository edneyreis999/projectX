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

##### Cena 1 - O Ferreiro

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Forja Ativa** | O ferreiro registra o uso do Sigmetal, o bônus adquirido e permite voltar depois. | CS |
| **1-B - Escolha** | Thorin decide, ou não, reforçar armaduras. | CS |
| **1-B-a - Escolha** | Thorin decide reforçar armaduras. | CHOICE |
| **1-B-b - Escolha** | Thorin decide não reforçar armaduras. | CHOICE |

##### Cena 2 - Forja

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Armaduras reforçadas** | O ferreiro reeforça as armaduras utilizando 5 sigmetals de Thorin. | CS |

##### Cena 3 - Armaduras Reforçadas

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Entrega completa** | Ferreiro confirma que as armaduras reforçadas já estão prontas. | CS |
```
