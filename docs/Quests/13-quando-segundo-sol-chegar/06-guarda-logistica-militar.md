# Organizar Logística Militar

## Identificação

- **Tipo:** Reforço Exército Guarda de Ferro
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (quartel da Guarda)

## Contexto Narrativo

Quest que aprofunda o arco de Thordan (pai de Thorin) e a relação pai-filho. Thordan, como General da Guarda de Ferro, precisa organizar suprimentos, rotas de abastecimento e coordenação das tropas. Esta é uma oportunidade de Thorin mostrar valor ao pai através de ações práticas militares, não apenas palavras. Demonstra que Thorin está amadurecendo e assumindo responsabilidades.

## Gatilhos

- **Condições de início:** Falar com Thordan no quartel após retornar de Melios
- **Requisitos:** Nenhum (quest liberada automaticamente)

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thordan (NPC principal)
  - Thorin (protagonista)
  - Oficiais da Guarda
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`
  - `flag_logistica_organizada` (switch)
- **Consequências:**
  - Melhora relação com Thordan
  - Guarda tem suprimentos adequados para batalha

## Desfechos Possíveis

- **Final A (Organização Completa):** Thorin coordena armazenamento de armas, comida e equipamentos médicos — Thordan reconhece o esforço com um aceno de cabeça (`v_forca_guarda + 25`, `flag_logistica_organizada = ON`)
- **Final B (Ignora):** Logística desorganizada, Guarda menos eficiente

## Recompensas

- **v_forca_guarda:** +25 pontos (25% do total de 100)
- **Narrativa:** Momento de conexão entre Thorin e Thordan trabalhando juntos
