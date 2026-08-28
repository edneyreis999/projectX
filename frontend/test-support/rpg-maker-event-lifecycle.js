const TRIGGERS = Object.freeze({
  ACTION_BUTTON: 0,
  PLAYER_TOUCH: 1,
  EVENT_TOUCH: 2,
  AUTORUN: 3,
  PARALLEL: 4,
});

function conditionState({ switches = [], variables = {}, selfSwitches = [], items = [], actors = [] } = {}) {
  return {
    switches: new Set(switches),
    variables: new Map(Object.entries(variables).map(([id, value]) => [Number(id), value])),
    selfSwitches: new Set(selfSwitches),
    items: new Set(items),
    actors: new Set(actors),
  };
}

function pageMeetsConditions(page, state, { mapId, eventId }) {
  const conditions = page.conditions;
  if (conditions.switch1Valid && !state.switches.has(conditions.switch1Id)) return false;
  if (conditions.switch2Valid && !state.switches.has(conditions.switch2Id)) return false;
  if (conditions.variableValid && (state.variables.get(conditions.variableId) ?? 0) < conditions.variableValue) return false;
  if (conditions.selfSwitchValid && !state.selfSwitches.has(`${mapId}:${eventId}:${conditions.selfSwitchCh}`)) return false;
  if (conditions.itemValid && !state.items.has(conditions.itemId)) return false;
  if (conditions.actorValid && !state.actors.has(conditions.actorId)) return false;
  return true;
}

function selectEligiblePage(event, state, { mapId = 0, eventId = event.id } = {}) {
  for (let index = event.pages.length - 1; index >= 0; index -= 1) {
    const page = event.pages[index];
    if (pageMeetsConditions(page, state, { mapId, eventId })) return { index, page };
  }
  return { index: -1, page: null };
}

function interpreterOwner(trigger) {
  return trigger === TRIGGERS.PARALLEL ? 'event_parallel' : 'map';
}

function traceEventLifecycle(event, frames, { mapId = 0, eventId = event.id } = {}) {
  const trace = [];
  const discarded = [];
  let previous = null;

  for (const frame of frames) {
    const selected = selectEligiblePage(event, frame.state, { mapId, eventId });
    const pageChanged = previous !== null && previous.selected.index !== selected.index;
    if (pageChanged && previous.selected.page?.trigger === TRIGGERS.PARALLEL) {
      discarded.push({
        afterFrame: previous.label,
        beforeFrame: frame.label,
        pageIndex: previous.selected.index,
        pendingCommands: [...(previous.pendingCommands ?? [])],
      });
    }
    const entry = {
      label: frame.label,
      selected,
      pageChanged,
      owner: selected.page ? interpreterOwner(selected.page.trigger) : null,
      pendingCommands: [...(frame.pendingCommands ?? [])],
    };
    trace.push(entry);
    previous = { ...frame, selected };
  }
  return { trace, discarded };
}

module.exports = {
  TRIGGERS,
  conditionState,
  interpreterOwner,
  pageMeetsConditions,
  selectEligiblePage,
  traceEventLifecycle,
};
