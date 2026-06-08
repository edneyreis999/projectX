# Plugin Parameters - Map Sprite Settings

## Visão Geral

Estas configurações de Plugin Parameter ajustam as configurações padrão para qualquer map sprite que está usando uma armature Dragonbones. Estas configurações podem ser sobrescritas por sprite através de notetags e comment tags.

---

## Defaults

### Offset: X

**Descrição**: Offset X padrão para map sprites.

**Uso**: Ajuste horizontal da posição da armature no mapa.

### Offset: Y

**Descrição**: Offset Y padrão para map sprites.

**Uso**: Ajuste vertical da posição da armature no mapa.

### Scale: X

**Descrição**: Escala padrão para X usada por map sprites Dragonbones.

**Sub-parâmetros**:

#### Flip Left?

**Descrição**: Virar o valor scale x quando facing direções para a esquerda?

#### Flip Right?

**Descrição**: Virar o valor scale x quando facing direções para a direita?

### Scale: Y

**Descrição**: Escala padrão para Y usada por map sprites Dragonbones.

### Time Scale

**Descrição**: A taxa na qual as animações reproduzem.

**Detalhes**:
- Números mais altos vão mais rápido
- Números mais baixos vão mais devagar
- 1.0 é a velocidade base

### Width

**Descrição**: Tratar map sprites como se tivessem esta largura.

**Uso**: Usado para vários plugins que precisam calcular dimensões.

### Height

**Descrição**: Tratar map sprites como se tivessem esta altura.

**Uso**: Usado para vários plugins que precisam calcular dimensões.

---

## Motion Settings

Define o nome da animação Dragonbones para cada motion de mapa.

### Idle
### Walk
### Dash
### Jump
### Ladder (Idle)
### Ladder (Climb)
### Rope (Idle)
### Rope (Climb)

**Descrição**: Nome de animação base usado para este motion.

**Exemplos**:
- `Idle` → `idle`
- `Walk` → `walk`
- `Dash` → `dash`
- `Jump` → `jump`

### Walk Timer

**Descrição**: Número de frames para contar como caminhando para que uma animação idle não seja forçada imediatamente ao parar.

**Uso**: Previne transições abruptas entre walk e idle. Define um pequeno delay após parar de andar.

---

## Links Relacionados

- [General Settings](./general-settings.md) - Configurações Gerais
- [Map Sprites - Conceitos](../conceitos/map-sprites.md) - Limitações e comportamentos
- [Notetags Map Sprites](../notetags/map-sprites.md) - Notetags para Map Sprites
- [Plugin Commands - Map Sprite](../plugin-commands/comandos.md#map-sprite-plugin-commands) - Comandos para Map Sprites
