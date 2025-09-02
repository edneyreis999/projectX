/**
 * Utilitários para mock do ambiente RPG Maker MZ
 */

function setupRPGMakerEnvironment() {
  // Mock global RPG Maker MZ environment
  global.PluginManager = {
    parameters: jest.fn(),
    registerCommand: jest.fn(),
  };

  global.window = global.window || {};

  // Mock CoretoCore
  global.window.CoretoCore = {
    createLogger: jest.fn(),
    getGameVariable: jest.fn(),
    setGameVariable: jest.fn(),
  };

  // Mock coreto
  global.window.coreto = {
    BaseQuest: jest.fn().mockImplementation((name, logger) => ({
      name,
      logger,
      safeExecute: jest.fn().mockImplementation((fn, context) => fn()),
    })),
  };

  // Mock document for script loading
  global.document = {
    createElement: jest.fn().mockImplementation(tagName => {
      if (tagName === 'script') {
        return {
          src: '',
          onload: null,
          onerror: null,
        };
      }
      return {};
    }),
    head: {
      appendChild: jest.fn(),
    },
  };

  // Mock console methods
  global.console = {
    ...global.console,
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
  };
}

function setupGlobalMocks() {
  // Mock das classes de domínio
  global.window.MineracaoRequestDTO = jest.fn().mockImplementation((pilhaId, kravensColetados, totalPilhasRestantes) => ({
    pilhaId,
    kravensColetados,
    totalPilhasRestantes,
  }));

  global.window.MineracaoResponseDTO = jest.fn().mockImplementation((itemDropado, kravensRestantesParaMissao, crackActivated, pilhasRestantes) => ({
    itemDropado,
    kravensRestantesParaMissao,
    crackActivated,
    pilhasRestantes,
  }));

  global.window.MinaKravensDomain = jest.fn().mockImplementation((totalKravensParaMissao, totalKravensNaMina) => ({
    totalKravensParaMissao,
    totalKravensNaMina,
    isQuestCompleta: jest.fn(),
    calcularChancePorcentual: jest.fn(),
  }));

  global.window.MineracaoUseCase = jest.fn().mockImplementation((domain, coretoCore, coreto, logger, config) => ({
    domain,
    coretoCore,
    coreto,
    logger,
    config,
    executarMineracao: jest.fn(),
  }));

  // Mock do Logger
  const mockLogger = {
    enabled: true,
    prefix: '[Coreto_Quest_Mina_Kravens]',
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    setEnabled: jest.fn(),
  };

  if (global.window.CoretoCore && global.window.CoretoCore.createLogger) {
    global.window.CoretoCore.createLogger.mockReturnValue(mockLogger);
  }
}

function resetDependencyState() {
  // Limpa as instâncias das dependências para testes isolados
  delete global.window.MinaKravens;
  delete global.window.MineracaoRequestDTO;
  delete global.window.MineracaoResponseDTO;
  delete global.window.MinaKravensDomain;
  delete global.window.MineracaoUseCase;

  // NÃO limpar os mocks globais aqui - será feito pelo jest.clearAllMocks() no beforeEach
}

function setupDefaultParameters() {
  global.PluginManager.parameters.mockReturnValue({
    MinerioItemId: '1',
    PedraItemId: '2',
    BossStateVariableId: '10',
    TotalMinerioQuest: '4',
    TotalMinerioMina: '30',
    MineroKraven: '26',
    PilhasRestantesVariableId: '27',
    EnableDebugLogs: 'true',
    LogSwitchId: '0',
  });
}

function mockPromiseAll() {
  // Mock Promise.all para carregamento de dependências
  const originalPromiseAll = Promise.all;
  global.Promise.all = jest.fn().mockImplementation(promises => {
    // Simula carregamento imediato para testes síncronos
    return Promise.resolve(promises.map(() => Promise.resolve()));
  });

  return () => {
    global.Promise.all = originalPromiseAll;
  };
}

function simulatePluginInitialization() {
  const mockLogger = global.window.CoretoCore.createLogger('Coreto_Quest_Mina_Kravens');

  // Simula a função initializeController sendo chamada
  const mockController = {
    minar: jest.fn().mockImplementation(pilhaId => {
      try {
        const kravensAtuais = global.window.CoretoCore.getGameVariable(26, 0);

        // Log crítico apenas para quest já completa
        if (mockController.domain.isQuestCompleta(kravensAtuais)) {
          mockLogger.warn('Tentativa de mineração com quest já completa:', {
            kravensAtuais,
            totalKravensNecessarios: 4,
          });
        }

        return mockController.safeExecute(() => mockController.useCase.executarMineracao(pilhaId), 'Mineração');
      } catch (error) {
        mockLogger.error('Erro crítico durante mineração:', {
          error: error.message,
          stack: error.stack,
          pilhaId,
        });
        throw error;
      }
    }),

    registrarPilha: jest.fn().mockImplementation(() => {
      // Método legado para compatibilidade (no-op)
    }),

    alternarLogs: jest.fn().mockImplementation(() => {
      const newState = !mockLogger.enabled;
      mockLogger.setEnabled(newState);
      const note = `Logs ${newState ? 'ativados' : 'desativados'} via comando.`;
      console.info(mockLogger.prefix, new Date().toISOString(), note);
    }),

    domain: {
      isQuestCompleta: jest.fn(),
      calcularChancePorcentual: jest.fn(),
    },

    useCase: {
      executarMineracao: jest.fn(),
    },

    safeExecute: jest.fn().mockImplementation((fn, operation) => {
      try {
        return fn();
      } catch (error) {
        mockLogger.error(`Erro em ${operation}:`, error);
        throw error;
      }
    }),
  };

  global.window.MinaKravens = mockController;
  return mockController;
}

function createMockThis(eventId) {
  return { _eventId: eventId };
}

module.exports = {
  setupRPGMakerEnvironment,
  setupGlobalMocks,
  resetDependencyState,
  setupDefaultParameters,
  mockPromiseAll,
  simulatePluginInitialization,
  createMockThis,
};
