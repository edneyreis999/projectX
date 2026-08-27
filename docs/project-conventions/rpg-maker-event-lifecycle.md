---
title: "ADR — Lifecycle de páginas e intérpretes de eventos RPG Maker MZ"
type: architecture-decision-record
status: accepted
date: "2026-08-27"
decision_scope: "Seleção de páginas, ownership de intérpretes, refresh, retomada e cleanup de eventos"
---

# ADR — Lifecycle de páginas e intérpretes de eventos RPG Maker MZ

## Status

Aceita em 2026-08-27.

## Contexto

Uma lista de comandos válida não prova que todos os seus comandos serão
executados. O RPG Maker MZ reavalia páginas quando switches, variáveis,
self-switches, party ou outras condições pedem refresh. Transferências e
trocas de scene introduzem fronteiras adicionais.

Uma página pode, portanto, deixar de ser elegível entre dois frames. O efeito
depende do owner da execução:

- eventos `Parallel` mantêm um `Game_Interpreter` próprio na página ativa;
- `Action Button`, `Player Touch`, `Event Touch` e `Autorun` executam pelo
  intérprete principal do mapa;
- Plugin Commands recebem o intérprete chamador em `this`;
- a troca de página recria ou remove o intérprete próprio de uma página
  `Parallel`.

Falhas de produção mostraram que validações orientadas apenas à presença de
`Begin`/`Finish`, waits ou comandos de imagem não detectam cleanup
inalcançável, owner incorreto nem estado visual perdido após reconstrução.

## Decisão

### 1. Página é resolvida por identidade semântica

Testes, writers e revisões devem reproduzir as regras do engine:

1. avaliar todas as condições ativas da página;
2. tratar condição de variável como `valor atual >= valor configurado`;
3. percorrer as páginas da última para a primeira;
4. selecionar a primeira página elegível encontrada;
5. usar `-1` quando nenhuma página for elegível.

Índice de array não constitui identidade. Um writer pode usar posição somente
quando também valida a forma completa esperada. Fora desse caso, deve localizar
a página por condições, trigger, marker versionado e função observável.

### 2. Toda sequência declara seu owner

O contrato de uma sequência deve registrar:

- mapa e evento proprietários;
- trigger da página;
- intérprete esperado: principal do mapa ou próprio do `Parallel`;
- estado inicial necessário;
- estado terminal observável;
- fronteiras capazes de pedir refresh ou trocar mapa/scene.

Plugin Commands dependentes do chamador devem usar o `Game_Interpreter`
recebido por `PluginManager.callCommand`. O intérprete principal do mapa pode
ser fallback de uma API pública, mas não substitui o chamador de um evento
`Parallel`.

Handlers que dependem de `this` usam função normal. Arrow function não possui
o contrato de ownership necessário.

### 3. Mutação e espera formam uma fronteira de lifecycle

Quando uma sequência altera uma condição da própria página, o projeto deve
assumir que um refresh poderá selecionar outra página antes do próximo frame.

Em página `Parallel`, comandos ainda pendentes depois dessa fronteira são
considerados inalcançáveis até que um teste de lifecycle demonstre o
contrário. A mera presença do cleanup no JSON não é evidência suficiente.

O padrão preferencial quando a detecção invalida sua própria condição é:

```text
Parallel detector
  ├─ observa a condição
  ├─ compromete a transição ou latch
  └─ termina sem waits, câmera, lock ou cleanup pendente

Autorun estável
  ├─ começa em uma condição que permanece elegível durante a apresentação
  ├─ possui o lock e a coreografia
  └─ executa cleanup antes de alterar sua condição terminal
```

### 4. Fronteiras externas exigem contrato de retomada

Transferência, EX→VN→EX, batalha, reload e mudanças de party podem reconstruir
ou atualizar superfícies transitórias. Cada fronteira relevante deve declarar:

| Superfície | Pergunta de retomada |
| --- | --- |
| Sprite e pattern | Qual imagem deve estar ativa depois do último refresh? |
| Posição e direção | O estado vem do mapa, da sessão ou precisa ser reaplicado? |
| Priority e through | A página selecionada restaura colisão e prioridade corretas? |
| Câmera e zoom | Quem restaura o enquadramento padrão? |
| Áudio | A origem, a VN ou a batalha possui a política de restauração? |
| UI e Gabs | Há fila, janela ou flag residual? |
| Party | A alteração pede refresh de páginas ou seguidores? |
| Lock | O mesmo owner ainda consegue liberar o fluxo adquirido? |

Reidratação deve ocorrer depois do último refresh potencial e antes do primeiro
consumo visual ou interativo do estado.

### 5. O harness testa frames e terminais

A cobertura compartilhada deve incluir:

- seleção da última página elegível;
- condições desligadas e ligadas nos estados relevantes;
- `Action Button`, `Autorun` e `Parallel` quando o plugin depende do owner;
- mutação em um frame e nova seleção no frame seguinte;
- descarte do intérprete `Parallel` após troca de página;
- comandos que permaneceriam pendentes depois do descarte;
- estado visual e lock depois do último refresh;
- retorno de VN, batalha ou transferência quando a feature atravessa essas
  fronteiras.

O harness compartilhado modela semântica do engine e invariantes de lifecycle.
Testes específicos continuam responsáveis pelo contrato singular de cada
quest. Playtest continua obrigatório para ritmo, clareza, câmera, áudio,
continuidade percebida e conforto.

## Adoção

- O núcleo reutilizável de seleção e refresh fica em
  `frontend/test-support/rpg-maker-event-lifecycle.js`.
- Novos testes de eventos devem reutilizar esse núcleo em vez de implementar
  outra versão simplificada de elegibilidade.
- Migrações existentes adotam a regra quando forem modificadas ou quando uma
  regressão demonstrar risco equivalente; esta ADR não autoriza reescrita em
  massa.

## Fora de escopo

Esta ADR não define conteúdo narrativo, staging final, IDs, mapas ou efeitos.
Também não simula todo o loop gráfico do RPG Maker nem substitui editor,
playtest ou testes reais dos plugins.

## Fontes consultadas e conflitos promovidos

- [`rmmz_objects.js`](../../frontend/js/rmmz_objects.js): implementação local
  de `findProperPageIndex`, `meetsConditions`, `refresh`, `setupPageSettings`,
  `updateParallel` e `Game_Interpreter.update`.
- [`rmmz_managers.js`](../../frontend/js/rmmz_managers.js): binding do
  intérprete chamador em `PluginManager.callCommand`.
- [ADR de máquinas de estado canônicas](./quest-state-machines.md): separa
  progresso persistente de coreografia local.
- [Guia de criação de mapas EX/VN](../architecture/quest-state-machine-map-guide.md):
  documenta limiares, ordem das páginas e fronteiras EX/VN.
- [`POST-MORTEM.md`](../../planos/012-add-harness/POST-MORTEM.md): registra os
  incidentes que demonstraram descarte de intérprete, precedência de página e
  perda de estado transitório.
