# Plano de Migração para TypeScript e Clean Architecture

Este plano orienta a migração de todo o código TypeScript para `frontend/typescript`, mantendo a saída compilada (`.js` e `.d.ts`) em `frontend/js`.

---

## Decisão sobre `.d.ts`

- Emita as declarações geradas pelo `tsc` em `frontend/js` (junto dos `.js`).
  - Motivo: Consumidores do runtime importam de `frontend/js`; manter as declarações no mesmo caminho elimina problemas de resolução de tipos e mapeamento de paths no Jest/TS.
- Declarações manuais/ambientais: Mantenha em `frontend/typescript/types` (não emitidas para `frontend/js`).
  - Configure `typeRoots`/`include` para que o compilador enxergue essas declarações durante o desenvolvimento.
- O diretorio `frontend/js/plugins` não será migrado. Eles continuarão em javascript assim como seus testes em `frontend/__tests__`

Resultado: `.d.ts` gerados pelo build ficam em `frontend/js`; `.d.ts` manuais de apoio ficam em `frontend/typescript/types`.

---

## Estrutura Alvo (Clean Architecture)

```
frontend/
  __tests__/
    typescript/
    plugins/
    DependencyLoading.test.js
    BrowserDTOLoading.test.js
  typescript/
    domain/            # Entidades, VOs, regras de negócio puras
    application/       # Casos de uso, orquestração, portas
    dto/               # DTOs e contratos de dados
  js/
    domain/
    application/
    dto/
    libs/
    plugins/
```

- Testes: Escreva em TypeScript e espelhe a estrutura de `frontend/typescript` dentro de `frontend/__tests__`.

---

## Parâmetros de Build esperados (a serem configurados)

- `tsconfig.json`:
  - `rootDir`: `frontend/typescript`
  - `outDir`: `frontend/js`
  - `declaration`: `true`
  - `declarationDir`: `frontend/js`
  - `baseUrl`: `frontend/typescript`
  - `paths`: aliases (ex.: `@domain/*`, `@application/*`, `@dto/*`, `@libs/*`, `@adapters/*`, `@infra/*`, `@plugins/*`)
  - `typeRoots`: `frontend/typescript/types`, `node_modules/@types`
  - `incremental`: `true`, `tsBuildInfoFile`: `.tsbuildinfo`
- Jest (`jest.config.ts`): garantir `moduleNameMapper` compatível com `paths` e ignorar `frontend/js` como fonte.

---

## Tarefas

1) Crie a estrutura base de diretórios

- Descrição: Crie as pastas-alvo em `frontend/typescript` e a hierarquia espelhada em `frontend/__tests__`.
- Objetivo: Preparar o esqueleto clean architecture e testes.
- Resultado esperado: Diretórios criados conforme a seção “Estrutura Alvo”.

2) Defina e registre os aliases de importação

- Descrição: Padronize aliases (`@domain`, `@application`, `@dto`, `@libs`, `@adapters`, `@infra`, `@plugins`).
- Objetivo: Eliminar imports relativos frágeis e facilitar refactors.
- Resultado esperado: `paths` configurados no `tsconfig.json` e mapeados no `jest.config.ts`.

3) Ajuste o tsconfig para a nova raiz e saída

- Descrição: Configure `rootDir`, `outDir`, `declaration`, `typeRoots`, `incremental`, `baseUrl` e `paths`.
- Objetivo: Compilar TS a partir de `frontend/typescript` gerando `.js/.d.ts` em `frontend/js`.
- Resultado esperado: `tsc --noEmit` passa; `tsc -b` gera saída em `frontend/js`.

4) Atualize o Jest para TypeScript + aliases

- Descrição: No `jest.config.ts`, alinhe `moduleNameMapper` aos aliases e garanta `@swc/jest` para `ts/tsx`.
- Objetivo: Executar testes TS que espelham a estrutura de `frontend/typescript`.
- Resultado esperado: `npm test` roda testes TS e ignora artefatos de `frontend/js`.

5) Amplie o escopo do ESLint/Prettier

- Descrição: Inclua `frontend/typescript/**/*.ts` nas regras e nos scripts de lint/format.
- Objetivo: Manter padrão de código consistente para TS.
- Resultado esperado: `npm run lint` e `npm run format` cobrem o novo diretório.

6) Adicione scripts NPM de build/watch do TS

- Descrição: Atualize `build:types` e `watch:types`.
- Objetivo: Facilitar o ciclo de desenvolvimento e integração.
- Resultado esperado: Scripts funcionais no `package.json` e integráveis ao `npm run start:dev`.

7) Inventarie os arquivos TypeScript existentes

- Descrição: Liste todos os `.ts` atuais (e `.d.ts` manuais) dentro de `frontend`.
- Objetivo: Mapear origem/destino e dependências.
- Resultado esperado: Planilha/arquivo de referência com caminho atual, destino e prioridade de migração.

8) Planeje a ordem de migração por baixo acoplamento

- Descrição: Migre `domain`, `dto`, `application`.
- Objetivo: Reduzir quebras propagadas e facilitar testes incrementais.
- Resultado esperado: Sequência acordada e publicada no registro da tarefa.

9) Migre `domain` para `frontend/typescript/domain`

- Descrição: Mova entidades/VOs e adapte imports.
- Objetivo: Centralizar regras de negócio.
- Resultado esperado: Build verde; testes de `domain` em `__tests__/domain` passando.

11) Migre `dto` para `frontend/typescript/dto`

- Descrição: Mova contratos/DTOs e adapte imports.
- Objetivo: Padronizar interfaces de dados entre camadas.
- Resultado esperado: Build verde; testes de `dto` em `__tests__/dto` passando.

12) Migre `application` para `frontend/typescript/application`

- Descrição: Mova casos de uso (ex.: `MineracaoUseCase`) e adapte imports.
- Objetivo: Isolar orquestração de regras de negócio.
- Resultado esperado: Build verde; testes de `application` em `__tests__/application` passando.

1) Converta e realoque testes para TypeScript

- Descrição: Converta testes JS para TS (quando cobrem módulos TS) e posicione em `frontend/__tests__` espelhando a estrutura.
- Objetivo: Garantir cobertura alinhada à nova organização.
- Resultado esperado: `npm test` com cobertura consistente e sem dependência de arquivos em `frontend/js`. Os testes de plugins frontend/__tests__/plugins continuam em .js testando os arquivos de plugins do diretorio frontend/js/plugins

1) Ajuste imports relativos residuais

- Descrição: Substitua imports relativos frágeis (`../../..`) por aliases definidos no `tsconfig`.
- Objetivo: Estabilidade e legibilidade das dependências entre camadas.
- Resultado esperado: Sem warnings de resolução; import graph consistente.

18) Garanta compatibilidade em runtime (NW.js)

- Descrição: Execute `npm run debug` assegurando que o jogo carrega a partir de `frontend/js` sem importar de `frontend/typescript` diretamente.
- Objetivo: Validar que o artefato de saída é a fonte do runtime.
- Resultado esperado: Aplicação executando; erros de módulo ausentes.

19) Limpe resíduos e proteja diretórios

- Descrição: Adicione/ajuste `.gitignore` para excluir mapas temporários e `.tsbuildinfo` fora do versionamento.
- Objetivo: Repositório limpo e reproduzível.
- Resultado esperado: Somente fontes TS e saídas JS/DTS rastreadas conforme política.

20) Atualize documentação do repositório

- Descrição: Documente a nova arquitetura em `README.md` e relacione com `PLANO_PADRONIZACAO_PLUGINS.md`.
- Objetivo: Onboarding e padronização de novos módulos/plugins.
- Resultado esperado: Seções “Estrutura de Plugins” e “Arquitetura” atualizadas com paths TS.

---

## Critérios de Aceite

- Todos os arquivos `.ts` residem em `frontend/typescript` organizados por camada.
- Saída `.js` e `.d.ts` gerados pelo build em `frontend/js` (com compatibilidade de paths).
- Testes TS em `frontend/__tests__` espelhando a estrutura de `frontend/typescript`.
- `npm test`, `npm run lint` e `tsc --noEmit` passando.
- `npm run debug` executa a aplicação carregando apenas de `frontend/js`.

---

## Observações Finais

- Se algum `.d.ts` precisar ser “distribuído” junto com um módulo consumido externamente pelo runtime, mantenha sua emissão em `frontend/js` (via `declaration: true`).
- Use `paths`/aliases sempre que migrar arquivos para evitar acúmulo de imports relativos.
