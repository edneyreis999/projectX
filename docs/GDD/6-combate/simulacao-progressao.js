#!/usr/bin/env node
/**
 * Script de Simulação de Progressão - ProjectX
 *
 * Simula batalhas e mostra a progressão de níveis e habilidades dos personagens.
 *
 * Uso:
 *   node simulacao-progressao.js --battles=20
 *   node simulacao-progressao.js --battles=30 --area=kravens
 *   node simulacao-progressao.js --battles=10 --troop=2
 *
 * @version 1.0.0
 * @date 2026-03-11
 */

const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURAÇÕES
// ============================================

const DATA_DIR = '/Users/edney/projects/coreto/projectX/frontend/data';
const MAX_LEVEL = 30;

// IDs dos personagens principais
const CHARACTERS = [
  { id: 3, name: 'Thorin' },
  { id: 4, name: 'Filena' },
  { id: 5, name: 'Kilin' },
  { id: 6, name: 'Mhordred' }
];

// Definição das áreas e suas tropas
const AREAS = {
  'cao-luar': [
    { troopId: 2, name: 'Lobo Jovem x2', enemies: [{ id: 2, qty: 2 }], exp: 76 },
    { troopId: 3, name: 'Lobo Jovem x3', enemies: [{ id: 2, qty: 3 }], exp: 114 },
    { troopId: 4, name: 'Goblin Saqueador x2', enemies: [{ id: 3, qty: 2 }], exp: 126 },
    { troopId: 5, name: 'Goblin Saqueador x3', enemies: [{ id: 3, qty: 3 }], exp: 189 },
    { troopId: 6, name: 'Lobo de Gelo x3', enemies: [{ id: 4, qty: 3 }], exp: 225 },
    { troopId: 7, name: 'Lobo de Gelo x4', enemies: [{ id: 4, qty: 4 }], exp: 300 },
    { troopId: 8, name: 'Bandido Anão x3', enemies: [{ id: 5, qty: 3 }], exp: 264 },
    { troopId: 10, name: 'Goblin x2 + Bandido x2', enemies: [{ id: 3, qty: 2 }, { id: 5, qty: 2 }], exp: 302 },
    { troopId: 11, name: 'Lobo de Gelo x2 + Lobo Jovem x2', enemies: [{ id: 4, qty: 2 }, { id: 2, qty: 2 }], exp: 226 }
  ],
  'kravens': [
    { troopId: 23, name: 'Morcego x3', enemies: [{ id: 13, qty: 3 }], exp: 189 },
    { troopId: 24, name: 'Morcego x4', enemies: [{ id: 13, qty: 4 }], exp: 252 },
    { troopId: 25, name: 'Morcego x5', enemies: [{ id: 13, qty: 5 }], exp: 315 },
    { troopId: 26, name: 'Aranha Mineira x2', enemies: [{ id: 14, qty: 2 }], exp: 176 },
    { troopId: 27, name: 'Aranha Mineira x3', enemies: [{ id: 14, qty: 3 }], exp: 264 },
    { troopId: 28, name: 'Morcego x3 + Aranha x1', enemies: [{ id: 13, qty: 3 }, { id: 14, qty: 1 }], exp: 277 },
    { troopId: 29, name: 'Aranha Gigante x2', enemies: [{ id: 15, qty: 2 }], exp: 250 },
    { troopId: 30, name: 'Rato Gigante x4', enemies: [{ id: 16, qty: 4 }], exp: 500 },
    { troopId: 31, name: 'Aranha Gigante x1 + Rato Gigante x3', enemies: [{ id: 15, qty: 1 }, { id: 16, qty: 3 }], exp: 500 },
  ],
  'esgoto': [
    { troopId: 44, name: 'Rato de Esgoto x4', enemies: [{ id: 24, qty: 4 }], exp: 400 },
    { troopId: 45, name: 'Rato de Esgoto x5', enemies: [{ id: 24, qty: 5 }], exp: 500 },
    { troopId: 46, name: 'Limo Ácido x1', enemies: [{ id: 25, qty: 1 }], exp: 138 },
    { troopId: 47, name: 'Limo Ácido x2', enemies: [{ id: 25, qty: 2 }], exp: 276 },
    { troopId: 48, name: 'Rato x3 + Limo x1', enemies: [{ id: 24, qty: 3 }, { id: 25, qty: 1 }], exp: 438 },
    { troopId: 49, name: 'Fungo Venenoso x2', enemies: [{ id: 26, qty: 2 }], exp: 376 },
    { troopId: 50, name: 'Gosma Tóxica x1', enemies: [{ id: 27, qty: 1 }], exp: 188 },
  ],
  'melios': [
    { troopId: 63, name: 'Guardião Menor x2', enemies: [{ id: 35, qty: 2 }], exp: 300 },
    { troopId: 64, name: 'Guardião Menor x3', enemies: [{ id: 35, qty: 3 }], exp: 450 },
    { troopId: 65, name: 'Elemental de Terra x1', enemies: [{ id: 36, qty: 1 }], exp: 200 },
    { troopId: 66, name: 'Guardião Menor x1 + Elemental x1', enemies: [{ id: 35, qty: 1 }, { id: 36, qty: 1 }], exp: 350 },
    { troopId: 67, name: 'Guardião Ancião (BOSS)', enemies: [{ id: 37, qty: 1 }], exp: 180 },
    { troopId: 68, name: 'Sombra Errante x1', enemies: [{ id: 38, qty: 1 }], exp: 250 },
  ]
};

// ============================================
// CARREGAMENTO DE DADOS
// ============================================

function loadJson(filename) {
  const filepath = path.join(DATA_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

function loadGameData() {
  const classes = loadJson('Classes.json');
  const actors = loadJson('Actors.json');
  const skills = loadJson('Skills.json');
  const enemies = loadJson('Enemies.json');

  return { classes, actors, skills, enemies };
}

// ============================================
// FUNÇÕES DO SISTEMA DE EXP (RPG Maker MZ)
// ============================================

/**
 * Calcula a EXP necessária para um determinado nível usando a fórmula real do RPG Maker MZ.
 *
 * Fórmula REAL do RPG Maker MZ (rmmz_objects.js linha 4159):
 * EXP = Math.round(
 *     (basis × level^1.5 × level × (level+1)) / (6 + level²/50) +
 *     (level-1) × extra
 * )
 *
 * @param {number} level - O nível alvo
 * @param {Array} expParams - Array [basis, extra, acc_a, acc_b]
 * @returns {number} EXP acumulada necessária para atingir o nível
 */
function expForLevel(level, expParams) {
  if (level <= 1) return 0;

  const [basis, extra, acc_a, acc_b] = expParams;

  const exp = Math.round(
    (basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) /
      (6 + Math.pow(level, 2) / 50 / acc_b) +
      (level - 1) * extra
  );

  return exp;
}

/**
 * Determina o nível atual baseado na EXP total acumulada.
 *
 * @param {number} currentExp - EXP total acumulada
 * @param {Array} expParams - Array [basis, extra, acc_a, acc_b]
 * @param {number} maxLevel - Nível máximo (padrão: 30)
 * @returns {number} Nível atual
 */
function getLevelFromExp(currentExp, expParams, maxLevel = MAX_LEVEL) {
  for (let level = 1; level <= maxLevel; level++) {
    if (currentExp < expForLevel(level + 1, expParams)) {
      return level;
    }
  }
  return maxLevel;
}

// ============================================
// CLASSE DE SIMULAÇÃO DE PERSONAGEM
// ============================================

class CharacterSimulation {
  constructor(actor, classData, allSkills) {
    this.id = actor.id;
    this.name = actor.name;
    this.classId = actor.classId;
    this.className = classData.name;
    this.initialLevel = actor.initialLevel;
    this.currentLevel = actor.initialLevel;
    this.expParams = classData.expParams;
    this.learnings = classData.learnings || [];

    // EXP inicial (acumulada até o nível inicial)
    this.currentExp = expForLevel(this.initialLevel, this.expParams);

    // Skills já aprendidas até o nível inicial
    this.learnedSkills = new Set(
      this.learnings
        .filter(l => l.level <= this.initialLevel)
        .map(l => l.skillId)
    );

    // Skills aprendidas durante a simulação
    this.newSkills = [];
    this.levelUps = [];
  }

  addExp(amount) {
    const beforeLevel = this.currentLevel;
    this.currentExp += amount;
    this.currentLevel = getLevelFromExp(this.currentExp, this.expParams);

    // Verificar se subiu de nível
    if (this.currentLevel > beforeLevel) {
      for (let level = beforeLevel + 1; level <= this.currentLevel; level++) {
        this.levelUps.push({ battle: null, level });
        this.checkNewSkills(level);
      }
      return true;
    }
    return false;
  }

  checkNewSkills(level) {
    for (const learning of this.learnings) {
      if (learning.level === level && !this.learnedSkills.has(learning.skillId)) {
        this.learnedSkills.add(learning.skillId);
        this.newSkills.push({ battle: null, level, skillId: learning.skillId });
      }
    }
  }

  getEvents(battleNum) {
    const events = [];

    // Atualizar referências de batalha nos eventos
    this.levelUps.forEach(l => { if (l.battle === null) l.battle = battleNum; });
    this.newSkills.forEach(s => { if (s.battle === null) s.battle = battleNum; });

    // Retornar eventos desta batalha
    const levelUps = this.levelUps.filter(l => l.battle === battleNum);
    const newSkills = this.newSkills.filter(s => s.battle === battleNum);

    return { levelUps, newSkills };
  }
}

// ============================================
// FUNÇÕES DE SIMULAÇÃO
// ============================================

function initializeSimulations(gameData) {
  const { classes, actors, skills } = gameData;
  const simulations = [];

  // Filtrar elementos null do array
  const validActors = actors.filter(a => a !== null);
  const validClasses = classes.filter(c => c !== null);

  for (const charDef of CHARACTERS) {
    const actor = validActors.find(a => a.id === charDef.id);
    if (!actor) continue;

    const classData = validClasses.find(c => c.id === actor.classId);
    if (!classData) continue;

    const sim = new CharacterSimulation(actor, classData, skills);
    simulations.push(sim);
  }

  return simulations;
}

function runSimulation(numBattles, areaName, specificTroopId, gameData) {
  const simulations = initializeSimulations(gameData);
  const troops = specificTroopId
    ? AREAS[areaName].filter(t => t.troopId === specificTroopId)
    : AREAS[areaName];

  if (troops.length === 0) {
    console.error(`Erro: Nenhuma tropa encontrada para área="${areaName}" troop=${specificTroopId}`);
    process.exit(1);
  }

  // Resultados da simulação para cada batalha
  const battleResults = [];

  for (let i = 0; i < numBattles; i++) {
    const troopIndex = i % troops.length;
    const troop = troops[troopIndex];
    const battleNum = i + 1;

    const battleResult = {
      battleNum,
      troop: troop.name,
      exp: troop.exp,
      events: {}
    };

    // Adicionar EXP para cada personagem
    for (const sim of simulations) {
      sim.addExp(troop.exp);
      const events = sim.getEvents(battleNum);
      battleResult.events[sim.name] = events;
    }

    battleResults.push(battleResult);
  }

  return { simulations, battleResults, troops };
}

// ============================================
// FUNÇÕES DE SAÍDA
// ============================================

function formatSkillName(skillId, skills) {
  // Filtrar elementos null
  const validSkills = skills.filter(s => s !== null);
  const skill = validSkills.find(s => s.id === skillId);
  return skill ? skill.name : `Skill ${skillId}`;
}

function buildBattleTable(battleResults, simulations, skills) {
  const table = [];

  for (const result of battleResults) {
    const row = {
      '#': result.battleNum,
      'Tropa': result.troop.length > 25 ? result.troop.substring(0, 25) + '...' : result.troop
    };

    for (const sim of simulations) {
      const events = result.events[sim.name];
      const parts = [];

      for (const lu of events.levelUps) {
        parts.push(`↑${lu.level}`);
      }

      for (const ns of events.newSkills) {
        const skillName = formatSkillName(ns.skillId, skills);
        // Limitar nome da skill para caber na tabela
        const shortName = skillName.length > 15 ? skillName.substring(0, 15) + '...' : skillName;
        parts.push(`+${shortName}`);
      }

      row[sim.name] = parts.length > 0 ? parts.join(' ') : '.';
    }

    table.push(row);
  }

  return table;
}

function printBattleTable(battleResults, simulations, skills) {
  console.log('\n' + '='.repeat(80));
  console.log('TABELA DE PROGRESSÃO POR BATALHA');
  console.log('='.repeat(80));
  console.log('Legenda: ↑N = Subiu para nível N | +Nome = Aprendeu habilidade');
  console.log('='.repeat(80));

  const table = buildBattleTable(battleResults, simulations, skills);

  // Imprimir como tabela formatada
  console.table(Object.values(table));
}

function printFinalReport(simulations, skills, battleResults, areaName) {
  console.log('\n' + '='.repeat(80));
  console.log('RELATÓRIO FINAL DE PROGRESSÃO');
  console.log('='.repeat(80));
  console.log(`Área: ${areaName.toUpperCase()}`);
  console.log(`Total de batalhas: ${battleResults.length}`);
  console.log('='.repeat(80));

  let totalLevelUps = 0;
  let totalSkillsLearned = 0;

  for (const sim of simulations) {
    const levelsGained = sim.currentLevel - sim.initialLevel;
    const skillsGained = sim.newSkills.length;

    totalLevelUps += levelsGained;
    totalSkillsLearned += skillsGained;

    console.log(`\n${sim.name} (${sim.className})`);
    console.log(`  Nível: ${sim.initialLevel} → ${sim.currentLevel} (+${levelsGained})`);
    console.log(`  EXP: ${sim.currentExp} (${sim.currentExp - expForLevel(sim.initialLevel, sim.expParams)} ganha)`);

    if (skillsGained > 0) {
      console.log(`  Habilidades aprendidas:`);
      for (const ns of sim.newSkills) {
        const skillName = formatSkillName(ns.skillId, skills);
        console.log(`    - Batalha ${ns.battle}: ${skillName} (nv ${ns.level})`);
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('RESUMO GERAL');
  console.log('='.repeat(80));
  console.log(`Total de level ups: ${totalLevelUps}`);
  console.log(`Total de habilidades aprendidas: ${totalSkillsLearned}`);
  console.log('='.repeat(80) + '\n');
}

// ============================================
// PARSING DE ARGUMENTOS
// ============================================

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    battles: null,
    area: 'cao-luar',
    troop: null
  };

  for (const arg of args) {
    if (arg.startsWith('--battles=')) {
      result.battles = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--area=')) {
      result.area = arg.split('=')[1];
    } else if (arg.startsWith('--troop=')) {
      result.troop = parseInt(arg.split('=')[1], 10);
    }
  }

  if (!result.battles || result.battles <= 0) {
    console.error('Erro: --battles=N é obrigatório e deve ser maior que 0');
    console.error('Uso: node simulacao-progressao.js --battles=20 [--area=cao-luar] [--troop=2]');
    process.exit(1);
  }

  if (!AREAS[result.area]) {
    console.error(`Erro: Área "${result.area}" não encontrada`);
    console.error(`Áreas disponíveis: ${Object.keys(AREAS).join(', ')}`);
    process.exit(1);
  }

  return result;
}

// ============================================
// MAIN
// ============================================

function main() {
  const args = parseArgs();

  console.log('\n' + '='.repeat(80));
  console.log('SIMULAÇÃO DE PROGRESSÃO - PROJECTX');
  console.log('='.repeat(80));
  console.log(`Batalhas: ${args.battles}`);
  console.log(`Área: ${args.area}`);
  if (args.troop) {
    console.log(`Tropa específica: ${args.troop}`);
  }
  console.log('='.repeat(80));

  // Carregar dados do jogo
  console.log('\nCarregando dados do jogo...');
  const gameData = loadGameData();
  console.log('  ✓ Classes carregadas');
  console.log('  ✓ Actors carregados');
  console.log('  ✓ Skills carregadas');
  console.log('  ✓ Enemies carregados');

  // Executar simulação
  console.log('\nExecutando simulação...');
  const { simulations, battleResults, troops } = runSimulation(
    args.battles,
    args.area,
    args.troop,
    gameData
  );

  // Imprimir resultados
  printBattleTable(battleResults, simulations, gameData.skills);
  printFinalReport(simulations, gameData.skills, battleResults, args.area);
}

// Executar
if (require.main === module) {
  main();
}

module.exports = {
  expForLevel,
  getLevelFromExp,
  CharacterSimulation,
  AREAS
};
