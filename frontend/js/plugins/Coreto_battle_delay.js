//=============================================================================
// RPG Maker MZ - Coreto Battle Delay
// Coreto_Battle_Delay.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Manages the core logic for the BattleDelay system, including shared state initialization and module dependencies.
 * @author Edney Antonio Reis Filho
 *
 * @help
 * ----------------------------------------------------------------------------
 * This plugin serves as the central core for the BattleDelay system.
 * It ensures:
 * - Proper initialization of shared state.
 * - Validation and loading of dependent modules.
 * - Access to global parameters for customization.
 * ----------------------------------------------------------------------------
 * Parameters:
 * - BattleDelayID: The ID of the BattleDelay item in the database.
 *
 * Modules Required:
 * - Coreto_Battle_Delay_State.js: Manages the shared state.
 * - Coreto_Battle_Delay_Accumulate.js: Handles battle accumulation.
 * - Coreto_Battle_Delay_Execute.js: Handles battle execution.
 * ----------------------------------------------------------------------------
 * @param BattleDelayID
 * @type item
 * @text ID do Item BattleDelay
 * @desc O ID do item BattleDelay no banco de dados.
 * @default 21
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay';

  // Parameters Initialization
  // Fetch parameters defined in the Plugin Manager
  const parameters = PluginManager.parameters(pluginName);

  /**
   * ID of the BattleDelay item from the database.
   * Defaults to 21 if not specified in the parameters.
   * @type {number}
   */
  const BattleDelayID = Number(parameters['BattleDelayID'] || 21);

  /**
   * Increment value for the BattleDelay capacity.
   * @const {number}
   */
  const CAPACITY_INCREMENT = 5;

  // Validate the shared state initialization
  if (!window.CoretoBattleState) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_State.js`);
  }

  window.CoretoBattleDelay = {
    upgradeBattleDelay,
    updateBattleDelayItemDescription,
    updateBattleDelayItemName,
    showBattleDelayCapacity,
    getBattleDelayItemName,
  };

  // Log the successful initialization
  console.log(`[${pluginName}] Coreto Battle Delay initialized successfully.`);

  // Validate Dependencies for Additional Modules
  if (!window.CoretoBattleAccumulate) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_Accumulate.js`);
  }
  if (!window.CoretoBattleExecute) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_Execute.js`);
  }

  // Attach Parameters to the Shared State
  // Ensure the shared state contains parameters required globally
  Object.assign(window.CoretoBattleState, {
    BattleDelayID, // ID of the BattleDelay item
  });

  /**
   * Upgrades the BattleDelay capacity.
   * Increases max capacity by a defined increment and updates item metadata.
   * Plays a victory sound and displays a celebratory message.
   */
  function upgradeBattleDelay() {
    const state = window.CoretoBattleState;

    // Increase max capacity
    state.maxEnemiesCapacity += CAPACITY_INCREMENT;
    state.itemLevel += 1;

    // Update item name and description
    updateBattleDelayItemName();
    updateBattleDelayItemDescription();

    console.log(`[${pluginName}] BattleDelay upgraded to level ${state.itemLevel}.`);

    // Play victory sound
    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

    // Display celebratory message
    const itemName = getBattleDelayItemName();
    const message = `O ${itemName} subiu para o nível ${state.itemLevel}!\n` + `Capacidade máxima aumentada para ${state.maxEnemiesCapacity}.`;

    // Use the message system to show with animation
    $gameMessage.newPage();
    $gameMessage.add('\\.' + message);
    console.log(`[${pluginName}] Celebration message displayed: ${message}`);
  }

  /**
   * Updates the BattleDelay item description based on the current state.
   */
  function updateBattleDelayItemDescription() {
    const state = window.CoretoBattleState;
    const item = $dataItems[state.BattleDelayID];

    if (item) {
      // Update item description with current capacity
      item.description = `Capacidade: ${state.accumulatedEnemies}/${state.maxEnemiesCapacity}. Use para enfrentar batalhas acumuladas.`;
      console.log(`[${pluginName}] Item ${item.name} updated: ${item.description}`);
    } else {
      console.warn(`[${pluginName}] BattleDelay item not found in the database.`);
    }
  }

  /**
   * Updates the BattleDelay item name based on the current state.
   */
  function updateBattleDelayItemName() {
    const state = window.CoretoBattleState;
    const item = $dataItems[state.BattleDelayID];

    if (item) {
      // Update item name to include level
      item.name = `Símbolo da Trégua ${state.itemLevel}`;
      console.log(`[${pluginName}] Item updated: ${item.name}`);
    } else {
      console.warn(`[${pluginName}] BattleDelay item not found in the database.`);
    }
  }

  /**
   * Displays the current capacity of the BattleDelay system.
   */
  function showBattleDelayCapacity() {
    const state = window.CoretoBattleState;
    const message = `Capacidade: ${state.accumulatedEnemies}/${state.maxEnemiesCapacity}`;

    $gameMessage.add(message);
    console.log(`[${pluginName}] Displaying capacity: ${message}`);
  }

  /**
   * Gets the name of the BattleDelay item from the database.
   * @returns {string} - The name of the item.
   */
  function getBattleDelayItemName() {
    const { BattleDelayID } = window.CoretoBattleState;
    const item = $dataItems[BattleDelayID];
    return item ? item.name : 'Item Desconhecido';
  }

  console.log(`[${pluginName}] Dependencies validated and state extended.`);
})();
