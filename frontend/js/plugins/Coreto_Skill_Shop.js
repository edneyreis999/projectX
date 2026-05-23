//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_Skill_Shop
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Esconde skills nao-aprendiveis e adiciona refund no VisuStella Skill Shop
 * @author Coreto
 * @orderAfter VisuMZ_4_SkillShop
 *
 * @help
 * ============================================================================
 * Coreto Skill Shop - Hide Not Learnable + Refund
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
 * Ao selecionar uma skill aprendida, abre popup de confirmacao.
 * Se confirmado: ouro devolvido (valor integral), skill removida do ator.
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

  if (typeof Imported === "undefined") window.Imported = {};
  Imported[PLUGIN_NAME] = true;

  // ============================================================================
  // PARTE 1 - Esconder skills nao-aprendiveis
  // ============================================================================

  const _DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);
    if (object === $dataSkills) {
      for (const skill of $dataSkills) {
        if (!skill) continue;
        skill._coretoHideNotLearnable = NOTETAG_REGEX.test(skill.note || "");
      }
    }
  };

  const _Window_SkillShopSkillList_setActor =
    Window_SkillShopSkillList.prototype.setActor;
  Window_SkillShopSkillList.prototype.setActor = function (actor) {
    _Window_SkillShopSkillList_setActor.call(this, actor);
    this._rebuildVisibleData();
    this.refresh();
    this.smoothScrollTo(0, 0);
    this.select(0);
  };

  const _Window_SkillShopSkillList_setList =
    Window_SkillShopSkillList.prototype.setList;
  Window_SkillShopSkillList.prototype.setList = function (data) {
    _Window_SkillShopSkillList_setList.call(this, data);
    this._rebuildVisibleData();
    this.refresh();
    this.smoothScrollTo(0, 0);
    this.select(0);
  };

  Window_SkillShopSkillList.prototype._rebuildVisibleData = function () {
    if (!this._data || !this._actor) {
      this._visibleData = this._data || [];
      return;
    }

    const actor = this._actor;
    const actorClassId = actor.currentClass().id;

    this._visibleData = this._data.filter((skill) => {
      if (!skill) return false;
      if (!skill._coretoHideNotLearnable) return true;

      const stypeId = skill.stypeId;
      if (stypeId > 0 && !actor.addedSkillTypes().includes(stypeId)) {
        return false;
      }

      const classReqs = DataManager.skillShopClassRequirements
        ? DataManager.skillShopClassRequirements(skill)
        : [];
      if (classReqs.length > 0 && !classReqs.includes(actorClassId)) {
        return false;
      }

      return true;
    });
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
  // PARTE 2 - Refund de Skills
  // ============================================================================

  // Skills ja aprendidas ficam selecionaveis (para refund)
  const _Window_SkillShopSkillList_isEnabled =
    Window_SkillShopSkillList.prototype.isEnabled;
  Window_SkillShopSkillList.prototype.isEnabled = function (skill) {
    if (!skill) return false;
    if (this._actor && this._actor.isLearnedSkill(skill.id)) return true;
    return _Window_SkillShopSkillList_isEnabled.call(this, skill);
  };

  // Mostra "Reembolsar: Xg" em vez de "Learned"
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
        $gameParty.gainGold(cost);
        actor.forgetSkill(skill.id);
        this._skillListWindow.refresh();
        this._goldWindow.refresh();
        this._skillListWindow.activate();
      } else {
        _Scene_SkillShop_onSkillListOk.call(this);
      }
    };
  }
})();
