//=============================================================================
// Testes para carregamento de dependências DTOs
// DependencyLoading.test.js
//=============================================================================

describe('Dependency Loading Tests', () => {
  test('DTOs should be properly loaded and functional', () => {
    // Testa se os DTOs existem e funcionam corretamente
    const MineracaoRequestDTO = require('../js/dto/MineracaoRequestDTO');
    const MineracaoResponseDTO = require('../js/dto/MineracaoResponseDTO');

    expect(MineracaoRequestDTO).toBeDefined();
    expect(MineracaoResponseDTO).toBeDefined();

    // Testa criação de DTOs
    const request = new MineracaoRequestDTO({
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    });

    expect(request).toBeInstanceOf(MineracaoRequestDTO);
    expect(request.isValid()).toBe(true);

    const response = MineracaoResponseDTO.createKravenResponse({
      questCompleta: false,
      deveAtivarRachadura: false,
      pilhasRestantes: 9,
      kravensColetados: 1,
      chanceCalculada: 50,
    });

    expect(response).toBeInstanceOf(MineracaoResponseDTO);
    expect(response.isValid()).toBe(true);
  });

  test('Domain classes should work with DTOs', () => {
    const MinaKravensDomain = require('../js/domain/MinaKravensDomain');
    const MineracaoRequestDTO = require('../js/dto/MineracaoRequestDTO');
    const MineracaoResponseDTO = require('../js/dto/MineracaoResponseDTO');

    const domain = new MinaKravensDomain(5, 10);
    const request = new MineracaoRequestDTO({
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    });

    const resultado = domain.executarMineracao(request);
    expect(resultado && typeof resultado).toBe('object');
    expect(['Kraven', 'Pedra']).toContain(resultado.tipo);
  });

  test('Use Case should work with domain and DTOs', () => {
    const MinaKravensDomain = require('../js/domain/MinaKravensDomain');
    const MineracaoUseCase = require('../js/application/MineracaoUseCase');

    const domain = new MinaKravensDomain(5, 10);
    const mockServices = {
      coreService: {
        getGameVariable: jest.fn().mockReturnValue(0),
        setGameVariable: jest.fn(),
      },
      questService: { addItemToInventory: jest.fn().mockReturnValue(true) },
      logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
    };
    const mockConfig = {
      idItemKraven: 1,
      idItemPedra: 2,
      idVarKravensColetados: 10,
      idVarPilhasRestantes: 11,
      idVarEstadoBoss: 12,
      totalPilhasDisponiveis: 10,
    };

    const useCase = new MineracaoUseCase(domain, mockServices.coreService, mockServices.questService, mockServices.logger, mockConfig);

    // Deve executar sem problemas
    const resultado = useCase.executarMineracao(1);
    expect(['Kraven', 'Pedra']).toContain(resultado);
  });

  test('Should validate request object (domain validation)', () => {
    const MinaKravensDomain = require('../js/domain/MinaKravensDomain');
    const domain = new MinaKravensDomain(5, 10);

    // Tenta passar um objeto simples ao invés de DTO
    expect(() => {
      domain.executarMineracao({
        kravensJaColetados: 0,
        pilhasJaMineradas: 0,
        rachaduraJaAtivada: 'nope',
      });
    }).toThrow('rachaduraJaAtivada deve ser um boolean');
  });

  test('Should maintain lazy loading functionality', () => {
    // Testa se a função ensureDTOsLoaded funciona como esperado
    // No ambiente Node.js, os DTOs devem estar sempre carregados
    const MinaKravensDomain = require('../js/domain/MinaKravensDomain');
    const MineracaoRequestDTO = require('../js/dto/MineracaoRequestDTO');

    const domain = new MinaKravensDomain(5, 10);
    const request = new MineracaoRequestDTO({
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    });

    // Deve funcionar normalmente, confirmando que o lazy loading não quebra a funcionalidade
    expect(() => {
      domain.executarMineracao(request);
    }).not.toThrow();
  });
});
