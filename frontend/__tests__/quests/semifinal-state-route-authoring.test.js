/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../..');
const GAMEPLAY_MODULE = path.join(ROOT, '.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-gameplay.mjs');
const GAMEPLAY_WRITER = path.join(ROOT, '.compozy/tasks/010-semifinal-completa/scripts/apply-semifinal-gameplay.mjs');
const PHASE1 = path.join(ROOT, 'planos/010-guia-migracao-nova-arquitetura/fase1/builds/migrate-semifinal-maps.mjs');
const FINGERPRINT_FIXTURE = '.compozy/tasks/010-semifinal-completa/fixtures/gameplay/discipline-fingerprints.json';
const PROTECTED_FIXTURE = '.compozy/tasks/010-semifinal-completa/fixtures/gameplay/protected-hashes.json';
const WRITER_CASES_FIXTURE = '.compozy/tasks/010-semifinal-completa/fixtures/gameplay/writer-cases.json';

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function pluginCommand(command, plugin, name, args = {}) {
  return command.code === 357 && command.parameters?.[0] === plugin && command.parameters?.[1] === name && Object.entries(args).every(([key, value]) => command.parameters?.[3]?.[key] === value);
}

function allCommands(map) {
  return map.events.filter(Boolean).flatMap(event => event.pages.flatMap((page, pageIndex) => page.list.map((command, commandIndex) => ({ event, page, pageIndex, command, commandIndex }))));
}

function runNode(args, cwd = ROOT) {
  return spawnSync(process.execPath, args, { cwd, encoding: 'utf8' });
}

function runModule(root, source) {
  return runNode(['--input-type=module', '-e', `import * as m from ${JSON.stringify(pathToFileUrl(GAMEPLAY_MODULE))};\n${source}`, root]);
}

function pathToFileUrl(file) {
  return `file://${file.split(path.sep).map(encodeURIComponent).join('/')}`;
}

const FIXTURE_PATHS = [
  ...Object.keys({
    'docs/Quests/2-semifinal/semifinal.dialogos.md': true,
    'docs/Quests/2-semifinal/semifinal.audio.md': true,
    'docs/Quests/2-semifinal/semifinal.cutscene.md': true,
    'frontend/data/Map008.json': true,
    'frontend/data/Map009.json': true,
    'frontend/data/Map010.json': true,
    'frontend/data/Map014.json': true,
    'frontend/data/MapInfos.json': true,
    'frontend/data/System.json': true,
    'frontend/data/CoretoQuests.json': true,
    'frontend/data/Map022.json': true,
    'frontend/data/Map045.json': true,
    'frontend/data/Map049.json': true,
    'frontend/data/Map061.json': true,
    'frontend/data/Map062.json': true,
    'frontend/data/Map063.json': true,
    'frontend/data/Map064.json': true,
    'frontend/data/Map044.json': true,
    'frontend/data/CommonEvents.json': true,
    'frontend/js/plugins.js': true,
    'planos/010-guia-migracao-nova-arquitetura/fase1/builds/migrate-semifinal-maps.mjs': true,
  }),
];

function fixtureRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-task04-'));
  for (const relativePath of FIXTURE_PATHS) {
    const target = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(ROOT, relativePath), target);
  }
  return root;
}

function productionHashes(root) {
  return Object.fromEntries(
    ['frontend/data/CoretoQuests.json', 'frontend/data/Map022.json', 'frontend/data/Map045.json', 'frontend/data/Map049.json', 'frontend/data/Map061.json'].map(relativePath => [
      relativePath,
      fs.existsSync(path.join(root, relativePath)) ? sha256(fs.readFileSync(path.join(root, relativePath))) : null,
    ]),
  );
}

describe('UT-003/UT-004 — canonical semifinal state and journal projection', () => {
  const registry = readJson('frontend/data/CoretoQuests.json');
  const system = readJson('frontend/data/System.json');
  const quest = registry.quests['a-semifinal'];

  test('uses V29, the exact sparse graph, and preserves reserved V111', () => {
    expect(system.variables[29]).toBe('v_qSemifinal_progress');
    expect(system.variables[111]).toBe('v_qTutorialFundaForjaprata_stage');
    expect(quest.stageVariableId).toBe(29);
    expect(quest.initialState).toBe(0);
    expect(quest.terminalStates).toEqual([900]);
    expect(Object.entries(quest.transitions).map(([id, transition]) => [id, transition.from, transition.to])).toEqual([
      ['START_STORY', [0], 10],
      ['INTRODUCE_JOURNAL', [10], 20],
      ['FOUND_SLING', [20], 30],
      ['LEAVE_EQUIPPED', [30], 40],
      ['ARRIVE_STADIUM', [40], 50],
      ['REQUIRE_HELMET', [50], 60],
      ['TAKE_HELMET', [60], 70],
      ['EQUIP_HELMET', [70], 80],
      ['AUTHORIZE_FIELD', [80], 90],
      ['ENTER_FIELD', [90], 100],
      ['ESTABLISH_VICTORY', [100], 110],
      ['COMMIT_ESCORT', [110], 120],
      ['ARRIVE_HOME', [120], 900],
    ]);
    expect(quest.transitions.ARRIVE_HOME.terminal).toBe(true);
  });

  test('is the sole aSemifinal projector with the exact eight thresholds', () => {
    expect(
      Object.entries(registry.quests)
        .filter(([, candidate]) => candidate.pkd?.questId === 'aSemifinal')
        .map(([key]) => key),
    ).toEqual(['a-semifinal']);
    expect(quest.pkd.objectives).toEqual([
      { id: 1, knownFrom: 20, completedAt: 30 },
      { id: 2, knownFrom: 30, completedAt: 50 },
      { id: 3, knownFrom: 50, completedAt: 60 },
      { id: 4, knownFrom: 60, completedAt: 70 },
      { id: 5, knownFrom: 70, completedAt: 80 },
      { id: 6, knownFrom: 80, completedAt: 90 },
      { id: 7, knownFrom: 90, completedAt: 110 },
      { id: 8, knownFrom: 120, completedAt: 900 },
    ]);
    expect(quest.pkd.completeQuestAtTerminal).toBe(true);
  });
});

describe('UT-006/UT-007 and IT-003 — phase-1 topology and urgent Map061 route', () => {
  const infos = readJson('frontend/data/MapInfos.json');
  const map61 = readJson('frontend/data/Map061.json');

  test('resolves live IDs 61–64 and the repaired historical repository root', () => {
    expect(infos[61]).toMatchObject({ id: 61, name: 'EX_Distrito_Comercial', parentId: 39 });
    expect(infos[62]).toMatchObject({ id: 62, name: 'EX_Estadio', parentId: 39 });
    expect(infos[63]).toMatchObject({ id: 63, name: 'EX_Vestiario', parentId: 62 });
    expect(infos[64]).toMatchObject({ id: 64, name: 'EX_Campo_de_Futebol_Runico', parentId: 62 });
    expect(read('planos/010-guia-migracao-nova-arquitetura/fase1/builds/migrate-semifinal-maps.mjs')).toContain('path.resolve(scriptDir, "../../../..")');
    const result = runNode([PHASE1, '--check']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Terminal validation passed');
  });

  test.each([
    [14, 0],
    [16, 0],
    [17, 0],
    [17, 1],
  ])('Map061 E%i/P%i blocks only exact state 40 with a non-stacking Gab and safe else route', (eventId, pageIndex) => {
    const event = map61.events[eventId];
    const list = event.pages[pageIndex].list;
    expect(event.note).toBe('SEMIFINAL:MAP061_ENTRANCE_BLOCKER:DL-SEM-URGENT-THORIN-001');
    expect(list[0]).toEqual({ code: 111, indent: 0, parameters: [1, 29, 0, 40, 0] });
    const alternate = list.findIndex(command => command.code === 411 && command.indent === 0);
    const end = list.findIndex((command, index) => index > alternate && command.code === 412 && command.indent === 0);
    const blocked = list.slice(1, alternate);
    const normal = list.slice(alternate + 1, end);
    expect(blocked.some(command => command.code === 201)).toBe(false);
    expect(blocked.filter(command => pluginCommand(command, 'VisuMZ_4_GabWindow', 'GabTextOnly'))).toHaveLength(1);
    const gab = blocked.find(command => pluginCommand(command, 'VisuMZ_4_GabWindow', 'GabTextOnly'));
    expect(gab.parameters[3]['Text:json']).toContain('Dragobur deve estar soltando fumaça pelo nariz');
    expect(gab.parameters[3]['ForceGab:eval']).toBe('true');
    expect(JSON.parse(gab.parameters[3]['Override:struct'])['BypassAntiRepeat:eval']).toBe('true');
    expect(blocked.filter(command => pluginCommand(command, 'Coreto_Cutscene', 'BeginCutscene'))).toHaveLength(1);
    expect(blocked.filter(command => pluginCommand(command, 'Coreto_Cutscene', 'FinishCutscene'))).toHaveLength(1);
    expect(blocked.some(command => command.code === 115)).toBe(true);
    expect(normal.filter(command => command.code === 201)).toHaveLength(1);
  });

  test('keeps every migrated stadium entrance routed to current Map062', () => {
    for (const eventId of [3, 5, 20]) {
      const transfers = map61.events[eventId].pages.flatMap(page => page.list.filter(command => command.code === 201));
      expect(transfers).toEqual(expect.arrayContaining([expect.objectContaining({ parameters: expect.arrayContaining([0, 62]) })]));
    }
  });
});

describe('IT-002 — protected opening on the unified state machine', () => {
  const map22 = readJson('frontend/data/Map022.json');
  const map45 = readJson('frontend/data/Map045.json');
  const map49 = readJson('frontend/data/Map049.json');

  test('traverses START_STORY → INTRODUCE_JOURNAL → FOUND_SLING → LEAVE_EQUIPPED exactly once', () => {
    const joined = [map22, map45, map49].flatMap(allCommands);
    const transitionIds = joined
      .filter(({ command }) => pluginCommand(command, 'Coreto_QuestCore', 'QuestTransition', { questKey: 'a-semifinal' }))
      .map(({ command }) => command.parameters[3].transitionId);
    for (const id of ['START_STORY', 'INTRODUCE_JOURNAL', 'FOUND_SLING', 'LEAVE_EQUIPPED']) expect(transitionIds.filter(candidate => candidate === id)).toHaveLength(1);
    expect(joined.some(({ command }) => command.code === 122 && command.parameters[0] <= 29 && command.parameters[1] >= 29)).toBe(false);
    expect(JSON.stringify([map22, map45, map49])).not.toContain('tutorial-funda-forjaprata');
    expect(
      [map22, map45, map49].flatMap(allCommands).some(({ command }) => [355, 655].includes(command.code) && String(command.parameters?.[0] ?? '').includes('SQSM.SetActiveQuest("aSemifinal"')),
    ).toBe(false);
  });

  test('preserves the dream session, journal UI, sling grant/equipment gate, transfer, and recovery', () => {
    expect(map49.events[1].pages[0].list.some(command => pluginCommand(command, 'Coreto_QuestVN', 'AssertVisualNovelSession', { questKey: 'a-semifinal', entryKey: 'ABERTURA_FORJAPRATA' }))).toBe(
      true,
    );
    expect(map45.events[7].pages[0].list.some(command => command.code === 355 && command.parameters[0] === 'SQSM.OpenQuestJournal();')).toBe(true);
    expect(map45.events[20].pages.flatMap(page => page.list).some(command => pluginCommand(command, 'Coreto_Quests', 'addWeapon', { weaponID: '1' }))).toBe(true);
    expect(map45.events[7].pages.flatMap(page => page.list).some(command => command.code === 111 && command.parameters[0] === 4 && command.parameters[1] === 3)).toBe(true);
    expect(map45.events[7].pages.flatMap(page => page.list).some(command => command.code === 201 && command.parameters[1] === 44)).toBe(true);
    expect(map45.events[7].pages.some(page => page.conditions.variableValid && page.conditions.variableId === 29 && page.conditions.variableValue === 40)).toBe(true);
    expect(map45.events[12].pages.some(page => page.conditions.variableValid && page.conditions.variableId === 29 && page.conditions.variableValue === 900)).toBe(true);
  });
});

describe('UT-018/IT-001 — fail-closed Gameplay writer and discipline fingerprints', () => {
  test('keeps the gameplay fixtures complete and synchronized with their protected sources', () => {
    const fingerprints = readJson(FINGERPRINT_FIXTURE);
    const protectedHashes = readJson(PROTECTED_FIXTURE);
    const writerCases = readJson(WRITER_CASES_FIXTURE);
    for (const [relativePath, expected] of Object.entries(fingerprints.contracts)) expect(sha256(read(relativePath))).toBe(expected);
    for (const [relativePath, expected] of Object.entries(protectedHashes.legacy_maps)) expect(sha256(read(relativePath))).toBe(expected);
    expect(writerCases.cases.map(testCase => testCase.id)).toEqual([
      'stale-discipline',
      'missing-discipline',
      'unauthorized-target',
      'concurrent-target-change',
      'partial-phase1',
      'idempotent-terminal',
    ]);
  });

  test('public --check follows the frozen structured result and plans no write', () => {
    const result = runNode([GAMEPLAY_WRITER, '--check']);
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ status: 'ready', feature: '010-semifinal-completa', writer: 'gameplay-engineer', writes: 0 });
  });

  test('binds all three approved fingerprints and rejects a stale source without runtime writes', () => {
    const root = fixtureRoot();
    const before = productionHashes(root);
    const preflight = runModule(
      root,
      'const plan = await m.planGameplayChanges(process.argv[1]); console.log(JSON.stringify({count: plan.length, fingerprints: m.verifyDisciplineContracts(process.argv[1])}));',
    );
    expect(preflight.status).toBe(0);
    expect(JSON.parse(preflight.stdout).fingerprints).toEqual(Object.fromEntries(Object.entries(readJson(FINGERPRINT_FIXTURE).contracts)));
    fs.appendFileSync(path.join(root, 'docs/Quests/2-semifinal/semifinal.audio.md'), '\n');
    const stale = runModule(root, 'try { await m.planGameplayChanges(process.argv[1]); } catch (error) { console.log(error.code); process.exit(1); }');
    expect(stale.status).toBe(1);
    expect(stale.stdout.trim()).toBe('discipline_contract_stale');
    expect(productionHashes(root)).toEqual(before);
  });

  test('rejects a discipline change between preflight and apply without runtime writes', () => {
    const root = fixtureRoot();
    const before = productionHashes(root);
    const result = runModule(
      root,
      "const plan = await m.planGameplayChanges(process.argv[1]); const fs = await import('node:fs'); fs.appendFileSync(process.argv[1] + '/docs/Quests/2-semifinal/semifinal.audio.md', '\\n'); try { m.applyGameplayChanges(process.argv[1], plan); } catch (error) { console.log(error.code); process.exit(1); }",
    );
    expect(result.status).toBe(1);
    expect(result.stdout.trim()).toBe('discipline_contract_stale');
    expect(productionHashes(root)).toEqual(before);
  });

  test('applies a fixture plan atomically and converges to a semantic no-op', () => {
    const root = fixtureRoot();
    const registryPath = path.join(root, 'frontend/data/CoretoQuests.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    registry.quests['tutorial-funda-forjaprata'] = structuredClone(registry.quests['a-semifinal']);
    registry.quests['tutorial-funda-forjaprata'].stageVariableId = 111;
    delete registry.quests['a-semifinal'];
    fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 4)}\n`);
    const apply = runModule(
      root,
      'const plan = await m.planGameplayChanges(process.argv[1]); m.applyGameplayChanges(process.argv[1], plan); const replay = await m.planGameplayChanges(process.argv[1]); console.log(JSON.stringify({changed: plan.length, replay: replay.length}));',
    );
    expect(apply.status).toBe(0);
    expect(JSON.parse(apply.stdout)).toEqual({ changed: 1, replay: 0 });
  });

  test('rejects unauthorized ownership and protected legacy drift', () => {
    const unauthorized = runModule(
      ROOT,
      "try { m.validatePlannerChanges([{path:'frontend/data/Map008.json',before:'{}',after:'{}'}], m.SCENE_PLANNER_CONTRACT.allowedTargets); } catch (error) { console.log(error.code); process.exit(1); }",
    );
    expect(unauthorized.status).toBe(1);
    expect(unauthorized.stdout.trim()).toBe('protected_surface_violation');

    const root = fixtureRoot();
    fs.appendFileSync(path.join(root, 'frontend/data/Map008.json'), ' ');
    const protectedResult = runModule(root, 'try { await m.planGameplayChanges(process.argv[1]); } catch (error) { console.log(error.code); process.exit(1); }');
    expect(protectedResult.status).toBe(1);
    expect(protectedResult.stdout.trim()).toBe('protected_surface_violation');
  });

  test.each([
    {
      name: 'a missing discipline contract',
      mutate(root) {
        fs.rmSync(path.join(root, 'docs/Quests/2-semifinal/semifinal.cutscene.md'));
      },
      code: 'discipline_contract_missing',
    },
    {
      name: 'a missing required record',
      mutate(root) {
        fs.rmSync(path.join(root, 'frontend/data/Map061.json'));
      },
      code: 'reference_missing',
    },
    {
      name: 'a mismatched semantic anchor',
      mutate(root) {
        const target = path.join(root, 'frontend/data/Map022.json');
        const map = JSON.parse(fs.readFileSync(target, 'utf8'));
        map.events[17].name = 'unexpected owner';
        fs.writeFileSync(target, `${JSON.stringify(map, null, 4)}\n`);
      },
      code: 'precondition_mismatch',
    },
    {
      name: 'a partial phase-1 repair',
      mutate(root) {
        const target = path.join(root, 'planos/010-guia-migracao-nova-arquitetura/fase1/builds/migrate-semifinal-maps.mjs');
        fs.writeFileSync(target, fs.readFileSync(target, 'utf8').replace('path.resolve(scriptDir, "../../../..")', 'path.resolve(scriptDir, "../../invalid")'));
      },
      code: 'phase1_reconciliation_failed',
    },
  ])('rejects $name before changing any existing production target', ({ mutate, code }) => {
    const root = fixtureRoot();
    mutate(root);
    const before = productionHashes(root);
    const result = runModule(root, 'try { await m.planGameplayChanges(process.argv[1]); } catch (error) { console.log(error.code); process.exit(1); }');
    expect(result.status).toBe(1);
    expect(result.stdout.trim()).toBe(code);
    expect(productionHashes(root)).toEqual(before);
  });

  test('detects a concurrent target change after preflight', () => {
    const root = fixtureRoot();
    const registryPath = path.join(root, 'frontend/data/CoretoQuests.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    registry.quests['tutorial-funda-forjaprata'] = structuredClone(registry.quests['a-semifinal']);
    delete registry.quests['a-semifinal'];
    fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 4)}\n`);
    const result = runModule(
      root,
      "const plan = await m.planGameplayChanges(process.argv[1]); const target = plan[0].path; const fs = await import('node:fs'); fs.appendFileSync(process.argv[1] + '/' + target, ' '); try { m.applyGameplayChanges(process.argv[1], plan); } catch (error) { console.log(error.code); process.exit(1); }",
    );
    expect(result.status).toBe(1);
    expect(result.stdout.trim()).toBe('precondition_mismatch');
  });

  test('keeps the Task 05 scene planner boundary optional, fixed, and ownership-checked', () => {
    const root = fixtureRoot();
    const modulePath = path.join(root, '.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-scenes.mjs');
    fs.mkdirSync(path.dirname(modulePath), { recursive: true });
    fs.writeFileSync(modulePath, "export function planSemifinalScenes(){ return [{path:'frontend/data/Map008.json',before:'{}',after:'{}'}]; }\n");
    const result = runModule(root, 'try { await m.planGameplayChanges(process.argv[1]); } catch (error) { console.log(error.code); process.exit(1); }');
    expect(result.status).toBe(1);
    expect(result.stdout.trim()).toBe('protected_surface_violation');
    expect(read('.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-gameplay.mjs')).toContain("export: 'planSemifinalScenes'");
  });
});
