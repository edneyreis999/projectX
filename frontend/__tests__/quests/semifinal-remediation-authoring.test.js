/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = 'docs/Quests/2-semifinal/tooling';
const GAMEPLAY_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/lib/semifinal-gameplay.mjs`)).href;
const RUNTIME_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/lib/writer-runtime.mjs`)).href;
const ENTRYPOINT = `${FEATURE}/apply-gameplay.mjs`;
const QUEST_TOOLING = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/Quests/2-semifinal/quest-tooling.json'), 'utf8'));
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, QUEST_TOOLING.assetManifest), 'utf8'));
const ALLOWED_TARGETS = QUEST_TOOLING.materializations.filter(item => item.writer === 'semifinal-gameplay').map(item => item.target);

function runNode(source, args = [], cwd = ROOT) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', source, ...args], { cwd, encoding: 'utf8', timeout: 30000 });
}

function invoke(moduleUrl, exportName, args) {
  const result = runNode(
    `import * as subject from ${JSON.stringify(moduleUrl)};
     try { console.log(JSON.stringify({ok:true,value:await subject[process.argv[1]](...JSON.parse(process.argv[2]))})); }
     catch (error) { console.log(JSON.stringify({ok:false,error:Object.fromEntries(['code','path','anchor','kind'].flatMap(key => error[key] === undefined ? [] : [[key,error[key]]]))})); }`,
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

function createWorkspace() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-gameplay-'));
  for (const relativePath of ['package.json', 'package-lock.json']) copyFile(root, relativePath);
  fs.cpSync(path.join(ROOT, 'docs/Quests/2-semifinal'), path.join(root, 'docs/Quests/2-semifinal'), { recursive: true });
  fs.cpSync(path.join(ROOT, 'frontend/data'), path.join(root, 'frontend/data'), { recursive: true });
  for (const relativePath of ['frontend/js/plugins.js', 'frontend/js/plugins/Coreto_QuestVN.js', 'frontend/scripts/troop-definitions.js', 'frontend/scripts/generate-troops.js'])
    copyFile(root, relativePath);
  for (const asset of MANIFEST.assets) {
    copyFile(root, asset.path);
    if (asset.fallbackPath) copyFile(root, asset.fallbackPath);
  }
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(root, 'node_modules'), 'dir');
  return root;
}

function runWriter(root, args = []) {
  return spawnSync(process.execPath, [ENTRYPOINT, ...args], { cwd: root, encoding: 'utf8', timeout: 30000 });
}

describe('Gameplay writer public contract', () => {
  test('returns converged only when no materialization is pending', () => {
    const result = runWriter(ROOT, ['--check']);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'converged', feature: 'semifinal', writer: 'gameplay-engineer', targets: [] });
  });

  test.each([
    [
      'a position with an intact ownership marker',
      root => {
        const mapPath = path.join(root, 'frontend/data/Map062.json');
        const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        map.events[19].x += 1;
        fs.writeFileSync(mapPath, JSON.stringify(map));
        return 'frontend/data/Map062.json';
      },
    ],
    [
      'quest dialogue edited directly in RPG Maker',
      root => {
        const mapPath = path.join(root, 'frontend/data/Map063.json');
        const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        const gab = map.events[7].pages[0].list.find(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow' && command.parameters?.[1] === 'GabTextOnly');
        gab.parameters[3]['Text:json'] = JSON.stringify('Edição manual sem reconciliação');
        fs.writeFileSync(mapPath, JSON.stringify(map));
        return 'frontend/data/Map063.json';
      },
    ],
    [
      'reserve dialogue with an intact ownership marker',
      root => {
        const mapPath = path.join(root, 'frontend/data/Map062.json');
        const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        const gab = map.events[9].pages[0].list.find(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow');
        gab.parameters[3]['Text:json'] = JSON.stringify('Marker não prova convergência');
        fs.writeFileSync(mapPath, JSON.stringify(map));
        return 'frontend/data/Map062.json';
      },
    ],
  ])('returns ready_to_apply for %s', (_label, mutate) => {
    const root = createWorkspace();
    try {
      const target = mutate(root);
      const result = runWriter(root, ['--check']);
      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout)).toMatchObject({ status: 'ready_to_apply', targets: [target] });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('blocks when approved contract copy is not materialized by the writer', () => {
    const root = createWorkspace();
    try {
      const contractPath = path.join(root, 'docs/Quests/2-semifinal/semifinal.dialogos.md');
      const contract = fs.readFileSync(contractPath, 'utf8').replace('Os Machados estavam esperando por você, Thorin.', 'Os Machados ainda estavam esperando por você, Thorin.');
      fs.writeFileSync(contractPath, contract);
      const result = runWriter(root, ['--check']);
      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout)).toMatchObject({ status: 'blocked', code: 'discipline_contract_stale', path: 'docs/Quests/2-semifinal/semifinal.dialogos.md' });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('blocks when a new approved VN line has no runtime materialization', () => {
    const root = createWorkspace();
    try {
      const contractPath = path.join(root, 'docs/Quests/2-semifinal/semifinal.dialogos.md');
      const contract = `${fs.readFileSync(contractPath, 'utf8')}\n| \`VN-SEM-UNMATERIALIZED-COPY-011\` | Thorin | “Esta fala aprovada ainda não existe no jogo.” |\n`;
      fs.writeFileSync(contractPath, contract);
      const result = runWriter(root, ['--check']);
      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout)).toMatchObject({
        status: 'blocked',
        code: 'discipline_contract_stale',
        path: 'docs/Quests/2-semifinal/semifinal.dialogos.md',
        anchor: 'contract-dialogue:unmaterialized:Esta fala aprovada ainda não existe no jogo.',
      });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('rejects positional arguments', () => {
    const result = runWriter(ROOT, ['frontend/data/Map062.json']);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'invalid_arguments', command: 'apply-semifinal-gameplay', accepted: ['--check'] });
  });

  test('takes its allowlist from the quest manifest', () => {
    expect(
      invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: ['frontend/data/Enemies.json'], edits: [{ path: 'frontend/data/Enemies.json', content: '[]' }], allowedTargets: ALLOWED_TARGETS }])
        .ok,
    ).toBe(true);
    const forbidden = 'docs/Quests/2-semifinal/semifinal.dialogos.md';
    expect(invoke(GAMEPLAY_MODULE, 'validateGameplayPlan', [{ targets: [forbidden], edits: [{ path: forbidden, content: 'x' }], allowedTargets: ALLOWED_TARGETS }])).toEqual({
      ok: false,
      error: { code: 'restricted_diff_violation', path: forbidden },
    });
  });
});

describe('Atomic materialization', () => {
  test('rejects invalid JSON before writing', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-plan-'));
    try {
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
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('restores every target when a rename fails', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-rollback-'));
    try {
      fs.writeFileSync(path.join(root, 'one.json'), '{"before":1}', { mode: 0o640 });
      fs.writeFileSync(path.join(root, 'three.json'), '{"before":3}', { mode: 0o640 });
      const result = runNode(
        `import fs from 'node:fs'; import path from 'node:path'; import {applyAtomicPlan,sha256} from ${JSON.stringify(RUNTIME_MODULE)};
         const root=process.argv[1], names=['one.json','two.json','three.json'], existed=[true,false,true], originals=names.map((name,index)=>existed[index]?fs.readFileSync(path.join(root,name)):undefined); let production=0;
         const edits=names.map((name,index)=>({path:name,content:'{"after":'+index+'}',existed:existed[index],original:originals[index]}));
         const fingerprints=Object.fromEntries(names.map((name,index)=>[name,{exists:existed[index],sha256:existed[index]?sha256(originals[index]):null}]));
         const fileOps={...fs,renameSync(source,target){if(source.includes('.scratch-')&&++production===3)throw new Error('third');return fs.renameSync(source,target)}};
         let code;try{await applyAtomicPlan({rootDir:root,writer:'test',targets:names,allowedTargets:names,edits,fingerprints,fileOps})}catch(error){code=error.code}
         const restored=fs.readFileSync(path.join(root,'one.json')).equals(originals[0])&&!fs.existsSync(path.join(root,'two.json'))&&fs.readFileSync(path.join(root,'three.json')).equals(originals[2]);
         console.log(JSON.stringify({code,restored,debris:fs.readdirSync(root).filter(name=>name.includes('.scratch-')||name.includes('.rollback-'))}));`,
        [root],
      );
      expect(JSON.parse(result.stdout)).toEqual({ code: 'atomic_apply_failed', restored: true, debris: [] });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  test('apply repairs drift and the next check converges', () => {
    const root = createWorkspace();
    try {
      const mapPath = path.join(root, 'frontend/data/Map062.json');
      const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
      map.events[19].x += 1;
      fs.writeFileSync(mapPath, JSON.stringify(map));
      expect(runWriter(root).status).toBe(0);
      const check = runWriter(root, ['--check']);
      expect(check.status).toBe(0);
      expect(JSON.parse(check.stdout)).toMatchObject({ status: 'converged', targets: [] });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

test('a missing registered asset blocks the writer check', () => {
  const root = createWorkspace();
  try {
    const asset = MANIFEST.assets.find(item => item.path.endsWith('$Adversario4.png'));
    fs.unlinkSync(path.join(root, asset.path));
    const result = runWriter(root, ['--check']);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'reference_missing', reference: 'img/characters/Estadio/$Adversario4.png' });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
