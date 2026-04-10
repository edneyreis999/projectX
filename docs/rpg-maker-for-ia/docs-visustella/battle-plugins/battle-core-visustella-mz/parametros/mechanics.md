# Mechanics Settings - Plugin Parameters

## Visão Geral
Alguns dos base settings para os vários mechanics encontrados no battle system podem ser alterados aqui. A maioria destes envolve JavaScript code e requer que você tenha um bom entendimento de como o RPG Maker MZ code funciona antes de tampering com ele.

## Parâmetros

### Action Speed

#### Allow Random Speed?
- **Descrição**: Allow speed para ser randomized base off o user's AGI?

#### Turn End Buffs Expire?
- **Descrição**: Normally, buffs expire após all actions end. Mas aqui, você pode ter buffs expire em turn end

#### JS: Calculate
- **Descrição**: Code usado para calculate action speed

### Base Troop

#### Base Troop ID's
- **Descrição**: Select o Troop ID(s) para duplicate page events de para todos outros troops
- **Notas**: Mais informações podem ser encontradas na dedicated Help section acima

### Common Events (on Map)

#### Pre-Battle Event
#### Post-Battle Event
#### Victory Event
#### Defeat Event
#### Escape Success Event
#### Escape Fail Event
- **Descrição**: Queued Common Event para run upon meeting a condition
- **Notas**:
  - Use 0 para not run qualquer Common Event
  - "Post-Battle Event" irá sempre run regardless
  - Se qualquer events estão running antes da battle, eles irão continue running para o end first antes que os queued Common Events irão run
  - Estes common events apenas run no map scene. Eles não são meant para run no battle scene
  - Se o "Defeat Event" tem um common event attached, então random encounters serão changed para allow defeat sem serem sentos para o Game Over scene. Instead, o game irá send o player para o map scene onde o Defeat Event irá run

### Escape

#### JS: Calc Escape Ratio
- **Descrição**: Code usado para calculate o escape success ratio

#### JS: Calc Escape Raise
- **Descrição**: Code usado para calculate quanto o escape success ratio raises upon cada failure

### Switches

#### Switch: Critical
- **Descrição**: Turns switch ON se a action performs um critical hit
- **Notas**:
  - Switch reverts para OFF sempre que uma action starts
  - Se multiple targets/hits são struck, enquanto um hit lands um critical hit, então o switch irá remain ON para o rest da action

#### Switch: Miss/Evade
- **Descrição**: Turns switch ON se a action misses/is evaded
- **Notas**:
  - Switch reverts para OFF sempre que uma action starts
  - Se multiple targets/hits são struck, enquanto um hit fails para land, então o switch irá remain ON para o rest da action

### Variables

#### Variable: Damage
- **Descrição**: Variable records target damage durante action
- **Notas**:
  - Variable reverts para 0 sempre que uma action starts
  - Se multiple targets/hits são struck, a variable irá record o total amount de damage done para o remainder da action (a menos que manually reseting para 0 durante uma Action Sequence)

#### Variable: Healing
- **Descrição**: Variable records target healing durante action
- **Notas**:
  - Variable reverts para 0 sempre que uma action starts
  - Se multiple targets/hits são struck, a variable irá record o total amount de healing done para o remainder da action (a menos que manually reseting para 0 durante uma Action Sequence)

### JS: Battle-Related

#### JS: Pre-Start Battle / JS: Post-Start Battle
- **Descrição**: Target function: BattleManager.startBattle()
- **Notas**: JavaScript code occurs before/after function é run

#### JS: Battle Victory
- **Descrição**: Target function: BattleManager.processVictory()
- **Notas**: JavaScript code occurs before function é run

#### JS: Escape Success
- **Descrição**: Target function: BattleManager.onEscapeSuccess()
- **Notas**: JavaScript code occurs before function é run

#### JS: Escape Failure
- **Descrição**: Target function: BattleManager.onEscapeFailure()
- **Notas**: JavaScript code occurs before function é run

#### JS: Battle Defeat
- **Descrição**: Target function: BattleManager.processDefeat()
- **Notas**: JavaScript code occurs before function é run

#### JS: Pre-End Battle / JS: Post-End Battle
- **Descrição**: Target function: BattleManager.endBattle()
- **Notas**: JavaScript code occurs before/after function é run

### JS: Turn-Related

#### JS: Pre-Start Turn / JS: Post-Start Turn
- **Descrição**: Target function: BattleManager.startTurn()
- **Notas**: JavaScript code occurs before/after function é run

#### JS: Pre-End Turn / JS: Post-End Turn
- **Descrição**: Target function: Game_Battler.prototype.onTurnEnd()
- **Notas**: JavaScript code occurs before/after function é run

#### JS: Pre-Regenerate / JS: Post-Regenerate
- **Descrição**: Target function: Game_Battler.prototype.regenerateAll()
- **Notas**: JavaScript code occurs before/after function é run

### JS: Action-Related

#### JS: Pre-Start Action / JS: Post-Start Action
- **Descrição**: Target function: BattleManager.startAction()
- **Notas**: JavaScript code occurs before/after function é run

#### JS: Pre-Apply
- **Descrição**: Target function: Game_Action.prototype.apply()
- **Notas**: JavaScript code occurs before function é run

#### JS: Pre-Damage / JS: Post-Damage
- **Descrição**: Target function: Game_Action.prototype.executeDamage()
- **Notas**: JavaScript code occurs before/after function é run

#### JS: Post-Apply
- **Descrição**: Target function: Game_Action.prototype.apply()
- **Notas**: JavaScript code occurs after function é run

#### JS: Pre-End Action / JS: Post-End Action
- **Descrição**: Target function: BattleManager.endAction()
- **Notas**: JavaScript code occurs before/after function é run

## Ver Também

- [Conceitos: Base Troops](../conceitos/base-troops.md) - Sistema de Base Troops
- [Notetags: Mechanics](../notetags/mechanics.md) - JavaScript notetags para mechanics
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
