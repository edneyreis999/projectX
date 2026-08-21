/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = '.compozy/tasks/011-semifinal-playtest-remediation';
const MANIFEST_PATH = `${FEATURE}/fixtures/assets/asset-manifest.json`;
const MODULE_URL = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/semifinal-assets.mjs`)).href;
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, MANIFEST_PATH), 'utf8'));

function invoke(exportName, args) {
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import * as subject from ${JSON.stringify(MODULE_URL)};
     const value = await subject[process.argv[1]](...JSON.parse(process.argv[2]));
     console.log(JSON.stringify(value));`,
      exportName,
      JSON.stringify(args),
    ],
    { cwd: ROOT, encoding: 'utf8' },
  );
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

function copyAsset(root, relativePath, destinationPath = relativePath) {
  const target = path.join(root, destinationPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(ROOT, relativePath), target);
}

function validate(rootDir, manifest = MANIFEST, reachability = { references: [] }) {
  return invoke('validateAssetManifest', [{ rootDir, manifest, reachability }]);
}

describe('UT-049 — semifinal-assets/v1 schema', () => {
  test('accepts the complete manifest, including the approved battler role', () => {
    const result = validate(ROOT);
    expect(result.status).toBe('complete');
    expect(result.technicalArtistReview).toBe('approved');
    expect(result.references).toHaveLength(MANIFEST.assets.length);
    expect(result.references).toContainEqual(expect.objectContaining({ role: 'battler', path: 'frontend/img/sv_actors/Mhordred.png' }));
    expect(result.references).toContainEqual(expect.objectContaining({ role: 'system-iconset', path: 'frontend/img/system/IconSet.png' }));
    expect(MANIFEST.assets.every(asset => asset.consumers.length > 0 && /^[a-f0-9]{64}$/.test(asset.sha256))).toBe(true);
  });

  test.each([
    [
      'wrong version',
      value => {
        value.version = 'semifinal-assets/v0';
      },
    ],
    [
      'empty consumers',
      value => {
        value.assets[0].consumers = [];
      },
    ],
    [
      'unapproved technical review',
      value => {
        value.assets[0].technicalArtistReview = 'pending';
      },
    ],
    [
      'role omitted by _dx prose',
      value => {
        value.assets.at(-1).role = 'enemy-image';
      },
    ],
  ])('rejects %s', (_label, mutate) => {
    const manifest = structuredClone(MANIFEST);
    mutate(manifest);
    expect(validate(ROOT, manifest)).toMatchObject({ status: 'blocked', code: 'manifest_invalid' });
  });
});

describe('UT-050 — exact path, checksum, dimensions, and alpha', () => {
  test('missing file returns its exact runtime reference', () => {
    const manifest = { version: MANIFEST.version, assets: [structuredClone(MANIFEST.assets[0])] };
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-missing-'));
    expect(validate(root, manifest)).toEqual({
      status: 'blocked',
      code: 'reference_missing',
      reference: 'img/characters/Estadio/$Adversario1.png',
    });
  });

  test('case-only mismatch is rejected rather than normalized', () => {
    const manifest = { version: MANIFEST.version, assets: [structuredClone(MANIFEST.assets[0])] };
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-case-'));
    copyAsset(root, manifest.assets[0].path, 'frontend/img/characters/Estadio/$adversario1.png');
    expect(validate(root, manifest)).toMatchObject({ status: 'blocked', code: 'reference_case_mismatch' });
  });

  test.each([
    [
      'checksum',
      value => {
        value.sha256 = '0'.repeat(64);
      },
      'manifest_checksum_mismatch',
    ],
    [
      'width',
      value => {
        value.width += 1;
      },
      'manifest_dimension_mismatch',
    ],
    [
      'alpha',
      value => {
        value.alpha = false;
      },
      'manifest_alpha_mismatch',
    ],
  ])('%s mismatch is rejected', (_label, mutate, code) => {
    const asset = structuredClone(MANIFEST.assets[0]);
    mutate(asset);
    expect(validate(ROOT, { version: MANIFEST.version, assets: [asset] })).toMatchObject({ status: 'blocked', code });
  });
});

describe('UT-051 — canonical-state and nested-plugin reachability', () => {
  test('evaluates the last eligible page at all 14 states and reads nested picture arguments', () => {
    const map = {
      events: [
        null,
        {
          id: 1,
          pages: [
            {
              conditions: { variableValid: true, variableId: 29, variableValue: 50 },
              image: { characterName: 'Estadio/$Companheiro1' },
              list: [{ code: 357, parameters: ['Plugin', 'Show', '', { 'PictureName:str': 'Portraits/Principal/Kilin' }] }],
            },
            {
              conditions: { variableValid: true, variableId: 29, variableValue: 90 },
              image: { characterName: 'Estadio/$Adversario1' },
              list: [],
            },
          ],
        },
      ],
    };
    const result = invoke('collectSemifinalReachability', [{ maps: { 62: map }, eventScope: { 62: [1] } }]);
    expect(result.states).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 900]);
    expect(result.selectedPages.filter(item => item.pageIndex === 0).map(item => item.state)).toEqual([50, 60, 70, 80]);
    expect(result.selectedPages.filter(item => item.pageIndex === 1).map(item => item.state)).toEqual([90, 100, 110, 120, 900]);
    expect(result.references.map(item => item.path)).toEqual(
      expect.arrayContaining(['frontend/img/characters/Estadio/$Companheiro1.png', 'frontend/img/characters/Estadio/$Adversario1.png', 'frontend/img/pictures/Portraits/Principal/Kilin.png']),
    );
  });
});

describe('UT-052/UT-053 — no inherited waiver and explicit resolution modes', () => {
  test('Map010 history cannot suppress a reachable missing reference', () => {
    const result = validate(ROOT, MANIFEST, {
      references: [
        {
          path: 'frontend/img/characters/Estadio/$MissingReachable011.png',
          consumer: 'Map062:E3:V29=50',
          manifestRequired: false,
        },
      ],
      legacyProtectedReferences: ['Estadio/$MissingReachable011'],
    });
    expect(result).toEqual({ status: 'blocked', code: 'reference_missing', reference: 'img/characters/Estadio/$MissingReachable011.png' });
  });

  test('existing, generated, and placeholder entries pass only with real final/fallback files', () => {
    const result = validate(ROOT);
    expect(result.status).toBe('complete');
    expect(new Set(result.references.map(item => item.resolution))).toEqual(new Set(['existing', 'generated', 'placeholder']));
    const placeholder = MANIFEST.assets.find(asset => asset.path.endsWith('!$Armadura.png'));
    expect(fs.existsSync(path.join(ROOT, placeholder.fallbackPath))).toBe(true);
    expect(MANIFEST.assets.some(asset => asset.path === placeholder.fallbackPath)).toBe(true);
  });

  test('an existing but unregistered placeholder fallback is rejected', () => {
    const placeholder = structuredClone(MANIFEST.assets.find(asset => asset.path.endsWith('!$Armadura.png')));
    expect(validate(ROOT, { version: MANIFEST.version, assets: [placeholder] })).toMatchObject({
      status: 'blocked',
      code: 'manifest_invalid',
      field: 'fallbackPath',
      reason: 'unregistered',
    });
  });
});

describe('UT-054 — static truth never becomes perceptual approval', () => {
  test('every manifest entry remains pending in editor, scene, and playtest', () => {
    const result = validate(ROOT);
    expect(result.status).toBe('complete');
    expect(result.humanVisualApproval).toBe('pending');
    expect(result.visualReview).toHaveLength(MANIFEST.assets.length);
    expect(result.visualReview.every(row => row.editor === 'pending' && row.scene === 'pending' && row.playtest === 'pending')).toBe(true);
  });

  test('a fabricated human pass is rejected even when bytes are valid', () => {
    const asset = structuredClone(MANIFEST.assets[0]);
    asset.humanVisualReview = 'approved';
    expect(validate(ROOT, { version: MANIFEST.version, assets: [asset] })).toMatchObject({ status: 'blocked', code: 'human_truth_boundary' });
  });
});

describe('UT-065 — exact missing helmet error', () => {
  test('returns the frozen _dx.md object', () => {
    const helmet = structuredClone(MANIFEST.assets.find(asset => asset.path.endsWith('/!$Capacete.png')));
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-helmet-missing-'));
    expect(validate(root, { version: MANIFEST.version, assets: [helmet] })).toEqual({
      status: 'blocked',
      code: 'reference_missing',
      reference: 'img/characters/Estadio/Vestiario/!$Capacete.png',
    });
  });
});

describe('UT-066 — legacy Armor 51 icon restoration', () => {
  test('keeps Armor 51 on index 132 and registers the restored IconSet bytes', () => {
    const armors = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/Armors.json'), 'utf8'));
    const iconset = MANIFEST.assets.find(asset => asset.role === 'system-iconset');
    expect(armors[51]).toMatchObject({ id: 51, name: 'Elmo Velho', iconIndex: 132 });
    expect(iconset).toMatchObject({ path: 'frontend/img/system/IconSet.png', consumers: ['Armors:51:iconIndex132'], resolution: 'existing' });
    expect(validate(ROOT, { version: MANIFEST.version, assets: [iconset] }).status).toBe('complete');
  });
});

describe('IT-019 — live semifinal reachability + manifest + filesystem', () => {
  test('all currently or semantically reachable art exists without a Map010 waiver', () => {
    const maps = Object.fromEntries([44, 61, 62, 63, 64].map(id => [id, JSON.parse(fs.readFileSync(path.join(ROOT, `frontend/data/Map${String(id).padStart(3, '0')}.json`), 'utf8'))]));
    const eventScope = Object.fromEntries(Object.entries(maps).map(([id, map]) => [id, map.events.flatMap((event, index) => (event ? [index] : []))]));
    const reachability = invoke('collectSemifinalReachability', [
      {
        maps,
        eventScope,
        semanticConsumers: MANIFEST.assets.map(asset => ({ path: asset.path, consumer: asset.consumers[0], manifestRequired: true })),
      },
    ]);
    const manifestPaths = new Set(MANIFEST.assets.map(asset => asset.path));
    reachability.references.forEach(reference => {
      reference.manifestRequired = manifestPaths.has(reference.path);
    });
    const result = validate(ROOT, MANIFEST, reachability);
    expect(result.status).toBe('complete');
    expect(reachability.states).toHaveLength(14);
    expect(reachability.references.some(reference => reference.path.endsWith('/!$Capacete.png'))).toBe(true);
    expect(reachability.references.some(reference => reference.path === 'frontend/img/sv_actors/Mhordred.png')).toBe(true);
    expect(reachability.references.every(reference => !reference.consumer.includes('Map010'))).toBe(true);
  });
});
