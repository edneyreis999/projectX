"use strict";
//=============================================================================
// DTO: Mineração Response (Clean Architecture - DTO Layer)
// MineracaoResponseDTO.ts
//=============================================================================
class MineracaoResponseDTO {
    constructor({ tipo, questCompleta, deveAtivarRachadura, pilhasRestantes, kravensColetados, chanceCalculada }) {
        this._validateInputs({ tipo, questCompleta, deveAtivarRachadura, pilhasRestantes, kravensColetados, chanceCalculada });
        this.tipo = tipo;
        this.questCompleta = questCompleta;
        this.deveAtivarRachadura = deveAtivarRachadura;
        this.pilhasRestantes = pilhasRestantes;
        this.kravensColetados = kravensColetados;
        this.chanceCalculada = chanceCalculada;
    }
    _validateInputs({ tipo, questCompleta, deveAtivarRachadura, pilhasRestantes, kravensColetados, chanceCalculada }) {
        if (tipo !== 'Kraven' && tipo !== 'Pedra') {
            throw new Error('tipo deve ser "Kraven" ou "Pedra"');
        }
        if (typeof questCompleta !== 'boolean') {
            throw new Error('questCompleta deve ser um boolean');
        }
        if (typeof deveAtivarRachadura !== 'boolean') {
            throw new Error('deveAtivarRachadura deve ser um boolean');
        }
        if (typeof pilhasRestantes !== 'number') {
            throw new Error('pilhasRestantes deve ser um número');
        }
        if (typeof kravensColetados !== 'number' || kravensColetados < 0) {
            throw new Error('kravensColetados deve ser um número não negativo');
        }
        if (typeof chanceCalculada !== 'number' || chanceCalculada < 0 || chanceCalculada > 100) {
            throw new Error('chanceCalculada deve ser um número entre 0 e 100');
        }
    }
    isKraven() { return this.tipo === 'Kraven'; }
    isPedra() { return this.tipo === 'Pedra'; }
    isQuestComplete() { return this.questCompleta; }
    shouldActivateCrack() { return this.deveAtivarRachadura; }
    getStats() {
        return {
            kravensColetados: this.kravensColetados,
            pilhasRestantes: this.pilhasRestantes,
            chanceCalculada: this.chanceCalculada,
        };
    }
    toPlainObject() {
        return {
            tipo: this.tipo,
            questCompleta: this.questCompleta,
            deveAtivarRachadura: this.deveAtivarRachadura,
            pilhasRestantes: this.pilhasRestantes,
            kravensColetados: this.kravensColetados,
            chanceCalculada: this.chanceCalculada,
        };
    }
    static fromPlainObject(data) {
        return new MineracaoResponseDTO(data);
    }
    static createKravenResponse(data) {
        return new MineracaoResponseDTO({ tipo: 'Kraven', ...data });
    }
    static createPedraResponse(data) {
        return new MineracaoResponseDTO({ tipo: 'Pedra', ...data });
    }
    isValid() {
        return ((this.tipo === 'Kraven' || this.tipo === 'Pedra') &&
            typeof this.questCompleta === 'boolean' &&
            typeof this.deveAtivarRachadura === 'boolean' &&
            typeof this.pilhasRestantes === 'number' &&
            typeof this.kravensColetados === 'number' &&
            typeof this.chanceCalculada === 'number' &&
            this.kravensColetados >= 0 &&
            this.chanceCalculada >= 0 &&
            this.chanceCalculada <= 100);
    }
}
// Compat Node/Browser (mantém padrão atual)
// @ts-ignore - module may be undefined in browser
if (globalThis && globalThis.module && globalThis.module.exports) {
    globalThis.module.exports = MineracaoResponseDTO;
}
else if (globalThis) {
    globalThis.MineracaoResponseDTO = MineracaoResponseDTO;
}
// Removido export default para evitar emissão de CommonJS no browser
