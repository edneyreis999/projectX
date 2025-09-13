//=============================================================================
// Testes para carregamento de dependências DTOs
// DependencyLoading.test.js
//=============================================================================

import MinaKravensDomain from '../js/domain/MinaKravensDomain';
import MineracaoUseCase from '../js/application/MineracaoUseCase';

describe('Dependency Loading Tests', () => {
  test('Domain should work with plain objects (no DTO classes)', () => {
    const domain = new MinaKravensDomain(5, 10);
    const request = {
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    };

    const resultado = domain.executarMineracao(request);
    expect(resultado && typeof resultado).toBe('object');
    expect(resultado.tipo).toBeDefined();
    expect(resultado.questCompleta).toBeDefined();
    expect(resultado.deveAtivarRachadura).toBeDefined();
    expect(resultado.pilhasRestantes).toBeDefined();
    expect(resultado.kravensColetados).toBeDefined();
    expect(resultado.chanceCalculada).toBeDefined();
  });

  test('Domain classes should work with plain request objects', () => {
    const domain = new MinaKravensDomain(5, 10);
    const request = {
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    };

    const resultado = domain.executarMineracao(request);
    expect(resultado && typeof resultado).toBe('object');
    expect(['Kraven', 'Pedra']).toContain(resultado.tipo);
  });

  test('Use Case should work with domain and DTOs', () => {
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

  test('Should work with plain objects (no DTO classes needed)', () => {
    const domain = new MinaKravensDomain(5, 10);
    const request = {
      kravensJaColetados: 0,
      pilhasJaMineradas: 0,
      rachaduraJaAtivada: false,
    };

    // Should work normally with plain objects
    expect(() => {
      domain.executarMineracao(request);
    }).not.toThrow();
  });
});
