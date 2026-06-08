# Plugin Commands - Referência Completa

## Battler Plugin Commands

### Battler: Actor Change Settings

Altera as configurações da armature Dragonbones do actor alvo para batalha.

**Parâmetros**:

#### Actor ID
- Selecione qual Actor ID afetar

#### Filename
- Altera o nome do arquivo da armature

#### Offset X
- Altera o valor Offset X da armature

#### Offset Y
- Altera o valor Offset Y da armature

#### Scale X
- Altera o valor Scale X da armature

#### Scale Y
- Altera o valor Scale Y da armature

#### Time Scale
- Altera o valor Time Scale da armature

#### Width
- Altera o tamanho da largura do battler

#### Height
- Altera o tamanho da altura do battler

#### Motion Settings

##### Anti-Loop Revert
- Previne reverter animações não-looping com playtimes de 1
- Adicionado porque alguns usuários preferem a prevenção enquanto outros não
- Afeta apenas animações não-looping com durações de playtime de 1
- Escolha o estilo que deseja
- Afeta todos os map sprites que usam Dragonbones

##### Motion Names
- Walk, Wait, Chant, Guard, Damage, Evade, Thrust, Swing, Missile, Skill, Spell, Item, Escape, Victory, Dying, Abnormal, Sleep, Dead
- Altera a animação usada para este motion

---

## Map Sprite Plugin Commands

### Map Sprite: Actor Change Settings

Altera as configurações da armature Dragonbones do actor alvo para map sprites.

**Parâmetros**:

#### Actor ID
- Selecione qual Actor ID afetar

#### Filename
- Altera o nome do arquivo da armature

#### Offset X
- Altera o valor Offset X da armature

#### Offset Y
- Altera o valor Offset Y da armature

#### Scale X
- Altera o valor Scale X da armature

#### Scale Y
- Altera o valor Scale Y da armature

#### Time Scale
- Altera o valor Time Scale da armature

##### Walk Rate
- Altera a taxa de animação de caminhada da armature

##### Dash Rate
- Altera a taxa de animação de dash da armature

#### Width
- Altera o tamanho da largura do battler

#### Height
- Altera o tamanho da altura do battler

#### Flip Settings

##### Flip Left? / Flip Right
- Vira o valor scale x quando facing direções para esquerda/direita?

#### Motion Settings
- Idle, Walk, Dash, Jump, Ladder (Idle), Ladder (Climb), Rope (Idle), Rope (Climb)
- Nome de animação de escalada de corda base usado

---

### Map Sprite: Actor Play Animation

Actor alvo reproduz uma animação Dragonbones customizada.

**Parâmetros**:

#### Actor ID
- Selecione qual Actor ID afetar

#### Play Animation
- Reproduza esta animação

**Alternativa**: Coloque o seguinte código dentro de um Script Call de Movement Route:
```
this.dragonbonesAnimation = "AnimationName";
```
Substitua 'AnimationName' (mantenha as aspas) pelo nome da animação Dragonbones.

---

### Map Sprite: Actor Stop Animation

Para uma animação Dragonbones customizada do actor alvo.

**Parâmetros**:

#### Actor ID
- Selecione qual Actor ID afetar

---

### Map Sprite: Event Play Animation

Evento alvo reproduz uma animação Dragonbones customizada.

**Parâmetros**:

#### Event ID
- Selecione qual Event ID afetar

#### Play Animation
- Reproduza esta animação

---

### Map Sprite: Event Stop Animation

Para uma animação Dragonbones customizada do evento alvo.

**Parâmetros**:

#### Event ID
- Selecione qual Event ID afetar

---

### Map Sprite: Follower Play Animation

Follower alvo reproduz uma animação Dragonbones customizada.

**Parâmetros**:

#### Follower Index
- Selecione qual Follower Index afetar

#### Play Animation
- Reproduza esta animação

---

### Map Sprite: Follower Stop Animation

Para uma animação Dragonbones customizada do follower alvo.

**Parâmetros**:

#### Follower ID
- Selecione qual Follower Index afetar

---

### Map Sprite: Player Play Animation

Player reproduz uma animação Dragonbones customizada.

**Parâmetros**:

#### Play Animation
- Reproduza esta animação

---

### Map Sprite: Player Stop Animation

Para animação Dragonbones customizada do player.

---

## Picture Plugin Commands

### Picture: Dragonbones Setup

Configura uma armature Dragonbones para uma picture.

**Parâmetros**:

#### Picture ID
- Selecione qual(is) Picture ID(s) dar uma armature Dragonbones

#### Armature Filename
- Qual é o nome do arquivo da armature?

#### Play Animation
- Reproduza esta animação assim que iniciar

#### Offset: X
- Valor de offset X padrão para esta armature Dragonbones

#### Offset: Y
- Valor de offset Y padrão para esta armature Dragonbones

#### Scale: X
- Escala X padrão para esta armature Dragonbones
- Será amplificada pelo valor de escala da picture

#### Scale: Y
- Escala Y padrão para esta armature Dragonbones
- Será amplificada pelo valor de escala da picture

#### Time Scale
- Escala de tempo padrão para esta armature Dragonbones
- Valores mais altos reproduzem mais rápido. Valores mais baixos reproduzem mais devagar

---

### Picture: Play Dragonbones Animation

Faz uma armature Dragonbones existente anexada a uma picture reproduzir uma animação.

**Parâmetros**:

#### Picture ID
- Selecione qual Picture ID modificar

#### Play Animation
- Reproduza esta animação

#### Finish: Revert Idle
- Reverter animação para animação 'idle' após finalizar?

---

### Picture: Offset Dragonbones

Desloca o ponto de anexação X, Y da armature Dragonbones.

**Parâmetros**:

#### Picture ID
- Selecione qual Picture ID modificar

#### Offset: X
- Valor de offset X para esta armature Dragonbones

#### Offset: Y
- Valor de offset Y para esta armature Dragonbones

---

### Picture: Scale Dragonbones

Altera os valores de escala da armature Dragonbones.

**Parâmetros**:

#### Picture ID
- Selecione qual Picture ID modificar

#### Scale: X
- Escala X para esta armature Dragonbones
- Será amplificada pelo valor de escala da picture

#### Scale: Y
- Escala Y para esta armature Dragonbones
- Será amplificada pelo valor de escala da picture

---

### Picture: Time Scale Dragonbones

Altera a velocidade na qual as animações Dragonbones reproduzem.

**Parâmetros**:

#### Picture ID
- Selecione qual Picture ID modificar

#### Time Scale
- Escala de tempo para esta armature Dragonbones
- Valores mais altos reproduzem mais rápido. Valores mais baixos reproduzem mais devagar

---

## Links Relacionados

- [Introdução](./introduction.md) - Voltar para introdução
- [Notetags](../notetags/introduction.md) - Notetags para configurações estáticas
