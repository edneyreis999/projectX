/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const pluginPath = path.resolve(__dirname, '../../js/plugins/Coreto_QuestCore.js');

function questDefinition(overrides = {}) {
  return {
    stageVariableId: 1,
    initialState: 0,
    terminalStates: [90],
    pkd: {
      questId: 'quest-test',
      objectives: [
        { id: 1, knownFrom: 10, completedAt: 20 },
        { id: 2, knownFrom: 20, completedAt: null },
      ],
      completeQuestAtTerminal: false,
    },
    transitions: {
      START: { from: [0], to: 10, requirements: [], effects: [] },
      ADVANCE: { from: [10], to: 20, requirements: [], effects: [] },
      FINISH_LOCAL: { from: [20], to: 90, requirements: [], effects: [], terminal: true },
    },
    ...overrides,
  };
}

function installEnvironment(definition = questDefinition()) {
  jest.resetModules();
  delete global.Coreto;

  global.$dataCoretoQuests = { schemaVersion: 1, quests: { 'quest-test': definition } };
  global.$dataSystem = { variables: [null, 'v_test_stage'] };
  global.$dataItems = [null];
  global.$gameTemp = {};

  class GameSystem {
    initialize() {}
  }
  class GamePlayer {
    canMove() {
      return true;
    }
  }
  class SceneMap {
    isMenuEnabled() {
      return true;
    }
  }
  class SceneBase {
    requestAutosave() {}
    executeAutosave() {}
  }
  global.Game_System = GameSystem;
  global.Game_Player = GamePlayer;
  global.Scene_Map = SceneMap;
  global.Scene_Base = SceneBase;
  global.DataManager = { _databaseFiles: [], isDatabaseLoaded: jest.fn(() => true) };
  global.PluginManager = { registerCommand: jest.fn() };

  const values = new Map([[1, 0]]);
  global.$gameVariables = {
    value: jest.fn(id => values.get(id) ?? 0),
    setValue: jest.fn((id, value) => values.set(id, value)),
  };
  global.$gameSystem = new GameSystem();

  const visibleTasks = new Set();
  const completedTasks = new Set();
  global.SQSM = {
    quests: jest.fn(() => [{ id: 'quest-test' }]),
    isQuestVisible: jest.fn(() => false),
    isQuestComplete: jest.fn(() => false),
    isQuestTaskVisible: jest.fn((questId, taskId) => visibleTasks.has(`${questId}:${taskId}`)),
    isQuestTaskComplete: jest.fn((questId, taskId) => completedTasks.has(`${questId}:${taskId}`)),
    AddQuest: jest.fn(),
    ShowTaskForQuest: jest.fn((questId, taskId) => visibleTasks.add(`${questId}:${taskId}`)),
    CompleteTaskForQuest: jest.fn((questId, taskId) => completedTasks.add(`${questId}:${taskId}`)),
    CompleteQuest: jest.fn(),
  };

  jest.spyOn(console, 'error').mockImplementation(() => {});
  require(pluginPath);
  global.$gameSystem.initialize();
  expect(global.DataManager.isDatabaseLoaded()).toBe(true);
  return global.Coreto.QuestCore;
}

describe('Coreto_QuestCore PKD projection policies', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete require.cache[pluginPath];
    delete global.Coreto;
  });

  test('shows an external objective without completing it', () => {
    const core = installEnvironment();
    core.transition('quest-test', 'START');
    core.transition('quest-test', 'ADVANCE');

    expect(global.SQSM.ShowTaskForQuest).toHaveBeenCalledWith('quest-test', 2);
    expect(global.SQSM.CompleteTaskForQuest).toHaveBeenCalledWith('quest-test', 1);
    expect(global.SQSM.CompleteTaskForQuest).not.toHaveBeenCalledWith('quest-test', 2);
  });

  test('does not complete a parent PKD quest when a local machine reaches terminal', () => {
    const core = installEnvironment();
    core.transition('quest-test', 'START');
    core.transition('quest-test', 'ADVANCE');
    core.transition('quest-test', 'FINISH_LOCAL');

    expect(core.state('quest-test')).toBe(90);
    expect(core.inspect('quest-test').terminal).toBe(true);
    expect(global.SQSM.CompleteQuest).not.toHaveBeenCalled();
  });

  test('preserves terminal quest completion as the default policy', () => {
    const definition = questDefinition();
    delete definition.pkd.completeQuestAtTerminal;
    const core = installEnvironment(definition);
    core.transition('quest-test', 'START');
    core.transition('quest-test', 'ADVANCE');
    core.transition('quest-test', 'FINISH_LOCAL');

    expect(global.SQSM.CompleteQuest).toHaveBeenCalledWith('quest-test');
  });

  test('rejects an invalid terminal projection policy', () => {
    const definition = questDefinition();
    definition.pkd.completeQuestAtTerminal = 'false';
    expect(() => installEnvironment(definition)).toThrow('SCHEMA_PKD_TERMINAL_POLICY');
  });

  test('still requires completedAt when completion is not explicitly external', () => {
    const definition = questDefinition();
    delete definition.pkd.objectives[1].completedAt;
    expect(() => installEnvironment(definition)).toThrow('SCHEMA_INVALID_INTEGER');
  });
});
