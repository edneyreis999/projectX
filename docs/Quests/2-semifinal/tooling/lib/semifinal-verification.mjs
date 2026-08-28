import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  configuredTpModeNames,
  invalidEnemyTpModeNotetags,
  planGameplayRemediation,
  scanStateAuthority,
  validateCanonicalProjection,
  validateDisciplineContracts,
  validateFinaleController,
  validateLockerGagEvent,
} from './semifinal-gameplay.mjs';
import { collectSemifinalReachability, validateAssetManifest } from './semifinal-assets.mjs';
import { validateSemifinalVn } from './semifinal-vn.mjs';

export const FEATURE = 'semifinal';
export const TOOLING_ROOT = 'docs/Quests/2-semifinal/tooling';
export const QUEST_TOOLING_PATH = 'docs/Quests/2-semifinal/quest-tooling.json';
export const PROVENANCE_MANIFEST = 'planos/012-add-harness/SEMIFINAL-TOOLING-PROVENANCE.json';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(moduleDir, '../../../../..');

const MAP_NAMES = Object.freeze(['Map044', 'Map061', 'Map062', 'Map063', 'Map064']);
const JSON_PATHS = Object.freeze([
  'frontend/data/Armors.json',
  'frontend/data/CommonEvents.json',
  'frontend/data/CoretoQuests.json',
  'frontend/data/Enemies.json',
  'frontend/data/Map044.json',
  'frontend/data/Map061.json',
  'frontend/data/Map062.json',
  'frontend/data/Map063.json',
  'frontend/data/Map064.json',
  'frontend/data/Map065.json',
  'frontend/data/MapInfos.json',
  'frontend/data/System.json',
  'frontend/data/Troops.json',
  `${TOOLING_ROOT}/fixtures/assets/asset-manifest.json`,
  QUEST_TOOLING_PATH,
  'package.json',
  'package-lock.json',
]);

function absolute(rootDir, relativePath) {
  return path.join(rootDir, relativePath);
}

function read(rootDir, relativePath) {
  const filename = absolute(rootDir, relativePath);
  if (!fs.existsSync(filename)) throw Object.assign(new Error('reference_missing'), { code: 'reference_missing', path: relativePath });
  return fs.readFileSync(filename);
}

function readText(rootDir, relativePath) {
  return read(rootDir, relativePath).toString('utf8');
}

function readJson(rootDir, relativePath) {
  try {
    return JSON.parse(readText(rootDir, relativePath));
  } catch (error) {
    if (error?.code === 'reference_missing') throw error;
    throw Object.assign(new Error('parse_error'), { code: 'parse_error', path: relativePath, observed: error.message });
  }
}

function runCheck(id, targets, inspect) {
  try {
    return { id, targets, result: 'pass', details: inspect() ?? {} };
  } catch (error) {
    return {
      id,
      targets,
      result: 'fail',
      failures: [
        Object.fromEntries(
          Object.entries({
            code: error?.code ?? error?.message ?? 'validator_error',
            path: error?.path,
            anchor: error?.anchor,
            observed: error?.observed,
            targets: error?.targets,
            reference: error?.reference,
            consumer: error?.consumer,
            field: error?.field,
          }).filter(([, value]) => value !== undefined),
        ),
      ],
    };
  }
}

function loadCanonicalMaps(rootDir) {
  return Object.fromEntries(MAP_NAMES.map(name => [name, readJson(rootDir, `frontend/data/${name}.json`)]));
}

function auditParseability(rootDir) {
  return runCheck('parseability', JSON_PATHS, () => {
    for (const relativePath of JSON_PATHS) readJson(rootDir, relativePath);
    return { files: JSON_PATHS.length };
  });
}

function auditContracts(rootDir) {
  return runCheck('discipline-contracts', ['docs/Quests/2-semifinal'], () => {
    const result = validateDisciplineContracts({ rootDir });
    return { contracts: Object.keys(result.contracts) };
  });
}

function auditTooling(rootDir) {
  return runCheck('durable-tooling', [TOOLING_ROOT, QUEST_TOOLING_PATH, PROVENANCE_MANIFEST], () => {
    const provenance = readJson(rootDir, PROVENANCE_MANIFEST);
    if (provenance.activeToolingRoot !== TOOLING_ROOT) throw Object.assign(new Error('provenance_manifest_invalid'), { code: 'provenance_manifest_invalid', path: PROVENANCE_MANIFEST });
    const files = fs.readdirSync(absolute(rootDir, TOOLING_ROOT), { recursive: true }).map(String);
    const staleReference = files.find(relativePath => {
      const filename = absolute(rootDir, `${TOOLING_ROOT}/${relativePath}`);
      return fs.statSync(filename).isFile() && /\.compozy\/tasks\/(?:010|011)/.test(fs.readFileSync(filename, 'utf8'));
    });
    if (staleReference) throw Object.assign(new Error('historical_runtime_dependency'), { code: 'historical_runtime_dependency', path: staleReference });
    return { files: files.length };
  });
}

function auditWriterConvergence(rootDir) {
  return runCheck('gameplay-writer-convergence', [TOOLING_ROOT, QUEST_TOOLING_PATH], () => {
    const plan = planGameplayRemediation({ rootDir, checkOnly: true });
    if (plan.targets.length > 0) throw Object.assign(new Error('materialization_drift'), { code: 'materialization_drift', targets: plan.targets });
    return { status: 'converged', writer: plan.writer };
  });
}

function auditMaps(rootDir) {
  return runCheck(
    'canonical-map-structure',
    MAP_NAMES.map(name => `frontend/data/${name}.json`),
    () => {
      const maps = loadCanonicalMaps(rootDir);
      const failures = [...validateCanonicalProjection(maps), ...scanStateAuthority(maps)];
      if (failures.length > 0) throw Object.assign(new Error(failures[0].code), failures[0]);
      validateLockerGagEvent(maps.Map063.events[7]);
      return { maps: MAP_NAMES };
    },
  );
}

function auditQuestVn(rootDir) {
  return runCheck('quest-vn', ['frontend/data/CoretoQuests.json', 'frontend/data/MapInfos.json', 'frontend/data/Map065.json'], () => {
    const allocations = readJson(rootDir, QUEST_TOOLING_PATH).allocations;
    return validateSemifinalVn({
      registry: readJson(rootDir, 'frontend/data/CoretoQuests.json'),
      mapInfos: readJson(rootDir, 'frontend/data/MapInfos.json'),
      map: readJson(rootDir, `frontend/data/Map${String(allocations.vnMapId).padStart(3, '0')}.json`),
      vnMapId: allocations.vnMapId,
    });
  });
}

function auditBattle(rootDir) {
  return runCheck('battle-data', ['frontend/data/Enemies.json', 'frontend/data/Troops.json', 'frontend/data/Map062.json', 'frontend/js/plugins.js'], () => {
    const allocations = readJson(rootDir, QUEST_TOOLING_PATH).allocations;
    const enemies = readJson(rootDir, 'frontend/data/Enemies.json');
    const troops = readJson(rootDir, 'frontend/data/Troops.json');
    const map062 = readJson(rootDir, 'frontend/data/Map062.json');
    validateFinaleController(map062.events[6], allocations.mhordredTroopId);
    const enemy = enemies[allocations.mhordredEnemyId];
    if (enemy?.name !== 'Mhordred' || enemy.exp !== 0 || enemy.gold !== 0 || enemy.dropItems.some(drop => drop.kind !== 0))
      throw Object.assign(new Error('battle_contract_mismatch'), { code: 'battle_contract_mismatch', anchor: `Enemies:${allocations.mhordredEnemyId}` });
    const invalidTpModes = invalidEnemyTpModeNotetags(enemies, configuredTpModeNames(readText(rootDir, 'frontend/js/plugins.js')));
    if (invalidTpModes.length > 0) throw Object.assign(new Error('battle_contract_mismatch'), { code: 'battle_contract_mismatch', anchor: `Enemies:${invalidTpModes[0].enemyId}:TP Mode` });
    const troop = troops[allocations.mhordredTroopId];
    if (troop?.members?.length !== 1 || troop.members[0].enemyId !== allocations.mhordredEnemyId)
      throw Object.assign(new Error('battle_contract_mismatch'), { code: 'battle_contract_mismatch', anchor: `Troops:${allocations.mhordredTroopId}` });
    return allocations;
  });
}

function auditAssets(rootDir) {
  const manifestPath = `${TOOLING_ROOT}/fixtures/assets/asset-manifest.json`;
  return runCheck('asset-integrity', [manifestPath, ...MAP_NAMES.map(name => `frontend/data/${name}.json`)], () => {
    const manifest = readJson(rootDir, manifestPath);
    const maps = Object.fromEntries([44, 61, 62, 63, 64].map(id => [id, readJson(rootDir, `frontend/data/Map${String(id).padStart(3, '0')}.json`)]));
    const eventScope = {};
    for (const consumer of manifest.assets.flatMap(asset => asset.consumers)) {
      const match = /^Map(\d+):E(\d+)/.exec(consumer);
      if (!match) continue;
      const mapId = Number(match[1]);
      const eventId = Number(match[2]);
      eventScope[mapId] ??= [];
      if (!eventScope[mapId].includes(eventId)) eventScope[mapId].push(eventId);
    }
    const reachability = collectSemifinalReachability({ maps, eventScope });
    for (const reference of reachability.references) reference.manifestRequired = true;
    const result = validateAssetManifest({ rootDir, manifest, reachability });
    if (result.status !== 'complete') throw Object.assign(new Error(result.code), result);
    return { assets: result.references.length, reachableReferences: reachability.references.length };
  });
}

export function validateStaticState({ rootDir = ROOT } = {}) {
  const checks = [
    auditParseability(rootDir),
    auditContracts(rootDir),
    auditTooling(rootDir),
    auditWriterConvergence(rootDir),
    auditMaps(rootDir),
    auditQuestVn(rootDir),
    auditBattle(rootDir),
    auditAssets(rootDir),
  ];
  const failures = checks.flatMap(check => check.failures ?? []);
  return { status: failures.length === 0 ? 'pass' : 'fail', claim: 'authoring_integrity', feature: FEATURE, checks, failures };
}
