Perfeito — com isso, já dá pra fechar o pacote inteiro sem inventar lore.

## Relatório Técnico-Narrativo — Dúvidas finais (múltipla escolha; pode marcar 1+)

**[1) Falas finais do gancho “Ruínas Norte”]**
A) “O Ancião mandou chamar. Ruínas Norte. Tenta acompanhar.” **(recomendada)**
B) “Assuntos oficiais do Ancião. Ruínas Norte. Anda logo.”
C) “O velho chamou. Ruínas Norte. Se perde não.”
D) “Ruínas Norte, agora. Não me faz esperar.”
Recomendação A – Justificativa: mantém slice-of-life + desafio sem soar grosso/denso.

**[2) Onde entra a escolha do jogador?]**
A) Depois de “Aposto que você não viu essa chegando!” **(recomendada)**
B) Antes do teleporte (Reid reage ao “Watch this”)
C) Depois do “…Exibido.” (piada vira escolha)
D) Sem escolha (vira só reação fixa)

**[3) “Pistas em cadeia” no hub]**
A) Sim: marcas chamuscadas + livro + payoff numa fala curta do Lucas **(recomendada)**
B) Só livro (mais limpo)
C) Só marcas (mais visual)
D) Nenhuma pista (mapa neutro)

**[4) Teleporte: quanto “cinematográfico”?]**
A) Animação saída+chegada + SE + Flash curto + Shake leve **(recomendada)**
B) Só animação + SE (minimalista)
C) Animação + Flash + Zoom forte (mais show)
D) Tudo acima + mudança temporária de BGS (mais complexo)

**Quais alternativas mais se encaixam?**
Se você não responder, vou assumir **A / A / A / A** pra gerar o algoritmo.

---

# [Introdução do Lucas] — Algoritmo de Eventos

**Gatilho:** Autorun ao entrar no mapa (ou “Player Touch” numa área/trigger de entrada)
**Atores:** Reid (Player), Lucas (EV001_Lucas)
**Local:** Mapa “Vila / Exterior” (ID não informado)

> Observação: onde eu escrever **[CDP]**, é **Plugin Command do Cutscene Director Pro** (nome exato do comando/parâmetros não informados — adapte aos comandos reais do plugin).
> Onde eu escrever **[Bubble]**, é o seu sistema de *speech bubble* (plugin/comando exato não informado).

| Passo | Ator/Alvo | Tipo de Ação | Detalhes da Ação / Parâmetros                                                                |
| :---- | :-------- | :----------- | :------------------------------------------------------------------------------------------- |
| 01    | Sistema   | Sistema      | Control Switches: `S_Cutscene_Active = ON`                                                   |
| 02    | Sistema   | Sistema      | Control Switches: `S_Intro_Cutscene_Done = OFF` (garante estado inicial)                     |
| 03    | Reid      | Sistema      | Set Movement Route (Player): Direction Fix ON                                                |
| 04    | Lucas     | Sistema      | Set Movement Route (EV001_Lucas): Direction Fix ON                                           |
| 05    | Sistema   | Câmera       | [CDP] Letterbox ON                                                                           |
| 06    | Sistema   | Câmera       | [CDP] Focus/Frame: enquadramento amplo do ambiente (estável)                                 |
| 07    | Sistema   | Câmera       | [CDP] Pan suave para o Reid entrando (se aplicável)                                          |
| 08    | Reid      | Movimento    | Set Movement Route (Player): Move Down (até ponto do encontro)                               |
| 09    | Reid      | Sistema      | Wait 10–15 frames                                                                            |
| 10    | Reid      | Diálogo      | [Bubble] Reid: “O rio tá mais alto hoje… fazia tempo que não tínhamos uma manhã tão quieta.” |
| 11    | Lucas     | Sistema      | Wait 10–15 frames                                                                            |
| 12    | Reid      | Diálogo      | [Bubble] Reid: “Dormindo em serviço de novo, Lucas?”                                         |
| 13    | Lucas     | Movimento    | Set Movement Route (Lucas): Show Balloon Icon (Sleep/Yawn)                                   |
| 14    | Lucas     | Sistema      | Wait 10–15 frames                                                                            |
| 15    | Lucas     | Diálogo      | [Bubble] Lucas: “(Bocejo)… Chama-se descanso estratégico, Reid.”                             |
| 16    | Lucas     | Sistema      | Wait 10–15 frames                                                                            |
| 17    | Lucas     | Diálogo      | [Bubble] Lucas: “Além do mais… eu tava te esperando. Eficientemente.”                        |
| 18    | Lucas     | Sistema      | Wait 10–15 frames                                                                            |
| 19    | Lucas     | Diálogo      | [Bubble] Lucas: “Quer ver onde eu gasto energia? Olha isso.”                                 |
| 20    | Lucas     | Movimento    | Set Movement Route (Lucas): Turn Toward Reid                                                 |
| 21    | Lucas     | Sistema      | Wait 10 frames                                                                               |
| 22    | Lucas     | Movimento    | Set Movement Route (Lucas): Turn Toward River/Direction (preparação)                         |
| 23    | Lucas     | Sistema      | Wait 10 frames                                                                               |
| 24    | Sistema   | Câmera       | [CDP] Zoom In no Lucas (ex.: 1.5x em 30 frames)                                              |
| 25    | Lucas     | Som          | Play SE: Teleport (nome não informado)                                                       |
| 26    | Lucas     | VFX          | Show Animation: “Lucas Teleport” (no Lucas / saída, Wait ON)                                 |
| 27    | Lucas     | Sistema      | Set Movement Route (Lucas): Change Opacity 255→0 (20 frames)                                 |
| 28    | Lucas     | Sistema      | Wait 10 frames                                                                               |
| 29    | Sistema   | Câmera       | [CDP] Pan suave para área de chegada (perto da casa marrom)                                  |
| 30    | Sistema   | Sistema      | Wait 60 frames (buraco cômico principal)                                                     |
| 31    | Lucas     | Movimento    | Set Event Location (Lucas → tile de chegada, à direita do Reid)                              |
| 32    | Lucas     | Sistema      | Set Movement Route (Lucas): Change Opacity 0→255 (10–20 frames)                              |
| 33    | Lucas     | VFX          | Show Animation: “Lucas Teleport” (na chegada, Wait ON)                                       |
| 34    | Sistema   | VFX          | Flash Screen (branco, 6–10 frames)                                                           |
| 35    | Sistema   | VFX          | Shake Screen (Power 2, Speed 6, Duration 15)                                                 |
| 36    | Sistema   | Câmera       | [CDP] Zoom Out para enquadrar Lucas + Reid (plano médio estável)                             |
| 37    | Reid      | VFX          | Show Balloon Icon (Reid: Exclamation/Surprise)                                               |
| 38    | Sistema   | Sistema      | Wait 30 frames                                                                               |
| 39    | Lucas     | VFX          | Show Balloon Icon (Lucas: Music Note)                                                        |
| 40    | Sistema   | Sistema      | Wait 15 frames                                                                               |
| 41    | Lucas     | Diálogo      | [Bubble] Lucas: “Aposto que você não viu essa chegando!”                                     |
| 42    | Sistema   | Sistema      | [Opcional] Plugin Command: Message Mode Normal (para choices)                                |
| 43    | Sistema   | Sistema      | Show Choices: “Mandou bem!” / “Só isso?” / “Como você fez isso?”                             |
| 44    | Sistema   | Sistema      | When Choice “Mandou bem!” → Control Variables: `V_Reid_Reaction = 1`                         |
| 45    | Reid      | Movimento    | Set Movement Route (Player): Jump (0,0)                                                      |
| 46    | Lucas     | Diálogo      | [Bubble] Lucas: “Eu sei, eu sei.”                                                            |
| 47    | Sistema   | Sistema      | When Choice “Só isso?” → Control Variables: `V_Reid_Reaction = 2`                            |
| 48    | Reid      | Movimento    | Set Movement Route (Player): Turn Left (desdém)                                              |
| 49    | Lucas     | VFX          | Show Balloon Icon (Lucas: Sweat)                                                             |
| 50    | Lucas     | Diálogo      | [Bubble] Lucas: “Todo mundo virou crítico agora…”                                            |
| 51    | Sistema   | Sistema      | When Choice “Como você fez isso?” → Control Variables: `V_Reid_Reaction = 3`                 |
| 52    | Reid      | Movimento    | Set Movement Route (Player): Step Forward                                                    |
| 53    | Lucas     | VFX          | Show Balloon Icon (Lucas: Lightbulb)                                                         |
| 54    | Lucas     | Diálogo      | [Bubble] Lucas: “Achei um pergaminho velho no rio.”                                          |
| 55    | Sistema   | Sistema      | End Choices                                                                                  |
| 56    | Sistema   | Sistema      | [Opcional] Plugin Command: Message Mode Bubble (volta)                                       |
| 57    | Lucas     | Sistema      | Wait 10–15 frames                                                                            |
| 58    | Lucas     | Diálogo      | [Bubble] Lucas: “O Ancião mandou chamar. Ruínas Norte.”                                      |
| 59    | Lucas     | Diálogo      | [Bubble] Lucas: “Tenta acompanhar.”                                                          |
| 60    | Reid      | Diálogo      | [Bubble] Reid: “…Exibido.”                                                                   |
| 61    | Sistema   | Câmera       | [CDP] Letterbox OFF                                                                          |
| 62    | Sistema   | Câmera       | [CDP] Reset/Release camera (volta pro padrão do gameplay)                                    |
| 63    | Lucas     | Movimento    | Set Movement Route (Lucas): Move Speed 5                                                     |
| 64    | Lucas     | Movimento    | Set Movement Route (Lucas): Move Up x8 (correndo pra saída norte)                            |
| 65    | Lucas     | Sistema      | Erase Event (ou Control Switch `S_LucasLeftHub = ON` pra Página 2 vazia)                     |
| 66    | Reid      | Movimento    | Set Movement Route (Player): Step Forward                                                    |
| 67    | Sistema   | Sistema      | Wait 10 frames                                                                               |
| 68    | Sistema   | Sistema      | Control Switches: `S_Intro_Cutscene_Done = ON`                                               |
| 69    | Sistema   | Sistema      | Control Switches: `S_Cutscene_Active = OFF`                                                  |
| 70    | Reid      | Sistema      | Set Movement Route (Player): Direction Fix OFF                                               |
| 71    | Lucas     | Sistema      | (se não apagou o evento) Direction Fix OFF                                                   |
| 72    | Sistema   | Sistema      | End of Autorun / Erase Autorun trigger (via switch/página)                                   |

---

## Pós-cutscene (estado de mundo — executável no MZ)

* **Livro / Marcas / Poço**: Evento(s) com **Página 2** condicionada por `S_Intro_Cutscene_Done = ON`, mudando a descrição para payoff (“grimório do Lucas…”, “cheiro de ozônio…”, etc.).
* **Saída Norte**: Evento de transferência com `Conditional Branch` em `V_Reid_Reaction` e 1 linha curta de pensamento do Reid antes do `Transfer Player`.

Se você responder as 4 múltipla-escolha lá de cima, eu ajusto as falas finais, o posicionamento exato da escolha e o “pacote” de efeitos pra ficar 100% alinhado ao seu gosto — mas, do jeito que está, já é um blueprint completo e implementável.
