# Inventário do projeto

## Estado

- Fase: reconciliação final do `loki-init`.
- Escopo: contexto comum e rotas para os 15 inventários de domínio aceitos.
- Cobertura: terminal na profundidade estática requerida; os gates humanos e
  de runtime indicados em cada domínio continuam pendentes.

## Identidade e áreas principais

Daratrine - A Origem é um projeto de RPG em português. O inventário comum
identificou estas áreas principais:

- `frontend/`: runtime do jogo;
- `docs/`: documentação de design e material de referência;
- `Obsidian/`: base de conhecimento narrativa;
- `scripts/`: scripts auxiliares, apenas mapeados e não executados no bootstrap;
- superfícies geradas, de cobertura, distribuição e temporários.

As superfícies de runtime e os outputs gerados estão fora da autoridade de
escrita do `loki-init`. Esta camada documental foi adicionada sem substituir o
conteúdo já existente.

## Documentação existente preservada

O inventário local encontrou três conjuntos documentais relevantes, mantidos
sem reescrita:

- [`GDD/`](GDD/) — GDD, worldbuilding, personagens, arte e combate;
- [`Quests/`](Quests/) — fluxos e documentos de quests;
- [`rpg-maker-for-ia/`](rpg-maker-for-ia/) — referências de RPG Maker MZ e
  VisuStella.

O catálogo navegável [`index.xml`](index.xml) foi criado neste bootstrap porque
não existia no snapshot inicial.

## Build e desenvolvimento observados

O pacote raiz expõe workflows de Jest, ESLint, Prettier, build/watch de
TypeScript e debug com NW.js. Esta é uma constatação do inventário comum; o
bootstrap não executou esses workflows nem validou seu comportamento.

## Inventários de domínio

Os 15 packets de domínio aceitos na revisão 1 foram materializados. Cada
README distingue cobertura estática de validação humana ou de runtime e mantém
visíveis conflitos, gaps, perguntas e próximas validações aplicáveis:

- produto e requisitos: [Produto](domains/game-product-owner/README.md),
  [Análise de Negócio](domains/game-business-analyst/README.md) e
  [Game Design](domains/game-designer/README.md);
- narrativa e conteúdo: [Design Narrativo](domains/narrative-designer/README.md),
  [QA Narrativo](domains/narrative-qa/README.md),
  [Conteúdo de Quests](domains/quest-content-designer/README.md) e
  [Level Design](domains/level-designer/README.md);
- experiência e apresentação: [UX/UI](domains/ux-ui-designer/README.md),
  [Apresentação de Cenas](domains/scene-presentation-designer/README.md) e
  [Áudio](domains/audio-designer/README.md);
- gameplay e economia: [Engenharia de Gameplay](domains/gameplay-engineer/README.md)
  e [Balanceamento e Economia](domains/balance-economy-designer/README.md);
- tecnologia e validação: [Implementação Técnica](domains/technical-implementer/README.md),
  [Arte Técnica](domains/technical-artist/README.md) e
  [Runtime QA](domains/runtime-qa/README.md).

O catálogo completo e as rotas para a documentação preexistente permanecem
em [`index.xml`](index.xml).

## Pendências preservadas

A cobertura terminal do inventário não fecha decisões nem certifica o jogo em
execução. Permanecem abertos, nos respectivos READMEs, conflitos de
progressão e TCR, cânone/finais, ownership e flags de quests, entradas de
plugins duplicadas, referências de assets ausentes, reachability, save/load,
compatibilidade de versão, acessibilidade, performance e qualidade
perceptível. Os gates humanos e de Playtest continuam pendentes.

## Proveniência e limites

Este documento partiu do packet comum aceito `common-inventory-001` revisão 1
e foi reconciliado somente com as rotas e disposições dos 15 packets de domínio
aceitos e materializados. Os detalhes operacionais, IDs transitórios e hashes
permanecem no estado retomável do `loki-init`, fora da documentação de
descoberta. Nenhum conflito ou gate pendente foi resolvido por suposição.
