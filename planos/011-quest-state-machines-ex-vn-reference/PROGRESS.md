# Progresso — Máquinas de Estado EX/VN de Referência

Atualizado em: 2026-08-19
Branch: `feat/quest-state-machines-ex-vn`
Estado: implementação, validação estrutural e Playtest concluídos
Commit: ainda não criado

## Objetivo

Tornar os fluxos `Map022`/`Map046` e `Map045`/`Map049` referências saudáveis
para novas quests, preservando estados esparsos, transições semânticas,
projeção do journal pelo registry e separação entre progresso persistido e
coreografia local.

## Limite autorizado de mapas

Somente mapas descendentes das raízes abaixo podem ser alterados:

- `016 Exploration`: `Map022`, `Map032`, `Map039`, `Map044`, `Map045`.
- `018 Visual Novel`: `Map046`, `Map049`.

Arquivos compartilhados de arquitetura, testes e documentação também foram
autorizados. Nesta implementação, os únicos `MapXXX.json` modificados foram:

- `frontend/data/Map045.json`.
- `frontend/data/Map046.json`.

`Map022`, `Map032`, `Map039`, `Map044` e `Map049` permaneceram sem alterações.
Seus contratos relevantes estão cobertos pelos testes promovidos.

## Decisões implementadas

### Noite da História

- Mantido `START` como `0 → 10`: estado `10` significa que a convocação foi
  concluída e o objetivo de alcançar o lugar está ativo.
- Criado `REACH_SEAT` como `10 → 15`.
- `Map046/E1` executa `REACH_SEAT` depois dos asserts de sessão/estado e antes
  do primeiro diálogo.
- `COMPLETE_VN` agora executa `15 → 20`.
- A entrada `CENA_PRINCIPAL` aceita `[10, 15]`, permitindo validar uma sessão
  salva após a chegada ao lugar.
- Objetivo 1 do PKD: visível em `10`, concluído em `15`.
- Objetivo 2 do PKD: visível em `15`, concluído em `20`.
- Ponteiro da task 1 corrigido de `Map005/E18` para `Map022/E18`.

### Tutorial da funda / A Semifinal

- Criado `LEAVE_EQUIPPED` como `20 → 90`, terminal da submáquina local.
- `Map045/E7` confirma a Funda equipada, executa a transição e só depois
  transfere o jogador para `Map044`.
- Adicionada página intermediária para estado `90`, com nova validação do
  equipamento e retry da transferência. Ela foi posicionada antes das páginas
  de quests posteriores para não sobrepor fluxos futuros de `E7`.
- Removida de `Map045/E20` a chamada direta
  `SQSM.ShowTaskForQuest("aSemifinal", 2)`.
- O registry agora torna a task 2 visível em `20`.
- A conclusão da task 2 permanece externa, representada por
  `completedAt: null`, porque ocorre fora da Casa Forjaprata.
- `completeQuestAtTerminal: false` impede que o terminal local `90` conclua
  toda a quest `aSemifinal`.

### Coreto QuestCore

O plugin foi atualizado para `1.1.0` com duas extensões retrocompatíveis:

- `completedAt: null`: o registry controla a visibilidade do objetivo, mas a
  conclusão pertence a um fluxo externo.
- `completeQuestAtTerminal: false`: o terminal encerra apenas a submáquina e
  não conclui a quest PKD maior.

Quando esses campos não são usados, o comportamento anterior é preservado.

## Arquivos da implementação

### Runtime e configuração

- `frontend/data/CoretoQuests.json`
- `frontend/data/Map045.json`
- `frontend/data/Map046.json`
- `frontend/js/plugins/Coreto_QuestCore.js`
- `frontend/js/plugins.js`
- `package.json`

### Testes permanentes promovidos para frontend

- `frontend/__tests__/quests/quest-state-machines-ex-vn.test.js`
- `frontend/__tests__/plugins/Coreto_QuestCore.test.js`
- Script npm: `npm run test:quest-state-machines`

### Documentação atualizada

- `docs/Quests/1-noite-da-historia/noite-da-historia.NSD.fluxo-cenas.md`
- `docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md`
- `docs/domains/quest-content-designer/README.md`
- `docs/project-conventions/quest-state-machines.md`
- `docs/architecture/quest-state-machine-map-guide.md`

### Writer estruturado

- `builds/apply-quest-state-architecture.mjs`

O writer é uma migração one-shot com hashes e precondições do baseline. Após a
aplicação bem-sucedida, uma segunda execução deve falhar por hash divergente;
isso é intencional e impede reaplicação acidental.

## Validação executada

- JSON parse dos arquivos alterados: passou.
- `node --check` em `Coreto_QuestCore.js`: passou.
- `node --check` em `plugins.js`: passou.
- Envelope estrutural de `plugins.js`: passou, 71 plugins reconhecidos.
- Diff semântico restrito:
  - `Map045`: somente `E7` e `E20`.
  - `Map046`: somente `E1`.
  - Nenhum outro `MapXXX.json` foi alterado.
- `git diff --check`: passou.
- Lint dos dois testes novos: passou.
- Testes focados: 2 suites, 15 testes, todos passaram.
- Execução com cobertura: `Coreto_QuestCore.js` atingiu 70,76% de statements
  no recorte testado.

Comando de retomada:

```bash
npm run test:quest-state-machines -- --coverage=false
```

## Estado da suíte global

`npm test -- --runInBand --coverage=false` não está verde no baseline atual:

- 11 suites passaram.
- 10 suites falharam.
- 523 testes passaram.
- 142 testes falharam.

As falhas são de testes antigos de `Enemies.json`, incluindo expectativas de
separadores, slots vazios, fórmulas de atributos/recompensas e configuração de
bosses. Nenhum arquivo de inimigos foi modificado por este trabalho.

## Gates humanos concluídos

Playtest confirmado pelo usuário em 2026-08-19, sem anomalias observadas:

1. Projeto aceito pelo RPG Maker MZ e fluxo iniciado por New Game.
2. Fluxo `Map022 → Map046 → Map022 → Map045` executado normalmente.
3. Em `Map022`:
   - task 1 visível e incompleta após `START`;
   - task 1 concluída e task 2 visível ao chegar ao lugar;
   - task 2 concluída ao terminar a VN.
4. Save/load dentro de `Map046` após `REACH_SEAT`, no estado `15`, retomado
   normalmente.
5. Em `Map045`:
   - introdução do journal no estado `0`;
   - baú avançando `10 → 20` e revelando a task do estádio;
   - porta bloqueada sem a Funda equipada;
   - saída equipada avançando `20 → 90` antes da transferência;
   - retry da porta em `90` sem repetição de recompensa ou conclusão da quest.

A classificação final do fluxo de referência é `playtest_validated`.

## Mudanças preexistentes preservadas

Os itens abaixo já estavam modificados ou não rastreados antes desta
implementação e não devem ser atribuídos ao plano 011:

- `frontend/save/V[100] - file0.rmmzsave`
- `docs/project-conventions/`
- `planos/010-guia-migracao-nova-arquitetura/`
