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
})();
