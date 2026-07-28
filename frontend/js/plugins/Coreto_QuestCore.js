/*:
 * @target MZ
 * @plugindesc [v1.0.0] Núcleo data-driven de quests Coreto.
 * @author Coreto
 * @version 1.0.0
 *
 * @help
 * Carrega data/CoretoQuests.json, mantém a variável declarada por quest como
 * estado canônico e projeta esse estado no PKD_SimpleQuestSystem.
 *
 * Ordem: PKD_SimpleQuestSystem -> Coreto_QuestCore -> extensões Coreto_.
 * Saves anteriores ao runtime Coreto não são suportados (New Game only).
 *
 * Para cadastrar outra quest, configure primeiro seu texto e objetivos no
 * PKD e adicione uma definição ao registry. Não edite este plugin.
 *
 * @command QuestTransition
 * @text Executar transição de quest
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 * @arg transitionId
 * @text Transição
 * @type string
 * @default START
 *
 * @command QuestSync
 * @text Sincronizar quest
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 *
 * @command AssertQuestState
 * @text Validar estado exato
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 * @arg expectedState
 * @text Estado esperado
 * @type number
 * @min 0
 * @default 0
 *
 * @command InspectQuestState
 * @text Inspecionar estado da quest
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "Coreto_QuestCore";
    const DATABASE_NAME = "$dataCoretoQuests";
    const DATABASE_SOURCE = "CoretoQuests.json";
    const CORE_SCHEMA_VERSION = 1;
    const IDENTIFIER_PATTERN = /^[A-Za-z0-9_-]+$/;

    const Coreto = globalThis.Coreto = globalThis.Coreto || {};
    if (Coreto.QuestCore) {
        throw new Error("[Coreto_QuestCore:DUPLICATE_MODULE] Coreto.QuestCore já existe.");
    }

    class CoretoQuestError extends Error {
        constructor(code, context) {
            super(`[Coreto_QuestCore:${code}] ${JSON.stringify(context || {})}`);
            this.name = "CoretoQuestError";
            this.code = code;
            this.context = context || {};
        }
    }

    function recordError(code, context) {
        if (globalThis.$gameTemp) {
            $gameTemp._coretoLastError = { module: PLUGIN_NAME, code, context: context || {} };
        }
    }

    function fail(code, context) {
        recordError(code, context);
        const error = new CoretoQuestError(code, context);
        console.error(error);
        throw error;
    }

    function isObject(value) {
        return value !== null && typeof value === "object" && !Array.isArray(value);
    }

    function assertObject(value, code, context) {
        if (!isObject(value)) fail(code, context);
        return value;
    }

    function assertKnownKeys(value, allowed, context) {
        const unknown = Object.keys(value).filter(key => !allowed.includes(key));
        if (unknown.length > 0) fail("SCHEMA_UNKNOWN_FIELD", Object.assign({ unknown }, context));
    }

    function identifier(value, name, context) {
        if (typeof value !== "string" || !IDENTIFIER_PATTERN.test(value)) {
            fail("SCHEMA_INVALID_IDENTIFIER", Object.assign({ name, value }, context));
        }
        return value;
    }

    function integer(value, name, minimum, context) {
        if (!Number.isInteger(value) || value < minimum) {
            fail("SCHEMA_INVALID_INTEGER", Object.assign({ name, value, minimum }, context));
        }
        return value;
    }

    function integerArray(value, name, allowEmpty, context) {
        if (!Array.isArray(value) || (!allowEmpty && value.length === 0) ||
                value.some(item => !Number.isInteger(item))) {
            fail("SCHEMA_INVALID_INTEGER_ARRAY", Object.assign({ name, value }, context));
        }
        if (new Set(value).size !== value.length) {
            fail("SCHEMA_DUPLICATE_INTEGER", Object.assign({ name, value }, context));
        }
        return value;
    }

    function itemById(itemId, context) {
        const item = globalThis.$dataItems && $dataItems[itemId];
        if (!item || !item.name) fail("QUEST_ITEM_INVALID", Object.assign({ itemId }, context));
        return item;
    }

    function validateItemRequirement(requirement, context) {
        assertObject(requirement, "SCHEMA_REQUIREMENT_INVALID", context);
        assertKnownKeys(requirement, ["type", "itemId", "minimum"], context);
        if (requirement.type !== "item") fail("SCHEMA_REQUIREMENT_TYPE", Object.assign({ type: requirement.type }, context));
        integer(requirement.itemId, "itemId", 1, context);
        integer(requirement.minimum, "minimum", 1, context);
        itemById(requirement.itemId, context);
    }

    function validateItemEffect(effect, context) {
        assertObject(effect, "SCHEMA_EFFECT_INVALID", context);
        assertKnownKeys(effect, ["type", "itemId", "delta"], context);
        if (effect.type !== "item") fail("SCHEMA_EFFECT_TYPE", Object.assign({ type: effect.type }, context));
        integer(effect.itemId, "itemId", 1, context);
        if (!Number.isInteger(effect.delta) || effect.delta === 0) {
            fail("SCHEMA_EFFECT_DELTA", Object.assign({ delta: effect.delta }, context));
        }
        itemById(effect.itemId, context);
    }

    const extensionValidators = new Map();
    let registryValidated = false;
    let definitions = null;

    function validateQuestDefinition(questKey, definition) {
        const context = { questKey };
        identifier(questKey, "questKey", context);
        assertObject(definition, "SCHEMA_QUEST_INVALID", context);
        assertKnownKeys(definition, [
            "stageVariableId", "initialState", "terminalStates", "pkd",
            "transitions", "extensions"
        ], context);

        integer(definition.stageVariableId, "stageVariableId", 1, context);
        if (!$dataSystem.variables || definition.stageVariableId >= $dataSystem.variables.length) {
            fail("SCHEMA_VARIABLE_MISSING", Object.assign({ stageVariableId: definition.stageVariableId }, context));
        }
        integer(definition.initialState, "initialState", 0, context);
        integerArray(definition.terminalStates, "terminalStates", false, context);

        const pkd = assertObject(definition.pkd, "SCHEMA_PKD_INVALID", context);
        assertKnownKeys(pkd, ["questId", "objectives"], context);
        if (typeof pkd.questId !== "string" || !pkd.questId.trim()) {
            fail("SCHEMA_PKD_QUEST_ID", context);
        }
        if (!Array.isArray(pkd.objectives) || pkd.objectives.length === 0) {
            fail("SCHEMA_OBJECTIVES_INVALID", context);
        }
        const objectiveIds = new Set();
        for (const objective of pkd.objectives) {
            assertObject(objective, "SCHEMA_OBJECTIVE_INVALID", context);
            assertKnownKeys(objective, ["id", "knownFrom", "completedAt"], context);
            integer(objective.id, "objective.id", 1, context);
            integer(objective.knownFrom, "objective.knownFrom", 0, context);
            integer(objective.completedAt, "objective.completedAt", 0, context);
            if (objective.completedAt < objective.knownFrom || objectiveIds.has(objective.id)) {
                fail("SCHEMA_OBJECTIVE_ORDER", Object.assign({ objective }, context));
            }
            objectiveIds.add(objective.id);
        }

        const transitions = assertObject(definition.transitions, "SCHEMA_TRANSITIONS_INVALID", context);
        if (Object.keys(transitions).length === 0) fail("SCHEMA_TRANSITIONS_EMPTY", context);
        const states = new Set([definition.initialState, ...definition.terminalStates]);
        for (const [transitionId, transition] of Object.entries(transitions)) {
            const transitionContext = { questKey, transitionId };
            identifier(transitionId, "transitionId", transitionContext);
            assertObject(transition, "SCHEMA_TRANSITION_INVALID", transitionContext);
            assertKnownKeys(transition, [
                "from", "to", "requirements", "effects", "receiptPolicy", "terminal"
            ], transitionContext);
            integerArray(transition.from, "from", false, transitionContext);
            integer(transition.to, "to", 0, transitionContext);
            transition.from.forEach(state => states.add(state));
            states.add(transition.to);
            const requirements = transition.requirements || [];
            const effects = transition.effects || [];
            if (!Array.isArray(requirements) || !Array.isArray(effects)) {
                fail("SCHEMA_TRANSITION_LIST", transitionContext);
            }
            requirements.forEach(requirement => validateItemRequirement(requirement, transitionContext));
            effects.forEach(effect => validateItemEffect(effect, transitionContext));
            for (const effect of effects.filter(effect => effect.delta < 0)) {
                const requirement = requirements.find(candidate => candidate.itemId === effect.itemId);
                if (!requirement || requirement.minimum < Math.abs(effect.delta)) {
                    fail("SCHEMA_NEGATIVE_EFFECT_UNGUARDED", Object.assign({ effect }, transitionContext));
                }
            }
            if (effects.length > 0 && transition.receiptPolicy !== "once") {
                fail("SCHEMA_RECEIPT_REQUIRED", transitionContext);
            }
            if (effects.length === 0 && transition.receiptPolicy !== undefined) {
                fail("SCHEMA_RECEIPT_WITHOUT_EFFECT", transitionContext);
            }
            if (transition.terminal !== undefined && typeof transition.terminal !== "boolean") {
                fail("SCHEMA_TERMINAL_FLAG", transitionContext);
            }
            if (transition.terminal === true && !definition.terminalStates.includes(transition.to)) {
                fail("SCHEMA_TERMINAL_STATE", transitionContext);
            }
        }

        for (const terminalState of definition.terminalStates) {
            if (!states.has(terminalState)) fail("SCHEMA_UNKNOWN_TERMINAL_STATE", Object.assign({ terminalState }, context));
        }
        for (const objective of pkd.objectives) {
            if (!states.has(objective.knownFrom) || !states.has(objective.completedAt)) {
                fail("SCHEMA_OBJECTIVE_STATE_UNKNOWN", Object.assign({ objective }, context));
            }
        }

        const extensions = definition.extensions || {};
        assertObject(extensions, "SCHEMA_EXTENSIONS_INVALID", context);
        for (const [extensionName, extensionData] of Object.entries(extensions)) {
            const validator = extensionValidators.get(extensionName);
            if (!validator) fail("EXTENSION_VALIDATOR_MISSING", { questKey, extensionName });
            validator(questKey, extensionData, definition, states);
        }
    }

    function validateRegistry() {
        if (registryValidated) return definitions;
        const registry = assertObject(globalThis[DATABASE_NAME], "REGISTRY_MISSING", { source: DATABASE_SOURCE });
        assertKnownKeys(registry, ["schemaVersion", "quests"], { source: DATABASE_SOURCE });
        if (registry.schemaVersion !== CORE_SCHEMA_VERSION) {
            fail("REGISTRY_SCHEMA_UNSUPPORTED", { expected: CORE_SCHEMA_VERSION, actual: registry.schemaVersion });
        }
        const quests = assertObject(registry.quests, "REGISTRY_QUESTS_INVALID", {});
        if (Object.keys(quests).length === 0) fail("REGISTRY_QUESTS_EMPTY", {});
        for (const [questKey, definition] of Object.entries(quests)) {
            validateQuestDefinition(questKey, definition);
        }
        definitions = quests;
        registryValidated = true;
        return definitions;
    }

    function registerExtensionValidator(extensionName, validator) {
        identifier(extensionName, "extensionName", {});
        if (typeof validator !== "function") fail("EXTENSION_VALIDATOR_INVALID", { extensionName });
        if (extensionValidators.has(extensionName)) fail("EXTENSION_VALIDATOR_DUPLICATE", { extensionName });
        if (registryValidated) fail("EXTENSION_VALIDATOR_LATE", { extensionName });
        extensionValidators.set(extensionName, validator);
    }

    function definition(questKey) {
        const all = validateRegistry();
        const result = all[questKey];
        if (!result) fail("UNKNOWN_QUEST", { questKey });
        return result;
    }

    function ensureStore() {
        if (!globalThis.$gameSystem) fail("GAME_SYSTEM_UNAVAILABLE", {});
        if (!$gameSystem._coretoQuestCore) {
            if ($gameSystem._daratrineRuntime) fail("LEGACY_SAVE_UNSUPPORTED", { policy: "new-game-only" });
            $gameSystem._coretoQuestCore = {
                schemaVersion: CORE_SCHEMA_VERSION,
                receipts: {},
                flow: null,
                nextFlowId: 1
            };
        }
        const store = $gameSystem._coretoQuestCore;
        if (store.schemaVersion !== CORE_SCHEMA_VERSION) {
            fail("SAVE_SCHEMA_UNSUPPORTED", { module: PLUGIN_NAME, schemaVersion: store.schemaVersion });
        }
        store.receipts = store.receipts || {};
        store.flow = store.flow || null;
        store.nextFlowId = Number.isInteger(store.nextFlowId) ? store.nextFlowId : 1;
        return store;
    }

    function state(questKey) {
        const quest = definition(questKey);
        if (!globalThis.$gameVariables) fail("GAME_VARIABLES_UNAVAILABLE", { questKey });
        return $gameVariables.value(quest.stageVariableId);
    }

    function validateBackend(questKey, quest) {
        const api = globalThis.SQSM;
        const required = [
            "quests", "isQuestVisible", "isQuestComplete", "isQuestTaskVisible",
            "isQuestTaskComplete", "AddQuest", "ShowTaskForQuest",
            "CompleteTaskForQuest", "CompleteQuest"
        ];
        if (!api || required.some(method => typeof api[method] !== "function")) {
            fail("PKD_BACKEND_UNAVAILABLE", { questKey, required });
        }
        const questId = quest.pkd.questId;
        const available = api.quests();
        if (!Array.isArray(available) || !available.some(candidate => candidate && candidate.id === questId)) {
            fail("PKD_QUEST_ID_UNKNOWN", { questKey, questId });
        }
        return api;
    }

    function sync(questKey) {
        const quest = definition(questKey);
        const current = state(questKey);
        const terminal = quest.terminalStates.includes(current);
        if (current === quest.initialState) return { questKey, state: current, terminal, projected: false };

        const api = validateBackend(questKey, quest);
        const questId = quest.pkd.questId;
        if (!api.isQuestVisible(questId)) api.AddQuest(questId);
        for (const objective of quest.pkd.objectives) {
            if (current < objective.knownFrom) continue;
            if (!api.isQuestTaskVisible(questId, objective.id)) {
                api.ShowTaskForQuest(questId, objective.id);
            }
            if (current >= objective.completedAt && !api.isQuestTaskComplete(questId, objective.id)) {
                api.CompleteTaskForQuest(questId, objective.id);
            }
        }
        if (terminal && !api.isQuestComplete(questId)) api.CompleteQuest(questId);
        return { questKey, state: current, terminal, projected: true };
    }

    function validateRequirements(questKey, transitionId, requirements) {
        for (const requirement of requirements) {
            const item = itemById(requirement.itemId, { questKey, transitionId });
            if ($gameParty.numItems(item) < requirement.minimum) {
                fail("QUEST_REQUIREMENT_UNMET", {
                    questKey, transitionId, itemId: requirement.itemId, minimum: requirement.minimum
                });
            }
        }
    }

    function transition(questKey, transitionId) {
        const quest = definition(questKey);
        const transitionDefinition = quest.transitions[transitionId];
        if (!transitionDefinition) fail("UNKNOWN_TRANSITION", { questKey, transitionId });
        const store = ensureStore();
        const receiptKey = `${questKey}:${transitionId}`;
        const receipt = store.receipts[receiptKey];
        if (receipt && receipt.status === "committed") {
            return { questKey, transitionId, state: state(questKey), receipt: "committed", noOp: true };
        }
        if (receipt) fail("TRANSITION_RECEIPT_NOT_COMMITTED", { questKey, transitionId, receipt });

        const current = state(questKey);
        if (!transitionDefinition.from.includes(current)) {
            fail("INVALID_TRANSITION", { questKey, transitionId, state: current, expected: transitionDefinition.from });
        }
        const requirements = transitionDefinition.requirements || [];
        const effects = transitionDefinition.effects || [];
        validateBackend(questKey, quest);
        validateRequirements(questKey, transitionId, requirements);
        effects.forEach(effect => itemById(effect.itemId, { questKey, transitionId }));

        if (transitionDefinition.receiptPolicy === "once") {
            store.receipts[receiptKey] = {
                status: "pending",
                from: current,
                to: transitionDefinition.to,
                effects: effects.map(effect => ({ type: effect.type, itemId: effect.itemId, delta: effect.delta }))
            };
        }

        const applied = [];
        try {
            for (const effect of effects) {
                const item = itemById(effect.itemId, { questKey, transitionId });
                $gameParty.gainItem(item, effect.delta, false);
                applied.push(effect);
            }
            $gameVariables.setValue(quest.stageVariableId, transitionDefinition.to);
            sync(questKey);
            if (store.receipts[receiptKey]) store.receipts[receiptKey].status = "committed";
        } catch (error) {
            for (const effect of applied.slice().reverse()) {
                $gameParty.gainItem($dataItems[effect.itemId], -effect.delta, false);
            }
            $gameVariables.setValue(quest.stageVariableId, current);
            if (store.receipts[receiptKey]) {
                store.receipts[receiptKey].status = "failed";
                store.receipts[receiptKey].error = error.code || error.name || "UNKNOWN";
            }
            try {
                sync(questKey);
            } catch (_) {
                // Preserve the original failure; backend repair remains explicit.
            }
            throw error;
        }
        return {
            questKey,
            transitionId,
            state: transitionDefinition.to,
            terminal: !!transitionDefinition.terminal
        };
    }

    function assertState(questKey, expectedState) {
        const expected = Number(expectedState);
        if (!Number.isInteger(expected) || expected < 0) fail("INVALID_EXPECTED_STATE", { questKey, expectedState });
        const current = state(questKey);
        if (current !== expected) fail("QUEST_STATE_MISMATCH", { questKey, expected, current });
        return { questKey, state: current };
    }

    function normalizeFlowPolicy(policy) {
        const supplied = policy || {};
        return {
            blockMovement: supplied.blockMovement !== false,
            blockMenu: supplied.blockMenu !== false,
            blockAutosave: supplied.blockAutosave !== false
        };
    }

    const FlowCoordinator = {
        acquire(kind, owner, policy) {
            identifier(kind, "flowKind", {});
            if (owner === undefined || owner === null || owner === "") fail("FLOW_OWNER_INVALID", { kind, owner });
            const store = ensureStore();
            if (store.flow) fail("FLOW_ALREADY_ACTIVE", { requestedKind: kind, current: store.flow });
            const token = `${kind}:${store.nextFlowId++}`;
            store.flow = { token, kind, owner, policy: normalizeFlowPolicy(policy) };
            return token;
        },
        release(token) {
            const store = ensureStore();
            if (!store.flow) fail("FLOW_NOT_ACTIVE", { token });
            if (store.flow.token !== token) fail("FLOW_TOKEN_MISMATCH", { token, current: store.flow });
            const released = store.flow;
            store.flow = null;
            return released;
        },
        current() {
            if (!globalThis.$gameSystem) return null;
            return ensureStore().flow;
        },
        assertAvailable() {
            const current = this.current();
            if (current) fail("FLOW_ALREADY_ACTIVE", { current });
            return true;
        }
    };

    function inspect(questKey) {
        const quest = definition(questKey);
        const current = state(questKey);
        const prefix = `${questKey}:`;
        const receipts = Object.fromEntries(Object.entries(ensureStore().receipts).filter(([key]) => key.startsWith(prefix)));
        return {
            questKey,
            state: current,
            terminal: quest.terminalStates.includes(current),
            backendKey: quest.pkd.questId,
            receipts
        };
    }

    const databaseEntry = DataManager._databaseFiles.find(entry =>
        entry.name === DATABASE_NAME || entry.src === DATABASE_SOURCE
    );
    if (databaseEntry && (databaseEntry.name !== DATABASE_NAME || databaseEntry.src !== DATABASE_SOURCE)) {
        fail("DATABASE_REGISTRATION_CONFLICT", { databaseEntry });
    }
    if (!databaseEntry) DataManager._databaseFiles.push({ name: DATABASE_NAME, src: DATABASE_SOURCE });

    const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        validateRegistry();
        return true;
    };

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._coretoQuestCore = {
            schemaVersion: CORE_SCHEMA_VERSION,
            receipts: {},
            flow: null,
            nextFlowId: 1
        };
    };

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        const flow = FlowCoordinator.current();
        return !(flow && flow.policy.blockMovement) && _Game_Player_canMove.call(this);
    };

    const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function() {
        const flow = FlowCoordinator.current();
        return !(flow && flow.policy.blockMenu) && _Scene_Map_isMenuEnabled.call(this);
    };

    const _Scene_Base_requestAutosave = Scene_Base.prototype.requestAutosave;
    Scene_Base.prototype.requestAutosave = function() {
        const flow = FlowCoordinator.current();
        if (flow && flow.policy.blockAutosave) return;
        return _Scene_Base_requestAutosave.call(this);
    };

    const _Scene_Base_executeAutosave = Scene_Base.prototype.executeAutosave;
    Scene_Base.prototype.executeAutosave = function() {
        const flow = FlowCoordinator.current();
        if (flow && flow.policy.blockAutosave) return;
        return _Scene_Base_executeAutosave.call(this);
    };

    Coreto.QuestCore = {
        version: "1.0.0",
        CoretoQuestError,
        definition,
        state,
        transition,
        sync,
        assertState,
        inspect,
        registerExtensionValidator,
        FlowCoordinator
    };

    PluginManager.registerCommand(PLUGIN_NAME, "QuestTransition", args =>
        transition(args.questKey, args.transitionId)
    );
    PluginManager.registerCommand(PLUGIN_NAME, "QuestSync", args => sync(args.questKey));
    PluginManager.registerCommand(PLUGIN_NAME, "AssertQuestState", args =>
        assertState(args.questKey, args.expectedState)
    );
    PluginManager.registerCommand(PLUGIN_NAME, "InspectQuestState", args =>
        console.log(inspect(args.questKey))
    );
})();
