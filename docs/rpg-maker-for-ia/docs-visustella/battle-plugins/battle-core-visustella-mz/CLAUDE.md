# Battle Core VisuStella MZ - Índice Expandido para LLMs

## Visão Geral da Documentação

Esta documentação contém o plugin **Battle Core (VisuStella MZ)** versão 1.85 completamente catalogado e organizado para navegação por LLMs. O documento original de 24.716 linhas foi dividido em ~70 arquivos modulares organizados por domínio funcional.

### Metadados do Plugin
- **Nome**: Battle Core (VisuStella MZ)
- **Versão**: 1.85 (Outubro 17, 2024)
- **Autor**: VisuStella (Yanfly, Arisu, Olivia, Irina)
- **Tier**: 1
- **Dependência Obrigatória**: VisuMZ_0_CoreEngine (Tier 0)
- **Target**: RPG Maker MZ

## Mapa Completo da Documentação

### CAMADA 1: Conceitos Fundamentais

Localização: `docs/rpg-maker-for-ia/battle-core-visustella-mz/conceitos/`

#### visao-geral.md
**Propósito**: Introdução ao Battle Core e suas features principais
**Conteúdo**:
- Descrição do plugin e seu propósito
- Lista completa de features (20+ funcionalidades)
- Explicação de Action Sequences
- Explicação de Battle Layout styles
- Controle sobre mecânicas de batalha

**Quando consultar**: Ao começar a usar o Battle Core pela primeira vez

#### major-changes.md
**Propósito**: Mudanças no código base do RPG Maker MZ feitas pelo plugin
**Conteúdo**:
- Action Sequences (mudança no sistema padrão)
- Action Speed (remoção de random variance)
- Animated Sideview Battler Support For Enemies
- Battle Sprite Updates
- Change Battle Back in Battle
- Critical Hit - LUK Influence
- E mais mudanças principais

**Quando consultar**: Ao entender impactos no sistema base, troubleshooting de comportamentos inesperados

#### base-troops.md
**Propósito**: Sistema de Base Troops para eventos compartilhados
**Conteúdo**:
- O que são Base Troops
- Como funcionam
- Configuração em Plugin Parameters
- Casos de uso

**Quando consultar**: Ao implementar eventos de batalha reutilizáveis

#### damage-styles.md
**Propósito**: Sistema de Damage Styles
**Conteúdo**:
- O que são Damage Styles
- Lista de Damage Styles padrão
- Como criar/editar Damage Styles
- Tabela de estilos (Physical, Magical, etc.)

**Quando consultar**: Ao configurar fórmulas de dano simplificadas

### CAMADA 2: Notetags

Localização: `docs/rpg-maker-for-ia/battle-core-visustella-mz/notetags/`

Os notetags são organizados por categoria funcional:

#### hp-gauge.md
Notetags relacionadas a HP Gauges visuais
- <Show HP Gauge>
- <Hide HP Gauge>
- Configurações de posição e visibilidade

#### animacao.md
Notetags para controle de animações
- <Animation: id>
- Animações customizadas para skills
- Timing de animações

#### battleback.md
Notetags para battlebacks
- <Battleback: image1, image2>
- Battlebacks específicos para troops

#### battle-command.md
Notetags para comandos de batalha
- <Add Battle Command: x>
- <Remove Battle Command: x>
- Customização de comandos de actor

#### targeting.md
Notetags para sistema de alvos
- <Custom Target Scope>
- <Target: x>
- Scopes customizados para skills

#### damage.md
Notetags para dano e fórmulas
- <Damage Formula>
- <Damage Style>
- Fórmulas customizadas de dano

#### critical.md
Notetags para critical hits
- <Critical Rate Formula>
- <Critical Damage Formula>
- Controle de críticos

#### life-steal.md
Notetags para life steal (roubo de vida)
- <HP Drain: x%>
- <MP Drain: x%>
- Roubo de HP/MP

#### action-sequence.md
Notetags para Action Sequences customizadas
- <Custom Action Sequence>
- Action Sequences via Common Events
- Criação de sequências complexas

#### animated-sideview-battler.md
Notetags para Sideview Battlers em inimigos
- <Sideview Battler: filename>
- <Sideview Weapon: filename>
- Configuração de sprites sideview

#### enemy.md
Notetags específicas para inimigos
- <Enemy Size: width, height>
- <Home Position: x, y>
- Configurações de posição e tamanho

#### mechanics.md
Notetags para mecânicas de batalha
- <Auto Battle>
- <Guard Skill: x>
- Various mechanic-related tags

#### battle-layout.md
Notetags para layout de batalha
- <Battle Layout: type>
- Layout types (sideview, frontview, etc.)

#### troop-tags.md
Troop Size e Comment Tags
- <Troop Size: width, height>
- Comment Tags para troops
- Configuração de tamanho de troop

### CAMADA 3: Plugin Parameters

Localização: `docs/rpg-maker-for-ia/battle-core-visustella-mz/parametros/`

Os Plugin Parameters controlam o comportamento global do plugin:

#### auto-battle.md
Configurações de Auto Battle
- Battle Display (message)
- Auto Battle AI settings
- Party vs Actor Auto Battle

#### damage.md
Configurações de Damage
- Damage Styles List
- Damage caps (hard/soft)
- Damage formula settings

#### mechanics.md
Configurações de Mechanics
- Base Troop ID's
- Allow Random Speed?
- Various mechanic toggles

#### battle-layout.md
Configurações de Battle Layout
- Default Battle Layout
- Layout types e configurações

#### battle-log.md
Configurações de Battle Log
- Window settings
- Display options
- Log formatting

#### battleback-scaling.md
Configurações de Battleback Scaling
- Scaling methods
- Resolution handling

#### party-command-window.md
Configurações de Party Command Window
- Window visibility
- Command list
- Status display

#### actor-command-window.md
Configurações de Actor Command Window
- Command List
- Window settings
- Custom commands

#### in-battle-status-window.md
Configurações de In-Battle Status Window
- Window display
- Status info shown
- Position settings

#### multi-target-windows.md
Configurações de Multi-Target Windows
- Window behavior
- Target selection

#### damage-combo-window.md
Configurações de Damage Combo Window
- Combo display
- Window timing

#### actor-battler-settings.md
Configurações de Actor Battler
- Motion Speed
- Home Position
- Weapon images

#### enemy-battler-settings.md
Configurações de Enemy Battler
- Size (Width/Height)
- Name Visibility
- Home Position
- Aspects

#### hp-gauge.md
Configurações de HP Gauge
- Gauge visibility
- Position settings
- Colors
- Display conditions

#### action-sequence.md
Configurações de Action Sequence
- Auto-creation of targets
- Speed settings
- Sequence defaults

### CAMADA 4: Action Sequences

Localização: `docs/rpg-maker-for-ia/battle-core-visustella-mz/action-sequences/`

Action Sequences são comandos que controlam o que acontece durante uma skill ou item. Esta seção contém 25+ categorias de comandos:

#### action-sets.md
Action Sets - grupos de comandos comuns
- ANIMATION ACTION SET
- BASIC ACTION SET
- SKILL ACTION SET
- ATTACK ACTION SET
- Como usar Action Sets

#### animacoes.md
Comandos de Animação
- ANIMATION: [target]
- ANIMATION CLEAR: [target]
- Wait for animations

#### battle-log.md
Comandos de Battle Log
- BATTLE LOG: STRING
- BATTLE LOG: CLEAR
- ADD BATTLE LOG: STRING
- Display formatting

#### camera.md
Comandos de Câmera
- CAMERA: SET
- CAMERA: ZOOM
- CAMERA: SHAKE
- CAMERA: RESET
- Camera movement effects

#### cutins.md
Comandos de Cutins
- CUTIN: SHOW
- CUTIN: HIDE
- Cutin effects

#### elements.md
Comandos de Elementos
- ELEMENT: SET
- ELEMENT: ADD
- ELEMENT: REMOVE
- Element manipulation

#### grid.md
Comandos de Grid
- GRID: SHOW
- GRID: HIDE
- GRID: SET POSITION
- Position grid

#### horror-effects.md
Comandos de Horror Effects
- HORROR EFFECT
- Flash, shake, distortion effects

#### impact.md
Comandos de Impact
- IMPACT: SHOW
- IMPACT: HIDE
- Visual impact effects

#### inject.md
Comandos de Inject
- INJECT: ACTION
- Inject JavaScript code

#### mechanics.md
Comandos de Mechanics
- MECH: ACTION EFFECT
- MECH: WAIT FOR EFFECTS
- MECH: BOOST STORE DATA
- Core battle mechanics

#### motion.md
Comandos de Motion
- MOTION: [type]
- Actor motions (attack, guard, etc.)

#### movement.md
Comandos de Movement
- MOVE: [target]
- JUMP: [target]
- PATH FIND: target
- Sprite movement

#### opacity.md
Comandos de Opacity
- OPACITY: [target], [rate]
- Transparency control

#### overlays.md
Comandos de Overlays
- OVERLAY: SHOW
- OVERLAY: HIDE
- Color overlays

#### pictures.md
Comandos de Pictures
- PICTURE: SHOW
- PICTURE: HIDE
- PICTURE: MOVE

#### portraits.md
Comandos de Portraits
- PORTRAIT: SHOW
- PORTRAIT: HIDE
- PORTRAIT: MOVE
- Character portraits

#### shake.md
Comandos de Shake
- SHAKE: [target]
- SHAKE: SCREEN
- Screen/sprite shake

#### sound.md
Comandos de Sound
- SOUND: PLAY
- SE: PLAY
- BGM: PLAY
- Audio control

#### state.md
Comandos de State
- STATE: ADD
- STATE: REMOVE
- State manipulation

#### targets.md
Comandos de Targets
- TARGET: SET
- TARGET: ADD
- TARGET: REMOVE
- TARGET: CLEAR
- Target management

#### time.md
Comandos de Time
- TIME: WAIT
- TIME: SKIP
- Timing control

#### toggle.md
Comandos de Toggle
- TOGGLE: SWITCH
- TOGGLE: VARIABLE
- Switch/variable control

#### transform.md
Comandos de Transform
- TRANSFORM: [target], [image]
- Sprite transformation

#### user-interface.md
Comandos de User Interface
- UI: CLEAR
- UI: WAIT
- UI control

#### visible.md
Comandos de Visibility
- VISIBLE: [target], [boolean]
- Hide/show sprites

#### wait.md
Comandos de Wait/Frames
- WAIT: [frames]
- WAIT FOR [effect]
- Timing waits

### CAMADA 5: Referência

Localização: `docs/rpg-maker-for-ia/battle-core-visustella-mz/referencia/`

#### compatibilidade.md
VisuStella MZ Compatibility
- Plugins incompatíveis
- Features incompatíveis
- Workarounds

#### termos-uso.md
Terms of Use
- Licenciamento
- Requisitos de créditos
- Permissões de edição

#### creditos.md
Credits
- Team VisuStella
- Contribuidores

#### changelog.md
Changelog
- Histórico de versões
- Bug fixes
- New features

#### troubleshooting.md
Troubleshooting
- Problemas comuns
- Soluções
- Workarounds

#### glossario.md
Glossário
- Termos técnicos
- Definições
- Conceitos

## Relação Entre Áreas

### Fluxo de Configuração Típico

1. **Conceitos** → Entender o sistema
2. **Parâmetros** → Configurar comportamento global
3. **Notetags** → Aplicar configurações específicas (skills, items, actors)
4. **Action Sequences** → Criar sequências de ação customizadas
5. **Referência** → Resolver problemas e verificar compatibilidade

### Dependências Entre Seções

- **Action Sequences** dependem de **Parâmetros: Action Sequence Settings**
- **Notetags de Action Sequence** complementam **Action Sequences**
- **Parâmetros: Damage Settings** afetam **Notetags de Damage**
- **Battle Layout** (parâmetros) afeta **toda a apresentação visual**
- **Base Troops** (conceitos) é configurado em **Parâmetros: Mechanics**

### Pontos de Integração

- **Damage Styles** (Conceitos + Parâmetros) - Sistema configurável e usável
- **HP Gauge** (Notetags + Parâmetros) - Configuração global + override individual
- **Battle Commands** (Notetags + Parâmetros) - Configuração de comandos
- **Action Sequences** (Notetags + Comandos) - Customização completa

## Como Encontrar Informação Específica

### Para uma regra específica:
1. Identifique a categoria (Notetag vs Parâmetro vs Action Sequence)
2. Vá para a pasta correspondente
3. Use o arquivo específico da categoria
4. Busque pela regra dentro do arquivo

### Para um fluxo/processo:
1. Consulte **Conceitos** para entender o funcionamento
2. Consulte **Parâmetros** para configuração global
3. Consulte **Notetags** para aplicação específica
4. Consulte **Action Sequences** para sequências de ação

### Para uma definição:
1. Consulte **Referência → Glossário**
2. Se não encontrado, busque nos **Conceitos**

### Para troubleshooting:
1. **Referência → Troubleshooting**
2. **Referência → Compatibilidade**
3. Revisar **Parâmetros** relacionados
4. Revisar **Notetags** aplicados

## Estratégias de Navegação por Caso de Uso

### Criando uma skill customizada:
1. conceitos/visao-geral.md (entender)
2. parametros/action-sequence.md (configurar)
3. action-sequences/ (criar sequência)
4. notetags/action-sequence.md (aplicar)

### Configurando battle system:
1. conceitos/major-changes.md (entender mudanças)
2. parametros/mechanics.md (configurar)
3. parametros/battle-layout.md (layout)
4. parametros/battle-log.md (log)

### Resolvendo problema de dano:
1. referencia/troubleshooting.md
2. parametros/damage.md
3. notetags/damage.md
4. conceitos/damage-styles.md

### Criando inimigo customizado:
1. notetags/enemy.md (configurações)
2. notetags/animated-sideview-battler.md (sprites)
3. parametros/enemy-battler-settings.md (configurações globais)
4. action-sequences/ (ações customizadas)

## Metadados da Catalogação

- **Documento fonte**: docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md
- **Tamanho original**: 24.716 linhas (751KB)
- **Data de catalogação**: 2025-01-09
- **Total de arquivos gerados**: ~70 arquivos
- **Estrutura**: 6 pastas (conceitos, notetags, parametros, action-sequences, referencia, raiz)
- **Índices gerados**: index.md, llms.txt, llms-full.txt, chunks.json

## Notas Importantes

1. **Preservação de conteúdo**: Todo o conteúdo relevante foi preservado
2. **Remoção de redundância**: Apenas redundância óbvia e ruído visual foram removidos
3. **Reestruturação**: Títulos vagos foram reescritos para títulos específicos
4. **Links internos**: Criados links entre tópicos relacionados
5. **Divisão semântica**: Arquivos divididos por unidade semântica, não por tamanho

## Próximos Passos

Para usar esta documentação:
1. Comece pelo index.md para visão geral
2. Use llms.txt para navegação rápida
3. Consulte llms-full.txt (este arquivo) para encontrar seções específicas
4. Acesse os arquivos diretamente conforme necessário
5. Use chunks.json para recuperação semântica via RAG
