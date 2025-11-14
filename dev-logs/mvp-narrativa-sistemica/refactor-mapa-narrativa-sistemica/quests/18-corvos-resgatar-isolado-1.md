# Resgatar Corvo Isolado 1 - Túnel Lateral

## Identificação

- **Tipo:** Reforço Exército Corvos
- **Dificuldade:** Média (Requer exploração em Melios)
- **Localização:** Melios (túnel lateral leste)

## Contexto Narrativo

Quest opcional de exploração que aprofunda a dedicação de Thorin em salvar cada vida. Nem todo herói salva apenas grupos - às vezes salvar um indivíduo importa tanto quanto. Este Corvo ficou preso em túnel colapsado após explosão das armadilhas de Balastrus. Ele está ferido mas vivo, chamando por ajuda fracamente. Encontrá-lo requer que o jogador explore ativamente ao invés de apenas seguir a história linear.

## Gatilhos

- **Condições de início:** Ouvir sons de pedido de socorro em túnel lateral (áudio direcional)
- **Requisitos:** Estar em Melios

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Corvo Isolado 1 (NPC preso)
  - Thorin (protagonista/resgatador)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_corvo_isolado_1` (switch)
- **Consequências:**
  - Corvo compartilha informação sobre rota secreta em Melios
  - Corvos veem Thorin como alguém que não abandona ninguém

## Desfechos Possíveis

- **Final A (Resgate):** Thorin desenterra Corvo de escombros — Corvo promete lealdade eterna (`v_influencia_corvos + 15`, `flag_corvo_isolado_1 = ON`)
- **Final B (Ignora):** Jogador não explora, Corvo morre sozinho

## Recompensas

- **v_influencia_corvos:** +15 pontos (15% do total de 100)
- **Narrativa:** Corvo ferido agradece: "Ninguém mais voltaria por mim"
- **Mecânica:** Informação de rota secreta facilita navegação em Melios
