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
  class Scene_SkillShop extends Scene_Shop {
    prepare(goods, purchaseOnly) {
      /**
       * goods structure:
       * [
          [
            3,
            172,
            50,
            0,
          ]
            ...
        ]
       */
      console.log('Preparando Scene_SkillShop com goods:', goods);
      super.prepare(goods, purchaseOnly);
      this._currencyVariable = 1; // ID da variável usada para Ludos
    }

    create() {
      console.log('Criando Scene_SkillShop');
      super.create();
    }

    buyingPrice() {
      console.log('Método buyingPrice chamado');
      return this._buyWindow.price(this._item);
    }

    doBuy(number) {
      console.log('Método doBuy chamado', number);
      // Usar o outro plugin para remover Ludos
      // $gameParty.loseGold(number * this.buyingPrice());
      // Usar coreto_skill_learn_control.js para adicionar habilidade
      // $gameParty.gainItem(this._item, number);
    }

    maxBuy() {
      console.log('Método doBuy chamado');
      Scene_Shop.prototype.maxBuy.call(this);
      return 1; // Apenas uma unidade por habilidade
    }

    onBuyOk() {
      console.log('Método onBuyOk chamado');
      this._item = this._buyWindow.item();
      this._buyWindow.hide();
      this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
      this._numberWindow.setCurrencyUnit(this.currencyUnit());
      this._numberWindow.show();
      this._numberWindow.activate();
    }

    createGoldWindow() {
      console.log('Método createGoldWindow chamado');
      const rect = this.goldWindowRect();
      this._goldWindow = new Window_Ludos(rect);
      this.addWindow(this._goldWindow);
    }
  }

  Scene_SkillShop.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createGoldWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createStatusWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
  };

  Window_ShopBuy.prototype.goodsToItem = function (goods) {
    switch (goods[0]) {
      case 0:
        return $dataItems[goods[1]]; // Itens
      case 1:
        return $dataWeapons[goods[1]]; // Armas
      case 2:
        return $dataArmors[goods[1]]; // Armaduras
      case 3:
        // console.log('Habilidade:', goods[1]);
        // const dataSkill = $dataSkills[goods[1]]; // Gets skill from skill database.
        // dataSkill.price = goods[2]; // Adds price to skill
        return $dataSkills[goods[1]];
      default:
        return null;
    }
  };

  Window_ShopBuy.prototype.drawItem = function (index) {
    const item = this.itemAt(index);
    const price = this.price(item);
    const rect = this.itemLineRect(index);
    const priceWidth = this.priceWidth();
    const priceX = rect.x + rect.width - priceWidth;
    const nameWidth = rect.width - priceWidth;
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, nameWidth);
    this.drawText(price, priceX, rect.y, priceWidth, 'right');
    this.changePaintOpacity(true);
  };

  Window_ShopBuy.prototype.price = function (item) {
    return this._price[this._data.indexOf(item)] || 0;
  };

  // Registrar a cena globalmente
  window.Scene_SkillShop = Scene_SkillShop;
})();
