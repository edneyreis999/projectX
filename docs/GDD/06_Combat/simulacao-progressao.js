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
 *   node simulacao-progressao.js --battles=20 --area=cao-luar,kravens  # Múltiplas áreas
 *   node simulacao-progressao.js --battles=20 --area=all                # Todas as áreas
 *
 * @version 2.0.0
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
  const troops = loadJson('Troops.json');

  return { classes, actors, skills, enemies, troops };
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
// FUNÇÕES DE MAPEAMENTO DE ÁREAS E TROPAS
// ============================================

/**
 * Calcula a EXP total de uma tropa somando a EXP de cada inimigo.
 *
 * @param {Object} troop - Objeto da tropa do Troops.json
 * @param {Array} enemies - Array de inimigos do Enemies.json
 * @returns {number} EXP total da tropa
 */
function calculateTroopExp(troop, enemies) {
  let totalExp = 0;

  // Filtrar elementos null dos enemies
  const validEnemies = enemies.filter(e => e !== null);

  for (const member of troop.members) {
    // Ignorar inimigos ocultos (hidden: true)
    if (member.hidden) continue;

    const enemy = validEnemies.find(e => e.id === member.enemyId);
    if (enemy) {
      totalExp += enemy.exp;
    }
  }

  return totalExp;
}

/**
 * Normaliza o nome da área para criar uma chave consistente.
 * Mapeia nomes das áreas para chaves compatíveis com o script.
 *
 * @param {string} name - Nome do separador (ex: "=== ESTRADA DO CÃO-LUAR ===")
 * @returns {string} Chave normalizada (ex: "cao-luar")
 */
function normalizeAreaName(name) {
  const cleanName = name
    .replace(/===/g, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-');

  // Mapeamento manual para manter compatibilidade
  const areaMap = {
    'estrada-do-cao-luar': 'cao-luar',
    'minas-de-kravens': 'kravens',
    'esgoto-de-gildrat': 'esgoto',
    'ruinas-de-melios': 'melios',
    'regioes-pos-selo': 'pos-selo'
  };

  return areaMap[cleanName] || cleanName;
}

/**
 * Mapeia as tropas por área usando os separadores do Troops.json.
 *
 * @param {Array} troops - Array de tropas do Troops.json
 * @param {Array} enemies - Array de inimigos do Enemies.json
 * @returns {Object} Objeto com áreas como chaves e tropas como valores
 */
function mapAreasBySeparators(troops, enemies) {
  const areas = {};
  let currentArea = null;
  let currentAreaKey = null;

  // Filtrar elementos null
  const validTroops = troops.filter(t => t !== null);

  for (const troop of validTroops) {
    // Verificar se é um separador de área
    if (troop.name && troop.name.includes('===')) {
      currentArea = troop.name;
      currentAreaKey = normalizeAreaName(troop.name);
      areas[currentAreaKey] = [];
      continue;
    }

    // Ignorar tropas sem membros ou com nome vazio
    if (!troop.members || troop.members.length === 0) continue;
    if (!troop.name || troop.name.trim() === '') continue;

    // Se estamos dentro de uma área, adicionar a tropa
    if (currentAreaKey) {
      areas[currentAreaKey].push({
        troopId: troop.id,
        name: troop.name,
        enemies: troop.members.map(m => ({ id: m.enemyId, qty: 1, hidden: m.hidden })),
        exp: calculateTroopExp(troop, enemies)
      });
    }
  }

  return areas;
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

  // Mapear áreas dinamicamente do Troops.json
  const areas = mapAreasBySeparators(gameData.troops, gameData.enemies);

  // Verificar se a área existe
  if (!areas[areaName]) {
    console.error(`Erro: Área "${areaName}" não encontrada`);
    console.error(`Áreas disponíveis: ${Object.keys(areas).join(', ')}`);
    process.exit(1);
  }

  const troops = specificTroopId
    ? areas[areaName].filter(t => t.troopId === specificTroopId)
    : areas[areaName];

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

  return { simulations, battleResults, troops, areas };
}

/**
 * Executa uma simulação para uma área específica, reutilizando simulações existentes.
 * As simulações devem ter sido criadas anteriormente e manterão seu estado.
 *
 * @param {Array} simulations - Array de CharacterSimulation existentes
 * @param {number} numBattles - Número de batalhas para simular
 * @param {string} areaName - Nome da área para simular
 * @param {Object} gameData - Dados do jogo
 * @param {number} battleOffset - Offset para numeração de batalhas (para progressão contínua)
 * @returns {Object} Resultados da simulação desta área
 */
function runArea(simulations, numBattles, areaName, specificTroopId, gameData, battleOffset = 0) {
  // Mapear áreas dinamicamente do Troops.json
  const areas = mapAreasBySeparators(gameData.troops, gameData.enemies);

  // Verificar se a área existe
  if (!areas[areaName]) {
    console.error(`Erro: Área "${areaName}" não encontrada`);
    console.error(`Áreas disponíveis: ${Object.keys(areas).join(', ')}`);
    process.exit(1);
  }

  const troops = specificTroopId
    ? areas[areaName].filter(t => t.troopId === specificTroopId)
    : areas[areaName];

  if (troops.length === 0) {
    console.error(`Erro: Nenhuma tropa encontrada para área="${areaName}" troop=${specificTroopId}`);
    process.exit(1);
  }

  // Resultados da simulação para cada batalha
  const battleResults = [];

  for (let i = 0; i < numBattles; i++) {
    const troopIndex = i % troops.length;
    const troop = troops[troopIndex];
    const battleNum = battleOffset + i + 1;  // Usa o offset para numeração contínua

    const battleResult = {
      battleNum,
      troop: troop.name,
      exp: troop.exp,
      events: {}
    };

    // Adicionar EXP para cada personagem (as simulações mantêm estado)
    for (const sim of simulations) {
      sim.addExp(troop.exp);
      const events = sim.getEvents(battleNum);
      battleResult.events[sim.name] = events;
    }

    battleResults.push(battleResult);
  }

  return { battleResults, troops };
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

function printBattleTable(battleResults, simulations, skills, areaName = null) {
  console.log('\n' + '='.repeat(80));
  if (areaName) {
    console.log(`TABELA DE PROGRESSÃO - ÁREA: ${areaName.toUpperCase()}`);
  } else {
    console.log('TABELA DE PROGRESSÃO POR BATALHA');
  }
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
    areas: ['cao-luar'],  // Mudou de 'area' para 'areas' (array)
    troop: null
  };

  for (const arg of args) {
    if (arg.startsWith('--battles=')) {
      result.battles = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--area=')) {
      const areaValue = arg.split('=')[1];
      // Suporta --area=cao-luar,kravens ou --area=all
      if (areaValue === 'all') {
        result.areas = ['all'];  // Será resolvido depois após carregar os dados
      } else {
        result.areas = areaValue.split(',').map(a => a.trim());
      }
    } else if (arg.startsWith('--troop=')) {
      result.troop = parseInt(arg.split('=')[1], 10);
    }
  }

  if (!result.battles || result.battles <= 0) {
    console.error('Erro: --battles=N é obrigatório e deve ser maior que 0');
    console.error('Uso: node simulacao-progressao.js --battles=20 [--area=cao-luar] [--area=cao-luar,kravens] [--area=all] [--troop=2]');
    process.exit(1);
  }

  // Validação: --troop só funciona com uma única área
  if (result.troop && result.areas.length > 1) {
    console.error('Erro: --troop só pode ser usado com uma única área');
    process.exit(1);
  }

  return result;
}

// ============================================
// MAIN
// ============================================

function main() {
  const args = parseArgs();

  // Carregar dados do jogo primeiro para obter áreas disponíveis
  const gameData = loadGameData();

  // Mapear áreas para validação
  const areas = mapAreasBySeparators(gameData.troops, gameData.enemies);

  // Resolver --area=all
  let areasToSimulate = args.areas;
  if (areasToSimulate.includes('all')) {
    areasToSimulate = Object.keys(areas);
  }

  // Validar áreas
  for (const area of areasToSimulate) {
    if (!areas[area]) {
      console.error(`\nErro: Área "${area}" não encontrada`);
      console.error(`Áreas disponíveis: ${Object.keys(areas).join(', ')}`);
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('SIMULAÇÃO DE PROGRESSÃO - PROJECTX');
  console.log('='.repeat(80));
  console.log(`Batalhas por área: ${args.battles}`);
  console.log(`Áreas: ${areasToSimulate.join(', ')}`);
  if (args.troop) {
    console.log(`Tropa específica: ${args.troop}`);
  }
  console.log('='.repeat(80));

  // Carregar dados do jogo
  console.log('\nCarregando dados do jogo...');
  console.log('  ✓ Classes carregadas');
  console.log('  ✓ Actors carregados');
  console.log('  ✓ Skills carregadas');
  console.log('  ✓ Enemies carregados');
  console.log('  ✓ Troops carregados');
  console.log(`  ✓ ${Object.keys(areas).length} áreas mapeadas`);

  // Criar simulações uma única vez (para manter progressão contínua)
  console.log('\nInicializando personagens...');
  const simulations = initializeSimulations(gameData);
  console.log(`  ✓ ${simulations.length} personagens inicializados`);

  // Resultados consolidados de todas as áreas
  const allBattleResults = [];
  let battleOffset = 0;

  // Executar simulação para cada área
  console.log('\nExecutando simulações...');

  for (let i = 0; i < areasToSimulate.length; i++) {
    const areaName = areasToSimulate[i];
    const isLastArea = i === areasToSimulate.length - 1;
    const isFirstArea = i === 0;

    console.log(`\n  [${i + 1}/${areasToSimulate.length}] Simulando área: ${areaName}...`);

    // Executar simulação desta área
    const { battleResults } = runArea(
      simulations,
      args.battles,
      areaName,
      args.troop,
      gameData,
      battleOffset
    );

    // Adicionar resultados consolidados
    allBattleResults.push(...battleResults);

    // Imprimir tabela desta área (ou tabela consolidada se for a última)
    if (areasToSimulate.length > 1) {
      if (!isLastArea) {
        // Imprimir tabela parcial desta área
        printBattleTable(battleResults, simulations, gameData.skills, areaName);
      } else {
        // Última área: imprimir tabela consolidada de todas as áreas
        console.log('\n' + '='.repeat(80));
        console.log('TABELA CONSOLIDADA - PROGRESSÃO ACUMULADA DE TODAS AS ÁREAS');
        console.log('='.repeat(80));
        printBattleTable(battleResults, simulations, gameData.skills, areaName);
      }
    } else {
      // Apenas uma área: imprimir tabela simples
      printBattleTable(battleResults, simulations, gameData.skills, areaName);
    }

    // Atualizar offset para a próxima área
    battleOffset += battleResults.length;
  }

  // Imprimir relatório final
  const areaLabel = areasToSimulate.length > 1
    ? areasToSimulate.join(' + ')
    : areasToSimulate[0];
  printFinalReport(simulations, gameData.skills, allBattleResults, areaLabel);
}

// Executar
if (require.main === module) {
  main();
}

module.exports = {
  expForLevel,
  getLevelFromExp,
  CharacterSimulation,
  calculateTroopExp,
  mapAreasBySeparators,
  normalizeAreaName
};
