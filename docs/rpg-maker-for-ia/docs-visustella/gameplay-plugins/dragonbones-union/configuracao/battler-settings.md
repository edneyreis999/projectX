# Plugin Parameters - Battler Settings

## Visão Geral

Sprites de Actor e Enemy podem ter armatures Dragonbones anexadas como sprites. Use estas configurações para fazer as armatures Dragonbones se adequarem às suas necessidades em batalha.

---

## Default Settings

### Enemy Hue Affected?

**Descrição**: Afetar hues para enemies com battlers Dragonbones?

**Uso**: Determina se as alterações de hue (matiz) no database afetam enemies.

### Offset: X

**Descrição**: Offset X padrão para sprites de battler.

**Uso**: Ajuste horizontal da posição da armature.

### Offset: Y

**Descrição**: Offset Y padrão para sprites de battler.

**Uso**: Ajuste vertical da posição da armature.

### Scale: X

**Descrição**: Escala padrão para X usada por battlers Dragonbones.

**Sub-parâmetros**:

#### Flip for Actors?

**Descrição**: Virar o valor scale x para negativo automaticamente para todos os actors?

#### Flip for Enemies?

**Descrição**: Virar o valor scale x para negativo automaticamente para todos os enemies?

### Scale: Y

**Descrição**: Escala padrão para Y usada por battlers Dragonbones.

### Width

**Descrição**: Tratar sprites de battler como se tivessem esta largura.

**Uso**: Usado para Action Sequences. Importante para calcular hitboxes e posições.

### Height

**Descrição**: Tratar sprites de battler como se tivessem esta altura.

**Uso**: Usado para Action Sequences. Importante para calcular hitboxes e posições.

---

## Idle Bypass

### List

**Descrição**: Lista de animações que NÃO retornarão à animação idle após completion.

**Detalhes**:
- Remova animações da lista se quiser que revertam para idle após completion
- Adicione à lista se quiser que animações permaneçam em seu frame final
- Útil para animações de ataque, dano, etc. que devem terminar em pose específica

---

## Default Motions

Define qual animação Dragonbones reproduzir para cada motion solicitado por padrão.

### Walk
### Wait
### Chant
### Guard
### Damage
### Evade
### Thrust
### Swing
### Missile
### Skill
### Spell
### Item
### Escape
### Victory
### Dying
### Abnormal
### Sleep
### Dead

**Descrição**: Reproduza esta animação Dragonbones sempre que este motion for solicitado por padrão.

**Uso**: Usado para Action Sequences. Define mapeamento padrão de motions do RPG Maker para animações Dragonbones.

**Exemplo**: Se `Wait` está definido como `idle`, quando o battler entra em motion "Wait", a animação "idle" será reproduzida.

---

## Links Relacionados

- [General Settings](./general-settings.md) - Configurações Gerais
- [Notetags Battler](../notetags/battlers.md) - Notetags para Battlers
- [Plugin Commands - Battler](../plugin-commands/comandos.md#battler-plugin-commands) - Comandos para Battlers
