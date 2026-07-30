import crypto from "node:crypto";
import fs from "node:fs";

const root = new URL("../../../../", import.meta.url);
const target = new URL("frontend/data/Map022.json", root);
const VARIABLE_ID = 106;

function digest(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}

function serialize(value) {
    return JSON.stringify(value, null, 4).replace(/\n/g, "\r\n");
}

function isStartTransition(command) {
    return command.code === 357 &&
        command.parameters?.[0] === "Coreto_QuestCore" &&
        command.parameters?.[1] === "QuestTransition" &&
        command.parameters?.[3]?.questKey === "noite-da-historia" &&
        command.parameters?.[3]?.transitionId === "START";
}

function isGuard(command) {
    return command.code === 111 &&
        command.indent === 0 &&
        JSON.stringify(command.parameters) === JSON.stringify([1, VARIABLE_ID, 0, 0, 0]);
}

function isBranchEnd(command) {
    return command.code === 412 && command.indent === 0;
}

const source = fs.readFileSync(target, "utf8");
const sourceDigest = digest(source);
const map = JSON.parse(source);

const event = map.events?.[30];
if (!event || event.id !== 30 || event.name !== "EX — Noite da História: convocação") {
    throw new Error("Map022 event 30 identity changed");
}
if (event.pages?.length !== 1 || event.pages[0].trigger !== 1) {
    throw new Error("Map022 event 30 page shape changed");
}

const list = event.pages[0].list;
const startIndexes = list
    .map((command, index) => isStartTransition(command) ? index : -1)
    .filter(index => index >= 0);

if (startIndexes.length !== 1) {
    throw new Error(`Expected one START transition, found ${startIndexes.length}`);
}

const startIndex = startIndexes[0];
if (isGuard(list[startIndex - 1]) && list[startIndex].indent === 1 && isBranchEnd(list[startIndex + 1])) {
    const canonical = serialize(map);
    if (source !== canonical) {
        const current = fs.readFileSync(target, "utf8");
        if (digest(current) !== sourceDigest) {
            throw new Error("Map022.json changed after preflight; refusing to normalize");
        }
        fs.writeFileSync(target, canonical, "utf8");
        JSON.parse(fs.readFileSync(target, "utf8"));
        console.log("EV030 START guard retained; Map022.json style normalized");
    } else {
        console.log("EV030 START guard already applied");
    }
    process.exit(0);
}
if (source !== serialize(map)) {
    throw new Error("Map022.json style is not the expected canonical CRLF format");
}
if (startIndex !== list.length - 2 || list.at(-1)?.code !== 0 || list[startIndex].indent !== 0) {
    throw new Error("EV030 START transition is not in the expected terminal position");
}

const guardedStart = structuredClone(list[startIndex]);
guardedStart.indent = 1;
list.splice(
    startIndex,
    1,
    { code: 111, indent: 0, parameters: [1, VARIABLE_ID, 0, 0, 0] },
    guardedStart,
    { code: 412, indent: 0, parameters: [] }
);

const current = fs.readFileSync(target, "utf8");
if (digest(current) !== sourceDigest) {
    throw new Error("Map022.json changed after preflight; refusing to write");
}

fs.writeFileSync(target, serialize(map), "utf8");
JSON.parse(fs.readFileSync(target, "utf8"));
console.log("EV030 START guard applied: V106 == 0");
