# 🎮 Narrative Structure Document (NSD) – Fase Final

## Map008 – Tordan e o Perdão

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [ ] Em andamento
- **Importância na campanha**: estabelece o choque emocional antes de entrar na cadeia de combate dos Ignotos.
- **Arco narrativo**: Reconciliação precedendo a ação; prepara Thorin para aceitar o peso de sua missão.
- **Conflito central**: Tordan admite que errou ao sufocar o sonho do filho, mas Thorin precisa decidir se perdoa e aceita a jornada — o perdão simboliza a superação da tensão familiar.
- **Objetivo narrativo global**: deixar claro que a relação pai/filho evolui para algo cooperativo e amarrar o jogador à patrulha que abre a próxima quest.
- **Premissa resumida**: Event 008 (Page 8) apresenta o diálogo íntimo em casa dos Tordan; Event 005 (Page 4) mostra Thorin se levantando, ajustando equipamentos e saindo de casa para cumprir o chamado.

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

| Tipo | Descrição |
| --- | --- |
| **Flags / Decisões anteriores** | `v_trofeu_quebrado = 1` mostra que a quest anterior terminou; `v_tordan_dialog` ativa o evento em Map008. |
| **Limitações ou bloqueios** | Sem combates; a sequência depende da escolha de resposta (perdão ou silêncio). |

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

| Cena | Beat principal | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Pedido de Perdão | Tordan confessa culpa e coloca o perdão nas mãos de Thorin. | 🎬 |
| 2 | Preparação para Patrulha | Thorin retoma o controle, ajusta equipamentos e parte; a escolha da cutscene ajusta o tom da marcha. | 🎮 |

### 4️⃣ Beats por Cena

#### Cena 1 – Pedido de Perdão (Event 008)

| # | Nome do Beat | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Tordan expõe o arrependimento | Balastrus saiu; Tordan fala sobre Mélia, culpa e a chance de reparar. | 🎬 |
| 2 | Escolhas do jogador | Thorin pode reagir: “Eu nunca vou confiar em você” (silêncio) ou “Entendo, pai” (perdão); a decisão do jogador apenas altera o tom da fala seguinte. | 🎬 |

#### Cena 2 – Preparação para Patrulha (Event 005)

| # | Nome do Beat | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Thorin se levanta | O jogador retoma o controle; Thorin guarda o equipamento, confere armas e reafirma o objetivo. | 🎮 |
| 2 | Saída para a patrulha | Thorin caminha silenciosamente para o ponto de encontro com o grupo de defesa; a trilha sonora muda para tons firmes. | 🎮 |

### 5️⃣ Pós-condições e notas

- Flags ativadas: `v_tordan_perdao` (depende da escolha), `v_patrulha_inicio = 1`.
- O perdão influencia diálogos futuros com Tordan.

---

## Map021 – Defesa de Gildrat

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [ ] Em andamento
- **Importância na campanha**: reforça o senso de urgência em Gildrat e justifica a transição para operações de escala maior.
- **Arco narrativo**: Resistência coletiva sob pressão.
- **Conflito central**: o grupo de defesa (Balastrus, Filena, Kilin e aliados) percebe que conter os Ignotos exige coordenação e sacrifícios.
- **Objetivo narrativo global**: mostrar a tensão tática antes da travessia e validar a próxima cadeia de quests.
- **Premissa resumida**: Event 001 em Map021 é uma cutscene do conselho de defesa; os líderes avaliam perdas, debatem recursos e definem patrulhas para conter a invasão.

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

| Tipo | Descrição |
| --- | --- |
| **Flags / Decisões anteriores** | `v_gildrat_defesa = 1`; a detecção dos Ignotos já ocorreu e a cidade está em estado de alerta. |
| **Limitações ou bloqueios** | Sequência CS; o jogador observa, sem controle. |

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

| Cena | Beat principal | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Conselho em Gildrat | Discussão entre líderes sobre estratégias e recursos. | 🎬 |

### 4️⃣ Beats por Cena

#### Cena 1 – Conselho em Gildrat

| # | Nome do Beat | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Balastrus orienta | Usa o mapa tático, destaca fraquezas e pede reforços para segurar o corredor sul. | 🎬 |
| 2 | Filena e Kilin respondem | Filena lembra o custo humano; Kilin reforça que os Ignotos não dão trégua. | 🎬 |
| 3 | Plano preliminar | Decidem patrulhas, ajustes e mandam Thorin seguir; a cutscene encerra com o grupo saindo. | 🎬 |

### 5️⃣ Pós-condições

- `v_defesa_conselho = 1`; o próximo beat é Map053.

---

## Map053 – Travessia pelos Ignotos

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [ ] Em andamento
- **Importância**: estabelece o ritmo de combate e prepara o jogador para o chefe final.
- **Arco narrativo**: Confronto tático e resistência.
- **Conflito central**: Thorin limpa o corredor enfrentando ondas de Ignotos e precisa lidar com pressões de tempo.
- **Objetivo narrativo global**: garantir que o jogador domine movimentação e uso de habilidades antes do chefe.
- **Premissa resumida**: Map053 traz confrontos contínuos jogáveis com spawns de Ignotos até liberar a passagem para Map054.

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

| Tipo | Descrição |
| --- | --- |
| **Flags / Decisões anteriores** | `v_caminho_ignotos = 1`; Kilin autorizou a travessia após o conselho em Map021. |
| **Limitações ou bloqueios** | Reforços surgem após cada onda; a progressão depende de derrotar grupos completos. |

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

| Cena | Beat principal | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Corredor dos Ignotos | Thorin enfrenta ondas, ativa gatilhos e alcança o checkpoint final. | 🎮 |

### 4️⃣ Beats por Cena

#### Cena 1 – Corredor dos Ignotos

| # | Nome do Beat | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Ondas sucessivas | Ignotos surgem em sequência; o jogador precisa esquivar, usar habilidades e manter o ritmo. | 🎮 |
| 2 | Checkpoint intermediário | Ao vencer a última onda, um fade confirma o checkpoint e desbloqueia Map054. | 🎬 |

### 5️⃣ Pós-condições

- `v_corredor_limpo = 1`; a transição leva diretamente ao combate do chefe em Map054.

---

## Map054 – Confronto com o Chefe Ignoto

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [ ] Em andamento
- **Importância**: encerra a cadeia atual e eleva a ameaça dos Ignotos.
- **Arco narrativo**: Superação e sacrifício final.
- **Conflito central**: Thorin enfrenta o chefe em arena única; as decisões anteriores são testadas.
- **Objetivo narrativo global**: demonstrar que o grupo pode sobreviver à crise crescente e abrir espaço para o próximo arco.
- **Premissa resumida**: Map054 coloca Thorin frente a frente com o chefe; há entrada cinematográfica, combate principal e finalização que leva ao próximo segmento narrativo.

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

| Tipo | Descrição |
| --- | --- |
| **Flags / Decisões anteriores** | `v_boss_ignoto = 1`; o jogador chegou ao mapa após limpar Map053. |
| **Limitações ou bloqueios** | Combate sem pausa; checkpoints apenas após a vitória. |

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

| Cena | Beat principal | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Arena final do chefe | Entrada cinematográfica, duelo intenso e encerramento comemorando a vitória. | 🎮/🎬 |

### 4️⃣ Beats por Cena

#### Cena 1 – Arena Final do Chefe

| # | Nome do Beat | Descrição | Controle |
| --- | --- | --- | --- |
| 1 | Entrada do chefe | CS: fade revela o chefe e o ambiente antes de liberar o controle. | 🎬 |
| 2 | Combate core | JOG: Thorin usa habilidades defensivas e ofensivas para sobreviver ao padrão agressivo. | 🎮 |
| 3 | Finalização e surto | CS: close em Thorin após a vitória, abrindo o próximo segmento narrativo. | 🎬 |

### 5️⃣ Pós-condições

- `v_boss_ignoto_derrotado = 1`; abre caminho para a próxima quest narrativa.
`*** End Patch"}
