# Party Command Window - Plugin Parameters

## Visão Geral

Controla como a janela de comandos do party opera na cena de batalha. Permite desabilitar a janela ou modificar seu comportamento, incluindo comandos disponíveis como Fight, Auto Battle, Status, Options e Escape.

## Parâmetros

### Command Window

#### Style
- **Descrição**: Como desenhar comandos na Party Command Window
- **Notas**:
  - **Text Only**: Exibe apenas texto
  - **Icon Only**: Exibe apenas ícone
  - **Icon + Text**: Exibe ícone primeiro, depois texto
  - **Auto**: Determina automaticamente baseado no tamanho da célula

#### Text Align
- **Descrição**: Alinhamento do texto para Party Command Window
- **Notas**: left, center ou right

#### Fight Icon
- **Descrição**: Ícone usado para comando Fight
- **Notas**: Índice do ícone da database

#### Add Auto Battle?
- **Descrição**: Adiciona comando "Auto Battle" à Command Window?
- **Notas**: Permite batalha automática

##### Auto Battle Icon
- **Descrição**: Ícone usado para comando Auto Battle
- **Notas**: Índice do ícone da database

##### Auto Battle Text
- **Descrição**: Texto usado para comando Auto Battle
- **Notas**: Texto exibido no botão

#### Add Status?
- **Descrição**: Adiciona comando "Status" à Command Window?
- **Notas**: Abre janela de status do party

#### Add Options?
- **Descrição**: Adiciona comando "Options" à Command Window?
- **Notas**: Permite acessar opções durante batalha

##### Options Icon
- **Descrição**: Ícone usado para comando Options
- **Notas**: Índice do ícone da database

##### Active TPB Message
- **Descrição**: Mensagem exibida ao selecionar options durante ação
- **Notas**: Aparece em sistemas TPB

#### Escape Icon
- **Descrição**: Ícone usado para comando Escape
- **Notas**: Índice do ícone da database

### Access

#### Skip Party Command
- **Descrição**: Pula seleção de Party Command
- **Notas**:
  - **DTB**: Pula no início de turno
  - **TPB**: Pula no início da batalha

#### Disable Party Command
- **Descrição**: Desabilita Party Command Window completamente?
- **Notas**: Remove janela de comandos do party

### Help Window

#### Fight
- **Descrição**: Texto exibido ao selecionar Fight
- **Notas**: %1 - Nome do Tipo de Skill

#### Auto Battle
- **Descrição**: Texto exibido ao selecionar Auto Battle
- **Notas**: Explicação do comando

#### Options
- **Descrição**: Texto exibido ao selecionar Options
- **Notas**: Explicação do comando

#### Escape
- **Descrição**: Texto exibido ao selecionar Escape
- **Notas**: Explicação do comando

## Ver Também
- [Actor Command Window](./actor-command-window.md) - Janela de comandos de atores
- [In-Battle Status Window](./in-battle-status-window.md) - Janela de status em batalha
- [Battle Layout](./battle-layout.md) - Layout geral de batalha
