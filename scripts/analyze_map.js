#!/usr/bin/env node
/**
 * analyze_map.js
 *
 * Analisa um mapa do RPG Maker MZ para extrair informações técnicas
 * sobre variáveis, switches, eventos, common events e performance.
 *
 * Uso: node scripts/analyze_map.js --map <MAP_ID>
 * Exemplo: node scripts/analyze_map.js --map 5
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const mapId = args.find(arg => arg.startsWith('--map='))?.split('=')[1] ||
              args[args.indexOf('--map') + 1];

if (!mapId) {
  console.error('ERRO: Map ID não fornecido');
  console.error('Uso: node scripts/analyze_map.js --map <MAP_ID>');
  process.exit(1);
}

const mapIdNum = parseInt(mapId, 10);
if (isNaN(mapIdNum)) {
  console.error('ERRO: Map ID inválido:', mapId);
  process.exit(1);
}

// File paths
const projectRoot = path.resolve(__dirname, '..');
const mapFile = path.join(projectRoot, 'frontend', 'data', `Map${String(mapIdNum).padStart(3, '0')}.json`);
const systemFile = path.join(projectRoot, 'frontend', 'data', 'System.json');
const variablesFile = path.join(projectRoot, 'frontend', 'data', 'System.json');
const switchesFile = path.join(projectRoot, 'frontend', 'data', 'System.json');
const commonEventsFile = path.join(projectRoot, 'frontend', 'data', 'CommonEvents.json');
const mapInfosFile = path.join(projectRoot, 'frontend', 'data', 'MapInfos.json');

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

function getVariableName(id, systemData) {
  return systemData?.variables?.[id] || `Variable ${id}`;
}

function getSwitchName(id, systemData) {
  return systemData?.switches?.[id] || `Switch ${id}`;
}

function getCommonEventName(id, commonEvents) {
  const ce = commonEvents?.find(ce => ce.id === id);
  return ce?.name || `Common Event ${id}`;
}

function extractCodeFromEvent(event, codeList, depth = 0) {
  if (depth > 10) return; // Prevent infinite recursion

  event.pages?.forEach(page => {
    page.list?.forEach(command => {
      if (command.code === 0) return; // End of list

      // Track variables
      if (command.code === 122) { // Control Variables
        command.parameters?.forEach((param, idx) => {
          if (idx === 0 && typeof param === 'number') {
            const startId = param;
            const endId = command.parameters[1];
            if (typeof endId === 'number' && endId > 0) {
              for (let id = startId; id <= endId; id++) {
                codeList.variables.add(id);
              }
            } else {
              codeList.variables.add(startId);
            }
          }
        });
      }

      // Track switches
      if (command.code === 121) { // Control Switches
        command.parameters?.forEach((param, idx) => {
          if (idx === 0 && typeof param === 'number') {
            const startId = param;
            const endId = command.parameters[1];
            if (typeof endId === 'number' && endId > 0) {
              for (let id = startId; id <= endId; id++) {
                codeList.switches.add(id);
              }
            } else {
              codeList.switches.add(startId);
            }
          }
        });
      }

      // Track conditional branches that use variables/switches
      if (command.code === 111) { // Conditional Branch
        const type = command.parameters?.[0];
        if (type === 0 && typeof command.parameters[1] === 'number') {
          // Switch
          codeList.switches.add(command.parameters[1]);
        } else if (type === 1 && typeof command.parameters[1] === 'number') {
          // Variable
          codeList.variables.add(command.parameters[1]);
        }
      }

      // Track common event calls
      if (command.code === 117) { // Common Event
        const ceId = command.parameters?.[0];
        if (typeof ceId === 'number') {
          codeList.commonEvents.add(ceId);
        }
      }

      // Track self-switch usage
      if (command.code === 123) { // Control Self Switch
        codeList.selfSwitches.add(`${event.id}:${command.parameters?.[0]}`);
      }

      // Recurse into nested event calls (if any)
      if (command.parameters) {
        command.parameters.forEach(param => {
          if (param && typeof param === 'object' && param.code) {
            extractCodeFromEvent({ pages: [{ list: [param] }] }, codeList, depth + 1);
          }
        });
      }
    });
  });
}

// Main analysis
function analyzeMap() {
  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║                  MAP ANALYSIS REPORT                            ║`);
  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);
  console.log(`📍 Map ID: ${mapIdNum}`);
  console.log(`📁 File: ${mapFile}\n`);

  // Read files
  const mapData = readJson(mapFile);
  const systemData = readJson(systemFile);
  const commonEvents = readJson(commonEventsFile);
  const mapInfos = readJson(mapInfosFile);

  if (!mapData) {
    console.error('ERRO: Não foi possível ler o arquivo do mapa');
    process.exit(1);
  }

  // Get map name
  const mapInfo = mapInfos?.find(m => m?.id === mapIdNum);
  const mapName = mapInfo?.name || `Map ${mapIdNum}`;

  console.log(`📍 Map Name: ${mapName}\n`);

  // Initialize collections
  const analysis = {
    mapId: mapIdNum,
    mapName: mapName,
    variables: new Set(),
    switches: new Set(),
    commonEvents: new Set(),
    selfSwitches: new Set(),
    events: [],
    parallelProcesses: 0,
    autorunEvents: 0,
    playerTouchEvents: 0,
    eventTouchEvents: 0,
    actionButtonEvents: 0,
    complexMoveRoutes: 0
  };

  // Analyze events
  if (mapData.events) {
    mapData.events.forEach((event, index) => {
      if (!event) return;

      const eventInfo = {
        id: event.id,
        name: event.name,
        x: event.x,
        y: event.y,
        pages: [],
        selfSwitches: []
      };

      event.pages?.forEach((page, pageIndex) => {
        const pageInfo = {
          number: pageIndex + 1,
          trigger: ['unknown', 'action_button', 'player_touch', 'event_touch', 'autorun', 'parallel'][page.trigger || 0],
          conditions: {
            switch1: page.conditions?.switch1Id || null,
            switch2: page.conditions?.switch2Id || null,
            variable: page.conditions?.variableId || null,
            selfSwitch: page.conditions?.selfSwitchCh || null
          },
          moveRoute: page.moveRoute,
          listLength: page.list?.length || 0
        };

        // Count triggers
        switch (pageInfo.trigger) {
          case 'parallel':
            analysis.parallelProcesses++;
            break;
          case 'autorun':
            analysis.autorunEvents++;
            break;
          case 'player_touch':
            analysis.playerTouchEvents++;
            break;
          case 'event_touch':
            analysis.eventTouchEvents++;
            break;
          case 'action_button':
            analysis.actionButtonEvents++;
            break;
        }

        // Track condition switches/variables
        if (pageInfo.conditions.switch1) analysis.switches.add(pageInfo.conditions.switch1);
        if (pageInfo.conditions.switch2) analysis.switches.add(pageInfo.conditions.switch2);
        if (pageInfo.conditions.variable) analysis.variables.add(pageInfo.conditions.variable);

        // Track complex move routes
        if (page.moveRoute && page.moveRoute.list && page.moveRoute.list.length > 5) {
          analysis.complexMoveRoutes++;
        }

        eventInfo.pages.push(pageInfo);

        // Extract code from this page
        extractCodeFromEvent(event, analysis, 0);
      });

      analysis.events.push(eventInfo);
    });
  }

  // Output results as JSON
  const result = {
    mapId: mapIdNum,
    mapName: mapName,
    events: analysis.events,
    variables: Array.from(analysis.variables).sort((a, b) => a - b).map(id => ({
      id,
      name: getVariableName(id, systemData)
    })),
    switches: Array.from(analysis.switches).sort((a, b) => a - b).map(id => ({
      id,
      name: getSwitchName(id, systemData)
    })),
    commonEvents: Array.from(analysis.commonEvents).sort((a, b) => a - b).map(id => ({
      id,
      name: getCommonEventName(id, commonEvents)
    })),
    selfSwitches: Array.from(analysis.selfSwitches).sort(),
    performance: {
      parallelProcessCount: analysis.parallelProcesses,
      autorunEventCount: analysis.autorunEvents,
      complexMoveRouteCount: analysis.complexMoveRoutes,
      riskOfLag: analysis.parallelProcesses > 3 ? 'high' : analysis.parallelProcesses > 1 ? 'medium' : 'low'
    },
    triggerCounts: {
      actionButton: analysis.actionButtonEvents,
      playerTouch: analysis.playerTouchEvents,
      eventTouch: analysis.eventTouchEvents,
      autorun: analysis.autorunEvents,
      parallel: analysis.parallelProcesses
    },
    summary: {
      totalEvents: analysis.events.length,
      totalVariables: analysis.variables.size,
      totalSwitches: analysis.switches.size,
      totalCommonEvents: analysis.commonEvents.size,
      totalSelfSwitches: analysis.selfSwitches.size
    }
  };

  console.log(JSON.stringify(result, null, 2));

  // Print summary
  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║                         SUMMARY                                 ║`);
  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);
  console.log(`📊 Events: ${result.summary.totalEvents}`);
  console.log(`🔢 Variables: ${result.summary.totalVariables}`);
  console.log(`🔘 Switches: ${result.summary.totalSwitches}`);
  console.log(`⚡ Common Events: ${result.summary.totalCommonEvents}`);
  console.log(`🎯 Self-Switches: ${result.summary.totalSelfSwitches}`);
  console.log(`⚠️  Performance Risk: ${result.performance.riskOfLag}\n`);
}

// Run
analyzeMap();
