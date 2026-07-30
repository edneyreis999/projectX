import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MAP_PATH = path.join(ROOT, "frontend/data/Map046.json");
const BASELINE_SHA256 = "73e00628022b18375aec7af714181dd3171fdfc8f9ec911cfcc76188f47eb5d2";

const DIALOGUE_REPLACEMENTS = new Map([
    ["Olha só quem chegou atrasado! A gente estava te esperando...", "Ora, ora... vejam só quem chegou atrasado! Venha, pequeno — uma boa história não começa sem o último ouvinte."],
    ["Humm... acho que já vi você antes! Seu nome é Dulgarin, certo?", "Hum... esse rosto não me é estranho. Deixe este velho testar a memória: Dulgarin, não é?"],
    ["Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem!", "A-ha! Eu sabia! Ainda há boas histórias guardadas nesta cabeça velha — e alguns nomes também."],
    ["Como você sabia o meu nome?!", "Como você sabia o meu nome?!"],
    ["Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!!", "Sou contador de histórias, pequeno! Conheço as histórias de Daratrine... e os nomes de quem vem escutá-las."],
    ["Você quase acertou, miseravi! Eu disse quase. Só errou a pronúncia, todas as letras e a pessoa. Não sou Dulgarin, meu nome é...", "Quase acertou, miseravi! Errou só a pronúncia, todas as letras... e a pessoa. Eu não sou Dulgarin. Meu nome é..."],
    ["É um prazer te conhecer, \\N[1]! Agora, voltando à nossa história...", "Agora sim, é um prazer conhecer você, \\N[1]! Acomode-se — a nossa verdadeira história está só começando..."],
    ["Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa!", "Ah, Daratrine... Como eu amo esta cidade! Difícil imaginar que ela já foi apenas um refúgio para soldados feridos. Por muito pouco, seu nome não desapareceu do mapa."],
    ["Antes de qualquer coisa, preciso contar a história de Gildrat, o Império dos Anões!", "Mas, para entender como Daratrine chegou até aqui, precisamos voltar a Gildrat, o Império dos Anões."],
    ["Essa história começa com um anão cabeça dura, chamado Thorin!", "E é em Gildrat que a nossa história encontra Thorin — um anão tão cabeça-dura que discutiria até com uma montanha!"],
    ["Vamos, feche os olhos! E deixe essa antiga poção te transportar para a história.", "Agora, fechem os olhos... Respirem fundo. Deixem que o encanto desta antiga poção nos transporte até Gildrat, quando tudo começou."]
]);

const NEW_DIALOGUES = [...DIALOGUE_REPLACEMENTS.values()];

function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function exactCaseExists(relativePath) {
    const segments = relativePath.split("/");
    let cursor = ROOT;
    for (const segment of segments) {
        const entries = fs.readdirSync(cursor);
        if (!entries.includes(segment)) return false;
        cursor = path.join(cursor, segment);
    }
    return fs.statSync(cursor).isFile();
}

function pngHeader(relativePath) {
    assert(exactCaseExists(relativePath), `Asset ausente ou case divergente: ${relativePath}`);
    const buffer = fs.readFileSync(path.join(ROOT, relativePath));
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    assert(buffer.subarray(0, 8).equals(signature), `PNG inválido: ${relativePath}`);
    assert(buffer.toString("ascii", 12, 16) === "IHDR", `IHDR ausente: ${relativePath}`);
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function validateAssetGate() {
    const assets = [
        ["frontend/img/parallaxes/VN046_NoiteHistoria_BG.png", 1280, 720],
        ["frontend/img/pictures/Portraits/Principal/Rheed_VN046_Pensativo.png", 408, 560],
        ["frontend/img/pictures/Portraits/Principal/Rheed_VN046_Solene.png", 408, 560],
        ["frontend/img/pictures/Portraits/Principal/CriancaOrc_VN046_Surpresa.png", 408, 560],
        ["frontend/img/pictures/CutIns/VN046_ThorinIntroducao_CutIn.png", 1280, 720]
    ];
    for (const [relativePath, width, height] of assets) {
        const header = pngHeader(relativePath);
        assert(header.width === width && header.height === height, `Dimensão inesperada em ${relativePath}: ${header.width}x${header.height}`);
    }
}

function pluginGraphic(pictureId, pictureName, indent) {
    return {
        code: 357,
        indent,
        parameters: [
            "VisuMZ_2_VNPictureBusts",
            "Basic_GraphicChange",
            "BASIC: Graphic Change",
            {
                "PictureID:eval": String(pictureId),
                "PictureName:str": pictureName
            }
        ]
    };
}

function showCutIn() {
    return { code: 231, indent: 0, parameters: [10, "CutIns/VN046_ThorinIntroducao_CutIn", 1, 0, 640, 360, 100, 100, 0, 0] };
}

function moveCutIn(opacity, duration, wait, easingType) {
    return { code: 232, indent: 0, parameters: [10, 0, 1, 0, 640, 360, 100, 100, opacity, 0, duration, wait, easingType] };
}

function findMessageIndex(list, text) {
    const matches = [];
    list.forEach((command, index) => {
        if (command.code === 401 && command.parameters[0] === text) matches.push(index);
    });
    assert(matches.length === 1, `Mensagem não localizada de forma única: ${text}`);
    return matches[0];
}

function insertBeforeSpeakerSwitch(list, messageText, command) {
    const messageIndex = findMessageIndex(list, messageText);
    let switchIndex = messageIndex - 1;
    while (switchIndex >= 0 && list[switchIndex].code !== 121) switchIndex -= 1;
    assert(switchIndex >= 0 && messageIndex - switchIndex <= 3, `Switch de fala não localizado antes de: ${messageText}`);
    list.splice(switchIndex, 0, command);
}

function validateBaseline(map, sourceText) {
    assert(map.events?.[1]?.pages?.[0]?.list, "Map046 event 1/page 1 ausente");
    assert(map.parallaxName === "", "Baseline parallaxName inesperado");
    assert(map.parallaxLoopX === false && map.parallaxLoopY === false, "Baseline de loop do parallax inesperado");
    assert(map.parallaxSx === 0 && map.parallaxSy === 0, "Baseline de scroll do parallax inesperado");
    assert(sourceText === JSON.stringify(map, null, 4).replace(/\n/g, "\r\n"), "Estilo do Map046 divergiu do baseline CRLF/4 espaços sem newline final");

    const list = map.events[1].pages[0].list;
    assert(deepEqual(list.slice(0, 2).map(command => command.parameters.slice(0, 3)), [
        ["Coreto_QuestVN", "AssertVisualNovelSession", "AssertVisualNovelSession"],
        ["Coreto_QuestCore", "AssertQuestState", "AssertQuestState"]
    ]), "Guards baseline divergiram");
    const messages = list.filter(command => command.code === 401).map(command => command.parameters[0]);
    assert(messages.length === 11, `Esperadas 11 falas baseline; encontradas ${messages.length}`);
    for (const original of DIALOGUE_REPLACEMENTS.keys()) {
        assert(messages.includes(original), `Fala baseline ausente: ${original}`);
    }
    const switches = list.filter(command => command.code === 121).map(command => command.parameters);
    assert(deepEqual(switches, [[43, 43, 0], [43, 43, 0], [43, 43, 0], [44, 44, 0], [43, 43, 0], [44, 44, 0], [43, 43, 0], [43, 43, 0]]), "Sequência baseline dos oito switches divergiu");
}

function buildPatchedMap(baseline) {
    const map = structuredClone(baseline);
    const list = map.events[1].pages[0].list;
    map.parallaxName = "VN046_NoiteHistoria_BG";

    const confirmIndex = list.findIndex(command => command.code === 402 && deepEqual(command.parameters, [0, "qualSeuNome1"]));
    assert(confirmIndex >= 0, "Ramo qualSeuNome1 ausente");
    list.splice(confirmIndex + 1, 0, { code: 320, indent: 1, parameters: [1, "Dulgarin"] });

    insertBeforeSpeakerSwitch(list, "Humm... acho que já vi você antes! Seu nome é Dulgarin, certo?", pluginGraphic(1, "Portraits/Principal/Rheed_VN046_Pensativo", 0));
    insertBeforeSpeakerSwitch(list, "Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem!", pluginGraphic(1, "Portraits/Principal/Reed final", 1));
    insertBeforeSpeakerSwitch(list, "Como você sabia o meu nome?!", pluginGraphic(2, "Portraits/Principal/CriancaOrc_VN046_Surpresa", 1));
    insertBeforeSpeakerSwitch(list, "Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!!", pluginGraphic(2, "Portraits/Principal/CriancaOrc_", 1));
    insertBeforeSpeakerSwitch(list, "Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa!", pluginGraphic(1, "Portraits/Principal/Rheed_VN046_Solene", 0));

    for (const command of list) {
        if (command.code === 401 && DIALOGUE_REPLACEMENTS.has(command.parameters[0])) {
            command.parameters[0] = DIALOGUE_REPLACEMENTS.get(command.parameters[0]);
        }
    }
    assert(deepEqual(list.filter(command => command.code === 401).map(command => command.parameters[0]), NEW_DIALOGUES), "A ordem final das 11 falas divergiu");

    const b10Index = findMessageIndex(list, NEW_DIALOGUES[9]);
    assert(list[b10Index - 1].code === 101, "Cabeçalho Show Text de B10 ausente");
    list.splice(b10Index - 1, 0, showCutIn(), moveCutIn(255, 28, false, 2));
    const movedB10Index = findMessageIndex(list, NEW_DIALOGUES[9]);
    list.splice(movedB10Index + 1, 0, moveCutIn(0, 20, true, 1), { code: 235, indent: 0, parameters: [10] });

    return map;
}

function main() {
    const sourceBuffer = fs.readFileSync(MAP_PATH);
    const actualHash = sha256(sourceBuffer);
    assert(actualHash === BASELINE_SHA256, `Hash baseline divergente; esperado ${BASELINE_SHA256}, obtido ${actualHash}. Nenhuma escrita realizada.`);
    const sourceText = sourceBuffer.toString("utf8");
    const baseline = JSON.parse(sourceText);
    validateBaseline(baseline, sourceText);
    validateAssetGate();

    const patched = buildPatchedMap(baseline);
    const output = JSON.stringify(patched, null, 4).replace(/\n/g, "\r\n");
    JSON.parse(output);
    assert(output !== sourceText, "Writer não produziu mudança");

    const rereadHash = sha256(fs.readFileSync(MAP_PATH));
    assert(rereadHash === BASELINE_SHA256, "Map046 mudou durante a preparação; nenhuma escrita realizada");

    const tempPath = `${MAP_PATH}.task-1.1.tmp`;
    try {
        fs.writeFileSync(tempPath, output, "utf8");
        JSON.parse(fs.readFileSync(tempPath, "utf8"));
        fs.renameSync(tempPath, MAP_PATH);
    } finally {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

    const persisted = fs.readFileSync(MAP_PATH);
    JSON.parse(persisted.toString("utf8"));
    console.log(JSON.stringify({
        status: "written",
        lifecycle: "one-shot-baseline-guarded",
        file: "frontend/data/Map046.json",
        baselineSha256: BASELINE_SHA256,
        resultSha256: sha256(persisted),
        dialogueCount: 11
    }, null, 2));
}

try {
    main();
} catch (error) {
    console.error(`[implement-map046] ${error.message}`);
    process.exitCode = 1;
}
