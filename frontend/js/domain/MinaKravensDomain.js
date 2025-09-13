"use strict";
//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.ts
//=============================================================================
(function () {
    'use strict';
    class MinaKravensDomain {
        constructor(totalKravensNecessarios, totalPilhasDisponiveis) {
            this.totalKravensNecessarios = totalKravensNecessarios;
            this.totalPilhasDisponiveis = totalPilhasDisponiveis;
        }
        _gerarNumeroAleatorio() { return Math.random(); }
        executarMineracao(request) {
            this.assertValidRequest(request);
            const { kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada } = request;
            const pilhasRestantes = this.totalPilhasDisponiveis - pilhasJaMineradas;
            if (this.isQuestCompleta(kravensJaColetados)) {
                const response = {
                    tipo: 'Pedra',
                    questCompleta: true,
                    deveAtivarRachadura: false,
                    pilhasRestantes: pilhasRestantes - 1,
                    kravensColetados: kravensJaColetados,
                    chanceCalculada: 0,
                };
                this.assertValidResponse(response);
                return response;
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
            const response = obteuKraven
                ? { tipo: 'Kraven', ...responseData }
                : { tipo: 'Pedra', ...responseData };
            this.assertValidResponse(response);
            return response;
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
        assertValidRequest(req) {
            if (req == null || typeof req !== 'object') {
                throw new Error('Request inválida: esperado objeto MineracaoRequest');
            }
            if (typeof req.kravensJaColetados !== 'number' || req.kravensJaColetados < 0) {
                throw new Error('kravensJaColetados deve ser um número não negativo');
            }
            if (typeof req.pilhasJaMineradas !== 'number' || req.pilhasJaMineradas < 0) {
                throw new Error('pilhasJaMineradas deve ser um número não negativo');
            }
            if (typeof req.rachaduraJaAtivada !== 'boolean') {
                throw new Error('rachaduraJaAtivada deve ser um boolean');
            }
        }
        assertValidResponse(res) {
            const tipoOK = res.tipo === 'Kraven' || res.tipo === 'Pedra';
            if (!tipoOK)
                throw new Error('tipo deve ser "Kraven" ou "Pedra"');
            if (typeof res.questCompleta !== 'boolean')
                throw new Error('questCompleta deve ser um boolean');
            if (typeof res.deveAtivarRachadura !== 'boolean')
                throw new Error('deveAtivarRachadura deve ser um boolean');
            if (typeof res.pilhasRestantes !== 'number')
                throw new Error('pilhasRestantes deve ser um número');
            if (typeof res.kravensColetados !== 'number' || res.kravensColetados < 0)
                throw new Error('kravensColetados deve ser um número não negativo');
            if (typeof res.chanceCalculada !== 'number' || res.chanceCalculada < 0 || res.chanceCalculada > 100)
                throw new Error('chanceCalculada deve ser um número entre 0 e 100');
        }
    }
    // Helpers removidos - informações acessíveis diretamente da resposta
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
