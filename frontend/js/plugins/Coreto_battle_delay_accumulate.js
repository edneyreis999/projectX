//=============================================================================
// RPG Maker MZ - Coreto Battle Delay Accumulate
// Coreto_Battle_Delay_Accumulate.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Handles the accumulation of battles into the Dimengeon item, referencing core parameters as needed.
 * @author Edney Antonio Reis Filho
 */

(() => {
  const pluginName = 'Coreto_Battle_Delay_Accumulate';

  // Verifica se o estado compartilhado foi inicializado
  if (!window.CoretoBattleState) {
    throw new Error(`${pluginName} requires Coreto_Battle_Delay_State.js`);
  }

  const { DimengeonID, maxEnemiesCapacity, accumulatedBattles, encounteredEnemies } = window.CoretoBattleState;
  let { accumulatedEnemies } = window.CoretoBattleState;

  // Expose functionality to the global scope
  window.CoretoBattleAccumulate = {
    shouldAccumulateBattle,
    canAccumulateEnemies,
    accumulateBattle,
    playBattleTransition,
    showDimengeonCapacity,
    isNewEncounter,
    registerEncounteredEnemies,
  };

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
   * Verifica se deve acumular batalhas.
   * @param {number} troopId ID da tropa
   * @returns {boolean} Verdadeiro se a batalha deve ser acumulada
   */
  function shouldAccumulateBattle(troopId) {
    return $gameParty.hasItem($dataItems[DimengeonID]) && troopId > 0;
  }

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
})();
