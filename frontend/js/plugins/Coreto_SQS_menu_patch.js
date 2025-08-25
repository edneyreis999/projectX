/*:
 * @plugindesc [Patch] Permite habilitar/desabilitar o menu de Quests do PKD_SimpleQuestSystem via Switch.
 * @author Gemini (Baseado no código de Pheonix KageDesu)
 * @target MZ
 * @help
 * Coloque este plugin ABAIXO do PKD_SimpleQuestSystem na lista de plugins.
 *
 * 1. No plugin PKD_SimpleQuestSystem, configure "Command in menu?" para "No".
 * 2. Configure o parâmetro "Control Switch" neste plugin com o ID da Switch
 * que você quer usar para controlar o menu.
 * 3. Durante o jogo, ligue essa Switch para mostrar o menu e desligue para esconder.
 *
 * @param controlSwitchId
 * @text Control Switch
 * @desc A Switch que irá controlar se o menu de Quests aparece.
 * @type switch
 * @default 50
 */
(() => {
  // --- Início da Configuração do Plugin ---
  const pluginName = 'PKD_SQS_MenuPatch';
  const parameters = PluginManager.parameters(pluginName);
  // Lê o ID da Switch a partir dos parâmetros do plugin que você configurou no editor.
  const QUEST_MENU_SWITCH_ID = Number(parameters['controlSwitchId'] || 50);
  // --- Fim da Configuração do Plugin ---

  // Armazena a função original do plugin para não a perdermos.
  const _PKD_SQS_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;

  // Sobrescreve a função do plugin com a nossa nova lógica.
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    // Primeiro, executa a lógica original do plugin.
    _PKD_SQS_Window_MenuCommand_addOriginalCommands.call(this);

    // Agora, nossa lógica customizada:
    // Verifica se o comando já existe na lista (para evitar duplicatas).
    const commandExists = this._list.some(command => command.symbol === 'sqsJournal');

    // Se o comando NÃO existe E o nosso Switch (configurado no parâmetro) está LIGADO...
    if (!commandExists && $gameSwitches.value(QUEST_MENU_SWITCH_ID)) {
      // ...então adicionamos o comando manualmente.
      const commandText = PKD_SQS.PP.menuCommandText();
      this.addCommand(commandText, 'sqsJournal', true);
    }
  };
})();
