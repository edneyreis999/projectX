# Quest: É Hora de Crescer

## 1. Visão Geral

* **Título interno:** q\_horadecrescer
* **Premissa resumida:** Após acordar de um pesadelo em que sua mãe o alerta de que "o tempo está se esgotando", Thorin é escoltado por três guardas até comprar e vestir sua primeira armadura, sendo deixado na porta da taverna onde começará como aprendiz de minerador.
* **Objetivo principal do jogador:** Equipar manualmente a cota de malha de prata e chegar à Taverna de Balastrus.
* **Emoção‑âncora:** Urgência temperada com humor.
* **Localizações centrais:** Casa de Thorin (Mapa 006), Distrito Comercial de Gildrat (Mapa 008), Loja Martelo & Malha (Mapa 013), Taverna de Balastrus (Mapa 012).
* **Personagens‑chave:** Thorin (protagonista), Sáparo (mascote), Kilin, Mhordred, Tharok (guardas), Lojista da armadura, Balastrus (referência).

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                             |
| ----------------- | ------------------------------------------------------------- |
| Switches globais  | *Nenhum adicional necessário neste ato*                       |
| Variáveis globais | `V_Q_HoraDeCrescer_Progress` (0‑4)                            |
| Common Events     | **0003** – Verifica se "Cota de Malha de Prata" está equipada |
| Plugins / Scripts | Sistema de Escolta, Skip‑Cutscene, Menu de Equipamento        |
| Restrições gerais | Todas as falas com legenda PT‑BR; skip habilitado; sem QTEs   |

## 3. Cenas da Quest

### Cena 1 — “Pesadelo & Despertar Apressado” ✅

| Item                   | Detalhe                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin tem um pesadelo em que a mãe alerta: “o tempo está se esgotando”. Ele acorda sobressaltado; o mascote Sáparo, alheio aos guardas, reclama que Thorin está atrasado. |
| **Contexto Narrativo** | Quarto de Thorin — **Mapa 006**, madrugada avançando para o amanhecer (luz fria entrando pela janela).                                                                     |
| **Personagens**        | Thorin; Sáparo (voz); Mãe (voz/fade).                                                                                                                                      |
| **Objetivo Dramático** | Reforçar o vínculo emocional com a mãe e criar senso de urgência.                                                                                                          |
| **Interatividade**     | Cut‑scene até o despertar; jogador retoma o controle imediatamente após acordar.                                                                                           |
| **Fluxo Cronológico**  | Pesadelo (fade + texto) → despertar brusco → breve diálogo com Sáparo → jogador assume controle.                                                                           |
| **Gatilhos**           | **Start:** jogo autoinicia ao carregar o mapa.<br>**End:** `V_Q_HoraDeCrescer_Progress = 1` (ao retomar controle).                                                         |
| **Assets**             | SFX batimentos cardíacos, fade escuro, texto branco; retrato mãe (silhueta); SFX cama ranger.                                                                              |
| **Integração**         | **Mapa 006** (Casa Thorin), **Evento‑cama ID 013**, Common Event 0003 não utilizado aqui.                                                                                  |
| **Emoções‑chave**      | Angústia → Urgência → Determinação.                                                                                                                                        |
| **Restrições**         | ≤ 40 s de diálogo; acessível; sem QTEs.                                                                                                                                    |

### Cena 2 — “Comboio até a Loja Martelo & Malha” ✅

| Item                   | Detalhe                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin é escoltado por Kilin, Mhordred e Tharok pelas ruas de Gildrat até a Loja Martelo & Malha. Lá, o jogador escolhe entre três atitudes (“Determinado”, “Esquivar (de comprar)”, “Fugir”); independentemente da escolha, Mhordred paga. Thorin deve equipar manualmente a armadura antes de sair. Em seguida, o grupo o leva à Taverna de Balastrus; a cena termina quando Thorin entra. |
| **Contexto Narrativo** | Manhã nublada, movimento matinal → interior rústico da loja (Mapa 013) → fachada da taverna (Mapa 012).                                                                                                                                                                                                                                                                                      |
| **Personagens**        | Thorin; guardas **Kilin**, **Mhordred**, **Tharok**; **Lojista**.                                                                                                                                                                                                                                                                                                                            |
| **Objetivo Dramático** | Aliviar tensão com humor, marcar o ritual da primeira armadura e construir expectativa para o encontro com Balastrus.                                                                                                                                                                                                                                                                        |
| **Interatividade**     | Escolta on‑rails → minievento na loja com três escolhas de diálogo que alteram texto, mas resultado fixo (Mhordred paga). Jogador abre o menu e equipa a armadura; Common Event 0003 detecta.                                                                                                                                                                                                |
| **Fluxo Cronológico**  | Saída da Casa (Mapa 006) → caminhada (Mapa 008) → entrada da Loja (Mapa 013) → compra + escolhas → jogador equipa → pequena caminhada → entrada Taverna (Mapa 012) → cena encerra.                                                                                                                                                                                                           |
| **Gatilhos**           | **Start:** `V_Q_HoraDeCrescer_Progress = 1`.<br>**Loja Entrar:** `V_Q_HoraDeCrescer_Progress = 2`.<br>**Após Equipar (CE 0003):** `V_Q_HoraDeCrescer_Progress = 3`.<br>**End:** `V_Q_HoraDeCrescer_Progress = 4` (Evento porta ID 024).                                                                                                                                                      |
| **Assets**             | Retratos dos três guardas; SFX moedas, passos metálicos; sprite Cota de Malha de Prata.                                                                                                                                                                                                                                                                                                      |
| **Integração**         | **Mapas:** 008 (ruas), 013 (loja), 012 (taverna).<br>• Evento‑loja **EV 037**.<br>• Porta taverna **EV 024**.<br>• Common Event 0003 checa equipamento.                                                                                                                                                                                                                                      |
| **Emoções‑chave**      | Desconforto → Humor → Alívio / Expectativa.                                                                                                                                                                                                                                                                                                                                                  |
| **Restrições**         | Cena ≤ 3 min; acessível; sem QTEs; cut‑scene pulável.                                                                                                                                                                                                                                                                                                                                        |

## 4. Pendências & Riscos

| ❓ Pendência                            | Impacto | Próximo passo                    |
| -------------------------------------- | ------- | -------------------------------- |
| Texto exato da fala da mãe no pesadelo | Baixo   | Definir frases e timing (≤ 40 s) |

## 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança                     |
| ------ | ---------- | -------- | --------------------------- |
| 0.1    | 2025‑06‑14 | Curiosão | Documento inicial formatado |
