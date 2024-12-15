//=============================================================================
// RPG Maker MZ - Coreto Skill Shop UI
// Coreto_Skill_Shop_ui.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Interface gráfica para o sistema de compra de habilidades no Coreto.
 * @help
 * ----------------------------------------------------------------------------
 * Este plugin cria a interface gráfica para exibir habilidades disponíveis
 * para compra na loja de habilidades.
 * ----------------------------------------------------------------------------
 */

(() => {
  /**
   * Scene_SkillShop
   * Sobrescreve Scene_Shop para criar uma interface customizada para o Skill Shop.
   * Utiliza a moeda alternativa (Ludos) e manipula habilidades (skills) ao invés de itens.
   */
  class Scene_SkillShop extends Scene_Shop {
    /**
     * Prepara a cena com os dados de skills e configurações de compra.
     * @param {Array} skills - Lista de habilidades disponíveis no formato goods.
     * @param {boolean} purchaseOnly - Indica se a loja é somente para compra.
     */
    prepare(skills, purchaseOnly, actorId) {
      super.prepare(skills, purchaseOnly); // Passa os dados para Scene_Shop
      this.actorId = actorId;
    }

    /**
     * Cria a interface gráfica da cena.
     * Aqui, o método pai já configura os elementos principais.
     */
    create() {
      super.create();
    }

    /**
     * Realiza a compra de uma habilidade, descontando o custo em Ludos.
     * @param {number} number - Quantidade de habilidades a comprar (sempre 1 no Skill Shop).
     */
    doBuy(number) {
      CoretoCurrency.spendCurrency(number * this.buyingPrice());
      CoretoSkillLearnControl.addSkillAfterPurchase(this.actorId, this._item.id);
    }

    /**
     * Define a quantidade máxima de compras permitida.
     * No Skill Shop, cada habilidade só pode ser comprada uma vez.
     * @returns {number} Sempre retorna 1.
     */
    maxBuy() {
      return 1;
    }

    /**
     * Substitui a janela de ouro padrão pela janela de Ludos.
     * Altera o comportamento do método para exibir a moeda alternativa.
     */
    createGoldWindow() {
      const rect = this.goldWindowRect();
      this._goldWindow = new Window_Ludos(rect); // Exibe Ludos no lugar de Gold
      this.addWindow(this._goldWindow);
    }
  }

  /**
   * Modifica a lógica de conversão de goods em itens.
   * Adiciona suporte ao tipo 3 (skills), permitindo exibir habilidades na loja.
   * @param {Array} goods - Estrutura de goods no formato [itemType, itemId, priceAdjustment, sellAdjustment].
   * @returns {Object|null} O item correspondente (ou habilidade) ou null se inválido.
   */
  Window_ShopBuy.prototype.goodsToItem = function (goods) {
    switch (goods[0]) {
      case 0:
        return $dataItems[goods[1]]; // Itens
      case 1:
        return $dataWeapons[goods[1]]; // Armas
      case 2:
        return $dataArmors[goods[1]]; // Armaduras
      case 3:
        return $dataSkills[goods[1]]; // Habilidades (Skills)
      default:
        return null; // Tipo inválido
    }
  };

  // Expõe Scene_SkillShop globalmente para que seja acessível pelo SceneManager.
  window.Scene_SkillShop = Scene_SkillShop;
})();
