//=============================================================================
// VisuStella MZ - Skill Shop
// VisuMZ_4_SkillShop.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillShop = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillShop = VisuMZ.SkillShop || {};
VisuMZ.SkillShop.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [SkillShop]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Shop_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to call forth a Skill Shop that contains varying
 * skills that the player can purchase with gold to teach to various party
 * members as long as the shop's skill requirements are met.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Call forth a new scene in the form of a skill shop for the player to
 *   select and purchase skills to teach to various party members.
 * * Skills can have custom cost amounts.
 * * Skills can require certain party members to be at certain levels, classes,
 *   or even have learned other skills before being taught.
 * * Skills can also be locked away behind switch requirements.
 * * Different shops opened by different events can contain different skills.
 * * Apply a discount rate to the shop to reduce the cost of all skills within
 *   that shop.
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
 * VisuMZ_2_MoreCurrencies
 * 
 * Skills can also be learned with items, weapons, armors, and/or variables as
 * long as this plugin is present and the respective notetags are used.
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
 * === Skill Shop-Related Notetags ===
 * 
 * ---
 *
 * <Skill Shop Cost: x>
 *
 * - Used for: Skill Notetags
 * - Changes the cost of this skill to 'x' in order for it to be learned from
 *   a skill shop.
 * - Replace 'x' with a number representing the cost of the skill to be learned
 *   from a skill shop.
 * - If this notetag is not used, use the default cost value found in the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Item id Learn Cost: x>
 * <Item name Learn Cost: x>
 *
 * <Weapon id Learn Cost: x>
 * <Weapon name Learn Cost: x>
 *
 * <Armor id Learn Cost: x>
 * <Armor name Learn Cost: x>
 *
 * <Variable id Learn Cost: x>
 * 
 * - Used for: Skill Notetags
 * - Requires Imported.VisuMZ_2_MoreCurrencies!
 * - Allows purchase of skill using items, weapons, armors, or variables as
 *   extended currency.
 * - Replace 'id' with a number representing the ID of the item, weapon, armor,
 *   or variable to be taken (when bought).
 * - Replace 'name' with the name of the item, weapon, armor, or variable to be
 *   taken (when bought).
 * - Replace 'x' with the quantity of the item, weapon, armor, or variable that
 *   will be taken (when bought).
 * - Insert multiple copies of these notetags to add more item, weapon, armor,
 *   or variable costs.
 * 
 * ---
 *
 * <Skill Shop Require Class: id>
 * <Skill Shop Require Classes: id, id, id>
 *
 * <Skill Shop Require Class: name>
 * <Skill Shop Require Classes: name, name, name>
 *
 * - Used for: Skill Notetags
 * - This skill can only be learned by actors with the specified class(es)
 *   when taught through the skill shop.
 * - For 'id' variant, replace 'id' with a number representing the class ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 * 
 * <Skill Shop Require Level: x>
 * 
 * - Used for: Skill Notetags
 * - This skill can only be learned by actors who are at least level 'x'.
 * - Replace 'x' with a number representing the required level.
 * 
 * ---
 *
 * <Skill Shop Require Learned Skill: id>
 * <Skill Shop Require Learned Skills: id, id, id>
 *
 * <Skill Shop Require Learned Skill: name>
 * <Skill Shop Require Learned Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - This skill can only be learned by actors who have learned the listed
 *   skill(s). All of the skills must be learned.
 * - For 'id' variant, replace 'id' with a number representing the skill ID.
 * - For 'name' variant, replace 'name' with the skill's name.
 *
 * ---
 * 
 * <Skill Shop Require Switch: x>
 * <Skill Shop Require Switches: x, x, x>
 * 
 * - Used for: Skill Notetags
 * - This skill can only be learned by actors when the switch(es) 'x' is turned
 *   ON. If multiple switches are required, they must ALL be turned ON.
 * - Replace 'x' with a number representing the switch ID.
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
 * Scene: Open Skill Shop
 * - Opens a skill shop with the below skills for sale.
 * - Cannot be used in battle.
 *
 *   Skill ID(s):
 *   - Select which Skill ID(s) to include in the shop.
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
 * These are the general settings for this plugin.
 *
 * ---
 *
 * General Settings
 * 
 *   Default Skill Cost:
 *   - What is the default skill cost for skills that lack the
 *     <Skill Shop Cost: x> notetag?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_SkillShop.
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
 *   Learn Text:
 *   - Text used for this command.
 * 
 *     Icon:
 *     - Icon used for this command.
 * 
 *     Help Description:
 *     - Help window description used for this command.
 *     - Text codes allowed.
 * 
 *   Exit Text:
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
 * Actor List Window
 * 
 *   Help Description:
 *   - Help window description used for actors.
 *   - %1 - Name, %2 - Level, %3 - Class Name, %4 - Skill Types
 * 
 *   Skill Type Joiner:
 *   - Text used to join together skill types for the help description.
 * 
 *   Joiner Space:
 *   - Adds a space after the join type, too.
 *
 * ---
 *
 * Skill List Window
 * 
 *   Already Learned:
 *   - Text used for a skill that's already learned.
 * 
 *   No SType Access:
 *   - Text used for a skill that's missing SType access.
 *   - %1 - Skill Type Name
 * 
 *   Wrong Class:
 *   - Text used for a skill that needs certain classes.
 *   - %1 - Actor's Current Class Name
 * 
 *   For Class:
 *   - Text used for a skill that needs a certain class.
 *   - %1 - Specific Class Name
 * 
 *   Level Requirement:
 *   - Text used for a skill that requires a minimum level.
 *   - %1 - Needed Level
 * 
 *   Learned Skill:
 *   - Text used for a skill that requires a learned skill.
 *   - %1 - Needed Skill Name, %2 - Icon
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
 * Actor List Window
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
 *   Draw Actor Class?:
 *   - Draws the class of the actor.
 *   - If screen resolution UI is too small, class name won't be drawn.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 *
 * Skill List Window
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: August 29, 2024
 * * Documentation Update!
 * ** <Skill Shop Require Switch: x> notetag was left out from the original
 *    documentation. It is now added again.
 * 
 * Version 1.04: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if More Currencies wasn't present.
 *    Fix made by Arisu.
 * 
 * Version 1.03: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility with VisuMZ_2_MoreCurrencies!
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "VisuStella MZ Compatibility" section:
 * *** VisuMZ_2_MoreCurrencies
 * **** Skills can also be learned with items, weapons, armors, and/or
 *      variables as long as this plugin is present and the respective notetags
 *      are used.
 * * New Features!
 * ** New compatibility notetags added by Arisu:
 * *** <Item id Learn Cost: x>
 * *** <Weapon id Learn Cost: x>
 * *** <Armor id Learn Cost: x>
 * *** <Variable id Learn Cost: x>
 * **** Requires VisuMZ_2_MoreCurrencies!
 * **** Allows purchase of skill using items, weapons, armors, or variables as
 *      extended currency.
 * 
 * Version 1.02: August 17, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: May 18, 2023
 * * Bug Fixes!
 * ** If faces weren't loaded ahead of time, they wouldn't show up in the shop.
 *    This should now be fixed. Fix made by Arisu.
 * * Documentation Update!
 * ** Updated Plugin Parameter for "Draw Actor Class?" to have this line:
 * *** If screen resolution UI is too small, class name won't be drawn.
 * * Feature Update!
 * ** If your screen resolution UI is too small, the class name won't be drawn.
 *    Update made by Arisu.
 * 
 * Version 1.00 Official Release Date: May 26, 2023
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
 * @command SceneOpenSkillShop
 * @text Scene: Open Skill Shop
 * @desc Opens a skill shop with the below skills for sale.
 * Cannot be used in battle.
 *
 * @arg SkillIDs:arraynum
 * @text Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to include in the shop.
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
 * @param SkillShop
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param DefaultSkillCost:num
 * @text Default Skill Cost
 * @parent Default
 * @desc What is the default skill cost for skills that
 * lack the <Skill Shop Cost: x> notetag?
 * @default 1000
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_SkillShop.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"Window_SkillShopCommand":"","LearnText:str":"Learn","LearnIcon:str":"79","LearnHelpDesc:json":"\"Select a skill for a party member to learn.\"","CancelText:str":"Exit","CancelIcon:str":"82","CancelHelpDesc:json":"\"Leave the skill shop.\"","Window_SkillShopActorList":"","ActorHelpDescFmt:json":"\"%1 is a level %2 %3.\\nCan learn %4 skills.\"","stypeJoin:str":",","spaceJoin:eval":"true","Window_SkillShopSkillList":"","alreadyLearned:str":"Learned","noStypeAccess:str":"No %1 Access","wrongClass:str":"Not For %1","forClass:str":"For %1","levelRequirement:str":"Needs Lv %1","skillLearnRequirement:str":"Needs %2%1"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"Window_Help":"","HelpWindow_BgType:num":"0","Window_Gold":"","GoldWindow_BgType:num":"0","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopCommand":"","CommandWindow_BgType:num":"0","CommandWindow_Style:str":"auto","CommandWindow_RectJS:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopActorList":"","ActorListWindow_BgType:num":"0","drawActorFace:eval":"true","drawActorName:eval":"true","drawActorClass:eval":"true","ActorListWindow_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopSkillList":"","SkillListWindow_BgType:num":"0","SkillListWindow_RectJS:func":"\"const ww = Math.ceil(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = Math.floor(Graphics.boxWidth / 2);\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Window_SkillShopCommand
 * @text Command Window
 *
 * @param LearnText:str
 * @text Learn Text
 * @parent Window_SkillShopCommand
 * @desc Text used for this command.
 * @default Learn
 *
 * @param LearnIcon:str
 * @text Icon
 * @parent LearnText:str
 * @desc Icon used for this command.
 * @default 79
 *
 * @param LearnHelpDesc:json
 * @text Help Description
 * @parent LearnText:str
 * @type note
 * @desc Help window description used for this command.
 * Text codes allowed.
 * @default "Select a skill for a party member to learn."
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Window_SkillShopCommand
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
 * @default "Leave the skill shop."
 * 
 * @param Window_SkillShopActorList
 * @text Actor List Window
 *
 * @param ActorHelpDescFmt:json
 * @text Help Description
 * @parent Window_SkillShopActorList
 * @type note
 * @desc Help window description used for actors.
 * %1 - Name, %2 - Level, %3 - Class Name, %4 - Skill Types
 * @default "%1 is a level %2 %3.\nCan learn %4 skills."
 *
 * @param stypeJoin:str
 * @text Skill Type Joiner
 * @parent ActorHelpDescFmt:json
 * @desc Text used to join together skill types for the help description.
 * @default ,
 *
 * @param spaceJoin:eval
 * @text Joiner Space
 * @parent ActorHelpDescFmt:json
 * @type boolean
 * @on Use Space
 * @off No Space
 * @desc Adds a space after the join type, too.
 * @default true
 * 
 * @param Window_SkillShopSkillList
 * @text Skill List Window
 *
 * @param alreadyLearned:str
 * @text Already Learned
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that's already learned.
 * @default Learned
 *
 * @param noStypeAccess:str
 * @text No SType Access
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that's missing SType access.
 * %1 - Skill Type Name
 * @default No %1 Access
 *
 * @param wrongClass:str
 * @text Wrong Class
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that needs certain classes.
 * %1 - Actor's Current Class Name
 * @default Not For %1
 *
 * @param forClass:str
 * @text For Class
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that needs a certain class.
 * %1 - Specific Class Name
 * @default For %1
 *
 * @param levelRequirement:str
 * @text Level Requirement
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that requires a minimum level.
 * %1 - Needed Level
 * @default Needs Lv %1
 *
 * @param skillLearnRequirement:str
 * @text Learned Skill
 * @parent Window_SkillShopSkillList
 * @desc Text used for a skill that requires a learned skill.
 * %1 - Needed Skill Name, %2 - Icon
 * @default Needs %2%1
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
 * @param Window_SkillShopCommand
 * @text Command Window
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent Window_SkillShopCommand
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
 * @parent Window_SkillShopCommand
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
 * @parent Window_SkillShopCommand
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 * 
 * @param Window_SkillShopActorList
 * @text Actor List Window
 *
 * @param ActorListWindow_BgType:num
 * @text Background Type
 * @parent Window_SkillShopActorList
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
 * @parent Window_SkillShopActorList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the face of the actor.
 * @default true
 *
 * @param drawActorName:eval
 * @text Draw Actor Name?
 * @parent Window_SkillShopActorList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the name of the actor.
 * @default true
 *
 * @param drawActorClass:eval
 * @text Draw Actor Class?
 * @parent Window_SkillShopActorList
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draws the class of the actor.
 * @default true
 *
 * @param ActorListWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_SkillShopActorList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 * 
 * @param Window_SkillShopSkillList
 * @text Skill List Window
 *
 * @param SkillListWindow_BgType:num
 * @text Background Type
 * @parent Window_SkillShopSkillList
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
 * @param SkillListWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_SkillShopSkillList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.ceil(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = Math.floor(Graphics.boxWidth / 2);\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x7c25ec=_0x8204;(function(_0x6c94e6,_0x177aa6){const _0x4122b1=_0x8204,_0x4f3b9b=_0x6c94e6();while(!![]){try{const _0x225378=parseInt(_0x4122b1(0x2ab))/0x1+parseInt(_0x4122b1(0x2ca))/0x2*(-parseInt(_0x4122b1(0x22a))/0x3)+parseInt(_0x4122b1(0x21a))/0x4+parseInt(_0x4122b1(0x1c7))/0x5+parseInt(_0x4122b1(0x2d2))/0x6+parseInt(_0x4122b1(0x258))/0x7*(-parseInt(_0x4122b1(0x224))/0x8)+-parseInt(_0x4122b1(0x1e7))/0x9;if(_0x225378===_0x177aa6)break;else _0x4f3b9b['push'](_0x4f3b9b['shift']());}catch(_0x30ee55){_0x4f3b9b['push'](_0x4f3b9b['shift']());}}}(_0x4dd3,0x2a9fd));var label='SkillShop',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x7c25ec(0x1ee)](function(_0x48c89c){const _0x372c35=_0x7c25ec;return _0x48c89c[_0x372c35(0x288)]&&_0x48c89c[_0x372c35(0x2e3)][_0x372c35(0x22e)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x7c25ec(0x27d)]=function(_0x5ebddb,_0x26caaa){const _0x8a3e5e=_0x7c25ec;for(const _0x44cf33 in _0x26caaa){if(_0x44cf33[_0x8a3e5e(0x2b5)](/(.*):(.*)/i)){const _0x37d701=String(RegExp['$1']),_0x34ab5c=String(RegExp['$2'])[_0x8a3e5e(0x20b)]()[_0x8a3e5e(0x1c4)]();let _0x3b85fe,_0x3f8ad0,_0x2fcbbc;switch(_0x34ab5c){case _0x8a3e5e(0x29a):_0x3b85fe=_0x26caaa[_0x44cf33]!==''?Number(_0x26caaa[_0x44cf33]):0x0;break;case _0x8a3e5e(0x2d5):_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON[_0x8a3e5e(0x25c)](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0['map'](_0x50210f=>Number(_0x50210f));break;case'EVAL':_0x3b85fe=_0x26caaa[_0x44cf33]!==''?eval(_0x26caaa[_0x44cf33]):null;break;case _0x8a3e5e(0x2b3):_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON[_0x8a3e5e(0x25c)](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0[_0x8a3e5e(0x254)](_0x279ffb=>eval(_0x279ffb));break;case _0x8a3e5e(0x279):_0x3b85fe=_0x26caaa[_0x44cf33]!==''?JSON['parse'](_0x26caaa[_0x44cf33]):'';break;case _0x8a3e5e(0x2c1):_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON[_0x8a3e5e(0x25c)](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0[_0x8a3e5e(0x254)](_0x49a807=>JSON[_0x8a3e5e(0x25c)](_0x49a807));break;case'FUNC':_0x3b85fe=_0x26caaa[_0x44cf33]!==''?new Function(JSON['parse'](_0x26caaa[_0x44cf33])):new Function(_0x8a3e5e(0x1d6));break;case _0x8a3e5e(0x278):_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON[_0x8a3e5e(0x25c)](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0[_0x8a3e5e(0x254)](_0x5a728d=>new Function(JSON['parse'](_0x5a728d)));break;case _0x8a3e5e(0x2db):_0x3b85fe=_0x26caaa[_0x44cf33]!==''?String(_0x26caaa[_0x44cf33]):'';break;case _0x8a3e5e(0x226):_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON[_0x8a3e5e(0x25c)](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0['map'](_0x44b1ea=>String(_0x44b1ea));break;case _0x8a3e5e(0x241):_0x2fcbbc=_0x26caaa[_0x44cf33]!==''?JSON['parse'](_0x26caaa[_0x44cf33]):{},_0x3b85fe=VisuMZ[_0x8a3e5e(0x27d)]({},_0x2fcbbc);break;case'ARRAYSTRUCT':_0x3f8ad0=_0x26caaa[_0x44cf33]!==''?JSON['parse'](_0x26caaa[_0x44cf33]):[],_0x3b85fe=_0x3f8ad0[_0x8a3e5e(0x254)](_0x2e86d5=>VisuMZ[_0x8a3e5e(0x27d)]({},JSON[_0x8a3e5e(0x25c)](_0x2e86d5)));break;default:continue;}_0x5ebddb[_0x37d701]=_0x3b85fe;}}return _0x5ebddb;},(_0x2b2374=>{const _0x18548f=_0x7c25ec,_0x3a9932=_0x2b2374[_0x18548f(0x28d)];for(const _0x309507 of dependencies){if(!Imported[_0x309507]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x18548f(0x1c1)](_0x3a9932,_0x309507)),SceneManager[_0x18548f(0x271)]();break;}}const _0x13e83e=_0x2b2374[_0x18548f(0x2e3)];if(_0x13e83e[_0x18548f(0x2b5)](/\[Version[ ](.*?)\]/i)){const _0x5203a5=Number(RegExp['$1']);_0x5203a5!==VisuMZ[label]['version']&&(alert(_0x18548f(0x1e4)[_0x18548f(0x1c1)](_0x3a9932,_0x5203a5)),SceneManager[_0x18548f(0x271)]());}if(_0x13e83e[_0x18548f(0x2b5)](/\[Tier[ ](\d+)\]/i)){const _0x581ebf=Number(RegExp['$1']);_0x581ebf<tier?(alert(_0x18548f(0x2ee)[_0x18548f(0x1c1)](_0x3a9932,_0x581ebf,tier)),SceneManager['exit']()):tier=Math[_0x18548f(0x2c0)](_0x581ebf,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x18548f(0x1bb)],_0x2b2374[_0x18548f(0x1f5)]);})(pluginData),PluginManager[_0x7c25ec(0x2ef)](pluginData[_0x7c25ec(0x28d)],_0x7c25ec(0x1f2),_0x310635=>{const _0xd5fc85=_0x7c25ec;if($gameParty['inBattle']())return;if(SceneManager[_0xd5fc85(0x1c5)]())return;VisuMZ['ConvertParams'](_0x310635,_0x310635);const _0x5e9538=_0x310635[_0xd5fc85(0x292)];if(_0x5e9538[_0xd5fc85(0x1a2)]<=0x0)return;const _0xd70d28=(_0x310635[_0xd5fc85(0x1b5)]||0x0)[_0xd5fc85(0x277)](0x0,0x1);SceneManager[_0xd5fc85(0x2e1)](Scene_SkillShop),SceneManager[_0xd5fc85(0x2c5)](_0x5e9538,_0xd70d28);}),VisuMZ[_0x7c25ec(0x285)]['RegExp']={'SkillCost':/<(?:SKILL |)SHOP COST:[ ](\d+)>/i,'ClassReq':/<(?:SKILL |)SHOP (?:REQUIRE |)CLASS(?:|ES)(?: REQUIREMENT|):[ ](.*)>/i,'LevelReq':/<(?:SKILL |)SHOP (?:REQUIRE |)LEVEL(?: REQUIREMENT|):[ ](\d+)>/i,'LearnSkillReq':/<(?:SKILL |)SHOP (?:REQUIRE |)(?:LEARNED SKILL|LEARNED SKILLS|SKILL LEARNED|SKILLS LEARNED)(?: REQUIREMENT|):[ ](.*)>/i,'SwitchReq':/<(?:SKILL |)SHOP (?:REQUIRE |)(?:SWITCH|SWITCHES)(?: REQUIREMENT|):[ ](.*)>/i},DataManager['skillShopCost']=function(_0x1099d3){const _0x28c1c2=_0x7c25ec;if(!_0x1099d3)return 0x0;const _0x1c8cf3=_0x1099d3['id'];this[_0x28c1c2(0x2a3)]=this[_0x28c1c2(0x2a3)]||{};if(this[_0x28c1c2(0x2a3)][_0x1c8cf3]!==undefined)return this[_0x28c1c2(0x2a3)][_0x1c8cf3];this[_0x28c1c2(0x2a3)][_0x1c8cf3]=Scene_SkillShop[_0x28c1c2(0x1a3)][_0x28c1c2(0x1dd)];const _0x511ada=VisuMZ[_0x28c1c2(0x285)][_0x28c1c2(0x297)],_0xe00538=_0x1099d3[_0x28c1c2(0x1d0)]||'';return _0xe00538['match'](_0x511ada['SkillCost'])&&(this[_0x28c1c2(0x2a3)][_0x1c8cf3]=Number(RegExp['$1'])),this[_0x28c1c2(0x2a3)][_0x1c8cf3];},DataManager[_0x7c25ec(0x2ae)]=function(_0x1937d2){const _0xcf5539=_0x7c25ec;if(!_0x1937d2)return[];const _0x309e6a=_0x1937d2['id'];this[_0xcf5539(0x256)]=this[_0xcf5539(0x256)]||{};if(this[_0xcf5539(0x256)][_0x309e6a]!==undefined)return this[_0xcf5539(0x256)][_0x309e6a];this[_0xcf5539(0x256)][_0x309e6a]=[];const _0x2eed1f=VisuMZ[_0xcf5539(0x285)][_0xcf5539(0x297)],_0x492f5=_0x1937d2[_0xcf5539(0x1d0)]||'';if(_0x492f5[_0xcf5539(0x2b5)](_0x2eed1f[_0xcf5539(0x2d4)])){const _0x3bdcf1=String(RegExp['$1'])[_0xcf5539(0x228)](',')[_0xcf5539(0x254)](_0x22927c=>_0x22927c['trim']());for(const _0x4fff07 of _0x3bdcf1){const _0x41bde0=/^\d+$/[_0xcf5539(0x23a)](_0x4fff07);let _0xae9991=0x0;_0x41bde0?_0xae9991=Number(_0x4fff07):_0xae9991=DataManager[_0xcf5539(0x24b)](_0x4fff07),_0xae9991&&this[_0xcf5539(0x256)][_0x309e6a]['push'](_0xae9991);}}return this[_0xcf5539(0x256)][_0x309e6a];},DataManager['getClassIdWithName']=function(_0x4aae55){const _0x1c8d40=_0x7c25ec;_0x4aae55=_0x4aae55[_0x1c8d40(0x20b)]()['trim'](),this[_0x1c8d40(0x266)]=this['_classIDs']||{};if(this[_0x1c8d40(0x266)][_0x4aae55])return this[_0x1c8d40(0x266)][_0x4aae55];for(const _0x3e3744 of $dataClasses){if(!_0x3e3744)continue;let _0x5b1e64=_0x3e3744['name'];_0x5b1e64=_0x5b1e64[_0x1c8d40(0x20e)](/\x1I\[(\d+)\]/gi,''),_0x5b1e64=_0x5b1e64[_0x1c8d40(0x20e)](/\\I\[(\d+)\]/gi,''),this[_0x1c8d40(0x266)][_0x5b1e64[_0x1c8d40(0x20b)]()['trim']()]=_0x3e3744['id'];}return this[_0x1c8d40(0x266)][_0x4aae55]||0x0;},DataManager[_0x7c25ec(0x1a9)]=function(_0x2ecf93){const _0x4f1cb9=_0x7c25ec;if(!_0x2ecf93)return[];const _0xd97aa6=_0x2ecf93['id'];this[_0x4f1cb9(0x299)]=this[_0x4f1cb9(0x299)]||{};if(this[_0x4f1cb9(0x299)][_0xd97aa6]!==undefined)return this['_skillShopLevelRequirements'][_0xd97aa6];this[_0x4f1cb9(0x299)][_0xd97aa6]=0x0;const _0x3f2c02=VisuMZ[_0x4f1cb9(0x285)]['RegExp'],_0x4b336c=_0x2ecf93[_0x4f1cb9(0x1d0)]||'';return _0x4b336c[_0x4f1cb9(0x2b5)](_0x3f2c02[_0x4f1cb9(0x2c4)])&&(this[_0x4f1cb9(0x299)][_0xd97aa6]=Number(RegExp['$1'])),this[_0x4f1cb9(0x299)][_0xd97aa6];},DataManager['skillShopSkillLearnRequirements']=function(_0x1bee34){const _0xddba72=_0x7c25ec;if(!_0x1bee34)return[];const _0xf6b30f=_0x1bee34['id'];this[_0xddba72(0x1bd)]=this[_0xddba72(0x1bd)]||{};if(this[_0xddba72(0x1bd)][_0xf6b30f]!==undefined)return this[_0xddba72(0x1bd)][_0xf6b30f];this[_0xddba72(0x1bd)][_0xf6b30f]=[];const _0x35c9e8=VisuMZ[_0xddba72(0x285)][_0xddba72(0x297)],_0x491eab=_0x1bee34[_0xddba72(0x1d0)]||'';if(_0x491eab[_0xddba72(0x2b5)](_0x35c9e8[_0xddba72(0x26e)])){const _0xd90c0f=String(RegExp['$1'])[_0xddba72(0x228)](',')[_0xddba72(0x254)](_0x4e2dc3=>_0x4e2dc3[_0xddba72(0x1c4)]());for(const _0x346137 of _0xd90c0f){const _0x176217=/^\d+$/[_0xddba72(0x23a)](_0x346137);let _0x5f48e2=0x0;_0x176217?_0x5f48e2=Number(_0x346137):_0x5f48e2=DataManager[_0xddba72(0x20f)](_0x346137),_0x5f48e2&&this['_skillShopSkillLearnRequirements'][_0xf6b30f]['push'](_0x5f48e2);}}return this[_0xddba72(0x1bd)][_0xf6b30f];},DataManager[_0x7c25ec(0x20f)]=function(_0x131e44){const _0x353b35=_0x7c25ec;_0x131e44=_0x131e44[_0x353b35(0x20b)]()['trim'](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x353b35(0x259)][_0x131e44])return this[_0x353b35(0x259)][_0x131e44];for(const _0x2f2748 of $dataSkills){if(!_0x2f2748)continue;this[_0x353b35(0x259)][_0x2f2748[_0x353b35(0x28d)][_0x353b35(0x20b)]()[_0x353b35(0x1c4)]()]=_0x2f2748['id'];}return this[_0x353b35(0x259)][_0x131e44]||0x0;},DataManager[_0x7c25ec(0x201)]=function(_0x257bfa){const _0x4290ce=_0x7c25ec;if(!_0x257bfa)return[];const _0x10ae16=_0x257bfa['id'];this['_skillShopSwitchRequirements']=this['_skillShopSwitchRequirements']||{};if(this['_skillShopSwitchRequirements'][_0x10ae16]!==undefined)return this[_0x4290ce(0x264)][_0x10ae16];this[_0x4290ce(0x264)][_0x10ae16]=[];const _0x18320b=VisuMZ[_0x4290ce(0x285)]['RegExp'],_0xd02733=_0x257bfa[_0x4290ce(0x1d0)]||'';return _0xd02733[_0x4290ce(0x2b5)](_0x18320b['SwitchReq'])&&(this[_0x4290ce(0x264)][_0x10ae16]=String(RegExp['$1'])[_0x4290ce(0x228)](',')[_0x4290ce(0x254)](_0x3d0f97=>Number(_0x3d0f97))),this[_0x4290ce(0x264)][_0x10ae16];},SceneManager[_0x7c25ec(0x1c5)]=function(){const _0x2d778d=_0x7c25ec;return this[_0x2d778d(0x227)]&&this['_scene'][_0x2d778d(0x2b0)]===Scene_Battle;},SceneManager['isSceneSkillShop']=function(){const _0x154d96=_0x7c25ec;return this[_0x154d96(0x227)]&&this[_0x154d96(0x227)][_0x154d96(0x2b0)]===Scene_SkillShop;},Game_Actor[_0x7c25ec(0x251)][_0x7c25ec(0x23d)]=function(_0xc9d6aa){const _0x96291=_0x7c25ec;if(!_0xc9d6aa)return![];if(this[_0x96291(0x1ca)](_0xc9d6aa['id']))return![];if(!VisuMZ['SkillShop'][_0x96291(0x253)](this,_0xc9d6aa))return![];if(!VisuMZ[_0x96291(0x285)][_0x96291(0x1fc)](this,_0xc9d6aa))return![];if(DataManager['skillShopLevelRequirements'](_0xc9d6aa)>this['level'])return![];if(!VisuMZ[_0x96291(0x285)][_0x96291(0x2e6)](this,_0xc9d6aa))return![];if(!VisuMZ[_0x96291(0x285)][_0x96291(0x1d4)](_0xc9d6aa))return![];return!![];},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x253)]=function(_0x518c21,_0x49c2ac){const _0x348a4d=_0x7c25ec,_0x364540=_0x518c21[_0x348a4d(0x1c2)](),_0x5ab0ff=Imported[_0x348a4d(0x1f9)]?DataManager['getSkillTypes'](_0x49c2ac):[_0x49c2ac[_0x348a4d(0x2e9)]];return _0x5ab0ff[_0x348a4d(0x2a8)](_0x23e79b=>_0x364540[_0x348a4d(0x22e)](_0x23e79b));},VisuMZ[_0x7c25ec(0x285)]['CheckClassAccess']=function(_0x522060,_0x87a629){const _0x349da9=_0x7c25ec,_0x152765=DataManager[_0x349da9(0x2ae)](_0x87a629);if(_0x152765[_0x349da9(0x1a2)]<=0x0)return!![];const _0x502c44=[_0x522060[_0x349da9(0x20d)]()['id']];return _0x502c44[_0x349da9(0x2a8)](_0x185ec4=>_0x152765[_0x349da9(0x22e)](_0x185ec4));},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x2e6)]=function(_0x302a99,_0x584bf3){const _0x4bdadb=_0x7c25ec,_0x5a0866=DataManager[_0x4bdadb(0x213)](_0x584bf3);return _0x5a0866['every'](_0x3d9d4d=>_0x302a99[_0x4bdadb(0x1ca)](_0x3d9d4d));},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1d4)]=function(_0x575d95){const _0x8ef89e=_0x7c25ec,_0x233fb8=DataManager[_0x8ef89e(0x201)](_0x575d95);return _0x233fb8[_0x8ef89e(0x2e0)](_0x2eaa69=>$gameSwitches[_0x8ef89e(0x2b4)](_0x2eaa69));};function Scene_SkillShop(){this['initialize'](...arguments);}Scene_SkillShop['prototype']=Object[_0x7c25ec(0x218)](Scene_MenuBase[_0x7c25ec(0x251)]),Scene_SkillShop['prototype'][_0x7c25ec(0x2b0)]=Scene_SkillShop,Scene_SkillShop[_0x7c25ec(0x1a3)]={'goldWindow_BgType':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x203)][_0x7c25ec(0x1be)]??0x0,'helpWindow_BgType':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x203)][_0x7c25ec(0x261)]??0x0,'defaultCost':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['DefaultSkillCost']??0x3e8},Scene_SkillShop['prototype'][_0x7c25ec(0x286)]=function(){const _0x26c668=_0x7c25ec;Scene_MenuBase[_0x26c668(0x251)][_0x26c668(0x286)][_0x26c668(0x250)](this);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1b1)]=function(_0xb64d3d,_0x16b83c){const _0x26c898=_0x7c25ec;this[_0x26c898(0x2e5)]=_0xb64d3d[_0x26c898(0x254)](_0xd3dac2=>$dataSkills[_0xd3dac2])[_0x26c898(0x230)](undefined)[_0x26c898(0x230)](null),this['_discount']=_0x16b83c;},Scene_SkillShop[_0x7c25ec(0x251)]['create']=function(){const _0x5616c6=_0x7c25ec;Scene_MenuBase[_0x5616c6(0x251)][_0x5616c6(0x218)][_0x5616c6(0x250)](this),this[_0x5616c6(0x1a1)](),this[_0x5616c6(0x1ab)](),this[_0x5616c6(0x1c0)](),this[_0x5616c6(0x1ec)](),this[_0x5616c6(0x1c9)](),this['isUsingShopBustStyleUI']()&&this[_0x5616c6(0x1cc)]();},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1a1)]=function(){const _0x1015f0=_0x7c25ec;Scene_MenuBase[_0x1015f0(0x251)][_0x1015f0(0x1a1)][_0x1015f0(0x250)](this),this['_helpWindow'][_0x1015f0(0x2ce)](Scene_SkillShop['SETTINGS'][_0x1015f0(0x217)]);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1ab)]=function(){const _0x3bd2ec=_0x7c25ec,_0x4f2342=this[_0x3bd2ec(0x1cf)](),_0x4479f2=new Window_SkillShopCommand(_0x4f2342);_0x4479f2[_0x3bd2ec(0x1e3)](this[_0x3bd2ec(0x21f)]),_0x4479f2[_0x3bd2ec(0x281)](_0x3bd2ec(0x1b4),this['commandLearn'][_0x3bd2ec(0x239)](this)),_0x4479f2['setHandler']('cancel',this[_0x3bd2ec(0x1ac)][_0x3bd2ec(0x239)](this)),this[_0x3bd2ec(0x1ce)](_0x4479f2),this['_commandWindow']=_0x4479f2,_0x4479f2[_0x3bd2ec(0x2ce)](Window_SkillShopCommand[_0x3bd2ec(0x1a3)][_0x3bd2ec(0x2c3)]);},Scene_SkillShop['prototype'][_0x7c25ec(0x1cf)]=function(){const _0x1d9677=_0x7c25ec;if(this[_0x1d9677(0x28b)]())return this[_0x1d9677(0x234)]();if(VisuMZ[_0x1d9677(0x285)]['Settings'][_0x1d9677(0x203)][_0x1d9677(0x282)])return VisuMZ[_0x1d9677(0x285)][_0x1d9677(0x1bb)]['Window'][_0x1d9677(0x282)][_0x1d9677(0x250)](this);const _0x5b90df=Graphics[_0x1d9677(0x298)]-this[_0x1d9677(0x1d3)](),_0x5e01ea=this[_0x1d9677(0x1a5)](0x1,!![]),_0x568b49=0x0,_0x17c726=this[_0x1d9677(0x1f4)]();return new Rectangle(_0x568b49,_0x17c726,_0x5b90df,_0x5e01ea);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1c0)]=function(){const _0x10bdf1=_0x7c25ec,_0x50f2c9=this['goldWindowRect'](),_0xd99d04=new Window_Gold(_0x50f2c9);this[_0x10bdf1(0x1ce)](_0xd99d04),this[_0x10bdf1(0x2a9)]=_0xd99d04,_0xd99d04['setBackgroundType'](Scene_SkillShop[_0x10bdf1(0x1a3)][_0x10bdf1(0x2e4)]);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1c8)]=function(){const _0x300450=_0x7c25ec;if(this['isUsingShopBustStyleUI']())return this[_0x300450(0x1d9)]();if(VisuMZ[_0x300450(0x285)]['Settings'][_0x300450(0x203)][_0x300450(0x262)])return VisuMZ[_0x300450(0x285)][_0x300450(0x1bb)][_0x300450(0x203)][_0x300450(0x262)]['call'](this);const _0x30d60e=this[_0x300450(0x1d3)](),_0x304875=this[_0x300450(0x1a5)](0x1,!![]),_0x392ac4=Graphics[_0x300450(0x298)]-_0x30d60e,_0x3c2a3a=this[_0x300450(0x1f4)]();return new Rectangle(_0x392ac4,_0x3c2a3a,_0x30d60e,_0x304875);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1ec)]=function(){const _0x46a2c1=_0x7c25ec,_0x2a2056=this[_0x46a2c1(0x273)](),_0x581d3f=new Window_SkillShopActorList(_0x2a2056);_0x581d3f[_0x46a2c1(0x1e3)](this[_0x46a2c1(0x21f)]),_0x581d3f[_0x46a2c1(0x281)]('ok',this[_0x46a2c1(0x2cb)]['bind'](this)),_0x581d3f[_0x46a2c1(0x281)]('cancel',this[_0x46a2c1(0x293)][_0x46a2c1(0x239)](this)),this[_0x46a2c1(0x1ce)](_0x581d3f),this[_0x46a2c1(0x296)]=_0x581d3f,_0x581d3f['setBackgroundType'](0x0);},Scene_SkillShop['prototype']['actorListWindowRect']=function(){const _0x4f04eb=_0x7c25ec;if(this[_0x4f04eb(0x28b)]())return this[_0x4f04eb(0x1dc)]();if(VisuMZ[_0x4f04eb(0x285)][_0x4f04eb(0x1bb)][_0x4f04eb(0x203)][_0x4f04eb(0x28a)])return VisuMZ[_0x4f04eb(0x285)][_0x4f04eb(0x1bb)][_0x4f04eb(0x203)]['ActorListWindow_RectJS']['call'](this);const _0x11911e=Math[_0x4f04eb(0x28c)](Graphics[_0x4f04eb(0x298)]/0x2),_0x1fdc72=this[_0x4f04eb(0x29d)]()-this[_0x4f04eb(0x1a5)](0x1,!![]),_0x4779b2=0x0,_0x5dd9d6=this[_0x4f04eb(0x1f4)]()+this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x4779b2,_0x5dd9d6,_0x11911e,_0x1fdc72);},Scene_SkillShop[_0x7c25ec(0x251)]['createSkillListWindow']=function(){const _0xb7d192=_0x7c25ec,_0xbda0a4=this['skillListWindowRect'](),_0x57a9ba=new Window_SkillShopSkillList(_0xbda0a4,this['_discount']);_0x57a9ba[_0xb7d192(0x2ad)](this[_0xb7d192(0x2e5)]),_0x57a9ba[_0xb7d192(0x1e3)](this['_helpWindow']),this[_0xb7d192(0x296)][_0xb7d192(0x214)](_0x57a9ba),_0x57a9ba['setHandler']('ok',this[_0xb7d192(0x27e)][_0xb7d192(0x239)](this)),_0x57a9ba[_0xb7d192(0x281)](_0xb7d192(0x260),this[_0xb7d192(0x25d)][_0xb7d192(0x239)](this)),this['addWindow'](_0x57a9ba),this[_0xb7d192(0x267)]=_0x57a9ba,_0x57a9ba[_0xb7d192(0x2ce)](0x0);},Scene_SkillShop['prototype'][_0x7c25ec(0x2c2)]=function(){const _0x5a13d5=_0x7c25ec;if(this[_0x5a13d5(0x28b)]())return this['getShopBustStyleUI_SkillWindow_Rect']();if(VisuMZ[_0x5a13d5(0x285)][_0x5a13d5(0x1bb)][_0x5a13d5(0x203)][_0x5a13d5(0x1cb)])return VisuMZ['SkillShop']['Settings'][_0x5a13d5(0x203)]['SkillListWindow_RectJS'][_0x5a13d5(0x250)](this);const _0xabb697=Math[_0x5a13d5(0x1bc)](Graphics[_0x5a13d5(0x298)]/0x2),_0x27d8f2=this[_0x5a13d5(0x29d)]()-this[_0x5a13d5(0x1a5)](0x1,!![]),_0x453e4a=Math[_0x5a13d5(0x28c)](Graphics['boxWidth']/0x2),_0x539979=this[_0x5a13d5(0x1f4)]()+this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x453e4a,_0x539979,_0xabb697,_0x27d8f2);},Scene_SkillShop[_0x7c25ec(0x251)]['commandLearn']=function(){const _0x3e8bf9=_0x7c25ec;this[_0x3e8bf9(0x296)][_0x3e8bf9(0x24d)](),this[_0x3e8bf9(0x296)][_0x3e8bf9(0x1a8)](),this[_0x3e8bf9(0x24f)][_0x3e8bf9(0x287)](),this[_0x3e8bf9(0x28b)]()&&(this['_helpWindow'][_0x3e8bf9(0x284)](),this['_actorListWindow']['show'](),this['_skillListWindow']['show'](),this[_0x3e8bf9(0x24f)][_0x3e8bf9(0x2b2)](),this[_0x3e8bf9(0x1df)](_0x3e8bf9(0x2cc)));},Scene_SkillShop[_0x7c25ec(0x251)]['onActorListOk']=function(){const _0x46d035=_0x7c25ec;this['_skillListWindow']['activate'](),this[_0x46d035(0x267)][_0x46d035(0x1a8)](),this[_0x46d035(0x296)][_0x46d035(0x287)](),this[_0x46d035(0x28b)]()&&this[_0x46d035(0x1df)](_0x46d035(0x2cb));},Scene_SkillShop['prototype'][_0x7c25ec(0x293)]=function(){const _0x5b4d19=_0x7c25ec;this['_actorListWindow'][_0x5b4d19(0x287)](),this['_commandWindow'][_0x5b4d19(0x24d)](),this[_0x5b4d19(0x28b)]()&&(this[_0x5b4d19(0x1df)](_0x5b4d19(0x293)),this[_0x5b4d19(0x2d3)](),this[_0x5b4d19(0x24f)]['show']());},Scene_SkillShop[_0x7c25ec(0x251)]['onSkillListOk']=function(){const _0x1b2417=_0x7c25ec,_0x3cb625=this[_0x1b2417(0x296)][_0x1b2417(0x2dc)](),_0x4781f5=this[_0x1b2417(0x267)][_0x1b2417(0x19e)](),_0x4427b8=Math[_0x1b2417(0x1bc)](DataManager[_0x1b2417(0x19d)](_0x4781f5)*(0x1-this[_0x1b2417(0x24c)]));Imported[_0x1b2417(0x276)]&&VisuMZ[_0x1b2417(0x21d)][_0x1b2417(0x1bf)](_0x4781f5,-0x1),$gameParty['loseGold'](_0x4427b8),_0x3cb625[_0x1b2417(0x28f)](_0x4781f5['id']),this[_0x1b2417(0x267)][_0x1b2417(0x1f8)](),this[_0x1b2417(0x267)][_0x1b2417(0x24d)](),this[_0x1b2417(0x2a9)][_0x1b2417(0x1f8)](),this[_0x1b2417(0x28b)]()&&this[_0x1b2417(0x1df)]('onSkillListOk');},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x25d)]=function(){const _0x4d9748=_0x7c25ec;this[_0x4d9748(0x267)]['deactivate'](),this[_0x4d9748(0x296)][_0x4d9748(0x24d)](),this['isUsingShopBustStyleUI']()&&this[_0x4d9748(0x1df)](_0x4d9748(0x25d));},Scene_SkillShop[_0x7c25ec(0x251)]['createBackground']=function(){const _0x2abcef=_0x7c25ec;Scene_MenuBase[_0x2abcef(0x251)]['createBackground']['call'](this),this[_0x2abcef(0x252)](this[_0x2abcef(0x22d)]()),this['createCustomBackgroundImages']();},Scene_SkillShop[_0x7c25ec(0x251)]['getBackgroundOpacity']=function(){const _0x250862=_0x7c25ec;return VisuMZ[_0x250862(0x285)][_0x250862(0x1bb)][_0x250862(0x2be)][_0x250862(0x1ea)];},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1c6)]=function(){const _0x2fc4c9=_0x7c25ec;if(this['meetsShopBustStyleUIConditions']()){this[_0x2fc4c9(0x1d8)]();return;}const _0xf9b28f=VisuMZ['SkillShop'][_0x2fc4c9(0x1bb)][_0x2fc4c9(0x2be)];_0xf9b28f&&(_0xf9b28f[_0x2fc4c9(0x1a6)]!==''||_0xf9b28f[_0x2fc4c9(0x1b3)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x2fc4c9(0x2a5)](_0xf9b28f[_0x2fc4c9(0x1a6)])),this[_0x2fc4c9(0x19a)]=new Sprite(ImageManager[_0x2fc4c9(0x2a6)](_0xf9b28f[_0x2fc4c9(0x1b3)])),this[_0x2fc4c9(0x242)](this[_0x2fc4c9(0x26a)]),this[_0x2fc4c9(0x242)](this[_0x2fc4c9(0x19a)]),this[_0x2fc4c9(0x26a)][_0x2fc4c9(0x247)][_0x2fc4c9(0x1cd)](this[_0x2fc4c9(0x19c)][_0x2fc4c9(0x239)](this,this[_0x2fc4c9(0x26a)])),this[_0x2fc4c9(0x19a)][_0x2fc4c9(0x247)][_0x2fc4c9(0x1cd)](this[_0x2fc4c9(0x19c)]['bind'](this,this[_0x2fc4c9(0x19a)])));},Scene_SkillShop['prototype'][_0x7c25ec(0x19c)]=function(_0x3dc51d){const _0x4bbf55=_0x7c25ec;this[_0x4bbf55(0x1d1)](_0x3dc51d),this[_0x4bbf55(0x291)](_0x3dc51d);};Imported[_0x7c25ec(0x1ba)]&&(Scene_SkillShop[_0x7c25ec(0x2f0)]={'maxListSize':VisuMZ['ShopBustStyleUI'][_0x7c25ec(0x1bb)][_0x7c25ec(0x2de)][_0x7c25ec(0x29e)]??0x8,'fadeout':VisuMZ[_0x7c25ec(0x2b9)][_0x7c25ec(0x1bb)]['SceneSkillShopData'][_0x7c25ec(0x2cd)]??!![],'exitDelay':VisuMZ[_0x7c25ec(0x2b9)][_0x7c25ec(0x1bb)][_0x7c25ec(0x2de)][_0x7c25ec(0x211)]??0x5dc,'windowScale':VisuMZ[_0x7c25ec(0x2b9)][_0x7c25ec(0x1bb)][_0x7c25ec(0x2de)][_0x7c25ec(0x206)]??0.8});;Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1ad)]=function(){const _0x42319a=_0x7c25ec;if(!Imported['VisuMZ_3_ShopBustStyleUI'])return{};return $gameSystem[_0x42319a(0x2df)]();},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x28b)]=function(){const _0x41ea24=_0x7c25ec;if(!Imported[_0x41ea24(0x1ba)])return![];return this['getShopBustStyleUISettings']()[_0x41ea24(0x25e)];},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x236)]=function(){const _0x5f0699=_0x7c25ec;return this[_0x5f0699(0x28b)]();},Scene_SkillShop['prototype'][_0x7c25ec(0x1cc)]=function(){const _0x552708=_0x7c25ec;this[_0x552708(0x24a)](),this[_0x552708(0x1fa)](),this['hideWindowsShopBustStyleUI'](),this[_0x552708(0x1df)](_0x552708(0x2a4));},Scene_SkillShop['prototype'][_0x7c25ec(0x1fa)]=function(){const _0x3c0e61=_0x7c25ec,_0x86c01c=Scene_SkillShop[_0x3c0e61(0x2f0)]['windowScale'],_0x1325eb=[this[_0x3c0e61(0x2a9)],this[_0x3c0e61(0x24f)],this['_actorListWindow'],this[_0x3c0e61(0x267)]];for(const _0x5e1ef8 of _0x1325eb){_0x5e1ef8['scale']['x']=_0x5e1ef8[_0x3c0e61(0x2c7)]['y']=_0x86c01c;}},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x2d3)]=function(){const _0x28ec93=_0x7c25ec;this[_0x28ec93(0x21f)]['hide'](),this[_0x28ec93(0x296)][_0x28ec93(0x2b2)](),this[_0x28ec93(0x267)][_0x28ec93(0x2b2)]();},VisuMZ['SkillShop'][_0x7c25ec(0x263)]=Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x272)],Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x272)]=function(){const _0x1c0630=_0x7c25ec;VisuMZ[_0x1c0630(0x285)][_0x1c0630(0x263)][_0x1c0630(0x250)](this),this['isUsingShopBustStyleUI']()&&Scene_SkillShop['SHOP_BUST_STYLE_UI'][_0x1c0630(0x2cd)]&&this[_0x1c0630(0x28e)]();},VisuMZ['SkillShop'][_0x7c25ec(0x2bb)]=Scene_Map['prototype'][_0x7c25ec(0x274)],Scene_Map[_0x7c25ec(0x251)]['stop']=function(){const _0x286826=_0x7c25ec;VisuMZ[_0x286826(0x285)][_0x286826(0x2bb)][_0x286826(0x250)](this),SceneManager[_0x286826(0x2ec)](Scene_SkillShop)&&Imported['VisuMZ_3_ShopBustStyleUI']&&$gameSystem['isUsingSkillShopBustStyleUI']()&&Scene_SkillShop[_0x286826(0x2f0)][_0x286826(0x2cd)]&&this[_0x286826(0x2bd)]();},VisuMZ[_0x7c25ec(0x285)]['Scene_SkillShop_popScene']=Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1ac)],Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1ac)]=function(){const _0x31ac06=_0x7c25ec;this['isUsingShopBustStyleUI']()?this[_0x31ac06(0x212)]():VisuMZ[_0x31ac06(0x285)][_0x31ac06(0x2b7)]['call'](this);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x212)]=function(){const _0x289055=_0x7c25ec;this[_0x289055(0x1de)]&&this['_shopBustStyleUI_MessageWindow']['setMessage'](_0x289055(0x199));this[_0x289055(0x24f)][_0x289055(0x26c)](),this[_0x289055(0x2a9)][_0x289055(0x26c)]();const _0x103a8b=Scene_SkillShop[_0x289055(0x2f0)][_0x289055(0x211)];setTimeout(this[_0x289055(0x2c6)][_0x289055(0x239)](this),_0x103a8b);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x2c6)]=function(){const _0x320a58=_0x7c25ec;Scene_SkillShop[_0x320a58(0x2f0)][_0x320a58(0x2cd)]&&this[_0x320a58(0x2bd)](),VisuMZ[_0x320a58(0x285)][_0x320a58(0x2b7)][_0x320a58(0x250)](this);},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1d5)]=Scene_Map['prototype'][_0x7c25ec(0x222)],Scene_Map[_0x7c25ec(0x251)][_0x7c25ec(0x222)]=function(){const _0xd29b3d=_0x7c25ec;if(SceneManager[_0xd29b3d(0x1a4)](Scene_SkillShop)&&Imported['VisuMZ_3_ShopBustStyleUI']&&$gameSystem[_0xd29b3d(0x27a)]()&&Scene_SkillShop[_0xd29b3d(0x2f0)][_0xd29b3d(0x2cd)])return!![];return VisuMZ[_0xd29b3d(0x285)][_0xd29b3d(0x1d5)][_0xd29b3d(0x250)](this);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x234)]=function(){const _0xfb6d94=_0x7c25ec;if(VisuMZ[_0xfb6d94(0x2b9)][_0xfb6d94(0x1bb)][_0xfb6d94(0x2de)]['Window_Command_RectJS'])return VisuMZ[_0xfb6d94(0x2b9)]['Settings'][_0xfb6d94(0x2de)]['Window_Command_RectJS'][_0xfb6d94(0x250)](this);const _0x3da339=this[_0xfb6d94(0x1d3)](),_0x4bc8e4=this[_0xfb6d94(0x1a5)](this['getTotalCommandWindowCommands'](),!![]),_0x85c97b=Math[_0xfb6d94(0x28c)]((Graphics[_0xfb6d94(0x298)]-Math['min'](Graphics[_0xfb6d94(0x298)],0x330))/0x2),_0x2de50d=this['mainAreaTop']()+0x64;return new Rectangle(_0x85c97b,_0x2de50d,_0x3da339,_0x4bc8e4);},Scene_SkillShop['prototype'][_0x7c25ec(0x21c)]=function(){let _0x1749fc=0x2;return _0x1749fc;},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1d9)]=function(){const _0xe3663f=_0x7c25ec;if(VisuMZ[_0xe3663f(0x2b9)][_0xe3663f(0x1bb)][_0xe3663f(0x2de)][_0xe3663f(0x235)])return VisuMZ[_0xe3663f(0x2b9)][_0xe3663f(0x1bb)][_0xe3663f(0x2de)][_0xe3663f(0x235)]['call'](this);const _0x47af9a=Scene_SkillShop['SHOP_BUST_STYLE_UI'][_0xe3663f(0x206)],_0x45981c=this[_0xe3663f(0x1d3)]()/_0x47af9a,_0x24f8c9=this[_0xe3663f(0x1a5)](0x1,!![]),_0x13d405=Math[_0xe3663f(0x28c)]((Graphics[_0xe3663f(0x298)]-_0x45981c)/0x2),_0x3926ff=this['mainAreaBottom']()-this[_0xe3663f(0x1a5)](0x4,![])-Math[_0xe3663f(0x28c)](_0x24f8c9*_0x47af9a);return new Rectangle(_0x13d405,_0x3926ff,_0x45981c,_0x24f8c9);},Scene_SkillShop[_0x7c25ec(0x251)][_0x7c25ec(0x1dc)]=function(){const _0x12f6ae=_0x7c25ec;if(VisuMZ[_0x12f6ae(0x2b9)]['Settings']['SceneSkillShopData'][_0x12f6ae(0x1e9)])return VisuMZ[_0x12f6ae(0x2b9)][_0x12f6ae(0x1bb)][_0x12f6ae(0x2de)][_0x12f6ae(0x1e9)][_0x12f6ae(0x250)](this);const _0xfd212=Scene_SkillShop[_0x12f6ae(0x2f0)][_0x12f6ae(0x206)],_0x16c7f1=Scene_SkillShop['SHOP_BUST_STYLE_UI'][_0x12f6ae(0x29e)],_0x44ffcc=Math[_0x12f6ae(0x29f)](Graphics[_0x12f6ae(0x298)],0x330),_0x2e7f06=Math[_0x12f6ae(0x1bc)](this[_0x12f6ae(0x29d)]()-this['calcWindowHeight'](0x4,![])-this[_0x12f6ae(0x1a5)](0x1,!![])*_0xfd212),_0x4d999d=Math[_0x12f6ae(0x1bc)](_0x44ffcc/0x2),_0x5a7b44=Math[_0x12f6ae(0x29f)](Math['floor'](_0x2e7f06/_0xfd212),this[_0x12f6ae(0x1a5)](_0x16c7f1,!![])),_0x32fc91=Math['floor']((Graphics[_0x12f6ae(0x298)]-_0x44ffcc)/0x4),_0x132a4d=this['mainAreaTop']()+Math[_0x12f6ae(0x28c)]((_0x2e7f06-_0x5a7b44*_0xfd212)/0x2);return new Rectangle(_0x32fc91,_0x132a4d,_0x4d999d,_0x5a7b44);},Scene_SkillShop[_0x7c25ec(0x251)]['getShopBustStyleUI_SkillWindow_Rect']=function(){const _0x4dda21=_0x7c25ec;if(VisuMZ['ShopBustStyleUI']['Settings']['SceneSkillShopData'][_0x4dda21(0x2c9)])return VisuMZ[_0x4dda21(0x2b9)]['Settings'][_0x4dda21(0x2de)][_0x4dda21(0x2c9)][_0x4dda21(0x250)](this);const _0xbd5653=this[_0x4dda21(0x273)](),_0xf6b61f=Scene_SkillShop[_0x4dda21(0x2f0)]['windowScale'],_0x355ab4=_0xbd5653[_0x4dda21(0x1ed)],_0x5c2ef3=_0xbd5653[_0x4dda21(0x1b8)],_0x2658a1=_0xbd5653['x']+Math[_0x4dda21(0x1bc)](_0xbd5653['width']*_0xf6b61f),_0x3d24af=_0xbd5653['y'];return new Rectangle(_0x2658a1,_0x3d24af,_0x355ab4,_0x5c2ef3);},Scene_SkillShop['prototype']['getShopBustStyleUI_MessageWindow_Rect']=function(){const _0xc9929e=_0x7c25ec;if(VisuMZ[_0xc9929e(0x2b9)][_0xc9929e(0x1bb)][_0xc9929e(0x2de)][_0xc9929e(0x210)])return VisuMZ[_0xc9929e(0x2b9)][_0xc9929e(0x1bb)]['SceneSkillShopData'][_0xc9929e(0x210)][_0xc9929e(0x250)](this);const _0x453794=Math[_0xc9929e(0x29f)](Graphics['boxWidth'],0x330),_0x58cf6a=this[_0xc9929e(0x1a5)](0x4,![]),_0x47bc76=Math['floor']((Graphics[_0xc9929e(0x298)]-_0x453794)/0x2),_0x561c60=this[_0xc9929e(0x295)]()-_0x58cf6a;return new Rectangle(_0x47bc76,_0x561c60,_0x453794,_0x58cf6a);};function _0x4dd3(){const _0x155859=['mainCommandWidth','CheckSkillSwitchRequirement','Scene_Map_needsFadeIn','return\x200','drawItemClass','createShopBustStyleUI_CustomBackground','getShopBustStyleUI_GoldWindow_Rect','commandName','commandStyleCheck','getShopBustStyleUI_ActorWindow_Rect','defaultCost','_shopBustStyleUI_MessageWindow','setBustStyleUIMessageType','drawActorName','commandNameWindowDrawText','_data','setHelpWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','help','faceName','2228544naHgtK','getMoreCurrenciesObjLibrary','Window_Actor_RectJS','SnapshotOpacity','currentSymbol','createActorListWindow','width','filter','drawActorClass','visualGoldDisplayNoCost','forClass','SceneOpenSkillShop','Exit','mainAreaTop','parameters','commandStyle','isEnabled','refresh','VisuMZ_1_SkillsStatesCore','adjustWindowScaleShopBustStyleUI','level','CheckClassAccess','drawItemName','n/a','stypeJoin','center','skillShopSwitchRequirements','skillLearnRequirement','Window','addCustomCommand','CreateSubGoldCostText','windowScale','size','Leave\x20the\x20skill\x20shop.','isCustomCommandEnabled','iconWidth','toUpperCase','skills','currentClass','replace','getSkillIdWithName','Window_ShopMsg_RectJS','exitDelay','exitShopBustStyleUI','skillShopSkillLearnRequirements','setSkillListWindow','iconHeight','windowPadding','helpWindow_BgType','create','Needs\x20%2%1','975428CurtxW','index','getTotalCommandWindowCommands','MoreCurrencies','DataManager_prepareMoreCurrenciesObj','_helpWindow','_moreCurrencyCosts','Patch_CreateSubGoldCostText','needsFadeIn','faceWidth','17960oxuZYa','maxItems','ARRAYSTR','_scene','split','Vocab','398553oxSJOC','errors','CreateVisualGoldText','getBackgroundOpacity','includes','iconIndex','remove','opacity','Select\x20a\x20skill\x20for\x20a\x20party\x20member\x20to\x20learn.','callUpdateHelp','getShopBustStyleUI_CommandWindow_Rect','Window_Gold_RectJS','meetsShopBustStyleUIConditions','itemAt','For\x20%1','bind','test','SkillListWindow_BgType','updateCommandNameWindow','canSkillShopLearn','loadFace','DataManager_getMoreCurrenciesObjLibrary','gold','STRUCT','addChild','itemRect','commandNameWindowCenter','drawItemStyleIcon','contents','bitmap','itemPadding','itemTextAlign','createShopBustStyleUI_MessageWindow','getClassIdWithName','_discount','activate','drawTextEx','_commandWindow','call','prototype','setBackgroundOpacity','CheckSkillTypeAccess','map','createCommandNameWindow','_skillShopClassRequirements','Not\x20For\x20%1','266VHWUJG','_skillIDs','playUseSkill','drawItemObject','parse','onSkillListCancel','enabled','CancelHelpDesc','cancel','HelpWindow_BgType','GoldWindow_RectJS','Scene_SkillShop_start','_skillShopSwitchRequirements','VisuMZ_2_MoreCurrencies\x20needs\x20to\x20be\x20updated\x20','_classIDs','_skillListWindow','drawCannotLearnReason','spaceJoin','_backSprite1','commandNameWindowDrawBackground','close','round','LearnSkillReq','skillTypes','\x5cI[%1]','exit','start','actorListWindowRect','stop','playOkSound','VisuMZ_2_MoreCurrencies','clamp','ARRAYFUNC','JSON','isUsingSkillShopBustStyleUI','makeCommandList','loadFaceImages','ConvertParams','onSkillListOk','ParseAllNotetags','commands','setHandler','CommandWindow_RectJS','wrongClass','show','SkillShop','initialize','deactivate','status','forceSelect','ActorListWindow_RectJS','isUsingShopBustStyleUI','floor','name','startFadeIn','learnSkill','prepareMoreCurrenciesObj','centerSprite','SkillIDs','onActorListCancel','icon','mainAreaBottom','_actorListWindow','RegExp','boxWidth','_skillShopLevelRequirements','NUM','members','right','mainAreaHeight','maxListSize','min','CancelIcon','Scene_Boot_process_VisuMZ_MoreCurrencies_Notetags','itemLineRect','_skillShopCost','welcome','loadTitle1','loadTitle2','setHelpWindowItem','some','_goldWindow','ParseNotetagCosts','96227gavtwd','drawItemFace','setSkillList','skillShopClassRequirements','playShop','constructor','changePaintOpacity','hide','ARRAYEVAL','value','match','setText','Scene_SkillShop_popScene','updateHelp','ShopBustStyleUI','maxCols','Scene_Map_stop','auto','startFadeOut','BgSettings','_commandNameWindow','max','ARRAYJSON','skillListWindowRect','bgType','LevelReq','prepareNextScene','processExitShopBustStyleUI','scale','isCustomCommandVisible','Window_Skill_RectJS','4BgKOXZ','onActorListOk','commandLearn','fadeout','setBackgroundType','drawText','\x5cI[%1]%2','drawItemStyleIconText','582612nVmDGt','hideWindowsShopBustStyleUI','ClassReq','ARRAYNUM','LearnIcon','VisualGoldDisplay','drawCurrencyValue','iconText','switches','STR','actor','LearnText','SceneSkillShopData','getSkillShopBustStyleUISettings','every','push','innerWidth','description','goldWindow_BgType','_skills','CheckSkillLearnRequirement','%1\x20is\x20a\x20level\x20%2\x20%3.\x0aCan\x20learn\x20%4\x20skills.','VisuMZ_3_VisualGoldDisplay','stypeId','setActor','isCommandEnabled','isNextScene','LearnHelpDesc','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','registerCommand','SHOP_BUST_STYLE_UI','helpDescFmt','leave','_backSprite2','drawItem','adjustSprite','skillShopCost','item','ParseSkillNotetags','createHelpText','createHelpWindow','length','SETTINGS','isPreviousScene','calcWindowHeight','BgFilename1','resetFontSettings','selectLast','skillShopLevelRequirements','ActorHelpDescFmt','createCommandWindow','popScene','getShopBustStyleUISettings','text','visualGoldDisplayPadding','No\x20%1\x20Access','prepare','alreadyLearned','BgFilename2','learn','DiscountRate','prepareActorFace','CancelText','height','noStypeAccess','VisuMZ_3_ShopBustStyleUI','Settings','ceil','_skillShopSkillLearnRequirements','GoldWindow_BgType','ChangeQuantityForObj','createGoldWindow','format','addedSkillTypes','drawActorFace','trim','isSceneBattle','createCustomBackgroundImages','1680155aNazSV','goldWindowRect','createSkillListWindow','isLearnedSkill','SkillListWindow_RectJS','postCreateWindowsShopBustStyleUI','addLoadListener','addWindow','commandWindowRect','note','scaleSprite','_actor'];_0x4dd3=function(){return _0x155859;};return _0x4dd3();}function _0x8204(_0x7beeca,_0x3f270f){const _0x4dd3e4=_0x4dd3();return _0x8204=function(_0x82048,_0x4ce7d2){_0x82048=_0x82048-0x199;let _0x4d1755=_0x4dd3e4[_0x82048];return _0x4d1755;},_0x8204(_0x7beeca,_0x3f270f);}function Window_SkillShopCommand(){const _0x259c43=_0x7c25ec;this[_0x259c43(0x286)](...arguments);}Window_SkillShopCommand['prototype']=Object[_0x7c25ec(0x218)](Window_HorzCommand[_0x7c25ec(0x251)]),Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x2b0)]=Window_SkillShopCommand,Window_SkillShopCommand[_0x7c25ec(0x1a3)]={'bgType':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x203)]['CommandWindow_BgType']??0x0,'commandStyle':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x203)]['CommandWindow_Style']??_0x7c25ec(0x2bc),'commands':{'learn':{'show':!![],'text':VisuMZ[_0x7c25ec(0x285)]['Settings']['Vocab'][_0x7c25ec(0x2dd)]??'Learn','icon':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x2d6)]??0x4f,'help':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x2ed)]??_0x7c25ec(0x232)},'cancel':{'show':!![],'text':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab'][_0x7c25ec(0x1b7)]??_0x7c25ec(0x1f3),'icon':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x2a0)]??0x52,'help':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab'][_0x7c25ec(0x25f)]??_0x7c25ec(0x208)}},'commandOrder':[_0x7c25ec(0x1b4),'cancel']},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x286)]=function(_0x11a145){const _0x13192e=_0x7c25ec;Window_HorzCommand[_0x13192e(0x251)][_0x13192e(0x286)][_0x13192e(0x250)](this,_0x11a145),this[_0x13192e(0x255)](_0x11a145);},Window_SkillShopCommand[_0x7c25ec(0x251)]['callUpdateHelp']=function(){const _0x3a799d=_0x7c25ec;Window_HorzCommand[_0x3a799d(0x251)]['callUpdateHelp'][_0x3a799d(0x250)](this);if(this['_commandNameWindow'])this[_0x3a799d(0x23c)]();},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x2ba)]=function(){const _0x467987=_0x7c25ec;if(SceneManager['_scene']&&SceneManager[_0x467987(0x227)][_0x467987(0x28b)]())return 0x1;return 0x2;},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x255)]=function(_0x121de3){const _0x362ebe=_0x7c25ec,_0x2f270b=new Rectangle(0x0,0x0,_0x121de3[_0x362ebe(0x1ed)],_0x121de3[_0x362ebe(0x1b8)]);this[_0x362ebe(0x2bf)]=new Window_Base(_0x2f270b),this['_commandNameWindow'][_0x362ebe(0x231)]=0x0,this[_0x362ebe(0x242)](this[_0x362ebe(0x2bf)]),this['updateCommandNameWindow']();},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x23c)]=function(){const _0x547658=_0x7c25ec,_0x19c5f8=this[_0x547658(0x2bf)];_0x19c5f8[_0x547658(0x246)]['clear']();const _0x3d045c=this[_0x547658(0x1db)](this['index']());if(_0x3d045c===_0x547658(0x294)){const _0x1919ae=this[_0x547658(0x2a2)](this['index']());let _0x42ea3f=this[_0x547658(0x1da)](this['index']());_0x42ea3f=_0x42ea3f[_0x547658(0x20e)](/\\I\[(\d+)\]/gi,''),_0x19c5f8['resetFontSettings'](),this[_0x547658(0x26b)](_0x42ea3f,_0x1919ae),this[_0x547658(0x1e1)](_0x42ea3f,_0x1919ae),this[_0x547658(0x244)](_0x42ea3f,_0x1919ae);}},Window_SkillShopCommand[_0x7c25ec(0x251)]['commandNameWindowDrawBackground']=function(_0x1dbbee,_0x408398){},Window_SkillShopCommand[_0x7c25ec(0x251)]['commandNameWindowDrawText']=function(_0x1687b5,_0x5e9452){const _0xb6564c=_0x7c25ec,_0x3d0733=this[_0xb6564c(0x2bf)];_0x3d0733[_0xb6564c(0x2cf)](_0x1687b5,0x0,_0x5e9452['y'],_0x3d0733[_0xb6564c(0x2e2)],_0xb6564c(0x200));},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x244)]=function(_0x5cbff8,_0x4d497f){const _0x5bd2e6=_0x7c25ec,_0x4eeed4=this[_0x5bd2e6(0x2bf)],_0x3c3496=$gameSystem[_0x5bd2e6(0x216)](),_0x33456a=_0x4d497f['x']+Math[_0x5bd2e6(0x28c)](_0x4d497f[_0x5bd2e6(0x1ed)]/0x2)+_0x3c3496;_0x4eeed4['x']=_0x4eeed4[_0x5bd2e6(0x1ed)]/-0x2+_0x33456a,_0x4eeed4['y']=Math[_0x5bd2e6(0x28c)](_0x4d497f[_0x5bd2e6(0x1b8)]/0x2);},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x27b)]=function(){const _0x5a624b=_0x7c25ec;for(const _0x7514bf of Window_SkillShopCommand[_0x5a624b(0x1a3)]['commandOrder']){this[_0x5a624b(0x204)](_0x7514bf);}},Window_SkillShopCommand['prototype'][_0x7c25ec(0x204)]=function(_0x406c66){const _0x41d4a1=_0x7c25ec,_0x3fcf3d=Window_SkillShopCommand[_0x41d4a1(0x1a3)][_0x41d4a1(0x280)][_0x406c66];if(!this[_0x41d4a1(0x2c8)](_0x3fcf3d))return;const _0xe60904=_0x406c66,_0x515463=Number(_0x3fcf3d[_0x41d4a1(0x294)]);let _0x2ddd1a=_0x3fcf3d[_0x41d4a1(0x1ae)];_0x515463>0x0&&this['commandStyle']()!==_0x41d4a1(0x1ae)&&(_0x2ddd1a=_0x41d4a1(0x2d0)[_0x41d4a1(0x1c1)](_0x515463,_0x2ddd1a));const _0x2947cf=this[_0x41d4a1(0x209)](_0x3fcf3d);this['addCommand'](_0x2ddd1a,_0xe60904,_0x2947cf);},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x2c8)]=function(_0x624c7f){return _0x624c7f['show'];},Window_SkillShopCommand['prototype'][_0x7c25ec(0x209)]=function(_0x1475ec){return!![];},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x249)]=function(){const _0x10e220=_0x7c25ec;return _0x10e220(0x200);},Window_SkillShopCommand[_0x7c25ec(0x251)]['drawItem']=function(_0x2ba1ea){const _0x185a16=_0x7c25ec,_0x305878=this[_0x185a16(0x1db)](_0x2ba1ea);if(_0x305878===_0x185a16(0x2d9))this[_0x185a16(0x2d1)](_0x2ba1ea);else _0x305878===_0x185a16(0x294)?this[_0x185a16(0x245)](_0x2ba1ea):Window_HorzCommand['prototype'][_0x185a16(0x19b)]['call'](this,_0x2ba1ea);},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x1f6)]=function(){const _0x106740=_0x7c25ec;return Window_SkillShopCommand[_0x106740(0x1a3)][_0x106740(0x1f6)];},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x1db)]=function(_0x54dab2){const _0x3db831=_0x7c25ec;if(_0x54dab2<0x0)return _0x3db831(0x1ae);const _0x17ce13=this[_0x3db831(0x1f6)]();if(_0x17ce13!=='auto')return _0x17ce13;else{if(this[_0x3db831(0x225)]()>0x0){const _0x1fdd5b=this['commandName'](_0x54dab2);if(_0x1fdd5b[_0x3db831(0x2b5)](/\\I\[(\d+)\]/i)){const _0x24b812=this[_0x3db831(0x2a2)](_0x54dab2),_0x496085=this['textSizeEx'](_0x1fdd5b)[_0x3db831(0x1ed)];return _0x496085<=_0x24b812[_0x3db831(0x1ed)]?_0x3db831(0x2d9):_0x3db831(0x294);}}}return'text';},Window_SkillShopCommand['prototype']['drawItemStyleIconText']=function(_0x1c0390){const _0x2299e0=_0x7c25ec,_0x2f3c39=this[_0x2299e0(0x2a2)](_0x1c0390),_0x435b90=this[_0x2299e0(0x1da)](_0x1c0390),_0x57fcd3=this['textSizeEx'](_0x435b90)[_0x2299e0(0x1ed)];this['changePaintOpacity'](this[_0x2299e0(0x2eb)](_0x1c0390));const _0x5e62ac=this['itemTextAlign']();if(_0x5e62ac===_0x2299e0(0x29c))this[_0x2299e0(0x24e)](_0x435b90,_0x2f3c39['x']+_0x2f3c39[_0x2299e0(0x1ed)]-_0x57fcd3,_0x2f3c39['y'],_0x57fcd3);else{if(_0x5e62ac==='center'){const _0x2b3afa=_0x2f3c39['x']+Math[_0x2299e0(0x28c)]((_0x2f3c39[_0x2299e0(0x1ed)]-_0x57fcd3)/0x2);this[_0x2299e0(0x24e)](_0x435b90,_0x2b3afa,_0x2f3c39['y'],_0x57fcd3);}else this[_0x2299e0(0x24e)](_0x435b90,_0x2f3c39['x'],_0x2f3c39['y'],_0x57fcd3);}},Window_SkillShopCommand['prototype']['drawItemStyleIcon']=function(_0x16c22a){const _0x21302b=_0x7c25ec;this[_0x21302b(0x1da)](_0x16c22a)[_0x21302b(0x2b5)](/\\I\[(\d+)\]/i);const _0x2e2aad=Number(RegExp['$1'])||0x0,_0x11278e=this['itemLineRect'](_0x16c22a),_0x2dd31e=_0x11278e['x']+Math[_0x21302b(0x28c)]((_0x11278e[_0x21302b(0x1ed)]-ImageManager[_0x21302b(0x20a)])/0x2),_0x449009=_0x11278e['y']+(_0x11278e[_0x21302b(0x1b8)]-ImageManager[_0x21302b(0x215)])/0x2;this['drawIcon'](_0x2e2aad,_0x2dd31e,_0x449009);},Window_SkillShopCommand[_0x7c25ec(0x251)][_0x7c25ec(0x2b8)]=function(){const _0x53ef09=_0x7c25ec;Window_HorzCommand[_0x53ef09(0x251)][_0x53ef09(0x2b8)][_0x53ef09(0x250)](this);if(this['_helpWindow']){const _0xc31775=this[_0x53ef09(0x1eb)](),_0x917fda=Window_SkillShopCommand[_0x53ef09(0x1a3)][_0x53ef09(0x280)];this[_0x53ef09(0x21f)][_0x53ef09(0x2b6)](_0x917fda[_0xc31775][_0x53ef09(0x1e5)]||'');}};function Window_SkillShopActorList(){const _0x330d64=_0x7c25ec;this[_0x330d64(0x286)](...arguments);}Window_SkillShopActorList[_0x7c25ec(0x251)]=Object[_0x7c25ec(0x218)](Window_StatusBase[_0x7c25ec(0x251)]),Window_SkillShopActorList[_0x7c25ec(0x251)]['constructor']=Window_SkillShopActorList,Window_SkillShopActorList[_0x7c25ec(0x1a3)]={'bgType':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Window']['ActorListWindow_BgType']??0x0,'drawActorFace':VisuMZ['SkillShop'][_0x7c25ec(0x1bb)]['Window'][_0x7c25ec(0x1c3)]??!![],'drawActorName':VisuMZ['SkillShop'][_0x7c25ec(0x1bb)][_0x7c25ec(0x203)][_0x7c25ec(0x1e0)]??!![],'drawActorClass':VisuMZ[_0x7c25ec(0x285)]['Settings']['Window'][_0x7c25ec(0x1ef)]??!![],'helpDescFmt':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x1aa)]??_0x7c25ec(0x2e7),'stypeJoin':VisuMZ['SkillShop'][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x1ff)]??',','spaceJoin':VisuMZ['SkillShop'][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x269)]??!![]},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x286)]=function(_0x4bfdcd){const _0x32a6bd=_0x7c25ec;Window_StatusBase[_0x32a6bd(0x251)][_0x32a6bd(0x286)]['call'](this,_0x4bfdcd),this[_0x32a6bd(0x27c)](),this[_0x32a6bd(0x1f8)]();},Window_SkillShopActorList['prototype'][_0x7c25ec(0x225)]=function(){const _0x8d7c86=_0x7c25ec;return $gameParty[_0x8d7c86(0x207)]();},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x2dc)]=function(){const _0xce59cc=_0x7c25ec;return $gameParty['members']()[this[_0xce59cc(0x21b)]()];},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x1a8)]=function(){const _0x449512=_0x7c25ec,_0x1bf8c9=this[_0x449512(0x21b)]();this[_0x449512(0x289)](_0x1bf8c9>=0x0?_0x1bf8c9:0x0);},Window_SkillShopActorList['prototype'][_0x7c25ec(0x19b)]=function(_0x54286f){const _0x40bf2d=_0x7c25ec,_0x590aa4=_0x54286f<0x0?$gameParty:$gameParty[_0x40bf2d(0x29b)]()[_0x54286f];if(!_0x590aa4)return;this[_0x40bf2d(0x1b6)](_0x590aa4,_0x54286f);},Window_SkillShopActorList['prototype'][_0x7c25ec(0x1b6)]=function(_0x10935e,_0x6dcfad){const _0x4db845=_0x7c25ec,_0x2d78fe=ImageManager[_0x4db845(0x23e)](_0x10935e[_0x4db845(0x1e6)]());_0x2d78fe['addLoadListener'](this[_0x4db845(0x25b)][_0x4db845(0x239)](this,_0x10935e,_0x6dcfad));},Window_SkillShopActorList['prototype'][_0x7c25ec(0x25b)]=function(_0x5031df,_0x15175c){const _0x139c0e=_0x7c25ec;this[_0x139c0e(0x1a7)]();const _0x4fd903=this['itemLineRect'](_0x15175c);let _0x246be8=0x0;_0x246be8=0x0,_0x246be8+=this[_0x139c0e(0x2ac)](_0x5031df,_0x15175c),_0x246be8+=this[_0x139c0e(0x1fd)](_0x5031df,_0x4fd903,_0x246be8);if(_0x246be8+0xc0>this['innerWidth'])return;_0x246be8=_0x4fd903['x']+_0x4fd903[_0x139c0e(0x1ed)]-Math[_0x139c0e(0x2c0)](Math[_0x139c0e(0x28c)](_0x4fd903['width']/0x3),0xc0),this[_0x139c0e(0x1d7)](_0x5031df,_0x4fd903,_0x246be8);},Window_SkillShopActorList[_0x7c25ec(0x251)]['drawItemFace']=function(_0x92d4d8,_0x1c986a){const _0x31cd84=_0x7c25ec,_0x2d52a6=Window_SkillShopActorList[_0x31cd84(0x1a3)];if(!_0x2d52a6[_0x31cd84(0x1c3)])return 0x0;return rect=this[_0x31cd84(0x243)](_0x1c986a),this['drawActorFace'](_0x92d4d8,rect['x']+0x2,rect['y']+0x2,ImageManager[_0x31cd84(0x223)],rect[_0x31cd84(0x1b8)]-0x4),ImageManager[_0x31cd84(0x223)]+this[_0x31cd84(0x248)]();},Window_SkillShopActorList['prototype']['drawItemName']=function(_0x621b8c,_0x3ad858,_0x46da20){const _0x25436f=Window_SkillShopActorList['SETTINGS'];if(!_0x25436f['drawActorName'])return 0x0;return this['drawActorName'](_0x621b8c,_0x3ad858['x']+_0x46da20,_0x3ad858['y'],0xc0),0xc0;},Window_SkillShopActorList[_0x7c25ec(0x251)]['drawItemClass']=function(_0x50e4c7,_0x35a5ac,_0x1cc3db){const _0x2ea537=_0x7c25ec,_0x591ea9=Window_SkillShopActorList[_0x2ea537(0x1a3)];if(!_0x591ea9['drawActorClass'])return 0x0;this[_0x2ea537(0x1ef)](_0x50e4c7,_0x35a5ac['x']+_0x1cc3db,_0x35a5ac['y'],0xc0);},Window_SkillShopActorList[_0x7c25ec(0x251)]['setSkillListWindow']=function(_0x54e7ae){const _0x52ac91=_0x7c25ec;this[_0x52ac91(0x267)]=_0x54e7ae,this[_0x52ac91(0x233)]();},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x233)]=function(){const _0x4f5eb2=_0x7c25ec;Window_StatusBase[_0x4f5eb2(0x251)][_0x4f5eb2(0x233)][_0x4f5eb2(0x250)](this),this['active']&&this[_0x4f5eb2(0x267)]&&this[_0x4f5eb2(0x267)]['setActor'](this['actor']());},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x2b8)]=function(){const _0x1907c4=_0x7c25ec;Window_StatusBase[_0x1907c4(0x251)][_0x1907c4(0x2b8)][_0x1907c4(0x250)](this);if(this['_helpWindow']&&this['actor']()){const _0x24299a=this[_0x1907c4(0x1a0)]();this['_helpWindow'][_0x1907c4(0x2b6)](_0x24299a);}},Window_SkillShopActorList[_0x7c25ec(0x251)][_0x7c25ec(0x1a0)]=function(){const _0x448374=_0x7c25ec,_0x42d5fe=Window_SkillShopActorList[_0x448374(0x1a3)][_0x448374(0x2f1)],_0x3e7bcf=this[_0x448374(0x2dc)]()['addedSkillTypes']()[_0x448374(0x1ee)]((_0x5957a1,_0x36f4d4,_0x3f8abc)=>_0x3f8abc['indexOf'](_0x5957a1)===_0x36f4d4);let _0x2eb92b=Window_SkillShopActorList['SETTINGS']['stypeJoin'];if(Window_SkillShopActorList['SETTINGS']['spaceJoin'])_0x2eb92b+='\x20';return skillTypesText=_0x3e7bcf[_0x448374(0x254)](_0x4fc15c=>$dataSystem[_0x448374(0x26f)][_0x4fc15c])[_0x448374(0x230)](undefined)[_0x448374(0x230)](null)['join'](_0x2eb92b),_0x42d5fe[_0x448374(0x1c1)](this[_0x448374(0x2dc)]()[_0x448374(0x28d)](),this[_0x448374(0x2dc)]()['level'],this[_0x448374(0x2dc)]()[_0x448374(0x20d)]()[_0x448374(0x28d)],skillTypesText||'');};function Window_SkillShopSkillList(){const _0x1b9a7c=_0x7c25ec;this[_0x1b9a7c(0x286)](...arguments);}Window_SkillShopSkillList['prototype']=Object['create'](Window_Selectable[_0x7c25ec(0x251)]),Window_SkillShopSkillList[_0x7c25ec(0x251)]['constructor']=Window_SkillShopSkillList,Window_SkillShopSkillList['SETTINGS']={'bgType':VisuMZ[_0x7c25ec(0x285)]['Settings']['Window'][_0x7c25ec(0x23b)]??0x0,'errors':{'alreadyLearned':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab'][_0x7c25ec(0x1b2)]??'Learned','noStypeAccess':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab']['noStypeAccess']??_0x7c25ec(0x1b0),'wrongClass':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x283)]??_0x7c25ec(0x257),'forClass':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab'][_0x7c25ec(0x1f1)]??_0x7c25ec(0x238),'levelRequirement':VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x1bb)]['Vocab']['levelRequirement']??'Needs\x20Lv\x20%1','skillLearnRequirement':VisuMZ['SkillShop'][_0x7c25ec(0x1bb)][_0x7c25ec(0x229)][_0x7c25ec(0x202)]??_0x7c25ec(0x219)}},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x286)]=function(_0x2339f8,_0x1159ee){const _0xcc2732=_0x7c25ec;this[_0xcc2732(0x24c)]=_0x1159ee,Window_Selectable[_0xcc2732(0x251)][_0xcc2732(0x286)][_0xcc2732(0x250)](this,_0x2339f8),this['_actor']=null;},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x2ea)]=function(_0x30c70b){const _0x1fb40f=_0x7c25ec;this[_0x1fb40f(0x1d2)]!==_0x30c70b&&(this[_0x1fb40f(0x1d2)]=_0x30c70b,this[_0x1fb40f(0x1f8)]());},Window_SkillShopSkillList[_0x7c25ec(0x251)]['actor']=function(){const _0x2d160a=_0x7c25ec;return this[_0x2d160a(0x1d2)]||null;},Window_SkillShopSkillList['prototype'][_0x7c25ec(0x2ba)]=function(){return 0x1;},Window_SkillShopSkillList['prototype'][_0x7c25ec(0x225)]=function(){const _0x29c064=_0x7c25ec;return this[_0x29c064(0x1e2)]?this['_data']['length']:0x1;},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x19e)]=function(){const _0x3fea4e=_0x7c25ec;return this[_0x3fea4e(0x237)](this['index']());},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x237)]=function(_0x535ae2){const _0x438ccf=_0x7c25ec;return this[_0x438ccf(0x1e2)]&&_0x535ae2>=0x0?this['_data'][_0x535ae2]:null;},Window_SkillShopSkillList['prototype']['isCurrentItemEnabled']=function(){const _0x39179d=_0x7c25ec;return this[_0x39179d(0x1f7)](this[_0x39179d(0x19e)]());},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x2ad)]=function(_0xbdcfb0){const _0x3fc5a8=_0x7c25ec;this['_data']=_0xbdcfb0,this[_0x3fc5a8(0x1f8)]();},Window_SkillShopSkillList['prototype'][_0x7c25ec(0x1a8)]=function(){const _0x20a877=_0x7c25ec,_0x2911b3=this[_0x20a877(0x21b)]();this[_0x20a877(0x289)](_0x2911b3>=0x0?_0x2911b3:0x0);},Window_SkillShopSkillList['prototype'][_0x7c25ec(0x19b)]=function(_0x45a051){const _0x4fef21=_0x7c25ec,_0x1f9082=this['itemAt'](_0x45a051);if(!_0x1f9082)return;const _0x2d6943=this['itemLineRect'](_0x45a051);this[_0x4fef21(0x1a7)](),this[_0x4fef21(0x2b1)](this[_0x4fef21(0x1f7)](_0x1f9082)),this[_0x4fef21(0x1fd)](_0x1f9082,_0x2d6943['x'],_0x2d6943['y'],_0x2d6943[_0x4fef21(0x1ed)]),this['drawSkillCost'](_0x1f9082,_0x2d6943);},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x1f7)]=function(_0x219cc9){const _0x2a0d38=_0x7c25ec;if(!_0x219cc9)return![];if(this[_0x2a0d38(0x2dc)]()&&!this['actor']()['canSkillShopLearn'](_0x219cc9))return![];if(Imported[_0x2a0d38(0x276)]){if(!VisuMZ[_0x2a0d38(0x21d)]['CheckMeetBuyRequirements'](_0x219cc9))return![];}return $gameParty[_0x2a0d38(0x240)]()>=DataManager['skillShopCost'](_0x219cc9);},Window_SkillShopSkillList[_0x7c25ec(0x251)]['drawSkillCost']=function(_0x4e36cc,_0x103874){const _0x2314e7=_0x7c25ec,_0x4df64b=_0x103874['x'],_0x5814e4=_0x103874['y'],_0x33b338=_0x103874[_0x2314e7(0x1ed)];if(this[_0x2314e7(0x2dc)]()&&!this[_0x2314e7(0x2dc)]()[_0x2314e7(0x23d)](_0x4e36cc))this['drawCannotLearnReason'](_0x4e36cc,_0x4df64b,_0x5814e4,_0x33b338);else{if(Imported['VisuMZ_2_MoreCurrencies'])this['drawItemMoreCurrencies'](_0x4e36cc,_0x103874,![],0x1);else{const _0x2b8700=Math[_0x2314e7(0x1bc)](DataManager[_0x2314e7(0x19d)](_0x4e36cc)*(0x1-this[_0x2314e7(0x24c)]));this[_0x2314e7(0x2d8)](_0x2b8700,TextManager['currencyUnit'],_0x4df64b,_0x5814e4,_0x33b338);}}},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x268)]=function(_0x4e3fdc,_0x4eba4a,_0xde528b,_0x31efae){const _0x369d05=_0x7c25ec;this['resetFontSettings']();const _0x111e35=Window_SkillShopSkillList[_0x369d05(0x1a3)][_0x369d05(0x22b)];let _0x1ed885='';if(this[_0x369d05(0x2dc)]()['isLearnedSkill'](_0x4e3fdc['id']))_0x1ed885=_0x111e35[_0x369d05(0x1b2)];else{if(!VisuMZ[_0x369d05(0x285)]['CheckSkillTypeAccess'](this[_0x369d05(0x2dc)](),_0x4e3fdc))_0x1ed885=_0x111e35[_0x369d05(0x1b9)][_0x369d05(0x1c1)]($dataSystem[_0x369d05(0x26f)][_0x4e3fdc['stypeId']]);else{if(!VisuMZ['SkillShop'][_0x369d05(0x1fc)](this[_0x369d05(0x2dc)](),_0x4e3fdc)){const _0x1efa5b=DataManager[_0x369d05(0x2ae)](_0x4e3fdc);_0x1efa5b[_0x369d05(0x1a2)]>0x1?_0x1ed885=_0x111e35[_0x369d05(0x283)]['format']($dataClasses[this[_0x369d05(0x2dc)]()[_0x369d05(0x20d)]()['id']][_0x369d05(0x28d)]):_0x1ed885=_0x111e35['forClass']['format']($dataClasses[_0x1efa5b[0x0]]['name']);}else{if(DataManager[_0x369d05(0x1a9)](_0x4e3fdc)>this[_0x369d05(0x2dc)]()[_0x369d05(0x1fb)])_0x1ed885=_0x111e35['levelRequirement']['format'](DataManager[_0x369d05(0x1a9)](_0x4e3fdc));else{if(!VisuMZ[_0x369d05(0x285)][_0x369d05(0x2e6)](this['actor'](),_0x4e3fdc)){const _0x59854f=DataManager['skillShopSkillLearnRequirements'](_0x4e3fdc)['filter'](_0x220ec8=>!this[_0x369d05(0x2dc)]()[_0x369d05(0x1ca)](_0x220ec8)),_0x3923e5=$dataSkills[_0x59854f[0x0]],_0x40dd6d=_0x369d05(0x270)[_0x369d05(0x1c1)](_0x3923e5[_0x369d05(0x22f)]),_0x33189c=_0x3923e5[_0x369d05(0x28d)];_0x1ed885=_0x111e35[_0x369d05(0x202)][_0x369d05(0x1c1)](_0x33189c,_0x40dd6d);}else{if(!VisuMZ['SkillShop']['CheckSkillSwitchRequirement'](_0x4e3fdc)){const _0x27f0fd=DataManager[_0x369d05(0x201)](_0x4e3fdc);_0x1ed885=$dataSystem[_0x369d05(0x2da)][_0x27f0fd[0x0]];}else _0x1ed885=_0x369d05(0x1fe);}}}}}const _0x166205=this['textSizeEx'](_0x1ed885)['width'];this[_0x369d05(0x24e)](_0x1ed885,_0x4eba4a+_0x31efae-_0x166205,_0xde528b,_0x31efae);},Window_SkillShopSkillList[_0x7c25ec(0x251)]['updateHelp']=function(){const _0x23a666=_0x7c25ec;this[_0x23a666(0x2a7)](this['item']());},Window_SkillShopSkillList[_0x7c25ec(0x251)][_0x7c25ec(0x275)]=function(){const _0x4ee554=_0x7c25ec;SoundManager[_0x4ee554(0x2af)](),SoundManager[_0x4ee554(0x25a)]();},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x2a1)]=Scene_Boot[_0x7c25ec(0x251)]['process_VisuMZ_MoreCurrencies_Notetags'],Scene_Boot['prototype']['process_VisuMZ_MoreCurrencies_Notetags']=function(){const _0x3e0f50=_0x7c25ec;VisuMZ['SkillShop'][_0x3e0f50(0x2a1)][_0x3e0f50(0x250)](this);if(VisuMZ[_0x3e0f50(0x21d)]['version']<1.03){let _0x5db56f='';_0x5db56f+=_0x3e0f50(0x265),_0x5db56f+='in\x20order\x20for\x20VisuMZ_4_SkillShop\x20to\x20work.',alert(_0x5db56f),SceneManager[_0x3e0f50(0x271)]();}if(VisuMZ[_0x3e0f50(0x27f)])return;const _0x4f6bdc=[$dataSkills];for(const _0x50bb83 of _0x4f6bdc){for(const _0x2fe25b of _0x50bb83){if(!_0x2fe25b)continue;VisuMZ[_0x3e0f50(0x21d)][_0x3e0f50(0x2aa)](_0x2fe25b);}}},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x19f)]=VisuMZ[_0x7c25ec(0x19f)],VisuMZ[_0x7c25ec(0x19f)]=function(_0x5b8f1f){const _0x323865=_0x7c25ec;VisuMZ[_0x323865(0x285)][_0x323865(0x19f)]['call'](this,_0x5b8f1f),VisuMZ[_0x323865(0x21d)]&&VisuMZ[_0x323865(0x21d)][_0x323865(0x2aa)](_0x5b8f1f);},VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x21e)]=DataManager[_0x7c25ec(0x290)],DataManager[_0x7c25ec(0x290)]=function(){const _0x4e8ff3=_0x7c25ec;VisuMZ[_0x4e8ff3(0x285)][_0x4e8ff3(0x21e)][_0x4e8ff3(0x250)](this),this[_0x4e8ff3(0x220)][_0x4e8ff3(0x20c)]={};},VisuMZ['SkillShop'][_0x7c25ec(0x23f)]=DataManager[_0x7c25ec(0x1e8)],DataManager[_0x7c25ec(0x1e8)]=function(_0x4aed98){const _0x50b6aa=_0x7c25ec;if(DataManager['isSkill'](_0x4aed98))return this[_0x50b6aa(0x220)][_0x50b6aa(0x20c)];return VisuMZ[_0x50b6aa(0x285)]['DataManager_getMoreCurrenciesObjLibrary']['call'](this,_0x4aed98);};VisuMZ[_0x7c25ec(0x21d)]&&(VisuMZ[_0x7c25ec(0x21d)][_0x7c25ec(0x221)]=VisuMZ['MoreCurrencies']['CreateSubGoldCostText'],VisuMZ['MoreCurrencies']['CreateSubGoldCostText']=function(_0x171f0d,_0x5ee459,_0x5dd11f,_0x3f1101){const _0x29fde2=_0x7c25ec;return SceneManager['isSceneSkillShop']()?VisuMZ[_0x29fde2(0x285)][_0x29fde2(0x205)](_0x171f0d,_0x5ee459,_0x5dd11f,_0x3f1101):VisuMZ[_0x29fde2(0x21d)][_0x29fde2(0x221)]['call'](this,_0x171f0d,_0x5ee459,_0x5dd11f,_0x3f1101);});VisuMZ[_0x7c25ec(0x285)][_0x7c25ec(0x205)]=function(_0x9b249f,_0x416ccd,_0x48b37f,_0x37819e){const _0x5df326=_0x7c25ec,_0x41665a=SceneManager[_0x5df326(0x227)][_0x5df326(0x267)],_0x213e2f=DataManager[_0x5df326(0x19d)](_0x9b249f),_0x41c28e=Math[_0x5df326(0x26d)](_0x213e2f*_0x37819e);if(_0x41c28e===0x0)return'';if(Imported[_0x5df326(0x2e8)]&&_0x41665a){const _0x348d3d=_0x41665a[_0x5df326(0x1af)](),_0x5c1747=_0x41665a[_0x5df326(0x1f0)]();return VisuMZ[_0x5df326(0x2d7)][_0x5df326(0x22c)](_0x41c28e,_0x348d3d,_0x5c1747);}else return VisuMZ[_0x5df326(0x21d)]['CreateGoldCostText'](_0x41c28e);};