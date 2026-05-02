//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_Killin
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Mecanicas customizadas do personagem Kilin (Bodyguard, etc.)
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_2_BattleSystemATB
 * @orderAfter Coreto_StateEffects
 * @orderAfter Coreto_TpNotetags
 *
 * @help
 * ============================================================================
 * Coreto Killin - Mecanicas do Kilin
 * ============================================================================
 *
 * Este plugin implementa mecanicas customizadas para o personagem Kilin.
 * Atualmente implementa o sistema de Bodyguard.
 *
 * ============================================================================
 * Bodyguard
 * ============================================================================
 *
 * O sistema de Bodyguard permite que um personagem proteja aliados,
 * interceptando ataques inimigos antes que causem dano.
 *
 * ---
 *
 * <Bodyguard>
 *
 * - Usado em: Actor, Class, Weapon, Armor, Enemy
 * - Marca a unidade como um bodyguard
 * - Quando um aliado protegido e atacado, o bodyguard intercepta o ataque
 *   e se torna o alvo real, recebendo o dano calculado com seus proprios
 *   status (DEF/MDF)
 * - Efeitos de status (stun, poison, etc.) tambem sao aplicados no bodyguard
 * - Apenas intercepta ataques de alvo unico de oponentes (nao intercepta
 *   AoE, curas ou buffs)
 * - O bodyguard ganha TP ao interceptar: floor(dano recebido / 20)
 *
 * ---
 *
 * <Bodyguard State: stateId>
 *
 * - Usado em: Skill
 * - Associa um state a mecanica de bodyguard
 * - Quando a skill e usada por um bodyguard, o target recebe o state
 *   e o bodyguard e registrado como protetor
 * - Substitua stateId pelo ID do estado de protecao
 * - O state de protecao e removido automaticamente no inicio do turno
 *   do bodyguard
 *
 * Exemplo:
 *   <Bodyguard State: 83>  # Usa o estado ID 83 como marcador de protecao
 *
 * ---
 *
 * Fluxo da Interceptacao:
 *   1. Kilin usa skill com <Bodyguard State: 83> em um aliado
 *   2. Aliado recebe State 83 e Kilin e registrado como protetor
 *   3. Inimigo ataca o aliado
 *   4. Plugin intercepta ANTES do calculo de dano
 *   5. Kilin se torna o alvo real (dano usa DEF/MDF do Kilin)
 *   6. States de CC (stun, etc.) sao aplicados no Kilin
 *   7. Apenas 1 popup de dano aparece (no Kilin)
 *   8. Kilin ganha TP = floor(dano / 20)
 *   9. Contra-ataque Represalia e ativado (se Kilin tiver State 82)
 *  10. No inicio do turno do Kilin, State 83 e removido do aliado
 *
 * ============================================================================
 * Notas Importantes
 * ============================================================================
 *
 * - Este plugin deve ser carregado APOS todos os plugins Coreto
 * - Os dados (States, Actors, Skills) devem ser atualizados via RPG Maker
 *   Editor com o editor FECHADO para edicoes manuais em JSON
 * - State 83 (Bodyguard) deve ter seu JS Pre-Damage removido, tornando-se
 *   apenas um marcador visual
 *
 * ============================================================================
 */

(() => {
  const PLUGIN_NAME = 'Coreto_Killin';

  // =========================================================================
  // Registry - IDs dos states de bodyguard (preenchido no onLoad)
  //
  // Preencido quando $dataSkills carrega. Nao valida contra $dataStates
  // aqui porque $dataStates pode nao estar carregado ainda. A validacao
  // acontece em parseBodyguardStateNotetag em tempo de uso.
  // =========================================================================

  const BODYGUARD_STATE_IDS = new Set();

  const scanBodyguardStates = function () {
    if (!$dataSkills) return;
    const regex = /<Bodyguard State:\s*(\d+)>/i;
    for (const skill of $dataSkills) {
      if (!skill) continue;
      const match = regex.exec(skill.note);
      if (match) {
        BODYGUARD_STATE_IDS.add(parseInt(match[1], 10));
      }
    }
  };

  let _statesScanned = false;

  const ensureStatesScanned = function () {
    if (!_statesScanned && $dataSkills) {
      scanBodyguardStates();
      _statesScanned = true;
    }
  };

  // =========================================================================
  // Notetag Parsing
  // =========================================================================

  /**
   * Verifica se o objeto tem a notetag <Bodyguard>
   * Usado em Actor, Class, Weapon, Armor, Enemy
   */
  const parseBodyguardNotetag = function (obj) {
    if (!obj || !obj.note) return false;
    return /<Bodyguard>/i.test(obj.note);
  };

  /**
   * Extrai o stateId da notetag <Bodyguard State: stateId>
   * Usado em Skills. Valida contra $dataStates (disponivel em runtime).
   */
  const parseBodyguardStateNotetag = function (obj) {
    if (!obj || !obj.note) return null;
    const regex = /<Bodyguard State:\s*(\d+)>/i;
    const match = regex.exec(obj.note);
    if (match) {
      const stateId = parseInt(match[1], 10);
      if ($dataStates && $dataStates[stateId]) {
        return stateId;
      }
      console.warn(PLUGIN_NAME + ': <Bodyguard State: ' + stateId + '> referencia estado invalido.');
      return null;
    }
    return null;
  };

  // =========================================================================
  // Core Logic
  // =========================================================================

  /**
   * Verifica se um battler e um bodyguard (tem <Bodyguard> em trait objects)
   * Usa cache invalidado no refresh
   */
  const isBodyguard = function (battler) {
    if (!battler) return false;
    if (battler._bodyguardCache !== undefined) return battler._bodyguardCache;

    ensureStatesScanned();

    const traitObjects = battler.traitObjects();
    battler._bodyguardCache = traitObjects.some(function (obj) {
      return parseBodyguardNotetag(obj);
    });
    return battler._bodyguardCache;
  };

  /**
   * Retorna o bodyguard para redirecionar, ou null se nao deve redirecionar.
   * Guards: protetor vivo, e bodyguard, nao e o proprio target,
   * action e de oponente, action nao e AoE.
   */
  const getBodyguardTarget = function (target, action) {
    try {
      if (!target || !target._bodyguardProtector) return null;

      const protector = target._bodyguardProtector;

      if (!protector.isAlive()) return null;
      if (!isBodyguard(protector)) return null;
      if (protector === target) return null;
      if (!action.isForOpponent()) return null;
      if (action.isForAll()) return null;

      return protector;
    } catch (e) {
      console.warn(PLUGIN_NAME + ': Erro ao verificar bodyguard target:', e.message);
      return null;
    }
  };

  /**
   * Remove todos os states de protecao bodyguard aplicados por um bodyguard
   * e limpa as referencias de protetor nos aliados
   */
  const cleanupBodyguardProtection = function (bodyguard) {
    if (!$gameParty) return;

    const members = $gameParty.battleMembers();
    for (const member of members) {
      if (member._bodyguardProtector === bodyguard) {
        for (const stateId of BODYGUARD_STATE_IDS) {
          if (member.isStateAffected(stateId)) {
            member.removeState(stateId);
          }
        }
        member._bodyguardProtector = null;
      }
    }
  };

  // =========================================================================
  // Hooks - Game_Action.prototype.apply (Redirecionamento principal)
  //
  // Intercepta a aplicacao de dano: se o target tem um bodyguard registrado,
  // o bodyguard se torna o alvo real. Importante: startDamagePopup() e
  // chamado explicitamente porque o VisuStella BattleCore sobrescreve o
  // sistema de popup para usar _damagePopupArray, e o redirect sozinho
  // nao alimenta esse array corretamente.
  // =========================================================================

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    ensureStatesScanned();

    const bodyguard = getBodyguardTarget(target, this);

    if (bodyguard) {
      // Seta flag de interceptacao para o contra-ataque (State 82 Represalia)
      bodyguard._bodyguardIntercept = true;

      // Redireciona: bodyguard se torna o alvo REAL
      _Game_Action_apply.call(this, bodyguard);

      // Forca damage popup (compatibilidade VisuStella BattleCore)
      bodyguard.startDamagePopup();

      // TP gain baseado no dano recebido
      const hpDamage = bodyguard.result().hpDamage;
      if (hpDamage > 0) {
        bodyguard.gainTp(Math.floor(hpDamage / 20));
      }

      // Visual: 70% chance de mensagem "pular na frente"
      if (Math.random() < 0.7 && target.isAlive()) {
        BattleManager._logWindow.addText(bodyguard.name() + ' pulou na frente de ' + target.name() + '!');
      }

      return; // Target original nunca e atingido
    }

    _Game_Action_apply.call(this, target);
  };

  // =========================================================================
  // Hooks - Game_Action.prototype.applyItemUserEffect (Registro do protetor)
  //
  // Apos a skill ser aplicada, verifica se ela tem <Bodyguard State: N>.
  // Se o subject e um bodyguard e o state foi aplicado no target,
  // registra o subject como protetor do target.
  // =========================================================================

  const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
  Game_Action.prototype.applyItemUserEffect = function (target) {
    _Game_Action_applyItemUserEffect.call(this, target);

    if (!target || target.isDead()) return;

    const item = this.item();
    if (!item) return;

    const bodyguardStateId = parseBodyguardStateNotetag(item);
    if (bodyguardStateId === null) return;

    const subject = this.subject();
    if (!isBodyguard(subject)) return;

    // Registra o protetor se o state foi aplicado com sucesso
    if (target.isStateAffected(bodyguardStateId)) {
      target._bodyguardProtector = subject;
    }
  };

  // =========================================================================
  // Hooks - Game_Battler.prototype.startTpbTurn (Cleanup no turno do bodyguard)
  //
  // No ATB, BattleManager.startTurn nao tem acesso ao _subject do battler.
  // startTpbTurn e chamado individualmente quando o turno de cada battler
  // comeca, equivalente ao <JS Post-Start Turn> do VisuStella.
  // Aqui removemos a protecao bodyguard quando o turno do bodyguard chega.
  // =========================================================================

  const _Game_Battler_startTpbTurn = Game_Battler.prototype.startTpbTurn;
  Game_Battler.prototype.startTpbTurn = function () {
    _Game_Battler_startTpbTurn.call(this);

    if (isBodyguard(this)) {
      cleanupBodyguardProtection(this);
    }
  };

  // =========================================================================
  // Hooks - Game_Battler.prototype.onBattleEnd (Cleanup de batalha)
  // =========================================================================

  const _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function () {
    _Game_Battler_onBattleEnd.call(this);

    this._bodyguardProtector = null;
    this._bodyguardIntercept = false;
    this._bodyguardCache = undefined;
  };

  // =========================================================================
  // Hooks - Game_Actor.prototype.refresh (Invalidacao de cache)
  // =========================================================================

  const _Game_Actor_refresh = Game_Actor.prototype.refresh;
  Game_Actor.prototype.refresh = function () {
    this._bodyguardCache = undefined;
    _Game_Actor_refresh.call(this);
  };

  // =========================================================================
  // Hooks - DataManager.onLoad (Scan de states no carregamento)
  //
  // Escaneia $dataSkills para encontrar <Bodyguard State: N> notetags.
  // Nao valida contra $dataStates aqui pois pode nao estar carregado ainda.
  // =========================================================================

  const _DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);

    if (object === $dataSkills) {
      scanBodyguardStates();
      _statesScanned = true;
    }
  };
})();
