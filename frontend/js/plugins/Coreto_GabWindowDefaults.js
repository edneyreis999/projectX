/*:
 * @target MZ
 * @plugindesc Ajustes visuais e de ancoragem padrão para VisuMZ Gab Window.
 * @author Coreto
 *
 * @param MapTargetGap
 * @text Distância acima do sprite
 * @type number
 * @min 0
 * @default 8
 * @desc Pixels lógicos adicionais entre o topo do sprite e a janela Gab.
 *
 * @help
 * Carregue depois de VisuMZ_4_GabWindow. Este plugin afeta somente Window_Gab.
 */

(() => {
    "use strict";

    if (typeof Window_Gab === "undefined") return;

    const pluginName = "Coreto_GabWindowDefaults";
    const parameters = PluginManager.parameters(pluginName);
    const mapTargetGap = Math.max(0, Number(parameters.MapTargetGap || 8));
    const previousReposition = Window_Gab.prototype.repositionToMapTarget;
    const previousResetTextColor = Window_Gab.prototype.resetTextColor;

    Window_Gab.prototype.resetTextColor = function() {
        if (previousResetTextColor) previousResetTextColor.call(this);
        if (!this.contents) return;
        this.contents.textColor = "#ffffff";
        this.contents.outlineColor = "rgba(0, 0, 0, 0)";
        this.contents.outlineWidth = 0;
    };

    Window_Gab.prototype.repositionToMapTarget = function() {
        if (previousReposition) previousReposition.call(this);
        const scene = SceneManager._scene;
        const sprites = scene && scene._spriteset && scene._spriteset._characterSprites;
        const target = this._lockedToTarget;
        if (!target || !Array.isArray(sprites)) return;
        const sprite = sprites.find(candidate => candidate && candidate._character === target);
        const zoom = $gameScreen && $gameScreen.zoomScale ? $gameScreen.zoomScale() : 1;
        const spriteHeight = sprite && sprite.patternHeight ? sprite.patternHeight() : $gameMap.tileHeight();
        const screenY = target.screenY ? target.screenY() : 0;
        const targetBottom = screenY - (spriteHeight + mapTargetGap) * zoom;
        this.y = Math.max(0, targetBottom - this.height);
    };
})();
