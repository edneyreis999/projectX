# Battle Layout Settings - Plugin Parameters

## Visão Geral
Estes Plugin Parameters dão control sobre o look, style, e appearance de certos UI elements, variando de como o Battle Status Window presents suas informações até como certas windows como Party Command Window e Actor Command Window appear.

## Parâmetros

### Battle Layout Style

O style usado para o battle layout:

- **Default**: Shows actor faces em Battle Status
- **List**: Lists actors em Battle Status
- **XP**: Shows actor battlers em um stretched Battle Status
- **Portrait**: Shows portraits em um stretched Battle Status
- **Border**: Displays windows ao redor da screen border

### List Style

#### Show Faces
- **Descrição**: Shows faces em List Style?

#### Command Window Width
- **Descrição**: Determine a window width para a Party e Actor Command Windows
- **Notas**: Affects Default e List Battle Layout styles

### XP Style

#### Command Lines
- **Descrição**: Number de action lines no Actor Command Window para o XP Style

#### Sprite Height
- **Descrição**: Default sprite height usado quando if o sprite's height não tem sido determined yet

#### Sprite Base Location
- **Descrição**: Determine onde o sprite é localizado no Battle Status Window
- **Opções**:
  - Above Name - Sprite é localizado acima do name
  - Bottom - Sprite é localizado no bottom da window
  - Centered - Sprite é centered na window
  - Top - Sprite é localizado no top da window

### Portrait Style

#### Show Portraits?
- **Descrição**: Requires VisuMZ_1_MainMenuCore. Shows o actor's portrait instead de um face

#### Portrait Scaling
- **Descrição**: Se portraits são usados, scale eles por este much

### Border Style

#### Columns
- **Descrição**: O total number de columns para Skill & Item Windows na battle scene

#### Show Portraits?
- **Descrição**: Requires VisuMZ_1_MainMenuCore. Shows o actor's portrait na edge da screen

#### Portrait Scaling
- **Descrição**: Se portraits são usados, scale eles por este much

### Skill & Item Windows

#### Middle Layout
- **Descrição**: Shows o Skill & Item Windows em mid-screen?

#### Columns
- **Descrição**: O total number de columns para Skill & Item Windows na battle scene

### Status Window Elements

#### Battler Name / Gauge 1 (HP) / Gauge 2 (MP) / Gauge 3 (TP) / State Icon / TPB/ATB Gauge

**Offset: X/Y**:
- **Descrição**: Offset este Battle Status Window element's X/Y
- **Notas**:
  - Para X: Negative goes left, Positive goes right
  - Para Y: Negative goes up, Positive goes down

#### Window Skin

##### Filename
- **Descrição**: Filename usado para o Battle Status Window skin
- **Notas**: Leave isto empty para usar o default window skin

##### Hide Window Skin?
- **Descrição**: Hide o window skin para o Battle Status Window?

#### Selectable Background

##### Hide Selectable BG?
- **Descrição**: Show/Hide o selectable background box para o Battle Status Window?

#### Attachments

##### Back Attachment
- **Filename**: Filename usado para um image para attach ao back do Battle Status Window (leave empty para none)
- **Offset: X/Y**: Offset este Battle Status Window element's X/Y

##### Front Attachment
- **Filename**: Filename usado para um image para attach ao front do Battle Status Window (leave empty para none)

### UI Elements

#### Anti-Tint UI?
- **Descrição**: Prevent UI Elements de serem tinted?
- **Notas**: Isto previne UI Elements como HP Gauges, Enemy Names, Battle Cursor, e Weakness Display de serem affected por screen tint

## Ver Também

- [Notetags: Battle Layout](../notetags/battle-layout.md) - Notetags para controlar layout por map/troop
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
