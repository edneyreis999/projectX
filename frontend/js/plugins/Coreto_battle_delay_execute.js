//=============================================================================
// RPG Maker MZ - Coreto Battle Delay Execute
// Coreto_Battle_Delay_Execute.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Manages the dynamic execution of accumulated battles in the Dimengeon system.
 * @author Edney Antonio Reis Filho
 *
 * @help
 * ----------------------------------------------------------------------------
 * This module dynamically executes accumulated battles in the Dimengeon system.
 * Features:
 * - Sequential execution of battles with reinforcement logic.
 * - Dynamic addition of troops respecting battlefield constraints.
 * - Resets the Dimengeon state upon completion of all battles.
 * ----------------------------------------------------------------------------
 * Usage:
 * - Link a Common Event to the Dimengeon item.
 * - Call the `cleanDimengeon` function from the Common Event.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay_Execute';

  // Validate shared state initialization
  if (!window.CoretoBattleState) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_State.js`);
  }

  // Expose functionality globally
  window.CoretoBattleExecute = {
    cleanDimengeon,
    executeDynamicBattle,
    resetDimengeon,
    hasAccumulatedBattles,
  };

  /**
   * Maximum number of enemies allowed on the battlefield at once.
   * @const {number}
   */
  const MAX_ENEMIES_ON_FIELD = 8;

  /**
   * Initiates the Dimengeon battles by executing accumulated battles dynamically.
   */
  function cleanDimengeon() {
    if (hasAccumulatedBattles()) {
      $gameMessage.add('Iniciando as batalhas acumuladas!');
      executeDynamicBattle();
    } else {
      $gameMessage.add('Nenhuma batalha acumulada para lutar.');
    }
  }

  /**
   * Executes dynamic battles with troop reinforcements based on specific rules.
   */
  function executeDynamicBattle() {
    console.log('[Coreto Battle Delay] Starting dynamic battle execution.');

    const { accumulatedBattles } = window.CoretoBattleState;

    if (accumulatedBattles.length === 0) {
      console.log('[Coreto Battle Delay] No accumulated battles to process.');
      resetDimengeon();
      return;
    }

    const firstTroopId = accumulatedBattles.shift();
    console.log(`[Coreto Battle Delay] Setting up first troop: ${firstTroopId}`);
    $gameTroop.setup(firstTroopId);
    BattleManager.setup(firstTroopId, true, false);

    // Hook into the turn-end logic to check for reinforcements.
    const originalUpdateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function () {
      console.log('[Coreto Battle Delay] Turn ended. Checking reinforcements...');
      handleReinforcements();
      originalUpdateTurnEnd.call(this);
    };

    // Hook into battle end logic to prevent premature endings.
    const originalCheckBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function () {
      console.log('[Coreto Battle Delay] Checking if battle should end...');
      if (shouldAddReinforcements()) {
        console.log('[Coreto Battle Delay] Preventing battle end to add reinforcements.');
        handleReinforcements();
        return false;
      }

      if (noMoreReinforcements()) {
        console.log('[Coreto Battle Delay] All troops defeated. Resetting Dimengeon.');
        resetDimengeon();
      }

      return originalCheckBattleEnd.call(this);
    };

    SceneManager.push(Scene_Battle);
  }

  /**
   * Determines if new reinforcements should be added to the battle.
   * @returns {boolean} - True if there are accumulated battles and space on the field.
   */
  function shouldAddReinforcements() {
    const { accumulatedBattles } = window.CoretoBattleState;
    const currentEnemies = $gameTroop.members().filter(enemy => enemy.isAlive()).length;
    const nextTroopId = accumulatedBattles[0];
    const nextTroopSize = getTroopSize(nextTroopId);

    return currentEnemies === 0 && accumulatedBattles.length > 0 && currentEnemies + nextTroopSize <= MAX_ENEMIES_ON_FIELD;
  }

  /**
   * Handles the logic to add reinforcements if conditions are met.
   */
  function handleReinforcements() {
    const { accumulatedBattles } = window.CoretoBattleState;

    if (!shouldAddReinforcements()) {
      console.log('[Coreto Battle Delay] No reinforcements to add.');
      return;
    }

    const nextTroopId = accumulatedBattles.shift();
    console.log(`[Coreto Battle Delay] Adding troop: ${nextTroopId}`);
    window.CoretoEnemyReinforcements.addEnemyTroop(nextTroopId);
    BattleManager.refreshEnemyReinforcements();
  }

  /**
   * Checks if there are no more reinforcements or battles to process.
   * @returns {boolean} - True if there are no more accumulated battles or enemies.
   */
  function noMoreReinforcements() {
    const { accumulatedBattles } = window.CoretoBattleState;
    const currentEnemies = $gameTroop.members().filter(enemy => enemy.isAlive()).length;
    return currentEnemies === 0 && accumulatedBattles.length === 0;
  }

  /**
   * Gets the size of a troop (number of enemies in the troop).
   * @param {number} troopId - The ID of the troop.
   * @returns {number} - The number of enemies in the troop.
   */
  function getTroopSize(troopId) {
    if (!troopId) return 0;
    const troop = $dataTroops[troopId];
    return troop ? troop.members.length : 0;
  }

  /**
   * Resets the Dimengeon system after all battles are completed.
   */
  function resetDimengeon() {
    const state = window.CoretoBattleState;

    state.accumulatedEnemies = 0;
    state.accumulatedBattles.length = 0;

    console.log('[Coreto Battle Delay] Dimengeon has been reset.');
  }

  /**
   * Checks if there are any battles accumulated in the Dimengeon.
   * @returns {boolean} - True if battles are accumulated.
   */
  function hasAccumulatedBattles() {
    const { accumulatedBattles } = window.CoretoBattleState;
    return accumulatedBattles.length > 0;
  }
})();
