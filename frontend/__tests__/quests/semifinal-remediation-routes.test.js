/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = 'docs/Quests/2-semifinal/tooling';
const MODULE = path.join(ROOT, `${FEATURE}/lib/semifinal-gameplay.mjs`);
const CASES = {
  canonicalStates: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 900],
  legacyValues: [5, 6, 8],
  barrierEventIds: [12, 21, 7, 28, 23, 14, 15, 16, 17],
  fieldPlayers: {
    3: { x: 16, y: 2, minX: 15, maxX: 17 },
    4: { x: 19, y: 2, minX: 18, maxX: 20 },
    7: { x: 9, y: 2, minX: 7, maxX: 9 },
    8: { x: 11, y: 2, minX: 10, maxX: 12 },
  },
};
const MAP_NAMES = ['Map044', 'Map061', 'Map062', 'Map063', 'Map064'];
const ARMORS = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/Armors.json'), 'utf8').replace(/^\uFEFF/, ''));
const ACTORS = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/data/Actors.json'), 'utf8').replace(/^\uFEFF/, ''));

function configuredPlugins() {
  const source = fs.readFileSync(path.join(ROOT, 'frontend/js/plugins.js'), 'utf8');
  return JSON.parse(source.slice(source.indexOf('['), source.lastIndexOf(']') + 1));
}

let subject;
let projection;
let maps;

function invokeExport(name, args) {
  const script = `import * as subject from ${JSON.stringify(MODULE)}; console.log(JSON.stringify(await subject[${JSON.stringify(name)}](...JSON.parse(process.argv[1]))));`;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script, JSON.stringify(args)], { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}

function localSelect(event, state, resolver = () => false) {
  const eligible = page => {
    const condition = page.conditions ?? {};
    if (condition.variableValid && !(condition.variableId === 29 ? state >= condition.variableValue : resolver('variable', condition.variableId, condition.variableValue))) return false;
    if (condition.switch1Valid && !resolver('switch', condition.switch1Id, true)) return false;
    if (condition.switch2Valid && !resolver('switch', condition.switch2Id, true)) return false;
    if (condition.selfSwitchValid && !resolver('selfSwitch', condition.selfSwitchCh, true)) return false;
    if (condition.itemValid && !resolver('item', condition.itemId, true)) return false;
    if (condition.actorValid && !resolver('actor', condition.actorId, true)) return false;
    return true;
  };
  for (let index = event.pages.length - 1; index >= 0; index -= 1) if (eligible(event.pages[index])) return { index, page: event.pages[index] };
  return { index: -1, page: null };
}

function localRoute(event, interval, criticalTiles = []) {
  const page = localSelect(event, 50).page;
  let x = event.x;
  const visited = [{ x, y: event.y }];
  for (const command of page.moveRoute.list) {
    if (command.code === 2) x -= 1;
    else if (command.code === 3) x += 1;
    else if (command.code !== 0) return { ok: false, code: 'field_route_out_of_bounds', anchor: `E${event.id}`, visited };
    if (command.code !== 0) visited.push({ x, y: event.y });
  }
  const invalid = visited.find(tile => tile.x < interval.minX || tile.x > interval.maxX || criticalTiles.some(other => other.x === tile.x && other.y === tile.y));
  return invalid ? { ok: false, code: 'field_route_out_of_bounds', anchor: `E${event.id}`, visited } : { ok: true, visited };
}

function commands(page, code) {
  return (page?.list ?? []).filter(command => code === undefined || command.code === code);
}

function pluginCommands(page, plugin, commandName) {
  return commands(page, 357).filter(command => command.parameters?.[0] === plugin && (!commandName || command.parameters?.[1] === commandName));
}

function selected(event, state, resolver = () => false) {
  return localSelect(event, state, resolver).page;
}

function visible(page) {
  return Boolean(page?.image?.characterName || page?.image?.tileId);
}

function branch(page, state) {
  const list = page.list;
  const conditional = list.findIndex(command => command.code === 111 && command.parameters?.[1] === 29);
  const otherwise = list.findIndex((command, index) => index > conditional && command.code === 411 && command.indent === 0);
  const end = list.findIndex((command, index) => index > otherwise && command.code === 412 && command.indent === 0);
  return state === 40 ? list.slice(conditional + 1, otherwise) : list.slice(otherwise + 1, end);
}

beforeAll(() => {
  const runner = `
    import fs from 'node:fs'; import path from 'node:path'; import * as subject from ${JSON.stringify(MODULE)};
    const root=process.argv[1], names=${JSON.stringify(MAP_NAMES)};
    const sources=Object.fromEntries(names.map(name=>[name,fs.readFileSync(path.join(root,'frontend/data',name+'.json'))]));
    const projected=subject.projectCanonicalMaps({sources});
    console.log(JSON.stringify({canonical:subject.CANONICAL_STATES,maps:Object.fromEntries(Object.entries(projected.maps).map(([name,map])=>[name,{events:map.events}])),outputsValid:Object.values(projected.outputs).map(value=>{try{JSON.parse(value);return true}catch{return false}})}));`;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', runner, ROOT], { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  const loaded = JSON.parse(result.stdout);
  subject = {
    CANONICAL_STATES: loaded.canonical,
    selectEligiblePage: (event, state, resolver) => localSelect(event, state, resolver),
    validateCanonicalProjection: value => invokeExport('validateCanonicalProjection', [value]),
    scanStateAuthority: value => invokeExport('scanStateAuthority', [value]),
    simulateHorizontalRoute: (event, interval, critical) => localRoute(event, interval, critical),
  };
  projection = { outputsValid: loaded.outputsValid };
  maps = loaded.maps;
});

describe('page selection, gating and movement', () => {
  test('UT-011: selects the last eligible page like RPG Maker MZ', () => {
    const event = { pages: [50, 60, 60, 90].map(value => ({ conditions: { variableValid: true, variableId: 29, variableValue: value } })) };
    expect(invokeExport('selectEligiblePage', [event, 70]).index).toBe(2);
  });

  test('UT-012: exposes exactly the fourteen canonical states', () => {
    expect(subject.CANONICAL_STATES).toEqual(CASES.canonicalStates);
    expect(CASES.canonicalStates).not.toEqual(expect.arrayContaining(CASES.legacyValues));
    for (const map of Object.values(maps))
      for (const event of map.events.filter(Boolean))
        for (const page of event.pages) {
          const condition = page.conditions;
          if (condition.variableValid && condition.variableId === 29) expect(CASES.canonicalStates).toContain(condition.variableValue);
        }
  });

  test.each([5, 6, 8])('UT-013: legacy V29 value %i returns anchor and value', value => {
    const mutated = structuredClone(maps);
    mutated.Map044.events[15].pages[1].conditions.variableValue = value;
    expect(subject.validateCanonicalProjection(mutated, CASES)[0]).toEqual({ code: 'legacy_v29_condition', anchor: 'Map044:E15:page2', value });
  });

  test('UT-014: a canonical V90 page with blocking semantics fails precedence', () => {
    const mutated = structuredClone(maps);
    const page = selected(mutated.Map062.events[19], 90);
    page.priorityType = 1;
    page.through = false;
    expect(subject.validateCanonicalProjection(mutated, CASES)).toContainEqual({ code: 'page_precedence_mismatch', anchor: 'Map062:E19', state: 90 });
  });

  test('UT-015: Map044 E15/E16 are hidden below V120 and visible through V900', () => {
    for (const id of [15, 16]) {
      for (const state of CASES.canonicalStates.filter(value => value < 120)) expect(visible(selected(maps.Map044.events[id], state))).toBe(false);
      expect(visible(selected(maps.Map044.events[id], 120))).toBe(true);
      expect(visible(selected(maps.Map044.events[id], 900))).toBe(true);
    }
  });

  test('UT-016: Map044 downstream cleanup has no image, interaction, or collision', () => {
    for (const id of [15, 16]) {
      const page = selected(maps.Map044.events[id], 900, (kind, target) => kind === 'variable' && target === 32);
      expect(visible(page)).toBe(false);
      expect(page.list).toEqual([{ code: 0, indent: 0, parameters: [] }]);
      expect(page.priorityType).toBe(0);
      expect(page.through).toBe(true);
    }
  });

  test('UT-017: all nine Map061 V40 blockers have one Gab and no transfer', () => {
    for (const id of CASES.barrierEventIds) {
      for (const page of maps.Map061.events[id].pages) {
        const blocked = branch(page, 40);
        expect(blocked.filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow')).toHaveLength(1);
        expect(blocked.some(command => command.code === 201)).toBe(false);
      }
    }
  });

  test('UT-018: outside V40 each blocker retains non-urgent behavior', () => {
    for (const id of CASES.barrierEventIds) {
      for (const page of maps.Map061.events[id].pages) expect(branch(page, 50).some(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow')).toBe(false);
    }
  });

  test('UT-019: no V40 blocker branch can transfer, especially to Map021', () => {
    for (const id of CASES.barrierEventIds) {
      const blocked = maps.Map061.events[id].pages.flatMap(page => branch(page, 40));
      expect(blocked.filter(command => command.code === 201)).toEqual([]);
      expect(JSON.stringify(blocked)).not.toContain('[0,21,');
    }
  });

  test('UT-020: E19 implements the V50–V90 state matrix', () => {
    for (const state of [50, 60, 70, 80]) {
      const page = selected(maps.Map062.events[19], state);
      expect(page.priorityType).toBe(1);
      expect(page.through).toBe(false);
      expect(pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly')).toHaveLength(1);
    }
    expect(selected(maps.Map062.events[19], 90)).toMatchObject({ priorityType: 0, through: true });
  });

  test('UT-021: E19 geometry and Dragobur-linked speaker are exact', () => {
    const event = maps.Map062.events[19];
    expect({ x: event.x, y: event.y }).toEqual({ x: 12, y: 5 });
    for (const state of [50, 60, 70, 80]) {
      const page = selected(event, state);
      expect(page.image.characterName).toBe('');
      const override = JSON.parse(pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly')[0].parameters[3]['Override:struct']);
      expect(override['EventID:num']).toBe('2');
    }
    expect({ x: maps.Map062.events[2].x, y: maps.Map062.events[2].y }).toEqual({ x: 11, y: 5 });
  });

  test('UT-022: the first-arrival cast remains visible through approved present states', () => {
    for (const id of [3, 4, 7, 8, 9, 10, 11]) for (const state of [50, 60, 70, 80, 90, 100, 110]) expect(visible(selected(maps.Map062.events[id], state))).toBe(true);
  });

  test('UT-023: every field route is horizontal, repeating and bounded', () => {
    for (const [idText, interval] of Object.entries(CASES.fieldPlayers)) {
      const event = maps.Map062.events[Number(idText)];
      const route = selected(event, 50).moveRoute;
      expect(route.repeat).toBe(true);
      expect(route.list.map(command => command.code)).toEqual([2, 3, 0]);
      expect(subject.simulateHorizontalRoute(event, interval).ok).toBe(true);
    }
  });

  test('UT-024: a route touching a critical tile fails with its event anchor', () => {
    const event = structuredClone(maps.Map062.events[3]);
    event.y = 5;
    event.x = 13;
    expect(subject.simulateHorizontalRoute(event, { minX: 11, maxX: 13 }, [{ x: 12, y: 5 }])).toMatchObject({ ok: false, code: 'field_route_out_of_bounds', anchor: 'E3' });
  });

  test('UT-025: all repeat Gabs avoid mutations and declare anti-stacking', () => {
    const pages = [
      ...[15, 16].map(id => selected(maps.Map044.events[id], 120)),
      ...CASES.barrierEventIds.flatMap(id => maps.Map061.events[id].pages.map(page => ({ ...page, list: branch(page, 40) }))),
      ...[9, 10, 11].flatMap(id => maps.Map062.events[id].pages),
      ...[50, 60, 70, 80].map(state => selected(maps.Map062.events[19], state)),
    ];
    for (const page of pages) {
      expect(commands(page).some(command => [126, 127, 128, 122].includes(command.code) || command.parameters?.[0] === 'Coreto_QuestCore')).toBe(false);
      for (const command of pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly')) expect(command.parameters[3]['Override:struct']).toContain('BypassAntiRepeat');
    }
  });

  test('UT-025A: Map044 guard interactions follow the EX Gab replacement contract', () => {
    for (const id of [15, 16]) {
      for (const state of [120, 900]) {
        const page = selected(maps.Map044.events[id], state);
        const [command] = pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly');
        const override = JSON.parse(command.parameters[3]['Override:struct']);
        expect(page.trigger).toBe(0);
        expect(command.parameters[3]['ForceGab:eval']).toBe('true');
        expect(override['BypassAntiRepeat:eval']).toBe('true');
        expect(pluginCommands(page, 'VisuMZ_4_GabWindow', 'WaitForGab')).toHaveLength(0);
      }
    }
  });

  test('UT-026: direct V29 and PKD journal writes are state_surface_unclassified', () => {
    const mutated = structuredClone(maps);
    mutated.Map061.events[23].pages[0].list.unshift({ code: 122, indent: 0, parameters: [29, 29, 0, 0, 50] });
    mutated.Map061.events[23].pages[0].list.unshift({ code: 357, indent: 0, parameters: ['PKD_QuestSystem', 'SetObjective', '', {}] });
    expect(subject.scanStateAuthority(mutated).map(failure => failure.code)).toEqual(expect.arrayContaining(['state_surface_unclassified', 'state_surface_unclassified']));
    expect(subject.scanStateAuthority(maps)).toEqual([]);
  });

  test('UT-027: locker gag is available once throughout the playable semifinal window', () => {
    const event = maps.Map063.events[7];
    expect(event.pages[0]).toMatchObject({ trigger: 1, conditions: { variableId: 29, variableValue: 50 } });
    expect(event.pages[1].conditions).toMatchObject({ selfSwitchCh: 'A', selfSwitchValid: true });
    expect(event.pages[2].conditions).toMatchObject({ variableId: 29, variableValue: 120 });
    for (const state of [50, 60, 70, 80, 90, 100, 110]) {
      expect(subject.selectEligiblePage(event, state).index).toBe(0);
      expect(subject.selectEligiblePage(event, state, (kind, target) => kind === 'selfSwitch' && target === 'A').index).toBe(1);
    }
    expect(subject.selectEligiblePage(event, 120, (kind, target) => kind === 'selfSwitch' && target === 'A').index).toBe(2);
    expect(commands(event.pages[0], 123).filter(command => JSON.stringify(command.parameters) === JSON.stringify(['A', 0]))).toHaveLength(1);
  });

  test('UT-028: locker gag follows E2, animates group reactions, and restores camera before Finish', () => {
    const event = maps.Map063.events[7];
    const first = event.pages[0];
    const list = first.list;
    const camera = pluginCommands(first, 'VisuMZ_4_MapCameraZoom');
    const indexOfCamera = name => list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom' && command.parameters?.[1] === name);
    const targetIndex = indexOfCamera('CameraFocusTargetEvent');
    const attackerMoveIndex = list.findIndex(command => command.code === 205 && command.parameters?.[0] === 2 && JSON.stringify(command).includes('Move to: 15,20'));
    const impactIndex = list.findIndex(command => command.code === 212 && JSON.stringify(command.parameters) === JSON.stringify([2, 39, false]));
    const playerIndex = indexOfCamera('CameraFocusPlayer');
    const selfSwitchIndex = list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
    const finishIndex = list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene' && command.parameters?.[1] === 'FinishCutscene');
    expect(camera.find(command => command.parameters[1] === 'CameraFocusTargetEvent').parameters[3]).toMatchObject({ 'EventID:eval': '2', 'Duration:num': '30' });
    expect(camera.filter(command => command.parameters[1] === 'ZoomChange').map(command => command.parameters[3]['TargetScale:num'])).toEqual(['2', '1']);
    expect(camera.filter(command => command.parameters[1] === 'CameraFocusWait')).toHaveLength(2);
    expect(camera.filter(command => command.parameters[1] === 'ZoomWait')).toHaveLength(2);
    expect([targetIndex, attackerMoveIndex, impactIndex, playerIndex, selfSwitchIndex, finishIndex]).toEqual(
      [...new Set([targetIndex, attackerMoveIndex, impactIndex, playerIndex, selfSwitchIndex, finishIndex])].sort((a, b) => a - b),
    );
    const balloons = commands(first, 213).map(command => command.parameters);
    expect(new Set(balloons.map(parameters => parameters[0]))).toEqual(new Set([-1, 2, 3, 4, 5]));
    expect(balloons).toContainEqual([2, 5, false]);
    expect(balloons).toContainEqual([-1, 6, false]);
    expect(commands(first, 212).filter(command => command.parameters[0] === 2 && command.parameters[1] === 39)).toHaveLength(1);
    expect(commands(first, 250).filter(command => command.parameters[0]?.name === 'Damage3')).toHaveLength(1);
    expect(event.pages[1].list.some(command => [205, 212, 213, 250].includes(command.code) || command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom')).toBe(false);
  });

  test('UT-029: statue is visible at V50 with filler copy but cannot grant or advance the helmet quest', () => {
    const event = maps.Map063.events[13];
    const filler = selected(event, 50);
    expect(visible(filler)).toBe(true);
    expect(JSON.stringify(filler)).toContain('SEMIFINAL:DL-SEM-STATUE-PREQUEST-FILLER-011');
    expect(pluginCommands(filler, 'VisuMZ_4_GabWindow', 'GabTextOnly')).toHaveLength(1);
    expect(commands(filler).some(command => command.code === 128 || command.parameters?.[0] === 'Coreto_QuestCore')).toBe(false);
    expect(selected(event, 60)).not.toBe(filler);
  });

  test('UT-030: Map062 district exits are open at V50, locked through V110, and restored at V120', () => {
    for (const id of [15, 16, 17]) {
      expect(commands(selected(maps.Map062.events[id], 50), 201).map(command => command.parameters[1])).toEqual([61]);
      for (const state of [60, 70, 80, 90, 100, 110]) {
        const page = selected(maps.Map062.events[id], state);
        expect(commands(page, 201)).toEqual([]);
        expect(pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly')).toHaveLength(1);
      }
      expect(commands(selected(maps.Map062.events[id], 120), 201).map(command => command.parameters[1])).toEqual([61]);
    }
  });
});

describe('helmet and exact error contracts', () => {
  test('UT-073: Armor 51 changes Thorin to the existing OldHelmet AnimaX profile while equipped', () => {
    const helmet = ARMORS[51];
    const animaX = configuredPlugins().find(entry => entry.name === 'PKD_AnimaX');
    const profiles = JSON.parse(animaX.parameters['xAnimations:structA'])
      .map(JSON.parse)
      .map(profile => profile.id);
    const runtime = fs.readFileSync(path.join(ROOT, 'frontend/js/plugins/PKD_AnimaX.js'), 'utf8');

    expect(helmet).toMatchObject({ id: 51, name: 'Elmo Velho', etypeId: 3 });
    expect(helmet.note.match(/<xAnimaSet:OldHelmet>/g)).toHaveLength(1);
    expect(ACTORS[3].note).toContain('<xAnima:Thorin>');
    expect(animaX.status).toBe(true);
    expect(profiles).toContain('Thorin_OldHelmet');
    expect(runtime).toContain("PKD_ANIMAX.KGameItems.GetMeta('xAnimaSet', e)");
    expect(runtime).toContain("return this.getInitialXProfile() + '_' + equipmentXSet;");
    expect(runtime).toContain('this.requestRefreshAnimaX();');
    expect(fs.existsSync(path.join(ROOT, 'frontend/img/charactersAA/Thorin_OldHelmet/Move.png'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'frontend/img/charactersAA/Thorin_OldHelmet/Idle.png'))).toBe(true);
  });

  test('UT-033: only Armor 51 from Map063 E13 is the mandatory helmet', () => {
    const event = maps.Map063.events[13];
    expect(event.pages.flatMap(page => commands(page, 128)).filter(command => command.parameters[0] === 51)).toHaveLength(1);
    expect(event.pages.flatMap(page => pluginCommands(page, 'Coreto_QuestCore', 'QuestTransition')).filter(command => command.parameters[3].transitionId === 'EQUIP_HELMET')).toHaveLength(1);
    expect(JSON.stringify(event)).not.toContain('Coreto_Quests","addArmor');
  });

  test('UT-035: only equipped Actor 3 with Armor 51 passes the V70 gate', () => {
    const statuePage = selected(maps.Map063.events[13], 70);
    const statueScript = commands(statuePage, 111)[0].parameters[1];
    const dragobur = selected(maps.Map062.events[2], 70);
    const dragoburScript = commands(dragobur, 111)[0].parameters[1];
    expect(statueScript).toBe('$gameActors.actor(3).isEquipped($dataArmors[51])');
    expect(dragoburScript).toBe('$gameActors.actor(3).isEquipped($dataArmors[51])');
    expect(statuePage.trigger).toBe(4);
    expect(selected(maps.Map062.events[20], 70).trigger).toBe(4);
    expect(selected(maps.Map063.events[13], 80, (kind, target) => kind === 'selfSwitch' && target === 'A').trigger).toBe(3);
    expect(selected(maps.Map062.events[20], 80, (kind, target) => kind === 'selfSwitch' && target === 'A').trigger).toBe(3);
    expect(pluginCommands(dragobur, 'Coreto_QuestCore', 'QuestTransition').map(command => command.parameters[3].transitionId)).toContain('EQUIP_HELMET');
    expect(pluginCommands(selected(maps.Map062.events[2], 80), 'Coreto_QuestCore', 'QuestTransition').map(command => command.parameters[3].transitionId)).not.toContain('EQUIP_HELMET');
    const gate = ({ actorId, armorId, equipped }) => actorId === 3 && armorId === 51 && equipped;
    expect([gate({ actorId: 3, armorId: 51, equipped: false }), gate({ actorId: 2, armorId: 51, equipped: true }), gate({ actorId: 3, armorId: 1, equipped: true })]).toEqual([false, false, false]);
    expect(gate({ actorId: 3, armorId: 51, equipped: true })).toBe(true);
  });

  test('UT-074: V70 commits synchronously and V80 owns a refresh-stable helmet presentation', () => {
    const pending = (kind, target) => kind === 'selfSwitch' && target === 'A';
    for (const event of [maps.Map063.events[13], maps.Map062.events[20]]) {
      const detector = selected(event, 70);
      const presentation = selected(event, 80, pending);
      const terminal = selected(event, 80);
      const latchIndex = detector.list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
      const transitionIndex = detector.list.findIndex(command => command.code === 357 && command.parameters?.[3]?.transitionId === 'EQUIP_HELMET');
      const animationIndex = presentation.list.findIndex(command => command.code === 212 && JSON.stringify(command.parameters) === JSON.stringify([-1, 91, false]));
      const finishIndex = presentation.list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene' && command.parameters?.[1] === 'FinishCutscene');
      const clearIndex = presentation.list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 1]));
      const zooms = pluginCommands(presentation, 'VisuMZ_4_MapCameraZoom', 'ZoomChange').map(command => command.parameters[3]['TargetScale:num']);

      expect(detector.trigger).toBe(4);
      expect(transitionIndex).toBeGreaterThanOrEqual(0);
      expect(latchIndex).toBeGreaterThan(transitionIndex);
      expect(pluginCommands(detector, 'Coreto_Cutscene')).toHaveLength(0);
      expect(presentation).not.toBe(detector);
      expect(presentation).not.toBe(terminal);
      expect(presentation).toBe(selected(event, 80, pending));
      expect(presentation).toMatchObject({ trigger: 3, conditions: { variableValue: 80, selfSwitchCh: 'A', selfSwitchValid: true } });
      expect(pluginCommands(presentation, 'Coreto_QuestCore', 'QuestTransition')).toHaveLength(0);
      expect(pluginCommands(presentation, 'Coreto_Cutscene').map(command => command.parameters[1])).toEqual(['BeginCutscene', 'FinishCutscene']);
      expect(animationIndex).toBeGreaterThanOrEqual(0);
      expect(zooms).toEqual(['2', '1']);
      expect(commands(presentation, 250).map(command => command.parameters[0]?.name)).toContain('Equip1');
      expect(JSON.stringify(presentation)).toContain('Serviu!');
      expect(JSON.stringify(presentation)).toContain('Se eu não respirar muito fundo.');
      expect(finishIndex).toBeGreaterThan(animationIndex);
      expect(clearIndex).toBeGreaterThan(finishIndex);
    }
    const playerRoute = commands(selected(maps.Map063.events[13], 80, pending), 205).find(command => command.parameters[0] === -1).parameters[1];
    expect(playerRoute.list.filter(command => command.code === 13)).toHaveLength(2);
    expect(playerRoute).toMatchObject({ skippable: true, wait: true });
  });

  test('UT-063: Map044 E15 page2 value 6 returns the exact error object', () => {
    const mutated = structuredClone(maps);
    mutated.Map044.events[15].pages[1].conditions.variableValue = 6;
    expect(subject.validateCanonicalProjection(mutated, CASES)[0]).toEqual({ code: 'legacy_v29_condition', anchor: 'Map044:E15:page2', value: 6 });
  });

  test('UT-064: an empty Map062 E3 page at V50 returns the exact precedence object', () => {
    const mutated = structuredClone(maps);
    const page = selected(mutated.Map062.events[3], 50);
    page.image.characterName = '';
    page.image.tileId = 0;
    page.list = [{ code: 0, indent: 0, parameters: [] }];
    expect(subject.validateCanonicalProjection(mutated, CASES)).toContainEqual({ code: 'page_precedence_mismatch', anchor: 'Map062:E3', state: 50 });
  });
});

describe('integrated canonical projections', () => {
  test('IT-003: all five maps parse and pass all fourteen canonical states', () => {
    expect(projection.outputsValid).toEqual([true, true, true, true, true]);
    expect(subject.validateCanonicalProjection(maps, CASES)).toEqual([]);
    for (const state of CASES.canonicalStates)
      for (const map of Object.values(maps)) for (const event of map.events.filter(Boolean)) expect(subject.selectEligiblePage(event, state)).toHaveProperty('index');
  });

  test('IT-004: Map061 barrier family blocks only at V40 and stadium routes remain viable', () => {
    for (const id of CASES.barrierEventIds) {
      expect(maps.Map061.events[id].pages.flatMap(page => branch(page, 40)).some(command => command.code === 201)).toBe(false);
      expect(maps.Map061.events[id].pages.flatMap(page => branch(page, 50)).some(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow')).toBe(false);
    }
    for (const id of [3, 5, 20]) expect(maps.Map061.events[id].pages.some(page => commands(page, 201).some(command => command.parameters[1] === 62))).toBe(true);
  });

  test('IT-005: Map062 players move horizontally and static reserves use contextual Gabs', () => {
    for (const [idText, interval] of Object.entries(CASES.fieldPlayers)) expect(subject.simulateHorizontalRoute(maps.Map062.events[Number(idText)], interval).ok).toBe(true);
    for (const id of [9, 10, 11]) {
      expect(selected(maps.Map062.events[id], 50).moveType).toBe(0);
      expect(new Set(maps.Map062.events[id].pages.map(page => pluginCommands(page, 'VisuMZ_4_GabWindow', 'GabTextOnly')[0].parameters[3]['Text:json'])).size).toBe(3);
    }
  });

  test('IT-006: E2 and E19 align and expose the approved Dragobur matrix', () => {
    expect([maps.Map062.events[2].x, maps.Map062.events[2].y, maps.Map062.events[19].x, maps.Map062.events[19].y]).toEqual([11, 5, 12, 5]);
    expect(JSON.stringify(selected(maps.Map062.events[19], 60))).toContain('Vestiário, Thorin. Um capacete velho. E rápido!');
    expect(selected(maps.Map062.events[19], 90)).toMatchObject({ priorityType: 0, through: true });
    expect(JSON.stringify(selected(maps.Map062.events[2], 70))).toContain('EQUIP_HELMET');
  });

  test('IT-007: Map044 preserves one ARRIVE_HOME and Gab-only return cleanup', () => {
    const arriveHome = maps.Map044.events
      .flatMap(event => event?.pages ?? [])
      .flatMap(page => pluginCommands(page, 'Coreto_QuestCore', 'QuestTransition'))
      .filter(command => command.parameters[3].transitionId === 'ARRIVE_HOME');
    expect(arriveHome).toHaveLength(1);
    const arrival = selected(maps.Map044.events[10], 120);
    const transitionIndex = arrival.list.findIndex(command => command.code === 357 && command.parameters?.[3]?.transitionId === 'ARRIVE_HOME');
    const finishIndex = arrival.list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene' && command.parameters?.[1] === 'FinishCutscene');
    expect(commands(arrival, 222)).toHaveLength(1);
    expect(finishIndex).toBeGreaterThan(transitionIndex);
    for (const id of [15, 16]) {
      expect(commands(selected(maps.Map044.events[id], 120), 101)).toHaveLength(0);
      expect(visible(selected(maps.Map044.events[id], 900))).toBe(true);
    }
  });

  test('IT-008: locker projection has present assets, one native grant, and an Armor 51 gate', () => {
    const event = maps.Map063.events[13];
    for (const state of [50, 60, 70, 80]) expect(fs.existsSync(path.join(ROOT, 'frontend/img/characters', `${selected(event, state).image.characterName}.png`))).toBe(true);
    expect(event.pages.flatMap(page => commands(page, 128))).toEqual([{ code: 128, indent: 1, parameters: [51, 0, 0, 1, false] }]);
    expect(JSON.stringify(event)).toContain('$gameActors.actor(3).isEquipped($dataArmors[51])');
  });
});

describe('automated journeys', () => {
  test('E2E-002: Map044 pre-return, return, and cleanup timing is complete', () => {
    for (const id of [15, 16]) {
      expect(visible(selected(maps.Map044.events[id], 110))).toBe(false);
      expect(pluginCommands(selected(maps.Map044.events[id], 120), 'VisuMZ_4_GabWindow', 'GabTextOnly')).toHaveLength(1);
      expect(visible(selected(maps.Map044.events[id], 900))).toBe(true);
      expect(selected(maps.Map044.events[id], 900, (kind, target) => kind === 'variable' && target === 32)).toMatchObject({ priorityType: 0, through: true });
    }
  });

  test('E2E-003: urgent run exercises nine blockers and retains a stadium route', () => {
    expect(CASES.barrierEventIds).toHaveLength(9);
    for (const id of CASES.barrierEventIds)
      expect(maps.Map061.events[id].pages.flatMap(page => branch(page, 40)).filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow')).toHaveLength(
        maps.Map061.events[id].pages.length,
      );
    expect(commands(maps.Map061.events[3].pages[0], 201)[0].parameters[1]).toBe(62);
  });

  test('E2E-004: first stadium arrival has four bounded players, three reserves, reachable Dragobur, and E19 collision', () => {
    expect(Object.keys(CASES.fieldPlayers)).toHaveLength(4);
    for (const [idText, interval] of Object.entries(CASES.fieldPlayers)) expect(subject.simulateHorizontalRoute(maps.Map062.events[Number(idText)], interval).ok).toBe(true);
    for (const id of [9, 10, 11]) expect(pluginCommands(selected(maps.Map062.events[id], 50), 'VisuMZ_4_GabWindow', 'GabTextOnly')).toHaveLength(1);
    expect(maps.Map062.events[2]).toMatchObject({ x: 11, y: 5 });
    expect(selected(maps.Map062.events[19], 50)).toMatchObject({ priorityType: 1, through: false, image: expect.objectContaining({ characterName: '' }) });
  });
});

test('Map062 E6 is materialized as the sole Task 06 finale controller', () => {
  const event = maps.Map062.events[6];
  const list = event.pages[0].list;
  expect(event.note).toBe('SEMIFINAL:011:FINALE_CONTROLLER:E6:RESTORE_GUARDS_ESCORT_FACING_V3');
  expect(event.pages[0]).toMatchObject({ trigger: 3, conditions: { variableId: 29, variableValue: 110 } });
  expect(list.filter(command => command.code === 301)).toHaveLength(1);
  expect(list.filter(command => command.code === 357 && command.parameters?.[3]?.transitionId === 'COMMIT_ESCORT')).toHaveLength(1);
  const guardedRoutes = list.filter(command => command.code === 205 && [3, 4, 5, 7, 8, 14].includes(command.parameters[0]));
  expect(guardedRoutes.every(command => command.parameters[1].skippable)).toBe(true);
  expect(guardedRoutes.some(command => command.parameters[1].wait === false)).toBe(true);
  expect(guardedRoutes.every(command => command.parameters[1].list.some(route => route.code === 37) && command.parameters[1].list.some(route => route.code === 38))).toBe(true);
  expect(list.filter(command => command.code === 203 && [5, 14].includes(command.parameters[0])).map(command => command.parameters)).toEqual([
    [5, 0, 0, 7, 6],
    [14, 0, 0, 8, 6],
  ]);
  const focusTargets = list
    .filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom' && command.parameters?.[1] === 'CameraFocusTargetEvent')
    .map(command => command.parameters[3]['EventID:eval']);
  expect(focusTargets).toEqual(expect.arrayContaining(['7', '5']));
  const escortPlayerMove = list.find(command => command.code === 205 && command.parameters[0] === -1 && JSON.stringify(command).includes('Move to: 8,7'));
  expect(escortPlayerMove).toBeDefined();
  expect(escortPlayerMove.parameters[1].list.filter(command => [16, 17, 18, 19].includes(command.code)).map(command => command.code)).toEqual([17]);
  const restoreIndex = list.findIndex(command => command.code === 108 && command.parameters?.[0] === 'SEMIFINAL:RESTORE_GUARDS_AFTER_VN_AND_PARTY_REFRESH');
  const escortIndex = list.findIndex(command => command.code === 108 && command.parameters?.[0] === 'SEMIFINAL:BT-SEM-011-ESCORT');
  const lastPartyRefreshIndex = list
    .map((command, index) => ({ command, index }))
    .filter(({ command }) => command.code === 129)
    .at(-1).index;
  expect(restoreIndex).toBeGreaterThan(lastPartyRefreshIndex);
  expect(restoreIndex).toBeLessThan(escortIndex);
  const restoreScripts = list
    .slice(restoreIndex, escortIndex)
    .filter(command => command.code === 355)
    .map(command => command.parameters[0]);
  expect(restoreScripts).toHaveLength(2);
  expect(restoreScripts).toEqual(
    expect.arrayContaining([expect.stringContaining('$gameMap.event(5).setImage("Principal/$Kilin", 0)'), expect.stringContaining('$gameMap.event(14).setImage("Principal/$Mhordred", 0)')]),
  );
  expect(list.findIndex(command => command.code === 221)).toBeLessThan(list.findIndex(command => command.code === 357 && command.parameters?.[3]?.transitionId === 'COMMIT_ESCORT'));
  expect(selected(maps.Map062.events[5], 110)).toMatchObject({ image: { characterName: '' }, priorityType: 0, through: true });
  expect(selected(maps.Map062.events[14], 110)).toMatchObject({ image: { characterName: '' }, priorityType: 0, through: true });
});
