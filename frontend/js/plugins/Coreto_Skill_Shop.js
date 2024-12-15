//=============================================================================
// RPG Maker MZ - Coreto Skill Shop
// Coreto_Skill_Shop.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Gerencia o sistema de compra de habilidades no Coreto.
 * @help
 * ----------------------------------------------------------------------------
 * Funções:
 * - Abre a loja de habilidades com base nas habilidades configuradas na classe.
 * ----------------------------------------------------------------------------
 * Uso:
 * Use o comando:
 * CoretoSkillShop.openSkillShop(classId);
 * ----------------------------------------------------------------------------
 */

(() => {
  /**
   * Abre a loja de habilidades para a classe especificada.
   * @param {number} classId - ID da classe no banco de dados.
   */
  function openSkillShop(classId, actorId) {
    const classData = $dataClasses[classId];
    const actor = $gameActors.actor(actorId);

    if (!classData) {
      console.error(`[Coreto_Skill_Shop] Classe com ID ${classId} não encontrada.`);
      return;
    }

    if (!actor) {
      console.error(`[Coreto_Skill_Shop] Ator com ID ${actorId} não encontrado.`);
      return;
    }

    /**
     * Filtra habilidades aprendíveis na classe e adiciona metadados adicionais.
     *
     * Estrutura de `availableSkills` após adição de `entryMetadata`:
     * {
     *   id: number,
     *   animationId: number,
     *   damage: Damage,
     *   description: string,
     *   effects: Effect[],
     *   hitType: number,
     *   iconIndex: number,
     *   message1: string,
     *   message2: string,
     *   mpCost: number,
     *   name: string,
     *   note: string,
     *   occasion: number,
     *   repeats: number,
     *   requiredWtypeId1: number,
     *   requiredWtypeId2: number,
     *   scope: number,
     *   speed: number,
     *   stypeId: number,
     *   successRate: number,
     *   tpCost: number,
     *   tpGain: number,
     *   messageType: number,
     *   meta: Meta,
     *   ludosPrice: number,
     *   skillLearned: boolean
     * }
     *
     * Estrutura de `entryMetadata` extraída do campo Notes:
     * {
     *   ludosPrice: number,            // Preço da habilidade
     *   skillLearned: boolean          // Status de aprendizado
     * }
     */
    const availableSkills = classData.learnings
      .map(entry => {
        const skill = $dataSkills[entry.skillId];
        if (!skill) {
          return null; // Ignora entradas inválidas
        }

        // Extrai os metadados do campo Notes
        let entryMetadata;
        if (entry.note.trim().length > 0) {
          entryMetadata = JSON.parse(JSON.parse(entry.note.trim()));
        }

        if (!entryMetadata?.ludosPrice) {
          return null; // Ignora habilidades sem preço configurado
        }

        // Combina os dados da habilidade com os metadados
        return {
          ...skill,
          ...entryMetadata,
        };
      })
      .filter(skill => skill !== null); // Remove entradas nulas

    // Ordena as habilidades por preço
    availableSkills.sort((a, b) => a.ludosPrice - b.ludosPrice);

    console.log('[Coreto_Skill_Shop] Habilidades disponíveis:', availableSkills);

    // Converte as habilidades em formato compatível com goods
    const availableSkillsGoods = convertAvailableSkillsDataToGoods(availableSkills);

    // Chama a cena da loja com goods e define "somente compra"
    console.log('[Coreto_Skill_Shop] Vai abrir a loja de skill.');
    SceneManager.push(Scene_SkillShop);
    SceneManager.prepareNextScene(availableSkillsGoods, false, actorId);
  }

  /**
   * Converte os dados de habilidades disponíveis para o formato `goods`.
   *
   * Estrutura de `goods`:
   * [
   *   [itemType, itemId, priceAdjustment, sellAdjustment],
   *   ...
   * ]
   *
   * Exemplo:
   * [
   *   [3, 172, 50, 0], // itemType = 3 (habilidade), itemId = 172, preço = 50
   *   ...
   * ]
   *
   * @param {Array} availableSkills - Lista de habilidades filtradas.
   * @returns {Array} Lista no formato compatível com `goods`.
   */
  function convertAvailableSkillsDataToGoods(availableSkills) {
    return availableSkills.map(skill => {
      return [3, skill.id, skill.ludosPrice, skill.ludosPrice]; // itemType = 3 para habilidades
    });
  }

  // Expor a função globalmente para ser chamada via script
  window.CoretoSkillShop = {
    openSkillShop,
  };
})();
