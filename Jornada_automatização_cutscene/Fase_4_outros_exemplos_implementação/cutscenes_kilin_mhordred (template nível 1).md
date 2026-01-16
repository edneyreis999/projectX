# Design de Cutscene

**Descrição:** Cutscene de abertura com Kilin e Mhordred interagindo.
**Cutscene:** amanhecer
**Mapa onde acontece:** `[049]`

**Personagens Envolvidos:**

* [Kilin] (Actor ID: `[nao informado]`)
* [Mhordred] (Actor ID: `[nao informado]`)
* [NPC] (Actor ID: `[nao informado]`)

**Bustos Envolvidos:**

* [Kilin] `Portraits/Principal/Kilin`
* [Mhordred] `Portraits/Principal/Mhordred`
* [NPC] `Portraits`

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressao) nao pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Colocar um "Início" e "Fim" de diálogo antes de adicionar ou remover os bustos.
* Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver varios comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* As falas devem estar em português.
* Sempre analisar a necessidade do `Auto-Reverse` em `h_mirror` para os bustos.

## Roteiro de Ações - Beat por Beat

| Cena | Personagem | Acao - movimento do personagem | Detalhes (parametros) | esperar (true/false) | Notas de Direcao |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `opening` | `camera` | `cinematic` | `true` | `true` | |
| `opening` | `camera` | `bgm` | `play,Field1,70,true` | `true` | |
| `opening` | `camera` | `var` | `1,1` | `false` | |
| `opening` | `camera` | `switch` | `1,on` | `false` | |
| `opening` | `kilin` | `focus zoom` | `in` | `true` | |
| `opening` | `kilin` | `move` | `10,8` | `true` | |
| `opening` | `kilin` | `sound` | `Bell1` | `false` | |
| `opening` | `kilin` | `turn` | `up` | `false` | |
| `opening` | `kilin` | `balloon` | `1` | `true` | |
| `opening` | `kilin` | `talk` | `What a beautiful morning!` | `true` | |
| `opening` | `camera` | `voice` | `Bell1` | `true` | |
| `opening` | `mhordred` | `focus zoom` | `in` | `true` | |
| `opening` | `mhordred` | `move` | `13,8` | `true` | |
| `opening` | `mhordred` | `sound` | `Bell2` | `false` | |
| `opening` | `mhordred` | `turn` | `left` | `false` | |
| `opening` | `mhordred` | `balloon` | `2` | `true` | |
| `opening` | `mhordred` | `talk` | `Kilin! You're up early!` | `true` | |
| `opening` | `kilin` | `turn` | `right` | `false` | |
| `opening` | `kilin` | `sound` | `Bell3` | `false` | |
| `opening` | `kilin` | `focus zoom` | `in` | `true` | |
| `opening` | `kilin` | `talk` | `Hey! I'm not always late!` | `true` | |
| `opening` | `mhordred` | `talk` | `What about yesterday?` | `true` | |
| `opening` | `kilin` | `balloon` | `3` | `true` | |
| `opening` | `kilin` | `sound` | `Item1` | `false` | |
| `opening` | `kilin` | `talk` | `That was strategic sleeping!` | `true` | |
| `opening` | `mhordred` | `talk` | `Strategic sleeping?` | `true` | |
| `opening` | `kilin` | `shake` | `true` |  | |
| `opening` | `kilin` | `sound` | `Blow1` | `false` | |
| `opening` | `kilin` | `talk` | `My stomach is protesting!` | `true` | |
| `opening` | `camera` | `flash` | `255,255,255,30` | `true` | |
| `opening` | `camera` | `sound` | `Lightning1` | `false` | |
| `opening` | `mhordred` | `balloon` | `1` | `true` | |
| `opening` | `mhordred` | `talk` | `Whoa! What was that?` | `true` | |
| `opening` | `camera` | `tone` | `255,180,120,80,60` | `true` | |
| `opening` | `camera` | `sound` | `Chime1` | `false` | |
| `opening` | `kilin` | `talk` | `Now everything has a warm glow!` | `true` | |
| `opening` | `mhordred` | `talk` | `That's quite cozy!` | `true` | |
| `opening` | `kilin` | `talk` | `Watch this magic trick!` | `true` | |
| `opening` | `kilin` | `sound` | `Magic1` | `false` | |
| `opening` | `kilin` | `transparent` | `true` | `false` | |
| `opening` | `wait` | `1` | `true` |  | |
| `opening` | `kilin` | `talk` | `Ta-da! I'm invisible!` | `true` | |
| `opening` | `mhordred` | `talk` | `You're just transparent!` | `true` | |
| `opening` | `kilin` | `transparent` | `false` | `false` | |
| `opening` | `kilin` | `turn` | `right` | `false` | |
| `opening` | `kilin` | `sound` | `Item1` | `false` | |
| `opening` | `kilin` | `talk` | `Fine! Watch this!` | `true` | |
| `opening` | `kilin` | `teleport` | `11,8` | `false` | |
| `opening` | `camera` | `flash` | `0,255,255,20` | `true` | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | |
| `opening` | `kilin` | `talk` | `Teleportation!` | `true` | |
| `opening` | `mhordred` | `turn` | `left` | `false` | |
| `opening` | `mhordred` | `sound` | `Bell1` | `false` | |
| `opening` | `mhordred` | `talk` | `Impressive!` | `true` | |
| `opening` | `mhordred` | `teleport` | `12,8` | `false` | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | |
| `opening` | `mhordred` | `talk` | `I can teleport too!` | `true` | |
| `opening` | `kilin` | `talk` | `Can you make the player disappear?` | `true` | |
| `opening` | `kilin` | `sound` | `Magic1` | `false` | |
| `opening` | `player` | `transparent` | `true` | `false` | |
| `opening` | `wait` | `1` | `true` |  | |
| `opening` | `mhordred` | `talk` | `The player disappeared!` | `true` | |
| `opening` | `kilin` | `talk` | `And now they'll reappear!` | `true` | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | |
| `opening` | `player` | `teleport` | `13,7` | `false` | |
| `opening` | `player` | `turn` | `down` | `false` | |
| `opening` | `player` | `transparent` | `false` | `false` | |
| `opening` | `mhordred` | `balloon` | `3` | `true` | |
| `opening` | `mhordred` | `sound` | `Item1` | `false` | |
| `opening` | `mhordred` | `talk` | `You win this round!` | `true` | |
| `opening` | `kilin` | `balloon` | `1` | `true` | |
| `opening` | `kilin` | `sound` | `Bell2` | `false` | |
| `opening` | `kilin` | `talk` | `Victory!` | `true` | |
| `opening` | `mhordred` | `talk` | `Lead the way!` | `true` | |
| `opening` | `camera` | `bgm` | `fadeOut,120` | `true` | |
| `opening` | `camera` | `tone` | `255,255,255,0,60` | `true` | |
| `opening` | `camera` | `sound` | `Chime1` | `false` | |
| `opening` | `kilin` | `move` | `6,7` | `false` | |
| `opening` | `mhordred` | `move` | `7,7` | `true` | |
| `opening` | `mhordred` | `sound` | `Bell3` | `false` | |
| `opening` | `camera` | `cinematic` | `false` | `true` | |
| `opening` | `camera` | `focus zoom` | `out` | `true` | |
| `opening` | `camera` | `focus on` | `player` | `true` | |
| `opening` | `camera` | `var` | `2,1` | `false` | |
| `opening` | `camera` | `switch` | `2,on` | `false` | |
| `opening` | `camera` | `callCommon` | `1` | `false` | |

---

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
* **Falar:** `talk` | *Detalhes:* "Texto entre aspas" (obrigatorio aspas se usar virgula)
* **Balão:** `balloon` | *Detalhes:* ID do icone (1-8)
* **Transparência:** `transparent` | *Detalhes:* `true` ou `false`

### Bustos

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
