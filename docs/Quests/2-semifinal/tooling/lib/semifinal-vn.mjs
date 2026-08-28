export const VN_ENTRY_KEYS = Object.freeze(['SEMIFINAL_DRAGOBUR_ARRIVAL', 'SEMIFINAL_DRAGOBUR_AUTHORIZATION', 'SEMIFINAL_CELEBRATION', 'SEMIFINAL_GUARD_INTERVENTION']);

export const VN_EVENT_IDS = Object.freeze({
  SEMIFINAL_DRAGOBUR_ARRIVAL: 1,
  SEMIFINAL_DRAGOBUR_AUTHORIZATION: 2,
  SEMIFINAL_CELEBRATION: 3,
  SEMIFINAL_GUARD_INTERVENTION: 4,
});

const EXPECTED_STATES = Object.freeze({
  SEMIFINAL_DRAGOBUR_ARRIVAL: 50,
  SEMIFINAL_DRAGOBUR_AUTHORIZATION: 80,
  SEMIFINAL_CELEBRATION: 110,
  SEMIFINAL_GUARD_INTERVENTION: 110,
});

const RESUME_LABELS = Object.freeze({
  SEMIFINAL_DRAGOBUR_ARRIVAL: 'SEMIFINAL_AFTER_ARRIVAL_VN',
  SEMIFINAL_DRAGOBUR_AUTHORIZATION: 'SEMIFINAL_AFTER_AUTHORIZATION_VN',
  SEMIFINAL_CELEBRATION: 'SEMIFINAL_AFTER_CELEBRATION_VN',
  SEMIFINAL_GUARD_INTERVENTION: 'SEMIFINAL_AFTER_GUARD_VN',
});

const LINES = Object.freeze({
  SEMIFINAL_DRAGOBUR_ARRIVAL: [
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'THORIN! Os Machados já estão perdendo, meu atacante resolveu passear por Gildrat e você aparece agora?!'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Eu apareci antes do fim. Me põe em campo que ainda dá para virar.'],
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'Em campo sem capacete? Nem se você fosse filho de todas as Grandes Casas ao mesmo tempo.'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Então me dá um. Ou aponta onde esconderam um.'],
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'Vestiário. Pegue um capacete velho, qualquer um que ainda proteja essa sua cabeça, equipe e volte. E não invente moda.'],
  ],
  SEMIFINAL_DRAGOBUR_AUTHORIZATION: [
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'ERA PARA VOCÊ PEGAR UM CAPACETE VELHO NO VESTIÁRIO, NÃO O CAPACETE DA ESTÁTUA DO TIME DE OURO!'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Eu estava com pressa. Esse serviu certinho. E tenho certeza de que eu e o capacete vamos fazer história juntos.'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Além disso... se ele estava numa estátua, ninguém estava usando.'],
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'O jogo está acabando e eu preciso do meu atacante. Entra antes que eu decida escalar a estátua no seu lugar.'],
  ],
  SEMIFINAL_CELEBRATION: [
    ['Time dos Machados', 'Portraits/Futebol/Companheiro1', 1, 'MACHADOS! MACHADOS! THORIN!'],
    ['Martelo de Bronze', 'Portraits/Futebol/Adversario1', 9, 'Bonita a festa. Quando um time de bairro precisa do filho de uma Grande Casa para vencer, até a ferrugem parece ouro.'],
    ['Outro Martelo', 'Portraits/Futebol/Adversario1', 9, 'Sem patrocinador, sem equipamento e sem nome. Aí aparece um nobre e vocês chamam de mérito.'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Meu sobrenome não marcou o gol. E patrocínio de Casa Mineradora também não joga por vocês.'],
    ['Filena', 'Portraits/Principal/Filena', 1, 'Ele correu com os Machados. Perdeu o fôlego com os Machados. A vitória é nossa. Engulam isso juntos.'],
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'Chega. Hoje meu time fez história com o que tinha — inclusive um atacante atrasado e um capacete roubado da decoração.'],
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'Fica com ele, Thorin. Depois desse gol, o capacete escolheu um dono tão teimoso quanto o anterior.'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Eu avisei. Nós dois ainda vamos fazer história.'],
  ],
  SEMIFINAL_GUARD_INTERVENTION: [
    ['Dragobur', 'Portraits/Principal/Treinador', 9, 'A comemoração ainda não acabou. Quem chamou a Guarda de Ferro?'],
    ['Killin', 'Portraits/Principal/Kilin', 9, 'Thorin Forja-Prata. Sou Killin, Capitã da Guarda de Ferro. Por ordem direta do General Thordan, você volta para casa conosco. Agora.'],
    ['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Meu pai não manda no estádio. E não manda no meu time.'],
    ['Mhordred', 'Portraits/Principal/Mhordred', 9, 'Ele mandou em nós. Para hoje, isso basta.'],
    [
      'Filena',
      'Portraits/Principal/Filena',
      1,
      'Não basta. Vocês entram na nossa festa, tratam o time como se não existisse e esperam que ele abaixe a cabeça. Se levarem Thorin à força, vão ter que passar por mim também.',
    ],
  ],
});

function command(code, parameters = [], indent = 0) {
  return { code, indent, parameters };
}

function plugin(pluginName, commandName, displayName, args = {}, indent = 0) {
  return command(357, [pluginName, commandName, displayName, args], indent);
}

function annotations(rows, indent = 0) {
  return rows.map(row => command(657, [row], indent));
}

function enterBust(pictureName, position, indent = 0) {
  return [
    plugin(
      'VisuMZ_2_VNPictureBusts',
      'Basic_EnterBust',
      'BASIC: Enter Bust',
      {
        'PictureID:eval': '1',
        'PictureName:str': pictureName,
        'Origin:str': 'Bust',
        'Position:num': String(position),
        'StartOffsetX:eval': '-200',
        'StartOffsetY:eval': '+0',
        'EasingType:str': 'OutSine',
        'HorzMirror:str': position <= 5 ? 'Auto-Reverse' : 'Auto',
        'Duration:eval': '20',
      },
      indent,
    ),
    ...annotations(
      [
        'Picture ID = 1',
        `Picture File = ${pictureName}`,
        'Origin = Bust',
        `Screen Position = ${position}`,
        'Start Offset X = -200',
        'Start Offset Y = +0',
        'Entrance Easing = OutSine',
        `Horizontal Mirror = ${position <= 5 ? 'Auto-Reverse' : 'Auto'}`,
        'Duration = 20',
      ],
      indent,
    ),
  ];
}

function exitBusts(ids = ['1'], indent = 0) {
  const encoded = JSON.stringify(ids);
  return [
    plugin(
      'VisuMZ_2_VNPictureBusts',
      'Basic_ExitBusts',
      'BASIC: Exit Bust(s)',
      {
        'PictureID:arrayeval': encoded,
        'EndOffsetX:eval': '-200',
        'EndOffsetY:eval': '+0',
        'EasingType:str': 'InSine',
        'FlipDirection:str': 'None',
        'Duration:eval': '20',
        'AutoErase:eval': 'true',
      },
      indent,
    ),
    ...annotations([`Picture ID(s) = ${encoded}`, 'End Offset X = -200', 'End Offset Y = +0', 'Exit Easing = InSine', 'Flip Direction = None', 'Duration = 20', 'Auto-Erase? = true'], indent),
  ];
}

function lineCommands([speaker, pictureName, position, text], indent = 0) {
  return [...enterBust(pictureName, position, indent), command(101, ['', 0, 0, 2, speaker], indent), command(401, [text], indent), ...exitBusts(['1'], indent)];
}

function guardChoiceCommands() {
  return [
    plugin('PKD_VisualChoices_MZ', 'OpenVisualChoice', 'Visual Choices', {
      menuId: 'desafiarMhordred',
      posType: '0',
      screenXY: '{"x:int":"0","y:int":"0"}',
      headerText: '',
      source: 'Plugin parameters',
    }),
    ...annotations(['Group ID = desafiarMhordred', 'Position type = 0', 'Screen Position = {"x:int":"0","y:int":"0"}', 'Header Text = ', 'Settings from = Plugin parameters']),
    command(102, [['recuar1', 'brigar2'], 1, 0, 2, 0]),
    command(402, [0, 'recuar1']),
    command(355, ['$gameTemp._semifinalGuardChoice = "gentle";'], 1),
    ...lineCommands(['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Eu vou. Mas deixem o time terminar de comemorar.'], 1),
    command(402, [1, 'brigar2']),
    command(355, ['$gameTemp._semifinalGuardChoice = "resist";'], 1),
    ...lineCommands(['Thorin', 'Portraits/Principal/Thorin Helmet', 1, 'Eu não vou fingir que isso é justo. Filena, fica atrás de mim.'], 1),
    ...lineCommands(['Filena', 'Portraits/Principal/Filena', 1, 'Nem pensar. A gente enfrenta isso junto.'], 1),
    command(404),
  ];
}

function cleanupCommands() {
  return [plugin('VisuMZ_4_GabWindow', 'ClearGab', 'System: Clear Gabs', {}), ...exitBusts(['1', '2', '3', '4']), ...Array.from({ length: 10 }, (_, index) => command(235, [index + 1]))];
}

function page(entryKey) {
  const list = [
    plugin('Coreto_QuestVN', 'AssertVisualNovelSession', 'AssertVisualNovelSession', { questKey: 'a-semifinal', entryKey }),
    plugin('Coreto_QuestCore', 'AssertQuestState', 'AssertQuestState', { questKey: 'a-semifinal', expectedState: String(EXPECTED_STATES[entryKey]) }),
    plugin('VisuMZ_4_GabWindow', 'ClearGab', 'System: Clear Gabs', {}),
    ...LINES[entryKey].flatMap(line => lineCommands(line)),
  ];
  if (entryKey === 'SEMIFINAL_GUARD_INTERVENTION') list.push(...guardChoiceCommands());
  list.push(...cleanupCommands(), plugin('Coreto_QuestVN', 'FinishVisualNovel', 'FinishVisualNovel', {}), command(115), command(0));
  return {
    conditions: {
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
      variableId: 1,
      variableValid: false,
      variableValue: 0,
    },
    directionFix: false,
    image: { characterIndex: 0, characterName: '', direction: 2, pattern: 0, tileId: 0 },
    list,
    moveFrequency: 3,
    moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
    moveSpeed: 3,
    moveType: 0,
    priorityType: 0,
    stepAnime: false,
    through: true,
    trigger: 0,
    walkAnime: true,
  };
}

export function buildSemifinalVnMap() {
  const events = [null];
  for (const entryKey of VN_ENTRY_KEYS) {
    const id = VN_EVENT_IDS[entryKey];
    events[id] = {
      id,
      name: `VN — Semifinal: ${entryKey}`,
      note: `SEMIFINAL:011:${entryKey}`,
      pages: [page(entryKey)],
      x: 6 + id,
      y: 6,
    };
  }
  return {
    autoplayBgm: false,
    autoplayBgs: false,
    battleback1Name: '',
    battleback2Name: '',
    bgm: { name: '', pan: 0, pitch: 100, volume: 90 },
    bgs: { name: '', pan: 0, pitch: 100, volume: 90 },
    data: Array(17 * 13 * 6).fill(0),
    disableDashing: false,
    displayName: 'Semifinal',
    encounterList: [],
    encounterStep: 30,
    events,
    height: 13,
    note: '<CoretoMapType:VN>',
    parallaxLoopX: false,
    parallaxLoopY: false,
    parallaxName: 'VN_Semifinal_BG',
    parallaxShow: true,
    parallaxSx: 0,
    parallaxSy: 0,
    scrollType: 0,
    specifyBattleback: false,
    tilesetId: 1,
    width: 17,
  };
}

export function buildQuestVnEntries(vnMapId) {
  return Object.fromEntries(
    VN_ENTRY_KEYS.map(entryKey => [
      entryKey,
      {
        mapId: vnMapId,
        eventId: VN_EVENT_IDS[entryKey],
        allowedStates: [EXPECTED_STATES[entryKey]],
        ...(RESUME_LABELS[entryKey] ? { resumeLabel: RESUME_LABELS[entryKey] } : {}),
      },
    ]),
  );
}

export function patchQuestVnPlugin(source) {
  let output = source;
  const replacements = [
    ['[v1.0.0]', '[v1.1.0]'],
    ['@version 1.0.0', '@version 1.1.0'],
    [
      'const entryUnknown = Object.keys(entry).filter(key => !["eventId", "allowedStates"].includes(key));',
      'const entryUnknown = Object.keys(entry).filter(key => !["mapId", "eventId", "allowedStates", "resumeLabel"].includes(key));',
    ],
    [
      '            positiveInteger(entry.eventId, "eventId", entryContext);\n            if (eventIds.has(entry.eventId)) fail("SCHEMA_EVENT_ID_DUPLICATE", entryContext);\n            eventIds.add(entry.eventId);',
      '            const entryMapId = entry.mapId === undefined ? extension.mapId : positiveInteger(entry.mapId, "mapId", entryContext);\n            if (!$dataMapInfos || !$dataMapInfos[entryMapId]) fail("SCHEMA_MAP_UNKNOWN", Object.assign({ mapId: entryMapId }, entryContext));\n            positiveInteger(entry.eventId, "eventId", entryContext);\n            const eventIdentity = `${entryMapId}:${entry.eventId}`;\n            if (eventIds.has(eventIdentity)) fail("SCHEMA_EVENT_ID_DUPLICATE", entryContext);\n            eventIds.add(eventIdentity);\n            if (entry.resumeLabel !== undefined && (typeof entry.resumeLabel !== "string" || !IDENTIFIER_PATTERN.test(entry.resumeLabel))) {\n                fail("SCHEMA_RESUME_LABEL_INVALID", Object.assign({ resumeLabel: entry.resumeLabel }, entryContext));\n            }',
    ],
    ['            mapId: extension.mapId,\n            eventId: entry.eventId,', '            mapId: entry.mapId === undefined ? extension.mapId : entry.mapId,\n            eventId: entry.eventId,'],
    [
      '            audioPolicy: spawn.audioPolicy,\n            eventStarted: false,',
      '            audioPolicy: spawn.audioPolicy,\n            resumeLabel: entry.resumeLabel || null,\n            eventStarted: false,',
    ],
    ['        if (currentSession.phase === PHASES.RETURNING) {', '        if (currentSession.phase === PHASES.RETURNING) {'],
    [
      '            restoreOrigin(currentSession.origin, currentSession.audioPolicy);\n            FlowCoordinator.release(currentSession.token);\n            ensureStore().session = null;\n            return;',
      '            let resume = null;\n            if (currentSession.resumeLabel) {\n                const originEvent = $gameMap.event(currentSession.origin.eventId);\n                if (!originEvent || !originEvent.page() || !originEvent.list()) {\n                    fail("VN_RESUME_EVENT_MISSING", { eventId: currentSession.origin.eventId, resumeLabel: currentSession.resumeLabel });\n                }\n                const labels = [];\n                originEvent.list().forEach((command, index) => {\n                    if (command.code === 118 && command.parameters && command.parameters[0] === currentSession.resumeLabel) labels.push(index);\n                });\n                if (labels.length !== 1) {\n                    fail("VN_RESUME_LABEL_MISSING", { eventId: currentSession.origin.eventId, resumeLabel: currentSession.resumeLabel, matches: labels.length });\n                }\n                resume = { eventId: currentSession.origin.eventId, list: originEvent.list(), index: labels[0] + 1 };\n            }\n            restoreOrigin(currentSession.origin, currentSession.audioPolicy);\n            FlowCoordinator.release(currentSession.token);\n            ensureStore().session = null;\n            if (resume) {\n                $gameMap._interpreter.setup(resume.list, resume.eventId);\n                $gameMap._interpreter._index = resume.index;\n            }\n            return;',
    ],
    ['        version: "1.0.0",', '        version: "1.1.0",'],
  ];
  for (const [before, after] of replacements) {
    if (!output.includes(before)) {
      if (output.includes(after)) continue;
      throw new Error(`Coreto_QuestVN precondition mismatch: ${before.slice(0, 80)}`);
    }
    output = output.replace(before, after);
  }
  return output;
}

function pluginCommandIndex(list, pluginName, commandName) {
  return list.findIndex(command => command.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName);
}

export function validateSemifinalVn({ registry, mapInfos, map, vnMapId }) {
  const fail = entry => {
    const error = new Error('vn_registry_mismatch');
    error.code = 'vn_registry_mismatch';
    error.entry = entry;
    throw error;
  };
  if (mapInfos[vnMapId]?.name !== 'VN_Semifinal' || mapInfos[vnMapId]?.parentId !== 18 || map.note !== '<CoretoMapType:VN>') fail(VN_ENTRY_KEYS[0]);
  const questVn = registry.quests?.['a-semifinal']?.extensions?.questVN;
  if (!questVn || questVn.mapId !== 49 || Object.keys(questVn.entries).filter(key => key !== 'ABERTURA_FORJAPRATA').length !== 4) fail(VN_ENTRY_KEYS[0]);
  if (questVn.entries.ABERTURA_FORJAPRATA.mapId !== undefined || questVn.entries.ABERTURA_FORJAPRATA.eventId !== 1) fail('ABERTURA_FORJAPRATA');
  for (const entryKey of VN_ENTRY_KEYS) {
    const entry = questVn.entries[entryKey];
    const event = map.events?.[VN_EVENT_IDS[entryKey]];
    if (!entry || entry.mapId !== vnMapId || entry.eventId !== VN_EVENT_IDS[entryKey] || event?.pages?.[0]?.trigger !== 0) fail(entryKey);
    const list = event.pages[0].list;
    const assertSession = pluginCommandIndex(list, 'Coreto_QuestVN', 'AssertVisualNovelSession');
    const assertState = pluginCommandIndex(list, 'Coreto_QuestCore', 'AssertQuestState');
    const firstContent = list.findIndex(command => command.code === 101);
    const cleanup = list.findIndex((command, index) => index > firstContent && command.code === 357 && command.parameters?.[0] === 'VisuMZ_4_GabWindow' && command.parameters?.[1] === 'ClearGab');
    const finish = pluginCommandIndex(list, 'Coreto_QuestVN', 'FinishVisualNovel');
    const exit = list.findIndex(command => command.code === 115);
    if (!(assertSession === 0 && assertSession < assertState && assertState < firstContent && firstContent < cleanup && cleanup < finish && finish < exit)) fail(entryKey);
    if (list.some(command => command.code === 122 && command.parameters?.[0] <= 29 && command.parameters?.[1] >= 29)) fail(entryKey);
  }
  return { status: 'valid', entries: VN_ENTRY_KEYS };
}
