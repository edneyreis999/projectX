# Fortificar Muralhas

## Identificação

- **Tipo:** Reforço Exército Guarda de Ferro
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (muralhas externas)

## Contexto Narrativo

Quest que mostra Thorin aprendendo sobre engenharia defensiva anã. Os engenheiros da Guarda de Ferro precisam reforçar pontos fracos nas muralhas antes do ataque dos Ignotos. Thorin trabalha lado a lado com artesãos e soldados, conectando-se com o povo que ele jurou proteger. Aprofunda o tema de que Gildrat é mais que pedras - são as pessoas e suas histórias.

## Gatilhos

- **Condições de início:** Falar com Engenheiro-Chefe nas muralhas
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Engenheiro-Chefe (NPC)
  - Thorin (protagonista)
  - Trabalhadores civis
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`
  - `flag_muralhas_fortificadas` (switch)
- **Consequências:**
  - Muralhas mais resistentes
  - Trabalhadores reconhecem Thorin como líder

## Desfechos Possíveis

- **Final A (Fortificação Completa):** Thorin ajuda a reforçar 5 pontos fracos com pedra e metal — Muralhas prontas para resistir ao primeiro impacto (`v_forca_guarda + 25`, `flag_muralhas_fortificadas = ON`)
- **Final B (Ignora):** Muralhas permanecem vulneráveis

## Recompensas

- **v_forca_guarda:** +25 pontos (25% do total de 100)
- **Narrativa:** Diálogos com trabalhadores sobre suas famílias e o que defendem
