/*:
 * @plugindesc [Patch] Governa o menu e a abertura direta do journal PKD por Switch.
 * @author Coreto
 * @target MZ
 * @orderAfter PKD_SimpleQuestSystem
 * @help
 * Coloque este plugin abaixo do PKD_SimpleQuestSystem.
 * Com a Control Switch desligada, o comando do menu, o atalho J e chamadas
 * diretas a SQSM.OpenQuestJournal permanecem bloqueados. Quando ligada, a
 * abertura delega integralmente para o comportamento original do PKD.
 *
 * @param controlSwitchId
 * @text Control Switch
 * @desc Switch que habilita o menu e a abertura do journal.
 * @type switch
 * @default 50
 */
(() => {
  "use strict";

  const PLUGIN_NAME = "Coreto_SQS_menu_patch";
  const parameters = PluginManager.parameters(PLUGIN_NAME);
  const QUEST_MENU_SWITCH_ID = Number(parameters.controlSwitchId || 50);

  const isJournalEnabled = () => Boolean(
    globalThis.$gameSwitches && $gameSwitches.value(QUEST_MENU_SWITCH_ID)
  );

  const sqsm = globalThis.SQSM;
  if (!sqsm || typeof sqsm.OpenQuestJournal !== "function") {
    throw new Error(`[${PLUGIN_NAME}] PKD_SimpleQuestSystem must load first.`);
  }

  const openQuestJournal = sqsm.OpenQuestJournal;
  sqsm.OpenQuestJournal = function (...args) {
    if (!isJournalEnabled()) return false;
    return openQuestJournal.apply(this, args);
  };

  const addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    addOriginalCommands.call(this);

    const commandIndex = this._list.findIndex(command => command.symbol === "sqsJournal");
    if (!isJournalEnabled()) {
      if (commandIndex >= 0) this._list.splice(commandIndex, 1);
      return;
    }

    if (commandIndex < 0) {
      this.addCommand(PKD_SQS.PP.menuCommandText(), "sqsJournal", true);
    }
  };
})();
