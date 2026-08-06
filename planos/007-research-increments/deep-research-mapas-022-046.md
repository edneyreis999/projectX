# Loki Deep Research — Mapas 022 e 046

## Status

**Completed.** Nenhum arquivo de runtime foi alterado.

Este relatório interpreta “deixar de ser indie” como **sair de uma apresentação ainda artesanal/prototípica para um acabamento profissional e comercial**. Indie é um modelo de produção, não um nível de qualidade.

## Diagnóstico

Os mapas já têm uma base melhor do que parecia inicialmente:

- O `frontend/data/Map022.json` é uma cena física compacta de 17×27, com 31 eventos, 17 crianças, câmera dirigida, 14 Gabs, tint noturno, BGM e movimentação de multidão.
- O `frontend/data/Map046.json` é uma cena VN: parallax 1280×720, dois busts, seis trocas de expressão, escolha visual e um Cut-In em tela cheia.
- A cena já possui contratos importantes de composição e cleanup documentados em `docs/domains/scene-presentation-designer/README.md`.
- Core Engine, Events & Movement Core, Message Core, VN Picture Busts, Gab Window e Map Camera Zoom estão ativos. Ambience Sounds está instalado, mas inativo.

O principal salto comercial não virá de adicionar conteúdo indiscriminadamente. Virá de **hierarquia visual, áudio, movimento sutil, coerência artística, feedback e ritmo**.

## 20 melhorias propostas

### Map022 — EX_Coreto

| # | Melhoria concreta | Resultado esperado | Prioridade / esforço |
|---|---|---|---|
| 1 | **Criar um foco de iluminação quente no contador de histórias**, mantendo as bordas do mapa frias e escuras. Pode começar com tint, tiles emissivos e overlay; Lighting Effects seria uma avaliação opcional. | O jogador entende instantaneamente onde está o centro dramático. | P0 / Médio |
| 2 | **Transformar a câmera existente em uma linguagem de três beats:** revelar o espaço, enquadrar Rheed/fogueira e devolver o controle ao jogador. Evitar zooms constantes. | Entrada mais cinematográfica sem parecer uma demonstração de plugin. | P1 / Baixo |
| 3 | **Adicionar soundscape em camadas:** noite/insetos ou vento como BGS, fogo e murmúrio distante como SE posicionais, mantendo a música como camada emocional. Hoje o mapa não possui BGS. | O cenário deixa de parecer silencioso e “digital”. | P0 / Médio |
| 4 | **Criar resposta sonora por superfície**, usando regiões para pedra, terra, madeira e grama. A camada de regiões do mapa está atualmente vazia. | Movimento passa a ter peso e materialidade. | P1 / Alto |
| 5 | **Dar personalidades de movimento às 17 crianças:** algumas sentadas, outras inquietas, cochichando, virando para a fogueira ou olhando o jogador, com timings desencontrados. | A multidão deixa de parecer um conjunto de eventos clonados. | P0 / Médio |
| 6 | **Adicionar reações coletivas em beats específicos da história:** virar para Rheed, balão de surpresa, pequeno recuo, riso ou silêncio, sempre combinando sinal visual e sonoro. | A história parece acontecer para uma plateia viva. | P1 / Médio |
| 7 | **Fazer o mapa evoluir nos estados da quest** já existentes (`0/10/20/90`): luz, música, posição das crianças, falas, intensidade do fogo e disponibilidade da saída. | O mundo reconhece o progresso do jogador. | P1 / Alto |
| 8 | **Selecionar 3–5 props visíveis para microinterações ambientais**, usando a regra existente do Gab Window: brinquedo perdido, assento, decoração, objeto de Rheed ou detalhe da praça. | Environmental storytelling e sensação de autoria sem criar uma subquest inteira. | P1 / Médio |
| 9 | **Reforçar wayfinding diegético:** landmark central claro e, após a cena, luz/movimento/câmera conduzindo à saída para o Map045. | Menos hesitação e nenhuma necessidade de seta artificial. | P0 / Baixo–médio |
| 10 | **Fazer um art pass técnico completo:** corrigir repetição e seams de tiles, clarear colisões aparentes, adicionar profundidade com foreground/occluders, sombras de sprites e partículas discretas de fumaça ou brasas. | Remove a “grade de RPG Maker” e dá acabamento autoral. | P0 / Alto |

A documentação local do Events & Movement Core confirma suporte a sombras, movimento, labels, ícones, popups e regiões; o Gab Window já possui uma regra própria para o Map022 em `docs/architecture/exploration-dialogue-gabwindow.md`.

### Map046 — VN_Noite_da_Historia

| # | Melhoria concreta | Resultado esperado | Prioridade / esforço |
|---|---|---|---|
| 11 | **Dar ownership explícito ao áudio da cena:** crossfade intencional entre o Map022, a entrada VN e o retorno. Hoje o Map046 não possui comandos próprios de áudio e pode depender do que foi herdado. | Evita transições sonoras acidentais e estabelece começo/meio/fim. | P0 / Médio |
| 12 | **Criar uma paisagem sonora VN:** fogo baixo, multidão, madeira, roupa, reação infantil e um sting específico antes do Cut-In de Thorin. | O fundo estático passa a parecer um lugar habitado. | P0 / Médio |
| 13 | **Aplicar foco de falante nos busts:** personagem ativo iluminado; personagem passivo discretamente escurecido. O VN Picture Busts ativo já suporta tone/tint. | Clareza instantânea de quem fala e composição mais profissional. | P0 / Baixo |
| 14 | **Adicionar microanimações de bust:** respiração suave para Rheed e pequena inquietação para a criança, interrompidas antes de trocas e saídas. | Personagens deixam de parecer recortes imóveis. | P1 / Baixo–médio |
| 15 | **Expandir seletivamente as expressões**, não em toda fala: curiosidade, riso, surpresa contida e solenidade em quatro ou cinco beats importantes. | Emoção visual mais precisa sem virar troca frenética de portraits. | P1 / Médio–alto |
| 16 | **Criar uma gramática de movimento dos busts:** aproximação de 3–5%, pequeno deslocamento no punchline e recuo antes do Cut-In; usar easing consistente. | Ritmo visual equivalente ao de uma VN comercial. | P1 / Médio |
| 17 | **Transformar o parallax estático em composição multicamada:** flicker de lanternas, brasas, sombra de foreground e movimento atmosférico quase imperceptível. | Profundidade sem competir com texto e busts. | P1 / Médio–alto |
| 18 | **Unificar a direção artística entre fundo, busts e Cut-In.** Há uma possível ruptura entre o fundo pictórico, os busts de ilustração limpa e o Cut-In texturizado. Aplicar color grading, temperatura de sombra, grain e rim light comuns. | Este é provavelmente o maior ganho de percepção comercial do Map046. | P0 / Alto |
| 19 | **Revisar apresentação do diálogo e da escolha:** nameplates consistentes, word wrap, paginação das falas longas — uma chega a 169 caracteres —, pausas, SE de hover/confirmação e opção de texto rápido/redução de movimento. | Leitura confortável, identidade de falante e UX mais refinada. | P0 / Médio |
| 20 | **Criar um beat final memorável:** silêncio ou sting curto, mudança visual conclusiva, feedback da quest e transição casada com o Map045, preservando o cleanup já correto da Picture 10. | A cena termina com payoff, não apenas com encerramento técnico. | P0 / Baixo–médio |

A documentação local confirma que VN Picture Busts já oferece breathing, fidgeting, swaying e tone/tint em:

- `docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/comandos/animacoes.md`;
- `docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/comandos/tone-tint.md`.

## Melhor primeira rodada

Para obter o maior ganho sem reconstruir os mapas, começar por:

1. Iluminação focal do Map022.
2. Soundscape do Map022.
3. Coreografia das crianças.
4. Ownership/crossfade de áudio no Map046.
5. Foco de falante por tone/tint.
6. Revisão de diálogo, paginação e escolhas.

Depois, executar o pacote mais caro: art pass do Map022, multicamadas do Map046 e unificação artística dos assets.

## Metodologia e evidências

Foram executadas três trilhas independentes: acabamento comercial, exploração/wayfinding e capacidades RPG Maker/VisuStella. A inspeção local incluiu parse estruturado dos dois mapas, configuração ativa de plugins, assets do Map046 e documentação durável do projeto.

A síntese externa converge em alguns princípios:

- landmarks, paths e nodes orientam melhor que decoração homogênea;
- detalhe profissional é **hierarquizado**, não maximizado;
- elementos interativos precisam de linguagem visual consistente;
- iluminação deve sustentar simultaneamente humor e legibilidade;
- qualidade percebida vem de várias passagens especializadas e QA.

Fontes principais:

- [Narrative Landscapes — GDC](https://www.gdcvault.com/play/729/Narrative-Landscapes-Shaping-Player-Experience)
- [Invisible Intuition — GDC](https://www.gdcvault.com/play/1025179/Level-Design-Workshop-Invisible-Intuition)
- [Rewarding Exploration — GDC](https://www.gdcvault.com/play/1024305/Level-Design-Workshop-Rewarding-Exploration)
- [Postmortem de Children of Morta](https://www.gamedeveloper.com/design/postmortem-children-of-morta)
- [Environment stories de Owlboy](https://www.gamedeveloper.com/design/level-design---environment-stories)
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/give-a-clear-indication-that-interactive-elements-are-interactive/)

Para implementação, as capacidades foram verificadas na [documentação oficial de eventos do RPG Maker MZ](https://rpgmakerofficial.com/product/MZ_help-en/01_10.html) e nas páginas oficiais de [Map Camera Zoom](https://visustellamz.itch.io/map-camera-zoom), [Lighting Effects](https://visustellamz.itch.io/lighting-effects) e [Movement Effects](https://visustellamz.itch.io/movement-effects).

## Consenso e divergências

- **Detalhe versus legibilidade:** efeitos, animações e riqueza visual elevam a produção, mas densidade uniforme destrói foco. A recomendação é detalhe hierarquizado.
- **Descoberta sutil versus affordance:** informação essencial e interações devem ser claras; conteúdo narrativo opcional pode permanecer sutil.
- **Mais plugins versus acabamento nativo:** vários ganhos podem começar com comandos nativos, assets e plugins já ativos. Novos plugins só devem entrar quando resolverem uma necessidade não atendida.
- **Imagem estática versus qualidade jogável:** uma boa captura não valida orientação, colisão, áudio, pacing ou feedback durante o movimento.

## Limites, riscos e gates

- O Map022 foi analisado estruturalmente, mas não renderizado nem jogado nesta pesquisa.
- O Map046 teve seus assets inspecionados, mas a composição final com janelas e busts ainda exige Playtest.
- Mais efeitos podem piorar legibilidade e performance. O objetivo é uma hierarquia forte, não acumulação.
- Lighting, Weather ou Movement Effects não estão confirmados como ativos/licenciados; qualquer adoção exige análise de compatibilidade.
- Câmera, áudio, timing, colisão, acessibilidade, save/load e cleanup precisam de Playtest desde New Game.

## Artefatos e resume state

Artefato deste relatório: `planos/008-research-increments/deep-research-mapas-022-046.md`.

Três handoffs de pesquisa foram concluídos; parse JSON e envelope de `plugins.js` passaram. A pesquisa termina com 20 candidatos priorizados e uma primeira rodada de seis melhorias. O próximo workflow apropriado, caso os itens sejam escolhidos para implementação, é um `loki-tech-analysis`, seguido de plano e Playtest humano.
