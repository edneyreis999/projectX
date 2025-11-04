# Mapear Posições Estratégicas

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat

## Contexto Narrativo

Esta quest aprofunda o arco de Balastrus como estrategista militar e inventor. Balastrus compartilha sua experiência tática ao pedir que Thorin o ajude a mapear os pontos de gargalo no caminho até Gildrat. Essa atividade mostra a preparação metódica e científica de Balastrus, contrastando com a impulsividade que ele demonstrou em Melios ao quebrar o selo.

## Gatilhos

- **Condições de início:** Falar com Balastrus em Gildrat após retornar de Melios
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Balastrus (NPC principal)
  - Thorin (protagonista)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_armadilha_mapeada` (switch)
- **Consequências:**
  - Habilita quest "Testar Dinamite"
  - Aumenta pontuação de armadilhas

## Desfechos Possíveis

- **Final A (Completa):** Thorin mapeia todos os 3 pontos de gargalo sugeridos por Balastrus — Balastrus elogia a precisão e marca os locais no mapa (`v_pontos_armadilhas + 25`, `flag_armadilha_mapeada = ON`)
- **Final B (Incompleta):** Jogador ignora a quest — Armadilhas não serão otimizadas para os pontos estratégicos

## Recompensas

- **v_pontos_armadilhas:** +25 pontos (25% do total de 100)
- **Narrativa:** Diálogo de Balastrus explicando a importância da topografia na guerra
