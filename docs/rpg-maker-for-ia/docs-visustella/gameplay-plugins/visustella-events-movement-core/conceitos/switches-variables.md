# Switches e Variaveis Avancadas

O Events & Movement Core expande o sistema nativo de Switches e Variables do RPG Maker MZ com quatro tipos adicionais, habilitados por tags no nome do Switch/Variable no banco de dados.

> **IMPORTANTE:** As tags sao mutuamente exclusivas. Um Switch/Variable so pode ter **uma** tag por vez (`<JS>`, `<Self>`, `<Map>` ou `<Global>`).

---

## 1. JavaScript em Switches/Variaveis — `<JS>`

Permite executar codigo JavaScript diretamente no campo de nome do Switch ou Variable.

### Como Usar

No campo **nome** do Switch ou Variable, insira a tag `<JS>` seguida do codigo e feche com `</JS>`:

```
<JS> $gameParty.gold() > 1000 </JS>
```

Esse Switch sera `true` quando o jogador tiver mais de 1000 gold. O codigo e avaliado toda vez que o valor do Switch e consultado.

### Restricoes

- Mutuamente exclusivo com `<Self>`, `<Map>` e `<Global>`.
- Nao pode ser combinado com outras tags no mesmo Switch/Variable.
- O retorno do codigo JavaScript determina o valor (truthy/falsy para Switches, numerico para Variables).

### Exemplos

**Switch que verifica nivel do personagem:**

```
<JS> $gameActors.actor(1).level >= 10 </JS>
```

**Variable com calculo dinamico:**

```
<JS> $gameParty.members().length * 5 </JS>
```

---

## 2. Self Switches e Self Variables — `<Self>`

Converte um Switch ou Variable comum em um **Self Switch** ou **Self Variable**, vinculado ao evento e ao mapa onde e utilizado.

O RPG Maker MZ nativo possui apenas 4 Self Switches (A, B, C, D). Com esta tag, voce pode criar Self Switches e Self Variables **ilimitados**, usando IDs numericos acima dos padsrao.

### Como Usar

No campo **nome** do Switch ou Variable, adicione a tag `<Self>`:

```
Minha Self Switch <Self>
```

### Script Calls

**Consultar valores:**

```javascript
// Self Switch
getSelfSwitchValue(mapID, eventID, switchID)

// Self Variable
getSelfVariableValue(mapID, eventID, variableID)
```

**Definir valores:**

```javascript
// Self Switch
setSelfSwitchValue(mapID, eventID, switchID, value)

// Self Variable
setSelfVariableValue(mapID, eventID, variableID, value)
```

| Parametro | Tipo | Descricao |
|---|---|---|
| `mapID` | Number | ID do mapa |
| `eventID` | Number | ID do evento |
| `switchID` / `variableID` | Number | ID do Switch/Variable no banco de dados |
| `value` | Boolean / Number | Valor a ser definido |

### Exemplos

```javascript
// Verificar se a Self Switch 6 esta ativa no evento 3 do mapa 12
getSelfSwitchValue(12, 3, 6)

// Ativar a Self Switch 6
setSelfSwitchValue(12, 3, 6, true)

// Consultar uma Self Variable
getSelfVariableValue(5, 1, 15)

// Definir uma Self Variable
setSelfVariableValue(5, 1, 15, 42)
```

---

## 3. Map Switches e Map Variables — `<Map>`

Cria Switches e Variables com escopo de **mapa**. O valor e armazenado por mapa e persiste enquanto o mapa esta em memoria (ao sair e voltar ao mapa, os valores sao preservados se o mapa ainda esta em cache).

### Como Usar

No campo **nome** do Switch ou Variable, adicione a tag `<Map>`:

```
Chest Aberto <Map>
```

### Script Calls

**Consultar valores:**

```javascript
// Map Switch
getMapSwitchValue(mapID, switchID)

// Map Variable
getMapVariableValue(mapID, variableID)
```

**Definir valores:**

```javascript
// Map Switch
setMapSwitchValue(mapID, switchID, value)

// Map Variable
setMapVariableValue(mapID, variableID, value)
```

| Parametro | Tipo | Descricao |
|---|---|---|
| `mapID` | Number | ID do mapa |
| `switchID` / `variableID` | Number | ID do Switch/Variable no banco de dados |
| `value` | Boolean / Number | Valor a ser definido |

### Exemplos

```javascript
// Verificar se o baú foi aberto no mapa 8
getMapSwitchValue(8, 20)

// Marcar como aberto
setMapSwitchValue(8, 20, true)

// Consultar variavel de mapa
getMapVariableValue(3, 50)

// Definir variavel de mapa
setMapVariableValue(3, 50, 100)
```

### Caso de Uso Tipico

Ideal para dados que devem ser compartilhados entre **todos os eventos de um mesmo mapa**, mas isolados entre mapas diferentes (ex.: estado de puzzles, baús, portas).

---

## 4. Reference Switches e Reference Variables — `((Nome))`

> Disponivel a partir da **versao 1.62** do plugin.

Permite referenciar Switches e Variables por **nome (string)** em script calls, em vez de usar o ID numerico.

### Como Usar

No campo **nome** do Switch ou Variable, envolva o nome de referencia com **duplo parentese**:

```
((Priscilla Joined))
```

Isso permite usar a string `'Priscilla Joined'` como identificador em script calls:

```javascript
// Verificar o valor
$gameSwitches.value('Priscilla Joined')   // Retorna true/false
$gameVariables.value('Priscilla Joined')  // Retorna o valor numerico

// Definir o valor
$gameSwitches.setValue('Priscilla Joined', true)
$gameVariables.setValue('Priscilla Joined', 500)
```

### Compatibilidade

| Funcao | Suporta Reference |
|---|---|
| `$gameSwitches.value(id)` | Sim |
| `$gameSwitches.setValue(id, value)` | Sim |
| `$gameVariables.value(id)` | Sim |
| `$gameVariables.setValue(id, value)` | Sim |

### Regras

- A busca pelo nome e **case-insensitive** (`'Priscilla Joined'` equivale a `'priscilla joined'`).
- O ID numerico continua funcionando normalmente. A referencia por nome e uma alternativa.
- So funciona com `$gameSwitches` e `$gameVariables` (nao se aplica a Self/Map switches).

---

## Resumo de Tags

| Tag | Escopo | Mutuamente Exclusiva | Disponibilidade |
|---|---|---|---|
| `<JS>` | Dinamico (JS) | Sim | Todas as versoes |
| `<Self>` | Evento + Mapa | Sim | Todas as versoes |
| `<Map>` | Mapa | Sim | Todas as versoes |
| `((Nome))` | Global (por nome) | Nao (e complementar) | v1.62+ |

> **Nota:** `<JS>`, `<Self>` e `<Map>` nao podem ser usados simultaneamente no mesmo Switch/Variable. A referencia `((Nome))` funciona de forma independente e pode coexistir com qualquer uma das outras tags.
