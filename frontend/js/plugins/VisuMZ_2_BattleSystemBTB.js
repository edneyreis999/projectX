//=============================================================================
// VisuStella MZ - Battle System - BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.19;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.19] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 *
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 *
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 *
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 *
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Turn Order Display
 *
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 *
 * ---
 *
 * Brave Points and the Brave Command
 *
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 *
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 *
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 *
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 *
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 *
 * ---
 *
 * Action Times +
 *
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 *
 * Can Input
 *
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 *
 * ---
 *
 * Can Guard
 *
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 *
 * ---
 *
 * Enemy Brave Actions
 *
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 *
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 *
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 *
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 *
 * Fusion Types
 *
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 *
 * They all share the following properties:
 *
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 *
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 *
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 *
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 *
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 *
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 *
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 *
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 *
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 *
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * Examples:
 *
 *   ---
 *
 *   Fire Strike
 *
 *   <BTB Flexible Fusion: Attack, Fire>
 *
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 *
 *   ---
 *
 *   Flame Strike
 *
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 *
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 *
 *   ---
 *
 * ---
 *
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * Example:
 *
 *   ---
 *
 *   Shadow Flare Blade
 *
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 *
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 *
 *   ---
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_3_BoostAction
 *
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 *
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * === General BTB-Related Notetags ===
 *
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 *
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 *
 * === BTB Turn Order Display-Related Notetags ===
 *
 * These notetags affect the BTB Turn Order Display
 *
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 *
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 *
 * ---
 *
 * === Brave Points Cost-Related Notetags ===
 *
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 *
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 *
 * === Brave Point Manipulation-Related Notetags ===
 *
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 *
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 *
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 *
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 *
 * ---
 *
 * === Brave Point Managment-Related Notetags ===
 *
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 *
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased).
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 *
 * === Multiple Action-Related Notetags ===
 *
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 *
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 *
 * ---
 *
 * === Action Fusion-Related Notetags ===
 *
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 *
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * === Actor Plugin Commands ===
 *
 * ---
 *
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 *
 * === Enemy Plugin Commands ===
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 *
 * === System Plugin Commands ===
 *
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 *
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 *
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 *
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 *
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 *
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 *
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 *
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 *
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 *
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 *
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 *
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 *
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 *
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 *
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 *
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 *
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 *
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 *
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 *
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 *
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 *
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 *
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 *
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 *
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 *
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 *
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 *
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 *
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 *
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 *
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 *
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 *
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 *
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 *
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 *
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 *
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 *
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 *
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 *
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 *
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 *
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 *
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 *
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 *
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 *
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 *
 *   Show Border?:
 *   - Show borders for the slot sprites?
 *
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 *
 *   Actors
 *   Enemies
 *
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 *
 *   Actors
 *
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 *
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 *
 *   Enemies
 *
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 *
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 *
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 *
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 *
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 *
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 *
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 *
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 *
 *   Show Background?:
 *   - Show the background on the slot sprite?
 *
 *   Actors
 *   Enemies
 *
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 *
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 *
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 *
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 *
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 *
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 *
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 *
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 *
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 *
 *   Neutral Color:
 *   - Text code color for neutral number values.
 *
 *   Positive Color:
 *   - Text code color for positive number values.
 *
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 *
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 *
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 *
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 *
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 *
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 *
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 *
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.19: June 12, 2025
 * * Bug Fixes!
 * ** Fixed a bug where notetags like <Target: Enemy or Ally> would cause
 *    action fusions to not work properly. Fix made by Arisu.
 * ** Fixed a bug where some special targeting cases were not preserved when
 *    performing action fusions. Fix made by Arisu.
 *
 * Version 1.18: April 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where flex fusion combinations did not work properly and
 *    where the strict fusion combinations would draw from flex fusions. Fix
 *    made by Olivia.
 *
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where for certain battle layouts, the BTB Action Counter on
 *    the actor command window would start off center. Fix made by Olivia.
 *
 * Version 1.16: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where strict action fusion combinations would not register.
 *    Fix made by Olivia.
 *
 * Version 1.15: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where action fusions would consume double the amount of items
 *    if the skills were to cost items. Fix made by Olivia.
 *
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 *
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 *
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 *
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 *
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 *
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 *
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 *
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 *
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 *
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 *
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 *
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x4518ba = _0x2c48;
(function (_0x30401c, _0x3af836) {
  const _0x32fdff = _0x2c48,
    _0x107d66 = _0x30401c();
  while (!![]) {
    try {
      const _0x5e524c =
        -parseInt(_0x32fdff(0x422)) / 0x1 +
        parseInt(_0x32fdff(0x364)) / 0x2 +
        parseInt(_0x32fdff(0x312)) / 0x3 +
        (parseInt(_0x32fdff(0x42e)) / 0x4) * (-parseInt(_0x32fdff(0x2fa)) / 0x5) +
        (-parseInt(_0x32fdff(0x3de)) / 0x6) * (parseInt(_0x32fdff(0x3ca)) / 0x7) +
        (parseInt(_0x32fdff(0x3cc)) / 0x8) * (-parseInt(_0x32fdff(0x426)) / 0x9) +
        (-parseInt(_0x32fdff(0x2a0)) / 0xa) * (-parseInt(_0x32fdff(0x42d)) / 0xb);
      if (_0x5e524c === _0x3af836) break;
      else _0x107d66['push'](_0x107d66['shift']());
    } catch (_0x23b65b) {
      _0x107d66['push'](_0x107d66['shift']());
    }
  }
})(_0x59d3, 0x61c84);
var label = 'BattleSystemBTB',
  tier = tier || 0x0,
  dependencies = [_0x4518ba(0x266), _0x4518ba(0x3f0), _0x4518ba(0x3af), _0x4518ba(0x3a3)],
  pluginData = $plugins[_0x4518ba(0x286)](function (_0x228932) {
    const _0x304182 = _0x4518ba;
    return _0x228932[_0x304182(0x35a)] && _0x228932['description'][_0x304182(0x3cf)]('[' + label + ']');
  })[0x0];
(VisuMZ[label][_0x4518ba(0x1ef)] = VisuMZ[label][_0x4518ba(0x1ef)] || {}),
  (VisuMZ[_0x4518ba(0x216)] = function (_0x48416a, _0x591d47) {
    const _0x4c2c90 = _0x4518ba;
    for (const _0x35418 in _0x591d47) {
      if (_0x35418['match'](/(.*):(.*)/i)) {
        const _0xf558d8 = String(RegExp['$1']),
          _0x324358 = String(RegExp['$2'])[_0x4c2c90(0x279)]()[_0x4c2c90(0x3ec)]();
        let _0x5ca640, _0x235305, _0x1d12ef;
        switch (_0x324358) {
          case _0x4c2c90(0x36c):
            _0x5ca640 = _0x591d47[_0x35418] !== '' ? Number(_0x591d47[_0x35418]) : 0x0;
            break;
          case _0x4c2c90(0x3a6):
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON['parse'](_0x591d47[_0x35418]) : []), (_0x5ca640 = _0x235305[_0x4c2c90(0x25e)](_0x11cb99 => Number(_0x11cb99)));
            break;
          case 'EVAL':
            _0x5ca640 = _0x591d47[_0x35418] !== '' ? eval(_0x591d47[_0x35418]) : null;
            break;
          case _0x4c2c90(0x2c0):
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418]) : []), (_0x5ca640 = _0x235305[_0x4c2c90(0x25e)](_0x229dce => eval(_0x229dce)));
            break;
          case _0x4c2c90(0x270):
            _0x5ca640 = _0x591d47[_0x35418] !== '' ? JSON['parse'](_0x591d47[_0x35418]) : '';
            break;
          case _0x4c2c90(0x309):
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418]) : []), (_0x5ca640 = _0x235305[_0x4c2c90(0x25e)](_0x1ba505 => JSON['parse'](_0x1ba505)));
            break;
          case _0x4c2c90(0x32c):
            _0x5ca640 = _0x591d47[_0x35418] !== '' ? new Function(JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418])) : new Function(_0x4c2c90(0x436));
            break;
          case 'ARRAYFUNC':
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418]) : []),
              (_0x5ca640 = _0x235305[_0x4c2c90(0x25e)](_0x233ef4 => new Function(JSON[_0x4c2c90(0x26d)](_0x233ef4))));
            break;
          case _0x4c2c90(0x2ae):
            _0x5ca640 = _0x591d47[_0x35418] !== '' ? String(_0x591d47[_0x35418]) : '';
            break;
          case _0x4c2c90(0x252):
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418]) : []), (_0x5ca640 = _0x235305['map'](_0x717175 => String(_0x717175)));
            break;
          case _0x4c2c90(0x1de):
            (_0x1d12ef = _0x591d47[_0x35418] !== '' ? JSON['parse'](_0x591d47[_0x35418]) : {}), (_0x5ca640 = VisuMZ['ConvertParams']({}, _0x1d12ef));
            break;
          case _0x4c2c90(0x30c):
            (_0x235305 = _0x591d47[_0x35418] !== '' ? JSON[_0x4c2c90(0x26d)](_0x591d47[_0x35418]) : []),
              (_0x5ca640 = _0x235305[_0x4c2c90(0x25e)](_0x151a0c => VisuMZ['ConvertParams']({}, JSON[_0x4c2c90(0x26d)](_0x151a0c))));
            break;
          default:
            continue;
        }
        _0x48416a[_0xf558d8] = _0x5ca640;
      }
    }
    return _0x48416a;
  }),
  (_0x343751 => {
    const _0x258701 = _0x4518ba,
      _0x44952a = _0x343751[_0x258701(0x2ed)];
    for (const _0x434825 of dependencies) {
      if (!Imported[_0x434825]) {
        alert(_0x258701(0x1d2)[_0x258701(0x27b)](_0x44952a, _0x434825)), SceneManager[_0x258701(0x326)]();
        break;
      }
    }
    const _0x59d13a = _0x343751[_0x258701(0x37b)];
    if (_0x59d13a['match'](/\[Version[ ](.*?)\]/i)) {
      const _0x56731a = Number(RegExp['$1']);
      _0x56731a !== VisuMZ[label][_0x258701(0x22d)] && (alert(_0x258701(0x330)[_0x258701(0x27b)](_0x44952a, _0x56731a)), SceneManager[_0x258701(0x326)]());
    }
    if (_0x59d13a[_0x258701(0x2a3)](/\[Tier[ ](\d+)\]/i)) {
      const _0x228f67 = Number(RegExp['$1']);
      _0x228f67 < tier
        ? (alert(
            '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
              _0x258701(0x27b)
            ](_0x44952a, _0x228f67, tier),
          ),
          SceneManager['exit']())
        : (tier = Math[_0x258701(0x3e3)](_0x228f67, tier));
    }
    VisuMZ['ConvertParams'](VisuMZ[label][_0x258701(0x1ef)], _0x343751[_0x258701(0x231)]);
  })(pluginData),
  PluginManager[_0x4518ba(0x398)](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x253), _0x1f9b22 => {
    const _0x30c8c9 = _0x4518ba;
    VisuMZ[_0x30c8c9(0x216)](_0x1f9b22, _0x1f9b22);
    const _0x309e84 = _0x1f9b22[_0x30c8c9(0x2f7)],
      _0x343f6e = _0x1f9b22[_0x30c8c9(0x3e5)];
    for (const _0x5f55cf of _0x309e84) {
      const _0x438db3 = $gameActors[_0x30c8c9(0x202)](_0x5f55cf);
      if (!_0x438db3) continue;
      (_0x438db3[_0x30c8c9(0x316)] = 'icon'), (_0x438db3[_0x30c8c9(0x214)] = _0x343f6e);
    }
  }),
  PluginManager[_0x4518ba(0x398)](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x337), _0x877226 => {
    const _0x15c66a = _0x4518ba;
    VisuMZ[_0x15c66a(0x216)](_0x877226, _0x877226);
    const _0x42bce3 = _0x877226[_0x15c66a(0x2f7)],
      _0x5dd025 = _0x877226[_0x15c66a(0x374)],
      _0x2129df = _0x877226[_0x15c66a(0x20c)];
    for (const _0x2b3c42 of _0x42bce3) {
      const _0x44a6f5 = $gameActors[_0x15c66a(0x202)](_0x2b3c42);
      if (!_0x44a6f5) continue;
      (_0x44a6f5[_0x15c66a(0x316)] = _0x15c66a(0x2c5)), (_0x44a6f5[_0x15c66a(0x3f8)] = _0x5dd025), (_0x44a6f5['_btbTurnOrderFaceIndex'] = _0x2129df);
    }
  }),
  PluginManager[_0x4518ba(0x398)](pluginData['name'], _0x4518ba(0x335), _0x145f1c => {
    const _0x33e1a0 = _0x4518ba;
    VisuMZ[_0x33e1a0(0x216)](_0x145f1c, _0x145f1c);
    const _0x36a9cc = _0x145f1c['Actors'];
    for (const _0x3f1bc0 of _0x36a9cc) {
      const _0x100245 = $gameActors[_0x33e1a0(0x202)](_0x3f1bc0);
      if (!_0x100245) continue;
      _0x100245[_0x33e1a0(0x1e2)]();
    }
  }),
  PluginManager[_0x4518ba(0x398)](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x26e), _0x367d10 => {
    const _0x2ea1ea = _0x4518ba;
    VisuMZ[_0x2ea1ea(0x216)](_0x367d10, _0x367d10);
    const _0x42dc4c = _0x367d10['Enemies'],
      _0x32fcf5 = _0x367d10[_0x2ea1ea(0x3e5)];
    for (const _0x3ec69c of _0x42dc4c) {
      const _0x20887d = $gameTroop['members']()[_0x3ec69c];
      if (!_0x20887d) continue;
      (_0x20887d['_btbTurnOrderGraphicType'] = _0x2ea1ea(0x33d)), (_0x20887d[_0x2ea1ea(0x214)] = _0x32fcf5);
    }
  }),
  PluginManager[_0x4518ba(0x398)](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x275), _0x4abec5 => {
    const _0x4869e2 = _0x4518ba;
    VisuMZ[_0x4869e2(0x216)](_0x4abec5, _0x4abec5);
    const _0x27386a = _0x4abec5[_0x4869e2(0x2aa)],
      _0xba8183 = _0x4abec5[_0x4869e2(0x374)],
      _0x5b56e4 = _0x4abec5[_0x4869e2(0x20c)];
    for (const _0x58d75f of _0x27386a) {
      const _0x158a64 = $gameTroop[_0x4869e2(0x28b)]()[_0x58d75f];
      if (!_0x158a64) continue;
      (_0x158a64[_0x4869e2(0x316)] = 'face'), (_0x158a64[_0x4869e2(0x3f8)] = _0xba8183), (_0x158a64[_0x4869e2(0x3df)] = _0x5b56e4);
    }
  }),
  PluginManager[_0x4518ba(0x398)](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x3a5), _0x35ad95 => {
    const _0x586422 = _0x4518ba;
    VisuMZ[_0x586422(0x216)](_0x35ad95, _0x35ad95);
    const _0x4b71a6 = _0x35ad95[_0x586422(0x2aa)];
    for (const _0x3c2646 of _0x4b71a6) {
      const _0x31f9e2 = $gameTroop['members']()[_0x3c2646];
      if (!_0x31f9e2) continue;
      _0x31f9e2[_0x586422(0x1e2)]();
    }
  }),
  PluginManager['registerCommand'](pluginData[_0x4518ba(0x2ed)], _0x4518ba(0x386), _0x5629a9 => {
    const _0x16315f = _0x4518ba;
    VisuMZ[_0x16315f(0x216)](_0x5629a9, _0x5629a9);
    const _0x440a00 = _0x5629a9[_0x16315f(0x2e0)];
    $gameSystem[_0x16315f(0x42b)](_0x440a00);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x2fb)] = {
    EnemyMultiAction: /<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,
    BravePointCost: /<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,
    BravePointSetUser: /<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,
    BravePointSetTarget: /<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,
    BravePointAlterUser: /<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,
    BravePointAlterTarget: /<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,
    HideBravePointCost: /<BTB HIDE (?:BRAVE|BP) COST>/i,
    BTB_Help: /<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,
    FusionFlex: /<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,
    FusionStrict: /<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,
    JsBravePointsUser: /<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,
    JsBravePointsTarget: /<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,
    BravePointBattleStart: /<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,
    BravePointRegen: /<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,
    MaxBravePoints: /<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,
    MinBravePoints: /<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,
    MaxActions: /<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,
    CannotBrave: /<BTB CANNOT BRAVE>/i,
    HideBrave: /<BTB HIDE BRAVE>/i,
    CannotFusion: /<BTB CANNOT FUSION>/i,
    EnableFusion: /<BTB ENABLE FUSION>/i,
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x3d3)] = Scene_Boot[_0x4518ba(0x39c)][_0x4518ba(0x381)]),
  (Scene_Boot[_0x4518ba(0x39c)]['onDatabaseLoaded'] = function () {
    const _0x32b744 = _0x4518ba;
    VisuMZ[_0x32b744(0x3bc)][_0x32b744(0x3d3)]['call'](this), this[_0x32b744(0x41d)]();
  }),
  (Scene_Boot[_0x4518ba(0x39c)][_0x4518ba(0x41d)] = function () {
    this['process_VisuMZ_BattleSystemBTB_Notetags'](), this['process_VisuMZ_BattleSystemBTB_JS']();
  }),
  (Scene_Boot[_0x4518ba(0x39c)][_0x4518ba(0x350)] = function () {
    const _0x1dddc6 = _0x4518ba;
    if (VisuMZ[_0x1dddc6(0x327)]) return;
    const _0x490df3 = $dataSkills[_0x1dddc6(0x27a)]($dataItems);
    for (const _0x4e8443 of _0x490df3) {
      if (!_0x4e8443) continue;
      DataManager['btbRegisterFusions'](_0x4e8443);
    }
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['JS'] = {}),
  (Scene_Boot[_0x4518ba(0x39c)]['process_VisuMZ_BattleSystemBTB_JS'] = function () {
    const _0x3b1650 = _0x4518ba;
    if (VisuMZ[_0x3b1650(0x327)]) return;
    const _0x143a6b = VisuMZ[_0x3b1650(0x3bc)][_0x3b1650(0x2fb)],
      _0x942d9a = $dataSkills['concat'](dataItems);
    for (const _0x55218a of _0x942d9a) {
      if (!_0x55218a) continue;
      VisuMZ[_0x3b1650(0x3bc)][_0x3b1650(0x1d7)](_0x55218a, _0x3b1650(0x2e3)), VisuMZ['BattleSystemBTB'][_0x3b1650(0x1d7)](_0x55218a, 'JsBravePointsTarget');
    }
  }),
  (VisuMZ['BattleSystemBTB']['Parse_Notetags_BravePointsUserJS'] = function (_0x5e1445, _0x31742d) {
    const _0x60fe6 = _0x4518ba,
      _0x15058a = VisuMZ[_0x60fe6(0x3bc)][_0x60fe6(0x2fb)][_0x31742d],
      _0x281991 = _0x5e1445[_0x60fe6(0x38b)];
    if (_0x281991[_0x60fe6(0x2a3)](_0x15058a)) {
      const _0x166033 = String(RegExp['$1']),
        _0x1b9c1d = _0x60fe6(0x307)[_0x60fe6(0x27b)](_0x166033),
        _0x50f9c6 = VisuMZ[_0x60fe6(0x3bc)]['createKeyJS'](_0x5e1445, _0x31742d);
      VisuMZ['BattleSystemBTB']['JS'][_0x50f9c6] = new Function(_0x1b9c1d);
    }
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2a8)] = function (_0x5921d3, _0xe0d16a) {
    const _0x1fb9ad = _0x4518ba;
    if (VisuMZ[_0x1fb9ad(0x2a8)]) return VisuMZ[_0x1fb9ad(0x2a8)](_0x5921d3, _0xe0d16a);
    let _0x4286ee = '';
    if ($dataActors[_0x1fb9ad(0x3cf)](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x3bf)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataClasses[_0x1fb9ad(0x3cf)](_0x5921d3)) _0x4286ee = 'Class-%1-%2'[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataSkills['includes'](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x2ab)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataItems['includes'](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x2f6)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataWeapons['includes'](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x273)['format'](_0x5921d3['id'], _0xe0d16a);
    if ($dataArmors['includes'](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x3b5)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataEnemies['includes'](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x21b)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    if ($dataStates[_0x1fb9ad(0x3cf)](_0x5921d3)) _0x4286ee = _0x1fb9ad(0x366)[_0x1fb9ad(0x27b)](_0x5921d3['id'], _0xe0d16a);
    return _0x4286ee;
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x421)] = VisuMZ[_0x4518ba(0x421)]),
  (VisuMZ['ParseSkillNotetags'] = function (_0xd2b173) {
    const _0x5f121a = _0x4518ba;
    VisuMZ[_0x5f121a(0x3bc)]['ParseSkillNotetags'][_0x5f121a(0x2e6)](this, _0xd2b173),
      DataManager[_0x5f121a(0x3e6)](_0xd2b173),
      VisuMZ[_0x5f121a(0x3bc)][_0x5f121a(0x1d7)](_0xd2b173, _0x5f121a(0x2e3)),
      VisuMZ[_0x5f121a(0x3bc)][_0x5f121a(0x1d7)](_0xd2b173, _0x5f121a(0x203));
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2ba)] = VisuMZ[_0x4518ba(0x2ba)]),
  (VisuMZ[_0x4518ba(0x2ba)] = function (_0x2542e4) {
    const _0x206e4b = _0x4518ba;
    VisuMZ['BattleSystemBTB']['ParseItemNotetags'][_0x206e4b(0x2e6)](this, _0x2542e4),
      DataManager[_0x206e4b(0x3e6)](_0x2542e4),
      VisuMZ[_0x206e4b(0x3bc)]['Parse_Notetags_BravePointsUserJS'](_0x2542e4, 'JsBravePointsUser'),
      VisuMZ[_0x206e4b(0x3bc)][_0x206e4b(0x1d7)](_0x2542e4, 'JsBravePointsTarget');
  }),
  (DataManager['getSkillIdWithName'] = function (_0x215ea7) {
    const _0x2f4528 = _0x4518ba;
    (_0x215ea7 = _0x215ea7['toUpperCase']()[_0x2f4528(0x3ec)]()), (this[_0x2f4528(0x314)] = this[_0x2f4528(0x314)] || {});
    if (this['_skillIDs'][_0x215ea7]) return this[_0x2f4528(0x314)][_0x215ea7];
    for (const _0x4190a2 of $dataSkills) {
      if (!_0x4190a2) continue;
      this[_0x2f4528(0x314)][_0x4190a2[_0x2f4528(0x2ed)][_0x2f4528(0x279)]()[_0x2f4528(0x3ec)]()] = _0x4190a2['id'];
    }
    return this[_0x2f4528(0x314)][_0x215ea7] || 0x0;
  }),
  (DataManager[_0x4518ba(0x351)] = function (_0x4fdef9) {
    const _0x405c23 = _0x4518ba;
    (_0x4fdef9 = _0x4fdef9[_0x405c23(0x279)]()[_0x405c23(0x3ec)]()), (this[_0x405c23(0x3a1)] = this[_0x405c23(0x3a1)] || {});
    if (this['_itemIDs'][_0x4fdef9]) return this['_itemIDs'][_0x4fdef9];
    for (const _0x35d079 of $dataItems) {
      if (!_0x35d079) continue;
      this['_itemIDs'][_0x35d079[_0x405c23(0x2ed)][_0x405c23(0x279)]()[_0x405c23(0x3ec)]()] = _0x35d079['id'];
    }
    return this[_0x405c23(0x3a1)][_0x4fdef9] || 0x0;
  }),
  (DataManager[_0x4518ba(0x369)] = {}),
  (DataManager['_btbSkillStrictFusion'] = {}),
  (DataManager['_btbItemFlexFusion'] = {}),
  (DataManager[_0x4518ba(0x360)] = {}),
  (DataManager[_0x4518ba(0x3e6)] = function (_0x1869de) {
    const _0x5b901e = _0x4518ba;
    if (!_0x1869de) return;
    const _0x2c3e3f = VisuMZ[_0x5b901e(0x3bc)][_0x5b901e(0x2fb)],
      _0x35f006 = _0x1869de['note'],
      _0x4a2346 = DataManager['isSkill'](_0x1869de),
      _0x325ac5 = _0x35f006[_0x5b901e(0x2a3)](_0x2c3e3f['FusionFlex']);
    if (_0x325ac5)
      for (const _0x26d73c of _0x325ac5) {
        if (!_0x26d73c) continue;
        _0x26d73c['match'](_0x2c3e3f[_0x5b901e(0x2df)]);
        const _0xd0b5b6 = String(RegExp['$1'])['split'](','),
          _0x3c354d = this[_0x5b901e(0x338)](_0xd0b5b6, _0x4a2346)[_0x5b901e(0x3c7)]((_0x383404, _0x3283ef) => _0x383404 - _0x3283ef);
        if (_0x3c354d[_0x5b901e(0x329)] <= 0x1) continue;
        const _0x2b1fcf = _0x3c354d[_0x5b901e(0x411)]('-'),
          _0x58bff2 = _0x4a2346 ? DataManager['_btbSkillFlexFusion'] : DataManager[_0x5b901e(0x2bd)];
        _0x58bff2[_0x2b1fcf] = _0x1869de['id'];
      }
    const _0x6b35eb = _0x35f006[_0x5b901e(0x2a3)](_0x2c3e3f['FusionStrict']);
    if (_0x6b35eb)
      for (const _0x40486b of _0x6b35eb) {
        if (!_0x40486b) continue;
        _0x40486b[_0x5b901e(0x2a3)](_0x2c3e3f[_0x5b901e(0x1f1)]);
        const _0x38e8b6 = String(RegExp['$1'])[_0x5b901e(0x2fc)](','),
          _0x4a4d88 = this[_0x5b901e(0x338)](_0x38e8b6, _0x4a2346);
        if (_0x4a4d88[_0x5b901e(0x329)] <= 0x1) continue;
        const _0x2ce442 = _0x4a4d88[_0x5b901e(0x411)]('-'),
          _0x5c279a = _0x4a2346 ? DataManager['_btbSkillStrictFusion'] : DataManager['_btbItemStrictFusion'];
        _0x5c279a[_0x2ce442] = _0x1869de['id'];
      }
  }),
  (DataManager[_0x4518ba(0x338)] = function (_0x587ec8, _0x4e5e09) {
    const _0x495b19 = _0x4518ba,
      _0x19302f = [];
    for (let _0x384cbb of _0x587ec8) {
      _0x384cbb = (String(_0x384cbb) || '')['trim']();
      const _0x4fb614 = /^\d+$/['test'](_0x384cbb);
      if (_0x4fb614) _0x19302f[_0x495b19(0x3f5)](Number(_0x384cbb));
      else _0x4e5e09 ? _0x19302f[_0x495b19(0x3f5)](DataManager['getSkillIdWithName'](_0x384cbb)) : _0x19302f[_0x495b19(0x3f5)](DataManager['getItemIdWithName'](_0x384cbb));
    }
    return _0x19302f;
  }),
  (ImageManager[_0x4518ba(0x3be)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x402)]['BravePointsIcon']),
  (ImageManager[_0x4518ba(0x3e2)] = ImageManager[_0x4518ba(0x3e2)] || 0x9),
  (ImageManager[_0x4518ba(0x292)] = ImageManager['svActorVertCells'] || 0x6),
  (TextManager[_0x4518ba(0x3a4)] = VisuMZ[_0x4518ba(0x3bc)]['Settings'][_0x4518ba(0x402)][_0x4518ba(0x2f9)]),
  (TextManager[_0x4518ba(0x414)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x402)]['BravePointsAbbr']),
  (TextManager[_0x4518ba(0x367)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x402)]['BravePointCostFmt']),
  (TextManager[_0x4518ba(0x3ed)] = VisuMZ['BattleSystemBTB'][_0x4518ba(0x1ef)][_0x4518ba(0x1d5)]['CommandName']),
  (TextManager[_0x4518ba(0x2b3)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x1d5)][_0x4518ba(0x315)]),
  (TextManager[_0x4518ba(0x3fa)] = VisuMZ['BattleSystemBTB'][_0x4518ba(0x1ef)][_0x4518ba(0x1d5)][_0x4518ba(0x2cb)]),
  (SceneManager[_0x4518ba(0x1fe)] = function () {
    const _0x31c6db = _0x4518ba;
    return this[_0x31c6db(0x243)] && this['_scene'][_0x31c6db(0x3f7)] === Scene_Battle;
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2c6)] = BattleManager[_0x4518ba(0x1f6)]),
  (BattleManager[_0x4518ba(0x1f6)] = function () {
    const _0x3b67d1 = _0x4518ba;
    if (this[_0x3b67d1(0x34d)]()) return _0x3b67d1(0x331);
    return VisuMZ[_0x3b67d1(0x3bc)][_0x3b67d1(0x2c6)][_0x3b67d1(0x2e6)](this);
  }),
  (BattleManager[_0x4518ba(0x34d)] = function () {
    const _0x49a055 = _0x4518ba;
    return $gameSystem[_0x49a055(0x263)]() === _0x49a055(0x331);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x228)] = BattleManager['isTpb']),
  (BattleManager['isTpb'] = function () {
    const _0x1cb503 = _0x4518ba;
    if (this['isBTB']()) return ![];
    return VisuMZ[_0x1cb503(0x3bc)][_0x1cb503(0x228)]['call'](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2c1)] = BattleManager[_0x4518ba(0x401)]),
  (BattleManager['isActiveTpb'] = function () {
    const _0x3695d9 = _0x4518ba;
    if (this[_0x3695d9(0x34d)]()) return ![];
    return VisuMZ[_0x3695d9(0x3bc)][_0x3695d9(0x2c1)][_0x3695d9(0x2e6)](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ea)] = BattleManager['isTurnBased']),
  (BattleManager['isTurnBased'] = function () {
    const _0x52981a = _0x4518ba;
    if (this[_0x52981a(0x34d)]()) return !![];
    return VisuMZ['BattleSystemBTB'][_0x52981a(0x1ea)]['call'](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x272)] = BattleManager[_0x4518ba(0x2e4)]),
  (BattleManager['startInput'] = function () {
    const _0xa3e5d5 = _0x4518ba;
    VisuMZ[_0xa3e5d5(0x3bc)][_0xa3e5d5(0x272)][_0xa3e5d5(0x2e6)](this),
      this[_0xa3e5d5(0x34d)]() && this[_0xa3e5d5(0x304)]() && !this[_0xa3e5d5(0x3d7)] && $gameParty[_0xa3e5d5(0x29e)]() && this[_0xa3e5d5(0x3d8)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x385)] = BattleManager[_0x4518ba(0x341)]),
  (BattleManager[_0x4518ba(0x341)] = function () {
    const _0x4939ec = _0x4518ba;
    VisuMZ[_0x4939ec(0x3bc)][_0x4939ec(0x385)][_0x4939ec(0x2e6)](this), this[_0x4939ec(0x259)]();
  }),
  (BattleManager[_0x4518ba(0x259)] = function () {
    const _0x1ae74b = _0x4518ba;
    if (!SceneManager['isSceneBattle']()) return;
    if (!this[_0x1ae74b(0x34d)]()) return;
    const _0x395529 = SceneManager[_0x1ae74b(0x243)];
    if (!_0x395529) return;
    const _0x4e2b1d = _0x395529[_0x1ae74b(0x405)];
    if (!_0x4e2b1d) return;
    _0x4e2b1d['requestRefresh']();
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['BattleManager_makeActionOrders'] = BattleManager['makeActionOrders']),
  (BattleManager['makeActionOrders'] = function () {
    const _0x266de2 = _0x4518ba;
    VisuMZ[_0x266de2(0x3bc)][_0x266de2(0x358)][_0x266de2(0x2e6)](this),
      this[_0x266de2(0x34d)]() &&
        ((this[_0x266de2(0x240)] = this[_0x266de2(0x240)][_0x266de2(0x286)](_0xa654f9 => _0xa654f9 && _0xa654f9['_actions'][_0x266de2(0x329)] > 0x0)), this[_0x266de2(0x268)]());
  }),
  (BattleManager[_0x4518ba(0x235)] = function () {
    const _0x475424 = _0x4518ba;
    if (!this[_0x475424(0x34d)]()) return;
    if (!SceneManager[_0x475424(0x1fe)]()) return;
    const _0x80b074 = this[_0x475424(0x240)];
    for (const _0x52bb27 of _0x80b074) {
      _0x52bb27[_0x475424(0x324)]();
    }
    _0x80b074[_0x475424(0x3c7)]((_0x3f9957, _0x17bb17) => _0x17bb17[_0x475424(0x394)]() - _0x3f9957['speed']()), this[_0x475424(0x34d)]() && this[_0x475424(0x268)]();
  }),
  (BattleManager[_0x4518ba(0x357)] = function () {
    const _0x3fe541 = _0x4518ba;
    if (!this['isBTB']()) return;
    (this[_0x3fe541(0x240)] = this[_0x3fe541(0x240)] || []),
      (this[_0x3fe541(0x240)] = this[_0x3fe541(0x240)][_0x3fe541(0x286)](_0x21206c => _0x21206c && _0x21206c['isAppeared']() && _0x21206c['isAlive']())),
      this[_0x3fe541(0x268)]();
  }),
  (BattleManager[_0x4518ba(0x268)] = function (_0x1bbbb0) {
    const _0x3594e7 = _0x4518ba;
    if (!this['isBTB']()) return;
    const _0x3b852c = SceneManager[_0x3594e7(0x243)]['_btbTurnOrderWindow'];
    if (!_0x3b852c) return;
    _0x3b852c[_0x3594e7(0x22c)](_0x1bbbb0);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x3b0)] = BattleManager[_0x4518ba(0x418)]),
  (BattleManager[_0x4518ba(0x418)] = function () {
    const _0x3ada22 = _0x4518ba;
    BattleManager[_0x3ada22(0x34d)]() && this['_subject'] && this[_0x3ada22(0x3ac)][_0x3ada22(0x33a)](), VisuMZ[_0x3ada22(0x3bc)][_0x3ada22(0x3b0)][_0x3ada22(0x2e6)](this);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x2e5)] = Game_System['prototype']['initialize']),
  (Game_System['prototype'][_0x4518ba(0x33b)] = function () {
    const _0x41ce5f = _0x4518ba;
    VisuMZ['BattleSystemBTB']['Game_System_initialize'][_0x41ce5f(0x2e6)](this), this[_0x41ce5f(0x225)]();
  }),
  (Game_System['prototype'][_0x4518ba(0x225)] = function () {
    const _0x8cf377 = _0x4518ba;
    this[_0x8cf377(0x419)] = !![];
  }),
  (Game_System['prototype'][_0x4518ba(0x220)] = function () {
    const _0x137c00 = _0x4518ba;
    return this[_0x137c00(0x419)] === undefined && this[_0x137c00(0x225)](), this['_btbTurnOrderVisible'];
  }),
  (Game_System['prototype'][_0x4518ba(0x42b)] = function (_0x46af6a) {
    const _0x1caf24 = _0x4518ba;
    this[_0x1caf24(0x419)] === undefined && this[_0x1caf24(0x225)](), (this[_0x1caf24(0x419)] = _0x46af6a);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Game_Action_isValid'] = Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x29a)]),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x29a)] = function () {
    const _0x93bad6 = _0x4518ba;
    if ($gameParty['inBattle']() && BattleManager[_0x93bad6(0x34d)]()) {
      if (this[_0x93bad6(0x37a)]() === null) return ![];
    }
    return VisuMZ[_0x93bad6(0x3bc)][_0x93bad6(0x28c)][_0x93bad6(0x2e6)](this);
  }),
  (VisuMZ['BattleSystemBTB']['Game_Action_applyItemUserEffect'] = Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x37f)]),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x37f)] = function (_0x39c75d) {
    const _0x586e3f = _0x4518ba;
    VisuMZ[_0x586e3f(0x3bc)][_0x586e3f(0x32e)][_0x586e3f(0x2e6)](this, _0x39c75d), this[_0x586e3f(0x1dc)](_0x39c75d);
  }),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x1dc)] = function (_0x129010) {
    const _0x2692de = _0x4518ba;
    if (!BattleManager['isBTB']()) return;
    if (this['item']()) this[_0x2692de(0x1dd)](_0x129010);
  }),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x1dd)] = function (_0x2f420f) {
    const _0x448646 = _0x4518ba,
      _0x1355c2 = VisuMZ[_0x448646(0x3bc)]['RegExp'],
      _0x37974a = this[_0x448646(0x37a)]()['note'],
      _0x33d0f5 = this[_0x448646(0x37a)]();
    if (this['subject']()) {
      if (_0x37974a['match'](_0x1355c2['BravePointSetUser'])) {
        const _0x1a0fb7 = Number(RegExp['$1']);
        this[_0x448646(0x34e)]()[_0x448646(0x26c)](_0x1a0fb7);
      }
      if (_0x37974a['match'](_0x1355c2[_0x448646(0x2a6)])) {
        const _0x45b8f8 = Number(RegExp['$1']);
        this[_0x448646(0x34e)]()[_0x448646(0x232)](_0x45b8f8);
      }
      const _0x35d905 = _0x448646(0x2e3),
        _0x29390b = VisuMZ[_0x448646(0x3bc)]['createKeyJS'](_0x33d0f5, _0x35d905);
      if (VisuMZ[_0x448646(0x3bc)]['JS'][_0x29390b]) {
        const _0x5d188e = VisuMZ[_0x448646(0x3bc)]['JS'][_0x29390b][_0x448646(0x2e6)](this, this[_0x448646(0x34e)](), _0x2f420f, this[_0x448646(0x34e)]()[_0x448646(0x2ec)]());
        this[_0x448646(0x34e)]()[_0x448646(0x26c)](_0x5d188e);
      }
    }
    if (_0x2f420f) {
      if (_0x37974a[_0x448646(0x2a3)](_0x1355c2['BravePointSetTarget'])) {
        const _0x35ec94 = Number(RegExp['$1']);
        _0x2f420f[_0x448646(0x26c)](_0x35ec94);
      }
      if (_0x37974a[_0x448646(0x2a3)](_0x1355c2[_0x448646(0x239)])) {
        const _0x2198aa = Number(RegExp['$1']);
        _0x2f420f['gainBravePoints'](_0x2198aa);
      }
      const _0x34028b = 'JsBravePointsTarget',
        _0x55acf0 = VisuMZ['BattleSystemBTB'][_0x448646(0x2a8)](_0x33d0f5, _0x34028b);
      if (VisuMZ[_0x448646(0x3bc)]['JS'][_0x55acf0]) {
        const _0x3169d8 = VisuMZ[_0x448646(0x3bc)]['JS'][_0x55acf0][_0x448646(0x2e6)](this, this[_0x448646(0x34e)](), _0x2f420f, _0x2f420f[_0x448646(0x2ec)]());
        _0x2f420f[_0x448646(0x26c)](_0x3169d8);
      }
    }
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2d4)] = Game_Action[_0x4518ba(0x39c)]['speed']),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x394)] = function () {
    const _0x386868 = _0x4518ba;
    return BattleManager[_0x386868(0x34d)]()
      ? VisuMZ['BattleSystemBTB'][_0x386868(0x1ef)]['Mechanics'][_0x386868(0x300)][_0x386868(0x2e6)](this)
      : VisuMZ[_0x386868(0x3bc)][_0x386868(0x2d4)]['call'](this);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x410)] = Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x293)]),
  (Game_Action[_0x4518ba(0x39c)]['allowRandomSpeed'] = function () {
    const _0x58e0dd = _0x4518ba;
    return BattleManager['isBTB']() ? VisuMZ[_0x58e0dd(0x3bc)][_0x58e0dd(0x1ef)]['Mechanics'][_0x58e0dd(0x229)] : VisuMZ[_0x58e0dd(0x3bc)]['Game_Action_allowRandomSpeed']['call'](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Game_Action_setSkill'] = Game_Action[_0x4518ba(0x39c)]['setSkill']),
  (Game_Action['prototype'][_0x4518ba(0x31c)] = function (_0x423e49) {
    const _0x3c7c14 = _0x4518ba;
    VisuMZ[_0x3c7c14(0x3bc)]['Game_Action_setSkill'][_0x3c7c14(0x2e6)](this, _0x423e49), BattleManager['sortActionOrdersBTB']();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x404)] = Game_Action['prototype']['setItem']),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x3fc)] = function (_0x2357ba) {
    const _0x19c612 = _0x4518ba;
    VisuMZ[_0x19c612(0x3bc)][_0x19c612(0x404)]['call'](this, _0x2357ba), BattleManager['sortActionOrdersBTB']();
  }),
  (Game_Action[_0x4518ba(0x39c)]['setActionFusionBTB'] = function (_0x75993f) {
    const _0x2c1662 = _0x4518ba;
    this[_0x2c1662(0x38f)] = _0x75993f;
  }),
  (Game_Action['prototype']['getTotalActionFusionRecipes'] = function () {
    const _0x5be249 = _0x4518ba;
    if (this[_0x5be249(0x38f)] === undefined) return 0x0;
    return this['_actionFusionRecipe'][_0x5be249(0x2fc)]('-')[_0x5be249(0x329)] - 0x1;
  }),
  (Game_Action[_0x4518ba(0x39c)][_0x4518ba(0x40d)] = function () {
    const _0x25452c = _0x4518ba;
    if (this[_0x25452c(0x38f)] === undefined) return [];
    return this['_actionFusionRecipe'][_0x25452c(0x2fc)]('-')[_0x25452c(0x25e)](_0x1e3e5d => $dataSkills[Number(_0x1e3e5d)]);
  }),
  (Game_Action['prototype']['getActionFusionRecipeItems'] = function () {
    const _0x12b23c = _0x4518ba;
    if (this[_0x12b23c(0x38f)] === undefined) return [];
    return this[_0x12b23c(0x38f)][_0x12b23c(0x2fc)]('-')[_0x12b23c(0x25e)](_0x48ca9c => $dataItems[Number(_0x48ca9c)]);
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)]['bravePoints'] = function () {
    const _0x4fde62 = _0x4518ba;
    return this[_0x4fde62(0x2d8)] || 0x0;
  }),
  (Game_BattlerBase[_0x4518ba(0x255)] = VisuMZ['BattleSystemBTB'][_0x4518ba(0x1ef)][_0x4518ba(0x3dc)][_0x4518ba(0x267)]),
  (Game_BattlerBase[_0x4518ba(0x347)] = VisuMZ['BattleSystemBTB'][_0x4518ba(0x1ef)][_0x4518ba(0x3dc)][_0x4518ba(0x1e1)]),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x3ad)] = function () {
    const _0x2b11f7 = _0x4518ba;
    if (this['cannotBraveTrait']()) return 0x1;
    if (this[_0x2b11f7(0x22f)]()) return 0x1;
    const _0x78b880 = VisuMZ['BattleSystemBTB']['RegExp'],
      _0x462e3a = _0x78b880[_0x2b11f7(0x236)];
    let _0x370bc7 = Game_BattlerBase[_0x2b11f7(0x255)];
    const _0x12c745 = this[_0x2b11f7(0x20d)]();
    for (const _0x50536b of _0x12c745) {
      if (!_0x50536b) continue;
      const _0x4ef9d2 = _0x50536b[_0x2b11f7(0x38b)];
      _0x4ef9d2['match'](_0x462e3a) && (_0x370bc7 += Number(RegExp['$1']));
    }
    return _0x370bc7['clamp'](0x1, Game_BattlerBase['BTB_MAX_ACTIONS_HARD_CAP']);
  }),
  (Game_BattlerBase[_0x4518ba(0x24e)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)]['Mechanics'][_0x4518ba(0x3ea)]),
  (Game_BattlerBase[_0x4518ba(0x250)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x3dc)][_0x4518ba(0x425)]),
  (Game_BattlerBase[_0x4518ba(0x40b)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x3dc)][_0x4518ba(0x2ef)]),
  (Game_BattlerBase['BTB_MIN_BRAVEPOINTS_HARD_CAP'] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x3dc)][_0x4518ba(0x3c2)]),
  (Game_BattlerBase['prototype'][_0x4518ba(0x399)] = function () {
    const _0xaaa7ee = _0x4518ba,
      _0x2151b4 = VisuMZ['BattleSystemBTB']['RegExp'],
      _0x3f6fe1 = _0x2151b4[_0xaaa7ee(0x2b7)];
    let _0x643d8e = Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT'];
    const _0x24f5ca = this[_0xaaa7ee(0x20d)]();
    for (const _0x178790 of _0x24f5ca) {
      if (!_0x178790) continue;
      const _0x9c1031 = _0x178790[_0xaaa7ee(0x38b)];
      _0x9c1031[_0xaaa7ee(0x2a3)](_0x3f6fe1) && (_0x643d8e += Number(RegExp['$1']));
    }
    return Math['min'](_0x643d8e, Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);
  }),
  (Game_BattlerBase['prototype']['minBravePoints'] = function () {
    const _0x5ae551 = _0x4518ba,
      _0x21cf09 = VisuMZ[_0x5ae551(0x3bc)][_0x5ae551(0x2fb)],
      _0x2df0e8 = _0x21cf09[_0x5ae551(0x349)];
    let _0x8ded26 = Game_BattlerBase[_0x5ae551(0x250)];
    const _0x4c645c = this[_0x5ae551(0x20d)]();
    for (const _0x51505f of _0x4c645c) {
      if (!_0x51505f) continue;
      const _0x5652c0 = _0x51505f[_0x5ae551(0x38b)];
      _0x5652c0[_0x5ae551(0x2a3)](_0x2df0e8) && (_0x8ded26 += Number(RegExp['$1']));
    }
    return Math[_0x5ae551(0x3e3)](_0x8ded26, Game_BattlerBase[_0x5ae551(0x254)]);
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x26c)] = function (_0x36a5f8) {
    const _0x5a3ba4 = _0x4518ba;
    (this[_0x5a3ba4(0x2d8)] = Math[_0x5a3ba4(0x29d)](_0x36a5f8, this['maxBravePoints']())), this[_0x5a3ba4(0x33f)]();
  }),
  (Game_BattlerBase['prototype'][_0x4518ba(0x232)] = function (_0x307e96) {
    const _0xddece = _0x4518ba;
    (_0x307e96 += this[_0xddece(0x2d8)] || 0x0), this[_0xddece(0x26c)](_0x307e96);
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x20a)] = function (_0x27ba34) {
    this['gainBravePoints'](-_0x27ba34);
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x3a2)] = function (_0x10eb8b) {
    const _0x1b6e18 = _0x4518ba,
      _0x879895 = VisuMZ[_0x1b6e18(0x3bc)]['Settings'][_0x1b6e18(0x3dc)];
    if (!_0x10eb8b) return _0x879895[_0x1b6e18(0x1fa)];
    if (DataManager[_0x1b6e18(0x3b9)](_0x10eb8b)) {
      if (_0x10eb8b['id'] === this[_0x1b6e18(0x3e0)]()) return 0x0;
      if (this['currentAction']() && this[_0x1b6e18(0x359)]()['item']() === _0x10eb8b && this['currentAction']()[_0x1b6e18(0x3b6)]) return 0x0;
    }
    const _0x445732 = VisuMZ[_0x1b6e18(0x3bc)][_0x1b6e18(0x2fb)],
      _0x414dc5 = _0x10eb8b['note'];
    if (_0x414dc5[_0x1b6e18(0x2a3)](_0x445732[_0x1b6e18(0x432)])) return Number(RegExp['$1']);
    let _0x35dad9 = 0x0;
    if (DataManager[_0x1b6e18(0x3b9)](_0x10eb8b)) _0x35dad9 = _0x879895['BravePointSkillCost'];
    else DataManager[_0x1b6e18(0x2c9)](_0x10eb8b) && (_0x35dad9 = _0x879895['BravePointItemCost']);
    return _0x35dad9[_0x1b6e18(0x376)](0x0, Game_BattlerBase['BTB_MAX_BRAVEPOINTS_HARD_CAP']);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Game_BattlerBase_canUse'] = Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x2c2)]),
  (Game_BattlerBase['prototype']['canUse'] = function (_0x14c50d) {
    const _0x157d24 = _0x4518ba;
    if (_0x14c50d && SceneManager[_0x157d24(0x1fe)]() && BattleManager['isBTB']()) {
      const _0x2dc509 = this[_0x157d24(0x3a2)](_0x14c50d);
      if (this['bravePoints']() - _0x2dc509 < this[_0x157d24(0x20f)]()) return ![];
    }
    return VisuMZ[_0x157d24(0x3bc)][_0x157d24(0x3f2)][_0x157d24(0x2e6)](this, _0x14c50d);
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x383)] = function (_0x475d65) {
    const _0x300c3b = _0x4518ba;
    if (!BattleManager['isBTB']()) return;
    const _0x34e009 = this[_0x300c3b(0x3a2)](_0x475d65);
    this['loseBravePoints'](_0x34e009);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Game_Battler_useItem'] = Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x30a)]),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x30a)] = function (_0x57efef) {
    const _0x40f20a = _0x4518ba;
    if (this[_0x40f20a(0x32b)](_0x57efef)) {
      this[_0x40f20a(0x1d9)](_0x57efef);
      return;
    }
    VisuMZ[_0x40f20a(0x3bc)]['Game_Battler_useItem'][_0x40f20a(0x2e6)](this, _0x57efef), this[_0x40f20a(0x383)](_0x57efef);
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x32b)] = function (_0x1d119c) {
    const _0x1bafbd = _0x4518ba;
    if (!BattleManager[_0x1bafbd(0x34d)]()) return ![];
    if (!SceneManager[_0x1bafbd(0x1fe)]()) return ![];
    if (!this['isActor']()) return ![];
    if (this !== BattleManager['_subject']) return ![];
    if (!this['currentAction']()) return ![];
    if (!this[_0x1bafbd(0x359)]()[_0x1bafbd(0x37a)]()) return ![];
    if (this[_0x1bafbd(0x359)]()[_0x1bafbd(0x37a)]() !== _0x1d119c) return ![];
    if (this[_0x1bafbd(0x359)]()[_0x1bafbd(0x3b9)]()) return this[_0x1bafbd(0x359)]()['getActionFusionRecipeSkills']()['length'] > 0x0;
    else return this['currentAction']()[_0x1bafbd(0x2c9)]() ? this[_0x1bafbd(0x359)]()[_0x1bafbd(0x303)]()[_0x1bafbd(0x329)] > 0x0 : ![];
  }),
  (Game_Battler['prototype'][_0x4518ba(0x1d9)] = function (_0x3ae249) {
    const _0x4d5993 = _0x4518ba;
    if (!SceneManager[_0x4d5993(0x1fe)]()) return;
    DataManager[_0x4d5993(0x3b9)](_0x3ae249) ? this['btbPaySkillFusionCosts']() : this[_0x4d5993(0x26b)]();
  }),
  (Game_Battler[_0x4518ba(0x39c)]['btbPaySkillFusionCosts'] = function () {
    const _0xf1bd95 = _0x4518ba,
      _0x3bebf3 = this[_0xf1bd95(0x359)]()['getActionFusionRecipeSkills']();
    if (!_0x3bebf3) return;
    for (const _0x40fd26 of _0x3bebf3) {
      if (!_0x40fd26) continue;
      if (!this[_0xf1bd95(0x2c2)](_0x40fd26)) return ![];
      VisuMZ[_0xf1bd95(0x3bc)][_0xf1bd95(0x1df)][_0xf1bd95(0x2e6)](this, _0x40fd26), this[_0xf1bd95(0x383)](_0x40fd26);
    }
    return !![];
  }),
  (Game_Battler['prototype']['btbPayItemFusionCosts'] = function () {
    const _0x2d8880 = _0x4518ba,
      _0x249564 = this[_0x2d8880(0x359)]()[_0x2d8880(0x303)]();
    if (!_0x249564) return;
    for (const _0xb9bca4 of _0x249564) {
      if (!_0xb9bca4) continue;
      if (!this[_0x2d8880(0x2c2)](_0xb9bca4)) return ![];
      this['payBravePointsCost'](_0xb9bca4);
    }
    return !![];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x3e1)] = function () {
    const _0x29078d = _0x4518ba,
      _0x4108a2 = this[_0x29078d(0x2ec)]() - this['predictedBravePointCost']() + this['calcRegenBravePoints']();
    return _0x4108a2[_0x29078d(0x376)](Game_BattlerBase[_0x29078d(0x254)], this[_0x29078d(0x399)]());
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x2d2)] = function () {
    const _0x5ac23b = _0x4518ba;
    let _0xbdf05c = 0x0;
    for (const _0x2f9410 of this[_0x5ac23b(0x1d3)]) {
      if (!_0x2f9410) continue;
      const _0x3e2a5a = _0x2f9410[_0x5ac23b(0x37a)]();
      _0xbdf05c += this[_0x5ac23b(0x3a2)](_0x3e2a5a);
    }
    return _0xbdf05c;
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2b2)] = Game_BattlerBase['prototype']['canInput']),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x29e)] = function () {
    const _0x53cce6 = _0x4518ba;
    return BattleManager['isBTB']() && this['bravePoints']() < 0x0 ? ![] : VisuMZ[_0x53cce6(0x3bc)][_0x53cce6(0x2b2)][_0x53cce6(0x2e6)](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x310)] = Game_BattlerBase['prototype'][_0x4518ba(0x40c)]),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x40c)] = function () {
    const _0x4b1895 = _0x4518ba;
    return BattleManager['isBTB']() && this[_0x4b1895(0x2e1)]() > 0x1 ? ![] : VisuMZ['BattleSystemBTB'][_0x4b1895(0x310)][_0x4b1895(0x2e6)](this);
  }),
  (Game_BattlerBase['prototype'][_0x4518ba(0x301)] = function () {
    const _0x256670 = _0x4518ba;
    if (this[_0x256670(0x2a4)]()) return ![];
    return this[_0x256670(0x2e1)]() < this[_0x256670(0x3ad)]() && this[_0x256670(0x2d8)] > this[_0x256670(0x20f)]();
  }),
  (Game_BattlerBase['prototype']['cannotBraveTrait'] = function () {
    const _0x12ee86 = _0x4518ba,
      _0x4be89f = VisuMZ[_0x12ee86(0x3bc)][_0x12ee86(0x2fb)],
      _0x5f5009 = _0x4be89f['CannotBrave'];
    return this[_0x12ee86(0x20d)]()[_0x12ee86(0x2ff)](_0x34cff5 => _0x34cff5 && _0x34cff5[_0x12ee86(0x38b)][_0x12ee86(0x2a3)](_0x5f5009));
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x22f)] = function () {
    const _0x64b471 = _0x4518ba,
      _0x35e187 = VisuMZ['BattleSystemBTB'][_0x64b471(0x2fb)],
      _0x3d5d7e = _0x35e187['HideBrave'];
    return this[_0x64b471(0x20d)]()['some'](_0x292264 => _0x292264 && _0x292264[_0x64b471(0x38b)][_0x64b471(0x2a3)](_0x3d5d7e));
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)]['clearTurnOrderBTBGraphics'] = function () {
    const _0x2bc5e3 = _0x4518ba;
    delete this[_0x2bc5e3(0x316)], delete this[_0x2bc5e3(0x3f8)], delete this[_0x2bc5e3(0x3df)], delete this['_btbTurnOrderIconIndex'];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x370)] = function () {
    const _0x4c5576 = _0x4518ba;
    return this[_0x4c5576(0x316)] === undefined && (this[_0x4c5576(0x316)] = this['createTurnOrderBTBGraphicType']()), this[_0x4c5576(0x316)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x3d4)] = function () {
    const _0x277ed3 = _0x4518ba;
    return Window_BTB_TurnOrder[_0x277ed3(0x1ef)][_0x277ed3(0x3ce)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x348)] = function () {
    const _0x83a986 = _0x4518ba;
    return this[_0x83a986(0x3f8)] === undefined && (this[_0x83a986(0x3f8)] = this['createTurnOrderBTBGraphicFaceName']()), this[_0x83a986(0x3f8)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)]['createTurnOrderBTBGraphicFaceName'] = function () {
    const _0x47d561 = _0x4518ba;
    return Window_BTB_TurnOrder['Settings'][_0x47d561(0x247)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x1f3)] = function () {
    const _0x4a212a = _0x4518ba;
    return this[_0x4a212a(0x3df)] === undefined && (this[_0x4a212a(0x3df)] = this[_0x4a212a(0x305)]()), this[_0x4a212a(0x3df)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x305)] = function () {
    const _0x1e6764 = _0x4518ba;
    return Window_BTB_TurnOrder[_0x1e6764(0x1ef)][_0x1e6764(0x25b)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x3d9)] = function () {
    const _0x138337 = _0x4518ba;
    return this[_0x138337(0x214)] === undefined && (this[_0x138337(0x214)] = this[_0x138337(0x27c)]()), this['_btbTurnOrderIconIndex'];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x27c)] = function () {
    const _0x10ee07 = _0x4518ba;
    return Window_BTB_TurnOrder[_0x10ee07(0x1ef)][_0x10ee07(0x238)];
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)]['setBTBGraphicIconIndex'] = function (_0x102600) {
    const _0xb2afc6 = _0x4518ba;
    this[_0xb2afc6(0x214)] = _0x102600;
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x373)] = Game_BattlerBase[_0x4518ba(0x39c)]['hide']),
  (Game_BattlerBase['prototype']['hide'] = function () {
    const _0x372b0f = _0x4518ba;
    VisuMZ[_0x372b0f(0x3bc)][_0x372b0f(0x373)][_0x372b0f(0x2e6)](this), BattleManager[_0x372b0f(0x357)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x201)] = Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x223)]),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x223)] = function () {
    const _0x137b5f = _0x4518ba;
    VisuMZ[_0x137b5f(0x3bc)][_0x137b5f(0x201)][_0x137b5f(0x2e6)](this), BattleManager['removeActionBattlersBTB']();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x355)] = Game_Battler[_0x4518ba(0x39c)]['performCollapse']),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2be)] = function () {
    const _0x65a12e = _0x4518ba;
    VisuMZ[_0x65a12e(0x3bc)][_0x65a12e(0x355)][_0x65a12e(0x2e6)](this), BattleManager[_0x65a12e(0x357)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x423)] = Game_Battler[_0x4518ba(0x39c)]['makeActionTimes']),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2f2)] = function () {
    const _0x55e97c = _0x4518ba;
    return BattleManager[_0x55e97c(0x34d)]() ? 0x1 : VisuMZ[_0x55e97c(0x3bc)][_0x55e97c(0x423)][_0x55e97c(0x2e6)](this);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x2e9)] = Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x308)]),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x308)] = function (_0xebd84f) {
    const _0x1f5ded = _0x4518ba;
    VisuMZ[_0x1f5ded(0x3bc)][_0x1f5ded(0x2e9)][_0x1f5ded(0x2e6)](this, _0xebd84f), this[_0x1f5ded(0x26f)](_0xebd84f);
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x26f)] = function (_0x1b22c8) {
    const _0x33bf1a = _0x4518ba;
    if (!BattleManager[_0x33bf1a(0x34d)]()) return;
    const _0x55796e = VisuMZ['BattleSystemBTB'][_0x33bf1a(0x1ef)][_0x33bf1a(0x3dc)],
      _0x41e86c = VisuMZ[_0x33bf1a(0x3bc)][_0x33bf1a(0x2fb)];
    let _0x35ea9e = _0x1b22c8 ? _0x55796e[_0x33bf1a(0x35f)] : _0x55796e[_0x33bf1a(0x3c8)];
    const _0x499f14 = this[_0x33bf1a(0x20d)]();
    for (const _0x376243 of _0x499f14) {
      if (!_0x376243) continue;
      const _0x203b9e = _0x376243[_0x33bf1a(0x38b)];
      _0x203b9e[_0x33bf1a(0x2a3)](_0x41e86c[_0x33bf1a(0x3a9)]) && (_0x35ea9e += Number(RegExp['$1']));
    }
    this[_0x33bf1a(0x26c)](_0x35ea9e);
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x413)] = function () {
    const _0x48c8d5 = _0x4518ba;
    this['_actions'][_0x48c8d5(0x3f5)](new Game_Action(this));
    const _0x8d4e0 = VisuMZ[_0x48c8d5(0x3bc)][_0x48c8d5(0x1ef)][_0x48c8d5(0x2b5)];
    if (_0x8d4e0[_0x48c8d5(0x2a7)]) {
      const _0x1ce28f = 'Brave',
        _0x4f5c1f = _0x8d4e0['%1AnimationID'[_0x48c8d5(0x27b)](_0x1ce28f)],
        _0x40c45c = _0x8d4e0['%1Mirror'[_0x48c8d5(0x27b)](_0x1ce28f)],
        _0x3ac16f = _0x8d4e0[_0x48c8d5(0x397)[_0x48c8d5(0x27b)](_0x1ce28f)];
      $gameTemp[_0x48c8d5(0x392)]([this], _0x4f5c1f, _0x40c45c, _0x3ac16f);
    }
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2c4)] = function () {
    const _0x4ee9c1 = _0x4518ba;
    if (this[_0x4ee9c1(0x1d3)][_0x4ee9c1(0x329)] <= 0x1) return;
    this[_0x4ee9c1(0x1d3)]['pop']();
    const _0x4770f3 = VisuMZ['BattleSystemBTB'][_0x4ee9c1(0x1ef)][_0x4ee9c1(0x2b5)];
    if (_0x4770f3['CancelAnimationID']) {
      const _0x108cf1 = _0x4ee9c1(0x230),
        _0x364ced = _0x4770f3['%1AnimationID'[_0x4ee9c1(0x27b)](_0x108cf1)],
        _0x17c36a = _0x4770f3[_0x4ee9c1(0x25f)[_0x4ee9c1(0x27b)](_0x108cf1)],
        _0x3aa318 = _0x4770f3['%1Mute'[_0x4ee9c1(0x27b)](_0x108cf1)];
      $gameTemp[_0x4ee9c1(0x392)]([this], _0x364ced, _0x17c36a, _0x3aa318);
    }
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1fb)] = Game_Battler[_0x4518ba(0x39c)]['onTurnEnd']),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x212)] = function () {
    const _0x137895 = _0x4518ba;
    VisuMZ['BattleSystemBTB'][_0x137895(0x1fb)][_0x137895(0x2e6)](this), this[_0x137895(0x377)]();
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x377)] = function () {
    const _0x959f9b = _0x4518ba;
    if (!BattleManager[_0x959f9b(0x34d)]()) return;
    if (!$gameParty[_0x959f9b(0x41c)]()) return;
    this[_0x959f9b(0x276)]();
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x276)] = function () {
    const _0x148a7a = _0x4518ba,
      _0x56fa03 = VisuMZ[_0x148a7a(0x3bc)][_0x148a7a(0x1ef)][_0x148a7a(0x3dc)],
      _0x351afd = _0x56fa03[_0x148a7a(0x384)];
    if (_0x351afd && !this[_0x148a7a(0x353)]()) return;
    const _0x2d77c3 = this[_0x148a7a(0x3fd)]();
    this[_0x148a7a(0x232)](_0x2d77c3);
  }),
  (Game_Battler['prototype'][_0x4518ba(0x3fd)] = function () {
    const _0x5ba794 = _0x4518ba,
      _0x1ff8a8 = VisuMZ[_0x5ba794(0x3bc)]['RegExp'],
      _0x251e63 = VisuMZ[_0x5ba794(0x3bc)]['Settings'][_0x5ba794(0x3dc)];
    let _0x4a3773 = _0x251e63[_0x5ba794(0x433)] || 0x0;
    const _0x1ee2a5 = this[_0x5ba794(0x20d)]();
    for (const _0x3bdc3b of _0x1ee2a5) {
      if (!_0x3bdc3b) continue;
      const _0x216f27 = _0x3bdc3b[_0x5ba794(0x38b)];
      _0x216f27[_0x5ba794(0x2a3)](_0x1ff8a8[_0x5ba794(0x1e0)]) && (_0x4a3773 += Number(RegExp['$1']));
    }
    return _0x4a3773;
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x33a)] = function () {
    const _0x3608a9 = _0x4518ba;
    if (!this[_0x3608a9(0x234)]()) return;
    if (this[_0x3608a9(0x2e1)]() <= 0x1) return;
    if (!this[_0x3608a9(0x359)]()) return;
    if (!this[_0x3608a9(0x359)]()[_0x3608a9(0x37a)]()) return;
    const _0x2dc3a3 = this[_0x3608a9(0x359)]()[_0x3608a9(0x3b9)](),
      _0x4189ec = _0x2dc3a3 ? DataManager['_btbSkillFlexFusion'] : DataManager[_0x3608a9(0x2bd)],
      _0x2692bb = _0x2dc3a3 ? DataManager['_btbSkillStrictFusion'] : DataManager['_btbItemStrictFusion'];
    let _0x4ae4b6 = '',
      _0x44ea94 = 0x0;
    {
      const _0x2ff391 = this[_0x3608a9(0x389)]();
      if (_0x2ff391[_0x3608a9(0x329)] > 0x0)
        for (const _0x252052 of _0x2ff391) {
          if (!_0x252052) continue;
          _0x4189ec[_0x252052] && _0x4189ec[_0x252052] >= _0x44ea94 && this[_0x3608a9(0x30f)](_0x252052) && ((_0x4ae4b6 = _0x252052), (_0x44ea94 = _0x4189ec[_0x252052]));
        }
    }
    {
      const _0x17ad21 = this[_0x3608a9(0x306)]();
      if (_0x17ad21[_0x3608a9(0x329)] > 0x0)
        for (const _0x4c425d of _0x17ad21) {
          if (!_0x4c425d) continue;
          _0x2692bb[_0x4c425d] && _0x2692bb[_0x4c425d] >= _0x44ea94 && this['canPayActionFusionCombination'](_0x4c425d) && ((_0x4ae4b6 = _0x4c425d), (_0x44ea94 = _0x2692bb[_0x4c425d]));
        }
    }
    if (_0x44ea94 <= 0x0) return;
    this['removeActionFusionIngredients'](_0x4ae4b6), this[_0x3608a9(0x359)]()[_0x3608a9(0x261)](_0x4ae4b6);
    const _0x25f0c3 = this[_0x3608a9(0x359)]()['_targetBattlerKey'];
    _0x2dc3a3 ? this[_0x3608a9(0x359)]()[_0x3608a9(0x31c)](_0x44ea94) : this[_0x3608a9(0x359)]()[_0x3608a9(0x3fc)](_0x44ea94), (this[_0x3608a9(0x359)]()[_0x3608a9(0x2ea)] = _0x25f0c3);
  }),
  (Game_Battler['prototype'][_0x4518ba(0x234)] = function () {
    const _0x1e6b53 = _0x4518ba;
    if (this[_0x1e6b53(0x25c)]()) return ![];
    const _0xc3b7a = VisuMZ['BattleSystemBTB'][_0x1e6b53(0x1ef)]['Mechanics'];
    if (this['isActor']()) {
      if (_0xc3b7a['ActorActionFusions'] === undefined) return !![];
      return _0xc3b7a['ActorActionFusions'];
    } else {
      if (_0xc3b7a[_0x1e6b53(0x2c3)] === undefined) return !![];
      return _0xc3b7a[_0x1e6b53(0x2c3)];
    }
  }),
  (Game_BattlerBase[_0x4518ba(0x39c)][_0x4518ba(0x25c)] = function () {
    const _0x17f15d = _0x4518ba,
      _0x3546e5 = VisuMZ[_0x17f15d(0x3bc)][_0x17f15d(0x2fb)],
      _0x53bd27 = this['traitObjects']();
    for (const _0x124c9a of _0x53bd27) {
      if (!_0x124c9a) continue;
      const _0x2e4f5f = _0x124c9a[_0x17f15d(0x38b)];
      if (_0x2e4f5f[_0x17f15d(0x2a3)](_0x3546e5[_0x17f15d(0x1e8)])) return !![];
      if (_0x2e4f5f['match'](_0x3546e5[_0x17f15d(0x435)])) return ![];
    }
    return ![];
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x389)] = function () {
    const _0x434594 = _0x4518ba,
      _0x1dc2bc = this[_0x434594(0x359)](),
      _0x5a10a0 = this[_0x434594(0x1d3)],
      _0x3f5399 = _0x5a10a0[_0x434594(0x286)](_0x4b1de2 => this[_0x434594(0x2e7)](_0x1dc2bc, _0x4b1de2)),
      _0x46e7b3 = _0x3f5399['map'](_0x276286 => _0x276286['item']()['id']);
    _0x46e7b3[_0x434594(0x3f5)](_0x1dc2bc[_0x434594(0x37a)]()['id']), _0x46e7b3[_0x434594(0x3c7)]((_0x112aee, _0x1e04ec) => _0x112aee - _0x1e04ec);
    const _0x3789d0 = VisuMZ[_0x434594(0x3bc)]['formAllPossibleFlexCombos'](_0x46e7b3);
    return _0x3789d0[_0x434594(0x286)]((_0x1f325b, _0xe73f21, _0x567c74) => _0x567c74[_0x434594(0x35b)](_0x1f325b) === _0xe73f21);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x298)] = function (_0x5a2459) {
    const _0xd26e7a = _0x4518ba;
    _0x5a2459[_0xd26e7a(0x3c7)]((_0x573dee, _0x1f6ad9) => _0x573dee - _0x1f6ad9);
    const _0x564292 = [],
      _0x45ec67 = function (_0x455457, _0xea3b3b) {
        const _0x55700c = _0xd26e7a;
        _0xea3b3b['length'] >= 0x2 && _0x564292[_0x55700c(0x3f5)](_0xea3b3b[_0x55700c(0x411)]('-'));
        for (let _0x5b4de6 = _0x455457; _0x5b4de6 < _0x5a2459[_0x55700c(0x329)]; _0x5b4de6++) {
          _0x45ec67(_0x5b4de6 + 0x1, [..._0xea3b3b, _0x5a2459[_0x5b4de6]]);
        }
      };
    return _0x45ec67(0x0, []), _0x564292[_0xd26e7a(0x3c7)](), _0x564292[_0xd26e7a(0x286)]((_0x2d2f0c, _0x281d06, _0xa27a76) => _0xa27a76[_0xd26e7a(0x35b)](_0x2d2f0c) === _0x281d06);
  }),
  (Game_Battler[_0x4518ba(0x39c)]['getStrictActionFusionCombinationsBTB'] = function () {
    const _0x2edfa4 = _0x4518ba,
      _0x578a40 = this[_0x2edfa4(0x359)](),
      _0x453e93 = this[_0x2edfa4(0x1d3)],
      _0x47ff35 = [];
    let _0x79ad0c = String(_0x578a40[_0x2edfa4(0x37a)]()['id']);
    for (let _0x5b2135 = 0x1; _0x5b2135 < _0x453e93['length']; _0x5b2135++) {
      const _0x204968 = _0x453e93[_0x5b2135];
      if (this[_0x2edfa4(0x2e7)](_0x578a40, _0x204968)) (_0x79ad0c = _0x2edfa4(0x37d)[_0x2edfa4(0x27b)](_0x79ad0c, _0x204968[_0x2edfa4(0x37a)]()['id'])), _0x47ff35[_0x2edfa4(0x3f5)](_0x79ad0c);
      else break;
    }
    return _0x47ff35[_0x2edfa4(0x286)]((_0x181b49, _0x5246c8, _0xf9d30d) => _0xf9d30d[_0x2edfa4(0x35b)](_0x181b49) === _0x5246c8);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x3c6)] = function (_0x1b0a18, _0x390a80) {
    const _0x4bf0a9 = [],
      _0x232bd3 = function (_0xa59d18, _0x135b8b) {
        const _0x2af9ed = _0x2c48;
        for (var _0x2afd62 = 0x0; _0x2afd62 < _0x135b8b[_0x2af9ed(0x329)]; _0x2afd62++) {
          _0x4bf0a9[_0x2af9ed(0x3f5)](_0xa59d18 + '-' + _0x135b8b[_0x2afd62]), _0x232bd3(_0xa59d18 + '-' + _0x135b8b[_0x2afd62], _0x135b8b[_0x2af9ed(0x400)](_0x2afd62 + 0x1));
        }
      };
    return _0x232bd3(_0x1b0a18, _0x390a80), _0x4bf0a9;
  }),
  (Game_Battler[_0x4518ba(0x39c)]['canActionFusionWithBTB'] = function (_0x2b3afd, _0x46c297) {
    const _0x5a65f9 = _0x4518ba;
    if (!_0x2b3afd || !_0x46c297) return ![];
    if (_0x2b3afd === _0x46c297) return ![];
    if (!_0x2b3afd[_0x5a65f9(0x37a)]() || !_0x46c297[_0x5a65f9(0x37a)]()) return ![];
    if (_0x2b3afd[_0x5a65f9(0x3b9)]() !== _0x46c297['isSkill']()) return ![];
    return !![];
  }),
  (Game_Battler[_0x4518ba(0x39c)][_0x4518ba(0x30f)] = function (_0xbe22d4) {
    const _0x17ef4a = _0x4518ba,
      _0x294ea1 = this['currentAction']()[_0x17ef4a(0x3b9)](),
      _0x18b7ad = JsonEx[_0x17ef4a(0x2cd)](this);
    (_0x18b7ad[_0x17ef4a(0x2b6)] = !![]), _0x18b7ad['currentAction']()[_0x17ef4a(0x261)](_0xbe22d4);
    const _0x294d6b = JsonEx['makeDeepCopy']($gameParty[_0x17ef4a(0x2fe)]),
      _0x47a122 = JsonEx[_0x17ef4a(0x2cd)]($gameParty[_0x17ef4a(0x271)]),
      _0x188680 = JsonEx['makeDeepCopy']($gameParty[_0x17ef4a(0x33c)]);
    let _0x42c2e6 = _0x294ea1 ? _0x18b7ad[_0x17ef4a(0x2b9)]() : _0x18b7ad['btbPayItemFusionCosts']();
    return ($gameParty['_items'] = _0x294d6b), ($gameParty[_0x17ef4a(0x271)] = _0x47a122), ($gameParty[_0x17ef4a(0x33c)] = _0x188680), _0x42c2e6;
  }),
  (Game_Battler['prototype'][_0x4518ba(0x322)] = function (_0x12ee17) {
    const _0x10be62 = _0x4518ba,
      _0x1656f8 = this['currentAction'](),
      _0x4d6ba8 = _0x12ee17['split']('-')[_0x10be62(0x25e)](_0x588be8 => Number(_0x588be8)),
      _0x8c6b7f = _0x4d6ba8[_0x10be62(0x35b)](_0x1656f8[_0x10be62(0x37a)]()['id']);
    _0x4d6ba8[_0x10be62(0x429)](_0x8c6b7f, 0x1);
    const _0x4f998d = this[_0x10be62(0x1d3)],
      _0x4eebee = [];
    for (const _0x360101 of _0x4f998d) {
      this[_0x10be62(0x2e7)](_0x1656f8, _0x360101) &&
        _0x4d6ba8[_0x10be62(0x3cf)](_0x360101[_0x10be62(0x37a)]()['id']) &&
        (_0x4eebee[_0x10be62(0x3f5)](_0x360101), _0x4d6ba8[_0x10be62(0x429)](_0x4d6ba8['indexOf'](_0x360101[_0x10be62(0x37a)]()['id']), 0x1));
    }
    for (const _0x541cf0 of _0x4eebee) {
      _0x4f998d[_0x10be62(0x38c)](_0x541cf0);
    }
  }),
  (Game_Actor[_0x4518ba(0x39c)]['setBravePoints'] = function (_0x59c764) {
    const _0x3de395 = _0x4518ba;
    Game_Battler[_0x3de395(0x39c)][_0x3de395(0x26c)]['call'](this, _0x59c764);
    if (!SceneManager[_0x3de395(0x1fe)]()) return;
    if (!BattleManager[_0x3de395(0x3ef)]()[_0x3de395(0x3cf)](this)) return;
    BattleManager[_0x3de395(0x259)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x343)] = Game_Actor[_0x4518ba(0x39c)][_0x4518ba(0x1f4)]),
  (Game_Actor[_0x4518ba(0x39c)]['makeActions'] = function () {
    const _0x62924c = _0x4518ba;
    VisuMZ['BattleSystemBTB'][_0x62924c(0x343)][_0x62924c(0x2e6)](this), BattleManager[_0x62924c(0x34d)]() && this[_0x62924c(0x2ec)]() < 0x0 && this[_0x62924c(0x3d0)]();
  }),
  (Game_Actor[_0x4518ba(0x39c)][_0x4518ba(0x3d4)] = function () {
    const _0x20e15e = _0x4518ba,
      _0x163d96 = this['actor']()['note'];
    if (_0x163d96[_0x20e15e(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return _0x20e15e(0x2c5);
    else {
      if (_0x163d96[_0x20e15e(0x2a3)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)) return _0x20e15e(0x33d);
    }
    return Window_BTB_TurnOrder[_0x20e15e(0x1ef)][_0x20e15e(0x1d4)];
  }),
  (Game_Actor[_0x4518ba(0x39c)][_0x4518ba(0x3c3)] = function () {
    const _0x3c2c64 = _0x4518ba,
      _0x15a30f = this[_0x3c2c64(0x202)]()[_0x3c2c64(0x38b)];
    if (_0x15a30f[_0x3c2c64(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return String(RegExp['$1']);
    return this[_0x3c2c64(0x2ee)]();
  }),
  (Game_Actor['prototype'][_0x4518ba(0x305)] = function () {
    const _0x15c910 = _0x4518ba,
      _0x59e183 = this[_0x15c910(0x202)]()[_0x15c910(0x38b)];
    if (_0x59e183[_0x15c910(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return Number(RegExp['$2']);
    return this[_0x15c910(0x427)]();
  }),
  (Game_Actor[_0x4518ba(0x39c)]['createTurnOrderBTBGraphicIconIndex'] = function () {
    const _0x4784b1 = _0x4518ba,
      _0x466c3d = this[_0x4784b1(0x202)]()[_0x4784b1(0x38b)];
    if (_0x466c3d[_0x4784b1(0x2a3)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)) return Number(RegExp['$1']);
    return Window_BTB_TurnOrder[_0x4784b1(0x1ef)]['ActorBattlerIcon'];
  }),
  (Game_Actor[_0x4518ba(0x39c)][_0x4518ba(0x2e7)] = function (_0x4d1c3a, _0x341dc7) {
    const _0x7b91b0 = _0x4518ba;
    if (!Game_Battler[_0x7b91b0(0x39c)][_0x7b91b0(0x2e7)]['call'](this, _0x4d1c3a, _0x341dc7)) return ![];
    if (_0x4d1c3a['needsSelection']() && _0x341dc7[_0x7b91b0(0x2e2)]()) {
      if (_0x4d1c3a[_0x7b91b0(0x2ea)] !== '' || _0x341dc7[_0x7b91b0(0x2ea)] !== '') {
        if (_0x4d1c3a['_targetBattlerKey'] !== _0x341dc7['_targetBattlerKey']) return ![];
      } else {
        if (_0x4d1c3a[_0x7b91b0(0x2b4)] !== _0x341dc7[_0x7b91b0(0x2b4)]) return _0x4d1c3a[_0x7b91b0(0x361)]() === _0x341dc7[_0x7b91b0(0x361)]();
      }
    }
    return !![];
  }),
  (Game_Enemy[_0x4518ba(0x39c)][_0x4518ba(0x3d4)] = function () {
    const _0x3546e4 = _0x4518ba,
      _0x269085 = this[_0x3546e4(0x345)]()[_0x3546e4(0x38b)];
    if (_0x269085[_0x3546e4(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return _0x3546e4(0x2c5);
    else {
      if (_0x269085[_0x3546e4(0x2a3)](/<BTB TURN ORDER ICON:[ ](\d+)>/i)) return _0x3546e4(0x33d);
    }
    return Window_BTB_TurnOrder[_0x3546e4(0x1ef)][_0x3546e4(0x3ce)];
  }),
  (Game_Enemy[_0x4518ba(0x39c)][_0x4518ba(0x3c3)] = function () {
    const _0x40494f = _0x4518ba,
      _0x332489 = this[_0x40494f(0x345)]()[_0x40494f(0x38b)];
    if (_0x332489[_0x40494f(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return String(RegExp['$1']);
    return Window_BTB_TurnOrder[_0x40494f(0x1ef)]['EnemyBattlerFaceName'];
  }),
  (Game_Enemy['prototype'][_0x4518ba(0x305)] = function () {
    const _0x233b12 = _0x4518ba,
      _0x53abfd = this[_0x233b12(0x345)]()[_0x233b12(0x38b)];
    if (_0x53abfd[_0x233b12(0x2a3)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)) return Number(RegExp['$2']);
    return Window_BTB_TurnOrder[_0x233b12(0x1ef)]['EnemyBattlerFaceIndex'];
  }),
  (Game_Enemy[_0x4518ba(0x39c)][_0x4518ba(0x27c)] = function () {
    const _0x261813 = _0x4518ba,
      _0x2785e1 = this[_0x261813(0x345)]()[_0x261813(0x38b)];
    if (_0x2785e1['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i)) return Number(RegExp['$1']);
    return Window_BTB_TurnOrder[_0x261813(0x1ef)][_0x261813(0x238)];
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x2dd)] = Game_Enemy[_0x4518ba(0x39c)]['makeActions']),
  (Game_Enemy[_0x4518ba(0x39c)]['makeActions'] = function () {
    const _0xd17425 = _0x4518ba;
    VisuMZ[_0xd17425(0x3bc)][_0xd17425(0x2dd)][_0xd17425(0x2e6)](this), this[_0xd17425(0x207)](), this[_0xd17425(0x31f)]();
  }),
  (Game_Enemy[_0x4518ba(0x39c)]['checkActionsBTB'] = function () {
    const _0x1506a0 = _0x4518ba;
    if (!BattleManager[_0x1506a0(0x34d)]()) return;
    if (this[_0x1506a0(0x2e1)]() <= 0x0) return;
    (this[_0x1506a0(0x3a8)] = ![]), this[_0x1506a0(0x2ec)]() < 0x0 && this[_0x1506a0(0x3d0)]();
  }),
  (Game_Enemy['prototype']['makeMultiActionsBTB'] = function () {
    const _0x39472b = _0x4518ba;
    if (!BattleManager['isBTB']()) return;
    if (this[_0x39472b(0x2e1)]() <= 0x0) return;
    const _0x215ed2 = this[_0x39472b(0x1d3)][0x0];
    if (!_0x215ed2) return;
    const _0x5b5302 = _0x215ed2[_0x39472b(0x37a)]();
    if (!_0x5b5302) return;
    const _0x178d1e = VisuMZ[_0x39472b(0x3bc)][_0x39472b(0x2fb)],
      _0x420e0e = _0x5b5302[_0x39472b(0x38b)];
    let _0x1e5fe6 = [];
    if (_0x420e0e['match'](_0x178d1e[_0x39472b(0x227)])) {
      const _0x2d3fe4 = String(RegExp['$1'])[_0x39472b(0x2fc)](',');
      for (let _0x28fe10 of _0x2d3fe4) {
        _0x28fe10 = (String(_0x28fe10) || '')['trim']();
        const _0xe65e89 = /^\d+$/[_0x39472b(0x313)](_0x28fe10);
        _0xe65e89 ? _0x1e5fe6[_0x39472b(0x3f5)](Number(_0x28fe10)) : _0x1e5fe6[_0x39472b(0x3f5)](DataManager['getSkillIdWithName'](_0x28fe10));
      }
    }
    if (_0x1e5fe6[_0x39472b(0x329)] <= 0x0) return;
    while (_0x1e5fe6[_0x39472b(0x329)] > this[_0x39472b(0x3ad)]()) {
      _0x1e5fe6[_0x39472b(0x3e4)]();
    }
    if (_0x1e5fe6[_0x39472b(0x329)] <= 0x0) return;
    this[_0x39472b(0x3d0)]();
    for (const _0x12b782 of _0x1e5fe6) {
      const _0x34189c = new Game_Action(this);
      _0x34189c[_0x39472b(0x31c)](_0x12b782), (_0x34189c[_0x39472b(0x25d)] = !![]), this[_0x39472b(0x1d3)][_0x39472b(0x3f5)](_0x34189c);
    }
  }),
  (Game_Enemy['prototype'][_0x4518ba(0x2d0)] = function () {
    const _0x2801f7 = _0x4518ba;
    let _0x492561 = this['numActions']();
    for (const _0x1e0a06 of this['_actions']) {
      if (!_0x1e0a06) continue;
      _0x492561 += _0x1e0a06[_0x2801f7(0x1db)]();
    }
    return _0x492561 - 0x1;
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Game_Unit_makeActions'] = Game_Unit[_0x4518ba(0x39c)][_0x4518ba(0x1f4)]),
  (Game_Unit[_0x4518ba(0x39c)][_0x4518ba(0x1f4)] = function () {
    const _0x3771ea = _0x4518ba;
    VisuMZ[_0x3771ea(0x3bc)][_0x3771ea(0x365)][_0x3771ea(0x2e6)](this),
      BattleManager[_0x3771ea(0x34d)]() && this === $gameTroop && SceneManager['isSceneBattle']() && BattleManager[_0x3771ea(0x21e)]();
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x2a2)] = Game_Party[_0x4518ba(0x39c)][_0x4518ba(0x1f7)]),
  (Game_Party[_0x4518ba(0x39c)]['removeActor'] = function (_0x31c296) {
    const _0x4e25b2 = _0x4518ba;
    VisuMZ[_0x4e25b2(0x3bc)]['Game_Party_removeActor'][_0x4e25b2(0x2e6)](this, _0x31c296),
      SceneManager['isSceneBattle']() && BattleManager[_0x4e25b2(0x34d)]() && BattleManager[_0x4e25b2(0x240)]['remove']($gameActors[_0x4e25b2(0x202)](_0x31c296));
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Scene_Battle_onDisabledPartyCommandSelection'] = Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x1ee)]),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x1ee)] = function () {
    const _0x3b6b18 = _0x4518ba;
    BattleManager[_0x3b6b18(0x34d)]() ? this[_0x3b6b18(0x3d8)]() : VisuMZ[_0x3b6b18(0x3bc)][_0x3b6b18(0x3cd)]['call'](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Scene_Battle_createActorCommandWindow'] = Scene_Battle['prototype'][_0x4518ba(0x219)]),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x219)] = function () {
    const _0x448727 = _0x4518ba;
    VisuMZ['BattleSystemBTB'][_0x448727(0x415)][_0x448727(0x2e6)](this), this[_0x448727(0x368)]();
  }),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x368)] = function () {
    const _0x3be7f0 = _0x4518ba;
    if (!BattleManager['isBTB']()) return;
    const _0x48413d = this[_0x3be7f0(0x1e6)];
    if (!_0x48413d) return;
    _0x48413d['setHandler'](_0x3be7f0(0x3f6), this['commandBrave'][_0x3be7f0(0x280)](this)), _0x48413d['setHandler'](_0x3be7f0(0x264), this[_0x3be7f0(0x35d)]['bind'](this));
  }),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x211)] = function () {
    this['performBrave']();
  }),
  (Scene_Battle['prototype'][_0x4518ba(0x35d)] = function () {
    const _0xa6ad32 = _0x4518ba,
      _0x4ebc69 = BattleManager[_0xa6ad32(0x202)]();
    if (!_0x4ebc69) this[_0xa6ad32(0x265)]();
    else {
      if (_0x4ebc69[_0xa6ad32(0x2e1)]() <= 0x1) this[_0xa6ad32(0x265)]();
      else _0x4ebc69[_0xa6ad32(0x428)] > 0x0 ? this['commandCancel']() : this['reduceBrave']();
    }
  }),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x413)] = function () {
    const _0x5821af = _0x4518ba,
      _0x27f997 = BattleManager[_0x5821af(0x202)]();
    if (!_0x27f997) return;
    _0x27f997[_0x5821af(0x413)]();
    const _0x64fea1 = this[_0x5821af(0x1e6)]['_scrollX'],
      _0x47a0ff = this[_0x5821af(0x1e6)][_0x5821af(0x31a)],
      _0x32b276 = this[_0x5821af(0x1e6)][_0x5821af(0x2f8)]();
    this['_actorCommandWindow'][_0x5821af(0x2f3)](_0x27f997),
      this[_0x5821af(0x1e6)][_0x5821af(0x1d6)](_0x32b276),
      (this[_0x5821af(0x1e6)][_0x5821af(0x257)] = _0x64fea1),
      (this[_0x5821af(0x1e6)]['_scrollY'] = _0x47a0ff);
  }),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x1d8)] = function () {
    const _0x51cd78 = _0x4518ba,
      _0x59df59 = BattleManager[_0x51cd78(0x202)]();
    if (!_0x59df59) return;
    _0x59df59[_0x51cd78(0x2c4)]();
    const _0x3b88c2 = this[_0x51cd78(0x1e6)][_0x51cd78(0x257)],
      _0x2c1bd4 = this[_0x51cd78(0x1e6)][_0x51cd78(0x31a)],
      _0xd8e154 = this[_0x51cd78(0x1e6)][_0x51cd78(0x2f8)]();
    this['_actorCommandWindow'][_0x51cd78(0x2f3)](_0x59df59),
      this['_actorCommandWindow'][_0x51cd78(0x1d6)](_0xd8e154),
      (this['_actorCommandWindow'][_0x51cd78(0x257)] = _0x3b88c2),
      (this[_0x51cd78(0x1e6)][_0x51cd78(0x31a)] = _0x2c1bd4);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x233)] = Scene_Battle['prototype'][_0x4518ba(0x3fe)]),
  (Scene_Battle[_0x4518ba(0x39c)]['createAllWindows'] = function () {
    const _0x2162bb = _0x4518ba;
    VisuMZ[_0x2162bb(0x3bc)][_0x2162bb(0x233)]['call'](this), this[_0x2162bb(0x260)]();
  }),
  (Scene_Battle['prototype'][_0x4518ba(0x260)] = function () {
    const _0x3f6d51 = _0x4518ba;
    if (!BattleManager['isBTB']()) return;
    this['_btbTurnOrderWindow'] = new Window_BTB_TurnOrder();
    const _0x17c882 = this[_0x3f6d51(0x3bd)](this[_0x3f6d51(0x3c4)]);
    this[_0x3f6d51(0x332)](this[_0x3f6d51(0x23b)], _0x17c882), this[_0x3f6d51(0x29f)](), BattleManager['updateTurnOrderBTB'](!![]);
  }),
  (Scene_Battle[_0x4518ba(0x39c)][_0x4518ba(0x29f)] = function () {
    const _0x40f6cc = _0x4518ba,
      _0x5a9990 = Window_BTB_TurnOrder[_0x40f6cc(0x1ef)];
    if (_0x5a9990[_0x40f6cc(0x21f)] !== _0x40f6cc(0x340)) return;
    if (!_0x5a9990[_0x40f6cc(0x24c)]) return;
    if (!this[_0x40f6cc(0x2b0)]) return;
    const _0x2ba99d = this[_0x40f6cc(0x23b)]['y'] - Math[_0x40f6cc(0x297)]((Graphics[_0x40f6cc(0x403)] - Graphics[_0x40f6cc(0x2dc)]) / 0x2),
      _0x116280 = _0x2ba99d + this[_0x40f6cc(0x23b)][_0x40f6cc(0x403)];
    this[_0x40f6cc(0x2b0)]['y'] = _0x116280 + _0x5a9990[_0x40f6cc(0x21c)];
  });
function Sprite_BTB_TurnOrder_Battler() {
  this['initialize'](...arguments);
}
(Sprite_BTB_TurnOrder_Battler['prototype'] = Object[_0x4518ba(0x24a)](Sprite_Clickable[_0x4518ba(0x39c)])),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x3f7)] = Sprite_BTB_TurnOrder_Battler),
  (Sprite_BTB_TurnOrder_Battler['prototype']['initialize'] = function (_0x185e52, _0x3a268c) {
    const _0x5f2223 = _0x4518ba;
    this[_0x5f2223(0x285)](_0x185e52, _0x3a268c), Sprite_Clickable[_0x5f2223(0x39c)]['initialize']['call'](this), (this[_0x5f2223(0x333)] = 0x0), this['createChildren'](), this[_0x5f2223(0x311)]();
  }),
  (Sprite_BTB_TurnOrder_Battler['prototype'][_0x4518ba(0x285)] = function (_0x5c3f1b, _0x452499) {
    const _0x375131 = _0x4518ba;
    (this[_0x375131(0x277)] = _0x5c3f1b), (this[_0x375131(0x2c7)] = _0x452499);
    const _0x2cbb29 = Window_BTB_TurnOrder[_0x375131(0x1ef)],
      _0xfca9c7 = this['isHorz'](),
      _0x3f2174 = this['defaultPosition']();
    (this['_positionDuration'] = 0x0),
      (this[_0x375131(0x38e)] = _0xfca9c7 ? _0x2cbb29[_0x375131(0x262)] * _0x3f2174 : 0x0),
      (this[_0x375131(0x431)] = _0xfca9c7 ? 0x0 : _0x2cbb29['SpriteThin'] * _0x3f2174),
      (this[_0x375131(0x3b3)] = 0x0),
      (this['_fadeTarget'] = 0xff),
      (this[_0x375131(0x40f)] = ![]),
      (this['_isAppeared'] = ![]),
      (this['_containerWidth'] = 0x0),
      (this[_0x375131(0x317)] = 0x0);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x3b7)] = function () {
    const _0x50002e = _0x4518ba;
    this[_0x50002e(0x34b)](), this[_0x50002e(0x30b)](), this[_0x50002e(0x2fd)](), this[_0x50002e(0x344)](), this[_0x50002e(0x346)]();
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x34b)] = function () {
    const _0x236c6a = _0x4518ba;
    (this['x'] = this[_0x236c6a(0x38e)]), (this['y'] = this[_0x236c6a(0x431)]);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x3a7)] = function () {
    const _0x483099 = _0x4518ba,
      _0x4258df = Window_BTB_TurnOrder[_0x483099(0x1ef)],
      _0x3b5d3a = [_0x483099(0x340), _0x483099(0x269)]['includes'](_0x4258df['DisplayPosition']);
    return _0x3b5d3a;
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x39b)] = function () {
    const _0x15d7d3 = _0x4518ba,
      _0x224b79 = Window_BTB_TurnOrder['Settings'];
    return this['isHorz']() ? _0x224b79['SpriteThin'] : _0x224b79[_0x15d7d3(0x31d)];
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x41e)] = function () {
    const _0x977195 = _0x4518ba,
      _0x45dffa = Window_BTB_TurnOrder['Settings'];
    return this[_0x977195(0x3a7)]() ? _0x45dffa[_0x977195(0x31d)] : _0x45dffa[_0x977195(0x262)];
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x1f9)] = function () {
    const _0x40a3ba = _0x4518ba;
    this['bitmap'] = new Bitmap(0x48, 0x24);
    const _0x3f5a50 = this['battler']() ? this['battler']()[_0x40a3ba(0x2ed)]() : '%1\x20%2\x20%3'[_0x40a3ba(0x27b)](this[_0x40a3ba(0x277)], this[_0x40a3ba(0x2c7)]);
    this[_0x40a3ba(0x221)][_0x40a3ba(0x40e)](_0x3f5a50, 0x0, 0x0, 0x48, 0x24, 'center');
  }),
  (Sprite_BTB_TurnOrder_Battler['prototype'][_0x4518ba(0x30b)] = function () {
    const _0x2436b1 = _0x4518ba;
    if (!Window_BTB_TurnOrder['Settings'][_0x2436b1(0x3fb)]) return;
    const _0x3e4e15 = Window_BTB_TurnOrder[_0x2436b1(0x1ef)],
      _0xbc3ee8 = this['_unit'] === $gameParty ? _0x2436b1(0x287) : _0x2436b1(0x382),
      _0x5678a5 = _0x2436b1(0x36b)[_0x2436b1(0x27b)](_0xbc3ee8),
      _0x381be6 = new Sprite();
    (_0x381be6[_0x2436b1(0x437)]['x'] = this['anchor']['x']), (_0x381be6['anchor']['y'] = this[_0x2436b1(0x437)]['y']);
    if (_0x3e4e15[_0x5678a5]) _0x381be6[_0x2436b1(0x221)] = ImageManager[_0x2436b1(0x2b1)](_0x3e4e15[_0x5678a5]);
    else {
      const _0x2c07ec = this[_0x2436b1(0x39b)](),
        _0x2a4976 = this[_0x2436b1(0x41e)]();
      _0x381be6['bitmap'] = new Bitmap(_0x2c07ec, _0x2a4976);
      const _0x41c1bb = ColorManager['getColor'](_0x3e4e15['%1BgColor1'[_0x2436b1(0x27b)](_0xbc3ee8)]),
        _0x34b854 = ColorManager['getColor'](_0x3e4e15[_0x2436b1(0x1f2)['format'](_0xbc3ee8)]);
      _0x381be6['bitmap']['gradientFillRect'](0x0, 0x0, _0x2c07ec, _0x2a4976, _0x41c1bb, _0x34b854, !![]);
    }
    (this['_backgroundSprite'] = _0x381be6), this['addChild'](this[_0x2436b1(0x296)]);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2fd)] = function () {
    const _0x496095 = _0x4518ba,
      _0xc145e1 = new Sprite();
    (_0xc145e1['anchor']['x'] = this[_0x496095(0x437)]['x']),
      (_0xc145e1[_0x496095(0x437)]['y'] = this['anchor']['y']),
      (this['_graphicSprite'] = _0xc145e1),
      this['addChild'](this[_0x496095(0x319)]),
      this['processUpdateGraphic']();
  }),
  (Sprite_BTB_TurnOrder_Battler['prototype'][_0x4518ba(0x344)] = function () {
    const _0x51d95a = _0x4518ba;
    if (!Window_BTB_TurnOrder[_0x51d95a(0x1ef)][_0x51d95a(0x420)]) return;
    const _0x5dd774 = Window_BTB_TurnOrder[_0x51d95a(0x1ef)],
      _0x593a83 = this['_unit'] === $gameParty ? _0x51d95a(0x287) : 'Enemy',
      _0x190e5c = _0x51d95a(0x208)[_0x51d95a(0x27b)](_0x593a83),
      _0x32530c = new Sprite();
    (_0x32530c['anchor']['x'] = this['anchor']['x']), (_0x32530c['anchor']['y'] = this['anchor']['y']);
    if (_0x5dd774[_0x190e5c]) _0x32530c['bitmap'] = ImageManager[_0x51d95a(0x2b1)](_0x5dd774[_0x190e5c]);
    else {
      let _0x58bc31 = this[_0x51d95a(0x39b)](),
        _0x2db8b1 = this['bitmapHeight'](),
        _0x1df0bb = _0x5dd774[_0x51d95a(0x34c)];
      _0x32530c[_0x51d95a(0x221)] = new Bitmap(_0x58bc31, _0x2db8b1);
      const _0x18ae4c = _0x51d95a(0x2cc),
        _0x454b0f = ColorManager[_0x51d95a(0x363)](_0x5dd774[_0x51d95a(0x21d)[_0x51d95a(0x27b)](_0x593a83)]);
      _0x32530c[_0x51d95a(0x221)]['fillRect'](0x0, 0x0, _0x58bc31, _0x2db8b1, _0x18ae4c),
        (_0x58bc31 -= 0x2),
        (_0x2db8b1 -= 0x2),
        _0x32530c['bitmap']['fillRect'](0x1, 0x1, _0x58bc31, _0x2db8b1, _0x454b0f),
        (_0x58bc31 -= _0x1df0bb * 0x2),
        (_0x2db8b1 -= _0x1df0bb * 0x2),
        _0x32530c[_0x51d95a(0x221)][_0x51d95a(0x2bc)](0x1 + _0x1df0bb, 0x1 + _0x1df0bb, _0x58bc31, _0x2db8b1, _0x18ae4c),
        (_0x58bc31 -= 0x2),
        (_0x2db8b1 -= 0x2),
        (_0x1df0bb += 0x1),
        _0x32530c[_0x51d95a(0x221)][_0x51d95a(0x372)](0x1 + _0x1df0bb, 0x1 + _0x1df0bb, _0x58bc31, _0x2db8b1);
    }
    (this['_backgroundSprite'] = _0x32530c),
      this[_0x51d95a(0x35c)](this[_0x51d95a(0x296)]),
      (this[_0x51d95a(0x295)] = this[_0x51d95a(0x296)][_0x51d95a(0x295)]),
      (this[_0x51d95a(0x403)] = this[_0x51d95a(0x296)][_0x51d95a(0x403)]);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x346)] = function () {
    const _0x3e40ae = _0x4518ba,
      _0x19e782 = Window_BTB_TurnOrder[_0x3e40ae(0x1ef)];
    if (!_0x19e782[_0x3e40ae(0x37e)]) return;
    if (this[_0x3e40ae(0x277)] === $gameParty) return;
    const _0x363713 = this[_0x3e40ae(0x39b)](),
      _0x1fc964 = this[_0x3e40ae(0x41e)](),
      _0x5c3191 = new Sprite();
    (_0x5c3191['anchor']['x'] = this[_0x3e40ae(0x437)]['x']),
      (_0x5c3191[_0x3e40ae(0x437)]['y'] = this[_0x3e40ae(0x437)]['y']),
      (_0x5c3191[_0x3e40ae(0x221)] = new Bitmap(_0x363713, _0x1fc964)),
      (this[_0x3e40ae(0x302)] = _0x5c3191),
      this[_0x3e40ae(0x35c)](this['_letterSprite']);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x36e)] = function () {
    const _0x66f64d = _0x4518ba;
    return this[_0x66f64d(0x277)] ? this[_0x66f64d(0x277)]['members']()[this[_0x66f64d(0x2c7)]] : null;
  }),
  (Sprite_BTB_TurnOrder_Battler['prototype'][_0x4518ba(0x42f)] = function () {
    const _0x2ba859 = _0x4518ba;
    Sprite_Clickable[_0x2ba859(0x39c)]['update'][_0x2ba859(0x2e6)](this),
      this[_0x2ba859(0x2e8)](),
      this['updatePosition'](),
      this['checkOpacity'](),
      this['updateOpacity'](),
      this[_0x2ba859(0x1da)](),
      this['updateGraphicHue'](),
      this['updateLetter'](),
      this[_0x2ba859(0x39d)]();
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)]['checkPosition'] = function () {
    const _0x3aa120 = _0x4518ba,
      _0x4ae518 = this['containerPosition']();
    if (this[_0x3aa120(0x217)] === _0x4ae518) return;
    this[_0x3aa120(0x217)] = _0x4ae518;
    this[_0x3aa120(0x333)] < 0xff && this['battler']() && _0x4ae518 !== this[_0x3aa120(0x1e7)]() && this['startFade'](0xff);
    if (_0x4ae518 === this[_0x3aa120(0x1e7)]() && this['_fadeDuration'] <= 0x0 && this[_0x3aa120(0x333)] > 0x0) this['startFade'](0x0);
    else this[_0x3aa120(0x3b3)] <= 0x0 && this['opacity'] < 0xff && this[_0x3aa120(0x311)]();
    this[_0x3aa120(0x36d)]();
  }),
  (Sprite_BTB_TurnOrder_Battler['prototype']['checkTargetPositions'] = function () {
    const _0x3daaf0 = _0x4518ba,
      _0x183006 = this['containerWindow']();
    if (!_0x183006) return;
    let _0x34e3d2 = ![];
    if (this['_containerWidth'] !== _0x183006[_0x3daaf0(0x295)]) _0x34e3d2 = !![];
    else this['_containerHeight'] !== _0x183006[_0x3daaf0(0x403)] && (_0x34e3d2 = !![]);
    _0x34e3d2 && this[_0x3daaf0(0x36d)]();
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x36d)] = function () {
    const _0x5dd9f9 = _0x4518ba,
      _0x15d013 = Window_BTB_TurnOrder[_0x5dd9f9(0x1ef)],
      _0x1371bf = this[_0x5dd9f9(0x3a7)](),
      _0x5461d7 = _0x15d013[_0x5dd9f9(0x1fd)],
      _0x259c3f = _0x15d013['SubjectDistance'],
      _0x407f22 = SceneManager['_scene'][_0x5dd9f9(0x23b)];
    if (!_0x407f22) return;
    const _0x25b922 = this['containerPosition']();
    (this['_positionDuration'] = _0x15d013[_0x5dd9f9(0x407)]),
      (this[_0x5dd9f9(0x38e)] = _0x1371bf ? _0x15d013[_0x5dd9f9(0x262)] * _0x25b922 : 0x0),
      (this['_positionTargetY'] = _0x1371bf ? 0x0 : _0x15d013[_0x5dd9f9(0x262)] * _0x25b922),
      _0x25b922 > 0x0 && ((this[_0x5dd9f9(0x38e)] += _0x1371bf ? _0x259c3f : 0x0), (this[_0x5dd9f9(0x431)] += _0x1371bf ? 0x0 : _0x259c3f)),
      _0x5461d7
        ? (this[_0x5dd9f9(0x38e)] = _0x1371bf ? _0x407f22[_0x5dd9f9(0x295)] - this['_positionTargetX'] - _0x15d013['SpriteThin'] : 0x0)
        : (this[_0x5dd9f9(0x431)] = _0x1371bf ? 0x0 : _0x407f22[_0x5dd9f9(0x403)] - this[_0x5dd9f9(0x431)] - _0x15d013['SpriteThin']);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x25a)] = function () {
    const _0x2f6592 = _0x4518ba;
    if (this[_0x2f6592(0x3b3)] > 0x0) return;
    if (this[_0x2f6592(0x3b1)] > 0x0) {
      const _0x41050d = this[_0x2f6592(0x3b1)];
      (this['x'] = (this['x'] * (_0x41050d - 0x1) + this[_0x2f6592(0x38e)]) / _0x41050d), (this['y'] = (this['y'] * (_0x41050d - 0x1) + this[_0x2f6592(0x431)]) / _0x41050d), this[_0x2f6592(0x3b1)]--;
    }
    if (this[_0x2f6592(0x3b1)] <= 0x0) {
      (this['x'] = this[_0x2f6592(0x38e)]), (this['y'] = this[_0x2f6592(0x431)]);
      if (this[_0x2f6592(0x333)] < 0xff && !this['_isBattleOver'] && this[_0x2f6592(0x3b3)] <= 0x0) {
        const _0x7be0e7 = this['battler']();
        _0x7be0e7 && (this['_fadeTarget'] = _0x7be0e7[_0x2f6592(0x353)]() && _0x7be0e7[_0x2f6592(0x406)]() ? 0xff : 0x0);
      }
    }
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x1e7)] = function () {
    const _0x2dc5ce = _0x4518ba,
      _0x2ac5e3 = Window_BTB_TurnOrder[_0x2dc5ce(0x1ef)],
      _0x58ed37 = this[_0x2dc5ce(0x3a7)]() ? _0x2ac5e3['MaxHorzSprites'] : _0x2ac5e3[_0x2dc5ce(0x42a)];
    return _0x58ed37 + 0x1;
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2ce)] = function () {
    const _0xc304c3 = _0x4518ba;
    return SceneManager[_0xc304c3(0x243)][_0xc304c3(0x23b)];
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)]['containerPosition'] = function () {
    const _0x3dfbc1 = _0x4518ba,
      _0x14d892 = this[_0x3dfbc1(0x36e)]();
    if (!_0x14d892) return this['defaultPosition']();
    if (_0x14d892 === BattleManager['_subject']) return 0x0;
    if (BattleManager[_0x3dfbc1(0x240)][_0x3dfbc1(0x3cf)](_0x14d892)) {
      const _0x5aeac9 = BattleManager[_0x3dfbc1(0x240)][_0x3dfbc1(0x35b)](_0x14d892) + 0x1;
      return _0x5aeac9;
    }
    return this[_0x3dfbc1(0x1e7)]();
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x3c1)] = function (_0x9c775b) {
    const _0x118106 = _0x4518ba,
      _0xc289ec = Window_BTB_TurnOrder['Settings'];
    (this[_0x118106(0x3b3)] = _0xc289ec['UpdateFrames']), (this[_0x118106(0x41f)] = _0x9c775b);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x311)] = function () {
    const _0x4873ae = _0x4518ba,
      _0x2af543 = this[_0x4873ae(0x36e)]();
    if (!_0x2af543) return;
    if (this['_isAlive'] === _0x2af543[_0x4873ae(0x353)]() && this[_0x4873ae(0x32d)] === _0x2af543[_0x4873ae(0x406)]()) return;
    (this[_0x4873ae(0x40f)] = _0x2af543[_0x4873ae(0x353)]()), (this[_0x4873ae(0x32d)] = _0x2af543[_0x4873ae(0x406)]());
    let _0x3e2998 = this['_isAlive'] && this[_0x4873ae(0x32d)] ? 0xff : 0x0;
    this[_0x4873ae(0x3c1)](_0x3e2998);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x28d)] = function () {
    const _0x2b0d43 = _0x4518ba;
    if (this['_fadeDuration'] > 0x0) {
      const _0x5dc703 = this[_0x2b0d43(0x3b3)];
      (this[_0x2b0d43(0x333)] = (this[_0x2b0d43(0x333)] * (_0x5dc703 - 0x1) + this[_0x2b0d43(0x41f)]) / _0x5dc703),
        this[_0x2b0d43(0x3b3)]--,
        this['_fadeDuration'] <= 0x0 && (this[_0x2b0d43(0x2e8)](), (this[_0x2b0d43(0x3b1)] = 0x0), this[_0x2b0d43(0x25a)](), (this['opacity'] = this[_0x2b0d43(0x41f)]));
    }
    if (this['_isBattleOver']) return;
    BattleManager[_0x2b0d43(0x3ba)] === 'battleEnd' && ((this['_isBattleOver'] = !![]), this[_0x2b0d43(0x3c1)](0x0));
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x1da)] = function () {
    const _0x567433 = _0x4518ba,
      _0x1adeef = this['battler']();
    if (!_0x1adeef) return;
    const _0x34c574 = Window_BTB_TurnOrder[_0x567433(0x1ef)],
      _0x4339b3 = this[_0x567433(0x277)] === $gameParty ? _0x567433(0x287) : _0x567433(0x382);
    let _0x9fd22d = _0x1adeef[_0x567433(0x370)]();
    if (_0x1adeef[_0x567433(0x204)]() && _0x9fd22d === 'enemy') _0x9fd22d = 'face';
    else _0x1adeef[_0x567433(0x36f)]() && _0x9fd22d === _0x567433(0x3d5) && (_0x9fd22d = 'enemy');
    if (this[_0x567433(0x1e3)] !== _0x9fd22d) return this[_0x567433(0x390)]();
    switch (this[_0x567433(0x1e3)]) {
      case _0x567433(0x2c5):
        if (this[_0x567433(0x412)] !== _0x1adeef['TurnOrderBTBGraphicFaceName']()) return this['processUpdateGraphic']();
        if (this[_0x567433(0x321)] !== _0x1adeef[_0x567433(0x1f3)]()) return this[_0x567433(0x390)]();
        break;
      case _0x567433(0x33d):
        if (this[_0x567433(0x2a5)] !== _0x1adeef[_0x567433(0x3d9)]()) return this[_0x567433(0x390)]();
        break;
      case 'enemy':
        if (_0x1adeef['hasSvBattler']()) {
          if (this['_graphicSv'] !== _0x1adeef['svBattlerName']()) return this[_0x567433(0x390)]();
        } else {
          if (this[_0x567433(0x23d)] !== _0x1adeef[_0x567433(0x258)]()) return this['processUpdateGraphic']();
        }
        break;
      case 'svactor':
        if (_0x1adeef[_0x567433(0x204)]()) {
          if (this[_0x567433(0x1ed)] !== _0x1adeef['battlerName']()) return this[_0x567433(0x390)]();
        } else {
          if (this[_0x567433(0x23d)] !== _0x1adeef[_0x567433(0x258)]()) return this[_0x567433(0x390)]();
        }
        break;
    }
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)]['processUpdateGraphic'] = function () {
    const _0x6c0a4c = _0x4518ba,
      _0x530cce = this[_0x6c0a4c(0x36e)]();
    if (!_0x530cce) return;
    this[_0x6c0a4c(0x1e3)] = _0x530cce['TurnOrderBTBGraphicType']();
    if (_0x530cce[_0x6c0a4c(0x204)]() && this[_0x6c0a4c(0x1e3)] === 'enemy') this[_0x6c0a4c(0x1e3)] = _0x6c0a4c(0x2c5);
    else _0x530cce[_0x6c0a4c(0x36f)]() && this[_0x6c0a4c(0x1e3)] === _0x6c0a4c(0x3d5) && (this[_0x6c0a4c(0x1e3)] = _0x6c0a4c(0x345));
    let _0x2bfaa2;
    switch (this['_graphicType']) {
      case 'face':
        (this['_graphicFaceName'] = _0x530cce[_0x6c0a4c(0x348)]()),
          (this[_0x6c0a4c(0x321)] = _0x530cce[_0x6c0a4c(0x1f3)]()),
          (_0x2bfaa2 = ImageManager[_0x6c0a4c(0x244)](this[_0x6c0a4c(0x412)])),
          _0x2bfaa2['addLoadListener'](this[_0x6c0a4c(0x36a)]['bind'](this, _0x2bfaa2));
        break;
      case 'icon':
        (this[_0x6c0a4c(0x2a5)] = _0x530cce['createTurnOrderBTBGraphicIconIndex']()),
          (_0x2bfaa2 = ImageManager['loadSystem']('IconSet')),
          _0x2bfaa2[_0x6c0a4c(0x3dd)](this[_0x6c0a4c(0x375)]['bind'](this, _0x2bfaa2));
        break;
      case _0x6c0a4c(0x345):
        if (_0x530cce[_0x6c0a4c(0x237)]())
          (this['_graphicSv'] = _0x530cce[_0x6c0a4c(0x393)]()),
            (_0x2bfaa2 = ImageManager[_0x6c0a4c(0x23f)](this[_0x6c0a4c(0x1ed)])),
            _0x2bfaa2[_0x6c0a4c(0x3dd)](this[_0x6c0a4c(0x2f5)][_0x6c0a4c(0x280)](this, _0x2bfaa2));
        else
          $gameSystem[_0x6c0a4c(0x2da)]()
            ? ((this[_0x6c0a4c(0x23d)] = _0x530cce['battlerName']()),
              (_0x2bfaa2 = ImageManager[_0x6c0a4c(0x246)](this['_graphicEnemy'])),
              _0x2bfaa2[_0x6c0a4c(0x3dd)](this[_0x6c0a4c(0x409)][_0x6c0a4c(0x280)](this, _0x2bfaa2)))
            : ((this['_graphicEnemy'] = _0x530cce['battlerName']()),
              (_0x2bfaa2 = ImageManager['loadEnemy'](this['_graphicEnemy'])),
              _0x2bfaa2['addLoadListener'](this[_0x6c0a4c(0x409)][_0x6c0a4c(0x280)](this, _0x2bfaa2)));
        break;
      case _0x6c0a4c(0x3d5):
        (this[_0x6c0a4c(0x1ed)] = _0x530cce['battlerName']()),
          (_0x2bfaa2 = ImageManager[_0x6c0a4c(0x23f)](this['_graphicSv'])),
          _0x2bfaa2[_0x6c0a4c(0x3dd)](this[_0x6c0a4c(0x2f5)]['bind'](this, _0x2bfaa2));
        break;
    }
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)]['changeFaceGraphicBitmap'] = function (_0x25f3df) {
    const _0x575b0c = _0x4518ba,
      _0x303ed9 = this[_0x575b0c(0x321)],
      _0x2cd698 = this[_0x575b0c(0x39b)](),
      _0x1272c8 = this[_0x575b0c(0x41e)](),
      _0x4adb8a = Math[_0x575b0c(0x3e3)](_0x2cd698, _0x1272c8);
    this[_0x575b0c(0x319)][_0x575b0c(0x221)] = new Bitmap(_0x2cd698, _0x1272c8);
    const _0x172189 = this['_graphicSprite'][_0x575b0c(0x221)],
      _0x559959 = ImageManager['faceWidth'],
      _0x597462 = ImageManager[_0x575b0c(0x2db)],
      _0x437e00 = _0x4adb8a / Math[_0x575b0c(0x3e3)](_0x559959, _0x597462),
      _0xccda28 = ImageManager['faceWidth'],
      _0x24868a = ImageManager[_0x575b0c(0x2db)],
      _0x5e0b4b = (_0x303ed9 % 0x4) * _0x559959 + (_0x559959 - _0xccda28) / 0x2,
      _0x167abf = Math[_0x575b0c(0x379)](_0x303ed9 / 0x4) * _0x597462 + (_0x597462 - _0x24868a) / 0x2,
      _0x3bdbbe = (_0x2cd698 - _0x559959 * _0x437e00) / 0x2,
      _0x38d4c7 = (_0x1272c8 - _0x597462 * _0x437e00) / 0x2;
    _0x172189[_0x575b0c(0x3c5)](_0x25f3df, _0x5e0b4b, _0x167abf, _0xccda28, _0x24868a, _0x3bdbbe, _0x38d4c7, _0x4adb8a, _0x4adb8a);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x375)] = function (_0x14a398) {
    const _0x130611 = _0x4518ba,
      _0x2e7439 = this[_0x130611(0x2a5)],
      _0x85cddf = this['bitmapWidth'](),
      _0x3b1a1d = this['bitmapHeight']();
    this[_0x130611(0x319)][_0x130611(0x221)] = new Bitmap(_0x85cddf, _0x3b1a1d);
    const _0x35d751 = this['_graphicSprite']['bitmap'],
      _0x444d30 = ImageManager[_0x130611(0x39f)],
      _0x397598 = ImageManager[_0x130611(0x288)],
      _0x2e0305 = Math[_0x130611(0x29d)](_0x444d30, _0x397598, _0x85cddf, _0x3b1a1d),
      _0x1216b7 = (_0x2e7439 % 0x10) * _0x444d30,
      _0x5aac75 = Math[_0x130611(0x379)](_0x2e7439 / 0x10) * _0x397598,
      _0x489226 = Math[_0x130611(0x379)](Math[_0x130611(0x3e3)](_0x85cddf - _0x2e0305, 0x0) / 0x2),
      _0x377817 = Math[_0x130611(0x379)](Math[_0x130611(0x3e3)](_0x3b1a1d - _0x2e0305, 0x0) / 0x2);
    _0x35d751[_0x130611(0x3c5)](_0x14a398, _0x1216b7, _0x5aac75, _0x444d30, _0x397598, _0x489226, _0x377817, _0x2e0305, _0x2e0305);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2f5)] = function (_0x34a692) {
    const _0x2907b1 = _0x4518ba,
      _0x4be3ae = this['bitmapWidth'](),
      _0x284db6 = this[_0x2907b1(0x41e)](),
      _0x3a3703 = Math['min'](_0x4be3ae, _0x284db6);
    this[_0x2907b1(0x319)][_0x2907b1(0x221)] = new Bitmap(_0x4be3ae, _0x284db6);
    const _0x3aaa11 = this[_0x2907b1(0x319)][_0x2907b1(0x221)],
      _0x299988 = this[_0x2907b1(0x1ed)]['match'](/\$/i),
      _0x29b49c = _0x299988 ? 0x1 : ImageManager[_0x2907b1(0x3e2)],
      _0x47ac0c = _0x299988 ? 0x1 : ImageManager[_0x2907b1(0x292)],
      _0x1c922a = _0x34a692[_0x2907b1(0x295)] / _0x29b49c,
      _0x3da851 = _0x34a692[_0x2907b1(0x403)] / _0x47ac0c,
      _0x35dd96 = Math[_0x2907b1(0x29d)](0x1, _0x3a3703 / _0x1c922a, _0x3a3703 / _0x3da851),
      _0x4bce41 = _0x1c922a * _0x35dd96,
      _0x59145b = _0x3da851 * _0x35dd96,
      _0x48e658 = Math[_0x2907b1(0x297)]((_0x4be3ae - _0x4bce41) / 0x2),
      _0x4d149b = Math[_0x2907b1(0x297)]((_0x284db6 - _0x59145b) / 0x2);
    _0x3aaa11['blt'](_0x34a692, 0x0, 0x0, _0x1c922a, _0x3da851, _0x48e658, _0x4d149b, _0x4bce41, _0x59145b);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)]['changeEnemyGraphicBitmap'] = function (_0x551b45) {
    const _0x49d9bd = _0x4518ba,
      _0x5d8650 = Window_BTB_TurnOrder[_0x49d9bd(0x1ef)],
      _0x504cad = this[_0x49d9bd(0x39b)](),
      _0x565d72 = this[_0x49d9bd(0x41e)](),
      _0x4c7fcf = Math[_0x49d9bd(0x29d)](_0x504cad, _0x565d72);
    this[_0x49d9bd(0x319)][_0x49d9bd(0x221)] = new Bitmap(_0x504cad, _0x565d72);
    const _0xdbc54b = this['_graphicSprite'][_0x49d9bd(0x221)],
      _0x45930d = Math['min'](0x1, _0x4c7fcf / _0x551b45[_0x49d9bd(0x295)], _0x4c7fcf / _0x551b45[_0x49d9bd(0x403)]),
      _0x56990d = _0x551b45['width'] * _0x45930d,
      _0x433524 = _0x551b45[_0x49d9bd(0x403)] * _0x45930d,
      _0x3312c6 = Math[_0x49d9bd(0x297)]((_0x504cad - _0x56990d) / 0x2),
      _0x577ff3 = Math['round']((_0x565d72 - _0x433524) / 0x2);
    _0xdbc54b[_0x49d9bd(0x3c5)](_0x551b45, 0x0, 0x0, _0x551b45[_0x49d9bd(0x295)], _0x551b45['height'], _0x3312c6, _0x577ff3, _0x56990d, _0x433524);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x2bf)] = function () {
    const _0x539b52 = _0x4518ba,
      _0x21e846 = this[_0x539b52(0x36e)]();
    if (!_0x21e846) return;
    if (!_0x21e846[_0x539b52(0x36f)]()) return;
    if (this['_graphicHue'] === _0x21e846[_0x539b52(0x210)]()) return;
    (this[_0x539b52(0x1e9)] = _0x21e846[_0x539b52(0x210)]()), this['_graphicSprite'][_0x539b52(0x2d5)](_0x21e846['hasSvBattler']() ? 0x0 : this['_graphicHue']);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x1e4)] = function () {
    const _0x45d5fc = _0x4518ba;
    if (!this[_0x45d5fc(0x302)]) return;
    const _0x31b2aa = this[_0x45d5fc(0x36e)]();
    if (!_0x31b2aa) return;
    if (this[_0x45d5fc(0x29c)] === _0x31b2aa[_0x45d5fc(0x29c)] && this['_plural'] === _0x31b2aa[_0x45d5fc(0x274)]) return;
    (this[_0x45d5fc(0x29c)] = _0x31b2aa[_0x45d5fc(0x29c)]), (this[_0x45d5fc(0x274)] = _0x31b2aa[_0x45d5fc(0x274)]);
    const _0x394e84 = Window_BTB_TurnOrder[_0x45d5fc(0x1ef)],
      _0x490ff4 = this[_0x45d5fc(0x3a7)](),
      _0x50344c = this[_0x45d5fc(0x39b)](),
      _0x11b663 = this[_0x45d5fc(0x41e)](),
      _0x1c65c0 = this['_letterSprite'][_0x45d5fc(0x221)];
    _0x1c65c0[_0x45d5fc(0x251)]();
    if (!this['_plural']) return;
    (_0x1c65c0[_0x45d5fc(0x1f8)] = _0x394e84['EnemyBattlerFontFace'] || $gameSystem[_0x45d5fc(0x3f4)]()),
      (_0x1c65c0[_0x45d5fc(0x40a)] = _0x394e84[_0x45d5fc(0x2f0)] || 0x10),
      _0x490ff4
        ? _0x1c65c0[_0x45d5fc(0x40e)](this[_0x45d5fc(0x29c)][_0x45d5fc(0x3ec)](), 0x0, _0x11b663 / 0x2, _0x50344c, _0x11b663 / 0x2, _0x45d5fc(0x206))
        : _0x1c65c0[_0x45d5fc(0x40e)](this[_0x45d5fc(0x29c)][_0x45d5fc(0x3ec)](), 0x0, 0x2, _0x50344c - 0x8, _0x11b663 - 0x4, _0x45d5fc(0x39a));
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x39d)] = function () {
    const _0x331755 = _0x4518ba,
      _0x3d49bc = this[_0x331755(0x36e)]();
    if (!_0x3d49bc) return;
    const _0x456ad4 = _0x3d49bc[_0x331755(0x36e)]();
    if (!_0x456ad4) return;
    const _0x5330dd = _0x456ad4[_0x331755(0x31b)]();
    if (!_0x5330dd) return;
    this[_0x331755(0x328)](_0x5330dd[_0x331755(0x289)]);
  }),
  (Sprite_BTB_TurnOrder_Battler[_0x4518ba(0x39c)][_0x4518ba(0x20b)] = function () {
    const _0x3207c2 = _0x4518ba;
    return this[_0x3207c2(0x36e)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x3d6)] = Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x2de)]),
  (Window_Base[_0x4518ba(0x39c)]['makeAdditionalSkillCostText'] = function (_0x6287cd, _0x2b2672, _0x5a8893) {
    const _0x47bcf5 = _0x4518ba;
    return (
      (_0x5a8893 = VisuMZ[_0x47bcf5(0x3bc)][_0x47bcf5(0x3d6)][_0x47bcf5(0x2e6)](this, _0x6287cd, _0x2b2672, _0x5a8893)),
      (_0x5a8893 = this[_0x47bcf5(0x249)](_0x6287cd, _0x2b2672, _0x5a8893)),
      _0x5a8893
    );
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Window_Base_drawItemNumber'] = Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x3d1)]),
  (Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x3d1)] = function (_0x3ce7d4, _0x1ea66e, _0x36e8c6, _0x5efffc) {
    const _0x51335e = _0x4518ba;
    BattleManager[_0x51335e(0x34d)]() && this['constructor'] === Window_BattleItem
      ? this[_0x51335e(0x290)](_0x3ce7d4, _0x1ea66e, _0x36e8c6, _0x5efffc)
      : VisuMZ[_0x51335e(0x3bc)][_0x51335e(0x22b)][_0x51335e(0x2e6)](this, _0x3ce7d4, _0x1ea66e, _0x36e8c6, _0x5efffc),
      this[_0x51335e(0x3ae)]();
  }),
  (Window_Base['prototype']['drawItemNumberBTB'] = function (_0x2dfdea, _0x1edfcf, _0x11c981, _0xb5f5d4) {
    const _0x3290cb = _0x4518ba,
      _0x4fe4f3 = VisuMZ['BattleSystemBTB'][_0x3290cb(0x1ef)][_0x3290cb(0x402)],
      _0x3b1d97 = BattleManager['_actor'] || $gameParty['members']()[0x0],
      _0x25760b = this[_0x3290cb(0x249)](_0x3b1d97, _0x2dfdea, ''),
      _0x3fdd5a = this[_0x3290cb(0x2ac)](_0x25760b)[_0x3290cb(0x295)],
      _0x2f7d1d = _0x4fe4f3[_0x3290cb(0x1e5)];
    let _0x6d243d = _0x1edfcf + _0xb5f5d4 - _0x3fdd5a;
    if (_0x25760b === '') VisuMZ[_0x3290cb(0x3bc)]['Window_Base_drawItemNumber'][_0x3290cb(0x2e6)](this, _0x2dfdea, _0x1edfcf, _0x11c981, _0xb5f5d4);
    else {
      if (this['isDrawItemNumber'](_0x2dfdea)) {
        this[_0x3290cb(0x3ae)]();
        const _0x11f6ac = VisuMZ[_0x3290cb(0x3eb)][_0x3290cb(0x1ef)][_0x3290cb(0x299)];
        this[_0x3290cb(0x325)][_0x3290cb(0x40a)] = _0x11f6ac[_0x3290cb(0x434)];
        if (_0x2f7d1d) {
          const _0x31c947 = _0x11f6ac[_0x3290cb(0x2bb)],
            _0x4d926d = _0x31c947[_0x3290cb(0x27b)]($gameParty[_0x3290cb(0x24f)](_0x2dfdea)),
            _0x2b0c82 = this[_0x3290cb(0x281)](_0x4d926d + this[_0x3290cb(0x339)]());
          _0x6d243d -= _0x2b0c82;
        } else _0xb5f5d4 -= this[_0x3290cb(0x281)](this['skillCostSeparator']()) + _0x3fdd5a;
        VisuMZ[_0x3290cb(0x3bc)][_0x3290cb(0x22b)][_0x3290cb(0x2e6)](this, _0x2dfdea, _0x1edfcf, _0x11c981, _0xb5f5d4);
      }
    }
    this[_0x3290cb(0x28f)](_0x25760b, _0x6d243d, _0x11c981);
  }),
  (Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x249)] = function (_0x48e597, _0x244a9d, _0x4445c3) {
    const _0x39b171 = _0x4518ba;
    if (!BattleManager[_0x39b171(0x34d)]()) return _0x4445c3;
    if (!_0x48e597) return _0x4445c3;
    if (!_0x244a9d) return _0x4445c3;
    if (_0x244a9d[_0x39b171(0x38b)][_0x39b171(0x2a3)](VisuMZ[_0x39b171(0x3bc)][_0x39b171(0x2fb)][_0x39b171(0x3c9)])) return _0x4445c3;
    let _0xba0dae = _0x48e597[_0x39b171(0x3a2)](_0x244a9d);
    const _0x42d2b6 = VisuMZ[_0x39b171(0x3bc)][_0x39b171(0x1ef)][_0x39b171(0x402)],
      _0x152080 = _0x42d2b6[_0x39b171(0x1e5)],
      _0x16cd4c = _0x42d2b6[_0x39b171(0x2cf)],
      _0x219bdb = _0x42d2b6[_0x39b171(0x318)],
      _0x983a2b = _0x42d2b6['ReduceShownBPCost'] || 0x0,
      _0x12a6a6 = _0x42d2b6[_0x39b171(0x3b2)],
      _0x6fe8f7 = _0x42d2b6[_0x39b171(0x205)];
    if (DataManager[_0x39b171(0x3b9)](_0x244a9d) && this['constructor'] === Window_ActorCommand) {
      if (!_0x16cd4c && _0x244a9d['id'] === _0x48e597[_0x39b171(0x200)]()) return _0x4445c3;
      if (!_0x219bdb && _0x244a9d['id'] === _0x48e597[_0x39b171(0x3e0)]()) return _0x4445c3;
    }
    _0xba0dae -= _0x983a2b;
    if (_0xba0dae < 0x0) return _0x4445c3;
    if (!_0x12a6a6 && _0xba0dae === 0x0) return _0x4445c3;
    if (!_0x6fe8f7 && _0xba0dae === 0x1) return _0x4445c3;
    const _0x58b4bc = _0x39b171(0x320)['format'](ImageManager[_0x39b171(0x3be)]),
      _0x10bff8 = TextManager[_0x39b171(0x414)];
    let _0x3ac567 = TextManager[_0x39b171(0x367)][_0x39b171(0x27b)](_0xba0dae, _0x10bff8, _0x58b4bc);
    if (_0x4445c3 === '') _0x4445c3 += _0x3ac567;
    else _0x152080 ? (_0x4445c3 = _0x3ac567 + this[_0x39b171(0x339)]() + _0x4445c3) : (_0x4445c3 = _0x4445c3 + this[_0x39b171(0x339)]() + _0x3ac567);
    return _0x4445c3;
  }),
  (Window_Selectable['prototype'][_0x4518ba(0x2b8)] = function () {
    return ![];
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Window_Selectable_select'] = Window_Selectable['prototype'][_0x4518ba(0x1d6)]),
  (Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x1d6)] = function (_0x57e716) {
    const _0x55d3bb = _0x4518ba;
    VisuMZ[_0x55d3bb(0x3bc)][_0x55d3bb(0x416)][_0x55d3bb(0x2e6)](this, _0x57e716), this['isBattleItemWindowBTB']() && this[_0x55d3bb(0x282)] && this[_0x55d3bb(0x20e)]();
  }),
  (Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x20e)] = function () {
    const _0xe21e22 = _0x4518ba;
    BattleManager[_0xe21e22(0x235)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Window_Help_setItem'] = Window_Help[_0x4518ba(0x39c)][_0x4518ba(0x3fc)]),
  (Window_Help['prototype'][_0x4518ba(0x3fc)] = function (_0x35fde0) {
    const _0x156256 = _0x4518ba;
    BattleManager['isBTB']() && _0x35fde0 && _0x35fde0[_0x156256(0x38b)] && _0x35fde0[_0x156256(0x38b)][_0x156256(0x2a3)](VisuMZ[_0x156256(0x3bc)][_0x156256(0x2fb)][_0x156256(0x323)])
      ? this[_0x156256(0x2f4)](String(RegExp['$1']))
      : VisuMZ[_0x156256(0x3bc)][_0x156256(0x30e)][_0x156256(0x2e6)](this, _0x35fde0);
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Window_BattleLog_startAction'] = Window_BattleLog['prototype'][_0x4518ba(0x418)]),
  (Window_BattleLog[_0x4518ba(0x39c)][_0x4518ba(0x418)] = function (_0x57fbc6, _0xf735e8, _0x3b03e5) {
    const _0x307386 = _0x4518ba;
    this[_0x307386(0x24d)](_0x57fbc6) ? this[_0x307386(0x242)](_0x57fbc6, _0xf735e8, _0x3b03e5) : VisuMZ[_0x307386(0x3bc)][_0x307386(0x256)][_0x307386(0x2e6)](this, _0x57fbc6, _0xf735e8, _0x3b03e5);
  }),
  (Window_BattleLog[_0x4518ba(0x39c)][_0x4518ba(0x430)] = function (_0x168574, _0x1e63ec, _0x3a5fbf) {
    const _0x4741e4 = _0x4518ba;
    VisuMZ[_0x4741e4(0x3bc)][_0x4741e4(0x256)][_0x4741e4(0x2e6)](this, _0x168574, _0x1e63ec, _0x3a5fbf);
  }),
  (Window_BattleLog[_0x4518ba(0x39c)][_0x4518ba(0x24d)] = function (_0x4a4d85) {
    const _0x2a074a = _0x4518ba;
    if (!BattleManager[_0x2a074a(0x34d)]()) return ![];
    if (!_0x4a4d85) return ![];
    if (!_0x4a4d85['isEnemy']()) return ![];
    if (_0x4a4d85[_0x2a074a(0x3a8)]) return ![];
    const _0x1b5e45 = VisuMZ[_0x2a074a(0x3bc)][_0x2a074a(0x1ef)]['BraveAnimation'];
    if (!_0x1b5e45[_0x2a074a(0x26a)]) return ![];
    if (_0x1b5e45[_0x2a074a(0x2a7)] <= 0x0) return ![];
    return VisuMZ[_0x2a074a(0x3bc)]['Settings'][_0x2a074a(0x2b5)][_0x2a074a(0x26a)];
  }),
  (Window_BattleLog[_0x4518ba(0x39c)][_0x4518ba(0x242)] = function (_0x3a4a8f, _0x109956, _0x3b9c82) {
    const _0x8505e1 = _0x4518ba;
    _0x3a4a8f['_braveStartupAnimation'] = !![];
    let _0x5bfbfb = _0x3a4a8f[_0x8505e1(0x2d0)]();
    const _0x1be67d = VisuMZ[_0x8505e1(0x3bc)]['Settings'][_0x8505e1(0x2b5)],
      _0x565fc5 = _0x1be67d[_0x8505e1(0x2a7)],
      _0x319ac4 = _0x1be67d[_0x8505e1(0x22e)];
    while (_0x5bfbfb--) {
      this[_0x8505e1(0x3f5)]('showNormalAnimation', [_0x3a4a8f], _0x565fc5), _0x5bfbfb > 0x0 ? this['push']('waitCount', _0x319ac4) : this['push'](_0x8505e1(0x3ee));
    }
    this[_0x8505e1(0x3f5)](_0x8505e1(0x430), _0x3a4a8f, _0x109956, _0x3b9c82);
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x2eb)] = Window_ActorCommand[_0x4518ba(0x39c)]['addGuardCommand']),
  (Window_ActorCommand[_0x4518ba(0x39c)]['addGuardCommand'] = function () {
    const _0x1c8ee8 = _0x4518ba;
    this[_0x1c8ee8(0x391)](), VisuMZ[_0x1c8ee8(0x3bc)]['Window_ActorCommand_addGuardCommand'][_0x1c8ee8(0x2e6)](this);
  }),
  (Window_ActorCommand[_0x4518ba(0x39c)][_0x4518ba(0x391)] = function () {
    const _0x5342e1 = _0x4518ba;
    if (!this['canAddBraveCommand']()) return;
    const _0x4c919c = this[_0x5342e1(0x3d2)](),
      _0x1e878d = TextManager['btbBraveCommand'],
      _0x32d4cf = ImageManager[_0x5342e1(0x3be)],
      _0x2f67c8 = _0x4c919c === _0x5342e1(0x2d3) ? _0x1e878d : _0x5342e1(0x2c8)[_0x5342e1(0x27b)](_0x32d4cf, _0x1e878d);
    this[_0x5342e1(0x3aa)](_0x2f67c8, _0x5342e1(0x3f6), this[_0x5342e1(0x2a9)][_0x5342e1(0x301)]()), BattleManager['refreshStatusBTB']();
  }),
  (Window_ActorCommand[_0x4518ba(0x39c)]['canAddBraveCommand'] = function () {
    const _0x23ba07 = _0x4518ba;
    if (!BattleManager[_0x23ba07(0x34d)]()) return ![];
    if (!VisuMZ[_0x23ba07(0x3bc)][_0x23ba07(0x1ef)]['Window'][_0x23ba07(0x396)]) return ![];
    if (this[_0x23ba07(0x2a9)] && this[_0x23ba07(0x2a9)][_0x23ba07(0x22f)]()) return ![];
    return !![];
  }),
  (VisuMZ[_0x4518ba(0x3bc)]['Window_ActorCommand_setup'] = Window_ActorCommand[_0x4518ba(0x39c)]['setup']),
  (Window_ActorCommand[_0x4518ba(0x39c)][_0x4518ba(0x2f3)] = function (_0x3c26f3) {
    const _0x1ec48c = _0x4518ba;
    VisuMZ[_0x1ec48c(0x3bc)][_0x1ec48c(0x1f5)][_0x1ec48c(0x2e6)](this, _0x3c26f3), this[_0x1ec48c(0x30d)]();
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x24b)] = Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x356)]),
  (Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x356)] = function () {
    const _0x2a9833 = _0x4518ba;
    this[_0x2a9833(0x336)]()
      ? this['_actor'] && !this[_0x2a9833(0x2a9)][_0x2a9833(0x22f)]() && this[_0x2a9833(0x2a9)][_0x2a9833(0x301)]() && SceneManager[_0x2a9833(0x243)][_0x2a9833(0x413)]()
      : VisuMZ['BattleSystemBTB']['Window_Selectable_cursorPagedown']['call'](this);
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x3f3)] = Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x294)]),
  (Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x294)] = function () {
    const _0x236c10 = _0x4518ba;
    this['isUsePageUpDnShortcutBTB']()
      ? this[_0x236c10(0x2a9)] && !this[_0x236c10(0x2a9)][_0x236c10(0x22f)]() && this[_0x236c10(0x2a9)]['numActions']() > 0x1 && SceneManager[_0x236c10(0x243)][_0x236c10(0x1d8)]()
      : VisuMZ[_0x236c10(0x3bc)]['Window_Selectable_cursorPageup'][_0x236c10(0x2e6)](this);
  }),
  (Window_Selectable[_0x4518ba(0x39c)][_0x4518ba(0x336)] = function () {
    const _0x1b184f = _0x4518ba;
    if (this[_0x1b184f(0x3f7)] !== Window_ActorCommand) return ![];
    if (!SceneManager['isSceneBattle']()) return ![];
    if (!BattleManager['isBTB']()) return ![];
    return VisuMZ[_0x1b184f(0x3bc)][_0x1b184f(0x1ef)][_0x1b184f(0x1d5)][_0x1b184f(0x3f9)];
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x32f)] = Window_ActorCommand['prototype'][_0x4518ba(0x380)]),
  (Window_ActorCommand[_0x4518ba(0x39c)]['makeCommandList'] = function () {
    const _0x46e3bd = _0x4518ba;
    VisuMZ[_0x46e3bd(0x3bc)][_0x46e3bd(0x32f)][_0x46e3bd(0x2e6)](this), this[_0x46e3bd(0x30d)]();
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x1eb)] = Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x23a)]),
  (Window_Base[_0x4518ba(0x39c)]['close'] = function () {
    const _0x1080bb = _0x4518ba;
    VisuMZ[_0x1080bb(0x3bc)][_0x1080bb(0x1eb)][_0x1080bb(0x2e6)](this), SceneManager[_0x1080bb(0x1fe)]() && this['destroyBTBActionCounters'] && this['destroyBTBActionCounters']();
  }),
  (Window_ActorCommand[_0x4518ba(0x39c)][_0x4518ba(0x1f0)] = function () {
    const _0x11d45a = _0x4518ba;
    if (!this[_0x11d45a(0x28e)]) return;
    this[_0x11d45a(0x28e)][_0x11d45a(0x221)] && this[_0x11d45a(0x28e)]['bitmap'][_0x11d45a(0x37c)](), this[_0x11d45a(0x354)](this['_btbActionSprite']), delete this[_0x11d45a(0x28e)];
  }),
  (Window_ActorCommand[_0x4518ba(0x39c)][_0x4518ba(0x30d)] = function () {
    const _0x2a1f9d = _0x4518ba;
    if (!BattleManager[_0x2a1f9d(0x34d)]()) return;
    if (!this[_0x2a1f9d(0x2a9)]) return;
    this[_0x2a1f9d(0x1f0)]();
    if (this['_actor'][_0x2a1f9d(0x22f)]()) return;
    (this['_btbActionSprite'] = new Sprite()), this['addChild'](this[_0x2a1f9d(0x28e)]), this['modifyBTBActionCounterSprite']();
  }),
  (Window_ActorCommand['prototype']['modifyBTBActionCounterSprite'] = function () {
    const _0x4c67aa = _0x4518ba,
      _0x30be4b = VisuMZ[_0x4c67aa(0x3bc)]['Settings']['Window'][_0x4c67aa(0x3e9)];
    _0x30be4b ? _0x30be4b[_0x4c67aa(0x2e6)](this, this[_0x4c67aa(0x28e)], this, this[_0x4c67aa(0x2a9)]) : this[_0x4c67aa(0x342)]['call'](this, this[_0x4c67aa(0x28e)], this, this[_0x4c67aa(0x2a9)]);
  }),
  (Window_ActorCommand['prototype']['modifyBTBActionCounterSprite_Fallback'] = function () {
    const _0x40978a = _0x4518ba,
      _0x1be0ce = arguments[0x0],
      _0xea9986 = arguments[0x1],
      _0x13df80 = arguments[0x2];
    (_0x1be0ce['x'] = Math[_0x40978a(0x297)](_0xea9986['width'] / 0x2)), (_0x1be0ce['y'] = 0x0), (_0x1be0ce[_0x40978a(0x437)]['x'] = 0.5), (_0x1be0ce[_0x40978a(0x437)]['y'] = 0.5);
    const _0x2efcdb = TextManager['btbActionSlot'],
      _0x1588af = TextManager[_0x40978a(0x3fa)];
    let _0x14c716 = _0x2efcdb[_0x40978a(0x3db)](_0x13df80[_0x40978a(0x2e1)]());
    const _0x54676f = _0x13df80['_actionInputIndex'];
    _0x14c716 = _0x14c716['substring'](0x0, _0x54676f) + _0x1588af + _0x14c716[_0x40978a(0x1ec)](_0x54676f + 0x1);
    const _0x4ac725 = new Bitmap(_0xea9986[_0x40978a(0x295)], _0xea9986[_0x40978a(0x2ad)]());
    (_0x4ac725[_0x40978a(0x40a)] = 0x24), _0x4ac725['drawText'](_0x14c716, 0x0, 0x0, _0x4ac725['width'], _0x4ac725[_0x40978a(0x403)], _0x40978a(0x206)), (_0x1be0ce[_0x40978a(0x221)] = _0x4ac725);
  }),
  (Window_ActorCommand[_0x4518ba(0x39c)]['isBattleItemWindowBTB'] = function () {
    return BattleManager['isBTB']();
  }),
  (Window_ActorCommand['prototype'][_0x4518ba(0x20e)] = function () {
    const _0x58fbaf = _0x4518ba,
      _0x2e1c71 = BattleManager['inputtingAction']();
    if (_0x2e1c71) {
      const _0x30c5e4 = this[_0x58fbaf(0x41a)]();
      switch (_0x30c5e4) {
        case _0x58fbaf(0x378):
          _0x2e1c71[_0x58fbaf(0x32a)]();
          break;
        case _0x58fbaf(0x362):
          _0x2e1c71['setGuard']();
          break;
        case _0x58fbaf(0x2ca):
          _0x2e1c71['setSkill'](this[_0x58fbaf(0x3f1)]());
          break;
        default:
          _0x2e1c71[_0x58fbaf(0x31c)](null);
          break;
      }
    }
    Window_Command[_0x58fbaf(0x39c)]['applyBattleItemWindowBTB'][_0x58fbaf(0x2e6)](this);
  }),
  (Window_Base[_0x4518ba(0x39c)][_0x4518ba(0x278)] = function (_0x434a97, _0x302d11, _0x231c42, _0x23284d, _0x210696) {
    const _0x118c04 = _0x4518ba;
    if (!_0x434a97) return;
    if (!BattleManager[_0x118c04(0x34d)]()) return;
    const _0x16419b = VisuMZ['BattleSystemBTB']['Settings'][_0x118c04(0x1d5)],
      _0x391055 = BattleManager[_0x118c04(0x3bb)]() ? _0x16419b['StatusPredictFmt'] : _0x16419b['StatusDisplayFmt'],
      _0x107848 = _0x16419b[_0x118c04(0x35e)],
      _0x2d28c8 = _0x16419b[_0x118c04(0x2d7)],
      _0x5e5755 = _0x16419b[_0x118c04(0x21a)];
    let _0x3fe8b9 = 0x0,
      _0x20b3bb = 0x0;
    _0x20b3bb = _0x434a97[_0x118c04(0x2ec)]();
    if (_0x20b3bb > 0x0) _0x3fe8b9 = _0x2d28c8;
    if (_0x20b3bb === 0x0) _0x3fe8b9 = _0x107848;
    if (_0x20b3bb < 0x0) _0x3fe8b9 = _0x5e5755;
    const _0x4f4fcb = _0x118c04(0x408)['format'](_0x3fe8b9, _0x20b3bb),
      _0x211b4f = _0x118c04(0x320)['format'](ImageManager[_0x118c04(0x3be)]);
    _0x20b3bb = _0x434a97[_0x118c04(0x3e1)]();
    if (_0x20b3bb > 0x0) _0x3fe8b9 = _0x2d28c8;
    if (_0x20b3bb === 0x0) _0x3fe8b9 = _0x107848;
    _0x20b3bb < 0x0 && (_0x3fe8b9 = _0x5e5755);
    const _0x3c6ba0 = _0x118c04(0x408)[_0x118c04(0x27b)](_0x3fe8b9, _0x20b3bb);
    let _0x43b8b0 = _0x391055[_0x118c04(0x27b)](_0x4f4fcb, TextManager[_0x118c04(0x414)], _0x211b4f, _0x3c6ba0);
    const _0x4cb926 = this[_0x118c04(0x2ac)](_0x43b8b0)[_0x118c04(0x295)];
    if (_0x210696 === 'center') _0x302d11 += Math[_0x118c04(0x297)]((_0x23284d - _0x4cb926) / 0x2);
    else _0x210696 === _0x118c04(0x39a) && (_0x302d11 += Math[_0x118c04(0x297)](_0x23284d - _0x4cb926));
    this[_0x118c04(0x28f)](_0x43b8b0, _0x302d11, _0x231c42, _0x23284d);
  }),
  (Window_StatusBase[_0x4518ba(0x39c)][_0x4518ba(0x222)] = function (_0x13d327) {
    const _0x85503f = _0x4518ba;
    if (!_0x13d327) return ![];
    if (!BattleManager[_0x85503f(0x34d)]()) return ![];
    if (!this[_0x85503f(0x27f)]) return ![];
    if (_0x13d327[_0x85503f(0x22f)]()) return ![];
    const _0x3475c7 = VisuMZ['BattleSystemBTB']['Settings'][_0x85503f(0x1d5)],
      _0x3e79d1 = this[_0x85503f(0x27f)]();
    return _0x3475c7[_0x85503f(0x38a)[_0x85503f(0x27b)](_0x3e79d1)];
  }),
  (VisuMZ['BattleSystemBTB'][_0x4518ba(0x3ab)] = Window_BattleStatus[_0x4518ba(0x39c)][_0x4518ba(0x31e)]),
  (Window_BattleStatus[_0x4518ba(0x39c)][_0x4518ba(0x31e)] = function (_0x5c1768) {
    const _0x5d0a94 = _0x4518ba;
    VisuMZ['BattleSystemBTB'][_0x5d0a94(0x3ab)][_0x5d0a94(0x2e6)](this, _0x5c1768);
    const _0xded44e = this['actor'](_0x5c1768);
    if (this[_0x5d0a94(0x222)](_0xded44e)) {
      const _0x1d36e9 = this[_0x5d0a94(0x28a)](_0x5c1768),
        _0xfe8e43 = $dataSystem[_0x5d0a94(0x3c0)] ? 0x4 : 0x3,
        _0x2a2186 = _0xfe8e43 * 0x80 + (_0xfe8e43 - 0x1) * 0x8 + 0x4;
      let _0x5d07ad = _0x1d36e9['x'] + this[_0x5d0a94(0x23c)];
      VisuMZ[_0x5d0a94(0x22a)][_0x5d0a94(0x1ef)]['BattleLayout'][_0x5d0a94(0x387)] ? (_0x5d07ad = _0x1d36e9['x'] + ImageManager['faceWidth'] + 0x8) : (_0x5d07ad += ImageManager['iconWidth']);
      const _0x3d6087 = Math['round'](Math[_0x5d0a94(0x29d)](_0x1d36e9['x'] + _0x1d36e9['width'] - _0x2a2186, _0x5d07ad));
      let _0x1861b0 = _0x3d6087 + 0x88,
        _0x41d8f2 = _0x1d36e9['y'];
      (_0x1861b0 += 0x88 * ($dataSystem[_0x5d0a94(0x3c0)] ? 0x3 : 0x2)), (_0x1861b0 += this[_0x5d0a94(0x3cb)]()), (_0x41d8f2 += this[_0x5d0a94(0x27e)]());
      const _0x37694e = this[_0x5d0a94(0x29b)]();
      if (_0x1861b0 > _0x1d36e9['x'] + _0x1d36e9[_0x5d0a94(0x295)]) return;
      this[_0x5d0a94(0x278)](_0xded44e, _0x1861b0, _0x41d8f2, _0x1d36e9['width'], _0x37694e);
    }
  }),
  (VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x213)] = Window_BattleStatus['prototype'][_0x4518ba(0x34f)]),
  (Window_BattleStatus[_0x4518ba(0x39c)]['drawItemStatusXPStyle'] = function (_0x5bc72b) {
    const _0xa7742 = _0x4518ba;
    VisuMZ['BattleSystemBTB'][_0xa7742(0x213)][_0xa7742(0x2e6)](this, _0x5bc72b);
    const _0x17e14c = this[_0xa7742(0x202)](_0x5bc72b);
    if (this[_0xa7742(0x222)](_0x17e14c)) {
      const _0x1e7798 = this[_0xa7742(0x2d6)](_0x5bc72b);
      let _0x974af3 = _0x1e7798['x'],
        _0x436add = _0x1e7798['y'];
      (_0x974af3 += this['getOffsetX_BTB']()), (_0x436add += this['getOffsetY_BTB']());
      const _0x53ff28 = this[_0xa7742(0x29b)]();
      this[_0xa7742(0x278)](_0x17e14c, _0x974af3, _0x436add, _0x1e7798['width'], _0x53ff28);
    }
  }),
  (Window_BattleStatus[_0x4518ba(0x39c)][_0x4518ba(0x2d6)] = function (_0x20032b) {
    const _0x56b4b7 = _0x4518ba,
      _0x7964fd = this[_0x56b4b7(0x33e)](_0x20032b);
    if (_0x7964fd['width'] < ImageManager[_0x56b4b7(0x241)]) return _0x7964fd;
    let _0x48e6ab = Math[_0x56b4b7(0x297)]((_0x7964fd[_0x56b4b7(0x295)] - ImageManager['faceWidth']) / 0x2);
    return (_0x7964fd[_0x56b4b7(0x295)] = ImageManager[_0x56b4b7(0x241)]), (_0x7964fd['x'] += _0x48e6ab), _0x7964fd;
  }),
  (Window_BattleStatus[_0x4518ba(0x39c)][_0x4518ba(0x29b)] = function () {
    const _0x503817 = _0x4518ba,
      _0x15ccaa = VisuMZ[_0x503817(0x3bc)]['Settings'][_0x503817(0x1d5)],
      _0x4abf96 = this['battleLayoutStyle']();
    return _0x15ccaa[_0x503817(0x3a0)[_0x503817(0x27b)](_0x4abf96)] || 0x0;
  }),
  (Window_BattleStatus[_0x4518ba(0x39c)]['getOffsetX_BTB'] = function () {
    const _0x417719 = _0x4518ba,
      _0x2323a7 = VisuMZ[_0x417719(0x3bc)][_0x417719(0x1ef)][_0x417719(0x1d5)],
      _0x1b9a9e = this[_0x417719(0x27f)]();
    return _0x2323a7[_0x417719(0x1d1)['format'](_0x1b9a9e)] || 0x0;
  }),
  (Window_BattleStatus[_0x4518ba(0x39c)][_0x4518ba(0x27e)] = function () {
    const _0x49258c = _0x4518ba,
      _0xf7860e = VisuMZ[_0x49258c(0x3bc)][_0x49258c(0x1ef)][_0x49258c(0x1d5)],
      _0x1a1758 = this[_0x49258c(0x27f)]();
    return _0xf7860e[_0x49258c(0x334)[_0x49258c(0x27b)](_0x1a1758)] || 0x0;
  }),
  (Window_BattleSkill[_0x4518ba(0x39c)][_0x4518ba(0x2b8)] = function () {
    return BattleManager['isBTB']();
  }),
  (Window_BattleSkill[_0x4518ba(0x39c)]['applyBattleItemWindowBTB'] = function () {
    const _0x2ea758 = _0x4518ba,
      _0x33617c = this['item'](),
      _0x5cc6ed = BattleManager[_0x2ea758(0x1ff)]();
    if (_0x5cc6ed) _0x5cc6ed['setSkill'](_0x33617c ? _0x33617c['id'] : null);
    Window_SkillList[_0x2ea758(0x39c)][_0x2ea758(0x20e)][_0x2ea758(0x2e6)](this);
  }),
  (Window_BattleItem['prototype'][_0x4518ba(0x2b8)] = function () {
    const _0x2e1b25 = _0x4518ba;
    return BattleManager[_0x2e1b25(0x34d)]();
  }),
  (Window_BattleItem[_0x4518ba(0x39c)]['applyBattleItemWindowBTB'] = function () {
    const _0x3ddefe = _0x4518ba,
      _0x28a985 = this['item'](),
      _0x281c3c = BattleManager[_0x3ddefe(0x1ff)]();
    if (_0x281c3c) _0x281c3c[_0x3ddefe(0x3fc)](_0x28a985 ? _0x28a985['id'] : null);
    Window_ItemList[_0x3ddefe(0x39c)][_0x3ddefe(0x20e)][_0x3ddefe(0x2e6)](this);
  });
function Window_BTB_TurnOrder() {
  const _0x173d68 = _0x4518ba;
  this[_0x173d68(0x33b)](...arguments);
}
(Window_BTB_TurnOrder[_0x4518ba(0x39c)] = Object[_0x4518ba(0x24a)](Window_Base[_0x4518ba(0x39c)])),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x3f7)] = Window_BTB_TurnOrder),
  (Window_BTB_TurnOrder[_0x4518ba(0x1ef)] = VisuMZ[_0x4518ba(0x3bc)][_0x4518ba(0x1ef)][_0x4518ba(0x248)]),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x33b)] = function () {
    const _0x39d1c7 = _0x4518ba,
      _0x540e4b = this[_0x39d1c7(0x2d1)]();
    this[_0x39d1c7(0x41b)](_0x540e4b), Window_Base[_0x39d1c7(0x39c)][_0x39d1c7(0x33b)][_0x39d1c7(0x2e6)](this, _0x540e4b), this[_0x39d1c7(0x2a1)](), this[_0x39d1c7(0x27d)](), (this['opacity'] = 0x0);
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x2d1)] = function () {
    const _0x52ca24 = _0x4518ba;
    return this[_0x52ca24(0x34a)]($gameParty[_0x52ca24(0x352)](), 0x9, !![]);
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)]['initHomePositions'] = function (_0x111afd) {
    const _0x17977e = _0x4518ba;
    (this[_0x17977e(0x2f1)] = this[_0x17977e(0x424)] = _0x111afd['x']),
      (this[_0x17977e(0x42c)] = this[_0x17977e(0x291)] = _0x111afd['y']),
      (this[_0x17977e(0x2d9)] = _0x111afd['width']),
      (this[_0x17977e(0x3e7)] = _0x111afd[_0x17977e(0x403)]),
      (this[_0x17977e(0x226)] = 0x0);
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)]['createBattlerRect'] = function (_0x5ce615, _0x302531, _0x5fa335) {
    const _0x65b311 = _0x4518ba,
      _0x27e3d4 = Window_BTB_TurnOrder[_0x65b311(0x1ef)],
      _0x3316ea = this[_0x65b311(0x3a7)]() ? _0x27e3d4[_0x65b311(0x38d)] : _0x27e3d4[_0x65b311(0x42a)],
      _0x43003d = Math[_0x65b311(0x29d)](_0x3316ea, _0x5ce615 + _0x302531),
      _0x1db44e = SceneManager[_0x65b311(0x243)][_0x65b311(0x405)][_0x65b311(0x403)],
      _0x15ac7c = SceneManager[_0x65b311(0x243)]['_helpWindow'][_0x65b311(0x403)],
      _0xae87f0 = _0x27e3d4['SubjectDistance'],
      _0x5425dd = Graphics[_0x65b311(0x403)] - _0x1db44e - _0x15ac7c;
    let _0x46a054 = 0x0,
      _0x581ad2 = 0x0,
      _0x25afa8 = 0x0,
      _0x4844ca = 0x0;
    switch (_0x27e3d4['DisplayPosition']) {
      case _0x65b311(0x340):
        (_0x46a054 = _0x27e3d4[_0x65b311(0x262)] * _0x43003d + _0xae87f0),
          (_0x581ad2 = _0x27e3d4[_0x65b311(0x31d)]),
          (_0x25afa8 = Math['ceil']((Graphics[_0x65b311(0x295)] - _0x46a054) / 0x2)),
          (_0x4844ca = _0x27e3d4[_0x65b311(0x21c)]);
        break;
      case 'bottom':
        (_0x46a054 = _0x27e3d4[_0x65b311(0x262)] * _0x43003d + _0xae87f0),
          (_0x581ad2 = _0x27e3d4['SpriteLength']),
          (_0x25afa8 = Math[_0x65b311(0x283)]((Graphics[_0x65b311(0x295)] - _0x46a054) / 0x2)),
          (_0x4844ca = Graphics[_0x65b311(0x403)] - _0x1db44e - _0x581ad2 - _0x27e3d4[_0x65b311(0x21c)]);
        break;
      case _0x65b311(0x23e):
        (_0x46a054 = _0x27e3d4[_0x65b311(0x31d)]),
          (_0x581ad2 = _0x27e3d4[_0x65b311(0x262)] * _0x43003d + _0xae87f0),
          (_0x25afa8 = _0x27e3d4[_0x65b311(0x21c)]),
          (_0x4844ca = Math[_0x65b311(0x283)]((_0x5425dd - _0x581ad2) / 0x2)),
          (_0x4844ca += _0x15ac7c);
        break;
      case 'right':
        (_0x46a054 = _0x27e3d4[_0x65b311(0x31d)]),
          (_0x581ad2 = _0x27e3d4[_0x65b311(0x262)] * _0x43003d + _0xae87f0),
          (_0x25afa8 = Graphics[_0x65b311(0x295)] - _0x46a054 - _0x27e3d4[_0x65b311(0x21c)]),
          (_0x4844ca = Math[_0x65b311(0x283)]((_0x5425dd - _0x581ad2) / 0x2)),
          (_0x4844ca += _0x15ac7c);
        break;
    }
    if (!_0x5fa335) {
      const _0x19962d = Window_BTB_TurnOrder['Settings']['OrderDirection'];
      let _0x4f5e91 = Math[_0x65b311(0x29d)](_0x3316ea, Math[_0x65b311(0x29d)]($gameParty['maxBattleMembers']() + 0x8) - _0x43003d);
      switch (_0x27e3d4[_0x65b311(0x21f)]) {
        case _0x65b311(0x340):
        case _0x65b311(0x269):
          _0x19962d && (_0x25afa8 -= _0x4f5e91 * _0x27e3d4[_0x65b311(0x262)]);
          break;
      }
    }
    return (_0x25afa8 += _0x27e3d4['DisplayOffsetX']), (_0x4844ca += _0x27e3d4['DisplayOffsetY']), new Rectangle(_0x25afa8, _0x4844ca, _0x46a054, _0x581ad2);
  }),
  (Window_BTB_TurnOrder['prototype']['updatePadding'] = function () {
    this['padding'] = 0x0;
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)]['isHorz'] = function () {
    const _0x48fe70 = _0x4518ba,
      _0x35212b = Window_BTB_TurnOrder[_0x48fe70(0x1ef)],
      _0xa6d65c = [_0x48fe70(0x340), _0x48fe70(0x269)][_0x48fe70(0x3cf)](_0x35212b['DisplayPosition']);
    return _0xa6d65c;
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)]['createBattlerSprites'] = function () {
    const _0x110bcc = _0x4518ba;
    (this[_0x110bcc(0x395)] = new Sprite()), this[_0x110bcc(0x245)](this[_0x110bcc(0x395)]), (this[_0x110bcc(0x3b8)] = []);
    for (let _0xc525e6 = 0x0; _0xc525e6 < $gameParty['maxBattleMembers'](); _0xc525e6++) {
      const _0x1fd70b = new Sprite_BTB_TurnOrder_Battler($gameParty, _0xc525e6);
      this[_0x110bcc(0x395)][_0x110bcc(0x35c)](_0x1fd70b), this[_0x110bcc(0x3b8)][_0x110bcc(0x3f5)](_0x1fd70b);
    }
    for (let _0x10bbec = 0x0; _0x10bbec < $gameTroop['members']()[_0x110bcc(0x329)]; _0x10bbec++) {
      const _0xe70504 = new Sprite_BTB_TurnOrder_Battler($gameTroop, _0x10bbec);
      this[_0x110bcc(0x395)][_0x110bcc(0x35c)](_0xe70504), this[_0x110bcc(0x3b8)][_0x110bcc(0x3f5)](_0xe70504);
    }
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x42f)] = function () {
    const _0x45f35f = _0x4518ba;
    Window_Base[_0x45f35f(0x39c)][_0x45f35f(0x42f)][_0x45f35f(0x2e6)](this),
      this['updateHomePosition'](),
      this[_0x45f35f(0x25a)](),
      this[_0x45f35f(0x209)](),
      this[_0x45f35f(0x3b4)](),
      this[_0x45f35f(0x27d)]();
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x371)] = function () {
    const _0x3af895 = _0x4518ba;
    if (this[_0x3af895(0x226)] > 0x0) {
      const _0x359fcc = this[_0x3af895(0x226)];
      (this[_0x3af895(0x424)] = (this[_0x3af895(0x424)] * (_0x359fcc - 0x1) + this[_0x3af895(0x2f1)]) / _0x359fcc),
        (this[_0x3af895(0x291)] = (this[_0x3af895(0x291)] * (_0x359fcc - 0x1) + this[_0x3af895(0x42c)]) / _0x359fcc),
        this[_0x3af895(0x226)]--,
        this[_0x3af895(0x226)] <= 0x0 && ((this[_0x3af895(0x424)] = this[_0x3af895(0x2f1)]), (this[_0x3af895(0x291)] = this[_0x3af895(0x42c)]));
    }
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x25a)] = function () {
    const _0x3b0009 = _0x4518ba,
      _0x18035b = Window_BTB_TurnOrder['Settings'];
    if (_0x18035b['DisplayPosition'] !== _0x3b0009(0x340)) return;
    if (!_0x18035b['RepositionTopForHelp']) return;
    const _0x1ded86 = SceneManager[_0x3b0009(0x243)][_0x3b0009(0x3da)];
    if (!_0x1ded86) return;
    _0x1ded86[_0x3b0009(0x218)]
      ? ((this['x'] = this[_0x3b0009(0x424)] + (_0x18035b[_0x3b0009(0x215)] || 0x0)), (this['y'] = this[_0x3b0009(0x291)] + (_0x18035b[_0x3b0009(0x417)] || 0x0)))
      : ((this['x'] = this['_homeX']), (this['y'] = this['_homeY']));
    const _0x2ccba8 = SceneManager[_0x3b0009(0x243)][_0x3b0009(0x3c4)];
    this[_0x3b0009(0x1fc)] === undefined &&
      ((this[_0x3b0009(0x1fc)] = Math['round']((Graphics[_0x3b0009(0x295)] - Math[_0x3b0009(0x29d)](Graphics[_0x3b0009(0x3ff)], _0x2ccba8[_0x3b0009(0x295)])) / 0x2)),
      (this['_ogWindowLayerY'] = Math[_0x3b0009(0x297)]((Graphics[_0x3b0009(0x403)] - Math[_0x3b0009(0x29d)](Graphics[_0x3b0009(0x2dc)], _0x2ccba8[_0x3b0009(0x403)])) / 0x2))),
      (this['x'] += _0x2ccba8['x'] - this['_ogWindowLayerX']),
      (this['y'] += _0x2ccba8['y'] - this[_0x3b0009(0x284)]);
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)]['updateSidePosition'] = function () {
    const _0x70da88 = _0x4518ba,
      _0x3365f5 = Window_BTB_TurnOrder[_0x70da88(0x1ef)];
    if ([_0x70da88(0x340)][_0x70da88(0x3cf)](_0x3365f5[_0x70da88(0x21f)])) return;
    (this['x'] = this[_0x70da88(0x424)]), (this['y'] = this[_0x70da88(0x291)]);
    const _0x3eb1e3 = SceneManager[_0x70da88(0x243)][_0x70da88(0x3c4)];
    (this['x'] += _0x3eb1e3['x']), (this['y'] += _0x3eb1e3['y']);
  }),
  (Window_BTB_TurnOrder['prototype'][_0x4518ba(0x3b4)] = function () {
    const _0x342e52 = _0x4518ba;
    if (!this[_0x342e52(0x395)]) return;
    const _0x4e5073 = this[_0x342e52(0x395)][_0x342e52(0x3e8)];
    if (!_0x4e5073) return;
    _0x4e5073['sort'](this['compareBattlerSprites']['bind'](this));
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x39e)] = function (_0x1f7b66, _0x53c63f) {
    const _0x21e935 = _0x4518ba,
      _0x2275d4 = this['isHorz'](),
      _0x3334de = Window_BTB_TurnOrder[_0x21e935(0x1ef)][_0x21e935(0x1fd)];
    if (_0x2275d4 && !_0x3334de) return _0x1f7b66['x'] - _0x53c63f['x'];
    else {
      if (_0x2275d4 && _0x3334de) return _0x53c63f['x'] - _0x1f7b66['x'];
      else {
        if (!_0x2275d4 && _0x3334de) return _0x1f7b66['y'] - _0x53c63f['y'];
        else {
          if (!_0x2275d4 && !_0x3334de) return _0x53c63f['y'] - _0x1f7b66['y'];
        }
      }
    }
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x27d)] = function () {
    const _0x53d91e = _0x4518ba;
    this[_0x53d91e(0x218)] = $gameSystem[_0x53d91e(0x220)]();
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x22c)] = function (_0x1cfce2) {
    const _0x2a45df = _0x4518ba;
    this[_0x2a45df(0x3b8)][_0x2a45df(0x3c7)]((_0x72d967, _0x2a178b) => {
      const _0x3f9f7a = _0x2a45df;
      return _0x72d967[_0x3f9f7a(0x224)]() - _0x2a178b[_0x3f9f7a(0x224)]();
    }),
      this[_0x2a45df(0x388)]();
    if (!_0x1cfce2) return;
    for (const _0x257b74 of this[_0x2a45df(0x3b8)]) {
      if (!_0x257b74) continue;
      _0x257b74['update'](), (_0x257b74[_0x2a45df(0x3b1)] = 0x0);
    }
  }),
  (Window_BTB_TurnOrder[_0x4518ba(0x39c)][_0x4518ba(0x388)] = function () {
    const _0x1499ab = _0x4518ba;
    if (!this['isHorz']()) return;
    const _0xf0abc6 = VisuMZ[_0x1499ab(0x3bc)][_0x1499ab(0x1ef)][_0x1499ab(0x248)];
    if (!_0xf0abc6[_0x1499ab(0x2af)]) return;
    const _0x5b1f6b = $gameParty[_0x1499ab(0x28b)]()['filter'](_0x3627ba => _0x3627ba && _0x3627ba['isAlive']() && _0x3627ba['isAppeared']())['length'],
      _0x13cd49 = $gameTroop['members']()[_0x1499ab(0x286)](_0x2b0275 => _0x2b0275 && _0x2b0275[_0x1499ab(0x353)]() && _0x2b0275[_0x1499ab(0x406)]())['length'],
      _0x4f46eb = this['createBattlerRect'](_0x5b1f6b, _0x13cd49);
    (this[_0x1499ab(0x2f1)] = _0x4f46eb['x']),
      (this[_0x1499ab(0x42c)] = _0x4f46eb['y']),
      (this[_0x1499ab(0x2f1)] !== this[_0x1499ab(0x424)] || this[_0x1499ab(0x42c)] !== this['_homeY']) && (this[_0x1499ab(0x226)] = _0xf0abc6[_0x1499ab(0x407)]);
  });
function _0x2c48(_0x216fff, _0x3f6f59) {
  const _0x59d378 = _0x59d3();
  return (
    (_0x2c48 = function (_0x2c4845, _0x26a461) {
      _0x2c4845 = _0x2c4845 - 0x1d1;
      let _0x2bde9d = _0x59d378[_0x2c4845];
      return _0x2bde9d;
    }),
    _0x2c48(_0x216fff, _0x3f6f59)
  );
}
function _0x59d3() {
  const _0x322f72 = [
    'ActionSlot',
    '_btbTurnOrderGraphicType',
    '_containerHeight',
    'ShowCostForGuard',
    '_graphicSprite',
    '_scrollY',
    'mainSprite',
    'setSkill',
    'SpriteLength',
    'drawItemStatusListStyle',
    'makeMultiActionsBTB',
    '\x5cI[%1]',
    '_graphicFaceIndex',
    'removeActionFusionIngredients',
    'BTB_Help',
    'makeSpeed',
    'contents',
    'exit',
    'ParseAllNotetags',
    'setBlendColor',
    'length',
    'setAttack',
    'btbMatchesCurrentFusionAction',
    'FUNC',
    '_isAppeared',
    'Game_Action_applyItemUserEffect',
    'Window_ActorCommand_makeCommandList',
    '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.',
    'BTB',
    'addChildAt',
    'opacity',
    '%1_offsetY',
    'BtbTurnOrderClearActorGraphic',
    'isUsePageUpDnShortcutBTB',
    'BtbTurnOrderActorFace',
    'btbParseFusionData',
    'skillCostSeparator',
    'processActionFusionsBTB',
    'initialize',
    '_armors',
    'icon',
    'itemRect',
    'refresh',
    'top',
    'startTurn',
    'modifyBTBActionCounterSprite_Fallback',
    'Game_Actor_makeActions',
    'createBorderSprite',
    'enemy',
    'createLetterSprite',
    'BTB_MAX_ACTIONS_HARD_CAP',
    'TurnOrderBTBGraphicFaceName',
    'MinBravePoints',
    'createBattlerRect',
    'createInitialPositions',
    'BorderThickness',
    'isBTB',
    'subject',
    'drawItemStatusXPStyle',
    'process_VisuMZ_BattleSystemBTB_Notetags',
    'getItemIdWithName',
    'maxBattleMembers',
    'isAlive',
    'removeChild',
    'Game_Battler_performCollapse',
    'cursorPagedown',
    'removeActionBattlersBTB',
    'BattleManager_makeActionOrders',
    'currentAction',
    'status',
    'indexOf',
    'addChild',
    'commandCancelBTB',
    'NeutralColor',
    'BravePointStartFavor',
    '_btbItemStrictFusion',
    'isForFriend',
    'guard',
    'getColor',
    '288712JTcCQT',
    'Game_Unit_makeActions',
    'State-%1-%2',
    'btbCostFormat',
    'createActorCommandWindowBTB',
    '_btbSkillFlexFusion',
    'changeFaceGraphicBitmap',
    '%1SystemBg',
    'NUM',
    'calculateTargetPositions',
    'battler',
    'isEnemy',
    'TurnOrderBTBGraphicType',
    'updateHomePosition',
    'clearRect',
    'Game_BattlerBase_hide',
    'FaceName',
    'changeIconGraphicBitmap',
    'clamp',
    'onTurnEndBTB',
    'attack',
    'floor',
    'item',
    'description',
    'destroy',
    '%1-%2',
    'EnemyBattlerDrawLetter',
    'applyItemUserEffect',
    'makeCommandList',
    'onDatabaseLoaded',
    'Enemy',
    'payBravePointsCost',
    'BravePointsRegenAlive',
    'BattleManager_startTurn',
    'SystemTurnOrderVisibility',
    'ShowFacesListStyle',
    'recalculateHome',
    'getFlexActionFusionCombinationsBTB',
    '%1_display',
    'note',
    'remove',
    'MaxHorzSprites',
    '_positionTargetX',
    '_actionFusionRecipe',
    'processUpdateGraphic',
    'addBraveCommand',
    'requestFauxAnimation',
    'svBattlerName',
    'speed',
    '_turnOrderInnerSprite',
    'ShowCommand',
    '%1Mute',
    'registerCommand',
    'maxBravePoints',
    'right',
    'bitmapWidth',
    'prototype',
    'updateSelectionEffect',
    'compareBattlerSprites',
    'iconWidth',
    '%1_align',
    '_itemIDs',
    'bravePointsCost',
    'VisuMZ_1_SkillsStatesCore',
    'btbBravePointsFull',
    'BtbTurnOrderClearEnemyGraphic',
    'ARRAYNUM',
    'isHorz',
    '_braveStartupAnimation',
    'BravePointBattleStart',
    'addCommand',
    'Window_BattleStatus_drawItemStatusListStyle',
    '_subject',
    'maxBraveActions',
    'resetFontSettings',
    'VisuMZ_1_ItemsEquipsCore',
    'BattleManager_startAction',
    '_positionDuration',
    'Show_0_BP_Cost',
    '_fadeDuration',
    'updateBattleContainerOrder',
    'Armor-%1-%2',
    '_guardUnleash',
    'createChildren',
    '_turnOrderContainer',
    'isSkill',
    '_phase',
    'isInputting',
    'BattleSystemBTB',
    'getChildIndex',
    'btbBravePointsIcon',
    'Actor-%1-%2',
    'optDisplayTp',
    'startFade',
    'MinBravePointsHardCap',
    'createTurnOrderBTBGraphicFaceName',
    '_windowLayer',
    'blt',
    'formFlexCombo',
    'sort',
    'BravePointStartNeutral',
    'HideBravePointCost',
    '29855csApJh',
    'getOffsetX_BTB',
    '3832BHORno',
    'Scene_Battle_onDisabledPartyCommandSelection',
    'EnemyBattlerType',
    'includes',
    'clearActions',
    'drawItemNumber',
    'commandStyle',
    'Scene_Boot_onDatabaseLoaded',
    'createTurnOrderBTBGraphicType',
    'svactor',
    'Window_Base_makeAdditionalSkillCostText',
    '_surprise',
    'selectNextCommand',
    'TurnOrderBTBGraphicIconIndex',
    '_helpWindow',
    'repeat',
    'Mechanics',
    'addLoadListener',
    '54sYjhcy',
    '_btbTurnOrderFaceIndex',
    'guardSkillId',
    'predictedBravePoints',
    'svActorHorzCells',
    'max',
    'pop',
    'IconIndex',
    'btbRegisterFusions',
    '_fullHeight',
    'children',
    'DrawActionCountersJS',
    'MaxBravePointsDefault',
    'ItemsEquipsCore',
    'trim',
    'btbBraveCommand',
    'waitForAnimation',
    'allBattleMembers',
    'VisuMZ_1_BattleCore',
    'currentExt',
    'Game_BattlerBase_canUse',
    'Window_Selectable_cursorPageup',
    'mainFontFace',
    'push',
    'brave',
    'constructor',
    '_btbTurnOrderFaceName',
    'BraveShortcuts',
    'btbActionCurrent',
    'ShowMarkerBg',
    'setItem',
    'calcRegenBravePoints',
    'createAllWindows',
    'boxWidth',
    'slice',
    'isActiveTpb',
    'General',
    'height',
    'Game_Action_setItem',
    '_statusWindow',
    'isAppeared',
    'UpdateFrames',
    '\x5cC[%1]%2\x5cC[0]',
    'changeEnemyGraphicBitmap',
    'fontSize',
    'BTB_MAX_BRAVEPOINTS_HARD_CAP',
    'canGuard',
    'getActionFusionRecipeSkills',
    'drawText',
    '_isAlive',
    'Game_Action_allowRandomSpeed',
    'join',
    '_graphicFaceName',
    'performBrave',
    'btbBravePointsAbbr',
    'Scene_Battle_createActorCommandWindow',
    'Window_Selectable_select',
    'RepositionTopHelpY',
    'startAction',
    '_btbTurnOrderVisible',
    'currentSymbol',
    'initHomePositions',
    'inBattle',
    'process_VisuMZ_BattleSystemBTB',
    'bitmapHeight',
    '_fadeTarget',
    'ShowMarkerBorder',
    'ParseSkillNotetags',
    '215557QJPaXp',
    'Game_Battler_makeActionTimes',
    '_homeX',
    'MinBravePointsDefault',
    '4059CzobfQ',
    'faceIndex',
    '_actionInputIndex',
    'splice',
    'MaxVertSprites',
    'setBattleSystemBTBTurnOrderVisible',
    '_targetHomeY',
    '11ruINLa',
    '24Bxlapc',
    'update',
    'startActionBTB',
    '_positionTargetY',
    'BravePointCost',
    'BravePointRegenBase',
    'ItemQuantityFontSize',
    'EnableFusion',
    'return\x200',
    'anchor',
    '%1_offsetX',
    '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.',
    '_actions',
    'ActorBattlerType',
    'Window',
    'select',
    'Parse_Notetags_BravePointsUserJS',
    'reduceBrave',
    'useItemBTB',
    'updateGraphic',
    'getTotalActionFusionRecipes',
    'applyBattleSystemBTBUserEffect',
    'applyItemBattleSystemBTBUserEffect',
    'STRUCT',
    'Game_Battler_useItem',
    'BravePointRegen',
    'MaxActionsHardCap',
    'clearTurnOrderBTBGraphics',
    '_graphicType',
    'updateLetter',
    'CostPosition',
    '_actorCommandWindow',
    'defaultPosition',
    'CannotFusion',
    '_graphicHue',
    'BattleManager_isTurnBased',
    'Window_Base_close',
    'substring',
    '_graphicSv',
    'onDisabledPartyCommandSelection',
    'Settings',
    'destroyBTBActionCounters',
    'FusionStrict',
    '%1BgColor2',
    'TurnOrderBTBGraphicFaceIndex',
    'makeActions',
    'Window_ActorCommand_setup',
    'battleSys',
    'removeActor',
    'fontFace',
    'createTestBitmap',
    'BravePointPredictedCost',
    'Game_Battler_onTurnEnd',
    '_ogWindowLayerX',
    'OrderDirection',
    'isSceneBattle',
    'inputtingAction',
    'attackSkillId',
    'Game_BattlerBase_appear',
    'actor',
    'JsBravePointsTarget',
    'isActor',
    'Show_1_BP_Cost',
    'center',
    'checkActionsBTB',
    '%1SystemBorder',
    'updateSidePosition',
    'loseBravePoints',
    'getStateTooltipBattler',
    'FaceIndex',
    'traitObjects',
    'applyBattleItemWindowBTB',
    'minBravePoints',
    'battlerHue',
    'commandBrave',
    'onTurnEnd',
    'Window_BattleStatus_drawItemStatusXPStyle',
    '_btbTurnOrderIconIndex',
    'RepositionTopHelpX',
    'ConvertParams',
    '_position',
    'visible',
    'createActorCommandWindow',
    'NegativeColor',
    'Enemy-%1-%2',
    'ScreenBuffer',
    '%1BorderColor',
    'makeActionOrders',
    'DisplayPosition',
    'isBattleSystemBTBTurnOrderVisible',
    'bitmap',
    'showBravePoints',
    'appear',
    'containerPosition',
    'initBattleSystemBTB',
    '_homeDuration',
    'EnemyMultiAction',
    'BattleManager_isTpb',
    'AllowRandomSpeed',
    'BattleCore',
    'Window_Base_drawItemNumber',
    'updateTurnOrder',
    'version',
    'WaitFrames',
    'hideBraveTrait',
    'Cancel',
    'parameters',
    'gainBravePoints',
    'Scene_Battle_createAllWindows',
    'canProcessActionFusionsBTB',
    'sortActionOrdersBTB',
    'MaxActions',
    'hasSvBattler',
    'EnemyBattlerIcon',
    'BravePointAlterTarget',
    'close',
    '_btbTurnOrderWindow',
    'padding',
    '_graphicEnemy',
    'left',
    'loadSvActor',
    '_actionBattlers',
    'faceWidth',
    'queueBraveAnimationsBTB',
    '_scene',
    'loadFace',
    'addInnerChild',
    'loadSvEnemy',
    'EnemyBattlerFaceName',
    'TurnOrder',
    'makeAdditionalCostTextBTB',
    'create',
    'Window_Selectable_cursorPagedown',
    'RepositionLogWindow',
    'showBraveAnimationBTB',
    'BTB_MAX_BRAVEPOINTS_DEFAULT',
    'numItems',
    'BTB_MIN_BRAVEPOINTS_DEFAULT',
    'clear',
    'ARRAYSTR',
    'BtbTurnOrderActorIcon',
    'BTB_MIN_BRAVEPOINTS_HARD_CAP',
    'BTB_MAX_ACTIONS_DEFAULT',
    'Window_BattleLog_startAction',
    '_scrollX',
    'battlerName',
    'refreshStatusBTB',
    'updatePosition',
    'EnemyBattlerFaceIndex',
    'cannotFusionNotetagBTB',
    '_bypassAiValidCheck',
    'map',
    '%1Mirror',
    'createBTBTurnOrderWindow',
    'setActionFusionBTB',
    'SpriteThin',
    'getBattleSystem',
    'cancel',
    'commandCancel',
    'VisuMZ_0_CoreEngine',
    'MaxActionsDefault',
    'updateTurnOrderBTB',
    'bottom',
    'ShowEnemyBrave',
    'btbPayItemFusionCosts',
    'setBravePoints',
    'parse',
    'BtbTurnOrderEnemyIcon',
    'onBattleStartBTB',
    'JSON',
    '_weapons',
    'BattleManager_startInput',
    'Weapon-%1-%2',
    '_plural',
    'BtbTurnOrderEnemyFace',
    'regenerateBravePoints',
    '_unit',
    'drawActorBravePoints',
    'toUpperCase',
    'concat',
    'format',
    'createTurnOrderBTBGraphicIconIndex',
    'updateVisibility',
    'getOffsetY_BTB',
    'battleLayoutStyle',
    'bind',
    'textWidth',
    'active',
    'ceil',
    '_ogWindowLayerY',
    'initMembers',
    'filter',
    'Actor',
    'iconHeight',
    '_blendColor',
    'itemLineRect',
    'members',
    'Game_Action_isValid',
    'updateOpacity',
    '_btbActionSprite',
    'drawTextEx',
    'drawItemNumberBTB',
    '_homeY',
    'svActorVertCells',
    'allowRandomSpeed',
    'cursorPageup',
    'width',
    '_backgroundSprite',
    'round',
    'formAllPossibleFlexCombos',
    'ItemScene',
    'isValid',
    'getAlignmentBTB',
    '_letter',
    'min',
    'canInput',
    'repositionLogWindowBTB',
    '14160570DdUKAT',
    'createBattlerSprites',
    'Game_Party_removeActor',
    'match',
    'cannotBraveTrait',
    '_graphicIconIndex',
    'BravePointAlterUser',
    'BraveAnimationID',
    'createKeyJS',
    '_actor',
    'Enemies',
    'Skill-%1-%2',
    'textSizeEx',
    'lineHeight',
    'STR',
    'CenterHorz',
    '_logWindow',
    'loadSystem',
    'Game_BattlerBase_canInput',
    'btbActionSlot',
    '_targetIndex',
    'BraveAnimation',
    '_tempBattler',
    'MaxBravePoints',
    'isBattleItemWindowBTB',
    'btbPaySkillFusionCosts',
    'ParseItemNotetags',
    'ItemQuantityFmt',
    'fillRect',
    '_btbItemFlexFusion',
    'performCollapse',
    'updateGraphicHue',
    'ARRAYEVAL',
    'BattleManager_isActiveTpb',
    'canUse',
    'EnemyActionFusions',
    'cancelBrave',
    'face',
    'BattleManager_battleSys',
    '_index',
    '\x5cI[%1]%2',
    'isItem',
    'singleSkill',
    'ActionCurrent',
    '#000000',
    'makeDeepCopy',
    'containerWindow',
    'ShowCostForAttack',
    'braveAnimationTimes',
    'windowRect',
    'predictedBravePointCost',
    'text',
    'Game_Action_speed',
    'setHue',
    'itemRectPortraitBTB',
    'PositiveColor',
    '_bravePoints',
    '_fullWidth',
    'isSideView',
    'faceHeight',
    'boxHeight',
    'Game_Enemy_makeActions',
    'makeAdditionalSkillCostText',
    'FusionFlex',
    'Visible',
    'numActions',
    'needsSelection',
    'JsBravePointsUser',
    'startInput',
    'Game_System_initialize',
    'call',
    'canActionFusionWithBTB',
    'checkPosition',
    'Game_Battler_onBattleStart',
    '_targetBattlerKey',
    'Window_ActorCommand_addGuardCommand',
    'bravePoints',
    'name',
    'faceName',
    'MaxBravePointsHardCap',
    'EnemyBattlerFontSize',
    '_targetHomeX',
    'makeActionTimes',
    'setup',
    'setText',
    'changeSvActorGraphicBitmap',
    'Item-%1-%2',
    'Actors',
    'index',
    'BravePointsFull',
    '586130TuZjQx',
    'RegExp',
    'split',
    'createGraphicSprite',
    '_items',
    'some',
    'CalcActionSpeedJS',
    'canBrave',
    '_letterSprite',
    'getActionFusionRecipeItems',
    'isSkipPartyCommandWindow',
    'createTurnOrderBTBGraphicFaceIndex',
    'getStrictActionFusionCombinationsBTB',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
    'onBattleStart',
    'ARRAYJSON',
    'useItem',
    'createBackgroundSprite',
    'ARRAYSTRUCT',
    'createBTBActionCounters',
    'Window_Help_setItem',
    'canPayActionFusionCombination',
    'Game_BattlerBase_canGuard',
    'checkOpacity',
    '40290PUaOqh',
    'test',
    '_skillIDs',
  ];
  _0x59d3 = function () {
    return _0x322f72;
  };
  return _0x59d3();
}
