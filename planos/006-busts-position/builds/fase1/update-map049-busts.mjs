import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = new URL("../../../../", import.meta.url);
const TARGET = new URL("frontend/data/Map049.json", PROJECT_ROOT);
const EXPECTED_SOURCE_SHA256 = "a3630d512c42953b705cfc2fb1623aa57bdc4641c075cc5431bd3feb9dd837d0";
const EXPECTED_PRE_CORRECTION_TERMINAL_SHA256 = "b238e0a86cf12926a265b82b234f47bd3fa41983a4c745c849690ec6bc0bcfc3";
const EXPECTED_CORRECTED_TERMINAL_SHA256 = "563fb83fb89db5fe2939077f82f00f2e6115a02a449f84e317422f9e83212764";
const TARGET_PATH = ["events", 1, "pages", 0, "list"];
const BUST_PLUGIN = "VisuMZ_2_VNPictureBusts";
const MELIA_ASSET = "Portraits/Principal/M\u00e9lia_desespero";
const LIFECYCLE = "terminal-aware-one-shot";

function fail(message) {
    throw new Error(message);
}

function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function same(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
}

function assert(condition, message) {
    if (!condition) fail(message);
}

function pathEquals(left, right) {
    return left.length === right.length && left.every((part, index) => part === right[index]);
}

function locateJsonPath(source, targetPath) {
    let index = 0;
    let match = null;

    function skipWhitespace() {
        while (index < source.length && /\s/.test(source[index])) index += 1;
    }

    function parseString() {
        skipWhitespace();
        const start = index;
        assert(source[index] === '"', `Expected JSON string at source offset ${index}`);
        index += 1;
        while (index < source.length) {
            if (source[index] === "\\") {
                index += 2;
            } else if (source[index] === '"') {
                index += 1;
                return JSON.parse(source.slice(start, index));
            } else {
                index += 1;
            }
        }
        fail(`Unterminated JSON string at source offset ${start}`);
    }

    function parseValue(path) {
        skipWhitespace();
        const start = index;
        const token = source[index];

        if (token === "{") {
            index += 1;
            skipWhitespace();
            if (source[index] !== "}") {
                while (true) {
                    const key = parseString();
                    skipWhitespace();
                    assert(source[index] === ":", `Expected ':' after JSON key at source offset ${index}`);
                    index += 1;
                    parseValue([...path, key]);
                    skipWhitespace();
                    if (source[index] === "}") break;
                    assert(source[index] === ",", `Expected ',' in JSON object at source offset ${index}`);
                    index += 1;
                }
            }
            index += 1;
        } else if (token === "[") {
            index += 1;
            skipWhitespace();
            let itemIndex = 0;
            if (source[index] !== "]") {
                while (true) {
                    parseValue([...path, itemIndex]);
                    itemIndex += 1;
                    skipWhitespace();
                    if (source[index] === "]") break;
                    assert(source[index] === ",", `Expected ',' in JSON array at source offset ${index}`);
                    index += 1;
                }
            }
            index += 1;
        } else if (token === '"') {
            parseString();
        } else {
            while (index < source.length && !/[\s,\]}]/.test(source[index])) index += 1;
            JSON.parse(source.slice(start, index));
        }

        const end = index;
        if (pathEquals(path, targetPath)) {
            assert(match === null, `JSON path ${targetPath.join(".")} resolved more than once`);
            match = { start, end };
        }
    }

    parseValue([]);
    skipWhitespace();
    assert(index === source.length, `Unexpected content after JSON document at source offset ${index}`);
    assert(match !== null, `JSON path ${targetPath.join(".")} was not found`);
    return match;
}

function isBustCommand(command, name = null) {
    return command?.code === 357
        && command.parameters?.[0] === BUST_PLUGIN
        && (name === null || command.parameters?.[1] === name);
}

function commandBlock(list, start) {
    assert(isBustCommand(list[start]), `Expected bust command at list index ${start}`);
    let end = start + 1;
    while (end < list.length && list[end].code === 657) end += 1;
    return { start, end, commands: list.slice(start, end) };
}

function uniqueBlock(list, predicate, label) {
    const starts = [];
    for (let index = 0; index < list.length; index += 1) {
        if (isBustCommand(list[index]) && predicate(list[index])) starts.push(index);
    }
    assert(starts.length === 1, `Expected one ${label} block, found ${starts.length}`);
    return commandBlock(list, starts[0]);
}

function enterContinuations(args, indent) {
    const values = [
        `Picture ID = ${args["PictureID:eval"]}`,
        `Picture File = ${args["PictureName:str"]}`,
        `Origin = ${args["Origin:str"]}`,
        `Screen Position = ${args["Position:num"]}`,
        `Start Offset X = ${args["StartOffsetX:eval"]}`,
        `Start Offset Y = ${args["StartOffsetY:eval"]}`,
        `Entrance Easing = ${args["EasingType:str"]}`,
        `Horizontal Mirror = ${args["HorzMirror:str"]}`,
        `Duration = ${args["Duration:eval"]}`,
    ];
    return values.map(value => ({ code: 657, indent, parameters: [value] }));
}

function exitContinuations(args, indent) {
    const values = [
        `Picture ID(s) = ${args["PictureID:arrayeval"]}`,
        `End Offset X = ${args["EndOffsetX:eval"]}`,
        `End Offset Y = ${args["EndOffsetY:eval"]}`,
        `Exit Easing = ${args["EasingType:str"]}`,
        `Flip Direction = ${args["FlipDirection:str"]}`,
        `Duration = ${args["Duration:eval"]}`,
        `Auto-Erase? = ${args["AutoErase:eval"]}`,
    ];
    return values.map(value => ({ code: 657, indent, parameters: [value] }));
}

function normalizedEnter(block, updates = {}) {
    const command = clone(block.commands[0]);
    const args = { ...command.parameters[3], ...updates };
    command.parameters[3] = args;
    return [command, ...enterContinuations(args, command.indent)];
}

function normalizedExit(block, pictureIds) {
    const command = clone(block.commands[0]);
    const args = { ...command.parameters[3], "PictureID:arrayeval": JSON.stringify(pictureIds) };
    command.parameters[3] = args;
    return [command, ...exitContinuations(args, command.indent)];
}

function graphicChange(block) {
    const source = block.commands[0];
    return {
        code: 357,
        indent: source.indent,
        parameters: [
            BUST_PLUGIN,
            "Basic_GraphicChange",
            "BASIC: Graphic Change",
            {
                "PictureID:eval": "2",
                "PictureName:str": "Portraits/Principal/Thorin_bobo",
            },
        ],
    };
}

function stripBustCommands(list) {
    const kept = [];
    for (let index = 0; index < list.length; index += 1) {
        if (isBustCommand(list[index])) {
            index = commandBlock(list, index).end - 1;
        } else {
            kept.push(list[index]);
        }
    }
    return kept;
}

function findCommands(list, predicate) {
    const results = [];
    list.forEach((command, index) => {
        if (predicate(command, index)) results.push({ command, index });
    });
    return results;
}

function assetEnter(list, asset) {
    return findCommands(list, command => isBustCommand(command, "Basic_EnterBust")
        && command.parameters[3]?.["PictureName:str"] === asset);
}

function validateContinuations(list) {
    for (let index = 0; index < list.length; index += 1) {
        const command = list[index];
        if (!isBustCommand(command)) continue;
        const block = commandBlock(list, index);
        const args = command.parameters[3];
        let expected = [];
        if (command.parameters[1] === "Basic_EnterBust") {
            expected = enterContinuations(args, command.indent);
        } else if (command.parameters[1] === "Basic_ExitBusts") {
            expected = exitContinuations(args, command.indent);
        } else if (command.parameters[1] === "Basic_GraphicChange") {
            expected = [];
        } else {
            fail(`Unexpected bust command ${command.parameters[1]} at list index ${index}`);
        }
        assert(same(block.commands.slice(1), expected), `Continuation payload mismatch at list index ${index}`);
        index = block.end - 1;
    }
}

function validateTerminal(list, expectedMeliaMirror = "Auto-Reverse") {
    assert(list.length === 105, `Expected terminal command count 105, found ${list.length}`);
    validateContinuations(list);

    const melia = assetEnter(list, MELIA_ASSET);
    const saparo = assetEnter(list, "Portraits/Principal/Sáparo_pistola");
    const thorin = assetEnter(list, "Portraits/Principal/Thorin_confusão");
    const rheed = assetEnter(list, "Portraits/Principal/Reed final");
    const boboEnter = assetEnter(list, "Portraits/Principal/Thorin_bobo");
    const boboChange = findCommands(list, command => isBustCommand(command, "Basic_GraphicChange")
        && same(command.parameters[3], {
            "PictureID:eval": "2",
            "PictureName:str": "Portraits/Principal/Thorin_bobo",
        }));
    assert(melia.length === 1 && melia[0].command.parameters[3]["PictureID:eval"] === "1"
        && melia[0].command.parameters[3]["Position:num"] === "9"
        && melia[0].command.parameters[3]["HorzMirror:str"] === expectedMeliaMirror,
    `Mélia terminal payload mismatch for mirror ${expectedMeliaMirror}`);
    assert(saparo.length === 1 && saparo[0].command.parameters[3]["PictureID:eval"] === "1"
        && saparo[0].command.parameters[3]["Position:num"] === "9", "Sáparo terminal payload mismatch");
    assert(thorin.length === 2 && thorin.every(item => item.command.parameters[3]["PictureID:eval"] === "2"
        && item.command.parameters[3]["Position:num"] === "1"), "Thorin_confusão terminal payload mismatch");
    assert(rheed.length === 1 && rheed[0].command.parameters[3]["PictureID:eval"] === "1"
        && rheed[0].command.parameters[3]["Position:num"] === "9", "Rheed terminal payload mismatch");
    assert(boboEnter.length === 0, "Thorin_bobo must not use Basic_EnterBust");
    assert(boboChange.length === 1, `Expected one Thorin_bobo Basic_GraphicChange, found ${boboChange.length}`);
    assert(list[boboChange[0].index + 1]?.code !== 657, "Basic_GraphicChange must not retain code 657 continuations");

    const ce16 = findCommands(list, command => command.code === 117 && same(command.parameters, [16]));
    const exits = findCommands(list, command => isBustCommand(command, "Basic_ExitBusts"));
    const monster = findCommands(list, command => command.code === 231 && command.parameters?.[1] === "SF_Monster_3");
    const finalText = findCommands(list, command => command.code === 401
        && command.parameters?.[0]?.startsWith("Saudações, aventureiro!"));
    const asserts = findCommands(list, command => command.code === 357
        && command.parameters?.[0] === "Coreto_QuestVN"
        && command.parameters?.[1] === "AssertVisualNovelSession");
    const finishes = findCommands(list, command => command.code === 357
        && command.parameters?.[0] === "Coreto_QuestVN"
        && command.parameters?.[1] === "FinishVisualNovel");
    assert(ce16.length === 2, `Expected two CE16 calls, found ${ce16.length}`);
    assert(exits.length === 3, `Expected three bust exits, found ${exits.length}`);
    assert(monster.length === 1 && finalText.length === 1, "Monster interlude or final text anchor mismatch");
    assert(asserts.length === 1 && finishes.length === 1, "VN Assert/Finish count mismatch");
    assert(exits[0].command.parameters[3]["PictureID:arrayeval"] === '["1","2"]', "First exit must remove Pictures 1 and 2");
    assert(exits[1].command.parameters[3]["PictureID:arrayeval"] === '["1"]', "Second exit must remove only Picture 1");
    assert(exits[2].command.parameters[3]["PictureID:arrayeval"] === '["1","2"]', "Final exit must remove Pictures 1 and 2");

    const ordered = [melia[0].index, thorin[0].index, ce16[0].index, exits[0].index, monster[0].index,
        saparo[0].index, thorin[1].index, ce16[1].index, boboChange[0].index, exits[1].index,
        rheed[0].index, finalText[0].index, exits[2].index, finishes[0].index];
    assert(ordered.every((value, index) => index === 0 || ordered[index - 1] < value), "Terminal lifecycle anchors are out of order");

    const active = new Set();
    for (let index = 0; index < list.length; index += 1) {
        const command = list[index];
        if (isBustCommand(command, "Basic_EnterBust")) active.add(command.parameters[3]["PictureID:eval"]);
        if (isBustCommand(command, "Basic_GraphicChange")) {
            assert(active.has(command.parameters[3]["PictureID:eval"]), `GraphicChange targets inactive Picture at ${index}`);
        }
        if (command.code === 117 && same(command.parameters, [16])) {
            assert(active.has("1") && active.has("2"), `Pictures 1 and 2 must be active at CE16 index ${index}`);
        }
        if (command.code === 231 && command.parameters?.[1] === "SF_Monster_3") {
            assert(active.size === 0, "Busts must be inactive before SF_Monster_3");
        }
        if (command.code === 401 && command.parameters?.[0]?.startsWith("Saudações, aventureiro!")) {
            assert(active.has("1") && active.has("2"), "Pictures 1 and 2 must be active during the final Rheed line");
        }
        if (isBustCommand(command, "Basic_ExitBusts")) {
            for (const pictureId of JSON.parse(command.parameters[3]["PictureID:arrayeval"])) active.delete(pictureId);
        }
        if (command.code === 357 && command.parameters?.[0] === "Coreto_QuestVN"
            && command.parameters?.[1] === "FinishVisualNovel") {
            assert(active.size === 0, "Bust lifecycle must be clean before FinishVisualNovel");
        }
    }
}

function transform(list) {
    assert(list.length === 104, `Expected source command count 104, found ${list.length}`);
    const melia = uniqueBlock(list, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === MELIA_ASSET, "Mélia entry");
    const saparo = uniqueBlock(list, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === "Portraits/Principal/Sáparo_pistola", "Sáparo entry");
    const confusion = uniqueBlock(list, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === "Portraits/Principal/Thorin_confusão", "Thorin_confusão entry");
    const bobo = uniqueBlock(list, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === "Portraits/Principal/Thorin_bobo", "Thorin_bobo entry");
    const rheed = uniqueBlock(list, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === "", "empty final NPC entry");
    const exits = findCommands(list, command => isBustCommand(command, "Basic_ExitBusts"))
        .map(item => commandBlock(list, item.index));
    const ce16 = findCommands(list, command => command.code === 117 && same(command.parameters, [16]));
    assert(exits.length === 3, `Expected three source exits, found ${exits.length}`);
    assert(ce16.length === 2, `Expected two source CE16 calls, found ${ce16.length}`);
    assert(exits[0].commands[0].parameters[3]["PictureID:arrayeval"] === '["1"]', "Unexpected first source exit payload");
    assert(exits[1].commands[0].parameters[3]["PictureID:arrayeval"] === '["1","2"]', "Unexpected second source exit payload");
    assert(exits[2].commands[0].parameters[3]["PictureID:arrayeval"] === '["1"]', "Unexpected final source exit payload");
    assert(melia.start < ce16[0].index && ce16[0].index < exits[0].start, "Unexpected first scene anchor order");
    assert(exits[0].start < saparo.start && saparo.start < ce16[1].index && ce16[1].index < confusion.start,
        "Unexpected second scene anchor order");
    assert(confusion.end === bobo.start && bobo.end === exits[1].start, "Unexpected Thorin transition anchor order");
    assert(exits[1].end === rheed.start && rheed.end < exits[2].start, "Unexpected final scene anchor order");

    const transformed = [];
    for (let index = 0; index < list.length; index += 1) {
        if (index === melia.start) {
            transformed.push(...normalizedEnter(melia, {
                "Position:num": "9",
                "HorzMirror:str": "Auto-Reverse",
            }));
            index = melia.end - 1;
        } else if (index === saparo.start) {
            transformed.push(...normalizedEnter(saparo));
            index = saparo.end - 1;
        } else if (index === confusion.start) {
            index = confusion.end - 1;
        } else if (index === bobo.start) {
            transformed.push(graphicChange(bobo));
            index = bobo.end - 1;
        } else if (index === rheed.start) {
            transformed.push(...normalizedEnter(rheed, {
                "PictureName:str": "Portraits/Principal/Reed final",
                "Position:num": "9",
            }));
            index = rheed.end - 1;
        } else if (index === exits[0].start) {
            transformed.push(...normalizedExit(exits[0], ["1", "2"]));
            index = exits[0].end - 1;
        } else if (index === exits[1].start) {
            transformed.push(...normalizedExit(exits[1], ["1"]));
            index = exits[1].end - 1;
        } else if (index === exits[2].start) {
            transformed.push(...normalizedExit(exits[2], ["1", "2"]));
            index = exits[2].end - 1;
        } else if (list[index].code === 117 && same(list[index].parameters, [16])) {
            transformed.push(...normalizedEnter(confusion));
            transformed.push(clone(list[index]));
        } else {
            transformed.push(clone(list[index]));
        }
    }

    assert(same(stripBustCommands(list), stripBustCommands(transformed)), "Non-bust command sequence changed");
    validateTerminal(transformed);
    return transformed;
}

function correctTerminalFacing(list) {
    validateTerminal(list, "Auto");
    const transformed = clone(list);
    const melia = uniqueBlock(transformed, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === MELIA_ASSET, "Mélia entry");
    const mirrorContinuations = [];
    for (let index = melia.start + 1; index < melia.end; index += 1) {
        if (transformed[index].parameters?.[0] === "Horizontal Mirror = Auto") mirrorContinuations.push(index);
    }
    assert(mirrorContinuations.length === 1,
        `Expected one Mélia mirror continuation, found ${mirrorContinuations.length}`);
    transformed[melia.start].parameters[3]["HorzMirror:str"] = "Auto-Reverse";
    transformed[mirrorContinuations[0]].parameters[0] = "Horizontal Mirror = Auto-Reverse";
    assert(transformed.length === list.length, "Facing correction changed the command count");
    const changedIndexes = [melia.start, mirrorContinuations[0]];
    for (let index = 0; index < list.length; index += 1) {
        if (!changedIndexes.includes(index)) {
            assert(same(transformed[index], list[index]), `Facing correction changed command index ${index}`);
        }
    }
    validateTerminal(transformed);
    return transformed;
}

function parseTarget(buffer) {
    const source = buffer.toString("utf8");
    assert(buffer.length > 0 && source.charCodeAt(0) !== 0xFEFF, "Target must remain UTF-8 without BOM");
    assert(source.endsWith("\r\n"), "Target must retain its CRLF trailing newline");
    assert(!/(?<!\r)\n/.test(source), "Target contains a bare LF; refusing style drift");
    const data = JSON.parse(source);
    assert(data.events?.[1]?.id === 1, "Map049 Event 1 identity mismatch");
    assert(data.events[1].pages?.length === 1, "Map049 Event 1 page count mismatch");
    const span = locateJsonPath(source, TARGET_PATH);
    assert(same(JSON.parse(source.slice(span.start, span.end)), data.events[1].pages[0].list), "Located list span does not match parsed target path");
    return { source, data, span, list: data.events[1].pages[0].list };
}

function serializeList(list, source, span) {
    const lineStart = source.lastIndexOf("\n", span.start - 1) + 1;
    const linePrefix = source.slice(lineStart, span.start);
    const indent = linePrefix.match(/^[ \t]*/)?.[0] ?? "";
    assert(indent.length === 20 && !indent.includes("\t"), `Unexpected list property indentation: ${indent.length}`);
    return JSON.stringify(list, null, 4).replace(/\n/g, `\r\n${indent}`);
}

function verifyOriginalBaseline() {
    const gitBuffer = execFileSync("git", ["show", "HEAD:frontend/data/Map049.json"], {
        cwd: fileURLToPath(PROJECT_ROOT),
        encoding: "buffer",
        maxBuffer: 16 * 1024 * 1024,
    });
    const normalizedBuffer = Buffer.from(gitBuffer.toString("utf8").replace(/\r?\n/g, "\r\n"), "utf8");
    assert(sha256(normalizedBuffer) === EXPECTED_SOURCE_SHA256,
        `Original baseline fixture drift: found ${sha256(normalizedBuffer)}`);
    const original = parseTarget(normalizedBuffer);
    const transformed = transform(original.list);
    const replacement = serializeList(transformed, original.source, original.span);
    const nextSource = original.source.slice(0, original.span.start) + replacement + original.source.slice(original.span.end);
    const nextBuffer = Buffer.from(nextSource, "utf8");
    const corrected = parseTarget(nextBuffer);
    validateTerminal(corrected.list);
    assert(nextSource.slice(0, original.span.start) === original.source.slice(0, original.span.start),
        "Original-baseline verification changed the prefix outside the list");
    assert(nextSource.slice(corrected.span.end) === original.source.slice(original.span.end),
        "Original-baseline verification changed the suffix outside the list");
    assert(sha256(nextBuffer) === EXPECTED_CORRECTED_TERMINAL_SHA256,
        `Original baseline did not converge to corrected terminal hash: found ${sha256(nextBuffer)}`);
    console.log(JSON.stringify({
        lifecycle: LIFECYCLE,
        result: "original-baseline-verified",
        sourceSha256: EXPECTED_SOURCE_SHA256,
        correctedSha256: EXPECTED_CORRECTED_TERMINAL_SHA256,
        commandCount: corrected.list.length,
    }));
}

function verifyPreCorrectionLineage() {
    const correctedBuffer = fs.readFileSync(TARGET);
    assert(sha256(correctedBuffer) === EXPECTED_CORRECTED_TERMINAL_SHA256,
        `Corrected terminal fixture drift: found ${sha256(correctedBuffer)}`);
    const corrected = parseTarget(correctedBuffer);
    validateTerminal(corrected.list);
    const reverted = clone(corrected.list);
    const melia = uniqueBlock(reverted, command => command.parameters[1] === "Basic_EnterBust"
        && command.parameters[3]?.["PictureName:str"] === MELIA_ASSET, "Mélia entry");
    const mirrorContinuations = [];
    for (let index = melia.start + 1; index < melia.end; index += 1) {
        if (reverted[index].parameters?.[0] === "Horizontal Mirror = Auto-Reverse") mirrorContinuations.push(index);
    }
    assert(mirrorContinuations.length === 1,
        `Expected one corrected Mélia mirror continuation, found ${mirrorContinuations.length}`);
    reverted[melia.start].parameters[3]["HorzMirror:str"] = "Auto";
    reverted[mirrorContinuations[0]].parameters[0] = "Horizontal Mirror = Auto";
    const replacement = serializeList(reverted, corrected.source, corrected.span);
    const priorSource = corrected.source.slice(0, corrected.span.start) + replacement + corrected.source.slice(corrected.span.end);
    const priorBuffer = Buffer.from(priorSource, "utf8");
    const prior = parseTarget(priorBuffer);
    validateTerminal(prior.list, "Auto");
    assert(priorSource.slice(0, corrected.span.start) === corrected.source.slice(0, corrected.span.start),
        "Pre-correction lineage verification changed the prefix outside the list");
    assert(priorSource.slice(prior.span.end) === corrected.source.slice(corrected.span.end),
        "Pre-correction lineage verification changed the suffix outside the list");
    assert(sha256(priorBuffer) === EXPECTED_PRE_CORRECTION_TERMINAL_SHA256,
        `Reverting only the approved facing fields did not restore the pre-correction hash: found ${sha256(priorBuffer)}`);
    console.log(JSON.stringify({
        lifecycle: LIFECYCLE,
        result: "pre-correction-lineage-verified",
        preCorrectionSha256: EXPECTED_PRE_CORRECTION_TERMINAL_SHA256,
        correctedSha256: EXPECTED_CORRECTED_TERMINAL_SHA256,
        changedCommandIndexes: [melia.start, mirrorContinuations[0]],
    }));
}

function main() {
    const initialBuffer = fs.readFileSync(TARGET);
    const initialHash = sha256(initialBuffer);
    const initial = parseTarget(initialBuffer);

    if (EXPECTED_CORRECTED_TERMINAL_SHA256 && initialHash === EXPECTED_CORRECTED_TERMINAL_SHA256) {
        validateTerminal(initial.list);
        console.log(JSON.stringify({ lifecycle: LIFECYCLE, result: "already-terminal", sha256: initialHash, commandCount: initial.list.length }));
        return;
    }

    let transformed;
    let sourceState;
    if (initialHash === EXPECTED_SOURCE_SHA256) {
        transformed = transform(initial.list);
        sourceState = "original-baseline";
    } else if (initialHash === EXPECTED_PRE_CORRECTION_TERMINAL_SHA256) {
        transformed = correctTerminalFacing(initial.list);
        sourceState = "pre-correction-terminal";
    } else {
        fail(`Target drift: expected original ${EXPECTED_SOURCE_SHA256}, pre-correction terminal ${EXPECTED_PRE_CORRECTION_TERMINAL_SHA256}, or corrected terminal ${EXPECTED_CORRECTED_TERMINAL_SHA256 ?? "pending-first-application"}; found ${initialHash}`);
    }
    const replacement = serializeList(transformed, initial.source, initial.span);
    const nextSource = initial.source.slice(0, initial.span.start) + replacement + initial.source.slice(initial.span.end);
    const nextBuffer = Buffer.from(nextSource, "utf8");
    const prepared = parseTarget(nextBuffer);
    validateTerminal(prepared.list);
    assert(nextSource.slice(0, initial.span.start) === initial.source.slice(0, initial.span.start), "Prepared prefix outside list changed");
    assert(nextSource.slice(prepared.span.end) === initial.source.slice(initial.span.end), "Prepared suffix outside list changed");

    const immediateBuffer = fs.readFileSync(TARGET);
    const immediateHash = sha256(immediateBuffer);
    assert(immediateHash === initialHash, `Target drift immediately before save: found ${immediateHash}`);
    const immediate = parseTarget(immediateBuffer);
    assert(immediate.span.start === initial.span.start && immediate.span.end === initial.span.end, "Target list boundaries drifted immediately before save");
    assert(same(immediate.list, initial.list), "Target list drifted immediately before save");

    fs.writeFileSync(TARGET, nextBuffer);
    const persistedBuffer = fs.readFileSync(TARGET);
    const persisted = parseTarget(persistedBuffer);
    validateTerminal(persisted.list);
    assert(persisted.source.slice(0, initial.span.start) === initial.source.slice(0, initial.span.start), "Persisted prefix outside list changed");
    assert(persisted.source.slice(persisted.span.end) === initial.source.slice(initial.span.end), "Persisted suffix outside list changed");
    console.log(JSON.stringify({
        lifecycle: LIFECYCLE,
        result: "applied",
        sourceState,
        preSha256: initialHash,
        postSha256: sha256(persistedBuffer),
        preCommandCount: initial.list.length,
        postCommandCount: persisted.list.length,
    }));
}

try {
    if (process.argv.includes("--verify-original-baseline")) {
        verifyOriginalBaseline();
    } else if (process.argv.includes("--verify-pre-correction-lineage")) {
        verifyPreCorrectionLineage();
    } else {
        main();
    }
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
    process.exitCode = 1;
}
