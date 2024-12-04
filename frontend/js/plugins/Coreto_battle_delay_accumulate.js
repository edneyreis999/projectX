//=============================================================================
// RPG Maker MZ - Coreto Battle Delay Accumulate
// Coreto_Battle_Delay_Accumulate.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Handles the accumulation of battles into the Dimengeon item, leveraging shared state and global parameters.
 * @help
 * ----------------------------------------------------------------------------
 * This module is responsible for:
 * - Tracking and managing accumulated battles in the Dimengeon system.
 * - Simulating battle transitions when battles are accumulated.
 * ----------------------------------------------------------------------------
 * Features:
 * - Validates if battles should be accumulated.
 * - Adds battles to the Dimengeon queue.
 * - Manages enemy tracking and capacity.
 * ----------------------------------------------------------------------------
 * @author Edney Antonio Reis Filho
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay_Accumulate';

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
  window.CoretoBattleAccumulate = {
    shouldAccumulateBattle,
    canAccumulateEnemies,
    accumulateBattle,
    playBattleTransition,
    showDimengeonCapacity,
    isNewEncounter,
    registerEncounteredEnemies,
  };

  // Override the troop encounter logic to enable battle accumulation
  const _Game_Player_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
  Game_Player.prototype.makeEncounterTroopId = function () {
    const troopId = _Game_Player_makeEncounterTroopId.call(this);

    if (shouldAccumulateBattle(troopId)) {
      if (isNewEncounter(troopId)) {
        registerEncounteredEnemies(troopId);
        console.log('Primeira vez encontrando inimigos desta tropa.');
        return troopId; // First-time encounter, proceed with battle
      } else if (canAccumulateEnemies(troopId)) {
        console.log('Batalha acumulada no Dimengeon:', troopId);
        accumulateBattle(troopId);
        return 0; // Accumulate battle and cancel encounter
      } else {
        console.log('Capacidade do Dimengeon cheia, batalha ocorrendo normalmente.');
        return troopId; // Dimengeon is full, proceed with battle
      }
    }

    return troopId; // Default behavior for non-Dimengeon encounters
  };

  /**
   * Determines if a battle should be accumulated.
   * @param {number} troopId - ID of the troop.
   * @returns {boolean} True if the battle should be accumulated.
   */
  function shouldAccumulateBattle(troopId) {
    return $gameParty.hasItem($dataItems[state.DimengeonID]) && troopId > 0;
  }

  /**
   * Checks if there is enough space in the Dimengeon to accumulate enemies.
   * @param {number} troopId - ID of the troop.
   * @returns {boolean} True if there is space in the Dimengeon.
   */
  function canAccumulateEnemies(troopId) {
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    return state.accumulatedEnemies + totalEnemies <= state.maxEnemiesCapacity;
  }

  /**
   * Adds a battle to the Dimengeon queue and updates the accumulated enemy count.
   * Simulates the battle transition effects without starting the battle.
   * @param {number} troopId - ID of the troop.
   */
  function accumulateBattle(troopId) {
    state.accumulatedBattles.push(troopId);
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    state.accumulatedEnemies += totalEnemies;

    // Simulate battle entry effects
    playBattleTransition();

    // Display Dimengeon capacity
    showDimengeonCapacity();

    console.log(`[${pluginName}] Batalha acumulada: ${troopId}`);
  }

  /**
   * Simulates the visual and audio effects of a battle transition.
   */
  function playBattleTransition() {
    AudioManager.playSe({ name: 'Battle1', volume: 90, pitch: 100, pan: 0 });
    $gameScreen.startFlash([255, 255, 255, 255], 60);
  }

  /**
   * Displays the current capacity of the Dimengeon in the message window.
   */
  function showDimengeonCapacity() {
    const message = `Capacidade do Dimengeon: ${state.accumulatedEnemies}/${state.maxEnemiesCapacity}`;
    $gameMessage.add(message);
  }

  /**
   * Checks if a troop contains any enemies that have not been encountered before.
   * @param {number} troopId - ID of the troop.
   * @returns {boolean} True if any enemy in the troop is new.
   */
  function isNewEncounter(troopId) {
    const troop = $dataTroops[troopId];
    return troop.members.some(member => {
      const enemy = $dataEnemies[member.enemyId];
      return enemy && !state.encounteredEnemies.has(member.enemyId);
    });
  }

  /**
   * Registers all enemies in a troop as encountered.
   * @param {number} troopId - ID of the troop.
   */
  function registerEncounteredEnemies(troopId) {
    const troop = $dataTroops[troopId];
    troop.members.forEach(member => {
      if ($dataEnemies[member.enemyId]) {
        state.encounteredEnemies.add(member.enemyId);
      }
    });
  }
})();
