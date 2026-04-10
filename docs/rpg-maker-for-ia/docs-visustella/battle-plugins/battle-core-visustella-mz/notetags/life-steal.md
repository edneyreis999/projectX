# Life Steal - Notetags

## Visão Geral
Estas notetags permitem implementar Life Steal mechanics, onde o user pode recuperar HP/MP baseado no damage causado. **Importante**: Life Steal é um mecanico diferente de HP Drain/MP Drain.

## Lista de Notetags

### <HP Life Steal: x%>
### <MP Life Steal: x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Causa que esta skill/item tenha Life Steal properties, permitindo que o user tome x% do HP/MP Damage como recovered HP/MP
- **Parâmetros**:
  - `x`: número representando a porcentagem do dealt damage usada como HP/MP recovery
- **Notas**:
  - **HP Life Steal** pode apenas take HP de dealt HP damage
  - **MP Life Steal** pode apenas take MP de dealt MP damage
  - Isto **NÃO** pode ser usado com skills/items com HP Drain/MP Drain. Life Steal é um mecanico diferente

### <HP Life Steal Certain Hit: +x%>
### <HP Life Steal Physical Hit: +x%>
### <HP Life Steal Magical Hit: +x%>
### <HP Life Steal Certain Hit: -x%>
### <HP Life Steal Physical Hit: -x%>
### <HP Life Steal Magical Hit: -x%>

### <MP Life Steal Certain Hit: +x%>
### <MP Life Steal Physical Hit: +x%>
### <MP Life Steal Magical Hit: +x%>
### <MP Life Steal Certain Hit: -x%>
### <MP Life Steal Physical Hit: -x%>
### <MP Life Steal Magical Hit: -x%>
- **Used for**: Actor, Class, Armor, Enemy, State Notetags
- **Descrição**: O related battler's various trait properties podem ter passive life steal properties que irão trigger upon usar skills/items com matching hit types
- **Parâmetros**:
  - `x`: número representando a additive stacking percentage boost do dealt damage usada como HP/MP recovery
- **Variações de Hit Type**:
  - **Certain Hit**: Apenas trigger de "Certain Hit" skill e item types
  - **Physical Hit**: Apenas trigger de "Physical" skill e item types
  - **Magical Hit**: Apenas trigger de "Magical" skill e item types
- **Notas**:
  - Os efeitos irão stack additively com outros trait objects
  - Isto **NÃO** pode ser usado com skills/items com HP Drain/MP Drain. Life Steal é um mecanico diferente

### <Cancel Life Steal>
### <Cancel HP Life Steal>
### <Cancel MP Life Steal>
- **Used for**: Skill, Item Notetags
- **Descrição**: Previne que esta skill permita Life Steal effects de ocorrerem, incluindo os passive life steal calculators do skill/item user
- **Notas**: Isto não afeta HP Drain/MP Drain. Life Steal é um mecanico diferente

### <Guard Life Steal>
### <Guard HP Life Steal>
### <Guard MP Life Steal>
- **Used for**: Actor, Class, Armor, Enemy, State Notetags
- **Descrição**: Se o related battler becomes o target de Life Steal, isto irá prevenir os Life Steal effects de taking effect
- **Notas**: Isto não afeta HP Drain/MP Drain. Life Steal é um mecanico diferente

### <Disarm Life Steal>
### <Disarm HP Life Steal>
### <Disarm MP Life Steal>
- **Used for**: Actor, Class, Armor, Enemy, State Notetags
- **Descrição**: Faz o related battler unable para HP/MP Life Steal independentemente da skill/item e seus related properties como equipment
- **Notas**:
  - Isto não previne skills/items com innate Life Steal de serem usados. Apenas o Life Steal part da skill/item terá no effect
  - Isto não afeta HP Drain/MP Drain. Life Steal é um mecanico diferente

### <Negative Life Steal>
### <Negative HP Life Steal>
### <Negative MP Life Steal>
- **Used for**: Actor, Class, Armor, Enemy, State Notetags
- **Descrição**: Se o related battler becomes o target de Life Steal, isto irá inverter as healing properties de Life Steal, causando que o Life Steal user instead tome HP/MP damage
- **Notas**:
  - Isto **NÃO** heal o target related battler
  - Isto não previne skills/items com innate Life Steal de serem usados. Apenas o Life Steal part da skill/item terá no effect
  - Isto não afeta HP Drain/MP Drain. Life Steal é um mecanico diferente

## Ver Também

- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
- [Referência: Glossário](../referencia/glossario.md) - Definição de Life Steal
