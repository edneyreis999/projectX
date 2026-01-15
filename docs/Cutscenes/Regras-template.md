# Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressão) não pode ser executado entre dois comandos `comment`, um com comentário "Start dialog" e outro com comentário "Finish dialog".
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Colocar um "Inicio" e "Fim" (utilizando comentários) de diálogo antes de adicionar ou remover os bustos.
* Sempre que um comando de `move to`, `invisibilidade` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver vários comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* As falas devem estar em português e com acento quando necessário.
* Usar o TF8 para preservar os acentos e pontuação nanos detalhes das ações de `talk`
* O comando de enter/change/exit utiliza o code 357

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Controle de Fluxo

* **Comentário:** `comment` | *Detalhes:* `Comentário em aspas`

### Mensagem

* **Exibir Mensagem:** `talk` | *Detalhes:* `"Texto entre aspas"` (Obrigatorio aspas se usar virgula)
* **Exibir Escolhas:** `choice` | *Detalhes:* `ID_escolha (opcoes: opcao1, opcao2)`
 
### Câmera & Visual - Plugin "Visu MZ"

* **Foco:** `focus on` | *Detalhes:* `character_id`
* **Zoom:** `zoom` ou `focus zoom` | *Detalhes:* `in` ou `out`
* **Tremer:** `shake` | *Detalhes:* (vazio)
* **Flash:** `flash` | *Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`)
* **Tom:** `tone` | *Detalhes:* `r,g,b,gamma,duration`

### Personagem

* **Invisibilidade:** `invisibilidade` | *Detalhes:* `on` ou `off`
* **Balão:** `balloon` | *Detalhes:* ID do icone (1-8)

### Movimento

* **Mover:** `move to` | *Detalhes:* `x,y`
* **Deslocamento do Mapa:** `map_position` | *Detalhes:* `x,y`
* **Virar:** `turn` | *Detalhes:* `up`, `down`, `left`, `right` 

### Bustos - Plugin "VNPicturesBusts"

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
* **Espera Manual:** `wait` | *Detalhes:* `frames`.

# RPG Maker MZ Low-Level Templates (Parametros Vazios)

## Formato padrão (EventCommand)
```json
{"code": <CODE>, "indent": <INDENT>, "parameters": [ ... ]}

| code | Comando (nome “humano”)                | parameters (template)                                                                                      |     |     |                 |     |
| ---: | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --- | --- | --------------- | --- |
|    0 | End of List                            | `[]` (fim da lista do evento)                                                                              |     |     |                 |     |
|  101 | Show Text (header)                     | `["<faceName>", <faceIndex>, <background>, <positionType>, "<speakerName>"]`                               |     |     |                 |     |
|  401 | Show Text (line)                       | `["<textLine>"]` (linha de texto; vem após um 101)                                                         |     |     |                 |     |
|  102 | Show Choices                           | `[[ "<choice1>", "<choice2>", "..."], <cancelType>, <defaultType>, <positionType>, <background>]`          |     |     |                 |     |
|  402 | When [Choice]                          | `[<choiceIndex>, "<choiceText>"]`                                                                          |     |     |                 |     |
|  404 | End of Choices                         | `[]`                                                                                                       |     |     |                 |     |
|  108 | Comment                                | `["<commentLine1>"]`                                                                                       |     |     |                 |     |
|  408 | Comment (cont.)                        | `["<commentLineN>"]` (linhas adicionais do comentário)                                                     |     |     |                 |     |
|  121 | Control Switches                       | `[<startSwitchId>, <endSwitchId>, <value>]` (value: `0=OFF`, `1=ON`)                                       |     |     |                 |     |
|  122 | Control Variables                      | `[<startVarId>, <endVarId>, <operation>, <operandType>, <operandValue>]`                                   |     |     |                 |     |
|  123 | Control Self Switch                    | `["<letter>", <value>]` (letter: `"A"                                                                      | "B" | "C" | "D"`; value: `0 | 1`) |
|  129 | Change Party Member                    | `[<actorId>, <operation>, <initialize>]` (operation: `0=Add`, `1=Remove`; initialize: boolean)             |     |     |                 |     |
|  201 | Transfer Player                        | `[<transferType>, <mapId>, <x>, <y>, <direction>, <fadeType>]`                                             |     |     |                 |     |
|  203 | Set Event Location                     | `[<eventId>, <locationType>, <mapId>, <x>, <y>]`                                                           |     |     |                 |     |
|  205 | Set Movement Route                     | `[<targetId>, { "list": [<MoveRouteCommand>...], "repeat": <bool>, "skippable": <bool>, "wait": <bool> }]` |     |     |                 |     |
|  505 | Move Route (cont.)                     | `[<MoveRouteCommand>]` (continuação de rota iniciada por 205)                                              |     |     |                 |     |
|  212 | Show Animation                         | `[<targetId>, <animationId>, <wait>]`                                                                      |     |     |                 |     |
|  213 | Show Balloon Icon                      | `[<targetId>, <balloonId>, <wait>]`                                                                        |     |     |                 |     |
|  214 | Erase Event                            | `[]`                                                                                                       |     |     |                 |     |
|  221 | Fadeout Screen                         | `[]`                                                                                                       |     |     |                 |     |
|  223 | Tint Screen                            | `[[<r>, <g>, <b>, <gray>], <durationFrames>, <wait>]`                                                      |     |     |                 |     |
|  230 | Wait                                   | `[<frames>]`                                                                                               |     |     |                 |     |
|  241 | Play BGM                               | `[{ "name": "<bgmName>", "volume": <0-100>, "pitch": <50-150>, "pan": <-100..100> }]`                      |     |     |                 |     |
|  250 | Play SE                                | `[{ "name": "<seName>", "volume": <0-100>, "pitch": <50-150>, "pan": <-100..100> }]`                       |     |     |                 |     |
|  261 | Play Movie                             | `["<movieName>"]`                                                                                          |     |     |                 |     |
|  303 | Name Input Processing                  | `[<actorId>, <maxCharacters>]`                                                                             |     |     |                 |     |
|  322 | Change Actor Images                    | `[<actorId>, "<characterName>", <characterIndex>, "<faceName>", <faceIndex>, "<battlerName>"]`             |     |     |                 |     |
|  355 | Script                                 | `["<jsLine1>"]`                                                                                            |     |     |                 |     |
|  655 | Script (cont.)                         | `["<jsLineN>"]`                                                                                            |     |     |                 |     |
|  357 | Plugin Command                         | `["<pluginName>", "<commandSymbol>", "<commandLabel>", { ...args }]`                                       |     |     |                 |     |
|  657 | Plugin “echo/debug line” (do seu mapa) | `["<text>"]`        |     |     |                 |     |

Notas rápidas (pra IA entender sem ambiguidade)

101 sempre vem seguido por 401 (uma ou mais linhas).
205 cria uma rota com objeto route; 505 adiciona comandos extras nessa mesma rota.
indent importa em branches (choices/ifs).

2) Plugin Commands (code 357) — templates por plugin (do Map005)
Formato real do arquivo
{ "code": 357, "indent": <n>, "parameters": ["<plugin>", "<symbol>", "<label>", { "<argKey>": "<argValue>" }] }

2.1) VisuMZ_2_VNPictureBusts
BASIC: Enter Bust (Basic_EnterBust)
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_2_VNPictureBusts",
    "Basic_EnterBust",
    "BASIC: Enter Bust",
    {
      "PictureID:eval": "<string number>",
      "PictureName:str": "<path>",
      "Origin:str": "Bust",
      "Position:num": "<string number>",
      "StartOffsetX:eval": "<expr>",
      "StartOffsetY:eval": "<expr>",
      "EasingType:str": "<easing>",
      "HorzMirror:str": "<mirrorMode>",
      "Duration:eval": "<frames expr>"
    }
  ]
}


O que é cada campo

PictureID:eval: ID do “slot” do bust (no teu padrão é o bustId).
PictureName:str: caminho do arquivo (ex: Portraits/...).
Position:num: posição (string numérica no teu JSON).
StartOffsetX/Y:eval: deslocamento inicial (entra “de fora”).
HorzMirror:str: modo de espelhamento (no teu Map aparece “Auto-Reverse”).
Duration:eval: duração da animação em frames.

BASIC: Exit Bust(s) (Basic_ExitBusts)
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_2_VNPictureBusts",
    "Basic_ExitBusts",
    "BASIC: Exit Bust(s)",
    {
      "PictureID:arrayeval": "<json-string array e.g. [\"1\",\"2\"]>",
      "EndOffsetX:eval": "<expr>",
      "EndOffsetY:eval": "<expr>",
      "EasingType:str": "<easing>",
      "FlipDirection:str": "<flip>",
      "Duration:eval": "<frames expr>",
      "AutoErase:eval": "<true|false>"
    }
  ]
}

2.2) VisuMZ_4_MapCameraZoom
CameraFocusPlayer
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_4_MapCameraZoom",
    "CameraFocusPlayer",
    "<label no seu projeto>",
    {
      "Duration:num": "<string number>",
      "EasingType:str": "<easing>"
    }
  ]
}

CameraFocusTargetEvent
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_4_MapCameraZoom",
    "CameraFocusTargetEvent",
    "<label no seu projeto>",
    {
      "EventID:eval": "<string expr>",
      "Duration:num": "<string number>",
      "EasingType:str": "<easing>"
    }
  ]
}

CameraFocusWait
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_4_MapCameraZoom",
    "CameraFocusWait",
    "Camera: Wait for Focus",
    {}
  ]
}

2.3) PKD_VisualChoices_MZ
OpenVisualChoice
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "PKD_VisualChoices_MZ",
    "OpenVisualChoice",
    "<label no seu projeto>",
    {
      "menuId": "<string/number>",
      "posType": "<string/number>",
      "screenXY": "<string>",
      "headerText": "<string>",
      "source": "<string>"
    }
  ]
}

2.4) VisuMZ_1_EventsMoveCore
PlayerMovementChange
{
  "code": 357,
  "indent": 0,
  "parameters": [
    "VisuMZ_1_EventsMoveCore",
    "PlayerMovementChange",
    "<label no seu projeto>",
    {
      "Enable:eval": "<true|false>"
    }
  ]
}

3) MoveRouteCommand codes usados dentro do 205/505 (no Map005)

Dentro de 205.parameters[1].list[] (e de 505.parameters[0]) aparecem objetos assim:

{ "code": <moveCode>, "parameters": [ ... ] }

MoveRouteCommand encontrados no Map005
moveCode	template	observação
0	{ "code": 0 }	fim da rota
9	{ "code": 9 }	sem parâmetros no teu map (significado exato depende do engine; dá pra confirmar olhando rmmz_objects.js → moveRoute)
16	{ "code": 16 }	sem parâmetros (mesma observação)
19	{ "code": 19 }	sem parâmetros
25	{ "code": 25 }	sem parâmetros
45	{ "code": 45, "parameters": ["Move to: <x>,<y>"] }	no teu map ele carrega uma string “Move to: 12,14” — isso costuma vir de plugin/roteamento custom
::contentReference[oaicite:0]{index=0}