# Plano — Corrigir "exports is not defined" (NW.js) e Testes Quebrados

Execute as tasks na ordem para estabilizar o runtime e a suíte de testes após a migração (DTOs como tipos, validação no Domain).

## Task 1 — Auditar CommonJS injetado

- Rodar: `rg -n "Object\.defineProperty\(exports|exports\." frontend/js`
- Verificar se há ocorrências em `frontend/js/application/*.js` ou `frontend/js/domain/*.js`.
- Registrar arquivos listados (prováveis culpados do erro no NW.js).

## Task 2 — Neutralizar emissão de módulo (Application/Domain)

- Remover `import`/`export` (inclui `import type`) de `frontend/js/application/**/*.ts` e `frontend/js/domain/**/*.ts`.
- Manter tipos via `frontend/js/dto/types.d.ts` (sem `export`).
- Garantir IIFE + attach UMD simples no final:
  - Node: `if (typeof module !== 'undefined' && module.exports) module.exports = Classe;`
  - Browser: `else globalThis.Classe = Classe;`
- Ajustar tsconfig específicos:
  - Em `tsconfig.application.json` e `tsconfig.domain-dto.json`: definir `"esModuleInterop": false`.
  - (Opcional) adicionar `"moduleDetection": "legacy"` se persistir detecção como módulo.

## Task 3 — Rebuild limpo

- Apagar caches incrementais: `tsconfig.application.tsbuildinfo`, `tsconfig.domain-dto.tsbuildinfo` (se existirem).
- Recompilar: `npm run build:types && npm run build:app-types`.
- Revalidar: `rg -n "Object\.defineProperty\(exports|exports\." frontend/js` deve retornar vazio para Application/Domain.

## Task 4 — Alinhar o plugin à nova arquitetura

- Em `frontend/js/plugins/Coreto_Quest_Mina_Kravens.js`, remover carregamento dos scripts de DTO (`./js/dto/*.js`).
- Conferir ordem de dependências restante: Domain → Use Case.

## Task 5 — Atualizar testes

- Substituir `instanceof MineracaoResponseDTO` por checagens estruturais: `expect(response && typeof response).toBe('object')` + asserts em propriedades e helpers (`isKraven`, `getStats`, etc.).
- Atualizar mensagens de erro esperadas para validações do Domain (ex.: `rachaduraJaAtivada deve ser um boolean`, `Request inválida: esperado objeto MineracaoRequest`).
- Ajustar tests de carregamento no Browser/Plugin: remover expectativas de `loadScript('./js/dto/*.js')` quando o plugin não carrega mais DTOs.
- Rodar `npm test` até 0 falhas.

## Task 6 — Validar no NW.js

- Executar `npm run debug:ts`.
- Confirmar ausência de `ReferenceError: exports is not defined` (avisos de `app.nw` em modo unpacked podem ser ignorados).

## Task 7 — Documentar no TASKS.md

- Registrar lições:
  - Evitar `import/export` em scripts carregados via `<script>`.
  - Usar `.d.ts` para tipos globais.
  - IIFE + attach global/Node garantem compat sem bundler.
  - Testes: sem `instanceof` de DTOs; mensagens de validação sob responsabilidade do Domain.
