//=============================================================================
// RPG Maker MZ - Coreto Currency UI
// Coreto_Currency_UI.js
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
   * Subclasse de Window_Gold para exibir a moeda Ludos.
   */
  class Window_Ludos extends Window_Gold {
    /**
     * Retorna o valor atual de Ludos.
     * @returns {number} O valor atual de Ludos.
     */
    value() {
      return CoretoCurrency.getCurrency(); // Corrigido com retorno
    }

    /**
     * Retorna o nome da moeda ("Ludos").
     * @returns {string} O nome da moeda.
     */
    currencyUnit() {
      return 'Ludos';
    }
  }

  // Registrar a janela globalmente
  window.Window_Ludos = Window_Ludos;
})();
