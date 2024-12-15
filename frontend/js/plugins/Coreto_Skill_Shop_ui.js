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

    createSellWindow() {
      const rect = this.sellWindowRect();
      this._sellWindow = new Window_SkillShopSell(rect);
      this._sellWindow.setupActor(this._actor.actorId());
      this._sellWindow.setHelpWindow(this._helpWindow);
      this._sellWindow.hide();
      this._sellWindow.setHandler('ok', this.onSellOk.bind(this));
      this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
      this._categoryWindow.setItemWindow(this._sellWindow);
      this.addWindow(this._sellWindow);
      if (!this._categoryWindow.needsSelection()) {
        this._sellWindow.y -= this._categoryWindow.height;
        this._sellWindow.height += this._categoryWindow.height;
      }
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
     * Realiza a venda de uma habilidade, adicionando o valor em Ludos e esquecendo a habilidade.
     * @param {number} number - Quantidade de habilidades a vender (sempre 1 no Skill Shop).
     */
    doSell(number) {
      CoretoCurrency.addCurrency(number * this.sellingPrice());
      CoretoSkillLearnControl.forgetSkillAfterSell(this._actor.actorId(), this._item.id);
    }

    /**
     * Define a quantidade máxima de compras permitida (sempre 1 para habilidades).
     * @returns {number} Sempre retorna 1.
     */
    maxBuy() {
      return 1;
    }

    sellingPrice() {
      return this._item.ludosPrice || 0;
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

  class Window_SkillShopSell extends Window_ShopSell {
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
     * Retorna as habilidades aprendidas pelo ator, filtrando apenas as habilidades
     * configuradas no Skill Shop (com LudosPrice) e pertencentes à classe atual.
     * @returns {Array} Lista de habilidades aprendidas filtradas.
     */
    items() {
      // Obtém os dados da classe do ator
      const classData = this._actor.currentClass();
      if (!classData) {
        console.warn(`[${pluginName}] Classe atual não encontrada para o ator ${this._actor.actorId()}.`);
        return [];
      }

      // Filtra habilidades aprendíveis da classe
      const classSkills = classData.learnings
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

      // Filtra as habilidades aprendidas pelo ator
      const learnedSkills = classSkills.filter(skill => this._actor.isLearnedSkill(skill.id));

      console.log(`[${pluginName}] Habilidades filtradas:`, learnedSkills);
      return learnedSkills;
    }

    /**
     * Atualiza o conteúdo da janela.
     */
    refresh() {
      this.makeItemList();
      this.createContents();
      this.drawAllItems();
    }

    /**
     * Prepara a lista de itens (habilidades).
     */
    makeItemList() {
      this._data = this.items();
    }

    isEnabled() {
      return true;
    }

    /**
     * Retorna o item selecionado.
     * @returns {Object} A habilidade selecionada.
     */
    item() {
      return this._data[this.index()];
    }
  }

  // Expõe as classes globalmente para uso no SceneManager.
  window.Scene_SkillShop = Scene_SkillShop;
  window.Window_SkillShopBuy = Window_SkillShopBuy;
  window.Window_SkillShopSell = Window_SkillShopSell;
})();
