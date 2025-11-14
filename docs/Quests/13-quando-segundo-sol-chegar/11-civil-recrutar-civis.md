# Recrutar Civis para Milícia

## Identificação

- **Tipo:** Reforço Exército Civil
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (praça central)

## Contexto Narrativo

Quest que mostra Thorin conectando-se com o povo comum de Gildrat. Comerciantes, artesãos e pais de família decidem pegar em armas para defender seus lares. Esta quest aprofunda o tema de que a verdadeira força de Gildrat não vem apenas da Guarda de Ferro, mas da união de todo o povo. Thorin descobre que liderança não é só sobre táticas militares, mas sobre inspirar e mobilizar pessoas comuns a serem heróicas.

## Gatilhos

- **Condições de início:** Falar com Organizador da Praça Central após retornar de Melios
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista)
  - Organizador da Milícia (NPC)
  - Civis voluntários (NPCs de background)
- **Variáveis / Flags Alteradas:**
  - `v_forca_civil`
  - `flag_civis_recrutados` (switch)
- **Consequências:**
  - Civis formam primeira onda de defesa
  - Desbloqueia diálogos emocionais com famílias

## Desfechos Possíveis

- **Final A (Recrutamento Bem-sucedido):** Thorin consegue recrutar 50+ civis voluntários através de discurso inspirador — Milícia formada (`v_forca_civil + 30`, `flag_civis_recrutados = ON`)
- **Final B (Ignora):** Civis permanecem desorganizados, menor número de voluntários

## Recompensas

- **v_forca_civil:** +30 pontos (30% do total de 100)
- **Narrativa:** Cena de Thorin discursando na praça, famílias se abraçando antes de se voluntariar
