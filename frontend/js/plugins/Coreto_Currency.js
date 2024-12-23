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
 * - Allows awarding Ludos after battles based on enemy kills.
 * ----------------------------------------------------------------------------
 * Deprecation Notice:
 * This plugin is deprecated and will no longer receive updates. Moved to Visu Currency Core.
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
   * Awards Ludos instead of Gold after a victorious battle.
   */
  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function (result) {
    _BattleManager_endBattle.call(this, result);

    if (result === 0) {
      // If the player won the battle
      const goldReward = $gameTroop.goldTotal(); // Calculate total Gold reward
      if (goldReward > 0) {
        addCurrency(goldReward); // Add the Gold reward as Ludos
        $gameParty.gainGold(-goldReward); // Remove the Gold reward
      }
    }
  };

  // ==========================================================================
  // Modify Battle Victory Messages
  // ==========================================================================

  /**
   * Overrides the display of Gold reward messages with Ludos.
   */
  BattleManager.displayRewards = function () {
    this.displayExp();
    this.displayGoldAsLudos();
    this.displayDropItems();
  };

  /**
   * Replaces the Gold reward message with a Ludos message.
   */
  BattleManager.displayGoldAsLudos = function () {
    const goldReward = $gameTroop.goldTotal();
    if (goldReward > 0) {
      $gameMessage.add(`You earned ${goldReward} \\i[${currencyIcon}] ${currencyName}!`);
    }
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
