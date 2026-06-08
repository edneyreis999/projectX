# Event Popup - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**
Requer: **VisuMZ_1_MessageCore**

> **Importante**: Estes comandos NAO podem ser utilizados durante batalha.

---

## Comandos de Popup

Todos os comandos de popup compartilham os mesmos parametros de mensagem e configuracoes visuais. A diferenca entre eles e o **alvo** onde o popup sera exibido.

### Event Popup: Player

Exibe um popup sobre o sprite do jogador.

### Event Popup: Follower

Exibe um popup sobre um membro especifico do grupo (follower).

| Parametro Adicional | Tipo | Descricao | JavaScript |
|---------------------|------|-----------|------------|
| `Follower Index` | Inteiro | Indice do follower (inicia em `0`) | Sim |

### Event Popup: Event

Exibe um popup sobre um evento do mapa.

| Parametro Adicional | Tipo | Descricao | JavaScript |
|---------------------|------|-----------|------------|
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |

### Event Popup: Target Tile

Exibe um popup sobre um tile especifico do mapa.

| Parametro Adicional | Tipo | Descricao | JavaScript |
|---------------------|------|-----------|------------|
| `Map Tile X` | Inteiro | Coordenada X do tile | Sim |
| `Map Tile Y` | Inteiro | Coordenada Y do tile | Sim |

---

## Parametros Comuns a Todos os Popups

### Mensagem

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Message Text` | Texto | Texto do popup (suporta text codes do RPG Maker) | Nao |
| `Message Duration` | Inteiro | Duracao em frames (60 frames = 1 segundo) | Sim |

### Fade Settings (Configuracoes de Fade)

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Fade In Duration` | Inteiro | Duracao do fade in em frames | Sim |
| `Fade Out Duration` | Inteiro | Duracao do fade out em frames | Sim |

### Offset Settings (Configuracoes de Deslocamento)

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Starting Offset X` | Inteiro | Deslocamento X inicial (negativo = esquerda, positivo = direita) | Sim |
| `Starting Offset Y` | Inteiro | Deslocamento Y inicial (negativo = cima, positivo = baixo) | Sim |
| `Ending Offset X` | Inteiro | Deslocamento X final (negativo = esquerda, positivo = direita) | Sim |
| `Ending Offset Y` | Inteiro | Deslocamento Y final (negativo = cima, positivo = baixo) | Sim |

### Scaling Settings (Configuracoes de Escala)

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Starting Scale X` | Decimal | Escala horizontal inicial (0.0 a 1.0) | Sim |
| `Starting Scale Y` | Decimal | Escala vertical inicial (0.0 a 1.0) | Sim |
| `Ending Scale X` | Decimal | Escala horizontal final (0.0 a 1.0) | Sim |
| `Ending Scale Y` | Decimal | Escala vertical final (0.0 a 1.0) | Sim |

### Angle Settings (Configuracoes de Angulo)

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Starting Offset Angle` | Inteiro | Angulo inicial (0 a 360 graus) | Sim |
| `Ending Offset Angle` | Inteiro | Angulo final (0 a 360 graus) | Sim |

### Misc (Diversos)

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Arc Peak` | Inteiro | Pico do arco (positivo = para cima, negativo = para baixo) | Sim |

### Exemplo de Uso

```
Plugin Command: Event Popup: Event
  Event ID: 5
  Message Text: "Item encontrado!"
  Message Duration: 120
  Fade In Duration: 15
  Fade Out Duration: 15
  Starting Offset X: 0
  Starting Offset Y: -40
  Ending Offset X: 0
  Ending Offset Y: -80
  Starting Scale X: 0.5
  Starting Scale Y: 0.5
  Ending Scale X: 1.0
  Ending Scale Y: 1.0
  Starting Offset Angle: 0
  Ending Offset Angle: 0
  Arc Peak: 20
```

### Notas

- **Text Codes** suportados: os mesmos do RPG Maker MZ (ex.: `\C[2]`, `\V[1]`, `\I[10]`).
- **Duration**: 60 frames equivalem a 1 segundo. Use `120` para 2 segundos, `30` para 0.5 segundo.
- **Offset**: Valores negativos movem para esquerda/cima; positivos para direita/baixo.
- **Scale**: Valores entre `0.0` (invisivel) e `1.0` (tamanho normal). Valores acima de 1.0 podem causar distorcao.
- **Arc Peak**: Cria um efeito de arco no movimento do popup. Positivo faz o popup subir durante a animacao.
- Requer o plugin **VisuMZ_1_MessageCore** instalado e ativo.
