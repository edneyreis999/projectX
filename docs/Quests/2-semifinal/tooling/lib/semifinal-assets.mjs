import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const SEMIFINAL_ASSET_VERSION = 'semifinal-assets/v1';
export const SEMIFINAL_STATES = Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 900]);
export const ASSET_ROLES = Object.freeze(['character-sheet', 'vn-bust', 'vn-background', 'picture', 'battler', 'system-iconset']);
export const RESOLUTION_MODES = Object.freeze(['existing', 'generated', 'placeholder']);

const PNG_SIGNATURE = '89504e470d0a1a0a';
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const CANVAS = Object.freeze({ width: 1280, height: 720 });

function blocked(code, fields = {}) {
  return { status: 'blocked', code, ...fields };
}

export function runtimeReference(relativePath) {
  return relativePath.startsWith('frontend/') ? relativePath.slice('frontend/'.length) : relativePath;
}

export function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

export function readPngMetadata(bytes) {
  if (!Buffer.isBuffer(bytes) || bytes.length < 33 || bytes.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) {
    return blocked('asset_not_loadable');
  }
  if (bytes.readUInt32BE(8) !== 13 || bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
    return blocked('asset_not_loadable');
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  const bitDepth = bytes[24];
  const colorType = bytes[25];
  if (width === 0 || height === 0 || ![0, 2, 3, 4, 6].includes(colorType)) return blocked('asset_not_loadable');
  let offset = 8;
  let hasTransparencyChunk = false;
  let foundEnd = false;
  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset);
    if (offset + length + 12 > bytes.length) return blocked('asset_not_loadable');
    const type = bytes.subarray(offset + 4, offset + 8).toString('ascii');
    if (type === 'tRNS') hasTransparencyChunk = true;
    offset += length + 12;
    if (type === 'IEND') {
      foundEnd = true;
      break;
    }
  }
  if (!foundEnd) return blocked('asset_not_loadable');
  return {
    status: 'complete',
    width,
    height,
    bitDepth,
    colorType,
    alpha: colorType === 4 || colorType === 6 || hasTransparencyChunk,
  };
}

function exactPathStatus(rootDir, relativePath) {
  if (typeof relativePath !== 'string' || !relativePath || path.isAbsolute(relativePath) || relativePath.split('/').includes('..')) {
    return blocked('manifest_invalid', { field: 'path', path: relativePath });
  }
  let current = path.resolve(rootDir);
  for (const segment of relativePath.split('/')) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) return blocked('reference_missing', { reference: runtimeReference(relativePath) });
    const entries = fs.readdirSync(current);
    if (!entries.includes(segment)) {
      const caseOnly = entries.find(entry => entry.toLocaleLowerCase('en-US') === segment.toLocaleLowerCase('en-US'));
      return caseOnly
        ? blocked('reference_case_mismatch', { reference: runtimeReference(relativePath), actual: caseOnly })
        : blocked('reference_missing', { reference: runtimeReference(relativePath) });
    }
    current = path.join(current, segment);
  }
  if (!fs.statSync(current).isFile()) return blocked('reference_missing', { reference: runtimeReference(relativePath) });
  return { status: 'complete', absolutePath: current };
}

function validRect(rect) {
  return (
    rect &&
    ['x', 'y', 'width', 'height'].every(key => Number.isFinite(rect[key])) &&
    rect.x >= 0 &&
    rect.y >= 0 &&
    rect.width > 0 &&
    rect.height > 0 &&
    rect.x + rect.width <= CANVAS.width &&
    rect.y + rect.height <= CANVAS.height
  );
}

function validateManifestEntry(rootDir, asset, index) {
  const required = ['role', 'path', 'width', 'height', 'alpha', 'anchor', 'safeArea', 'consumers', 'sha256', 'resolution'];
  for (const field of required) if (!(field in asset)) return blocked('manifest_invalid', { asset: index, field });
  if (!ASSET_ROLES.includes(asset.role)) return blocked('manifest_invalid', { asset: index, field: 'role' });
  if (!RESOLUTION_MODES.includes(asset.resolution)) return blocked('manifest_invalid', { asset: index, field: 'resolution' });
  if (!Number.isInteger(asset.width) || asset.width <= 0 || !Number.isInteger(asset.height) || asset.height <= 0) return blocked('manifest_invalid', { asset: index, field: 'dimensions' });
  if (typeof asset.alpha !== 'boolean') return blocked('manifest_invalid', { asset: index, field: 'alpha' });
  if (!asset.anchor || !Number.isFinite(asset.anchor.x) || !Number.isFinite(asset.anchor.y)) return blocked('manifest_invalid', { asset: index, field: 'anchor' });
  if (!validRect(asset.safeArea)) return blocked('manifest_invalid', { asset: index, field: 'safeArea' });
  if (!Array.isArray(asset.consumers) || asset.consumers.length === 0 || asset.consumers.some(value => typeof value !== 'string' || !value))
    return blocked('manifest_invalid', { asset: index, field: 'consumers' });
  if (!SHA256_PATTERN.test(asset.sha256)) return blocked('manifest_invalid', { asset: index, field: 'sha256' });
  if (asset.role === 'character-sheet' && typeof asset.frameConvention !== 'string') return blocked('manifest_invalid', { asset: index, field: 'frameConvention' });

  const located = exactPathStatus(rootDir, asset.path);
  if (located.status !== 'complete') return located;
  const bytes = fs.readFileSync(located.absolutePath);
  const png = readPngMetadata(bytes);
  if (png.status !== 'complete') return blocked('asset_not_loadable', { reference: runtimeReference(asset.path) });
  if (png.width !== asset.width || png.height !== asset.height)
    return blocked('manifest_dimension_mismatch', {
      reference: runtimeReference(asset.path),
      expected: { width: asset.width, height: asset.height },
      actual: { width: png.width, height: png.height },
    });
  if (png.alpha !== asset.alpha) return blocked('manifest_alpha_mismatch', { reference: runtimeReference(asset.path), expected: asset.alpha, actual: png.alpha });
  const actualHash = sha256(bytes);
  if (actualHash !== asset.sha256) return blocked('manifest_checksum_mismatch', { reference: runtimeReference(asset.path), expected: asset.sha256, actual: actualHash });
  if (asset.role === 'vn-background' && (png.width !== CANVAS.width || png.height !== CANVAS.height))
    return blocked('manifest_dimension_mismatch', { reference: runtimeReference(asset.path), expected: CANVAS, actual: { width: png.width, height: png.height } });

  if (asset.resolution === 'placeholder') {
    if (typeof asset.fallbackPath !== 'string') return blocked('manifest_invalid', { asset: index, field: 'fallbackPath' });
    const fallback = exactPathStatus(rootDir, asset.fallbackPath);
    if (fallback.status !== 'complete') return fallback;
  }
  if ((asset.resolution === 'generated' || asset.retargeted === true) && typeof asset.source !== 'string') return blocked('manifest_invalid', { asset: index, field: 'source' });
  return { status: 'complete', path: asset.path, png };
}

export function validateAssetManifest({ rootDir, manifest, reachability = { references: [] } }) {
  if (!manifest || manifest.version !== SEMIFINAL_ASSET_VERSION || !Array.isArray(manifest.assets) || manifest.assets.length === 0) {
    return blocked('manifest_invalid', { field: 'version' });
  }
  const paths = new Set();
  const references = [];
  for (let index = 0; index < manifest.assets.length; index += 1) {
    const asset = manifest.assets[index];
    if (paths.has(asset.path)) return blocked('manifest_invalid', { asset: index, field: 'path', reason: 'duplicate' });
    paths.add(asset.path);
    const result = validateManifestEntry(rootDir, asset, index);
    if (result.status !== 'complete') return result;
    references.push({ path: asset.path, role: asset.role, resolution: asset.resolution });
  }

  for (let index = 0; index < manifest.assets.length; index += 1) {
    const asset = manifest.assets[index];
    if (asset.resolution === 'placeholder' && !paths.has(asset.fallbackPath)) {
      return blocked('manifest_invalid', { asset: index, field: 'fallbackPath', reason: 'unregistered' });
    }
  }

  for (const reference of reachability.references ?? []) {
    const located = exactPathStatus(rootDir, reference.path);
    if (located.status !== 'complete') return located;
    if (reference.manifestRequired !== false && !paths.has(reference.path)) return blocked('manifest_reference_missing', { reference: runtimeReference(reference.path), consumer: reference.consumer });
    if (reference.manifestRequired !== false) {
      const entry = manifest.assets.find(asset => asset.path === reference.path);
      const consumerRecorded = entry.consumers.some(consumer => reference.consumer === consumer || reference.consumer?.startsWith(`${consumer}:`));
      if (reference.consumer && !consumerRecorded) return blocked('manifest_consumer_missing', { reference: runtimeReference(reference.path), consumer: reference.consumer });
    }
  }

  return {
    status: 'complete',
    references,
  };
}

function conditionEligible(conditions, variableId, value, conditionResolver) {
  if (conditions.variableValid) {
    if (conditions.variableId !== variableId) return conditionResolver?.('variable', conditions.variableId, conditions.variableValue) === true;
    if (value < conditions.variableValue) return false;
  }
  for (const [flag, kind, id] of [
    ['switch1Valid', 'switch', conditions.switch1Id],
    ['switch2Valid', 'switch', conditions.switch2Id],
    ['selfSwitchValid', 'self-switch', conditions.selfSwitchCh],
    ['itemValid', 'item', conditions.itemId],
    ['actorValid', 'actor', conditions.actorId],
  ])
    if (conditions[flag] && conditionResolver?.(kind, id) !== true) return false;
  return true;
}

export function selectEligiblePage(event, variableId, value, conditionResolver) {
  let selected = null;
  event.pages.forEach((page, pageIndex) => {
    if (conditionEligible(page.conditions ?? {}, variableId, value, conditionResolver)) selected = { pageIndex, page };
  });
  return selected;
}

function nestedValues(value, key = '', visit) {
  if (typeof value === 'string') {
    visit(value, key);
    const trimmed = value.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        nestedValues(JSON.parse(trimmed), key, visit);
      } catch {
        /* plugin copy may resemble JSON without being JSON */
      }
    }
  } else if (Array.isArray(value)) value.forEach((item, index) => nestedValues(item, `${key}[${index}]`, visit));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => nestedValues(item, childKey, visit));
}

export function collectPageAssetReferences(page, consumer) {
  const references = [];
  const characterName = page?.image?.characterName;
  if (characterName) references.push({ path: `frontend/img/characters/${characterName}.png`, consumer, kind: 'character-sheet' });
  nestedValues(page?.list ?? [], '', (value, key) => {
    const normalized = value.replace(/\\/g, '/').replace(/^frontend\//, '');
    if (/^Portraits\//.test(normalized) && /PictureName|Picture File|Name|parameters/i.test(key)) {
      references.push({ path: `frontend/img/pictures/${normalized.replace(/\.png$/i, '')}.png`, consumer, kind: 'picture' });
    } else if (/^(?:VN_|Parallaxes\/)/.test(normalized) && /Background|Parallax|Name/i.test(key)) {
      const name = normalized.replace(/^Parallaxes\//, '').replace(/\.png$/i, '');
      references.push({ path: `frontend/img/parallaxes/${name}.png`, consumer, kind: 'vn-background' });
    }
  });
  return references;
}

export function collectSemifinalReachability({ maps, eventScope, states = SEMIFINAL_STATES, semanticConsumers = [], conditionResolver }) {
  const keyed = new Map();
  const selectedPages = [];
  for (const [mapIdText, eventIds] of Object.entries(eventScope)) {
    const mapId = Number(mapIdText);
    const map = maps[mapId] ?? maps[`Map${String(mapId).padStart(3, '0')}`];
    if (!map) continue;
    for (const eventId of eventIds) {
      const event = map.events?.[eventId];
      if (!event) continue;
      for (const state of states) {
        const selected = selectEligiblePage(event, 29, state, conditionResolver);
        if (!selected) continue;
        const consumer = `Map${String(mapId).padStart(3, '0')}:E${eventId}:P${selected.pageIndex + 1}:V29=${state}`;
        selectedPages.push({ mapId, eventId, state, pageIndex: selected.pageIndex });
        for (const reference of collectPageAssetReferences(selected.page, consumer)) keyed.set(`${reference.path}\0${reference.consumer}`, reference);
      }
    }
  }
  for (const reference of semanticConsumers) keyed.set(`${reference.path}\0${reference.consumer}`, { ...reference });
  return { states: [...states], selectedPages, references: [...keyed.values()].sort((a, b) => `${a.path}:${a.consumer}`.localeCompare(`${b.path}:${b.consumer}`)) };
}
