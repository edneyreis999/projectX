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

 * @param coretoMapID
 * @text Coreto Map ID
 * @desc The ID of the map where the Coreto is located.
 * @type number
 * @default 1

 * @param coretoMapX
 * @text Coreto Map X
 * @desc The X coordinate on the Coreto map.
 * @type number
 * @default 1

 * @param coretoMapY
 * @text Coreto Map Y
 * @desc The Y coordinate on the Coreto map.
 * @type number
 * @default 1

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
 * This plugin adds a Coreto teleport option to the menu. Players can teleport
 * to the Coreto map, save their progress, and return to their original location.
 * ----------------------------------------------------------------------------
 * Features:
 * - Adds a menu command for Coreto teleportation.
 * - Saves the player's location before teleporting.
 * - Returns the player to the previous location.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_warp';

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
    if ($gameMap.mapId() === coretoMapID) {
      console.warn('[Coreto Warp] Already in Coreto map.');
      return;
    }
    saveCurrentLocation();
    playWarpSound('Book1');
    $gamePlayer.reserveTransfer(coretoMapID, coretoMapX, coretoMapY, coretoDirection);
    SceneManager.goto(Scene_Map);
  }

  /**
   * Returns the player to their previously saved location.
   */
  function returnFromCoreto() {
    if (!previousLocation.mapId) {
      console.warn('[Coreto Warp] No previous location saved.');
      $gameMessage.add('Nenhuma localização anterior foi salva.');
      return;
    }
    playWarpSound('Decision2');
    $gamePlayer.reserveTransfer(previousLocation.mapId, previousLocation.x, previousLocation.y, previousLocation.direction);
    SceneManager.goto(Scene_Map);
  }

  /**
   * Plays a sound effect for the warp action.
   * @param {string} soundName - Name of the sound effect file.
   */
  function playWarpSound(soundName) {
    AudioManager.playSe({ name: soundName, volume: 90, pitch: 100, pan: 0 });
  }

  /**
   * Enables the Coreto warp command.
   */
  function enableWarp() {
    isWarpEnabled = true;
    console.log('[Coreto Warp] Warp enabled.');
  }

  /**
   * Disables the Coreto warp command.
   */
  function disableWarp() {
    isWarpEnabled = false;
    console.log('[Coreto Warp] Warp disabled.');
  }

  /**
   * Adds the Coreto warp command to the menu if conditions are met.
   */
  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if (isWarpEnabled && $gameMap.mapId() !== coretoMapID) {
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

  // Export global functions for use in game events or scripts
  window.CoretoWarp = {
    warpToCoreto,
    returnFromCoreto,
    enableWarp,
    disableWarp,
  };

  console.log(`[${pluginName}] Coreto Warp initialized successfully.`);
})();
