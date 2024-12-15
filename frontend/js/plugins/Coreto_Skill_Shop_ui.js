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
    prepare(skills, purchaseOnly) {
      super.prepare(skills, purchaseOnly);
    }

    create() {
      super.create();
    }

    doBuy(number) {
      CoretoCurrency.spendCurrency(number * this.buyingPrice());

      // TODO: Usar coreto_skill_learn_control.js para adicionar habilidade
      // $gameParty.gainItem(this._item, number);
    }

    maxBuy() {
      return 1;
    }

    createGoldWindow() {
      console.log('Método createGoldWindow chamado');
      const rect = this.goldWindowRect();
      this._goldWindow = new Window_Ludos(rect); // Show Ludos instead of gold
      this.addWindow(this._goldWindow);
    }
  }

  Window_ShopBuy.prototype.goodsToItem = function (goods) {
    switch (goods[0]) {
      case 0:
        return $dataItems[goods[1]]; // Itens
      case 1:
        return $dataWeapons[goods[1]]; // Armas
      case 2:
        return $dataArmors[goods[1]]; // Armaduras
      case 3:
        return $dataSkills[goods[1]]; // Skills
      default:
        return null;
    }
  };

  window.Scene_SkillShop = Scene_SkillShop;
})();
