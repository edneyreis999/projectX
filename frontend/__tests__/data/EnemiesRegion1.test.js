/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');

describe('Enemies Region 1: Estrada do Cão-Luar', () => {
  let enemies;

  beforeAll(() => {
    const enemiesPath = path.join(
      __dirname,
      '../../data/Enemies.json'
    );
    enemies = JSON.parse(fs.readFileSync(enemiesPath, 'utf8'));
  });

  describe('Region Separator', () => {
    test('ID 1 should be the region separator with correct name', () => {
      expect(enemies[1]).toBeDefined();
      expect(enemies[1].id).toBe(1);
      expect(enemies[1].name).toBe('=== ESTRADA DO CÃO-LUAR ===');
    });
  });

  describe('Enemy Stats Formulas', () => {
    const testCases = [
      { id: 2, name: 'Lobo Jovem', level: 1, isBoss: false },
      { id: 3, name: 'Goblin Saqueador', level: 3, isBoss: false },
      { id: 4, name: 'Lobo de Gelo', level: 4, isBoss: false },
      { id: 5, name: 'Bandido Anão Renegado', level: 5, isBoss: false },
      { id: 6, name: 'Lobo Alpha de Gelo', level: 5, isBoss: true }
    ];

    testCases.forEach(({ id, name, level, isBoss }) => {
      describe(`${name} (ID ${id}, Level ${level})${isBoss ? ' [BOSS]' : ''}`, () => {
        let enemy;
        const multiplier = isBoss ? 1.5 : 1;

        beforeAll(() => {
          enemy = enemies[id];
        });

        test('should have correct ID and name', () => {
          expect(enemy).toBeDefined();
          expect(enemy.id).toBe(id);
          expect(enemy.name).toBe(name);
        });

        test('should have HP calculated with formula: (50 + level × 20) × multiplier', () => {
          const expectedHP = Math.floor((50 + level * 20) * multiplier);
          expect(enemy.params[0]).toBe(expectedHP);
        });

        test('should have MP set to 0 (no magic at this stage)', () => {
          expect(enemy.params[1]).toBe(0);
        });

        test('should have ATK calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedATK = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[2]).toBe(expectedATK);
        });

        test('should have DEF calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedDEF = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[3]).toBe(expectedDEF);
        });

        test('should have MATK calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedMATK = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[4]).toBe(expectedMATK);
        });

        test('should have MDEF calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedMDEF = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[5]).toBe(expectedMDEF);
        });

        test('should have AGI calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedAGI = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[6]).toBe(expectedAGI);
        });

        test('should have LUK calculated with formula: (10 + level × 2) × multiplier', () => {
          const expectedLUK = Math.floor((10 + level * 2) * multiplier);
          expect(enemy.params[7]).toBe(expectedLUK);
        });

        test('should have gold calculated with formula: level × 5', () => {
          const expectedGold = level * 5;
          expect(enemy.gold).toBe(expectedGold);
        });

        test('should have EXP calculated with formula: level × 8', () => {
          const expectedEXP = level * 8;
          expect(enemy.exp).toBe(expectedEXP);
        });

        test('should have only basic attack (skillId: 1)', () => {
          expect(enemy.actions).toBeDefined();
          expect(enemy.actions.length).toBeGreaterThan(0);
          expect(enemy.actions[0].skillId).toBe(1);
        });

        test('should have proper battlerName format', () => {
          expect(enemy.battlerName).toBeDefined();
          expect(enemy.battlerName).toMatch(/^[A-Za-z_]+$/);
        });

        test('should have empty traits array', () => {
          expect(enemy.traits).toBeDefined();
          expect(Array.isArray(enemy.traits)).toBe(true);
          expect(enemy.traits.length).toBe(0);
        });

        test('should have empty dropItems configuration', () => {
          expect(enemy.dropItems).toBeDefined();
          expect(Array.isArray(enemy.dropItems)).toBe(true);
          expect(enemy.dropItems[0].dataId).toBe(0);
          expect(enemy.dropItems[0].kind).toBe(0);
        });
      });
    });
  });

  describe('Boss Multiplier Validation', () => {
    test('Lobo Alpha de Gelo should have +50% stats compared to base level 5', () => {
      const boss = enemies[6];
      const level = 5;
      const baseHP = 50 + level * 20;
      const baseStats = 10 + level * 2;

      expect(boss.params[0]).toBe(Math.floor(baseHP * 1.5)); // HP: 225
      expect(boss.params[2]).toBe(Math.floor(baseStats * 1.5)); // ATK: 30
      expect(boss.params[3]).toBe(Math.floor(baseStats * 1.5)); // DEF: 30
      expect(boss.params[4]).toBe(Math.floor(baseStats * 1.5)); // MATK: 30
      expect(boss.params[5]).toBe(Math.floor(baseStats * 1.5)); // MDEF: 30
      expect(boss.params[6]).toBe(Math.floor(baseStats * 1.5)); // AGI: 30
      expect(boss.params[7]).toBe(Math.floor(baseStats * 1.5)); // LUK: 30
    });
  });

  describe('Empty Slots Validation', () => {
    test('IDs 7-11 should be empty slots reserved for future expansion', () => {
      for (let i = 7; i <= 11; i++) {
        const slot = enemies[i];
        expect(slot).toBeDefined();
        expect(slot.id).toBe(i);
        expect(slot.name).toBe('');
        expect(slot.params[0]).toBe(1); // HP should be 1 for empty slots
      }
    });
  });

  describe('Data Structure Validation', () => {
    test('all Region 1 enemies should have valid RPG Maker MZ structure', () => {
      for (let i = 1; i <= 6; i++) {
        const enemy = enemies[i];
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
      }
    });

    test('params array should have exactly 8 values for all enemies', () => {
      for (let i = 2; i <= 6; i++) {
        const enemy = enemies[i];
        expect(enemy.params).toBeDefined();
        expect(enemy.params.length).toBe(8);
      }
    });
  });

  describe('Edge Cases', () => {
    test('all enemies should have MP set to 0', () => {
      for (let i = 2; i <= 6; i++) {
        const enemy = enemies[i];
        expect(enemy.params[1]).toBe(0);
      }
    });

    test('all enemies should use only skillId 1 (basic attack)', () => {
      for (let i = 2; i <= 6; i++) {
        const enemy = enemies[i];
        expect(enemy.actions[0].skillId).toBe(1);
      }
    });

    test('battlerHue should be 0 for all enemies', () => {
      for (let i = 1; i <= 6; i++) {
        const enemy = enemies[i];
        expect(enemy.battlerHue).toBe(0);
      }
    });
  });
});
