import MineracaoUseCase from '../frontend/js/application/MineracaoUseCase';

describe('MineracaoUseCase', () => {
  let useCase, mockDomain, mockCoreService, mockQuestService, mockLogger;

  // Mock das dependências
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock dos services principais
    mockCoreService = {
      getGameVariable: jest.fn(),
      setGameVariable: jest.fn(),
    };

    mockQuestService = {
      addItemToInventory: jest.fn(),
    };

    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    mockDomain = {
      executarMineracao: jest.fn(),
    };

    // Setup padrão do useCase com configuração completa
    useCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
      idItemKraven: 1,
      idItemPedra: 2,
      idVarKravensColetados: 10,
      idVarPilhasRestantes: 11,
      idVarEstadoBoss: 12,
      totalPilhasDisponiveis: 10,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    test('deve inicializar com dependências corretas', () => {
      const config = {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 11,
        idVarEstadoBoss: 12,
        totalPilhasDisponiveis: 10,
      };

      const newUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, config);

      expect(newUseCase.domain).toBe(mockDomain);
      expect(newUseCase.coreService).toBe(mockCoreService);
      expect(newUseCase.questService).toBe(mockQuestService);
      expect(newUseCase.logger).toBe(mockLogger);
    });

    test('deve armazenar configurações corretamente', () => {
      const config = {
        idItemKraven: 5,
        idItemPedra: 6,
        idVarKravensColetados: 15,
        idVarPilhasRestantes: 16,
        idVarEstadoBoss: 17,
        totalPilhasDisponiveis: 20,
      };

      const newUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, config);

      expect(newUseCase.idItemKraven).toBe(5);
      expect(newUseCase.idItemPedra).toBe(6);
      expect(newUseCase.idVarKravensColetados).toBe(15);
      expect(newUseCase.idVarPilhasRestantes).toBe(16);
      expect(newUseCase.idVarEstadoBoss).toBe(17);
      expect(newUseCase.totalPilhasDisponiveis).toBe(20);
    });

    test('deve funcionar com configuração mínima (IDs = 0)', () => {
      const config = {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 0, // Sem controle de pilhas
        idVarEstadoBoss: 0, // Sem controle de boss
        totalPilhasDisponiveis: 10,
      };

      const newUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, config);

      expect(newUseCase.idVarPilhasRestantes).toBe(0);
      expect(newUseCase.idVarEstadoBoss).toBe(0);
    });
  });

  describe('executarMineracao', () => {
    describe('fluxo principal', () => {
      test('deve executar mineração completa com sucesso - resultado Kraven', () => {
        // Setup: estado inicial do jogo
        mockCoreService.getGameVariable
          .mockReturnValueOnce(2) // Kravens coletados
          .mockReturnValueOnce(8) // Pilhas restantes
          .mockReturnValueOnce(0); // Boss não ativado

        // Domain retorna resultado Kraven
        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: false,
          pilhasRestantes: 7,
          kravensColetados: 3,
          chanceCalculada: 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Kraven');
        expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
          expect.objectContaining({
            kravensJaColetados: 2,
            pilhasJaMineradas: 2, // 10 - 8 = 2
            rachaduraJaAtivada: false,
          }),
        );
        expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(1, 1);
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 3);
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 7);
      });

      test('deve executar mineração completa com sucesso - resultado Pedra', () => {
        // Setup: estado inicial do jogo
        mockCoreService.getGameVariable
          .mockReturnValueOnce(2) // Kravens coletados
          .mockReturnValueOnce(8) // Pilhas restantes
          .mockReturnValueOnce(0); // Boss não ativado

        // Domain retorna resultado Pedra
        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: false,
          deveAtivarRachadura: false,
          pilhasRestantes: 7,
          kravensColetados: 2,
          chanceCalculada: 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Pedra');
        expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(2, 1);
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 2);
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 7);
      });

      test('deve processar quest completa corretamente', () => {
        // Setup: quest completa
        mockCoreService.getGameVariable
          .mockReturnValueOnce(5) // Kravens coletados (quest completa)
          .mockReturnValueOnce(5) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss ativado

        // Domain retorna resultado de quest completa
        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 4,
          kravensColetados: 5,
          chanceCalculada: 0,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Pedra');
        expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', {
          chance: 0,
          kravensColetados: 5,
          pilhasRestantes: 4,
        });
        expect(mockLogger.warn).toHaveBeenCalledWith('Resultado crítico da mineração:', expect.any(Object));
      });

      test('deve ativar rachadura quando necessário', () => {
        // Setup: penúltima coleta de Kraven
        mockCoreService.getGameVariable
          .mockReturnValueOnce(3) // Kravens coletados
          .mockReturnValueOnce(6) // Pilhas restantes
          .mockReturnValueOnce(0); // Boss não ativado

        // Domain retorna resultado que deve ativar rachadura
        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: true,
          pilhasRestantes: 5,
          kravensColetados: 4,
          chanceCalculada: 75,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Kraven');
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(12, 1); // Boss ativado
        expect(mockLogger.warn).toHaveBeenCalledWith('Rachadura ativada! Boss liberado.');
      });
    });

    describe('cenários da rachadura', () => {
      test('deve ativar rachadura na penúltima coleta de Kraven', () => {
        // Setup: 4 de 5 Kravens já coletados (penúltimo)
        mockCoreService.getGameVariable
          .mockReturnValueOnce(4) // Kravens coletados
          .mockReturnValueOnce(7) // Pilhas restantes
          .mockReturnValueOnce(0); // Boss não ativado

        // Domain retorna Kraven com rachadura
        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: true,
          pilhasRestantes: 6,
          kravensColetados: 5,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Kraven');
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(12, 1); // Boss ativado
        expect(mockLogger.warn).toHaveBeenCalledWith('Rachadura ativada! Boss liberado.');
      });

      test('deve garantir 100% de chance após rachadura ativada', () => {
        // Setup: Rachadura já ativada
        mockCoreService.getGameVariable
          .mockReturnValueOnce(4) // Kravens coletados
          .mockReturnValueOnce(5) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss já ativado (rachadura ativa)

        // Domain deve receber rachadura ativada = true
        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 4,
          kravensColetados: 5,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Kraven');
        expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
          expect.objectContaining({
            rachaduraJaAtivada: true,
          }),
        );
        expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', {
          chance: 100,
          kravensColetados: 5,
          pilhasRestantes: 4,
        });
      });

      test('deve completar quest após rachadura com Kraven garantido', () => {
        // Setup: último Kraven com rachadura ativa
        mockCoreService.getGameVariable
          .mockReturnValueOnce(4) // Kravens coletados (falta 1)
          .mockReturnValueOnce(3) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss ativado (rachadura ativa)

        // Domain retorna quest completa
        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 2,
          kravensColetados: 5,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Kraven');
        expect(mockLogger.warn).toHaveBeenCalledWith(
          'Resultado crítico da mineração:',
          expect.objectContaining({
            questCompleta: true,
          }),
        );
      });

      test('deve manter rachadura ativa entre minerações até completar quest', () => {
        // Setup: rachadura já ativada, mas quest não completa
        mockCoreService.getGameVariable
          .mockReturnValueOnce(4) // Kravens coletados
          .mockReturnValueOnce(4) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss ativado

        // Domain retorna Pedra (azar mesmo com rachadura)
        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: false,
          deveAtivarRachadura: true, // Continua com rachadura
          pilhasRestantes: 3,
          kravensColetados: 4,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Pedra');
        expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
          expect.objectContaining({
            rachaduraJaAtivada: true,
          }),
        );
      });
    });

    describe('cenários pós-quest completa', () => {
      test('deve sempre retornar Pedra após quest completa (100% chance)', () => {
        // Setup: Quest já completa (5+ Kravens)
        mockCoreService.getGameVariable
          .mockReturnValueOnce(5) // Kravens coletados (quest completa)
          .mockReturnValueOnce(3) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss ativado

        // Domain sempre retorna Pedra quando quest completa
        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 2,
          kravensColetados: 5,
          chanceCalculada: 0,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa uma vez para testar
        const resultado = useCase.executarMineracao(123);
        expect(resultado).toBe('Pedra');

        // Verifica que Kravens não aumentou
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 5);
      });

      test('deve manter consistência de retorno Pedra mesmo com rachadura prévia', () => {
        // Setup: quest completa com rachadura prévia ativa
        mockCoreService.getGameVariable
          .mockReturnValueOnce(6) // Kravens coletados (acima do necessário)
          .mockReturnValueOnce(2) // Pilhas restantes
          .mockReturnValueOnce(1); // Boss ativado

        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 1,
          kravensColetados: 6,
          chanceCalculada: 0,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Pedra');
        expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 6);
      });

      test('deve processar corretamente minerações após completar quest', () => {
        // Setup: quest completa há tempo
        mockCoreService.getGameVariable
          .mockReturnValueOnce(7) // Kravens coletados (bem acima)
          .mockReturnValueOnce(1) // Última pilha
          .mockReturnValueOnce(1); // Boss ativado

        const domainResponse = {
          tipo: 'Pedra',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 0,
          kravensColetados: 7,
          chanceCalculada: 0,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        const resultado = useCase.executarMineracao(123);

        // Validações
        expect(resultado).toBe('Pedra');
        expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', {
          chance: 0,
          kravensColetados: 7,
          pilhasRestantes: 0,
        });
      });
    });

    describe('validação de DTOs', () => {
      test('deve garantir que DTOs estão carregados', () => {
        // Setup normal - DTOs devem estar disponíveis
        mockCoreService.getGameVariable.mockReturnValueOnce(2).mockReturnValueOnce(8).mockReturnValueOnce(0);

        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: false,
          pilhasRestantes: 7,
          kravensColetados: 3,
          chanceCalculada: 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa (deve funcionar normalmente)
        expect(() => {
          useCase.executarMineracao(123);
        }).not.toThrow();
      });
    });

    describe('logging', () => {
      test('deve logar chances críticas (0% e 100%)', () => {
        // Setup para 100% de chance
        mockCoreService.getGameVariable.mockReturnValueOnce(4).mockReturnValueOnce(1).mockReturnValueOnce(1);

        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 0,
          kravensColetados: 5,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        useCase.executarMineracao(123);

        // Verifica log de chance crítica
        expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', {
          chance: 100,
          kravensColetados: 5,
          pilhasRestantes: 0,
        });
      });

      test('deve logar resultado da mineração', () => {
        mockCoreService.getGameVariable.mockReturnValueOnce(2).mockReturnValueOnce(8).mockReturnValueOnce(0);

        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: false,
          pilhasRestantes: 7,
          kravensColetados: 3,
          chanceCalculada: 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        useCase.executarMineracao(123);

        // Verifica log do resultado
        expect(mockLogger.info).toHaveBeenCalledWith('Jogador minerou e obteve: Kraven');
      });

      test('deve logar eventos críticos (rachadura, quest completa)', () => {
        mockCoreService.getGameVariable.mockReturnValueOnce(4).mockReturnValueOnce(3).mockReturnValueOnce(0);

        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 2,
          kravensColetados: 5,
          chanceCalculada: 100,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Executa
        useCase.executarMineracao(123);

        // Verifica log crítico
        expect(mockLogger.warn).toHaveBeenCalledWith('Resultado crítico da mineração:', {
          tipo: 'Kraven',
          deveAtivarRachadura: false,
          questCompleta: true,
          kravensColetados: 5,
        });
      });
    });

    describe('tratamento de erros', () => {
      test('deve capturar e logar erros do domain', () => {
        mockCoreService.getGameVariable.mockReturnValueOnce(2).mockReturnValueOnce(8).mockReturnValueOnce(0);

        const error = new Error('Erro no domain');
        mockDomain.executarMineracao.mockImplementation(() => {
          throw error;
        });

        // Executa e verifica erro
        expect(() => {
          useCase.executarMineracao(123);
        }).toThrow('Erro no domain');

        expect(mockLogger.error).toHaveBeenCalledWith('Erro durante executarMineracao:', {
          error: 'Erro no domain',
          stack: error.stack,
          pilhaId: 123,
        });
      });

      test('deve capturar e logar erros do processamento', () => {
        mockCoreService.getGameVariable.mockReturnValueOnce(2).mockReturnValueOnce(8).mockReturnValueOnce(0);

        const domainResponse = {
          tipo: 'Kraven',
          questCompleta: false,
          deveAtivarRachadura: false,
          pilhasRestantes: 7,
          kravensColetados: 3,
          chanceCalculada: 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        // Força erro no questService
        const error = new Error('Erro no inventory');
        mockQuestService.addItemToInventory.mockImplementation(() => {
          throw error;
        });

        // Executa e verifica erro
        expect(() => {
          useCase.executarMineracao(123);
        }).toThrow('Erro no inventory');

        expect(mockLogger.error).toHaveBeenCalledWith('Erro durante _processarResultado:', {
          error: 'Erro no inventory',
          stack: error.stack,
          resultado: domainResponse,
        });
      });

      test('deve propagar erros críticos', () => {
        mockCoreService.getGameVariable.mockReturnValueOnce(2).mockReturnValueOnce(8).mockReturnValueOnce(0);

        const criticalError = new Error('Erro crítico');
        mockDomain.executarMineracao.mockImplementation(() => {
          throw criticalError;
        });

        // Verifica que erro é propagado
        expect(() => {
          useCase.executarMineracao(123);
        }).toThrow('Erro crítico');
      });
    });
  });

  describe('_obterKravensColetados', () => {
    test('deve retornar valor correto da variável do jogo', () => {
      mockCoreService.getGameVariable.mockReturnValue(5);

      const result = useCase._obterKravensColetados();

      expect(result).toBe(5);
      expect(mockCoreService.getGameVariable).toHaveBeenCalledWith(10, 0);
    });

    test('deve usar valor padrão 0 se variável não existe', () => {
      // getGameVariable returns the default value when variable doesn't exist
      mockCoreService.getGameVariable.mockReturnValue(0);

      const result = useCase._obterKravensColetados();

      expect(result).toBe(0); // Default value
      expect(mockCoreService.getGameVariable).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('_obterPilhasJaMineradas', () => {
    test('deve calcular pilhas mineradas corretamente', () => {
      mockCoreService.getGameVariable
        .mockReturnValueOnce(3) // Pilhas restantes
        .mockReturnValueOnce(2); // Kravens coletados (para verificar inicialização)

      const result = useCase._obterPilhasJaMineradas();

      expect(result).toBe(7); // 10 - 3 = 7 pilhas mineradas
      expect(mockCoreService.getGameVariable).toHaveBeenCalledWith(11, 0);
    });

    test('deve inicializar pilhas restantes no primeiro uso', () => {
      // Simula primeiro uso (pilhas = 0, kravens = 0)
      mockCoreService.getGameVariable
        .mockReturnValueOnce(0) // Pilhas restantes (não inicializada)
        .mockReturnValueOnce(0); // Kravens coletados

      const result = useCase._obterPilhasJaMineradas();

      expect(result).toBe(0); // Nenhuma pilha minerada ainda
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 10); // Inicializa com total
    });

    test('deve funcionar sem variável de pilhas configurada', () => {
      // UseCase sem controle de pilhas
      const useCaseWithoutPilhas = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 0, // Sem controle de pilhas
        idVarEstadoBoss: 12,
        totalPilhasDisponiveis: 10,
      });

      const result = useCaseWithoutPilhas._obterPilhasJaMineradas();

      expect(result).toBe(0);
      expect(mockCoreService.getGameVariable).not.toHaveBeenCalled();
    });
  });

  describe('_verificarSeRachaduraJaFoiAtivada', () => {
    test('deve retornar true quando boss ativado', () => {
      mockCoreService.getGameVariable.mockReturnValue(1);

      const result = useCase._verificarSeRachaduraJaFoiAtivada();

      expect(result).toBe(true);
      expect(mockCoreService.getGameVariable).toHaveBeenCalledWith(12, 0);
    });

    test('deve retornar false quando boss não ativado', () => {
      mockCoreService.getGameVariable.mockReturnValue(0);

      const result = useCase._verificarSeRachaduraJaFoiAtivada();

      expect(result).toBe(false);
      expect(mockCoreService.getGameVariable).toHaveBeenCalledWith(12, 0);
    });
  });

  describe('_processarResultado', () => {
    test('deve adicionar item correto (Kraven)', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };

      useCase._processarResultado(resultado);

      expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(1, 1);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 3);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 7);
    });

    test('deve adicionar item correto (Pedra)', () => {
      const resultado = {
        tipo: 'Pedra',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 2,
        chanceCalculada: 50,
      };

      useCase._processarResultado(resultado);

      expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(2, 1);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 2);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 7);
    });

    test('deve atualizar variáveis do jogo', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 5,
        kravensColetados: 4,
        chanceCalculada: 75,
      };

      useCase._processarResultado(resultado);

      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 4);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 5);
    });

    test('deve ativar rachadura quando necessário', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: true,
        pilhasRestantes: 5,
        kravensColetados: 4,
        chanceCalculada: 75,
      };

      useCase._processarResultado(resultado);

      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(12, 1);
      expect(mockLogger.warn).toHaveBeenCalledWith('Rachadura ativada! Boss liberado.');
    });

    test('deve tratar erros durante processamento', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };

      const error = new Error('Erro durante processamento');
      mockQuestService.addItemToInventory.mockImplementation(() => {
        throw error;
      });

      expect(() => {
        useCase._processarResultado(resultado);
      }).toThrow('Erro durante processamento');

      expect(mockLogger.error).toHaveBeenCalledWith('Erro durante _processarResultado:', {
        error: 'Erro durante processamento',
        stack: error.stack,
        resultado: resultado,
      });
    });
  });

  describe('_atualizarVariaveisJogo', () => {
    test('deve atualizar Kravens coletados', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };

      useCase._atualizarVariaveisJogo(resultado);

      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 3);
    });

    test('deve atualizar pilhas restantes', () => {
      const resultado = {
        tipo: 'Pedra',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 5,
        kravensColetados: 2,
        chanceCalculada: 40,
      };

      useCase._atualizarVariaveisJogo(resultado);

      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 5);
    });

    test('deve funcionar sem variável de pilhas', () => {
      const useCaseWithoutPilhas = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 0, // Sem controle de pilhas
        idVarEstadoBoss: 12,
        totalPilhasDisponiveis: 10,
      });

      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };

      useCaseWithoutPilhas._atualizarVariaveisJogo(resultado);

      // Deve atualizar apenas Kravens, não pilhas
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 3);
      expect(mockCoreService.setGameVariable).not.toHaveBeenCalledWith(0, expect.anything());
    });

    test('deve tratar erros durante atualização', () => {
      const resultado = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };

      const error = new Error('Erro durante atualização');
      mockCoreService.setGameVariable.mockImplementation(() => {
        throw error;
      });

      expect(() => {
        useCase._atualizarVariaveisJogo(resultado);
      }).toThrow('Erro durante atualização');

      expect(mockLogger.error).toHaveBeenCalledWith('Erro durante _atualizarVariaveisJogo:', {
        error: 'Erro durante atualização',
        stack: error.stack,
        resultado: resultado,
      });
    });
  });

  describe('_ativarRachadura', () => {
    test('deve ativar boss quando configurado', () => {
      useCase._ativarRachadura();

      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(12, 1);
    });

    test('deve funcionar sem variável de boss configurada', () => {
      const useCaseWithoutBoss = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 11,
        idVarEstadoBoss: 0, // Sem controle de boss
        totalPilhasDisponiveis: 10,
      });

      // Não deve fazer nada e não deve quebrar
      expect(() => {
        useCaseWithoutBoss._ativarRachadura();
      }).not.toThrow();

      expect(mockCoreService.setGameVariable).not.toHaveBeenCalled();
    });

    test('deve não quebrar mineração em caso de erro', () => {
      const error = new Error('Erro no boss');
      mockCoreService.setGameVariable.mockImplementation(() => {
        throw error;
      });

      // Não deve propagar o erro
      expect(() => {
        useCase._ativarRachadura();
      }).not.toThrow();

      expect(mockLogger.error).toHaveBeenCalledWith('Erro durante _ativarRachadura:', {
        error: 'Erro no boss',
        idVarEstadoBoss: 12,
      });
    });
  });

  describe('_adicionarItem', () => {
    test('deve chamar questService corretamente', () => {
      useCase._adicionarItem(5);

      expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(5, 1);
    });

    test('deve propagar erros do questService', () => {
      const error = new Error('Erro no inventário');
      mockQuestService.addItemToInventory.mockImplementation(() => {
        throw error;
      });

      expect(() => {
        useCase._adicionarItem(5);
      }).toThrow('Erro no inventário');

      expect(mockLogger.error).toHaveBeenCalledWith('Erro durante _adicionarItem:', {
        error: 'Erro no inventário',
        itemId: 5,
      });
    });
  });

  describe('cenários de borda', () => {
    test('deve funcionar com configuração mínima', () => {
      const minimalUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 0,
        idVarEstadoBoss: 0,
        totalPilhasDisponiveis: 1,
      });

      mockCoreService.getGameVariable.mockReturnValue(0);

      const domainResponse = {
        tipo: 'Pedra',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 0,
        kravensColetados: 0,
        chanceCalculada: 0,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      // Deve funcionar sem erros
      const resultado = minimalUseCase.executarMineracao(123);
      expect(resultado).toBe('Pedra');
    });

    test('deve funcionar com IDs de variáveis inválidas (0)', () => {
      const invalidUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 1,
        idItemPedra: 2,
        idVarKravensColetados: 10,
        idVarPilhasRestantes: 0,
        idVarEstadoBoss: 0,
        totalPilhasDisponiveis: 10,
      });

      mockCoreService.getGameVariable.mockReturnValue(2);

      const domainResponse = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 7,
        kravensColetados: 3,
        chanceCalculada: 50,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      // Deve funcionar e não tentar acessar variáveis inválidas
      const resultado = invalidUseCase.executarMineracao(123);
      expect(resultado).toBe('Kraven');
    });

    test('deve funcionar com quest já completa', () => {
      mockCoreService.getGameVariable
        .mockReturnValueOnce(8) // Kravens coletados (acima do limite)
        .mockReturnValueOnce(2) // Pilhas restantes
        .mockReturnValueOnce(1); // Boss ativado

      const domainResponse = {
        tipo: 'Pedra',
        questCompleta: true,
        deveAtivarRachadura: false,
        pilhasRestantes: 1,
        kravensColetados: 8,
        chanceCalculada: 0,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      const resultado = useCase.executarMineracao(123);

      expect(resultado).toBe('Pedra');
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Resultado crítico da mineração:',
        expect.objectContaining({
          questCompleta: true,
        }),
      );
    });

    test('deve funcionar com rachadura já ativada', () => {
      mockCoreService.getGameVariable
        .mockReturnValueOnce(3) // Kravens coletados
        .mockReturnValueOnce(5) // Pilhas restantes
        .mockReturnValueOnce(1); // Boss já ativado

      const domainResponse = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: true,
        pilhasRestantes: 4,
        kravensColetados: 4,
        chanceCalculada: 100,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      const resultado = useCase.executarMineracao(123);

      expect(resultado).toBe('Kraven');
      expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
        expect.objectContaining({
          rachaduraJaAtivada: true,
        }),
      );
    });
  });

  describe('integração completa', () => {
    test('deve simular fluxo completo da quest', () => {
      // Simula uma progressão completa de 0 a 5 Kravens
      const simulacao = [
        { kravens: 0, esperado: 'Kraven', deveAtivarRachadura: false },
        { kravens: 1, esperado: 'Kraven', deveAtivarRachadura: false },
        { kravens: 2, esperado: 'Kraven', deveAtivarRachadura: false },
        { kravens: 3, esperado: 'Kraven', deveAtivarRachadura: true }, // Penúltimo Kraven
        { kravens: 4, esperado: 'Kraven', deveAtivarRachadura: false }, // Último Kraven (quest completa)
      ];

      simulacao.forEach((step, index) => {
        mockCoreService.getGameVariable
          .mockReturnValueOnce(step.kravens) // Kravens coletados
          .mockReturnValueOnce(10 - index - 1) // Pilhas restantes
          .mockReturnValueOnce(step.kravens >= 4 ? 1 : 0); // Boss ativado após penúltimo

        const domainResponse = {
          tipo: step.esperado,
          questCompleta: step.kravens + 1 >= 5,
          deveAtivarRachadura: step.deveAtivarRachadura,
          pilhasRestantes: 10 - index - 2,
          kravensColetados: step.kravens + 1,
          chanceCalculada: step.kravens >= 3 ? 100 : 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        const resultado = useCase.executarMineracao(123 + index);

        expect(resultado).toBe(step.esperado);

        if (step.deveAtivarRachadura) {
          expect(mockLogger.warn).toHaveBeenCalledWith('Rachadura ativada! Boss liberado.');
        }
      });
    });

    test('deve manter consistência entre calls', () => {
      // Primeira call - início da quest
      mockCoreService.getGameVariable
        .mockReturnValueOnce(0) // Kravens coletados
        .mockReturnValueOnce(10) // Pilhas restantes
        .mockReturnValueOnce(0); // Boss não ativado

      const response1 = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 9,
        kravensColetados: 1,
        chanceCalculada: 55,
      };
      mockDomain.executarMineracao.mockReturnValue(response1);

      const resultado1 = useCase.executarMineracao(1);
      expect(resultado1).toBe('Kraven');

      // Reset mocks para segunda call
      jest.clearAllMocks();

      // Segunda call - meio da quest
      mockCoreService.getGameVariable
        .mockReturnValueOnce(1) // Kravens coletados (baseado no resultado anterior)
        .mockReturnValueOnce(9) // Pilhas restantes (baseado no resultado anterior)
        .mockReturnValueOnce(0); // Boss ainda não ativado

      const response2 = {
        tipo: 'Pedra',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 8,
        kravensColetados: 1, // Não aumenta porque foi Pedra
        chanceCalculada: 50,
      };
      mockDomain.executarMineracao.mockReturnValue(response2);

      const resultado2 = useCase.executarMineracao(2);
      expect(resultado2).toBe('Pedra');

      // Verifica consistência nas variáveis passadas
      expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
        expect.objectContaining({
          kravensJaColetados: 1,
          pilhasJaMineradas: 1,
          rachaduraJaAtivada: false,
        }),
      );
    });

    test('deve integrar corretamente com domain e services', () => {
      // Setup completo
      mockCoreService.getGameVariable
        .mockReturnValueOnce(3) // Kravens coletados
        .mockReturnValueOnce(4) // Pilhas restantes
        .mockReturnValueOnce(0); // Boss não ativado

      const domainResponse = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: true, // Deve ativar rachadura
        pilhasRestantes: 3,
        kravensColetados: 4,
        chanceCalculada: 100,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      // Executa
      const resultado = useCase.executarMineracao(123);

      // Verifica integração com domain
      expect(mockDomain.executarMineracao).toHaveBeenCalledWith(
        expect.objectContaining({
          kravensJaColetados: 3,
          pilhasJaMineradas: 6, // 10 - 4 = 6
          rachaduraJaAtivada: false,
        }),
      );

      // Verifica integração com questService
      expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(1, 1);

      // Verifica integração com coreService
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(10, 4); // Kravens
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(11, 3); // Pilhas
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(12, 1); // Boss

      // Verifica integração com logger
      expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', expect.any(Object));
      expect(mockLogger.info).toHaveBeenCalledWith('Jogador minerou e obteve: Kraven');
      expect(mockLogger.warn).toHaveBeenCalledWith('Rachadura ativada! Boss liberado.');
      expect(mockLogger.warn).toHaveBeenCalledWith('Resultado crítico da mineração:', expect.any(Object));

      expect(resultado).toBe('Kraven');
    });
  });

  describe('edge cases', () => {
    test('deve funcionar quando não há pilhas restantes', () => {
      mockCoreService.getGameVariable
        .mockReturnValueOnce(2) // Kravens coletados
        .mockReturnValueOnce(0) // Sem pilhas restantes
        .mockReturnValueOnce(0); // Boss não ativado

      const domainResponse = {
        tipo: 'Pedra',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: -1, // Negativo indica esgotamento
        kravensColetados: 2,
        chanceCalculada: 0,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      const resultado = useCase.executarMineracao(123);

      expect(resultado).toBe('Pedra');
      expect(mockLogger.info).toHaveBeenCalledWith('Chance de Kraven calculada pelo domínio', {
        chance: 0,
        kravensColetados: 2,
        pilhasRestantes: -1,
      });
    });

    test('deve funcionar com valores extremos de configuração', () => {
      const extremeUseCase = new MineracaoUseCase(mockDomain, mockCoreService, mockQuestService, mockLogger, {
        idItemKraven: 999,
        idItemPedra: 1000,
        idVarKravensColetados: 500,
        idVarPilhasRestantes: 501,
        idVarEstadoBoss: 502,
        totalPilhasDisponiveis: 1000,
      });

      mockCoreService.getGameVariable.mockReturnValueOnce(0).mockReturnValueOnce(1000).mockReturnValueOnce(0);

      const domainResponse = {
        tipo: 'Kraven',
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 999,
        kravensColetados: 1,
        chanceCalculada: 1,
      };
      mockDomain.executarMineracao.mockReturnValue(domainResponse);

      const resultado = extremeUseCase.executarMineracao(123);

      expect(resultado).toBe('Kraven');
      expect(mockQuestService.addItemToInventory).toHaveBeenCalledWith(999, 1);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(500, 1);
      expect(mockCoreService.setGameVariable).toHaveBeenCalledWith(501, 999);
    });

    test('deve funcionar com múltiplas minerações consecutivas', () => {
      // Simula 5 minerações consecutivas
      for (let i = 0; i < 5; i++) {
        // Reset mocks para cada iteração
        jest.clearAllMocks();

        mockCoreService.getGameVariable
          .mockReturnValueOnce(i) // Kravens crescendo
          .mockReturnValueOnce(10 - i) // Pilhas diminuindo
          .mockReturnValueOnce(i >= 4 ? 1 : 0); // Boss ativo no final

        const domainResponse = {
          tipo: i < 4 ? 'Kraven' : 'Pedra', // Últimas são pedra
          questCompleta: i >= 4,
          deveAtivarRachadura: i === 3, // Ativa no penúltimo
          pilhasRestantes: 9 - i,
          kravensColetados: i < 4 ? i + 1 : 5,
          chanceCalculada: i >= 3 ? 100 : 50,
        };
        mockDomain.executarMineracao.mockReturnValue(domainResponse);

        const resultado = useCase.executarMineracao(100 + i);

        if (i < 4) {
          expect(resultado).toBe('Kraven');
        } else {
          expect(resultado).toBe('Pedra');
        }
      }
    });
  });
});
