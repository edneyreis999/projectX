import { createHash } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "../../../..");
const manifestPath = resolve(scriptDir, "map045-repair-manifest.json");
const previewPath = resolve(scriptDir, "map045-preview.json");
const reportPath = resolve(scriptDir, "map045-validation-report.json");
const utf8 = new TextDecoder("utf-8", { fatal: true });
const checks = [];

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
    throw new Error(`${label} is not valid JSON: ${error.message}`);
  }
}

function pathKey(path) {
  return JSON.stringify(path);
}

function getAt(root, path) {
  let value = root;
  for (const segment of path) {
    if (value === null || value === undefined || !(segment in Object(value))) {
      throw new Error(`Unresolved JSON path ${pathKey(path)}`);
    }
    value = value[segment];
  }
  return value;
}

function setAt(root, path, nextValue) {
  let owner = root;
  for (let index = 0; index < path.length - 1; index += 1) owner = owner[path[index]];
  owner[path.at(-1)] = nextValue;
}

function record(name, condition, details = {}) {
  checks.push({ name, passed: Boolean(condition), details });
  if (!condition) throw new Error(`Validation failed: ${name}`);
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

function indexStringSpans(text) {
  const spans = new Map();
  let index = 0;
  const whitespace = () => { while (/\s/.test(text[index] ?? "")) index += 1; };

  function stringToken(path, shouldRecord) {
    const start = index;
    if (text[index] !== '"') throw new Error(`Expected string at offset ${index}`);
    index += 1;
    let escaped = false;
    while (index < text.length) {
      const char = text[index++];
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') {
        const end = index;
        const value = JSON.parse(text.slice(start, end));
        if (shouldRecord) spans.set(pathKey(path), { start, end, value });
        return value;
      }
    }
    throw new Error(`Unterminated string at offset ${start}`);
  }

  function value(path) {
    whitespace();
    if (text[index] === '"') return void stringToken(path, true);
    if (text[index] === "{") {
      index += 1;
      whitespace();
      if (text[index] === "}") return void (index += 1);
      while (index < text.length) {
        whitespace();
        const key = stringToken(path, false);
        whitespace();
        if (text[index++] !== ":") throw new Error(`Expected ':' at offset ${index - 1}`);
        value([...path, key]);
        whitespace();
        if (text[index] === "}") return void (index += 1);
        if (text[index++] !== ",") throw new Error(`Expected ',' at offset ${index - 1}`);
      }
      throw new Error("Unterminated object");
    }
    if (text[index] === "[") {
      index += 1;
      whitespace();
      if (text[index] === "]") return void (index += 1);
      let item = 0;
      while (index < text.length) {
        value([...path, item++]);
        whitespace();
        if (text[index] === "]") return void (index += 1);
        if (text[index++] !== ",") throw new Error(`Expected ',' at offset ${index - 1}`);
      }
      throw new Error("Unterminated array");
    }
    const start = index;
    while (index < text.length && !/[\s,\]}]/.test(text[index])) index += 1;
    if (start === index) throw new Error(`Expected value at offset ${index}`);
    JSON.parse(text.slice(start, index));
  }

  value([]);
  whitespace();
  if (index !== text.length) throw new Error(`Trailing JSON at offset ${index}`);
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
    const point = char.codePointAt(0);
    if (cp1252Specials.has(point)) bytes.push(cp1252Specials.get(point));
    else if (point <= 0xff) bytes.push(point);
    else throw new Error(`U+${point.toString(16).toUpperCase()} is not Windows-1252 encodable`);
  }
  return utf8.decode(Uint8Array.from(bytes));
}

function recover(source, passes) {
  let result = source;
  for (let pass = 0; pass < passes; pass += 1) result = recoverOnce(result);
  return result;
}

function collectLeafDiffs(before, after, path = [], output = []) {
  if (Object.is(before, after)) return output;
  if (Array.isArray(before) || Array.isArray(after)) {
    if (!Array.isArray(before) || !Array.isArray(after) || before.length !== after.length) return void output.push(path);
    before.forEach((value, index) => collectLeafDiffs(value, after[index], [...path, index], output));
    return output;
  }
  const beforeObject = before !== null && typeof before === "object";
  const afterObject = after !== null && typeof after === "object";
  if (beforeObject || afterObject) {
    if (!beforeObject || !afterObject) return void output.push(path);
    const beforeKeys = Object.keys(before);
    const afterKeys = Object.keys(after);
    if (JSON.stringify(beforeKeys) !== JSON.stringify(afterKeys)) return void output.push(path);
    beforeKeys.forEach(key => collectLeafDiffs(before[key], after[key], [...path, key], output));
    return output;
  }
  output.push(path);
  return output;
}

function pagesOf(map) {
  const pages = [];
  map.events.forEach((event, eventId) => {
    event?.pages?.forEach((page, pageIndex) => pages.push({ eventId, page: pageIndex + 1, pageData: page }));
  });
  return pages;
}

function summary(map) {
  const commandCounts = {};
  const pages = pagesOf(map);
  for (const { pageData } of pages) {
    for (const command of pageData.list) commandCounts[command.code] = (commandCounts[command.code] ?? 0) + 1;
  }
  return {
    events: map.events.filter(Boolean).length,
    pages: pages.length,
    commands: commandCounts,
  };
}

function branchFingerprint(map) {
  const branchCodes = new Set([102, 402, 403, 404, 111, 411, 412]);
  const result = [];
  for (const { eventId, page, pageData } of pagesOf(map)) {
    pageData.list.forEach((command, listIndex) => {
      if (branchCodes.has(command.code)) result.push({ eventId, page, listIndex, code: command.code, indent: command.indent, parameters: command.parameters });
    });
  }
  return result;
}

function validateBranchIndent(map) {
  for (const { eventId, page, pageData } of pagesOf(map)) {
    const list = pageData.list;
    for (let index = 0; index < list.length; index += 1) {
      const command = list[index];
      if (command.code === 102) {
        let end = -1;
        for (let cursor = index + 1; cursor < list.length; cursor += 1) {
          if (list[cursor].indent < command.indent) break;
          if (list[cursor].code === 404 && list[cursor].indent === command.indent) { end = cursor; break; }
        }
        if (end < 0) throw new Error(`Choice without matching 404 at E${eventId}/P${page}/L${index}`);
        const branches = list.slice(index + 1, end).filter(item => (item.code === 402 || item.code === 403) && item.indent === command.indent);
        const when = branches.filter(item => item.code === 402);
        if (!Array.isArray(command.parameters[0]) || when.length !== command.parameters[0].length) {
          throw new Error(`Choice branch count mismatch at E${eventId}/P${page}/L${index}`);
        }
        when.forEach((item, branchIndex) => {
          if (item.parameters[0] !== branchIndex) throw new Error(`Choice branch index mismatch at E${eventId}/P${page}/L${index}`);
        });
      }
      if (command.code === 111) {
        let end = -1;
        let elseCount = 0;
        for (let cursor = index + 1; cursor < list.length; cursor += 1) {
          if (list[cursor].indent < command.indent) break;
          if (list[cursor].code === 411 && list[cursor].indent === command.indent) elseCount += 1;
          if (list[cursor].code === 412 && list[cursor].indent === command.indent) { end = cursor; break; }
        }
        if (end < 0 || elseCount > 1) throw new Error(`Conditional branch mismatch at E${eventId}/P${page}/L${index}`);
      }
    }
  }
}

function messagePairing(map) {
  let orphan401 = 0;
  let empty101 = 0;
  for (const { pageData } of pagesOf(map)) {
    pageData.list.forEach((command, index, list) => {
      if (command.code === 401 && ![101, 401].includes(list[index - 1]?.code)) orphan401 += 1;
      if (command.code === 101 && list[index + 1]?.code !== 401) empty101 += 1;
    });
  }
  return { orphan401, empty101 };
}

function extractCommands(map, acceptedCodes) {
  const result = [];
  for (const { eventId, page, pageData } of pagesOf(map)) {
    pageData.list.forEach((command, listIndex) => {
      if (acceptedCodes.has(command.code)) result.push({ eventId, page, listIndex, command });
    });
  }
  return result;
}

function narrativeAssignmentContracts(map, authorizedOperandPaths) {
  const result = [];
  for (const { eventId, page, pageData } of pagesOf(map)) {
    pageData.list.forEach((command, listIndex) => {
      if (command.code !== 122 || command.parameters[0] > 103 || command.parameters[1] < 101) return;
      const parameters = structuredClone(command.parameters);
      const operandPath = pathKey(["events", eventId, "pages", page - 1, "list", listIndex, "parameters", 4]);
      if (authorizedOperandPaths.has(operandPath)) parameters[4] = "<ALLOWLISTED-TEXT-OPERAND>";
      result.push({
        eventId,
        page,
        listIndex,
        code: command.code,
        indent: command.indent,
        startVariableId: parameters[0],
        endVariableId: parameters[1],
        operation: parameters[2],
        operandType: parameters[3],
        operandValueOrSentinel: parameters[4],
        remainingParameters: parameters.slice(5),
      });
    });
  }
  return result;
}

function replaceManifestStrings(text, manifest, fromField, toField) {
  const spans = indexStringSpans(text);
  const replacements = manifest.entries.map(entry => {
    const span = spans.get(pathKey(entry.path));
    if (!span || span.value !== entry[fromField]) throw new Error(`${fromField} string span mismatch at ${entry.id}`);
    return { ...span, replacement: JSON.stringify(entry[toField]) };
  }).sort((left, right) => right.start - left.start);
  let output = text;
  for (const item of replacements) output = output.slice(0, item.start) + item.replacement + output.slice(item.end);
  return output;
}

function validateManifest(manifest) {
  record("manifest-identity", manifest.schemaVersion === 1 && manifest.taskId === "task-1.1" && manifest.targetFile === "frontend/data/Map045.json");
  record("manifest-repaired-state-hash", typeof manifest.expectedRepairedSha256 === "string" && manifest.expectedRepairedSha256.length === 64);
  record("manifest-exactly-30-unique", manifest.expectedChangeCount === 30 && manifest.entries?.length === 30 && new Set(manifest.entries.map(item => item.id)).size === 30 && new Set(manifest.entries.map(item => pathKey(item.path))).size === 30);
  manifest.entries.forEach(entry => record(`frozen-recovery:${entry.id}`, recover(entry.source, entry.passes) === entry.expected, { passes: entry.passes }));
}

function validateGuardFiles(manifest) {
  for (const guard of manifest.guardFiles) {
    const actual = readUtf8(resolve(projectRoot, guard.path)).sha256;
    record(`guard-hash:${guard.path}`, actual === guard.sha256, { expected: guard.sha256, actual });
  }
}

function validateBaselineStructure(map, manifest) {
  const actual = summary(map);
  record("event-count", actual.events === manifest.expectedCounts.events, { expected: manifest.expectedCounts.events, actual: actual.events });
  record("page-count", actual.pages === manifest.expectedCounts.pages, { expected: manifest.expectedCounts.pages, actual: actual.pages });
  for (const [code, expected] of Object.entries(manifest.expectedCounts.commands)) {
    record(`command-count:${code}`, actual.commands[code] === expected, { expected, actual: actual.commands[code] ?? 0 });
  }
  const pairing = messagePairing(map);
  record("show-text-pairing", pairing.orphan401 === 0 && pairing.empty101 === 0, pairing);
  validateBranchIndent(map);
  record("branch-indent-structure", true, { branchCommands: branchFingerprint(map).length });
  const callers = extractCommands(map, new Set([117])).filter(item => item.command.parameters[0] === 16);
  record("common-event-16-caller-count", callers.length === manifest.expectedCounts.commonEvent16Callers, { expected: manifest.expectedCounts.commonEvent16Callers, actual: callers.length });
}

function runPreflight(manifest, baseline, current) {
  record("repaired-state-hash", current.sha256 === manifest.expectedRepairedSha256, { expected: manifest.expectedRepairedSha256, current: current.sha256 });
  record("reconstructed-baseline-hash", baseline.sha256 === manifest.targetBaselineSha256, { expected: manifest.targetBaselineSha256, reconstructed: baseline.sha256 });
  const currentMap = parseJson(current.text, manifest.targetFile);
  manifest.entries.forEach(entry => {
    record(`expected-present:${entry.id}`, getAt(currentMap, entry.path) === entry.expected);
    if (entry.code !== undefined) {
      const command = currentMap.events[entry.eventId]?.pages[entry.page - 1]?.list[entry.listIndex];
      record(`locator-code:${entry.id}`, command?.code === entry.code && command.parameters[entry.parameterIndex] === entry.expected);
    }
  });
  validateBaselineStructure(currentMap, manifest);
  validateGuardFiles(manifest);
  process.stdout.write(`${JSON.stringify({ status: "validator-ready-reconciled-state-confirmed", checks: checks.length, targetSha256: current.sha256, reconstructedBaselineSha256: baseline.sha256 })}\n`);
}

function runPostValidation(manifest, manifestRead, baseline, current, previewRead) {
  const baselineMap = parseJson(baseline.text, "HEAD Map045 baseline");
  const currentMap = parseJson(current.text, "persisted Map045");
  const preview = parseJson(previewRead.text, "Map045 preview");

  record("repaired-state-hash", current.sha256 === manifest.expectedRepairedSha256, { expected: manifest.expectedRepairedSha256, actual: current.sha256 });
  record("reconstructed-baseline-hash", baseline.sha256 === manifest.targetBaselineSha256, { expected: manifest.targetBaselineSha256, actual: baseline.sha256 });
  const expectedRaw = replaceManifestStrings(baseline.text, manifest, "source", "expected");
  const expectedHash = sha256(Buffer.from(expectedRaw, "utf8"));
  record("byte-restricted-repair", current.text === expectedRaw, { expectedSha256: expectedHash, actualSha256: current.sha256 });

  const actualDiffs = collectLeafDiffs(baselineMap, currentMap).map(pathKey).sort();
  const allowedDiffs = manifest.entries.map(entry => pathKey(entry.path)).sort();
  record("exactly-30-allowlisted-leaf-diffs", actualDiffs.length === 30 && JSON.stringify(actualDiffs) === JSON.stringify(allowedDiffs), { actualCount: actualDiffs.length });

  const maskedBefore = structuredClone(baselineMap);
  const maskedAfter = structuredClone(currentMap);
  manifest.entries.forEach(entry => {
    setAt(maskedBefore, entry.path, "<ALLOWLISTED-MAP045-TEXT>");
    setAt(maskedAfter, entry.path, "<ALLOWLISTED-MAP045-TEXT>");
  });
  record("masked-deep-equality", JSON.stringify(maskedBefore) === JSON.stringify(maskedAfter));

  const mojibake = /\uFFFD|Ã|Â|â(?:€|†|‚|ƒ|„|…|ˆ|‰|Š|‹|Œ|Ž|‘|’|“|”|•|–|—|˜)/u;
  for (const entry of manifest.entries) {
    record(`expected-value:${entry.id}`, getAt(baselineMap, entry.path) === entry.source && getAt(currentMap, entry.path) === entry.expected);
    record(`unicode-clean:${entry.id}`, !getAt(currentMap, entry.path).includes("\uFFFD") && !mojibake.test(getAt(currentMap, entry.path)));
    if (entry.code !== undefined) {
      const command = currentMap.events[entry.eventId]?.pages[entry.page - 1]?.list[entry.listIndex];
      record(`command-code-preserved:${entry.id}`, command?.code === entry.code);
    }
  }

  validateBaselineStructure(currentMap, manifest);
  record("branch-payloads-preserved", JSON.stringify(branchFingerprint(baselineMap)) === JSON.stringify(branchFingerprint(currentMap)));
  const pluginPayloadBefore = extractCommands(baselineMap, new Set([357, 657]));
  const pluginPayloadAfter = extractCommands(currentMap, new Set([357, 657]));
  record("plugin-payloads-preserved", JSON.stringify(pluginPayloadBefore) === JSON.stringify(pluginPayloadAfter), { code357: pluginPayloadAfter.filter(item => item.command.code === 357).length, code657: pluginPayloadAfter.filter(item => item.command.code === 657).length });
  const callersBefore = extractCommands(baselineMap, new Set([117]));
  const callersAfter = extractCommands(currentMap, new Set([117]));
  record("common-event-callers-preserved", JSON.stringify(callersBefore) === JSON.stringify(callersAfter), { total: callersAfter.length, commonEvent16: callersAfter.filter(item => item.command.parameters[0] === 16).length });
  const authorizedOperandPaths = new Set(manifest.entries.filter(entry => entry.code === 122 && entry.parameterIndex === 4).map(entry => pathKey(entry.path)));
  const narrativeAssignmentsBefore = narrativeAssignmentContracts(baselineMap, authorizedOperandPaths);
  const narrativeAssignmentsAfter = narrativeAssignmentContracts(currentMap, authorizedOperandPaths);
  record(
    "narrative-variable-assignment-order-locators-codes-indents-ids-operations-and-nonallowlisted-parameters-preserved",
    JSON.stringify(narrativeAssignmentsBefore) === JSON.stringify(narrativeAssignmentsAfter),
    {
      assignments: narrativeAssignmentsAfter.length,
      authorizedOperandsMasked: authorizedOperandPaths.size,
      operandValuesValidatedSeparatelyBy: ["expected-value checks", "exact 30-path diff", "byte-restricted repair"],
    },
  );

  record("preview-identity", preview.schemaVersion === 1 && preview.taskId === manifest.taskId && preview.changeCount === 30 && preview.manifestSha256 === manifestRead.sha256);
  record("preview-hashes", preview.baselineSha256 === baseline.sha256 && preview.repairedSha256 === current.sha256);
  record("preview-values", JSON.stringify(preview.changes) === JSON.stringify(manifest.entries.map(entry => ({ id: entry.id, path: entry.path, passes: entry.passes, source: entry.source, expected: entry.expected }))));
  validateGuardFiles(manifest);

  return {
    schemaVersion: 1,
    taskId: manifest.taskId,
    status: "passed-static-runtime-pending",
    targetFile: manifest.targetFile,
    baselineSha256: baseline.sha256,
    repairedSha256: current.sha256,
    manifestSha256: manifestRead.sha256,
    previewSha256: previewRead.sha256,
    exactLeafChanges: actualDiffs.length,
    checks,
    validationCycleRefs: [
      "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/severity-finding-v1.json",
    ],
    auditFindingRefs: [
      "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/audit-report-v1.json",
    ],
    preflightRef: "planos/003-falas-casa-forjaprata/preflights/run-17d91eab7bf669664b09e697206afed0/technical-implementer/preflight-v2.md",
    externalChecksRequired: ["git diff --check"],
    humanGate: "Playtest pending; runtime not validated",
  };
}

function main() {
  const manifestRead = readUtf8(manifestPath);
  const manifest = parseJson(manifestRead.text, "repair manifest");
  validateManifest(manifest);
  const current = readUtf8(resolve(projectRoot, manifest.targetFile));
  const baselineText = replaceManifestStrings(current.text, manifest, "expected", "source");
  const baselineBytes = Buffer.from(baselineText, "utf8");
  const baseline = { text: baselineText, bytes: baselineBytes, sha256: sha256(baselineBytes) };
  if (process.argv.includes("--preflight")) {
    runPreflight(manifest, baseline, current);
    return;
  }
  if (!existsSync(previewPath)) throw new Error("Preview is missing");
  const previewRead = readUtf8(previewPath);
  const report = runPostValidation(manifest, manifestRead, baseline, current, previewRead);
  const reportText = `${JSON.stringify(report, null, 2)}\n`;
  if (process.argv.includes("--final")) {
    if (!existsSync(reportPath)) throw new Error("Primary validation report is missing");
    const persistedReport = readUtf8(reportPath);
    if (persistedReport.text !== reportText) throw new Error("Primary validation report is stale or differs from the complete final validation result");
    process.stdout.write(`${JSON.stringify({ status: "passed-final-static-runtime-pending", checks: report.checks.length, repairedSha256: report.repairedSha256, primaryReportSha256: persistedReport.sha256 })}\n`);
    return;
  }
  writeAtomic(reportPath, reportText);
  process.stdout.write(`${JSON.stringify({ status: report.status, checks: report.checks.length, repairedSha256: report.repairedSha256, report: "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json" })}\n`);
}

try {
  main();
} catch (error) {
  if (!process.argv.includes("--preflight") && !process.argv.includes("--final")) {
    const failed = {
      schemaVersion: 1,
      taskId: "task-1.1",
      status: "failed-static-validation",
      error: error.message,
      checks,
      humanGate: "Playtest not reached; runtime not validated",
    };
    try {
      writeAtomic(reportPath, `${JSON.stringify(failed, null, 2)}\n`);
    } catch (reportError) {
      process.stderr.write(`validate-map045-encoding: could not persist failure report: ${reportError.message}\n`);
    }
  }
  process.stderr.write(`validate-map045-encoding: ${error.message}\n`);
  process.exitCode = 1;
}
