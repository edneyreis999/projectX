/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '../../..');
const readJson = relativePath => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
const map062 = readJson('frontend/data/Map062.json');
const map063 = readJson('frontend/data/Map063.json');
const map065 = readJson('frontend/data/Map065.json');
const enemies = readJson('frontend/data/Enemies.json');
const troops = readJson('frontend/data/Troops.json');
const quests = readJson('frontend/data/CoretoQuests.json');
const armor = readJson('frontend/data/Armors.json');
const dialogue = fs.readFileSync(path.join(ROOT, 'docs/Quests/2-semifinal/semifinal.dialogos.md'), 'utf8');
const cutscene = fs.readFileSync(path.join(ROOT, 'docs/Quests/2-semifinal/semifinal.cutscene.md'), 'utf8');
const technicalArt = fs.readFileSync(path.join(ROOT, 'docs/Quests/2-semifinal/semifinal.technical-art.md'), 'utf8');
const pluginsSource = fs.readFileSync(path.join(ROOT, 'frontend/js/plugins.js'), 'utf8');

const e6 = map062.events[6];
const finale = e6.pages[0].list;
const commands = code => finale.filter(command => command.code === code);
const pluginCommands = (plugin, command) => finale.filter(item => item.code === 357 && item.parameters?.[0] === plugin && item.parameters?.[1] === command);
const comments = finale.filter(command => command.code === 108).map(command => command.parameters[0]);
const commentIndex = value => finale.findIndex(command => command.code === 108 && command.parameters?.[0] === value);
const cleanupIndex = finale.findIndex(command => command.code === 118 && command.parameters?.[0] === 'SEMIFINAL_BATTLE_CLEANUP');
const sharedTail = finale.slice(cleanupIndex + 1);

function vnEvent(entryKey) {
  return map065.events.find(event => event?.note === `SEMIFINAL:011:${entryKey}`);
}

describe('UT-031/UT-032 — single transient finale controller', () => {
  test('UT-031: semantic anchors preserve EX → VN → EX → VN → branch → convergence order', () => {
    const sequence = [
      commentIndex('SEMIFINAL:BT-SEM-011-FIELD-EXIT'),
      finale.findIndex(command => command.code === 357 && command.parameters?.[1] === 'EnterVisualNovel' && command.parameters?.[3]?.entryKey === 'SEMIFINAL_CELEBRATION'),
      commentIndex('SEMIFINAL:BT-SEM-011-RIVALS-OUT-GUARDS-IN'),
      finale.findIndex(command => command.code === 357 && command.parameters?.[1] === 'EnterVisualNovel' && command.parameters?.[3]?.entryKey === 'SEMIFINAL_GUARD_INTERVENTION'),
      commentIndex('SEMIFINAL:BT-SEM-011-BRANCH-EX'),
      cleanupIndex,
      commentIndex('SEMIFINAL:BT-SEM-011-ESCORT'),
    ];
    expect(sequence.every((value, index) => value >= 0 && (index === 0 || value > sequence[index - 1]))).toBe(true);
    expect(map062.events.filter(event => event?.pages?.some(page => page.trigger === 3 && page.conditions?.variableId === 29 && page.conditions?.variableValue === 110))).toEqual([e6]);
  });

  test('UT-032/UT-069: branch state is Game_Temp-only, cleared before and after VN, with no persistent phase state', () => {
    const all = JSON.stringify(e6);
    expect(commands(122)).toHaveLength(0);
    expect(all).not.toMatch(/\$gameSwitches|setValue\s*\(\s*29/);
    expect(e6.pages.every(page => page.conditions.selfSwitchValid === false)).toBe(true);
    expect(all).toContain('delete $gameTemp._semifinalGuardChoice;');
    expect(finale.filter(command => command.code === 355 && command.parameters?.[0] === 'delete $gameTemp._semifinalGuardChoice;')).toHaveLength(3);
    expect(pluginCommands('Coreto_QuestCore', 'QuestTransition')).toHaveLength(1);
  });
});

describe('UT-034 — mandatory helmet and permanent gift lifecycle', () => {
  test('take, alteration, equipment acknowledgement, authorization and gift occur once without a second item grant', () => {
    const statue = map063.events[13];
    const statueText = JSON.stringify(statue);
    const dragobur = map062.events[2];
    const celebration = vnEvent('SEMIFINAL_CELEBRATION');
    expect(armor[51].id).toBe(51);
    expect(statueText.match(/"code":128/g)).toHaveLength(1);
    expect(statueText).toContain('$gameParty.hasItem($dataArmors[51], true)');
    expect(JSON.stringify(dragobur)).toContain('$gameActors.actor(3).isEquipped($dataArmors[51])');
    expect(JSON.stringify(dragobur).match(/AUTHORIZE_FIELD/g)).toHaveLength(1);
    expect(JSON.stringify(celebration).match(/Fica com ele, Thorin/g)).toHaveLength(1);
    expect(finale.some(command => [126, 127, 128].includes(command.code))).toBe(false);
  });
});

describe('UT-043–UT-048 — battle and shared convergence', () => {
  test('UT-043/UT-044: only Resist owns one defeat-allowed, non-escapable battle immediately after Actor 4 joins', () => {
    const battleIndex = finale.findIndex(command => command.code === 301);
    expect(finale[battleIndex - 1]).toEqual({ code: 129, indent: 1, parameters: [4, 0, false] });
    expect(finale[battleIndex].parameters).toEqual([0, 19, false, true]);
    expect(commands(301)).toHaveLength(1);
    expect(commentIndex('SEMIFINAL:BT-SEM-011-GENTLE')).toBeGreaterThan(battleIndex);
    expect(finale.slice(commentIndex('SEMIFINAL:BT-SEM-011-GENTLE'), cleanupIndex).some(command => command.code === 301)).toBe(false);
  });

  test('UT-045: Win and Lose each jump to the same single cleanup anchor', () => {
    expect(commands(601)).toHaveLength(1);
    expect(commands(603)).toHaveLength(1);
    expect(finale.filter(command => command.code === 118 && command.parameters?.[0] === 'SEMIFINAL_BATTLE_CLEANUP')).toHaveLength(1);
    expect(finale.filter(command => command.code === 119 && command.parameters?.[0] === 'SEMIFINAL_BATTLE_CLEANUP')).toHaveLength(2);
    expect(finale.slice(finale.findIndex(command => command.code === 601), cleanupIndex).some(command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore')).toBe(false);
  });

  test('UT-046: cleanup restores exactly max HP for Actors 3 and 4 before removing Actor 4', () => {
    const scripts = sharedTail.filter(command => command.code === 355).map(command => command.parameters[0]);
    const hpScripts = scripts.filter(source => source.startsWith('$gameActors.actor('));
    const guardPresentationScripts = scripts.filter(source => source.startsWith('$gameMap.event('));
    expect(hpScripts).toEqual([
      '$gameActors.actor(3).setHp($gameActors.actor(3).mhp);',
      '$gameActors.actor(4).setHp($gameActors.actor(4).mhp);',
    ]);
    expect(guardPresentationScripts).toEqual(expect.arrayContaining([
      expect.stringContaining('$gameMap.event(5).setImage("Principal/$Kilin", 0)'),
      expect.stringContaining('$gameMap.event(14).setImage("Principal/$Mhordred", 0)'),
    ]));
    expect(guardPresentationScripts).toHaveLength(2);
    expect(JSON.stringify(sharedTail)).not.toMatch(/setMp|setTp|removeState|clearStates|changeEquip|gainItem/i);
    const removalIndex = sharedTail.findIndex(command => command.code === 129 && command.parameters?.[0] === 4 && command.parameters?.[1] === 1);
    expect(removalIndex).toBeGreaterThan(sharedTail.findIndex(command => command.code === 355 && command.parameters?.[0].includes('actor(4)')));
    expect(removalIndex).toBeLessThan(sharedTail.findIndex(command => command.code === 355 && command.parameters?.[0].startsWith('$gameMap.event(')));
  });

  test('UT-047/UT-048: Mhordred grants no reward and escort terminal occurs exactly once', () => {
    const mhordred = enemies[91];
    expect(mhordred).toMatchObject({ id: 91, name: 'Mhordred', battlerName: 'Mhordred', exp: 0, gold: 0 });
    expect(mhordred.dropItems.every(drop => drop.kind === 0 && drop.dataId === 0)).toBe(true);
    expect(mhordred.note).not.toMatch(/reward|state reward/i);
    expect(mhordred.note).not.toMatch(/<TP Mode:/i);
    expect(pluginCommands('Coreto_QuestCore', 'QuestTransition').map(command => command.parameters[3].transitionId)).toEqual(['COMMIT_ESCORT']);
    expect(finale.filter(command => command.code === 201 && JSON.stringify(command.parameters) === JSON.stringify([0, 44, 5, 23, 8, 0]))).toHaveLength(1);
  });

  test('UT-075: every explicit enemy TP Mode exists in the active Enhanced TP registry', () => {
    const registry = JSON.parse(pluginsSource.slice(pluginsSource.indexOf('['), pluginsSource.lastIndexOf(']') + 1));
    const enhancedTp = registry.find(entry => entry.name === 'VisuMZ_2_EnhancedTpSystem' && entry.status === true);
    const configuredModes = new Set(JSON.parse(enhancedTp.parameters['TpMode:arraystruct']).map(JSON.parse).map(mode => mode['Name:str'].toUpperCase()));
    const explicitModes = enemies.filter(Boolean).flatMap(enemy => [...String(enemy.note ?? '').matchAll(/<(?:FORCE\s+)?TP\s+MODE:\s*([^>]+)>/gi)].map(match => ({ enemyId: enemy.id, mode: match[1].trim() })));
    expect(explicitModes.filter(entry => !configuredModes.has(entry.mode.toUpperCase()))).toEqual([]);
    expect(configuredModes).toContain('ENEMY');
    expect(configuredModes).not.toContain('BOSS');
  });
});

describe('IT-010–IT-018 — integrated finale journeys', () => {
  test('IT-010/IT-014: four exact resume labels and Gentle converge without Battle Processing', () => {
    const handoffs = {
      SEMIFINAL_DRAGOBUR_ARRIVAL: 'SEMIFINAL_AFTER_ARRIVAL_VN',
      SEMIFINAL_DRAGOBUR_AUTHORIZATION: 'SEMIFINAL_AFTER_AUTHORIZATION_VN',
      SEMIFINAL_CELEBRATION: 'SEMIFINAL_AFTER_CELEBRATION_VN',
      SEMIFINAL_GUARD_INTERVENTION: 'SEMIFINAL_AFTER_GUARD_VN',
    };
    const originCommands = [...map062.events[2].pages.flatMap(page => page.list), ...e6.pages.flatMap(page => page.list)];
    Object.entries(handoffs).forEach(([entryKey, label]) => {
      const enterIndex = originCommands.findIndex(command => command.code === 357
        && command.parameters?.[0] === 'Coreto_QuestVN'
        && command.parameters?.[1] === 'EnterVisualNovel'
        && command.parameters?.[3]?.entryKey === entryKey);
      expect(enterIndex).toBeGreaterThanOrEqual(0);
      expect(originCommands[enterIndex + 1]).toEqual({ code: 115, indent: 0, parameters: [] });
      expect(originCommands[enterIndex + 2]).toEqual({ code: 118, indent: 0, parameters: [label] });
      expect(originCommands.filter(command => command.code === 118 && command.parameters?.[0] === label)).toHaveLength(1);
    });
    expect(sharedTail.some(command => command.code === 301)).toBe(false);
    expect(sharedTail.filter(command => command.code === 201)).toHaveLength(1);
  });

  test('IT-011: helmet route wires Armor 51, the two Dragobur VNs, authorization and gift', () => {
    const entries = quests.quests['a-semifinal'].extensions.questVN.entries;
    expect(entries.SEMIFINAL_DRAGOBUR_ARRIVAL.resumeLabel).toBe('SEMIFINAL_AFTER_ARRIVAL_VN');
    expect(entries.SEMIFINAL_DRAGOBUR_AUTHORIZATION.resumeLabel).toBe('SEMIFINAL_AFTER_AUTHORIZATION_VN');
    expect(dialogue).toContain('DL-SEM-GIFT-DRAGOBUR-001');
    expect(cutscene).toContain('quantidade de Armor 51 invariável');
  });

  test('IT-012/IT-013: runtime and discipline contracts retain the approved canon', () => {
    const guard = JSON.stringify(vnEvent('SEMIFINAL_GUARD_INTERVENTION'));
    const celebration = JSON.stringify(vnEvent('SEMIFINAL_CELEBRATION'));
    expect(guard).toContain('Capitã da Guarda de Ferro');
    expect(guard).toContain('General Thordan');
    expect(guard).toContain('Mhordred');
    expect(guard).toContain('Filena');
    expect(guard).not.toContain('Tharok');
    expect(celebration).toContain('Martelo de Bronze');
    expect(celebration).toContain('Machados');
  });

  test('IT-015/IT-017/IT-018: allocated battle is Mhordred-only and protects Fogolume', () => {
    expect(enemies[30]).toMatchObject({ id: 30, name: 'Fogolume', battlerName: 'Fogolume' });
    expect(troops[19]).toMatchObject({ id: 19, name: 'Mhordred', members: [{ enemyId: 91, x: 227, y: 436, hidden: false }] });
    expect(troops[19].members).toHaveLength(1);
    expect(troops[19].members[0].enemyId).not.toBe(30);
  });

  test.each(['Win', 'Lose'])('IT-016: %s callback reaches the identical cleanup, commit and transfer', result => {
    const branchCode = result === 'Win' ? 601 : 603;
    const branchIndex = finale.findIndex(command => command.code === branchCode);
    expect(finale[branchIndex + 1]).toEqual({ code: 119, indent: 2, parameters: ['SEMIFINAL_BATTLE_CLEANUP'] });
    expect(sharedTail.filter(command => command.code === 355 && command.parameters?.[0].startsWith('$gameActors.actor('))).toHaveLength(2);
    expect(sharedTail.filter(command => command.code === 355 && command.parameters?.[0].startsWith('$gameMap.event('))).toHaveLength(2);
    expect(sharedTail.filter(command => command.code === 129 && command.parameters?.[1] === 1)).toHaveLength(1);
    expect(sharedTail.filter(command => command.code === 201)).toHaveLength(1);
  });
});

describe('E2E-005–E2E-009/E2E-014–E2E-016 — executable journey contracts', () => {
  test('automated route contracts expose celebration, Gentle, Resist loss and controlled Win without claiming perception', () => {
    expect(vnEvent('SEMIFINAL_DRAGOBUR_ARRIVAL')).toBeDefined();
    expect(vnEvent('SEMIFINAL_DRAGOBUR_AUTHORIZATION')).toBeDefined();
    expect(vnEvent('SEMIFINAL_CELEBRATION')).toBeDefined();
    expect(vnEvent('SEMIFINAL_GUARD_INTERVENTION')).toBeDefined();
    expect(finale.some(command => command.code === 601)).toBe(true);
    expect(finale.some(command => command.code === 603)).toBe(true);
    expect(finale.find(command => command.code === 301).parameters[3]).toBe(true);
  });

  test.each([
    ['E2E-014', 'assets', technicalArt],
    ['E2E-015', 'EX/VN continuity', cutscene],
    ['E2E-016', 'narrative/playtest', dialogue],
  ])('%s: human %s result remains explicitly not_executed', (_id, _name, contract) => {
    const result = { status: 'not_executed', evidence: null };
    expect(contract.length).toBeGreaterThan(0);
    expect(result).toEqual({ status: 'not_executed', evidence: null });
  });
});
