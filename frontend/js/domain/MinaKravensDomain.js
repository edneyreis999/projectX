"use strict";
//=============================================================================
// Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
// MinaKravensDomain.ts
//=============================================================================
// Referências dinâmicas a DTOs para compatibilidade Node/Browser
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MineracaoRequestDTORef;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MineracaoResponseDTORef;
// Acessa de forma segura os ambientes Node/Browser via globalThis
if (globalThis && globalThis.module && globalThis.module.exports) {
    // Node.js (testes)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    MineracaoRequestDTORef = require('../dto/MineracaoRequestDTO');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    MineracaoResponseDTORef = require('../dto/MineracaoResponseDTO');
}
else {
    // Browser (runtime do jogo)
    MineracaoRequestDTORef = globalThis.MineracaoRequestDTO;
    MineracaoResponseDTORef = globalThis.MineracaoResponseDTO;
}
class MinaKravensDomain {
    constructor(totalKravensNecessarios, totalPilhasDisponiveis) {
        this.totalKravensNecessarios = totalKravensNecessarios;
        this.totalPilhasDisponiveis = totalPilhasDisponiveis;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    executarMineracao(request) {
        ensureDTOsLoaded();
        if (!(request instanceof MineracaoRequestDTORef)) {
            throw new Error('Request deve ser uma instância de MineracaoRequestDTO');
        }
        const { kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada } = request;
        const pilhasRestantes = this.totalPilhasDisponiveis - pilhasJaMineradas;
        if (this.isQuestCompleta(kravensJaColetados)) {
            return MineracaoResponseDTORef.createPedraResponse({
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
            ? MineracaoResponseDTORef.createKravenResponse(responseData)
            : MineracaoResponseDTORef.createPedraResponse(responseData);
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
function ensureDTOsLoaded() {
    if (!MineracaoRequestDTORef || !MineracaoResponseDTORef) {
        const g = globalThis;
        MineracaoRequestDTORef = g && g.MineracaoRequestDTO ? g.MineracaoRequestDTO : MineracaoRequestDTORef;
        MineracaoResponseDTORef = g && g.MineracaoResponseDTO ? g.MineracaoResponseDTO : MineracaoResponseDTORef;
    }
    if (!MineracaoRequestDTORef || !MineracaoResponseDTORef) {
        throw new Error('DTOs não carregados. Carregue MineracaoRequestDTO/MineracaoResponseDTO antes do domínio.');
    }
}
// Compat Node/Browser (mantém padrão atual)
// @ts-ignore - module may be undefined in browser
if (typeof module !== 'undefined' && module.exports) {
    // @ts-ignore
    module.exports = MinaKravensDomain;
}
else if (globalThis) {
    globalThis.MinaKravensDomain = MinaKravensDomain;
}
// Removido export default para evitar emissão de CommonJS no browser
