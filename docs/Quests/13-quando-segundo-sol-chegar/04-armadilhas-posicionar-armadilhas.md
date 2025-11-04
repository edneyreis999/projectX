# Posicionar Armadilhas no Caminho

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1
- **Dificuldade:** Média (Requer ter ido a Kravens)
- **Localização:** Gildrat (muralhas externas)

## Contexto Narrativo

Quest que aprofunda a preparação tática de Gildrat e mostra Thorin assumindo responsabilidade militar real. Após ter mapeado posições e testado dinamite, agora é hora de instalar fisicamente as armadilhas nos locais estratégicos. Esta quest só é liberada após o jogador ter visitado Kravens e ter experiência com combate contra Ignotos, pois exige conhecimento prático das táticas inimigas.

## Gatilhos

- **Condições de início:** Retornar de Kravens E ter completado "Recrutar Sáparo"
- **Requisitos:**
  - `flag_kravens_visitado = ON`
  - `flag_saparo_isca = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Balastrus (supervisor)
  - Thorin (protagonista)
  - Engenheiros da Guarda de Ferro
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_armadilhas_posicionadas` (switch)
- **Consequências:**
  - Habilita quest final "Criar Rota de Fuga"
  - Armadilhas prontas para detonação na Fase 1

## Desfechos Possíveis

- **Final A (Posicionamento Perfeito):** Thorin instala todas as dinamites nos 3 pontos mapeados, usando conhecimento adquirido em Kravens — Sistema de detonação conectado (`v_pontos_armadilhas + 15`, `flag_armadilhas_posicionadas = ON`)
- **Final B (Ignora):** Armadilhas não instaladas — Fase 1 terá eficácia reduzida

## Recompensas

- **v_pontos_armadilhas:** +15 pontos (15% do total de 100)
- **Narrativa:** Diálogo entre Balastrus e Thorin sobre responsabilidade de proteger Gildrat
