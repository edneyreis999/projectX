# Recrutar Sáparo como Isca

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (casa de Thorin)

## Contexto Narrativo

Quest cômica que aprofunda o relacionamento entre Thorin e Sáparo Boca-de-Corneta, sua criatura de estimação. Balastrus propõe usar uma "isca barulhenta" para atrair os Ignotos gigantes até as armadilhas. Thorin percebe que Sáparo, com seu grito característico, seria perfeito para o papel. A quest mostra o lado leve da preparação para guerra e reforça a lealdade de Sáparo a Thorin.

## Gatilhos

- **Condições de início:** Completar "Testar Dinamite"
- **Requisitos:** `flag_dinamite_testada = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Sáparo Boca-de-Corneta (criatura de estimação)
  - Thorin (protagonista)
  - Balastrus (NPC)
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_saparo_isca` (switch)
- **Consequências:**
  - Sáparo será usado na Fase 1 (cutscene automática)
  - Desbloqueia quest "Posicionar Armadilhas"

## Desfechos Possíveis

- **Final A (Aceita):** Thorin treina Sáparo para correr em rota específica e gritar nos momentos certos — Sáparo aprende comandos (`v_pontos_armadilhas + 20`, `flag_saparo_isca = ON`)
- **Final B (Recusa):** Thorin protege Sáparo e não o coloca em risco — Tusk será usado como isca padrão (menos eficiente)

## Recompensas

- **v_pontos_armadilhas:** +20 pontos (20% do total de 100)
- **Narrativa:** Cena de treinamento cômica com Sáparo aprendendo a "berrar e correr"
