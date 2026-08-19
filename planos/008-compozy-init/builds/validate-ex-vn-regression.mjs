import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const buildsRoot = path.dirname(scriptPath);
const repoRoot = path.resolve(buildsRoot, "../../..");
const evidenceRoot = "planos/008-compozy-init/builds/evidence";
const E2E_IDS = Array.from({ length: 7 }, (_, index) => `E2E-${String(index + 1).padStart(3, "0")}`);
const productionTargets = [
    "frontend/data/Map022.json",
    "frontend/data/Map045.json",
    "frontend/data/Map046.json",
    "frontend/data/Map049.json",
    "frontend/data/CoretoQuests.json",
    "frontend/data/MapInfos.json"
];
const lowerValidators = [
    {
        task: "task_01",
        validator: "validate-flow-state",
        script: "planos/008-compozy-init/builds/validate-flow-state.mjs",
        evidence: `${evidenceRoot}/flow-state.json`,
        testIds: ["UT-001", "UT-002", "UT-003", "UT-004", "IT-001", "IT-002", "IT-003"]
    },
    {
        task: "task_02",
        validator: "validate-map022-experience",
        script: "planos/008-compozy-init/builds/validate-map022-experience.mjs",
        evidence: `${evidenceRoot}/map022-experience.json`,
        testIds: ["UT-005", "UT-006", "UT-007", "IT-004", "IT-005"]
    },
    {
        task: "task_03",
        validator: "validate-map045-experience",
        script: "planos/008-compozy-init/builds/validate-map045-experience.mjs",
        evidence: `${evidenceRoot}/map045-experience.json`,
        testIds: ["UT-008", "UT-009", "UT-010", "IT-006", "IT-007"]
    }
];
const expectedTaskTests = Object.freeze({
    task_01: lowerValidators[0].testIds,
    task_02: lowerValidators[1].testIds,
    task_03: lowerValidators[2].testIds,
    task_04: E2E_IDS
});

class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const fail = (code, message) => { throw new ValidationError(code, message); };
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const shaBuffer = value => crypto.createHash("sha256").update(value).digest("hex");
const absolute = relative => path.join(repoRoot, relative);

function readText(relative) {
    try {
        return fs.readFileSync(absolute(relative), "utf8").replace(/^\uFEFF/, "");
    } catch (error) {
        fail("evidence_missing", `${relative}: ${error.message}`);
    }
}

function loadJson(relative) {
    try {
        return JSON.parse(readText(relative));
    } catch (error) {
        if (error instanceof ValidationError) throw error;
        fail("json_parse_failed", `${relative}: ${error.message}`);
    }
}

function fileHash(relative) {
    try {
        return shaBuffer(fs.readFileSync(absolute(relative)));
    } catch (error) {
        fail("evidence_missing", `${relative}: ${error.message}`);
    }
}

function hashesFor(targets) {
    return Object.fromEntries(targets.map(target => [target, fileHash(target)]));
}

function parseArguments(args) {
    if (args.length !== 2 || args[0] !== "--output" || !args[1]) {
        fail("validation_output_required", "pass --output under planos/008-compozy-init/builds/");
    }
    if (path.isAbsolute(args[1])) fail("validation_output_outside_active_plan", "output must be repository-relative");
    const output = path.resolve(repoRoot, args[1]);
    const relative = path.relative(buildsRoot, output);
    if (relative.startsWith("..") || path.isAbsolute(relative) || path.extname(output) !== ".json") {
        fail("validation_output_outside_active_plan", "output must remain under planos/008-compozy-init/builds/");
    }
    return output;
}

function plugin(command, pluginName, commandName) {
    return command?.code === 357 && command.parameters?.[0] === pluginName && command.parameters?.[1] === commandName;
}

function pagePluginCount(page, pluginName, commandName, predicate = () => true) {
    return page.list.filter(command => plugin(command, pluginName, commandName) && predicate(command.parameters?.[3] ?? {})).length;
}

function mapCommands(map, predicate) {
    return map.events.filter(Boolean).flatMap(event => event.pages.flatMap(page => page.list.filter(predicate)));
}

function checkPassed(evidence, testId) {
    const found = evidence.checks.filter(check => check.test_id === testId);
    if (found.length !== 1 || found[0].result !== "passed") {
        fail("lower_evidence_invalid", `${evidence.validator} ${testId} is not one passed check`);
    }
    return found[0];
}

function replayLowerValidators() {
    const replay = [];
    for (const item of lowerValidators) {
        try {
            const stdout = execFileSync(process.execPath, [item.script, "--output", item.evidence], {
                cwd: repoRoot,
                encoding: "utf8",
                stdio: ["ignore", "pipe", "pipe"]
            }).trim();
            replay.push({
                task: item.task,
                validator: item.validator,
                command: `node ${item.script} --output ${item.evidence}`,
                result: "passed",
                output: stdout
            });
        } catch (error) {
            const output = `${error.stdout ?? ""}\n${error.stderr ?? ""}`.trim();
            fail("lower_validator_failed", `${item.validator}: ${output || error.message}`);
        }
    }
    return replay;
}

function validateLowerEvidence() {
    const evidenceByTask = {};
    const sources = [];
    for (const item of lowerValidators) {
        const evidence = loadJson(item.evidence);
        if (evidence.schema_version !== 1 || evidence.validator !== item.validator ||
                evidence.result !== "passed" || evidence.classification !== "runtime_pending" ||
                !same(evidence.test_ids, item.testIds)) {
            fail("lower_evidence_invalid", `${item.evidence} schema/result/classification/test IDs drifted`);
        }
        const checkIds = evidence.checks.map(check => check.test_id);
        if (!same(checkIds, item.testIds) || evidence.checks.some(check => check.result !== "passed")) {
            fail("lower_evidence_invalid", `${item.evidence} does not contain exactly one passed check per assigned ID`);
        }
        for (const [target, recorded] of Object.entries(evidence.target_hashes ?? {})) {
            const current = fileHash(target);
            if (recorded !== current) fail("stale_evidence", `${item.evidence} records stale ${target}: ${recorded} != ${current}`);
        }
        evidenceByTask[item.task] = evidence;
        sources.push({
            task: item.task,
            evidence: item.evidence,
            evidence_hash: fileHash(item.evidence),
            target_hashes_verified: Object.keys(evidence.target_hashes).length
        });
    }
    return { evidenceByTask, sources };
}

function parseTaskTests(relative) {
    const source = readText(relative);
    const tests = source.match(/\n## Tests\n([\s\S]*?)(?=\n## )/)?.[1] ?? "";
    return [...new Set(tests.match(/\b(?:UT|IT|E2E)-\d{3}\b/g) ?? [])];
}

function validateTaskTraceability() {
    const owners = {};
    for (const [task, expected] of Object.entries(expectedTaskTests)) {
        const relative = `.compozy/tasks/ex-vn-coreto-forjaprata/${task}.md`;
        const actual = parseTaskTests(relative);
        if (!same(actual, expected)) fail("test_traceability_invalid", `${task} assigns ${JSON.stringify(actual)}`);
        for (const testId of actual) {
            if (owners[testId]) fail("test_traceability_invalid", `${testId} is assigned to ${owners[testId]} and ${task}`);
            owners[testId] = task;
        }
    }
    const expectedAll = [...lowerValidators.flatMap(item => item.testIds), ...E2E_IDS];
    if (!same(Object.keys(owners), expectedAll)) fail("test_traceability_invalid", "task assignment catalog is incomplete or reordered");
    return owners;
}

function requireTokens(source, tokens, code, scope) {
    for (const token of tokens) if (!source.includes(token)) fail(code, `${scope} is missing ${token}`);
}

function validateHumanRecord() {
    const relative = `${evidenceRoot}/human-playtest-template.md`;
    const source = readText(relative);
    requireTokens(source, [
        "schema_version: 1", "record_version: ex-vn-coreto-forjaprata-task04-v1",
        "overall_status: not_executed", "evidence_class: human_observation",
        "no connected RPG Maker MZ editor/desktop client and no human participants",
        "Record what\nhappened before answering any evaluative question",
        "Verdict: `not_executed`", "Perceptual approval: not granted"
    ], "human_gate_contract_invalid", relative);
    const forbiddenApproval = /Verdict:\s*`approved`|overall_status:\s*approved/;
    if (forbiddenApproval.test(source)) fail("human_gate_contract_invalid", "unexecuted human evidence is represented as approval");
    for (const target of productionTargets) {
        if (!source.includes(`\`${target}\`: \`${fileHash(target)}\``)) {
            fail("stale_evidence", `${relative} does not identify current ${target}`);
        }
    }
    return { relative, source, hash: fileHash(relative), status: "not_executed" };
}

function makeCheck(testId, evidenceClass, targets, details, finding) {
    return {
        test_id: testId,
        owning_task: "task_04",
        result: "passed",
        evidence_class: evidenceClass,
        target_hashes: hashesFor(targets),
        finding: { status: finding.status, summary: finding.summary },
        details
    };
}

function validateE2E({ evidenceByTask, human, replay, owners }) {
    const map022 = loadJson("frontend/data/Map022.json");
    const map045 = loadJson("frontend/data/Map045.json");
    const map046 = loadJson("frontend/data/Map046.json");
    const map049 = loadJson("frontend/data/Map049.json");
    const fixture = loadJson("planos/008-compozy-init/builds/fixtures/flow-state-positive.json");
    const checks = [];

    const newGameCounts = {
        map022_enter_vn: pagePluginCount(map022.events[18].pages[0], "Coreto_QuestVN", "EnterVisualNovel"),
        map046_complete: pagePluginCount(map046.events[1].pages[0], "Coreto_QuestCore", "QuestTransition", args => args.transitionId === "COMPLETE_VN"),
        map046_finish: pagePluginCount(map046.events[1].pages[0], "Coreto_QuestVN", "FinishVisualNovel"),
        map022_arrive_045: pagePluginCount(map022.events[17].pages[1], "Coreto_QuestCore", "QuestTransition", args => args.transitionId === "ARRIVE_MAP045"),
        map045_enter_vn: pagePluginCount(map045.events[11].pages[0], "Coreto_QuestVN", "EnterVisualNovel", args => args.entryKey === "ABERTURA_FORJAPRATA"),
        map049_finish: pagePluginCount(map049.events[1].pages[0], "Coreto_QuestVN", "FinishVisualNovel")
    };
    if (Object.values(newGameCounts).some(value => value !== 1)) fail("e2e_new_game_invalid", JSON.stringify(newGameCounts));
    checkPassed(evidenceByTask.task_01, "IT-001");
    checkPassed(evidenceByTask.task_01, "IT-002");
    checkPassed(evidenceByTask.task_03, "IT-006");
    checks.push(makeCheck("E2E-001", "automated_structural", productionTargets,
        { state_path: ["New Game/Map022", "Map046", "Map022", "Map045", "Map049", "Map045", "sling loop", "Map044"], cardinality: newGameCounts },
        { status: "verified", summary: "The complete structural New Game-equivalent chain has one owner per transition and VN return; runtime control recovery remains a human gate." }));

    const requiredCases = ["pre-entry", "active-vn", "returning-forjaprata", "post-return"];
    if (!same(fixture.cases.map(item => item.id), requiredCases) ||
            !same(fixture.cases.filter(item => item.session).map(item => item.session.phase), ["active", "returning"])) {
        fail("e2e_save_load_invalid", "flow-state-positive save/load phases drifted");
    }
    const task03Fixtures = checkPassed(evidenceByTask.task_03, "IT-006").details.fixtures;
    if (!task03Fixtures.some(item => item.name === "save-load-post-acquire" && item.result === "passed")) {
        fail("e2e_save_load_invalid", "Forjaprata post-acquire save/load fixture is missing");
    }
    checkPassed(evidenceByTask.task_01, "IT-003");
    checks.push(makeCheck("E2E-002", "automated_state_fixture", [
        "planos/008-compozy-init/builds/fixtures/flow-state-positive.json",
        "frontend/data/Map022.json", "frontend/data/Map045.json", "frontend/data/Map046.json", "frontend/data/Map049.json"
    ], { phases: requiredCases, session_phases: ["active", "returning"], forjaprata_round_trip: "save-load-post-acquire" },
    { status: "verified", summary: "Pre-entry, active VN, returning, post-return, and post-acquisition state fixtures converge structurally; real save serialization remains unexecuted." }));

    const repeatCounts = {
        complete_vn: mapCommands(map046, command => plugin(command, "Coreto_QuestCore", "QuestTransition") && command.parameters?.[3]?.transitionId === "COMPLETE_VN").length,
        arrive_map045: mapCommands(map022, command => plugin(command, "Coreto_QuestCore", "QuestTransition") && command.parameters?.[3]?.transitionId === "ARRIVE_MAP045").length,
        sling_grant: mapCommands(map045, command => plugin(command, "Coreto_Quests", "addWeapon") && command.parameters?.[3]?.weaponID === "1").length,
        found_sling: mapCommands(map045, command => plugin(command, "Coreto_QuestCore", "QuestTransition") && command.parameters?.[3]?.transitionId === "FOUND_SLING").length
    };
    if (Object.values(repeatCounts).some(value => value !== 1) || map022.events[18].pages[1].trigger === 3 || map045.events[20].pages[2].list.length !== 1) {
        fail("e2e_reentry_invalid", JSON.stringify(repeatCounts));
    }
    checks.push(makeCheck("E2E-003", "automated_structural", ["frontend/data/Map022.json", "frontend/data/Map045.json", "frontend/data/Map046.json"],
        { one_shot_cardinality: repeatCounts, terminal_pages: ["Map022:E18:P2", "Map045:E20:P3"] },
        { status: "verified", summary: "Repeated-entry targets expose one transition/reward owner and stable structural terminal pages; repeated runtime interaction remains a human gate." }));

    requireTokens(human.source, ["PT-M022-01", "PT-M022-02", "PT-M022-03", "PT-M022-04", "PT-M022-05", "PT-M022-06", "five of six", "90 seconds", "no runtime timer or telemetry was added"],
        "human_gate_contract_invalid", "E2E-004");
    checks.push(makeCheck("E2E-004", "human_gate_contract", [human.relative, "frontend/data/Map022.json"],
        { gate_status: "not_executed", scenarios: ["PT-M022-01", "PT-M022-02", "PT-M022-03", "PT-M022-04", "PT-M022-05", "PT-M022-06"], observations_before_evaluation: true },
        { status: "pending_human_execution", summary: "The neutral Coreto contract is complete and truthful; no perceptual or runtime approval is claimed." }));

    requireTokens(human.source, ["FJ-01", "FJ-02", "FJ-03", "FJ-04", "five of six", "three minutes", "Protected future content"],
        "human_gate_contract_invalid", "E2E-005");
    checks.push(makeCheck("E2E-005", "human_gate_contract", [human.relative, "frontend/data/Map045.json", "frontend/data/Map049.json"],
        { gate_status: "not_executed", scenarios: ["FJ-01", "FJ-02", "FJ-03", "FJ-04"], observations_before_evaluation: true },
        { status: "pending_human_execution", summary: "The neutral Forjaprata contract covers comprehension, sling timing, repetition, and protected content without fabricating results." }));

    requireTokens(human.source, ["AU-01", "AU-02", "silence, restart, and residue", "BGM and SE muted", "muted accessibility"],
        "human_gate_contract_invalid", "E2E-006");
    checks.push(makeCheck("E2E-006", "human_gate_contract", [human.relative, "frontend/data/Map045.json", "frontend/data/Map049.json", "frontend/js/plugins/Coreto_QuestVN.js"],
        { gate_status: "not_executed", scenarios: ["AU-01", "AU-02"], accessibility: "required direction repeated with BGM/SE muted" },
        { status: "pending_human_execution", summary: "Audio restoration, mix, signal hierarchy, and muted-audio redundancy remain explicitly unexecuted." }));

    requireTokens(human.source, ["RPG Maker MZ editor round-trip", "Open `Map022`, `Map045`, `Map046`, `Map049`, `CoretoQuests`, and `MapInfos`", "Save without intentional content changes", "Close and reopen the project"],
        "editor_contract_invalid", "E2E-007");
    const mappedEvidence = Object.fromEntries(lowerValidators.flatMap(item => item.testIds.map(testId => [testId, {
        owning_task: item.task,
        evidence: item.evidence,
        evidence_class: "automated_structural"
    }])));
    for (const testId of E2E_IDS) mappedEvidence[testId] = {
        owning_task: "task_04",
        evidence: `${evidenceRoot}/ex-vn-regression.json`,
        evidence_class: ["E2E-001", "E2E-002", "E2E-003"].includes(testId) ? "automated_structural" : "human_gate_contract"
    };
    if (Object.keys(mappedEvidence).length !== Object.keys(owners).length) fail("test_traceability_invalid", "final evidence mapping is incomplete");
    checks.push(makeCheck("E2E-007", "editor_and_evidence_contract", [human.relative, ...productionTargets, ...lowerValidators.map(item => item.evidence)],
        { editor_status: "not_executed", lower_validator_replay: replay, traceability: mappedEvidence },
        { status: "pending_editor_execution", summary: "All automated evidence is current and uniquely mapped; RPG Maker editor open/save/reopen remains truthfully not_executed." }));

    return { checks, mappedEvidence };
}

function main() {
    const output = parseArguments(process.argv.slice(2));
    const replay = replayLowerValidators();
    const { evidenceByTask, sources } = validateLowerEvidence();
    const owners = validateTaskTraceability();
    const human = validateHumanRecord();
    const { checks, mappedEvidence } = validateE2E({ evidenceByTask, human, replay, owners });
    if (!same(checks.map(check => check.test_id), E2E_IDS) || checks.some(check => check.result !== "passed")) {
        fail("aggregate_matrix_invalid", "E2E checks are incomplete or failed");
    }
    const aggregateTargets = [
        ...productionTargets,
        ...lowerValidators.map(item => item.evidence),
        human.relative,
        "planos/008-compozy-init/builds/validate-ex-vn-regression.mjs"
    ];
    const evidence = {
        schema_version: 1,
        validator: "validate-ex-vn-regression",
        result: "passed",
        classification: "human_playtest_pending",
        test_ids: E2E_IDS,
        targets: aggregateTargets,
        target_hashes: hashesFor(aggregateTargets),
        lower_evidence: sources,
        checks,
        traceability: mappedEvidence,
        editor_round_trip: {
            status: "not_executed",
            record: human.relative,
            limitation: "No connected RPG Maker MZ editor/desktop client was available to this spawned QA shell session."
        },
        human_gates: {
            overall_status: "not_executed",
            record: human.relative,
            coreto: "not_executed",
            forjaprata: "not_executed",
            audio_accessibility: "not_executed",
            limitation: "No connected game runtime/human participants were available; runtime, timing, perception, and audiovisual judgment were not executed."
        },
        residual_risks: [
            "RPG Maker MZ editor serialization/open-save-reopen compatibility is unverified.",
            "Real save/load reconstruction, control recovery, collision/passability, and repeated Autorun behavior are structurally covered but not runtime-observed.",
            "Coreto activity recognition, Gab readability/priority, and five-of-six seat discovery within 90 seconds await human evidence.",
            "Forjaprata next-action comprehension and five-of-six sling acquisition within three minutes await human evidence.",
            "Theme5 transition quality, BGM/BGS restoration, signal hierarchy, and muted-audio accessibility await human judgment.",
            "Sparse child ambience remains an approved bounded follow-up because no cooldown/concurrency owner was introduced."
        ]
    };
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${JSON.stringify(evidence, null, 4)}\n`, "utf8");
    console.log("PASS validate-ex-vn-regression (E2E-001..E2E-007) human_playtest_pending");
}

try {
    main();
} catch (error) {
    console.error(`ERROR ${error.code ?? "validation_internal_error"}: ${error.message}`);
    process.exitCode = 1;
}
