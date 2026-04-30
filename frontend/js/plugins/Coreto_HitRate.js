//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_HitRate
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetag para modificar a taxa de acerto (hit rate) de skills e items
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Coreto Hit Rate - Notetag
 * ============================================================================
 *
 * Use esta notetag em Skills e Items para modificar a taxa de acerto:
 *
 * ---
 *
 * <Modify Hit Rate: x%>
 * <Modify Hit Rate: +x%>
 * <Modify Hit Rate: -x%>
 *
 * - Modifica a taxa de acerto (hit rate) da skill/item
 * - Use x% para definir o hit rate como exatamente x% do original
 * - Use +x% para aumentar o hit rate em x% (multiplicador: 1 + x/100)
 * - Use -x% para reduzir o hit rate em x% (multiplicador: 1 - x/100)
 * - Funciona com o Improved Accuracy do VisuMZ Core Engine
 * - Respeita buffs de accuracy do personagem
 *
 * Exemplos:
 *   <Modify Hit Rate: -10%>  # Reduz o hit rate em 10% (x0.90)
 *   <Modify Hit Rate: +15%>  # Aumenta o hit rate em 15% (x1.15)
 *   <Modify Hit Rate: 80%>   # Hit rate passa a ser 80% do original (x0.80)
 *
 * ============================================================================
 */

(() => {
  const parseModifyHitRateNotetag = function (obj) {
    if (!obj || !obj.note) return null;

    const note = obj.note;
    const regex = /<Modify Hit Rate:\s*([+\-]?\d+)%>/gi;
    const match = regex.exec(note);

    if (match) {
      const value = parseFloat(match[1]);
      if (match[1].startsWith('+')) {
        return 1 + value / 100;
      } else if (match[1].startsWith('-')) {
        return 1 - Math.abs(value) / 100;
      } else {
        return value / 100;
      }
    }

    return null;
  };

  const _Game_Action_itemHit = Game_Action.prototype.itemHit;
  Game_Action.prototype.itemHit = function (target) {
    const rate = _Game_Action_itemHit.call(this, target);

    const item = this.item();
    if (!item) return rate;

    const modifier = parseModifyHitRateNotetag(item);
    if (modifier !== null) {
      return rate * modifier;
    }

    return rate;
  };
})();
