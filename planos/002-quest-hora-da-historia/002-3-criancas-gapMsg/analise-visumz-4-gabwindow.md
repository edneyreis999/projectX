# Análise técnica — VisuMZ_4_GabWindow.js

- Status do workflow: **partial**
- Status da análise técnica: **suficiente para explicar o comportamento estático do plugin**
- Data: 2026-07-29
- Contrato do relatório: Loki Deep Analysis v3
- Entrega: artefato Markdown
- Fonte principal: `frontend/js/plugins/VisuMZ_4_GabWindow.js`
- Destino canônico: `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md`
- Catálogo analítico alterado: **não**
- Runtime/Playtest validado: **não**

## Resumo executivo

O `VisuMZ_4_GabWindow.js` v1.05 é um plugin VisuStella Tier 4 para exibir falas/notificações breves fora da caixa de mensagem e sem bloquear o evento por padrão. Cada comando cria um objeto de gab, opcionalmente resolve um gráfico (face, sprite de mapa, side-view actor ou picture), e então o enfileira em uma única `Window_Gab` da cena de mapa ou batalha.

A fila normal é FIFO. `ForceGab:true` limpa os dados da fila e agenda a nova gab sem passar pelo Anti-Repeat, mas não substitui sincronicamente uma gab já visível: ela ainda pode concluir o fade-out e disparar switch/callbacks finais. O comando `WaitForGab` é o mecanismo explícito para bloquear o `Game_Interpreter` até a fila e a gab corrente terminarem; sem ele, o evento continua imediatamente.

No snapshot atual do projeto, o plugin está ativo na posição 45 de 69, depois do Core Engine, com os parâmetros exatamente iguais aos defaults do cabeçalho. Nenhum caller `code:357` de `VisuMZ_4_GabWindow` foi encontrado nos 200 Common Events ou nos 56 mapas existentes. Portanto, o plugin está disponível, mas ainda não há precedente de uso em eventos nas superfícies inventariadas.

O status geral é `partial` somente porque o adapter não forneceu snapshots completos de execução dos agentes e porque não houve Playtest. As conclusões sobre código, configuração e callers passaram nos validadores estáticos aplicáveis.

## Objetivo, escopo e limites

Objetivo: descobrir como o plugin funciona, quais comandos e parâmetros oferece, como sua máquina de estados opera e como ele está ativado/usado no projeto Daratrine.

Incluído:

- metadata, comandos, parâmetros e implementação de `VisuMZ_4_GabWindow.js`;
- configuração ativa em `frontend/js/plugins.js`;
- inventário estruturado de callers em `CommonEvents.json` e `MapNNN.json`;
- documentação local indexada e `docs/rpg-maker-for-ia/**`;
- fila, timing, rendering, ancoragem, scene lifecycle, efeitos finais e riscos estáticos.

Excluído:

- alteração de plugin, parâmetros, mapas, Common Events ou dados;
- execução do jogo, inspeção visual, mix de áudio e Playtest;
- validação de Plugin Manager `editor-accepted`;
- persistência em catálogo `.loki`;
- pesquisa web, desnecessária para explicar o snapshot local solicitado.

Escrita autorizada: somente este relatório. `frontend/**`, `docs/**`, `.loki/**`, `.agents/**`, `.claude/**` e `.codex/**` permaneceram read-only.

## Mapa de fontes e evidências

| Fonte | Tipo | Evidência usada | Limitação |
| --- | --- | --- | --- |
| `frontend/js/plugins/VisuMZ_4_GabWindow.js` | fonte primária local | header, help, comandos, parâmetros e runtime minificado | toda a implementação executável está na linha 1526 |
| `frontend/js/plugins.js` | configuração gerada | ativação, ordem e parâmetros efetivos | `editor-accepted` não foi observado |
| `frontend/data/CommonEvents.json` | dados estruturados | 200 Common Events parseados; zero callers do plugin | Playtest não realizado |
| `frontend/data/MapInfos.json` e 56 `MapNNN.json` | dados estruturados | mapas existentes parseados; zero callers do plugin | `Map023.json` está ausente apesar de declarado |
| `docs/index.xml` | índice documental | 24 documentos; nenhuma entrada Gab-específica | não substitui busca no corpus |
| `docs/rpg-maker-for-ia/**` | documentação local | nenhuma ocorrência Gab-específica | não existe manual local dedicado |
| Skills Loki RPG Maker/VisuStella | procedimento | gates de plugin, parâmetros, commands, apresentação e inventário | não são prova do comportamento específico do plugin |

Classificação:

- **Fato:** plugin ativo, versão 1.05, Tier 4, parâmetros e callers vêm de fontes locais parseadas.
- **Inferência:** a fila, timing e layout foram reconstruídos de métodos estáticos do plugin ofuscado.
- **Hipótese residual:** aparência, legibilidade, áudio e timing percebido precisam de Playtest se forem critérios da quest.
- **Conflito:** nenhum conflito material entre fontes; a única deriva estrutural é `Map023` ausente e `Map058–060` fora de `MapInfos`.
- **Research gate:** `not-needed`; a fonte local contém o contrato e a implementação da versão instalada.

## Visão geral da arquitetura

```text
Plugin Command (code 357)
    ↓ VisuMZ.ConvertParams
objeto Gab { Text, mode, Filename, ID, ForceGab, Override }
    ↓
Scene_Base.startGabWindow       Scene_Base.forceGabWindow
    ↓ queue + AntiRepeat         ↓ clearGabData + queue
Window_Gab._gabQueue (FIFO)
    ↓ processNewGabData
loadNewGabData → load graphic → refresh
    ↓
background + graphic + text + countdown + onDisplay
    ↓ update por frame
fade-in durante _showCount → fade-out → switch + onFinish
    ↓
próxima entrada ou _gabRunning=false
```

Há uma `Window_Gab` criada por `Scene_Map` e outra por `Scene_Battle`. A janela é inserida na scene, não na lista de comandos do evento. Isso explica por que uma gab não bloqueia o evento automaticamente.

## API de comandos

Todos os 11 comandos Gab passam por `VisuMZ.ConvertParams(args, args)`. Sufixos são convertidos e copiados para a chave sem sufixo:

| Sufixo | Conversão |
| --- | --- |
| `:num` | `Number`; vazio vira `0` |
| `:eval` | `eval`; vazio vira `null` |
| `:json` | `JSON.parse`; vazio vira string vazia |
| `:str` | `String` |
| `:func` | `new Function` |
| `:struct` | JSON + conversão recursiva |

Os argumentos comuns são `Text:json`, `ForceGab:eval` e `Override:struct`.

| Comando | Gráfico resolvido | Argumentos específicos | Resolução |
| --- | --- | --- | --- |
| `GabTextOnly` | nenhum | — | `mode` cai em `none` |
| `GabTextFaceAny` | face | `Filename`, `ID` | usa arquivo/índice informados |
| `GabTextFaceActor` | face | Actor ID | resolve `faceName/faceIndex`; falha vira `none` |
| `GabTextFaceParty` | face | party index | resolve membro; falha vira `none` |
| `GabTextSpriteAny` | character | `Filename`, `ID` | usa arquivo/índice informados |
| `GabTextSpriteActor` | character | Actor ID | resolve `characterName/characterIndex` |
| `GabTextSpriteParty` | character | party index | resolve membro |
| `GabTextSvActorAny` | sv_actor | `Filename` | usa battler informado |
| `GabTextSvActorActor` | sv_actor | Actor ID | resolve `battlerName` |
| `GabTextSvActorParty` | sv_actor | party index | resolve membro |
| `GabTextPicture` | picture | `Filename`, `Stretched` | imagem inteira, escala opcional |

Se a cena atual não possuir `_gabWindow`, o callback retorna sem efeito e sem erro explícito.

Comandos de sistema:

- `ClearGab`: chama `clearGabData()`.
- `WaitForGab`: define o wait mode `gab` no último interpreter que executou `command357`.

Referências primárias: comandos no header a partir de `frontend/js/plugins/VisuMZ_4_GabWindow.js:672`, struct Override em `:1347` e implementação em `:1526`.

## Fila, Force Gab, Clear e Anti-Repeat

### Fila normal

`startGabWindow → addGabData` aplica Anti-Repeat e faz `push`. `processNewGabData` usa `shift`, portanto a ordem é FIFO.

```text
idle → queue recebeu dado
     → processNewGabData
     → loading/refresh
     → showing
     → fading
     → onFinish
     → próxima gab ou idle
```

A gab corrente permanece em `_currentGab` mesmo depois de terminar; isso permite que Anti-Repeat bloqueie uma repetição imediata.

### Force Gab não é substituição síncrona

`forceGabWindow → forceGabData → clearGabData → push` ignora Anti-Repeat. Porém `clearGabData` redefine apenas:

```text
_gabQueue = []
_currentGab = []
_showCount = 0
```

Ele não limpa imediatamente opacidade, `_gabRunning`, bitmap, alvo travado, switch ou callback final. Consequências:

- a gab visível entra em fade-out antes da forçada aparecer;
- `GabSwitch` e `OnFinishJS` da gab interrompida ainda podem disparar;
- o hook global final pode receber `[]` porque `_currentGab` foi limpo;
- `ClearGab` compartilha o mesmo comportamento de conclusão tardia.

### Anti-Repeat

Com `AntiRepeat=true`, o plugin compara por `JSON.stringify`:

1. gab candidata contra `_currentGab`;
2. gab candidata contra o último item da fila.

O método contém um laço sobre a fila, mas repete a comparação do último item; duplicatas no meio da fila não são detectadas. `BypassAntiRepeat` permite uma exceção por gab e Force ignora o sistema inteiro.

## Timing, fade, áudio e sincronização

A contagem é:

```text
texto_contado = Text sem escapes no padrão \comando[...]
WaitFrames =
  (Override.WaitTime || BaseWaitTime || 0)
  + texto_contado.length
    × (Override.TimePerCharacter || TimePerCharacter || 0)
```

Defaults ativos:

- `BaseWaitTime = 90`;
- `TimePerCharacter = 4`;
- `FadeRate = 16`;
- `FadeDirection = None`.

A contagem usa unidades UTF-16, não glifos; emoji pode contar como duas unidades. O período de fade-in consome `_showCount`.

Durante `_showCount > 0`, `contentsOpacity += FadeRate`. Depois, `contentsOpacity -= FadeRate`; a mesma taxa move a janela em pixels por frame para `UP/DOWN/LEFT/RIGHT`.

Ordem de exibição:

```text
draw → startCountdown
     → playSound
     → OnDisplayJS local
     → OnDisplayJS global
     → fade-in/show/fade-out
     → GabSwitch ON
     → OnFinishJS local
     → OnFinishJS global
```

Áudio usa `??`, então volume/pitch/pan iguais a zero são preservados. Os hooks locais recebem `this = Window_Gab`; apenas os globais recebem a gab corrente em `arguments[0]`.

`WaitForGab` continua aguardando enquanto:

```text
_gabQueue.length > 0 || _gabRunning
```

Isso inclui loading, exibição, fade e a transição final para idle, mas não inclui duração restante do SE ou operações assíncronas iniciadas por JavaScript.

## Renderização e layout

A janela usa `padding=0`, largura inicial `Graphics.width` e altura de duas linhas. Sem alvo preso, permanece em largura total. Com alvo:

```text
width = textSizeEx(Text).width + 4 × itemPadding + largura gráfica
height = fittingHeight(linhas_explícitas + 1)
```

A contagem de linhas usa `split(/[\r\n]+/)`; wrapping automático ou fonte grande não aumenta essa contagem.

O fundo é desenhado no próprio `contents`: 25% em `DimColor1` e 75% em gradiente até `DimColor2`. Quando preso a um alvo, o fundo fica uniforme com `DimColor1`.

Modos:

- face: `ImageManager.loadFace`, largura `faceWidth`;
- character: `loadCharacter`, posição global configurada;
- sv_actor: `loadSvActor`, com fallback de desenho se Main Menu Core não estiver disponível;
- picture: `loadPicture`, alinhada no topo esquerdo; `Stretched` preserva proporção com `min(innerWidth/w, innerHeight/h)`.

A fonte segue `Override.FontName/FontSize → General → fonte principal/28`.

Achado negativo importante: `Override.Width` é lido, mas não existe no struct exposto e não é usado por `adjustWidth`. Além disso, `clear` tenta apagar `_widthOVerride` com capitalização divergente.

## Posicionamento e ancoragem

Precedência de alvos:

```text
ator/party → evento → inimigo → posição normal
```

Na prática:

- mapa: ator/party → evento → normal;
- batalha: ator/party → inimigo → normal.

Ator/party precisa ser battle member. No mapa, o líder ancora em `$gamePlayer`; followers exigem visibilidade. Na batalha, ator exige side-view e `isAppeared()`. Evento exige `Scene_Map`, `EventID > 0` e evento existente. Inimigo exige `Scene_Battle`, índice válido e `isAppeared()`.

Posição normal:

```text
x = 0
y = YLocation || (MapYLocation ou BattleYLocation)
```

Como usa `||`, `YLocation=0` é ignorado. Com alvo:

```text
x = anchorX - width / 2
y = anchorY - height - 20 × zoomScale
```

Não há clamp explícito à tela. Em mapa, `screenX/screenY` são multiplicados por `zoomScale`, sem compensação explícita pela origem do zoom. Em batalha, o plugin usa `findTargetSprite`; se não encontrar sprite, retorna sem fallback normal.

Durante a exibição, a posição presa é recalculada a cada frame. Isso pode neutralizar o deslocamento acumulado de fade direcional, embora a opacidade continue caindo.

## Transições de cena e persistência

O plugin intercepta `SceneManager.push` e salva dois canais separados em `$gameTemp`:

- mapa: `_storedMapGabs` e `_currentMapGab`;
- batalha: `_storedBattleGabs` e `_currentBattleGab`.

A fila é copiada superficialmente. A gab corrente só é salva quando `contentsOpacity > 0`. Ao restaurar, a current é recolocada no início e reinicia loading, som, hooks e countdown.

Implicações:

- abrir menu via `push` estaciona e restaura gabs;
- a gab atual pode se perder se já saiu da fila, mas ainda estiver com opacidade zero;
- uma gab em fade-out pode repetir do início ao voltar;
- somente `push` é interceptado; `goto/pop` não recebem captura própria;
- o estado vive em `$gameTemp`; não há integração com `DataManager` ou save file.

## Configuração efetiva no projeto

`frontend/js/plugins.js` passou no validador de envelope (`plugin_objects=69`) antes da extração em VM.

| Evidência | Valor |
| --- | --- |
| Nome | `VisuMZ_4_GabWindow` |
| Status | `true` |
| Posição | 45/69; ordinal ativo 31 |
| Versão/Tier | 1.05 / Tier 4 |
| Core Engine | ativo na posição 9 |
| Main Menu Core | ativo na posição 16 |
| Duplicatas da entrada | nenhuma |

Os blobs ativos `General:struct`, `Map:struct` e `Battle:struct` são iguais aos defaults completos do plugin.

| Área | Valores ativos principais |
| --- | --- |
| General | AntiRepeat=true; CenterGraphics=true; FadeRate=16; FadeDirection=None; FontSize=28; BaseWaitTime=90; TimePerCharacter=4 |
| Map | Y=72; preto 60% → transparente |
| Battle | Y=108; preto 60% → transparente |
| Hooks globais | defaults sem ação |

Precedência geral:

```text
override truthy por gab → parâmetro global → fallback interno
```

Exceções: som usa `??`; `0` funciona para volume/pitch/pan. Para `WaitTime`, `TimePerCharacter`, `FadeRate`, `FontSize` e `YLocation`, zero não prevalece.

`editor-accepted` permanece `pending/not-claimed`: validação estrutural e extração não provam que o projeto foi aberto/salvo/reaberto pelo Plugin Manager.

## Uso existente no projeto

Inventário focado:

- 200 Common Events parseados;
- 56 `MapNNN.json` existentes parseados;
- zero comandos `code:357` pertencentes a `VisuMZ_4_GabWindow`;
- callers de outros 14 plugins foram encontrados, confirmando que o scanner reconheceu a superfície;
- nenhuma documentação Gab-específica em `docs/index.xml` ou `docs/rpg-maker-for-ia/**`.

Conclusão: no working tree atual, o plugin foi adicionado/ativado, mas não é usado por eventos ou Common Events nas superfícies existentes. `plugins.js` está modificado e o arquivo do plugin está untracked, portanto essa ativação ainda não faz parte de um snapshot Git confirmado.

Limitação de cobertura: `MapInfos.json` declara `Map023`, mas `Map023.json` não existe. `Map058–060.json` existem sem entrada em `MapInfos` e foram parseados.

## Aplicação recomendada para 002-3-criancas-gapMsg

Para falas sequenciais curtas das crianças:

1. Use os comandos Gab com `ForceGab:false` para manter FIFO e evitar que uma fala corte a anterior.
2. Ajuste `WaitTime` e `TimePerCharacter` por chamada quando a cena precisar de ritmo mais curto. Use valores positivos; zero cai nos defaults.
3. Use `EventID` para ancorar a gab à criança quando o evento estiver no mapa. Faça Playtest porque não há clamp de tela e o zoom tem limitações estáticas.
4. Use `WaitForGab` apenas quando o restante do evento realmente depender da conclusão de toda a fila. Sem ele, preserve o caráter não bloqueante.
5. Evite `ForceGab` para diálogo comum: além de interromper a fila, callbacks e switches da gab anterior ainda podem disparar.
6. Se a lógica usar `GabSwitch` ou `OnFinishJS`, trate Clear/Force como caminhos que ainda podem chegar à finalização.
7. Não use `Override.Width` como solução de layout; a versão 1.05 instalada não o aplica.

Essa recomendação usa o plugin existente, seus comandos e overrides, sem exigir patch customizado. Aparência, wrapping, ritmo percebido, ancoragem e áudio continuam sob gate de Playtest.

## Matriz de decisão

| Opção | Vantagens | Limitações | Adequação |
| --- | --- | --- | --- |
| Show Text padrão | bloqueio e fluxo de evento explícitos | interrompe gameplay e usa message box | baixa para falas ambientais curtas |
| Gab enfileirada | não bloqueante, FIFO, gráficos/âncora/áudio/overrides | timing visual precisa Playtest | **recomendada** |
| Gab forçada | prioridade sobre fila | não substitui sincronicamente; efeitos finais antigos podem disparar | só para interrupção intencional |
| Patch/helper customizado | pode corrigir edge cases | nova manutenção e integração | não justificado pela demanda atual |

## Achados materiais e riscos

- **Fato:** o plugin está ativo e ordenado depois do Core Engine.
- **Fato:** não há callers atuais do Gab Window em eventos/Common Events/mapas existentes.
- **Fato:** `ForceGab` e `ClearGab` não limpam todos os estados da gab visível.
- **Fato:** Anti-Repeat compara a current e apenas o último item da fila.
- **Fato:** `Override.Width` não tem efeito observável.
- **Fato:** overrides numéricos zero são ignorados em várias superfícies por `||`.
- **Fato:** estado entre cenas é transitório em `$gameTemp`, não em save.
- **Inferência:** ancoragem perto das bordas pode produzir clipping porque não há clamp.
- **Inferência:** hooks JavaScript que lançam erro podem deixar a máquina de estados parcialmente avançada.
- **Hipótese residual:** wrapping, legibilidade, áudio e timing percebido só podem ser avaliados em Playtest.

## Tecnologia e confiança

| Tecnologia | Versão/alias | Superfícies | Confiança | Limitação |
| --- | --- | --- | --- | --- |
| RPG Maker MZ | runtime local | Scene, Window, Game_Interpreter, PluginManager | alta estática | sem execução |
| VisuStella Gab Window | `VisuMZ_4_GabWindow` 1.05 Tier 4 | commands, parameters, map/battle presentation | alta estática | source ofuscado em uma linha |
| JavaScript | NW.js/browser runtime do projeto | eval/new Function, protótipos, ImageManager, AudioManager | alta estática | sem tracing runtime |
| Dados RPG Maker | command code 357 | Common Events e mapas | alta no snapshot | Map023 ausente |

## Política e controles de execução

- Policy ID: `analytic-inference-policy-v1`
- Policy digest: `sha256:66190053731d7abb63f0e18bae491856765eabdd3dbbbe6d9b3b965698e5f3c2`
- Fonte: `E:/Projetos/loki-framework/skills/lf-analytic-inference/references/policy-v1.json`
- Rodadas máximas: 3
- Investigações delegadas máximas por rodada: 6
- Concorrência: 2
- Timeout de handoff: 3 checkpoints
- Custo: telemetry-only
- Catalog retrieval page size: 20
- Minimum candidate floor: 8; não é quota nem stop condition
- Candidate ceiling: null
- Request controls digest: `sha256:80324b89b8c5759f021e8a99f60921a5be5e2778f7163b83066ff76208e46db9`
- Geração: semantic-saturation; passe final produziu zero novos candidatos distintos

## Núcleo imutável de preparação

- Locator: `planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md#apendice-a-nucleo-canonico`
- Preparation ID: `prep-63b00a1c1e76bd8ba6cfde21fd32cc84dc42a88e6bc197c15b82183a9f97fdaa`
- Preparation digest: `sha256:bb1f3ac767cb6441a6034fc73cc7669aeddf8f1d84ce8c88771ae505aae76600`
- Input fingerprint: `sha256:3ef326702fe02cfe7d399cc5cc47414d6fb6db1e7587c2bccc562e784e49bccb`
- Status: `pre-investigation-complete`
- Root: `E:\Projetos\projectX`
- Root provenance: `canonical-pwd`
- Catalog state: `absent`
- Registry locator: absent
- Core digest verification: passed pelo `validate-preparation.py`
- Execution boundary: zero/false/empty
- Catalog mutation: false

### Projeção canônica dos candidatos

O bloco abaixo preserva ordem e campos do núcleo validado. Inclusão no relatório não promove nem persiste inferências.

```json
{
  "candidates": [
    {
      "candidate_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Renderiza??o, texto e gr?ficos anexos",
      "investigable_statement": "Como a Window_Gab calcula dimens?es e desenha texto, fundo, faces, characters, SV actors e pictures?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "graphic-loading",
        "window-layout",
        "text-rendering"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Features",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-drawGab"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: cria??o da Window_Gab, carregamento ImageManager, c?lculo de largura/altura e m?todos drawGab*"
      ],
      "stop_condition": "O pipeline de layout, carregamento e desenho ? mapeado para cada modo gr?fico.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: permite prever limites visuais, escolha de asset e comportamento multilinha na apresenta??o da quest.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "ui-rendering-analysis"
      ]
    },
    {
      "candidate_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Fila, for?a e anti-repeti??o",
      "investigable_statement": "Quais regras governam enfileiramento, Force Gab, limpeza e supress?o de gabs repetidos?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "anti-repeat",
        "queue-lifecycle"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Clearing Up Misunderstandings",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-Window_Gab-queue"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: m?todos startGabWindow, forceGabWindow, clearGabWindow e verifica??es anti-repeat"
      ],
      "stop_condition": "As transi??es da fila e todas as condi??es de descarte ou substitui??o s?o caracterizadas.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: determina se di?logos curtos preservam ordem, podem interromper mensagens anteriores e evitam duplica??o acidental.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "state-flow-analysis"
      ]
    },
    {
      "candidate_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Registro e transforma??o dos comandos de plugin",
      "investigable_statement": "Como cada comando Gab transforma argumentos do Plugin Manager em uma entrada normalizada para a janela?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "plugin-commands",
        "parameter-conversion"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Plugin Commands",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-registerCommand"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: registros PluginManager.registerCommand e convers?o VisuMZ.ConvertParams no plugin"
      ],
      "stop_condition": "Todos os comandos p?blicos, modos gr?ficos e campos normalizados s?o mapeados, ou a ofusca??o impede uma correla??o observ?vel.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define a API efetiva que eventos e Common Events podem usar sem pressupor nomes ou tipos incorretos.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "source-code-analysis"
      ]
    },
    {
      "candidate_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Par?metros globais e overrides por gab",
      "investigable_statement": "Como par?metros globais de General, Map e Battle se combinam com Optional Settings de cada gab?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "plugin-parameters",
        "runtime-overrides"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Plugin Parameters",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-settings"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: estruturas de par?metros, VisuMZ.ConvertParams, setGabData e leituras de Settings"
      ],
      "stop_condition": "A preced?ncia default-versus-override e os valores efetivamente usados s?o mapeados por campo.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define quais comportamentos podem ser configurados sem editar o plugin e quais valores vazios retornam aos defaults.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "configuration-analysis"
      ]
    },
    {
      "candidate_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Posicionamento normal e ancorado",
      "investigable_statement": "Como a janela escolhe posi??o global ou se ancora a atores, party members, inimigos e eventos em mapa e batalha?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "battle-targeting",
        "map-targeting",
        "screen-positioning"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings-Position",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-reposition"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: isRepositionToActor, isRepositionToEvent, isRepositionToEnemy e m?todos reposition*"
      ],
      "stop_condition": "Prioridades de alvo, pr?-condi??es por cena, coordenadas e fallback s?o caracterizados.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: determina qual alvo usar para fala dieg?tica e quais fallbacks ocorrem quando ele n?o existe ou n?o est? vis?vel.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "ui-positioning-analysis"
      ]
    },
    {
      "candidate_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Ativa??o, depend?ncias e uso no projeto",
      "investigable_statement": "Como o plugin est? ativado, configurado e referenciado pelo projeto Daratrine?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "project-configuration",
        "project-usage"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Requirements",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#plugin-metadata"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: frontend/js/plugins.js para ativa??o, ordem e par?metros",
        "inspect-data: eventos e Common Events que invocam VisuMZ_4_GabWindow"
      ],
      "stop_condition": "A configura??o ativa e os usos existentes s?o localizados, ou sua aus?ncia ? estabelecida no escopo permitido.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: distingue comportamento dispon?vel no arquivo de comportamento realmente habilitado e precedentes j? adotados no jogo.",
      "suggested_capabilities": [
        "rpg-maker-mz-project-inventory",
        "source-research"
      ]
    },
    {
      "candidate_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Persist?ncia entre mudan?as de cena",
      "investigable_statement": "Como gabs atuais e enfileiradas s?o armazenadas e restauradas ao alternar entre mapa, menu e batalha?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "scene-transition",
        "temporary-state"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Changelog-1.04",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-storeGabs"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: hooks de SceneManager, storeGabs, loadGabs e campos tempor?rios em Game_Temp"
      ],
      "stop_condition": "As regras de transfer?ncia entre Scene_Map, Scene_Battle e outras cenas s?o demonstradas.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: evita assumir que a fila ? persistente em toda transi??o e revela riscos de continua??o ou descarte de di?logo.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "scene-lifecycle-analysis"
      ]
    },
    {
      "candidate_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7",
      "origin": "generated",
      "lifecycle_status": "unreviewed",
      "summary": "Temporiza??o, fade e sincroniza??o do interpretador",
      "investigable_statement": "Como dura??o, fade, Wait For Gab Completion, switch final e callbacks JavaScript se encadeiam no ciclo de uma gab?",
      "technologies": [
        "javascript",
        "rpg-maker-mz",
        "visustella-mz-gab-window"
      ],
      "surfaces": [
        "event-wait-mode",
        "gab-timing",
        "hooks"
      ],
      "support_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#System Plugin Commands",
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-update"
      ],
      "confirm_or_reject_evidence": [
        "inspect-source: startCountdown, updateFadeIn, updateFadeOut, updateWaitMode e finaliza??o da Window_Gab"
      ],
      "stop_condition": "O ciclo desde exibi??o at? conclus?o, incluindo o crit?rio que libera o interpretador, ? demonstrado.",
      "catalog_locator": null,
      "catalog_revision": null,
      "duplicate_relation": "none",
      "disposition": "selected",
      "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define sincroniza??o segura entre gabs e eventos posteriores, al?m do momento correto para switches e callbacks.",
      "suggested_capabilities": [
        "rpg-maker-mz-plugin-analysis",
        "state-flow-analysis"
      ]
    }
  ],
  "selected_for_investigation": [
    "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
    "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
    "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
    "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
    "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
    "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
    "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
    "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
  ],
  "planned_investigations": [
    {
      "candidate_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9"
    },
    {
      "candidate_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64"
    },
    {
      "candidate_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364"
    },
    {
      "candidate_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa"
    },
    {
      "candidate_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1"
    },
    {
      "candidate_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660"
    },
    {
      "candidate_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043"
    },
    {
      "candidate_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
    }
  ]
}
```

- Inferências catalogadas reutilizadas: nenhuma; registry ausente.
- Índices lidos: nenhum.
- Record locators carregados: nenhum; o catálogo inteiro não foi carregado.
- Duplicatas exatas: nenhuma.
- Near-duplicates: nenhuma.
- Rejeitados/deferred: nenhum.
- Selecionados: 8; investigados: 8; validados estaticamente: 8.

## Rodadas adaptativas e cobertura especializada

```json
{
  "schema_version": 1,
  "preparation_binding": {
    "preparation_id": "prep-63b00a1c1e76bd8ba6cfde21fd32cc84dc42a88e6bc197c15b82183a9f97fdaa",
    "preparation_digest": "sha256:bb1f3ac767cb6441a6034fc73cc7669aeddf8f1d84ce8c88771ae505aae76600",
    "candidate_ids": [
      "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
      "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
      "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
      "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
      "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
      "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
      "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
      "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
    ]
  },
  "candidate_universe": [
    "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
    "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
    "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
    "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
    "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
    "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
    "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
    "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
  ],
  "initial_classification": {
    "selected_candidate_ids": [
      "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
      "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
      "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
      "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
      "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
      "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
      "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
      "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
    ],
    "useful_candidate_ids": [
      "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
      "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
      "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
      "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
      "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
      "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
      "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
      "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
    ],
    "decisions": {
      "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043": "Persistent read-only specialist matched to a material, observable source question.",
      "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7": "Persistent read-only specialist matched to a material, observable source question."
    }
  },
  "initial_useful_investigations": [
    "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
    "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
    "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
    "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
    "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
    "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
    "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
    "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
  ],
  "policy": {
    "max_rounds": 3,
    "max_delegated_per_round": 6,
    "concurrent_handoff_limit": 2,
    "cost_mode": "telemetry-only"
  },
  "rounds": [
    {
      "round": 1,
      "status": "terminal",
      "delegated_investigations": [
        {
          "candidate_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
          "owner": "technical-implementer",
          "material_question": "Map command argument conversion and normalized Window_Gab input.",
          "reinvestigation_rationale": null,
          "subwave": 1,
          "handoff_id": "handoff-gab-01-commands",
          "agent_run_id": "agent-run-gab-01-commands",
          "evidence_id": "evidence-gab-01-commands",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
          "owner": "technical-implementer",
          "material_question": "Map Window_Gab layout, graphic loading, background and text drawing.",
          "reinvestigation_rationale": null,
          "subwave": 1,
          "handoff_id": "handoff-gab-02-render",
          "agent_run_id": "agent-run-gab-02-render",
          "evidence_id": "evidence-gab-02-render",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
          "owner": "technical-implementer",
          "material_question": "Characterize queue, force, clear and anti-repeat state transitions.",
          "reinvestigation_rationale": null,
          "subwave": 2,
          "handoff_id": "handoff-gab-03-queue",
          "agent_run_id": "agent-run-gab-03-queue",
          "evidence_id": "evidence-gab-03-queue",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
          "owner": "technical-implementer",
          "material_question": "Characterize normal and target-locked positioning on map and battle.",
          "reinvestigation_rationale": null,
          "subwave": 2,
          "handoff_id": "handoff-gab-04-position",
          "agent_run_id": "agent-run-gab-04-position",
          "evidence_id": "evidence-gab-04-position",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7",
          "owner": "technical-implementer",
          "material_question": "Characterize timing, fades, wait mode, audio, switch and JavaScript hooks.",
          "reinvestigation_rationale": null,
          "subwave": 3,
          "handoff_id": "handoff-gab-05-timing",
          "agent_run_id": "agent-run-gab-05-timing",
          "evidence_id": "evidence-gab-05-timing",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
          "owner": "technical-implementer",
          "material_question": "Characterize transient storage and restoration across scene changes.",
          "reinvestigation_rationale": null,
          "subwave": 3,
          "handoff_id": "handoff-gab-06-scenes",
          "agent_run_id": "agent-run-gab-06-scenes",
          "evidence_id": "evidence-gab-06-scenes",
          "cost": "unknown",
          "terminal_state": "completed"
        }
      ],
      "local_resolutions": [],
      "terminal_barrier": [
        "handoff-gab-01-commands",
        "handoff-gab-02-render",
        "handoff-gab-03-queue",
        "handoff-gab-04-position",
        "handoff-gab-05-timing",
        "handoff-gab-06-scenes"
      ],
      "reclassification": {
        "all_candidate_ids": [
          "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
          "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
          "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
          "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
          "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
          "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
          "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
          "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
        ],
        "useful_next_round": [
          "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
          "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660"
        ],
        "decisions": {
          "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9": "Sufficient terminal static evidence collected in round 1.",
          "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64": "Sufficient terminal static evidence collected in round 1.",
          "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364": "Sufficient terminal static evidence collected in round 1.",
          "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa": "Still useful after round 1 because active configuration and project callers require separate structured sources.",
          "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1": "Sufficient terminal static evidence collected in round 1.",
          "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660": "Still useful after round 1 because active configuration and project callers require separate structured sources.",
          "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043": "Sufficient terminal static evidence collected in round 1.",
          "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7": "Sufficient terminal static evidence collected in round 1."
        }
      }
    },
    {
      "round": 2,
      "status": "terminal",
      "delegated_investigations": [
        {
          "candidate_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
          "owner": "technical-implementer",
          "material_question": "Extract active parameters and characterize global-versus-per-gab precedence.",
          "reinvestigation_rationale": null,
          "subwave": 1,
          "handoff_id": "handoff-gab-07-config",
          "agent_run_id": "agent-run-gab-07-config",
          "evidence_id": "evidence-gab-07-config",
          "cost": "unknown",
          "terminal_state": "completed"
        },
        {
          "candidate_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
          "owner": "source-researcher",
          "material_question": "Inventory activation, order, local documentation and all event command callers.",
          "reinvestigation_rationale": null,
          "subwave": 1,
          "handoff_id": "handoff-gab-08-project",
          "agent_run_id": "agent-run-gab-08-project",
          "evidence_id": "evidence-gab-08-project",
          "cost": "unknown",
          "terminal_state": "completed"
        }
      ],
      "local_resolutions": [],
      "terminal_barrier": [
        "handoff-gab-07-config",
        "handoff-gab-08-project"
      ],
      "reclassification": {
        "all_candidate_ids": [
          "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
          "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
          "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
          "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
          "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
          "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
          "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
          "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
        ],
        "useful_next_round": [],
        "decisions": {
          "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043": "Sufficient terminal static evidence collected; no materially different follow-up question remains.",
          "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7": "Sufficient terminal static evidence collected; no materially different follow-up question remains."
        }
      }
    }
  ],
  "analysis_terminal_reason": "analysis-sufficient",
  "downstream_handoff": {
    "analysis_phase_complete": true,
    "auto_invoked": false,
    "allowed_destinations": [
      "further bounded investigation"
    ],
    "minimum_next_path": "Run an approved Playtest only if perceptible visual, audio, timing, or scene-transition behavior must be validated."
  }
}
```

Validação executada em memória com o mesmo contrato de `validate-investigation-rounds.py <ledger> --preparation <preparation-v3>`: **passed**. O núcleo schema v3 foi fornecido separadamente como autoridade, não reconstruído do ledger.

| Handoff | Agent run | Evidence ID | Candidate | Owner | Estado | Resultado |
| --- | --- | --- | --- | --- | --- | --- |
| `handoff-gab-01-commands` | `agent-run-gab-01-commands` | `evidence-gab-01-commands` | `gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364` | technical-implementer | completed | comandos e normalização |
| `handoff-gab-02-render` | `agent-run-gab-02-render` | `evidence-gab-02-render` | `gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9` | technical-implementer | completed | renderização e layout |
| `handoff-gab-03-queue` | `agent-run-gab-03-queue` | `evidence-gab-03-queue` | `gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64` | technical-implementer | completed | fila, força e anti-repeat |
| `handoff-gab-04-position` | `agent-run-gab-04-position` | `evidence-gab-04-position` | `gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1` | technical-implementer | completed | posicionamento e ancoragem |
| `handoff-gab-05-timing` | `agent-run-gab-05-timing` | `evidence-gab-05-timing` | `gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7` | technical-implementer | completed | timing, wait, áudio e hooks |
| `handoff-gab-06-scenes` | `agent-run-gab-06-scenes` | `evidence-gab-06-scenes` | `gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043` | technical-implementer | completed | transições de cena |
| `handoff-gab-07-config` | `agent-run-gab-07-config` | `evidence-gab-07-config` | `gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa` | technical-implementer | completed | parâmetros ativos e precedência |
| `handoff-gab-08-project` | `agent-run-gab-08-project` | `evidence-gab-08-project` | `gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660` | source-researcher | completed | ativação, callers e docs locais |

- Rodada 1: 6 investigações em 3 subondas de 2.
- Reclassificação 1: configuração e uso no projeto permaneceram úteis.
- Rodada 2: 2 investigações em 1 subonda.
- Reclassificação 2: nenhum candidato útil restante.
- Terminal reason: `analysis-sufficient`.
- Handoffs não terminais: nenhum.
- Capability gap: nenhum material.
- Local resolutions: nenhuma.
- Escrita compartilhada: somente o orquestrador materializou este relatório.

## Eventos de inferência pós-boundary

```json
[
  {
    "schema_version": 1,
    "event_id": "event-gab-01-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-01-commands",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-01-commands"
      ]
    },
    "inference_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: comandos e normalização.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-02-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-02-render",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-02-render"
      ]
    },
    "inference_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: renderização e layout.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-03-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-03-queue",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-03-queue"
      ]
    },
    "inference_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: fila, força e anti-repeat.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-04-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-04-position",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-04-position"
      ]
    },
    "inference_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: posicionamento e ancoragem.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-05-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-05-timing",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-05-timing"
      ]
    },
    "inference_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: timing, wait, áudio e hooks.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-06-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-06-scenes",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-06-scenes"
      ]
    },
    "inference_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: transições de cena.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-07-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-07-config",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-07-config"
      ]
    },
    "inference_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: parâmetros ativos e precedência.",
    "agent_capability": "technical-implementer",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  },
  {
    "schema_version": 1,
    "event_id": "event-gab-08-validated",
    "source": {
      "analysis_ref": "planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md",
      "run_id": "loki-deep-analysis-gabwindow-20260729",
      "handoff_id": "handoff-gab-08-project",
      "evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js",
        "evidence-gab-08-project"
      ]
    },
    "inference_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
    "inference_revision": 1,
    "stage": "validated",
    "outcome": "validated-static-finding",
    "reason": "A investigação terminal validou o tópico: ativação, callers e docs locais.",
    "agent_capability": "source-researcher",
    "cost": {
      "context": "unknown",
      "tools": "unknown"
    }
  }
]
```

Os eventos registram somente o estágio observado `validated`; não autorizam mutação do catálogo.

## Evidência de execução

O adapter Codex tem baseline experimental e não forneceu export run-scoped completo. Os completion records estão correlacionados, mas transcript, tool I/O e uso não podem ser promovidos a `complete`.

| Agent run / Evidence | Overall | Transcript | Tool I/O | Errors | Reasoning summary | Token usage | Locator/integrity | Motivo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `agent-run-gab-01-commands` / `evidence-gab-01-commands` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-02-render` / `evidence-gab-02-render` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-03-queue` / `evidence-gab-03-queue` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-04-position` / `evidence-gab-04-position` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-05-timing` / `evidence-gab-05-timing` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-06-scenes` / `evidence-gab-06-scenes` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-07-config` / `evidence-gab-07-config` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |
| `agent-run-gab-08-project` / `evidence-gab-08-project` | partial | unavailable | unavailable | partial | partial | unsupported | conclusão correlacionada; snapshot/uso run-scoped indisponíveis | transcript/tool I/O não exportados; reasoning summary é declarativa; tokens não fornecidos pelo adapter |

- Sanitização: realizada na consolidação; somente fatos, resumos e referências locais foram preservados.
- Raw payload/transcript persistido: false.
- Private/full chain-of-thought incluído: false.
- Identidade, locator ou uso fabricados: false.
- Retrospective fallback: false.
- Custos desconhecidos foram preservados como `unknown`, nunca convertidos para zero.
- Custo influenciou admissão/stop: false.

## Validadores, gates e aprovações

| Check | Status | Evidência | Efeito |
| --- | --- | --- | --- |
| input/path/destination collision | passed | raiz canônica, parent existente, target ausente | autorizou materialização |
| source SHA-256 | passed | `sha256:25d479b2a5472c3ab57c808e6b0b09bd6b28fc4476e5a51204b617f0cc06b86a` | fixou snapshot do plugin |
| preparation schema v3 | passed | `sha256:bb1f3ac767cb6441a6034fc73cc7669aeddf8f1d84ce8c88771ae505aae76600` | autorizou matching |
| round ledger | passed | 2 rodadas, 8 handoffs terminais | análise suficiente |
| `plugins.js` envelope | passed | editor-structural; 69 objetos | autorizou extração VM read-only |
| `node --check plugins.js` | passed | syntax-valid | configuração parseável |
| CommonEvents structured parse | passed | 200 objetos | zero callers |
| Map structured parse | passed-with-drift | 56 arquivos; Map023 ausente | cobertura medium-high do conjunto declarado |
| plugin syntax | passed | `node --check VisuMZ_4_GabWindow.js` | sintaxe válida |
| `editor-accepted` | pending/not-claimed | requer Plugin Manager humano | não bloqueia análise estática |
| Playtest | not-applicable para objetivo estático | nenhum runtime claim | necessário apenas para percepção/runtime |
| report write set | passed no preflight | um destino exato | nenhum target adicional autorizado |
| catalog mutation | passed no preflight | state root ausente; zero write authority | `mutation_applied:false` |

Material validators failed: nenhum. Pending material handoff: nenhum.

## Human validation

```yaml
human_validation:
  gate: playtest-gab-window
  required: false
  state: not-applicable
  source: objective is static behavior analysis
  evidence_refs: []
  reason: no claim of visual, audio, timing, event reachability or persisted runtime behavior is made
  minimum_next_path: run an approved map Playtest if the quest adopts Gab Window and perceptible behavior must be accepted
```

Runtime, integração, persistência de save ou comportamento perceptível declarados validados: **false**.

## Limitações e blockers

- Limitação: implementação ofuscada/minificada na linha 1526 reduz granularidade de referência.
- Limitação: evidência de agentes é `partial` por falta de snapshot run-scoped completo.
- Limitação: `Map023.json` ausente impede cobertura desse mapa declarado.
- Blockers: nenhum para explicar o plugin.
- Risco residual: Playtest necessário antes de aceitar layout, wrapping, ancoragem, áudio e pacing.
- Capacidade indisponível: transcript/tool I/O/token usage completos do adapter.

## Roteamento downstream

| Destino | Permitido | Motivo | Gate/input |
| --- | --- | --- | --- |
| further bounded investigation | sim | somente se a implementação da quest precisar validar percepção/runtime | mapa/evento alvo + Playtest |
| loki-human-decision-preflight | não necessário | nenhuma decisão humana material aberta para esta pesquisa | — |
| loki-implement-feature | não auto-invocado | o usuário pediu pesquisa, não mudança | nova demanda explícita + este relatório |
| loki-continuous-improvement | não necessário | não há pedido de promoção de regras | aprovação futura separada |

## Próximos passos

1. Nenhuma ação é necessária para concluir a pesquisa.
2. Se a quest usar Gab Window, criar uma demanda separada para inserir os comandos nos eventos e executar Playtest de fila, wrapping, ancoragem e timing.
3. Não editar `VisuMZ_4_GabWindow.js` para obter o comportamento básico; os comandos e overrides existentes são suficientes.

## Estado de retomada

```yaml
deep_analysis_resume_state:
  report_contract_version: 3
  status: partial
  delivery_mode: report-artifact
  report_destination: planos/002-quest-hora-da-historia/002-3-criancas-gapMsg/analise-visumz-4-gabwindow.md
  objective: descobrir como VisuMZ_4_GabWindow.js funciona no projeto Daratrine
  source_refs:
    - frontend/js/plugins/VisuMZ_4_GabWindow.js
    - frontend/js/plugins.js
    - frontend/data/CommonEvents.json
    - frontend/data/MapInfos.json
    - frontend/data/MapNNN.json
    - docs/index.xml
    - docs/rpg-maker-for-ia/**
  policy_id: analytic-inference-policy-v1
  policy_digest: sha256:66190053731d7abb63f0e18bae491856765eabdd3dbbbe6d9b3b965698e5f3c2
  preparation_id: prep-63b00a1c1e76bd8ba6cfde21fd32cc84dc42a88e6bc197c15b82183a9f97fdaa
  preparation_digest: sha256:bb1f3ac767cb6441a6034fc73cc7669aeddf8f1d84ce8c88771ae505aae76600
  input_fingerprint: sha256:3ef326702fe02cfe7d399cc5cc47414d6fb6db1e7587c2bccc562e784e49bccb
  catalog_state: absent
  request_controls_digest: sha256:80324b89b8c5759f021e8a99f60921a5be5e2778f7163b83066ff76208e46db9
  completed_stages:
    - input-preflight
    - preparation-v3
    - capability-matching
    - investigation-round-1
    - reclassification-1
    - investigation-round-2
    - reclassification-2
    - report-consolidation
  rounds_completed: 2
  terminal_reason: analysis-sufficient
  terminal_handoffs: 8
  evidence_state: partial
  observed_cost:
    used: unknown
    mode: telemetry-only
  human_validation:
    gate: playtest-gab-window
    required: false
    state: not-applicable
    minimum_next_path: approved Playtest only if runtime acceptance is requested
  blockers: []
  next_destination: further bounded investigation
  minimum_next_path: none for static research; Playtest only for perceptible behavior
```

## Apêndice A — núcleo canônico

O objeto completo abaixo é a única preparação schema v3 usada nesta execução.

```json
{
  "inference_preparation": {
    "schema_version": 3,
    "artifact_type": "analytic-inference-preparation",
    "preparation_id": "prep-63b00a1c1e76bd8ba6cfde21fd32cc84dc42a88e6bc197c15b82183a9f97fdaa",
    "input_fingerprint": "sha256:3ef326702fe02cfe7d399cc5cc47414d6fb6db1e7587c2bccc562e784e49bccb",
    "preparation_digest": "sha256:bb1f3ac767cb6441a6034fc73cc7669aeddf8f1d84ce8c88771ae505aae76600",
    "status": "pre-investigation-complete",
    "input": {
      "demand_digest": "sha256:a4297187e51d6e9c181a92910e811284d63234a23da4e550a783ce971c10f7d5",
      "ordered_source_digests": [
        "sha256:25d479b2a5472c3ab57c808e6b0b09bd6b28fc4476e5a51204b617f0cc06b86a"
      ],
      "request_controls": {
        "candidate_ceiling": null,
        "catalog_retrieval_page_size": 20,
        "minimum_candidate_floor": 8
      },
      "request_controls_digest": "sha256:80324b89b8c5759f021e8a99f60921a5be5e2778f7163b83066ff76208e46db9"
    },
    "root": {
      "consumer_root": "E:\\Projetos\\projectX",
      "root_provenance": "canonical-pwd"
    },
    "source_map": {
      "sources": [
        {
          "locator": "frontend/js/plugins/VisuMZ_4_GabWindow.js",
          "digest": "sha256:25d479b2a5472c3ab57c808e6b0b09bd6b28fc4476e5a51204b617f0cc06b86a",
          "facts": [
            "O cabe?alho identifica RPG Maker MZ, Tier 4 e vers?o 1.05.",
            "O help declara fila externa ? lista de eventos, comandos de espera e limpeza.",
            "O help declara texto, quatro fam?lias de gr?fico, ancoragem, som, switch e callbacks JavaScript.",
            "O runtime registra comandos, cria Window_Gab e integra SceneManager, Game_Interpreter e Game_Temp."
          ]
        }
      ]
    },
    "policy": {
      "policy_id": "analytic-inference-policy-v1",
      "policy_digest": "sha256:66190053731d7abb63f0e18bae491856765eabdd3dbbbe6d9b3b965698e5f3c2",
      "values": {
        "candidate_ceiling": null,
        "catalog_retrieval_page_size": 20,
        "concurrent_handoff_limit": 2,
        "handoff_timeout_ticks": 3,
        "max_delegated_investigations_per_round": 6,
        "max_investigation_rounds": 3,
        "minimum_candidate_floor": 8,
        "persistent_catalog_limit": 3,
        "promotion_min": 12,
        "purge_review_max": -4,
        "removals_per_cycle": 1,
        "reorganization_max": 2,
        "score_weights": {
          "false_positive": -6,
          "investigated": 1,
          "material_finding": 5,
          "repeated_evidence": -4,
          "selected": 0,
          "stale": -2,
          "task_helped": 8,
          "validated": 3
        }
      }
    },
    "catalog_observation": {
      "state": "absent",
      "catalog_snapshot_digest": null,
      "indices_read": [],
      "record_locators_loaded": [],
      "diagnostics": [
        "registry.xml ausente; nenhuma infer?ncia catalogada foi carregada"
      ],
      "retrieval_pages_read": 0,
      "retrieval_exhausted": true,
      "retrieval_resume_cursor": null
    },
    "technologies": [
      "javascript",
      "rpg-maker-mz",
      "visustella-mz-gab-window"
    ],
    "candidates": [
      {
        "candidate_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Renderiza??o, texto e gr?ficos anexos",
        "investigable_statement": "Como a Window_Gab calcula dimens?es e desenha texto, fundo, faces, characters, SV actors e pictures?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "graphic-loading",
          "window-layout",
          "text-rendering"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Features",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-drawGab"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: cria??o da Window_Gab, carregamento ImageManager, c?lculo de largura/altura e m?todos drawGab*"
        ],
        "stop_condition": "O pipeline de layout, carregamento e desenho ? mapeado para cada modo gr?fico.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: permite prever limites visuais, escolha de asset e comportamento multilinha na apresenta??o da quest.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "ui-rendering-analysis"
        ]
      },
      {
        "candidate_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Fila, for?a e anti-repeti??o",
        "investigable_statement": "Quais regras governam enfileiramento, Force Gab, limpeza e supress?o de gabs repetidos?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "anti-repeat",
          "queue-lifecycle"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Clearing Up Misunderstandings",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-Window_Gab-queue"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: m?todos startGabWindow, forceGabWindow, clearGabWindow e verifica??es anti-repeat"
        ],
        "stop_condition": "As transi??es da fila e todas as condi??es de descarte ou substitui??o s?o caracterizadas.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: determina se di?logos curtos preservam ordem, podem interromper mensagens anteriores e evitam duplica??o acidental.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "state-flow-analysis"
        ]
      },
      {
        "candidate_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Registro e transforma??o dos comandos de plugin",
        "investigable_statement": "Como cada comando Gab transforma argumentos do Plugin Manager em uma entrada normalizada para a janela?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "plugin-commands",
          "parameter-conversion"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Plugin Commands",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-registerCommand"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: registros PluginManager.registerCommand e convers?o VisuMZ.ConvertParams no plugin"
        ],
        "stop_condition": "Todos os comandos p?blicos, modos gr?ficos e campos normalizados s?o mapeados, ou a ofusca??o impede uma correla??o observ?vel.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define a API efetiva que eventos e Common Events podem usar sem pressupor nomes ou tipos incorretos.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "source-code-analysis"
        ]
      },
      {
        "candidate_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Par?metros globais e overrides por gab",
        "investigable_statement": "Como par?metros globais de General, Map e Battle se combinam com Optional Settings de cada gab?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "plugin-parameters",
          "runtime-overrides"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Plugin Parameters",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-settings"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: estruturas de par?metros, VisuMZ.ConvertParams, setGabData e leituras de Settings"
        ],
        "stop_condition": "A preced?ncia default-versus-override e os valores efetivamente usados s?o mapeados por campo.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define quais comportamentos podem ser configurados sem editar o plugin e quais valores vazios retornam aos defaults.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "configuration-analysis"
        ]
      },
      {
        "candidate_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Posicionamento normal e ancorado",
        "investigable_statement": "Como a janela escolhe posi??o global ou se ancora a atores, party members, inimigos e eventos em mapa e batalha?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "battle-targeting",
          "map-targeting",
          "screen-positioning"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings-Position",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-reposition"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: isRepositionToActor, isRepositionToEvent, isRepositionToEnemy e m?todos reposition*"
        ],
        "stop_condition": "Prioridades de alvo, pr?-condi??es por cena, coordenadas e fallback s?o caracterizados.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: determina qual alvo usar para fala dieg?tica e quais fallbacks ocorrem quando ele n?o existe ou n?o est? vis?vel.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "ui-positioning-analysis"
        ]
      },
      {
        "candidate_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Ativa??o, depend?ncias e uso no projeto",
        "investigable_statement": "Como o plugin est? ativado, configurado e referenciado pelo projeto Daratrine?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "project-configuration",
          "project-usage"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Requirements",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#plugin-metadata"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: frontend/js/plugins.js para ativa??o, ordem e par?metros",
          "inspect-data: eventos e Common Events que invocam VisuMZ_4_GabWindow"
        ],
        "stop_condition": "A configura??o ativa e os usos existentes s?o localizados, ou sua aus?ncia ? estabelecida no escopo permitido.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: distingue comportamento dispon?vel no arquivo de comportamento realmente habilitado e precedentes j? adotados no jogo.",
        "suggested_capabilities": [
          "rpg-maker-mz-project-inventory",
          "source-research"
        ]
      },
      {
        "candidate_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Persist?ncia entre mudan?as de cena",
        "investigable_statement": "Como gabs atuais e enfileiradas s?o armazenadas e restauradas ao alternar entre mapa, menu e batalha?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "scene-transition",
          "temporary-state"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Changelog-1.04",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-storeGabs"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: hooks de SceneManager, storeGabs, loadGabs e campos tempor?rios em Game_Temp"
        ],
        "stop_condition": "As regras de transfer?ncia entre Scene_Map, Scene_Battle e outras cenas s?o demonstradas.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: evita assumir que a fila ? persistente em toda transi??o e revela riscos de continua??o ou descarte de di?logo.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "scene-lifecycle-analysis"
        ]
      },
      {
        "candidate_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7",
        "origin": "generated",
        "lifecycle_status": "unreviewed",
        "summary": "Temporiza??o, fade e sincroniza??o do interpretador",
        "investigable_statement": "Como dura??o, fade, Wait For Gab Completion, switch final e callbacks JavaScript se encadeiam no ciclo de uma gab?",
        "technologies": [
          "javascript",
          "rpg-maker-mz",
          "visustella-mz-gab-window"
        ],
        "surfaces": [
          "event-wait-mode",
          "gab-timing",
          "hooks"
        ],
        "support_evidence_refs": [
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#Optional Settings",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#System Plugin Commands",
          "frontend/js/plugins/VisuMZ_4_GabWindow.js#runtime-update"
        ],
        "confirm_or_reject_evidence": [
          "inspect-source: startCountdown, updateFadeIn, updateFadeOut, updateWaitMode e finaliza??o da Window_Gab"
        ],
        "stop_condition": "O ciclo desde exibi??o at? conclus?o, incluindo o crit?rio que libera o interpretador, ? demonstrado.",
        "catalog_locator": null,
        "catalog_revision": null,
        "duplicate_relation": "none",
        "disposition": "selected",
        "disposition_reason": "selected:essential-criteria-satisfied | decision-impact: define sincroniza??o segura entre gabs e eventos posteriores, al?m do momento correto para switches e callbacks.",
        "suggested_capabilities": [
          "rpg-maker-mz-plugin-analysis",
          "state-flow-analysis"
        ]
      }
    ],
    "duplicate_analysis": {
      "exact_duplicates": [],
      "near_duplicates": []
    },
    "selected_for_investigation": [
      "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9",
      "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64",
      "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364",
      "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa",
      "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1",
      "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660",
      "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043",
      "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
    ],
    "planned_investigations": [
      {
        "candidate_id": "gen-0ba588d1148e198ee4a223f28afa50ded3086bf94041b842c06b4d5a6b0240a9"
      },
      {
        "candidate_id": "gen-0e74deaf6be0667972d0a7e3d8adfda908945f49f9b1cdf82376dad2ce2f6c64"
      },
      {
        "candidate_id": "gen-1fe85516a1deaa2978e5ce1f5d2f2efd520373651b6f81e04b0701b6318d6364"
      },
      {
        "candidate_id": "gen-363fc63883e605b64861d465e5dda879412ddbf8dbc8dbc92d6d9cd37d7bf2aa"
      },
      {
        "candidate_id": "gen-44624a317fea47c9470a861849a78c03581e0a58f71c5649bb9b3023a0fb91e1"
      },
      {
        "candidate_id": "gen-9770263ccf6d389a468374fb2368bde788338d8dfda969cd880b1061db040660"
      },
      {
        "candidate_id": "gen-db0a90bd203e6687664865ec0481e5aa3f8116eb358b013fdbe9d8b2cd743043"
      },
      {
        "candidate_id": "gen-ee3a0a598c662452687ba107abc0d883a7d29524f99c07e0324fd1fc9f9b98d7"
      }
    ],
    "dispatch_admitted": false,
    "generation_state": {
      "completion_reason": "semantic-saturation",
      "semantic_saturation": true,
      "resume_cursor": null,
      "unexplored_surfaces": [],
      "explored_surfaces": [
        "activation-and-project-usage",
        "commands-and-arguments",
        "configuration-and-overrides",
        "positioning",
        "queue-and-lifecycle",
        "rendering-and-assets",
        "scene-transitions",
        "timing-and-event-synchronization"
      ],
      "final_pass_new_distinct_candidates": 0,
      "saturation_evidence_refs": [
        "frontend/js/plugins/VisuMZ_4_GabWindow.js#final-coverage-pass"
      ]
    },
    "validators": [
      "candidate-disposition-semantics",
      "canonical-digest-reproduction",
      "canonical-root-provenance",
      "catalog-absence-observation",
      "exact-key-schema-v3",
      "inquiry-first-candidate-shape",
      "literal-zero-execution-boundary",
      "request-controls-policy-parity",
      "semantic-saturation-final-pass"
    ],
    "blockers": [],
    "minimum_next_path": "Retornar o n?cleo ao orquestrador para matching e investiga??o somente leitura.",
    "execution_boundary": {
      "dispatch_authorized": false,
      "investigation_handoffs_dispatched": 0,
      "agent_runs_created": 0,
      "handoffs_created": 0,
      "web_research_performed": false,
      "downstream_workflows_invoked": [],
      "catalog_mutation_applied": false
    }
  }
}
```

## Apêndice B — referências rápidas

- Plugin metadata/help/comandos: `frontend/js/plugins/VisuMZ_4_GabWindow.js:1-1524`.
- Implementação: `frontend/js/plugins/VisuMZ_4_GabWindow.js:1526`.
- Entrada ativa: `frontend/js/plugins.js:788-796`.
- Regras de apresentação usadas como procedimento: `rpg-maker-mz-visustella-events-presentation`.
- Nenhum catálogo `.loki/analytic-inference/v2` foi criado ou modificado.

