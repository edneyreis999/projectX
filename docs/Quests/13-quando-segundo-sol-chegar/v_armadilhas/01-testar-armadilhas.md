# Hora do Show

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1.
- **Dificuldade:** Média.
- **Localização:** Sala do Trono.

## Contexto Narrativo

Esta quest aprofunda o arco de Thorin, Tordan e Valamir, logo após as repercucões da última reunião do conselho de Gildrat. "A Guarda está sobrecarregada. Nossos batedores relataram Ignotos perto das fronteiras, sondando o terreno. Você é um guerreiro agora, portanto, vou tratá-lo como tal. Há muitos pontos cegos por onde os inimigos podem entrar. Vá até a estrada do Cão-luar e ajude com os preparativos de defesa... tome cuidado, é claro".

Thorin deve ir sozinho e realizar a tarefa de ajudar Valamir com algum preparativo de defesa e andar pela área em busca da presença de inimigos.

## Gatilhos

- **NPC com a quest:** Tordan.
- **Requisitos:** Jogador escolheu NÃO ser gentil com Tordan durante a quest: Troféu Quebrado.
- Falar com Tordan na sala do trono.
- **Gatilho:** Tordan entrega sua antiga funda a Thorin (logo após a discussão) e volta imediatamente para o palácio do imperador. Assim que o jogador deixa a casa dos Forjaprata e volta à andar por Gildrat, Mhordred estará esperando por ele no mapa do distrito comercial. Ele o avisa que seu pai está esperando por ele no palácio, com uma missão importante. Tordan entrega a missão a Thorin assim que o jogador decide falar com ele.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Tordan (NPC principal)
  - Valamir (NPC principal)
  - Thorin (protagonista)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_armadilha_mapeada` (switch)
  - `v_boa_vontade_Tordan`
  - `v_preparo_militar`
  - `v_confiar_Valamir`
  
- **Consequências:**
  - Habilita quest "Vai Explodir!".
  - Aumenta pontuação de armadilhas.
  - Aumenta pontuação militar.
  - Aumenta respeito com Tordan.
  - Aumenta a confiança em Valamir.

## Desfechos Possíveis

- **Final A (Completa):** Thorin mapeia todos os 3 pontos de gargalo sugeridos por Valamir — Balastrus elogia a precisão e marca os locais no mapa.
- **Final B (Incompleta):** Jogador ignora a quest — Armadilhas não serão otimizadas para os pontos estratégicos.

## Recompensas

- **v_pontos_armadilhas:** +25 pontos (do total de 100)
- **v_boa_vontade_thordan:** + 15 (do total de 100).
- **v_preparo_militar:** +15 (do total de 100).
- **v_confiar_Valamir:** +10 (do total de 100).
- **Narrativa:** Diálogo de Valamir explicando a importância da topografia na guerra.
