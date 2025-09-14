//=============================================================================
// DTO: Mineração Response (Clean Architecture - DTO Layer)
// MineracaoResponseDTO.ts
//=============================================================================

export type TipoMineracao = 'Kraven' | 'Pedra';

export interface MineracaoResponse {
  tipo: TipoMineracao;
  questCompleta: boolean;
  deveAtivarRachadura: boolean;
  pilhasRestantes: number;
  kravensColetados: number;
  chanceCalculada: number;
}
