# Enemy - Notetags

## Visão Geral
Estas notetags controlam aspectos específicos de enemies na batalha, incluindo movimento, randomização, appearance, e JavaScript code execution em momentos específicos.

## Lista de Notetags

### <Battler Sprite Cannot Move>
- **Used for**: Enemy Notetags
- **Descrição**: Previne que o enemy seja capaz de move, jump, e/ou float devido a Action Sequences
- **Uso**: Useful para rooted enemies

### <Battler Sprite Grounded>
- **Used for**: Enemy Notetags
- **Descrição**: Previne que o enemy seja capaz de jumping e/ou floating devido a Action Sequences mas ainda able para move
- **Uso**: Useful para rooted enemies

### <Swap Enemies>
- **Used for**: Enemy Notetags
- **Descrição**: Causa que este enemy database object funcione como um randomizer para qualquer um dos listed enemies dentro da notetag
- **Sintaxe**:
```
<Swap Enemies>
 name: weight
 name: weight
 name: weight
</Swap Enemies>
```
- **Parâmetros**:
  - `name`: database enemy name do enemy que você deseja replace o enemy com
  - `weight`: valor numérico representando quantas vezes o 'name' virá (opcional, omita colon para usar apenas name)
- **Notas**:
  - Quando o enemy é loaded na battle scene, o enemy é immediately replaced com um dos enemies listed
  - A randomization é baseada no 'weight' dado para cada um dos enemy 'names'
  - Add/remove lines como você see fit

**Exemplo**:
```
<Swap Enemies>
 Bat: 50
 Slime: 25
 Orc
 Minotaur
</Swap Enemies>
```

## Enemy Aspect (Appearance)

### <Aspect Name: name>
- **Used for**: Enemy Notetags
- **Descrição**: Changes enemy's aspect name shown no In-Battle Status e outros supported plugin menus
- **Parâmetros**:
  - `name`: texto para como enemy aspect deveria ser renamed
- **Notas**: Requires <Aspect Description> para show

### <Aspect Color: color>
- **Used for**: Enemy Notetags
- **Descrição**: Changes enemy's aspect name color shown no In-Battle Status e outros supported plugin menus
- **Parâmetros**:
  - `color`: número de 0 a 31 representando a text color ou formato '#rrggbb' para custom pick um hex color
- **Notas**: Requires <Aspect Description> para show

### <Aspect Icon: x>
- **Used for**: Enemy Notetags
- **Descrição**: Changes enemy's aspect icon shown no In-Battle Status e outros supported plugin menus
- **Parâmetros**:
  - `x`: número representando o icon index usado para representar o enemy aspect
- **Notas**: Requires <Aspect Description> para show

### <Aspect Description>
- **Used for**: Enemy Notetags
- **Descrição**: Changes enemy's aspect description shown no In-Battle Status e outros supported plugin menus
- **Sintaxe**:
```
<Aspect Description>
 text
 text
</Aspect Description>
```
- **Parâmetros**:
  - `text`: texto que você gostaria que apareça como description para o enemy's aspect

## JavaScript Notetags: Mechanics-Related

Estas JavaScript notetags permitem rodar code em specific instances durante battle provided que a unit tenha aquele code associado com eles em um trait object (actor, class, weapon, armor, enemy, ou state).

### Battle Lifecycle

### <JS Pre-Start Battle>
### <JS Post-Start Battle>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no start de battle aimed na function: BattleManager.startBattle()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### <JS Pre-Start Turn>
### <JS Post-Start Turn>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no start de um turn aimed na function: BattleManager.startTurn()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### <JS Pre-Start Action>
### <JS Post-Start Action>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no start de uma action aimed na function: BattleManager.startAction()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run
  - Se usado em skills e/ou items, isto apenas aplica para a skill/item being usada

### <JS Pre-End Action>
### <JS Post-End Action>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no end de uma action aimed na function: BattleManager.endAction()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### <JS Pre-End Turn>
### <JS Post-End Turn>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no end de um turn aimed na function: Game_Battler.prototype.onTurnEnd()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### <JS Pre-End Battle>
### <JS Post-End Battle>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando a battle é over aimed na function: BattleManager.endBattle()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### Action Apply & Damage

### <JS Pre-Apply>
### <JS Post-Apply>
- **Used for**: Skill, Item Notetags
- **Descrição**: Runs JavaScript code no start/end de uma action hit aimed na function: Game_Action.prototype.apply()
- **Variáveis**:
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### <JS Pre-Apply as User>
### <JS Pre-Apply as Target>
### <JS Post-Apply as User>
### <JS Post-Apply as Target>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code no start/end de uma action hit aimed na function: Game_Action.prototype.apply()
- **Variáveis**:
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**:
  - 'as User': code run como response à action do action user end
  - 'as Target': code run como response à action do action target end
  - Se usado em trait objects, aplica para qualquer skills/items usados

### <JS Pre-Damage>
### <JS Post-Damage>
- **Used for**: Skill, Item Notetags
- **Descrição**: Runs JavaScript code antes/depois que damage é dealt aimed na function: Game_Action.prototype.executeDamage()
- **Variáveis**:
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
  - `value`: damage being calculated (Pre) ou damage/healing dealt (Post)
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run
  - Changes para 'value' em Pre refletem no damage dealt/healed

### <JS Pre-Damage as User>
### <JS Pre-Damage as Target>
### <JS Post-Damage as User>
### <JS Post-Damage as Target>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code antes/depois que damage é dealt aimed na function: Game_Action.prototype.executeDamage()
- **Variáveis**:
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
  - `value`: damage being calculated (Pre) ou damage/healing dealt (Post)
- **Notas**:
  - 'as User': code run como response à action do action user end
  - 'as Target': code run como response à action do action target end

### Regeneration

### <JS Pre-Regenerate>
### <JS Post-Regenerate>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando uma unit regenerates HP/MP aimed na function: Game_Battler.prototype.regenerateAll()
- **Variáveis**:
  - `user`: aquele affected pelo trait object
- **Notas**:
  - 'Pre' runs antes da function run
  - 'Post' runs depois da function run

### Battle Outcomes

### <JS Battle Victory>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando uma battle é won aimed na function: BattleManager.processVictory()
- **Variáveis**:
  - `user`: aquele affected pelo trait object

### <JS Escape Success>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando escaping succeeds aimed na function: BattleManager.onEscapeSuccess()
- **Variáveis**:
  - `user`: aquele affected pelo trait object

### <JS Escape Failure>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando escaping fails aimed na function: BattleManager.onEscapeFailure()
- **Variáveis**:
  - `user`: aquele affected pelo trait object

### <JS Battle Defeat>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Runs JavaScript code quando uma battle é lost aimed na function: BattleManager.processDefeat()
- **Variáveis**:
  - `user`: aquele affected pelo trait object

## Ver Também

- [Action Sequences](../action-sequences/) - Documentação de Action Sequences
- [Parâmetros: Enemy Battler Settings](../parametros/enemy-battler-settings.md) - Configurações de Enemy Battler
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
