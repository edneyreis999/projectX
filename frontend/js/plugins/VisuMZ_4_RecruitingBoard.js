//=============================================================================
// VisuStella MZ - Recruiting Board
// VisuMZ_4_RecruitingBoard.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_RecruitingBoard = true;

var VisuMZ = VisuMZ || {};
VisuMZ.RecruitBoard = VisuMZ.RecruitBoard || {};
VisuMZ.RecruitBoard.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [RecruitBoard]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Recruiting_Board_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to create a recruiting board for actors that the
 * player can add into their party for a sum of gold. Each recruiting board can
 * have a different list of actors and even discount rates to go with it.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Opens a new shop-like scene for the player to browse through and select
 *   actors to recruit into the party for a sum of gold.
 * * Display the basic information needed for each actor akin to how the main
 *   menu is displayed.
 * * When used with the VisuStella MZ Core Engine, each recruitable character's
 *   base parameters are also displayed.
 * * When used with the VisuStella MZ Main Menu Core, the face graphic will
 *   match the setting used to display the map sprite or sideview battler if
 *   needed.
 * * A small window displays the list of skills the actor has learned, too.
 * * Notetags allow you to apply different cost rates per level.
 * * Discount rates can be adjusted via the Plugin Command.
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
 * VisuMZ_0_CoreEngine
 * 
 * When used in the same project with the Core Engine, the default Plugin
 * Parameter "JS: Draw Actor Data" will include extra data showing off the
 * player's base parameters.
 * 
 * ---
 * 
 * VisuMZ_1_MainMenuCore
 * 
 * When used in the same project with the Main Menu Core, the Recruiting Board
 * scene will match the main menu graphic type to show faces, map sprites, or
 * sideview battlers.
 * 
 * ---
 * VisuMZ_2_MoreCurrencies
 * 
 * Actors can also be recruited with items, weapons, armors, and/or variables
 * as long as this plugin is present and the respective notetags are used.
 * 
 * ---
 * 
 * VisuMZ_3_VisualGoldDisplay
 * 
 * The cost of skills will be shown in Visual Gold Display format.
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
 * === Recruit-Related Notetags ===
 * 
 * ---
 *
 * <Recruit Cost Per Level: x>
 *
 * - Used for: Actor Notetags
 * - Adjusts how much this actor will cost to recruit by 'x' gold per level.
 * - Replace 'x' with a number representing how much gold is needed per level
 *   in order for the player to recruit this actor.
 * - If this notetag is not used, use the default setting found in the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Item id Recruit Cost: x>
 * <Item name Recruit Cost: x>
 *
 * <Weapon id Recruit Cost: x>
 * <Weapon name Recruit Cost: x>
 *
 * <Armor id Recruit Cost: x>
 * <Armor name Recruit Cost: x>
 *
 * <Variable id Recruit Cost: x>
 * 
 * - Used for: Actor Notetags
 * - Requires Imported.VisuMZ_2_MoreCurrencies!
 * - Allows recruiting of actor using items, weapons, armors, or variables as
 *   extended currency.
 * - Replace 'id' with a number representing the ID of the item, weapon, armor,
 *   or variable to be taken (when recruited).
 * - Replace 'name' with the name of the item, weapon, armor, or variable to be
 *   taken (when recruited).
 * - Replace 'x' with the quantity of the item, weapon, armor, or variable that
 *   will be taken (when recruited).
 * - Insert multiple copies of these notetags to add more item, weapon, armor,
 *   or variable costs.
 * 
 * ---
 *
 * <Fixed Recruit Cost: x>
 *
 * - Used for: Actor Notetags
 * - Regardless of level, this actor can be recruited for 'x' gold.
 * - Replace 'x' with a number representing the fixed gold cost needed for the
 *   player to recruit this actor.
 * - This will take priority over <Recruit Cost Per Level: x>.
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
 * === Scene Plugin Commands ===
 * 
 * ---
 *
 * Scene: Open Recruiting Boarding
 * - Opens the recruiting board to hire new actors.
 * - Cannot be used in battle.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to be able to recruit.
 *
 *   Discount Rate:
 *   - Determine the discount rate used for this shop.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Default Cost Per Level:
 *   - What is the default cost per level for actors that lack the
 *     <Recruit Cost Per Level: x> notetag?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_RecruitingBoard.
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
 *   Recruit Text:
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
 * List Window
 * 
 *   No Actors Available:
 *   - Text displayed when no actors are available to recruit.
 *   - Text codes allowed.
 * 
 *     Help Description:
 *     - Help window description used for no recruitables.
 *     - Text codes allowed.
 *
 * ---
 *
 * Skills Window
 * 
 *   Title Text:
 *   - Text used for the skills window title.
 * 
 *   And More Text:
 *   - Text used for the skills window subtitle.
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
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: Draw Actor Data:
 *   - Code used to draw the data for each actor.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 * 
 * Skills Window
 * 
 *   Background Type:
 *   - Select background type for this window.
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility with VisuMZ_2_MoreCurrencies!
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "VisuStella MZ Compatibility" section:
 * *** VisuMZ_2_MoreCurrencies
 * **** Actors can also be recruited with items, weapons, armors, and/or
 *      variables as long as this plugin is present and the respective notetags
 *      are used.
 * * New Features!
 * ** New compatibility notetags added by Arisu:
 * *** <Item id Recruit Cost: x>
 * *** <Weapon id Recruit Cost: x>
 * *** <Armor id Recruit Cost: x>
 * *** <Variable id Recruit Cost: x>
 * **** Requires VisuMZ_2_MoreCurrencies!
 * **** Allows recruiting of actors using items, weapons, armors, or variables
 *      as extended currency.
 * 
 * Version 1.02: August 17, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: May 18, 2023
 * * Bug Fixes!
 * ** Gold window did not update on recruitment. Should work properly now.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** If your screen resolution UI is too small, the class name and gauges will
 *    not be drawn. Update made by Arisu.
 * 
 * Version 1.00 Official Release Date: May 24, 2023
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
 * @command SceneOpenRecruitBoard
 * @text Scene: Open Recruiting Boarding
 * @desc Opens the recruiting board to hire new actors.
 * Cannot be used in battle.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to be able to recruit.
 * @default []
 *
 * @arg DiscountRate:eval
 * @text Discount Rate
 * @desc Determine the discount rate used for this shop.
 * You may use JavaScript code.
 * @default 0.00
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
 * @param RecruitingBoard
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param defaultCostPerLevel:num
 * @text Default Cost Per Level
 * @desc What is the default cost per level for actors that lack
 * the <Recruit Cost Per Level: x> notetag?
 * @default 1000
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_RecruitingBoard.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"Window_RecruitBoardCommand":"","RecruitText:str":"Recruit","RecruitIcon:num":"73","RecruitHelpDesc:json":"\"Recruit mercenaries to help you fight in exchange for gold.\"","CancelText:str":"Exit","CancelIcon:num":"82","CancelHelpDesc:json":"\"Leave the recruiting board.\"","Window_RecruitBoardList":"","noActorItemText:json":"\"No mercenaries available!\\nPlease come back another time!\"","noActorHelpDesc:json":"\"There are currently no mercenaries to recruit.\"","Window_RecruitBoardSkills":"","titleText:str":"\\C[16]Skills","andMoreText:str":"\\C[16]And More..."}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"Window_Help":"","HelpWindow_BgType:num":"0","Window_Gold":"","GoldWindow_BgType:num":"0","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_RecruitBoardCommand":"","CommandWindow_BgType:num":"0","CommandWindow_Style:str":"auto","CommandWindow_RectJS:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_RecruitBoardList":"","ListWindow_BgType:num":"0","ListWindow_DrawJS:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\nconst sx = rect.x + ImageManager.faceWidth + 36;\\nconst sy = rect.y + Math.floor(this.lineHeight() * 1);\\n\\n// Draw Gradient\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nthis.contents.gradientFillRect(ImageManager.faceWidth, rect.y, rect.width - ImageManager.faceWidth + 6, this.lineHeight(), c2, c1);\\nthis.drawCurrencyValue(this.recruitCost(actor), TextManager.currencyUnit, rect.x, rect.y, rect.width - this.itemPadding());\\n\\n// Draw Simple Status\\nthis.drawActorSimpleStatus(actor, sx, sy);\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx2 = sx + 372;\\nconst sw = rect.width - sx2 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = this.displayedParameters();\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx2;\\n    let ph = rect.height - this.lineHeight();\\n    let py = sy + Math.floor((ph - (Math.ceil(params.length / 2) * this.gaugeLineHeight())) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, this.gaugeLineHeight(), 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx2;\\n            py += this.gaugeLineHeight();\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","ListWindow_RectJS:func":"\"const ww = Graphics.boxWidth - this.skillWindowRect().width;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_RecruitBoardSkills":"","SkillsWindow_BgType:num":"0","SkillsWindow_RectJS:func":"\"const ww = 352;\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Window_RecruitBoardCommand
 * @text Command Window
 *
 * @param RecruitText:str
 * @text Recruit Text
 * @parent Window_SkillShopCommand
 * @desc Text used for this command.
 * @default Recruit
 *
 * @param RecruitIcon:num
 * @text Icon
 * @parent RecruitText:str
 * @desc Icon used for this command.
 * @default 73
 *
 * @param RecruitHelpDesc:json
 * @text Help Description
 * @parent RecruitText:str
 * @type note
 * @desc Help window description used for this command.
 * Text codes allowed.
 * @default "Recruit mercenaries to help you fight in exchange for gold."
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Window_SkillShopCommand
 * @desc Text used for this command.
 * @default Exit
 *
 * @param CancelIcon:num
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
 * @default "Leave the recruiting board."
 *
 * @param Window_RecruitBoardList
 * @text List Window
 * 
 * @param noActorItemText:json
 * @text No Actors Available
 * @parent Window_RecruitBoardList
 * @type note
 * @desc Text displayed when no actors are available to recruit.
 * Text codes allowed.
 * @default "No mercenaries available!\nPlease come back another time!"
 * 
 * @param noActorHelpDesc:json
 * @text Help Description
 * @parent noActorItemText:json
 * @type note
 * @desc Help window description used for no recruitables.
 * Text codes allowed.
 * @default "There are currently no mercenaries to recruit."
 *
 * @param Window_RecruitBoardSkills
 * @text Skills Window
 *
 * @param titleText:str
 * @text Title Text
 * @parent Window_RecruitBoardSkills
 * @desc Text used for the skills window title.
 * @default \C[16]Skills
 *
 * @param andMoreText:str
 * @text And More Text
 * @parent Window_RecruitBoardSkills
 * @desc Text used for the skills window subtitle.
 * @default \C[16]And More...
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
 * @param Window_RecruitBoardCommand
 * @text Command Window
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent Window_RecruitBoardCommand
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
 * @parent Window_RecruitBoardCommand
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
 * @parent Window_RecruitBoardCommand
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_RecruitBoardList
 * @text List Window
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent Window_RecruitBoardList
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
 * @param ListWindow_DrawJS:func
 * @text JS: Draw Actor Data
 * @parent Window_RecruitBoardList
 * @type note
 * @desc Code used to draw the data for each actor.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\nconst sx = rect.x + ImageManager.faceWidth + 36;\nconst sy = rect.y + Math.floor(this.lineHeight() * 1);\n\n// Draw Gradient\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nthis.contents.gradientFillRect(ImageManager.faceWidth, rect.y, rect.width - ImageManager.faceWidth + 6, this.lineHeight(), c2, c1);\nthis.drawCurrencyValue(this.recruitCost(actor), TextManager.currencyUnit, rect.x, rect.y, rect.width - this.itemPadding());\n\n// Draw Simple Status\nthis.drawActorSimpleStatus(actor, sx, sy);\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx2 = sx + 372;\nconst sw = rect.width - sx2 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = this.displayedParameters();\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx2;\n    let ph = rect.height - this.lineHeight();\n    let py = sy + Math.floor((ph - (Math.ceil(params.length / 2) * this.gaugeLineHeight())) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, this.gaugeLineHeight(), 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx2;\n            py += this.gaugeLineHeight();\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param ListWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_RecruitBoardList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.skillWindowRect().width;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_RecruitBoardSkills
 * @text Skills Window
 *
 * @param SkillsWindow_BgType:num
 * @text Background Type
 * @parent Window_RecruitBoardSkills
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
 * @param SkillsWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_RecruitBoardSkills
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 352;\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

function _0xb463(_0x434526,_0x18f31d){const _0x29e8b0=_0x29e8();return _0xb463=function(_0xb4634e,_0x45c07e){_0xb4634e=_0xb4634e-0x107;let _0x3ebac6=_0x29e8b0[_0xb4634e];return _0x3ebac6;},_0xb463(_0x434526,_0x18f31d);}const _0x194f97=_0xb463;(function(_0x28af51,_0x1f720e){const _0x561aa6=_0xb463,_0x2c9924=_0x28af51();while(!![]){try{const _0x179b63=-parseInt(_0x561aa6(0x257))/0x1+parseInt(_0x561aa6(0x1ca))/0x2*(-parseInt(_0x561aa6(0x20b))/0x3)+parseInt(_0x561aa6(0x21a))/0x4+-parseInt(_0x561aa6(0x117))/0x5*(parseInt(_0x561aa6(0x16e))/0x6)+-parseInt(_0x561aa6(0x27a))/0x7*(-parseInt(_0x561aa6(0x125))/0x8)+parseInt(_0x561aa6(0x20f))/0x9*(-parseInt(_0x561aa6(0x234))/0xa)+parseInt(_0x561aa6(0x288))/0xb;if(_0x179b63===_0x1f720e)break;else _0x2c9924['push'](_0x2c9924['shift']());}catch(_0x53cc6f){_0x2c9924['push'](_0x2c9924['shift']());}}}(_0x29e8,0x5c386));var label='RecruitBoard',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4c87fb){const _0xbf813=_0xb463;return _0x4c87fb['status']&&_0x4c87fb[_0xbf813(0x261)][_0xbf813(0x112)]('['+label+']');})[0x0];VisuMZ[label][_0x194f97(0x214)]=VisuMZ[label][_0x194f97(0x214)]||{},VisuMZ[_0x194f97(0x1c4)]=function(_0x68265c,_0x5d8ad0){const _0xa399b=_0x194f97;for(const _0x50ea3d in _0x5d8ad0){if(_0x50ea3d[_0xa399b(0x28b)](/(.*):(.*)/i)){if(_0xa399b(0x14d)==='MRnAq'){const _0x5d235f=String(RegExp['$1']),_0x4ca852=String(RegExp['$2'])['toUpperCase']()[_0xa399b(0x25c)]();let _0x9ec591,_0x2dbb74,_0x1b6812;switch(_0x4ca852){case _0xa399b(0x179):_0x9ec591=_0x5d8ad0[_0x50ea3d]!==''?Number(_0x5d8ad0[_0x50ea3d]):0x0;break;case _0xa399b(0x229):_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON['parse'](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x2807e8=>Number(_0x2807e8));break;case _0xa399b(0x182):_0x9ec591=_0x5d8ad0[_0x50ea3d]!==''?eval(_0x5d8ad0[_0x50ea3d]):null;break;case _0xa399b(0x217):_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x15cb65=>eval(_0x15cb65));break;case _0xa399b(0x111):_0x9ec591=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):'';break;case _0xa399b(0x1e1):_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x526b50=>JSON[_0xa399b(0x20d)](_0x526b50));break;case'FUNC':_0x9ec591=_0x5d8ad0[_0x50ea3d]!==''?new Function(JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d])):new Function('return\x200');break;case'ARRAYFUNC':_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x5559b1=>new Function(JSON['parse'](_0x5559b1)));break;case _0xa399b(0x1b5):_0x9ec591=_0x5d8ad0[_0x50ea3d]!==''?String(_0x5d8ad0[_0x50ea3d]):'';break;case _0xa399b(0x198):_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x5b10de=>String(_0x5b10de));break;case'STRUCT':_0x1b6812=_0x5d8ad0[_0x50ea3d]!==''?JSON['parse'](_0x5d8ad0[_0x50ea3d]):{},_0x9ec591=VisuMZ[_0xa399b(0x1c4)]({},_0x1b6812);break;case _0xa399b(0x19b):_0x2dbb74=_0x5d8ad0[_0x50ea3d]!==''?JSON[_0xa399b(0x20d)](_0x5d8ad0[_0x50ea3d]):[],_0x9ec591=_0x2dbb74[_0xa399b(0x242)](_0x25a5ed=>VisuMZ[_0xa399b(0x1c4)]({},JSON['parse'](_0x25a5ed)));break;default:continue;}_0x68265c[_0x5d235f]=_0x9ec591;}else return _0x53c108['VisuMZ_1_MainMenuCore']?_0x29c8ac[_0xa399b(0x128)][_0xa399b(0x214)][_0xa399b(0x199)]:_0xa399b(0x1f3);}}return _0x68265c;},(_0x5d3e14=>{const _0x323f55=_0x194f97,_0x35a8c6=_0x5d3e14['name'];for(const _0x2147fa of dependencies){if(!Imported[_0x2147fa]){if('kRKRV'!==_0x323f55(0x1c3))_0x110304[_0x323f55(0x156)][_0x323f55(0x17a)][_0x323f55(0x120)](this),this[_0x323f55(0x1f9)](),this[_0x323f55(0x201)](),this[_0x323f55(0x16b)](),this[_0x323f55(0x28c)](),this[_0x323f55(0x1e2)](),this['isUsingShopBustStyleUI']()&&this[_0x323f55(0x27d)]();else{alert(_0x323f55(0x13f)['format'](_0x35a8c6,_0x2147fa)),SceneManager[_0x323f55(0x1a6)]();break;}}}const _0x5b2541=_0x5d3e14[_0x323f55(0x261)];if(_0x5b2541[_0x323f55(0x28b)](/\[Version[ ](.*?)\]/i)){const _0x511e03=Number(RegExp['$1']);if(_0x511e03!==VisuMZ[label]['version']){if(_0x323f55(0x200)!==_0x323f55(0x200)){const _0x5bf021=_0xe5daac[_0x323f55(0x156)][_0x323f55(0x24d)][_0x323f55(0x120)](this,_0x27e6ff,_0x7406e);return _0x5bf021&&(_0x5bf021[_0x323f55(0x1cc)]=this['contents']['paintOpacity']),_0x5bf021;}else alert(_0x323f55(0x11e)[_0x323f55(0x12b)](_0x35a8c6,_0x511e03)),SceneManager[_0x323f55(0x1a6)]();}}if(_0x5b2541[_0x323f55(0x28b)](/\[Tier[ ](\d+)\]/i)){const _0x39b7bb=Number(RegExp['$1']);_0x39b7bb<tier?(alert(_0x323f55(0x1f1)[_0x323f55(0x12b)](_0x35a8c6,_0x39b7bb,tier)),SceneManager[_0x323f55(0x1a6)]()):tier=Math[_0x323f55(0x1ad)](_0x39b7bb,tier);}VisuMZ[_0x323f55(0x1c4)](VisuMZ[label][_0x323f55(0x214)],_0x5d3e14[_0x323f55(0x1f0)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x194f97(0x282)],_0x194f97(0x1a0),_0xcad56d=>{const _0x13d61f=_0x194f97;if($gameParty[_0x13d61f(0x13c)]())return;if(SceneManager[_0x13d61f(0x239)]())return;VisuMZ[_0x13d61f(0x1c4)](_0xcad56d,_0xcad56d);const _0x51da69=_0xcad56d['ActorIDs'];if(_0x51da69['length']<=0x0)return;const _0x1cd5c6=(_0xcad56d[_0x13d61f(0x15d)]||0x0)[_0x13d61f(0x183)](0x0,0x1);for(const _0x572791 of _0x51da69){const _0x1ecd22=$gameActors[_0x13d61f(0x19c)](_0x572791);_0x1ecd22['recoverAll']();}SceneManager['push'](Scene_RecruitBoard),SceneManager['prepareNextScene'](_0x51da69,_0x1cd5c6);}),VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x1ab)]={'RecruitCostPerLevel':/<RECRUIT COST PER LEVEL:[ ](\d+)>/i,'RecruitCostFixed':/<FIXED RECRUIT COST:[ ](\d+)>/i},SceneManager['isSceneBattle']=function(){const _0x503947=_0x194f97;return this[_0x503947(0x278)]&&this['_scene'][_0x503947(0x1ea)]===Scene_Battle;},SceneManager[_0x194f97(0x202)]=function(){const _0x5ef5cd=_0x194f97;return this[_0x5ef5cd(0x278)]&&this[_0x5ef5cd(0x278)]['constructor']===Scene_RecruitBoard;},Game_Actor[_0x194f97(0x156)]['recruitCost']=function(){const _0x3c1efb=_0x194f97,_0x1a6dd8=VisuMZ[_0x3c1efb(0x1a3)][_0x3c1efb(0x1ab)],_0x43f51d=this[_0x3c1efb(0x19c)]()['note']||'';if(_0x43f51d['match'](_0x1a6dd8[_0x3c1efb(0x137)]))return Number(RegExp['$1']);const _0x11765d=this[_0x3c1efb(0x265)]*this[_0x3c1efb(0x1d7)]();return _0x11765d;},Game_Actor[_0x194f97(0x156)][_0x194f97(0x1d7)]=function(){const _0x427e3b=_0x194f97,_0x1351b7=VisuMZ['RecruitBoard']['RegExp'],_0x3c0928=this['actor']()[_0x427e3b(0x1d5)]||'';if(_0x3c0928[_0x427e3b(0x28b)](_0x1351b7[_0x427e3b(0x1d9)]))return Number(RegExp['$1']);return Scene_RecruitBoard[_0x427e3b(0x231)][_0x427e3b(0x28e)];};function Scene_RecruitBoard(){const _0x55c475=_0x194f97;this[_0x55c475(0x115)](...arguments);}Scene_RecruitBoard['prototype']=Object[_0x194f97(0x17a)](Scene_MenuBase[_0x194f97(0x156)]),Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1ea)]=Scene_RecruitBoard,Scene_RecruitBoard[_0x194f97(0x231)]={'goldWindow_BgType':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x16d)][_0x194f97(0x276)]??0x0,'helpWindow_BgType':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x16d)]['HelpWindow_BgType']??0x0,'defaultCostPerLevel':VisuMZ['RecruitBoard']['Settings'][_0x194f97(0x28e)]??0x3e8},Scene_RecruitBoard['prototype']['initialize']=function(){const _0x3b5c19=_0x194f97;Scene_MenuBase[_0x3b5c19(0x156)][_0x3b5c19(0x115)]['call'](this);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x181)]=function(_0x4fbe36,_0x3df7ba){const _0x57f838=_0x194f97;this[_0x57f838(0x130)]=_0x4fbe36['map'](_0x3f2790=>$gameActors['actor'](_0x3f2790))[_0x57f838(0x177)](undefined)[_0x57f838(0x177)](null),this[_0x57f838(0x152)]=_0x3df7ba;},Scene_RecruitBoard[_0x194f97(0x156)]['create']=function(){const _0x5f09e7=_0x194f97;Scene_MenuBase['prototype'][_0x5f09e7(0x17a)][_0x5f09e7(0x120)](this),this[_0x5f09e7(0x1f9)](),this['createCommandWindow'](),this[_0x5f09e7(0x16b)](),this[_0x5f09e7(0x28c)](),this['createSkillWindow'](),this['isUsingShopBustStyleUI']()&&this[_0x5f09e7(0x27d)]();},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1f9)]=function(){const _0x344497=_0x194f97;Scene_MenuBase[_0x344497(0x156)]['createHelpWindow'][_0x344497(0x120)](this),this['_helpWindow']['setBackgroundType'](Scene_RecruitBoard['SETTINGS'][_0x344497(0x260)]);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x201)]=function(){const _0x2567b8=_0x194f97,_0x4fc74f=this['commandWindowRect'](),_0x1bec96=new Window_RecruitBoardCommand(_0x4fc74f);_0x1bec96[_0x2567b8(0x256)](this[_0x2567b8(0x272)]),_0x1bec96['setHandler'](_0x2567b8(0x142),this[_0x2567b8(0x10c)]['bind'](this)),_0x1bec96[_0x2567b8(0x107)](_0x2567b8(0x17c),this[_0x2567b8(0x187)][_0x2567b8(0x16a)](this)),this[_0x2567b8(0x1fb)](_0x1bec96),this[_0x2567b8(0x165)]=_0x1bec96,_0x1bec96[_0x2567b8(0x166)](Window_RecruitBoardCommand[_0x2567b8(0x231)][_0x2567b8(0x12f)]);},Scene_RecruitBoard[_0x194f97(0x156)]['commandWindowRect']=function(){const _0xa324e9=_0x194f97;if(this[_0xa324e9(0x171)]())return this['getShopBustStyleUI_CommandWindow_Rect']();if(VisuMZ[_0xa324e9(0x1a3)][_0xa324e9(0x214)][_0xa324e9(0x16d)]['CommandWindow_RectJS']){if(_0xa324e9(0x25a)===_0xa324e9(0x17f))_0x59daeb['RecruitBoard']['Scene_RecruitBoard_popScene']['call'](this);else return VisuMZ[_0xa324e9(0x1a3)][_0xa324e9(0x214)][_0xa324e9(0x16d)][_0xa324e9(0x28a)]['call'](this);}const _0xe535d5=Graphics[_0xa324e9(0x15c)]-this[_0xa324e9(0x21f)](),_0x460254=this[_0xa324e9(0x1c8)](0x1,!![]),_0x3dc1c5=0x0,_0x595530=this[_0xa324e9(0x1f7)]();return new Rectangle(_0x3dc1c5,_0x595530,_0xe535d5,_0x460254);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x16b)]=function(){const _0x1c10a2=_0x194f97,_0xcb47a3=this[_0x1c10a2(0x185)](),_0x1e9d34=new Window_Gold(_0xcb47a3);this[_0x1c10a2(0x1fb)](_0x1e9d34),this['_goldWindow']=_0x1e9d34,_0x1e9d34[_0x1c10a2(0x166)](Scene_RecruitBoard[_0x1c10a2(0x231)][_0x1c10a2(0x25e)]);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x185)]=function(){const _0x10c8bd=_0x194f97;if(this[_0x10c8bd(0x171)]()){if('YzQVi'===_0x10c8bd(0x131))return this[_0x10c8bd(0x191)]();else{if(_0xe804cb){if(_0x49afc3[_0x10c8bd(0x16f)]()[_0x10c8bd(0x112)](_0x1bf1e7))return![];}return!![];}}if(VisuMZ['RecruitBoard'][_0x10c8bd(0x214)][_0x10c8bd(0x16d)]['GoldWindow_RectJS'])return _0x10c8bd(0x24c)!==_0x10c8bd(0x24c)?_0x1560e6['MoreCurrencies'][_0x10c8bd(0x174)](_0x4f4d99):VisuMZ[_0x10c8bd(0x1a3)][_0x10c8bd(0x214)][_0x10c8bd(0x16d)][_0x10c8bd(0x1bb)][_0x10c8bd(0x120)](this);const _0x34d15f=this[_0x10c8bd(0x21f)](),_0x1f0a17=this[_0x10c8bd(0x1c8)](0x1,!![]),_0x46ac3c=Graphics[_0x10c8bd(0x15c)]-_0x34d15f,_0xc04bd2=this['mainAreaTop']();return new Rectangle(_0x46ac3c,_0xc04bd2,_0x34d15f,_0x1f0a17);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x28c)]=function(){const _0x21c887=_0x194f97,_0x55fb87=this[_0x21c887(0x157)](),_0xc2e5aa=new Window_RecruitBoardList(_0x55fb87,this['_discount']);_0xc2e5aa[_0x21c887(0x256)](this['_helpWindow']),_0xc2e5aa[_0x21c887(0x245)](this[_0x21c887(0x130)]),_0xc2e5aa[_0x21c887(0x107)]('ok',this[_0x21c887(0x1ba)][_0x21c887(0x16a)](this)),_0xc2e5aa[_0x21c887(0x107)](_0x21c887(0x17c),this[_0x21c887(0x133)][_0x21c887(0x16a)](this)),this[_0x21c887(0x1fb)](_0xc2e5aa),this['_listWindow']=_0xc2e5aa,this[_0x21c887(0x17e)]=_0xc2e5aa,_0xc2e5aa[_0x21c887(0x166)](Window_RecruitBoardList[_0x21c887(0x231)][_0x21c887(0x12f)]);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x157)]=function(){const _0xe072f=_0x194f97;if(this[_0xe072f(0x171)]())return this[_0xe072f(0x20a)]();if(VisuMZ['RecruitBoard'][_0xe072f(0x214)][_0xe072f(0x16d)]['ListWindow_RectJS'])return VisuMZ[_0xe072f(0x1a3)][_0xe072f(0x214)][_0xe072f(0x16d)][_0xe072f(0x1a5)][_0xe072f(0x120)](this);const _0x22c5aa=Graphics[_0xe072f(0x15c)]-this[_0xe072f(0x230)]()[_0xe072f(0x28d)],_0x5ce8af=this[_0xe072f(0x1f8)]()-this[_0xe072f(0x1c8)](0x1,!![]),_0x11baf8=0x0,_0x362aad=this[_0xe072f(0x1f7)]()+this[_0xe072f(0x1c8)](0x1,!![]);return new Rectangle(_0x11baf8,_0x362aad,_0x22c5aa,_0x5ce8af);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1e2)]=function(){const _0x20ac35=_0x194f97,_0x3c6c19=this[_0x20ac35(0x230)](),_0x5df060=new Window_RecruitBoardSkills(_0x3c6c19);this[_0x20ac35(0x1da)][_0x20ac35(0x210)](_0x5df060),this['addWindow'](_0x5df060),this['_skillWindow']=_0x5df060,_0x5df060[_0x20ac35(0x166)](Window_RecruitBoardSkills['SETTINGS'][_0x20ac35(0x12f)]);},Scene_RecruitBoard['prototype'][_0x194f97(0x230)]=function(){const _0x4c7b83=_0x194f97;if(this[_0x4c7b83(0x171)]())return this['getShopBustStyleUI_SkillWindow_Rect']();if(VisuMZ[_0x4c7b83(0x1a3)][_0x4c7b83(0x214)]['Window']['SkillWindow_RectJS'])return VisuMZ['RecruitBoard'][_0x4c7b83(0x214)][_0x4c7b83(0x16d)][_0x4c7b83(0x22b)][_0x4c7b83(0x120)](this);const _0x8e68ce=0x160,_0x32b5b6=this[_0x4c7b83(0x1f8)]()-this[_0x4c7b83(0x1c8)](0x1,!![]),_0x3289bb=Graphics[_0x4c7b83(0x15c)]-_0x8e68ce,_0x2d0be7=this[_0x4c7b83(0x1f7)]()+this[_0x4c7b83(0x1c8)](0x1,!![]);return new Rectangle(_0x3289bb,_0x2d0be7,_0x8e68ce,_0x32b5b6);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x10c)]=function(){const _0x470eda=_0x194f97;this[_0x470eda(0x1da)][_0x470eda(0x274)](),this[_0x470eda(0x1da)][_0x470eda(0x1b4)](),this[_0x470eda(0x165)][_0x470eda(0x10f)]();if(this[_0x470eda(0x171)]()){if('TCnDv'!==_0x470eda(0x1e4))this[_0x470eda(0x272)][_0x470eda(0x176)](),this[_0x470eda(0x1da)][_0x470eda(0x176)](),this[_0x470eda(0x219)][_0x470eda(0x176)](),this[_0x470eda(0x165)][_0x470eda(0x147)](),this['setBustStyleUIMessageType'](_0x470eda(0x10c));else return this[_0x470eda(0x20a)]();}},Scene_RecruitBoard[_0x194f97(0x156)]['onListOk']=function(){const _0x43a9d5=_0x194f97,_0xbb765e=this[_0x43a9d5(0x1da)][_0x43a9d5(0x19c)](),_0x2da7b1=this[_0x43a9d5(0x1da)][_0x43a9d5(0x1eb)](_0xbb765e);Imported['VisuMZ_2_MoreCurrencies']&&VisuMZ[_0x43a9d5(0x24f)][_0x43a9d5(0x1a4)](_0xbb765e[_0x43a9d5(0x19c)](),-0x1);$gameParty[_0x43a9d5(0x25b)](_0x2da7b1);if(this['_goldWindow']){if(_0x43a9d5(0x138)!==_0x43a9d5(0x138)){const _0x3b7d58=_0x389f72[_0x43a9d5(0x1ef)](_0xe0d359[_0x43a9d5(0x15a)]());_0x3b7d58['addLoadListener'](this['drawItemActorSprite']['bind'](this,_0x425eb9,_0x4a90ea,_0x2133c3+0x1,_0x5378b0,_0x2716ef-0x2));}else this[_0x43a9d5(0x11d)][_0x43a9d5(0x184)]();}$gameParty['addActor'](_0xbb765e[_0x43a9d5(0x1e8)]()),this[_0x43a9d5(0x1da)][_0x43a9d5(0x184)](),this[_0x43a9d5(0x1da)][_0x43a9d5(0x274)]();this[_0x43a9d5(0x1da)][_0x43a9d5(0x18c)]()>=this[_0x43a9d5(0x1da)][_0x43a9d5(0x1c5)]()&&this[_0x43a9d5(0x1da)][_0x43a9d5(0x1c7)](this['_listWindow'][_0x43a9d5(0x1c5)]()-0x1);if(this[_0x43a9d5(0x171)]()){if(_0x43a9d5(0x1ff)===_0x43a9d5(0x252)){if(_0x17ae59[_0x43a9d5(0x278)]&&_0x235768['_scene']['isUsingShopBustStyleUI']())return 0x1;return 0x2;}else this[_0x43a9d5(0x223)]('onListOk');}},Scene_RecruitBoard[_0x194f97(0x156)]['onListCancel']=function(){const _0x372bfb=_0x194f97;this['_listWindow'][_0x372bfb(0x10f)](),this[_0x372bfb(0x165)][_0x372bfb(0x274)](),this[_0x372bfb(0x171)]()&&(this[_0x372bfb(0x223)](_0x372bfb(0x133)),this['hideWindowsShopBustStyleUI'](),this[_0x372bfb(0x165)]['show']());},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1c2)]=function(){const _0x3ee6bf=_0x194f97;Scene_MenuBase[_0x3ee6bf(0x156)][_0x3ee6bf(0x1c2)][_0x3ee6bf(0x120)](this),this[_0x3ee6bf(0x1f5)](this[_0x3ee6bf(0x251)]()),this[_0x3ee6bf(0x109)]();},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x251)]=function(){const _0x1f79c3=_0x194f97;return VisuMZ[_0x1f79c3(0x1a3)][_0x1f79c3(0x214)][_0x1f79c3(0x209)][_0x1f79c3(0x250)];},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x109)]=function(){const _0x213941=_0x194f97;if(this[_0x213941(0x22e)]()){this[_0x213941(0x13b)]();return;}const _0x185f62=VisuMZ[_0x213941(0x1a3)][_0x213941(0x214)][_0x213941(0x209)];_0x185f62&&(_0x185f62[_0x213941(0x197)]!==''||_0x185f62[_0x213941(0x27c)]!=='')&&(this[_0x213941(0x16c)]=new Sprite(ImageManager['loadTitle1'](_0x185f62[_0x213941(0x197)])),this[_0x213941(0x26b)]=new Sprite(ImageManager[_0x213941(0x212)](_0x185f62[_0x213941(0x27c)])),this[_0x213941(0x180)](this[_0x213941(0x16c)]),this[_0x213941(0x180)](this[_0x213941(0x26b)]),this[_0x213941(0x16c)]['bitmap'][_0x213941(0x196)](this['adjustSprite'][_0x213941(0x16a)](this,this[_0x213941(0x16c)])),this[_0x213941(0x26b)][_0x213941(0x15f)]['addLoadListener'](this[_0x213941(0x253)][_0x213941(0x16a)](this,this['_backSprite2'])));},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x253)]=function(_0x50d326){const _0x5ddb3b=_0x194f97;this['scaleSprite'](_0x50d326),this[_0x5ddb3b(0x240)](_0x50d326);};Imported[_0x194f97(0x12d)]&&(Scene_RecruitBoard[_0x194f97(0x24b)]={'maxListSize':VisuMZ[_0x194f97(0x19d)][_0x194f97(0x214)][_0x194f97(0x12a)][_0x194f97(0x273)]??0x2,'fadeout':VisuMZ[_0x194f97(0x19d)][_0x194f97(0x214)][_0x194f97(0x12a)][_0x194f97(0x1c6)]??!![],'exitDelay':VisuMZ[_0x194f97(0x19d)][_0x194f97(0x214)]['SceneRecruitData'][_0x194f97(0x287)]??0x5dc,'windowScale':VisuMZ[_0x194f97(0x19d)]['Settings'][_0x194f97(0x12a)][_0x194f97(0x153)]??0.8,'skillScale':VisuMZ[_0x194f97(0x19d)]['Settings'][_0x194f97(0x12a)][_0x194f97(0x1fa)]??0.6});;Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x28f)]=function(){const _0x2de332=_0x194f97;if(!Imported[_0x2de332(0x12d)])return{};return $gameSystem[_0x2de332(0x1fc)]();},Scene_RecruitBoard['prototype']['isUsingShopBustStyleUI']=function(){const _0x5b5da8=_0x194f97;if(!Imported['VisuMZ_3_ShopBustStyleUI'])return![];return this[_0x5b5da8(0x28f)]()[_0x5b5da8(0x108)];},Scene_RecruitBoard[_0x194f97(0x156)]['meetsShopBustStyleUIConditions']=function(){return this['isUsingShopBustStyleUI']();},Scene_RecruitBoard[_0x194f97(0x156)]['postCreateWindowsShopBustStyleUI']=function(){const _0x24db34=_0x194f97;this[_0x24db34(0x284)](),this[_0x24db34(0x1bd)](),this[_0x24db34(0x1d8)](),this[_0x24db34(0x223)](_0x24db34(0x22c));},Scene_RecruitBoard['prototype']['adjustWindowScaleShopBustStyleUI']=function(){const _0x5e148a=_0x194f97,_0xb0fe7e=Scene_RecruitBoard['SHOP_BUST_STYLE_UI']['windowScale'],_0x4cfcee=[this['_goldWindow'],this[_0x5e148a(0x165)]];for(const _0x29226f of _0x4cfcee){_0x29226f[_0x5e148a(0x23e)]['x']=_0x29226f[_0x5e148a(0x23e)]['y']=_0xb0fe7e;}const _0x355b76=Scene_RecruitBoard[_0x5e148a(0x24b)][_0x5e148a(0x1fa)];this['_skillWindow'][_0x5e148a(0x23e)]['x']=this[_0x5e148a(0x219)][_0x5e148a(0x23e)]['y']=_0x355b76;},Scene_RecruitBoard[_0x194f97(0x156)]['hideWindowsShopBustStyleUI']=function(){const _0xe79685=_0x194f97;this[_0xe79685(0x272)][_0xe79685(0x147)](),this[_0xe79685(0x1da)][_0xe79685(0x147)](),this['_skillWindow'][_0xe79685(0x147)]();},VisuMZ[_0x194f97(0x1a3)]['Scene_RecruitBoard_start']=Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1b6)],Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1b6)]=function(){const _0x1d85d7=_0x194f97;VisuMZ[_0x1d85d7(0x1a3)][_0x1d85d7(0x26e)][_0x1d85d7(0x120)](this),this[_0x1d85d7(0x171)]()&&Scene_RecruitBoard[_0x1d85d7(0x24b)][_0x1d85d7(0x1c6)]&&this['startFadeIn']();},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x11b)]=Scene_Map[_0x194f97(0x156)][_0x194f97(0x12c)],Scene_Map['prototype'][_0x194f97(0x12c)]=function(){const _0x415a14=_0x194f97;VisuMZ[_0x415a14(0x1a3)][_0x415a14(0x11b)][_0x415a14(0x120)](this),SceneManager[_0x415a14(0x1c1)](Scene_RecruitBoard)&&Imported['VisuMZ_3_ShopBustStyleUI']&&$gameSystem[_0x415a14(0x23f)]()&&Scene_RecruitBoard['SHOP_BUST_STYLE_UI'][_0x415a14(0x1c6)]&&(_0x415a14(0x204)===_0x415a14(0x22d)?_0x451944+=_0x3e92a1+0x18:this[_0x415a14(0x18b)]());},VisuMZ['RecruitBoard'][_0x194f97(0x1db)]=Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x187)],Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x187)]=function(){const _0x56d092=_0x194f97;this[_0x56d092(0x171)]()?this[_0x56d092(0x1b0)]():VisuMZ[_0x56d092(0x1a3)][_0x56d092(0x1db)][_0x56d092(0x120)](this);},Scene_RecruitBoard[_0x194f97(0x156)]['exitShopBustStyleUI']=function(){const _0x36c4b7=_0x194f97;this[_0x36c4b7(0x159)]&&this['_shopBustStyleUI_MessageWindow'][_0x36c4b7(0x24a)](_0x36c4b7(0x246));this[_0x36c4b7(0x165)][_0x36c4b7(0x1a2)](),this['_goldWindow'][_0x36c4b7(0x1a2)]();const _0x2ed0c9=Scene_RecruitBoard[_0x36c4b7(0x24b)]['exitDelay'];setTimeout(this[_0x36c4b7(0x19e)][_0x36c4b7(0x16a)](this),_0x2ed0c9);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x19e)]=function(){const _0x1bc5ca=_0x194f97;Scene_RecruitBoard[_0x1bc5ca(0x24b)][_0x1bc5ca(0x1c6)]&&this[_0x1bc5ca(0x18b)](),VisuMZ[_0x1bc5ca(0x1a3)][_0x1bc5ca(0x1db)][_0x1bc5ca(0x120)](this);},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x205)]=Scene_Map[_0x194f97(0x156)][_0x194f97(0x232)],Scene_Map[_0x194f97(0x156)][_0x194f97(0x232)]=function(){const _0x3de271=_0x194f97;if(SceneManager[_0x3de271(0x267)](Scene_RecruitBoard)&&Imported[_0x3de271(0x12d)]&&$gameSystem['isUsingRecruitBustStyleUI']()&&Scene_RecruitBoard[_0x3de271(0x24b)]['fadeout']){if(_0x3de271(0x20e)===_0x3de271(0x1ce)){this['_shopBustStyleUI_MessageWindow']&&this[_0x3de271(0x159)][_0x3de271(0x24a)]('leave');this['_commandWindow'][_0x3de271(0x1a2)](),this[_0x3de271(0x11d)]['close']();const _0x543f88=_0x4c7863[_0x3de271(0x24b)][_0x3de271(0x287)];_0x35c377(this[_0x3de271(0x19e)][_0x3de271(0x16a)](this),_0x543f88);}else return!![];}return VisuMZ[_0x3de271(0x1a3)][_0x3de271(0x205)][_0x3de271(0x120)](this);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x21e)]=function(){const _0x49fc9d=_0x194f97;if(VisuMZ[_0x49fc9d(0x19d)][_0x49fc9d(0x214)][_0x49fc9d(0x12a)]['Window_Command_RectJS'])return VisuMZ[_0x49fc9d(0x19d)][_0x49fc9d(0x214)][_0x49fc9d(0x12a)][_0x49fc9d(0x10e)][_0x49fc9d(0x120)](this);const _0x11fb54=this['mainCommandWidth'](),_0x3b30c1=this[_0x49fc9d(0x1c8)](this[_0x49fc9d(0x170)](),!![]),_0x9b9a2c=Math[_0x49fc9d(0x26d)]((Graphics[_0x49fc9d(0x15c)]-Math[_0x49fc9d(0x23a)](Graphics[_0x49fc9d(0x15c)],0x330))/0x2),_0x123c45=this['mainAreaTop']()+0x64;return new Rectangle(_0x9b9a2c,_0x123c45,_0x11fb54,_0x3b30c1);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x170)]=function(){let _0x2f37d8=0x2;return _0x2f37d8;},Scene_RecruitBoard[_0x194f97(0x156)]['getShopBustStyleUI_GoldWindow_Rect']=function(){const _0x4bf2fe=_0x194f97;if(VisuMZ[_0x4bf2fe(0x19d)][_0x4bf2fe(0x214)][_0x4bf2fe(0x12a)][_0x4bf2fe(0x146)])return VisuMZ[_0x4bf2fe(0x19d)]['Settings']['SceneRecruitData']['Window_Gold_RectJS'][_0x4bf2fe(0x120)](this);const _0x537163=Scene_RecruitBoard['SHOP_BUST_STYLE_UI'][_0x4bf2fe(0x153)],_0xf32f7b=this[_0x4bf2fe(0x21f)]()/_0x537163,_0xcadd02=this[_0x4bf2fe(0x1c8)](0x1,!![]),_0x3c9c05=Math[_0x4bf2fe(0x26d)]((Graphics[_0x4bf2fe(0x15c)]-_0xf32f7b)/0x2),_0x18758a=this[_0x4bf2fe(0x148)]()-this[_0x4bf2fe(0x1c8)](0x4,![])-Math[_0x4bf2fe(0x26d)](_0xcadd02*_0x537163);return new Rectangle(_0x3c9c05,_0x18758a,_0xf32f7b,_0xcadd02);},Scene_RecruitBoard[_0x194f97(0x156)]['getShopBustStyleUI_ListWindow_Rect']=function(){const _0x2e3d69=_0x194f97;if(VisuMZ[_0x2e3d69(0x19d)][_0x2e3d69(0x214)][_0x2e3d69(0x12a)][_0x2e3d69(0x1fe)])return'aAZhG'==='aAZhG'?VisuMZ[_0x2e3d69(0x19d)]['Settings']['SceneRecruitData'][_0x2e3d69(0x1fe)][_0x2e3d69(0x120)](this):_0x5400da(_0x534657['$1']);const _0x45f09c=Scene_RecruitBoard[_0x2e3d69(0x24b)][_0x2e3d69(0x273)],_0x4c2018=Math['min'](Graphics[_0x2e3d69(0x15c)],0x330),_0x58eb69=Math[_0x2e3d69(0x17b)](this[_0x2e3d69(0x1f8)]()-this['calcWindowHeight'](0x4,![])-this[_0x2e3d69(0x1c8)](0x1,![])),_0x483210=0x240,_0x435007=this[_0x2e3d69(0x249)](_0x45f09c,!![]),_0x167980=Math[_0x2e3d69(0x26d)]((Graphics[_0x2e3d69(0x15c)]-_0x4c2018)/0x4),_0x3931bc=this['mainAreaTop']()+Math['floor']((_0x58eb69-_0x435007)/0x2);return new Rectangle(_0x167980,_0x3931bc,_0x483210,_0x435007);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x249)]=function(_0x54d744){const _0x3c243f=_0x194f97;return Window_RecruitBoardList[_0x3c243f(0x156)][_0x3c243f(0x228)](_0x54d744);},Scene_RecruitBoard[_0x194f97(0x156)]['getShopBustStyleUI_SkillWindow_Rect']=function(){const _0x4934fe=_0x194f97;if(VisuMZ[_0x4934fe(0x19d)][_0x4934fe(0x214)]['SceneShopData'][_0x4934fe(0x254)])return VisuMZ[_0x4934fe(0x19d)][_0x4934fe(0x214)][_0x4934fe(0x235)][_0x4934fe(0x254)][_0x4934fe(0x120)](this);const _0x555626=Scene_RecruitBoard['SHOP_BUST_STYLE_UI'][_0x4934fe(0x1fa)],_0x236702=this[_0x4934fe(0x157)](),_0x84335c=0x160,_0x1b17a9=Math[_0x4934fe(0x14c)](_0x236702[_0x4934fe(0x1e9)]/_0x555626),_0x20f1af=_0x236702['x']+_0x236702[_0x4934fe(0x28d)],_0x33f218=_0x236702['y'];return new Rectangle(_0x20f1af,_0x33f218,_0x84335c,_0x1b17a9);},Scene_RecruitBoard[_0x194f97(0x156)][_0x194f97(0x1ae)]=function(){const _0x468934=_0x194f97;if(VisuMZ['ShopBustStyleUI'][_0x468934(0x214)][_0x468934(0x12a)][_0x468934(0x163)])return VisuMZ['ShopBustStyleUI']['Settings'][_0x468934(0x12a)][_0x468934(0x163)]['call'](this);const _0x3d5512=Math[_0x468934(0x23a)](Graphics['boxWidth'],0x330),_0x409353=this[_0x468934(0x1c8)](0x4,![]),_0xdbb217=Math[_0x468934(0x26d)]((Graphics[_0x468934(0x15c)]-_0x3d5512)/0x2),_0x1105c3=this['mainAreaBottom']()-_0x409353;return new Rectangle(_0xdbb217,_0x1105c3,_0x3d5512,_0x409353);};function Window_RecruitBoardCommand(){const _0x2ae068=_0x194f97;this[_0x2ae068(0x115)](...arguments);}Window_RecruitBoardCommand[_0x194f97(0x156)]=Object[_0x194f97(0x17a)](Window_HorzCommand[_0x194f97(0x156)]),Window_RecruitBoardCommand['prototype'][_0x194f97(0x1ea)]=Window_RecruitBoardCommand,Window_RecruitBoardCommand['SETTINGS']={'bgType':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x16d)][_0x194f97(0x283)]??0x0,'commandStyle':VisuMZ['RecruitBoard']['Settings']['Window'][_0x194f97(0x211)]??'auto','commands':{'recruit':{'show':!![],'text':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)]['RecruitText']??'Recruit','icon':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)][_0x194f97(0x13a)]??0x49,'help':VisuMZ['RecruitBoard'][_0x194f97(0x214)][_0x194f97(0x1dc)][_0x194f97(0x23c)]??_0x194f97(0x25d)},'cancel':{'show':!![],'text':VisuMZ[_0x194f97(0x1a3)]['Settings'][_0x194f97(0x1dc)][_0x194f97(0x190)]??'Exit','icon':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)]['Vocab'][_0x194f97(0x227)]??0x52,'help':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)][_0x194f97(0x136)]??_0x194f97(0x10a)}},'commandOrder':['recruit','cancel']},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x115)]=function(_0xd0b7ce){const _0x20ed0d=_0x194f97;Window_HorzCommand['prototype']['initialize'][_0x20ed0d(0x120)](this,_0xd0b7ce),this['createCommandNameWindow'](_0xd0b7ce);},Window_RecruitBoardCommand[_0x194f97(0x156)]['callUpdateHelp']=function(){const _0xb7ed30=_0x194f97;Window_HorzCommand[_0xb7ed30(0x156)][_0xb7ed30(0x1ee)]['call'](this);if(this['_commandNameWindow'])this[_0xb7ed30(0x160)]();},Window_RecruitBoardCommand['prototype'][_0x194f97(0x14a)]=function(){const _0x3a5673=_0x194f97;if(SceneManager[_0x3a5673(0x278)]&&SceneManager[_0x3a5673(0x278)][_0x3a5673(0x171)]())return 0x1;return 0x2;},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x164)]=function(_0x54b886){const _0x13ba58=_0x194f97,_0x399356=new Rectangle(0x0,0x0,_0x54b886[_0x13ba58(0x28d)],_0x54b886['height']);this[_0x13ba58(0x206)]=new Window_Base(_0x399356),this[_0x13ba58(0x206)][_0x13ba58(0x1cc)]=0x0,this[_0x13ba58(0x180)](this['_commandNameWindow']),this[_0x13ba58(0x160)]();},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x160)]=function(){const _0x31306e=_0x194f97,_0x2caa9d=this[_0x31306e(0x206)];_0x2caa9d[_0x31306e(0x221)][_0x31306e(0x119)]();const _0x55dd05=this[_0x31306e(0x1aa)](this[_0x31306e(0x18c)]());if(_0x55dd05==='icon'){const _0xbcb5b2=this[_0x31306e(0x13d)](this[_0x31306e(0x18c)]());let _0xf02d74=this[_0x31306e(0x224)](this['index']());_0xf02d74=_0xf02d74['replace'](/\\I\[(\d+)\]/gi,''),_0x2caa9d['resetFontSettings'](),this[_0x31306e(0x1d1)](_0xf02d74,_0xbcb5b2),this[_0x31306e(0x141)](_0xf02d74,_0xbcb5b2),this['commandNameWindowCenter'](_0xf02d74,_0xbcb5b2);}},Window_RecruitBoardCommand['prototype'][_0x194f97(0x1d1)]=function(_0x3302aa,_0x37f233){},Window_RecruitBoardCommand[_0x194f97(0x156)]['commandNameWindowDrawText']=function(_0x43956c,_0x501f0a){const _0x333c0f=_0x194f97,_0x3385c9=this['_commandNameWindow'];_0x3385c9[_0x333c0f(0x135)](_0x43956c,0x0,_0x501f0a['y'],_0x3385c9[_0x333c0f(0x289)],_0x333c0f(0x167));},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x21b)]=function(_0x1dbd86,_0x40984b){const _0x16eec9=_0x194f97,_0x354bce=this['_commandNameWindow'],_0x37e242=$gameSystem['windowPadding'](),_0x45ab0d=_0x40984b['x']+Math['floor'](_0x40984b[_0x16eec9(0x28d)]/0x2)+_0x37e242;_0x354bce['x']=_0x354bce[_0x16eec9(0x28d)]/-0x2+_0x45ab0d,_0x354bce['y']=Math[_0x16eec9(0x26d)](_0x40984b[_0x16eec9(0x1e9)]/0x2);},Window_RecruitBoardCommand[_0x194f97(0x156)]['makeCommandList']=function(){const _0x1ed75a=_0x194f97;for(const _0x97fdb1 of Window_RecruitBoardCommand[_0x1ed75a(0x231)][_0x1ed75a(0x26f)]){this[_0x1ed75a(0x15b)](_0x97fdb1);}},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x15b)]=function(_0x279824){const _0x565385=_0x194f97,_0x134a73=Window_RecruitBoardCommand[_0x565385(0x231)]['commands'][_0x279824];if(!this['isCustomCommandVisible'](_0x134a73))return;const _0x438dea=_0x279824,_0x2e4250=Number(_0x134a73[_0x565385(0x18a)]);let _0x5a48ed=_0x134a73[_0x565385(0x194)];_0x2e4250>0x0&&this[_0x565385(0x192)]()!=='text'&&(_0x5a48ed=_0x565385(0x280)[_0x565385(0x12b)](_0x2e4250,_0x5a48ed));const _0x15f850=this['isCustomCommandEnabled'](_0x134a73);this[_0x565385(0x193)](_0x5a48ed,_0x438dea,_0x15f850);},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x233)]=function(_0x99139a){const _0x4a511e=_0x194f97;return _0x99139a[_0x4a511e(0x176)];},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x1d0)]=function(_0x249209){return!![];},Window_RecruitBoardCommand['prototype'][_0x194f97(0x259)]=function(){const _0x3736c0=_0x194f97;return _0x3736c0(0x167);},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x1a1)]=function(_0x893a6b){const _0x2ef59f=_0x194f97,_0x1f93ce=this['commandStyleCheck'](_0x893a6b);if(_0x1f93ce==='iconText')this['drawItemStyleIconText'](_0x893a6b);else{if(_0x1f93ce===_0x2ef59f(0x18a)){if(_0x2ef59f(0x168)!==_0x2ef59f(0x247))this['drawItemStyleIcon'](_0x893a6b);else{const _0x251fd5=_0x50b5f5['x']+_0x15c554[_0x2ef59f(0x26d)]((_0x442ad0[_0x2ef59f(0x28d)]-_0x44f226)/0x2);this[_0x2ef59f(0x290)](_0x4c34e5,_0x251fd5,_0x13f907['y'],_0x3e7b43);}}else _0x2ef59f(0x132)==='AQhRe'?(_0x3eb0a8[_0x2ef59f(0x1a3)][_0x2ef59f(0x1c0)][_0x2ef59f(0x120)](this,_0x4925f2),_0x2b7410[_0x2ef59f(0x24f)]&&_0x4435f2[_0x2ef59f(0x24f)]['ParseNotetagCosts'](_0x1bcce1)):Window_HorzCommand[_0x2ef59f(0x156)]['drawItem']['call'](this,_0x893a6b);}},Window_RecruitBoardCommand[_0x194f97(0x156)]['commandStyle']=function(){const _0x5d7e61=_0x194f97;return Window_RecruitBoardCommand[_0x5d7e61(0x231)]['commandStyle'];},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x1aa)]=function(_0x3d2230){const _0x5934e6=_0x194f97;if(_0x3d2230<0x0)return _0x5934e6(0x194);const _0x5371da=this[_0x5934e6(0x192)]();if(_0x5371da!==_0x5934e6(0x1bf))return _0x5371da;else{if(this[_0x5934e6(0x1c5)]()>0x0){const _0x527ce9=this['commandName'](_0x3d2230);if(_0x527ce9[_0x5934e6(0x28b)](/\\I\[(\d+)\]/i)){if(_0x5934e6(0x27f)===_0x5934e6(0x27f)){const _0x154373=this['itemLineRect'](_0x3d2230),_0x16d9a8=this[_0x5934e6(0x207)](_0x527ce9)[_0x5934e6(0x28d)];if(_0x16d9a8<=_0x154373['width'])return _0x5934e6(0x178);else{if(_0x5934e6(0x1e5)==='CmMDc')this['_discount']=_0x206899,_0x5729fd['prototype']['initialize']['call'](this,_0x2bce02);else return _0x5934e6(0x18a);}}else{if(this['isUsingShopBustStyleUI']())return this[_0x5934e6(0x20a)]();if(_0x782277[_0x5934e6(0x1a3)][_0x5934e6(0x214)][_0x5934e6(0x16d)][_0x5934e6(0x1a5)])return _0x562432[_0x5934e6(0x1a3)][_0x5934e6(0x214)][_0x5934e6(0x16d)]['ListWindow_RectJS'][_0x5934e6(0x120)](this);const _0x110e93=_0x34d516['boxWidth']-this[_0x5934e6(0x230)]()[_0x5934e6(0x28d)],_0x32e3ab=this[_0x5934e6(0x1f8)]()-this[_0x5934e6(0x1c8)](0x1,!![]),_0x56e28a=0x0,_0x1714cc=this[_0x5934e6(0x1f7)]()+this[_0x5934e6(0x1c8)](0x1,!![]);return new _0x40a3ef(_0x56e28a,_0x1714cc,_0x110e93,_0x32e3ab);}}}}return _0x5934e6(0x194);},Window_RecruitBoardCommand[_0x194f97(0x156)][_0x194f97(0x161)]=function(_0x37e8bf){const _0x45b121=_0x194f97,_0x12ce5e=this[_0x45b121(0x13d)](_0x37e8bf),_0x5291b6=this['commandName'](_0x37e8bf),_0x8e2b0f=this[_0x45b121(0x207)](_0x5291b6)[_0x45b121(0x28d)];this[_0x45b121(0x154)](this[_0x45b121(0x27e)](_0x37e8bf));const _0xd70e90=this[_0x45b121(0x259)]();if(_0xd70e90===_0x45b121(0x1ec))this[_0x45b121(0x290)](_0x5291b6,_0x12ce5e['x']+_0x12ce5e[_0x45b121(0x28d)]-_0x8e2b0f,_0x12ce5e['y'],_0x8e2b0f);else{if(_0xd70e90==='center'){const _0x135b3a=_0x12ce5e['x']+Math[_0x45b121(0x26d)]((_0x12ce5e['width']-_0x8e2b0f)/0x2);this[_0x45b121(0x290)](_0x5291b6,_0x135b3a,_0x12ce5e['y'],_0x8e2b0f);}else this[_0x45b121(0x290)](_0x5291b6,_0x12ce5e['x'],_0x12ce5e['y'],_0x8e2b0f);}},Window_RecruitBoardCommand[_0x194f97(0x156)]['drawItemStyleIcon']=function(_0x10ca70){const _0x237a8f=_0x194f97;this[_0x237a8f(0x224)](_0x10ca70)[_0x237a8f(0x28b)](/\\I\[(\d+)\]/i);const _0x38d56e=Number(RegExp['$1'])||0x0,_0x55f59e=this[_0x237a8f(0x13d)](_0x10ca70),_0xa770a5=_0x55f59e['x']+Math[_0x237a8f(0x26d)]((_0x55f59e['width']-ImageManager[_0x237a8f(0x173)])/0x2),_0x421cfe=_0x55f59e['y']+(_0x55f59e[_0x237a8f(0x1e9)]-ImageManager[_0x237a8f(0x10b)])/0x2;this[_0x237a8f(0x220)](_0x38d56e,_0xa770a5,_0x421cfe);},Window_RecruitBoardCommand['prototype'][_0x194f97(0x1bc)]=function(){const _0x3f46a8=_0x194f97;Window_HorzCommand[_0x3f46a8(0x156)][_0x3f46a8(0x1bc)][_0x3f46a8(0x120)](this);if(this[_0x3f46a8(0x272)]){if(_0x3f46a8(0x155)===_0x3f46a8(0x155)){const _0xb9e924=this[_0x3f46a8(0x21d)](),_0xb75870=Window_RecruitBoardCommand[_0x3f46a8(0x231)]['commands'];this['_helpWindow'][_0x3f46a8(0x1be)](_0xb75870[_0xb9e924][_0x3f46a8(0x127)]||'');}else return _0x9112e9['ShopBustStyleUI'][_0x3f46a8(0x214)][_0x3f46a8(0x12a)][_0x3f46a8(0x163)][_0x3f46a8(0x120)](this);}};function Window_RecruitBoardList(){const _0x53d127=_0x194f97;this[_0x53d127(0x115)](...arguments);}Window_RecruitBoardList['prototype']=Object[_0x194f97(0x17a)](Window_StatusBase[_0x194f97(0x156)]),Window_RecruitBoardList[_0x194f97(0x156)]['constructor']=Window_RecruitBoardList,Window_RecruitBoardList[_0x194f97(0x231)]={'bgType':VisuMZ[_0x194f97(0x1a3)]['Settings'][_0x194f97(0x16d)][_0x194f97(0x22a)]??0x0,'noActorHelpDesc':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)]['noActorItemText']??'There\x20are\x20currently\x20no\x20mercenaries\x20to\x20recruit.','noActorItemText':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)]['noActorHelpDesc']??_0x194f97(0x1d3)},Window_RecruitBoardList['prototype'][_0x194f97(0x115)]=function(_0xe66028,_0x5e0dea){const _0x5056d5=_0x194f97;this['_discount']=_0x5e0dea,Window_StatusBase[_0x5056d5(0x156)]['initialize'][_0x5056d5(0x120)](this,_0xe66028);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1c5)]=function(){const _0x2ecbfc=_0x194f97;return this[_0x2ecbfc(0x1b3)]?this['_data'][_0x2ecbfc(0x15e)]||0x1:0x1;},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x241)]=function(){const _0x53ff15=_0x194f97;return this[_0x53ff15(0x1b7)]()*0x4+0x8;},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x19c)]=function(){const _0x1500d6=_0x194f97;return this[_0x1500d6(0x20c)]();},Window_RecruitBoardList['prototype'][_0x194f97(0x20c)]=function(){const _0x5aff6d=_0x194f97;return this[_0x5aff6d(0x1fd)](this[_0x5aff6d(0x18c)]());},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1fd)]=function(_0x2ee235){const _0x13ce7b=_0x194f97;return this[_0x13ce7b(0x1b3)]&&_0x2ee235>=0x0?this[_0x13ce7b(0x1b3)][_0x2ee235]:null;},Window_RecruitBoardList[_0x194f97(0x156)]['isCurrentItemEnabled']=function(){const _0x514c77=_0x194f97;return this['isActorEnabled'](this[_0x514c77(0x19c)]());},Window_RecruitBoardList[_0x194f97(0x156)]['isActorEnabled']=function(_0x10ae65){const _0x1a5887=_0x194f97;if(!_0x10ae65)return![];if(Imported[_0x1a5887(0x162)]){if(!VisuMZ[_0x1a5887(0x24f)]['CheckMeetBuyRequirements'](_0x10ae65))return![];}return $gameParty['gold']()>=this[_0x1a5887(0x1eb)](_0x10ae65);},Window_RecruitBoardList['prototype'][_0x194f97(0x24d)]=function(_0x3e9eea,_0x1a852f){const _0x10d3eb=_0x194f97,_0x305357=Window_StatusBase[_0x10d3eb(0x156)]['createInnerSprite'][_0x10d3eb(0x120)](this,_0x3e9eea,_0x1a852f);if(_0x305357){if(_0x10d3eb(0x1ac)!==_0x10d3eb(0x1a7))_0x305357['opacity']=this[_0x10d3eb(0x221)][_0x10d3eb(0x27b)];else return _0x318477[_0x10d3eb(0x1a3)]['Settings']['BgSettings'][_0x10d3eb(0x250)];}return _0x305357;},Window_RecruitBoardList['prototype'][_0x194f97(0x1b1)]=function(_0x4276bd){return![];},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x245)]=function(_0x29a4b3){const _0x1bbac8=_0x194f97;this[_0x1bbac8(0x130)]=_0x29a4b3,this[_0x1bbac8(0x184)]();},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x184)]=function(){const _0x2f963b=_0x194f97;this[_0x2f963b(0x222)](),Window_StatusBase[_0x2f963b(0x156)][_0x2f963b(0x184)][_0x2f963b(0x120)](this);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x222)]=function(){const _0x134779=_0x194f97;this[_0x134779(0x130)]?this[_0x134779(0x1b3)]=this['_actors'][_0x134779(0x18f)](_0x5b3e5e=>this[_0x134779(0x112)](_0x5b3e5e)):this[_0x134779(0x1b3)]=[];},Window_RecruitBoardList[_0x194f97(0x156)]['includes']=function(_0x5ca23e){const _0x466b10=_0x194f97;if(_0x5ca23e){if(_0x466b10(0x129)==='WSPLx'){if($gameParty[_0x466b10(0x16f)]()[_0x466b10(0x112)](_0x5ca23e))return![];}else _0x4162bf[_0x466b10(0x23e)]['x']=_0x377889['scale']['y']=_0xc9a63b;}return!![];},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1b4)]=function(){const _0x25377a=_0x194f97,_0x366d02=this[_0x25377a(0x18c)]();this[_0x25377a(0x1c7)](_0x366d02>=0x0?_0x366d02:0x0);},Window_RecruitBoardList[_0x194f97(0x156)]['drawItem']=function(_0xa1bb36){const _0x594ae4=_0x194f97,_0x427dd3=this[_0x594ae4(0x1fd)](_0xa1bb36);if(_0x427dd3)'WKllL'!=='fWFrz'?this[_0x594ae4(0x1de)](_0xa1bb36):_0x1df6ca[_0x594ae4(0x24f)][_0x594ae4(0x1a4)](_0x3b2e2b['actor'](),-0x1);else{if(_0x594ae4(0x26a)!==_0x594ae4(0x226))this[_0x594ae4(0x1e7)](_0xa1bb36);else{const _0x5eef59=arguments[0x0];this[_0x594ae4(0x154)](this['isActorEnabled'](_0x5eef59));if(_0x291f5a['RecruitBoard'][_0x594ae4(0x214)]['Window'][_0x594ae4(0x19f)])return _0x10c7ee[_0x594ae4(0x1a3)][_0x594ae4(0x214)][_0x594ae4(0x16d)][_0x594ae4(0x19f)][_0x594ae4(0x277)](this,arguments);this[_0x594ae4(0x143)](),this[_0x594ae4(0x154)](!![]);}}},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1de)]=function(_0x3e72b3){const _0x2382ca=_0x194f97,_0x745b28=this[_0x2382ca(0x1fd)](_0x3e72b3);this[_0x2382ca(0x1e0)]=_0x745b28,this[_0x2382ca(0x268)]=_0x3e72b3;const _0x3a5d5a=this[_0x2382ca(0x172)](_0x3e72b3);this[_0x2382ca(0x281)](_0x745b28,_0x3a5d5a['x'],_0x3a5d5a['y'],Math['min'](_0x3a5d5a['width'],ImageManager['faceWidth']),Math[_0x2382ca(0x23a)](_0x3a5d5a[_0x2382ca(0x1e9)],ImageManager[_0x2382ca(0x236)])),this[_0x2382ca(0x1c9)](_0x745b28,_0x3a5d5a);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x172)]=function(_0x203376){const _0x39a89a=_0x194f97,_0x5baf0c=this[_0x39a89a(0x1f6)](_0x203376);return _0x5baf0c['x']+=0x2,_0x5baf0c['y']+=0x2,_0x5baf0c[_0x39a89a(0x28d)]-=0x4,_0x5baf0c[_0x39a89a(0x1e9)]-=0x4,_0x5baf0c;},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x11c)]=function(){const _0x580b29=_0x194f97;if(Imported[_0x580b29(0x188)]){if('nHAco'!==_0x580b29(0x1b9))return VisuMZ['MainMenuCore'][_0x580b29(0x214)]['StatusGraphic'];else{const _0x58accc=this[_0x580b29(0x1f6)](_0x2db868);return _0x58accc['x']+=0x2,_0x58accc['y']+=0x2,_0x58accc[_0x580b29(0x28d)]-=0x4,_0x58accc[_0x580b29(0x1e9)]-=0x4,_0x58accc;}}else return _0x580b29(0x25f)==='GPmxm'?![]:_0x580b29(0x1f3);},Window_RecruitBoardList['prototype']['drawActorGraphic']=function(_0x4bba1f,_0x12a910,_0x1ccf1a,_0x4357d3,_0x2177a7){const _0x147c47=_0x194f97;if(this[_0x147c47(0x11c)]()===_0x147c47(0x12e))return;else{if(this['graphicType']()===_0x147c47(0x123)){const _0x560499=ImageManager['loadCharacter'](_0x4bba1f[_0x147c47(0x15a)]());_0x560499[_0x147c47(0x196)](this[_0x147c47(0x11f)][_0x147c47(0x16a)](this,_0x4bba1f,_0x12a910,_0x1ccf1a+0x1,_0x4357d3,_0x2177a7-0x2));}else{if(this['graphicType']()==='svbattler'){if(_0x147c47(0x23d)!==_0x147c47(0x1cd)){const _0x401868=ImageManager[_0x147c47(0x1dd)](_0x4bba1f[_0x147c47(0x169)]());_0x401868[_0x147c47(0x196)](this[_0x147c47(0x218)][_0x147c47(0x16a)](this,_0x4bba1f,_0x12a910,_0x1ccf1a+0x1,_0x4357d3,_0x2177a7-0x2));}else{if(_0x3867bf[_0x147c47(0x19d)][_0x147c47(0x214)]['SceneRecruitData']['Window_ShopMsg_RectJS'])return _0x53748c[_0x147c47(0x19d)][_0x147c47(0x214)][_0x147c47(0x12a)]['Window_ShopMsg_RectJS'][_0x147c47(0x120)](this);const _0x14380c=_0x376ddb['min'](_0x5ee0e4[_0x147c47(0x15c)],0x330),_0x43eaa1=this[_0x147c47(0x1c8)](0x4,![]),_0x22a5ab=_0x553fbe[_0x147c47(0x26d)]((_0x403d17[_0x147c47(0x15c)]-_0x14380c)/0x2),_0x56fbf0=this[_0x147c47(0x148)]()-_0x43eaa1;return new _0x2412f6(_0x22a5ab,_0x56fbf0,_0x14380c,_0x43eaa1);}}else{const _0x261d8b=ImageManager[_0x147c47(0x244)](_0x4bba1f[_0x147c47(0x110)]());_0x261d8b[_0x147c47(0x196)](this['drawItemActorFace'][_0x147c47(0x16a)](this,_0x4bba1f,_0x12a910,_0x1ccf1a,_0x4357d3,_0x2177a7));}}}},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x195)]=function(_0x23965f,_0x224f41,_0x31f060,_0x51bf7f,_0x377514){const _0x5f4d5d=_0x194f97;_0x51bf7f=_0x51bf7f||ImageManager[_0x5f4d5d(0x1e6)],_0x377514=_0x377514||ImageManager[_0x5f4d5d(0x236)];const _0x4028e9=ImageManager['faceWidth'],_0x2b646f=_0x377514,_0x2c7542=_0x224f41+Math[_0x5f4d5d(0x26d)]((_0x51bf7f-_0x4028e9)/0x2);this[_0x5f4d5d(0x154)](!![]),this[_0x5f4d5d(0x150)](_0x23965f,_0x2c7542,_0x31f060,_0x4028e9,_0x2b646f),this['changePaintOpacity'](!![]);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1c9)]=function(){const _0x7b255e=_0x194f97,_0xb4a819=arguments[0x0];this[_0x7b255e(0x154)](this[_0x7b255e(0x19a)](_0xb4a819));if(VisuMZ['RecruitBoard']['Settings'][_0x7b255e(0x16d)][_0x7b255e(0x19f)])return VisuMZ['RecruitBoard'][_0x7b255e(0x214)][_0x7b255e(0x16d)]['ListWindow_DrawJS']['apply'](this,arguments);this[_0x7b255e(0x143)](),this['changePaintOpacity'](!![]);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x279)]=function(_0x2e1e42,_0x4de429,_0x5d2912,_0x4f5719){const _0x46ede6=_0x194f97;_0x4f5719=_0x4f5719||0xa8;if(_0x4de429+_0x4f5719>this[_0x46ede6(0x289)])return;Window_StatusBase[_0x46ede6(0x156)][_0x46ede6(0x279)]['call'](this,_0x2e1e42,_0x4de429,_0x5d2912,_0x4f5719);},Window_RecruitBoardList[_0x194f97(0x156)]['placeBasicGauges']=function(_0xa695f6,_0xa450bf,_0xebdb78){const _0x530c70=_0x194f97,_0x4741a9=0x80;if(_0xa450bf+_0x4741a9>this[_0x530c70(0x289)])return;Window_StatusBase[_0x530c70(0x156)][_0x530c70(0x255)][_0x530c70(0x120)](this,_0xa695f6,_0xa450bf,_0xebdb78);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x143)]=function(){const _0x1b3260=_0x194f97,_0x55bc03=arguments[0x0],_0x3582df=arguments[0x1],_0x2be29d=_0x3582df['x']+ImageManager['faceWidth']+0x24,_0x4405ee=_0x3582df['y']+Math[_0x1b3260(0x26d)](this[_0x1b3260(0x1b7)]()*0x1),_0x190a3e=ColorManager[_0x1b3260(0x213)](),_0x102364=ColorManager['dimColor2']();this[_0x1b3260(0x221)][_0x1b3260(0x126)](ImageManager[_0x1b3260(0x1e6)],_0x3582df['y'],_0x3582df[_0x1b3260(0x28d)]-ImageManager[_0x1b3260(0x1e6)]+0x6,this[_0x1b3260(0x1b7)](),_0x102364,_0x190a3e),this[_0x1b3260(0x139)](this[_0x1b3260(0x1eb)](_0x55bc03),TextManager[_0x1b3260(0x1af)],_0x3582df['x'],_0x3582df['y'],_0x3582df['width']-this[_0x1b3260(0x140)]()),this['drawActorSimpleStatus'](_0x55bc03,_0x2be29d,_0x4405ee);const _0x1a2de1=_0x2be29d+0x174,_0xee1b7d=_0x3582df[_0x1b3260(0x28d)]-_0x1a2de1-0x2;if(Imported[_0x1b3260(0x269)]&&_0xee1b7d>=0x12c){const _0x41119f=this['displayedParameters'](),_0x25a08b=Math['floor'](_0xee1b7d/0x2)-0x18;let _0x2cb60c=_0x1a2de1,_0x4f7b20=_0x3582df['height']-this[_0x1b3260(0x1b7)](),_0x38cd65=_0x4405ee+Math[_0x1b3260(0x26d)]((_0x4f7b20-Math[_0x1b3260(0x17b)](_0x41119f['length']/0x2)*this['gaugeLineHeight']())/0x2),_0x65e246=0x0;for(const _0x206cfc of _0x41119f){if(_0x1b3260(0x21c)!==_0x1b3260(0x21c))this[_0x1b3260(0x1b3)]=[];else{this['resetFontSettings'](),this[_0x1b3260(0x262)](_0x2cb60c,_0x38cd65,_0x25a08b,_0x206cfc,!![]),this['resetTextColor'](),this['contents'][_0x1b3260(0x1e3)]-=0x8;const _0xfbd5b6=_0x55bc03[_0x1b3260(0x1d6)](_0x206cfc,!![]);this['contents'][_0x1b3260(0x135)](_0xfbd5b6,_0x2cb60c,_0x38cd65,_0x25a08b,this[_0x1b3260(0x271)](),'right'),_0x65e246++,_0x65e246%0x2===0x0?(_0x2cb60c=_0x1a2de1,_0x38cd65+=this['gaugeLineHeight']()):_0x2cb60c+=_0x25a08b+0x18;}}}},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1eb)]=function(_0x2101c9){const _0x45fd8e=_0x194f97,_0x312b8=Math[_0x45fd8e(0x17b)](_0x2101c9[_0x45fd8e(0x1eb)]()*(0x1-this['_discount']));return _0x312b8;},VisuMZ['RecruitBoard'][_0x194f97(0x18e)]=function(_0x1f0fe5){const _0x527e02=_0x194f97,_0x30caff=Math['ceil'](_0x1f0fe5[_0x527e02(0x1eb)]()*(0x1-SceneManager[_0x527e02(0x278)]['_discount']));return _0x30caff;},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x186)]=function(){const _0x558828=_0x194f97;return VisuMZ[_0x558828(0x275)][_0x558828(0x214)][_0x558828(0x1ed)][_0x558828(0x10d)];},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1e7)]=function(_0xa12911){const _0x5d8244=_0x194f97,_0xb1f934=this[_0x5d8244(0x1f6)](_0xa12911),_0x30c6c2=Window_RecruitBoardList[_0x5d8244(0x231)]['noActorItemText'],_0x1c4c42=this[_0x5d8244(0x207)](_0x30c6c2),_0x371440=_0xb1f934['x']+Math[_0x5d8244(0x26d)]((_0xb1f934[_0x5d8244(0x28d)]-_0x1c4c42[_0x5d8244(0x28d)])/0x2),_0x3a1f63=_0xb1f934['y']+Math[_0x5d8244(0x26d)]((_0xb1f934[_0x5d8244(0x1e9)]-_0x1c4c42[_0x5d8244(0x1e9)])/0x2);this['drawTextEx'](_0x30c6c2,_0x371440,_0x3a1f63);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x210)]=function(_0x22d840){const _0x5c2da1=_0x194f97;this[_0x5c2da1(0x219)]=_0x22d840,this[_0x5c2da1(0x219)][_0x5c2da1(0x243)](this[_0x5c2da1(0x1fd)](0x0));},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x1ee)]=function(){const _0x162a01=_0x194f97;Window_StatusBase[_0x162a01(0x156)][_0x162a01(0x1ee)][_0x162a01(0x120)](this),this[_0x162a01(0x121)]&&this[_0x162a01(0x219)]&&this[_0x162a01(0x219)]['setActor'](this[_0x162a01(0x19c)]());},Window_RecruitBoardList['prototype'][_0x194f97(0x1bc)]=function(){const _0x349bc7=_0x194f97;if(this[_0x349bc7(0x19c)]()){if(_0x349bc7(0x113)===_0x349bc7(0x113))this[_0x349bc7(0x272)][_0x349bc7(0x1be)](this[_0x349bc7(0x19c)]()[_0x349bc7(0x215)]());else return _0x3cfa91[_0x349bc7(0x19d)]['Settings'][_0x349bc7(0x235)][_0x349bc7(0x254)]['call'](this);}else this[_0x349bc7(0x272)][_0x349bc7(0x1be)](Window_RecruitBoardList['SETTINGS'][_0x349bc7(0x1cb)]);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x114)]=function(){const _0x25bb4a=_0x194f97;SoundManager[_0x25bb4a(0x1b8)]();};function Window_RecruitBoardSkills(){const _0x1cdf81=_0x194f97;this[_0x1cdf81(0x115)](...arguments);}Window_RecruitBoardSkills['prototype']=Object[_0x194f97(0x17a)](Window_Base['prototype']),Window_RecruitBoardSkills[_0x194f97(0x156)][_0x194f97(0x1ea)]=Window_RecruitBoardSkills,Window_RecruitBoardSkills[_0x194f97(0x231)]={'bgType':VisuMZ['RecruitBoard'][_0x194f97(0x214)]['Window'][_0x194f97(0x216)]??0x0,'titleText':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)][_0x194f97(0x14b)]??_0x194f97(0x266),'andMoreText':VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x214)][_0x194f97(0x1dc)][_0x194f97(0x203)]??_0x194f97(0x208)},Window_RecruitBoardSkills[_0x194f97(0x156)][_0x194f97(0x115)]=function(_0x11bf39){const _0x16bbeb=_0x194f97;Window_Base[_0x16bbeb(0x156)][_0x16bbeb(0x115)][_0x16bbeb(0x120)](this,_0x11bf39),this[_0x16bbeb(0x237)]=null;},Window_RecruitBoardSkills[_0x194f97(0x156)][_0x194f97(0x243)]=function(_0x304914){const _0x44f40b=_0x194f97;this['_actor']!==_0x304914&&(this[_0x44f40b(0x237)]=_0x304914,this[_0x44f40b(0x184)]());},Window_RecruitBoardSkills['prototype'][_0x194f97(0x184)]=function(){const _0x1a85e8=_0x194f97;this[_0x1a85e8(0x221)][_0x1a85e8(0x119)](),this['drawSkillsListTitle'](),this[_0x1a85e8(0x1d2)]();},Window_RecruitBoardSkills[_0x194f97(0x156)]['drawSkillsListTitle']=function(){const _0x55bad7=_0x194f97,_0xc84e6e=Window_RecruitBoardSkills['SETTINGS'][_0x55bad7(0x14b)],_0x136bb2=this[_0x55bad7(0x207)](_0xc84e6e)['width'],_0x35c445=Math[_0x55bad7(0x26d)]((this[_0x55bad7(0x289)]-_0x136bb2)/0x2),_0x447e5f=0x0;this[_0x55bad7(0x290)](_0xc84e6e,_0x35c445,_0x447e5f);},Window_RecruitBoardSkills[_0x194f97(0x156)][_0x194f97(0x1d2)]=function(){const _0x560b2b=_0x194f97;if(!this[_0x560b2b(0x237)])return;const _0x3d74dd=this['actorSkills'](),_0x5644c9=this[_0x560b2b(0x140)](),_0x2c551d=this[_0x560b2b(0x289)]-this[_0x560b2b(0x140)]()*0x2;let _0x32b247=this['lineHeight']();for(const _0x19203e of _0x3d74dd){this['resetFontSettings']();if(_0x32b247+this[_0x560b2b(0x1b7)]()*0x2>this[_0x560b2b(0x118)]){const _0x200857=Window_RecruitBoardSkills[_0x560b2b(0x231)][_0x560b2b(0x203)],_0x5312e2=this[_0x560b2b(0x207)](_0x200857)[_0x560b2b(0x28d)],_0x46aec0=Math[_0x560b2b(0x26d)]((this[_0x560b2b(0x289)]-_0x5312e2)/0x2);this[_0x560b2b(0x290)](_0x200857,_0x46aec0,_0x32b247);return;}else this[_0x560b2b(0x14e)](_0x19203e,_0x5644c9,_0x32b247,_0x2c551d),_0x32b247+=this[_0x560b2b(0x1b7)]();}},Window_RecruitBoardSkills['prototype'][_0x194f97(0x270)]=function(){const _0x4a6599=_0x194f97;let _0x1978d8=this[_0x4a6599(0x237)]['skills']()[_0x4a6599(0x177)](null)[_0x4a6599(0x177)](undefined);return Imported[_0x4a6599(0x1a8)]&&(_0x4a6599(0x145)!==_0x4a6599(0x189)?_0x1978d8=_0x1978d8[_0x4a6599(0x18f)](_0x32cbe2=>this[_0x4a6599(0x237)][_0x4a6599(0x263)](_0x32cbe2)):(this[_0x4a6599(0x223)]('onListCancel'),this[_0x4a6599(0x1d8)](),this[_0x4a6599(0x165)]['show']())),_0x1978d8;},VisuMZ['RecruitBoard']['Scene_Boot_process_VisuMZ_MoreCurrencies_Notetags']=Scene_Boot[_0x194f97(0x156)][_0x194f97(0x22f)],Scene_Boot['prototype'][_0x194f97(0x22f)]=function(){const _0x355298=_0x194f97;VisuMZ['RecruitBoard'][_0x355298(0x24e)][_0x355298(0x120)](this);if(VisuMZ[_0x355298(0x24f)]['version']<1.03){let _0x358cfd='';_0x358cfd+=_0x355298(0x116),_0x358cfd+='in\x20order\x20for\x20VisuMZ_4_RecruitingBoard\x20to\x20work.',alert(_0x358cfd),SceneManager[_0x355298(0x1a6)]();}if(VisuMZ[_0x355298(0x149)])return;const _0x181fde=[$dataActors];for(const _0x214077 of _0x181fde){for(const _0x13f095 of _0x214077){if(!_0x13f095)continue;VisuMZ[_0x355298(0x24f)]&&(_0x355298(0x1f4)!=='bbViw'?this[_0x355298(0x19c)]()?this[_0x355298(0x272)][_0x355298(0x1be)](this[_0x355298(0x19c)]()[_0x355298(0x215)]()):this[_0x355298(0x272)][_0x355298(0x1be)](_0x272af2[_0x355298(0x231)]['noActorHelpDesc']):VisuMZ[_0x355298(0x24f)][_0x355298(0x17d)](_0x13f095));}}},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x1c0)]=VisuMZ[_0x194f97(0x1c0)],VisuMZ[_0x194f97(0x1c0)]=function(_0x317afa){const _0x14f123=_0x194f97;VisuMZ[_0x14f123(0x1a3)]['ParseActorNotetags'][_0x14f123(0x120)](this,_0x317afa),VisuMZ[_0x14f123(0x24f)]&&VisuMZ[_0x14f123(0x24f)]['ParseNotetagCosts'](_0x317afa);},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x158)]=DataManager[_0x194f97(0x151)],DataManager['prepareMoreCurrenciesObj']=function(){const _0x12d206=_0x194f97;VisuMZ[_0x12d206(0x1a3)][_0x12d206(0x158)][_0x12d206(0x120)](this),this['_moreCurrencyCosts'][_0x12d206(0x11a)]={};},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x238)]=DataManager[_0x194f97(0x1f2)],DataManager[_0x194f97(0x1f2)]=function(_0x3f211f){const _0x2bd560=_0x194f97;if(_0x3f211f[_0x2bd560(0x122)]!==undefined&&_0x3f211f[_0x2bd560(0x134)]!==undefined){if(_0x2bd560(0x1cf)!==_0x2bd560(0x1a9))return this[_0x2bd560(0x286)][_0x2bd560(0x11a)];else _0x5ad725[_0x2bd560(0x156)][_0x2bd560(0x1ee)]['call'](this),this[_0x2bd560(0x121)]&&this['_skillWindow']&&this[_0x2bd560(0x219)][_0x2bd560(0x243)](this[_0x2bd560(0x19c)]());}return VisuMZ[_0x2bd560(0x1a3)][_0x2bd560(0x238)]['call'](this,_0x3f211f);};VisuMZ['MoreCurrencies']&&(VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x23b)]=VisuMZ[_0x194f97(0x24f)][_0x194f97(0x1d4)],VisuMZ[_0x194f97(0x24f)][_0x194f97(0x1d4)]=function(_0x2679a4,_0x77ce75,_0x15864b,_0x389bbd){const _0x2a0b80=_0x194f97;if(_0x2679a4[_0x2a0b80(0x264)]&&_0x77ce75!=='gold')_0x2679a4=_0x2679a4['actor']();return VisuMZ[_0x2a0b80(0x1a3)][_0x2a0b80(0x23b)][_0x2a0b80(0x120)](this,_0x2679a4,_0x77ce75,_0x15864b,_0x389bbd);},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x285)]=VisuMZ[_0x194f97(0x24f)][_0x194f97(0x18d)],VisuMZ[_0x194f97(0x24f)][_0x194f97(0x18d)]=function(_0x372f61){const _0x5378c4=_0x194f97;if(_0x372f61[_0x5378c4(0x264)])_0x372f61=_0x372f61[_0x5378c4(0x19c)]();return VisuMZ[_0x5378c4(0x1a3)][_0x5378c4(0x285)][_0x5378c4(0x120)](this,_0x372f61);},VisuMZ[_0x194f97(0x1a3)][_0x194f97(0x14f)]=VisuMZ[_0x194f97(0x24f)]['CreateSubGoldCostText'],VisuMZ[_0x194f97(0x24f)][_0x194f97(0x1b2)]=function(_0x36a7f4,_0x10b2d1,_0x190d95,_0x19b1bc){const _0x2c3708=_0x194f97;if(SceneManager['isSceneRecruitBoard']()){if(_0x2c3708(0x248)!=='vrZip')return VisuMZ[_0x2c3708(0x1a3)][_0x2c3708(0x1b2)](_0x36a7f4,_0x10b2d1,_0x190d95,_0x19b1bc);else{const _0x23c72d=this['_commandNameWindow'];_0x23c72d['drawText'](_0x490310,0x0,_0x300957['y'],_0x23c72d[_0x2c3708(0x289)],_0x2c3708(0x167));}}else return _0x2c3708(0x13e)===_0x2c3708(0x13e)?VisuMZ['RecruitBoard']['Patch_CreateSubGoldCostText'][_0x2c3708(0x120)](this,_0x36a7f4,_0x10b2d1,_0x190d95,_0x19b1bc):_0x2fe35c[_0x2c3708(0x1a3)][_0x2c3708(0x214)]['Window'][_0x2c3708(0x22b)][_0x2c3708(0x120)](this);});function _0x29e8(){const _0x7a7265=['meetsShopBustStyleUIConditions','process_VisuMZ_MoreCurrencies_Notetags','skillWindowRect','SETTINGS','needsFadeIn','isCustomCommandVisible','80cNFEqD','SceneShopData','faceHeight','_actor','DataManager_getMoreCurrenciesObjLibrary','isSceneBattle','min','VisuMZ_CreateSubCostText','RecruitHelpDesc','jAVHN','scale','isUsingRecruitBustStyleUI','centerSprite','itemHeight','map','setActor','loadFace','setActorList','leave','sEWGL','lruam','calcActorWindowHeight','setMessage','SHOP_BUST_STYLE_UI','zxVQu','createInnerSprite','Scene_Boot_process_VisuMZ_MoreCurrencies_Notetags','MoreCurrencies','SnapshotOpacity','getBackgroundOpacity','fATas','adjustSprite','Window_Skill_RectJS','placeBasicGauges','setHelpWindow','169848Iocimj','visualGoldDisplayNoCost','itemTextAlign','WpbCx','loseGold','trim','Recruit\x20mercenaries\x20to\x20help\x20you\x20fight\x20in\x20exchange\x20for\x20gold.','goldWindow_BgType','sAEyc','helpWindow_BgType','description','drawParamText','isSkillTypeMatchForUse','isActor','level','\x5cC[16]Skills','isPreviousScene','_tempRecruitIndex','VisuMZ_0_CoreEngine','amOhE','_backSprite2','drawItemMoreCurrencies','floor','Scene_RecruitBoard_start','commandOrder','actorSkills','gaugeLineHeight','_helpWindow','maxListSize','activate','CoreEngine','GoldWindow_BgType','apply','_scene','drawActorClass','1023148bUmkuV','paintOpacity','BgFilename2','postCreateWindowsShopBustStyleUI','isCommandEnabled','PBTvt','\x5cI[%1]%2','drawActorGraphic','name','CommandWindow_BgType','createShopBustStyleUI_MessageWindow','MoreCurrencies_CheckMeetBuyRequirements','_moreCurrencyCosts','exitDelay','4103176ppAGvR','innerWidth','CommandWindow_RectJS','match','createListWindow','width','defaultCostPerLevel','getShopBustStyleUISettings','drawTextEx','setHandler','enabled','createCustomBackgroundImages','Leave\x20the\x20recruiting\x20board.','iconHeight','commandRecruit','DisplayedParams','Window_Command_RectJS','deactivate','faceName','JSON','includes','uaElB','playOkSound','initialize','VisuMZ_2_MoreCurrencies\x20needs\x20to\x20be\x20updated\x20','5XUKqzZ','innerHeight','clear','actors','Scene_Map_stop','graphicType','_goldWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawItemActorSprite','call','active','initialLevel','sprite','CreateVisualGoldText','40fKDRhX','gradientFillRect','help','MainMenuCore','WSPLx','SceneRecruitData','format','stop','VisuMZ_3_ShopBustStyleUI','none','bgType','_actors','YzQVi','sGGVY','onListCancel','nickname','drawText','CancelHelpDesc','RecruitCostFixed','wXead','drawCurrencyValue','RecruitIcon','createShopBustStyleUI_CustomBackground','inBattle','itemLineRect','cjbek','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemPadding','commandNameWindowDrawText','recruit','drawActorStatusDataOriginalJS','VisualGoldDisplay','dbNvE','Window_Gold_RectJS','hide','mainAreaBottom','ParseAllNotetags','maxCols','titleText','round','MRnAq','drawItemName','Patch_CreateSubGoldCostText','drawActorFace','prepareMoreCurrenciesObj','_discount','windowScale','changePaintOpacity','UJyxq','prototype','listWindowRect','DataManager_prepareMoreCurrenciesObj','_shopBustStyleUI_MessageWindow','characterName','addCustomCommand','boxWidth','DiscountRate','length','bitmap','updateCommandNameWindow','drawItemStyleIconText','VisuMZ_2_MoreCurrencies','Window_ShopMsg_RectJS','createCommandNameWindow','_commandWindow','setBackgroundType','center','Ynghp','battlerName','bind','createGoldWindow','_backSprite1','Window','2197434akLHUL','members','getTotalCommandWindowCommands','isUsingShopBustStyleUI','itemRectForRecruit','iconWidth','CreateGoldCostText','visualGoldDisplayPadding','show','remove','iconText','NUM','create','ceil','cancel','ParseNotetagCosts','_buyWindow','fWxnb','addChild','prepare','EVAL','clamp','refresh','goldWindowRect','displayedParameters','popScene','VisuMZ_1_MainMenuCore','ucHlB','icon','startFadeOut','index','CheckMeetBuyRequirements','RecruitCost','filter','CancelText','getShopBustStyleUI_GoldWindow_Rect','commandStyle','addCommand','text','drawItemActorFace','addLoadListener','BgFilename1','ARRAYSTR','StatusGraphic','isActorEnabled','ARRAYSTRUCT','actor','ShopBustStyleUI','processExitShopBustStyleUI','ListWindow_DrawJS','SceneOpenRecruitBoard','drawItem','close','RecruitBoard','ChangeQuantityForObj','ListWindow_RectJS','exit','kKqiJ','VisuMZ_1_SkillsStatesCore','gprAX','commandStyleCheck','RegExp','IoPzC','max','getShopBustStyleUI_MessageWindow_Rect','currencyUnit','exitShopBustStyleUI','shouldDisplayBreakShields','CreateSubGoldCostText','_data','selectLast','STR','start','lineHeight','playShop','XEywd','onListOk','GoldWindow_RectJS','updateHelp','adjustWindowScaleShopBustStyleUI','setText','auto','ParseActorNotetags','isNextScene','createBackground','kRKRV','ConvertParams','maxItems','fadeout','forceSelect','calcWindowHeight','drawActorStatusData','3522CcRZDg','noActorHelpDesc','opacity','TlcHx','vPzPi','JlWNb','isCustomCommandEnabled','commandNameWindowDrawBackground','drawSkillsListItems','No\x20mercenaries\x20available!\x0aPlease\x20come\x20back\x20another\x20time!','CreateSubCostText','note','paramValueByName','recruitCostPerLevel','hideWindowsShopBustStyleUI','RecruitCostPerLevel','_listWindow','Scene_RecruitBoard_popScene','Vocab','loadSvActor','drawActor','VisuMZ_3_VisualGoldDisplay','_tempRecruitActor','ARRAYJSON','createSkillWindow','fontSize','uZeLi','NUPoF','faceWidth','drawEmpty','actorId','height','constructor','recruitCost','right','Param','callUpdateHelp','loadCharacter','parameters','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getMoreCurrenciesObjLibrary','face','bbViw','setBackgroundOpacity','itemRect','mainAreaTop','mainAreaHeight','createHelpWindow','skillScale','addWindow','getRecruitBustStyleUISettings','itemAt','Window_List_RectJS','fwUig','gWqAc','createCommandWindow','isSceneRecruitBoard','andMoreText','GqFaK','Scene_Map_needsFadeIn','_commandNameWindow','textSizeEx','\x5cC[16]And\x20More...','BgSettings','getShopBustStyleUI_ListWindow_Rect','579JoOJTY','item','parse','KRDey','34821qLqssy','setSkillWindow','CommandWindow_Style','loadTitle2','dimColor1','Settings','profile','SkillsWindow_BgType','ARRAYEVAL','drawItemActorSvBattler','_skillWindow','723240KwitZk','commandNameWindowCenter','tsGjH','currentSymbol','getShopBustStyleUI_CommandWindow_Rect','mainCommandWidth','drawIcon','contents','makeActorList','setBustStyleUIMessageType','commandName','sDPxO','BhHwE','CancelIcon','fittingHeight','ARRAYNUM','ListWindow_BgType','SkillWindow_RectJS','welcome','KLlbe'];_0x29e8=function(){return _0x7a7265;};return _0x29e8();}VisuMZ['RecruitBoard'][_0x194f97(0x1b2)]=function(_0x4df745,_0x5d39cf,_0x29da5d,_0x3fbb2d){const _0x51e2a0=_0x194f97,_0x5684ef=SceneManager[_0x51e2a0(0x278)][_0x51e2a0(0x1da)],_0x2d3971=_0x5684ef?_0x5684ef[_0x51e2a0(0x1eb)](_0x4df745):VisuMZ[_0x51e2a0(0x1a3)][_0x51e2a0(0x18e)](_0x4df745),_0x2f8b70=Math[_0x51e2a0(0x14c)](_0x2d3971*_0x3fbb2d);if(_0x2f8b70===0x0)return'';if(Imported[_0x51e2a0(0x1df)]&&_0x5684ef){const _0x17b17d=_0x5684ef[_0x51e2a0(0x175)](),_0xfa54fd=_0x5684ef[_0x51e2a0(0x258)]();return VisuMZ[_0x51e2a0(0x144)][_0x51e2a0(0x124)](_0x2f8b70,_0x17b17d,_0xfa54fd);}else return VisuMZ[_0x51e2a0(0x24f)][_0x51e2a0(0x174)](_0x2f8b70);},Window_RecruitBoardList[_0x194f97(0x156)][_0x194f97(0x139)]=function(_0x28c9bd,_0x12470b,_0x4a37f9,_0x16dbbe,_0xf6d425){const _0x5babaa=_0x194f97;if(Imported[_0x5babaa(0x162)]){const _0x5a351c=this[_0x5babaa(0x1e0)],_0x5188bf=new Rectangle(_0x4a37f9,_0x16dbbe,_0xf6d425,this[_0x5babaa(0x1b7)]());this[_0x5babaa(0x26c)](_0x5a351c,_0x5188bf,![],0x1);}else{if('sDPxO'===_0x5babaa(0x225))Window_Base[_0x5babaa(0x156)][_0x5babaa(0x139)][_0x5babaa(0x120)](this,_0x28c9bd,_0x12470b,_0x4a37f9,_0x16dbbe,_0xf6d425);else{if(_0x4959e1[_0x5babaa(0x19d)][_0x5babaa(0x214)]['SceneRecruitData']['Window_Gold_RectJS'])return _0x13e9de[_0x5babaa(0x19d)]['Settings'][_0x5babaa(0x12a)]['Window_Gold_RectJS']['call'](this);const _0x2beb13=_0x3f8a4a[_0x5babaa(0x24b)][_0x5babaa(0x153)],_0x48a9c9=this['mainCommandWidth']()/_0x2beb13,_0x201aa4=this[_0x5babaa(0x1c8)](0x1,!![]),_0x1b9df8=_0x2d8806[_0x5babaa(0x26d)]((_0xd23c04[_0x5babaa(0x15c)]-_0x48a9c9)/0x2),_0x1e31f6=this[_0x5babaa(0x148)]()-this[_0x5babaa(0x1c8)](0x4,![])-_0x463f35[_0x5babaa(0x26d)](_0x201aa4*_0x2beb13);return new _0x405a63(_0x1b9df8,_0x1e31f6,_0x48a9c9,_0x201aa4);}}};