/**
 * @file Region 4: Ruínas de Melios Enemies Validation Tests
 * @description Tests for validating Region 4 enemies (IDs 34-45) in Enemies.json
 */

const fs = require('fs');
const path = require('path');

describe('Region 4: Ruínas de Melios Enemies', () => {
  let enemiesData;

  beforeAll(() => {
    const enemiesPath = path.join(__dirname, '../../data/Enemies.json');
    const fileContent = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(fileContent);
  });

  describe('JSON Structure Validation', () => {
    test('should be valid and parseable JSON', () => {
      expect(enemiesData).toBeDefined();
      expect(Array.isArray(enemiesData)).toBe(true);
    });

    test('should have entries for IDs 34-45', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id]).toBeDefined();
        expect(enemiesData[id].id).toBe(id);
      }
    });
  });

  describe('ID Sequence Continuity', () => {
    test('should have continuous ID sequence from 34-45 without gaps', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id]).toBeDefined();
        expect(enemiesData[id].id).toBe(id);
      }
    });
  });

  describe('Separator Entry Validation', () => {
    test('should have correct separator at ID 34', () => {
      const separator = enemiesData[34];
      expect(separator.name).toBe('=== RUÍNAS DE MELIOS ===');
      expect(separator.battlerName).toBe('');
      expect(separator.exp).toBe(0);
      expect(separator.gold).toBe(0);
      expect(separator.params[0]).toBe(1); // HP = 1 for separators
    });
  });

  describe('Regular Enemy Stats Validation', () => {
    const regularEnemies = [
      { id: 35, name: 'Guardião Menor de Pedra', level: 16, hp: 370, stats: 42 },
      { id: 36, name: 'Elemental de Terra', level: 17, hp: 390, stats: 44 },
      { id: 37, name: 'Guardião Ancião', level: 18, hp: 410, stats: 46 },
      { id: 38, name: 'Sombra Errante', level: 19, hp: 430, stats: 48 },
    ];

    test.each(regularEnemies)(
      'should have correct stats for $name (Lv$level)',
      ({ id, name, level, hp, stats }) => {
        const enemy = enemiesData[id];

        // Name validation
        expect(enemy.name).toBe(name);

        // Stats validation (HP = 50 + level × 20)
        expect(enemy.params[0]).toBe(hp);
        const expectedHP = 50 + (level * 20);
        expect(enemy.params[0]).toBe(expectedHP);

        // Other stats validation (stat = 10 + level × 2)
        const expectedStat = 10 + (level * 2);
        expect(enemy.params[2]).toBe(stats); // ATK
        expect(enemy.params[2]).toBe(expectedStat);
        expect(enemy.params[3]).toBe(stats); // DEF
        expect(enemy.params[4]).toBe(stats); // MATK
        expect(enemy.params[5]).toBe(stats); // MDEF
        expect(enemy.params[6]).toBe(stats); // AGI
        expect(enemy.params[7]).toBe(stats); // LUK
      }
    );
  });

  describe('Boss Stats Validation (+50% multiplier)', () => {
    const bossEnemies = [
      { id: 39, name: 'Corvos de Melios', level: 20 },
      { id: 40, name: 'Guardião Colossal', level: 20 },
    ];

    test.each(bossEnemies)(
      'should have +50% boss multiplier for $name (Lv$level)',
      ({ id, name, level }) => {
        const boss = enemiesData[id];

        // Name validation
        expect(boss.name).toBe(name);

        // Calculate base stats
        const baseHP = 50 + (level * 20); // 450 for Lv20
        const baseStat = 10 + (level * 2); // 50 for Lv20

        // Boss stats should be base × 1.5
        const expectedBossHP = baseHP * 1.5; // 675
        const expectedBossStat = baseStat * 1.5; // 75

        expect(boss.params[0]).toBe(expectedBossHP);
        expect(boss.params[2]).toBe(expectedBossStat); // ATK
        expect(boss.params[3]).toBe(expectedBossStat); // DEF
        expect(boss.params[4]).toBe(expectedBossStat); // MATK
        expect(boss.params[5]).toBe(expectedBossStat); // MDEF
        expect(boss.params[6]).toBe(expectedBossStat); // AGI
        expect(boss.params[7]).toBe(expectedBossStat); // LUK

        // Verify exact values
        expect(boss.params[0]).toBe(675); // HP
        expect(boss.params[2]).toBe(75); // ATK and other stats
      }
    );

    test('should verify Lv20 boss stats vs regular Lv20 stats', () => {
      const boss = enemiesData[39];

      // Regular Lv20 would be: HP=450, stats=50
      const regularLv20HP = 50 + (20 * 20);
      const regularLv20Stat = 10 + (20 * 2);

      expect(regularLv20HP).toBe(450);
      expect(regularLv20Stat).toBe(50);

      // Boss should be 1.5x
      expect(boss.params[0]).toBe(regularLv20HP * 1.5); // 675
      expect(boss.params[2]).toBe(regularLv20Stat * 1.5); // 75
    });
  });

  describe('Gold Rewards Validation', () => {
    const rewardTests = [
      { id: 35, level: 16, expectedGold: 80 },
      { id: 36, level: 17, expectedGold: 85 },
      { id: 37, level: 18, expectedGold: 90 },
      { id: 38, level: 19, expectedGold: 95 },
      { id: 39, level: 20, expectedGold: 100 },
      { id: 40, level: 20, expectedGold: 100 },
    ];

    test.each(rewardTests)(
      'should follow level × 5 formula for enemy ID $id (Lv$level)',
      ({ id, level, expectedGold }) => {
        const enemy = enemiesData[id];
        expect(enemy.gold).toBe(level * 5);
        expect(enemy.gold).toBe(expectedGold);
      }
    );
  });

  describe('EXP Rewards Validation', () => {
    const expTests = [
      { id: 35, level: 16, expectedEXP: 128 },
      { id: 36, level: 17, expectedEXP: 136 },
      { id: 37, level: 18, expectedEXP: 144 },
      { id: 38, level: 19, expectedEXP: 152 },
      { id: 39, level: 20, expectedEXP: 160 },
      { id: 40, level: 20, expectedEXP: 160 },
    ];

    test.each(expTests)(
      'should follow level × 8 formula for enemy ID $id (Lv$level)',
      ({ id, level, expectedEXP }) => {
        const enemy = enemiesData[id];
        expect(enemy.exp).toBe(level * 8);
        expect(enemy.exp).toBe(expectedEXP);
      }
    );
  });

  describe('MP and Actions Validation', () => {
    test('should have MP=0 for all Region 4 enemies', () => {
      for (let id = 35; id <= 40; id++) {
        const enemy = enemiesData[id];
        expect(enemy.params[1]).toBe(0); // MP is params[1]
      }
    });

    test('should have single basic attack (skillId: 1) for all enemies', () => {
      for (let id = 35; id <= 40; id++) {
        const enemy = enemiesData[id];
        expect(enemy.actions).toHaveLength(1);
        expect(enemy.actions[0].skillId).toBe(1);
        expect(enemy.actions[0].rating).toBe(5);
        expect(enemy.actions[0].conditionType).toBe(0);
      }
    });
  });

  describe('BattlerName Validation', () => {
    const battlerNameTests = [
      { id: 35, name: 'Guardião Menor de Pedra', battlerName: 'Guardiao_Menor_de_Pedra' },
      { id: 36, name: 'Elemental de Terra', battlerName: 'Elemental_de_Terra' },
      { id: 37, name: 'Guardião Ancião', battlerName: 'Guardiao_Anciao' },
      { id: 38, name: 'Sombra Errante', battlerName: 'Sombra_Errante' },
      { id: 39, name: 'Corvos de Melios', battlerName: 'Corvos_de_Melios' },
      { id: 40, name: 'Guardião Colossal', battlerName: 'Guardiao_Colossal' },
    ];

    test.each(battlerNameTests)(
      'should have correct battlerName for $name',
      ({ id, name, battlerName }) => {
        const enemy = enemiesData[id];
        expect(enemy.name).toBe(name);
        expect(enemy.battlerName).toBe(battlerName);
      }
    );
  });

  describe('Empty Slots Validation', () => {
    test('should have valid minimal structure for empty slots (IDs 41-45)', () => {
      for (let id = 41; id <= 45; id++) {
        const emptySlot = enemiesData[id];

        expect(emptySlot.name).toBe('');
        expect(emptySlot.battlerName).toBe('');
        expect(emptySlot.exp).toBe(0);
        expect(emptySlot.gold).toBe(0);
        expect(emptySlot.params[0]).toBe(1); // HP = 1 for empty slots
        expect(emptySlot.params[1]).toBe(0); // MP = 0

        // Verify actions array exists
        expect(emptySlot.actions).toBeDefined();
        expect(Array.isArray(emptySlot.actions)).toBe(true);

        // Verify traits and dropItems exist
        expect(emptySlot.traits).toBeDefined();
        expect(Array.isArray(emptySlot.traits)).toBe(true);
        expect(emptySlot.dropItems).toBeDefined();
        expect(Array.isArray(emptySlot.dropItems)).toBe(true);
      }
    });
  });

  describe('RPG Maker MZ Schema Compliance', () => {
    test('should have all required RPG Maker MZ enemy fields for enemies', () => {
      for (let id = 35; id <= 40; id++) {
        const enemy = enemiesData[id];

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

        // Validate params array length (8 stats: HP, MP, ATK, DEF, MATK, MDEF, AGI, LUK)
        expect(enemy.params).toHaveLength(8);
      }
    });

    test('should have correct dropItems structure', () => {
      for (let id = 35; id <= 40; id++) {
        const enemy = enemiesData[id];

        expect(enemy.dropItems).toHaveLength(1);
        expect(enemy.dropItems[0]).toHaveProperty('dataId');
        expect(enemy.dropItems[0]).toHaveProperty('kind');
        expect(enemy.dropItems[0]).toHaveProperty('denominator');

        // Empty drop items configuration
        expect(enemy.dropItems[0].dataId).toBe(0);
        expect(enemy.dropItems[0].kind).toBe(0);
        expect(enemy.dropItems[0].denominator).toBe(1);
      }
    });
  });

  describe('Integration with Previous Regions', () => {
    test('should not break existing Region 3 enemies', () => {
      // Verify Region 3 separator at ID 23
      expect(enemiesData[23].name).toBe('=== ESGOTO DE GILDRAT ===');

      // Verify last Region 3 enemy (Pestesporo at ID 28)
      const pestesporo = enemiesData[28];
      expect(pestesporo.name).toBe('Pestesporo');
      expect(pestesporo.params[0]).toBe(525); // HP

      // Verify empty slots between Region 3 and Region 4 (IDs 29-33)
      for (let id = 29; id <= 33; id++) {
        expect(enemiesData[id].name).toBe('');
        expect(enemiesData[id].params[0]).toBe(1);
      }
    });

    test('should not break Region 5 separator', () => {
      // Verify Region 5 separator exists at ID 46
      const region5Separator = enemiesData[46];
      expect(region5Separator).toBeDefined();
      expect(region5Separator.name).toBe('=== REGIÕES PÓS-SELO ===');
    });
  });

  describe('Edge Cases and Data Integrity', () => {
    test('should have no null or undefined entries in Region 4', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id]).not.toBeNull();
        expect(enemiesData[id]).not.toBeUndefined();
      }
    });

    test('should have battlerHue set to 0 for all enemies', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id].battlerHue).toBe(0);
      }
    });

    test('should have empty traits array for all enemies', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id].traits).toEqual([]);
      }
    });

    test('should have empty note field for all enemies', () => {
      for (let id = 34; id <= 45; id++) {
        expect(enemiesData[id].note).toBe('');
      }
    });
  });
});
