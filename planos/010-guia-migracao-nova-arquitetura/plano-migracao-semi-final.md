---
title: "Plano de migração dos mapas restantes de A Semifinal"
type: implementation-plan
doc_id: "plan-010-migracao-mapas-semi-final"
version: "1.0.0"
status: ready-for-implementation
created: "2026-08-19"
last_updated: "2026-08-19"
scope: "Duplicação dos quatro mapas legados restantes como mapas EX, integração mínima de transferências e atualização dos ponteiros de aSemifinal"
not_scope: "Criação de mapas VN, migração ou refatoração narrativa de eventos, alteração de switches/variáveis, remoção de mapas legados ou redesign das cenas"
authority: "Pedido do usuário de 2026-08-19, AGENTS.md, ADR EX/VN, análise de migração e evidência local estruturada"
canonical_source: "planos/010-guia-migracao-nova-arquitetura/plano-migracao-semi-final.md"
intended_llm_task: "implementation-planning"
confidence: high
known_conflicts: []
replaced_by: null
---

# Plano de migração dos mapas restantes de A Semifinal

## Resultado esperado

A quest `aSemifinal` passa a percorrer somente os mapas novos já existentes e
quatro novos mapas `EX_` durante seu fluxo principal:

```text
045 EX_Casa da Família Forjaprata
  -> 044 EX_Distrito Residencial Nobre
  -> 058 EX_Distrito_Comercial
  -> 059 EX_Estadio
       <-> 060 EX_Vestiario
       <-> 061 EX_Campo_de_Futebol_Runico
  -> 044 EX_Distrito Residencial Nobre
```

Nenhum mapa `VN_` será criado nesta migração. Os mapas legados permanecem no
projeto e não serão renomeados, sobrescritos nem excluídos.

## Decisões aprovadas e interpretação operacional

1. Serão criados quatro mapas `EX_` por cópia dos mapas legados atuais.
2. Não será criado `VN_Estadio` nem qualquer outro mapa `VN_` nesta rodada.
3. Eventos não serão migrados, reescritos, divididos ou convertidos para outra
   arquitetura.
4. A cópia preservará IDs de eventos, páginas, condições, comandos, posições e
   conteúdo. A única exceção permitida dentro das listas de eventos é trocar o
   ID de destino de comandos `Transfer Player` (`code 201`) necessários para
   conectar a rota nova.
5. Atualizações de ponteiros do journal não alteram eventos. Elas apenas fazem
   o PKD reconhecer os mapas novos que contêm os mesmos IDs de evento.
6. Em RPG Maker MZ, os arquivos `MapXXX.json` ficam fisicamente no diretório
   plano `frontend/data`. “Colocar no diretório correto junto dos EX” significa
   também registrar os mapas na hierarquia lógica
   `Exploration > Ekios > Gildrat` de `MapInfos.json`.

## Evidência local que fundamenta o plano

- O projeto RPG Maker MZ está em `frontend` e contém `game.rmmzproject`,
  `data/System.json`, `data/CommonEvents.json`, `data/MapInfos.json` e
  `js/plugins.js`.
- `MapInfos.json` possui IDs atribuídos até `57`; os slots `50` e `51` são
  tombstones nulos e não serão reutilizados.
- A hierarquia atual dos mapas novos é
  `Exploration [016] > Ekios [032] > Gildrat [039]`.
- Os quatro mapas legados não possuem `<CoretoMapType:EX>` no campo `note`.
- `Map044/E18` ainda transfere para `Map008`.
- Os interiores opcionais `Map012`, `Map013` e `Map052` retornam para
  `Map008` em pelo menos uma página.
- A configuração de `aSemifinal` no `PKD_SimpleQuestSystem` ainda contém
  ponteiros para `Map006`, `Map007`, `Map008`, `Map010` e `Map014`.
- O ponteiro `Map010/E9` é inválido porque o evento 9 não existe; a saída
  existente do vestiário é `E1`.
- A configuração de navegação automática do PKD está ativa, mas sua lista de
  rotas está vazia. Por isso, os ponteiros diretos de cada mapa novo precisam
  ser registrados explicitamente.

Essas conclusões são estáticas: os JSON foram lidos de forma estruturada e o
envelope de `plugins.js` foi validado. Não houve alteração de runtime, abertura
do editor nem Playtest nesta etapa.

## Alocação de mapas

Os IDs abaixo estão livres no estado atual e devem ser revalidados
imediatamente antes da implementação. Se qualquer um tiver sido ocupado, a
execução deve parar e recalcular toda a tabela antes de escrever arquivos.

| Novo ID | Arquivo novo | Origem legada | Nome em `MapInfos` | Parent lógico | Ordem lógica |
| ---: | --- | --- | --- | --- | ---: |
| 58 | `frontend/data/Map058.json` | `Map008.json` | `EX_Distrito_Comercial` | `39` — Gildrat | 53 |
| 59 | `frontend/data/Map059.json` | `Map014.json` | `EX_Estadio` | `39` — Gildrat | 54 |
| 60 | `frontend/data/Map060.json` | `Map010.json` | `EX_Vestiario` | `59` — EX_Estadio | 56 |
| 61 | `frontend/data/Map061.json` | `Map009.json` | `EX_Campo_de_Futebol_Runico` | `59` — EX_Estadio | 55 |

Para manter a árvore contígua, os registros atuais de Visual Novel mudam
somente de ordem em `MapInfos.json`: `Map018` de 53 para 57, `Map046` de 54
para 58 e `Map049` de 55 para 59. Nenhum arquivo ou conteúdo VN muda.

Cada clone recebe `note: "<CoretoMapType:EX>"`. Fora o `note` e a allowlist de
transferências descrita adiante, todos os campos do mapa devem permanecer
semanticamente iguais à origem: dimensões, tiles, `tilesetId`, parallax,
scroll, áudio, encontros e eventos.

## Superfície exata de alterações

### Arquivos novos

- `frontend/data/Map058.json`
- `frontend/data/Map059.json`
- `frontend/data/Map060.json`
- `frontend/data/Map061.json`

### Arquivos existentes alterados

- `frontend/data/MapInfos.json`
- `frontend/data/Map044.json`
- `frontend/data/Map012.json`
- `frontend/data/Map013.json`
- `frontend/data/Map052.json`
- `frontend/js/plugins.js`

### Arquivos de origem protegidos

- `frontend/data/Map008.json`
- `frontend/data/Map009.json`
- `frontend/data/Map010.json`
- `frontend/data/Map014.json`

Os quatro arquivos protegidos devem permanecer byte a byte iguais à baseline
capturada no preflight.

## Allowlist de integração das transferências

Somente o parâmetro de mapa de destino dos comandos abaixo pode mudar. As
coordenadas, direção, fade e todos os demais comandos permanecem iguais.

### Entrada da rota nova

| Arquivo | Evento/página | Antes | Depois |
| --- | --- | ---: | ---: |
| `Map044.json` | E18/P1 | Map008 | Map058 |

### Dentro dos clones

| Clone | Eventos | Antes | Depois |
| --- | --- | ---: | ---: |
| `Map058.json` | E1, E2, E6 e E19 | Map007 | Map044 |
| `Map058.json` | E3, E5 e E20 | Map014 | Map059 |
| `Map059.json` | E1 | Map010 | Map060 |
| `Map059.json` | E6, em todas as ocorrências de P1 e P2 | Map007 | Map044 |
| `Map059.json` | E12, E13, E18 e E21 | Map009 | Map061 |
| `Map059.json` | E15, E16 e E17 | Map008 | Map058 |
| `Map060.json` | E1 | Map014 | Map059 |
| `Map061.json` | E9, E16, E17, E21 e E22 | Map014 | Map059 |

### Retorno dos interiores opcionais

Essas três trocas evitam que o jogador entre em um interior a partir do novo
Distrito Comercial e retorne ao `Map008` legado.

| Arquivo | Evento/página | Antes | Depois |
| --- | --- | ---: | ---: |
| `Map012.json` | E1/P1 | Map008 | Map058 |
| `Map013.json` | E6/P4 | Map008 | Map058 |
| `Map052.json` | E1/P1 | Map008 | Map058 |

As demais entradas para mapas legados, pertencentes a outros fluxos ou quests,
ficam fora desta migração. Em especial, não alterar `Map006`, `Map007`,
`Map011`, `Map017`, `Map021`, `Map027`, `Map045` ou `Map054` apenas porque
possuem alguma transferência para os mapas antigos.

## Ponteiros de `aSemifinal`

Em `PKD_SimpleQuestSystem`, preservar textos, descrições, oito tarefas,
índices e todos os callers. Manter os ponteiros legados para compatibilidade
com saves ou rotas antigas e adicionar os equivalentes novos abaixo:

| Tarefa | Objetivo | Ponteiros novos |
| ---: | --- | --- |
| 2 | Correr até o estádio | Map044/E18, Map058/E3, Map059/E2 |
| 3 | Falar com Dragobur | Map059/E2 |
| 4 | Encontrar um Elmo | Map059/E1, Map060/E13 |
| 5 | Equipar o Elmo | nenhum, como hoje |
| 6 | Falar novamente com Dragobur | Map060/E1, Map059/E2 |
| 7 | Entrar em campo | Map059/E12 |
| 8 | Voltar com os guardas | Map059/E5 |

O ponteiro inválido legado `Map010/E9` deve ser corrigido para `Map010/E1`.
Não será criado um evento 9 no mapa legado nem no clone. Essa correção altera
apenas a configuração do ponteiro e usa a saída que já existe.

Não há mudança em `CoretoQuests.json`, variáveis, switches, estados da quest,
Plugin Commands, textos, escolhas ou recompensas.

## Fases de execução

### Fase 0 — Preflight e congelamento da baseline

1. Confirmar que os IDs 58–61 continuam livres e que não existem arquivos
   `Map058.json` a `Map061.json`.
2. Capturar hashes de `MapInfos.json`, `plugins.js`, Map044, Map012, Map013,
   Map052 e dos quatro mapas legados.
3. Fazer parsing estruturado dos JSON e validar o envelope gerado de
   `plugins.js` antes de extrair sua configuração.
4. Registrar alterações locais preexistentes e não tocar no save modificado do
   usuário.

**Gate:** parar se houver colisão de ID, JSON inválido, `plugins.js` fora do
envelope esperado ou mudança concorrente em algum alvo.

### Fase 1 — Criar e registrar os quatro mapas EX

1. Fazer deep clone estruturado de Map008, Map014, Map010 e Map009 para os IDs
   definidos na tabela.
2. Adicionar `<CoretoMapType:EX>` ao `note` de cada clone.
3. Inserir os quatro registros em `MapInfos.json`, ajustar a hierarquia e
   deslocar somente as ordens do grupo Visual Novel.

**Gate:** cada clone deve ser semanticamente igual à origem quando forem
ignorados apenas `note` e as transferências allowlisted.

### Fase 2 — Conectar a rota EX

1. Aplicar somente as trocas de destino listadas na allowlist.
2. Atualizar a entrada Map044/E18.
3. Atualizar os três retornos opcionais para Map058.
4. Gerar uma matriz de arestas `origem -> destino` após a alteração.

**Gate:** nenhuma transferência interna da rota nova pode apontar para
Map007, Map008, Map009, Map010 ou Map014. Referências não allowlisted devem
permanecer idênticas.

### Fase 3 — Atualizar os ponteiros do journal

1. Adicionar os ponteiros dos novos mapas na configuração de `aSemifinal`.
2. Corrigir `Map010/E9` para `Map010/E1` sem criar evento novo.
3. Preservar tarefas, textos, descrições, demais quests, parâmetros e ordem de
   plugins.

**Gate:** todos os ponteiros novos devem resolver para eventos existentes e a
configuração extraída deve continuar contendo uma única `aSemifinal` com oito
tarefas.

### Fase 4 — Validação estática e gates humanos

1. Fazer parsing de todos os JSON alterados e novos.
2. Validar a relação `MapInfos ID <-> MapXXX.json`, parent IDs, ordens e nomes.
3. Comparar clones com suas origens usando diff estruturado restrito.
4. Confirmar por hash que Map008, Map009, Map010 e Map014 não mudaram.
5. Confirmar que nenhuma mudança criou `VN_`, novo evento, nova página,
   switch, variável, Common Event ou Plugin Command.
6. Executar check de sintaxe e envelope de `plugins.js` e extrair novamente a
   configuração PKD.
7. Abrir, salvar e reabrir o projeto no RPG Maker MZ para validar a aceitação
   da árvore de mapas e da configuração do Plugin Manager.
8. Fazer Playtest humano da rota principal e das três saídas opcionais.

## Critérios de aceite

- Existem exatamente quatro novos mapas e nenhum novo mapa VN.
- Os quatro mapas aparecem sob `Exploration > Ekios > Gildrat`; Vestiário e
  Campo aparecem como filhos de Estádio.
- Cada novo mapa possui `<CoretoMapType:EX>`.
- Tiles, passabilidade, dimensões, áudio, eventos e conteúdo dos clones são
  preservados em relação às origens, exceto pela allowlist de transferências.
- Map044/E18 inicia a rota nova.
- Distrito Comercial, Estádio, Vestiário e Campo navegam entre seus IDs novos
  sem cair nos equivalentes legados.
- O final do Estádio retorna ao Map044, não ao Map007.
- Taverna, Loja de Armaduras e Casa Filena retornam ao Map058.
- Os ponteiros de `aSemifinal` funcionam nos quatro mapas novos e não apontam
  para eventos inexistentes.
- Map008, Map009, Map010 e Map014 permanecem preservados.
- Nenhum evento foi criado, removido, dividido, reordenado ou reescrito.
- O editor aceita o projeto após open-save-reopen.
- O Playtest confirma entrada, navegação, interiores opcionais, partida,
  encerramento, retorno e save/load sem softlock ou salto para mapa legado.

## Roteiro mínimo de Playtest

1. Iniciar antes da saída da Map045 e concluir o tutorial da Funda.
2. Sair para Map044 e usar E18 para entrar em Map058.
3. Em Map058, testar ida e volta de Map012, Map013 e Map052.
4. Entrar em Map059 e visitar Map060; pegar/equipar o Elmo e retornar.
5. Entrar em Map061, executar o trecho da partida e retornar a Map059.
6. Concluir a chegada dos guardas e confirmar retorno a Map044.
7. Repetir o smoke após save/load em Map058, Map060 e Map061.
8. Verificar visualmente os ponteiros das tarefas 2, 3, 4, 6, 7 e 8.

## Riscos e contenções

| Risco | Contenção |
| --- | --- |
| IDs 58–61 serem ocupados antes da implementação | Revalidar e bloquear antes de qualquer write |
| Cópia carregar transferências para IDs legados | Validator de grafo e allowlist exata de `code 201` |
| Alteração acidental de eventos | Diff estruturado que ignora somente `note` e destinos allowlisted |
| Interior opcional devolver ao mapa antigo | Testar Map012, Map013 e Map052 nos dois sentidos |
| Ponteiro apontar para evento nulo | Resolver cada par mapa/evento; corrigir Map010/E9 para E1 |
| Editor reordenar ou rejeitar MapInfos/plugins.js | Open-save-reopen obrigatório e diff posterior |
| Save existente iniciar em mapa legado | Preservar mapas e ponteiros legados; validar save/load sem prometer compatibilidade total |

## Fora de escopo explícito

- Criar `VN_Estadio` ou qualquer mapa VN.
- Extrair Bronca de Dragobur, Lenda do Capacete ou Ordem dos Guardas para VN.
- Migrar diálogos, escolhas, cutscenes, Gabs ou Action Sequences.
- Modernizar comandos de eventos, condições de páginas ou lógica da partida.
- Alterar conteúdo das quests seguintes que compartilham mapas legados.
- Remover mapas legados ou redirecionar globalmente todas as referências a
  eles.
- Declarar pacing, legibilidade, narrativa, áudio ou save/load como aprovados
  somente com evidência estática.

## Definition of Done

A migração estará concluída quando as quatro cópias EX estiverem registradas e
conectadas, os ponteiros da quest reconhecerem a rota nova, o diff restrito e
os validadores estáticos passarem, o RPG Maker aceitar o round-trip e o
Playtest humano confirmar o fluxo completo sem retorno involuntário aos mapas
legados. Até esses gates humanos ocorrerem, o status de runtime permanece
`pending-human-validation`.
