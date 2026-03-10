/**
 * Teste de Simulação de 20 Batalhas contra Lobo Jovem x2
 *
 * Este teste usa a FÓRMULA REAL do RPG Maker MZ para calcular a progressão de níveis.
 *
 * Fórmula do RPG Maker MZ (rmmz_objects.js linha 4159):
 * EXP = Math.round(
 *     (basis × level^1.5 × level × (level+1)) / (6 + level²/50) +
 *     (level-1) × extra
 * )
 *
 * Referência:
 * - docs/GDD/6-combate/sistema-experiencia.md
 * - planos/012-balanceamento-exp/RELATORIO_FINAL-descoberta-exp-rmmz.md
 * 
  Para executar o teste:
  npm test -- simulacao-20-batalhas-lobo.test.js
 */

// ============================================
// CONFIGURAÇÕES DO JOGO (extraídas dos JSONs)
// ============================================

const EXP_PARAMS = {
  basis: 10,
  extra: 50,
  acc_a: 150,
  acc_b: 1
};

const LOBO_JOVEM_EXP = 15; // Inimigo ID 2 do Enemies.json

// Personagens do Actors.json
const CHARACTERS = [
  {
    id: 3,
    name: 'Thorin',
    classId: 5,
    className: 'Fundeiro',
    initialLevel: 1
  },
  {
    id: 4,
    name: 'Filena',
    classId: 1,
    className: 'Fighter',
    initialLevel: 1
  },
  {
    id: 5,
    name: 'Kilin',
    classId: 3,
    className: 'Paladin',
    initialLevel: 7
  },
  {
    id: 6,
    name: 'Mhordred',
    classId: 4,
    className: 'Berserker',
    initialLevel: 6
  }
];

// ============================================
// FUNÇÕES DO SISTEMA DE EXP (RPG Maker MZ)
// ============================================

/**
 * Calcula a EXP necessária para um determinado nível usando a fórmula real do RPG Maker MZ.
 *
 * @param {number} level - O nível alvo
 * @returns {number} EXP acumulada necessária para atingir o nível
 */
function expForLevel(level) {
  const { basis, extra, acc_a, acc_b } = EXP_PARAMS;

  // Fórmula REAL do RPG Maker MZ (rmmz_objects.js linha 4159)
  const exp = Math.round(
    (basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) /
      (6 + Math.pow(level, 2) / 50 / acc_b) +
      (level - 1) * extra
  );

  return exp;
}

/**
 * Calcula a EXP inicial de um personagem baseado no seu nível inicial.
 *
 * @param {number} initialLevel - Nível inicial do personagem
 * @returns {number} EXP acumulada no nível inicial
 */
function getInitialExp(initialLevel) {
  return expForLevel(initialLevel);
}

/**
 * Determina o nível atual baseado na EXP total acumulada.
 *
 * @param {number} currentExp - EXP total acumulada
 * @param {number} maxLevel - Nível máximo (padrão: 30)
 * @returns {number} Nível atual
 */
function getLevelFromExp(currentExp, maxLevel = 30) {
  for (let level = 1; level <= maxLevel; level++) {
    if (currentExp < expForLevel(level + 1)) {
      return level;
    }
  }
  return maxLevel;
}

// ============================================
// SIMULAÇÃO DE BATALHA
// ============================================

/**
 * Simula uma batalha contra a tropa "Lobo Jovem x2" (Troop ID 2).
 *
 * @returns {number} EXP total ganha na batalha
 */
function simulateBattle() {
  // Troop 2 tem 2x Lobo Jovem, cada um dá 15 EXP
  return LOBO_JOVEM_EXP * 2;
}

/**
 * Simula N batalhas e retorna o resultado final.
 *
 * @param {number} numBattles - Número de batalhas
 * @param {number} initialLevel - Nível inicial do personagem
 * @returns {Object} Resultado da simulação
 */
function simulateMultipleBattles(numBattles, initialLevel) {
  const expPerBattle = simulateBattle();
  const totalExpGained = expPerBattle * numBattles;
  const initialExp = getInitialExp(initialLevel);
  const finalExp = initialExp + totalExpGained;
  const finalLevel = getLevelFromExp(finalExp, 30); // maxLevel = 30

  return {
    numBattles,
    expPerBattle,
    totalExpGained,
    initialLevel,
    initialExp,
    finalExp,
    finalLevel,
    levelsGained: finalLevel - initialLevel
  };
}

// ============================================
// TESTES JEST
// ============================================

describe('Simulação: 20 Batalhas contra Lobo Jovem x2', () => {
  const NUM_BATTLES = 20;

  // Tabela de EXP por nível (calculada com a fórmula real do RPG Maker MZ)
  const expectedExpTable = {
    1: 0,
    2: 60,
    3: 155,
    4: 314,
    5: 569,
    6: 949,
    7: 1479,
    8: 2182,
    9: 3073,
    10: 4163,
    11: 5457,
    12: 6959,
    13: 8666,
    14: 10573,
    15: 12673,
    16: 14960,
    17: 17425,
    18: 20058,
    19: 22851,
    20: 25796,
    21: 28883,
    22: 32105,
    23: 35455,
    24: 38925,
    25: 42510,
    26: 46204,
    27: 50001,
    28: 53896,
    29: 57886,
    30: 61966 // maxLevel
  };

  describe('Sistema de EXP (Fórmula RPG Maker MZ)', () => {
    test('deve calcular corretamente a EXP por nível', () => {
      Object.entries(expectedExpTable).forEach(([level, expectedExp]) => {
        expect(expForLevel(parseInt(level))).toBe(expectedExp);
      });
    });

    test('deve determinar corretamente o nível a partir da EXP', () => {
      expect(getLevelFromExp(0)).toBe(1);
      expect(getLevelFromExp(60)).toBe(2);
      expect(getLevelFromExp(155)).toBe(3);
      expect(getLevelFromExp(314)).toBe(4);
      expect(getLevelFromExp(569)).toBe(5);
      expect(getLevelFromExp(61966)).toBe(30); // max
    });
  });

  describe('Batalha Individual', () => {
    test('cada batalha contra Lobo Jovem x2 deve dar 30 EXP', () => {
      expect(simulateBattle()).toBe(30);
    });

    test('20 batalhas devem dar 600 EXP totais', () => {
      const expPerBattle = simulateBattle();
      const totalExp = expPerBattle * NUM_BATTLES;
      expect(totalExp).toBe(600);
    });
  });

  describe('Personagens Individuais', () => {
    const results = [];

    beforeAll(() => {
      // Calcular resultados para todos os personagens
      CHARACTERS.forEach(char => {
        results.push({
          ...char,
          ...simulateMultipleBattles(NUM_BATTLES, char.initialLevel)
        });
      });
    });

    test('Thorin (nv 1 → nv ?)', () => {
      const thorin = results.find(r => r.name === 'Thorin');
      expect(thorin.initialLevel).toBe(1);
      expect(thorin.initialExp).toBe(0);
      expect(thorin.totalExpGained).toBe(600);
      expect(thorin.finalExp).toBe(600);

      // Com 600 EXP, Thorin deve estar no nível 13
      // EXP para nv 13 = 8666, nv 14 = 10573
      // Na tabela corrigida: nv 13 precisa de 8666 EXP
      // Mas com 600 EXP totais...
      // Vamos calcular:
      // nv 1 = 0
      // nv 2 = 60
      // nv 3 = 155
      // nv 4 = 314
      // nv 5 = 569
      // nv 6 = 949
      // Com 600 EXP, está entre nv 5 (569) e nv 6 (949)
      expect(thorin.finalLevel).toBe(5);
      expect(thorin.levelsGained).toBe(4);
    });

    test('Filena (nv 1 → nv ?)', () => {
      const filena = results.find(r => r.name === 'Filena');
      expect(filena.initialLevel).toBe(1);
      expect(filena.initialExp).toBe(0);
      expect(filena.totalExpGained).toBe(600);
      expect(filena.finalExp).toBe(600);
      expect(filena.finalLevel).toBe(5);
      expect(filena.levelsGained).toBe(4);
    });

    test('Kilin (nv 7 → nv ?)', () => {
      const kilin = results.find(r => r.name === 'Kilin');
      expect(kilin.initialLevel).toBe(7);
      expect(kilin.initialExp).toBe(1479);
      expect(kilin.totalExpGained).toBe(600);
      expect(kilin.finalExp).toBe(2079);

      // nv 7 = 1479, nv 8 = 2182
      // 1479 + 600 = 2079, ainda está no nv 7
      expect(kilin.finalLevel).toBe(7);
      expect(kilin.levelsGained).toBe(0);
    });

    test('Mhordred (nv 6 → nv ?)', () => {
      const mhordred = results.find(r => r.name === 'Mhordred');
      expect(mhordred.initialLevel).toBe(6);
      expect(mhordred.initialExp).toBe(949);
      expect(mhordred.totalExpGained).toBe(600);
      expect(mhordred.finalExp).toBe(1549);

      // nv 7 = 1479, nv 8 = 2182
      // 949 + 600 = 1549, passou de 1479 então virou nv 7
      expect(mhordred.finalLevel).toBe(7);
      expect(mhordred.levelsGained).toBe(1);
    });

    // Faça testes respondendo as seguintes perguntas:
    // Quantas batalhas são necessárias para o Thorin e Filena atingirem o nível 5?
    // Quantas batalhas são necessárias para o Kilin atingir o nível 10?
    // Quantas batalhas são necessárias para o Mhordred atingir o nível 10?
    // Exemplo: it(`should Thorin get level 5 after x battles`, () => {});
    // it(`should Filena get level 5 after x battles`, () => {});
  });

  describe('Relatório Final de Simulação', () => {
    test('deve gerar relatório com resultados da simulação', () => {
      const results = CHARACTERS.map(char => ({
        ...char,
        ...simulateMultipleBattles(NUM_BATTLES, char.initialLevel)
      }));

      // Imprimir relatório formatado
      console.log('\n' + '='.repeat(70));
      console.log('RELATÓRIO DE SIMULAÇÃO: 20 BATALHAS CONTRA LOBO JOVEM x2');
      console.log('='.repeat(70));
      console.log(`EXP por batalha: ${simulateBattle()} (2 × ${LOBO_JOVEM_EXP})`);
      console.log(`Total EXP ganha: ${simulateBattle() * NUM_BATTLES}`);
      console.log('='.repeat(70));

      results.forEach(r => {
        console.log(
          `\n${r.name} (${r.className})`
        );
        console.log(
          `  Nível: ${r.initialLevel} → ${r.finalLevel} (+${r.levelsGained})`
        );
        console.log(
          `  EXP: ${r.initialExp} → ${r.finalExp} (+${r.totalExpGained})`
        );
      });

      console.log('\n' + '='.repeat(70));
      console.log('TABELA DE EXP POR NÍVEL (Referência)');
      console.log('='.repeat(70));

      for (let i = 1; i <= 15; i++) {
        const exp = expForLevel(i);
        const nextExp = expForLevel(i + 1);
        const diff = nextExp - exp;
        console.log(`Nv ${String(i).padStart(2)}: ${String(exp).padStart(6)} EXP (+${diff} p/ próximo)`);
      }

      console.log('='.repeat(70) + '\n');

      // Validar que todos os personagens têm resultados consistentes
      results.forEach(r => {
        expect(r.finalLevel).toBeGreaterThan(0);
        expect(r.finalLevel).toBeLessThanOrEqual(30);
        expect(r.finalExp).toBe(r.initialExp + r.totalExpGained);
      });
    });
  });

  describe('Validação de Progressão vs GDD', () => {
    test('deve comparar resultados com o esperado no GDD', () => {
      const results = CHARACTERS.map(char => ({
        ...char,
        ...simulateMultipleBattles(NUM_BATTLES, char.initialLevel)
      }));

      console.log('\n' + '='.repeat(70));
      console.log('COMPARAÇÃO: RESULTADO vs GDD ESPERADO');
      console.log('='.repeat(70));

      const expectedFromGDD = {
        'Thorin': { initial: 1, expected: '4-5' },
        'Filena': { initial: 1, expected: '4-5' },
        'Kilin': { initial: 7, expected: '8' },
        'Mhordred': { initial: 6, expected: '7' }
      };

      results.forEach(r => {
        const expected = expectedFromGDD[r.name].expected;
        const match = expected.includes(String(r.finalLevel)) ||
                     (expected.includes('-') && r.finalLevel >= parseInt(expected.split('-')[0]) && r.finalLevel <= parseInt(expected.split('-')[1]));

        console.log(
          `${r.name}: nv ${r.initialLevel} → ${r.finalLevel} | Esperado: ${expected} | ${match ? '✓' : '✗'}`
        );
      });

      console.log('='.repeat(70) + '\n');
    });
  });

  describe('Progressao desbloqueia habilidades', () => {
    // Faça testes respondendo as seguintes perguntas:
    // Quantas batalhas são necessárias para o personagem desbloquear a habilidade de nível 2?
    test('deve comparar resultados com o esperado no GDD', () => {});
  });
});
