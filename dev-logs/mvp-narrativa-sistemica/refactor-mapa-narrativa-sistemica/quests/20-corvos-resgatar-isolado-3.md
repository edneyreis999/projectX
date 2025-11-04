# Resgatar Corvo Isolado 3 - Seção Profunda

## Identificação

- **Tipo:** Reforço Exército Corvos
- **Dificuldade:** Média (Requer exploração profunda em Melios)
- **Localização:** Melios (seção mais profunda da mina)

## Contexto Narrativo

Quest opcional mais desafiadora que testa a determinação do jogador. Este Corvo está na seção mais profunda de Melios, área perigosa cheia de Ignotos. Requer que o jogador decida: vale a pena arriscar para salvar uma pessoa? Esta decisão moral aprofunda o caráter de Thorin - ele é alguém que calcula riscos ou que valoriza cada vida igualmente? Corvos observam essa escolha.

## Gatilhos

- **Condições de início:** Alcançar seção profunda de Melios e ouvir grito distante
- **Requisitos:** Estar em Melios, ter equipamento/nível adequado para área perigosa

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Corvo Isolado 3 (NPC em perigo extremo)
  - Thorin (protagonista/resgatador)
  - Grupo de Ignotos (inimigos bloqueando caminho)
- **Variáveis / Flags Alteradas:**
  - `v_influencia_corvos`
  - `flag_corvo_isolado_3` (switch)
- **Consequências:**
  - Corvos ganham respeito máximo por Thorin
  - Demonstra que Thorin arrisca tudo por qualquer um
  - Corvos contam história de heroísmo de Thorin entre eles

## Desfechos Possíveis

- **Final A (Resgate Heroico):** Thorin enfrenta múltiplos Ignotos e resgata Corvo de seção profunda — Corvo chora de gratidão (`v_influencia_corvos + 15`, `flag_corvo_isolado_3 = ON`)
- **Final B (Ignora por Perigo):** Jogador decide não arriscar — Corvo morre, mas é decisão compreensível

## Recompensas

- **v_influencia_corvos:** +15 pontos (15% do total de 100)
- **Narrativa:** Chefe dos Corvos ouve sobre o resgate: "Você desceu até lá? Por UM de nós?"
- **Reputação:** Corvos passam a chamar Thorin de "Irmão de Ferro" (título de honra)
