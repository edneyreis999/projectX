/*:
 * @target MZ
 * @plugindesc [v1.1.0] Roteador Exploration/Visual Novel por quest e entryKey.
 * @author Coreto
 * @version 1.1.0
 * @base Coreto_QuestCore
 * @orderAfter Coreto_QuestCore
 *
 * @help
 * Depende de Coreto_QuestCore. A definição extensions.questVN resolve mapa,
 * spawn e eventId; callers fornecem somente questKey e entryKey.
 *
 * Mapas devem usar <CoretoMapType:EX> ou <CoretoMapType:VN>. Eventos de cena
 * VN devem ser Action Button: o roteador inicia exatamente um evento após a
 * transferência. A primeira operação da página deve validar sessão e estado.
 * O fluxo bloqueia autosave, mas preserva o menu e o save manual.
 *
 * @command EnterVisualNovel
 * @text Entrar na Visual Novel
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 * @arg entryKey
 * @text Entrada da cena
 * @type string
 * @default ALERTA_INICIAL
 *
 * @command AssertVisualNovelSession
 * @text Validar sessão da Visual Novel
 * @arg questKey
 * @text Chave da quest
 * @type string
 * @default PORTO_INVASAO
 * @arg entryKey
 * @text Entrada da cena
 * @type string
 * @default ALERTA_INICIAL
 *
 * @command FinishVisualNovel
 * @text Encerrar a Visual Novel
 *
 * @command InspectVisualNovelSession
 * @text Inspecionar sessão da Visual Novel
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "Coreto_QuestVN";
    const STORE_SCHEMA_VERSION = 1;
    const MAP_TYPE_META_KEY = "CoretoMapType";
    const PHASES = { ENTERING: "entering", ACTIVE: "active", RETURNING: "returning" };
    const DIRECTIONS = [2, 4, 6, 8];
    const FADES = [0, 1, 2];
    const IDENTIFIER_PATTERN = /^[A-Za-z0-9_]+$/;

    const Coreto = globalThis.Coreto = globalThis.Coreto || {};
    if (!Coreto.QuestCore || !Coreto.QuestCore.FlowCoordinator) {
        throw new Error("[Coreto_QuestVN:DEPENDENCY_MISSING] Coreto_QuestCore deve carregar antes.");
    }
    if (Coreto.QuestVN) {
        throw new Error("[Coreto_QuestVN:DUPLICATE_MODULE] Coreto.QuestVN já existe.");
    }
    const QuestCore = Coreto.QuestCore;
    const FlowCoordinator = QuestCore.FlowCoordinator;

    class CoretoQuestVNError extends Error {
        constructor(code, context) {
            super(`[Coreto_QuestVN:${code}] ${JSON.stringify(context || {})}`);
            this.name = "CoretoQuestVNError";
            this.code = code;
            this.context = context || {};
        }
    }

    function fail(code, context) {
        if (globalThis.$gameTemp) {
            $gameTemp._coretoLastError = { module: PLUGIN_NAME, code, context: context || {} };
        }
        const session = globalThis.$gameSystem && $gameSystem._coretoQuestVN && $gameSystem._coretoQuestVN.session;
        if (session) session.lastError = { code, context: context || {} };
        const error = new CoretoQuestVNError(code, context);
        console.error(error);
        throw error;
    }

    function isObject(value) {
        return value !== null && typeof value === "object" && !Array.isArray(value);
    }

    function positiveInteger(value, name, context) {
        if (!Number.isInteger(value) || value < 1) fail("SCHEMA_INVALID_INTEGER", Object.assign({ name, value }, context));
        return value;
    }

    function nonnegativeInteger(value, name, context) {
        if (!Number.isInteger(value) || value < 0) fail("SCHEMA_INVALID_INTEGER", Object.assign({ name, value }, context));
        return value;
    }

    function mapType(mapData) {
        const type = mapData && mapData.meta && mapData.meta[MAP_TYPE_META_KEY];
        return ["EX", "VN", "GROUP"].includes(type) ? type : null;
    }

    function validateExtension(questKey, extension, definition, states) {
        const context = { questKey, extension: "questVN" };
        if (!isObject(extension)) fail("SCHEMA_EXTENSION_INVALID", context);
        const unknown = Object.keys(extension).filter(key => !["mapId", "spawn", "entries"].includes(key));
        if (unknown.length > 0) fail("SCHEMA_EXTENSION_UNKNOWN_FIELD", Object.assign({ unknown }, context));
        positiveInteger(extension.mapId, "mapId", context);
        if (!$dataMapInfos || !$dataMapInfos[extension.mapId]) {
            fail("SCHEMA_MAP_UNKNOWN", Object.assign({ mapId: extension.mapId }, context));
        }
        if (!isObject(extension.spawn)) fail("SCHEMA_SPAWN_INVALID", context);
        const spawnUnknown = Object.keys(extension.spawn).filter(key =>
            !["x", "y", "direction", "fadeType", "audioPolicy"].includes(key)
        );
        if (spawnUnknown.length > 0) fail("SCHEMA_SPAWN_UNKNOWN_FIELD", Object.assign({ unknown: spawnUnknown }, context));
        nonnegativeInteger(extension.spawn.x, "spawn.x", context);
        nonnegativeInteger(extension.spawn.y, "spawn.y", context);
        if (!DIRECTIONS.includes(extension.spawn.direction)) fail("SCHEMA_DIRECTION_INVALID", context);
        if (!FADES.includes(extension.spawn.fadeType)) fail("SCHEMA_FADE_INVALID", context);
        if (extension.spawn.audioPolicy !== "restore-origin") fail("SCHEMA_AUDIO_POLICY_INVALID", context);
        if (!isObject(extension.entries) || Object.keys(extension.entries).length === 0) {
            fail("SCHEMA_ENTRIES_INVALID", context);
        }
        const eventIds = new Set();
        for (const [entryKey, entry] of Object.entries(extension.entries)) {
            const entryContext = { questKey, entryKey };
            if (!IDENTIFIER_PATTERN.test(entryKey)) fail("SCHEMA_ENTRY_KEY_INVALID", entryContext);
            if (!isObject(entry)) fail("SCHEMA_ENTRY_INVALID", entryContext);
            const entryUnknown = Object.keys(entry).filter(key => !["mapId", "eventId", "allowedStates", "resumeLabel"].includes(key));
            if (entryUnknown.length > 0) fail("SCHEMA_ENTRY_UNKNOWN_FIELD", Object.assign({ unknown: entryUnknown }, entryContext));
            const entryMapId = entry.mapId === undefined ? extension.mapId : positiveInteger(entry.mapId, "mapId", entryContext);
            if (!$dataMapInfos || !$dataMapInfos[entryMapId]) fail("SCHEMA_MAP_UNKNOWN", Object.assign({ mapId: entryMapId }, entryContext));
            positiveInteger(entry.eventId, "eventId", entryContext);
            const eventIdentity = `${entryMapId}:${entry.eventId}`;
            if (eventIds.has(eventIdentity)) fail("SCHEMA_EVENT_ID_DUPLICATE", entryContext);
            eventIds.add(eventIdentity);
            if (entry.resumeLabel !== undefined && (typeof entry.resumeLabel !== "string" || !IDENTIFIER_PATTERN.test(entry.resumeLabel))) {
                fail("SCHEMA_RESUME_LABEL_INVALID", Object.assign({ resumeLabel: entry.resumeLabel }, entryContext));
            }
            if (!Array.isArray(entry.allowedStates) || entry.allowedStates.length === 0 ||
                    entry.allowedStates.some(state => !Number.isInteger(state) || !states.has(state)) ||
                    new Set(entry.allowedStates).size !== entry.allowedStates.length) {
                fail("SCHEMA_ALLOWED_STATES_INVALID", Object.assign({ allowedStates: entry.allowedStates }, entryContext));
            }
        }
    }

    QuestCore.registerExtensionValidator("questVN", validateExtension);

    function ensureStore() {
        if (!globalThis.$gameSystem) fail("GAME_SYSTEM_UNAVAILABLE", {});
        if (!$gameSystem._coretoQuestVN) {
            if ($gameSystem._daratrineRuntime) fail("LEGACY_SAVE_UNSUPPORTED", { policy: "new-game-only" });
            $gameSystem._coretoQuestVN = { schemaVersion: STORE_SCHEMA_VERSION, session: null };
        }
        const store = $gameSystem._coretoQuestVN;
        if (store.schemaVersion !== STORE_SCHEMA_VERSION) {
            fail("SAVE_SCHEMA_UNSUPPORTED", { schemaVersion: store.schemaVersion });
        }
        if (!("session" in store)) store.session = null;
        return store;
    }

    function session() {
        return ensureStore().session;
    }

    function currentEventOwner() {
        const interpreter = globalThis.$gameMap && $gameMap._interpreter;
        return interpreter && typeof interpreter.eventId === "function" ? interpreter.eventId() : 0;
    }

    function captureScreenContext() {
        return {
            brightness: $gameScreen.brightness(),
            tone: $gameScreen.tone().slice(),
            weatherType: $gameScreen.weatherType(),
            weatherPower: $gameScreen.weatherPower(),
            zoomX: $gameScreen.zoomX(),
            zoomY: $gameScreen.zoomY(),
            zoomScale: $gameScreen.zoomScale()
        };
    }

    function captureOrigin() {
        return {
            mapId: $gameMap.mapId(),
            eventId: currentEventOwner(),
            x: $gamePlayer.x,
            y: $gamePlayer.y,
            direction: $gamePlayer.direction(),
            transparent: $gamePlayer.isTransparent(),
            followersVisible: $gamePlayer.followers().isVisible(),
            menuEnabled: $gameSystem.isMenuEnabled(),
            saveEnabled: $gameSystem.isSaveEnabled(),
            bgm: AudioManager.saveBgm(),
            bgs: AudioManager.saveBgs(),
            screen: captureScreenContext()
        };
    }

    function restoreOrigin(origin, audioPolicy) {
        $gamePlayer.setTransparent(origin.transparent);
        if (origin.followersVisible) $gamePlayer.followers().show(); else $gamePlayer.followers().hide();
        if (origin.menuEnabled) $gameSystem.enableMenu(); else $gameSystem.disableMenu();
        if (origin.saveEnabled) $gameSystem.enableSave(); else $gameSystem.disableSave();
        if (audioPolicy === "restore-origin") {
            AudioManager.replayBgm(origin.bgm);
            AudioManager.replayBgs(origin.bgs);
        }
        const screen = origin.screen;
        $gameScreen._brightness = screen.brightness;
        $gameScreen._fadeOutDuration = 0;
        $gameScreen._fadeInDuration = 0;
        $gameScreen.startTint(screen.tone.slice(), 0);
        $gameScreen.changeWeather(screen.weatherType, screen.weatherPower, 0);
        $gameScreen.setZoom(screen.zoomX, screen.zoomY, screen.zoomScale);
        $gameScreen._zoomScaleTarget = screen.zoomScale;
        $gameScreen._zoomDuration = 0;
    }

    function resolveEntry(questKey, entryKey) {
        const quest = QuestCore.definition(questKey);
        const extension = quest.extensions && quest.extensions.questVN;
        if (!extension) fail("QUEST_VN_EXTENSION_MISSING", { questKey });
        const entry = extension.entries[entryKey];
        if (!entry) fail("UNKNOWN_ENTRY", { questKey, entryKey });
        return { quest, extension, entry };
    }

    function validateCoordinates(mapData, destination) {
        if (!mapData || destination.x < 0 || destination.y < 0 ||
                destination.x >= mapData.width || destination.y >= mapData.height) {
            fail("VN_DESTINATION_OUT_OF_BOUNDS", { destination, width: mapData && mapData.width, height: mapData && mapData.height });
        }
    }

    function assertFlowAgreement(currentSession) {
        const flow = FlowCoordinator.current();
        if (!flow || flow.kind !== "questVN" || flow.token !== currentSession.token) {
            fail("VN_FLOW_MISMATCH", { session: currentSession, flow });
        }
        return flow;
    }

    function enter(questKey, entryKey) {
        if (mapType(globalThis.$dataMap) !== "EX") {
            fail("VN_ORIGIN_NOT_EX", { mapId: $gameMap.mapId(), mapType: mapType(globalThis.$dataMap) });
        }
        if (session()) fail("VN_SESSION_ALREADY_ACTIVE", { session: session() });
        FlowCoordinator.assertAvailable();
        const { extension, entry } = resolveEntry(questKey, entryKey);
        const currentState = QuestCore.state(questKey);
        if (!entry.allowedStates.includes(currentState)) {
            fail("VN_ENTRY_STATE_INVALID", { questKey, entryKey, state: currentState, allowedStates: entry.allowedStates });
        }
        const spawn = extension.spawn;
        const destination = {
            mapId: entry.mapId === undefined ? extension.mapId : entry.mapId,
            eventId: entry.eventId,
            x: spawn.x,
            y: spawn.y,
            direction: spawn.direction,
            fadeType: spawn.fadeType
        };
        const scene = SceneManager._scene;
        if (!scene || typeof scene.requestAutosave !== "function") {
            fail("VN_PREENTRY_AUTOSAVE_UNAVAILABLE", { questKey, entryKey });
        }
        scene.requestAutosave();
        const origin = captureOrigin();
        const owner = { module: PLUGIN_NAME, questKey, entryKey, originMapId: origin.mapId, originEventId: origin.eventId };
        const token = FlowCoordinator.acquire("questVN", owner, {
            blockMovement: true,
            blockMenu: false,
            blockAutosave: true
        });
        ensureStore().session = {
            schemaVersion: STORE_SCHEMA_VERSION,
            phase: PHASES.ENTERING,
            questKey,
            entryKey,
            token,
            origin,
            destination,
            returnDestination: null,
            audioPolicy: spawn.audioPolicy,
            resumeLabel: entry.resumeLabel || null,
            eventStarted: false,
            lastError: null
        };
        $gamePlayer.setTransparent(true);
        $gamePlayer.followers().hide();
        $gamePlayer.reserveTransfer(destination.mapId, destination.x, destination.y, destination.direction, destination.fadeType);
        return ensureStore().session;
    }

    function assertSession(questKey, entryKey) {
        const currentSession = session();
        if (!currentSession) fail("VN_SESSION_MISSING", {});
        assertFlowAgreement(currentSession);
        if (currentSession.phase !== PHASES.ACTIVE || mapType(globalThis.$dataMap) !== "VN" ||
                $gameMap.mapId() !== currentSession.destination.mapId) {
            fail("VN_SESSION_INVALID", { session: currentSession, mapId: $gameMap.mapId(), mapType: mapType(globalThis.$dataMap) });
        }
        if (questKey && currentSession.questKey !== questKey) {
            fail("VN_SESSION_QUEST_MISMATCH", { expected: questKey, actual: currentSession.questKey });
        }
        if (entryKey && currentSession.entryKey !== entryKey) {
            fail("VN_SESSION_ENTRY_MISMATCH", { expected: entryKey, actual: currentSession.entryKey });
        }
        return currentSession;
    }

    function finish() {
        const currentSession = assertSession();
        currentSession.phase = PHASES.RETURNING;
        currentSession.returnDestination = {
            mapId: currentSession.origin.mapId,
            x: currentSession.origin.x,
            y: currentSession.origin.y,
            direction: currentSession.origin.direction,
            fadeType: 0
        };
        const destination = currentSession.returnDestination;
        $gamePlayer.reserveTransfer(destination.mapId, destination.x, destination.y, destination.direction, destination.fadeType);
        return destination;
    }

    function validateLoadedVn(currentSession) {
        if (mapType(globalThis.$dataMap) !== "VN" || $gameMap.mapId() !== currentSession.destination.mapId) {
            fail("VN_DESTINATION_MISMATCH", {
                questKey: currentSession.questKey,
                entryKey: currentSession.entryKey,
                expectedMapId: currentSession.destination.mapId,
                actualMapId: $gameMap.mapId(),
                mapType: mapType(globalThis.$dataMap)
            });
        }
        validateCoordinates($dataMap, currentSession.destination);
        const resolved = resolveEntry(currentSession.questKey, currentSession.entryKey);
        const currentState = QuestCore.state(currentSession.questKey);
        if (!resolved.entry.allowedStates.includes(currentState)) {
            fail("VN_ENTRY_STATE_INVALID", {
                questKey: currentSession.questKey,
                entryKey: currentSession.entryKey,
                state: currentState,
                allowedStates: resolved.entry.allowedStates
            });
        }
        const event = $gameMap.event(currentSession.destination.eventId);
        if (!event || !event.page() || !event.list() || event.list().length <= 1) {
            fail("VN_EVENT_PAGE_MISSING", { destination: currentSession.destination, state: currentState });
        }
        if (event._trigger !== 0) {
            fail("VN_EVENT_TRIGGER_INVALID", { eventId: event.eventId(), trigger: event._trigger, expected: 0 });
        }
        return event;
    }

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._coretoQuestVN = { schemaVersion: STORE_SCHEMA_VERSION, session: null };
    };

    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        const currentSession = globalThis.$gameSystem && $gameSystem._coretoQuestVN && $gameSystem._coretoQuestVN.session;
        const loadedType = mapType(globalThis.$dataMap);
        if (!currentSession && loadedType === "VN") {
            fail("VN_DIRECT_ENTRY", { mapId: $gamePlayer.isTransferring() ? $gamePlayer.newMapId() : $gameMap.mapId() });
        }
        if (currentSession) assertFlowAgreement(currentSession);
        _Scene_Map_onMapLoaded.call(this);
        if (!currentSession) return;

        if (currentSession.phase === PHASES.ENTERING) {
            const event = validateLoadedVn(currentSession);
            if (currentSession.eventStarted) fail("VN_EVENT_START_DUPLICATE", { session: currentSession });
            currentSession.phase = PHASES.ACTIVE;
            currentSession.eventStarted = true;
            event.start();
            return;
        }
        if (currentSession.phase === PHASES.ACTIVE) {
            validateLoadedVn(currentSession);
            return;
        }
        if (currentSession.phase === PHASES.RETURNING) {
            const destination = currentSession.returnDestination;
            if (!destination || mapType(globalThis.$dataMap) !== "EX" || $gameMap.mapId() !== destination.mapId) {
                fail("VN_RETURN_DESTINATION_MISMATCH", { session: currentSession, mapId: $gameMap.mapId(), mapType: loadedType });
            }
            validateCoordinates($dataMap, destination);
            let resume = null;
            if (currentSession.resumeLabel) {
                const originEvent = $gameMap.event(currentSession.origin.eventId);
                if (!originEvent || !originEvent.page() || !originEvent.list()) {
                    fail("VN_RESUME_EVENT_MISSING", { eventId: currentSession.origin.eventId, resumeLabel: currentSession.resumeLabel });
                }
                const labels = [];
                originEvent.list().forEach((command, index) => {
                    if (command.code === 118 && command.parameters && command.parameters[0] === currentSession.resumeLabel) labels.push(index);
                });
                if (labels.length !== 1) {
                    fail("VN_RESUME_LABEL_MISSING", { eventId: currentSession.origin.eventId, resumeLabel: currentSession.resumeLabel, matches: labels.length });
                }
                resume = { eventId: currentSession.origin.eventId, list: originEvent.list(), index: labels[0] + 1 };
            }
            restoreOrigin(currentSession.origin, currentSession.audioPolicy);
            FlowCoordinator.release(currentSession.token);
            ensureStore().session = null;
            if (resume) {
                $gameMap._interpreter.setup(resume.list, resume.eventId);
                $gameMap._interpreter._index = resume.index;
            }
            return;
        }
        fail("VN_SESSION_PHASE_INVALID", { session: currentSession });
    };

    function inspect() {
        return session();
    }

    Coreto.QuestVN = {
        version: "1.1.0",
        CoretoQuestVNError,
        enter,
        finish,
        assertSession,
        inspect
    };

    const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
    Scene_Map.prototype.isMenuEnabled = function() {
        const currentSession = globalThis.$gameSystem ? session() : null;
        const flow = FlowCoordinator.current();
        const activeVisualNovel = currentSession &&
            currentSession.phase === PHASES.ACTIVE &&
            flow &&
            flow.kind === "questVN" &&
            flow.token === currentSession.token &&
            flow.policy.blockMenu === false;
        if (activeVisualNovel) return $gameSystem.isMenuEnabled();
        return _Scene_Map_isMenuEnabled.call(this);
    };

    PluginManager.registerCommand(PLUGIN_NAME, "EnterVisualNovel", function(args) {
        enter(args.questKey, args.entryKey);
        this.setWaitMode("transfer");
    });
    PluginManager.registerCommand(PLUGIN_NAME, "AssertVisualNovelSession", args =>
        assertSession(args.questKey, args.entryKey)
    );
    PluginManager.registerCommand(PLUGIN_NAME, "FinishVisualNovel", function() {
        finish();
        this.setWaitMode("transfer");
    });
    PluginManager.registerCommand(PLUGIN_NAME, "InspectVisualNovelSession", () =>
        console.log(inspect())
    );
})();
