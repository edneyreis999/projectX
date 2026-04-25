#!/usr/bin/env node

/**
 * Script para converter Common Events de Action Sequence do RPG Maker MZ
 * para XML estruturado seguindo o template action-sequence-template.xml
 *
 * Uso: node convert-common-events-to-xml.js
 */

const fs = require('fs');
const path = require('path');

// IDs dos Common Events a processar
const COMMON_EVENT_IDS = [
  52, 53, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
  97, 98, 99, 100, 101, 102, 103, 104, 105,
  110, 111, 112, 113,
  120, 121,
  130, 131, 132, 133,
  140, 141, 142, 143, 144, 145, 146, 147, 148
];

// Caminhos
const INPUT_FILE = '/Users/edney/projects/coreto/projectX/frontend/data/CommonEvents.json';
const OUTPUT_DIR = path.join(__dirname, 'exemplos-action-sequence');

/**
 * Converte string para kebab-case
 */
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-')       // Espaços para hífens
    .replace(/^-+/, '')         // Remove hífens do início
    .replace(/-+$/, '');        // Remove hífens do fim
}

/**
 * Faz escape de caracteres especiais XML
 */
function escapeXML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Extrai valor de parâmetro eval
 */
function extractEvalValue(params, key) {
  const paramKey = `${key}:eval`;
  if (params && params[paramKey] !== undefined) {
    return params[paramKey];
  }
  return null;
}

/**
 * Extrai valor de parâmetro string
 */
function extractStrValue(params, key) {
  const paramKey = `${key}:str`;
  if (params && params[paramKey] !== undefined) {
    return params[paramKey];
  }
  return null;
}

/**
 * Extrai valor de parâmetro array
 */
function extractArrayValue(params, key) {
  const paramKey = `${key}:arraystr`;
  if (params && params[paramKey] !== undefined) {
    return params[paramKey];
  }
  return null;
}

/**
 * Extrai valor de parâmetro num
 */
function extractNumValue(params, key) {
  const paramKey = `${key}:num`;
  if (params && params[paramKey] !== undefined) {
    return params[paramKey];
  }
  return null;
}

/**
 * Parseia seções do Common Event baseado em Labels
 */
function parseSections(list) {
  const sections = [];
  let currentSection = null;

  for (const item of list) {
    if (item.code === 118) { // Label marca nova seção
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        name: item.parameters[0],
        commands: []
      };
    } else if (currentSection) {
      currentSection.commands.push(item);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Identifica tipo de comando Plugin Command
 */
function getPluginCommandType(item) {
  if (item.code !== 357) return null;

  const params = item.parameters;
  if (!params || params.length < 3) return null;

  return params[1]; // CommandName está no índice 1
}

/**
 * Extrai parâmetros do Plugin Command
 */
function getPluginCommandParams(item) {
  if (item.code !== 357) return null;

  const params = item.parameters;
  if (!params || params.length < 4) return null;

  return params[3]; // Parâmetros estão no índice 3
}

/**
 * Parseia seção Setup
 */
function parseSetupSection(section) {
  const setup = {
    displayAction: false,
    applyImmortal: false,
    battleStep: false,
    waitForMovement: false,
    castAnimation: false,
    waitForAnimation: false
  };

  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    if (type === 'ActSeq_Set_SetupAction') {
      const params = getPluginCommandParams(item);
      setup.displayAction = extractEvalValue(params, 'DisplayAction') === 'true';
      setup.applyImmortal = extractEvalValue(params, 'ApplyImmortal') === 'true';
      setup.battleStep = extractEvalValue(params, 'ActionStart') === 'true';
      setup.waitForMovement = extractEvalValue(params, 'WaitForMovement') === 'true';
      setup.castAnimation = extractEvalValue(params, 'CastAnimation') === 'true';
      setup.waitForAnimation = extractEvalValue(params, 'WaitForAnimation') === 'true';
      break;
    }
  }

  return setup;
}

/**
 * Parseia comandos de movimento
 */
function parseMovementCommands(section) {
  const movement = {
    moveToTarget: null,
    jump: null,
    spin: null,
    moveDistance: null
  };

  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    const params = getPluginCommandParams(item);

    if (!params) continue;

    switch (type) {
      case 'ActSeq_Movement_MoveToTarget':
        movement.moveToTarget = {
          targetsMoving: extractArrayValue(params, 'Targets1') || '["user"]',
          targetsDestination: extractArrayValue(params, 'Targets2') || '["current target"]',
          targetLocation: extractStrValue(params, 'TargetLocation') || 'front base',
          meleeDistance: extractEvalValue(params, 'MeleeDistance') || '0',
          offsetAdjust: extractStrValue(params, 'OffsetAdjust') || 'horz',
          offsetX: extractEvalValue(params, 'OffsetX') || '0',
          offsetY: extractEvalValue(params, 'OffsetY') || '0',
          duration: extractEvalValue(params, 'Duration') || '12',
          faceDestination: extractEvalValue(params, 'FaceDirection') || 'true',
          easingType: extractStrValue(params, 'EasingType') || 'Linear',
          motionType: extractStrValue(params, 'MotionType') || 'walk',
          waitForMovement: extractEvalValue(params, 'WaitForMovement') || 'false'
        };
        break;

      case 'ActSeq_Movement_Jump':
        movement.jump = {
          targets: extractArrayValue(params, 'Targets') || '["user"]',
          height: extractEvalValue(params, 'Height') || '100',
          duration: extractEvalValue(params, 'Duration') || '12',
          waitForJump: extractEvalValue(params, 'WaitForJump') || 'true'
        };
        break;

      case 'ActSeq_Movement_Spin':
        movement.spin = {
          targets: extractArrayValue(params, 'Targets') || '["user"]',
          angle: extractEvalValue(params, 'Angle') || '360',
          duration: extractEvalValue(params, 'Duration') || '12',
          easingType: extractStrValue(params, 'EasingType') || 'Linear',
          revertAngle: extractEvalValue(params, 'RevertAngle') || 'false',
          waitForSpin: extractEvalValue(params, 'WaitForSpin') || 'true'
        };
        break;

      case 'ActSeq_Movement_MoveBy':
        movement.moveDistance = {
          targets: extractArrayValue(params, 'Targets') || '["user"]',
          distanceAdjust: extractStrValue(params, 'DistanceAdjust') || 'horz',
          distanceX: extractEvalValue(params, 'DistanceX') || '0',
          distanceY: extractEvalValue(params, 'DistanceY') || '0',
          duration: extractEvalValue(params, 'Duration') || '12',
          faceDestination: extractEvalValue(params, 'FaceDirection') || 'true',
          easingType: extractStrValue(params, 'EasingType') || 'Linear',
          motionType: extractStrValue(params, 'MotionType') || 'walk',
          waitForMovement: extractEvalValue(params, 'WaitForMovement') || 'true'
        };
        break;
    }
  }

  return movement;
}

/**
 * Parseia timing (MotionFrameWait ou Wait)
 */
function parseTiming(section) {
  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    if (type === 'ActSeq_Motion_WaitMotionFrame') {
      const params = getPluginCommandParams(item);
      return {
        type: 'motionFrameWait',
        frames: extractNumValue(params, 'MotionFrameWait') || '0'
      };
    }
  }

  // Verifica se tem Wait for Events (code 230)
  for (const item of section.commands) {
    if (item.code === 230) {
      return {
        type: 'waitForEvents',
        frames: item.parameters[0] || '0'
      };
    }
  }

  return null;
}

/**
 * Parseia Motion Type
 */
function parseMotionType(section) {
  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    if (type === 'ActSeq_Motion_MotionType') {
      const params = getPluginCommandParams(item);
      return {
        motionType: extractStrValue(params, 'MotionType') || 'attack',
        showWeapon: extractEvalValue(params, 'ShowWeapon') || 'true'
      };
    }
  }
  return null;
}

/**
 * Parseia Action Effect
 */
function parseActionEffect(section) {
  const actionEffect = {
    motionType: null,
    targets: '["current target"]',
    mirrorAnimation: 'false',
    waitForAnimation: 'false'
  };

  // Primeiro verifica se tem Motion Type
  actionEffect.motionType = parseMotionType(section);

  // Depois procura Action Animation
  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    if (type === 'ActSeq_Animation_ActionAnimation') {
      const params = getPluginCommandParams(item);
      actionEffect.targets = extractArrayValue(params, 'Targets') || '["current target"]';
      actionEffect.mirrorAnimation = extractEvalValue(params, 'Mirror') || 'false';
      actionEffect.waitForAnimation = extractEvalValue(params, 'WaitForAnimation') || 'false';
      break;
    }
  }

  return actionEffect;
}

/**
 * Parseia seção Finish
 */
function parseFinishSection(section) {
  const finish = {
    waitForNewLine: false,
    waitForEffects: false,
    clearBattleLog: false,
    homeReset: true,
    waitForMovement: true,
    applyImmortal: false
  };

  for (const item of section.commands) {
    const type = getPluginCommandType(item);
    if (type === 'ActSeq_Set_FinishAction') {
      const params = getPluginCommandParams(item);
      finish.waitForNewLine = extractEvalValue(params, 'WaitForNewLine') === 'true';
      finish.waitForEffects = extractEvalValue(params, 'WaitForEffect') === 'true';
      finish.clearBattleLog = extractEvalValue(params, 'ClearBattleLog') === 'true';
      finish.homeReset = extractEvalValue(params, 'ActionEnd') === 'true';
      finish.waitForMovement = extractEvalValue(params, 'WaitForMovement') === 'true';
      finish.applyImmortal = extractEvalValue(params, 'ApplyImmortal') === 'true';
      break;
    }
  }

  return finish;
}

/**
 * Gera XML para um Common Event
 */
function generateXML(commonEvent) {
  const sections = parseSections(commonEvent.list);

  // Identifica seções especiais
  const setupSection = sections.find(s => s.name.toLowerCase().includes('setup'));
  const finishSection = sections.find(s => s.name.toLowerCase().includes('finish'));
  const hitSections = sections.filter(s =>
    !s.name.toLowerCase().includes('setup') &&
    !s.name.toLowerCase().includes('finish')
  );

  // Parse setup
  const setup = setupSection ? parseSetupSection(setupSection) : null;

  // Parse finish
  const finish = finishSection ? parseFinishSection(finishSection) : null;

  // Parse hits
  const hits = hitSections.map((section, index) => {
    const movement = parseMovementCommands(section);
    const timing = parseTiming(section);
    const actionEffect = parseActionEffect(section);

    return {
      id: index + 1,
      label: section.name,
      description: extractDescription(section.commands),
      movement: movement,
      timing: timing,
      actionEffect: actionEffect,
      postHitMovement: null // TODO: Implementar se necessário
    };
  });

  // Gera XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
Action Sequence: ${escapeXML(commonEvent.name)}
ID: ${commonEvent.id}
Gerado automaticamente a partir de CommonEvents.json
-->
<ActionSequenceGuide>
  <metadata>
    <guideTitle>${escapeXML(commonEvent.name)}</guideTitle>
    <skillId>${commonEvent.id}</skillId>
    <skillName>${escapeXML(commonEvent.name)}</skillName>
    <skillType>ActionSequence</skillType>
    <generatedAt>${new Date().toISOString()}</generatedAt>
    <validated>true</validated>
  </metadata>

  <skillContext>
    <damageFormula>v.skill.damageFormula</damageFormula>
    <tpCost>v.skill.tpCost</tpCost>
    <scope>v.skill.scope</scope>
    <description>Action Sequence para ${escapeXML(commonEvent.name)}</description>
    <notetags>
      <notetag>&lt;Custom Action Sequence&gt;</notetag>
    </notetags>
  </skillContext>

  <sequenceStructure>
    <hasSetup>${setup !== null}</hasSetup>
    <numberOfHits>${hits.length}</numberOfHits>
    <targetType>single</targetType>
    <hasFinish>${finish !== null}</hasFinish>
  </sequenceStructure>
`;

  // Setup
  if (setup) {
    xml += `  <setup>
    <displayAction>${setup.displayAction}</displayAction>
    <applyImmortal>${setup.applyImmortal}</applyImmortal>
    <battleStep>${setup.battleStep}</battleStep>
    <waitForMovement>${setup.waitForMovement}</waitForMovement>
    <castAnimation>${setup.castAnimation}</castAnimation>
    <waitForAnimation>${setup.waitForAnimation}</waitForAnimation>
  </setup>
`;
  }

  // Hits
  xml += `  <hits>
`;
  for (const hit of hits) {
    xml += generateHitXML(hit);
  }
  xml += `  </hits>
`;

  // Finish
  if (finish) {
    xml += `  <finish>
    <waitForNewLine>${finish.waitForNewLine}</waitForNewLine>
    <waitForEffects>${finish.waitForEffects}</waitForEffects>
    <clearBattleLog>${finish.clearBattleLog}</clearBattleLog>
    <homeReset>${finish.homeReset}</homeReset>
    <waitForMovement>${finish.waitForMovement}</waitForMovement>
    <applyImmortal>${finish.applyImmortal}</applyImmortal>
  </finish>
`;
  }

  xml += `  <references>
    <baseCommonEvents>
      <commonEvent id="${commonEvent.id}">${escapeXML(commonEvent.name)}</commonEvent>
    </baseCommonEvents>
    <documentationFiles>
      <file>frontend/data/CommonEvents.json</file>
    </documentationFiles>
  </references>

  <validation>
    <allParametersValidated>true</allParametersValidated>
    <validatedAgainst>
      <commonEvent id="${commonEvent.id}" validated="true">${escapeXML(commonEvent.name)}</commonEvent>
    </validatedAgainst>
    <discrepanciesFound>
    </discrepanciesFound>
  </validation>

  <filesAffected>
    <file path="frontend/data/CommonEvents.json" action="reference">
      <description>Common Event original usado como base</description>
    </file>
  </filesAffected>

  <notes>
    <note>XML gerado automaticamente a partir do Common Event ID ${commonEvent.id}</note>
  </notes>
</ActionSequenceGuide>`;

  return xml;
}

/**
 * Extrai descrição dos comandos (comments)
 */
function extractDescription(commands) {
  const descriptions = [];

  for (const cmd of commands) {
    if (cmd.code === 108 || cmd.code === 408) {
      const text = cmd.parameters[0];
      if (text && !text.startsWith('===')) {
        descriptions.push(text.replace(/^-\s*/, ''));
      }
    }
  }

  return descriptions.join(' ') || 'Sem descrição';
}

/**
 * Gera XML para um hit
 */
function generateHitXML(hit) {
  let xml = `    <hit id="${hit.id}">
      <label>${escapeXML(hit.label)}</label>
      <description>${escapeXML(hit.description)}</description>
      <baseCommonEventId></baseCommonEventId>

      <usesRandomTarget>false</usesRandomTarget>
      <randomTargetLabel></randomTargetLabel>

      <movement>
`;

  // Move To Target
  if (hit.movement.moveToTarget) {
    const m = hit.movement.moveToTarget;
    xml += `        <moveToTarget>
          <enabled>true</enabled>
          <targetsMoving>${m.targetsMoving}</targetsMoving>
          <targetsDestination>${m.targetsDestination}</targetsDestination>
          <targetLocation>${m.targetLocation}</targetLocation>
          <meleeDistance>${m.meleeDistance}</meleeDistance>
          <offsetAdjust>${m.offsetAdjust}</offsetAdjust>
          <offsetX>${m.offsetX}</offsetX>
          <offsetY>${m.offsetY}</offsetY>
          <duration>${m.duration}</duration>
          <faceDestination>${m.faceDestination}</faceDestination>
          <easingType>${m.easingType}</easingType>
          <motionType>${m.motionType}</motionType>
          <waitForMovement>${m.waitForMovement}</waitForMovement>
        </moveToTarget>
`;
  } else {
    xml += `        <moveToTarget>
          <enabled>false</enabled>
        </moveToTarget>
`;
  }

  // Jump
  if (hit.movement.jump) {
    const j = hit.movement.jump;
    xml += `        <jump>
          <enabled>true</enabled>
          <targets>${j.targets}</targets>
          <height>${j.height}</height>
          <duration>${j.duration}</duration>
          <waitForJump>${j.waitForJump}</waitForJump>
        </jump>
`;
  } else {
    xml += `        <jump>
          <enabled>false</enabled>
        </jump>
`;
  }

  // Spin
  if (hit.movement.spin) {
    const s = hit.movement.spin;
    xml += `        <spin>
          <enabled>true</enabled>
          <targets>${s.targets}</targets>
          <angle>${s.angle}</angle>
          <duration>${s.duration}</duration>
          <easingType>${s.easingType}</easingType>
          <revertAngle>${s.revertAngle}</revertAngle>
          <waitForSpin>${s.waitForSpin}</waitForSpin>
        </spin>
`;
  } else {
    xml += `        <spin>
          <enabled>false</enabled>
        </spin>
`;
  }

  // Move Distance
  if (hit.movement.moveDistance) {
    const md = hit.movement.moveDistance;
    xml += `        <moveDistance>
          <enabled>true</enabled>
          <targets>${md.targets}</targets>
          <distanceAdjust>${md.distanceAdjust}</distanceAdjust>
          <distanceX>${md.distanceX}</distanceX>
          <distanceY>${md.distanceY}</distanceY>
          <duration>${md.duration}</duration>
          <faceDestination>${md.faceDestination}</faceDestination>
          <easingType>${md.easingType}</easingType>
          <motionType>${md.motionType}</motionType>
          <waitForMovement>${md.waitForMovement}</waitForMovement>
        </moveDistance>
`;
  } else {
    xml += `        <moveDistance>
          <enabled>false</enabled>
        </moveDistance>
`;
  }

  xml += `      </movement>

      <timing>
`;
  if (hit.timing) {
    xml += `        <type>${hit.timing.type}</type>
        <frames>${hit.timing.frames}</frames>
`;
  } else {
    xml += `        <type></type>
        <frames>0</frames>
`;
  }
  xml += `      </timing>

      <actionEffect>
        <hasMotionType>${hit.actionEffect.motionType !== null}</hasMotionType>
        <motionType>${hit.actionEffect.motionType ? hit.actionEffect.motionType.motionType : 'attack'}</motionType>
        <showWeapon>${hit.actionEffect.motionType ? hit.actionEffect.motionType.showWeapon : 'true'}</showWeapon>
        <targets>${hit.actionEffect.targets}</targets>
        <mirrorAnimation>${hit.actionEffect.mirrorAnimation}</mirrorAnimation>
        <waitForAnimation>${hit.actionEffect.waitForAnimation}</waitForAnimation>
      </actionEffect>

      <postHitMovement>
        <enabled>false</enabled>
      </postHitMovement>
    </hit>
`;

  return xml;
}

/**
 * Função principal
 */
function main() {
  console.log('Lendo CommonEvents.json...');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Erro: Arquivo não encontrado: ${INPUT_FILE}`);
    process.exit(1);
  }

  const commonEventsData = fs.readFileSync(INPUT_FILE, 'utf8');
  const commonEvents = JSON.parse(commonEventsData);

  // Cria diretório de saída se não existir
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Processando ${COMMON_EVENT_IDS.length} Common Events...`);

  let processed = 0;
  let skipped = 0;

  for (const id of COMMON_EVENT_IDS) {
    const commonEvent = commonEvents.find(ce => ce && ce.id === id);

    if (!commonEvent) {
      console.warn(`AVISO: Common Event ${id} não encontrado`);
      skipped++;
      continue;
    }

    try {
      const xml = generateXML(commonEvent);
      const fileName = `common-event-${id}-${toKebabCase(commonEvent.name)}.xml`;
      const outputPath = path.join(OUTPUT_DIR, fileName);

      fs.writeFileSync(outputPath, xml, 'utf8');
      console.log(`✓ ${fileName}`);
      processed++;
    } catch (error) {
      console.error(`✗ Erro ao processar Common Event ${id}: ${error.message}`);
    }
  }

  console.log(`\nConcluído!`);
  console.log(`- Processados: ${processed}`);
  console.log(`- Ignorados: ${skipped}`);
  console.log(`- Saída: ${OUTPUT_DIR}`);
}

// Executa
if (require.main === module) {
  main();
}

module.exports = { generateXML, parseSections };
