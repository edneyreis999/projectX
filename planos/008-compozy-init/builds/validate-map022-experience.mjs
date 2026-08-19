import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../../..");
const buildRoot = path.join(repoRoot, "planos/008-compozy-init/builds");
const mapRelative = "frontend/data/Map022.json";
const assignmentRelative = "planos/008-compozy-init/builds/evidence/map022-level-design-assignment.json";
const finalMapHash = "6b8088b2afde13e4357a32a5b0fb4566cbc0919c8e0b68f25514bc9d859e34fb";
const task01EventHashes = Object.freeze({
    17: "13ee82cbe7e8bcb0df972feb07f2b8cc6e8eb09a70b6c9c784d7914c8d7dfc2c",
    18: "d6b2f021393158cbc7a5fb49ec1ec6266aa7872e86343a5f2dcd2fd4373848d3"
});
const inheritedTask01Hashes = Object.freeze({
    "frontend/data/Map045.json": "18ebfc2f86a603fe363568a077be9cf8d5044290f45ed757fda19b7707177e85",
    "frontend/data/Map049.json": "33f44fa75740c87b91339c679e3fa5b02bbb44cce2a125f785ad28ae4c0ac238",
    "frontend/data/MapInfos.json": "5d69b1eb32b00b55f1f5f4587578d04460690a748f57acd7bcbf5c1f438d68d1"
});
const childIds = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 32];
const testIds = ["UT-005", "UT-006", "UT-007", "IT-004", "IT-005"];

class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const fail = (code, message) => { throw new ValidationError(code, message); };
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const clone = value => JSON.parse(JSON.stringify(value));
const shaText = value => crypto.createHash("sha256").update(value).digest("hex");
const shaValue = value => shaText(JSON.stringify(value));
const key = ([x, y]) => `${x},${y}`;

function loadJson(relative) {
    const raw = fs.readFileSync(path.join(repoRoot, relative), "utf8").replace(/^\uFEFF/, "");
    try {
        return JSON.parse(raw);
    } catch (error) {
        fail("json_parse_failed", `${relative}: ${error.message}`);
    }
}

function loadHeadJson(relative) {
    try {
        return JSON.parse(execFileSync("git", ["show", `HEAD:${relative}`], { cwd: repoRoot, encoding: "utf8" }).replace(/^\uFEFF/, ""));
    } catch (error) {
        fail("restricted_diff_violation", `cannot load HEAD:${relative}: ${error.message}`);
    }
}

function fileHash(relative) {
    return shaText(fs.readFileSync(path.join(repoRoot, relative)));
}

function parseArguments(args) {
    if (args.length !== 2 || args[0] !== "--output") {
        fail("validation_output_required", "pass --output under planos/008-compozy-init/builds/");
    }
    if (path.isAbsolute(args[1])) fail("validation_output_outside_active_plan", "output must be repository-relative");
    const output = path.resolve(repoRoot, args[1]);
    const relative = path.relative(buildRoot, output);
    if (relative.startsWith("..") || path.isAbsolute(relative) || path.extname(output) !== ".json") {
        fail("validation_output_outside_active_plan", "output must remain under planos/008-compozy-init/builds/");
    }
    return output;
}

function event(map, id, name = null) {
    const found = map.events?.[id];
    if (!found || found.id !== id || (name !== null && found.name !== name)) {
        fail("map022_semantic_anchor_missing", `E${id}${name ? ` (${name})` : ""} is missing`);
    }
    return found;
}

function plugin(command, pluginName, commandName) {
    return command?.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName;
}

function findExactly(list, predicate, description) {
    const indexes = list.map((item, index) => predicate(item) ? index : -1).filter(index => index >= 0);
    if (indexes.length !== 1) fail("map022_semantic_anchor_missing", `${description}: expected one match, found ${indexes.length}`);
    return indexes[0];
}

function activityRows(assignment) {
    return Object.entries(assignment.activities).flatMap(([activity, rows]) => rows.map(row => ({ ...row, activity })));
}

function validateAssignment(assignment) {
    if (assignment.schema_version !== 1 || assignment.map_id !== 22 || assignment.decision_pass !== "bounded-level-design-assignment" ||
            assignment.status !== "approved_for_static_implementation" || assignment.human_playtest_status !== "pending") {
        fail("activity_assignment_invalid", "Level Designer assignment schema or bounded status drifted");
    }
    const activityNames = Object.keys(assignment.activities).sort();
    if (!same(activityNames, ["ring_play", "seated_conversation", "tag"])) {
        fail("activity_assignment_invalid", `expected exactly tag/ring_play/seated_conversation, found ${activityNames.join(",")}`);
    }
    const rows = activityRows(assignment);
    const ids = rows.map(row => row.event_id).sort((a, b) => a - b);
    if (!same(ids, childIds) || new Set(ids).size !== childIds.length || assignment.intentionally_unchanged_children.length !== 0) {
        fail("activity_assignment_invalid", "every in-scope child must belong to exactly one of the three activities");
    }
    const gatheringIds = assignment.gathering.map(row => row.event_id).sort((a, b) => a - b);
    if (!same(gatheringIds, childIds)) fail("activity_assignment_invalid", "gathering does not cover all children");
    return rows;
}

function moveToCoordinates(route) {
    return route.list.filter(command => command.code === 45).map(command => {
        const match = /^Move To: (\d+), (\d+)$/.exec(command.parameters?.[0] ?? "");
        if (!match) fail("route_contract_invalid", `unsupported movement script ${command.parameters?.[0]}`);
        return [Number(match[1]), Number(match[2])];
    });
}

function validateActivityAndRecovery(map, assignment, rows) {
    const gatheringById = new Map(assignment.gathering.map(row => [row.event_id, row]));
    const roles = [];
    for (const row of rows) {
        const child = event(map, row.event_id, "Crianca");
        if (child.note !== "<Save Event Location>" || child.pages.length !== 3 || !same([child.x, child.y], row.anchor)) {
            fail("activity_assignment_invalid", `E${row.event_id} identity, anchor, or saved-location recovery drifted`);
        }
        const [activity, gathering, terminal] = child.pages;
        if (activity.trigger !== 0 || activity.moveType !== 3 || activity.moveRoute.repeat !== true ||
                activity.moveRoute.skippable !== true || activity.moveRoute.wait !== false ||
                activity.moveSpeed !== row.move_speed || activity.moveFrequency !== row.move_frequency) {
            fail("route_contract_invalid", `E${row.event_id} activity route flags drifted`);
        }
        const expectedActivityCoordinates = row.activity === "seated_conversation" ? [row.anchor] : row.route;
        if (!same(moveToCoordinates(activity.moveRoute), expectedActivityCoordinates) ||
                !same(expectedActivityCoordinates[0], row.anchor)) {
            fail("route_contract_invalid", `E${row.event_id} activity route does not own its declared anchor/path`);
        }
        if (row.activity === "seated_conversation") {
            const directionCode = { down: 16, left: 17, right: 18, up: 19 }[row.facing];
            if (!activity.moveRoute.list.some(command => command.code === directionCode) ||
                    !activity.moveRoute.list.some(command => command.code === 15 && same(command.parameters, [180]))) {
                fail("route_contract_invalid", `E${row.event_id} seated route lacks terminal facing or low-motion wait`);
            }
        }

        const destination = gatheringById.get(row.event_id).destination;
        const forcedIndex = findExactly(gathering.list, command => command.code === 205 && command.parameters?.[0] === 0,
            `E${row.event_id} gathering route`);
        const forced = gathering.list[forcedIndex].parameters[1];
        if (forced.repeat !== false || forced.skippable !== true || forced.wait !== true ||
                !same(moveToCoordinates(forced), [destination]) || !forced.list.some(command => command.code === 19)) {
            fail("route_contract_invalid", `E${row.event_id} gathering route lacks destination, skippable wait, or terminal facing`);
        }
        const selfIndex = findExactly(gathering.list, command => command.code === 123 && same(command.parameters, ["A", 0]),
            `E${row.event_id} gathering self-switch`);
        if (forcedIndex >= selfIndex) fail("route_contract_invalid", `E${row.event_id} arms terminal state before movement completes`);
        if (terminal.moveType !== 3 || terminal.moveRoute.repeat !== true || terminal.moveRoute.skippable !== true ||
                terminal.moveRoute.wait !== false || !same(moveToCoordinates(terminal.moveRoute), [destination]) ||
                !terminal.moveRoute.list.some(command => command.code === 19)) {
            fail("route_contract_invalid", `E${row.event_id} terminal route cannot recover its gathering destination/facing`);
        }
        roles.push({ event_id: row.event_id, activity: row.activity, role: row.role, anchor: row.anchor, gathering: destination });
    }
    return { activities: Object.fromEntries(Object.entries(assignment.activities).map(([name, list]) => [name, list.length])), roles };
}

function parseOverride(command, description) {
    try {
        return JSON.parse(command.parameters[3]["Override:struct"] || "{}");
    } catch (error) {
        fail("gab_payload_mismatch", `${description} Override:struct is invalid: ${error.message}`);
    }
}

function parseText(command, description) {
    try {
        return JSON.parse(command.parameters[3]["Text:json"]);
    } catch (error) {
        fail("gab_payload_mismatch", `${description} Text:json is invalid: ${error.message}`);
    }
}

function validateGabPair(list, index, description) {
    const command = list[index];
    const payload = command.parameters[3];
    const text = parseText(command, description);
    const continuations = [];
    for (let cursor = index + 1; cursor < list.length && list[cursor].code === 657; cursor += 1) continuations.push(list[cursor]);
    const expected = [
        `Text = ${JSON.stringify(text)}`,
        `Force Gab? = ${payload["ForceGab:eval"]}`,
        `Optional Settings = ${payload["Override:struct"]}`
    ];
    if (continuations.length !== 3 || !same(continuations.map(item => item.parameters?.[0]), expected)) {
        fail("gab_payload_mismatch", `${description} code:357/657 display payload diverged`);
    }
    return { text, override: parseOverride(command, description) };
}

function assertAutomaticGab(payload, trigger, description) {
    let override;
    try {
        override = JSON.parse(payload["Override:struct"] || "{}");
    } catch (error) {
        fail("gab_payload_mismatch", `${description} invalid override fixture`);
    }
    if ((trigger === 3 || trigger === 4) && (payload["ForceGab:eval"] !== "false" ||
            override["BypassAntiRepeat:eval"] !== "false")) {
        fail("gab_payload_mismatch", `${description} automatic chatter may not force or bypass anti-repeat`);
    }
}

function validateGabs(map, assignment) {
    const assigned = new Map(assignment.automatic_gabs.map(row => [row.text, row]));
    const childActivity = new Map(activityRows(assignment).map(row => [row.event_id, row.activity]));
    let automaticCount = 0;
    let interactionCount = 0;
    let waitForGabCount = 0;
    for (const owner of map.events.filter(Boolean)) {
        for (let pageIndex = 0; pageIndex < owner.pages.length; pageIndex += 1) {
            const page = owner.pages[pageIndex];
            for (let index = 0; index < page.list.length; index += 1) {
                const command = page.list[index];
                if (plugin(command, "VisuMZ_4_GabWindow", "WaitForGab")) waitForGabCount += 1;
                if (!plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly")) continue;
                const description = `Map022 E${owner.id} P${pageIndex + 1} C${index}`;
                const { text, override } = validateGabPair(page.list, index, description);
                if (page.trigger === 3 || page.trigger === 4) {
                    assertAutomaticGab(command.parameters[3], page.trigger, description);
                    const row = assigned.get(text);
                    const anchorId = Number(override["EventID:num"]);
                    if (owner.id !== 20 || !row || row.event_id !== anchorId || childActivity.get(anchorId) !== row.activity) {
                        fail("gab_payload_mismatch", `${description} is not spatially assigned to its visible activity`);
                    }
                    automaticCount += 1;
                } else if (owner.id === 30 && page.trigger === 1) {
                    if (command.parameters[3]["ForceGab:eval"] !== "true" || override["BypassAntiRepeat:eval"] !== "true") {
                        fail("gab_payload_mismatch", `${description} deliberate interaction no longer owns queue priority/repetition`);
                    }
                    interactionCount += 1;
                }
            }
        }
    }
    if (automaticCount !== 12 || interactionCount !== 2 || waitForGabCount !== 0) {
        fail("gab_payload_mismatch", `expected automatic/interaction/WaitForGab counts 12/2/0, found ${automaticCount}/${interactionCount}/${waitForGabCount}`);
    }
    const e20 = event(map, 20, "Gab Windowd");
    const waits = e20.pages[0].list.filter(command => command.code === 230);
    if (waits.length !== 13 || waits.some(command => !same(command.parameters, [240])) ||
            e20.pages[0].list.some(command => [121, 122, 123, 201].includes(command.code) ||
                (command.code === 357 && command.parameters?.[0] === "Coreto_QuestCore"))) {
        fail("gab_payload_mismatch", "E20 chatter must remain sparse, optional, and progression-free");
    }
    const e30 = event(map, 30, "EX — Noite da História: convocação");
    if (!e30.pages[0].list.some(command => plugin(command, "VisuMZ_4_GabWindow", "ClearGab")) ||
            !e30.pages[0].list.some(command => plugin(command, "Coreto_QuestCore", "QuestTransition"))) {
        fail("gab_payload_mismatch", "E30 deliberate interaction priority or quest handoff drifted");
    }
    return { automatic: automaticCount, deliberate_interaction: interactionCount, wait_for_gab: waitForGabCount, spacing_frames: 240 };
}

function passageModel(map, tileset) {
    const tileId = (x, y, z) => map.data[(z * map.height + y) * map.width + x] || 0;
    const passable = (x, y, direction) => {
        const bit = (1 << (direction / 2 - 1)) & 0x0f;
        for (let z = 3; z >= 0; z -= 1) {
            const flag = tileset.flags[tileId(x, y, z)] || 0;
            if ((flag & 0x10) !== 0) continue;
            if ((flag & bit) === 0) return true;
            if ((flag & bit) === bit) return false;
        }
        return false;
    };
    const directions = [[2, 0, 1], [4, -1, 0], [6, 1, 0], [8, 0, -1]];
    const valid = ([x, y]) => Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < map.width && y >= 0 && y < map.height;
    const neighbors = ([x, y]) => directions.flatMap(([direction, dx, dy]) => {
        const next = [x + dx, y + dy];
        return valid(next) && passable(x, y, direction) && passable(next[0], next[1], 10 - direction) ? [next] : [];
    });
    return { valid, neighbors };
}

function assertCoordinate(model, coordinate, description) {
    if (!model.valid(coordinate)) fail("route_coordinate_out_of_bounds", `${description}: ${coordinate.join(",")}`);
    if (model.neighbors(coordinate).length === 0) fail("route_coordinate_impassable", `${description}: ${coordinate.join(",")}`);
}

function assertCorridor(protectedCorridor, occupied, description) {
    const protectedKeys = new Set(protectedCorridor.map(key));
    const conflict = occupied.find(coordinate => protectedKeys.has(key(coordinate)));
    if (conflict) fail("critical_corridor_blocked", `${description}: ${conflict.join(",")}`);
}

function validateCoordinates(map, tileset, assignment, rows) {
    const model = passageModel(map, tileset);
    const coordinates = [];
    for (const row of rows) {
        coordinates.push({ coordinate: row.anchor, description: `E${row.event_id} anchor` });
        for (const coordinate of row.route ?? []) coordinates.push({ coordinate, description: `E${row.event_id} activity route` });
    }
    for (const row of assignment.gathering) coordinates.push({ coordinate: row.destination, description: `E${row.event_id} gathering` });
    for (const item of coordinates) assertCoordinate(model, item.coordinate, item.description);
    const anchors = rows.map(row => row.anchor);
    const destinations = assignment.gathering.map(row => row.destination);
    if (new Set(anchors.map(key)).size !== anchors.length || new Set(destinations.map(key)).size !== destinations.length) {
        fail("route_destination_conflict", "activity anchors or gathering destinations conflict");
    }
    assertCorridor(assignment.critical_route.protected_corridor, anchors, "activity anchor occupies protected corridor");
    assertCorridor(assignment.critical_route.protected_corridor, destinations, "gathering destination occupies protected corridor");
    return { changed_coordinates: coordinates.length, unique_anchors: anchors.length, unique_gathering_destinations: destinations.length };
}

function baseOccupancy(map) {
    const children = new Set(childIds);
    return map.events.filter(Boolean).filter(owner => !children.has(owner.id) && owner.pages.some(page =>
        page.priorityType === 1 && page.through === false && (page.image?.tileId > 0 || page.image?.characterName))).map(owner => [owner.x, owner.y]);
}

function reachable(model, start, goals, occupied) {
    const blocked = new Set(occupied.map(key));
    const goalKeys = new Set(goals.map(key));
    const queue = [start];
    const visited = new Set([key(start)]);
    while (queue.length) {
        const current = queue.shift();
        if (goalKeys.has(key(current))) return true;
        for (const next of model.neighbors(current)) {
            const nextKey = key(next);
            if (!blocked.has(nextKey) && !visited.has(nextKey)) {
                visited.add(nextKey);
                queue.push(next);
            }
        }
    }
    return false;
}

function validatePassability(map, tileset, system, assignment, rows) {
    const model = passageModel(map, tileset);
    const start = assignment.critical_route.player_start;
    if (system.startMapId !== 22 || !same([system.startX, system.startY], start)) {
        fail("passability_graph_invalid", "System.json player start no longer matches the Map022 fixture");
    }
    const permanent = baseOccupancy(map).filter(coordinate => !same(coordinate, start));
    const snapshots = {
        before_gathering: permanent.concat(rows.map(row => row.anchor)),
        during_gathering: permanent,
        after_gathering: permanent.concat(assignment.gathering.map(row => row.destination))
    };
    const results = {};
    for (const [snapshot, occupied] of Object.entries(snapshots)) {
        results[snapshot] = {};
        for (const target of assignment.critical_route.targets) {
            const availableGoals = target.approaches.filter(coordinate => !occupied.some(item => same(item, coordinate)));
            const ok = availableGoals.length > 0 && reachable(model, start, availableGoals, occupied);
            if (!ok) fail("passability_graph_invalid", `${snapshot} cannot reach ${target.name}`);
            results[snapshot][target.name] = true;
        }
    }
    return { player_start: start, representative_snapshots: results, recovery_routes: childIds.length };
}

function validateNegativeFixtures(map, tileset, assignment) {
    const model = passageModel(map, tileset);
    const bounds = loadJson("planos/008-compozy-init/builds/fixtures/map022-negative-bounds.json");
    const corridor = loadJson("planos/008-compozy-init/builds/fixtures/map022-negative-corridor.json");
    const gab = loadJson("planos/008-compozy-init/builds/fixtures/map022-negative-gab.json");
    const rejected = [];
    for (const [fixture, action] of [
        [bounds, () => assertCoordinate(model, bounds.coordinate, "negative bounds fixture")],
        [corridor, () => assertCorridor(assignment.critical_route.protected_corridor, corridor.occupied, "negative corridor fixture")],
        [gab, () => assertAutomaticGab(gab.payload, gab.trigger, "negative Gab fixture")]
    ]) {
        try {
            action();
        } catch (error) {
            if (error instanceof ValidationError && error.code === fixture.expected_error) {
                rejected.push(fixture.expected_error);
                continue;
            }
            throw error;
        }
        fail("negative_fixture_failed", `${fixture.expected_error} fixture was accepted`);
    }
    return rejected;
}

function normalizeAuthorizedMap022(current, head, assignment, rows) {
    const normalized = clone(current);
    normalized.events[17] = head.events[17];
    normalized.events[18] = head.events[18];
    const activityFields = ["trigger", "moveType", "moveSpeed", "moveFrequency", "directionFix", "moveRoute"];
    const terminalFields = ["moveType", "moveSpeed", "moveFrequency", "directionFix", "moveRoute"];
    for (const row of rows) {
        const now = normalized.events[row.event_id];
        const before = head.events[row.event_id];
        now.x = before.x;
        now.y = before.y;
        for (const field of activityFields) now.pages[0][field] = before.pages[0][field];
        now.pages[0].image.direction = before.pages[0].image.direction;
        const nowForced = findExactly(now.pages[1].list, command => command.code === 205 && command.parameters?.[0] === 0,
            `normalized E${row.event_id} forced route`);
        const beforeForced = findExactly(before.pages[1].list, command => command.code === 205 && command.parameters?.[0] === 0,
            `HEAD E${row.event_id} forced route`);
        now.pages[1].list[nowForced].parameters[1] = before.pages[1].list[beforeForced].parameters[1];
        for (const field of terminalFields) now.pages[2][field] = before.pages[2][field];
        now.pages[2].image.direction = before.pages[2].image.direction;
    }

    const nowList = normalized.events[20].pages[0].list;
    const beforeList = head.events[20].pages[0].list;
    for (const gab of assignment.automatic_gabs) {
        const nowIndex = findExactly(nowList, command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly") &&
            parseText(command, "normalized E20") === gab.text, `normalized E20 ${gab.text}`);
        const beforeIndex = findExactly(beforeList, command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly") &&
            parseText(command, "HEAD E20") === gab.source_text, `HEAD E20 ${gab.source_text}`);
        nowList[nowIndex] = clone(beforeList[beforeIndex]);
        for (let offset = 1; offset <= 3; offset += 1) nowList[nowIndex + offset] = clone(beforeList[beforeIndex + offset]);
    }
    const nowWaits = nowList.map((command, index) => command.code === 230 ? index : -1).filter(index => index >= 0);
    const beforeWaits = beforeList.map((command, index) => command.code === 230 ? index : -1).filter(index => index >= 0);
    if (nowWaits.length !== beforeWaits.length) fail("restricted_diff_violation", "E20 wait cardinality changed");
    for (let index = 0; index < nowWaits.length; index += 1) nowList[nowWaits[index]] = clone(beforeList[beforeWaits[index]]);
    return normalized;
}

function validateBoundaries(map, assignment, rows) {
    if (fileHash(mapRelative) !== finalMapHash) fail("final_hash_mismatch", `Map022 is not the replayable Task 02 output`);
    for (const [id, expected] of Object.entries(task01EventHashes)) {
        if (shaValue(map.events[Number(id)]) !== expected) fail("task01_invariant_changed", `Map022 E${id} changed after Task 01`);
    }
    for (const [relative, expected] of Object.entries(inheritedTask01Hashes)) {
        if (fileHash(relative) !== expected) fail("task01_invariant_changed", `${relative} changed during Task 02`);
    }
    const head = loadHeadJson(mapRelative);
    const normalized = normalizeAuthorizedMap022(map, head, assignment, rows);
    if (!same(normalized, head)) fail("restricted_diff_violation", "Map022 changed outside Task 01 E17/E18 and Task 02 activity/Gab spans");
    const changedFrontend = execFileSync("git", ["diff", "--name-only", "--", "frontend"], { cwd: repoRoot, encoding: "utf8" })
        .trim().split("\n").filter(Boolean);
    const allowedInherited = [mapRelative, ...Object.keys(inheritedTask01Hashes)];
    const unexpected = changedFrontend.filter(relative => !allowedInherited.includes(relative));
    if (unexpected.length) fail("restricted_diff_violation", `unexpected frontend changes: ${unexpected.join(", ")}`);
    return {
        map022_hash: finalMapHash,
        task01_event_hashes: task01EventHashes,
        inherited_task01_files_unchanged: Object.keys(inheritedTask01Hashes),
        changed_frontend_files: changedFrontend
    };
}

function targetHashes() {
    const targets = [mapRelative, assignmentRelative,
        "planos/008-compozy-init/builds/update-map022-experience.mjs",
        "planos/008-compozy-init/builds/validate-map022-experience.mjs"];
    return Object.fromEntries(targets.map(relative => [relative, fileHash(relative)]));
}

function run(output) {
    const map = loadJson(mapRelative);
    const assignment = loadJson(assignmentRelative);
    const system = loadJson("frontend/data/System.json");
    const tilesets = loadJson("frontend/data/Tilesets.json");
    const tileset = tilesets[map.tilesetId];
    if (!tileset) fail("map022_signature_invalid", `Tileset ${map.tilesetId} is missing`);
    const rows = validateAssignment(assignment);
    const checks = [];
    checks.push({ test_id: "UT-005", result: "passed", details: validateActivityAndRecovery(map, assignment, rows) });
    checks.push({ test_id: "UT-006", result: "passed", details: validateGabs(map, assignment) });
    checks.push({ test_id: "UT-007", result: "passed", details: {
        coordinates: validateCoordinates(map, tileset, assignment, rows),
        negative_fixtures: validateNegativeFixtures(map, tileset, assignment),
        boundaries: validateBoundaries(map, assignment, rows)
    } });
    checks.push({ test_id: "IT-004", result: "passed", details: validatePassability(map, tileset, system, assignment, rows) });
    checks.push({ test_id: "IT-005", result: "passed", details: {
        automatic_chatter: "parallel, queued, anti-repeat enabled, spatial event anchors",
        deliberate_interaction: "E30 clears/replaces the queue and preserves the QuestTransition",
        optionality: "E20 contains no quest state mutation, transfer, or blocking WaitForGab"
    } });
    const evidence = {
        schema_version: 1,
        validator: "validate-map022-experience",
        result: "passed",
        classification: "runtime_pending",
        human_playtest_status: "human_playtest_pending",
        test_ids: testIds,
        targets: [mapRelative, assignmentRelative],
        target_hashes: targetHashes(),
        checks,
        residual_human_gates: [
            "recognition of tag, ring play, and seated conversation",
            "runtime collision recovery and gathering pacing",
            "Darla/E18/E17/VN-seat reachability in Playtest",
            "Gab anchoring, readability, repetition, and interaction priority",
            "five-of-six seat discovery within 90 seconds without a runtime timer"
        ]
    };
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${JSON.stringify(evidence, null, 4)}\n`, "utf8");
    console.log("PASS validate-map022-experience (UT-005..UT-007, IT-004..IT-005) runtime_pending");
}

try {
    run(parseArguments(process.argv.slice(2)));
} catch (error) {
    const code = error instanceof ValidationError ? error.code : "validation_internal_error";
    console.error(`ERROR ${code}: ${error.message}`);
    process.exitCode = 1;
}
