---
title: "Playtest humano - Casa Forjaprata / Funda"
type: human-validation
status: passed
run_id: "loki-run-v2:31a737d65818670493f908bc1c02fee632db92f1c5a7da1797070f66f740cdc1"
execution_id: "loki-execution-v2:8080a0bab8fd06c0312af234f47e731f4c2fb9f613f6b539c9bed9337aaec433"
phase: fase1
created: "2026-08-03"
completed: "2026-08-03"
---

# Playtest humano

## Pré-condição

Use **New Game**. Saves anteriores não fazem parte deste escopo. Antes do teste,
abra o projeto no RPG Maker MZ, visite o Plugin Manager e o Map045, salve,
reabra e confirme que não houve erro de serialização.

## Roteiro principal

1. Avance pela abertura/VN até Thorin acordar na Casa Forjaprata.
2. Antes de tocar a saída, confirme que o baú da Funda está visível.
3. Interaja repetidamente com o baú. Resultado esperado: nenhuma mensagem,
   animação, som, item, journal ou mudança perceptível.
4. Interaja com a saída pela primeira vez. Resultado esperado: Thorin não sai;
   a quest `A Semifinal` aparece/torna-se ativa, a task `Pegue a Funda no baú.`
   é a única nova task inicial e o journal abre uma vez.
5. Interaja novamente com a saída sem pegar a Funda. Resultado esperado: Thorin
   continua dentro, recebe apenas o lembrete para pegar a Funda e o journal não
   é reaberto.
6. Abra o baú. Resultado esperado: exatamente uma Funda é concedida, a task 1 é
   concluída, a task 2 (`Corra até o estádio...`) aparece e o baú fica aberto.
7. Interaja novamente com o baú aberto. Resultado esperado: nenhuma nova Funda,
   mensagem ou progressão.
8. Sem equipar a Funda, use a saída. Resultado esperado: transferência direta
   para o mapa externo; nenhuma exigência de equipamento.

## Reentrada e persistência

1. Retorne à Casa Forjaprata depois da obtenção, quando a rota do jogo permitir.
   O baú deve continuar aberto e inerte; a Funda não pode duplicar.
2. Em V111=10, salve antes de abrir o baú, carregue e repita a coleta. Deve haver
   um único grant e progressão para V111=20.
3. Em V111=20, salve/carregue dentro da casa. A saída deve continuar liberada
   sem equipar a arma.

## Regressões

- A VN Map049 inicia e termina normalmente, sem reentrada indevida.
- `A Semifinal` continua com suas oito tasks na ordem esperada e não é marcada
  como concluída ao pegar a Funda.
- As tasks posteriores da semifinal continuam avançando na ordem 2–8.
- Não existe missão visível separada `tutorialFundaForjaprata`.
- Nenhum erro aparece no console (F8) durante porta, baú, journal ou save/load.

## Registro

Marque cada item como `pass` ou `fail` e anexe, para qualquer falha: passo,
save usado, screenshot/vídeo curto e mensagem completa do console. Antes da
execução deste roteiro, o status da feature era `pending-human-validation`.

## Resultado

- Status: `pass`.
- Registro humano: em 2026-08-03, o usuário confirmou que o playtest funcionou
  corretamente.
- Cobertura aceita: pré-condição de editor, roteiro principal, reentrada,
  persistência e regressões deste documento.
- Falhas observadas: nenhuma relatada.
- Evidência complementar: declaração humana registrada na conversa ativa e
  persistida neste artefato para retomada baseada em disco.
