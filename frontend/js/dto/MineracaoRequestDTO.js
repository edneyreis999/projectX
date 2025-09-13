"use strict";
//=============================================================================
// DTO: Mineração Request (Clean Architecture - DTO Layer)
// MineracaoRequestDTO.ts
//=============================================================================
class MineracaoRequestDTO {
    constructor({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada = false }) {
        this._validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada });
        this.kravensJaColetados = kravensJaColetados;
        this.pilhasJaMineradas = pilhasJaMineradas;
        this.rachaduraJaAtivada = rachaduraJaAtivada;
    }
    _validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada }) {
        if (typeof kravensJaColetados !== 'number' || kravensJaColetados < 0) {
            throw new Error('kravensJaColetados deve ser um número não negativo');
        }
        if (typeof pilhasJaMineradas !== 'number' || pilhasJaMineradas < 0) {
            throw new Error('pilhasJaMineradas deve ser um número não negativo');
        }
        if (typeof rachaduraJaAtivada !== 'boolean') {
            throw new Error('rachaduraJaAtivada deve ser um boolean');
        }
    }
    toPlainObject() {
        return {
            kravensJaColetados: this.kravensJaColetados,
            pilhasJaMineradas: this.pilhasJaMineradas,
            rachaduraJaAtivada: this.rachaduraJaAtivada,
        };
    }
    static fromPlainObject(data) {
        return new MineracaoRequestDTO(data);
    }
    isValid() {
        return (typeof this.kravensJaColetados === 'number' &&
            typeof this.pilhasJaMineradas === 'number' &&
            typeof this.rachaduraJaAtivada === 'boolean' &&
            this.kravensJaColetados >= 0 &&
            this.pilhasJaMineradas >= 0);
    }
}
// Compat Node/Browser (mantém padrão atual)
// @ts-ignore - module may be undefined in browser
if (globalThis && globalThis.module && globalThis.module.exports) {
    globalThis.module.exports = MineracaoRequestDTO;
}
else if (globalThis) {
    globalThis.MineracaoRequestDTO = MineracaoRequestDTO;
}
// Removido export default para evitar emissão de CommonJS no browser
