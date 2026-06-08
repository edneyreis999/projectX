# Sprites e Formato VS8

Documentacao sobre as tags de nome de arquivo de character sprites e o formato VS8 de sprite sheet do VisuStella.

---

## 1. Tags de Nome de Arquivo

Ao nomear arquivos dentro da pasta `/img/characters/`, caracteres especiais no nome ativam comportamentos distintos:

| Tag | Exemplo | Descricao |
|---|---|---|
| `$` | `$Actor1.png` | Sprite unico. Grid de 3x4 (1 personagem por arquivo). |
| `!` | `!Chest.png` | Object character. Sem efeito de bush (vegetacao baixa) e sem sombra projetada. |
| `!$` | `!$Crystal.png` | Sprite unico + Object character. Combina ambos os comportamentos. |
| `[VS8]` | `Actor1_[VS8].png` | Sprite sheet de 8 direcoes do VisuStella. Veja secao abaixo. |

### Combinacoes

- `$` e `!` podem ser combinados: `!$Nome.png`.
- `[VS8]` pode ser combinado com `!`: `!Objeto_[VS8].png` (8 direcoes sem sombra/bush).
- `$` nao deve ser usado com `[VS8]` (o formato VS8 ja define seu proprio grid).

---

## 2. Formato VS8 — Sprite Sheet de 8 Direcoes

Para usar movimento em 8 direcoes, adicione `[VS8]` ao nome do arquivo de sprite:

```
Actor1_[VS8].png
```

### Layout da Sprite Sheet

A sprite sheet VS8 possui 8 linhas e 4 colunas, onde cada bloco contem 3 frames de animacao:

| | Coluna 1 | Coluna 2 | Coluna 3 | Coluna 4 |
|---|---|---|---|---|
| **Linha 1** | Walk Down | Walk DL | Dash Down | Dash DL |
| **Linha 2** | Walk Left | Walk DR | Dash Left | Dash DR |
| **Linha 3** | Walk Right | Walk UL | Dash Right | Dash UL |
| **Linha 4** | Walk Up | Walk UR | Dash Up | Dash UR |
| **Linha 5** | Carry Down | Carry DL | Ladder | Emotes 3 |
| **Linha 6** | Carry Left | Carry DR | Rope | Emotes 4 |
| **Linha 7** | Carry Right | Carry UL | Emotes 1 | Emotes 5 |
| **Linha 8** | Carry Up | Carry UR | Emotes 2 | Emotes 6 |

### Legenda dos Movimentos

| Tipo | Descricao |
|---|---|
| **Walk** | Animacao de caminhada (4 direcoes + 4 diagonais) |
| **Dash** | Animacao de corrida (4 direcoes + 4 diagonais) |
| **Carry** | Frames usados durante pulo (jump). Visuais de personagem carregando algo |
| **Ladder** | Animacao para escalada de escadas |
| **Rope** | Animacao para cordas/trepadeiras |
| **Emotes** | Animacoes expressivas (veja secao de Emotes) |

### Nomenclatura de Direcoes

| Sigla | Direcao |
|---|---|
| **Down** | Baixo (Sul) |
| **Up** | Cima (Norte) |
| **Left** | Esquerda (Oeste) |
| **Right** | Direita (Leste) |
| **DL** | Diagonal Baixo-Esquerda |
| **DR** | Diagonal Baixo-Direita |
| **UL** | Diagonal Cima-Esquerda |
| **UR** | Diagonal Cima-Direita |

### Dimensoes da Sheet

Cada bloco = 3 frames (largura). A sheet completa tem:
- **Largura:** 4 blocos x 3 frames = 12 frames de largura (4 colunas)
- **Altura:** 8 linhas

O tamanho individual de cada frame depende do tamanho configurado do character (padrao: 48x48 por cell).

---

## 3. Emotes

Os emotes sao animacoes expressivas exibidas sobre o personagem. Cada "Emotes" na sprite sheet contem 3 frames (da esquerda para a direita):

| Emote Set | Frame 1 | Frame 2 | Frame 3 |
|---|---|---|---|
| **Emotes 1** | Item (item adquirido) | Hmph (indiferenca) | Victory (vitoria) |
| **Emotes 2** | Hurt (dor) | Kneel (ajoelhar) | Collapse (colapso) |
| **Emotes 3** | ! (surpresa) | ? (duvida) | Music Note (nota musical) |
| **Emotes 4** | Heart (coracao) | Anger (raiva) | Sweat (suor) |
| **Emotes 5** | Cobweb (teia de aranha) | ... (reticencias) | Light Bulb (ideia) |
| **Emotes 6** | Sleep0 (dormindo 1) | Sleep1 (dormindo 2) | Sleep2 (dormindo 3) |

### Localizacao na Sheet

| Emote Set | Posicao na Sheet |
|---|---|
| Emotes 1 | Linha 7, Coluna 3 |
| Emotes 2 | Linha 8, Coluna 3 |
| Emotes 3 | Linha 5, Coluna 4 |
| Emotes 4 | Linha 6, Coluna 4 |
| Emotes 5 | Linha 7, Coluna 4 |
| Emotes 6 | Linha 8, Coluna 4 |

---

## 4. Movimento Aleatorio Ponderado

Eventos configurados com movimento **"Random"** (autonomo) possuem um comportamento que os mantem proximos a sua posicao original (home).

### Comportamento Padrao

- Peso padrao: **0.10**
- O peso controla a probabilidade do evento tender a retornar a posicao original
- Valores mais altos = evento fica mais proximo do ponto de origem

### Notetags por Evento

**Ajustar o peso do movimento aleatorio:**

```
<Random Move Weight: 0.5>
```

| Valor | Comportamento |
|---|---|
| `0.0` | Sem tendencia (movimento puramente aleatorio) |
| `0.1` | Padrao (leve tendencia ao home) |
| `0.5` | Moderado (evento tende a ficar perto) |
| `1.0` | Forte (evento dificilmente se afasta) |

**Desativar a ponderacao (movimento puramente aleatorio, equivalente ao nativo):**

```
<True Random Move>
```

### Exemplos de Uso

```
// NPC que vagueia mas fica perto de sua posicao
<Random Move Weight: 0.7>

// Animal que se move de forma totalmente aleatoria
<True Random Move>
```
