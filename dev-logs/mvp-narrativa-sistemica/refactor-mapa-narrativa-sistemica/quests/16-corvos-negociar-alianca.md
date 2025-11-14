# Negociar Aliança com os Corvos

## Identificação

- **Tipo:** Reforço Exército Corvos
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (local de encontro secreto dos Corvos)

## Contexto Narrativo

Quest diplomática que aprofunda o arco dos Corvos como facção independente e desconfiada. Os Corvos são mineradores que rejeitaram a autoridade de Damburr e Gildrat. Eles têm memórias amargas do conflito da Cena 8h quando lutaram contra o grupo de Thorin. Thorin precisa convencê-los que defender Gildrat contra Ignotos é diferente de servir Damburr - é sobre sobrevivência de todos os anões. Quest testa habilidade diplomática de Thorin.

## Gatilhos

- **Condições de início:** Encontrar Chefe dos Corvos em local secreto (NPC aparece após retornar de Melios)
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Chefe dos Corvos (NPC principal)
  - Thorin (protagonista/negociador)
  - Membros dos Corvos (NPCs de background)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_alianca_corvos` (switch)
- **Consequências:**
  - Corvos concordam em lutar ao lado de Gildrat
  - Acesso a quests de resgate em Melios fica mais fácil
  - Corvos compartilham informações sobre túneis de Melios

## Desfechos Possíveis

- **Final A (Negociação Bem-sucedida):** Thorin convence Corvos citando canção ancestral e ameaça comum dos Ignotos — Aliança formada (`v_influencia_corvos + 25`, `flag_alianca_corvos = ON`)
- **Final B (Negociação Falha):** Thorin usa argumento errado (servir Damburr) — Corvos recusam, menor cooperação (`v_influencia_corvos + 10`)
- **Final C (Ignora):** Corvos não participam da defesa de Gildrat

## Recompensas

- **v_influencia_corvos:** +25 pontos (25% do total de 100)
- **Narrativa:** Chefe dos Corvos: "Lutamos por nós mesmos, não por Damburr. Mas você... você é diferente"
