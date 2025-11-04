# Preparar Arsenal da Guarda

## Identificação

- **Tipo:** Reforço Exército Guarda de Ferro
- **Dificuldade:** Difícil (Hard Core - requer v_forca_guarda ≥ 70)
- **Localização:** Gildrat (arsenal do quartel)

## Contexto Narrativo

Quest avançada que fecha o arco de preparação militar da Guarda de Ferro. Apenas jogadores que completaram quase todas as outras quests conseguem desbloquear esta. Thorin trabalha com o armeiro-mestre para distribuir as melhores armas e armaduras para cada soldado baseado em suas especialidades. Se Sigmetal foi coletado, pode ser incorporado ao arsenal aqui. Representa Thorin como líder que cuida de cada detalhe.

## Gatilhos

- **Condições de início:** Ter v_forca_guarda ≥ 70
- **Requisitos:**
  - `v_forca_guarda ≥ 70`
  - Ter completado pelo menos 3 das 4 quests anteriores da Guarda

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista)
  - Armeiro-Mestre (NPC)
  - Thordan (aparece no final para inspecionar)
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`
  - `flag_arsenal_preparado` (switch)
- **Consequências:**
  - Guarda equipada com armas otimizadas
  - Se `v_reforco_sigmetal = 1`, armas de Sigmetal são distribuídas (mencionado em diálogo)
  - Thordan expressa orgulho silencioso em Thorin

## Desfechos Possíveis

- **Final A (Arsenal Completo):** Thorin distribui armas personalizadas para cada soldado — Guarda no auge do poder (`v_forca_guarda + 10`, `flag_arsenal_preparado = ON`)
- **Final B (Não Liberada):** Quest não aparece se jogador não atingiu 70 pontos

## Recompensas

- **v_forca_guarda:** +10 pontos (10% do total de 100) - **Completa os 100%**
- **Narrativa:** Thordan inspeciona o arsenal e dá um raro elogio: "Você seria um bom general"
- **Reconhecimento:** Guardas referem-se a Thorin como "Comandante" respeitosamente
