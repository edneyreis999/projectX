//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_StateEffects
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetags legíveis para aplicar estados com chance e bônus de dano em skills
 * @author Coreto
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Coreto State Effects - Notetags
 * ============================================================================
 *
 * Use estas notetags em Skills e Items para modificar comportamento:
 *
 * ---
 *
 * <Apply State: x% y>
 * <Apply State: x% State Name>
 *
 * - Aplica o estado y (ou pelo nome) com x% de chance
 * - Substitua x pela chance (0-100)
 * - Substitua y pelo ID do estado ou pelo nome do estado
 *
 * Exemplos:
 *   <Apply State: 30% 4>           # 30% de chance de aplicar estado ID 4
 *   <Apply State: 50% Sangramento> # 50% de chance de aplicar Sangramento
 *   <Apply State: 100% Poison>     # 100% de chance de aplicar Poison
 *
 * ---
 *
 * <Apply States: x% y, z% w>
 *
 * - Múltiplos estados em uma única linha
 *
 * Exemplo:
 *   <Apply States: 30% Sangramento, 20% Poison, 10% Silence>
 *
 * ---
 *
 * <Damage Bonus: x%>
 * <Damage Bonus: +x%>
 * <Damage Bonus: -x%>
 *
 * - Modifica o dano causado pela skill/item
 * - Use x% para definir o dano como exatamente x% do original
 * - Use +x% para aumentar o dano em x% (multiplicador: 1 + x/100)
 * - Use -x% para reduzir o dano em x% (multiplicador: 1 - x/100)
 *
 * Exemplos:
 *   <Damage Bonus: +10%>  # Aumenta o dano em 10% (x1.10)
 *   <Damage Bonus: +25%>  # Aumenta o dano em 25% (x1.25)
 *   <Damage Bonus: 150%>  # Dano passa a ser 150% do original (x1.50)
 *   <Damage Bonus: -20%>  # Reduz o dano em 20% (x0.80)
 *
 * ============================================================================
 */

(() => {
  // Parse de notetags de estado
  const parseApplyStateNotetags = function (obj) {
    if (!obj || !obj.note) return [];

    const states = [];
    const note = obj.note;

    // <Apply State: x% y>
    const regexSingle = /<Apply State:\s*(\d+)%\s*(\d+|[^>]+)>/gi;
    let match;

    while ((match = regexSingle.exec(note)) !== null) {
      const chance = parseFloat(match[1]);
      const stateIdOrName = match[2].trim();

      let stateId;
      if (/^\d+$/.test(stateIdOrName)) {
        stateId = parseInt(stateIdOrName);
      } else {
        // Buscar estado por nome
        const state = $dataStates.find(s => s && s.name === stateIdOrName);
        if (state) stateId = state.id;
      }

      if (stateId) {
        states.push({ stateId: stateId, chance: chance / 100 });
      }
    }

    // <Apply States: x% y, z% w, ...>
    const regexMulti = /<Apply States:\s*(.+?)>/gi;
    while ((match = regexMulti.exec(note)) !== null) {
      const parts = match[1].split(',');
      for (const part of parts) {
        const stateMatch = part.match(/^\s*(\d+)%\s*(\d+|[^,]+)/i);
        if (stateMatch) {
          const chance = parseFloat(stateMatch[1]);
          const stateIdOrName = stateMatch[2].trim();

          let stateId;
          if (/^\d+$/.test(stateIdOrName)) {
            stateId = parseInt(stateIdOrName);
          } else {
            const state = $dataStates.find(s => s && s.name === stateIdOrName);
            if (state) stateId = state.id;
          }

          if (stateId) {
            states.push({ stateId: stateId, chance: chance / 100 });
          }
        }
      }
    }

    return states;
  };

  // Parse de notetags de dano
  const parseDamageBonusNotetag = function (obj) {
    if (!obj || !obj.note) return null;

    const note = obj.note;
    const regex = /<Damage Bonus:\s*([+\-]?\d+)%>/gi;
    const match = regex.exec(note);

    if (match) {
      const value = parseFloat(match[1]);
      // Se tem + ou -, é um modificador relativo. Se não, é absoluto.
      if (match[1].startsWith('+')) {
        return 1 + value / 100; // +10% -> 1.10
      } else if (match[1].startsWith('-')) {
        return 1 - Math.abs(value) / 100; // -20% -> 0.80
      } else {
        return value / 100; // 150% -> 1.50
      }
    }

    return null;
  };

  // Hook para aplicar estados
  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function (target) {
    _Game_Action_applyItemUserEffect.call(this, target);

    if (!target || target.isDead()) return;

    const item = this.item();
    if (!item) return;

    const statesToApply = parseApplyStateNotetags(item);

    for (const stateData of statesToApply) {
      if (Math.random() < stateData.chance) {
        if (!target.isStateAffected(stateData.stateId)) {
          target.addState(stateData.stateId);
          this.makeSuccess(target);
        }
      }
    }
  };

  // Hook para aplicar bônus de dano
  const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
  Game_Action.prototype.makeDamageValue = function (target, critical) {
    const damage = _Game_Action_makeDamageValue.call(this, target, critical);

    const item = this.item();
    if (!item) return damage;

    const damageMultiplier = parseDamageBonusNotetag(item);
    if (damageMultiplier !== null) {
      return Math.floor(damage * damageMultiplier);
    }

    return damage;
  };
})();
