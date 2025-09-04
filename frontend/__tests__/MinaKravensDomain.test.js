const MinaKravensDomain = require('../js/domain/MinaKravensDomain');
const MineracaoRequestDTO = require('../js/dto/MineracaoRequestDTO');
const MineracaoResponseDTO = require('../js/dto/MineracaoResponseDTO');

describe('MinaKravensDomain', () => {
  let domain;

  beforeEach(() => {
    // Configura um domínio padrão para a maioria dos testes
    domain = new MinaKravensDomain(5, 10); // 5 Kravens necessários, 10 pilhas disponíveis
  });

  describe('constructor', () => {
    test('deve inicializar com valores corretos', () => {
      const domain = new MinaKravensDomain(3, 8);
      expect(domain.totalKravensNecessarios).toBe(3);
      expect(domain.totalPilhasDisponiveis).toBe(8);
    });
  });

  describe('isQuestCompleta', () => {
    test('deve retornar false quando não coletou todos os Kravens', () => {
      expect(domain.isQuestCompleta(0)).toBe(false);
      expect(domain.isQuestCompleta(3)).toBe(false);
      expect(domain.isQuestCompleta(4)).toBe(false);
    });

    test('deve retornar true quando coletou todos os Kravens necessários', () => {
      expect(domain.isQuestCompleta(5)).toBe(true);
      expect(domain.isQuestCompleta(6)).toBe(true);
    });
  });

  describe('shouldAtivarRachadura', () => {
    test('deve retornar false quando não está próximo de completar', () => {
      expect(domain.shouldAtivarRachadura(0)).toBe(false);
      expect(domain.shouldAtivarRachadura(2)).toBe(false);
      expect(domain.shouldAtivarRachadura(3)).toBe(false);
    });

    test('deve retornar true quando falta apenas 1 Kraven', () => {
      expect(domain.shouldAtivarRachadura(4)).toBe(true);
    });

    test('deve retornar false quando a quest já está completa', () => {
      expect(domain.shouldAtivarRachadura(5)).toBe(false);
      expect(domain.shouldAtivarRachadura(6)).toBe(false);
    });
  });

  describe('calcularChanceKraven', () => {
    test('deve retornar 0% quando não há pilhas restantes', () => {
      const chance = domain.calcularChanceKraven(2, 0);
      expect(chance).toBe(0);
    });

    test('deve retornar 100% quando pilhas restantes <= Kravens restantes', () => {
      // 5 Kravens necessários, 2 já coletados = 3 restantes
      // Se há 3 ou menos pilhas restantes, chance deve ser 100%
      expect(domain.calcularChanceKraven(2, 3)).toBe(100);
      expect(domain.calcularChanceKraven(2, 2)).toBe(100);
      expect(domain.calcularChanceKraven(2, 1)).toBe(100);
    });

    test('deve calcular chance gradual quando há mais pilhas que Kravens restantes', () => {
      // 5 Kravens necessários, 2 já coletados = 3 restantes
      // 6 pilhas restantes: chance = (3/6) * 100 = 50%
      const chance = domain.calcularChanceKraven(2, 6);
      expect(chance).toBe(50);
    });

    test('deve limitar a chance máxima a 100%', () => {
      // Teste para garantir que nunca ultrapassa 100%
      const chance = domain.calcularChanceKraven(0, 1);
      expect(chance).toBe(100);
    });

    test('deve calcular diferentes cenários de chance', () => {
      // Cenário 1: 1 Kraven coletado, 4 restantes, 8 pilhas restantes
      // Chance = (4/8) * 100 = 50%
      expect(domain.calcularChanceKraven(1, 8)).toBe(50);

      // Cenário 2: 3 Kravens coletados, 2 restantes, 4 pilhas restantes
      // Chance = (2/4) * 100 = 50%
      expect(domain.calcularChanceKraven(3, 4)).toBe(50);

      // Cenário 3: 4 Kravens coletados, 1 restante, 5 pilhas restantes
      // Chance = (1/5) * 100 = 20%
      expect(domain.calcularChanceKraven(4, 5)).toBe(20);
    });
  });

  describe('executarMineracao', () => {
    beforeEach(() => {
      // Remove qualquer mock anterior
      jest.restoreAllMocks();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('deve sempre retornar pedra quando quest está completa', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 5,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request);

      expect(resultado.tipo).toBe('Pedra');
      expect(resultado.questCompleta).toBe(true);
      expect(resultado.pilhasRestantes).toBe(6); // 10 - 3 - 1 = 6
      expect(resultado.kravensColetados).toBe(5);
    });

    test('deve retornar Kraven quando _gerarNumeroAleatorio favorece', () => {
      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // 10% - deve dar Kraven se chance > 10%

      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 3 Kravens restantes, 6 pilhas restantes após mineração

      expect(resultado.tipo).toBe('Kraven');
      expect(resultado.questCompleta).toBe(false);
      expect(resultado.deveAtivarRachadura).toBe(false);
      expect(resultado.pilhasRestantes).toBe(6); // 10 - 3 - 1 = 6
      expect(resultado.kravensColetados).toBe(3);
      expect(resultado.chanceCalculada).toBe(50); // (3/6) * 100 = 50%
    });

    test('deve retornar Pedra quando _gerarNumeroAleatorio não favorece', () => {
      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.9); // 90% - deve dar Pedra se chance < 90%

      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 3 Kravens restantes, 6 pilhas restantes após mineração

      expect(resultado.tipo).toBe('Pedra');
      expect(resultado.questCompleta).toBe(false);
      expect(resultado.deveAtivarRachadura).toBe(false);
      expect(resultado.pilhasRestantes).toBe(6);
      expect(resultado.kravensColetados).toBe(2);
      expect(resultado.chanceCalculada).toBe(50);
    });

    test('deve ativar rachadura quando falta apenas 1 Kraven', () => {
      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Força obtenção de Kraven

      const request = new MineracaoRequestDTO({
        kravensJaColetados: 3,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 2 Kravens restantes

      expect(resultado.tipo).toBe('Kraven');
      expect(resultado.questCompleta).toBe(false);
      expect(resultado.deveAtivarRachadura).toBe(true); // 4 coletados = falta 1
      expect(resultado.kravensColetados).toBe(4);
    });

    test('deve completar quest ao coletar o último Kraven', () => {
      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Força obtenção de Kraven

      const request = new MineracaoRequestDTO({
        kravensJaColetados: 4,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 1 Kraven restante

      expect(resultado.tipo).toBe('Kraven');
      expect(resultado.questCompleta).toBe(true);
      expect(resultado.deveAtivarRachadura).toBe(false); // Quest completa, não ativa rachadura
      expect(resultado.kravensColetados).toBe(5);
    });

    test('deve garantir 100% de chance quando pilhas restantes <= Kravens restantes', () => {
      // Cenário: 2 Kravens restantes, 2 pilhas restantes após mineração = 100%
      // Domain: 5 Kravens, 10 pilhas. 3 coletados = 2 restantes. 7 mineradas = 3 antes, 2 após
      // Chance = 100% porque 2 pilhas restantes <= 2 Kravens restantes
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 3,
        pilhasJaMineradas: 7,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 10 - 7 - 1 = 2 pilhas restantes

      expect(resultado.chanceCalculada).toBe(100); // 2 pilhas <= 2 Kravens = 100%
      expect(resultado.tipo).toBe('Kraven'); // Com 100% de chance, sempre deve ser Kraven
    });

    test('deve calcular pilhas restantes corretamente', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 1,
        pilhasJaMineradas: 4,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request);

      expect(resultado.pilhasRestantes).toBe(5); // 10 - 4 - 1 = 5
    });
  });

  describe('cenários de borda', () => {
    test('deve funcionar com valores mínimos', () => {
      const domain = new MinaKravensDomain(1, 1);
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 0,
        pilhasJaMineradas: 0,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request);

      expect(resultado.chanceCalculada).toBe(0); // 0 pilhas restantes = 0% chance
      expect(resultado.pilhasRestantes).toBe(0);
    });

    test('deve funcionar quando já coletou mais Kravens que necessário', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 10,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // 10 > 5 necessários

      expect(resultado.tipo).toBe('Pedra');
      expect(resultado.questCompleta).toBe(true);
      expect(resultado.kravensColetados).toBe(10);
    });

    test('deve funcionar quando não há pilhas restantes', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 10,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request); // Todas as pilhas foram mineradas

      expect(resultado.pilhasRestantes).toBe(-1);
      expect(resultado.chanceCalculada).toBe(0);
    });
  });

  describe('integração - fluxo completo de mineração', () => {
    test('deve simular uma quest completa', () => {
      const testDomain = new MinaKravensDomain(3, 5);
      jest.spyOn(testDomain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Sempre favorece Kraven
      let kravensColetados = 0;
      let pilhasJaMineradas = 0;
      const resultados = [];

      // Simula mineração até completar a quest
      while (kravensColetados < 3 && pilhasJaMineradas < 5) {
        const request = new MineracaoRequestDTO({
          kravensJaColetados: kravensColetados,
          pilhasJaMineradas: pilhasJaMineradas,
          rachaduraJaAtivada: false,
        });
        const resultado = testDomain.executarMineracao(request);
        resultados.push(resultado);

        kravensColetados = resultado.kravensColetados;
        pilhasJaMineradas++;
      }

      // Verifica que a quest foi completada
      const ultimoResultado = resultados[resultados.length - 1];
      expect(ultimoResultado.questCompleta).toBe(true);
      expect(ultimoResultado.kravensColetados).toBe(3);

      // Verifica que houve ativação de rachadura no penúltimo Kraven
      const resultadosComKraven = resultados.filter(r => r.tipo === 'Kraven');
      if (resultadosComKraven.length >= 2) {
        const penultimoKraven = resultadosComKraven[resultadosComKraven.length - 2];
        expect(penultimoKraven.deveAtivarRachadura).toBe(true);
      }
    });

    test('deve simular mineração com má sorte (apenas pedras)', () => {
      const testDomain = new MinaKravensDomain(2, 5); // 2 Kravens, 5 pilhas para ter mais margem
      jest.spyOn(testDomain, '_gerarNumeroAleatorio').mockReturnValue(0.9); // Nunca favorece Kraven exceto em 100%

      // Primeira mineração - deve dar pedra (2 Kravens restantes / 4 pilhas restantes = 50%)
      const request1 = new MineracaoRequestDTO({
        kravensJaColetados: 0,
        pilhasJaMineradas: 0,
        rachaduraJaAtivada: false,
      });
      const resultado1 = testDomain.executarMineracao(request1);
      expect(resultado1.tipo).toBe('Pedra');
      expect(resultado1.kravensColetados).toBe(0);

      // Segunda mineração - deve dar pedra (2 Kravens restantes / 3 pilhas restantes = 66.67%)
      const request2 = new MineracaoRequestDTO({
        kravensJaColetados: 0,
        pilhasJaMineradas: 1,
        rachaduraJaAtivada: false,
      });
      const resultado2 = testDomain.executarMineracao(request2);
      expect(resultado2.tipo).toBe('Pedra');
      expect(resultado2.kravensColetados).toBe(0);

      // Terceira mineração - deve dar Kraven (2 Kravens restantes / 2 pilhas restantes = 100%)
      const request3 = new MineracaoRequestDTO({
        kravensJaColetados: 0,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });
      const resultado3 = testDomain.executarMineracao(request3);
      expect(resultado3.chanceCalculada).toBe(100); // Garantia de drop na última chance
    });
  });

  describe('testes de chance estatística', () => {
    test('deve calcular chance corretamente em diferentes cenários', () => {
      const testCases = [
        { kravensColetados: 0, pilhasRestantes: 10, expectedChance: 50 }, // 5/10 * 100 = 50%
        { kravensColetados: 1, pilhasRestantes: 8, expectedChance: 50 }, // 4/8 * 100 = 50%
        { kravensColetados: 2, pilhasRestantes: 6, expectedChance: 50 }, // 3/6 * 100 = 50%
        { kravensColetados: 3, pilhasRestantes: 4, expectedChance: 50 }, // 2/4 * 100 = 50%
        { kravensColetados: 4, pilhasRestantes: 2, expectedChance: 50 }, // 1/2 * 100 = 50%
        { kravensColetados: 2, pilhasRestantes: 3, expectedChance: 100 }, // 3/3 * 100 = 100%
        { kravensColetados: 3, pilhasRestantes: 2, expectedChance: 100 }, // 2/2 * 100 = 100%
        { kravensColetados: 4, pilhasRestantes: 1, expectedChance: 100 }, // 1/1 * 100 = 100%
      ];

      testCases.forEach(({ kravensColetados, pilhasRestantes, expectedChance }) => {
        const chance = domain.calcularChanceKraven(kravensColetados, pilhasRestantes);
        expect(chance).toBe(expectedChance);
      });
    });
  });

  describe('testes de propriedades de saída', () => {
    test('deve retornar todas as propriedades esperadas na mineração', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request);

      expect(resultado).toHaveProperty('tipo');
      expect(resultado).toHaveProperty('questCompleta');
      expect(resultado).toHaveProperty('deveAtivarRachadura');
      expect(resultado).toHaveProperty('pilhasRestantes');
      expect(resultado).toHaveProperty('kravensColetados');
      expect(resultado).toHaveProperty('chanceCalculada');

      // Verifica tipos
      expect(typeof resultado.tipo).toBe('string');
      expect(typeof resultado.questCompleta).toBe('boolean');
      expect(typeof resultado.deveAtivarRachadura).toBe('boolean');
      expect(typeof resultado.pilhasRestantes).toBe('number');
      expect(typeof resultado.kravensColetados).toBe('number');
      expect(typeof resultado.chanceCalculada).toBe('number');

      // Verifica valores válidos
      expect(['Kraven', 'Pedra']).toContain(resultado.tipo);
    });

    test('deve retornar propriedades corretas quando quest completa', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 5,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });

      const resultado = domain.executarMineracao(request);

      expect(resultado).toHaveProperty('tipo');
      expect(resultado).toHaveProperty('questCompleta');
      expect(resultado).toHaveProperty('pilhasRestantes');
      expect(resultado).toHaveProperty('kravensColetados');

      // Quest completa não deve ter propriedades de ativação
      expect(resultado.questCompleta).toBe(true);
      expect(resultado.tipo).toBe('Pedra');
    });
  });

  describe('testes de consistência matemática', () => {
    test('deve manter consistência: kravensColetados + kravensRestantes = totalKravensNecessarios', () => {
      for (let kravensColetados = 0; kravensColetados < 5; kravensColetados++) {
        const kravensRestantes = domain.totalKravensNecessarios - kravensColetados;
        expect(kravensColetados + kravensRestantes).toBe(domain.totalKravensNecessarios);
      }
    });

    test('deve manter consistência: pilhasJaMineradas + pilhasRestantes = totalPilhasDisponiveis', () => {
      for (let pilhasJaMineradas = 0; pilhasJaMineradas <= 10; pilhasJaMineradas++) {
        const request = new MineracaoRequestDTO({
          kravensJaColetados: 0,
          pilhasJaMineradas: pilhasJaMineradas,
          rachaduraJaAtivada: false,
        });
        const resultado = domain.executarMineracao(request);
        const pilhasRestantes = resultado.pilhasRestantes;
        expect(pilhasJaMineradas + 1 + pilhasRestantes).toBe(domain.totalPilhasDisponiveis);
      }
    });
  });

  describe('testes de diferentes configurações de domínio', () => {
    test('deve funcionar com configuração pequena (1 Kraven, 1 Pilha)', () => {
      const domain = new MinaKravensDomain(1, 1);
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 0,
        pilhasJaMineradas: 0,
        rachaduraJaAtivada: false,
      });
      const resultado = domain.executarMineracao(request);

      expect(resultado.chanceCalculada).toBe(0); // 0 pilhas restantes = 0% chance
      expect(resultado.pilhasRestantes).toBe(0);
    });

    test('deve funcionar com configuração grande (10 Kravens, 20 Pilhas)', () => {
      const domain = new MinaKravensDomain(10, 20);
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 3,
        pilhasJaMineradas: 5,
        rachaduraJaAtivada: false,
      });
      const resultado = domain.executarMineracao(request);

      expect(resultado.chanceCalculada).toBe(50); // 7 restantes / 14 pilhas após = 50%
      expect(resultado.pilhasRestantes).toBe(14);
    });
  });

  describe('testes de comportamento probabilístico', () => {
    test('deve distribuir resultados de acordo com a probabilidade', () => {
      // Teste estatístico com muitas execuções
      const testDomain = new MinaKravensDomain(1, 100); // 1 Kraven necessário, 100 pilhas
      let kravensObtidos = 0;
      const totalTestes = 1000;

      // Fixa o estado inicial
      const kravensJaColetados = 0;
      const pilhasJaMineradas = 50; // 49 pilhas restantes após mineração

      // Calcula chance esperada: 1/49 * 100 ≈ 2.04%
      const chanceEsperada = testDomain.calcularChanceKraven(kravensJaColetados, 49);

      // Simula muitas minerações com _gerarNumeroAleatorio real (não mockado)
      jest.restoreAllMocks(); // Remove qualquer mock anterior

      for (let i = 0; i < totalTestes; i++) {
        const request = new MineracaoRequestDTO({
          kravensJaColetados: kravensJaColetados,
          pilhasJaMineradas: pilhasJaMineradas,
          rachaduraJaAtivada: false,
        });
        const resultado = testDomain.executarMineracao(request);
        if (resultado.tipo === 'Kraven') {
          kravensObtidos++;
        }
      }

      const porcentagemObtida = (kravensObtidos / totalTestes) * 100;

      // Aceita uma margem de erro ampla para o teste estatístico
      // Com 1000 iterações em uma probabilidade baixa (~2%), a variância estatística normal
      // pode causar flutuações significativas. Testamos se o resultado está dentro de um range razoável (0.5% a 4%)
      expect(porcentagemObtida).toBeGreaterThanOrEqual(0.5);
      expect(porcentagemObtida).toBeLessThanOrEqual(4.0);

      // Alternativamente, podemos verificar se está dentro de uma faixa de 3 desvios padrão
      const expectedStdDev = (Math.sqrt(totalTestes * (chanceEsperada / 100) * (1 - chanceEsperada / 100)) / totalTestes) * 100;
      const margin = 3 * expectedStdDev; // 3 desvios padrão (~99.7% dos casos)
      expect(porcentagemObtida).toBeGreaterThanOrEqual(Math.max(0, chanceEsperada - margin));
      expect(porcentagemObtida).toBeLessThanOrEqual(chanceEsperada + margin);
    });
  });

  describe('cenários específicos da rachadura', () => {
    test('ativou rachadura e a próxima pilha foi Kraven (deve completar a missão)', () => {
      const testDomain = new MinaKravensDomain(3, 5); // 3 Kravens necessários, 5 pilhas
      jest.spyOn(testDomain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Força obtenção de Kraven

      // Simula até ativar rachadura (2 Kravens coletados = falta 1)
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });
      const resultado = testDomain.executarMineracao(request); // 2 coletados, 2 pilhas já mineradas

      expect(resultado.tipo).toBe('Kraven');
      expect(resultado.questCompleta).toBe(true); // Deve completar a missão
      expect(resultado.deveAtivarRachadura).toBe(false); // Quest completa, não ativa rachadura
      expect(resultado.kravensColetados).toBe(3); // 2 + 1 = 3 (todos coletados)
    });

    test('ativou rachadura e a próxima pilha foi pedra comum (não completa a missão e atualiza %)', () => {
      const testDomain = new MinaKravensDomain(3, 6); // 3 Kravens necessários, 6 pilhas
      jest.spyOn(testDomain, '_gerarNumeroAleatorio').mockReturnValue(0.9); // Força obtenção de Pedra

      // Simula situação onde já havia rachadura ativada (2 Kravens coletados = falta 1)
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });
      const resultado = testDomain.executarMineracao(request); // 2 coletados, 3 pilhas já mineradas

      expect(resultado.tipo).toBe('Pedra');
      expect(resultado.questCompleta).toBe(false); // Não deve completar a missão
      expect(resultado.deveAtivarRachadura).toBe(true); // Ainda tem rachadura (2 coletados = falta 1)
      expect(resultado.kravensColetados).toBe(2); // Continua com 2
      expect(resultado.pilhasRestantes).toBe(2); // 6 - 3 - 1 = 2
      expect(resultado.chanceCalculada).toBe(50); // (1 Kraven restante / 2 pilhas restantes) * 100 = 50%
    });

    test('ativou rachadura e a próxima pilha é a última pilha (100% de chance de vir Kraven)', () => {
      // Não mocka _gerarNumeroAleatorio para testar se a chance de 100% funciona naturalmente
      const testDomain = new MinaKravensDomain(2, 4); // 2 Kravens necessários, 4 pilhas
      jest.restoreAllMocks();

      // Simula até a penúltima pilha com rachadura ativada (1 Kraven coletado = falta 1)
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 1,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });
      const resultado = testDomain.executarMineracao(request); // 1 coletado, 2 pilhas já mineradas (sobram 2 pilhas, após mineração sobra 1)

      expect(resultado.chanceCalculada).toBe(100); // 1 Kraven restante / 1 pilha restante = 100% de chance
      expect(resultado.tipo).toBe('Kraven'); // Deve ser Kraven devido à chance de 100%
      expect(resultado.questCompleta).toBe(true); // Deve completar a missão
      expect(resultado.deveAtivarRachadura).toBe(false); // Quest completa, não ativa rachadura
      expect(resultado.kravensColetados).toBe(2); // 1 + 1 = 2 (todos coletados)
      expect(resultado.pilhasRestantes).toBe(1); // 4 - 2 - 1 = 1 (sobra 1 pilha)
    });
  });

  describe('interface com DTOs', () => {
    test('deve aceitar MineracaoRequestDTO e retornar MineracaoResponseDTO', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Força Kraven

      const response = domain.executarMineracao(request);

      // Verifica que retornou um DTO
      expect(response).toBeInstanceOf(MineracaoResponseDTO);
      expect(response.isValid()).toBe(true);

      // Verifica propriedades usando métodos do DTO
      expect(response.isKraven()).toBe(true);
      expect(response.isPedra()).toBe(false);
      expect(response.isQuestComplete()).toBe(false);
      expect(response.shouldActivateCrack()).toBe(false);

      // Verifica stats
      const stats = response.getStats();
      expect(stats.kravensColetados).toBe(3);
      expect(stats.pilhasRestantes).toBe(6);
      expect(stats.chanceCalculada).toBe(50);
    });

    test('deve rejeitar parâmetros que não são MineracaoRequestDTO', () => {
      expect(() => {
        domain.executarMineracao({ kravensJaColetados: 2, pilhasJaMineradas: 3 });
      }).toThrow('Request deve ser uma instância de MineracaoRequestDTO');

      expect(() => {
        domain.executarMineracao(null);
      }).toThrow('Request deve ser uma instância de MineracaoRequestDTO');

      expect(() => {
        domain.executarMineracao('invalid');
      }).toThrow('Request deve ser uma instância de MineracaoRequestDTO');
    });

    test('deve criar response DTO com métodos de conveniência', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 4,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: false,
      });

      jest.spyOn(domain, '_gerarNumeroAleatorio').mockReturnValue(0.1); // Força Kraven

      const response = domain.executarMineracao(request);

      // Testa métodos de conveniência
      expect(response.isKraven()).toBe(true);
      expect(response.isQuestComplete()).toBe(true);
      expect(response.shouldActivateCrack()).toBe(false); // Quest completa, não ativa rachadura

      // Testa serialização
      const plainObject = response.toPlainObject();
      expect(plainObject.tipo).toBe('Kraven');
      expect(plainObject.questCompleta).toBe(true);

      // Testa reconstrução a partir de objeto simples
      const recreated = MineracaoResponseDTO.fromPlainObject(plainObject);
      expect(recreated.isKraven()).toBe(true);
      expect(recreated.isQuestComplete()).toBe(true);
    });

    test('deve criar response apropriada para quest completa', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 5, // Quest já completa
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      const response = domain.executarMineracao(request);

      expect(response.isPedra()).toBe(true);
      expect(response.isQuestComplete()).toBe(true);
      expect(response.shouldActivateCrack()).toBe(false);
      expect(response.getStats().chanceCalculada).toBe(0);
    });

    test('deve funcionar com rachadura já ativada', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 3,
        pilhasJaMineradas: 2,
        rachaduraJaAtivada: true, // Rachadura ativada = 100% chance
      });

      // Não precisa mockar _gerarNumeroAleatorio pois rachadura força 100%
      const response = domain.executarMineracao(request);

      expect(response.isKraven()).toBe(true); // Com rachadura sempre deve ser Kraven
      expect(response.getStats().chanceCalculada).toBe(100);
    });
  });

  describe('DTOs - validação de entrada e saída', () => {
    test('MineracaoRequestDTO deve validar dados de entrada', () => {
      expect(() => {
        new MineracaoRequestDTO({
          kravensJaColetados: -1,
          pilhasJaMineradas: 3,
          rachaduraJaAtivada: false,
        });
      }).toThrow('kravensJaColetados deve ser um número não negativo');

      expect(() => {
        new MineracaoRequestDTO({
          kravensJaColetados: 2,
          pilhasJaMineradas: -1,
          rachaduraJaAtivada: false,
        });
      }).toThrow('pilhasJaMineradas deve ser um número não negativo');

      expect(() => {
        new MineracaoRequestDTO({
          kravensJaColetados: 2,
          pilhasJaMineradas: 3,
          rachaduraJaAtivada: 'invalid',
        });
      }).toThrow('rachaduraJaAtivada deve ser um boolean');
    });

    test('MineracaoResponseDTO deve validar dados de saída', () => {
      expect(() => {
        new MineracaoResponseDTO({
          tipo: 'Invalid',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 5,
          kravensColetados: 2,
          chanceCalculada: 50,
        });
      }).toThrow('tipo deve ser "Kraven" ou "Pedra"');

      expect(() => {
        new MineracaoResponseDTO({
          tipo: 'Kraven',
          questCompleta: 'invalid',
          deveAtivarRachadura: false,
          pilhasRestantes: 5,
          kravensColetados: 2,
          chanceCalculada: 50,
        });
      }).toThrow('questCompleta deve ser um boolean');

      expect(() => {
        new MineracaoResponseDTO({
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 5,
          kravensColetados: -1,
          chanceCalculada: 50,
        });
      }).toThrow('kravensColetados deve ser um número não negativo');

      expect(() => {
        new MineracaoResponseDTO({
          tipo: 'Kraven',
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: 5,
          kravensColetados: 2,
          chanceCalculada: 150,
        });
      }).toThrow('chanceCalculada deve ser um número entre 0 e 100');
    });

    test('DTOs devem ter métodos utilitários funcionais', () => {
      const request = new MineracaoRequestDTO({
        kravensJaColetados: 2,
        pilhasJaMineradas: 3,
        rachaduraJaAtivada: false,
      });

      expect(request.isValid()).toBe(true);

      const plainRequest = request.toPlainObject();
      expect(plainRequest.kravensJaColetados).toBe(2);

      const recreatedRequest = MineracaoRequestDTO.fromPlainObject(plainRequest);
      expect(recreatedRequest.kravensJaColetados).toBe(2);
      expect(recreatedRequest.isValid()).toBe(true);

      // Test response static factories
      const kravenResponse = MineracaoResponseDTO.createKravenResponse({
        questCompleta: false,
        deveAtivarRachadura: true,
        pilhasRestantes: 5,
        kravensColetados: 4,
        chanceCalculada: 75,
      });

      expect(kravenResponse.isKraven()).toBe(true);
      expect(kravenResponse.shouldActivateCrack()).toBe(true);

      const pedraResponse = MineracaoResponseDTO.createPedraResponse({
        questCompleta: false,
        deveAtivarRachadura: false,
        pilhasRestantes: 5,
        kravensColetados: 3,
        chanceCalculada: 25,
      });

      expect(pedraResponse.isPedra()).toBe(true);
      expect(pedraResponse.shouldActivateCrack()).toBe(false);
    });
  });
});
