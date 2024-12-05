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
        console.log('TroopId da Batalha acumulada no Dimengeon:', troopId);
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
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    const { DimengeonID } = window.CoretoBattleState;
    return $gameParty.hasItem($dataItems[DimengeonID]) && troopId > 0;
  }

  /**
   * Checks if there is enough space in the Dimengeon to accumulate enemies.
   * @param {number} troopId - ID of the troop.
   * @returns {boolean} True if there is space in the Dimengeon.
   */
  function canAccumulateEnemies(troopId) {
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    const { accumulatedEnemies, maxEnemiesCapacity } = window.CoretoBattleState;
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    return accumulatedEnemies + totalEnemies <= maxEnemiesCapacity;
  }

  /**
   * Adds a battle to the Dimengeon queue and updates the accumulated enemy count.
   * Simulates the battle transition effects without starting the battle.
   * @param {number} troopId - ID of the troop.
   */
  function accumulateBattle(troopId) {
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    let state = window.CoretoBattleState;
    const { accumulatedBattles } = state;

    accumulatedBattles.push(troopId);
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    state.accumulatedEnemies += totalEnemies;

    // Simulate battle entry effects
    playBattleTransition();

    // Display Dimengeon capacity
    showDimengeonCapacity();

    console.log(`[${pluginName}] Batalha acumulada: ${state.accumulatedEnemies} troopId ${troopId}`);
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
   * The message is shown in the top-left corner of the screen, using
   * different text colors based on capacity percentage.
   */
  function showDimengeonCapacity() {
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    const { accumulatedEnemies, maxEnemiesCapacity } = window.CoretoBattleState;

    // Calculate the percentage of capacity used
    const percentage = (accumulatedEnemies / maxEnemiesCapacity) * 100;

    // Determine the color based on capacity
    let colorCode;
    if (percentage >= 80) {
      colorCode = 18; // Red
    } else if (percentage >= 50) {
      colorCode = 17; // Yellow
    } else {
      colorCode = 24; // Green
    }

    // Create the capacity message
    const message = `Capacidade do Dimengeon: \\C[${colorCode}]${accumulatedEnemies}\\C[0]/${maxEnemiesCapacity}`;
    $gameMessage.add(message);
  }

  /**
   * Checks if a troop contains any enemies that have not been encountered before.
   * @param {number} troopId - ID of the troop.
   * @returns {boolean} True if any enemy in the troop is new.
   */
  function isNewEncounter(troopId) {
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    const { encounteredEnemies } = window.CoretoBattleState;
    const troop = $dataTroops[troopId];
    return troop.members.some(member => {
      const enemy = $dataEnemies[member.enemyId];
      return enemy && !encounteredEnemies.has(member.enemyId);
    });
  }

  /**
   * Registers all enemies in a troop as encountered.
   * @param {number} troopId - ID of the troop.
   */
  function registerEncounteredEnemies(troopId) {
    /**
     * Access the shared state.
     * @type {CoretoBattleState}
     */
    const { encounteredEnemies } = window.CoretoBattleState;
    const troop = $dataTroops[troopId];
    troop.members.forEach(member => {
      if ($dataEnemies[member.enemyId]) {
        encounteredEnemies.add(member.enemyId);
      }
    });
  }
})();
