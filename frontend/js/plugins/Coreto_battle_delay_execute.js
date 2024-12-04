//=============================================================================
// RPG Maker MZ - Coreto Battle Delay Execute
// Coreto_Battle_Delay_Execute.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Handles the execution of accumulated battles in the Dimengeon item, ensuring proper resets and updates to shared state data.
 * @help
 * ----------------------------------------------------------------------------
 * This module is responsible for executing all battles accumulated in the
 * Dimengeon item and resetting the system when the battles are completed.
 * ----------------------------------------------------------------------------
 * Features:
 * - Executes battles sequentially.
 * - Resets the accumulated state upon completion.
 * - Validates if the used item is the Dimengeon.
 * ----------------------------------------------------------------------------
 * @author Edney Antonio Reis Filho
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay_Execute';

  // Validate shared state initialization
  if (!window.CoretoBattleState) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_State.js`);
  }

  /**
   * Access the shared state.
   * @type {CoretoBattleState}
   */
  const state = window.CoretoBattleState;

  // Expose functionality globally
  window.CoretoBattleExecute = {
    executeAccumulatedBattles,
    resetDimengeon,
    isDimengeonItem,
    hasAccumulatedBattles,
  };

  // Override item usage to handle Dimengeon-specific functionality
  const _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
  Scene_ItemBase.prototype.useItem = function () {
    const item = this.item();

    if (isDimengeonItem(item)) {
      if (hasAccumulatedBattles()) {
        $gameMessage.add('Iniciando as batalhas acumuladas!');
        executeAccumulatedBattles.call(this);
      } else {
        $gameMessage.add('Nenhuma batalha acumulada para lutar.');
      }
    } else {
      _Scene_ItemBase_useItem.call(this);
    }
  };

  /**
   * Executes all accumulated battles sequentially.
   */
  function executeAccumulatedBattles() {
    if (hasAccumulatedBattles()) {
      const troopId = state.accumulatedBattles.shift(); // Fetch the next battle
      $gameTroop.setup(troopId);
      BattleManager.setup(troopId, true, false);
      BattleManager.setEventCallback(() => {
        executeAccumulatedBattles.call(this); // Recursively handle the next battle
      });
      SceneManager.push(Scene_Battle);
    } else {
      $gameMessage.add('Todas as batalhas foram concluídas!');
      resetDimengeon(); // Reset after all battles are completed
    }
  }

  /**
   * Resets the Dimengeon system after battles are completed.
   * Updates the shared state to reflect the reset.
   */
  function resetDimengeon() {
    state.accumulatedEnemies = 0; // Reset accumulated enemy count
    state.accumulatedBattles.length = 0; // Clear the accumulated battles list
    showDimengeonCapacity(); // Display the reset state
    console.log('[Coreto Battle Delay] Dimengeon has been reset.');
  }

  /**
   * Validates if the used item is the Dimengeon.
   * @param {object} item - The item being used.
   * @returns {boolean} - True if the item is the Dimengeon.
   */
  function isDimengeonItem(item) {
    return item && item.id === state.DimengeonID;
  }

  /**
   * Checks if there are any battles accumulated in the Dimengeon.
   * @returns {boolean} - True if battles are accumulated.
   */
  function hasAccumulatedBattles() {
    return state.accumulatedBattles.length > 0;
  }

  /**
   * Displays the current capacity of the Dimengeon on the screen.
   */
  function showDimengeonCapacity() {
    const message = `Capacidade do Dimengeon: ${state.accumulatedEnemies}/${state.maxEnemiesCapacity}`;
    $gameMessage.add(message);
  }
})();
