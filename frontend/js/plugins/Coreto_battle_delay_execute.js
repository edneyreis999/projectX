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

  // Expose functionality globally
  window.CoretoBattleExecute = {
    cleanDimengeon,
    executeDynamicBattle,
    resetDimengeon,
    hasAccumulatedBattles,
  };

  /**
   * Maximum number of enemies allowed on the battlefield at once.
   * @type {number}
   */
  const MAX_ENEMIES_ON_FIELD = 8;

  /**
   * Handles the execution of the dynamic battle.
   * Starts with the first troop and dynamically adds more enemies.
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
   * Manages the dynamic battle system.
   */
  function executeDynamicBattle() {
    console.log('[Coreto Battle Delay] Starting dynamic battle execution.');

    const { accumulatedBattles } = window.CoretoBattleState;

    if (accumulatedBattles.length === 0) {
      console.log('[Coreto Battle Delay] No accumulated battles to process.');
      return;
    }

    // Load the first troop
    const firstTroopId = accumulatedBattles.shift();
    console.log(`[Coreto Battle Delay] Setting up first troop: ${firstTroopId}`);
    $gameTroop.setup(firstTroopId);
    BattleManager.setup(firstTroopId, true, false);

    // Monitor enemy count and add reinforcements when needed
    const checkReinforcements = () => {
      console.log('[Coreto Battle Delay] Checking reinforcements...');
      const currentEnemies = $gameTroop.members().filter(enemy => enemy.isAlive()).length;

      if (currentEnemies === 0) {
        console.log('[Coreto Battle Delay] Current troop defeated.');

        if (accumulatedBattles.length > 0) {
          // Add next troop if there's room on the battlefield
          const nextTroopId = accumulatedBattles.shift();
          console.log(`[Coreto Battle Delay] Adding troop: ${nextTroopId}`);

          window.CoretoEnemyReinforcements.addEnemyTroop(nextTroopId);
          BattleManager.refreshEnemyReinforcements();
        } else {
          // All battles are finished, reset Dimengeon
          console.log('[Coreto Battle Delay] All battles finished. Resetting Dimengeon.');
          resetDimengeon();
        }
      }
    };

    // Hook into battle turn-end logic
    const originalUpdateTurnEnd = BattleManager.updateTurnEnd;
    BattleManager.updateTurnEnd = function () {
      console.log('[Coreto Battle Delay] Turn ended. Checking reinforcements...');
      checkReinforcements();
      originalUpdateTurnEnd.call(this);
    };

    // Hook into battle end logic to prevent premature end
    const originalCheckBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function () {
      console.log('[Coreto Battle Delay] Checking if battle should end...');
      const currentEnemies = $gameTroop.members().filter(enemy => enemy.isAlive()).length;

      if (currentEnemies === 0 && accumulatedBattles.length > 0) {
        console.log('[Coreto Battle Delay] Preventing battle end to add reinforcements.');
        checkReinforcements();
        return false; // Prevent the battle from ending
      }

      if (currentEnemies === 0 && accumulatedBattles.length === 0) {
        console.log('[Coreto Battle Delay] No more reinforcements. Resetting Dimengeon.');
        resetDimengeon();
      }

      return originalCheckBattleEnd.call(this); // Default behavior
    };

    SceneManager.push(Scene_Battle);
  }

  /**
   * Resets the Dimengeon system after battles are completed.
   * Updates the shared state to reflect the reset.
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
