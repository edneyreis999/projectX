# Plano de Migração para Imports/Exports Explícitos (TS)

Objetivo: substituir `module.exports`/IIFE por `export`/`import` de forma incremental (DTO → Domain → Application), mantendo compilação e runtime inalterados a cada passo e com smoke tests entre etapas.

Escopo imediato: código em `frontend/js/{dto,domain,application}`. Plugins em `frontend/js/plugins` permanecem estáveis até a etapa de adaptação/remoção dos shims globais.

Principais diretrizes:

- Não quebrar Jest nem o jogo (NW.js) em nenhum passo.
- Migrar primeiro tipos/DTO (impacto zero em runtime), depois Domain e por último Application.
- Usar shims temporários para compatibilidade global até migrarmos os consumidores (plugins/tests).
- Ajustar `compilerOptions` de forma conservadora no início; finalizar ajustes quando todo o código estiver em ESM.

---

## 0) Preparação e salvaguardas

- [ ] Congele baseline: rode `npm test` e guarde o resultado de cobertura atual.
- [ ] Rode checagem de tipos dos projetos por camada:
  - `npx tsc -p tsconfig.domain-dto.json --noEmit`
  - `npx tsc -p tsconfig.application.json --noEmit`
- [ ] Faça um inventário de CommonJS/IIFE no app (referência): `rg -n "module\.exports|require\(|\(function\s*\(" frontend/js`.
- [ ] Documente riscos: dependência de globais em plugins (ex.: `window.MinaKravensDomain`, `window.MineracaoUseCase`).
- [ ] Garanta que os `tsconfig.*.json` estão versionados e que o build não escreve fora de `frontend/js`.

### 0.1) Ajustes mínimos em TypeScript (conservadores)

- [ ] Ative interoperabilidade para facilitar import de CJS quando necessário:
  - Em `tsconfig.domain-dto.json` e `tsconfig.application.json`:
    - `"esModuleInterop": true`
    - `"allowSyntheticDefaultImports": true`
- [ ] Mantenha os seguintes valores para não alterar runtime no início:
  - `"module": "esnext"` (já em uso nos projetos por camada)
  - `"moduleDetection": "legacy"` (trocaremos no fim)
  - `"target": "ES2020"` (ou superior compatível com o NW.js atual)
  - `"allowJs": true` e `"skipLibCheck": true`
- [ ] Smoke test: `npx tsc -p tsconfig.domain-dto.json --noEmit && npx tsc -p tsconfig.application.json --noEmit && npm test` (deve seguir verde).

Critério de aceite (etapa 0): nenhum arquivo de saída alterado, testes passando, jogo abre com `npm run debug` sem regressões aparentes.

---

## 1) Camada DTO — tornar tipos modulares e imports explícitos

Meta: sair de tipos globais (`.d.ts` com `interface`/`type` sem `export`) para tipos modulares com `export type`, consumidos com `import type`. Não altera runtime.

- [ ] Converter `frontend/js/dto/MineracaoRequestDTO.d.ts`:
  - Substituir declarações globais por exportações:
    - `export interface MineracaoRequest { ... }`
- [ ] Converter `frontend/js/dto/MineracaoResponseDTO.d.ts`:
  - `export type TipoMineracao = 'Kraven' | 'Pedra'`
  - `export interface MineracaoResponse { ... }`
- [ ] Nos arquivos TS que usam esses tipos, adicionar imports explícitos somente de tipo:
  - Em `frontend/js/domain/MinaKravensDomain.ts` (topo do arquivo):
    - `import type { MineracaoRequest, MineracaoResponse } from '../dto/MineracaoResponseDTO';` (ajuste o caminho de acordo com os arquivos finais; se separar `Request`/`Response`, importe de ambos)
  - Em `frontend/js/application/MineracaoUseCase.ts` (topo do arquivo):
    - `import type { MineracaoResponse } from '../dto/MineracaoResponseDTO';`
- [ ] Remover o uso implícito de tipos globais nesses arquivos (deixar apenas via import type).
- [ ] Smoke tests:
  - `npx tsc -p tsconfig.domain-dto.json --noEmit`
  - `npx tsc -p tsconfig.application.json --noEmit`
  - `npm test` (sem alterações de runtime esperadas).

Critério de aceite (etapa 1): build e testes inalterados; nenhum comportamento em runtime modificado.

---

## 2) Camada Domain — migrar de IIFE/CJS para ESM com shim temporário

Meta: remover IIFE e `module.exports` de Domain, adotando `export`. Manter compat com plugins via shim global temporário.

- [ ] Em `frontend/js/domain/MinaKravensDomain.ts`:
  - Remover o invólucro IIFE.
  - Exportar a classe explicitamente: `export default class MinaKravensDomain { ... }`.
  - Preservar imports de tipos adicionados na etapa 1.
- [ ] Adicionar shim temporário (compatibilidade com plugins atuais que esperam globais):
  - Ao final do arquivo, adicionar bloco protegido por ambiente:

    ```ts
    // Compat temporária (remoção na etapa 4)
    if (typeof window !== 'undefined' && !(window as any).MinaKravensDomain) {
      (window as any).MinaKravensDomain = MinaKravensDomain;
    }
    ```

  - Observação: não usar `module.exports`.
- [ ] Atualizar testes de Domain para ESM:
  - `frontend/__tests__/MinaKravensDomain.test.js`: trocar `const MinaKravensDomain = require(...)` por `import MinaKravensDomain from '.../MinaKravensDomain';`
  - `frontend/__tests__/DependencyLoading.test.js` (trechos que exigem Domain): substituir `require` por `import` quando o alvo for Domain.
- [ ] Lint/format e checagem de tipos:
  - `npm run lint` (ajustar o que for necessário)
  - `npx tsc -p tsconfig.domain-dto.json --noEmit`
- [ ] Smoke tests:
  - `npm test` (todos os testes devem seguir verdes)
  - `npm run debug` e confirmar que o plugin ainda funciona (shim global cobre `window.MinaKravensDomain`).

Critério de aceite (etapa 2): Domain exporta via ESM, testes e jogo continuam OK usando o shim (sem `module.exports`).

---

## 3) Camada Application — migrar de IIFE/CJS para ESM com shim temporário

Meta: remover IIFE e `module.exports` de Application, adotando `export`. Manter compat com plugins via shim global temporário.

- [ ] Em `frontend/js/application/MineracaoUseCase.ts`:
  - Remover o invólucro IIFE.
  - Exportar a classe explicitamente: `export default class MineracaoUseCase { ... }`.
  - Usar apenas `import type { MineracaoResponse } ...` (sem dependência de tipos globais).
- [ ] Adicionar shim temporário (compatibilidade com plugins atuais):

  ```ts
  if (typeof window !== 'undefined' && !(window as any).MineracaoUseCase) {
    (window as any).MineracaoUseCase = MineracaoUseCase;
  }
  ```

- [ ] Atualizar testes de Application para ESM:
  - `frontend/__tests__/MineracaoUseCase.test.js`: trocar `require` por `import` para `MineracaoUseCase` e, se aplicável, para `MinaKravensDomain`.
  - Atualizar `frontend/__tests__/DependencyLoading.test.js` para usar `import` quando referenciar Application.
- [ ] Lint/format e checagem de tipos:
  - `npm run lint`
  - `npx tsc -p tsconfig.application.json --noEmit`
- [ ] Smoke tests:
  - `npm test`
  - `npm run debug` (verificar plugin com shim de `window.MineracaoUseCase`).

Critério de aceite (etapa 3): Application exporta via ESM, testes e jogo continuam OK usando o shim (sem `module.exports`).

---

## 4) Plugins — trocar carregamento global por import dinâmico (sem mudar comportamento)

Meta: remover dependência dos globais e do `loadScript`, passando a usar `import()` dinâmico (ESM). O comportamento do plugin não muda.

- [ ] Em `frontend/js/plugins/Coreto_Quest_Mina_Kravens.js`:
  - Substituir o `Promise.all([... loadScript('./js/domain/MinaKravensDomain.js'), loadScript('./js/application/MineracaoUseCase.js') ...])` por imports dinâmicos:

    ```js
    Promise.all([
      import('../domain/MinaKravensDomain.js').then(m => ({ MinaKravensDomain: m.default })),
      import('../application/MineracaoUseCase.js').then(m => ({ MineracaoUseCase: m.default })),
    ])
    .then(([{ MinaKravensDomain }, { MineracaoUseCase }]) => { /* usar referências locais */ })
    ```

  - Remover o acoplamento a `window.MinaKravensDomain` e `window.MineracaoUseCase` onde for usado; passar a usar as referências importadas.
- [ ] Smoke tests:
  - `npm run debug` (validar comportamento idêntico in-game: mineração, rachadura, boss, logs).
  - `npm test` (plugins tests continuam verdes).

Critério de aceite (etapa 4): plugin usa `import()` dinâmico e mantém o mesmo comportamento do fluxo anterior.
OBS: essa é a etapa mais perigosa. esteja preparado paara dar rollback somente dessa etapa caso não consiga fazer as alterações.

---

## 5) Limpeza — remover shims globais, banir CommonJS

Meta: eliminar compat legada e impedir reintrodução de CJS/IIFE.

- [ ] Remover shims adicionados em Domain/Application (blocos que setam em `window.*`).
- [ ] Em `tsconfig.domain-dto.json` e `tsconfig.application.json`:
  - Trocar `"moduleDetection"` de `"legacy"` para `"auto"` (ou `"force"` se aplicável) para reforçar detecção por `import`/`export`.
  - Confirmar `"esModuleInterop": true` e `"allowSyntheticDefaultImports": true`.
- [ ] Adicionar regras no ESLint para banir CommonJS nas camadas migradas:
  - `no-restricted-globals`: bloquear `module` e `exports` nas pastas `frontend/js/{domain,application}/**/*.{ts,js}`.
  - `no-restricted-syntax`/`no-restricted-properties`: bloquear `require` e `module.exports`.
  - Manter exceções para `frontend/js/plugins/**`.
- [ ] Smoke tests finais:
  - `npm run lint && npm test`
  - `npx tsc -p tsconfig.domain-dto.json --noEmit && npx tsc -p tsconfig.application.json --noEmit`
  - `npm run debug` (ação completa no jogo).

Critério de aceite (etapa 5): nenhuma ocorrência de `require`/`module.exports`/IIFE nas camadas migradas; build e runtime inalterados.

---

## 6) Ajustes finais de `compilerOptions` (opcional, sem alterar comportamento)

Meta: consolidar a configuração para ESM, mantendo o mesmo output/execução.

- [ ] Avaliar se o ambiente NW.js suporta ESM estático nos pontos de entrada atuais. Se sim, padronizar:
  - `"module": "ES2020"` (ou `"ESNext"`)
  - `"moduleResolution": "NodeNext"` (se passarmos a exigir extensão nas importações e resolução ESM) ou manter `"node"` se estável.
  - `"resolveJsonModule": true` (se houver imports de JSON).
- [ ] Caso opte por manter o build idêntico, permanecer com `"esnext"` e atual `moduleResolution`.
- [ ] Revalidar Jest: com `@swc/jest` e testes em ESM, manter transform padrão. Se necessário, ajustar `transform`/`extensionsToTreatAsEsm` sem quebrar.
- [ ] Smoke tests: `npm test` e `npm run debug`.

Critério de aceite (etapa 6): configuração consolidada e cobertura estável, sem regressão de runtime.

---

## 7) Observabilidade e rollback

- [ ] Commits granulares por etapa (DTO → Domain → Application → Plugins → Limpeza), com mensagens convencionais (`feat`, `refactor`, `chore`), incluindo prints dos smoke tests quando aplicável.
- [ ] Em caso de falha em smoke test, reverter apenas o commit da etapa corrente; as demais permanecem íntegras.
- [ ] Ao fim, anexar no PR a lista de ocorrências removidas (antes/depois) de `require`/`module.exports`/IIFE.

---

## Resumo de critérios de aceite (globais)

- [ ] A cada tarefa, compilação (`tsc --noEmit`) segue verde para Domain/DTO/Application.
- [ ] Testes (`npm test`) passam em 100% das etapas.
- [ ] O jogo via `npm run debug` mantém comportamento idêntico em todas as etapas.
- [ ] Ao final, Domain e Application utilizam apenas `export`/`import`; DTOs são tipos modulares importados explicitamente; plugins não dependem mais de globais.
