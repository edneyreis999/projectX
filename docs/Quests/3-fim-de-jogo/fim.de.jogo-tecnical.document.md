# Quest: Fim de Jogo

## 1. Visão Geral

* **Título interno:** qFimDeJogo
* **Premissa resumida:** Após a semifinal, o pai de Thorin proíbe-o de jogar futebol rúnico; a quest cobre o embate familiar culminando numa escolha decisiva.
* **Objetivo principal do jogador:** Decidir se Thorin obedecerá ou desafiará o pai, definindo seu futuro imediato.
* **Emoção-âncora:** Tensão e indignação.
* **Localizações centrais:** Distrito Residencial (Mapa 007), Casa de Thorin – Cozinha e Quarto (Mapa 006).
* **Personagens chave:** Thorin (protagonista), Tordan Forja‑Prata (pai/antagonista).

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Switches globais  | `s_qFimDeJogo_started`, `s_qFimDeJogo_complete`, `s_FimDeJogo_DesafiaKilin`, `s_FimDeJogo_DesafiouPai` |
| Variáveis globais | `V_Q_FimDeJogo_Progress`                                                                               |
| Plugins / Scripts | N/A                                                                                                    |
| Restrições gerais | Hints padronizados; sem restrições de clima ou dublagem.                                               |

## 3. Cenas da Quest

### Cena 1 — “Chegada Constrangedora” ✅

| Item                   | Detalhe                                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Resumo de Premissa** | Thorin chega ao Distrito Residencial escoltado por guardas imperiais e, revoltado, entra em casa.                                                                                                                                                                                                                                                      |
| **Contexto Narrativo** | Exterior → Distrito Residencial (Mapa 007) até a porta da casa (Evento 002); horário fim de tarde; clima indiferente.                                                                                                                                                                                                                                  |
| **Personagens**        | Thorin, Kilin (guarda‑chefe).                                                                                                                                                                                                                                                                                                                          |
| **Objetivo Dramático** | Mostrar a vigilância dos guardas e a indignação de Thorin ao chegar em casa.                                                                                                                                                                                                                                                                           |
| **Interatividade**     | Quando Thorin alcança a porta, Kilin diz: “Acredite, Thorin. Também não gostamos de sempre ter que arrastá‑lo de volta para casa. Mas as ordens do seu pai são absolutas.” <br>Jogador escolhe uma de **duas respostas**: <br>• *Opção Respeitosa* → `s_FimDeJogo_DesafiaKilin = false` <br>• *Opção Desafiadora* → `s_FimDeJogo_DesafiaKilin = true`. |
| **Fluxo Cronológico**  | Player controla Thorin → diálogo com Kilin → entra na casa → cena termina.                                                                                                                                                                                                                                                                             |
| **Gatilhos**           | Start `V_Q_FimDeJogo_Progress = 0` (externo); End `V_Q_FimDeJogo_Progress = 1` (após entrar em casa).                                                                                                                                                                                                                                                  |
| **Assets**             | Retrato Kilin; SFX passos/metálicos.                                                                                                                                                                                                                                                                                                                   |
| **Integração**         | Mapa 007, Evento 002 (Porta Casa Thorin), Switch **`s_FimDeJogo_DesafiaKilin`**.                                                                                                                                                                                                                                                                       |
| **Emoções‑chave**      | Irritação → Resignação forçada.                                                                                                                                                                                                                                                                                                                        |
| **Restrições**         | ≤ 30 s de diálogo; acessível.                                                                                                                                                                                                                                                                                                                          |

### Cena 2 — “Confronto na Cozinha + Retiro ao Quarto” ✅ — “Confronto na Cozinha & Troféu” ✅

| Item                   | Detalhe                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin discute com Tordan na cozinha; foge ao quarto, encontra e pega o troféu de Melhor Jogador para provar seu valor.                      |
| **Contexto Narrativo** | Interior da Casa de Thorin (Mapa 006) — Cozinha → Quarto; horário interno indiferente.                                                       |
| **Personagens**        | Thorin, Tordan Forja‑Prata.                                                                                                                  |
| **Objetivo Dramático** | Escalar o conflito pai‑filho e reforçar a obstinação de Thorin.                                                                              |
| **Interatividade**     | Linear — sem escolhas de diálogo.                                                                                                            |
| **Fluxo Cronológico**  | Entra na cozinha (prog 1) → Diálogo acalorado → Thorin corre ao quarto → Encontra troféu (`prog 2`) → Pega troféu (`prog 3`) → Cena encerra. |
| **Gatilhos**           | Start `V_Q_FimDeJogo_Progress = 1`; Avanços `2/3`; End quando `V_Q_FimDeJogo_Progress = 3`.                                                  |
| **Assets**             | Modelo 3D do troféu; SFX porta/quebra de prato.                                                                                              |
| **Integração**         | Mapa 006, Evento #008 Tordan (cozinha), Evento #009 Troféu (quarto).                                                                         |
| **Emoções‑chave**      | Tensão → Choque → Indignação.                                                                                                                |
| **Restrições**         | Sem.                                                                                                                                         |

### Cena 3 — “Decisão Final & Epílogo” ✅

| Item                   | Detalhe                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin retorna à cozinha com o troféu; jogador decide obedecer ou desafiar o pai. Thorin depois vai dormir.                                                             |
| **Contexto Narrativo** | Casa de Thorin (Mapa 006) — Cozinha → Quarto/Cama.                                                                                                                      |
| **Personagens**        | Thorin, Tordan Forja‑Prata.                                                                                                                                             |
| **Objetivo Dramático** | Fechar o conflito e ramificar a narrativa de acordo com a escolha.                                                                                                      |
| **Interatividade**     | Ponto de decisão (Obedecer × Desafiar).                                                                                                                                 |
| **Fluxo Cronológico**  | Entra na cozinha (prog 3) → Diálogo → Escolha do jogador → Tordan reage → Thorin vai ao quarto → Dorme (Evento #013) → `prog 4`, switch de conclusão ON → Cena encerra. |
| **Gatilhos**           | Start `V_Q_FimDeJogo_Progress = 3`; Escolha define `s_FimDeJogo_DesafiouPai` = true/false; End `V_Q_FimDeJogo_Progress = 4` + `s_qFimDeJogo_complete`.                  |
| **Assets**             | Troféu; SFX porta fechando; fade‑out para preto.                                                                                                                        |
| **Integração**         | Mapa 006, Evento #008 Tordan, Evento #013 Cama.                                                                                                                         |
| **Emoções‑chave**      | Tensão decisiva → Alívio ou Frustração → Resignação.                                                                                                                    |
| **Restrições**         | Sem.                                                                                                                                                                    |

## 4. Pendências & Riscos

| ❓ Pendência | Impacto | Próximo passo |
| ----------- | ------- | ------------- |
| N/A         | —       | —             |

## 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança           |
| ------ | ---------- | -------- | ----------------- |
| 0.1    | 2025-06-14 | Curiosão | Documento inicial |

## 6. Anotações Khawe

* Thorin desafia Kilin durante a Quest "A Semifinal".
