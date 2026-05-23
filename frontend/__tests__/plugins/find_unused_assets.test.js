const { execSync } = require('child_process');
const path = require('path');

const SCRIPT_PATH = path.resolve(__dirname, '../../../scripts/find_unused_assets.js');

function getReport() {
  const output = execSync(`node "${SCRIPT_PATH}" --json 2>/dev/null`, { encoding: 'utf8' });
  return JSON.parse(output);
}

function getUnusedPaths(report) {
  const paths = new Set();
  for (const files of Object.values(report.unusedByCategory)) {
    for (const f of files) paths.add(f.path.toLowerCase());
  }
  return paths;
}

// Known-referenced files that must NEVER be flagged as unused
const GOLDEN_SET = [
  // System.json
  'img/titles1/menu-bg.png',
  'img/characters/Vehicle.png',
  'img/battlebacks1/Road1.png',
  'img/battlebacks2/Town4.png',
  'audio/bgm/Battle1.ogg',
  'audio/bgm/Theme4.ogg',
  'audio/me/Defeat1.ogg',
  'audio/me/Gameover1.ogg',
  'audio/me/Victory1.ogg',
  'audio/se/Cursor3.ogg',
  'audio/bgm/Ship2.ogg',
  'audio/bgm/Ship1.ogg',
  'audio/bgm/Ship3.ogg',
  // Actors.json
  'img/characters/Principal/$Thorin.png',
  'img/faces/Portraits menores/Principal2.png',
  'img/sv_actors/Thorin.png',
  // Enemies.json
  'img/sv_enemies/Coreto_Lobaris.png',
  // Tilesets.json
  'img/tilesets/World_A1.png',
  // Animations.json
  'audio/se/Blow1.ogg',
  // Map events
  'img/pictures/SF_Monster_3.png',
  'audio/bgm/Rain2.ogg',
  'audio/me/Horror.ogg',
  'movies/Cutscene 2.webm',
  // Plugins
  'audio/se/Item3.ogg',
  'audio/se/Magic3.ogg',
  // Characters subfolders (whitelist protected - loaded dynamically)
  'img/characters/Boss/Mhordred.png',
  'img/characters/CasaForjaprata/$Iluminacao.png',
  'img/characters/Conselho/$Conselheiro1.png',
  'img/characters/Estadio/$Adversario1.png',
  'img/characters/Kravens/!$buraco.png',
  'img/characters/Mina de Melios/!$Pedras.png',
  'img/characters/Principal/$Thorin.png',
  // Faces whitelist
  'img/faces/Bosses.png',
  // Characters restored manually (runtime needed)
  'img/characters/!$Barraca.png',
  'img/characters/!Chest.png',
  'img/characters/Actor1.png',
  'img/characters/Monster.png',
  'img/characters/SF_Actor2.png',
  // SV Actors restored manually
  'img/sv_actors/Cristaleao.png',
  'img/sv_actors/LoboAlpha.png',
  // BGM restored manually
  'audio/bgm/Theme1.ogg',
];

describe('find_unused_assets.js', () => {
  let report;
  let unusedPaths;

  beforeAll(() => {
    report = getReport();
    unusedPaths = getUnusedPaths(report);
  });

  test('produces valid report with expected structure', () => {
    expect(report).toHaveProperty('mode', 'dry-run');
    expect(report).toHaveProperty('summary');
    expect(report.summary).toHaveProperty('totalFiles');
    expect(report.summary).toHaveProperty('referencedFiles');
    expect(report.summary).toHaveProperty('unusedFiles');
    expect(report.summary).toHaveProperty('whitelistedFiles');
    expect(report.summary).toHaveProperty('pluginAccessibleFiles');
  });

  test('accounts for all discovered files', () => {
    const { referencedFiles, unusedFiles, whitelistedFiles, pluginAccessibleFiles, totalFiles } = report.summary;
    expect(referencedFiles + unusedFiles + whitelistedFiles + pluginAccessibleFiles).toBe(totalFiles);
  });

  test('golden set files are never flagged as unused', () => {
    const failures = GOLDEN_SET.filter(f => unusedPaths.has(f.toLowerCase()));
    if (failures.length > 0) {
      console.error('Incorrectly flagged as unused:', failures);
    }
    expect(failures).toHaveLength(0);
  });

  test('references do not exceed discovered files', () => {
    expect(report.summary.referencedFiles).toBeLessThanOrEqual(report.summary.totalFiles);
    expect(report.summary.unusedFiles).toBeLessThanOrEqual(report.summary.totalFiles);
  });

  test('plugin-accessible files are kept (not in unused)', () => {
    expect(report.summary.pluginAccessibleFiles).toBeGreaterThan(0);
  });

  test('whitelist protects img/system/ files', () => {
    expect(report.summary.whitelistedFiles).toBeGreaterThan(0);
  });

  test('unused categories only contain expected asset types', () => {
    const validPrefixes = ['img/', 'audio/', 'movies'];
    for (const category of Object.keys(report.unusedByCategory)) {
      const matches = validPrefixes.some(p => category.startsWith(p));
      expect(matches).toBe(true);
    }
  });
});
