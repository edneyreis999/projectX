//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto Auto Triggers
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Triggers de Miss para o sistema de combate (expande VisuStella Auto Skill Triggers)
 * @author Coreto
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_3_AutoSkillTriggers
 *
 * @param MaxTriggersPerTurn
 * @text Max Triggers por Turno
 * @type number
 * @min 1
 * @max 20
 * @default 5
 * @desc Quantos triggers de miss cada battler pode executar por turno.
 *
 * @param DebugLogs
 * @text Debug Logs
 * @type boolean
 * @on Sim
 * @off Nao
 * @default false
 * @desc Exibe logs de debug no console (NW.js) quando miss/evade e detectado.
 *
 * @help
 * ============================================================================
 * Coreto Auto Triggers - Triggers de Miss
 * ============================================================================
 *
 * Adiciona triggers que disparam automaticamente quando um ataque erra
 * (miss) ou o alvo esquiva (evade). Compativel com o sistema VisuStella
 * Auto Skill Triggers.
 *
 * ----------------------------------------------------------------------------
 * Notetags
 * ----------------------------------------------------------------------------
 *
 * <Coreto Trigger: CONDITION>
 * <Coreto Trigger X%: CONDITION>
 * <Coreto Silent Trigger: CONDITION>
 * <Coreto Silent Trigger X%: CONDITION>
 *
 * - X% = chance do trigger disparar (padrao 100%)
 * - "Silent" = aplica efeitos diretamente (ex: Gain TP) sem forceAction
 * - CONDITION = uma das condicoes abaixo
 *
 * Condicoes disponiveis:
 *
 *   Miss User
 *   - Trigger para o ATTACKER que errou o alvo.
 *
 *   Miss Target
 *   - Trigger para o TARGET que esquivou do ataque.
 *
 *   Miss Ally
 *   - Trigger para aliados do target que viram a esquiva.
 *
 *   Miss Enemy
 *   - Trigger para inimigos do target que viram o ataque errar.
 *
 *   Miss Friends
 *   - Trigger para todo o time aliado do target.
 *
 *   Miss Friends Only
 *   - Trigger para o time aliado do target, exceto o proprio target.
 *
 *   Miss Opponents
 *   - Trigger para todo o time oposto ao target.
 *
 * ----------------------------------------------------------------------------
 * Exemplos
 * ----------------------------------------------------------------------------
 *
 * <Coreto Trigger: Miss User>
 * <Coreto Trigger 50%: Miss User>
 * <Coreto Trigger: Miss Target>
 * <Coreto Trigger 75%: Miss Target>
 * <Coreto Silent Trigger: Miss User>
 * <Coreto Silent Trigger 50%: Miss Target>
 *
 * ============================================================================
 */

(() => {
  const pluginName = "Coreto_Auto_Triggers";
  const params = PluginManager.parameters(pluginName);
  const maxTriggersPerTurn = Number(params["MaxTriggersPerTurn"]) || 5;
  const debugLogs = params["DebugLogs"] === "true";

  const log = function (...args) {
    if (debugLogs) console.log("[Coreto Triggers]", ...args);
  };

  // -------------------------------------------------------------------------
  // Notetag Parser
  // -------------------------------------------------------------------------
  // Cache: { skillId: [{ condition: string, chance: number }] }
  const _triggerCache = {};

  const parseTriggerNotetags = function () {
    if (!_triggerCache || Object.keys(_triggerCache).length > 0) return;

    const regex = /<Coreto (Silent )?Trigger(?:\s+(\d+)%?)?:\s*(.+?)>/gi;

    for (const skill of $dataSkills) {
      if (!skill || !skill.note) continue;

      let match;
      while ((match = regex.exec(skill.note)) !== null) {
        const silent = !!match[1];
        const chance = match[2] ? parseInt(match[2]) : 100;
        const condition = match[3].trim().toUpperCase();

        if (!_triggerCache[skill.id]) {
          _triggerCache[skill.id] = [];
        }
        _triggerCache[skill.id].push({ condition: condition, chance: chance, silent: silent });
      }
    }

    if (Object.keys(_triggerCache).length > 0) {
      log("Parser: carregado");
    }
  };

  const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function () {
    _Scene_Boot_onDatabaseLoaded.call(this);
    parseTriggerNotetags();
  };

  // -------------------------------------------------------------------------
  // Turn limit tracking
  // -------------------------------------------------------------------------
  const _BattleManager_startTurn = BattleManager.startTurn;
  BattleManager.startTurn = function () {
    _BattleManager_startTurn.call(this);
    for (const battler of this.allBattleMembers()) {
      battler._coretoTriggersThisTurn = 0;
    }
  };

  // -------------------------------------------------------------------------
  // Trigger helpers
  // -------------------------------------------------------------------------
  const getTriggersForBattler = function (battler, condition) {
    const results = [];
    const allSkills = battler.skills ? battler.skills() : [];

    for (const skill of allSkills) {
      const skillId = typeof skill === "object" ? skill.id : skill;
      const triggers = _triggerCache[skillId];
      if (!triggers) continue;

      for (const trigger of triggers) {
        if (trigger.condition === condition) {
          results.push({ skillId: skillId, chance: trigger.chance, silent: trigger.silent });
        }
      }
    }

    return results;
  };

  const canPerformTrigger = function (battler) {
    if (!battler.isAlive()) return false;
    if (!battler.canMove()) return false;
    if ((battler._coretoTriggersThisTurn || 0) >= maxTriggersPerTurn) return false;
    return true;
  };

  const silentTriggerSkill = function (battler, skillId) {
    const skill = $dataSkills[skillId];
    if (!skill) return false;

    battler._coretoTriggersThisTurn =
      (battler._coretoTriggersThisTurn || 0) + 1;

    const gainTpMatch = skill.note.match(/<Gain TP:\s*([+\-]?\d+)>/i);
    if (gainTpMatch) {
      const tpAmount = parseInt(gainTpMatch[1], 10);
      battler.gainTp(tpAmount);
    }

    log(
      "  SILENT TRIGGERED:",
      battler.name(),
      "->",
      skill.name,
      "(turno:",
      battler._coretoTriggersThisTurn,
      "/" + maxTriggersPerTurn + ")"
    );
    return true;
  };

  const forceTriggerSkill = function (battler, skillId, silent) {
    if (silent) return silentTriggerSkill(battler, skillId);

    const skill = $dataSkills[skillId];
    if (!skill) return false;
    if (!battler.canUse(skill)) {
      log("  BLOCKED: battler nao pode usar skill", skillId);
      return false;
    }

    battler._coretoTriggersThisTurn =
      (battler._coretoTriggersThisTurn || 0) + 1;
    battler.forceAction(skillId, -1);
    BattleManager.forceAction(battler);

    log(
      "  TRIGGERED:",
      battler.name(),
      "->",
      skill.name,
      "(turno:",
      battler._coretoTriggersThisTurn,
      "/" + maxTriggersPerTurn + ")"
    );
    return true;
  };

  const processTriggersForCondition = function (battler, condition) {
    if (!canPerformTrigger(battler)) return;

    const triggers = getTriggersForBattler(battler, condition);
    for (const trigger of triggers) {
      const roll = Math.random() * 100;
      if (roll >= trigger.chance) continue;

      forceTriggerSkill(battler, trigger.skillId, trigger.silent);
    }
  };

  // -------------------------------------------------------------------------
  // Perspective dispatcher
  // -------------------------------------------------------------------------
  const dispatchMissTriggers = function (subject, target) {
    // MISS USER - o attacker que errou
    processTriggersForCondition(subject, "MISS USER");

    // MISS TARGET - o target que esquivou
    processTriggersForCondition(target, "MISS TARGET");

    // MISS ALLY / MISS ENEMY - target em relacao ao subject
    if (target.isActor() === subject.isActor()) {
      processTriggersForCondition(target, "MISS ALLY");
    } else {
      processTriggersForCondition(target, "MISS ENEMY");
    }

    // MISS FRIENDS - time aliado do subject (todos)
    const friends = subject.friendsUnit().aliveMembers();
    for (const friend of friends) {
      processTriggersForCondition(friend, "MISS FRIENDS");
      // MISS FRIENDS ONLY - time aliado exceto o proprio subject
      if (friend !== subject) {
        processTriggersForCondition(friend, "MISS FRIENDS ONLY");
      }
    }

    // MISS OPPONENTS - time oposto ao subject
    const opponents = subject.opponentsUnit().aliveMembers();
    for (const opponent of opponents) {
      processTriggersForCondition(opponent, "MISS OPPONENTS");
    }
  };

  // -------------------------------------------------------------------------
  // Hook em Game_Action.prototype.apply
  // -------------------------------------------------------------------------
  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    _Game_Action_apply.call(this, target);

    if (this._coretoTriggerActive) return;
    if (this.isCertainHit()) return;
    if (this.isGuard()) return;
    if (!SceneManager.isSceneBattle()) return;

    const result = target.result();
    if (!result.used) return;
    if (!result.missed && !result.evaded) return;

    const item = this.item();
    if (item.scope !== 1) return;
    if (item.repeats > 1) return;

    dispatchMissTriggers(this.subject(), target);
  };

  // -------------------------------------------------------------------------
  // Anti-cascata: marcar actions geradas por trigger
  // -------------------------------------------------------------------------
  const _Game_Battler_forceAction = Game_Battler.prototype.forceAction;
  Game_Battler.prototype.forceAction = function (skillId, targetIndex) {
    _Game_Battler_forceAction.call(this, skillId, targetIndex);

    // Marcar a action recem-criada como trigger para evitar cascata
    if (this._actions && this._actions.length > 0) {
      const action = this._actions[this._actions.length - 1];
      if (action) {
        action._coretoTriggerActive = true;
      }
    }
  };
})();
