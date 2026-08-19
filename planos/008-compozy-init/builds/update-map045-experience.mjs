import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../../..");
const map045Relative = "frontend/data/Map045.json";
const map049Relative = "frontend/data/Map049.json";
const selectedBgm = "Theme5";

const sourceSurfaceHashes = Object.freeze({
    "Map045:E7": "a303e4030fcc720f9dfbdabff0a1834199f443f77ae549f52fe52d7d41f35e93",
    "Map045:E20": "6fa478ef32873f9d3e717b4e12fe36066663833c0505b85a3db094ef138e8b97",
    "Map045:E11:P3": "72a9f4ac2a34073203d40e91d1672543ea8653d522b2cc79d71e201d214ffd1d",
    "Map045:E12:P6": "3fc7054afc8b73142635395045252f41e4a5df4ef463b57dd5c4341be1c47548",
    "Map045:E36:P1": "4bbfc4187c1d0107de93b645473e1baca4fa9c13cb5c1896915d03ae19fd3496",
    "Map049:E1": "6dffaef56de1690abc9abba804283b18f270e37058d2fefcfa71853d7e0c930a"
});

const finalSurfaceHashes = Object.freeze({
    "Map045:E7": "a303e4030fcc720f9dfbdabff0a1834199f443f77ae549f52fe52d7d41f35e93",
    "Map045:E20": "6fa478ef32873f9d3e717b4e12fe36066663833c0505b85a3db094ef138e8b97",
    "Map045:E11:P3": "cb5001009edb7c9109837bf5a51193239c371a1010844a298510da5af545fe2c",
    "Map045:E12:P6": "76a1c2e05bf6af33c620cd44a02713aa1fc5f284f40a6047e09e0700dadd1427",
    "Map045:E36:P1": "bf22e0af0a90ff60464af706421324c3eb4ce345cac49a8f3e88dec8b7452677",
    "Map049:E1": "6dffaef56de1690abc9abba804283b18f270e37058d2fefcfa71853d7e0c930a"
});

const protectedHashes = Object.freeze({
    "Map045:E8": "0bf7b43335ad3083bbf556a9eac0adc7b6799a4032f5c150ce1045ea63adf060",
    "Map045:E10": "e9526a85e4c552a37480efbf2deedbeadf5b4ac65938f01d8161aabb129e141d",
    "Map045:E11:P5-P6": "5176cb9da058dc94efb3d41093b1b5d33c27bd3155b856620519e0a89c0f7d51",
    "Map049:E2": "f8e6934e54b1a182f4c050a627b18e24f94c208d2cdba6754a260567b7e342f1"
});

const fail = message => { throw new Error(`map045_experience_precondition_failed: ${message}`); };
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const shaValue = value => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");

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
    return { absolute, raw, bom, newline, trailingNewline, value };
}

function serialize(document) {
    const body = JSON.stringify(document.value, null, 4).replace(/\n/g, document.newline) +
        (document.trailingNewline ? document.newline : "");
    return (document.bom ? "\uFEFF" : "") + body;
}

function event(map, id, name) {
    const found = map.events?.[id];
    if (!found || found.id !== id || found.name !== name) fail(`semantic event anchor E${id} (${name}) is missing`);
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

function surfaceValues(map045, map049) {
    return {
        "Map045:E7": event(map045, 7, "Sair da Casa"),
        "Map045:E20": event(map045, 20, "Bau - Funda"),
        "Map045:E11:P3": event(map045, 11, "EX - Melia: pesadelos e estados").pages[2],
        "Map045:E12:P6": event(map045, 12, "Sáparo").pages[5],
        "Map045:E36:P1": event(map045, 36, "EX — Rheed: saída para Map045").pages[0],
        "Map049:E1": event(map049, 1, "VN - Casa Forjaprata: pesadelo e despertar")
    };
}

function assertSourceOrFinal(map045, map049) {
    const surfaces = surfaceValues(map045, map049);
    for (const [key, value] of Object.entries(surfaces)) {
        const hash = shaValue(value);
        if (hash === sourceSurfaceHashes[key] || hash === finalSurfaceHashes[key]) continue;
        fail(`${key} has an unclassified concurrent fingerprint ${hash}`);
    }
}

function assertProtected(map045, map049) {
    const values = {
        "Map045:E8": event(map045, 8, "Tordan"),
        "Map045:E10": event(map045, 10, "Troféu 2"),
        "Map045:E11:P5-P6": event(map045, 11, "EX - Melia: pesadelos e estados").pages.slice(4),
        "Map049:E2": event(map049, 2, "VN - Casa Forjaprata: segundo pesadelo e despertar")
    };
    for (const [key, expected] of Object.entries(protectedHashes)) {
        const actual = shaValue(values[key]);
        if (actual !== expected) fail(`protected fingerprint changed for ${key}: ${actual}`);
    }
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, shaValue(value)]));
}

function gabText(command) {
    try {
        return JSON.parse(command.parameters[3]["Text:json"]);
    } catch (error) {
        fail(`invalid Gab Text:json: ${error.message}`);
    }
}

function normalizeAutomaticGab(page) {
    if (page.trigger !== 3) fail("Map045 E11 P3 is no longer Autorun");
    const index = findExactly(page.list, command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly") &&
        gabText(command).includes("O jogo já começou"), "Map045 E11 P3 automatic Gab");
    const command = page.list[index];
    let override;
    try {
        override = JSON.parse(command.parameters[3]["Override:struct"]);
    } catch (error) {
        fail(`Map045 E11 P3 invalid Override:struct: ${error.message}`);
    }
    command.parameters[3]["ForceGab:eval"] = "false";
    override["BypassAntiRepeat:eval"] = "false";
    command.parameters[3]["Override:struct"] = JSON.stringify(override);
    const forceDisplay = page.list[index + 2];
    if (page.list[index + 1]?.code !== 657 || forceDisplay?.code !== 657 || page.list[index + 3]?.code !== 657) {
        fail("Map045 E11 P3 Gab does not retain its 357/657 continuation group");
    }
    forceDisplay.parameters[0] = "Force Gab? = false";
}

function isFinalAutomaticGab(page) {
    const command = page.list?.find(item => plugin(item, "VisuMZ_4_GabWindow", "GabTextOnly") && gabText(item).includes("O jogo já começou"));
    if (!command) return false;
    const override = JSON.parse(command.parameters[3]["Override:struct"]);
    return page.trigger === 3 && command.parameters[3]["ForceGab:eval"] === "false" &&
        override["BypassAntiRepeat:eval"] === "false" &&
        !page.list.some(item => plugin(item, "VisuMZ_4_GabWindow", "WaitForGab"));
}

function replaceInvalidAudio(page) {
    if (page.trigger !== 4) fail("Map045 E12 P6 is no longer Parallel");
    const index = findExactly(page.list, command => command.code === 241 &&
        ["Dungeon5", selectedBgm].includes(command.parameters?.[0]?.name), "Map045 E12 P6 BGM reference");
    page.list[index].parameters[0].name = selectedBgm;
}

function isFinalAudio(page) {
    const commands = page.list?.filter(command => command.code === 241) ?? [];
    return page.trigger === 4 && commands.length === 2 && commands.some(command => command.parameters?.[0]?.name === selectedBgm) &&
        commands.some(command => command.parameters?.[0]?.name === "") &&
        !commands.some(command => command.parameters?.[0]?.name === "Dungeon5");
}

function normalizeE36(page) {
    if (page.trigger !== 3) fail("Map045 E36 P1 is no longer Autorun");
    const gabs = page.list.filter(command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly"));
    const waits = page.list.filter(command => plugin(command, "VisuMZ_4_GabWindow", "WaitForGab"));
    const clears = page.list.filter(command => plugin(command, "VisuMZ_4_GabWindow", "ClearGab"));
    if (gabs.length === 1 && waits.length === 0 && clears.length === 0) return;
    if (gabs.length !== 3 || waits.length !== 3 || clears.length !== 1) {
        fail(`Map045 E36 P1 expected legacy Gab/Wait/Clear counts 3/3/1, found ${gabs.length}/${waits.length}/${clears.length}`);
    }
    const retained = gabs.find(command => gabText(command).includes("Casa da Família Forjaprata"));
    if (!retained || retained.parameters[3]["ForceGab:eval"] !== "false") fail("Map045 E36 retained optional Gab is missing or forced");
    const override = JSON.parse(retained.parameters[3]["Override:struct"]);
    if (override["BypassAntiRepeat:eval"] !== "false") fail("Map045 E36 retained optional Gab bypasses anti-repeat");

    const output = [];
    for (let index = 0; index < page.list.length; index += 1) {
        const command = page.list[index];
        if (plugin(command, "VisuMZ_4_GabWindow", "WaitForGab") || plugin(command, "VisuMZ_4_GabWindow", "ClearGab")) continue;
        if (plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly") && command !== retained) {
            if (!same(page.list.slice(index + 1, index + 4).map(item => item.code), [657, 657, 657])) {
                fail("Map045 E36 removable Gab does not retain its 357/657 continuation group");
            }
            index += 3;
            continue;
        }
        output.push(command);
    }
    page.list = output;
}

function isFinalE36(page) {
    const gabs = page.list?.filter(command => plugin(command, "VisuMZ_4_GabWindow", "GabTextOnly")) ?? [];
    if (page.trigger !== 3 || gabs.length !== 1 || !gabText(gabs[0]).includes("Casa da Família Forjaprata") ||
            page.list.some(command => plugin(command, "VisuMZ_4_GabWindow", "WaitForGab") ||
                plugin(command, "VisuMZ_4_GabWindow", "ClearGab"))) return false;
    const override = JSON.parse(gabs[0].parameters[3]["Override:struct"]);
    return gabs[0].parameters[3]["ForceGab:eval"] === "false" && override["BypassAntiRepeat:eval"] === "false" &&
        page.list.some(command => command.code === 123 && same(command.parameters, ["B", 0]));
}

function main() {
    const map045 = readStyledJson(map045Relative);
    const map049 = readStyledJson(map049Relative);
    assertSourceOrFinal(map045.value, map049.value);
    const beforeProtected = assertProtected(map045.value, map049.value);

    normalizeAutomaticGab(event(map045.value, 11, "EX - Melia: pesadelos e estados").pages[2]);
    replaceInvalidAudio(event(map045.value, 12, "Sáparo").pages[5]);
    normalizeE36(event(map045.value, 36, "EX — Rheed: saída para Map045").pages[0]);

    if (!isFinalAutomaticGab(event(map045.value, 11, "EX - Melia: pesadelos e estados").pages[2]) ||
            !isFinalAudio(event(map045.value, 12, "Sáparo").pages[5]) ||
            !isFinalE36(event(map045.value, 36, "EX — Rheed: saída para Map045").pages[0])) {
        fail("postconditions did not converge to the final experience contract");
    }
    const afterProtected = assertProtected(map045.value, map049.value);
    if (!same(beforeProtected, afterProtected)) fail("protected surfaces changed during mutation");

    const output = serialize(map045);
    if (output !== map045.raw) fs.writeFileSync(map045.absolute, output, "utf8");
    console.log(`PASS update-map045-experience (${output === map045.raw ? "already current" : "Map045 updated"})`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
    try {
        main();
    } catch (error) {
        console.error(`ERROR ${error.message}`);
        process.exitCode = 1;
    }
}
