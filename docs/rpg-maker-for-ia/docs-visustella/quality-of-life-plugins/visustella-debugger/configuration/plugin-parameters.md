# Plugin Parameters — Quick Commands

## Seção Configurável

O VisuStella Debugger possui uma seção de Plugin Parameters dedicada à customização de Quick Commands.

### Quick Command List

Lista de comandos customizados que aparecem no menu "Quick" do debugger. Cada entrada possui:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| **Name** | String | Nome do comando exibido no menu Quick |
| **Icon** | Integer | Índice do ícone (icon index) usado no comando |
| **Help** | String | Texto de ajuda exibido ao selecionar o comando |
| **Close Debugger on Select** | Boolean | Se `true`, fecha o debugger após executar a ação |
| **JS: Visibility** | JS Code | Código JavaScript que determina se o comando é visível. Retorne `true` para mostrar, `false` para ocultar |
| **JS: Action** | JS Code | Código JavaScript executado quando o comando é selecionado |

### Contexto JavaScript

Os campos JS são avaliados no contexto global do RPG Maker MZ. Variáveis e objetos disponíveis incluem:

- `$gameParty` — Party do jogador
- `$gameActors` — Atores do jogo
- `$gameVariables` — Variáveis do jogo
- `$gameSwitches` — Switches do jogo
- `$gamePlayer` — Player character
- `$gameMap` — Mapa atual
- `SceneManager` — Gerenciador de scenes

### Exemplos de Quick Commands

```javascript
// Visibility: mostrar apenas no mapa
SceneManager._scene instanceof Scene_Map

// Action: dar 1000 gold
$gameParty._gold += 1000;

// Action: curar party inteira
$gameParty.members().forEach(m => m.setHp(m.mhp));

// Action: resetar switch 10
$gameSwitches.setValue(10, false);
```
