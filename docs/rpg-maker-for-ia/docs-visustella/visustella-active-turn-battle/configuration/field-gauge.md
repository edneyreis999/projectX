# Field Gauge Configuration

Configurações do **Field Gauge** - uma barra única que mostra todos os battlers da batalha, permitindo visualizar a ordem relativa de turnos.

## Visão Geral

O Field Gauge é uma barra horizontal ou vertical posicionada na tela que contém marcadores para cada battler. A posição de cada marcador indica quanto tempo falta para aquele battler poder agir.

### Funcionalidade

- **Mostra todos os battlers**: Actors e enemies em uma única visualização
- **Posição relativa**: Permite comparar progresso entre battlers
- **Marcadores customizáveis**: Faces, icons ou sprites para cada battler
- **Split opcional**: Divisão visual entre party e enemies

## Habilitação

### Use Field Gauge?
**Descrição**: Ativa ou desativa o Field Gauge

**Valores**:
- `true` = Field Gauge visível
- `false` = Field Gauge oculto

**Obrigatório**: Deve estar `true` para qualquer configuração do Field Gauge funcionar

## Posicionamento

### Display Position
**Descrição**: Onde o Field Gauge aparece na tela

**Opções**:
- `Top` → Parte superior da tela
- `Bottom` → Parte inferior da tela
- `Left` → Lado esquerdo da tela
- `Right` → Lado direito da tela

### Offset X / Offset Y
**Descrição**: Ajuste fino da posição em pixels

### Reposition for Help?
**Descrição**: Reposiciona o gauge quando a janela de ajuda está aberta

**Uso**: Útil quando Display Position é "Top" e o gauge sobrepõe a janela de ajuda

## Dimensões

### Gauge Skin
**Descrição**: Imagem de fundo opcional para o Field Gauge

**Formato**: Nome do arquivo de imagem (sem extensão)

**Comportamento**: Imagem é centralizada na posição do gauge

### Show Gauge?
**Descrição**: Mostrar a linha/barra do gauge

**Valores**:
- `true` = mostra a linha de progresso
- `false` = mostra apenas marcadores (linha oculta)

### Horizontal Length
**Descrição**: Comprimento do gauge quando posicionado horizontalmente

**Unidade**: Pixels

### Vertical Length
**Descrição**: Altura do gauge quando posicionado verticalmente

**Unidade**: Pixels

### Thickness
**Descrição**: Espessura da linha do gauge

**Unidade**: Pixels

### Split Location
**Descrição**: Ponto onde o gauge se divide (geralmente entre party e enemies)

**Valores**: 0.00 a 1.00
- `0.00` = Divisão no início
- `0.50` = Divisão no meio
- `1.00` = Divisão no fim

## Direção

### Forward Direction
**Descrição**: Direção em que o gauge progride

**Opções**:
- `Left to Right` ← Da esquerda para direita
- `Right to Left` → Da direita para esquerda
- `Up to Down` ↑ De cima para baixo
- `Down to Up` ↓ De baixo para cima

**Nota**: Configurações podem variar dependendo da Display Position

## Marcadores (Markers)

### Actor/Enemy Marker Side
**Descrição**: Qual lado os marcadores aparecem

**Uso**: Define se marcadores ficam acima/abaixo ou esquerda/direita do gauge

### Marker Offset
**Descrição**: Distância em pixels do gauge

**Direção**: Perpendicular ao gauge

### Marker Size
**Descrição**: Dimensões dos marcadores (largura × altura)

**Unidade**: Pixels

### Marker Speed
**Descrição**: Velocidade máxima de movimento dos marcadores por frame

**Unidade**: Pixels/frame
**Uso**: Controla suavidade da animação dos marcadores

### Opacity Rate
**Descrição**: Velocidade de mudança de opacidade

**Uso**: Para fade-in/fade-out de marcadores

## Bordas dos Marcadores

### Show Border?
**Descrição**: Mostrar borda colorida ao redor dos marcadores

**Valores**:
- `true` = borda visível
- `false` = borda oculta

### Border Thickness
**Descrição**: Espessura da borda colorida

**Unidade**: Pixels

### Border Color
**Descrição**: Cor da borda

**Formato**:
- Hexadecimal: `#rrggbb`
- Número: Cor da Window Skin

**Uso**: Cores diferentes para Actors vs Enemies

### Border Skin
**Descrição**: Imagem para usar como borda ao invés de cor sólida

**Opcional**: Se vazio, usa cor sólida

## Sprites dos Marcadores

### Actors - Sprite Type
**Descrição**: Tipo de sprite para actors

**Opções**:
- `Face Graphic` → Mostra a face do actor
- `Icon` → Mostra um ícone específico
- `Sideview Actor` → Mostra o battler em side-view

### Actors - Default Icon
**Descrição**: Ícone padrão para actors

**Valor**: Índice do ícone

### Enemies - Sprite Type
**Descrição**: Tipo de sprite para enemies

**Opções**:
- `Face Graphic` → Mostra uma face específica
- `Icon` → Mostra um ícone específico
- `Enemy` → Mostra o graphic do enemy ou side-view battler

### Enemies - Default Face Name
**Descrição**: Nome do arquivo de face padrão para enemies

**Formato**: Nome do arquivo (sem extensão)

### Enemies - Default Face Index
**Descrição**: Índice da face no arquivo

**Valor**: 0, 1, 2, ou 3

### Enemies - Default Icon
**Descrição**: Ícone padrão para enemies

**Valor**: Índice do ícone

### Enemies - Match Hue?
**Descrição**: Aplicar hue modification do enemy

**Valores**:
- `true` = usa hue do enemy
- `false` = ignora hue

**Nota**: Não se aplica a side-view battlers

## Letras dos Marcadores

### Show Enemy Letter?
**Descrição**: Mostrar a letra (A, B, C...) do enemy

**Uso**: Útil para distinguir múltiplas instâncias do mesmo enemy

### Font Name
**Descrição**: Fonte usada para a letra

**Opcional**: Vazio = fonte padrão do jogo

### Font Size
**Descrição**: Tamanho da fonte da letra

**Unidade**: Pixels

## Background dos Marcadores

### Show Background?
**Descrição**: Mostrar fundo nos marcadores

**Valores**:
- `true` = fundo visível
- `false` = fundo oculto (transparente)

### Background Color 1 / 2
**Descrição**: Cores para gradiente do fundo

**Formato**:
- Hexadecimal: `#rrggbb`
- Número: Cor da Window Skin

### Background Skin
**Descrição**: Imagem para usar como fundo

**Opcional**: Se vazio, usa cores

## Seta do Marcador

### Show Arrow?
**Descrição**: Mostrar seta apontando para o Field Gauge

**Valores**:
- `true` = seta visível
- `false` = seta oculta

### Arrow Skin
**Descrição**: Window Skin para desenhar a seta

**Uso**: Permite customizar aparência da seta

## Notetags Relacionados

### Alterar Ícone do Marcador
```
<ATB Field Gauge Icon: x>
```
Usado em: Actor, Enemy
`x` = índice do ícone

### Alterar Face do Marcador
```
<ATB Field Gauge Face: filename, index>
```
Usado em: Actor, Enemy
`filename` = nome do arquivo (sem extensão)
`index` = índice da face (0-3)

## Plugin Commands Relacionados

### Actor Commands
- `Actor: Change Field Gauge Icon`
- `Actor: Change Field Gauge Face`
- `Actor: Clear Field Gauge Graphic`

### Enemy Commands
- `Enemy: Change Field Gauge Icon`
- `Enemy: Change Field Gauge Face`
- `Enemy: Clear Field Gauge Graphic`

### System Commands
- `System: ATB Field Gauge Visibility`

## Exemplos de Configuração

### Field Gauge Horizontal Minimalista
```
Use Field Gauge?: true
Display Position: Top
Horizontal Length: 800
Thickness: 8
Show Gauge?: true
Split Location: 0.5
Forward Direction: Left to Right
Actor Marker Side: Top
Enemy Marker Side: Bottom
Marker Size: 32x32
Show Border?: true
```

### Field Gauge Vertical Compacto
```
Display Position: Right
Vertical Length: 400
Thickness: 6
Forward Direction: Up to Down
Sprite Type (Actors): Icon
Sprite Type (Enemies): Icon
Show Enemy Letter?: true
```

## Ver Também

- [ATB Gauge](./atb-gauge.md) - Barras individuais
- [Configuration](./index.md) - Outras configurações

## Troubleshooting

**Field Gauge não aparece**: Verificar "Use Field Gauge?" está true

**Marcadores fora da tela**: Ajustar Offset X/Y ou reduzir Horizontal/Vertical Length

**Marcadores se sobrepõem**: Aumentar Marker Size ou reduzir número de battlers
