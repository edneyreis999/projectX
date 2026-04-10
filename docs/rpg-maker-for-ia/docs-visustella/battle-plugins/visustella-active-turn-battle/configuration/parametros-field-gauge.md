# Parâmetros: Field Gauge (Field Gauge Settings)

## Overview

O **ATB Field Gauge** é uma gauge única que mostra todos os battlers (actors e enemies) simultaneamente, com marcadores indicando o progresso de cada um relativo aos outros. Ideal para batalhas com muitos participants.

## Localização
**Plugin Parameters > Field Gauge Settings**

---

## General

### Use Field Gauge?

### Descrição
Habilita ou desabilita o ATB Field Gauge.

### Parâmetro
```
Use Field Gauge?: false
```

### Comportamento
- **true**: Field Gauge aparece na batalha
- **false**: Field Gauge não aparece

### Obrigatório
Este valor deve ser **true** para Field Gauge funcionar.

### Uso Típico
```
true  // Batalhas com muitos battlers
false // Batalhas 1x1 ou poucos battlers
```

---

### Display Position

### Descrição
Posição na tela onde o Field Gauge aparece.

### Parâmetro
```
Display Position: Top
```

### Opções

#### Top
```
Display Position: Top
// Gauge aparece no topo da tela
```

#### Bottom
```
Display Position: Bottom
// Gauge aparece na base da tela
```

#### Left
```
Display Position: Left
// Gauge aparece no lado esquerdo (vertical)
```

#### Right
```
Display Position: Right
// Gauge aparece no lado direito (vertical)
```

### Recomendações
- **Top/Bottom**: Para batalhas horizontais
- **Left/Right**: Para batalhas verticais

---

### Offset X / Offset Y

### Descrição
Posição do Field Gauge em pixels **relativa à Display Position**.

### Parâmetro
```
Offset X: 0
Offset Y: 0
```

### Comportamento

#### Offset X
- **Positivo**: Move para a direita
- **Negativo**: Move para a esquerda

#### Offset Y
- **Positivo**: Move para baixo
- **Negativo**: Move para cima

### Exemplos

#### Top Position
```
Display Position: Top
Offset X: 0    // Centralizado horizontalmente
Offset Y: 10   // 10px abaixo do topo
```

#### Bottom Position
```
Display Position: Bottom
Offset X: 0    // Centralizado horizontalmente
Offset Y: -10  // 10px acima da base
```

#### Left Position
```
Display Position: Left
Offset X: 10   // 10px à direita da borda
Offset Y: 0    // Centralizado verticalmente
```

#### Right Position
```
Display Position: Right
Offset X: -10  // 10px à esquerda da borda
Offset Y: 0    // Centralizado verticalmente
```

---

### Reposition for Help?

### Descrição
Se a gauge deve ser reposicionada quando a help window está aberta.

### Parâmetro
```
Reposition for Help?: true
```

### Aplica-se A
- **Apenas Display Position: Top**

### Comportamento
- **true**: Gauge move para baixo quando help window abre
- **false**: Gauge mantém posição

### Uso Típico
```
true  // Evita overlap com help window
false // Não reposiciona
```

---

### Forward Direction

### Descrição
Direção na qual os marcadores se movem ao preencher a gauge.

### Parâmetro
```
Forward Direction: Left to Right
```

### Opções

#### Left to Right
```
Forward Direction: Left to Right
// Marcadores se movem da esquerda para a direita
// 0% → 100%
```

#### Right to Left
```
Forward Direction: Right to Left
// Marcadores se movem da direita para a esquerda
// 100% ← 0%
```

#### Up to Down
```
Forward Direction: Up to Down
// Marcadores se movem de cima para baixo
// 0% → 100% (vertical)
```

#### Down to Up
```
Forward Direction: Down to Up
// Marcadores se movem de baixo para cima
// 100% ← 0% (vertical)
```

### Compatibilidade com Display Position

| Display Position | Forward Directions Recomendadas |
|------------------|---------------------------------|
| Top              | Left to Right, Right to Left     |
| Bottom           | Left to Right, Right to Left     |
| Left             | Up to Down, Down to Up           |
| Right            | Up to Down, Down to Up           |

---

## Field Gauge Settings

### Gauge Skin

### Descrição
Imagem de fundo (skin) colocada atrás da Field Gauge.

### Parâmetro
```
Gauge Skin:
```

### Comportamento
- **Vazio**: Nenhuma skin
- **Nome**: Nome do arquivo na folder `img/system/`

### Formato
- **PNG**
- **Sem extensão** (não inclua `.png`)

### Exemplos
```
""           // Sem skin
"GaugeBack"  // Arquivo GaugeBack.png
"FieldGauge" // Arquivo FieldGauge.png
```

### Visual
Skin é **centralizada** na posição da gauge.

---

### Show Gauge?

### Descrição
Se a gauge de fundo deve ser exibida.

### Parâmetro
```
Show Gauge?: true
```

### Comportamento
- **true**: Mostra a gauge de fundo
- **false**: Esconde a gauge (mostra apenas marcadores)

### Uso Típico
```
true  // Mostrar gauge de fundo
false // Apenas marcadores (minimalista)
```

---

### Horizontal Length

### Descrição
Comprimento da Field Gauge quando posicionada **horizontalmente**.

### Parâmetro
```
Horizontal Length: 600
```

### Aplica-se A
- **Display Position: Top**
- **Display Position: Bottom**

### Unidade
Pixels

### Exemplos
```
400  // Curta
600  // Default
800  // Longa
1000 // Tela cheia (approx)
```

---

### Vertical Length

### Descrição
Comprimento da Field Gauge quando posicionada **verticalmente**.

### Parâmetro
```
Vertical Length: 400
```

### Aplica-se A
- **Display Position: Left**
- **Display Position: Right**

### Unidade
Pixels

### Exemplos
```
300  // Curta
400  // Default
500  // Longa
600  // Tela cheia (approx)
```

---

### Thickness

### Descrição
Espessura (largura) da Field Gauge.

### Parâmetro
```
Thickness: 12
```

### Unidade
Pixels

### Exemplos
```
6   // Fina
12  // Default
18  // Grossa
24  // Muito grossa
```

---

### Split Location

### Descrição
Posição onde a gauge é "dividida" visualmente.

### Parâmetro
```
Split Location: 0.5
```

### Comportamento
- Divide a gauge em duas seções
- **0.0**: Split no início
- **0.5**: Split no meio (default)
- **1.0**: Split no fim

### Uso Típico
```
0.0  // Split no início
0.25 // Split no primeiro quarto
0.5  // Split no meio (default)
0.75 // Split no terceiro quarto
1.0  // Split no fim
```

### Visual
Cria uma linha divisória na gauge.

---

## Marker Sprites

### Actor Marker Side / Enemy Marker Side

### Descrição
Lado da gauge onde os marcadores de actors/enemies aparecem.

### Parâmetro
```
Actor Marker Side: Top
Enemy Marker Side: Bottom
```

### Opções (para Horizontal Gauge)
```
Top    // Marcadores acima da gauge
Bottom // Marcadores abaixo da gauge
```

### Opções (para Vertical Gauge)
```
Left  // Marcadores à esquerda da gauge
Right // Marcadores à direita da gauge
```

### Exemplos

#### Horizontal (Top/Bottom)
```
Display Position: Top
Actor Marker Side: Top    // Actors acima da gauge
Enemy Marker Side: Bottom // Enemies abaixo da gauge
```

#### Vertical (Left/Right)
```
Display Position: Left
Actor Marker Side: Left  // Actors à esquerda
Enemy Marker Side: Right // Enemies à direita
```

---

### Marker Offset

### Descrição
Distância em pixels que os marcadores estão da gauge.

### Parâmetro
```
Marker Offset: 5
```

### Unidade
Pixels

### Exemplos
```
0   // Marcadores colados na gauge
5   // Default
10  // Marcadores afastados
15  // Marcadores bem afastados
```

---

### Marker Size

### Descrição
Tamanho (largura × altura) dos marcadores.

### Parâmetro
```
Marker Size: 32x32
```

### Formato
```
WidthxHeight
```

### Exemplos
```
16x16  // Pequeno
32x32  // Default
48x48  // Grande
64x64  // Muito grande
```

---

### Marker Speed

### Descrição
Velocidade máxima (em pixels/frame) que um marcador pode se mover.

### Parâmetro
```
Marker Speed: 10
```

### Unidade
Pixels por frame

### Exemplos
```
5   // Lento (movimento suave)
10  // Default
15  // Rápido
20  // Muito rápido (teleporte-like)
```

---

### Opacity Rate

### Descrição
Velocidade de mudança de opacidade dos marcadores.

### Parâmetro
```
Opacity Rate: 25
``### Unidade
Opacidade por frame (0-255)

### Exemplos
```
10  // Fade lento
25  // Default
50  // Fade rápido
```

---

## Marker Border

### Show Border?

### Descrição
Se os marcadores devem ter borda colorida.

### Parâmetro
```
Show Border?: true
```

### Comportamento
- **true**: Mostra borda
- **false**: Esconde borda

---

### Border Thickness

### Descrição
Espessura da borda dos marcadores.

### Parâmetro
```
Border Thickness: 2
```

### Unidade
Pixels

### Exemplos
```
1  // Fina
2  // Default
3  // Grossa
4  // Muito grossa
```

---

### Border Color (Actors / Enemies)

### Descrição
Cor da borda dos marcadores de actors/enemies.

### Parâmetro
```
Border Color (Actors): #0000ff
Border Color (Enemies): #ff0000
```

### Formatos
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos
```
#0000ff  // Azul (actors)
#ff0000  // Vermelho (enemies)
#00ff00  // Verde
0        // Skin Color 0
```

---

### Border Skin (Actors / Enemies)

### Descrição
Imagem usada como borda dos marcadores (override de cor).

### Parâmetro
```
Border Skin (Actors):
Border Skin (Enemies):
```

### Comportamento
- **Vazio**: Usa Border Color
- **Nome**: Usa imagem da skin

### Formato
Nome do arquivo na `img/system/` (sem extensão)

---

## Marker Sprites (Actors / Enemies)

### Sprite Type

### Descrição
Tipo de sprite usado para o marcador do actor/enemy.

### Parâmetro
```
Sprite Type (Actors): Icon
Sprite Type (Enemies): Icon
```

### Opções (Actors)
```
Icon           // Ícone específico
Face Graphic   // Face do actor
Sideview Actor // Battler sprite do actor (sideview)
```

### Opções (Enemies)
```
Icon           // Ícone específico
Face Graphic   // Face específica
Enemy          // Sprite do enemy ou sideview battler
```

---

### Default Icon (Actors / Enemies)

### Descrição
Ícone padrão para marcadores de actors/enemies.

### Parâmetro
```
Default Icon (Actors): 1
Default Icon (Enemies): 96
```

### Unidade
Ícones são indexados de `0` a `N` no IconSet.

### Exemplos
```
1   // Sword (actors)
96  // Monstro (enemies)
0   // Vazio
```

---

### Default Face Name (Enemies)

### Descrição
Nome da face padrão para marcadores de enemies.

### Parâmetro
```
Default Face Name (Enemies): Monster
```

### Formato
Nome do arquivo na `img/faces/` (sem extensão)

### Exemplos
```
Monster   // Monster.png
Actor1    // Actor1.png
Enemy     // Enemy.png
```

---

### Default Face Index (Enemies)

### Descrição
Índice da face padrão para marcadores de enemies.

### Parâmetro
```
Default Face Index (Enemies): 0
```

### Índices
```
0 0 1 2 3
```

### Valores
```
0  // Top-left
1  // Top-center
2  // Top-right
3  // Mid-left
4  // Etc.
```

---

### Match Hue? (Enemies)

### Descrição
Se deve aplicar o hue variation do enemy ao marcador.

### Parâmetro
```
Match Hue?: true
```

### Comportamento
- **true**: Aplica hue do enemy
- **false**: Usa imagem original

### Aplica-se A
- **Apenas Sprite Type: Enemy**
- **Não** se tiver sideview battler

---

## Marker Letter

### Show Enemy Letter?

### Descrição
Se deve mostrar a letra (A, B, C...) do enemy no marcador.

### Parâmetro
```
Show Enemy Letter?: true
```

### Comportamento
- **true**: Mostra letra
- **false**: Esconde letra

---

### Font Name

### Descrição
Fonte usada para a letra do marcador.

### Parâmetro
```
Font Name:
```

### Comportamento
- **Vazio**: Usa fonte padrão do jogo
- **Nome**: Usa fonte específica

### Exemplos
```
""              // Fonte padrão
"Arial"         // Arial
"GameFont"      // Fonte customizada
```

---

### Font Size

### Descrição
Tamanho da fonte da letra do marcador.

### Parâmetro
```
Font Size: 14
```

### Unidade
Pixels

### Exemplos
```
10  // Pequeno
14  // Default
18  // Grande
20  // Muito grande
```

---

## Marker Background

### Show Background?

### Descrição
Se deve mostrar fundo nos marcadores.

### Parâmetro
```
Show Background?: true
```

### Comportamento
- **true**: Mostra fundo
- **false**: Marcadores transparentes

---

### Background Color 1 / 2 (Actors / Enemies)

### Descrição
Cores de fundo dos marcadores (gradiente).

### Parâmetro
```
Background Color 1 (Actors): #0000ff
Background Color 2 (Actors): #0000aa
```

### Formatos
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

---

### Background Skin (Actors / Enemies)

### Descrição
Imagem usada como fundo dos marcadores.

### Parâmetro
```
Background Skin (Actors):
Background Skin (Enemies):
```

### Comportamento
- **Vazio**: Usa Background Colors
- **Nome**: Usa imagem da skin

---

## Marker Arrow

### Show Arrow?

### Descrição
Se deve mostrar seta apontando para a gauge.

### Parâmetro
```
Show Arrow?: true
```

### Comportamento
- **true**: Mostra seta
- **false**: Esconde seta

---

### Arrow Skin

### Descrição
Window skin usada para desenhar as setas.

### Parâmetro
```
Arrow Skin:
```

### Comportamento
- **Vazio**: Usa Window skin padrão
- **Nome**: Usa skin específica

---

## Consulte Também

- [Features: Field Gauge](../features/field-gauge.md) - Como funciona
- [Notetags: Field Gauge](../notetags/field-gauge.md) - Customização por battler
- [Comandos Plugin: Sistema](../comandos-plugin/sistema.md) - Dynamic changes
