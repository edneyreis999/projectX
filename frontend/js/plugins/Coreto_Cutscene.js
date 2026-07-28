/*:
 * @target MZ
 * @plugindesc [v1.0.0] Controle de cutscenes físicas Coreto em Exploration.
 * @author Coreto
 * @version 1.0.0
 * @base Coreto_QuestCore
 * @orderAfter Coreto_QuestCore
 *
 * @help
 * Depende de Coreto_QuestCore. Mantém sessão temporária por mapa/evento,
 * desabilita interação e save, e usa o FlowCoordinator compartilhado para
 * impedir sobreposição com Visual Novel ou outra cutscene.
 *
 * O mapa deve usar <CoretoMapType:EX>. BeginCutscene e FinishCutscene devem
 * ser chamados pelo mesmo evento de mapa.
 *
 * @command BeginCutscene
 * @text Iniciar cutscene
 *
 * @command FinishCutscene
 * @text Encerrar cutscene
 *
 * @command InspectCutscene
 * @text Inspecionar cutscene
 */

(() => {
    "use strict";

    const PLUGIN_NAME = "Coreto_Cutscene";
    const MAP_TYPE_META_KEY = "CoretoMapType";
    const Coreto = globalThis.Coreto = globalThis.Coreto || {};
    if (!Coreto.QuestCore || !Coreto.QuestCore.FlowCoordinator) {
        throw new Error("[Coreto_Cutscene:DEPENDENCY_MISSING] Coreto_QuestCore deve carregar antes.");
    }
    if (Coreto.Cutscene) {
        throw new Error("[Coreto_Cutscene:DUPLICATE_MODULE] Coreto.Cutscene já existe.");
    }
    const FlowCoordinator = Coreto.QuestCore.FlowCoordinator;

    class CoretoCutsceneError extends Error {
        constructor(code, context) {
            super(`[Coreto_Cutscene:${code}] ${JSON.stringify(context || {})}`);
            this.name = "CoretoCutsceneError";
            this.code = code;
            this.context = context || {};
        }
    }

    function fail(code, context) {
        if (globalThis.$gameTemp) {
            $gameTemp._coretoLastError = { module: PLUGIN_NAME, code, context: context || {} };
        }
        const error = new CoretoCutsceneError(code, context);
        console.error(error);
        throw error;
    }

    function mapType() {
        const type = globalThis.$dataMap && $dataMap.meta && $dataMap.meta[MAP_TYPE_META_KEY];
        return ["EX", "VN", "GROUP"].includes(type) ? type : null;
    }

    function eventOwner() {
        const interpreter = globalThis.$gameMap && $gameMap._interpreter;
        return interpreter && typeof interpreter.eventId === "function" ? interpreter.eventId() : 0;
    }

    function store() {
        if (!globalThis.$gameTemp) fail("GAME_TEMP_UNAVAILABLE", {});
        $gameTemp._coretoCutscene = $gameTemp._coretoCutscene || { session: null };
        if (!("session" in $gameTemp._coretoCutscene)) $gameTemp._coretoCutscene.session = null;
        return $gameTemp._coretoCutscene;
    }

    function begin() {
        if (mapType() !== "EX") fail("CUTSCENE_NOT_EX", { mapId: $gameMap.mapId(), mapType: mapType() });
        if (store().session) fail("CUTSCENE_ALREADY_ACTIVE", { session: store().session });
        FlowCoordinator.assertAvailable();
        const owner = { module: PLUGIN_NAME, mapId: $gameMap.mapId(), eventId: eventOwner() };
        if (owner.eventId < 1) fail("CUTSCENE_OWNER_INVALID", owner);
        const capturedContext = {
            menuEnabled: $gameSystem.isMenuEnabled(),
            saveEnabled: $gameSystem.isSaveEnabled(),
            transparent: $gamePlayer.isTransparent(),
            followersVisible: $gamePlayer.followers().isVisible()
        };
        const token = FlowCoordinator.acquire("cutscene", owner, {
            blockMovement: true,
            blockMenu: true,
            blockAutosave: true
        });
        store().session = {
            mapId: owner.mapId,
            eventId: owner.eventId,
            token,
            capturedContext
        };
        $gameSystem.disableMenu();
        $gameSystem.disableSave();
        return store().session;
    }

    function finish() {
        const currentSession = store().session;
        if (!currentSession) fail("CUTSCENE_SESSION_MISSING", {});
        const owner = { mapId: $gameMap.mapId(), eventId: eventOwner() };
        if (currentSession.mapId !== owner.mapId || currentSession.eventId !== owner.eventId) {
            fail("CUTSCENE_OWNER_MISMATCH", { session: currentSession, owner });
        }
        const flow = FlowCoordinator.current();
        if (!flow || flow.kind !== "cutscene" || flow.token !== currentSession.token) {
            fail("CUTSCENE_FLOW_MISMATCH", { session: currentSession, flow });
        }
        const context = currentSession.capturedContext;
        if (context.menuEnabled) $gameSystem.enableMenu(); else $gameSystem.disableMenu();
        if (context.saveEnabled) $gameSystem.enableSave(); else $gameSystem.disableSave();
        $gamePlayer.setTransparent(context.transparent);
        if (context.followersVisible) $gamePlayer.followers().show(); else $gamePlayer.followers().hide();
        FlowCoordinator.release(currentSession.token);
        store().session = null;
        return true;
    }

    function inspect() {
        return store().session;
    }

    Coreto.Cutscene = {
        version: "1.0.0",
        CoretoCutsceneError,
        begin,
        finish,
        inspect
    };

    PluginManager.registerCommand(PLUGIN_NAME, "BeginCutscene", () => begin());
    PluginManager.registerCommand(PLUGIN_NAME, "FinishCutscene", () => finish());
    PluginManager.registerCommand(PLUGIN_NAME, "InspectCutscene", () => console.log(inspect()));
})();
