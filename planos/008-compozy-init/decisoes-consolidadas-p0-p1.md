---
date: 2026-08-18
scope: EX_Coreto e EX_Casa da Familia Forjaprata --- quest atualmente em
  implementação
status: p0-p1-revisados
title: Checkpoint Human in the Loop --- decisões consolidadas P0 e P1
type: decision-checkpoint
---

# Checkpoint Human in the Loop --- P0 e P1

## Objetivo

Este documento consolida as decisões humanas tomadas sobre os itens P0 e
P1 da análise técnica dos mapas `EX_Coreto` e
`EX_Casa da Familia Forjaprata`, incluindo as ressalvas de escopo e os
aprendizados obtidos durante a revisão.

A regra central desta rodada é: **estar no mesmo mapa não significa
estar no mesmo escopo de quest**. Conteúdo pertencente a quests futuras
deve permanecer intocado até que sua respectiva quest entre em escopo.

------------------------------------------------------------------------

# Princípios consolidados

## 1. EX e VN são diferenciados principalmente pela função narrativa

A interpretação "EX nunca pode bloquear o jogador" foi rejeitada por ser
ampla demais.

O contrato refinado é:

-   mapas `EX` podem conter cutscenes legítimas;
-   uma cutscene em `EX` pode retirar temporariamente o controle do
    jogador;
-   falas ambientais e chatter comum não devem bloquear o jogador
    desnecessariamente;
-   `WaitForGab` não deve ser usado apenas para transformar chatter
    ambiental em sequência bloqueante;
-   narrativa crítica da quest deve permanecer no fluxo `VN`;
-   a classificação de uma cena depende principalmente da sua função
    narrativa, e não apenas de o jogador possuir ou não controle naquele
    momento.

## 2. Escopo é definido pela quest, não apenas pelo mapa

Um evento estar dentro de um mapa atualmente trabalhado não autoriza sua
alteração.

Se o evento pertence a uma quest futura:

-   não alterar seu conteúdo;
-   não migrar seu diálogo;
-   não reorganizar sua lógica por conveniência;
-   não expandir artificialmente o pacote atual para incluí-lo.

## 3. Critérios de playtest não são mecânicas

Metas como "5 de 6 jogadores encontram o objetivo em até 90 segundos"
são critérios de validação humana.

Elas **não devem gerar**:

-   timer dentro do jogo;
-   cronômetro visível;
-   telemetria obrigatória;
-   pressão temporal sobre o jogador.

Servem apenas para medir se o level design e a comunicação do jogo estão
funcionando.

## 4. Decisões especializadas podem ser delegadas

Nem toda escolha criativa precisa voltar para aprovação humana.

Quando explicitamente delegado, uma especialidade pode tomar a decisão
dentro de sua área, mantendo os critérios técnicos e o escopo definidos.

------------------------------------------------------------------------

# P0 --- Integridade do fluxo

## P0-01 --- Contrato `EX -> VN -> EX`

**Decisão: IMPLEMENTAR.**

Formalizar um fluxo consistente para Map022/046 e Map045/049.

Objetivos:

-   entrada previsível na VN;
-   retorno correto ao EX;
-   idempotência;
-   segurança em save/load;
-   restauração adequada do estado;
-   ausência de tokens ou sessões residuais.

Evitar transformar a solução em uma abstração maior do que o problema
exige.

## P0-02 --- Reentrada de E18 / Map022

**Decisão: IMPLEMENTAR.**

Corrigir o bug que permite ao E18 continuar elegível depois que a Map046
avança `V106` para `20`.

Após a progressão:

-   contato repetido não reabre a VN;
-   não executa validação incompatível;
-   não bloqueia o jogador.

## P0-03 --- Loops de Autorun em E11 / Map045 e Map049

**Decisão: IMPLEMENTAR.**

A implementação começa pelo mapeamento técnico dos estados:

-   estado de entrada;
-   estados de retorno da Map049;
-   estado terminal esperado;
-   páginas de E11 que devem permanecer inelegíveis depois de
    concluídas.

O mapeamento faz parte da implementação aprovada; não é uma investigação
indefinida.

Objetivo final: eliminar loops e repetições sem introduzir transições
incorretas.

## P0-04 --- Conversa Tordan--Thorin de E8

**Decisão: FORA DE ESCOPO.**

A conversa pertence a uma quest futura.

Portanto:

-   não migrar para VN nesta rodada;
-   não alterar seu fluxo;
-   não usar essa cena para ampliar o escopo atual.

Isso não invalida a regra de que narrativa crítica da quest deve
acontecer em VN. Apenas reconhece que essa narrativa pertence a outro
contexto de quest.

## P0-05 --- E36, retorno de E11 e `WaitForGab`

**Decisão: IMPLEMENTAR COM REGRA REFINADA.**

Remover bloqueios desnecessários das falas ambientais identificadas.

Porém, isso **não** cria uma proibição geral de bloqueio em mapas EX.

Contrato:

-   chatter ambiental comum não prende o jogador;
-   `WaitForGab` não deve transformar fala ambiental em sequência
    bloqueante;
-   interações podem fornecer feedback imediato sem exigir bloqueio;
-   cutscenes legítimas em EX continuam permitidas;
-   cutscenes podem retirar temporariamente o controle;
-   narrativa crítica da quest continua pertencendo ao fluxo VN.

## P0-06 --- BGM `Dungeon5`

**Decisão: IMPLEMENTAR, COM DECISÃO CRIATIVA DELEGADA AO AUDIO DESIGN.**

Se `Dungeon5` estiver realmente ausente ou inválido, corrigir a
referência.

O Audio Design possui autonomia para escolher um substituto apropriado.

A validação técnica deve garantir que `EX -> VN -> EX` não produza:

-   silêncio inesperado;
-   reinício abrupto;
-   resíduos de áudio;
-   conflito de ownership entre mapa e sistema de VN.

------------------------------------------------------------------------

# P1 --- Leitura, exploração e apresentação

## P1-01 --- Reorganizar as crianças do Coreto

**Decisão: IMPLEMENTAR.**

Organizar as crianças para que três atividades sejam reconhecíveis
visualmente:

-   pega-pega;
-   ciranda;
-   conversa sentada.

A leitura deve acontecer principalmente por composição espacial e
movimento, sem depender de diálogo explicativo.

Os movimentos devem parecer intencionais, não simplesmente aleatórios.

## P1-02 --- Preservar corredor crítico e recuperação das rotas

**Decisão: IMPLEMENTAR.**

Garantir que as crianças não impeçam a progressão.

O jogador deve conseguir alcançar os pontos críticos, incluindo Darla,
E18 e E17, sem bloqueios causados pelos NPCs.

As rotas das crianças devem possuir comportamento de recuperação quando
forem desviadas ou deslocadas.

Este item não é apenas estético: é uma garantia de progressão e
passabilidade.

## P1-03 --- Melhorar o direcionamento espacial do Coreto

**Decisão: IMPLEMENTAR.**

Usar composição, landmarks e organização espacial para conduzir
naturalmente o jogador até o assento/entrada da VN sem depender de
instrução textual obrigatória.

### Ressalva importante

O critério original de jogadores encontrarem o assento em determinado
tempo é **somente um teste humano de legibilidade**.

Não implementar timer, cronômetro ou mecânica temporal no jogo por causa
desse critério.

## P1-04 --- Consolidar o microloop "preparar e partir" da Casa Forjaprata

**Decisão: IMPLEMENTAR COM REDUÇÃO DE ESCOPO.**

Melhorar a leitura do fluxo de preparação e partida **somente nos
elementos pertencentes à quest atual**.

### Troféu

O troféu presente no mapa pertence a uma quest futura.

Portanto:

-   não alterar o troféu nesta rodada;
-   não reorganizar sua lógica;
-   não usar o troféu como requisito do microloop atual;
-   tratar sua função quando a quest futura entrar em escopo.

O fato de estar fisicamente no mesmo mapa não o coloca no escopo desta
implementação.

Os critérios temporais de descoberta do estilingue, quando utilizados,
são apenas de playtest humano e não devem virar mecânica.

## P1-05 --- Aplicar o contrato Gab Window às falas EX do escopo

**Decisão: IMPLEMENTAR COM REGRA REFINADA E FILTRO DE ESCOPO.**

Aplicar o contrato de Gab Window às falas pertinentes à quest atual.

Para falas ambientais:

-   utilizar o sistema Gab apropriado;
-   evitar bloqueios desnecessários;
-   evitar `WaitForGab` como mecanismo de chatter bloqueante.

### Ressalva de cutscene

A presença de Gab em uma cutscene **não significa** que a cena deve
permanecer não bloqueante.

Cutscenes legítimas em EX podem:

-   bloquear movimento;
-   retirar temporariamente o controle;
-   coordenar apresentação e diálogo quando isso fizer parte da cena.

Portanto, a regra "Gab em EX não bloqueia" não existe como regra
absoluta.

### Ressalva de escopo

Não alterar diálogos ou eventos pertencentes a quests futuras apenas
porque estão nos mapas analisados.

## P1-06 --- Contrato único de feedback audiovisual

**Decisão: IMPLEMENTAR.**

Evitar empilhar vários sinais redundantes para comunicar a mesma mudança
de estado.

Exemplo de redundância a evitar:

-   Gab;
-   cue/SE;
-   marcador;
-   fanfarra;

todos comunicando simultaneamente exatamente o mesmo acontecimento sem
necessidade.

Preferir um sinal semântico principal, adicionando outros apenas quando
possuírem função distinta.

### Escopo

Aplicar essa revisão aos eventos da quest atual. Não refatorar feedback
de quests futuras nesta rodada.

## P1-07 --- Ambiência infantil esparsa e espacial

**Decisão: IMPLEMENTAR.**

Construir a sensação de ambiente infantil sem gerar poluição sonora.

Diretrizes:

-   sons com intervalos/cooldowns;
-   limitar simultaneidade;
-   evitar um efeito sonoro para cada Gab;
-   espacializar os sons de acordo com os grupos e atividades;
-   não mascarar objetivos importantes.

### Delegação

A escolha concreta dos sons e da solução musical/ambiental pode ser
feita pelo **Audio Design**, respeitando o contexto do mapa e os
critérios técnicos.

### Escopo

Aplicar às partes relevantes da quest atual, sem alterar conteúdo futuro
desnecessariamente.

## P1-08 --- Limitar fala ambiental a conteúdo opcional

**Decisão: IMPLEMENTAR.**

Falas ambientais em EX devem poder ser ignoradas sem impedir:

-   compreensão essencial da quest;
-   progressão da main quest;
-   acesso à única informação necessária para continuar.

Isso não proíbe cutscenes legítimas em EX.

A regra é especificamente que **chatter ambiental não seja requisito de
progressão**.

Aplicar somente ao conteúdo em escopo.

## P1-09 --- Matriz funcional e de playtest do fluxo completo

**Decisão: IMPLEMENTAR COMO PROCESSO DE VALIDAÇÃO.**

Criar uma matriz de QA/playtest cobrindo, entre outros:

-   New Game;
-   save/load;
-   entrada e retorno das VNs;
-   repetição e reentrada;
-   estados terminais;
-   passabilidade;
-   prioridade e sobreposição de Gabs;
-   limpeza de sessão VN;
-   restauração correta do estado;
-   entendimento do próximo objetivo.

Esta matriz é ferramenta de validação, **não uma feature do jogo**.

Métricas temporais ou taxas como "5 de 6 jogadores" pertencem ao
playtest humano e não devem ser convertidas automaticamente em timers,
telemetria ou mecânicas.

------------------------------------------------------------------------

# Estado consolidado

  -----------------------------------------------------------------------
  Item                    Estado                  Observação
  ----------------------- ----------------------- -----------------------
  P0-01                   IMPLEMENTAR             Contrato EX/VN
                                                  consistente e
                                                  idempotente, sem
                                                  overengineering.

  P0-02                   IMPLEMENTAR             Corrigir reentrada de
                                                  E18 após progressão de
                                                  `V106`.

  P0-03                   IMPLEMENTAR             Mapear estados como
                                                  primeira etapa da
                                                  correção dos Autoruns.

  P0-04                   FORA DE ESCOPO          Tordan--Thorin pertence
                                                  a quest futura.

  P0-05                   IMPLEMENTAR             Remover bloqueio
                                                  ambiental; cutscenes em
                                                  EX continuam
                                                  permitidas.

  P0-06                   IMPLEMENTAR             Audio Design decide
                                                  substituto de
                                                  `Dungeon5`, se
                                                  necessário.

  P1-01                   IMPLEMENTAR             Três atividades
                                                  infantis visualmente
                                                  reconhecíveis.

  P1-02                   IMPLEMENTAR             Corredor crítico e
                                                  recuperação das rotas.

  P1-03                   IMPLEMENTAR             Direcionamento
                                                  espacial; tempo é
                                                  apenas métrica de
                                                  playtest.

  P1-04                   IMPLEMENTAR COM ESCOPO  Troféu pertence a quest
                          REDUZIDO                futura e não deve ser
                                                  alterado.

  P1-05                   IMPLEMENTAR             Contrato Gab ambiental;
                                                  cutscenes podem
                                                  bloquear.

  P1-06                   IMPLEMENTAR             Evitar feedback
                                                  audiovisual redundante.

  P1-07                   IMPLEMENTAR             Ambiência infantil
                                                  esparsa; decisões
                                                  sonoras delegadas ao
                                                  Audio Design.

  P1-08                   IMPLEMENTAR             Chatter ambiental
                                                  opcional e não
                                                  necessário para
                                                  progressão.

  P1-09                   IMPLEMENTAR             Matriz de QA/playtest,
                                                  não feature do jogo.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Aprendizados consolidados

## 1. "EX não bloqueia" é uma abstração incorreta

O problema real não é a perda de controle em si.

A distinção necessária é entre:

-   bloqueio acidental/desnecessário causado por chatter ambiental; e
-   bloqueio intencional de uma cutscene legítima.

## 2. VN é uma classificação narrativa

Perder controle não transforma automaticamente uma cena em VN.

A VN é principalmente o espaço destinado à narrativa crítica da quest.

## 3. Mesmo mapa não significa mesmo escopo

Esse princípio apareceu em pelo menos dois pontos importantes:

-   conversa Tordan--Thorin;
-   troféu da Casa Forjaprata.

Ambos estão em mapas analisados, mas pertencem a quests futuras e devem
permanecer fora desta implementação.

## 4. Critério de playtest não deve vazar para o design

Uma meta como "encontrar algo em 90 segundos" serve para medir
legibilidade.

Ela não significa que o jogo precisa possuir timer, contagem regressiva
ou pressão temporal.

## 5. Implementar pode começar com investigação técnica

Quando uma correção já foi aprovada, mapear estados e dependências pode
ser simplesmente a primeira etapa segura da implementação.

Isso é especialmente importante no E11/Map049.

## 6. Decisões podem ser delegadas por especialidade

Audio Design pode decidir soluções sonoras dentro do contexto aprovado,
sem escalar toda escolha criativa para aprovação humana.

## 7. Feedback não deve ser redundante por padrão

Mais sinais não significam necessariamente mais clareza.

Gab, áudio, marcador e fanfarra devem possuir funções distintas quando
coexistirem; caso contrário, preferir um sinal principal.

## 8. Progressão tem prioridade sobre ambientação

A reorganização das crianças precisa melhorar a leitura do ambiente sem
criar bloqueios físicos, rotas quebradas ou dificuldade de acesso aos
pontos críticos.

## 9. O Human in the Loop controla também o escopo

A revisão humana não serve apenas para aprovar ou rejeitar soluções.

Ela também determina:

-   o que pertence à quest atual;
-   o que deve permanecer intocado;
-   o que pode ser delegado;
-   quais critérios são apenas de validação;
-   quais regras precisam de interpretação semântica em vez de aplicação
    mecânica.

------------------------------------------------------------------------

# Próximo checkpoint

Os itens P0 e P1 foram revisados e classificados.

A próxima rodada de Human in the Loop pode começar em **P2-01 ---
separar staging de cena do estado canônico representado por `V106`**.

Nenhuma decisão de P2 é registrada neste documento.
