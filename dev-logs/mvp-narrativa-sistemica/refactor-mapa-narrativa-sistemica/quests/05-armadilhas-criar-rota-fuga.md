# Criar Rota de Fuga para Isca

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1
- **Dificuldade:** Difícil (Hard Core - requer v_pontos_armadilhas ≥ 70)
- **Localização:** Gildrat (campo aberto até muralhas)

## Contexto Narrativo

Quest avançada que fecha o arco de preparação das armadilhas e mostra a maturidade tática de Thorin. Não basta ter isca, dinamites e posições - é preciso garantir que a isca (Sáparo ou Tusk) sobreviva. Esta quest só é desbloqueada para jogadores que completaram quase tudo, recompensando o engajamento profundo. Mostra Thorin planejando cada detalhe como um verdadeiro líder militar.

## Gatilhos

- **Condições de início:** Ter v_pontos_armadilhas ≥ 70 (ter feito as 4 quests anteriores)
- **Requisitos:**
  - `v_pontos_armadilhas ≥ 70`
  - `flag_armadilhas_posicionadas = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista)
  - Balastrus (consultor)
  - Sáparo ou Tusk (dependendo da quest 03)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_rota_fuga_criada` (switch)
- **Consequências:**
  - Garante sobrevivência da isca na Fase 1 (cutscene)
  - Sistema de armadilhas completo (100%)

## Desfechos Possíveis

- **Final A (Rota Perfeita):** Thorin cria obstáculos temporários e pontos de cobertura ao longo da rota de volta — Isca tem caminho seguro para retornar (`v_pontos_armadilhas + 15`, `flag_rota_fuga_criada = ON`)
- **Final B (Não Liberada):** Jogador não atingiu 70 pontos — Quest não aparece, rota não otimizada

## Recompensas

- **v_pontos_armadilhas:** +15 pontos (15% do total de 100) - **Completa os 100%**
- **Narrativa:** Cutscene na Fase 1 mostrando isca usando a rota perfeitamente planejada
- **Reconhecimento:** Balastrus elogia Thorin como "verdadeiro estrategista anão"
