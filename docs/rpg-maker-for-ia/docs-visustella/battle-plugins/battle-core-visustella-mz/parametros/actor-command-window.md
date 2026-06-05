# Actor Command Window - Plugin Parameters

## Visão Geral

Controla vários aspectos da janela de comandos do ator na cena de batalha, incluindo aparência e comandos de batalha padrão disponíveis para jogadores sem notetag <Battle Commands> customizada.

## Parâmetros

### Command Window

#### Style
- **Descrição**: Como desenhar comandos na Actor Command Window
- **Notas**:
  - **Text Only**: Exibe apenas texto
  - **Icon Only**: Exibe apenas ícone
  - **Icon + Text**: Exibe ícone primeiro, depois texto
  - **Auto**: Determina automaticamente baseado no tamanho da célula

#### Text Align
- **Descrição**: Alinhamento do texto para Actor Command Window
- **Notas**: left, center ou right

#### Item Icon
- **Descrição**: Ícone usado para comando Item
- **Notas**: Índice do ícone da database

#### Normal SType Icon
- **Descrição**: Ícone para tipos de skill normais sem ícone atribuído
- **Notas**: Ignorado se VisuMZ_1_SkillsStatesCore estiver instalado

#### Magic SType Icon
- **Descrição**: Ícone para tipos de skill mágicos sem ícone atribuído
- **Notas**: Ignorado se VisuMZ_1_SkillsStatesCore estiver instalado

### Battle Commands

#### Command List
- **Descrição**: Lista de comandos de batalha padrão
- **Notas**: Usados quando notetag <Battle Commands> não está presente
- **Comandos disponíveis**:
  - **Attack**: Comando de ataque básico
  - **Skills**: Exibe todos os tipos de skill disponíveis
  - **SType: x** / **Stype: name**: Adiciona tipo de skill específico (substitua x pelo ID ou name pelo nome)
  - **All Skills**: Adiciona todas as skills de batalha como ações individuais
  - **Skill: x** / **Skill: name**: Adiciona skill específica (substitua x pelo ID ou name pelo nome)
  - **Guard**: Comando de defesa básico
  - **Item**: Comando de item básico
  - **Status**: Comando de status
  - **Escape**: Comando de fuga
  - **Auto Battle**: Comando de batalha automática
  - **Party**: Requer VisuMZ_2_PartySystem! Troca ator atual
  - **Combat Log**: Requer VisuMZ_4_CombatLog! Mostra log de combate
  - **Talk**: Requer VisuMZ_3_BattleCmdTalk! Mostra comando de talk
  - **Weapon Swap**: Requer VisuMZ_2_WeaponSwapSystem! Troca arma

#### Show Command Costs
- **Descrição**: Exibe custo de recurso se comando tiver?
- **Notas**: Mostra MP/TP custo ao lado do comando

### Help Window

#### Skill Types
- **Descrição**: Texto ao selecionar tipo de skill
- **Notas**: %1 - Nome do Tipo de Skill

#### Items
- **Descrição**: Texto ao selecionar comando Item
- **Notas**: Explicação do comando

#### Escape
- **Descrição**: Texto ao selecionar comando Escape
- **Notas**: Explicação do comando

#### Auto Battle
- **Descrição**: Texto ao selecionar comando Auto Battle
- **Notas**: Explicação do comando

## Ver Também
- [Party Command Window](./party-command-window.md) - Janela de comandos do party
- [Notetags - Battle Commands](../notetags/battle-commands.md) - Notetags para comandos customizados
- [Battle Layout](./battle-layout.md) - Layout geral de batalha
