//=============================================================================
// RPG Maker MZ - Coreto Skill Learn Control
// Coreto_Skill_Learn_Control.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Controla o aprendizado de habilidades, bloqueando aprendizado automático para habilidades do Skill Shop.
 * @help
 * ----------------------------------------------------------------------------
 * Este plugin modifica o comportamento de aprendizado de habilidades:
 * - Bloqueia aprendizado automático de habilidades com <LudosPrice>.
 * - Permite aprendizado automático de outras habilidades.
 * - Integra com o sistema de compra para aprendizado manual.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Skill_Learn_Control';

  /**
   * Sobrescreve o método levelUp para bloquear aprendizado automático de habilidades do Skill Shop.
   * As habilidades com <LudosPrice> no campo Notes serão ignoradas.
   */
  Game_Actor.prototype.levelUp = function () {
    // Incrementa o nível do ator
    this._level++;

    // Obtém habilidades aprendíveis por nivel
    const skillsToLearn = this.getLearnableSkillsForLevel(this._level);

    // Aprende as habilidades disponíveis para o nível atual
    for (const skill of skillsToLearn) {
      this.learnSkill(skill.skillId);
      console.log(`[${pluginName}] Habilidade aprendida automaticamente: ${skill.skillId}`);
    }
  };

  /**
   * Retorna habilidades aprendíveis automaticamente no nível atual.
   * Ignora habilidades com <LudosPrice>.
   * @param {number} level - Nível atual do ator.
   * @returns {Array} Lista de habilidades aprendíveis.
   */
  Game_Actor.prototype.getLearnableSkillsForLevel = function (level) {
    return this.currentClass().learnings.filter(entry => {
      let entryMetadata;

      try {
        entryMetadata = JSON.parse(JSON.parse(entry.note.trim()));
      } catch (error) {
        return entry.level === level; // Habilidades sem metadados são aprendíveis automaticamente
      }

      return !entryMetadata.ludosPrice && entry.level === level; // Ignora habilidades com LudosPrice
    });
  };

  /**
   * Adiciona uma habilidade ao personagem após a compra no Skill Shop.
   * Verifica se a habilidade já foi aprendida para evitar duplicatas.
   * @param {number} actorId - ID do ator que aprenderá a habilidade.
   * @param {number} skillId - ID da habilidade a ser aprendida.
   */
  function addSkillAfterPurchase(actorId, skillId) {
    const actor = $gameActors.actor(actorId);

    // Valida se o ator e a habilidade são válidos
    if (!actor) {
      console.error(`[${pluginName}] Ator ${actorId} não encontrado.`);
      return;
    }

    if (!skillId || !$dataSkills[skillId]) {
      console.error(`[${pluginName}] Habilidade ${skillId} inválida.`);
      return;
    }

    if (!actor.isLearnedSkill(skillId)) {
      actor.learnSkill(skillId);
      console.log(`[${pluginName}] Habilidade ${skillId} aprendida pelo ator ${actorId}.`);
    } else {
      console.warn(`[${pluginName}] A habilidade ${skillId} já foi aprendida pelo ator ${actorId}.`);
    }
  }

  // Expor a função globalmente para integração com o Skill Shop
  window.CoretoSkillLearnControl = {
    addSkillAfterPurchase,
  };

  console.log(`[${pluginName}] Plugin inicializado com sucesso.`);
})();
