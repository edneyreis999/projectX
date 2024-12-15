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
  const pluginName = 'Coreto_Skill_Shop_UI';

  /**
   * Scene_SkillShop
   * Cena personalizada para gerenciar a interface do Skill Shop.
   * Estende Scene_Shop para suportar habilidades (skills) e moeda alternativa (Ludos).
   */
  class Scene_SkillShop extends Scene_Shop {
    /**
     * Prepara a cena com os dados de habilidades, configurações de compra e ID do ator.
     * @param {Array} skills - Lista de habilidades disponíveis no formato goods.
     * @param {boolean} purchaseOnly - Indica se a loja é somente para compra.
     * @param {number} actorId - ID do ator que está interagindo com a loja.
     */
    prepare(skills, purchaseOnly, actorId) {
      this.validateActor(actorId);
      if (!Array.isArray(skills) || typeof purchaseOnly !== 'boolean') {
        throw new Error(`[${pluginName}] Dados inválidos em prepare.`);
      }
      this._actor = $gameActors.actor(actorId);
      super.prepare(skills, purchaseOnly);
      console.log(`[${pluginName}] Cena preparada com actorId:`, actorId);
    }

    /**
     * Valida se o ator existe.
     * @param {number} actorId - ID do ator.
     */
    validateActor(actorId) {
      if (!$gameActors.actor(actorId)) {
        throw new Error(`[${pluginName}] Ator com ID ${actorId} não encontrado.`);
      }
    }

    /**
     * Substitui a janela de ouro padrão pela janela de Ludos.
     */
    createGoldWindow() {
      const rect = this.goldWindowRect();
      this._goldWindow = new Window_Ludos(rect);
      this.addWindow(this._goldWindow);
    }

    /**
     * Cria a janela de compra personalizada para o Skill Shop.
     */
    createBuyWindow() {
      const rect = this.buyWindowRect();
      this._buyWindow = new Window_SkillShopBuy(rect);
      this._buyWindow.setupActor(this._actor.actorId());
      this._buyWindow.setupGoods(this._goods);
      this._buyWindow.setHelpWindow(this._helpWindow);
      this._buyWindow.setStatusWindow(this._statusWindow);
      this._buyWindow.hide();
      this._buyWindow.setHandler('ok', this.onBuyOk.bind(this));
      this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
      this.addWindow(this._buyWindow);
    }

    /**
     * Realiza a compra de uma habilidade, descontando o custo em Ludos e aprendendo a habilidade.
     * @param {number} number - Quantidade de habilidades a comprar (sempre 1 no Skill Shop).
     */
    doBuy(number) {
      CoretoCurrency.spendCurrency(number * this.buyingPrice());
      CoretoSkillLearnControl.addSkillAfterPurchase(this._actor.actorId(), this._item.id);
    }

    /**
     * Define a quantidade máxima de compras permitida (sempre 1 para habilidades).
     * @returns {number} Sempre retorna 1.
     */
    maxBuy() {
      return 1;
    }
  }

  /**
   * Window_SkillShopBuy
   * Janela personalizada para exibir habilidades no Skill Shop.
   * Estende Window_ShopBuy para adaptar lógica e exibição de habilidades.
   */
  class Window_SkillShopBuy extends Window_ShopBuy {
    /**
     * Converte um objeto goods no item correspondente.
     * @param {Array} goods - Estrutura [itemType, itemId, ...].
     * @returns {Object|null} Retorna o item correspondente ou null se inválido.
     */
    goodsToItem(goods) {
      switch (goods[0]) {
        case 0:
          return $dataItems[goods[1]];
        case 1:
          return $dataWeapons[goods[1]];
        case 2:
          return $dataArmors[goods[1]];
        case 3:
          return $dataSkills[goods[1]];
        default:
          return null;
      }
    }

    /**
     * Configura o ator relacionado à janela.
     * @param {number} actorId - ID do ator.
     */
    setupActor(actorId) {
      this.validateActor(actorId);
      this._actor = $gameActors.actor(actorId);
    }

    /**
     * Valida se o ator existe.
     * @param {number} actorId - ID do ator.
     */
    validateActor(actorId) {
      if (!$gameActors.actor(actorId)) {
        throw new Error(`[${pluginName}] Ator com ID ${actorId} não encontrado.`);
      }
    }

    /**
     * Verifica se a habilidade está habilitada para compra.
     * @param {Object} skill - Objeto da habilidade.
     * @returns {boolean} Retorna true se habilitada, false caso contrário.
     */
    isEnabled(skill) {
      return super.isEnabled(skill) && !this._actor.isLearnedSkill(skill.id);
    }

    /**
     * Desenha os detalhes de uma habilidade na lista de compras.
     * @param {number} index - Índice do item na lista.
     */
    drawItem(index) {
      const item = this.itemAt(index);
      const price = this.price(item);
      const rect = this.itemLineRect(index);
      const priceWidth = this.priceWidth();
      const priceX = rect.x + rect.width - priceWidth;
      const nameWidth = rect.width - priceWidth;

      this.changePaintOpacity(this.isEnabled(item));
      this.drawSkillName(item, rect.x, rect.y, nameWidth);
      this.drawText(price, priceX, rect.y, priceWidth, 'right');
      this.changePaintOpacity(true);
    }

    /**
     * Desenha o nome da habilidade, indicando se já foi aprendida.
     * @param {Object} skill - Objeto da habilidade.
     * @param {number} x - Posição X.
     * @param {number} y - Posição Y.
     * @param {number} width - Largura disponível.
     */
    drawSkillName(skill, x, y, width) {
      if (skill) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const skillWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawIcon(skill.iconIndex, x, iconY);

        const name = this._actor.isLearnedSkill(skill.id) ? `${skill.name} (Aprendida)` : skill.name;
        this.drawText(name, x + textMargin, y, skillWidth);
      }
    }
  }

  // Expõe as classes globalmente para uso no SceneManager.
  window.Scene_SkillShop = Scene_SkillShop;
  window.Window_SkillShopBuy = Window_SkillShopBuy;
})();
