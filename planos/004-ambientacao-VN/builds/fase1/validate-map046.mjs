import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const MAP_REL = "frontend/data/Map046.json";
const MAP_PATH = path.join(ROOT, MAP_REL);
const OUTPUT_DIR = path.join(ROOT, "planos/004-ambientacao-VN/builds/fase1");
const VALIDATION_PATH = path.join(OUTPUT_DIR, "task-1.1-validation.json");
const COMPLETION_PATH = path.join(OUTPUT_DIR, "task-1.1-completion.json");
const BASELINE_SHA256 = "73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2";

const EXPECTED_DIALOGUES = [
    "Ora, ora... vejam só quem chegou atrasado! Venha, pequeno — uma boa história não começa sem o último ouvinte.",
    "Hum... esse rosto não me é estranho. Deixe este velho testar a memória: Dulgarin, não é?",
    "A-ha! Eu sabia! Ainda há boas histórias guardadas nesta cabeça velha — e alguns nomes também.",
    "Como você sabia o meu nome?!",
    "Sou contador de histórias, pequeno! Conheço as histórias de Daratrine... e os nomes de quem vem escutá-las.",
    "Quase acertou, miseravi! Errou só a pronúncia, todas as letras... e a pessoa. Eu não sou Dulgarin. Meu nome é...",
    "Agora sim, é um prazer conhecer você, \\N[1]! Acomode-se — a nossa verdadeira história está só começando...",
    "Ah, Daratrine... Como eu amo esta cidade! Difícil imaginar que ela já foi apenas um refúgio para soldados feridos. Por muito pouco, seu nome não desapareceu do mapa.",
    "Mas, para entender como Daratrine chegou até aqui, precisamos voltar a Gildrat, o Império dos Anões.",
    "E é em Gildrat que a nossa história encontra Thorin — um anão tão cabeça-dura que discutiria até com uma montanha!",
    "Agora, fechem os olhos... Respirem fundo. Deixem que o encanto desta antiga poção nos transporte até Gildrat, quando tudo começou."
];

const ORIGINAL_DIALOGUES = [
    "Olha só quem chegou atrasado! A gente estava te esperando...",
    "Humm... acho que já vi você antes! Seu nome é Dulgarin, certo?",
    "Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem!",
    "Como você sabia o meu nome?!",
    "Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!!",
    "Você quase acertou, miseravi! Eu disse quase. Só errou a pronúncia, todas as letras e a pessoa. Não sou Dulgarin, meu nome é...",
    "É um prazer te conhecer, \\N[1]! Agora, voltando à nossa história...",
    "Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa!",
    "Antes de qualquer coisa, preciso contar a história de Gildrat, o Império dos Anões!",
    "Essa história começa com um anão cabeça dura, chamado Thorin!",
    "Vamos, feche os olhos! E deixe essa antiga poção te transportar para a história."
];

const EXPECTED_SWITCHES = [[43, 43, 0], [43, 43, 0], [43, 43, 0], [44, 44, 0], [43, 43, 0], [44, 44, 0], [43, 43, 0], [43, 43, 0]];
const EXPECTED_GRAPHICS = [
    [1, "Portraits/Principal/Rheed_VN046_Pensativo", 0, 1],
    [1, "Portraits/Principal/Reed final", 1, 2],
    [2, "Portraits/Principal/CriancaOrc_VN046_Surpresa", 1, 3],
    [2, "Portraits/Principal/CriancaOrc_", 1, 4],
    [1, "Portraits/Principal/Rheed_VN046_Solene", 0, 7]
];

const checks = [];
const errors = [];

function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function check(id, condition, evidence) {
    checks.push({ id, status: condition ? "passed" : "failed", evidence });
    if (!condition) errors.push(`${id}: ${evidence}`);
}

function exactCaseExists(relativePath) {
    const segments = relativePath.split("/");
    let cursor = ROOT;
    for (const segment of segments) {
        if (!fs.existsSync(cursor)) return false;
        const entries = fs.readdirSync(cursor);
        if (!entries.includes(segment)) return false;
        cursor = path.join(cursor, segment);
    }
    return fs.existsSync(cursor) && fs.statSync(cursor).isFile();
}

function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

function decodePng(relativePath) {
    const buffer = fs.readFileSync(path.join(ROOT, relativePath));
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    if (!buffer.subarray(0, 8).equals(signature)) throw new Error(`Assinatura PNG inválida: ${relativePath}`);
    let offset = 8;
    let ihdr;
    const idat = [];
    while (offset < buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString("ascii", offset + 4, offset + 8);
        const data = buffer.subarray(offset + 8, offset + 8 + length);
        if (type === "IHDR") {
            ihdr = {
                width: data.readUInt32BE(0),
                height: data.readUInt32BE(4),
                bitDepth: data[8],
                colorType: data[9],
                interlace: data[12]
            };
        } else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        offset += 12 + length;
    }
    if (!ihdr || ihdr.bitDepth !== 8 || ihdr.interlace !== 0 || ![2, 6].includes(ihdr.colorType)) {
        throw new Error(`PNG fora do decoder estático suportado (8-bit RGB/RGBA, sem interlace): ${relativePath}`);
    }
    const bpp = ihdr.colorType === 6 ? 4 : 3;
    const stride = ihdr.width * bpp;
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const pixels = Buffer.alloc(stride * ihdr.height);
    let rawOffset = 0;
    let alphaMin = 255;
    let alphaMax = ihdr.colorType === 6 ? 0 : 255;
    let nonEmpty = false;
    for (let y = 0; y < ihdr.height; y += 1) {
        const filter = raw[rawOffset++];
        for (let x = 0; x < stride; x += 1) {
            const source = raw[rawOffset++];
            const left = x >= bpp ? pixels[y * stride + x - bpp] : 0;
            const up = y > 0 ? pixels[(y - 1) * stride + x] : 0;
            const upLeft = y > 0 && x >= bpp ? pixels[(y - 1) * stride + x - bpp] : 0;
            let value;
            if (filter === 0) value = source;
            else if (filter === 1) value = (source + left) & 255;
            else if (filter === 2) value = (source + up) & 255;
            else if (filter === 3) value = (source + Math.floor((left + up) / 2)) & 255;
            else if (filter === 4) value = (source + paeth(left, up, upLeft)) & 255;
            else throw new Error(`Filtro PNG desconhecido ${filter}: ${relativePath}`);
            pixels[y * stride + x] = value;
        }
        for (let x = 0; x < ihdr.width; x += 1) {
            const i = y * stride + x * bpp;
            const alpha = bpp === 4 ? pixels[i + 3] : 255;
            alphaMin = Math.min(alphaMin, alpha);
            alphaMax = Math.max(alphaMax, alpha);
            if (alpha > 0 && (pixels[i] > 0 || pixels[i + 1] > 0 || pixels[i + 2] > 0)) nonEmpty = true;
        }
    }
    return { ...ihdr, alphaMin, alphaMax, nonEmpty, sha256: sha256(buffer) };
}

function collectDiffPaths(a, b, prefix = "") {
    if (deepEqual(a, b)) return [];
    if (Array.isArray(a) && Array.isArray(b)) {
        if (prefix.endsWith(".list")) return [prefix];
        const length = Math.max(a.length, b.length);
        return Array.from({ length }, (_, index) => collectDiffPaths(a[index], b[index], `${prefix}[${index}]`)).flat();
    }
    if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
        const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
        return [...keys].flatMap(key => collectDiffPaths(a[key], b[key], prefix ? `${prefix}.${key}` : key));
    }
    return [prefix];
}

function stripAuthorizedChanges(currentList, baselineList) {
    const additions = currentList.filter(command => {
        if (command.code === 320 && deepEqual(command.parameters, [1, "Dulgarin"])) return false;
        if (command.code === 357 && command.parameters[0] === "VisuMZ_2_VNPictureBusts" && command.parameters[1] === "Basic_GraphicChange") return false;
        if ([231, 232, 235].includes(command.code) && command.parameters[0] === 10) return false;
        return true;
    }).map(command => structuredClone(command));
    const baselineMessages = baselineList.filter(command => command.code === 401).map(command => command.parameters[0]);
    let messageIndex = 0;
    for (const command of additions) {
        if (command.code === 401) command.parameters[0] = baselineMessages[messageIndex++];
    }
    return additions;
}

function commandIndexForMessage(list, text) {
    return list.findIndex(command => command.code === 401 && command.parameters[0] === text);
}

function validate() {
    const currentBuffer = fs.readFileSync(MAP_PATH);
    const currentText = currentBuffer.toString("utf8");
    const current = JSON.parse(currentText);
    let baselineBuffer;
    try {
        baselineBuffer = execFileSync("git", ["show", `HEAD:${MAP_REL}`], { cwd: ROOT, windowsHide: true });
    } catch (error) {
        throw new Error(`Não foi possível obter baseline via git show: ${error.message}`);
    }
    const baseline = JSON.parse(baselineBuffer.toString("utf8"));
    const canonicalBaselineBuffer = Buffer.from(JSON.stringify(baseline, null, 4).replace(/\n/g, "\r\n"), "utf8");
    check("RQ-S01-baseline-hash", sha256(canonicalBaselineBuffer) === BASELINE_SHA256, `baseline-working-tree-style=${sha256(canonicalBaselineBuffer)}; git-blob=${sha256(baselineBuffer)}`);
    check("RQ-S01-parse-style", currentText === JSON.stringify(current, null, 4).replace(/\n/g, "\r\n"), "JSON parseável; CRLF, 4 espaços e ausência de newline final preservados");
    const diffPaths = collectDiffPaths(baseline, current);
    check("RQ-S01-restricted-diff", deepEqual(diffPaths.sort(), ["events[1].pages[0].list", "parallaxName"].sort()), `paths=${JSON.stringify(diffPaths)}`);

    const list = current.events[1].pages[0].list;
    const baselineList = baseline.events[1].pages[0].list;
    check("RQ-S01-baseline-equivalence", deepEqual(stripAuthorizedChanges(list, baselineList), baselineList), "Removendo adições autorizadas e revertendo falas, a command list coincide integralmente com o baseline");

    check("RQ-S02-choice-counts", list.filter(c => c.code === 102).length === 1 && list.filter(c => c.code === 402).length === 2 && list.filter(c => c.code === 403).length === 0 && list.filter(c => c.code === 404).length === 1, "102=1, 402=2, 403=0, 404=1");
    const branchCommands = list.filter(c => [102, 402, 403, 404].includes(c.code)).map(c => ({ code: c.code, indent: c.indent, parameters: c.parameters }));
    check("RQ-S02-choice-indents", deepEqual(branchCommands, [
        { code: 102, indent: 0, parameters: [["qualSeuNome1", "qualSeuNome2"], 1, 0, 2, 0] },
        { code: 402, indent: 0, parameters: [0, "qualSeuNome1"] },
        { code: 402, indent: 0, parameters: [1, "qualSeuNome2"] },
        { code: 404, indent: 0, parameters: [] }
    ]), JSON.stringify(branchCommands));
    const confirmStart = list.findIndex(c => c.code === 402 && deepEqual(c.parameters, [0, "qualSeuNome1"]));
    const correctStart = list.findIndex(c => c.code === 402 && deepEqual(c.parameters, [1, "qualSeuNome2"]));
    const choiceEnd = list.findIndex(c => c.code === 404);
    const b03 = commandIndexForMessage(list, EXPECTED_DIALOGUES[2]);
    const b07 = commandIndexForMessage(list, EXPECTED_DIALOGUES[6]);
    const b08 = commandIndexForMessage(list, EXPECTED_DIALOGUES[7]);
    check("RQ-S02-branch-indent-ladder", list.slice(confirmStart + 1, correctStart).every(c => c.indent === 1) && list.slice(correctStart + 1, choiceEnd).every(c => c.indent === 1) && b08 > choiceEnd && list[b08].indent === 0, `confirm=${confirmStart}, correct=${correctStart}, end=${choiceEnd}, reconvergence=${b08}`);

    const changeNames = list.filter(c => c.code === 320);
    const nameIndex = list.findIndex(c => c.code === 320 && deepEqual(c.parameters, [1, "Dulgarin"]));
    check("RQ-S03-set-dulgarin", changeNames.length === 1 && nameIndex > confirmStart && nameIndex < b03 && list[nameIndex].indent === 1, `index=${nameIndex}, confirm=${confirmStart}, B03=${b03}`);
    const nameInputs = list.map((c, i) => [c, i]).filter(([c]) => c.code === 303);
    check("RQ-S04-name-input", nameInputs.length === 1 && deepEqual(nameInputs[0][0].parameters, [1, 8]) && nameInputs[0][1] > correctStart && nameInputs[0][1] < b07 && list[b07].parameters[0].includes("\\N[1]") && !list.slice(confirmStart, correctStart).some(c => c.code === 303), `Name Input index=${nameInputs[0]?.[1]}, B07=${b07}`);

    const switches = list.filter(c => c.code === 121).map(c => c.parameters);
    check("RQ-S05-switches", deepEqual(switches, EXPECTED_SWITCHES), JSON.stringify(switches));
    const guards = list.slice(0, 2);
    const transitionIndex = list.findIndex(c => c.code === 357 && c.parameters[0] === "Coreto_QuestCore" && c.parameters[1] === "QuestTransition" && c.parameters[3]?.transitionId === "COMPLETE_VN");
    const finishIndex = list.findIndex(c => c.code === 357 && c.parameters[0] === "Coreto_QuestVN" && c.parameters[1] === "FinishVisualNovel");
    const exitIndexes = list.map((c, i) => c.code === 115 ? i : -1).filter(i => i >= 0);
    check("RQ-S06-guards", deepEqual(guards, baselineList.slice(0, 2)), "Os dois guards iniciais coincidem com o baseline");
    check("RQ-S06-handoff", transitionIndex >= 0 && finishIndex === transitionIndex + 1 && exitIndexes.length === 1 && exitIndexes[0] === finishIndex + 1, `COMPLETE_VN=${transitionIndex}, FinishVisualNovel=${finishIndex}, code115=${JSON.stringify(exitIndexes)}`);

    const assetSpecs = [
        ["frontend/img/parallaxes/VN046_NoiteHistoria_BG.png", 1280, 720, "background"],
        ["frontend/img/pictures/Portraits/Principal/Rheed_VN046_Pensativo.png", 408, 560, "bust"],
        ["frontend/img/pictures/Portraits/Principal/Rheed_VN046_Solene.png", 408, 560, "bust"],
        ["frontend/img/pictures/Portraits/Principal/CriancaOrc_VN046_Surpresa.png", 408, 560, "bust"],
        ["frontend/img/pictures/CutIns/VN046_ThorinIntroducao_CutIn.png", 1280, 720, "cutin"],
        ["frontend/img/pictures/Portraits/Principal/Reed final.png", 408, 560, "bust"],
        ["frontend/img/pictures/Portraits/Principal/CriancaOrc_.png", 408, 560, "bust"],
        ["frontend/img/pictures/Choices/InnButton_01.png", 388, 101, "choice"],
        ["frontend/img/pictures/Choices/InnButton_00.png", 392, 104, "choice"]
    ];
    const assetEvidence = [];
    let assetsPassed = true;
    for (const [relativePath, width, height, role] of assetSpecs) {
        try {
            const caseOk = exactCaseExists(relativePath);
            if (!caseOk) throw new Error("path/case ausente");
            const png = decodePng(relativePath);
            const dimensionsOk = png.width === width && png.height === height;
            const roleOk = role !== "bust" || (png.colorType === 6 && png.alphaMin < 255 && png.alphaMax > 0 && png.nonEmpty);
            const opacityOk = role !== "background" || png.alphaMin === 255;
            if (!dimensionsOk || !roleOk || !opacityOk) assetsPassed = false;
            assetEvidence.push({ path: relativePath, role, case_ok: caseOk, dimensions: `${png.width}x${png.height}`, color_type: png.colorType, alpha_min: png.alphaMin, alpha_max: png.alphaMax, non_empty: png.nonEmpty, sha256: png.sha256, status: dimensionsOk && roleOk && opacityOk ? "passed" : "failed" });
        } catch (error) {
            assetsPassed = false;
            assetEvidence.push({ path: relativePath, role, status: "failed", error: error.message });
        }
    }
    check("RQ-S07-assets", assetsPassed, JSON.stringify(assetEvidence));

    const graphics = list.map((c, i) => [c, i]).filter(([c]) => c.code === 357 && c.parameters[0] === "VisuMZ_2_VNPictureBusts" && c.parameters[1] === "Basic_GraphicChange");
    const graphicEvidence = graphics.map(([c, index]) => ({ index, id: Number(c.parameters[3]["PictureID:eval"]), name: c.parameters[3]["PictureName:str"], indent: c.indent }));
    const graphicsOk = EXPECTED_GRAPHICS.every(([id, name, indent, dialogueIndex]) => {
        const messageIndex = commandIndexForMessage(list, EXPECTED_DIALOGUES[dialogueIndex]);
        return graphicEvidence.some(g => g.id === id && g.name === name && g.indent === indent && g.index < messageIndex && messageIndex - g.index <= 4);
    });
    check("RQ-S08-graphic-changes", graphics.length === 5 && graphicsOk, JSON.stringify(graphicEvidence));
    const b10 = commandIndexForMessage(list, EXPECTED_DIALOGUES[9]);
    const b11 = commandIndexForMessage(list, EXPECTED_DIALOGUES[10]);
    const cutCommands = list.map((c, i) => [c, i]).filter(([c]) => [231, 232, 235].includes(c.code) && c.parameters[0] === 10);
    const expectedCutCommands = [
        { code: 231, indent: 0, parameters: [10, "CutIns/VN046_ThorinIntroducao_CutIn", 1, 0, 640, 360, 100, 100, 0, 0] },
        { code: 232, indent: 0, parameters: [10, 0, 1, 0, 640, 360, 100, 100, 255, 0, 28, false, 2] },
        { code: 232, indent: 0, parameters: [10, 0, 1, 0, 640, 360, 100, 100, 0, 0, 20, true, 1] },
        { code: 235, indent: 0, parameters: [10] }
    ];
    check("RQ-S08-cutin-lifecycle", deepEqual(cutCommands.map(([c]) => c), expectedCutCommands) && cutCommands[0][1] < b10 && cutCommands[1][1] < b10 && cutCommands[2][1] > b10 && cutCommands[3][1] > b10 && cutCommands[3][1] < b11 && cutCommands[3][1] < transitionIndex, JSON.stringify(cutCommands.map(([c, index]) => ({ index, command: c }))));
    const pictureIds = list.filter(c => [231, 232, 235].includes(c.code)).map(c => c.parameters[0]);
    check("RQ-S08-picture-ids", pictureIds.every(id => id === 10) && !pictureIds.includes(4), `vanilla picture IDs=${JSON.stringify(pictureIds)}; bust IDs 1/2 preservados pelo baseline-equivalence`);

    check("RQ-S09-parallax", current.parallaxName === "VN046_NoiteHistoria_BG" && current.parallaxLoopX === false && current.parallaxLoopY === false && current.parallaxSx === 0 && current.parallaxSy === 0 && !list.some(c => c.code === 231 && c.parameters[1] === "VN046_NoiteHistoria_BG") && deepEqual(current.data, baseline.data), `parallax=${current.parallaxName}; loops=${current.parallaxLoopX}/${current.parallaxLoopY}; scroll=${current.parallaxSx}/${current.parallaxSy}`);

    const map022 = JSON.parse(fs.readFileSync(path.join(ROOT, "frontend/data/Map022.json"), "utf8"));
    const caller = map022.events?.[18]?.pages?.[0]?.list?.find(c => c.code === 357 && c.parameters[0] === "Coreto_QuestVN" && c.parameters[1] === "EnterVisualNovel");
    check("RQ-S10-caller-chain", caller?.parameters?.[3]?.questKey === "noite-da-historia" && caller?.parameters?.[3]?.entryKey === "CENA_PRINCIPAL", JSON.stringify(caller));
    const commonEvents = JSON.parse(fs.readFileSync(path.join(ROOT, "frontend/data/CommonEvents.json"), "utf8"));
    check("RQ-S10-switch-callers", commonEvents[7]?.name === "Fala-ID1" && commonEvents[7]?.switchId === 43 && commonEvents[8]?.name === "Fala-ID2" && commonEvents[8]?.switchId === 44, `CE7=${commonEvents[7]?.name}/${commonEvents[7]?.switchId}; CE8=${commonEvents[8]?.name}/${commonEvents[8]?.switchId}`);

    const simultaneousBytesWithoutCutIn = 5_834_752;
    const simultaneousBytesWithCutIn = 9_521_152;
    check("RQ-S11-estimates", (simultaneousBytesWithoutCutIn / 1048576).toFixed(3) === "5.564" && (simultaneousBytesWithCutIn / 1048576).toFixed(3) === "9.080", "Estimativas RGBA teóricas: 5.564 MiB sem Cut-In; 9.080 MiB com Cut-In; não são medição runtime");

    const forbiddenCodes = [221, 222, 241, 242, 245, 246, 249, 250, 261];
    const forbiddenPresent = list.filter(c => forbiddenCodes.includes(c.code));
    const forbiddenPluginOrAsset = list.some(c => JSON.stringify(c).match(/fumaça|fumaca|video|audio|InnButton_0[01]/i));
    check("RQ-S12-exclusions", forbiddenPresent.length === 0 && !forbiddenPluginOrAsset, `forbiddenCodes=${JSON.stringify(forbiddenPresent.map(c => c.code))}, forbiddenPayload=${forbiddenPluginOrAsset}, picture4=false`);
    check("dialogues-exact", deepEqual(list.filter(c => c.code === 401).map(c => c.parameters[0]), EXPECTED_DIALOGUES), "11 falas aprovadas, em ordem exata");

    return {
        map_sha256: sha256(currentBuffer),
        baseline_sha256: sha256(canonicalBaselineBuffer),
        baseline_git_blob_sha256: sha256(baselineBuffer),
        diff_paths: diffPaths,
        assets: assetEvidence,
        branch_commands: branchCommands,
        graphic_changes: graphicEvidence,
        cutin_commands: cutCommands.map(([c, index]) => ({ index, ...c })),
        runtime_status: "pending-human-validation",
        human_gate: "RQ-P01-RQ-P09"
    };
}

let evidence = {};
try {
    evidence = validate();
} catch (error) {
    errors.push(`validator-exception: ${error.stack || error.message}`);
}

const passed = errors.length === 0 && checks.length > 0 && checks.every(item => item.status === "passed");
const generatedAt = new Date().toISOString();
const validation = {
    schema_version: 1,
    task_id: "task-1.1",
    validator: "planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs",
    generated_at: generatedAt,
    status: passed ? "passed" : "failed",
    classification: passed ? "structural_validation" : "validation_failed",
    checks,
    errors,
    evidence,
    runtime_validation: "pending-human-validation",
    human_gate: ["RQ-P01", "RQ-P02", "RQ-P03", "RQ-P04", "RQ-P05", "RQ-P06", "RQ-P07", "RQ-P08", "RQ-P09"]
};

const completion = {
    schema_version: 1,
    task_id: "task-1.1",
    result: passed ? "implemented-static-validation-passed" : "implemented-static-validation-failed",
    generated_at: generatedAt,
    changed_files: [
        "frontend/data/Map046.json",
        "planos/004-ambientacao-VN/builds/fase1/implement-map046.mjs",
        "planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs",
        "planos/004-ambientacao-VN/builds/fase1/task-1.1-completion.json",
        "planos/004-ambientacao-VN/builds/fase1/task-1.1-validation.json"
    ],
    read_files: [
        "planos/004-ambientacao-VN/tasks.md",
        "planos/004-ambientacao-VN/task-1.1.md",
        "planos/004-ambientacao-VN/preflights/run-73b3d740b838fa669b29aac69582aecf/technical-implementer/preflight-v1.md",
        "planos/004-ambientacao-VN/analise/technical-analysis.md",
        "planos/004-ambientacao-VN/analise/asset-manifest.md",
        "docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/comandos/basicos.md",
        "frontend/js/plugins/VisuMZ_2_VNPictureBusts.js",
        "frontend/js/rmmz_objects.js",
        "frontend/data/CommonEvents.json",
        "frontend/data/Map022.json"
    ],
    validators: [
        { name: "parse-json", status: checks.find(c => c.id === "RQ-S01-parse-style")?.status || "failed" },
        { name: "restricted-diff", status: checks.find(c => c.id === "RQ-S01-restricted-diff")?.status || "failed" },
        { name: "RQ-S01-RQ-S12-applicable", status: passed ? "passed" : "failed", evidence_ref: "task-1.1-validation.json" }
    ],
    attempts: [
        { attempt: 1, stage: "writer", status: "sandbox-retry", error: "EPERM ao criar scratch atômico; reexecução autorizada fora do sandbox." },
        { attempt: 2, stage: "writer", status: "passed", result_sha256: evidence.map_sha256 || "unavailable" },
        { attempt: 3, stage: "validator", status: "corrected-false-negatives", corrections: ["normalização LF/CRLF do baseline Git", "granularidade do diff em arrays", "subpasta Choices dos botões"] },
        { attempt: 4, stage: "validator", command: "node planos/004-ambientacao-VN/builds/fase1/validate-map046.mjs", status: passed ? "passed" : "failed" }
    ],
    errors,
    decisions: [
        "Writer one-shot protegido pelo hash baseline 73e006... e estilo CRLF/4 espaços.",
        "Basic_GraphicChange materializa B02, B03, B04, B05 e B08-B11 sem trocar IDs 1/2.",
        "Picture 10 usa Show Picture opacidade 0, reveal 28f, fade out bloqueante 20f e Erase antes de B11.",
        "code 320 [1,\"Dulgarin\"] fica no ramo qualSeuNome1 antes de B03."
    ],
    risks: [
        "Visuais, timing, leitura, input, z-order e persistência continuam pendentes de RQ-P01-RQ-P09.",
        "Estimativas RGBA são teóricas, não medição de memória/performance."
    ],
    gates: [{ name: "human-validation", status: "pending", scenarios: "RQ-P01-RQ-P09" }],
    next_destination: passed ? "orchestrator-independent-phase-audit" : "orchestrator-failure-intake",
    execution_evidence: "orchestrator-owned"
};

fs.writeFileSync(VALIDATION_PATH, `${JSON.stringify(validation, null, 2)}\n`, "utf8");
fs.writeFileSync(COMPLETION_PATH, `${JSON.stringify(completion, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ status: validation.status, checks: checks.length, errors, validation: path.relative(ROOT, VALIDATION_PATH).replaceAll("\\", "/"), completion: path.relative(ROOT, COMPLETION_PATH).replaceAll("\\", "/") }, null, 2));
if (!passed) process.exitCode = 1;
