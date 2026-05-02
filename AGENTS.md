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

## Navegação no zord-project

- Localização: `zord-project` é irmão de `projectX` no mesmo workspace. Do raiz de `projectX`, acesse com: `cd .. && cd zord-project`.
- Voltar ao `projectX`: a partir do `zord-project`, use: `cd .. && cd projectX`.
- Estrutura relevante: os comandos operacionais e playbooks ficam em `zord-project/comandos/`.
- Resolução de “comandos”: sempre que houver a instrução “executar um comando dentro de 'comandos'”, interprete como “navegue até `zord-project` e encontre/execute o arquivo correspondente em `comandos/`”. Ex.: `zord-project/comandos/<arquivo>.md`.
- Descoberta rápida:
  - Listar comandos: `ls -la ../zord-project/comandos` (a partir de `projectX`).
  - Buscar por um nome: `rg -n "<termo>" ../zord-project/comandos`.
- Convenção: mantenha leituras e execuções de instruções sempre no contexto do `zord-project` quando o pedido mencionar “comandos”.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
