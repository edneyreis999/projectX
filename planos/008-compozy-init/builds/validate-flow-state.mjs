import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { PROTECTED_BASELINE, protectedFingerprints } from "./update-flow-state.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const buildsRoot = path.dirname(scriptPath);
const repoRoot = path.resolve(buildsRoot, "../../..");
const dataRoot = path.join(repoRoot, "frontend/data");
const FORBIDDEN_STATES = new Set([91, 92, 100, 110]);
const TEST_IDS = ["UT-001", "UT-002", "UT-003", "UT-004", "IT-001", "IT-002", "IT-003"];
const PRODUCTION_TARGETS = [
    "frontend/data/Map022.json",
    "frontend/data/Map045.json",
    "frontend/data/Map049.json",
    "frontend/data/MapInfos.json"
];
const FINAL_PRODUCTION_HASHES = Object.freeze({
    "frontend/data/Map022.json": "6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb",
    "frontend/data/Map045.json": "18ebfc2f86a603fe363568a077be9cf8d5044290f45ed757fda19b7707177e85",
    "frontend/data/Map049.json": "33f44fa75740c87b91339c679e3fa5b02bbb44cce2a125f785ad28ae4c0ac238",
    "frontend/data/MapInfos.json": "5d69b1eb32b00b55f1f5f4587578d04460690a748f57acd7bcbf5c1f438d68d1"
});
const EVIDENCE_TARGETS = [
    "frontend/data/CoretoQuests.json",
    "frontend/data/System.json",
    "frontend/data/MapInfos.json",
    "frontend/data/Map022.json",
    "frontend/data/Map045.json",
    "frontend/data/Map046.json",
    "frontend/data/Map049.json",
    "frontend/js/plugins/Coreto_QuestCore.js",
    "frontend/js/plugins/Coreto_QuestVN.js",
    "frontend/js/plugins/Coreto_Cutscene.js"
];

class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const fail = (code, message) => { throw new ValidationError(code, message); };
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const clone = value => JSON.parse(JSON.stringify(value));
const shaText = text => crypto.createHash("sha256").update(text).digest("hex");
const shaValue = value => shaText(JSON.stringify(value));
const relative = absolute => path.relative(repoRoot, absolute).split(path.sep).join("/");

function readText(repoRelative) {
    return fs.readFileSync(path.join(repoRoot, repoRelative), "utf8").replace(/^\uFEFF/, "");
}

function loadJson(repoRelative) {
    try {
        return JSON.parse(readText(repoRelative));
    } catch (error) {
        fail("json_parse_failed", `${repoRelative}: ${error.message}`);
    }
}

function loadHeadJson(repoRelative) {
    try {
        const source = execFileSync("git", ["show", `HEAD:${repoRelative}`], { cwd: repoRoot, encoding: "utf8" });
        return JSON.parse(source.replace(/^\uFEFF/, ""));
    } catch (error) {
        fail("restricted_diff_unavailable", `cannot read HEAD baseline for ${repoRelative}: ${error.message}`);
    }
}

function parseArguments(argv) {
    if (argv.length !== 2 || argv[0] !== "--output" || !argv[1]) {
        fail("validation_output_required", "pass --output under planos/008-compozy-init/builds/");
    }
    const output = path.resolve(repoRoot, argv[1]);
    const allowedPrefix = `${buildsRoot}${path.sep}`;
    if (!output.startsWith(allowedPrefix) || path.extname(output) !== ".json") {
        fail("validation_output_outside_active_plan", "output must remain under planos/008-compozy-init/builds/");
    }
    return output;
}

function plugin(command, pluginName, commandName) {
    return command?.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName;
}

function pluginCommands(page, pluginName, commandName) {
    return page.list.filter(command => plugin(command, pluginName, commandName));
}

function selfCondition(page, letter) {
    return page.conditions.selfSwitchValid === true && page.conditions.selfSwitchCh === letter &&
        page.conditions.variableValid === false;
}

function variableCondition(page, id, value) {
    return page.conditions.variableValid === true && page.conditions.variableId === id &&
        page.conditions.variableValue === value;
}

function event(map, id, name) {
    const found = map.events?.[id];
    if (!found || found.id !== id || found.name !== name) {
        fail("semantic_anchor_missing", `E${id} (${name}) is missing`);
    }
    return found;
}

function commandIndex(page, predicate, description) {
    const indexes = page.list.map((command, index) => predicate(command) ? index : -1).filter(index => index >= 0);
    if (indexes.length !== 1) fail("semantic_anchor_ambiguous", `${description}: expected one, found ${indexes.length}`);
    return indexes[0];
}

function commandTree(value, visitor, locator = "$") {
    if (Array.isArray(value)) {
        value.forEach((child, index) => commandTree(child, visitor, `${locator}[${index}]`));
    } else if (value && typeof value === "object") {
        if (typeof value.code === "number" && Array.isArray(value.parameters)) visitor(value, locator);
        Object.entries(value).forEach(([key, child]) => commandTree(child, visitor, `${locator}.${key}`));
    }
}

function validatePageV106(page, locator) {
    if (page?.conditions?.variableValid && page.conditions.variableId === 106 &&
            FORBIDDEN_STATES.has(page.conditions.variableValue)) {
        fail("v106_noncanonical_state", `${locator} reads forbidden V106=${page.conditions.variableValue}`);
    }
    commandTree(page?.list ?? [], (command, commandLocator) => {
        if (command.code === 122 && command.parameters[0] <= 106 && command.parameters[1] >= 106) {
            fail("v106_noncanonical_state", `${locator}${commandLocator} writes V106 directly`);
        }
        if (command.code === 111 && command.parameters[0] === 1 && command.parameters[1] === 106 &&
                FORBIDDEN_STATES.has(command.parameters[3])) {
            fail("v106_noncanonical_state", `${locator}${commandLocator} branches on forbidden V106=${command.parameters[3]}`);
        }
        if ((command.code === 355 || command.code === 655) &&
                /\$gameVariables\s*\.\s*setValue\s*\(\s*106\b/.test(String(command.parameters[0] ?? ""))) {
            fail("v106_noncanonical_state", `${locator}${commandLocator} writes V106 from an event script`);
        }
    });
}

function collectDataFiles() {
    return fs.readdirSync(dataRoot).filter(name => /^(Map\d+|CommonEvents|Troops)\.json$/.test(name)).sort();
}

function scanCanonicalV106() {
    let pages = 0;
    for (const file of collectDataFiles()) {
        const data = loadJson(`frontend/data/${file}`);
        if (file.startsWith("Map")) {
            for (const item of data.events?.filter(Boolean) ?? []) {
                item.pages.forEach((page, index) => {
                    pages += 1;
                    validatePageV106(page, `${file}:E${item.id}:P${index + 1}`);
                });
            }
        } else {
            commandTree(data, (command, locator) => {
                if (command.code === 122 && command.parameters[0] <= 106 && command.parameters[1] >= 106) {
                    fail("v106_noncanonical_state", `${file}${locator} writes V106 directly`);
                }
                if (command.code === 111 && command.parameters[0] === 1 && command.parameters[1] === 106 &&
                        FORBIDDEN_STATES.has(command.parameters[3])) {
                    fail("v106_noncanonical_state", `${file}${locator} reads forbidden V106=${command.parameters[3]}`);
                }
                if ((command.code === 355 || command.code === 655) &&
                        /\$gameVariables\s*\.\s*setValue\s*\(\s*106\b/.test(String(command.parameters[0] ?? ""))) {
                    fail("v106_noncanonical_state", `${file}${locator} writes V106 from an event script`);
                }
            });
        }
    }
    return { files: collectDataFiles().length, pages };
}

function validateRegistry(registry, system) {
    const quest = registry?.quests?.["noite-da-historia"];
    if (registry?.schemaVersion !== 1 || !quest) fail("canonical_registry_invalid", "noite-da-historia registry is missing");
    if (quest.stageVariableId !== 106 || system?.variables?.[106] !== "v_qNoiteDaHistoria_stage") {
        fail("canonical_registry_invalid", "noite-da-historia must own named V106");
    }
    const expected = {
        START: { from: [0], to: 10 },
        COMPLETE_VN: { from: [10], to: 20 },
        ARRIVE_MAP045: { from: [20], to: 90 }
    };
    const states = new Set([quest.initialState, ...(quest.terminalStates ?? [])]);
    if (!same(Object.keys(quest.transitions).sort(), Object.keys(expected).sort())) {
        fail("canonical_registry_invalid", "transition IDs are not exact");
    }
    for (const [id, edge] of Object.entries(expected)) {
        const transition = quest.transitions[id];
        if (!transition || !same(transition.from, edge.from) || transition.to !== edge.to) {
            fail("canonical_registry_invalid", `${id} transition drifted`);
        }
        transition.from.forEach(state => states.add(state));
        states.add(transition.to);
    }
    const sortedStates = [...states].sort((a, b) => a - b);
    if (!same(sortedStates, [0, 10, 20, 90]) || quest.initialState !== 0 || !same(quest.terminalStates, [90])) {
        fail("canonical_registry_invalid", `canonical states are ${JSON.stringify(sortedStates)}`);
    }
    const entry = quest.extensions?.questVN?.entries?.CENA_PRINCIPAL;
    if (quest.extensions?.questVN?.mapId !== 46 || entry?.eventId !== 1 || !same(entry.allowedStates, [10])) {
        fail("canonical_registry_invalid", "CENA_PRINCIPAL registry entry drifted");
    }
    return { stage_variable_id: 106, states: sortedStates, transitions: Object.keys(expected) };
}

function pageEligible(page, canonicalState, selfSwitches, eventId) {
    const conditions = page.conditions;
    if (conditions.variableValid && (conditions.variableId !== 106 || canonicalState < conditions.variableValue)) return false;
    if (conditions.selfSwitchValid && !selfSwitches.has(`${eventId}:${conditions.selfSwitchCh}`)) return false;
    return true;
}

function selectedPage(eventData, canonicalState, selfSwitches = new Set()) {
    let selected = null;
    eventData.pages.forEach((page, index) => {
        if (pageEligible(page, canonicalState, selfSwitches, eventData.id)) selected = { page, index };
    });
    return selected;
}

function requireNonAutorunTerminal(selection, description) {
    if (!selection || selection.page.trigger === 3 ||
            pluginCommands(selection.page, "Coreto_QuestVN", "EnterVisualNovel").length > 0 ||
            pluginCommands(selection.page, "Coreto_QuestCore", "AssertQuestState").length > 0) {
        fail("terminal_page_precedence_invalid", `${description} does not resolve to a safe terminal page`);
    }
}

function validateLifecyclePage(page, description) {
    const begin = pluginCommands(page, "Coreto_Cutscene", "BeginCutscene");
    const finish = pluginCommands(page, "Coreto_Cutscene", "FinishCutscene");
    if (begin.length !== finish.length || begin.length > 1) {
        fail("lifecycle_pair_invalid", `${description} has Begin/Finish ${begin.length}/${finish.length}`);
    }
    if (begin.length === 1) {
        const beginIndex = page.list.indexOf(begin[0]);
        const finishIndex = page.list.indexOf(finish[0]);
        if (beginIndex >= finishIndex) fail("lifecycle_pair_invalid", `${description} finishes before it begins`);
        const enterIndex = page.list.findIndex(command => plugin(command, "Coreto_QuestVN", "EnterVisualNovel"));
        if (enterIndex >= 0 && finishIndex >= enterIndex) {
            fail("lifecycle_pair_invalid", `${description} retains cutscene lock across VN entry`);
        }
    }
}

function validateFlowTopology({ map022, map045, map046, map049 }) {
    const e17 = event(map022, 17, "EX — Rheed: saída para Map045");
    const e18 = event(map022, 18, "EX — Noite da História: posição");
    const e11 = event(map045, 11, "EX - Melia: pesadelos e estados");
    const e36 = event(map045, 36, "EX — Rheed: saída para Map045");
    const vn46 = event(map046, 1, "VN — Noite da História: diálogo principal");
    const vn49 = event(map049, 1, "VN - Casa Forjaprata: pesadelo e despertar");

    if (e18.pages.length !== 2 || !variableCondition(e18.pages[0], 106, 10) ||
            !variableCondition(e18.pages[1], 106, 20) || e18.pages[1].trigger === 3) {
        fail("terminal_page_precedence_invalid", "Map022 E18 exact-state entry/terminal pages drifted");
    }
    if (pluginCommands(e18.pages[0], "Coreto_QuestVN", "EnterVisualNovel").length !== 1) {
        fail("lifecycle_pair_invalid", "Map022 E18 must enter CENA_PRINCIPAL once");
    }
    requireNonAutorunTerminal(selectedPage(e18, 20), "Map022 E18 at V106=20");
    requireNonAutorunTerminal(selectedPage(e18, 90), "Map022 E18 at V106=90");
    requireNonAutorunTerminal(selectedPage(e17, 90), "Map022 E17 at V106=90");

    if (!selfCondition(e11.pages[1], "A") || !selfCondition(e11.pages[2], "D") ||
            !selfCondition(e11.pages[3], "B") || e11.pages[1].trigger === 3 || e11.pages[3].trigger === 3) {
        fail("terminal_page_precedence_invalid", "Map045 E11 A/D/B page order drifted");
    }
    const selfAIndex = commandIndex(e11.pages[0], command => command.code === 123 && same(command.parameters, ["A", 0]), "Map045 E11 self A");
    const enter49Index = commandIndex(e11.pages[0], command => plugin(command, "Coreto_QuestVN", "EnterVisualNovel") &&
        command.parameters?.[3]?.entryKey === "ABERTURA_FORJAPRATA", "Map045 E11 opening VN entry");
    if (selfAIndex >= enter49Index) fail("terminal_page_precedence_invalid", "Map045 E11 must arm terminal A before VN entry");

    if (!selfCondition(e36.pages[0], "A") || !selfCondition(e36.pages[1], "B") ||
            !selfCondition(e36.pages[2], "C") || !same(e36.pages.map(page => page.trigger), [3, 3, 0])) {
        fail("terminal_page_precedence_invalid", "Map045 E36 A/B/C one-shot order drifted");
    }
    for (let id = 21; id <= 39; id += 1) {
        if (id === 36) continue;
        const child = event(map045, id, "Crianca");
        if (!selfCondition(child.pages[0], "A") || !selfCondition(child.pages[1], "B")) {
            fail("terminal_page_precedence_invalid", `Map045 E${id} local A/B staging drifted`);
        }
    }
    if (!selfCondition(event(map045, 12, "Sáparo").pages[1], "B")) {
        fail("terminal_page_precedence_invalid", "Map045 E12 post-opening local state drifted");
    }
    const returnSource = vn49.pages[0].list.map(command => command.parameters?.[0]).filter(value => typeof value === "string").join("\n");
    if (!returnSource.includes("[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]") ||
            returnSource.includes("s.origin.eventId, \"D\"") || pluginCommands(vn49.pages[0], "Coreto_QuestVN", "FinishVisualNovel").length !== 1) {
        fail("terminal_page_precedence_invalid", "Map049 E1 does not arm the local opening sequence exactly once");
    }
    const e36FinishSource = e36.pages[1].list.map(command => command.parameters?.[0]).filter(value => typeof value === "string").join("\n");
    for (const token of ["[45, 12, \"B\"]", "[45, 11, \"D\"]", "[45, 36, \"C\"]"]) {
        if (!e36FinishSource.includes(token)) fail("terminal_page_precedence_invalid", `Map045 E36 missing fanout ${token}`);
    }

    for (const [description, page] of [
        ["Map022 E18", e18.pages[0]], ["Map022 E17", e17.pages[1]],
        ["Map045 E11 opening", e11.pages[0]], ["Map045 E11 return", e11.pages[2]],
        ["Map045 E11 future VN", e11.pages[4]], ["Map045 E11 future return", e11.pages[5]]
    ]) validateLifecyclePage(page, description);
    for (const [description, page] of [["Map046 E1", vn46.pages[0]], ["Map049 E1", vn49.pages[0]], ["Map049 E2", event(map049, 2, "VN - Casa Forjaprata: segundo pesadelo e despertar").pages[0]]]) {
        if (pluginCommands(page, "Coreto_QuestVN", "FinishVisualNovel").length !== 1) {
            fail("lifecycle_pair_invalid", `${description} must finish one VN session`);
        }
    }
    return { map022_terminal_pages: { E17: 3, E18: 2 }, map045_local_state: "E11:A/D/B,E36:A/B/C,children:A/B,E12:B" };
}

function normalizeRestricted(relativePath, value, head) {
    const normalized = clone(value);
    if (relativePath === "frontend/data/Map022.json") {
        normalized.events[17] = head.events[17];
        normalized.events[18] = head.events[18];
    } else if (relativePath === "frontend/data/Map045.json") {
        normalized.events[11].pages.splice(0, 4, ...head.events[11].pages.slice(0, 4));
        normalized.events[12].pages[1] = head.events[12].pages[1];
        for (let id = 21; id <= 39; id += 1) {
            if (id === 36) continue;
            normalized.events[id].pages[0].conditions = head.events[id].pages[0].conditions;
            normalized.events[id].pages[1].conditions = head.events[id].pages[1].conditions;
        }
        normalized.events[36] = head.events[36];
    } else if (relativePath === "frontend/data/Map049.json") {
        normalized.events[1] = head.events[1];
    } else if (relativePath === "frontend/data/MapInfos.json") {
        normalized[46].name = head[46].name;
        normalized[49].name = head[49].name;
    }
    return normalized;
}

function validateRestrictedDiff(current) {
    const changed = execFileSync("git", ["diff", "--name-only", "--", "frontend"], { cwd: repoRoot, encoding: "utf8" })
        .trim().split("\n").filter(Boolean);
    const unexpected = changed.filter(name => !PRODUCTION_TARGETS.includes(name));
    if (unexpected.length) fail("restricted_diff_violation", `unexpected production changes: ${unexpected.join(", ")}`);
    for (const target of PRODUCTION_TARGETS) {
        const actual = shaText(fs.readFileSync(path.join(repoRoot, target)));
        if (actual !== FINAL_PRODUCTION_HASHES[target]) {
            fail("restricted_diff_violation", `${target} does not match the reconciled Task 01-03 production hash (${actual})`);
        }
    }
    for (const unchanged of ["frontend/data/CoretoQuests.json", "frontend/data/System.json", "frontend/data/Map046.json"]) {
        if (!same(loadJson(unchanged), loadHeadJson(unchanged))) {
            fail("restricted_diff_violation", `${unchanged} must remain unchanged`);
        }
    }
    return { changed_production_files: changed, final_production_hashes: FINAL_PRODUCTION_HASHES };
}

function validateNaming(mapInfos, headMapInfos) {
    if (mapInfos[46]?.name !== "VN_Noite_da_Historia" || mapInfos[49]?.name !== "VN_Casa_Forjaprata") {
        fail("map_name_boundary_invalid", "Map046/049 VN names are not exact");
    }
    const currentOther = mapInfos.map((entry, id) => id === 46 || id === 49 ? null : entry);
    const headOther = headMapInfos.map((entry, id) => id === 46 || id === 49 ? null : entry);
    if (!same(currentOther, headOther) || headMapInfos[46]?.name !== "NV_Noite_da_Historia" ||
            headMapInfos[49]?.name !== "NV_Casa_Forjaprata") {
        fail("map_name_boundary_invalid", "a legacy reference map changed or the two-entry baseline drifted");
    }
    return { renamed: { 46: mapInfos[46].name, 49: mapInfos[49].name }, other_entries_hash: shaValue(currentOther) };
}

function validateProtected(map045, map049) {
    const normalized = clone(map045);
    for (const page of normalized.events[12].pages.slice(2)) {
        for (const command of page.list) {
            const audio = command.parameters?.[0];
            if (command.code === 241 && audio?.name === "Theme5" && audio.volume === 35 &&
                    audio.pitch === 100 && audio.pan === 0) audio.name = "Dungeon5";
        }
    }
    const after = protectedFingerprints(normalized, map049);
    for (const [surface, before] of Object.entries(PROTECTED_BASELINE)) {
        if (after[surface] !== before) fail("future_quest_scope_violation", `${surface} changed (${after[surface]})`);
    }
    return Object.fromEntries(Object.keys(PROTECTED_BASELINE).map(surface => [surface, { before: PROTECTED_BASELINE[surface], after: after[surface] }]));
}

function validateNegativeFixtures() {
    const negativeV106 = loadJson("planos/008-compozy-init/builds/fixtures/flow-state-negative-v106.json");
    let v106Rejected = false;
    try {
        validatePageV106(negativeV106.page, "negative-v106");
    } catch (error) {
        v106Rejected = error instanceof ValidationError && error.code === negativeV106.expected_error;
    }
    if (!v106Rejected) fail("negative_fixture_failed", "forbidden V106 fixture was not rejected");

    const terminal = loadJson("planos/008-compozy-init/builds/fixtures/flow-state-negative-terminal.json");
    let terminalRejected = false;
    try {
        requireNonAutorunTerminal(selectedPage({ id: 18, pages: terminal.pages }, terminal.canonical_state), "negative terminal fixture");
    } catch (error) {
        terminalRejected = error instanceof ValidationError && error.code === terminal.expected_error;
    }
    if (!terminalRejected) fail("negative_fixture_failed", "missing terminal fixture was not rejected");
    return ["flow-state-negative-v106.json", "flow-state-negative-terminal.json"];
}

function validatePositiveFixtures(maps) {
    const fixture = loadJson("planos/008-compozy-init/builds/fixtures/flow-state-positive.json");
    if (fixture.schema_version !== 1 || fixture.cases.length !== 4) fail("save_load_fixture_invalid", "positive fixture schema drifted");
    for (const item of fixture.cases) {
        if (item.session) {
            const validPhase = ["entering", "active", "returning"].includes(item.session.phase);
            const validMap = item.session.phase === "active" ? item.map_id === item.session.destination_map_id :
                item.session.phase === "returning" ? item.map_id === item.session.return_map_id : true;
            if (!validPhase || !validMap) fail("save_load_fixture_invalid", `${item.id} session/map mismatch`);
        }
        const selfSwitches = new Set(item.self_switches ?? []);
        const expectations = item.expected_pages ?? [item.expected];
        for (const expected of expectations) {
            const map = maps[expected.event_id === 1 && item.map_id === 46 ? 46 : item.map_id];
            const selection = selectedPage(map.events[expected.event_id], item.canonical_state, selfSwitches);
            if (!selection || selection.index + 1 !== expected.page_number || selection.page.trigger !== expected.trigger) {
                fail("save_load_fixture_invalid", `${item.id} E${expected.event_id} selected P${selection ? selection.index + 1 : "none"}`);
            }
        }
        if (!item.session && item.id === "post-return") {
            for (const expected of expectations.filter(entry => [11, 21, 36].includes(entry.event_id))) {
                requireNonAutorunTerminal(selectedPage(maps[45].events[expected.event_id], item.canonical_state, selfSwitches), `${item.id} E${expected.event_id}`);
            }
        }
    }
    return fixture.cases.map(item => item.id);
}

function validateIntegration({ map022, map045, map046, map049 }) {
    const e18 = map022.events[18];
    const at10 = selectedPage(e18, 10);
    const vn46 = map046.events[1].pages[0];
    if (!at10 || pluginCommands(at10.page, "Coreto_QuestVN", "EnterVisualNovel").length !== 1 ||
            pluginCommands(vn46, "Coreto_QuestCore", "QuestTransition").filter(command => command.parameters?.[3]?.transitionId === "COMPLETE_VN").length !== 1 ||
            pluginCommands(vn46, "Coreto_QuestVN", "FinishVisualNovel").length !== 1) {
        fail("integration_flow_invalid", "Map022 -> Map046 transition chain is incomplete");
    }
    requireNonAutorunTerminal(selectedPage(e18, 20), "IT-001 repeated E18");

    const e17At20 = selectedPage(map022.events[17], 20);
    const transfer = e17At20?.page.list.filter(command => command.code === 201 && same(command.parameters.slice(1, 4), [45, 2, 4]));
    if (!e17At20 || pluginCommands(e17At20.page, "Coreto_QuestCore", "QuestTransition").filter(command =>
        command.parameters?.[3]?.transitionId === "ARRIVE_MAP045").length !== 1 || transfer.length !== 1) {
        fail("integration_flow_invalid", "Map022 E17 -> Map045 chain is incomplete");
    }
    const opening = selectedPage(map045.events[11], 90);
    if (!opening || pluginCommands(opening.page, "Coreto_QuestVN", "EnterVisualNovel").length !== 1 ||
            pluginCommands(map049.events[1].pages[0], "Coreto_QuestVN", "FinishVisualNovel").length !== 1) {
        fail("integration_flow_invalid", "Map045 -> Map049 opening chain is incomplete");
    }
    const terminalSwitches = new Set(["11:A", "11:D", "11:B", "36:A", "36:B", "36:C"]);
    requireNonAutorunTerminal(selectedPage(map045.events[11], 90, terminalSwitches), "IT-002 Map045 E11 terminal");
    requireNonAutorunTerminal(selectedPage(map045.events[36], 90, terminalSwitches), "IT-002 Map045 E36 terminal");
    return { IT_001: "Map022->Map046->Map022 one-shot", IT_002: "Map022->Map045->Map049->Map045 one-shot" };
}

function targetHashes() {
    return Object.fromEntries(EVIDENCE_TARGETS.map(target => [target, shaText(fs.readFileSync(path.join(repoRoot, target)))]));
}

function run(output) {
    const registry = loadJson("frontend/data/CoretoQuests.json");
    const system = loadJson("frontend/data/System.json");
    const mapInfos = loadJson("frontend/data/MapInfos.json");
    const map022 = loadJson("frontend/data/Map022.json");
    const map045 = loadJson("frontend/data/Map045.json");
    const map046 = loadJson("frontend/data/Map046.json");
    const map049 = loadJson("frontend/data/Map049.json");
    const maps = { 22: map022, 45: map045, 46: map046, 49: map049 };
    const current = Object.fromEntries(PRODUCTION_TARGETS.map(target => [target, loadJson(target)]));

    const checks = [];
    checks.push({ test_id: "UT-001", result: "passed", details: validateRegistry(registry, system) });
    checks.push({ test_id: "UT-002", result: "passed", details: { scan: scanCanonicalV106(), negative_fixtures: validateNegativeFixtures() } });
    checks.push({ test_id: "UT-003", result: "passed", details: validateFlowTopology({ map022, map045, map046, map049 }) });
    checks.push({ test_id: "UT-004", result: "passed", details: {
        naming: validateNaming(mapInfos, loadHeadJson("frontend/data/MapInfos.json")),
        restricted_diff: validateRestrictedDiff(current),
        protected_fingerprints: validateProtected(map045, map049),
        evidence_schema: "schema_version=1,classification=runtime_pending"
    } });
    const integration = validateIntegration({ map022, map045, map046, map049 });
    checks.push({ test_id: "IT-001", result: "passed", details: integration.IT_001 });
    checks.push({ test_id: "IT-002", result: "passed", details: integration.IT_002 });
    checks.push({ test_id: "IT-003", result: "passed", details: { fixtures: validatePositiveFixtures(maps), runtime: "pending" } });

    const evidence = {
        schema_version: 1,
        validator: "validate-flow-state",
        result: "passed",
        classification: "runtime_pending",
        test_ids: TEST_IDS,
        targets: EVIDENCE_TARGETS,
        target_hashes: targetHashes(),
        checks
    };
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${JSON.stringify(evidence, null, 4)}\n`, "utf8");
    console.log(`PASS validate-flow-state (${TEST_IDS.slice(0, 4).join("..")}, ${TEST_IDS.slice(4).join("..")}) runtime_pending`);
}

try {
    const output = parseArguments(process.argv.slice(2));
    run(output);
} catch (error) {
    const code = error instanceof ValidationError ? error.code : "validation_internal_error";
    console.error(`ERROR ${code}: ${error.message}`);
    process.exitCode = 1;
}
