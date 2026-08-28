/**
 * Troop Definitions Validation Test Suite
 * Tests troop composition structure, PRD compliance, and cross-reference with Enemies.json
 */

const fs = require('fs');
const path = require('path');
const troopDefinitions = require('../../scripts/troop-definitions');

describe('Troop Definitions Module', () => {
  let enemiesData;

  beforeAll(() => {
    // Load Enemies.json for cross-reference validation
    const enemiesPath = path.join(__dirname, '../../data/Enemies.json');
    const rawData = fs.readFileSync(enemiesPath, 'utf8');
    enemiesData = JSON.parse(rawData);
  });

  test('UT-042: physical Troop 19 ownership names one Mhordred without changing logical Kravens ID 19', () => {
    expect(troopDefinitions[18]).toMatchObject({ id: 19, region: 'kravens' });
    expect(troopDefinitions.physical).toEqual([
      { physicalId: 19, name: 'Mhordred', region: 'semifinal', members: [{ enemyName: 'Mhordred', count: 1 }] },
    ]);
  });

  // ==========================================
  // UNIT TESTS: Module Structure
  // ==========================================
  describe('Module Structure', () => {
    test('module exports an array with exactly 36 troop definitions', () => {
      expect(Array.isArray(troopDefinitions)).toBe(true);
      expect(troopDefinitions.length).toBe(36);
    });

    test('all troop definitions have required fields (id, name, region, members)', () => {
      troopDefinitions.forEach(troop => {
        expect(troop).toHaveProperty('id');
        expect(troop).toHaveProperty('name');
        expect(troop).toHaveProperty('region');
        expect(troop).toHaveProperty('members');
      });
    });

    test('all id values are numbers', () => {
      troopDefinitions.forEach(troop => {
        expect(typeof troop.id).toBe('number');
        expect(Number.isInteger(troop.id)).toBe(true);
      });
    });

    test('all name values are non-empty strings', () => {
      troopDefinitions.forEach(troop => {
        expect(typeof troop.name).toBe('string');
        expect(troop.name.length).toBeGreaterThan(0);
      });
    });

    test('all region values are valid identifiers', () => {
      const validRegions = ['world_map', 'kravens', 'esgoto', 'melios'];
      troopDefinitions.forEach(troop => {
        expect(validRegions).toContain(troop.region);
      });
    });

    test('all members arrays are non-empty', () => {
      troopDefinitions.forEach(troop => {
        expect(Array.isArray(troop.members)).toBe(true);
        expect(troop.members.length).toBeGreaterThan(0);
      });
    });
  });

  // ==========================================
  // UNIT TESTS: ID Validation
  // ==========================================
  describe('ID Validation', () => {
    test('troop IDs are sequential from 1 to 36', () => {
      troopDefinitions.forEach((troop, index) => {
        expect(troop.id).toBe(index + 1);
      });
    });

    test('no duplicate troop IDs exist', () => {
      const ids = troopDefinitions.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('troop IDs follow PRD ranges by region', () => {
      const worldMapTroops = troopDefinitions.filter(t => t.region === 'world_map');
      const kravensTroops = troopDefinitions.filter(t => t.region === 'kravens');
      const esgotoTroops = troopDefinitions.filter(t => t.region === 'esgoto');
      const meliosTroops = troopDefinitions.filter(t => t.region === 'melios');

      // World Map: IDs 1-10
      worldMapTroops.forEach(t => {
        expect(t.id).toBeGreaterThanOrEqual(1);
        expect(t.id).toBeLessThanOrEqual(10);
      });

      // Kravens: IDs 11-20
      kravensTroops.forEach(t => {
        expect(t.id).toBeGreaterThanOrEqual(11);
        expect(t.id).toBeLessThanOrEqual(20);
      });

      // Esgoto: IDs 21-28
      esgotoTroops.forEach(t => {
        expect(t.id).toBeGreaterThanOrEqual(21);
        expect(t.id).toBeLessThanOrEqual(28);
      });

      // Melios: IDs 29-36
      meliosTroops.forEach(t => {
        expect(t.id).toBeGreaterThanOrEqual(29);
        expect(t.id).toBeLessThanOrEqual(36);
      });
    });
  });

  // ==========================================
  // UNIT TESTS: Naming Convention
  // ==========================================
  describe('Naming Convention', () => {
    test('all troop names follow naming convention', () => {
      const singleEnemyPattern = /^.+ x\d+$/; // "Enemy Name x3"
      const mixedEnemyPattern = /^.+ x\d+ \+ .+ x\d+$/; // "Enemy1 x2 + Enemy2 x1"
      const bossPattern = /^[^x]+$/; // Boss names without "x" (e.g., "Cristaleão")

      troopDefinitions.forEach(troop => {
        const isSingleEnemy = singleEnemyPattern.test(troop.name);
        const isMixedEnemy = mixedEnemyPattern.test(troop.name);
        const isBoss = bossPattern.test(troop.name) && troop.members.length === 1 && troop.members[0].count === 1;

        expect(isSingleEnemy || isMixedEnemy || isBoss).toBe(true);
      });
    });

    test('boss troops do NOT include "x1" suffix in name', () => {
      const bossTroops = ['Cristaleão', 'Pestesporo', 'Corvos de Melios', 'Guardião Colossal'];

      bossTroops.forEach(bossName => {
        const bossTroop = troopDefinitions.find(t => t.name === bossName);
        expect(bossTroop).toBeDefined();
        expect(bossTroop.name).not.toMatch(/x1$/);
      });
    });

    test('non-boss single-enemy troops include count in name', () => {
      troopDefinitions.forEach(troop => {
        const isBoss = troop.members.length === 1 && ['Cristaleão', 'Pestesporo', 'Corvos de Melios', 'Guardião Colossal'].includes(troop.name);

        if (troop.members.length === 1 && !isBoss) {
          expect(troop.name).toMatch(/x\d+$/);
        }
      });
    });
  });

  // ==========================================
  // UNIT TESTS: Member Structure
  // ==========================================
  describe('Member Structure', () => {
    test('each member object has enemyName (string) and count (number > 0)', () => {
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(member).toHaveProperty('enemyName');
          expect(member).toHaveProperty('count');
          expect(typeof member.enemyName).toBe('string');
          expect(typeof member.count).toBe('number');
          expect(member.count).toBeGreaterThan(0);
        });
      });
    });

    test('no member has negative or zero count values', () => {
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(member.count).toBeGreaterThan(0);
        });
      });
    });

    test('no trailing/leading whitespace in enemyName values', () => {
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(member.enemyName).toBe(member.enemyName.trim());
        });
      });
    });
  });

  // ==========================================
  // UNIT TESTS: Boss Troops
  // ==========================================
  describe('Boss Troops', () => {
    const bossTroops = [
      { name: 'Cristaleão', id: 20, region: 'kravens' },
      { name: 'Pestesporo', id: 28, region: 'esgoto' },
      { name: 'Corvos de Melios', id: 35, region: 'melios' },
      { name: 'Guardião Colossal', id: 36, region: 'melios' },
    ];

    test.each(bossTroops)('boss troop $name (ID $id) is solo with single member count: 1', ({ name, id }) => {
      const troop = troopDefinitions.find(t => t.id === id);
      expect(troop).toBeDefined();
      expect(troop.name).toBe(name);
      expect(troop.members.length).toBe(1);
      expect(troop.members[0].count).toBe(1);
    });
  });

  // ==========================================
  // INTEGRATION TESTS: Cross-Reference with Enemies.json
  // ==========================================
  describe('Cross-Reference with Enemies.json', () => {
    test('all enemyName values exist in Enemies.json (exact string match)', () => {
      const enemyNames = enemiesData.slice(1).map(enemy => enemy.name);

      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(enemyNames).toContain(member.enemyName);
        });
      });
    });

    test('enemy names are spelled correctly with proper accents', () => {
      const expectedNames = [
        'Lobo Jovem',
        'Goblin Saqueador',
        'Lobo de Gelo',
        'Bandido Anão Renegado',
        'Lobo Alpha de Gelo',
        'Morcego de Caverna',
        'Aranha Mineira',
        'Aranha Gigante',
        'Rato Gigante Mutante',
        'Cristaleão',
        'Rato de Esgoto',
        'Limo Ácido',
        'Fungo Venenoso Gigante',
        'Gosma Tóxica',
        'Pestesporo',
        'Guardião Menor de Pedra',
        'Elemental de Terra',
        'Guardião Ancião',
        'Sombra Errante',
        'Corvos de Melios',
        'Guardião Colossal',
      ];

      const usedNames = new Set();
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          usedNames.add(member.enemyName);
        });
      });

      usedNames.forEach(name => {
        expect(expectedNames).toContain(name);
      });
    });
  });

  // ==========================================
  // INTEGRATION TESTS: PRD Compliance
  // ==========================================
  describe('PRD Compliance', () => {
    test('total troop count per region matches PRD organization (10+10+8+8=36 troops)', () => {
      const worldMapCount = troopDefinitions.filter(t => t.region === 'world_map').length;
      const kravensCount = troopDefinitions.filter(t => t.region === 'kravens').length;
      const esgotoCount = troopDefinitions.filter(t => t.region === 'esgoto').length;
      const meliosCount = troopDefinitions.filter(t => t.region === 'melios').length;

      expect(worldMapCount).toBe(10);
      expect(kravensCount).toBe(10);
      expect(esgotoCount).toBe(8);
      expect(meliosCount).toBe(8);
      expect(worldMapCount + kravensCount + esgotoCount + meliosCount).toBe(36);
    });

    test('Region 1 (World Map) troop compositions match PRD specifications', () => {
      const worldMapTroops = troopDefinitions.filter(t => t.region === 'world_map');

      // Check for required enemy types in compositions
      const hasLoboJovem = worldMapTroops.some(t => t.members.some(m => m.enemyName === 'Lobo Jovem'));
      const hasGoblin = worldMapTroops.some(t => t.members.some(m => m.enemyName === 'Goblin Saqueador'));
      const hasLoboGelo = worldMapTroops.some(t => t.members.some(m => m.enemyName === 'Lobo de Gelo'));
      const hasBandido = worldMapTroops.some(t => t.members.some(m => m.enemyName === 'Bandido Anão Renegado'));
      const hasLoboAlpha = worldMapTroops.some(t => t.members.some(m => m.enemyName === 'Lobo Alpha de Gelo'));

      expect(hasLoboJovem).toBe(true);
      expect(hasGoblin).toBe(true);
      expect(hasLoboGelo).toBe(true);
      expect(hasBandido).toBe(true);
      expect(hasLoboAlpha).toBe(true);
    });

    test('Region 2 (Kravens) troop compositions match PRD specifications', () => {
      const kravensTroops = troopDefinitions.filter(t => t.region === 'kravens');

      const hasMorcego = kravensTroops.some(t => t.members.some(m => m.enemyName === 'Morcego de Caverna'));
      const hasAranhaMineira = kravensTroops.some(t => t.members.some(m => m.enemyName === 'Aranha Mineira'));
      const hasAranhaGigante = kravensTroops.some(t => t.members.some(m => m.enemyName === 'Aranha Gigante'));
      const hasRatoMutante = kravensTroops.some(t => t.members.some(m => m.enemyName === 'Rato Gigante Mutante'));
      const hasCristaleao = kravensTroops.some(t => t.members.some(m => m.enemyName === 'Cristaleão'));

      expect(hasMorcego).toBe(true);
      expect(hasAranhaMineira).toBe(true);
      expect(hasAranhaGigante).toBe(true);
      expect(hasRatoMutante).toBe(true);
      expect(hasCristaleao).toBe(true);
    });

    test('Region 3 (Esgoto) troop compositions match PRD specifications', () => {
      const esgotoTroops = troopDefinitions.filter(t => t.region === 'esgoto');

      const hasRatoEsgoto = esgotoTroops.some(t => t.members.some(m => m.enemyName === 'Rato de Esgoto'));
      const hasLimo = esgotoTroops.some(t => t.members.some(m => m.enemyName === 'Limo Ácido'));
      const hasFungo = esgotoTroops.some(t => t.members.some(m => m.enemyName === 'Fungo Venenoso Gigante'));
      const hasGosma = esgotoTroops.some(t => t.members.some(m => m.enemyName === 'Gosma Tóxica'));
      const hasPestesporo = esgotoTroops.some(t => t.members.some(m => m.enemyName === 'Pestesporo'));

      expect(hasRatoEsgoto).toBe(true);
      expect(hasLimo).toBe(true);
      expect(hasFungo).toBe(true);
      expect(hasGosma).toBe(true);
      expect(hasPestesporo).toBe(true);
    });

    test('Region 4 (Melios) troop compositions match PRD specifications', () => {
      const meliosTroops = troopDefinitions.filter(t => t.region === 'melios');

      const hasGuardiaoMenor = meliosTroops.some(t => t.members.some(m => m.enemyName === 'Guardião Menor de Pedra'));
      const hasElemental = meliosTroops.some(t => t.members.some(m => m.enemyName === 'Elemental de Terra'));
      const hasSombra = meliosTroops.some(t => t.members.some(m => m.enemyName === 'Sombra Errante'));
      const hasCorvos = meliosTroops.some(t => t.members.some(m => m.enemyName === 'Corvos de Melios'));
      const hasGuardiaoColossal = meliosTroops.some(t => t.members.some(m => m.enemyName === 'Guardião Colossal'));

      expect(hasGuardiaoMenor).toBe(true);
      expect(hasElemental).toBe(true);
      expect(hasSombra).toBe(true);
      expect(hasCorvos).toBe(true);
      expect(hasGuardiaoColossal).toBe(true);
    });
  });

  // ==========================================
  // EDGE CASES AND ERROR PATHS
  // ==========================================
  describe('Edge Cases and Error Paths', () => {
    test('no empty members arrays (all troops have at least one member)', () => {
      troopDefinitions.forEach(troop => {
        expect(troop.members.length).toBeGreaterThan(0);
      });
    });

    test('no negative count values in members', () => {
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(member.count).toBeGreaterThan(0);
        });
      });
    });

    test('all count values are integers', () => {
      troopDefinitions.forEach(troop => {
        troop.members.forEach(member => {
          expect(Number.isInteger(member.count)).toBe(true);
        });
      });
    });

    test('no duplicate enemy names within same troop composition', () => {
      troopDefinitions.forEach(troop => {
        const enemyNames = troop.members.map(m => m.enemyName);
        const uniqueNames = new Set(enemyNames);
        expect(uniqueNames.size).toBe(enemyNames.length);
      });
    });
  });

  // ==========================================
  // MODULE EXPORTS
  // ==========================================
  describe('Module Exports', () => {
    test('module successfully loads via Node.js require() without errors', () => {
      expect(() => {
        require('../../scripts/troop-definitions');
      }).not.toThrow();
    });

    test('module exports an array (not a function or plain object)', () => {
      const exported = require('../../scripts/troop-definitions');
      expect(Array.isArray(exported)).toBe(true);
      expect(typeof exported).not.toBe('function');
      // Arrays are objects in JS (typeof [] === 'object'), but we verify it's an array with Array.isArray
    });
  });
});
