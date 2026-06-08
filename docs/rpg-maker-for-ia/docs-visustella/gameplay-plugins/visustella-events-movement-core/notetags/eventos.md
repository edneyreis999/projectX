# Notetags de Eventos — VisuStella Events & Movement Core

Notetags aplicadas em eventos. Podem ser usadas como **notetags** (afetam todas as paginas do evento) ou como **comment tags** (afetam apenas a pagina onde o comentario esta). Itens marcados com "NOTETAG ONLY" funcionam apenas como notetag.

---

## 1. Ativacao

Controlam como e quando o evento pode ser ativado pelo jogador.

### `<Activation Region: x>` / `<Activation Regions: x,x,x>`

```text
<Activation Region: 5>
<Activation Regions: 5, 10, 15>
```

Permite ativar o evento remotamente quando o jogador pisa em uma das regioes listadas, sem precisar estar diretamente sobre o evento.

### Tags de Area de Ativacao

```text
<Activation Square: x>
<Activation Circle: x>
<Activation Delta: x>
<Activation Row: x>
<Activation Column: x>
```

Expande a area de ativacao do evento para um formato geometrico com raio `x` tiles.

| Formato    | Descricao                                      |
|------------|------------------------------------------------|
| `Square`   | Quadrado centrado no evento                    |
| `Circle`   | Circulo centrado no evento                     |
| `Delta`    | Triangulo (delta) centrado no evento           |
| `Row`      | Linha horizontal passando pelo evento          |
| `Column`   | Linha vertical passando pelo evento            |

### `<Click Trigger>`

```text
<Click Trigger>
```

Permite ativar o evento clicando com o mouse diretamente sobre ele, sem necessidade de pressionar o botao de acao.

**Notas de uso:**
- **Nao e possivel combinar** tags de ativacao. Use apenas uma por evento/pagina.
- `Activation Region` e `Click Trigger` podem coexistir em cenarios especificos, mas recomenda-se testar.
- As areas de ativacao funcionam independentemente de regioes — sao baseadas em distancia de tiles.

---

## 2. Controle de Movimento

### `<Always Update Movement>`

```text
<Always Update Movement>
```

Forca o evento a ter seu movimento atualizado mesmo quando esta fora da tela. Por padrao, eventos fora da tela nao executam rotas de movimento automatico.

### `<Move Only Region: x>` / `<Move Only Regions: x,x,x>`

```text
<Move Only Region: 10>
<Move Only Regions: 10, 20, 30>
```

Restringe o movimento do evento apenas aos tiles marcados com as regioes listadas. **Ignora a passabilidade original do terrain**, permitindo que o evento ande sobre tiles normalmente intransponhaveis se estiverem marcados com a regiao.

### Sincronizacao de Movimento

```text
<Move Synch Target: Player>
<Move Synch Target: Event 5>
```

Sincroniza o movimento deste evento com um alvo (jogador ou outro evento). O evento copia o padrao de movimento do alvo.

```text
<Move Synch Type: Random>
<Move Synch Type: Approach>
<Move Synch Type: Away>
<Move Synch Type: Custom>
<Move Synch Type: Mimic>
<Move Synch Type: Reverse Mimic>
<Move Synch Type: Mirror Horizontal>
<Move Synch Type: Mirror Vertical>
```

Define o tipo de sincronizacao:

| Tipo               | Comportamento                                      |
|--------------------|----------------------------------------------------|
| `Random`           | Movimento aleatorio sincronizado                    |
| `Approach`         | Aproxima do alvo sincronizado                      |
| `Away`             | Afasta do alvo sincronizado                        |
| `Custom`           | Usa rota customizada sincronizada                  |
| `Mimic`            | Copia exatamente o movimento do alvo               |
| `Reverse Mimic`    | Copia o movimento do alvo invertido                |
| `Mirror Horizontal`| Espelha horizontalmente o movimento do alvo        |
| `Mirror Vertical`  | Espelha verticalmente o movimento do alvo          |

```text
<Move Synch Delay: x>
```

Adiciona um atraso de `x` frames entre cada movimento sincronizado, criando um efeito de "segue com delay".

```text
<Move Synch Distance Opacity: x>
```

Faz a opacidade do evento variar com a distancia do alvo sincronizado. `x` e a distancia maxima para opacidade total — alem disso o evento comeca a ficar transparente.

---

## 3. Controle de Encontros

Controla a taxa de encontros aleatorios em areas ao redor do evento.

### Reduzir Encontros pela Metade

```text
<Encounter Half Square: x>
<Encounter Half Circle: x>
<Encounter Half Delta: x>
<Encounter Half Row: x>
<Encounter Half Column: x>
```

Reduz a taxa de encontros em 50% dentro da area geometrica especificada com raio `x` tiles.

### Suprimir Encontros Completamente

```text
<Encounter None Square: x>
<Encounter None Circle: x>
<Encounter None Delta: x>
<Encounter None Row: x>
<Encounter None Column: x>
```

Elimina completamente encontros aleatorios dentro da area geometrica com raio `x`.

### Script Calls

```javascript
$isTileEncounterHalf(x, y)  // Retorna true se o tile (x,y) esta em area de Half
$isTileEncounterNone(x, y)  // Retorna true se o tile (x,y) esta em area de None
```

### Auto-Eraser Condicional

```text
<Erase if Encounter Half>
<Erase if Encounter None>
```

Apaga automaticamente o evento (equivalente ao comando `Erase Event`) se ele estiver posicionado em uma area com encontro reduzido ou suprimido.

**Notas de uso:**
- As areas de encontro sao relativas a posicao do evento.
- `None` tem prioridade sobre `Half` em areas sobrepostas.
- Os formatos geometricos sao os mesmos das tags de ativacao (Square, Circle, Delta, Row, Column).

---

## 4. Visual

### Icone Acima do Evento

```text
<Icon: x>
```

Exibe o icone de ID `x` acima do evento. Usa o IconSet do database.

```text
<Icon Buffer X: +5>
<Icon Buffer Y: -3>
```

Ajusta o deslocamento do icone em pixels. Valores positivos movem para a direita/baixo, negativos para a esquerda/cima.

### Rotulo de Texto

```text
<Label: texto aqui>
```

Exibe um rotulo de texto acima do evento em linha unica.

```text
<Label>
Linha 1
Linha 2
</Label>
```

Rotulo multi-linha. Suporta text codes do RPG Maker (`\N[1]`, `\V[1]`, etc.).

```text
<Label Range: 5>
```

Distancia maxima (em tiles) para o rotulo ser visivel. Alem dessa distancia, o rotulo desaparece.

```text
<Label Range Type: Square>
<Label Range Type: Circle>
<Label Range Type: Diamond>
```

Formato geometrico da area de visibilidade do rotulo. Padrao: depende da configuracao do plugin.

```text
<Label Offset X: +10>
<Label Offset Y: -5>
```

Deslocamento em pixels da posicao do rotulo.

```text
<Label Hue Shift: +2>
```

Aplica deslocamento de matiz (hue) ao rotulo, criando efeito de animacao de cores. Valor em unidades de matiz por frame.

### Espelho e Escala

```text
<Mirror Sprite>
```

Espelha horizontalmente o sprite do evento (flip).

```text
<Scale: 150%>
<Scale X: 150%>
<Scale Y: 200%>
```

Escala o sprite do evento. `Scale` altera uniformemente; `Scale X` e `Scale Y` permitem escalas diferentes por eixo. Valores em porcentagem (100% = tamanho original).

### Sombra

```text
<Shadow Filename: nome_arquivo>
```

Usa uma imagem customizada de sombra do diretorio `/img/system/` em vez da sombra padrao circular.

```text
<Hide Shadow>
```

Oculta completamente a sombra do evento.

### Deslocamento de Sprite

```text
<Sprite Offset X: +5>
<Sprite Offset Y: -10>
```

Desloca o sprite do evento em pixels. Nao afeta a posicao logica (hitbox) do evento, apenas a visual.

### Eixo Z

```text
<Custom Z: 5>
```

Define o valor Z (profundidade de renderizacao) do evento. Valores de referencia:

| Valor | Camada                        |
|-------|-------------------------------|
| 0     | Tiles inferiores (ground)     |
| 3     | Personagens normais (padrao)  |
| 5     | Tiles superiores (overlay)    |

Valores mais altos renderizam por cima. Util para eventos que devem aparecer acima ou abaixo de outros elementos.

---

## 5. Hitbox e Posicao

### Expansao de Hitbox

```text
<Hitbox Left: 1>
<Hitbox Right: 1>
<Hitbox Up: 1>
<Hitbox Down: 1>
```

Expande a hitbox do evento na direcao especificada em `x` tiles. O evento ocupara mais espaco para colisao e ativacao.

**Notas de uso:**
- Cada direcao e configurada independentemente.
- Hitbox expandida afeta colisao com jogador e outros eventos.
- Nao confundir com `Tile Expand` (expansao visual apenas).

### Deslocamento de Posicao Inicial

```text
<Location X: +2>
<Location Y: -1>
```

Desloca a posicao inicial do evento em `x` tiles ao carregar o mapa. O evento aparece deslocado de sua posicao original no editor.

### Expansao Visual de Tile

```text
<Tile Expand Up: 1>
<Tile Expand Down: 2>
<Tile Expand Left: 1>
<Tile Expand Right: 1>
```

Expande o grafico de tile do evento nas direcoes indicadas. **NOTA IMPORTANTE:** Isso afeta apenas o grafico/visual, **NÃO** expande a hitbox logica do evento.

---

## 6. Pictures em Eventos

Exibe imagens do diretorio `/img/pictures/` diretamente sobre eventos.

### Configuracao basica

```text
<Picture Filename: nome_arquivo>
```

Nome do arquivo de imagem em `/img/pictures/` (sem extensao) a ser exibido sobre o evento.

```text
<Picture Type: Enemy>
<Picture Type: SV Enemy>
```

Altera o diretorio de busca:
- `Enemy` → `/img/enemies/`
- `SV Enemy` → `/img/sv_enemies/`

### Escala

```text
<Picture Max Size: 100>
```

Tamanho maximo em pixels (a imagem e redimensionada para caber).

```text
<Picture Scale: 50%>
```

Escala a imagem em porcentagem do tamanho original.

### Posicao

```text
<Picture Offset X: +10>
<Picture Offset Y: -5>
```

Deslocamento em pixels da imagem em relacao ao evento.

### Animacao

```text
<Picture Wait Frames: 5>
```

Numero de frames de espera entre cada frame da animacao da imagem. Requer o plugin **VisuStella AnimatedPictures** para funcionar corretamente.

---

## 7. Templates de Eventos

### `<Copy Event: Map x, Event y>`

```text
<Copy Event: Map 3, Event 12>
```

Copia a configuracao completa (paginas, graficos, rotas) do evento de ID `y` do mapa de ID `x` para este evento.

### `<Copy Event: x, y>`

```text
<Copy Event: 3, 12>
```

Forma abreviada — mesmo efeito que `Map x, Event y`.

### `<Copy Event: template>`

```text
<Copy Event: guard_npc>
```

Copia de um template nomeado. O template deve estar configurado no plugin ou em um mapa de templates.

**Notas de uso:**
- A copia e feita no carregamento do mapa — alteracoes no evento original apos o carregamento nao se propagam.
- O evento que recebe a copia mantem sua posicao no mapa atual.
- Util para criar NPCs padronizados ou eventos repetitivos sem duplicacao manual.

---

## 8. Diversos

### Salvar Posicao do Evento

```text
<Save Event Location>
```

Salva a posicao deste evento especifico quando o jogador sai do mapa. Ao retornar, o evento aparecera na ultima posicao salva.

**Diferenca da notetag de mapa:** `<Save Event Locations>` (plural, no mapa) salva todos os eventos. Esta salva apenas este evento.

### Reset de Self Data

```text
<Exit Reset Self Data>
```

Reseta self switches e self variables do evento quando o jogador sai do mapa. O evento volta ao seu estado inicial na proxima visita.

### Apenas Playtest

```text
<Playtest>
```

O evento so aparece durante o modo playtest (testar jogo pelo editor). **NOTETAG ONLY** — nao funciona como comment tag.

**Notas de uso:**
- Util para colocar NPCs de debug, teleporters de teste, ou informacoes de desenvolvimento.
- Em builds de release (encrypt), estes eventos nao existem.

### Peso de Movimento Aleatorio

```text
<Random Move Weight: 0.5>
```

Peso aplicado ao movimento aleatorio do evento. Valores entre 0 e 1. Valores menores fazem o evento se mover menos frequentemente; proximos de 1 fazem o evento se mover quase sempre.

```text
<True Random Move>
```

Desabilita o sistema de peso do RPG Maker para movimento aleatorio, tornando cada direcao igualmente provavel. Remove o "vies" de movimento padrao do engine.

### Padrao de Animacao

```text
<Step Pattern: Left to Right>
<Step Pattern: Right to Left>
<Step Pattern: Spin Clockwise>
<Step Pattern: Spin CounterClockwise>
```

Define o padrao de animacao dos frames do sprite:

| Padrao              | Comportamento                                      |
|---------------------|----------------------------------------------------|
| `Left to Right`     | Anima frames da esquerda para a direita (padrao)   |
| `Right to Left`     | Anima frames da direita para a esquerda            |
| `Spin Clockwise`    | Rotacao horaria dos frames                         |
| `Spin CounterClockwise` | Rotacao anti-horaria dos frames               |

**Notas de uso:**
- `Spin` e util para efeitos visuais como moedas, fogos, moes de energia.
- `Left to Right` e o padrao do RPG Maker e nao precisa ser declarado explicitamente.
