# Vai Explodir

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1.
- **Dificuldade:** Fácil.
- **Localização:** Gildrat (campo de testes fora da cidade).

## Contexto Narrativo

Quest que pode remediar a relação de confiança entre Thorin e Valamir. Valamir, como inventor, criou dinamite mas precisa calibrar a potência ideal para maximizar dano aos Ignotos sem destruir as estruturas de Gildrat. Thorin participa dos testes práticos, demonstrando que está disposto a contribuir ativamente para a defesa, não apenas como soldado mas como parceiro científico. Um diálogo tem início e é aqui a primeira vez em que Thorin questiona Valamir sobre ter mentido a respeito de Kilin.

## Gatilhos

- **NPC com a quest:** Valamir.
- **Requisitos:** Ter completado a quest: Hora do Show [Ler mais em](01-hora-do-show-quest-Tordan.md).
- `flag_armadilha_mapeada = ON`
   **Gatilho:** Depois de completar a quest: Hora do Show, Thorin é mandado para a patrulha novamente por Tordan. Desta vez, seu pai lhe pede para ajudar Valamir com o intuito de "ficar de olho" no mercenário. Thorin volta até a Estrada do Cão-luar e fala novamente com ele.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Tordan (NPC secundário)
  - Valamir (NPC principal)
  - Thorin (protagonista)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_dinamite_testada` (switch)
  - `v_confiar_Valamir`
  
- **Consequências:**
  - Desbloqueia diálogo técnico com Balastrus.

## Desfechos Possíveis

- **Final A (Sucesso Total):** Todos os 3 testes são bem-sucedidos — Balastrus calibra a dinamite perfeitamente.
- **Final B (Ignora):** Jogador não realiza os testes — Dinamites não calibradas, menor eficácia nas armadilhas.

## Recompensas

- **v_pontos_armadilhas:** +25 pontos (do total de 100).
- **v_confiar_Valamir:** +15 pontos (do total de 100).
- **Narrativa:** Cena cômica onde Balastrus quase se machuca com uma explosão, Thorin o salva.
