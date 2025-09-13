# Diagnóstico — "exports is not defined" no NW.js e falhas de testes

Este documento registra as causas prováveis dos erros após a reestruturação de DTOs, Application e Domain, além de orientar correções seguras para manter o runtime (NW.js) e a suíte de testes.

## Sintoma 1 — "ReferenceError: exports is not defined" ao rodar `npm run debug:ts`

- Evidência rápida (verifique localmente):
  - `rg -n "Object\.defineProperty\(exports|exports\." frontend/js`
  - Se aparecer em `frontend/js/application/*.js` ou `frontend/js/domain/*.js`, o arquivo foi emitido como módulo CommonJS.

- Causa raiz:
  - TypeScript marcou os arquivos como "módulo" (module file) e injetou o trecho `Object.defineProperty(exports, "__esModule", { value: true })`.
  - Isso acontece se o arquivo contém qualquer `import`/`export` (inclui `import type ...`), ou se há uma estrutura que força tratamento como módulo. No ambiente do NW.js, os scripts são carregados via `<script>` sem bundler; `exports` não existe, logo o erro ocorre.

- Como resolver (aplique todos os itens):
  1) Eliminar `import`/`export` (inclusive `import type`) de arquivos carregados via `<script>`:
     - `frontend/js/application/**/*.ts`
     - `frontend/js/domain/**/*.ts`
  2) Usar tipos por ambient declaration:
     - Manter `frontend/js/dto/types.d.ts` com `interface MineracaoRequest/MineracaoResponse` e `type TipoMineracao`, sem `export`.
     - Referenciar os tipos diretamente (sem `import type`) nos `.ts` de Domain e Application.
  3) Confirmar que os arquivos têm IIFE + attach global/Node:
     - Padrão no final: `if (typeof module !== 'undefined' && module.exports) module.exports = Classe; else globalThis.Classe = Classe;`
  4) Rebuild limpo:
     - Apagar `tsconfig.domain-dto.tsbuildinfo` e `tsconfig.application.tsbuildinfo` se existirem.
     - Rodar `npm run build:types && npm run build:app-types`.
  5) Verificar novamente a saída:
     - `rg -n "Object\.defineProperty\(exports" frontend/js` deve retornar vazio para Application/Domain.
  6) Alternativa (se ainda precisar):
     - Ajustar `tsconfig` para `module: "none"` nos tsconfig específicos de Application/Domain. Use com cautela e somente se não houver `import`/`export` nesses arquivos.

## Sintoma 2 — Testes quebrados após migração

- Possíveis quebras observadas:
  - Testes que exigiam `instanceof MineracaoResponseDTO` ou `isValid()` no retorno do Domain.
  - Testes que esperavam erro de `instanceof` em `executarMineracao` (ex.: "Request deve ser uma instância de MineracaoRequestDTO").
  - Testes que esperavam carregamento dos scripts DTO no plugin/Browser.

- Causas:
  - DTOs agora são interfaces/tipos; Domain retorna objetos literais com métodos auxiliares anexados (compat) e valida internamente inputs/outputs.
  - Mensagens de erro migraram para dentro do Domain (ex.: `rachaduraJaAtivada deve ser um boolean`).
  - Plugin foi alterado para não carregar mais os `.js` de DTO.

- Como resolver os testes:
  1) Substituir `instanceof` por validação estrutural:
     - Onde havia `expect(response).toBeInstanceOf(MineracaoResponseDTO)`, use `expect(response && typeof response).toBe('object')` e asserções nas propriedades e helpers (`isKraven`, `getStats`, etc.).
  2) Atualizar asserções de erro:
     - Onde havia `"Request deve ser uma instância de MineracaoRequestDTO"`, alinhar para as novas mensagens do Domain (ex.: `rachaduraJaAtivada deve ser um boolean`, `Request inválida: esperado objeto MineracaoRequest`).
  3) Ajustar testes de carregamento no Browser/Plugin:
     - Se o plugin não carrega mais DTOs, remova as expectativas de `loadScript('./js/dto/*.js')` e valide apenas Domain/UseCase.
     - Opcional: manter testes de compat se ainda houver scripts legados.
  4) Rodar `npm test` e iterar até 0 falhas.

## Checklist de diagnóstico (rápido)
- [ ] `rg -n "Object\.defineProperty\(exports" frontend/js` não retorna Application/Domain.
- [ ] `frontend/js/application/*.ts` e `frontend/js/domain/*.ts` não têm `import`/`export` (nem `import type`).
- [ ] `frontend/js/dto/types.d.ts` está incluído no `tsconfig.*.json` e não tem `export`.
- [ ] `npm run build:types && npm run build:app-types` executa sem erros.
- [ ] `npm test` com 0 falhas.
- [ ] `npm run debug:ts` sem `exports is not defined` (os avisos de `app.nw` em modo unpacked podem ser ignorados).

## Observações
- Em ambientes sem bundler (RPG Maker MZ/NW.js), evitar import/export em arquivos injetados via `<script>`. Preferir IIFE + attach global e declarações de tipos por `.d.ts`.
- Se no futuro adotarmos bundler (Rollup/Esbuild), poderemos migrar para ESM/UMD e remover esses cuidados.

