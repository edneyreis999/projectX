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
  createSeparatorEntry,
  createEmptySlotEntry,
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
  // Separator Entry Tests
  // ==========================================

  describe('createSeparatorEntry', () => {
    test('should create separator with correct structure', () => {
      const separator = createSeparatorEntry(1, 'ESTRADA DO CÃO-LUAR');

      expect(separator).toHaveProperty('id');
      expect(separator).toHaveProperty('name');
      expect(separator).toHaveProperty('members');
      expect(separator).toHaveProperty('pages');
    });

    test('should have correct separator name format', () => {
      const separator = createSeparatorEntry(1, 'ESTRADA DO CÃO-LUAR');
      expect(separator.name).toBe('=== ESTRADA DO CÃO-LUAR ===');
    });

    test('should have empty members array', () => {
      const separator = createSeparatorEntry(1, 'ESTRADA DO CÃO-LUAR');
      expect(separator.members).toEqual([]);
    });

    test('should have valid ID', () => {
      const separator = createSeparatorEntry(22, 'MINAS DE KRAVENS');
      expect(separator.id).toBe(22);
    });

    test('should have pages array with at least one page', () => {
      const separator = createSeparatorEntry(1, 'ESTRADA DO CÃO-LUAR');
      expect(Array.isArray(separator.pages)).toBe(true);
      expect(separator.pages.length).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // Empty Slot Entry Tests
  // ==========================================

  describe('createEmptySlotEntry', () => {
    test('should create empty slot with correct structure', () => {
      const emptySlot = createEmptySlotEntry(12);

      expect(emptySlot).toHaveProperty('id');
      expect(emptySlot).toHaveProperty('name');
      expect(emptySlot).toHaveProperty('members');
      expect(emptySlot).toHaveProperty('pages');
    });

    test('should have empty name', () => {
      const emptySlot = createEmptySlotEntry(12);
      expect(emptySlot.name).toBe('');
    });

    test('should have empty members array', () => {
      const emptySlot = createEmptySlotEntry(12);
      expect(emptySlot.members).toEqual([]);
    });

    test('should have valid ID', () => {
      const emptySlot = createEmptySlotEntry(42);
      expect(emptySlot.id).toBe(42);
    });

    test('should have pages array with at least one page', () => {
      const emptySlot = createEmptySlotEntry(12);
      expect(Array.isArray(emptySlot.pages)).toBe(true);
      expect(emptySlot.pages.length).toBeGreaterThan(0);
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

    test('should generate correct structure with separators and empty slots', () => {
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

      // New structure includes all regions even with only world_map troops
      // null + world_map (separator + 2 troops + 10 empty slots) + other regions (3 separators + empty slots)
      // The function creates a 71-element array but filters out remaining nulls
      // So we get: null + 1 separator + 2 troops + 10 empty slots + 3 separators + 30 empty slots = 47 entries
      expect(troops.length).toBeGreaterThanOrEqual(13); // At minimum: null + separator + 2 troops + 10 empty slots
      expect(troops[0]).toBeNull();
      expect(troops[1].name).toBe('=== ESTRADA DO CÃO-LUAR ==='); // Separator
      expect(troops[2].id).toBe(2); // First troop remapped to ID 2
      expect(troops[3].id).toBe(3); // Second troop remapped to ID 3

      // Validate empty slots exist
      expect(troops[12].name).toBe(''); // Empty slot
      expect(troops[12].members).toEqual([]);
    });

    test('should remap troop IDs based on region position', () => {
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

      // World Map region starts at ID 2, so troops are remapped to IDs 2 and 3
      expect(troops[2].id).toBe(2);
      expect(troops[3].id).toBe(3);
      expect(troops[2].name).toBe('Lobo Jovem x2');
      expect(troops[3].name).toBe('Goblin Saqueador x2');
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

      // Validate generated troops with new structure
      expect(troops).toHaveLength(71); // null + 4 separators + 36 troops + 30 empty slots
      expect(troops[0]).toBeNull();

      // Count entry types
      let separatorCount = 0;
      let combatTroopCount = 0;
      let emptySlotCount = 0;

      for (let i = 1; i < troops.length; i++) {
        const troop = troops[i];
        expect(troop).toHaveProperty('id');
        expect(troop).toHaveProperty('name');
        expect(troop).toHaveProperty('members');
        expect(troop).toHaveProperty('pages');

        // Categorize entry type
        if (troop.name.match(/^=== .+ ===$/)) {
          separatorCount++;
        } else if (troop.name === '' && troop.members.length === 0) {
          emptySlotCount++;
        } else if (troop.members.length > 0) {
          combatTroopCount++;
        }
      }

      // Validate counts
      expect(separatorCount).toBe(4);
      expect(combatTroopCount).toBe(36);
      expect(emptySlotCount).toBe(30);
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
