# Resgatar Kilin em Melios

## Identificação

- **Tipo:** Reforço Exército Guarda de Ferro
- **Dificuldade:** Média (Requer ir a Melios)
- **Localização:** Melios (mina profunda)

## Contexto Narrativo

Quest crítica que aprofunda os arcos de Kilin, Mhordred e Balastrus. Kilin é um comandante veterano da Guarda de Ferro, mentor de muitos guardas e símbolo de resistência. Seu resgate não é apenas tático - é emocional. Mhordred sente culpa por ter deixado Kilin para trás durante a fuga da Cena 10e. Balastrus sente responsabilidade pelo desastre que causou ao quebrar o selo. O resgate é um momento de redenção para ambos.

## Gatilhos

- **Condições de início:** Falar com NPC que libera passagem para Melios
- **Requisitos:** Passagem para Melios liberada

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Kilin (NPC a ser resgatado)
  - Thorin (protagonista)
  - Mhordred (companheiro)
  - Balastrus (menciona culpa em diálogo)
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`
  - `flag_kilin_resgatado` (switch)
- **Consequências:**
  - Kilin volta como membro do grupo de Thorin
  - Kilin disponível para treinar Guarda (quest 08)
  - Mhordred tem diálogo de alívio e gratidão

## Desfechos Possíveis

- **Final A (Resgate Bem-sucedido):** Thorin encontra Kilin defendendo posição sozinho contra Ignotos — Kilin se junta ao grupo, emocionado (`v_forca_guarda + 20`, `flag_kilin_resgatado = ON`)
- **Final B (Kilin Deixado em Melios):** Jogador não vai a Melios — Kilin não participa das batalhas finais, Mhordred carrega culpa

## Recompensas

- **v_forca_guarda:** +20 pontos (20% do total de 100)
- **Narrativa:** Cena emocional de reencontro, Mhordred abraça Kilin
- **Mecânica:** Kilin se torna companheiro permanente do grupo de Thorin
