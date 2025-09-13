# Plano de Correção dos Testes (Jest)

Objetivo: fazer `npm test` passar com 0 falhas. Siga as etapas em ordem.

## Etapa 1 — Higienizar build e garantir JS emitido

- Apague o incremental se o watch travar: remova `tsconfig.domain-dto.tsbuildinfo`.
- Execute `npm run build:types`
- Verifique a presença de `frontend/js/dto/*.js` e `frontend/js/domain/*.js` antes de rodar os testes.

## Etapa 2 — Normalizar ambiente de testes

- Garanta Node para testes de lógica pura (default atual do Jest).
- Para testes que acessam DOM/`document`/`createElement`, coloque `/* @jest-environment jsdom */` no topo do arquivo OU use os helpers em `frontend/__tests__/plugins/utils/test-utils.helper.cjs` para mockar `window`/`document`.
- Evite dependências reais do browser no domínio/DTO; use `globalThis` no código (já aplicado) e mocks no teste.

## Etapa 3 — Padronizar mensagens e asserções

- Alinhe mensagens de validação dos DTOs com os testes (aspas, idioma, chaves).
- Caso o teste espere outra string, ajuste o teste para a nova mensagem padronizada ou mantenha o código compatível (preferencial).

## Etapa 4 — Determinismo e assincronia

- Mocke aleatoriedade: espie `_gerarNumeroAleatorio()` nos testes do domínio para resultados previsíveis.
- Trate `Promise.all`/`loadScript` nos testes de carregamento de dependências com `await` adequado.
- Use `jest.useFakeTimers()`/`jest.runAllTimers()` apenas quando necessário e com `await` dos passos assíncronos.

## Etapa 5 — Cobertura e diretórios

- Atualize `jest.config.ts` para `coverageDirectory: "./coverage"` (evita erros de permissão fora do workspace).
- Se necessário, desative cobertura temporariamente com `--coverage=false` em um script `test:dev` para acelerar iterações locais.

## Etapa 6 — Rodar, revisar e repetir

- Rode `npm test` e identifique suites com falhas.
- Corrija por categoria:
  - Ambiente ("window is not defined"): aplique jsdom ou mocks.
  - Mensagens divergentes: padronize mensagens ou asserções.
  - Import/exports: verifique se os `.js` de Domain/DTO existem e são os emitidos pelo TS.
- Repita as etapas até zerar as falhas.

## Saída esperada

- `Test Suites: X passed, 0 failed` e `Tests: Y passed, 0 failed`.
- Cobertura gerada com sucesso em `./coverage` (local).

## Observações

- Mantenha `npm run watch:types` ativo durante o desenvolvimento para evitar quedas por falta de `.js`.
- Em caso de inconsistência estranha de build, apague `tsconfig.domain-dto.tsbuildinfo`.
