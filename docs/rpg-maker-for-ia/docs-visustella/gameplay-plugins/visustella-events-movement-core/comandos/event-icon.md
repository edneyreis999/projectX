# Event Icon - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Comandos de Icone de Evento

### Event Icon: Change (Temporary)

Altera o icone de um evento. A mudanca e temporaria e sera revertida quando um novo evento for carregado.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Icon Index` | Inteiro | Indice do icone a ser exibido | Sim |
| `Buffer X` | Inteiro | Deslocamento horizontal do icone | Sim |
| `Buffer Y` | Inteiro | Deslocamento vertical do icone | Sim |
| `Blend Mode` | Inteiro | Modo de blend do icone | Sim |

### Event Icon: Change (Forced)

Altera o icone de um evento de forma forcada. A mudanca persiste ate que seja explicitamente restaurada com `Event Icon: Restore`.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Icon Index` | Inteiro | Indice do icone a ser exibido | Sim |
| `Buffer X` | Inteiro | Deslocamento horizontal do icone | Sim |
| `Buffer Y` | Inteiro | Deslocamento vertical do icone | Sim |
| `Blend Mode` | Inteiro | Modo de blend do icone | Sim |

### Event Icon: Delete

Remove permanentemente o icone de um evento.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |

### Event Icon: Restore

Restaura o icone de um evento que foi deletado ou alterado de forma forcada.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |

---

## Comandos de Icone do Jogador

### Player Icon: Change

Altera o icone exibido sobre o sprite do jogador.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Icon Index` | Inteiro | Indice do icone a ser exibido | Sim |
| `Buffer X` | Inteiro | Deslocamento horizontal do icone | Sim |
| `Buffer Y` | Inteiro | Deslocamento vertical do icone | Sim |
| `Blend Mode` | Inteiro | Modo de blend do icone | Sim |

### Player Icon: Delete

Remove o icone do sprite do jogador.

### Notas Gerais

- **Icon Index** refere-se ao ID do icone no database do RPG Maker MZ (ver aba Icons).
- **Buffer X/Y** permite posicionar o icone com precisao em relacao ao sprite.
- **Blend Mode**: `0` = Normal, `1` = Add, `2` = Multiply, `3` = Screen.
- A diferenca entre Temporary e Forced e a persistencia: Temporary reverte ao trocar de evento, Forced exige restore manual.
