import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../../..");
const targetRelative = "frontend/data/Map022.json";
const assignmentRelative = "planos/008-compozy-init/builds/evidence/map022-level-design-assignment.json";
const sourceHash = "f761829b8a8376de54c05065c04504bcac2ea2bd3ef7f53d693a337ca2b52559";
const finalHash = "6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb";
const childIds = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 32];
const facingCodes = Object.freeze({ down: 16, left: 17, right: 18, up: 19 });

const fail = message => {
    throw new Error(`map022_experience_precondition_failed: ${message}`);
};
const clone = value => JSON.parse(JSON.stringify(value));
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const shaText = value => crypto.createHash("sha256").update(value).digest("hex");

function readStyledJson(relative) {
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
    const canonical = JSON.stringify(value, null, 4).replace(/\n/g, newline) + (trailingNewline ? newline : "");
    if (canonical !== body) fail(`${relative} does not use the supported four-space JSON style`);
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

function validateTask01Topology(map) {
    const e17 = event(map, 17, "EX — Rheed: saída para Map045");
    const e18 = event(map, 18, "EX — Noite da História: posição");
    if (e17.pages.length !== 3 || e17.pages[2].conditions?.variableId !== 106 ||
            e17.pages[2].conditions?.variableValue !== 90 || e17.pages[2].trigger !== 0) {
        fail("Task 01 E17 terminal topology drifted");
    }
    if (e18.pages.length !== 2 || e18.pages[0].conditions?.variableId !== 106 ||
            e18.pages[0].conditions?.variableValue !== 10 || e18.pages[1].conditions?.variableValue !== 20 ||
            e18.pages[1].trigger !== 0) {
        fail("Task 01 E18 entry/terminal topology drifted");
    }
}

function loadAssignment() {
    let assignment;
    try {
        assignment = JSON.parse(fs.readFileSync(path.join(repoRoot, assignmentRelative), "utf8"));
    } catch (error) {
        fail(`level-design assignment is not valid JSON: ${error.message}`);
    }
    if (assignment.schema_version !== 1 || assignment.map_id !== 22 ||
            assignment.human_playtest_status !== "pending") {
        fail("level-design assignment schema or human gate drifted");
    }
    const rows = Object.entries(assignment.activities).flatMap(([activity, entries]) =>
        entries.map(entry => ({ ...entry, activity })));
    const ids = rows.map(row => row.event_id).sort((a, b) => a - b);
    if (!same(ids, childIds) || new Set(ids).size !== childIds.length ||
            assignment.intentionally_unchanged_children.length !== 0) {
        fail("level-design assignment must classify the 17 children exactly once");
    }
    const gatheringIds = assignment.gathering.map(row => row.event_id).sort((a, b) => a - b);
    if (!same(gatheringIds, childIds) || new Set(assignment.gathering.map(row => row.destination.join(","))).size !== childIds.length) {
        fail("gathering assignment must provide unique destinations for all children");
    }
    if (assignment.automatic_gabs.length !== 12) fail("expected 12 bounded automatic Gab assignments");
    return { assignment, rows };
}

function moveTo([x, y]) {
    return { code: 45, parameters: [`Move To: ${x}, ${y}`] };
}

function activityRoute(row) {
    if (row.activity === "seated_conversation") {
        const turn = facingCodes[row.facing];
        if (!turn) fail(`E${row.event_id} has invalid seated facing ${row.facing}`);
        return {
            list: [moveTo(row.anchor), { code: turn, parameters: [] }, { code: 15, parameters: [180] }, { code: 0, parameters: [] }],
            repeat: true,
            skippable: true,
            wait: false
        };
    }
    if (!Array.isArray(row.route) || row.route.length < 4 || !same(row.route[0], row.anchor)) {
        fail(`E${row.event_id} activity route does not begin at its anchor`);
    }
    const pause = row.activity === "ring_play" ? 18 : 4;
    const list = [];
    for (const coordinate of row.route) {
        list.push(moveTo(coordinate), { code: 15, parameters: [pause] });
    }
    list.push({ code: 0, parameters: [] });
    return { list, repeat: true, skippable: true, wait: false };
}

function gatheringRoute(destination, wait) {
    return {
        list: [moveTo(destination), { code: 19, parameters: [] }, ...(wait ? [] : [{ code: 15, parameters: [180] }]), { code: 0, parameters: [] }],
        repeat: !wait,
        skippable: true,
        wait
    };
}

function findExactly(list, predicate, description) {
    const indexes = list.map((item, index) => predicate(item) ? index : -1).filter(index => index >= 0);
    if (indexes.length !== 1) fail(`${description}: expected one semantic match, found ${indexes.length}`);
    return indexes[0];
}

function updateChild(map, row, gathering) {
    const child = event(map, row.event_id, "Crianca");
    if (child.note !== "<Save Event Location>" || child.pages.length !== 3) {
        fail(`E${row.event_id} child ownership or page count drifted`);
    }
    const [activityPage, gatheringPage, terminalPage] = child.pages;
    if (gatheringPage.conditions?.variableId !== 106 || gatheringPage.conditions?.variableValue !== 10 ||
            gatheringPage.trigger !== 4 || gatheringPage.priorityType !== 0) {
        fail(`E${row.event_id} gathering page no longer matches the Task 01 contract`);
    }
    if (terminalPage.conditions?.variableId !== 106 || terminalPage.conditions?.variableValue !== 10 ||
            terminalPage.conditions?.selfSwitchValid !== true || terminalPage.conditions?.selfSwitchCh !== "A") {
        fail(`E${row.event_id} terminal page no longer matches the Task 01 contract`);
    }
    const routeIndex = findExactly(gatheringPage.list, command => command.code === 205 && command.parameters?.[0] === 0,
        `E${row.event_id} gathering route`);
    const selfSwitchIndex = findExactly(gatheringPage.list, command => command.code === 123 && same(command.parameters, ["A", 0]),
        `E${row.event_id} gathering terminal self-switch`);
    if (routeIndex >= selfSwitchIndex) fail(`E${row.event_id} gathering self-switch occurs before route completion`);

    child.x = row.anchor[0];
    child.y = row.anchor[1];

    activityPage.trigger = 0;
    activityPage.moveType = 3;
    activityPage.moveSpeed = row.move_speed;
    activityPage.moveFrequency = row.move_frequency;
    activityPage.directionFix = false;
    activityPage.moveRoute = activityRoute(row);
    if (row.facing) activityPage.image.direction = ({ down: 2, left: 4, right: 6, up: 8 })[row.facing];

    gatheringPage.list[routeIndex].parameters[1] = gatheringRoute(gathering.destination, true);

    terminalPage.moveType = 3;
    terminalPage.moveSpeed = 3;
    terminalPage.moveFrequency = 3;
    terminalPage.directionFix = false;
    terminalPage.image.direction = 8;
    terminalPage.moveRoute = gatheringRoute(gathering.destination, false);
}

function plugin(command, pluginName, commandName) {
    return command?.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName;
}

function parseGabText(command, description) {
    try {
        return JSON.parse(command.parameters[3]["Text:json"]);
    } catch (error) {
        fail(`${description} has invalid Text:json: ${error.message}`);
    }
}

function updateAutomaticGabs(map, assignments) {
    const e20 = event(map, 20, "Gab Windowd");
    const page = e20.pages?.[0];
    if (!page || page.trigger !== 4) fail("E20 automatic Gab page is missing or no longer Parallel");
    const gabCommands = page.list.filter(command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly"));
    if (gabCommands.length !== assignments.length) fail(`E20 expected ${assignments.length} automatic Gabs, found ${gabCommands.length}`);

    for (const gab of assignments) {
        const matches = page.list.map((command, index) => {
            if (!plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly")) return -1;
            const text = parseGabText(command, `E20 command ${index}`);
            return text === gab.source_text || text === gab.text ? index : -1;
        }).filter(index => index >= 0);
        if (matches.length !== 1) fail(`E20 Gab semantic anchor ${gab.source_text} matched ${matches.length} commands`);
        const index = matches[0];
        const command = page.list[index];
        const override = JSON.stringify({
            "EventID:num": String(gab.event_id),
            "WaitTime:num": "72",
            "TimePerCharacter:num": "2",
            "BypassAntiRepeat:eval": "false"
        });
        command.parameters[3] = {
            "Text:json": JSON.stringify(gab.text),
            "ForceGab:eval": "false",
            "Override:struct": override
        };
        const continuations = [];
        for (let cursor = index + 1; cursor < page.list.length && page.list[cursor].code === 657; cursor += 1) {
            continuations.push(page.list[cursor]);
        }
        if (continuations.length !== 3) fail(`E20 Gab ${gab.source_text} expected three code:657 continuations`);
        continuations[0].parameters = [`Text = ${JSON.stringify(gab.text)}`];
        continuations[1].parameters = ["Force Gab? = false"];
        continuations[2].parameters = [`Optional Settings = ${override}`];
    }

    const waits = page.list.filter(command => command.code === 230);
    if (waits.length !== 13 || waits.some(command => !same(command.parameters, [60]) && !same(command.parameters, [240]))) {
        fail("E20 automatic chatter spacing drifted from the 13 expected waits");
    }
    for (const wait of waits) wait.parameters = [240];
}

function updateMap(map, assignment, rows) {
    if (map.width !== 17 || map.height !== 27 || map.tilesetId !== 2 || map.note !== "<CoretoMapType:EX>") {
        fail("Map022 signature drifted");
    }
    validateTask01Topology(map);
    const gatheringById = new Map(assignment.gathering.map(row => [row.event_id, row]));
    for (const row of rows) updateChild(map, row, gatheringById.get(row.event_id));
    updateAutomaticGabs(map, assignment.automatic_gabs);
    validateTask01Topology(map);
}

function main() {
    const document = readStyledJson(targetRelative);
    const beforeHash = shaText(document.raw);
    if (beforeHash !== sourceHash && beforeHash !== finalHash) {
        fail(`stale Map022 hash ${beforeHash}; expected Task 01 baseline or Task 02 final hash`);
    }
    const { assignment, rows } = loadAssignment();
    document.value = clone(document.value);
    updateMap(document.value, assignment, rows);
    const output = serialize(document);
    const outputHash = shaText(output);
    if (beforeHash === finalHash && outputHash !== finalHash) fail("idempotent replay would change the final Map022 hash");
    if (output === document.raw) {
        console.log(`PASS update-map022-experience no-op ${beforeHash}`);
        return;
    }
    if (beforeHash !== sourceHash) fail("only the exact Task 01 baseline may be mutated");

    const latest = readStyledJson(targetRelative);
    if (shaText(latest.raw) !== beforeHash) fail("Map022 changed after preflight; no write performed");
    const temporary = `${document.absolute}.task02.tmp`;
    try {
        fs.writeFileSync(temporary, output, "utf8");
        JSON.parse(fs.readFileSync(temporary, "utf8").replace(/^\uFEFF/, ""));
        fs.renameSync(temporary, document.absolute);
    } finally {
        if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    }
    const persisted = fs.readFileSync(document.absolute, "utf8");
    if (shaText(persisted) !== outputHash) fail("persisted Map022 hash differs from prepared output");
    JSON.parse(persisted.replace(/^\uFEFF/, ""));
    console.log(`PASS update-map022-experience ${beforeHash} -> ${outputHash}`);
}

try {
    main();
} catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exitCode = 1;
}
