# Design de Cutscene

**Descrição:** Cutscene gerada a partir do script importado.
**Cutscene:** Opening
**Mapa onde acontece:** (Indefinido)
**Personagens Envolvidos:**

* [Lucas] (ID: `?`)
* [Maria] (ID: `?`)
* [Player] (ID: `?`)

---

## 🎞️ Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `opening` | `camera` | `cinematic` | `true` | `true` | | |
| `opening` | `camera` | `bgm` | `play,Field1,70,true` | `true` | | |
| `opening` | `camera` | `var` | `1,1` | `false` | | |
| `opening` | `camera` | `switch` | `1,on` | `false` | | |
| `opening` | `lucas` | `focus zoom` | `in` | `true` | | |
| `opening` | `lucas` | `move` | `10,8` | `true` | | |
| `opening` | `lucas` | `sound` | `Bell1` | `false` | | |
| `opening` | `lucas` | `turn` | `up` | `false` | | |
| `opening` | `lucas` | `balloon` | `1` | `true` | | |
| `opening` | `lucas` | `talk` | `What a beautiful morning!` | `true` | | |
| `opening` | `camera` | `voice` | `Bell1` | `true` | | |
| `opening` | `maria` | `focus zoom` | `in` | `true` | | |
| `opening` | `maria` | `move` | `13,8` | `true` | | |
| `opening` | `maria` | `sound` | `Bell2` | `false` | | |
| `opening` | `maria` | `turn` | `left` | `false` | | |
| `opening` | `maria` | `balloon` | `2` | `true` | | |
| `opening` | `maria` | `talk` | `Lucas! You're up early!` | `true` | | |
| `opening` | `lucas` | `turn` | `right` | `false` | | |
| `opening` | `lucas` | `sound` | `Bell3` | `false` | | |
| `opening` | `lucas` | `focus zoom` | `in` | `true` | | |
| `opening` | `lucas` | `talk` | `Hey! I'm not always late!` | `true` | | |
| `opening` | `maria` | `talk` | `What about yesterday?` | `true` | | |
| `opening` | `lucas` | `balloon` | `3` | `true` | | |
| `opening` | `lucas` | `sound` | `Item1` | `false` | | |
| `opening` | `lucas` | `talk` | `That was strategic sleeping!` | `true` | | |
| `opening` | `maria` | `talk` | `Strategic sleeping?` | `true` | | |
| `opening` | `lucas` | `shake` | `true` | `nan` | | |
| `opening` | `lucas` | `sound` | `Blow1` | `false` | | |
| `opening` | `lucas` | `talk` | `My stomach is protesting!` | `true` | | |
| `opening` | `camera` | `flash` | `255,255,255,30` | `true` | | |
| `opening` | `camera` | `sound` | `Lightning1` | `false` | | |
| `opening` | `maria` | `balloon` | `1` | `true` | | |
| `opening` | `maria` | `talk` | `Whoa! What was that?` | `true` | | |
| `opening` | `camera` | `tone` | `255,180,120,80,60` | `true` | | |
| `opening` | `camera` | `sound` | `Chime1` | `false` | | |
| `opening` | `lucas` | `talk` | `Now everything has a warm glow!` | `true` | | |
| `opening` | `maria` | `talk` | `That's quite cozy!` | `true` | | |
| `opening` | `lucas` | `talk` | `Watch this magic trick!` | `true` | | |
| `opening` | `lucas` | `sound` | `Magic1` | `false` | | |
| `opening` | `lucas` | `transparent` | `true` | `false` | | |
| `opening` | `wait` | `1` | `true` | `nan` | | |
| `opening` | `lucas` | `talk` | `Ta-da! I'm invisible!` | `true` | | |
| `opening` | `maria` | `talk` | `You're just transparent!` | `true` | | |
| `opening` | `lucas` | `transparent` | `false` | `false` | | |
| `opening` | `lucas` | `turn` | `right` | `false` | | |
| `opening` | `lucas` | `sound` | `Item1` | `false` | | |
| `opening` | `lucas` | `talk` | `Fine! Watch this!` | `true` | | |
| `opening` | `lucas` | `teleport` | `11,8` | `false` | | |
| `opening` | `camera` | `flash` | `0,255,255,20` | `true` | | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | | |
| `opening` | `lucas` | `talk` | `Teleportation!` | `true` | | |
| `opening` | `maria` | `turn` | `left` | `false` | | |
| `opening` | `maria` | `sound` | `Bell1` | `false` | | |
| `opening` | `maria` | `talk` | `Impressive!` | `true` | | |
| `opening` | `maria` | `teleport` | `12,8` | `false` | | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | | |
| `opening` | `maria` | `talk` | `I can teleport too!` | `true` | | |
| `opening` | `lucas` | `talk` | `Can you make the player disappear?` | `true` | | |
| `opening` | `lucas` | `sound` | `Magic1` | `false` | | |
| `opening` | `player` | `transparent` | `true` | `false` | | |
| `opening` | `wait` | `1` | `true` | `nan` | | |
| `opening` | `maria` | `talk` | `The player disappeared!` | `true` | | |
| `opening` | `lucas` | `talk` | `And now they'll reappear!` | `true` | | |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | | |
| `opening` | `player` | `teleport` | `13,7` | `false` | | |
| `opening` | `player` | `turn` | `down` | `false` | | |
| `opening` | `player` | `transparent` | `false` | `false` | | |
| `opening` | `maria` | `balloon` | `3` | `true` | | |
| `opening` | `maria` | `sound` | `Item1` | `false` | | |
| `opening` | `maria` | `talk` | `You win this round!` | `true` | | |
| `opening` | `lucas` | `balloon` | `1` | `true` | | |
| `opening` | `lucas` | `sound` | `Bell2` | `false` | | |
| `opening` | `lucas` | `talk` | `Victory!` | `true` | | |
| `opening` | `maria` | `talk` | `Lead the way!` | `true` | | |
| `opening` | `camera` | `bgm` | `fadeOut,120` | `true` | | |
| `opening` | `camera` | `tone` | `255,255,255,0,60` | `true` | | |
| `opening` | `camera` | `sound` | `Chime1` | `false` | | |
| `opening` | `lucas` | `move` | `6,7` | `false` | | |
| `opening` | `maria` | `move` | `7,7` | `true` | | |
| `opening` | `maria` | `sound` | `Bell3` | `false` | | |
| `opening` | `camera` | `cinematic` | `false` | `true` | | |
| `opening` | `camera` | `focus zoom` | `out` | `true` | | |
| `opening` | `camera` | `focus on` | `player` | `true` | | |
| `opening` | `camera` | `var` | `2,1` | `false` | | |
| `opening` | `camera` | `switch` | `2,on` | `false` | | |
| `opening` | `camera` | `callCommon` | `1` | `false` | | |

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
* **Falar:** `talk` | *Detalhes:* `"Texto entre aspas"` (Obrigatório aspas se usar vírgula)
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
