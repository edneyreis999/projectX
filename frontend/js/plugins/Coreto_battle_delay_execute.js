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
 * - Called via a Common Event associated with the Dimengeon item.
 * ----------------------------------------------------------------------------
 * How to Use:
 * - Link a Common Event to the Dimengeon item in the RPG Maker database.
 * - Call the `cleanDimengeon` method from the Common Event.
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
    cleanDimengeon,
    executeAccumulatedBattles,
    resetDimengeon,
    isDimengeonItem,
    hasAccumulatedBattles,
  };

  /**
   * Handles the execution of accumulated battles.
   * To be called via a Common Event linked to the Dimengeon item.
   */
  function cleanDimengeon() {
    if (hasAccumulatedBattles()) {
      $gameMessage.add('Iniciando as batalhas acumuladas!');
      executeAccumulatedBattles();
    } else {
      $gameMessage.add('Nenhuma batalha acumulada para lutar.');
    }
  }

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
