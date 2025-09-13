//=============================================================================
// DTO: Mineração Request (Clean Architecture - DTO Layer)
// MineracaoRequestDTO.ts
//=============================================================================

// Usa globalThis para compatibilidade Node/Browser sem declarar globals

type MineracaoRequestInput = {
  kravensJaColetados: number;
  pilhasJaMineradas: number;
  rachaduraJaAtivada?: boolean;
};

class MineracaoRequestDTO {
  public readonly kravensJaColetados: number;
  public readonly pilhasJaMineradas: number;
  public readonly rachaduraJaAtivada: boolean;

  constructor({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada = false }: MineracaoRequestInput) {
    this._validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada });
    this.kravensJaColetados = kravensJaColetados;
    this.pilhasJaMineradas = pilhasJaMineradas;
    this.rachaduraJaAtivada = rachaduraJaAtivada;
  }

  private _validateInputs({ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada }: Required<MineracaoRequestInput>) {
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

  static fromPlainObject(data: MineracaoRequestInput) {
    return new MineracaoRequestDTO(data);
  }

  isValid() {
    return (
      typeof this.kravensJaColetados === 'number' &&
      typeof this.pilhasJaMineradas === 'number' &&
      typeof this.rachaduraJaAtivada === 'boolean' &&
      this.kravensJaColetados >= 0 &&
      this.pilhasJaMineradas >= 0
    );
  }
}

// Compat Node/Browser (mantém padrão atual)
// @ts-ignore - module may be undefined in browser
if ((globalThis as any) && (globalThis as any).module && (globalThis as any).module.exports) {
  (globalThis as any).module.exports = MineracaoRequestDTO;
} else if ((globalThis as any)) {
  (globalThis as any).MineracaoRequestDTO = MineracaoRequestDTO;
}

// Removido export default para evitar emissão de CommonJS no browser
