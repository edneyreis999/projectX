# Narrative Structure Document (NSD) - Encontrar Ferreiro Para Armas

## Quest: Encontrar Ferreiro Para Armas - V Sigmetal

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Encontrar Ferreiro Para Armas
- Importancia na campanha: transforma o sigmetal em armas superiores que equilibram o conflito contra os Ignotos
- Arco narrativo: vínculo entre forjaria e guerra, legado familiar e exigência de qualidade
- Objetivo narrativo global: localizar o ferreiro conhecido como “Bafo do Dragão”, convencê-lo a aceitar sigmetal e produzir uma arma
- Premissa resumida: Balastrus direciona Thorin ao mestre ferreiro com história antiga; Thorin deve provar a pureza do minério e cumprir um teste para obter uma arma sigmetal

- Locais principais
  - Distrito Comercial
  - Oficina do Bafo do Dragão
- NPCs principais
  - Thorin
  - Balastrus
  - Mestre Ferreiro Bafo do Dragão

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Completar “Minerar Sigmetal - 1/4 de Bravura, 3/4 de Idiotice!”. |
| Limitações ou bloqueios | O ferreiro exige que o sigmetal venha acompanhado de uma runa de proteção e que o jogador ajude em uma tarefa antes da forja. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Encontrar Ferreiro Para Armas - V Sigmetal
 +-- Cena 1: Distrito Comercial - Balastrus fala sobre o Bafo do Dragão e o valor das armas sigmetal.
        +-- Beat 1: Thorin aceita a missão e segue para a oficina.
 +-- Cena 2: Oficina do Bafo do Dragão
        +-- Beat 1: O ferreiro testa o sigmetal e explica o desafio mecânico que precisa ser resolvido.
        +-- Beat 2: Thorin escolhe como agrupar as runas de proteção ou ajustar os fornos.
        +-- Beat 3: O mestre começa a moldar a arma com o sigmetal enquanto o jogador acompanha o ritmo de forja.
 +-- Cena 3: Entrega e reforço
 |      +-- Beat 1: Balastrus avalia a arma final e destaca seu valor estratégico.
 |      +-- Beat 2: A flag `v_reforco_sigmetal` recebe +50 pontos e a arma é celebrada com a Guarda.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandido) |
| --- | --- | --- |
| 1 | **Caminho para o Dragão** | Thorin segue Balastrus até a oficina e ouve as histórias da família de ferreiros. |
| 2 | **Ritual da Forja** | O Bafo do Dragão testa o minério, impõe um desafio e começa a martelar a arma. |
| 3 | **Arma recém-forjada** | O produto final é apresentado e a flag é ativada junto a Balastrus. |

#### Beats por Cena

##### Cena 1 - Caminho para o Dragão

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Histórias de Gildrat** | Balastrus narra a reputação familiar dos ferreiros. | CS |
| **1-B - Escolha de abordagem** | Jogador decide negociar com respeito, apresentar a família ou mostrar o sigmetal diretamente. | CHOICE |

##### Cena 2 - Ritual da Forja

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Teste do minério** | O ferreiro analisa o sigmetal e explica a runa necessária. | CS |
| **2-B - Desafio mecânico** | Thorin resolve um problema do forge ou ajuda a preparar as fornalhas. | CS |
| **2-C - Ritmo de forja** | Jogador acompanha uma sequência rítmica enquanto a arma é moldada. | JOG |

##### Cena 3 - Arma recém-forjada

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Avaliação** | Balastrus e o mestre confirmam a arma; a Guarda celebra. | CS |
| **3-B - Flag ativada** | `v_reforco_sigmetal` soma +50 pontos e garante reforço narrativo. | CS |
```
