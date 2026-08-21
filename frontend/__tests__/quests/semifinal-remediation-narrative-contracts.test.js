/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = '.compozy/tasks/011-semifinal-playtest-remediation';
const SCRIPT = `${FEATURE}/scripts/apply-semifinal-remediation-narrative.mjs`;
const DIALOGUE = 'docs/Quests/2-semifinal/semifinal.dialogos.md';
const FLOW = 'docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md';
const AUDIO = 'docs/Quests/2-semifinal/semifinal.audio.md';
const CUTSCENE = 'docs/Quests/2-semifinal/semifinal.cutscene.md';

const NARRATIVE_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/semifinal-narrative.mjs`)).href;
const RUNTIME_MODULE = pathToFileURL(path.join(ROOT, `${FEATURE}/scripts/lib/writer-runtime.mjs`)).href;

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function copyPath(sourceRoot, targetRoot, relativePath) {
  const source = path.join(sourceRoot, relativePath);
  const target = path.join(targetRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

function fixtureRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-remediation-narrative-'));
  for (const relativePath of [
    `${FEATURE}/_spec.md`,
    `${FEATURE}/_user_stories.md`,
    `${FEATURE}/_dx.md`,
    `${FEATURE}/_tests.md`,
    `${FEATURE}/adrs`,
    `${FEATURE}/scripts`,
    `${FEATURE}/fixtures/narrative/canonical`,
    `${FEATURE}/fixtures/narrative/protected-hashes.json`,
    `${FEATURE}/fixtures/narrative/writer-cases.json`,
    '.compozy/tasks/010-semifinal-completa',
    DIALOGUE,
    FLOW,
    AUDIO,
    CUTSCENE,
    'docs/GDD/01_Worldbuilding/01.5_Social/Futebol Rúnico.md',
    'docs/GDD/01_Worldbuilding/01.5_Social/Organização Social de Gildrat.md',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens/Thorin.md',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens/Filena.md',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens/Dragobur.md',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens/Killin.md',
    'docs/GDD/02_Atlas_Folk/02.2_Personagens/Mhordred.md',
  ]) copyPath(ROOT, root, relativePath);
  return root;
}

function runWriter(root, args = []) {
  return spawnSync(process.execPath, [path.join(root, SCRIPT), ...args], { cwd: root, encoding: 'utf8' });
}

function allFiles(root) {
  const result = [];
  const walk = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const candidate = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(candidate);
      else if (entry.isFile()) result.push(path.relative(root, candidate).split(path.sep).join('/'));
    }
  };
  walk(root);
  return result.sort();
}

function hashes(root) {
  return Object.fromEntries(allFiles(root).map(relativePath => [relativePath, sha256(fs.readFileSync(path.join(root, relativePath)))]));
}

function runNode(source, args = []) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', source, ...args], { cwd: ROOT, encoding: 'utf8' });
}

function invoke(moduleUrl, exportName, args) {
  const result = runNode(
    `import * as subject from ${JSON.stringify(moduleUrl)};
     try {
       const value = await subject[process.argv[1]](...JSON.parse(process.argv[2]));
       console.log(JSON.stringify({ ok: true, value }));
     } catch (error) {
       const { code, path, anchor, command, accepted } = error;
       console.log(JSON.stringify({ ok: false, error: { code, path, anchor, command, accepted } }));
     }`,
    [exportName, JSON.stringify(args)],
  );
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

function validateContracts(value) {
  return invoke(NARRATIVE_MODULE, 'validateNarrativeContracts', [value]);
}

describe('UT-001/UT-002 — Narrative CLI parser', () => {
  test('accepts only zero arguments or --check', () => {
    expect(invoke(NARRATIVE_MODULE, 'parseNarrativeArguments', [[]])).toEqual({ ok: true, value: { checkOnly: false } });
    expect(invoke(NARRATIVE_MODULE, 'parseNarrativeArguments', [['--check']])).toEqual({ ok: true, value: { checkOnly: true } });
    for (const args of [['target.md'], ['--check', '--check'], ['--check', 'target.md']]) {
      expect(invoke(NARRATIVE_MODULE, 'parseNarrativeArguments', [args])).toMatchObject({ ok: false, error: { code: 'invalid_arguments' } });
    }
  });

  test('emits the exact invalid_arguments object and exits 1 before discovery', () => {
    const result = runWriter(ROOT, ['--force']);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({
      status: 'blocked',
      code: 'invalid_arguments',
      command: 'apply-semifinal-remediation-narrative',
      accepted: ['--check'],
    });
  });
});

describe('UT-003/UT-004 — ownership, allowlist, and historical protection', () => {
  test.each([
    ['docs/Quests/2-semifinal/semifinal.audio.md'],
    ['frontend/data/Map062.json'],
    ['.compozy/tasks/010-semifinal-completa/task_06.md'],
  ])('rejects %s before scratch creation', relativePath => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-restricted-'));
    const result = invoke(RUNTIME_MODULE, 'assertAllowedTargets', [{
      targets: [relativePath],
      allowedTargets: [DIALOGUE, FLOW, `${FEATURE}/fixtures/narrative/source-inventory.json`],
    }]);
    expect(result).toMatchObject({ ok: false, error: { code: 'restricted_diff_violation', path: relativePath } });
    expect(allFiles(root).filter(item => item.includes('.scratch-'))).toEqual([]);
  });

  test('planner exposes only the two documents and stable Narrative inventory', () => {
    const root = fixtureRoot();
    const result = invoke(NARRATIVE_MODULE, 'planNarrativeRemediation', [{ rootDir: root, checkOnly: true }]);
    expect(result.ok).toBe(true);
    const plan = result.value;
    expect(plan.writer).toBe('narrative-designer');
    expect(plan.targets.every(target => [DIALOGUE, FLOW, `${FEATURE}/fixtures/narrative/source-inventory.json`].includes(target))).toBe(true);
    expect(plan.targets).not.toContain(AUDIO);
    expect(plan.targets).not.toContain(CUTSCENE);
    expect(plan.targets.some(target => target.startsWith('.compozy/tasks/010-semifinal-completa/'))).toBe(false);
  });
});

describe('UT-036–UT-038 — approved narrative facts', () => {
  const valid = () => ({
    dialogue: fs.readFileSync(path.join(ROOT, DIALOGUE), 'utf8'),
    flow: fs.readFileSync(path.join(ROOT, FLOW), 'utf8'),
  });

  test.each([
    ['routing-vn', value => value.replace('Toda fala que avança a história principal ou a quest usa VN', 'Toda progressão fica em EX')],
    ['ordinary-helmet', value => value.replace('Pegue um capacete velho', 'Pegue o capacete da estátua')],
    ['thorin-answer', value => value.replaceAll('VN-SEM-DRAGOBUR-AUTH-THORIN-011', 'VN-SEM-DRAGOBUR-AUTH-REMOVED-011')],
    ['dragobur-anger-urgency', value => value.replace('O jogo está acabando', 'Sem pressa')],
  ])('rejects dialogue mismatch %s', (_label, mutate) => {
    const source = valid();
    expect(validateContracts({ ...source, dialogue: mutate(source.dialogue) })).toMatchObject({
      ok: false, error: { code: 'narrative_contract_mismatch' },
    });
  });

  test.each([
    ['sponsorship', value => value.replace('Martelos de Bronze têm patrocínio de Casas Mineradoras', 'Martelos não têm patrocínio')],
    ['working identity', value => value.replace('Machados são um time de bairros trabalhadores e poucos recursos', 'Machados são nobres')],
    ['noble provocation', value => value.replaceAll('filho de uma Grande Casa', 'atleta qualquer')],
    ['team dignity', value => value.replace('o time não rejeita Thorin por sua origem', 'o time rejeita Thorin por sua origem')],
  ])('rejects class-world mismatch %s', (_label, mutate) => {
    const source = valid();
    expect(validateContracts({ ...source, dialogue: mutate(source.dialogue) })).toMatchObject({
      ok: false, error: { code: 'narrative_contract_mismatch' },
    });
  });

  test('rejects an explicit caste lecture in current 011 copy', () => {
    const source = valid();
    const dialogue = source.dialogue.replace('Fatos congelados: os Martelos', 'A casta média e a casta baixa explicam o sistema de castas.\n\nFatos congelados: os Martelos');
    expect(validateContracts({ ...source, dialogue })).toMatchObject({
      ok: false, error: { code: 'narrative_contract_mismatch', anchor: 'dialogue:no-caste-lecture' },
    });
  });

  test.each([
    ['Killin', value => value.replaceAll('Killin, Capitã da Guarda de Ferro', 'Killin, guarda')],
    ['Thordan', value => value.replaceAll('General Thordan', 'General incorreto')],
    ['Mhordred', value => value.replaceAll('VN-SEM-GUARD-MHORDRED-011', 'VN-SEM-GUARD-REMOVED-011')],
    ['Filena', value => value.replaceAll('VN-SEM-GUARD-FILENA-MOTIVE-011', 'VN-SEM-GUARD-FILENA-REMOVED-011')],
  ])('rejects canonical cast mismatch %s', (_label, mutate) => {
    const source = valid();
    expect(validateContracts({ ...source, dialogue: mutate(source.dialogue) })).toMatchObject({
      ok: false, error: { code: 'narrative_contract_mismatch' },
    });
  });

  test('rejects Tharok in the current 011 authority section', () => {
    const source = valid();
    const dialogue = source.dialogue.replace('### GAB-SEM-ESCORT-011', 'Tharok assume o comando.\n\n### GAB-SEM-ESCORT-011');
    expect(validateContracts({ ...source, dialogue })).toMatchObject({ ok: false, error: { anchor: 'dialogue:tharok-absent' } });
  });
});

describe('UT-060–UT-062 — missing/stale contracts and historical drift', () => {
  test('returns the exact missing-contract shape', () => {
    const root = fixtureRoot();
    fs.unlinkSync(path.join(root, DIALOGUE));
    const result = runWriter(root, ['--check']);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'blocked', code: 'discipline_contract_missing', path: DIALOGUE });
  });

  test('a post-check contract change blocks with zero replacements', () => {
    const root = fixtureRoot();
    const result = runNode(
      `import fs from 'node:fs'; import path from 'node:path';
       import { planNarrativeRemediation, NARRATIVE_TARGETS } from ${JSON.stringify(NARRATIVE_MODULE)};
       import { applyAtomicPlan, sha256 } from ${JSON.stringify(RUNTIME_MODULE)};
       const root = process.argv[1]; const dialogue = process.argv[2]; const cutscene = process.argv[3];
       const plan = planNarrativeRemediation({ rootDir: root, checkOnly: true });
       const before = sha256(fs.readFileSync(path.join(root, dialogue)));
       fs.appendFileSync(path.join(root, cutscene), '\\npost-check drift\\n');
       try { await applyAtomicPlan({ rootDir: root, ...plan, allowedTargets: NARRATIVE_TARGETS }); }
       catch (error) { console.log(JSON.stringify({ code: error.code, path: error.path, unchanged: before === sha256(fs.readFileSync(path.join(root, dialogue))) })); }`,
      [root, DIALOGUE, CUTSCENE],
    );
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ code: 'discipline_contract_stale', path: CUTSCENE, unchanged: true });
    expect(allFiles(root).filter(item => item.includes('.scratch-'))).toEqual([]);
  });

  test('changed 010 _spec.md returns the exact historical drift object', () => {
    const root = fixtureRoot();
    fs.appendFileSync(path.join(root, '.compozy/tasks/010-semifinal-completa/_spec.md'), '\ndrift\n');
    const result = runWriter(root, ['--check']);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toEqual({
      status: 'blocked',
      code: 'historical_baseline_drift',
      path: '.compozy/tasks/010-semifinal-completa/_spec.md',
    });
  });
});

describe('atomic runtime — rollback and absent-file restoration', () => {
  test('failure after creating an absent target restores every original byte, mode, and absence', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-atomic-'));
    const targets = ['one.md', 'two.md', 'new.md', 'four.md'];
    for (const [index, target] of targets.entries()) {
      if (target !== 'new.md') fs.writeFileSync(path.join(root, target), `before-${index}\n`, { mode: 0o640 });
    }
    const result = runNode(
      `import fs from 'node:fs'; import path from 'node:path';
       import { applyAtomicPlan, sha256 } from ${JSON.stringify(RUNTIME_MODULE)};
       const root = process.argv[1]; const targets = ['one.md','two.md','new.md','four.md'];
       const originals = targets.map(target => fs.existsSync(path.join(root,target)) ? fs.readFileSync(path.join(root,target)) : null);
       const edits = targets.map((target,index) => ({path:target,content:'after-'+index+'\\n',existed:originals[index] !== null,original:originals[index] ?? Buffer.alloc(0),mode:0o640}));
       const fingerprints = Object.fromEntries(targets.map((target,index) => [target,{exists:originals[index] !== null,sha256:originals[index] === null ? null : sha256(originals[index])}]));
       let productionRenames = 0;
       const fileOps = {...fs, renameSync(source,destination) { if (source.includes('.scratch-') && ++productionRenames === 4) throw new Error('injected'); fs.renameSync(source,destination); }};
       let code; try { await applyAtomicPlan({rootDir:root,writer:'test',targets,edits,fingerprints,allowedTargets:targets,fileOps}); } catch(error) { code=error.code; }
       const restored = targets.every((target,index) => originals[index] === null
         ? !fs.existsSync(path.join(root,target))
         : fs.readFileSync(path.join(root,target)).equals(originals[index]) && (fs.statSync(path.join(root,target)).mode & 0o777) === 0o640);
       const debris = fs.readdirSync(root).filter(name => name.includes('.scratch-') || name.includes('.rollback-'));
       console.log(JSON.stringify({code,restored,debris}));`,
      [root],
    );
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ code: 'atomic_apply_failed', restored: true, debris: [] });
  });
});

describe('IT-001 — public Narrative writer', () => {
  test('check, apply, and reapply have exact shapes, exact targets, and idempotent bytes', () => {
    const root = fixtureRoot();
    const beforeCheck = hashes(root);
    const check = runWriter(root, ['--check']);
    expect(check.status).toBe(0);
    expect(JSON.parse(check.stdout)).toEqual({ status: 'ready', feature: '011-semifinal-playtest-remediation', writer: 'narrative-designer' });
    expect(hashes(root)).toEqual(beforeCheck);

    const apply = runWriter(root);
    expect(apply.status).toBe(0);
    expect(JSON.parse(apply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'narrative-designer' });
    const afterApply = hashes(root);
    const changed = [...new Set([...Object.keys(beforeCheck), ...Object.keys(afterApply)])].filter(item => beforeCheck[item] !== afterApply[item]);
    expect(changed).toEqual([`${FEATURE}/fixtures/narrative/source-inventory.json`]);

    const reapply = runWriter(root);
    expect(reapply.status).toBe(0);
    expect(JSON.parse(reapply.stdout)).toEqual({ status: 'applied', feature: '011-semifinal-playtest-remediation', writer: 'narrative-designer' });
    expect(hashes(root)).toEqual(afterApply);
    expect(allFiles(root).filter(item => item.includes('.scratch-') || item.includes('.rollback-'))).toEqual([]);
  });

  test('repairs a superseded semantic anchor from the frozen 011 copy', () => {
    const root = fixtureRoot();
    const target = path.join(root, DIALOGUE);
    fs.writeFileSync(target, fs.readFileSync(target, 'utf8').replace('Pegue um capacete velho', 'Pegue o capacete da estátua'));
    const result = runWriter(root);
    expect(result.status).toBe(0);
    expect(fs.readFileSync(target, 'utf8')).toBe(fs.readFileSync(path.join(root, `${FEATURE}/fixtures/narrative/canonical/semifinal.dialogos.md`), 'utf8'));
  });
});
