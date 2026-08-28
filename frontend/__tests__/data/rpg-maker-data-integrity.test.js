/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');

const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILES = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.json')).sort();

function parseData(file, source = fs.readFileSync(path.join(DATA_DIR, file), 'utf8')) {
  try {
    return JSON.parse(source.replace(/^\uFEFF/, ''));
  } catch (error) {
    throw new Error(`invalid_rpg_data_json:${file}`, { cause: error });
  }
}

function validateIndexedIds(file, data) {
  if (!Array.isArray(data)) return;
  data.forEach((entry, index) => {
    if (entry && entry.id !== index) {
      throw new Error(`rpg_data_id_index_mismatch:${file}:${index}:${entry.id}`);
    }
  });
}

function validateMapShape(file, data) {
  if (!/^Map\d{3}\.json$/.test(file)) return;
  if (!Number.isInteger(data.width) || data.width <= 0 || !Number.isInteger(data.height) || data.height <= 0 || !Array.isArray(data.events) || !Array.isArray(data.data)) {
    throw new Error(`invalid_rpg_map_shape:${file}`);
  }
  for (const mapEvent of data.events.filter(Boolean)) {
    if (!Array.isArray(mapEvent.pages) || mapEvent.pages.some(page => !Array.isArray(page.list))) {
      throw new Error(`invalid_rpg_map_event_shape:${file}:${mapEvent.id}`);
    }
  }
}

describe('RPG Maker data integrity', () => {
  const parsed = new Map(DATA_FILES.map(file => [file, parseData(file)]));

  test('all database JSON files parse and preserve indexed database IDs', () => {
    expect(parsed.size).toBe(DATA_FILES.length);
    for (const [file, data] of parsed) validateIndexedIds(file, data);
  });

  test('rejects malformed JSON and mismatched indexed IDs', () => {
    expect(() => parseData('Broken.json', '{')).toThrow('invalid_rpg_data_json:Broken.json');
    expect(() => validateIndexedIds('Actors.json', [null, { id: 2 }])).toThrow('rpg_data_id_index_mismatch:Actors.json:1:2');
    expect(() => validateIndexedIds('Actors.json', [null, {}])).toThrow('rpg_data_id_index_mismatch:Actors.json:1:undefined');
  });

  test('all map files retain the minimum RPG Maker map shape', () => {
    for (const [file, data] of parsed) validateMapShape(file, data);
  });

  test('rejects an incomplete map shape', () => {
    expect(() => validateMapShape('Map001.json', { width: 0, height: 10, events: [], data: [] })).toThrow('invalid_rpg_map_shape:Map001.json');
  });

  test.each([
    { actorId: 3, name: 'Thorin' },
    { actorId: 4, name: 'Filena' },
    { actorId: 5, name: 'Kilin' },
  ])('$name starts a new game at level 1', ({ actorId, name }) => {
    expect(parsed.get('Actors.json')[actorId]).toMatchObject({ id: actorId, name, initialLevel: 1 });
  });
});
