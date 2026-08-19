#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../..");
const MAP_PATH = path.join(PROJECT_ROOT, "frontend/data/Map045.json");
const RELATIVE_MAP_PATH = "frontend/data/Map045.json";

const SOURCE_EVENT_HASH = "e5b4e91eb256749184d19564e1c44d73ffac859ddbad1d47ae5fef63731e59bc";
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

function result(payload, exitCode = 0) {
    process.stdout.write(`${JSON.stringify(payload)}\n`);
    process.exitCode = exitCode;
}

function block(code, extra = {}) {
    result({ status: "blocked", code, ...extra }, 1);
}

function pageMetadata(event) {
    return event.pages.map(page => {
        const copy = { ...page };
        delete copy.list;
        return copy;
    });
}

function cleanupIndex(page) {
    return page.list.findIndex(command =>
        command.code === 355 && String(command.parameters?.[0] ?? "").startsWith(CLEANUP_PREFIX)
    );
}

function pluginCommands(page, name) {
    return page.list.filter(command =>
        command.code === 357 &&
        command.parameters?.[0] === "VisuMZ_4_GabWindow" &&
        command.parameters?.[1] === name
    );
}

function routeCodes(command) {
    return command.parameters?.[1]?.list?.map(entry => entry.code) ?? [];
}

function hasRoute(page, target, codes, wait, specialParameters = null) {
    return page.list.some(command => {
        if (command.code !== 205 || command.parameters?.[0] !== target || command.parameters?.[1]?.wait !== wait) {
            return false;
        }
        if (JSON.stringify(routeCodes(command)) !== JSON.stringify(codes)) {
            return false;
        }
        if (specialParameters) {
            return specialParameters.every(({ code, parameters, occurrence = 0 }) => {
                const entries = command.parameters[1].list.filter(entry => entry.code === code);
                return JSON.stringify(entries[occurrence]?.parameters) === JSON.stringify(parameters);
            });
        }
        return true;
    });
}

function gabMatches(command, text, eventId, waitTime, timePerCharacter) {
    if (command.parameters?.[2] !== "Gab: Text Only") return false;
    const args = command.parameters?.[3] ?? {};
    if (args["Text:json"] !== JSON.stringify(text) || args["ForceGab:eval"] !== "false") return false;
    let override;
    try {
        override = JSON.parse(args["Override:struct"]);
    } catch {
        return false;
    }
    return override["EventID:num"] === String(eventId) &&
        override["WaitTime:num"] === String(waitTime) &&
        override["TimePerCharacter:num"] === String(timePerCharacter) &&
        Object.keys(override).length === 3;
}

function isApplied(event) {
    if (!event || event.id !== 36 || event.pages?.length !== 3) return false;
    const [pageA, pageB, pageC] = event.pages;
    const rheedRouteIndex = pageA.list.findIndex(command =>
        command.code === 205 &&
        command.parameters?.[0] === 0 &&
        JSON.stringify(routeCodes(command)) === JSON.stringify([2, 4, 2, 16, 0])
    );
    const cleanupAt = cleanupIndex(pageB);
    if (rheedRouteIndex < 0 || cleanupAt < 0) return false;
    if (digest(pageA.list.slice(0, rheedRouteIndex)) !== PAGE_A_PREFIX_HASH) return false;
    if (digest(pageB.list.slice(cleanupAt)) !== CLEANUP_HASH) return false;
    if (digest(pageMetadata(event)) !== NON_LISTS_HASH || digest(pageC) !== PAGE_3_HASH) return false;

    const gabs = pluginCommands(pageA, "GabTextOnly");
    const waits = pluginCommands(pageA, "WaitForGab");
    const animation35 = [...pageA.list, ...pageB.list].filter(command =>
        command.code === 212 && command.parameters?.[1] === 35
    );

    return gabs.length === 4 &&
        gabMatches(gabs[0], RHEED_TEXT, 36, 48, 2) &&
        gabMatches(gabs[1], CHILD_TEXT, 33, 36, 1) &&
        gabMatches(gabs[2], UAU_TEXT, 29, 30, 2) &&
        gabMatches(gabs[3], FINAL_RHEED_TEXT, 36, 42, 1) &&
        waits.length === 4 &&
        animation35.length === 1 &&
        pageB.list[0]?.code === 205 &&
        !pageB.list.some(command => command.code === 111 || command.code === 212 || command.code === 412) &&
        hasRoute(pageA, 0, [2, 4, 2, 16, 0], true) &&
        hasRoute(pageA, 35, [20, 20, 20, 20, 0], false) &&
        hasRoute(pageA, 39, [20, 20, 20, 20, 0], false) &&
        hasRoute(pageA, 33, [19, 14, 0], true, [{ code: 14, parameters: [0, 0] }]) &&
        hasRoute(pageA, 29, [20, 15, 20, 15, 20, 15, 20, 0], true, [
            { code: 15, parameters: [10], occurrence: 0 },
            { code: 15, parameters: [10], occurrence: 1 },
            { code: 15, parameters: [10], occurrence: 2 }
        ]);
}

function movementEntry(code, parameters) {
    const entry = { code };
    if (parameters !== undefined) entry.parameters = parameters;
    entry.indent = null;
    return entry;
}

function movementRoute(target, entries, wait = true) {
    const routeEntries = [...entries, { code: 0 }];
    const route = {
        list: routeEntries,
        repeat: false,
        skippable: false,
        wait
    };
    return [
        { code: 205, indent: 0, parameters: [target, route] },
        ...entries.map(entry => ({ code: 505, indent: 0, parameters: [structuredClone(entry)] }))
    ];
}

function gab(text, eventId, waitTime, timePerCharacter) {
    const override = JSON.stringify({
        "EventID:num": String(eventId),
        "WaitTime:num": String(waitTime),
        "TimePerCharacter:num": String(timePerCharacter)
    });
    return [
        {
            code: 357,
            indent: 0,
            parameters: [
                "VisuMZ_4_GabWindow",
                "GabTextOnly",
                "Gab: Text Only",
                {
                    "Text:json": JSON.stringify(text),
                    "ForceGab:eval": "false",
                    "Override:struct": override
                }
            ]
        },
        { code: 657, indent: 0, parameters: [`Text = ${JSON.stringify(text)}`] },
        { code: 657, indent: 0, parameters: ["Force Gab? = false"] },
        { code: 657, indent: 0, parameters: [`Optional Settings = ${override}`] }
    ];
}

function waitForGab() {
    return {
        code: 357,
        indent: 0,
        parameters: [
            "VisuMZ_4_GabWindow",
            "WaitForGab",
            "System: Wait For Gab Completion",
            {}
        ]
    };
}

function validateSource(map, event) {
    const childAnchors = [
        [29, 12, 12],
        [33, 11, 9],
        [35, 9, 9],
        [39, 15, 9]
    ];
    for (const [eventId, x, y] of childAnchors) {
        const child = map.events?.[eventId];
        if (!child || child.id !== eventId || child.name !== "Crianca") {
            throw Object.assign(new Error(`E${eventId} missing`), { code: "event_missing", event_id: eventId });
        }
        if (child.x !== x || child.y !== y || child.pages?.[0]?.image?.direction !== 8) {
            throw Object.assign(new Error(`E${eventId} anchor changed`), { code: "precondition_mismatch", anchor: `map045.event${eventId}` });
        }
    }
    if (!event || digest(event) !== SOURCE_EVENT_HASH) {
        throw Object.assign(new Error("E36 source changed"), { code: "precondition_mismatch", anchor: "map045.event36" });
    }
    if (digest(pageMetadata(event)) !== NON_LISTS_HASH || digest(event.pages[2]) !== PAGE_3_HASH) {
        throw Object.assign(new Error("E36 page metadata changed"), { code: "precondition_mismatch", anchor: "map045.event36.pages" });
    }

    const [pageA, pageB] = event.pages;
    const gabAt = pageA.list.findIndex(command =>
        command.code === 357 && command.parameters?.[0] === "VisuMZ_4_GabWindow" && command.parameters?.[1] === "GabTextOnly"
    );
    const cleanupAt = cleanupIndex(pageB);
    if (gabAt < 0 || digest(pageA.list.slice(0, gabAt)) !== PAGE_A_PREFIX_HASH) {
        throw Object.assign(new Error("reveal anchor changed"), { code: "precondition_mismatch", anchor: "map045.event36.pageA.reveal" });
    }
    if (cleanupAt < 0 || digest(pageB.list.slice(cleanupAt)) !== CLEANUP_HASH) {
        throw Object.assign(new Error("cleanup changed"), { code: "cleanup_mismatch", event_id: 36 });
    }

    if (cleanupAt !== 12 || pageB.list[0]?.code !== 205 || pageB.list.some(command => command.code === 212)) {
        throw Object.assign(new Error("page B anchor changed"), { code: "precondition_mismatch", anchor: "map045.event36.pageB" });
    }

    return { gabAt };
}

function transform(event, anchors) {
    const next = structuredClone(event);
    const [pageA] = next.pages;
    const reveal = pageA.list.slice(0, anchors.gabAt);

    pageA.list = [
        ...reveal,
        ...movementRoute(0, [movementEntry(2), movementEntry(4), movementEntry(2), movementEntry(16)]),
        ...gab(RHEED_TEXT, 36, 48, 2),
        { code: 230, indent: 0, parameters: [18] },
        waitForGab(),
        ...movementRoute(35, [movementEntry(20), movementEntry(20), movementEntry(20), movementEntry(20)], false),
        ...movementRoute(39, [movementEntry(20), movementEntry(20), movementEntry(20), movementEntry(20)], false),
        ...movementRoute(33, [movementEntry(19), movementEntry(14, [0, 0])]),
        ...gab(CHILD_TEXT, 33, 36, 1),
        { code: 230, indent: 0, parameters: [12] },
        waitForGab(),
        ...gab(UAU_TEXT, 29, 30, 2),
        ...movementRoute(29, [
            movementEntry(20),
            movementEntry(15, [10]),
            movementEntry(20),
            movementEntry(15, [10]),
            movementEntry(20),
            movementEntry(15, [10]),
            movementEntry(20)
        ]),
        waitForGab(),
        ...gab(FINAL_RHEED_TEXT, 36, 42, 1),
        waitForGab(),
        { code: 230, indent: 0, parameters: [12] },
        { code: 123, indent: 0, parameters: ["B", 0] },
        { code: 0, indent: 0, parameters: [] }
    ];
    return next;
}

function formattedEvent(event) {
    return JSON.stringify(event, null, 4)
        .split("\n")
        .map(line => `        ${line}`)
        .join("\n");
}

const mode = process.argv[2] ?? "--apply";
if (!["--check", "--apply"].includes(mode) || process.argv.length > 3) {
    result({ status: "blocked", code: "invalid_arguments", usage: "node apply-rework-cutscene-rheed.mjs [--check|--apply]" }, 1);
} else {
    let raw;
    let map;
    try {
        raw = fs.readFileSync(MAP_PATH, "utf8");
        map = JSON.parse(raw);
    } catch (error) {
        block("json_parse_failed", { map: RELATIVE_MAP_PATH, message: error.message });
    }

    if (map) {
        const event = map.events?.[36];
        if (isApplied(event)) {
            result({ status: "no_op", map: RELATIVE_MAP_PATH, event_id: 36, changes: 0 });
        } else {
            let anchors;
            try {
                anchors = validateSource(map, event);
            } catch (error) {
                block(error.code ?? "precondition_mismatch", {
                    ...(error.anchor ? { anchor: error.anchor } : {}),
                    ...(error.event_id ? { event_id: error.event_id } : {})
                });
            }

            if (anchors) {
                const currentText = formattedEvent(event);
                const first = raw.indexOf(currentText);
                const second = first >= 0 ? raw.indexOf(currentText, first + currentText.length) : -1;
                if (first < 0 || second >= 0) {
                    block("source_span_mismatch", { anchor: "map045.event36", occurrences: first < 0 ? 0 : 2 });
                } else {
                    const nextEvent = transform(event, anchors);
                    if (!isApplied(nextEvent)) {
                        block("internal_validation_failed", { anchor: "map045.event36.target" });
                    } else if (mode === "--check") {
                        result({ status: "ready", map: RELATIVE_MAP_PATH, event_id: 36, changes: 1 });
                    } else {
                        const nextText = formattedEvent(nextEvent);
                        const nextRaw = raw.slice(0, first) + nextText + raw.slice(first + currentText.length);
                        const temporaryPath = `${MAP_PATH}.rework-cutscene-rheed.tmp`;
                        try {
                            JSON.parse(nextRaw);
                            fs.writeFileSync(temporaryPath, nextRaw, "utf8");
                            JSON.parse(fs.readFileSync(temporaryPath, "utf8"));
                            fs.renameSync(temporaryPath, MAP_PATH);
                            const persisted = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
                            if (!isApplied(persisted.events?.[36])) throw new Error("persisted target did not validate");
                            result({ status: "applied", map: RELATIVE_MAP_PATH, event_id: 36, changes: 1 });
                        } catch (error) {
                            if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
                            block("write_failed", { map: RELATIVE_MAP_PATH, message: error.message });
                        }
                    }
                }
            }
        }
    }
}
