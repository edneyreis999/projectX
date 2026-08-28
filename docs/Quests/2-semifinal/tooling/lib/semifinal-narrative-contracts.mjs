function ids(source, pattern) {
  return [...source.matchAll(pattern)].map(match => match[1]);
}

function mismatch(anchor) {
  const error = new Error('narrative_contract_mismatch');
  error.code = 'narrative_contract_mismatch';
  error.anchor = anchor;
  return error;
}

function assertUnique(values, namespace, required = true) {
  if ((required && values.length === 0) || new Set(values).size !== values.length) throw mismatch(`${namespace}:stable-ids`);
}

export function validateNarrativeContracts({ dialogue, flow, audio, cutscene }) {
  const dialogueIds = ids(dialogue, /^### `((?:DL|BR)-SEM-[A-Z0-9-]+)`/gm);
  const vnIds = ids(dialogue, /^\| `(VN-SEM-[A-Z0-9-]+)`/gm);
  const cueIds = ids(audio, /^### `(CUE-SEM-[A-Z0-9-]+)`/gm);
  const cutsceneIds = ids(cutscene, /^### (CS-SEM-[A-Z0-9-]+)/gm);
  const awaitIds = ids(cutscene, /WaitForGab: (AW-SEM-[A-Z0-9-]+)/g);

  for (const [namespace, values, required = true] of [
    ['dialogue', dialogueIds],
    ['vn', vnIds],
    ['audio', cueIds, false],
    ['cutscene', cutsceneIds],
    ['await', awaitIds, false],
  ]) {
    assertUnique(values, namespace, required);
  }

  assertUnique([...dialogueIds, ...vnIds, ...cueIds, ...cutsceneIds, ...awaitIds], 'cross-discipline');

  for (const state of ['SEMIFINAL_DRAGOBUR_ARRIVAL', 'SEMIFINAL_DRAGOBUR_AUTHORIZATION', 'SEMIFINAL_CELEBRATION', 'SEMIFINAL_GUARD_INTERVENTION']) {
    if (!flow.includes(state)) throw mismatch(`flow:${state}`);
  }

  return {
    status: 'valid',
    ids: {
      dialogue: dialogueIds.length,
      vn: vnIds.length,
      audio: cueIds.length,
      cutscene: cutsceneIds.length,
      awaits: awaitIds.length,
    },
  };
}

export function validateMaterializedDialogue({ dialogue, runtimeTexts }) {
  if (!Array.isArray(runtimeTexts) || runtimeTexts.length === 0) throw mismatch('runtime-dialogue:missing');
  for (const text of runtimeTexts) {
    if (typeof text !== 'string' || text.length === 0 || !dialogue.includes(text)) throw mismatch(`runtime-dialogue:stale:${text}`);
  }

  const approvedVnTexts = [...dialogue.matchAll(/^\|\s*`VN-SEM-[A-Z0-9-]+`\s*\|[^|\n]*\|\s*“([^”\n]+)”\s*\|\s*$/gm)].map(match => match[1]);
  for (const text of approvedVnTexts) {
    if (!runtimeTexts.includes(text)) throw mismatch(`contract-dialogue:unmaterialized:${text}`);
  }

  return { status: 'valid', materializedTexts: runtimeTexts.length, approvedVnTexts: approvedVnTexts.length };
}
