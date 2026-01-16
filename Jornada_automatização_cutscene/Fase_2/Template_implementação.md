# Design de Cutscene

**Descrição:** [Resumo curto da cena, objetivo e contexto]
**Cutscene:** [Nome da cutscene]
**Mapa onde acontece:** [Nome do mapa] - [Caminho]
**Personagens Envolvidos:**

* [Nome] (ID: `[ID]`)
* [Nome] (ID: `[ID]`)

**Bustos Envolvidos:**

* [Nome] (ID: `[ID]`, arquivo: `Portraits/Principal/[Arquivo]`)
* [Nome] (ID: `[ID]`, arquivo: `Portraits/Principal/[Arquivo]`)

## Observações

* Sempre que for usar o plugin de bustos, há um exemplo que você pode seguir como referência no mapa 05 - frontend\data\Map005.json
  
## Variáveis Utilizadas na cena

* [variavel] = [valor]
* [variavel] = [valor]

## Posições de Bustos

* Os bustos que aparecem sozinhos devem sempre estar na posição 5.
* Os bustos de Thorin devem sempre estar na posição 1.
* Para os demais bustos, com base no contexto, utilize sempre as posições 3, 7 e 9.

## [Nome da Cutscene] Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `nome_da_cena` | `Personagem` | `acao` | `detalhes` | `true` | | |

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressao) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` quando um balão for usado antes de um busto entrar em cena.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver varios comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* Sempre utilizar antes de cada fala no sistema de bustos os Switches de Número 43 a 46, que são selecionados com base no ID de cada busto. Sempre que o ID de busto for 1, o Switche usado será o 43, sempre que o busto tiver ID 2, o Switche 44, quando o busto usado tiver o ID 3, o Switche 45 deve estar ativo e, sempre que o busto utilizado corresponder ao ID 4, o Switche número 46 será obrigatório antes da fala daquele personagem.

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
