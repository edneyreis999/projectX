/**
 * Unit Tests for generate-troops.js
 *
 * Tests all core functions of the troops generation script including:
 * - Position calculation
 * - Enemy name resolution
 * - Troop object generation
 * - Battle page structure
 */

const {
  calculatePositions,
  buildEnemyNameMapping,
  resolveEnemyId,
  createEmptyBattlePage,
  generateTroop,
  generateAllTroops,
} = require('../../scripts/generate-troops');

describe('generate-troops.js', () => {
  // ==========================================
  // Position Calculation Tests
  // ==========================================

  describe('calculatePositions', () => {
    test('should return correct X coordinates for 1 member', () => {
      const positions = calculatePositions(1);
      expect(positions).toHaveLength(1);
      expect(positions[0]).toEqual({ x: 227, y: 436 });
    });

    test('should return correct X coordinates for 2 members', () => {
      const positions = calculatePositions(2);
      expect(positions).toHaveLength(2);
      expect(positions[0]).toEqual({ x: 227, y: 436 });
      expect(positions[1]).toEqual({ x: 354, y: 436 });
    });

    test('should return correct X coordinates for 3 members', () => {
      const positions = calculatePositions(3);
      expect(positions).toHaveLength(3);
      expect(positions[0]).toEqual({ x: 227, y: 436 });
      expect(positions[1]).toEqual({ x: 354, y: 436 });
      expect(positions[2]).toEqual({ x: 481, y: 436 });
    });

    test('should return correct X coordinates for 4 members', () => {
      const positions = calculatePositions(4);
      expect(positions).toHaveLength(4);
      expect(positions[0]).toEqual({ x: 227, y: 436 });
      expect(positions[1]).toEqual({ x: 354, y: 436 });
      expect(positions[2]).toEqual({ x: 481, y: 436 });
      expect(positions[3]).toEqual({ x: 608, y: 436 });
    });

    test('should return correct X coordinates for 5 members', () => {
      const positions = calculatePositions(5);
      expect(positions).toHaveLength(5);
      expect(positions[4]).toEqual({ x: 735, y: 436 });
    });

    test('should return correct X coordinates for 6 members', () => {
      const positions = calculatePositions(6);
      expect(positions).toHaveLength(6);
      expect(positions[5]).toEqual({ x: 862, y: 436 });
    });

    test('should always set Y to 436', () => {
      const positions = calculatePositions(4);
      positions.forEach((pos) => {
        expect(pos.y).toBe(436);
      });
    });

    test('should return empty array for 0 members', () => {
      const positions = calculatePositions(0);
      expect(positions).toEqual([]);
    });
  });

  // ==========================================
  // Enemy Name Mapping Tests
  // ==========================================

  describe('buildEnemyNameMapping', () => {
    test('should map valid enemy names to IDs', () => {
      const enemies = [
        null,
        { id: 1, name: '=== SEPARATOR ===' },
        { id: 2, name: 'Lobo Jovem' },
        { id: 3, name: 'Goblin Saqueador' },
        { id: 4, name: '' },
      ];

      const mapping = buildEnemyNameMapping(enemies);

      expect(mapping.size).toBe(2);
      expect(mapping.get('Lobo Jovem')).toBe(2);
      expect(mapping.get('Goblin Saqueador')).toBe(3);
    });

    test('should skip null entries', () => {
      const enemies = [null, { id: 1, name: 'Enemy' }];
      const mapping = buildEnemyNameMapping(enemies);

      expect(mapping.size).toBe(1);
      expect(mapping.get('Enemy')).toBe(1);
    });

    test('should skip separator entries (starting with ===)', () => {
      const enemies = [
        { id: 1, name: '=== WORLD MAP ===' },
        { id: 2, name: 'Enemy' },
      ];
      const mapping = buildEnemyNameMapping(enemies);

      expect(mapping.size).toBe(1);
      expect(mapping.has('=== WORLD MAP ===')).toBe(false);
      expect(mapping.get('Enemy')).toBe(1); // Maps to array index 1
    });

    test('should skip empty names', () => {
      const enemies = [
        { id: 1, name: '' },
        { id: 2, name: 'Enemy' },
      ];
      const mapping = buildEnemyNameMapping(enemies);

      expect(mapping.size).toBe(1);
      expect(mapping.get('Enemy')).toBe(1); // Maps to array index 1
    });

    test('should handle entries without name property', () => {
      const enemies = [{ id: 1 }, { id: 2, name: 'Enemy' }];
      const mapping = buildEnemyNameMapping(enemies);

      expect(mapping.size).toBe(1);
      expect(mapping.get('Enemy')).toBe(1); // Maps to array index 1
    });
  });

  // ==========================================
  // Enemy Name Resolution Tests
  // ==========================================

  describe('resolveEnemyId', () => {
    test('should correctly resolve Lobo Jovem to ID 2', () => {
      const mapping = new Map([
        ['Lobo Jovem', 2],
        ['Goblin Saqueador', 3],
      ]);

      const id = resolveEnemyId('Lobo Jovem', mapping, 'Test Troop');
      expect(id).toBe(2);
    });

    test('should correctly resolve Cristaleão to ID 17', () => {
      const mapping = new Map([['Cristaleão', 17]]);

      const id = resolveEnemyId('Cristaleão', mapping, 'Test Troop');
      expect(id).toBe(17);
    });

    test('should throw error when enemy name not found', () => {
      const mapping = new Map([['Lobo Jovem', 2]]);

      expect(() => {
        resolveEnemyId('Invalid Enemy', mapping, 'Test Troop');
      }).toThrow('Enemy "Invalid Enemy" not found in Enemies.json (referenced in troop "Test Troop")');
    });

    test('should include troop name in error message', () => {
      const mapping = new Map();

      expect(() => {
        resolveEnemyId('Enemy', mapping, 'Special Boss Troop');
      }).toThrow('Special Boss Troop');
    });
  });

  // ==========================================
  // Battle Page Structure Tests
  // ==========================================

  describe('createEmptyBattlePage', () => {
    test('should create page with correct structure', () => {
      const page = createEmptyBattlePage();

      expect(page).toHaveProperty('conditions');
      expect(page).toHaveProperty('list');
      expect(page).toHaveProperty('span');
    });

    test('should have list with code 0 (empty event)', () => {
      const page = createEmptyBattlePage();

      expect(page.list).toHaveLength(1);
      expect(page.list[0].code).toBe(0);
      expect(page.list[0].indent).toBe(0);
      expect(page.list[0].parameters).toEqual([]);
    });

    test('should have all required condition fields', () => {
      const page = createEmptyBattlePage();
      const conditions = page.conditions;

      expect(conditions).toHaveProperty('actorHp');
      expect(conditions).toHaveProperty('actorId');
      expect(conditions).toHaveProperty('actorValid');
      expect(conditions).toHaveProperty('enemyHp');
      expect(conditions).toHaveProperty('enemyIndex');
      expect(conditions).toHaveProperty('enemyValid');
      expect(conditions).toHaveProperty('switchId');
      expect(conditions).toHaveProperty('switchValid');
      expect(conditions).toHaveProperty('turnA');
      expect(conditions).toHaveProperty('turnB');
      expect(conditions).toHaveProperty('turnEnding');
      expect(conditions).toHaveProperty('turnValid');
    });

    test('should have span set to 0', () => {
      const page = createEmptyBattlePage();
      expect(page.span).toBe(0);
    });
  });

  // ==========================================
  // Troop Generation Tests
  // ==========================================

  describe('generateTroop', () => {
    const mockNameMapping = new Map([
      ['Lobo Jovem', 2],
      ['Goblin Saqueador', 3],
      ['Lobo de Gelo', 4],
      ['Lobo Alpha de Gelo', 6],
    ]);

    test('should generate troop with single enemy type', () => {
      const definition = {
        id: 1,
        name: 'Lobo Jovem x3',
        region: 'world_map',
        members: [{ enemyName: 'Lobo Jovem', count: 3 }],
      };

      const troop = generateTroop(definition, mockNameMapping);

      expect(troop.id).toBe(1);
      expect(troop.name).toBe('Lobo Jovem x3');
      expect(troop.members).toHaveLength(3);
      expect(troop.members[0].enemyId).toBe(2);
      expect(troop.members[1].enemyId).toBe(2);
      expect(troop.members[2].enemyId).toBe(2);
    });

    test('should generate troop with mixed enemy types', () => {
      const definition = {
        id: 8,
        name: 'Lobo Alpha de Gelo x1 + Lobo de Gelo x2',
        region: 'world_map',
        members: [
          { enemyName: 'Lobo Alpha de Gelo', count: 1 },
          { enemyName: 'Lobo de Gelo', count: 2 },
        ],
      };

      const troop = generateTroop(definition, mockNameMapping);

      expect(troop.members).toHaveLength(3);
      expect(troop.members[0].enemyId).toBe(6); // Lobo Alpha
      expect(troop.members[1].enemyId).toBe(4); // Lobo de Gelo
      expect(troop.members[2].enemyId).toBe(4); // Lobo de Gelo
    });

    test('should set all members as not hidden', () => {
      const definition = {
        id: 1,
        name: 'Test Troop',
        region: 'world_map',
        members: [{ enemyName: 'Lobo Jovem', count: 2 }],
      };

      const troop = generateTroop(definition, mockNameMapping);

      troop.members.forEach((member) => {
        expect(member.hidden).toBe(false);
      });
    });

    test('should include pages array with one page', () => {
      const definition = {
        id: 1,
        name: 'Test Troop',
        region: 'world_map',
        members: [{ enemyName: 'Lobo Jovem', count: 1 }],
      };

      const troop = generateTroop(definition, mockNameMapping);

      expect(troop.pages).toHaveLength(1);
      expect(troop.pages[0]).toHaveProperty('conditions');
      expect(troop.pages[0]).toHaveProperty('list');
    });

    test('should have all required RPG Maker MZ fields', () => {
      const definition = {
        id: 1,
        name: 'Test Troop',
        region: 'world_map',
        members: [{ enemyName: 'Lobo Jovem', count: 1 }],
      };

      const troop = generateTroop(definition, mockNameMapping);

      expect(troop).toHaveProperty('id');
      expect(troop).toHaveProperty('name');
      expect(troop).toHaveProperty('members');
      expect(troop).toHaveProperty('pages');

      expect(troop.members[0]).toHaveProperty('enemyId');
      expect(troop.members[0]).toHaveProperty('x');
      expect(troop.members[0]).toHaveProperty('y');
      expect(troop.members[0]).toHaveProperty('hidden');
    });
  });

  // ==========================================
  // Generate All Troops Tests
  // ==========================================

  describe('generateAllTroops', () => {
    const mockNameMapping = new Map([
      ['Lobo Jovem', 2],
      ['Goblin Saqueador', 3],
    ]);

    test('should generate array starting with null', () => {
      const definitions = [
        {
          id: 1,
          name: 'Lobo Jovem x2',
          region: 'world_map',
          members: [{ enemyName: 'Lobo Jovem', count: 2 }],
        },
      ];

      const troops = generateAllTroops(definitions, mockNameMapping);

      expect(troops[0]).toBeNull();
    });

    test('should generate correct number of troops', () => {
      const definitions = [
        {
          id: 1,
          name: 'Lobo Jovem x2',
          region: 'world_map',
          members: [{ enemyName: 'Lobo Jovem', count: 2 }],
        },
        {
          id: 2,
          name: 'Goblin Saqueador x2',
          region: 'world_map',
          members: [{ enemyName: 'Goblin Saqueador', count: 2 }],
        },
      ];

      const troops = generateAllTroops(definitions, mockNameMapping);

      // Should have null + 2 troops = 3 entries
      expect(troops).toHaveLength(3);
      expect(troops[0]).toBeNull();
      expect(troops[1].id).toBe(1);
      expect(troops[2].id).toBe(2);
    });

    test('should preserve troop IDs from definitions', () => {
      const definitions = [
        {
          id: 5,
          name: 'Lobo Jovem x2',
          region: 'world_map',
          members: [{ enemyName: 'Lobo Jovem', count: 2 }],
        },
        {
          id: 10,
          name: 'Goblin Saqueador x2',
          region: 'world_map',
          members: [{ enemyName: 'Goblin Saqueador', count: 2 }],
        },
      ];

      const troops = generateAllTroops(definitions, mockNameMapping);

      expect(troops[1].id).toBe(5);
      expect(troops[2].id).toBe(10);
    });
  });

  // ==========================================
  // Integration Tests
  // ==========================================

  describe('Integration Tests', () => {
    test('should generate correct troops from real troop definitions', () => {
      const troopDefinitions = require('../../scripts/troop-definitions');
      const enemiesData = require('../../data/Enemies.json');

      // Build real enemy mapping
      const nameMapping = buildEnemyNameMapping(enemiesData);

      // Generate all troops
      const troops = generateAllTroops(troopDefinitions, nameMapping);

      // Validate generated troops
      expect(troops).toHaveLength(37); // null + 36 troops
      expect(troops[0]).toBeNull();

      // Validate each troop
      for (let i = 1; i < troops.length; i++) {
        const troop = troops[i];
        expect(troop).toHaveProperty('id');
        expect(troop).toHaveProperty('name');
        expect(troop).toHaveProperty('members');
        expect(troop).toHaveProperty('pages');
        expect(troop.members.length).toBeGreaterThan(0);
      }
    });

    test('should correctly resolve all enemy names from definitions', () => {
      const troopDefinitions = require('../../scripts/troop-definitions');
      const enemiesData = require('../../data/Enemies.json');

      const nameMapping = buildEnemyNameMapping(enemiesData);

      // All enemy names in definitions should be resolvable
      troopDefinitions.forEach((definition) => {
        definition.members.forEach((member) => {
          const enemyId = resolveEnemyId(member.enemyName, nameMapping, definition.name);
          expect(enemyId).toBeGreaterThan(0);
        });
      });
    });

    test('generated troops should match expected regional counts', () => {
      const troopDefinitions = require('../../scripts/troop-definitions');

      const regionCounts = {
        world_map: 0,
        kravens: 0,
        esgoto: 0,
        melios: 0,
      };

      troopDefinitions.forEach((def) => {
        regionCounts[def.region]++;
      });

      expect(regionCounts.world_map).toBe(10);
      expect(regionCounts.kravens).toBe(10);
      expect(regionCounts.esgoto).toBe(8);
      expect(regionCounts.melios).toBe(8);
    });
  });
});
