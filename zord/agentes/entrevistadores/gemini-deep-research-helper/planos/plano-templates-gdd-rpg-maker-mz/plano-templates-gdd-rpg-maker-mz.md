# Narrative GDD para RPG Maker MZ — plano de documentação (CONFIRME O TÍTULO)

Slug sugerido: narrative-gdd-rpg-maker-mz

## Objetivo e contexto

- Objetivo: documentar de forma completa e prática a narrativa do jogo (apenas narrativa) para posterior implementação no RPG Maker MZ.
- Escopo: focar exclusivamente em narrativa — premissa, temas, tom, worldbuilding, personagens, arcos, estrutura, quests/linhas narrativas, cenas e diálogos, escolhas e consequências, pacing, glossário e bíblia de lore. Fora de escopo neste momento: mecânicas/sistemas, economia, balanceamento, UI/UX, arte, áudio e pipelines técnicos.
- Uso esperado: servir como “bíblia narrativa” e guia de implementação de eventos/cenas no MZ, mantendo rastreabilidade entre beats narrativos e gatilhos/condições (switches/variáveis/event pages) quando pertinente.

## Perguntas para levantamento (elicitação)

- Logline, premissa, temas e tom desejado; público-alvo e referências.
- Estrutura macro: linear, ramificada ou híbrida? Profundidade de ramificações e limites de escopo.
- Worldbuilding: período, tecnologia/magia, regras do mundo, conflitos centrais, facções e locais-chave.
- Personagens: protagonista(s), antagonista(s), elenco de suporte; bios, motivações, objetivos, conflitos internos/externos; evolução de relacionamento.
- Arcos: arcos de personagem e de história; pontos de virada e momentos-chave (beats) por ato/capítulo.
- Quests e linhas narrativas: main quest, side quests, questlines de facções; pré-requisitos, dependências e falhas recuperáveis.
- Cenas e diálogos: cenas obrigatórias e opcionais; objetivos dramáticos; exemplos de diálogos; estados que afetam falas.
- Escolhas e consequências: decisões do jogador, ramos, variáveis/switches envolvidos, impactos locais e globais; finais alternativos (se houver).
- Pacing: cadência de revelações, respiros, conflitos e clímax; ritmo por capítulo/área.
- Conteúdos colecionáveis e lore: documentos, itens, memórias, registros que ampliam a história; onde e quando desbloqueiam.

## Metodologia

- Abordagem de construção iterativa:
  - Sessões de descoberta com o solicitante para preencher as seções acima (roteiro de entrevista e questionários curtos).
  - Modelagem de estrutura (atos/capítulos) e mapa de fluxo narrativo (árvore de escolhas e dependências) com IDs estáveis.
  - Detalhamento incremental: primeiro visão macro (premissa/estrutura), depois personagens e arcos, por fim cenas/diálogos e condições.
- Critérios de inclusão
  - Apenas artefatos narrativos e seus gatilhos/condições lógicas quando relevantes à implementação no MZ.
- Critérios de exclusão
  - Mecânicas de combate, economia, números de balanceamento, UI/UX, arte e áudio, pipelines e plugins não ligados diretamente à narrativa.
- Métricas de qualidade
  - Completude das seções narrativas; coerência interna (temas, tom, continuidade); clareza de dependências (pré-requisitos, switches/variáveis); testabilidade (capacidade de reproduzir a progressão com eventos); risco de escopo controlado.
- Rastreabilidade
  - Mapear cada beat/cena para um identificador e, quando aplicável, indicar switches/variáveis e condições do MZ que habilitam/alteram a cena.
- Validação
  - Revisões por capítulo; walkthrough narrativo ponta a ponta (com e sem escolhas); checagem de consistência de estados e finais.

## Estrutura proposta do Narrative GDD

- Visão geral: logline, premissa, temas, tom, referências.
- Worldbuilding: lore, timeline, locais e facções.
- Personagens: fichas, relações, arcos.
- Estrutura e beats: atos/capítulos com beats principais; quadro de pacing.
- Quests e dependências: main/side/facções, pré-requisitos e consequências; fluxos/diagramas.
- Cenas e diálogos: lista de cenas com objetivo dramático, condições de entrada/saída, notas de encenação; exemplos de diálogos.
- Escolhas e finais: árvore de escolhas, variáveis/switches, finais alternativos.
- Conteúdos de lore: colecionáveis e desbloqueios.
- Glossário e convenções: termos, nomes canônicos, estilo de fala.

## Fontes e apoio (opcional)

- Referenciais de estrutura: Três Atos, Jornada do Herói, Save the Cat, Story Beats.
- Práticas para MZ: uso de switches/variáveis, self-switches, common events e páginas de evento para gatear cenas (apenas como referência de implementação narrativa).

## Entregáveis e critérios de aceitação

- Entregáveis
  - Documento Narrative GDD completo conforme a estrutura proposta, em PT-BR; versões exportáveis (Markdown/PDF/Notion, a definir).
  - Mapa de fluxo narrativo (diagrama) e tabela de rastreabilidade beats → condições/estados (quando aplicável).
  - Lista priorizada de cenas e diálogos mínimos (MVP narrativo) e backlog de cenas opcionais.
- Critérios de aceitação
  - Todas as seções narrativas preenchidas com coerência e clareza; dependências e escolhas documentadas; escopo validado; pronto para detalhamento de implementação no MZ.

## Próximos passos

- Confirmar título definitivo e slug.
- Escolher ferramenta de edição principal (Markdown/Notion) e padrão de IDs.
- Iniciar elicitação: logline/premissa/temas/tom e elenco principal.
- Definir estrutura macro (atos/capítulos) e principais beats.
- Esboçar mapa de escolhas e dependências; listar cenas MVP.
- Agendar ciclos de revisão por capítulo e por ramos críticos.

---
Observação: esta versão foca exclusivamente na narrativa, conforme solicitado.
