# Targeting - Notetags

## Visão Geral
Estas notetags estão relacionadas ao aspecto de targeting de skills e items, podendo ajustar o scope de como certas skills/items funcionam.

## Lista de Notetags

### <Always Hit>
- **Used for**: Skill, Item Notetags
- **Descrição**: Causa que a action sempre hit

### <Always Hit Rate: x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Causa que a action sempre tenha um hit rate de exatamente x%
- **Parâmetros**:
  - `x`: valor numérico representando a hit success percentage

### <Repeat Hits: x>
- **Used for**: Skill, Item Notetags
- **Descrição**: Changes o número de hits que a action irá produzir
- **Parâmetros**:
  - `x`: valor numérico representando o número de hits a incur

### <Target: x Random Any>
- **Used for**: Skill, Item Notetags
- **Descrição**: Faz a skill pick 'x' random targets quando usada. Targets podem ser tanto actors quanto enemies
- **Parâmetros**:
  - `x`: valor numérico representando o número de random targets
- **Notas**:
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste

### <Target: x Random Enemies>
- **Used for**: Skill, Item Notetags
- **Descrição**: Faz a skill pick 'x' random targets quando usada
- **Parâmetros**:
  - `x`: valor numérico representando o número de random targets
- **Notas**:
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste
  - Targets são apenas enemies

### <Target: x Random Allies>
- **Used for**: Skill, Item Notetags
- **Descrição**: Faz a skill pick 'x' random targets quando usada
- **Parâmetros**:
  - `x`: valor numérico representando o número de random targets
- **Notas**:
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste
  - Targets são apenas actors

### <Target: All Allies But User>
- **Used for**: Skill, Item Notetags
- **Descrição**: Targets todos allies com a exceção do user
- **Notas**:
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste

### <Target: Ally or Enemy>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite que o player target allies ou enemies com a skill/item
- **Notas**:
  - **Importante**: Isto **NÃO** permite selecionar dead party members
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste
  - Target selection emphasis irá para allies first
  - Ignored quando usado por enemies e será treated como um ally scope
  - Auto-battle actors também irão treat esta action como um ally scope
  - Para certos battle layouts em frontview, isto irá abrir o Actor Select window para que Touch Input possa selecionar actors

### <Target: Enemy or Ally>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite que o player target enemies ou allies com a skill/item
- **Notas**:
  - **Importante**: Isto **NÃO** permite selecionar dead party members
  - Isto irá overwrite o existing database scope e ignore o database's existing scope em favor deste
  - Target selection emphasis irá para enemies first
  - Ignored quando usado por enemies e será treated como um enemy scope
  - Auto-battle actors também irão treat esta action como um enemy scope
  - Para certos battle layouts em frontview, isto irá abrir o Actor Select window para que Touch Input possa selecionar actors

### <Single or Multiple Select>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite que a skill/item possa selecionar either single targets ou multiple targets de uma vez
- **Notas**:
  - Requires um original scope que possa selecionar individual targets
  - **Para selecionar "all enemies"**: o player deve pressionar o "Page Up" keyboard button ou o visual on screen "All Enemies" button
  - **Para selecionar "all allies"**: o player deve pressionar o "Page Down" keyboard button ou o visual on screen "All Allies" button
  - Isto **NÃO** pode ser usado com single dead ally scopes
  - Se houver um enemy com Taunt ou Provoke, a opção de selecionar "All Enemies" não se torna possível
  - **Enemy AI e Auto-Battle actor AI NÃO farão uso da habilidade** de toggle entre single e multiple target scopes. Eles apenas usarão as single target versions destas skills

### <Disperse Damage>
- **Used for**: Skill, Item Notetags
- **Descrição**: Causa que qualquer damage dealt por esta skill seja split igualmente entre all targets da skill incluindo repeats
- **Notas**:
  - Para basic attacks, qualquer damage reduction added attack trait totals será reverted
  - Isto **NÃO** precisa ser usado com <Single or Multiple Select> notetag e pode ser usado por si só para um "All" scope
  - Faz a skill/item deal less damage se houver mais enemies e more damage se houver less enemies

### <Cannot Target User>
- **Used for**: Skill, Item Notetags
- **Descrição**: Causa que a action seja unable to selecionar o user como target
- **Notas**:
  - Isto não é um targeting scope. Ao invés disso, é usado em addition a qualquer outros targeting scopes
  - Quando usado com "All" scopes, o user é removed do target pool
  - Isto também é applied outside of battle
  - Se o user somehow enters o target pool, o user é then replaced por um random ally found na party

## JavaScript Notetags

### <JS Accuracy>
- **Used for**: Skill, Item Notetags
- **Descrição**: Apenas aplica durante battle. Permite determinar a accuracy hit success rate através de JavaScript code
- **Sintaxe**:
```
<JS Accuracy>
 code
 code
 rate = code;
</JS Accuracy>
```
- **Variáveis**:
  - `rate`: variable final retornada para determinar a accuracy hit success rate
    - Base value vem de Game_Action.itemHit
    - Skill/Item <JS Accuracy> runs
    - Then <JS Accuracy as User/Target> notetags run
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**:
  - Replace `code` com JavaScript code para determinar o final `rate`
  - Works best com VisuMZ Core Engine's "Improved Accuracy" QoL formula para consolidate ambos HIT e EVA

### <JS Accuracy as User>
### <JS Accuracy as Target>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Apenas aplica durante battle. Permite determinar a accuracy hit success rate através de JavaScript code
- **Sintaxe**:
```
<JS Accuracy as User>
 code
 code
 rate = code;
</JS Accuracy as User>

<JS Accuracy as Target>
 code
 code
 rate = code;
</JS Accuracy as Target>
```
- **Variáveis**:
  - `rate`: variable final retornada para determinar a accuracy hit success rate
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**:
  - Se usado em trait objects, isto irá aplicar para qualquer skills/items usados enquanto a unit affected pelo trait object tiver access ao trait object
  - Se a variante 'as User' é usada, este code será run como uma response à action do action user end
  - Se a variante 'as Target' é usada, este code será run como uma response à action do action target end
  - Replace `code` com JavaScript code para run desired effects

### <JS Targets>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite determinar os targets da action através de JavaScript code
- **Sintaxe**:
```
<JS Targets>
 code
 code
 targets = [code];
</JS Targets>
```
- **Variáveis**:
  - `targets`: array que é retornado para ser usado como container para todos os valid action targets
    - Isto **NÃO** é usado para filtering out quem o player pode ou não pode selecionar
    - Isto determina um final result
    - A variable `targets` irá incluir o original set de targets determinado pelo skill/item's original scale
    - Se você desejar clear it out, simplesmente faça `targets = []` primeiro
- **Notas**: Replace `code` com JavaScript code para determinar valid targets

## Ver Também

- [Action Sequences: Targets](../action-sequences/targets.md) - Comandos de Action Sequence para targeting
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
