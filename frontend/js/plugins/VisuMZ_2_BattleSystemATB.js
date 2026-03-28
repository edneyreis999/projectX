//=============================================================================
// VisuStella MZ - Battle System - ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.37;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.37] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 *
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 *
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 *
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 *
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 *
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 *
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 *
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 *
 * Skill & Item Speeds
 *
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 *
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 *
 * ---
 *
 * JS Calculation Mechanics
 *
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 *
 * VisuMZ_1_OptionsCore
 *
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 *
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 *
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 *
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 *
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 *
 * ---
 *
 * === ATB Field Gauge-Related Notetags ===
 *
 * These notetags only work if the ATB Field Gauge is enabled.
 *
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 *
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 *
 * ---
 *
 * === ATB Gauge Manipulation-Related Notetags ===
 *
 * These notetags are used for ATB Gauge manipulation purposes.
 *
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 *
 * ---
 *
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 *
 * ---
 *
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 *
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 *
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 *
 * ---
 *
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 *
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 *
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 *
 * ---
 *
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 *
 * ---
 *
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 *
 * ---
 *
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 *
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 *
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 *     - Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 *
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 *
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 *
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 *
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 *
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 *
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 *
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 *
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 *
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 *
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 *
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 *
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 *
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 *
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 *
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 *
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 *
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 *
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 *
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 *
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 *
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 *
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 *
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 *
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 *
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 *
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 *
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 *
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 *
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 *
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 *
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 *
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 *
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 *
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 *
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 *
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 *
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 *
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 *
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 * Marker Sprites
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
 * Marker Letter
 *
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 *
 *   Show Background?:
 *   - Show the background on the marker sprite?
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
 * Marker Arrow
 *
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 *
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 *
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 *
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
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
 * Version 1.37: February 16, 2026
 * * Bug Fixes!
 * ** Fixed a bug where potential actions queued during Active ATB might get
 *    erased if used during the action of a enemy battler. Fix made by Olivia.
 *
 * Version 1.36: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 *
 * Version 1.35: October 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if an actor dies in battle and is revived post-battle
 *    using "Recover All", that actor no longer gets stuck after their first
 *    action in following battles. Fix made by Olivia.
 *
 * Version 1.34: March 20, 2025
 * * Bug Fixes!
 * ** Field ATB Gauge no longer stays visible during victory sequence. Fix
 *    made by Olivia.
 *
 * Version 1.33: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an actor softlock issue where if charm, berserk, and confusion can
 *    lock a 100% charged actor for Active ATB.
 * * Documentation Update!
 * ** Added extra clarification for Plugin Parameter "Stuns Reset Gauge?":
 * *** Charm, Berserk, and Confusion states will still reset the ATB Gauge.
 *
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a few features that bled over into CTB if the game project used
 *    both ATB and CTB battle systems simultaneously. Fix made by Olivia.
 * * Feature Update!
 * ** "Stuns Reset Gauge" set to "Don't Reset" should now work as expected for
 *    both actors and enemies, instead of just actors, while they are in the
 *    casting state. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.31: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where sideview battlers would have misplaced ATB gauge
 *    positions. Fix made by Olivia.
 *
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 *
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 *
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 *
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 *
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 *
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 *
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 *
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 *
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 *
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 *
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 *
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 *
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 *
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 *
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 *
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 *
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 *
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 *
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 *
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 *
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 *
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 *
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 *
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 *
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"true","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default true
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 *
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 *
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 *
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 *
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 *
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 *
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
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
 * @default 10
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
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x15172f = _0x4961;
(function (_0x3f4da7, _0x208869) {
  const _0x4df2f0 = _0x4961,
    _0x4fae71 = _0x3f4da7();
  while (!![]) {
    try {
      const _0x3ea3da =
        (-parseInt(_0x4df2f0(0x204)) / 0x1) * (-parseInt(_0x4df2f0(0x174)) / 0x2) +
        (parseInt(_0x4df2f0(0xeb)) / 0x3) * (-parseInt(_0x4df2f0(0x1d8)) / 0x4) +
        parseInt(_0x4df2f0(0x19c)) / 0x5 +
        (parseInt(_0x4df2f0(0x125)) / 0x6) * (-parseInt(_0x4df2f0(0x1fd)) / 0x7) +
        parseInt(_0x4df2f0(0x96)) / 0x8 +
        (-parseInt(_0x4df2f0(0x206)) / 0x9) * (parseInt(_0x4df2f0(0xe1)) / 0xa) +
        parseInt(_0x4df2f0(0x1ff)) / 0xb;
      if (_0x3ea3da === _0x208869) break;
      else _0x4fae71['push'](_0x4fae71['shift']());
    } catch (_0x39ebc5) {
      _0x4fae71['push'](_0x4fae71['shift']());
    }
  }
})(_0x9ea2, 0xb4ebb);
var label = 'BattleSystemATB',
  tier = tier || 0x0,
  dependencies = [_0x15172f(0x1f3)],
  pluginData = $plugins[_0x15172f(0x17a)](function (_0x308d0b) {
    const _0x5c208c = _0x15172f;
    return _0x308d0b['status'] && _0x308d0b[_0x5c208c(0x1f8)][_0x5c208c(0x1b5)]('[' + label + ']');
  })[0x0];
function _0x9ea2() {
  const _0x475b97 = [
    'default%1',
    'targetPositionOnGauge',
    '_unit',
    'battlerHue',
    '_tpbTurnEnd',
    'Sprite_Battler_update',
    'drawText',
    'subject',
    '_gaugeSprite',
    'AggroControlSystem',
    'createBattlerSprites',
    'currentAction',
    'members',
    'createFieldGaugeSkin',
    '_originalSpeed',
    'skills',
    'updateAtbGaugeSpriteVisibility',
    'InterruptFlashColor',
    'isAtbChargingState',
    'InterruptText',
    'isAttack',
    'ParseSkillNotetags',
    'svBattlerData',
    'clearFieldAtbGraphics',
    'svActorHorzCells',
    'GaugeSplit',
    'appear',
    'Actor-%1-%2',
    'changeEnemyGraphicBitmap',
    'allBattleMembers',
    'isShowAtbGauge',
    'createStateSprite',
    'Options',
    '3260FhJQVw',
    'icon',
    'ParseAllNotetags',
    'MarkerOffset',
    '%1SystemBorder',
    'Game_Battler_updateTpbChargeTime',
    'FieldGaugeActorIcon',
    '<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',
    'updateBattleContainerOrder',
    'charging',
    'anchor',
    '_graphicHue',
    'RepositionTopHelpY',
    'exit',
    'Parse_Notetags_CreateJS',
    'name',
    'getAtbCastTimeRate',
    'bind',
    'actor',
    'InterruptAnimationID',
    'maxBattleMembers',
    'min',
    'speed',
    '%1SystemBg',
    'clearActions',
    'FastRate',
    'updateOpacity',
    'VisuMZ_1_BattleCore',
    'isTpb',
    'clamp',
    'ctGaugeColor1',
    'width',
    'description',
    'process_VisuMZ_BattleSystemATB_CreateRegExp',
    'right',
    'slow%1',
    'ConfigManager_applyData',
    '8596uDGUgW',
    'EnemyBattlerDrawLetter',
    '21280611qziGHC',
    'Game_Battler_onRestrict',
    'processBattleCoreJS',
    'Name',
    'createGaugeSprite',
    '51VYjZUz',
    'State-%1-%2',
    '72ATguXr',
    'addBattleSystemATBShowGaugeCommand',
    'addChildAt',
    'atbSpeed',
    'parameters',
    '_horz',
    '_plural',
    'DisplayOffsetX',
    'revive',
    'enemy',
    'getStateTooltipBattler',
    'Sprite_Gauge_currentValue',
    'isHidden',
    'ShowMarkerBorder',
    'Gauge',
    'Game_Battler_tpbRequiredCastTime',
    'update',
    'Item-%1-%2',
    'height',
    'OpacityRate',
    'setupAtbGaugeSprite',
    'top',
    'loadSvEnemy',
    '_battler',
    'battleUIOffsetX',
    'ARRAYJSON',
    'FieldGaugeEnemyIcon',
    'boxWidth',
    'FieldGauge',
    'createBattlerSprite',
    'isATB',
    'fieldAtbGraphicFaceName',
    'Game_Battler_tpbAcceleration',
    'item',
    'create',
    'ShowMarkerBg',
    'cast%1',
    'updateLetter',
    'Cast',
    'NUM',
    'hasSvBattler',
    'isSceneBattle',
    'setAtbAfterSpeed',
    'VisuMZ_2_BattleSystemCTB',
    'reduce',
    'tpbRelativeSpeed',
    'applyItemBattleSystemATBUserEffect',
    'updateGraphic',
    'EnemyBattlerFaceName',
    'Settings',
    '_fieldAtbGaugeIconIndex',
    'makeDeepCopy',
    'tpbBaseSpeed',
    '_fieldAtbGaugeFaceIndex',
    'BattleManager_isActiveTpb',
    'tpbChargeTime',
    'clearTpbChargeTime',
    'removeState',
    'GaugeDirection',
    'GaugeSystemSkin',
    'some',
    'DrawGauge',
    'compareBattlerSprites',
    '%1Side',
    'isAppeared',
    'createActorSprites',
    'Enemies',
    'createAtbGaugeSprite',
    'requestFauxAnimation',
    'canMakeTpbActionsAtStartTpbTurn',
    'maxCommands',
    'FieldGaugeClearActorGraphic',
    'createFieldAtbGraphicType',
    'onAtbInterrupt',
    'Game_BattlerBase_appear',
    'prototype',
    'updatePositionOffset',
    'Game_BattlerBase_recoverAll',
    'Sprite_Gauge_gaugeColor1',
    'disappear',
    'Window_StatusBase_placeGauge',
    'setup',
    'ConfigManager_makeData',
    '_windowLayer',
    'svActorVertCells',
    'ConvertParams',
    'createKeyJS',
    'createStateIconSprite',
    'setBattleSystemATBFieldGaugeVisible',
    'createAllWindows',
    'setAtbGraphicIconIndex',
    'createBorderSprite',
    'ARRAYFUNC',
    'ShowStatusGauge',
    'Window_SideviewUiBattleStatus',
    'gaugeColor2',
    'changeSvActorGraphicBitmap',
    'numActions',
    'createFieldGaugeContainerATB',
    'note',
    'faceHeight',
    'FieldGaugeEnemyFace',
    'loadSystem',
    'toUpperCase',
    'startTpbTurn',
    'Armor-%1-%2',
    'DisplayPosition',
    'getChildIndex',
    'Interrupt',
    'textColor',
    'visible',
    '5477976PRTDKc',
    'Color',
    'isActor',
    'blt',
    'constructor',
    'Sprite_Battler_setBattler',
    'gaugeHeight',
    '_graphicFaceIndex',
    'setFrame',
    'currentMaxValue',
    'applyItemUserEffect',
    'traitObjects',
    'fieldAtbGraphicFaceIndex',
    'canMove',
    'initBattleSystemATB',
    'OffsetX',
    'bottom',
    'EnemyBattlerType',
    'createGraphicSprite',
    'applyATBPenalty',
    'version',
    'updateTpb',
    'setHue',
    'die',
    'SlowRate',
    'full',
    'updateAtbGaugeSpritePosition',
    'atbActive',
    'Game_Battler_tpbRelativeSpeed',
    'Game_Battler_tpbSpeed',
    'parse',
    'IconIndex',
    'createChildren',
    'concat',
    'svactor',
    'recoverAll',
    'updateTpbChargeTime',
    'createFieldAtbGraphicIconIndex',
    '_homeY',
    '%1BgColor2',
    'mainSprite',
    '_scene',
    'createEnemySprites',
    'Game_Battler_clearTpbChargeTime',
    'initTpbChargeTimeATB',
    'Window_Options_addGeneralOptions',
    '_homeX',
    'createJS',
    'applyData',
    'atbGaugeColor',
    'children',
    'AddOption',
    'opacity',
    '_backgroundSprite',
    'fontFace',
    'Game_Action_applyItemUserEffect',
    'ParseItemNotetags',
    'svBattlerName',
    'lineHeight',
    'battleMembers',
    'VisuMZ_2_AggroControlSystem',
    'Game_Battler_applyTpbPenalty',
    'Game_Unit_updateTpb',
    'setupBattleSystemATBColors',
    'isGaugeHorizontal',
    'atbAcceleration',
    'faceWidth',
    'MarkerSize',
    'updatePositionOnGauge',
    'GaugeThick',
    'updateVisibility',
    'iconHeight',
    'getColor',
    'placeGauge',
    '_skinSprite',
    '1546460SWbyOg',
    'GaugeLengthHorz',
    'UseFieldGauge',
    'call',
    'isDead',
    'Enemy',
    'setHomeLocation',
    'Weapon-%1-%2',
    'onDatabaseLoaded',
    'visualAtbGauge',
    '2154KKUHHK',
    'currentValue',
    '_svBattlerSprite',
    'BattleSystemATB',
    'stop%1',
    'StunsResetGauge',
    '_atbFieldGaugeVisible',
    '_statusType',
    'showVisualAtbGauge',
    'Sprite_Actor_createStateSprite',
    '_onRestrictBypassAtbReset',
    'process_VisuMZ_BattleSystemATB_JS_Notetags',
    'updatePosition',
    'format',
    'FaceName',
    'setAtbChargeTime',
    '_arrowSprite',
    'addLoadListener',
    '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.',
    'left',
    'SystemFieldGaugeVisibility',
    'FieldGaugeClearEnemyGraphic',
    'Game_BattlerBase_die',
    'applyTpbPenalty',
    'changeAtbChargeTime',
    'RepositionTopForHelp',
    'setupArrowSprite',
    'AnchorX',
    'addGeneralOptions',
    '_fieldGaugeATB',
    'fillRect',
    'gaugeBackColor',
    '_letterSprite',
    'sort',
    'BattlerRelativeSpeedJS',
    'Class-%1-%2',
    '_graphicType',
    'FaceIndex',
    'battleUIOffsetY',
    'registerCommand',
    'setBattler',
    'Window_BattleStatus',
    'stop',
    '_graphicSprite',
    'applyGlobalBattleSystemATBEffects',
    'tpbAcceleration',
    'applyGlobal',
    'Sprite_Enemy_startEffect',
    'startTpbCasting',
    'changeFaceGraphicBitmap',
    'ready',
    '_tpbTurnCount',
    'clear',
    'initialize',
    'gradientFillRect',
    'onRestrict',
    'RegExp',
    'OffsetY',
    '7014ADLPck',
    'VisibleGauge',
    'atbCurrentValue',
    '_blendColor',
    'initMembers',
    'checkAggroControlSystemOffsetYAdjustment',
    'Window_Help_setItem',
    'map',
    'isEnemy',
    'cast',
    'mainFontFace',
    'EnemyBattlerFaceIndex',
    'gaugeColor1',
    'FUNC',
    '_endingBattle',
    '_tpbIdleTime',
    'round',
    'createLetterSprite',
    'paramBuffRate',
    'Sprite_Gauge_gaugeColor2',
    'loadEnemy',
    'Game_System_initialize',
    'scale',
    'fieldAtbGraphicIconIndex',
    'time',
    '#%1',
    'After',
    'EnemyBattlerIcon',
    'ColorManager_loadWindowskin',
    'ShowEnemyGauge',
    'loadSvActor',
    'createFieldGaugeSpriteATB',
    'max',
    'floor',
    'atbStopped',
    'Sprite_Battler_updateMain',
    'isTpbCharged',
    'setItem',
    'GaugeLengthVert',
    'aggroGauge',
    'FieldGaugeActorFace',
    'createFieldAtbGraphicFaceName',
    '_needsAtbClear',
    '_windowskin',
    'slow',
    'AnchorY',
    'changeAtbCastTime',
    'battlerName',
    '_subject',
    'createBattlerContainer',
    'Mechanics',
    'Actors',
    'setAtbCastTime',
    'isBattleSystemATBFieldGaugeVisible',
    'atbColor',
    'Scene_Options_maxCommands',
    'MarkerSpeed',
    'targetOpacity',
    '_tpbChargeTime',
    'MarkerArrowWindowSkin',
    'ActorBattlerIcon',
    '_forcing',
    'DisplayOffsetY',
    'processUpdateGraphic',
    'startEffect',
    'updateMain',
    'addChild',
    'VisuMZ_0_CoreEngine',
    'match',
    'initTpbChargeTime',
    'drawGaugeBitmap',
    '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.',
    'setText',
    'setBlendColor',
    '_index',
    '_graphicSv',
    '_tpbState',
    'changeIconGraphicBitmap',
    '_letter',
    '22492OvXFmQ',
    '_graphicFaceName',
    '_battlerContainer',
    'Game_Battler_tpbBaseSpeed',
    'atbCurrentMaxValue',
    'undecided',
    'filter',
    '_tpbCastTime',
    'Game_BattlerBase_revive',
    '#000000',
    '_fieldAtbGaugeFaceName',
    'JSON',
    'face',
    '(?:GAUGE|TIME|SPEED)',
    'isActiveTpb',
    'Game_Battler_clearActions',
    'isSideView',
    '(?:ATB|TPB)',
    'EscapeFailPenalty',
    'updateGraphicHue',
    'ctGaugeColor2',
    'InterruptTextColor',
    'Game_BattlerBase_clearStates',
    'createGaugeBitmap',
    'clearStates',
    'tpbRequiredCastTime',
    'boxHeight',
    'length',
    'Scene_Boot_onDatabaseLoaded',
    'ceil',
    'updateSelectionEffect',
    'makeData',
    'Game_Battler_removeState',
    'addBattleSystemATBCommands',
    'bitmap',
    'Sprite_Enemy_createStateIconSprite',
    'Sprite_Gauge_currentMaxValue',
    'loadWindowskin',
    'fieldAtbGraphicType',
    '_atbGaugeSprite',
    '4030135YTDbsM',
    'trim',
    'createFieldAtbGraphicFaceIndex',
    'applyBattleSystemATBUserEffect',
    '_graphicEnemy',
    'paramRate',
    '_fieldGaugeATB_Container',
    'setActionState',
    'AdjustRect',
    'Game_Action_applyGlobal',
    '_fieldAtbGaugeGraphicType',
    '_graphicIconIndex',
    'battler',
    'Game_Battler_startTpbCasting',
    '_atbAfterSpeed',
    'BattleManager_endBattlerActions',
    'Actor',
    'endBattlerActions',
    'ShowMarkerArrow',
    'IconSet',
    'Charge',
    'isAtbCastingState',
    'createBackgroundSprite',
    'Scale',
    'cast2',
    'includes',
    'InterruptMute',
  ];
  _0x9ea2 = function () {
    return _0x475b97;
  };
  return _0x9ea2();
}
(VisuMZ[label][_0x15172f(0x237)] = VisuMZ[label][_0x15172f(0x237)] || {}),
  (VisuMZ[_0x15172f(0x7c)] = function (_0xf885d7, _0x499787) {
    const _0x3823aa = _0x15172f;
    for (const _0x339f81 in _0x499787) {
      if (_0x339f81['match'](/(.*):(.*)/i)) {
        const _0x5cdfbd = String(RegExp['$1']),
          _0x4cb315 = String(RegExp['$2'])[_0x3823aa(0x8e)]()[_0x3823aa(0x19d)]();
        let _0x4d929f, _0x9eb199, _0x930a77;
        switch (_0x4cb315) {
          case _0x3823aa(0x22d):
            _0x4d929f = _0x499787[_0x339f81] !== '' ? Number(_0x499787[_0x339f81]) : 0x0;
            break;
          case 'ARRAYNUM':
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : []), (_0x4d929f = _0x9eb199[_0x3823aa(0x12c)](_0x1a3ec9 => Number(_0x1a3ec9)));
            break;
          case 'EVAL':
            _0x4d929f = _0x499787[_0x339f81] !== '' ? eval(_0x499787[_0x339f81]) : null;
            break;
          case 'ARRAYEVAL':
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : []), (_0x4d929f = _0x9eb199[_0x3823aa(0x12c)](_0x3c969d => eval(_0x3c969d)));
            break;
          case _0x3823aa(0x17f):
            _0x4d929f = _0x499787[_0x339f81] !== '' ? JSON['parse'](_0x499787[_0x339f81]) : '';
            break;
          case _0x3823aa(0x21f):
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : []), (_0x4d929f = _0x9eb199[_0x3823aa(0x12c)](_0x149a83 => JSON[_0x3823aa(0xb4)](_0x149a83)));
            break;
          case _0x3823aa(0x132):
            _0x4d929f = _0x499787[_0x339f81] !== '' ? new Function(JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81])) : new Function('return\x200');
            break;
          case _0x3823aa(0x83):
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON['parse'](_0x499787[_0x339f81]) : []), (_0x4d929f = _0x9eb199[_0x3823aa(0x12c)](_0x41b706 => new Function(JSON['parse'](_0x41b706))));
            break;
          case 'STR':
            _0x4d929f = _0x499787[_0x339f81] !== '' ? String(_0x499787[_0x339f81]) : '';
            break;
          case 'ARRAYSTR':
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : []), (_0x4d929f = _0x9eb199[_0x3823aa(0x12c)](_0x13f7c8 => String(_0x13f7c8)));
            break;
          case 'STRUCT':
            (_0x930a77 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : {}), (_0x4d929f = VisuMZ[_0x3823aa(0x7c)]({}, _0x930a77));
            break;
          case 'ARRAYSTRUCT':
            (_0x9eb199 = _0x499787[_0x339f81] !== '' ? JSON[_0x3823aa(0xb4)](_0x499787[_0x339f81]) : []),
              (_0x4d929f = _0x9eb199['map'](_0x4a3c7d => VisuMZ[_0x3823aa(0x7c)]({}, JSON['parse'](_0x4a3c7d))));
            break;
          default:
            continue;
        }
        _0xf885d7[_0x5cdfbd] = _0x4d929f;
      }
    }
    return _0xf885d7;
  }),
  (_0x547617 => {
    const _0x5a4522 = _0x15172f,
      _0x5ec48b = _0x547617['name'];
    for (const _0x37b9d5 of dependencies) {
      if (!Imported[_0x37b9d5]) {
        alert(_0x5a4522(0xfd)[_0x5a4522(0xf8)](_0x5ec48b, _0x37b9d5)), SceneManager[_0x5a4522(0x1e5)]();
        break;
      }
    }
    const _0x223dbb = _0x547617['description'];
    if (_0x223dbb[_0x5a4522(0x169)](/\[Version[ ](.*?)\]/i)) {
      const _0x1eb194 = Number(RegExp['$1']);
      _0x1eb194 !== VisuMZ[label][_0x5a4522(0xaa)] && (alert(_0x5a4522(0x16c)[_0x5a4522(0xf8)](_0x5ec48b, _0x1eb194)), SceneManager[_0x5a4522(0x1e5)]());
    }
    if (_0x223dbb[_0x5a4522(0x169)](/\[Tier[ ](\d+)\]/i)) {
      const _0x133bc8 = Number(RegExp['$1']);
      _0x133bc8 < tier
        ? (alert(
            '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
              'format'
            ](_0x5ec48b, _0x133bc8, tier),
          ),
          SceneManager[_0x5a4522(0x1e5)]())
        : (tier = Math[_0x5a4522(0x145)](_0x133bc8, tier));
    }
    VisuMZ[_0x5a4522(0x7c)](VisuMZ[label]['Settings'], _0x547617[_0x5a4522(0x20a)]);
  })(pluginData),
  PluginManager[_0x15172f(0x112)](pluginData[_0x15172f(0x1e7)], _0x15172f(0x1de), _0x132e68 => {
    const _0x28aaad = _0x15172f;
    VisuMZ['ConvertParams'](_0x132e68, _0x132e68);
    const _0x255c9a = _0x132e68[_0x28aaad(0x158)],
      _0x8a82be = _0x132e68[_0x28aaad(0xb5)];
    for (const _0x2b8264 of _0x255c9a) {
      const _0x1bb003 = $gameActors['actor'](_0x2b8264);
      if (!_0x1bb003) continue;
      (_0x1bb003['_fieldAtbGaugeGraphicType'] = _0x28aaad(0x1d9)), (_0x1bb003[_0x28aaad(0x238)] = _0x8a82be);
    }
  }),
  PluginManager[_0x15172f(0x112)](pluginData[_0x15172f(0x1e7)], _0x15172f(0x14d), _0x252871 => {
    const _0x83ead = _0x15172f;
    VisuMZ[_0x83ead(0x7c)](_0x252871, _0x252871);
    const _0x227618 = _0x252871[_0x83ead(0x158)],
      _0x50734a = _0x252871['FaceName'],
      _0x4cf89a = _0x252871[_0x83ead(0x110)];
    for (const _0x92be38 of _0x227618) {
      const _0x10d9db = $gameActors[_0x83ead(0x1ea)](_0x92be38);
      if (!_0x10d9db) continue;
      (_0x10d9db[_0x83ead(0x1a6)] = 'face'), (_0x10d9db['_fieldAtbGaugeFaceName'] = _0x50734a), (_0x10d9db[_0x83ead(0x23b)] = _0x4cf89a);
    }
  }),
  PluginManager['registerCommand'](pluginData[_0x15172f(0x1e7)], _0x15172f(0x24d), _0x4353eb => {
    const _0x3fb128 = _0x15172f;
    VisuMZ[_0x3fb128(0x7c)](_0x4353eb, _0x4353eb);
    const _0x4bb886 = _0x4353eb[_0x3fb128(0x158)];
    for (const _0x1e31d4 of _0x4bb886) {
      const _0x58a4da = $gameActors[_0x3fb128(0x1ea)](_0x1e31d4);
      if (!_0x58a4da) continue;
      _0x58a4da[_0x3fb128(0x1ce)]();
    }
  }),
  PluginManager[_0x15172f(0x112)](pluginData[_0x15172f(0x1e7)], _0x15172f(0x220), _0x2e432d => {
    const _0x11c0b1 = _0x15172f;
    VisuMZ[_0x11c0b1(0x7c)](_0x2e432d, _0x2e432d);
    const _0x89f939 = _0x2e432d['Enemies'],
      _0x5af9a1 = _0x2e432d[_0x11c0b1(0xb5)];
    for (const _0x59c874 of _0x89f939) {
      const _0x2ff430 = $gameTroop[_0x11c0b1(0x1c3)]()[_0x59c874];
      if (!_0x2ff430) continue;
      (_0x2ff430[_0x11c0b1(0x1a6)] = _0x11c0b1(0x1d9)), (_0x2ff430['_fieldAtbGaugeIconIndex'] = _0x5af9a1);
    }
  }),
  PluginManager['registerCommand'](pluginData[_0x15172f(0x1e7)], _0x15172f(0x8c), _0x5785aa => {
    const _0x61e612 = _0x15172f;
    VisuMZ[_0x61e612(0x7c)](_0x5785aa, _0x5785aa);
    const _0x43f6b9 = _0x5785aa[_0x61e612(0x248)],
      _0x4ba590 = _0x5785aa[_0x61e612(0xf9)],
      _0x2d31a2 = _0x5785aa[_0x61e612(0x110)];
    for (const _0x4c5abe of _0x43f6b9) {
      const _0x23f178 = $gameTroop[_0x61e612(0x1c3)]()[_0x4c5abe];
      if (!_0x23f178) continue;
      (_0x23f178[_0x61e612(0x1a6)] = _0x61e612(0x180)), (_0x23f178[_0x61e612(0x17e)] = _0x4ba590), (_0x23f178[_0x61e612(0x23b)] = _0x2d31a2);
    }
  }),
  PluginManager['registerCommand'](pluginData[_0x15172f(0x1e7)], _0x15172f(0x100), _0xdd4d0e => {
    const _0x5ab507 = _0x15172f;
    VisuMZ[_0x5ab507(0x7c)](_0xdd4d0e, _0xdd4d0e);
    const _0x134c9c = _0xdd4d0e[_0x5ab507(0x248)];
    for (const _0x4a9587 of _0x134c9c) {
      const _0x590c20 = $gameTroop[_0x5ab507(0x1c3)]()[_0x4a9587];
      if (!_0x590c20) continue;
      _0x590c20['clearFieldAtbGraphics']();
    }
  }),
  PluginManager[_0x15172f(0x112)](pluginData[_0x15172f(0x1e7)], _0x15172f(0xff), _0x1d116a => {
    const _0x3395a8 = _0x15172f;
    VisuMZ[_0x3395a8(0x7c)](_0x1d116a, _0x1d116a);
    const _0x4be1f0 = _0x1d116a['Visible'];
    $gameSystem[_0x3395a8(0x7f)](_0x4be1f0);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x190)] = Scene_Boot['prototype'][_0x15172f(0xe9)]),
  (Scene_Boot[_0x15172f(0x72)][_0x15172f(0xe9)] = function () {
    const _0x31c0bf = _0x15172f;
    this[_0x31c0bf(0x1f9)](), VisuMZ[_0x31c0bf(0xee)][_0x31c0bf(0x190)][_0x31c0bf(0xe4)](this), this[_0x31c0bf(0xf6)]();
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x123)] = {}),
  (Scene_Boot['prototype'][_0x15172f(0x1f9)] = function () {
    const _0xaa539a = _0x15172f,
      _0x337136 = VisuMZ['BattleCore'][_0xaa539a(0x123)],
      _0x4dd24a = _0xaa539a(0x1df),
      _0x1bb3c6 = [_0xaa539a(0x1b0), _0xaa539a(0x22c), _0xaa539a(0x13f)];
    for (const _0x4465bb of _0x1bb3c6) {
      const _0x1c34da = _0x4dd24a[_0xaa539a(0xf8)](_0x4465bb[_0xaa539a(0x8e)]()['trim'](), _0xaa539a(0x185), _0xaa539a(0x181)),
        _0x25f8a8 = new RegExp(_0x1c34da, 'i');
      VisuMZ['BattleSystemATB'][_0xaa539a(0x123)][_0x4465bb] = _0x25f8a8;
    }
  }),
  (Scene_Boot['prototype'][_0x15172f(0xf6)] = function () {
    const _0x106c92 = _0x15172f;
    if (VisuMZ[_0x106c92(0x1da)]) return;
    const _0x50058a = $dataSkills[_0x106c92(0xb7)]($dataItems);
    for (const _0x244f74 of _0x50058a) {
      if (!_0x244f74) continue;
      VisuMZ['BattleSystemATB'][_0x106c92(0x1e6)](_0x244f74);
    }
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x1cc)] = VisuMZ[_0x15172f(0x1cc)]),
  (VisuMZ[_0x15172f(0x1cc)] = function (_0x559ada) {
    const _0x4f281f = _0x15172f;
    VisuMZ[_0x4f281f(0xee)][_0x4f281f(0x1cc)][_0x4f281f(0xe4)](this, _0x559ada), VisuMZ['BattleSystemATB'][_0x4f281f(0x1e6)](_0x559ada);
  }),
  (VisuMZ['BattleSystemATB']['ParseItemNotetags'] = VisuMZ[_0x15172f(0xce)]),
  (VisuMZ[_0x15172f(0xce)] = function (_0x216cf0) {
    const _0x2be182 = _0x15172f;
    VisuMZ[_0x2be182(0xee)][_0x2be182(0xce)]['call'](this, _0x216cf0), VisuMZ[_0x2be182(0xee)]['Parse_Notetags_CreateJS'](_0x216cf0);
  }),
  (VisuMZ[_0x15172f(0xee)]['Parse_Notetags_CreateJS'] = function (_0x1f0d0c) {
    const _0x4af708 = _0x15172f,
      _0x524cd9 = [_0x4af708(0x1b0), 'Cast', 'After'];
    for (const _0x1ebee2 of _0x524cd9) {
      VisuMZ[_0x4af708(0xee)][_0x4af708(0xc5)](_0x1f0d0c, _0x1ebee2);
    }
  }),
  (VisuMZ['BattleSystemATB']['JS'] = {}),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0xc5)] = function (_0x3d43f6, _0x567790) {
    const _0x39f573 = _0x15172f,
      _0x1f357f = _0x3d43f6['note'];
    if (_0x1f357f['match'](VisuMZ[_0x39f573(0xee)][_0x39f573(0x123)][_0x567790])) {
      const _0x1bd2c1 = String(RegExp['$1']),
        _0x2734ab =
          '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[
            _0x39f573(0xf8)
          ](_0x1bd2c1, _0x567790),
        _0x51003e = VisuMZ['BattleSystemATB'][_0x39f573(0x7d)](_0x3d43f6, _0x567790);
      VisuMZ[_0x39f573(0xee)]['JS'][_0x51003e] = new Function(_0x2734ab);
    }
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x7d)] = function (_0x3b4558, _0x3a2184) {
    const _0x747a66 = _0x15172f;
    if (VisuMZ[_0x747a66(0x7d)]) return VisuMZ['createKeyJS'](_0x3b4558, _0x3a2184);
    let _0xa06c9d = '';
    if ($dataActors[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = _0x747a66(0x1d2)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataClasses['includes'](_0x3b4558)) _0xa06c9d = _0x747a66(0x10e)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataSkills['includes'](_0x3b4558)) _0xa06c9d = 'Skill-%1-%2'[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataItems[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = _0x747a66(0x217)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataWeapons[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = _0x747a66(0xe8)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataArmors[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = _0x747a66(0x90)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataEnemies[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = 'Enemy-%1-%2'[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    if ($dataStates[_0x747a66(0x1b5)](_0x3b4558)) _0xa06c9d = _0x747a66(0x205)[_0x747a66(0xf8)](_0x3b4558['id'], _0x3a2184);
    return _0xa06c9d;
  }),
  (ConfigManager[_0x15172f(0xea)] = !![]),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x79)] = ConfigManager[_0x15172f(0x193)]),
  (ConfigManager['makeData'] = function () {
    const _0x1095fe = _0x15172f,
      _0x1b08c5 = VisuMZ[_0x1095fe(0xee)][_0x1095fe(0x79)][_0x1095fe(0xe4)](this);
    return (_0x1b08c5[_0x1095fe(0xea)] = this[_0x1095fe(0xea)]), _0x1b08c5;
  }),
  (VisuMZ[_0x15172f(0xee)]['ConfigManager_applyData'] = ConfigManager[_0x15172f(0xc6)]),
  (ConfigManager[_0x15172f(0xc6)] = function (_0x525deb) {
    const _0x1fae10 = _0x15172f;
    VisuMZ[_0x1fae10(0xee)][_0x1fae10(0x1fc)][_0x1fae10(0xe4)](this, _0x525deb), _0x1fae10(0xea) in _0x525deb ? (this[_0x1fae10(0xea)] = _0x525deb[_0x1fae10(0xea)]) : (this[_0x1fae10(0xea)] = !![]);
  }),
  (ImageManager['svActorHorzCells'] = ImageManager[_0x15172f(0x1cf)] || 0x9),
  (ImageManager[_0x15172f(0x7b)] = ImageManager['svActorVertCells'] || 0x6),
  (TextManager[_0x15172f(0xea)] = VisuMZ['BattleSystemATB'][_0x15172f(0x237)][_0x15172f(0x1d7)][_0x15172f(0x202)]),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x141)] = ColorManager[_0x15172f(0x199)]),
  (ColorManager['loadWindowskin'] = function () {
    const _0x442e34 = _0x15172f;
    VisuMZ[_0x442e34(0xee)][_0x442e34(0x141)][_0x442e34(0xe4)](this), this[_0x442e34(0x150)]['addLoadListener'](this[_0x442e34(0xd5)]['bind'](this));
  }),
  (ColorManager[_0x15172f(0xde)] = function (_0x1cc8e2) {
    const _0x513a3c = _0x15172f;
    return (_0x1cc8e2 = String(_0x1cc8e2)), _0x1cc8e2['match'](/#(.*)/i) ? _0x513a3c(0x13e)['format'](String(RegExp['$1'])) : this[_0x513a3c(0x94)](Number(_0x1cc8e2));
  }),
  (ColorManager[_0x15172f(0xd5)] = function () {
    const _0x2e9bf2 = _0x15172f,
      _0x50aec8 = ['default', _0x2e9bf2(0xaf), _0x2e9bf2(0x12e), 'fast', _0x2e9bf2(0x151), _0x2e9bf2(0x115)],
      _0x403c08 = VisuMZ['BattleSystemATB']['Settings'][_0x2e9bf2(0x97)];
    this['_atbColors'] = {};
    for (const _0x46aa4e of _0x50aec8) {
      for (let _0x30d972 = 0x1; _0x30d972 <= 0x2; _0x30d972++) {
        const _0x38035b = _0x46aa4e + _0x30d972;
        this['_atbColors'][_0x38035b] = this[_0x2e9bf2(0xde)](_0x403c08[_0x38035b]);
      }
    }
  }),
  (ColorManager[_0x15172f(0x15b)] = function (_0x330ac4) {
    const _0x542e80 = _0x15172f;
    if (this['_atbColors'] === undefined) this[_0x542e80(0xd5)]();
    return this['_atbColors'][_0x330ac4] || _0x542e80(0x17d);
  }),
  (SceneManager[_0x15172f(0x22f)] = function () {
    const _0x359285 = _0x15172f;
    return this[_0x359285(0xbf)] && this[_0x359285(0xbf)]['constructor'] === Scene_Battle;
  }),
  (BattleManager['isATB'] = function () {
    const _0x4a7851 = _0x15172f;
    if (Imported[_0x4a7851(0x231)] && this['isCTB']()) return ![];
    return this[_0x4a7851(0x1f4)]();
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x23c)] = BattleManager[_0x15172f(0x182)]),
  (BattleManager[_0x15172f(0x182)] = function () {
    const _0x286dbf = _0x15172f;
    if (!this[_0x286dbf(0x1f4)]()) return ![];
    else return ConfigManager && ConfigManager[_0x286dbf(0xb1)] !== undefined ? ConfigManager['atbActive'] : VisuMZ[_0x286dbf(0xee)][_0x286dbf(0x23c)]['call'](this);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x13a)] = Game_System[_0x15172f(0x72)]['initialize']),
  (Game_System[_0x15172f(0x72)][_0x15172f(0x120)] = function () {
    const _0x48ee34 = _0x15172f;
    VisuMZ[_0x48ee34(0xee)][_0x48ee34(0x13a)]['call'](this), this[_0x48ee34(0xa4)]();
  }),
  (Game_System[_0x15172f(0x72)][_0x15172f(0xa4)] = function () {
    const _0x2b88a5 = _0x15172f;
    this[_0x2b88a5(0xf1)] = !![];
  }),
  (Game_System['prototype'][_0x15172f(0x15a)] = function () {
    const _0x3fd74f = _0x15172f;
    return this[_0x3fd74f(0xf1)] === undefined && this['initBattleSystemATB'](), this[_0x3fd74f(0xf1)];
  }),
  (Game_System[_0x15172f(0x72)]['setBattleSystemATBFieldGaugeVisible'] = function (_0x2947f4) {
    const _0x1dddb0 = _0x15172f;
    this[_0x1dddb0(0xf1)] === undefined && this[_0x1dddb0(0xa4)](), (this[_0x1dddb0(0xf1)] = _0x2947f4);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0xcd)] = Game_Action[_0x15172f(0x72)][_0x15172f(0xa0)]),
  (Game_Action[_0x15172f(0x72)][_0x15172f(0xa0)] = function (_0x43a959) {
    const _0x317cc6 = _0x15172f;
    VisuMZ[_0x317cc6(0xee)][_0x317cc6(0xcd)][_0x317cc6(0xe4)](this, _0x43a959), this[_0x317cc6(0x19f)](_0x43a959);
  }),
  (Game_Action[_0x15172f(0x72)][_0x15172f(0x19f)] = function (_0x40d921) {
    const _0x582080 = _0x15172f;
    if (!SceneManager['isSceneBattle']()) return;
    if (!BattleManager[_0x582080(0x224)]()) return;
    if (this[_0x582080(0x227)]()) this[_0x582080(0x234)](_0x40d921);
  }),
  (Game_Action[_0x15172f(0x72)][_0x15172f(0x234)] = function (_0x5d9d5b) {
    const _0x1d7e2f = _0x15172f,
      _0x3977f0 = this['item']()[_0x1d7e2f(0x8a)];
    if (_0x5d9d5b[_0x1d7e2f(0x1c9)]()) {
      const _0x4a16f2 = VisuMZ[_0x1d7e2f(0xee)]['createKeyJS'](this[_0x1d7e2f(0x227)](), _0x1d7e2f(0x1b0));
      if (VisuMZ['BattleSystemATB']['JS'][_0x4a16f2]) {
        const _0x2d98f6 = VisuMZ['BattleSystemATB']['JS'][_0x4a16f2][_0x1d7e2f(0xe4)](this, this['subject'](), _0x5d9d5b);
        _0x5d9d5b['setAtbChargeTime'](_0x2d98f6);
      }
      _0x3977f0[_0x1d7e2f(0x169)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i) && _0x5d9d5b['setAtbChargeTime'](Number(RegExp['$1']) * 0.01),
        _0x3977f0[_0x1d7e2f(0x169)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i) && _0x5d9d5b['changeAtbChargeTime'](Number(RegExp['$1']) * 0.01);
    } else {
      if (_0x5d9d5b[_0x1d7e2f(0x1b1)]()) {
        const _0x5a90b4 = VisuMZ[_0x1d7e2f(0xee)][_0x1d7e2f(0x7d)](this[_0x1d7e2f(0x227)](), _0x1d7e2f(0x22c));
        if (VisuMZ[_0x1d7e2f(0xee)]['JS'][_0x5a90b4]) {
          const _0x4cf845 = VisuMZ[_0x1d7e2f(0xee)]['JS'][_0x5a90b4][_0x1d7e2f(0xe4)](this, this[_0x1d7e2f(0x1be)](), _0x5d9d5b);
          _0x5d9d5b['setAtbCastTime'](_0x4cf845);
        }
        _0x3977f0[_0x1d7e2f(0x169)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i) && _0x5d9d5b[_0x1d7e2f(0x159)](Number(RegExp['$1']) * 0.01),
          _0x3977f0['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i) && _0x5d9d5b[_0x1d7e2f(0x153)](Number(RegExp['$1']) * 0.01),
          _0x3977f0['match'](/<(?:ATB|TPB) INTERRUPT>/i) && _0x5d9d5b['atbInterrupt']();
      }
    }
  }),
  (VisuMZ[_0x15172f(0xee)]['Game_Action_applyGlobal'] = Game_Action['prototype'][_0x15172f(0x119)]),
  (Game_Action['prototype'][_0x15172f(0x119)] = function () {
    const _0x4222c6 = _0x15172f;
    VisuMZ['BattleSystemATB'][_0x4222c6(0x1a5)][_0x4222c6(0xe4)](this), this[_0x4222c6(0x117)]();
  }),
  (Game_Action[_0x15172f(0x72)]['applyGlobalBattleSystemATBEffects'] = function () {
    const _0xfcbb90 = _0x15172f;
    if (!this[_0xfcbb90(0x227)]()) return;
    if (!BattleManager['isATB']()) return;
    const _0x1de08e = this[_0xfcbb90(0x227)]()[_0xfcbb90(0x8a)];
    let _0x540f38 = 0x0;
    this[_0xfcbb90(0x162)] && (_0x540f38 = this[_0xfcbb90(0x1be)]()[_0xfcbb90(0x15f)]);
    const _0x23af9d = VisuMZ['BattleSystemATB'][_0xfcbb90(0x7d)](this[_0xfcbb90(0x227)](), _0xfcbb90(0x13f));
    VisuMZ[_0xfcbb90(0xee)]['JS'][_0x23af9d] && (_0x540f38 = VisuMZ[_0xfcbb90(0xee)]['JS'][_0x23af9d]['call'](this, this[_0xfcbb90(0x1be)](), this[_0xfcbb90(0x1be)]()));
    let _0x4a4d11 = this[_0xfcbb90(0x227)]()['speed'] > 0x0 ? this[_0xfcbb90(0x227)]()[_0xfcbb90(0x1ee)] : 0x0;
    if (this[_0xfcbb90(0x1cb)]()) _0x4a4d11 += this[_0xfcbb90(0x1be)]()['attackSpeed']();
    _0x540f38 += (_0x4a4d11 / 0xfa0)[_0xfcbb90(0x1f5)](0x0, 0x1);
    this[_0xfcbb90(0x227)]()[_0xfcbb90(0x8a)]['match'](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i) && (_0x540f38 = Number(RegExp['$1']) * 0.01);
    const _0x109adb = this[_0xfcbb90(0x1be)]()['traitObjects']()[_0xfcbb90(0xb7)](this[_0xfcbb90(0x1be)]()['skills']()),
      _0xdb59d3 = /<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,
      _0x34fae6 = _0x109adb[_0xfcbb90(0x12c)](_0x446889 => (_0x446889 && _0x446889[_0xfcbb90(0x8a)]['match'](_0xdb59d3) ? Number(RegExp['$1']) * 0.01 : 0x0));
    (_0x540f38 = _0x34fae6[_0xfcbb90(0x232)]((_0x3af809, _0x385a70) => _0x3af809 + _0x385a70, _0x540f38)),
      this[_0xfcbb90(0x227)]()[_0xfcbb90(0x8a)]['match'](/<(?:ATB|TPB) INSTANT>/i) && (_0x540f38 = 0xa),
      this['subject']()[_0xfcbb90(0x230)](_0x540f38);
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0xfa)] = function (_0x43e857) {
    const _0x41de4a = _0x15172f;
    this[_0x41de4a(0x15f)] = _0x43e857[_0x41de4a(0x1f5)](0x0, 0x1);
  }),
  (Game_BattlerBase['prototype'][_0x15172f(0x103)] = function (_0x5ca829) {
    const _0x4128ad = _0x15172f;
    this['setAtbChargeTime'](this[_0x4128ad(0x15f)] + _0x5ca829);
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x159)] = function (_0x1a6601) {
    const _0x411444 = _0x15172f,
      _0x221b24 = this[_0x411444(0x18d)]();
    this['_tpbCastTime'] = (_0x221b24 * _0x1a6601)[_0x411444(0x1f5)](0x0, _0x221b24);
  }),
  (Game_BattlerBase['prototype'][_0x15172f(0x153)] = function (_0xf77c91) {
    const _0x4b0cc9 = _0x15172f,
      _0x1393ea = this[_0x4b0cc9(0x18d)](),
      _0x42ca0b = _0x1393ea * _0xf77c91;
    this[_0x4b0cc9(0x17b)] = (this[_0x4b0cc9(0x17b)] + _0x42ca0b)['clamp'](0x0, _0x1393ea);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x101)] = Game_BattlerBase['prototype'][_0x15172f(0xad)]),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0xad)] = function () {
    const _0x1bf48f = _0x15172f;
    VisuMZ[_0x1bf48f(0xee)]['Game_BattlerBase_die'][_0x1bf48f(0xe4)](this), BattleManager[_0x1bf48f(0x224)]() && this[_0x1bf48f(0x23e)]();
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x17c)] = Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x20e)]),
  (Game_BattlerBase[_0x15172f(0x72)]['revive'] = function () {
    const _0x543aa2 = _0x15172f;
    VisuMZ[_0x543aa2(0xee)][_0x543aa2(0x17c)][_0x543aa2(0xe4)](this), BattleManager['isATB']() && this['clearTpbChargeTime']();
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x74)] = Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0xb9)]),
  (Game_BattlerBase[_0x15172f(0x72)]['recoverAll'] = function () {
    const _0x13a6f3 = _0x15172f,
      _0x31698c = this[_0x13a6f3(0xe5)]();
    VisuMZ[_0x13a6f3(0xee)]['Game_BattlerBase_recoverAll'][_0x13a6f3(0xe4)](this), _0x31698c && !this['isDead']() && (this[_0x13a6f3(0x23e)](), (this[_0x13a6f3(0xf5)] = undefined));
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x18a)] = Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x18c)]),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x18c)] = function () {
    const _0x37f9b1 = _0x15172f,
      _0x1d38ff = this['_states'] && this[_0x37f9b1(0xe5)]();
    VisuMZ[_0x37f9b1(0xee)][_0x37f9b1(0x18a)][_0x37f9b1(0xe4)](this), _0x1d38ff && !this['isDead']() && (this[_0x37f9b1(0x23e)](), (this[_0x37f9b1(0xf5)] = undefined));
  }),
  (VisuMZ['BattleSystemATB']['Game_Battler_initTpbChargeTime'] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x16a)]),
  (Game_Battler[_0x15172f(0x72)]['initTpbChargeTime'] = function (_0x1fb98f) {
    const _0x38c2ae = _0x15172f;
    BattleManager[_0x38c2ae(0x224)]()
      ? (this[_0x38c2ae(0xc2)](_0x1fb98f),
        isNaN(this[_0x38c2ae(0x15f)]) && (this[_0x38c2ae(0xc2)](_0x1fb98f), isNaN(this[_0x38c2ae(0x15f)]) && (this[_0x38c2ae(0x15f)] = 0x0)),
        (this[_0x38c2ae(0xf5)] = undefined))
      : VisuMZ[_0x38c2ae(0xee)]['Game_Battler_initTpbChargeTime'][_0x38c2ae(0xe4)](this, _0x1fb98f);
  }),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0xc2)] = function (_0x3713cf) {
    const _0x506903 = _0x15172f,
      _0x5eae03 = VisuMZ[_0x506903(0xee)][_0x506903(0x237)][_0x506903(0x157)];
    let _0xa9caee = this[_0x506903(0x233)]() * eval(_0x5eae03['InitialGaugeJS']);
    const _0x2eb4d3 = this[_0x506903(0xa1)]()[_0x506903(0xb7)](this[_0x506903(0x1c6)]()),
      _0x54ede3 = /<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,
      _0x18ec98 = _0x2eb4d3['map'](_0x362907 => (_0x362907 && _0x362907[_0x506903(0x8a)][_0x506903(0x169)](_0x54ede3) ? Number(RegExp['$1']) * 0.01 : 0x0));
    (_0xa9caee = _0x18ec98[_0x506903(0x232)]((_0x137a9c, _0x33dfce) => _0x137a9c + _0x33dfce, _0xa9caee)),
      (this[_0x506903(0x171)] = _0x506903(0x1e1)),
      (this['_tpbChargeTime'] = (_0x3713cf ? 0x1 : _0xa9caee)[_0x506903(0x1f5)](0x0, 0x1)),
      this['isRestricted']() && (this[_0x506903(0x15f)] = 0x0);
  }),
  (Game_Battler[_0x15172f(0x72)]['isAtbChargingState'] = function () {
    const _0x4a4424 = _0x15172f;
    return this['_tpbState'] === _0x4a4424(0x1e1);
  }),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x1b1)] = function () {
    const _0x24bf93 = _0x15172f;
    return this[_0x24bf93(0x171)] === 'casting' && this['currentAction']() && this[_0x24bf93(0x1c2)]()[_0x24bf93(0x227)]() && this[_0x24bf93(0x1c2)]()['item']()['speed'] < 0x0;
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x1e8)] = function () {
    const _0x38c0d0 = _0x15172f;
    return this['isAtbCastingState']() ? this[_0x38c0d0(0x17b)] / this['tpbRequiredCastTime']() : 0x0;
  }),
  (Game_Battler[_0x15172f(0x72)]['atbStopped'] = function () {
    const _0x269c9c = _0x15172f;
    return !this[_0x269c9c(0xa3)]();
  }),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x230)] = function (_0x2b3b19) {
    this['_atbAfterSpeed'] = _0x2b3b19;
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x1dd)] = Game_Battler['prototype'][_0x15172f(0xba)]),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0xba)] = function () {
    const _0x2e9f24 = _0x15172f;
    VisuMZ[_0x2e9f24(0xee)][_0x2e9f24(0x1dd)][_0x2e9f24(0xe4)](this),
      BattleManager[_0x2e9f24(0x224)]() &&
        this['_tpbState'] === _0x2e9f24(0x1e1) &&
        isNaN(this['_tpbChargeTime']) &&
        ((this['_tpbChargeTime'] = this[_0x2e9f24(0x118)]()), isNaN(this[_0x2e9f24(0x15f)]) && (this['_tpbChargeTime'] = 0x0));
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x1ab)] = BattleManager[_0x15172f(0x1ad)]),
  (BattleManager[_0x15172f(0x1ad)] = function (_0x407a9f) {
    const _0x5a82b0 = _0x15172f;
    this[_0x5a82b0(0x224)]() && !_0x407a9f[_0x5a82b0(0xa3)]() && (_0x407a9f[_0x5a82b0(0xf5)] = !![]),
      VisuMZ[_0x5a82b0(0xee)][_0x5a82b0(0x1ab)][_0x5a82b0(0xe4)](this, _0x407a9f),
      _0x407a9f[_0x5a82b0(0x12d)]() && this['isATB']() && !_0x407a9f[_0x5a82b0(0xa3)]() && (_0x407a9f[_0x5a82b0(0xf5)] = ![]);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0xc1)] = Game_Battler[_0x15172f(0x72)]['clearTpbChargeTime']),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x23e)] = function () {
    const _0x30a1cc = _0x15172f;
    if (this['_onRestrictBypassAtbReset']) return;
    VisuMZ[_0x30a1cc(0xee)][_0x30a1cc(0xc1)]['call'](this), (this[_0x30a1cc(0x15f)] += this[_0x30a1cc(0x1aa)] || 0x0);
  }),
  (Game_Battler[_0x15172f(0x72)]['atbInterrupt'] = function () {
    const _0x2613b0 = _0x15172f;
    if (!this[_0x2613b0(0x1b1)]()) return;
    if (!this['currentAction']()) return;
    if (!this['currentAction']()[_0x2613b0(0x227)]()) return;
    if (
      this[_0x2613b0(0x1c2)]()
        [_0x2613b0(0x227)]()
        [_0x2613b0(0x8a)][_0x2613b0(0x169)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i)
    )
      return;
    this['clearActions'](), this[_0x2613b0(0x23e)](), (this[_0x2613b0(0x17b)] = 0x0), this[_0x2613b0(0x24f)]();
  }),
  (Game_Battler[_0x15172f(0x72)]['onAtbInterrupt'] = function () {
    const _0x175646 = _0x15172f,
      _0x11e855 = VisuMZ[_0x175646(0xee)]['Settings'][_0x175646(0x93)];
    if (Imported[_0x175646(0x168)]) {
      const _0x34688e = _0x11e855[_0x175646(0x1eb)],
        _0x28108a = _0x11e855['InterruptMirror'],
        _0x800edf = _0x11e855[_0x175646(0x1b6)];
      $gameTemp[_0x175646(0x24a)]([this], _0x34688e, _0x28108a, _0x800edf);
    }
    if (this['battler']() && _0x11e855['InterruptText'][_0x175646(0x18f)] > 0x0) {
      const _0xb5bb17 = _0x11e855[_0x175646(0x1ca)],
        _0x4b3c91 = { textColor: ColorManager['getColor'](_0x11e855[_0x175646(0x189)]), flashColor: _0x11e855[_0x175646(0x1c8)], flashDuration: _0x11e855['InterruptFlashDuration'] };
      this['setupTextPopup'](_0xb5bb17, _0x4b3c91);
    }
  }),
  (VisuMZ['BattleSystemATB']['Game_Battler_startTpbCasting'] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x11b)]),
  (Game_Battler[_0x15172f(0x72)]['startTpbCasting'] = function () {
    const _0x37bbc6 = _0x15172f;
    VisuMZ[_0x37bbc6(0xee)][_0x37bbc6(0x1a9)]['call'](this), BattleManager['isATB']() && this[_0x37bbc6(0x17b)] >= this[_0x37bbc6(0x18d)]() && (this[_0x37bbc6(0x171)] = _0x37bbc6(0x11d));
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0xd4)] = Game_Unit[_0x15172f(0x72)][_0x15172f(0xab)]),
  (Game_Unit[_0x15172f(0x72)][_0x15172f(0xab)] = function () {
    const _0x5e5ef0 = _0x15172f;
    if (BattleManager[_0x5e5ef0(0x224)]()) {
      if (BattleManager[_0x5e5ef0(0x1d4)]()[_0x5e5ef0(0x242)](_0x2ed6c1 => _0x2ed6c1 && _0x2ed6c1['isAlive']() && _0x2ed6c1['isAppeared']() && _0x2ed6c1[_0x5e5ef0(0x171)] === _0x5e5ef0(0x11d)))
        return;
    }
    VisuMZ['BattleSystemATB'][_0x5e5ef0(0xd4)][_0x5e5ef0(0xe4)](this);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x200)] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x122)]),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x122)] = function () {
    const _0x176bbc = _0x15172f,
      _0x5c0cde = VisuMZ[_0x176bbc(0xee)][_0x176bbc(0x237)]['Mechanics'],
      _0x20a884 = this['restriction']();
    !_0x5c0cde[_0x176bbc(0xf0)] && _0x20a884 >= 0x4 && (this[_0x176bbc(0xf5)] = BattleManager[_0x176bbc(0x224)]()),
      VisuMZ[_0x176bbc(0xee)]['Game_Battler_onRestrict'][_0x176bbc(0xe4)](this),
      BattleManager[_0x176bbc(0x224)]() && this['_tpbState'] === 'acting' && this[_0x176bbc(0x12d)]() && (this[_0x176bbc(0x14f)] = !![]),
      (this[_0x176bbc(0xf5)] = undefined);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x183)] = Game_Battler['prototype'][_0x15172f(0x1f0)]),
  (Game_Battler['prototype']['clearActions'] = function () {
    const _0x98c1d6 = _0x15172f;
    if (this[_0x98c1d6(0xf5)] && BattleManager[_0x98c1d6(0x224)]()) return;
    VisuMZ[_0x98c1d6(0xee)][_0x98c1d6(0x183)][_0x98c1d6(0xe4)](this);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x194)] = Game_Battler['prototype'][_0x15172f(0x23f)]),
  (Game_Battler['prototype'][_0x15172f(0x23f)] = function (_0x5fb18b) {
    const _0x4b1f1b = _0x15172f,
      _0x8cfc57 = !this[_0x4b1f1b(0xa3)]() && BattleManager[_0x4b1f1b(0x224)](),
      _0x280997 = this['isStateAffected'](_0x5fb18b);
    VisuMZ[_0x4b1f1b(0xee)][_0x4b1f1b(0x194)][_0x4b1f1b(0xe4)](this, _0x5fb18b);
    if (!BattleManager['isATB']()) return;
    if (this[_0x4b1f1b(0x12d)]() && _0x280997 && !this['isStateAffected'](_0x5fb18b))
      _0x8cfc57 && this[_0x4b1f1b(0xa3)]() && this[_0x4b1f1b(0x14f)] && (this[_0x4b1f1b(0x23e)](), this['clearActions'](), (this[_0x4b1f1b(0x17b)] = 0x0)), this[_0x4b1f1b(0x1a3)](_0x4b1f1b(0x179));
    else _0x8cfc57 && this['canMove']() && this['numActions']() <= 0x0 && (this['makeActions'](), (this[_0x4b1f1b(0x171)] = _0x4b1f1b(0x1e1)), (this[_0x4b1f1b(0xf5)] = undefined));
  }),
  (Game_Battler['prototype'][_0x15172f(0x8f)] = function () {
    const _0x2e9259 = _0x15172f;
    this[_0x2e9259(0x201)]('PreStartTurnJS'),
      (this[_0x2e9259(0x1bb)] = ![]),
      this[_0x2e9259(0x11e)]++,
      (this[_0x2e9259(0x134)] = 0x0),
      this[_0x2e9259(0x24b)]() && this['makeTpbActions'](),
      this[_0x2e9259(0x201)]('PostStartTurnJS');
  }),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x24b)] = function () {
    const _0x3e4e39 = _0x15172f;
    if (this[_0x3e4e39(0x88)]() !== 0x0) return ![];
    if (BattleManager[_0x3e4e39(0x224)]()) {
      if (this[_0x3e4e39(0x12d)]()) {
        if (!this[_0x3e4e39(0x149)]()) return ![];
      }
    }
    return !![];
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0xd3)] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x102)]),
  (Game_Battler['prototype'][_0x15172f(0x102)] = function () {
    const _0x4d6c80 = _0x15172f;
    BattleManager[_0x4d6c80(0x224)]() ? this[_0x4d6c80(0xa9)]() : VisuMZ[_0x4d6c80(0xee)]['Game_Battler_applyTpbPenalty'][_0x4d6c80(0xe4)](this);
  }),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0xa9)] = function () {
    const _0x28cc25 = _0x15172f;
    (this[_0x28cc25(0x171)] = _0x28cc25(0x1e1)), (this[_0x28cc25(0x15f)] += VisuMZ[_0x28cc25(0xee)][_0x28cc25(0x237)][_0x28cc25(0x157)][_0x28cc25(0x186)] || 0x0);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0xb3)] = Game_Battler[_0x15172f(0x72)]['tpbSpeed']),
  (Game_Battler[_0x15172f(0x72)]['tpbSpeed'] = function () {
    const _0x183f89 = _0x15172f;
    return BattleManager[_0x183f89(0x224)]()
      ? VisuMZ[_0x183f89(0xee)][_0x183f89(0x237)][_0x183f89(0x157)]['TpbSpeedCalcJS'][_0x183f89(0xe4)](this, this)
      : VisuMZ['BattleSystemATB'][_0x183f89(0xb3)][_0x183f89(0xe4)](this);
  }),
  (VisuMZ[_0x15172f(0xee)]['Game_Battler_tpbBaseSpeed'] = Game_Battler['prototype'][_0x15172f(0x23a)]),
  (Game_Battler['prototype'][_0x15172f(0x23a)] = function () {
    const _0x212d96 = _0x15172f;
    return BattleManager[_0x212d96(0x224)]()
      ? VisuMZ[_0x212d96(0xee)][_0x212d96(0x237)]['Mechanics']['TpbBaseSpeedCalcJS'][_0x212d96(0xe4)](this, this)
      : VisuMZ[_0x212d96(0xee)][_0x212d96(0x177)][_0x212d96(0xe4)](this);
  }),
  (VisuMZ['BattleSystemATB']['Game_Battler_tpbRelativeSpeed'] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x233)]),
  (Game_Battler[_0x15172f(0x72)]['tpbRelativeSpeed'] = function () {
    const _0x5ec821 = _0x15172f;
    return BattleManager[_0x5ec821(0x224)]()
      ? VisuMZ[_0x5ec821(0xee)][_0x5ec821(0x237)][_0x5ec821(0x157)][_0x5ec821(0x10d)][_0x5ec821(0xe4)](this, this)
      : VisuMZ[_0x5ec821(0xee)][_0x5ec821(0xb2)][_0x5ec821(0xe4)](this);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x226)] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x118)]),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x118)] = function () {
    const _0x35d2aa = _0x15172f;
    return BattleManager[_0x35d2aa(0x224)]() ? this['atbAcceleration']() : VisuMZ[_0x35d2aa(0xee)][_0x35d2aa(0x226)][_0x35d2aa(0xe4)](this);
  }),
  (Game_Battler['prototype'][_0x15172f(0xd7)] = function () {
    const _0x5d5e6a = _0x15172f;
    let _0x2f4260 = VisuMZ['BattleSystemATB']['Settings']['Mechanics']['TpbAccelerationJS'][_0x5d5e6a(0xe4)](this, this);
    if (ConfigManager && ConfigManager[_0x5d5e6a(0x209)] !== undefined) {
      const _0x49ddd3 = ConfigManager['atbSpeed'] - 0x3;
      if (_0x49ddd3 > 0x0) return _0x2f4260 * (_0x49ddd3 * 0x2);
      else {
        if (_0x49ddd3 < 0x0) return _0x2f4260 * (0x1 / (_0x49ddd3 * -0x2));
      }
    }
    return _0x2f4260;
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x215)] = Game_Battler[_0x15172f(0x72)][_0x15172f(0x18d)]),
  (Game_Battler[_0x15172f(0x72)][_0x15172f(0x18d)] = function () {
    const _0x146298 = _0x15172f;
    if (BattleManager[_0x146298(0x224)]()) {
      const _0x2f7978 = this['_actions']['map'](_0x339572 => _0x339572['item']());
      for (const _0x237f28 of _0x2f7978) {
        if (!_0x237f28) continue;
        _0x237f28['_originalSpeed'] = _0x237f28[_0x146298(0x1c5)] ?? _0x237f28['speed'];
      }
      let _0x492f5e = VisuMZ[_0x146298(0xee)][_0x146298(0x237)][_0x146298(0x157)]['TpbCastTimeJS']['call'](this, this);
      for (const _0x4951d7 of _0x2f7978) {
        if (!_0x4951d7) continue;
        _0x4951d7['speed'] = _0x4951d7[_0x146298(0x1c5)];
      }
      return _0x492f5e;
    } else return VisuMZ[_0x146298(0xee)][_0x146298(0x215)][_0x146298(0xe4)](this);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x15c)] = Scene_Options[_0x15172f(0x72)][_0x15172f(0x24c)]),
  (Scene_Options[_0x15172f(0x72)]['maxCommands'] = function () {
    const _0x4b9dd9 = _0x15172f;
    let _0x34bfdb = VisuMZ[_0x4b9dd9(0xee)][_0x4b9dd9(0x15c)][_0x4b9dd9(0xe4)](this);
    const _0x1f1c02 = VisuMZ[_0x4b9dd9(0xee)][_0x4b9dd9(0x237)];
    if (_0x1f1c02[_0x4b9dd9(0x1d7)][_0x4b9dd9(0xc9)] && _0x1f1c02[_0x4b9dd9(0x1d7)][_0x4b9dd9(0x1a4)] && BattleManager['isATB']()) _0x34bfdb++;
    return _0x34bfdb;
  }),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x249)] = function () {
    const _0x4e4c5f = _0x15172f;
    if (!BattleManager['isATB']()) return;
    if (!ConfigManager[_0x4e4c5f(0xea)]) return;
    const _0x1d0797 = VisuMZ[_0x4e4c5f(0xee)][_0x4e4c5f(0x237)][_0x4e4c5f(0x214)],
      _0x54e4e5 = new Sprite_Gauge();
    (_0x54e4e5[_0x4e4c5f(0x1e2)]['x'] = _0x1d0797[_0x4e4c5f(0x106)]),
      (_0x54e4e5['anchor']['y'] = _0x1d0797[_0x4e4c5f(0x152)]),
      (_0x54e4e5[_0x4e4c5f(0x13b)]['x'] = _0x54e4e5['scale']['y'] = _0x1d0797[_0x4e4c5f(0x1b3)]),
      (this[_0x4e4c5f(0x19b)] = _0x54e4e5),
      this[_0x4e4c5f(0x167)](this[_0x4e4c5f(0x19b)]);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x9b)] = Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x113)]),
  (Sprite_Battler['prototype'][_0x15172f(0x113)] = function (_0x118f0f) {
    const _0x44f4a2 = _0x15172f;
    VisuMZ[_0x44f4a2(0xee)][_0x44f4a2(0x9b)][_0x44f4a2(0xe4)](this, _0x118f0f), this[_0x44f4a2(0x21a)](_0x118f0f), this[_0x44f4a2(0x1c7)]();
  }),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x21a)] = function (_0x30c524) {
    const _0x562430 = _0x15172f;
    if (!_0x30c524) return;
    if (!this['_atbGaugeSprite']) return;
    if (_0x30c524[_0x562430(0x98)]()) {
    } else {
      if (_0x30c524[_0x562430(0x12d)]()) {
        if (this[_0x562430(0x9a)] === Sprite_Enemy && _0x30c524['hasSvBattler']()) return;
        if (this[_0x562430(0x9a)] === Sprite_SvEnemy && !_0x30c524['hasSvBattler']()) return;
      }
    }
    this[_0x562430(0x19b)][_0x562430(0x78)](_0x30c524, _0x562430(0x13d));
  }),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x1c7)] = function () {
    const _0x415a73 = _0x15172f;
    if (!this[_0x415a73(0x19b)]) return;
    const _0x1adfb4 = this[_0x415a73(0x21d)] && this['_battler'][_0x415a73(0x246)]() && !this['_battler'][_0x415a73(0x212)]();
    (this[_0x415a73(0x19b)]['visible'] = _0x1adfb4), this[_0x415a73(0xed)] && this[_0x415a73(0xed)][_0x415a73(0x19b)] && (this[_0x415a73(0xed)][_0x415a73(0x19b)]['visible'] = _0x1adfb4);
  }),
  (VisuMZ[_0x15172f(0xee)]['Sprite_Battler_updateMain'] = Sprite_Battler[_0x15172f(0x72)]['updateMain']),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x166)] = function () {
    const _0x5a09f8 = _0x15172f;
    VisuMZ[_0x5a09f8(0xee)][_0x5a09f8(0x148)][_0x5a09f8(0xe4)](this), this[_0x5a09f8(0xb0)]();
  }),
  (Sprite_Battler['prototype']['updateAtbGaugeSpritePosition'] = function () {
    const _0x19780f = _0x15172f;
    if (!this[_0x19780f(0x21d)]) return;
    if (!this[_0x19780f(0x19b)]) return;
    if (this[_0x19780f(0x21d)] && this[_0x19780f(0x21d)][_0x19780f(0x12d)]() && this['_battler']['hasSvBattler']()) {
      if (this[_0x19780f(0x9a)] === Sprite_Enemy) return;
    }
    const _0x7895e6 = VisuMZ[_0x19780f(0xee)][_0x19780f(0x237)][_0x19780f(0x214)],
      _0x337e92 = this[_0x19780f(0x19b)];
    let _0x2b9bd2 = _0x7895e6['OffsetX'];
    this[_0x19780f(0x21d)][_0x19780f(0x21e)] && (_0x2b9bd2 += this[_0x19780f(0x21d)]['battleUIOffsetX']());
    let _0x248064 = _0x7895e6['OffsetY'];
    this[_0x19780f(0x21d)]['battleUIOffsetY'] && (_0x248064 += this[_0x19780f(0x21d)][_0x19780f(0x111)]());
    _0x337e92['x'] = _0x2b9bd2;
    let _0x414ba9 = this[_0x19780f(0x218)];
    this[_0x19780f(0x21d)] &&
      this[_0x19780f(0x21d)][_0x19780f(0x12d)]() &&
      this[_0x19780f(0x21d)][_0x19780f(0x22e)]() &&
      (_0x414ba9 = this[_0x19780f(0x21d)][_0x19780f(0x1cd)]()[_0x19780f(0x218)] || 0x1),
      (_0x337e92['y'] = -_0x414ba9 + _0x248064),
      this[_0x19780f(0x21d)]['isEnemy']() && this['_battler'][_0x19780f(0x20f)]()[_0x19780f(0x8a)]['match'](/<HIDE (?:ATB|TPB) GAUGE>/i) && (_0x337e92[_0x19780f(0x95)] = ![]),
      this[_0x19780f(0x12a)]() && (_0x337e92['y'] += _0x337e92[_0x19780f(0x9c)]() * _0x7895e6['Scale'] - 0x1),
      this[_0x19780f(0x13b)]['x'] < 0x0 && (_0x337e92[_0x19780f(0x13b)]['x'] = -Math['abs'](_0x337e92[_0x19780f(0x13b)]['x']));
  }),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x12a)] = function () {
    const _0x20851c = _0x15172f;
    if (!Imported[_0x20851c(0xd2)]) return ![];
    if (this[_0x20851c(0x21d)] && this[_0x20851c(0x21d)][_0x20851c(0x12d)]()) return ![];
    const _0x37e213 = VisuMZ[_0x20851c(0x1c0)]['Settings']['Aggro'];
    if (!_0x37e213[_0x20851c(0x126)]) return ![];
    if (!ConfigManager[_0x20851c(0x14c)]) return ![];
    const _0x2a6e6f = VisuMZ[_0x20851c(0xee)][_0x20851c(0x237)]['Gauge'];
    return (
      _0x37e213[_0x20851c(0x1b3)] === _0x2a6e6f[_0x20851c(0x1b3)] &&
      _0x37e213[_0x20851c(0x106)] === _0x2a6e6f[_0x20851c(0x106)] &&
      _0x37e213['AnchorY'] === _0x2a6e6f[_0x20851c(0x152)] &&
      _0x37e213[_0x20851c(0xa5)] === _0x2a6e6f[_0x20851c(0xa5)] &&
      _0x37e213[_0x20851c(0x124)] === _0x2a6e6f[_0x20851c(0x124)] &&
      !![]
    );
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x1bc)] = Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x216)]),
  (Sprite_Battler[_0x15172f(0x72)][_0x15172f(0x216)] = function () {
    const _0x2a0ff7 = _0x15172f;
    VisuMZ[_0x2a0ff7(0xee)]['Sprite_Battler_update'][_0x2a0ff7(0xe4)](this),
      !this[_0x2a0ff7(0x21d)] && this[_0x2a0ff7(0x19b)] && ((this[_0x2a0ff7(0x19b)]['visible'] = ![]), this[_0x2a0ff7(0xed)] && (this[_0x2a0ff7(0xed)][_0x2a0ff7(0x19b)][_0x2a0ff7(0x95)] = ![]));
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0xf4)] = Sprite_Actor[_0x15172f(0x72)]['createStateSprite']),
  (Sprite_Actor['prototype'][_0x15172f(0x1d6)] = function () {
    const _0x59530d = _0x15172f;
    VisuMZ[_0x59530d(0xee)][_0x59530d(0xf4)]['call'](this), this[_0x59530d(0x1d5)]() && this[_0x59530d(0x249)]();
  }),
  (Sprite_Actor['prototype'][_0x15172f(0x1d5)] = function () {
    const _0x5a7334 = _0x15172f;
    return VisuMZ[_0x5a7334(0xee)][_0x5a7334(0x237)][_0x5a7334(0x214)]['ShowActorGauge'];
  }),
  (Sprite_SvEnemy[_0x15172f(0x72)][_0x15172f(0x1d5)] = function () {
    const _0x416b4e = _0x15172f;
    return VisuMZ[_0x416b4e(0xee)][_0x416b4e(0x237)][_0x416b4e(0x214)][_0x416b4e(0x142)];
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x197)] = Sprite_Enemy[_0x15172f(0x72)][_0x15172f(0x7e)]),
  (Sprite_Enemy[_0x15172f(0x72)][_0x15172f(0x7e)] = function () {
    const _0x345f93 = _0x15172f;
    VisuMZ[_0x345f93(0xee)][_0x345f93(0x237)]['Gauge'][_0x345f93(0x142)] && this[_0x345f93(0x249)](), VisuMZ['BattleSystemATB'][_0x345f93(0x197)][_0x345f93(0xe4)](this);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x11a)] = Sprite_Enemy['prototype'][_0x15172f(0x165)]),
  (Sprite_Enemy[_0x15172f(0x72)][_0x15172f(0x165)] = function (_0x20a341) {
    const _0x37ea7d = _0x15172f;
    VisuMZ[_0x37ea7d(0xee)][_0x37ea7d(0x11a)]['call'](this, _0x20a341), (_0x20a341 === _0x37ea7d(0x1d1) || _0x37ea7d(0x76)) && this[_0x37ea7d(0x1c7)]();
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x71)] = Game_BattlerBase['prototype']['appear']),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x1d1)] = function () {
    const _0xa8555e = _0x15172f;
    VisuMZ[_0xa8555e(0xee)][_0xa8555e(0x71)][_0xa8555e(0xe4)](this),
      this[_0xa8555e(0x12d)]() && BattleManager[_0xa8555e(0x224)]() && this[_0xa8555e(0x1a8)]() && this[_0xa8555e(0x1a8)]()[_0xa8555e(0x1c7)]();
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x75)] = Sprite_Gauge[_0x15172f(0x72)]['gaugeColor1']),
  (Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0x131)] = function () {
    const _0x212c7f = _0x15172f;
    if (this[_0x212c7f(0xf2)] === _0x212c7f(0x13d)) return this[_0x212c7f(0xc7)](0x1);
    return VisuMZ['BattleSystemATB'][_0x212c7f(0x75)][_0x212c7f(0xe4)](this);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x138)] = Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0x86)]),
  (Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0x86)] = function () {
    const _0x5d566d = _0x15172f;
    if (this[_0x5d566d(0xf2)] === _0x5d566d(0x13d)) return this[_0x5d566d(0xc7)](0x2);
    return VisuMZ[_0x5d566d(0xee)]['Sprite_Gauge_gaugeColor2']['call'](this);
  }),
  (Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0xc7)] = function (_0x23271b) {
    const _0x53df93 = _0x15172f;
    if (!this['_battler']) return ColorManager[_0x53df93(0x15b)]('default%1'['format'](_0x23271b));
    if (this['_battler'][_0x53df93(0x147)]()) return ColorManager[_0x53df93(0x15b)](_0x53df93(0xef)[_0x53df93(0xf8)](_0x23271b));
    if (this['_battler'][_0x53df93(0x1b1)]()) return ColorManager['atbColor'](_0x53df93(0x22a)[_0x53df93(0xf8)](_0x23271b));
    if (this['gaugeRate']() >= 0x1) return ColorManager[_0x53df93(0x15b)]('full%1'[_0x53df93(0xf8)](_0x23271b));
    const _0x22b0ff = VisuMZ[_0x53df93(0xee)]['Settings'][_0x53df93(0x214)],
      _0x55569f = this[_0x53df93(0x21d)][_0x53df93(0x1a1)](0x6) * this[_0x53df93(0x21d)][_0x53df93(0x137)](0x6);
    if (_0x55569f <= _0x22b0ff[_0x53df93(0xae)]) return ColorManager[_0x53df93(0x15b)](_0x53df93(0x1fb)[_0x53df93(0xf8)](_0x23271b));
    if (_0x55569f >= _0x22b0ff[_0x53df93(0x1f1)]) return ColorManager['atbColor']('fast%1'[_0x53df93(0xf8)](_0x23271b));
    return ColorManager[_0x53df93(0x15b)](_0x53df93(0x1b7)[_0x53df93(0xf8)](_0x23271b));
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x211)] = Sprite_Gauge['prototype'][_0x15172f(0xec)]),
  (Sprite_Gauge[_0x15172f(0x72)]['currentValue'] = function () {
    const _0x2ddd07 = _0x15172f;
    if (this[_0x2ddd07(0x21d)] && this[_0x2ddd07(0xf2)] === _0x2ddd07(0x13d)) return this[_0x2ddd07(0x127)]();
    return VisuMZ[_0x2ddd07(0xee)]['Sprite_Gauge_currentValue']['call'](this);
  }),
  (Sprite_Gauge[_0x15172f(0x72)]['atbCurrentValue'] = function () {
    const _0xeb5f4f = _0x15172f;
    return this['_battler'][_0xeb5f4f(0x1b1)]() ? Math['max'](this[_0xeb5f4f(0x21d)]['_tpbCastTime'], 0x0) : VisuMZ['BattleSystemATB']['Sprite_Gauge_currentValue']['call'](this);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x198)] = Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0x9f)]),
  (Sprite_Gauge['prototype']['currentMaxValue'] = function () {
    const _0x43a96c = _0x15172f;
    if (this['_battler'] && this['_statusType'] === _0x43a96c(0x13d)) return this['atbCurrentMaxValue']();
    return VisuMZ['BattleSystemATB'][_0x43a96c(0x198)][_0x43a96c(0xe4)](this);
  }),
  (Sprite_Gauge[_0x15172f(0x72)][_0x15172f(0x178)] = function () {
    const _0xd1da75 = _0x15172f;
    return this['_battler']['isAtbCastingState']() ? Math[_0xd1da75(0x145)](this[_0xd1da75(0x21d)][_0xd1da75(0x18d)](), 1e-9) : VisuMZ[_0xd1da75(0xee)][_0xd1da75(0x198)][_0xd1da75(0xe4)](this);
  }),
  (VisuMZ[_0x15172f(0xee)][_0x15172f(0x12b)] = Window_Help[_0x15172f(0x72)][_0x15172f(0x14a)]),
  (Window_Help[_0x15172f(0x72)][_0x15172f(0x14a)] = function (_0x2f9d6a) {
    const _0x227e5b = _0x15172f;
    BattleManager['isATB']() && _0x2f9d6a && _0x2f9d6a[_0x227e5b(0x8a)] && _0x2f9d6a[_0x227e5b(0x8a)][_0x227e5b(0x169)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)
      ? this[_0x227e5b(0x16d)](String(RegExp['$1']))
      : VisuMZ['BattleSystemATB'][_0x227e5b(0x12b)]['call'](this, _0x2f9d6a);
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0x77)] = Window_StatusBase['prototype']['placeGauge']),
  (Window_StatusBase['prototype'][_0x15172f(0xdf)] = function (_0x2908b4, _0x3ed682, _0x298205, _0x277e19) {
    const _0x29b258 = _0x15172f;
    if (!this[_0x29b258(0xf3)](_0x3ed682)) return;
    VisuMZ[_0x29b258(0xee)]['Window_StatusBase_placeGauge'][_0x29b258(0xe4)](this, _0x2908b4, _0x3ed682, _0x298205, _0x277e19);
  }),
  (Window_StatusBase['prototype'][_0x15172f(0xf3)] = function (_0x16d5ad) {
    const _0x3ad09e = _0x15172f;
    if (_0x16d5ad !== _0x3ad09e(0x13d)) return !![];
    if (![_0x3ad09e(0x114), _0x3ad09e(0x85)][_0x3ad09e(0x1b5)](this[_0x3ad09e(0x9a)]['name'])) return ![];
    if (!BattleManager[_0x3ad09e(0x224)]()) return ![];
    if (!ConfigManager[_0x3ad09e(0xea)]) return ![];
    return VisuMZ[_0x3ad09e(0xee)][_0x3ad09e(0x237)][_0x3ad09e(0x214)][_0x3ad09e(0x84)];
  }),
  (VisuMZ['BattleSystemATB'][_0x15172f(0xc3)] = Window_Options[_0x15172f(0x72)][_0x15172f(0x107)]),
  (Window_Options[_0x15172f(0x72)]['addGeneralOptions'] = function () {
    const _0x49631a = _0x15172f;
    VisuMZ[_0x49631a(0xee)][_0x49631a(0xc3)][_0x49631a(0xe4)](this), this[_0x49631a(0x195)]();
  }),
  (Window_Options[_0x15172f(0x72)][_0x15172f(0x195)] = function () {
    const _0x6bc5a1 = _0x15172f;
    if (!BattleManager[_0x6bc5a1(0x224)]()) return;
    VisuMZ[_0x6bc5a1(0xee)][_0x6bc5a1(0x237)][_0x6bc5a1(0x1d7)][_0x6bc5a1(0xc9)] && this[_0x6bc5a1(0x207)]();
  }),
  (Window_Options[_0x15172f(0x72)][_0x15172f(0x207)] = function () {
    const _0x5ac606 = _0x15172f,
      _0xb95b65 = TextManager['visualAtbGauge'],
      _0x2dc979 = _0x5ac606(0xea);
    this['addCommand'](_0xb95b65, _0x2dc979);
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x1ce)] = function () {
    const _0x3046b3 = _0x15172f;
    delete this['_fieldAtbGaugeGraphicType'], delete this[_0x3046b3(0x17e)], delete this[_0x3046b3(0x23b)], delete this[_0x3046b3(0x238)];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x19a)] = function () {
    const _0x16ad22 = _0x15172f;
    return this[_0x16ad22(0x1a6)] === undefined && (this[_0x16ad22(0x1a6)] = this['createFieldAtbGraphicType']()), this[_0x16ad22(0x1a6)];
  }),
  (Game_BattlerBase['prototype'][_0x15172f(0x24e)] = function () {
    const _0x1a35e3 = _0x15172f;
    return Sprite_FieldGaugeATB[_0x1a35e3(0x237)]['EnemyBattlerType'];
  }),
  (Game_BattlerBase['prototype'][_0x15172f(0x225)] = function () {
    const _0x1dffaf = _0x15172f;
    return this['_fieldAtbGaugeFaceName'] === undefined && (this[_0x1dffaf(0x17e)] = this[_0x1dffaf(0x14e)]()), this[_0x1dffaf(0x17e)];
  }),
  (Game_BattlerBase['prototype'][_0x15172f(0x14e)] = function () {
    const _0x3df623 = _0x15172f;
    return Sprite_FieldGaugeATB['Settings'][_0x3df623(0x236)];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0xa2)] = function () {
    const _0x3fc70e = _0x15172f;
    return this[_0x3fc70e(0x23b)] === undefined && (this['_fieldAtbGaugeFaceIndex'] = this[_0x3fc70e(0x19e)]()), this['_fieldAtbGaugeFaceIndex'];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x19e)] = function () {
    const _0x170d9b = _0x15172f;
    return Sprite_FieldGaugeATB[_0x170d9b(0x237)][_0x170d9b(0x130)];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x13c)] = function () {
    const _0x281ebc = _0x15172f;
    return this[_0x281ebc(0x238)] === undefined && (this[_0x281ebc(0x238)] = this[_0x281ebc(0xbb)]()), this['_fieldAtbGaugeIconIndex'];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0xbb)] = function () {
    const _0x46652c = _0x15172f;
    return Sprite_FieldGaugeATB[_0x46652c(0x237)][_0x46652c(0x140)];
  }),
  (Game_BattlerBase[_0x15172f(0x72)][_0x15172f(0x81)] = function (_0x1fc99e) {
    const _0x583bae = _0x15172f;
    this[_0x583bae(0x238)] = _0x1fc99e;
  }),
  (Game_Actor['prototype'][_0x15172f(0x24e)] = function () {
    const _0x13cb65 = _0x15172f,
      _0x5d8fcd = this[_0x13cb65(0x1ea)]()['note'];
    if (_0x5d8fcd[_0x13cb65(0x169)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return _0x13cb65(0x180);
    else {
      if (_0x5d8fcd[_0x13cb65(0x169)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)) return _0x13cb65(0x1d9);
    }
    return Sprite_FieldGaugeATB[_0x13cb65(0x237)]['ActorBattlerType'];
  }),
  (Game_Actor[_0x15172f(0x72)]['createFieldAtbGraphicFaceName'] = function () {
    const _0x694ca8 = _0x15172f,
      _0x34052c = this[_0x694ca8(0x1ea)]()[_0x694ca8(0x8a)];
    if (_0x34052c['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return String(RegExp['$1']);
    return this['faceName']();
  }),
  (Game_Actor[_0x15172f(0x72)][_0x15172f(0x19e)] = function () {
    const _0x2b4c95 = _0x15172f,
      _0x5df88b = this['actor']()[_0x2b4c95(0x8a)];
    if (_0x5df88b[_0x2b4c95(0x169)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return Number(RegExp['$2']);
    return this['faceIndex']();
  }),
  (Game_Actor[_0x15172f(0x72)]['createFieldAtbGraphicIconIndex'] = function () {
    const _0x5a357b = _0x15172f,
      _0x2cc085 = this['actor']()['note'];
    if (_0x2cc085[_0x5a357b(0x169)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)) return Number(RegExp['$1']);
    return Sprite_FieldGaugeATB[_0x5a357b(0x237)][_0x5a357b(0x161)];
  }),
  (Game_Enemy[_0x15172f(0x72)][_0x15172f(0x24e)] = function () {
    const _0x57f2ce = _0x15172f,
      _0x4be265 = this['enemy']()['note'];
    if (_0x4be265[_0x57f2ce(0x169)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return _0x57f2ce(0x180);
    else {
      if (_0x4be265[_0x57f2ce(0x169)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)) return 'icon';
    }
    return Sprite_FieldGaugeATB[_0x57f2ce(0x237)][_0x57f2ce(0xa7)];
  }),
  (Game_Enemy[_0x15172f(0x72)][_0x15172f(0x14e)] = function () {
    const _0x40df0e = _0x15172f,
      _0x28dca9 = this[_0x40df0e(0x20f)]()[_0x40df0e(0x8a)];
    if (_0x28dca9[_0x40df0e(0x169)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return String(RegExp['$1']);
    return Sprite_FieldGaugeATB['Settings'][_0x40df0e(0x236)];
  }),
  (Game_Enemy[_0x15172f(0x72)]['createFieldAtbGraphicFaceIndex'] = function () {
    const _0x4a703c = _0x15172f,
      _0x510ae9 = this[_0x4a703c(0x20f)]()[_0x4a703c(0x8a)];
    if (_0x510ae9[_0x4a703c(0x169)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)) return Number(RegExp['$2']);
    return Sprite_FieldGaugeATB[_0x4a703c(0x237)][_0x4a703c(0x130)];
  }),
  (Game_Enemy['prototype'][_0x15172f(0xbb)] = function () {
    const _0x38cc68 = _0x15172f,
      _0x3a9cbf = this[_0x38cc68(0x20f)]()['note'];
    if (_0x3a9cbf[_0x38cc68(0x169)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i)) return Number(RegExp['$1']);
    return Sprite_FieldGaugeATB['Settings']['EnemyBattlerIcon'];
  }),
  (VisuMZ[_0x15172f(0xee)]['Scene_Battle_createAllWindows'] = Scene_Battle[_0x15172f(0x72)][_0x15172f(0x80)]),
  (Scene_Battle[_0x15172f(0x72)][_0x15172f(0x80)] = function () {
    const _0x538680 = _0x15172f;
    this[_0x538680(0x89)](), VisuMZ[_0x538680(0xee)]['Scene_Battle_createAllWindows'][_0x538680(0xe4)](this), this[_0x538680(0x144)]();
  }),
  (Scene_Battle[_0x15172f(0x72)][_0x15172f(0x89)] = function () {
    const _0x2ef069 = _0x15172f;
    if (!BattleManager[_0x2ef069(0x224)]()) return;
    if (!Sprite_FieldGaugeATB['Settings'][_0x2ef069(0xe3)]) return;
    if (!ConfigManager[_0x2ef069(0xea)]) return;
    this[_0x2ef069(0x1a2)] = new Window_Base(new Rectangle(0x0, 0x0, 0x0, 0x0));
    const _0xdf9b8 = this[_0x2ef069(0x92)](this[_0x2ef069(0x7a)]);
    this[_0x2ef069(0x208)](this['_fieldGaugeATB_Container'], _0xdf9b8);
  }),
  (Scene_Battle['prototype'][_0x15172f(0x144)] = function () {
    const _0x1a0e94 = _0x15172f;
    if (!BattleManager[_0x1a0e94(0x224)]()) return;
    if (!Sprite_FieldGaugeATB[_0x1a0e94(0x237)]['UseFieldGauge']) return;
    if (!ConfigManager[_0x1a0e94(0xea)]) return;
    (this[_0x1a0e94(0x108)] = new Sprite_FieldGaugeATB()), this[_0x1a0e94(0x1a2)]['addChild'](this['_fieldGaugeATB']);
  });
function Sprite_FieldGaugeATB() {
  const _0xefe920 = _0x15172f;
  this[_0xefe920(0x120)](...arguments);
}
(Sprite_FieldGaugeATB[_0x15172f(0x72)] = Object[_0x15172f(0x228)](Sprite[_0x15172f(0x72)])),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)]['constructor'] = Sprite_FieldGaugeATB),
  (Sprite_FieldGaugeATB[_0x15172f(0x237)] = JsonEx[_0x15172f(0x239)](VisuMZ[_0x15172f(0xee)]['Settings'][_0x15172f(0x222)])),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x120)] = function () {
    const _0x4b587a = _0x15172f;
    Sprite[_0x4b587a(0x72)]['initialize'][_0x4b587a(0xe4)](this), this[_0x4b587a(0x129)](), this[_0x4b587a(0xe7)](), this[_0x4b587a(0xb6)]();
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)]['initMembers'] = function () {
    const _0x5435d8 = _0x15172f;
    (this[_0x5435d8(0x1e2)]['x'] = 0.5), (this[_0x5435d8(0x1e2)]['y'] = 0.5);
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0xd6)] = function () {
    const _0x2758ad = _0x15172f;
    if (this[_0x2758ad(0x20b)] !== undefined) return this['_horz'];
    const _0x144412 = Sprite_FieldGaugeATB[_0x2758ad(0x237)]['DisplayPosition'];
    return (this[_0x2758ad(0x20b)] = [_0x2758ad(0x21b), 'bottom']['includes'](_0x144412)), this['_horz'];
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0xe7)] = function () {
    const _0x463a14 = _0x15172f,
      _0x49af4a = Sprite_FieldGaugeATB[_0x463a14(0x237)][_0x463a14(0x91)]['toLowerCase']()[_0x463a14(0x19d)](),
      _0x44ff47 = Window_Base[_0x463a14(0x72)][_0x463a14(0xd0)](),
      _0xee540f = SceneManager[_0x463a14(0xbf)]['_statusWindow'][_0x463a14(0x218)] + Math[_0x463a14(0x135)](_0x44ff47 * 0.5);
    (this[_0x463a14(0xc4)] = 0x0), (this[_0x463a14(0xbc)] = 0x0);
    switch (_0x49af4a) {
      case _0x463a14(0x21b):
        (this[_0x463a14(0xc4)] = Math['round'](Graphics[_0x463a14(0x221)] * 0.5)), (this[_0x463a14(0xbc)] = 0x60);
        break;
      case _0x463a14(0xa6):
        (this[_0x463a14(0xc4)] = Math[_0x463a14(0x135)](Graphics[_0x463a14(0x221)] * 0.5)), (this[_0x463a14(0xbc)] = Graphics[_0x463a14(0x18e)] - _0xee540f);
        break;
      case _0x463a14(0xfe):
        (this[_0x463a14(0xc4)] = 0x50), (this[_0x463a14(0xbc)] = Math[_0x463a14(0x135)]((Graphics['boxHeight'] - _0xee540f) / 0x2));
        break;
      case 'right':
        (this[_0x463a14(0xc4)] = Graphics[_0x463a14(0x221)] - 0x50), (this[_0x463a14(0xbc)] = Math[_0x463a14(0x135)]((Graphics[_0x463a14(0x18e)] - _0xee540f) / 0x2));
        break;
    }
    (this[_0x463a14(0xc4)] += Sprite_FieldGaugeATB[_0x463a14(0x237)][_0x463a14(0x20d)] || 0x0),
      (this[_0x463a14(0xbc)] += Sprite_FieldGaugeATB[_0x463a14(0x237)][_0x463a14(0x163)] || 0x0),
      (this['x'] = this[_0x463a14(0xc4)]),
      (this['y'] = this[_0x463a14(0xbc)]);
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0xb6)] = function () {
    const _0x4c1232 = _0x15172f;
    this[_0x4c1232(0x1c4)](), this[_0x4c1232(0x203)](), this[_0x4c1232(0x156)]();
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x1c4)] = function () {
    const _0x19b085 = _0x15172f;
    (this[_0x19b085(0xe0)] = new Sprite()), (this[_0x19b085(0xe0)]['anchor']['x'] = 0.5), (this[_0x19b085(0xe0)][_0x19b085(0x1e2)]['y'] = 0.5), this[_0x19b085(0x167)](this[_0x19b085(0xe0)]);
    const _0x495257 = Sprite_FieldGaugeATB['Settings'][_0x19b085(0x241)];
    if (_0x495257) this[_0x19b085(0xe0)][_0x19b085(0x196)] = ImageManager[_0x19b085(0x8d)](_0x495257);
  }),
  (Sprite_FieldGaugeATB['prototype'][_0x15172f(0x203)] = function () {
    const _0x2ea64c = _0x15172f;
    (this[_0x2ea64c(0x1bf)] = new Sprite()), this[_0x2ea64c(0x167)](this[_0x2ea64c(0x1bf)]), this[_0x2ea64c(0x18b)]();
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x18b)] = function () {
    const _0x5a5a14 = _0x15172f,
      _0x4d8188 = Sprite_FieldGaugeATB[_0x5a5a14(0x237)],
      _0x50a527 = this[_0x5a5a14(0xd6)](),
      _0x1e4274 = _0x50a527 ? _0x4d8188[_0x5a5a14(0xe2)] : _0x4d8188[_0x5a5a14(0xdb)],
      _0x4cdab0 = _0x50a527 ? _0x4d8188[_0x5a5a14(0xdb)] : _0x4d8188[_0x5a5a14(0x14b)];
    (this[_0x5a5a14(0x1bf)][_0x5a5a14(0x196)] = new Bitmap(_0x1e4274, _0x4cdab0)),
      this[_0x5a5a14(0x16b)](),
      (this[_0x5a5a14(0x1bf)]['x'] = Math[_0x5a5a14(0x191)](_0x1e4274 / -0x2)),
      (this[_0x5a5a14(0x1bf)]['y'] = Math[_0x5a5a14(0x191)](_0x4cdab0 / -0x2));
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x16b)] = function () {
    const _0x5b3e27 = _0x15172f;
    if (!Sprite_FieldGaugeATB[_0x5b3e27(0x237)][_0x5b3e27(0x243)]) return;
    const _0x222ff7 = Sprite_FieldGaugeATB[_0x5b3e27(0x237)],
      _0x498832 = this[_0x5b3e27(0x1bf)][_0x5b3e27(0x196)],
      _0x4cb2e6 = _0x498832[_0x5b3e27(0x1f7)],
      _0x36ba51 = _0x498832['height'],
      _0x3c80db = ColorManager[_0x5b3e27(0x10a)](),
      _0xb80bff = ColorManager[_0x5b3e27(0x1f6)](),
      _0x3d0217 = ColorManager[_0x5b3e27(0x188)](),
      _0x5671fe = ColorManager['atbColor']('cast1'),
      _0x9b984b = ColorManager[_0x5b3e27(0x15b)](_0x5b3e27(0x1b4)),
      _0x1edea7 = this[_0x5b3e27(0xd6)](),
      _0x1d6e29 = _0x222ff7[_0x5b3e27(0x240)],
      _0x2880e7 = _0x222ff7[_0x5b3e27(0x1d0)][_0x5b3e27(0x1f5)](0x0, 0x1),
      _0x22bedf = Math[_0x5b3e27(0x191)](((_0x1edea7 ? _0x4cb2e6 : _0x36ba51) - 0x2) * _0x2880e7);
    _0x498832[_0x5b3e27(0x109)](0x0, 0x0, _0x4cb2e6, _0x36ba51, _0x3c80db);
    let _0x4af94d = 0x0,
      _0x36453d = 0x0,
      _0x32511e = 0x0,
      _0x273b30 = 0x0;
    if (_0x1edea7 && _0x1d6e29)
      (_0x4af94d = _0x22bedf - 0x1),
        (_0x32511e = _0x4cb2e6 - 0x3 - _0x4af94d),
        _0x498832[_0x5b3e27(0x121)](0x1, 0x1, _0x4af94d, _0x36ba51 - 0x2, _0xb80bff, _0x3d0217, ![]),
        _0x498832[_0x5b3e27(0x121)](0x2 + _0x4af94d, 0x1, _0x32511e, _0x36ba51 - 0x2, _0x5671fe, _0x9b984b, ![]);
    else {
      if (_0x1edea7 && !_0x1d6e29)
        (_0x4af94d = _0x22bedf - 0x1),
          (_0x32511e = _0x4cb2e6 - 0x3 - _0x4af94d),
          _0x498832['gradientFillRect'](0x2 + _0x32511e, 0x1, _0x4af94d, _0x36ba51 - 0x2, _0xb80bff, _0x3d0217, ![]),
          _0x498832[_0x5b3e27(0x121)](0x1, 0x1, _0x32511e, _0x36ba51 - 0x2, _0x5671fe, _0x9b984b, ![]);
      else {
        if (!_0x1edea7 && _0x1d6e29)
          (_0x36453d = _0x22bedf - 0x1),
            (_0x273b30 = _0x36ba51 - 0x3 - _0x36453d),
            _0x498832['gradientFillRect'](0x1, 0x1, _0x4cb2e6 - 0x2, _0x36453d, _0xb80bff, _0x3d0217, !![]),
            _0x498832[_0x5b3e27(0x121)](0x1, 0x2 + _0x36453d, _0x4cb2e6 - 0x2, _0x273b30, _0x5671fe, _0x9b984b, !![]);
        else
          !_0x1edea7 &&
            !_0x1d6e29 &&
            ((_0x36453d = _0x22bedf - 0x1),
            (_0x273b30 = _0x36ba51 - 0x3 - _0x36453d),
            _0x498832['gradientFillRect'](0x1, 0x2 + _0x273b30, _0x4cb2e6 - 0x2, _0x36453d, _0xb80bff, _0x3d0217, !![]),
            _0x498832['gradientFillRect'](0x1, 0x1, _0x4cb2e6 - 0x2, _0x273b30, _0x5671fe, _0x9b984b, !![]));
      }
    }
  }),
  (Sprite_FieldGaugeATB['prototype'][_0x15172f(0x156)] = function () {
    const _0x1c846c = _0x15172f;
    this['_battlerContainer'] && this[_0x1c846c(0x1bf)]['removeChild'](this[_0x1c846c(0x176)]),
      (this[_0x1c846c(0x176)] = new Sprite()),
      this['_gaugeSprite'][_0x1c846c(0x167)](this[_0x1c846c(0x176)]),
      this[_0x1c846c(0x1c1)]();
  }),
  (Sprite_FieldGaugeATB['prototype'][_0x15172f(0x1c1)] = function () {
    const _0x3f0b1e = _0x15172f;
    this[_0x3f0b1e(0xc0)](), this[_0x3f0b1e(0x247)]();
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0xc0)] = function () {
    const _0x4b1b69 = _0x15172f,
      _0x50d94d = $gameTroop[_0x4b1b69(0x1c3)](),
      _0x499b38 = _0x50d94d[_0x4b1b69(0x18f)];
    for (let _0x5b66bd = 0x0; _0x5b66bd < _0x499b38; _0x5b66bd++) {
      this[_0x4b1b69(0x223)](_0x5b66bd, $gameTroop);
    }
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x247)] = function () {
    const _0x4d4f98 = _0x15172f,
      _0x3c77f9 = $gameParty[_0x4d4f98(0x1ec)]();
    for (let _0x348f78 = 0x0; _0x348f78 < _0x3c77f9; _0x348f78++) {
      this[_0x4d4f98(0x223)](_0x348f78, $gameParty);
    }
  }),
  (Sprite_FieldGaugeATB['prototype']['createBattlerSprite'] = function (_0x4c1bef, _0x2b03b5) {
    const _0x3aa92a = _0x15172f,
      _0x5e4708 = new Sprite_FieldMarkerATB(_0x4c1bef, _0x2b03b5, this[_0x3aa92a(0x1bf)]);
    this[_0x3aa92a(0x176)][_0x3aa92a(0x167)](_0x5e4708);
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x216)] = function () {
    const _0x12af0f = _0x15172f;
    Sprite[_0x12af0f(0x72)][_0x12af0f(0x216)]['call'](this), this[_0x12af0f(0xf7)](), this['updateBattleContainerOrder'](), this[_0x12af0f(0xdc)]();
  }),
  (Sprite_FieldGaugeATB['prototype'][_0x15172f(0xf7)] = function () {
    const _0x37c261 = _0x15172f,
      _0x16e062 = Sprite_FieldGaugeATB['Settings'];
    if (_0x16e062[_0x37c261(0x91)] !== _0x37c261(0x21b)) return;
    if (!_0x16e062[_0x37c261(0x104)]) return;
    const _0x311c8b = SceneManager[_0x37c261(0xbf)]['_helpWindow'];
    if (!_0x311c8b) return;
    _0x311c8b[_0x37c261(0x95)]
      ? ((this['x'] = this[_0x37c261(0xc4)] + (_0x16e062['RepositionTopHelpX'] || 0x0)), (this['y'] = this['_homeY'] + (_0x16e062[_0x37c261(0x1e4)] || 0x0)))
      : ((this['x'] = this[_0x37c261(0xc4)]), (this['y'] = this[_0x37c261(0xbc)]));
    const _0x595741 = SceneManager[_0x37c261(0xbf)][_0x37c261(0x7a)];
    (this['x'] += _0x595741['x']), (this['y'] += _0x595741['y']);
  }),
  (Sprite_FieldGaugeATB['prototype'][_0x15172f(0x1e0)] = function () {
    const _0x560a43 = _0x15172f;
    if (!this[_0x560a43(0x176)]) return;
    const _0xa5244b = this['_battlerContainer'][_0x560a43(0xc8)];
    if (!_0xa5244b) return;
    _0xa5244b[_0x560a43(0x10c)](this[_0x560a43(0x244)]['bind'](this));
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)][_0x15172f(0x244)] = function (_0x12562b, _0xecd9f9) {
    const _0x28ec7c = _0x15172f,
      _0x1f8ef6 = this[_0x28ec7c(0xd6)](),
      _0xc57071 = Sprite_FieldGaugeATB['Settings'][_0x28ec7c(0x240)];
    if (_0x1f8ef6 && _0xc57071) return _0x12562b['x'] - _0xecd9f9['x'];
    else {
      if (_0x1f8ef6 && !_0xc57071) return _0xecd9f9['x'] - _0x12562b['x'];
      else {
        if (!_0x1f8ef6 && _0xc57071) return _0x12562b['y'] - _0xecd9f9['y'];
        else {
          if (!_0x1f8ef6 && !_0xc57071) return _0xecd9f9['y'] - _0x12562b['y'];
        }
      }
    }
  }),
  (Sprite_FieldGaugeATB[_0x15172f(0x72)]['updateVisibility'] = function () {
    const _0x5d3620 = _0x15172f;
    BattleManager[_0x5d3620(0x133)] ? (this[_0x5d3620(0x95)] = ![]) : (this[_0x5d3620(0x95)] = $gameSystem[_0x5d3620(0x15a)]());
  });
function _0x4961(_0x25f439, _0x515e88) {
  const _0x9ea2b5 = _0x9ea2();
  return (
    (_0x4961 = function (_0x49614e, _0x19beda) {
      _0x49614e = _0x49614e - 0x71;
      let _0x2e52b6 = _0x9ea2b5[_0x49614e];
      return _0x2e52b6;
    }),
    _0x4961(_0x25f439, _0x515e88)
  );
}
function Sprite_FieldMarkerATB() {
  const _0x1370e3 = _0x15172f;
  this[_0x1370e3(0x120)](...arguments);
}
(Sprite_FieldMarkerATB[_0x15172f(0x72)] = Object[_0x15172f(0x228)](Sprite_Clickable['prototype'])),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['constructor'] = Sprite_FieldMarkerATB),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x120)] = function (_0x16d972, _0x938556, _0x1710bd) {
    const _0x35d9c7 = _0x15172f;
    (this[_0x35d9c7(0x16f)] = _0x16d972),
      (this['_unit'] = _0x938556),
      (this[_0x35d9c7(0x1bf)] = _0x1710bd),
      Sprite_Clickable[_0x35d9c7(0x72)]['initialize'][_0x35d9c7(0xe4)](this),
      this[_0x35d9c7(0x129)](),
      this[_0x35d9c7(0xb6)](),
      (this[_0x35d9c7(0xca)] = this[_0x35d9c7(0x15e)]());
  }),
  (Sprite_FieldMarkerATB['prototype'][_0x15172f(0x129)] = function () {
    const _0x5ce5e4 = _0x15172f;
    (this[_0x5ce5e4(0x1e2)]['x'] = 0.5), (this[_0x5ce5e4(0x1e2)]['y'] = 0.5);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0xb6)] = function () {
    const _0x59ba77 = _0x15172f;
    this['createBackgroundSprite'](), this[_0x59ba77(0xa8)](), this[_0x59ba77(0x82)](), this[_0x59ba77(0x136)](), this['createArrowSprite'](), this['updatePositionOnGauge'](!![]);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x1b2)] = function () {
    const _0x2331c9 = _0x15172f;
    if (!Sprite_FieldGaugeATB['Settings'][_0x2331c9(0x229)]) return;
    const _0x1a1b69 = Sprite_FieldGaugeATB[_0x2331c9(0x237)],
      _0x37aae6 = this[_0x2331c9(0x1b9)] === $gameParty ? _0x2331c9(0x1ac) : _0x2331c9(0xe6),
      _0x1f3223 = _0x2331c9(0x1ef)['format'](_0x37aae6),
      _0x5ebcc6 = new Sprite();
    (_0x5ebcc6['anchor']['x'] = this[_0x2331c9(0x1e2)]['x']), (_0x5ebcc6[_0x2331c9(0x1e2)]['y'] = this[_0x2331c9(0x1e2)]['y']);
    if (_0x1a1b69[_0x1f3223]) _0x5ebcc6[_0x2331c9(0x196)] = ImageManager['loadSystem'](_0x1a1b69[_0x1f3223]);
    else {
      const _0x2efc1 = _0x1a1b69[_0x2331c9(0xd9)];
      _0x5ebcc6[_0x2331c9(0x196)] = new Bitmap(_0x2efc1, _0x2efc1);
      const _0x3c3807 = ColorManager[_0x2331c9(0xde)](_0x1a1b69['%1BgColor1'[_0x2331c9(0xf8)](_0x37aae6)]),
        _0x3c57f9 = ColorManager[_0x2331c9(0xde)](_0x1a1b69[_0x2331c9(0xbd)[_0x2331c9(0xf8)](_0x37aae6)]);
      _0x5ebcc6[_0x2331c9(0x196)]['gradientFillRect'](0x0, 0x0, _0x2efc1, _0x2efc1, _0x3c3807, _0x3c57f9, !![]);
    }
    (this[_0x2331c9(0xcb)] = _0x5ebcc6),
      this[_0x2331c9(0x167)](this[_0x2331c9(0xcb)]),
      (this[_0x2331c9(0x1f7)] = this['_backgroundSprite'][_0x2331c9(0x1f7)]),
      (this['height'] = this['_backgroundSprite'][_0x2331c9(0x218)]);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['createGraphicSprite'] = function () {
    const _0x42ca56 = _0x15172f,
      _0x2922eb = new Sprite();
    (_0x2922eb[_0x42ca56(0x1e2)]['x'] = this[_0x42ca56(0x1e2)]['x']),
      (_0x2922eb[_0x42ca56(0x1e2)]['y'] = this[_0x42ca56(0x1e2)]['y']),
      (this[_0x42ca56(0x116)] = _0x2922eb),
      this[_0x42ca56(0x167)](this[_0x42ca56(0x116)]),
      this['processUpdateGraphic']();
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x82)] = function () {
    const _0x504bca = _0x15172f;
    if (!Sprite_FieldGaugeATB[_0x504bca(0x237)][_0x504bca(0x213)]) return;
    const _0x5d0c2f = Sprite_FieldGaugeATB[_0x504bca(0x237)],
      _0x6d16dc = this[_0x504bca(0x1b9)] === $gameParty ? _0x504bca(0x1ac) : 'Enemy',
      _0x4da8c = _0x504bca(0x1dc)[_0x504bca(0xf8)](_0x6d16dc),
      _0x1dcb62 = new Sprite();
    (_0x1dcb62[_0x504bca(0x1e2)]['x'] = this[_0x504bca(0x1e2)]['x']), (_0x1dcb62[_0x504bca(0x1e2)]['y'] = this[_0x504bca(0x1e2)]['y']);
    if (_0x5d0c2f[_0x4da8c]) _0x1dcb62[_0x504bca(0x196)] = ImageManager[_0x504bca(0x8d)](_0x5d0c2f[_0x4da8c]);
    else {
      let _0x560246 = _0x5d0c2f[_0x504bca(0xd9)],
        _0x58e058 = _0x5d0c2f['BorderThickness'];
      _0x1dcb62['bitmap'] = new Bitmap(_0x560246, _0x560246);
      const _0x4cbf08 = _0x504bca(0x17d),
        _0x4d44e4 = ColorManager['getColor'](_0x5d0c2f['%1BorderColor'[_0x504bca(0xf8)](_0x6d16dc)]);
      _0x1dcb62['bitmap'][_0x504bca(0x109)](0x0, 0x0, _0x560246, _0x560246, _0x4cbf08),
        (_0x560246 -= 0x2),
        _0x1dcb62['bitmap'][_0x504bca(0x109)](0x1, 0x1, _0x560246, _0x560246, _0x4d44e4),
        (_0x560246 -= _0x58e058 * 0x2),
        _0x1dcb62[_0x504bca(0x196)][_0x504bca(0x109)](0x1 + _0x58e058, 0x1 + _0x58e058, _0x560246, _0x560246, _0x4cbf08),
        (_0x560246 -= 0x2),
        (_0x58e058 += 0x1),
        _0x1dcb62[_0x504bca(0x196)]['clearRect'](0x1 + _0x58e058, 0x1 + _0x58e058, _0x560246, _0x560246);
    }
    (this[_0x504bca(0xcb)] = _0x1dcb62), this['addChild'](this[_0x504bca(0xcb)]);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x136)] = function () {
    const _0xd9d02f = _0x15172f,
      _0xc22fc8 = Sprite_FieldGaugeATB[_0xd9d02f(0x237)];
    if (!_0xc22fc8[_0xd9d02f(0x1fe)]) return;
    if (this[_0xd9d02f(0x1b9)] === $gameParty) return;
    const _0x91127e = _0xc22fc8[_0xd9d02f(0xd9)],
      _0x57e02d = new Sprite();
    (_0x57e02d[_0xd9d02f(0x1e2)]['x'] = this[_0xd9d02f(0x1e2)]['x']),
      (_0x57e02d[_0xd9d02f(0x1e2)]['y'] = this[_0xd9d02f(0x1e2)]['y']),
      (_0x57e02d[_0xd9d02f(0x196)] = new Bitmap(_0x91127e, _0x91127e)),
      (this[_0xd9d02f(0x10b)] = _0x57e02d),
      this['addChild'](this['_letterSprite']);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['createArrowSprite'] = function () {
    const _0x1febd7 = _0x15172f,
      _0x2d9b63 = Sprite_FieldGaugeATB['Settings'];
    if (!_0x2d9b63[_0x1febd7(0x1ae)]) return;
    const _0x8c43d9 = new Sprite();
    (_0x8c43d9[_0x1febd7(0x1e2)]['x'] = this[_0x1febd7(0x1e2)]['x']),
      (_0x8c43d9['anchor']['y'] = this[_0x1febd7(0x1e2)]['y']),
      this[_0x1febd7(0x105)](_0x8c43d9),
      (this[_0x1febd7(0xfb)] = _0x8c43d9),
      this[_0x1febd7(0x167)](this[_0x1febd7(0xfb)]);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x105)] = function (_0xa07388) {
    const _0x53f492 = _0x15172f,
      _0xf6ff9c = Sprite_FieldGaugeATB[_0x53f492(0x237)],
      _0xf1ab3 = _0xf6ff9c[_0x53f492(0xd9)],
      _0x4db2a5 = Math['round'](_0xf1ab3 / 0x2),
      _0x490a52 = this[_0x53f492(0xd6)](),
      _0x201e8d = this[_0x53f492(0x1b9)] === $gameParty ? _0x53f492(0x1ac) : _0x53f492(0xe6),
      _0x546100 = _0xf6ff9c[_0x53f492(0x245)[_0x53f492(0xf8)](_0x201e8d)];
    _0xa07388[_0x53f492(0x196)] = ImageManager[_0x53f492(0x8d)](_0xf6ff9c[_0x53f492(0x160)]);
    const _0x3755fb = 0x18,
      _0x24ae32 = _0x3755fb / 0x2,
      _0x393221 = 0x60 + _0x3755fb,
      _0x3a3b11 = 0x0 + _0x3755fb;
    if (_0x490a52 && _0x546100)
      _0xa07388['setFrame'](_0x393221 + _0x24ae32, _0x3a3b11 + _0x24ae32 + _0x3755fb, _0x3755fb, _0x24ae32), (_0xa07388['y'] += _0x4db2a5), (_0xa07388[_0x53f492(0x1e2)]['y'] = 0x0);
    else {
      if (_0x490a52 && !_0x546100) _0xa07388[_0x53f492(0x9e)](_0x393221 + _0x24ae32, _0x3a3b11, _0x3755fb, _0x24ae32), (_0xa07388['y'] -= _0x4db2a5), (_0xa07388[_0x53f492(0x1e2)]['y'] = 0x1);
      else {
        if (!_0x490a52 && _0x546100)
          _0xa07388[_0x53f492(0x9e)](_0x393221, _0x3a3b11 + _0x24ae32, _0x24ae32, _0x3755fb), (_0xa07388['x'] -= Math['ceil'](_0x4db2a5 * 1.75)), (_0xa07388[_0x53f492(0x1e2)]['x'] = 0x0);
        else
          !_0x490a52 &&
            !_0x546100 &&
            (_0xa07388[_0x53f492(0x9e)](_0x393221 + _0x3755fb + _0x24ae32, _0x3a3b11 + _0x24ae32, _0x24ae32, _0x3755fb),
            (_0xa07388['x'] += Math['ceil'](_0x4db2a5 * 1.75)),
            (_0xa07388[_0x53f492(0x1e2)]['x'] = 0x1));
      }
    }
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x1a8)] = function () {
    const _0x511fb8 = _0x15172f;
    return this['_unit'] === $gameParty ? $gameParty[_0x511fb8(0xd1)]()[this[_0x511fb8(0x16f)]] : $gameTroop['members']()[this[_0x511fb8(0x16f)]];
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x216)] = function () {
    const _0x1e2426 = _0x15172f;
    Sprite_Clickable[_0x1e2426(0x72)][_0x1e2426(0x216)][_0x1e2426(0xe4)](this),
      this[_0x1e2426(0x1f2)](),
      this[_0x1e2426(0x73)](),
      this[_0x1e2426(0xda)](),
      this[_0x1e2426(0x235)](),
      this['updateGraphicHue'](),
      this[_0x1e2426(0x22b)](),
      this['updateSelectionEffect']();
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x1f2)] = function () {
    const _0x305383 = _0x15172f,
      _0x17680e = this[_0x305383(0x15e)](),
      _0x2f418f = Sprite_FieldGaugeATB['Settings'][_0x305383(0x219)];
    if (this['opacity'] > _0x17680e) this[_0x305383(0xca)] = Math['max'](_0x17680e, this['opacity'] - _0x2f418f);
    else this[_0x305383(0xca)] < _0x17680e && (this[_0x305383(0xca)] = Math[_0x305383(0x1ed)](_0x17680e, this[_0x305383(0xca)] + _0x2f418f));
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x15e)] = function () {
    const _0x2164bc = _0x15172f,
      _0xbfb2da = this[_0x2164bc(0x1a8)]();
    if (!_0xbfb2da) return 0x0;
    if (_0xbfb2da[_0x2164bc(0x212)]()) return 0x0;
    if (_0xbfb2da[_0x2164bc(0xe5)]()) return 0x0;
    return 0xff;
  }),
  (Sprite_FieldMarkerATB['prototype'][_0x15172f(0xd6)] = function () {
    const _0x154220 = _0x15172f;
    if (this[_0x154220(0x20b)] !== undefined) return this['_horz'];
    const _0x18bbb2 = Sprite_FieldGaugeATB['Settings']['DisplayPosition'];
    return (this[_0x154220(0x20b)] = ['top', _0x154220(0xa6)][_0x154220(0x1b5)](_0x18bbb2)), this[_0x154220(0x20b)];
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x73)] = function () {
    const _0x27011b = _0x15172f,
      _0x57858b = Sprite_FieldGaugeATB[_0x27011b(0x237)],
      _0x178cd1 = this[_0x27011b(0xd6)](),
      _0x1c2536 = this[_0x27011b(0x1b9)] === $gameParty ? _0x27011b(0x1ac) : _0x27011b(0xe6),
      _0x39ce60 = _0x57858b[_0x27011b(0x1db)],
      _0x222686 = _0x57858b[_0x27011b(0x245)[_0x27011b(0xf8)](_0x1c2536)];
    _0x178cd1
      ? ((this['y'] = _0x57858b[_0x27011b(0xdb)] / 0x2), (this['y'] += _0x222686 ? -_0x39ce60 : _0x39ce60))
      : ((this['x'] = _0x57858b[_0x27011b(0xdb)] / 0x2), (this['x'] += _0x222686 ? _0x39ce60 : -_0x39ce60));
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['updatePositionOnGauge'] = function (_0x55c2c8) {
    const _0x3286f7 = _0x15172f,
      _0x44db09 = this['battler']();
    if (!_0x44db09) return;
    const _0x3d720b = _0x44db09[_0x3286f7(0x1e8)]();
    if (_0x3d720b >= Infinity) return;
    const _0x32a201 = Sprite_FieldGaugeATB[_0x3286f7(0x237)],
      _0x5d2a61 = this[_0x3286f7(0xd6)](),
      _0x304359 = this[_0x3286f7(0x1b8)](),
      _0x2c3e86 = _0x55c2c8 ? Infinity : _0x32a201[_0x3286f7(0x15d)];
    if (_0x5d2a61 && this['x'] !== _0x304359) {
      if (this['x'] > _0x304359) this['x'] = Math[_0x3286f7(0x145)](_0x304359, this['x'] - _0x2c3e86);
      if (this['x'] < _0x304359) this['x'] = Math[_0x3286f7(0x1ed)](_0x304359, this['x'] + _0x2c3e86);
    } else {
      if (!_0x5d2a61 && this['x'] !== _0x304359) {
        if (this['y'] > _0x304359) this['y'] = Math[_0x3286f7(0x145)](_0x304359, this['y'] - _0x2c3e86);
        if (this['y'] < _0x304359) this['y'] = Math[_0x3286f7(0x1ed)](_0x304359, this['y'] + _0x2c3e86);
      }
    }
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x1b8)] = function () {
    const _0x48cd69 = _0x15172f,
      _0x3553e9 = Sprite_FieldGaugeATB[_0x48cd69(0x237)],
      _0x4487e3 = this['battler'](),
      _0x974691 = this[_0x48cd69(0xd6)](),
      _0x21fbe6 = this[_0x48cd69(0x1bf)]['bitmap'][_0x48cd69(0x1f7)],
      _0x34a967 = this['_gaugeSprite']['bitmap']['height'],
      _0x216185 = _0x3553e9[_0x48cd69(0x1d0)][_0x48cd69(0x1f5)](0x0, 0x1),
      _0x5c3a1a = _0x3553e9[_0x48cd69(0x240)];
    let _0x447451 = _0x4487e3[_0x48cd69(0x23d)]() * _0x216185;
    _0x447451 += (0x1 - _0x216185) * _0x4487e3[_0x48cd69(0x1e8)]();
    if (_0x4487e3 === BattleManager[_0x48cd69(0x155)]) _0x447451 = 0x1;
    if (!_0x5c3a1a) _0x447451 = 0x1 - _0x447451;
    let _0x53fbf5 = 0x0;
    if (_0x974691) _0x53fbf5 = _0x447451 * _0x21fbe6;
    else !_0x974691 && (_0x53fbf5 = _0x447451 * _0x34a967);
    return Math[_0x48cd69(0x135)](_0x53fbf5);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x235)] = function () {
    const _0x9e9f4 = _0x15172f,
      _0x882d3 = this[_0x9e9f4(0x1a8)]();
    if (!_0x882d3) return;
    const _0x26b209 = Sprite_FieldGaugeATB[_0x9e9f4(0x237)],
      _0x18e8ce = this[_0x9e9f4(0x1b9)] === $gameParty ? 'Actor' : _0x9e9f4(0xe6);
    let _0x2e575e = _0x882d3['fieldAtbGraphicType']();
    if (_0x882d3[_0x9e9f4(0x98)]() && _0x2e575e === _0x9e9f4(0x20f)) _0x2e575e = 'face';
    else _0x882d3[_0x9e9f4(0x12d)]() && _0x2e575e === _0x9e9f4(0xb8) && (_0x2e575e = 'enemy');
    if (this[_0x9e9f4(0x10f)] !== _0x2e575e) return this[_0x9e9f4(0x164)]();
    switch (this[_0x9e9f4(0x10f)]) {
      case _0x9e9f4(0x180):
        if (this[_0x9e9f4(0x175)] !== _0x882d3[_0x9e9f4(0x225)]()) return this[_0x9e9f4(0x164)]();
        if (this[_0x9e9f4(0x9d)] !== _0x882d3[_0x9e9f4(0xa2)]()) return this[_0x9e9f4(0x164)]();
        break;
      case _0x9e9f4(0x1d9):
        if (this[_0x9e9f4(0x1a7)] !== _0x882d3[_0x9e9f4(0x13c)]()) return this[_0x9e9f4(0x164)]();
        break;
      case _0x9e9f4(0x20f):
        if (_0x882d3[_0x9e9f4(0x22e)]()) {
          if (this['_graphicSv'] !== _0x882d3['svBattlerName']()) return this[_0x9e9f4(0x164)]();
        } else {
          if (this['_graphicEnemy'] !== _0x882d3['battlerName']()) return this[_0x9e9f4(0x164)]();
        }
        break;
      case 'svactor':
        if (_0x882d3[_0x9e9f4(0x98)]()) {
          if (this[_0x9e9f4(0x170)] !== _0x882d3['battlerName']()) return this[_0x9e9f4(0x164)]();
        } else {
          if (this[_0x9e9f4(0x1a0)] !== _0x882d3[_0x9e9f4(0x154)]()) return this[_0x9e9f4(0x164)]();
        }
        break;
    }
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['processUpdateGraphic'] = function () {
    const _0x46c62e = _0x15172f,
      _0x2998d1 = this[_0x46c62e(0x1a8)]();
    if (!_0x2998d1) return;
    this[_0x46c62e(0x10f)] = _0x2998d1[_0x46c62e(0x19a)]();
    if (_0x2998d1[_0x46c62e(0x98)]() && this[_0x46c62e(0x10f)] === _0x46c62e(0x20f)) this[_0x46c62e(0x10f)] = _0x46c62e(0x180);
    else _0x2998d1[_0x46c62e(0x12d)]() && this[_0x46c62e(0x10f)] === _0x46c62e(0xb8) && (this[_0x46c62e(0x10f)] = _0x46c62e(0x20f));
    let _0x48b90a;
    switch (this[_0x46c62e(0x10f)]) {
      case _0x46c62e(0x180):
        (this[_0x46c62e(0x175)] = _0x2998d1['fieldAtbGraphicFaceName']()),
          (this[_0x46c62e(0x9d)] = _0x2998d1[_0x46c62e(0xa2)]()),
          (_0x48b90a = ImageManager['loadFace'](this['_graphicFaceName'])),
          _0x48b90a['addLoadListener'](this[_0x46c62e(0x11c)][_0x46c62e(0x1e9)](this, _0x48b90a));
        break;
      case _0x46c62e(0x1d9):
        (this[_0x46c62e(0x1a7)] = _0x2998d1[_0x46c62e(0x13c)]()),
          (_0x48b90a = ImageManager[_0x46c62e(0x8d)](_0x46c62e(0x1af))),
          _0x48b90a['addLoadListener'](this['changeIconGraphicBitmap'][_0x46c62e(0x1e9)](this, _0x48b90a));
        break;
      case _0x46c62e(0x20f):
        if (_0x2998d1[_0x46c62e(0x22e)]())
          (this[_0x46c62e(0x170)] = _0x2998d1[_0x46c62e(0xcf)]()),
            (_0x48b90a = ImageManager[_0x46c62e(0x143)](this['_graphicSv'])),
            _0x48b90a[_0x46c62e(0xfc)](this[_0x46c62e(0x87)][_0x46c62e(0x1e9)](this, _0x48b90a));
        else
          $gameSystem[_0x46c62e(0x184)]()
            ? ((this[_0x46c62e(0x1a0)] = _0x2998d1[_0x46c62e(0x154)]()),
              (_0x48b90a = ImageManager[_0x46c62e(0x21c)](this[_0x46c62e(0x1a0)])),
              _0x48b90a[_0x46c62e(0xfc)](this[_0x46c62e(0x1d3)][_0x46c62e(0x1e9)](this, _0x48b90a)))
            : ((this[_0x46c62e(0x1a0)] = _0x2998d1[_0x46c62e(0x154)]()),
              (_0x48b90a = ImageManager[_0x46c62e(0x139)](this[_0x46c62e(0x1a0)])),
              _0x48b90a['addLoadListener'](this[_0x46c62e(0x1d3)]['bind'](this, _0x48b90a)));
        break;
      case _0x46c62e(0xb8):
        (this[_0x46c62e(0x170)] = _0x2998d1[_0x46c62e(0x154)]()),
          (_0x48b90a = ImageManager[_0x46c62e(0x143)](this['_graphicSv'])),
          _0x48b90a[_0x46c62e(0xfc)](this[_0x46c62e(0x87)][_0x46c62e(0x1e9)](this, _0x48b90a));
        break;
    }
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x11c)] = function (_0x44ae44) {
    const _0x9a59e2 = _0x15172f,
      _0x2d1b83 = Sprite_FieldGaugeATB[_0x9a59e2(0x237)],
      _0x336106 = _0x2d1b83[_0x9a59e2(0xd9)],
      _0x66fd00 = this['_graphicFaceIndex'];
    this[_0x9a59e2(0x116)][_0x9a59e2(0x196)] = new Bitmap(_0x336106, _0x336106);
    const _0x547af1 = this[_0x9a59e2(0x116)][_0x9a59e2(0x196)],
      _0x184564 = ImageManager[_0x9a59e2(0xd8)],
      _0x3d57d2 = ImageManager[_0x9a59e2(0x8b)],
      _0x2b2d90 = ImageManager[_0x9a59e2(0xd8)],
      _0x14827e = ImageManager[_0x9a59e2(0x8b)],
      _0x54e389 = (_0x66fd00 % 0x4) * _0x184564 + (_0x184564 - _0x2b2d90) / 0x2,
      _0x9d0738 = Math[_0x9a59e2(0x146)](_0x66fd00 / 0x4) * _0x3d57d2 + (_0x3d57d2 - _0x14827e) / 0x2;
    _0x547af1[_0x9a59e2(0x99)](_0x44ae44, _0x54e389, _0x9d0738, _0x2b2d90, _0x14827e, 0x0, 0x0, _0x336106, _0x336106);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x172)] = function (_0x618697) {
    const _0x12d4e0 = _0x15172f,
      _0xe10a96 = Sprite_FieldGaugeATB[_0x12d4e0(0x237)],
      _0xb541ad = _0xe10a96[_0x12d4e0(0xd9)],
      _0x365ab2 = this['_graphicIconIndex'];
    this[_0x12d4e0(0x116)][_0x12d4e0(0x196)] = new Bitmap(_0xb541ad, _0xb541ad);
    const _0x4dc0ee = this[_0x12d4e0(0x116)][_0x12d4e0(0x196)],
      _0x5a7a0b = ImageManager['iconWidth'],
      _0xe7817f = ImageManager[_0x12d4e0(0xdd)],
      _0x2db6dc = (_0x365ab2 % 0x10) * _0x5a7a0b,
      _0x394c4f = Math[_0x12d4e0(0x146)](_0x365ab2 / 0x10) * _0xe7817f;
    _0x4dc0ee[_0x12d4e0(0x99)](_0x618697, _0x2db6dc, _0x394c4f, _0x5a7a0b, _0xe7817f, 0x0, 0x0, _0xb541ad, _0xb541ad);
  }),
  (Sprite_FieldMarkerATB['prototype'][_0x15172f(0x87)] = function (_0x686df7) {
    const _0x9b7c01 = _0x15172f,
      _0x1b7a35 = Sprite_FieldGaugeATB[_0x9b7c01(0x237)],
      _0x20d4c8 = _0x1b7a35[_0x9b7c01(0xd9)];
    this['_graphicSprite'][_0x9b7c01(0x196)] = new Bitmap(_0x20d4c8, _0x20d4c8);
    const _0x3a49d0 = this[_0x9b7c01(0x116)][_0x9b7c01(0x196)],
      _0x1749bc = this['_graphicSv']['match'](/\$/i),
      _0x13da95 = _0x1749bc ? 0x1 : ImageManager[_0x9b7c01(0x1cf)],
      _0x16ce26 = _0x1749bc ? 0x1 : ImageManager[_0x9b7c01(0x7b)],
      _0x4bc54d = _0x686df7[_0x9b7c01(0x1f7)] / _0x13da95,
      _0x166c71 = _0x686df7[_0x9b7c01(0x218)] / _0x16ce26,
      _0x222ef8 = Math['min'](0x1, _0x20d4c8 / _0x4bc54d, _0x20d4c8 / _0x166c71),
      _0x4fffc0 = _0x4bc54d * _0x222ef8,
      _0x2e227f = _0x166c71 * _0x222ef8,
      _0x103d7c = Math[_0x9b7c01(0x135)]((_0x20d4c8 - _0x4fffc0) / 0x2),
      _0x233359 = Math[_0x9b7c01(0x135)]((_0x20d4c8 - _0x2e227f) / 0x2);
    _0x3a49d0[_0x9b7c01(0x99)](_0x686df7, 0x0, 0x0, _0x4bc54d, _0x166c71, _0x103d7c, _0x233359, _0x4fffc0, _0x2e227f);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x1d3)] = function (_0x336e82) {
    const _0x2ed809 = _0x15172f,
      _0x559ae2 = Sprite_FieldGaugeATB[_0x2ed809(0x237)],
      _0x1bf821 = _0x559ae2['MarkerSize'];
    this['_graphicSprite']['bitmap'] = new Bitmap(_0x1bf821, _0x1bf821);
    const _0x50bbf5 = this[_0x2ed809(0x116)][_0x2ed809(0x196)],
      _0x4c7eb5 = Math[_0x2ed809(0x1ed)](0x1, _0x1bf821 / _0x336e82[_0x2ed809(0x1f7)], _0x1bf821 / _0x336e82[_0x2ed809(0x218)]),
      _0x46ce92 = _0x336e82[_0x2ed809(0x1f7)] * _0x4c7eb5,
      _0x1f93af = _0x336e82[_0x2ed809(0x218)] * _0x4c7eb5,
      _0x443e5c = Math[_0x2ed809(0x135)]((_0x1bf821 - _0x46ce92) / 0x2),
      _0x22efc4 = Math[_0x2ed809(0x135)]((_0x1bf821 - _0x1f93af) / 0x2);
    _0x50bbf5[_0x2ed809(0x99)](_0x336e82, 0x0, 0x0, _0x336e82[_0x2ed809(0x1f7)], _0x336e82['height'], _0x443e5c, _0x22efc4, _0x46ce92, _0x1f93af);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x187)] = function () {
    const _0x5cd17c = _0x15172f,
      _0x3e9afd = this[_0x5cd17c(0x1a8)]();
    if (!_0x3e9afd) return;
    if (!_0x3e9afd['isEnemy']()) return;
    if (this[_0x5cd17c(0x1e3)] === _0x3e9afd[_0x5cd17c(0x1ba)]()) return;
    (this[_0x5cd17c(0x1e3)] = _0x3e9afd[_0x5cd17c(0x1ba)]()), this[_0x5cd17c(0x116)][_0x5cd17c(0xac)](_0x3e9afd[_0x5cd17c(0x22e)]() ? 0x0 : this['_graphicHue']);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)]['updateLetter'] = function () {
    const _0x25d544 = _0x15172f;
    if (!this['_letterSprite']) return;
    const _0x37e369 = this['battler']();
    if (!_0x37e369) return;
    if (this[_0x25d544(0x173)] === _0x37e369[_0x25d544(0x173)] && this[_0x25d544(0x20c)] === _0x37e369['_plural']) return;
    (this[_0x25d544(0x173)] = _0x37e369['_letter']), (this[_0x25d544(0x20c)] = _0x37e369[_0x25d544(0x20c)]);
    const _0x2070fe = Sprite_FieldGaugeATB[_0x25d544(0x237)],
      _0x39d9fe = _0x2070fe['MarkerSize'],
      _0x11e23e = Math['floor'](_0x39d9fe / 0x2),
      _0x238525 = this[_0x25d544(0x10b)][_0x25d544(0x196)];
    _0x238525[_0x25d544(0x11f)]();
    if (!this[_0x25d544(0x20c)]) return;
    (_0x238525[_0x25d544(0xcc)] = _0x2070fe['EnemyBattlerFontFace'] || $gameSystem[_0x25d544(0x12f)]()),
      (_0x238525['fontSize'] = _0x2070fe['EnemyBattlerFontSize'] || 0x10),
      _0x238525[_0x25d544(0x1bd)](this['_letter'], 0x2, _0x11e23e, _0x39d9fe - 0x4, _0x11e23e - 0x2, _0x25d544(0x1fa));
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x192)] = function () {
    const _0x2c4bff = _0x15172f,
      _0x3f98a8 = this[_0x2c4bff(0x1a8)]();
    if (!_0x3f98a8) return;
    const _0x3a921a = _0x3f98a8['battler']();
    if (!_0x3a921a) return;
    const _0x3f4c43 = _0x3a921a[_0x2c4bff(0xbe)]();
    if (!_0x3f4c43) return;
    this[_0x2c4bff(0x16e)](_0x3f4c43[_0x2c4bff(0x128)]);
  }),
  (Sprite_FieldMarkerATB[_0x15172f(0x72)][_0x15172f(0x210)] = function () {
    const _0x4492f0 = _0x15172f;
    return this[_0x4492f0(0x1a8)]();
  });
