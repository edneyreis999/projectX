//=============================================================================
// DTO: Mineração Request (Clean Architecture - DTO Layer)
// MineracaoRequestDTO.ts
//=============================================================================

export interface MineracaoRequest {
  kravensJaColetados: number;
  pilhasJaMineradas: number;
  rachaduraJaAtivada: boolean;
}
