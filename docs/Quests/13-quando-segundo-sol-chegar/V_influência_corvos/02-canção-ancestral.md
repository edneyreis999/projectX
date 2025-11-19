# Canção Ancestral

## Identificação

- **Tipo:** Reforço dos Corvos.
- **Dificuldade:** Mediana.
- **Localização:** Sala do Conselho.
- **Nome Artístico:** Canção Ancestral.
- **Desbloqueia ao Iniciar:** N/A.
  
## Contexto Narrativo

Quest que aprofunda o relacionamento entre Thorin e Sáparo Boca-de-Corneta, sua criatura de estimação. Corvinus propõe usar uma "isca barulhenta" para atrair os Ignotos até as armadilhas. Além disso, diz a Thorin que pode ensinar ao Sáparo uma canção ancestral que, ao ser cantada, emite frequências sônicas que desorientam os Ignotos. Isso desbloqueia a habilidade "Canção do Desvanecer".

## Gatilhos

- **NPC com a quest:** Corvinus.
- **Requisitos:** Ter completado a quest: Resgatar Corvos.
- **Gatilho:** Falar com Corvinus na Sala do Conselho.
- **Condição para concluir:**
  - Falar com Sáparo na Sala do Conselho.
  - Falar com Corvinus para confirmar a decisão sobre usar ou não Sáparo como isca.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Sáparo Boca-de-Corneta (criatura de estimação)
  - Thorin (protagonista)
  - Corvinus (NPC principal)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  
## Desfechos Possíveis

- **Final A (Aceita):** Thorin treina Sáparo para correr em rota específica, berrar nos momentos certos e servir de isca para atrair os Ignotos às armadilhas.

## Condição de Falha

- **Final B (Recusa):** Thorin protege Sáparo e não o coloca em risco.
- **Final C (Ignora):** Jogador ignora a quest.

## Recompensas

- **v_influencia_corvos:** +35 pontos (do total de 100).
- **Skill:** Canção do Desvanecer.
- **Narrativa:** Cena de treinamento cômica com Sáparo aprendendo a "berrar e correr".
