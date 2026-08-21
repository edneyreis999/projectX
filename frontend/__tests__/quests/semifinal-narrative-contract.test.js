/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../../..');
const FEATURE = path.join(ROOT, '.compozy/tasks/010-semifinal-completa');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function dialogueEntries(markdown) {
  const matches = [...markdown.matchAll(/^### ((?:DL|BR)-SEM-[A-Z0-9-]+)\n([\s\S]*?)(?=^### |^## |\Z)/gm)];
  return matches.map(match => ({ id: match[1], body: match[2] }));
}

describe('UT-002 — semifinal narrative profiles and dialogue authority', () => {
  let dialogue;
  let entries;

  beforeAll(() => {
    dialogue = read('docs/Quests/2-semifinal/semifinal.dialogos.md');
    entries = dialogueEntries(dialogue);
  });

  test('requires the approved Dragobur profile before final Dragobur copy', () => {
    const profilePath = 'docs/GDD/02_Atlas_Folk/02.2_Personagens/Dragobur.md';
    expect(fs.existsSync(path.join(ROOT, profilePath))).toBe(true);
    const profile = read(profilePath);
    expect(profile).toContain('status: 🟢 Aprovado');
    for (const heading of ['Papel e autoridade esportiva', 'Relações', 'Dignidade e registro cômico', 'Vocabulário', 'Padrões de fala']) {
      expect(profile).toContain(`## ${heading}`);
    }
    expect(dialogue.indexOf('Perfis: `Thorin.md`')).toBeLessThan(dialogue.indexOf('DL-SEM-ARRIVAL-DRAGOBUR-001'));
  });

  test('states Killin identity, rank, organization, and exclusive direct authority', () => {
    const profile = read('docs/GDD/02_Atlas_Folk/02.2_Personagens/Killin.md');
    expect(profile).toContain('uma mulher');
    expect(profile).toContain('Capitã da Guarda de Ferro');
    expect(profile).toContain('diretamente subordinada somente ao General [[Tordan|Thordan]]');
    expect(profile).toContain('responde somente ao General Thordan');
  });

  test('gives every stable speaker entry a sufficient profile resolution', () => {
    expect(entries.length).toBeGreaterThanOrEqual(25);
    expect(new Set(entries.map(entry => entry.id)).size).toBe(entries.length);
    for (const entry of entries) {
      expect(entry.body).toMatch(/- Speaker: `[^`]+`/);
      expect(entry.body).toMatch(/- Beat: /);
      expect(entry.body).toMatch(/- Intenção: /);
      expect(entry.body).toMatch(/- Fatos obrigatórios: /);
      expect(entry.body).toMatch(/- Cópia exata: “.+”/);
      expect(entry.body).toMatch(/- Target Gab anchor: `[^`]+`/);
      expect(entry.body).toMatch(/- Perfis fonte: /);
      const profileLine = entry.body.match(/- Perfis fonte: (.+)/)?.[1] ?? '';
      const refs = [...profileLine.matchAll(/`([^`]+)`/g)].map(match => match[1]);
      expect(refs.length).toBeGreaterThan(0);
      for (const ref of refs) {
        if (ref.startsWith('semifinal.dialogos.md#') || ref.startsWith('Map063 ')) continue;
        const filename = ref.split('#')[0];
        expect(fs.existsSync(path.join(ROOT, 'docs/GDD/02_Atlas_Folk/02.2_Personagens', filename))).toBe(true);
      }
    }
  });

  test('preserves mandatory exact copy, causal facts, branches, and canonical display names', () => {
    expect(dialogue).toContain('“Você não tem nenhuma decência?! Saia já daqui, seu miserável!”');
    for (const id of [
      'DL-SEM-URGENT-THORIN-001',
      'DL-SEM-MATCH-RHEED-LOSING-001',
      'DL-SEM-MATCH-RHEED-ENTRY-001',
      'DL-SEM-MATCH-RHEED-GOAL-001',
      'DL-SEM-MATCH-RHEED-VICTORY-001',
      'DL-SEM-GIFT-DRAGOBUR-001',
      'DL-SEM-GUARD-FILENA-001',
      'DL-SEM-ORDER-KILLIN-001',
      'BR-SEM-THORIN-GENTLE',
      'BR-SEM-THORIN-RESIST',
      'DL-SEM-ESCORT-KILLIN-001',
      'DL-SEM-HOME-THORIN-001',
    ]) expect(entries.some(entry => entry.id === id)).toBe(true);
    expect(dialogue).toContain('Thordan');
    expect(dialogue).toContain('Dragobur');
    expect(dialogue).toContain('Killin');
    const activeCopyAndFacts = entries.flatMap(entry => entry.body.split('\n').filter(line => line.startsWith('- Cópia exata:') || line.startsWith('- Fatos obrigatórios:'))).join('\n');
    expect(activeCopyAndFacts).not.toMatch(/\b(?:Tordan|Dragobour|Kilin|Tharok)\b/);
  });

  test('records exact sources and reconciles the current narrative flow', () => {
    for (let index = 1; index <= 11; index += 1) expect(dialogue).toContain(`adr-${String(index).padStart(3, '0')}-`);
    for (const source of [
      'Core _Concept.md',
      'Core _Concept_Comercial.md',
      'Foundation_Details.md',
      'Tone_Vibe.md',
      'grill-me-with-docs-2026-08-19.md',
      'direcao-arte-cutscenes-semifinal-2026-08-19.md',
    ]) expect(dialogue).toContain(source);
    const flow = read('docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md');
    expect(flow).toContain('Autoridade atual:');
    expect(flow).toContain('#### Cena 7 – Elipse Narrada da Virada');
    expect(flow).toContain('#### Cena 8 – Celebração Interrompida');
    expect(flow).toContain('#### Cena 9 – Escolta e Handoff Exterior');
    expect(flow).not.toContain('**Tutorial**');
    expect(flow).not.toContain('câmera gira 360°');
  });

  test('implements typed normalization fixtures and protects stable identities', () => {
    const fixtures = JSON.parse(read('.compozy/tasks/010-semifinal-completa/fixtures/narrative/writer-cases.json'));
    const modulePath = path.join(FEATURE, 'scripts/lib/semifinal-narrative.mjs');
    const normalized = JSON.parse(execFileSync(process.execPath, [
      '--input-type=module',
      '-e',
      `import { normalizeNarrativeMarkdown } from ${JSON.stringify(modulePath)}; const fixtures = JSON.parse(process.argv[1]); process.stdout.write(JSON.stringify(fixtures.map(item => normalizeNarrativeMarkdown(item.input))));`,
      JSON.stringify(fixtures.normalization),
    ], { encoding: 'utf8' }));
    expect(normalized).toEqual(fixtures.normalization.map(fixture => fixture.expected));
    const inventory = JSON.parse(read('.compozy/tasks/010-semifinal-completa/fixtures/narrative/name-occurrences.json'));
    expect(inventory.schema_version).toBe('semifinal-name-inventory/v1');
    expect(inventory.occurrences.length).toBeGreaterThan(0);
    expect(inventory.occurrences.every(item => item.classification && item.action)).toBe(true);
    expect(inventory.occurrences.some(item => item.path.endsWith('/Tordan.md') && item.classification === 'filename_path_link')).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'docs/GDD/02_Atlas_Folk/02.2_Personagens/Tordan.md'))).toBe(true);
  });
});

describe('Narrative writer contract', () => {
  const writer = path.join(FEATURE, 'scripts/apply-semifinal-narrative.mjs');

  test('matches the frozen check contract and is an applied semantic no-op', () => {
    const check = JSON.parse(execFileSync(process.execPath, [writer, '--check'], { cwd: ROOT, encoding: 'utf8' }));
    expect(check).toEqual({ status: 'ready', feature: '010-semifinal-completa', writer: 'narrative-designer', writes: 0 });
    const apply = JSON.parse(execFileSync(process.execPath, [writer], { cwd: ROOT, encoding: 'utf8' }));
    expect(apply).toEqual({ status: 'applied', feature: '010-semifinal-completa', writer: 'narrative-designer', changed_files: 0 });
  });

  test('fails before writes on an invalid public argument', () => {
    const protectedPaths = [
      'docs/GDD/02_Atlas_Folk/02.2_Personagens/Dragobur.md',
      'docs/Quests/2-semifinal/semifinal.dialogos.md',
      'frontend/data/Map063.json',
    ];
    const before = protectedPaths.map(read);
    const result = require('child_process').spawnSync(process.execPath, [writer, '--force'], { cwd: ROOT, encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout)).toMatchObject({ status: 'blocked', code: 'precondition_mismatch', writer: 'narrative-designer' });
    expect(protectedPaths.map(read)).toEqual(before);
  });

  test('plans only narrative-owned files', () => {
    const code = `import { planNarrativeChanges } from ${JSON.stringify(path.join(FEATURE, 'scripts/lib/semifinal-narrative.mjs'))}; process.stdout.write(JSON.stringify(planNarrativeChanges(process.argv[1]).map(item => item.path)));`;
    const planned = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', code, ROOT], { encoding: 'utf8' }));
    expect(planned).toEqual([]);
    expect(planned.some(file => file.startsWith('frontend/data/') || file === 'frontend/js/plugins.js' || file.endsWith('.audio.md') || file.endsWith('.cutscene.md'))).toBe(false);
  });
});
