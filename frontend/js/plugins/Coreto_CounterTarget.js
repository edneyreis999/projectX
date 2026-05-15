//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_CounterTarget
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Armazena o ultimo atacante de cada battler para uso em counter-ataques
 * @author Coreto
 * @orderAfter VisuMZ_3_AutoSkillTriggers
 *
 * @help
 * ============================================================================
 * Coreto Counter Target
 * ============================================================================
 *
 * Registra quem atacou cada battler e forca skills de counter a mirarem no
 * atacante original.
 *
 * ---
 *
 * <CounterLastAttacker>
 *
 * Use esta notetag em skills de contra-ataque. A skill mirara no ultimo
 * inimigo que atacou o usuario. Se o atacante morreu, mira em um inimigo
 * aleatorio vivo.
 *
 * Exemplo:
 *   <CounterLastAttacker>
 *
 * ============================================================================
 */

(() => {
  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    if (this.subject() !== target && !this.isForFriend()) {
      target._lastAttacker = this.subject();
    }
    _Game_Action_apply.call(this, target);
  };

  const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function () {
    const item = this.item();
    if (item && item.note && /<CounterLastAttacker>/i.test(item.note)) {
      const user = this.subject();
      if (user._lastAttacker && user._lastAttacker.isAlive()) {
        return [user._lastAttacker];
      }
      return user.opponentsUnit().aliveMembers();
    }
    return _Game_Action_makeTargets.call(this);
  };
})();
