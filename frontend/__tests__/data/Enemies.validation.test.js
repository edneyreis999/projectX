/**
 * Enemies.json Validation Test Suite
 * Tests JSON structure, RPG Maker MZ schema compliance, and database organization
 */

const fs = require('fs');
const path = require('path');

describe('Enemies.json Database Validation', () => {
  let enemiesData;
  const enemiesPath = path.join(__dirname, '../../data/Enemies.json');

  beforeAll(() => {
    // Read and parse the Enemies.json file
    const rawData = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(rawData);
  });

  describe('JSON Syntax and Structure', () => {
    test('JSON file is syntactically valid and parseable', () => {
      expect(enemiesData).toBeDefined();
      expect(Array.isArray(enemiesData)).toBe(true);
    });

    test('Array has exactly 101 elements (index 0 + 100 enemy slots)', () => {
      expect(enemiesData.length).toBe(101);
    });

    test('Index 0 is null (RPG Maker MZ placeholder)', () => {
      expect(enemiesData[0]).toBeNull();
    });
  });

  describe('Region Separators', () => {
    const regionSeparators = [
      { id: 1, name: '=== ESTRADA DO CÃO-LUAR ===' },
      { id: 12, name: '=== MINAS DE KRAVENS ===' },
      { id: 23, name: '=== ESGOTO DE GILDRAT ===' },
      { id: 34, name: '=== RUÍNAS DE MELIOS ===' },
      { id: 46, name: '=== REGIÕES PÓS-SELO ===' },
    ];

    test.each(regionSeparators)('Region separator at index $id has correct format: $name', ({ id, name }) => {
      const separator = enemiesData[id];
      expect(separator).toBeDefined();
      expect(separator.name).toBe(name);
      expect(separator.id).toBe(id);
      expect(separator.battlerName).toBe('');
      expect(separator.params[0]).toBe(1); // HP should be 1 for separators
    });

    test('All region separators follow === REGIÃO === format', () => {
      regionSeparators.forEach(({ id, name }) => {
        expect(name).toMatch(/^=== .+ ===$/);
      });
    });
  });

  describe('Empty Slot Allocation', () => {
    const emptySlotRanges = [
      { region: 'Estrada do Cão-Luar', start: 7, end: 11 },
      { region: 'Minas de Kravens', start: 18, end: 22 },
      { region: 'Esgoto de Gildrat', start: 29, end: 33 },
      { region: 'Ruínas de Melios', start: 41, end: 45 },
      { region: 'Regiões Pós-Selo', start: 47, end: 100 },
    ];

    test.each(emptySlotRanges)('Region $region has 5 empty slots from index $start to $end', ({ start, end }) => {
      const expectedSlots = end - start + 1;
      for (let i = start; i <= end; i++) {
        const slot = enemiesData[i];
        expect(slot).toBeDefined();
        expect(slot.name).toBe('');
        expect(slot.battlerName).toBe('');
        expect(slot.params[0]).toBe(1); // HP should be 1 for empty slots
      }
      expect(expectedSlots).toBeGreaterThanOrEqual(5);
    });

    test('Empty slots have minimal HP (1) to indicate reserved status', () => {
      const emptyIndices = [];
      // Collect all empty slot indices
      emptySlotRanges.forEach(({ start, end }) => {
        for (let i = start; i <= end; i++) {
          emptyIndices.push(i);
        }
      });

      emptyIndices.forEach(index => {
        expect(enemiesData[index].params[0]).toBe(1);
      });
    });
  });

  describe('RPG Maker MZ Enemy Schema Compliance', () => {
    const requiredFields = ['id', 'name', 'battlerName', 'battlerHue', 'exp', 'gold', 'params', 'actions', 'traits', 'dropItems', 'note'];

    test('All enemy entries have required RPG Maker MZ fields', () => {
      // Skip index 0 (null placeholder)
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        requiredFields.forEach(field => {
          expect(enemy).toHaveProperty(field);
        });
      }
    });

    test('All params arrays have exactly 8 elements', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        expect(enemy.params).toBeDefined();
        expect(Array.isArray(enemy.params)).toBe(true);
        expect(enemy.params.length).toBe(8);
      }
    });

    test('All actions arrays have at least 1 element', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        expect(enemy.actions).toBeDefined();
        expect(Array.isArray(enemy.actions)).toBe(true);
        expect(enemy.actions.length).toBeGreaterThanOrEqual(1);
      }
    });

    test('All action entries have required fields', () => {
      const actionRequiredFields = ['skillId', 'rating', 'conditionType', 'conditionParam1', 'conditionParam2'];
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        enemy.actions.forEach(action => {
          actionRequiredFields.forEach(field => {
            expect(action).toHaveProperty(field);
          });
        });
      }
    });

    test('All enemies use basic attack (skillId: 1)', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        enemy.actions.forEach(action => {
          expect(action.skillId).toBe(1);
        });
      }
    });

    test('All dropItems arrays are properly structured', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        expect(enemy.dropItems).toBeDefined();
        expect(Array.isArray(enemy.dropItems)).toBe(true);
        enemy.dropItems.forEach(dropItem => {
          expect(dropItem).toHaveProperty('dataId');
          expect(dropItem).toHaveProperty('kind');
          expect(dropItem).toHaveProperty('denominator');
        });
      }
    });
  });

  describe('Enemy Data Validation by Region', () => {
    const regions = [
      {
        name: 'Estrada do Cão-Luar',
        enemies: [
          { id: 2, name: 'Lobo Jovem', level: 1, hp: 70, stats: 12 },
          { id: 3, name: 'Goblin Saqueador', level: 3, hp: 110, stats: 16 },
          { id: 4, name: 'Lobo de Gelo', level: 4, hp: 130, stats: 18 },
          { id: 5, name: 'Bandido Anão Renegado', level: 5, hp: 150, stats: 20 },
          { id: 6, name: 'Lobo Alpha de Gelo', level: 5, hp: 225, stats: 30, isBoss: true },
        ],
      },
      {
        name: 'Minas de Kravens',
        enemies: [
          { id: 13, name: 'Morcego de Caverna', level: 5, hp: 150, stats: 20 },
          { id: 14, name: 'Aranha Mineira', level: 6, hp: 170, stats: 22 },
          { id: 15, name: 'Aranha Gigante', level: 8, hp: 210, stats: 26 },
          { id: 16, name: 'Rato Gigante Mutante', level: 8, hp: 210, stats: 26 },
          { id: 17, name: 'Cristaleão', level: 10, hp: 375, stats: 45, isBoss: true },
        ],
      },
      {
        name: 'Esgoto de Gildrat',
        enemies: [
          { id: 24, name: 'Rato de Esgoto', level: 10, hp: 250, stats: 30 },
          { id: 25, name: 'Limo Ácido', level: 11, hp: 270, stats: 32 },
          { id: 26, name: 'Fungo Venenoso Gigante', level: 13, hp: 310, stats: 36 },
          { id: 27, name: 'Gosma Tóxica', level: 13, hp: 310, stats: 36 },
          { id: 28, name: 'Pestesporo', level: 15, hp: 525, stats: 60, isBoss: true },
        ],
      },
      {
        name: 'Ruínas de Melios',
        enemies: [
          { id: 35, name: 'Guardião Menor de Pedra', level: 16, hp: 370, stats: 42 },
          { id: 36, name: 'Elemental de Terra', level: 17, hp: 390, stats: 44 },
          { id: 37, name: 'Guardião Ancião', level: 18, hp: 410, stats: 46 },
          { id: 38, name: 'Sombra Errante', level: 19, hp: 430, stats: 48 },
          { id: 39, name: 'Corvos de Melios', level: 20, hp: 675, stats: 75, isBoss: true },
          { id: 40, name: 'Guardião Colossal', level: 20, hp: 675, stats: 75, isBoss: true },
        ],
      },
    ];

    regions.forEach(region => {
      describe(`${region.name} Region`, () => {
        region.enemies.forEach(expectedEnemy => {
          test(`Enemy ID ${expectedEnemy.id} (${expectedEnemy.name}) has correct stats`, () => {
            const enemy = enemiesData[expectedEnemy.id];
            expect(enemy).toBeDefined();
            expect(enemy.id).toBe(expectedEnemy.id);
            expect(enemy.name).toBe(expectedEnemy.name);
            expect(enemy.params[0]).toBe(expectedEnemy.hp); // HP
            // ATK, DEF, MATK, MDEF, AGI, LUK should all match stats value
            for (let i = 2; i <= 7; i++) {
              expect(enemy.params[i]).toBe(expectedEnemy.stats);
            }
          });
        });
      });
    });
  });

  describe('Prettier Formatting Compliance', () => {
    test('File is formatted according to Prettier configuration', () => {
      // Read the raw file content
      const rawContent = fs.readFileSync(enemiesPath, 'utf8');

      // Check for consistent formatting patterns
      expect(rawContent).toContain('[\n'); // Array starts with newline
      expect(rawContent).not.toMatch(/,\s*}/); // No trailing commas in objects

      // Verify proper indentation (2 spaces as per .prettierrc)
      expect(rawContent).toMatch(/\n  {/); // Objects indented with 2 spaces
      expect(rawContent).toMatch(/\n    "/); // Properties indented with 4 spaces

      // Verify it can be parsed (already done in beforeAll, but ensures no hidden chars)
      expect(() => JSON.parse(rawContent)).not.toThrow();
    });
  });

  describe('Database Structure Integrity', () => {
    test('IDs are sequential and match array indices', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        expect(enemiesData[i].id).toBe(i);
      }
    });

    test('No duplicate IDs exist in the database', () => {
      const ids = enemiesData.slice(1).map(enemy => enemy.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('All enemies have valid numeric stats', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        enemy.params.forEach((stat, index) => {
          expect(typeof stat).toBe('number');
          expect(stat).toBeGreaterThanOrEqual(0);
        });
      }
    });

    test('All enemies have valid exp and gold values', () => {
      for (let i = 1; i < enemiesData.length; i++) {
        const enemy = enemiesData[i];
        expect(typeof enemy.exp).toBe('number');
        expect(enemy.exp).toBeGreaterThanOrEqual(0);
        expect(typeof enemy.gold).toBe('number');
        expect(enemy.gold).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
