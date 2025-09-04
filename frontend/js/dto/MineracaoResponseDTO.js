//=============================================================================
// DTO: Mineração Response (Clean Architecture - DTO Layer)
// MineracaoResponseDTO.js
//=============================================================================

(function () {
  'use strict';

  /**
   * DTO para response de mineração
   * Encapsula o resultado da execução de uma mineração
   * Garante tipagem e estrutura consistente dos dados de retorno
   */
  class MineracaoResponseDTO {
    /**
     * @param {Object} data - Dados da response
     * @param {string} data.tipo - Tipo do resultado ('Kraven' | 'Pedra')
     * @param {boolean} data.questCompleta - Se a quest foi completada
     * @param {boolean} data.deveAtivarRachadura - Se deve ativar a rachadura
     * @param {number} data.pilhasRestantes - Pilhas restantes após mineração
     * @param {number} data.kravensColetados - Total de Kravens coletados
     * @param {number} data.chanceCalculada - Chance calculada em percentual
     */
    constructor({ tipo, questCompleta, deveAtivarRachadura, pilhasRestantes, kravensColetados, chanceCalculada }) {
      this._validateInputs({
        tipo,
        questCompleta,
        deveAtivarRachadura,
        pilhasRestantes,
        kravensColetados,
        chanceCalculada,
      });

      this.tipo = tipo;
      this.questCompleta = questCompleta;
      this.deveAtivarRachadura = deveAtivarRachadura;
      this.pilhasRestantes = pilhasRestantes;
      this.kravensColetados = kravensColetados;
      this.chanceCalculada = chanceCalculada;
    }

    /**
     * Valida os dados de entrada
     * @private
     * @param {Object} data - Dados a serem validados
     */
    _validateInputs({ tipo, questCompleta, deveAtivarRachadura, pilhasRestantes, kravensColetados, chanceCalculada }) {
      if (!['Kraven', 'Pedra'].includes(tipo)) {
        throw new Error('tipo deve ser "Kraven" ou "Pedra"');
      }

      if (typeof questCompleta !== 'boolean') {
        throw new Error('questCompleta deve ser um boolean');
      }

      if (typeof deveAtivarRachadura !== 'boolean') {
        throw new Error('deveAtivarRachadura deve ser um boolean');
      }

      if (typeof pilhasRestantes !== 'number') {
        throw new Error('pilhasRestantes deve ser um número');
      }

      if (typeof kravensColetados !== 'number' || kravensColetados < 0) {
        throw new Error('kravensColetados deve ser um número não negativo');
      }

      if (typeof chanceCalculada !== 'number' || chanceCalculada < 0 || chanceCalculada > 100) {
        throw new Error('chanceCalculada deve ser um número entre 0 e 100');
      }
    }

    /**
     * Verifica se o resultado foi um Kraven
     * @returns {boolean}
     */
    isKraven() {
      return this.tipo === 'Kraven';
    }

    /**
     * Verifica se o resultado foi uma Pedra
     * @returns {boolean}
     */
    isPedra() {
      return this.tipo === 'Pedra';
    }

    /**
     * Verifica se a quest está completa
     * @returns {boolean}
     */
    isQuestComplete() {
      return this.questCompleta;
    }

    /**
     * Verifica se deve ativar rachadura
     * @returns {boolean}
     */
    shouldActivateCrack() {
      return this.deveAtivarRachadura;
    }

    /**
     * Retorna as estatísticas da mineração
     * @returns {Object}
     */
    getStats() {
      return {
        kravensColetados: this.kravensColetados,
        pilhasRestantes: this.pilhasRestantes,
        chanceCalculada: this.chanceCalculada,
      };
    }

    /**
     * Retorna uma representação em objeto simples para serialização
     * @returns {Object}
     */
    toPlainObject() {
      return {
        tipo: this.tipo,
        questCompleta: this.questCompleta,
        deveAtivarRachadura: this.deveAtivarRachadura,
        pilhasRestantes: this.pilhasRestantes,
        kravensColetados: this.kravensColetados,
        chanceCalculada: this.chanceCalculada,
      };
    }

    /**
     * Cria uma instância a partir de um objeto simples
     * @static
     * @param {Object} data - Dados do objeto
     * @returns {MineracaoResponseDTO}
     */
    static fromPlainObject(data) {
      return new MineracaoResponseDTO(data);
    }

    /**
     * Cria uma response de sucesso com Kraven
     * @static
     * @param {Object} data - Dados adicionais
     * @returns {MineracaoResponseDTO}
     */
    static createKravenResponse(data) {
      return new MineracaoResponseDTO({
        tipo: 'Kraven',
        ...data,
      });
    }

    /**
     * Cria uma response de sucesso com Pedra
     * @static
     * @param {Object} data - Dados adicionais
     * @returns {MineracaoResponseDTO}
     */
    static createPedraResponse(data) {
      return new MineracaoResponseDTO({
        tipo: 'Pedra',
        ...data,
      });
    }

    /**
     * Valida se todos os campos obrigatórios estão presentes e válidos
     * @returns {boolean}
     */
    isValid() {
      return (
        ['Kraven', 'Pedra'].includes(this.tipo) &&
        typeof this.questCompleta === 'boolean' &&
        typeof this.deveAtivarRachadura === 'boolean' &&
        typeof this.pilhasRestantes === 'number' &&
        typeof this.kravensColetados === 'number' &&
        typeof this.chanceCalculada === 'number' &&
        this.kravensColetados >= 0 &&
        this.chanceCalculada >= 0 &&
        this.chanceCalculada <= 100
      );
    }
  }

  // Exporta a classe para uso em outros módulos
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MineracaoResponseDTO;
  } else if (typeof window !== 'undefined') {
    window.MineracaoResponseDTO = MineracaoResponseDTO;
  }
})();
