/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');

const PLUGIN_PATH = path.resolve(__dirname, '../../js/plugins/Coreto_QuestVN.js');

function installRuntime() {
  jest.resetModules();
  const validators = {};
  const flow = { token: 'vn-token', released: [], current: jest.fn(() => ({ kind: 'questVN', token: 'vn-token', policy: { blockMenu: false } })), assertAvailable: jest.fn(), acquire: jest.fn(() => 'vn-token'), release: jest.fn(token => flow.released.push(token)) };
  const quest = {
    extensions: {
      questVN: {
        mapId: 49,
        spawn: { x: 8, y: 6, direction: 2, fadeType: 0, audioPolicy: 'restore-origin' },
        entries: {
          ABERTURA_FORJAPRATA: { eventId: 1, allowedStates: [10] },
          SEMIFINAL_CELEBRATION: { mapId: 65, eventId: 1, allowedStates: [110], resumeLabel: 'SEMIFINAL_AFTER_CELEBRATION_VN' },
        },
      },
    },
  };
  global.Coreto = { QuestCore: { FlowCoordinator: flow, registerExtensionValidator: (name, validator) => { validators[name] = validator; }, definition: () => quest, state: () => 110 } };
  global.$dataMapInfos = Array(66).fill(null);
  $dataMapInfos[49] = { id: 49 };
  $dataMapInfos[65] = { id: 65 };
  global.$dataMap = { width: 17, height: 13, meta: { CoretoMapType: 'EX' } };
  global.Game_System = function() {};
  Game_System.prototype.initialize = function() {};
  global.Scene_Map = function() {};
  Scene_Map.prototype.onMapLoaded = function() {};
  Scene_Map.prototype.isMenuEnabled = function() { return true; };
  global.PluginManager = { registerCommand: jest.fn() };
  global.AudioManager = { saveBgm: jest.fn(() => ({ name: 'origin' })), saveBgs: jest.fn(() => ({ name: 'ambience' })), replayBgm: jest.fn(), replayBgs: jest.fn() };
  global.$gameScreen = {
    brightness: () => 255, tone: () => [0, 0, 0, 0], weatherType: () => 'none', weatherPower: () => 0,
    zoomX: () => 0, zoomY: () => 0, zoomScale: () => 1, startTint: jest.fn(), changeWeather: jest.fn(), setZoom: jest.fn(),
  };
  global.$gameSystem = {
    _coretoQuestVN: { schemaVersion: 1, session: null },
    isMenuEnabled: () => true, isSaveEnabled: () => true,
    enableMenu: jest.fn(), disableMenu: jest.fn(), enableSave: jest.fn(), disableSave: jest.fn(),
  };
  global.$gamePlayer = {
    x: 4, y: 5, direction: () => 6, isTransparent: () => false, setTransparent: jest.fn(),
    followers: () => ({ isVisible: () => true, show: jest.fn(), hide: jest.fn() }),
    reserveTransfer: jest.fn(), isTransferring: () => false, newMapId: () => 0,
  };
  global.$gameMap = { mapId: () => 62, _interpreter: { eventId: () => 6, setup: jest.fn(), _index: 0 }, event: jest.fn() };
  global.SceneManager = { _scene: { requestAutosave: jest.fn() } };
  global.$gameTemp = {};
  require(PLUGIN_PATH);
  return { validators, flow, quest };
}

describe('Coreto_QuestVN per-entry routing and transient resume', () => {
  beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
  afterEach(() => {
    jest.restoreAllMocks();
    for (const key of ['$dataMapInfos', '$dataMap', '$gameScreen', '$gameSystem', '$gamePlayer', '$gameMap', '$gameTemp', 'Coreto', 'Game_System', 'Scene_Map', 'PluginManager', 'AudioManager', 'SceneManager']) delete global[key];
  });

  test('accepts per-entry mapId/resumeLabel and keeps quest-level fallback', () => {
    const { validators, quest } = installRuntime();
    expect(() => validators.questVN('a-semifinal', quest.extensions.questVN, {}, new Set([10, 110]))).not.toThrow();
    quest.extensions.questVN.entries.SEMIFINAL_CELEBRATION.resumeLabel = 'invalid label';
    expect(() => validators.questVN('a-semifinal', quest.extensions.questVN, {}, new Set([10, 110]))).toThrow('[Coreto_QuestVN:SCHEMA_RESUME_LABEL_INVALID]');
  });

  test('routes the semifinal entry to Map65 and stores resume only in the active session', () => {
    installRuntime();
    const session = Coreto.QuestVN.enter('a-semifinal', 'SEMIFINAL_CELEBRATION');
    expect(session.destination).toMatchObject({ mapId: 65, eventId: 1 });
    expect(session.resumeLabel).toBe('SEMIFINAL_AFTER_CELEBRATION_VN');
    expect($gamePlayer.reserveTransfer).toHaveBeenCalledWith(65, 8, 6, 2, 0);
  });

  test('resumes after exactly one origin label and fails closed when the label is absent', () => {
    const { flow } = installRuntime();
    const origin = {
      mapId: 62, eventId: 6, x: 4, y: 5, direction: 6, transparent: false, followersVisible: true,
      menuEnabled: true, saveEnabled: true, bgm: { name: 'origin' }, bgs: { name: 'ambience' },
      screen: { brightness: 255, tone: [0, 0, 0, 0], weatherType: 'none', weatherPower: 0, zoomX: 0, zoomY: 0, zoomScale: 1 },
    };
    const list = [{ code: 118, parameters: ['SEMIFINAL_AFTER_CELEBRATION_VN'] }, { code: 108, parameters: ['continued'] }, { code: 0, parameters: [] }];
    $gameSystem._coretoQuestVN.session = { phase: 'returning', token: 'vn-token', origin, returnDestination: { mapId: 62, x: 4, y: 5, direction: 6 }, audioPolicy: 'restore-origin', resumeLabel: 'SEMIFINAL_AFTER_CELEBRATION_VN' };
    $gameMap.event.mockReturnValue({ page: () => ({}), list: () => list });
    new Scene_Map().onMapLoaded();
    expect(flow.released).toEqual(['vn-token']);
    expect($gameSystem._coretoQuestVN.session).toBeNull();
    expect($gameMap._interpreter.setup).toHaveBeenCalledWith(list, 6);
    expect($gameMap._interpreter._index).toBe(1);

    const runtime = installRuntime();
    global.$dataMap.meta.CoretoMapType = 'EX';
    global.$gameSystem._coretoQuestVN.session = { phase: 'returning', token: 'vn-token', origin, returnDestination: { mapId: 62, x: 4, y: 5, direction: 6 }, audioPolicy: 'restore-origin', resumeLabel: 'MISSING' };
    global.$gameMap.event.mockReturnValue({ page: () => ({}), list: () => list });
    expect(() => new Scene_Map().onMapLoaded()).toThrow('[Coreto_QuestVN:VN_RESUME_LABEL_MISSING]');
    expect(runtime.flow.released).toEqual([]);
    expect($gameSystem._coretoQuestVN.session).not.toBeNull();
  });
});
