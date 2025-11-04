# Testar Dinamite

## Identificação

- **Tipo:** Reforço Armadilhas Fase 1
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (campo de testes fora da cidade)

## Contexto Narrativo

Quest que aprofunda a relação de confiança entre Thorin e Balastrus. Balastrus, como inventor, criou dinamite mas precisa calibrar a potência ideal para maximizar dano aos Ignotos sem destruir a estrutura de Gildrat. Thorin participa dos testes práticos, demonstrando que está disposto a contribuir ativamente para a defesa, não apenas como soldado mas como parceiro científico de Balastrus.

## Gatilhos

- **Condições de início:** Completar "Mapear Posições Estratégicas"
- **Requisitos:** `flag_armadilha_mapeada = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Balastrus (NPC principal)
  - Thorin (protagonista)
  - NPC Assistente de Balastrus
- **Variáveis / Flags Alteradas:**
  - `v_pontos_armadilhas`
  - `flag_dinamite_testada` (switch)
- **Consequências:**
  - Desbloqueia diálogo técnico com Balastrus
  - Permite quest "Recrutar Sáparo como Isca"

## Desfechos Possíveis

- **Final A (Sucesso Total):** Todos os 3 testes são bem-sucedidos — Balastrus calibra a dinamite perfeitamente (`v_pontos_armadilhas + 25`, `flag_dinamite_testada = ON`)
- **Final B (Ignora):** Jogador não realiza os testes — Dinamites não calibradas, menor eficácia nas armadilhas

## Recompensas

- **v_pontos_armadilhas:** +25 pontos (25% do total de 100)
- **Narrativa:** Cena cômica onde Balastrus quase se machuca com uma explosão, Thorin o salva
