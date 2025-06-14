# Compilado de tecnical documents

Compilado com todos os tecnicals documents de todas as missões

## Quest: A Noite da História

### 1. Visão Geral

* **Título interno:** Noite da História
* **Premissa resumida:** Durante o festival “Noite da História”, um jovem espectador alcança a primeira fileira diante de Theodore Reed, revela seu nome e é envolto por uma fumaça mágica que o transporta ao passado de Thorin.
* **Objetivo principal do jogador:** Atravessar a plateia, sentar‑se na primeira fileira e dizer seu nome a Reed.
* **Emoção-âncora:** Maravilha com leve urgência.
* **Localizações centrais:** Praça Central de Daratrine (Mapa ID 005)
* **Personagens chave:** Theodore Reed (narrador anão), Jogador‑criança (protagonista)

### 2. Configuração Técnica Global

| Item              | Valor / Descrição                                    |
| ----------------- | ---------------------------------------------------- |
| Switches globais  | N/A                                                  |
| Variáveis globais | `v_qNoite_progress` (0‑2), `v_player_name` (texto)   |
| Plugins / Scripts | Nenhum extra; lógica nativa do RPG Maker             |
| Restrições gerais | Cena ≤ 2 min (nome aceito) / ≤ 5 min (nome digitado) |

### 3. Cenas da Quest

#### Noite da História — Chegada & Conto

1. **Resumo de Premissa.** O protagonista se aproxima da fogueira, senta‑se à frente de Reed, diz seu nome e é encoberto por fumaça que inicia a narrativa.
2. **Contexto Narrativo.** Noite clara de outono; praça com grande fogueira central; palco simples diante das chamas.
3. **Personagens.** Theodore Reed (evento 017); Jogador‑criança; demais crianças (decorativos).
4. **Objetivo Dramático.** Curiosidade e assombro crescentes culminam na transição temporal.
5. **Interatividade.**

   * Evento “brilho azul” ID ‑18 (Player Touch): avança `v_qNoite_progress` para 1.
   * Evento 017 Reed (Action Button): sugere nome “João”; jogador confirma ou digita outro; define `v_player_name`; avança progress para 2.
6. **Fluxo Cronológico.** Entrada → tocar brilho azul → diálogo do nome → sopro de fumaça → fade/transfer.
7. **Gatilhos In‑game.** Ver item 5; transferência para a quest “A Semifinal” quando `v_qNoite_progress == 2`.
8. **Cutscenes & Assets.** Sprite Theodore Reed; sprite Jogador‑criança genérico.
9. **Integração Técnica.** Mapa 005; Evento ‑18; Evento 017; variáveis listadas; sem switches.
10. **Emoções‑chave.** Expectativa → Timidez → Susto bem‑humorado → Assombro.
11. **Restrições.** Cena ≤ 2 min (nome aceito) / ≤ 5 min (nome digitado).

### 4. Pendências & Riscos

| ❓ Pendência | Impacto | Próximo passo |
| ----------- | ------- | ------------- |
| N/A         | —       | —             |

### 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança           |
| ------ | ---------- | -------- | ----------------- |
| 0.1    | 2025‑06‑14 | Curiosão | Documento inicial |

## Quest: Semifinal

### 1. Visão Geral

* **Título interno:** semifinal
* **Premissa resumida:** Thorin acorda atrasado para a semifinal de “futebol rúnico”, supera a falta de equipamento, protagoniza a jogada decisiva e, no auge da celebração, tem a vitória ofuscada pela chegada de guardas enviados por seu pai.
* **Objetivo principal do jogador:** Ajudar Thorin a chegar ao estádio, garantir a vitória e vivenciar as consequências imediatas.
* **Emoção‑âncora:** urgência → triunfo → tensão.
* **Localizações centrais:** Casa de Thorin (Mapa 006), Entrada do Estádio (Mapa 014), Vestiário (Mapa 010), Gramado central (Mapa 012), Entrada do Estádio – área externa (para celebração).
* **Personagens‑chave:** Thorin (protagonista), Dragobour (treinador), Jogadores do Time, Guardas Kilin/Mhordred/Tharok.

### 2. Configuração Técnica Global

| Item              | Valor / Descrição                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| Switches globais  | `S_Q_Semifinal_Started`, `S_Q_Semifinal_Complete`                                   |
| Variáveis globais | `V_Q_Semifinal_Progress`                                                            |
| Plugins / Scripts | *MessageChoiceStyle*, Plugin de câmera suave, (minijogo “futebol rúnico” TBD)       |
| Restrições gerais | Texto de alto contraste; VO opcional apenas onde indicado; cutscenes ≤ 3 min totais |

### 3. Cenas da Quest

#### Cena 1 — “Pesadelo & Despertar de Sáparo” ✅

| Item                   | Detalhe                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin sonha com a mãe desaparecida (CG sonho da mãe); acorda quando Sáparo grita que ele está atrasado. |
| **Contexto Narrativo** | Quarto de Thorin (Mapa 006), madrugada avançando para amanhecer; luz fria e neblina fina.                |
| **Personagens**        | Thorin, Sáparo.                                                                                          |
| **Objetivo Dramático** | Introduzir legado materno, urgência e relação com o mascote.                                             |
| **Interatividade**     | Nenhuma — cutscene em game.                                                                              |
| **Fluxo Cronológico**  | Entrada (sonho) → despertar/diálogo → saída para exterior.                                               |
| **Gatilhos**           | Start `S_Q_Semifinal_Started`; End `V_Q_Semifinal_Progress = 1`.                                         |
| **Assets**             | CG sonho da mãe; SFX coração/despertador.                                                                |
 | **Integração**         | Mapa 006, Evento #002.                                                                                   |
| **Emoções‑chave**      | Saudade → Ansiedade → Determinação.                                                                      |
| **Restrições**         | ≤ 60 s de diálogo; acessível.                                                                            |

#### Cena 2 — “Portão/Vestiário – Confronto com Dragobour & Capacete Lendário” ✅

| Item                   | Detalhe                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin chega atrasado; Dragobour barra sua entrada por falta de capacete; ele vasculha o vestiário e encontra o lendário capacete.      |
| **Contexto Narrativo** | Amanhecer nublado; começa na Entrada do Estádio (Mapa 014) → Vestiário (Mapa 010).                                                      |
| **Personagens**        | Thorin, Dragobour, Jogadores coadjuvantes, NPC da ala feminina (gag).                                                                   |
| **Objetivo Dramático** | Reforçar disciplina de Dragobour; mostrar descuido de Thorin; conectar capacete ao passado do treinador.                                |
| **Interatividade**     | Exploração livre em 3 armários; cada erro gera comentário; gag da porta feminina (NPC dá tapa e bloqueia acesso; bloqueio dura ≤ 20 s). |
| **Fluxo**              | Diálogo no portão → exploração → obtém/equipa capacete → retorna ao portão → entrada liberada.                                          |
| **Gatilhos**           | `V_Q_Semifinal_Progress` 1→2 (obtém capacete) →3 (retorna ao portão).                                                                   |
| **Assets**             | Portraits Dragobour (2), sprite Thorin + capacete.                                                                                      |
| **Integração**         | Mapa 014 Evento #002; Mapa 010 Eventos #013‑015 (armários), #007 (gag).                                                                 |
| **Emoções‑chave**      | Pressa → Frustração → Humor → Confiança.                                                                                                |
| **Restrições**         | ≤ 90 s se acerto de 1ª; ≤ 3 min máximo.                                                                                                 |

#### Cena 3 — “Campo de Jogo – Jogada Final” ✅

| Item                   | Detalhe                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------                                            |
| **Resumo de Premissa** | Tutorial/minijogo de “futebol rúnico” que culmina no gol da vitória.                                                             |
| **Contexto Narrativo** | Campo de Futebol Rúnico (Mapa 009); arquibancadas vazias na lore atual (som ambiente mínimo).                                    |
| **Personagens**        | Thorin, Dragobour (à margem), Jogadores adversários e aliados.                                                                   |
| **Objetivo Dramático** | Ensinar mecânica de combate; reforçar heroísmo.                                                                                  |
| **Interatividade**     | Minijogo por turnos (detalhes TBD).                                                                                              |
| **Fluxo**              | Entrada em campo → turnos do minijogo → slow‑mo do gol → comemoração curta.                                                      |
| **Gatilhos**           | `V_Q_Semifinal_Progress = 4` no gol. (a principio só seta essa variavel, e boa)                                                  |
| **Assets**             | FX rúnico, câmera lenta no chute, BGM “Semifinal Beat”.                                                                          |
| **Integração**         | Plugin/script minijogo (TBD).                                                                                                    |
| **Emoções‑chave**      | Tensão → Excitação → Triunfo.                                                                                                    |
| **Restrições**         | Duração alvo ≤ 2 min.                                                                                                            |

#### Cena 4 — “Entrada do Estádio – Celebração” ✅

| Item                   | Detalhe                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Logo após o gol, Thorin e seu time recebem o troféu na entrada do estádio, celebrando a vitória longe do público. |
| **Contexto Narrativo** | Exterior do Estádio Machados Enferrujados (Mapa 014, área externa), luz solar plena, sem torcida.                 |
| **Personagens**        | Thorin, Dragobour, Jogadores do Time;                                                                             |
| **Objetivo Dramático** | Concretizar o triunfo de Thorin; criar contraste antes da intervenção dos guardas.                                |
| **Interatividade**     | Jogador escolhe gesto: **aceno** ou **erguer troféu** — reação limitada dos colegas; sem impacto mecânico maior.  |
| **Fluxo**              | Corte do campo → Dragobour entrega troféu → escolha de gesto → team‑huddle rápido.                                |
| **Gatilhos**           | Start `V_Q_Semifinal_Progress = 4`; End `V_Q_Semifinal_Progress = 5`, item `I_Trofeu_Semifinal` recebido.         |
| **Integração**         | Mapa 014 Evento #010 (cerimônia); switch `S_ShowTrophy`.                                                          |
| **Emoções‑chave**      | Orgulho → Alegria → Expectativa.                                                                                  |
| **Restrições**         | Cena ≤ 45 s; sem confetti FX; acessível.                                                                          |

### Cena 5 — “Intervenção dos Guardas” ✅

| Item                      | Detalhe                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Resumo de Premissa** | No auge da comemoração, três guardas — **Kilin**, **Mhordred** e **Tharok** — aparecem com ordens de **Tordan Forja‑Prata**: escoltar Thorin imediatamente. O clima vira de triunfo para tensão, encerrando a quest num cliff‑hanger. |
| **2. Contexto Narrativo** | Entrada do Estádio Machados Enferrujados (Mapa 014), fim da manhã; ecos distantes da celebração terminam abruptamente com a chegada dos guardas.                                                                                      |
| **3. Personagens**        | Thorin (protagonista), **Kilin** (porta‑voz veterano, Evento #005), **Mhordred** (robusto, Evento #014), **Tharok** (jovem nervoso, #Evento #013), Dragobour (tenta intervir, Evento #002).                                            |
| **4. Objetivo Dramático** | ◉ Cortar o êxtase da vitória.<br>◉ Introduzir a autoridade coercitiva do pai.<br>◉ Criar gancho narrativo para a próxima quest.                                                                                                       |
| **5. Interatividade**     | Cena quase não interativa; o jogador escolhe **uma de duas respostas** para Kilin:<br>  • *Resignado*: “Tudo bem… eu vou.”<br>  • *Irritado*: “Não sou prisioneiro!”<br>Escolha afeta apenas *flavor text* futuro.                    |
| **6. Fluxo Cronológico**  | **Entrada:** Guardas adentram marchando; Dragobour protesta.<br>**Evolução:** Diálogo tenso; Thorin entrega o troféu a Filena; escolhe resposta.<br>**Saída:** Guardas escoltam Thorin para fora — fade‑out, seta para próxima quest. |
| **7. Gatilhos In‑game**   | Start: `V_Q_Semifinal_Progress = 5`.<br>End: `V_Q_Semifinal_Progress = 6`, `S_Q_Semifinal_Complete = ON`.                                                                                                                             |
| **8. Cutscenes & Assets** | • SFX passos metálicos sincronizados.<br>• BGM “Tension Undercurrent”.<br>• Portrait de Kilin (austero).<br>• Fade‑to‑black final.                                                                                                    |
| **10. Emoções‑chave**     | Surpresa → Injustiça → Resignação/Indignação (dependendo da escolha).                                                                                                                                                                 |
| **11. Restrições**        | Cena ≤ 50 s; diálogo acessível; escolha de tom sem alterar rota principal.                                                                                                                                                            |

### 4. Pendências & Riscos

| ❓ Pendência                                      | Impacto | Próximo passo                |
| ------------------------------------------------ | ------- | ---------------------------- |
| Regras detalhadas do minijogo “futebol rúnico”   | Médio   | Definir turnos, HUD e plugin |
| Efeitos finais do gol (camera shake, partículas) | Baixo   | Validar performance e assets |
| Cena 5 detalhamento completo                     | Alto    | Elaborar próxima iteração    |

### 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança                                       |
| ------ | ---------- | -------- | --------------------------------------------- |
| 0.2    | 2025‑06‑13 | Curiosão | Documento reescrito com feedback de cenas 1‑5 |

## Quest: Fim de Jogo

### 1. Visão Geral

* **Título interno:** qFimDeJogo
* **Premissa resumida:** Após a semifinal, o pai de Thorin proíbe-o de jogar futebol rúnico; a quest cobre o embate familiar culminando numa escolha decisiva.
* **Objetivo principal do jogador:** Decidir se Thorin obedecerá ou desafiará o pai, definindo seu futuro imediato.
* **Emoção-âncora:** Tensão e indignação.
* **Localizações centrais:** Distrito Residencial (Mapa 007), Casa de Thorin – Cozinha e Quarto (Mapa 006).
* **Personagens chave:** Thorin (protagonista), Tordan Forja‑Prata (pai/antagonista).

### 2. Configuração Técnica Global

| Item              | Valor / Descrição                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Switches globais  | `s_qFimDeJogo_started`, `s_qFimDeJogo_complete`, `s_FimDeJogo_DesafiaKilin`, `s_FimDeJogo_DesafiouPai` |
| Variáveis globais | `V_Q_FimDeJogo_Progress`                                                                               |
| Plugins / Scripts | N/A                                                                                                    |
| Restrições gerais | Hints padronizados; sem restrições de clima ou dublagem.                                               |

### 3. Cenas da Quest

#### Cena 1 — “Chegada Constrangedora” ✅

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

#### Cena 2 — “Confronto na Cozinha + Retiro ao Quarto” ✅ — “Confronto na Cozinha & Troféu” ✅

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

#### Cena 3 — “Decisão Final & Epílogo” ✅

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

### 4. Pendências & Riscos

| ❓ Pendência | Impacto | Próximo passo |
| ----------- | ------- | ------------- |
| N/A         | —       | —             |

### 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança           |
| ------ | ---------- | -------- | ----------------- |
| 0.1    | 2025-06-14 | Curiosão | Documento inicial |

## Quest: É Hora de Crescer

### 1. Visão Geral

* **Título interno:** q\_horadecrescer
* **Premissa resumida:** Após acordar de um pesadelo sobre sua mãe, Thorin é escoltado por três guardas para comprar sua primeira armadura e ser entregue a Balastrus.
* **Objetivo principal do jogador:** Equipar a cota de malha de prata e chegar à taverna onde começará como aprendiz de minerador.
* **Emoção-âncora:** Urgência com leve humor.
* **Localizações centrais:** Casa de Thorin (Mapa 006), Distrito Comercial de Gildrat (Mapa 008), Loja Martelo & Malha (Mapa 013), Taverna de Balastrus (Mapa 012).
* **Personagens chave:** Thorin (protagonista), Sáparo (mascote), Mãe (sequência onírica), Kilin (guarda), Mhordred (guarda), Tharok (guarda), Lojista (NPC), Balastrus (referência).

### 2. Configuração Técnica Global

| Item              | Valor / Descrição                                        |
| ----------------- | -------------------------------------------------------- |
| Switches globais  | N/A                                                      |
| Variáveis globais | `V_Q_HoraDeCrescer_Progress` (0–4)                       |
| Plugins / Scripts | Common Event `0003` (verifica armadura equipada)         |
| Restrições gerais | Cut‑scenes podem ser puladas; áudio + legendas; sem QTEs |

### 3. Cenas da Quest

#### Cena 1 – Pesadelo & Despertar Apressado

* **Resumo de Premissa:** Thorin sonha com a mãe avisando que o tempo está se esgotando; acorda sobressaltado e Sáparo o chama.
* **Contexto Narrativo:** Quarto de Thorin, Mapa 006, madrugada avançando para amanhecer.
* **Personagens:** Thorin, Sáparo, Mãe (fade + texto).
* **Objetivo Dramático:** Reforçar vínculo materno e senso de urgência.
* **Interatividade:** Cut‑scene até o despertar; controle retorna ao jogador imediatamente.
* **Fluxo Cronológico:** Sonho → fade + texto → despertar → diálogo rápido → controle ao jogador.
* **Gatilhos In‑game:** Start no evento‑cama ID 013; ao acordar `V_Q_HoraDeCrescer_Progress = 1`.
* **Integração Técnica:** Evento‑cama ID 013; sem evento na porta.
* **Emoções‑chave:** Angústia → Urgência → Determinação.
* **Restrições:** ≤ 40 s de diálogos; sem QTEs.

#### Cena 2 – Comboio até a Loja Martelo & Malha

* **Resumo de Premissa:** Thorin é escoltado até a loja, participa de um minievento de compra com escolhas cômicas, equipa manualmente a armadura e segue até a taverna; guardas ficam do lado de fora.
* **Contexto Narrativo:** Manhã nublada em Gildrat (Mapa 008) → interior da loja (Mapa 013) → fachada da taverna (Mapa 012).
* **Personagens:** Thorin; Kilin, Mhordred, Tharok; Lojista.
* **Objetivo Dramático:** Aliviar tensão com humor e marcar o “ritual” da primeira armadura.
* **Interatividade:** Escoltas on‑rails + minievento com três escolhas: “Determinado”, “Esquivar (de comprar)”, “Fugir”. Mhordred paga em todas. Jogador equipa a armadura via menu (verificado pelo CE 0003).
* **Fluxo Cronológico:** Saída da casa → caminhada (008) → entrada loja → minievento → jogador equipa → caminhada → porta taverna → fim.
* **Gatilhos In‑game:**

  * `V_Q_HoraDeCrescer_Progress = 1` – Ao sair de casa.
  * `V_Q_HoraDeCrescer_Progress = 2` – Ao entrar na loja.
  * `V_Q_HoraDeCrescer_Progress = 3` – Após equipar a armadura (CE 0003).
  * `V_Q_HoraDeCrescer_Progress = 4` – Ao entrar na taverna (Evento‑porta EV 024).
* **Integração Técnica:** Evento‑loja EV 037; porta da taverna EV 024; Common Event 0003 para verificação de equipamento.
* **Emoções‑chave:** Desconforto → Humor → Alívio/Expectativa.
* **Restrições:** Cena ≤ 3 min; diálogos acessíveis; sem QTEs.

### 4. Pendências & Riscos

| ❓ Pendência                            | Impacto | Próximo passo                              |
| -------------------------------------- | ------- | ------------------------------------------ |
| Texto exato da fala da mãe no pesadelo | Baixo   | Definir linhas durante escrita de diálogos |

### 5. Histórico de Revisões

| Versão | Data       | Autor         | Mudança           |
| ------ | ---------- | ------------- | ----------------- |
| 0.1    | 2025-06-14 | Narrative Bot | Documento inicial |
