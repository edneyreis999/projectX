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

  // Configurações iniciais
  // let dimengeonLevel = 1; // Nível inicial do Dimengeon
  let maxEnemiesCapacity = 10; // Capacidade máxima inicial (pode ser alterada dinamicamente)
  let accumulatedEnemies = 0; // Total de inimigos acumulados
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
      } else if (canAccumulateEnemies(troopId)) {
        console.log('Batalha acumulada no Dimengeon:', troopId);
        accumulateBattle(troopId);
        return 0; // Acumula batalha e cancela o encontro
      } else {
        console.log('Capacidade do Dimengeon cheia, batalha ocorrendo normalmente.');
        return troopId; // Capacidade cheia, batalha ocorre normalmente
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
        executeAccumulatedBattles.call(this); // Executa batalhas acumuladas
      } else {
        $gameMessage.add('Nenhuma batalha acumulada para lutar.');
      }
    } else {
      _Scene_ItemBase_useItem.call(this);
    }
  };

  /**
   * Verifica se deve acumular inimigos da tropa.
   * @param {number} troopId ID da tropa
   * @returns {boolean} Verdadeiro se houver espaço no Dimengeon
   */
  function canAccumulateEnemies(troopId) {
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    return accumulatedEnemies + totalEnemies <= maxEnemiesCapacity;
  }

  /**
   * Adiciona uma batalha à lista de acumuladas e atualiza o total de inimigos acumulados.
   * Simula a entrada de batalha com sons e efeitos, sem iniciar a batalha real.
   * @param {number} troopId ID da tropa
   */
  function accumulateBattle(troopId) {
    accumulatedBattles.push(troopId);
    const troop = $dataTroops[troopId];
    const totalEnemies = troop.members.length;
    accumulatedEnemies += totalEnemies;

    // Simula a entrada na batalha
    playBattleTransition();

    // Mostra a capacidade do Dimengeon
    showDimengeonCapacity();

    console.log(`A batalha foi acumulada no Dimengeon: ${troopId}`);
  }

  /**
   * Simula a transição de entrada na batalha.
   */
  function playBattleTransition() {
    AudioManager.playSe({ name: 'Battle1', volume: 90, pitch: 100, pan: 0 });
    $gameScreen.startFlash([255, 255, 255, 255], 60);
  }

  /**
   * Mostra a capacidade atual do Dimengeon no canto superior da tela.
   */
  function showDimengeonCapacity() {
    const message = `Capacidade do Dimengeon: ${accumulatedEnemies}/${maxEnemiesCapacity}`;
    $gameMessage.add(message);
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
   * Verifica se deve acumular batalhas.
   * @param {number} troopId ID da tropa
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
})();
