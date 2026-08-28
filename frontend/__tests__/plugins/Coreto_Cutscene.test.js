/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');

const PLUGIN_PATH = path.resolve(__dirname, '../../js/plugins/Coreto_Cutscene.js');
const PLUGIN_NAME = 'Coreto_Cutscene';

function installRuntime({ mapId = 63, mainEventId = 13 } = {}) {
  jest.resetModules();
  delete global.Coreto;

  const commands = new Map();
  let activeFlow = null;
  const flow = {
    assertAvailable: jest.fn(),
    acquire: jest.fn((kind, owner, policy) => {
      activeFlow = { kind, owner, policy, token: 'cutscene-token' };
      return activeFlow.token;
    }),
    current: jest.fn(() => activeFlow),
    release: jest.fn(token => {
      if (activeFlow?.token === token) activeFlow = null;
    }),
  };
  const followers = {
    isVisible: jest.fn(() => true),
    show: jest.fn(),
    hide: jest.fn(),
  };

  global.Coreto = { QuestCore: { FlowCoordinator: flow } };
  global.$dataMap = { meta: { CoretoMapType: 'EX' } };
  global.$gameTemp = {};
  global.$gameMap = {
    mapId: jest.fn(() => mapId),
    _interpreter: { eventId: jest.fn(() => mainEventId) },
  };
  global.$gameSystem = {
    isMenuEnabled: jest.fn(() => true),
    isSaveEnabled: jest.fn(() => true),
    enableMenu: jest.fn(),
    disableMenu: jest.fn(),
    enableSave: jest.fn(),
    disableSave: jest.fn(),
  };
  global.$gamePlayer = {
    isTransparent: jest.fn(() => false),
    setTransparent: jest.fn(),
    followers: jest.fn(() => followers),
  };
  global.PluginManager = {
    registerCommand: jest.fn((pluginName, commandName, handler) => {
      commands.set(`${pluginName}:${commandName}`, handler);
    }),
    callCommand(interpreter, pluginName, commandName, args = {}) {
      const handler = commands.get(`${pluginName}:${commandName}`);
      if (typeof handler === 'function') handler.bind(interpreter)(args);
    },
  };

  require(PLUGIN_PATH);
  return { commands, cutscene: global.Coreto.Cutscene, flow, followers };
}

function call(interpreter, commandName) {
  global.PluginManager.callCommand(interpreter, PLUGIN_NAME, commandName, {});
}

describe('Coreto_Cutscene interpreter ownership', () => {
  beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

  afterEach(() => {
    jest.restoreAllMocks();
    for (const key of ['$dataMap', '$gameTemp', '$gameMap', '$gameSystem', '$gamePlayer', 'Coreto', 'PluginManager']) delete global[key];
  });

  test('keeps the main map interpreter as owner for ordinary event commands', () => {
    const { cutscene, flow } = installRuntime({ mainEventId: 13 });
    const interpreter = global.$gameMap._interpreter;

    call(interpreter, 'BeginCutscene');
    expect(cutscene.inspect()).toMatchObject({ mapId: 63, eventId: 13, token: 'cutscene-token' });

    call(interpreter, 'FinishCutscene');
    expect(cutscene.inspect()).toBeNull();
    expect(flow.release).toHaveBeenCalledWith('cutscene-token');
  });

  test('uses the calling parallel interpreter when the main map interpreter is idle', () => {
    const { cutscene, flow } = installRuntime({ mainEventId: 0 });
    const parallelInterpreter = { eventId: jest.fn(() => 13) };

    call(parallelInterpreter, 'BeginCutscene');
    expect(cutscene.inspect()).toMatchObject({ mapId: 63, eventId: 13 });
    expect(flow.acquire).toHaveBeenCalledWith(
      'cutscene',
      expect.objectContaining({ module: PLUGIN_NAME, mapId: 63, eventId: 13 }),
      expect.objectContaining({ blockMovement: true, blockMenu: true, blockAutosave: true }),
    );

    call(parallelInterpreter, 'FinishCutscene');
    expect(cutscene.inspect()).toBeNull();
  });

  test('rejects FinishCutscene from a different parallel event and preserves the active session', () => {
    const { cutscene, flow } = installRuntime({ mainEventId: 0 });
    call({ eventId: () => 13 }, 'BeginCutscene');

    expect(() => call({ eventId: () => 14 }, 'FinishCutscene')).toThrow('[Coreto_Cutscene:CUTSCENE_OWNER_MISMATCH]');
    expect(cutscene.inspect()).toMatchObject({ mapId: 63, eventId: 13 });
    expect(flow.release).not.toHaveBeenCalled();
  });

  test('fails closed for owner zero before acquiring a flow or disabling the menu', () => {
    const { cutscene, flow } = installRuntime({ mainEventId: 0 });

    expect(() => call({ eventId: () => 0 }, 'BeginCutscene')).toThrow('[Coreto_Cutscene:CUTSCENE_OWNER_INVALID]');
    expect(cutscene.inspect()).toBeNull();
    expect(flow.acquire).not.toHaveBeenCalled();
    expect(global.$gameSystem.disableMenu).not.toHaveBeenCalled();
  });

  test('preserves the public API fallback to the main map interpreter', () => {
    const { cutscene } = installRuntime({ mainEventId: 7 });

    cutscene.begin();
    expect(cutscene.inspect()).toMatchObject({ mapId: 63, eventId: 7 });
    cutscene.finish();
    expect(cutscene.inspect()).toBeNull();
  });
});
