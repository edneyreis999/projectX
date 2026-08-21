/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../..');
const WRITER = path.join(ROOT, '.compozy/tasks/010-semifinal-completa/scripts/apply-semifinal-gameplay.mjs');
const PLANNER = '.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-scenes.mjs';
const NAME_FIXTURE = '.compozy/tasks/010-semifinal-completa/fixtures/gameplay/runtime-name-classification.json';
const read = relative => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const json = relative => JSON.parse(read(relative));
const maps = Object.fromEntries([44, 62, 63, 64].map(id => [id, json(`frontend/data/Map${String(id).padStart(3, '0')}.json`)]));
const commands = map => map.events.filter(Boolean).flatMap(event => event.pages.flatMap((page, pageIndex) => page.list.map(command => ({ event, page, pageIndex, command }))));
const plugin = (command, owner, name, args = {}) =>
  command.code === 357 && command.parameters?.[0] === owner && command.parameters?.[1] === name && Object.entries(args).every(([key, value]) => command.parameters?.[3]?.[key] === value);
const transitions = map =>
  commands(map)
    .filter(({ command }) => plugin(command, 'Coreto_QuestCore', 'QuestTransition'))
    .map(({ command, event, page }) => ({ id: command.parameters[3].transitionId, quest: command.parameters[3].questKey, event: event.id, page }));

function plugins() {
  const source = read('frontend/js/plugins.js');
  return JSON.parse(source.slice(source.indexOf('['), source.lastIndexOf(']') + 1));
}

function copyFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'semifinal-task05-'));
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(root, 'node_modules'), 'dir');
  const paths = [
    'docs/Quests/2-semifinal/semifinal.dialogos.md',
    'docs/Quests/2-semifinal/semifinal.audio.md',
    'docs/Quests/2-semifinal/semifinal.cutscene.md',
    'frontend/data/Map008.json',
    'frontend/data/Map009.json',
    'frontend/data/Map010.json',
    'frontend/data/Map014.json',
    'frontend/data/MapInfos.json',
    'frontend/data/System.json',
    'frontend/data/CoretoQuests.json',
    'frontend/data/Map022.json',
    'frontend/data/Map044.json',
    'frontend/data/Map045.json',
    'frontend/data/Map049.json',
    'frontend/data/Map061.json',
    'frontend/data/Map062.json',
    'frontend/data/Map063.json',
    'frontend/data/Map064.json',
    'frontend/data/CommonEvents.json',
    'frontend/js/plugins.js',
    'planos/010-guia-migracao-nova-arquitetura/fase1/builds/migrate-semifinal-maps.mjs',
    '.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-gameplay.mjs',
    PLANNER,
  ];
  for (const relative of paths) {
    const target = path.join(root, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(ROOT, relative), target);
  }
  return root;
}

describe('Task 05 — Stadium-to-Home Semifinal Runtime', () => {
  test('UT-005 removes direct managed progression conflicts from owned current surfaces', () => {
    const owned = [maps[44], maps[62], maps[63], maps[64]];
    for (const map of owned)
      for (const { page, command } of commands(map)) {
        expect(command.code === 122 && command.parameters?.[0] <= 29 && command.parameters?.[1] >= 29).toBe(false);
        expect(page.conditions.variableValid && page.conditions.variableId === 111).toBe(false);
        expect(command.code === 111 && command.parameters?.[0] === 1 && command.parameters?.[1] === 111).toBe(false);
        expect([355, 655].includes(command.code) && /SQSM\.(?:SetActiveQuest|ShowTaskForQuest|CompleteTaskForQuest)\("aSemifinal"/.test(String(command.parameters?.[0]))).toBe(false);
      }
    expect(JSON.stringify(json('frontend/data/CommonEvents.json')[1])).not.toMatch(/aSemifinal|\[29,29|"code":122/);
  });

  test('UT-008 implements Dragobur states 50/60/70/80/90 and designated equipment authorization', () => {
    const event = maps[62].events[2];
    expect(event.pages.map(page => page.conditions.variableValue)).toEqual([50, 60, 70, 80, 90]);
    expect(JSON.stringify(event)).toContain('$gameActors.actor(3).isEquipped($dataArmors[51])');
    expect(transitions(maps[62]).filter(item => item.id === 'REQUIRE_HELMET')).toHaveLength(1);
    expect(transitions(maps[62]).filter(item => item.id === 'AUTHORIZE_FIELD')).toHaveLength(1);
  });

  test('UT-009 preserves the protected gag choreography and migrates only spoken EX delivery to queued Gab', () => {
    const event = maps[63].events[7];
    const first = event.pages[0].list;
    expect(event.note).toContain('PROTECTED_GAG');
    expect(first.filter(command => command.code === 205).map(command => command.parameters[0])).toEqual([4, 4, 3, 5, 2, -1]);
    expect(first.some(command => command.code === 212 && command.parameters[1] === 39)).toBe(true);
    expect(first.some(command => command.code === 250 && command.parameters[0].name === 'Damage3')).toBe(true);
    const gabs = first.filter(command => plugin(command, 'VisuMZ_4_GabWindow', 'GabTextOnly'));
    expect(gabs).toHaveLength(1);
    expect(gabs[0].parameters[3]['ForceGab:eval']).toBe('false');
    expect(event.pages[1].list.some(command => command.code === 212 || (command.code === 250 && command.parameters[0]?.name === 'Damage3'))).toBe(false);
  });

  test('UT-010 grants Armor 51 at most once, changes the statue, and requires manual actor-3 equipment', () => {
    const event = maps[63].events[13];
    const joined = event.pages.flatMap(page => page.list);
    expect(joined.filter(command => plugin(command, 'Coreto_Quests', 'addArmor', { armorID: '51' }))).toHaveLength(1);
    expect(JSON.stringify(event)).toContain('!$gameParty.hasItem($dataArmors[51], true)');
    expect(JSON.stringify(event)).toContain('$gameActors.actor(3).isEquipped($dataArmors[51])');
    expect(event.pages[1].image.characterName).toContain('Armadura');
    expect(joined.filter(command => command.code === 355 && command.parameters[0] === 'SceneManager.push(Scene_Equip);')).toHaveLength(2);
  });

  test('UT-011 presents the four causal match facts in order on the EX field without VN/battle/tutorial/input', () => {
    const event = maps[64].events[9];
    const text = JSON.stringify(event);
    const ids = ['DL-SEM-MATCH-RHEED-LOSING-001', 'DL-SEM-MATCH-RHEED-ENTRY-001', 'DL-SEM-MATCH-RHEED-GOAL-001', 'DL-SEM-MATCH-RHEED-VICTORY-001'];
    expect(ids.map(id => text.indexOf(id))).toEqual([...ids.map(id => text.indexOf(id))].sort((a, b) => a - b));
    expect(event.image).toBeUndefined();
    expect(event.pages[0].image.characterName).toBe('Reed');
    expect(text).not.toMatch(/QuestVN|VNPictureBusts|BattleManager|football tutorial|HUD/i);
    expect(event.pages[0].trigger).toBe(3);
  });

  test('UT-012 orders collective victory and permanent gift before guard recognition, Filena, and Killin command', () => {
    const text = JSON.stringify(maps[62].events[6]);
    const order = [
      'BT-SEM-CELEBRATION-COLLECTIVE-001',
      'BT-SEM-CELEBRATION-GIFT-001',
      'BT-SEM-GUARD-PERIPHERY-001',
      'BT-SEM-GUARD-RECOGNITION-001',
      'BT-SEM-FILENA-DISCOMFORT-001',
      'BT-SEM-KILLIN-ORDER-001',
    ];
    const positions = order.map(id => text.indexOf(id));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(text).not.toContain('addArmor');
  });

  test('UT-013 defines exactly one GENTLE/RESIST visual menu and converges before one escort commit', () => {
    const visual = plugins().find(entry => entry.name === 'PKD_VisualChoices_MZ');
    const items = JSON.parse(visual.parameters['visualItems:structA'])
      .map(JSON.parse)
      .filter(item => ['GENTLE', 'RESIST'].includes(item.choiceId));
    const menus = JSON.parse(visual.parameters['menus:structA'])
      .map(JSON.parse)
      .filter(menu => menu.menuId === 'semifinalThorinResponse');
    expect(items.map(item => item.choiceId).sort()).toEqual(['GENTLE', 'RESIST']);
    expect(menus).toHaveLength(1);
    const event = maps[62].events[6];
    expect(event.pages[0].list.filter(command => command.code === 402)).toHaveLength(2);
    expect(transitions(maps[62]).filter(item => item.id === 'COMMIT_ESCORT')).toHaveLength(1);
  });

  test('UT-014 pairs every authored cutscene lock and uses only declared semantic Gab barriers', () => {
    const allowed = new Set([...read('docs/Quests/2-semifinal/semifinal.cutscene.md').matchAll(/AW-SEM-[A-Z0-9-]+/g)].map(match => match[0]));
    for (const map of Object.values(maps))
      for (const event of map.events.filter(Boolean))
        for (const page of event.pages) {
          const begins = page.list.filter(command => plugin(command, 'Coreto_Cutscene', 'BeginCutscene')).length;
          const finishes = page.list.filter(command => plugin(command, 'Coreto_Cutscene', 'FinishCutscene')).length;
          expect(finishes).toBe(begins);
          for (let index = 0; index < page.list.length; index += 1)
            if (plugin(page.list[index], 'VisuMZ_4_GabWindow', 'WaitForGab')) {
              const marker = page.list[index - 1]?.parameters?.[0]?.replace('SEMIFINAL:', '');
              expect(allowed.has(marker)).toBe(true);
            }
        }
  });

  test('UT-015 orders ARRIVE_HOME before fim-de-jogo.START exactly once with non-Autorun state-900 recovery', () => {
    const event = maps[44].events[10];
    const all = transitions(maps[44]).filter(item => item.event === 10);
    expect(all.map(item => [item.quest, item.id])).toEqual([
      ['a-semifinal', 'ARRIVE_HOME'],
      ['fim-de-jogo', 'START'],
    ]);
    expect(event.pages[0].trigger).toBe(3);
    expect(event.pages[1].conditions.variableValue).toBe(900);
    expect(event.pages[1].trigger).not.toBe(3);
  });

  test('UT-016 applies typed current-runtime canon while preserving asset identities', () => {
    const fixture = json(NAME_FIXTURE);
    const combined = JSON.stringify([maps[44], maps[62], maps[63], maps[64]]);
    expect(fixture.display_replacements).toEqual({ Tordan: 'Thordan', Dragobour: 'Dragobur', Kilin: 'Killin' });
    expect(combined).toContain('General Thordan');
    expect(combined).toContain('Killin, Capitã da Guarda de Ferro');
    expect(combined).toContain('Portraits/Principal/Kilin');
    const quests = JSON.parse(plugins().find(entry => entry.name === 'PKD_SimpleQuestSystem').parameters['sqsQuests:structA']).map(JSON.parse);
    const current = quests
      .filter(quest => ['aSemifinal', 'fimDeJogo'].includes(quest.id))
      .map(JSON.stringify)
      .join('\n');
    expect(current).not.toMatch(/Tordan|Dragobour|Kilin|Tharok/);
    expect(current).toMatch(/Thordan|Dragobur|Killin/);
  });

  test('UT-017 binds every approved discipline ID to runtime, Task 04, or an explicit fallback record', () => {
    const runtime = [read(PLANNER), read('frontend/data/Map061.json'), ...Object.values(maps).map(JSON.stringify)].join('\n');
    for (const file of ['semifinal.dialogos.md', 'semifinal.audio.md', 'semifinal.cutscene.md']) {
      const ids = [...new Set(read(`docs/Quests/2-semifinal/${file}`).match(/\b(?:DL|BR|CUE|CS|BT|AW)-SEM-[A-Z0-9-]+/g) || [])];
      for (const id of ids) expect(runtime).toContain(id);
    }
  });

  test('IT-004 makes arrival → gag/helmet → manual equip → authorization structurally reachable', () => {
    expect(transitions(maps[62]).map(item => item.id)).toEqual(expect.arrayContaining(['ARRIVE_STADIUM', 'REQUIRE_HELMET', 'AUTHORIZE_FIELD', 'COMMIT_ESCORT']));
    expect(transitions(maps[63]).map(item => item.id)).toEqual(expect.arrayContaining(['TAKE_HELMET', 'EQUIP_HELMET']));
    expect(maps[62].events[18].pages[0].conditions.variableValue).toBe(90);
  });

  test('IT-005 enters the field, narrates, cleans up, reaches 110, and returns to the stadium', () => {
    expect(transitions(maps[64]).filter(item => item.id === 'ENTER_FIELD')).toHaveLength(1);
    expect(transitions(maps[64]).filter(item => item.id === 'ESTABLISH_VICTORY')).toHaveLength(1);
    const list = maps[64].events[9].pages[0].list;
    expect(list.filter(command => command.code === 205 && [4, 5, 6, 7].includes(command.parameters[0]))).toHaveLength(4);
    expect(list.some(command => command.code === 201 && command.parameters[1] === 62)).toBe(true);
  });

  test('IT-006 keeps both immediate reactions distinct and converges on one state-120 transfer', () => {
    const text = JSON.stringify(maps[62].events[6]);
    expect(text).toContain('DL-SEM-GENTLE-KILLIN-REACTION-001');
    expect(text).toContain('DL-SEM-RESIST-MHORDRED-REACTION-001');
    expect(transitions(maps[62]).filter(item => item.id === 'COMMIT_ESCORT')).toHaveLength(1);
    expect(maps[62].events[6].pages[0].list.filter(command => command.code === 201 && command.parameters[1] === 44)).toHaveLength(1);
  });

  test('IT-007 reaches terminal 900 outside and activates Fim de Jogo after the semifinal', () => {
    expect(transitions(maps[44]).filter(item => item.id === 'ARRIVE_HOME' && item.quest === 'a-semifinal')).toHaveLength(1);
    expect(transitions(maps[44]).filter(item => item.id === 'START' && item.quest === 'fim-de-jogo')).toHaveLength(1);
    expect(maps[44].events[10].pages[1].priorityType).toBe(0);
  });

  test('IT-008 supplies stable state recovery pages for every irreversible boundary', () => {
    expect(maps[62].events[20].pages[1]).toMatchObject({ trigger: 0, conditions: { variableId: 29, variableValue: 50 } });
    expect(maps[64].events[9].pages[1]).toMatchObject({ trigger: 0, conditions: { variableId: 29, variableValue: 110 } });
    expect(maps[62].events[6].pages[1]).toMatchObject({ trigger: 0, conditions: { variableId: 29, variableValue: 120 } });
    expect(maps[44].events[10].pages[1]).toMatchObject({ trigger: 0, conditions: { variableId: 29, variableValue: 900 } });
  });

  test('IT-011 runs the complete writer twice on a fixture and converges to a semantic no-op', () => {
    const root = copyFixture();
    const mapPath = path.join(root, 'frontend/data/Map062.json');
    const source = fs.readFileSync(mapPath, 'utf8');
    fs.writeFileSync(mapPath, source.replace('"note": "SEMIFINAL:CS-SEM-ARRIVE-STADIUM-001"', '"note": "fixture pre-change signal"'));
    const code = `import {planGameplayChanges,applyGameplayChanges} from ${JSON.stringify('file://' + path.join(root, '.compozy/tasks/010-semifinal-completa/scripts/lib/semifinal-gameplay.mjs'))}; const first=await planGameplayChanges(process.argv[1]); applyGameplayChanges(process.argv[1],first); const second=await planGameplayChanges(process.argv[1]); console.log(JSON.stringify({first:first.length,second:second.length}));`;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', code, root], { cwd: root, encoding: 'utf8' });
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ first: 1, second: 0 });
    expect(fs.readFileSync(mapPath, 'utf8')).toContain('\n      "id": 2,');
  });
});
