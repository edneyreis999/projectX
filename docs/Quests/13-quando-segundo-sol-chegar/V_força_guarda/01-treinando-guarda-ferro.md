# Treinando a Guarda de Ferro

## Identificação

- **Tipo:** Reforço na Habilidade da Guarda de Ferro.
- **Dificuldade:** Fácil.
- **Localização:** Campo de Treinamento.
- **Nome Artístico:** Caçadores Caçados.
- **Desbloqueia ao Iniciar:** N/A.

## Contexto Narrativo

Quest que aprofunda o papel de Thorin na Guarda de Ferro. A Guarda de Ferro precisa aprender táticas específicas anti-Ignoto baseadas no conhecimento dos guerreiros que já o enfrentaram. Mhordred tenta lhes falar, mas não é realmente um líder. A confiança dos soldados está debilitada, antes não temiam nada, mas agora, perderam seu comandante e maior guerreiro para esses novos inimigos. A Guarda de Ferro nunca havia sofrido um golpe tão duro, nunca houve uma derrota assim. Os caçadores se tornaram caça. Mhordred até tenta animá-los, mas não consegue. Thorin então entra em cena e faz um discurso motivador, animando os soldados novamente. Mhordred fica impressionado, o treinamento se torna mais fácil a partir daí.

## Gatilhos

- **NPC com a quest:** Mhordred.
- **Requisitos:** N/A.
 - **Gatilho:** Falar com Mhordred no Campo de Treinamento.
 - **Condição para concluir:**
   - Falar com 3 soldados no Campo de Treinamento (discurso).
   - Falar com Mhordred após o discurso.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista)
  - Guardas recrutas (NPCs)
  - Mhordred (co-instrutor)
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`

## Desfechos Possíveis

- **Final A (Treinamento Completo):** Thorin e Mhordred treinam a Guarda em formações de cerco e contra-ataque — Sinergia perfeita.

## Condição de Falha

- **Final B (Ignora):** Guarda usa táticas padrão, menos eficaz contra Ignotos.

## Recompensas

- **v_forca_guarda:** +30 pontos (do total de 100).
- **Narrativa:** Cena de Thorin ensinando e sendo reconhecido como líder nato.
