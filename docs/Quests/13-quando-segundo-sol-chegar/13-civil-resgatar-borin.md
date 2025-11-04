# Resgatar Borin em Kravens

## Identificação

- **Tipo:** Reforço Exército Civil
- **Dificuldade:** Média (Requer ir a Kravens)
- **Localização:** Kravens (mina sob ataque)

## Contexto Narrativo

Quest emocional que aprofunda profundamente o arco de Filena e introduz Borin (pai dela) como personagem importante. Borin é um minerador rebelde, rude e avesso a nobres, que ficou preso em Kravens durante o ataque dos Ignotos. O resgate cria um triângulo narrativo: Thorin (nobre), Filena (filha) e Borin (rebelde anti-nobre). Thorin salvar a vida de Borin cria uma dívida emocional complexa e abre caminho para Borin liderar os rebeldes na defesa de Gildrat.

## Gatilhos

- **Condições de início:** Chegar em Kravens durante ataque dos Ignotos
- **Requisitos:** Passagem para Kravens liberada

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Borin (NPC a ser resgatado - pai de Filena)
  - Thorin (protagonista)
  - Filena (companheira, motivação emocional)
- **Variáveis / Flags Alteradas:**
  - `v_forca_civil`
  - `flag_borin_resgatado` (switch)
- **Consequências:**
  - Borin se torna líder dos rebeldes
  - Borin muda atitude em relação a Thorin (respeito a contragosto)
  - Filena fica emocionalmente grata a Thorin

## Desfechos Possíveis

- **Final A (Resgate Bem-sucedido):** Thorin salva Borin de grupo de Ignotos — Borin reconhece com grunhido: "Você não é como os outros nobres" (`v_forca_civil + 20`, `flag_borin_resgatado = ON`)
- **Final B (Borin Morre):** Jogador não consegue chegar a tempo — Filena devastada, rebeldes sem líder

## Recompensas

- **v_forca_civil:** +20 pontos (20% do total de 100)
- **Narrativa:** Cena de Filena abraçando pai ferido, olhando para Thorin com gratidão silenciosa
- **Mecânica:** Borin se torna líder NPC dos rebeldes (aparece em diálogos de preparação)
