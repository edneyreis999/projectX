//=============================================================================
// Use Case: Mineração (Clean Architecture - Use Case Layer)
// MineracaoUseCase.js
//=============================================================================

/**
 * Use Case para mineração na Mina de Kravens
 * Responsável por orquestrar a regra de negócio do domínio com os services
 */
class MineracaoUseCase {
  constructor(domain, coreService, questService, logger, config) {
    this.domain = domain;
    this.coreService = coreService;
    this.questService = questService;
    this.logger = logger;

    // Configuração dos IDs e variáveis do RPG Maker
    this.idItemKraven = config.idItemKraven;
    this.idItemPedra = config.idItemPedra;
    this.idVarKravensColetados = config.idVarKravensColetados;
    this.idVarPilhasRestantes = config.idVarPilhasRestantes;
    this.idVarEstadoBoss = config.idVarEstadoBoss;
    this.totalPilhasDisponiveis = config.totalPilhasDisponiveis;
  }

  /**
   * Executa a mineração de uma pilha
   * @param {number} pilhaId - ID da pilha (evento)
   * @returns {string} 'Kraven' | 'Pedra'
   */
  executarMineracao(pilhaId) {
    try {
      // Obtém o estado atual do jogo
      const kravensJaColetados = this._obterKravensColetados();
      const pilhasJaMineradas = this._obterPilhasJaMineradas();
      const rachaduraJaAtivada = this._verificarSeRachaduraJaFoiAtivada();

      // Executa a mineração usando o domínio COM o parâmetro da rachadura
      const resultado = this.domain.executarMineracao(kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada);

      // Log crítico apenas para resultados importantes
      if (resultado.deveAtivarRachadura || resultado.questCompleta) {
        this.logger.info('Resultado crítico da mineração:', {
          tipo: resultado.tipo,
          deveAtivarRachadura: resultado.deveAtivarRachadura,
          questCompleta: resultado.questCompleta,
          kravensColetados: resultado.kravensColetados,
        });
      }

      // Processa o resultado
      this._processarResultado(resultado);

      return resultado.tipo;
    } catch (error) {
      this.logger.error('Erro durante executarMineracao:', {
        error: error.message,
        stack: error.stack,
        pilhaId,
      });
      throw error;
    }
  }

  /**
   * Obtém a quantidade de Kravens já coletados
   * @private
   * @returns {number}
   */
  _obterKravensColetados() {
    return this.coreService.getGameVariable(this.idVarKravensColetados, 0);
  }

  /**
   * Obtém a quantidade de pilhas já mineradas
   * @private
   * @returns {number}
   */
  _obterPilhasJaMineradas() {
    if (this.idVarPilhasRestantes > 0) {
      const pilhasRestantesSalvas = this.coreService.getGameVariable(this.idVarPilhasRestantes, 0);

      // Inicializa no primeiro uso de um novo jogo (quando ambas estão 0)
      if (pilhasRestantesSalvas <= 0 && this._obterKravensColetados() <= 0) {
        this.coreService.setGameVariable(this.idVarPilhasRestantes, this.totalPilhasDisponiveis);
        return 0; // Nenhuma pilha foi minerada ainda
      }

      return this.totalPilhasDisponiveis - pilhasRestantesSalvas;
    }

    return 0;
  }

  /**
   * Processa o resultado da mineração
   * @private
   * @param {Object} resultado - Resultado retornado pelo domínio
   */
  _processarResultado(resultado) {
    try {
      // Adiciona o item apropriado ao inventário
      const itemId = resultado.tipo === 'Kraven' ? this.idItemKraven : this.idItemPedra;
      this._adicionarItem(itemId);

      // Atualiza as variáveis do jogo
      this._atualizarVariaveisJogo(resultado);

      // Ativa rachadura se necessário
      if (resultado.deveAtivarRachadura) {
        this.logger.warn('Rachadura ativada! Boss liberado.');
        this._ativarRachadura();
      }
    } catch (error) {
      this.logger.error('Erro durante _processarResultado:', {
        error: error.message,
        stack: error.stack,
        resultado,
      });
      throw error;
    }
  }

  /**
   * Atualiza as variáveis do jogo com o novo estado
   * @private
   * @param {Object} resultado - Resultado da mineração
   */
  _atualizarVariaveisJogo(resultado) {
    try {
      this.coreService.setGameVariable(this.idVarKravensColetados, resultado.kravensColetados);

      if (this.idVarPilhasRestantes > 0) {
        this.coreService.setGameVariable(this.idVarPilhasRestantes, resultado.pilhasRestantes);
      }
    } catch (error) {
      this.logger.error('Erro durante _atualizarVariaveisJogo:', {
        error: error.message,
        stack: error.stack,
        resultado,
      });
      throw error;
    }
  }

  /**
   * Ativa a rachadura e atualiza o estado do boss
   * @private
   */
  _ativarRachadura() {
    try {
      // PROTEÇÃO: Só atualiza estado do boss se a variável for válida
      if (this.idVarEstadoBoss > 0) {
        this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
      }
    } catch (error) {
      this.logger.error('Erro durante _ativarRachadura:', {
        error: error.message,
        idVarEstadoBoss: this.idVarEstadoBoss,
      });
      // NÃO re-lança o erro para não quebrar a mineração
    }
  }

  /**
   * Adiciona item ao inventário usando o serviço de quest
   * @private
   * @param {number} itemId - ID do item
   */
  _adicionarItem(itemId) {
    try {
      return this.questService.addItemToInventory(itemId, 1);
    } catch (error) {
      this.logger.error('Erro durante _adicionarItem:', {
        error: error.message,
        itemId,
      });
      throw error;
    }
  }

  /**
   * Verifica se a rachadura já foi ativada checando o estado do boss
   * @private
   * @returns {boolean}
   */
  _verificarSeRachaduraJaFoiAtivada() {
    const estadoBoss = this.coreService.getGameVariable(this.idVarEstadoBoss, 0);
    return estadoBoss >= 1;
  }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MineracaoUseCase;
} else if (typeof window !== 'undefined') {
  window.MineracaoUseCase = MineracaoUseCase;
}
