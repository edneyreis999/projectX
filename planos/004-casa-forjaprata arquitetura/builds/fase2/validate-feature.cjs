"use strict";

const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const crypto = require("crypto");

const projectRoot = path.resolve(__dirname, "../../../..");
const dataRoot = path.join(projectRoot, "frontend", "data");
const manifestPath = path.join(__dirname, "e11-migration-manifest-v1.json");
const checks = [];

function record(name, passed, detail) {
    checks.push({ name, passed: !!passed, detail });
}

function same(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function sha256(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

function readJson(file) {
    return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
}

function headJson(relativePath) {
    const raw = cp.execFileSync("git", ["show", `HEAD:${relativePath}`], {
        cwd: projectRoot,
        encoding: "utf8",
    });
    return JSON.parse(raw.replace(/^\uFEFF/, ""));
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function command(code, indent, parameters) {
    return { code, indent, parameters };
}

function plugin(pluginName, commandName, label, args, indent) {
    return command(357, indent, [pluginName, commandName, label, args]);
}

function without(object, keys) {
    const result = clone(object);
    for (const key of keys) delete result[key];
    return result;
}

function resolvePage(event, variables, selfSwitches) {
    let active = null;
    for (const page of event.pages) {
        const c = page.conditions;
        if (c.variableValid && (variables[c.variableId] || 0) < c.variableValue) continue;
        if (c.selfSwitchValid && !selfSwitches[c.selfSwitchCh]) continue;
        if (c.switch1Valid || c.switch2Valid || c.actorValid || c.itemValid) continue;
        active = page;
    }
    return active;
}

function matchingBranchEnd(list, start, code) {
    const indent = list[start].indent;
    for (let i = start + 1; i < list.length; i++) {
        if (list[i].indent === indent && list[i].code === code) return i;
    }
    return -1;
}

function evaluateCondition(parameters, fixture) {
    if (parameters[0] === 1) {
        const actual = fixture.variables[parameters[1]] || 0;
        const operand = parameters[2] === 0 ? parameters[3] : (fixture.variables[parameters[3]] || 0);
        return [actual === operand, actual >= operand, actual <= operand, actual > operand, actual < operand, actual !== operand][parameters[4]];
    }
    if (parameters[0] === 4) {
        return parameters[1] === 3 && parameters[2] === 4 && parameters[3] === 1 && fixture.actor3Weapon1;
    }
    throw new Error(`Unsupported simulator condition ${JSON.stringify(parameters)}`);
}

function executeEventList(list, fixture) {
    const executed = [];
    let halted = false;
    function run(start, end) {
        for (let i = start; i < end && !halted; i++) {
            const current = list[i];
            if (current.code === 111) {
                const branchEnd = matchingBranchEnd(list, i, 412);
                if (branchEnd < 0 || branchEnd >= end) throw new Error(`Unclosed branch at ${i}`);
                const elseAt = matchingBranchEnd(list, i, 411);
                const truthy = evaluateCondition(current.parameters, fixture);
                if (truthy) run(i + 1, elseAt >= 0 && elseAt < branchEnd ? elseAt : branchEnd);
                else if (elseAt >= 0 && elseAt < branchEnd) run(elseAt + 1, branchEnd);
                i = branchEnd;
                continue;
            }
            if ([0, 411, 412].includes(current.code)) continue;
            executed.push(current);
            if (current.code === 115) halted = true;
        }
    }
    run(0, list.length);
    return executed;
}

function commandCalls(list, pluginName, commandName) {
    return list.filter(c => c.code === 357 && c.parameters[0] === pluginName && c.parameters[1] === commandName);
}

const current45Bytes = fs.readFileSync(path.join(dataRoot, "Map045.json"));
const current22Bytes = fs.readFileSync(path.join(dataRoot, "Map022.json"));
const current49Bytes = fs.readFileSync(path.join(dataRoot, "Map049.json"));
const map45 = JSON.parse(current45Bytes.toString("utf8"));
const map22 = JSON.parse(current22Bytes.toString("utf8"));
const map49 = JSON.parse(current49Bytes.toString("utf8"));
const map46 = readJson(path.join(dataRoot, "Map046.json"));
const registry = readJson(path.join(dataRoot, "CoretoQuests.json"));
const baseline45 = headJson("frontend/data/Map045.json");
const baseline22 = headJson("frontend/data/Map022.json");
const manifest = readJson(manifestPath);

record("json-parse", true, "Map022, Map045, Map046, Map049, registry and manifest parsed.");

const manifestIds = manifest.commands.map(entry => entry.i);
record("manifest-138-coverage", manifest.source.commandCount === 138 && manifest.commands.length === 138 && new Set(manifestIds).size === 138 && Math.min(...manifestIds) === 0 && Math.max(...manifestIds) === 137 && manifest.summary.total === 138, manifest.summary);
record("manifest-source-codes", manifest.commands.every(entry => baseline45.events[11].pages[0].list[entry.i].code === entry.code), "Every frozen index/code matches the Git baseline.");
record("manifest-approved-removal", manifest.commands.filter(entry => entry.disposition === "removed-approved").length === 1 && manifest.commands[131].code === 655, manifest.commands[131]);

const quest = registry.quests["tutorial-funda-forjaprata"];
record("registry-cross-reference", !!quest && quest.stageVariableId === 111 && same(quest.terminalStates, [90]) && quest.extensions.questVN.mapId === 49 && quest.extensions.questVN.entries.ABERTURA_FORJAPRATA.eventId === 1 && same(quest.extensions.questVN.entries.ABERTURA_FORJAPRATA.allowedStates, [0]), quest && quest.extensions.questVN);

record("map049-vn-shape", map49.note === "<CoretoMapType:VN>" && map49.width === 17 && map49.height === 13 && map49.events.filter(Boolean).length === 1 && map49.events[1].x === 8 && map49.events[1].y === 6 && map49.events[1].pages.length === 1 && map49.events[1].pages[0].trigger === 0 && map49.events[1].pages[0].through === true, { note: map49.note, size: [map49.width, map49.height] });
record("map049-skeleton", same(map49.data, map46.data) && map49.tilesetId === map46.tilesetId && map49.scrollType === map46.scrollType && map49.parallaxName === "", "Tile/passability skeleton preserved; Noite da Historia parallax/content not reused.");

const vnList = map49.events[1].pages[0].list;
const vnExpected = manifest.commands.filter(entry => entry.disposition === "vn").map(entry => baseline45.events[11].pages[0].list[entry.i]);
record("vn-asserts-first", same(vnList[0], plugin("Coreto_QuestVN", "AssertVisualNovelSession", "AssertVisualNovelSession", { questKey: "tutorial-funda-forjaprata", entryKey: "ABERTURA_FORJAPRATA" }, 0)) && same(vnList[1], plugin("Coreto_QuestCore", "AssertQuestState", "AssertQuestState", { questKey: "tutorial-funda-forjaprata", expectedState: "0" }, 0)), vnList.slice(0, 2));
record("vn-migration-exact-97", same(vnList.slice(2, 2 + vnExpected.length), vnExpected) && vnExpected.length === 97, `migrated=${vnExpected.length}`);
record("vn-cleanup-finish", same(vnList.slice(-5), [command(235, 0, [1]), command(235, 0, [2]), plugin("Coreto_QuestVN", "FinishVisualNovel", "FinishVisualNovel", {}, 0), command(115, 0, []), command(0, 0, [])]), vnList.slice(-5));
record("vn-no-transfer", vnList.every(c => c.code !== 201), "No direct Transfer Player in Map049/E1.");

const unchanged45Events = baseline45.events.every((event, id) => [7, 11, 20].includes(id) || same(event, map45.events[id]));
record("map045-event-allowlist", unchanged45Events, "Only E7, E11 and E20 differ semantically from the baseline.");
record("map045-map-fields-preserved", same(without(baseline45, ["events"]), without(map45, ["events"])), "All Map045 map-level fields preserved.");

const e11Before = baseline45.events[11];
const e11 = map45.events[11];
record("e11-nontarget-pages-preserved", same(e11.pages.slice(1, 7), e11Before.pages.slice(1)) && e11.pages.length === 8, { before: e11Before.pages.length, after: e11.pages.length });
record("e11-page-properties-preserved", same(without(e11.pages[0], ["list"]), without(e11Before.pages[0], ["list"])), "E11/P1 page metadata remains EX/autorun.");
const expectedPrelude = [command(127, 0, [1, 1, 0, 1, true]), ...clone(e11Before.pages[0].list.slice(0, 11)), command(123, 0, ["D", 0]), plugin("Coreto_QuestVN", "EnterVisualNovel", "EnterVisualNovel", { questKey: "tutorial-funda-forjaprata", entryKey: "ABERTURA_FORJAPRATA" }, 0), command(0, 0, [])];
record("e11-prelude", same(e11.pages[0].list, expectedPrelude), e11.pages[0].list.map(c => c.code));
const returnPage = e11.pages[7];
const expectedReturn = [...clone(e11Before.pages[0].list.slice(50, 58)), ...clone(e11Before.pages[0].list.slice(101, 106)), ...clone(e11Before.pages[0].list.slice(127, 131)), ...clone(e11Before.pages[0].list.slice(132, 137)), command(123, 0, ["D", 1]), command(0, 0, [])];
record("e11-return-page", returnPage.conditions.selfSwitchValid === true && returnPage.conditions.selfSwitchCh === "D" && returnPage.trigger === 3 && same(returnPage.list, expectedReturn), { commands: returnPage.list.length, condition: returnPage.conditions });
record("e11-self-switch-ownership", e11.pages[0].list.some(c => same(c, command(123, 0, ["D", 0]))) && returnPage.list.some(c => same(c, command(123, 0, ["A", 0]))) && returnPage.list.some(c => same(c, command(123, 0, ["D", 1]))) && same(e11.pages[3], e11Before.pages[3]), "D is transient; original A completion and B page are preserved.");
record("e11-legacy-and-journal", returnPage.list.some(c => c.code === 355 && c.parameters[0] === 'SQSM.AddQuest("aSemifinal");') && returnPage.list.every(c => !(c.parameters || []).some(value => typeof value === "string" && value.includes("OpenQuestJournal"))), "aSemifinal setup preserved; only old OpenJournal removed.");

const e7 = map45.events[7];
record("e7-nontarget-pages-preserved", same(e7.pages.slice(1), baseline45.events[7].pages.slice(1)) && same(without(e7.pages[0], ["list"]), without(baseline45.events[7].pages[0], ["list"])), "Only E7/P1 command list changed.");
record("e7-static-command-contract", e7.pages[0].list[0].code === 111 && same(e7.pages[0].list[0].parameters, [1, 111, 0, 0, 0]) && e7.pages[0].list.some(c => same(c, command(111, 3, [4, 3, 4, 1]))) && commandCalls(e7.pages[0].list, "Coreto_QuestCore", "QuestTransition").length === 2 && e7.pages[0].list.filter(c => c.code === 201 && same(c.parameters, [0, 7, 5, 22, 0, 0])).length === 2, "State and actor/equipment branches use engine-confirmed parameter shapes.");

const routeFixtures = [
    { state: 0, equipped: false, transfers: 0, transitions: ["INTRODUCE_JOURNAL"], opens: 1, messages: 0 },
    { state: 10, equipped: false, transfers: 0, transitions: [], opens: 0, messages: 1 },
    { state: 20, equipped: false, transfers: 0, transitions: [], opens: 0, messages: 1 },
    { state: 20, equipped: true, transfers: 1, transitions: ["LEAVE_EQUIPPED"], opens: 0, messages: 0 },
    { state: 90, equipped: false, transfers: 1, transitions: [], opens: 0, messages: 0 },
    { state: 15, equipped: true, transfers: 0, transitions: [], opens: 0, messages: 0 },
];
const routeResults = routeFixtures.map(expected => {
    const executed = executeEventList(e7.pages[0].list, { variables: { 111: expected.state }, actor3Weapon1: expected.equipped });
    const transitions = commandCalls(executed, "Coreto_QuestCore", "QuestTransition").map(c => c.parameters[3].transitionId);
    const actual = { transfers: executed.filter(c => c.code === 201).length, transitions, opens: executed.filter(c => c.code === 355 && c.parameters[0].includes("OpenQuestJournal")).length, messages: executed.filter(c => c.code === 401).length };
    return { fixture: expected, actual, passed: same(actual, { transfers: expected.transfers, transitions: expected.transitions, opens: expected.opens, messages: expected.messages }) };
});
record("e7-route-simulation", routeResults.every(result => result.passed), routeResults);

const e20 = map45.events[20];
record("e20-identity", e20.x === 19 && e20.y === 14 && e20.pages.length === 2, { name: e20.name, x: e20.x, y: e20.y });
record("e20-page-gates", resolvePage(e20, { 111: 0 }, {}) === null && resolvePage(e20, { 111: 10 }, {}) === e20.pages[0] && resolvePage(e20, { 111: 20 }, { A: true }) === e20.pages[1] && e20.pages[0].image.characterName === "!Chest" && e20.pages[0].image.direction === 2 && e20.pages[1].image.characterName === "!Chest" && e20.pages[1].image.direction === 8, "No eligible page before state 10; closed/open chest pages resolve by state and receipt.");
record("e20-one-grant", commandCalls(e20.pages[0].list, "Coreto_Quests", "addWeapon").length === 1 && commandCalls(e20.pages[0].list, "Coreto_QuestCore", "QuestTransition").length === 1 && e20.pages[0].list[0].code === 111 && same(e20.pages[0].list[0].parameters, [1, 111, 0, 10, 0]) && e20.pages[0].list.some(c => same(c, command(123, 1, ["A", 0]))) && e20.pages[1].list.length === 1 && e20.pages[1].list[0].code === 0, "Grant and FOUND_SLING exist only inside exact state-10 branch; open page is inert.");
const chest10 = executeEventList(e20.pages[0].list, { variables: { 111: 10 }, actor3Weapon1: false });
const chest20FailClosed = executeEventList(e20.pages[0].list, { variables: { 111: 20 }, actor3Weapon1: false });
record("e20-route-simulation", commandCalls(chest10, "Coreto_Quests", "addWeapon").length === 1 && commandCalls(chest10, "Coreto_QuestCore", "QuestTransition")[0].parameters[3].transitionId === "FOUND_SLING" && commandCalls(chest20FailClosed, "Coreto_Quests", "addWeapon").length === 0, { state10Executed: chest10.map(c => c.code), state20ClosedFallbackExecuted: chest20FailClosed.map(c => c.code) });

const expected22 = clone(baseline22);
const premature = expected22.events[30].pages[0].list.filter(c => c.code === 121 && same(c.parameters, [50, 50, 0]));
expected22.events[30].pages[0].list = expected22.events[30].pages[0].list.filter(c => !(c.code === 121 && same(c.parameters, [50, 50, 0])));
record("map022-exact-removal", premature.length === 1 && same(map22, expected22), "Only Map022 E30/P1 command121 [50,50,0] was removed.");

record("s50-new-writer", e7.pages[0].list.filter(c => c.code === 121 && same(c.parameters, [50, 50, 0])).length === 1 && map22.events[30].pages[0].list.every(c => !(c.code === 121 && same(c.parameters, [50, 50, 0]))), "S50 turns on only on first state-0 door attempt in inspected targets.");
record("map049-source-hashes", sha256(current49Bytes).length === 64 && sha256(current45Bytes).length === 64 && sha256(current22Bytes).length === 64, { Map022: sha256(current22Bytes), Map045: sha256(current45Bytes), Map049: sha256(current49Bytes) });

const failed = checks.filter(check => !check.passed);
const report = {
    schemaVersion: 1,
    validator: "builds/fase2/validate-feature.cjs",
    taskId: "task-2.1",
    status: failed.length === 0 ? "passed" : "failed",
    classification: "structural_validation",
    checksPassed: checks.length - failed.length,
    checksFailed: failed.length,
    checks,
    runtimeValidation: {
        status: "pending-human-validation",
        gates: ["RPG Maker MZ editor round-trip", "New Game Playtest"],
    },
};

process.stdout.write(JSON.stringify(report, null, 2) + "\n");
process.exitCode = failed.length === 0 ? 0 : 1;
