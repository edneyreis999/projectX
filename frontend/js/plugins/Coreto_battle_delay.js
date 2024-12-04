//=============================================================================
// RPG Maker MZ - Coreto Battle Delay
// Coreto_battle_delay.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Acumula batalhas no item Dimengeon e as enfrenta todas de uma vez quando usado.
 * @author Edney Antonio Reis Filho
 *
 * @help Coreto_battle_delay.js
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

  // Estado compartilhado
  window.CoretoBattleState = {
    DimengeonID,
    maxEnemiesCapacity: 10, // Capacidade máxima de inimigos
    accumulatedEnemies: 0, // Total de inimigos acumulados
    accumulatedBattles: [], // Lista de batalhas acumuladas
    encounteredEnemies: new Set(), // Lista de inimigos já enfrentados
  };

  // Verifica se o estado compartilhado foi inicializado
  if (!window.CoretoBattleState) {
    throw new Error('Coreto_Battle_Delay requires Coreto_Battle_Delay_State.js');
  }

  console.log(`${pluginName} loaded successfully.`);
})();
