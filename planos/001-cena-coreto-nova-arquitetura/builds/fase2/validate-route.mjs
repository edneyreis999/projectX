import fs from "node:fs";

const root = new URL("../../../../", import.meta.url);
const load = relative => JSON.parse(fs.readFileSync(new URL(relative, root), "utf8"));
const fail = message => { throw new Error(message); };
const hasCommand = (list, plugin, name) => list.some(item =>
    item.code === 357 && item.parameters[0] === plugin && item.parameters[1] === name
);
const sameParameters = (actual, expected) =>
    JSON.stringify(actual) === JSON.stringify(expected);

function isStartTransition(item) {
    return item.code === 357 &&
        item.parameters?.[0] === "Coreto_QuestCore" &&
        item.parameters?.[1] === "QuestTransition" &&
        item.parameters?.[3]?.questKey === "noite-da-historia" &&
        item.parameters?.[3]?.transitionId === "START";
}

function disablesPlayerMovement(item) {
    if (item.code !== 357 ||
            item.parameters?.[0] !== "VisuMZ_1_EventsMoveCore" ||
            item.parameters?.[1] !== "PlayerMovementChange") {
        return false;
    }
    const enabled = item.parameters?.[3]?.["Enable:eval"];
    return enabled === false || enabled === "false";
}

export function validateMap022EntryCorrection(map022) {
    const startEvent = map022.events[30];
    const startList = startEvent?.pages?.[0]?.list;
    if (!Array.isArray(startList)) fail("Map022 E30 START event mapping is invalid");

    const startIndexes = startList
        .map((item, index) => isStartTransition(item) ? index : -1)
        .filter(index => index >= 0);
    if (startIndexes.length !== 1) {
        fail(`Map022 E30 must contain exactly one noite-da-historia START transition; found ${startIndexes.length}`);
    }

    const guardIndexes = startList
        .map((item, index) => item.code === 111 && item.indent === 0 &&
            sameParameters(item.parameters, [1, 106, 0, 0, 0]) ? index : -1)
        .filter(index => index >= 0);
    if (guardIndexes.length !== 1) {
        fail(`Map022 E30 must contain exactly one V106 == 0 guard; found ${guardIndexes.length}`);
    }

    const startIndex = startIndexes[0];
    const guardIndex = guardIndexes[0];
    const branchEndIndex = startList.findIndex((item, index) =>
        index > guardIndex && item.code === 412 && item.indent === 0
    );
    const elseIndex = startList.findIndex((item, index) =>
        index > guardIndex && index < branchEndIndex && item.code === 411 && item.indent === 0
    );
    const trueBranchEndIndex = elseIndex >= 0 ? elseIndex : branchEndIndex;

    if (!(branchEndIndex > guardIndex &&
            startIndex > guardIndex && startIndex < trueBranchEndIndex &&
            startList[startIndex].indent === 1)) {
        fail("Map022 E30 START must be inside the true branch of the exact V106 == 0 guard");
    }

    const entryList = map022.events[18]?.pages?.[0]?.list;
    if (!Array.isArray(entryList)) fail("Map022 E18 EX/VN entry mapping is invalid");
    if (entryList.some(disablesPlayerMovement)) {
        fail("Map022 E18 must not disable movement outside Coreto_Cutscene ownership");
    }
}

const map022 = load("frontend/data/Map022.json");
const map045 = load("frontend/data/Map045.json");
const map046 = load("frontend/data/Map046.json");

validateMap022EntryCorrection(map022);

if (map022.note !== "<CoretoMapType:EX>" || map045.note !== "<CoretoMapType:EX>" || map046.note !== "<CoretoMapType:VN>") {
    fail("EX/VN map tags are not exact");
}

for (const [name, map] of [["Map022", map022], ["Map045", map045], ["Map046", map046]]) {
    for (const event of map.events.filter(Boolean)) {
        for (const page of event.pages) {
            if (page.list.some(item => item.code === 122 && item.parameters[0] === 106 && item.parameters[1] === 106)) {
                fail(`${name} event ${event.id} writes V106 directly`);
            }
        }
    }
}

const entry = map022.events[18].pages[0].list;
if (!hasCommand(entry, "Coreto_QuestVN", "EnterVisualNovel") || !hasCommand(entry, "Coreto_Cutscene", "BeginCutscene") || !hasCommand(entry, "Coreto_Cutscene", "FinishCutscene")) {
    fail("Map022 entry does not pair EX staging with EnterVisualNovel");
}

const vn = map046.events[1];
if (!vn || vn.x !== 8 || vn.y !== 6 || vn.pages.length !== 1) fail("Map046 event 1 mapping is invalid");
const vnList = vn.pages[0].list;
if (!hasCommand(vnList.slice(0, 1), "Coreto_QuestVN", "AssertVisualNovelSession") ||
        !hasCommand(vnList.slice(1, 2), "Coreto_QuestCore", "AssertQuestState")) {
    fail("VN assertions are not the first operations");
}
if (!hasCommand(vnList, "Coreto_QuestCore", "QuestTransition") || !hasCommand(vnList, "Coreto_QuestVN", "FinishVisualNovel") ||
        !vnList.some(item => item.code === 115) || vnList.some(item => item.code === 201)) {
    fail("VN terminal route is incomplete or contains a direct transfer");
}
const enters = vnList.filter(item => item.code === 357 && item.parameters[1] === "Basic_EnterBust").length;
const exits = vnList.filter(item => item.code === 357 && item.parameters[1] === "Basic_ExitBusts").length;
if (enters < 1 || exits < 1 || !vnList.some(item => item.code === 102) || !vnList.some(item => item.code === 303)) {
    fail("VN presentation, choices, Name Input, or cleanup is incomplete");
}

const outroPages = map022.events[17].pages
    .map((page, pageIndex) => ({ pageIndex, list: page.list }))
    .filter(({ list }) => list.some(item =>
        item.code === 357 &&
        item.parameters?.[0] === "Coreto_QuestCore" &&
        item.parameters?.[1] === "QuestTransition" &&
        item.parameters?.[3]?.questKey === "noite-da-historia" &&
        item.parameters?.[3]?.transitionId === "ARRIVE_MAP045"
    ));
if (outroPages.length !== 1) {
    fail(`Map022 E17 must contain exactly one ARRIVE_MAP045 page; found ${outroPages.length}`);
}

const outro = outroPages[0].list;
const beginIndex = outro.findIndex(item => item.code === 357 && item.parameters[0] === "Coreto_Cutscene" && item.parameters[1] === "BeginCutscene");
const transitionIndex = outro.findIndex(item =>
    item.code === 357 &&
    item.parameters?.[0] === "Coreto_QuestCore" &&
    item.parameters?.[1] === "QuestTransition" &&
    item.parameters?.[3]?.questKey === "noite-da-historia" &&
    item.parameters?.[3]?.transitionId === "ARRIVE_MAP045"
);
const finishIndex = outro.findIndex(item => item.code === 357 && item.parameters[0] === "Coreto_Cutscene" && item.parameters[1] === "FinishCutscene");
const transferIndex = outro.findIndex(item => item.code === 201 && item.parameters[1] === 45 && item.parameters[2] === 2 && item.parameters[3] === 4);
if (!(beginIndex >= 0 && beginIndex < transitionIndex && transitionIndex < finishIndex &&
        finishIndex < transferIndex && outro.filter(item => item.code === 201).length === 1)) {
    fail("Map022 E17 terminal page must pair cutscene and order transition -> finish -> one Map045 transfer");
}

const arrival = map045.events[11].pages[0];
if (!arrival.conditions.variableValid || arrival.conditions.variableId !== 106 || arrival.conditions.variableValue !== 90 ||
        !arrival.list.some(item => item.code === 122 && item.parameters[0] === 29 && item.parameters[1] === 29)) {
    fail("Map045 arrival does not gate on V106 while retaining V29 downstream setup");
}

console.log("route static validation passed");
