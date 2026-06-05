#!/usr/bin/env node
/* eslint-disable */
/**
 * find_unused_assets.js
 *
 * Encontra arquivos de asset nao referenciados no projeto RPG Maker MZ.
 * Replica a logica de "Exclude unused files" do editor RPG Maker MZ.
 *
 * Uso: node scripts/find_unused_assets.js [options]
 * Opcoes:
 *   --execute        Executa a exclusao (padrao: dry-run, apenas relatorio)
 *   --json           Output em JSON
 *   --report=<file>  Salva relatorio em arquivo
 *   --manifest=<file> Salva manifest de arquivos deletados para rollback
 *   --verbose         Mostra cada arquivo referenciado encontrado
 *
 * Exemplo:
 *   node scripts/find_unused_assets.js
 *   node scripts/find_unused_assets.js --verbose --report=report.txt
 *   node scripts/find_unused_assets.js --execute --manifest=manifest.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const opts = {
  execute: args.includes('--execute'),
  json: args.includes('--json'),
  report: getArg('--report='),
  manifest: getArg('--manifest='),
  verbose: args.includes('--verbose'),
};

function getArg(prefix) {
  const found = args.find(a => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(PROJECT_ROOT, 'frontend');
const DATA_DIR = path.join(FRONTEND, 'data');
const IMG_DIR = path.join(FRONTEND, 'img');
const AUDIO_DIR = path.join(FRONTEND, 'audio');
const MOVIES_DIR = path.join(FRONTEND, 'movies');
const WHITELIST_FILE = path.join(__dirname, 'asset_whitelist.txt');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  return JSON.parse(content);
}

/** Adiciona um caminho de asset ao Set de referencias (normalizado) */
function addRef(refs, provenance, relPath, source) {
  if (!relPath) return;
  const normalized = relPath.replace(/\\/g, '/');
  refs.add(normalized.toLowerCase());
  if (!provenance.has(normalized.toLowerCase())) {
    provenance.set(normalized.toLowerCase(), []);
  }
  provenance.get(normalized.toLowerCase()).push(source);
}

/** Resolve nome RPG Maker para caminho de asset */
function resolveAsset(type, name, ext) {
  if (!name || name === '') return null;
  return `${type}/${name}${ext}`;
}

// ---------------------------------------------------------------------------
// Phase 1: Data Collection - Extrair referencias de arquivos dos JSONs
// ---------------------------------------------------------------------------

function extractSystemReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'System.json'));

  // Title images
  addRef(refs, provenance, resolveAsset('img/titles1', data.title1Name, '.png'), 'System.json title1Name');
  addRef(refs, provenance, resolveAsset('img/titles2', data.title2Name, '.png'), 'System.json title2Name');

  // Battle backgrounds
  addRef(refs, provenance, resolveAsset('img/battlebacks1', data.battleback1Name, '.png'), 'System.json battleback1Name');
  addRef(refs, provenance, resolveAsset('img/battlebacks2', data.battleback2Name, '.png'), 'System.json battleback2Name');

  // Battler (system default)
  if (data.optSideView && data.battlerName) {
    addRef(refs, provenance, resolveAsset('img/sv_actors', data.battlerName, '.png'), 'System.json battlerName');
  }

  // Audio
  addRef(refs, provenance, resolveAsset('audio/bgm', data.battleBgm?.name, '.ogg'), 'System.json battleBgm');
  addRef(refs, provenance, resolveAsset('audio/bgm', data.titleBgm?.name, '.ogg'), 'System.json titleBgm');
  addRef(refs, provenance, resolveAsset('audio/me', data.defeatMe?.name, '.ogg'), 'System.json defeatMe');
  addRef(refs, provenance, resolveAsset('audio/me', data.gameoverMe?.name, '.ogg'), 'System.json gameoverMe');
  addRef(refs, provenance, resolveAsset('audio/me', data.victoryMe?.name, '.ogg'), 'System.json victoryMe');

  // System sounds
  (data.sounds || []).forEach((sound, i) => {
    addRef(refs, provenance, resolveAsset('audio/se', sound?.name, '.ogg'), `System.json sounds[${i}]`);
  });

  // Vehicles
  ['ship', 'boat', 'airship'].forEach(vehicle => {
    const v = data[vehicle];
    if (!v) return;
    addRef(refs, provenance, resolveAsset('img/characters', v.characterName, '.png'), `System.json ${vehicle}.characterName`);
    addRef(refs, provenance, resolveAsset('audio/bgm', v.bgm?.name, '.ogg'), `System.json ${vehicle}.bgm`);
  });
}

function extractActorReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'Actors.json'));
  data
    .filter(a => a)
    .forEach((actor, i) => {
      addRef(refs, provenance, resolveAsset('img/characters', actor.characterName, '.png'), `Actors.json[${actor.id || i}].characterName`);
      addRef(refs, provenance, resolveAsset('img/faces', actor.faceName, '.png'), `Actors.json[${actor.id || i}].faceName`);
      addRef(refs, provenance, resolveAsset('img/sv_actors', actor.battlerName, '.png'), `Actors.json[${actor.id || i}].battlerName`);
    });
}

function extractEnemyReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'Enemies.json'));
  data
    .filter(e => e)
    .forEach((enemy, i) => {
      addRef(refs, provenance, resolveAsset('img/sv_enemies', enemy.battlerName, '.png'), `Enemies.json[${enemy.id || i}].battlerName`);
    });
}

function extractTilesetReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'Tilesets.json'));
  data
    .filter(t => t)
    .forEach(tileset => {
      (tileset.tilesetNames || []).forEach((name, i) => {
        addRef(refs, provenance, resolveAsset('img/tilesets', name, '.png'), `Tilesets.json[${tileset.id}].tilesetNames[${i}]`);
      });
    });
}

function extractAnimationReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'Animations.json'));
  data
    .filter(a => a)
    .forEach(anim => {
      // Sound effects from animation timings
      (anim.soundTimings || []).forEach((t, i) => {
        addRef(refs, provenance, resolveAsset('audio/se', t.se?.name, '.ogg'), `Animations.json[${anim.id}].soundTimings[${i}]`);
      });
    });
}

/** Scan event command list for file references */
function scanEventCommands(commands, refs, provenance, source) {
  if (!commands) return;
  commands.forEach(cmd => {
    if (!cmd || !cmd.parameters) return;
    switch (cmd.code) {
      case 231: // Show Picture
        addRef(refs, provenance, resolveAsset('img/pictures', cmd.parameters[1], '.png'), `${source} event 231 (Show Picture)`);
        break;
      case 232: // Move Picture
        addRef(refs, provenance, resolveAsset('img/pictures', cmd.parameters[1], '.png'), `${source} event 232 (Move Picture)`);
        break;
      case 245: // Play BGM
        addRef(refs, provenance, resolveAsset('audio/bgm', cmd.parameters[0]?.name, '.ogg'), `${source} event 245 (Play BGM)`);
        break;
      case 246: // Play BGS
        addRef(refs, provenance, resolveAsset('audio/bgs', cmd.parameters[0]?.name, '.ogg'), `${source} event 246 (Play BGS)`);
        break;
      case 249: // Play ME
        addRef(refs, provenance, resolveAsset('audio/me', cmd.parameters[0]?.name, '.ogg'), `${source} event 249 (Play ME)`);
        break;
      case 250: // Play SE
        addRef(refs, provenance, resolveAsset('audio/se', cmd.parameters[0]?.name, '.ogg'), `${source} event 250 (Play SE)`);
        break;
      case 261: // Play Movie
        addRef(refs, provenance, `movies/${cmd.parameters[0]}.webm`, `${source} event 261 (Play Movie)`);
        break;
      case 282: // Change Battleback
        addRef(refs, provenance, resolveAsset('img/battlebacks1', cmd.parameters[0], '.png'), `${source} event 282 battleback1`);
        addRef(refs, provenance, resolveAsset('img/battlebacks2', cmd.parameters[1], '.png'), `${source} event 282 battleback2`);
        break;
      case 283: // Change Parallax
        addRef(refs, provenance, resolveAsset('img/parallaxes', cmd.parameters[0], '.png'), `${source} event 283 (Change Parallax)`);
        break;
      case 322: // Change Actor Image
        addRef(refs, provenance, resolveAsset('img/characters', cmd.parameters[1], '.png'), `${source} event 322 characterName`);
        addRef(refs, provenance, resolveAsset('img/faces', cmd.parameters[3], '.png'), `${source} event 322 faceName`);
        addRef(refs, provenance, resolveAsset('img/sv_actors', cmd.parameters[5], '.png'), `${source} event 322 battlerName`);
        break;
      case 331: // Change Enemy Image
        addRef(refs, provenance, resolveAsset('img/sv_enemies', cmd.parameters[2], '.png'), `${source} event 331 (Change Enemy Image)`);
        break;
      case 337: // Change Player/Actor Image
        addRef(refs, provenance, resolveAsset('img/characters', cmd.parameters[1], '.png'), `${source} event 337 characterName`);
        addRef(refs, provenance, resolveAsset('img/faces', cmd.parameters[3], '.png'), `${source} event 337 faceName`);
        addRef(refs, provenance, resolveAsset('img/sv_actors', cmd.parameters[5], '.png'), `${source} event 337 battlerName`);
        break;
      case 338: // Change Vehicle Image
        addRef(refs, provenance, resolveAsset('img/characters', cmd.parameters[1], '.png'), `${source} event 338 (Change Vehicle Image)`);
        break;
    }
  });
}

function extractMapReferences(refs, provenance) {
  const mapFiles = fs.readdirSync(DATA_DIR).filter(f => /^Map\d+\.json$/.test(f));

  mapFiles.forEach(file => {
    const map = readJson(path.join(DATA_DIR, file));
    const src = file;

    // Map-level audio
    addRef(refs, provenance, resolveAsset('audio/bgm', map.bgm?.name, '.ogg'), `${src} bgm`);
    addRef(refs, provenance, resolveAsset('audio/bgs', map.bgs?.name, '.ogg'), `${src} bgs`);
    addRef(refs, provenance, resolveAsset('img/parallaxes', map.parallaxName, '.png'), `${src} parallaxName`);
    addRef(refs, provenance, resolveAsset('img/battlebacks1', map.battleback1Name, '.png'), `${src} battleback1Name`);
    addRef(refs, provenance, resolveAsset('img/battlebacks2', map.battleback2Name, '.png'), `${src} battleback2Name`);

    // Events
    (map.events || [])
      .filter(e => e)
      .forEach(ev => {
        (ev.pages || []).forEach((pg, pgIdx) => {
          scanEventCommands(pg.list, refs, provenance, `${src} event ${ev.id} page ${pgIdx}`);
        });
      });
  });
}

function extractCommonEventReferences(refs, provenance) {
  const data = readJson(path.join(DATA_DIR, 'CommonEvents.json'));
  data
    .filter(c => c)
    .forEach(ce => {
      scanEventCommands(ce.list, refs, provenance, `CommonEvents.json[${ce.id}]`);
    });
}

// ---------------------------------------------------------------------------
// Phase 2: Plugin Scanning - Extrair referencias de plugins JS
// ---------------------------------------------------------------------------

function scanPluginFiles(refs, provenance) {
  const pluginDir = path.join(FRONTEND, 'js', 'plugins');
  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'));

  const pluginManagedDirs = new Set();

  files.forEach(file => {
    const content = fs.readFileSync(path.join(pluginDir, file), 'utf8');
    const src = `plugin:${file}`;

    // playSe/playBgm calls
    const playSePattern = /playSe\s*\(\s*\{[^}]*?name\s*:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    while ((match = playSePattern.exec(content)) !== null) {
      addRef(refs, provenance, resolveAsset('audio/se', match[1], '.ogg'), `${src} playSe`);
    }

    const playBgmPattern = /playBgm\s*\(\s*\{[^}]*?name\s*:\s*['"`]([^'"`]+)['"`]/g;
    while ((match = playBgmPattern.exec(content)) !== null) {
      addRef(refs, provenance, resolveAsset('audio/bgm', match[1], '.ogg'), `${src} playBgm`);
    }

    const playBgsPattern = /playBgs\s*\(\s*\{[^}]*?name\s*:\s*['"`]([^'"`]+)['"`]/g;
    while ((match = playBgsPattern.exec(content)) !== null) {
      addRef(refs, provenance, resolveAsset('audio/bgs', match[1], '.ogg'), `${src} playBgs`);
    }

    const playMePattern = /playMe\s*\(\s*\{[^}]*?name\s*:\s*['"`]([^'"`]+)['"`]/g;
    while ((match = playMePattern.exec(content)) !== null) {
      addRef(refs, provenance, resolveAsset('audio/me', match[1], '.ogg'), `${src} playMe`);
    }

    // Hardcoded image paths (directory references from plugins)
    // Require at least img/<subdir>/ to avoid matching bare "img/" in generic code
    const imgPathPattern = /['"`](img\/[^/'"`\s]+\/[^'"`\s]*?)['"`]/g;
    while ((match = imgPathPattern.exec(content)) !== null) {
      const ref = match[1];
      if (ref.endsWith('/')) {
        pluginManagedDirs.add(ref);
      } else {
        addRef(refs, provenance, ref, `${src} hardcoded img path`);
      }
    }
  });

  // For plugin-managed directories, mark ALL files as referenced
  pluginManagedDirs.forEach(dir => {
    const absDir = path.join(FRONTEND, dir);
    if (fs.existsSync(absDir)) {
      walkDir(absDir, filePath => {
        const rel = path.relative(FRONTEND, filePath).replace(/\\/g, '/');
        addRef(refs, provenance, rel, `plugin-managed directory: ${dir}`);
      });
    }
  });

  return pluginManagedDirs;
}

/**
 * Scan plugin headers for @type file parameters with @dir values.
 * Only directories that are NOT already covered by explicit data references
 * are flagged as plugin-accessible. These are directories where plugins
 * can dynamically load any file at runtime, making static analysis unreliable.
 */
const PLUGIN_ACCESSIBLE_WHITELIST = [
  'img/pictures/', // PKD_HelpInMessages, PKD_VisualChoices, VisuMZ plugins
];

function scanPluginParameters(refs, provenance) {
  return new Set(PLUGIN_ACCESSIBLE_WHITELIST);
}

// ---------------------------------------------------------------------------
// Phase 3: File Discovery - Descobrir todos os arquivos de asset
// ---------------------------------------------------------------------------

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function discoverAllAssets() {
  const discovered = new Map(); // lowercase relPath -> { relPath, size, ext }

  function addFile(absPath) {
    const rel = path.relative(FRONTEND, absPath).replace(/\\/g, '/');
    const stat = fs.statSync(absPath);
    discovered.set(rel.toLowerCase(), { relPath: rel, size: stat.size, ext: path.extname(rel) });
  }

  walkDir(IMG_DIR, addFile);
  walkDir(AUDIO_DIR, addFile);
  if (fs.existsSync(MOVIES_DIR)) {
    walkDir(MOVIES_DIR, addFile);
  }

  return discovered;
}

// ---------------------------------------------------------------------------
// Whitelist
// ---------------------------------------------------------------------------

function loadWhitelist() {
  const patterns = [];
  if (!fs.existsSync(WHITELIST_FILE)) return patterns;

  const lines = fs.readFileSync(WHITELIST_FILE, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    patterns.push(trimmed);
  }
  return patterns;
}

function matchesWhitelist(relPath, patterns) {
  const normalized = relPath.replace(/\\/g, '/');
  for (const pattern of patterns) {
    const regexStr = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
    const regex = new RegExp(`^${regexStr}$`, 'i');
    if (regex.test(normalized)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Phase 4: Comparison - Encontrar arquivos nao referenciados
// ---------------------------------------------------------------------------

function findUnusedAssets(discovered, refs, provenance, whitelistPatterns, pluginAccessibleDirs) {
  const unused = [];
  const referenced = [];
  const whitelisted = [];
  const pluginAccessible = [];

  for (const [lowerPath, info] of discovered) {
    // Check if directly referenced
    if (refs.has(lowerPath)) {
      referenced.push(info);
      continue;
    }

    // Check whitelist
    if (matchesWhitelist(info.relPath, whitelistPatterns)) {
      whitelisted.push(info);
      continue;
    }

    // Check plugin-accessible directories (warn but don't auto-delete)
    let isPluginAccessible = false;
    for (const dir of pluginAccessibleDirs) {
      if (info.relPath.toLowerCase().startsWith(dir.toLowerCase())) {
        isPluginAccessible = true;
        break;
      }
    }

    if (isPluginAccessible) {
      pluginAccessible.push({ ...info, reason: 'plugin-accessible' });
      continue;
    }

    unused.push(info);
  }

  return { unused, referenced, whitelisted, pluginAccessible };
}

// ---------------------------------------------------------------------------
// Phase 5: Reporting
// ---------------------------------------------------------------------------

function categorize(relPath) {
  if (relPath.startsWith('img/')) {
    const sub = relPath.split('/')[1];
    return `img/${sub}`;
  }
  if (relPath.startsWith('audio/')) {
    const sub = relPath.split('/')[1];
    return `audio/${sub}`;
  }
  if (relPath.startsWith('movies/')) return 'movies';
  return 'other';
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateReport(results) {
  const { unused, referenced, whitelisted, pluginAccessible } = results;
  const totalUnusedSize = unused.reduce((sum, f) => sum + f.size, 0);

  // Group unused by category
  const byCategory = {};
  unused.forEach(f => {
    const cat = categorize(f.relPath);
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(f);
  });

  const lines = [];
  const sep = '='.repeat(76);

  lines.push(sep);
  lines.push('       UNUSED ASSETS REPORT - RPG Maker MZ'.padStart(50));
  lines.push(sep);
  lines.push(`Project: ${PROJECT_ROOT}`);
  lines.push(`Mode: ${opts.execute ? 'EXECUTE' : 'DRY RUN (no files will be deleted)'}`);
  lines.push(`Date: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('-'.repeat(76));
  lines.push('SUMMARY');
  lines.push('-'.repeat(76));
  lines.push(`Total asset files:       ${(referenced.length + whitelisted.length + pluginAccessible.length + unused.length).toLocaleString()}`);
  lines.push(`Referenced:              ${referenced.length.toLocaleString()}`);
  lines.push(`Whitelisted (protected): ${whitelisted.length.toLocaleString()}`);
  lines.push(`Plugin-accessible:       ${pluginAccessible.length.toLocaleString()}`);
  lines.push(`Unused candidates:       ${unused.length.toLocaleString()}`);
  lines.push(`Potential savings:       ${formatSize(totalUnusedSize)}`);
  lines.push('');

  if (unused.length > 0) {
    lines.push('-'.repeat(76));
    lines.push('UNUSED BY CATEGORY');
    lines.push('-'.repeat(76));
    const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length);
    for (const [cat, files] of sortedCategories) {
      const catSize = files.reduce((sum, f) => sum + f.size, 0);
      lines.push('');
      lines.push(`  ${cat}/ (${files.length} files, ${formatSize(catSize)})`);
      files.sort((a, b) => a.relPath.localeCompare(b.relPath));
      for (const f of files) {
        lines.push(`    UNUSED: ${f.relPath} (${formatSize(f.size)})`);
      }
    }
  }

  if (whitelisted.length > 0) {
    lines.push('');
    lines.push('-'.repeat(76));
    lines.push('PROTECTED (whitelist, always kept)');
    lines.push('-'.repeat(76));
    const wlCats = {};
    whitelisted.forEach(f => {
      const cat = categorize(f.relPath);
      if (!wlCats[cat]) wlCats[cat] = 0;
      wlCats[cat]++;
    });
    for (const [cat, count] of Object.entries(wlCats).sort()) {
      lines.push(`  ${cat}/: ${count} files`);
    }
  }

  if (pluginAccessible.length > 0) {
    lines.push('');
    lines.push('-'.repeat(76));
    lines.push('PLUGIN-ACCESSIBLE (kept, may be used by plugin parameters)');
    lines.push('-'.repeat(76));
    const paCats = {};
    pluginAccessible.forEach(f => {
      const cat = categorize(f.relPath);
      if (!paCats[cat]) paCats[cat] = 0;
      paCats[cat]++;
    });
    for (const [cat, count] of Object.entries(paCats).sort()) {
      lines.push(`  ${cat}/: ${count} files`);
    }
    lines.push('');
    lines.push('  WARNING: These files are in directories that plugins can');
    lines.push('  access via @type file parameters. They were NOT auto-deleted.');
    lines.push('  Review manually if you want to remove any.');
  }

  lines.push('');
  lines.push(sep);

  return lines.join('\n');
}

function generateJsonReport(results, pluginManagedDirs, pluginAccessibleDirs) {
  const { unused, referenced, whitelisted, pluginAccessible } = results;
  const totalUnusedSize = unused.reduce((sum, f) => sum + f.size, 0);

  const byCategory = {};
  unused.forEach(f => {
    const cat = categorize(f.relPath);
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push({ path: f.relPath, size: f.size });
  });

  return JSON.stringify(
    {
      mode: opts.execute ? 'execute' : 'dry-run',
      timestamp: new Date().toISOString(),
      projectRoot: PROJECT_ROOT,
      summary: {
        totalFiles: referenced.length + whitelisted.length + pluginAccessible.length + unused.length,
        referencedFiles: referenced.length,
        whitelistedFiles: whitelisted.length,
        pluginAccessibleFiles: pluginAccessible.length,
        unusedFiles: unused.length,
        potentialSavingsBytes: totalUnusedSize,
      },
      unusedByCategory: byCategory,
      pluginManagedDirs: [...pluginManagedDirs],
      pluginAccessibleDirs: [...pluginAccessibleDirs],
    },
    null,
    2,
  );
}

// ---------------------------------------------------------------------------
// Phase 6: Execution
// ---------------------------------------------------------------------------

function executeDeletion(unused, manifestPath) {
  const backupDir = path.join(PROJECT_ROOT, '.unused_assets_backup');
  const manifest = {
    timestamp: new Date().toISOString(),
    deletedFiles: [],
    backupDir: backupDir,
  };

  // Create backup directory structure
  unused.forEach(f => {
    const srcAbs = path.join(FRONTEND, f.relPath);
    const dstAbs = path.join(backupDir, f.relPath);
    const dstDir = path.dirname(dstAbs);
    fs.mkdirSync(dstDir, { recursive: true });
    fs.renameSync(srcAbs, dstAbs);

    const hash = crypto.createHash('sha256').update(fs.readFileSync(dstAbs)).digest('hex').slice(0, 16);
    manifest.deletedFiles.push({ path: f.relPath, size: f.size, hash });
  });

  // Save manifest
  if (manifestPath) {
    fs.mkdirSync(path.dirname(path.resolve(manifestPath)), { recursive: true });
    fs.writeFileSync(path.resolve(manifestPath), JSON.stringify(manifest, null, 2));
    console.log(`\nManifest saved to: ${path.resolve(manifestPath)}`);
  }

  console.log(`\n${unused.length} files moved to backup: ${backupDir}`);
  console.log('To restore: move files from .unused_assets_backup/ back to frontend/');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const refs = new Set(); // lowercase relative paths
  const provenance = new Map(); // lowercase path -> [source descriptions]

  if (!opts.json) console.log('Scanning project data...\n');

  // Phase 1: Extract references from data files
  extractSystemReferences(refs, provenance);
  extractActorReferences(refs, provenance);
  extractEnemyReferences(refs, provenance);
  extractTilesetReferences(refs, provenance);
  extractAnimationReferences(refs, provenance);
  extractMapReferences(refs, provenance);
  extractCommonEventReferences(refs, provenance);

  if (opts.verbose && !opts.json) {
    console.log(`Data references found: ${refs.size}`);
    console.log('');
  }

  // Phase 2: Scan plugins
  const pluginManagedDirs = scanPluginFiles(refs, provenance);
  const pluginAccessibleDirs = scanPluginParameters(refs, provenance);

  if (opts.verbose && !opts.json) {
    console.log(`After plugin scan: ${refs.size} total references`);
    console.log(`Plugin-managed dirs: ${[...pluginManagedDirs].join(', ')}`);
    console.log(`Plugin-accessible dirs: ${[...pluginAccessibleDirs].join(', ')}`);
    console.log('');
  }

  // Phase 3: Discover all asset files
  const discovered = discoverAllAssets();
  if (!opts.json) console.log(`Asset files on disk: ${discovered.size}`);

  // Phase 4: Load whitelist and compare
  const whitelistPatterns = loadWhitelist();
  const results = findUnusedAssets(discovered, refs, provenance, whitelistPatterns, pluginAccessibleDirs);

  // Phase 5: Report
  const report = generateReport(results);
  if (!opts.json) console.log(report);

  // Save report to file if requested
  if (opts.report) {
    fs.mkdirSync(path.dirname(path.resolve(opts.report)), { recursive: true });
    fs.writeFileSync(path.resolve(opts.report), report);
    console.log(`\nReport saved to: ${path.resolve(opts.report)}`);
  }

  // JSON output
  if (opts.json) {
    const jsonReport = generateJsonReport(results, pluginManagedDirs, pluginAccessibleDirs);
    if (!opts.report) {
      console.log('\n' + jsonReport);
    }
    if (opts.report) {
      const jsonPath = opts.report.replace(/\.\w+$/, '.json');
      fs.writeFileSync(path.resolve(jsonPath), jsonReport);
    }
  }

  // Phase 6: Execute if requested
  if (opts.execute && results.unused.length > 0) {
    console.log(`\n*** WARNING: You are about to DELETE ${results.unused.length} files ***`);
    console.log(`*** A backup will be created at .unused_assets_backup/ ***`);
    console.log(`*** Type "DELETE ${results.unused.length} FILES" to proceed: `);

    // In non-interactive mode (piped), skip confirmation
    if (process.stdin.isTTY) {
      const readline = require('readline');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question('', answer => {
        if (answer === `DELETE ${results.unused.length} FILES`) {
          executeDeletion(results.unused, opts.manifest);
        } else {
          console.log('Aborted. No files were deleted.');
        }
        rl.close();
      });
    } else {
      console.log('Non-interactive mode. Skipping deletion.');
      console.log('Run interactively to confirm deletion.');
    }
  }
}

main();
