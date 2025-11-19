# Testar Armadilhas

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1 ou 2.
- **Dificuldade:** Fácil.
- **Localização:** Estrada do Cão-luar.
- **Nome Artístico:** O Pior Emprego do Mundo! (Este é o nome chamativo que deve ir para dentro do jogo e aparecer ao player)
- **Desbloqueia ao Iniciar:** N/A

## Contexto Narrativo

Quest que também faz parte do arco narrativo de Thorin e Valamir, logo após as repercucões da última reunião do conselho de Gildrat. Há muitos pontos cegos por onde os inimigos podem entrar. Valamir pede a Thorin que identifique essas vulnerabilidades e coloque armadilhas a fim de testá-las.

## Gatilhos

- **NPC com a quest:** Valamir.
- **Requisitos:** N/A
- **Gatilho:** Falar com Valamir na Estrada do Cão-luar.
- **Condição para concluir:**
  - Instalar 3 armadilhas na Estrada do Cão-luar.
  - Falar com Valamir.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Valamir (NPC principal)
  - Thorin (protagonista)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`

## Desfechos Possíveis

- **Final A (Completa):** Thorin mapeia todos os 3 pontos de gargalo sugeridos por Valamir — que elogia a precisão do garoto.

## Condição de Falha

- **Final B (Ignora):** Jogador ignora a quest — Armadilhas não serão otimizadas para os pontos estratégicos.

## Recompensas

- **v_pontos_armadilhas:** +25 pontos (do total de 100)
- **Narrativa:** Diálogo de Valamir explicando a importância da topografia na guerra.
