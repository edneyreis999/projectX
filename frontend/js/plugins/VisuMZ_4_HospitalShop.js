//=============================================================================
// VisuStella MZ - Hospital Shop
// VisuMZ_4_HospitalShop.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_HospitalShop = true;

var VisuMZ = VisuMZ || {};
VisuMZ.HospitalShop = VisuMZ.HospitalShop || {};
VisuMZ.HospitalShop.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [HospitalShop]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Hospital_Shop_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * In most RPG's, inns are often used to allow parties to recover their health,
 * restore their status, etc. It's often a cure-all for a set price. This
 * hospital setting, however, charges based on the amount of damage taken, to
 * the amount of mana consumed, and the state ailments inflicted also have a
 * bearing on the cost. Players can also heal individual members as opposed to
 * all members of their party in the event that they cannot heal the whole
 * party. This provides a challenge to the player and also provides a more
 * cost-proportional way of recovering from damage obtained through battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Heal individual actors based on the amount of HP damage they've taken, MP
 *   that they've consumed, or states afflicted upon them.
 * * Heals all party members at a single time with a discount, too.
 * * Adjust the cost of healing each HP, MP, revival, and state recovery.
 * * Special notetags that allow you to change the cost for specific states.
 * * Plugin Command allow you to call up the hospital scene from the map.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_1_SkillsStatesCore
 * 
 * The <No Recover All Clear> notetag can be used on states to prevent them
 * from being cleared in the hospital when selecting an actor to heal.
 * 
 * ---
 * 
 * VisuMZ_3_VisualGoldDisplay
 * 
 * The cost of healing per actor will be shown in Visual Gold Display format.
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
 * === State-Related Notetags ===
 * 
 * ---
 *
 * <Hospital Cost: x>
 *
 * - Used for: State Notetags
 * - Changes the cost to recover this state in the hospital to 'x'.
 * - Replace 'x' with a number representing the amount of gold needed to help
 *   the actor remove this state in the hospital scene.
 * - If this notetag is not used, use the default cost found in the
 *   Plugin Parameters.
 *
 * ---
 * 
 * <No Recover All Clear>
 * 
 * - Used for: State Notetags
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - This notetag will prevent the hospital and the "Recover All" event command
 *   from removing this state nor charging for it.
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
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Hospital Shop
 * - Opens the hospital shop.
 * - Cannot be used in battle.
 * 
 *   Discount Rate:
 *   - Determine the discount rate used for party heal.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Adjust the general settings for this plugin.
 *
 * ---
 *
 * Costs
 * 
 *   Cost Per HP:
 *   - How much gold should it cost to heal each HP?
 * 
 *   Cost Per MP:
 *   - How much gold should it cost to restore each MP?
 * 
 *   Death Cost by Level:
 *   - How much gold should it cost to revive from death per level of
 *     the actor?
 *
 * ---
 *
 * Defaults
 * 
 *   State Cost:
 *   - Default gold cost to recover from a state.
 *   - Bypass with <Hospital Cost: x> state notetag.
 * 
 * ---
 * 
 * Maximums
 * 
 *   Max Cost Per Level:
 *   - Maximum gold cost per actor level.
 *   - Pick lowest cost between this and global.
 * 
 *   Max Cost Global:
 *   - Maximum gold cost ever.
 *   - Pick lowest cost between this and per level.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Hospital.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Command Window
 * 
 *   Heal Text:
 *   - Text used for this command.
 * 
 *     Icon:
 *     - Icon used for this command.
 * 
 *     Help Description:
 *     - Help window description used for this command.
 *     - Text codes allowed.
 * 
 *   Cancel Text:
 *   - Text used for this command.
 * 
 *     Icon:
 *     - Icon used for this command.
 * 
 *     Help Description:
 *     - Help window description used for this command.
 *     - Text codes allowed.
 *
 * ---
 *
 * Heal List Window
 * 
 *   Actor:
 * 
 *     Help Description:
 *     - Help window description used for target actor.
 *     - %1 - Name, %2 - Level, %3 - Class, %4 - Cost, %5 - Gold
 * 
 *   Recover All:
 * 
 *     Command Text:
 *     - Text displayed for this recovery type command.
 * 
 *     Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Help Description:
 *     - Help window description used for party recovery.
 *     - %1 - Cost, %2 - Gold
 * 
 *     Discount Text Format:
 *     - Text format used to display the discount text.
 *     - %1 - Discount Percentage
 * 
 *       Decimal Places:
 *       - Decimal places used for discount percentage.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * Help Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 * ---
 * 
 * Command Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Style:
 *   - How do you wish to draw commands for this window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Gold Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Heal List Window
 * 
 *   Add Recover All?:
 *   - Adds the recover all members command?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Draw Actor Face?:
 *   - Draws the face of the actor.
 * 
 *   Draw Actor Name?:
 *   - Draws the name of the actor.
 * 
 *   Draw HP Gauge?:
 *   - Draws the HP Gauge of the actor.
 * 
 *   Draw MP Gauge?:
 *   - Draws the MP Gauge of the actor.
 * 
 *   Draw State Icons?:
 *   - Draws the actor's state icons.
 * 
 *     Number Drawn:
 *     - How many icons should be drawn?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.03: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where custom state hospital costs were not applied properly.
 *    Fix made by Arisu.
 * ** Fixed a bug where if "Add Recover All?" plugin parameter was turned off,
 *    then there wouldn't be alignment problems. Fix made by Arisu.
 * 
 * Version 1.02: August 17, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: May 18, 2023
 * * Bug Fixes!
 * ** If faces weren't loaded ahead of time, they wouldn't show up in the shop.
 *    This should now be fixed. Fix made by Arisu.
 * 
 * Version 1.00 Official Release Date: May 22, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneOpenHospitalShop
 * @text Scene: Open Hospital Shop
 * @desc Opens the hospital shop.
 * Cannot be used in battle.
 *
 * @arg DiscountRate:eval
 * @text Discount Rate
 * @desc Determine the discount rate used for party heal.
 * You may use JavaScript code.
 * @default 0.10
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param HospitalShop
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
 * @desc Adjust the general settings for this plugin.
 * @default {"Costs":"","costPerHp:num":"1.0","costPerMp:num":"2.5","costDeathPerLevel:num":"1000","Defaults":"","defaultStateCost:num":"250","Maximums":"","maxCostPerLevel:num":"1000","maxCostGlobal:num":"999999"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Hospital.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"Window_HospitalCommand":"","HealText:str":"Heal","HealIcon:str":"72","HealHelpDesc:json":"\"Select a party member to fully heal.\"","CancelText:str":"Exit","CancelIcon:str":"82","CancelHelpDesc:json":"\"Leave the hospital shop.\"","Window_HospitalHealList":"","HealList_Actor":"","ActorHelpDesc:json":"\"Heal %3, a level %4 %5.\\nThe cost for recovery will be %1\\\\C[16]%2\\\\C[0].\"","HealList_Party":"","recoverAllText:str":"Heal All","recoverAllColor:str":"24","PartyHelpDesc:json":"\"Heals all party members.\\nThe cost for recovery will be %1\\\\C[16]%2\\\\C[0].\"","discountFmt:str":"\\I[87] \\C[6]Party Discount:\\C[0] \\C[24]%1\\C[0]% \\I[87]","discountDecimals:num":"2"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"Window_Help":"","HelpWindow_BgType:num":"0","Window_HospitalCommand":"","CommandWindow_BgType:num":"0","CommandWindow_Style:str":"auto","CommandWindow_RectJS:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_Gold":"","GoldWindow_BgType:num":"0","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_HospitalHealList":"","addRecoverAll:eval":"true","HealListWindow_BgType:num":"0","drawActorFace:eval":"true","drawActorName:eval":"true","drawHpGauge:eval":"true","drawMpGauge:eval":"true","drawStateIcons:eval":"true","iconsDrawn:num":"4","HealListWindow_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Costs
 *
 * @param costPerHp:num
 * @text Cost Per HP
 * @parent Costs
 * @desc How much gold should it cost to heal each HP?
 * @default 1.0
 *
 * @param costPerMp:num
 * @text Cost Per MP
 * @parent Costs
 * @desc How much gold should it cost to restore each MP?
 * @default 2.5
 *
 * @param costDeathPerLevel:num
 * @text Death Cost by Level
 * @parent Costs
 * @desc How much gold should it cost to revive from death
 * per level of the actor?
 * @default 1000
 * 
 * @param Defaults
 *
 * @param defaultStateCost:num
 * @text State Cost
 * @parent Defaults
 * @desc Default gold cost to recover from a state.
 * Bypass with <Hospital Cost: x> state notetag.
 * @default 250
 *
 * @param Maximums
 *
 * @param maxCostPerLevel:num
 * @text Max Cost Per Level
 * @parent Maximums
 * @desc Maximum gold cost per actor level.
 * Pick lowest cost between this and global.
 * @default 1000
 *
 * @param maxCostGlobal:num
 * @text Max Cost Global
 * @parent Maximums
 * @desc Maximum gold cost ever.
 * Pick lowest cost between this and per level.
 * @default 999999
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @require 1
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @require 1
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param Window_HospitalCommand
 * @text Command Window
 *
 * @param HealText:str
 * @text Heal Text
 * @parent Window_HospitalCommand
 * @desc Text used for this command.
 * @default Heal
 *
 * @param HealIcon:str
 * @text Icon
 * @parent HealText:str
 * @desc Icon used for this command.
 * @default 72
 *
 * @param HealHelpDesc:json
 * @text Help Description
 * @parent HealText:str
 * @type note
 * @desc Help window description used for this command.
 * Text codes allowed.
 * @default "Select a party member to fully heal."
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Window_HospitalCommand
 * @desc Text used for this command.
 * @default Exit
 *
 * @param CancelIcon:str
 * @text Icon
 * @parent CancelText:str
 * @desc Icon used for this command.
 * @default 82
 *
 * @param CancelHelpDesc:json
 * @text Help Description
 * @parent CancelText:str
 * @type note
 * @desc Help window description used for this command.
 * Text codes allowed.
 * @default "Leave the hospital shop."
 *
 * @param Window_HospitalHealList
 * @text Heal List Window
 * 
 * @param HealList_Actor
 * @text Actor
 * @parent Window_HospitalHealList
 *
 * @param ActorHelpDesc:json
 * @text Help Description
 * @parent HealList_Actor
 * @type note
 * @desc Help window description used for target actor.
 * %1 - Name, %2 - Level, %3 - Class, %4 - Cost, %5 - Gold
 * @default "Heal %3, a level %4 %5.\nThe cost for recovery will be %1\\C[16]%2\\C[0]."
 * 
 * @param HealList_Party
 * @text Recover All
 * @parent Window_HospitalHealList
 * 
 * @param recoverAllText:str
 * @text Command Text
 * @parent HealList_Party
 * @desc Text displayed for this recovery type command.
 * @default Heal All
 * 
 * @param recoverAllColor:str
 * @text Text Color
 * @parent HealList_Party
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param PartyHelpDesc:json
 * @text Help Description
 * @parent HealList_Party
 * @type note
 * @desc Help window description used for party recovery.
 * %1 - Cost, %2 - Gold
 * @default "Heals all party members.\nThe cost for recovery will be %1\\C[16]%2\\C[0]."
 * 
 * @param discountFmt:str
 * @text Discount Text Format
 * @parent HealList_Party
 * @desc Text format used to display the discount text.
 * %1 - Discount Percentage
 * @default \I[87] \C[6]Party Discount:\C[0] \C[24]%1\C[0]% \I[87]
 * 
 * @param discountDecimals:num
 * @text Decimal Places
 * @parent discountFmt:str
 * @type number
 * @desc Decimal places used for discount percentage.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_Help
 * @text Help Window
 *
 * @param HelpWindow_BgType:num
 * @text Background Type
 * @parent Window_Help
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Window_HospitalCommand
 * @text Command Window
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent Window_HospitalCommand
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandWindow_Style:str
 * @text Style
 * @parent Window_HospitalCommand
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands for this window?
 * @default auto
 *
 * @param CommandWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_HospitalCommand
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_Gold
 * @text Gold Window
 *
 * @param GoldWindow_BgType:num
 * @text Background Type
 * @parent Window_Gold
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_Gold
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_HospitalHealList
 * @text Heal List Window
 *
 * @param addRecoverAll:eval
 * @text Add Recover All?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Adds the recover all members command?
 * @default true
 *
 * @param HealListWindow_BgType:num
 * @text Background Type
 * @parent Window_HospitalHealList
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param drawActorFace:eval
 * @text Draw Actor Face?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the face of the actor.
 * @default true
 *
 * @param drawActorName:eval
 * @text Draw Actor Name?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the name of the actor.
 * @default true
 *
 * @param drawHpGauge:eval
 * @text Draw HP Gauge?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the HP Gauge of the actor.
 * @default true
 *
 * @param drawMpGauge:eval
 * @text Draw MP Gauge?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the MP Gauge of the actor.
 * @default true
 *
 * @param drawStateIcons:eval
 * @text Draw State Icons?
 * @parent Window_HospitalHealList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the actor's state icons.
 * @default true
 *
 * @param iconsDrawn:num
 * @text Number Drawn
 * @parent drawStateIcons:eval
 * @type number
 * @min 1
 * @desc How many icons should be drawn?
 * @default 4
 *
 * @param HealListWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_HospitalHealList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x53f24a=_0x5a3c;function _0x5a3c(_0x2b2988,_0xf20cc2){const _0x5e7d80=_0x5e7d();return _0x5a3c=function(_0x5a3cde,_0x14a763){_0x5a3cde=_0x5a3cde-0x6d;let _0x1c757b=_0x5e7d80[_0x5a3cde];return _0x1c757b;},_0x5a3c(_0x2b2988,_0xf20cc2);}(function(_0x8b7206,_0x5f4147){const _0x314cbf=_0x5a3c,_0x11e56a=_0x8b7206();while(!![]){try{const _0x4dd158=parseInt(_0x314cbf(0x173))/0x1+parseInt(_0x314cbf(0xea))/0x2+parseInt(_0x314cbf(0x13b))/0x3+-parseInt(_0x314cbf(0x189))/0x4+parseInt(_0x314cbf(0xbd))/0x5+parseInt(_0x314cbf(0x10f))/0x6+-parseInt(_0x314cbf(0x80))/0x7*(parseInt(_0x314cbf(0x1a2))/0x8);if(_0x4dd158===_0x5f4147)break;else _0x11e56a['push'](_0x11e56a['shift']());}catch(_0x2915b5){_0x11e56a['push'](_0x11e56a['shift']());}}}(_0x5e7d,0xcceb2));var label=_0x53f24a(0x7a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x53f24a(0x86)](function(_0x484c19){const _0x10974a=_0x53f24a;return _0x484c19[_0x10974a(0x1b5)]&&_0x484c19[_0x10974a(0x153)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x53f24a(0x18e)]||{},VisuMZ[_0x53f24a(0x17d)]=function(_0x50d468,_0x5236ee){const _0x4c6475=_0x53f24a;for(const _0x1e22e6 in _0x5236ee){if(_0x4c6475(0x17c)==='nUpdE'){if(_0x1e22e6[_0x4c6475(0x1bd)](/(.*):(.*)/i)){const _0x5912a8=String(RegExp['$1']),_0x438e20=String(RegExp['$2'])[_0x4c6475(0x125)]()['trim']();let _0x36f3f1,_0x349775,_0x43c190;switch(_0x438e20){case _0x4c6475(0xb4):_0x36f3f1=_0x5236ee[_0x1e22e6]!==''?Number(_0x5236ee[_0x1e22e6]):0x0;break;case _0x4c6475(0x142):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775[_0x4c6475(0x106)](_0x19fc42=>Number(_0x19fc42));break;case _0x4c6475(0xfe):_0x36f3f1=_0x5236ee[_0x1e22e6]!==''?eval(_0x5236ee[_0x1e22e6]):null;break;case _0x4c6475(0x179):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775[_0x4c6475(0x106)](_0x3d3a90=>eval(_0x3d3a90));break;case _0x4c6475(0x13e):_0x36f3f1=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):'';break;case _0x4c6475(0x1c7):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775[_0x4c6475(0x106)](_0xb2c13d=>JSON[_0x4c6475(0x95)](_0xb2c13d));break;case _0x4c6475(0x94):_0x36f3f1=_0x5236ee[_0x1e22e6]!==''?new Function(JSON['parse'](_0x5236ee[_0x1e22e6])):new Function(_0x4c6475(0x116));break;case _0x4c6475(0x19c):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON['parse'](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775[_0x4c6475(0x106)](_0x98c137=>new Function(JSON['parse'](_0x98c137)));break;case _0x4c6475(0x10d):_0x36f3f1=_0x5236ee[_0x1e22e6]!==''?String(_0x5236ee[_0x1e22e6]):'';break;case _0x4c6475(0xbe):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775['map'](_0x29facd=>String(_0x29facd));break;case _0x4c6475(0x124):_0x43c190=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):{},_0x36f3f1=VisuMZ[_0x4c6475(0x17d)]({},_0x43c190);break;case _0x4c6475(0x162):_0x349775=_0x5236ee[_0x1e22e6]!==''?JSON[_0x4c6475(0x95)](_0x5236ee[_0x1e22e6]):[],_0x36f3f1=_0x349775[_0x4c6475(0x106)](_0x2ee3d6=>VisuMZ[_0x4c6475(0x17d)]({},JSON[_0x4c6475(0x95)](_0x2ee3d6)));break;default:continue;}_0x50d468[_0x5912a8]=_0x36f3f1;}}else{const _0x4a11f1=this[_0x4c6475(0xf5)](),_0x1aad84=new _0x2f0009(_0x4a11f1);_0x1aad84[_0x4c6475(0x184)](this[_0x4c6475(0xd9)]),_0x1aad84['setHandler']('heal',this[_0x4c6475(0x18a)][_0x4c6475(0x192)](this)),_0x1aad84[_0x4c6475(0x171)](_0x4c6475(0x13c),this[_0x4c6475(0xd7)][_0x4c6475(0x192)](this)),_0x1aad84['setHandler'](_0x4c6475(0xcc),this[_0x4c6475(0x1dd)][_0x4c6475(0x192)](this)),this[_0x4c6475(0x7c)](_0x1aad84),this[_0x4c6475(0x75)]=_0x1aad84,_0x1aad84[_0x4c6475(0xfb)](_0x4267c1[_0x4c6475(0x1b9)][_0x4c6475(0x1ac)]);}}return _0x50d468;},(_0x3001f8=>{const _0x5f21ae=_0x53f24a,_0x42e610=_0x3001f8['name'];for(const _0x199b3f of dependencies){if(!Imported[_0x199b3f]){if(_0x5f21ae(0x102)!==_0x5f21ae(0x84)){alert(_0x5f21ae(0x9c)['format'](_0x42e610,_0x199b3f)),SceneManager[_0x5f21ae(0x156)]();break;}else this[_0x5f21ae(0x9b)]();}}const _0x48f3d9=_0x3001f8['description'];if(_0x48f3d9['match'](/\[Version[ ](.*?)\]/i)){const _0x52c208=Number(RegExp['$1']);_0x52c208!==VisuMZ[label]['version']&&(alert(_0x5f21ae(0x81)['format'](_0x42e610,_0x52c208)),SceneManager[_0x5f21ae(0x156)]());}if(_0x48f3d9[_0x5f21ae(0x1bd)](/\[Tier[ ](\d+)\]/i)){if(_0x5f21ae(0x83)==='Vtcmu'){const _0x2c6009=Number(RegExp['$1']);_0x2c6009<tier?(alert(_0x5f21ae(0x170)[_0x5f21ae(0x15a)](_0x42e610,_0x2c6009,tier)),SceneManager['exit']()):tier=Math[_0x5f21ae(0x18d)](_0x2c6009,tier);}else{if(_0x435fc6[_0x5f21ae(0x92)]())return;if(_0x297c36[_0x5f21ae(0x168)]())return;_0x365def[_0x5f21ae(0x17d)](_0x59d52a,_0x40b6b5);const _0x1b328b=(_0x5144f5[_0x5f21ae(0xe7)]||0x0)[_0x5f21ae(0x1c4)](0x0,0x1);_0x51a2c7['setHospitalDiscountRate'](_0x1b328b),_0x11a79f[_0x5f21ae(0x183)](_0x1c99d9);}}VisuMZ[_0x5f21ae(0x17d)](VisuMZ[label][_0x5f21ae(0x18e)],_0x3001f8[_0x5f21ae(0x74)]);})(pluginData),PluginManager[_0x53f24a(0x8d)](pluginData[_0x53f24a(0x11d)],_0x53f24a(0x11b),_0x1e16bc=>{const _0x3c770b=_0x53f24a;if($gameParty[_0x3c770b(0x92)]())return;if(SceneManager[_0x3c770b(0x168)]())return;VisuMZ[_0x3c770b(0x17d)](_0x1e16bc,_0x1e16bc);const _0x1a2e19=(_0x1e16bc['DiscountRate']||0x0)[_0x3c770b(0x1c4)](0x0,0x1);$gameParty[_0x3c770b(0x15d)](_0x1a2e19),SceneManager['push'](Scene_Hospital);}),VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x6e)]={'StateCost':/<HOSPITAL (?:COST):[ ](\d+)>/i},DataManager[_0x53f24a(0xe1)]=function(_0x19fbcc){const _0x966cba=_0x53f24a;this['_hospitalStateCost']=this[_0x966cba(0x1a4)]||{};if(this[_0x966cba(0x1a4)][_0x19fbcc]!==undefined)return this[_0x966cba(0x1a4)][_0x19fbcc];this[_0x966cba(0x1a4)][_0x19fbcc]=Game_Actor[_0x966cba(0x10a)][_0x966cba(0xbc)];const _0x71d56d=VisuMZ[_0x966cba(0x7a)][_0x966cba(0x6e)],_0x484e80=$dataStates[_0x19fbcc]?$dataStates[_0x19fbcc][_0x966cba(0x119)]||'':'';return _0x484e80['match'](_0x71d56d[_0x966cba(0xeb)])&&(this['_hospitalStateCost'][_0x19fbcc]=Number(RegExp['$1'])),this[_0x966cba(0x1a4)][_0x19fbcc];},ColorManager[_0x53f24a(0x78)]=function(_0x15291c){const _0x184792=_0x53f24a;_0x15291c=String(_0x15291c);if(_0x15291c[_0x184792(0x1bd)](/#(.*)/i))return'#%1'[_0x184792(0x15a)](String(RegExp['$1']));else{if(_0x184792(0xa0)!==_0x184792(0xde))return this[_0x184792(0x18b)](Number(_0x15291c));else{const _0x909d7e=_0x27fcb0(_0x16e824['$1']);_0x909d7e!==_0x49ebbe[_0x48bd32][_0x184792(0x138)]&&(_0x5afe41(_0x184792(0x81)[_0x184792(0x15a)](_0x53fd45,_0x909d7e)),_0x1735a8[_0x184792(0x156)]());}}},SceneManager[_0x53f24a(0x168)]=function(){const _0x15f22a=_0x53f24a;return this[_0x15f22a(0x103)]&&this[_0x15f22a(0x103)][_0x15f22a(0xe2)]===Scene_Battle;},SceneManager['isSceneMap']=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Map;},VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x1c3)]=Game_System['prototype']['initialize'],Game_System[_0x53f24a(0x131)][_0x53f24a(0x90)]=function(){const _0x94443b=_0x53f24a;VisuMZ[_0x94443b(0x7a)][_0x94443b(0x1c3)][_0x94443b(0x152)](this),this[_0x94443b(0x127)]();},Game_System[_0x53f24a(0x131)]['initHospitalShopData']=function(){this['_hospitalData']={'hp':0x0,'mp':0x0,'deaths':0x0,'states':0x0};},Game_System[_0x53f24a(0x131)]['hospitalShopData']=function(){if(this['_hospitalData']===undefined)this['initHospitalShopData']();return this['_hospitalData'];},Game_Actor[_0x53f24a(0x10a)]={'costPerHp':VisuMZ[_0x53f24a(0x7a)]['Settings']['General'][_0x53f24a(0x13d)]??0x1,'costPerMp':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x15e)][_0x53f24a(0x144)]??2.5,'costDeathPerLevel':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x15e)]['costDeathPerLevel']??0x3e8,'defaultStateCost':VisuMZ['HospitalShop']['Settings'][_0x53f24a(0x15e)][_0x53f24a(0xbc)]??0xfa,'maxCostPerLevel':VisuMZ['HospitalShop']['Settings'][_0x53f24a(0x15e)]['maxCostPerLevel']??0x3e8,'maxCostGlobal':VisuMZ[_0x53f24a(0x7a)]['Settings'][_0x53f24a(0x15e)][_0x53f24a(0x178)]??0xf423f},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0x16a)]=function(){const _0x17e502=_0x53f24a;if(this[_0x17e502(0x13a)]>this['hp'])return!![];if(this[_0x17e502(0x186)]>this['mp'])return!![];if(this[_0x17e502(0x112)]())return!![];return![];},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0x112)]=function(){const _0x422932=_0x53f24a;return this[_0x422932(0x1c1)]()>0x0;},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0x1c1)]=function(){const _0xd448cc=_0x53f24a;return this[_0xd448cc(0xe6)]()[_0xd448cc(0xad)];},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0xe6)]=function(){const _0x30beab=_0x53f24a,_0x2d9a9d=this[_0x30beab(0xcd)][_0x30beab(0x86)](_0x1d185d=>$dataStates[_0x1d185d]&&!$dataStates[_0x1d185d][_0x30beab(0x119)][_0x30beab(0x1bd)](/<NO RECOVER ALL CLEAR>/i));return _0x2d9a9d[_0x30beab(0x106)](_0x4666fa=>$dataStates[_0x4666fa])[_0x30beab(0x139)](null)[_0x30beab(0x139)](undefined);},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0xae)]=function(){const _0x149b94=_0x53f24a;if(!this[_0x149b94(0x16a)]())return 0x0;let _0x31d953=0x0;if(this[_0x149b94(0x13a)]>this['hp']){const _0xf70bfc=this['mhp']-this['hp'];_0x31d953+=Math['ceil'](_0xf70bfc*Game_Actor['HOSPITAL'][_0x149b94(0x13d)]);}if(this[_0x149b94(0x186)]>this['mp']){if('xNUdD'!==_0x149b94(0x71))this[_0x149b94(0x70)]=_0x193722[_0x149b94(0x10a)]['defaultDiscountRate'];else{const _0x10efb4=this[_0x149b94(0x186)]-this['mp'];_0x31d953+=Math[_0x149b94(0xa7)](_0x10efb4*Game_Actor[_0x149b94(0x10a)][_0x149b94(0x144)]);}}if(this[_0x149b94(0xac)]()){if(_0x149b94(0x123)===_0x149b94(0x11e)){this[_0x149b94(0xe9)]();const _0x521f0f=this[_0x149b94(0x7b)](_0x15aad5);this['changePaintOpacity'](_0x521f0f);const _0x4b4015=this[_0x149b94(0xc6)](_0x483336);let _0x852ede=0x0;_0x852ede=0x0,_0x852ede+=this[_0x149b94(0x1d0)](_0x2efa62,_0x16a17f),_0x852ede+=this['drawItemName'](_0x509669,_0x4b4015,_0x852ede),_0x852ede=_0x4b4015['x']+_0x835de9[_0x149b94(0xa7)](_0x4b4015[_0x149b94(0x115)]/0x3),_0x1cb2e4===_0x14ddd4?_0x852ede+=this[_0x149b94(0x7e)](_0x5ea8a4,_0x4b4015,_0x852ede):(_0x852ede+=this[_0x149b94(0x11f)](_0x372274,_0x4b4015,_0x852ede),_0x852ede+=this['drawItemMpGauge'](_0x36597d,_0x4b4015,_0x852ede),_0x852ede+=this['drawItemStateIcons'](_0xd1c100,_0x4b4015,_0x852ede)),_0x852ede=_0x4b4015['x']+_0x4a5e35[_0x149b94(0xa7)](_0x4b4015['width']*0x2/0x3),this[_0x149b94(0x149)](_0x3eec5d,_0x4b4015,_0x852ede);}else _0x31d953+=this[_0x149b94(0x16c)]*Game_Actor[_0x149b94(0x10a)]['costDeathPerLevel'];}else{if(this['hasHospitalState']()){const _0x5fa771=this['getHospitalStates']();for(const _0x462470 of _0x5fa771){if(_0x462470)_0x31d953+=DataManager[_0x149b94(0xe1)](_0x462470['id']);}}}const _0x517201=Math['ceil'](this['level']*Game_Actor[_0x149b94(0x10a)][_0x149b94(0xc0)]),_0x183fbb=Game_Actor[_0x149b94(0x10a)][_0x149b94(0x178)];return _0x31d953=Math['min'](_0x31d953,_0x517201,_0x183fbb),Math[_0x149b94(0xa7)](_0x31d953);},Game_Actor[_0x53f24a(0x131)][_0x53f24a(0x182)]=function(){const _0x468491=_0x53f24a;this['hp']!==this[_0x468491(0x13a)]&&(_0x468491(0x1a0)!==_0x468491(0x1a0)?this[_0x468491(0x193)]():$gameSystem[_0x468491(0x12f)]()['hp']+=this[_0x468491(0x13a)]-this['hp']),this['mp']!==this[_0x468491(0x186)]&&($gameSystem[_0x468491(0x12f)]()['mp']+=this[_0x468491(0x186)]-this['mp']),this[_0x468491(0xac)]()&&($gameSystem[_0x468491(0x12f)]()[_0x468491(0xa6)]+=0x1),this[_0x468491(0x112)]()&&($gameSystem[_0x468491(0x12f)]()[_0x468491(0x14a)]+=this['totalHospitalStates']()),this[_0x468491(0x1c2)]();},Game_Party['HOSPITAL']={'defaultDiscountRate':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)]['General'][_0x53f24a(0xed)]??0.1},Game_Party[_0x53f24a(0x131)][_0x53f24a(0x1a6)]=function(){const _0x355840=_0x53f24a;return this[_0x355840(0x70)]===undefined&&('IHpik'!==_0x355840(0x18c)?this[_0x355840(0x70)]=Game_Party['HOSPITAL']['defaultDiscountRate']:(this[_0x355840(0x1d4)][_0x355840(0xf4)](),this[_0x355840(0x105)][_0x355840(0x73)]())),this['_hospitalDiscountRate'][_0x355840(0x1c4)](0x0,0x1);},Game_Party[_0x53f24a(0x131)][_0x53f24a(0x15d)]=function(_0xf990c0){const _0x466bf9=_0x53f24a;return this[_0x466bf9(0x70)]=_0xf990c0[_0x466bf9(0x1c4)](0x0,0x1);},Game_Party[_0x53f24a(0x131)][_0x53f24a(0x16a)]=function(){const _0x9db37e=_0x53f24a;return this[_0x9db37e(0x161)]()[_0x9db37e(0x1a8)](_0x44f22b=>_0x44f22b['needsHospitalHealing']());},Game_Party[_0x53f24a(0x131)][_0x53f24a(0xae)]=function(){const _0x165fd2=_0x53f24a;let _0x1eed65=this[_0x165fd2(0x161)]()[_0x165fd2(0xef)]((_0x2ef7de,_0x2b9cdd)=>_0x2ef7de+_0x2b9cdd[_0x165fd2(0xae)](),0x0);return _0x1eed65*=0x1-this['hospitalDiscountRate'](),Math['ceil'](_0x1eed65);};function Scene_Hospital(){const _0x3a6cfd=_0x53f24a;this[_0x3a6cfd(0x90)](...arguments);}Scene_Hospital['prototype']=Object[_0x53f24a(0x1be)](Scene_MenuBase[_0x53f24a(0x131)]),Scene_Hospital[_0x53f24a(0x131)]['constructor']=Scene_Hospital,Scene_Hospital['SETTINGS']={'goldWindow_BgType':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0x1cb)]??0x0,'helpWindow_BgType':VisuMZ[_0x53f24a(0x7a)]['Settings'][_0x53f24a(0x111)][_0x53f24a(0x1a3)]??0x0,'neutralWindow':_0x53f24a(0xc4)},Scene_Hospital['prototype'][_0x53f24a(0x90)]=function(){const _0x4c937c=_0x53f24a;Scene_MenuBase[_0x4c937c(0x131)]['initialize']['call'](this);},Scene_Hospital['prototype'][_0x53f24a(0x1be)]=function(){const _0x20fbc4=_0x53f24a;Scene_MenuBase[_0x20fbc4(0x131)][_0x20fbc4(0x1be)][_0x20fbc4(0x152)](this),this[_0x20fbc4(0x100)](),this['createCommandWindow'](),this[_0x20fbc4(0xd5)](),this['createDataWindow'](),this[_0x20fbc4(0x118)](),this['showNeutralWindow']();if(this[_0x20fbc4(0x6f)]()){if('ZpDsz'!==_0x20fbc4(0xc8))this['postCreateWindowsShopBustStyleUI']();else{const _0x3b1d60=_0x49be7e[_0x20fbc4(0xae)](),_0xee675a=_0x52bc0b[_0x20fbc4(0x15c)],_0x27c8b8=_0x310dfe[_0x20fbc4(0xca)]((_0x58264a[_0x20fbc4(0xda)]-this[_0x20fbc4(0x10e)]())/0x2),_0x53693b=_0x9a0204['width']-(_0x43c3b3['x']+_0x42f729);this[_0x20fbc4(0x146)](_0x3b1d60,_0xee675a,_0x1c956c['x']+_0x58b669,_0x50a472['y']+_0x27c8b8,_0x53693b);}}},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x100)]=function(){const _0x104e53=_0x53f24a;Scene_MenuBase[_0x104e53(0x131)][_0x104e53(0x100)][_0x104e53(0x152)](this),this['_helpWindow'][_0x104e53(0xfb)](Scene_Hospital[_0x104e53(0x1b9)][_0x104e53(0x1dc)]);},Scene_Hospital[_0x53f24a(0x131)]['createCommandWindow']=function(){const _0x237694=_0x53f24a,_0x180a25=this[_0x237694(0xf5)](),_0xa3de9f=new Window_HospitalCommand(_0x180a25);_0xa3de9f['setHelpWindow'](this[_0x237694(0xd9)]),_0xa3de9f[_0x237694(0x171)](_0x237694(0xc4),this[_0x237694(0x18a)]['bind'](this)),_0xa3de9f[_0x237694(0x171)](_0x237694(0x13c),this[_0x237694(0xd7)][_0x237694(0x192)](this)),_0xa3de9f[_0x237694(0x171)]('cancel',this['popScene'][_0x237694(0x192)](this)),this[_0x237694(0x7c)](_0xa3de9f),this['_commandWindow']=_0xa3de9f,_0xa3de9f[_0x237694(0xfb)](Window_HospitalCommand['SETTINGS'][_0x237694(0x1ac)]);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xf5)]=function(){const _0x1e52e2=_0x53f24a;if(this['isUsingShopBustStyleUI']()){if('AHmeA'===_0x1e52e2(0xf1)){const _0x5202b6=new _0x3b3527(0x0,0x0,_0x54a371['width'],_0x45f12c[_0x1e52e2(0xda)]);this[_0x1e52e2(0x190)]=new _0x2d6f14(_0x5202b6),this[_0x1e52e2(0x190)]['opacity']=0x0,this[_0x1e52e2(0xd6)](this['_commandNameWindow']),this['updateCommandNameWindow']();}else return this[_0x1e52e2(0x1b1)]();}if(VisuMZ[_0x1e52e2(0x7a)][_0x1e52e2(0x18e)][_0x1e52e2(0x111)]['CommandWindow_RectJS'])return VisuMZ[_0x1e52e2(0x7a)]['Settings'][_0x1e52e2(0x111)][_0x1e52e2(0xb8)][_0x1e52e2(0x152)](this);const _0x24281f=Graphics[_0x1e52e2(0xfa)]-this[_0x1e52e2(0x1cc)](),_0x1019ce=this['calcWindowHeight'](0x1,!![]),_0x1ff7cb=0x0,_0x5e2ecd=this[_0x1e52e2(0xb7)]();return new Rectangle(_0x1ff7cb,_0x5e2ecd,_0x24281f,_0x1019ce);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xd5)]=function(){const _0x3efb7a=_0x53f24a,_0x22ba66=this[_0x3efb7a(0x96)](),_0x59b9c5=new Window_Gold(_0x22ba66);this['addWindow'](_0x59b9c5),this[_0x3efb7a(0xa5)]=_0x59b9c5,_0x59b9c5[_0x3efb7a(0xfb)](Scene_Hospital['SETTINGS']['goldWindow_BgType']);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x96)]=function(){const _0x3167db=_0x53f24a;if(this[_0x3167db(0x6f)]()){if(_0x3167db(0x1a1)!==_0x3167db(0x1a9))return this['getShopBustStyleUI_GoldWindow_Rect']();else _0x2cfc7c+=this[_0x3167db(0x16c)]*_0x22e00b['HOSPITAL'][_0x3167db(0x8e)];}if(VisuMZ[_0x3167db(0x7a)][_0x3167db(0x18e)][_0x3167db(0x111)]['GoldWindow_RectJS'])return VisuMZ['HospitalShop']['Settings']['Window']['GoldWindow_RectJS'][_0x3167db(0x152)](this);const _0x21b9f3=this[_0x3167db(0x1cc)](),_0x2ece6e=this[_0x3167db(0x107)](0x1,!![]),_0x5841f3=Graphics['boxWidth']-_0x21b9f3,_0x9a39d6=this['mainAreaTop']();return new Rectangle(_0x5841f3,_0x9a39d6,_0x21b9f3,_0x2ece6e);},Scene_Hospital['prototype']['createDataWindow']=function(){const _0x528a79=_0x53f24a,_0x3d799c=this[_0x528a79(0x1d9)](),_0x10f596=new Window_HospitalData(_0x3d799c);this[_0x528a79(0x7c)](_0x10f596),this[_0x528a79(0x105)]=_0x10f596,_0x10f596[_0x528a79(0xfb)](Window_HospitalData[_0x528a79(0x1b9)][_0x528a79(0x1ac)]);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1d9)]=function(){const _0x110ac6=_0x53f24a,_0x344864=Graphics[_0x110ac6(0xfa)],_0x4f7553=this[_0x110ac6(0xcb)]()-this[_0x110ac6(0x107)](0x1,!![]),_0x51d501=0x0,_0x459eee=this['mainAreaTop']()+this[_0x110ac6(0x107)](0x1,!![]);return new Rectangle(_0x51d501,_0x459eee,_0x344864,_0x4f7553);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x118)]=function(){const _0x31a5cf=_0x53f24a,_0x3c3637=this[_0x31a5cf(0x1b0)](),_0x23fc66=new Window_HospitalHealList(_0x3c3637);_0x23fc66[_0x31a5cf(0x184)](this[_0x31a5cf(0xd9)]),_0x23fc66[_0x31a5cf(0x171)]('ok',this['onHealListOk'][_0x31a5cf(0x192)](this)),_0x23fc66['setHandler']('cancel',this[_0x31a5cf(0x93)][_0x31a5cf(0x192)](this)),this[_0x31a5cf(0x7c)](_0x23fc66),this['_healListWindow']=_0x23fc66,_0x23fc66[_0x31a5cf(0xfb)](Window_HospitalHealList['SETTINGS'][_0x31a5cf(0x1ac)]);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1b0)]=function(){const _0x16a28a=_0x53f24a;if(this['isUsingShopBustStyleUI']())return this[_0x16a28a(0xab)]();if(VisuMZ[_0x16a28a(0x7a)][_0x16a28a(0x18e)][_0x16a28a(0x111)][_0x16a28a(0x109)])return VisuMZ[_0x16a28a(0x7a)][_0x16a28a(0x18e)][_0x16a28a(0x111)][_0x16a28a(0x109)][_0x16a28a(0x152)](this);const _0x4171e8=Graphics[_0x16a28a(0xfa)],_0x575eef=this[_0x16a28a(0xcb)]()-this[_0x16a28a(0x107)](0x1,!![]),_0x2ea1e8=0x0,_0x1c09ca=this[_0x16a28a(0xb7)]()+this[_0x16a28a(0x107)](0x1,!![]);return new Rectangle(_0x2ea1e8,_0x1c09ca,_0x4171e8,_0x575eef);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x137)]=function(){const _0x1d4a16=_0x53f24a,_0x3706e9=Scene_Hospital[_0x1d4a16(0x1b9)][_0x1d4a16(0x143)];if(_0x3706e9==='data'){if(_0x1d4a16(0x159)!=='YyuKL')this[_0x1d4a16(0x1d4)][_0x1d4a16(0x73)](),this[_0x1d4a16(0x105)]['show']();else return this[_0x1d4a16(0x1b1)]();}else _0x3706e9===_0x1d4a16(0xc4)&&(this[_0x1d4a16(0x1d4)][_0x1d4a16(0xf4)](),this[_0x1d4a16(0x105)][_0x1d4a16(0x73)]());},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x18a)]=function(){const _0x29c9df=_0x53f24a;this[_0x29c9df(0x1d4)][_0x29c9df(0x1ab)](),this[_0x29c9df(0x1d4)][_0x29c9df(0xec)](),this[_0x29c9df(0x1d4)][_0x29c9df(0x1b7)](0x0),this[_0x29c9df(0x1d4)][_0x29c9df(0xf4)](),this['_dataWindow'][_0x29c9df(0x73)]();if(this['isUsingShopBustStyleUI']()){if(_0x29c9df(0x148)===_0x29c9df(0x148))this[_0x29c9df(0xd9)][_0x29c9df(0xf4)](),this[_0x29c9df(0x13f)](_0x29c9df(0x18a));else{const _0x37fb30=this['commandStyleCheck'](_0x38f027);if(_0x37fb30===_0x29c9df(0x14c))this[_0x29c9df(0xc9)](_0x1cd0ea);else _0x37fb30===_0x29c9df(0xc2)?this[_0x29c9df(0x130)](_0x435a69):_0x32d2d3[_0x29c9df(0x131)]['drawItem'][_0x29c9df(0x152)](this,_0x56ab00);}}},Scene_Hospital[_0x53f24a(0x131)]['commandRewards']=function(){},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x169)]=function(){const _0x2a4e57=_0x53f24a,_0x549fdb=this[_0x2a4e57(0x1d4)][_0x2a4e57(0x16d)](),_0x43cdc8=_0x549fdb['hospitalCost']();$gameParty['loseGold'](_0x43cdc8),this[_0x2a4e57(0xa5)][_0x2a4e57(0x1ab)]();if(_0x549fdb===$gameParty){const _0x58c4a1=$gameParty[_0x2a4e57(0x161)]()[_0x2a4e57(0x86)](_0x1cacf8=>_0x1cacf8[_0x2a4e57(0x16a)]());for(const _0x3686eb of _0x58c4a1){_0x3686eb['hospitalHealAll']();}}else _0x549fdb[_0x2a4e57(0x182)]();this[_0x2a4e57(0x1d4)][_0x2a4e57(0xec)](),this['_healListWindow'][_0x2a4e57(0x1ab)](),this[_0x2a4e57(0x6f)]()&&this[_0x2a4e57(0x13f)](_0x2a4e57(0x169));},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x93)]=function(){const _0x510c91=_0x53f24a;this[_0x510c91(0x1d4)][_0x510c91(0x72)](),this[_0x510c91(0x1d4)][_0x510c91(0xe0)](0x0,0x0),this[_0x510c91(0x1d4)][_0x510c91(0x19f)](),this[_0x510c91(0x75)]['activate'](),this[_0x510c91(0x105)][_0x510c91(0x1ab)](),this['showNeutralWindow']();if(this[_0x510c91(0x6f)]()){if('oqzGV'!==_0x510c91(0x121))this[_0x510c91(0x13f)](_0x510c91(0x93)),this[_0x510c91(0xee)]();else{const _0x3f1cc2=_0x5df08b['SHOP_BUST_STYLE_UI'][_0x510c91(0x10b)],_0x450331=[this[_0x510c91(0xa5)],this[_0x510c91(0x75)],this['_healListWindow']];for(const _0x5dbc39 of _0x450331){_0x5dbc39[_0x510c91(0x187)]['x']=_0x5dbc39[_0x510c91(0x187)]['y']=_0x3f1cc2;}}}},Scene_Hospital['prototype'][_0x53f24a(0xf9)]=function(){const _0x2434ad=_0x53f24a;Scene_MenuBase['prototype'][_0x2434ad(0xf9)]['call'](this),this[_0x2434ad(0xb2)](this[_0x2434ad(0x1ae)]()),this['createCustomBackgroundImages']();},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1ae)]=function(){const _0x637706=_0x53f24a;return VisuMZ[_0x637706(0x7a)][_0x637706(0x18e)]['BgSettings'][_0x637706(0x1b3)];},Scene_Hospital['prototype'][_0x53f24a(0x87)]=function(){const _0x36ae93=_0x53f24a;if(this['meetsShopBustStyleUIConditions']()){if(_0x36ae93(0x17a)==='rqfyL'){this[_0x36ae93(0x14d)]();return;}else return _0x303b23['ShopBustStyleUI'][_0x36ae93(0x18e)][_0x36ae93(0x163)][_0x36ae93(0xff)][_0x36ae93(0x152)](this);}const _0x5704b9=VisuMZ[_0x36ae93(0x7a)][_0x36ae93(0x18e)]['BgSettings'];if(_0x5704b9&&(_0x5704b9[_0x36ae93(0x167)]!==''||_0x5704b9[_0x36ae93(0xb6)]!=='')){if(_0x36ae93(0x89)!==_0x36ae93(0x89)){const _0x444a34=this['actor']();if(_0x444a34===_0x1245cf){const _0x39d211=_0x2b43a9[_0x36ae93(0x1b9)][_0x36ae93(0x17b)];return _0x39d211[_0x36ae93(0x15a)](this[_0x36ae93(0x16d)]()[_0x36ae93(0xae)](),_0x4846d9[_0x36ae93(0x15c)]);}else{const _0x469d63=_0x39ee3e['SETTINGS'][_0x36ae93(0xf8)];return _0x469d63[_0x36ae93(0x15a)](this[_0x36ae93(0x16d)]()[_0x36ae93(0xae)](),_0x3ea6ec[_0x36ae93(0x15c)],_0x444a34['name'](),_0x444a34[_0x36ae93(0x16c)],_0x444a34[_0x36ae93(0x1d2)]()['name']);}}else this[_0x36ae93(0x1c0)]=new Sprite(ImageManager[_0x36ae93(0x155)](_0x5704b9[_0x36ae93(0x167)])),this['_backSprite2']=new Sprite(ImageManager[_0x36ae93(0x1b4)](_0x5704b9[_0x36ae93(0xb6)])),this[_0x36ae93(0xd6)](this[_0x36ae93(0x1c0)]),this['addChild'](this[_0x36ae93(0xa9)]),this[_0x36ae93(0x1c0)][_0x36ae93(0xb0)]['addLoadListener'](this[_0x36ae93(0xd3)]['bind'](this,this[_0x36ae93(0x1c0)])),this[_0x36ae93(0xa9)][_0x36ae93(0xb0)][_0x36ae93(0x196)](this[_0x36ae93(0xd3)][_0x36ae93(0x192)](this,this[_0x36ae93(0xa9)]));}},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xd3)]=function(_0x597023){const _0x395b6f=_0x53f24a;this[_0x395b6f(0x6d)](_0x597023),this['centerSprite'](_0x597023);};Imported[_0x53f24a(0x177)]&&(Scene_Hospital[_0x53f24a(0x1d3)]={'maxListSize':VisuMZ['ShopBustStyleUI']['Settings']['SceneHospitalData'][_0x53f24a(0x9d)]??0x8,'fadeout':VisuMZ[_0x53f24a(0x198)]['Settings'][_0x53f24a(0x12e)][_0x53f24a(0xb3)]??!![],'exitDelay':VisuMZ[_0x53f24a(0x198)][_0x53f24a(0x18e)][_0x53f24a(0x12e)]['exitDelay']??0x5dc,'windowScale':VisuMZ[_0x53f24a(0x198)][_0x53f24a(0x18e)][_0x53f24a(0x12e)]['windowScale']??0.8});;function _0x5e7d(){const _0x426fe4=['setHandler','Scene_Map_needsFadeIn','1288337EjXOky','itemTextAlign','CancelHelpDesc','Window_ShopMsg_RectJS','VisuMZ_3_ShopBustStyleUI','maxCostGlobal','ARRAYEVAL','rqfyL','partyHelpDescription','nUpdE','ConvertParams','drawItemObject','drawStateIcons','MeVbU','commandStyle','hospitalHealAll','push','setHelpWindow','callUpdateHelp','mmp','scale','Scene_Hospital_popScene','1074364lqWThm','commandHeal','textColor','YPKcQ','max','Settings','\x5cI[79]\x5cC[23]Total\x20%1\x20Recovered','_commandNameWindow','changePaintOpacity','bind','startFadeOut','dkSsU','commandOrder','addLoadListener','playRecovery','ShopBustStyleUI','index','iconWidth','contents','ARRAYFUNC','gold','needsFadeIn','deselect','wfsHN','dtYlA','56sCTbbx','HelpWindow_BgType','_hospitalStateCost','addRewardsCommand','hospitalDiscountRate','drawItemMpGauge','some','Jmsum','enabled','refresh','bgType','mainAreaBottom','getBackgroundOpacity','getShopBustStyleUI_MessageWindow_Rect','healListWindowRect','getShopBustStyleUI_CommandWindow_Rect','nkhNb','SnapshotOpacity','loadTitle2','status','drawIcon','smoothSelect','right','SETTINGS','postCreateWindowsShopBustStyleUI','start','HealListWindow_BgType','match','create','addCancelCommand','_backSprite1','totalHospitalStates','recoverAll','Game_System_initialize','clamp','commands','stop','ARRAYJSON','recoverAllColor','discountFmt','Heal\x20%1,\x20a\x20level\x20%2\x20%3.\x20\x0aThe\x20cost\x20for\x20recovery\x20will\x20be\x20%4\x5cC[16]%5\x5cC[0].','GoldWindow_BgType','mainCommandWidth','Window_HospitalCommand_RectJS','ActorHelpDesc','updateCommandNameWindow','drawItemFace','_shopBustStyleUI_MessageWindow','currentClass','SHOP_BUST_STYLE_UI','_healListWindow','Heal','text','updateHelp','CancelText','dataWindowRect','addCommand','isRewardsCommandVisible','helpWindow_BgType','popScene','WBduI','IZDRb','Vocab','clear','playShop','scaleSprite','RegExp','isUsingShopBustStyleUI','_hospitalDiscountRate','xNUdD','deactivate','hide','parameters','_commandWindow','ioNIe','toFixed','getColor','uZxBb','HospitalShop','isActorEnabled','addWindow','UeSAD','drawItemDiscount','drawItemName','3046267KUHEwC','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ldUor','Vtcmu','qCRIY','isCustomCommandVisible','filter','createCustomBackgroundImages','fagYW','CqkQJ','auto','leader','itemRect','registerCommand','costDeathPerLevel','playOkSound','initialize','drawItem','inBattle','onHealListCancel','FUNC','parse','goldWindowRect','iconHeight','commandNameWindowDrawText','textSizeEx','commandStyleCheck','exitShopBustStyleUI','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','maxListSize','CancelIcon','playBuzzerSound','ulLUJ','createShopBustStyleUI_MessageWindow','Fivqo','Acquire\x20rewards\x20based\x20on\x20healing\x20totals\x20made.','\x5cI[87]\x20\x5cC[6]Party\x20Discount:\x5cC[0]\x20\x5cC[24]%1\x5cC[0]%\x20\x5cI[87]','_goldWindow','deaths','ceil','HealIcon','_backSprite2','CommandWindow_Style','getShopBustStyleUI_HealListWindow_Rect','isDead','length','hospitalCost','commandNameWindowCenter','bitmap','getHospitalBustStyleUISettings','setBackgroundOpacity','fadeout','NUM','isCustomCommandEnabled','BgFilename2','mainAreaTop','CommandWindow_RectJS','min','Exit','getShopBustStyleUISettings','defaultStateCost','7371165AHuZXV','ARRAYSTR','processExitShopBustStyleUI','maxCostPerLevel','help','icon','isUsingHospitalBustStyleUI','heal','createCommandNameWindow','itemLineRect','innerHeight','WTrtn','drawItemStyleIconText','floor','mainAreaHeight','cancel','_states','center','commandNameWindowDrawBackground','WqdsZ','drawMpGauge','isCommandEnabled','adjustSprite','Scene_Hospital_start','createGoldWindow','addChild','commandRewards','bitmapHeight','_helpWindow','height','drawActorFace','maxItems','CommandWindow_BgType','IjXnX','Window_Gold_RectJS','scrollTo','hospitalStateCost','constructor','playBuzzer','shouldDisplayBreakShields','startFadeIn','getHospitalStates','DiscountRate','drawActorName','resetFontSettings','474242YSgHzz','StateCost','activate','defaultPartyDiscount','hideWindowsShopBustStyleUI','reduce','maxCols','wnwxf','resetTextColor','drawText','show','commandWindowRect','innerWidth','drawHpGauge','actorHelpDescription','createBackground','boxWidth','setBackgroundType','isCurrentItemEnabled','placeGauge','EVAL','Window_HospitalHealList_RectJS','createHelpWindow','PartyHelpDesc','hJmFn','_scene','isRewardsCommandEnabled','_dataWindow','map','calcWindowHeight','close','HealListWindow_RectJS','HOSPITAL','windowScale','drawTextEx','STR','lineHeight','5219376MduPEe','Leave\x20the\x20hospital\x20shop.','Window','hasHospitalState','setText','getShopBustStyleUI_GoldWindow_Rect','width','return\x200','size','createHealListWindow','note','meetsShopBustStyleUIConditions','SceneOpenHospitalShop','setMessage','name','hdwsK','drawItemHpGauge','createHelpText','OjABi','faceWidth','WWdez','STRUCT','toUpperCase','Scene_Map_stop','initHospitalShopData','HealHelpDesc','hdOtb','ExIdq','faceName','isPreviousScene','showVisualGoldDisplay','SceneHospitalData','hospitalShopData','drawItemStyleIcon','prototype','changeTextColor','adjustWindowScaleShopBustStyleUI','windowPadding','\x5cI[70]\x5cC[2]Total\x20Lives\x20Revived','tCvWi','showNeutralWindow','version','remove','mhp','853851dCjjHo','rewards','costPerHp','JSON','setBustStyleUIMessageType','Heals\x20all\x20party\x20members.\x20\x0aThe\x20cost\x20for\x20recovery\x20will\x20be\x20%1\x5cC[16]%2\x5cC[0].','getTotalCommandWindowCommands','ARRAYNUM','neutralWindow','costPerMp','isNextScene','drawCurrencyValue','jhdOF','YwgKM','drawItemCost','states','iconsDrawn','iconText','createShopBustStyleUI_CustomBackground','replace','bitmapWidth','loadFace','addRecoverAll','call','description','_maxCols','loadTitle1','exit','\x5cI[%1]%2','LwkXW','XTOEO','format','\x5cI[84]\x5cC[24]Total\x20Ailments\x20Reversed','currencyUnit','setHospitalDiscountRate','General','prepareActorFace','HealText','members','ARRAYSTRUCT','SceneShopData','recoverAllText','makeCommandList','drawActorIcons','BgFilename1','isSceneBattle','onHealListOk','needsHospitalHealing','%1Fmt','level','actor','HkXAe','commandName','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'];_0x5e7d=function(){return _0x426fe4;};return _0x5e7d();}Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xbb)]=function(){const _0x4ec4bf=_0x53f24a;if(!Imported[_0x4ec4bf(0x177)])return{};return $gameSystem[_0x4ec4bf(0xb1)]();},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x6f)]=function(){const _0x5ecb80=_0x53f24a;if(!Imported[_0x5ecb80(0x177)])return![];return this[_0x5ecb80(0xbb)]()[_0x5ecb80(0x1aa)];},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x11a)]=function(){return this['isUsingShopBustStyleUI']();},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1ba)]=function(){const _0x4273d3=_0x53f24a;this[_0x4273d3(0xa1)](),this[_0x4273d3(0x133)](),this[_0x4273d3(0xee)](),this['setBustStyleUIMessageType']('welcome');},Scene_Hospital['prototype']['adjustWindowScaleShopBustStyleUI']=function(){const _0x5cc9b1=_0x53f24a,_0x245da4=Scene_Hospital['SHOP_BUST_STYLE_UI']['windowScale'],_0x5667c8=[this[_0x5cc9b1(0xa5)],this['_commandWindow'],this['_healListWindow']];for(const _0x4e311d of _0x5667c8){_0x4e311d[_0x5cc9b1(0x187)]['x']=_0x4e311d['scale']['y']=_0x245da4;}},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xee)]=function(){const _0x4d5384=_0x53f24a;this[_0x4d5384(0xd9)][_0x4d5384(0x73)](),this['_healListWindow'][_0x4d5384(0x73)]();},VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0xd4)]=Scene_Hospital['prototype'][_0x53f24a(0x1bb)],Scene_Hospital[_0x53f24a(0x131)]['start']=function(){const _0x1e93bd=_0x53f24a;VisuMZ[_0x1e93bd(0x7a)][_0x1e93bd(0xd4)][_0x1e93bd(0x152)](this),this['isUsingShopBustStyleUI']()&&Scene_Hospital[_0x1e93bd(0x1d3)][_0x1e93bd(0xb3)]&&this[_0x1e93bd(0xe5)]();},VisuMZ[_0x53f24a(0x7a)]['Scene_Map_stop']=Scene_Map[_0x53f24a(0x131)][_0x53f24a(0x1c6)],Scene_Map['prototype'][_0x53f24a(0x1c6)]=function(){const _0x14b00b=_0x53f24a;VisuMZ[_0x14b00b(0x7a)][_0x14b00b(0x126)][_0x14b00b(0x152)](this),SceneManager[_0x14b00b(0x145)](Scene_Hospital)&&Imported['VisuMZ_3_ShopBustStyleUI']&&$gameSystem['isUsingHospitalBustStyleUI']()&&Scene_Hospital[_0x14b00b(0x1d3)][_0x14b00b(0xb3)]&&this[_0x14b00b(0x193)]();},VisuMZ[_0x53f24a(0x7a)]['Scene_Hospital_popScene']=Scene_Hospital['prototype'][_0x53f24a(0x1dd)],Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1dd)]=function(){const _0x1e1b9c=_0x53f24a;this[_0x1e1b9c(0x6f)]()?this[_0x1e1b9c(0x9b)]():'nkhNb'===_0x1e1b9c(0x1b2)?VisuMZ[_0x1e1b9c(0x7a)][_0x1e1b9c(0x188)][_0x1e1b9c(0x152)](this):_0x4705b1[_0x1e1b9c(0x131)][_0x1e1b9c(0x91)][_0x1e1b9c(0x152)](this,_0x1dc962);},Scene_Hospital['prototype']['exitShopBustStyleUI']=function(){const _0x15e350=_0x53f24a;this[_0x15e350(0x1d1)]&&this[_0x15e350(0x1d1)][_0x15e350(0x11c)]('leave');this[_0x15e350(0x75)][_0x15e350(0x108)](),this[_0x15e350(0xa5)][_0x15e350(0x108)]();const _0x52ee1e=Scene_Hospital[_0x15e350(0x1d3)]['exitDelay'];setTimeout(this[_0x15e350(0xbf)][_0x15e350(0x192)](this),_0x52ee1e);},Scene_Hospital['prototype'][_0x53f24a(0xbf)]=function(){const _0x1d6fbd=_0x53f24a;Scene_Hospital['SHOP_BUST_STYLE_UI'][_0x1d6fbd(0xb3)]&&this['startFadeOut'](),VisuMZ['HospitalShop'][_0x1d6fbd(0x188)]['call'](this);},VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x172)]=Scene_Map['prototype'][_0x53f24a(0x19e)],Scene_Map['prototype']['needsFadeIn']=function(){const _0x1d8608=_0x53f24a;if(SceneManager[_0x1d8608(0x12c)](Scene_Hospital)&&Imported[_0x1d8608(0x177)]&&$gameSystem[_0x1d8608(0xc3)]()&&Scene_Hospital[_0x1d8608(0x1d3)][_0x1d8608(0xb3)])return!![];return VisuMZ[_0x1d8608(0x7a)][_0x1d8608(0x172)]['call'](this);},Scene_Hospital['prototype'][_0x53f24a(0x1b1)]=function(){const _0x29e3a9=_0x53f24a;if(VisuMZ[_0x29e3a9(0x198)][_0x29e3a9(0x18e)]['SceneHospitalData'][_0x29e3a9(0x1cd)])return'zhsua'!==_0x29e3a9(0x1de)?VisuMZ[_0x29e3a9(0x198)][_0x29e3a9(0x18e)]['SceneHospitalData']['Window_HospitalCommand_RectJS'][_0x29e3a9(0x152)](this):_0x467888[_0x29e3a9(0x1b9)][_0x29e3a9(0x151)];const _0x49e759=this[_0x29e3a9(0x1cc)](),_0x165df7=this[_0x29e3a9(0x107)](this[_0x29e3a9(0x141)](),!![]),_0x341a10=Math[_0x29e3a9(0xca)]((Graphics['boxWidth']-Math['min'](Graphics[_0x29e3a9(0xfa)],0x330))/0x2),_0x41bca6=this['mainAreaTop']()+0x64;return new Rectangle(_0x341a10,_0x41bca6,_0x49e759,_0x165df7);},Scene_Hospital[_0x53f24a(0x131)]['getTotalCommandWindowCommands']=function(){let _0x54597e=0x2;return _0x54597e;},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x114)]=function(){const _0x194f54=_0x53f24a;if(VisuMZ[_0x194f54(0x198)][_0x194f54(0x18e)][_0x194f54(0x163)][_0x194f54(0xdf)])return VisuMZ[_0x194f54(0x198)]['Settings'][_0x194f54(0x163)][_0x194f54(0xdf)][_0x194f54(0x152)](this);const _0x12b9c6=Scene_Hospital[_0x194f54(0x1d3)][_0x194f54(0x10b)],_0x3feb47=this[_0x194f54(0x1cc)]()/_0x12b9c6,_0x2ec1fb=this[_0x194f54(0x107)](0x1,!![]),_0x2c4628=Math[_0x194f54(0xca)]((Graphics[_0x194f54(0xfa)]-_0x3feb47)/0x2),_0x43e602=this[_0x194f54(0x1ad)]()-this['calcWindowHeight'](0x4,![])-Math[_0x194f54(0xca)](_0x2ec1fb*_0x12b9c6);return new Rectangle(_0x2c4628,_0x43e602,_0x3feb47,_0x2ec1fb);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0xab)]=function(){const _0x213f96=_0x53f24a;if(VisuMZ[_0x213f96(0x198)]['Settings'][_0x213f96(0x163)][_0x213f96(0xff)])return VisuMZ[_0x213f96(0x198)][_0x213f96(0x18e)][_0x213f96(0x163)]['Window_HospitalHealList_RectJS'][_0x213f96(0x152)](this);const _0x561501=Scene_Hospital[_0x213f96(0x1d3)][_0x213f96(0x10b)],_0x5cfc50=Scene_Hospital[_0x213f96(0x1d3)][_0x213f96(0x9d)],_0x4f02fc=Math[_0x213f96(0xb9)](Graphics[_0x213f96(0xfa)],0x330),_0x5724fa=Math[_0x213f96(0xa7)](this[_0x213f96(0xcb)]()-this[_0x213f96(0x107)](0x4,![])-this[_0x213f96(0x107)](0x1,!![])*_0x561501),_0x5f3be2=Math[_0x213f96(0xb9)]((Graphics['boxWidth']-_0x4f02fc)/0x2,0xc0),_0x3f3166=_0x4f02fc+_0x5f3be2,_0x25803a=Math[_0x213f96(0xb9)](Math['floor'](_0x5724fa/_0x561501),this['calcWindowHeight'](_0x5cfc50,!![])),_0x1cb2b6=Math[_0x213f96(0xca)]((Graphics[_0x213f96(0xfa)]-_0x4f02fc)/0x4),_0x5e478b=this[_0x213f96(0xb7)]()+Math[_0x213f96(0xca)]((_0x5724fa-_0x25803a*_0x561501)/0x2);return new Rectangle(_0x1cb2b6,_0x5e478b,_0x3f3166,_0x25803a);},Scene_Hospital[_0x53f24a(0x131)][_0x53f24a(0x1af)]=function(){const _0x5c0369=_0x53f24a;if(VisuMZ[_0x5c0369(0x198)][_0x5c0369(0x18e)][_0x5c0369(0x163)][_0x5c0369(0x176)])return VisuMZ[_0x5c0369(0x198)][_0x5c0369(0x18e)]['SceneShopData'][_0x5c0369(0x176)][_0x5c0369(0x152)](this);const _0x5bc055=Math['min'](Graphics[_0x5c0369(0xfa)],0x330),_0x4806cf=this[_0x5c0369(0x107)](0x4,![]),_0x413b50=Math['floor']((Graphics[_0x5c0369(0xfa)]-_0x5bc055)/0x2),_0x5734b9=this[_0x5c0369(0x1ad)]()-_0x4806cf;return new Rectangle(_0x413b50,_0x5734b9,_0x5bc055,_0x4806cf);};function Window_HospitalCommand(){const _0xc8605b=_0x53f24a;this[_0xc8605b(0x90)](...arguments);}Window_HospitalCommand['prototype']=Object[_0x53f24a(0x1be)](Window_HorzCommand['prototype']),Window_HospitalCommand[_0x53f24a(0x131)]['constructor']=Window_HospitalCommand,Window_HospitalCommand[_0x53f24a(0x1b9)]={'bgType':VisuMZ['HospitalShop']['Settings'][_0x53f24a(0x111)][_0x53f24a(0xdd)]??0x0,'commandStyle':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0xaa)]??_0x53f24a(0x8a),'commands':{'heal':{'show':!![],'text':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x160)]??_0x53f24a(0x1d5),'icon':VisuMZ[_0x53f24a(0x7a)]['Settings'][_0x53f24a(0x1e0)][_0x53f24a(0xa8)]??0x48,'help':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x128)]??'Select\x20a\x20party\x20member\x20to\x20fully\x20heal.'},'rewards':{'show':![],'text':'Rewards','icon':0x57,'help':_0x53f24a(0xa3)},'cancel':{'show':!![],'text':VisuMZ['HospitalShop'][_0x53f24a(0x18e)]['Vocab'][_0x53f24a(0x1d8)]??_0x53f24a(0xba),'icon':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x9e)]??0x52,'help':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x175)]??_0x53f24a(0x110)}},'commandOrder':[_0x53f24a(0xc4),'rewards',_0x53f24a(0xcc)]},Window_HospitalCommand['prototype'][_0x53f24a(0x90)]=function(_0x5df150){const _0x43a1f2=_0x53f24a;Window_HorzCommand['prototype'][_0x43a1f2(0x90)][_0x43a1f2(0x152)](this,_0x5df150),this[_0x43a1f2(0xc5)](_0x5df150);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x185)]=function(){const _0x4c24e0=_0x53f24a;Window_HorzCommand[_0x4c24e0(0x131)][_0x4c24e0(0x185)][_0x4c24e0(0x152)](this);if(this['_commandNameWindow'])this[_0x4c24e0(0x1cf)]();},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0xf0)]=function(){const _0x1bb303=_0x53f24a;if(this[_0x1bb303(0x154)]!==undefined)return this[_0x1bb303(0x154)];if(SceneManager[_0x1bb303(0x103)]&&SceneManager[_0x1bb303(0x103)]['isUsingShopBustStyleUI']())return 0x1;this['_maxCols']=0x2;const _0x5a44b7=Window_HospitalCommand['SETTINGS'][_0x1bb303(0x1c5)],_0x43d0c9=[_0x1bb303(0x13c)];for(const _0xdadc67 of _0x43d0c9){if(_0x5a44b7[_0xdadc67]&&_0x5a44b7[_0xdadc67][_0x1bb303(0xf4)])this[_0x1bb303(0x154)]++;}return this[_0x1bb303(0x154)];},Window_HospitalCommand[_0x53f24a(0x131)]['createCommandNameWindow']=function(_0x5d8ffc){const _0x11eda1=_0x53f24a,_0x236411=new Rectangle(0x0,0x0,_0x5d8ffc[_0x11eda1(0x115)],_0x5d8ffc[_0x11eda1(0xda)]);this['_commandNameWindow']=new Window_Base(_0x236411),this['_commandNameWindow']['opacity']=0x0,this[_0x11eda1(0xd6)](this['_commandNameWindow']),this[_0x11eda1(0x1cf)]();},Window_HospitalCommand[_0x53f24a(0x131)]['updateCommandNameWindow']=function(){const _0x3e7f9f=_0x53f24a,_0x4405e8=this[_0x3e7f9f(0x190)];_0x4405e8[_0x3e7f9f(0x19b)][_0x3e7f9f(0x1e1)]();const _0x13fb1f=this[_0x3e7f9f(0x9a)](this[_0x3e7f9f(0x199)]());if(_0x13fb1f===_0x3e7f9f(0xc2)){const _0x3e50fb=this[_0x3e7f9f(0xc6)](this['index']());let _0x4b1d86=this['commandName'](this[_0x3e7f9f(0x199)]());_0x4b1d86=_0x4b1d86[_0x3e7f9f(0x14e)](/\\I\[(\d+)\]/gi,''),_0x4405e8[_0x3e7f9f(0xe9)](),this[_0x3e7f9f(0xcf)](_0x4b1d86,_0x3e50fb),this[_0x3e7f9f(0x98)](_0x4b1d86,_0x3e50fb),this[_0x3e7f9f(0xaf)](_0x4b1d86,_0x3e50fb);}},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0xcf)]=function(_0xc23974,_0x59e0e7){},Window_HospitalCommand[_0x53f24a(0x131)]['commandNameWindowDrawText']=function(_0x419ea5,_0x358588){const _0x45b8fd=_0x53f24a,_0x28e98c=this['_commandNameWindow'];_0x28e98c[_0x45b8fd(0xf3)](_0x419ea5,0x0,_0x358588['y'],_0x28e98c[_0x45b8fd(0xf6)],_0x45b8fd(0xce));},Window_HospitalCommand['prototype']['commandNameWindowCenter']=function(_0x3991e1,_0x251a38){const _0x3c7a7c=_0x53f24a,_0x41fcd7=this[_0x3c7a7c(0x190)],_0x441832=$gameSystem[_0x3c7a7c(0x134)](),_0x238263=_0x251a38['x']+Math[_0x3c7a7c(0xca)](_0x251a38[_0x3c7a7c(0x115)]/0x2)+_0x441832;_0x41fcd7['x']=_0x41fcd7['width']/-0x2+_0x238263,_0x41fcd7['y']=Math['floor'](_0x251a38[_0x3c7a7c(0xda)]/0x2);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x165)]=function(){const _0x345373=_0x53f24a;for(const _0x59a51b of Window_HospitalCommand[_0x345373(0x1b9)][_0x345373(0x195)]){this['addCustomCommand'](_0x59a51b);}},Window_HospitalCommand[_0x53f24a(0x131)]['addCustomCommand']=function(_0x1f23c2){const _0x216904=_0x53f24a,_0x1b89db=Window_HospitalCommand[_0x216904(0x1b9)][_0x216904(0x1c5)][_0x1f23c2];if(!this[_0x216904(0x85)](_0x1b89db))return;const _0x476e64=_0x1f23c2,_0x2086cc=Number(_0x1b89db['icon']);let _0x39d909=_0x1b89db[_0x216904(0x1d6)];if(_0x2086cc>0x0&&this[_0x216904(0x181)]()!=='text'){if(_0x216904(0x12a)!==_0x216904(0x7d))_0x39d909=_0x216904(0x157)[_0x216904(0x15a)](_0x2086cc,_0x39d909);else return this[_0x216904(0x18b)](_0x484b32(_0x395903));}const _0x2da35d=this['isCustomCommandEnabled'](_0x1b89db);this[_0x216904(0x1da)](_0x39d909,_0x476e64,_0x2da35d);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x85)]=function(_0x59c329){const _0x110b0b=_0x53f24a;return _0x59c329[_0x110b0b(0xf4)];},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0xb5)]=function(_0x5004a4){return!![];},Window_HospitalCommand['prototype'][_0x53f24a(0x1a5)]=function(){const _0x4c38ae=_0x53f24a;if(!this[_0x4c38ae(0x1db)]())return;const _0x2e21da=Window_HospitalCommand[_0x4c38ae(0x1b9)][_0x4c38ae(0x1c5)],_0x5c6d93=_0x4c38ae(0x13c),_0x20014f=_0x2e21da[_0x4c38ae(0x13c)][_0x4c38ae(0xc2)];let _0x1ee2c4=_0x2e21da[_0x4c38ae(0x13c)][_0x4c38ae(0x1d6)];_0x20014f>0x0&&this[_0x4c38ae(0x181)]()!==_0x4c38ae(0x1d6)&&(_0x4c38ae(0x158)!==_0x4c38ae(0x158)?(this[_0x4c38ae(0x13f)](_0x4c38ae(0x93)),this[_0x4c38ae(0xee)]()):_0x1ee2c4='\x5cI[%1]%2'[_0x4c38ae(0x15a)](_0x20014f,_0x1ee2c4));const _0x31f826=this['isRewardsCommandEnabled']();this[_0x4c38ae(0x1da)](_0x1ee2c4,_0x5c6d93,_0x31f826);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x1db)]=function(){const _0x57aabc=_0x53f24a;return Window_HospitalCommand[_0x57aabc(0x1b9)][_0x57aabc(0x1c5)][_0x57aabc(0x13c)]['show'];},Window_HospitalCommand['prototype'][_0x53f24a(0x104)]=function(){return!![];},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x1bf)]=function(){const _0x57d516=_0x53f24a,_0x13b67a=Window_HospitalCommand[_0x57d516(0x1b9)][_0x57d516(0x1c5)],_0x440187='cancel',_0x541e8e=_0x13b67a[_0x57d516(0xcc)][_0x57d516(0xc2)];let _0x24df4c=_0x13b67a[_0x57d516(0xcc)][_0x57d516(0x1d6)];_0x541e8e>0x0&&this[_0x57d516(0x181)]()!==_0x57d516(0x1d6)&&(_0x24df4c=_0x57d516(0x157)[_0x57d516(0x15a)](_0x541e8e,_0x24df4c));const _0x13e003=!![];this['addCommand'](_0x24df4c,_0x440187,_0x13e003);},Window_HospitalCommand[_0x53f24a(0x131)]['itemTextAlign']=function(){const _0x47538c=_0x53f24a;return _0x47538c(0xce);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x91)]=function(_0x1e3387){const _0x5bbd57=_0x53f24a,_0x364df8=this[_0x5bbd57(0x9a)](_0x1e3387);if(_0x364df8===_0x5bbd57(0x14c))this[_0x5bbd57(0xc9)](_0x1e3387);else{if(_0x364df8===_0x5bbd57(0xc2)){if('ptvXK'==='ptvXK')this[_0x5bbd57(0x130)](_0x1e3387);else{const _0xf2623=this[_0x5bbd57(0xc6)](_0x1b8a56),_0x3f345f=this[_0x5bbd57(0x16f)](_0x216047),_0x394dce=this['textSizeEx'](_0x3f345f)[_0x5bbd57(0x115)];this[_0x5bbd57(0x191)](this[_0x5bbd57(0xd2)](_0x346bad));const _0x459f18=this[_0x5bbd57(0x174)]();if(_0x459f18==='right')this[_0x5bbd57(0x10c)](_0x3f345f,_0xf2623['x']+_0xf2623['width']-_0x394dce,_0xf2623['y'],_0x394dce);else{if(_0x459f18===_0x5bbd57(0xce)){const _0x5a62fb=_0xf2623['x']+_0x5e957f['floor']((_0xf2623[_0x5bbd57(0x115)]-_0x394dce)/0x2);this[_0x5bbd57(0x10c)](_0x3f345f,_0x5a62fb,_0xf2623['y'],_0x394dce);}else this[_0x5bbd57(0x10c)](_0x3f345f,_0xf2623['x'],_0xf2623['y'],_0x394dce);}}}else'WqdsZ'!==_0x5bbd57(0xd0)?this[_0x5bbd57(0x1a4)][_0x220a62]=_0xa376e2(_0x1f0c9d['$1']):Window_HorzCommand['prototype']['drawItem']['call'](this,_0x1e3387);}},Window_HospitalCommand['prototype'][_0x53f24a(0x181)]=function(){const _0x315b6f=_0x53f24a;return Window_HospitalCommand['SETTINGS'][_0x315b6f(0x181)];},Window_HospitalCommand['prototype'][_0x53f24a(0x9a)]=function(_0x3dc540){const _0x2aede6=_0x53f24a;if(_0x3dc540<0x0)return'text';const _0x57d96b=this[_0x2aede6(0x181)]();if(_0x57d96b!=='auto')return _0x57d96b;else{if(this[_0x2aede6(0xdc)]()>0x0){const _0x1c93ae=this['commandName'](_0x3dc540);if(_0x1c93ae[_0x2aede6(0x1bd)](/\\I\[(\d+)\]/i)){const _0x38def7=this[_0x2aede6(0xc6)](_0x3dc540),_0x1b5202=this[_0x2aede6(0x99)](_0x1c93ae)[_0x2aede6(0x115)];return _0x1b5202<=_0x38def7[_0x2aede6(0x115)]?_0x2aede6(0x76)===_0x2aede6(0xa2)?this[_0x2aede6(0x70)]=_0x3847e[_0x2aede6(0x1c4)](0x0,0x1):_0x2aede6(0x14c):'icon';}}}return'text';},Window_HospitalCommand[_0x53f24a(0x131)]['drawItemStyleIconText']=function(_0x1ed6ca){const _0x2b8f09=_0x53f24a,_0x3391aa=this[_0x2b8f09(0xc6)](_0x1ed6ca),_0x325a7b=this[_0x2b8f09(0x16f)](_0x1ed6ca),_0x352540=this['textSizeEx'](_0x325a7b)[_0x2b8f09(0x115)];this['changePaintOpacity'](this[_0x2b8f09(0xd2)](_0x1ed6ca));const _0x2066e6=this['itemTextAlign']();if(_0x2066e6===_0x2b8f09(0x1b8)){if(_0x2b8f09(0x88)===_0x2b8f09(0x194)){const _0x4c9321=_0x5db905['SETTINGS'][_0x2b8f09(0x143)];if(_0x4c9321==='data')this[_0x2b8f09(0x1d4)]['hide'](),this[_0x2b8f09(0x105)][_0x2b8f09(0xf4)]();else _0x4c9321===_0x2b8f09(0xc4)&&(this[_0x2b8f09(0x1d4)][_0x2b8f09(0xf4)](),this[_0x2b8f09(0x105)][_0x2b8f09(0x73)]());}else this[_0x2b8f09(0x10c)](_0x325a7b,_0x3391aa['x']+_0x3391aa[_0x2b8f09(0x115)]-_0x352540,_0x3391aa['y'],_0x352540);}else{if(_0x2066e6==='center'){const _0x4e814d=_0x3391aa['x']+Math[_0x2b8f09(0xca)]((_0x3391aa[_0x2b8f09(0x115)]-_0x352540)/0x2);this['drawTextEx'](_0x325a7b,_0x4e814d,_0x3391aa['y'],_0x352540);}else this[_0x2b8f09(0x10c)](_0x325a7b,_0x3391aa['x'],_0x3391aa['y'],_0x352540);}},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x130)]=function(_0x1b7d2f){const _0x55cbab=_0x53f24a;this[_0x55cbab(0x16f)](_0x1b7d2f)[_0x55cbab(0x1bd)](/\\I\[(\d+)\]/i);const _0x207d84=Number(RegExp['$1'])||0x0,_0x3087d6=this[_0x55cbab(0xc6)](_0x1b7d2f),_0x3a3d82=_0x3087d6['x']+Math[_0x55cbab(0xca)]((_0x3087d6[_0x55cbab(0x115)]-ImageManager[_0x55cbab(0x19a)])/0x2),_0x3e3a23=_0x3087d6['y']+(_0x3087d6[_0x55cbab(0xda)]-ImageManager['iconHeight'])/0x2;this[_0x55cbab(0x1b6)](_0x207d84,_0x3a3d82,_0x3e3a23);},Window_HospitalCommand[_0x53f24a(0x131)][_0x53f24a(0x1d7)]=function(){const _0x37ff1e=_0x53f24a;Window_HorzCommand[_0x37ff1e(0x131)]['updateHelp']['call'](this);if(this[_0x37ff1e(0xd9)]){const _0x415002=this['currentSymbol'](),_0x3bb24b=Window_HospitalCommand['SETTINGS'][_0x37ff1e(0x1c5)];this['_helpWindow'][_0x37ff1e(0x113)](_0x3bb24b[_0x415002][_0x37ff1e(0xc1)]||'');}};function Window_HospitalData(){this['initialize'](...arguments);}Window_HospitalData[_0x53f24a(0x131)]=Object[_0x53f24a(0x1be)](Window_Base[_0x53f24a(0x131)]),Window_HospitalData[_0x53f24a(0x131)][_0x53f24a(0xe2)]=Window_HospitalData,Window_HospitalData[_0x53f24a(0x1b9)]={'bgType':0x0,'order':['hp','mp',_0x53f24a(0xa6),_0x53f24a(0x14a)],'hpFmt':'\x5cI[72]\x5cC[21]Total\x20%1\x20Healed','mpFmt':_0x53f24a(0x18f),'deathsFmt':_0x53f24a(0x135),'statesFmt':_0x53f24a(0x15b)},Window_HospitalData[_0x53f24a(0x131)][_0x53f24a(0x90)]=function(_0x19d75d){const _0x146f61=_0x53f24a;Window_Base[_0x146f61(0x131)][_0x146f61(0x90)]['call'](this,_0x19d75d),this['refresh']();},Window_HospitalData[_0x53f24a(0x131)][_0x53f24a(0x1ab)]=function(){const _0x857cde=_0x53f24a;this[_0x857cde(0x19b)][_0x857cde(0x1e1)]();const _0x3807c3=$gameSystem[_0x857cde(0x12f)](),_0x592902=Window_HospitalData['SETTINGS']['order'],_0x538448=_0x592902[_0x857cde(0xad)],_0x2e56bb=_0x538448*this[_0x857cde(0x10e)](),_0x3db6c8=Math[_0x857cde(0xca)](this[_0x857cde(0xf6)]/0x4),_0xbb41fc=Math[_0x857cde(0xca)]((this[_0x857cde(0xc7)]-_0x2e56bb)/0x2),_0x177e9f=Math[_0x857cde(0xa7)](this['innerWidth']/0x2);let _0x50fa02=_0x3db6c8,_0x40d2c5=_0xbb41fc;for(const _0x404fcc of _0x592902){if(_0x3807c3[_0x404fcc]===undefined)continue;const _0x2d92bc=_0x857cde(0x16b)['format'](_0x404fcc),_0x543bc8=Window_HospitalData['SETTINGS'][_0x2d92bc],_0x3cdfec=_0x543bc8[_0x857cde(0x15a)](TextManager[_0x404fcc]||'');this[_0x857cde(0xe9)](),this[_0x857cde(0x10c)](_0x3cdfec,_0x50fa02,_0x40d2c5),this[_0x857cde(0xe9)]();const _0x491cb9=_0x3807c3[_0x404fcc]||0x0;this['drawText'](_0x491cb9,_0x50fa02,_0x40d2c5,_0x177e9f,_0x857cde(0x1b8)),_0x40d2c5+=this[_0x857cde(0x10e)]();}};function Window_HospitalHealList(){const _0x463999=_0x53f24a;this[_0x463999(0x90)](...arguments);}Window_HospitalHealList['prototype']=Object[_0x53f24a(0x1be)](Window_StatusBase[_0x53f24a(0x131)]),Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0xe2)]=Window_HospitalHealList,Window_HospitalHealList[_0x53f24a(0x1b9)]={'bgType':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0x1bc)]??0x0,'drawActorFace':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)]['drawActorFace']??!![],'drawActorName':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0xe8)]??!![],'drawHpGauge':VisuMZ['HospitalShop'][_0x53f24a(0x18e)]['Window'][_0x53f24a(0xf7)]??!![],'drawMpGauge':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0xd1)]??!![],'drawStateIcons':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x111)][_0x53f24a(0x17f)]??!![],'iconsDrawn':VisuMZ[_0x53f24a(0x7a)]['Settings']['Window'][_0x53f24a(0x14b)]??0x4,'addRecoverAll':VisuMZ[_0x53f24a(0x7a)]['Settings'][_0x53f24a(0x111)][_0x53f24a(0x151)]??!![],'recoverAllText':VisuMZ['HospitalShop'][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x164)]??'Heal\x20All','recoverAllColor':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x1c8)]??0x18,'discountFmt':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x1c9)]??_0x53f24a(0xa4),'discountDecimals':VisuMZ['HospitalShop'][_0x53f24a(0x18e)][_0x53f24a(0x1e0)]['discountDecimals']??0x2,'actorHelpDescription':VisuMZ[_0x53f24a(0x7a)][_0x53f24a(0x18e)][_0x53f24a(0x1e0)][_0x53f24a(0x1ce)]??_0x53f24a(0x1ca),'partyHelpDescription':VisuMZ[_0x53f24a(0x7a)]['Settings'][_0x53f24a(0x1e0)][_0x53f24a(0x101)]??_0x53f24a(0x140)},Window_HospitalHealList['prototype']['initialize']=function(_0x1a8f40){const _0x1ab2e6=_0x53f24a;Window_StatusBase[_0x1ab2e6(0x131)][_0x1ab2e6(0x90)][_0x1ab2e6(0x152)](this,_0x1a8f40),this[_0x1ab2e6(0x1ab)]();},Window_HospitalHealList['prototype'][_0x53f24a(0xdc)]=function(){const _0x236c80=_0x53f24a;return $gameParty[_0x236c80(0x117)]()+(this[_0x236c80(0x151)]()?0x1:0x0);},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x151)]=function(){const _0x549e6c=_0x53f24a;return Window_HospitalHealList['SETTINGS'][_0x549e6c(0x151)];},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x16d)]=function(){const _0x106eff=_0x53f24a;let _0x15c3be=Math[_0x106eff(0x18d)](this[_0x106eff(0x199)](),0x0);if(this[_0x106eff(0x151)]()){if(_0x15c3be===0x0)return $gameParty;_0x15c3be--;}return $gameParty[_0x106eff(0x161)]()[_0x15c3be];},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x8f)]=function(){const _0x150096=_0x53f24a;SoundManager[_0x150096(0x1e2)](),SoundManager[_0x150096(0x197)]();},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x9f)]=function(){const _0x567412=_0x53f24a;if(!this[_0x567412(0x16d)]())return;this['actor']()[_0x567412(0x16a)]()&&SoundManager[_0x567412(0xe3)]();},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0xfc)]=function(){const _0xb22773=_0x53f24a;return this[_0xb22773(0x7b)](this['actor']());},Window_HospitalHealList[_0x53f24a(0x131)]['isActorEnabled']=function(_0x4f02a6){const _0x5c9f24=_0x53f24a;if(!_0x4f02a6)return![];return _0x4f02a6[_0x5c9f24(0x16a)]()&&$gameParty[_0x5c9f24(0x19d)]()>=_0x4f02a6[_0x5c9f24(0xae)]();},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x91)]=function(_0x363e78){const _0x561477=_0x53f24a;if(this['addRecoverAll']())_0x363e78--;const _0x2a7881=_0x363e78<0x0?$gameParty:$gameParty[_0x561477(0x161)]()[_0x363e78];if(this[_0x561477(0x151)]())_0x363e78++;if(!_0x2a7881)return;this[_0x561477(0x15f)](_0x2a7881,_0x363e78);},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x15f)]=function(_0x316606,_0x24a772){const _0x66f60a=_0x53f24a,_0x5fee19=_0x316606===$gameParty?ImageManager[_0x66f60a(0x150)]($gameParty['leader']()[_0x66f60a(0x12b)]()):ImageManager[_0x66f60a(0x150)](_0x316606[_0x66f60a(0x12b)]());_0x5fee19['addLoadListener'](this[_0x66f60a(0x17e)][_0x66f60a(0x192)](this,_0x316606,_0x24a772));},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x17e)]=function(_0x16b6a6,_0x4f2705){const _0x22f0c9=_0x53f24a;this[_0x22f0c9(0xe9)]();const _0x12026c=this[_0x22f0c9(0x7b)](_0x16b6a6);this[_0x22f0c9(0x191)](_0x12026c);const _0x4fe074=this['itemLineRect'](_0x4f2705);let _0x7f5315=0x0;_0x7f5315=0x0,_0x7f5315+=this[_0x22f0c9(0x1d0)](_0x16b6a6,_0x4f2705),_0x7f5315+=this[_0x22f0c9(0x7f)](_0x16b6a6,_0x4fe074,_0x7f5315),_0x7f5315=_0x4fe074['x']+Math[_0x22f0c9(0xa7)](_0x4fe074['width']/0x3);if(_0x16b6a6===$gameParty)_0x22f0c9(0x180)!==_0x22f0c9(0x16e)?_0x7f5315+=this['drawItemDiscount'](_0x16b6a6,_0x4fe074,_0x7f5315):_0x5970f9[_0x22f0c9(0x12f)]()[_0x22f0c9(0x14a)]+=this[_0x22f0c9(0x1c1)]();else{if(_0x22f0c9(0x136)===_0x22f0c9(0x136))_0x7f5315+=this['drawItemHpGauge'](_0x16b6a6,_0x4fe074,_0x7f5315),_0x7f5315+=this[_0x22f0c9(0x1a7)](_0x16b6a6,_0x4fe074,_0x7f5315),_0x7f5315+=this['drawItemStateIcons'](_0x16b6a6,_0x4fe074,_0x7f5315);else{if(_0xbdb4b8[_0x22f0c9(0x12c)](_0x3f10a6)&&_0x2c48ab[_0x22f0c9(0x177)]&&_0x1ac08a[_0x22f0c9(0xc3)]()&&_0x429e58[_0x22f0c9(0x1d3)][_0x22f0c9(0xb3)])return!![];return _0x2c3225['HospitalShop']['Scene_Map_needsFadeIn'][_0x22f0c9(0x152)](this);}}_0x7f5315=_0x4fe074['x']+Math['ceil'](_0x4fe074['width']*0x2/0x3),this['drawItemCost'](_0x16b6a6,_0x4fe074,_0x7f5315);},Window_HospitalHealList[_0x53f24a(0x131)]['drawItemFace']=function(_0x15dce7,_0x4eb77c){const _0x45dd9c=_0x53f24a,_0x400cf6=Window_HospitalHealList[_0x45dd9c(0x1b9)];if(!_0x400cf6[_0x45dd9c(0xdb)])return 0x0;return rect=this[_0x45dd9c(0x8c)](_0x4eb77c),_0x15dce7===$gameParty?_0x45dd9c(0x82)==='ldUor'?this[_0x45dd9c(0xdb)]($gameParty[_0x45dd9c(0x8b)](),rect['x']+0x2,rect['y']+0x2,ImageManager[_0x45dd9c(0x122)],rect[_0x45dd9c(0xda)]-0x4):this[_0x45dd9c(0xc9)](_0x1f6efa):this[_0x45dd9c(0xdb)](_0x15dce7,rect['x']+0x2,rect['y']+0x2,ImageManager[_0x45dd9c(0x122)],rect[_0x45dd9c(0xda)]-0x4),ImageManager[_0x45dd9c(0x122)]+this['itemPadding']();},Window_HospitalHealList[_0x53f24a(0x131)]['drawItemName']=function(_0x4931ee,_0x45a45f,_0x24cfe7){const _0x4941c5=_0x53f24a,_0x5d5467=Window_HospitalHealList[_0x4941c5(0x1b9)];if(!_0x5d5467[_0x4941c5(0xe8)])return 0x0;const _0x33b333=Math[_0x4941c5(0xca)]((_0x45a45f[_0x4941c5(0xda)]-this['lineHeight']())/0x2);if(_0x4931ee===$gameParty){const _0x506f3d=Window_HospitalHealList[_0x4941c5(0x1b9)][_0x4941c5(0x164)],_0x118d48=ColorManager[_0x4941c5(0x78)](Window_HospitalHealList[_0x4941c5(0x1b9)][_0x4941c5(0x1c8)]);this[_0x4941c5(0x132)](_0x118d48),this[_0x4941c5(0xf3)](_0x506f3d,_0x45a45f['x']+_0x24cfe7,_0x45a45f['y']+_0x33b333,0xc0),this[_0x4941c5(0xf2)]();}else this[_0x4941c5(0xe8)](_0x4931ee,_0x45a45f['x']+_0x24cfe7,_0x45a45f['y']+_0x33b333,0xc0);return 0xc0;},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x7e)]=function(_0x17ffe1,_0x432857,_0x33f3ec){const _0x333696=_0x53f24a,_0xeeacb8=$gameParty[_0x333696(0x1a6)]()*0x64,_0x2ae15a=_0xeeacb8[_0x333696(0x77)](Window_HospitalHealList[_0x333696(0x1b9)]['discountDecimals']),_0x171396=Window_HospitalHealList[_0x333696(0x1b9)][_0x333696(0x1c9)],_0x18f311=_0x171396[_0x333696(0x15a)](_0x2ae15a),_0x29222f=Math[_0x333696(0xca)]((_0x432857['height']-this['lineHeight']())/0x2);return this[_0x333696(0x10c)](_0x18f311,_0x432857['x']+_0x33f3ec,_0x432857['y']+_0x29222f),0x0;},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x11f)]=function(_0x12321c,_0x2a4e68,_0x4e186b){const _0x36d36b=_0x53f24a,_0x54c747=Window_HospitalHealList[_0x36d36b(0x1b9)];if(!_0x54c747['drawHpGauge'])return 0x0;const _0x43707b=Math[_0x36d36b(0xca)]((_0x2a4e68[_0x36d36b(0xda)]-Sprite_Gauge['prototype'][_0x36d36b(0xd8)]())/0x2);return this['placeGauge'](_0x12321c,'hp',_0x2a4e68['x']+_0x4e186b,_0x2a4e68['y']+_0x43707b),Sprite_Gauge[_0x36d36b(0x131)][_0x36d36b(0x14f)]()+0xc;},Window_HospitalHealList[_0x53f24a(0x131)]['drawItemMpGauge']=function(_0x5a4784,_0x428e2f,_0x384225){const _0x1fc526=_0x53f24a,_0x2c2b17=Window_HospitalHealList[_0x1fc526(0x1b9)];if(!_0x2c2b17[_0x1fc526(0xd1)])return 0x0;const _0x64ff44=Math['floor']((_0x428e2f[_0x1fc526(0xda)]-Sprite_Gauge['prototype'][_0x1fc526(0xd8)]())/0x2);return this[_0x1fc526(0xfd)](_0x5a4784,'mp',_0x428e2f['x']+_0x384225,_0x428e2f['y']+_0x64ff44),Sprite_Gauge[_0x1fc526(0x131)][_0x1fc526(0x14f)]()+0xc;},Window_HospitalHealList[_0x53f24a(0x131)]['drawItemStateIcons']=function(_0x2301b7,_0x569b20,_0x3ded4e){const _0x6a5a2a=_0x53f24a,_0x11e53a=Window_HospitalHealList[_0x6a5a2a(0x1b9)];if(!_0x11e53a[_0x6a5a2a(0x17f)])return 0x0;const _0x111db3=Math[_0x6a5a2a(0xca)]((_0x569b20['height']-ImageManager[_0x6a5a2a(0x97)])/0x2),_0x12c0ac=Math[_0x6a5a2a(0xca)](_0x569b20['width']*0x2/0x3-(_0x569b20['x']+_0x3ded4e));if(_0x12c0ac<=0x0)return 0x0;const _0x5e1276=_0x11e53a[_0x6a5a2a(0x14b)]*ImageManager['iconWidth'];return this[_0x6a5a2a(0x166)](_0x2301b7,_0x569b20['x']+_0x3ded4e,_0x569b20['y']+_0x111db3,_0x5e1276),_0x5e1276+0xc;},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0xe4)]=function(_0x1f79f3){return![];},Window_HospitalHealList[_0x53f24a(0x131)]['drawItemCost']=function(_0x255351,_0x3424ab,_0x3c76ea){const _0x2841eb=_0x53f24a,_0x595852=_0x255351['hospitalCost'](),_0x29b12c=TextManager[_0x2841eb(0x15c)],_0x4be378=Math[_0x2841eb(0xca)]((_0x3424ab[_0x2841eb(0xda)]-this[_0x2841eb(0x10e)]())/0x2),_0x210557=_0x3424ab['width']-(_0x3424ab['x']+_0x3c76ea);this['drawCurrencyValue'](_0x595852,_0x29b12c,_0x3424ab['x']+_0x3c76ea,_0x3424ab['y']+_0x4be378,_0x210557);},Window_HospitalHealList['prototype'][_0x53f24a(0x12d)]=function(){return!![];},Window_HospitalHealList[_0x53f24a(0x131)][_0x53f24a(0x1d7)]=function(){const _0x3f7f3c=_0x53f24a;Window_StatusBase[_0x3f7f3c(0x131)][_0x3f7f3c(0x1d7)][_0x3f7f3c(0x152)](this);if(this[_0x3f7f3c(0xd9)]){if(_0x3f7f3c(0x1df)!==_0x3f7f3c(0x129)){const _0x166dd0=this[_0x3f7f3c(0x120)]();this[_0x3f7f3c(0xd9)]['setText'](_0x166dd0);}else{if(_0x5df118[_0x298813]&&_0x38fab4[_0x3c1a66][_0x3f7f3c(0xf4)])this[_0x3f7f3c(0x154)]++;}}},Window_HospitalHealList['prototype'][_0x53f24a(0x120)]=function(){const _0x351738=_0x53f24a,_0x39f6d1=this[_0x351738(0x16d)]();if(_0x39f6d1===$gameParty){if(_0x351738(0x147)===_0x351738(0x79))_0x320a78(_0x351738(0x170)[_0x351738(0x15a)](_0xe57d63,_0x13cdfb,_0x290508)),_0x584bbf[_0x351738(0x156)]();else{const _0x1fd2a1=Window_HospitalHealList[_0x351738(0x1b9)][_0x351738(0x17b)];return _0x1fd2a1[_0x351738(0x15a)](this[_0x351738(0x16d)]()[_0x351738(0xae)](),TextManager[_0x351738(0x15c)]);}}else{const _0x293e5a=Window_HospitalHealList[_0x351738(0x1b9)][_0x351738(0xf8)];return _0x293e5a[_0x351738(0x15a)](this[_0x351738(0x16d)]()['hospitalCost'](),TextManager['currencyUnit'],_0x39f6d1[_0x351738(0x11d)](),_0x39f6d1['level'],_0x39f6d1[_0x351738(0x1d2)]()['name']);}};