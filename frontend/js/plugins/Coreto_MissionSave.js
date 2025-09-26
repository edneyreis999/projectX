/*:
 * @target MZ
 * @plugindesc [v1.1] Slots de save fixos com nomes automáticos por missao/evento.
 * @author Coreto
 *
 * @help Coreto_MissionSave.js
 *
 * Cria saves dedicados por missao ou ponto de evento, salvando
 * diretamente em um slot calculado ou explicitamente escolhido.
 * Util para: save automatico no inicio de missao, checkpoints, etc.
 *
 * Novidades v1.1:
 * - Permite definir o nome exibido no slot para cada missao/evento.
 * - Campo opcional "Nome do Save" nos comandos e mapeamentos.
 * - Override automatico do titulo do save apenas durante o auto-save.
 *
 * Integracao recomendada com VisuMZ_1_SaveCore:
 * - Ajuste Max Save Files para cobrir os intervalos configurados aqui.
 * - Opcional: exiba no slot o rotulo da missao/evento usando o Info Data,
 *   pois salvamos uma tag no objeto info do save (info.coretoTag).
 *
 * Comandos fornecidos:
 * - Save Mission Start (saveMissionStart): salva no slot da missao
 * - Save Event Point   (saveEventPoint):   salva no slot do evento
 * - Delete Mission Save (deleteMissionSave): apaga o slot da missao
 * - Delete Event Save   (deleteEventSave):   apaga o slot do evento
 *
 * Observacoes:
 * - Slots sao 1-based, como no RPG Maker MZ.
 * - Se voce omitir o slotId, calculamos por hash com base e tamanho
 *   do intervalo configurados nos parametros do plugin.
 * - Garanta que o Max Save Files do SaveCore >= maior slot usado.
 *
 * @param missionSlotBase
 * @text Base dos Slots de Missao
 * @type number
 * @min 1
 * @desc Slot inicial (1-based) da faixa reservada para missoes.
 * @default 21
 *
 * @param missionSlotCount
 * @text Quantidade de Slots de Missao
 * @type number
 * @min 1
 * @desc Tamanho da faixa reservada para missoes.
 * @default 30
 *
 * @param eventSlotBase
 * @text Base dos Slots de Evento
 * @type number
 * @min 1
 * @desc Slot inicial (1-based) da faixa reservada para eventos.
 * @default 51
 *
 * @param eventSlotCount
 * @text Quantidade de Slots de Evento
 * @type number
 * @min 1
 * @desc Tamanho da faixa reservada para eventos.
 * @default 20
 *
 * @param missionMappings
 * @text Mapeamentos Fixos (Missoes)
 * @type struct<Mapping>[]
 * @desc Lista opcional de {id, slot, title} para definir slots/nomes fixos por missao.
 * @default []
 *
 * @param eventMappings
 * @text Mapeamentos Fixos (Eventos)
 * @type struct<Mapping>[]
 * @desc Lista opcional de {id, slot, title} para definir slots/nomes fixos por evento.
 * @default []
 *
 * @struct Mapping
 * @param id
 * @text Id
 * @type string
 * @desc Identificador (missionId/eventKey)
 * @default
 *
 * @param slot
 * @text Slot
 * @type number
 * @min 1
 * @desc Slot 1-based fixo para este id
 * @default 21
 *
 * @param title
 * @text Nome do Save (opcional)
 * @type string
 * @desc Nome exibido no slot quando salvar este id.
 * @default
 *
 * @command saveMissionStart
 * @text Save Mission Start
 * @desc Salva no slot dedicado dessa missao.
 *
 * @arg missionId
 * @text Mission Id
 * @type string
 * @desc Identificador unico da missao (ex.: m1_prologo)
 * @default mission_default
 *
 * @arg slotId
 * @text Slot Id (opcional)
 * @type number
 * @min 0
 * @desc Slot 1-based opcional. 0 usa calculo por hash/faixa.
 * @default 0
 *
 * @arg displayName
 * @text Nome do Save (opcional)
 * @type string
 * @desc Texto exibido no slot. Deixe vazio para usar mapeamento ou nome padrao.
 * @default
 *
 * @command saveEventPoint
 * @text Save Event Point
 * @desc Salva no slot dedicado desse evento.
 *
 * @arg eventKey
 * @text Event Key
 * @type string
 * @desc Chave unica do evento (ex.: ev_caverna_portao)
 * @default event_default
 *
 * @arg slotId
 * @text Slot Id (opcional)
 * @type number
 * @min 0
 * @desc Slot 1-based opcional. 0 usa calculo por hash/faixa.
 * @default 0
 *
 * @arg displayName
 * @text Nome do Save (opcional)
 * @type string
 * @desc Texto exibido no slot. Deixe vazio para usar mapeamento ou nome padrao.
 * @default
 *
 * @command deleteMissionSave
 * @text Delete Mission Save
 * @desc Apaga o slot dedicado dessa missao.
 *
 * @arg missionId
 * @text Mission Id
 * @type string
 * @desc Identificador unico da missao (ex.: m1_prologo)
 * @default mission_default
 *
 * @arg slotId
 * @text Slot Id (opcional)
 * @type number
 * @min 0
 * @desc Slot 1-based opcional. 0 usa calculo por hash/faixa.
 * @default 0
 *
 * @command deleteEventSave
 * @text Delete Event Save
 * @desc Apaga o slot dedicado desse evento.
 *
 * @arg eventKey
 * @text Event Key
 * @type string
 * @desc Chave unica do evento (ex.: ev_caverna_portao)
 * @default event_default
 *
 * @arg slotId
 * @text Slot Id (opcional)
 * @type number
 * @min 0
 * @desc Slot 1-based opcional. 0 usa calculo por hash/faixa.
 * @default 0
 */

(() => {
  'use strict';

  const pluginName = 'Coreto_MissionSave';

  const params = PluginManager.parameters(pluginName);
  const MISSION_BASE = Number(params.missionSlotBase || 21);
  const MISSION_COUNT = Number(params.missionSlotCount || 30);
  const EVENT_BASE = Number(params.eventSlotBase || 51);
  const EVENT_COUNT = Number(params.eventSlotCount || 20);

  function parseArrayParam(paramValue) {
    if (!paramValue) return [];
    try {
      const arr = JSON.parse(paramValue);
      return Array.isArray(arr) ? arr.map(entry => (typeof entry === 'string' ? JSON.parse(entry) : entry)) : [];
    } catch (_e) {
      return [];
    }
  }

  function normalizeMappings(list) {
    return list
      .map(entry => {
        if (!entry) return null;
        const id = typeof entry.id === 'string' ? entry.id.trim() : String(entry.id || '').trim();
        if (!id) return null;
        const slot = Number(entry.slot || 0);
        const title = typeof entry.title === 'string' ? entry.title.trim() : String(entry.title || '').trim();
        return { id, slot, title };
      })
      .filter(Boolean);
  }

  const DEFAULT_MISSION_SLOT_MAP = {
    m1_prologo: 21,
    m2_floresta: 22,
    m3_caverna: 23,
    m4_castelo: 24,
  };

  const DEFAULT_EVENT_SLOT_MAP = {
    ev_caverna_portao: 51,
    ev_castelo_ponte: 52,
    ev_vila_festival: 53,
  };

  const missionMappings = normalizeMappings(parseArrayParam(params.missionMappings));
  const eventMappings = normalizeMappings(parseArrayParam(params.eventMappings));

  const MISSION_SLOT_MAP = Object.assign({}, DEFAULT_MISSION_SLOT_MAP);
  const EVENT_SLOT_MAP = Object.assign({}, DEFAULT_EVENT_SLOT_MAP);
  const MISSION_TITLE_MAP = {};
  const EVENT_TITLE_MAP = {};

  missionMappings.forEach(entry => {
    if (entry.slot > 0) MISSION_SLOT_MAP[entry.id] = entry.slot;
    if (entry.title) MISSION_TITLE_MAP[entry.id] = entry.title;
  });

  eventMappings.forEach(entry => {
    if (entry.slot > 0) EVENT_SLOT_MAP[entry.id] = entry.slot;
    if (entry.title) EVENT_TITLE_MAP[entry.id] = entry.title;
  });

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function computeSlot(base, count, key, explicitSlotId, map) {
    const explicit = Number(explicitSlotId || 0);
    if (explicit > 0) return clamp(explicit, 1, 9999);
    const k = String(key);
    if (map && Object.prototype.hasOwnProperty.call(map, k)) {
      return clamp(Number(map[k]), 1, 9999);
    }
    const slot = base + (hashString(k) % count);
    return clamp(slot, 1, 9999);
  }

  function sanitizeTitle(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    return text.length > 120 ? text.substring(0, 120) : text;
  }

  function beautifyKey(key) {
    return String(key || '')
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/(^|\s)([a-zA-Z])/g, (_match, space, letter) => `${space}${letter.toUpperCase()}`);
  }

  function resolveDisplayName(kind, key, explicitName) {
    const cleanKey = String(key || '').trim();
    const fromArg = sanitizeTitle(explicitName);
    if (fromArg) return fromArg;

    const map = kind === 'mission' ? MISSION_TITLE_MAP : EVENT_TITLE_MAP;
    if (cleanKey && map && Object.prototype.hasOwnProperty.call(map, cleanKey)) {
      const mapped = sanitizeTitle(map[cleanKey]);
      if (mapped) return mapped;
    }

    const fallbackBase = beautifyKey(cleanKey);
    const prefix = kind === 'mission' ? 'Missao' : 'Evento';
    if (fallbackBase) return `${prefix}: ${fallbackBase}`;
    return `${prefix} automatico`;
  }

  function tagSave(label, key, displayName, slotId) {
    if (!$gameSystem) return;
    const normalizedLabel = label === 'event' ? 'event' : 'mission';
    const info = {
      label: normalizedLabel,
      missionKey: normalizedLabel === 'mission' ? String(key || '') : null,
      eventKey: normalizedLabel === 'event' ? String(key || '') : null,
      displayName: sanitizeTitle(displayName),
      slotId: Number(slotId || 0) || null,
      timestamp: Date.now(),
    };
    $gameSystem._coretoSaveTag = info;
  }

  function clearTag() {
    if ($gameSystem) delete $gameSystem._coretoSaveTag;
  }

  function setTitleOverride(title) {
    if (!$gameSystem) return { hadOverride: false, previous: undefined };
    const hadOverride = Object.prototype.hasOwnProperty.call($gameSystem, '_coretoSaveTitleOverride');
    const previous = hadOverride ? $gameSystem._coretoSaveTitleOverride : undefined;
    if (title) {
      $gameSystem._coretoSaveTitleOverride = title;
    } else {
      delete $gameSystem._coretoSaveTitleOverride;
    }
    return { hadOverride, previous };
  }

  function restoreTitleOverride(state) {
    if (!$gameSystem || !state) return;
    if (state.hadOverride) {
      $gameSystem._coretoSaveTitleOverride = state.previous;
    } else {
      delete $gameSystem._coretoSaveTitleOverride;
    }
  }

  async function saveToSlot(slotId, displayName) {
    const title = sanitizeTitle(displayName);
    const overrideState = setTitleOverride(title);
    try {
      if (typeof DataManager.saveGame === 'function') {
        await DataManager.saveGame(slotId);
      } else if (typeof DataManager.saveGameWithoutRescue === 'function') {
        await DataManager.saveGameWithoutRescue(slotId);
      }
    } catch (e) {
      console.error(`${pluginName}: erro ao salvar no slot`, slotId, e);
    } finally {
      restoreTitleOverride(overrideState);
    }
  }

  async function deleteSlot(slotId) {
    try {
      if (typeof DataManager.deleteSavefile === 'function') {
        await DataManager.deleteSavefile(slotId);
      } else if (typeof StorageManager.remove === 'function') {
        await StorageManager.remove(slotId);
      }
    } catch (e) {
      console.error(`${pluginName}: erro ao deletar slot`, slotId, e);
    }
  }

  const _Game_System_savefileTitle = Game_System.prototype.savefileTitle;
  Game_System.prototype.savefileTitle = function () {
    if (this._coretoSaveTitleOverride && String(this._coretoSaveTitleOverride).trim()) {
      return this._coretoSaveTitleOverride;
    }
    return _Game_System_savefileTitle.call(this);
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    const info = _DataManager_makeSavefileInfo.call(this);
    if ($gameSystem && $gameSystem._coretoSaveTag) {
      info.coretoTag = Object.assign({}, $gameSystem._coretoSaveTag);
      if (info.coretoTag.displayName) {
        info.title = info.coretoTag.displayName;
      }
    }
    return info;
  };

  function parseSlotAndTitle(slotInput, displayNameInput) {
    let slot = 0;
    let name = displayNameInput;

    if (slotInput && typeof slotInput === 'object') {
      slot = Number(slotInput.slot || slotInput.slotId || 0);
      if (!name) name = slotInput.displayName || slotInput.title || '';
    } else if (typeof slotInput === 'string' && !displayNameInput) {
      const maybeNumber = Number(slotInput);
      if (!Number.isNaN(maybeNumber) && slotInput.trim() !== '') {
        slot = maybeNumber;
      } else {
        name = slotInput;
        slot = 0;
      }
    } else {
      slot = Number(slotInput || 0);
    }

    return { slot, name: name || '' };
  }

  let lastResult = null;

  function updateLastResult(data) {
    lastResult = Object.assign({ timestamp: Date.now() }, data);
  }

  PluginManager.registerCommand(pluginName, 'saveMissionStart', async args => {
    const missionId = String(args.missionId || 'mission_default');
    const slotId = computeSlot(MISSION_BASE, MISSION_COUNT, missionId, Number(args.slotId || 0), MISSION_SLOT_MAP);
    const displayName = resolveDisplayName('mission', missionId, args.displayName || '');
    tagSave('mission', missionId, displayName, slotId);
    updateLastResult({ type: 'mission', key: missionId, slotId, displayName });
    await saveToSlot(slotId, displayName);
  });

  PluginManager.registerCommand(pluginName, 'saveEventPoint', async args => {
    const eventKey = String(args.eventKey || 'event_default');
    const slotId = computeSlot(EVENT_BASE, EVENT_COUNT, eventKey, Number(args.slotId || 0), EVENT_SLOT_MAP);
    const displayName = resolveDisplayName('event', eventKey, args.displayName || '');
    tagSave('event', eventKey, displayName, slotId);
    updateLastResult({ type: 'event', key: eventKey, slotId, displayName });
    await saveToSlot(slotId, displayName);
  });

  PluginManager.registerCommand(pluginName, 'deleteMissionSave', async args => {
    const missionId = String(args.missionId || 'mission_default');
    const slotId = computeSlot(MISSION_BASE, MISSION_COUNT, missionId, Number(args.slotId || 0), MISSION_SLOT_MAP);
    await deleteSlot(slotId);
    updateLastResult({ type: 'mission-delete', key: missionId, slotId, displayName: null });
  });

  PluginManager.registerCommand(pluginName, 'deleteEventSave', async args => {
    const eventKey = String(args.eventKey || 'event_default');
    const slotId = computeSlot(EVENT_BASE, EVENT_COUNT, eventKey, Number(args.slotId || 0), EVENT_SLOT_MAP);
    await deleteSlot(slotId);
    updateLastResult({ type: 'event-delete', key: eventKey, slotId, displayName: null });
  });

  const publicApi = {
    saveMission: async (missionId, slotOrOptions = 0, displayName = '') => {
      const id = String(missionId || 'mission_default');
      const { slot, name } = parseSlotAndTitle(slotOrOptions, displayName);
      const slotId = computeSlot(MISSION_BASE, MISSION_COUNT, id, slot, MISSION_SLOT_MAP);
      const title = resolveDisplayName('mission', id, name);
      tagSave('mission', id, title, slotId);
      updateLastResult({ type: 'mission', key: id, slotId, displayName: title });
      await saveToSlot(slotId, title);
      return slotId;
    },
    saveEvent: async (eventKey, slotOrOptions = 0, displayName = '') => {
      const key = String(eventKey || 'event_default');
      const { slot, name } = parseSlotAndTitle(slotOrOptions, displayName);
      const slotId = computeSlot(EVENT_BASE, EVENT_COUNT, key, slot, EVENT_SLOT_MAP);
      const title = resolveDisplayName('event', key, name);
      tagSave('event', key, title, slotId);
      updateLastResult({ type: 'event', key, slotId, displayName: title });
      await saveToSlot(slotId, title);
      return slotId;
    },
    deleteMission: async (missionId, slotId = 0) => {
      const id = String(missionId || 'mission_default');
      const slot = computeSlot(MISSION_BASE, MISSION_COUNT, id, Number(slotId || 0), MISSION_SLOT_MAP);
      await deleteSlot(slot);
      updateLastResult({ type: 'mission-delete', key: id, slotId: slot, displayName: null });
      return slot;
    },
    deleteEvent: async (eventKey, slotId = 0) => {
      const key = String(eventKey || 'event_default');
      const slot = computeSlot(EVENT_BASE, EVENT_COUNT, key, Number(slotId || 0), EVENT_SLOT_MAP);
      await deleteSlot(slot);
      updateLastResult({ type: 'event-delete', key, slotId: slot, displayName: null });
      return slot;
    },
    computeMissionSlot: (missionId, slotId = 0) => computeSlot(MISSION_BASE, MISSION_COUNT, String(missionId || ''), Number(slotId || 0), MISSION_SLOT_MAP),
    computeEventSlot: (eventKey, slotId = 0) => computeSlot(EVENT_BASE, EVENT_COUNT, String(eventKey || ''), Number(slotId || 0), EVENT_SLOT_MAP),
    resolveMissionName: (missionId, displayName = '') => resolveDisplayName('mission', String(missionId || ''), displayName),
    resolveEventName: (eventKey, displayName = '') => resolveDisplayName('event', String(eventKey || ''), displayName),
    clearTag: () => {
      clearTag();
    },
    getLastResult: () => (lastResult ? Object.assign({}, lastResult) : null),
  };

  window.CoretoMissionSave = publicApi;
})();
