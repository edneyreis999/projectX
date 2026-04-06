# VisuStella MZ - Battle Core

## Overview
Plugin Tier 1. Revamped battle engine with custom Action Sequences, battle layouts, and enhanced mechanics.

## Key Changes from Default MZ
- **Action Speed**: Random variance disabled by default
- **Damage Popups**: Show both HP and MP changes simultaneously
- **Dual Wield**: Each weapon attacks individually (not combined)
- **Critical Hit**: Multiplier reduced from x3 to x2, LUK affects rate/damage

## Scopes (Scope IDs)
```
0: No Target       | 1: 1 Foe          | 2: All Foes
3: Random Foe      | 4-6: 2-4 Random Foes
7: 1 Ally          | 8: Alive Allies   | 9: Dead Ally
10: Dead Allies    | 11: User          | 12: Any Ally
13: All Allies     | 14: Everybody     | 15-16: 1-2 Random Allies
```

## JavaScript Notetags

### JS Pre/Post-Damage (CORRECTED)

#### For Skills/Items:
```
<JS Pre-Damage>
  // 'this' = Game_Action
  // user = this.subject()
  // target = arguments[1] or this.subject().currentAction().targetsAnimation()[0]
  // value = damage calculated so far
</JS Pre-Damage>

<JS Post-Damage>
  // Same context as Pre-Damage
  // value = damage/healing actually dealt
</JS Post-Damage>
```

#### For Actor, Class, Weapon, Armor, Enemy, State:
```
<JS Pre-Damage as User>
  // Executed from attacker's perspective
  // 'this' = Game_Action (NOT the battler!)
  // user = attacker (this.subject())
  // target = defender
  // value = damage calculated
</JS Pre-Damage as User>

<JS Pre-Damage as Target>
  // Executed from defender's perspective
  // 'this' = Game_Action (NOT the battler!)
  // user = attacker
  // target = defender (but 'this' is still Game_Action)
  // value = damage calculated
</JS Pre-Damage as Target>

<JS Post-Damage as User>
  // Same as Pre-Damage as User, but after damage
</JS Post-Damage as User>

<JS Post-Damage as Target>
  // Same as Pre-Damage as Target, but after damage
</JS Post-Damage as Target>
```

#### IMPORTANT Context Notes (Discovered 2026-04-06):
- **In "as Target" variants, `this` is Game_Action, NOT the target battler**
- **The `target` variable is the defender battler**
- **The `user` variable is the attacker battler**
- **Default template (from plugin params):**
```javascript
const value = arguments[0];
const target = arguments[1];
const user = this.subject();
const a = user;
const b = target;
const action = this;
const item = this.item();
const skill = this.item();
```

#### Debugging Example (Enemy notetag):
```
<JS Post-Damage as Target>
// Find the target battler (since 'this' is Game_Action)
const boss = $gameTroop.members().find(m => m.name() === 'Pestesporo');
if (boss) {
  console.log('Boss HP:', boss.hp, '/', boss.mhp);
  console.log('Element Rate (10):', boss.elementRate(10));
}
</JS Post-Damage as Target>
```

### JS Pre/Post-Apply
Target: `Game_Action.prototype.apply()`

```
<JS Pre-Apply>
  // Runs before action.apply()
  // this = Game_Action
  // user = this.subject()
  // target = arguments[1]
</JS Pre-Apply>

<JS Post-Apply>
  // Runs after action.apply()
  // Same context as Pre-Apply
</JS Post-Apply>
```

### JS Post-Start Battle / JS Pre-End Battle
Target: BattleManager start/end functions

### Auto Skill Triggers (requires AutoSkillTriggers plugin)
```
<Auto Trigger: Death>
  // Triggers when battler dies
</Auto Trigger: Death>

<Auto Trigger: HP% x%>
  // Triggers when HP drops below x%
</Auto Trigger: HP% x%>
```

## Element Absorption (requires ElementStatusCore plugin)

### CRITICAL: Use JS Version for Enemies

**⚠️ BUG DISCOVERED (2026-04-06):** The normal `<Force Received Element>` NOTETAG does NOT work for **Enemies**. Use the **JS version** instead:

```
<JS Force Received Element 10 Rate: -1.0>
  // -1.0 = 100% absorption (healing)
  // -0.5 = 50% absorption
  // 10 = Element ID (Veneno)
</JS Force Received Element 10 Rate: -1.0>
```

### For Actors (works with normal version):
```
<Force Received Element id Rate: -1.0>
  // Negative rate = absorption (healing)
</Force Received Element id Rate: -1.0>

<Received Element id Rate: -0.5>
  // Same but applies multiplicatively after other modifiers
</Received Element id Rate: -0.5>
```

**IMPORTANT:**
1. ElementStatusCore must be loaded BEFORE BattleCore in plugin order
2. For **Enemies**, always use `<JS Force Received Element>` instead of `<Force Received Element>`
3. The JS version is evaluated dynamically and overrides other calculations

## Action Sequences
Custom action sequences using `<Custom Action Sequence>` notetag or plugin commands.

## Battle Layout Styles
- **Default**: Actor faces in battle status
- **List**: Compact list view
- **XP Style**: RPG Maker XP style layout

## Troubleshooting
- **Element absorption not working**: Check ElementStatusCore is ON and loaded before BattleCore
- **JS notetags not executing**: Check plugin order, verify syntax with console.log()
- **Wrong damage calculations**: Check Action Sequence execution order
