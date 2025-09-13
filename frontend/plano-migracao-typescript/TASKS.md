# TASKS — Migração para TypeScript (Domain/DTO) e Correção NW.js

## Referências

- Plano de Migração: `frontend/plano-migracao-typescript/PLANO_MIGRACAO_TS.md`
- Correção de Exports no NW.js: `frontend/plano-migracao-typescript/PLANO_CORRECAO_EXPORTS_NW.md`

## Resumo do que já foi feito

- Configuração TS dedicada (side-by-side) para `frontend/js/{domain,dto}`.
- Migração dos DTOs e Domain para `.ts`, com build emitindo `.js` no mesmo local.
- Ajustes de compatibilidade Node/Browser via `globalThis` + `module.exports` para evitar `exports is not defined` no NW.js.
- Testes executados e passando via Jest + SWC; build TS integrado ao fluxo de debug.

## Plano de Migração — Tasks Executadas

- [x] Adicionar `tsconfig.domain-dto.json` com `outDir`/`rootDir` em `frontend/js` e `allowJs`.
- [x] Adicionar scripts npm: `build:types`, `watch:types`, `debug:ts`.
- [x] Migrar `frontend/js/dto/MineracaoRequestDTO.js` → `.ts` com tipagem e validações.
- [x] Migrar `frontend/js/dto/MineracaoResponseDTO.js` → `.ts` com tipos discriminados e helpers.
- [x] Migrar `frontend/js/domain/MinaKravensDomain.js` → `.ts` com tipagem e compatibilidade de DTOs.
- [x] Emitir `.js` e `.d.ts` no mesmo diretório, sem alterar `plugins.js`/`index.html`.
- [x] Ajustar `.gitignore` para ignorar `.d.ts` e `*.tsbuildinfo` relevantes.
- [x] Rodar `npm test` e validar comportamento/coverage local.

### Lições aprendidas — Migração

- Preferir `globalThis` para expor classes no Browser e evitar conflitos no TS com `window/module`.
- Evitar `export`/`export default` em arquivos carregados via `<script>`; emitir CommonJS no browser causa erro.
- Manter ordem de carregamento no plugin: DTOs → Domain → UseCase.
- `instanceof` entre ambientes pode falhar se referências divergirem; manter `require` em Node ajuda.
- Se o watch/compilação parar de emitir `.js`, apagar `tsconfig.domain-dto.tsbuildinfo` (ou executar `tsc -p tsconfig.domain-dto.json --force`) destrava o rebuild incremental.

## Correção NW.js — Tasks Executadas

- [x] Remover `export`/`export default` dos `.ts` de Domain/DTO para não gerar `exports` no browser.
- [x] Expor classes via `(globalThis as any).<Nome>` e usar `module.exports` somente quando disponível.
- [x] Recompilar (`build:types`) e validar `npm run debug` sem erro de `exports`.

### Lições aprendidas — NW.js

- NW.js (unpacked) executa scripts como globais; qualquer emissão de módulo `exports` quebra.
- `globalThis` funciona em Node e Browser, reduzindo condicionais e declarações extras.
- Avisos de `app.nw` em modo unpacked são esperados e inofensivos.

## Como rodar em desenvolvimento (estado atual)

- Build TS único: `npm run build:types` (gera `.js` em `frontend/js/{dto,domain}`).
- Watch TS: `npm run watch:types` (manter em um terminal durante o dev).
- Debug do jogo: `npm run debug` (ou `npm run debug:ts` para garantir build antes).
- Testes: `npm test` (transforma `.ts` com `@swc/jest`).

Observações:

- Se o coverage falhar por permissão no sandbox, rode localmente onde o processo pode gravar a pasta `coverage/`.
- Mantenha a ordem de carregamento no plugin e valide logs no console do NW (porta `9222`).
