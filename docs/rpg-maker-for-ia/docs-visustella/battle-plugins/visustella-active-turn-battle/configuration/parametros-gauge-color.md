# Parâmetros: Gauge Color (Gauge Color Settings)

## Overview

Estes parâmetros controlam as **cores** das ATB Gauges para diferentes estados. Cada estado tem duas cores (Color 1 e Color 2) para criar efeito de gradiente.

## Localização
**Plugin Parameters > Gauge Color Settings**

---

## Cores por Estado

As ATB Gauges mudam de cor baseado no estado do battler:

| Estado | Descrição | Cor Usada |
|--------|-----------|-----------|
| **Stop** | Speed = 0, gauge parada | Stop Color |
| **Slow** | AGI Rate ≤ Slow Rate | Slow Color |
| **Normal** | AGI Rate entre Slow/Fast | Default Color |
| **Fast** | AGI Rate ≥ Fast Rate | Fast Color |
| **Full** | Gauge = 100% | Full Color |
| **Cast** | Casting state (speed < 0) | Cast Color |

---

## Default Color 1 / 2

### Descrição
Cor usada para o estado **normal** da gauge.

### Parâmetro
```
Default Color 1: #ffffff
Default Color 2: #ffffaa
```

### Quando é Usada
- Battler **não** está Stop, Slow, Fast, Full, ou Cast
- AGI Rate está entre Slow e Fast thresholds
- Estado "normal" de preenchimento

### Formato
- **Hexadecimal**: `#rrggbb` (recomendado)
- **Skin Number**: `0` a `31`

### Exemplos

#### Branco/Amarelo (Default)
```
Default Color 1: #ffffff
Default Color 2: #ffffaa
```

#### Verde Claro
```
Default Color 1: #90EE90
Default Color 2: #98FB98
```

#### Azul Claro
```
Default Color 1: #87CEEB
Default Color 2: #B0E0E6
```

#### Skin Colors
```
Default Color 1: 0
Default Color 2: 1
```

---

## Full Color 1 / 2

### Descrição
Cor usada quando a gauge está **cheia** (100%).

### Parâmetro
```
Full Color 1: #00ff00
Full Color 2: #00cc00
```

### Quando é Usada
- Gauge = 100%
- Battler pode agir

### Formato
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos

#### Verde (Default)
```
Full Color 1: #00ff00
Full Color 2: #00cc00
```

#### Verde Brilhante
```
Full Color 1: #7CFC00
Full Color 2: #32CD32
```

#### Ouro
```
Full Color 1: #FFD700
Full Color 2: #FFA500
```

#### Azul Elétrico
```
Full Color 1: #00FFFF
Full Color 2: #00BFFF
```

---

## Cast Color 1 / 2

### Descrição
Cor usada durante o **casting state**.

### Parâmetro
```
Cast Color 1: #ff00ff
Cast Color 2: #cc00cc
```

### Quando é Usada
- Battler está castando skill com speed < 0
- Gauge está diminuindo

### Formato
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos

#### Magenta (Default)
```
Cast Color 1: #ff00ff
Cast Color 2: #cc00cc
```

#### Roxo
```
Cast Color 1: #9400D3
Cast Color 2: #800080
```

#### Vermelho Escuro
```
Cast Color 1: #8B0000
Cast Color 2: #B22222
```

#### Laranja
```
Cast Color 1: #FF8C00
Cast Color 2: #FF6347
```

---

## Fast Color 1 / 2

### Descrição
Cor usada quando o battler está **Fast** (AGI Rate ≥ Fast Rate).

### Parâmetro
```
Fast Color 1: #00ffff
Fast Color 2: #00cccc
```

### Quando é Usada
- AGI Rate ≥ Fast Rate (default: 1.2)
- Battler preenche gauge mais rápido que a média

### Formato
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos

#### Ciano (Default)
```
Fast Color 1: #00ffff
Fast Color 2: #00cccc
```

#### Azul Claro
```
Fast Color 1: #87CEEB
Fast Color 2: #00BFFF
```

#### Verde Limão
```
Fast Color 1: #32CD32
Fast Color 2: #00FF00
```

#### Amarelo
```
Fast Color 1: #FFFF00
Fast Color 2: #FFD700
```

---

## Slow Color 1 / 2

### Descrição
Cor usada quando o battler está **Slow** (AGI Rate ≤ Slow Rate).

### Parâmetro
```
Slow Color 1: #ffaa00
Slow Color 2: #cc8800
```

### Quando é Usada
- AGI Rate ≤ Slow Rate (default: 0.8)
- Battler preenche gauge mais devagar que a média

### Formato
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos

#### Laranja (Default)
```
Slow Color 1: #ffaa00
Slow Color 2: #cc8800
```

#### Laranja Escuro
```
Slow Color 1: #FF8C00
Slow Color 2: #FF4500
```

#### Vermelho
```
Slow Color 1: #FF6347
Slow Color 2: #DC143C
```

#### Marrom
```
Slow Color 1: #A0522D
Slow Color 2: #8B4513
```

---

## Stop Color 1 / 2

### Descrição
Cor usada quando o battler está **Stopped** (speed = 0).

### Parâmetro
```
Stop Color 1: #ff0000
Stop Color 2: #cc0000
```

### Quando é Usada
- Speed = 0
- Gauge não está se movendo
- Battler não pode agir

### Formato
- **Hexadecimal**: `#rrggbb`
- **Skin Number**: `0` a `31`

### Exemplos

#### Vermelho (Default)
```
Stop Color 1: #ff0000
Stop Color 2: #cc0000
```

#### Vermelho Escuro
```
Stop Color 1: #8B0000
Stop Color 2: #B22222
```

#### Cinza
```
Stop Color 1: #808080
Stop Color 2: #696969
```

#### Preto
```
Stop Color 1: #000000
Stop Color 2: #333333
```

---

## Formatos de Cores

### Hexadecimal (Recomendado)

#### Formato
```
#rrggbb
```

#### Componentes
- **rr**: Vermelho (00 a FF)
- **gg**: Verde (00 a FF)
- **bb**: Azul (00 a FF)

#### Exemplos
```
#ff0000  // Vermelho puro
#00ff00  // Verde puro
#0000ff  // Azul puro
#ffff00  // Amarelo
#ff00ff  // Magenta
#00ffff  // Ciano
#ffffff  // Branco
#000000  // Preto
```

### Window Skin Number

#### Formato
```
0 a 31
```

#### Comportamento
Usa a cor do índice correspondente da Window Skin.

#### Exemplos
```
0  // Skin Color 0 (geralmente branco)
1  // Skin Color 1 (geralmente preto/escuro)
2  // Skin Color 2 (geralmente cinza)
```

---

## Gradientes

Cada estado tem **duas cores** (Color 1 e Color 2) para criar um efeito de gradiente:

```
Color 1 ←→ Color 2
  ║         ║
  ║ Gradiente ║
  ║         ║
```

### Como Funciona
- **Color 1**: Cor superior/esquerda do gradiente
- **Color 2**: Cor inferior/direita do gradiente
- Gauge faz interpolação entre as duas cores

### Exemplo Verde
```
Full Color 1: #00ff00  // Verde brilhante
Full Color 2: #00cc00  // Verde um pouco mais escuro

Resultado:
#00ff00 ← gradiente → #00cc00
```

### Gradiente Sólido
Para usar cor sólida (sem gradiente):
```
Full Color 1: #00ff00
Full Color 2: #00ff00  // Mesma cor

Resultado:
#00ff00 (cor sólida)
```

---

## Paletas de Cores

### Paleta Padrão (Default)
```
Default: #ffffff → #ffffaa  (Branco/Amarelo claro)
Full:     #00ff00 → #00cc00  (Verde)
Cast:     #ff00ff → #cc00cc  (Magenta)
Fast:     #00ffff → #00cccc  (Ciano)
Slow:     #ffaa00 → #cc8800  (Laranja)
Stop:     #ff0000 → #cc0000  (Vermelho)
```

### Paleta RPG Clássico
```
Default: #90EE90 → #98FB98  (Verde claro)
Full:     #32CD32 → #228B22  (Verde floresta)
Cast:     #9400D3 → #800080  (Roxo)
Fast:     #00BFFF → #1E90FF  (Azul)
Slow:     #FF8C00 → #FF6347  (Laranja avermelhado)
Stop:     #8B0000 → #B22222  (Vermelho escuro)
```

### Paleta Monocromática (Verde)
```
Default: #90EE90 → #98FB98  (Verde claro)
Full:     #00FF00 → #32CD32  (Verde brilhante)
Cast:     #006400 → #008000  (Verde escuro)
Fast:     #7CFC00 → #00FF00  (Verde limão)
Slow:     #2E8B57 → #3CB371  (Verde mar)
Stop:     #006400 → #008000  (Verde escuro)
```

### Paleta Fogo
```
Default: #FFD700 → #FFA500  (Ouro)
Full:     #FF4500 → #FF0000  (Vermelho laranja)
Cast:     #8B0000 → #B22222  (Vermelho escuro)
Fast:     #FF8C00 → #FF6347  (Laranja)
Slow:     #FFA500 → #FF8C00  (Laranja)
Stop:     #800000 → #A52A2A  (Marrom)
```

---

## Acessibilidade

### Contraste
Certifique-se de que as cores tenham bom contraste com o fundo:

#### Bom Contraste
```
Default: #ffffff  (Fundo escuro)
Full:     #00ff00  (Fundo escuro)
Cast:     #ff00ff  (Fundo escuro)
```

#### Ruim Contraste
```
Default: #cccccc  (Fundo claro - pouco contraste)
Full:     #006400  (Fundo escuro - difícil de ver)
```

### Diferença entre Estados
Use cores **distintas** para cada estado:

#### Distinto (Recomendado)
```
Full: #00ff00  (Verde)
Cast: #ff00ff  (Magenta)
Stop: #ff0000  (Vermelho)
// Fácil de distinguir
```

#### Pouco Distinto (Evitar)
```
Full: #00ff00  (Verde)
Cast: #00cc00  (Verde escuro)
Stop: #009900  (Verde mais escuro)
// Difícil de distinguir
```

---

## Consulte Também

- [Parâmetros: Gauge](parametros-gauge.md) - Posicionamento e tamanho
- [Features: ATB Gauges](../features/atb-gauges.md) - Sistema visual
- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Estados da gauge
