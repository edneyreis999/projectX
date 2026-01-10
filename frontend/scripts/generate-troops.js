#!/usr/bin/env node

/**
 * Troops Generation Script
 *
 * Generates the complete Troops.json file by processing troop definitions from troop-definitions.js.
 * Reads Enemies.json to resolve enemy names to IDs, calculates positions using RPG Maker MZ
 * canvas coordinates, and outputs a formatted Troops.json file with 36 combat troops organized
 * by region (IDs 1-36).
 *
 * Usage: node frontend/scripts/generate-troops.js
 */

const fs = require('fs');
const path = require('path');

// ==========================================
// Configuration
// ==========================================

const PATHS = {
  enemies: path.join(__dirname, '../data/Enemies.json'),
  definitions: path.join(__dirname, './troop-definitions.js'),
  output: path.join(__dirname, '../data/Troops.json'),
};

const POSITION_CONFIG = {
  startX: 227,
  spacing: 127,
  fixedY: 436,
};

// ==========================================
// Position Calculation
// ==========================================

/**
 * Calculates RPG Maker MZ battle positions for a given number of enemies.
 * Positions are distributed uniformly on a 640x480 canvas.
 *
 * @param {number} memberCount - Number of enemy members in the troop
 * @returns {Array<{x: number, y: number}>} Array of position objects
 */
function calculatePositions(memberCount) {
  return Array.from({ length: memberCount }, (_, i) => ({
    x: POSITION_CONFIG.startX + i * POSITION_CONFIG.spacing,
    y: POSITION_CONFIG.fixedY,
  }));
}

// ==========================================
// Enemy Name Resolution
// ==========================================

/**
 * Builds a mapping of enemy names to their IDs from Enemies.json.
 * Excludes separator entries (empty names or section headers).
 *
 * @param {Array} enemies - Enemies array from Enemies.json
 * @returns {Map<string, number>} Map of enemy name to enemy ID
 */
function buildEnemyNameMapping(enemies) {
  const mapping = new Map();

  enemies.forEach((enemy, index) => {
    if (!enemy || !enemy.name) return;

    // Skip separator entries (section headers starting with "===")
    if (enemy.name.startsWith('===')) return;

    // Skip empty entries
    if (enemy.name.trim() === '') return;

    mapping.set(enemy.name, index);
  });

  return mapping;
}

/**
 * Resolves an enemy name to its ID using the provided mapping.
 *
 * @param {string} enemyName - Name of the enemy to resolve
 * @param {Map<string, number>} nameMapping - Enemy name to ID mapping
 * @param {string} troopName - Name of the troop (for error context)
 * @returns {number} The enemy ID
 * @throws {Error} If enemy name is not found in mapping
 */
function resolveEnemyId(enemyName, nameMapping, troopName) {
  const enemyId = nameMapping.get(enemyName);

  if (enemyId === undefined) {
    throw new Error(`Enemy "${enemyName}" not found in Enemies.json (referenced in troop "${troopName}")`);
  }

  return enemyId;
}

// ==========================================
// Troop Generation
// ==========================================

/**
 * Creates an empty RPG Maker MZ battle event page structure.
 *
 * @returns {Object} Battle event page object
 */
function createEmptyBattlePage() {
  return {
    conditions: {
      actorHp: 50,
      actorId: 1,
      actorValid: false,
      enemyHp: 50,
      enemyIndex: 0,
      enemyValid: false,
      switchId: 1,
      switchValid: false,
      turnA: 0,
      turnB: 0,
      turnEnding: false,
      turnValid: false,
    },
    list: [{ code: 0, indent: 0, parameters: [] }],
    span: 0,
  };
}

/**
 * Creates a separator entry for regional organization.
 *
 * @param {number} id - The ID for the separator entry
 * @param {string} regionName - The region name (e.g., "ESTRADA DO CÃO-LUAR")
 * @returns {Object} Separator troop object
 */
function createSeparatorEntry(id, regionName) {
  return {
    id,
    name: `=== ${regionName} ===`,
    members: [],
    pages: [createEmptyBattlePage()],
  };
}

/**
 * Creates an empty slot entry for future troop additions.
 *
 * @param {number} id - The ID for the empty slot entry
 * @returns {Object} Empty slot troop object
 */
function createEmptySlotEntry(id) {
  return {
    id,
    name: '',
    members: [],
    pages: [createEmptyBattlePage()],
  };
}

/**
 * Generates a single troop object in RPG Maker MZ format.
 *
 * @param {Object} definition - Troop definition from troop-definitions.js
 * @param {Map<string, number>} nameMapping - Enemy name to ID mapping
 * @returns {Object} Generated troop object
 */
function generateTroop(definition, nameMapping) {
  const { id, name, members: memberDefs } = definition;

  // Calculate total member count
  const totalMembers = memberDefs.reduce((sum, def) => sum + def.count, 0);

  // Calculate positions
  const positions = calculatePositions(totalMembers);

  // Build members array
  const members = [];
  let positionIndex = 0;

  for (const memberDef of memberDefs) {
    const enemyId = resolveEnemyId(memberDef.enemyName, nameMapping, name);

    for (let i = 0; i < memberDef.count; i++) {
      const position = positions[positionIndex++];
      members.push({
        enemyId,
        x: position.x,
        y: position.y,
        hidden: false,
      });
    }
  }

  // Return complete troop object
  return {
    id,
    name,
    members,
    pages: [createEmptyBattlePage()],
  };
}

/**
 * Generates all troops from definitions array with regional separators and empty slots.
 *
 * New structure:
 * - ID 1: Separator "=== ESTRADA DO CÃO-LUAR ==="
 * - IDs 2-11: 10 World Map troops (remapped from logical IDs 1-10)
 * - IDs 12-21: 10 empty slots
 * - ID 22: Separator "=== MINAS DE KRAVENS ==="
 * - IDs 23-32: 10 Kravens troops (remapped from logical IDs 11-20)
 * - IDs 33-42: 10 empty slots
 * - ID 43: Separator "=== ESGOTO DE GILDRAT ==="
 * - IDs 44-51: 8 Esgoto troops (remapped from logical IDs 21-28)
 * - IDs 52-61: 10 empty slots
 * - ID 62: Separator "=== RUÍNAS DE MELIOS ==="
 * - IDs 63-70: 8 Melios troops (remapped from logical IDs 29-36)
 * Total: 71 entries (null + 70 entries)
 *
 * @param {Array} definitions - Array of troop definitions
 * @param {Map<string, number>} nameMapping - Enemy name to ID mapping
 * @returns {Array} Array of generated troops (with null at index 0)
 */
function generateAllTroops(definitions, nameMapping) {
  const troops = [null]; // RPG Maker MZ index 0 placeholder

  // Regional configuration
  const regions = [
    {
      name: 'ESTRADA DO CÃO-LUAR',
      key: 'world_map',
      separatorId: 1,
      startId: 2,
      count: 10,
      emptySlotStart: 12,
      emptySlotCount: 10,
    },
    {
      name: 'MINAS DE KRAVENS',
      key: 'kravens',
      separatorId: 22,
      startId: 23,
      count: 10,
      emptySlotStart: 33,
      emptySlotCount: 10,
    },
    {
      name: 'ESGOTO DE GILDRAT',
      key: 'esgoto',
      separatorId: 43,
      startId: 44,
      count: 8,
      emptySlotStart: 52,
      emptySlotCount: 10,
    },
    {
      name: 'RUÍNAS DE MELIOS',
      key: 'melios',
      separatorId: 62,
      startId: 63,
      count: 8,
      emptySlotStart: null, // Last region has no empty slots after it
      emptySlotCount: 0,
    },
  ];

  // Build troops array up to ID 70
  const troopsById = new Array(71).fill(null);
  troopsById[0] = null; // RPG Maker MZ placeholder

  // Process each region
  for (const region of regions) {
    // Add separator
    troopsById[region.separatorId] = createSeparatorEntry(region.separatorId, region.name);

    // Get troop definitions for this region
    const regionDefinitions = definitions.filter(def => def.region === region.key);

    // Generate troops with remapped IDs
    regionDefinitions.forEach((definition, index) => {
      const remappedId = region.startId + index;
      const troop = generateTroop(definition, nameMapping);
      troop.id = remappedId; // Remap ID to new position
      troopsById[remappedId] = troop;
    });

    // Add empty slots (if this region has them)
    if (region.emptySlotCount > 0) {
      for (let i = 0; i < region.emptySlotCount; i++) {
        const emptySlotId = region.emptySlotStart + i;
        troopsById[emptySlotId] = createEmptySlotEntry(emptySlotId);
      }
    }
  }

  // Filter out any remaining nulls and return
  return troopsById.filter((troop, index) => index === 0 || troop !== null);
}

// ==========================================
// File I/O
// ==========================================

/**
 * Reads and parses a JSON file.
 *
 * @param {string} filePath - Path to JSON file
 * @returns {any} Parsed JSON data
 * @throws {Error} If file cannot be read or parsed
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read ${filePath}: ${error.message}`);
  }
}

/**
 * Writes data to a JSON file with Prettier-compatible formatting.
 *
 * @param {string} filePath - Path to output file
 * @param {any} data - Data to write
 * @throws {Error} If file cannot be written
 */
function writeJsonFile(filePath, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, json + '\n', 'utf8');
  } catch (error) {
    throw new Error(`Failed to write ${filePath}: ${error.message}`);
  }
}

// ==========================================
// Logging & Summary
// ==========================================

/**
 * Generates and logs a summary of troops created per region.
 *
 * @param {Array} definitions - Array of troop definitions
 * @param {Array} troops - Generated troops array
 */
function logGenerationSummary(definitions, troops) {
  const regionCounts = {
    world_map: 0,
    kravens: 0,
    esgoto: 0,
    melios: 0,
  };

  for (const def of definitions) {
    regionCounts[def.region]++;
  }

  console.log('\n✓ Troops generation complete!');
  console.log('\nSummary by region (with new organizational structure):');
  console.log(`  World Map (IDs 2-11):      ${regionCounts.world_map} troops + separator (ID 1) + 10 empty slots (IDs 12-21)`);
  console.log(`  Kravens (IDs 23-32):       ${regionCounts.kravens} troops + separator (ID 22) + 10 empty slots (IDs 33-42)`);
  console.log(`  Esgoto (IDs 44-51):        ${regionCounts.esgoto} troops + separator (ID 43) + 10 empty slots (IDs 52-61)`);
  console.log(`  Melios (IDs 63-70):        ${regionCounts.melios} troops + separator (ID 62)`);
  console.log(`\n  Total entries:             ${troops.length} (null placeholder + 4 separators + ${definitions.length} troops + 30 empty slots)`);
  console.log(`  Combat troops:             ${definitions.length}`);
  console.log(`  Separators:                4`);
  console.log(`  Empty slots:               30`);
  console.log(`\nOutput written to: ${PATHS.output}\n`);
}

// ==========================================
// Main Execution
// ==========================================

/**
 * Main script execution function.
 */
function main() {
  try {
    console.log('Starting troops generation...\n');

    // Step 1: Read Enemies.json
    console.log('Reading Enemies.json...');
    const enemies = readJsonFile(PATHS.enemies);
    console.log(`✓ Loaded ${enemies.length} enemy entries`);

    // Step 2: Build enemy name mapping
    console.log('Building enemy name mapping...');
    const nameMapping = buildEnemyNameMapping(enemies);
    console.log(`✓ Mapped ${nameMapping.size} valid enemies`);

    // Step 3: Read troop definitions
    console.log('Reading troop definitions...');
    const definitions = require(PATHS.definitions);
    console.log(`✓ Loaded ${definitions.length} troop definitions`);

    // Step 4: Validate troop definitions
    console.log('Validating troop definitions...');
    for (const def of definitions) {
      for (const member of def.members) {
        resolveEnemyId(member.enemyName, nameMapping, def.name);
      }
    }
    console.log('✓ All enemy names validated');

    // Step 5: Generate troops
    console.log('Generating troop objects...');
    const troops = generateAllTroops(definitions, nameMapping);
    console.log(`✓ Generated ${troops.length - 1} troops`);

    // Step 6: Write output
    console.log('Writing Troops.json...');
    writeJsonFile(PATHS.output, troops);
    console.log('✓ File written successfully');

    // Step 7: Summary
    logGenerationSummary(definitions, troops);

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Generation failed:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculatePositions,
    buildEnemyNameMapping,
    resolveEnemyId,
    createEmptyBattlePage,
    createSeparatorEntry,
    createEmptySlotEntry,
    generateTroop,
    generateAllTroops,
  };
}

// Run main function if executed directly
if (require.main === module) {
  main();
}
