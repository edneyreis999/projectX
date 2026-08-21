/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return new Map();
  return new Map(
    match[1].split('\n').map(line => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );
}

function headingIds(markdown, pattern) {
  return [...markdown.matchAll(new RegExp(`^### (${pattern})\\b`, 'gm'))].map(match => match[1]);
}

function tableCells(line) {
  return line
    .split('|')
    .slice(1, -1)
    .map(cell => cell.trim());
}

describe('UT-001 — semifinal discipline source contracts', () => {
  const paths = {
    dialogue: 'docs/Quests/2-semifinal/semifinal.dialogos.md',
    audio: 'docs/Quests/2-semifinal/semifinal.audio.md',
    cutscene: 'docs/Quests/2-semifinal/semifinal.cutscene.md',
  };
  let documents;

  beforeAll(() => {
    for (const relativePath of Object.values(paths)) expect(fs.existsSync(path.join(ROOT, relativePath))).toBe(true);
    documents = Object.fromEntries(Object.entries(paths).map(([name, relativePath]) => [name, read(relativePath)]));
  });

  test('requires approved role ownership, sources, conflicts, boundaries, and human criteria', () => {
    const expectedOwners = {
      dialogue: 'Narrative Designer',
      audio: 'Audio Designer',
      cutscene: 'Scene Presentation Designer',
    };
    for (const [name, markdown] of Object.entries(documents)) {
      const metadata = frontmatter(markdown);
      expect(metadata.get('status')).toBe('approved');
      expect(metadata.get('owner')).toBe(expectedOwners[name]);
      expect(markdown).toMatch(/^## (?:Fontes consultadas|Autoridade, finalidade e fronteiras|Autoridade e fronteiras)/m);
      expect(markdown).toContain('## Conflitos resolvidos');
      expect(markdown).toMatch(/## .*fronteir/i);
      expect(markdown).toMatch(/## Crit[eé]rios humanos|## Crit[eé]rios humanos pendentes/i);
      expect(markdown).toMatch(/Gameplay Engineering/);
      expect(markdown).toMatch(/pending|pendente/i);
    }
  });

  test('requires unique attributable semantic IDs across the three namespaces', () => {
    const dialogueIds = headingIds(documents.dialogue, '(?:DL|BR)-SEM-[A-Z0-9-]+');
    const cueIds = headingIds(documents.audio, 'CUE-SEM-[A-Z0-9-]+');
    const cutsceneIds = headingIds(documents.cutscene, 'CS-SEM-[A-Z0-9-]+');
    const beatIds = [...documents.cutscene.matchAll(/^\| `(BT-SEM-[A-Z0-9-]+)` \|/gm)].map(match => match[1]);
    const awaitIds = [...documents.cutscene.matchAll(/WaitForGab: (AW-SEM-[A-Z0-9-]+)/g)].map(match => match[1]);

    for (const ids of [dialogueIds, cueIds, cutsceneIds, beatIds, awaitIds]) {
      expect(ids.length).toBeGreaterThan(0);
      expect(new Set(ids).size).toBe(ids.length);
    }
    const allIds = [...dialogueIds, ...cueIds, ...cutsceneIds, ...beatIds, ...awaitIds];
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  test('maps every approved dialogue, branch, and cue ID into the cutscene score', () => {
    const sourceIds = [...headingIds(documents.dialogue, '(?:DL|BR)-SEM-[A-Z0-9-]+'), ...headingIds(documents.audio, 'CUE-SEM-[A-Z0-9-]+')];
    for (const id of sourceIds) expect(documents.cutscene).toContain(`\`${id}\``);
  });

  test('gives every score row the complete beat-level presentation schema', () => {
    const expectedHeader = ['Beat', 'Mapa/evento', 'Participantes, posição e facing', 'Lock', 'Diálogo', 'Movimento/animação', 'Câmera/zoom', 'Áudio', 'Await', 'Cleanup', 'Terminal/recovery'];
    const tableHeaders = documents.cutscene.split('\n').filter(line => JSON.stringify(tableCells(line)) === JSON.stringify(expectedHeader));
    expect(tableHeaders.length).toBeGreaterThanOrEqual(9);

    const rows = documents.cutscene.split('\n').filter(line => /^\| `BT-SEM-/.test(line));
    expect(rows.length).toBeGreaterThanOrEqual(25);
    for (const row of rows) {
      expect(row.split('|')).toHaveLength(13);
      expect(row).toMatch(/Map0(?:44|61|62|63|64) E\d+/);
      expect(row).toMatch(/lock/i);
      expect(row).toMatch(/zoom/i);
      expect(row.split('|')[11].trim().length).toBeGreaterThan(0);
    }
  });

  test('declares only named semantic WaitForGab barriers and complete EX/VN review', () => {
    const waitMentions = documents.cutscene.split('\n').filter(line => line.includes('WaitForGab:'));
    expect(waitMentions.length).toBeGreaterThanOrEqual(10);
    for (const line of waitMentions) expect(line).toMatch(/WaitForGab: AW-SEM-[A-Z0-9-]+/);
    expect(documents.cutscene).toContain('## Matriz de routing EX versus VN');
    for (const cutsceneId of headingIds(documents.cutscene, 'CS-SEM-[A-Z0-9-]+')) {
      expect(documents.cutscene).toMatch(new RegExp('\\|\\s*`' + cutsceneId + '`\\s*\\|'));
    }
    expect(documents.cutscene).toContain('blanket waits');
    expect(documents.cutscene).toContain('scene-routing-ex-vn.md');
  });

  test('protects ordering, choice convergence, assets, and discipline ownership', () => {
    const order = [
      'BT-SEM-CELEBRATION-COLLECTIVE-001',
      'BT-SEM-CELEBRATION-GIFT-001',
      'BT-SEM-GUARD-RECOGNITION-001',
      'BT-SEM-FILENA-DISCOMFORT-001',
      'BT-SEM-KILLIN-ORDER-001',
      'BT-SEM-ESCORT-CONVERGENCE-001',
      'BT-SEM-ESCORT-TRANSFER-001',
    ];
    for (let index = 1; index < order.length; index += 1) {
      expect(documents.cutscene.indexOf(order[index - 1])).toBeLessThan(documents.cutscene.indexOf(order[index]));
    }
    expect(documents.cutscene).toContain('BT-SEM-CHOICE-GENTLE-001');
    expect(documents.cutscene).toContain('BT-SEM-CHOICE-RESIST-001');
    expect(documents.cutscene).toContain('um único ciclo');
    expect(documents.cutscene).toContain('sem nova alteração de inventário');
    expect(documents.cutscene).toContain('Nenhum asset novo bloqueia o MVP');
    expect(documents.cutscene).toContain('Animation 35 possui `Blind` e `Sand`');
    expect(documents.cutscene).toContain('Animation 39 possui `Thunder2`, `Thunder8` e `Blow3`');
  });
});
