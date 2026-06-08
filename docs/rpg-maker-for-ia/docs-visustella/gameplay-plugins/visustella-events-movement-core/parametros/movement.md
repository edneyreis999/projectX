# Movement Settings

Configuracoes de movimento do jogador, eventos e veiculos no mapa.

---

## 8 Directional Movement

Controla o movimento diagonal (8 direcoes) do jogador e eventos.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Enable | Booleano | Permite movimento em 8 direcoes por padrao |
| Strict Collision | Booleano | Quando ativo, ambas as direcoes cardinais (horizontal e vertical) devem ser passaveis para permitir movimento diagonal |
| Favor Horizontal | Booleano | Se o movimento diagonal nao for possivel, mas ambas as direcoes horizontal e vertical estiverem livres, favorece o movimento horizontal |
| Slower Diagonals? | Booleano | Aplica velocidade reduzida ao movimento diagonal |

### Slower Diagonals - Sub-parametros

Ativados apenas quando `Slower Diagonals?` esta habilitado.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Speed Multiplier | Decimal | Multiplicador de velocidade aplicado ao movimento diagonal (valores menores que 1.0 reduzem a velocidade) |

---

## Automatic Movement

Controla o comportamento do movimento automatico do jogador.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Stop During Events | Booleano | Interrompe o movimento automatico durante a execucao de eventos |
| Stop During Messages | Booleano | Interrompe o movimento automatico durante a exibicao de mensagens |

---

## Bitmap

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Smoothing | Booleano | Quando ativado, aplica suavizacao aos sprites do mapa. Quando desativado, aplica pixelacao (melhor para efeitos de zoom e inclinacao) |

> **Dica:** Desative o smoothing para jogos com estetica pixel art que utilizam zoom ou tilt.

---

## Dash

Configuracoes de corrida (dash) do jogador.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Dash Modifier | Decimal | Modificador de velocidade durante o dash. Altera a velocidade de corrida |
| Dash on Ladder? | Booleano | Permite dashing em escadas e cordas |
| Enable Dash Tilt? | Booleano | Aplica inclinacao (tilt) nos sprites durante o dash |

### Dash Tilt - Sub-parametros

Ativados apenas quando `Enable Dash Tilt?` esta habilitado.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Tilt Left Amount | Decimal (radianos) | Quantidade de inclinacao ao mover para a esquerda durante dash |
| Tilt Right Amount | Decimal (radianos) | Quantidade de inclinacao ao mover para a direita durante dash |
| Tilt Vertical Amount | Decimal (radianos) | Quantidade de inclinacao ao mover verticalmente durante dash |

---

## Event Movement

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Random Move Weight | Decimal (0-1) | Peso do movimento aleatorio. Valores proximos de 1 fazem o evento permanecer perto da posicao original (home). 0 desativa o comportamento |
| Shift Y | Inteiro (pixels) | Deslocamento vertical em pixels para personagens que nao sao tile-based |

---

## Path Finding

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Mobile-Enabled? | Booleano | Habilita pathfinding diagonal para dispositivos moveis |

---

## Shadows

> **AVISO:** Sombras **NAO** aparecem para sprites cujo nome de arquivo comeca com `!` (marcador de prefixo do RPG Maker MZ).

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Show | Booleano | Exibe sombras em todos os eventos e no jogador |
| Default Filename | String | Nome do grafico de sombra localizado em `img/system/` |
| Shadow Z Layer | Inteiro | Camada Z do sprite de sombra |

### Shadow Z Layer - Valores de Referencia

| Valor | Camada |
|-------|--------|
| 0 | Tiles inferiores (lower tiles) |
| 1 | Personagens inferiores (lower chars) |
| 3 | Personagens normais (normal chars) |
| 4 | Tiles superiores (upper tiles) |
| 5 | Personagens superiores (upper chars) |

---

## Turn in Place

Controla se o jogador gira no lugar antes de se mover (apenas teclado).

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Enable | Booleano | Habilita o giro no lugar antes de comecar a andar |
| Delay in Frames | Inteiro | Quantidade de frames de espera antes de iniciar o movimento apos girar |

---

## Vehicle Speeds

Velocidade de cada veiculo no mapa.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Boat Speed | Inteiro | Velocidade do barco |
| Ship Speed | Inteiro | Velocidade do navio |
| Airship Speed | Inteiro | Velocidade da aeronave |

---

## VisuStella 8-Dir Settings

Configuracoes adicionais do sistema de 8 direcoes da VisuStella.

### Balloon Icon Settings

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Auto-Balloon Poses | Lista | Poses de balao automatico para 8 direcoes |
| Balloon Offset X | Inteiro | Deslocamento horizontal do balao |
| Balloon Offset Y | Inteiro | Deslocamento vertical do balao |

### Icons

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Auto Buffer | Booleano | Aplica buffer automatico nos icones |
| Use Carry Pose | Booleano | Usa pose de carregar para icones em 8 direcoes |
