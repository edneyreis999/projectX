//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.js
//=============================================================================

/**
 * Classe de domínio da Mina de Kravens seguindo princípios de Domain Driven Design
 * Contém apenas JavaScript puro, sem dependências externas
 * Responsável apenas pela regra de negócio da mineração
 */
class MinaKravensDomain {
  constructor(totalKravensNecessarios, totalPilhasDisponiveis) {
    this.totalKravensNecessarios = totalKravensNecessarios;
    this.totalPilhasDisponiveis = totalPilhasDisponiveis;
  }

  /**
   * Determina o resultado da mineração baseado no estado atual
   * @param {number} kravensJaColetados - Quantidade de Kravens já coletados
   * @param {number} pilhasJaMineradas - Quantidade de pilhas já mineradas
   * @returns {Object} Resultado da mineração com tipo e informações adicionais
   */
  executarMineracao(kravensJaColetados, pilhasJaMineradas) {
    const pilhasRestantes = this.totalPilhasDisponiveis - pilhasJaMineradas;

    // Se o jogador já coletou todos os Kravens necessários, sempre retorna pedra
    if (this.isQuestCompleta(kravensJaColetados)) {
      return {
        tipo: 'Pedra',
        questCompleta: true,
        pilhasRestantes: pilhasRestantes - 1,
        kravensColetados: kravensJaColetados,
      };
    }

    // Calcula a chance de drop de Kraven
    const pilhasRestantesAposMineracao = pilhasRestantes - 1;
    const chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);

    // Determina o resultado
    const obteuKraven = Math.random() * 100 <= chanceDeObterKraven;
    const novosKravensColetados = obteuKraven ? kravensJaColetados + 1 : kravensJaColetados;

    return {
      tipo: obteuKraven ? 'Kraven' : 'Pedra',
      questCompleta: this.isQuestCompleta(novosKravensColetados),
      deveAtivarRachadura: this.shouldAtivarRachadura(novosKravensColetados),
      pilhasRestantes: pilhasRestantesAposMineracao,
      kravensColetados: novosKravensColetados,
      chanceCalculada: chanceDeObterKraven,
    };
  }

  /**
   * Calcula a chance de drop de Kraven baseado no estado atual
   * @param {number} kravensJaColetados - Kravens já coletados
   * @param {number} pilhasRestantes - Pilhas restantes após a mineração atual
   * @returns {number} Chance em percentual (0-100)
   */
  calcularChanceKraven(kravensJaColetados, pilhasRestantes) {
    const kravensRestantesParaConcluir = this.totalKravensNecessarios - kravensJaColetados;

    // Se não há pilhas restantes, não pode obter Kraven
    if (pilhasRestantes <= 0) {
      return 0;
    }

    // Se o número de pilhas restantes é igual ou menor ao número de Kravens que faltam, chance = 100%
    // Isso garante que o jogador sempre conseguirá os Kravens restantes
    if (pilhasRestantes <= kravensRestantesParaConcluir) {
      return 100;
    }

    // Fórmula para chance gradual (limitada a 100%)
    const chancePercentual = (kravensRestantesParaConcluir / pilhasRestantes) * 100;
    return Math.min(chancePercentual, 100);
  }

  /**
   * Verifica se a quest foi completada
   * @param {number} kravensColetados - Quantidade de Kravens coletados
   * @returns {boolean}
   */
  isQuestCompleta(kravensColetados) {
    return kravensColetados >= this.totalKravensNecessarios;
  }

  /**
   * Verifica se deve ativar a rachadura (falta apenas 1 Kraven)
   * @param {number} kravensColetados - Quantidade de Kravens coletados
   * @returns {boolean}
   */
  shouldAtivarRachadura(kravensColetados) {
    return kravensColetados === this.totalKravensNecessarios - 1;
  }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinaKravensDomain;
} else if (typeof window !== 'undefined') {
  window.MinaKravensDomain = MinaKravensDomain;
}
