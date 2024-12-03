//=============================================================================
// RPG Maker MZ - Coreto Battle Delay
// Coreto_Battle_Delay.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Acumula batalhas no item Dimengeon e as enfrenta todas de uma vez quando usado.
 * @author Edney Antonio Reis Filho
 *
 * @help Coreto_Battle_Delay.js
 * ----------------------------------------------------------------------------
 * Este plugin adiciona a funcionalidade para o item Dimengeon (ID 21).
 * Quando o item é adicionado ao inventário, as batalhas começam a ser armazenadas.
 * Ao usar o item, todas as batalhas acumuladas ocorrem sequencialmente.
 * ----------------------------------------------------------------------------
 *
 * @param DimengeonID
 * @type item
 * @text ID do Item Dimengeon
 * @desc O ID do item Dimengeon no banco de dados.
 * @default 21
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay';
  const parameters = PluginManager.parameters(pluginName);
  const DimengeonID = Number(parameters['DimengeonID'] || 21);

  // Armazena as batalhas acumuladas
  let accumulatedBattles = [];

  // Sobrescreve o método que determina o ID da tropa para encontros
  const _Game_Player_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
  Game_Player.prototype.makeEncounterTroopId = function () {
    const troopId = _Game_Player_makeEncounterTroopId.call(this);
    if ($gameParty.hasItem($dataItems[DimengeonID])) {
      if (troopId > 0) {
        console.log('Batalha acumulada no Dimengeon:', troopId);
        accumulatedBattles.push(troopId);
        $gameMessage.add('A batalha foi acumulada no Dimengeon!');
        return 0; // Impede o início da batalha
      }
    }
    return troopId;
  };

  // Executa todas as batalhas acumuladas ao usar o item
  const _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
  Scene_ItemBase.prototype.useItem = function () {
    const item = this.item();
    if (item && item.id === DimengeonID) {
      if (accumulatedBattles.length > 0) {
        $gameMessage.add('Iniciando as batalhas acumuladas!');
        this.executeAccumulatedBattles();
      } else {
        $gameMessage.add('Nenhuma batalha acumulada para lutar.');
      }
    } else {
      _Scene_ItemBase_useItem.call(this);
    }
  };

  // Lógica para executar batalhas acumuladas
  Scene_ItemBase.prototype.executeAccumulatedBattles = function () {
    if (accumulatedBattles.length > 0) {
      const troopId = accumulatedBattles.shift();
      $gameTroop.setup(troopId);
      BattleManager.setup(troopId, true, false);
      BattleManager.setEventCallback(() => {
        this.executeAccumulatedBattles();
      });
      SceneManager.push(Scene_Battle);
    } else {
      $gameMessage.add('Todas as batalhas foram concluídas!');
    }
  };
})();
