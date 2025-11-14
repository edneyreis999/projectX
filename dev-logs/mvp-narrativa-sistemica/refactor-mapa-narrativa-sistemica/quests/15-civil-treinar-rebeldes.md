# Treinar Rebeldes para Combate Organizado

## Identificação

- **Tipo:** Reforço Exército Civil
- **Dificuldade:** Difícil (Hard Core - requer v_forca_civil ≥ 70)
- **Localização:** Gildrat (campo de treinamento improvisado)

## Contexto Narrativo

Quest avançada que fecha o arco do Exército Civil e aprofunda as relações entre Filena, Mhordred e os rebeldes. Mineradores sabem lutar individualmente, mas não como exército organizado. Filena e Mhordred (se jogador completou quests anteriores) oferecem-se para treinar os rebeldes em táticas de grupo. Esta quest só é liberada para jogadores engajados, mostrando transformação completa de civis e rebeldes em força militar coordenada.

## Gatilhos

- **Condições de início:** Ter v_forca_civil ≥ 70 (completado quase todas as quests do Civil)
- **Requisitos:**
  - `v_forca_civil ≥ 70`
  - `flag_borin_resgatado = ON` OU `flag_rebeldes_resgatados = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Filena (instrutora principal)
  - Mhordred (instrutor secundário)
  - Thorin (coordenador)
  - Borin (supervisor, se resgatado)
  - Rebeldes (trainees)
- **Variáveis / Flags Alteradas:**
  - `v_forca_civil`
  - `flag_rebeldes_treinados` (switch)
- **Consequências:**
  - Rebeldes aprendem formações militares
  - Filena e rebeldes criam vínculo (arco dela se desenvolve)
  - Exército Civil atinge máxima eficiência

## Desfechos Possíveis

- **Final A (Filena E Mhordred Treinam):** Dupla de instrutores cria programa de treinamento completo — Rebeldes viram soldados disciplinados (`v_forca_civil + 10`, `flag_rebeldes_treinados = ON`)
- **Final B (Não Liberada):** Quest não aparece se jogador não atingiu 70 pontos

## Recompensas

- **v_forca_civil:** +10 pontos (10% do total de 100) - **Completa os 100%**
- **Narrativa:** Cena de Filena liderando rebeldes em exercício, Borin observando com orgulho
- **Reconhecimento:** Rebeldes passam a chamar Filena de "Comandante"
