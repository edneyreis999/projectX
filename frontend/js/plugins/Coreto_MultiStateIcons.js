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
 * @param BorderSettings:struct
 * @text Border Settings
 * @type struct<BorderSettings>
 * @desc Bordas coloridas ao redor dos icones por categoria.
 * @default {"EnableBorder:eval":"true","BorderThickness:num":"2","BorderRadius:num":"2","BuffBorderColor:str":"#44cc44","DebuffBorderColor:str":"#cc4444","PositiveStateBorderColor:str":"#4488cc","NegativeStateBorderColor:str":"#884444"}
 *
 * @param TurnCounterSettings:struct
 * @text Turn Counter Settings
 * @type struct<TurnCounterSettings>
 * @desc Contagem de turnos exibida no canto dos icones.
 * @default {"EnableTurnCounter:eval":"true","TurnCounterFontSize:num":"13","TurnCounterTextColor:str":"#ffffff","TurnCounterOutlineColor:str":"rgba(0, 0, 0, 0.8)","TurnCounterOutlineWidth:num":"2","TurnCounterOffsetX:num":"-2","TurnCounterOffsetY:num":"2","ShowActionBased:eval":"true"}
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
 *
 *   <Positive State>
 *   - Usada em: States
 *   - Marca o state como positivo para classificacao visual.
 *   - States sem esta tag sao classificados como NEGATIVE_STATE por padrao.
 *
 * Borders:
 *
 *   Bordas coloridas sao desenhadas ao redor de cada icone baseado na categoria:
 *   - BUFF: verde (#44cc44)
 *   - DEBUFF: vermelho (#cc4444)
 *   - POSITIVE_STATE: azul (#4488cc)
 *   - NEGATIVE_STATE: vermelho escuro (#884444)
 *
 *   Configuravel via parametros do plugin (EnableBorder, cores, espessura).
 *
 * Turn Counter:
 *
 *   Exibe a contagem de turnos restantes no canto superior direito de cada icone.
 *   - States permanentes (autoRemovalTiming=0) nao exibem contador.
 *   - States baseados em acao (autoRemovalTiming=1) podem ser configurados.
 *   - Buffs/Debuffs com turnos tambem exibem contador.
 *   - Fonte, cor, contorno e posicao sao configuraveis.
 */

(() => {
    "use strict";

    const pluginName = "Coreto_MultiStateIcons";
    const P = PluginManager.parameters(pluginName);
    const MAX_ICONS = Number(P["maxIcons"] || 4);
    const ANIMATION_WAIT = Number(P["animationWait"] || 40);
    const THROTTLE_FRAMES = Number(P["throttleFrames"] || 15);

    const BS = JSON.parse(P["BorderSettings:struct"] || "{}");
    const ENABLE_BORDER = String(BS["EnableBorder:eval"] || "true") === "true";
    const BORDER_THICKNESS = Number(BS["BorderThickness:num"] || 2);
    const BORDER_RADIUS = Number(BS["BorderRadius:num"] || 2);
    const BORDER_COLORS = {
        BUFF: parseInt(String(BS["BuffBorderColor:str"] || "#44cc44").replace("#", ""), 16),
        DEBUFF: parseInt(String(BS["DebuffBorderColor:str"] || "#cc4444").replace("#", ""), 16),
        POSITIVE_STATE: parseInt(String(BS["PositiveStateBorderColor:str"] || "#4488cc").replace("#", ""), 16),
        NEGATIVE_STATE: parseInt(String(BS["NegativeStateBorderColor:str"] || "#884444").replace("#", ""), 16),
    };

    const TC = JSON.parse(P["TurnCounterSettings:struct"] || "{}");
    const ENABLE_TURN_COUNTER = String(TC["EnableTurnCounter:eval"] || "true") === "true";
    const TC_FONT_SIZE = Number(TC["TurnCounterFontSize:num"] || 13);
    const TC_TEXT_COLOR = String(TC["TurnCounterTextColor:str"] || "#ffffff");
    const TC_OUTLINE_COLOR = String(TC["TurnCounterOutlineColor:str"] || "rgba(0, 0, 0, 0.8)");
    const TC_OUTLINE_WIDTH = Number(TC["TurnCounterOutlineWidth:num"] || 2);
    const TC_OFFSET_X = Number(TC["TurnCounterOffsetX:num"] || -2);
    const TC_OFFSET_Y = Number(TC["TurnCounterOffsetY:num"] || 2);
    const TC_SHOW_ACTION_BASED = String(TC["ShowActionBased:eval"] || "true") === "true";

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
        this._msiBorders = [];
        this._msiBorderCategories = [];
        this._msiTurnSprites = [];
        this._msiLastTurns = [];
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

            const border = new PIXI.Graphics();
            border.visible = false;
            this.addChild(border);
            this._msiBorders.push(border);
            this._msiBorderCategories.push(null);

            const tcBmp = new Bitmap(20, 16);
            const tcSprite = new Sprite(tcBmp);
            tcSprite.visible = false;
            tcSprite.anchor.x = 1;
            tcSprite.anchor.y = 0;
            this.addChild(tcSprite);
            this._msiTurnSprites.push(tcSprite);
            this._msiLastTurns.push(null);
        }

        this._msiPoolReady = true;
        return true;
    };

    // -------------------------------------------------------------------------
    // Is Excluded
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Get Turn Count
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiGetTurnCount = function (entry) {
        const battler = this._battler;
        if (!battler) return null;
        if (entry.kind === "state") {
            if (entry.state.autoRemovalTiming === 0) return null;
            if (entry.state.autoRemovalTiming === 1 && !TC_SHOW_ACTION_BASED) return null;
            const turns = battler._stateTurns[entry.state.id];
            return turns > 0 ? turns : null;
        }
        if (entry.kind === "buff" || entry.kind === "debuff") {
            const turns = battler._buffTurns[entry.paramId];
            return turns > 0 ? turns : null;
        }
        return null;
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
    // Classify Entry
    // -------------------------------------------------------------------------
    Sprite_StateIcon.prototype._msiClassifyEntry = function (entry) {
        if (entry.kind === "buff") return "BUFF";
        if (entry.kind === "debuff") return "DEBUFF";
        if (entry.kind === "state") {
            if (entry.state.meta["Positive State"]) return "POSITIVE_STATE";
            return "NEGATIVE_STATE";
        }
        return "NEGATIVE_STATE";
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
                const entry = {
                    iconIndex: state.iconIndex,
                    kind: "state",
                    state: state,
                };
                entry.category = this._msiClassifyEntry(entry);
                entries.push(entry);
            }
        }

        // Buffs / Debuffs
        for (let i = 0; i < battler._buffs.length; i++) {
            const level = battler._buffs[i];
            if (level !== 0) {
                const entry = {
                    iconIndex: battler.buffIconIndex(level, i),
                    kind: level > 0 ? "buff" : "debuff",
                    paramId: i,
                };
                entry.category = this._msiClassifyEntry(entry);
                entries.push(entry);
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
            this._msiLastTurns = new Array(MAX_ICONS).fill(null);
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

        // Cache check - skip if unchanged (includes turn counts)
        const key = entries.map((e) => {
            const t = this._msiGetTurnCount(e);
            return e.iconIndex + (t !== null ? ":" + t : "");
        }).join(",");
        if (key === this._msiLastEntries && entries.length > 0) {
            this._msiUpdatePagination();
            return;
        }
        this._msiLastEntries = key;
        this._msiEntries = entries;
        this._msiBorderCategories = new Array(MAX_ICONS).fill(null);

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
            const border = this._msiBorders[i];

            if (i < pageEntries.length) {
                const entry = pageEntries[i];
                const sx = (entry.iconIndex % 16) * pw;
                const sy = Math.floor(entry.iconIndex / 16) * ph;
                child.setFrame(sx, sy, pw, ph);
                child.x = i * (pw + 2);
                child.visible = true;

                if (ENABLE_BORDER) {
                    border.x = child.x;
                    const cat = entry.category;
                    if (cat !== this._msiBorderCategories[i]) {
                        this._msiBorderCategories[i] = cat;
                        const color = BORDER_COLORS[cat] || BORDER_COLORS.NEGATIVE_STATE;
                        border.clear();
                        border.lineStyle(BORDER_THICKNESS, color, 1);
                        border.drawRoundedRect(-pw / 2, -ph / 2, pw, ph, BORDER_RADIUS);
                    }
                    border.visible = true;
                } else {
                    border.visible = false;
                }

                if (ENABLE_TURN_COUNTER) {
                    const tcSprite = this._msiTurnSprites[i];
                    const turns = this._msiGetTurnCount(entry);
                    if (turns !== null) {
                        const turnKey = String(turns);
                        if (turnKey !== this._msiLastTurns[i]) {
                            this._msiLastTurns[i] = turnKey;
                            const bmp = tcSprite.bitmap;
                            bmp.clear();
                            bmp.fontSize = TC_FONT_SIZE;
                            bmp.textColor = TC_TEXT_COLOR;
                            bmp.outlineColor = TC_OUTLINE_COLOR;
                            bmp.outlineWidth = TC_OUTLINE_WIDTH;
                            bmp.drawText(turnKey, 0, 0, 20, 16, "right");
                        }
                        tcSprite.x = child.x + pw / 2 + TC_OFFSET_X;
                        tcSprite.y = -ph / 2 + TC_OFFSET_Y;
                        tcSprite.visible = true;
                    } else {
                        tcSprite.visible = false;
                        this._msiLastTurns[i] = null;
                    }
                } else {
                    this._msiTurnSprites[i].visible = false;
                }
            } else {
                child.visible = false;
                border.visible = false;
                this._msiTurnSprites[i].visible = false;
                this._msiBorderCategories[i] = null;
                this._msiLastTurns[i] = null;
            }
        }

        // Update _iconIndex for opacity compatibility with VisuStella BattleCore
        this._iconIndex = entries.length > 0 ? entries[0].iconIndex : 0;

        // Opacity control (VisuStella BattleCore behavior)
        this.opacity = this._iconIndex > 0 ? 255 : 0;
    };
})();

/*~struct~BorderSettings:
 *
 * @param EnableBorder:eval
 * @text Enable Border
 * @type boolean
 * @default true
 * @desc Ativa bordas coloridas ao redor dos icones.
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @type number
 * @min 1
 * @max 6
 * @default 2
 * @desc Espessura da borda em pixels.
 *
 * @param BorderRadius:num
 * @text Border Radius
 * @type number
 * @min 0
 * @max 8
 * @default 2
 * @desc Raio dos cantos arredondados da borda.
 *
 * @param BuffBorderColor:str
 * @text Buff Border Color
 * @type string
 * @default #44cc44
 * @desc Cor da borda para BUFFs.
 *
 * @param DebuffBorderColor:str
 * @text Debuff Border Color
 * @type string
 * @default #cc4444
 * @desc Cor da borda para DEBUFFs.
 *
 * @param PositiveStateBorderColor:str
 * @text Positive State Border Color
 * @type string
 * @default #4488cc
 * @desc Cor da borda para states positivos.
 *
 * @param NegativeStateBorderColor:str
 * @text Negative State Border Color
 * @type string
 * @default #884444
 * @desc Cor da borda para states negativos.
 */

/*~struct~TurnCounterSettings:
 *
 * @param EnableTurnCounter:eval
 * @text Enable Turn Counter
 * @type boolean
 * @default true
 * @desc Ativa contagem de turnos no canto dos icones.
 *
 * @param TurnCounterFontSize:num
 * @text Font Size
 * @type number
 * @min 8
 * @max 20
 * @default 13
 * @desc Tamanho da fonte do contador de turnos.
 *
 * @param TurnCounterTextColor:str
 * @text Text Color
 * @type string
 * @default #ffffff
 * @desc Cor do texto do contador.
 *
 * @param TurnCounterOutlineColor:str
 * @text Outline Color
 * @type string
 * @default rgba(0, 0, 0, 0.8)
 * @desc Cor do contorno do texto.
 *
 * @param TurnCounterOutlineWidth:num
 * @text Outline Width
 * @type number
 * @min 0
 * @max 4
 * @default 2
 * @desc Espessura do contorno do texto.
 *
 * @param TurnCounterOffsetX:num
 * @text Offset X
 * @type number
 * @min -16
 * @max 16
 * @default -2
 * @desc Deslocamento horizontal a partir do canto superior direito.
 *
 * @param TurnCounterOffsetY:num
 * @text Offset Y
 * @type number
 * @min -16
 * @max 16
 * @default 2
 * @desc Deslocamento vertical a partir do canto superior direito.
 *
 * @param ShowActionBased:eval
 * @text Show Action-Based
 * @type boolean
 * @default true
 * @desc Exibir contador para states baseados em acao (autoRemovalTiming=1).
 */
