# Narrative Structure Document (NSD) - Coletar Sigmetal na Câmara Revelada

## Quest: Coletar Sigmetal - V Sigmetal

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Coletar Sigmetal na Câmara Revelada
- Importancia na campanha: revela o depósito proibido de sigmetal lilás e dá a Gildrat uma vantagem concreta contra os Ignotos
- Arco narrativo: confiança em Balastrus, ligação com Filena e exploração de um recurso narrativamente raro
- Objetivo narrativo global: usar as dinamites de Balastrus para abrir a câmara e reunir amostras suficientes para reforçar novas armas
- Premissa resumida: Thorin recebe a direção de Balastrus, parte para Kravens, coleta dez amostras de sigmetal e retorna com Filena para provar o potencial do minério.

- Locais principais
  - Estrada do Cão-luar
  - Câmara revelada em Kravens
- NPCs principais
  - Thorin
  - Balastrus
  - Filena
  - Mineiros de Kravens

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Abertura dos arcos de Balastrus e a transferência das dinamites em Cena 10b. |
| Limitações ou bloqueios | A entrada está selada por rocha e exige planejamento prévio; a carga de amostras precisa de proteção até a saída. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Coletar Sigmetal - V Sigmetal
 +-- Cena 1: Estrada do Cão-luar - Balastrus entrega dinamites e reforça o valor do sigmetal lilás.
        +-- Beat 1: Thorin aceita a missão e planeja a rota segura.
 +-- Cena 2: Câmara revelada - Thorin explora Kravens, evita armadilhas e coleta 10 minérios.
        +-- Beat 1: O jogador localiza a veia brilhante e posiciona dinamites.
        +-- Beat 2: Thorin executa a sequência de mineração com precisão para preservar a liga.
        +-- Beat 3: Filena ajuda a transportar as amostras até o ponto seguro.
 +-- Cena 3: Retorno a Balastrus
 |      +-- Beat 1: Balastrus e Filena testam a liga e confirmam a pureza.
 |      +-- Beat 2: A flag `v_sigmetal` é ativada e novas linhas de reforço são liberadas.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Plano do Balastrus** | Ele reforça a importância do sigmetal e entrega os explosivos. |
| 2 | **Exploração da câmara** | A equipe chega ao depósito, coleta o minério e protege a carga. |
| 3 | **Teste e reforço** | Os minérios são avaliados e a flag registra o reforço narrativo. |

#### Beats por Cena

##### Cena 1 - Pedido de Balastrus

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Coletar Sigmetal** | Balastrus pede 10 Sigmetal extras antes de voltar para reforçar a guarda. | CS |
| **1-A-a - Coletar** | Thorin aceita coletar o sigmetal. | CHOICE |
| **1-A-b - Agora não** | Thorin não aceita coletar o sigmetal. | CHOICE |

##### Cena 2 - Procurando Sigmetal

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Deslocamento** | O jogador sai em busca do Sigmetal rumo à mina Kravens. | JOG |
| **2-B - Explodir parede** | Thorin explode a parede da mina e descobre uma passagem. | CS |
| **2-C - A Coleta** | Thorin minera a quantia necessária de Sigmetal. | JOG |

##### Cena 3 - Teste e reforço

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Volta para Gildrat** | Thorin volta para Gildrat falar com Balastrus. | JOG |
| **3-B - Sigetal Coletado** | Balastrus parabeniza Thorin pela coleta. | CS |
| **3-C - Procurar Ferreiros** | Balastrus manda levar o Sigmetal aos ferreiros para reforçar a defesa. | CS |

