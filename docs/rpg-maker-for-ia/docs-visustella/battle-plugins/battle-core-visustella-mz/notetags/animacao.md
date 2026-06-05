# Animation - Notetags

## Visão Geral
Estas notetags permitem configurar animações para serem reproduzidas em determinadas instâncias e/ou condições durante a batalha.

## Lista de Notetags

### <Slip Animation: x>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Requisitos**: Requires VisuMZ_0_CoreEngine!
- **Descrição**: Durante a fase em que o user regenera HP, MP ou TP, esta animation será reproduzida enquanto o user estiver alive e visible
- **Parâmetros**:
  - `x`: valor numérico representando o Animation ID a ser reproduzido

### <Cast Animation: x>
- **Used for**: Skill Notetags
- **Descrição**: Reproduz uma battle animation no início da skill
- **Parâmetros**:
  - `x`: valor numérico representando o Animation ID a ser reproduzido

### <Attack Animation: x>
- **Used for**: Enemy Notetags
- **Descrição**: Atribui ao enemy uma attack animation para ser reproduzida em seu basic attack
- **Parâmetros**:
  - `x`: valor numérico representando o Animation ID a ser reproduzido

## Ver Também

- [Action Sequences: Animations](../action-sequences/animacoes.md) - Comandos de Action Sequence para animações
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
