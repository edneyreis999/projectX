# Design de Cutscene

**Descrição:** Cena principal da quest Fisherman_saga_implementação, apresentando o pedido de Jonaha e o desafio do guardião no Templo Flutuante.
**Cutscene:** A Pesca Maravilhosa
**Mapa onde acontece:** Templo Flutuante - frontend/data/Map050.json
**Personagens Envolvidos:**

* Jogador (ID: `player`)
* Jonaha (ID: `1`)
* Guardião (ID: `2`)
* Skysword (ID: `4`)
* Vaga-lume Eterno (ID: `5`, evento do altar)
* Cupula de Vidro (ID: `6`, evento da torre)
* NPC Tenda Vermelha 1 (ID: `7`)
* NPC Tenda Vermelha 2 (ID: `8`)
* NPC Tenda Vermelha 3 (ID: `9`)

**Bustos Envolvidos:**

* Jonaha (ID: `1`, arquivo: `Portraits/Principal/Taverneiro.png`)
* Jogador (ID: `2`, arquivo: `Portraits/Principal/Kilin.png`)
* Guardiao (ID: `3`, arquivo: `Portraits/Principal/Tharok.png`)
* Skysword (ID: `4`, arquivo: `Portraits/Principal/Boss_aventura_khawe.png`)

## Observações

* Sempre que for usar o plugin de bustos, há um exemplo que vocâ pode seguir como referência no mapa 05 - frontend/data/Map005.json
* Movimentos de personagem devem usar o comando de script `move to`.
* Switches do sistema de bustos: ID 1 -> 43, ID 2 -> 44, ID 3 -> 45, ID 4 -> 46.
* Enigma do guardião: input de texto do jogador gravado na variável 41; comparar com `nuvem` (aceitar maiusculas/minusculas).
* Chegada: usar balão de exclamação (ID 1) no Jonaha ainda dentro da tenda cinza, antes de ele sair.
* Boss final: iniciar a luta usando o plugin de pescaria (PKD_SimpleFishing).

## Variáveis Utilizadas na cena

* v_q_pesca_maravilhosa_progress (ID 41) = 0 (inicio)
* v_q_pesca_maravilhosa_progress (ID 41) = 1 (apos a chegada)
* v_q_pesca_maravilhosa_progress (ID 41) = 2 (Pedido de Jonaha)
* v_q_pesca_maravilhosa_progress (ID 41) = 3 (apos responder o enigma do guardiao)
* v_q_pesca_maravilhosa_progress (ID 41) = 4 (apos obter Vaga-lume Eterno)
* v_q_pesca_maravilhosa_progress (ID 41) = 5 (apos obter Sopro das Nuvens)
* * v_q_pesca_maravilhosa_progress (ID 41) = 6 (apos o chamado do boss)

## Mapa Interno - Templo Submerso (novo)

* Mapa: Templo Suberso/ 51 - [frontend\data\Map051.json]
* Setor 1 (Ala Leste): Inimigos: Águas-vivas de Vapor (qtd: definir). Item: Vaga-lume Eterno.
* Setor 2 (Torre Central): Inimigos: Enguias de Vento (qtd: definir). Item: Sopro das Nuvens (quebrar Cupula de Vidro).
* Setor 3 (Saída/retorno): sem inimigos; retorno ao patio externo.

## Posições de Bustos

* Os bustos que aparecem sozinhos devem sempre estar na posicao 5.
* Os bustos de Thorin devem sempre estar na posicao 1.
* Para os demais bustos, com base no contexto, utilize sempre as posicoes 3, 7 e 9.

## A Pesca Maravilhosa Roteiro de Ações - Beat por Beat

| Cena | Personagem | Acao - movimento do personagem | Detalhes (parametros) | esperar (true/false) | Notas de Direcao | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cena1_chegada` | `audio` | `bgm` | `play, Field1, 80, true` | `true` | BGM de entrada da area externa do templo | |
| `cena1_chegada` | `Jogador` | `script` | `move to 12,18` | `true` | Jogador aterrissa no patio externo | |
| `cena1_chegada` | `Jonaha` | `balloon` | `1` | `true` | Exclamacao dentro da tenda cinza | |
| `cena1_chegada` | `system` | `wait` | `30` | `true` | Espera do balao antes do busto entrar | |
| `cena1_chegada` | `Jonaha` | `script` | `move to 12,16` | `true` | Jonaha sai da casa e corre ate o jogador | |
| `cena1_chegada` | `NPC Tenda Vermelha 1` | `script` | `move to 11,17` | `true` | NPC sai da tenda vermelha e se aproxima | |
| `cena1_chegada` | `NPC Tenda Vermelha 2` | `script` | `move to 13,17` | `true` | NPC sai da tenda vermelha e se aproxima | |
| `cena1_chegada` | `NPC Tenda Vermelha 3` | `script` | `move to 12,19` | `true` | NPC sai da tenda vermelha e se aproxima | |
| `cena1_chegada` | `system` | `switch` | `43, on` | `true` | Busto Jonaha (ID 1) | |
| `cena1_chegada` | `Jonaha` | `talk` | `O escolhido chegou! Finalmente!` | `true` | Coro com os NPCs da tenda vermelha | `O escolhido chegou! Finalmente!` |
| `cena1_chegada` | `system` | `switch` | `44, on` | `true` | Busto Jogador (ID 2) | |
| `cena1_chegada` | `Jogador` | `talk` | `(Assustado) Do que voce esta falando?` | `true` | | `(Assustado) Do que voce esta falando?` |
| `cena1_chegada` | `system` | `switch` | `43, on` | `true` | Busto Jonaha (ID 1) | |
| `cena1_chegada` | `Jonaha` | `talk` | `Minha esposa, Ondina... A profetisa da nossa tribo. Ela previu sua vinda! Ela foi levada pelo Skysword, o Devorador, aquele que guarda o nosso tormento e garante que paguemos pela afronta aos deuses. Um monstro azul, imenso como um tubarao, com bigodes de dragao e um bico que corta o proprio vento!` | `true` | | `Minha esposa, Ondina... A profetisa da nossa tribo. Ela previu sua vinda! Ela foi levada pelo Skysword, o Devorador, aquele que guarda o nosso tormento e garante que paguemos pela afronta aos deuses. Um monstro azul, imenso como um tubarao, com bigodes de dragao e um bico que corta o proprio vento!` |
| `cena1_chegada` | `system` | `var` | `41, 1` | `true` | Progresso da quest | |
| `cena2_guardiao` | `audio` | `bgm` | `play, Dungeon3, 75, true` | `true` | BGM do portao principal | |
| `cena2_guardiao` | `Jogador` | `script` | `move to 14,10` | `true` | Jogador se aproxima do portao | |
| `cena2_guardiao` | `Guardiao` | `script` | `move to 14,8` | `true` | Guardiao se anima e bloqueia passagem | |
| `cena2_guardiao` | `system` | `switch` | `45, on` | `true` | Busto Guardiao (ID 3) | |
| `cena2_guardiao` | `Guardiao` | `talk` | `Apenas o saber garante a entrada. Erre e as nuvens serao seu tumulo. Voce aceita o desafio?!` | `true` | | `Apenas o saber garante a entrada. Erre e as nuvens serao seu tumulo. Voce aceita o desafio?!` |
| `cena2_guardiao` | `system` | `switch` | `45, on` | `true` | Busto Guardiao (ID 3) | |
| `cena2_guardiao` | `Guardiao` | `talk` | `Eu voo sem asas, eu choro sem olhos. Por onde passo, a vida brota ou o sol se esconde. O que sou?` | `true` | | `Eu voo sem asas, eu choro sem olhos. Por onde passo, a vida brota ou o sol se esconde. O que sou?` |
| `cena2_guardiao` | `system` | `script` | `input text -> var 41` | `true` | Jogador digita a resposta | |
| `cena2_guardiao` | `system` | `script` | `if var 41 == nuvem then seguir para cena2_guardiao_sucesso else cena2_guardiao_falha` | `true` | Comparacao sem diferenca de maiusculas/minusculas | |
| `cena2_guardiao_sucesso` | `system` | `switch` | `44, on` | `true` | Busto Jogador (ID 2) | |
| `cena2_guardiao_sucesso` | `Jogador` | `talk` | `A nuvem.` | `true` | Resposta correta do enigma | `A nuvem.` |
| `cena2_guardiao_sucesso` | `system` | `var` | `41, 2` | `true` | Progresso da quest | |
| `cena2_guardiao_falha` | `audio` | `sound` | `Buzzer1` | `true` | Resposta errada | |
| `cena2_guardiao_falha` | `system` | `switch` | `45, on` | `true` | Busto Guardiao (ID 3) | |
| `cena2_guardiao_falha` | `Guardiao` | `talk` | `Resposta errada. As nuvens serao seu tumulo.` | `true` | Guardiao enfeitica o jogador | `Resposta errada. As nuvens serao seu tumulo.` |
| `cena2_guardiao_falha` | `Jogador` | `script` | `move to 14,3` | `true` | Jogador caminha ate a borda do templo | |
| `cena2_guardiao_falha` | `Jogador` | `script` | `transparent true` | `true` | Jogador se joga do templo flutuante | |
| `cena2_guardiao_falha` | `system` | `script` | `game over` | `true` | Encerrar apos a queda | |
| `cena3_templo` | `audio` | `bgm` | `play, Dungeon5, 70, true` | `true` | BGM interior do templo submerso | |
| `cena3_templo` | `system` | `script` | `transfer to Templo Submerso (Map0XX)` | `true` | Novo mapa submerso | |
| `cena3_templo_setor_leste` | `Jogador` | `script` | `move to 6,14` | `true` | Setor 1: Aguas-vivas de Vapor (qtd: definir) | |
| `cena3_templo_setor_leste` | `audio` | `sound` | `Chime2` | `true` | Vaga-lume Eterno no Altar de Coral | |
| `cena3_templo_setor_leste` | `system` | `var` | `41, 3` | `true` | Vaga-lume Eterno obtido | |
| `cena3_templo_setor_torre` | `Jogador` | `script` | `move to 12,6` | `true` | Setor 2: Enguias de Vento (qtd: definir) | |
| `cena3_templo_setor_torre` | `audio` | `sound` | `Break` | `true` | Quebra da Cupula de Vidro | |
| `cena3_templo_setor_torre` | `system` | `var` | `41, 4` | `true` | Sopro das Nuvens obtido | |
| `cena3_templo_saida` | `system` | `script` | `transfer to Map050 (patio externo)` | `true` | Retorno ao patio externo | |
| `cena4_chamado_boss` | `audio` | `bgm` | `play, Theme4, 80, true` | `true` | BGM de retorno ao patio externo | |
| `cena4_chamado_boss` | `Jogador` | `script` | `move to 12,18` | `true` | Jogador retorna ao patio com itens equipados | |
| `cena4_chamado_boss` | `Jonaha` | `script` | `move to 12,16` | `true` | Jonaha reencontra o jogador | |
| `cena4_chamado_boss` | `system` | `switch` | `43, on` | `true` | Busto Jonaha (ID 1) | |
| `cena4_chamado_boss` | `Jonaha` | `talk` | `Voce conseguiu! Use a isca... chame a fera, traga minha Ondina de volta e nos liberte desse tormento eterno!` | `true` | | `Voce conseguiu! Use a isca... chame a fera, traga minha Ondina de volta e nos liberte desse tormento eterno!` |
| `cena4_chamado_boss` | `system` | `var` | `41, 5` | `true` | Progresso final antes do boss | |
| `cena5_boss_pescaria` | `system` | `script` | `start fishing (PKD_SimpleFishing)` | `true` | Luta de boss via plugin de pescaria | |

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressão) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os dialogos, as expressões dos atores devem ser representadas por alterações no busto.
* Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` quando um balão for usado antes de um busto entrar em cena.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver varios comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* Sempre utilizar antes de cada fala no sistema de bustos os Switches de Numero 43 a 46, que são selecionados com base no ID de cada busto. Sempre que o ID de busto for 1, o Switch usado será o 43, sempre que o busto tiver ID 2, o Switch 44, quando o busto usado tiver o ID 3, o Switch 45 deve estar ativo e, sempre que o busto utilizado corresponder ao ID 4, o Switch número 46 sera obrigatorio antes da fala daquele personagem.

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Câmera & Visual

* **Foco:** `focus on` | *Detalhes:* `character_id`
* **Zoom:** `zoom` ou `focus zoom` | *Detalhes:* `in` ou `out`
* **Barras Pretas:** `cinematic` | *Detalhes:* `true` (ativar) ou `false` (desativar)
* **Tremer:** `shake` | *Detalhes:* (vazio)
* **Flash:** `flash` | *Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`)
* **Tom:** `tone` | *Detalhes:* `r,g,b,gamma,duration`

### Personagem

* **Mover:** `move` | *Detalhes:* `x,y`
* **Teleportar:** `teleport` | *Detalhes:* `x,y`
* **Virar:** `turn` | *Detalhes:* `up`, `down`, `left`, `right`
* **Falar:** `talk` | *Detalhes:* "Texto entre aspas" (Obrigatorio aspas se usar virgula)
* **Balão:** `balloon` | *Detalhes:* ID do icone (1-8)
* **Transparência:** `transparent` | *Detalhes:* `true` ou `false`

### Áudio

* **Música:** `bgm` | *Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration`
* **Som:** `sound` | *Detalhes:* `filename` (SE)
* **Voz:** `voice` | *Detalhes:* `filename`

### Sistema

* **Variável:** `var` | *Detalhes:* `ID, valor`
* **Switch:** `switch` | *Detalhes:* `ID, on/off`
* **Common Event:** `callCommon` | *Detalhes:* `ID`
* **Espera Manual:** `wait` | *Detalhes:* `frames`
