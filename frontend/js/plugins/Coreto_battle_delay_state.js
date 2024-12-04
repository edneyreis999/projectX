//=============================================================================
// RPG Maker MZ - Coreto Battle Delay State
// Coreto_Battle_Delay_State.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Initializes the shared state for the Coreto Battle Delay system, required by all modules.
 * @author Edney Antonio Reis Filho
 */

(() => {
  // Define o estado compartilhado global
  window.CoretoBattleState = {
    DimengeonID: 21, // ID do item Dimengeon (valor padrão, ajustável pelo core)
    maxEnemiesCapacity: 10, // Capacidade máxima inicial de inimigos
    accumulatedEnemies: 0, // Total de inimigos acumulados
    accumulatedBattles: [], // Lista de batalhas acumuladas
    encounteredEnemies: new Set(), // Lista de inimigos já enfrentados
  };

  console.log('Coreto Battle State initialized.');
})();
