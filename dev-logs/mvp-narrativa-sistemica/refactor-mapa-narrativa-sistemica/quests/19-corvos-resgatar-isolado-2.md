# Resgatar Corvo Isolado 2 - Câmara Escondida

## Identificação

- **Tipo:** Reforço Exército Corvos
- **Dificuldade:** Média (Requer exploração em Melios)
- **Localização:** Melios (câmara escondida sul)

## Contexto Narrativo

Quest opcional que aprofunda a exploração sistemática de Melios. Este Corvo se escondeu em câmara secreta quando os Ignotos atacaram e agora está preso lá, cercado mas protegido temporariamente. Requer que Thorin use conhecimento de mineração (adquirido em quests anteriores) para identificar entrada secreta da câmara. Mostra que exploração cuidadosa é recompensada.

## Gatilhos

- **Condições de início:** Examinar parede com marcação rúnica específica (parede rachada)
- **Requisitos:** Estar em Melios

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Corvo Isolado 2 (NPC escondido)
  - Thorin (protagonista/resgatador)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_corvo_isolado_2` (switch)
- **Consequências:**
  - Corvo compartilha lenda sobre o selo de Melios
  - Contribui para lore do mundo

## Desfechos Possíveis

- **Final A (Resgate):** Thorin decifra marcação rúnica e abre passagem secreta — Corvo sai ileso (`v_influencia_corvos + 15`, `flag_corvo_isolado_2 = ON`)
- **Final B (Ignora):** Jogador não examina parede, Corvo permanece preso

## Recompensas

- **v_influencia_corvos:** +15 pontos (15% do total de 100)
- **Narrativa:** Corvo conta história antiga sobre os ancestrais que criaram o selo
- **Lore:** Fragmento de história sobre o Profeta das Sombras
