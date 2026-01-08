# Design de Cutscene

**Descrição:** Cutscene de diálogo no Coreto (Mapa 005) com Reed apresentando a história de Gildrat; inclui escolha do nome do jogador e bustos.
**Cutscene:** Rheed na noite da história
**Mapa onde acontece:** `005` (Coreto)
**Personagens Envolvidos:**

* [Reed] (Evento ID: `17`)
* [Jogador] (Actor ID: `1`)
* [Criança Orc] (busto; sem evento no mapa)

**Bustos Envolvidos:**

* [Reed] (ID: `1`, arquivo: `Portraits/Principal/Reed final`)
* [Criança Orc] (ID: `2`, arquivo: `Portraits/Principal/CriancaOrc_`)

---

## Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Rheed na noite da história` | `bust` | `enter` | `Reed final, 1, 5, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Olha só quem chegou atrasado! A gente estava te esperando...` | `true` | |
| `Rheed na noite da história` | `bust` | `exit` | `1, offsetX=-200, offsetY=0, easing=InSine, duration=20` | `true` | |
| `Rheed na noite da história` | `Reed` | `move` | `12,14 (rota; turn toward player)` | `true` | |
| `Rheed na noite da história` | `bust` | `enter` | `Reed final, 1, 5, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Humm... acho que já vi você antes! Seu nome é Dulgarin, certo?` | `true` | |
| `Rheed na noite da história` | `bust` | `exit` | `1, offsetX=-200, offsetY=0, easing=InSine, duration=20` | `true` | |
| `Rheed na noite da história` | `sistema` | `choice` | `qualSeuNome (opções: qualSeuNome1, qualSeuNome2)` | `true` | |
| `Rheed na noite da história` | `bust` | `enter` | `Reed final, 1, 9, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `Reed` | `talk` | `Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem!` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `bust` | `enter` | `CriancaOrc_, 2, 1, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto, duration=20` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `sistema` | `switch` | `44, on` | `false` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `Criança Orc` | `talk` | `Como você sabia o meu nome?!` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `Reed` | `talk` | `Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!!` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `bust` | `exit` | `1,2, offsetX=+200, offsetY=0, easing=InSine, duration=20` | `true` | `Opcao: qualSeuNome1` |
| `Rheed na noite da história` | `bust` | `enter` | `CriancaOrc_, 2, 5, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto, duration=20` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `sistema` | `switch` | `44, on` | `false` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `Criança Orc` | `talk` | `Você quase acertou, miseravi! Eu disse quase. Só errou a pronúncia, todas as letras e a pessoa. Não sou Dulgarin, meu nome é...` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `bust` | `exit` | `2, offsetX=-200, offsetY=0, easing=InSine, duration=20` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `sistema` | `name input` | `Actor 1, max 8` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `bust` | `enter` | `Reed final, 1, 5, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `Reed` | `talk` | `É um prazer te conhecer, \\N[1]! Agora, voltando à nossa história...` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `bust` | `exit` | `1, offsetX=-200, offsetY=0, easing=InSine, duration=20` | `true` | `Opcao: qualSeuNome2` |
| `Rheed na noite da história` | `Reed` | `move` | `8,11 (rota; turn down)` | `true` | |
| `Rheed na noite da história` | `bust` | `enter` | `Reed final, 1, 5, offsetX=-200, offsetY=0, easing=OutSine, mirror=Auto-Reverse, duration=20` | `true` | |
| `Rheed na noite da história` | `sistema` | `switch` | `43, on` | `false` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa!` | `true` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Antes de qualquer coisa, preciso contar a história de Gildrat, o Império dos Anões!` | `true` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Essa história começa com um anão cabeça dura, chamado Thorin!` | `true` | |
| `Rheed na noite da história` | `Reed` | `talk` | `Vamos, feche os olhos! E deixe essa antiga poção te transportar para a história.` | `true` | |
| `Rheed na noite da história` | `bust` | `exit` | `1, offsetX=-200, offsetY=0, easing=InSine, duration=20` | `true` | |
| `Rheed na noite da história` | `sistema` | `quest` | `ShowDescriptionForQuest("assistirNoiteHistoria", 3)` | `false` | |
| `Rheed na noite da história` | `sistema` | `quest` | `CompleteQuest("assistirNoiteHistoria")` | `false` | |
| `Rheed na noite da história` | `sistema` | `variável` | `26 = 3` | `false` | |

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

### Bustos

* **Adicionar:** `enter` | *Detalhes:* `filename, ID_bust, position`
* **Trocar:** `change` | *Detalhes:* `filename, ID_bust`
* **Tirar:** `exit` | *Detalhes:* `ID_bust`

### Áudio

* **Música:** `bgm` | *Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration`
* **Som:** `sound` | *Detalhes:* `filename` (SE)
* **Voz:** `voice` | *Detalhes:* `filename`

### Sistema

* **Variável:** `var` | *Detalhes:* `ID, valor`
* **Switch:** `switch` | *Detalhes:* `ID, on/off`
* **Common Event:** `callCommon` | *Detalhes:* `ID`
* **Espera Manual:** `wait` | *Detalhes:* `frames`
