# Quest: Semifinal

## 1. Visão Geral

* **Título interno:** semifinal
* **Premissa resumida:** Thorin acorda atrasado para a semifinal de “futebol rúnico”, supera a falta de equipamento, protagoniza a jogada decisiva e, no auge da comemoração, é interrompido pelos guardas enviados por seu pai.
* **Objetivo principal do jogador:** Ajudar Thorin a chegar ao estádio, garantir a vitória e vivenciar as consequências imediatas.
* **Emoção‑âncora:** urgência → triunfo → tensão.
* **Localizações centrais:** Casa de Thorin (Mapa 006), Entrada do Estádio (Mapa 014), Vestiário (Mapa 010), Gramado central (Mapa 012).
* **Personagens‑chave:** Thorin (protagonista), Dragobour (treinador), Jogadores do Time, Guardas Kilin/Mhordred/Tharok.

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| Variáveis globais | `v_q_semifinal_progress` (1 a 8, controla toda a quest), `v_q_vestiario_progress` (0 a 2, controla interações no gueg)                             |
| Plugins / Scripts | *MessageChoiceStyle*, Plugin de câmera suave, (minijogo “futebol rúnico” TBD)       |
| Restrições gerais | Texto de alto contraste; VO opcional; cutscenes ≤ 3 min totais                     |

## 3. Fluxo atualizado da variável `v_q_semifinal_progress`

* **1:** Início da quest.
* **2:** Chegada ao mapa do estádio.
* **3:** Após falar com Dragobour, recebe missão de pegar o Elmo.
* **4:** Pega o Elmo.
* **5:** Veste o Elmo e retorna ao treinador; segue para o campo.
* **6:** Cena da vitória e comemoração final.
* **7:** Conversa final com Dragobour na beira do campo; inicia cena dos guardas.
* **8:** Ao ser levado pelos guardas e trocar de mapa para o distrito residencial.

### 3.1 Fluxo atualizado da variável `v_q_vestiario_progress`

* **0:** Pode ativar a interação.
* **1:** Ativa a dinâmica do tapa na cara.
* **2:** O vestiário feminino passaa estar bloqueado

## 4. Cenas da Quest

### Cena 1 — “Pesadelo & Despertar de Sáparo” ✅

| Item                   | Detalhe                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin sonha com a mãe desaparecida; acorda quando Sáparo grita que ele está atrasado.                   |
| **Contexto Narrativo** | Quarto de Thorin (Mapa 006), madrugada avançando para amanhecer; luz fria e neblina fina.                |
| **Personagens**        | Thorin, Sáparo.                                                                                          |
| **Objetivo Dramático** | Introduzir legado materno, urgência e relação com o mascote.                                             |
| **Interatividade**     | Nenhuma — cutscene.                                                                                      |
| **Fluxo Cronológico**  | Entrada (sonho) → despertar/diálogo → saída para exterior.                                               |
| **Gatilhos**           | `v_q_semifinal_progress = 1`.                                                                            |
| **Assets**             | CG sonho da mãe; SFX coração/despertador.                                                                |
| **Integração**         | Mapa 006, Evento #002.                                                                                   |
| **Emoções‑chave**      | Saudade → Ansiedade → Determinação.                                                                      |
| **Restrições**         | ≤ 60 s de diálogo; acessível.                                                                            |

### Cena 2 — “Portão/Vestiário – Confronto com Dragobour & Capacete Lendário” ✅

| Item                   | Detalhe                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin chega atrasado; Dragobour barra sua entrada por falta de capacete; ele vasculha o vestiário e encontra o lendário capacete.      |
| **Contexto Narrativo** | Amanhecer nublado; Entrada do Estádio (Mapa 014) → Vestiário (Mapa 010).                                                                |
| **Personagens**        | Thorin, Dragobour, Jogadores coadjuvantes, NPC da ala feminina (gag).                                                                   |
| **Objetivo Dramático** | Reforçar disciplina de Dragobour; mostrar descuido de Thorin; conectar capacete ao passado do treinador.                                |
| **Interatividade**     | Exploração livre em 3 armários; cada erro gera comentário; gag da porta feminina (NPC dá tapa e bloqueia acesso ≤ 20 s).               |
| **Fluxo**              | Diálogo no portão → exploração → obtém/equipa capacete → retorna ao portão → entrada liberada.                                          |
| **Gatilhos**           | `v_q_semifinal_progress` vai de 2 até 5 conforme ações.                                                                                 |
| **Assets**             | Portraits Dragobour (2), sprite Thorin + capacete.                                                                                      |
| **Integração**         | Mapa 014 Evento #002; Mapa 010 Eventos #013‑015 (armários), #007 (gag).                                                                 |
| **Emoções‑chave**      | Pressa → Frustração → Humor → Confiança.                                                                                                |
| **Restrições**         | ≤ 90 s se acerto imediato; ≤ 3 min máximo.                                                                                              |

### Cena 3 — “Campo de Jogo – Jogada Final” ✅

| Item                   | Detalhe                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------                                            |
| **Resumo de Premissa** | Tutorial/minijogo de “futebol rúnico” que culmina no gol da vitória.                                                             |
| **Contexto Narrativo** | Campo de Futebol Rúnico (Mapa 009); arquibancadas vazias na lore atual.                                                         |
| **Personagens**        | Thorin, Dragobour (à margem), Jogadores adversários e aliados.                                                                   |
| **Objetivo Dramático** | Ensinar mecânica de combate; reforçar heroísmo.                                                                                  |
| **Interatividade**     | Minijogo por turnos (detalhes TBD).                                                                                              |
| **Fluxo**              | Entrada em campo → minijogo → slow‑mo do gol → comemoração curta.                                                                |
| **Gatilhos**           | `v_q_semifinal_progress = 6` após vitória.                                                                                       |
| **Assets**             | FX rúnico, câmera lenta no chute, BGM “Semifinal Beat”.                                                                          |
| **Integração**         | Plugin/script minijogo (TBD).                                                                                                    |
| **Emoções‑chave**      | Tensão → Excitação → Triunfo.                                                                                                    |
| **Restrições**         | Duração alvo ≤ 2 min.                                                                                                            |

### Cena 4 — “Intervenção dos Guardas” ✅

| Item                   | Detalhe                                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | No auge da comemoração, três guardas chegam com ordens de Tordan Forja‑Prata: escoltar Thorin imediatamente. Clima vira de triunfo para tensão, encerrando a quest num cliff‑hanger.                                               |
| **Contexto Narrativo** | Entrada do Estádio Machados Enferrujados (Mapa 014), fim da manhã.                                                                                                                            |
| **Personagens**        | Thorin, Kilin (porta‑voz), Mhordred, Tharok, Dragobour.                                                                                                                                     |
| **Objetivo Dramático** | Cortar êxtase da vitória, introduzir autoridade do pai e preparar gancho para próxima quest.                                                                                                  |
| **Interatividade**     | Escolha de resposta para Kilin (resignado ou irritado), afeta apenas flavor text futuro.                                                                                                      |
| **Fluxo**              | Conversa final com Dragobour → chegada dos guardas → escolha → escolta → troca de mapa.                                                                                                      |
| **Gatilhos**           | `v_q_semifinal_progress = 7` inicia cena; ao trocar de mapa, `v_q_semifinal_progress = 8`.                                                                                                   |
| **Assets**             | SFX passos metálicos, BGM “Tension Undercurrent”, portrait Kilin, fade‑to‑black.                                                                                                             |
| **Emoções‑chave**      | Surpresa → Injustiça → Resignação/Indignação.                                                                                                                                                |
| **Restrições**         | Cena ≤ 50 s; diálogo acessível.                                                                                                                                                              |

## 5. Pendências & Riscos

| ❓ Pendência                                      | Impacto | Próximo passo                |
| ------------------------------------------------ | ------- | ---------------------------- |
| Regras detalhadas do minijogo “futebol rúnico”   | Médio   | Definir turnos, HUD e plugin |
| Efeitos finais do gol (camera shake, partículas) | Baixo   | Validar performance e assets |

## 6. Histórico de Revisões

| Versão | Data       | Autor    | Mudança                                       |
| ------ | ---------- | -------- | --------------------------------------------- |
| 0.2    | 2025‑06‑13 | Curiosão | Documento reescrito com feedback de cenas 1‑5 |
| 0.5    | 2025‑07‑08 | Curiosão | Ajuste completo de variáveis, exclusão switches, revisão final |

## 7. Anotações Khawe

* Cena de luta com Kilin permanece como sugestão futura e não está documentada neste material técnico.
