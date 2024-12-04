//=============================================================================
// RPG Maker MZ - Coreto Battle Delay Execute
// Coreto_Battle_Delay_Execute.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Handles the execution of accumulated battles in the Dimengeon item, referencing core parameters as needed.
 * @author Edney Antonio Reis Filho
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay_Execute';

  // Verifica se o estado compartilhado foi inicializado
  if (!window.CoretoBattleState) {
    throw new Error(`${pluginName} requires Coreto_Battle_Delay_State.js`);
  }

  const { DimengeonID, maxEnemiesCapacity, accumulatedBattles, encounteredEnemies } = window.CoretoBattleState;
  let { accumulatedEnemies } = window.CoretoBattleState;

  // Expose functionality to the global scope
  window.CoretoBattleExecute = {
    executeAccumulatedBattles,
    resetDimengeon,
    isDimengeonItem,
    hasAccumulatedBattles,
  };

  const _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
  Scene_ItemBase.prototype.useItem = function () {
    const item = this.item();

    if (isDimengeonItem(item)) {
      if (hasAccumulatedBattles()) {
        $gameMessage.add('Iniciando as batalhas acumuladas!');
        executeAccumulatedBattles.call(this); // Executa batalhas acumuladas
      } else {
        $gameMessage.add('Nenhuma batalha acumulada para lutar.');
      }
    } else {
      _Scene_ItemBase_useItem.call(this);
    }
  };

  /**
   * Executa todas as batalhas acumuladas.
   */
  function executeAccumulatedBattles() {
    if (hasAccumulatedBattles()) {
      const troopId = accumulatedBattles.shift();
      $gameTroop.setup(troopId);
      BattleManager.setup(troopId, true, false);
      BattleManager.setEventCallback(() => {
        executeAccumulatedBattles.call(this); // Chama recursivamente para a próxima batalha
      });
      SceneManager.push(Scene_Battle);
    } else {
      $gameMessage.add('Todas as batalhas foram concluídas!');
      resetDimengeon(); // Reseta somente quando a lista de batalhas estiver vazia
    }
  }
  /**
   * Reseta o Dimengeon após enfrentar as batalhas acumuladas.
   */
  function resetDimengeon() {
    accumulatedEnemies = 0;
    accumulatedBattles.length = 0;
    showDimengeonCapacity();
    console.log('Dimengeon esvaziado.');
  }

  /**
   * Verifica se o item usado é o Dimengeon.
   * @param {object} item Item usado
   * @returns {boolean} Verdadeiro se o item for o Dimengeon
   */
  function isDimengeonItem(item) {
    return item && item.id === DimengeonID;
  }
  /**
   * Verifica se há batalhas acumuladas.
   * @returns {boolean} Verdadeiro se houver batalhas acumuladas
   */
  function hasAccumulatedBattles() {
    return accumulatedBattles.length > 0;
  }
  /**
   * Mostra a capacidade atual do Dimengeon no canto superior da tela.
   */
  function showDimengeonCapacity() {
    const message = `Capacidade do Dimengeon: ${accumulatedEnemies}/${maxEnemiesCapacity}`;
    $gameMessage.add(message);
  }
})();
