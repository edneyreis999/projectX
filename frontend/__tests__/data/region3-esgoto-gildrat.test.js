/**
 * Region 3: Esgoto de Gildrat (Lv 10-15) - Enemy Database Tests
 *
 * Validates the implementation of toxic sewer creatures:
 * - Separator at ID 23
 * - Regular enemies (IDs 24-27) with standard stat formulas
 * - Boss enemy (ID 28) with +50% multiplier
 * - Empty expansion slots (IDs 29-33)
 */

const fs = require('fs');
const path = require('path');

describe('Region 3: Esgoto de Gildrat (Lv 10-15)', () => {
  let enemies;

  beforeAll(() => {
    const enemiesPath = path.join(__dirname, '../../data/Enemies.json');
    const data = fs.readFileSync(enemiesPath, 'utf8');
    enemies = JSON.parse(data);
  });

  describe('JSON Structure Validation', () => {
    test('should have valid JSON structure', () => {
      expect(enemies).toBeInstanceOf(Array);
      expect(enemies.length).toBeGreaterThanOrEqual(33);
    });

    test('should have null at index 0 (RPG Maker MZ placeholder)', () => {
      expect(enemies[0]).toBeNull();
    });
  });

  describe('Region Separator (ID 23)', () => {
    test('should have separator at ID 23 with correct name', () => {
      const separator = enemies[23];
      expect(separator).toBeDefined();
      expect(separator.id).toBe(23);
      expect(separator.name).toBe('=== ESGOTO DE GILDRAT ===');
    });

    test('separator should have minimal stats (HP=1)', () => {
      const separator = enemies[23];
      expect(separator.params[0]).toBe(1); // HP
      expect(separator.exp).toBe(0);
      expect(separator.gold).toBe(0);
    });

    test('separator should have empty battlerName', () => {
      const separator = enemies[23];
      expect(separator.battlerName).toBe('');
    });
  });

  describe('Enemy Stat Formulas', () => {
    const calculateHP = (level) => 50 + (level * 20);
    const calculateStat = (level) => 10 + (level * 2);
    const calculateGold = (level) => level * 5;
    const calculateExp = (level) => level * 8;

    test('ID 24: Rato de Esgoto (Lv10) - standard stats', () => {
      const enemy = enemies[24];
      const level = 10;

      expect(enemy.id).toBe(24);
      expect(enemy.name).toBe('Rato de Esgoto');
      expect(enemy.battlerName).toBe('Rato_de_Esgoto');

      // Stats validation
      expect(enemy.params[0]).toBe(calculateHP(level)); // HP = 250
      expect(enemy.params[1]).toBe(0); // MP = 0
      expect(enemy.params[2]).toBe(calculateStat(level)); // ATK = 30
      expect(enemy.params[3]).toBe(calculateStat(level)); // DEF = 30
      expect(enemy.params[4]).toBe(calculateStat(level)); // MATK = 30
      expect(enemy.params[5]).toBe(calculateStat(level)); // MDEF = 30
      expect(enemy.params[6]).toBe(calculateStat(level)); // AGI = 30
      expect(enemy.params[7]).toBe(calculateStat(level)); // LUK = 30

      // Rewards
      expect(enemy.gold).toBe(calculateGold(level)); // 50
      expect(enemy.exp).toBe(calculateExp(level)); // 80
    });

    test('ID 25: Limo Ácido (Lv11) - standard stats', () => {
      const enemy = enemies[25];
      const level = 11;

      expect(enemy.id).toBe(25);
      expect(enemy.name).toBe('Limo Ácido');
      expect(enemy.battlerName).toBe('Limo_Acido');

      // Stats validation
      expect(enemy.params[0]).toBe(calculateHP(level)); // HP = 270
      expect(enemy.params[1]).toBe(0); // MP = 0
      expect(enemy.params[2]).toBe(calculateStat(level)); // ATK = 32
      expect(enemy.params[3]).toBe(calculateStat(level)); // DEF = 32
      expect(enemy.params[4]).toBe(calculateStat(level)); // MATK = 32
      expect(enemy.params[5]).toBe(calculateStat(level)); // MDEF = 32
      expect(enemy.params[6]).toBe(calculateStat(level)); // AGI = 32
      expect(enemy.params[7]).toBe(calculateStat(level)); // LUK = 32

      // Rewards
      expect(enemy.gold).toBe(calculateGold(level)); // 55
      expect(enemy.exp).toBe(calculateExp(level)); // 88
    });

    test('ID 26: Fungo Venenoso Gigante (Lv13) - standard stats', () => {
      const enemy = enemies[26];
      const level = 13;

      expect(enemy.id).toBe(26);
      expect(enemy.name).toBe('Fungo Venenoso Gigante');
      expect(enemy.battlerName).toBe('Fungo_Venenoso_Gigante');

      // Stats validation
      expect(enemy.params[0]).toBe(calculateHP(level)); // HP = 310
      expect(enemy.params[1]).toBe(0); // MP = 0
      expect(enemy.params[2]).toBe(calculateStat(level)); // ATK = 36
      expect(enemy.params[3]).toBe(calculateStat(level)); // DEF = 36
      expect(enemy.params[4]).toBe(calculateStat(level)); // MATK = 36
      expect(enemy.params[5]).toBe(calculateStat(level)); // MDEF = 36
      expect(enemy.params[6]).toBe(calculateStat(level)); // AGI = 36
      expect(enemy.params[7]).toBe(calculateStat(level)); // LUK = 36

      // Rewards
      expect(enemy.gold).toBe(calculateGold(level)); // 65
      expect(enemy.exp).toBe(calculateExp(level)); // 104
    });

    test('ID 27: Gosma Tóxica (Lv13) - standard stats', () => {
      const enemy = enemies[27];
      const level = 13;

      expect(enemy.id).toBe(27);
      expect(enemy.name).toBe('Gosma Tóxica');
      expect(enemy.battlerName).toBe('Gosma_Toxica');

      // Stats validation
      expect(enemy.params[0]).toBe(calculateHP(level)); // HP = 310
      expect(enemy.params[1]).toBe(0); // MP = 0
      expect(enemy.params[2]).toBe(calculateStat(level)); // ATK = 36
      expect(enemy.params[3]).toBe(calculateStat(level)); // DEF = 36
      expect(enemy.params[4]).toBe(calculateStat(level)); // MATK = 36
      expect(enemy.params[5]).toBe(calculateStat(level)); // MDEF = 36
      expect(enemy.params[6]).toBe(calculateStat(level)); // AGI = 36
      expect(enemy.params[7]).toBe(calculateStat(level)); // LUK = 36

      // Rewards
      expect(enemy.gold).toBe(calculateGold(level)); // 65
      expect(enemy.exp).toBe(calculateExp(level)); // 104
    });
  });

  describe('Boss Enemy (ID 28: Pestesporo)', () => {
    test('should have boss stats with +50% multiplier', () => {
      const enemy = enemies[28];
      const level = 15;

      // Boss formulas: stats * 1.5
      const bossHP = (50 + (level * 20)) * 1.5;
      const bossStat = (10 + (level * 2)) * 1.5;

      expect(enemy.id).toBe(28);
      expect(enemy.name).toBe('Pestesporo');
      expect(enemy.battlerName).toBe('Pestesporo');

      // Boss stats validation (all multiplied by 1.5)
      expect(enemy.params[0]).toBe(bossHP); // HP = 525 (not 350)
      expect(enemy.params[1]).toBe(0); // MP = 0
      expect(enemy.params[2]).toBe(bossStat); // ATK = 60 (not 40)
      expect(enemy.params[3]).toBe(bossStat); // DEF = 60
      expect(enemy.params[4]).toBe(bossStat); // MATK = 60
      expect(enemy.params[5]).toBe(bossStat); // MDEF = 60
      expect(enemy.params[6]).toBe(bossStat); // AGI = 60
      expect(enemy.params[7]).toBe(bossStat); // LUK = 60

      // Rewards (standard formula, no multiplier)
      expect(enemy.gold).toBe(level * 5); // 75
      expect(enemy.exp).toBe(level * 8); // 120
    });

    test('boss stats should NOT be standard (verify +50% multiplier is applied)', () => {
      const enemy = enemies[28];
      const level = 15;

      const standardHP = 50 + (level * 20); // 350
      const standardStat = 10 + (level * 2); // 40

      // Verify boss stats are NOT standard values
      expect(enemy.params[0]).not.toBe(standardHP);
      expect(enemy.params[2]).not.toBe(standardStat);

      // Verify they are exactly 1.5x
      expect(enemy.params[0]).toBe(standardHP * 1.5);
      expect(enemy.params[2]).toBe(standardStat * 1.5);
    });
  });

  describe('Common Enemy Properties', () => {
    const regionEnemyIds = [24, 25, 26, 27, 28];

    test.each(regionEnemyIds)('ID %i should have basic attack (skillId: 1)', (id) => {
      const enemy = enemies[id];
      expect(enemy.actions).toHaveLength(1);
      expect(enemy.actions[0].skillId).toBe(1);
      expect(enemy.actions[0].rating).toBe(5);
    });

    test.each(regionEnemyIds)('ID %i should have MP = 0', (id) => {
      const enemy = enemies[id];
      expect(enemy.params[1]).toBe(0);
    });

    test.each(regionEnemyIds)('ID %i should have empty dropItems', (id) => {
      const enemy = enemies[id];
      expect(enemy.dropItems).toHaveLength(1);
      expect(enemy.dropItems[0].dataId).toBe(0);
      expect(enemy.dropItems[0].kind).toBe(0);
    });

    test.each(regionEnemyIds)('ID %i should have empty traits array', (id) => {
      const enemy = enemies[id];
      expect(enemy.traits).toEqual([]);
    });

    test.each(regionEnemyIds)('ID %i should have battlerName matching enemy name pattern', (id) => {
      const enemy = enemies[id];
      expect(enemy.battlerName).toBeTruthy();
      expect(enemy.battlerName).toMatch(/^[A-Z]/);
    });
  });

  describe('Empty Expansion Slots (IDs 29-33)', () => {
    const emptySlotIds = [29, 30, 31, 32, 33];

    test.each(emptySlotIds)('ID %i should be empty slot with HP=1', (id) => {
      const slot = enemies[id];
      expect(slot).toBeDefined();
      expect(slot.id).toBe(id);
      expect(slot.name).toBe('');
      expect(slot.params[0]).toBe(1); // HP = 1
    });

    test.each(emptySlotIds)('ID %i should have zero rewards', (id) => {
      const slot = enemies[id];
      expect(slot.exp).toBe(0);
      expect(slot.gold).toBe(0);
    });

    test.each(emptySlotIds)('ID %i should have empty battlerName', (id) => {
      const slot = enemies[id];
      expect(slot.battlerName).toBe('');
    });
  });

  describe('Reward Calculation Validation', () => {
    test('all enemies should follow reward formulas', () => {
      const testCases = [
        { id: 24, level: 10, expectedGold: 50, expectedExp: 80 },
        { id: 25, level: 11, expectedGold: 55, expectedExp: 88 },
        { id: 26, level: 13, expectedGold: 65, expectedExp: 104 },
        { id: 27, level: 13, expectedGold: 65, expectedExp: 104 },
        { id: 28, level: 15, expectedGold: 75, expectedExp: 120 },
      ];

      testCases.forEach(({ id, level, expectedGold, expectedExp }) => {
        const enemy = enemies[id];
        expect(enemy.gold).toBe(expectedGold);
        expect(enemy.exp).toBe(expectedExp);
      });
    });
  });

  describe('Edge Cases and Data Integrity', () => {
    test('all region 3 enemies should have valid RPG Maker MZ structure', () => {
      const regionIds = [23, 24, 25, 26, 27, 28];

      regionIds.forEach(id => {
        const enemy = enemies[id];
        expect(enemy).toHaveProperty('id');
        expect(enemy).toHaveProperty('name');
        expect(enemy).toHaveProperty('battlerName');
        expect(enemy).toHaveProperty('battlerHue');
        expect(enemy).toHaveProperty('exp');
        expect(enemy).toHaveProperty('gold');
        expect(enemy).toHaveProperty('params');
        expect(enemy).toHaveProperty('actions');
        expect(enemy).toHaveProperty('traits');
        expect(enemy).toHaveProperty('dropItems');
        expect(enemy).toHaveProperty('note');
      });
    });

    test('params array should always have 8 elements', () => {
      const regionIds = [24, 25, 26, 27, 28];

      regionIds.forEach(id => {
        const enemy = enemies[id];
        expect(enemy.params).toHaveLength(8);
      });
    });

    test('battlerHue should be 0 for all enemies', () => {
      const regionIds = [24, 25, 26, 27, 28];

      regionIds.forEach(id => {
        const enemy = enemies[id];
        expect(enemy.battlerHue).toBe(0);
      });
    });
  });

  describe('Test Coverage Summary', () => {
    test('all required deliverables are present', () => {
      // Separator
      expect(enemies[23].name).toBe('=== ESGOTO DE GILDRAT ===');

      // Regular enemies
      expect(enemies[24].name).toBe('Rato de Esgoto');
      expect(enemies[25].name).toBe('Limo Ácido');
      expect(enemies[26].name).toBe('Fungo Venenoso Gigante');
      expect(enemies[27].name).toBe('Gosma Tóxica');

      // Boss
      expect(enemies[28].name).toBe('Pestesporo');

      // Empty slots
      [29, 30, 31, 32, 33].forEach(id => {
        expect(enemies[id].name).toBe('');
        expect(enemies[id].params[0]).toBe(1);
      });
    });
  });
});
