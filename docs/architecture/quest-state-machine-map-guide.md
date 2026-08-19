---
title: "Criação de mapas EX/VN com máquinas de estado de quest"
type: architecture-guide
status: active
created: "2026-08-19"
last_updated: "2026-08-19"
scope: "Novos mapas que participam de quests persistentes"
not_scope: "Migração automática de mapas legados e autoria do conteúdo narrativo"
---

# Criação de mapas EX/VN com máquinas de estado de quest

## Propósito

Este guia descreve como criar um mapa que participe da arquitetura de quests
do Daratrine sem distribuir progresso entre variáveis, switches, journal e
transferências independentes.

A decisão que governa o guia está registrada na
[ADR de máquinas de estado canônicas](../project-conventions/quest-state-machines.md).
A nomenclatura e a separação de responsabilidades entre mapas estão na
[ADR de roteamento EX/VN](../project-conventions/scene-routing-ex-vn.md).

## Modelo mental

```text
                            projeta objetivos
CoretoQuests.json + V[n] ──────────────────────► Journal PKD
          ▲
          │ QuestTransition
          │
      evento no mapa EX ── EnterVisualNovel ──► evento no mapa VN
             ▲                                      │
             └──── retorno automático à origem ◄────┘ FinishVisualNovel
```

- A **quest** possui o estado persistente.
- O mapa **observa** o estado e dispara transições.
- `Coreto_QuestCore` valida e compromete as transições.
- `Coreto_QuestVN` possui a sessão temporária entre EX e VN.
- `Coreto_Cutscene` possui o lock temporário de uma cutscene física em EX.
- O PKD apresenta no journal uma projeção do estado canônico.

Um mapa não recebe uma máquina de estados só por existir. Um mapa sem progresso
persistente pode usar eventos normais. Vários mapas podem consumir a mesma
máquina, e um mapa pode participar de mais de uma quest.

## 1. Decida o que merece estado persistente

Antes de abrir o editor, escreva os marcos da quest em uma tabela curta:

| Estado | Significado persistente | Transição | Evento proprietário | Efeito no journal |
| --- | --- | --- | --- | --- |
| `0` | Não iniciada | — | — | Nenhum |
| `10` | Objetivo aceito | `START` | `EX_.../E...` | Revela objetivo 1 |
| `20` | Local alcançado | `REACH_DESTINATION` | `EX_.../E...` | Conclui objetivo 1 |
| `30` | Cena concluída | `COMPLETE_SCENE` | `VN_.../E...` | Revela objetivo 2 |
| `90` | Quest encerrada | `FINISH` | `EX_.../E...` | Conclui quest |

Crie um estado quando o fato:

- precisa sobreviver a save/load;
- muda o journal;
- altera conteúdo ou gates em mais de um evento/mapa;
- precisa impedir repetição de recompensa ou conclusão;
- representa um compromisso narrativo ou de gameplay.

Não crie estado canônico para:

- entrar ou sair de um mapa sem consequência persistente;
- fala, pose, câmera, espera, fade ou animação;
- passo intermediário que só existe durante a execução do evento;
- baú ou interação local que pode ser resolvida com Self Switch;
- input lock ou retorno de VN já controlado pelos plugins Coreto.

### Escolha da superfície correta

| Caso | Use |
| --- | --- |
| Etapa ordenada entre mapas/saves | Estado canônico da quest |
| Flag independente, como rota escolhida | Switch/variável própria e nomeada |
| Resultado local de evento | Self Switch |
| Coreografia e lock em EX | `Coreto_Cutscene` |
| Sessão e retorno de VN | `Coreto_QuestVN` |

Evite usar vários switches para representar “etapa 1”, “etapa 2” e “etapa 3”.
Evite também transformar toda flag de rota em estado sequencial: se duas
opções são incomparáveis e depois reconvergem, mantenha a rota em uma flag
ortogonal e o estágio principal na máquina canônica.

## 2. Reserve nomes e IDs antes de criar dados

Defina:

- `questKey`: identificador estável, normalmente `lower-kebab-case`;
- nome da variável: `v_q<NomeDaQuest>_stage`;
- `transitionId`: verbo semântico em `UPPER_SNAKE_CASE`;
- `entryKey` de VN: identificador em `UPPER_SNAKE_CASE`, sem hífen;
- `questId` e IDs de objetivos existentes no PKD;
- variável livre em `System.json`;
- IDs de mapas e eventos que serão criados.

Novos IDs de objetos em `frontend/data` devem ser confirmados antes da
ocupação. Não reutilize slot apenas porque parece vazio e não renumere objetos
existentes para abrir espaço.

## 3. Registre a máquina em `CoretoQuests.json`

O exemplo abaixo é pseudocódigo; os placeholders devem ser resolvidos e o
arquivo final deve continuar sendo JSON válido:

```jsonc
{
  "nova-quest": {
    "stageVariableId": "<ID_RESERVADO>",
    "initialState": 0,
    "terminalStates": [90],
    "pkd": {
      "questId": "novaQuest",
      "objectives": [
        { "id": 1, "knownFrom": 10, "completedAt": 20 },
        { "id": 2, "knownFrom": 20, "completedAt": 90 }
      ]
    },
    "transitions": {
      "START": {
        "from": [0],
        "to": 10,
        "requirements": [],
        "effects": []
      },
      "REACH_DESTINATION": {
        "from": [10],
        "to": 20,
        "requirements": [],
        "effects": []
      },
      "FINISH": {
        "from": [20],
        "to": 90,
        "requirements": [],
        "effects": [],
        "terminal": true
      }
    }
  }
}
```

Regras do registry:

- todos os estados usados por objetivos e extensões devem aparecer no grafo;
- `from` declara exatamente os estados aceitos pela transição;
- efeitos disponíveis atualmente são de item;
- transição com efeito exige `receiptPolicy: "once"`;
- efeito negativo exige requisito de item suficiente;
- `terminal: true` deve apontar para um valor de `terminalStates`;
- `completeQuestAtTerminal` é `true` por padrão;
- use `completeQuestAtTerminal: false` quando a máquina for apenas uma
  submáquina de uma quest PKD maior;
- use `completedAt: null` somente quando outro fluxo possui explicitamente a
  conclusão do objetivo.

O estado deve avançar de forma monotônica no fluxo normal, pois a projeção PKD
revela e conclui objetivos por limiar. Não use rollback do estado para reabrir
objetivos.

## 4. Crie e classifique o mapa

### Mapa de exploração

- Nome: `EX_<Nome>`.
- Parent recomendado: grupo `Exploration` em `MapInfos.json`.
- Note do mapa: `<CoretoMapType:EX>`.
- Responsabilidade: navegação, interação ambiental, gates, transfers e staging
  físico.

### Mapa de visual novel

- Nome: `VN_<Nome>`.
- Parent recomendado: grupo `Visual Novel` em `MapInfos.json`.
- Note do mapa: `<CoretoMapType:VN>`.
- Responsabilidade: diálogo crítico, escolhas e apresentação narrativa.

Não use apenas o prefixo como prova de configuração: nome, Note, registry e
eventos devem concordar. Não entre diretamente em um mapa VN por `Transfer
Player`; a entrada deve ocorrer por `Coreto_QuestVN`.

## 5. Monte o evento de quest no mapa EX

Use nomes de evento que revelem papel e ownership, por exemplo:

```text
EX — Nova Quest: convocação
EX — Nova Quest: entrada da cena
EX — Nova Quest: saída terminal
```

### Condições de página

No RPG Maker MZ, a condição de variável de uma página significa
`valor atual >= valor configurado`. Ela não representa igualdade. Além disso,
o engine procura páginas válidas da última para a primeira.

Portanto:

- uma página configurada para estado `10` também é elegível em `20` e `90`;
- páginas de estados posteriores devem ser posicionadas depois quando precisam
  sobrepor as anteriores;
- use `AssertQuestState` em fronteiras críticas que exigem igualdade;
- valide o comportamento em todos os estados posteriores, não apenas no estado
  em que a página nasce.

### Transição simples

No marco comprometido, use o Plugin Command:

```text
Coreto_QuestCore → Executar transição de quest
questKey: nova-quest
transitionId: START
```

Não substitua esse comando por `Control Variables` na variável canônica ou por
`$gameVariables.setValue(...)` em Script.

### Cutscene física em EX

Quando o evento precisa bloquear controle durante staging físico:

```text
Coreto_Cutscene → Iniciar cutscene
Coreto_QuestCore → Validar estado exato
... movimento, câmera e apresentação ...
Coreto_QuestCore → Executar transição de quest, se houver marco comprometido
Coreto_Cutscene → Encerrar cutscene
```

`BeginCutscene` e `FinishCutscene` devem ser executados pelo mesmo evento no
mesmo mapa EX. Não inicie uma VN enquanto a cutscene EX ainda possui o
FlowCoordinator: encerre a cutscene primeiro.

### Roteamento EX → VN

O evento de entrada segue este contrato:

```text
Coreto_Cutscene → Iniciar cutscene                 (se necessário)
Coreto_QuestCore → Validar estado exato
... staging físico ...
Coreto_Cutscene → Encerrar cutscene                (se foi iniciada)
Coreto_QuestVN → Entrar na Visual Novel
Exit Event Processing
```

Passe apenas `questKey` e `entryKey`. Mapa, spawn e `eventId` pertencem ao
registry. O plugin captura a origem, solicita autosave antes da entrada,
transfere para VN e restaura a origem ao finalizar.

## 6. Registre e monte o evento VN

Adicione `extensions.questVN` à definição da quest:

```jsonc
"extensions": {
  "questVN": {
    "mapId": "<ID_DO_MAPA_VN>",
    "spawn": {
      "x": 8,
      "y": 6,
      "direction": 2,
      "fadeType": 0,
      "audioPolicy": "restore-origin"
    },
    "entries": {
      "CENA_PRINCIPAL": {
        "eventId": "<ID_DO_EVENTO_VN>",
        "allowedStates": [20, 25]
      }
    }
  }
}
```

O evento indicado pelo registry deve:

- existir no mapa VN;
- usar trigger **Action Button**;
- possuir uma página executável;
- ser iniciado pelo roteador, não por Autorun/Parallel;
- começar com validação de sessão e estado antes do conteúdo narrativo.

Sequência recomendada:

```text
Coreto_QuestVN → Validar sessão da Visual Novel
  questKey: nova-quest
  entryKey: CENA_PRINCIPAL

Coreto_QuestCore → Validar estado exato
  questKey: nova-quest
  expectedState: 20

Coreto_QuestCore → Executar transição de quest      (20 → 25, se chegada for marco)
... diálogo, escolhas e apresentação ...
Coreto_QuestCore → Executar transição de quest      (25 → 30, conclusão da cena)
Coreto_QuestVN → Encerrar a Visual Novel
Exit Event Processing
```

Se a chegada à VN executa `20 → 25` antes do primeiro diálogo, inclua `20` e
`25` em `allowedStates`. O primeiro permite a entrada normal; o segundo permite
que o plugin valide um save retomado depois da chegada. Não adicione estados à
lista sem uma retomada válida correspondente.

Finalize pictures, busts e efeitos próprios da cena antes de
`FinishVisualNovel`. Não use `Transfer Player` para retornar ao EX: o plugin
retorna ao mapa, posição e direção capturados, além de restaurar áudio e
contexto visual.

Um mesmo mapa VN pode conter eventos de entrada de quests diferentes, como o
mapa de referência `Map049`. Cada `entryKey` ainda precisa apontar para um
evento inequívoco e validar sua própria sessão.

## 7. Faça transfers terminais de EX de forma recuperável

Quando uma transição de quest precede a saída física do mapa:

```text
... requisito confirmado ...
Coreto_QuestCore → Executar transição de quest
Transfer Player
Exit Event Processing
```

A transição deve acontecer antes da transferência. Como o estado já foi
comprometido, crie uma página posterior para o estado de destino quando houver
chance de o jogador permanecer ou retornar ao evento. Essa página deve repetir
somente a validação necessária e a transferência; não deve repetir recompensa,
projeção PKD ou a transição anterior.

O padrão de referência está em `Map045/E7`: `LEAVE_EQUIPPED` compromete
`20 → 90`, transfere e possui uma página de recuperação em `90`.

## 8. Projete o journal pelo registry

Para cada objetivo PKD, declare:

```json
{ "id": 1, "knownFrom": 10, "completedAt": 20 }
```

O `Coreto_QuestCore` adiciona a quest, revela tarefas, conclui tarefas e
conclui a quest terminal de forma idempotente.

Nos eventos dessa máquina:

- não chame diretamente `AddQuest`, `ShowTaskForQuest`,
  `CompleteTaskForQuest` ou `CompleteQuest` para objetivos gerenciados;
- ações puramente visuais, como selecionar a quest ativa ou abrir o journal,
  podem permanecer quando fazem parte da experiência;
- `QuestSync` sincroniza a projeção atual, mas não substitui uma transição e
  não deve ser usado para avançar progresso.

## 9. Planeje retry, reentrada e save/load

Para cada marco, responda antes de considerar o mapa pronto:

- O que acontece se o evento for acionado duas vezes?
- Qual página fica ativa nos estados seguintes?
- Existe efeito ou recompensa que poderia repetir?
- O jogador pode salvar depois da transição e antes da transferência?
- Uma VN aceita o estado anterior e o estado já comprometido necessários à
  retomada?
- O terminal local conclui a quest PKD correta ou apenas uma submáquina?
- A conclusão externa de um objetivo com `completedAt: null` possui owner
  documentado?

Use Self Switch para consumo local de um evento. Use recibo `once` para efeito
de inventário pertencente à transição. Não tente implementar retry voltando a
variável canônica para trás.

## 10. Validação proporcional ao risco

### Validação estática obrigatória

- parse de todo JSON alterado;
- variável e nome confirmados em `System.json`;
- grafo alcançável desde `initialState`;
- estados de `knownFrom`, `completedAt` e `allowedStates` presentes no grafo;
- nenhuma escrita direta na variável canônica;
- páginas corretas para o limiar `>=` e prioridade da última página válida;
- plugin commands com `questKey`, `transitionId` e `entryKey` corretos;
- transição antes de transferência terminal;
- `FinishVisualNovel` seguido de término explícito do evento;
- diff restrito aos arquivos, mapas, eventos e páginas autorizados.

### Estratégia de testes automatizados

Não crie automaticamente um arquivo de teste para cada quest.

- Use testes genéricos para schema, grafo e plugins.
- Acrescente um caso à suíte compartilhada quando o fluxo segue o padrão.
- Crie teste específico apenas para branch incomum, submáquina, efeito
  idempotente, integração externa ou regressão conhecida.
- Teste marcos e ordem relativa; não replique toda a cutscene em asserts de
  JSON.

Os fluxos de referência atuais estão em
[`quest-state-machines-ex-vn.test.js`](../../frontend/__tests__/quests/quest-state-machines-ex-vn.test.js).

### Playtest obrigatório

Comece por **New Game** e valide:

1. início da quest e primeira projeção no journal;
2. cada transição no evento proprietário;
3. bloqueios e feedback de requisitos não atendidos;
4. entrada EX → VN e início de exatamente um evento;
5. save/load no estado intermediário relevante da VN;
6. conclusão e retorno VN → EX com posição, direção, áudio e contexto corretos;
7. transferência terminal e página de recuperação;
8. reentrada sem repetição de recompensa ou conclusão;
9. objetivos visíveis/concluídos nos estados esperados.

JSON válido e testes Jest não validam timing, câmera, áudio, input, sensação da
transferência, legibilidade da cena ou restauração perceptível.

## Checklist de conclusão

- [ ] A quest possui uma única variável canônica nomeada.
- [ ] Estados e transições foram documentados antes dos eventos.
- [ ] Apenas marcos persistentes viraram estados.
- [ ] O registry é a autoridade da máquina e da projeção PKD.
- [ ] O mapa usa prefixo e `<CoretoMapType:...>` coerentes.
- [ ] Nenhum evento escreve diretamente na variável canônica.
- [ ] Condições de página foram revisadas como limiares `>=`.
- [ ] Cutscene EX começa e termina no mesmo evento.
- [ ] VN entra por `EnterVisualNovel` e retorna por `FinishVisualNovel`.
- [ ] Save/load e estados de retomada da VN foram exercitados.
- [ ] Transfers terminais possuem término e recuperação seguros.
- [ ] Testes protegem contratos, sem congelar conteúdo narrativo inteiro.
- [ ] O Playtest começou por New Game e cobriu reentrada/retry.

## Referências concretas

- `Map022/E18` + `Map046/E1`: ida EX → VN, marco intermediário e retorno.
- `Map045/E7`: transição antes de transferência e página terminal de retry.
- `Map045/E20`: efeito local seguido de transição e projeção do journal.
- `Map049/E1` e `E2`: entradas distintas compartilhando um mapa VN.
- [`CoretoQuests.json`](../../frontend/data/CoretoQuests.json)
- [`Coreto_QuestCore.js`](../../frontend/js/plugins/Coreto_QuestCore.js)
- [`Coreto_QuestVN.js`](../../frontend/js/plugins/Coreto_QuestVN.js)
- [`Coreto_Cutscene.js`](../../frontend/js/plugins/Coreto_Cutscene.js)
