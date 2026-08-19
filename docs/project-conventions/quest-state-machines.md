---
title: "ADR — Máquina de estados canônica para quests"
type: architecture-decision-record
status: accepted
date: "2026-08-19"
decision_scope: "Progresso persistente, transições, journal, mapas EX/VN e estratégia de validação de quests"
---

# ADR — Máquina de estados canônica para quests

## Status

Aceita em 2026-08-19.

## Contexto

O progresso de uma quest atravessa mapas, páginas de eventos, cutscenes,
sessões de visual novel, transferências, save/load e o journal do
`PKD_SimpleQuestSystem`. Quando cada mapa altera diretamente variáveis,
switches e tarefas do journal, a mesma progressão passa a ter várias fontes de
verdade.

Esse modelo distribuído torna comuns os seguintes problemas:

- combinações de switches que representam estados impossíveis ou ambíguos;
- objetivos visíveis ou concluídos fora de sincronia com a história;
- recompensas repetidas ao reentrar em um evento;
- páginas antigas que voltam a assumir o controle depois de uma transferência;
- save/load retomando uma cena em um estado que o mapa não reconhece;
- alterações locais difíceis de revisar porque o contrato da quest está
  espalhado em vários `MapXXX.json`.

A separação entre mapas de exploração (`EX`) e visual novel (`VN`) adiciona
outra fronteira. A ida, a retomada dentro da VN e a volta ao mapa de origem
precisam concordar sobre o mesmo estado persistente sem transformar a
coreografia temporária da cena em progresso da quest.

Também é necessário evitar o extremo oposto: criar um estado para cada mapa,
fala ou animação e um arquivo de teste para cada quest simples. Isso aumentaria
o custo de manutenção sem proteger mais comportamento relevante.

## Decisão

### 1. A quest, não o mapa, possui o estado canônico

Cada quest nova — ou submáquina com ciclo de vida próprio — deve possuir uma
variável inteira nomeada em `frontend/data/System.json`. Essa variável é a
única autoridade persistente para a etapa da máquina.

A definição da máquina pertence a `frontend/data/CoretoQuests.json` e contém:

- `stageVariableId`;
- `initialState` e `terminalStates`;
- transições nomeadas em `transitions`;
- projeção dos objetivos em `pkd`;
- integração opcional com mapas VN em `extensions.questVN`.

Os mapas são adaptadores dessa definição. Eles podem consultar o estado por
condições de página e `AssertQuestState`, mas só podem avançá-lo por uma
transição nomeada de `Coreto_QuestCore`.

Não se deve escrever diretamente na variável canônica por `Control Variables`
ou script. Também não se deve usar chamadas diretas de mostrar/concluir tarefas
PKD quando essas tarefas já são projetadas pelo registry.

### 2. Estados representam marcos semânticos persistentes

Um novo estado só se justifica quando o fato precisa sobreviver a save/load ou
ser observado por mais de uma superfície, por exemplo:

- objetivo aceito;
- local relevante alcançado;
- item ou informação obtida;
- escolha comprometida;
- batalha concluída;
- cena narrativa concluída;
- recompensa entregue;
- submáquina ou quest encerrada.

Entrada em mapa, fala, movimento, pose, câmera, espera e animação não geram
estado canônico por si sós. Esses detalhes pertencem à coreografia local.

Para máquinas novas, os estados devem ser esparsos e normalmente crescentes:

```text
0  = não iniciada
10 = primeiro marco comprometido
20 = próximo marco
30 = próximo marco
90 = terminal, quando adequado ao tamanho da máquina
```

Valores intermediários como `15` e `25` podem ser inseridos sem renumerar
todos os consumidores. Como a projeção do journal usa limiares
(`knownFrom`/`completedAt`), rollback da variável canônica não é o fluxo
normal. Retry deve permanecer no mesmo estado ou usar estado local. Uma
progressão realmente reversível exige decisão específica de arquitetura.

Máquinas legadas com estados densos, como `1`, `2`, `3`, não são migradas em
massa apenas para atender à convenção.

### 3. Estado persistente e coreografia local permanecem separados

| Necessidade | Autoridade adequada |
| --- | --- |
| Etapa ordenada da quest entre mapas e saves | Variável canônica + `Coreto_QuestCore` |
| Booleano persistente independente da ordem da quest | Switch nomeado |
| Resultado local e único de um evento | Self Switch |
| Movimento, câmera, input lock e apresentação em EX | Evento + `Coreto_Cutscene` |
| Sessão, origem, retorno e restauração de uma VN | `Coreto_QuestVN` |
| Visibilidade e conclusão dos objetivos | Projeção PKD declarada no registry |

Switches independentes continuam válidos para fatos ortogonais, mas não devem
substituir uma sequência ordenada de etapas. Uma escolha de rota que permanece
relevante depois da reconvergência pode usar uma flag própria, enquanto a
variável canônica continua representando o avanço compartilhado.

### 4. Transições são semânticas e falham de forma explícita

Eventos executam `QuestTransition` com `questKey` e `transitionId`. A transição
declara os estados de origem aceitos e o estado de destino. Uma chamada fora do
estado esperado é erro, em vez de corrigir silenciosamente a variável.

Quando uma transição possui efeitos de inventário, ela deve usar a política de
recibo `once` já exigida pelo `Coreto_QuestCore`. Isso impede repetição do
efeito após reentrada. Uma transferência terminal deve ocorrer depois da
transição comprometida e possuir um caminho de recuperação que não execute a
mesma transição novamente.

### 5. O journal é projeção, não fonte de progresso

`PKD_SimpleQuestSystem` continua responsável pela interface do journal, mas o
estado canônico determina o que deve aparecer nele:

- `knownFrom` revela o objetivo ao alcançar o estado;
- `completedAt` conclui o objetivo ao alcançar o estado;
- `completedAt: null` declara que a conclusão pertence a outro fluxo;
- `completeQuestAtTerminal: false` encerra uma submáquina sem concluir a quest
  PKD maior.

A projeção é idempotente e avança junto com o estado. Abrir ou selecionar o
journal é uma ação de interface e pode permanecer no evento quando necessário;
mostrar ou concluir manualmente objetivos gerenciados pelo registry não pode.

### 6. Mapas EX e VN usam o mesmo contrato

Mapas novos seguem a
[convenção de roteamento EX/VN](./scene-routing-ex-vn.md).

- O mapa `EX_` possui exploração, interação ambiental e staging físico.
- O mapa `VN_` possui diálogo crítico, escolhas e apresentação narrativa.
- `Coreto_QuestVN` resolve destino e retorno por `questKey`/`entryKey`; o mapa
  VN não deve hardcodar uma transferência de volta ao EX.
- A entrada VN valida sessão e estado antes do conteúdo.
- Se a chegada à VN for um marco persistente, a transição ocorre antes do
  primeiro diálogo. Os estados aceitos pela entrada também devem permitir a
  retomada de um save feito depois desse marco.
- O encerramento executa a transição semântica da cena, `FinishVisualNovel` e
  termina o processamento do evento.

### 7. A estratégia de testes protege contratos, não conteúdo inteiro

Não é obrigatório criar um arquivo de teste por quest.

A cobertura deve ser dividida em:

1. testes genéricos do `Coreto_QuestCore` para schema, transições, efeitos e
   projeção PKD;
2. teste genérico do ciclo do `Coreto_QuestVN` para entrada, sessão, retorno e
   restauração;
3. validação compartilhada dos grafos registrados;
4. testes de integração específicos somente para quests de referência, fluxos
   incomuns ou riscos que já causaram regressão;
5. Playtest para diálogos, cutscenes, câmera, áudio, input, transferência
   perceptível, journal e save/load.

Testes estáticos podem verificar marcos estruturais, como “transição antes da
transferência” ou “conclusão antes de `FinishVisualNovel`”. Eles não devem
congelar todas as falas, animações ou comandos de uma cutscene, pois isso torna
refinamentos narrativos artificialmente caros.

## Consequências

### Benefícios

- uma fonte de verdade para progresso, journal e gates de mapas;
- saves mais determinísticos e retomadas explicitamente projetadas;
- transições inválidas detectadas cedo;
- inserção de marcos intermediários sem renumeração em massa;
- separação clara entre progresso durável e apresentação local;
- testes menores e com melhor relação entre custo e proteção.

### Custos e restrições

- uma nova quest exige modelar o grafo antes de montar páginas de eventos;
- IDs de variáveis e integrações PKD precisam ser reservados conscientemente;
- mudanças em `CoretoQuests.json`, mapas e Plugin Manager exigem validação
  estrutural e Playtest;
- estados numéricos dependem de documentação legível e transições nomeadas;
- fluxos reversíveis, branches não ordenáveis ou projeções que precisem
  desfazer objetivos não cabem automaticamente neste modelo.

## Alternativas rejeitadas

### Um conjunto de switches por etapa

Rejeitado porque permite combinações contraditórias e espalha a ordem da quest
entre páginas de eventos.

### Escrita direta da variável e chamadas PKD em cada mapa

Rejeitada porque cria múltiplas autoridades e dificulta idempotência,
diagnóstico e save/load.

### Um estado para cada mapa ou beat de cutscene

Rejeitado por granularidade excessiva. Mapas e beats são apresentação; somente
marcos persistentes pertencem ao grafo.

### Um arquivo de teste para cada quest

Rejeitado como regra geral. Quests simples devem ser cobertas por validadores
compartilhados; arquivos específicos ficam reservados para contratos realmente
singulares.

### Testar a cutscene inteira por comparação de JSON

Rejeitado por duplicar a implementação e quebrar em refinamentos de conteúdo
sem mudança do contrato arquitetural.

## Adoção e compatibilidade

- A convenção é obrigatória para quests e mapas novos que participem de
  progressão persistente.
- Migrações de quests legadas são deliberadas e isoladas; esta ADR não autoriza
  reescrita em massa.
- `Coreto_QuestCore` e `Coreto_QuestVN` suportam apenas New Game para saves
  anteriores à arquitetura Coreto.
- O guia operacional está em
  [Criação de mapas EX/VN com máquinas de estado de quest](../architecture/quest-state-machine-map-guide.md).

## Fora de escopo

Esta ADR não define conteúdo narrativo, IDs concretos, destinos de mapas,
payloads VisuStella, layout de cutscene ou balanceamento de recompensas. Também
não autoriza alterações diretas em `frontend/data/*.json`.

## Evidências promovidas

- [`frontend/data/CoretoQuests.json`](../../frontend/data/CoretoQuests.json)
- [`frontend/js/plugins/Coreto_QuestCore.js`](../../frontend/js/plugins/Coreto_QuestCore.js)
- [`frontend/js/plugins/Coreto_QuestVN.js`](../../frontend/js/plugins/Coreto_QuestVN.js)
- [`frontend/js/plugins/Coreto_Cutscene.js`](../../frontend/js/plugins/Coreto_Cutscene.js)
- [`frontend/__tests__/quests/quest-state-machines-ex-vn.test.js`](../../frontend/__tests__/quests/quest-state-machines-ex-vn.test.js)
- [`planos/011-quest-state-machines-ex-vn-reference/PROGRESS.md`](../../planos/011-quest-state-machines-ex-vn-reference/PROGRESS.md)
