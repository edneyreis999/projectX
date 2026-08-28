import fs from 'node:fs';
import path from 'node:path';
import { applyEdits, modify, parse, parseTree } from 'jsonc-parser';
import { validateAssetManifest } from './semifinal-assets.mjs';
import { validateMaterializedDialogue, validateNarrativeContracts } from './semifinal-narrative-contracts.mjs';
import { buildQuestVnEntries, buildSemifinalVnMap, patchQuestVnPlugin, validateSemifinalVn } from './semifinal-vn.mjs';
import { assertAllowedTargets, sha256, validatePlannedEdits, writerFailure } from './writer-runtime.mjs';

export const FEATURE = 'semifinal';
export const WRITER = 'gameplay-engineer';
export const COMMAND = 'apply-semifinal-gameplay';

const TOOLING_ROOT = 'docs/Quests/2-semifinal/tooling';
const ASSET_MANIFEST_PATH = `${TOOLING_ROOT}/fixtures/assets/asset-manifest.json`;
const QUEST_TOOLING_PATH = 'docs/Quests/2-semifinal/quest-tooling.json';

const DISCIPLINE_CONTRACTS = Object.freeze({
  'docs/Quests/2-semifinal/semifinal.dialogos.md': { owner: 'Narrative Designer', version: '2.0.0' },
  'docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md': { owner: 'Narrative Designer', version: '2.0.0' },
  'docs/Quests/2-semifinal/semifinal.cutscene.md': { owner: 'Scene Presentation Designer', version: '2.0.0' },
  'docs/Quests/2-semifinal/semifinal.audio.md': { owner: 'Audio Designer', version: '2.0.0' },
  'docs/Quests/2-semifinal/semifinal.technical-art.md': { owner: 'Technical Artist', version: '2.0.0' },
});

export const DISCIPLINE_CONTRACT_PATHS = Object.freeze(Object.keys(DISCIPLINE_CONTRACTS));

export function parseGameplayArguments(args) {
  if (args.length === 0) return { checkOnly: false };
  if (args.length === 1 && args[0] === '--check') return { checkOnly: true };
  throw writerFailure('invalid_arguments', { command: COMMAND, accepted: ['--check'] });
}

function readRequired(rootDir, relativePath, code = 'precondition_mismatch') {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) throw writerFailure(code, { path: relativePath });
  return fs.readFileSync(absolutePath);
}

function parseJsonc(source, relativePath) {
  const text = (Buffer.isBuffer(source) ? source.toString('utf8') : source).replace(/^\uFEFF/, '');
  const errors = [];
  const tree = parseTree(text, errors, { allowTrailingComma: false, disallowComments: false });
  if (!tree || errors.length > 0) throw writerFailure('precondition_mismatch', { anchor: `${relativePath}: valid JSONC` });
  return parse(text);
}

function frontmatterValue(source, key) {
  return source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? null;
}

function requireContractText(source, pattern, path, anchor) {
  if (!pattern.test(source)) throw writerFailure('discipline_contract_stale', { path, anchor });
}

export function validateDisciplineContracts({ rootDir }) {
  const contracts = {};
  const fingerprints = {};
  for (const [relativePath, expected] of Object.entries(DISCIPLINE_CONTRACTS)) {
    const bytes = readRequired(rootDir, relativePath, 'discipline_contract_missing');
    const source = bytes.toString('utf8');
    if (
      frontmatterValue(source, 'status') !== 'approved' ||
      frontmatterValue(source, 'owner') !== expected.owner ||
      frontmatterValue(source, 'contract_version') !== expected.version ||
      frontmatterValue(source, 'authority_model') !== 'contract-first'
    ) {
      throw writerFailure('discipline_contract_stale', { path: relativePath });
    }
    contracts[relativePath] = source;
    fingerprints[relativePath] = { exists: true, sha256: sha256(bytes), code: 'discipline_contract_stale' };
  }

  validateNarrativeContracts({
    dialogue: contracts['docs/Quests/2-semifinal/semifinal.dialogos.md'],
    flow: contracts['docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md'],
    audio: contracts['docs/Quests/2-semifinal/semifinal.audio.md'],
    cutscene: contracts['docs/Quests/2-semifinal/semifinal.cutscene.md'],
  });

  const cutscenePath = 'docs/Quests/2-semifinal/semifinal.cutscene.md';
  const cutscene = contracts[cutscenePath];
  for (const [pattern, anchor] of [
    [/CS-SEM-STADIUM-FINALE-011/, 'finale-controller'],
    [/SEMIFINAL_AFTER_GUARD_VN/, 'guard-resume'],
    [/\(7,7\)\/\(8,7\)\/\(9,7\)/, 'escort-terminal-position'],
  ])
    requireContractText(cutscene, pattern, cutscenePath, anchor);

  const audioPath = 'docs/Quests/2-semifinal/semifinal.audio.md';
  const audio = contracts[audioPath];
  for (const [pattern, anchor] of [
    [/audioPolicy restore-origin/, 'questvn-audio-policy'],
    [/People1[\s\S]*volume 35/, 'stadium-crowd'],
    [/Equip1[\s\S]*Wind5/, 'helmet-audio'],
  ])
    requireContractText(audio, pattern, audioPath, anchor);

  const technicalArtPath = 'docs/Quests/2-semifinal/semifinal.technical-art.md';
  const technicalArt = contracts[technicalArtPath];
  for (const [pattern, anchor] of [
    [/asset-manifest\.json/, 'asset-manifest'],
    [/Armor 51[\s\S]*iconIndex[\s\S]*132/, 'old-helmet'],
    [/Enemy 91[\s\S]*Troop 19/, 'mhordred-battle-assets'],
  ])
    requireContractText(technicalArt, pattern, technicalArtPath, anchor);

  return {
    contracts: Object.fromEntries(
      Object.entries(DISCIPLINE_CONTRACTS).map(([relativePath, expected]) => [
        relativePath,
        {
          owner: expected.owner,
          contractVersion: expected.version,
          sha256: fingerprints[relativePath].sha256,
        },
      ]),
    ),
    fingerprints,
    sourceText: contracts,
  };
}

function eventHash(event) {
  return sha256(JSON.stringify(event));
}

function emptyList() {
  return [{ code: 0, indent: 0, parameters: [] }];
}

function condition(value, original = {}) {
  return {
    actorId: original.actorId ?? 1,
    actorValid: false,
    itemId: original.itemId ?? 1,
    itemValid: false,
    selfSwitchCh: original.selfSwitchCh ?? 'A',
    selfSwitchValid: false,
    switch1Id: original.switch1Id ?? 1,
    switch1Valid: false,
    switch2Id: original.switch2Id ?? 1,
    switch2Valid: false,
    variableId: 29,
    variableValid: true,
    variableValue: value,
  };
}

function gab(text, eventId, { force = false, bypass = false, indent = 0 } = {}) {
  return {
    code: 357,
    indent,
    parameters: [
      'VisuMZ_4_GabWindow',
      'GabTextOnly',
      'Gab: Text Only',
      {
        'Text:json': JSON.stringify(text),
        'ForceGab:eval': String(force),
        'Override:struct': JSON.stringify({
          'EventID:num': String(eventId),
          'BypassAntiRepeat:eval': String(bypass),
          'WaitTime:num': '72',
          'TimePerCharacter:num': '2',
        }),
      },
    ],
  };
}

function blankPage(template, value) {
  return {
    ...structuredClone(template),
    conditions: condition(value, template.conditions),
    image: { tileId: 0, characterName: '', direction: 2, pattern: 0, characterIndex: 0 },
    list: emptyList(),
    moveType: 0,
    moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
    priorityType: 0,
    through: true,
    trigger: 0,
  };
}

function pageAt(template, value, overrides = {}) {
  return { ...structuredClone(template), conditions: condition(value, template.conditions), ...overrides };
}

function comment(text, indent = 0) {
  return { code: 108, indent, parameters: [text] };
}

function transition(id, indent = 0) {
  return { code: 357, indent, parameters: ['Coreto_QuestCore', 'QuestTransition', 'QuestTransition', { questKey: 'a-semifinal', transitionId: id }] };
}

function plugin(pluginName, commandName, displayName = commandName, args = {}, indent = 0) {
  return { code: 357, indent, parameters: [pluginName, commandName, displayName, args] };
}

function annotation(text, indent = 0) {
  return { code: 657, indent, parameters: [text] };
}

function cameraFocusTargetEvent(eventId, duration = 30) {
  return [
    plugin('VisuMZ_4_MapCameraZoom', 'CameraFocusTargetEvent', 'Camera: Focus Target Event', {
      'EventID:eval': String(eventId),
      'Duration:num': String(duration),
      'EasingType:str': 'InOutSine',
    }),
    annotation(`Event ID = ${eventId}`),
    annotation(`Duration = ${duration}`),
    annotation('Easing Type = InOutSine'),
  ];
}

function cameraFocusPlayer(duration = 30) {
  return [
    plugin('VisuMZ_4_MapCameraZoom', 'CameraFocusPlayer', 'Camera: Focus Player', {
      'Duration:num': String(duration),
      'EasingType:str': 'InOutSine',
    }),
    annotation(`Duration = ${duration}`),
    annotation('Easing Type = InOutSine'),
  ];
}

function cameraZoom(scale, duration = 30) {
  return [
    plugin('VisuMZ_4_MapCameraZoom', 'ZoomChange', 'Zoom: Change Zoom', {
      'TargetScale:num': String(scale),
      'Duration:num': String(duration),
      'EasingType:str': 'InOutSine',
    }),
    annotation(`Target Zoom Scale = ${scale}`),
    annotation(`Duration = ${duration}`),
    annotation('Easing Type = InOutSine'),
  ];
}

function cameraWaits() {
  return [plugin('VisuMZ_4_MapCameraZoom', 'CameraFocusWait', 'Camera: Wait for Focus'), plugin('VisuMZ_4_MapCameraZoom', 'ZoomWait', 'Zoom: Wait for Zoom')];
}

function balloon(eventId, balloonId) {
  return { code: 213, indent: 0, parameters: [eventId, balloonId, false] };
}

function script(source, indent = 0) {
  return { code: 355, indent, parameters: [source] };
}

function indented(commands, amount = 1) {
  return commands.map(command => ({ ...structuredClone(command), indent: (command.indent ?? 0) + amount }));
}

function enterSemifinalVn(entryKey, indent = 0) {
  return plugin('Coreto_QuestVN', 'EnterVisualNovel', 'EnterVisualNovel', { questKey: 'a-semifinal', entryKey }, indent);
}

function semifinalVnHandoff(entryKey, resumeLabel) {
  return [enterSemifinalVn(entryKey), { code: 115, indent: 0, parameters: [] }, { code: 118, indent: 0, parameters: [resumeLabel] }];
}

function beginCutscene(indent = 0) {
  return plugin('Coreto_Cutscene', 'BeginCutscene', 'BeginCutscene', {}, indent);
}

function finishCutscene(indent = 0) {
  return plugin('Coreto_Cutscene', 'FinishCutscene', 'FinishCutscene', {}, indent);
}

export const CANONICAL_STATES = Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 900]);

export function isPageEligible(page, variableValue, conditionResolver = () => true) {
  const conditions = page?.conditions ?? {};
  if (conditions.variableValid && !(conditions.variableId === 29 ? variableValue >= conditions.variableValue : conditionResolver('variable', conditions.variableId, conditions.variableValue)))
    return false;
  if (conditions.switch1Valid && !conditionResolver('switch', conditions.switch1Id, true)) return false;
  if (conditions.switch2Valid && !conditionResolver('switch', conditions.switch2Id, true)) return false;
  if (conditions.selfSwitchValid && !conditionResolver('selfSwitch', conditions.selfSwitchCh, true)) return false;
  if (conditions.itemValid && !conditionResolver('item', conditions.itemId, true)) return false;
  if (conditions.actorValid && !conditionResolver('actor', conditions.actorId, true)) return false;
  return true;
}

export function selectEligiblePage(event, variableValue, conditionResolver = () => true) {
  for (let index = (event?.pages?.length ?? 0) - 1; index >= 0; index -= 1) {
    if (isPageEligible(event.pages[index], variableValue, conditionResolver)) return { index, page: event.pages[index] };
  }
  return { index: -1, page: null };
}

function isEmptyPage(page) {
  return !page || (!page.image?.characterName && !page.image?.tileId && (page.list ?? []).every(command => command.code === 0));
}

export function validateCanonicalProjection(maps) {
  const failures = [];
  for (const [mapName, map] of Object.entries(maps)) {
    for (const event of map.events?.filter(Boolean) ?? []) {
      event.pages?.forEach((page, pageIndex) => {
        const conditions = page.conditions;
        if (conditions?.variableValid && conditions.variableId === 29 && !CANONICAL_STATES.includes(conditions.variableValue)) {
          failures.push({ code: 'legacy_v29_condition', anchor: `${mapName}:E${event.id}:page${pageIndex + 1}`, value: conditions.variableValue });
        }
      });
    }
  }
  for (const id of [3, 4, 7, 8, 9, 10, 11]) {
    const selected = selectEligiblePage(maps.Map062.events[id], 50, () => false);
    if (isEmptyPage(selected.page)) failures.push({ code: 'page_precedence_mismatch', anchor: `Map062:E${id}`, state: 50 });
  }
  const e19At90 = selectEligiblePage(maps.Map062.events[19], 90, () => false);
  if (!e19At90.page?.through || e19At90.page?.priorityType !== 0) {
    failures.push({ code: 'page_precedence_mismatch', anchor: 'Map062:E19', state: 90 });
  }
  return failures;
}

export function scanStateAuthority(maps) {
  const failures = [];
  const visit = (value, anchor) => {
    if (Array.isArray(value)) return value.forEach((child, index) => visit(child, `${anchor}[${index}]`));
    if (!value || typeof value !== 'object') return;
    if (value.code === 122 && value.parameters?.[0] <= 29 && value.parameters?.[1] >= 29) failures.push({ code: 'state_surface_unclassified', anchor });
    if ([355, 655].includes(value.code) && /\$gameVariables\.setValue\s*\(\s*29\b/.test(String(value.parameters?.[0] ?? ''))) failures.push({ code: 'state_surface_unclassified', anchor });
    if (value.code === 357 && /PKD/i.test(String(value.parameters?.[0] ?? '')) && /objective|journal/i.test(JSON.stringify(value.parameters)))
      failures.push({ code: 'state_surface_unclassified', anchor });
    for (const [key, child] of Object.entries(value)) visit(child, `${anchor}.${key}`);
  };
  for (const [mapName, map] of Object.entries(maps)) visit(map.events, `${mapName}.events`);
  return failures;
}

function materializedDialogue(maps) {
  const texts = [];
  for (const map of Object.values(maps)) {
    for (const event of map.events?.filter(event => event?.note?.includes('SEMIFINAL')) ?? []) {
      for (const page of event.pages ?? []) {
        for (const command of page.list ?? []) {
          if (command.code === 401 && typeof command.parameters?.[0] === 'string') texts.push(command.parameters[0]);
          if (command.code !== 357 || command.parameters?.[0] !== 'VisuMZ_4_GabWindow' || command.parameters?.[1] !== 'GabTextOnly') continue;
          try {
            texts.push(JSON.parse(command.parameters[3]['Text:json']));
          } catch {
            throw writerFailure('discipline_contract_stale', { anchor: `runtime-dialogue:${event.id}:invalid-json` });
          }
        }
      }
    }
  }
  return [...new Set(texts)];
}

export function simulateHorizontalRoute(event, interval, criticalTiles = []) {
  const page = selectEligiblePage(event, 50, () => false).page;
  let x = event.x;
  const visited = [{ x, y: event.y }];
  for (const command of page?.moveRoute?.list ?? []) {
    if (command.code === 2) x -= 1;
    else if (command.code === 3) x += 1;
    else if (command.code !== 0) return { ok: false, code: 'field_route_out_of_bounds', anchor: `E${event.id}`, visited };
    if (command.code !== 0) visited.push({ x, y: event.y });
  }
  const invalid = visited.find(tile => tile.x < interval.minX || tile.x > interval.maxX || criticalTiles.some(other => other.x === tile.x && other.y === tile.y));
  return invalid ? { ok: false, code: 'field_route_out_of_bounds', anchor: `E${event.id}`, visited } : { ok: true, visited };
}

function replaceEvent(source, map, eventId) {
  return applyEdits(source, modify(source, ['events', eventId], map.events[eventId], { formattingOptions: { insertSpaces: true, tabSize: 4, eol: '\n' } }));
}

function canonicalHomeEvent(event, text) {
  const visible = pageAt(event.pages[1], 120, {
    list: [comment('SEMIFINAL:MAP044_GUARD_GAB'), gab(text, event.id, { force: true, bypass: true }), ...emptyList()],
  });
  const terminal = pageAt(visible, 900);
  const cleanupSource = event.pages.find(page => page.conditions?.variableValid && page.conditions?.variableId === 32) ?? event.pages.at(-1);
  const externalCleanup = structuredClone(cleanupSource);
  externalCleanup.conditions = {
    actorId: 1,
    actorValid: false,
    itemId: 1,
    itemValid: false,
    selfSwitchCh: 'A',
    selfSwitchValid: false,
    switch1Id: 1,
    switch1Valid: false,
    switch2Id: 1,
    switch2Valid: false,
    variableId: 32,
    variableValid: true,
    variableValue: 1,
  };
  externalCleanup.image = { tileId: 0, characterName: '', direction: 2, pattern: 0, characterIndex: 0 };
  externalCleanup.list = emptyList();
  externalCleanup.priorityType = 0;
  externalCleanup.through = true;
  externalCleanup.trigger = 0;
  return { ...structuredClone(event), note: 'SEMIFINAL:011:MAP044_GUARD_GAB:VISIBLE_V900_EX_GAB_V5', pages: [blankPage(event.pages[0], 0), visible, terminal, externalCleanup] };
}

function canonicalHomeArrivalEvent(event) {
  const base = event.pages[0];
  const arrival = pageAt(base, 120, {
    trigger: 3,
    list: [
      comment('SEMIFINAL:CS-SEM-HOME-ARRIVAL-011'),
      beginCutscene(),
      { code: 222, indent: 0, parameters: [] },
      ...cameraFocusPlayer(20),
      ...cameraWaits(),
      comment('SEMIFINAL:BT-SEM-HOME-ARRIVAL-011'),
      gab('Da semifinal para a porta de casa. Meu pai realmente sabe estragar uma vitória sem nem aparecer.', -1),
      plugin('VisuMZ_4_GabWindow', 'WaitForGab', 'System: Wait For Gab Completion'),
      transition('ARRIVE_HOME'),
      plugin('Coreto_QuestCore', 'QuestTransition', 'QuestTransition', { questKey: 'fim-de-jogo', transitionId: 'START' }),
      finishCutscene(),
      ...emptyList(),
    ],
  });
  return {
    ...structuredClone(event),
    name: 'SEMIFINAL — chegada exterior com guardas',
    note: 'SEMIFINAL:011:HOME_ARRIVAL:FADE_GUARDS_VISIBLE',
    pages: [arrival, blankPage(base, 900)],
  };
}

function barrierList(original, eventId) {
  const originalWithoutEnd = structuredClone(original)
    .filter(command => command.code !== 0)
    .map(command => ({ ...command, indent: command.indent + 1 }));
  for (const command of originalWithoutEnd) {
    if (command.code === 201 && command.parameters?.[1] === 21) command.parameters = [0, 44, 32, 48, command.parameters[4] ?? 0, command.parameters[5] ?? 0];
  }
  return [
    { code: 111, indent: 0, parameters: [1, 29, 0, 40, 0] },
    comment('SEMIFINAL:DL-SEM-URGENT-THORIN-001:MAP061_ENTRANCE_BLOCKER', 1),
    gab('Agora não! Eu já estou atrasado. O Dragobur deve estar soltando fumaça pelo nariz.', eventId, { force: true, bypass: true, indent: 1 }),
    { code: 115, indent: 1, parameters: [] },
    { code: 411, indent: 0, parameters: [] },
    ...originalWithoutEnd,
    { code: 412, indent: 0, parameters: [] },
    ...emptyList(),
  ];
}

function canonicalBarrierEvent(event) {
  const pages = event.pages.map(page => {
    const original = page.list ?? emptyList();
    const alreadyWrapped = original[0]?.code === 111 && original[0]?.parameters?.[1] === 29;
    let outside = original;
    if (alreadyWrapped) {
      const elseIndex = original.findIndex(command => command.code === 411 && command.indent === 0);
      const endIndex = original.findIndex((command, index) => index > elseIndex && command.code === 412 && command.indent === 0);
      outside =
        elseIndex >= 0 && endIndex > elseIndex ? original.slice(elseIndex + 1, endIndex).map(command => ({ ...structuredClone(command), indent: Math.max(0, command.indent - 1) })) : emptyList();
    }
    return { ...structuredClone(page), list: barrierList(outside, event.id) };
  });
  return { ...structuredClone(event), note: 'SEMIFINAL:011:MAP061_ENTRANCE_BLOCKER', pages };
}

function horizontalRoute() {
  return {
    list: [
      { code: 2, parameters: [] },
      { code: 3, parameters: [] },
      { code: 0, parameters: [] },
    ],
    repeat: true,
    skippable: true,
    wait: false,
  };
}

function canonicalFieldPlayer(event, interval) {
  const base = event.pages[event.note === `SEMIFINAL:011:HORIZONTAL:${interval.minX}-${interval.maxX}` ? 1 : 0];
  const visible = pageAt(base, 50, { moveType: 3, moveRoute: horizontalRoute(), trigger: 0 });
  return { ...structuredClone(event), x: interval.x, y: interval.y, note: `SEMIFINAL:011:HORIZONTAL:${interval.minX}-${interval.maxX}`, pages: [blankPage(base, 0), visible] };
}

function reservePages(event, lines) {
  const base = { ...structuredClone(event.pages[0]), moveType: 0, moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false }, trigger: 0 };
  return [50, 60, 90].map((value, index) => pageAt(base, value, { list: [comment(`SEMIFINAL:RESERVE:${value}`), gab(lines[index], event.id), ...emptyList()] }));
}

function canonicalE19(event) {
  const alreadyCanonical = event.note === 'SEMIFINAL:011:DRAGOBUR_GATE:E19';
  const base = event.pages[alreadyCanonical ? 1 : 0];
  const terminalBase = event.pages[alreadyCanonical ? 5 : 1];
  const solid = (value, text) =>
    pageAt(base, value, {
      image: { tileId: 0, characterName: '', direction: 2, pattern: 0, characterIndex: 0 },
      priorityType: 1,
      through: false,
      trigger: 1,
      list: [comment(`SEMIFINAL:DRAGOBUR_GATE:${value}`), gab(text, 2, { force: true, bypass: true }), ...emptyList()],
    });
  return {
    ...structuredClone(event),
    x: 12,
    y: 5,
    note: 'SEMIFINAL:011:DRAGOBUR_GATE:E19',
    pages: [
      blankPage(base, 0),
      solid(50, 'Fale comigo antes de entrar em campo, Thorin.'),
      solid(60, 'Vestiário, Thorin. Um capacete velho. E rápido!'),
      solid(70, 'Equipe o capacete velho, Thorin. Só então você entra em campo.'),
      solid(80, 'Volte aqui, Thorin. Quero ver esse capacete antes de liberar o campo.'),
      blankPage(terminalBase, 90),
    ],
  };
}

function canonicalStadiumExitEvent(event) {
  const targetNote = 'SEMIFINAL:011:STADIUM_EXIT:LOCKED_V60_V110';
  const validate = candidate => {
    const before = selectEligiblePage(candidate, 50, () => false).page;
    const locked = selectEligiblePage(candidate, 60, () => false).page;
    const restored = selectEligiblePage(candidate, 120, () => false).page;
    const transfers = page => (page?.list ?? []).filter(command => command.code === 201 && command.parameters?.[1] === 61);
    const gabs = page => (page?.list ?? []).filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow');
    if (candidate.note !== targetNote || transfers(before).length !== 1 || transfers(locked).length !== 0 || gabs(locked).length !== 1 || transfers(restored).length !== 1) {
      throw writerFailure('stadium_exit_contract_mismatch', { anchor: `Map062:E${candidate.id}` });
    }
    return candidate;
  };
  if (!event.pages?.[0] || !(event.pages[0].list ?? []).some(command => command.code === 201 && command.parameters?.[1] === 61)) {
    throw writerFailure('precondition_mismatch', { anchor: `Map062:E${event.id}:district-exit` });
  }
  const original = structuredClone(event.pages[0]);
  const locked = pageAt(original, 60, {
    list: [comment('SEMIFINAL:MAP062_STADIUM_EXIT_LOCKED:V60_V110'), gab('Não posso ir embora agora. Preciso pegar o capacete e entrar em campo.', -1, { force: true, bypass: true }), ...emptyList()],
  });
  const restored = pageAt(original, 120);
  return validate({ ...structuredClone(event), note: targetNote, pages: [original, locked, restored] });
}

function retargetLegacyPages(event, replacements) {
  const copy = structuredClone(event);
  for (const page of copy.pages) {
    if (page.conditions?.variableValid && page.conditions.variableId === 29 && replacements[page.conditions.variableValue] !== undefined) {
      page.conditions.variableValue = replacements[page.conditions.variableValue];
    }
  }
  return copy;
}

function canonicalHelmetEvent(event) {
  const targetNote = 'SEMIFINAL:011:CS-SEM-HELMET-STATUE-001:TRANSITION_THEN_PRESENTATION:ARMOR51';
  const validate = candidate => {
    const filler = selectEligiblePage(candidate, 50, () => false).page;
    const take = selectEligiblePage(candidate, 60, () => false).page;
    const detector = selectEligiblePage(candidate, 70, () => false).page;
    const terminal = selectEligiblePage(candidate, 80, () => false).page;
    const presentation = selectEligiblePage(candidate, 80, (kind, target) => kind === 'selfSwitch' && target === 'A').page;
    const grants = candidate.pages.flatMap(page => page.list ?? []).filter(command => command.code === 128 && command.parameters?.[0] === 51);
    const fillerMutates = (filler?.list ?? []).some(command => command.code === 128 || command.parameters?.[0] === 'Coreto_QuestCore');
    const fillerCopy = (filler?.list ?? []).some(command => command.code === 108 && command.parameters?.[0] === 'SEMIFINAL:DL-SEM-STATUE-PREQUEST-FILLER-011');
    const detectorGate = (detector?.list ?? []).some(command => command.code === 111 && command.parameters?.[1] === '$gameActors.actor(3).isEquipped($dataArmors[51])');
    const detectorTransition = (detector?.list ?? []).find(
      command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore' && command.parameters?.[3]?.transitionId === 'EQUIP_HELMET',
    );
    const detectorArmsPresentation = (detector?.list ?? []).some(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
    const detectorTransitionIndex = (detector?.list ?? []).indexOf(detectorTransition);
    const detectorLatchIndex = (detector?.list ?? []).findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
    const detectorOwnsCutscene = (detector?.list ?? []).some(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene');
    const presentationEffects = (presentation?.list ?? []).some(command => command.code === 212 && JSON.stringify(command.parameters) === JSON.stringify([-1, 91, false]));
    const presentationZooms = (presentation?.list ?? [])
      .filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom' && command.parameters?.[1] === 'ZoomChange')
      .map(command => command.parameters?.[3]?.['TargetScale:num']);
    const presentationCutscene = (presentation?.list ?? []).filter(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene').map(command => command.parameters?.[1]);
    const finishIndex = (presentation?.list ?? []).findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene' && command.parameters?.[1] === 'FinishCutscene');
    const clearIndex = (presentation?.list ?? []).findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 1]));
    if (
      candidate.note !== targetNote ||
      !filler?.image?.characterName ||
      filler?.conditions?.variableValue !== 50 ||
      !fillerCopy ||
      fillerMutates ||
      take?.conditions?.variableValue !== 60 ||
      grants.length !== 1 ||
      !detectorGate ||
      detector?.trigger !== 4 ||
      !detectorTransition ||
      !detectorArmsPresentation ||
      !(detectorTransitionIndex >= 0 && detectorTransitionIndex < detectorLatchIndex) ||
      detectorOwnsCutscene ||
      terminal?.trigger !== 0 ||
      presentation === terminal ||
      presentation?.conditions?.variableValue !== 80 ||
      presentation?.conditions?.selfSwitchCh !== 'A' ||
      presentation?.conditions?.selfSwitchValid !== true ||
      presentation?.trigger !== 3 ||
      !presentationEffects ||
      JSON.stringify(presentationZooms) !== JSON.stringify(['2', '1']) ||
      JSON.stringify(presentationCutscene) !== JSON.stringify(['BeginCutscene', 'FinishCutscene']) ||
      !(finishIndex >= 0 && finishIndex < clearIndex)
    ) {
      throw writerFailure('helmet_contract_mismatch', { anchor: 'Map063:E13' });
    }
    return candidate;
  };
  const copy = structuredClone(event);
  const takePage =
    copy.pages.find(page => page.conditions?.variableValid && page.conditions.variableId === 29 && page.conditions.variableValue === 60) ??
    copy.pages.find(page => (page.list ?? []).some(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Quests' && command.parameters?.[1] === 'addArmor'));
  if (!takePage) throw writerFailure('precondition_mismatch', { anchor: 'Map063:E13:take-page' });
  const grantIndex = takePage.list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Quests' && command.parameters?.[1] === 'addArmor');
  if (grantIndex < 0 && !takePage.list.some(command => command.code === 128 && command.parameters?.[0] === 51)) {
    throw writerFailure('precondition_mismatch', { anchor: 'Map063:E13:armor-grant' });
  }
  if (grantIndex >= 0) takePage.list[grantIndex] = { code: 128, indent: 1, parameters: [51, 0, 0, 1, false] };
  const gabText = command => {
    if (command.code !== 357 || command.parameters?.[0] !== 'VisuMZ_4_GabWindow' || command.parameters?.[1] !== 'GabTextOnly') return null;
    try {
      return JSON.parse(command.parameters?.[3]?.['Text:json']);
    } catch {
      return null;
    }
  };
  const readCopy = ['A seleção de ouro...', 'E esse é o velho capacete do Dragobur.', 'Ele vai me matar por chegar tarde.', 'Ou por mexer nisso.', 'Talvez pelos dois.'];
  const takeCopy = ['Desculpa, seleção de ouro.', 'O presente precisa mais disto do que a estátua.'];
  if (!readCopy.every(text => takePage.list.some(command => gabText(command) === text))) {
    const readGabIndex = takePage.list.findIndex(command => gabText(command)?.includes('A seleção de ouro'));
    if (readGabIndex < 0) throw writerFailure('precondition_mismatch', { anchor: 'Map063:E13:helmet-copy' });
    takePage.list.splice(readGabIndex, 1, ...readCopy.map(text => gab(text, 13)));
  }
  if (!takeCopy.every(text => takePage.list.some(command => gabText(command) === text))) {
    const takeGabIndex = takePage.list.findIndex(command => gabText(command)?.includes('Desculpa, seleção de ouro'));
    if (takeGabIndex < 0) throw writerFailure('precondition_mismatch', { anchor: 'Map063:E13:helmet-copy' });
    takePage.list.splice(takeGabIndex, 1, ...takeCopy.map(text => gab(text, 13)));
  }
  const filler = pageAt(takePage, 50, {
    list: [
      comment('SEMIFINAL:BT-SEM-STATUE-PREQUEST-FILLER-011'),
      comment('SEMIFINAL:DL-SEM-STATUE-PREQUEST-FILLER-011'),
      gab('A estátua do Dragobur parece estar me julgando por chegar atrasado. E ela nem sabe que o jogo já começou.', 13),
      ...emptyList(),
    ],
  });
  const alteredTemplate = copy.pages.find(page => page.conditions?.variableValid && page.conditions.variableId === 29 && page.conditions.variableValue === 70);
  if (!alteredTemplate) throw writerFailure('precondition_mismatch', { anchor: 'Map063:E13:equip-page' });
  const detector = pageAt(alteredTemplate, 70, {
    trigger: 4,
    list: helmetEquipDetectionSequence(),
  });
  const terminal = pageAt(copy.pages.find(page => page.conditions?.variableValid && page.conditions.variableId === 29 && page.conditions.variableValue === 80) ?? alteredTemplate, 80, {
    trigger: 0,
    list: [comment('SEMIFINAL:DL-SEM-HELMET-THORIN-FIT-001'), gab('Serviu! Quer dizer... se eu não respirar muito fundo.', -1), ...emptyList()],
  });
  const presentation = pageAt(terminal, 80, {
    conditions: { ...condition(80, terminal.conditions), selfSwitchCh: 'A', selfSwitchValid: true },
    trigger: 3,
    list: helmetEquipPresentationSequence({ stepBack: true }),
  });
  copy.pages = [filler, takePage, detector, terminal, presentation];
  copy.note = targetNote;
  return structuredClone(validate(copy));
}

function helmetEquipDetectionSequence() {
  return [
    { code: 111, indent: 0, parameters: [12, '$gameActors.actor(3).isEquipped($dataArmors[51])'] },
    comment('SEMIFINAL:CS-SEM-HELMET-EQUIP-DETECT-013', 1),
    transition('EQUIP_HELMET', 1),
    { code: 123, indent: 1, parameters: ['A', 0] },
    { code: 412, indent: 0, parameters: [] },
    ...emptyList(),
  ];
}

function helmetEquipPresentationSequence({ stepBack }) {
  const movement = stepBack
    ? [
        {
          code: 205,
          indent: 0,
          parameters: [
            -1,
            {
              list: [
                { code: 37, parameters: [] },
                { code: 13, parameters: [] },
                { code: 13, parameters: [] },
                { code: 38, parameters: [] },
                { code: 19, parameters: [] },
                { code: 0, parameters: [] },
              ],
              repeat: false,
              skippable: true,
              wait: true,
            },
          ],
        },
      ]
    : [];
  return [
    comment('SEMIFINAL:CS-SEM-HELMET-EQUIP-PRESENTATION-013'),
    beginCutscene(),
    ...cameraFocusPlayer(20),
    ...cameraZoom(2, 20),
    ...cameraWaits(),
    ...movement,
    comment('SEMIFINAL:CUE-SEM-HELMET-EQUIP-013'),
    { code: 250, indent: 0, parameters: [{ name: 'Equip1', volume: 90, pitch: 100, pan: 0 }] },
    { code: 212, indent: 0, parameters: [-1, 91, false] },
    { code: 225, indent: 0, parameters: [3, 5, 20, true] },
    ...cameraZoom(1, 24),
    ...cameraFocusPlayer(24),
    ...cameraWaits(),
    comment('SEMIFINAL:DL-SEM-HELMET-THORIN-FIT-001'),
    gab('Serviu!', -1),
    gab('Quer dizer...', -1),
    gab('Se eu não respirar muito fundo.', -1),
    plugin('VisuMZ_4_GabWindow', 'WaitForGab', 'System: Wait For Gab Completion'),
    finishCutscene(),
    { code: 123, indent: 0, parameters: ['A', 1] },
    ...emptyList(),
  ];
}

function canonicalStadiumEquipWatcher(event) {
  const targetNote = 'SEMIFINAL:011:HELMET_TRANSITION_THEN_PRESENTATION:E20';
  const validate = candidate => {
    const detector = selectEligiblePage(candidate, 70, () => false).page;
    const terminal = selectEligiblePage(candidate, 80, () => false).page;
    const presentation = selectEligiblePage(candidate, 80, (kind, target) => kind === 'selfSwitch' && target === 'A').page;
    const transitions = candidate.pages
      .flatMap(page => page.list ?? [])
      .filter(command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore' && command.parameters?.[3]?.transitionId === 'EQUIP_HELMET');
    const detectorGate = (detector?.list ?? []).some(command => command.code === 111 && command.parameters?.[1] === '$gameActors.actor(3).isEquipped($dataArmors[51])');
    const detectorArmsPresentation = (detector?.list ?? []).some(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
    const detectorTransitionIndex = (detector?.list ?? []).findIndex(
      command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore' && command.parameters?.[3]?.transitionId === 'EQUIP_HELMET',
    );
    const detectorLatchIndex = (detector?.list ?? []).findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
    const detectorOwnsCutscene = (detector?.list ?? []).some(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene');
    const presentationEffect = (presentation?.list ?? []).some(command => command.code === 212 && JSON.stringify(command.parameters) === JSON.stringify([-1, 91, false]));
    const presentationCutscene = (presentation?.list ?? []).filter(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene').map(command => command.parameters?.[1]);
    if (
      candidate.note !== targetNote ||
      detector?.trigger !== 4 ||
      !detectorGate ||
      !detectorArmsPresentation ||
      !(detectorTransitionIndex >= 0 && detectorTransitionIndex < detectorLatchIndex) ||
      detectorOwnsCutscene ||
      transitions.length !== 1 ||
      terminal?.trigger !== 0 ||
      presentation === terminal ||
      presentation?.conditions?.variableValue !== 80 ||
      presentation?.conditions?.selfSwitchCh !== 'A' ||
      presentation?.conditions?.selfSwitchValid !== true ||
      presentation?.trigger !== 3 ||
      !presentationEffect ||
      JSON.stringify(presentationCutscene) !== JSON.stringify(['BeginCutscene', 'FinishCutscene'])
    ) {
      throw writerFailure('helmet_contract_mismatch', { anchor: 'Map062:E20' });
    }
    return candidate;
  };
  const copy = structuredClone(event);
  const base = copy.pages[0];
  if (!base) throw writerFailure('precondition_mismatch', { anchor: 'Map062:E20' });
  const terminal = blankPage(base, 80);
  const presentation = pageAt(terminal, 80, {
    conditions: { ...condition(80, terminal.conditions), selfSwitchCh: 'A', selfSwitchValid: true },
    trigger: 3,
    list: helmetEquipPresentationSequence({ stepBack: true }),
  });
  copy.note = targetNote;
  copy.pages = [
    base,
    blankPage(base, 50),
    pageAt(base, 70, { trigger: 4, priorityType: 0, through: true, image: { tileId: 0, characterName: '', direction: 2, pattern: 0, characterIndex: 0 }, list: helmetEquipDetectionSequence() }),
    terminal,
    presentation,
  ];
  return structuredClone(validate(copy));
}

export function validateLockerGagEvent(event) {
  const first = event?.pages?.[0];
  const repeat = event?.pages?.[1];
  const terminal = event?.pages?.[2];
  const list = first?.list ?? [];
  const commands = (code, page = first) => (page?.list ?? []).filter(command => command.code === code);
  const plugins = (name, page = first) => commands(357, page).filter(command => command.parameters?.[0] === name);
  const camera = plugins('VisuMZ_4_MapCameraZoom');
  const cameraIndex = commandName => list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom' && command.parameters?.[1] === commandName);
  const moveIndex = list.findIndex(command => command.code === 205 && command.parameters?.[0] === 2 && JSON.stringify(command.parameters?.[1]).includes('Move to: 15,20'));
  const impactIndex = list.findIndex(command => command.code === 212 && JSON.stringify(command.parameters) === JSON.stringify([2, 39, false]));
  const selfSwitchIndex = list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
  const finishIndex = list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_Cutscene' && command.parameters?.[1] === 'FinishCutscene');
  const targetIndex = cameraIndex('CameraFocusTargetEvent');
  const playerIndex = cameraIndex('CameraFocusPlayer');
  const balloons = commands(213);
  const balloonEventIds = new Set(balloons.map(command => command.parameters?.[0]));
  const zooms = camera.filter(command => command.parameters?.[1] === 'ZoomChange').map(command => command.parameters?.[3]?.['TargetScale:num']);
  const gabTexts = event.pages.map(page =>
    (page.list ?? [])
      .filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow' && command.parameters?.[1] === 'GabTextOnly')
      .map(command => {
        try {
          return JSON.parse(command.parameters[3]['Text:json']);
        } catch {
          return null;
        }
      }),
  );
  const repeatForbidden = (repeat?.list ?? []).some(command => [205, 212, 213, 250].includes(command.code) || command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom');
  const invalid =
    event?.note !== 'SEMIFINAL:011:PROTECTED_GAG:ANYTIME_CAMERA_BALLOONS' ||
    first?.conditions?.variableId !== 29 ||
    first?.conditions?.variableValue !== 50 ||
    first?.trigger !== 1 ||
    terminal?.conditions?.variableId !== 29 ||
    terminal?.conditions?.variableValue !== 120 ||
    repeat?.conditions?.selfSwitchCh !== 'A' ||
    repeat?.conditions?.selfSwitchValid !== true ||
    commands(123).filter(command => JSON.stringify(command.parameters) === JSON.stringify(['A', 0])).length !== 1 ||
    ![-1, 2, 3, 4, 5].every(id => balloonEventIds.has(id)) ||
    !balloons.some(command => JSON.stringify(command.parameters) === JSON.stringify([2, 5, false])) ||
    JSON.stringify(zooms) !== JSON.stringify(['2', '1']) ||
    camera.filter(command => command.parameters?.[1] === 'CameraFocusWait').length !== 2 ||
    camera.filter(command => command.parameters?.[1] === 'ZoomWait').length !== 2 ||
    ![targetIndex, moveIndex, impactIndex, playerIndex, selfSwitchIndex, finishIndex].every(index => index >= 0) ||
    !(targetIndex < moveIndex && moveIndex < impactIndex && impactIndex < playerIndex && playerIndex < selfSwitchIndex && selfSwitchIndex < finishIndex) ||
    commands(212).filter(command => JSON.stringify(command.parameters) === JSON.stringify([2, 39, false])).length !== 1 ||
    commands(250).filter(command => command.parameters?.[0]?.name === 'Damage3').length !== 1 ||
    JSON.stringify(gabTexts) !== JSON.stringify([['Você não tem nenhuma decência?! Saia já daqui, seu miserável!'], ['Não. Essa porta já me explicou tudo. Com bastante impacto.'], []]) ||
    repeatForbidden;
  if (invalid) throw writerFailure('gag_contract_mismatch', { anchor: 'Map063:E7' });
  return { status: 'valid', anchor: 'Map063:E7' };
}

function canonicalLockerGagEvent(event) {
  const targetNote = 'SEMIFINAL:011:PROTECTED_GAG:ANYTIME_CAMERA_BALLOONS';
  if (event.note === targetNote) {
    const copy = structuredClone(event);
    const expected = ['Você não tem nenhuma decência?! Saia já daqui, seu miserável!', 'Não. Essa porta já me explicou tudo. Com bastante impacto.'];
    for (const [pageIndex, text] of expected.entries()) {
      const command = copy.pages[pageIndex].list.find(item => item.code === 357 && item.parameters?.[0] === 'VisuMZ_4_GabWindow' && item.parameters?.[1] === 'GabTextOnly');
      if (!command) throw writerFailure('gag_contract_mismatch', { anchor: `Map063:E7:P${pageIndex + 1}:dialogue` });
      command.parameters[3]['Text:json'] = JSON.stringify(text);
    }
    validateLockerGagEvent(copy);
    return copy;
  }
  if (event.note !== 'SEMIFINAL:PROTECTED_GAG:Map063-E7') throw writerFailure('precondition_mismatch', { anchor: 'Map063:E7:protected-gag' });
  const copy = structuredClone(event);
  const list = copy.pages?.[0]?.list;
  if (!Array.isArray(list) || copy.pages?.[0]?.conditions?.variableValue !== 60 || copy.pages?.[2]?.conditions?.variableValue !== 90) {
    throw writerFailure('precondition_mismatch', { anchor: 'Map063:E7:state-window' });
  }
  const approachIndex = list.findIndex(command => command.code === 108 && command.parameters?.[0] === 'SEMIFINAL:BT-SEM-GAG-APPROACH-001');
  const waitGabIndex = list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow' && command.parameters?.[1] === 'WaitForGab');
  const selfSwitchIndex = list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
  if (approachIndex < 0 || waitGabIndex < 0 || selfSwitchIndex < 0) throw writerFailure('precondition_mismatch', { anchor: 'Map063:E7:beat-anchors' });

  list.splice(approachIndex + 1, 0, ...cameraFocusTargetEvent(2), ...cameraZoom(2), balloon(2, 5), balloon(3, 1), balloon(4, 5), balloon(5, 1), balloon(-1, 6), ...cameraWaits());

  const shiftedWaitGabIndex = list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow' && command.parameters?.[1] === 'WaitForGab');
  list.splice(shiftedWaitGabIndex + 1, 0, comment('SEMIFINAL:BT-SEM-GAG-COMIC-PAUSE-PLAYTEST-001'), balloon(2, 5), balloon(-1, 6), { code: 230, indent: 0, parameters: [15] });

  const shiftedSelfSwitchIndex = list.findIndex(command => command.code === 123 && JSON.stringify(command.parameters) === JSON.stringify(['A', 0]));
  list.splice(shiftedSelfSwitchIndex, 0, comment('SEMIFINAL:BT-SEM-GAG-CAMERA-CLEANUP-PLAYTEST-001'), ...cameraFocusPlayer(), ...cameraZoom(1), ...cameraWaits());

  copy.pages[0].conditions.variableValue = 50;
  copy.pages[2].conditions.variableValue = 120;
  copy.note = targetNote;
  validateLockerGagEvent(copy);
  return copy;
}

function canonicalDragoburVnEvent(event) {
  const targetNote = 'SEMIFINAL:011:DRAGOBUR_VN_CONTROLLER:TRANSFER_BARRIER:EQUIP_RECONCILIATION';
  const copy = structuredClone(event);
  const base = copy.pages[0];
  copy.note = targetNote;
  copy.pages[0] = pageAt(base, 50, {
    list: [
      comment('SEMIFINAL:CS-SEM-DRAGOBUR-GATE-011'),
      beginCutscene(),
      comment('SEMIFINAL:BT-SEM-DRAGOBUR-ARRIVAL-001'),
      finishCutscene(),
      ...semifinalVnHandoff('SEMIFINAL_DRAGOBUR_ARRIVAL', 'SEMIFINAL_AFTER_ARRIVAL_VN'),
      beginCutscene(),
      transition('REQUIRE_HELMET'),
      gab('Vestiário, Thorin. Pegue um capacete velho, equipe e volte rápido.', 2),
      finishCutscene(),
      ...emptyList(),
    ],
  });
  const authorizationList = () => [
    comment('SEMIFINAL:CS-SEM-FIELD-AUTHORIZATION-011'),
    beginCutscene(),
    { code: 111, indent: 0, parameters: [12, '$gameActors.actor(3).isEquipped($dataArmors[51])'] },
    { code: 119, indent: 1, parameters: ['SEMIFINAL_AUTHORIZATION_VN'] },
    { code: 411, indent: 0, parameters: [] },
    gab('Não basta carregar o capacete. Equipe o elmo da estátua e volte aqui.', 2, { indent: 1 }),
    finishCutscene(1),
    { code: 115, indent: 1, parameters: [] },
    { code: 412, indent: 0, parameters: [] },
    { code: 118, indent: 0, parameters: ['SEMIFINAL_AUTHORIZATION_VN'] },
    finishCutscene(),
    ...semifinalVnHandoff('SEMIFINAL_DRAGOBUR_AUTHORIZATION', 'SEMIFINAL_AFTER_AUTHORIZATION_VN'),
    beginCutscene(),
    transition('AUTHORIZE_FIELD'),
    gab('Campo liberado, atacante. Vai antes que o jogo acabe sem você.', 2),
    finishCutscene(),
    ...emptyList(),
  ];
  copy.pages[2] = pageAt(base, 70, {
    list: [
      comment('SEMIFINAL:DRAGOBUR_EQUIP_RECONCILIATION:LEGACY_PARITY'),
      beginCutscene(),
      { code: 111, indent: 0, parameters: [12, '$gameActors.actor(3).isEquipped($dataArmors[51])'] },
      transition('EQUIP_HELMET', 1),
      gab('Agora sim. Esse capacete merece uma conversa antes de você entrar em campo.', 2, { indent: 1 }),
      { code: 411, indent: 0, parameters: [] },
      gab('Não basta carregar o capacete. Equipe o elmo da estátua e volte aqui.', 2, { indent: 1 }),
      { code: 412, indent: 0, parameters: [] },
      finishCutscene(),
      ...emptyList(),
    ],
  });
  copy.pages[3] = pageAt(base, 80, {
    list: authorizationList(),
  });
  return copy;
}

const FINAL_DIRECTION_ROUTE_CODES = Object.freeze({ down: 16, left: 17, right: 18, up: 19 });

function moveEvent(eventId, x, y, { characterName = null, wait = true, hideAtEnd = false, finalDirection = 'up' } = {}) {
  const finalDirectionCode = finalDirection === null ? null : FINAL_DIRECTION_ROUTE_CODES[finalDirection];
  if (finalDirection !== null && finalDirectionCode === undefined) {
    throw writerFailure('precondition_mismatch', { anchor: `moveEvent:finalDirection:${finalDirection}` });
  }
  const route = [
    { code: 37, parameters: [] },
    ...(characterName ? [{ code: 41, parameters: [characterName, 0] }] : []),
    { code: 45, parameters: [`Move to: ${x},${y}`] },
    ...(hideAtEnd ? [{ code: 39, parameters: [] }] : []),
    { code: 38, parameters: [] },
    ...(finalDirectionCode === null ? [] : [{ code: finalDirectionCode, parameters: [] }]),
    { code: 0 },
  ];
  return {
    code: 205,
    indent: 0,
    parameters: [eventId, { list: route, repeat: false, skippable: true, wait }],
  };
}

function restoreGuardPresentation(eventId, characterName) {
  return script(`$gameMap.event(${eventId}).setImage(${JSON.stringify(characterName)}, 0); $gameMap.event(${eventId}).setPriorityType(1); $gameMap.event(${eventId}).setThrough(false);`);
}

function canonicalStadiumGuardEvent(event, characterName) {
  const targetNote = `SEMIFINAL:011:FINALE_GUARD_STAGING:${characterName}`;
  const copy = structuredClone(event);
  const alreadyCanonical = event.note === targetNote;
  const base = copy.pages[alreadyCanonical ? 1 : 0];
  const inheritedPages = copy.pages.slice(alreadyCanonical ? 1 : 0);
  copy.note = targetNote;
  copy.pages = [blankPage(base, 110), ...inheritedPages];
  return copy;
}

export function buildMhordredEnemy(enemyId) {
  return {
    id: enemyId,
    name: 'Mhordred',
    battlerName: 'Mhordred',
    battlerHue: 0,
    exp: 0,
    gold: 0,
    params: [50000, 5000, 500, 500, 500, 500, 500, 500],
    actions: [{ skillId: 1, rating: 5, conditionType: 0, conditionParam1: 0, conditionParam2: 0 }],
    traits: [
      { code: 22, dataId: 0, value: 0.95 },
      { code: 22, dataId: 2, value: 0.05 },
      { code: 22, dataId: 1, value: 0.05 },
    ],
    dropItems: [{ dataId: 0, kind: 0, denominator: 1 }],
    note: '<Sideview Battler: Mhordred>\n<Sideview Idle Motion: wait>\n<ATB Field Gauge Face: Bosses, 0>',
  };
}

export function configuredTpModeNames(pluginsSource) {
  const text = Buffer.isBuffer(pluginsSource) ? pluginsSource.toString('utf8') : pluginsSource;
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start < 0 || end < start) throw writerFailure('precondition_mismatch', { anchor: 'frontend/js/plugins.js: plugin registry' });
  const registry = parseJsonc(text.slice(start, end + 1), 'frontend/js/plugins.js');
  const pluginEntry = registry.find(entry => entry?.name === 'VisuMZ_2_EnhancedTpSystem' && entry.status === true);
  if (!pluginEntry) throw writerFailure('precondition_mismatch', { anchor: 'frontend/js/plugins.js: VisuMZ_2_EnhancedTpSystem' });
  const serializedModes = JSON.parse(pluginEntry.parameters?.['TpMode:arraystruct'] ?? '[]');
  return serializedModes.map(serialized => String(JSON.parse(serialized)['Name:str'] ?? '').trim()).filter(Boolean);
}

export function invalidEnemyTpModeNotetags(enemies, configuredNames) {
  const configured = new Set(configuredNames.map(name => name.toUpperCase()));
  const invalid = [];
  for (const enemy of enemies.filter(Boolean)) {
    for (const match of String(enemy.note ?? '').matchAll(/<(?:FORCE\s+)?TP\s+MODE:\s*([^>]+)>/gi)) {
      const mode = match[1].trim();
      if (!configured.has(mode.toUpperCase())) invalid.push({ enemyId: enemy.id, mode });
    }
  }
  return invalid;
}

export function buildMhordredTroop(troopId, enemyId) {
  return {
    id: troopId,
    name: 'Mhordred',
    members: [{ enemyId, x: 227, y: 436, hidden: false }],
    pages: [
      {
        conditions: {
          actorHp: 50,
          actorId: 1,
          actorValid: false,
          enemyHp: 50,
          enemyIndex: 0,
          enemyValid: false,
          switchId: 1,
          switchValid: false,
          turnA: 0,
          turnB: 0,
          turnEnding: false,
          turnValid: false,
        },
        list: emptyList(),
        span: 0,
      },
    ],
  };
}

export function buildFinaleController(event, troopId = 19) {
  const copy = structuredClone(event);
  const base = copy.pages[0];
  copy.name = 'SEMIFINAL — finale EX/VN, batalha e escolta';
  copy.note = 'SEMIFINAL:011:FINALE_CONTROLLER:E6:RESTORE_GUARDS_ESCORT_FACING_V3';
  copy.pages[0] = pageAt(base, 110, {
    trigger: 3,
    priorityType: 0,
    list: [
      comment('SEMIFINAL:CS-SEM-STADIUM-FINALE-011'),
      beginCutscene(),
      { code: 203, indent: 0, parameters: [5, 0, 0, 7, 6] },
      { code: 203, indent: 0, parameters: [14, 0, 0, 8, 6] },
      comment('SEMIFINAL:BT-SEM-011-FIELD-EXIT'),
      moveEvent(3, 15, 3),
      moveEvent(4, 18, 3),
      moveEvent(7, 8, 3),
      moveEvent(8, 11, 3),
      finishCutscene(),
      ...semifinalVnHandoff('SEMIFINAL_CELEBRATION', 'SEMIFINAL_AFTER_CELEBRATION_VN'),
      beginCutscene(),
      comment('SEMIFINAL:BT-SEM-011-RIVALS-OUT-GUARDS-IN'),
      ...cameraFocusTargetEvent(7, 30),
      ...cameraWaits(),
      moveEvent(7, 2, 6, { wait: false }),
      moveEvent(8, 2, 8),
      script('$gameMap.event(5).setPriorityType(1);'),
      script('$gameMap.event(14).setPriorityType(1);'),
      moveEvent(5, 1, 7, { characterName: 'Principal/$Kilin', wait: false }),
      moveEvent(14, 1, 8, { characterName: 'Principal/$Mhordred' }),
      gab('Se vieram assistir à semifinal, chegaram tarde.', 7),
      gab('Não viemos pelo jogo.', 14),
      plugin('VisuMZ_4_GabWindow', 'WaitForGab', 'System: Wait For Gab Completion'),
      moveEvent(7, 0, 6, { wait: false, hideAtEnd: true }),
      moveEvent(8, 0, 8, { hideAtEnd: true }),
      ...cameraFocusTargetEvent(5, 30),
      ...cameraWaits(),
      moveEvent(5, 11, 10, { wait: false }),
      moveEvent(14, 12, 10),
      script('delete $gameTemp._semifinalGuardChoice;'),
      finishCutscene(),
      ...semifinalVnHandoff('SEMIFINAL_GUARD_INTERVENTION', 'SEMIFINAL_AFTER_GUARD_VN'),
      beginCutscene(),
      comment('SEMIFINAL:BT-SEM-011-BRANCH-EX'),
      { code: 111, indent: 0, parameters: [12, '$gameTemp._semifinalGuardChoice === "resist"'] },
      comment('SEMIFINAL:BT-SEM-011-RESIST', 1),
      script('delete $gameTemp._semifinalGuardChoice;', 1),
      { code: 129, indent: 1, parameters: [4, 0, false] },
      { code: 301, indent: 1, parameters: [0, troopId, false, true] },
      { code: 601, indent: 1, parameters: [] },
      { code: 119, indent: 2, parameters: ['SEMIFINAL_BATTLE_CLEANUP'] },
      { code: 603, indent: 1, parameters: [] },
      { code: 119, indent: 2, parameters: ['SEMIFINAL_BATTLE_CLEANUP'] },
      { code: 604, indent: 1, parameters: [] },
      { code: 411, indent: 0, parameters: [] },
      comment('SEMIFINAL:BT-SEM-011-GENTLE', 1),
      script('delete $gameTemp._semifinalGuardChoice;', 1),
      { code: 412, indent: 0, parameters: [] },
      { code: 118, indent: 0, parameters: ['SEMIFINAL_BATTLE_CLEANUP'] },
      script('$gameActors.actor(3).setHp($gameActors.actor(3).mhp);'),
      script('$gameActors.actor(4).setHp($gameActors.actor(4).mhp);'),
      { code: 129, indent: 0, parameters: [4, 1, false] },
      comment('SEMIFINAL:RESTORE_GUARDS_AFTER_VN_AND_PARTY_REFRESH'),
      restoreGuardPresentation(5, 'Principal/$Kilin'),
      restoreGuardPresentation(14, 'Principal/$Mhordred'),
      comment('SEMIFINAL:BT-SEM-011-ESCORT'),
      gab('Formação. Mhordred à retaguarda. Levaremos Thorin à Casa Forja-Prata.', 5),
      gab('A gente termina a comemoração quando você voltar. Isso não acaba aqui.', 3),
      plugin('VisuMZ_4_GabWindow', 'WaitForGab', 'System: Wait For Gab Completion'),
      ...cameraFocusPlayer(20),
      ...cameraWaits(),
      moveEvent(5, 10, 7, { wait: false }),
      moveEvent(14, 12, 7),
      moveEvent(5, 7, 7, { wait: false, finalDirection: 'left' }),
      moveEvent(-1, 8, 7, { wait: false, finalDirection: 'left' }),
      moveEvent(14, 9, 7, { finalDirection: 'left' }),
      { code: 221, indent: 0, parameters: [] },
      transition('COMMIT_ESCORT'),
      { code: 250, indent: 0, parameters: [{ name: 'Move1', volume: 80, pitch: 100, pan: 0 }] },
      finishCutscene(),
      { code: 201, indent: 0, parameters: [0, 44, 5, 23, 8, 0] },
      ...emptyList(),
    ],
  });
  copy.pages[1] = blankPage(copy.pages[1] ?? base, 120);
  return copy;
}

export function validateFinaleController(event, troopId = 19) {
  const list = event?.pages?.[0]?.list ?? [];
  const count = predicate => list.filter(predicate).length;
  const indexOfComment = value => list.findIndex(command => command.code === 108 && command.parameters?.[0] === value);
  const orderedAnchors = ['SEMIFINAL:BT-SEM-011-FIELD-EXIT', 'SEMIFINAL:BT-SEM-011-RIVALS-OUT-GUARDS-IN', 'SEMIFINAL:BT-SEM-011-BRANCH-EX', 'SEMIFINAL:BT-SEM-011-ESCORT'].map(indexOfComment);
  const battle = list.find(command => command.code === 301);
  const exactScripts = ['$gameActors.actor(3).setHp($gameActors.actor(3).mhp);', '$gameActors.actor(4).setHp($gameActors.actor(4).mhp);'];
  const scriptSources = list.filter(command => command.code === 355).map(command => command.parameters?.[0]);
  const jumps = list.filter(command => command.code === 119 && command.parameters?.[0] === 'SEMIFINAL_BATTLE_CLEANUP');
  const transitionCount = count(
    command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore' && command.parameters?.[1] === 'QuestTransition' && command.parameters?.[3]?.transitionId === 'COMMIT_ESCORT',
  );
  const transferCount = count(command => command.code === 201 && JSON.stringify(command.parameters) === JSON.stringify([0, 44, 5, 23, 8, 0]));
  const guardedMoves = list.filter(command => command.code === 205 && [3, 4, 5, 7, 8, 14].includes(command.parameters?.[0]));
  const deadlockSafe = guardedMoves.every(
    command =>
      command.parameters?.[1]?.skippable === true &&
      command.parameters?.[1]?.list?.some(routeCommand => routeCommand.code === 37) &&
      command.parameters?.[1]?.list?.some(routeCommand => routeCommand.code === 38),
  );
  const guardStarts = list.filter(command => command.code === 203 && [5, 14].includes(command.parameters?.[0])).map(command => command.parameters);
  const cameras = list.filter(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_MapCameraZoom');
  const fadeOutIndex = list.findIndex(command => command.code === 221);
  const commitIndex = list.findIndex(command => command.code === 357 && command.parameters?.[0] === 'Coreto_QuestCore' && command.parameters?.[3]?.transitionId === 'COMMIT_ESCORT');
  const escortPlayerMove = list.find(command => command.code === 205 && command.parameters?.[0] === -1 && JSON.stringify(command).includes('Move to: 8,7'));
  const guardRestoreCommentIndex = list.findIndex(command => command.code === 108 && command.parameters?.[0] === 'SEMIFINAL:RESTORE_GUARDS_AFTER_VN_AND_PARTY_REFRESH');
  const guardRestoreScripts = scriptSources.filter(source => /\.setImage\("Principal\/\$(?:Kilin|Mhordred)"/.test(source));
  const escortCommentIndex = indexOfComment('SEMIFINAL:BT-SEM-011-ESCORT');
  const escortPlayerTurns = escortPlayerMove?.parameters?.[1]?.list?.filter(command => [16, 17, 18, 19].includes(command.code)).map(command => command.code) ?? [];
  const invalid =
    event?.note !== 'SEMIFINAL:011:FINALE_CONTROLLER:E6:RESTORE_GUARDS_ESCORT_FACING_V3' ||
    event.pages?.[0]?.trigger !== 3 ||
    event.pages?.[0]?.conditions?.variableValue !== 110 ||
    event.pages?.[1]?.conditions?.variableValue !== 120 ||
    orderedAnchors.some(index => index < 0) ||
    orderedAnchors.some((index, position) => position > 0 && index <= orderedAnchors[position - 1]) ||
    count(command => command.code === 301) !== 1 ||
    JSON.stringify(battle?.parameters) !== JSON.stringify([0, troopId, false, true]) ||
    count(command => command.code === 129 && command.parameters?.[0] === 4 && command.parameters?.[1] === 0) !== 1 ||
    count(command => command.code === 129 && command.parameters?.[0] === 4 && command.parameters?.[1] === 1) !== 1 ||
    count(command => command.code === 601) !== 1 ||
    count(command => command.code === 603) !== 1 ||
    jumps.length !== 2 ||
    exactScripts.some(source => scriptSources.filter(candidate => candidate === source).length !== 1) ||
    scriptSources.some(source => /setMp|setTp|removeState|clearStates|changeEquip|gainItem/i.test(source)) ||
    transitionCount !== 1 ||
    transferCount !== 1 ||
    !deadlockSafe ||
    JSON.stringify(guardStarts) !==
      JSON.stringify([
        [5, 0, 0, 7, 6],
        [14, 0, 0, 8, 6],
      ]) ||
    cameras.filter(command => command.parameters?.[1] === 'CameraFocusTargetEvent').length < 2 ||
    !escortPlayerMove ||
    guardRestoreCommentIndex < 0 ||
    guardRestoreCommentIndex >= escortCommentIndex ||
    guardRestoreScripts.length !== 2 ||
    JSON.stringify(escortPlayerTurns) !== JSON.stringify([17]) ||
    fadeOutIndex < 0 ||
    commitIndex <= fadeOutIndex ||
    count(command => command.code === 122 && command.parameters?.[0] <= 29 && command.parameters?.[1] >= 29) > 0;
  if (invalid) throw writerFailure('battle_contract_mismatch', { anchor: 'Map062:E6:Resist' });
  return { status: 'valid', anchor: 'Map062:E6' };
}

const BARRIER_EVENT_IDS = Object.freeze([12, 21, 7, 28, 23, 14, 15, 16, 17]);
const FIELD_PLAYERS = Object.freeze({
  3: { x: 16, y: 2, minX: 15, maxX: 17 },
  4: { x: 19, y: 2, minX: 18, maxX: 20 },
  7: { x: 9, y: 2, minX: 7, maxX: 9 },
  8: { x: 11, y: 2, minX: 10, maxX: 12 },
});

export function projectCanonicalMaps({ sources }) {
  const maps = Object.fromEntries(Object.entries(sources).map(([name, source]) => [name, parseJsonc(source, `${name}.json`)]));
  maps.Map044.events[6] = retargetLegacyPages(maps.Map044.events[6], { 8: 900 });
  maps.Map044.events[10] = canonicalHomeArrivalEvent(maps.Map044.events[10]);
  maps.Map044.events[15] = canonicalHomeEvent(maps.Map044.events[15], 'Você conseguirá dormir bem à noite sabendo que seu pai nos puniu por sua causa?! Entre logo!');
  maps.Map044.events[16] = canonicalHomeEvent(maps.Map044.events[16], 'Vá, Thorin. O tempo está passando!');

  for (const id of BARRIER_EVENT_IDS) maps.Map061.events[id] = canonicalBarrierEvent(maps.Map061.events[id]);

  for (const [idText, interval] of Object.entries(FIELD_PLAYERS)) maps.Map062.events[Number(idText)] = canonicalFieldPlayer(maps.Map062.events[Number(idText)], interval);
  const reserveCopy = {
    9: ['Os Machados estavam esperando por você, Thorin.', 'Vai, Thorin. O vestiário fica logo ali.', 'Agora sim. Corre para o campo!'],
    10: ['Estamos perdendo. Precisamos do nosso atacante.', 'Capacete primeiro. A partida ainda não acabou.', 'Dragobur liberou. Vai virar esse jogo!'],
    11: ['O que está fazendo aí? Vai falar com o Dragobur!', 'Encontra um capacete e volta rápido.', 'Vai lá jogar, Thorin!'],
  };
  for (const [idText, lines] of Object.entries(reserveCopy)) {
    const id = Number(idText);
    const event = maps.Map062.events[id];
    event.pages = reservePages(event, lines);
    event.note = 'SEMIFINAL:011:RESERVE';
  }
  maps.Map062.events[19] = canonicalE19(maps.Map062.events[19]);
  maps.Map062.events[2] = canonicalDragoburVnEvent(maps.Map062.events[2]);
  maps.Map062.events[20] = canonicalStadiumEquipWatcher(maps.Map062.events[20]);
  for (const id of [15, 16, 17]) maps.Map062.events[id] = canonicalStadiumExitEvent(maps.Map062.events[id]);
  maps.Map062.events[6] = buildFinaleController(maps.Map062.events[6]);
  maps.Map062.events[5] = canonicalStadiumGuardEvent(retargetLegacyPages(maps.Map062.events[5], { 6: 120, 8: 900 }), 'Principal/$Kilin');
  maps.Map062.events[14] = canonicalStadiumGuardEvent(retargetLegacyPages(maps.Map062.events[14], { 6: 120, 8: 900 }), 'Principal/$Mhordred');

  for (const id of [2, 3, 4, 5]) maps.Map063.events[id] = retargetLegacyPages(maps.Map063.events[id], { 8: 90 });
  maps.Map063.events[1] = retargetLegacyPages(maps.Map063.events[1], { 1: 0 });
  maps.Map063.events[7] = canonicalLockerGagEvent(maps.Map063.events[7]);
  maps.Map063.events[13] = canonicalHelmetEvent(maps.Map063.events[13]);

  for (const id of [16, 17, 21, 22]) maps.Map064.events[id] = retargetLegacyPages(maps.Map064.events[id], { 8: 110 });

  const failures = validateCanonicalProjection(maps, { canonicalStates: CANONICAL_STATES, fieldPlayers: FIELD_PLAYERS });
  if (failures.length > 0) throw writerFailure(failures[0].code, failures[0]);

  const outputs = {};
  for (const [mapName, map] of Object.entries(maps)) {
    let output = sources[mapName].toString('utf8');
    for (let id = 1; id < map.events.length; id += 1) {
      if (map.events[id] && eventHash(map.events[id]) !== eventHash(parseJsonc(sources[mapName], `${mapName}.json`).events[id])) output = replaceEvent(output, map, id);
    }
    outputs[mapName] = output;
  }
  return { maps, outputs };
}

function walkFiles(directory, predicate, files = []) {
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(candidate, predicate, files);
    else if (entry.isFile() && predicate(candidate)) files.push(candidate);
  }
  return files;
}

function addReference(references, kind, id, relativePath, anchor) {
  if (Number.isInteger(id) && id > 0) references.push({ kind, id, path: relativePath, anchor });
}

function scanStructuredValue(value, relativePath, references, cursor = '$') {
  if (Array.isArray(value)) {
    value.forEach((child, index) => scanStructuredValue(child, relativePath, references, `${cursor}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (value.code === 301 && value.parameters?.[0] === 0) addReference(references, 'troop', Number(value.parameters[1]), relativePath, cursor);
  if (value.code === 201 && value.parameters?.[0] === 0) addReference(references, 'map', Number(value.parameters[1]), relativePath, cursor);
  for (const [key, child] of Object.entries(value)) {
    if (['enemyId', 'troopId', 'mapId', 'vnMapId'].includes(key)) {
      const kind = key === 'enemyId' ? 'enemy' : key === 'troopId' ? 'troop' : 'map';
      addReference(references, kind, Number(child), relativePath, `${cursor}.${key}`);
    }
    if (typeof child === 'string') {
      const trimmed = child.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
          scanStructuredValue(JSON.parse(trimmed), relativePath, references, `${cursor}.${key}:json`);
        } catch {
          /* plugin text is not always JSON */
        }
      }
    } else scanStructuredValue(child, relativePath, references, `${cursor}.${key}`);
  }
}

function scanJavaScript(source, relativePath, references) {
  const patterns = [
    ['enemy', /(?:enemyId\s*[:=]|\$dataEnemies\s*\[)\s*(\d+)/g],
    ['troop', /(?:troopId\s*[:=]|BattleManager\.setup\s*\()\s*(\d+)/g],
    ['map', /(?:mapId\s*[:=]|\$dataMapInfos\s*\[)\s*(\d+)/g],
  ];
  for (const [kind, pattern] of patterns) {
    for (const match of source.matchAll(pattern)) addReference(references, kind, Number(match[1]), relativePath, `offset:${match.index}`);
  }
}

export function scanTypedReferences({ rootDir }) {
  const references = [];
  const dataRoot = path.join(rootDir, 'frontend/data');
  for (const filename of walkFiles(dataRoot, candidate => candidate.endsWith('.json'))) {
    const relativePath = path.relative(rootDir, filename).split(path.sep).join('/');
    scanStructuredValue(parseJsonc(fs.readFileSync(filename), relativePath), relativePath, references);
  }
  for (const root of ['frontend/js', 'frontend/scripts']) {
    for (const filename of walkFiles(path.join(rootDir, root), candidate => /\.(?:js|mjs)$/.test(candidate))) {
      const relativePath = path.relative(rootDir, filename).split(path.sep).join('/');
      scanJavaScript(fs.readFileSync(filename, 'utf8'), relativePath, references);
    }
  }
  return references;
}

function recordFingerprint(record) {
  return record === undefined ? null : sha256(JSON.stringify(record));
}

function referencesFor(references, kind, id, ignoredPaths = []) {
  const ignored = new Set(ignoredPaths);
  return references.filter(reference => reference.kind === kind && reference.id === id && !ignored.has(reference.path));
}

function generatorOwnsTroop19(generators) {
  return (
    /physicalId\s*:\s*19/.test(generators.definitions) &&
    /Mhordred/.test(generators.definitions) &&
    /definition\.physicalId/.test(generators.generator) &&
    /troopsById\s*\[\s*definition\.physicalId\s*\]/.test(generators.generator)
  );
}

function verifyDirectDependency(rootDir) {
  const packageJson = parseJsonc(readRequired(rootDir, 'package.json'), 'package.json');
  const packageLock = parseJsonc(readRequired(rootDir, 'package-lock.json'), 'package-lock.json');
  if (
    packageJson.dependencies?.['jsonc-parser'] !== '^3.3.1' ||
    packageLock.packages?.['']?.dependencies?.['jsonc-parser'] !== '^3.3.1' ||
    packageLock.packages?.['node_modules/jsonc-parser']?.version !== '3.3.1'
  ) {
    throw writerFailure('precondition_mismatch', { anchor: 'package:jsonc-parser@3.3.1' });
  }
}

export function validateGameplayPlan({ targets, edits, allowedTargets }) {
  assertAllowedTargets({ targets, allowedTargets });
  if (targets.length !== edits.length || new Set(targets).size !== targets.length || targets.some((target, index) => edits[index]?.path !== target)) {
    throw writerFailure('restricted_diff_violation', { path: 'duplicate-target' });
  }
  for (const edit of edits.filter(item => item.path.endsWith('.json'))) parseJsonc(edit.content, edit.path);
  validatePlannedEdits(edits);
}

function addPlannedEdit({ rootDir, relativePath, content, fingerprints, targets, edits }) {
  const absolutePath = path.join(rootDir, relativePath);
  const existed = fs.existsSync(absolutePath);
  const original = existed ? fs.readFileSync(absolutePath) : null;
  fingerprints[relativePath] = { exists: existed, sha256: existed ? sha256(original) : null };
  if (!existed || original.toString('utf8') !== content) {
    targets.push(relativePath);
    edits.push({ path: relativePath, content, existed, original });
  }
}

function resolveCanonicalAllocations({ rootDir, databases, references, generators }) {
  const questTooling = parseJsonc(readRequired(rootDir, QUEST_TOOLING_PATH), QUEST_TOOLING_PATH);
  const allocations = questTooling.allocations;
  if (
    questTooling.schemaVersion !== 'quest-tooling/v1' ||
    !Number.isInteger(allocations?.vnMapId) ||
    !Number.isInteger(allocations?.mhordredEnemyId) ||
    !Number.isInteger(allocations?.mhordredTroopId)
  ) {
    throw writerFailure('precondition_mismatch', { anchor: `${QUEST_TOOLING_PATH}:allocations` });
  }

  const mapInfo = databases.mapInfos[allocations.vnMapId];
  const mapPath = path.join(rootDir, `frontend/data/Map${String(allocations.vnMapId).padStart(3, '0')}.json`);
  if (mapInfo?.name !== 'VN_Semifinal' || !fs.existsSync(mapPath)) throw writerFailure('database_id_unavailable', { kind: 'map' });

  const enemy = databases.enemies[allocations.mhordredEnemyId];
  const expectedEnemy = buildMhordredEnemy(allocations.mhordredEnemyId);
  const priorOwnedEnemy = { ...structuredClone(expectedEnemy), note: `${expectedEnemy.note}\n<TP Mode: Boss>` };
  const enemyOwned = [expectedEnemy, priorOwnedEnemy].some(candidate => recordFingerprint(enemy) === recordFingerprint(candidate));
  const enemyReferencesOwned = referencesFor(references, 'enemy', allocations.mhordredEnemyId).every(reference => reference.path === 'frontend/data/Troops.json');
  if (!enemyOwned || !enemyReferencesOwned) throw writerFailure('database_id_unavailable', { kind: 'enemy' });

  const troop = databases.troops[allocations.mhordredTroopId];
  const expectedTroop = buildMhordredTroop(allocations.mhordredTroopId, allocations.mhordredEnemyId);
  const troopOwned = recordFingerprint(troop) === recordFingerprint(expectedTroop);
  const troopReferencesOwned = referencesFor(references, 'troop', allocations.mhordredTroopId, ['frontend/data/Map014.json']).every(reference => reference.path === 'frontend/data/Map062.json');
  if (!troopOwned || !troopReferencesOwned) throw writerFailure('database_id_unavailable', { kind: 'troop' });
  if (!generatorOwnsTroop19(generators)) throw writerFailure('generator_ownership_conflict', { path: 'frontend/scripts/generate-troops.js' });

  return { mapId: allocations.vnMapId, enemyId: allocations.mhordredEnemyId, troopId: allocations.mhordredTroopId };
}

function gameplayTargets(questTooling) {
  const targets = questTooling.materializations?.filter(item => item.writer === 'semifinal-gameplay').map(item => item.target);
  if (!Array.isArray(targets) || targets.length === 0 || new Set(targets).size !== targets.length) {
    throw writerFailure('precondition_mismatch', { anchor: `${QUEST_TOOLING_PATH}:materializations` });
  }
  return targets;
}

export function planGameplayRemediation({ rootDir, checkOnly }) {
  if (typeof checkOnly !== 'boolean') throw writerFailure('precondition_mismatch', { anchor: 'checkOnly:boolean' });
  const discipline = validateDisciplineContracts({ rootDir });
  const fingerprints = { ...discipline.fingerprints };
  const questTooling = parseJsonc(readRequired(rootDir, QUEST_TOOLING_PATH), QUEST_TOOLING_PATH);
  const allowedTargets = gameplayTargets(questTooling);
  verifyDirectDependency(rootDir);

  const assetManifest = parseJsonc(readRequired(rootDir, ASSET_MANIFEST_PATH), ASSET_MANIFEST_PATH);
  const assetResult = validateAssetManifest({
    rootDir,
    manifest: assetManifest,
    reachability: {
      references: assetManifest.assets.map(asset => ({ path: asset.path, consumer: asset.consumers[0], manifestRequired: true })),
    },
  });
  if (assetResult.status !== 'complete') {
    const { status: _status, ...details } = assetResult;
    throw writerFailure(details.code, details);
  }

  const databasePaths = {
    mapInfos: 'frontend/data/MapInfos.json',
    enemies: 'frontend/data/Enemies.json',
    troops: 'frontend/data/Troops.json',
  };
  const databases = Object.fromEntries(Object.entries(databasePaths).map(([key, relativePath]) => [key, parseJsonc(readRequired(rootDir, relativePath), relativePath)]));
  const references = scanTypedReferences({ rootDir });
  const definitionsPath = 'frontend/scripts/troop-definitions.js';
  const generatorPath = 'frontend/scripts/generate-troops.js';
  const generators = {
    definitions: readRequired(rootDir, definitionsPath).toString('utf8'),
    generator: readRequired(rootDir, generatorPath).toString('utf8'),
  };
  const allocations = resolveCanonicalAllocations({ rootDir, databases, references, generators });

  for (const relativePath of [...Object.values(databasePaths), definitionsPath, generatorPath, 'frontend/data/Map011.json', 'frontend/data/CommonEvents.json', 'package.json', 'package-lock.json']) {
    const bytes = readRequired(rootDir, relativePath);
    fingerprints[relativePath] = { exists: true, sha256: sha256(bytes) };
  }
  const mapPaths = Object.fromEntries(['044', '061', '062', '063', '064'].map(id => [`Map${id}`, `frontend/data/Map${id}.json`]));
  const sources = Object.fromEntries(Object.entries(mapPaths).map(([name, relativePath]) => [name, readRequired(rootDir, relativePath)]));
  const projection = projectCanonicalMaps({ sources });
  validateFinaleController(projection.maps.Map062.events[6], allocations.troopId);
  const originLabels = ['SEMIFINAL_AFTER_ARRIVAL_VN', 'SEMIFINAL_AFTER_AUTHORIZATION_VN', 'SEMIFINAL_AFTER_CELEBRATION_VN', 'SEMIFINAL_AFTER_GUARD_VN'];
  const originLists = [...projection.maps.Map062.events[2].pages.map(page => page.list ?? []), ...projection.maps.Map062.events[6].pages.map(page => page.list ?? [])].flat();
  for (const label of originLabels) {
    if (originLists.filter(command => command.code === 118 && command.parameters?.[0] === label).length !== 1) {
      throw writerFailure('vn_registry_mismatch', { entry: label });
    }
  }
  const edits = [];
  const targets = [];
  for (const [mapName, relativePath] of Object.entries(mapPaths)) {
    const original = sources[mapName];
    const content = projection.outputs[mapName];
    fingerprints[relativePath] = { exists: true, sha256: sha256(original) };
    if (content !== original.toString('utf8')) {
      targets.push(relativePath);
      edits.push({ path: relativePath, content, existed: true, original });
    }
  }

  const enemiesSource = readRequired(rootDir, databasePaths.enemies).toString('utf8');
  const troopsSource = readRequired(rootDir, databasePaths.troops).toString('utf8');
  const pluginsSource = readRequired(rootDir, 'frontend/js/plugins.js').toString('utf8');
  const desiredEnemy = buildMhordredEnemy(allocations.enemyId);
  const desiredTroop = buildMhordredTroop(allocations.troopId, allocations.enemyId);
  const enemiesContent = applyEdits(enemiesSource, modify(enemiesSource, [allocations.enemyId], desiredEnemy, { formattingOptions: { insertSpaces: true, tabSize: 4, eol: '\n' } }));
  const troopsContent = applyEdits(troopsSource, modify(troopsSource, [allocations.troopId], desiredTroop, { formattingOptions: { insertSpaces: true, tabSize: 4, eol: '\n' } }));
  const invalidTpModes = invalidEnemyTpModeNotetags(parseJsonc(enemiesContent, databasePaths.enemies), configuredTpModeNames(pluginsSource));
  if (invalidTpModes.length > 0) {
    throw writerFailure('battle_contract_mismatch', { anchor: `Enemies:${invalidTpModes[0].enemyId}:TP Mode`, observed: invalidTpModes[0].mode });
  }
  addPlannedEdit({ rootDir, relativePath: databasePaths.enemies, content: enemiesContent, fingerprints, targets, edits });
  addPlannedEdit({ rootDir, relativePath: databasePaths.troops, content: troopsContent, fingerprints, targets, edits });

  const registryPath = 'frontend/data/CoretoQuests.json';
  const mapInfosPath = 'frontend/data/MapInfos.json';
  const vnMapPath = `frontend/data/Map${String(allocations.mapId).padStart(3, '0')}.json`;
  const questVnPluginPath = 'frontend/js/plugins/Coreto_QuestVN.js';
  const registrySource = readRequired(rootDir, registryPath);
  const mapInfosSource = readRequired(rootDir, mapInfosPath);
  const registry = parseJsonc(registrySource, registryPath);
  const mapInfos = parseJsonc(mapInfosSource, mapInfosPath);
  const vnEntries = buildQuestVnEntries(allocations.mapId);
  const currentEntries = registry.quests?.['a-semifinal']?.extensions?.questVN?.entries;
  if (!currentEntries?.ABERTURA_FORJAPRATA) throw writerFailure('vn_registry_mismatch', { entry: 'ABERTURA_FORJAPRATA' });
  const desiredEntries = { ...currentEntries, ...vnEntries };
  const registryContent = applyEdits(
    registrySource.toString('utf8'),
    modify(registrySource.toString('utf8'), ['quests', 'a-semifinal', 'extensions', 'questVN', 'entries'], desiredEntries, { formattingOptions: { insertSpaces: true, tabSize: 4, eol: '\n' } }),
  );
  const desiredMapInfo = {
    id: allocations.mapId,
    expanded: false,
    name: 'VN_Semifinal',
    order: 60,
    parentId: 18,
    scrollX: 777.7777777777778,
    scrollY: 432,
    quick: false,
  };
  if (mapInfos[allocations.mapId] && mapInfos[allocations.mapId].name !== 'VN_Semifinal') {
    throw writerFailure('database_id_unavailable', { kind: 'map' });
  }
  const mapInfosContent = applyEdits(
    mapInfosSource.toString('utf8'),
    modify(mapInfosSource.toString('utf8'), [allocations.mapId], desiredMapInfo, { formattingOptions: { insertSpaces: true, tabSize: 4, eol: '\n' } }),
  );
  const vnMap = buildSemifinalVnMap();
  try {
    validateMaterializedDialogue({
      dialogue: discipline.sourceText['docs/Quests/2-semifinal/semifinal.dialogos.md'],
      runtimeTexts: materializedDialogue({ ...projection.maps, Map065: vnMap }),
    });
  } catch (error) {
    throw writerFailure('discipline_contract_stale', { path: 'docs/Quests/2-semifinal/semifinal.dialogos.md', anchor: error.anchor });
  }
  const vnMapContent = JSON.stringify(vnMap);
  const questVnPluginSource = readRequired(rootDir, questVnPluginPath).toString('utf8');
  const questVnPluginContent = patchQuestVnPlugin(questVnPluginSource);
  const desiredRegistry = parseJsonc(registryContent, registryPath);
  const desiredMapInfos = parseJsonc(mapInfosContent, mapInfosPath);
  try {
    validateSemifinalVn({ registry: desiredRegistry, mapInfos: desiredMapInfos, map: vnMap, vnMapId: allocations.mapId });
  } catch (error) {
    throw writerFailure(error?.code ?? 'vn_registry_mismatch', { entry: error?.entry ?? 'SEMIFINAL_DRAGOBUR_ARRIVAL' });
  }

  addPlannedEdit({ rootDir, relativePath: registryPath, content: registryContent, fingerprints, targets, edits });
  addPlannedEdit({ rootDir, relativePath: mapInfosPath, content: mapInfosContent, fingerprints, targets, edits });
  addPlannedEdit({ rootDir, relativePath: vnMapPath, content: vnMapContent, fingerprints, targets, edits });
  addPlannedEdit({ rootDir, relativePath: questVnPluginPath, content: questVnPluginContent, fingerprints, targets, edits });
  validateGameplayPlan({ targets, edits, allowedTargets });
  return { writer: WRITER, targets, fingerprints, allocations, edits, projection, allowedTargets };
}
