//=============================================================================
// RPG Maker MZ - Coreto Warp
// Coreto_Warp.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Adds a Coreto teleport command to the menu and allows saving and returning to a previous location.
 * @author Edney Antonio Reis Filho
 *
 * @param commandName
 * @text Menu Command Name
 * @desc Name of the command in the menu for Coreto teleportation.
 * @default Coreto
 *
 * @param coretoMapID
 * @text Coreto Map ID
 * @desc The ID of the map where the Coreto is located.
 * @type number
 * @default 1
 *
 * @param coretoMapX
 * @text Coreto Map X
 * @desc The X coordinate on the Coreto map.
 * @type number
 * @default 1
 *
 * @param coretoMapY
 * @text Coreto Map Y
 * @desc The Y coordinate on the Coreto map.
 * @type number
 * @default 1
 *
 * @param coretoDirection
 * @text Coreto Direction
 * @desc The direction the player will face when teleported to the Coreto.
 * @type select
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up
 * @value 8
 * @default 2
 *
 * @help
 * ----------------------------------------------------------------------------
 * Features:
 * - Adds a menu command for Coreto teleportation.
 * - Saves the player's location before teleporting.
 * - Returns the player to the previous location.
 * - State is saved and restored across game saves.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Warp';

  // ==========================================================================
  // Parameters and State Variables
  // ==========================================================================

  // Retrieve plugin parameters
  const parameters = PluginManager.parameters(pluginName);
  const commandName = parameters['commandName'] || 'Coreto';
  const coretoMapID = Number(parameters['coretoMapID']) || 1;
  const coretoMapX = Number(parameters['coretoMapX']) || 1;
  const coretoMapY = Number(parameters['coretoMapY']) || 1;
  const coretoDirection = Number(parameters['coretoDirection']) || 2;

  // Object to track the previous location
  const previousLocation = {
    mapId: null,
    x: null,
    y: null,
    direction: null,
  };

  // State for enabling or disabling the Coreto warp feature
  let isWarpEnabled = true;

  // ==========================================================================
  // Coreto Warp Functionality
  // ==========================================================================

  /**
   * Saves the player's current location.
   */
  function saveCurrentLocation() {
    previousLocation.mapId = $gameMap.mapId();
    previousLocation.x = $gamePlayer.x;
    previousLocation.y = $gamePlayer.y;
    previousLocation.direction = $gamePlayer.direction();
  }

  /**
   * Teleports the player to the Coreto map.
   */
  function warpToCoreto() {
    if (isAlreadyInCoreto()) {
      console.warn('[Coreto Warp] Already in Coreto map.');
      return;
    }
    saveCurrentLocation();
    playWarpSound('Book1');
    transferPlayer(coretoMapID, coretoMapX, coretoMapY, coretoDirection);
  }

  /**
   * Returns the player to their previously saved location.
   */
  function returnFromCoreto() {
    if (!isPreviousLocationSaved()) {
      console.warn('[Coreto Warp] No previous location saved.');
      $gameMessage.add('Nenhuma localização anterior foi salva.');
      return;
    }
    playWarpSound('Decision2');
    transferPlayer(previousLocation.mapId, previousLocation.x, previousLocation.y, previousLocation.direction);
  }

  /**
   * Transfers the player to the specified map and coordinates.
   * @param {number} mapId - The target map ID.
   * @param {number} x - The target X coordinate.
   * @param {number} y - The target Y coordinate.
   * @param {number} direction - The direction the player will face.
   */
  function transferPlayer(mapId, x, y, direction) {
    $gamePlayer.reserveTransfer(mapId, x, y, direction);
    SceneManager.goto(Scene_Map);
  }

  /**
   * Checks if the player is already in the Coreto map.
   * @returns {boolean} True if the player is already in Coreto.
   */
  function isAlreadyInCoreto() {
    return $gameMap.mapId() === coretoMapID;
  }

  /**
   * Checks if the player's previous location is saved.
   * @returns {boolean} True if a previous location is saved.
   */
  function isPreviousLocationSaved() {
    return previousLocation.mapId !== null;
  }

  /**
   * Plays a sound effect for the warp action.
   * @param {string} soundName - Name of the sound effect file.
   */
  function playWarpSound(soundName) {
    AudioManager.playSe({ name: soundName, volume: 90, pitch: 100, pan: 0 });
  }

  // ==========================================================================
  // Menu Integration
  // ==========================================================================

  /**
   * Adds the Coreto warp command to the menu if conditions are met.
   */
  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if (isWarpEnabled && !isAlreadyInCoreto()) {
      this.addCommand(commandName, 'coreto', true);
    }
  };

  /**
   * Sets up the menu handler for the Coreto warp command.
   */
  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('coreto', warpToCoreto);
  };

  // ==========================================================================
  // Save State Integration
  // ==========================================================================

  /**
   * Extends save data to include Coreto Warp state.
   */
  const _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    const contents = _DataManager_makeSaveContents.call(this);
    contents.CoretoWarpState = { previousLocation, isWarpEnabled };
    return contents;
  };

  /**
   * Restores Coreto Warp state from save data.
   */
  const _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    if (contents.CoretoWarpState) {
      Object.assign(previousLocation, contents.CoretoWarpState.previousLocation);
      isWarpEnabled = contents.CoretoWarpState.isWarpEnabled;
      console.log('[Coreto Warp] State restored from save:', contents.CoretoWarpState);
    } else {
      console.warn('[Coreto Warp] State missing in save, reinitializing to defaults.');
    }
  };

  // ==========================================================================
  // Exported API
  // ==========================================================================

  window.CoretoWarp = {
    warpToCoreto,
    returnFromCoreto,
    enableWarp: () => (isWarpEnabled = true),
    disableWarp: () => (isWarpEnabled = false),
  };

  console.log(`[${pluginName}] Coreto Warp initialized successfully.`);
})();
