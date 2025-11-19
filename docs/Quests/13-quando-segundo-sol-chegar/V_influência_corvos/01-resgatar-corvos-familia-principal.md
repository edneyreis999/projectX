# Resgatar Corvos e Família Principal

## Identificação

- **Tipo:** Reforço dos Corvos.
- **Dificuldade:** Difícil.
- **Localização:** Sala do Conselho.
- **Nome Artístico:** Pássaros Encurralados.
- **Desbloqueia ao Iniciar:** Mina de Mélios lado Oeste.

## Contexto Narrativo

Quest diplomática que aprofunda o arco dos Corvos como facção independente e desconfiada. Os Corvos são mineradores que rejeitaram a autoridade de Dambur e Gildrat. Eles têm memórias amargas do conflito da Cena 8h, quando lutaram contra o grupo de Thorin. Thorin precisa convencê-los que defender Gildrat contra Ignotos é diferente de servir Dambur - é sobre sobrevivência de todos os anões.

## Gatilhos

- **NPC com a quest:** Corvinus.
- **Requisitos:** N/A.
- **Gatilho:** Falar com Corvinus na Sala do Conselho.
- **Condição para concluir:**
  - Resgatar ao menos 1 membro da família de Corvos em Mélios.
  - Falar com Corvinus na Sala do Conselho.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Corvinus (NPC principal)
  - Thorin (protagonista/negociador)
  - Membros dos Corvos (NPCs de background)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`

## Desfechos Possíveis

- **Final A (Negociação Bem-sucedida):** Thorin tem êxito no resgate de ao menos 1 membro da família.

## Condição de Falha

- **Final B (Ignora):** Jogador ignora a quest e não salva ninguém.
  
## Recompensas

- **v_influencia_corvos:** +35 pontos (do total de 100)
- **Narrativa:** Corvinus: "Lutamos por nós mesmos, não por Damburr. Mas você... você é diferente"
