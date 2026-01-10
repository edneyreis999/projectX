/**
 * Tests for Enemies.json database structure
 * Validates the foundational structure with separators and empty slots
 */

const fs = require('fs');
const path = require('path');

describe('Enemies.json Structure Validation', () => {
  let enemiesData;

  beforeAll(() => {
    const enemiesPath = path.join(__dirname, '../../data/Enemies.json');
    const rawData = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(rawData);
  });

  describe('JSON structure validation', () => {
    test('should parse Enemies.json as valid JSON', () => {
      expect(enemiesData).toBeDefined();
      expect(Array.isArray(enemiesData)).toBe(true);
    });
  });

  describe('Array length validation', () => {
    test('should have exactly 101 elements (indices 0-100)', () => {
      expect(enemiesData.length).toBe(101);
    });
  });

  describe('Null placeholder validation', () => {
    test('should have null at index 0', () => {
      expect(enemiesData[0]).toBeNull();
    });
  });

  describe('Separator placement validation', () => {
    test('should have separator at index 1 for ESTRADA DO CÃO-LUAR', () => {
      expect(enemiesData[1]).toBeDefined();
      expect(enemiesData[1].id).toBe(1);
      expect(enemiesData[1].name).toBe('=== ESTRADA DO CÃO-LUAR ===');
    });

    test('should have separator at index 12 for MINAS DE KRAVENS', () => {
      expect(enemiesData[12]).toBeDefined();
      expect(enemiesData[12].id).toBe(12);
      expect(enemiesData[12].name).toBe('=== MINAS DE KRAVENS ===');
    });

    test('should have separator at index 23 for ESGOTO DE GILDRAT', () => {
      expect(enemiesData[23]).toBeDefined();
      expect(enemiesData[23].id).toBe(23);
      expect(enemiesData[23].name).toBe('=== ESGOTO DE GILDRAT ===');
    });

    test('should have separator at index 34 for RUÍNAS DE MELIOS', () => {
      expect(enemiesData[34]).toBeDefined();
      expect(enemiesData[34].id).toBe(34);
      expect(enemiesData[34].name).toBe('=== RUÍNAS DE MELIOS ===');
    });

    test('should have separator at index 46 for REGIÕES PÓS-SELO', () => {
      expect(enemiesData[46]).toBeDefined();
      expect(enemiesData[46].id).toBe(46);
      expect(enemiesData[46].name).toBe('=== REGIÕES PÓS-SELO ===');
    });
  });

  describe('Separator format validation', () => {
    const separatorIndices = [1, 12, 23, 34, 46];

    test.each(separatorIndices)('separator at index %i should match "=== REGION NAME ===" format', (index) => {
      const separator = enemiesData[index];
      expect(separator.name).toMatch(/^=== .+ ===$/);
    });
  });

  describe('Empty slot allocation validation', () => {
    test('should have empty slots at indices 7-11 (Region 1 expansion)', () => {
      for (let i = 7; i <= 11; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
        expect(enemiesData[i].name).toBe('');
      }
    });

    test('should have empty slots at indices 18-22 (Region 2 expansion)', () => {
      for (let i = 18; i <= 22; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
        expect(enemiesData[i].name).toBe('');
      }
    });

    test('should have empty slots at indices 29-33 (Region 3 expansion)', () => {
      for (let i = 29; i <= 33; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
        expect(enemiesData[i].name).toBe('');
      }
    });

    test('should have empty slots at indices 41-45 (Region 4 expansion)', () => {
      for (let i = 41; i <= 45; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
        expect(enemiesData[i].name).toBe('');
      }
    });

    test('should have empty slots at indices 47-100 (Region 5 reserved)', () => {
      for (let i = 47; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].id).toBe(i);
        expect(enemiesData[i].name).toBe('');
      }
    });
  });

  describe('ID sequence validation', () => {
    test('each entry should have id matching its array index', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i].id).toBe(i);
      }
    });
  });

  describe('RPG Maker MZ schema validation', () => {
    const requiredFields = [
      'id',
      'name',
      'battlerName',
      'battlerHue',
      'exp',
      'gold',
      'params',
      'actions',
      'traits',
      'dropItems',
      'note'
    ];

    test('all non-null entries should have required RPG Maker MZ fields', () => {
      for (let i = 1; i <= 100; i++) {
        const entry = enemiesData[i];
        requiredFields.forEach(field => {
          expect(entry).toHaveProperty(field);
        });
      }
    });

    test('params array should have 8 elements', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i].params).toHaveLength(8);
      }
    });

    test('params[0] (HP) should be at least 1 for all entries', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i].params[0]).toBeGreaterThanOrEqual(1);
      }
    });

    test('actions array should contain at least one action', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i].actions.length).toBeGreaterThan(0);
      }
    });

    test('each action should have required fields', () => {
      const requiredActionFields = [
        'skillId',
        'rating',
        'conditionType',
        'conditionParam1',
        'conditionParam2'
      ];

      for (let i = 1; i <= 100; i++) {
        enemiesData[i].actions.forEach(action => {
          requiredActionFields.forEach(field => {
            expect(action).toHaveProperty(field);
          });
        });
      }
    });

    test('dropItems array should contain at least one drop item', () => {
      for (let i = 1; i <= 100; i++) {
        expect(enemiesData[i].dropItems.length).toBeGreaterThan(0);
      }
    });

    test('each dropItem should have required fields', () => {
      const requiredDropItemFields = ['dataId', 'kind', 'denominator'];

      for (let i = 1; i <= 100; i++) {
        enemiesData[i].dropItems.forEach(dropItem => {
          requiredDropItemFields.forEach(field => {
            expect(dropItem).toHaveProperty(field);
          });
        });
      }
    });

    test('traits should be an array', () => {
      for (let i = 1; i <= 100; i++) {
        expect(Array.isArray(enemiesData[i].traits)).toBe(true);
      }
    });

    test('note should be a string', () => {
      for (let i = 1; i <= 100; i++) {
        expect(typeof enemiesData[i].note).toBe('string');
      }
    });
  });

  describe('Edge cases', () => {
    test('array should not be sparse (no undefined elements)', () => {
      for (let i = 0; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });

    test('all entries except index 0 should be objects', () => {
      for (let i = 1; i <= 100; i++) {
        expect(typeof enemiesData[i]).toBe('object');
        expect(enemiesData[i]).not.toBeNull();
      }
    });

    test('index 0 should be null', () => {
      expect(enemiesData[0]).toBeNull();
    });
  });

  describe('Region structure validation', () => {
    test('Region 1 should have separator at index 1 and slots 2-11', () => {
      expect(enemiesData[1].name).toBe('=== ESTRADA DO CÃO-LUAR ===');
      for (let i = 2; i <= 11; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });

    test('Region 2 should have separator at index 12 and slots 13-22', () => {
      expect(enemiesData[12].name).toBe('=== MINAS DE KRAVENS ===');
      for (let i = 13; i <= 22; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });

    test('Region 3 should have separator at index 23 and slots 24-33', () => {
      expect(enemiesData[23].name).toBe('=== ESGOTO DE GILDRAT ===');
      for (let i = 24; i <= 33; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });

    test('Region 4 should have separator at index 34 and slots 35-45', () => {
      expect(enemiesData[34].name).toBe('=== RUÍNAS DE MELIOS ===');
      for (let i = 35; i <= 45; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });

    test('Region 5 should have separator at index 46 and slots 47-100', () => {
      expect(enemiesData[46].name).toBe('=== REGIÕES PÓS-SELO ===');
      for (let i = 47; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
      }
    });
  });

  describe('Total empty slots count', () => {
    test('should have empty expansion slots in implemented regions', () => {
      // Region 1: IDs 7-11 (5 empty expansion slots)
      for (let i = 7; i <= 11; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].name).toBe('');
      }

      // Region 2: IDs 18-22 (5 empty expansion slots)
      for (let i = 18; i <= 22; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].name).toBe('');
      }

      // Region 3: IDs 29-33 (5 empty expansion slots)
      for (let i = 29; i <= 33; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].name).toBe('');
      }

      // Region 4: IDs 35-45 (11 empty slots - not yet implemented)
      for (let i = 35; i <= 45; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].name).toBe('');
      }

      // Region 5: IDs 47-100 (54 empty slots - reserved for future)
      for (let i = 47; i <= 100; i++) {
        expect(enemiesData[i]).toBeDefined();
        expect(enemiesData[i].name).toBe('');
      }
    });

    test('total of 80 empty slots should exist (excluding separators and implemented enemies)', () => {
      // Implemented: 5 (Region 1) + 5 (Region 2) + 5 (Region 3) = 15 enemies
      // Empty: 5 (R1 expansion) + 5 (R2 expansion) + 5 (R3 expansion) + 11 (R4) + 54 (R5) = 80 slots
      let emptyCount = 0;
      for (let i = 1; i <= 100; i++) {
        if (enemiesData[i].name === '') {
          emptyCount++;
        }
      }
      expect(emptyCount).toBe(80);
    });

    test('should have exactly 5 separators', () => {
      let separatorCount = 0;
      for (let i = 1; i <= 100; i++) {
        if (enemiesData[i].name.startsWith('===')) {
          separatorCount++;
        }
      }
      expect(separatorCount).toBe(5);
    });
  });
});
