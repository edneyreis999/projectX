//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_TpNotetags
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetags para modificar custo e ganho de TP em Skills e Items
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_2_EnhancedTpSystem
 *
 * @help
 * ============================================================================
 * Coreto TP Notetags
 * ============================================================================
 *
 * Use estas notetags em Skills e Items para controlar TP:
 *
 * ---
 *
 * <Gain TP: +x>
 * <Gain TP: -x>
 * <Gain TP: x>
 *
 * - Ganha (+x) ou perde (-x) TP ao usar a skill/item
 * - Sem o sinal, ganha x TP diretamente
 * - Exibe popup de TP gain/damage
 * - Acumula com o tpGain nativo do RPG Maker
 *
 * Exemplos:
 *   <Gain TP: +8>   # Ganha 8 TP
 *   <Gain TP: -5>   # Perde 5 TP
 *   <Gain TP: 10>   # Ganha 10 TP
 *
 * ---
 *
 * <Spend TP: x>
 *
 * - Custo adicional de TP, somado ao tpCost nativo
 * - So aceita valores positivos
 * - O battler precisa ter TP suficiente (tpCost + Spend TP)
 *
 * Exemplos:
 *   <Spend TP: 5>   # Custo total = tpCost + 5
 *   <Spend TP: 10>  # Custo total = tpCost + 10
 *
 * ---
 *
 * <JS Modify TP: code>
 *
 * - JavaScript que modifica o custo final de TP da skill
 * - Variaveis disponiveis: user (battler), skill (objeto), cost (custo atual)
 * - Acesso total a $gameVariables, $gameSwitches, etc.
 * - Deve retornar um numero (novo custo)
 * - Se houver erro, usa o custo anterior e loga warning
 * - Executa DEPOIS de Spend TP (recebe o custo com Spend incluso)
 * - Se presente, o retorno substitui o custo calculado
 *
 * Exemplos:
 *   <JS Modify TP: return cost * 2;>
 *   <JS Modify TP: return user.hp < user.mhp * 0.5 ? 0 : cost;>
 *   <JS Modify TP: return cost - $gameVariables.value(1);>
 *
 * ============================================================================
 *
 * ============================================================================
 * NOTAS TECNICAS — Por que hookamos cada funcao
 * ============================================================================
 *
 * Este plugin NAO usa o hook natural de skillTpCost() porque o sistema de
 * custos do VisuStella (SkillsStatesCore) intercepta skillTpCost com seu
 * proprio CalcJS/CanPayJS/PayJS e faz early return, impedindo que nosso hook
 * na cadeia prototype seja alcancado. Por isso, hookamos diretamente os pontos
 * finais (canPaySkillCost, paySkillCost, drawSkillCost) para garantir que o
 * custo de Spend TP seja aplicado independentemente do VisuStella.
 *
 * Detalhes por hook:
 *
 * 1. canPaySkillCost — Hook necessario porque o VisuStella SkillsStatesCore
 *    (VisuMZ_1_SkillsStatesCore.js:4698) sobrescreve skillTpCost com seu
 *    proprio sistema de CalcJS que faz early return para custos de TP, nunca
 *    chamando a cadeia original. Sem este hook, o jogo nao bloqueia skills
 *    quando o jogador nao tem TP suficiente para o Spend TP.
 *
 * 2. paySkillCost — Hook necessario pelo mesmo motivo acima. O
 *    VisuMZ_2_EnhancedTpSystem.js:1906 sobrescreve useItem() (que chama
 *    paySkillCost) para adicionar ganho de TP via TP Mode. A cadeia
 *    useItem -> paySkillCost -> skillTpCost funciona, mas skillTpCost retorna
 *    apenas o custo do VisuStella (tpCost do JSON = 0), ignorando nosso Spend
 *    TP. Este hook deduz o Spend TP diretamente de _tp apos o custo base.
 *
 * 3. drawSkillCost — Hook necessario para feedback visual. O VisuStella
 *    cost system calcula o custo internamente e nunca propaga Spend TP para
 *    o display. Sem este hook, o menu de skills mostra custo 0.
 *    A funcao nativa (rmmz_windows.js:2457) chama skillTpCost() para exibir,
 *    mas como skillTpCost retorna 0 (tpCost do JSON), o custo real fica
 *    invisivel para o jogador.
 *
 * 4. applyItemUserEffect — Hook para Gain TP. Este funciona normalmente via
 *    cadeia de prototype porque nenhum plugin VisuStella intercepta este
 *    metodo de forma que bloqueie nosso hook.
 *
 * Ordem de carga dos plugins relevantes:
 *   VisuMZ_1_SkillsStatesCore   — sobrescreve skillTpCost (line 4698)
 *   VisuMZ_2_EnhancedTpSystem   — sobrescreve useItem (line 1906)
 *   Coreto_TpNotetags           — hook direto em canPay/pay/draw/apply
 *
 * ============================================================================
 */

(() => {
  // ---------------------------------------------------------------------------
  // Parse: <Gain TP: +x> / <Gain TP: -x> / <Gain TP: x>
  // ---------------------------------------------------------------------------
  const parseGainTpNotetag = function (obj) {
    if (!obj || !obj.note) return null;

    const note = obj.note;
    const regex = /<Gain TP:\s*([+\-]?\d+)>/gi;
    const match = regex.exec(note);

    if (match) {
      return parseInt(match[1], 10);
    }

    return null;
  };

  // ---------------------------------------------------------------------------
  // Parse: <Spend TP: x>
  // ---------------------------------------------------------------------------
  const parseSpendTpNotetag = function (obj) {
    if (!obj || !obj.note) return null;

    const note = obj.note;
    const regex = /<Spend TP:\s*(\d+)>/gi;
    const match = regex.exec(note);

    if (match) {
      return parseInt(match[1], 10);
    }

    return null;
  };

  // ---------------------------------------------------------------------------
  // Parse: <JS Modify TP: code>
  // ---------------------------------------------------------------------------
  const parseJsModifyTpNotetag = function (obj) {
    if (!obj || !obj.note) return null;

    const note = obj.note;
    const regex = /<JS Modify TP:\s*(.+)>/gi;
    const match = regex.exec(note);

    if (match) {
      return match[1].trim();
    }

    return null;
  };

  // ---------------------------------------------------------------------------
  // Helper: calcula custo de Spend TP (com JS Modify TP se presente)
  // Reutilizado por canPaySkillCost, paySkillCost e drawSkillCost
  // ---------------------------------------------------------------------------
  const calcSpendTpCost = function (skill) {
    const spendTp = parseSpendTpNotetag(skill);
    if (spendTp === null) return 0;

    let cost = spendTp;

    const jsCode = parseJsModifyTpNotetag(skill);
    if (jsCode !== null) {
      try {
        const user = this; // Disponivel para uso dentro do eval do JS Modify TP
        const modifiedCost = eval(jsCode);
        if (typeof modifiedCost === 'number' && !isNaN(modifiedCost)) {
          cost = modifiedCost;
        } else {
          console.warn('Coreto_TpNotetags: <JS Modify TP> retornou valor invalido para', skill.name, '- usando custo anterior:', cost);
        }
      } catch (e) {
        console.warn('Coreto_TpNotetags: Erro em <JS Modify TP> para', skill.name, ':', e.message, '- usando custo:', cost);
      }
    }

    return Math.max(0, Math.floor(cost));
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_BattlerBase.prototype.canPaySkillCost
  //
  // Razao: VisuStella SkillsStatesCore (line 4698) sobrescreve skillTpCost
  // com CalcJS proprio que faz early return, impedindo que nosso custo de
  // Spend TP seja considerado na verificacao de pagamento. Sem este hook,
  // skills com Spend TP nao sao bloqueadas quando o jogador nao tem TP
  // suficiente.
  // ---------------------------------------------------------------------------
  const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
  Game_BattlerBase.prototype.canPaySkillCost = function (skill) {
    const result = _Game_BattlerBase_canPaySkillCost.call(this, skill);
    if (!result) return false;

    const spendTpCost = calcSpendTpCost.call(this, skill);
    if (spendTpCost > 0) {
      const baseTpCost = this.skillTpCost(skill);
      return this._tp >= baseTpCost + spendTpCost;
    }
    return true;
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_BattlerBase.prototype.paySkillCost
  //
  // Razao: VisuMZ_2_EnhancedTpSystem (line 1906) sobrescreve useItem() que
  // chama paySkillCost -> skillTpCost. Porem skillTpCost retorna apenas o
  // custo do VisuStella (tpCost do JSON = 0), ignorando Spend TP. Este hook
  // deduz o Spend TP diretamente de _tp apos o custo base ser pago.
  // ---------------------------------------------------------------------------
  const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
  Game_BattlerBase.prototype.paySkillCost = function (skill) {
    _Game_BattlerBase_paySkillCost.call(this, skill);

    const spendTpCost = calcSpendTpCost.call(this, skill);
    if (spendTpCost > 0) {
      this._tp -= spendTpCost;
      if (this._tp < 0) this._tp = 0;
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_Action.prototype.applyItemUserEffect
  //
  // Razao: Ponto de aplicacao do Gain TP. Este hook funciona normalmente via
  // cadeia de prototype porque nenhum VisuStella plugin intercepta este metodo
  // de forma que bloqueie nosso hook. Usa gainTp() (com popup visivel).
  // ---------------------------------------------------------------------------
  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function (target) {
    _Game_Action_applyItemUserEffect.call(this, target);

    const item = this.item();
    if (!item) return;

    const gainTp = parseGainTpNotetag(item);
    if (gainTp !== null && gainTp !== 0) {
      this.subject().gainTp(gainTp);
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Window_SkillList.prototype.drawSkillCost
  //
  // Razao: O display nativo (rmmz_windows.js:2457) chama skillTpCost() para
  // exibir o custo, mas skillTpCost retorna tpCost do JSON (= 0) porque o
  // VisuStella cost system nao propaga nosso Spend TP. Sem este hook, o menu
  // de skills mostra custo 0, sem feedback visual para o jogador.
  // ---------------------------------------------------------------------------
  const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
  Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
    const spendTpCost = calcSpendTpCost.call(this._actor, skill);
    const gainTp = parseGainTpNotetag(skill);

    if (spendTpCost > 0 && gainTp !== null && gainTp !== 0) {
      // Skill com custo E ganho de TP: "5 → +3"
      const baseTpCost = this._actor.skillTpCost(skill);
      const totalTpCost = baseTpCost + spendTpCost;
      this.changeTextColor(ColorManager.tpCostColor());
      this.drawText(totalTpCost + ' \u2192 +' + gainTp, x, y, width, 'right');
    } else if (spendTpCost > 0) {
      // Skill so com custo de TP
      const baseTpCost = this._actor.skillTpCost(skill);
      const totalTpCost = baseTpCost + spendTpCost;
      this.changeTextColor(ColorManager.tpCostColor());
      this.drawText(totalTpCost, x, y, width, 'right');
    } else if (gainTp !== null && gainTp !== 0) {
      // Skill so com ganho de TP: "+8"
      this.changeTextColor(ColorManager.tpCostColor());
      this.drawText('+' + gainTp, x, y, width, 'right');
    } else {
      // Sem custo nem ganho de TP — fallback para display nativo (MP cost, etc.)
      _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    }
  };
})();
