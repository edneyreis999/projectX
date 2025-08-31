//=============================================================================
// Use Case: Mineração (Clean Architecture - Use Case Layer)
// MineracaoUseCase.js
//=============================================================================

/**
 * Use Case para mineração na Mina de Kravens
 * Contém apenas JavaScript puro, sem dependências do RPG Maker
 */
class MineracaoUseCase {
  constructor(domain, questService, logger) {
    this.domain = domain;
    this.questService = questService;
    this.logger = logger;
  }

  /**
   * Executa a mineração de uma pilha
   * @param {number} pilhaId - ID da pilha (evento)
   * @returns {string} 'Kraven' | 'Pedra'
   */
  executarMineracao(pilhaId) {
    // Sincroniza estado com as variáveis do jogo
    this.domain.syncFromGameVariables();

    this.logger.info('Iniciando mineração', {
      pilhaId,
      pilhasRestantes: this.domain.pilhasRestantes,
      kravensColetados: this.domain.kravensColetados,
    });

    // Se o jogador já coletou todos os Kravens necessários, sempre retorna pedra
    if (this.domain.isQuestCompleta()) {
      this._consumirPilha();
      this._adicionarItem(this.domain.idItemPedra);
      this.logger.info('Pedra obtida. Nenhum Kraven necessário.', {
        pilhasRestantes: this.domain.pilhasRestantes,
      });
      return 'Pedra';
    }

    // Calcula a chance de drop
    const pilhasRestantesParaMeta = this.domain.pilhasRestantes - this.domain.kravensColetados;
    this._consumirPilha();

    const chanceDeObterKraven = this.domain.calcularChanceKraven(pilhasRestantesParaMeta);
    this.logger.info('Chance de obter Kraven (%)', chanceDeObterKraven);

    // Determina o resultado
    if (Math.random() * 100 <= chanceDeObterKraven) {
      return this._processarKravenObtido();
    } else {
      return this._processarPedraObtida();
    }
  }

  /**
   * Consome uma pilha da mina
   * @private
   */
  _consumirPilha() {
    this.domain.pilhasRestantes = Math.max(0, this.domain.pilhasRestantes - 1);
    this.logger.debug('Pilha consumida', { pilhasRestantes: this.domain.pilhasRestantes });
  }

  /**
   * Processa a obtenção de um Kraven
   * @private
   */
  _processarKravenObtido() {
    this._adicionarItem(this.domain.idItemKraven);
    this.domain.kravensColetados++;
    this.domain.updateGameState();

    this.logger.info('Kraven obtido!', { totalColetado: this.domain.kravensColetados });

    // Verifica se deve ativar a rachadura
    if (this.domain.shouldAtivarRachadura()) {
      this.domain.ativarRachadura();
    }

    return 'Kraven';
  }

  /**
   * Processa a obtenção de uma Pedra
   * @private
   */
  _processarPedraObtida() {
    this._adicionarItem(this.domain.idItemPedra);
    this.domain.updateGameState();
    this.logger.info('Pedra obtida.');
    return 'Pedra';
  }

  /**
   * Adiciona item ao inventário usando o serviço de quest
   * @private
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
