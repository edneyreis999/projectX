# Resgatar Grupo Principal de Corvos em Melios

## Identificação

- **Tipo:** Reforço Exército Corvos
- **Dificuldade:** Média (Requer ir a Melios)
- **Localização:** Melios (câmara central da mina)

## Contexto Narrativo

Quest crítica de resgate que aprofunda o arco dos Corvos e a culpa de Thorin/Balastrus pelo selo quebrado. Quando Balastrus quebrou o selo na Cena 10b, o grupo principal dos Corvos ficou preso tentando conter os Ignotos. São 15-20 Corvos liderados pelo Chefe dos Corvos, defendendo posição desesperada. Resgatar eles é tanto tático (ganhar guerreiros experientes) quanto moral (Thorin se redime por ter participado da quebra do selo).

## Gatilhos

- **Condições de início:** Entrar em Melios e receber alerta de Corvos sob ataque
- **Requisitos:** Passagem para Melios liberada

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Chefe dos Corvos (líder do grupo)
  - Grupo de Corvos (15-20 NPCs)
  - Thorin (protagonista/resgatador)
  - Balastrus (menciona culpa em diálogo posterior)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_corvos_principais_resgatados` (switch)
- **Consequências:**
  - Corvos ganham respeito total por Thorin
  - Corvos se tornam núcleo do exército Corvos na Fase 2
  - Chefe dos Corvos tem diálogo de gratidão profunda

## Desfechos Possíveis

- **Final A (Resgate Completo):** Thorin abre corredor de fuga, todos os Corvos evacuam — Chefe dos Corvos: "Você pagou sua dívida" (`v_influencia_corvos + 30`, `flag_corvos_principais_resgatados = ON`)
- **Final B (Resgate Parcial):** Apenas metade dos Corvos sobrevive — Gratidão mas também tristeza (`v_influencia_corvos + 15`)
- **Final C (Falha Total):** Corvos morrem, facção destruída

## Recompensas

- **v_influencia_corvos:** +30 pontos (30% do total de 100)
- **Narrativa:** Cena emocional de Corvos feridos agradecendo a Thorin, quebrando orgulho independente
