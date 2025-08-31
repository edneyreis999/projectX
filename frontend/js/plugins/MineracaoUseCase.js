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
    // Obtém o estado atual do jogo
    const kravensJaColetados = this._obterKravensColetados();
    const pilhasJaMineradas = this._obterPilhasJaMineradas();

    this.logger.info('Iniciando mineração', {
      pilhaId,
      kravensJaColetados,
      pilhasJaMineradas,
      pilhasRestantes: this.totalPilhasDisponiveis - pilhasJaMineradas,
    });

    // Executa a mineração usando o domínio
    const resultado = this.domain.executarMineracao(kravensJaColetados, pilhasJaMineradas);

    this.logger.info('Resultado da mineração', resultado);

    // Processa o resultado
    this._processarResultado(resultado);

    return resultado.tipo;
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

    // Se não há variável de controle, assume que nenhuma pilha foi minerada
    return 0;
  }

  /**
   * Processa o resultado da mineração
   * @private
   * @param {Object} resultado - Resultado retornado pelo domínio
   */
  _processarResultado(resultado) {
    // Adiciona o item apropriado ao inventário
    const itemId = resultado.tipo === 'Kraven' ? this.idItemKraven : this.idItemPedra;
    this._adicionarItem(itemId);

    // Atualiza as variáveis do jogo
    this._atualizarVariaveisJogo(resultado);

    // Ativa rachadura se necessário
    if (resultado.deveAtivarRachadura) {
      this._ativarRachadura();
    }

    this.logger.info(`${resultado.tipo} obtido!`, {
      kravensColetados: resultado.kravensColetados,
      pilhasRestantes: resultado.pilhasRestantes,
      questCompleta: resultado.questCompleta,
    });
  }

  /**
   * Atualiza as variáveis do jogo com o novo estado
   * @private
   * @param {Object} resultado - Resultado da mineração
   */
  _atualizarVariaveisJogo(resultado) {
    this.coreService.setGameVariable(this.idVarKravensColetados, resultado.kravensColetados);

    if (this.idVarPilhasRestantes > 0) {
      this.coreService.setGameVariable(this.idVarPilhasRestantes, resultado.pilhasRestantes);
    }
  }

  /**
   * Ativa a rachadura e atualiza o estado do boss
   * @private
   */
  _ativarRachadura() {
    this.logger.warn('Rachadura ativada! Preparando para liberação do boss.');
    this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
  }

  /**
   * Adiciona item ao inventário usando o serviço de quest
   * @private
   * @param {number} itemId - ID do item
   */
  _adicionarItem(itemId) {
    const success = this.questService.addItemToInventory(itemId, 1);
    if (!success) {
      this.logger.error('Falha ao adicionar item ao inventário:', itemId);
    }
    return success;
  }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MineracaoUseCase;
} else if (typeof window !== 'undefined') {
  window.MineracaoUseCase = MineracaoUseCase;
}
