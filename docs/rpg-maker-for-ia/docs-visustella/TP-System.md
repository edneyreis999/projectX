============================================================================
Introduction
============================================================================

The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
hardcoded in giving RPG Maker MZ users very little control over how much TP
gain a battler can receive from particular actions and situations. This
plugin gives you the ability to adjust how much TP battlers will acquire
various actions, different TP modes, and letting players selecting and pick
what TP mode they want for each actor.

Features include all (but not limited to) the following:

* TP Modes that allow actors and enemies to have different ways of
  generating TP through battle.
* 30 pre-made TP Modes for you to use and/or learn from.
* Functionality for skills and items to change a target's TP Mode.
* The ability to teach actors new TP modes upon learning new skills.
* Unlock new TP Modes from becoming the target of skills and/or items.
* Trait Objects (like states) that will enforce a specific TP Mode when
  applied.
* TP Gauge can flash a variety of colors once a certain percentile range
  has been met.
* Integrated TP Mode changer for players within Scene_Skill.

============================================================================
Requirements
============================================================================

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

============================================================================
Major Changes
============================================================================

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

MaxTP Overwrite

- There was nothing altering MaxTP before and this plugin offers TP Modes
that change up the MaxTP total. The function has been overwritten for more
plugin functionality.

---

Preserve TP

- Preserve TP function has been overwritten so it is no longer determined by
the presence of the Preserve TP trait, but instead, determined by whether or
not the current TP Mode has TP Preservation as its property. This is to keep
the consistency in the TP Modes and to give the game dev more control over
this aspect.

---

Initial TP Gain in Battle Reworked

- If 'Preserve TP' was off, battlers would normally have a random amount of
TP given to them at the start of battle by default. However, there was no
place to control this value in the RPG Maker MZ editor itself so this has
been overwritten to give you, the game dev, full control over this aspect,
and whether or not it requires the 'Preserve TP' flag or not.

---

On Damage TP Gain

- The on Damage function has been overwritten to remove the default TP gain
aspect in favor of custom TP gain aspect granted by the current equipped TP
Mode to keep functionality under control.

---

Sprite_Gauge Changes

- The sprite gauge has been changed slightly to allow for flashing gauges.
They're separated into different layers now when it comes strictly to a TP
gauge. There shouldn't be any noticeable compatibility problems with them
unless there are plugins that alter the TP gauge completely.

---

============================================================================
Notetags
============================================================================

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== General TP Mode Notetags ===

These are TP Mode-related notatags that affect both actors and enemies.

---

<TP Mode: name>

- Used for: Actor Enemy, State Notetags
- Sets the starting TP Mode for this actor/enemy to be 'name'.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.

---

<Starting TP Modes>
 name
 name
 name
 name
</Starting TP Modes>

- Used for: Actor Notetags
- Adds TP Modes to the actor's available list of TP Modes from the start.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Change Target TP Mode: name>

<Change User TP Mode: name>

- Used for: Skill, Item Notetags
- Changes the target/user's TP Mode to the target TP Mode upon using this
  item/skill.
- For <Change Target TP Mode: name>, the action must successfully hit the
  target in order for the TP Mode to change.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.

---

=== Actor-Only TP Mode Notetags ===

These are TP Mode-related notetags that only affect actors.

---

<Learn TP Mode: name>

- Used for: Skill Notetags
- Causes the target selected actor to learn the specific TP Mode when the
  skill is learned.
- Insert multiple copies of this notetag to have the skill learn more
  TP Modes for the target actor.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.
- Keep in mind that learning the skill is required for the TP Mode to be
  learned. Adding the skill through a trait will not teach the TP Mode.

---

<Learn TP Modes>
 name
 name
 name
</Learn TP Modes>

- Used for: Skill Notetags
- Causes the target selected actor to learn the specific TP Mode when the
  skill is learned.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Unlock TP Mode: name>

- Used for: Skill, Item Notetags
- Causes the target selected actor to unlock the specific TP Mode.
- Insert multiple copies of this notetag to have the item/skill unlock more
  TP Modes for the target actor.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.

---

<Unlock TP Modes>
 name
 name
 name
</Unlock TP Modes>

- Used for: Skill, Item Notetags
- Causes the target selected actor to unlock the specific TP Mode.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Force TP Mode: name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Forces the affected battler to use the specific named TP Mode in battle.
- Priority is given based the ordering of trait objects if multiple forced
  TP Mode effects are present.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
  TP Modes listing.

---

============================================================================
Plugin Commands
============================================================================

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Actor Plugin Commands ===

---

Actor: Change TP Mode
- Changes target actor(s) TP Mode.

  Actor ID(s):
  - Select which actor(s) to affect.

  TP Mode Name:
  - Change to this TP Mode for selected actor(s).

---

Actor: Unlock TP Mode
- Unlocks TP Modes for target actor(s).

  Actor ID(s):
  - Select which actor(s) to affect.

  TP Modes:
  - Change to this TP Mode for selected actor(s).

---

Actor: Unlock All TP Modes
- Unlocks all TP Modes for target actor(s).

  Actor ID(s):
  - Select which actor(s) to affect.

---

=== Enemy Plugin Commands ===

---

Enemy: Change TP Mode
- Changes target enemy(ies) TP Mode.

  Enemy Index(es):
  - Select which enemy(ies) to affect.

  TP Mode Name:
  - Change to this TP Mode for selected enemy(ies).

---

=== System Plugin Commands ===

---

System: Show/Hide TP Mode
- Shows/Hides TP Mode from Scene_Skill.

  Show TP Mode?:
  - Shows/Hides TP Mode in Scene_Skill.

---

============================================================================
Plugin Parameters: General Settings
============================================================================

These are the general settings for the Enhanced TP System plugin. These
control the default settings for TP Modes and TP Mode option appearing in
Scene_Skill for the player.

---

Defaults

  Default TP Mode:
  - Which TP mode should actors and enemies have by default?

  Global TP Modes:
  - TP Modes available to the all actors to pick from.

---

Scene_Skill

  Show TP Mode?:
  - Show TP Mode in Scene_Skill by default?

  TP Mode Command:
  - The command name format shown in Scene_Skill.
  - %1 - TP Text

  TP Mode Icon:
  - Icon used for TP Mode shown in Scene_Skill.

  Background Type:
  - Select background type for this window.
    - 0 - Window
    - 1 - Dim
    - 2 - Transparent

---

============================================================================
Plugin Parameters: TP Modes
============================================================================

TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
how TP is earned as well as the maximum TP value the actor/enemy can have.
Players can switch between TP Modes if granted the option, too.

TP Modes can be added, removed, and editted by you the game dev. Each TP
Mode will have the following Plugin Parameters for you to adjust:

---

General

  TP Mode Name:
  - The name for this TP Mode.
  - Used for notetag reference.

  Icon:
  - Icon used for this TP Mode.

  Help:
  - Help description used for this TP Mode.
  - %1 - In-game TP vocabulary.

  MaxTP Formula:
  - What's the MaxTP for this TP Mode?

  TCR Multiplier:
  - Multiplier on how much TP is earned.
  - Stacks multiplicatively with TCR.

  Preserve TP?:
  - If preserved, carry TP to the next battle.
  - If not, TP resets each battle.

---

Gauge

  Flash Gauge?:
  - Let this gauge flash once it reaches a certain percentage value.
  - Requires VisuMZ_1_SkillsStatesCore!

  Required Rate:
  - What rate does this gauge need to be over in order for it to flash?

  Flash Speed:
  - How fast should the gauge flash different colors?
  - Lower numbers are slower. Higher numbers are faster.

  Color Lightness:
  - How light should the flash color be?
  - Lower numbers are darker. Higher numbers are lighter.

  Custom Label:
  - Instead of displaying "TP", what label do you want to display here?
  - Leave empty to keep using "TP".
  - This applies to gauges only. This does NOT change the way TP costs are
    displayed in the skill windows.

  Custom Color 1:
  Custom Color 2:
  - Use #rrggbb for custom colors or regular numbers for text colors from
    the Window Skin.
  - Empty for default colors.
  - This applies to gauges only. This does NOT change the way TP costs are
    displayed in the skill windows.

---

TP Formulas > Generic

  Initial TP:
  - How much TP is gained at the start of battle?

  Critical Hit:
  - How much TP is gained when landing a critical hit?

  Evasion:
  - How much TP is gained when evading an action?

  Use Item:
  - How much TP is gained when using an item in battle?

  Use Skill:
  - How much TP is gained when using a skill in battle that isn't
    Attack or Guard?

---

TP Formulas > During Regen

  TP Regen:
  - How much TP is gained each turn during regeneration?

  Critical HP:
  - How much TP is gained when user is in critical HP (25%)
    during regeneration.

  Full HP:
  - How much TP is gained when user has full HP
    during regeneration.

  Critical MP:
  - How much TP is gained when user is in critical MP (25%)
    during regeneration.

  Full MP:
  - How much TP is gained when user has full MP
    during regeneration.

  Only Member:
  - How much TP is gained when user is the only alive party member
    during regeneration.

---

TP Formulas > HP Damage

  Take HP Damage:
  - How much TP is gained when receiving HP damage?
  - Damage value is stored in 'value' variable.

  Deal HP Damage:
  - How much TP is gained when dealing HP damage?
  - Damage value is stored in 'value' variable.

  Ally HP Damage:
  - How much TP is gained when an ally receives HP damage?
  - Damage value is stored in 'value' variable.

---

TP Formulas > HP Heal

  Take HP Heal:
  - How much TP is gained when receiving HP heals?
  - Heal value is stored in 'value' variable.

  Deal HP Heal:
  - How much TP is gained when dealing HP heals?
  - Heal value is stored in 'value' variable.

  Ally HP Heal:
  - How much TP is gained when an ally receives HP heals?
  - Damage value is stored in 'value' variable.

---

TP Formulas > MP Damage

  Take MP Damage:
  - How much TP is gained when receiving MP damage?
  - Damage value is stored in 'value' variable.

  Deal MP Damage:
  - How much TP is gained when dealing MP damage?
  - Damage value is stored in 'value' variable.

  Ally MP Damage:
  - How much TP is gained when an ally receives MP damage?
  - Damage value is stored in 'value' variable.

---

TP Formulas > MP Heal

  Take MP Heal:
  - How much TP is gained when receiving MP heals?
  - Heal value is stored in 'value' variable.

  Deal MP Heal:
  - How much TP is gained when dealing MP heals?
  - Heal value is stored in 'value' variable.

  Ally MP Heal:
  - How much TP is gained when an ally receives MP heals?
  - Damage value is stored in 'value' variable.

---

TP Formulas > Buffs

  Deal Ally Buff:
  - How much TP is gained when user inflicts a buff on an ally through an
    Item/Skill Effect (code does not count).

  Deal Enemy Buff:
  - How much TP is gained when user inflicts a buff on an enemy through an
    Item/Skill Effect (code does not count).

  Gain Ally Buff:
  - How much TP is gained when user gains a buff from an ally through an
    Item/Skill Effect (code does not count).

  Gain Enemy Buff:
  - How much TP is gained when user gains a buff from an enemy through an
    Item/Skill Effect (code does not count).

---

TP Formulas > Debuffs

  Deal Ally Debuff:
  - How much TP is gained when user inflicts a debuff on an ally through an
    Item/Skill Effect (code does not count).

  Deal Enemy Debuff:
  - How much TP is gained when user inflicts a debuff on an enemy through
    an Item/Skill Effect (code does not count).

  Gain Ally Debuff:
  - How much TP is gained when user gains a debuff from an ally through an
    Item/Skill Effect (code does not count).

  Gain Enemy Debuff:
  - How much TP is gained when user gains a debuff from an enemy through an
    Item/Skill Effect (code does not count).

---

TP Formulas > States

  Deal Ally State:
  - How much TP is gained when user inflicts a state on an ally through an
    Item/Skill Effect (code does not count).

  Deal Enemy State:
  - How much TP is gained when user inflicts a state on an enemy through an
    Item/Skill Effect (code does not count).

  Gain Ally State:
  - How much TP is gained when user gains a state from an ally through an
    Item/Skill Effect (code does not count).

  Gain Enemy State:
  - How much TP is gained when user gains a state from an enemy through an
    Item/Skill Effect (code does not count).

---

TP Formulas > Death

  Ally Death:
  - How much TP is gained when an allied member dies.
  - Does not matter who the killer is.

  Enemy Death:
  - How much TP is gained when an enemy member dies.
  - Does not matter who the killer is.

---

TP Formulas > Battle

  Win Battle:
  - How much TP is gained when the player wins a battle.

  Flee Battle:
  - How much TP is gained when the player escapes a battle.

  Lose Battle:
  - How much TP is gained when the player loses a battle.

---

============================================================================
Terms of Use
============================================================================

1. These plugins may be used in free or commercial games provided that they
have been acquired through legitimate means at VisuStella.com and/or any
other official approved VisuStella sources. Exceptions and special
circumstances that may prohibit usage will be listed on VisuStella.com.

2. All of the listed coders found in the Credits section of this plugin must
be given credit in your games or credited as a collective under the name:
"VisuStella".

3. You may edit the source code to suit your needs, so long as you do not
claim the source code belongs to you. VisuStella also does not take
responsibility for the plugin if any changes have been made to the plugin's
code, nor does VisuStella take responsibility for user-provided custom code
used for custom control effects including advanced JavaScript notetags
and/or plugin parameters that allow custom JavaScript code.

4. You may NOT redistribute these plugins nor take code from this plugin to
use as your own. These plugins and their code are only to be downloaded from
VisuStella.com and other official/approved VisuStella sources. A list of
official/approved sources can also be found on VisuStella.com.

5. VisuStella is not responsible for problems found in your game due to
unintended usage, incompatibility problems with plugins outside of the
VisuStella MZ library, plugin versions that aren't up to date, nor
responsible for the proper working of compatibility patches made by any
third parties. VisuStella is not responsible for errors caused by any
user-provided custom code used for custom control effects including advanced
JavaScript notetags and/or plugin parameters that allow JavaScript code.

6. If a compatibility patch needs to be made through a third party that is
unaffiliated with VisuStella that involves using code from the VisuStella MZ
library, contact must be made with a member from VisuStella and have it
approved. The patch would be placed on VisuStella.com as a free download
to the public. Such patches cannot be sold for monetary gain, including
commissions, crowdfunding, and/or donations.

7. If this VisuStella MZ plugin is a paid product, all project team members
must purchase their own individual copies of the paid product if they are to
use it. Usage includes working on related game mechanics, managing related
code, and/or using related Plugin Commands and features. Redistribution of
the plugin and/or its code to other members of the team is NOT allowed
unless they own the plugin itself as that conflicts with Article 4.

8. Any extensions and/or addendums made to this plugin's Terms of Use can be
found on VisuStella.com and must be followed.

============================================================================
Credits
============================================================================

If you are using this plugin, credit the following people in your game:

Team VisuStella
* Yanfly
* Arisu
* Olivia
* Irina

============================================================================
Changelog
============================================================================

Version 1.17: September 18, 2025
* Bug Fixes!
** Fixed a bug where TP was not properly preserved. Fix made by Arisu.

Version 1.16: February 20, 2025
* Compatibility Update!
** Updated for RPG Maker MZ Core Scripts 1.9.0!
*** Better compatibility with different icon sizes.

Version 1.15: August 29, 2024
* Feature Update!
** Added failsafes for Bad JavaScript TP Formulas to prevent them from
   becoming NaN values, undefined values, or null values. Bad values will
   default to 0 and an error message will appear telling which actor, mode,
   and key's formula has bad code. Update made by Arisu.

Version 1.14: September 14, 2023
* Bug Fixes!
** Fixed a bug where the icon of the TP Modes command in the Skill Scene
   would still appear even if command types are set to text only through the
   VisuStella MZ Skills & States Core plugin. Fixed by Olivia.

Version 1.13: September 29, 2022
* Optimization Update!
** Plugin should run more optimized.

Version 1.12: August 18, 2022
* Feature Update!
** Regenerate TP functions no longer occur outside of battle. Update made
   by Olivia.

Version 1.11: July 16, 2021
* Bug Fixes!
** Fixed a problem that bypassed teaching TP modes through item usage.
   Fix made by Arisu.

Version 1.10: July 9, 2021
* Bug Fixes!
** Fixed bugs regarding the TP Mode Unlock notetags not being detected
   properly. Fix made by Olivia.

Version 1.09: May 28, 2021
* Optimization Update!
** Plugin should run more optimized.

Version 1.08: May 7, 2021
* Bug Fixes!
** Normal Attack States will no longer trigger state gains if no states are
   applied. Fix made by Irina.

Version 1.07: April 23, 2021
* Bug Fixes!
** Death effects for TP should now only trigger once. Fix made by Olivia.

Version 1.06: February 12, 2021
* Feature Update!
** <Force TP Mode: name> notetag is now updated to be enforced outside of
   battle as well. Update made by Olivia.

Version 1.05: January 22, 2021
* Documentation Update!
** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
*** This applies to gauges only. This does NOT change the way TP costs are
    displayed in the skill windows.

Version 1.04: January 15, 2021
* Documentation Update!
** Help file updated for new features.
* New Feature!
** New Plugin Parameters added
*** Plugin Parameters > General Settings > Background Type

Version 1.03: December 4, 2020
* Documentation Update!
** Added documentation for new feature(s)!
* New Features!
** New plugin parameters added by Arisu:
*** Custom Label
**** Instead of displaying "TP", what label do you want to display here?
     Leave empty to keep using "TP".
*** Custom Color 1, Custom Color 2
**** Use #rrggbb for custom colors or regular numbers for text colors from
     the Window Skin. Empty for default colors.
*** These plugin parameters are added onto TP Modes.

Version 1.02: November 8, 2020
* Bug Fixes!
** Turning off Preserve TP will no longer generate random amounts of TP at
   the start of battle. Fix made by Arisu.

Version 1.01: November 1, 2020
* Bug Fixes!
** Skill & States Core is no longer a dependency for Enhanced TP System.
   Fix made by Olivia.

Version 1.00: October 26, 2020
* Finished Plugin!

============================================================================
End of Helpfile
============================================================================