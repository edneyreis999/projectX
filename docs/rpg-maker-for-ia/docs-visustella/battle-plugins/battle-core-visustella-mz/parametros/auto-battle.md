# Auto Battle Settings - Plugin Parameters

## Visão Geral
Estes Plugin Parameter settings permitem mudar os aspects adicionados por este plugin que suportam Auto Battle e os Auto Battle commands.

Auto Battle commands podem ser adicionados ao Party Command Window e/ou Actor Command Window:
- **Party Command Window**: Causa que a whole party entre em um Auto Battle state até stopped por um button input
- **Actor Command Window**: Causa que o actor selecione uma action baseada no Auto Battle A.I. uma vez para o current turn

## Parâmetros

### Battle Display

#### Message
- **Descrição**: Message que é displayed quando Auto Battle está on
- **Text Codes**: %1 - OK button, %2 - Cancel button

#### OK Button
- **Descrição**: Text usado para representar o OK button
- **Notas**: Se VisuMZ_0_CoreEngine está present, ignore isto

#### Cancel Button
- **Descrição**: Text usado para representar o Cancel button
- **Notas**: Se VisuMZ_0_CoreEngine está present, ignore isto

#### Background Type
- **Descrição**: Select background type para Auto Battle window
- **Opções**:
  - `0` - Window
  - `1` - Dim
  - `2` - Transparent

#### JS: X, Y, W, H
- **Descrição**: Code usado para determine as dimensions para esta window

### Options

#### Add Option?
- **Descrição**: Add o Auto Battle options ao Options menu?

#### Adjust Window Height
- **Descrição**: Automatically adjust o options window height?

#### Startup Name
- **Descrição**: Command name da option

#### Style Name
- **Descrição**: Command name da option

#### OFF
- **Descrição**: Text displayed quando Auto Battle Style é OFF

#### ON
- **Descrição**: Text displayed quando Auto Battle Style é ON

## Ver Também

- [Parâmetros: Party Command Window](./party-command-window.md) - Configurações da janela de comandos de party
- [Parâmetros: Actor Command Window](./actor-command-window.md) - Configurações da janela de comandos de actor
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
