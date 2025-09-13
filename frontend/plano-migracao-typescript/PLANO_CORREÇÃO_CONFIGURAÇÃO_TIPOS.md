# Plano de Migração TypeScript — Correção de Configuração e Tipos

Objetivo: eliminar os erros do TypeScript no editor/CI

- Erro 1: "No inputs were found in config file 'tsconfig.json'".
- Erro 2: "Cannot find name 'MineracaoRequest'" em `frontend/js/domain/MinaKravensDomain.ts` e `frontend/js/application/MineracaoUseCase.ts`.

Premissas

- Projeto está rodando 100% e testes passando.
- Não alterar comportamento de runtime, apenas configuração e tipagens.

Tarefas

1) Corrigir caminhos do `tsconfig.json`

- Substitua o `include` para apontar para o código real: use `"frontend/js/**/*.ts"` e também `"frontend/js/**/*.d.ts"`.
- Substitua o `exclude` absoluto por caminhos relativos: `"node_modules"`, `"dist"`, `"coverage"`.
- Garanta que o arquivo raiz (`tsconfig.json`) seja o usado pelo editor. Se houver outros tsconfigs, mantenha-os, mas o raiz deve incluir os mesmos caminhos de fonte.
- Critério de aceite: ao abrir o projeto, o TS não mostra mais "No inputs were found..." no `tsconfig.json`.

1) Tornar as tipagens da Mineração globais e não emissíveis

- Renomeie `frontend/js/dto/MineracaoRequestDTO.ts` para `frontend/js/dto/MineracaoRequestDTO.d.ts`.
- Renomeie `frontend/js/dto/MineracaoResponseDTO.ts` para `frontend/js/dto/MineracaoResponseDTO.d.ts`.
- Mantenha as declarações no escopo global (sem `export`/`import`). Ex.:
  - `type TipoMineracao = 'Kraven' | 'Pedra'` (global)
  - `interface MineracaoRequest { ... }` (global)
  - `interface MineracaoResponse { ... }` (global)
- Critério de aceite: o editor não exibe mais "Cannot find name 'MineracaoRequest'"/`MineracaoResponse` nos arquivos de domínio e aplicação.

1) Validar no editor e via CLI

- No VS Code: execute “TypeScript: Restart TS server” para forçar reindexação.
- CLI (local): rode `npx tsc --noEmit -p tsconfig.json` e confirme que não há erros de input nem de nomes de tipos.
- Critério de aceite: compilação `--noEmit` finaliza sem erros.

1) Conferir lint e testes

- Rode `npm run lint:check` e confirme zero erros/avisos.
- Rode `npm test` e confirme a suíte ok.
- Critério de aceite: lint e testes passam exatamente como antes.

1) Documentar padrão para novos DTOs globais

- Padronize DTOs de tipos compartilhados como `.d.ts` em `frontend/js/dto` (sem `export`/`import`).
- Evite `export {}` nesses arquivos `.d.ts` para não transformá-los em módulos; queremos que as declarações sejam globais.
- Critério de aceite: README do projeto cita o padrão; novos tipos seguem o mesmo formato.

Checklist de validação final

- `tsconfig.json` aponta para `frontend/js/**/*.ts` e `frontend/js/**/*.d.ts`.
- Arquivos de DTO renomeados para `.d.ts` e sem `export`/`import`.
- Editor sem erros de input nem de nomes de tipos.
- `npm run lint:check` e `npm test` continuam verdes.

Notas rápidas

- Já existe `tsconfig.eslint.json` incluindo `frontend/js/**/*.ts`; mantenha-o como está.
- `tsconfig.domain-dto.json` pode seguir existindo para escopos específicos, mas o `tsconfig.json` raiz deve refletir os caminhos reais do projeto para evitar o erro de inputs no editor.
