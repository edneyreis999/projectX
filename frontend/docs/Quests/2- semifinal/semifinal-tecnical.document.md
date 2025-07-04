# Quest: Semifinal

## 1. Visão Geral

* **Título interno:** semifinal
* **Premissa resumida:** Thorin acorda atrasado para a semifinal de “futebol rúnico”, supera a falta de equipamento, protagoniza a jogada decisiva e, no auge da celebração, tem a vitória ofuscada pela chegada de guardas enviados por seu pai.
* **Objetivo principal do jogador:** Ajudar Thorin a chegar ao estádio, garantir a vitória e vivenciar as consequências imediatas.
* **Emoção‑âncora:** urgência → triunfo → tensão.
* **Localizações centrais:** Casa de Thorin (Mapa 006), Entrada do Estádio (Mapa 014), Vestiário (Mapa 010), Gramado central (Mapa 012), Entrada do Estádio – área externa (para celebração).
* **Personagens‑chave:** Thorin (protagonista), Dragobour (treinador), Jogadores do Time, Guardas Kilin/Mhordred/Tharok.

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                                                   |
| ----------------- | ----------------------------------------------------------------------------------- |
| Switches globais  | `S_Q_Semifinal_Started`, `S_Q_Semifinal_Complete`                                   |
| Variáveis globais | `V_Q_Semifinal_Progress`                                                            |
| Plugins / Scripts | *MessageChoiceStyle*, Plugin de câmera suave, (minijogo “futebol rúnico” TBD)       |
| Restrições gerais | Texto de alto contraste; VO opcional apenas onde indicado; cutscenes ≤ 3 min totais |

## 3. Cenas da Quest

### Cena 1 — “Pesadelo & Despertar de Sáparo” ✅

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

### Cena 2 — “Portão/Vestiário – Confronto com Dragobour & Capacete Lendário” ✅

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

### Cena 3 — “Campo de Jogo – Jogada Final” ✅

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

### Cena 4 — “Entrada do Estádio – Celebração” ✅

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

## Cena 5 — “Intervenção dos Guardas” ✅

| Item                      | Detalhe                                                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Resumo de Premissa** | No auge da comemoração, três guardas — **Kilin**, **Mhordred** e **Tharok** — aparecem com ordens de **Tordan Forja‑Prata**: escoltar Thorin imediatamente. O clima vira de triunfo para tensão, encerrando a quest num cliff‑hanger. |
| **2. Contexto Narrativo** | Entrada do Estádio Machados Enferrujados (Mapa 014), fim da manhã; ecos distantes da celebração terminam abruptamente com a chegada dos guardas.                                                                                      |
| **3. Personagens**        | Thorin (protagonista), **Kilin** (porta‑voz veterano, Evento #005), **Mhordred** (robusto, Evento #014), **Tharok** (jovem nervoso, Evento #013), Dragobour (tenta intervir, Evento #002).                                            |
| **4. Objetivo Dramático** | ◉ Cortar o êxtase da vitória.<br>◉ Introduzir a autoridade coercitiva do pai.<br>◉ Criar gancho narrativo para a próxima quest.                                                                                                       |
| **5. Interatividade**     | Cena quase não interativa; o jogador escolhe **uma de duas respostas** para Kilin:<br>  • *Resignado*: “Tudo bem… eu vou.”<br>  • *Irritado*: “Não sou prisioneiro!”<br>Escolha afeta apenas *flavor text* futuro.                    |
| **6. Fluxo Cronológico**  | **Entrada:** Guardas adentram marchando; Dragobour protesta.<br>**Evolução:** Diálogo tenso; Thorin entrega o troféu a Filena; escolhe resposta.<br>**Saída:** Guardas escoltam Thorin para fora — fade‑out, seta para próxima quest. |
| **7. Gatilhos In‑game**   | Start: `V_Q_Semifinal_Progress = 5`.<br>End: `V_Q_Semifinal_Progress = 6`, `S_Q_Semifinal_Complete = ON`.                                                                                                                             |
| **8. Cutscenes & Assets** | • SFX passos metálicos sincronizados.<br>• BGM “Tension Undercurrent”.<br>• Portrait de Kilin (austero).<br>• Fade‑to‑black final.                                                                                                    |
| **10. Emoções‑chave**     | Surpresa → Injustiça → Resignação/Indignação (dependendo da escolha).                                                                                                                                                                 |
| **11. Restrições**        | Cena ≤ 50 s; diálogo acessível; escolha de tom sem alterar rota principal.                                                                                                                                                            |

## 4. Pendências & Riscos

| ❓ Pendência                                      | Impacto | Próximo passo                |
| ------------------------------------------------ | ------- | ---------------------------- |
| Regras detalhadas do minijogo “futebol rúnico”   | Médio   | Definir turnos, HUD e plugin |
| Efeitos finais do gol (camera shake, partículas) | Baixo   | Validar performance e assets |
| Cena 5 detalhamento completo                     | Alto    | Elaborar próxima iteração    |

## 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança                                       |
| ------ | ---------- | -------- | --------------------------------------------- |
| 0.2    | 2025‑06‑13 | Curiosão | Documento reescrito com feedback de cenas 1‑5 |

## 6. Anotações Khawe

* Fusão de duas Quests em uma. "Chegue ao estádio" e o "Elmo Perdido" se tornaram "A Semifinal".

* Task "Encontre um Elmo" adicionada.

* Task "Fale novamente com Dragobur" adicionada.

* Trata-se da Semifinal, não da final. Sendo assim, não existirá o ato de levantar o troféu, pois ainda será disputado mais um jogo.

* Dois novos mapas foram adicionados para que o jogador tenha liberdade de explorar. Praça central e Distrito das Fábricas. O intuito é, com o tempo e recursos, colocar algumas interações básicas e até itens como prêmio pela exploração.

* Correção da narrativa progressiva 3: "Tendo encontrado o capacete perdido, você retornou a Dragobour, entrou em campo nos acréscimos e marcou o gol decisivo que garantiu a vitória dos Machados Enferrujados. Comemore depressa — a confirmação do seu time nas finais, Guardas Imperiais já se aproximam do gramado!"

* Correção da narrativa progressiva 4: "Enquanto celebravam, os Guardas Imperiais Kilin, Mhordred e Tharok atravessaram a multidão, exigindo sua escolta imediata por ordem de seu pai. Siga os guardas de volta para casa sem demora e descubra por que seu retorno foi convocado tão urgentemente!"

* Talvez possamos colocar uma cena onde se Thorin escolhe a resposta rude, Kilin luta com ele desarmado e, quando ele perde, é obrigado a voltar.
