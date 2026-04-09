# VisuStella MZ Battle Core Documentation

## Overview

The Battle Core plugin is a Tier 1 plugin for RPG Maker MZ that revamps the battle engine to provide more flexibility, streamlined mechanics, and support for advanced features. It serves as the foundation for the VisuStella MZ battle system.

## Key Features

- **Action Sequences**: Full control over skill/item execution with plugin commands
- **Animated Sideview Battlers**: Enemy support for sideview actor sprites
- **Auto Battle System**: Party-wide and actor-specific auto battle options
- **Base Troop Events**: Streamlined event system for all troops
- **Battle Commands**: Customizable command appearance for actors
- **Battle Layouts**: Multiple visual styles for battle scenes
- **Casting Animations**: Visual feedback for skill casting
- **Critical Hits**: Customizable rate formulas and damage multipliers
- **Custom Target Scopes**: Extended targeting options for skills/items
- **Damage Styles**: Multiple damage calculation formulas
- **Damage Caps**: Hard and soft damage limiting
- **Damage Traits**: Armor penetration/reduction mechanics
- **Visual HP Gauges**: Display above battlers with unlock conditions

## Documentation Structure

### Getting Started
- [Introduction](./getting-started/introduction.md) - Plugin overview and features
- [Requirements](./getting-started/requirements.md) - Tier system and dependencies
- [Major Changes](./getting-started/major-changes.md) - Core engine modifications

### Reference
- [Damage Styles](./reference/damage-styles.md) - Damage calculation systems
- [Notetags](./reference/notetags.md) - All notetag categories
  - [HP Gauge Notetags](./reference/notetags/hp-gauge.md)
  - [Animation Notetags](./reference/notetags/animation.md)
  - [Battleback Notetags](./reference/notetags/battleback.md)
  - [Battle Command Notetags](./reference/notetags/battle-command.md)
  - [Targeting Notetags](./reference/notetags/targeting.md)
  - [Damage Notetags](./reference/notetags/damage.md)
  - [Critical Notetags](./reference/notetags/critical.md)
  - [Life Steal Notetags](./reference/notetags/life-steal.md)
  - [Action Sequence Notetags](./reference/notetags/action-sequence.md)
  - [Animated Sideview Battler Notetags](./reference/notetags/animated-sideview.md)
  - [Enemy Notetags](./reference/notetags/enemy.md)
  - [Battle Layout Notetags](./reference/notetags/battle-layout.md)
  - [Troop Size/Comment Tags](./reference/notetags/troop.md)

### Action Sequences
- [Overview](./action-sequences/overview.md) - Action sequence system
- [Action Sets](./action-sequences/action-sets.md) - Action sequence lists
- [Angle Commands](./action-sequences/angle.md) - Rotation control
- [Animation Commands](./action-sequences/animations.md) - Animation control
- [Battle Log Commands](./action-sequences/battle-log.md) - Log display
- [Camera Commands](./action-sequences/camera.md) - Camera control
- [Cutin Commands](./action-sequences/cutins.md) - Cutin effects
- [Dragonbones Commands](./action-sequences/dragonbones.md) - Dragonbones support
- [Element Commands](./action-sequences/elements.md) - Element effects
- [Grid Commands](./action-sequences/grid.md) - Grid positioning
- [Horror Effects](./action-sequences/horror.md) - Horror-style effects
- [Impact Commands](./action-sequences/impact.md) - Impact effects
- [Inject Commands](./action-sequences/inject.md) - Code injection
- [Mechanics Commands](./action-sequences/mechanics.md) - Core mechanics
- [Motion Commands](./action-sequences/motion.md) - Motion control
- [Movement Commands](./action-sequences/movement.md) - Position control
- [Projectile Commands](./action-sequences/projectiles.md) - Projectile system
- [Skew Commands](./action-sequences/skew.md) - Skew effects
- [Target Commands](./action-sequences/target.md) - Target management
- [Weapon Commands](./action-sequences/weapon.md) - Weapon control
- [Zoom Commands](./action-sequences/zoom.md) - Zoom control

### Plugin Parameters
- [Auto Battle Settings](./plugin-parameters/auto-battle.md)
- [Damage Settings](./plugin-parameters/damage.md)
- [Mechanics Settings](./plugin-parameters/mechanics.md)
- [Battle Layout Settings](./plugin-parameters/battle-layout.md)
- [Battle Log Settings](./plugin-parameters/battle-log.md)
- [Battleback Scaling Settings](./plugin-parameters/battleback-scaling.md)
- [Party Command Window](./plugin-parameters/party-command.md)
- [Actor Command Window](./plugin-parameters/actor-command.md)
- [In-Battle Status Window](./plugin-parameters/status-window.md)
- [Multi-Target Windows](./plugin-parameters/multi-target.md)
- [Damage Combo Window](./plugin-parameters/damage-combo.md)
- [Actor Battler Settings](./plugin-parameters/actor-battler.md)
- [Enemy Battler Settings](./plugin-parameters/enemy-battler.md)
- [HP Gauge Settings](./plugin-parameters/hp-gauge.md)
- [Action Sequence Settings](./plugin-parameters/action-sequence.md)

### Guides
- [JavaScript Notetags](./guides/javascript-notetags.md) - JS notetag patterns
- [Target Scopes](./guides/target-scopes.md) - Custom targeting guide

## Recommended Reading Path

1. **First Time Users**: Start with Introduction → Requirements → Major Changes
2. **Plugin Setup**: Read Plugin Parameters in order
3. **Notetag Usage**: Reference → Notetags → specific category
4. **Action Sequences**: Overview → specific command category
5. **Advanced Features**: JavaScript Notetags → Target Scopes

## Version Information

- **Plugin Version**: 1.85
- **Tier**: 1 (Place after CoreEngine)
- **Target**: RPG Maker MZ only

## See Also

- [VisuStella MZ Core Engine](../../) - Required base plugin
- [Action Sequence Pack plugins](../) - Extended action sequence commands
- [Elements & Status Menu Core](../) - Trait integration
