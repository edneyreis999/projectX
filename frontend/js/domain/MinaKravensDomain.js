"use strict";
//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.ts
//=============================================================================
(function () {
    'use strict';
    // Resolver local de DTOs (evita variáveis globais)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let __reqDTO = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let __respDTO = null;
    function resolveDomainDTOs() {
        // @ts-ignore - module pode não existir no browser
        if (typeof module !== 'undefined' && module.exports) {
            if (!__reqDTO) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                __reqDTO = require('../dto/MineracaoRequestDTO');
            }
            if (!__respDTO) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                __respDTO = require('../dto/MineracaoResponseDTO');
            }
        }
        else {
            const g = globalThis;
            __reqDTO = __reqDTO || (g && g.MineracaoRequestDTO);
            __respDTO = __respDTO || (g && g.MineracaoResponseDTO);
        }
        if (!__reqDTO || !__respDTO) {
            throw new Error('DTOs não carregados. Carregue MineracaoRequestDTO/MineracaoResponseDTO antes do domínio.');
        }
        return { MineracaoRequestDTO: __reqDTO, MineracaoResponseDTO: __respDTO };
    }
    class MinaKravensDomain {
        constructor(totalKravensNecessarios, totalPilhasDisponiveis) {
            this.totalKravensNecessarios = totalKravensNecessarios;
            this.totalPilhasDisponiveis = totalPilhasDisponiveis;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        executarMineracao(request) {
            const { MineracaoRequestDTO, MineracaoResponseDTO } = resolveDomainDTOs();
            if (!(request instanceof MineracaoRequestDTO)) {
                throw new Error('Request deve ser uma instância de MineracaoRequestDTO');
            }
            const { kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada } = request;
            const pilhasRestantes = this.totalPilhasDisponiveis - pilhasJaMineradas;
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
            if (pilhasRestantes <= 0) {
                chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);
            }
            else if (pilhasRestantesAposMineracao > 0 && pilhasRestantesAposMineracao <= kravensRestantesParaConcluir) {
                chanceDeObterKraven = 100;
            }
            else {
                chanceDeObterKraven = this.calcularChanceKraven(kravensJaColetados, pilhasRestantesAposMineracao);
            }
            if (rachaduraJaAtivada && !this.isQuestCompleta(kravensJaColetados)) {
                chanceDeObterKraven = 100;
            }
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
            return obteuKraven
                ? MineracaoResponseDTO.createKravenResponse(responseData)
                : MineracaoResponseDTO.createPedraResponse(responseData);
        }
        calcularChanceKraven(kravensJaColetados, pilhasRestantes) {
            const kravensRestantesParaConcluir = this.totalKravensNecessarios - kravensJaColetados;
            if (pilhasRestantes <= 0)
                return 0;
            if (pilhasRestantes <= kravensRestantesParaConcluir)
                return 100;
            const chancePercentual = (kravensRestantesParaConcluir / pilhasRestantes) * 100;
            return Math.min(chancePercentual, 100);
        }
        isQuestCompleta(kravensColetados) {
            return kravensColetados >= this.totalKravensNecessarios;
        }
        shouldAtivarRachadura(kravensColetados) {
            const faltaUmKraven = kravensColetados === this.totalKravensNecessarios - 1;
            const questJaCompleta = this.isQuestCompleta(kravensColetados);
            return faltaUmKraven && !questJaCompleta;
        }
        _gerarNumeroAleatorio() { return Math.random(); }
    }
    // remove ensure; usa resolveDomainDTOs
    // Compat Node/Browser (mantém padrão atual)
    // @ts-ignore - module may be undefined in browser
    if (typeof module !== 'undefined' && module.exports) {
        // @ts-ignore
        module.exports = MinaKravensDomain;
    }
    else if (globalThis) {
        globalThis.MinaKravensDomain = MinaKravensDomain;
    }
})();
