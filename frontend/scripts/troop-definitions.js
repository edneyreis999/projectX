/**
 * Troop Definitions Module
 *
 * Defines all combat troop compositions for the 4 implemented regions following GDD specifications.
 * This module serves as the single source of truth for troop compositions and will be consumed
 * by the generation script to produce the final Troops.json file.
 *
 * Structure:
 * - id: Numeric ID following PRD ranges (1-10 World Map, 11-20 Kravens, 21-28 Esgoto, 29-36 Melios)
 * - name: Display name following naming convention "[Enemy Name] x[Count]" or "[Enemy1] x[Count1] + [Enemy2] x[Count2]"
 * - region: Region identifier (world_map, kravens, esgoto, melios)
 * - members: Array of { enemyName: string, count: number } objects
 *
 * Enemy names MUST exactly match Enemies.json entries (case-sensitive).
 */

const troopDefinitions = [
  // ==========================================
  // REGION 1: Estrada do Cão-Luar (World Map)
  // IDs 1-10, Lv 1-5
  // ==========================================
  {
    id: 1,
    name: 'Lobo Jovem x2',
    region: 'world_map',
    members: [{ enemyName: 'Lobo Jovem', count: 2 }],
  },
  {
    id: 2,
    name: 'Lobo Jovem x3',
    region: 'world_map',
    members: [{ enemyName: 'Lobo Jovem', count: 3 }],
  },
  {
    id: 3,
    name: 'Goblin Saqueador x2',
    region: 'world_map',
    members: [{ enemyName: 'Goblin Saqueador', count: 2 }],
  },
  {
    id: 4,
    name: 'Goblin Saqueador x3',
    region: 'world_map',
    members: [{ enemyName: 'Goblin Saqueador', count: 3 }],
  },
  {
    id: 5,
    name: 'Lobo de Gelo x3',
    region: 'world_map',
    members: [{ enemyName: 'Lobo de Gelo', count: 3 }],
  },
  {
    id: 6,
    name: 'Lobo de Gelo x4',
    region: 'world_map',
    members: [{ enemyName: 'Lobo de Gelo', count: 4 }],
  },
  {
    id: 7,
    name: 'Bandido Anão Renegado x3',
    region: 'world_map',
    members: [{ enemyName: 'Bandido Anão Renegado', count: 3 }],
  },
  {
    id: 8,
    name: 'Lobo Alpha de Gelo x1 + Lobo de Gelo x2',
    region: 'world_map',
    members: [
      { enemyName: 'Lobo Alpha de Gelo', count: 1 },
      { enemyName: 'Lobo de Gelo', count: 2 },
    ],
  },
  {
    id: 9,
    name: 'Goblin Saqueador x2 + Bandido Anão Renegado x2',
    region: 'world_map',
    members: [
      { enemyName: 'Goblin Saqueador', count: 2 },
      { enemyName: 'Bandido Anão Renegado', count: 2 },
    ],
  },
  {
    id: 10,
    name: 'Lobo de Gelo x2 + Lobo Jovem x2',
    region: 'world_map',
    members: [
      { enemyName: 'Lobo de Gelo', count: 2 },
      { enemyName: 'Lobo Jovem', count: 2 },
    ],
  },

  // ==========================================
  // REGION 2: Minas de Kravens
  // IDs 11-20, Lv 5-10
  // ==========================================
  {
    id: 11,
    name: 'Morcego de Caverna x3',
    region: 'kravens',
    members: [{ enemyName: 'Morcego de Caverna', count: 3 }],
  },
  {
    id: 12,
    name: 'Morcego de Caverna x4',
    region: 'kravens',
    members: [{ enemyName: 'Morcego de Caverna', count: 4 }],
  },
  {
    id: 13,
    name: 'Morcego de Caverna x5',
    region: 'kravens',
    members: [{ enemyName: 'Morcego de Caverna', count: 5 }],
  },
  {
    id: 14,
    name: 'Aranha Mineira x2',
    region: 'kravens',
    members: [{ enemyName: 'Aranha Mineira', count: 2 }],
  },
  {
    id: 15,
    name: 'Aranha Mineira x3',
    region: 'kravens',
    members: [{ enemyName: 'Aranha Mineira', count: 3 }],
  },
  {
    id: 16,
    name: 'Morcego de Caverna x3 + Aranha Mineira x1',
    region: 'kravens',
    members: [
      { enemyName: 'Morcego de Caverna', count: 3 },
      { enemyName: 'Aranha Mineira', count: 1 },
    ],
  },
  {
    id: 17,
    name: 'Aranha Gigante x2',
    region: 'kravens',
    members: [{ enemyName: 'Aranha Gigante', count: 2 }],
  },
  {
    id: 18,
    name: 'Rato Gigante Mutante x4',
    region: 'kravens',
    members: [{ enemyName: 'Rato Gigante Mutante', count: 4 }],
  },
  {
    id: 19,
    name: 'Aranha Gigante x1 + Rato Gigante Mutante x3',
    region: 'kravens',
    members: [
      { enemyName: 'Aranha Gigante', count: 1 },
      { enemyName: 'Rato Gigante Mutante', count: 3 },
    ],
  },
  {
    id: 20,
    name: 'Cristaleão',
    region: 'kravens',
    members: [{ enemyName: 'Cristaleão', count: 1 }],
  },

  // ==========================================
  // REGION 3: Esgoto de Gildrat
  // IDs 21-28, Lv 10-15
  // ==========================================
  {
    id: 21,
    name: 'Rato de Esgoto x4',
    region: 'esgoto',
    members: [{ enemyName: 'Rato de Esgoto', count: 4 }],
  },
  {
    id: 22,
    name: 'Rato de Esgoto x5',
    region: 'esgoto',
    members: [{ enemyName: 'Rato de Esgoto', count: 5 }],
  },
  {
    id: 23,
    name: 'Limo Ácido x1',
    region: 'esgoto',
    members: [{ enemyName: 'Limo Ácido', count: 1 }],
  },
  {
    id: 24,
    name: 'Limo Ácido x2',
    region: 'esgoto',
    members: [{ enemyName: 'Limo Ácido', count: 2 }],
  },
  {
    id: 25,
    name: 'Rato de Esgoto x3 + Limo Ácido x1',
    region: 'esgoto',
    members: [
      { enemyName: 'Rato de Esgoto', count: 3 },
      { enemyName: 'Limo Ácido', count: 1 },
    ],
  },
  {
    id: 26,
    name: 'Fungo Venenoso Gigante x2',
    region: 'esgoto',
    members: [{ enemyName: 'Fungo Venenoso Gigante', count: 2 }],
  },
  {
    id: 27,
    name: 'Gosma Tóxica x1',
    region: 'esgoto',
    members: [{ enemyName: 'Gosma Tóxica', count: 1 }],
  },
  {
    id: 28,
    name: 'Pestesporo',
    region: 'esgoto',
    members: [{ enemyName: 'Pestesporo', count: 1 }],
  },

  // ==========================================
  // REGION 4: Ruínas de Melios
  // IDs 29-36, Lv 15-20
  // ==========================================
  {
    id: 29,
    name: 'Guardião Menor de Pedra x2',
    region: 'melios',
    members: [{ enemyName: 'Guardião Menor de Pedra', count: 2 }],
  },
  {
    id: 30,
    name: 'Guardião Menor de Pedra x3',
    region: 'melios',
    members: [{ enemyName: 'Guardião Menor de Pedra', count: 3 }],
  },
  {
    id: 31,
    name: 'Elemental de Terra x1',
    region: 'melios',
    members: [{ enemyName: 'Elemental de Terra', count: 1 }],
  },
  {
    id: 32,
    name: 'Guardião Menor de Pedra x1 + Elemental de Terra x1',
    region: 'melios',
    members: [
      { enemyName: 'Guardião Menor de Pedra', count: 1 },
      { enemyName: 'Elemental de Terra', count: 1 },
    ],
  },
  {
    id: 33,
    name: 'Guardião Ancião x1',
    region: 'melios',
    members: [{ enemyName: 'Guardião Ancião', count: 1 }],
  },
  {
    id: 34,
    name: 'Sombra Errante x1',
    region: 'melios',
    members: [{ enemyName: 'Sombra Errante', count: 1 }],
  },
  {
    id: 35,
    name: 'Corvos de Melios',
    region: 'melios',
    members: [{ enemyName: 'Corvos de Melios', count: 1 }],
  },
  {
    id: 36,
    name: 'Guardião Colossal',
    region: 'melios',
    members: [{ enemyName: 'Guardião Colossal', count: 1 }],
  },
];

// Physical outputs are intentionally separate from the 36 logical regional
// definitions. Their IDs are stable RPG Maker database contracts and MUST NOT
// be remapped through a regional range.
const physicalTroopDefinitions = [
  {
    physicalId: 19,
    name: 'Mhordred',
    region: 'semifinal',
    members: [{ enemyName: 'Mhordred', count: 1 }],
  },
];

Object.defineProperty(troopDefinitions, 'physical', {
  value: physicalTroopDefinitions,
  enumerable: false,
  writable: false,
});

// Export for Node.js (CommonJS)
module.exports = troopDefinitions;
