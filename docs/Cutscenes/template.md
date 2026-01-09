# Design de Cutscene

**Descrição:** [Resumo curto da cena, objetivo e contexto]
**Cutscene:** [Nome da cutscene]
**Mapa onde acontece:** `[ID_do_mapa]` ([Caminho])

**Personagens Envolvidos:**

* [Nome] (Evento ID: `[ID]`)
* [Nome] (Actor ID: `[ID]`)
* [Nome] (Evento ID: `[ID]`)

**Bustos Envolvidos:**

* [Nome] (ID: `[ID_busto]`, arquivo: `Portraits/Principal/[Arquivo]`)
* [Nome] (ID: `[ID_busto]`, arquivo: `Portraits/Principal/[Arquivo]`)

---

## Roteiro de Ações - Beat por Beat

| Cena | Personagem | Acao - movimento do personagem | Detalhes (parametros) | esperar (true/false) | Notas de Direcao |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `nome_da_cena` | `camera` | `cinematic` | `true` | `true` | |
| `nome_da_cena` | `camera` | `bgm` | `play, NOME_MUSICA, 70, true` | `true` | |
| `nome_da_cena` | `bust` | `enter` | `Arquivo, ID_busto, posicao, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | |
| `nome_da_cena` | `sistema` | `switch` | `ID, on/off` | `false` | |
| `nome_da_cena` | `Personagem` | `talk` | `Texto do dialogo...` | `true` | |
| `nome_da_cena` | `bust` | `exit` | `ID_busto, offsetX=+200, offsetY=0, easing=InSine, duration=20` | `true` | |
| `nome_da_cena` | `Personagem` | `move` | `x,y (rota; turn toward player)` | `true` | |
| `nome_da_cena` | `sistema` | `choice` | `ID_escolha (opcoes: opcao1, opcao2)` | `true` | `Opcao: opcao1` |
| `nome_da_cena` | `sistema` | `name input` | `Actor ID, max N` | `true` | `Opcao: opcao2` |
| `nome_da_cena` | `sistema` | `quest` | `MetodoDeQuest("idQuest", valor)` | `false` | |
| `nome_da_cena` | `sistema` | `variavel` | `ID = valor` | `false` | |
| `nome_da_cena` | `camera` | `cinematic` | `false` | `true` | |

---

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Câmera & Visual - Plugin "Visu MZ"

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
* **Falar:** `talk` | *Detalhes:* `"Texto entre aspas"` (Obrigatorio aspas se usar virgula)
* **Balão:** `balloon` | *Detalhes:* ID do icone (1-8)
* **Transparência:** `transparent` | *Detalhes:* `true` ou `false`

### Bustos - Plugin "NPV PicturesBusts"

* **Adicionar:** `enter` | *Detalhes:* `filename, ID_bust, position`
* **Trocar:** `change` | *Detalhes:* `filename, ID_bust`
* **Tirar:** `exit` | *Detalhes:* `ID_bust`

### Audio

* **Música:** `bgm` | *Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration`
* **Som:** `sound` | *Detalhes:* `filename` (SE)
* **Voz:** `voice` | *Detalhes:* `filename`

### Sistema

* **Variável:** `var` | *Detalhes:* `ID, valor`
* **Switch:** `switch` | *Detalhes:* `ID, on/off`
* **Common Event:** `callCommon` | *Detalhes:* `ID`
* **Espera Manual:** `wait` | *Detalhes:* `frames`

### Regras

* Não pode haver o comando Baloon (balão de expressão) durante os diálogos, devem ser usados somente antes ou depois de um diálogo iniciado.
* Durante os diálogos, expressões dos atores devem ser representados por alterações no busto.
* Colocar um "Início" e "Fim" de diálogo antes de colocar ou tirar os bustos.
