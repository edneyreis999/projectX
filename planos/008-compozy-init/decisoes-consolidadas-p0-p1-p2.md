---
date: 2026-08-18
scope: EX_Coreto e EX_Casa da Familia Forjaprata --- quest atualmente em
  implementação
status: p0-p1-p2-revisados
title: Checkpoint Human in the Loop --- decisões consolidadas P0, P1 e
  P2
type: decision-checkpoint
---

# Checkpoint Human in the Loop --- P0, P1 e P2

## Objetivo

Este documento consolida as decisões humanas tomadas durante a revisão
dos itens P0, P1 e P2 da análise técnica dos mapas `EX_Coreto` e
`EX_Casa da Familia Forjaprata`.

Também registra os refinamentos conceituais e aprendizados obtidos
durante a conversa, para que futuras análises não repitam hipóteses que
já foram esclarecidas.

------------------------------------------------------------------------

# Diretriz para análises futuras

## Consultar a documentação antes de formular novas conclusões

Nas próximas análises técnicas, a documentação existente do projeto deve
ser consultada como fonte de contexto antes de propor alterações
arquiteturais, narrativas ou de gameplay.

O objetivo é evitar:

-   redescobrir decisões já tomadas;
-   interpretar incorretamente regras narrativas;
-   ampliar o escopo de uma quest apenas porque eventos compartilham o
    mesmo mapa;
-   propor mudanças incompatíveis com contratos já definidos;
-   tratar decisões humanas consolidadas como questões ainda em aberto.

Os checkpoints de Human in the Loop devem ser considerados parte dessa
documentação.

------------------------------------------------------------------------

# Modelo narrativo esclarecido

## Coreto: presente e moldura narrativa

O `EX_Coreto` representa o presente.

O personagem do jogador está no Coreto junto das outras crianças para
ouvir Rheed contar uma história.

Esse espaço funciona como **moldura narrativa**.

## Casa da Família Forjaprata: passado e universo da história

O `EX_Casa da Familia Forjaprata` já pertence à história que está sendo
contada.

Portanto, esse mapa representa outro nível narrativo: o passado/conteúdo
da história narrada por Rheed.

## Rheed e as crianças durante a história

Quando Rheed e as crianças aparecem sobre o universo da história, eles
não devem ser interpretados como habitantes normais daquele espaço.

Eles pertencem à camada da moldura narrativa e podem se manifestar sobre
a história sem obedecer às regras físicas do universo narrado.

Isso explica comportamentos como:

-   atravessar paredes;
-   atravessar objetos;
-   ignorar colisões;
-   aparecer sobre espaços que pertencem ao passado;
-   não obedecer às mesmas regras físicas dos personagens internos da
    história.

A interpretação consolidada é **metanarrativa**, e não uma presença
física comum dentro do universo da história.

------------------------------------------------------------------------

# Princípios consolidados

## 1. EX e VN são diferenciados principalmente pela função narrativa

A regra simplificada "EX nunca bloqueia o jogador" foi rejeitada.

O contrato correto é:

-   mapas `EX` podem conter cutscenes legítimas;
-   cutscenes em `EX` podem retirar temporariamente o controle;
-   chatter e falas ambientais não devem bloquear desnecessariamente;
-   narrativa crítica da quest deve permanecer no fluxo `VN`;
-   perda de controle, isoladamente, não transforma uma cena em VN.

## 2. Escopo é determinado pela quest, não pelo mapa

Estar no mesmo mapa não significa estar no mesmo escopo.

Conteúdo pertencente a quests futuras deve permanecer intocado até sua
respectiva quest entrar em desenvolvimento.

## 3. Critérios de playtest não são mecânicas

Tempos e taxas de sucesso utilizados em testes humanos servem para
avaliar legibilidade e experiência.

Eles não implicam implementar:

-   timers;
-   cronômetros;
-   contagens regressivas;
-   pressão temporal;
-   telemetria obrigatória.

## 4. Decisões podem ser delegadas por especialidade

Especialidades podem receber autonomia para decisões dentro de sua área
quando isso for explicitamente delegado.

Audio Design, por exemplo, pode selecionar soluções sonoras apropriadas
sem exigir aprovação humana para cada asset.

------------------------------------------------------------------------

# P0 --- Integridade do fluxo

## P0-01 --- Contrato `EX -> VN -> EX`

**Decisão: IMPLEMENTAR.**

Formalizar entrada e retorno consistentes entre os mapas EX e VN,
garantindo idempotência, restauração de estado e segurança para
save/load, sem overengineering.

## P0-02 --- Reentrada de E18 / Map022

**Decisão: IMPLEMENTAR.**

Impedir que E18 reabra ou tente reabrir a VN depois que `V106` já
avançou para um estado incompatível.

## P0-03 --- Loops de Autorun em E11 / Map045 e Map049

**Decisão: IMPLEMENTAR.**

Primeiro mapear:

-   estados de entrada;
-   estados de retorno;
-   estado terminal;
-   páginas que devem permanecer inelegíveis.

Esse levantamento faz parte da implementação aprovada.

## P0-04 --- Conversa Tordan--Thorin de E8

**Decisão: FORA DE ESCOPO.**

A conversa pertence a uma quest futura.

Não alterar nem migrar nesta rodada.

## P0-05 --- E36, retorno de E11 e `WaitForGab`

**Decisão: IMPLEMENTAR COM REGRA REFINADA.**

Remover bloqueios desnecessários de falas ambientais.

Cutscenes legítimas em EX continuam podendo bloquear o jogador
temporariamente.

## P0-06 --- BGM `Dungeon5`

**Decisão: IMPLEMENTAR COM DECISÃO CRIATIVA DELEGADA AO AUDIO DESIGN.**

Corrigir a referência se o asset estiver ausente ou inválido.

Audio Design escolhe o substituto apropriado.

------------------------------------------------------------------------

# P1 --- Leitura, exploração e apresentação

## P1-01 --- Reorganizar as crianças do Coreto

**Decisão: IMPLEMENTAR.**

Criar três atividades visualmente reconhecíveis:

-   pega-pega;
-   ciranda;
-   conversa sentada.

A leitura deve ocorrer principalmente pela composição espacial e
movimento.

## P1-02 --- Preservar corredor crítico e recuperação das rotas

**Decisão: IMPLEMENTAR.**

Manter caminhos importantes livres e garantir recuperação das rotas das
crianças caso sejam deslocadas.

A progressão tem prioridade sobre a ambientação.

## P1-03 --- Melhorar o direcionamento espacial do Coreto

**Decisão: IMPLEMENTAR.**

Melhorar landmarks, composição e leitura espacial para orientar
naturalmente o jogador.

Critérios temporais são exclusivamente de playtest humano e não devem
gerar timers dentro do jogo.

## P1-04 --- Microloop "preparar e partir" da Casa Forjaprata

**Decisão: IMPLEMENTAR COM ESCOPO REDUZIDO.**

Melhorar somente os elementos pertencentes à quest atual.

### Troféu

O troféu pertence a uma quest futura.

Portanto:

-   não alterar nesta rodada;
-   não incorporá-lo ao fluxo obrigatório da quest atual;
-   preservar sua lógica para quando a quest correspondente entrar em
    escopo.

## P1-05 --- Contrato Gab Window nas falas EX

**Decisão: IMPLEMENTAR COM REGRA REFINADA.**

Falas ambientais devem evitar bloqueios desnecessários.

Porém, Gabs utilizados dentro de cutscenes legítimas podem fazer parte
de uma sequência que temporariamente bloqueia o jogador.

A regra deve considerar a função da cena, não apenas o comando
utilizado.

Conteúdo de quests futuras permanece fora de escopo.

## P1-06 --- Contrato de feedback audiovisual

**Decisão: IMPLEMENTAR.**

Evitar empilhar sinais redundantes para comunicar o mesmo acontecimento.

Gab, áudio, marcador e fanfarra devem coexistir apenas quando possuírem
funções distintas.

Aplicar somente ao conteúdo da quest atual.

## P1-07 --- Ambiência infantil esparsa e espacial

**Decisão: IMPLEMENTAR.**

Usar sons de forma espaçada, com cooldown e limite de simultaneidade.

Evitar um efeito sonoro para cada Gab.

A seleção concreta de sons pode ser delegada ao Audio Design.

## P1-08 --- Narrativa ambiental opcional

**Decisão: IMPLEMENTAR.**

Chatter ambiental deve poder ser ignorado sem impedir compreensão ou
progressão da main quest.

Isso não proíbe cutscenes legítimas em EX.

## P1-09 --- Matriz funcional e de playtest

**Decisão: IMPLEMENTAR COMO PROCESSO DE VALIDAÇÃO.**

Cobrir:

-   New Game;
-   save/load;
-   EX/VN;
-   repetição e reentrada;
-   passabilidade;
-   Gabs;
-   limpeza de sessão;
-   restauração de estado;
-   entendimento do próximo objetivo.

A matriz é ferramenta de QA/playtest, não uma feature do jogo.

------------------------------------------------------------------------

# P2 --- Consistência e polimento

## P2-01 --- Separar staging de cena do estado canônico de `V106`

**Decisão: IMPLEMENTAR.**

A `V106` está exercendo duas responsabilidades:

1.  representar progresso real/canônico da quest;
2.  representar estados temporários utilizados para staging de cenas.

Essas responsabilidades devem ser separadas.

### Ordem aprovada

Antes da alteração:

1.  inventariar leitores e escritores dos valores envolvidos;
2.  entender as dependências existentes;
3.  definir claramente o contrato entre progresso persistente e staging
    temporário;
4.  somente então implementar a separação.

Não selecionar novos IDs arbitrariamente antes de compreender e aprovar
o contrato necessário.

## P2-02 --- Normalizar `NV_` para `VN_`

**Decisão: IMPLEMENTAR.**

Padronizar os mapas relevantes para o prefixo `VN_`, reduzindo
inconsistência de nomenclatura.

Mapas legados que existem apenas como referência não devem ser
renomeados indiscriminadamente.

## P2-03 --- Refinar ancoragem e legibilidade dos Gabs

**Decisão: FORA DE ESCOPO DA IMPLEMENTAÇÃO AUTOMATIZADA.**

Esse refinamento exige avaliação visual humana.

A implementação por agentes de IA não deve tentar concluir
automaticamente que:

-   posicionamento está visualmente correto;
-   ancoragem está agradável;
-   texto está suficientemente legível em todas as situações;
-   comportamento visual está adequado apenas por inspeção estrutural
    dos dados.

Esse item será refinado manualmente pelo usuário posteriormente.

## P2-04 --- Espacializar falas ambientais

**Decisão: IMPLEMENTAR.**

Falas ambientais devem corresponder espacialmente aos grupos, atividades
e situações visíveis no mapa.

O conteúdo deve reforçar o ambiente sem competir com o objetivo
principal.

Aplicar respeitando:

-   o escopo da quest atual;
-   a distinção entre chatter ambiental e cutscene;
-   a camada narrativa em que cada personagem está inserido.

------------------------------------------------------------------------

# Estado consolidado

  -----------------------------------------------------------------------
  Item                    Estado                  Observação
  ----------------------- ----------------------- -----------------------
  P0-01                   IMPLEMENTAR             Contrato EX/VN
                                                  idempotente e seguro.

  P0-02                   IMPLEMENTAR             Corrigir reentrada de
                                                  E18.

  P0-03                   IMPLEMENTAR             Mapear estados antes da
                                                  correção definitiva.

  P0-04                   FORA DE ESCOPO          Tordan--Thorin pertence
                                                  a quest futura.

  P0-05                   IMPLEMENTAR             Chatter não bloqueia;
                                                  cutscenes podem
                                                  bloquear.

  P0-06                   IMPLEMENTAR             Audio Design decide
                                                  substituto quando
                                                  necessário.

  P1-01                   IMPLEMENTAR             Organizar atividades
                                                  infantis.

  P1-02                   IMPLEMENTAR             Preservar passagem e
                                                  recuperação de rotas.

  P1-03                   IMPLEMENTAR             Direcionamento
                                                  espacial; métricas
                                                  apenas para playtest.

  P1-04                   IMPLEMENTAR COM ESCOPO  Troféu pertence a quest
                          REDUZIDO                futura.

  P1-05                   IMPLEMENTAR             Gab ambiental não
                                                  bloqueante; cutscene é
                                                  exceção legítima.

  P1-06                   IMPLEMENTAR             Reduzir feedback
                                                  audiovisual redundante.

  P1-07                   IMPLEMENTAR             Ambiência infantil;
                                                  Audio Design decide
                                                  detalhes sonoros.

  P1-08                   IMPLEMENTAR             Chatter ambiental
                                                  opcional.

  P1-09                   IMPLEMENTAR             Matriz de QA/playtest.

  P2-01                   IMPLEMENTAR             Separar staging de
                                                  progresso canônico.

  P2-02                   IMPLEMENTAR             Normalizar `NV_` para
                                                  `VN_`.

  P2-03                   FORA DE ESCOPO          Refinamento visual será
                          AUTOMATIZADO            feito manualmente.

  P2-04                   IMPLEMENTAR             Espacializar falas
                                                  ambientais.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Aprendizados consolidados

## 1. "EX não bloqueia" era uma regra ampla demais

A distinção correta é entre bloqueio ambiental desnecessário e cutscene
intencional.

## 2. VN é uma classificação principalmente narrativa

Perder controle não basta para transformar uma cena em VN.

## 3. Mesmo mapa não significa mesmo escopo

Eventos de quests futuras devem permanecer intactos.

Esse princípio foi particularmente importante para:

-   Tordan--Thorin;
-   o troféu da Casa Forjaprata.

## 4. A estrutura narrativa possui duas camadas temporais

O Coreto representa o presente e funciona como moldura narrativa.

A Casa Forjaprata pertence ao passado, dentro da história narrada.

Rheed e as crianças podem aparecer como camada metanarrativa sobre o
universo da história e, por isso, não precisam obedecer às regras
físicas desse universo.

## 5. Critério de playtest não é requisito de runtime

Tempos e taxas de sucesso servem para avaliação humana, não para
introduzir timers ou novas mecânicas.

## 6. Implementação segura pode começar com investigação

Mapear estados e dependências pode ser a primeira etapa de um item já
aprovado para implementação.

## 7. Estado canônico e staging temporário não devem compartilhar responsabilidade sem contrato explícito

A utilização da `V106` para os dois papéis aumenta acoplamento e risco
de bugs.

A separação deve ser feita somente depois de inventariar dependências.

## 8. Nem todo refinamento é adequado para agentes automatizados

Problemas essencialmente visuais, como refinamento fino de ancoragem e
legibilidade dos Gabs, precisam de avaliação humana.

Agentes não devem declarar esse tipo de tarefa concluída apenas com
validação estrutural.

## 9. Especialidades podem possuir autonomia

Audio Design pode tomar decisões sonoras dentro dos limites aprovados.

## 10. Human in the Loop também define fronteiras

A revisão humana não serve apenas para aprovar implementações.

Ela define:

-   escopo;
-   exceções;
-   semântica das regras;
-   decisões delegadas;
-   tarefas manuais;
-   critérios de validação;
-   contexto narrativo.

------------------------------------------------------------------------

# Próximos passos

Com P0, P1 e P2 revisados, a implementação pode seguir respeitando as
decisões deste checkpoint.

Antes de futuras análises ou novas propostas sobre estes mapas,
**consultar a documentação e os checkpoints existentes**, usando-os como
contexto para evitar regressões conceituais e expansão indevida de
escopo.
