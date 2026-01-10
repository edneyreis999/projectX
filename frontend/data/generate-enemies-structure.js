#!/usr/bin/env node

/**
 * Generates the foundational structure for Enemies.json
 * Creates separators and empty slots for all 5 regions
 */

function createEmptyEnemy(id) {
  return {
    id,
    name: "",
    battlerName: "",
    battlerHue: 0,
    exp: 0,
    gold: 0,
    params: [1, 0, 0, 0, 0, 0, 0, 0],
    actions: [
      {
        skillId: 1,
        rating: 5,
        conditionType: 0,
        conditionParam1: 0,
        conditionParam2: 0
      }
    ],
    traits: [],
    dropItems: [
      {
        dataId: 0,
        kind: 0,
        denominator: 1
      }
    ],
    note: ""
  };
}

function createSeparator(id, regionName) {
  return {
    id,
    name: `=== ${regionName} ===`,
    battlerName: "",
    battlerHue: 0,
    exp: 0,
    gold: 0,
    params: [1, 0, 0, 0, 0, 0, 0, 0],
    actions: [
      {
        skillId: 1,
        rating: 5,
        conditionType: 0,
        conditionParam1: 0,
        conditionParam2: 0
      }
    ],
    traits: [],
    dropItems: [
      {
        dataId: 0,
        kind: 0,
        denominator: 1
      }
    ],
    note: ""
  };
}

function generateEnemiesStructure() {
  const enemies = [];

  // Index 0: null placeholder
  enemies[0] = null;

  // Region 1: ESTRADA DO CÃO-LUAR (indices 1-11)
  enemies[1] = createSeparator(1, "ESTRADA DO CÃO-LUAR");
  for (let i = 2; i <= 11; i++) {
    enemies[i] = createEmptyEnemy(i);
  }

  // Region 2: MINAS DE KRAVENS (indices 12-22)
  enemies[12] = createSeparator(12, "MINAS DE KRAVENS");
  for (let i = 13; i <= 22; i++) {
    enemies[i] = createEmptyEnemy(i);
  }

  // Region 3: ESGOTO DE GILDRAT (indices 23-33)
  enemies[23] = createSeparator(23, "ESGOTO DE GILDRAT");
  for (let i = 24; i <= 33; i++) {
    enemies[i] = createEmptyEnemy(i);
  }

  // Region 4: RUÍNAS DE MELIOS (indices 34-45)
  enemies[34] = createSeparator(34, "RUÍNAS DE MELIOS");
  for (let i = 35; i <= 45; i++) {
    enemies[i] = createEmptyEnemy(i);
  }

  // Region 5: REGIÕES PÓS-SELO (indices 46-100)
  enemies[46] = createSeparator(46, "REGIÕES PÓS-SELO");
  for (let i = 47; i <= 100; i++) {
    enemies[i] = createEmptyEnemy(i);
  }

  return enemies;
}

// Generate and output the structure
const structure = generateEnemiesStructure();
console.log(JSON.stringify(structure, null, 2));
