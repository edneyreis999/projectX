# Reestruturar a cena de Coreto entre os mapas 022 e 045 com arquitetura EX/VN

## 1. Resumo da demanda

Reestruturar integralmente o fluxo narrativo que hoje começa no `Map022` e termina na chegada ao `Map045`, usando `Coreto_QuestCore.js`, `Coreto_QuestVN.js` e `Coreto_Cutscene.js`. A nova arquitetura deve separar exploração e encenação física (EX) de diálogo, escolhas e transições de quest (VN), materializando o `Map046` como mapa VN e adotando, de forma adequada ao ProjectX, o padrão validado pela implementação `PORTO_INVASAO` do projeto Playground2.

Por decisão humana tomada durante o refinamento desta demanda, `Coreto_QuestCore` deve ser adaptado ao `PKD_SimpleQuestSystem`, que já é o backend de quests ativo no ProjectX. Não faz parte do trabalho introduzir `VisuMZ_2_QuestSystem`.

O resultado esperado é um fluxo determinístico, rastreável, retomável e livre de escritas concorrentes de progresso, com eventos semanticamente nomeados, transições idempotentes e retorno seguro da VN para a continuidade física que leva ao `Map045`.

## 2. Intenção original preservada

A implementação deve preservar integralmente estas intenções da demanda de origem:

- usar os novos plugins `Coreto_QuestVN.js`, `Coreto_QuestCore.js` e `Coreto_Cutscene.js`;
- analisar com profundidade o fluxo atual do `Map022` até o teleporte e a continuidade no `Map045`;
- refazer por completo a arquitetura desse trecho, incluindo nomes de eventos, otimização e uso adequado da variável e dos valores de progresso;
- manter mapas EX responsáveis por exploração, estado físico e cutscenes;
- manter o mapa VN responsável apenas por narrativa, diálogo, escolhas e solicitação de transições de quest;
- adotar o ciclo `evento EX → EnterVisualNovel(questKey, entryKey) → Map046/VN → QuestTransition → FinishVisualNovel → retorno ao EX → continuidade até Map045`;
- manter `Coreto_QuestVN` responsável pela sessão EX/VN, origem, bloqueios, transferência, retorno e restauração, sem decidir escolhas, estado de quest ou recompensas;
- manter `Coreto_QuestCore` como autoridade única de progressão, validação, efeitos idempotentes e sincronização com o backend de quests;
- manter `Coreto_Cutscene` responsável pela encenação física, incluindo caminhada, conversa física e teleporte de Rheed/Reed;
- usar o `Map046` como mapa VN;
- ler e compreender todas as referências fornecidas e aplicar o padrão de `PORTO_INVASAO` ao contexto desta cena, sem copiar identificadores ou valores específicos de outro jogo sem validação local.

## 3. Objetivo e resultado esperado

Ao concluir esta demanda, o trecho deve possuir uma máquina de estados explícita no registry de `Coreto_QuestCore`, projetada para o `PKD_SimpleQuestSystem`, e uma separação verificável entre três responsabilidades:

1. `Coreto_QuestCore`: única autoridade que valida e altera o estado canônico da quest, aplica efeitos declarativos e sincroniza a projeção correspondente no PKD.
2. `Coreto_QuestVN`: roteador de uma sessão temporária entre um mapa EX de origem e o `Map046`, com restauração completa e sem autoridade sobre escolhas ou progressão.
3. `Coreto_Cutscene`: controlador da encenação física no mapa EX, com início e término pareados e restauração segura dos bloqueios temporários.

O jogador deve percorrer o mesmo conteúdo narrativo e alcançar a mesma continuidade funcional no `Map045`, mas sem depender da cadeia atual de autoruns e escritas diretas de progresso espalhadas pelos eventos. O fluxo deve tolerar reentrada válida, impedir duplicação de efeitos e falhar de forma diagnosticável diante de estado, entrada ou configuração inválidos.

## 4. Contexto observado

### 4.1 Fluxo atual no ProjectX

O inventário estático observou o seguinte encadeamento:

- `Map022`, evento 30 `darla`, inicia `assistirNoiteHistoria`, escreve `V26 v_qNoite_progress = 1`, usa `V100` e `S50` sem nomes descritivos e executa apresentação narrativa.
- `Map022`, evento 18 `Posição inicial de eventos`, por Player Touch e condição `V26 >= 1`, reposiciona eventos, desabilita movimento, escreve `V26 = 2`, completa tarefas PKD e ativa Self Switch A.
- `Map022`, evento 17 `Reed`, página autorun com `V26 >= 2`, executa diálogo, escolha e possível Name Input, completa a quest PKD e escreve `V26 = 3`.
- Outra página autorun do mesmo evento, com `V26 >= 3`, altera a party, escreve `V29 v_qSemifinal_progress = 1`, reproduz `Cutscene 2` e transfere diretamente o jogador para `Map045 (2,4)`.
- `Map045`, evento 11 `Pesadelo`, autorun com `V29 >= 1`, executa a apresentação inicial, usa o Common Event 16 `NSD_Format`, ativa `aSemifinal`, escreve `V29 = 2` e permanece no mapa.

Não foi encontrada entrada constante para o `Map022`. A única entrada constante encontrada para o `Map045` vem do `Map022`. Não existe hoje transferência constante para o `Map046`.

### 4.2 Estado atual do Map046 e dos plugins

- O `Map046` se chama `NV_Noite_da_Historia`, tem 17×13, zero eventos e `note` vazio. Seu nome sugere VN, mas esse papel ainda não está materializado.
- `Map022`, `Map045` e `Map046` não possuem as tags de tipo EX/VN exigidas pelo contrato dos novos plugins.
- Os arquivos `Coreto_QuestCore.js`, `Coreto_QuestVN.js` e `Coreto_Cutscene.js` existem, mas ainda não estão registrados em `frontend/js/plugins.js` e não possuem callers nos mapas analisados.
- `frontend/data/CoretoQuests.json` ainda não existe.
- `PKD_SimpleQuestSystem` aparece duas vezes como ativo em `plugins.js`; a configuração canônica precisa ser consolidada e validada no editor.
- `VisuMZ_2_QuestSystem` não está instalado nem configurado. O código atual de `Coreto_QuestCore` pressupõe esse backend e, portanto, precisa ser adaptado ao PKD conforme a decisão humana desta demanda.
- O fluxo usa nomes genéricos, inconsistentes ou corrompidos, incluindo `darla`, `Reed`, múltiplos `Crianca`, `Fogo`, `EVxxx` e nomes com mojibake. Existem páginas de movimento repetidas que merecem consolidação quando isso não alterar comportamento perceptível.

### 4.3 Padrão de referência PORTO_INVASAO

As fontes do Playground2 demonstram um padrão aplicável:

- registry versionado com estados, transições, efeitos e entradas VN declarativos;
- `Coreto_QuestCore` como único escritor do estágio da quest;
- recibos persistidos no formato lógico `questKey:transitionId` para efeitos irreversíveis com política `once`;
- eventos EX que entram na VN por `EnterVisualNovel`, sem Transfer Player direto;
- páginas VN que começam validando a sessão e o estado exato, pedem transições ao QuestCore e encerram todos os ramos válidos por `FinishVisualNovel`;
- mapa VN sem autoruns concorrentes;
- cutscenes físicas mantidas no EX e cercadas por `BeginCutscene`/`FinishCutscene`;
- validação estática complementada obrigatoriamente por playtest humano.

Os valores, chaves, eventos e recompensas de `PORTO_INVASAO` são evidência de arquitetura, não dados a serem copiados para esta quest.

## 5. Escopo

### 5.1 Incluído

- inventariar todos os callers, condições, escolhas, mutações, efeitos, transferências e caminhos de saída do trecho relevante do `Map022` até a estabilização inicial no `Map045`;
- definir a máquina de estados fechada da cena/quest, incluindo estado inicial, estados intermediários, estado terminal, transições permitidas, pré-condições, efeitos e relação com as tarefas do PKD;
- criar e integrar o registro correspondente em `frontend/data/CoretoQuests.json`;
- adaptar o backend de sincronização de `Coreto_QuestCore` para `PKD_SimpleQuestSystem`, preservando a autoridade canônica e a idempotência do QuestCore;
- registrar e ordenar os três plugins Coreto em `frontend/js/plugins.js`, eliminando a duplicidade de configuração do PKD sem perder seus parâmetros canônicos;
- classificar e marcar `Map022` e, quando aplicável, `Map045` como EX, e `Map046` como VN;
- migrar para o `Map046` apenas diálogo, escolhas, Name Input e pedidos de transição que pertençam à camada VN;
- manter no EX a movimentação e a presença física de personagens, a alteração da party, a reprodução de filme quando ainda necessária e o teleporte/continuidade para o `Map045`;
- converter entradas EX em chamadas `EnterVisualNovel(questKey, entryKey)` e todas as saídas válidas da VN em `FinishVisualNovel`;
- usar `QuestTransition` para todas as alterações canônicas de progresso e efeitos abrangidos pela nova máquina de estados;
- renomear eventos e páginas afetados com nomes semânticos e corrigir mojibake dentro do escopo;
- consolidar páginas e comandos repetidos somente quando a equivalência de comportamento puder ser demonstrada;
- criar validadores estáticos proporcionais ao risco e executar os gates humanos listados nesta demanda.

### 5.2 Fora de escopo

- introduzir ou migrar o projeto para `VisuMZ_2_QuestSystem`;
- reescrever outros arcos ou quests do `Map045` que não sejam necessários para preservar a chegada e a continuidade desta cena;
- redesenhar roteiro, diálogos, identidade dos personagens ou consequências narrativas;
- copiar chaves, IDs de variável, estados, coordenadas, recompensas ou conteúdo de `PORTO_INVASAO`;
- alterar sistemas de batalha, economia ou progressão de personagens;
- garantir compatibilidade com saves antigos sem decisão humana específica; a política atual dos plugins é `new-game-only` e deve ser testada como tal.

## 6. Mandato para o próximo executor

O próximo executor está autorizado a analisar, planejar e implementar exclusivamente a reestruturação descrita neste documento nos plugins, configurações e dados RPG Maker diretamente necessários. Antes de escrever dados, deve seguir o fluxo obrigatório de edição de `frontend/data/*.json`, dar preferência a notetags e comandos dos plugins Coreto/VisuStella disponíveis e consultar `docs/rpg-maker-for-ia` para não recriar capacidades existentes.

O executor deve primeiro produzir um inventário de equivalência do comportamento atual, depois fechar a máquina de estados e apenas então migrar eventos. Não está autorizado a inventar IDs, remover conteúdo sem equivalência comprovada, ampliar a migração para outras quests ou substituir o PKD por outro backend. Qualquer descoberta que mude o resultado narrativo, a política de saves ou o limite do fluxo até `Map045` exige nova decisão humana.

## 7. Requisitos

### 7.1 Autoridade de quest e adaptação ao PKD

- `Coreto_QuestCore` deve continuar sendo a única autoridade de estado canônico, requisitos, efeitos e recibos.
- A integração com `PKD_SimpleQuestSystem` deve ser implementada atrás de uma fronteira/adaptador explícito; eventos não devem chamar simultaneamente o PKD e o QuestCore para representar a mesma transição.
- A projeção PKD deve ser derivada do estado canônico e deve ser segura para sincronização repetida.
- O adaptador deve cobrir as operações realmente usadas pelo arco, como adicionar/ativar/completar quest, mostrar ou concluir tarefas e atualizar journal, com mapeamento rastreável entre transições do registry e chamadas PKD.
- Ausência, versão incompatível ou configuração inválida do PKD deve produzir diagnóstico claro e impedir progressão parcial silenciosa.
- A duplicidade de `PKD_SimpleQuestSystem` em `plugins.js` deve resultar em uma única entrada ativa e canônica, validada por abrir, salvar e reabrir o Plugin Manager.

### 7.2 Registry e máquina de estados

- Criar `CoretoQuests.json` estruturado, parseável e versionado, seguindo o contrato de schema validado pela referência.
- Definir `questKey`, `stageVariableId`, estados, transições, entradas VN, estado inicial e terminal com nomes semânticos.
- Todo estado referenciado por entrada, transição ou projeção PKD deve pertencer ao conjunto declarado; toda transição deve ter origem e destino válidos.
- Efeitos irreversíveis devem ser declarativos e possuir recibo persistido `once`, com chave namespaced pela quest e transição.
- Transições sem efeito irreversível só devem receber recibo se a regra de negócio exigir que sejam não repetíveis.
- Nenhum evento migrado pode escrever diretamente a variável canônica ou duplicar item/recompensa já aplicado pelo QuestCore.
- O valor e o ID adequados da variável de progresso devem resultar do inventário completo de ownership e colisões. `V26` só pode ser reutilizada se ficar demonstrado que ela pertence exclusivamente a esta máquina de estados e que a migração preserva todos os callers; caso contrário, deve-se selecionar uma variável livre, nomeá-la semanticamente no banco e documentar a migração. Não assumir os valores `0,10,...` de `PORTO_INVASAO` automaticamente.

### 7.3 Roteamento EX/VN

- O `Map046` deve possuir tag `<CoretoMapType:VN>`, nome coerente com o padrão adotado e apenas eventos de cena VN necessários.
- Os mapas físicos envolvidos devem possuir `<CoretoMapType:EX>` quando compatível com seu papel integral.
- A entrada deve ocorrer exclusivamente por `EnterVisualNovel(questKey, entryKey)` a partir de um caller EX válido.
- `Coreto_QuestVN` deve capturar origem, posição, direção e contexto visual/sonoro necessário; aplicar bloqueios; validar destino e evento; transferir; e restaurar o contexto no retorno.
- `Coreto_QuestVN` não deve interpretar escolhas, alterar estado canônico nem aplicar recompensas.
- Cada página VN deve iniciar com `AssertVisualNovelSession` e `AssertQuestState` para o estado exato esperado.
- Todo ramo válido, inclusive cancelar, voltar, recusar e saídas sem transição, deve limpar os elementos visuais criados, chamar `FinishVisualNovel` e encerrar o processamento da página.
- O `Map046` não deve usar autoruns concorrentes nem Transfer Player direto para simular o retorno.
- Após o retorno ao EX, o fluxo físico deve continuar de forma determinística até o teleporte já esperado para o `Map045`, preservando a chegada em `(2,4)` salvo se a análise técnica demonstrar e documentar outra coordenada equivalente.

### 7.4 Cutscene física

- Caminhada, posicionamento, conversa que dependa da presença física de Rheed/Reed, troca de membros da party, filme e teleporte devem permanecer no EX.
- Toda aquisição de lock físico por `BeginCutscene` deve possuir `FinishCutscene` no mesmo evento e em todas as saídas possíveis.
- O encerramento deve restaurar movimento, menu, save, transparência e followers conforme a responsabilidade do plugin; posição, rota, página e Self Switch do evento permanecem sob responsabilidade do evento EX.
- A grafia canônica do personagem (`Rheed` ou `Reed`) deve ser confirmada nas fontes narrativas e aplicada consistentemente, sem uma correção arbitrária.

### 7.5 Nomes, organização e otimização

- Renomear eventos afetados pelo formato semântico coerente com sua função, por exemplo `EX — <função física>` e `VN — <cena/entrada>`, sem depender de exemplos literais.
- Substituir nomes genéricos ou ambíguos dentro do escopo (`EVxxx`, `Evento Inicial`, `darla`, agrupamentos indistintos) por nomes que permitam localizar caller, cena e papel.
- Nomear variáveis e switches usados pelo fluxo quando estiverem vazios ou enganosos, preservando IDs quando não houver migração aprovada.
- Corrigir mojibake somente nos registros afetados e após confirmar o texto pretendido.
- Consolidar páginas de movimentação repetidas por evento-base, rota compartilhada ou dados quando a equivalência de condição, timing, frequência e estado visual for comprovada.
- Remover páginas/eventos vazios apenas se não forem usados como âncoras, targets de plugin, spawn, referência de script ou planejamento deliberado.

## 8. Restrições e invariantes

- O comportamento narrativo e as escolhas do trecho devem ser preservados.
- O `Map046` é o destino VN obrigatório desta demanda.
- O backend de quest é `PKD_SimpleQuestSystem`; `VisuMZ_2_QuestSystem` permanece fora do projeto.
- Só `Coreto_QuestCore` altera o estado canônico e aplica os efeitos declarados da quest.
- `Coreto_QuestVN` e `Coreto_Cutscene` compõem a API pública do QuestCore/FlowCoordinator, mas não dependem um do outro para decidir estado.
- Não pode haver duas sessões simultâneas de VN/cutscene nem liberação antecipada de locks.
- Não pode haver Transfer Player direto entre EX e VN, escrita direta do estágio em eventos migrados ou dupla concessão de efeito.
- Todo JSON alterado deve permanecer estruturalmente válido e compatível com o formato do RPG Maker MZ.
- A ordem de plugins deve respeitar dependências reais e o namespace `Coreto` deve ser acumulativo, sem sobrescrever membros anteriores.
- O trabalho deve ser validado em New Game; suporte a save legado não é uma aceitação implícita.

## 9. Critérios de aceite

- [ ] Existe um inventário aprovado que mapeia cada página/caminho atual de `Map022` e a chegada inicial em `Map045` para seu equivalente novo, sem perda de diálogo, escolha, Name Input, alteração da party, filme ou continuidade.
- [ ] `Coreto_QuestCore`, `Coreto_QuestVN` e `Coreto_Cutscene` estão registrados, ativos, ordenados e carregam sem erro de sintaxe ou runtime.
- [ ] Há exatamente uma configuração ativa de `PKD_SimpleQuestSystem`, e abrir/salvar/reabrir o projeto não recria drift em `plugins.js`.
- [ ] `Coreto_QuestCore` sincroniza com o PKD por adaptador explícito, sem referência obrigatória a `VisuMZ_2_QuestSystem`.
- [ ] `CoretoQuests.json` define schema, máquina de estados, entradas VN e projeção PKD completas e sem referências órfãs.
- [ ] A variável de estágio foi escolhida por inventário de ownership/colisões, recebeu nome semântico e não possui escritores concorrentes.
- [ ] `Map022`/mapas físicos relevantes estão classificados como EX e `Map046` está classificado como VN.
- [ ] O conteúdo narrativo migrado executa no `Map046`; o conteúdo físico permanece no EX.
- [ ] Todas as entradas EX usam `EnterVisualNovel`; não existe transferência EX↔VN direta.
- [ ] Cada página VN valida sessão e estado exato antes do conteúdo.
- [ ] Todos os ramos válidos chamam `FinishVisualNovel`, encerram a página e restauram origem, posição, direção, followers, transparência, input, menu, save, áudio e apresentação pertinente.
- [ ] Somente um evento VN elegível inicia para cada par válido de `questKey` e `entryKey`; entradas ou estados inválidos falham com diagnóstico sem softlock.
- [ ] Toda progressão e efeito do arco passa por `QuestTransition`; efeitos `once` permanecem exatamente uma vez após repetição, retorno e save/load.
- [ ] Toda cutscene física possui `BeginCutscene`/`FinishCutscene` pareados em seus caminhos de saída.
- [ ] O jogador retorna ao EX, conclui a encenação física e chega ao `Map045` no estado de party e progresso esperado.
- [ ] Eventos, páginas, variáveis e switches afetados possuem nomes semânticos e não apresentam mojibake conhecido.
- [ ] As otimizações não alteram timing, frequência, aparência, bloqueios ou sequência perceptível.
- [ ] Um New Game Playtest cobre o caminho principal e todos os ramos de escolha, incluindo cancelamento/retorno, repetição, save/load e falhas controladas.

## 10. Validators e evidências requeridas

### 10.1 Validação estática automatizável

- parse estruturado de todo JSON alterado;
- `node --check` ou validador equivalente para cada plugin JS alterado;
- paridade entre comandos declarados no header, comandos registrados e callers em mapas;
- verificação de uma única entrada ativa do PKD e presença/ordem dos três plugins Coreto;
- validação do schema do registry: chaves únicas e não vazias, variável positiva, fechamento de estados, transições válidas, efeitos permitidos, deltas não nulos e recibos obrigatórios;
- cross-reference `entryKey → mapId → eventId → página elegível por estado`, incluindo bounds de spawn;
- verificação das tags EX/VN;
- prova de que páginas VN começam com asserts, não contêm autorun concorrente ou Transfer Player direto e que todas as folhas válidas executam `FinishVisualNovel`;
- busca por escritores diretos da variável canônica, chamadas PKD paralelas, efeitos de item/recompensa duplicados e locks sem encerramento;
- matriz de callers antes/depois e diff estrutural de eventos renomeados, consolidados ou removidos.

### 10.2 Validação no editor e em runtime

- abrir, salvar e reabrir o projeto no RPG Maker MZ sem alteração inesperada nos JSONs ou no Plugin Manager;
- iniciar por New Game e percorrer o gatilho real do `Map022` até a estabilização no `Map045`;
- testar cada combinação válida de estado/entrada e cada escolha, incluindo sair, voltar, recusar e repetir;
- testar que somente o evento VN correto inicia e que estados inválidos geram diagnóstico recuperável;
- confirmar concessão/remoção de efeitos exatamente uma vez, reentrada, autosave e save/load;
- confirmar fidelidade do retorno: mapa, coordenada, direção, transparência, followers, menu/save, BGM/BGS, brightness, tint, weather e zoom;
- confirmar exclusão mútua entre VN e cutscene, recuperação de locks e ausência de autorun loop/softlock;
- validar pacing, nomes visíveis, apresentação de busts/pictures, Name Input, alteração da party, filme e teleporte final;
- registrar evidência por cenário com resultado PASS/FAIL, save ou ponto de partida, estado inicial/final e captura/log suficiente para reprodução.

## 11. Premissas reversíveis

- **Premissa:** o conteúdo narrativo hoje concentrado no `Map022` pode ser movido ao `Map046` sem mudança de roteiro. **Reversão:** ajustar a fronteira EX/VN após o inventário, mantendo no EX qualquer beat que dependa de presença ou movimento físico.
- **Premissa:** a chegada funcional no `Map045 (2,4)` continua correta. **Reversão:** alterar coordenada somente com evidência de equivalência e decisão registrada na análise técnica.
- **Premissa:** o adaptador PKD pode projetar todos os estados necessários por operações públicas já usadas no projeto. **Reversão:** se houver lacuna comprovada, propor extensão mínima e isolada antes de migrar os callers.
- **Premissa:** a política de teste e migração é `new-game-only`. **Reversão:** compatibilidade com saves existentes requer nova decisão humana e escopo próprio.
- **Premissa:** páginas repetidas de crianças/fogo podem conter oportunidades de consolidação. **Reversão:** manter páginas separadas quando diferenças de timing, rota ou condição forem observadas.

## 12. Itens a validar depois

| Item | Responsável | Momento da decisão | Evidência necessária |
|---|---|---|---|
| `questKey` canônica desta máquina | análise técnica / game business | antes de criar o registry | inventário das chaves PKD e convenção de nomes do projeto |
| conjunto de `entryKey`, eventos VN e estados permitidos | análise técnica + narrativa/quest | antes de editar Map046 | matriz de beats, escolhas e retornos do fluxo atual |
| grafo e valores numéricos dos estados | análise técnica | antes da implementação | máquina fechada, mapeamento antes/depois e ausência de colisões |
| reutilizar `V26` ou alocar variável dedicada | gameplay engineer | antes de escrever `stageVariableId` | busca global de readers/writers e slot livre nomeado em `System.json` |
| papel de `V29`, `V100`, `S50`, `S43` e `S44` após a migração | análise técnica | antes de remover escritores | matriz de ownership e callers fora do trecho |
| coordenada, direção e `eventId` de spawn no Map046 | level designer / implementação | antes de configurar entrada | bounds do mapa, posição dos eventos e teste de evento único |
| fronteira exata entre diálogo VN e fala física de Rheed/Reed | narrativa + level design | antes da migração de conteúdo | dependência de posição/movimento e continuidade visual |
| grafia canônica `Rheed` ou `Reed` | narrativa | antes de renomear eventos/textos | fonte narrativa durável do ProjectX |
| equivalência das otimizações de eventos repetidos | runtime QA | após proposta, antes de remover páginas | diff de condições/comandos e playtest comparativo |
| compatibilidade ou migração de saves antigos | decisão humana | após análise de impacto, antes de prometer suporte | matriz de versões de save e teste de carregamento |
| origem real de entrada no Map022 | análise técnica | antes de fechar o teste end-to-end | busca por transfer dinâmico, scripts, start positions e playtest |

Nenhum desses itens bloqueia a criação desta demanda enriquecida; todos bloqueiam apenas a decisão técnica ou escrita específica indicada na tabela.

## 13. Riscos e mitigação

- **Dupla autoridade entre QuestCore e PKD:** pode duplicar tarefas ou divergir o journal. Mitigar com adaptador unidirecional e proibição de calls PKD paralelas nos eventos migrados.
- **Backend incompatível com a implementação atual do QuestCore:** pode falhar somente em runtime. Mitigar com capability check, fixture mínima de segunda quest e erros fail-fast antes da migração dos mapas.
- **Escolha inadequada da variável de progresso:** pode quebrar callers externos. Mitigar com inventário global de readers/writers, nomeação no banco e matriz de migração.
- **Autoruns e locks órfãos:** podem causar softlock. Mitigar removendo concorrência no VN, pareando begin/finish e testando todas as folhas de controle.
- **Efeitos repetidos após reentrada ou load:** podem duplicar recompensas/consumos. Mitigar com receipts persistidos e cenários de repetição/save-load.
- **Perda de continuidade ao separar EX/VN:** pode alterar pacing, áudio, posição ou party. Mitigar com inventário de equivalência e teste ponta a ponta de restauração.
- **Drift do editor em plugins.js/data JSON:** pode invalidar edição textual correta. Mitigar com parse, abertura/salvamento/reabertura no editor e diff posterior.
- **Otimização agressiva de eventos repetidos:** pode apagar diferenças sutis. Mitigar exigindo equivalência antes da consolidação e mantendo estruturas separadas em caso de dúvida.
- **Uso literal da referência PORTO_INVASAO:** pode importar IDs e regras alheias. Mitigar usando-a apenas como padrão arquitetural e derivando todos os dados do ProjectX.

## 14. Referências e proveniência

### 14.1 Fontes do ProjectX

- `demanda.md`: fonte da intenção original e dos limites EX/VN.
- `frontend/data/Map022.json`, `Map045.json`, `Map046.json`, `MapInfos.json`, `CommonEvents.json` e `System.json`: fonte observada do fluxo, conteúdo, nomes, variáveis, switches e transferências atuais.
- `frontend/js/plugins.js`: fonte observada da ativação, duplicidade e ordem atual dos plugins.
- `frontend/js/plugins/Coreto_QuestCore.js`, `Coreto_QuestVN.js` e `Coreto_Cutscene.js`: fonte observada das APIs e responsabilidades atualmente declaradas.
- `docs/index.xml` e documentos de domínio roteados: contexto durável e gates do projeto.

### 14.2 Fontes de referência do Playground2

- `docs/project-conventions/scene-routing-ex-vn.md`: contrato aprovado de separação EX/VN, ownership, lifecycle e restauração.
- `data/CoretoQuests.json`: exemplo concreto de registry, estados, transições, entradas e idempotência.
- `data/Map094.json`, `Map095.json`, `Map096.json` e `Map100.json`: realização concreta de callers EX, cenas VN e cutscene física.
- `planos/004-vn-por-quest/analise-tecnica-vn-por-quest.md`: rationale e validators da arquitetura; suas afirmações de status de implementação são históricas e não substituem a inspeção dos dados atuais.

### 14.3 Classificação das adições

- **Fonte:** fatos descritos nas subseções 4.1 e 4.2 e o padrão observado em 4.3.
- **Decisão humana:** adaptar `Coreto_QuestCore` ao `PKD_SimpleQuestSystem` e não introduzir `VisuMZ_2_QuestSystem`.
- **Inferência controlada:** necessidade de adaptador explícito, máquina de estados fechada, matriz de equivalência e validators derivados dos conflitos e responsabilidades observados.
- **Premissa reversível:** itens da seção 11, que podem ser alterados mediante evidência sem mudar a intenção central.
- **A validar depois:** identificadores, valores, coordenadas, fronteiras de cena e compatibilidade listados na seção 12; nenhum foi inventado neste documento.

## 15. Few-shots

Few-shots foram omitidos deliberadamente. A implementação `PORTO_INVASAO` já constitui evidência concreta e rastreável de arquitetura, enquanto um exemplo reduzido poderia incentivar a cópia indevida de IDs, estados ou conteúdo de outro jogo. O próximo executor deve trabalhar a partir do contrato e das referências citadas.

## 16. Matriz de cobertura da demanda original

| ID | Item atômico original | Cobertura neste documento |
|---|---|---|
| D01 | Usar `Coreto_QuestVN.js` | §§ 1, 3, 5, 7.3 e 9 |
| D02 | Usar `Coreto_QuestCore.js` | §§ 1, 3, 5, 7.1–7.2 e 9 |
| D03 | Usar `Coreto_Cutscene.js` | §§ 1, 3, 5, 7.4 e 9 |
| D04 | Analisar o fluxo atual Map022→Map045 | §§ 4.1, 5.1, 6 e 9 |
| D05 | Fazer rework completo da arquitetura | §§ 1, 3, 5 e 6 |
| D06 | Melhorar nomes de eventos | §§ 4.2, 5.1, 7.5 e 9 |
| D07 | Otimizar eventos | §§ 5.1, 7.5, 9 e 13 |
| D08 | Definir variável e valores adequados de progresso | §§ 7.2, 9, 11 e 12 |
| D09 | Separar exploração/estado/cutscene EX de narrativa VN | §§ 2, 3, 5 e 7.3–7.4 |
| D10 | Fluxo EX→EnterVN→Map046→QuestTransition→FinishVN→retorno→Map045 | §§ 2, 3, 7.3 e 9 |
| D11 | QuestVN possui origem, locks, transfer/retorno/restauração sem decidir estado | §§ 2, 3, 7.3 e 8 |
| D12 | QuestCore centraliza progressão, valida, aplica idempotência e sincroniza backend | §§ 2, 3, 7.1–7.2 e 8 |
| D13 | Cutscene trata staging físico de Rheed/Reed e teleporte | §§ 2, 5.1 e 7.4 |
| D14 | Map046 será o mapa VN | §§ 1, 2, 5, 7.3 e 8 |
| D15 | Ler todas as referências fornecidas | §§ 4.3 e 14.2 |
| D16 | Compreender e aplicar adequadamente o padrão `PORTO_INVASAO` | §§ 1, 4.3, 7, 13 e 15 |

Todos os itens originais possuem cobertura explícita. As extensões introduzidas pelo refinamento estão classificadas por proveniência na seção 14.3 e não alteram o objetivo central.
