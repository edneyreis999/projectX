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
 *   4. Plugin intercepta em startAction (ANTES da action sequence)
 *   5. Kilin pula na frente do aliado (18 frames de animacao)
 *   6. Log window espera (25 frames) - inimigo parado
 *   7. Wait expira, inimigo inicia animacao de ataque
 *   8. Dano e redirecionado para Kilin (apply hook)
 *   9. Kilin permanece na posicao ate endAction (dinamico)
 *  10. Kilin retorna a posicao original (16 frames)
 *  11. Kilin ganha TP = floor(dano / 20)
 *  12. Contra-ataque Represalia e ativado (se Kilin tiver State 82)
 *  13. No inicio do turno do Kilin, State 83 e removido do aliado
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

  const BG_DEBUG = typeof Utils !== 'undefined' && Utils.isOptionValid && Utils.isOptionValid('test');

  const dbg = (...args) => {
    if (BG_DEBUG) console.log('[Killin]', ...args);
  };

  // =========================================================================
  // Constants
  // =========================================================================

  const BODYGUARD_NOTETAG_REGEX = /<Bodyguard State:\s*(\d+)>/i;

  const BODYGUARD_STATE_IDS = new Set();

  // State machine states
  const BG_ANIM_STATE = {
    MOVING_TO_ALLY: 'movingToAlly',
    WAITING_FOR_ATTACK: 'waitingForAttack',
    RETURNING_HOME: 'returningHome',
  };

  // Bodyguard intercept animation settings
  const BODYGUARD_ANIM = {
    MOVE_DURATION: 12,
    JUMP_HEIGHT: 100,
    RETURN_DURATION: 16,
    ALLY_RESTORE_DURATION: 8,
    OFFSET_X: -44,
    PRE_ACTION_WAIT: 25,
  };

  const BODYGUARD_MSG_CHANCE = 0.7;
  const BODYGUARD_TP_DIVISOR = 20;

  const scanBodyguardStates = () => {
    if (!$dataSkills) return;
    for (const skill of $dataSkills) {
      if (!skill) continue;
      const match = BODYGUARD_NOTETAG_REGEX.exec(skill.note);
      if (match) {
        BODYGUARD_STATE_IDS.add(parseInt(match[1], 10));
      }
    }
  };

  let _statesScanned = false;

  const ensureStatesScanned = () => {
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
  const parseBodyguardNotetag = obj => {
    if (!obj || !obj.note) return false;
    return /<Bodyguard>/i.test(obj.note);
  };

  /**
   * Extrai o stateId da notetag <Bodyguard State: stateId>
   * Usado em Skills. Valida contra $dataStates (disponivel em runtime).
   */
  const parseBodyguardStateNotetag = obj => {
    if (!obj || !obj.note) return null;
    const match = BODYGUARD_NOTETAG_REGEX.exec(obj.note);
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
  const isBodyguard = battler => {
    if (!battler) return false;
    if (battler._bodyguardCache !== undefined) return battler._bodyguardCache;

    ensureStatesScanned();

    const traitObjects = battler.traitObjects();
    battler._bodyguardCache = traitObjects.some(obj => parseBodyguardNotetag(obj));
    return battler._bodyguardCache;
  };

  /**
   * Retorna o bodyguard para redirecionar, ou null se nao deve redirecionar.
   * Guards: protetor vivo, e bodyguard, nao e o proprio target,
   * action e de oponente, action nao e AoE.
   */
  const getBodyguardTarget = (target, action) => {
    if (!target || !target._bodyguardProtector) return null;

    const protector = target._bodyguardProtector;

    if (!protector.isAlive()) return null;
    if (!isBodyguard(protector)) return null;
    if (protector === target) return null;
    if (!action.isForOpponent()) return null;
    if (action.isForAll()) return null;

    return protector;
  };

  /**
   * Remove todos os states de protecao bodyguard aplicados por um bodyguard
   * e limpa as referencias de protetor nos aliados
   */
  const cleanupBodyguardProtection = bodyguard => {
    const partyMembers = $gameParty ? $gameParty.battleMembers() : [];
    const troopMembers = $gameTroop ? $gameTroop.members() : [];
    const members = partyMembers.concat(troopMembers);

    for (const member of members) {
      if (member._bodyguardProtector === bodyguard) {
        for (const stateId of BODYGUARD_STATE_IDS) {
          if (member.isStateAffected(stateId)) {
            member.removeState(stateId);
          }
        }
        delete member._bodyguardProtector;
      }
    }
  };

  /**
   * Remove todas as propriedades bodyguard de um battler (cleanup de batalha)
   */
  const resetBattlerBodyguardState = battler => {
    delete battler._bodyguardProtector;
    delete battler._bodyguardIntercept;
    delete battler._bodyguardCache;
    delete battler._bodyguardAnimState;
    delete battler._bodyguardReturnTriggered;
    delete battler._bodyguardAnimPreStarted;
    delete battler._bodyguardSavedOffsetX;
    delete battler._bodyguardSavedOffsetY;
    delete battler._bodyguardProtectedAlly;
  };

  /**
   * Inicia a animacao visual de interceptacao do bodyguard.
   * Move o sprite do bodyguard em direcao ao aliado com um pulo,
   * usando o sistema de offsets do Sprite_Battler (nao modifica _homeX/_homeY).
   * Simultaneamente reseta o aliado para a posicao home para evitar sobreposicao.
   */
  const startBodyguardInterceptAnimation = (bodyguard, target) => {
    if (!$gameSystem.isSideView()) return;
    const spriteset = SceneManager._scene && SceneManager._scene._spriteset;
    if (!spriteset) return;

    const bgSprite = spriteset.findTargetSprite(bodyguard);
    const tgtSprite = spriteset.findTargetSprite(target);
    if (!bgSprite || !tgtSprite) return;

    // Salvar offset atual do aliado (ex: passo a frente do ATB)
    target._bodyguardSavedOffsetX = tgtSprite._offsetX;
    target._bodyguardSavedOffsetY = tgtSprite._offsetY;

    // Killin move para a posicao HOME do aliado (aliado sera resetado junto)
    const dx = tgtSprite._homeX + BODYGUARD_ANIM.OFFSET_X - bgSprite._homeX;
    const dy = tgtSprite._homeY - bgSprite._homeY;

    bgSprite.startMove(dx, dy, BODYGUARD_ANIM.MOVE_DURATION);
    bgSprite.startJump(BODYGUARD_ANIM.JUMP_HEIGHT, BODYGUARD_ANIM.MOVE_DURATION);

    // Resetar aliado para home simultaneamente
    tgtSprite.startMove(0, 0, BODYGUARD_ANIM.MOVE_DURATION);

    bodyguard._bodyguardAnimState = BG_ANIM_STATE.MOVING_TO_ALLY;
    bodyguard._bodyguardProtectedAlly = target;

    dbg('interceptAnim: aliado resetado para home', {
      savedOffsetX: target._bodyguardSavedOffsetX,
      savedOffsetY: target._bodyguardSavedOffsetY,
    });
  };

  // =========================================================================
  // Hooks - BattleManager.startAction (Pre-move: Kilin pula ANTES do inimigo)
  //
  // Empilha waitCount no log window ANTES dos comandos visuais do inimigo.
  // Isso faz o engine esperar enquanto o Kilin se move, criando a sequencia:
  // Kilin pula → wait expira → inimigo anima/ataca → apply redirect → Kilin volta.
  // =========================================================================

  const _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function () {
    const subject = this._subject;
    const action = subject ? subject.currentAction() : null;

    if (action && action.isForOpponent() && !action.isForAll()) {
      ensureStatesScanned();
      const targets = action.makeTargets();
      for (const target of targets) {
        const bodyguard = getBodyguardTarget(target, action);
        if (bodyguard) {
          dbg('startAction: intercept detectado!', {
            bodyguard: bodyguard.name(),
            target: target.name(),
            wait: BODYGUARD_ANIM.PRE_ACTION_WAIT,
          });

          // Inicia animacao do Kilin ANTES da action sequence
          startBodyguardInterceptAnimation(bodyguard, target);
          bodyguard._bodyguardAnimPreStarted = true;

          // Armazena referencia para o hook de endAction triggerar retorno
          this._bodyguardReturnPending = bodyguard;

          // Mapa de redirecionamento de animação (aliado → Killin)
          this._bodyguardAnimRedirect = new Map();
          this._bodyguardAnimRedirect.set(target, bodyguard);

          // Empilha wait ANTES dos comandos que startAction vai adicionar
          if (this._logWindow) {
            this._logWindow.push('waitCount', BODYGUARD_ANIM.PRE_ACTION_WAIT);
            dbg('startAction: waitCount empilhado');
          }
          break;
        }
      }
    }

    _BattleManager_startAction.call(this);
  };

  // =========================================================================
  // Hooks - BattleManager.endAction (Trigger retorno do bodyguard)
  //
  // Quando endAction e chamado, a action sequence visual do inimigo ja foi
  // completamente processada pelo log window. E o momento seguro para
  // triggerar o retorno do Killin a posicao original.
  // =========================================================================

  const _BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function () {
    _BattleManager_endAction.call(this);

    if (this._bodyguardReturnPending) {
      const bg = this._bodyguardReturnPending;
      bg._bodyguardReturnTriggered = true;
      bg._bodyguardAnimPreStarted = false;
      bg._bodyguardIntercept = false;
      this._bodyguardReturnPending = null;
      this._bodyguardAnimRedirect = null;
      dbg('endAction: return triggered + flags cleared for', bg.name());
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

      // Animacao: iniciada em startAction (normal) ou aqui (fallback).
      // Nao deleta _bodyguardAnimPreStarted aqui - multi-hit skills chamam
      // apply N vezes e o flag precisa persistir ate endAction.
      if (!bodyguard._bodyguardAnimPreStarted) {
        dbg('apply: iniciando animacao aqui (fallback)');
        startBodyguardInterceptAnimation(bodyguard, target);
      }

      // Redireciona: bodyguard se torna o alvo REAL
      _Game_Action_apply.call(this, bodyguard);

      // Forca damage popup (compatibilidade VisuStella BattleCore)
      bodyguard.startDamagePopup();

      // TP gain baseado no dano recebido
      const hpDamage = bodyguard.result().hpDamage;
      if (hpDamage > 0) {
        bodyguard.gainTp(Math.floor(hpDamage / BODYGUARD_TP_DIVISOR));
      }

      // Visual: mensagem "pular na frente"
      if (Math.random() < BODYGUARD_MSG_CHANCE && target.isAlive()) {
        BattleManager._logWindow.addText(bodyguard.name() + ' pulou na frente de ' + target.name() + '!');
      }

      dbg('apply: dano redirecionado', { bodyguard: bodyguard.name(), hpDamage: hpDamage });
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

    resetBattlerBodyguardState(this);
  };

  // =========================================================================
  // Hooks - Sprite_Actor.prototype.updateMain (Animacao de interceptacao)
  //
  // State machine em 3 fases: movingToAlly → waitingForAttack → returningHome.
  // Roda a cada frame enquanto _bodyguardAnimState estiver setado no battler.
  // =========================================================================

  const _Sprite_Actor_updateMain = Sprite_Actor.prototype.updateMain;
  Sprite_Actor.prototype.updateMain = function () {
    _Sprite_Actor_updateMain.call(this);

    const battler = this._battler;
    if (!battler || !battler._bodyguardAnimState) return;

    switch (battler._bodyguardAnimState) {
      case BG_ANIM_STATE.MOVING_TO_ALLY:
        if (!this.isMoving()) {
          battler._bodyguardAnimState = BG_ANIM_STATE.WAITING_FOR_ATTACK;
          dbg('stateMachine: movingToAlly → waitingForAttack');
        }
        break;
      case BG_ANIM_STATE.WAITING_FOR_ATTACK:
        if (battler._bodyguardReturnTriggered) {
          this.startMove(0, 0, BODYGUARD_ANIM.RETURN_DURATION);
          battler._bodyguardAnimState = BG_ANIM_STATE.RETURNING_HOME;
          delete battler._bodyguardReturnTriggered;
          dbg('stateMachine: waitingForAttack → returningHome (endAction triggered)');
        }
        break;
      case BG_ANIM_STATE.RETURNING_HOME:
        if (!this.isMoving()) {
          battler._bodyguardAnimState = null;

          // Restaurar posicao do aliado (passo a frente)
          const ally = battler._bodyguardProtectedAlly;
          if (ally && ally._bodyguardSavedOffsetX !== undefined) {
            const ss = SceneManager._scene && SceneManager._scene._spriteset;
            const aSprite = ss ? ss.findTargetSprite(ally) : null;
            if (aSprite) {
              aSprite.startMove(ally._bodyguardSavedOffsetX, ally._bodyguardSavedOffsetY, BODYGUARD_ANIM.ALLY_RESTORE_DURATION);
              dbg('stateMachine: aliado restaurou passo a frente');
            }
            delete ally._bodyguardSavedOffsetX;
            delete ally._bodyguardSavedOffsetY;
          }
          delete battler._bodyguardProtectedAlly;

          dbg('stateMachine: returningHome → idle');
        }
        break;
    }
  };

  // =========================================================================
  // Hooks - Game_BattlerBase.prototype.refresh (Invalidacao de cache)
  //
  // Hook em BattlerBase (nao Actor) para cobrir Enemies como bodyguards.
  // =========================================================================

  const _Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
  Game_BattlerBase.prototype.refresh = function () {
    this._bodyguardCache = undefined;
    _Game_BattlerBase_refresh.call(this);
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

  // =========================================================================
  // Hooks - Game_Temp.prototype.requestAnimation (Redirect de animação)
  //
  // Gargalo universal: tanto RPG Maker padrão quanto VisuStella ActSeq
  // passam por aqui. Durante interceptação bodyguard, redireciona o target
  // da animação do aliado para o Killin (que já está na posição correta).
  // =========================================================================

  const _Game_Temp_requestAnimation = Game_Temp.prototype.requestAnimation;
  Game_Temp.prototype.requestAnimation = function (targets, animationId, mirror) {
    if (BattleManager._bodyguardAnimRedirect) {
      const redirect = BattleManager._bodyguardAnimRedirect;
      targets = targets.map(function (t) {
        return redirect.get(t) || t;
      });
      dbg('requestAnimation: targets redirecionados');
    }
    _Game_Temp_requestAnimation.call(this, targets, animationId, mirror);
  };
})();
