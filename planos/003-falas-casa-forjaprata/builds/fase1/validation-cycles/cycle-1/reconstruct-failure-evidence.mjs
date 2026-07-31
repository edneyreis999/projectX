import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const currentReportPath = resolve(here, "../../map045-validation-report.json");
const targetPath = resolve(here, "failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json");
const expectedDigest = "9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195";

const current = JSON.parse(readFileSync(currentReportPath, "utf8"));
const failingIndex = current.checks.findIndex(check => check.name.startsWith("narrative-variable-assignment-order-"));
if (failingIndex !== 139) throw new Error(`Unexpected failure check index: ${failingIndex}`);

const failedCheckName = "narrative-variable-assignment-order-preserved";
const checks = current.checks.slice(0, failingIndex);
checks.push({ name: failedCheckName, passed: false, details: { assignments: 30 } });

const failed = {
  schemaVersion: 1,
  taskId: "task-1.1",
  status: "failed-static-validation",
  error: `Validation failed: ${failedCheckName}`,
  checks,
  humanGate: "Playtest not reached; runtime not validated",
};

const bytes = `${JSON.stringify(failed, null, 2)}\n`;
const observedDigest = createHash("sha256").update(bytes).digest("hex");
if (observedDigest !== expectedDigest) {
  throw new Error(`Reconstruction digest mismatch: expected ${expectedDigest}, observed ${observedDigest}`);
}

writeFileSync(targetPath, bytes, { encoding: "utf8", flag: "wx" });
process.stdout.write(`${JSON.stringify({ status: "reconstructed-and-verified", sha256: observedDigest, targetPath })}\n`);
