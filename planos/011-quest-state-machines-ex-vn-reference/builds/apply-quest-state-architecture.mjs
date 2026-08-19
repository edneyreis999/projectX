#!/usr/bin/env node

/**
 * One-shot structured writer for the reference quest-state architecture.
 *
 * Scope:
 * - frontend/data/CoretoQuests.json
 * - frontend/data/Map045.json (events 7 and 20 only)
 * - frontend/data/Map046.json (event 1 only)
 * - frontend/js/plugins.js (one PKD pointer only)
 *
 * The writer is intentionally fail-closed: every source hash and semantic
 * precondition must match the reviewed baseline before any file is written.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");

const TARGETS = {
    registry: {
        path: "frontend/data/CoretoQuests.json",
        sha256: "d19bc2c83e0c61d4d12dfd94d242628d1d62bf9d38ed56c3709f03b47e2de678"
    },
    map045: {
        path: "frontend/data/Map045.json",
        sha256: "57b3dd8cb51fd6cabc1ebef485f798ba0e1fe7c0de12abe3fae8263c2373778f"
    },
    map046: {
        path: "frontend/data/Map046.json",
        sha256: "b5afb84e5ee8735d1eb3767e5f5cde8064c7e26a0e849160fd0b39cbd80ef35f"
    },
    plugins: {
        path: "frontend/js/plugins.js",
        sha256: "1202db6859841ec12c9efd25565c1a94e60c4dc730906b57b0835cdb690ab39b"
    }
};

function fail(message) {
    throw new Error(`[quest-state-writer] ${message}`);
}

function hash(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}

function readTarget(target) {
    const absolutePath = path.join(repoRoot, target.path);
    const source = fs.readFileSync(absolutePath, "utf8");
    if (hash(source) !== target.sha256) fail(`${target.path}: source hash drifted`);
    return { absolutePath, source };
}

function jsonTextLike(source, value) {
    const trailingNewline = source.endsWith("\n") ? "\n" : "";
    return `${JSON.stringify(value, null, 4)}${trailingNewline}`;
}

function same(actual, expected) {
    return JSON.stringify(actual) === JSON.stringify(expected);
}

function questCommand(transitionId) {
    return {
        code: 357,
        indent: 0,
        parameters: [
            "Coreto_QuestCore",
            "QuestTransition",
            "QuestTransition",
            { questKey: "noite-da-historia", transitionId }
        ]
    };
}

function updateRegistry(source) {
    const registry = JSON.parse(source);
    const night = registry.quests?.["noite-da-historia"];
    const sling = registry.quests?.["tutorial-funda-forjaprata"];
    if (!night || !sling) fail("canonical quest definitions are missing");
    if (!same(night.transitions.COMPLETE_VN?.from, [10]) || night.transitions.COMPLETE_VN?.to !== 20) {
        fail("noite-da-historia COMPLETE_VN precondition drifted");
    }
    if (!same(night.extensions?.questVN?.entries?.CENA_PRINCIPAL?.allowedStates, [10])) {
        fail("noite-da-historia VN entry precondition drifted");
    }
    if (!same(sling.pkd?.objectives, [{ id: 1, knownFrom: 10, completedAt: 20 }])) {
        fail("tutorial-funda-forjaprata objective precondition drifted");
    }
    if (sling.transitions.LEAVE_EQUIPPED || !same(sling.terminalStates, [90])) {
        fail("tutorial-funda-forjaprata terminal precondition drifted");
    }

    night.pkd.objectives[0].completedAt = 15;
    night.pkd.objectives[1].knownFrom = 15;
    night.transitions = {
        START: night.transitions.START,
        REACH_SEAT: {
            from: [10],
            to: 15,
            requirements: [],
            effects: []
        },
        COMPLETE_VN: {
            ...night.transitions.COMPLETE_VN,
            from: [15]
        },
        ARRIVE_MAP045: night.transitions.ARRIVE_MAP045
    };
    night.extensions.questVN.entries.CENA_PRINCIPAL.allowedStates = [10, 15];

    sling.pkd.completeQuestAtTerminal = false;
    sling.pkd.objectives.push({ id: 2, knownFrom: 20, completedAt: null });
    sling.transitions.LEAVE_EQUIPPED = {
        from: [20],
        to: 90,
        requirements: [],
        effects: [],
        terminal: true
    };

    return jsonTextLike(source, registry);
}

function pluginTransition(questKey, transitionId, indent) {
    return {
        code: 357,
        indent,
        parameters: [
            "Coreto_QuestCore",
            "QuestTransition",
            "QuestTransition",
            { questKey, transitionId }
        ]
    };
}

function updateMap046(source) {
    const map = JSON.parse(source);
    const page = map.events?.[1]?.pages?.[0];
    if (!page || map.events[1].name !== "VN — Noite da História: diálogo principal") {
        fail("Map046 E1 precondition drifted");
    }
    const assert = page.list[2];
    if (assert?.code !== 357 || assert.parameters?.[1] !== "AssertQuestState" ||
            assert.parameters?.[3]?.expectedState !== "10") {
        fail("Map046 E1 state assertion precondition drifted");
    }
    if (page.list.some(command => command.parameters?.[3]?.transitionId === "REACH_SEAT")) {
        fail("Map046 E1 already contains REACH_SEAT");
    }
    page.list.splice(3, 0, questCommand("REACH_SEAT"));
    return jsonTextLike(source, map);
}

function updateMap045(source) {
    const map = JSON.parse(source);
    const exitEvent = map.events?.[7];
    const chestEvent = map.events?.[20];
    if (!exitEvent || exitEvent.name !== "Sair da Casa" || exitEvent.pages.length !== 3) {
        fail("Map045 E7 precondition drifted");
    }
    if (!chestEvent || chestEvent.name !== "Bau - Funda") fail("Map045 E20 precondition drifted");

    const entryPage = exitEvent.pages[0];
    const equippedBranch = entryPage.list.findIndex(command =>
        command.code === 111 && command.indent === 3 && same(command.parameters, [4, 3, 4, 1])
    );
    const transferIndex = entryPage.list.findIndex((command, index) =>
        index > equippedBranch && command.code === 201 && command.indent === 4 &&
        same(command.parameters, [0, 44, 5, 22, 0, 0])
    );
    if (equippedBranch < 0 || transferIndex < 0) fail("Map045 E7 equipped transfer precondition drifted");
    entryPage.list.splice(transferIndex, 0,
        pluginTransition("tutorial-funda-forjaprata", "LEAVE_EQUIPPED", 4));

    const equipFeedback = entryPage.list.find(command =>
        command.code === 357 && command.parameters?.[0] === "VisuMZ_4_GabWindow" &&
        JSON.stringify(command.parameters).includes("Preciso equipar minha Funda antes de sair.")
    );
    const feedbackContinuations = entryPage.list.filter(command =>
        command.code === 657 && command.indent === 4 &&
        ["Text = \"Preciso equipar minha Funda antes de sair.\"", "Force Gab? = true"].includes(command.parameters?.[0]) ||
        command.code === 657 && command.indent === 4 && String(command.parameters?.[0]).startsWith("Optional Settings =")
    );
    if (!equipFeedback || feedbackContinuations.length !== 3) {
        fail("Map045 E7 equipment feedback precondition drifted");
    }

    const terminalPage = structuredClone(entryPage);
    terminalPage.conditions = {
        actorId: 1,
        actorValid: false,
        itemId: 1,
        itemValid: false,
        selfSwitchCh: "A",
        selfSwitchValid: false,
        switch1Id: 1,
        switch1Valid: false,
        switch2Id: 1,
        switch2Valid: false,
        variableId: 111,
        variableValid: true,
        variableValue: 90
    };
    terminalPage.list = [
        { code: 111, indent: 0, parameters: [4, 3, 4, 1] },
        { code: 201, indent: 1, parameters: [0, 44, 5, 22, 0, 0] },
        { code: 115, indent: 1, parameters: [] },
        { code: 0, indent: 1, parameters: [] },
        { code: 411, indent: 0, parameters: [] },
        { ...structuredClone(equipFeedback), indent: 1 },
        ...feedbackContinuations.map(command => ({ ...structuredClone(command), indent: 1 })),
        { code: 115, indent: 1, parameters: [] },
        { code: 0, indent: 1, parameters: [] },
        { code: 412, indent: 0, parameters: [] },
        { code: 0, indent: 0, parameters: [] }
    ];
    exitEvent.pages.splice(1, 0, terminalPage);

    const chestPage = chestEvent.pages[1];
    const directProjectionIndex = chestPage.list.findIndex(command =>
        (command.code === 355 || command.code === 655) &&
        command.parameters?.[0] === 'SQSM.ShowTaskForQuest("aSemifinal", 2);'
    );
    if (directProjectionIndex < 0) fail("Map045 E20 direct task projection precondition drifted");
    chestPage.list.splice(directProjectionIndex, 1);

    return jsonTextLike(source, map);
}

function parsePluginsEnvelope(source) {
    const match = source.match(/^(\/\/ Generated by RPG Maker\.\n\/\/ Do not edit this file directly\.\nvar \$plugins =\n)(\[[\s\S]*\])(;\n?)$/);
    if (!match) fail("plugins.js envelope precondition drifted");
    return { prefix: match[1], plugins: JSON.parse(match[2]), suffix: match[3] };
}

function updatePlugins(source) {
    const envelope = parsePluginsEnvelope(source);
    const pkd = envelope.plugins.find(plugin => plugin.name === "PKD_SimpleQuestSystem");
    if (!pkd || pkd.status !== true) fail("active PKD plugin is missing");
    const key = "sqsPointers:structA";
    const quests = JSON.parse(pkd.parameters[key]);
    const index = quests.findIndex(raw => JSON.parse(raw).questId === "assistirNoiteHistoria");
    if (index < 0) fail("assistirNoiteHistoria pointer is missing");
    const quest = JSON.parse(quests[index]);
    const rows = JSON.parse(quest["pointsData:structA"]);
    if (rows.length !== 1) fail("assistirNoiteHistoria pointer cardinality drifted");
    const row = JSON.parse(rows[0]);
    const points = JSON.parse(row["points:structA"]);
    if (row["taskIndex:int"] !== "1" || points.length !== 1) fail("assistirNoiteHistoria task pointer drifted");
    const point = JSON.parse(points[0]);
    if (point["mapId:int"] !== "5" || point["evId:int"] !== "18") {
        fail("assistirNoiteHistoria pointer source is not Map005/E18");
    }
    point["mapId:int"] = "22";
    points[0] = JSON.stringify(point);
    row["points:structA"] = JSON.stringify(points);
    rows[0] = JSON.stringify(row);
    quest["pointsData:structA"] = JSON.stringify(rows);
    quests[index] = JSON.stringify(quest);
    pkd.parameters[key] = JSON.stringify(quests);
    return `${envelope.prefix}${JSON.stringify(envelope.plugins, null, 4)}${envelope.suffix}`;
}

const loaded = Object.fromEntries(Object.entries(TARGETS).map(([key, target]) => [key, readTarget(target)]));
const writes = [
    [loaded.registry, updateRegistry(loaded.registry.source)],
    [loaded.map045, updateMap045(loaded.map045.source)],
    [loaded.map046, updateMap046(loaded.map046.source)],
    [loaded.plugins, updatePlugins(loaded.plugins.source)]
];

for (const [target, nextSource] of writes) {
    if (nextSource === target.source) fail(`${path.relative(repoRoot, target.absolutePath)}: writer produced no change`);
    JSON.parse(path.extname(target.absolutePath) === ".json" ? nextSource : parsePluginsEnvelope(nextSource).plugins && "null");
}

for (const [target, nextSource] of writes) fs.writeFileSync(target.absolutePath, nextSource, "utf8");

console.log("Applied quest-state architecture to registry, Map045/E7+E20, Map046/E1 and one PKD pointer.");
