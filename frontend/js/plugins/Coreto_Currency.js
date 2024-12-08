//=============================================================================
// RPG Maker MZ - Coreto Currency
// Coreto_Currency.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Adds a dual-currency system (Drakeis and a customizable second currency) to the game for different functionalities.
 * @author Edney Antonio Reis Filho
 *
 * @param ludosVariableID
 * @text Ludos Variable ID
 * @desc The ID of the game variable to track the amount of the second currency.
 * @type variable
 * @default 1
 *
 * @param currencyName
 * @text Currency Name
 * @desc The name of the second currency.
 * @default Ludos
 *
 * @param currencyIcon
 * @text Currency Icon
 * @desc The ID of the icon used for the second currency.
 * @type number
 * @default 1
 *
 * @help
 * ----------------------------------------------------------------------------
 * Features:
 * - Tracks the second currency (Ludos) using a game variable.
 * - Displays both Gold and Ludos in the menu interface.
 * - Allows awarding Ludos after battles based on enemy kills.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Currency';

  // Retrieve plugin parameters
  const parameters = PluginManager.parameters(pluginName);
  const ludosVariableID = Number(parameters['ludosVariableID']) || 1;
  const currencyName = parameters['currencyName'] || 'Ludos';
  const currencyIcon = Number(parameters['currencyIcon']) || 1;

  // ==========================================================================
  // Core Currency Functions
  // ==========================================================================

  /**
   * Adds a specified amount to the second currency.
   * @param {number} amount - The amount to add.
   */
  function addCurrency(amount) {
    updateCurrency(amount);
    console.log(`[Coreto Currency] Added ${amount} ${currencyName}. New total: ${getCurrency()}`);
  }

  /**
   * Deducts a specified amount from the second currency.
   * @param {number} amount - The amount to deduct.
   * @returns {boolean} Whether the deduction was successful.
   */
  function spendCurrency(amount) {
    if (getCurrency() >= amount) {
      updateCurrency(-amount);
      console.log(`[Coreto Currency] Spent ${amount} ${currencyName}. Remaining total: ${getCurrency()}`);
      return true;
    }
    console.warn(`[Coreto Currency] Not enough ${currencyName}.`);
    return false;
  }

  /**
   * Retrieves the current total of the second currency.
   * @returns {number} The current amount of the currency.
   */
  function getCurrency() {
    return $gameVariables.value(ludosVariableID) || 0;
  }

  /**
   * Updates the second currency by a specified amount.
   * @param {number} amount - The amount to add or deduct.
   */
  function updateCurrency(amount) {
    const newValue = getCurrency() + amount;
    $gameVariables.setValue(ludosVariableID, newValue);
  }

  // ==========================================================================
  // Battle Manager Modifications
  // ==========================================================================

  /**
   * Awards Ludos after a victorious battle based on the number of enemies.
   */
  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function (result) {
    _BattleManager_endBattle.call(this, result);
    if (result === 0) {
      const earnedLudos = $gameTroop.aliveMembers().length * 10; // Example logic
      addCurrency(earnedLudos);
      $gameMessage.add(`You earned ${earnedLudos} \\i[${currencyIcon}] ${currencyName}!`);
    }
  };

  // ==========================================================================
  // UI Modifications (Window_Gold)
  // ==========================================================================

  /**
   * Extends the Window_Gold to display both Gold and Ludos.
   */
  Window_Gold.prototype.refresh = function () {
    this.contents.clear();
    const x = this.itemPadding();
    const width = this.innerWidth - this.itemPadding() * 2;

    drawCurrencyRow(this, x, 0, width, `\\i[210] Drakeis`, $gameParty.gold());
    drawCurrencyRow(this, x, this.lineHeight(), width, `\\i[${currencyIcon}] ${currencyName}`, getCurrency());
  };

  /**
   * Draws a single row of currency information in the Window_Gold.
   * @param {Window_Gold} window - The target window.
   * @param {number} x - X coordinate to start drawing.
   * @param {number} y - Y coordinate to start drawing.
   * @param {number} width - Width available for drawing.
   * @param {string} text - Text to display (icon and name of the currency).
   * @param {number} value - Value of the currency.
   */
  function drawCurrencyRow(window, x, y, width, text, value) {
    const iconWidth = 36;
    const valueWidth = window.textWidth(value.toString());
    const textWidth = width - valueWidth - iconWidth - window.itemPadding() * 2;

    window.drawTextEx(text, x, y, textWidth);
    window.drawText(value.toString(), x + width - valueWidth, y, valueWidth, 'right');
  }

  // ==========================================================================
  // Scene_Menu Adjustments
  // ==========================================================================

  /**
   * Adjusts the position and size of the Gold window to fit both currencies.
   */
  const _Scene_Menu_goldWindowRect = Scene_Menu.prototype.goldWindowRect;
  Scene_Menu.prototype.goldWindowRect = function () {
    const rect = _Scene_Menu_goldWindowRect.call(this);
    rect.height += this.calcWindowHeight(1, true); // Increases height by 1 line
    rect.y -= this.calcWindowHeight(1, true); // Moves the window up
    return rect;
  };

  // ==========================================================================
  // Plugin Export
  // ==========================================================================

  window.CoretoCurrency = {
    addCurrency,
    spendCurrency,
    getCurrency,
  };

  console.log(`[${pluginName}] Coreto Currency initialized successfully.`);
})();
