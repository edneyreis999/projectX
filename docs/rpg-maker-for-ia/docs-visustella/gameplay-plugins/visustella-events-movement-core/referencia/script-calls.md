# Script Calls - VisuStella Events & Movement Core

Documentacao completa de todas as script calls disponiveis no plugin VisuStella Events & Movement Core.

---

## Self Switch Script Calls

### `getSelfSwitchValue(mapID, eventID, switchID)`

Retorna `true` ou `false` do estado de uma Self Switch.

**Parametros:**
- `mapID` (number) - ID do mapa
- `eventID` (number) - ID do evento
- `switchID` (number | string) - ID numerico da Self Switch ou letra entre aspas ('A', 'B', 'C', 'D')

**Exemplos:**
```javascript
getSelfSwitchValue(12, 34, 56)
getSelfSwitchValue(12, 34, 'B')
```

---

### `getSelfVariableValue(mapID, eventID, variableID)`

Retorna o valor armazenado em uma Self Variable.

**Parametros:**
- `mapID` (number) - ID do mapa
- `eventID` (number) - ID do evento
- `variableID` (number) - ID da Self Variable

**Exemplo:**
```javascript
getSelfVariableValue(12, 34, 56)
```

---

### `setSelfSwitchValue(mapID, eventID, switchID, value)`

Define o valor de uma Self Switch.

**Parametros:**
- `mapID` (number) - ID do mapa
- `eventID` (number) - ID do evento
- `switchID` (number | string) - ID numerico ou letra entre aspas
- `value` (boolean) - `true` ou `false` (sem aspas)

**Exemplos:**
```javascript
setSelfSwitchValue(12, 34, 56, false)
setSelfSwitchValue(12, 34, 'B', true)
```

---

### `setSelfVariableValue(mapID, eventID, variableID, value)`

Define o valor de uma Self Variable.

**Parametros:**
- `mapID` (number) - ID do mapa
- `eventID` (number) - ID do evento
- `variableID` (number) - ID da Self Variable
- `value` (any) - Valor a armazenar

**Exemplo:**
```javascript
setSelfVariableValue(12, 34, 56, 88888)
```

---

## Map Switch Script Calls

### `getMapSwitchValue(mapID, switchID)`

Retorna o valor de uma Map Switch.

**Parametros:**
- `mapID` (number) - ID do mapa
- `switchID` (number) - ID da Map Switch

**Exemplo:**
```javascript
getMapSwitchValue(5, 10)
```

---

### `getMapVariableValue(mapID, variableID)`

Retorna o valor de uma Map Variable.

**Parametros:**
- `mapID` (number) - ID do mapa
- `variableID` (number) - ID da Map Variable

**Exemplo:**
```javascript
getMapVariableValue(5, 10)
```

---

### `setMapSwitchValue(mapID, switchID, value)`

Define o valor de uma Map Switch.

**Parametros:**
- `mapID` (number) - ID do mapa
- `switchID` (number) - ID da Map Switch
- `value` (boolean) - `true` ou `false`

**Exemplo:**
```javascript
setMapSwitchValue(5, 10, true)
```

---

### `setMapVariableValue(mapID, variableID, value)`

Define o valor de uma Map Variable.

**Parametros:**
- `mapID` (number) - ID do mapa
- `variableID` (number) - ID da Map Variable
- `value` (any) - Valor a armazenar

**Exemplo:**
```javascript
setMapVariableValue(5, 10, 500)
```

---

## Reference Switches/Variables

Switches e Variables referenciadas pelo nome definido no banco de dados usando `((Nome))`. A busca e **case-insensitive**.

### `$gameSwitches.value('Reference Name')`

Retorna o valor de uma Switch pelo nome de referencia.

```javascript
$gameSwitches.value('Porta Trancada')
```

### `$gameVariables.value('Reference Name')`

Retorna o valor de uma Variable pelo nome de referencia.

```javascript
$gameVariables.value('Contador de Missoes')
```

### `$gameSwitches.setValue('Reference Name', value)`

Define o valor de uma Switch pelo nome de referencia.

```javascript
$gameSwitches.setValue('Porta Trancada', false)
```

### `$gameVariables.setValue('Reference Name', value)`

Define o valor de uma Variable pelo nome de referencia.

```javascript
$gameVariables.setValue('Contador de Missoes', 5)
```

> **Nota:** Reference names funcionam apenas com as funcoes `value()` e `setValue()`. Outras funcoes nativas nao suportam nomes de referencia.

---

## Encounter Check Script Calls

### `$isTileEncounterHalf(x, y)`

Retorna boolean: o tile nas coordenadas (x, y) possui reducao de encounter pela metade?

```javascript
$isTileEncounterHalf(10, 15)
```

### `$isTileEncounterNone(x, y)`

Retorna boolean: o tile nas coordenadas (x, y) possui supressao de encounters?

```javascript
$isTileEncounterNone(10, 15)
```

---

## Move Route Custom Commands

Comandos customizados para uso dentro de **"Script..."** no comando **Set Movement Route**. Estes comandos sao digitados diretamente como texto (sem formatacao de codigo JavaScript).

### Animacao e Efeitos Visuais

| Comando | Descricao |
|---------|-----------|
| `Animation: x` | Reproduz animacao de ID x |
| `Balloon: name` | Reproduz balloon icon. Nomes: `!`, `?`, `Music Note`, `Heart`, `Anger`, `Sweat`, `Cobweb`, `Silence`, `Light Bulb`, `Sleep`, `User-Defined 1` ate `User-Defined 5` |
| `Fade In: x` | Aumenta opacidade gradualmente em x |
| `Fade Out: x` | Reduz opacidade gradualmente em x |
| `Opacity: x%` | Define opacidade em porcentagem |
| `Opacity: +x` | Aumenta opacidade em x |
| `Opacity: -x` | Reduz opacidade em x |

### VS8 Sprite Commands

| Comando | Descricao |
|---------|-----------|
| `Force Carry: On/Off` | Forca pose de carry do VS8 |
| `Force Dash: On/Off` | Forca estado de dash |
| `Pose: name` | Executa pose VS8. Nomes: `Item`, `Hmph`, `Victory`, `Hurt`, `Kneel`, `Collapse`, `!`, `?`, entre outros |

### Index e Pattern

| Comando | Descricao |
|---------|-----------|
| `Index: x` | Define o character index para x |
| `Index: +x` | Incrementa o character index em x |
| `Index: -x` | Decrementa o character index em x |
| `Pattern Lock: x` | Trava o pattern de animacao em x |
| `Pattern Unlock` | Destrava o pattern de animacao |

### Movimento Direcional

| Comando | Descricao |
|---------|-----------|
| `Move Down: x` | Move para baixo x tiles |
| `Move Left: x` | Move para esquerda x tiles |
| `Move Right: x` | Move para direita x tiles |
| `Move Up: x` | Move para cima x tiles |
| `Move Lower Left: x` | Move diagonal inferior esquerda x tiles |
| `Move Lower Right: x` | Move diagonal inferior direita x tiles |
| `Move Upper Left: x` | Move diagonal superior esquerda x tiles |
| `Move Upper Right: x` | Move diagonal superior direita x tiles |

### Movimento Continuo (ate parar)

| Comando | Descricao |
|---------|-----------|
| `Move Down Until Stop` | Move para baixo ate encontrar obstaculo |
| `Move Left Until Stop` | Move para esquerda ate encontrar obstaculo |
| `Move Right Until Stop` | Move para direita ate encontrar obstaculo |
| `Move Up Until Stop` | Move para cima ate encontrar obstaculo |

### Crash Move (ate parar, eventos podem triggerar o jogador)

| Comando | Descricao |
|---------|-----------|
| `Crash Move Down Until Stop` | Crash move para baixo ate obstaculo |
| `Crash Move Left Until Stop` | Crash move para esquerda ate obstaculo |
| `Crash Move Right Until Stop` | Crash move para direita ate obstaculo |
| `Crash Move Up Until Stop` | Crash move para cima ate obstaculo |

### Pathfinding

| Comando | Descricao |
|---------|-----------|
| `Move To: x, y` | Pathfinding ate coordenadas (x, y) |
| `Crash Move To: x, y` | Crash move pathfinding ate coordenadas |
| `Move to Event: x` | Pathfinding ate evento de ID x |
| `Crash Move to Event: x` | Crash move pathfinding ate evento de ID x |
| `Move to Player` | Pathfinding ate o jogador |
| `Move to Home` | Pathfinding ate posicao original |
| `Crash Move to Home` | Crash move pathfinding ate posicao original |

### Jump e Teleporte

| Comando | Descricao |
|---------|-----------|
| `Jump Forward: x` | Salta x tiles na direcao atual |
| `Jump To: x, y` | Salta para coordenadas (x, y) |
| `Jump to Event: x` | Salta para evento de ID x |
| `Jump to Player` | Salta para posicao do jogador |
| `Jump To Home` | Salta para posicao original |
| `Teleport To: x, y` | Teleporta instantaneamente para (x, y) |
| `Teleport to Event: x` | Teleporta para evento de ID x |
| `Teleport to Player` | Teleporta para posicao do jogador |
| `Teleport to Home` | Teleporta para posicao original |

### Step (um passo)

| Comando | Descricao |
|---------|-----------|
| `Step Toward: x, y` | Um passo em direcao a (x, y) |
| `Step Toward Event: x` | Um passo em direcao ao evento ID x |
| `Step Toward Player` | Um passo em direcao ao jogador |
| `Step Toward Home` | Um passo em direcao a posicao original |
| `Step Away From: x, y` | Um passo afastando de (x, y) |
| `Step Away From Event: x` | Um passo afastando do evento ID x |
| `Step Away From Player` | Um passo afastando do jogador |
| `Step Away From Home` | Um passo afastando da posicao original |

### Direcao (Virar)

| Comando | Descricao |
|---------|-----------|
| `Turn To: x, y` | Vira para (x, y) em 8 direcoes |
| `Turn to Event: x` | Vira para evento ID x em 8 direcoes |
| `Turn to Player` | Vira para o jogador em 8 direcoes |
| `Turn to Home` | Vira para posicao original em 8 direcoes |
| `Turn Away From: x, y` | Vira de costas para (x, y) em 8 direcoes |
| `Turn Away From Event: x` | Vira de costas para evento ID x |
| `Turn Away From Player` | Vira de costas para o jogador |
| `Turn Away From Home` | Vira de costas para posicao original |
| `Turn Lower Left` | Vira para diagonal inferior esquerda |
| `Turn Lower Right` | Vira para diagonal inferior direita |
| `Turn Upper Left` | Vira para diagonal superior esquerda |
| `Turn Upper Right` | Vira para diagonal superior direita |

### Wall Hugging

| Comando | Descricao |
|---------|-----------|
| `Hug: Left` | Segue a parede pela esquerda |
| `Hug: Right` | Segue a parede pela direita |

### Self Switch/Variable (Move Route)

| Comando | Descricao |
|---------|-----------|
| `Self Switch x: On` | Ativa Self Switch (A/B/C/D ou ID) |
| `Self Switch x: Off` | Desativa Self Switch |
| `Self Switch x: Toggle` | Alterna Self Switch |
| `Self Variable x: y` | Define Self Variable ID x para valor y |

---

## Variaveis em Move Route Scripts

Dentro de comandos customizados de Move Route, voce pode usar variaveis:

| Formato | Descricao |
|---------|-----------|
| `$gameVariables.value(x)` | Valor da variavel global de ID x (JavaScript) |
| `\V[x]` | Valor da variavel global de ID x (text code) |
| `\SelfVar[x]` | Valor da Self Variable de ID x do evento atual (text code) |

**Exemplo com variavel:**
```
Jump To: $gameVariables.value(10), $gameVariables.value(11)
Move To: \V[5], \V[6]
Self Variable 3: \SelfVar[1]
```
