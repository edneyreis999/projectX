#!/usr/bin/env node

/**
 * One-shot structured migration for the remaining aSemifinal exploration maps.
 *
 * Run without arguments to apply the reviewed migration. Run with --check to
 * validate the terminal state. The writer is fail-closed against the baseline
 * hashes captured immediately before implementation.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { applyEdits, modify } from "jsonc-parser";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");

const BASELINE_HASHES = {
    "frontend/data/MapInfos.json": "cfabe61e86594505c56e817d4f3326595eedd36647a4c337b36e69cee3d6c407",
    "frontend/js/plugins.js": "570690ba534b7cc8ad216eba95603aacfee1d1a3df847bd312c7687698141602",
    "frontend/data/Map044.json": "f6cb84be5fb43dc21e4e8c4df64d6506bf8e98434e9b28e0ccda49c3e87830fa",
    "frontend/data/Map012.json": "cf31561f38dbd0b30da15120f2317b9db56828fc1fea7b87f741acea7c38dcbc",
    "frontend/data/Map013.json": "4e43842ba5a6bb1b62f59d2b8fee4b6c33c9419893efbaf0a0c4b6b9f924a771",
    "frontend/data/Map052.json": "44de59149044a7b5f1fa9b2c29e2c28b76cc3eeab20996f42be72f489eb87cfb",
    "frontend/data/Map008.json": "ee4226b2e1be2c683dfd024aba4e3042fdb683bf3944dfb1de72a6eb4d2bf25f",
    "frontend/data/Map009.json": "aa44503e843859a2394468d77755d3ff0798af964b49e949fe0675c7cb43713c",
    "frontend/data/Map010.json": "9e487854999f715e2cac70041e562baa4f128f6eb34ca8bd869d3cf68cf78153",
    "frontend/data/Map014.json": "75d25efb809a4b1480057e043229db79ce209ae1159e73e8091ecf1c622ab175"
};

const PROTECTED_MAPS = [
    "frontend/data/Map008.json",
    "frontend/data/Map009.json",
    "frontend/data/Map010.json",
    "frontend/data/Map014.json"
];

const NEW_MAPS = {
    61: { sourceId: 8, name: "EX_Distrito_Comercial", parentId: 39, order: 53 },
    62: { sourceId: 14, name: "EX_Estadio", parentId: 39, order: 54 },
    63: { sourceId: 10, name: "EX_Vestiario", parentId: 62, order: 56 },
    64: { sourceId: 9, name: "EX_Campo_de_Futebol_Runico", parentId: 62, order: 55 }
};

const TRANSFER_RULES = {
    61: [
        { eventId: 1, pageIndex: 0, from: 7, to: 44, count: 1 },
        { eventId: 2, pageIndex: 0, from: 7, to: 44, count: 1 },
        { eventId: 6, pageIndex: 0, from: 7, to: 44, count: 1 },
        { eventId: 19, pageIndex: 0, from: 7, to: 44, count: 1 },
        { eventId: 3, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 5, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 20, pageIndex: 0, from: 14, to: 62, count: 1 }
    ],
    62: [
        { eventId: 1, pageIndex: 0, from: 10, to: 63, count: 1 },
        { eventId: 6, pageIndex: 0, from: 7, to: 44, count: 2 },
        { eventId: 6, pageIndex: 1, from: 7, to: 44, count: 3 },
        { eventId: 12, pageIndex: 0, from: 9, to: 64, count: 1 },
        { eventId: 13, pageIndex: 0, from: 9, to: 64, count: 1 },
        { eventId: 18, pageIndex: 0, from: 9, to: 64, count: 1 },
        { eventId: 21, pageIndex: 0, from: 9, to: 64, count: 1 },
        { eventId: 15, pageIndex: 0, from: 8, to: 61, count: 1 },
        { eventId: 16, pageIndex: 0, from: 8, to: 61, count: 1 },
        { eventId: 17, pageIndex: 0, from: 8, to: 61, count: 1 }
    ],
    63: [
        { eventId: 1, pageIndex: 0, from: 14, to: 62, count: 1 }
    ],
    64: [
        { eventId: 9, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 16, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 17, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 21, pageIndex: 0, from: 14, to: 62, count: 1 },
        { eventId: 22, pageIndex: 0, from: 14, to: 62, count: 1 }
    ]
};

const EXISTING_TRANSFER_RULES = {
    "frontend/data/Map044.json": [
        { eventId: 18, pageIndex: 0, from: 8, to: 61, count: 1 }
    ],
    "frontend/data/Map012.json": [
        { eventId: 1, pageIndex: 0, from: 8, to: 61, count: 1 }
    ],
    "frontend/data/Map013.json": [
        { eventId: 6, pageIndex: 3, from: 8, to: 61, count: 1 }
    ],
    "frontend/data/Map052.json": [
        { eventId: 1, pageIndex: 0, from: 8, to: 61, count: 1 }
    ]
};

const EXPECTED_LEGACY_POINTERS = {
    1: [[45, 20]],
    2: [[45, 7], [6, 7], [7, 18], [8, 3], [14, 2]],
    3: [[14, 2]],
    4: [[14, 1], [10, 13]],
    5: [],
    6: [[10, 9], [14, 2]],
    7: [[14, 12]],
    8: [[14, 5]]
};

const EXPECTED_TERMINAL_POINTERS = {
    1: [[45, 20]],
    2: [[45, 7], [6, 7], [7, 18], [8, 3], [14, 2], [44, 18], [61, 3], [62, 2]],
    3: [[14, 2], [62, 2]],
    4: [[14, 1], [10, 13], [62, 1], [63, 13]],
    5: [],
    6: [[10, 1], [14, 2], [63, 1], [62, 2]],
    7: [[14, 12], [62, 12]],
    8: [[14, 5], [62, 5]]
};

function fail(message) {
    throw new Error(`[semifinal-map-migration] ${message}`);
}

function absolute(relativePath) {
    return path.join(repoRoot, relativePath);
}

function hash(source) {
    return crypto.createHash("sha256").update(source).digest("hex");
}

function read(relativePath) {
    return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJson(relativePath) {
    return JSON.parse(read(relativePath));
}

function jsonTextLike(source, value) {
    const trailingNewline = source.endsWith("\n") ? "\n" : "";
    return `${JSON.stringify(value, null, 4)}${trailingNewline}`;
}

function mapPath(id) {
    return `frontend/data/Map${String(id).padStart(3, "0")}.json`;
}

function assertBaseline(relativePath) {
    const expected = BASELINE_HASHES[relativePath];
    if (!expected) fail(`${relativePath}: baseline hash is not declared`);
    const actual = hash(read(relativePath));
    if (actual !== expected) fail(`${relativePath}: baseline hash drifted (${actual})`);
}

function parsePluginsEnvelope(source) {
    const match = source.match(/^(\/\/ Generated by RPG Maker\.\n\/\/ Do not edit this file directly\.\nvar \$plugins =\n)(\[[\s\S]*\])(;\n?)$/);
    if (!match) fail("frontend/js/plugins.js: generated envelope drifted");
    return { prefix: match[1], plugins: JSON.parse(match[2]), suffix: match[3] };
}

function transferCommands(map, rule, expectedMapId) {
    const event = map.events?.[rule.eventId];
    if (!event) fail(`E${rule.eventId}: event is missing`);
    const page = event.pages?.[rule.pageIndex];
    if (!page) fail(`E${rule.eventId}/P${rule.pageIndex + 1}: page is missing`);
    return page.list.filter(command =>
        command.code === 201 &&
        command.parameters?.[0] === 0 &&
        command.parameters?.[1] === expectedMapId
    );
}

function transferCommandIndexes(map, rule, expectedMapId) {
    const event = map.events?.[rule.eventId];
    if (!event) fail(`E${rule.eventId}: event is missing`);
    const page = event.pages?.[rule.pageIndex];
    if (!page) fail(`E${rule.eventId}/P${rule.pageIndex + 1}: page is missing`);
    return page.list.flatMap((command, index) =>
        command.code === 201 &&
        command.parameters?.[0] === 0 &&
        command.parameters?.[1] === expectedMapId ? [index] : []
    );
}

function editJsonValue(source, jsonPath, value) {
    const edits = modify(source, jsonPath, value, {
        formattingOptions: { insertSpaces: true, tabSize: 4, eol: "\n" }
    });
    if (edits.length === 0) fail(`JSON path ${JSON.stringify(jsonPath)} produced no text edit`);
    return applyEdits(source, edits);
}

function applyTransferRulesToSource(source, rules, direction = "forward") {
    const map = JSON.parse(source);
    let nextSource = source;
    for (const rule of rules) {
        const from = direction === "forward" ? rule.from : rule.to;
        const to = direction === "forward" ? rule.to : rule.from;
        const indexes = transferCommandIndexes(map, rule, from);
        if (indexes.length !== rule.count) {
            fail(`E${rule.eventId}/P${rule.pageIndex + 1}: expected ${rule.count} transfers to Map${from}, found ${indexes.length}`);
        }
        for (const commandIndex of indexes) {
            nextSource = editJsonValue(nextSource, [
                "events", rule.eventId, "pages", rule.pageIndex,
                "list", commandIndex, "parameters", 1
            ], to);
        }
    }
    return nextSource;
}

function applyTransferRules(map, rules) {
    for (const rule of rules) {
        const commands = transferCommands(map, rule, rule.from);
        if (commands.length !== rule.count) {
            fail(`E${rule.eventId}/P${rule.pageIndex + 1}: expected ${rule.count} transfers to Map${rule.from}, found ${commands.length}`);
        }
        for (const command of commands) command.parameters[1] = rule.to;
    }
}

function revertTransferRules(map, rules) {
    for (const rule of rules) {
        const commands = transferCommands(map, rule, rule.to);
        if (commands.length !== rule.count) {
            fail(`E${rule.eventId}/P${rule.pageIndex + 1}: expected ${rule.count} terminal transfers to Map${rule.to}, found ${commands.length}`);
        }
        for (const command of commands) command.parameters[1] = rule.from;
    }
}

function prepareMapInfos(source) {
    const infos = JSON.parse(source);
    if (infos.length !== 58 || infos[58] !== undefined) fail("MapInfos does not end at ID 57");
    if (infos[50] !== null || infos[51] !== null) fail("MapInfos tombstones 50/51 drifted");
    for (const id of Object.keys(NEW_MAPS).map(Number)) {
        if (fs.existsSync(absolute(mapPath(id)))) fail(`${mapPath(id)} already exists`);
    }
    if (infos[18]?.order !== 53 || infos[46]?.order !== 54 || infos[49]?.order !== 55) {
        fail("Visual Novel order precondition drifted");
    }

    infos[18].order = 57;
    infos[46].order = 58;
    infos[49].order = 59;
    for (const [rawId, config] of Object.entries(NEW_MAPS)) {
        const id = Number(rawId);
        const sourceInfo = infos[config.sourceId];
        if (!sourceInfo || sourceInfo.id !== config.sourceId) fail(`MapInfos source ${config.sourceId} is missing`);
        infos[id] = {
            ...structuredClone(sourceInfo),
            id,
            name: config.name,
            order: config.order,
            parentId: config.parentId
        };
    }
    return jsonTextLike(source, infos);
}

function prepareClone(id) {
    const config = NEW_MAPS[id];
    const sourcePath = mapPath(config.sourceId);
    const source = read(sourcePath);
    const map = JSON.parse(source);
    if (map.note.includes("CoretoMapType")) fail(`${sourcePath}: source already has a CoretoMapType note`);
    let nextSource = editJsonValue(source, ["note"], "<CoretoMapType:EX>");
    nextSource = applyTransferRulesToSource(nextSource, TRANSFER_RULES[id]);
    return nextSource;
}

function prepareExistingMap(relativePath) {
    const source = read(relativePath);
    return applyTransferRulesToSource(source, EXISTING_TRANSFER_RULES[relativePath]);
}

function pointPairsFromRows(rows) {
    const result = {};
    for (const rawRow of rows) {
        const row = JSON.parse(rawRow);
        const taskIndex = Number(row["taskIndex:int"]);
        if (!Number.isInteger(taskIndex) || result[taskIndex]) fail(`invalid or duplicate pointer task ${row["taskIndex:int"]}`);
        result[taskIndex] = JSON.parse(row["points:structA"]).map(rawPoint => {
            const point = JSON.parse(rawPoint);
            return [Number(point["mapId:int"]), Number(point["evId:int"])];
        });
    }
    return result;
}

function assertPointerPairs(actual, expected, label) {
    assert.deepEqual(actual, expected, `${label}: aSemifinal pointers drifted`);
}

function serializePoint(mapId, eventId) {
    return JSON.stringify({ "mapId:int": String(mapId), "evId:int": String(eventId) });
}

function preparePlugins(source) {
    const envelope = parsePluginsEnvelope(source);
    const pkdPlugins = envelope.plugins.filter(plugin => plugin.name === "PKD_SimpleQuestSystem");
    if (pkdPlugins.length !== 1 || pkdPlugins[0].status !== true) fail("active PKD_SimpleQuestSystem is not unique");
    const pkd = pkdPlugins[0];

    const questDefinitions = JSON.parse(pkd.parameters["sqsQuests:structA"]);
    const semifinalDefinitions = questDefinitions.map(raw => JSON.parse(raw)).filter(quest => quest.id === "aSemifinal");
    if (semifinalDefinitions.length !== 1) fail("aSemifinal quest definition is not unique");
    if (JSON.parse(semifinalDefinitions[0]["tasks:strA"]).length !== 8) fail("aSemifinal does not have eight tasks");

    const key = "sqsPointers:structA";
    const quests = JSON.parse(pkd.parameters[key]);
    const matches = quests.map((raw, index) => ({ index, quest: JSON.parse(raw) }))
        .filter(entry => entry.quest.questId === "aSemifinal");
    if (matches.length !== 1) fail("aSemifinal pointer config is not unique");

    const { index, quest } = matches[0];
    const rows = JSON.parse(quest["pointsData:structA"]);
    assertPointerPairs(pointPairsFromRows(rows), EXPECTED_LEGACY_POINTERS, "baseline");

    for (let taskIndex = 1; taskIndex <= 8; taskIndex++) {
        const rowIndex = rows.findIndex(raw => Number(JSON.parse(raw)["taskIndex:int"]) === taskIndex);
        if (rowIndex < 0) fail(`aSemifinal task ${taskIndex} pointer row is missing`);
        const row = JSON.parse(rows[rowIndex]);
        row["points:structA"] = JSON.stringify(
            EXPECTED_TERMINAL_POINTERS[taskIndex].map(([mapId, eventId]) => serializePoint(mapId, eventId))
        );
        rows[rowIndex] = JSON.stringify(row);
    }
    quest["pointsData:structA"] = JSON.stringify(rows);
    quests[index] = JSON.stringify(quest);
    pkd.parameters[key] = JSON.stringify(quests);
    return `${envelope.prefix}${JSON.stringify(envelope.plugins, null, 4)}${envelope.suffix}`;
}

function writeAtomically(relativePath, source) {
    const target = absolute(relativePath);
    const existingMode = fs.existsSync(target) ? fs.statSync(target).mode : null;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const scratch = `${target}.semifinal-migration-${process.pid}.tmp`;
    fs.writeFileSync(scratch, source, "utf8");
    if (existingMode !== null) fs.chmodSync(scratch, existingMode);
    fs.renameSync(scratch, target);
}

function applyMigration() {
    for (const relativePath of Object.keys(BASELINE_HASHES)) assertBaseline(relativePath);
    for (const id of Object.keys(NEW_MAPS).map(Number)) {
        if (fs.existsSync(absolute(mapPath(id)))) fail(`${mapPath(id)} already exists`);
    }

    const writes = new Map();
    writes.set("frontend/data/MapInfos.json", prepareMapInfos(read("frontend/data/MapInfos.json")));
    for (const id of Object.keys(NEW_MAPS).map(Number)) writes.set(mapPath(id), prepareClone(id));
    for (const relativePath of Object.keys(EXISTING_TRANSFER_RULES)) {
        writes.set(relativePath, prepareExistingMap(relativePath));
    }
    writes.set("frontend/js/plugins.js", preparePlugins(read("frontend/js/plugins.js")));

    for (const [relativePath, source] of writes) {
        if (relativePath.endsWith(".json")) JSON.parse(source);
        else parsePluginsEnvelope(source);
    }
    for (const relativePath of Object.keys(BASELINE_HASHES)) assertBaseline(relativePath);
    for (const id of Object.keys(NEW_MAPS).map(Number)) {
        if (fs.existsSync(absolute(mapPath(id)))) fail(`${mapPath(id)} appeared during migration preparation`);
    }
    for (const [relativePath, source] of writes) writeAtomically(relativePath, source);
    validateTerminalState();
    console.log(`Applied ${writes.size} scoped writes for the aSemifinal EX map migration.`);
}

function validateMapInfos() {
    const infos = readJson("frontend/data/MapInfos.json");
    if (infos.length !== 65) fail(`MapInfos length is ${infos.length}, expected 65`);
    if (infos[50] !== null || infos[51] !== null) fail("MapInfos tombstones 50/51 changed");
    if (infos[58] !== null || infos[59] !== null || infos[60] !== null) {
        fail("MapInfos collision slots 58-60 must remain unregistered tombstones");
    }
    const expectedOrders = { 18: 57, 46: 58, 49: 59 };
    for (const [rawId, order] of Object.entries(expectedOrders)) {
        const id = Number(rawId);
        if (infos[id]?.order !== order) fail(`MapInfos ID ${id} order is not ${order}`);
    }
    for (const [rawId, config] of Object.entries(NEW_MAPS)) {
        const id = Number(rawId);
        const info = infos[id];
        if (!info || info.id !== id || info.name !== config.name || info.parentId !== config.parentId || info.order !== config.order) {
            fail(`MapInfos ID ${id} registration drifted`);
        }
        if (!fs.existsSync(absolute(mapPath(id)))) fail(`${mapPath(id)} is missing`);
    }
}

function validateClone(id) {
    const config = NEW_MAPS[id];
    const clone = readJson(mapPath(id));
    if (clone.note !== "<CoretoMapType:EX>") fail(`${mapPath(id)} has the wrong map type note`);
    const normalized = structuredClone(clone);
    normalized.note = readJson(mapPath(config.sourceId)).note;
    revertTransferRules(normalized, TRANSFER_RULES[id]);
    assert.deepEqual(normalized, readJson(mapPath(config.sourceId)), `${mapPath(id)} differs from its source outside the allowlist`);

    let normalizedSource = editJsonValue(read(mapPath(id)), ["note"], readJson(mapPath(config.sourceId)).note);
    normalizedSource = applyTransferRulesToSource(normalizedSource, TRANSFER_RULES[id], "reverse");
    if (hash(normalizedSource) !== BASELINE_HASHES[mapPath(config.sourceId)]) {
        fail(`${mapPath(id)} does not preserve its source byte style outside the allowlist`);
    }

    const forbiddenTargets = new Set([7, 8, 9, 10, 14]);
    for (const event of clone.events.filter(Boolean)) {
        for (const page of event.pages) {
            for (const command of page.list) {
                if (command.code === 201 && command.parameters?.[0] === 0 && forbiddenTargets.has(command.parameters[1])) {
                    fail(`${mapPath(id)} E${event.id} still transfers to legacy Map${command.parameters[1]}`);
                }
            }
        }
    }
}

function validateExistingMap(relativePath) {
    const source = read(relativePath);
    const normalizedSource = applyTransferRulesToSource(source, EXISTING_TRANSFER_RULES[relativePath], "reverse");
    if (hash(normalizedSource) !== BASELINE_HASHES[relativePath]) {
        fail(`${relativePath} changed outside its transfer allowlist`);
    }
}

function validatePointers() {
    const envelope = parsePluginsEnvelope(read("frontend/js/plugins.js"));
    const pkdPlugins = envelope.plugins.filter(plugin => plugin.name === "PKD_SimpleQuestSystem");
    if (pkdPlugins.length !== 1 || pkdPlugins[0].status !== true) fail("active PKD_SimpleQuestSystem is not unique");
    const pkd = pkdPlugins[0];
    const definitions = JSON.parse(pkd.parameters["sqsQuests:structA"])
        .map(raw => JSON.parse(raw)).filter(quest => quest.id === "aSemifinal");
    if (definitions.length !== 1 || JSON.parse(definitions[0]["tasks:strA"]).length !== 8) {
        fail("aSemifinal definition/task count drifted");
    }

    const quests = JSON.parse(pkd.parameters["sqsPointers:structA"]);
    const matches = quests.map(raw => JSON.parse(raw)).filter(quest => quest.questId === "aSemifinal");
    if (matches.length !== 1) fail("aSemifinal pointer config is not unique");
    const rows = JSON.parse(matches[0]["pointsData:structA"]);
    const pairs = pointPairsFromRows(rows);
    assertPointerPairs(pairs, EXPECTED_TERMINAL_POINTERS, "terminal");

    for (const points of Object.values(pairs)) {
        for (const [mapId, eventId] of points) {
            const map = readJson(mapPath(mapId));
            if (!map.events?.[eventId]) fail(`aSemifinal pointer Map${mapId}/E${eventId} does not resolve`);
        }
    }
}

function validateTerminalState() {
    for (const relativePath of PROTECTED_MAPS) assertBaseline(relativePath);
    validateMapInfos();
    for (const id of Object.keys(NEW_MAPS).map(Number)) validateClone(id);
    for (const relativePath of Object.keys(EXISTING_TRANSFER_RULES)) validateExistingMap(relativePath);
    validatePointers();

    for (const relativePath of [
        "frontend/data/MapInfos.json",
        ...Object.keys(NEW_MAPS).map(id => mapPath(Number(id))),
        ...Object.keys(EXISTING_TRANSFER_RULES)
    ]) JSON.parse(read(relativePath));
    parsePluginsEnvelope(read("frontend/js/plugins.js"));
    console.log("Terminal validation passed: map registry, clone equivalence, route graph, protected hashes and PKD pointers.");
}

const mode = process.argv[2];
if (mode === "--check") validateTerminalState();
else if (mode === undefined) applyMigration();
else fail(`unknown argument: ${mode}`);
