//=============================================================================
// Use Case: Mineração (Clean Architecture - Use Case Layer)
// MineracaoUseCase.js
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
        throw new Error('DTOs não carregados. Certifique-se de que MineracaoRequestDTO.js e MineracaoResponseDTO.js foram carregados antes de usar MineracaoUseCase');
      }
    }
  }

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
        // Garante que os DTOs estão carregados
        ensureDTOsLoaded();
        // Obtém o estado atual do jogo
        const kravensJaColetados = this._obterKravensColetados();
        const pilhasJaMineradas = this._obterPilhasJaMineradas();
        const rachaduraJaAtivada = this._verificarSeRachaduraJaFoiAtivada();

        // Cria o DTO de request
        const request = new MineracaoRequestDTO({
          kravensJaColetados,
          pilhasJaMineradas,
          rachaduraJaAtivada,
        });

        // Executa a mineração usando o domínio com DTO
        const resultado = this.domain.executarMineracao(request);

        // -- INÍCIO DAS NOVAS LINHAS DE LOG --

        // Loga a chance calculada, especialmente se for um valor crítico (0, 100)
        if (resultado.chanceCalculada === 100 || resultado.chanceCalculada === 0) {
          this.logger.info('Chance de Kraven calculada pelo domínio', {
            chance: resultado.chanceCalculada,
            kravensColetados: resultado.kravensColetados,
            pilhasRestantes: resultado.pilhasRestantes,
          });
        }

        // Loga o resultado da mineração (o que o jogador obteve)
        this.logger.info(`Jogador minerou e obteve: ${resultado.tipo}`);

        // Log crítico usando os métodos do DTO, agora na camada correta
        if (resultado.shouldActivateCrack() || resultado.isQuestComplete()) {
          this.logger.warn('Resultado crítico da mineração:', {
            // Usando .warn para destacar
            tipo: resultado.tipo,
            deveAtivarRachadura: resultado.deveAtivarRachadura,
            questCompleta: resultado.questCompleta,
            kravensColetados: resultado.kravensColetados,
          });
        }
        // -- FIM DAS NOVAS LINHAS DE LOG --

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
     * @param {MineracaoResponseDTO} resultado - DTO com resultado retornado pelo domínio
     */
    _processarResultado(resultado) {
      try {
        // Adiciona o item apropriado ao inventário usando métodos do DTO
        const itemId = resultado.isKraven() ? this.idItemKraven : this.idItemPedra;
        this._adicionarItem(itemId);

        // Atualiza as variáveis do jogo
        this._atualizarVariaveisJogo(resultado);

        // Ativa rachadura se necessário usando método do DTO
        if (resultado.shouldActivateCrack()) {
          this.logger.warn('Rachadura ativada! Boss liberado.');
          this._ativarRachadura();
        }
      } catch (error) {
        this.logger.error('Erro durante _processarResultado:', {
          error: error.message,
          stack: error.stack,
          resultado: resultado.toPlainObject(),
        });
        throw error;
      }
    }

    /**
     * Atualiza as variáveis do jogo com o novo estado
     * @private
     * @param {MineracaoResponseDTO} resultado - DTO com resultado da mineração
     */
    _atualizarVariaveisJogo(resultado) {
      try {
        const stats = resultado.getStats();
        this.coreService.setGameVariable(this.idVarKravensColetados, stats.kravensColetados);

        if (this.idVarPilhasRestantes > 0) {
          this.coreService.setGameVariable(this.idVarPilhasRestantes, stats.pilhasRestantes);
        }
      } catch (error) {
        this.logger.error('Erro durante _atualizarVariaveisJogo:', {
          error: error.message,
          stack: error.stack,
          resultado: resultado.toPlainObject(),
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

  // Tratamento de imports/exports para compatibilidade Node.js/Browser
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = MineracaoUseCase;
  } else if (typeof window !== 'undefined') {
    // Browser environment
    window.MineracaoUseCase = MineracaoUseCase;
  }
})();
