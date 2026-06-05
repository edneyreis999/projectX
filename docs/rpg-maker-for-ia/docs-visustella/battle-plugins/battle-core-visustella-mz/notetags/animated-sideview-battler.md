# Animated Sideview Battler - Notetags

## Visão Geral
Enemies podem usar Animated Sideview Actor graphics graças a este plugin. Estas notetags dão control sobre esse aspecto. Algumas destas também afetam actors em addition a enemies.

## Lista de Notetags

### <Sideview Battler: filename>
### <Sideview Battlers>
- **Used for**: Enemy Notetags
- **Descrição**: Replaces o enemy's battler graphic com um animated Sideview Actor graphic found na img/sv_actors/ folder
- **Parâmetros**:
  - `filename`: filename do graphic para usar (sem extensão)
    - Exemplo: para arquivo 'Actor1_1.png', use apenas 'Actor1_1' (sem '.png')
  - `weight`: valor numérico representando quantas vezes o 'filename' virá (quanto maior, mais frequente). Opcional.
- **Sintaxe**:
```
<Sideview Battlers>
 filename: weight
 filename: weight
 filename: weight
</Sideview Battlers>
```
- **Notas**:
  - Se a multiple notetag variant é usada, um random filename é selected da list upon o enemy's creation
  - Add/remove lines como você see fit

**Exemplo**:
```
<Sideview Battlers>
 Actor1_1: 25
 Actor1_3: 10
 Actor1_5
 Actor1_7
</Sideview Battlers>
```

### <Sideview Anchor: x, y>
- **Used for**: Actor, Enemy Notetags
- **Descrição**: Sets o sprite anchor positions para o sideview sprite
- **Parâmetros**:
  - `x`, `y`: números depicting onde os anchors deveriam ser para o sideview sprite
- **Default**: x = 0.5, y = 1.0

### <Sideview Home Offset: +x, +y>
### <Sideview Home Offset: -x, -y>
- **Used for**: Actor, Class, Weapon, Armor, State Notetags
- **Descrição**: Offsets o sideview actor sprite's home position por +/-x, +/-y
- **Parâmetros**:
  - `x`, `y`: números depicting quanto para offset cada um dos coordinates por (para valores '0', use +0 ou -0)
- **Notas**: Esta notetag não irá funcionar se você removê-la do JavaScript code em Plugin Parameters > Actor > JS: Home Position

### <Sideview Weapon Offset: +x, +y>
### <Sideview Weapon Offset: -x, -y>
- **Used for**: Actor, Class, Weapon, Armor, Enemy State Notetags
- **Descrição**: Offsets o sideview weapon sprite's position por +/-x, +/-y
- **Parâmetros**:
  - `x`, `y`: números depicting quanto para offset cada um dos coordinates por (para valores '0', use +0 ou -0)

### <Sideview Show Shadow>
### <Sideview Hide Shadow>
- **Used for**: Actor, Enemy Notetags
- **Descrição**: Sets de forma que o sideview battler's shadow será visible ou hidden

### <Sideview Shadow Scale: x%>
### <Sideview Shadow Scale: x.y>
- **Used for**: Actor, Enemy Notetags
- **Descrição**: Adjusts o scaling size do sideview battler's shadow (afeta ambos X e Y scale)
- **Parâmetros**:
  - `x%`: porcentagem de escala
  - `x.y`: valor decimal de escala

### <Sideview Shadow Scale X: x%>
### <Sideview Shadow Scale X: x.y>
### <Sideview Shadow Scale Y: x%>
### <Sideview Shadow Scale Y: x.y>
- **Used for**: Actor, Enemy Notetags
- **Descrição**: Adjusts o scaling size do sideview battler's shadow (afeta X e Y scales separadamente)
- **Parâmetros**:
  - `x%`: porcentagem de escala
  - `x.y`: valor decimal de escala

### <Sideview Collapse>
### <Sideview No Collapse>
- **Used for**: Enemy Notetags
- **Descrição**: Either shows o collapse graphic ou does not show o collapse graphic
- **Notas**:
  - **Collapse graphic**: o enemy irá 'fade away' uma vez que é defeated
  - **No collapse graphic**: o enemy's corpse irá remain na screen

### <Sideview Idle Motion: name>
### <Sideview Idle Motions>
- **Used for**: Enemy Notetags
- **Descrição**: Changes o default idle motion para o enemy
- **Parâmetros**:
  - `name`: um dos seguintes motion names:
    - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing', 'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying', 'abnormal', 'sleep', 'dead'
  - `weight`: valor numérico representando quantas vezes o 'name' virá (opcional)
- **Sintaxe**:
```
<Sideview Idle Motions>
 name: weight
 name: weight
 name: weight
</Sideview Idle Motions>
```
- **Notas**:
  - Se a multiple notetag variant é usada, um random motion name é selected da list upon o enemy's creation
  - Add/remove lines como você see fit

**Exemplo**:
```
<Sideview Idle Motions>
 walk: 25
 wait: 50
 guard
 victory
 abnormal
</Sideview Idle Motions>
```

### <Sideview Size: width, height>
- **Used for**: Enemy Notetags
- **Descrição**: Quando usando um sideview battler, seu width e height irá default para o setting feito em Plugin Parameters => Enemy Settings => Size: Width/Height
- **Parâmetros**:
  - `width`, `height`: números representando quantos pixels wide/tall o sprite será treated como
- **Notas**:
  - Isto **NÃO** changes o image size. Isto apenas changes o HITBOX size

### <Sideview Weapon: weapontype>
### <Sideview Weapons>
- **Used for**: Enemy Notetags
- **Descrição**: Dá aos sideview enemies weapons para usar
- **Parâmetros**:
  - `weapontype`: nome do weapon type encontrado sob Database => Types => Weapon Types list (sem text codes)
  - `weight`: valor numérico representando quantas vezes o weapontype virá (opcional)
- **Sintaxe**:
```
<Sideview Weapons>
 weapontype: weight
 weapontype: weight
 weapontype: weight
</Sideview Weapons>
```
- **Notas**:
  - Se a multiple notetag variant é usada, um random weapon type é selected da list upon o enemy's creation
  - Add/remove lines como você see fit

**Exemplo**:
```
<Sideview Weapons>
 Dagger: 25
 Sword: 25
 Axe
</Sideview Weapons>
```

## Trait-Based Notetags (Requires VisuMZ_1_ElementStatusCore)

### <traitname Sideview Battler: filename>
### <traitname Sideview Battlers>
- **Used for**: Enemy Notetags
- **Requisitos**: Requires VisuMZ_1_ElementStatusCore
- **Descrição**: Permite que certos Trait Sets causem battlers para ter um unique appearance
- **Parâmetros**:
  - `traitname`: nome do trait set
  - `filename`: filename do graphic para usar (sem extensão)
  - `weight`: valor numérico (opcional)

**Exemplos**:
```
<Male Sideview Battlers>
 Actor1_1: 25
 Actor1_3: 10
 Actor1_5
 Actor1_7
</Male Sideview Battlers>

<Female Sideview Battlers>
 Actor1_2: 25
 Actor1_4: 10
 Actor1_6
 Actor1_8
</Female Sideview Battlers>
```

### <traitname Sideview Idle Motion: name>
### <traitname Sideview Idle Motions>
- **Used for**: Enemy Notetags
- **Requisitos**: Requires VisuMZ_1_ElementStatusCore
- **Descrição**: Permite que certos Trait Sets causem battlers para terem unique idle motions
- **Parâmetros**:
  - `traitname`: nome do trait set
  - `name`: motion name (da lista de motion names)
  - `weight`: valor numérico (opcional)

**Exemplos**:
```
<Jolly Sideview Idle Motions>
 wait: 25
 victory: 10
 walk
</Jolly Sideview Idle Motions>

<Serious Sideview Idle Motions>
 walk: 25
 guard: 10
 wait
</Serious Sideview Idle Motions>
```

### <traitname Sideview Weapon: weapontype>
### <traitname Sideview Weapons>
- **Used for**: Enemy Notetags
- **Requisitos**: Requires VisuMZ_1_ElementStatusCore
- **Descrição**: Permite que certos Trait Sets causem battlers para terem unique weapons
- **Parâmetros**:
  - `traitname`: nome do trait set
  - `weapontype`: nome do weapon type (sem text codes)
  - `weight`: valor numérico (opcional)

**Exemplos**:
```
<Male Sideview Weapons>
 Dagger: 25
 Sword: 25
 Axe
</Male Sideview Weapons>

<Female Sideview Weapons>
 Dagger: 25
 Spear: 25
 Cane
</Female Sideview Weapons>
```

## Ver Também

- [Action Sequences: Motion](../action-sequences/motion.md) - Comandos de Motion para Action Sequences
- [Parâmetros: Actor Battler Settings](../parametros/actor-battler-settings.md) - Configurações de Actor Battler
- [Parâmetros: Enemy Battler Settings](../parametros/enemy-battler-settings.md) - Configurações de Enemy Battler
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
