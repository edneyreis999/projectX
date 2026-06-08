//=============================================================================
// RPG Maker MZ - Coreto MultiStateIcons
// Coreto_MultiStateIcons.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Exibe multiplos state icons simultaneamente acima dos battlers
 * @author Edney Antonio Reis Filho
 * @version 0.1.0
 *
 * @param maxIcons
 * @text Max Icons
 * @type number
 * @min 1
 * @max 10
 * @default 4
 * @desc Quantos icones exibir simultaneamente por battler.
 *
 * @param animationWait
 * @text Animation Wait
 * @type number
 * @min 10
 * @max 120
 * @default 40
 * @desc Frames entre ciclos de paginacao.
 *
 * @param throttleFrames
 * @text Throttle Frames
 * @type number
 * @min 1
 * @max 60
 * @default 15
 * @desc Frames entre checagens de mudanca de states.
 *
 * @help
 * ----------------------------------------------------------------------------
 * **Coreto MultiStateIcons**
 * ----------------------------------------------------------------------------
 * Substitui Sprite_StateIcon por sistema que exibe multiplos icones
 * simultaneamente, com paginacao automatica.
 *
 * Deve estar APOS todos os plugins VisuStella no Plugin Manager.
 *
 * Notetags:
 *
 *   <MultiStateIcons Exclude>
 *   - Usada em: States
 *   - Exclui o state dos icones multiplos, mesmo tendo iconIndex.
 *   - States com <Exclude From Tooltips> tambem sao excluidos automaticamente.
 */

(() => {
    "use strict";

    const pluginName = "Coreto_MultiStateIcons";
    const P = PluginManager.parameters(pluginName);
    const MAX_ICONS = Number(P["maxIcons"] || 4);
    const ANIMATION_WAIT = Number(P["animationWait"] || 40);
    const THROTTLE_FRAMES = Number(P["throttleFrames"] || 15);

    // -------------------------------------------------------------------------
    // MSI Members
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiInitMembers = function () {
        this._msiChildren = [];
        this._msiEntries = [];
        this._msiLastEntries = null;
        this._msiThrottleCount = 0;
        this._msiPage = 0;
        this._msiPageTimer = 0;
        this._msiPoolReady = false;
    };

    // -------------------------------------------------------------------------
    // Pool
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiEnsurePool = function () {
        if (this._msiPoolReady) return true;
        // VisuStella CoreEngine replaces bitmap with 32x32 blit target.
        // Load the real IconSet for children.
        const iconSet = ImageManager.loadSystem("IconSet");
        if (!iconSet.isReady()) return false;

        for (let i = 0; i < MAX_ICONS; i++) {
            const child = new Sprite(iconSet);
            child.anchor.x = 0.5;
            child.anchor.y = 0.5;
            child.visible = false;
            this.addChild(child);
            this._msiChildren.push(child);
        }

        this._msiPoolReady = true;
        return true;
    };

    // -------------------------------------------------------------------------
    // Is Excluded
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiIsExcluded = function (state) {
        if (state.meta["Exclude From Tooltips"]) return true;
        if (state.meta["MultiStateIcons Exclude"]) return true;
        return false;
    };

    // -------------------------------------------------------------------------
    // Collect Entries
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiCollectEntries = function () {
        if (!this.shouldDisplay()) return [];

        const battler = this._battler;
        const entries = [];

        // States
        const states = battler.states();
        for (const state of states) {
            if (state.iconIndex > 0 && !this._msiIsExcluded(state)) {
                entries.push({
                    iconIndex: state.iconIndex,
                    kind: "state",
                    state: state,
                });
            }
        }

        // Buffs / Debuffs
        for (let i = 0; i < battler._buffs.length; i++) {
            const level = battler._buffs[i];
            if (level !== 0) {
                entries.push({
                    iconIndex: battler.buffIconIndex(level, i),
                    kind: level > 0 ? "buff" : "debuff",
                    paramId: i,
                });
            }
        }

        return entries;
    };

    // -------------------------------------------------------------------------
    // Override: initialize
    // -------------------------------------------------------------------------
    const _msi_Sprite_StateIcon_initialize =
        Sprite_StateIcon.prototype.initialize;
    Sprite_StateIcon.prototype.initialize = function () {
        _msi_Sprite_StateIcon_initialize.call(this);
        this._msiInitMembers();
    };

    // -------------------------------------------------------------------------
    // Override: setup
    // -------------------------------------------------------------------------
    const _msi_Sprite_StateIcon_setup = Sprite_StateIcon.prototype.setup;
    Sprite_StateIcon.prototype.setup = function (battler) {
        const changed = this._battler !== battler;
        _msi_Sprite_StateIcon_setup.call(this, battler);
        if (changed) {
            this._msiPage = 0;
            this._msiPageTimer = 0;
            this._msiLastEntries = null;
        }
    };

    // -------------------------------------------------------------------------
    // Override: update
    // -------------------------------------------------------------------------
    const _msi_Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function () {
        Sprite.prototype.update.call(this);
        if (!this._msiEnsurePool()) return;

        this._msiThrottleCount++;
        if (this._msiThrottleCount >= THROTTLE_FRAMES) {
            this._msiThrottleCount = 0;
            this._msiUpdateIcons();
        }
    };

    // -------------------------------------------------------------------------
    // MSI Update Icons
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiUpdateIcons = function () {
        const entries = this._msiCollectEntries();

        // Cache check - skip if unchanged
        const key = entries.map((e) => e.iconIndex).join(",");
        if (key === this._msiLastEntries && entries.length > 0) {
            this._msiUpdatePagination();
            return;
        }
        this._msiLastEntries = key;
        this._msiEntries = entries;

        // Reset page if entries shrunk
        const totalPages = Math.ceil(entries.length / MAX_ICONS) || 1;
        if (this._msiPage >= totalPages) {
            this._msiPage = 0;
        }

        this._msiRenderCurrentPage();
    };

    // -------------------------------------------------------------------------
    // Pagination
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiUpdatePagination = function () {
        if (this._msiEntries.length <= MAX_ICONS) return;

        this._msiPageTimer++;
        if (this._msiPageTimer >= ANIMATION_WAIT) {
            this._msiPageTimer = 0;
            this._msiPage++;
            const totalPages = Math.ceil(
                this._msiEntries.length / MAX_ICONS
            );
            if (this._msiPage >= totalPages) {
                this._msiPage = 0;
            }
            this._msiRenderCurrentPage();
        }
    };

    // -------------------------------------------------------------------------
    // Render Current Page
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiRenderCurrentPage = function () {
        const entries = this._msiEntries;
        const start = this._msiPage * MAX_ICONS;
        const pageEntries = entries.slice(start, start + MAX_ICONS);
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;

        for (let i = 0; i < this._msiChildren.length; i++) {
            const child = this._msiChildren[i];
            if (i < pageEntries.length) {
                const entry = pageEntries[i];
                const sx = (entry.iconIndex % 16) * pw;
                const sy = Math.floor(entry.iconIndex / 16) * ph;
                child.setFrame(sx, sy, pw, ph);
                child.x = i * (pw + 2);
                child.visible = true;
            } else {
                child.visible = false;
            }
        }

        // Update _iconIndex for opacity compatibility with VisuStella BattleCore
        this._iconIndex = entries.length > 0 ? entries[0].iconIndex : 0;

        // Opacity control (VisuStella BattleCore behavior)
        this.opacity = this._iconIndex > 0 ? 255 : 0;
    };
})();
