//=============================================================================
// RPG Maker MZ - Coreto Battle Delay State
// Coreto_Battle_Delay_State.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Initializes the shared state for the Coreto Battle Delay system, required by all modules.
 * @help
 * ----------------------------------------------------------------------------
 * This plugin initializes the shared global state for the Coreto Battle Delay
 * system, ensuring consistent data management across modules.
 * ----------------------------------------------------------------------------
 * Features:
 * - Stores configuration and runtime data (e.g., accumulated battles).
 * - Accessible from all modules via the `CoretoBattleState` global object.
 * - Automatically saved and loaded with game progress.
 * ----------------------------------------------------------------------------
 * @author Edney Antonio Reis Filho
 */

/**
 * @typedef {Object} CoretoBattleState
 * @property {number} BattleDelayID - ID of the BattleDelay item in the database.
 * @property {number} maxEnemiesCapacity - Maximum number of enemies that can be accumulated.
 * @property {number} accumulatedEnemies - Current total of accumulated enemies.
 * @property {number[]} accumulatedBattles - List of troop IDs for accumulated battles.
 * @property {Set<number>} encounteredEnemies - Set of enemy IDs already encountered.
 */

(() => {
  /**
   * Initializes the shared state for the Coreto Battle Delay system.
   * @type {CoretoBattleState}
   */
  const initialState = {
    BattleDelayID: 21, // Default ID for the BattleDelay item
    maxEnemiesCapacity: 10, // Initial maximum capacity for accumulated enemies
    accumulatedEnemies: 0, // Current count of accumulated enemies
    accumulatedBattles: [], // Array of troop IDs representing accumulated battles
    encounteredEnemies: new Set(), // Set of IDs for enemies already encountered
    itemLevel: 1, // Initial level
  };

  // Define o estado inicial
  window.CoretoBattleState = { ...initialState };

  console.log('Coreto Battle State initialized.');

  // Sobrescreve o sistema de save para incluir o estado
  const _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    const contents = _DataManager_makeSaveContents.call(this);
    contents.CoretoBattleState = {
      ...window.CoretoBattleState,
      encounteredEnemies: Array.from(window.CoretoBattleState.encounteredEnemies), // Salva como array
    };
    return contents;
  };

  const _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    if (contents.CoretoBattleState) {
      window.CoretoBattleState = {
        ...contents.CoretoBattleState,
        encounteredEnemies: new Set(contents.CoretoBattleState.encounteredEnemies), // Restaura como Set
      };
      console.log('[Coreto Battle Delay State] Restored state from save:', window.CoretoBattleState);
    } else {
      window.CoretoBattleState = { ...initialState };
      console.warn('[Coreto Battle Delay State] State missing in save, reinitializing to defaults.');
    }
  };
})();
