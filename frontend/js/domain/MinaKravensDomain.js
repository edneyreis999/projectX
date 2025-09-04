//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.js
//=============================================================================

(function () {
  'use strict';

  // Importações dos DTOs com fallback gracioso
  let MineracaoRequestDTO, MineracaoResponseDTO;

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    MineracaoRequestDTO = require('../dto/MineracaoRequestDTO');
    MineracaoResponseDTO = require('../dto/MineracaoResponseDTO');
  } else if (typeof window !== 'undefined') {
    // Browser environment - usa fallback se DTOs não estão disponíveis ainda
    MineracaoRequestDTO = window.MineracaoRequestDTO || null;
    MineracaoResponseDTO = window.MineracaoResponseDTO || null;
  }

  // Função para garantir que os DTOs estão carregados
  function ensureDTOsLoaded() {
    if (!MineracaoRequestDTO || !MineracaoResponseDTO) {
      // Tenta carregar novamente em caso de carregamento tardio
      if (typeof window !== 'undefined') {
        MineracaoRequestDTO = window.MineracaoRequestDTO;
        MineracaoResponseDTO = window.MineracaoResponseDTO;
      }

      if (!MineracaoRequestDTO || !MineracaoResponseDTO) {
        throw new Error('DTOs não carregados. Certifique-se de que MineracaoRequestDTO.js e MineracaoResponseDTO.js foram carregados antes de usar MinaKravensDomain');
      }
    }
  }

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
     * @param {MineracaoRequestDTO} request - DTO com os dados da request
     * @returns {MineracaoResponseDTO} DTO com o resultado da mineração
     */
    executarMineracao(request) {
      // Garante que os DTOs estão carregados
      ensureDTOsLoaded();

      // Validação do input
      if (!(request instanceof MineracaoRequestDTO)) {
        throw new Error('Request deve ser uma instância de MineracaoRequestDTO');
      }

      const { kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada } = request;
      const pilhasRestantes = this.totalPilhasDisponiveis - pilhasJaMineradas;

      // Se o jogador já coletou todos os Kravens necessários, sempre retorna pedra
      if (this.isQuestCompleta(kravensJaColetados)) {
        return MineracaoResponseDTO.createPedraResponse({
          questCompleta: true,
          deveAtivarRachadura: false,
          pilhasRestantes: pilhasRestantes - 1,
          kravensColetados: kravensJaColetados,
          chanceCalculada: 0,
        });
      }

      const pilhasRestantesAposMineracao = pilhasRestantes - 1;
      const kravensRestantesParaConcluir = this.totalKravensNecessarios - kravensJaColetados;

      let chanceDeObterKraven;

      // Se não há pilhas restantes, sempre usa o método calcularChanceKraven (que retornará 0%)
      if (pilhasRestantes <= 0) {
        chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);
      } else if (pilhasRestantesAposMineracao > 0 && pilhasRestantesAposMineracao <= kravensRestantesParaConcluir) {
        // Se após esta mineração, as pilhas restantes são iguais ou menores que os Kravens necessários, garante 100%
        chanceDeObterKraven = 100;
      } else {
        chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);
      }

      // CORREÇÃO DO BUG: Se rachadura já foi ativada, força 100% de chance
      if (rachaduraJaAtivada && !this.isQuestCompleta(kravensJaColetados)) {
        chanceDeObterKraven = 100;
      }

      // Determina o resultado
      const randomValue = this._gerarNumeroAleatorio() * 100;
      const obteuKraven = randomValue <= chanceDeObterKraven;
      const novosKravensColetados = obteuKraven ? kravensJaColetados + 1 : kravensJaColetados;

      const responseData = {
        questCompleta: this.isQuestCompleta(novosKravensColetados),
        deveAtivarRachadura: this.shouldAtivarRachadura(novosKravensColetados),
        pilhasRestantes: pilhasRestantesAposMineracao,
        kravensColetados: novosKravensColetados,
        chanceCalculada: chanceDeObterKraven,
      };

      const resultado = obteuKraven ? MineracaoResponseDTO.createKravenResponse(responseData) : MineracaoResponseDTO.createPedraResponse(responseData);

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

  // Tratamento de imports/exports para compatibilidade Node.js/Browser
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = MinaKravensDomain;
  } else if (typeof window !== 'undefined') {
    // Browser environment
    window.MinaKravensDomain = MinaKravensDomain;
  }
})();
