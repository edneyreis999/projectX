# A Noite da História

## 1. Contexto Consolidado

* **Premissa resumida:** Durante o festival “Noite da História”, um jovem espectador alcança a primeira fileira diante de Theodore Reed, revela seu nome e é envolto por uma fumaça mágica que o transporta ao passado de Thorin. fileciteturn4file0
* **Emoção-âncora:** Maravilha com leve urgência. fileciteturn4file0
* **Cenas:** 1 (listada abaixo)
* **Variáveis globais:** `v_qNoite_progress`, `v_player_name` fileciteturn4file0
* **Plugins/Observações:** Nenhum plugin adicional; lógica nativa do RPG Maker.

## 2. Cenas Detalhadas

### Cena 1 — “Chegada & Conto” ✅

**Contexto**
Noite fresca de outono na Praça Central de Daratrine (Mapa 005). A fogueira estala, projetando sombras nas crianças. Um **brilho azulado** marca um banco vazio em frente ao palco. Theodore “Rheed” Reed, anão contador de histórias de riso fácil, anda de um lado a outro, balançando as tranças da barba.

**Objetivo Dramático**
Despertar curiosidade e relacionar o atraso do jogador ao atraso de Thorin.

**Diálogo (tabela)**

| Personagem / Ação                               | Fala / Anotação                                                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[SFX]**                                      | ✨ *Plim‑plim…* — o brilho pulsa sobre o banco vazio.                                                                                                             |
| Jogador‑criança (pensamento)                    | *Essa luz… Será que é pra mim?*                                                                                                                                  |
| Jogador ({player})                              | **(toca o brilho e se senta)**                                                                                                                                   |
| **\[SFX]**                                      | Partículas azuladas sobem como vaga‑lumes e somem.                                                                                                               |
| **Rheed** \emote\[Exclamação]                     | “Olha só quem chegou **atrasado**, hahaha! Esse banquinho brilhando tava te esperando, hein?”                                                                 |
| *Ação*                                          | *Rheed caminha até a direita do palco, inclina‑se e finge ler uma plaquinha imaginária no assento do jogador.*                                                   |
| **Rheed**                                       | “Deixe‑me ver… aqui diz que seu nome é **João**, certo?”                                                                                                         |
| **Escolha**                                     | ① “Isso mesmo!” ② “Outro nome…” *(se escolher ②, abre janela de digitar nome)*                                                                                   |
| **Rheed** \emote\[Sorriso] (se ①)               | “Sabia! João combina contigo.”                                                                                                                                   |
| **Rheed** \emote\[Sorriso] (se ②, após digitar) | “{player}? Nome massa! Vou lembrar.”                                                                                                                             |
| **Rheed**                                       | “Agora, {player}, se você me permitir, eu gostaria de te contar uma das minhas histórias favoritas.”                                                             |
| *Ação*                                          | Rheed caminha de volta ao centro ao palco.                                                   |
| **Rheed**                                       | “A de **Daratrine**! Vocês sabiam que esta cidade já foi **refúgio de soldados feridos?** E que, por pouco, não foi **riscada do mapa** pra sempre?”             |
| **Rheed**                                       | “Mas eu não posso contar a história de Daratrine sem antes falar de **Gildrat**, que há muito tempo era conhecida como **o império dos anões**.”                 |
| **Rheed** \emote\[Riso]                         | “E, falando em atrasos… Você não é o único! Deixa eu te apresentar um anão de Gildrat chamado **Thorin**, que dormiu tanto que quase perdeu a grande semifinal!” |
| **Rheed**                                       | “Fechem os olhos, crianças, e deixem o fogo sussurrar…”                                                                                                          |
| **\[SFX]**                                      | *Whoooosh…* — névoa cinza‑azulada envolve o jogador; o som da fogueira se abafa.                                                                                 |
| **TRANSIÇÃO**                                   | Tela funde a branco; transferência de mapa para a próxima quest.                                                                                                 |
| → `END_CENA_1`                                  |                                                                                                                                                                  |                                                                                |                                                                                                              |

**Interatividade & Gatilhos**

* Evento “brilho azul” ID ‑18 → `v_qNoite_progress = 1`.
* Evento 017 Rheed → escolha nome (aceita ou digita), define `v_player_name`, depois `v_qNoite_progress = 2`.
* Quando `v_qNoite_progress == 2`, transferência automática para a quest **“A Semifinal”**.

**Restrição de Tempo**
Cena ≤ 2 min (nome aceito) / ≤ 5 min (nome digitado). fileciteturn4file0

## 4. Notas Adicionais

* **Assets:** Sprite Theodore Rheed, partículas azuis, SFX *plim‑plim* e *whoosh*, BGM ambiente noturno.
* **Dependências:** Evento “brilho azul” ID ‑18, Evento 017 Rheed.
* **Restrições extras:** Cena deve permanecer acessível (texto < 280 caracteres por balão).

*Gerado em: 2025‑06‑17 00:00 (America/Sao\_Paulo)*
