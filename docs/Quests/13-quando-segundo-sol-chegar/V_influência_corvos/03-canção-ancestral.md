# Canção Ancestral

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1.
- **Dificuldade:** Fácil.
- **Localização:** Gildrat (casa de Thorin).

## Contexto Narrativo

Quest que aprofunda o relacionamento entre Thorin e Sáparo Boca-de-Corneta, sua criatura de estimação. Corvinus propõe usar uma "isca barulhenta" para atrair os Ignotos gigantes até as armadilhas. Além disso, diz a Thorin que pode ensinar ao Sáparo uma canção ancestral, que ao ser cantada, emite frequências sônicas que desorientam os Ignotos. Isso desbloqueia a habilidade "Canção do Desvanecer".

## Gatilhos

- **NPC com a quest:** Corvinus.
- **Requisitos:** Ter completado a quest: Oferta Inesperada.
- `resgate_dos_corvos = ON`.
   **Gatilho:** Depois de completar a quest: Oferta Inesperada, Corvinus passa a confiar mais em Thorin. Ele aborda o jogador assim que ele volta das minas, concluindo o resgate de seus companheiros. "Você ganhou o meu respeito, garoto. Talvez as próximas gerações de Gildrat sejam salvas, se sobrevivermos a essa guerra e nascerem mais anões honrados como você". Como recompensa e oferta de boa vontade, Corvinus fala da canção e pergunta a Thorin se ele conhece algum animal que possam usar.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Sáparo Boca-de-Corneta (criatura de estimação)
  - Thorin (protagonista)
  - Corvinus (NPC principal)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_saparo_isca` (switch)
  
- **Consequências:**
  - Sáparo será usado na Fase 1 da guerra (cutscene automática).
  
## Desfechos Possíveis

- **Final A (Aceita):** Thorin treina Sáparo para correr em rota específica e gritar nos momentos certos.
- **Final B (Recusa):** Thorin protege Sáparo e não o coloca em risco.

## Recompensas

- **v_influencia_corvos:** +25 pontos (do total de 100).
- **Skill:** Canção do Desvanecer.
- **Narrativa:** Cena de treinamento cômica com Sáparo aprendendo a "berrar e correr".
