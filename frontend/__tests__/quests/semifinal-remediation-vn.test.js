/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = 'docs/Quests/2-semifinal/tooling';
const VN_MODULE = path.join(ROOT, `${FEATURE}/lib/semifinal-vn.mjs`);
const ALLOCATED = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/Quests/2-semifinal/quest-tooling.json'), 'utf8')).allocations;
const REGISTRY = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/CoretoQuests.json'), 'utf8'));
const MAP_INFOS = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/MapInfos.json'), 'utf8'));
const VN_MAP = JSON.parse(fs.readFileSync(path.join(ROOT, `frontend/data/Map${String(ALLOCATED.vnMapId).padStart(3, '0')}.json`), 'utf8'));
const QUEST_VN_SOURCE = fs.readFileSync(path.join(ROOT, 'frontend/js/plugins/Coreto_QuestVN.js'), 'utf8');

const ENTRY_KEYS = ['SEMIFINAL_DRAGOBUR_ARRIVAL', 'SEMIFINAL_DRAGOBUR_AUTHORIZATION', 'SEMIFINAL_CELEBRATION', 'SEMIFINAL_GUARD_INTERVENTION'];

function pluginIndex(list, pluginName, commandName, after = -1) {
  return list.findIndex((command, index) => index > after && command.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName);
}

function validateMutation(mutation) {
  const script = `
    import fs from 'node:fs'; import {validateSemifinalVn} from ${JSON.stringify(VN_MODULE)};
    const root=process.argv[1], mutation=process.argv[2], allocated=JSON.parse(fs.readFileSync(root+'/docs/Quests/2-semifinal/quest-tooling.json')).allocations;
    const registry=JSON.parse(fs.readFileSync(root+'/frontend/data/CoretoQuests.json')), mapInfos=JSON.parse(fs.readFileSync(root+'/frontend/data/MapInfos.json'));
    const map=JSON.parse(fs.readFileSync(root+'/frontend/data/Map'+String(allocated.vnMapId).padStart(3,'0')+'.json'));
    if(mutation==='map-type') map.note='<CoretoMapType:EX>';
    if(mutation==='map-info') mapInfos[allocated.vnMapId]=null;
    if(mutation==='controller') registry.quests['a-semifinal'].extensions.questVN.entries.SEMIFINAL_DRAGOBUR_ARRIVAL.eventId=4;
    if(mutation==='map049') registry.quests['a-semifinal'].extensions.questVN.entries.ABERTURA_FORJAPRATA.mapId=allocated.vnMapId;
    try { validateSemifinalVn({registry,mapInfos,map,vnMapId:allocated.vnMapId}); console.log(JSON.stringify({status:'valid'})); }
    catch(error) { console.log(JSON.stringify({status:'blocked',code:error.code,entry:error.entry})); }
  `;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script, ROOT, mutation], { cwd: ROOT, encoding: 'utf8' });
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

describe('Task 05 — dedicated semifinal QuestVN adapter', () => {
  test('UT-027: exactly four approved entries point to allocated VN_Semifinal', () => {
    const questVn = REGISTRY.quests['a-semifinal'].extensions.questVN;
    const semifinalEntries = Object.fromEntries(Object.entries(questVn.entries).filter(([key]) => key !== 'ABERTURA_FORJAPRATA'));
    expect(Object.keys(semifinalEntries)).toEqual(ENTRY_KEYS);
    expect(Object.values(semifinalEntries).map(entry => entry.mapId)).toEqual(Array(4).fill(ALLOCATED.vnMapId));
    expect(MAP_INFOS[ALLOCATED.vnMapId]).toMatchObject({ id: ALLOCATED.vnMapId, name: 'VN_Semifinal', parentId: 18 });
    expect(questVn).toMatchObject({ mapId: 49, entries: { ABERTURA_FORJAPRATA: { eventId: 1, allowedStates: [10] } } });
    expect(questVn.entries.ABERTURA_FORJAPRATA.mapId).toBeUndefined();
  });

  test.each(['map-type', 'map-info', 'controller', 'map049'])('UT-028: %s drift fails closed as vn_registry_mismatch', mutation => {
    expect(validateMutation(mutation)).toMatchObject({ status: 'blocked', code: 'vn_registry_mismatch' });
  });

  test('UT-029: every Action Button controller follows assert/content/cleanup/finish/exit order', () => {
    const expectedStates = [50, 80, 110, 110];
    ENTRY_KEYS.forEach((entryKey, index) => {
      const entry = REGISTRY.quests['a-semifinal'].extensions.questVN.entries[entryKey];
      const page = VN_MAP.events[entry.eventId].pages[0];
      const session = pluginIndex(page.list, 'Coreto_QuestVN', 'AssertVisualNovelSession');
      const state = pluginIndex(page.list, 'Coreto_QuestCore', 'AssertQuestState');
      const content = page.list.findIndex(command => command.code === 101);
      const cleanup = pluginIndex(page.list, 'VisuMZ_4_GabWindow', 'ClearGab', content);
      const finish = pluginIndex(page.list, 'Coreto_QuestVN', 'FinishVisualNovel');
      const exit = page.list.findIndex(command => command.code === 115);
      expect(page.trigger).toBe(0);
      expect([session, state, content, cleanup, finish, exit].every(value => value >= 0)).toBe(true);
      expect([session, state, content, cleanup, finish, exit]).toEqual([...[session, state, content, cleanup, finish, exit]].sort((a, b) => a - b));
      expect(page.list[session].parameters[3]).toEqual({ questKey: 'a-semifinal', entryKey });
      expect(page.list[state].parameters[3]).toEqual({ questKey: 'a-semifinal', expectedState: String(expectedStates[index]) });
      expect(page.list.some(command => command.code === 122 && command.parameters?.[0] <= 29 && command.parameters?.[1] >= 29)).toBe(false);
    });
  });

  test('UT-030: cleanup and lifecycle close all declared presentation boundaries', () => {
    ENTRY_KEYS.forEach(entryKey => {
      const entry = REGISTRY.quests['a-semifinal'].extensions.questVN.entries[entryKey];
      const list = VN_MAP.events[entry.eventId].pages[0].list;
      const content = list.findIndex(command => command.code === 101);
      const cleanup = pluginIndex(list, 'VisuMZ_4_GabWindow', 'ClearGab', content);
      expect(cleanup).toBeGreaterThan(content);
      expect(pluginIndex(list, 'VisuMZ_2_VNPictureBusts', 'Basic_ExitBusts', cleanup)).toBeGreaterThan(cleanup);
      expect(list.filter(command => command.code === 235).map(command => command.parameters[0])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    const guardList = VN_MAP.events[4].pages[0].list;
    expect(pluginIndex(guardList, 'PKD_VisualChoices_MZ', 'OpenVisualChoice')).toBeGreaterThan(0);
    expect(guardList.some(command => command.code === 404)).toBe(true);
    expect(VN_MAP.parallaxName).toBe('VN_Semifinal_BG');
    expect(REGISTRY.quests['a-semifinal'].extensions.questVN.spawn.audioPolicy).toBe('restore-origin');
    expect(QUEST_VN_SOURCE).toContain('restoreOrigin(currentSession.origin, currentSession.audioPolicy);');
    expect(QUEST_VN_SOURCE).toContain('FlowCoordinator.release(currentSession.token);');
  });

  test('UT-068: wrong arrival registry returns the exact error object', () => {
    expect(validateMutation('controller')).toEqual({ status: 'blocked', code: 'vn_registry_mismatch', entry: 'SEMIFINAL_DRAGOBUR_ARRIVAL' });
  });

  test('IT-009: registry, metadata, map controllers and transient exact-label resume are wired', () => {
    expect(VN_MAP.note).toBe('<CoretoMapType:VN>');
    expect(VN_MAP.events.filter(Boolean)).toHaveLength(4);
    expect(QUEST_VN_SOURCE).toContain('entry.mapId === undefined ? extension.mapId : entry.mapId');
    expect(QUEST_VN_SOURCE).toContain('resumeLabel: entry.resumeLabel || null');
    expect(QUEST_VN_SOURCE).toContain('command.code === 118 && command.parameters && command.parameters[0] === currentSession.resumeLabel');
    expect(QUEST_VN_SOURCE).toContain('if (labels.length !== 1)');
    expect(QUEST_VN_SOURCE).toContain('fail("VN_RESUME_EVENT_MISSING"');
    expect(QUEST_VN_SOURCE).toContain('fail("VN_RESUME_LABEL_MISSING"');
    expect(QUEST_VN_SOURCE).toContain('$gameMap._interpreter._index = resume.index;');
    expect(REGISTRY.quests['a-semifinal'].extensions.questVN.entries).toMatchObject({
      SEMIFINAL_DRAGOBUR_ARRIVAL: { resumeLabel: 'SEMIFINAL_AFTER_ARRIVAL_VN' },
      SEMIFINAL_DRAGOBUR_AUTHORIZATION: { resumeLabel: 'SEMIFINAL_AFTER_AUTHORIZATION_VN' },
      SEMIFINAL_CELEBRATION: { resumeLabel: 'SEMIFINAL_AFTER_CELEBRATION_VN' },
      SEMIFINAL_GUARD_INTERVENTION: { resumeLabel: 'SEMIFINAL_AFTER_GUARD_VN' },
    });
  });
});
