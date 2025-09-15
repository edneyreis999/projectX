# Plano de Migração: Unificar tsconfig e normalizar DTOs

Objetivo: reduzir complexidade de configuração e melhorar DX consolidando todos os tsconfig em um único arquivo, simplificando scripts npm e padronizando os DTOs como arquivos `.ts`.

## Tarefas

1) Remover tsconfigs paralelos e centralizar no tsconfig único

- Remover: `tsconfig.application.json`, `tsconfig.domain-dto.json`, `tsconfig.eslint.json`.
- Unificar opções necessárias no `tsconfig.json` com:
  - target ES2020, module esnext, moduleDetection auto, strict true.
  - esModuleInterop e allowSyntheticDefaultImports habilitados.
  - rootDir/outDir: `frontend/js` (emitir JS/DTs no próprio diretório do app).
  - declaration true, noEmitOnError true, incremental true, skipLibCheck true.
  - include: `frontend/js/{domain,application}/**/*.ts` e `frontend/js/dto/**/*.{ts,d.ts}`.
  - exclude: `node_modules`, `dist`, `coverage`, `frontend/js/plugins/**`.

2) Atualizar ESLint para apontar ao único tsconfig

- No `.eslintrc.cjs`, alterar `parserOptions.project` para usar `./tsconfig.json`.
- Confirmar que overrides de TS e JS continuam válidos.

3) Simplificar scripts npm de tipos

- Remover scripts: `build:app-types` e `watch:app-types`.
- Atualizar `build:types` e `watch:types` para usar `tsconfig.json` unificado.
- Atualizar `debug:ts` para executar apenas `build:types` antes do `debug`.

4) Normalizar DTOs de mineração como `.ts`

- Renomear: `frontend/js/dto/MineracaoRequestDTO.d.ts` -> `MineracaoRequestDTO.ts`.
- Renomear: `frontend/js/dto/MineracaoResponseDTO.d.ts` -> `MineracaoResponseDTO.ts`.
- Manter as assinaturas de tipos; não criar classe se não houver necessidade de runtime.
- Verificar imports existentes (ex.: `application/` e `domain/`) — manter `import type { ... } from '../dto/MineracaoRequestDTO'` sem extensão.

5) Validar compilação e uso no runtime

- Rodar `npm run build:types` e garantir que `application` e `domain` gerem JS e `.d.ts` sem erros.
- Confirmar que os plugins importam ESM via `import('../domain/MinaKravensDomain.js')` e `import('../application/MineracaoUseCase.js')` normalmente.
- Executar `npm test` e verificar cobertura.

6) Ajustes de DX (qualidade de vida)

- Adicionar script de verificação de tipos sem emissão: `typecheck`: `tsc -p tsconfig.json --noEmit` (opcional para CI/PRs).
- Adicionar `watch:types` ao fluxo de desenvolvimento quando estiver com o jogo aberto: rodar em paralelo ao `npm run debug` (opcional usar `concurrently`).
- Considerar ampliar lint para TS de `application/` e `domain/` via um script dedicado `lint:ts` (sem alterar regra atual focada em `plugins/`).
- Padronizar ESM nas camadas `domain/`, `application/` e `dto/` (regra já reforçada no ESLint). Evitar CommonJS nesses diretórios.

7) Documentar e comunicar

- Atualizar `README.md` (seção “Estrutura de Plugins”) explicando que existe um único `tsconfig.json` e os scripts `build:types`/`watch:types`.
- Anexar evidências de testes (prints do `npm test` e `npm run build:types`) no PR.

## Critérios de Aceite

- Existe somente um `tsconfig.json` na raiz e ESLint aponta para ele.
- Scripts `build:types` e `watch:types` funcionam para `application/`, `domain/` e `dto/`.
- DTOs de Mineração estão em `.ts` e referenciados sem extensão.
- Testes rodam e passam via `npm test`.

## Plano de Rollback

- Restaurar os arquivos `tsconfig.*.json` antigos a partir do histórico git.
- Reverter alterações em `package.json` e `.eslintrc.cjs`.
- Recolocar DTOs como `.d.ts` (se necessário), mantendo os imports.
