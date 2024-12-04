//=============================================================================
// RPG Maker MZ - Coreto Battle Delay
// Coreto_Battle_Delay.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Manages the core logic for the Dimengeon system, including shared state initialization and module dependencies.
 * @author Edney Antonio Reis Filho
 *
 * @help
 * ----------------------------------------------------------------------------
 * This plugin serves as the central core for the Dimengeon system.
 * It ensures:
 * - Proper initialization of shared state.
 * - Validation and loading of dependent modules.
 * - Access to global parameters for customization.
 * ----------------------------------------------------------------------------
 * Parameters:
 * - DimengeonID: The ID of the Dimengeon item in the database.
 *
 * Modules Required:
 * - Coreto_Battle_Delay_State.js: Manages the shared state.
 * - Coreto_Battle_Delay_Accumulate.js: Handles battle accumulation.
 * - Coreto_Battle_Delay_Execute.js: Handles battle execution.
 * ----------------------------------------------------------------------------
 * @param DimengeonID
 * @type item
 * @text ID do Item Dimengeon
 * @desc O ID do item Dimengeon no banco de dados.
 * @default 21
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay';

  // Parameters Initialization
  // Fetch parameters defined in the Plugin Manager
  const parameters = PluginManager.parameters(pluginName);

  /**
   * ID of the Dimengeon item from the database.
   * Defaults to 21 if not specified in the parameters.
   * @type {number}
   */
  const DimengeonID = Number(parameters['DimengeonID'] || 21);

  // Validate the shared state initialization
  if (!window.CoretoBattleState) {
    throw new Error(`[${pluginName}] Missing dependency: Coreto_Battle_Delay_State.js`);
  }

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
    DimengeonID, // ID of the Dimengeon item
  });

  console.log(`[${pluginName}] Dependencies validated and state extended.`);
})();
