/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '../../..');
const MODULE = pathToFileURL(path.join(ROOT, 'docs/Quests/2-semifinal/tooling/lib/semifinal-narrative-contracts.mjs')).href;
const PATHS = {
  dialogue: 'docs/Quests/2-semifinal/semifinal.dialogos.md',
  flow: 'docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md',
  audio: 'docs/Quests/2-semifinal/semifinal.audio.md',
  cutscene: 'docs/Quests/2-semifinal/semifinal.cutscene.md',
};

function readContracts() {
  return Object.fromEntries(Object.entries(PATHS).map(([name, relativePath]) => [name, fs.readFileSync(path.join(ROOT, relativePath), 'utf8')]));
}

function invoke(exportName, value) {
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import * as subject from ${JSON.stringify(MODULE)};
       try { console.log(JSON.stringify({ok:true,value:subject[process.argv[1]](JSON.parse(process.argv[2]))})); }
       catch (error) { console.log(JSON.stringify({ok:false,error:{code:error.code,anchor:error.anchor}})); }`,
      exportName,
      JSON.stringify(value),
    ],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 },
  );
  expect(result.status).toBe(0);
  return JSON.parse(result.stdout);
}

function validateNarrativeContracts(contracts) {
  return invoke('validateNarrativeContracts', contracts);
}

describe('Semifinal narrative contracts', () => {
  test('accepts the approved contracts and reports their semantic namespaces', () => {
    const result = validateNarrativeContracts(readContracts()).value;
    expect(result.status).toBe('valid');
    expect(result.ids).toMatchObject({ dialogue: expect.any(Number), vn: expect.any(Number), cutscene: expect.any(Number) });
    expect([result.ids.dialogue, result.ids.vn, result.ids.cutscene].every(count => count > 0)).toBe(true);
  });

  test('rejects duplicate semantic IDs', () => {
    const contracts = readContracts();
    contracts.dialogue += '\n### `DL-SEM-URGENT-THORIN-001`\n';
    expect(validateNarrativeContracts(contracts)).toMatchObject({ ok: false, error: { code: 'narrative_contract_mismatch' } });
  });

  test('rejects a missing state-machine handoff', () => {
    const contracts = readContracts();
    contracts.flow = contracts.flow.replaceAll('SEMIFINAL_GUARD_INTERVENTION', 'REMOVED_GUARD_INTERVENTION');
    expect(validateNarrativeContracts(contracts)).toMatchObject({ ok: false, error: { code: 'narrative_contract_mismatch' } });
  });

  test('rejects runtime copy that is absent from the approved dialogue contract', () => {
    const dialogue = readContracts().dialogue;
    const approvedVnTexts = [...dialogue.matchAll(/^\|\s*`VN-SEM-[A-Z0-9-]+`\s*\|[^|\n]*\|\s*“([^”\n]+)”\s*\|\s*$/gm)].map(match => match[1]);
    expect(invoke('validateMaterializedDialogue', { dialogue, runtimeTexts: approvedVnTexts }).ok).toBe(true);
    expect(invoke('validateMaterializedDialogue', { dialogue, runtimeTexts: [...approvedVnTexts, 'Copy stale que não foi aprovada'] })).toMatchObject({
      ok: false,
      error: { code: 'narrative_contract_mismatch', anchor: expect.stringContaining('runtime-dialogue:stale') },
    });
  });

  test('keeps the approved cutscene score identifiers', () => {
    const { cutscene } = readContracts();
    const scoreIds = [...cutscene.matchAll(/^### (CS-SEM-[A-Z0-9-]+)/gm)].map(match => match[1]);
    expect(scoreIds.length).toBeGreaterThanOrEqual(10);
    expect(new Set(scoreIds).size).toBe(scoreIds.length);
  });
});
