#!/usr/bin/env node
/**
 * find_free_ids.js
 *
 * Encontra IDs livres de variáveis e switches no projeto RPG Maker MZ.
 *
 * Uso: node scripts/find_free_ids.js [options]
 * Opções:
 *   --min-count=<n>  Número mínimo de IDs contíguos necessários (padrão: 5)
 *   --type=<var|sw|all>  Tipo de ID para buscar (padrão: all)
 *   --start=<id>  ID inicial para busca (padrão: 1)
 *
 * Exemplo:
 *   node scripts/find_free_ids.js --min-count=10
 *   node scripts/find_free_ids.js --type=var --min-count=3
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let minCount = 5;
let searchType = 'all'; // 'var', 'sw', or 'all'
let startId = 1;

args.forEach(arg => {
  if (arg.startsWith('--min-count=')) {
    minCount = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--type=')) {
    searchType = arg.split('=')[1];
  } else if (arg.startsWith('--start=')) {
    startId = parseInt(arg.split('=')[1], 10);
  }
});

// File paths
const projectRoot = path.resolve(__dirname, '..');
const systemFile = path.join(projectRoot, 'frontend', 'data', 'System.json');

// Helper functions
function readJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`ERRO ao ler ${filePath}:`, error.message);
    return null;
  }
}

function findFreeRanges(usedIds, startFrom, minRequired) {
  const ranges = [];
  let rangeStart = null;
  let rangeLength = 0;

  // RPG Maker MZ typically has 5000 variables and 5000 switches
  const maxId = 5000;

  for (let id = startFrom; id <= maxId; id++) {
    if (!usedIds.has(id)) {
      if (rangeStart === null) {
        rangeStart = id;
        rangeLength = 1;
      } else {
        rangeLength++;
      }

      // If we have enough contiguous IDs, record this range
      if (rangeLength >= minRequired && (ranges.length === 0 || ranges[ranges.length - 1].end < id)) {
        // Check if this extends the previous range
        if (ranges.length > 0 && ranges[ranges.length - 1].end === id - rangeLength) {
          ranges[ranges.length - 1].end = id;
          ranges[ranges.length - 1].count += 1;
        } else if (rangeLength >= minRequired) {
          ranges.push({
            start: rangeStart,
            end: rangeStart + rangeLength - 1,
            count: rangeLength
          });
        }
      }
    } else {
      rangeStart = null;
      rangeLength = 0;
    }
  }

  return ranges;
}

function analyzeUsage(namesArray) {
  const used = new Set();

  namesArray?.forEach((name, index) => {
    if (index === 0) return; // Index 0 is usually null/unused
    if (name && name.trim() !== '' && !name.startsWith('-')) {
      used.add(index);
    }
  });

  return used;
}

// Main analysis
function findFreeIds() {
  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║                  FREE ID FINDER REPORT                          ║`);
  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);

  const systemData = readJson(systemFile);
  if (!systemData) {
    console.error('ERRO: Não foi possível ler System.json');
    process.exit(1);
  }

  const result = {
    variables: [],
    switches: []
  };

  // Analyze variables
  if (searchType === 'var' || searchType === 'all') {
    console.log(`🔍 Analyzing Variables (minimum: ${minCount} contiguous IDs)...\n`);

    const usedVariables = analyzeUsage(systemData.variables);
    console.log(`   Used variables: ${usedVariables.size}`);

    const freeVarRanges = findFreeRanges(usedVariables, startId, minCount);

    if (freeVarRanges.length > 0) {
      console.log(`   Found ${freeVarRanges.length} free range(s):\n`);

      freeVarRanges.forEach((range, idx) => {
        console.log(`   [${idx + 1}] Range ${range.start} - ${range.end} (${range.count} IDs)`);
        result.variables.push(range);
      });
    } else {
      console.log(`   ❌ No contiguous range of ${minCount}+ free variables found from ID ${startId}`);
    }
    console.log('');
  }

  // Analyze switches
  if (searchType === 'sw' || searchType === 'all') {
    console.log(`🔍 Analyzing Switches (minimum: ${minCount} contiguous IDs)...\n`);

    const usedSwitches = analyzeUsage(systemData.switches);
    console.log(`   Used switches: ${usedSwitches.size}`);

    const freeSwRanges = findFreeRanges(usedSwitches, startId, minCount);

    if (freeSwRanges.length > 0) {
      console.log(`   Found ${freeSwRanges.length} free range(s):\n`);

      freeSwRanges.forEach((range, idx) => {
        console.log(`   [${idx + 1}] Range ${range.start} - ${range.end} (${range.count} IDs)`);
        result.switches.push(range);
      });
    } else {
      console.log(`   ❌ No contiguous range of ${minCount}+ free switches found from ID ${startId}`);
    }
    console.log('');
  }

  // Output JSON for programmatic use
  console.log(`\n📄 JSON Output:\n`);
  console.log(JSON.stringify(result, null, 2));

  // Recommendations based on complexity
  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║                    RECOMMENDATIONS                             ║`);
  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);

  if (result.variables.length > 0) {
    const rec = result.variables[0];
    console.log(`🔢 Variables: Use range ${rec.start}-${rec.end} (${rec.count} IDs)`);
    console.log(`   Naming suggestion: v_[QUEST_NAME]_propósito (${rec.start}-${rec.start + Math.min(2, rec.count - 1)}, ...)\n`);
  } else {
    console.log(`⚠️  No free variable ranges found - consider:\n`);
    console.log(`   1. Starting search from a higher ID (--start=100)\n`);
    console.log(`   2. Reducing required count (--min-count=3)\n`);
  }

  if (result.switches.length > 0) {
    const rec = result.switches[0];
    console.log(`🔘 Switches: Use range ${rec.start}-${rec.end} (${rec.count} IDs)`);
    console.log(`   Naming suggestion: s_[QUEST_NAME]_propósito (${rec.start}-${rec.start + Math.min(2, rec.count - 1)}, ...)\n`);
  } else {
    console.log(`⚠️  No free switch ranges found - consider:\n`);
    console.log(`   1. Starting search from a higher ID (--start=100)\n`);
    console.log(`   2. Reducing required count (--min-count=3)\n`);
  }
}

// Run
findFreeIds();
