# Contexto de tecnologia

## Estado

- Fase: reconciliação final do `loki-init`.
- Confiança do inventário estático: alta para a identificação das superfícies.
- Cobertura dos 15 domínios: terminal na profundidade estática requerida.
- Validação de runtime e comportamento perceptível: pendente.

## Engine e estrutura técnica observadas

`frontend/` é um projeto RPG Maker MZ com fonte local da engine e superfícies
padrão de banco de dados e eventos. O inventário estático também encontrou
TypeScript, Jest e uma estrutura pequena de `domain`, `application` e `dto`
convivendo com plugins e dados do RPG Maker.

O tipo de projeto selecionado para o inventário Loki é `game-dev`.

## Plugins e escala estática

O envelope `frontend/js/plugins.js` contém 63 entradas, das quais 46 estão
ativas. Entre as famílias ativas observadas estão VisuStella Core, Battle, ATB,
TP, Message e Save, além de plugins específicos Coreto.

O inventário estruturado encontrou:

- 48 mapas;
- 200 Common Events, sendo 8 paralelos;
- 102 slots de switches;
- 110 slots de variáveis.

Esses números descrevem o snapshot estático aceito; não demonstram que cada
superfície está alcançável ou funciona em execução.

## Superfícies sensíveis

As superfícies `frontend/data/**`, `frontend/js/**`, `frontend/audio/**`,
`frontend/img/**`, `frontend/effects/**`, `frontend/save/**` e
`frontend/typescript/**` foram identificadas como sensíveis e permanecem fora
da autoridade de escrita deste bootstrap.

## Limite de validação

O inventário estático não valida gameplay, timing, áudio, visuais, input,
integrações nem restauração de save/load. Playtest e validação humana continuam
pendentes para qualquer afirmação de comportamento perceptível ou de runtime.

## Navegação por domínio

As superfícies técnicas e seus limites foram distribuídos pelos 15 inventários
aceitos. Use os READMEs abaixo como fonte de descoberta, preservando os gates e
conflitos registrados em cada um:

- [Runtime QA](domains/runtime-qa/README.md)
- [Implementação Técnica](domains/technical-implementer/README.md)
- [Produto](domains/game-product-owner/README.md)
- [Análise de Negócio](domains/game-business-analyst/README.md)
- [Game Design](domains/game-designer/README.md)
- [Design Narrativo](domains/narrative-designer/README.md)
- [UX/UI](domains/ux-ui-designer/README.md)
- [Engenharia de Gameplay](domains/gameplay-engineer/README.md)
- [QA Narrativo](domains/narrative-qa/README.md)
- [Level Design](domains/level-designer/README.md)
- [Balanceamento e Economia](domains/balance-economy-designer/README.md)
- [Apresentação de Cenas](domains/scene-presentation-designer/README.md)
- [Áudio](domains/audio-designer/README.md)
- [Conteúdo de Quests](domains/quest-content-designer/README.md)
- [Arte Técnica](domains/technical-artist/README.md)

Os conflitos técnicos conhecidos permanecem abertos, incluindo entradas de
plugins duplicadas, drift de versão, divergências entre dados e intenção,
referências ausentes e superfícies não exercitadas. A cobertura terminal do
inventário não substitui build, testes, profiling, Playtest nem decisão humana.

## Proveniência e disposição

Este documento partiu do packet aceito `technology-context-001` revisão 1 e
foi reconciliado somente com as rotas e disposições dos 15 packets de domínio
aceitos e materializados. Findings, conflitos e gates permanecem nos READMEs
correspondentes; nenhum comportamento de runtime foi inferido nesta etapa.
