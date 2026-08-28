import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const FEATURE = 'semifinal';

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function writerFailure(code, details = {}) {
  return Object.assign(new Error(code), { code, ...details });
}

function normalizedRelativePath(relativePath) {
  if (typeof relativePath !== 'string' || relativePath.length === 0 || path.isAbsolute(relativePath)) {
    return null;
  }
  const normalized = relativePath.split(path.sep).join('/');
  if (normalized === '..' || normalized.startsWith('../') || normalized.includes('/../')) return null;
  return normalized;
}

export function assertAllowedTargets({ targets, allowedTargets }) {
  const allowed = new Set(allowedTargets);
  const seen = new Set();
  for (const candidate of targets) {
    const relativePath = normalizedRelativePath(candidate);
    if (!relativePath || seen.has(relativePath) || !allowed.has(relativePath)) {
      throw writerFailure('restricted_diff_violation', { path: relativePath ?? String(candidate) });
    }
    seen.add(relativePath);
  }
  return [...seen];
}

const defaultFileOps = Object.freeze({
  existsSync: fs.existsSync,
  readFileSync: fs.readFileSync,
  statSync: fs.statSync,
  writeFileSync: fs.writeFileSync,
  chmodSync: fs.chmodSync,
  renameSync: fs.renameSync,
  unlinkSync: fs.unlinkSync,
});

function cleanupScratch(fileOps, scratchPaths) {
  for (const scratchPath of scratchPaths) {
    try {
      if (fileOps.existsSync(scratchPath)) fileOps.unlinkSync(scratchPath);
    } catch {
      // A cleanup error must not hide the planning or replacement failure.
    }
  }
}

function verifyFingerprint(rootDir, relativePath, expected, fileOps) {
  const absolutePath = path.join(rootDir, relativePath);
  const exists = fileOps.existsSync(absolutePath);
  const actual = exists ? sha256(fileOps.readFileSync(absolutePath)) : null;
  if (exists !== expected.exists || actual !== expected.sha256) {
    throw writerFailure(expected.code ?? 'precondition_mismatch', {
      ...(expected.code === 'discipline_contract_stale' || expected.code === 'historical_baseline_drift' ? { path: relativePath } : { anchor: relativePath }),
    });
  }
}

function verifyAllFingerprints(rootDir, fingerprints, fileOps) {
  for (const [relativePath, expected] of Object.entries(fingerprints ?? {})) {
    verifyFingerprint(rootDir, relativePath, expected, fileOps);
  }
}

function verifyPendingFingerprints(rootDir, fingerprints, replacedPaths, fileOps) {
  for (const [relativePath, expected] of Object.entries(fingerprints ?? {})) {
    if (!replacedPaths.has(relativePath)) verifyFingerprint(rootDir, relativePath, expected, fileOps);
  }
}

export function validatePlannedEdits(edits) {
  for (const edit of edits) {
    if (!edit || typeof edit.path !== 'string' || typeof edit.content !== 'string') {
      throw writerFailure('precondition_mismatch', { anchor: 'planned edit shape' });
    }
    if (edit.path.endsWith('.json')) {
      try {
        JSON.parse(edit.content);
      } catch {
        throw writerFailure('precondition_mismatch', { anchor: `${edit.path}: valid JSON` });
      }
    }
    if (edit.path.endsWith('.js') || edit.path.endsWith('.mjs')) {
      const args = edit.path.endsWith('.mjs') ? ['--check', '--input-type=module', '-'] : ['--check', '-'];
      const result = spawnSync(process.execPath, args, { input: edit.content, encoding: 'utf8' });
      if (result.status !== 0) throw writerFailure('precondition_mismatch', { anchor: `${edit.path}: valid JavaScript` });
    }
  }
  return edits;
}

function rollbackReplacements({ rootDir, replacements, fileOps, scratchPaths }) {
  for (const replacement of [...replacements].reverse()) {
    const target = path.join(rootDir, replacement.path);
    if (!replacement.existed) {
      if (fileOps.existsSync(target)) fileOps.unlinkSync(target);
      continue;
    }
    const rollbackScratch = `${target}.rollback-${process.pid}-${replacement.index}`;
    scratchPaths.add(rollbackScratch);
    fileOps.writeFileSync(rollbackScratch, replacement.original);
    fileOps.chmodSync(rollbackScratch, replacement.mode);
    fileOps.renameSync(rollbackScratch, target);
    scratchPaths.delete(rollbackScratch);
  }
}

export async function applyAtomicPlan({ rootDir, writer, targets, edits, fingerprints = {}, allowedTargets = targets, fileOps = defaultFileOps }) {
  const normalizedTargets = assertAllowedTargets({ targets, allowedTargets });
  const editPaths = edits.map(edit => edit.path);
  assertAllowedTargets({ targets: editPaths, allowedTargets: normalizedTargets });
  if (editPaths.length !== normalizedTargets.length || new Set(editPaths).size !== editPaths.length) {
    throw writerFailure('restricted_diff_violation', { path: editPaths.find(item => !normalizedTargets.includes(item)) ?? 'duplicate-target' });
  }
  validatePlannedEdits(edits);

  verifyAllFingerprints(rootDir, fingerprints, fileOps);
  const scratchPaths = new Set();
  const replacements = [];

  try {
    for (const [index, edit] of edits.entries()) {
      const target = path.join(rootDir, edit.path);
      const scratch = `${target}.scratch-${process.pid}-${index}`;
      const mode = edit.existed ? fileOps.statSync(target).mode & 0o777 : (edit.mode ?? 0o644);
      scratchPaths.add(scratch);
      fileOps.writeFileSync(scratch, edit.content, 'utf8');
      fileOps.chmodSync(scratch, mode);
    }

    // This second complete check is intentionally after every scratch write and
    // immediately before the first production replacement.
    verifyAllFingerprints(rootDir, fingerprints, fileOps);

    const replacedPaths = new Set();
    for (const [index, edit] of edits.entries()) {
      const target = path.join(rootDir, edit.path);
      const scratch = `${target}.scratch-${process.pid}-${index}`;
      verifyPendingFingerprints(rootDir, fingerprints, replacedPaths, fileOps);
      const replacement = {
        path: edit.path,
        index,
        existed: edit.existed,
        original: edit.original,
        mode: edit.existed ? fileOps.statSync(target).mode & 0o777 : (edit.mode ?? 0o644),
      };
      fileOps.renameSync(scratch, target);
      replacements.push(replacement);
      replacedPaths.add(edit.path);
      scratchPaths.delete(scratch);
    }
  } catch (error) {
    try {
      rollbackReplacements({ rootDir, replacements, fileOps, scratchPaths });
    } catch (rollbackError) {
      cleanupScratch(fileOps, scratchPaths);
      throw writerFailure('atomic_rollback_failed', { anchor: rollbackError.message });
    }
    cleanupScratch(fileOps, scratchPaths);
    if (error?.code) throw error;
    throw writerFailure('atomic_apply_failed', { anchor: error?.message ?? 'replacement' });
  }

  cleanupScratch(fileOps, scratchPaths);
  return { status: 'applied', feature: FEATURE, writer };
}
