/**
 * @file Enemies.region5.test.js
 * @description Unit tests for Region 5 (Regiões Pós-Selo) structure in Enemies.json
 *
 * Tests validate:
 * - Separator entry at ID 46 with correct format
 * - 54 empty reserved slots (IDs 47-100)
 * - Sequential array indexing
 * - RPG Maker MZ schema compliance
 */

const fs = require('fs');
const path = require('path');

describe('Enemies.json - Region 5: Regiões Pós-Selo', () => {
  let enemiesData;

  beforeAll(() => {
    const filePath = path.join(__dirname, '../../data/Enemies.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    enemiesData = JSON.parse(fileContent);
  });

  describe('Array Structure', () => {
    test('should have exactly 101 entries (null + IDs 1-100)', () => {
      expect(enemiesData).toHaveLength(101);
    });

    test('should have null as first entry', () => {
      expect(enemiesData[0]).toBeNull();
    });

    test('should maintain sequential indexing from ID 1-100', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
      }
    });
  });

  describe('Separator Entry (ID 46)', () => {
    let separator;

    beforeAll(() => {
      separator = enemiesData[46];
    });

    test('should exist at array index 46', () => {
      expect(separator).toBeDefined();
      expect(separator).not.toBeNull();
    });

    test('should have id 46', () => {
      expect(separator.id).toBe(46);
    });

    test('should have correct separator name format', () => {
      expect(separator.name).toBe('=== REGIÕES PÓS-SELO ===');
    });

    test('should have empty battlerName', () => {
      expect(separator.battlerName).toBe('');
    });

    test('should have HP=1 (minimal stats for separator)', () => {
      expect(separator.params[0]).toBe(1);
    });

    test('should have MP=0', () => {
      expect(separator.params[1]).toBe(0);
    });

    test('should have all other stats at 0', () => {
      for (let i = 2; i < separator.params.length; i++) {
        expect(separator.params[i]).toBe(0);
      }
    });

    test('should have battlerHue 0', () => {
      expect(separator.battlerHue).toBe(0);
    });

    test('should have exp 0', () => {
      expect(separator.exp).toBe(0);
    });

    test('should have gold 0', () => {
      expect(separator.gold).toBe(0);
    });

    test('should follow RPG Maker MZ enemy schema', () => {
      expect(separator).toHaveProperty('id');
      expect(separator).toHaveProperty('name');
      expect(separator).toHaveProperty('battlerName');
      expect(separator).toHaveProperty('battlerHue');
      expect(separator).toHaveProperty('exp');
      expect(separator).toHaveProperty('gold');
      expect(separator).toHaveProperty('params');
      expect(separator).toHaveProperty('actions');
      expect(separator).toHaveProperty('traits');
      expect(separator).toHaveProperty('dropItems');
      expect(separator).toHaveProperty('note');
    });
  });

  describe('Reserved Slots (IDs 47-100)', () => {
    test('should have 54 reserved slots', () => {
      const reservedSlots = enemiesData.slice(47, 101);
      expect(reservedSlots).toHaveLength(54);
    });

    test('all reserved slots should have empty names', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.name).toBe('');
      }
    });

    test('all reserved slots should have HP=1', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.params[0]).toBe(1);
      }
    });

    test('all reserved slots should have MP=0', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.params[1]).toBe(0);
      }
    });

    test('all reserved slots should have stats [1, 0, 0, 0, 0, 0, 0, 0]', () => {
      const expectedParams = [1, 0, 0, 0, 0, 0, 0, 0];
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.params).toEqual(expectedParams);
      }
    });

    test('all reserved slots should have empty battlerName', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.battlerName).toBe('');
      }
    });

    test('all reserved slots should have exp 0', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.exp).toBe(0);
      }
    });

    test('all reserved slots should have gold 0', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.gold).toBe(0);
      }
    });

    test('all reserved slots should have battlerHue 0', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.battlerHue).toBe(0);
      }
    });

    test('all reserved slots should have basic attack action (skillId: 1)', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.actions).toHaveLength(1);
        expect(enemy.actions[0].skillId).toBe(1);
        expect(enemy.actions[0].rating).toBe(5);
      }
    });

    test('all reserved slots should have empty traits', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.traits).toEqual([]);
      }
    });

    test('all reserved slots should have empty dropItems', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.dropItems).toHaveLength(1);
        expect(enemy.dropItems[0]).toEqual({
          dataId: 0,
          kind: 0,
          denominator: 1
        });
      }
    });

    test('all reserved slots should have empty note', () => {
      for (let id = 47; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.note).toBe('');
      }
    });
  });

  describe('RPG Maker MZ Schema Compliance', () => {
    test('all entries should follow RPG Maker MZ enemy schema', () => {
      const requiredFields = [
        'id', 'name', 'battlerName', 'battlerHue',
        'exp', 'gold', 'params', 'actions',
        'traits', 'dropItems', 'note'
      ];

      for (let id = 46; id <= 100; id++) {
        const enemy = enemiesData[id];
        requiredFields.forEach(field => {
          expect(enemy).toHaveProperty(field);
        });
      }
    });

    test('params array should have 8 elements for all Region 5 entries', () => {
      for (let id = 46; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.params).toHaveLength(8);
      }
    });

    test('actions array should have at least 1 element for all Region 5 entries', () => {
      for (let id = 46; id <= 100; id++) {
        const enemy = enemiesData[id];
        expect(enemy.actions.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('JSON Validity', () => {
    test('should be valid JSON', () => {
      const filePath = path.join(__dirname, '../../data/Enemies.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      expect(() => JSON.parse(fileContent)).not.toThrow();
    });

    test('should be parseable as array', () => {
      expect(Array.isArray(enemiesData)).toBe(true);
    });
  });

  describe('Array Indexing Consistency', () => {
    test('array index should match enemy ID for Region 5', () => {
      for (let id = 46; id <= 100; id++) {
        expect(enemiesData[id].id).toBe(id);
      }
    });

    test('should not have gaps in array between ID 46 and 100', () => {
      for (let i = 46; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i]).not.toBeNull();
      }
    });
  });

  describe('Structural Consistency with Other Regions', () => {
    test('separator format should match other region separators', () => {
      const separators = [
        { id: 1, name: '=== ESTRADA DO CÃO-LUAR ===' },
        { id: 12, name: '=== MINAS DE KRAVENS ===' },
        { id: 23, name: '=== ESGOTO DE GILDRAT ===' },
        { id: 34, name: '=== RUÍNAS DE MELIOS ===' },
        { id: 46, name: '=== REGIÕES PÓS-SELO ===' }
      ];

      separators.forEach(({ id, name }) => {
        const entry = enemiesData[id];
        expect(entry.name).toBe(name);
        expect(entry.name).toMatch(/^=== .+ ===$/);
        expect(entry.battlerName).toBe('');
        expect(entry.params[0]).toBe(1); // HP=1
        expect(entry.exp).toBe(0);
        expect(entry.gold).toBe(0);
      });
    });

    test('empty slots should match pattern from other regions', () => {
      // Test that empty slots in Region 5 match the pattern from Region 1, 2, 3, 4
      const emptySlotIds = [7, 8, 9, 10, 11]; // Region 1 empty slots
      const region5EmptyIds = [47, 48, 49, 50, 51]; // Region 5 sample empty slots

      emptySlotIds.forEach((emptyId, index) => {
        const region1Empty = enemiesData[emptyId];
        const region5Empty = enemiesData[region5EmptyIds[index]];

        // Both should have same structure (except ID)
        expect(region5Empty.name).toBe(region1Empty.name);
        expect(region5Empty.battlerName).toBe(region1Empty.battlerName);
        expect(region5Empty.params).toEqual(region1Empty.params);
        expect(region5Empty.exp).toBe(region1Empty.exp);
        expect(region5Empty.gold).toBe(region1Empty.gold);
      });
    });
  });
});
