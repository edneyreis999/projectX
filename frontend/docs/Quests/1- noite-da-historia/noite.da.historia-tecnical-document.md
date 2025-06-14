# Quest: A Noite da História

## 1. Visão Geral

* **Título interno:** Noite da História
* **Premissa resumida:** Durante o festival “Noite da História”, um jovem espectador alcança a primeira fileira diante de Theodore Reed, revela seu nome e é envolto por uma fumaça mágica que o transporta ao passado de Thorin.
* **Objetivo principal do jogador:** Atravessar a plateia, sentar‑se na primeira fileira e dizer seu nome a Reed.
* **Emoção-âncora:** Maravilha com leve urgência.
* **Localizações centrais:** Praça Central de Daratrine (Mapa ID 005)
* **Personagens chave:** Theodore Reed (narrador anão), Jogador‑criança (protagonista)

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                    |
| ----------------- | ---------------------------------------------------- |
| Switches globais  | N/A                                                  |
| Variáveis globais | `v_qNoite_progress` (0‑2), `v_player_name` (texto)   |
| Plugins / Scripts | Nenhum extra; lógica nativa do RPG Maker             |
| Restrições gerais | Cena ≤ 2 min (nome aceito) / ≤ 5 min (nome digitado) |

## 3. Cenas da Quest

### Noite da História — Chegada & Conto

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

## 4. Pendências & Riscos

| ❓ Pendência | Impacto | Próximo passo |
| ----------- | ------- | ------------- |
| N/A         | —       | —             |

## 5. Histórico de Revisões

| Versão | Data       | Autor    | Mudança           |
| ------ | ---------- | -------- | ----------------- |
| 0.1    | 2025‑06‑14 | Curiosão | Documento inicial |
