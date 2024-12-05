//=============================================================================
// RPG Maker MZ - Coreto Battle Enemy Reinforcements
// Coreto_Battle_Enemy_Reinforcements.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Dynamically adds enemy reinforcements to ongoing battles for enhanced challenge and strategy.
 * @author Edney Antonio Reis Filho
 *
 * @help
 * ----------------------------------------------------------------------------
 * This plugin allows you to dynamically add enemy reinforcements to battles.
 *
 * Features:
 * - Add individual enemies or entire troops during battle.
 * - Remove enemies or entire troops from battle.
 * - Check if specific enemies or troops are present in the battle.
 *
 * ----------------------------------------------------------------------------
 * Plugin Commands:
 * - add_enemy TROOP_MEMBER_ID from troop TROOP_ID
 * - add_enemy_troop TROOP_ID
 * - remove_enemy TROOP_MEMBER_ID from troop TROOP_ID
 * - remove_enemy_troop TROOP_ID
 *
 * Example:
 * - To add the second member of troop 4:
 *   `add_enemy 2 from troop 4`
 * - To add all members of troop 4:
 *   `add_enemy_troop 4`
 *
 * ----------------------------------------------------------------------------
 * Requirements:
 * - Coreto_Battle_Delay_State.js
 * - Coreto_Battle_Delay.js
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Battle_Enemy_Reinforcements';

  // Register global functions
  window.CoretoEnemyReinforcements = {
    addEnemy,
    addEnemyTroop,
    removeEnemy,
    removeEnemyTroop,
  };

  /**
   * Add a specific enemy from a troop to the battle.
   * @param {number} troopId - ID of the troop.
   * @param {number} memberId - Member index in the troop.
   */
  function addEnemy(troopId, memberId) {
    const member = $dataTroops[troopId]?.members[memberId - 1];
    if (member && $dataEnemies[member.enemyId]) {
      const enemy = new Game_Enemy(member.enemyId, member.x, member.y);
      $gameTroop.addReinforcementEnemy(enemy);
    } else {
      console.error(`[${pluginName}] Invalid troopId or memberId: ${troopId}, ${memberId}`);
    }
  }

  /**
   * Add all enemies from a specific troop to the battle.
   * @param {number} troopId - ID of the troop.
   */
  function addEnemyTroop(troopId) {
    const troop = $dataTroops[troopId];
    if (troop) {
      troop.members.forEach((member, index) => {
        addEnemy(troopId, index + 1);
      });
    } else {
      console.error(`[${pluginName}] Invalid troopId: ${troopId}`);
    }
  }

  /**
   * Remove a specific enemy from a troop in the battle.
   * @param {number} troopId - ID of the troop.
   * @param {number} memberId - Member index in the troop.
   */
  function removeEnemy(troopId, memberId) {
    const enemies = $gameTroop.members();
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      if (enemy.troopId === troopId && enemy.troopMemberId === memberId) {
        $gameTroop.removeEnemyByIndex(i);
        break;
      }
    }
  }

  /**
   * Remove all enemies from a specific troop in the battle.
   * @param {number} troopId - ID of the troop.
   */
  function removeEnemyTroop(troopId) {
    const enemies = $gameTroop.members();
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      if (enemy.troopId === troopId) {
        $gameTroop.removeEnemyByIndex(i);
      }
    }
  }

  // Extend Game_Troop to manage reinforcements
  Game_Troop.prototype.addReinforcementEnemy = function (enemy) {
    this._enemies.push(enemy);
    this.makeUniqueNames();
    BattleManager.refreshEnemyReinforcements();
    console.log(`[${pluginName}] Added enemy: ${enemy.name()}`);
  };

  Game_Troop.prototype.removeEnemyByIndex = function (index) {
    const removedEnemy = this._enemies.splice(index, 1);
    BattleManager.refreshEnemyReinforcements();
    console.log(`[${pluginName}] Removed enemy: ${removedEnemy.name}`);
  };

  // Add methods to refresh enemy sprites
  BattleManager.refreshEnemyReinforcements = function () {
    if (this._spriteset) {
      this._spriteset.refreshEnemyReinforcements();
    }
  };

  Spriteset_Battle.prototype.refreshEnemyReinforcements = function () {
    this._enemySprites.forEach(sprite => this._battleField.removeChild(sprite));
    this._enemySprites = [];
    $gameTroop.members().forEach(enemy => {
      const sprite = new Sprite_Enemy(enemy);
      this._enemySprites.push(sprite);
      this._battleField.addChild(sprite);
    });
    console.log(`[${pluginName}] Refreshed enemy sprites.`);
  };
})();
