# Categorias de Opcoes

O Options Core organiza as opcoes em **categorias** exibidas no menu lateral. Cada categoria contem sub-grupos de opcoes relacionadas.

## Categorias Padrao

### General

Categoria principal com opcoes de exploracao, batalha, tela e controles.

**Sub-grupos:**
- **Exploration** - Always Dash, Autosave, Show Date & Time, Show Quest Tracker, Quest Tracker Position, Random Encounters, Show Tutorials
- **Battle** - Show Battle Animations, Battle Animation Speed, Battle Camera, Command Remember, Active Battle Style, Active Battle Speed, Auto Battle Start, Auto Battle Style
- **Screen** - Display FPS, Limit FPS, Full Screen, Stretch Screen, Special Effects, Dust Clouds, Footprint Marks, Smooth Scroll, Blinking Lights, Pulsing Lights, Weather Density
- **Controls** - Rebind Keyboard, Rebind Gamepad

### Audio

Categoria de opcoes de audio com volume e efeitos sonoros.

**Sub-grupos:**
- **Volume** - Master Volume, BGM Volume, BGS Volume, ME Volume, SE Volume, Voice Volume, Voice Language, Advanced Sound Options
- **Sound Effects** - Battle Voices, Footstep Sounds, Letter Sounds, Cursor SFX, Confirm SFX, Cancel SFX, Buzzer SFX

### UI

Categoria de interface visual com janelas, texto, touch input e battle UI.

**Sub-grupos:**
- **Windows** - Window Tone: Red/Green/Blue
- **Text** - Text Language, Text Font, Text Speed
- **Touch Input** - Touch UI, Button Position, Hover Select
- **Menu Arrangement** - Menu Style, Help Window Position, Input Window Position
- **Battle UI** - Show Provoke Origin, Show Aggro Gauge, Show HP Gauges, Show ATB Gauges

### Playtest

Categoria exclusiva do modo playtest. So aparece durante test play, nao em builds deployadas (a menos que explicitamente configurado).

**Sub-grupos:**
- **Effects** - Playtest Effects (master toggle)
- **Exploration** - Map Update Speed, Random Encounters
- **Battle** - God Mode, Resist Negative Effects, Instant K.O., Skill Costs, Consume Items
- **Rewards** - EXP Multiplier, Gold Multiplier, Drop Multiplier
- **Spawners** - Spawn Items, Spawn Weapons, Spawn Armors
- **Debug** - Debug Menu

## Customizacao de Categorias

As categorias sao totalmente configuraveis via Plugin Parameters. Novas categorias podem ser adicionadas e categorias existentes podem ser editadas ou removidas. Cada categoria possui:

- **Name** - Nome exibido (suporta text codes)
- **Icon** - Icone da categoria (0 = sem icone)
- **JS: Show/Hide** - Codigo JS para visibilidade condicional
- **Options List** - Lista de opcoes dentro da categoria
