# VisuStella Options Core - Visao Geral

## Dados do Plugin

| Campo | Valor |
|-------|-------|
| **Nome** | VisuMZ_1_OptionsCore |
| **Tier** | 1 |
| **Requisito** | RPG Maker MZ |
| **Posicao** | Abaixo de plugins de tier menor (0). Acima de plugins de tier maior (2, 3, 4, 5) |

## Proposito

O Options Core reformula completamente a Scene de Options Menu do RPG Maker MZ, tornando-a mais extensiva e suportando uma variedade maior de opcoes. O plugin adiciona novas opcoes nativamente e integra opcoes de outros plugins VisuStella MZ quando instalados.

## Funcionalidades Principais

- **Menu de Opcoes Reformulado** - Nova Scene e layout para o menu de opcoes
- **Categorias Customizaveis** - Possibilidade de adicionar categorias e opcoes dentro de cada categoria
- **Novas Opcoes Nativas** - Master Volume, Window Tone, etc.
- **Integracao VisuStella** - Opcoes de outros plugins VisuStella aparecem automaticamente
- **Playtest Options** - Categoria exclusiva do modo playtest para debug

## Mudancas Majoritarias

### Options Menu Scene

A Scene inteira foi reformulada. Funcoes basicas ainda funcionam, mas nao espere que tudo se integre perfeitamente com scripts customizados que alteram o menu de opcoes.

### Extra Features

Recursos extras sao habilitados quando outros plugins VisuStella estao presentes no Plugin Manager. A maioria habilita novas opcoes no Options Core.

### Integracao com Outros Plugins VisuMZ

Cada plugin VisuStella pode registrar opcoes proprias que aparecem automaticamente no Options Core quando ambos estao instalados.

## Dependencias Opcionais

O Options Core se integra com os seguintes plugins (opcionais, mas habilitam opcoes adicionais):

| Plugin | Opcoes Habilitadas |
|--------|-------------------|
| VisuMZ_0_CoreEngine | Touch UI, Rebind Keyboard/Gamepad, Button Position |
| VisuMZ_1_SaveCore | Autosave |
| VisuMZ_1_BattleCore | Auto Battle Start, Auto Battle Style |
| VisuMZ_1_MessageCore | Text Language, Text Speed |
| VisuMZ_1_SkillsStatesCore | Resist Negative Effects (Playtest) |
| VisuMZ_2_BattleSystemATB | Active Battle Style, Active Battle Speed, Show ATB Gauges |
| VisuMZ_2_DateTimeSystem | Show Date & Time |
| VisuMZ_2_QuestSystem | Show Quest Tracker, Quest Tracker Position |
| VisuMZ_2_TutorialPanelSys | Show Tutorials |
| VisuMZ_2_MovementEffects | Dust Clouds, Footprint Marks, Smooth Scroll, Footstep Sounds |
| VisuMZ_2_LightingEffects | Blinking Lights, Pulsing Lights |
| VisuMZ_2_WeatherEffects | Weather Density |
| VisuMZ_2_BrightEffects | Special Effects |
| VisuMZ_2_HorrorEffects | Special Effects |
| VisuMZ_2_VoiceActControl | Voice Volume, Voice Language |
| VisuMZ_2_AggroControlSystem | Show Provoke Origin, Show Aggro Gauge |
| VisuMZ_3_ActSeqCamera | Battle Camera |
| VisuMZ_3_BattleVoices | Battle Voices |
| VisuMZ_3_MessageSounds | Letter Sounds |
| VisuMZ_3_VisualHpGauge | Show HP Gauges |
| Tome571/TF Advanced Sound Options | Advanced Sound Options |
