import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const projectRoot = process.cwd();
const mapRef = "frontend/data/Map049.json";
const mapPath = path.join(projectRoot, ...mapRef.split("/"));
const outputFlag = process.argv.indexOf("--output");
const outputRef = outputFlag >= 0 ? process.argv[outputFlag + 1] : null;

if (!outputRef || !outputRef.startsWith("planos/006-busts-position/builds/fase1/")) {
  throw new Error("--output must be an immutable evidence path under the active phase builds directory");
}

const outputPath = path.join(projectRoot, ...outputRef.split("/"));
const canonical = value => {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
};
const sha256 = bytes => `sha256:${crypto.createHash("sha256").update(bytes).digest("hex")}`;
const canonicalSha256 = value => sha256(Buffer.from(canonical(value), "utf8"));
const checks = [];
const check = (id, condition, observed) => {
  const status = condition ? "passed" : "failed";
  checks.push({ id, status, observed });
  if (!condition) throw new Error(`${id}: ${observed}`);
};

const exactPathExists = relativeWithoutExtension => {
  const segments = `${relativeWithoutExtension}.png`.split("/");
  let current = projectRoot;
  for (const segment of segments) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) return false;
    const exact = fs.readdirSync(current).find(entry => entry === segment);
    if (!exact) return false;
    current = path.join(current, exact);
  }
  return fs.existsSync(current) && fs.statSync(current).isFile();
};

const publish = payload => {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  if (fs.existsSync(outputPath)) throw new Error(`immutable evidence destination already exists: ${outputRef}`);
  const tempPath = path.join(path.dirname(outputPath), `.${path.basename(outputPath)}.${process.pid}.tmp`);
  const bytes = Buffer.from(`${JSON.stringify(payload, null, 2)}\n`, "utf8");
  const fd = fs.openSync(tempPath, "wx");
  try {
    fs.writeFileSync(fd, bytes);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tempPath, outputPath);
  return sha256(bytes);
};

let targetDigest = null;
try {
  const raw = fs.readFileSync(mapPath);
  targetDigest = sha256(raw);
  const text = raw.toString("utf8");
  check("json-encoding-style", !raw.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf])) && !text.includes("\r\n") && /(?<!\r)\n/.test(text) && !text.endsWith("\n"), "UTF-8 sem BOM, LF exclusivo e sem trailing newline, conforme save manual atual do RPG Maker");
  check("outside-list-text-style", text.includes('\n            "name": "VN - Casa Forjaprata: pesadelo e despertar",\n'), "indentacao normalizada de event.name produzida pelo save manual foi preservada");

  const map = JSON.parse(text);
  check("map-target", map.events?.[1]?.id === 1 && map.events[1].pages?.length === 1, "Map049 Event 1 possui exatamente uma pagina");
  const list = map.events[1].pages[0].list;
  check("command-count", list.length === 106, `command count=${list.length}, esperado=106 com Fadeout Screen manual adicional`);

  const outside = structuredClone(map);
  outside.events[1].pages[0].list = "__AUTHORIZED_COMMAND_LIST__";
  check("outside-list-semantic-hash", canonicalSha256(outside) === "sha256:f95a2ef9df673a8b1c09adfe1f2db49470660e4d241bc518620b326a18d87699", canonicalSha256(outside));
  check("manual-parallax-preserved", map.parallaxName === "VN045_CasaForjaprta_BG", `parallaxName=${map.parallaxName}`);

  const isBust = command => command.code === 357 && command.parameters?.[0] === "VisuMZ_2_VNPictureBusts";
  const nonBust = [];
  for (let index = 0; index < list.length; index += 1) {
    if (isBust(list[index])) {
      index += 1;
      while (index < list.length && list[index].code === 657) index += 1;
      index -= 1;
    } else {
      nonBust.push(list[index]);
    }
  }
  check("non-bust-semantic-hash", canonicalSha256(nonBust) === "sha256:d615ca748180be1d96712b1c4cddd78fb6cdf4e2e971d7c710bdd28e9b51faed", canonicalSha256(nonBust));

  const manualMonsterShow = list.find(command => command.code === 231 && command.parameters?.[1] === "SF_Monster_3");
  const manualMonsterMoves = list.filter(command => command.code === 232 && command.parameters?.[0] === 1);
  const fadeoutScreenIndexes = list.map((command, index) => ({ command, index })).filter(row => row.command.code === 221).map(row => row.index);
  check("manual-monster-show-preserved", canonical(manualMonsterShow?.parameters) === canonical([1, "SF_Monster_3", 1, 0, 736, 936, 220, 220, 255, 0]), JSON.stringify(manualMonsterShow?.parameters));
  check("manual-monster-first-move-preserved", canonical(manualMonsterMoves[0]?.parameters) === canonical([1, 0, 1, 0, 736, 328, 220, 220, 255, 0, 30, true, 2]), JSON.stringify(manualMonsterMoves[0]?.parameters));
  check("manual-fadeout-screen-preserved", canonical(fadeoutScreenIndexes) === canonical([42, 100]), JSON.stringify(fadeoutScreenIndexes));

  const concurrentRecord = fs.readFileSync(path.join(projectRoot, "planos/006-busts-position/interaction/fase1/task-1.1/concurrent-user-changes-v1.yaml"), "utf8");
  check("manual-change-provenance-record", concurrentRecord.includes(`current_target_digest: "${targetDigest}"`)
    && concurrentRecord.includes('attributed_to_feature_task: false')
    && concurrentRecord.includes('status: "preserve-and-revalidate"'), "Manual changes are user-owned, target-correlated and approved for preservation");

  const blocks = [];
  for (let index = 0; index < list.length; index += 1) {
    const command = list[index];
    if (!isBust(command)) continue;
    let end = index + 1;
    while (end < list.length && list[end].code === 657) end += 1;
    blocks.push({ index, command, continuations: list.slice(index + 1, end) });
    index = end - 1;
  }
  check("bust-block-count", blocks.length === 9, `bust blocks=${blocks.length}, esperado=9`);

  const enterBlocks = blocks.filter(block => block.command.parameters[1] === "Basic_EnterBust");
  const exitBlocks = blocks.filter(block => block.command.parameters[1] === "Basic_ExitBusts");
  const graphicBlocks = blocks.filter(block => block.command.parameters[1] === "Basic_GraphicChange");
  check("enter-count", enterBlocks.length === 5, `enter count=${enterBlocks.length}, esperado=5`);
  check("exit-count", exitBlocks.length === 3, `exit count=${exitBlocks.length}, esperado=3`);
  check("graphic-change-count", graphicBlocks.length === 1, `graphic count=${graphicBlocks.length}, esperado=1`);

  const enterEditorLines = args => [
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
  const exitEditorLines = args => [
    `Picture ID(s) = ${args["PictureID:arrayeval"]}`,
    `End Offset X = ${args["EndOffsetX:eval"]}`,
    `End Offset Y = ${args["EndOffsetY:eval"]}`,
    `Exit Easing = ${args["EasingType:str"]}`,
    `Flip Direction = ${args["FlipDirection:str"]}`,
    `Duration = ${args["Duration:eval"]}`,
    `Auto-Erase? = ${args["AutoErase:eval"]}`,
  ];
  for (const block of enterBlocks) {
    const args = block.command.parameters[3];
    check(`enter-editor-lines-${block.index}`, canonical(block.continuations.map(item => item.parameters[0])) === canonical(enterEditorLines(args)), JSON.stringify(block.continuations.map(item => item.parameters[0])));
  }
  for (const block of exitBlocks) {
    const args = block.command.parameters[3];
    check(`exit-editor-lines-${block.index}`, canonical(block.continuations.map(item => item.parameters[0])) === canonical(exitEditorLines(args)), JSON.stringify(block.continuations.map(item => item.parameters[0])));
  }
  check("graphic-editor-lines", graphicBlocks[0].continuations.length === 0, `GraphicChange continuation count=${graphicBlocks[0].continuations.length}`);

  const expectedEntries = [
    ["1", "Portraits/Principal/Mélia_desespero", "9"],
    ["1", "Portraits/Principal/Sáparo_pistola", "9"],
    ["1", "Portraits/Principal/Reed final", "9"],
    ["2", "Portraits/Principal/Thorin_confusão", "1"],
    ["2", "Portraits/Principal/Thorin_confusão", "1"],
  ];
  const actualEntries = enterBlocks.map(block => {
    const args = block.command.parameters[3];
    return [args["PictureID:eval"], args["PictureName:str"], args["Position:num"]];
  }).sort((left, right) => canonical(left).localeCompare(canonical(right)));
  expectedEntries.sort((left, right) => canonical(left).localeCompare(canonical(right)));
  check("entry-payloads", canonical(actualEntries) === canonical(expectedEntries), JSON.stringify(actualEntries));

  const graphicArgs = graphicBlocks[0].command.parameters[3];
  check("thorin-graphic-change", graphicArgs["PictureID:eval"] === "2" && graphicArgs["PictureName:str"] === "Portraits/Principal/Thorin_bobo", JSON.stringify(graphicArgs));
  check("no-thorin-bobo-reentry", enterBlocks.every(block => block.command.parameters[3]["PictureName:str"] !== "Portraits/Principal/Thorin_bobo"), "Thorin_bobo nao usa Basic_EnterBust");

  const exitIds = exitBlocks.map(block => block.command.parameters[3]["PictureID:arrayeval"]);
  check("exit-payload-order", canonical(exitIds) === canonical(['["1","2"]', '["1"]', '["1","2"]']), JSON.stringify(exitIds));

  const blockByAsset = asset => enterBlocks.filter(block => block.command.parameters[3]["PictureName:str"] === asset);
  const melia = blockByAsset("Portraits/Principal/Mélia_desespero")[0];
  const saparo = blockByAsset("Portraits/Principal/Sáparo_pistola")[0];
  const rheed = blockByAsset("Portraits/Principal/Reed final")[0];
  const thorin = blockByAsset("Portraits/Principal/Thorin_confusão").sort((a, b) => a.index - b.index);
  const ce16 = list.map((command, index) => ({ command, index })).filter(row => row.command.code === 117 && row.command.parameters[0] === 16).map(row => row.index);
  const monsterShow = list.findIndex(command => command.code === 231 && command.parameters[1] === "SF_Monster_3");
  const monsterErase = list.findIndex(command => command.code === 235 && command.parameters[0] === 1 && list.indexOf(command) > monsterShow);
  const finalText = list.findIndex(command => command.code === 401 && command.parameters[0].startsWith("Saudações, aventureiro!"));
  const finish = list.findIndex(command => command.code === 357 && command.parameters[0] === "Coreto_QuestVN" && command.parameters[1] === "FinishVisualNovel");
  check("ce16-count", ce16.length === 2, `CE16 count=${ce16.length}`);
  check("lifecycle-order", melia.index < thorin[0].index && thorin[0].index < ce16[0] && ce16[0] < exitBlocks[0].index && exitBlocks[0].index < monsterShow && monsterShow < monsterErase && monsterErase < saparo.index && saparo.index < thorin[1].index && thorin[1].index < ce16[1] && ce16[1] < graphicBlocks[0].index && graphicBlocks[0].index < exitBlocks[1].index && exitBlocks[1].index < rheed.index && rheed.index < finalText && finalText < exitBlocks[2].index && exitBlocks[2].index < finish, JSON.stringify({ melia: melia.index, thorin: thorin.map(item => item.index), ce16, exits: exitBlocks.map(item => item.index), monsterShow, monsterErase, saparo: saparo.index, graphic: graphicBlocks[0].index, rheed: rheed.index, finalText, finish }));

  const active = new Map();
  const snapshots = { ce16: [], monster: null, finalText: null, finish: null };
  for (let index = 0; index < list.length; index += 1) {
    const command = list[index];
    if (isBust(command)) {
      const name = command.parameters[1];
      const args = command.parameters[3];
      if (name === "Basic_EnterBust") active.set(args["PictureID:eval"], args["PictureName:str"]);
      if (name === "Basic_GraphicChange") {
        check(`graphic-active-${index}`, active.has(args["PictureID:eval"]), `Picture ${args["PictureID:eval"]} ativo antes de GraphicChange`);
        active.set(args["PictureID:eval"], args["PictureName:str"]);
      }
      if (name === "Basic_ExitBusts") {
        for (const id of JSON.parse(args["PictureID:arrayeval"])) active.delete(id);
      }
    }
    if (command.code === 117 && command.parameters[0] === 16) snapshots.ce16.push(Object.fromEntries(active));
    if (index === monsterShow) snapshots.monster = Object.fromEntries(active);
    if (index === finalText) snapshots.finalText = Object.fromEntries(active);
    if (index === finish) snapshots.finish = Object.fromEntries(active);
  }
  check("ce16-active-busts", canonical(snapshots.ce16) === canonical([
    { "1": "Portraits/Principal/Mélia_desespero", "2": "Portraits/Principal/Thorin_confusão" },
    { "1": "Portraits/Principal/Sáparo_pistola", "2": "Portraits/Principal/Thorin_confusão" },
  ]), JSON.stringify(snapshots.ce16));
  check("monster-bust-cleanup", canonical(snapshots.monster) === canonical({}), JSON.stringify(snapshots.monster));
  check("final-active-busts", canonical(snapshots.finalText) === canonical({ "1": "Portraits/Principal/Reed final", "2": "Portraits/Principal/Thorin_bobo" }), JSON.stringify(snapshots.finalText));
  check("finish-bust-cleanup", canonical(snapshots.finish) === canonical({}), JSON.stringify(snapshots.finish));

  const bustAssets = blocks.filter(block => ["Basic_EnterBust", "Basic_GraphicChange"].includes(block.command.parameters[1])).map(block => block.command.parameters[3]["PictureName:str"]);
  check("picture-names-non-empty", bustAssets.every(Boolean), JSON.stringify(bustAssets));
  const assetResults = [...new Set(bustAssets)].map(asset => ({ asset, exists_exact_png: exactPathExists(`frontend/img/pictures/${asset}`) }));
  check("bust-assets-exist", assetResults.every(item => item.exists_exact_png), JSON.stringify(assetResults));
  check("monster-asset-exists", exactPathExists("frontend/img/pictures/SF_Monster_3"), "frontend/img/pictures/SF_Monster_3.png");

  const assertCount = list.filter(command => command.code === 357 && command.parameters[0] === "Coreto_QuestVN" && command.parameters[1] === "AssertVisualNovelSession").length;
  const finishCount = list.filter(command => command.code === 357 && command.parameters[0] === "Coreto_QuestVN" && command.parameters[1] === "FinishVisualNovel").length;
  check("vn-boundaries", assertCount === 1 && finishCount === 1 && list[0].parameters[1] === "AssertVisualNovelSession" && list[finish].parameters[1] === "FinishVisualNovel", JSON.stringify({ assertCount, finishCount, finish }));

  const envelopeValidator = "E:/Projetos/loki-framework/skills/rpg-maker-mz-project-inventory/scripts/validate_plugins_js_envelope.py";
  const envelope = spawnSync("py", ["-3", envelopeValidator, "frontend/js/plugins.js"], { cwd: projectRoot, encoding: "utf8" });
  check("plugins-envelope", envelope.status === 0 && envelope.stdout.includes("editor-structural: valid"), `${envelope.stdout}${envelope.stderr}`.trim());
  const context = {};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(projectRoot, "frontend/js/plugins.js"), "utf8"), context, { filename: "frontend/js/plugins.js" });
  const pluginIndex = context.$plugins.findIndex(plugin => plugin.name === "VisuMZ_2_VNPictureBusts");
  const plugin = context.$plugins[pluginIndex];
  check("plugin-active", pluginIndex === 23 && plugin?.status === true, JSON.stringify({ order: pluginIndex + 1, status: plugin?.status }));

  const invertedScale = JSON.parse(plugin.parameters["InvertedScale:arraynum"]);
  check("plugin-inverted-scale", canonical(invertedScale) === canonical(["0", "1", "2", "3", "4", "5"]), JSON.stringify(invertedScale));
  const meliaArgs = melia.command.parameters[3];
  const meliaPosition = meliaArgs["Position:num"];
  const meliaMirrorMode = meliaArgs["HorzMirror:str"];
  const meliaEffectiveMirror = meliaMirrorMode === "Auto"
    ? invertedScale.includes(meliaPosition)
    : meliaMirrorMode === "Auto-Reverse"
      ? !invertedScale.includes(meliaPosition)
      : meliaMirrorMode === "Mirror";
  check("melia-facing-mode", meliaPosition === "9" && meliaMirrorMode === "Auto-Reverse", JSON.stringify({ position: meliaPosition, mirror: meliaMirrorMode }));
  check("melia-facing-effective-mirror", meliaEffectiveMirror === true, JSON.stringify({ invertedScale, position: meliaPosition, mode: meliaMirrorMode, effectiveMirror: meliaEffectiveMirror }));

  const vnBustPluginSource = fs.readFileSync(path.join(projectRoot, "frontend/js/plugins/VisuMZ_2_VNPictureBusts.js"), "utf8");
  check("plugin-mirror-source-semantics", vnBustPluginSource.includes("Which positions will be mirrored horizontally?")
    && vnBustPluginSource.includes("if (_0x4bb058 === 'AUTO')")
    && vnBustPluginSource.includes("return !_0x4ecffc[_0x34bcac(0x76)][_0x34bcac(0xcc)](_0x236c56)"), "Local plugin source defines Auto from InvertedScale membership and Auto-Reverse as its negation");

  const engine = fs.readFileSync(path.join(projectRoot, "frontend/js/rmmz_objects.js"), "utf8");
  check("command357-engine-semantics", /Game_Interpreter\.prototype\.command357\s*=\s*function\(params\)[\s\S]*?PluginManager\.callCommand\(this, pluginName, params\[1\], params\[3\]\)/.test(engine), "command357 encaminha params[1] e params[3] ao PluginManager");
  check("command221-engine-semantics", /Game_Interpreter\.prototype\.command221\s*=\s*function\(\)[\s\S]*?\$gameScreen\.startFadeOut\(this\.fadeSpeed\(\)\)[\s\S]*?this\.wait\(this\.fadeSpeed\(\)\)/.test(engine), "command221 executa Fadeout Screen e aguarda fadeSpeed no engine local");

  const diffCheck = spawnSync("git", ["diff", "--check", "--", mapRef], { cwd: projectRoot, encoding: "utf8" });
  check("git-diff-check", diffCheck.status === 0 && !diffCheck.stdout.trim(), `${diffCheck.stdout}${diffCheck.stderr}`.trim() || "clean; safecrlf warning absent");
  const numstat = spawnSync("git", ["diff", "--numstat", "--", mapRef], { cwd: projectRoot, encoding: "utf8" });
  const parts = numstat.stdout.trim().split(/\s+/);
  const additions = Number(parts[0]);
  const deletions = Number(parts[1]);
  check("restricted-diff-size", numstat.status === 0 && parts[2] === mapRef && Number.isInteger(additions) && Number.isInteger(deletions) && additions <= 250 && deletions <= 250, JSON.stringify({ additions, deletions, file: parts[2] }));

  const acceptanceCriteria = ["AC-MAP049-1", "AC-MAP049-2", "AC-MAP049-3", "AC-MAP049-4", "AC-MAP049-5", "AC-MAP049-6"].map(id => ({ id, status: "passed" }));
  const payload = {
    schema_version: 1,
    validator: "validate-map049-busts.mjs",
    validator_version: "1.2.0",
    route: "deterministic",
    task_ref: "planos/006-busts-position/task-1.1.md",
    target_ref: mapRef,
    target_digest: targetDigest,
    generated_at_utc: new Date().toISOString(),
    result: "passed",
    acceptance_criteria: acceptanceCriteria,
    checks,
    limitations: ["Static validation does not replace runtime evidence; the post-correction Playtest pass is persisted separately."],
  };
  const evidenceDigest = publish(payload);
  console.log(JSON.stringify({ result: "passed", evidence_ref: outputRef, evidence_digest: evidenceDigest, target_digest: targetDigest }));
} catch (error) {
  const payload = {
    schema_version: 1,
    validator: "validate-map049-busts.mjs",
    validator_version: "1.2.0",
    route: "deterministic",
    task_ref: "planos/006-busts-position/task-1.1.md",
    target_ref: mapRef,
    target_digest: targetDigest,
    generated_at_utc: new Date().toISOString(),
    result: "failed",
    acceptance_criteria: [],
    checks,
    error: String(error?.message ?? error),
    limitations: ["Runtime visual validation was not attempted."],
  };
  try {
    const evidenceDigest = publish(payload);
    console.error(JSON.stringify({ result: "failed", evidence_ref: outputRef, evidence_digest: evidenceDigest, error: payload.error }));
  } catch (publishError) {
    console.error(JSON.stringify({ result: "failed", evidence_ref: null, error: payload.error, evidence_error: String(publishError?.message ?? publishError) }));
  }
  process.exitCode = 1;
}
