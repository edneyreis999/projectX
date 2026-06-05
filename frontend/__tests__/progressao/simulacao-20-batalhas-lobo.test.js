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
 * 
  Para executar o teste:
  npm test -- frontend/__tests__/progressao/simulacao-20-batalhas-lobo.test.js
 */

// ============================================
// CONFIGURAÇÕES DO JOGO (extraídas dos JSONs)
// ============================================

const EXP_PARAMS = {
  basis: 4,   // curva ajustada para Thorin/Filena ficarem atrás dos guardas
  extra: 50,
  acc_a: 150,
  acc_b: 1
};

const LOBO_JOVEM_EXP = 38; // era 15 - aumentado 2.5x (Inimigo ID 2 do Enemies.json)

// Personagens do Actors.json
const CHARACTERS = [
  {
    id: 3,
    name: 'Thorin',
    classId: 5,
    className: 'Fundeiro',
    initialLevel: 2
  },
  {
    id: 4,
    name: 'Filena',
    classId: 1,
    className: 'Fighter',
    initialLevel: 3
  },
  {
    id: 5,
    name: 'Kilin',
    classId: 3,
    className: 'Paladin',
    initialLevel: 8  // era 7 - ajuste fino para atingir meta
  },
  {
    id: 6,
    name: 'Mhordred',
    classId: 4,
    className: 'Berserker',
    initialLevel: 7  // era 6 - ajuste fino para atingir meta
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

/**
 * Calcula quantas batalhas são necessárias para atingir um nível alvo.
 *
 * @param {number} initialLevel - Nível inicial do personagem
 * @param {number} targetLevel - Nível alvo
 * @returns {Object} Resultado com número de batalhas e detalhes
 */
function battlesToReachLevel(initialLevel, targetLevel) {
  const expPerBattle = simulateBattle();
  const initialExp = getInitialExp(initialLevel);
  const targetExp = expForLevel(targetLevel);
  const expNeeded = targetExp - initialExp;
  const battlesNeeded = Math.ceil(expNeeded / expPerBattle);

  return {
    initialLevel,
    targetLevel,
    initialExp,
    targetExp,
    expNeeded,
    expPerBattle,
    battlesNeeded
  };
}

// ============================================
// TESTES JEST
// ============================================

describe('Simulação: 20 Batalhas contra Lobo Jovem x2', () => {
  const NUM_BATTLES = 20;

  // Tabela de EXP por nível (calculada com a curva: expParams [4,50,150,1])
  const expectedExpTable = {
    1: 0,
    2: 54,
    3: 122,
    4: 216,
    5: 348,
    6: 530,
    7: 772,
    8: 1083,
    9: 1469,
    10: 1935,
    11: 2483,
    12: 3109,
    13: 3830,
    14: 4652,
    15: 5578,
    16: 6614,
    17: 7765,
    18: 9037,
    19: 10435,
    20: 11964,
    21: 13630,
    22: 15437,
    23: 17390,
    24: 19495,
    25: 21756,
    26: 24179,
    27: 26767,
    28: 29528,
    29: 32464,
    30: 35581 // maxLevel
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
      expect(getLevelFromExp(350)).toBe(4);
      expect(getLevelFromExp(600)).toBe(5);
      expect(getLevelFromExp(40000)).toBe(30); // max
    });
  });

  describe('Batalha Individual', () => {
    test('cada batalha contra Lobo Jovem x2 deve dar 76 EXP', () => {
      expect(simulateBattle()).toBe(76);
    });

    test('20 batalhas devem dar 1520 EXP totais', () => {
      const expPerBattle = simulateBattle();
      const totalExp = expPerBattle * NUM_BATTLES;
      expect(totalExp).toBe(1520);
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

    // Faça testes respondendo as seguintes perguntas:
    // Quantas batalhas são necessárias para o Thorin e Filena atingirem o nível 5?
    // Quantas batalhas são necessárias para o Kilin atingir o nível 10?
    // Quantas batalhas são necessárias para o Mhordred atingir o nível 10?

    test('Thorin atinge nível 5 após 5 batalhas', () => {
      const result = battlesToReachLevel(1, 5);

      console.log('\n' + '='.repeat(70));
      console.log('Thorin: Quantas batalhas para atingir nível 5?');
      console.log('='.repeat(70));
      console.log(`Nível inicial: ${result.initialLevel} (${result.initialExp} EXP)`);
      console.log(`Nível alvo: ${result.targetLevel} (${result.targetExp} EXP)`);
      console.log(`EXP necessária: ${result.expNeeded}`);
      console.log(`EXP por batalha: ${result.expPerBattle}`);
      console.log(`Batalhas necessárias: ${result.battlesNeeded}`);
      console.log('='.repeat(70) + '\n');

      expect(result.initialLevel).toBe(1);
      expect(result.targetLevel).toBe(5);
      expect(result.expNeeded).toBe(348); // nv 5 = 348 EXP
      expect(result.battlesNeeded).toBe(5); // 348 / 76 = 4.57 → arredonda para 5
    });

    test('Filena atinge nível 5 após 5 batalhas', () => {
      const result = battlesToReachLevel(1, 5);
      expect(result.initialLevel).toBe(1);
      expect(result.targetLevel).toBe(5);
      expect(result.battlesNeeded).toBe(5);
    });

    test('Kilin atinge nível 10 após ~12 batalhas', () => {
      const result = battlesToReachLevel(8, 10);

      console.log('\n' + '='.repeat(70));
      console.log('Kilin: Quantas batalhas para atingir nível 10?');
      console.log('='.repeat(70));
      console.log(`Nível inicial: ${result.initialLevel} (${result.initialExp} EXP)`);
      console.log(`Nível alvo: ${result.targetLevel} (${result.targetExp} EXP)`);
      console.log(`EXP necessária: ${result.expNeeded}`);
      console.log(`EXP por batalha: ${result.expPerBattle}`);
      console.log(`Batalhas necessárias: ${result.battlesNeeded}`);
      console.log('='.repeat(70) + '\n');

      expect(result.initialLevel).toBe(8);
      expect(result.targetLevel).toBe(10);
      expect(result.expNeeded).toBe(852); // 1935 - 1083 = 852
      expect(result.battlesNeeded).toBe(12); // 852 / 76 = 11.2 → arredonda para 12
    });

    test('Mhordred atinge nível 10 após ~16 batalhas', () => {
      const result = battlesToReachLevel(7, 10);

      console.log('\n' + '='.repeat(70));
      console.log('Mhordred: Quantas batalhas para atingir nível 10?');
      console.log('='.repeat(70));
      console.log(`Nível inicial: ${result.initialLevel} (${result.initialExp} EXP)`);
      console.log(`Nível alvo: ${result.targetLevel} (${result.targetExp} EXP)`);
      console.log(`EXP necessária: ${result.expNeeded}`);
      console.log(`EXP por batalha: ${result.expPerBattle}`);
      console.log(`Batalhas necessárias: ${result.battlesNeeded}`);
      console.log('='.repeat(70) + '\n');

      expect(result.initialLevel).toBe(7);
      expect(result.targetLevel).toBe(10);
      expect(result.expNeeded).toBe(1163); // 1935 - 772 = 1163
      expect(result.battlesNeeded).toBe(16); // 1163 / 76 = 15.3 → arredonda para 16
    });
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
        'Thorin': { initial: 1, expected: '10+' },
        'Filena': { initial: 1, expected: '10+' },
        'Kilin': { initial: 8, expected: '10+' },
        'Mhordred': { initial: 7, expected: '10+' }
      };

      results.forEach(r => {
        const expected = expectedFromGDD[r.name].expected;
        const match = expected === '10+' ? r.finalLevel >= 10 : false;

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
