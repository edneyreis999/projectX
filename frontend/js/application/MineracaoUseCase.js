"use strict";
//=============================================================================
// Use Case: Mineração (Clean Architecture - Use Case Layer)
// MineracaoUseCase.ts
//=============================================================================
(function () {
    'use strict';
    // Resolvedor local de DTOs (sem variáveis globais)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let __cachedReq = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let __cachedResp = null;
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
        }
        else {
            const g = globalThis;
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
        constructor(domain, coreService, questService, logger, config) {
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
        executarMineracao(pilhaId) {
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
            }
            catch (error) {
                this.logger.error('Erro durante executarMineracao:', {
                    error: error.message,
                    stack: error.stack,
                    pilhaId,
                });
                throw error;
            }
        }
        _obterKravensColetados() {
            return this.coreService.getGameVariable(this.idVarKravensColetados, 0);
        }
        _obterPilhasJaMineradas() {
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
        _processarResultado(resultado) {
            try {
                const itemId = resultado.isKraven() ? this.idItemKraven : this.idItemPedra;
                this._adicionarItem(itemId);
                this._atualizarVariaveisJogo(resultado);
                if (resultado.shouldActivateCrack()) {
                    this.logger.warn('Rachadura ativada! Boss liberado.');
                    this._ativarRachadura();
                }
            }
            catch (error) {
                this.logger.error('Erro durante _processarResultado:', {
                    error: error.message,
                    stack: error.stack,
                    resultado: resultado.toPlainObject(),
                });
                throw error;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _atualizarVariaveisJogo(resultado) {
            try {
                const stats = resultado.getStats();
                this.coreService.setGameVariable(this.idVarKravensColetados, stats.kravensColetados);
                if (this.idVarPilhasRestantes > 0) {
                    this.coreService.setGameVariable(this.idVarPilhasRestantes, stats.pilhasRestantes);
                }
            }
            catch (error) {
                this.logger.error('Erro durante _atualizarVariaveisJogo:', {
                    error: error.message,
                    stack: error.stack,
                    resultado: resultado.toPlainObject(),
                });
                throw error;
            }
        }
        _ativarRachadura() {
            try {
                if (this.idVarEstadoBoss > 0) {
                    this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
                }
            }
            catch (error) {
                this.logger.error('Erro durante _ativarRachadura:', {
                    error: error.message,
                    idVarEstadoBoss: this.idVarEstadoBoss,
                });
            }
        }
        _adicionarItem(itemId) {
            try {
                return this.questService.addItemToInventory(itemId, 1);
            }
            catch (error) {
                this.logger.error('Erro durante _adicionarItem:', {
                    error: error.message,
                    itemId,
                });
                throw error;
            }
        }
        _verificarSeRachaduraJaFoiAtivada() {
            const estadoBoss = this.coreService.getGameVariable(this.idVarEstadoBoss, 0);
            return estadoBoss >= 1;
        }
    }
    // Compat Node/Browser (mantém padrão atual)
    // @ts-ignore - module may be undefined in browser
    if (typeof module !== 'undefined' && module.exports) {
        // @ts-ignore
        module.exports = MineracaoUseCase;
    }
    else {
        globalThis.MineracaoUseCase = MineracaoUseCase;
    }
})();
