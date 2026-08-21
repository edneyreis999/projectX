/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = '.compozy/tasks/011-semifinal-playtest-remediation';
const GAMEPLAY_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/semifinal-gameplay.mjs`)).href;
const RUNTIME_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/writer-runtime.mjs`)).href;
const ENTRYPOINT = `${FEATURE}/scripts/apply-semifinal-remediation-gameplay.mjs`;
const ALLOCATION_CASES = JSON.parse(fs.readFileSync(path.join(ROOT, `${FEATURE}/fixtures/gameplay/allocation-cases.json`), 'utf8'));
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, `${FEATURE}/fixtures/assets/asset-manifest.json`), 'utf8'));

function runNode(source, args = [], cwd = ROOT, timeout = 30000) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', source, ...args], { cwd, encoding: 'utf8', timeout });
}

function invoke(moduleUrl, exportName, args) {
  const result = runNode(
    `import * as subject from ${JSON.stringify(moduleUrl)};
     try { console.log(JSON.stringify({ok:true,value:await subject[process.argv[1]](...JSON.parse(process.argv[2]))})); }
     catch (error) { console.log(JSON.stringify({ok:false,error:Object.fromEntries(['code','path','anchor','kind','command','accepted'].flatMap(key => error[key] === undefined ? [] : [[key,error[key]]]))})); }`,
    [exportName, JSON.stringify(args)],
  );
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

function copyFile(root, relativePath) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(ROOT, relativePath), target);
}

function createSafeWorkspace() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-gameplay-'));
  for (const relativePath of ['package.json', 'package-lock.json']) copyFile(root, relativePath);
  fs.cpSync(path.join(ROOT, '.compozy/tasks/010-semifinal-completa'), path.join(root, '.compozy/tasks/010-semifinal-completa'), { recursive: true });
  fs.cpSync(path.join(ROOT, FEATURE), path.join(root, FEATURE), { recursive: true });
  fs.cpSync(path.join(ROOT, 'docs/Quests/2-semifinal'), path.join(root, 'docs/Quests/2-semifinal'), { recursive: true });
  fs.cpSync(path.join(ROOT, 'frontend/data'), path.join(root, 'frontend/data'), { recursive: true });
  for (const relativePath of ['frontend/js/plugins.js', 'frontend/js/plugins/Coreto_QuestVN.js', 'frontend/scripts/troop-definitions.js', 'frontend/scripts/generate-troops.js']) copyFile(root, relativePath);
  for (const asset of MANIFEST.assets) {
    copyFile(root, asset.path);
    if (asset.fallbackPath) copyFile(root, asset.fallbackPath);
  }
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(root, 'node_modules'), 'dir');

  const mapPath = path.join(root, 'frontend/data/Map011.json');
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  for (const page of map.events[27].pages) {
    for (const command of page.list) if (command.code === 301 && command.parameters?.[1] === 19) command.parameters[1] = 18;
  }
  fs.writeFileSync(mapPath, JSON.stringify(map));
  fs.appendFileSync(path.join(root, 'frontend/scripts/troop-definitions.js'), "\nconst semifinalOwner = { physicalId: 19, enemyName: 'Mhordred' }; void semifinalOwner;\n");
  fs.appendFileSync(path.join(root, 'frontend/scripts/generate-troops.js'), '\nfunction ownSemifinal(definition, troopsById) { troopsById[definition.physicalId] = definition; } void ownSemifinal;\n');
  return root;
}

function runWriter(root, args = []) {
  return spawnSync(process.execPath, [ENTRYPOINT, ...args], { cwd: root, encoding: 'utf8', timeout: 30000 });
}

function allocationInput() {
  const mapInfos = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/MapInfos.json'), 'utf8'));
  mapInfos.length = 65;
  const enemies = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/Enemies.json'), 'utf8'));
  const troops = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/Troops.json'), 'utf8'));
  enemies[91] = {
    id: 91,
    name: '',
    battlerName: '',
    battlerHue: 0,
    exp: 0,
    gold: 0,
    params: [1, 0, 0, 0, 0, 0, 0, 0],
    actions: [{ skillId: 1, rating: 5, conditionType: 0, conditionParam1: 0, conditionParam2: 0 }],
    traits: [],
    dropItems: [{ dataId: 0, kind: 0, denominator: 1 }],
    note: '',
  };
  troops[19] = {
    id: 19,
    name: '',
    members: [],
    pages: [{
      conditions: { actorHp: 50, actorId: 1, actorValid: false, enemyHp: 50, enemyIndex: 0, enemyValid: false, switchId: 1, switchValid: false, turnA: 0, turnB: 0, turnEnding: false, turnValid: false },
      list: [{ code: 0, indent: 0, parameters: [] }],
      span: 0,
    }],
  };
  return {
    databases: {
      mapInfos,
      enemies,
      troops,
    },
    references: [],
    generators: {
      definitions: "const owner = { physicalId: 19, enemyName: 'Mhordred' };",
      generator: 'const definition={physicalId:19}; const troopsById=[]; troopsById[definition.physicalId]=definition;',
    },
    baselines: structuredClone(ALLOCATION_CASES),
    mapFiles: Array.from({ length: 65 }, (_, id) => id),
  };
}

function hashTree(root) {
  const files = [];
  const walk = directory =>
    fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
      const candidate = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(candidate);
      else files.push(candidate);
    });
  walk(root);
  files.sort();
  const hash = crypto.createHash('sha256');
  files.forEach(filename => hash.update(path.relative(root, filename)).update('\0').update(fs.readFileSync(filename)).update('\0'));
  return hash.digest('hex');
}

let safeRoot;
beforeAll(() => {
  safeRoot = createSafeWorkspace();
});
afterAll(() => {
  fs.rmSync(safeRoot, { recursive: true, force: true });
});

describe('UT-005/UT-006 — Gameplay CLI', () => {
  test('UT-005: --check emits the exact ready shape from a safe disposable workspace', () => {
    const result = runWriter(safeRoot, ['--check']);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
      status: 'ready',
      feature: '011-semifinal-playtest-remediation',
      writer: 'gameplay-engineer',
      contracts: 'current',
      assets: 'complete',
      database_ids: 'reserved',
    });
  });

  test('UT-006: positional input is rejected before live discovery', () => {
    const result = spawnSync(process.execPath, [ENTRYPOINT, 'frontend/data/Map062.json'], { cwd: ROOT, encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'invalid_arguments', command: 'apply-semifinal-remediation-gameplay', accepted: ['--check'] });
  });
});

describe('UT-007–UT-010 — complete planning and atomic apply', () => {
  test('UT-007: every planned JSON/JS output and target is validated before scratch', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-plan-'));
    fs.writeFileSync(path.join(root, 'target.json'), '{}');
    const result = runNode(
      `import fs from 'node:fs'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)};
       const root=process.argv[1], before=fs.readFileSync(root+'/target.json'); let writes=0;
       const fileOps={...fs,writeFileSync(...args){writes++;return fs.writeFileSync(...args)}};
       try { await applyAtomicPlan({rootDir:root,writer:'test',targets:['target.json'],allowedTargets:['target.json'],edits:[{path:'target.json',content:'{broken',existed:true,original:before}],fingerprints:{'target.json':{exists:true,sha256:sha256(before)}},fileOps}); }
       catch(error){console.log(JSON.stringify({code:error.code,writes}));}`,
      [root],
    );
    expect(JSON.parse(result.stdout)).toEqual({ code: 'precondition_mismatch', writes: 0 });
    expect(invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: ['frontend/data/MapInfos.json'], edits: [{ path: 'frontend/data/MapInfos.json', content: '[]' }] }]).ok).toBe(true);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-008: stale target before apply performs zero replacements', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-stale-'));
    fs.writeFileSync(path.join(root, 'one.json'), '{}');
    const result = runNode(
      `import fs from 'node:fs'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)};
       const root=process.argv[1], original=fs.readFileSync(root+'/one.json'); fs.writeFileSync(root+'/one.json','{"drift":true}'); let renames=0;
       const fileOps={...fs,renameSync(...args){renames++;return fs.renameSync(...args)}};
       try{await applyAtomicPlan({rootDir:root,writer:'test',targets:['one.json'],allowedTargets:['one.json'],edits:[{path:'one.json',content:'{"next":true}',existed:true,original}],fingerprints:{'one.json':{exists:true,sha256:sha256(original)}},fileOps});}catch(error){console.log(JSON.stringify({code:error.code,renames}));}`,
      [root],
    );
    expect(JSON.parse(result.stdout)).toEqual({ code: 'precondition_mismatch', renames: 0 });
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-009: third rename failure restores bytes, modes, absence and scratch state', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-rollback-'));
    fs.writeFileSync(path.join(root, 'one.json'), '{"before":1}', { mode: 0o640 });
    fs.writeFileSync(path.join(root, 'three.json'), '{"before":3}', { mode: 0o640 });
    const result = runNode(
      `import fs from 'node:fs'; import path from 'node:path'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)};
       const root=process.argv[1], names=['one.json','two.json','three.json'], existed=[true,false,true], originals=names.map((n,i)=>existed[i]?fs.readFileSync(path.join(root,n)):undefined); let production=0;
       const edits=names.map((n,i)=>({path:n,content:'{"after":'+i+'}',existed:existed[i],original:originals[i]}));
       const fingerprints=Object.fromEntries(names.map((n,i)=>[n,{exists:existed[i],sha256:existed[i]?sha256(originals[i]):null}]));
       const fileOps={...fs,renameSync(src,dst){if(src.includes('.scratch-')&&++production===3)throw new Error('third');return fs.renameSync(src,dst)}};
       let code;try{await applyAtomicPlan({rootDir:root,writer:'test',targets:names,allowedTargets:names,edits,fingerprints,fileOps})}catch(error){code=error.code}
       const restored=fs.readFileSync(path.join(root,'one.json')).equals(originals[0])&&(fs.statSync(path.join(root,'one.json')).mode&511)===416&&!fs.existsSync(path.join(root,'two.json'))&&fs.readFileSync(path.join(root,'three.json')).equals(originals[2]);
       console.log(JSON.stringify({code,restored,debris:fs.readdirSync(root).filter(n=>n.includes('.scratch-')||n.includes('.rollback-'))}));`,
      [root],
    );
    expect(JSON.parse(result.stdout)).toEqual({ code: 'atomic_apply_failed', restored: true, debris: [] });
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-010: a converged reapply returns applied with no additional bytes', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-idempotent-'));
    fs.writeFileSync(path.join(root, 'one.json'), '{}');
    const result = runNode(
      `import fs from 'node:fs'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)}; const root=process.argv[1], before=fs.readFileSync(root+'/one.json');
       await applyAtomicPlan({rootDir:root,writer:'test',targets:['one.json'],allowedTargets:['one.json'],edits:[{path:'one.json',content:'{"done":true}',existed:true,original:before}],fingerprints:{'one.json':{exists:true,sha256:sha256(before)}}});
       const settled=fs.readFileSync(root+'/one.json'), hash=sha256(settled); const second=await applyAtomicPlan({rootDir:root,writer:'test',targets:[],allowedTargets:['one.json'],edits:[],fingerprints:{'one.json':{exists:true,sha256:hash}}}); console.log(JSON.stringify({second,unchanged:hash===sha256(fs.readFileSync(root+'/one.json'))}));`,
      [root],
    );
    expect(JSON.parse(result.stdout)).toMatchObject({ second: { status: 'applied' }, unchanged: true });
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe('UT-039–UT-041 — allocation safety', () => {
  test('UT-039: occupied, referenced, or index-mismatched Troop 19 is unavailable', () => {
    for (const mutate of [
      input => {
        input.databases.troops[19].members.push({ enemyId: 91, x: 0, y: 0, hidden: false });
      },
      input => {
        input.references.push({ kind: 'troop', id: 19, path: 'frontend/data/Map011.json' });
      },
      input => {
        input.databases.troops[19].id = 18;
      },
    ]) {
      const input = allocationInput();
      mutate(input);
      expect(invoke(GAMEPLAY_MODULE, 'allocateRecords', [input])).toEqual({ ok: false, error: { code: 'database_id_unavailable', kind: 'troop' } });
    }
  });

  test('UT-040: Enemy 30 is never selected and must remain Fogolume', () => {
    const input = allocationInput();
    input.baselines.enemyCandidates.unshift({ id: 30, sha256: input.baselines.enemy30.sha256 });
    expect(invoke(GAMEPLAY_MODULE, 'allocateRecords', [input]).value.enemyId).toBe(91);
    input.databases.enemies[30].name = 'Mhordred';
    expect(invoke(GAMEPLAY_MODULE, 'allocateRecords', [input])).toEqual({ ok: false, error: { code: 'database_id_unavailable', kind: 'enemy' } });
  });

  test('UT-041: blank name alone, typed references, and fingerprint drift reject Mhordred candidate', () => {
    for (const mutate of [
      input => {
        input.databases.enemies[91].battlerName = 'Occupied';
      },
      input => {
        input.references.push({ kind: 'enemy', id: 91, path: 'frontend/data/Troops.json' });
      },
      input => {
        input.databases.enemies[91].params[0] = 2;
      },
    ]) {
      const input = allocationInput();
      mutate(input);
      expect(invoke(GAMEPLAY_MODULE, 'allocateRecords', [input])).toEqual({ ok: false, error: { code: 'database_id_unavailable', kind: 'enemy' } });
    }
  });
});

describe('UT-059/UT-066/UT-067/UT-070 — exact structured errors', () => {
  test('UT-059: Map062 E19 drift returns the exact anchor', () => {
    const root = createSafeWorkspace();
    const mapPath = path.join(root, 'frontend/data/Map062.json');
    const map = JSON.parse(fs.readFileSync(mapPath));
    map.events[19].x += 1;
    fs.writeFileSync(mapPath, JSON.stringify(map));
    const result = runWriter(root, ['--check']);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'precondition_mismatch', anchor: 'Map062:E19', writer: 'gameplay-engineer' });
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('UT-066: resolved live Troop 19 authority passes allocation preflight', () => {
    const result = spawnSync(process.execPath, [ENTRYPOINT, '--check'], { cwd: ROOT, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toMatchObject({ status: 'ready', database_ids: 'reserved' });
  });

  test('UT-067: safe slot without physical generator ownership returns the exact conflict', () => {
    const input = allocationInput();
    input.generators.generator = fs.readFileSync(path.join(ROOT, 'frontend/scripts/generate-troops.js'), 'utf8');
    input.generators.definitions = fs
      .readFileSync(path.join(ROOT, 'frontend/scripts/troop-definitions.js'), 'utf8')
      .replace(/physicalId\s*:\s*19/, 'physicalId: 18');
    expect(invoke(GAMEPLAY_MODULE, 'allocateRecords', [input])).toEqual({ ok: false, error: { code: 'generator_ownership_conflict', path: 'frontend/scripts/generate-troops.js' } });
  });

  test('UT-070: a 010 target is rejected exactly', () => {
    const forbidden = '.compozy/tasks/010-semifinal-completa/task_06.md';
    expect(invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: [forbidden], edits: [{ path: forbidden, content: 'x' }] }])).toEqual({
      ok: false,
      error: { code: 'restricted_diff_violation', path: forbidden },
    });
  });
});

describe('IT-021/IT-022/IT-024/IT-025 — integrated safety boundaries', () => {
  test('IT-002: public Gameplay writer check/apply/reapply converges in a safe workspace', () => {
    const root = createSafeWorkspace();
    const check = runWriter(root, ['--check']);
    const apply = runWriter(root);
    const settledHash = hashTree(path.join(root, 'frontend'));
    const reapply = runWriter(root);

    expect(check.status).toBe(0);
    expect(JSON.parse(check.stdout)).toEqual({
      status: 'ready',
      feature: '011-semifinal-playtest-remediation',
      writer: 'gameplay-engineer',
      contracts: 'current',
      assets: 'complete',
      database_ids: 'reserved',
    });
    expect(JSON.parse(apply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'gameplay-engineer' });
    expect(JSON.parse(reapply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'gameplay-engineer' });
    expect(hashTree(path.join(root, 'frontend'))).toBe(settledHash);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('IT-021: only the exact Gameplay allowlist can enter a plan', () => {
    expect(invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: ['frontend/data/Enemies.json'], edits: [{ path: 'frontend/data/Enemies.json', content: '[]' }] }]).ok).toBe(true);
    expect(invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: ['frontend/data/Map011.json'], edits: [{ path: 'frontend/data/Map011.json', content: '{}' }] }]).error.code).toBe(
      'restricted_diff_violation',
    );
  });

  test('IT-022: disposable apply preserves the complete 010 package and Map014 bytes', () => {
    const before010 = hashTree(path.join(safeRoot, '.compozy/tasks/010-semifinal-completa'));
    const before014 = crypto
      .createHash('sha256')
      .update(fs.readFileSync(path.join(safeRoot, 'frontend/data/Map014.json')))
      .digest('hex');
    const result = runWriter(safeRoot);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'gameplay-engineer' });
    expect(hashTree(path.join(safeRoot, '.compozy/tasks/010-semifinal-completa'))).toBe(before010);
    expect(
      crypto
        .createHash('sha256')
        .update(fs.readFileSync(path.join(safeRoot, 'frontend/data/Map014.json')))
        .digest('hex'),
    ).toBe(before014);
  });

  test('IT-024: lock-only install resolves jsonc-parser@3.3.1 as a direct dependency', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-npm-ci-'));
    const projectPackage = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    const projectLock = JSON.parse(fs.readFileSync(path.join(ROOT, 'package-lock.json'), 'utf8'));
    expect(projectPackage.dependencies['jsonc-parser']).toBe('^3.3.1');
    expect(projectLock.packages[''].dependencies['jsonc-parser']).toBe('^3.3.1');
    expect(projectLock.packages['node_modules/jsonc-parser']).toMatchObject({ version: '3.3.1', resolved: expect.stringContaining('jsonc-parser-3.3.1.tgz') });
    fs.copyFileSync(path.join(ROOT, 'package.json'), path.join(root, 'package.json'));
    fs.copyFileSync(path.join(ROOT, 'package-lock.json'), path.join(root, 'package-lock.json'));
    const installed = spawnSync('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], {
      cwd: root,
      encoding: 'utf8',
      timeout: 120000,
    });
    expect(installed.status).toBe(0);
    const installedPackage = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/jsonc-parser/package.json'), 'utf8'));
    expect(installedPackage.version).toBe('3.3.1');
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('IT-025: drift after scratch preparation still performs zero replacements', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-concurrent-'));
    fs.writeFileSync(path.join(root, 'one.json'), '{}');
    const original = fs.readFileSync(path.join(root, 'one.json'));
    const result = runNode(
      `import fs from 'node:fs'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)}; const root=process.argv[1], original=fs.readFileSync(root+'/one.json'); let writes=0,renames=0;
       const fileOps={...fs,writeFileSync(target,...args){const value=fs.writeFileSync(target,...args);if(String(target).includes('.scratch-')&&++writes===1)fs.writeFileSync(root+'/one.json','{"drift":true}');return value},renameSync(...args){renames++;return fs.renameSync(...args)}};
       try{await applyAtomicPlan({rootDir:root,writer:'test',targets:['one.json'],allowedTargets:['one.json'],edits:[{path:'one.json',content:'{"next":true}',existed:true,original}],fingerprints:{'one.json':{exists:true,sha256:sha256(original)}},fileOps})}catch(error){console.log(JSON.stringify({code:error.code,renames}))}`,
      [root],
    );
    expect(JSON.parse(result.stdout)).toEqual({ code: 'precondition_mismatch', renames: 0 });
    expect(fs.readFileSync(path.join(root, 'one.json'), 'utf8')).toBe('{"drift":true}');
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe('E2E-012 — missing asset protection through public --check', () => {
  test('missing reachable asset blocks; restoring its registered placeholder bytes returns ready', () => {
    const root = createSafeWorkspace();
    const placeholder = MANIFEST.assets.find(asset => asset.path.endsWith('$Adversario4.png'));
    fs.unlinkSync(path.join(root, placeholder.path));
    const blocked = runWriter(root, ['--check']);
    expect(JSON.parse(blocked.stdout)).toEqual({ status: 'blocked', code: 'reference_missing', reference: 'img/characters/Estadio/$Adversario4.png' });
    fs.copyFileSync(path.join(root, placeholder.fallbackPath), path.join(root, placeholder.path));
    const ready = runWriter(root, ['--check']);
    expect(ready.status).toBe(0);
    expect(JSON.parse(ready.stdout)).toMatchObject({ status: 'ready', assets: 'complete', database_ids: 'reserved' });
    fs.rmSync(root, { recursive: true, force: true });
  });
});
