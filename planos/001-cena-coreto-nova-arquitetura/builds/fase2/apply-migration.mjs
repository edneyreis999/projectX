import fs from "node:fs";

const root = new URL("../../../../", import.meta.url);
const path = relative => new URL(relative, root);

function readText(relative) {
    return fs.readFileSync(path(relative), "utf8");
}

function readJson(relative) {
    return JSON.parse(readText(relative));
}

function writeJson(relative, value) {
    const target = path(relative);
    const previous = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    const suffix = previous.endsWith("\n") || !previous ? "\n" : "";
    fs.writeFileSync(target, `${JSON.stringify(value, null, 4)}${suffix}`);
}

function command(plugin, name, args) {
    return { code: 357, indent: 0, parameters: [plugin, name, name, args] };
}

function end() {
    return { code: 0, indent: 0, parameters: [] };
}

function exitEvent() {
    return { code: 115, indent: 0, parameters: [] };
}

const QUEST_KEY = "noite-da-historia";
const ENTRY_KEY = "CENA_PRINCIPAL";
const STAGE_VARIABLE_ID = 106;

function questTransition(id) {
    return command("Coreto_QuestCore", "QuestTransition", {
        questKey: QUEST_KEY,
        transitionId: id
    });
}

function assertQuestState(state) {
    return command("Coreto_QuestCore", "AssertQuestState", {
        questKey: QUEST_KEY,
        expectedState: String(state)
    });
}

function assertVnSession() {
    return command("Coreto_QuestVN", "AssertVisualNovelSession", {
        questKey: QUEST_KEY,
        entryKey: ENTRY_KEY
    });
}

function enterVn() {
    return command("Coreto_QuestVN", "EnterVisualNovel", {
        questKey: QUEST_KEY,
        entryKey: ENTRY_KEY
    });
}

function finishVn() {
    return command("Coreto_QuestVN", "FinishVisualNovel", {});
}

function beginCutscene() {
    return command("Coreto_Cutscene", "BeginCutscene", {});
}

function finishCutscene() {
    return command("Coreto_Cutscene", "FinishCutscene", {});
}

function isLegacyStageWrite(eventCommand, variableId) {
    return eventCommand.code === 122 && eventCommand.parameters[0] === variableId && eventCommand.parameters[1] === variableId;
}

function isLegacyPkdScript(eventCommand) {
    return (eventCommand.code === 355 || eventCommand.code === 655) &&
        typeof eventCommand.parameters[0] === "string" && eventCommand.parameters[0].includes("SQSM.");
}

function map022Migration() {
    const map = readJson("frontend/data/Map022.json");
    map.note = "<CoretoMapType:EX>";

    const entry = map.events[30];
    entry.name = "EX — Noite da História: convocação";
    const entryPage = entry.pages[0];
    const entryCommands = entryPage.list.filter(item =>
        !isLegacyStageWrite(item, 26) && !isLegacyPkdScript(item)
    );
    entryCommands.splice(entryCommands.length - 1, 0, questTransition("START"));
    entryPage.list = entryCommands;

    const seat = map.events[18];
    seat.name = "EX — Noite da História: posição";
    const seatPage = seat.pages[0];
    seatPage.conditions.variableId = STAGE_VARIABLE_ID;
    seatPage.conditions.variableValid = true;
    seatPage.conditions.variableValue = 10;
    const physicalSeatCommands = seatPage.list.filter(item =>
        !isLegacyStageWrite(item, 26) && !isLegacyPkdScript(item) && item.code !== 123
    );
    physicalSeatCommands.splice(0, 0, beginCutscene());
    physicalSeatCommands.splice(physicalSeatCommands.length - 1, 0,
        finishCutscene(),
        enterVn(),
        exitEvent()
    );
    seatPage.list = physicalSeatCommands;

    const rheed = map.events[17];
    rheed.name = "EX — Rheed: saída para Map045";
    const outroSource = rheed.pages[3];
    const outro = structuredClone(outroSource);
    outro.conditions.variableId = STAGE_VARIABLE_ID;
    outro.conditions.variableValid = true;
    outro.conditions.variableValue = 20;
    outro.conditions.selfSwitchValid = false;
    outro.trigger = 3;
    outro.list = [
        beginCutscene(),
        ...outroSource.list.filter(item => item.code !== 214 && item.code !== 357 && item.code !== 657 && item.code !== 0),
        questTransition("ARRIVE_MAP045"),
        finishCutscene(),
        { code: 201, indent: 0, parameters: [0, 45, 2, 4, 2, 0] },
        exitEvent(),
        end()
    ];
    rheed.pages = [outro];

    writeJson("frontend/data/Map022.json", map);
}

function map046Migration() {
    const map = readJson("frontend/data/Map046.json");
    map.note = "<CoretoMapType:VN>";

    const text = (value, indent = 0) => [
        { code: 101, indent, parameters: ["", 0, 0, 2, ""] },
        { code: 401, indent, parameters: [value] }
    ];
    const switchOn = (id, indent = 0) => ({ code: 121, indent, parameters: [id, id, 0] });
    const bustEnter = (pictureId, pictureName, position, indent = 0) => ({
        code: 357,
        indent,
        parameters: ["VisuMZ_2_VNPictureBusts", "Basic_EnterBust", "BASIC: Enter Bust", {
            "PictureID:eval": String(pictureId),
            "PictureName:str": pictureName,
            "Origin:str": "Bust",
            "Position:num": String(position),
            "StartOffsetX:eval": "-200",
            "StartOffsetY:eval": "+0",
            "EasingType:str": "OutSine",
            "HorzMirror:str": "Auto-Reverse",
            "Duration:eval": "20"
        }]
    });
    const bustExit = (ids, offset = "-200", indent = 0) => ({
        code: 357,
        indent,
        parameters: ["VisuMZ_2_VNPictureBusts", "Basic_ExitBusts", "BASIC: Exit Bust(s)", {
            "PictureID:arrayeval": JSON.stringify(ids.map(String)),
            "EndOffsetX:eval": offset,
            "EndOffsetY:eval": offset === "+200" ? "-0" : "+0",
            "EasingType:str": "InSine",
            "FlipDirection:str": "None",
            "Duration:eval": "20",
            "AutoErase:eval": "true"
        }]
    });
    const narrative = [
        bustEnter(1, "Portraits/Principal/Reed final", 5),
        switchOn(43),
        ...text("Olha só quem chegou atrasado! A gente estava te esperando..."),
        bustExit([1]),
        bustEnter(1, "Portraits/Principal/Reed final", 5),
        switchOn(43),
        ...text("Humm... acho que já vi você antes! Seu nome é Dulgarin, certo?"),
        bustExit([1]),
        command("PKD_VisualChoices_MZ", "OpenVisualChoice", {
            menuId: "qualSeuNome", posType: "0", screenXY: "{\"x:int\":\"0\",\"y:int\":\"0\"}",
            headerText: "", source: "Plugin parameters"
        }),
        { code: 102, indent: 0, parameters: [["qualSeuNome1", "qualSeuNome2"], 1, 0, 2, 0] },
        { code: 402, indent: 0, parameters: [0, "qualSeuNome1"] },
        bustEnter(1, "Portraits/Principal/Reed final", 9, 1),
        switchOn(43, 1),
        ...text("Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem!", 1),
        bustEnter(2, "Portraits/Principal/CriancaOrc_", 1, 1),
        switchOn(44, 1),
        ...text("Como você sabia o meu nome?!", 1),
        switchOn(43, 1),
        ...text("Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!!", 1),
        bustExit([1, 2], "+200", 1),
        { code: 402, indent: 0, parameters: [1, "qualSeuNome2"] },
        bustEnter(2, "Portraits/Principal/CriancaOrc_", 5, 1),
        switchOn(44, 1),
        ...text("Você quase acertou, miseravi! Eu disse quase. Só errou a pronúncia, todas as letras e a pessoa. Não sou Dulgarin, meu nome é...", 1),
        bustExit([2], "-200", 1),
        { code: 303, indent: 1, parameters: [1, 8] },
        bustEnter(1, "Portraits/Principal/Reed final", 5, 1),
        switchOn(43, 1),
        ...text("É um prazer te conhecer, \\N[1]! Agora, voltando à nossa história...", 1),
        bustExit([1], "-200", 1),
        { code: 404, indent: 0, parameters: [] },
        bustEnter(1, "Portraits/Principal/Reed final", 5),
        switchOn(43),
        ...text("Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa!"),
        ...text("Antes de qualquer coisa, preciso contar a história de Gildrat, o Império dos Anões!"),
        ...text("Essa história começa com um anão cabeça dura, chamado Thorin!"),
        ...text("Vamos, feche os olhos! E deixe essa antiga poção te transportar para a história."),
        bustExit([1])
    ];
    const page = {
        conditions: {},
        image: {},
        moveType: 0,
        moveRoute: {},
        moveSpeed: 3,
        moveFrequency: 3,
        walkAnime: true,
        stepAnime: false,
        directionFix: false,
        through: true,
        priorityType: 0,
        trigger: 0,
        list: []
    };
    page.conditions = {
        actorId: 1, actorValid: false, itemId: 1, itemValid: false,
        selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false,
        switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0
    };
    page.image = { tileId: 0, characterName: "", direction: 2, pattern: 0, characterIndex: 0 };
    page.moveType = 0;
    page.moveRoute = { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false };
    page.moveSpeed = 3;
    page.moveFrequency = 3;
    page.walkAnime = true;
    page.stepAnime = false;
    page.directionFix = false;
    page.through = true;
    page.priorityType = 0;
    page.trigger = 0;
    page.list = [
        assertVnSession(),
        assertQuestState(10),
        ...narrative,
        questTransition("COMPLETE_VN"),
        finishVn(),
        exitEvent(),
        end()
    ];
    map.events = [null, {
        id: 1,
        name: "VN — Noite da História: diálogo principal",
        note: "",
        x: 8,
        y: 6,
        pages: [page]
    }];
    writeJson("frontend/data/Map046.json", map);
}

function map045Migration() {
    const map = readJson("frontend/data/Map045.json");
    map.note = "<CoretoMapType:EX>";
    const arrival = map.events[11];
    arrival.pages[0].conditions.variableId = STAGE_VARIABLE_ID;
    arrival.pages[0].conditions.variableValid = true;
    arrival.pages[0].conditions.variableValue = 90;
    writeJson("frontend/data/Map045.json", map);
}

function fixMap022Outro() {
    const map = readJson("frontend/data/Map022.json");
    const page = map.events[17].pages[0];
    const transfer = { code: 201, indent: 0, parameters: [0, 45, 2, 4, 2, 0] };
    page.list = page.list.filter(item => item.code !== 201);
    const finishIndex = page.list.findIndex(item =>
        item.code === 357 && item.parameters[0] === "Coreto_Cutscene" && item.parameters[1] === "FinishCutscene"
    );
    if (finishIndex < 0) throw new Error("Map022 E17 is missing FinishCutscene");
    page.list.splice(finishIndex + 1, 0, transfer);
    writeJson("frontend/data/Map022.json", map);
}

function phaseOneData() {
    const system = readJson("frontend/data/System.json");
    system.variables[STAGE_VARIABLE_ID] = "v_qNoiteDaHistoria_stage";
    writeJson("frontend/data/System.json", system);

    writeJson("frontend/data/CoretoQuests.json", {
        schemaVersion: 1,
        quests: {
            [QUEST_KEY]: {
                stageVariableId: STAGE_VARIABLE_ID,
                initialState: 0,
                terminalStates: [90],
                pkd: {
                    questId: "assistirNoiteHistoria",
                    objectives: [
                        { id: 1, knownFrom: 10, completedAt: 10 },
                        { id: 2, knownFrom: 10, completedAt: 20 }
                    ]
                },
                transitions: {
                    START: { from: [0], to: 10, requirements: [], effects: [] },
                    COMPLETE_VN: { from: [10], to: 20, requirements: [], effects: [] },
                    ARRIVE_MAP045: { from: [20], to: 90, requirements: [], effects: [], terminal: true }
                },
                extensions: {
                    questVN: {
                        mapId: 46,
                        spawn: { x: 8, y: 6, direction: 2, fadeType: 0, audioPolicy: "restore-origin" },
                        entries: {
                            [ENTRY_KEY]: { eventId: 1, allowedStates: [10] }
                        }
                    }
                }
            }
        }
    });
}

function pluginsMigration() {
    const relative = "frontend/js/plugins.js";
    const source = readText(relative);
    const prefixEnd = source.indexOf("[");
    const suffixStart = source.lastIndexOf("];");
    if (prefixEnd < 0 || suffixStart < prefixEnd) throw new Error("plugins.js envelope is not recognized");
    const plugins = JSON.parse(source.slice(prefixEnd, suffixStart + 1));
    let seenPkd = false;
    const filtered = plugins.filter(plugin => {
        if (plugin.name === "PKD_SimpleQuestSystem") {
            if (seenPkd) return false;
            seenPkd = true;
        }
        return !["Coreto_QuestCore", "Coreto_QuestVN", "Coreto_Cutscene"].includes(plugin.name);
    });
    if (!seenPkd) throw new Error("PKD_SimpleQuestSystem active entry is missing");
    const coretoIndex = filtered.findIndex(plugin => plugin.name === "Coreto_Quests");
    if (coretoIndex < 0) throw new Error("Coreto_Quests anchor is missing");
    filtered.splice(coretoIndex + 1, 0,
        { name: "Coreto_QuestCore", status: true, description: "[v1.0.0] Núcleo data-driven de quests Coreto.", parameters: {} },
        { name: "Coreto_QuestVN", status: true, description: "[v1.0.0] Roteador Exploration/Visual Novel por quest e entryKey.", parameters: {} },
        { name: "Coreto_Cutscene", status: true, description: "[v1.0.0] Controle de cutscenes físicas Coreto em Exploration.", parameters: {} }
    );
    const newline = source.endsWith("\n") ? "\n" : "";
    fs.writeFileSync(path(relative), `${source.slice(0, prefixEnd)}${JSON.stringify(filtered, null, 4)};${newline}`);
}

const phase = process.argv[2] || "all";
if (phase === "all" || phase === "fase1") {
    phaseOneData();
    pluginsMigration();
}
if (phase === "all" || phase === "map046") map046Migration();
if (phase === "all" || phase === "maps-ex") {
    map022Migration();
    map045Migration();
}
if (phase === "fix-outro") fixMap022Outro();
