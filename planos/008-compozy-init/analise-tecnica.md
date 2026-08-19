---
title: "Analise multidisciplinar dos mapas EX_Coreto e EX_Casa da Familia Forjaprata"
type: game-dev-network-analysis
doc_id: "plan-008-compozy-init-analise-tecnica"
version: "1.0.0"
status: completed
created: "2026-08-18"
last_updated: "2026-08-18"
scope: "Oportunidades de melhoria multidisciplinares nos mapas de exploracao 022 e 045 e em suas transicoes para as VNs 046 e 049"
not_scope: "Implementacao em frontend/data, alteracao de plugins, escolha de novos IDs, criacao de assets ou validacao de runtime"
authority: "Pedido do usuario, AGENTS.md, evidencias locais e discussao registrada na Network game-dev do Compozy"
canonical_source: "planos/008-compozy-init/analise-tecnica.md"
intended_llm_task: "planning-and-backlog"
confidence: high
known_conflicts:
  - "Os mapas 046 e 049 possuem note do tipo VN, mas seus nomes em MapInfos usam o prefixo legado/inconsistente NV_."
  - "Valores 91, 92, 100 e 110 da variavel 106 sao usados como staging de cena, embora a mesma variavel tambem represente progressao canonica da quest."
replaced_by: null
---

# Analise multidisciplinar — EX_Coreto e EX_Casa da Familia Forjaprata

## Resumo executivo

A Network `game-dev` do Compozy realizou uma discussao multidisciplinar sobre
oportunidades de melhoria nos dois mapas de exploracao. Participaram oito
especialidades em 36 mensagens, incluindo propostas iniciais e uma rodada de
criticas cruzadas:

- Game Design e coordenacao;
- Level Design;
- Narrative Design;
- Gameplay Engineering;
- UX/UI Design;
- Audio Design;
- QA tecnico;
- Playtest Design.

O consenso principal e que a separacao entre exploracao e narrativa critica
deve ser tratada como um contrato do jogo:

1. O mapa `EX_` oferece movimento, observacao, interacao ambiental e preparacao.
2. Toda conversa em um mapa `EX_` usa `VisuMZ_4_GabWindow` e nao bloqueia o
   controle do jogador.
3. Informacoes indispensaveis para compreender ou avancar a main quest ficam
   em um mapa `VN_`.
4. A passagem `EX -> VN -> EX` deve ser unica, idempotente e segura para
   save/load.

Antes de novos refinamentos esteticos, foram encontrados riscos funcionais de
reentrada em VN, loops de Autorun, uso bloqueante de Gab Window e mistura entre
estado canonico de quest e staging temporario de cena. Esses problemas formam o
bloco P0 do backlog.

## Interpretacao do escopo

O pedido nao informou IDs de mapa explicitamente. A analise adotou como os dois
mapas solicitados:

| Papel | ID | Nome atual | Evidencia de tipo |
| --- | ---: | --- | --- |
| Exploracao | 22 | `EX_Coreto` | Note `<CoretoMapType:EX>` |
| VN associada | 46 | `NV_Noite_da_Historia` em `MapInfos` | Note `<CoretoMapType:VN>` |
| Exploracao | 45 | `EX_Casa da Familia Forjaprata` | Note `<CoretoMapType:EX>` |
| VN associada | 49 | `NV_Casa_Forjaprata` em `MapInfos` | Note `<CoretoMapType:VN>` |

Essa interpretacao tambem e confirmada pela arquitetura local de dialogos de
exploracao, que declara os mapas 022 e 045 como escopo inicial.

Mapas antigos sem os prefixos atuais permanecem apenas como referencia. Esta
analise nao recomenda moderniza-los nem inclui-los na implementacao.

## Restricoes do projeto aplicadas

- Dar preferencia a recursos VisuStella ou Coreto antes de criar logica nova.
- Usar `VisuMZ_4_GabWindow` para todas as conversas em mapas `EX_`.
- Manter conversas criticas da main quest nos mapas `VN_`.
- Nao alterar `frontend/data/*.json` sem parsing estruturado, diff restrito,
  validacao do formato de comandos e gates de runtime.
- Nao escolher novos IDs de switches, variaveis ou objetos do Database sem
  confirmacao do usuario.
- Nao considerar observacao estatica como substituta de Playtest humano.

## Evidencias do estado atual

### EX_Coreto — Map022

- Ha 17 eventos de criancas: E1-E3, E5-E16, E19 e E32.
- Na pagina inicial, as criancas usam predominantemente `moveType=1`, isto e,
  movimento aleatorio. Isso explica a leitura de comportamento caotico.
- Quando a variavel 106 alcanca o estagio da convocacao, varias criancas usam
  rotas de movimento para convergir aos assentos. A convergencia merece testes
  de colisao, bloqueio e recuperacao de rota.
- O Event 20 ja usa uma sequencia de `GabTextOnly` automaticos sem forcar a
  janela e sem ignorar o antirrepeat.
- O Event 30 inicia a quest por contato e apresenta Gabs interativos.
- O Event 18 entra na Map046 quando `V106 >= 10`, mas valida internamente o
  estado exato 10. A VN avanca esse valor para 20. Um novo contato com E18 pode
  continuar elegivel e falhar na validacao.
- O percurso critico observado e entrada/spawn -> Darla/convocacao -> assento
  que inicia a VN -> saida para a Casa Forjaprata.
- Os textos atuais sugerem brincadeiras, como corrida ate o coreto ou nao pisar
  na linha, mas os movimentos nao formam grupos visualmente reconheciveis de
  pega-pega, ciranda ou conversa sentada.

### EX_Casa da Familia Forjaprata — Map045

- O Event 11 possui entradas Autorun para a Map049. Em mais de uma etapa, o
  estado de retorno pode deixar a pagina de entrada novamente elegivel.
- A sequencia final tambem possui risco de pagina Autorun sem estado terminal
  estavel apos a VN mudar o estado da quest.
- O Event 36 usa tres comandos `WaitForGab`, contrariando o contrato
  nao bloqueante definido para mapas `EX_`.
- Uma pagina automatica de E11 usa Gab forcado e bypass do antirrepeat; isso e
  inadequado para fala ambiental automatica.
- O Event 8 contem uma conversa longa e critica entre Tordan e Thorin dentro do
  mapa EX. Ela usa Gabs, bustos de VN e altera `V27` de `1 -> 2` ou `3 -> 4`.
- Ha uma concentracao de 18 eventos de criancas, E21-E35 e E37-E39, em estagios
  posteriores. A densidade e a passabilidade precisam ser avaliadas em runtime.
- O eixo espacial principal e entrada/saida -> sala/Tordan, com ramificacoes
  para cama, trofeu e bau do estilingue.
- O mapa referencia o BGM `Dungeon5`, mas o arquivo nao foi encontrado entre os
  assets locais inventariados.

### Fronteira EX/VN e plugins

Os seguintes componentes relevantes estao ativos:

- `VisuMZ_0_CoreEngine`;
- `VisuMZ_1_EventsMoveCore`;
- `VisuMZ_1_MessageCore`;
- `VisuMZ_4_GabWindow`;
- `Coreto_QuestVN`;
- `Coreto_GabWindowDefaults`.

O `Coreto_QuestVN` captura e restaura estado de apresentacao, inclusive BGM e
BGS. Portanto, a continuidade audiovisual deve usar esse ownership, evitando
que o mapa e a VN tentem controlar o mesmo recurso de forma concorrente.

## Decisoes de consenso da discussao

### Regra para falas EX

- Toda fala de exploracao usa `GabTextOnly`.
- Gabs automaticos em Autorun ou Parallel usam `ForceGab=false` e
  `BypassAntiRepeat=false`.
- O primeiro Gab disparado por uma interacao deliberada pode ser forcado e
  ignorar o antirrepeat para dar resposta imediata ao input.
- `WaitForGab` nao e usado em mapas EX.
- Gab ambiental nao contem informacao indispensavel, escolha obrigatoria ou a
  unica mutacao que permite continuar a main quest.

### Destino do dialogo de E8

A conversa critica Tordan-Thorin deve migrar para a Map049. A VN precisa ter
entradas explicitas para os dois estados existentes de `V27`, preservar o
conteudo relevante e confirmar as transicoes `1 -> 2` e `3 -> 4` apenas uma
vez. A implementacao deve impedir duplicacao ao retornar ao EX.

### Destino da sequencia de E36

Nao criar uma segunda VN por padrao. E36 deve representar apenas o retorno
fisico ao mapa EX. Qualquer informacao critica fica no encerramento da VN
existente; no EX permanece, no maximo, um Gab curto e opcional.

### Criancas do Coreto

As atividades devem ser compreendidas primeiro pela composicao espacial e pelo
movimento. Texto e audio apenas reforcam a leitura. A proposta de layout e:

1. **Pega-pega:** circuito periferico, preferencialmente na porcao oeste, com
   papeis legiveis de perseguidor e fugitivos e rota de recuperacao.
2. **Ciranda:** grupo circular em area aberta ao sul/centro, afastado do
   corredor critico e com movimento coordenado.
3. **Conversa sentada:** pequenos grupos na borda da praca, com personagens
   orientados uns para os outros e baixa movimentacao.

A formacao final da convocacao deve preservar um corredor visual e fisico ate
o assento de entrada na VN.

## Backlog priorizado

### P0 — Integridade do fluxo

| ID | Item | Owners principais | Criterio de aceite |
| --- | --- | --- | --- |
| P0-01 | Formalizar o contrato unico `EX -> VN -> EX` para Map022/046 e Map045/049 | Game Design, Gameplay, QA | Cada VN entra uma vez, retorna ao ponto correto, restaura o snapshot e nao deixa token ou sessao residual. |
| P0-02 | Impedir reentrada de E18/Map022 depois que a Map046 avanca `V106` para 20 | Gameplay, QA | Contatos repetidos nao reabrem a VN, nao executam assert invalido e nao bloqueiam o jogador. |
| P0-03 | Eliminar os loops Autorun de E11/Map045 e Map049 | Gameplay, QA | Abertura e sequencia final possuem pagina terminal estavel e sao idempotentes apos retorno ou load. |
| P0-04 | Migrar a conversa critica de E8/Map045 para Map049 | Narrative, Gameplay, UX | A VN cobre `V27=1` e `V27=3`, confirma `1->2` ou `3->4` atomicamente e o EX nao duplica a cena. |
| P0-05 | Tornar E36 e o retorno de E11 nao bloqueantes | Narrative, UX, Gameplay | Nenhum `WaitForGab`; Gabs automaticos seguem a politica `false/false`; o jogador recupera controle imediatamente. |
| P0-06 | Corrigir a referencia ao BGM ausente `Dungeon5` | Audio, QA | Todo BGM referenciado existe com case correto e a ida/volta da VN nao produz silencio, reinicio abrupto ou residuo. |

### P1 — Leitura, exploracao e apresentacao

| ID | Item | Owners principais | Criterio de aceite |
| --- | --- | --- | --- |
| P1-01 | Reorganizar as criancas do Coreto em pega-pega, ciranda e conversa sentada | Level, Narrative, Audio | Observadores reconhecem as tres atividades sem depender de dialogo; movimentos nao parecem aleatorios. |
| P1-02 | Preservar o corredor critico e a recuperacao das rotas no Coreto | Level, QA, Playtest | O jogador chega a Darla, E18 e E17 sem bloqueio; criancas deslocadas retornam ao comportamento valido. |
| P1-03 | Melhorar o direcionamento espacial do Coreto | Level, UX | Pelo menos 5 de 6 jogadores encontram o assento/VN em ate 90 segundos, sem instrucao textual obrigatoria. |
| P1-04 | Consolidar o microloop "preparar e partir" da Casa Forjaprata | Game Design, Level, UX | Cama, trofeu, estilingue e saida sao reconheciveis; 5 de 6 jogadores encontram/adquirem o estilingue em ate 3 minutos. |
| P1-05 | Aplicar o contrato Gab Window em todas as falas EX do escopo | Gameplay, QA | Todos os dialogos usam comandos validos de `VisuMZ_4_GabWindow`; nao ha `Show Text` narrativo nem espera bloqueante residual. |
| P1-06 | Definir um contrato unico de feedback audiovisual | Audio, UX, Game Design | Cada marco usa um sinal semantico principal; nao ha empilhamento redundante de Gab, cue, marcador e fanfarra. |
| P1-07 | Tornar a ambiencia infantil esparsa e espacial | Audio, Level | Sons possuem cooldown e limite de simultaneidade; nao ha um SE por Gab e o mix nao mascara objetivos. |
| P1-08 | Limitar o EX a narrativa ambiental opcional | Narrative, Game Design | Falas ambientais podem ser ignoradas sem perda de informacao ou de progressao da main quest. |
| P1-09 | Criar matriz funcional e de Playtest do fluxo completo | QA, Playtest | Sao cobertos New Game, save/load, retorno, repeticao, passabilidade, prioridade de Gab e limpeza da sessao VN. |

### P2 — Consistencia e polimento

| ID | Item | Owners principais | Criterio de aceite |
| --- | --- | --- | --- |
| P2-01 | Separar staging de cena do estado canonico representado por `V106` | Gameplay, QA | Todos os consumidores de 91/92/100/110 sao inventariados; o novo contrato e aprovado antes de selecionar qualquer ID. |
| P2-02 | Normalizar os nomes `NV_` para o padrao `VN_` | Game Design, QA | Referencias sao auditadas; Map046 e Map049 aparecem como `VN_`; nenhum mapa legado de consulta e renomeado. |
| P2-03 | Refinar ancoragem e legibilidade dos Gabs | UX, Playtest | Texto permanece legivel com movimento, velocidade de texto e diferentes configuracoes visuais; cor e som nao sao a unica fonte de informacao. |
| P2-04 | Espacializar falas ambientais | Level, Narrative | O conteudo de cada Gab corresponde ao grupo/atividade visivel e nao compete com o objetivo principal. |

## Contribuicoes por especialidade

### Game Design

- Consolidar a promessa de cada tipo de mapa: EX como exploracao e VN como
  narrativa critica.
- Manter um unico handoff EX/VN por beat, evitando cenas criticas paralelas.
- Fazer da Casa Forjaprata um microloop de preparacao e partida.
- Evitar feedback redundante para a mesma mudanca de estado.

### Level Design

- Substituir movimento infantil aleatorio por comportamentos com silhueta
  espacial reconhecivel.
- Preservar corredor critico, assento da VN e rotas de recuperacao.
- Usar landmarks e composicao para orientar sem tutorial textual.
- Verificar a densidade das criancas na Casa Forjaprata em runtime.

### Narrative Design

- Mover o conflito Tordan-Thorin para a VN.
- Manter em EX apenas evidencias ambientais, comentarios opcionais e reacoes
  curtas.
- Encerrar informacao critica de E36 dentro da VN existente.
- Definir se Rheed e as criancas na sequencia final sao presencas literais ou
  uma camada metanarrativa.

### Gameplay Engineering

- Corrigir elegibilidade de paginas, precedencia de retorno e estados terminais.
- Tornar entradas e retornos de VN idempotentes.
- Remover esperas bloqueantes e padronizar os parametros dos Gabs automaticos.
- Separar estado persistente de quest de staging temporario, depois do
  inventario de dependencias.

### UX/UI Design

- Fazer o retorno da VN comunicar imediatamente o proximo objetivo.
- Definir estados perceptiveis para trofeu, estilingue, saida e interacoes
  bloqueadas, sem depender apenas de cor ou audio.
- Priorizar Gabs de objetivo sobre chatter ambiental.
- Usar microcopy curta, orientada por verbo e alvo.

### Audio Design

- Corrigir o BGM ausente e validar continuidade entre EX e VN.
- Usar cama ambiente discreta e detalhes infantis esparsos.
- Reservar cues para mudancas semanticas e SEs para acoes fisicas.
- Evitar duplicar a fanfarra do bau do estilingue.

### QA tecnico

- Cobrir reentrada de E18, loops de E11 e limpeza de sessao do QuestVN.
- Validar restauracao de mapa, posicao, direcao, transparencia, seguidores,
  menu, save, BGM/BGS, tint, clima, zoom e locks.
- Testar passabilidade nos acessos a E18, E17, E36, E7 e no retorno da Map044.
- Separar validacao estrutural de dados da validacao perceptiva humana.

### Playtest Design

- Medir tempo ate recuperacao do controle e compreensao da proxima acao.
- Avaliar se as tres brincadeiras sao reconhecidas sem explicacao.
- Medir descoberta do assento no Coreto e do estilingue na Casa Forjaprata.
- Observar fadiga, repeticao, sobreposicao e prioridade dos Gabs.

## Matriz minima de validacao

| Rota/cenario | Validacao funcional | Validacao humana |
| --- | --- | --- |
| Coreto antes da convocacao | Gabs nao bloqueiam; rotas infantis recuperam | Tres brincadeiras sao reconheciveis e o ambiente parece vivo |
| Coreto `10 -> VN -> 20` | Uma entrada, retorno correto, sem reentrada | Jogador entende o resultado e encontra a proxima direcao |
| Coreto `20 -> 90 -> Map045` | Transferencia unica e estado coerente | Saida e intencao de deslocamento sao claras |
| Forjaprata abertura | E11/Map049 nao repetem Autorun | Jogador recupera controle e entende o proximo passo |
| Conversa Tordan-Thorin | Transicoes `V27` corretas e atomicas | Conteudo e ritmo permanecem compreensiveis na VN |
| Forjaprata final | Estado terminal sem loop; sessao limpa | Retorno nao parece travado nem repete exposicao |
| Save/load em cada fronteira | Snapshot e tokens restaurados/limpos | Nao ha salto perceptivel de audio, imagem ou posicao |
| Estilingue | Item concedido uma vez | Feedback de aquisicao e equipagem e claro sem redundancia |

## Decisoes humanas ainda necessarias

1. Confirmar se Rheed e as criancas da sequencia final da Casa Forjaprata sao
   diegeticos/literais ou metanarrativos.
2. Aprovar o contrato de staging antes de reservar qualquer novo switch ou
   variavel para substituir os usos de `V106`.
3. Aprovar eventual substituto de `Dungeon5` caso o asset nao deva ser
   adicionado ao projeto.

Essas decisoes nao impedem a decomposicao do restante do backlog, mas bloqueiam
as respectivas escritas definitivas.

## Ordem recomendada de implementacao

1. Inventariar todos os leitores/escritores de `V106`, `V27` e das sessoes VN.
2. Corrigir reentradas, Autoruns e estados terminais P0.
3. Migrar a conversa critica de E8 para Map049.
4. Remover waits e adequar todos os Gabs EX ao contrato.
5. Implementar a nova composicao e as rotas das criancas do Coreto.
6. Refinar o microloop da Casa Forjaprata e o feedback audiovisual.
7. Executar validacao estrutural, round-trip no editor e Playtest desde New
   Game, incluindo save/load.

## Fontes locais

- `AGENTS.md`
- `frontend/data/MapInfos.json`
- `frontend/data/Map022.json`
- `frontend/data/Map045.json`
- `frontend/data/Map046.json`
- `frontend/data/Map049.json`
- `frontend/js/plugins.js`
- `frontend/js/plugins/VisuMZ_4_GabWindow.js`
- `frontend/js/plugins/Coreto_QuestVN.js`
- `docs/architecture/exploration-dialogue-gabwindow.md`
- `planos/005-exploration-gabwindow/technical-analysis.md`

## Proveniencia da discussao

- Network Compozy: `game-dev`
- Thread: `thread_ex_maps_backlog_20260818`
- Participantes: 8 especialidades
- Mensagens consolidadas: 36
- Metodo: proposta por area, critica cruzada e sintese de consenso

## Limites deste documento

Este artefato registra analise e backlog. Ele nao autoriza alteracao direta nos
arquivos de producao, nao reserva IDs e nao declara o runtime validado. Qualquer
implementacao futura em `frontend/data` deve usar escrita estruturada, diff
restrito, validacao RPG Maker MZ e Playtest humano antes de ser considerada
concluida.
