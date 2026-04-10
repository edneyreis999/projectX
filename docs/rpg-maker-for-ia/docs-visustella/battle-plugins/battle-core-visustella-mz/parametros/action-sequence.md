# Action Sequence Settings - Plugin Parameters

## Visão Geral

Controla se Action Sequences automáticas são usadas para ataques físicos, animações de casting padrão, como contra-ataques e reflexos aparecem visualmente, e distâncias de stepping padrão.

## Parâmetros

### Automatic Sequences

#### Melee Single Target
- **Descrição**: Permite auto sequence para ações físicas de alvo único?
- **Notas**: Animação automática para ataques corpo-a-corpo

#### Melee Multi Target
- **Descrição**: Permite auto sequence para ações físicas multi-alvo?
- **Notas**: Animação automática para ataques em área

### Quality of Life

#### Auto Notetag
- **Descrição**: Automaticamente aplica efeito <Custom Action Sequence> para qualquer item/skill com Common Event?
- **Notas**:
  - Itens/skills sem Common Event usam Automatic Action Sequences
  - Notetag <Auto Action Sequence> desabilita este efeito para aquela skill/item específico

### Cast Animations

#### Certain Hit
- **Descrição**: Animação de cast para skills Certain Hit
- **Notas**: ID da animação

#### Physical
- **Descrição**: Animação de cast para skills Physical
- **Notas**: ID da animação

#### Magical
- **Descrição**: Animação de cast para skills Magical
- **Notas**: ID da animação

### Counter/Reflect

#### Counter Back
- **Descrição**: Repete animação de ataque usada?
- **Notas**: Mostra animação original

#### Reflect Animation
- **Descrição**: Animação tocada quando ação é refletida
- **Notas**: ID da animação

#### Reflect Back
- **Descrição**: Repete animação de ataque usada?
- **Notas**: Mostra animação original

### Stepping

#### Melee Distance
- **Descrição**: Distância mínima em pixels para Movement Action Sequences
- **Notas**: Distância para movimento físico

#### Step Distance X
- **Descrição**: Distância X normal quando stepping forward
- **Notas**: Em pixels

#### Step Distance Y
- **Descrição**: Distância Y normal quando stepping forward
- **Notas**: Em pixels

#### Step Duration
- **Descrição**: Número de frames para stepping action completar
- **Notas**: 60 frames = 1 segundo

## Ver Também
- [Action Sequences](../action-sequences/) - Documentação completa de Action Sequences
- [Actor Battler Settings](./actor-battler-settings.md) - Configurações de movimento de battlers
- [Notetags - Action Sequence](../notetags/action-sequence.md) - Notetags para sequências customizadas
