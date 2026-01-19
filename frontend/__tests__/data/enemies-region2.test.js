/**
 * Unit tests for Region 2: Minas de Kravens enemies
 * Tests stat calculation formulas for levels 5-10 and boss multiplier
 */

const fs = require('fs');
const path = require('path');

describe('Region 2: Minas de Kravens Enemies', () => {
  let enemiesData;

  beforeAll(() => {
    const enemiesPath = path.join(__dirname, '../../data/Enemies.json');
    const rawData = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(rawData);
  });

  describe('Region Separator', () => {
    test('should have region separator at ID 12', () => {
      const separator = enemiesData[12];
      expect(separator).toBeDefined();
      expect(separator.id).toBe(12);
      expect(separator.name).toBe('=== MINAS DE KRAVENS ===');
      expect(separator.battlerName).toBe('');
      expect(separator.params[0]).toBe(1);
    });
  });

  describe('Morcego de Caverna (ID 13, Lv 5)', () => {
    let enemy;

    beforeAll(() => {
      enemy = enemiesData[13];
    });

    test('should have correct basic properties', () => {
      expect(enemy).toBeDefined();
      expect(enemy.id).toBe(13);
      expect(enemy.name).toBe('Morcego de Caverna');
      expect(enemy.battlerName).toBe('Morcego_de_Caverna');
    });

    test('should have correct HP (50 + 5×20 = 150)', () => {
      expect(enemy.params[0]).toBe(150);
    });

    test('should have correct MP (0)', () => {
      expect(enemy.params[1]).toBe(0);
    });

    test('should have correct ATK (10 + 5×2 = 20)', () => {
      expect(enemy.params[2]).toBe(20);
    });

    test('should have correct DEF (10 + 5×2 = 20)', () => {
      expect(enemy.params[3]).toBe(20);
    });

    test('should have correct MATK (10 + 5×2 = 20)', () => {
      expect(enemy.params[4]).toBe(20);
    });

    test('should have correct MDEF (10 + 5×2 = 20)', () => {
      expect(enemy.params[5]).toBe(20);
    });

    test('should have correct AGI (10 + 5×2 = 20)', () => {
      expect(enemy.params[6]).toBe(20);
    });

    test('should have correct LUK (10 + 5×2 = 20)', () => {
      expect(enemy.params[7]).toBe(20);
    });

    test('should have correct gold reward (5×5 = 25)', () => {
      expect(enemy.gold).toBe(25);
    });

    test('should have correct EXP reward (5×8 = 40)', () => {
      expect(enemy.exp).toBe(40);
    });

    test('should have basic attack action', () => {
      expect(enemy.actions).toHaveLength(1);
      expect(enemy.actions[0].skillId).toBe(1);
    });
  });

  describe('Aranha Mineira (ID 14, Lv 6)', () => {
    let enemy;

    beforeAll(() => {
      enemy = enemiesData[14];
    });

    test('should have correct basic properties', () => {
      expect(enemy).toBeDefined();
      expect(enemy.id).toBe(14);
      expect(enemy.name).toBe('Aranha Mineira');
      expect(enemy.battlerName).toBe('Aranha_Mineira');
    });

    test('should have correct HP (50 + 6×20 = 170)', () => {
      expect(enemy.params[0]).toBe(170);
    });

    test('should have correct stats (10 + 6×2 = 22)', () => {
      expect(enemy.params[2]).toBe(22); // ATK
      expect(enemy.params[3]).toBe(22); // DEF
      expect(enemy.params[4]).toBe(22); // MATK
      expect(enemy.params[5]).toBe(22); // MDEF
      expect(enemy.params[6]).toBe(22); // AGI
      expect(enemy.params[7]).toBe(22); // LUK
    });

    test('should have correct gold reward (6×5 = 30)', () => {
      expect(enemy.gold).toBe(30);
    });

    test('should have correct EXP reward (6×8 = 48)', () => {
      expect(enemy.exp).toBe(48);
    });
  });

  describe('Aranha Gigante (ID 15, Lv 8)', () => {
    let enemy;

    beforeAll(() => {
      enemy = enemiesData[15];
    });

    test('should have correct basic properties', () => {
      expect(enemy).toBeDefined();
      expect(enemy.id).toBe(15);
      expect(enemy.name).toBe('Aranha Gigante');
      expect(enemy.battlerName).toBe('Aranha_Gigante');
    });

    test('should have correct HP (50 + 8×20 = 210)', () => {
      expect(enemy.params[0]).toBe(210);
    });

    test('should have correct stats (10 + 8×2 = 26)', () => {
      expect(enemy.params[2]).toBe(26); // ATK
      expect(enemy.params[3]).toBe(26); // DEF
      expect(enemy.params[4]).toBe(26); // MATK
      expect(enemy.params[5]).toBe(26); // MDEF
      expect(enemy.params[6]).toBe(26); // AGI
      expect(enemy.params[7]).toBe(26); // LUK
    });

    test('should have correct gold reward (8×5 = 40)', () => {
      expect(enemy.gold).toBe(40);
    });

    test('should have correct EXP reward (8×8 = 64)', () => {
      expect(enemy.exp).toBe(64);
    });
  });

  describe('Rato Gigante Mutante (ID 16, Lv 8)', () => {
    let enemy;

    beforeAll(() => {
      enemy = enemiesData[16];
    });

    test('should have correct basic properties', () => {
      expect(enemy).toBeDefined();
      expect(enemy.id).toBe(16);
      expect(enemy.name).toBe('Rato Gigante Mutante');
      expect(enemy.battlerName).toBe('Rato_Gigante_Mutante');
    });

    test('should have correct HP (50 + 8×20 = 210)', () => {
      expect(enemy.params[0]).toBe(210);
    });

    test('should have correct stats (10 + 8×2 = 26)', () => {
      expect(enemy.params[2]).toBe(26); // ATK
      expect(enemy.params[3]).toBe(26); // DEF
      expect(enemy.params[4]).toBe(26); // MATK
      expect(enemy.params[5]).toBe(26); // MDEF
      expect(enemy.params[6]).toBe(26); // AGI
      expect(enemy.params[7]).toBe(26); // LUK
    });

    test('should have correct gold reward (8×5 = 40)', () => {
      expect(enemy.gold).toBe(40);
    });

    test('should have correct EXP reward (8×8 = 64)', () => {
      expect(enemy.exp).toBe(64);
    });
  });

  describe('Cristaleão Boss (ID 17, Lv 10)', () => {
    let enemy;

    beforeAll(() => {
      enemy = enemiesData[17];
    });

    test('should have correct basic properties', () => {
      expect(enemy).toBeDefined();
      expect(enemy.id).toBe(17);
      expect(enemy.name).toBe('Cristaleão');
      expect(enemy.battlerName).toBe('Cristaleao');
    });

    test('should have correct boss HP ((50 + 10×20) × 1.5 = 375)', () => {
      expect(enemy.params[0]).toBe(375);
    });

    test('should have correct MP (0)', () => {
      expect(enemy.params[1]).toBe(0);
    });

    test('should have correct boss ATK ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[2]).toBe(45);
    });

    test('should have correct boss DEF ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[3]).toBe(45);
    });

    test('should have correct boss MATK ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[4]).toBe(45);
    });

    test('should have correct boss MDEF ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[5]).toBe(45);
    });

    test('should have correct boss AGI ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[6]).toBe(45);
    });

    test('should have correct boss LUK ((10 + 10×2) × 1.5 = 45)', () => {
      expect(enemy.params[7]).toBe(45);
    });

    test('should have correct gold reward (10×5 = 50)', () => {
      expect(enemy.gold).toBe(50);
    });

    test('should have correct EXP reward (10×8 = 80)', () => {
      expect(enemy.exp).toBe(80);
    });

    test('should verify boss multiplier applies to all params', () => {
      const baseHP = 50 + 10 * 20; // 250
      const baseStat = 10 + 10 * 2; // 30
      expect(enemy.params[0]).toBe(baseHP * 1.5); // HP
      expect(enemy.params[2]).toBe(baseStat * 1.5); // ATK
      expect(enemy.params[3]).toBe(baseStat * 1.5); // DEF
      expect(enemy.params[4]).toBe(baseStat * 1.5); // MATK
      expect(enemy.params[5]).toBe(baseStat * 1.5); // MDEF
      expect(enemy.params[6]).toBe(baseStat * 1.5); // AGI
      expect(enemy.params[7]).toBe(baseStat * 1.5); // LUK
    });
  });

  describe('Empty Expansion Slots (IDs 18-22)', () => {
    test('should have empty placeholder at ID 18', () => {
      const placeholder = enemiesData[18];
      expect(placeholder).toBeDefined();
      expect(placeholder.id).toBe(18);
      expect(placeholder.name).toBe('');
      expect(placeholder.params[0]).toBe(1);
    });

    test('should have empty placeholder at ID 19', () => {
      const placeholder = enemiesData[19];
      expect(placeholder).toBeDefined();
      expect(placeholder.id).toBe(19);
      expect(placeholder.name).toBe('');
      expect(placeholder.params[0]).toBe(1);
    });

    test('should have empty placeholder at ID 20', () => {
      const placeholder = enemiesData[20];
      expect(placeholder).toBeDefined();
      expect(placeholder.id).toBe(20);
      expect(placeholder.name).toBe('');
      expect(placeholder.params[0]).toBe(1);
    });

    test('should have empty placeholder at ID 21', () => {
      const placeholder = enemiesData[21];
      expect(placeholder).toBeDefined();
      expect(placeholder.id).toBe(21);
      expect(placeholder.name).toBe('');
      expect(placeholder.params[0]).toBe(1);
    });

    test('should have empty placeholder at ID 22', () => {
      const placeholder = enemiesData[22];
      expect(placeholder).toBeDefined();
      expect(placeholder.id).toBe(22);
      expect(placeholder.name).toBe('');
      expect(placeholder.params[0]).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    test('should verify MP remains 0 for all enemies including boss', () => {
      expect(enemiesData[13].params[1]).toBe(0); // Morcego de Caverna
      expect(enemiesData[14].params[1]).toBe(0); // Aranha Mineira
      expect(enemiesData[15].params[1]).toBe(0); // Aranha Gigante
      expect(enemiesData[16].params[1]).toBe(0); // Rato Gigante Mutante
      expect(enemiesData[17].params[1]).toBe(0); // Cristaleão
    });

    test('should verify all enemies have basic attack only', () => {
      for (let id = 13; id <= 17; id++) {
        const enemy = enemiesData[id];
        expect(enemy.actions).toHaveLength(1);
        expect(enemy.actions[0].skillId).toBe(1);
      }
    });

    test('should verify empty slots have placeholder structure', () => {
      for (let id = 18; id <= 22; id++) {
        const placeholder = enemiesData[id];
        expect(placeholder.name).toBe('');
        expect(placeholder.battlerName).toBe('');
        expect(placeholder.params[0]).toBe(1);
        expect(placeholder.exp).toBe(0);
        expect(placeholder.gold).toBe(0);
      }
    });
  });
});
