//=============================================================================
// DTO: Mineração Response (Clean Architecture - DTO Layer)
// MineracaoResponseDTO.ts
//=============================================================================

type TipoMineracao = 'Kraven' | 'Pedra';

interface MineracaoResponse {
  tipo: TipoMineracao;
  questCompleta: boolean;
  deveAtivarRachadura: boolean;
  pilhasRestantes: number;
  kravensColetados: number;
  chanceCalculada: number;
}
