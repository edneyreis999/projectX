# Plugin Parameters: Menu Settings

## Menu Background Settings
Imagens de fundo para cada cena do menu. Imagens de `img/titles1/` e `img/titles2/`.

- **Blur Strength**: Forca do blur (default: 8). Maior = mais forte.
- **Per-Scene Backgrounds**: Configuracao individual para:
  - Scene_Menu, Scene_Item, Scene_Skill, Scene_Equip, Scene_Status
  - Scene_Options, Scene_Save, Scene_Load, Scene_GameEnd
  - Scene_Shop, Scene_Name
  - Scene_Unlisted (cenas nao listadas)

### Background Settings (por cena)
- **Snapshot Opacity**: Opacidade do snapshot
- **Background 1**: Filename do background inferior (vazio = nenhum)
- **Background 2**: Filename do background superior (vazio = nenhum)

## Menu Button Assist Window
Janela com esquema de controles para o jogador. Similar a RPGs modernos.

### General
- **Enable**: Ativar/desativar
- **Location**: Posicao (topo ou base)
- **Background Type**: Tipo de fundo
- **Split "Escape"**: Separar "Cancel" e "Menu" keys (requer modificacao do rmmz_core.js Input.keyMapper)

### Text
- **Text Format**: Formato de exibicao. `%1` = Key, `%2` = Text
- **Multi-Key Format**: `%1` = Key 1, `%2` = Key 2
- **OK/Cancel/Switch Actor Text**: Textos padrao para acoes

### Keys
- **Key Format**: Formato para cada tecla (Up/Down/Left/Right/Shift/Tab/A-Z)
- Suporta text codes

## Controller Button Assist
Configuracao por gamepad. Se gamepad nao listado, usa versao keyboard.

### ID Information
- **Controller ID Name**: String exata do controller (usar Debug: Current Controller ID para descobrir)
- **Similarity Match**: String parcial para matching secundario

### Directions / Actions
- Mapeamento de texto para direcoes (Up/Left/Right/Down) e acoes (OK/Cancel/Menu/Shift/PageUp/PageDown)

## Menu Layout Settings
Rearranjo de posicoes de cenas. Requer conhecimento JavaScript.

### Per-Scene Window Settings
- **Background Type**: Window / Dim / Transparent
- **JS: X, Y, W, H**: Codigo para determinar dimensoes

### Scene_Title (Title Screen)
- **Document Title Format**: `%1` = Main Title, `%2` = Subtitle, `%3` = Version
- **Subtitle**: Texto do subtitulo
- **Version**: Texto da versao
- **JS: Draw Title/Subtitle/Version**: Codigo para desenhar
- **Button Fade Speed**: Velocidade de fade in (1-255)

### Scene_GameEnd
- **Command Window List**: Comandos customizaveis

### Command Window List (Title e GameEnd)
- **Symbol**: Simbolo do comando
- **STR: Text** / **JS: Text**: Texto exibido
- **JS: Show/Enable/Ext**: Visibilidade e estado
- **JS: Run Code**: Codigo ao selecionar

### Title Picture Buttons
Botoes de imagem no title screen que abrem URLs.
- **Picture's Filename**: Imagem do botao
- **Button URL**: URL ao clicar
- **JS: Position/On Load/Run Code**: Codigo JavaScript
