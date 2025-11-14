# Resgatar Grupos de Rebeldes em Kravens

## Identificação

- **Tipo:** Reforço Exército Civil
- **Dificuldade:** Média (Requer ir a Kravens)
- **Localização:** Kravens (túneis da mina)

## Contexto Narrativo

Quest que aprofunda o tema dos rebeldes e mineradores como força política e militar. Grupos de mineradores que discordaram de Tusk durante a Cena 7a ficaram presos em Kravens. Eles são rebeldes por natureza - desconfiam da autoridade de Gildrat. Thorin precisa ganhar a confiança deles através de ações, não palavras. Resgatar esses grupos significa trazer mão-de-obra experiente e guerreiros de guerrilha para o Exército Civil.

## Gatilhos

- **Condições de início:** Durante a missão em Kravens, após avisos de NPCs sobre grupos presos
- **Requisitos:** Estar em Kravens

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista)
  - Grupos de mineradores rebeldes (NPCs)
  - Filena (companheira, ajuda a convencer rebeldes)
- **Variáveis / Flags Alteradas:**
  - `v_forca_civil`
  - `flag_rebeldes_resgatados` (switch)
- **Consequências:**
  - 20-30 rebeldes se juntam ao Exército Civil
  - Rebeldes disponíveis para treinamento (quest 15)
  - Moral dos rebeldes aumenta

## Desfechos Possíveis

- **Final A (Resgate Completo):** Thorin resgata 3 grupos diferentes de túneis colapsados — Rebeldes concordam em defender Gildrat (`v_forca_civil + 15`, `flag_rebeldes_resgatados = ON`)
- **Final B (Resgate Parcial):** Apenas 1-2 grupos resgatados — Menos rebeldes (`v_forca_civil + 8`)
- **Final C (Ignora):** Rebeldes morrem nos túneis, Exército Civil enfraquecido

## Recompensas

- **v_forca_civil:** +15 pontos (15% do total de 100)
- **Narrativa:** Rebeldes cantam canção de mineração ao serem libertados, reconhecendo Thorin como "um de nós"
