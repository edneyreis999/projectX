import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "../../../..");
const manifestPath = resolve(scriptDir, "map045-repair-manifest.json");
const previewPath = resolve(scriptDir, "map045-preview.json");
const utf8 = new TextDecoder("utf-8", { fatal: true });

function abort(message) {
  throw new Error(message);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readUtf8(path) {
  const bytes = readFileSync(path);
  return { bytes, text: utf8.decode(bytes), sha256: sha256(bytes) };
}

function parseJson(text, label) {
  try {
    return JSON.parse(text);
  } catch (error) {
    abort(`${label} is not valid JSON: ${error.message}`);
  }
}

function pathKey(path) {
  return JSON.stringify(path);
}

function getAt(root, path) {
  let value = root;
  for (const segment of path) {
    if (value === null || value === undefined || !(segment in Object(value))) {
      abort(`Unresolved JSON path ${pathKey(path)}`);
    }
    value = value[segment];
  }
  return value;
}

function indexStringSpans(text) {
  const spans = new Map();
  let index = 0;

  function whitespace() {
    while (/\s/.test(text[index] ?? "")) index += 1;
  }

  function stringToken(path, record) {
    const start = index;
    if (text[index] !== '"') abort(`Expected string token at byte-like offset ${index}`);
    index += 1;
    let escaped = false;
    while (index < text.length) {
      const char = text[index];
      index += 1;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        const end = index;
        const value = JSON.parse(text.slice(start, end));
        if (record) {
          const key = pathKey(path);
          if (spans.has(key)) abort(`Duplicate string path ${key}`);
          spans.set(key, { start, end, value });
        }
        return value;
      }
    }
    abort(`Unterminated string token at offset ${start}`);
  }

  function value(path) {
    whitespace();
    const char = text[index];
    if (char === '"') {
      stringToken(path, true);
      return;
    }
    if (char === "{") {
      index += 1;
      whitespace();
      if (text[index] === "}") {
        index += 1;
        return;
      }
      while (index < text.length) {
        whitespace();
        const key = stringToken(path, false);
        whitespace();
        if (text[index] !== ":") abort(`Expected ':' at offset ${index}`);
        index += 1;
        value([...path, key]);
        whitespace();
        if (text[index] === "}") {
          index += 1;
          return;
        }
        if (text[index] !== ",") abort(`Expected ',' at offset ${index}`);
        index += 1;
      }
      abort("Unterminated object");
    }
    if (char === "[") {
      index += 1;
      whitespace();
      if (text[index] === "]") {
        index += 1;
        return;
      }
      let itemIndex = 0;
      while (index < text.length) {
        value([...path, itemIndex]);
        itemIndex += 1;
        whitespace();
        if (text[index] === "]") {
          index += 1;
          return;
        }
        if (text[index] !== ",") abort(`Expected ',' at offset ${index}`);
        index += 1;
      }
      abort("Unterminated array");
    }
    const start = index;
    while (index < text.length && !/[\s,\]}]/.test(text[index])) index += 1;
    if (start === index) abort(`Expected JSON value at offset ${index}`);
    JSON.parse(text.slice(start, index));
  }

  value([]);
  whitespace();
  if (index !== text.length) abort(`Unexpected trailing JSON content at offset ${index}`);
  return spans;
}

const cp1252Specials = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

function recoverOnce(source) {
  const bytes = [];
  for (const char of source) {
    const codePoint = char.codePointAt(0);
    if (cp1252Specials.has(codePoint)) {
      bytes.push(cp1252Specials.get(codePoint));
    } else if (codePoint <= 0xff) {
      bytes.push(codePoint);
    } else {
      abort(`Character U+${codePoint.toString(16).toUpperCase()} is not encodable as Windows-1252`);
    }
  }
  try {
    return utf8.decode(Uint8Array.from(bytes));
  } catch (error) {
    abort(`Windows-1252 to UTF-8 recovery failed: ${error.message}`);
  }
}

function recover(source, passes) {
  let value = source;
  for (let pass = 0; pass < passes; pass += 1) value = recoverOnce(value);
  return value;
}

function collectLeafDiffs(before, after, path = [], output = []) {
  if (Object.is(before, after)) return output;
  const beforeArray = Array.isArray(before);
  const afterArray = Array.isArray(after);
  if (beforeArray || afterArray) {
    if (!beforeArray || !afterArray || before.length !== after.length) {
      output.push(path);
      return output;
    }
    for (let i = 0; i < before.length; i += 1) {
      collectLeafDiffs(before[i], after[i], [...path, i], output);
    }
    return output;
  }
  const beforeObject = before !== null && typeof before === "object";
  const afterObject = after !== null && typeof after === "object";
  if (beforeObject || afterObject) {
    if (!beforeObject || !afterObject) {
      output.push(path);
      return output;
    }
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);
    if (JSON.stringify(beforeKeys) !== JSON.stringify(afterKeys)) {
      output.push(path);
      return output;
    }
    for (const key of beforeKeys) {
      collectLeafDiffs(before[key], after[key], [...path, key], output);
    }
    return output;
  }
  output.push(path);
  return output;
}

function writeAtomic(path, contents) {
  const temporary = resolve(dirname(path), `.${basename(path)}.${process.pid}.tmp`);
  try {
    writeFileSync(temporary, contents);
    renameSync(temporary, path);
  } finally {
    if (existsSync(temporary)) unlinkSync(temporary);
  }
}

function loadManifest() {
  const manifestRead = readUtf8(manifestPath);
  const manifest = parseJson(manifestRead.text, "repair manifest");
  if (manifest.schemaVersion !== 1 || manifest.taskId !== "task-1.1") abort("Unexpected manifest identity");
  if (manifest.repairMode !== "windows-1252-bytes-to-utf8" || manifest.lifecycle !== "one-shot") abort("Unexpected repair contract");
  if (manifest.expectedChangeCount !== 30 || manifest.entries?.length !== 30) abort("Manifest must freeze exactly 30 entries");
  const ids = new Set(manifest.entries.map(entry => entry.id));
  const paths = new Set(manifest.entries.map(entry => pathKey(entry.path)));
  if (ids.size !== 30 || paths.size !== 30) abort("Manifest IDs and paths must be unique");
  return { manifest, manifestSha256: manifestRead.sha256 };
}

function validateGuards(manifest) {
  for (const guard of manifest.guardFiles) {
    const read = readUtf8(resolve(projectRoot, guard.path));
    if (read.sha256 !== guard.sha256) abort(`Guard file drift: ${guard.path}`);
  }
}

function validateBaseline(manifest) {
  validateGuards(manifest);
  const targetPath = resolve(projectRoot, manifest.targetFile);
  const current = readUtf8(targetPath);
  if (current.sha256 !== manifest.targetBaselineSha256) {
    abort(`Map045 baseline drift: expected ${manifest.targetBaselineSha256}, got ${current.sha256}`);
  }
  const object = parseJson(current.text, manifest.targetFile);
  const spans = indexStringSpans(current.text);
  for (const entry of manifest.entries) {
    const actual = getAt(object, entry.path);
    if (actual !== entry.source) abort(`Source drift at ${entry.id}`);
    if (typeof actual !== "string" || entry.source === entry.expected) abort(`Invalid frozen values at ${entry.id}`);
    if (recover(entry.source, entry.passes) !== entry.expected) abort(`Frozen recovery mismatch at ${entry.id}`);
    const span = spans.get(pathKey(entry.path));
    if (!span || span.value !== entry.source) abort(`String token span mismatch at ${entry.id}`);
    if (entry.code !== undefined) {
      const command = object.events[entry.eventId]?.pages[entry.page - 1]?.list[entry.listIndex];
      if (!command || command.code !== entry.code || command.parameters[entry.parameterIndex] !== entry.source) {
        abort(`Command locator mismatch at ${entry.id}`);
      }
    } else if (object.events[entry.eventId]?.name !== entry.source) {
      abort(`Event-name locator mismatch at ${entry.id}`);
    }
  }
  return { ...current, object, spans, targetPath };
}

function validateRepairedState(manifest) {
  validateGuards(manifest);
  const targetPath = resolve(projectRoot, manifest.targetFile);
  const current = readUtf8(targetPath);
  if (!manifest.expectedRepairedSha256 || current.sha256 !== manifest.expectedRepairedSha256) {
    abort(`Map045 repaired-state drift: expected ${manifest.expectedRepairedSha256}, got ${current.sha256}`);
  }
  const object = parseJson(current.text, manifest.targetFile);
  const spans = indexStringSpans(current.text);
  const replacements = [];
  for (const entry of manifest.entries) {
    const actual = getAt(object, entry.path);
    if (actual !== entry.expected) abort(`Expected-value drift at ${entry.id}`);
    if (recover(entry.source, entry.passes) !== entry.expected) abort(`Frozen recovery mismatch at ${entry.id}`);
    const span = spans.get(pathKey(entry.path));
    if (!span || span.value !== entry.expected) abort(`Repaired string token span mismatch at ${entry.id}`);
    replacements.push({ ...span, replacement: JSON.stringify(entry.source) });
    if (entry.code !== undefined) {
      const command = object.events[entry.eventId]?.pages[entry.page - 1]?.list[entry.listIndex];
      if (!command || command.code !== entry.code || command.parameters[entry.parameterIndex] !== entry.expected) {
        abort(`Repaired command locator mismatch at ${entry.id}`);
      }
    } else if (object.events[entry.eventId]?.name !== entry.expected) {
      abort(`Repaired event-name locator mismatch at ${entry.id}`);
    }
  }
  replacements.sort((left, right) => right.start - left.start);
  let baselineText = current.text;
  for (const replacement of replacements) {
    baselineText = baselineText.slice(0, replacement.start) + replacement.replacement + baselineText.slice(replacement.end);
  }
  const baselineBytes = Buffer.from(baselineText, "utf8");
  const baselineSha256 = sha256(baselineBytes);
  if (baselineSha256 !== manifest.targetBaselineSha256) {
    abort(`Reconstructed baseline drift: expected ${manifest.targetBaselineSha256}, got ${baselineSha256}`);
  }
  const baselineObject = parseJson(baselineText, "reconstructed Map045 baseline");
  const actualDiffs = collectLeafDiffs(baselineObject, object).map(pathKey).sort();
  const expectedDiffs = manifest.entries.map(entry => pathKey(entry.path)).sort();
  if (JSON.stringify(actualDiffs) !== JSON.stringify(expectedDiffs)) {
    abort("Repaired state does not differ from its reconstructed baseline at exactly the 30 allowlisted leaves");
  }
  const baseline = {
    bytes: baselineBytes,
    text: baselineText,
    sha256: baselineSha256,
    object: baselineObject,
    spans: indexStringSpans(baselineText),
    targetPath,
  };
  return { ...current, object, spans, targetPath, baseline };
}

function prepareRepair(baseline, manifest) {
  const replacements = manifest.entries.map(entry => {
    const span = baseline.spans.get(pathKey(entry.path));
    return { ...span, id: entry.id, replacement: JSON.stringify(entry.expected) };
  }).sort((left, right) => right.start - left.start);
  let repairedText = baseline.text;
  for (const replacement of replacements) {
    repairedText = repairedText.slice(0, replacement.start) + replacement.replacement + repairedText.slice(replacement.end);
  }
  const repairedObject = parseJson(repairedText, "prepared Map045");
  const actualDiffs = collectLeafDiffs(baseline.object, repairedObject).map(pathKey).sort();
  const expectedDiffs = manifest.entries.map(entry => pathKey(entry.path)).sort();
  if (JSON.stringify(actualDiffs) !== JSON.stringify(expectedDiffs)) abort("Prepared diff is not exactly the 30 allowlisted leaves");
  for (const entry of manifest.entries) {
    if (getAt(repairedObject, entry.path) !== entry.expected) abort(`Prepared value mismatch at ${entry.id}`);
  }
  return { repairedText, repairedObject, repairedSha256: sha256(Buffer.from(repairedText, "utf8")) };
}

function previewRecord(manifest, manifestSha256, prepared) {
  return {
    schemaVersion: 1,
    taskId: manifest.taskId,
    status: "static-repair-applied-runtime-pending",
    targetFile: manifest.targetFile,
    manifestSha256,
    baselineSha256: manifest.targetBaselineSha256,
    repairedSha256: prepared.repairedSha256,
    changeCount: manifest.entries.length,
    changes: manifest.entries.map(entry => ({
      id: entry.id,
      path: entry.path,
      passes: entry.passes,
      source: entry.source,
      expected: entry.expected,
    })),
    guardFiles: manifest.guardFiles,
    humanGate: "Playtest pending",
  };
}

function main() {
  const { manifest, manifestSha256 } = loadManifest();
  const targetPath = resolve(projectRoot, manifest.targetFile);
  const observed = readUtf8(targetPath);
  let state;
  let repairedState;
  let baseline;
  if (observed.sha256 === manifest.targetBaselineSha256) {
    state = "baseline-ready";
    baseline = validateBaseline(manifest);
  } else if (observed.sha256 === manifest.expectedRepairedSha256) {
    state = "already-repaired";
    repairedState = validateRepairedState(manifest);
    baseline = repairedState.baseline;
  } else {
    abort(`Map045 is neither the frozen baseline nor the frozen repaired state: ${observed.sha256}`);
  }
  const prepared = prepareRepair(baseline, manifest);
  if (prepared.repairedSha256 !== manifest.expectedRepairedSha256) {
    abort(`Prepared repaired hash mismatch: expected ${manifest.expectedRepairedSha256}, got ${prepared.repairedSha256}`);
  }
  if (state === "already-repaired" && prepared.repairedText !== repairedState.text) {
    abort("Current repaired Map045 bytes differ from the deterministic prepared repair");
  }
  if (process.argv.includes("--check")) {
    process.stdout.write(`${JSON.stringify({ status: state, mapWriteRequired: state === "baseline-ready", targetSha256: observed.sha256, reconstructedBaselineSha256: baseline.sha256, plannedSha256: prepared.repairedSha256, changes: 30 })}\n`);
    return;
  }

  if (state === "already-repaired") {
    const immediate = validateRepairedState(manifest);
    if (immediate.sha256 !== repairedState.sha256 || immediate.text !== repairedState.text) {
      abort("Map045 changed while reconciliation artifacts were being prepared");
    }
    const preview = `${JSON.stringify(previewRecord(manifest, manifestSha256, prepared), null, 2)}\n`;
    writeAtomic(previewPath, preview);
    const after = validateRepairedState(manifest);
    if (after.sha256 !== immediate.sha256 || after.text !== immediate.text) {
      abort("Map045 changed while the preview was reconciled");
    }
    process.stdout.write(`${JSON.stringify({ status: "already-repaired-artifacts-reconciled-runtime-pending", mapWritten: false, targetSha256: after.sha256, changes: 30, preview: "planos/003-falas-casa-forjaprata/builds/fase1/map045-preview.json" })}\n`);
    return;
  }

  if (existsSync(previewPath)) abort("Preview already exists; one-shot baseline writer refuses to overwrite it");

  const immediate = validateBaseline(manifest);
  if (immediate.sha256 !== baseline.sha256 || immediate.text !== baseline.text) abort("Map045 changed while the repair was being prepared");
  validateGuards(manifest);

  let mapWritten = false;
  try {
    writeAtomic(immediate.targetPath, Buffer.from(prepared.repairedText, "utf8"));
    mapWritten = true;
    const persisted = readUtf8(immediate.targetPath);
    parseJson(persisted.text, "persisted Map045");
    if (persisted.sha256 !== prepared.repairedSha256) abort("Persisted Map045 hash differs from prepared repair");
    validateGuards(manifest);
    const preview = `${JSON.stringify(previewRecord(manifest, manifestSha256, prepared), null, 2)}\n`;
    writeAtomic(previewPath, preview);
  } catch (error) {
    if (mapWritten) {
      const current = readUtf8(immediate.targetPath);
      if (current.sha256 === prepared.repairedSha256) {
        writeAtomic(immediate.targetPath, immediate.bytes);
        const restored = readUtf8(immediate.targetPath);
        if (restored.sha256 !== immediate.sha256) abort(`Repair failed and baseline recovery also failed: ${error.message}`);
      }
    }
    throw error;
  }

  process.stdout.write(`${JSON.stringify({ status: "static-repair-applied-runtime-pending", targetSha256: prepared.repairedSha256, changes: 30, preview: "planos/003-falas-casa-forjaprata/builds/fase1/map045-preview.json" })}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`repair-map045-encoding: ${error.message}\n`);
  process.exitCode = 1;
}
