# Treinar Time Rúnico como Unidade de Combate

## Identificação

- **Tipo:** Reforço Exército Civil
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (Estádio dos Machados Enferrujados)

## Contexto Narrativo

Quest nostálgica que transforma o Time de Futebol Rúnico de Thorin em uma unidade de combate especial. Filena e outros jogadores do time concordam em usar suas habilidades rúnicas (que antes eram para esportes) como armas de guerra. Esta quest aprofunda a relação de Thorin com Filena e mostra como paixões e talentos podem ser redirecionados em momentos de crise. O time que jogou junto agora luta junto.

## Gatilhos

- **Condições de início:** Ir ao estádio e falar com Dragobur (treinador)
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista/capitão)
  - Filena (jogadora do time)
  - Dragobur (treinador)
  - Outros membros do time (NPCs)
- **Variáveis / Flags Alteradas:**
  - `v_forca_civil`
  - `flag_time_runico_treinado` (switch)
- **Consequências:**
  - Time Rúnico se torna unidade de combate
  - Momento emocional com Filena sobre mudar de jogos para guerra

## Desfechos Possíveis

- **Final A (Treinamento Completo):** Time aprende a usar disparos rúnicos como ataques coordenados — Unidade de elite formada (`v_forca_civil + 25`, `flag_time_runico_treinado = ON`)
- **Final B (Ignora):** Time Rúnico não participa, talento desperdiçado

## Recompensas

- **v_forca_civil:** +25 pontos (25% do total de 100)
- **Narrativa:** Cena no estádio vazio, Thorin e Filena relembrando a semifinal antes de treinar para guerra
