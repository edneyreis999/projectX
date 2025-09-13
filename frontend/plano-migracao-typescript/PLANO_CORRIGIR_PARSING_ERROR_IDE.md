Plano de migração TypeScript/ESLint — corrigir Parsing error no IDE

Objetivo

Remover o erro no IDE: “Parsing error … tsconfig.json does not include this file” ao abrir frontend/js/dto/MineracaoRequestDTO.ts.
Estratégia

Isolar o typed-linting em um tsconfig.eslint.json e apontar o .eslintrc.cjs para ele. Incluo alternativas ao final.
Tasks

T1 — Mapear escopo e globs:

Liste diretórios TypeScript: frontend/js/{application,domain,dto,libs,plugins} e frontend/__tests__.
Revise tsconfig.json, tsconfig.application.json, tsconfig.domain-dto.json (include/exclude).
Confirme que frontend/js/dto/MineracaoRequestDTO.ts não está no project atual do ESLint.
T2 — Criar tsconfig.eslint.json (recomendado):

Crie na raiz com foco no ESLint (sem emissão):
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "noEmit": true, "incremental": false },
  "include": ["frontend/js/__/*.ts", "frontend/__tests__/__/*.ts"],
  "exclude": ["node_modules", "dist", "coverage"]
}
T3 — Apontar o ESLint para o tsconfig.eslint.json:

Em .eslintrc.cjs, defina:
parserOptions.tsconfigRootDir = __dirname
parserOptions.project = ["./tsconfig.eslint.json"]
Garanta overrides:
JS: desligue typed-linting (parser: espree e parserOptions.project = null).
TS: mantenha @typescript-eslint/parser com project: ["./tsconfig.eslint.json"].
Exemplo (trechos):
parserOptions: {
  tsconfigRootDir:__dirname,
  project: ["./tsconfig.eslint.json"],
},
overrides: [
  {
    files: ["__/*.js"],
    parser: require.resolve("espree"),
    parserOptions: { project: null },
  },
  {
    files: ["__/*.ts"],
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: { project: ["./tsconfig.eslint.json"] },
  }
]
T4 — Alinhar globs do ESLint:

Ajuste overrides.files para cobrir: frontend/js/__/*.ts, frontend/__tests__/__/*.ts e (se aplicável) frontend/js/plugins/**/*.js.
Adicione/valide ignorePatterns para dist, coverage, node_modules.
T5 — Limpar caches e reiniciar no IDE:

Remova cache do ESLint se existir (ex.: .eslintcache).
VS Code: “ESLint: Restart ESLint Server” e “TypeScript: Restart TS Server”.
Reabra frontend/js/dto/MineracaoRequestDTO.ts e verifique se sumiu o erro.
T6 — Validar no CLI:

Rode npm run lint:check e confirme ausência do “Parsing error … does not include this file”.
Rode npm test e confirme suíte verde.
Opcional: npm run debug para garantir o jogo 100%.
T7 — Commitar (Conventional Commits):

chore(eslint): apontar typed-linting para tsconfig.eslint.json
Alternativas

Mudança mínima no tsconfig.json atual:

Em tsconfig.json, adicione frontend/js/dto/__/*.ts a include (ou amplie para frontend/js/__/*.ts).
Cuidado para não afetar o build se o tsconfig.json for usado na compilação.
Critérios de aceitação

frontend/js/dto/MineracaoRequestDTO.ts abre no IDE sem “Parsing error … does not include this file”.
npm run lint:check sem erros de parsing.
npm test continua verde.
O jogo roda normalmente no npm run debug.
