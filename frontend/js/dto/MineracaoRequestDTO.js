//=============================================================================
// DTO: Mineração Request (Clean Architecture - DTO Layer)
// MineracaoRequestDTO.js
//=============================================================================

(function () {
  'use strict';

  /**
   * DTO para request de mineração
   * Encapsula os dados necessários para executar uma mineração
   * Garante que os dados estejam validados e no formato correto
   */
  class MineracaoRequestDTO {
    /**
     * @param {Object} data - Dados da request
     * @param {number} data.kravensJaColetados - Quantidade de Kravens já coletados
     * @param {number} data.pilhasJaMineradas - Quantidade de pilhas já mineradas
     * @param {boolean} data.rachaduraJaAtivada - Se a rachadura já foi ativada
     */
    constructor({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada = false }) {
      this._validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada });

      this.kravensJaColetados = kravensJaColetados;
      this.pilhasJaMineradas = pilhasJaMineradas;
      this.rachaduraJaAtivada = rachaduraJaAtivada;
    }

    /**
     * Valida os dados de entrada
     * @private
     * @param {Object} data - Dados a serem validados
     */
    _validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada }) {
      if (typeof kravensJaColetados !== 'number' || kravensJaColetados < 0) {
        throw new Error('kravensJaColetados deve ser um número não negativo');
      }

      if (typeof pilhasJaMineradas !== 'number' || pilhasJaMineradas < 0) {
        throw new Error('pilhasJaMineradas deve ser um número não negativo');
      }

      if (typeof rachaduraJaAtivada !== 'boolean') {
        throw new Error('rachaduraJaAtivada deve ser um boolean');
      }
    }

    /**
     * Retorna uma representação em objeto simples para serialização
     * @returns {Object}
     */
    toPlainObject() {
      return {
        kravensJaColetados: this.kravensJaColetados,
        pilhasJaMineradas: this.pilhasJaMineradas,
        rachaduraJaAtivada: this.rachaduraJaAtivada,
      };
    }

    /**
     * Cria uma instância a partir de um objeto simples
     * @static
     * @param {Object} data - Dados do objeto
     * @returns {MineracaoRequestDTO}
     */
    static fromPlainObject(data) {
      return new MineracaoRequestDTO(data);
    }

    /**
     * Valida se todos os campos obrigatórios estão presentes
     * @returns {boolean}
     */
    isValid() {
      return (
        typeof this.kravensJaColetados === 'number' &&
        typeof this.pilhasJaMineradas === 'number' &&
        typeof this.rachaduraJaAtivada === 'boolean' &&
        this.kravensJaColetados >= 0 &&
        this.pilhasJaMineradas >= 0
      );
    }
  }

  // Exporta a classe para uso em outros módulos
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MineracaoRequestDTO;
  } else if (typeof window !== 'undefined') {
    window.MineracaoRequestDTO = MineracaoRequestDTO;
  }
})();
