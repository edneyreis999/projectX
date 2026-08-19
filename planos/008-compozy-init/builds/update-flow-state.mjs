import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../../..");

const TARGETS = [
    "frontend/data/Map022.json",
    "frontend/data/Map045.json",
    "frontend/data/Map049.json",
    "frontend/data/MapInfos.json"
];

export const PROTECTED_BASELINE = Object.freeze({
    "Map045:E8": "0bf7b43335ad3083bbf556a9eac0adc7b6799a4032f5c150ce1045ea63adf060",
    "Map045:E10": "e9526a85e4c552a37480efbf2deedbeadf5b4ac65938f01d8161aabb129e141d",
    "Map045:E11:P5-P6": "5176cb9da058dc94efb3d41093b1b5d33c27bd3155b856620519e0a89c0f7d51",
    "Map045:E12:P3-P8": "fc675e77ee308062d18ae009d892431b67236cd52b53666c4c00a740b67c4e0d",
    "Map049:E2": "f8e6934e54b1a182f4c050a627b18e24f94c208d2cdba6754a260567b7e342f1",
    "Map045:unrelated-events": "44e84bed3ccb550d85539ab032e8cc14f92c9be79986650a3c3040a166165a50"
});

const fail = message => {
    throw new Error(`flow_state_precondition_failed: ${message}`);
};
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const clone = value => JSON.parse(JSON.stringify(value));
const sha256 = value => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");

function readJson(relative) {
    const absolute = path.join(repoRoot, relative);
    const raw = fs.readFileSync(absolute, "utf8");
    const bom = raw.startsWith("\uFEFF");
    const body = bom ? raw.slice(1) : raw;
    const newline = body.includes("\r\n") ? "\r\n" : "\n";
    const trailingNewline = body.endsWith(newline);
    let value;
    try {
        value = JSON.parse(body);
    } catch (error) {
        fail(`${relative} is not valid JSON: ${error.message}`);
    }
    const roundTrip = JSON.stringify(value, null, 4).replace(/\n/g, newline) + (trailingNewline ? newline : "");
    if (roundTrip !== body) fail(`${relative} does not use the supported four-space JSON style`);
    return { absolute, relative, raw, bom, newline, trailingNewline, value };
}

function serialize(document) {
    const body = JSON.stringify(document.value, null, 4).replace(/\n/g, document.newline) +
        (document.trailingNewline ? document.newline : "");
    return (document.bom ? "\uFEFF" : "") + body;
}

function event(map, id, expectedName) {
    const found = map.events?.[id];
    if (!found || found.id !== id || found.name !== expectedName) {
        fail(`semantic event anchor E${id} (${expectedName}) is missing`);
    }
    return found;
}

function plugin(command, pluginName, commandName) {
    return command?.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName;
}

function findExactly(list, predicate, description) {
    const indexes = list.map((command, index) => predicate(command) ? index : -1).filter(index => index >= 0);
    if (indexes.length !== 1) fail(`${description}: expected one semantic match, found ${indexes.length}`);
    return indexes[0];
}

function requireVariableCondition(page, variableId, variableValue, description) {
    const conditions = page?.conditions;
    if (!conditions?.variableValid || conditions.variableId !== variableId || conditions.variableValue !== variableValue) {
        fail(`${description}: expected V${variableId} >= ${variableValue}`);
    }
}

function useSelfSwitch(page, letter) {
    page.conditions.variableValid = false;
    page.conditions.selfSwitchValid = true;
    page.conditions.selfSwitchCh = letter;
}

function conditionIsSelfSwitch(page, letter) {
    return page?.conditions?.selfSwitchValid === true && page.conditions.selfSwitchCh === letter &&
        page.conditions.variableValid === false;
}

function migrateCondition(page, legacyValue, letter, description) {
    if (page?.conditions?.variableValid === true && page.conditions.variableId === 106 &&
            page.conditions.variableValue === legacyValue) {
        useSelfSwitch(page, letter);
    } else if (!conditionIsSelfSwitch(page, letter)) {
        fail(`${description}: condition is neither legacy V106 >= ${legacyValue} nor final self-switch ${letter}`);
    }
}

function blankTerminalPage(source, variableValue) {
    const page = clone(source);
    page.conditions.variableValid = true;
    page.conditions.variableId = 106;
    page.conditions.variableValue = variableValue;
    page.conditions.selfSwitchValid = false;
    page.trigger = 0;
    page.list = [{ code: 0, indent: 0, parameters: [] }];
    return page;
}

function protectedSurfaces(map045, map049) {
    const changedIds = new Set([11, 12, ...Array.from({ length: 19 }, (_, index) => index + 21), 36]);
    return {
        "Map045:E8": map045.events[8],
        "Map045:E10": map045.events[10],
        "Map045:E11:P5-P6": map045.events[11].pages.slice(4),
        "Map045:E12:P3-P8": map045.events[12].pages.slice(2),
        "Map049:E2": map049.events[2],
        "Map045:unrelated-events": map045.events.filter(Boolean).filter(item => !changedIds.has(item.id))
    };
}

export function protectedFingerprints(map045, map049) {
    return Object.fromEntries(Object.entries(protectedSurfaces(map045, map049)).map(([key, value]) => [key, sha256(value)]));
}

function assertProtected(map045, map049, phase) {
    const actual = protectedFingerprints(map045, map049);
    for (const [key, expected] of Object.entries(PROTECTED_BASELINE)) {
        if (actual[key] !== expected) fail(`${phase} protected fingerprint changed for ${key}: ${actual[key]}`);
    }
    return actual;
}

function updateMap022(map022) {
    const e17 = event(map022, 17, "EX — Rheed: saída para Map045");
    const e18 = event(map022, 18, "EX — Noite da História: posição");

    if (e17.pages.length === 2) {
        requireVariableCondition(e17.pages[1], 106, 20, "Map022 E17 transition page");
        findExactly(e17.pages[1].list, command => plugin(command, "Coreto_QuestCore", "QuestTransition") &&
            command.parameters?.[3]?.transitionId === "ARRIVE_MAP045", "Map022 E17 ARRIVE_MAP045");
        e17.pages.push(blankTerminalPage(e17.pages[1], 90));
    } else if (!(e17.pages.length === 3 && e17.pages[2].trigger === 0 && e17.pages[2].conditions.variableValue === 90)) {
        fail("Map022 E17 terminal page shape is neither legacy nor final");
    }

    if (e18.pages.length === 1) {
        requireVariableCondition(e18.pages[0], 106, 10, "Map022 E18 entry page");
        findExactly(e18.pages[0].list, command => plugin(command, "Coreto_QuestVN", "EnterVisualNovel"), "Map022 E18 EnterVisualNovel");
        e18.pages.push(blankTerminalPage(e18.pages[0], 20));
    } else if (!(e18.pages.length === 2 && e18.pages[1].trigger === 0 && e18.pages[1].conditions.variableValue === 20)) {
        fail("Map022 E18 terminal page shape is neither legacy nor final");
    }
}

function updateMap045(map045) {
    const e11 = event(map045, 11, "EX - Melia: pesadelos e estados");
    const e12 = event(map045, 12, "Sáparo");
    const e36 = event(map045, 36, "EX — Rheed: saída para Map045");
    if (e11.pages.length !== 6 || e12.pages.length !== 8 || e36.pages.length !== 3) fail("Map045 owned page counts drifted");

    const opening = e11.pages[0].list;
    const enterIndex = findExactly(opening, command => plugin(command, "Coreto_QuestVN", "EnterVisualNovel") &&
        command.parameters?.[3]?.entryKey === "ABERTURA_FORJAPRATA", "Map045 E11 opening EnterVisualNovel");
    const selfAIndex = findExactly(opening, command => command.code === 123 && same(command.parameters, ["A", 0]), "Map045 E11 opening self-switch A");
    if (selfAIndex > enterIndex) {
        const [selfA] = opening.splice(selfAIndex, 1);
        const finishIndex = findExactly(opening, command => plugin(command, "Coreto_Cutscene", "FinishCutscene"), "Map045 E11 opening FinishCutscene");
        opening.splice(finishIndex, 0, selfA);
    } else if (selfAIndex !== enterIndex - 2 && selfAIndex !== enterIndex - 1) {
        fail("Map045 E11 self-switch A is not adjacent to the lifecycle handoff");
    }

    migrateCondition(e11.pages[2], 100, "D", "Map045 E11 return cutscene page");
    const v106To110 = e11.pages[2].list.findIndex(command => command.code === 122 && same(command.parameters, [106, 106, 0, 0, 110]));
    const selfB = e11.pages[2].list.filter(command => command.code === 123 && same(command.parameters, ["B", 0]));
    if (v106To110 >= 0 && selfB.length === 0) {
        e11.pages[2].list[v106To110] = { code: 123, indent: e11.pages[2].list[v106To110].indent, parameters: ["B", 0] };
    } else if (!(v106To110 < 0 && selfB.length === 1)) {
        fail("Map045 E11 return writer is neither legacy V106=110 nor final self-switch B");
    }

    migrateCondition(e11.pages[3], 110, "B", "Map045 E11 terminal page");

    if (conditionIsSelfSwitch(e12.pages[1], "A")) useSelfSwitch(e12.pages[1], "B");
    else migrateCondition(e12.pages[1], 100, "B", "Map045 E12 post-opening page");

    for (const id of [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39]) {
        const child = event(map045, id, "Crianca");
        if (child.pages.length !== 2) fail(`Map045 E${id} child page count drifted`);
        migrateCondition(child.pages[0], 91, "A", `Map045 E${id} visible page`);
        migrateCondition(child.pages[1], 100, "B", `Map045 E${id} terminal page`);
    }

    migrateCondition(e36.pages[0], 91, "A", "Map045 E36 appearance page");
    const v106To92 = e36.pages[0].list.findIndex(command => command.code === 122 && same(command.parameters, [106, 106, 0, 0, 92]));
    const e36SelfB = e36.pages[0].list.filter(command => command.code === 123 && same(command.parameters, ["B", 0]));
    if (v106To92 >= 0 && e36SelfB.length === 0) {
        e36.pages[0].list[v106To92] = { code: 123, indent: e36.pages[0].list[v106To92].indent, parameters: ["B", 0] };
    } else if (!(v106To92 < 0 && e36SelfB.length === 1)) {
        fail("Map045 E36 appearance writer is neither legacy V106=92 nor final self-switch B");
    }

    migrateCondition(e36.pages[1], 92, "B", "Map045 E36 disappearance page");
    const v106To100 = e36.pages[1].list.findIndex(command => command.code === 122 && same(command.parameters, [106, 106, 0, 0, 100]));
    const previousFinalScript = "for (const eventId of [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39]) $gameSelfSwitches.setValue([45, eventId, \"B\"], true); $gameSelfSwitches.setValue([45, 12, \"A\"], true); $gameSelfSwitches.setValue([45, 11, \"D\"], true); $gameSelfSwitches.setValue([45, 36, \"C\"], true);";
    const finalScript = "for (const eventId of [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39]) $gameSelfSwitches.setValue([45, eventId, \"B\"], true); $gameSelfSwitches.setValue([45, 12, \"B\"], true); $gameSelfSwitches.setValue([45, 11, \"D\"], true); $gameSelfSwitches.setValue([45, 36, \"C\"], true);";
    const previousFinalIndex = e36.pages[1].list.findIndex(command => command.code === 355 && command.parameters?.[0] === previousFinalScript);
    if (previousFinalIndex >= 0) e36.pages[1].list[previousFinalIndex].parameters[0] = finalScript;
    const finalScripts = e36.pages[1].list.filter(command => command.code === 355 && command.parameters?.[0] === finalScript);
    if (v106To100 >= 0 && finalScripts.length === 0) {
        e36.pages[1].list[v106To100] = { code: 355, indent: e36.pages[1].list[v106To100].indent, parameters: [finalScript] };
    } else if (!(v106To100 < 0 && finalScripts.length === 1)) {
        fail("Map045 E36 disappearance writer is neither legacy V106=100 nor final self-switch fanout");
    }

    migrateCondition(e36.pages[2], 100, "C", "Map045 E36 terminal page");
}

function updateMap049(map049) {
    const e1 = event(map049, 1, "VN - Casa Forjaprata: pesadelo e despertar");
    const list = e1.pages?.[0]?.list;
    if (!Array.isArray(list)) fail("Map049 E1 command list is missing");
    findExactly(list, command => plugin(command, "Coreto_QuestVN", "FinishVisualNovel"), "Map049 E1 FinishVisualNovel");

    const directWriter = list.findIndex(command => command.code === 122 && same(command.parameters, [106, 106, 0, 0, 91]));
    const legacySelfSwitch = list.findIndex(command => command.code === 655 &&
        command.parameters?.[0] === "$gameSelfSwitches.setValue([s.origin.mapId, s.origin.eventId, \"D\"], true);");
    const finalActivation = list.findIndex(command => command.code === 655 &&
        command.parameters?.[0]?.includes("[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]"));

    if (directWriter >= 0 && legacySelfSwitch >= 0 && finalActivation < 0) {
        list[legacySelfSwitch].parameters[0] = "for (const eventId of [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]) $gameSelfSwitches.setValue([45, eventId, \"A\"], true);";
        list.splice(directWriter, 1);
    } else if (!(directWriter < 0 && legacySelfSwitch < 0 && finalActivation >= 0)) {
        fail("Map049 E1 return staging is neither legacy nor final");
    }
}

function updateMapInfos(mapInfos) {
    const expected = [[46, "NV_Noite_da_Historia", "VN_Noite_da_Historia"], [49, "NV_Casa_Forjaprata", "VN_Casa_Forjaprata"]];
    for (const [id, legacy, final] of expected) {
        const entry = mapInfos[id];
        if (!entry || entry.id !== id) fail(`MapInfos semantic anchor ${id} is missing`);
        if (entry.name === legacy) entry.name = final;
        else if (entry.name !== final) fail(`MapInfos ${id} has unexpected name ${entry.name}`);
    }
}

function main() {
    const documents = Object.fromEntries(TARGETS.map(relative => [relative, readJson(relative)]));
    const map022 = documents["frontend/data/Map022.json"].value;
    const map045 = documents["frontend/data/Map045.json"].value;
    const map049 = documents["frontend/data/Map049.json"].value;
    const mapInfos = documents["frontend/data/MapInfos.json"].value;

    const beforeProtected = assertProtected(map045, map049, "before");
    updateMap022(map022);
    updateMap045(map045);
    updateMap049(map049);
    updateMapInfos(mapInfos);
    const afterProtected = assertProtected(map045, map049, "after");
    if (!same(beforeProtected, afterProtected)) fail("protected fingerprints changed during mutation");

    const pending = [];
    for (const document of Object.values(documents)) {
        const output = serialize(document);
        if (output !== document.raw) pending.push([document.absolute, output]);
    }
    for (const [absolute, output] of pending) fs.writeFileSync(absolute, output, "utf8");
    console.log(`PASS update-flow-state (${pending.length} file${pending.length === 1 ? "" : "s"} updated)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
    try {
        main();
    } catch (error) {
        console.error(`ERROR ${error.message}`);
        process.exitCode = 1;
    }
}
