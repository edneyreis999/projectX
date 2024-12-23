//=============================================================================
// VisuStella MZ - More Shop Currencies
// VisuMZ_2_MoreCurrencies.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MoreCurrencies = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MoreCurrencies = VisuMZ.MoreCurrencies || {};
VisuMZ.MoreCurrencies.version = 1.04;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.04] [MoreCurrencies]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/More_Currencies_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin expands the shop scene's functionality by allowing the game dev
 * to create items that can be sold for items and/or variables instead of gold.
 * Or you know what? Throw gold in there, too. Any combination of the them! By
 * doing so, gold no longer becomes the default currency for every shop, as
 * some special shops may require a different type of trade.
 *
 * Features include all (but not limited to) the following:
 *
 * * Items can be bought using items, weapons, armors, variables, gold, or any
 *   of the combinations listed.
 * * Sell items this way, too!
 * * Sold item listing window will now show the amount the player can get back
 *   per unit sold.
 * * Shop scene's calculation window is now updated to show the transaction
 *   details from how much the player owns to how much will be spent to what
 *   kind of result there will be.
 * * Proxy system support allows for shops to sell the same items but using
 *   different types of currencies.
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
 * * VisuMZ_1_ItemsEquipsCore
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
 * Window_ShopNumber
 *
 * The visual contents of this window have been completely overhauled to show
 * the details of what transactions are happening. This includes how much or
 * many of a resource the player owns, how much will be involved in the actual
 * transaction, and the net outcome after the transaction has taken place.
 *
 * Naturally, this means that things will have to shift around in order for the
 * space to make any sense.
 *
 * ---
 *
 * Proxy Items
 *
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through shopping, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the trading list. This allows you to effectively have multiple ways to
 * trade the same item using different item combinations.
 *
 * For more details, look inside of the Notetags section for Proxy items.
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
 * === Cost-Related Notetags ===
 *
 * ---
 *
 * <Item id Buy Cost: x>
 * <Item name Buy Cost: x>
 *
 * <Item id Sell Cost: x>
 * <Item name Sell Cost: x>
 *
 * <Item id Cost: x>
 * <Item name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the item and quantity needed to purchase this
 *   object in the shop.
 * - The "sell" variant determines the item and quantity acquired when selling
 *   this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the item and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the item to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the item to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the item that will be taken (when bought)
 *   or acquired (when sold).
 * - Insert multiple copies of these notetags to add more item costs.
 *
 * ---
 *
 * <Weapon id Buy Cost: x>
 * <Weapon name Buy Cost: x>
 *
 * <Weapon id Sell Cost: x>
 * <Weapon name Sell Cost: x>
 *
 * <Weapon id Cost: x>
 * <Weapon name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the weapon and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the weapon and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the weapon and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the weapon to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the weapon to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the weapon that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more weapon costs.
 *
 * ---
 *
 * <Armor id Buy Cost: x>
 * <Armor name Buy Cost: x>
 *
 * <Armor id Sell Cost: x>
 * <Armor name Sell Cost: x>
 *
 * <Armor id Cost: x>
 * <Armor name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the armor and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the armor and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the armor and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the armor to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the armor to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the armor that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more armor costs.
 *
 * ---
 *
 * <Variable id Buy Cost: x>
 *
 * <Variable id Sell Cost: x>
 *
 * <Variable id Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the variable and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the variable and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the variable and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the variable to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the variable to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the variable that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more variable costs.
 *
 * ---
 *
 * === Proxy Notetags ===
 *
 * ---
 *
 * <Proxy: id>
 * <Proxy: name>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create trades with different components using the above notetag
 *   contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When bought, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * - Insert multiple copies of these notetags to add more variables costs.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Default settings for More Currencies.
 *
 * ---
 *
 * General
 *
 *   Automatic Sell Rate:
 *   - When using the plain "Cost" notetags, use this sell rate.
 *
 * ---
 *
 * Vocabulary
 *
 *   Owned:
 *   - Text used for how much of an item is owned.
 *
 *   Shift:
 *   - Text used for the change in value.
 *
 *   Net:
 *   - Text used for the net result.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Listing Settings
 * ============================================================================
 *
 * Settings for the currency listings.
 *
 * ---
 *
 * Listing
 *
 *   Listing Order:
 *   - Determines the order the trade components are listed.
 *
 *   Show Sell Window:
 *   - Show listed items in the sell window?
 *
 *   List Font Size:
 *   - Font size used for listed items.
 *
 *   List Padding:
 *   - Pixel padding between listed items.
 *
 * ---
 *
 * Text Format
 *
 *   Item Format:
 *   Weapon Format:
 *   Armor Format:
 *   Variable Format:
 *   - Text format used for listed items.
 *   - %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
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
 * Version 1.04: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where sold item costs didn't get returned. Fixed by Arisu.
 *
 * Version 1.03: November 16, 2023
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.02: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a crash when exiting certain menus from external sources into the
 *    shop scene. Fix made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.01: February 17, 2022
 * * Bug Fixes!
 * ** Item, Weapon, Armor Cost Notetags should no work properly. Fix by Irina.
 * * Documentation Update!
 * ** Added documentation for the following notetags:
 * *** <Variable id Buy Cost: x>
 * *** <Variable id Sell Cost: x>
 * *** <Variable id Cost: x>
 *
 * Version 1.00 Official Release Date: March 7, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MoreCurrencies
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
 * @desc Default settings for More Currencies.
 * @default {"General":"","AutoSellRate:num":"0.50","Vocab":"","NumWindowOwned:str":"Owned","NumWindowShift:str":"Change","NumWindowNet:str":"Net"}
 *
 * @param Listing:struct
 * @text Listing Settings
 * @type struct<Listing>
 * @desc Settings for the currency listings.
 * @default {"Listing":"","ListOrder:arraystr":"[\"item\",\"weapon\",\"armor\",\"variable\",\"gold\"]","ShowSell:eval":"true","BuyFontSize:num":"22","BuyPadding:num":"16","Format":"","ItemBuyFmt:str":"%1%3","WeaponBuyFmt:str":"%1%3","ArmorsBuyFmt:str":"%1%3","VariableBuyFmt:str":"%1%4"}
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
 * @param General
 *
 * @param AutoSellRate:num
 * @text Automatic Sell Rate
 * @parent General
 * @desc When using the plain "Cost" notetags, use this sell rate.
 * @default 0.50
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 */
/* ----------------------------------------------------------------------------
 * Listing Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Listing:
 *
 * @param Listing
 *
 * @param ListOrder:arraystr
 * @text Listing Order
 * @parent Listing
 * @type select[]
 * @option item
 * @option weapon
 * @option armor
 * @option variable
 * @option gold
 * @desc Determines the order the trade components are listed.
 * @default ["item","weapon","armor","variable","gold"]
 *
 * @param ShowSell:eval
 * @text Show Sell Window
 * @parent Listing
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show listed items in the sell window?
 * @default true
 *
 * @param BuyFontSize:num
 * @text List Font Size
 * @parent Listing
 * @type number
 * @min 1
 * @desc Font size used for listed items.
 * @default 22
 *
 * @param BuyPadding:num
 * @text List Padding
 * @parent Listing
 * @type number
 * @min 1
 * @desc Pixel padding between listed items.
 * @default 16
 *
 * @param Format
 * @text Text Format
 *
 * @param ItemBuyFmt:str
 * @text Item Format
 * @parent Format
 * @desc Text format used for listed items.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param WeaponBuyFmt:str
 * @text Weapon Format
 * @parent Format
 * @desc Text format used for listed weapons.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param ArmorsBuyFmt:str
 * @text Armors Format
 * @parent Format
 * @desc Text format used for listed armors.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param VariableBuyFmt:str
 * @text Variable Format
 * @parent Format
 * @desc Text format used for listed variables.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%4
 *
 */
//=============================================================================

function _0x3794(_0x51051a, _0x4292e1) {
  const _0x13c618 = _0x13c6();
  return (
    (_0x3794 = function (_0x3794fa, _0x4d2e0e) {
      _0x3794fa = _0x3794fa - 0xdc;
      let _0x11365a = _0x13c618[_0x3794fa];
      return _0x11365a;
    }),
    _0x3794(_0x51051a, _0x4292e1)
  );
}
const _0x5c104d = _0x3794;
(function (_0xe112fc, _0x3d5b9f) {
  const _0x19c40a = _0x3794,
    _0x30259d = _0xe112fc();
  while (!![]) {
    try {
      const _0x4848be =
        (-parseInt(_0x19c40a(0x1d9)) / 0x1) * (parseInt(_0x19c40a(0x12f)) / 0x2) +
        (-parseInt(_0x19c40a(0x1be)) / 0x3) * (-parseInt(_0x19c40a(0xe4)) / 0x4) +
        -parseInt(_0x19c40a(0x1ab)) / 0x5 +
        (parseInt(_0x19c40a(0x143)) / 0x6) * (parseInt(_0x19c40a(0xfc)) / 0x7) +
        -parseInt(_0x19c40a(0x173)) / 0x8 +
        (parseInt(_0x19c40a(0x155)) / 0x9) * (parseInt(_0x19c40a(0x164)) / 0xa) +
        parseInt(_0x19c40a(0x1d8)) / 0xb;
      if (_0x4848be === _0x3d5b9f) break;
      else _0x30259d['push'](_0x30259d['shift']());
    } catch (_0x1ab5a1) {
      _0x30259d['push'](_0x30259d['shift']());
    }
  }
})(_0x13c6, 0xce298);
function _0x13c6() {
  const _0xd8e36f = [
    'drawIcon',
    'SubCost',
    '21WShOLI',
    'BuyFontSize',
    '_item',
    'replace',
    'ARRAYNUM',
    'Settings',
    'drawMoreCurrenciesItem',
    '_scene',
    'charAt',
    'push',
    'WeaponBuyFmt',
    'ParseNotetagCosts',
    'contents',
    'isArmor',
    'TKKVY',
    'net',
    'mjqAr',
    'MORE_CURRENCIES_ORDER',
    'totalPriceY',
    'drawText',
    'Scene_Boot_onDatabaseLoaded',
    'drawItemMoreCurrencies',
    'drawCurrencyValue',
    'shift',
    'ItemBuyFmt',
    'CreateGoldCostText',
    'exit',
    'fontSize',
    '\x20+\x20',
    'buyVariableCosts',
    'Scene_Shop_doSell',
    'CreateSubVariableCostTexts',
    'filter',
    'Zapky',
    'CheckMeetBuyRequirements',
    'Change',
    'sellArmorCosts',
    'ITEM',
    '%1%2%3',
    'owned',
    'slice',
    'prototype',
    'hjoXX',
    'MakeShopNumberIngredients',
    'NumWindowShift',
    'itemRect',
    'drawItemName',
    'gainItem',
    'ParseWeaponNotetags',
    'WMHWn',
    'return\x200',
    '479692hfpXNy',
    'buy',
    'isSceneShop',
    'ConvertParams',
    'ARRAYFUNC',
    'iconIndex',
    'sellItemCosts',
    'drawItemCost',
    'constructor',
    '_numberWindow',
    'SubBuyCost',
    'ghDft',
    'process_VisuMZ_MoreCurrencies',
    'drawTextEx',
    'drawSellPrice',
    'textWidth',
    'ItemsEquipsCore',
    'toLowerCase',
    'status',
    'textSizeEx',
    '462828hzjqze',
    'BoNAs',
    'JIoHI',
    'item',
    'NumWindowOwned',
    'AutoSellRate',
    'FUNC',
    'innerWidth',
    'getWeaponIdWithName',
    'currentSymbol',
    'ChangeQuantityForObj',
    'visualGoldDisplayAutosize',
    'KmnwO',
    'ArmorsBuyFmt',
    'drawMultiplicationSign',
    'armor',
    'VARIABLE',
    'xqMgK',
    '79668YwAjpT',
    'STRUCT',
    'SubSellCost',
    '\x20%1',
    'GetShopNumberIngredientType',
    'MORE_CURRENCIES_PADDING',
    'buyItemCosts',
    'sWgHY',
    'Owned',
    'center',
    'VisuMZ_1_ItemsEquipsCore',
    '%1%2Costs',
    'koDlj',
    'CreateVisualGoldText',
    '_armorIDs',
    '460IUqpib',
    'VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',
    'GroupDigits',
    'OxIWQ',
    '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.',
    'sellVariableCosts',
    'HuLVB',
    'ARRAYSTR',
    'CreateSubGoldCostText',
    '_buyWindow',
    'VariableBuyFmt',
    'ARMOR',
    'call',
    'round',
    'getArmorIdWithName',
    '1085056gCkfhh',
    'reverse',
    'showMoreCurrenciesSellValue',
    'ARRAYEVAL',
    'maxItems',
    'armors',
    'EMsgY',
    'MoreCurrencies',
    'format',
    'buttonY',
    'Window_ItemList_drawItemNumber',
    'General',
    'drawMoreCurrenciesVariable',
    '_number',
    'itemNameY',
    'MoreCurrenciesFontSize',
    'drawTotalPrice',
    '_itemIDs',
    '_commandWindow',
    'MoreCurrenciesNumberWindow',
    'prepareMoreCurrenciesObj',
    'drawMoreCurrenciesPriceData',
    'Net',
    'ItemQuantityFmt',
    'onDatabaseLoaded',
    'Scene_Shop_doBuy',
    'ceil',
    'ParseNotetagSubCosts',
    'visualGoldDisplayPadding',
    'lineHeight',
    'note',
    'ListOrder',
    'JSON',
    'iconHeight',
    'ParseArmorNotetags',
    'isItem',
    'includes',
    'CreateSubCostText',
    'GetShopNumberIngredientItems',
    'left',
    'Window_ShopBuy_isEnabled',
    'visualGoldDisplayNoCost',
    'doBuy',
    'ATbNW',
    'name',
    'isEnabled',
    'parse',
    'systemColor',
    'sell',
    'Scene_Shop_maxBuy',
    'isWeapon',
    'weapons',
    'variables',
    'ParseNotetagLineSubCosts',
    'trim',
    'drawItemNumber',
    '1222820YLLMVb',
    'min',
    'changeTextColor',
    'MORE_CURRENCIES_SHOW_SELL_VALUE',
    'buyArmorCosts',
    'drawCategories',
    '\x5cFS[%1]',
    'weapon',
    'match',
    'CoreEngine',
    'doSell',
    'MoreCurrenciesFmt',
    'Listing',
    'VisuMZ_0_CoreEngine',
    'drawCurrentItemName',
    'tTtgg',
    'drawMoreCurrenciesGold',
    'right',
    'in\x20order\x20for\x20VisuMZ_3_OneTimePurchase\x20to\x20work.',
    '69LsJcJc',
    '\x5cI[%1]',
    'maxGold',
    'VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT',
    'EVAL',
    'GetShopNumberIngredientVariables',
    'items',
    'GoldIcon',
    'process_VisuMZ_MoreCurrencies_Notetags',
    'MORE_CURRENCIES_DEFAULT_SELL_RATE',
    'width',
    'ParseItemNotetags',
    'description',
    'getItemIdWithName',
    '_moreCurrencyCosts',
    'mpYQt',
    'currencyUnit',
    '_sellWindow',
    'useDigitGrouping',
    'GetMaxBuysForObj',
    'rHYLP',
    'jrGqH',
    'RegExp',
    'gold',
    'Gold',
    'toUpperCase',
    '7597249WnzvLs',
    '1zyumJT',
    'VisuMZ_3_VisualGoldDisplay',
    'setValue',
    'ARRAYSTRUCT',
    'resetFontSettings',
    'NumWindowNet',
    'CreateSubItemCostTexts',
    'ShowSell',
    'numItems',
    'version',
    'buyWeaponCosts',
    'sellPriceOfItem',
    'sellWeaponCosts',
    'ItemQuantityFontSize',
    'drawNumber',
    '23516QsuSLP',
    '_price',
    'VisualGoldDisplay',
    'length',
    '_bypassProxy',
    'FzTGw',
    'geKDZ',
    'map',
    'cursorWidth',
    '\x20=\x20',
    'itemPadding',
    'floor',
    'iconWidth',
    'FraoI',
    'concat',
    'max',
    'value',
    '_weaponIDs',
    'BuyPadding',
    'VISUAL_GOLD_DISPLAY_NO_COST_ENABLE',
    'variable',
    'getMoreCurrenciesObjLibrary',
  ];
  _0x13c6 = function () {
    return _0xd8e36f;
  };
  return _0x13c6();
}
var label = 'MoreCurrencies',
  tier = tier || 0x0,
  dependencies = [_0x5c104d(0x1b8), _0x5c104d(0x15f)],
  pluginData = $plugins[_0x5c104d(0x11c)](function (_0x9977c6) {
    const _0x55a25f = _0x5c104d;
    return _0x9977c6[_0x55a25f(0x141)] && _0x9977c6[_0x55a25f(0x1ca)][_0x55a25f(0x197)]('[' + label + ']');
  })[0x0];
(VisuMZ[label][_0x5c104d(0x101)] = VisuMZ[label][_0x5c104d(0x101)] || {}),
  (VisuMZ['ConvertParams'] = function (_0x47560b, _0x103dcb) {
    const _0xc78cfd = _0x5c104d;
    for (const _0x521f18 in _0x103dcb) {
      if (_0xc78cfd(0x10a) === _0xc78cfd(0x1d3)) {
        const _0x361210 = this[_0xc78cfd(0xee)]();
        let _0x3f59bd = _0x361210 * 0x2;
        const _0x976916 = this['innerWidth'] - _0x3f59bd - _0x361210 * 0x3,
          _0x31b7dd = _0x3f59bd + _0x28b3cb[_0xc78cfd(0x18d)](_0x976916 / 0x3),
          _0x4b6fb4 = _0x1734c5[_0xc78cfd(0xef)]((_0x976916 * 0x2) / 0x3 / 0x3),
          _0x5923a8 = _0x1d2d61[_0xc78cfd(0xf3)](this[_0xc78cfd(0x13e)]('\x20+\x20'), this['textWidth'](_0xc78cfd(0xed))),
          _0x4f9a0b = _0x18516e[0x0],
          _0x1030dc = _0x189bfd[0x1],
          _0x5113f5 = _0x1030dc * this[_0xc78cfd(0x180)],
          _0x19fbdc = _0x2c4d48['CoreEngine'][_0xc78cfd(0x101)][_0xc78cfd(0x1d6)][_0xc78cfd(0x1c5)];
        if (_0x19fbdc > 0x0) {
          const _0x6b4cb7 = _0x36b439 + (this[_0xc78cfd(0x190)]() - _0x297a50[_0xc78cfd(0x194)]) / 0x2;
          this[_0xc78cfd(0xfa)](_0x19fbdc, _0x3f59bd, _0x6b4cb7);
          const _0x5ba739 = _0x2bc310[_0xc78cfd(0xf0)] + 0x4;
          _0x3f59bd += _0x5ba739;
        }
        this[_0xc78cfd(0x1ad)](_0x29faef[_0xc78cfd(0x1a2)]()), this['drawText'](_0x38bcba[_0xc78cfd(0x1ce)], _0x3f59bd, _0x1ec558, _0x4b6fb4, _0xc78cfd(0x19a));
        const _0xe37d11 = _0x19fe42[_0xc78cfd(0x1d5)]();
        this['drawCurrencyValue'](_0xe37d11, _0x1482e8[_0xc78cfd(0x1ce)], _0x31b7dd, _0x3af314, _0x4b6fb4);
        const _0x22bf1d = _0x31b7dd + _0x4b6fb4 * 0x1 + _0x5923a8,
          _0x45f677 = _0x4b6fb4 - _0x5923a8;
        this[_0xc78cfd(0x112)](_0x5113f5, _0x166020['currencyUnit'], _0x22bf1d, _0x530f65, _0x45f677);
        const _0x160f2f = _0x31b7dd + _0x4b6fb4 * 0x2 + _0x5923a8,
          _0x3ef630 = _0x4b6fb4 - _0x5923a8,
          _0x381dcc = _0x4f223a[_0xc78cfd(0x1ac)](_0xe37d11 + _0x5113f5 * (_0x1280c3 ? -0x1 : 0x1), _0x4d23d3['maxGold']());
        this[_0xc78cfd(0x112)](_0x381dcc, _0x3d49b7['currencyUnit'], _0x160f2f, _0x2a24e3, _0x3ef630);
      } else {
        if (_0x521f18[_0xc78cfd(0x1b3)](/(.*):(.*)/i)) {
          const _0x1de141 = String(RegExp['$1']),
            _0xbe2a14 = String(RegExp['$2'])[_0xc78cfd(0x1d7)]()['trim']();
          let _0x534ff0, _0x36f3e0, _0x26d13f;
          switch (_0xbe2a14) {
            case 'NUM':
              _0x534ff0 = _0x103dcb[_0x521f18] !== '' ? Number(_0x103dcb[_0x521f18]) : 0x0;
              break;
            case _0xc78cfd(0x100):
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : []), (_0x534ff0 = _0x36f3e0[_0xc78cfd(0xeb)](_0x106650 => Number(_0x106650)));
              break;
            case _0xc78cfd(0x1c2):
              _0x534ff0 = _0x103dcb[_0x521f18] !== '' ? eval(_0x103dcb[_0x521f18]) : null;
              break;
            case _0xc78cfd(0x176):
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : []), (_0x534ff0 = _0x36f3e0[_0xc78cfd(0xeb)](_0x48a385 => eval(_0x48a385)));
              break;
            case _0xc78cfd(0x193):
              _0x534ff0 = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : '';
              break;
            case 'ARRAYJSON':
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON[_0xc78cfd(0x1a1)](_0x103dcb[_0x521f18]) : []), (_0x534ff0 = _0x36f3e0[_0xc78cfd(0xeb)](_0x9d03eb => JSON[_0xc78cfd(0x1a1)](_0x9d03eb)));
              break;
            case _0xc78cfd(0x149):
              _0x534ff0 = _0x103dcb[_0x521f18] !== '' ? new Function(JSON[_0xc78cfd(0x1a1)](_0x103dcb[_0x521f18])) : new Function(_0xc78cfd(0x12e));
              break;
            case _0xc78cfd(0x133):
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : []),
                (_0x534ff0 = _0x36f3e0[_0xc78cfd(0xeb)](_0x30218f => new Function(JSON[_0xc78cfd(0x1a1)](_0x30218f))));
              break;
            case 'STR':
              _0x534ff0 = _0x103dcb[_0x521f18] !== '' ? String(_0x103dcb[_0x521f18]) : '';
              break;
            case _0xc78cfd(0x16b):
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON[_0xc78cfd(0x1a1)](_0x103dcb[_0x521f18]) : []), (_0x534ff0 = _0x36f3e0['map'](_0x557537 => String(_0x557537)));
              break;
            case _0xc78cfd(0x156):
              (_0x26d13f = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : {}), (_0x534ff0 = VisuMZ[_0xc78cfd(0x132)]({}, _0x26d13f));
              break;
            case _0xc78cfd(0x1dc):
              (_0x36f3e0 = _0x103dcb[_0x521f18] !== '' ? JSON['parse'](_0x103dcb[_0x521f18]) : []),
                (_0x534ff0 = _0x36f3e0[_0xc78cfd(0xeb)](_0x27c1a8 => VisuMZ['ConvertParams']({}, JSON['parse'](_0x27c1a8))));
              break;
            default:
              continue;
          }
          _0x47560b[_0x1de141] = _0x534ff0;
        }
      }
    }
    return _0x47560b;
  }),
  (_0x54280a => {
    const _0x50ea51 = _0x5c104d,
      _0x36293b = _0x54280a[_0x50ea51(0x19f)];
    for (const _0x4b08dd of dependencies) {
      if ('OxIWQ' === _0x50ea51(0x167)) {
        if (!Imported[_0x4b08dd]) {
          alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x50ea51(0x17b)](_0x36293b, _0x4b08dd)),
            SceneManager[_0x50ea51(0x116)]();
          break;
        }
      } else this[_0x50ea51(0x18e)](_0x58dbc0, _0x54df7b[_0x1ba9aa['id']], _0x50ea51(0x139)), this[_0x50ea51(0x18e)](_0x5b569f, _0x183fbf[_0x18fe25['id']], _0x50ea51(0x157));
    }
    const _0x4cb47c = _0x54280a[_0x50ea51(0x1ca)];
    if (_0x4cb47c[_0x50ea51(0x1b3)](/\[Version[ ](.*?)\]/i)) {
      const _0x22e6a7 = Number(RegExp['$1']);
      _0x22e6a7 !== VisuMZ[label][_0x50ea51(0xde)] &&
        (_0x50ea51(0x179) !== _0x50ea51(0x179)
          ? this['drawSellPrice'](_0x4881c2, _0x31ec32, _0x7b9d43, _0x526c17)
          : (alert(_0x50ea51(0x168)[_0x50ea51(0x17b)](_0x36293b, _0x22e6a7)), SceneManager['exit']()));
    }
    if (_0x4cb47c[_0x50ea51(0x1b3)](/\[Tier[ ](\d+)\]/i)) {
      if (_0x50ea51(0x126) === _0x50ea51(0x126)) {
        const _0xa4a811 = Number(RegExp['$1']);
        if (_0xa4a811 < tier)
          alert(
            '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
              _0x50ea51(0x17b)
            ](_0x36293b, _0xa4a811, tier),
          ),
            SceneManager[_0x50ea51(0x116)]();
        else {
          if (_0x50ea51(0x12d) === _0x50ea51(0x11d)) return _0x2f1090['floor'](this[_0x50ea51(0x181)]() + this[_0x50ea51(0x190)]() * 0x2);
          else tier = Math['max'](_0xa4a811, tier);
        }
      } else
        for (const _0x21414b of _0x535d95) {
          this[_0x50ea51(0x1a8)](_0x21414b, _0x3ce556, _0x5b71c5);
        }
    }
    VisuMZ[_0x50ea51(0x132)](VisuMZ[label]['Settings'], _0x54280a['parameters']);
  })(pluginData);
if (VisuMZ[_0x5c104d(0x13f)][_0x5c104d(0xde)] < 1.37) {
  let text = '';
  (text += _0x5c104d(0x165)), (text += _0x5c104d(0x1bd)), alert(text), SceneManager[_0x5c104d(0x116)]();
}
(VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x1d4)] = {
  SubCost: /<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]COST:[ ](\d+)>/gi,
  SubBuyCost: /<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ](?:BUY|LEARN|RECRUIT) COST:[ ](\d+)>/gi,
  SubSellCost: /<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]SELL COST:[ ](\d+)>/gi,
}),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x110)] = Scene_Boot[_0x5c104d(0x125)][_0x5c104d(0x18b)]),
  (Scene_Boot[_0x5c104d(0x125)][_0x5c104d(0x18b)] = function () {
    const _0x559df8 = _0x5c104d;
    DataManager[_0x559df8(0x187)](), VisuMZ[_0x559df8(0x17a)][_0x559df8(0x110)][_0x559df8(0x170)](this), this[_0x559df8(0x13b)]();
  }),
  (Scene_Boot[_0x5c104d(0x125)][_0x5c104d(0x13b)] = function () {
    const _0xcdc0c3 = _0x5c104d;
    this[_0xcdc0c3(0x1c6)]();
  }),
  (Scene_Boot[_0x5c104d(0x125)][_0x5c104d(0x1c6)] = function () {
    const _0x44d956 = _0x5c104d;
    if (VisuMZ['ParseAllNotetags']) return;
    const _0x4d1a8a = [$dataItems, $dataWeapons, $dataArmors];
    for (const _0x49d5f0 of _0x4d1a8a) {
      for (const _0x1db331 of _0x49d5f0) {
        if (!_0x1db331) continue;
        VisuMZ[_0x44d956(0x17a)][_0x44d956(0x107)](_0x1db331);
      }
    }
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x1c9)] = VisuMZ[_0x5c104d(0x1c9)]),
  (VisuMZ[_0x5c104d(0x1c9)] = function (_0x41bf4d) {
    const _0x332992 = _0x5c104d;
    VisuMZ[_0x332992(0x17a)][_0x332992(0x1c9)][_0x332992(0x170)](this, _0x41bf4d), VisuMZ[_0x332992(0x17a)][_0x332992(0x107)](_0x41bf4d);
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x12c)] = VisuMZ['ParseWeaponNotetags']),
  (VisuMZ['ParseWeaponNotetags'] = function (_0x410515) {
    const _0x42b5c6 = _0x5c104d;
    VisuMZ['MoreCurrencies']['ParseWeaponNotetags'][_0x42b5c6(0x170)](this, _0x410515), VisuMZ['MoreCurrencies'][_0x42b5c6(0x107)](_0x410515);
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x195)] = VisuMZ['ParseArmorNotetags']),
  (VisuMZ[_0x5c104d(0x195)] = function (_0x1a7086) {
    const _0x4a7631 = _0x5c104d;
    VisuMZ[_0x4a7631(0x17a)][_0x4a7631(0x195)][_0x4a7631(0x170)](this, _0x1a7086), VisuMZ[_0x4a7631(0x17a)][_0x4a7631(0x107)](_0x1a7086);
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x107)] = function (_0xa5f878) {
    const _0x26872a = _0x5c104d;
    if (!_0xa5f878) return;
    const _0x267aba = VisuMZ[_0x26872a(0x17a)][_0x26872a(0x1d4)],
      _0x232a3a = _0xa5f878[_0x26872a(0x191)];
    if (!_0x232a3a[_0x26872a(0x1b3)](_0x267aba[_0x26872a(0xfb)]) && !_0x232a3a['match'](_0x267aba[_0x26872a(0x139)]) && !_0x232a3a[_0x26872a(0x1b3)](_0x267aba[_0x26872a(0x157)])) return;
    const _0x2d752a = DataManager[_0x26872a(0xf9)](_0xa5f878);
    (_0x2d752a[_0xa5f878['id']] = _0x2d752a[_0xa5f878['id']] || {}),
      _0x232a3a[_0x26872a(0x1b3)](_0x267aba[_0x26872a(0x139)]) || _0x232a3a[_0x26872a(0x1b3)](_0x267aba[_0x26872a(0x157)])
        ? (this[_0x26872a(0x18e)](_0xa5f878, _0x2d752a[_0xa5f878['id']], _0x26872a(0x139)), this['ParseNotetagSubCosts'](_0xa5f878, _0x2d752a[_0xa5f878['id']], _0x26872a(0x157)))
        : _0x26872a(0x14f) === _0x26872a(0x14f)
          ? this[_0x26872a(0x18e)](_0xa5f878, _0x2d752a[_0xa5f878['id']], _0x26872a(0xfb))
          : ((_0x4a7e51['buyVariableCosts'] = _0xf16cc6[_0x26872a(0x119)] || {}), (_0x4f5990['buyVariableCosts'][_0x396e79] = _0xeafeba));
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x18e)] = function (_0x13c693, _0x241d12, _0x42ca38) {
    const _0x3296da = _0x5c104d,
      _0x258709 = VisuMZ[_0x3296da(0x17a)][_0x3296da(0x1d4)],
      _0x54bb17 = _0x13c693['note'],
      _0x1f2712 = _0x54bb17[_0x3296da(0x1b3)](_0x258709[_0x42ca38]);
    if (_0x1f2712)
      for (const _0x13a46c of _0x1f2712) {
        this[_0x3296da(0x1a8)](_0x13a46c, _0x241d12, _0x42ca38);
      }
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x1a8)] = function (_0x412aca, _0x48a074, _0x29d8ff) {
    const _0x2adec9 = _0x5c104d,
      _0x3b9e95 = VisuMZ['MoreCurrencies'][_0x2adec9(0x1d4)];
    _0x412aca['match'](_0x3b9e95[_0x29d8ff]);
    const _0x142fc4 = [_0x2adec9(0xfb), _0x2adec9(0x139)][_0x2adec9(0x197)](_0x29d8ff),
      _0x10a407 = ['SubCost', _0x2adec9(0x157)][_0x2adec9(0x197)](_0x29d8ff),
      _0x2301d0 = _0x29d8ff === _0x2adec9(0xfb),
      _0x90a162 = DataManager[_0x2adec9(0x1c7)],
      _0x260baa = String(RegExp['$1'])[_0x2adec9(0x1d7)]()[_0x2adec9(0x1a9)](),
      _0x556707 = String(RegExp['$2'])[_0x2adec9(0x1a9)](),
      _0x59914a = Number(RegExp['$3']) || 0x0,
      _0x38e786 = /^\d+$/['test'](_0x556707);
    if (_0x260baa === _0x2adec9(0x121)) {
      const _0x3b8f31 = _0x38e786 ? Number(_0x556707) : DataManager[_0x2adec9(0x1cb)](_0x556707);
      if (!_0x3b8f31) return;
      _0x142fc4 && ((_0x48a074[_0x2adec9(0x15b)] = _0x48a074[_0x2adec9(0x15b)] || {}), (_0x48a074[_0x2adec9(0x15b)][_0x3b8f31] = _0x59914a)),
        _0x10a407 && ((_0x48a074[_0x2adec9(0x135)] = _0x48a074[_0x2adec9(0x135)] || {}), (_0x48a074[_0x2adec9(0x135)][_0x3b8f31] = Math['floor'](_0x59914a * (_0x2301d0 ? _0x90a162 : 0x1))));
    } else {
      if (_0x260baa === 'WEAPON') {
        if ('geKDZ' === _0x2adec9(0xea)) {
          const _0x3db451 = _0x38e786 ? Number(_0x556707) : DataManager['getWeaponIdWithName'](_0x556707);
          if (!_0x3db451) return;
          _0x142fc4 && ((_0x48a074[_0x2adec9(0xdf)] = _0x48a074['buyWeaponCosts'] || {}), (_0x48a074[_0x2adec9(0xdf)][_0x3db451] = _0x59914a)),
            _0x10a407 && ((_0x48a074[_0x2adec9(0xe1)] = _0x48a074[_0x2adec9(0xe1)] || {}), (_0x48a074[_0x2adec9(0xe1)][_0x3db451] = Math[_0x2adec9(0xef)](_0x59914a * (_0x2301d0 ? _0x90a162 : 0x1))));
        } else {
          _0x4046fd = _0x2e6bdc[_0x2adec9(0x140)]()[_0x2adec9(0x1a9)]();
          switch (_0x5785ad) {
            case 'item':
            case _0x2adec9(0x1b2):
            case _0x2adec9(0x152):
              return this['CreateSubItemCostTexts'](_0x38bd1d, _0x90ee23, _0x31dbdd, _0x3c41d0);
            case _0x2adec9(0xf8):
              return this[_0x2adec9(0x11b)](_0x440baf, _0x4f7d30, _0x509926, _0x28084c);
            case 'gold':
              return [this[_0x2adec9(0x16c)](_0x1fb22d, _0x330702, _0x10a2a8, _0xc7b50b)];
            default:
              return [];
          }
        }
      } else {
        if (_0x260baa === _0x2adec9(0x16f)) {
          const _0x36263a = _0x38e786 ? Number(_0x556707) : DataManager[_0x2adec9(0x172)](_0x556707);
          if (!_0x36263a) return;
          _0x142fc4 && ((_0x48a074[_0x2adec9(0x1af)] = _0x48a074[_0x2adec9(0x1af)] || {}), (_0x48a074[_0x2adec9(0x1af)][_0x36263a] = _0x59914a)),
            _0x10a407 &&
              ((_0x48a074[_0x2adec9(0x120)] = _0x48a074['sellArmorCosts'] || {}), (_0x48a074['sellArmorCosts'][_0x36263a] = Math[_0x2adec9(0xef)](_0x59914a * (_0x2301d0 ? _0x90a162 : 0x1))));
        } else {
          if (_0x260baa === _0x2adec9(0x153)) {
            const _0x871291 = Number(_0x556707);
            if (!_0x871291) return;
            _0x142fc4 &&
              (_0x2adec9(0x1cd) !== 'dCfIA'
                ? ((_0x48a074[_0x2adec9(0x119)] = _0x48a074[_0x2adec9(0x119)] || {}), (_0x48a074[_0x2adec9(0x119)][_0x871291] = _0x59914a))
                : ((_0x321f23[_0x2adec9(0x135)] = _0x2c4e39['sellItemCosts'] || {}), (_0x39e6b7[_0x2adec9(0x135)][_0x22568b] = _0x5e5159[_0x2adec9(0xef)](_0x2d5eb1 * (_0x23316d ? _0xcb4857 : 0x1))))),
              _0x10a407 &&
                ((_0x48a074['sellVariableCosts'] = _0x48a074[_0x2adec9(0x169)] || {}), (_0x48a074['sellVariableCosts'][_0x871291] = Math[_0x2adec9(0xef)](_0x59914a * (_0x2301d0 ? _0x90a162 : 0x1))));
          }
        }
      }
    }
  }),
  (DataManager[_0x5c104d(0x1c7)] = VisuMZ['MoreCurrencies'][_0x5c104d(0x101)]['General'][_0x5c104d(0x148)]),
  (DataManager[_0x5c104d(0x1cb)] = function (_0x1f1b79) {
    const _0x34b99e = _0x5c104d;
    (_0x1f1b79 = _0x1f1b79[_0x34b99e(0x1d7)]()[_0x34b99e(0x1a9)]()), (this[_0x34b99e(0x184)] = this['_itemIDs'] || {});
    if (this[_0x34b99e(0x184)][_0x1f1b79]) return this['_itemIDs'][_0x1f1b79];
    for (const _0x593669 of $dataItems) {
      if ('IVuKG' === _0x34b99e(0x1d2)) _0x510699[_0x34b99e(0x105)](_0x2c1c73[_0x34b99e(0x17a)][_0x34b99e(0x115)](0x0));
      else {
        if (!_0x593669) continue;
        this[_0x34b99e(0x184)][_0x593669[_0x34b99e(0x19f)][_0x34b99e(0x1d7)]()[_0x34b99e(0x1a9)]()] = _0x593669['id'];
      }
    }
    return this[_0x34b99e(0x184)][_0x1f1b79] || 0x0;
  }),
  (DataManager['getWeaponIdWithName'] = function (_0x554e9e) {
    const _0x521f43 = _0x5c104d;
    (_0x554e9e = _0x554e9e[_0x521f43(0x1d7)]()[_0x521f43(0x1a9)]()), (this['_weaponIDs'] = this[_0x521f43(0xf5)] || {});
    if (this[_0x521f43(0xf5)][_0x554e9e]) return this[_0x521f43(0xf5)][_0x554e9e];
    for (const _0x3ca96c of $dataWeapons) {
      if (!_0x3ca96c) continue;
      this[_0x521f43(0xf5)][_0x3ca96c[_0x521f43(0x19f)][_0x521f43(0x1d7)]()[_0x521f43(0x1a9)]()] = _0x3ca96c['id'];
    }
    return this[_0x521f43(0xf5)][_0x554e9e] || 0x0;
  }),
  (DataManager['getArmorIdWithName'] = function (_0x260934) {
    const _0x37d50b = _0x5c104d;
    (_0x260934 = _0x260934[_0x37d50b(0x1d7)]()[_0x37d50b(0x1a9)]()), (this[_0x37d50b(0x163)] = this[_0x37d50b(0x163)] || {});
    if (this[_0x37d50b(0x163)][_0x260934]) return this[_0x37d50b(0x163)][_0x260934];
    for (const _0x2f2039 of $dataArmors) {
      if (!_0x2f2039) continue;
      this['_armorIDs'][_0x2f2039[_0x37d50b(0x19f)]['toUpperCase']()['trim']()] = _0x2f2039['id'];
    }
    return this['_armorIDs'][_0x260934] || 0x0;
  }),
  (DataManager[_0x5c104d(0x187)] = function () {
    const _0x45bf21 = _0x5c104d;
    this[_0x45bf21(0x1cc)] = this[_0x45bf21(0x1cc)] || { items: {}, weapons: {}, armors: {} };
  }),
  (DataManager[_0x5c104d(0xf9)] = function (_0x2a97be) {
    const _0x2d49e7 = _0x5c104d;
    if (DataManager[_0x2d49e7(0x196)](_0x2a97be)) return this[_0x2d49e7(0x1cc)][_0x2d49e7(0x1c4)];
    else {
      if (DataManager[_0x2d49e7(0x1a5)](_0x2a97be)) return this[_0x2d49e7(0x1cc)][_0x2d49e7(0x1a6)];
      else return DataManager[_0x2d49e7(0x109)](_0x2a97be) ? this[_0x2d49e7(0x1cc)][_0x2d49e7(0x178)] : {};
    }
  }),
  (TextManager[_0x5c104d(0x182)] = VisuMZ['MoreCurrencies'][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0xfd)]),
  (TextManager['MoreCurrenciesFmt'] = {
    item: VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0x114)],
    weapon: VisuMZ['MoreCurrencies'][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0x106)],
    armor: VisuMZ['MoreCurrencies'][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0x150)],
    variable: VisuMZ['MoreCurrencies'][_0x5c104d(0x101)]['Listing'][_0x5c104d(0x16e)],
  }),
  (TextManager[_0x5c104d(0x186)] = {
    owned: VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x101)][_0x5c104d(0x17e)][_0x5c104d(0x147)] || _0x5c104d(0x15d),
    shift: VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x101)][_0x5c104d(0x17e)][_0x5c104d(0x128)] || _0x5c104d(0x11f),
    net: VisuMZ['MoreCurrencies'][_0x5c104d(0x101)][_0x5c104d(0x17e)][_0x5c104d(0x1de)] || _0x5c104d(0x189),
  }),
  (SceneManager[_0x5c104d(0x131)] = function () {
    const _0x509025 = _0x5c104d;
    return this[_0x509025(0x103)] && this[_0x509025(0x103)][_0x509025(0x137)] === Scene_Shop;
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x1a4)] = Scene_Shop[_0x5c104d(0x125)]['maxBuy']),
  (Scene_Shop[_0x5c104d(0x125)]['maxBuy'] = function () {
    const _0x283293 = _0x5c104d;
    let _0x259274 = [VisuMZ[_0x283293(0x17a)]['Scene_Shop_maxBuy'][_0x283293(0x170)](this)];
    return (
      ($gameTemp[_0x283293(0xe8)] = !![]),
      (item = this[_0x283293(0x16d)][_0x283293(0x146)]()),
      (_0x259274 = _0x259274[_0x283293(0xf2)](VisuMZ['MoreCurrencies']['GetMaxBuysForObj'](item))),
      ($gameTemp['_bypassProxy'] = ![]),
      Math[_0x283293(0x1ac)](..._0x259274)
    );
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x1d1)] = function (_0xf86000) {
    const _0x260c6f = _0x5c104d;
    if (!_0xf86000) return [];
    const _0x27c10a = DataManager[_0x260c6f(0xf9)](_0xf86000),
      _0x6518db = _0x27c10a[_0xf86000['id']];
    if (!_0x6518db) return [];
    const _0x1ce0ed = [];
    for (const _0x5ea3b5 in _0x6518db[_0x260c6f(0x15b)]) {
      if ('fwHIO' === 'fwHIO') {
        const _0x30c0c3 = Number(_0x5ea3b5) || 0x0;
        if (!_0x30c0c3) continue;
        const _0x5c2607 = $dataItems[_0x30c0c3];
        if (!_0x5c2607) continue;
        const _0x230cd9 = _0x6518db[_0x260c6f(0x15b)][_0x5ea3b5] || 0x1,
          _0x22766b = $gameParty[_0x260c6f(0xdd)](_0x5c2607),
          _0x26fe31 = Math[_0x260c6f(0xef)](_0x22766b / _0x230cd9);
        _0x1ce0ed[_0x260c6f(0x105)](_0x26fe31);
      } else this['drawMoreCurrenciesVariable'](_0x4dcb58, _0x32dd91, _0x5f26a3);
    }
    for (const _0x291588 in _0x6518db['buyWeaponCosts']) {
      const _0x23caaf = Number(_0x291588) || 0x0;
      if (!_0x23caaf) continue;
      const _0x3fb0cf = $dataWeapons[_0x23caaf];
      if (!_0x3fb0cf) continue;
      const _0x3990e7 = _0x6518db[_0x260c6f(0xdf)][_0x291588] || 0x1,
        _0xb7ccae = $gameParty['numItems'](_0x3fb0cf),
        _0x16710a = Math[_0x260c6f(0xef)](_0xb7ccae / _0x3990e7);
      _0x1ce0ed[_0x260c6f(0x105)](_0x16710a);
    }
    for (const _0x9fc2dc in _0x6518db['buyArmorCosts']) {
      const _0x3493d9 = Number(_0x9fc2dc) || 0x0;
      if (!_0x3493d9) continue;
      const _0xf67a0a = $dataArmors[_0x3493d9];
      if (!_0xf67a0a) continue;
      const _0xb4cc6f = _0x6518db['buyArmorCosts'][_0x9fc2dc] || 0x1,
        _0x323fc4 = $gameParty[_0x260c6f(0xdd)](_0xf67a0a),
        _0x2d3c94 = Math['floor'](_0x323fc4 / _0xb4cc6f);
      _0x1ce0ed[_0x260c6f(0x105)](_0x2d3c94);
    }
    for (const _0x3529fa in _0x6518db[_0x260c6f(0x119)]) {
      const _0x2329bc = Number(_0x3529fa) || 0x0;
      if (!_0x2329bc) continue;
      const _0x2a54dd = _0x6518db[_0x260c6f(0x119)][_0x3529fa] || 0x1,
        _0x19aabe = $gameVariables[_0x260c6f(0xf4)](_0x2329bc),
        _0x46b893 = Math[_0x260c6f(0xef)](_0x19aabe / _0x2a54dd);
      _0x1ce0ed[_0x260c6f(0x105)](_0x46b893);
    }
    return _0x1ce0ed;
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x18c)] = Scene_Shop[_0x5c104d(0x125)][_0x5c104d(0x19d)]),
  (Scene_Shop[_0x5c104d(0x125)][_0x5c104d(0x19d)] = function (_0x3252c8) {
    const _0x1e3f38 = _0x5c104d;
    VisuMZ[_0x1e3f38(0x17a)]['Scene_Shop_doBuy'][_0x1e3f38(0x170)](this, _0x3252c8);
    if (_0x3252c8 <= 0x0) return;
    ($gameTemp['_bypassProxy'] = !![]), (item = this[_0x1e3f38(0x16d)][_0x1e3f38(0x146)]()), ($gameTemp[_0x1e3f38(0xe8)] = ![]), VisuMZ['MoreCurrencies'][_0x1e3f38(0x14d)](item, -_0x3252c8);
  }),
  (VisuMZ[_0x5c104d(0x17a)]['Scene_Shop_doSell'] = Scene_Shop['prototype'][_0x5c104d(0x1b5)]),
  (Scene_Shop['prototype'][_0x5c104d(0x1b5)] = function (_0x41bc12) {
    const _0xdd75b4 = _0x5c104d;
    $gameTemp['_bypassProxy'] = !![];
    let _0x422d27 = this[_0xdd75b4(0x1cf)][_0xdd75b4(0x146)]();
    ($gameTemp[_0xdd75b4(0xe8)] = ![]), VisuMZ[_0xdd75b4(0x17a)][_0xdd75b4(0x11a)][_0xdd75b4(0x170)](this, _0x41bc12);
    if (_0x41bc12 <= 0x0) return;
    VisuMZ[_0xdd75b4(0x17a)][_0xdd75b4(0x14d)](_0x422d27, _0x41bc12);
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x14d)] = function (_0x2c5a63, _0x369b28) {
    const _0x555f62 = _0x5c104d;
    if (!_0x2c5a63) return [];
    const _0x58bddd = DataManager['getMoreCurrenciesObjLibrary'](_0x2c5a63),
      _0x397789 = _0x58bddd[_0x2c5a63['id']];
    if (!_0x397789) return [];
    let _0x12ebe6 = {};
    _0x12ebe6 = _0x369b28 < 0x0 ? _0x397789[_0x555f62(0x15b)] : _0x397789[_0x555f62(0x135)];
    for (const _0x2f2d2b in _0x12ebe6) {
      const _0x3a3785 = Number(_0x2f2d2b) || 0x0;
      if (!_0x3a3785) continue;
      const _0x3a1662 = $dataItems[_0x3a3785];
      if (!_0x3a1662) continue;
      const _0xba0cf = _0x12ebe6[_0x2f2d2b] || 0x1,
        _0x4f2b0a = _0xba0cf * _0x369b28;
      $gameParty[_0x555f62(0x12b)](_0x3a1662, _0x4f2b0a);
    }
    _0x12ebe6 = _0x369b28 < 0x0 ? _0x397789['buyWeaponCosts'] : _0x397789[_0x555f62(0xe1)];
    for (const _0xf74ca6 in _0x12ebe6) {
      if ('afJSH' === _0x555f62(0xe9)) {
        const _0x2ace81 = _0x2b16c4(_0x2644ad['$1']);
        _0x2ace81 < _0x180a7d
          ? (_0x12e14a(
              '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
                'format'
              ](_0x4c864a, _0x2ace81, _0xd4c28d),
            ),
            _0x592ea9['exit']())
          : (_0x2228fd = _0x2277de[_0x555f62(0xf3)](_0x2ace81, _0xc25230));
      } else {
        const _0x14efc0 = Number(_0xf74ca6) || 0x0;
        if (!_0x14efc0) continue;
        const _0x2fefa7 = $dataWeapons[_0x14efc0];
        if (!_0x2fefa7) continue;
        const _0x5b3fc7 = _0x12ebe6[_0xf74ca6] || 0x1,
          _0x34ef15 = _0x5b3fc7 * _0x369b28;
        $gameParty[_0x555f62(0x12b)](_0x2fefa7, _0x34ef15);
      }
    }
    _0x12ebe6 = _0x369b28 < 0x0 ? _0x397789[_0x555f62(0x1af)] : _0x397789[_0x555f62(0x120)];
    for (const _0x3a3c20 in _0x12ebe6) {
      const _0x10ae3b = Number(_0x3a3c20) || 0x0;
      if (!_0x10ae3b) continue;
      const _0x2ff0fb = $dataArmors[_0x10ae3b];
      if (!_0x2ff0fb) continue;
      const _0x84931a = _0x12ebe6[_0x3a3c20] || 0x1,
        _0x434d79 = _0x84931a * _0x369b28;
      $gameParty['gainItem'](_0x2ff0fb, _0x434d79);
    }
    _0x12ebe6 = _0x369b28 < 0x0 ? _0x397789[_0x555f62(0x119)] : _0x397789[_0x555f62(0x169)];
    for (const _0x113ab5 in _0x12ebe6) {
      const _0xd0f57a = Number(_0x113ab5) || 0x0;
      if (!_0xd0f57a) continue;
      const _0x18e036 = _0x12ebe6[_0x113ab5] || 0x1,
        _0x5bc2b3 = _0x18e036 * _0x369b28,
        _0x1c1045 = $gameVariables['value'](_0xd0f57a) + _0x5bc2b3;
      $gameVariables[_0x555f62(0x1db)](_0xd0f57a, _0x1c1045);
    }
  }),
  (Window_Base[_0x5c104d(0x15a)] = VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0xf6)]),
  (Window_Base[_0x5c104d(0x10d)] = VisuMZ['MoreCurrencies']['Settings']['Listing'][_0x5c104d(0x192)]),
  (Window_Base[_0x5c104d(0x125)][_0x5c104d(0x111)] = function (_0x5dc3e6, _0x5b9ba5, _0x143809, _0x1dc844) {
    const _0x46f563 = _0x5c104d;
    _0x143809 = _0x143809 || ![];
    let _0x54354f = [];
    for (const _0x1ab18a of Window_Base[_0x46f563(0x10d)]) {
      if ('ATbNW' !== _0x46f563(0x19e)) _0x57fa13[_0x46f563(0x187)](), _0x26fff0[_0x46f563(0x17a)][_0x46f563(0x110)][_0x46f563(0x170)](this), this[_0x46f563(0x13b)]();
      else {
        const _0x1c1341 = VisuMZ[_0x46f563(0x17a)][_0x46f563(0x198)](_0x5dc3e6, _0x1ab18a, _0x143809, _0x1dc844);
        if (_0x1c1341) _0x54354f = _0x54354f[_0x46f563(0xf2)](_0x1c1341);
      }
    }
    const _0x4df03d = _0x46f563(0x1b1)[_0x46f563(0x17b)](TextManager[_0x46f563(0x182)]),
      _0x501aee = _0x46f563(0x1b1)[_0x46f563(0x17b)]($gameSystem['mainFontSize']());
    _0x54354f['remove'](''), (_0x54354f = _0x54354f[_0x46f563(0xeb)](_0x838674 => _0x4df03d + _0x838674 + _0x501aee));
    if (_0x54354f[_0x46f563(0xe7)] === 0x0) {
      if (_0x46f563(0x161) !== _0x46f563(0x161)) (_0x428b4b[_0x46f563(0xdf)] = _0x206c4a[_0x46f563(0xdf)] || {}), (_0x27c212[_0x46f563(0xdf)][_0x142477] = _0x5156c6);
      else {
        if (Imported[_0x46f563(0x1da)]) {
          const _0x52ca8b = SceneManager[_0x46f563(0x103)][_0x46f563(0x16d)],
            _0x154d71 = _0x52ca8b ? _0x52ca8b['visualGoldDisplayPadding']() : Window_Base[_0x46f563(0x1c1)],
            _0x267b25 = _0x52ca8b ? _0x52ca8b[_0x46f563(0x19c)]() : Window_Base[_0x46f563(0xf7)];
          _0x54354f[_0x46f563(0x105)](VisuMZ[_0x46f563(0xe6)][_0x46f563(0x162)](0x0, _0x154d71, _0x267b25));
        } else _0x54354f[_0x46f563(0x105)](VisuMZ['MoreCurrencies'][_0x46f563(0x115)](0x0));
      }
    }
    _0x54354f[_0x46f563(0x174)]();
    for (const _0xc13ade of _0x54354f) {
      if ('gKnIX' !== _0x46f563(0x13a)) {
        if (_0xc13ade === '') continue;
        this[_0x46f563(0x1dd)]();
        const _0x35e68c = this[_0x46f563(0x142)](_0xc13ade)[_0x46f563(0x1c8)],
          _0x5ad1f2 = _0x5b9ba5['x'] + _0x5b9ba5[_0x46f563(0x1c8)] - _0x35e68c,
          _0x50494d = _0x5b9ba5['y'];
        this[_0x46f563(0x13c)](_0xc13ade, _0x5ad1f2, _0x50494d, _0x35e68c), (_0x5b9ba5[_0x46f563(0x1c8)] -= _0x35e68c + Window_Base[_0x46f563(0x15a)]);
      } else {
        let _0x584560 = '';
        (_0x584560 += 'VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20'), (_0x584560 += _0x46f563(0x1bd)), _0x4712dc(_0x584560), _0xfd6321[_0x46f563(0x116)]();
      }
    }
    this[_0x46f563(0x1dd)]();
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x198)] = function (_0x40c1b0, _0x4f326b, _0x2c2110, _0x3cad6d) {
    const _0xd87d0 = _0x5c104d;
    _0x4f326b = _0x4f326b[_0xd87d0(0x140)]()['trim']();
    switch (_0x4f326b) {
      case _0xd87d0(0x146):
      case 'weapon':
      case 'armor':
        return this[_0xd87d0(0x1df)](_0x40c1b0, _0x4f326b, _0x2c2110, _0x3cad6d);
      case _0xd87d0(0xf8):
        return this[_0xd87d0(0x11b)](_0x40c1b0, _0x4f326b, _0x2c2110, _0x3cad6d);
      case 'gold':
        return [this[_0xd87d0(0x16c)](_0x40c1b0, _0x4f326b, _0x2c2110, _0x3cad6d)];
      default:
        return [];
    }
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x1df)] = function (_0x5cb408, _0x2120dc, _0x4bfdbb, _0x423e1f) {
    const _0x19e14c = _0x5c104d,
      _0x3e642c = DataManager['getMoreCurrenciesObjLibrary'](_0x5cb408),
      _0x3e56a8 = _0x3e642c[_0x5cb408['id']];
    if (!_0x3e56a8) return [];
    const _0x361c2b = _0x4bfdbb ? _0x19e14c(0x1a3) : _0x19e14c(0x130),
      _0x4e5da4 = _0x19e14c(0x160)[_0x19e14c(0x17b)](_0x361c2b, _0x2120dc[_0x19e14c(0x104)](0x0)[_0x19e14c(0x1d7)]() + _0x2120dc['slice'](0x1));
    if (!_0x3e56a8[_0x4e5da4]) return [];
    let _0x48c6b2 = [];
    if (_0x2120dc === _0x19e14c(0x146)) _0x48c6b2 = $dataItems;
    if (_0x2120dc === _0x19e14c(0x1b2)) _0x48c6b2 = $dataWeapons;
    if (_0x2120dc === 'armor') _0x48c6b2 = $dataArmors;
    const _0x37c193 = TextManager[_0x19e14c(0x1b6)][_0x2120dc],
      _0x2a0f2a = [];
    for (const _0x5d8ac3 in _0x3e56a8[_0x4e5da4]) {
      const _0xdcfadf = Number(_0x5d8ac3),
        _0x414cd4 = _0x48c6b2[_0xdcfadf];
      if (!_0x414cd4) continue;
      const _0x1953c0 = _0x3e56a8[_0x4e5da4][_0x5d8ac3] * _0x423e1f,
        _0x4dcf09 = $gameParty['numItems'](_0x414cd4),
        _0x4822d4 = _0x414cd4['iconIndex'] ? '\x5cI[%1]'[_0x19e14c(0x17b)](_0x414cd4[_0x19e14c(0x134)]) : '',
        _0x154e00 = _0x414cd4[_0x19e14c(0x19f)],
        _0x12c2dc = _0x37c193[_0x19e14c(0x17b)](_0x1953c0, _0x4dcf09, _0x4822d4, _0x154e00);
      _0x2a0f2a[_0x19e14c(0x105)](_0x12c2dc);
    }
    return _0x2a0f2a;
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x11b)] = function (_0x3b8600, _0x32c405, _0x50a100, _0x324dd9) {
    const _0x28fc2d = _0x5c104d,
      _0x44c195 = DataManager[_0x28fc2d(0xf9)](_0x3b8600),
      _0xb24690 = _0x44c195[_0x3b8600['id']];
    if (!_0xb24690) return [];
    const _0x53ef5f = _0x50a100 ? _0x28fc2d(0x1a3) : 'buy',
      _0x5712f4 = _0x28fc2d(0x160)[_0x28fc2d(0x17b)](_0x53ef5f, _0x32c405[_0x28fc2d(0x104)](0x0)[_0x28fc2d(0x1d7)]() + _0x32c405[_0x28fc2d(0x124)](0x1));
    if (!_0xb24690[_0x5712f4]) return [];
    const _0x226795 = TextManager['MoreCurrenciesFmt'][_0x32c405],
      _0x474d58 = [];
    for (const _0x48c32b in _0xb24690[_0x5712f4]) {
      const _0x2fc155 = Number(_0x48c32b);
      if ($dataSystem[_0x28fc2d(0x1a7)][_0x28fc2d(0xe7)] <= _0x2fc155) continue;
      const _0x39ca56 = _0xb24690[_0x5712f4][_0x48c32b] * _0x324dd9,
        _0x50a5ac = $gameVariables[_0x28fc2d(0xf4)](_0x2fc155);
      let _0x21ab62 = '',
        _0x29753a = $dataSystem[_0x28fc2d(0x1a7)][_0x2fc155];
      if (_0x29753a[_0x28fc2d(0x1b3)](/\\I\[(\d+)\]/i)) {
        if (_0x28fc2d(0x10c) !== _0x28fc2d(0x10c)) {
          if (!_0x4704f1) return;
          const _0x5b3492 = _0x3fc299['MoreCurrencies']['RegExp'],
            _0xc311eb = _0x353f6c['note'];
          if (!_0xc311eb[_0x28fc2d(0x1b3)](_0x5b3492[_0x28fc2d(0xfb)]) && !_0xc311eb[_0x28fc2d(0x1b3)](_0x5b3492[_0x28fc2d(0x139)]) && !_0xc311eb[_0x28fc2d(0x1b3)](_0x5b3492['SubSellCost'])) return;
          const _0x299ef4 = _0x4d2d55[_0x28fc2d(0xf9)](_0x56fde4);
          (_0x299ef4[_0x5e50f8['id']] = _0x299ef4[_0x4fc148['id']] || {}),
            _0xc311eb[_0x28fc2d(0x1b3)](_0x5b3492['SubBuyCost']) || _0xc311eb[_0x28fc2d(0x1b3)](_0x5b3492[_0x28fc2d(0x157)])
              ? (this[_0x28fc2d(0x18e)](_0x19b560, _0x299ef4[_0x50e01f['id']], 'SubBuyCost'), this[_0x28fc2d(0x18e)](_0x22c122, _0x299ef4[_0x3dce4a['id']], _0x28fc2d(0x157)))
              : this['ParseNotetagSubCosts'](_0x115ed6, _0x299ef4[_0x2fc0d1['id']], _0x28fc2d(0xfb));
        } else _0x21ab62 = _0x28fc2d(0x1bf)['format'](Number(RegExp['$1']));
      }
      _0x29753a = _0x29753a[_0x28fc2d(0xff)](/<(.*)>/gi, '');
      const _0x3555e8 = _0x226795[_0x28fc2d(0x17b)](_0x39ca56, _0x50a5ac, _0x21ab62, _0x29753a);
      _0x474d58[_0x28fc2d(0x105)](_0x3555e8);
    }
    return _0x474d58;
  }),
  (VisuMZ[_0x5c104d(0x17a)]['CreateSubGoldCostText'] = function (_0x14086a, _0x4cdbc9, _0x4fb3d8, _0x3a6117) {
    const _0x56fa12 = _0x5c104d,
      _0x49b5b2 = SceneManager[_0x56fa12(0x103)][_0x56fa12(0x16d)],
      _0x159c9e = _0x49b5b2 ? _0x49b5b2['price'](_0x14086a) : 0x0,
      _0x57a23b = SceneManager[_0x56fa12(0x103)][_0x56fa12(0xe0)] ? SceneManager[_0x56fa12(0x103)]['sellPriceOfItem'](_0x14086a) : 0x0,
      _0x3c6682 = Math[_0x56fa12(0x171)]((_0x4fb3d8 ? _0x57a23b : _0x159c9e) * _0x3a6117);
    if (_0x3c6682 === 0x0) return '';
    if (Imported['VisuMZ_3_VisualGoldDisplay']) {
      if (_0x56fa12(0x16a) === _0x56fa12(0x16a)) {
        const _0x56adb0 = _0x49b5b2[_0x56fa12(0x18f)](),
          _0x459e2e = _0x49b5b2[_0x56fa12(0x19c)]();
        return VisuMZ[_0x56fa12(0xe6)][_0x56fa12(0x162)](_0x3c6682, _0x56adb0, _0x459e2e);
      } else {
        const _0x1e3e02 = _0x302b81 + (this[_0x56fa12(0x190)]() - _0x2b4a7e[_0x56fa12(0x194)]) / 0x2;
        this[_0x56fa12(0xfa)](_0x4d5e6c, _0x4452f6, _0x1e3e02);
        const _0xf6faff = _0x438b83['iconWidth'] + 0x4;
        _0x144338 += _0xf6faff;
      }
    } else return this[_0x56fa12(0x115)](_0x3c6682);
  }),
  (VisuMZ['MoreCurrencies'][_0x5c104d(0x115)] = function (_0x111560) {
    const _0x504476 = _0x5c104d,
      _0x701f56 = _0x504476(0x122),
      _0x1ec38d = VisuMZ[_0x504476(0x1b4)][_0x504476(0x101)][_0x504476(0x1d6)][_0x504476(0x1c5)],
      _0x214b54 = TextManager[_0x504476(0x1ce)];
    return _0x701f56[_0x504476(0x17b)](_0x111560, _0x1ec38d > 0x0 ? '\x5cI[%1]'['format'](_0x1ec38d) : '', _0x1ec38d > 0x0 ? '' : _0x214b54);
  }),
  (VisuMZ['MoreCurrencies']['Window_ShopBuy_drawItemCost'] = Window_ShopBuy[_0x5c104d(0x125)][_0x5c104d(0x136)]),
  (Window_ShopBuy[_0x5c104d(0x125)]['drawItemCost'] = function (_0x181146, _0x39023b) {
    if (!_0x181146) return;
    this['drawItemMoreCurrencies'](_0x181146, _0x39023b, ![], 0x1);
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x19b)] = Window_ShopBuy[_0x5c104d(0x125)][_0x5c104d(0x1a0)]),
  (Window_ShopBuy[_0x5c104d(0x125)]['isEnabled'] = function (_0x3b4b57) {
    const _0x3e10bb = _0x5c104d;
    if (!VisuMZ[_0x3e10bb(0x17a)]['Window_ShopBuy_isEnabled'][_0x3e10bb(0x170)](this, _0x3b4b57)) return ![];
    return VisuMZ[_0x3e10bb(0x17a)][_0x3e10bb(0x11e)](_0x3b4b57);
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x11e)] = function (_0x126c24) {
    const _0x23cc4f = _0x5c104d;
    if (!_0x126c24) return ![];
    const _0x205c6c = DataManager['getMoreCurrenciesObjLibrary'](_0x126c24),
      _0x34ce09 = _0x205c6c[_0x126c24['id']];
    if (!_0x34ce09) return !![];
    for (const _0x4c0944 in _0x34ce09[_0x23cc4f(0x15b)]) {
      const _0x4a2cae = Number(_0x4c0944) || 0x0;
      if (!_0x4a2cae) continue;
      const _0x3f583b = $dataItems[_0x4a2cae];
      if (!_0x3f583b) continue;
      const _0x415103 = _0x34ce09['buyItemCosts'][_0x4c0944];
      if (_0x415103 > $gameParty[_0x23cc4f(0xdd)](_0x3f583b)) return ![];
    }
    for (const _0x31af7c in _0x34ce09[_0x23cc4f(0xdf)]) {
      if ('rQENu' !== _0x23cc4f(0x144)) {
        const _0x1823c6 = Number(_0x31af7c) || 0x0;
        if (!_0x1823c6) continue;
        const _0x4a6ce8 = $dataWeapons[_0x1823c6];
        if (!_0x4a6ce8) continue;
        const _0x206687 = _0x34ce09['buyWeaponCosts'][_0x31af7c];
        if (_0x206687 > $gameParty[_0x23cc4f(0xdd)](_0x4a6ce8)) return ![];
      } else {
        const _0xe95fa3 = _0x125365 ? _0x37bcc8(_0x375257) : _0x4a7193[_0x23cc4f(0x14b)](_0x333a00);
        if (!_0xe95fa3) return;
        _0x568c70 && ((_0x477329[_0x23cc4f(0xdf)] = _0x32936e[_0x23cc4f(0xdf)] || {}), (_0x145dd4[_0x23cc4f(0xdf)][_0xe95fa3] = _0x25cf6b)),
          _0x1ecba7 &&
            ((_0x2c6563['sellWeaponCosts'] = _0xc8f7fa[_0x23cc4f(0xe1)] || {}), (_0x4ea177['sellWeaponCosts'][_0xe95fa3] = _0x450124[_0x23cc4f(0xef)](_0x299021 * (_0x5637e7 ? _0x570605 : 0x1))));
      }
    }
    for (const _0x2dddc5 in _0x34ce09[_0x23cc4f(0x1af)]) {
      const _0x4ae72d = Number(_0x2dddc5) || 0x0;
      if (!_0x4ae72d) continue;
      const _0x2bf13f = $dataArmors[_0x4ae72d];
      if (!_0x2bf13f) continue;
      const _0x55a21a = _0x34ce09[_0x23cc4f(0x1af)][_0x2dddc5];
      if (_0x55a21a > $gameParty[_0x23cc4f(0xdd)](_0x2bf13f)) return ![];
    }
    for (const _0x41b200 in _0x34ce09['buyVariableCosts']) {
      const _0x3e97bc = Number(_0x41b200) || 0x0;
      if (!_0x3e97bc) continue;
      const _0x2e0bf0 = _0x34ce09['buyVariableCosts'][_0x41b200];
      if (_0x2e0bf0 > $gameVariables[_0x23cc4f(0xf4)](_0x3e97bc)) return ![];
    }
    return !![];
  }),
  (Window_ShopSell['MORE_CURRENCIES_SHOW_SELL_VALUE'] = VisuMZ['MoreCurrencies'][_0x5c104d(0x101)][_0x5c104d(0x1b7)][_0x5c104d(0xdc)]),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x17d)] = Window_ItemList[_0x5c104d(0x125)][_0x5c104d(0x1aa)]),
  (Window_ItemList[_0x5c104d(0x125)]['drawItemNumber'] = function (_0x826bf7, _0x55d06c, _0x236f90, _0x305a7e) {
    const _0x2f6c7f = _0x5c104d;
    VisuMZ[_0x2f6c7f(0x17a)][_0x2f6c7f(0x17d)]['call'](this, _0x826bf7, _0x55d06c, _0x236f90, _0x305a7e);
    if (this[_0x2f6c7f(0x175)] && this[_0x2f6c7f(0x175)]()) {
      if (_0x2f6c7f(0xf1) !== _0x2f6c7f(0x1ba)) this[_0x2f6c7f(0x13d)](_0x826bf7, _0x55d06c, _0x236f90, _0x305a7e);
      else return this[_0x2f6c7f(0x1cc)][_0x2f6c7f(0x1a6)];
    }
  }),
  (Window_ItemList['prototype'][_0x5c104d(0x175)] = function () {
    const _0x3865de = _0x5c104d;
    return this[_0x3865de(0x137)] === Window_ShopSell && Window_ShopSell[_0x3865de(0x1ae)];
  }),
  (Window_ShopSell['prototype'][_0x5c104d(0x13d)] = function (_0x300192, _0x504417, _0x3b6aba, _0x4f44e2) {
    const _0x3fd46d = _0x5c104d,
      _0x31de75 = VisuMZ[_0x3fd46d(0x13f)][_0x3fd46d(0x101)]['ItemScene'],
      _0x4730ea = _0x31de75[_0x3fd46d(0x18a)],
      _0x4612cf = _0x4730ea[_0x3fd46d(0x17b)]($gameParty[_0x3fd46d(0x177)](_0x300192));
    this[_0x3fd46d(0x108)][_0x3fd46d(0x117)] = _0x31de75[_0x3fd46d(0xe2)];
    const _0x24af47 = this[_0x3fd46d(0x13e)](_0x4612cf);
    _0x4f44e2 -= _0x24af47 + Window_Base[_0x3fd46d(0x15a)];
    const _0x13187f = new Rectangle(_0x504417, _0x3b6aba, _0x4f44e2, this[_0x3fd46d(0x190)]());
    this[_0x3fd46d(0x111)](_0x300192, _0x13187f, !![], 0x1);
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x181)] = function () {
    const _0x4a3cc6 = _0x5c104d;
    return Math['floor'](this[_0x4a3cc6(0x10e)]() + this['lineHeight']() * 0x2);
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x10e)] = function () {
    return Math['floor'](this['innerHeight'] - this['lineHeight']() * 6.5);
  }),
  (Window_ShopNumber['prototype'][_0x5c104d(0x17c)] = function () {
    const _0x17d34e = _0x5c104d;
    return Math[_0x17d34e(0xef)](this[_0x17d34e(0x181)]() + this[_0x17d34e(0x190)]() * 0x2);
  }),
  (Window_ShopNumber['prototype'][_0x5c104d(0x183)] = function () {
    const _0x5b3a35 = _0x5c104d,
      _0x44658b = VisuMZ[_0x5b3a35(0x17a)][_0x5b3a35(0x127)](this[_0x5b3a35(0xfe)]);
    let _0x22440e = this[_0x5b3a35(0x10e)]();
    (_0x22440e -= this[_0x5b3a35(0x190)]() * _0x44658b[_0x5b3a35(0xe7)]), this[_0x5b3a35(0x1b0)](_0x22440e);
    for (const _0x1ed4e2 of _0x44658b) {
      _0x22440e += this[_0x5b3a35(0x190)]();
      if (!_0x1ed4e2) continue;
      this[_0x5b3a35(0x188)](_0x1ed4e2, _0x22440e);
    }
  }),
  (Window_ShopNumber['prototype'][_0x5c104d(0x1b0)] = function (_0x13f58a) {
    const _0x4a98b2 = _0x5c104d,
      _0x58df90 = this[_0x4a98b2(0xee)]();
    let _0x12d09b = _0x58df90 * 0x2;
    const _0x80a87a = this[_0x4a98b2(0x14a)] - _0x12d09b - _0x58df90 * 0x3,
      _0x735760 = _0x12d09b + Math[_0x4a98b2(0x18d)](_0x80a87a / 0x3),
      _0x3d11e7 = Math[_0x4a98b2(0xef)]((_0x80a87a * 0x2) / 0x3 / 0x3),
      _0x5ad958 = Math[_0x4a98b2(0xf3)](this['textWidth'](_0x4a98b2(0x118)), this['textWidth'](_0x4a98b2(0xed)));
    this[_0x4a98b2(0x1dd)](), this[_0x4a98b2(0x1ad)](ColorManager[_0x4a98b2(0x1a2)]());
    const _0x238c27 = [_0x4a98b2(0x123), _0x4a98b2(0x113), _0x4a98b2(0x10b)];
    for (let _0x273ee0 = 0x0; _0x273ee0 < 0x3; _0x273ee0++) {
      const _0x1e90d4 = _0x238c27[_0x273ee0],
        _0x327091 = TextManager['MoreCurrenciesNumberWindow'][_0x1e90d4];
      this[_0x4a98b2(0x10f)](_0x327091, _0x735760 + _0x3d11e7 * _0x273ee0 + _0x5ad958, _0x13f58a, _0x3d11e7 - _0x5ad958, _0x4a98b2(0x15e));
    }
  }),
  (Window_ShopNumber[_0x5c104d(0x125)]['drawMoreCurrenciesMathMarks'] = function (_0x4eef5e, _0x325498) {
    const _0x2744a4 = _0x5c104d,
      _0x5191f4 = this[_0x2744a4(0xee)]();
    let _0x3e3492 = _0x5191f4 * 0x2;
    const _0xfca85f = this[_0x2744a4(0x14a)] - _0x3e3492 - _0x5191f4 * 0x3,
      _0x4179cb = _0x3e3492 + Math[_0x2744a4(0x18d)](_0xfca85f / 0x3),
      _0x166db2 = Math['floor']((_0xfca85f * 0x2) / 0x3 / 0x3);
    (_0x325498 = _0x2744a4(0x158)[_0x2744a4(0x17b)](_0x325498)),
      this[_0x2744a4(0x10f)](_0x325498, _0x4179cb + _0x166db2 * 0x1, _0x4eef5e, _0x166db2, _0x2744a4(0x19a)),
      this[_0x2744a4(0x10f)]('\x20=', _0x4179cb + _0x166db2 * 0x2, _0x4eef5e, _0x166db2, _0x2744a4(0x19a));
  }),
  (Window_ShopNumber[_0x5c104d(0x125)]['drawMoreCurrenciesPriceData'] = function (_0x51f7f3, _0x2256c0) {
    const _0x15f682 = _0x5c104d,
      _0x3e3d0e = _0x51f7f3[0x0];
    this[_0x15f682(0x1dd)]();
    const _0x1ae21e = SceneManager[_0x15f682(0x103)][_0x15f682(0x185)][_0x15f682(0x14c)](),
      _0x9865ff = _0x1ae21e === _0x15f682(0x130);
    this['drawMoreCurrenciesMathMarks'](_0x2256c0, _0x9865ff ? '-' : '+');
    if (_0x3e3d0e === 'gold') {
      if (_0x15f682(0x145) !== _0x15f682(0x145)) {
        const _0x5f301b = _0x15f682(0x122),
          _0x22fe03 = _0x27ddc3[_0x15f682(0x1b4)][_0x15f682(0x101)][_0x15f682(0x1d6)][_0x15f682(0x1c5)],
          _0x2b5024 = _0x316378[_0x15f682(0x1ce)];
        return _0x5f301b[_0x15f682(0x17b)](_0x1a648e, _0x22fe03 > 0x0 ? _0x15f682(0x1bf)[_0x15f682(0x17b)](_0x22fe03) : '', _0x22fe03 > 0x0 ? '' : _0x2b5024);
      } else this[_0x15f682(0x1bb)](_0x51f7f3, _0x2256c0, _0x9865ff);
    } else _0x3e3d0e === 'variable' ? this['drawMoreCurrenciesVariable'](_0x51f7f3, _0x2256c0, _0x9865ff) : this[_0x15f682(0x102)](_0x51f7f3, _0x2256c0, _0x9865ff);
  }),
  (Window_ShopNumber['prototype'][_0x5c104d(0x14e)] = function () {
    return !![];
  }),
  (Window_ShopNumber[_0x5c104d(0x125)]['visualGoldDisplayNoCost'] = function () {
    return ![];
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x1bb)] = function (_0x3eaff3, _0x33856e, _0x228911) {
    const _0x5dc7d3 = _0x5c104d,
      _0x274251 = this[_0x5dc7d3(0xee)]();
    let _0x43987f = _0x274251 * 0x2;
    const _0x145342 = this['innerWidth'] - _0x43987f - _0x274251 * 0x3,
      _0x1c43ec = _0x43987f + Math[_0x5dc7d3(0x18d)](_0x145342 / 0x3),
      _0x588380 = Math[_0x5dc7d3(0xef)]((_0x145342 * 0x2) / 0x3 / 0x3),
      _0x391c9a = Math[_0x5dc7d3(0xf3)](this[_0x5dc7d3(0x13e)](_0x5dc7d3(0x118)), this[_0x5dc7d3(0x13e)](_0x5dc7d3(0xed))),
      _0x1f0dfe = _0x3eaff3[0x0],
      _0x3ca4bc = _0x3eaff3[0x1],
      _0x429078 = _0x3ca4bc * this[_0x5dc7d3(0x180)],
      _0x4cd7b1 = VisuMZ[_0x5dc7d3(0x1b4)][_0x5dc7d3(0x101)]['Gold'][_0x5dc7d3(0x1c5)];
    if (_0x4cd7b1 > 0x0) {
      if (_0x5dc7d3(0x15c) !== _0x5dc7d3(0x15c)) return !![];
      else {
        const _0x3c7907 = _0x33856e + (this['lineHeight']() - ImageManager['iconHeight']) / 0x2;
        this[_0x5dc7d3(0xfa)](_0x4cd7b1, _0x43987f, _0x3c7907);
        const _0x2e0154 = ImageManager[_0x5dc7d3(0xf0)] + 0x4;
        _0x43987f += _0x2e0154;
      }
    }
    this['changeTextColor'](ColorManager[_0x5dc7d3(0x1a2)]()), this[_0x5dc7d3(0x10f)](TextManager[_0x5dc7d3(0x1ce)], _0x43987f, _0x33856e, _0x588380, _0x5dc7d3(0x19a));
    const _0x1772d6 = $gameParty[_0x5dc7d3(0x1d5)]();
    this[_0x5dc7d3(0x112)](_0x1772d6, TextManager[_0x5dc7d3(0x1ce)], _0x1c43ec, _0x33856e, _0x588380);
    const _0x1b8f92 = _0x1c43ec + _0x588380 * 0x1 + _0x391c9a,
      _0xc25c4e = _0x588380 - _0x391c9a;
    this[_0x5dc7d3(0x112)](_0x429078, TextManager[_0x5dc7d3(0x1ce)], _0x1b8f92, _0x33856e, _0xc25c4e);
    const _0x3c90a1 = _0x1c43ec + _0x588380 * 0x2 + _0x391c9a,
      _0x4e0ece = _0x588380 - _0x391c9a,
      _0x46296c = Math[_0x5dc7d3(0x1ac)](_0x1772d6 + _0x429078 * (_0x228911 ? -0x1 : 0x1), $gameParty[_0x5dc7d3(0x1c0)]());
    this['drawCurrencyValue'](_0x46296c, TextManager['currencyUnit'], _0x3c90a1, _0x33856e, _0x4e0ece);
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x17f)] = function (_0x1acb4d, _0x44e477, _0x513f6b) {
    const _0x2eb5b4 = _0x5c104d,
      _0x142d4 = this['itemPadding']();
    let _0x31636f = _0x142d4 * 0x2;
    const _0x3be910 = this[_0x2eb5b4(0x14a)] - _0x31636f - _0x142d4 * 0x3,
      _0x37885c = _0x31636f + Math[_0x2eb5b4(0x18d)](_0x3be910 / 0x3),
      _0x556097 = Math[_0x2eb5b4(0xef)]((_0x3be910 * 0x2) / 0x3 / 0x3),
      _0xd00482 = Math[_0x2eb5b4(0xf3)](this[_0x2eb5b4(0x13e)]('\x20+\x20'), this[_0x2eb5b4(0x13e)](_0x2eb5b4(0xed))),
      _0x3b38ca = _0x1acb4d[0x0],
      _0x1acc78 = _0x1acb4d[0x1],
      _0x19ffa5 = _0x1acb4d[0x2],
      _0x33fe05 = _0x1acc78 * this['_number'];
    let _0x152537 = 0x0;
    const _0x3ae3b3 = $dataSystem[_0x2eb5b4(0x1a7)][_0x19ffa5];
    _0x3ae3b3[_0x2eb5b4(0x1b3)](/\\I\[(\d+)\]/i) && (_0x152537 = Number(RegExp['$1']));
    const _0x5c1f32 = _0x152537 > 0x0 ? ImageManager['iconWidth'] + 0x4 : 0x0;
    this['drawTextEx'](_0x3ae3b3, _0x31636f, _0x44e477, _0x3be910, 'left');
    const _0x5564ba = _0x37885c + _0x556097 * 0x0,
      _0x532103 = _0x556097 - _0x5c1f32,
      _0x16f9ed = $gameVariables[_0x2eb5b4(0xf4)](_0x19ffa5);
    this[_0x2eb5b4(0x10f)](_0x16f9ed, _0x5564ba, _0x44e477, _0x532103, _0x2eb5b4(0x1bc)), this['drawIcon'](_0x152537, _0x5564ba + _0x532103 + 0x4, _0x44e477);
    const _0x5da4fa = _0x37885c + _0x556097 * 0x1 + _0xd00482,
      _0x3818ed = _0x556097 - _0xd00482 - _0x5c1f32;
    this[_0x2eb5b4(0x10f)](_0x33fe05, _0x5da4fa, _0x44e477, _0x3818ed, _0x2eb5b4(0x1bc)), this['drawIcon'](_0x152537, _0x5da4fa + _0x3818ed + 0x4, _0x44e477);
    const _0xc0a739 = _0x37885c + _0x556097 * 0x2 + _0xd00482,
      _0x5576ff = _0x556097 - _0xd00482 - _0x5c1f32,
      _0x23339d = _0x16f9ed + _0x33fe05 * (_0x513f6b ? -0x1 : 0x1);
    this[_0x2eb5b4(0x10f)](_0x23339d, _0xc0a739, _0x44e477, _0x5576ff, _0x2eb5b4(0x1bc)), this[_0x2eb5b4(0xfa)](_0x152537, _0xc0a739 + _0x5576ff + 0x4, _0x44e477);
  }),
  (Window_ShopNumber[_0x5c104d(0x125)]['drawMoreCurrenciesItem'] = function (_0x2b50a8, _0x13f20a, _0x121d86) {
    const _0x16afc3 = _0x5c104d,
      _0x18f453 = this[_0x16afc3(0xee)]();
    let _0x24ce5c = _0x18f453 * 0x2;
    const _0x519e92 = this['innerWidth'] - _0x24ce5c - _0x18f453 * 0x3,
      _0x14ee53 = _0x24ce5c + Math[_0x16afc3(0x18d)](_0x519e92 / 0x3),
      _0x2bcd62 = Math['floor']((_0x519e92 * 0x2) / 0x3 / 0x3),
      _0x43db21 = Math['max'](this[_0x16afc3(0x13e)]('\x20+\x20'), this['textWidth']('\x20=\x20')),
      _0xb63d5e = _0x2b50a8[0x0];
    if (!_0xb63d5e) return;
    const _0x2ffba2 = _0x2b50a8[0x1],
      _0x7b9f4 = _0x2ffba2 * this[_0x16afc3(0x180)];
    let _0x15ac7c = _0xb63d5e[_0x16afc3(0x134)];
    const _0x2f3954 = _0x15ac7c > 0x0 ? ImageManager[_0x16afc3(0xf0)] + 0x4 : 0x0;
    this[_0x16afc3(0x12a)](_0xb63d5e, _0x24ce5c, _0x13f20a, _0x519e92);
    const _0x9ee20a = _0x14ee53 + _0x2bcd62 * 0x0,
      _0x5735eb = _0x2bcd62 - _0x2f3954,
      _0x11329b = $gameParty[_0x16afc3(0xdd)](_0xb63d5e);
    this[_0x16afc3(0x10f)](_0x11329b, _0x9ee20a, _0x13f20a, _0x5735eb, _0x16afc3(0x1bc)), this['drawIcon'](_0x15ac7c, _0x9ee20a + _0x5735eb + 0x4, _0x13f20a);
    const _0xd7f118 = _0x14ee53 + _0x2bcd62 * 0x1 + _0x43db21,
      _0x45da23 = _0x2bcd62 - _0x43db21 - _0x2f3954;
    this[_0x16afc3(0x10f)](_0x7b9f4, _0xd7f118, _0x13f20a, _0x45da23, 'right'), this['drawIcon'](_0x15ac7c, _0xd7f118 + _0x45da23 + 0x4, _0x13f20a);
    const _0x39a9e1 = _0x14ee53 + _0x2bcd62 * 0x2 + _0x43db21,
      _0x2c996c = _0x2bcd62 - _0x43db21 - _0x2f3954,
      _0x3f97ce = _0x11329b + _0x7b9f4 * (_0x121d86 ? -0x1 : 0x1);
    this[_0x16afc3(0x10f)](_0x3f97ce, _0x39a9e1, _0x13f20a, _0x2c996c, _0x16afc3(0x1bc)), this[_0x16afc3(0xfa)](_0x15ac7c, _0x39a9e1 + _0x2c996c + 0x4, _0x13f20a);
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x1b9)] = function () {
    const _0x23100c = _0x5c104d,
      _0x2aece5 = [this['_item'], 0x1],
      _0x878edc = this['itemNameY'](),
      _0x187902 = SceneManager['_scene'][_0x23100c(0x185)][_0x23100c(0x14c)](),
      _0x1fdc46 = _0x187902 === _0x23100c(0x130);
    this[_0x23100c(0x102)](_0x2aece5, _0x878edc, !_0x1fdc46);
    const _0x42f58c = _0x1fdc46 ? '+' : '-';
    this['drawMoreCurrenciesMathMarks'](_0x878edc, _0x42f58c);
  }),
  (Window_ShopNumber['prototype'][_0x5c104d(0x151)] = function () {}),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0xe3)] = function () {}),
  (Window_ShopNumber[_0x5c104d(0x125)]['maxDigits'] = function () {
    const _0x17b819 = _0x5c104d;
    if (!this[_0x17b819(0xfe)]) return 0x1;
    let _0x29a724 = String($gameParty[_0x17b819(0x177)](this[_0x17b819(0xfe)]));
    return this[_0x17b819(0x1d0)]() && (_0x29a724 = VisuMZ[_0x17b819(0x166)](_0x29a724)), _0x29a724['length'];
  }),
  (Window_ShopNumber[_0x5c104d(0x125)][_0x5c104d(0x129)] = function () {
    const _0x5b47be = _0x5c104d,
      _0x27dc4b = this[_0x5b47be(0xee)]();
    let _0x3219ee = _0x27dc4b * 0x2;
    const _0x1098e6 = this[_0x5b47be(0x14a)] - _0x3219ee - _0x27dc4b * 0x3,
      _0x4abb78 = _0x3219ee + Math[_0x5b47be(0x18d)](_0x1098e6 / 0x3),
      _0x2bf712 = this[_0x5b47be(0x181)](),
      _0xdc5e13 = Math[_0x5b47be(0xef)]((_0x1098e6 * 0x2) / 0x3 / 0x3),
      _0x2256e9 = Math[_0x5b47be(0xf3)](this['textWidth']('\x20+\x20'), this[_0x5b47be(0x13e)](_0x5b47be(0xed))),
      _0x3e2b06 = this[_0x5b47be(0xfe)]?.['iconIndex'] > 0x0 ? ImageManager[_0x5b47be(0xf0)] : 0x0,
      _0x2dad52 = this['cursorWidth'](),
      _0x4404d4 = new Rectangle(
        Math[_0x5b47be(0xef)](_0x4abb78 + _0xdc5e13 * 0x2 - this[_0x5b47be(0xec)]() - _0x3e2b06 + this['itemPadding']() / 0x2 - 0x2),
        _0x2bf712,
        this['cursorWidth'](),
        this['lineHeight'](),
      );
    return _0x4404d4;
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x127)] = function (_0x3545fc) {
    const _0x25189a = _0x5c104d;
    let _0x5bcdb0 = [];
    const _0xac24b7 = SceneManager[_0x25189a(0x103)][_0x25189a(0x185)][_0x25189a(0x14c)]() === _0x25189a(0x1a3);
    for (const _0x216aaa of Window_Base['MORE_CURRENCIES_ORDER']) {
      const _0x532aed = this[_0x25189a(0x159)](_0x3545fc, _0x216aaa, _0xac24b7);
      if (_0x216aaa === _0x25189a(0x1d5) && SceneManager[_0x25189a(0x103)][_0x25189a(0x138)]['_price'] <= 0x0) continue;
      if (_0x532aed) _0x5bcdb0 = _0x5bcdb0['concat'](_0x532aed);
    }
    return (
      _0x5bcdb0[_0x25189a(0xe7)] === 0x0 &&
        ('UYtmq' === _0x25189a(0x154)
          ? ((_0x39d8e9[_0x25189a(0x120)] = _0x3cf236[_0x25189a(0x120)] || {}), (_0x2460c2['sellArmorCosts'][_0x23d60f] = _0x35b273[_0x25189a(0xef)](_0x5c310c * (_0x23ec10 ? _0x40d65b : 0x1))))
          : _0x5bcdb0[_0x25189a(0x105)]([_0x25189a(0x1d5), 0x0])),
      _0x5bcdb0
    );
  }),
  (VisuMZ[_0x5c104d(0x17a)]['GetShopNumberIngredientType'] = function (_0x4785db, _0x3d5051, _0x44d2b4) {
    const _0x58b03c = _0x5c104d;
    _0x3d5051 = _0x3d5051[_0x58b03c(0x140)]()['trim']();
    switch (_0x3d5051) {
      case _0x58b03c(0x146):
      case 'weapon':
      case _0x58b03c(0x152):
        return this[_0x58b03c(0x199)](_0x4785db, _0x3d5051, _0x44d2b4);
      case _0x58b03c(0xf8):
        return this[_0x58b03c(0x1c3)](_0x4785db, _0x3d5051, _0x44d2b4);
      case _0x58b03c(0x1d5):
        return [this['GetShopNumberIngredientGold']()];
    }
  }),
  (VisuMZ[_0x5c104d(0x17a)][_0x5c104d(0x199)] = function (_0x2d3324, _0x1969d9, _0x2293dc) {
    const _0x3581dd = _0x5c104d;
    if (!_0x2d3324) return [];
    const _0x34b6dc = DataManager['getMoreCurrenciesObjLibrary'](_0x2d3324);
    if (!_0x34b6dc) return [];
    const _0x1f1c0b = _0x34b6dc[_0x2d3324['id']];
    if (!_0x1f1c0b) return [];
    const _0xe0d8e7 = _0x2293dc ? _0x3581dd(0x1a3) : _0x3581dd(0x130),
      _0x4ccf5e = _0x3581dd(0x160)[_0x3581dd(0x17b)](_0xe0d8e7, _0x1969d9[_0x3581dd(0x104)](0x0)[_0x3581dd(0x1d7)]() + _0x1969d9[_0x3581dd(0x124)](0x1));
    if (!_0x1f1c0b[_0x4ccf5e]) return [];
    let _0x44dd1b = [];
    if (_0x1969d9 === _0x3581dd(0x146)) _0x44dd1b = $dataItems;
    if (_0x1969d9 === 'weapon') _0x44dd1b = $dataWeapons;
    if (_0x1969d9 === _0x3581dd(0x152)) _0x44dd1b = $dataArmors;
    const _0x45e707 = [];
    for (const _0x34c123 in _0x1f1c0b[_0x4ccf5e]) {
      const _0x14a3bc = Number(_0x34c123),
        _0x5ba063 = _0x44dd1b[_0x14a3bc];
      if (!_0x5ba063) continue;
      const _0x538e75 = [_0x5ba063];
      _0x538e75[_0x3581dd(0x105)](_0x1f1c0b[_0x4ccf5e][_0x34c123]), _0x45e707[_0x3581dd(0x105)](_0x538e75);
    }
    return _0x45e707;
  }),
  (VisuMZ['MoreCurrencies']['GetShopNumberIngredientVariables'] = function (_0x2c57c1, _0x5be09b, _0x9634e1) {
    const _0x2161fe = _0x5c104d;
    if (!_0x2c57c1) return [];
    const _0x4444d4 = DataManager[_0x2161fe(0xf9)](_0x2c57c1);
    if (!_0x4444d4) return [];
    const _0x517024 = _0x4444d4[_0x2c57c1['id']];
    if (!_0x517024) return [];
    const _0xe4963e = _0x9634e1 ? 'sell' : 'buy',
      _0x421f80 = '%1%2Costs'['format'](_0xe4963e, _0x5be09b[_0x2161fe(0x104)](0x0)[_0x2161fe(0x1d7)]() + _0x5be09b['slice'](0x1));
    if (!_0x517024[_0x421f80]) return [];
    const _0x24bc92 = [];
    for (const _0x224635 in _0x517024[_0x421f80]) {
      const _0x2e93c3 = Number(_0x224635);
      if ($dataSystem[_0x2161fe(0x1a7)]['length'] <= _0x2e93c3) continue;
      const _0x4bf85c = [_0x2161fe(0xf8)];
      _0x4bf85c[_0x2161fe(0x105)](_0x517024[_0x421f80][_0x224635]), _0x4bf85c[_0x2161fe(0x105)](_0x2e93c3), _0x24bc92[_0x2161fe(0x105)](_0x4bf85c);
    }
    return _0x24bc92;
  }),
  (VisuMZ[_0x5c104d(0x17a)]['GetShopNumberIngredientGold'] = function () {
    const _0xa30571 = _0x5c104d,
      _0x186f56 = SceneManager[_0xa30571(0x103)][_0xa30571(0x138)][_0xa30571(0xe5)];
    return [_0xa30571(0x1d5), _0x186f56];
  });
