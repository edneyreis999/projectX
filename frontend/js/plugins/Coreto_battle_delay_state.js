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
 * ----------------------------------------------------------------------------
 * @author Edney Antonio Reis Filho
 */

/**
 * @typedef {Object} CoretoBattleState
 * @property {number} DimengeonID - ID of the Dimengeon item in the database.
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
  window.CoretoBattleState = {
    DimengeonID: 21, // Default ID for the Dimengeon item
    maxEnemiesCapacity: 10, // Initial maximum capacity for accumulated enemies
    accumulatedEnemies: 0, // Current count of accumulated enemies
    accumulatedBattles: [], // Array of troop IDs representing accumulated battles
    encounteredEnemies: new Set(), // Set of IDs for enemies already encountered
  };

  console.log('Coreto Battle State initialized.');
})();
