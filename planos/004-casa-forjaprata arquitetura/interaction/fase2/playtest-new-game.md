---
title: "Playtest humano - Casa Forjaprata, VN, Funda e journal"
type: loki-human-validation
status: pending
run_id: "loki-run-v2:487ad0333da0041da77affbf548ca6969f27d17638df3d56285e3b7cb6770320"
last_updated: "2026-08-01"
---

# Playtest humano - Casa Forjaprata

Execute em uma copia de teste a partir de **New Game**. Nao use o save
`frontend/save/V[100] - file0.rmmzsave` como evidencia desta validacao.

## 1. Round-trip do editor

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-VN"
  environment: "RPG Maker MZ / Plugin Manager"
  prerequisites: ["working tree atual preservada", "backup ou branch de teste"]
  initial_state: "Map045, Map049 e Plugin Manager ainda nao foram salvos pelo editor apos o patch"
  action: "Abrir e reabrir Map045/Map049; conferir E7/E11/E20, Map049 E1, spawn (8,6), trigger Action Button, bau (19,14) e plugin Coreto_SQS_menu_patch; salvar e reabrir"
  expected_observable_result: "Editor aceita dados sem reparar/remover comandos; mapa VN e paginas permanecem intactos"
  success_signals: ["sem erro de carregamento", "Map045 continua EX", "Map049 continua VN", "bau fica na dispensa e acessivel quando liberado"]
  failure_signals: ["editor altera estrutura inesperadamente", "spawn/bau fora do layout", "plugin ou comandos ausentes"]
  cleanup_or_restore: "Se o editor gerar metadados, preservar o diff e reexecutar os validadores antes de aceitar"
  automation_limitation: "Parse estatico nao prova round-trip, passabilidade ou layout visual"
```

## 2. Entrada EX -> VN -> EX

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-VN"
  environment: "Playtest New Game no RPG Maker MZ"
  prerequisites: ["passo 1 aprovado"]
  initial_state: "Nova partida na rota Map022 -> Map045"
  action: "Chegar a Map045 e assistir a cena completa sem pular"
  expected_observable_result: "Thorin perde a Funda antes do controle; ocorre uma unica VN; retorno ao mesmo EX sem loop"
  success_signals: ["busts/pictures/audio corretos", "retorno com input/menu/save restaurados", "nenhuma picture ou sessao residual"]
  failure_signals: ["loop de autorun", "tela preta permanente", "controle travado", "Funda ainda equipada"]
  cleanup_or_restore: "Encerrar o Playtest se houver loop e registrar o ponto exato"
  automation_limitation: "Lifecycle perceptivel, timing e restauracao audiovisual exigem runtime"
```

## 3. Journal bloqueado antes da primeira saida

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-JOURNAL"
  environment: "Playtest New Game em Map045"
  prerequisites: ["passo 2 aprovado", "ainda nao tentou sair"]
  initial_state: "V111=0, S50 OFF"
  action: "Pressionar J e abrir o menu; tentar interagir com o bau antes de tocar a saida"
  expected_observable_result: "Journal/menu de missoes nao abre e o bau nao e interativo"
  success_signals: ["J nao abre journal", "menu nao mostra Missoes", "nenhuma Funda concedida"]
  failure_signals: ["qualquer acesso ao journal", "bau visivel/interativo", "Weapon 1 recebida"]
  cleanup_or_restore: "not-needed; continuar no mesmo Playtest"
  automation_limitation: "Atalho, menu e reachability sao superficies perceptiveis"
```

## 4. Primeira saida e one-shot

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-FLOW"
  environment: "Playtest New Game em Map045"
  prerequisites: ["V111=0", "sem Funda"]
  initial_state: "Diante da saida"
  action: "Tentar sair; fechar o journal; tentar sair novamente duas vezes"
  expected_observable_result: "Primeira tentativa bloqueia, revela 'Encontre a Funda na dispensa' e abre journal uma vez; repeticoes mostram somente lembrete"
  success_signals: ["zero transferencia", "uma abertura automatica", "quest tutorial ativa e separada de aSemifinal"]
  failure_signals: ["journal reabre", "tutorial duplica", "jogador sai", "objetivo de equipar aparece cedo"]
  cleanup_or_restore: "not-needed; continuar no mesmo Playtest"
  automation_limitation: "Selecao, notificacoes e one-shot visual exigem runtime"
```

## 5. Bau e objetivo de equipar

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-FLOW"
  environment: "Playtest New Game em Map045"
  prerequisites: ["primeira saida ja bloqueada", "V111=10"]
  initial_state: "Bau fechado na dispensa"
  action: "Abrir o bau; interagir repetidamente; sair/reentrar no mapa se a rota permitir"
  expected_observable_result: "Uma Funda e concedida, bau permanece aberto e objetivo muda para equipar em Thorin"
  success_signals: ["quantidade total cresce uma vez", "V111=20", "objetivo 1 completo e objetivo 2 visivel"]
  failure_signals: ["Funda duplicada", "bau fecha novamente", "objetivo incorreto"]
  cleanup_or_restore: "not-needed; continuar no mesmo Playtest"
  automation_limitation: "Animacao, persistencia visivel e notificacao exigem runtime"
```

## 6. Gate exato de equipamento

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-FLOW"
  environment: "Playtest New Game em Map045"
  prerequisites: ["V111=20", "Funda obtida"]
  initial_state: "Funda no inventario, nao equipada em Thorin"
  action: "Tentar sair sem equipar; depois equipar em outro ator e tentar; por fim equipar em Thorin e sair"
  expected_observable_result: "As duas primeiras rotas bloqueiam; somente Thorin equipado conclui a tutorial e transfere para Map007 (5,22)"
  success_signals: ["lembrete de equipar", "V111 fica 20 nas falhas", "V111 vira 90 antes da transferencia valida"]
  failure_signals: ["inventario ou outro ator satisfaz gate", "saida sem transicao", "transferencia duplicada"]
  cleanup_or_restore: "not-needed; continuar a rota normal"
  automation_limitation: "Equipamento real e transferencia precisam ser observados no jogo"
```

## 7. Regressao de aSemifinal e journal final

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#AC-F2-REGRESSION"
  environment: "Playtest apos sair de Map045"
  prerequisites: ["tutorial concluida em V111=90"]
  initial_state: "Map007 apos a saida valida"
  action: "Abrir o journal e continuar o primeiro objetivo de aSemifinal"
  expected_observable_result: "Tutorial aparece concluida; aSemifinal permanece separada, ativa e com conteudo anterior"
  success_signals: ["nenhuma quest duplicada", "objetivos de aSemifinal intactos", "journal continua acessivel"]
  failure_signals: ["aSemifinal ausente/alterada", "tutorial assume seus estados", "journal volta a bloquear"]
  cleanup_or_restore: "not-needed"
  automation_limitation: "Apresentacao PKD e continuidade narrativa exigem runtime"
```

## 8. Save/load nos checkpoints

```yaml
manual_step:
  evidence_or_acceptance_criterion_ref: "task-2.1.md#Human-Loop"
  environment: "Playtest New Game com saves de teste descartaveis"
  prerequisites: ["usar slots de teste, nao o save preservado do usuario"]
  initial_state: "Repetir em V111=0, 10, 20 e 90"
  action: "Salvar, fechar, carregar e repetir a acao principal do estado"
  expected_observable_result: "Estado, journal one-shot, bau, quantidade, equipamento, VN e transferencia retomam sem duplicar ou travar"
  success_signals: ["estado correto apos load", "nenhum regrant/replay indevido", "rota continua"]
  failure_signals: ["loop VN", "journal reabre", "bau duplica", "estado/equipamento diverge"]
  cleanup_or_restore: "Excluir somente os saves de teste criados para este Playtest"
  automation_limitation: "A implementacao e New Game only; persistencia real nao e provada por checks estaticos"
```

## Registro do resultado

Registre data, build/commit, cada passo como `passed` ou `failed`, screenshots ou
video dos sinais relevantes e qualquer alteracao gerada pelo editor. Somente
depois disso o estado pode sair de `pending-human-validation`.
