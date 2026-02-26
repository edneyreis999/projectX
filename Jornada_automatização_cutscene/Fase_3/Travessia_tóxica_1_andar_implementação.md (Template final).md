# Design de Cutscene

**Descrição:** Primeiro andar da Mina do Esgoto, quest: Travessia Tóxica. Entrada na mina, confronto inicial com Balastrus, combates leves, quebra-cabeças de válvulas e a quebra de memória com Rheed, culminando na liberação da escada para o 2 andar.
**Cutscene:** Quebra-cabeças tóxico
**Mapa onde acontece:** Mina do Esgoto - frontend/data/Map024.json

**Personagens Envolvidos:**

- Thorin (Jogador) (ID: `player`)
- Kilin (ID: `12`)
- Mhordred (ID: `13`)
- Filena (ID: `14`)
- Balastrus (ID: `15`)

**Bustos Envolvidos:**

- Thorin (ID: `1`, arquivo: `Portraits/Principal/Thorin.png`)
- Kilin (ID: `2`, arquivo: `Portraits/Principal/Kilin.png`)
- Mhordred (ID: `2`, arquivo: `Portraits/Principal/Mhordred.png`)
- Filena (ID: `2`, arquivo: `Portraits/Principal/Filena.png`)
- Balastrus (ID: `2`, arquivo: `Portraits/Principal/Balastrus.png`)
- Rheed (ID: `2`, arquivo: `Portraits/Principal/Rheed.png`)

## Observações

- Usar Map024 como base.
- Reservar IDs dos eventos no Map024:
- `12` Kilin, `13` Mhordred, `14` Filena, `15` Balastrus.
- `21` Válvula Filena, `22` Válvula Kilin, `23` Válvula Mhordred, `24` Válvula Balastrus, `25` Válvula Thorin (última).
- O 1 andar tem combates leves e deve permitir a sequência de exploração antes do puzzle.
- O puzzle possui 5 válvulas e exige que cada personagem segure uma válvula simultaneamente.
- A última válvula deve ser a de Thorin.
- A conclusão do puzzle libera a escada para o 2 andar.
- A quebra de memória deve ter `fade out`, quadro de mensagem do Rheed e `fade in` antes de seguir ao 2 andar.

## Variáveis Utilizadas na cena

- v_q_travessia_toxica_progress (ID `40`) = `0` (início do 1 andar)
- v_q_travessia_toxica_progress (ID `40`) = `1` (após a discussão e corda em Balastrus)
- v_q_travessia_toxica_progress (ID `40`) = `2` (após combates leves)
- v_q_travessia_toxica_progress (ID `40`) = `3` (início do puzzle de válvulas)
- v_q_travessia_toxica_progress (ID `40`) = `4` (Balastrus se torna 5 membro)
- v_q_travessia_toxica_progress (ID `40`) = `5` (puzzle concluído e escada liberada)
- v_q_travessia_toxica_progress (ID `40`) = `6` (quebra de memória e transição para o 2 andar)

## Switches do puzzle (segurar válvula)

- s_valvula_filena (ID `60`) = `on` enquanto Filena segura a válvula
- s_valvula_kilin (ID `61`) = `on` enquanto Kilin segura a válvula
- s_valvula_mhordred (ID `62`) = `on` enquanto Mhordred segura a válvula
- s_valvula_balastrus (ID `63`) = `on` enquanto Balastrus segura a válvula
- s_valvula_thorin (ID `64`) = `on` enquanto Thorin segura a válvula (última válvula do puzzle)

## Posições de Bustos

- Os bustos de Thorin devem sempre estar na posição 1.
- Os bustos dos demais personagens ficam nas posições 3, 7 e 9.

## Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1-A` | `system` | `beat` | `Entrada soterrada` | `true` | O Jogador controla Thorin, que encontra a entrada da mina sob a neve e segue com o grupo por não haver outra rota. Filena comenta que o lugar é estranho e repara nas válvulas, reforçando que não podem recuar. | |
| `1-B` | `system` | `beat` | `Discussão acalorada` | `true` | Logo na entrada, Kilin e Mhordred discutem com Balastrus e o amarram. Enquanto isso, Filena procura pistas sobre o sistema da mina e diz que vai buscar um livro no andar de cima. Thorin conversa com ela sobre Gildrat e as castas mais pobres. | |
| `1-C` | `system` | `beat` | `Boas vindas tóxica` | `true` | O 1 andar da mina já oferece combate ao jogador, ainda que menos desafiador. Enquanto anda e verifica as máquinas o time entra em combate, com exceção de Balastrus. | |
| `1-D` | `system` | `beat` | `Quebra-cabeças metálico` | `true` | Filena identifica o sistema de drenagem manual pelas válvulas e orienta o grupo. Ela confirma que um livro técnico no andar de cima explica o procedimento, reforçando a necessidade de manter cada válvula pressionada para abrir as passagens. | |
| `1-E` | `system` | `beat` | `Inimigo do meu inimigo` | `true` | Sobra uma das válvulas que precisa ser pressionada ao mesmo tempo que as outras para que o quebra-cabeças funcione. Balastrus argumenta que o grupo não tem escolha. Por necessidade, eles o soltam. | |
| `1-F` | `system` | `beat` | `O 5 elemento` | `true` | Balastrus se torna o 5 membro jogável, permitindo Thorin prossiga com a resolução do problema. | |
| `1-G` | `system` | `beat` | `Rebeldia` | `true` | Após a tensão inicial, a passagem para o segundo andar se abre, Kilin chama Thorin para uma conversa longe dos outros e diz para ter cuidado com Balastrus. Menciona pela primeira vez as rebeliões em Gildrat e que grande parte do problema são contratantes mercenários e tiranos como ele. Filena fica desconfortável com o assunto. | |
| `1-H` | `system` | `beat` | `Quebra de memória` | `true` | A realidade da mina se dissipa e a cena corta para o Coreto, com Rheed e as crianças. Ele fala para elas sobre o símbolo de Trégua e a aventura que Thorin e os outros estão prestes a enfrentar. O grupo avança para o 2 andar. | |
| `1-H` | `system` | `fade out` | `?` | `true` | Início da quebra de memória. | |
| `1-H` | `system` | `message` | `Rheed fala às crianças sobre o Símbolo da Trégua e a aventura de Thorin.` | `true` | Quadro com mensagem do Rheed. | |
| `1-H` | `system` | `fade in` | `?` | `true` | Retorno à mina e transição para o 2 andar. | |

---

## Regras

- Sempre que faltar informação, pergunte.
- O comando Balão (balloon de expressão) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
- Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
- Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
- O busto do personagem correspondente sempre deve aparecer quando ele falar.
- Sempre aplicar `wait` quando um balão for usado antes de um busto entrar em cena.
- Sempre aplicar `wait` em comandos de rota de movimento; se houver vários comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
- Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
- Sempre utilizar antes de cada fala no sistema de bustos os Switches de Número 43 a 46, que são selecionados com base no ID de cada busto. Sempre que o ID de busto for 1, o Switche usado será o 43, sempre que o busto tiver ID 2, o Switche 44, quando o busto usado tiver o ID 3, o Switche 45 deve estar ativo e, sempre que o busto utilizado corresponder ao ID 4, o Switche número 46 será obrigatório antes da fala daquele personagem.

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Câmera & Visual

- **Foco:** `focus on` | _Detalhes:_ `character_id`
- **Zoom:** `zoom` ou `focus zoom` | _Detalhes:_ `in` ou `out`
- **Barras Pretas:** `cinematic` | _Detalhes:_ `true` (ativar) ou `false` (desativar)
- **Tremer:** `shake` | _Detalhes:_ (vazio)
- **Flash:** `flash` | _Detalhes:_ `r,g,b,duration` (ex: `255,255,255,30`)
- **Tom:** `tone` | _Detalhes:_ `r,g,b,gamma,duration`

### Personagem

- **Mover:** `move` | _Detalhes:_ `x,y`
- **Teleportar:** `teleport` | _Detalhes:_ `x,y`
- **Virar:** `turn` | _Detalhes:_ `up`, `down`, `left`, `right`
- **Falar:** `talk` | _Detalhes:_ "Texto entre aspas" (Obrigatório aspas se usar vírgula)
- **Balão:** `balloon` | _Detalhes:_ ID do ícone (1-8)
- **Transparência:** `transparent` | _Detalhes:_ `true` ou `false`

### Áudio

- **Música:** `bgm` | _Detalhes:_ `play, filename, volume, loop` ou `fade out, duration`
- **Som:** `sound` | _Detalhes:_ `filename` (SE)
- **Voz:** `voice` | _Detalhes:_ `filename`

### Sistema

- **Variável:** `var` | _Detalhes:_ `ID, valor`
- **Switch:** `switch` | _Detalhes:_ `ID, on/off`
- **Common Event:** `callCommon` | _Detalhes:_ `ID`
- **Espera Manual:** `wait` | _Detalhes:_ `frames`


