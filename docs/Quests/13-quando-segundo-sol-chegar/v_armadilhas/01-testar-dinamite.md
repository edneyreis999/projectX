# Testar Dinamite

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1 ou 2.
- **Dificuldade:** Fácil.
- **Localização:** Estrada do Cão-luar.
- **Nome Artístico:** Vai Explodir! (Este é o nome chamativo que deve ir para dentro do jogo e aparecer ao player)
- **Desbloqueia ao Iniciar:** N/A

## Contexto Narrativo

Quest que pode remediar a relação de confiança entre Thorin e Valamir.

Valamir, como inventor, criou dinamite mas precisa calibrar a potência ideal para maximizar dano aos Ignotos sem destruir as estruturas de Gildrat. Thorin participa dos testes práticos, demonstrando que está disposto a contribuir ativamente para a defesa, não apenas como soldado, mas como parceiro científico. Um diálogo tem início e é aqui a primeira vez em que Thorin questiona Valamir sobre ter mentido a respeito de Kilin.

## Gatilhos

- **NPC com a quest:** Valamir.
- **Requisitos:** N/A.
   **Gatilho:** Thorin é ordenado por Tordan a sair em patrulha. Uma destas exigências durante o trabalho é que visite Valamir na Estrada do Cão-luar e o ajude com o que for preciso. Os ânimos estão a flor da pele, mas esta é a chance de Thorin se provar um grande guerreiro.
    **Condição para concluir:** Explodir 3 dinamites.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Tordan (NPC secundário)
  - Valamir (NPC principal)
  - Thorin (protagonista)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`

## Desfechos Possíveis

- **Final A (Sucesso Total):** Todos os 3 testes são bem-sucedidos — Valamir calibra a dinamite perfeitamente.

## Condição de Falha

- **Final B (Ignora):** Jogador não realiza os testes — Dinamites não calibradas, menor eficácia contra os Ignotos.

## Recompensas

- **v_pontos_armadilhas:** +50 pontos (do total de 100).
- **Narrativa:** Cena cômica onde Balastrus quase se machuca com uma explosão, Thorin o salva.
