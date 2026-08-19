#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../..");
const MAP_PATH = path.join(PROJECT_ROOT, "frontend/data/Map045.json");
const RELATIVE_MAP_PATH = "frontend/data/Map045.json";

const PAGE_A_PREFIX_HASH = "626b2f463c74ddb401540b58288bc3b2e8650f241bc790bd7c25e107ea6e8b0b";
const CLEANUP_HASH = "712752480dd5edecce36f81714d96071afeeca56630777e4db20fb23aedb5f51";
const NON_LISTS_HASH = "855d6f4a50b636254d4ff14e133dfb8af7db7b904db36bb234a87c62e805ab63";
const PAGE_3_HASH = "92f737976b04a55fa14b2a1f2a3f5fc27dc45374efa720ae636dcb1ef958be43";

const RHEED_TEXT = "<center>Então, crianças,\nesta é a Casa da Família Forjaprata!</center>";
const CHILD_TEXT = "Parece de verdade...";
const UAU_TEXT = "Uau!";
const FINAL_RHEED_TEXT = "HAHAHAHA! agora vamos voltar para história";
const CLEANUP_PREFIX = "for (const eventId of [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39])";

function digest(value) {
    return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function pageMetadata(event) {
    return event.pages.map(page => {
        const copy = { ...page };
        delete copy.list;
        return copy;
    });
}

function fail(message) {
    throw new Error(message);
}

function expect(condition, message) {
    if (!condition) fail(message);
}

function pluginCommands(page, name) {
    return page.list.filter(command =>
        command.code === 357 &&
        command.parameters?.[0] === "VisuMZ_4_GabWindow" &&
        command.parameters?.[1] === name
    );
}

function routeAt(page, target, codes) {
    const matches = page.list
        .map((command, index) => ({ command, index }))
        .filter(({ command }) =>
            command.code === 205 &&
            command.parameters?.[0] === target &&
            JSON.stringify(command.parameters?.[1]?.list?.map(entry => entry.code)) === JSON.stringify(codes)
        );
    expect(matches.length === 1, `expected one route for target ${target} with codes ${codes.join(",")}`);
    return matches[0];
}

function validateRoute(page, target, entries, expectedWait = true) {
    const codes = [...entries.map(entry => entry.code), 0];
    const { command, index } = routeAt(page, target, codes);
    const route = command.parameters[1];
    expect(route.wait === expectedWait && route.repeat === false && route.skippable === false, `route ${target}/${codes} wait/determinism differs`);
    entries.forEach((expected, offset) => {
        const actual = route.list[offset];
        expect(actual.indent === null, `route ${target}/${codes} entry ${offset} must retain indent=null`);
        expect(JSON.stringify(actual.parameters) === JSON.stringify(expected.parameters), `route ${target}/${codes} entry ${offset} parameters differ`);
        const continuation = page.list[index + 1 + offset];
        expect(continuation?.code === 505 && continuation.indent === 0, `route ${target}/${codes} continuation ${offset} missing`);
        expect(JSON.stringify(continuation.parameters?.[0]) === JSON.stringify(actual), `route ${target}/${codes} continuation ${offset} differs`);
    });
    return index;
}

function validateGab(command, text, eventId, waitTime, timePerCharacter) {
    expect(command.parameters?.[2] === "Gab: Text Only", "Gab display label differs");
    const args = command.parameters?.[3] ?? {};
    expect(args["Text:json"] === JSON.stringify(text), `Gab text differs for E${eventId}`);
    expect(args["ForceGab:eval"] === "false", `Gab E${eventId} must remain queued/non-forced`);
    const override = JSON.parse(args["Override:struct"]);
    expect(JSON.stringify(override) === JSON.stringify({
        "EventID:num": String(eventId),
        "WaitTime:num": String(waitTime),
        "TimePerCharacter:num": String(timePerCharacter)
    }), `Gab E${eventId} local override differs`);
}

function validateFadeRoute(command) {
    expect(command.code === 205 && command.parameters?.[0] === 0, "page B must begin with the existing this-event fade route");
    const route = command.parameters[1];
    expect(route.wait === true && route.repeat === false && route.skippable === false, "page B fade route must wait for completion");
    const expected = [
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(220));"],
        [15, 2],
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(180));"],
        [15, 2],
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(140));"],
        [15, 2],
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(100));"],
        [15, 2],
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(50));"],
        [15, 2],
        [45, "$gameMap.events().filter(event => event.eventId() === 36 || event.event().name === \"Crianca\").forEach(event => event.setOpacity(0));"]
    ];
    expect(route.list.length === expected.length + 1 && route.list.at(-1)?.code === 0, "page B fade route length differs");
    expected.forEach(([code, parameter], index) => {
        const entry = route.list[index];
        expect(entry.code === code && entry.parameters?.[0] === parameter, `page B fade step ${index} differs`);
        const continuation = pageB.list[index + 1];
        expect(continuation?.code === 505 && JSON.stringify(continuation.parameters?.[0]) === JSON.stringify(entry), `page B fade continuation ${index} differs`);
    });
}

const checks = [];
const failures = [];
function check(name, fn) {
    try {
        fn();
        checks.push(name);
    } catch (error) {
        checks.push(name);
        failures.push({ check: name, message: error.message });
    }
}

let map;
try {
    map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
} catch (error) {
    process.stdout.write(`${JSON.stringify({
        status: "fail",
        code: "json_parse_failed",
        map: RELATIVE_MAP_PATH,
        checks: 0,
        failures: 1,
        details: [{ check: "parse_json", message: error.message }],
        runtime: "runtime_pending",
        runtime_pending: ["timing", "visual_readability", "pacing"]
    })}\n`);
    process.exit(1);
}

const event = map.events?.[36];
const pageA = event?.pages?.[0];
const pageB = event?.pages?.[1];
const pageC = event?.pages?.[2];

check("semantic_targets", () => {
    expect(event?.id === 36 && event.name === "EX — Rheed: saída para Map045", "Map045 E36 missing or renamed");
    expect(event.x === 11 && event.y === 6 && event.pages.length === 3, "E36 identity or page count differs");
    for (const [eventId, x, y] of [[29, 12, 12], [33, 11, 9], [35, 9, 9], [39, 15, 9]]) {
        const child = map.events?.[eventId];
        expect(child?.name === "Crianca" && child.x === x && child.y === y, `E${eventId} anchor differs`);
        expect(child.pages?.[0]?.image?.direction === 8, `E${eventId} must begin facing the house`);
    }
});

check("protected_page_metadata", () => {
    expect(digest(pageMetadata(event)) === NON_LISTS_HASH, "E36 page metadata drifted");
    expect(digest(pageC) === PAGE_3_HASH, "E36 page C drifted");
});

check("single_materialization", () => {
    const animations = [...pageA.list, ...pageB.list].filter(command => command.code === 212 && command.parameters?.[1] === 35);
    expect(animations.length === 1, "Animation 35 must occur exactly once across E36");
    expect(JSON.stringify(animations[0].parameters) === JSON.stringify([33, 35, false]), "Animation 35 target or wait flag differs");
    expect(!pageB.list.some(command => command.code === 212), "page B must not repeat materialization");
});

check("entry_reveal_preserved", () => {
    const rheedRoute = routeAt(pageA, 0, [2, 4, 2, 16, 0]);
    expect(rheedRoute.index > 0 && digest(pageA.list.slice(0, rheedRoute.index)) === PAGE_A_PREFIX_HASH, "entry BGM/fade/animation/reveal prefix drifted");
    const animationAt = pageA.list.findIndex(command => command.code === 212);
    expect(pageA.list[animationAt + 1]?.code === 230 && pageA.list[animationAt + 1]?.parameters?.[0] === 60, "entry materialization wait must remain 60 frames");
});

check("sequential_gabs", () => {
    const gabs = pluginCommands(pageA, "GabTextOnly");
    expect(gabs.length === 4, "page A must contain exactly four Gabs");
    validateGab(gabs[0], RHEED_TEXT, 36, 48, 2);
    validateGab(gabs[1], CHILD_TEXT, 33, 36, 1);
    validateGab(gabs[2], UAU_TEXT, 29, 30, 2);
    validateGab(gabs[3], FINAL_RHEED_TEXT, 36, 42, 1);
    expect(gabs.every((gab, index) => index === 0 || pageA.list.indexOf(gabs[index - 1]) < pageA.list.indexOf(gab)), "Gab order differs");
});

let rheedRouteAt = -1;
let rheedGabAt = -1;
let e35SpinAt = -1;
let e39SpinAt = -1;
let e33ReactionAt = -1;
let childGabAt = -1;
let uauGabAt = -1;
let slowSpinAt = -1;
let finalGabAt = -1;

check("rheed_guidance_before_intro", () => {
    rheedRouteAt = validateRoute(pageA, 0, [{ code: 2 }, { code: 4 }, { code: 2 }, { code: 16 }]);
    rheedGabAt = pageA.list.findIndex(command => command.code === 357 && command.parameters?.[1] === "GabTextOnly");
    expect(rheedRouteAt < rheedGabAt, "Rheed must reach (9,5) before presenting the house");
    expect(rheedGabAt === rheedRouteAt + 5, "Rheed Gab must begin immediately after the waited route and its continuations");
    expect(!pageA.list.some(command => command.code === 205 && command.parameters?.[1]?.list?.some(entry => entry.parameters?.[0] === "Move to:5,5")), "old Move to:5,5 route remains");
});

check("rheed_intro_barrier", () => {
    const barriers = pluginCommands(pageA, "WaitForGab");
    expect(barriers.length === 4, "page A must contain four Gab completion barriers");
    const firstAt = pageA.list.indexOf(barriers[0]);
    expect(firstAt > rheedGabAt, "Rheed intro barrier must follow the presentation Gab");
    expect(pageA.list[firstAt - 1]?.code === 230 && pageA.list[firstAt - 1]?.parameters?.[0] === 18, "Rheed intro barrier must follow the 18-frame hold");
    expect(JSON.stringify(barriers[0].parameters) === JSON.stringify([
        "VisuMZ_4_GabWindow", "WaitForGab", "System: Wait For Gab Completion", {}
    ]), "Rheed intro barrier payload differs");
});

check("quick_spin_reactions", () => {
    const spin = [{ code: 20 }, { code: 20 }, { code: 20 }, { code: 20 }];
    e35SpinAt = validateRoute(pageA, 35, spin, false);
    e39SpinAt = validateRoute(pageA, 39, spin, false);
    e33ReactionAt = validateRoute(pageA, 33, [{ code: 19 }, { code: 14, parameters: [0, 0] }]);
    expect(e35SpinAt < e39SpinAt && e39SpinAt < e33ReactionAt, "quick spins must start before the waited E33 reaction");
    expect(e39SpinAt === e35SpinAt + 5 && e33ReactionAt === e39SpinAt + 5, "quick spins and E33 reaction must be launched as one synchronized block");
});

check("e33_spoken_reaction", () => {
    childGabAt = pageA.list.findIndex(command =>
        command.code === 357 && command.parameters?.[1] === "GabTextOnly" && command.parameters?.[3]?.["Text:json"] === JSON.stringify(CHILD_TEXT)
    );
    expect(childGabAt > e33ReactionAt, "E33 Gab must begin after the waited jump");
    const childBarrierAt = pageA.list.indexOf(pluginCommands(pageA, "WaitForGab")[1]);
    expect(pageA.list[childBarrierAt - 1]?.code === 230 && pageA.list[childBarrierAt - 1]?.parameters?.[0] === 12, "E33 Gab barrier must follow a 12-frame read hold");
    expect(childBarrierAt > childGabAt, "E33 Gab must finish before the slow reaction starts");
});

check("slow_spin_with_uau", () => {
    uauGabAt = pageA.list.findIndex(command =>
        command.code === 357 && command.parameters?.[1] === "GabTextOnly" && command.parameters?.[3]?.["Text:json"] === JSON.stringify(UAU_TEXT)
    );
    slowSpinAt = validateRoute(pageA, 29, [
        { code: 20 }, { code: 15, parameters: [10] },
        { code: 20 }, { code: 15, parameters: [10] },
        { code: 20 }, { code: 15, parameters: [10] },
        { code: 20 }
    ]);
    expect(uauGabAt < slowSpinAt, "Uau! must appear while E29 begins the slow spin");
    const thirdBarrierAt = pageA.list.indexOf(pluginCommands(pageA, "WaitForGab")[2]);
    expect(thirdBarrierAt > slowSpinAt + 7, "E29 waited route must finish before the Uau! barrier");
});

check("final_rheed_gab_and_close", () => {
    const barriers = pluginCommands(pageA, "WaitForGab");
    finalGabAt = pageA.list.findIndex(command =>
        command.code === 357 && command.parameters?.[1] === "GabTextOnly" && command.parameters?.[3]?.["Text:json"] === JSON.stringify(FINAL_RHEED_TEXT)
    );
    const finalAt = pageA.list.indexOf(barriers[3]);
    const previousAt = pageA.list.indexOf(barriers[2]);
    expect(finalGabAt > previousAt, "final Rheed Gab must begin only after all child reactions finish");
    expect(finalAt > finalGabAt, "final barrier must follow Rheed's closing Gab");
    expect(JSON.stringify(barriers[3].parameters) === JSON.stringify([
        "VisuMZ_4_GabWindow", "WaitForGab", "System: Wait For Gab Completion", {}
    ]), "final Rheed barrier payload differs");
    expect(pageA.list[finalAt + 1]?.code === 230 && pageA.list[finalAt + 1]?.parameters?.[0] === 12, "final hold must be 12 frames");
    expect(pageA.list[finalAt + 2]?.code === 123 && JSON.stringify(pageA.list[finalAt + 2].parameters) === JSON.stringify(["B", 0]), "Self Switch B must follow final hold");
    expect(pageA.list.at(-1)?.code === 0, "page A must retain terminal command");
});

check("quiet_page_b_fade", () => {
    expect(!pageB.list.some(command => command.code === 111 || command.code === 412), "obsolete page B animation guard remains");
    expect(!pageB.list.some(command => command.code === 230 && command.parameters?.[0] === 60), "page B still has the removed 60-frame wait");
    validateFadeRoute(pageB.list[0]);
});

check("cleanup_preserved", () => {
    const at = pageB.list.findIndex(command =>
        command.code === 355 && String(command.parameters?.[0] ?? "").startsWith(CLEANUP_PREFIX)
    );
    expect(at === 12, "cleanup must begin immediately after the 12-command fade block");
    expect(digest(pageB.list.slice(at)) === CLEANUP_HASH, "page B cleanup fingerprint differs");
});

check("no_extra_audiovisual_noise", () => {
    const forbiddenCodes = new Set([213, 224, 225, 250]);
    expect(![...pageA.list, ...pageB.list].some(command => forbiddenCodes.has(command.code)), "balloon, flash, shake, or SE was added to E36");
    expect(pluginCommands(pageA, "GabTextOnly").length === 4, "unexpected extra Gab detected");
});

const payload = failures.length === 0
    ? {
        status: "pass",
        map: RELATIVE_MAP_PATH,
        event_id: 36,
        checks: checks.length,
        failures: 0,
        cleanup_fingerprint: CLEANUP_HASH,
        runtime: "runtime_pending",
        runtime_pending: ["timing", "visual_readability", "pacing"]
    }
    : {
        status: "fail",
        map: RELATIVE_MAP_PATH,
        event_id: 36,
        checks: checks.length,
        failures: failures.length,
        details: failures,
        runtime: "runtime_pending",
        runtime_pending: ["timing", "visual_readability", "pacing"]
    };

process.stdout.write(`${JSON.stringify(payload)}\n`);
if (failures.length > 0) process.exitCode = 1;
