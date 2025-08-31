//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.js
//=============================================================================

/**
 * Classe de domínio da Mina de Kravens seguindo princípios de Clean Architecture
 * Contém apenas JavaScript puro, sem dependências do RPG Maker
 */
class MinaKravensDomain {
  constructor(config) {
    this.totalKravensNecessarios = config.totalKravensNecessarios;
    this.totalKravensNaMina = config.totalKravensNaMina;
    this.idItemKraven = config.idItemKraven;
    this.idItemPedra = config.idItemPedra;
    this.idVarKravensColetados = config.idVarKravensColetados;
    this.idVarPilhasRestantes = config.idVarPilhasRestantes;
    this.idVarEstadoBoss = config.idVarEstadoBoss;

    // Services (injetados via dependência)
    this.coreService = config.coreService;
    this.questService = config.questService;
    this.logger = config.logger;

    // Estado dinâmico
    this.kravensColetados = 0;
    this.pilhasRestantes = this.totalKravensNaMina;
  }

  /**
   * Sincroniza o estado com as variáveis do jogo
   */
  syncFromGameVariables() {
    this.kravensColetados = this.coreService.getGameVariable(this.idVarKravensColetados, 0);

    if (this.idVarPilhasRestantes > 0) {
      let pilhasRestantesSalvas = this.coreService.getGameVariable(this.idVarPilhasRestantes, 0);

      // Inicializa no primeiro uso de um novo jogo (quando ambas estão 0)
      if (pilhasRestantesSalvas <= 0 && this.kravensColetados <= 0) {
        pilhasRestantesSalvas = this.totalKravensNaMina;
        this.coreService.setGameVariable(this.idVarPilhasRestantes, pilhasRestantesSalvas);
      }

      this.pilhasRestantes = pilhasRestantesSalvas;
    }
  }

  /**
   * Calcula a chance de drop de Kraven baseado nas pilhas restantes
   */
  calcularChanceKraven(pilhasRestantesParaMeta) {
    this.logger.debug('Estado antes do cálculo de chance', {
      kravensColetados: this.kravensColetados,
      totalNecessarios: this.totalKravensNecessarios,
      pilhasRestantesParaMeta,
    });

    const kravensRestantesParaConcluir = this.totalKravensNecessarios - this.kravensColetados;

    // Se o número de pilhas restantes é igual ao número de Kravens que faltam, chance = 100%
    if (pilhasRestantesParaMeta <= kravensRestantesParaConcluir - 1) {
      return 100;
    }

    // Fórmula para chance gradual (limitada a 100%)
    const chancePercentual = (kravensRestantesParaConcluir / pilhasRestantesParaMeta) * 100;
    const chanceFinal = Math.min(chancePercentual, 100);
    this.logger.debug('Chance calculada (%)', chanceFinal);
    return chanceFinal;
  }

  /**
   * Verifica se a quest foi completada
   */
  isQuestCompleta() {
    return this.kravensColetados >= this.totalKravensNecessarios;
  }

  /**
   * Verifica se deve ativar a rachadura (falta apenas 1 Kraven)
   */
  shouldAtivarRachadura() {
    return this.kravensColetados === this.totalKravensNecessarios - 1;
  }

  /**
   * Ativa a rachadura e atualiza o estado do boss
   */
  ativarRachadura() {
    this.logger.warn('Rachadura ativada! Preparando para liberação do boss.');
    this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
  }

  /**
   * Atualiza as variáveis do jogo após mineração
   */
  updateGameState() {
    this.coreService.setGameVariable(this.idVarKravensColetados, this.kravensColetados);
    if (this.idVarPilhasRestantes > 0) {
      this.coreService.setGameVariable(this.idVarPilhasRestantes, this.pilhasRestantes);
    }
  }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinaKravensDomain;
} else if (typeof window !== 'undefined') {
  window.MinaKravensDomain = MinaKravensDomain;
}
