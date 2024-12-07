//=============================================================================
// RPG Maker MZ - Coreto Warp
// Coreto_Warp.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Adds a Coreto teleport command to the menu and allows saving and returning to a previous location.
 * @author [Seu Nome]
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
 * 
 * Features:
 * - Adds a menu command for Coreto teleportation.
 * - Saves the player's location before teleporting.
 * - Returns the player to the previous location.
 *
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_warp';

  const parameters = PluginManager.parameters(pluginName);

  const commandName = parameters['commandName'] || 'Coreto';
  const coretoMapID = Number(parameters['coretoMapID']) || 1;
  const coretoMapX = Number(parameters['coretoMapX']) || 1;
  const coretoMapY = Number(parameters['coretoMapY']) || 1;
  const coretoDirection = Number(parameters['coretoDirection']) || 2;

  // Shared state to track the previous location
  const previousLocation = {
    mapId: null,
    x: null,
    y: null,
    direction: null,
  };

  // State to enable or disable the Coreto warp
  let coretoWarpEnabled = true;

  /**
   * Teleports the player to the Coreto map and saves their current location.
   */
  function warpToCoreto() {
    if ($gameMap.mapId() === coretoMapID) {
      console.warn('[Coreto Warp] Already in Coreto map.');
      return;
    }

    previousLocation.mapId = $gameMap.mapId();
    previousLocation.x = $gamePlayer.x;
    previousLocation.y = $gamePlayer.y;
    previousLocation.direction = $gamePlayer.direction();

    AudioManager.playSe({ name: 'Book1', volume: 90, pitch: 100, pan: 0 });

    $gamePlayer.reserveTransfer(coretoMapID, coretoMapX, coretoMapY, coretoDirection);
    SceneManager.goto(Scene_Map);
  }

  /**
   * Returns the player to their saved location.
   */
  function returnFromCoreto() {
    if (previousLocation.mapId !== null) {
      AudioManager.playSe({ name: 'Decision2', volume: 90, pitch: 120, pan: 0 });
      $gamePlayer.reserveTransfer(previousLocation.mapId, previousLocation.x, previousLocation.y, previousLocation.direction);
      SceneManager.goto(Scene_Map);
    } else {
      $gameMessage.add('Nenhuma localização anterior foi salva.');
      console.warn('[Coreto Warp] No previous location saved.');
    }
  }

  /**
   * Enables the Coreto warp command.
   */
  function enableCoretoWarp() {
    coretoWarpEnabled = true;
    console.log('[Coreto Warp] Enabled.');
  }

  /**
   * Disables the Coreto warp command.
   */
  function disableCoretoWarp() {
    coretoWarpEnabled = false;
    console.log('[Coreto Warp] Disabled.');
  }

  // Extend the menu system to include the Coreto warp command
  const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_addOriginalCommands.call(this);

    // Add the Coreto warp command only if enabled and not already in Coreto
    if (coretoWarpEnabled && $gameMap.mapId() !== coretoMapID) {
      this.addCommand(commandName, 'coreto', true);
    }
  };

  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('coreto', this.commandCoreto.bind(this));
  };

  Scene_Menu.prototype.commandCoreto = function () {
    warpToCoreto();
  };

  // Export global functions for flexibility
  window.CoretoWarp = {
    warpToCoreto,
    returnFromCoreto,
    enableCoretoWarp,
    disableCoretoWarp,
  };

  console.log(`[${pluginName}] Coreto Warp initialized.`);
})();
