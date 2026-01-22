# Design de Cutscene

**Descrição:** Cena da taverna em que Thorin tenta escapar da expedição, Borin entrega o contrato e a menção a Filena faz Thorin voltar atrás.
**Cutscene:** Contrato na Taverna (Taverna 2.0)
**Mapa onde acontece:** Taverna da Pedra Vulcânica (mapa/id a confirmar)
**Personagens Envolvidos:**

* Thorin (ID: `player`)
* Balastrus (ID: `a confirmar`)
* Borin (ID: `a confirmar`)
* Durgan, o taverneiro (ID: `a confirmar`)

**Bustos Envolvidos:**

* Thorin (ID: `a confirmar`, arquivo: `Portraits/Principal/Thorin.png`)
* Balastrus (ID: `a confirmar`, arquivo: `Portraits/Principal/Balastrus.png`)
* Borin (ID: `a confirmar`, arquivo: `a confirmar`)
* Durgan (ID: `a confirmar`, arquivo: `Portraits/Principal/Taverneiro.png`)

## Observações

* O NSD não informa IDs de mapa/evento, IDs de busto ou arquivos para Borin; completar na implementação.
* Sempre que for usar o plugin de bustos, há um exemplo que você pode seguir como referência no mapa 05 - `frontend/data/Map005.json`.

## Variáveis Utilizadas na cena

* Não informado no NSD.

## Posições de Bustos

* Os bustos que aparecem sozinhos devem sempre estar na posição 5.
* Os bustos de Thorin devem sempre estar na posição 1.
* Para os demais bustos, com base no contexto, utilize sempre as posições 3, 7 e 9.

## Contrato na Taverna - Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cena1_entrada` | `Thorin` | `script` | `move to balcão (coordenadas a definir)` | `true` | Thorin entra na taverna e vai ao balcão | |
| `cena1_entrada` | `Thorin` | `talk` | `1-A - Entrada na taverna: O Jogador controla Thorin, que entra na Taverna da Pedra Vulcânica e pergunta ao taverneiro Durgan onde está Balastrus.` | `true` | Thorin pede a informação ao taverneiro | `1-A - Entrada na taverna: O Jogador controla Thorin, que entra na Taverna da Pedra Vulcânica e pergunta ao taverneiro Durgan onde está Balastrus.` |
| `cena1_entrada` | `Durgan` | `talk` | `1-B - A Resposta do anão Franzino: Durgan responde que Balastrus está numa das mesas do canto e que é impossível não notar a "careca".` | `true` | Durgan aponta a mesa do contratante | `1-B - A Resposta do anão Franzino: Durgan responde que Balastrus está numa das mesas do canto e que é impossível não notar a "careca".` |
| `cena1_mesa_balastrus` | `Thorin` | `script` | `move to mesa do Balastrus (coordenadas a definir)` | `true` | Thorin se aproxima e se senta | |
| `cena1_mesa_balastrus` | `Thorin` | `talk` | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` | `true` | Início da conversa | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` |
| `cena1_mesa_balastrus` | `Thorin` | `talk` | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` | `true` | Thorin tenta escapar da missão | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` |
| `cena1_mesa_balastrus` | `Balastrus` | `talk` | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` | `true` | Balastrus não insiste | `1-D - Ombro machucado: Thorin começa a conversa com Balastrus, alega estar com o ombro ferido e tenta sair de gaiato da expedição. Balastrus não acredita nele, mas também não insiste.` |
| `cena1_saida` | `Thorin` | `script` | `move to saída (coordenadas a definir)` | `true` | Thorin se levanta para sair | |
| `cena1_borin_entra` | `Borin` | `script` | `move to mesa (coordenadas a definir)` | `true` | Borin entra na taverna e vai até Balastrus | |
| `cena1_borin_entra` | `Borin` | `talk` | `1-F - Eternos rivais: Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.` | `true` | Borin provoca Thorin | `1-F - Eternos rivais: Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.` |
| `cena1_borin_entra` | `Borin` | `talk` | `1-F - Eternos rivais: Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.` | `true` | Borin entrega o contrato e menciona Filena | `1-F - Eternos rivais: Borin entra na taverna e, quando vê Thorin, começa a discutir com ele. Borin se cansa de dar atenção à Thorin, vai falar com Balastrus, entrega o contrato a ele e pergunta se Filena também já entregou o dela. Thorin ouve a conversa e vai falar com Balastrus novamente.` |
| `cena1_volta` | `Thorin` | `script` | `move to mesa do Balastrus (coordenadas a definir)` | `true` | Thorin volta ao ouvir o nome de Filena | |
| `cena1_volta` | `Thorin` | `talk` | `1-G - Espere, senhor Balastrus!: O Jogador controla Thorin que volta para falar com Balastrus assim que escuta o nome da Filena.` | `true` | Thorin muda de ideia | `1-G - Espere, senhor Balastrus!: O Jogador controla Thorin que volta para falar com Balastrus assim que escuta o nome da Filena.` |
| `cena1_volta` | `Balastrus` | `talk` | `1-H - Pelas garotas e pela glória: Thorin diz a Balastrus que se enganou, ele não só quer, como precisa estar na expedição. Quando questionado sobre o ombro machucadovo, ele diz que o povo anão nunca faz corpo mole e que grande parte da história foi apenas "força de expressão". Balastrus manda Borin sair e diz a Thorin que o tempo está se esgotando, ele precisa pegar um contrato com o taverneiro, assinar e levar até a Estrada do Cão-luar, pois o grupo já estava de partida. O Mercenário se levanta e também deixa a taverna.` | `true` | Balastrus dá a ordem e encerra a conversa | `1-H - Pelas garotas e pela glória: Thorin diz a Balastrus que se enganou, ele não só quer, como precisa estar na expedição. Quando questionado sobre o ombro machucadovo, ele diz que o povo anão nunca faz corpo mole e que grande parte da história foi apenas "força de expressão". Balastrus manda Borin sair e diz a Thorin que o tempo está se esgotando, ele precisa pegar um contrato com o taverneiro, assinar e levar até a Estrada do Cão-luar, pois o grupo já estava de partida. O Mercenário se levanta e também deixa a taverna.` |
| `cena1_volta` | `Balastrus` | `script` | `move to saída (coordenadas a definir)` | `true` | Balastrus deixa a taverna | |
| `cena1_objetivo` | `Thorin` | `script` | `move to balcão (coordenadas a definir)` | `true` | Controle do jogador: pegar e assinar o contrato com Durgan | |

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressão) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` quando um balão for usado antes de um busto entrar em cena.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver vários comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* Sempre utilizar antes de cada fala no sistema de bustos os Switches de número 43 a 46, que são selecionados com base no ID de cada busto. Sempre que o ID de busto for 1, o Switch usado será o 43, sempre que o busto tiver ID 2, o Switch 44, quando o busto usado tiver o ID 3, o Switch 45 deve estar ativo e, sempre que o busto utilizado corresponder ao ID 4, o Switch número 46 será obrigatório antes da fala daquele personagem.

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
* **Falar:** `talk` | *Detalhes:* "Texto entre aspas" (Obrigatório aspas se usar vírgula)
* **Balão:** `balloon` | *Detalhes:* ID do ícone (1-8)
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
