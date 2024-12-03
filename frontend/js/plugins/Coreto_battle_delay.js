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
 * A primeira batalha com um inimigo ou tropa ocorre normalmente.
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

  // Obtém parâmetros do plugin
  const parameters = PluginManager.parameters(pluginName);
  const DimengeonID = Number(parameters['DimengeonID'] || 21);

  // Estruturas de dados para controle
  const accumulatedBattles = []; // Lista de batalhas acumuladas
  const encounteredEnemies = new Set(); // Lista de inimigos já enfrentados

  /**
   * Sobrescreve o método que define o ID da tropa de encontro.
   * Verifica se os inimigos já foram enfrentados. Caso contrário, acumula a batalha.
   */
  const _Game_Player_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
  Game_Player.prototype.makeEncounterTroopId = function () {
    const troopId = _Game_Player_makeEncounterTroopId.call(this);

    if (shouldAccumulateBattle(troopId)) {
      if (isNewEncounter(troopId)) {
        registerEncounteredEnemies(troopId);
        console.log('Primeira vez encontrando inimigos desta tropa.');
        return troopId; // Primeira vez, batalha ocorre normalmente
      } else {
        console.log('Batalha acumulada no Dimengeon:', troopId);
        accumulateBattle(troopId);
        return 0; // Acumula batalha e cancela o encontro
      }
    }

    return troopId; // Batalha normal caso não esteja acumulando
  };

  /**
   * Sobrescreve o uso de itens para verificar se o item Dimengeon foi usado.
   * Inicia as batalhas acumuladas, se existirem.
   */
  const _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
  Scene_ItemBase.prototype.useItem = function () {
    const item = this.item();

    if (isDimengeonItem(item)) {
      if (hasAccumulatedBattles()) {
        $gameMessage.add('Iniciando as batalhas acumuladas!');
        executeAccumulatedBattles.call(this);
      } else {
        $gameMessage.add('Nenhuma batalha acumulada para lutar.');
      }
    } else {
      _Scene_ItemBase_useItem.call(this);
    }
  };

  /**
   * Função que verifica se deve acumular batalhas.
   * @param {number} troopId ID da tropa do encontro
   * @returns {boolean} Verdadeiro se a batalha deve ser acumulada
   */
  function shouldAccumulateBattle(troopId) {
    return $gameParty.hasItem($dataItems[DimengeonID]) && troopId > 0;
  }

  /**
   * Verifica se o encontro é com um inimigo ou tropa nunca antes enfrentado.
   * @param {number} troopId ID da tropa do encontro
   * @returns {boolean} Verdadeiro se algum inimigo na tropa for novo
   */
  function isNewEncounter(troopId) {
    const troop = $dataTroops[troopId];
    return troop.members.some(member => {
      const enemy = $dataEnemies[member.enemyId];
      return enemy && !encounteredEnemies.has(member.enemyId);
    });
  }

  /**
   * Registra os inimigos da tropa como encontrados.
   * @param {number} troopId ID da tropa do encontro
   */
  function registerEncounteredEnemies(troopId) {
    const troop = $dataTroops[troopId];
    troop.members.forEach(member => {
      if ($dataEnemies[member.enemyId]) {
        encounteredEnemies.add(member.enemyId);
      }
    });
  }

  /**
   * Adiciona uma batalha à lista de acumuladas.
   * @param {number} troopId ID da tropa
   */
  function accumulateBattle(troopId) {
    accumulatedBattles.push(troopId);
    $gameMessage.add('A batalha foi acumulada no Dimengeon!');
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
   * Executa todas as batalhas acumuladas.
   */
  function executeAccumulatedBattles() {
    if (hasAccumulatedBattles()) {
      const troopId = accumulatedBattles.shift();
      $gameTroop.setup(troopId);
      BattleManager.setup(troopId, true, false);
      BattleManager.setEventCallback(() => {
        executeAccumulatedBattles.call(this);
      });
      SceneManager.push(Scene_Battle);
    } else {
      $gameMessage.add('Todas as batalhas foram concluídas!');
    }
  }
})();
