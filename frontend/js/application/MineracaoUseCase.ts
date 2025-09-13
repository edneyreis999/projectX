//=============================================================================
// Use Case: Mineração (Clean Architecture - Use Case Layer)
// MineracaoUseCase.ts
//=============================================================================

(function () {
  'use strict';

  // Resolvedor local de DTOs (sem variáveis globais)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let __cachedReq: any | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let __cachedResp: any | null = null;

  function resolveUseCaseDTOs() {
    // @ts-ignore - module pode não existir no browser
    if (typeof module !== 'undefined' && module.exports) {
      if (!__cachedReq) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        __cachedReq = require('../dto/MineracaoRequestDTO');
      }
      if (!__cachedResp) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        __cachedResp = require('../dto/MineracaoResponseDTO');
      }
    } else {
      const g: any = globalThis as any;
      __cachedReq = __cachedReq || (g && g.MineracaoRequestDTO);
      __cachedResp = __cachedResp || (g && g.MineracaoResponseDTO);
    }
    if (!__cachedReq || !__cachedResp) {
      throw new Error('DTOs não carregados. Certifique-se de que MineracaoRequestDTO.js e MineracaoResponseDTO.js foram carregados antes de usar MineracaoUseCase');
    }
    return { MineracaoRequestDTO: __cachedReq, MineracaoResponseDTO: __cachedResp };
  }

  class MineracaoUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private domain: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private coreService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private questService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private logger: any;

  private idItemKraven: number;
  private idItemPedra: number;
  private idVarKravensColetados: number;
  private idVarPilhasRestantes: number;
  private idVarEstadoBoss: number;
  private totalPilhasDisponiveis: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(domain: any, coreService: any, questService: any, logger: any, config: any) {
    this.domain = domain;
    this.coreService = coreService;
    this.questService = questService;
    this.logger = logger;

    this.idItemKraven = config.idItemKraven;
    this.idItemPedra = config.idItemPedra;
    this.idVarKravensColetados = config.idVarKravensColetados;
    this.idVarPilhasRestantes = config.idVarPilhasRestantes;
    this.idVarEstadoBoss = config.idVarEstadoBoss;
    this.totalPilhasDisponiveis = config.totalPilhasDisponiveis;
  }

  executarMineracao(pilhaId: number) {
    try {
      const { MineracaoRequestDTO } = resolveUseCaseDTOs();

      const kravensJaColetados = this._obterKravensColetados();
      const pilhasJaMineradas = this._obterPilhasJaMineradas();
      const rachaduraJaAtivada = this._verificarSeRachaduraJaFoiAtivada();

      // Cria o DTO de request
      const request = new MineracaoRequestDTO({
        kravensJaColetados,
        pilhasJaMineradas,
        rachaduraJaAtivada,
      });

      // Executa a mineração usando o domínio
      const resultado = this.domain.executarMineracao(request);

      // Logs críticos
      if (resultado.chanceCalculada === 100 || resultado.chanceCalculada === 0) {
        this.logger.info('Chance de Kraven calculada pelo domínio', {
          chance: resultado.chanceCalculada,
          kravensColetados: resultado.kravensColetados,
          pilhasRestantes: resultado.pilhasRestantes,
        });
      }

      this.logger.info(`Jogador minerou e obteve: ${resultado.tipo}`);

      if (resultado.shouldActivateCrack() || resultado.isQuestComplete()) {
        this.logger.warn('Resultado crítico da mineração:', {
          tipo: resultado.tipo,
          deveAtivarRachadura: resultado.deveAtivarRachadura,
          questCompleta: resultado.questCompleta,
          kravensColetados: resultado.kravensColetados,
        });
      }

      this._processarResultado(resultado);

      return resultado.tipo;
    } catch (error: any) {
      this.logger.error('Erro durante executarMineracao:', {
        error: error.message,
        stack: error.stack,
        pilhaId,
      });
      throw error;
    }
  }

  private _obterKravensColetados() {
    return this.coreService.getGameVariable(this.idVarKravensColetados, 0);
  }

  private _obterPilhasJaMineradas() {
    if (this.idVarPilhasRestantes > 0) {
      const pilhasRestantesSalvas = this.coreService.getGameVariable(this.idVarPilhasRestantes, 0);

      if (pilhasRestantesSalvas <= 0 && this._obterKravensColetados() <= 0) {
        this.coreService.setGameVariable(this.idVarPilhasRestantes, this.totalPilhasDisponiveis);
        return 0;
      }

      return this.totalPilhasDisponiveis - pilhasRestantesSalvas;
    }

    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _processarResultado(resultado: any) {
    try {
      const itemId = resultado.isKraven() ? this.idItemKraven : this.idItemPedra;
      this._adicionarItem(itemId);

      this._atualizarVariaveisJogo(resultado);

      if (resultado.shouldActivateCrack()) {
        this.logger.warn('Rachadura ativada! Boss liberado.');
        this._ativarRachadura();
      }
    } catch (error: any) {
      this.logger.error('Erro durante _processarResultado:', {
        error: error.message,
        stack: error.stack,
        resultado: resultado.toPlainObject(),
      });
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _atualizarVariaveisJogo(resultado: any) {
    try {
      const stats = resultado.getStats();
      this.coreService.setGameVariable(this.idVarKravensColetados, stats.kravensColetados);

      if (this.idVarPilhasRestantes > 0) {
        this.coreService.setGameVariable(this.idVarPilhasRestantes, stats.pilhasRestantes);
      }
    } catch (error: any) {
      this.logger.error('Erro durante _atualizarVariaveisJogo:', {
        error: error.message,
        stack: error.stack,
        resultado: resultado.toPlainObject(),
      });
      throw error;
    }
  }

  private _ativarRachadura() {
    try {
      if (this.idVarEstadoBoss > 0) {
        this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
      }
    } catch (error: any) {
      this.logger.error('Erro durante _ativarRachadura:', {
        error: error.message,
        idVarEstadoBoss: this.idVarEstadoBoss,
      });
    }
  }

  private _adicionarItem(itemId: number) {
    try {
      return this.questService.addItemToInventory(itemId, 1);
    } catch (error: any) {
      this.logger.error('Erro durante _adicionarItem:', {
        error: error.message,
        itemId,
      });
      throw error;
    }
  }

  private _verificarSeRachaduraJaFoiAtivada() {
    const estadoBoss = this.coreService.getGameVariable(this.idVarEstadoBoss, 0);
    return estadoBoss >= 1;
  }
  }

  // Compat Node/Browser (mantém padrão atual)
  // @ts-ignore - module may be undefined in browser
  if (typeof module !== 'undefined' && module.exports) {
    // @ts-ignore
    module.exports = MineracaoUseCase;
  } else {
    (globalThis as any).MineracaoUseCase = MineracaoUseCase;
  }

})();
