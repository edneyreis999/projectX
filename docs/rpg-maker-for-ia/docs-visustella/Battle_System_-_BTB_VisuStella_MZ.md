VisuStella MZ
This plugin is a part of the VisuStella MZ Plugin Library.



Click here if you want to help support VisuStella on Patreon.

Introduction
BattleSysBTB Preview1.png

The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle system with a twist of allowing actors (and enemies) to use up actions from the future or save up for later. These actions will be queued and delivered all in one go! Any borrowed actions from the future will result in following turns without any actions to use. Should a player decide to save up their actions instead through Guarding, they can charge actions with less repercussions. Players will have to be brave about how to go about the battle system strategically.

Because multiple actions can be queued up all at once, they can result in the creation of an action fusion. Some skills (and items) can appear instead of the originally queued actions to result in stronger, better, and more awesome effects, all of which, can be defined by the game dev.

A Turn Order Display will also appear on the screen to show the order the battlers will take their turns in. This lets the player plan in advance on how to go about the rest of the turn.

NOTE* To use this battle system, you will need the updated version of
VisuStella's Core Engine. Go into its Plugin Parameters and change the "Battle System" plugin parameter to "btb".

Features include all (but not limited to) the following:

Puts a twist on the Default Turn Battle system by allowing brave players to borrow actions from the future turns or save them up for later turns.
Brave Points, a new currency, are added to mark how many saved turns there are for each battler.
Certain actions can cost more Brave Points than others.
Effects that allow battlers to alter the Brave Points of their targets.
A Turn Order Display to show the player when each battler will have its turn to perform an action.
Action fusion system which takes any of the queued up skills and/or items to bring forth new ones.
Action fusion combinations can be either flexible or strict.
Flexible action fusion combinations can have their actions queued up in any order to bring forth the result.
Strict action fusion combinations must require their actions to be queued up in a specific order in order to bring forth the result.
Requirements
This plugin is made for RPG Maker MZ. This will not work in other iterations of RPG Maker.

Required Plugin List
Core Engine VisuStella MZ
Battle Core VisuStella MZ
Items and Equips Core VisuStella MZ
Skills and States Core VisuStella MZ
This plugin requires the above listed plugins to be installed inside your game's Plugin Manager list in order to work. You cannot start your game with this plugin enabled without the listed plugins.



Tier 2
This plugin is a Tier 2 plugin. Place it under other plugins of lower tier value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5).

This is to ensure that your plugins will have the best compatibility with the rest of the VisuStella MZ Plugin library.



Major Changes
This plugin adds some new hard-coded features to RPG Maker MZ's functions. The following is a list of them.

---

Turn Order Display
BattleSysBTB TurnOrder.png

The Turn Order Display will capture the battle's currently active battler and any battlers found in the active battlers array for the BattleManager. This does not overwrite any functions, but the Turn Order Display may or may not conflict with any existing HUD elements that are already positioned on the screen. If so, you can choose to offset the Turn Order Display or move it to a different part of the screen through the plugin parameters.

---

Brave Points and the Brave Command
BattleSysBTB BraveCmd.png

Abbreviated to "BP", Brave Points are a new currency available through the Brave Turn Battle system. Battlers require at least 0 BP in order to perform any actions for that turn. By default, each action consumes 1 BP. At the end of each turn, each battler regenerates 1 BP. With the normal flow of battle, this results in a net balance.

However, the player can activate the "Brave Command" located right above the Guard Command. This lets the battler create an extra action to perform. When used, the flow of battle will result in a negative net of BP. When BP is at -1 or under, that battler's turn is skipped until it raises back to 0. This effectively means that the "Brave Command" will borrow actions from future turns.

The Guard Command, however will never consume any BP for its actions even if replaced as it is always determined by the battler's current guard skill. This means that when used, the Guard Command lets a battler save up BP for future turns, allowing BP to go net positive for the turn.

By strategically deciding when to borrow actions or save up for them, whole new strategies can be created for battle.

The game dev has control over how many max actions can be borrowed at once, the maximum and minimum amounts for BP to go to, how much BP will cost at default, and how much BP can be regenerated by default. These settings can all be made within the Plugin Parameters.

---

Action Times +
While the Brave Turn Battle system is active, the "Action Times +" trait is disabled. This is to prevent any conflicts with the Brave system. If the Brave Turn Battle system is disabled during the course of the game, then the "Action Times +" will resume working like normal.

---

Can Input
As mentioned in the "Brave Points and the Brave Command" above, if BP is under 0, then that battler cannot input or act for that turn. The battler would have to wait for BP regenerate back up to 0 first.

---

Can Guard
The Guard action is only enabled when there's one action to use for that turn. This means that if the "Brave Command" is used to generate new actions to perform during that turn, the Guard Command will be disabled. It can be enabled once again if the player cancels out the Brave Command until the action count reaches 1.

---

Enemy Brave Actions
Enemies can also use the "Brave Command" by faking it. By making a dummy skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the <BTB Multiple Actions: name, name, name, name> skill notetag, you can have the enemy perform the exact skills you want in a multi-action queue.

Enemies that use this will also suffer from heavy BP expenditure and wait on subsequent turns until they have enough BP to perform actions again.

This is also how you can have enemies perform Action Fusions. For the queued skills, load up the Action Fusion's skill combination you want for the enemy to perform.

---

Action Fusions
This feature deserves its own section as it's quite indepth with how it works. Action Fusions can be performed by either the actor and/or enemy (though this can be disabled in the Plugin Parameters or through traits). In order for them to occur, the queued up action list must have a certain combination of skills/items for the Action Fusion to occur.

---

Fusion Types
BattleSysBTB ActionFusion.png

Icons by CazWolf

There are two types of Action Fusions: Flexible and Strict. Flexible Action Fusions can use a combination of skills/items in any order (thus flexible), while Strict Action Fusions must have their skill/item combinations queued up in the exact order they're listed (thus strict).

They all share the following properties:

Skill Action Fusions can only use skills for combinations. This means that Action Fusions made as a skill database object cannot have item requirements for the combinations.

Item Action Fusions can only use items for combinations. This means that Action Fusions made as an item database object cannot have skills for the combination requirements.

Skills and items that have selectable targets need to have matching targets to be a part of the same Action Fusion combination. For example, if "Quad Attack" requires "Attack", "Attack", "Attack", "Attack", then the player would have to target the same enemy for each of the "Attack" actions. This is to prevent the cases where the player wants to spread out the damage evenly across various enemies without forming it into a single target "Quad Attack" against one.

Skills and items that do not have selectable targets are combination targets for any and all candidates. This means an area of effect "Flame" spell can combine with any target selectable or otherwise skill.

When an Action Fusion is performed, it will not consume the resources for the database object itself, but instead, from each of the skills/items used to bring it out. This means the skill costs of the Action Fusion itself are irrelevant, but the skill costs of the combinations do matter and will be consumed instead. The same applies to items.

If the Action Fusion skill/item is used directly, its resource consumption will be performed as if it was not an Action Fusion skill/item. The "Quad Attack" skill will use its regular MP and TP costs while the "Double Elixir" item will consume itself.

If a queue could potentially meet the demands of multiple Action Fusions, then the Action Fusion with the highest database ID will be given priority, as to make it less complicated. This means if the "Double Attack" Action Fusion and "Triple Attack" Action Fusion were to occur at the same time, if the "Triple Attack" skill has a higher ID than "Double Attack", then "Triple Attack" will take priority instead.

The battler must be able to pay the actions of each of the queued actions used to form the Action Fusion. This means if a battler would run out of MP or items for the cost, it will just simply not occur.

An Action Fusion can have multiple combinations that create it as long as there are multiple notetags that determine the Action Fusion. As an example, the "Flame Strike" can occur with the "Attack" and "Flame" combination or the "Strike" and "Flame" combination.

---

Flexible Action Fusion
BattleSysBTB ActionFusion.png

Icons by CazWolf

<BTB Flexible Fusion: id, id>
<BTB Flexible Fusion: id, id, id>
<BTB Flexible Fusion: id, id, id, id>

<BTB Flexible Fusion: name, name>
<BTB Flexible Fusion: name, name, name>
<BTB Flexible Fusion: name, name, name, name>

- Used for: Skill, Item Notetags
- This Action Fusion skill/item will occur as long as any of the listed
  combination skills/items are queued in the action list for that turn.
  These actions can be queued in any order.
- Replace 'id' with the database ID of the skill/item to use as a
  combination requirement.
- Replace 'name' with the name of the skill/item to use as a combination
  requirement.
- Skill Action Fusions can only use skills for combinations.
- Item Action Fusions can only use items for combinations.
- Skills and items that have selectable targets need to have matching
  targets to be a part of the same Action Fusion combination.
- Skills and items that do not have selectable targets are combination
  targets for any and all candidates.
- When an Action Fusion is performed, it will not consume the resources for
  the database object itself, but instead, from each of the skills/items
  used to bring it out.
- Is used directly, this action's resource consumption will be performed as
  if it was not an Action Fusion skill/item.
- If a queue could potentially meet the demands of multiple Action Fusions,
  then the Action Fusion with the highest database ID is given priority.
- The battler must be able to pay the actions of each of the queued actions
  used to form the Action Fusion.
- Insert multiple copies of this notetag to give this Action Fusion more
  combinations that can activate it.

Examples:

  ---

  Fire Strike

  <BTB Flexible Fusion: Attack, Fire>

  This Action Fusion will occur if a battler has the "Attack" and "Fire"
  actions queued up in any order. "Attack" can come before "Fire" or "Fire"
  can come before "Attack" and it would still call upon "Fire Strike".

  ---

  Flame Strike

  <BTB Flexible Fusion: Attack, Flame>
  <BTB Flexible Fusion: Strike, Flame>

  This Action Fusion will occur if a battler has "Attack" and "Flame",
  "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
  action queue.

  ---
---

Strict Action Fusion
BattleSysBTB ActionFusion.png

Icons by CazWolf

<BTB Strict Fusion: id, id>
<BTB Strict Fusion: id, id, id>
<BTB Strict Fusion: id, id, id, id>

<BTB Strict Fusion: name, name>
<BTB Strict Fusion: name, name, name>
<BTB Strict Fusion: name, name, name, name>

- Used for: Skill, Item Notetags
- This Action Fusion skill/item will occur as long as the exact listed
  combination(s) of skills/items is queued in the action list for that turn.
  These actions can be queued in any order.
- Replace 'id' with the database ID of the skill/item to use as a
  combination requirement.
- Replace 'name' with the name of the skill/item to use as a combination
  requirement.
- Skill Action Fusions can only use skills for combinations.
- Item Action Fusions can only use items for combinations.
- Skills and items that have selectable targets need to have matching
  targets to be a part of the same Action Fusion combination.
- Skills and items that do not have selectable targets are combination
  targets for any and all candidates.
- When an Action Fusion is performed, it will not consume the resources for
  the database object itself, but instead, from each of the skills/items
  used to bring it out.
- Is used directly, this action's resource consumption will be performed as
  if it was not an Action Fusion skill/item.
- If a queue could potentially meet the demands of multiple Action Fusions,
  then the Action Fusion with the highest database ID is given priority.
- The battler must be able to pay the actions of each of the queued actions
  used to form the Action Fusion.
- Insert multiple copies of this notetag to give this Action Fusion more
  combinations that can activate it.

Example:

  ---

  Shadow Flare Blade

  <BTB Strict Fusion: Shade II, Fire II, Attack>

  The battler must queue up "Shade II", "Fire II", and "Attack" in that
  exact order or else "Shadow Flare Blade" will not occur. Even if the
  battler changed the order to "Fire II", "Shade II", and "Attack", the
  Action Fusion will not occur.

  ---
---

VisuStella MZ Compatibility
While this plugin is compatible with the majority of the VisuStella MZ plugin library, it is not compatible with specific plugins or specific features. This section will highlight the main plugins/features that will not be compatible with this plugin or put focus on how the make certain features compatible.

---

Boost Action VisuStella MZ

The Boost Actions plugin cannot be used together with Battle System - BTB. If the Battle System is switched to using Battle System - BTB, then the Boost Actions plugin will shut itself off.

The reason why these plugins cannot work together is because their mechanics play off too similarly to each other and cause conflicts. We, the plugin developer team, highly recommend that you utilize Battle System - BTB's Brave system instead of the Boost system to make the best use of the battle system in effect.

---

Notetags


RPG Maker MZ's editor is unable to allow for custom traits/properties that a game dev may wish to associate with a database object, event, map, etc. Notetags are used to work around such limitations by allowing the game dev to tag certain traits/properties using specific Notetags declared by the related plugin.

Here is a list of Notetag(s) that you may use.


The following are notetags that have been added through this plugin. These notetags will not work with your game if this plugin is OFF or not present.

---

General BTB-Related Notetags
BattleSysBTB Preview1.png

These notetags are general purpose notetags that have became available through this plugin.

---

<BTB Help>
 description
 description
</BTB Help>

- Used for: Skill, Item Notetags
- If your game happens to support the ability to change battle systems, this
  notetag lets you change how the skill/item's help description text will
  look under BTB.
- This is primarily used if the skill behaves differently in BTB versus any
  other battle system.
- Replace 'description' with help text that's only displayed if the game's
  battle system is set to BTB.
---

<BTB Cannot Brave>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  that battler cannot use Brave to generate more actions.
- For actors, this will come with the Brave Command disabled.
---

<BTB Hide Brave>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  that battler cannot use Brave to generate more actions.
- For actors, this will come with the Brave Command hidden along with their
  BP values.
---

BTB Turn Order Display-Related Notetags
BattleSysBTB TurnOrder.png

These notetags affect the BTB Turn Order Display

---

<BTB Turn Order Icon: x>

- Used for: Actor, Enemy Notetags
- Changes the slot graphic used for the battler to a specific icon.
- Replace 'x' with the icon index to be used.
---

<BTB Turn Order Face: filename, index>

- Used for: Actor, Enemy Notetags
- Changes the slot graphic used for the enemy to a specific face.
- Replace 'filename' with the filename of the image.
  - Do not include the file extension.
- Replace 'index' with the index of the face. Index values start at 0.
- Example: <BTB Turn Order Face: Monster, 1>
---

Brave Points Cost-Related Notetags
BattleSysBTB Costs.png

The following notetags are used to manage Brave Point (BP) costs, how some actions can alter other BP values, and more.

---

<BTB BP Cost: x>

- Used for: Skill, Item Notetags
- Determines how much BP the battler uses when performing this action.
- Replace 'x' with a number value to determine its BP cost.
---

<BTB Hide BP Cost>

- Used for: Skill, Item Notetags
- Prevents the BP cost from being shown for this action.
---

Brave Point Manipulation-Related Notetags
BattleSysBTB BPManip.png

The following notetags are used to manage Brave Point (BP) costs, how some actions can alter other BP values, and more.

---

<BTB User Set BP: x>
<BTB Target Set BP: x>

- Used for: Skill, Item Notetags
- Sets the user/target's current BP to a specific value.
- Replace 'x' with a number value to determine how much you want the user
  or target's BP to be set to.
- The 'user' variant only affects the action's user.
- The 'target' variant only affects the action's target.
---

<BTB User Gain BP: +x>
<BTB Target Gain BP: +x>

<BTB User Lose BP: -x>
<BTB Target Lose BP: -x>

- Used for: Skill, Item Notetags
- Causes the action to alter how much BP the user/target has.
- Replace 'x' with a number value to determine how much BP is gained/lost
  for the user/target.
- The 'user' variant only affects the action's user.
- The 'target' variant only affects the action's target.
---

JavaScript Notetags: Brave Point Manipulation
BattleSysBTB BPManip.png

The following are notetags made for users with JavaScript knowledge to give more control over Brave Point alteration.

---

<JS BTB User BP>
 code
 code
 value = code;
</JS BTB User BP>

- Used for: Skill, Item Notetags
- Replace 'code' with JavaScript code to determine what is the user's final
  BP value after all of the code is ran.
- The 'value' variable is the returned value to be set as the user's BP.
  This value also starts off as the user's current BP.
- The 'user' variable refers to the action's user.
- The 'target' variable refers to the action's current target.
---

<JS BTB Target BP>
 code
 code
 value = code;
</JS BTB Target BP>

- Used for: Skill, Item Notetags
- Replace 'code' with JavaScript code to determine what is the current
  target's final BP value after all of the code is ran.
- The 'value' variable is the returned value to be set as the target's BP.
  This value also starts off as the target's current BP.
- The 'user' variable refers to the action's user.
- The 'target' variable refers to the action's current target.
---

Brave Point Managment-Related Notetags
BattleSysBTB BPManip.png

The following notetags are used to for battlers to manage their BP settings throughout the course of the fight.

---

<BTB Initial BP: +x>
<BTB Initial BP: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  alter that battler's initial BP at the start of battle.
- Replace 'x' with a number value representing how much you want to alter
  the affected battler's initial BP at the start of battle.
---

<BTB BP Regen: +x>
<BTB BP Degen: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  alter the amount of BP regenerated at the end of each battle turn.
- Replace 'x' with a number value representing how much BP is regenerated
  (or decreased).
  - Use a positive number for gaining BP at the end of each turn.
  - Use a negative number for losing BP at the end of each turn.
---

<BTB Maximum BP: +x>
<BTB Maximum BP: -x>

<BTB Minimum BP: +x>
<BTB Minimum BP: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  increase or decrease the maximum/minimum BP that battler can have by 'x'.
- Replace 'x' with a number value representing the amount to change the
  battler's maximum/minimum BP by.
- These numbers cannot exceed or go under the designated amounts set by the
  hard cap in this plugin's Plugin Parameters.
---

Multiple Action-Related Notetags
BattleSysBTB BraveCmd.png

These notetags allow you to determine how multiple actions are handled through the Brave Turn Battle system.

---

<BTB Maximum Actions: +x>
<BTB Maximum Actions: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object with one of these notetags,
  increase/decrease the maximum number of actions that battler can have
  through the Brave Command.
- Replace 'x' with a number value representing the amount of maximum actions
  to increase/decrease by.
- This value cannot make a battler go below 1 maximum action.
- This value cannot make a battler go above the hard cap set in this
  plugin's Plugin Parameters.
---

<BTB Multiple Actions: id, id>
<BTB Multiple Actions: id, id, id>
<BTB Multiple Actions: id, id, id, id>

<BTB Multiple Actions: name, name>
<BTB Multiple Actions: name, name, name>
<BTB Multiple Actions: name, name, name, name>

- Used for: Skill Notetags
- When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
  enemy is using the Brave Command to load up multiple actions at a time.
- Replace 'id' with the database ID of the skill to use in the multiple
  action queue.
- Replace 'name' with the name of the skill to use in the enemy's multiple
  action queue.
---

Action Fusion-Related Notetags
BattleSysBTB ActionFusion.png

Icons by CazWolf

For more details, please refer to the Action Fusion dedicated section listed earlier in the documentation.

---

Flexible Action Fusion

<BTB Flexible Fusion: id, id>
<BTB Flexible Fusion: id, id, id>
<BTB Flexible Fusion: id, id, id, id>

<BTB Flexible Fusion: name, name>
<BTB Flexible Fusion: name, name, name>
<BTB Flexible Fusion: name, name, name, name>

- Used for: Skill, Item Notetags
- This Action Fusion skill/item will occur as long as any of the listed
  combination skills/items are queued in the action list for that turn.
  These actions can be queued in any order.
- Replace 'id' with the database ID of the skill/item to use as a
  combination requirement.
- Replace 'name' with the name of the skill/item to use as a combination
  requirement.
- Skill Action Fusions can only use skills for combinations.
- Item Action Fusions can only use items for combinations.
- Skills and items that have selectable targets need to have matching
  targets to be a part of the same Action Fusion combination.
- Skills and items that do not have selectable targets are combination
  targets for any and all candidates.
- When an Action Fusion is performed, it will not consume the resources for
  the database object itself, but instead, from each of the skills/items
  used to bring it out.
- Is used directly, this action's resource consumption will be performed as
  if it was not an Action Fusion skill/item.
- If a queue could potentially meet the demands of multiple Action Fusions,
  then the Action Fusion with the highest database ID is given priority.
- The battler must be able to pay the actions of each of the queued actions
  used to form the Action Fusion.
- Insert multiple copies of this notetag to give this Action Fusion more
  combinations that can activate it.
---

Strict Action Fusion

<BTB Strict Fusion: id, id>
<BTB Strict Fusion: id, id, id>
<BTB Strict Fusion: id, id, id, id>

<BTB Strict Fusion: name, name>
<BTB Strict Fusion: name, name, name>
<BTB Strict Fusion: name, name, name, name>

- Used for: Skill, Item Notetags
- This Action Fusion skill/item will occur as long as the exact listed
  combination(s) of skills/items is queued in the action list for that turn.
  These actions can be queued in any order.
- Replace 'id' with the database ID of the skill/item to use as a
  combination requirement.
- Replace 'name' with the name of the skill/item to use as a combination
  requirement.
- Skill Action Fusions can only use skills for combinations.
- Item Action Fusions can only use items for combinations.
- Skills and items that have selectable targets need to have matching
  targets to be a part of the same Action Fusion combination.
- Skills and items that do not have selectable targets are combination
  targets for any and all candidates.
- When an Action Fusion is performed, it will not consume the resources for
  the database object itself, but instead, from each of the skills/items
  used to bring it out.
- Is used directly, this action's resource consumption will be performed as
  if it was not an Action Fusion skill/item.
- If a queue could potentially meet the demands of multiple Action Fusions,
  then the Action Fusion with the highest database ID is given priority.
- The battler must be able to pay the actions of each of the queued actions
  used to form the Action Fusion.
- Insert multiple copies of this notetag to give this Action Fusion more
  combinations that can activate it.
---

<BTB Cannot Fusion>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object that has this notetag, that
  battler cannot perform any Action Fusions. Queued skills will occur
  normally instead.
- If the actor is affected by both notetags for <BTB Cannot Fusion> and
  <BTB Enable Fusion> priority will be given based on the order of their
  trait objects.
---

<BTB Enable Fusion>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- If a battler is affected by a trait object that has this notetag, that
  battler is allowed to perform any Action Fusions. Queued skills will occur
  normally instead.
- If the actor is affected by both notetags for <BTB Cannot Fusion> and
  <BTB Enable Fusion> priority will be given based on the order of their
  trait objects.
---

Plugin Commands
PluginCommandsMZ.png

Plugin Commands are event commands that are used to call upon functions added by a plugin that aren't inherently a part of RPG Maker MZ.

Here is a list of Plugin Command(s) that you may use:

---


The following are Plugin Commands that come with this plugin. They can be accessed through the Plugin Command event command.

---

Actor Plugin Commands
BattleSysBTB TurnOrder.png

---

BattleSysBTB Command 1.png

Actor: Change BTB Turn Order Icon
- Changes the icons used for the specific actor(s) on the BTB Turn Order.

  Actor ID(s):
  - Select which Actor ID(s) to affect.

  Icon:
  - Changes the graphic to this icon.
---

BattleSysBTB Command 2.png

Actor: Change BTB Turn Order Face
- Changes the faces used for the specific actor(s) on the BTB Turn Order.

  Actor ID(s):
  - Select which Actor ID(s) to affect.

  Face Name:
  - This is the filename for the target face graphic.

  Face Index:
  - This is the index for the target face graphic.
---

BattleSysBTB Command 3.png

Actor: Clear BTB Turn Order Graphic
- Clears the BTB Turn Order graphics for the actor(s).
- The settings will revert to the Plugin Parameter settings.

  Actor ID(s):
  - Select which Actor ID(s) to affect.
---

Enemy Plugin Commands
BattleSysBTB TurnOrder.png

---

BattleSysBTB Command 4.png

Enemy: Change BTB Turn Order Icon
- Changes the icons used for the specific enemy(ies) on the BTB Turn Order.

  Enemy Index(es):
  - Select which enemy index(es) to affect.

  Icon:
  - Changes the graphic to this icon.
---

BattleSysBTB Command 5.png

Enemy: Change BTB Turn Order Face
- Changes the faces used for the specific enemy(ies) on the BTB Turn Order.

  Enemy Index(es):
  - Select which enemy index(es) to affect.

  Face Name:
  - This is the filename for the target face graphic.

  Face Index:
  - This is the index for the target face graphic.
---

BattleSysBTB Command 6.png

Enemy: Clear BTB Turn Order Graphic
- Clears the BTB Turn Order graphics for the enemy(ies).
- The settings will revert to the Plugin Parameter settings.

  Enemy Index(es):
  - Select which enemy index(es) to affect.
---

System Plugin Commands
BattleSysBTB TurnOrder.png

---

BattleSysBTB Command 7.png

System: BTB Turn Order Visibility
- Determine the visibility of the BTB Turn Order Display.

  Visibility:
  - Changes the visibility of the BTB Turn Order Display.
---

Plugin Parameters
General Settings
BattleSysBTB Preview1.png

BattleSysBTB Params1.png

General settings regarding Battle System BTB. These range from how Brave Points (BP) appear in-game to how their costs are displayed.

---

Brave Points

BattleSysBTB BraveCmd.png

 Full Name:
 - What is the full name of "Brave Points" in your game?
 Abbreviation:
 - What is the abbreviation of "Brave Points" in your game?
 Icon:
 - What icon do you wish to use to represent Brave Points?
 Cost Format:
 - How are Brave Point costs displayed?
 - %1 - Cost, %2 - BP Text, %3 - Icon
---

Displayed Costs

BattleSysBTB Costs.png

 Cost Position Front?:
 - Put the BP Cost at the front of skill/item costs?
 Show Cost: Attack:
 - Show the BP cost for the Attack command?
 Show Cost: Guard:
 - Show the BP cost for the Guard command?
 Reduce Shown BP Cost:
 - Reduce shown BP costs by this much.
 - Used to match traditional games.
 Show Cost: 0 BP:
 - Show the BP cost when the cost is 0 BP?
 - Shown BP Cost reduction is applied.
 Show Cost: 1 BP:
 - Show the BP cost when the cost is 1 BP?
 - Shown BP Cost reduction is applied.
---

Mechanics Settings
BattleSysBTB Params2.png

Adjust the mechanics settings for the Battle System BTB. Mechanics range from how speed is handled to Brave action caps, how Brave Points are managed, and Action Fusions.

---

Action Speed

 Allow Random Speed?:
 - Allow speed to be randomized base off the user's AGI?
 JS: Calculate:
 - Code used to calculate action speed.
---

Brave Action Max

BattleSysBTB BraveCmd.png

 Default:
 - What is the default number of max actions a battler can have from the
   Brave system?
 Hard Cap:
 - What is the absolute highest for maximum actions a battler can have
   from the Brave system?
---

Brave Points > Limits

BattleSysBTB BPManip.png

 Default Maximum:
 - What is the default maximum number of Brave Points a battler can have at
   a time?
 Default Minimum:
 - What is the default minimum number of Brave Points a battler can have at
   a time?
 Hard Cap Maximum:
 - What is the absolute maximum number of Brave Points a battler can have
   at a time?
 Hard Cap Minimum:
 - What is the absolute minimum number of Brave Points a battler can have
   at a time?
---

Brave Points > Costs

BattleSysBTB Costs.png

 Default Skill Cost:
 - How many Brave Points does a skill cost by default?
 Default Item Cost:
 - How many Brave Points does an item cost by default?
 Predicted Cost:
 - What is considered predicted cost?
---

Brave Points > Start Battle

BattleSysBTB BPManip.png

 Neutral:
 - How many Brave Points should a battler have if the battle advantage is
   neutral?
 Favored:
 - How many Brave Points should a battler have if the battle advantage is
   favored?
---

Brave Points > Regeneration

BattleSysBTB BPManip.png

 Base Recovery:
 - How many Brave Points are regenerated at the end of each turn?
 Needs to be Alive?:
 - Do battlers need to be alive to regenerate Brave Points?
---

Action Fusions

BattleSysBTB ActionFusion.png

Icons by CazWolf

 Actor Access?:
 - Allow actors access to Action Fusions?
 Enemy Access?:
 - Allow enemies access to Action Fusions?
---

Brave Animations Settings
BattleSysBTB Params3.png

Animation when applying/canceling Brave effects.

---

On Brave

BattleSysBTB Preview1.png

 Animation ID:
 - Play this animation when the effect activates.
 Mirror Animation:
 - Mirror the effect animation?
 Mute Animation:
 - Mute the effect animation?
---

Cancel Brave

BattleSysBTB Preview1.png

 Animation ID:
 - Play this animation when the effect activates.
 Mirror Animation:
 - Mirror the effect animation?
 Mute Animation:
 - Mute the effect animation?
---

Enemy Brave

BattleSysBTB Preview1.png

 Show Activation?:
 - Show the enemy activating Brave?
 Wait Frames:
 - This is the number of frames to wait between activations.
---

Turn Order Display Settings
BattleSysBTB TurnOrder.png

BattleSysBTB Params4.png

Turn Order Display settings used for Battle System BTB. These adjust how the visible turn order appears in-game.

---

General

 Display Position:
 - Select where the Turn Order will appear on the screen.
   Offset X:
   - How much to offset the X coordinate by.
   - Negative: left. Positive: right.
   Offset Y:
   - How much to offset the Y coordinate by.
   - Negative: up. Positive: down.
 Center Horizontal?:
 - Reposition the Turn Order Display to always be centered if it is a
   'top' or 'bottom' position?
 Reposition for Help?:
 - If the display position is at the top, reposition the display when the
   help window is open?
 Reposition Log?:
 - If the display position is at the top, reposition the Battle Log Window
   to be lower?
 Forward Direction:
 - Decide on the direction of the Turn Order.
 - Settings may vary depending on position.
 - Left to Right / Down to Up
 - Right to Left / Up to Down
 Subject Distance:
 - How far do you want the currently active battler to distance itself from
   the rest of the Turn Order?
 Screen Buffer:
 - What distance do you want the display to be away from the edge of the
   screen by?
---

Reposition For Help

 Repostion X By:
 Repostion Y By:
 - Reposition the display's coordinates by this much when the Help Window
   is visible.
---

Slots

 Max Horizontal:
 - Maximum slots you want to display for top and bottom Turn Order Display
   positions?
 Max Vertical:
 - Maximum slots you want to display for left and right Turn Order Display
   positions?
 Length:
 - How many pixels long should the slots be on the Turn Order display?
 Thin:
 - How many pixels thin should the slots be on the Turn Order display?
 Update Frames:
 - How many frames should it take for the slots to update their
   positions by?
---

Slot Border

 Show Border?:
 - Show borders for the slot sprites?
 Border Thickness:
 - How many pixels thick should the colored portion of the border be?
 Actors
 Enemies
   Border Color:
   - Use #rrggbb for custom colors or regular numbers for text colors
     from the Window Skin.
   Border Skin:
   - Optional. Place a skin on the actor/enemy borders instead of
     rendering them?
---

Slot Sprites

 Actors
   Sprite Type:
   - Select the type of sprite used for the actor graphic.
   - Face Graphic - Show the actor's face.
   - Icon - Show a specified icon.
   - Sideview Actor - Show the actor's sideview battler.
   Default Icon:
   - Which icon do you want to use for actors by default?
 Enemies
   Sprite Type:
   - Select the type of sprite used for the enemy graphic.
   - Face Graphic - Show a specified face graphic.
   - Icon - Show a specified icon.
   - Enemy - Show the enemy's graphic or sideview battler.
   Default Face Name:
   - Use this default face graphic if there is no specified face.
   Default Face Index:
   - Use this default face index if there is no specified index.
   Default Icon:
   - Which icon do you want to use for enemies by default?
   Match Hue?:
   - Match the hue for enemy battlers?
   - Does not apply if there's a sideview battler.
---

Slot Letter

 Show Enemy Letter?:
 - Show the enemy's letter on the slot sprite?
 Font Name:
 - The font name used for the text of the Letter.
 - Leave empty to use the default game's font.
 Font Size:
 - The font size used for the text of the Letter.
---

Slot Background

 Show Background?:
 - Show the background on the slot sprite?
 Actors
 Enemies
   Background Color 1:
   Background Color 2:
   - Use #rrggbb for custom colors or regular numbers for text colors
     from the Window Skin.
   Background Skin:
   - Optional. Use a skin for the actor background instead of
     rendering them?
---

Window Settings
BattleSysBTB BPManip.png

BattleSysBTB Params5.png

Settings regarding the windows of the Battle System BTB. These mostly adjust how certain aspects of the Brave Turn Battle system appear in-game.

---

Window_ActorCommand

 Command Text:
 - What is the text that appears for the Brave command?
 Show Command?:
 - Show the Brave command in the Actor Command Window?
 Page Up/Dn Shortcuts?:
 - Use Page Up/Down for shortcuts on activating Brave?
 JS: Draw Counters:
 - Code used to determine how the action counters are displayed on
   the window.
   Action Slot:
   - This is the text used to represent a non-selected action slot.
   Current Action:
   - This is the text used to represent the current action slot.
---

Window_BattleStatus

 Display Format:
 - How are actor Brave Point displayed?
 - %1 - Total BP, %2 - BP Text, %3 - Icon
 Predict Format:
 - How are predicted Brave Point displayed?
 - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
---

Window_BattleStatus > Text Colors

 Neutral Color:
 - Text code color for neutral number values.
 Positive Color:
 - Text code color for positive number values.
 Negative Color:
 - Text code color for negative number values.
---

Window_BattleStatus > Style Settings > Default Style

Window_BattleStatus > Style Settings > List Style

Window_BattleStatus > Style Settings > XP Style

Window_BattleStatus > Style Settings > Portrait Style

Window_BattleStatus > Style Settings > Border Style

Window_BattleStatus > Style Settings > Alignment Style

 Show Display?:
 - Show the actor's BP values in the Battle Status Window?
 Alignment:
 - How do you want the actor BP values to be aligned?
 Offset X:
 Offset Y:
 - Offset the actor BP display X/Y by how many pixels?
---

