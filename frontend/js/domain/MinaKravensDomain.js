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
   * @param {boolean} rachaduraJaAtivada - Se a rachadura já foi ativada (força 100% chance)
   * @returns {Object} Resultado da mineração com tipo e informações adicionais
   */
  executarMineracao(kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada = false) {
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

    // CORREÇÃO: Calcula a chance ANTES de subtrair a pilha para garantir lógica correta
    const pilhasRestantesAposMineracao = pilhasRestantes - 1;
    const kravensRestantesParaConcluir = this.totalKravensNecessarios - kravensJaColetados;

    let chanceDeObterKraven;

    // Se é a última oportunidade para obter os Kravens restantes, garante 100%
    if (pilhasRestantes <= kravensRestantesParaConcluir) {
      chanceDeObterKraven = 100;
      if (typeof console !== 'undefined') {
        console.log('[MinaKravensDomain] Última chance - 100% garantido:', {
          pilhasRestantes,
          kravensNecessarios: kravensRestantesParaConcluir,
        });
      }
    } else {
      chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);
    }

    // CORREÇÃO DO BUG: Se rachadura já foi ativada, força 100% de chance
    if (rachaduraJaAtivada && !this.isQuestCompleta(kravensJaColetados)) {
      chanceDeObterKraven = 100;
      // Mantém log crítico sobre rachadura
      if (typeof console !== 'undefined') {
        console.log('[MinaKravensDomain] Rachadura ativada - 100% chance de Kraven');
      }
    }

    // Determina o resultado
    const randomValue = this._gerarNumeroAleatorio() * 100;
    const obteuKraven = randomValue <= chanceDeObterKraven;
    const novosKravensColetados = obteuKraven ? kravensJaColetados + 1 : kravensJaColetados;

    const resultado = {
      tipo: obteuKraven ? 'Kraven' : 'Pedra',
      questCompleta: this.isQuestCompleta(novosKravensColetados),
      deveAtivarRachadura: this.shouldAtivarRachadura(novosKravensColetados),
      pilhasRestantes: pilhasRestantesAposMineracao,
      kravensColetados: novosKravensColetados,
      chanceCalculada: chanceDeObterKraven,
    };

    // Mantém log crítico do resultado final
    if (typeof console !== 'undefined' && (resultado.deveAtivarRachadura || resultado.questCompleta)) {
      console.log('[MinaKravensDomain] Resultado crítico:', {
        tipo: resultado.tipo,
        kravensColetados: resultado.kravensColetados,
        deveAtivarRachadura: resultado.deveAtivarRachadura,
        questCompleta: resultado.questCompleta,
      });
    }

    return resultado;
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
      // Mantém log crítico para situação de 100% de chance
      if (typeof console !== 'undefined') {
        console.log('[MinaKravensDomain] Situação crítica - 100% chance:', {
          pilhasRestantes,
          kravensNecessarios: kravensRestantesParaConcluir,
        });
      }
      return 100;
    }

    // Fórmula para chance gradual (limitada a 100%)
    const chancePercentual = (kravensRestantesParaConcluir / pilhasRestantes) * 100;
    const chanceCorrigida = Math.min(chancePercentual, 100);

    return chanceCorrigida;
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
    const faltaUmKraven = kravensColetados === this.totalKravensNecessarios - 1;
    const questJaCompleta = this.isQuestCompleta(kravensColetados);
    const shouldActivate = faltaUmKraven && !questJaCompleta;

    // Mantém log crítico apenas para ativação da rachadura
    if (typeof console !== 'undefined' && shouldActivate) {
      console.log('[MinaKravensDomain] Rachadura será ativada!', {
        kravensColetados,
        faltaUm: true,
      });
    }

    return shouldActivate;
  }

  /**
   * Gera um número aleatório entre 0 e 1
   * Função isolada para facilitar testes (mock)
   * @private
   * @returns {number} Número entre 0 e 1
   */
  _gerarNumeroAleatorio() {
    return Math.random();
  }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinaKravensDomain;
} else if (typeof window !== 'undefined') {
  window.MinaKravensDomain = MinaKravensDomain;
}
