/* eslint-disable @typescript-eslint/no-var-requires */
const { TRIGGERS, conditionState, selectEligiblePage, traceEventLifecycle } = require('../../test-support/rpg-maker-event-lifecycle.js');

function conditions(overrides = {}) {
  return {
    actorId: 1,
    actorValid: false,
    itemId: 1,
    itemValid: false,
    selfSwitchCh: 'A',
    selfSwitchValid: false,
    switch1Id: 1,
    switch1Valid: false,
    switch2Id: 1,
    switch2Valid: false,
    variableId: 1,
    variableValid: false,
    variableValue: 0,
    ...overrides,
  };
}

function page(trigger, overrides = {}) {
  return { trigger, conditions: conditions(overrides) };
}

describe('RPG Maker event lifecycle harness', () => {
  test('uses variable thresholds and the last eligible page like Game_Event', () => {
    const event = {
      id: 7,
      pages: [
        page(TRIGGERS.ACTION_BUTTON),
        page(TRIGGERS.PARALLEL, { variableValid: true, variableId: 29, variableValue: 10 }),
        page(TRIGGERS.AUTORUN, { variableValid: true, variableId: 29, variableValue: 20 }),
      ],
    };
    expect(selectEligiblePage(event, conditionState({ variables: { 29: 9 } })).index).toBe(0);
    expect(selectEligiblePage(event, conditionState({ variables: { 29: 10 } })).index).toBe(1);
    expect(selectEligiblePage(event, conditionState({ variables: { 29: 90 } })).index).toBe(2);
  });

  test('evaluates switch, self-switch, item and actor conditions together', () => {
    const event = {
      id: 7,
      pages: [
        page(TRIGGERS.ACTION_BUTTON, {
          switch1Valid: true,
          switch1Id: 3,
          selfSwitchValid: true,
          selfSwitchCh: 'B',
          itemValid: true,
          itemId: 8,
          actorValid: true,
          actorId: 2,
        }),
      ],
    };
    const incomplete = conditionState({ switches: [3], selfSwitches: ['5:7:B'], items: [8] });
    expect(selectEligiblePage(event, incomplete, { mapId: 5 }).index).toBe(-1);
    const complete = conditionState({ switches: [3], selfSwitches: ['5:7:B'], items: [8], actors: [2] });
    expect(selectEligiblePage(event, complete, { mapId: 5 }).index).toBe(0);
  });

  test('exposes cleanup made unreachable when a Parallel page changes between frames', () => {
    const event = {
      id: 4,
      pages: [page(TRIGGERS.PARALLEL, { variableValid: true, variableId: 9, variableValue: 10 }), page(TRIGGERS.AUTORUN, { variableValid: true, variableId: 9, variableValue: 20 })],
    };
    const result = traceEventLifecycle(event, [
      {
        label: 'transition-frame',
        state: conditionState({ variables: { 9: 10 } }),
        pendingCommands: ['wait-for-movement', 'finish-cutscene'],
      },
      { label: 'next-frame', state: conditionState({ variables: { 9: 20 } }) },
    ]);
    expect(result.discarded).toEqual([
      {
        afterFrame: 'transition-frame',
        beforeFrame: 'next-frame',
        pageIndex: 0,
        pendingCommands: ['wait-for-movement', 'finish-cutscene'],
      },
    ]);
  });

  test('accepts the detector-to-controller pattern when the detector leaves no pending cleanup', () => {
    const event = {
      id: 4,
      pages: [page(TRIGGERS.PARALLEL, { variableValid: true, variableId: 9, variableValue: 10 }), page(TRIGGERS.AUTORUN, { variableValid: true, variableId: 9, variableValue: 20 })],
    };
    const result = traceEventLifecycle(event, [
      { label: 'detector', state: conditionState({ variables: { 9: 10 } }), pendingCommands: [] },
      { label: 'controller', state: conditionState({ variables: { 9: 20 } }) },
    ]);
    expect(result.discarded).toEqual([{ afterFrame: 'detector', beforeFrame: 'controller', pageIndex: 0, pendingCommands: [] }]);
    expect(result.trace[1]).toMatchObject({ owner: 'map', pageChanged: true, selected: { index: 1 } });
  });
});
