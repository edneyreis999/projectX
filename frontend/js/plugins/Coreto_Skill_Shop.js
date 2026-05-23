//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_Skill_Shop
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Esconde skills nao-aprendiveis no VisuStella Skill Shop
 * @author Coreto
 * @orderAfter VisuMZ_4_SkillShop
 *
 * @help
 * ============================================================================
 * Coreto Skill Shop - Hide Not Learnable
 * ============================================================================
 *
 * Sobrescreve o comportamento padrao do VisuStella Skill Shop para ESCONDER
 * skills que o ator selecionado nao pode aprender (classe errada ou sem acesso
 * ao Skill Type), ao inves de exibi-las com mensagens de erro.
 *
 * ---
 *
 * NOTETAG (coloque no campo Note das Skills):
 *
 *   <Skill Shop Hide Not Learnable>
 *
 * Quando esta tag esta presente na skill:
 *   - Se o ator nao tem acesso ao SType da skill → skill ESCONDIDA da lista
 *   - Se o ator nao tem a classe requerida → skill ESCONDIDA da lista
 *
 * Skills SEM esta tag mantem o comportamento padrao do VisuStella
 * (exibem "Not For %1" ou "No %1 Access").
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
})();
