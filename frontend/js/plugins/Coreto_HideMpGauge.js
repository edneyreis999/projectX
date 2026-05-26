//=============================================================================
// RPG Maker MZ - Coreto Hide MP Gauge
// Coreto_HideMpGauge.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Remove completamente a barra de MP do jogo
 * @author Edney Antonio Reis Filho
 * @version 2.0.0
 *
 * @help
 * ----------------------------------------------------------------------------
 * **Coreto Hide MP Gauge**
 * ----------------------------------------------------------------------------
 * Remove a barra/gauge de MP de toda a interface do jogo:
 * - Menu principal (ESC)
 * - Battle Status Window (batalha)
 * - Menu de Status
 * - Menu de Equip
 *
 * Use este plugin quando seu jogo nao utiliza MP como recurso.
 *
 * ----------------------------------------------------------------------------
 * **Compatibilidade**
 * ----------------------------------------------------------------------------
 * - Compativel com VisuStella Battle Core
 * - Compativel com VisuStella Core Engine
 * - Compativel com VisuStella Main Menu Core
 * - Deve ser colocado ABAIXO dos plugins VisuStella no Plugin Manager
 */

(() => {
  'use strict';

  const pluginName = 'Coreto_HideMpGauge';

  // --- placeGauge: hook na classe base para cobrir todas as janelas ---

  const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
  Window_StatusBase.prototype.placeGauge = function (actor, type, x, y) {
    if (type === 'mp') return;
    _Window_StatusBase_placeGauge.call(this, actor, type, x, y);
  };

  // --- placeBasicGauges: reescreve sem MP, TP sobe para ocupar o espaco ---

  const _Window_StatusBase_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
  Window_StatusBase.prototype.placeBasicGauges = function (actor, x, y) {
    this.placeGauge(actor, 'hp', x, y);
    if ($dataSystem.optDisplayTp) {
      this.placeGauge(actor, 'tp', x, y + this.gaugeLineHeight());
    }
  };

  console.log(`[${pluginName}] Plugin loaded - MP gauge hidden.`);
})();
