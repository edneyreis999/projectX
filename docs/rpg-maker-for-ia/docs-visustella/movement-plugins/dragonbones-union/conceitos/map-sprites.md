# DragonBones - Armatures como Map Sprites

## Visão Geral

Se você planeja usar armatures Dragonbones como sprites do mapa, mantenha em mente que haverá certas limitações e propriedades sobre elas.

---

## Limitações e Propriedades

### 1. Limite de Vértices (Vertices)

**Tente não usar mais de 99 vértices para meshes.**

**Motivo**: A armature Dragonbones é adicionada como um sprite ao Tilemap do jogo. Todos e quaisquer sprites adicionados ao Tilemap têm algumas restrições colocadas sobre eles conforme o design do Pixi JS. As armatures Dragonbones não são exceção.

**Consequência**: Se o número de vértices exceder 99, coisas estranhas ocorrerão à armature Dragonbones que estão fora do controle deste plugin. Embora não pare o plugin de funcionar corretamente, comportamentos esperados podem acontecer devido ao limite.

---

### 2. Clipping com Camadas do Tilemap

Ao usar armatures Dragonbones que são muito altas ou largas, elas podem **cortar (clip) na camada de tile acima ou ao lado** devido a como o Tilemap funciona.

**Exemplos de problemas**:
- Clipping no topo de árvores
- Clipping em estruturas

---

### 3. Prioridade de Animações por Motion

Certos motions requisitarão animações específicas da armature Dragonbones. Se as animações existirem, elas reproduzirão esses motions. Se não existirem, os motions podem requisitar uma animação diferente na linha.

#### Ordem de Requisição (Priority Lists)

**Pulo (Jumping):**
- jump, walk, idle

**Corda (Escalada) (Requer: VisuMZ_1_EventsMoveCore):**
- ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle

**Corda (Idle) (Requer: VisuMZ_1_EventsMoveCore):**
- ropeidle, ladderidle, idle

**Escada (Climbing):**
- ladderclimb, walk, ladderidle, idle

**Escada (Idle):**
- ladderidle, idle

**Dashing (Corrida):**
- dash, walk, idle

**Andando (Walking):**
- walk, idle

**Parado (Idle):**
- idle

**Recomendação**: Nomeie as animações para a armature Dragonbones conforme listado acima para aproveitar ao máximo as listas de prioridade de motion.

---

### 4. Animações Direcionais

Você pode adicionar animações direcionais para suas animações de motion de armature Dragonbones. Para fazer isso, adicione um número após o nome da animação assim: `walk2`, `walk4`, `walk6`, `walk8`.

Esses números são baseados nas direções do NumPad para determinar qual direção enfrentar:

```
7 8 9
4   6
1 2 3
```

Esses números são adicionados ao sistema de prioridade listado no #3 acima também. Direções diagonais também se tornam divididas e adicionadas múltiplas vezes para melhor streamline, com prioridade dada à direção horizontal antes da vertical.

#### Exemplo: Dashing Diagonal Superior Direita

**Dashing (Upper Left):**
- dash7, dash4, dash8, dash,
  - walk7, walk4, walk8, walk,
    - idle7, idle4, idle8, idle

**Dashing (Right):**
- dash6, dash,
  - walk6, walk,
    - idle6, idle

---

### 5. Velocidade de Animação vs. Velocidade de Movimento

Quando uma armature Dragonbones está se movendo, ela animará mais lenta ou rápida dependendo da velocidade de movimento atual do personagem.

- Na velocidade **'4: Normal'**, animará **4x mais rápido** que o visto no Dragonbones
- Na velocidade **'6: x4 Faster'**, animará **6x mais rápido**
- Na velocidade **'1: x8 Slower'**, estará na **velocidade x1** vista no Dragonbones

**Em outras palavras**, a velocidade animada é igual ao número escrito à esquerda da velocidade de movimento.

**Ao dar dash**: Esse multiplicador aumenta em 1 para corresponder às velocidades de movimento e a armature Dragonbones fará o mesmo para seguir.

---

## Considerações de Design

Você precisará **criar suas armatures Dragonbones com essas 5 regras chave em mente** para fazer as armatures animarem suavemente dentro do seu jogo.

---

## Links Relacionados

- [Visão Geral](./visao-geral.md) - Voltar para visão geral
- [Map Sprite Settings](../configuracao/map-sprite-settings.md) - Configurações de Map Sprites
- [Map Sprite Notetags](../notetags/map-sprites.md) - Notetags para Map Sprites
