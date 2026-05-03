//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_TpEvents
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetags para ganho de TP baseado em eventos de batalha
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_2_EnhancedTpSystem
 * @orderAfter Coreto_TpNotetags
 *
 * @param Debug Mode
 * @type boolean
 * @default false
 * @desc Log TP events no console para debug
 *
 * @help
 * ============================================================================
 * Coreto TP Events
 * ============================================================================
 *
 * Notetags para ganho de TP baseado em eventos de batalha.
 * Coloque em States OU Skills. Funciona com passive states.
 *
 * Eventos disponiveis:
 *
 *   <TP On Enemy Death: +x>      Inimigo morre (qualquer matou)
 *   <TP On Ally Death: +x>       Aliado morre
 *   <TP On Battle Win: +x>       Vitoria em batalha
 *   <TP On Critical Hit: +x>     Causa acerto critico
 *   <TP On Evasion: +x>          Esquiva de ataque
 *   <TP On Take HP Damage: +x>   Recebe dano HP
 *   <TP On Deal HP Damage: +x>   Causa dano HP
 *   <TP On Gain Buff: +x>        Recebe buff
 *   <TP On Gain Debuff: +x>      Recebe debuff
 *   <TP On Gain State: +x>       Recebe state
 *   <TP On Flee Battle: +x>      Foge da batalha
 *   <TP On Lose Battle: +x>      Perde batalha
 *
 * Exemplos:
 *   <TP On Enemy Death: +8>    Ganha 8 TP quando inimigo morre
 *   <TP On Battle Win: +15>    Ganha 15 TP ao vencer batalha
 *
 * Comportamento:
 *   - TP gain acumula com Enhanced TP System (soma, nao substitui)
 *   - Apenas actors vivos recebem TP de eventos
 *   - Notetags podem ser colocadas em States OU Skills aprendidas
 *   - Múltiplas notetags do mesmo evento somam
 *
 * ============================================================================
 */

(() => {
  'use strict';

  const pluginName = 'Coreto_TpEvents';
  const parameters = PluginManager.parameters(pluginName);
  const debugMode = parameters['Debug Mode'] === 'true';

  // ---------------------------------------------------------------------------
  // Logger
  // ---------------------------------------------------------------------------
  const log = function (message) {
    if (debugMode) {
      console.log(`[${pluginName}] ${message}`);
    }
  };

  // ---------------------------------------------------------------------------
  // Notetag Parser
  // Extrai valor de <TP On EventName: +x> de um objeto (state/skill)
  // Suporta múltiplas ocorrências do mesmo evento (soma)
  // ---------------------------------------------------------------------------
  const parseTpEventNotetag = function (obj, eventName) {
    if (!obj || !obj.note) return 0;

    const regex = new RegExp(`<TP On ${eventName}:\\s*\\+(\\d+)>`, 'gi');
    let total = 0;
    let match;
    while ((match = regex.exec(obj.note)) !== null) {
      total += parseInt(match[1], 10);
    }
    return total;
  };

  // ---------------------------------------------------------------------------
  // State Scanner
  // Coleta TP de todos os passive states + skills aprendidas de um actor
  // ---------------------------------------------------------------------------
  const collectTpEventValue = function (actor, eventName) {
    let total = 0;

    // Passive states ativos no actor (states() inclui passive states)
    const states = actor.states();
    for (const state of states) {
      total += parseTpEventNotetag(state, eventName);
    }

    // Skills aprendidas pelo actor
    const skills = actor.skills();
    for (const skill of skills) {
      total += parseTpEventNotetag(skill, eventName);
    }

    return total;
  };

  // ---------------------------------------------------------------------------
  // applyTpEvent
  // Funcao central: aplica TP gain para um actor em um evento
  // ---------------------------------------------------------------------------
  const applyTpEvent = function (actor, eventName) {
    if (!actor || !actor.isAlive()) return;

    const value = collectTpEventValue(actor, eventName);
    if (value > 0) {
      actor.gainTp(value);
      log(`${actor.name()} +${value} TP on ${eventName}`);
    }
  };

  // ---------------------------------------------------------------------------
  // applyTpEventToParty
  // Aplica TP gain para todos os actors vivos do party
  // ---------------------------------------------------------------------------
  const applyTpEventToParty = function (eventName) {
    if (!$gameParty || !$gameParty.aliveMembers) return;

    const members = $gameParty.aliveMembers();
    for (const actor of members) {
      applyTpEvent(actor, eventName);
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_BattlerBase.prototype.addNewState
  //
  // Razao: Ponto onde death state e adicionado. Quando um enemy morre,
  // escaneia passive states/skills de todos os actors vivos para notetags
  // de <TP On Enemy Death: +x>. Hookamos addNewState em vez de die() porque
  // die() e chamado de dentro de addNewState e nao existe em Game_Enemy
  // como prototype separado.
  // ---------------------------------------------------------------------------
  const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function (stateId) {
    const wasDead = this.isDeathStateAffected();
    _Game_BattlerBase_addNewState.call(this, stateId);

    // Enemy Death: enemy acabou de morrer
    if (!wasDead && stateId === this.deathStateId() && this instanceof Game_Enemy) {
      applyTpEventToParty('Enemy Death');
    }

    // Ally Death: actor acabou de morrer
    if (!wasDead && stateId === this.deathStateId() && this instanceof Game_Actor) {
      applyTpEventToParty('Ally Death');
    }

    // Gain State: actor recebeu state que nao e death
    if (this instanceof Game_Actor && stateId !== this.deathStateId()) {
      applyTpEvent(this, 'Gain State');
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: BattleManager.processVictory
  //
  // Razao: Ponto onde vitoria e processada. Aplica TP gain de
  // <TP On Battle Win: +x> para todos os actors vivos apos a vitoria.
  // Com alias pattern, roda apos o original (incluindo VisuStella).
  // ---------------------------------------------------------------------------
  const _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function () {
    _BattleManager_processVictory.call(this);
    applyTpEventToParty('Battle Win');
  };

  // ---------------------------------------------------------------------------
  // Hook: BattleManager.processEscape (onEscapeSuccess)
  //
  // Razao: Ponto onde fuga bem-sucedida e processada.
  // ---------------------------------------------------------------------------
  const _BattleManager_onEscapeSuccess = BattleManager.onEscapeSuccess;
  BattleManager.onEscapeSuccess = function () {
    _BattleManager_onEscapeSuccess.call(this);
    applyTpEventToParty('Flee Battle');
  };

  // ---------------------------------------------------------------------------
  // Hook: BattleManager.processDefeat
  //
  // Razao: Ponto onde derrota e processada.
  // ---------------------------------------------------------------------------
  const _BattleManager_processDefeat = BattleManager.processDefeat;
  BattleManager.processDefeat = function () {
    _BattleManager_processDefeat.call(this);
    applyTpEventToParty('Lose Battle');
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_Action.prototype.apply
  //
  // Razao: Ponto onde evasion e determinada (result.evaded). Quando target
  // esquivou, aplica TP gain de <TP On Evasion: +x>. Verificamos depois do
  // original porque result.evaded so e setado dentro de apply().
  // ---------------------------------------------------------------------------
  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    _Game_Action_apply.call(this, target);

    // Evasion: target esquivou do ataque
    if (target.result().evaded && target instanceof Game_Actor) {
      applyTpEvent(target, 'Evasion');
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_Action.prototype.executeDamage
  //
  // Razao: Ponto central onde dano e aplicado ao target. Hook unico para
  // tres eventos:
  // - Critical Hit: subject causou acerto critico (capturado antes do original
  //   pois executeDamage reseta critical=false quando value=0)
  // - Deal HP Damage: subject causou dano HP > 0 em alguem
  // - Take HP Damage: target recebeu dano HP > 0
  // Filtramos por isHpEffect() para nao triggerar em dano/cura de MP.
  // ---------------------------------------------------------------------------
  const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function (target, value) {
    const wasCritical = target.result().critical && this.isHpEffect() && value > 0;

    _Game_Action_executeDamage.call(this, target, value);

    if (this.isHpEffect() && value > 0) {
      const subject = this.subject();

      // Critical Hit: subject causou acerto critico
      if (wasCritical && subject instanceof Game_Actor) {
        applyTpEvent(subject, 'Critical Hit');
      }

      // Deal HP Damage: subject causou dano HP
      if (subject instanceof Game_Actor) {
        applyTpEvent(subject, 'Deal HP Damage');
      }

      // Take HP Damage: target recebeu dano HP
      if (target instanceof Game_Actor) {
        applyTpEvent(target, 'Take HP Damage');
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_Battler.prototype.addBuff
  //
  // Razao: Ponto onde buff e adicionado. Quando actor recebe buff,
  // aplica TP gain de <TP On Gain Buff: +x>.
  // ---------------------------------------------------------------------------
  const _Game_Battler_addBuff = Game_Battler.prototype.addBuff;
  Game_Battler.prototype.addBuff = function (paramId, turns) {
    _Game_Battler_addBuff.call(this, paramId, turns);

    if (this instanceof Game_Actor) {
      applyTpEvent(this, 'Gain Buff');
    }
  };

  // ---------------------------------------------------------------------------
  // Hook: Game_Battler.prototype.addDebuff
  //
  // Razao: Ponto onde debuff e adicionado. Quando actor recebe debuff,
  // aplica TP gain de <TP On Gain Debuff: +x>.
  // ---------------------------------------------------------------------------
  const _Game_Battler_addDebuff = Game_Battler.prototype.addDebuff;
  Game_Battler.prototype.addDebuff = function (paramId, turns) {
    _Game_Battler_addDebuff.call(this, paramId, turns);

    if (this instanceof Game_Actor) {
      applyTpEvent(this, 'Gain Debuff');
    }
  };
})();
