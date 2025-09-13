# Plano de Migração para TypeScript — Camada Application

Objetivo: migrar `frontend/js/application` para TypeScript mantendo compatibilidade com Browser (NW.js) e Node (Jest), sem quebrar o carregamento por `<script>` e garantindo todos os testes passando.

## Preparar configuração (sem romper Domain/DTO)

- Criar `tsconfig.application.json` estendendo o existente com side-by-side emit para `frontend/js`.
- Definir em `compilerOptions`: `strict: true`, `esModuleInterop: true`, `allowJs: true`, `noEmitOnError: true`, `rootDir: "frontend/js"`, `outDir: "frontend/js"`, `module: "commonjs"`, `target: "ES2020"`.
- Incluir: `frontend/js/application/**/*.ts`.

## Migrar arquivo por arquivo (começar pelo use case ativo)

- Converter `frontend/js/application/MineracaoUseCase.js` → `MineracaoUseCase.ts`.
- Remover `export`/`import` do TS para evitar emissão CommonJS em browser.
- Expor a classe no final do arquivo:
  - Node: `if (typeof module !== 'undefined' && module.exports) module.exports = MineracaoUseCase;`
  - Browser: `else (globalThis as any).MineracaoUseCase = MineracaoUseCase;`
- Substituir acesso a `window` por `globalThis` quando checar/globar dependências.
- Manter fallback de DTOs/Domain como hoje: usar `require('../dto/...')` no Node e `globalThis.MineracaoRequestDTO/ResponseDTO` no Browser.

## Garantir compatibilidade de runtime

- Preservar a ordem de carregamento no plugin (DTOs → Domain → Application) sem alterar `plugins.js` nem `index.html`.
- Compilar TS antes de iniciar o jogo: manter `watch:types`  ativo.
- Evitar `instanceof` que cruze ambientes; quando necessário, validar estruturalmente ou garantir que Node usa `require` da mesma referência.

## Rodar e ajustar testes

- Executar `npm run build:types` e `npm test`.
- Se surgir `ReferenceError: exports is not defined`, remover qualquer `export`/`export default` restante do `.ts` e reemitir.
- Se surgir `window is not defined`, usar `globalThis` no código TS e mocks/jsdom nos testes conforme necessário.
- Garantir que testes de `MineracaoUseCase` continuam importando/instanciando via CommonJS/Globals como antes.

## Cobertura, watch e incremental

- Se o watch travar sem emitir `.js`, apagar `tsconfig.application.tsbuildinfo`
- Confirmar que `.d.ts` gerados em `frontend/js/application` estão ignorados pelo Git (padrão já cobre `frontend/js/**/*.d.ts`).

## Critérios de aceite

- `npm test` passa com 0 falhas (todas as suites verdes).
- `npm run debug:ts` inicia o jogo e o plugin carrega a camada Application sem erros de módulo.
- Comportamento do Use Case inalterado (logs, variáveis e fluxo).

## Ordem sugerida

- Migrar `MineracaoUseCase.js` primeiro.
- Validar testes e runtime.
- Migrar demais arquivos de `frontend/js/application` (se houver) repetindo o padrão.

## Riscos e mitigação

- Emissão de CommonJS no browser: evitar qualquer `export`/`import` em arquivos carregados via `<script>`.
- Dependência de `window`: preferir `globalThis` para compatibilidade Node/Browser.
- Divergência de referências entre Node e Browser: manter `require` no Node para garantir `instanceof` quando usado.
