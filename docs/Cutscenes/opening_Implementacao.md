# Design de Cutscene

**Descrição:** Cutscene de abertura em que Kilin e Mhordred brincam com efeitos de invisibilidade e teletransporte para quebrar o gelo com o jogador e mostrar que a Guarda de Ferro funciona como dupla bem-humorada e protetora.
**Cutscene:** Opening de Kilin e Mhordred
**Mapa onde acontece:** `044` frontend\data\Map044.json

**Personagens Envolvidos:**

* [Kilin] (Actor ID: `002`)
* [Mhordred] (Actor ID: `001`)
* [Jogador] (Actor ID: n/a)

**Bustos Envolvidos:**

* [Kilin] (ID: `1`, arquivo: `Portraits/Principal/Kilin.png`)
* [Mhordred] (ID: `2`, arquivo: `Portraits/Principal/Mhordred.png`)

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressão) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Colocar um "Inicio" e "Fim" de diálogo antes de adicionar ou remover os bustos.
* Sempre que um comando de `move to`, `invisibilidade` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver vários comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* As falas devem estar em português e com acento quando necessário.
* Sempre analise a necessidade do `Auto-Reverse` em `h_mirror` para os bustos.
* O arquivo de saída deve ter o nome da cena e "Implementacao".

## Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `opening` | `camera` | `cinematic` | `true` | `true` |  |
| `opening` | `camera` | `bgm` | `play,Field1,70,true` | `true` |  |
| `opening` | `camera` | `var` | `1,1` | `false` |  |
| `opening` | `camera` | `switch` | `1,on` | `false` |  |
| `opening` | `kilin` | `focus zoom` | `in` | `true` |  |
| `opening` | `kilin` | `move` | `10,8` | `true` |  |
| `opening` | `kilin` | `sound` | `Bell1` | `false` |  |
| `opening` | `kilin` | `turn` | `up` | `false` |  |
| `opening` | `kilin` | `balloon` | `1` | `true` |  |
| `opening` | `kilin` | `talk` | `Que manhã linda!` | `true` |  |
| `opening` | `camera` | `voice` | `Bell1` | `true` |  |
| `opening` | `mhordred` | `focus zoom` | `in` | `true` |  |
| `opening` | `mhordred` | `move` | `13,8` | `true` |  |
| `opening` | `mhordred` | `sound` | `Bell2` | `false` |  |
| `opening` | `mhordred` | `turn` | `left` | `false` |  |
| `opening` | `mhordred` | `balloon` | `2` | `true` |  |
| `opening` | `mhordred` | `talk` | `Kilin! Você acordou cedo!` | `true` |  |
| `opening` | `kilin` | `turn` | `right` | `false` |  |
| `opening` | `kilin` | `sound` | `Bell3` | `false` |  |
| `opening` | `kilin` | `focus zoom` | `in` | `true` |  |
| `opening` | `kilin` | `talk` | `Ei! Eu nem sempre me atraso!` | `true` |  |
| `opening` | `mhordred` | `talk` | `E ontem?` | `true` |  |
| `opening` | `kilin` | `balloon` | `3` | `true` |  |
| `opening` | `kilin` | `sound` | `Item1` | `false` |  |
| `opening` | `kilin` | `talk` | `Aquela foi uma soneca estratégica!` | `true` |  |
| `opening` | `mhordred` | `talk` | `Soneca estratégica?` | `true` |  |
| `opening` | `kilin` | `shake` | `true` | `-` |  |
| `opening` | `kilin` | `sound` | `Blow1` | `false` |  |
| `opening` | `kilin` | `talk` | `Meu estômago está protestando!` | `true` |  |
| `opening` | `camera` | `flash` | `255,255,255,30` | `true` |  |
| `opening` | `camera` | `sound` | `Lightning1` | `false` |  |
| `opening` | `mhordred` | `balloon` | `1` | `true` |  |
| `opening` | `mhordred` | `talk` | `Uau! O que foi isso?` | `true` |  |
| `opening` | `camera` | `tone` | `255,180,120,80,60` | `true` |  |
| `opening` | `camera` | `sound` | `Chime1` | `false` |  |
| `opening` | `kilin` | `talk` | `Agora tudo tem um brilho aconchegante!` | `true` |  |
| `opening` | `mhordred` | `talk` | `Isso está bem acolhedor!` | `true` |  |
| `opening` | `kilin` | `talk` | `Olha esse truque mágico!` | `true` |  |
| `opening` | `kilin` | `sound` | `Magic1` | `false` |  |
| `opening` | `kilin` | `transparent` | `true` | `false` |  |
| `opening` | `wait` | `1` | `true` | `-` |  |
| `opening` | `kilin` | `talk` | `Tcharam! Estou invisível!` | `true` |  |
| `opening` | `mhordred` | `talk` | `Você está apenas transparente!` | `true` |  |
| `opening` | `kilin` | `transparent` | `false` | `false` |  |
| `opening` | `kilin` | `turn` | `right` | `false` |  |
| `opening` | `kilin` | `sound` | `Item1` | `false` |  |
| `opening` | `kilin` | `talk` | `Tudo bem! Veja isso!` | `true` |  |
| `opening` | `kilin` | `teleport` | `11,8` | `false` |  |
| `opening` | `camera` | `flash` | `0,255,255,20` | `true` |  |
| `opening` | `camera` | `sound` | `Teleport1` | `false` |  |
| `opening` | `kilin` | `talk` | `Teletransporte!` | `true` |  |
| `opening` | `mhordred` | `turn` | `left` | `false` |  |
| `opening` | `mhordred` | `sound` | `Bell1` | `false` |  |
| `opening` | `mhordred` | `talk` | `Impressionante!` | `true` |  |
| `opening` | `mhordred` | `teleport` | `12,8` | `false` |  |
| `opening` | `camera` | `sound` | `Teleport1` | `false` |  |
| `opening` | `mhordred` | `talk` | `Eu também consigo teleportar!` | `true` |  |
| `opening` | `kilin` | `talk` | `Você consegue fazer o jogador desaparecer?` | `true` |  |
| `opening` | `kilin` | `sound` | `Magic1` | `false` |  |
| `opening` | `player` | `transparent` | `true` | `false` |  |
| `opening` | `wait` | `1` | `true` | `-` |  |
| `opening` | `mhordred` | `talk` | `O jogador desapareceu!` | `true` |  |
| `opening` | `kilin` | `talk` | `E agora eles vão reaparecer!` | `true` |  |
| `opening` | `camera` | `sound` | `Teleport1` | `false` |  |
| `opening` | `player` | `teleport` | `13,7` | `false` |  |
| `opening` | `player` | `turn` | `down` | `false` |  |
| `opening` | `player` | `transparent` | `false` | `false` |  |
| `opening` | `mhordred` | `balloon` | `3` | `true` |  |
| `opening` | `mhordred` | `sound` | `Item1` | `false` |  |
| `opening` | `mhordred` | `talk` | `Você venceu esta rodada!` | `true` |  |
| `opening` | `kilin` | `balloon` | `1` | `true` |  |
| `opening` | `kilin` | `sound` | `Bell2` | `false` |  |
| `opening` | `kilin` | `talk` | `Vitória!` | `true` |  |
| `opening` | `mhordred` | `talk` | `Lidere o caminho!` | `true` |  |
| `opening` | `camera` | `bgm` | `fadeOut,120` | `true` |  |
| `opening` | `camera` | `tone` | `255,255,255,0,60` | `true` |  |
| `opening` | `camera` | `sound` | `Chime1` | `false` |  |
| `opening` | `kilin` | `move` | `6,7` | `false` |  |
| `opening` | `mhordred` | `move` | `7,7` | `true` |  |
| `opening` | `mhordred` | `sound` | `Bell3` | `false` |  |
| `opening` | `camera` | `cinematic` | `false` | `true` |  |
| `opening` | `camera` | `focus zoom` | `out` | `true` |  |
| `opening` | `camera` | `focus on` | `player` | `true` |  |
| `opening` | `camera` | `var` | `2,1` | `false` |  |
| `opening` | `camera` | `switch` | `2,on` | `false` |  |
| `opening` | `camera` | `callCommon` | `1` | `false` |  |

---

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Mensagem

* **Exibir Mensagem:** `talk` | *Detalhes:* `"Texto entre aspas"` (obrigatório usar aspas se o texto tiver vírgula)
* **Exibir Escolhas:** `choice` | *Detalhes:* `ID_escolha (opções: opção1, opção2)`

### Câmera & Visual - Plugin "Visu MZ"

* **Foco:** `focus on` | *Detalhes:* `character_id`
* **Zoom:** `zoom` ou `focus zoom` | *Detalhes:* `in` ou `out`
* **Barras Pretas:** `cinematic` | *Detalhes:* `true` (ativar) ou `false` (desativar)
* **Tremer:** `shake` | *Detalhes:* (vazio)
* **Flash:** `flash` | *Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`)
* **Tom:** `tone` | *Detalhes:* `r,g,b,gamma,duration`

### Personagem

* Toda ação de rota de movimento seguida uma da outra e com o mesmo personagem deve ser agrupada em um único comando.
* **Mover:** `move to` | *Detalhes:* `x,y`
* **Teleportar:** `posicao_evento` | *Detalhes:* `x,y`
* **Virar:** `turn` | *Detalhes:* `up`, `down`, `left`, `right`
* **Falar:** `talk` | *Detalhes:* `"Texto entre aspas"` (obrigatório usar aspas se houver vírgula)
* **Balão:** `balloon` | *Detalhes:* ID do ícone (1-8)
* **Invisibilidade:** `invisibilidade` | *Detalhes:* `true` ou `false`

### Movimento

* Agrupe trajetórias de movimento contínuas (mesmo personagem) em um único comando para evitar duplicação.
* Lembre de aplicar `wait` no último comando da rota e retirar os bustos sempre que houver movimento ou mudança de direção.

### Bustos - Plugin "VNPicturesBusts"

* **Adicionar:** `enter` | *Detalhes:* `filename, ID_busto, position, h_mirror`
* **Trocar:** `change` | *Detalhes:* `filename, ID_busto`
* **Tirar:** `exit` | *Detalhes:* `ID_busto`

### Áudio

* **Música:** `bgm` | *Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration`
* **Som:** `sound` | *Detalhes:* `filename` (SE)
* **Voz:** `voice` | *Detalhes:* `filename`

### Sistema

* **Variável:** `var` | *Detalhes:* `ID, valor`
* **Switch:** `switch` | *Detalhes:* `ID, on/off`
* **Common Event:** `callCommon` | *Detalhes:* `ID`
* **Espera Manual:** `wait` | *Detalhes:* `frames`
