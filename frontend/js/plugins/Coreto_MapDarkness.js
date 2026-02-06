//=============================================================================
// Coreto_MapDarkness.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc [Coreto] Darkens map 25 and shows a small flashlight radius around the player.
 * @author Coreto
 *
 * @help
 * This plugin applies a full-screen darkness overlay on map 25 with a small
 * circular hole centered on the player to simulate a flashlight.
 *
 * No plugin commands.
 */

(() => {
  'use strict';

  const MAP_ID = 25;
  const LIGHT_RADIUS = 64;
  const DARK_ALPHA = 0.95;

  const _Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
  Spriteset_Map.prototype.createUpperLayer = function () {
    _Spriteset_Map_createUpperLayer.call(this);
    this.createCoretoMapDarkness();
  };

  Spriteset_Map.prototype.createCoretoMapDarkness = function () {
    if ($gameMap.mapId() !== MAP_ID) {
      this._coretoMapDarkness = null;
      return;
    }

    const graphics = new PIXI.Graphics();
    graphics.z = 999;
    this._coretoMapDarkness = graphics;
    this._baseSprite.addChild(graphics);
    this.updateCoretoMapDarkness();
  };

  const _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    _Spriteset_Map_update.call(this);
    if (this._coretoMapDarkness) {
      this.updateCoretoMapDarkness();
    }
  };

  Spriteset_Map.prototype.updateCoretoMapDarkness = function () {
    if ($gameMap.mapId() !== MAP_ID) {
      if (this._coretoMapDarkness && this._coretoMapDarkness.parent) {
        this._coretoMapDarkness.parent.removeChild(this._coretoMapDarkness);
      }
      this._coretoMapDarkness = null;
      return;
    }

    const graphics = this._coretoMapDarkness;
    const width = Graphics.width;
    const height = Graphics.height;
    const centerX = $gamePlayer.screenX();
    const centerY = $gamePlayer.screenY() - $gameMap.tileHeight() / 2;

    graphics.clear();
    graphics.beginFill(0x000000, DARK_ALPHA);
    graphics.drawRect(0, 0, width, height);
    graphics.beginHole();
    graphics.drawCircle(centerX, centerY, LIGHT_RADIUS);
    graphics.endHole();
    graphics.endFill();
  };
})();
