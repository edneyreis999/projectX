/**
 * Troops.json Validation Test Suite
 *
 * Tests JSON structure, RPG Maker MZ schema compliance, cross-reference validation,
 * and regional organization of combat troops.
 */

const fs = require('fs');
const path = require('path');

describe('Troops.json Database Validation', () => {
  let troopsData;
  let enemiesData;
  const troopsPath = path.join(__dirname, '../../data/Troops.json');
  const enemiesPath = path.join(__dirname, '../../data/Enemies.json');

  beforeAll(() => {
    // Read and parse the Troops.json file
    const rawTroopsData = fs.readFileSync(troopsPath, 'utf8');
    troopsData = JSON.parse(rawTroopsData);

    // Read and parse the Enemies.json file for cross-reference
    const rawEnemiesData = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(rawEnemiesData);
  });

  // ==========================================
  // JSON Syntax and Structure
  // ==========================================

  describe('JSON Syntax and Structure', () => {
    test('JSON file is syntactically valid and parseable', () => {
      expect(troopsData).toBeDefined();
      expect(Array.isArray(troopsData)).toBe(true);
    });

    test('Array has exactly 71 elements (index 0 null + 70 entries)', () => {
      expect(troopsData.length).toBe(71);
    });

    test('Index 0 is null (RPG Maker MZ placeholder)', () => {
      expect(troopsData[0]).toBeNull();
    });
  });

  // ==========================================
  // Separator and Empty Slot Validation
  // ==========================================

  describe('Separator and Empty Slot Validation', () => {
    test('Separator entries are at correct IDs (1, 22, 43, 62)', () => {
      const separatorIds = [1, 22, 43, 62];
      const separatorNames = [
        '=== ESTRADA DO CÃO-LUAR ===',
        '=== MINAS DE KRAVENS ===',
        '=== ESGOTO DE GILDRAT ===',
        '=== RUÍNAS DE MELIOS ===',
      ];

      separatorIds.forEach((id, index) => {
        const troop = troopsData[id];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(id);
        expect(troop.name).toBe(separatorNames[index]);
        expect(troop.members).toEqual([]);
        expect(Array.isArray(troop.pages)).toBe(true);
        expect(troop.pages.length).toBeGreaterThan(0);
      });
    });

    test('Empty slot entries have correct structure (empty name, empty members)', () => {
      const emptySlotRanges = [
        [12, 21],
        [33, 42],
        [52, 61],
      ];

      emptySlotRanges.forEach(([start, end]) => {
        for (let i = start; i <= end; i++) {
          const troop = troopsData[i];
          expect(troop).toBeDefined();
          expect(troop.id).toBe(i);
          expect(troop.name).toBe('');
          expect(troop.members).toEqual([]);
          expect(Array.isArray(troop.pages)).toBe(true);
          expect(troop.pages.length).toBeGreaterThan(0);
        }
      });
    });

    test('Combat troops are at remapped IDs (2-11, 23-32, 44-51, 63-70)', () => {
      const combatTroopRanges = [
        [2, 11],
        [23, 32],
        [44, 51],
        [63, 70],
      ];

      combatTroopRanges.forEach(([start, end]) => {
        for (let i = start; i <= end; i++) {
          const troop = troopsData[i];
          expect(troop).toBeDefined();
          expect(troop.id).toBe(i);
          expect(troop.name).not.toBe('');
          expect(troop.name).not.toMatch(/^=== .+ ===$/);
          expect(troop.members.length).toBeGreaterThan(0);
        }
      });
    });

    test('Total counts: 4 separators + 36 combat troops + 30 empty slots = 70 entries', () => {
      let separatorCount = 0;
      let combatTroopCount = 0;
      let emptySlotCount = 0;

      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (troop.name.match(/^=== .+ ===$/)) {
          separatorCount++;
        } else if (troop.name === '' && troop.members.length === 0) {
          emptySlotCount++;
        } else if (troop.members.length > 0) {
          combatTroopCount++;
        }
      }

      expect(separatorCount).toBe(4);
      expect(combatTroopCount).toBe(36);
      expect(emptySlotCount).toBe(30);
    });
  });

  // ==========================================
  // RPG Maker MZ Troop Schema Compliance
  // ==========================================

  describe('RPG Maker MZ Troop Schema Compliance', () => {
    const requiredFields = ['id', 'name', 'members', 'pages'];

    test('All troop entries have required RPG Maker MZ fields', () => {
      // Skip index 0 (null placeholder)
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();

        requiredFields.forEach(field => {
          expect(troop).toHaveProperty(field);
        });
      }
    });

    test('All troops have valid id field matching array index', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(troop.id).toBe(i);
        expect(typeof troop.id).toBe('number');
      }
    });

    test('All troops have name field (string, may be empty for empty slots)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(typeof troop.name).toBe('string');
      }
    });

    test('All troops have members array (may be empty for separators and empty slots)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(Array.isArray(troop.members)).toBe(true);
      }
    });

    test('All troops have pages array with at least one page', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(Array.isArray(troop.pages)).toBe(true);
        expect(troop.pages.length).toBeGreaterThan(0);
      }
    });
  });

  // ==========================================
  // Member Structure Validation (Combat Troops Only)
  // ==========================================

  describe('Troop Member Structure Validation', () => {
    const requiredMemberFields = ['enemyId', 'x', 'y', 'hidden'];

    // Helper to check if entry is a combat troop
    const isCombatTroop = troop => troop.members.length > 0;

    test('All combat troop members have required fields (enemyId, x, y, hidden)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            requiredMemberFields.forEach(field => {
              expect(member).toHaveProperty(field);
            });
          });
        }
      }
    });

    test('All combat troop members have valid enemyId (number > 0)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(typeof member.enemyId).toBe('number');
            expect(member.enemyId).toBeGreaterThan(0);
          });
        }
      }
    });

    test('All combat troop members have valid x coordinate (within canvas bounds 0-640+)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(typeof member.x).toBe('number');
            expect(member.x).toBeGreaterThanOrEqual(0);
            // Allow some overflow beyond 640 for formations with many enemies
          });
        }
      }
    });

    test('All combat troop members have valid y coordinate (within canvas bounds 0-480)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(typeof member.y).toBe('number');
            expect(member.y).toBeGreaterThanOrEqual(0);
            expect(member.y).toBeLessThanOrEqual(480);
          });
        }
      }
    });

    test('All combat troop members have Y coordinate fixed at 436 (battle UI baseline)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(member.y).toBe(436);
          });
        }
      }
    });

    test('All combat troop members have hidden field as boolean', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(typeof member.hidden).toBe('boolean');
          });
        }
      }
    });

    test('No combat troop members are hidden (all should be visible initially)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            expect(member.hidden).toBe(false);
          });
        }
      }
    });
  });

  // ==========================================
  // Position Calculation Validation (Combat Troops Only)
  // ==========================================

  describe('Position Calculation Validation', () => {
    const isCombatTroop = troop => troop && troop.members.length > 0;

    test('Combat troops with same count have consistent spacing', () => {
      const combatTroopsWithTwo = troopsData.filter(t => isCombatTroop(t) && t.members.length === 2);
      if (combatTroopsWithTwo.length > 0) {
        const firstTroop = combatTroopsWithTwo[0];
        const expectedSpacing = firstTroop.members[1].x - firstTroop.members[0].x;

        combatTroopsWithTwo.forEach(troop => {
          const spacing = troop.members[1].x - troop.members[0].x;
          expect(spacing).toBe(expectedSpacing);
        });
      }
    });

    test('First member of combat troops starts at X position 227', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          expect(troop.members[0].x).toBe(227);
        }
      }
    });

    test('Combat troop members are positioned with 127px spacing', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          for (let j = 1; j < troop.members.length; j++) {
            const spacing = troop.members[j].x - troop.members[j - 1].x;
            expect(spacing).toBe(127);
          }
        }
      }
    });
  });

  // ==========================================
  // Battle Event Pages Validation
  // ==========================================

  describe('Battle Event Pages Validation', () => {
    test('All pages have required structure (conditions, list, span)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        troop.pages.forEach(page => {
          expect(page).toHaveProperty('conditions');
          expect(page).toHaveProperty('list');
          expect(page).toHaveProperty('span');
        });
      }
    });

    test('All pages have empty event list (code: 0)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        troop.pages.forEach(page => {
          expect(Array.isArray(page.list)).toBe(true);
          expect(page.list.length).toBeGreaterThan(0);
          expect(page.list[0].code).toBe(0);
          expect(page.list[0].indent).toBe(0);
          expect(page.list[0].parameters).toEqual([]);
        });
      }
    });

    test('All pages have span set to 0', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        troop.pages.forEach(page => {
          expect(page.span).toBe(0);
        });
      }
    });

    test('All pages have valid conditions structure', () => {
      const requiredConditionFields = ['actorHp', 'actorId', 'actorValid', 'enemyHp', 'enemyIndex', 'enemyValid', 'switchId', 'switchValid', 'turnA', 'turnB', 'turnEnding', 'turnValid'];

      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        troop.pages.forEach(page => {
          requiredConditionFields.forEach(field => {
            expect(page.conditions).toHaveProperty(field);
          });
        });
      }
    });
  });

  // ==========================================
  // Cross-Reference Validation (Troops ↔ Enemies)
  // ==========================================

  describe('Cross-Reference Validation with Enemies.json', () => {
    const isCombatTroop = troop => troop && troop.members.length > 0;

    test('All enemy IDs in combat troops exist in Enemies.json', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            const enemy = enemiesData[member.enemyId];
            expect(enemy).toBeDefined();
            expect(enemy).not.toBeNull();
            expect(enemy.name).toBeTruthy(); // Enemy should have a name
          });
        }
      }
    });

    test('No combat troops reference separator entries (=== REGION ===)', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            const enemy = enemiesData[member.enemyId];
            expect(enemy.name).not.toMatch(/^=== .+ ===$/);
          });
        }
      }
    });

    test('No combat troops reference empty enemy slots', () => {
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        if (isCombatTroop(troop)) {
          troop.members.forEach(member => {
            const enemy = enemiesData[member.enemyId];
            expect(enemy.name).not.toBe('');
          });
        }
      }
    });
  });

  // ==========================================
  // Regional Organization Validation
  // ==========================================

  describe('Regional Organization Validation', () => {
    test('Region 1: World Map section has separator (ID 1), combat troops (IDs 2-11), and empty slots (IDs 12-21)', () => {
      // Separator
      expect(troopsData[1].name).toBe('=== ESTRADA DO CÃO-LUAR ===');

      // Combat troops
      for (let i = 2; i <= 11; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.members.length).toBeGreaterThan(0);
      }

      // Empty slots
      for (let i = 12; i <= 21; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.name).toBe('');
        expect(troop.members).toEqual([]);
      }
    });

    test('Region 2: Kravens section has separator (ID 22), combat troops (IDs 23-32), and empty slots (IDs 33-42)', () => {
      // Separator
      expect(troopsData[22].name).toBe('=== MINAS DE KRAVENS ===');

      // Combat troops
      for (let i = 23; i <= 32; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.members.length).toBeGreaterThan(0);
      }

      // Empty slots
      for (let i = 33; i <= 42; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.name).toBe('');
        expect(troop.members).toEqual([]);
      }
    });

    test('Region 3: Esgoto section has separator (ID 43), combat troops (IDs 44-51), and empty slots (IDs 52-61)', () => {
      // Separator
      expect(troopsData[43].name).toBe('=== ESGOTO DE GILDRAT ===');

      // Combat troops
      for (let i = 44; i <= 51; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.members.length).toBeGreaterThan(0);
      }

      // Empty slots
      for (let i = 52; i <= 61; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.name).toBe('');
        expect(troop.members).toEqual([]);
      }
    });

    test('Region 4: Melios section has separator (ID 62) and combat troops (IDs 63-70)', () => {
      // Separator
      expect(troopsData[62].name).toBe('=== RUÍNAS DE MELIOS ===');

      // Combat troops
      for (let i = 63; i <= 70; i++) {
        const troop = troopsData[i];
        expect(troop).toBeDefined();
        expect(troop.id).toBe(i);
        expect(troop.members.length).toBeGreaterThan(0);
      }
    });

    test('No duplicate troop IDs exist', () => {
      const ids = new Set();
      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];
        expect(ids.has(troop.id)).toBe(false);
        ids.add(troop.id);
      }
    });
  });

  // ==========================================
  // Naming Convention Validation (Combat Troops Only)
  // ==========================================

  describe('Naming Convention Validation', () => {
    const isCombatTroop = troop => troop && troop.members.length > 0;

    test('Single enemy type combat troops follow "[Enemy] x[Count]" format', () => {
      const singleTypePattern = /^.+ x\d+$/;

      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];

        if (isCombatTroop(troop)) {
          // Get unique enemy IDs in this troop
          const uniqueEnemyIds = new Set(troop.members.map(m => m.enemyId));

          // If single enemy type with count > 1, should match pattern
          if (uniqueEnemyIds.size === 1 && troop.members.length > 1) {
            expect(troop.name).toMatch(singleTypePattern);
          }
        }
      }
    });

    test('Boss combat troops (single enemy) do not include "x1" suffix', () => {
      const bossNames = ['Cristaleão', 'Pestesporo', 'Corvos de Melios', 'Guardião Colossal'];

      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];

        if (isCombatTroop(troop) && bossNames.some(name => troop.name.includes(name))) {
          // Boss troops should not have "x1" suffix
          expect(troop.name).not.toMatch(/x1$/);
        }
      }
    });

    test('Mixed composition combat troops follow "[Enemy1] x[N] + [Enemy2] x[M]" format', () => {
      const mixedPattern = /^.+ x\d+ \+ .+ x\d+$/;

      for (let i = 1; i < troopsData.length; i++) {
        const troop = troopsData[i];

        if (isCombatTroop(troop)) {
          // Get unique enemy IDs in this troop
          const uniqueEnemyIds = new Set(troop.members.map(m => m.enemyId));

          // If multiple enemy types, should match mixed pattern
          if (uniqueEnemyIds.size > 1) {
            expect(troop.name).toMatch(mixedPattern);
          }
        }
      }
    });
  });

  // ==========================================
  // Regional Enemy ID Validation
  // ==========================================

  describe('Regional Enemy ID Validation', () => {
    test('World Map troops (IDs 2-11) use World Map enemies (IDs 2-6)', () => {
      const worldMapEnemyIds = [2, 3, 4, 5, 6]; // Lobo Jovem, Goblin, Lobo de Gelo, Bandido, Lobo Alpha

      for (let i = 2; i <= 11; i++) {
        const troop = troopsData[i];
        troop.members.forEach(member => {
          expect(worldMapEnemyIds).toContain(member.enemyId);
        });
      }
    });

    test('Kravens troops (IDs 23-32) use Kravens enemies (IDs 13-17)', () => {
      const kravensEnemyIds = [13, 14, 15, 16, 17]; // Morcego, Aranha Mineira, Aranha Gigante, Rato Mutante, Cristaleão

      for (let i = 23; i <= 32; i++) {
        const troop = troopsData[i];
        troop.members.forEach(member => {
          expect(kravensEnemyIds).toContain(member.enemyId);
        });
      }
    });

    test('Esgoto troops (IDs 44-51) use Esgoto enemies (IDs 24-28)', () => {
      const esgotoEnemyIds = [24, 25, 26, 27, 28]; // Rato de Esgoto, Limo Ácido, Fungo, Gosma, Pestesporo

      for (let i = 44; i <= 51; i++) {
        const troop = troopsData[i];
        troop.members.forEach(member => {
          expect(esgotoEnemyIds).toContain(member.enemyId);
        });
      }
    });

    test('Melios troops (IDs 63-70) use Melios enemies (IDs 35-40)', () => {
      const meliosEnemyIds = [35, 36, 37, 38, 39, 40]; // Guardião Menor, Elemental, Guardião Ancião, Sombra, Corvos, Guardião Colossal

      for (let i = 63; i <= 70; i++) {
        const troop = troopsData[i];
        troop.members.forEach(member => {
          expect(meliosEnemyIds).toContain(member.enemyId);
        });
      }
    });
  });

  // ==========================================
  // Prettier Formatting Compliance
  // ==========================================

  describe('Prettier Formatting Compliance', () => {
    test('File is formatted according to Prettier configuration', () => {
      // Read the raw file content
      const rawContent = fs.readFileSync(troopsPath, 'utf8');

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
});
