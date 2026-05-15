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
 * Registra quem atacou cada battler na propriedade _lastAttacker.
 * Use em combinacao com <JS Targets> nas skills de counter:
 *
 * <JS Targets>
 * if (user._lastAttacker && user._lastAttacker.isAlive()) {
 *   targets = [user._lastAttacker];
 * } else {
 *   targets = user.opponentsUnit().aliveMembers();
 * }
 * </JS Targets>
 *
 */

(() => {
  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    if (this.subject() !== target && !this.isForFriend()) {
      target._lastAttacker = this.subject();
    }
    _Game_Action_apply.call(this, target);
  };
})();
