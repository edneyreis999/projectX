# Repository Guidelines

## Project Structure & Module Organization

- Source: `frontend/js` (core engine files, custom plugins in `frontend/js/plugins`, app/domain code under `frontend/js/{application,domain,dto,libs}`).
- Tests: `frontend/__tests__` (includes `__tests__/plugins`). Use `*.test.js` naming.
- Assets: `frontend/{audio,img,data,fonts,localization,movies,save}` and project entry `frontend/index.html`.
- Config: root-level `jest.config.ts`, `.eslintrc.cjs`, `.prettierrc`, `commitlint.config.ts`, `tsconfig.json`.

## Build, Test, and Development Commands

- `npm test` — run Jest test suite (SWC transform, coverage enabled).
- `npm run lint` — ESLint + auto-fix for `frontend/js/plugins/**/*.{ts,js}`.
- `npm run lint:check` — ESLint with `--max-warnings=0` (CI-safe).
- `npm run format` — Prettier for TS/JS; `npm run format:json` for project JSON (`frontend/**/*.json`, `System.json`).
- `npm run debug` — launch the game via NW.js (`./frontend`) with remote debugging on `9222`.
- Hooks: Husky + lint-staged format and lint staged files on commit.

## Coding Style & Naming Conventions

- Prettier: 2-space indent, single quotes, semicolons, width 200, `arrowParens: "avoid"`.
- ESLint: `@typescript-eslint` + `plugin:prettier/recommended`; JS in plugins allowed; TypeScript strictness relaxed for return types and `any`.
- Filenames: use `camelCase` for JS/TS files; test files `*.test.js` under `frontend/__tests__`.
- Plugins: keep custom plugin files in `frontend/js/plugins` prefixed with `Coreto_` when project-specific.

## Testing Guidelines

- Framework: Jest with `@swc/jest`; tests match `**/frontend/**/?(*.)+(spec|test).[tj]s`.
- Write unit tests near feature area inside `frontend/__tests__` with clear, behavior-first `describe/test` names.
- Coverage is collected by default; ensure new code is covered and tests run locally before PRs.

## Commit & Pull Request Guidelines

- Conventional Commits enforced by Commitlint. Use Commitizen: `npm run commit`.
  - Examples: `feat(quests): add mining rewards`, `fix(core): prevent null actor crash`.
- PRs must include: concise description, motivation, scope (files/areas), test evidence (output or screenshots), and linked issues (e.g., `fix #123`).
- Keep diffs focused; include screenshots for UI changes in `frontend` where relevant.

## Security & Configuration Tips

- Do not commit secrets. Use environment variables locally and documentation in code for required settings.
- JSON assets are formatted via `npm run format:json`; avoid manual reflow to reduce diff noise.

## Plugin Standardization

- Plan: see `frontend/js/PLANO_PADRONIZACAO_PLUGINS.md` for architecture, naming, tests and Definition of Done for quest plugins.
- Reuse check: before creating a new plugin, review `frontend/docs/plugins` to reuse documented patterns or methods.
- Onboarding: for a quick primer on plugin structure, see the "Estrutura de Plugins" section in `README.md`.
