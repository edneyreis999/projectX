//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_Skill_Shop
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Esconde skills nao-aprendiveis, refund e chain display no VisuStella Skill Shop
 * @author Coreto
 * @orderAfter VisuMZ_4_SkillShop
 *
 * @help
 * ============================================================================
 * Coreto Skill Shop - Hide Not Learnable + Refund + Chain Display
 * ============================================================================
 *
 * PARTE 1 - ESCONDER SKILLS NAO-APRENDIVEIS
 * Sobrescreve o comportamento padrao do VisuStella Skill Shop para ESCONDER
 * skills que o ator selecionado nao pode aprender (classe errada ou sem acesso
 * ao Skill Type), ao inves de exibi-las com mensagens de erro.
 *
 * NOTETAG (coloque no campo Note das Skills):
 *   <Skill Shop Hide Not Learnable>
 *
 * PARTE 2 - REFUND DE SKILLS
 * Skills ja aprendidas mostram "Reembolsar: Xg" em vez de "Learned".
 * Ao selecionar uma skill aprendida: ouro devolvido, skill removida do ator.
 * Para chains: reembolsa apenas o nivel selecionado (volta 1 nivel).
 *
 * PARTE 3 - CHAIN DE SKILLS PASSIVAS
 * Suporta cadeias de skills passivas (ex: Vitalidade+ Nv.1-9).
 * Cada nivel e uma skill real no database com prereq chain nativa do VisuStella.
 * Mostra apenas o nivel atual (refund) e o proximo nivel (compra).
 * Niveis intermediarios sao ocultados automaticamente.
 *
 * NOTETAGS (Skills):
 *   <Passive Chain Group: groupName>  - identifica a cadeia
 *   <Passive Chain Level: N>          - nivel desta skill na cadeia
 *
 * EXEMPLO (Skills.json):
 *   Skill 111: <Passive Chain Group: Vitalidade+> <Passive Chain Level: 1>
 *   Skill 112: <Passive Chain Group: Vitalidade+> <Passive Chain Level: 2>
 *              <Skill Shop Require Learned Skill: 111>
 *   ...
 *   Skill 119: <Passive Chain Group: Vitalidade+> <Passive Chain Level: 9>
 *              <Skill Shop Require Learned Skill: 118>
 *
 * DISPLAY NO SHOP:
 *   - Nada aprendido: mostra Nv.1 com custo
 *   - Nivel 3 aprendido: mostra Nv.4 (compra) e Nv.3 (refund)
 *   - Nivel max: mostra Nv.MAX (Máx.) com refund
 *   - Niveis intermediarios: OCULTOS
 *
 * ---
 *
 * REQUISITOS:
 *   - VisuMZ_4_SkillShop (Tier 4)
 *   - Este plugin DEVE carregar DEPOIS de VisuMZ_4_SkillShop
 *
 * COMPATIBILIDADE:
 *   - Funciona com VisuMZ_2_MoreCurrencies
 *   - Nao modifica save data
 *   - Nao modifica dados do database
 */

(() => {
  const PLUGIN_NAME = "Coreto_Skill_Shop";
  const NOTETAG_REGEX = /<Skill Shop Hide Not Learnable>/i;
  const CHAIN_NOTETAGS = {
    chainGroup: /<Passive Chain Group:\s*(.+?)>/i,
    chainLevel: /<Passive Chain Level:\s*(\d+)>/i,
  };

  function parseNotetagStr(note, regex) {
    const match = note.match(regex);
    return match ? match[1].trim() : null;
  }

  function parseNotetagInt(note, regex) {
    const match = note.match(regex);
    return match ? parseInt(match[1], 10) : null;
  }

  if (typeof Imported === "undefined") window.Imported = {};
  Imported[PLUGIN_NAME] = true;

  // ============================================================================
  // PARTE 1 - Parse de notetags (DataManager.onLoad)
  // ============================================================================

  const _DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);
    if (object === $dataSkills) {
      const chainCount = { total: 0, groups: {} };
      for (const skill of $dataSkills) {
        if (!skill) continue;
        const note = skill.note || "";
        skill._coretoHideNotLearnable = NOTETAG_REGEX.test(note);
        skill._passiveChainGroup = parseNotetagStr(note, CHAIN_NOTETAGS.chainGroup);
        skill._passiveChainLevel = parseNotetagInt(note, CHAIN_NOTETAGS.chainLevel);
        if (skill._passiveChainGroup) {
          chainCount.total++;
          const g = skill._passiveChainGroup;
          if (!chainCount.groups[g]) chainCount.groups[g] = [];
          chainCount.groups[g].push(`id=${skill.id} nv=${skill._passiveChainLevel}`);
        }
      }
      console.log(`[${PLUGIN_NAME}] onLoad $dataSkills: ${chainCount.total} chain skills parsed`);
      for (const [group, entries] of Object.entries(chainCount.groups)) {
        console.log(`[${PLUGIN_NAME}]   Chain "${group}": ${entries.join(", ")}`);
      }
    }
  };

  // ============================================================================
  // PARTE 3 - Chain Helpers
  // ============================================================================

  DataManager.isChainSkill = function (skill) {
    return !!(skill && skill._passiveChainGroup);
  };

  DataManager.highestChainLevelLearned = function (actor, groupName) {
    let highest = 0;
    for (const skill of $dataSkills) {
      if (!skill) continue;
      if (skill._passiveChainGroup === groupName && actor.isLearnedSkill(skill.id)) {
        if (skill._passiveChainLevel > highest) highest = skill._passiveChainLevel;
      }
    }
    return highest;
  };

  DataManager.maxChainLevel = function (groupName) {
    let max = 0;
    for (const skill of $dataSkills) {
      if (!skill) continue;
      if (skill._passiveChainGroup === groupName && skill._passiveChainLevel > max) {
        max = skill._passiveChainLevel;
      }
    }
    return max;
  };

  // ============================================================================
  // PARTE 1 + 3 - Filtro de visibilidade (class/stype + chain)
  // ============================================================================

  const _Window_SkillShopSkillList_setActor =
    Window_SkillShopSkillList.prototype.setActor;
  Window_SkillShopSkillList.prototype.setActor = function (actor) {
    console.log(`[${PLUGIN_NAME}] setActor: ${actor ? actor.name() : "null"}`);
    _Window_SkillShopSkillList_setActor.call(this, actor);
    this.refresh();
    this.smoothScrollTo(0, 0);
    this.select(0);
  };

  const _Window_SkillShopSkillList_setList =
    Window_SkillShopSkillList.prototype.setList;
  Window_SkillShopSkillList.prototype.setList = function (data) {
    console.log(`[${PLUGIN_NAME}] setList: ${data ? data.length : 0} skills`);
    _Window_SkillShopSkillList_setList.call(this, data);
    this.refresh();
    this.smoothScrollTo(0, 0);
    this.select(0);
  };

  // refresh() chama _rebuildVisibleData antes de redesenhar.
  // Isso garante que a lista filtrada é reconstruída após compras do VisuStella.
  const _Window_SkillShopSkillList_refresh =
    Window_SkillShopSkillList.prototype.refresh;
  Window_SkillShopSkillList.prototype.refresh = function () {
    this._rebuildVisibleData();
    _Window_SkillShopSkillList_refresh.call(this);
  };

  Window_SkillShopSkillList.prototype._rebuildVisibleData = function () {
    if (!this._data || !this._actor) {
      this._visibleData = this._data || [];
      console.log(`[${PLUGIN_NAME}] _rebuildVisibleData: no actor/data, showing ${this._visibleData.length} items`);
      return;
    }

    const actor = this._actor;
    const actorClassId = actor.currentClass().id;

    // Pass 1: Hide Not Learnable (class/stype filter)
    const classFiltered = this._data.filter((skill) => {
      if (!skill) return false;
      if (!skill._coretoHideNotLearnable) return true;

      const stypeId = skill.stypeId;
      if (stypeId > 0 && !actor.addedSkillTypes().includes(stypeId)) return false;

      const classReqs = DataManager.skillShopClassRequirements
        ? DataManager.skillShopClassRequirements(skill)
        : [];
      if (classReqs.length > 0 && !classReqs.includes(actorClassId)) return false;

      return true;
    });

    // Pass 2: Chain filtering — only show highest learned + next level
    const chainHighest = {};
    for (const skill of classFiltered) {
      if (skill._passiveChainGroup && !(skill._passiveChainGroup in chainHighest)) {
        chainHighest[skill._passiveChainGroup] =
          DataManager.highestChainLevelLearned(actor, skill._passiveChainGroup);
      }
    }

    const debugHidden = [];
    this._visibleData = classFiltered.filter((skill) => {
      if (!skill._passiveChainGroup) return true;

      const group = skill._passiveChainGroup;
      const level = skill._passiveChainLevel;
      const hll = chainHighest[group];

      if (hll === 0) {
        const visible = level === 1;
        if (!visible) debugHidden.push(`${skill.name} Nv.${level} (hll=0, not level 1)`);
        return visible;
      }
      const visible = level === hll || level === hll + 1;
      if (!visible) debugHidden.push(`${skill.name} Nv.${level} (hll=${hll})`);
      return visible;
    });

    console.log(`[${PLUGIN_NAME}] _rebuildVisibleData for ${actor.name()}: ${this._data.length} raw → ${classFiltered.length} classFiltered → ${this._visibleData.length} visible`);
    if (Object.keys(chainHighest).length > 0) {
      console.log(`[${PLUGIN_NAME}]   Chain highest: ${JSON.stringify(chainHighest)}`);
    }
    if (debugHidden.length > 0) {
      console.log(`[${PLUGIN_NAME}]   Hidden by chain: ${debugHidden.join(", ")}`);
    }
    console.log(`[${PLUGIN_NAME}]   Visible: ${this._visibleData.map(s => `${s.name}#${s.id}`).join(", ")}`);
  };

  Window_SkillShopSkillList.prototype.maxItems = function () {
    return this._visibleData ? this._visibleData.length : 0;
  };

  Window_SkillShopSkillList.prototype.itemAt = function (index) {
    return this._visibleData && index >= 0
      ? this._visibleData[index]
      : null;
  };

  // ============================================================================
  // PARTE 3 - Display: nome com nivel + sufixo Max
  // ============================================================================

  const _Window_SkillShopSkillList_drawItemName =
    Window_SkillShopSkillList.prototype.drawItemName;
  Window_SkillShopSkillList.prototype.drawItemName = function (skill, x, y, width) {
    if (!skill || !DataManager.isChainSkill(skill) || !this._actor) {
      _Window_SkillShopSkillList_drawItemName.call(this, skill, x, y, width);
      return;
    }

    const hll = DataManager.highestChainLevelLearned(this._actor, skill._passiveChainGroup);
    const maxLvl = DataManager.maxChainLevel(skill._passiveChainGroup);
    const level = skill._passiveChainLevel;
    const isMax = level === maxLvl && level === hll;

    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = ImageManager.iconWidth + 4;
    const itemWidth = Math.max(0, width - textMargin);
    this.resetTextColor();
    this.drawIcon(skill.iconIndex, x, iconY);

    let name = skill.name;
    if (isMax) {
      name += ` Nv. ${level} (Máx.)`;
    } else {
      name += ` Nv. ${level}`;
    }
    this.drawText(name, x + textMargin, y, itemWidth);
  };

  // ============================================================================
  // PARTE 2 - Refund de Skills
  // ============================================================================

  const _Window_SkillShopSkillList_isEnabled =
    Window_SkillShopSkillList.prototype.isEnabled;
  Window_SkillShopSkillList.prototype.isEnabled = function (skill) {
    if (!skill) return false;
    if (this._actor && this._actor.isLearnedSkill(skill.id)) {
      const chainInfo = DataManager.isChainSkill(skill) ? ` [chain nv.${skill._passiveChainLevel}]` : "";
      console.log(`[${PLUGIN_NAME}] isEnabled: ${skill.name}#${skill.id}${chainInfo} = true (learned, refund)`);
      return true;
    }
    return _Window_SkillShopSkillList_isEnabled.call(this, skill);
  };

  const _Window_SkillShopSkillList_drawCannotLearnReason =
    Window_SkillShopSkillList.prototype.drawCannotLearnReason;
  Window_SkillShopSkillList.prototype.drawCannotLearnReason = function (
    skill,
    x,
    y,
    width
  ) {
    if (this._actor && this._actor.isLearnedSkill(skill.id)) {
      const cost = DataManager.skillShopCost(skill);
      const text = `\\c[2]Reembolsar: ${cost}g\\c[0]`;
      const tw = this.textSizeEx(text).width;
      this.drawTextEx(text, x + width - tw, y, width);
      return;
    }
    _Window_SkillShopSkillList_drawCannotLearnReason.call(
      this,
      skill,
      x,
      y,
      width
    );
  };

  // ----------------------------------------------------------------------------
  // Scene_SkillShop - Refund direto (sem popup)
  // ----------------------------------------------------------------------------

  if (typeof Scene_SkillShop !== "undefined") {
    const _Scene_SkillShop_onSkillListOk =
      Scene_SkillShop.prototype.onSkillListOk;
    Scene_SkillShop.prototype.onSkillListOk = function () {
      const actor = this._actorListWindow.actor();
      const skill = this._skillListWindow.item();
      if (actor && skill && actor.isLearnedSkill(skill.id)) {
        const cost = DataManager.skillShopCost(skill);
        const chainInfo = DataManager.isChainSkill(skill) ? ` [chain nv.${skill._passiveChainLevel}]` : "";
        console.log(`[${PLUGIN_NAME}] REFUND: ${actor.name()} → forget ${skill.name}#${skill.id}${chainInfo}, return ${cost}g`);
        $gameParty.gainGold(cost);
        actor.forgetSkill(skill.id);
        this._skillListWindow.refresh();
        this._goldWindow.refresh();
        this._skillListWindow.activate();
      } else {
        const chainInfo = skill && DataManager.isChainSkill(skill) ? ` [chain nv.${skill._passiveChainLevel}]` : "";
        console.log(`[${PLUGIN_NAME}] BUY: ${actor ? actor.name() : "?"} → learn ${skill ? skill.name : "null"}#${skill ? skill.id : "?"}${chainInfo} (delegating to VisuStella)`);
        _Scene_SkillShop_onSkillListOk.call(this);
      }
    };
  }

  console.log(`[${PLUGIN_NAME}] Plugin inicializado com sucesso (chain model).`);
})();
