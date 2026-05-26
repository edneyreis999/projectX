//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_CastTimeTags
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetag para cast time em segundos (<Cast Time: xs>)
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_2_BattleSystemATB
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Coreto Cast Time Tags
 * ============================================================================
 *
 * Permite definir o tempo de cast de skills/items em segundos em vez de usar
 * o campo speed negativo. O plugin converte automaticamente o tempo desejado
 * para o valor correto, compensando AGI, composicao do party e modo TPB.
 *
 * Funciona com o sistema TPB vanilla e com o VisuStella Active Turn Battle.
 *
 * ---
 *
 * <Cast Time: xs>
 *
 * Define o tempo de cast em segundos. Quando esta notetag esta presente,
 * o campo speed da skill e ignorado — basta deixar speed em 0.
 *
 * Exemplos:
 *   <Cast Time: 10s>   Cast de 10 segundos
 *   <Cast Time: 5s>    Cast de 5 segundos
 *   <Cast Time: 0.5s>  Cast de meio segundo
 *   <Cast Time: 0s>    Cast instantaneo (sem espera)
 *
 * Onde usar:
 *   - Skills
 *   - Items
 *
 * ============================================================================
 */

(() => {
  const parseCastTimeSeconds = function (obj) {
    if (!obj || !obj.note) return null;
    const match = /<Cast Time:\s*(\d+(?:\.\d+)?)\s*s>/i.exec(obj.note);
    return match ? parseFloat(match[1]) : null;
  };

  // Hook 1: Mutar speed para -1 em skills/items com <Cast Time: Xs>
  // Isso garante que o jogo entre em casting state naturalmente (gauge aparece).
  // O JSON no disco nao e alterado — apenas o objeto em memoria.
  const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function () {
    _Scene_Boot_onDatabaseLoaded.call(this);
    const databases = [...($dataSkills || []), ...($dataItems || [])];
    for (const obj of databases) {
      if (obj && obj.note && parseCastTimeSeconds(obj) !== null && obj.speed >= 0) {
        obj.speed = -1;
      }
    }
  };

  // Hook 2: Calcular cast time a partir dos segundos da notetag
  // O speed -1 garante o casting state, mas o tempo real e controlado aqui.
  const _Game_Battler_tpbRequiredCastTime =
    Game_Battler.prototype.tpbRequiredCastTime;

  Game_Battler.prototype.tpbRequiredCastTime = function () {
    const actions = this._actions
      ? this._actions.filter(a => a.isValid())
      : [];

    for (const action of actions) {
      const item = action.item();
      if (!item) continue;
      const seconds = parseCastTimeSeconds(item);
      if (seconds !== null && seconds > 0) {
        return seconds * this.tpbAcceleration() * 60;
      }
    }

    return _Game_Battler_tpbRequiredCastTime.call(this);
  };
})();
